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
(function(a){typeof define=="function"&&define.amd?define(["jquery"],a):typeof exports=="object"?module.exports=a:a(jQuery)})(function(a){function g(b){var c=b||window.event,f=[].slice.call(arguments,1),g=0,h=0,i=0,j=0,k=0,l;b=a.event.fix(c),b.type="mousewheel",c.wheelDelta&&(g=c.wheelDelta),c.detail&&(g=c.detail*-1),c.deltaY&&(i=c.deltaY*-1,g=i),c.deltaX&&(h=c.deltaX,g=h*-1),c.wheelDeltaY!==undefined&&(i=c.wheelDeltaY),c.wheelDeltaX!==undefined&&(h=c.wheelDeltaX*-1),j=Math.abs(g);if(!d||j<d)d=j;k=Math.max(Math.abs(i),Math.abs(h));if(!e||k<e)e=k;return l=g>0?"floor":"ceil",g=Math[l](g/d),h=Math[l](h/e),i=Math[l](i/e),f.unshift(b,g,h,i),(a.event.dispatch||a.event.handle).apply(this,f)}var b=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],c="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],d,e;if(a.event.fixHooks)for(var f=b.length;f;)a.event.fixHooks[b[--f]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=c.length;a;)this.addEventListener(c[--a],g,!1);else this.onmousewheel=g},teardown:function(){if(this.removeEventListener)for(var a=c.length;a;)this.removeEventListener(c[--a],g,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})