function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
  ctx.lineTo(x + width - radius, y + height);
  ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  ctx.lineTo(x + width, y + radius);
  ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
  ctx.lineTo(x + radius, y);
  ctx.quadraticCurveTo(x, y, x, y + radius);
  ctx.stroke();
}

import { color10toRGBA } from "@/common/utils/colorHelper.js";

class PointPreviewCanvas {
  constructor(options) {
    var _config = {
      renderTo: undefined, //渲染目标容器
      width:32,
      height:32,
      color: "rgba(0,0,0,1)", //SVG填充颜色
      offsetX: 0, //X轴偏移
      offsetY: 0, //Y轴偏移
      fontFamily: "serif", //字体
      fontSize: 36, //文字大小
      textAlign: "center", //文字对齐
      strokeStyle: "none", //描边样式
      shadowColor: "#000000", //阴影颜色
      shadowOffsetX: 0, //阴影X轴偏移
      shadowOffsetY: 0, //阴影Y轴偏移
      shadowBlur: 5, //阴影距离
      backgroundType: "rect", //背景类型
      backgroundColor: "blue", //背景颜色
      backgroundPadding: 10, //背景左右边距
      scale: 1, //缩放大小
      sourceSrc: "", //引用图片资源
      SVGImageData: "", //缓存SVG图像数据
      lastSVGSource: "", //最近使用的SVG图像
      lastImageURL: "", //最近使用的图片路径
      lastImage: "" //最近缓存的图片
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
  _createHelperCanvas() {
    var canvasElement = document.createElement("canvas");
    var { width, height } = this.config.renderTo.getBoundingClientRect();
    canvasElement.width = width;
    canvasElement.height = height;
    this.helperCanvas = canvasElement;
  }
  render() {
    var _this = this;
    this.config.offsetY = (-this.config.offsetY);
    var context = this.config.renderTo.querySelector("canvas").getContext("2d");
    var { width, height } = this.config.renderTo.getBoundingClientRect();
    const {
      color,
      offsetX,
      offsetY,
      fillStyle,
      fontFamily,
      fontSize,
      textAlign,
      textDecorations,
      strokeStyle,
      shadowColor,
      shadowOffsetX,
      shadowOffsetY,
      shadowBlur,
      backgroundType,
      backgroundColor,
      backgroundPadding,
      scale,
      sourceSrc
    } = this.config;
    const imageWidth = this.config.width;
    const imageHeight = this.config.height;
    context.clearRect(0, 0, width, height);

    function drawBg(context){
      /***************************绘制轴线**************************/
      context.save();
      context.fillStyle = "#e1e1e1";
      context.translate(0, height / 2 - 0.5);
      context.fillRect(0, 0, width, 1);
      context.restore();

      context.save();
      context.fillStyle = "#e1e1e1";
      context.translate(width / 2 - 0.5, 0);
      context.fillRect(0, 0, 1, height);
      context.restore();
      /***************************绘制轴线**************************/

      /*************************绘制X,Y轴标识***********************/
      context.save();
      context.fillStyle = "#434343";
      context.font = "10px 微软雅黑";

      context.fillText("X", width / 2 + 85, height / 2);
      context.fillText("Y", width / 2, height / 2 - 85);
      context.restore();
      /*************************绘制X,Y轴标识***********************/

      /***************************绘制圆点**************************/
      context.save();
      context.beginPath();
      context.arc(width / 2, height / 2, 3, 0, 2 * Math.PI);
      context.closePath();
      context.fillStyle = "#ff0000";
      context.fill();
      context.restore();
      /***************************绘制圆点**************************/

      /***************************绘制圆圈**************************/
      context.save();
      context.strokeStyle = "#e1e1e1";
      context.arc(width / 2, height / 2, 48, 0, 2 * Math.PI);
      context.arc(width / 2, height / 2, 80, 0, 2 * Math.PI);
      context.stroke();
      context.restore();
      /***************************绘制圆圈**************************/
    }

    //判断图片是否为最近使用过的，是的话直接返回最近使用的图片数据，否的话新建图片数据缓存起来
    if (this.config.lastImageURL !== this.config.sourceSrc) {
      this.config.lastImageURL = this.config.sourceSrc;

      new Promise((resolve, reject) => {
        let image = new Image();
        image.crossOrigin = '';
        image.onload = function() {
          this.lastImage = image;
          resolve(this.lastImage);
        }.bind(this);
        image.onerror = function(){
          this.lastImage = image;
          resolve(this.lastImage);
        }.bind(this);
        image.src = this.config.lastImageURL;
      }).then(img => {
        //判断图片大小是否大于容器大小
        if(img.width > width || img.height > height){
          let isWidthMax = (img.width > img.height);
          let max = (img.width > img.height ? img.width : img.height);
          if(isWidthMax){
            let scale = width/img.width;
            img.width = width;
            img.height = img.height*scale;
          }else{
            let scale = height/img.height;
            img.height = height;
            img.width = img.width*scale;
          }
        }
        context.clearRect(0,0,context.canvas.width,context.canvas.height);

        if (/\.svg$/gim.test(img.src)) {
          let tempCanvas = document.createElement("canvas");
          tempCanvas.width = context.canvas.width;
          tempCanvas.height = context.canvas.height;
          let tempContext = tempCanvas.getContext("2d");
          tempContext.drawImage(
            img,
            width / 2 - (img.width * scale) / 2 + this.config.offsetX,
            height / 2 - (img.height * scale) / 2 + this.config.offsetY,
            img.width * scale,
            img.height * scale
          );
          let tempImageData = tempContext.getImageData(
            0,
            0,
            tempCanvas.width,
            tempCanvas.height
          );
          let color = null;
          if (_this.config.color.indexOf("#") !== -1) {
            color = color10toRGBA(
              Number.parseInt(
                (_this.config.color + "ff").replace("#", "0x")
              )
            );
            color = color.replace(/rgba|\(|\)/gi, "").split(",");
          } else if (_this.config.color.indexOf("rgba") !== -1) {
            color = _this.config.color
              .replace(/rgba|\(|\)/gi, "")
              .split(",");
          }
          for (let i = 0; i < tempImageData.data.length; i += 4) {
            if (tempImageData.data[i + 3] !== 0) {              
              tempImageData.data[i] = color[0];
              tempImageData.data[i + 1] = color[1];
              tempImageData.data[i + 2] = color[2];
              tempImageData.data[i + 3] = color[3] * 255;
            }
          }
          tempContext.putImageData(tempImageData,0,0);
          context.drawImage(tempCanvas,0,0);
        }else{
          
          context.drawImage(
            img,
            width / 2 - (img.width * scale) / 2 + this.config.offsetX,
            height / 2 - (img.height * scale) / 2 + this.config.offsetY,
            img.width * scale,
            img.height * scale
          );
        }

        drawBg(context);
      });
    } else {
      new Promise((resolve, reject) => {
        let image = new Image();
        image.crossOrigin = '';
        if(!this.lastImage){
          image.onload = function(){
            resolve(image);
          }
          image.src = this.config.sourceSrc;
        }else{
          resolve(this.lastImage);
        }
      }).then(img => {
        if(img.width > width || img.height > height){
          let isWidthMax = (img.width > img.height);
          let max = (img.width > img.height ? img.width : img.height);
          if(isWidthMax){
            let scale = width/img.width;
            img.width = width*0.88;
            img.height = img.height*scale*0.88;
          }else{
            let scale = height/img.height;
            img.height = height*0.88;
            img.width = img.width*scale*0.88;
          }
        }
        context.clearRect(0,0,context.canvas.width,context.canvas.height);
        //判断图片是否为SVG 是SVG的话创建一个离屏canvas用于转换颜色
        if (/\.svg$/gim.test(img.src) || img.src.indexOf('data:image/svg+xml;base64') === 0) {
          let tempCanvas = document.createElement("canvas");
          tempCanvas.width = context.canvas.width;
          tempCanvas.height = context.canvas.height;
          let tempContext = tempCanvas.getContext("2d");
          tempContext.drawImage(
            img,
            width / 2 - (img.width * scale) / 2 + this.config.offsetX,
            height / 2 - (img.height * scale) / 2 + this.config.offsetY,
            img.width * scale,
            img.height * scale
          );
          let tempImageData = tempContext.getImageData(
            0,
            0,
            tempCanvas.width,
            tempCanvas.height
          );
          let color = null;
          if (_this.config.color.indexOf("#") !== -1) {
            color = color10toRGBA(
              Number.parseInt(
                (_this.config.color + "ff").replace("#", "0x")
              )
            );
            color = color.replace(/rgba|\(|\)/gi, "").split(",");
          } else if (_this.config.color.indexOf("rgba") !== -1) {
            color = _this.config.color
              .replace(/rgba|\(|\)/gi, "")
              .split(",");
          }
          for (let i = 0; i < tempImageData.data.length; i += 4) {
            if (tempImageData.data[i + 3] !== 0) {              
              tempImageData.data[i] = color[0];
              tempImageData.data[i + 1] = color[1];
              tempImageData.data[i + 2] = color[2];
              tempImageData.data[i + 3] = color[3] * 255;
            }
          }
          tempContext.putImageData(tempImageData,0,0);
          context.drawImage(tempCanvas,0,0);
        }else{
          context.drawImage(
            img,
            width / 2 - (img.width * scale) / 2 + this.config.offsetX,
            height / 2 - (img.height * scale) / 2 + this.config.offsetY,
            img.width*scale,
            img.height*scale
          );
        }
        drawBg(context)
      });
    }
    /***************************绘制点图标**************************/
  }
  update(options) {
    this.config = Object.assign(this.config, options);
    this.render();
  }
}

export default PointPreviewCanvas;
