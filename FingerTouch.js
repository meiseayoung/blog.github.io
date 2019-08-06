class FingerTouch {
  constructor(target) {
    if (!document.body instanceof Element) {
      console.warn("FingerTouch初始化失败，传入的参数不是一个元素");
      return;
    }
    this.target = target;
    this.translateX = 0;
    this.translateY = 0;
    this.scale = 1;
    this.init();
  }
  init() {
    if (!document.body.instance) {
      this.instance = new Hammer(document.body);
      document.body.instance = this.instance;
    } else {
      this.instance = document.body.instance;
    }
    this.style.position = 'absolute';
    this.style.transformOrigin = 'center center';
    this.target.addEventListener('mousemove',ev=>{
      ev.preventDefault();
    });
    this.target.addEventListener('touchmove',ev=>{
      ev.preventDefault();
    });
    this.instance.get("pinch").set({ enable: true });
    this.instance.on("pinch", ev => {
      this.scale = ev.scale;
      this.target.style.transform = `scale(${this.scale})`;
      this.translateX = 0;
      this.translateY = 0;
      this.instance.off("pan");
    });
    this.instance.on("pinchend", ev => {
      let style = getComputedStyle(this.target);
      let left = parseInt(style.left);
      let top = parseInt(style.top);
      let width = parseInt(style.width);
      let height = parseInt(style.height);
      this.target.style.transform = "unset";
      this.target.style.top = top - (width * (this.scale - 1)) / 2 + "px";
      this.target.style.left = left - (height * (this.scale - 1)) / 2 + "px";
      this.target.style.width = width * this.scale + "px";
      this.target.style.height = height * this.scale + "px";
      this.scale = 1;
      this.translateX = 0;
      this.translateY = 0;
      setTimeout(() => {
        this.instance.on("pan", ev => {
          let scale = this.target.style.transform.match(/scale\(.*?\)/);
          this.translateX = ev.deltaX;
          this.translateY = ev.deltaY;
          this.target.style.transform = `translateX(${
            this.translateX
          }px) translateY(${this.translateY}px)`;
        });
      }, 300);
    });
    this.instance.on("pan", ev => {
      let scale = this.target.style.transform.match(/scale\(.*?\)/);
      this.translateX = ev.deltaX;
      this.translateY = ev.deltaY;
      this.target.style.transform = `translateX(${
        this.translateX
      }px) translateY(${this.translateY}px)`;
    });
    this.instance.on("panend", ev => {
      let style = getComputedStyle(this.target);
      let left = parseInt(style.left);
      let top = parseInt(style.top);
      let width = parseInt(style.width);
      let height = parseInt(style.height);

      this.target.style.transform = "unset";
      this.target.style.left = left + this.translateX + "px";
      this.target.style.top = top + this.translateY + "px";
      this.translateX = 0;
      this.translateY = 0;
      this.scale = 1;
    });
  }
  destroy() {
    this.instance.off("pan");
    this.instance.off("panend");
    this.instance.off("pinch");
    this.instance.off("pinchend");
  }
}
