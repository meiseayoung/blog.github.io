Date.prototype.format = function(pattern){
    var pattern = pattern;    //    YYYY-MM-DD 或 MM-DD-YYYY 或 YYYY-MM-DD , hh : mm : ss
    var dateObj = {
        "Y" : this.getFullYear(),
        "M" : this.getMonth()+1,
        "D" : this.getDate(),
        "h" : this.getHours(),
        "m" : this.getMinutes(),
        "s" : this.getSeconds()
    };
    return pattern.replace(/YYYY|MM|DD|hh|mm|ss/g,function(match){
        switch(match){
            case "YYYY" :
                return dateObj.Y;
            case "MM" :
                return dateObj.M;
            case "DD" :
                return dateObj.D;
            case "hh" :
                return dateObj.h;
            case "mm" :
                return dateObj.m;
            case "ss" :
                return dateObj.s;
        };
    });
};
Date.prototype.past = function(pattern,pastDays){
    var pastday = new Date((this - 0) - 1000*60*60*24*pastDays);
    var pattern = pattern;    //    YYYY-MM-DD 或 MM-DD-YYYY 或 YYYY-MM-DD , hh : mm : ss
    var dateObj = {
        "Y" : pastday.getFullYear(),
        "M" : pastday.getMonth()+1,
        "D" : pastday.getDate(),
        "h" : pastday.getHours(),
        "m" : pastday.getMinutes(),
        "s" : pastday.getSeconds()
    };
    return pattern.replace(/YYYY|MM|DD|hh|mm|ss/g,function(match){
        switch(match){
            case "YYYY" :
                return dateObj.Y;
            case "MM" :
                return dateObj.M;
            case "DD" :
                return dateObj.D;
            case "hh" :
                return dateObj.h;
            case "mm" :
                return dateObj.m;
            case "ss" :
                return dateObj.s;
        };
    });
};
Date.prototype.yestoday = function(pattern){
    return this.past(pattern,1);
};
Date.prototype.tomorrow = function(pattern){
    return this.past(pattern,-1);
}