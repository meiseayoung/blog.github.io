/**
 * 使用requestAnimationFrame API 实现动画效果
 * @param element DOM元素
 * @param angle 旋转角度
 * @param function 作动画的递归函数 
 **/
function animate(element,angle){
    var rotate = 0;
    var timer = setInterval(function(){
        rotate = (rotate+(angle || 0.1) )%360;
    },100);
    return function(){
        requestAnimationFrame(arguments.callee);
        element.style.transform = "rotate("+ (rotate) +"deg)";
    };
};
