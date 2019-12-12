/**
 * 解析XML
 * @param string
 * @return { Element } 解析后的DOM
 */
export function parseXML2Element(string) {
  let parser = new DOMParser();
  if (string.indexOf('<?xml version="1.0" encoding="utf-8"?>') !== 0) {
    string = '<?xml version="1.0" encoding="utf-8"?>' + string;
  }
  return parser.parseFromString(string, "text/xml");
}

/**
 * 节点设初始值(辅助方法)
 * @param elem
 * @return {*}
 */
function node2defaultValue(elem) {
  let nodeName = elem.nodeName;
  let attrs = parseAttributes(elem);
  if (nodeName === "Choice" && attrs.type === "multi") {
    let selectedChilden = [].slice.apply(elem.children).filter(child=>child.getAttribute('value') === '1');
    return selectedChilden.map(child=>child.getAttribute('name') + child.getAttribute('item-id'));
  }
  if (nodeName === "Choice" && attrs.type === "single") {
    let selectedChild = [].slice.apply(elem.children).find(child=>child.getAttribute('value') === '1');
    selectedChild && elem.setAttribute('value',selectedChild.getAttribute('name') +  selectedChild.getAttribute('item-id'));
    return selectedChild ? selectedChild.getAttribute('name') +  selectedChild.getAttribute('item-id'): '';
  }
  return "";
}
/**
 * 解析DOM为树形数据
 * @param elements
 * @return {{children: *, nodeType: string, value: (*|Array|string|*)}[]}
 */
export function parseElement2nodeTree(elements) {
  !elements &&  (elements = []);
  return [].slice.apply(elements).map(elem => {
    let value = elem.getAttribute('value');
    if(typeof value === 'string'){
      elem.setAttribute('value',value.replace('&lt;','<').replace('&gt;','>'));
    }
    let name = elem.getAttribute('name');
    if(typeof name === 'string'){
      elem.setAttribute('name',name.replace('&lt;','<').replace('&gt;','>'));
    }
    let note = elem.getAttribute('note');
    if(typeof note === 'string'){
      elem.setAttribute('note',note.replace('&lt;','<').replace('&gt;','>'));
    }
    if (elem.nodeName === "Title" || elem.nodeName === "Textbox") {
      elem.placeholder = elem.value;
      elem.value = "";
    }
    return {
      value: node2defaultValue(elem),
      nodeType: elem.nodeName,
      children: parseElement2nodeTree(elem.children),
      ...parseAttributes(elem)
    };
  });
}

/**
 * 树形数据转XML DOM
 * @param { Element } tree
 */
export function parseTree2XMLDOM(tree) {
  return tree.map(item => {
    /*******************用于处理输入框默认值********************/
    if (
      ["Title", "Textbox"].some(type => {
        return type === item.nodeType && item.value == "";
      })
    ) {
      item.value = item.placeholder;
    }
    /*******************用于处理输入框默认值********************/

    let elem = document.createElementNS("xml", item.nodeType);
    Object.keys(item).forEach(prop => {
      var need = ["children", "nodeType"].some(p => p === prop);
      if (!need) {
        elem.setAttribute(prop, item[prop]);
      }
    });
    if (item.children && item.children.length > 0) {
      let children = parseTree2XMLDOM(item.children);
      children.forEach((childElem, index) => {
        elem.appendChild(childElem);
      });
    }
    return elem;
  });
}

/**
 * 树形数据转Tips模板字符串
 * @param tree
 * @return {string}
 */
export function parseTree2TipsXML(tree, wraperTag = "Tip") {
  let xmldom = parseTree2XMLDOM(tree);
  let xmlstring = xmldom.map(dom => dom.outerHTML).join("\n");
  return `<${wraperTag}>${xmlstring}</${wraperTag}>`;
}

/**
 * 解析元素的属性为对象
 * @param elem
 * @return { Objecct }
 */
export function parseAttributes(elem) {
  let attrs =  elem.getAttributeNames("class").reduce((a, c) => {
    a[c] = elem.getAttribute(c);
    return a;
  }, {});
  return attrs;
}
