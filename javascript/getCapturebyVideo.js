export function getCapturebyVideo(width, height) {
  let video = document.createElement("video");
  video.width = width;
  video.height = height;
  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d");
  let resolvePointer = null;
  let rejectPointer = null;
  let promise =  new Promise((resolve,reject)=>{
    resolvePointer = resolve;
    rejectPointer = reject;
  });
  window.navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true
    })
    .then(stream => {
      video.srcObject = stream;
      video.onloadedmetadata = function(e) {
        video.play();
        ctx.drawImage(video, 0, 0, width, height);
        resolvePointer({
          stopAudio:function(){
            stream.getAudioTracks().forEach(audio=>audio.stop())
          },
          stopVideo:function () {
            stream.getVideoTracks().forEach(video=>video.stop())
          },
          canvas:canvas,
          destroy:function () {
            cancelAnimationFrame(animate);
            stream.getAudioTracks().forEach(audio=>audio.stop());
            stream.getVideoTracks().forEach(video=>video.stop());
          }
        });
        var animate =  requestAnimationFrame(function() {
          ctx.clearRect(0,0,width,height);
          ctx.drawImage(video, 0, 0, width, height);
          animate = requestAnimationFrame(arguments.callee)
        });
      };

    })
    .catch(err => {
      rejectPointer(err)
    });
  return promise;
}
