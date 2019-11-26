class EventEmiter {
  constructor(){
    this.handlers = {};
  }
  /**
   *功能说明 ：添加自定义事件
   *参数说明 ：
   *参数type-自定义事件类型(名称)
   *参数hander-自定义事件类型对应的事件执行函数
   **/
  on(type, handler) {
    if (typeof this.handlers[type] == "undefined") {
      this.handlers[type] = [];
    }
    //防止重复添加同一个事件处理函数
    if ( this.handlers[ type ].indexOf( handler ) === - 1 ) { 
      this.handlers[type].push(handler);
    }
    
  }
  /**
   *功能说明 ：触发自定义事件
   *参数说明 ：
   *参数type-自定义事件类型(名称)
   *参数data-自定义事件类型对应的事件执行函数的参数
   **/
  fire(type, data) {
    if (this.handlers[type] instanceof Array) {
      var handlers = this.handlers[type];
      for (var i = 0; i < handlers.length; i++) {
        handlers[i](data);
      }
    }
  }
  /**
   *功能说明 ：移除事件
   *参数说明 ：
   *参数type-事件类型(名称)
   **/
  off(type, handler) {
    var handlers = this.handlers[type];
    if (this.handlers[type] instanceof Array) {
      for (var i = 0; i < handlers.length; i++) {
        if (handlers[i] === handler) {
          break;
        }
      }
    }
    handlers.splice(i, 1);
  }
}

class Dragger extends EventEmiter{
  /**
   * @parms { Element } dragElement
   * @parms { Element } dropElement
   */
  constructor(dragElement,dropElement){
    super();
    this.dragElement = dragElement;
    this.dropElement = dropElement;
    if(!this.#checkParams()){
      console.error('参数类型错误，请检查');
      return;
    }else{
      this.#init();
    }
  }
  //是否处于拖拽中
  #draging = false
  //是否处于拖放源中
  #dragEnter = false
  //辅助元素,用于防止某个元素被阻止冒泡导致window上无法触发mouseup事件
  #helperElement = null

  /**
   * 检查初始化的参数是否合规
   */
  #checkParams(){
    let { dragElement,dropElement } = this;
    let checked = [dragElement,dropElement].every(elem=>{
      return elem instanceof Element;
    });
    return checked;
  }
  #createHelperElement(){
    let element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.left = '0';
    element.style.top = '0';
    element.style.width = '100%';
    element.style.height = '100%';
    element.style.zIndex = 100000;
    document.body.appendChild(element);
    this.#helperElement = element;
  }
  #destroyHelperElement(){
    if(this.#helperElement){
      document.body.removeChild(this.#helperElement);
      this.#helperElement = null;
    }
  }
  #onMouseMove =(event)=>{
    if(this.#draging){
         this.fire('draging',{
          type:'draging',
          event
         });
         if(!this.#dragEnter){
          let { x,y,width,height } = this.dropElement.getBoundingClientRect();
          if(event.pageX >= x && event.pageX < x + width && event.pageY >= y && event.pageY < y + height){
            this.fire('dragEnter',{
              type:'dragEnter',
              event
            });
            this.#dragEnter = true;
          }
         }else{
          let { x,y,width,height } = this.dropElement.getBoundingClientRect();
          if(event.pageX < x || event.pageX > x + width || event.pageY < y  || event.pageY > y + height ){
            this.fire('dragLeave',{
              type:'dragLeave',
              event
            });
            this.#dragEnter = false;
          }
         }
    }
  }
  #onMouseUp =(event)=>{
    if(!this.#draging){
      return;
    }
    if(this.#dragEnter){
      this.fire('dragEnd',{
        type:'dragEnd',
        event
      });
    }
    this.#draging = false;
    this.#dragEnter = false;
    this.#destroyHelperElement();
    window.removeEventListener('mousemove',this.#onMouseMove);
    window.removeEventListener('mouseup',this.#onMouseUp);
  }
  /**
   *初始化
   */
  #init(){
    this.dragElement.addEventListener('mousedown',event=>{
      this.#draging = true;
      this.fire('dragStart',{
        type:'dragStart',
        event
      });
      this.#createHelperElement();
      window.addEventListener('mousemove',this.#onMouseMove);
      window.addEventListener('mouseup',this.#onMouseUp);
    });
  }
}
