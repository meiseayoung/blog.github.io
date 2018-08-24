const img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAElUlEQVRYR+2XW2hbdRzHP7Vrbm2TrEmapGnXxdrrJqu1k26FqRuzXjphe3D4pBMcIkURfJkivsjwyQdFhlXxQVCHKEym2A7nlDEmm0XRh7WzS22TJs2tuZ7c2kZO/8natUmTjoEI/p/OOTnn//38vr/LOanIZrNZ/sVV8d8C8F0B12lwXYLkNEgu0NhAtQ1se8F2FEy7N+VneQ5ExmHsNXB9u7L5UqqwUNMR6DkJ2vayQEoDOM/CLy+BygKVatiiEBsv+iATE8epNKTmYTEkziv1sO9TaBwsCbExgOM0jL0Jhh2gt4PSLDbMzkMyDCkvJHKimXmIBQVILHft4BdgP7ohRHGAwG9w4QgY7gNzH9R2gkKXA/BD3A1JJyQCkJaApICRZiAyJyAUajh0CQzdRSGKA3x/ABIpsD0ADftB2wpKLSymIe6FJaeAWPJAKgzJJKSD6yFM/XD44iYBZi7AyGFo7IHmR8HQB7p7QGkFKQjZWWF/agYSPliKCIFIAFIRCM9C3AWeKXF98CtofqIgRGEHfngWHGfA1g/bHwTDbqixA7VQmYIFWcgLaY8Ql9OwXIxxcRzNpShwA6Jz0PU0PPzZJgA+rId0BFr6wbgfDJ1Q0yRSsLwCkAlCOgDZBCRz3SDDyOmIBIULwSmYvwEKEzzvLRMg5Yb3GkCthIZesHSDuQuqrVCVL0IJMhERfV58uTtSojtkADkF/mkITIpaejEAmrp1EOtTIA+d4Q7R81Y7mHeB9m7Y2gAa/coGa8XXAoQ8EHaA2wGLCTh+reBwKgDgguHGFQCdHeptoDaAan0Et4S02oG1AGU7ILfZSaXYt7EdZACrEdRmAaDITcJCGU2nISm34hy4/cKBwDgkgDcKv3QLd8FwL8z9ClvtYNoG9Q1CXKcFZTVU5ADXQsjiYbkuguCdBd80zDvAfD8cv1pmEcq3/fQ2/HwC1HqoawOrCfQWcZ5Pw1onbkYfAtl+tw+CE2Iw9b0OB9/aBEDEBe92QCImCnG1Cwo9VGvEZnkIWTwuQTp0a/RyAaqAl52gtW0CIO/C6AnQaMHUCkYT6MxQWwdao5iK+ZWUQHJDyAnhOfD7wHcdpAg8VDx6+fHi7wK5GL88BmOfg9ECxiYw2sCyE0x2qDKtAGR8EJBzfg3cE+CfAb8H2gbg2BmoLF64G7+OZYiPHoPJH8Fih+Ye2L4XjG2gqV8BkLzgnwDnGDiuwOyEEH/ma6hSF7Q+f7H0B0kmAR88At4/oetxaOkDy72ga4YtOlgIQ/hv8PwBk5dh4ryYnM+dLSm+cQpWc0tBhj65iEqlRFtTjU5bi9looLLyLqLRGIHgPNFYjFg8TiKR5NTQobLEywcAvhsZ5bwzWxJgf6uewQP7NrR99Y+lU5C7e+j9b+jZ2UGTSUebVUetRkVUSuL2h5jyRnD6wyQzC7hmZjj1ylN3HmDk6jjnfp8q7cCuFgb37LjzAP87IHv66scjDOzpLloDs24377zwZNn2b6oL5JtHx/7i8nVP0Tbs72xkoLe8f0TlD6IC8cgQU6GFm3OgvV6DLH47q+w2vJ3Ny3nmH3FLn7+omD2aAAAAAElFTkSuQmCC';
class FacePreviewCanvas {
    constructor(options){
        var _config = {
            renderTo:undefined,
            layers:[{
              type: "dash", //线样式(类型)
              dashArray:[5,2],
              width: '1', //线宽
              color: "#ff0000", //颜色
              lineCap: "butt", //端头样式 'butt'|'round'|'square'
              lineJoin: "bevel" //接头样式 'bevel'斜角|'round'圆角|'miter'尖角
            },
            {
              type: "dash", //线样式(类型)
              dashArray:[1,5],
              width: '12', //线宽
              color: "#00ff00", //颜色
              lineCap: "round", //端头样式 'butt'|'round'|'square'
              lineJoin: "round" //接头样式 'bevel'斜角|'round'圆角|'miter'尖角
            },
            {
              type: "solid", //线样式(类型)
              width: '3', //线宽
              color: "#0000ff", //颜色
              lineCap: "round", //端头样式 'butt'|'round'|'square'
              lineJoin: "miter" //接头样式 'bevel'斜角|'round'圆角|'miter'尖角
            }],
            fillType:"image",    //填充方式 'color' | 'image'
            fillStyle:"#00ff00", //填充颜色
            fillImage:img,       //填充颜色

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
                layers,
                fillType,
                fillStyle,
                fillImage
        } = this.config;
        context.clearRect(0,0,width,height);
        let maxWidth = Math.max.apply(null,layers.map(layer=>Number(layer.width)));
        //第一步 先填充底色|底图
        context.save();
        if(fillType === 'image'){
            let fillImageCanvas = document.createElement("img");
            fillImageCanvas.width = 32;
            fillImageCanvas.height = 32;
            fillImageCanvas.src = fillImage;
            
            fillImageCanvas.onload = ()=>{
                context.save();
                let maxWidth = Math.max.apply(null,layers.map(layer=>Number(layer.width)));
                
                let pattern = context.createPattern(fillImageCanvas,'repeat');
                context.fillStyle = pattern;
                context.translate(maxWidth,maxWidth);  //context.createPattern会对整个画布进行填充
                context.fillRect(0,0,width-maxWidth*2,height-maxWidth*2);
                context.restore();		
                //第二步 描边
                
                
            }
        }else{
            context.fillStyle =  fillStyle;
            context.fillRect(0,0,width,height);
            
        }
        // for(let layerLenght = layers.length-1;layerLenght>=0;layerLenght--){
        for(let i = 0;i<layers.length;i++){
            let layer = layers[i];
            context.save();
            if(layer.dash.trim() !== ''){
                context.setLineDash(layer.dash.split(","));
            }
            context.lineWidth = Number(layer.width);
            context.strokeStyle = layer.color;
            context.lineCap = layer.cap;
            context.lineJoin = layer.join;
            context.beginPath();
            /********************上边线******************/
            context.moveTo(maxWidth/2, maxWidth/2);
            context.lineTo(width-maxWidth/2, maxWidth/2);
            /********************右边线******************/
            context.lineTo(width-maxWidth/2,height-maxWidth/2);
            /********************下边线******************/
            context.lineTo(maxWidth/2,height-maxWidth/2);
            /********************左边线******************/
            context.lineTo(maxWidth/2, maxWidth/2);
            context.closePath();

            context.stroke();
            context.restore();
        }
        context.restore();

    }
    update(options){
        this.config = Object.assign(this.config,options);
        this.render();
    }

}

export default FacePreviewCanvas;
