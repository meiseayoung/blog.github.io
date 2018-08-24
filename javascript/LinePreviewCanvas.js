class LinePreviewCanvas {
  constructor(options) {
    var _config = {
      renderTo: undefined,
      layers: [
        {
          type: "dash", //线样式(类型)
          dash: '5,2',
          width: "1", //线宽
          color: "#ff0000", //颜色
          cap: "butt", //端头样式 'butt'|'round'|'square'
          join: "bevel" //接头样式 'bevel'斜角|'round'圆角|'miter'尖角
        },
        {
          type: "dash", //线样式(类型)
          dash: '1,5',
          width: "12", //线宽
          color: "#00ff00", //颜色
          cap: "round", //端头样式 'butt'|'round'|'square'
          join: "round" //接头样式 'bevel'斜角|'round'圆角|'miter'尖角
        },
        {
          type: "solid", //线样式(类型)
          width: "3", //线宽
          color: "#0000ff", //颜色
          cap: "round", //端头样式 'butt'|'round'|'square'
          join: "miter" //接头样式 'bevel'斜角|'round'圆角|'miter'尖角
        }
      ]
    };
    this.config = Object.assign(_config, options);
    if (!(this.config.renderTo instanceof Element)) {
      console.warn("没有找到渲染元素,请检查renderTo配置项是否正确");
      return;
    }
    this._createCanvas();
    this.render();
  }
  _createCanvas() {
    var canvasElement = document.createElement("canvas");
    var { width, height } = this.config.renderTo.getBoundingClientRect();
    canvasElement.width = width;
    canvasElement.height = height;
    this.config.renderTo.appendChild(canvasElement);
  }
  render() {
    var context = this.config.renderTo.querySelector("canvas").getContext("2d");
    var { width, height } = this.config.renderTo.getBoundingClientRect();
    const { layers } = this.config;
    context.clearRect(0, 0, width, height);

    // layers.forEach((layer, index) => {
    //   context.save();
    //   if (layer.type === "dash") {
    //     context.setLineDash(layer.dash);
    //   }
    //   context.lineWidth = Number(layer.width);
    //   context.strokeStyle = layer.color;
    //   context.lineCap = layer.lineCap;
    //   context.lineJoin = layer.lineJoin;
    //   context.beginPath();
    //   context.moveTo(15, (height - layer.width) / 2 + layer.width / 2);
    //   context.lineTo(
    //     width - 15 * 2,
    //     (height - layer.width) / 2 + layer.width / 2
    //   );
    //   context.stroke();
    //   context.restore();
    // });

    // for (let length = layers.length - 1; length >= 0; length--) {
    for (let i=0; i<layers.length; i++) {
      context.save();
      let layer = layers[i];
      // if (layer.type === "dash") {
      if (layer.dash !== "" ) {
        context.setLineDash(layer.dash.split(","));
      }
      context.lineWidth = Number(layer.width);
      context.strokeStyle = layer.color;
      context.lineCap = layer.cap;
      context.lineJoin = layer.join;
      context.beginPath();
      context.moveTo(15, (height - layer.width) / 2 + layer.width / 2);
      context.lineTo(
        width - 15 * 2,
        (height - layer.width) / 2 + layer.width / 2
      );
      context.stroke();
      context.restore();
    }
  }
  update(options) {
    this.config = Object.assign(this.config, options);
    this.render();
  }
}

export default LinePreviewCanvas;
