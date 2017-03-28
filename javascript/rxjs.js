var numberic = function(event) {
  var value = event.target.value;

  function toNumber(string) {
    if (isNaN(string.slice(0, -1))) {
      //包含非数字及小数点的字符，直接切掉
      if (/[^\d|\.]/gi.test(string)) {
        return string.replace(/[^\d\.]/gi, "")
      }
      //第一位为小数点，直接切掉
      if (string.indexOf(".") === 0) {
        return string.slice(1)
      }
      //包含两个小数点，切掉最后一个小数点
      let lastDotIndex = string.lastIndexOf(".");
      let strings = string.split("");
      strings.splice(lastDotIndex, 1);
      return strings.join("")
    } else {
      return string.slice(0, -1)
    }
  };
  event.target.value = (isNaN(value) ? toNumber(value) : value)
};
var fetchData = function(value) {
  $.ajax({
      url: 'test.action',
      type: 'POST',
      dataType: 'json',
      data: {
        param1: value
      },
    })
    .done(function() {
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
};

Rx.Observable.fromEvent(input, "input")
  .do(numberic) //处理非纯函数有副作用的逻辑，比如操作DOM
  .debounceTime(3000) //函数防抖 3秒之内不发送流，3秒时发送
  .pluck("target", "value") //相当于(e)=>e.targer.value         
  .filter((value) => value.trim() !== "") //过滤掉空字符
  .subscribe(fetchData)
