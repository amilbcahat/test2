// Typed.js | Copyright (c) 2014 Matt Boldt | www.mattboldt.com
// The above copyright notice and this permission notice shall be included in
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
!function($) {
"use strict";
var Typed = function(el, options) {
this.el = $(el), this.options = $.extend({}, $.fn.typed.defaults, options), this.text = this.el.text(), 
this.typeSpeed = this.options.typeSpeed, this.startDelay = this.options.startDelay, 
this.backSpeed = this.options.backSpeed, this.backDelay = this.options.backDelay, 
this.strings = this.options.strings, this.strPos = 0, this.arrayPos = 0, this.string = this.strings[this.arrayPos], 
this.stopNum = 0, this.loop = this.options.loop, this.loopCount = this.options.loopCount, 
this.curLoop = 1, this.stopArray = this.loop === !1 ? this.strings.length - 1 :this.strings.length, 
this.build();
};
Typed.prototype = {
constructor:Typed,
init:function() {
var self = this;
setTimeout(function() {
self.typewrite(self.string, self.strPos);
}, self.startDelay);
},
build:function() {
this.el.after('<span id="typed-cursor">|</span>'), this.init();
},
typewrite:function(curString, curStrPos) {
var humanize = Math.round(70 * Math.random()) + this.typeSpeed, self = this;
setTimeout(function() {
if (self.arrayPos < self.strings.length) {
if ("^" === curString.substr(curStrPos, 1)) {
var charPauseEnd = curString.substr(curStrPos + 1).indexOf(" "), charPause = curString.substr(curStrPos + 1, charPauseEnd);
curString = curString.replace("^" + charPause, "");
} else var charPause = 0;
setTimeout(function() {
if (self.el.text(self.text + curString.substr(0, curStrPos)), curStrPos > curString.length && self.arrayPos < self.stopArray) {
clearTimeout(clear), self.options.onStringTyped();
var clear = setTimeout(function() {
self.backspace(curString, curStrPos);
}, self.backDelay);
} else if (curStrPos++, self.typewrite(curString, curStrPos), self.loop === !1 && self.arrayPos === self.stopArray && curStrPos === curString.length) {
var clear = self.options.callback();
clearTimeout(clear);
}
}, charPause);
} else self.loop === !0 && self.loopCount === !1 ? (self.arrayPos = 0, self.init()) :self.loopCount !== !1 && self.curLoop < self.loopCount && (self.arrayPos = 0, 
self.curLoop = self.curLoop + 1, self.init());
}, humanize);
},
backspace:function(curString, curStrPos) {
var humanize = Math.round(70 * Math.random()) + this.backSpeed, self = this;
setTimeout(function() {
if (self.el.text(self.text + curString.substr(0, curStrPos)), curStrPos > self.stopNum) curStrPos--, 
self.backspace(curString, curStrPos); else if (curStrPos <= self.stopNum) {
clearTimeout(clear);
var clear = self.arrayPos = self.arrayPos + 1;
self.typewrite(self.strings[self.arrayPos], curStrPos);
}
}, humanize);
}
}, $.fn.typed = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("typed"), options = "object" == typeof option && option;
data || $this.data("typed", data = new Typed(this, options)), "string" == typeof option && data[option]();
});
}, $.fn.typed.defaults = {
strings:[ "These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!" ],
typeSpeed:0,
startDelay:0,
backSpeed:0,
backDelay:500,
loop:!1,
loopCount:!1,
callback:function() {},
onStringTyped:function() {}
};
}(window.jQuery);