/*! Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.1.3
 *
 * Requires: 1.2.2+
 */
!function(factory) {
"function" == typeof define && define.amd ? define([ "jquery" ], factory) :"object" == typeof exports ? module.exports = factory :factory(jQuery);
}(function($) {
function handler(event) {
var fn, orgEvent = event || window.event, args = [].slice.call(arguments, 1), delta = 0, deltaX = 0, deltaY = 0, absDelta = 0, absDeltaXY = 0;
return event = $.event.fix(orgEvent), event.type = "mousewheel", orgEvent.wheelDelta && (delta = orgEvent.wheelDelta), 
orgEvent.detail && (delta = -1 * orgEvent.detail), orgEvent.deltaY && (deltaY = -1 * orgEvent.deltaY, 
delta = deltaY), orgEvent.deltaX && (deltaX = orgEvent.deltaX, delta = -1 * deltaX), 
void 0 !== orgEvent.wheelDeltaY && (deltaY = orgEvent.wheelDeltaY), void 0 !== orgEvent.wheelDeltaX && (deltaX = -1 * orgEvent.wheelDeltaX), 
absDelta = Math.abs(delta), (!lowestDelta || lowestDelta > absDelta) && (lowestDelta = absDelta), 
absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX)), (!lowestDeltaXY || lowestDeltaXY > absDeltaXY) && (lowestDeltaXY = absDeltaXY), 
fn = delta > 0 ? "floor" :"ceil", delta = Math[fn](delta / lowestDelta), deltaX = Math[fn](deltaX / lowestDeltaXY), 
deltaY = Math[fn](deltaY / lowestDeltaXY), args.unshift(event, delta, deltaX, deltaY), 
($.event.dispatch || $.event.handle).apply(this, args);
}
var lowestDelta, lowestDeltaXY, toFix = [ "wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll" ], toBind = "onwheel" in document || document.documentMode >= 9 ? [ "wheel" ] :[ "mousewheel", "DomMouseScroll", "MozMousePixelScroll" ];
if ($.event.fixHooks) for (var i = toFix.length; i; ) $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
$.event.special.mousewheel = {
setup:function() {
if (this.addEventListener) for (var i = toBind.length; i; ) this.addEventListener(toBind[--i], handler, !1); else this.onmousewheel = handler;
},
teardown:function() {
if (this.removeEventListener) for (var i = toBind.length; i; ) this.removeEventListener(toBind[--i], handler, !1); else this.onmousewheel = null;
}
}, $.fn.extend({
mousewheel:function(fn) {
return fn ? this.bind("mousewheel", fn) :this.trigger("mousewheel");
},
unmousewheel:function(fn) {
return this.unbind("mousewheel", fn);
}
});
});