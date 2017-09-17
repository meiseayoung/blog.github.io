/**
 * 源码出自 https://samy.pl/;
 */
if (!window.$)
    (s = (z = document).getElementsByTagName(x = "script")[0]).parentNode.insertBefore(z.createElement(x), s).src = "//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js";
var ua = navigator.userAgent.toLowerCase();
var msie = ua.indexOf("msie") > -1;
if (!msie && navigator.appName == "Netscape" && ua.indexOf("trident/") > -1)
    msie = true;
var safari = ua.indexOf("chrome") > -1;
var chrome = ua.indexOf("safari") > -1;
var firefox = ua.indexOf("firefox") > -1;
function dc(event) {
    if (event.button == 2)
        return false
}
document.onmousedown = dc;
(function() {
    if (typeof window.CustomEvent === "function")
        return false;
    function CustomEvent(event, params) {
        params = params || {
                    bubbles: false,
                    cancelable: false,
                    detail: undefined
                };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent
})();
(function() {
    "use strict";
    var devtools = {
        open: false,
        first: true,
        orientation: null
};
    window.lq = devtools;
    var threshold = 160;
    var emitEvent = function(state, orientation, eventname) {
        if (!eventname)
            eventname = "devtoolschange";
        window.dispatchEvent(new CustomEvent(eventname,{
            detail: {
                open: state,
                orientation: orientation
            }
        }))
    };
    setInterval(function() {
        var widthThreshold = window.outerWidth - window.innerWidth > threshold;
        var heightThreshold = window.outerHeight - window.innerHeight > threshold;
        var orientation = widthThreshold ? "vertical" : "horizontal";
        if (!(heightThreshold && widthThreshold) && (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized || widthThreshold || heightThreshold)) {
            if (!devtools.open || devtools.orientation !== orientation) {
                emitEvent(true, orientation);
                if (lq.first) {
                    lq.first = false;
                    emitEvent(true, orientation, "firstevent")
                }
            }
            devtools.open = true;
            devtools.orientation = orientation
        } else {
            if (devtools.open) {
                emitEvent(false, null);
                if (lq.first) {
                    lq.first = false;
                    emitEvent(false, null, "firstevent")
                }
            }
            devtools.open = false;
            devtools.orientation = null
}
    }, 1e3);
    if (typeof module !== "undefined" && module.exports) {
        module.exports = devtools
    } else {
        window.devtools = devtools
    }
})();
var deb = 0;
var intr, _b;
var timerMax = deb ? 2e3 : 500;
var element = new Image;
var egg8msg = "No source for you! You found easter egg #8. Close the console to return to samy.pl ;)";
var utm = "__utmq";
var firstload = 1;
var solecon = clone(console);
function clone(obj) {
    if (null == obj || "object" != typeof obj)
        return obj;
    var copy = obj.constructor();
    for (var attr in obj)
        if (obj.hasOwnProperty(attr))
            copy[attr == "log" ? "go" : attr] = obj[attr];
    return copy
}
function al(x) {
    if (!deb)
        return;
    solecon.go(x)
}
function rmbody() {
    al("rm1");
    if (readCookie(utm) == 2)
        return;
    al("rm2");
    createCookie(utm, 2, 365 * 10);
    location.reload(true)
}
function noconsole3() {
    al("NOC3");
    noconsole()
}
function noconsole2() {
    al("NOC2");
    noconsole()
}
function noconsole() {
    al("noc1");
    if (readCookie(utm) == 1)
        return;
    al("noc2");
    createCookie(utm, 1, 365 * 10);
    location.reload(true)
}
function egg8log() {
    if (msie)
        solecon.go(egg8msg);
    else
solecon.go("%c" + egg8msg, "background: black; color: #00ff00; font-size: x-large;")
}
if (window.location.href.indexOf("noint") == -1) {
    if (readCookie(utm) != 1) {
        al("ngood");
        var noconyet = 0;
        var threshold = 160;
        var widthThreshold = window.outerWidth - window.innerWidth > threshold;
        var heightThreshold = window.outerHeight - window.innerHeight > threshold;
        var orientation = widthThreshold ? "vertical" : "horizontal";
        if (!(heightThreshold && widthThreshold) && (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized || widthThreshold || heightThreshold)) {
            if (!devtools.open || devtools.orientation !== orientation) {}
        } else {
            al("n1");
            noconyet = 1
        }
    }
    element.__defineGetter__("id", function() {
        al("dg");
        if (intr)
            clearTimeout(intr);
        if (!_b)
            rmbody();
        intr = setTimeout(noconsole2, timerMax * 1.5)
    });
    if (chrome || safari) {
        intr = setTimeout(noconsole3, timerMax * 2);
        al("c||s");
        setInterval(function() {
            solecon.go(element);
            solecon.clear();
            egg8log()
        }, timerMax)
    } else {
        al("elsec||s");
        window.addEventListener("devtoolschange", function(e) {
            if (e.detail.open) {
                rmbody();
                egg8log()
            } else {
                noconsole()
            }
        })
    }
}
function createCookie(name, value, days) {
    if (days > 0)
        eraseCookie(name);
    if (days) {
        var date = new Date;
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1e3);
        var expires = "; expires=" + date.toGMTString()
    } else         var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/"
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ")
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length)
    }
    return null
}
function eraseCookie(name) {
    createCookie(name, "", -1)
}
