;
(function() {
    if (!Date.prototype.format) {
        Date.prototype.format = function(pattern) {
            function zeroize(num) {
                return num < 10 ? "0" + num : num;
            };
            var weeks = {
                "Mon": 1,
                "Tue": 2,
                "Wed": 3,
                "Thu": 4,
                "Fri": 5,
                "Sat": 6,
                "Sun": 7
            };
            var pattern = pattern; //    YYYY-MM-DD 或 MM-DD-YYYY 或 YYYY-MM-DD , hh : mm : ss
            var dateObj = {
                "Y": this.getFullYear(),
                "M": zeroize(this.getMonth() + 1),
                "D": zeroize(this.getDate()),
                "H": zeroize(this.getHours() % 12),
                "h": zeroize(this.getHours()),
                "m": zeroize(this.getMinutes()),
                "s": zeroize(this.getSeconds()),
                "w": weeks[this.toDateString().split(" ")[0]]
            };
            Object.defineProperty(dateObj,'apm',{
				get(){
					return (dateObj.h > 0 && dateObj.h < 12) ? 'am' : 'pm';
                }
            });
            return pattern.replace(/YYYY|MM|DD|hh|mm|ss|w/g, function(match) {
                switch (match) {
                    case "YYYY":
                        return dateObj.Y;
                    case "MM":
                        return dateObj.M;
                    case "DD":
                        return dateObj.D;
                    case "HH":
                        return dateObj.H;
                    case "apm":
                        return dateObj.apm;
                    case "hh":
                        return dateObj.h;
                    case "mm":
                        return dateObj.m;
                    case "ss":
                        return dateObj.s;
                    case "w":
                        return dateObj.w
                };
            });
        };
    }

    if (!Date.prototype.past) {
        Date.prototype.past = function(pattern, pastDays) {
            function zeroize(num) {
                return num < 10 ? "0" + num : num;
            };
            var weeks = {
                "Mon": 1,
                "Tue": 2,
                "Wed": 3,
                "Thu": 4,
                "Fri": 5,
                "Sat": 6,
                "Sun": 7
            };
            var pastday = new Date((this - 0) - 1000 * 60 * 60 * 24 * pastDays);
            var pattern = pattern; //    YYYY-MM-DD 或 MM-DD-YYYY 或 YYYY-MM-DD , hh : mm : ss
            var dateObj = {
                "Y": pastday.getFullYear(),
                "M": zeroize(pastday.getMonth() + 1),
                "D": zeroize(pastday.getDate()),
                "h": zeroize(pastday.getHours()),
                "m": zeroize(pastday.getMinutes()),
                "s": zeroize(pastday.getSeconds()),
                "w": weeks[this.toDateString().split("")[0]]
            };
            return pattern.replace(/YYYY|MM|DD|hh|mm|ss|w/g, function(match) {
                switch (match) {
                    case "YYYY":
                        return dateObj.Y;
                    case "MM":
                        return dateObj.M;
                    case "DD":
                        return dateObj.D;
                    case "hh":
                        return dateObj.h;
                    case "mm":
                        return dateObj.m;
                    case "ss":
                        return dateObj.s;
                    case "w":
                        return dateObj.w
                };
            });
        };
    }

    if (Date.prototype.past && !Date.prototype.yestoday) {
        Date.prototype.yestoday = function(pattern) {
            return this.past(pattern, 1);
        };
    }

    if (Date.prototype.past && !Date.prototype.tomorrow) {
        Date.prototype.tomorrow = function(pattern) {
            return this.past(pattern, -1);
        }
    }
    
    if(!Date.prototype.getMonthDays){
        Date.prototype.getMonthDays = function() {
            var currentMonth = this.format("MM");
            var currentMonthUTC = this.getTime();
            var oneDay = 24 * 60 * 60 * 1000;
            while(new Date(currentMonthUTC).format("MM") == currentMonth){
                currentMonthUTC += oneDay;
            }
            return Number(new Date(currentMonthUTC - oneDay).format("DD"));
        };    
    }
    if(Date.prototype.toUTC){
	Date.prototype.toUTC() = function(){
	    var time = this.getTime();
	    var offset = this.getTimezoneOffset();
	    return utc - offset * 60 * 1000;
	}
    }
})();
