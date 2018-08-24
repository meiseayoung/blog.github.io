/**
 * @description canvas画圆角矩形
 * @param {Number} x 矩形左上角X坐标
 * @param {Number} y 矩形左上角Y坐标
 * @param {Number} w 矩形宽度
 * @param {Number} h 矩形高度
 * @param {Number} r 圆角大小
 * @returns undefined 无返回值
 */
CanvasRenderingContext2D.prototype.drawRoundRect  = function (x, y, w, h, r) {
  if (w < 2 * r) {r = w / 2;}
  if (h < 2 * r){ r = h / 2;}
  this.beginPath();
  this.moveTo(x+r, y);
  this.arcTo(x+w, y, x+w, y+h, r);
  this.arcTo(x+w, y+h, x, y+h, r);
  this.arcTo(x, y+h, x, y, r);
  this.arcTo(x, y, x+w, y, r);
  this.closePath();
  return this;
};

class LabelPreviewCanvas {
  constructor(options){
    var _config = {
      renderTo:undefined,  //画布渲染容器
      offsetX:0,           //X轴偏移
      offsetY:0,           //Y轴偏移
      fillStyle:"red",     //填充颜色
      fontFamily:"serif",  //字体
      fontSize:12,         //文字大小
      textAlign:"center",  //文字对齐方式
      textDecorations:["underline","line-through","bold",'italic'], //文本装饰
      strokeStyle:"none",   //描边样式
      shadowColor:"#000000",//阴影颜色
      shadowOffsetX:0,      //阴影X轴偏移
      shadowOffsetY:0,      //阴影Y轴偏移
      shadowBlur:5,         //发光距离
      backgroundType:"roundRect", //背景类型 'rect'|'round'|'roundRect'
      backgroundColor:"blue",     //背景颜色
      backgroundPadding:10,       //背景左右边距
      borderWidth:10,             //边框大小
      backgroundStrokeColor:"red" //边框颜色
    };
    this.config = Object.assign(_config,options);
    if(!(this.config.renderTo instanceof Element)){
      console.warn("没有找到渲染元素,请检查renderTo配置项是否正确");
      return;
    }
    this._createCanvas();
    this.render();
  }
  _createCanvas(){
    var canvasElement = document.createElement("canvas");
    var {width,height} = this.config.renderTo.getBoundingClientRect();
    canvasElement.width = width;
    canvasElement.height = height;
    this.config.renderTo.appendChild(canvasElement);
  }
  render(){
    var context = this.config.renderTo.querySelector("canvas").getContext("2d");
    var {width,height} = this.config.renderTo.getBoundingClientRect();
    const {
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
        borderWidth,
        backgroundStrokeColor
    } = this.config;
    context.clearRect(0,0,width,height);

    /***************************绘制透明底图**************************/
    // let transparentBack = document.createElement('canvas');
    // let transparentBackCxt = transparentBack.getContext('2d')
    // transparentBack.width = 8;
    // transparentBack.height = 8;
    // transparentBackCxt.fillStyle = '#dddddd';
    // transparentBackCxt.fillRect(0,0,4,4);
    // transparentBackCxt.fillStyle = 'rgba(0,0,0,0)';
    // transparentBackCxt.fillRect(0,4,4,4);
    // transparentBackCxt.fillStyle = 'rgba(0,0,0,0)';
    // transparentBackCxt.fillRect(4,0,4,4);
    // transparentBackCxt.fillStyle = '#dddddd';
    // transparentBackCxt.fillRect(4,4,4,4);

    // document.querySelector('img').src = transparentBack.toDataURL();
    // context.save();
    // var pattern = context.createPattern(transparentBack,'repeat');
    // context.fillStyle = pattern;
    // context.fillRect(0,0,width,height);
    // context.restore();
    /***************************绘制透明底图**************************/

    /***************************绘制圆点**************************/
    context.save();
    context.beginPath();
    context.arc(width/2,height/2,5,0,2*Math.PI);
    context.closePath();
    context.fillStyle = "#000000";
    context.stroke();
    context.restore();
    /***************************绘制圆点**************************/
    
    /***************************绘制文字**************************/
    context.save();
    context.translate(offsetX,offsetY);
    if(this.config.textDecorations[0] && Object.prototype.toString.call(this.config.textDecorations[0]) === "[object Object]"){
      this.config.textDecorations = this.config.textDecorations
        .filter(textDecoration => textDecoration.active)
        .map(textDecoration => textDecoration.value);
    }
    let hasTextDecorationBold = this.config.textDecorations.some(textDecoration=>textDecoration === 'bold');
    let hasTextDecorationItalic = this.config.textDecorations.some(textDecoration=>textDecoration === 'italic');
    context.font = `${hasTextDecorationBold?'Bold ':''}${hasTextDecorationItalic?'Italic ':''}${fontSize}px ${fontFamily}`;
    context.fillStyle = fillStyle;
    context.textAlign = textAlign;
    context.textBaseline = "middle";
    context.strokeStyle = strokeStyle;
    

    var text = context.measureText("AaBbYyZz");
    this.textWidth = text.width;

      /******************************绘制背景******************************/
        
        if(backgroundType === 'rect'){
          context.save();
          context.fillStyle = backgroundColor;
          context.beginPath();
          context.fillRect(width/2-this.textWidth/2-backgroundPadding, height/2-fontSize*2/2, this.textWidth+backgroundPadding*2, fontSize*2);
          context.closePath();
          context.translate(-borderWidth/2,-borderWidth/2);
          context.strokeStyle = backgroundStrokeColor;
          if(borderWidth>0){
            context.lineWidth = borderWidth;
            context.strokeRect(width/2-this.textWidth/2-backgroundPadding, height/2-fontSize*2/2, this.textWidth+backgroundPadding*2+borderWidth, fontSize*2+borderWidth);
          }
          context.restore();
        }
        if(backgroundType === 'round'){

          
          context.save();
          
          context.beginPath();
          context.arc(width/2, height/2, this.textWidth/2+backgroundPadding, 0,Math.PI*2);
          context.closePath();
          context.fillStyle = backgroundColor;
          context.fill();
          //画圆环
          context.beginPath();
          context.arc(width/2, height/2, this.textWidth/2+backgroundPadding, 0,Math.PI*2,true);
          context.arc(width/2, height/2, this.textWidth/2+backgroundPadding+borderWidth, 0,Math.PI*2,false);
          context.closePath();
          context.fillStyle = backgroundStrokeColor;
          context.fill();          
          context.restore();   	

          

        }
        if(backgroundType === 'roundRect'){

          if(borderWidth>0){
            context.save();
            context.fillStyle = backgroundColor;
            context.fillRect(width/2-this.textWidth/2-backgroundPadding, height/2-fontSize*2/2, this.textWidth+backgroundPadding*2, fontSize*2);
            context.strokeStyle = "rgba(0,0,0,0)";
            context.restore();
          }else{
            context.save();
            context.fillStyle = backgroundColor;
            context.drawRoundRect(width/2-this.textWidth/2-backgroundPadding, height/2-fontSize*2/2, this.textWidth+backgroundPadding*2, fontSize*2,5);
            context.fill();
            context.strokeStyle = backgroundStrokeColor;
            context.restore();
          }

          context.save();
          context.translate(-borderWidth/2,-borderWidth/2);
          context.fillStyle = 'rgba(0,0,0,0)';
          context.drawRoundRect(width/2-this.textWidth/2-backgroundPadding, height/2-fontSize*2/2, this.textWidth+backgroundPadding*2+borderWidth, fontSize*2+borderWidth,5);
          context.fill();
          context.strokeStyle = backgroundStrokeColor;
          if(borderWidth>0){
            context.lineWidth = borderWidth;
            context.stroke();
          }
          context.restore();
        }
      /******************************绘制背景******************************/

    
  
    context.fillStyle = fillStyle;
    // if(shadowBlur>0){
    //   context.shadowColor = shadowColor;
    //   context.shadowOffsetX = shadowOffsetX;
    //   context.shadowOffsetY = shadowOffsetY;
    //   context.shadowBlur = shadowBlur;
    // }
    //由于地图实现不了标注的阴影，改为文字描边
    if(shadowBlur>0){
      context.strokeStyle = shadowColor;
      context.lineWidth = shadowBlur;
      context.lineJoin = 'round';
      context.strokeText("AaBbYyZz", width/2, height/2)
    }{
      context.fillText("AaBbYyZz", width/2, height/2, width);
    }

    // var text = context.measureText("AaBbYyZz");
    // this.textWidth = text.width;
    textDecorations.forEach(textDecoration=>{
      if(textDecoration === 'underline'){
        context.fillRect(width/2-text.width/2, height/2+fontSize/2, text.width, 1);		
      }
      else if(textDecoration === 'line-through'){
        context.fillRect(width/2-text.width/2, height/2, text.width, 2);		
      }
    });
    context.restore();
    
    /***************************绘制文字**************************/
    
    
  }
  update(options){
    this.config = Object.assign(this.config,options);
    this.render();
  }

}

export default LabelPreviewCanvas
