/**
 * 源码来自 https://segmentfault.com/a/1190000011819279
 * 广度遍历生成树
 * @param  {Array} roots [根节点]
 * @return {HTMLElement ul}       [生成的树列表元素]
 */
function makeTreeWidely(roots) {
    function convert(nodes) {
        const domNodes = nodes
            .map(node => {
            const $li = $("<li>")
                .append($("<div>").css({
                    padding: '2px 0.5em'
                }).text(node.name || ""));
            return {
                node,
                dom: $li
            };
        });
        const $ul = domNodes
            .reduce(($ul, dn) => $ul.append(dn.dom), $("<ul>"));
        return {
            domNodes,
            $ul
        };
    }
    const { domNodes: queue, $ul: $rootUl } = convert(roots);
    while (queue.length) {
        const { node, dom } = queue.shift();
        if (node.nodes && node.nodes.length) {
            const { domNodes, $ul } = convert(node.nodes);
            dom.append($ul);
            queue.push(...domNodes);
        }
    }
    return $rootUl;
}
