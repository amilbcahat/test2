!function($) {
var defaults = {
vertical:!1,
rtl:!1,
start:1,
offset:1,
size:null,
scroll:1,
visible:null,
animation:"normal",
easing:"swing",
auto:0,
wrap:null,
initCallback:null,
setupCallback:null,
reloadCallback:null,
itemLoadCallback:null,
itemFirstInCallback:null,
itemFirstOutCallback:null,
itemLastInCallback:null,
itemLastOutCallback:null,
itemVisibleInCallback:null,
itemVisibleOutCallback:null,
animationStepCallback:null,
buttonNextHTML:"<div></div>",
buttonPrevHTML:"<div></div>",
buttonNextEvent:"click",
buttonPrevEvent:"click",
buttonNextCallback:null,
buttonPrevCallback:null,
itemFallbackDimension:null
}, windowLoaded = !1;
$(window).bind("load.jcarousel", function() {
windowLoaded = !0;
}), $.jcarousel = function(e, o) {
this.options = $.extend({}, defaults, o || {}), this.locked = !1, this.autoStopped = !1, 
this.container = null, this.clip = null, this.list = null, this.buttonNext = null, 
this.buttonPrev = null, this.buttonNextState = null, this.buttonPrevState = null, 
o && void 0 !== o.rtl || (this.options.rtl = "rtl" == ($(e).attr("dir") || $("html").attr("dir") || "").toLowerCase()), 
this.wh = this.options.vertical ? "height" :"width", this.lt = this.options.vertical ? "top" :this.options.rtl ? "right" :"left";
for (var skin = "", split = e.className.split(" "), i = 0; i < split.length; i++) if (-1 != split[i].indexOf("jcarousel-skin")) {
$(e).removeClass(split[i]), skin = split[i];
break;
}
"UL" == e.nodeName.toUpperCase() || "OL" == e.nodeName.toUpperCase() ? (this.list = $(e), 
this.clip = this.list.parents(".jcarousel-clip"), this.container = this.list.parents(".jcarousel-container")) :(this.container = $(e), 
this.list = this.container.find("ul,ol").eq(0), this.clip = this.container.find(".jcarousel-clip")), 
0 === this.clip.size() && (this.clip = this.list.wrap("<div></div>").parent()), 
0 === this.container.size() && (this.container = this.clip.wrap("<div></div>").parent()), 
"" !== skin && -1 == this.container.parent()[0].className.indexOf("jcarousel-skin") && this.container.wrap('<div class=" ' + skin + '"></div>'), 
this.buttonPrev = $(".jcarousel-prev", this.container), 0 === this.buttonPrev.size() && null !== this.options.buttonPrevHTML && (this.buttonPrev = $(this.options.buttonPrevHTML).appendTo(this.container)), 
this.buttonPrev.addClass(this.className("jcarousel-prev")), this.buttonNext = $(".jcarousel-next", this.container), 
0 === this.buttonNext.size() && null !== this.options.buttonNextHTML && (this.buttonNext = $(this.options.buttonNextHTML).appendTo(this.container)), 
this.buttonNext.addClass(this.className("jcarousel-next")), this.clip.addClass(this.className("jcarousel-clip")).css({
position:"relative"
}), this.list.addClass(this.className("jcarousel-list")).css({
overflow:"hidden",
position:"relative",
top:0,
margin:0,
padding:0
}).css(this.options.rtl ? "right" :"left", 0), this.container.addClass(this.className("jcarousel-container")).css({
position:"relative"
}), !this.options.vertical && this.options.rtl && this.container.addClass("jcarousel-direction-rtl").attr("dir", "rtl");
var di = null !== this.options.visible ? Math.ceil(this.clipping() / this.options.visible) :null, li = this.list.children("li"), self = this;
if (li.size() > 0) {
var wh = 0, j = this.options.offset;
li.each(function() {
self.format(this, j++), wh += self.dimension(this, di);
}), this.list.css(this.wh, wh + 200 + "px"), o && void 0 !== o.size || (this.options.size = li.size());
}
this.container.css("display", "block"), this.buttonNext.css("display", "block"), 
this.buttonPrev.css("display", "block"), this.funcNext = function() {
self.next();
}, this.funcPrev = function() {
self.prev();
}, this.funcResize = function() {
self.resizeTimer && clearTimeout(self.resizeTimer), self.resizeTimer = setTimeout(function() {
self.reload();
}, 100);
}, null !== this.options.initCallback && this.options.initCallback(this, "init"), 
!windowLoaded && $.browser.safari ? (this.buttons(!1, !1), $(window).bind("load.jcarousel", function() {
self.setup();
})) :this.setup();
};
var $jc = $.jcarousel;
$jc.fn = $jc.prototype = {
jcarousel:"0.2.8"
}, $jc.fn.extend = $jc.extend = $.extend, $jc.fn.extend({
setup:function() {
if (this.first = null, this.last = null, this.prevFirst = null, this.prevLast = null, 
this.animating = !1, this.timer = null, this.resizeTimer = null, this.tail = null, 
this.inTail = !1, !this.locked) {
this.list.css(this.lt, this.pos(this.options.offset) + "px");
var p = this.pos(this.options.start, !0);
this.prevFirst = this.prevLast = null, this.animate(p, !1), $(window).unbind("resize.jcarousel", this.funcResize).bind("resize.jcarousel", this.funcResize), 
null !== this.options.setupCallback && this.options.setupCallback(this);
}
},
reset:function() {
this.list.empty(), this.list.css(this.lt, "0px"), this.list.css(this.wh, "10px"), 
null !== this.options.initCallback && this.options.initCallback(this, "reset"), 
this.setup();
},
reload:function() {
if (null !== this.tail && this.inTail && this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) + this.tail), 
this.tail = null, this.inTail = !1, null !== this.options.reloadCallback && this.options.reloadCallback(this), 
null !== this.options.visible) {
var self = this, di = Math.ceil(this.clipping() / this.options.visible), wh = 0, lt = 0;
this.list.children("li").each(function(i) {
wh += self.dimension(this, di), i + 1 < self.first && (lt = wh);
}), this.list.css(this.wh, wh + "px"), this.list.css(this.lt, -lt + "px");
}
this.scroll(this.first, !1);
},
lock:function() {
this.locked = !0, this.buttons();
},
unlock:function() {
this.locked = !1, this.buttons();
},
size:function(s) {
return void 0 !== s && (this.options.size = s, this.locked || this.buttons()), this.options.size;
},
has:function(i, i2) {
void 0 !== i2 && i2 || (i2 = i), null !== this.options.size && i2 > this.options.size && (i2 = this.options.size);
for (var j = i; i2 >= j; j++) {
var e = this.get(j);
if (!e.length || e.hasClass("jcarousel-item-placeholder")) return !1;
}
return !0;
},
get:function(i) {
return $(">.jcarousel-item-" + i, this.list);
},
add:function(i, s) {
var e = this.get(i), old = 0, n = $(s);
if (0 === e.length) {
var c, j = $jc.intval(i);
for (e = this.create(i); ;) if (c = this.get(--j), 0 >= j || c.length) {
0 >= j ? this.list.prepend(e) :c.after(e);
break;
}
} else old = this.dimension(e);
"LI" == n.get(0).nodeName.toUpperCase() ? (e.replaceWith(n), e = n) :e.empty().append(s), 
this.format(e.removeClass(this.className("jcarousel-item-placeholder")), i);
var di = null !== this.options.visible ? Math.ceil(this.clipping() / this.options.visible) :null, wh = this.dimension(e, di) - old;
return i > 0 && i < this.first && this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) - wh + "px"), 
this.list.css(this.wh, $jc.intval(this.list.css(this.wh)) + wh + "px"), e;
},
remove:function(i) {
var e = this.get(i);
if (e.length && !(i >= this.first && i <= this.last)) {
var d = this.dimension(e);
i < this.first && this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) + d + "px"), 
e.remove(), this.list.css(this.wh, $jc.intval(this.list.css(this.wh)) - d + "px");
}
},
next:function() {
null === this.tail || this.inTail ? this.scroll("both" != this.options.wrap && "last" != this.options.wrap || null === this.options.size || this.last != this.options.size ? this.first + this.options.scroll :1) :this.scrollTail(!1);
},
prev:function() {
null !== this.tail && this.inTail ? this.scrollTail(!0) :this.scroll("both" != this.options.wrap && "first" != this.options.wrap || null === this.options.size || 1 != this.first ? this.first - this.options.scroll :this.options.size);
},
scrollTail:function(b) {
if (!this.locked && !this.animating && this.tail) {
this.pauseAuto();
var pos = $jc.intval(this.list.css(this.lt));
pos = b ? pos + this.tail :pos - this.tail, this.inTail = !b, this.prevFirst = this.first, 
this.prevLast = this.last, this.animate(pos);
}
},
scroll:function(i, a) {
this.locked || this.animating || (this.pauseAuto(), this.animate(this.pos(i), a));
},
pos:function(i, fv) {
var pos = $jc.intval(this.list.css(this.lt));
if (this.locked || this.animating) return pos;
"circular" != this.options.wrap && (i = 1 > i ? 1 :this.options.size && i > this.options.size ? this.options.size :i);
for (var g, back = this.first > i, f = "circular" != this.options.wrap && this.first <= 1 ? 1 :this.first, c = back ? this.get(f) :this.get(this.last), j = back ? f :f - 1, e = null, l = 0, p = !1, d = 0; back ? --j >= i :++j < i; ) e = this.get(j), 
p = !e.length, 0 === e.length && (e = this.create(j).addClass(this.className("jcarousel-item-placeholder")), 
c[back ? "before" :"after"](e), null !== this.first && "circular" == this.options.wrap && null !== this.options.size && (0 >= j || j > this.options.size) && (g = this.get(this.index(j)), 
g.length && (e = this.add(j, g.clone(!0))))), c = e, d = this.dimension(e), p && (l += d), 
null !== this.first && ("circular" == this.options.wrap || j >= 1 && (null === this.options.size || j <= this.options.size)) && (pos = back ? pos + d :pos - d);
var clipping = this.clipping(), cache = [], visible = 0, v = 0;
for (c = this.get(i - 1), j = i; ++visible; ) {
if (e = this.get(j), p = !e.length, 0 === e.length && (e = this.create(j).addClass(this.className("jcarousel-item-placeholder")), 
0 === c.length ? this.list.prepend(e) :c[back ? "before" :"after"](e), null !== this.first && "circular" == this.options.wrap && null !== this.options.size && (0 >= j || j > this.options.size) && (g = this.get(this.index(j)), 
g.length && (e = this.add(j, g.clone(!0))))), c = e, d = this.dimension(e), 0 === d) throw new Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...");
if ("circular" != this.options.wrap && null !== this.options.size && j > this.options.size ? cache.push(e) :p && (l += d), 
v += d, v >= clipping) break;
j++;
}
for (var x = 0; x < cache.length; x++) cache[x].remove();
l > 0 && (this.list.css(this.wh, this.dimension(this.list) + l + "px"), back && (pos -= l, 
this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) - l + "px")));
var last = i + visible - 1;
if ("circular" != this.options.wrap && this.options.size && last > this.options.size && (last = this.options.size), 
j > last) for (visible = 0, j = last, v = 0; ++visible && (e = this.get(j--), e.length) && (v += this.dimension(e), 
!(v >= clipping)); ) ;
var first = last - visible + 1;
if ("circular" != this.options.wrap && 1 > first && (first = 1), this.inTail && back && (pos += this.tail, 
this.inTail = !1), this.tail = null, "circular" != this.options.wrap && last == this.options.size && last - visible + 1 >= 1) {
var m = $jc.intval(this.get(last).css(this.options.vertical ? "marginBottom" :"marginRight"));
v - m > clipping && (this.tail = v - clipping - m);
}
for (fv && i === this.options.size && this.tail && (pos -= this.tail, this.inTail = !0); i-- > first; ) pos += this.dimension(this.get(i));
return this.prevFirst = this.first, this.prevLast = this.last, this.first = first, 
this.last = last, pos;
},
animate:function(p, a) {
if (!this.locked && !this.animating) {
this.animating = !0;
var self = this, scrolled = function() {
if (self.animating = !1, 0 === p && self.list.css(self.lt, 0), !self.autoStopped && ("circular" == self.options.wrap || "both" == self.options.wrap || "last" == self.options.wrap || null === self.options.size || self.last < self.options.size || self.last == self.options.size && null !== self.tail && !self.inTail) && self.startAuto(), 
self.buttons(), self.notify("onAfterAnimation"), "circular" == self.options.wrap && null !== self.options.size) for (var i = self.prevFirst; i <= self.prevLast; i++) null === i || i >= self.first && i <= self.last || !(1 > i || i > self.options.size) || self.remove(i);
};
if (this.notify("onBeforeAnimation"), this.options.animation && a !== !1) {
var o = this.options.vertical ? {
top:p
} :this.options.rtl ? {
right:p
} :{
left:p
}, settings = {
duration:this.options.animation,
easing:this.options.easing,
complete:scrolled
};
$.isFunction(this.options.animationStepCallback) && (settings.step = this.options.animationStepCallback), 
this.list.animate(o, settings);
} else this.list.css(this.lt, p + "px"), scrolled();
}
},
startAuto:function(s) {
if (void 0 !== s && (this.options.auto = s), 0 === this.options.auto) return this.stopAuto();
if (null === this.timer) {
this.autoStopped = !1;
var self = this;
this.timer = window.setTimeout(function() {
self.next();
}, 1e3 * this.options.auto);
}
},
stopAuto:function() {
this.pauseAuto(), this.autoStopped = !0;
},
pauseAuto:function() {
null !== this.timer && (window.clearTimeout(this.timer), this.timer = null);
},
buttons:function(n, p) {
null == n && (n = !this.locked && 0 !== this.options.size && (this.options.wrap && "first" != this.options.wrap || null === this.options.size || this.last < this.options.size), 
this.locked || this.options.wrap && "first" != this.options.wrap || null === this.options.size || !(this.last >= this.options.size) || (n = null !== this.tail && !this.inTail)), 
null == p && (p = !this.locked && 0 !== this.options.size && (this.options.wrap && "last" != this.options.wrap || this.first > 1), 
this.locked || this.options.wrap && "last" != this.options.wrap || null === this.options.size || 1 != this.first || (p = null !== this.tail && this.inTail));
var self = this;
this.buttonNext.size() > 0 ? (this.buttonNext.unbind(this.options.buttonNextEvent + ".jcarousel", this.funcNext), 
n && this.buttonNext.bind(this.options.buttonNextEvent + ".jcarousel", this.funcNext), 
this.buttonNext[n ? "removeClass" :"addClass"](this.className("jcarousel-next-disabled")).attr("disabled", n ? !1 :!0), 
null !== this.options.buttonNextCallback && this.buttonNext.data("jcarouselstate") != n && this.buttonNext.each(function() {
self.options.buttonNextCallback(self, this, n);
}).data("jcarouselstate", n)) :null !== this.options.buttonNextCallback && this.buttonNextState != n && this.options.buttonNextCallback(self, null, n), 
this.buttonPrev.size() > 0 ? (this.buttonPrev.unbind(this.options.buttonPrevEvent + ".jcarousel", this.funcPrev), 
p && this.buttonPrev.bind(this.options.buttonPrevEvent + ".jcarousel", this.funcPrev), 
this.buttonPrev[p ? "removeClass" :"addClass"](this.className("jcarousel-prev-disabled")).attr("disabled", p ? !1 :!0), 
null !== this.options.buttonPrevCallback && this.buttonPrev.data("jcarouselstate") != p && this.buttonPrev.each(function() {
self.options.buttonPrevCallback(self, this, p);
}).data("jcarouselstate", p)) :null !== this.options.buttonPrevCallback && this.buttonPrevState != p && this.options.buttonPrevCallback(self, null, p), 
this.buttonNextState = n, this.buttonPrevState = p;
},
notify:function(evt) {
var state = null === this.prevFirst ? "init" :this.prevFirst < this.first ? "next" :"prev";
this.callback("itemLoadCallback", evt, state), this.prevFirst !== this.first && (this.callback("itemFirstInCallback", evt, state, this.first), 
this.callback("itemFirstOutCallback", evt, state, this.prevFirst)), this.prevLast !== this.last && (this.callback("itemLastInCallback", evt, state, this.last), 
this.callback("itemLastOutCallback", evt, state, this.prevLast)), this.callback("itemVisibleInCallback", evt, state, this.first, this.last, this.prevFirst, this.prevLast), 
this.callback("itemVisibleOutCallback", evt, state, this.prevFirst, this.prevLast, this.first, this.last);
},
callback:function(cb, evt, state, i1, i2, i3, i4) {
if (null != this.options[cb] && ("object" == typeof this.options[cb] || "onAfterAnimation" == evt)) {
var callback = "object" == typeof this.options[cb] ? this.options[cb][evt] :this.options[cb];
if ($.isFunction(callback)) {
var self = this;
if (void 0 === i1) callback(self, state, evt); else if (void 0 === i2) this.get(i1).each(function() {
callback(self, this, i1, state, evt);
}); else for (var call = function(i) {
self.get(i).each(function() {
callback(self, this, i, state, evt);
});
}, i = i1; i2 >= i; i++) null === i || i >= i3 && i4 >= i || call(i);
}
}
},
create:function(i) {
return this.format("<li></li>", i);
},
format:function(e, i) {
e = $(e);
for (var split = e.get(0).className.split(" "), j = 0; j < split.length; j++) -1 != split[j].indexOf("jcarousel-") && e.removeClass(split[j]);
return e.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-" + i)).css({
"list-style":"none"
}).attr("jcarouselindex", i), e;
},
className:function(c) {
return c + " " + c + (this.options.vertical ? "-vertical" :"-horizontal");
},
dimension:function(e, d) {
var el = $(e);
if (null == d) return this.options.vertical ? el.outerHeight(!0) || $jc.intval(this.options.itemFallbackDimension) :el.outerWidth(!0) || $jc.intval(this.options.itemFallbackDimension);
var w = this.options.vertical ? d - $jc.intval(el.css("marginTop")) - $jc.intval(el.css("marginBottom")) :d - $jc.intval(el.css("marginLeft")) - $jc.intval(el.css("marginRight"));
return $(el).css(this.wh, w + "px"), this.dimension(el);
},
clipping:function() {
return this.options.vertical ? this.clip[0].offsetHeight - $jc.intval(this.clip.css("borderTopWidth")) - $jc.intval(this.clip.css("borderBottomWidth")) :this.clip[0].offsetWidth - $jc.intval(this.clip.css("borderLeftWidth")) - $jc.intval(this.clip.css("borderRightWidth"));
},
index:function(i, s) {
return null == s && (s = this.options.size), Math.round(((i - 1) / s - Math.floor((i - 1) / s)) * s) + 1;
}
}), $jc.extend({
defaults:function(d) {
return $.extend(defaults, d || {});
},
intval:function(v) {
return v = parseInt(v, 10), isNaN(v) ? 0 :v;
},
windowLoaded:function() {
windowLoaded = !0;
}
}), $.fn.jcarousel = function(o) {
if ("string" == typeof o) {
var instance = $(this).data("jcarousel"), args = Array.prototype.slice.call(arguments, 1);
return instance[o].apply(instance, args);
}
return this.each(function() {
var instance = $(this).data("jcarousel");
instance ? (o && $.extend(instance.options, o), instance.reload()) :$(this).data("jcarousel", new $jc(this, o));
});
};
}(jQuery);