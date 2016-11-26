import $ from "jquery";

(function (doc, win) {
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
        	var mainWidth = $("body").width();
        	if(mainWidth<1366)mainWidth = 1366;
        	if(mainWidth>1920)mainWidth = 1920;
			if (!mainWidth) return;
            docEl.style.fontSize = 100 * (mainWidth / 1920) * devicePixelRatio + 'px';
        };
    recalc(); 
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window); 
