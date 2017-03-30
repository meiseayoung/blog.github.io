function add() {
  var result = 0;

  function _calc(args) {
    var temp = 0;
    for (let i = 0; i < args.length; i++) {
      temp += args[i]
    };
    return temp;
  };
  result += _calc(arguments);
  var calc = function() {
    result += _calc(arguments);
    return calc;
  };
  calc.toString = function() {
    return result;
  }
  return calc;
};
