class Clock extends Emit {
  constructor(){
    this.timer = null;
    this.inPause = false;
  }
  start(){
    this.timer = setTimeout(()=>{
          if(!this.inPause){
            this.fire('change',performance.now()/1000);
          }
          requestAnimationFrame(this.start.bind(this));  
    },1000)
  }
  pause(){
    this.inPause = true;
  }
  resume(){
    this.inPause = false;
  }
  stop(){
    clearTimeout(this.timer)
  }
}
