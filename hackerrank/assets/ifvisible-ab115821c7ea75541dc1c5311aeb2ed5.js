/*Copyright (c) 2013 Serkan Yersen

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function() {
"use strict";
var addEvent, customEvent, doc, fireEvent, hidden, idleStartedTime, idleTime, ie, ifvisible, init, initialized, status, trackIdleStatus, visibilityChange;
ifvisible = {}, doc = document, initialized = !1, status = "active", idleTime = 6e4, 
idleStartedTime = !1, customEvent = function() {
var S4, addCustomEvent, cgid, fireCustomEvent, guid, listeners;
return S4 = function() {
return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
}, guid = function() {
return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}, listeners = {}, cgid = "__ceGUID", addCustomEvent = function(obj, event, callback) {
return obj[cgid] = void 0, obj[cgid] || (obj[cgid] = "ifvisible.object.event.identifier"), 
listeners[obj[cgid]] || (listeners[obj[cgid]] = {}), listeners[obj[cgid]][event] || (listeners[obj[cgid]][event] = []), 
listeners[obj[cgid]][event].push(callback);
}, fireCustomEvent = function(obj, event, memo) {
var ev, _i, _len, _ref, _results;
if (obj[cgid] && listeners[obj[cgid]] && listeners[obj[cgid]][event]) {
for (_ref = listeners[obj[cgid]][event], _results = [], _i = 0, _len = _ref.length; _len > _i; _i++) ev = _ref[_i], 
_results.push(ev(memo || {}));
return _results;
}
}, {
add:addCustomEvent,
fire:fireCustomEvent
};
}(), addEvent = function() {
var setListener;
return setListener = !1, function(el, ev, fn) {
return setListener || (setListener = el.addEventListener ? function(el, ev, fn) {
return el.addEventListener(ev, fn, !1);
} :el.attachEvent ? function(el, ev, fn) {
return el.attachEvent("on" + ev, fn, !1);
} :function(el, ev, fn) {
return el["on" + ev] = fn;
}), setListener(el, ev, fn);
};
}(), fireEvent = function(element, event) {
var evt;
return doc.createEventObject ? element.fireEvent("on" + event, evt) :(evt = doc.createEvent("HTMLEvents"), 
evt.initEvent(event, !0, !0), !element.dispatchEvent(evt));
}, ie = function() {
var all, check, div, undef, v;
for (undef = void 0, v = 3, div = doc.createElement("div"), all = div.getElementsByTagName("i"), 
check = function() {
return div.innerHTML = "<!--[if gt IE " + ++v + "]><i></i><![endif]-->", all[0];
}; check(); ) ;
return v > 4 ? v :undef;
}(), hidden = !1, visibilityChange = void 0, "undefined" != typeof doc.hidden ? (hidden = "hidden", 
visibilityChange = "visibilitychange") :"undefined" != typeof doc.mozHidden ? (hidden = "mozHidden", 
visibilityChange = "mozvisibilitychange") :"undefined" != typeof doc.msHidden ? (hidden = "msHidden", 
visibilityChange = "msvisibilitychange") :"undefined" != typeof doc.webkitHidden && (hidden = "webkitHidden", 
visibilityChange = "webkitvisibilitychange"), trackIdleStatus = function() {
var timer, wakeUp;
return timer = !1, wakeUp = function() {
return clearTimeout(timer), "active" !== status && ifvisible.wakeup(), idleStartedTime = +new Date(), 
timer = setTimeout(function() {
return "active" === status ? ifvisible.idle() :void 0;
}, idleTime);
}, wakeUp(), addEvent(doc, "mousemove", wakeUp), addEvent(doc, "keyup", wakeUp), 
addEvent(window, "scroll", wakeUp), ifvisible.focus(wakeUp);
}, init = function() {
var blur;
return initialized ? !0 :(hidden === !1 ? (blur = "blur", 9 > ie && (blur = "focusout"), 
addEvent(window, blur, function() {
return ifvisible.blur();
}), addEvent(window, "focus", function() {
return ifvisible.focus();
})) :addEvent(doc, visibilityChange, function() {
return doc[hidden] ? ifvisible.blur() :ifvisible.focus();
}, !1), initialized = !0, trackIdleStatus());
}, ifvisible = {
setIdleDuration:function(seconds) {
return idleTime = 1e3 * seconds;
},
getIdleDuration:function() {
return idleTime;
},
getIdleInfo:function() {
var now, res;
return now = +new Date(), res = {}, "idle" === status ? (res.isIdle = !0, res.idleFor = now - idleStartedTime, 
res.timeLeft = 0, res.timeLeftPer = 100) :(res.isIdle = !1, res.idleFor = now - idleStartedTime, 
res.timeLeft = idleStartedTime + idleTime - now, res.timeLeftPer = (100 - 100 * res.timeLeft / idleTime).toFixed(2)), 
res;
},
focus:function(callback) {
return "function" == typeof callback ? this.on("focus", callback) :(status = "active", 
customEvent.fire(this, "focus"), customEvent.fire(this, "wakeup"), customEvent.fire(this, "statusChanged", {
status:status
}));
},
blur:function(callback) {
return "function" == typeof callback ? this.on("blur", callback) :(status = "hidden", 
customEvent.fire(this, "blur"), customEvent.fire(this, "idle"), customEvent.fire(this, "statusChanged", {
status:status
}));
},
idle:function(callback) {
return "function" == typeof callback ? this.on("idle", callback) :(status = "idle", 
customEvent.fire(this, "idle"), customEvent.fire(this, "statusChanged", {
status:status
}));
},
wakeup:function(callback) {
return "function" == typeof callback ? this.on("wakeup", callback) :(status = "active", 
customEvent.fire(this, "wakeup"), customEvent.fire(this, "statusChanged", {
status:status
}));
},
on:function(name, callback) {
return init(), customEvent.add(this, name, callback);
},
onEvery:function(seconds, callback) {
var t;
return init(), t = setInterval(function() {
return "active" === status ? callback() :void 0;
}, 1e3 * seconds), {
stop:function() {
return clearInterval(t);
},
code:t,
callback:callback
};
},
now:function() {
return init(), "active" === status;
}
}, "function" == typeof define && define.amd ? define(function() {
return ifvisible;
}) :window.ifvisible = ifvisible;
}).call(this);