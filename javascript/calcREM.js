;(function (doc, win) {
	var devicePixelRatio = (function(){
		if(window.devicePixelRatio && typeof(window.devicePixelRatio) === "number" ){
			return window.devicePixelRatio;
		}else{
			return 1;
		}
	})();
	var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
        	//var mainWidth = document.body.getBoundingClientRect().width;
		var mainWidth = (document.body ? document.body.getBoundingClientRect().width : window.screen.availWidth);
        	if(mainWidth<1366)mainWidth = 1366;
        	if(mainWidth>1920)mainWidth = 1920;
			if (!mainWidth) return;
            docEl.style.fontSize = 100 * (mainWidth / 1920) * devicePixelRatio + 'px';
        };
    recalc(); 
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window); 
// 注意：这段代码最好写在body中最前面。REACT中组件构建成功componentDidMount生命周期内还没有进入doc.addEventListener('DOMContentLoaded', recalc, false);
// 因此获取不到正确的html根元素的font-size
