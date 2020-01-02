/**
 * 监听元素滚动到顶部和底部
 * @param elem type:HTML Element 需要监听的元素
 * @param scrollTopBackFn type:Function 元素滚动到顶部时的回调
 * @param scrollBottomBackFn type:Function 元素滚动到底部时的回调
 * @return undefined 无返回值
 **/
export default function monitorElementScrolling(
  elem,
  scrollTopBackFn = function() {},
  scrollBottomBackFn = function() {},
  isAnimateOpen = false
) {
  let isScrolling = false;

  elem.addEventListener("mousedown", e => {
    isScrolling = true;
  });
  elem.addEventListener('touchstart',e=>{
    isScrolling = true;
    if(isAnimateOpen){
      elem.style.transform = 'translateZ(0)';
      elem.style.transition = `unset`;
      elem.style.transformOrigin = 'left bottom';
    }
  });
  elem.addEventListener("mouseup", e => {
    isScrolling = false;
  });
  elem.addEventListener("touchend", e => {
    if(scale > 1.02){
      scrollBottomBackFn();
    }
    scale = 1;
    if(isAnimateOpen){
      elem.style.transition = `all .3s ease`;
      elem.style.transform = `unset`;
    }
  });
  let scale = 1;
  elem.addEventListener('touchmove',e=>{
    let scrollHeight = elem.scrollHeight;
    let scrollTop = elem.scrollTop;
    let { height } = elem.getBoundingClientRect();
    if(scrollHeight === height){
      return;
    }
    if (scrollTop >= scrollHeight - height) {
      scale < 1.1 && ( scale += 0.002 );
      if(isAnimateOpen){
        elem.style.transform = `scaleY(${scale}) translateZ(0)`;
      }
    }
  });
}
