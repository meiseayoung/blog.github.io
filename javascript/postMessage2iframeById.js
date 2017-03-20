function getIframeById(id) {
	var iframes = window.frames;
	for (var i = 0; i < iframes.length; i++) {
		if (iframes[i].frameElement.id === id){
			return iframes[i];
		}		
	}
};
function postMessage2iframeById(message,id) {
	var iframe = getIframeById(id);
	var src = null;
	if(iframe !== undefined){
		src = iframe.src;
		iframe.postMessage(message,src);
	}else{
    		console.warn("没有找到指定iframe,操作失败");
  	}
};

export default postMessage2iframeById;
