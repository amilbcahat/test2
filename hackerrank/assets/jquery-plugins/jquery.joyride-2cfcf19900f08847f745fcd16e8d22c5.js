/*
 * jQuery Foundation Joyride Plugin 2.1
 * http://foundation.zurb.com
 * Copyright 2013, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/
!function($, window, undefined) {
"use strict";
var defaults = {
version:"2.1",
tipLocation:"bottom",
nubPosition:"auto",
scroll:!0,
scrollSpeed:300,
timer:0,
autoStart:!1,
startTimerOnClick:!0,
startOffset:0,
nextButton:!0,
tipAnimation:"fade",
pauseAfter:[],
tipAnimationFadeSpeed:300,
cookieMonster:!1,
cookieName:"joyride",
cookieDomain:!1,
cookiePath:!1,
localStorage:!1,
localStorageKey:"joyride",
tipContainer:"body",
modal:!1,
expose:!1,
postExposeCallback:$.noop,
preRideCallback:$.noop,
postRideCallback:$.noop,
preStepCallback:$.noop,
postStepCallback:$.noop,
template:{
link:'<a href="#close" class="joyride-close-tip">&times;</a>',
timer:'<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
tip:'<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
wrapper:'<div class="joyride-content-wrapper clearfix" role="dialog"></div>',
button:'<a href="#" class="pull-right joyride-next-tip"></a>',
modal:'<div class="joyride-modal-bg"></div>',
expose:'<div class="joyride-expose-wrapper"></div>',
exposeCover:'<div class="joyride-expose-cover"></div>'
}
}, Modernizr = Modernizr || !1, settings = {}, methods = {
init:function(opts) {
return this.each(function() {
$.isEmptyObject(settings) ? (settings = $.extend(!0, defaults, opts), settings.document = window.document, 
settings.$document = $(settings.document), settings.$window = $(window), settings.$content_el = $(this), 
settings.$body = $(settings.tipContainer), settings.body_offset = $(settings.tipContainer).position(), 
settings.$tip_content = $("> li", settings.$content_el), settings.paused = !1, settings.attempts = 0, 
settings.tipLocationPatterns = {
top:[ "bottom" ],
bottom:[],
left:[ "right", "top", "bottom" ],
right:[ "left", "top", "bottom" ]
}, methods.jquery_check(), $.isFunction($.cookie) || (settings.cookieMonster = !1), 
settings.cookieMonster && $.cookie(settings.cookieName) || settings.localStorage && methods.support_localstorage() && localStorage.getItem(settings.localStorageKey) || (settings.$tip_content.each(function(index) {
methods.create({
$li:$(this),
index:index
});
}), settings.autoStart && (!settings.startTimerOnClick && settings.timer > 0 ? (methods.show("init"), 
methods.startTimer()) :methods.show("init"))), settings.$document.on("click.joyride", ".joyride-next-tip, .joyride-modal-bg", function(e) {
e.preventDefault(), settings.$li.next().length < 1 ? methods.end() :settings.timer > 0 ? (clearTimeout(settings.automate), 
methods.hide(), methods.show(), methods.startTimer()) :(methods.hide(), methods.show());
}), settings.$document.on("click.joyride", ".joyride-close-tip", function(e) {
e.preventDefault(), methods.end();
}), settings.$window.bind("resize.joyride", function() {
if (settings.$li) {
if (settings.exposed && settings.exposed.length > 0) {
var $els = $(settings.exposed);
$els.each(function() {
var $this = $(this);
methods.un_expose($this), methods.expose($this);
});
}
methods.is_phone() ? methods.pos_phone() :methods.pos_default();
}
})) :methods.restart();
});
},
resume:function() {
methods.set_li(), methods.show();
},
nextTip:function() {
settings.$li.next().length < 1 ? methods.end() :settings.timer > 0 ? (clearTimeout(settings.automate), 
methods.hide(), methods.show(), methods.startTimer()) :(methods.hide(), methods.show());
},
tip_template:function(opts) {
var $blank, content, $wrapper;
return opts.tip_class = opts.tip_class || "", $blank = $(settings.template.tip).addClass(opts.tip_class), 
content = $.trim($(opts.li).html()) + methods.button_text(opts.button_text) + settings.template.link + methods.timer_instance(opts.index), 
$wrapper = $(settings.template.wrapper), opts.li.attr("data-aria-labelledby") && $wrapper.attr("aria-labelledby", opts.li.attr("data-aria-labelledby")), 
opts.li.attr("data-aria-describedby") && $wrapper.attr("aria-describedby", opts.li.attr("data-aria-describedby")), 
$blank.append($wrapper), $blank.first().attr("data-index", opts.index), $(".joyride-content-wrapper", $blank).append(content), 
$blank[0];
},
timer_instance:function(index) {
var txt;
return txt = 0 === index && settings.startTimerOnClick && settings.timer > 0 || 0 === settings.timer ? "" :methods.outerHTML($(settings.template.timer)[0]);
},
button_text:function(txt) {
return settings.nextButton ? (txt = $.trim(txt) || "Next", txt = methods.outerHTML($(settings.template.button).append(txt)[0])) :txt = "", 
txt;
},
create:function(opts) {
var buttonText = opts.$li.attr("data-button") || opts.$li.attr("data-text"), tipClass = opts.$li.attr("class"), $tip_content = $(methods.tip_template({
tip_class:tipClass,
index:opts.index,
button_text:buttonText,
li:opts.$li
}));
$(settings.tipContainer).append($tip_content);
},
show:function(init) {
var ii, p, opts = {}, opts_arr = [], opts_len = 0, $timer = null;
if (settings.$li === undefined || -1 === $.inArray(settings.$li.index(), settings.pauseAfter)) if (settings.paused ? settings.paused = !1 :methods.set_li(init), 
settings.attempts = 0, settings.$li.length && settings.$target.length > 0) {
for (init && (settings.preRideCallback(settings.$li.index(), settings.$next_tip), 
settings.modal && methods.show_modal()), settings.preStepCallback(settings.$li.index(), settings.$next_tip), 
opts_arr = (settings.$li.data("options") || ":").split(";"), opts_len = opts_arr.length, 
ii = opts_len - 1; ii >= 0; ii--) p = opts_arr[ii].split(":"), 2 === p.length && (opts[$.trim(p[0])] = $.trim(p[1]));
settings.tipSettings = $.extend({}, settings, opts), settings.tipSettings.tipLocationPattern = settings.tipLocationPatterns[settings.tipSettings.tipLocation], 
settings.modal && settings.expose && methods.expose(), !/body/i.test(settings.$target.selector) && settings.scroll && methods.scroll_to(), 
methods.is_phone() ? methods.pos_phone(!0) :methods.pos_default(!0), $timer = $(".joyride-timer-indicator", settings.$next_tip), 
/pop/i.test(settings.tipAnimation) ? ($timer.outerWidth(0), settings.timer > 0 ? (settings.$next_tip.show(), 
$timer.animate({
width:$(".joyride-timer-indicator-wrap", settings.$next_tip).outerWidth()
}, settings.timer)) :settings.$next_tip.show()) :/fade/i.test(settings.tipAnimation) && ($timer.outerWidth(0), 
settings.timer > 0 ? (settings.$next_tip.fadeIn(settings.tipAnimationFadeSpeed), 
settings.$next_tip.show(), $timer.animate({
width:$(".joyride-timer-indicator-wrap", settings.$next_tip).outerWidth()
}, settings.timer)) :settings.$next_tip.fadeIn(settings.tipAnimationFadeSpeed)), 
settings.$current_tip = settings.$next_tip, $(".joyride-next-tip", settings.$current_tip).focus(), 
methods.tabbable(settings.$current_tip);
} else settings.$li && settings.$target.length < 1 ? methods.show() :methods.end(); else settings.paused = !0;
},
is_phone:function() {
return Modernizr ? Modernizr.mq("only screen and (max-width: 767px)") :settings.$window.width() < 767 ? !0 :!1;
},
support_localstorage:function() {
return Modernizr ? Modernizr.localstorage :!!window.localStorage;
},
hide:function() {
settings.modal && settings.expose && methods.un_expose(), settings.modal || $(".joyride-modal-bg").hide(), 
settings.$current_tip.hide(), settings.postStepCallback(settings.$li.index(), settings.$current_tip);
},
set_li:function(init) {
init ? (settings.$li = settings.$tip_content.eq(settings.startOffset), methods.set_next_tip(), 
settings.$current_tip = settings.$next_tip) :(settings.$li = settings.$li.next(), 
methods.set_next_tip()), methods.set_target();
},
set_next_tip:function() {
settings.$next_tip = $(".joyride-tip-guide[data-index=" + settings.$li.index() + "]");
},
set_target:function() {
var cl = settings.$li.attr("data-class"), id = settings.$li.attr("data-id"), $sel = function() {
return id ? $(settings.document.getElementById(id)) :cl ? $("." + cl).filter(":visible").first() :$("body");
};
settings.$target = $sel();
},
scroll_to:function() {
var window_half, tipOffset;
window_half = settings.$window.height() / 2, tipOffset = Math.ceil(settings.$target.offset().top - window_half + settings.$next_tip.outerHeight()), 
$("html, body").stop().animate({
scrollTop:tipOffset
}, settings.scrollSpeed);
},
paused:function() {
return -1 === $.inArray(settings.$li.index() + 1, settings.pauseAfter) ? !0 :!1;
},
destroy:function() {
$.isEmptyObject(settings) || settings.$document.off(".joyride"), $(window).off(".joyride"), 
$(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride"), $(".joyride-tip-guide, .joyride-modal-bg").remove(), 
clearTimeout(settings.automate), settings = {};
},
restart:function() {
settings.autoStart ? (methods.hide(), settings.$li = undefined, methods.show("init")) :(!settings.startTimerOnClick && settings.timer > 0 ? (methods.show("init"), 
methods.startTimer()) :methods.show("init"), settings.autoStart = !0);
},
pos_default:function(init) {
var $nub = (Math.ceil(settings.$window.height() / 2), settings.$next_tip.offset(), 
$(".joyride-nub", settings.$next_tip)), nub_width = Math.ceil($nub.outerWidth() / 2), nub_height = Math.ceil($nub.outerHeight() / 2), toggle = init || !1;
if (toggle && (settings.$next_tip.css("visibility", "hidden"), settings.$next_tip.show()), 
/body/i.test(settings.$target.selector)) settings.$li.length && methods.pos_modal($nub); else {
var topAdjustment = settings.tipSettings.tipAdjustmentY ? parseInt(settings.tipSettings.tipAdjustmentY) :0, leftAdjustment = settings.tipSettings.tipAdjustmentX ? parseInt(settings.tipSettings.tipAdjustmentX) :0;
methods.bottom() ? (settings.$next_tip.css({
top:settings.$target.offset().top + nub_height + settings.$target.outerHeight() + topAdjustment,
left:settings.$target.offset().left + leftAdjustment
}), /right/i.test(settings.tipSettings.nubPosition) && settings.$next_tip.css("left", settings.$target.offset().left - settings.$next_tip.outerWidth() + settings.$target.outerWidth()), 
methods.nub_position($nub, settings.tipSettings.nubPosition, "top")) :methods.top() ? (settings.$next_tip.css({
top:settings.$target.offset().top - settings.$next_tip.outerHeight() - nub_height + topAdjustment,
left:settings.$target.offset().left + leftAdjustment
}), methods.nub_position($nub, settings.tipSettings.nubPosition, "bottom")) :methods.right() ? (settings.$next_tip.css({
top:settings.$target.offset().top + topAdjustment,
left:settings.$target.outerWidth() + settings.$target.offset().left + nub_width + leftAdjustment
}), methods.nub_position($nub, settings.tipSettings.nubPosition, "left")) :methods.left() && (settings.$next_tip.css({
top:settings.$target.offset().top + topAdjustment,
left:settings.$target.offset().left - settings.$next_tip.outerWidth() - nub_width + leftAdjustment
}), methods.nub_position($nub, settings.tipSettings.nubPosition, "right")), !methods.visible(methods.corners(settings.$next_tip)) && settings.attempts < settings.tipSettings.tipLocationPattern.length && ($nub.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"), 
settings.tipSettings.tipLocation = settings.tipSettings.tipLocationPattern[settings.attempts], 
settings.attempts++, methods.pos_default(!0));
}
toggle && (settings.$next_tip.hide(), settings.$next_tip.css("visibility", "visible"));
},
pos_phone:function(init) {
var tip_height = settings.$next_tip.outerHeight(), target_height = (settings.$next_tip.offset(), 
settings.$target.outerHeight()), $nub = $(".joyride-nub", settings.$next_tip), nub_height = Math.ceil($nub.outerHeight() / 2), toggle = init || !1;
$nub.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"), 
toggle && (settings.$next_tip.css("visibility", "hidden"), settings.$next_tip.show()), 
/body/i.test(settings.$target.selector) ? settings.$li.length && methods.pos_modal($nub) :methods.top() ? (settings.$next_tip.offset({
top:settings.$target.offset().top - tip_height - nub_height
}), $nub.addClass("bottom")) :(settings.$next_tip.offset({
top:settings.$target.offset().top + target_height + nub_height
}), $nub.addClass("top")), toggle && (settings.$next_tip.hide(), settings.$next_tip.css("visibility", "visible"));
},
pos_modal:function($nub) {
methods.center(), $nub.hide(), methods.show_modal();
},
show_modal:function() {
$(".joyride-modal-bg").length < 1 && $("body").append(settings.template.modal).show(), 
/pop/i.test(settings.tipAnimation) ? $(".joyride-modal-bg").show() :$(".joyride-modal-bg").fadeIn(settings.tipAnimationFadeSpeed);
},
expose:function() {
var expose, exposeCover, el, origCSS, randId = "expose-" + Math.floor(1e4 * Math.random());
if (arguments.length > 0 && arguments[0] instanceof $) el = arguments[0]; else {
if (!settings.$target || /body/i.test(settings.$target.selector)) return !1;
el = settings.$target;
}
return el.length < 1 ? (window.console && console.error("element not valid", el), 
!1) :(expose = $(settings.template.expose), settings.$body.append(expose), expose.css({
top:el.offset().top,
left:el.offset().left,
width:el.outerWidth(!0),
height:el.outerHeight(!0)
}), exposeCover = $(settings.template.exposeCover), origCSS = {
zIndex:el.css("z-index"),
position:el.css("position")
}, el.css("z-index", 1 * expose.css("z-index") + 1), "static" == origCSS.position && el.css("position", "relative"), 
el.data("expose-css", origCSS), exposeCover.css({
top:el.offset().top,
left:el.offset().left,
width:el.outerWidth(!0),
height:el.outerHeight(!0)
}), settings.$body.append(exposeCover), expose.addClass(randId), exposeCover.addClass(randId), 
settings.tipSettings.exposeClass && (expose.addClass(settings.tipSettings.exposeClass), 
exposeCover.addClass(settings.tipSettings.exposeClass)), el.data("expose", randId), 
settings.postExposeCallback(settings.$li.index(), settings.$next_tip, el), methods.add_exposed(el), 
void 0);
},
un_expose:function() {
var exposeId, el, expose, origCSS, clearAll = !1;
if (arguments.length > 0 && arguments[0] instanceof $) el = arguments[0]; else {
if (!settings.$target || /body/i.test(settings.$target.selector)) return !1;
el = settings.$target;
}
return el.length < 1 ? (window.console && console.error("element not valid", el), 
!1) :(exposeId = el.data("expose"), expose = $("." + exposeId), arguments.length > 1 && (clearAll = arguments[1]), 
clearAll === !0 ? $(".joyride-expose-wrapper,.joyride-expose-cover").remove() :expose.remove(), 
origCSS = el.data("expose-css"), "auto" == origCSS.zIndex ? el.css("z-index", "") :el.css("z-index", origCSS.zIndex), 
origCSS.position != el.css("position") && ("static" == origCSS.position ? el.css("position", "") :el.css("position", origCSS.position)), 
el.removeData("expose"), el.removeData("expose-z-index"), methods.remove_exposed(el), 
void 0);
},
add_exposed:function(el) {
settings.exposed = settings.exposed || [], el instanceof $ ? settings.exposed.push(el[0]) :"string" == typeof el && settings.exposed.push(el);
},
remove_exposed:function(el) {
var search;
el instanceof $ ? search = el[0] :"string" == typeof el && (search = el), settings.exposed = settings.exposed || [];
for (var i = 0; i < settings.exposed.length; i++) if (settings.exposed[i] == search) return settings.exposed.splice(i, 1), 
void 0;
},
center:function() {
var $w = settings.$window;
return settings.$next_tip.css({
top:($w.height() - settings.$next_tip.outerHeight()) / 2 + $w.scrollTop(),
left:($w.width() - settings.$next_tip.outerWidth()) / 2 + $w.scrollLeft()
}), !0;
},
bottom:function() {
return /bottom/i.test(settings.tipSettings.tipLocation);
},
top:function() {
return /top/i.test(settings.tipSettings.tipLocation);
},
right:function() {
return /right/i.test(settings.tipSettings.tipLocation);
},
left:function() {
return /left/i.test(settings.tipSettings.tipLocation);
},
corners:function(el) {
var w = settings.$window, window_half = w.height() / 2, tipOffset = Math.ceil(settings.$target.offset().top - window_half + settings.$next_tip.outerHeight()), right = w.width() + w.scrollLeft(), offsetBottom = w.height() + tipOffset, bottom = w.height() + w.scrollTop(), top = w.scrollTop();
return top > tipOffset && (top = 0 > tipOffset ? 0 :tipOffset), offsetBottom > bottom && (bottom = offsetBottom), 
[ el.offset().top < top, right < el.offset().left + el.outerWidth(), bottom < el.offset().top + el.outerHeight(), w.scrollLeft() > el.offset().left ];
},
visible:function(hidden_corners) {
for (var i = hidden_corners.length; i--; ) if (hidden_corners[i]) return !1;
return !0;
},
nub_position:function(nub, pos, def) {
"auto" === pos ? nub.addClass(def) :nub.addClass(pos);
},
startTimer:function() {
settings.$li.length ? settings.automate = setTimeout(function() {
methods.hide(), methods.show(), methods.startTimer();
}, settings.timer) :clearTimeout(settings.automate);
},
end:function() {
settings.cookieMonster && $.cookie(settings.cookieName, "ridden", {
expires:365,
domain:settings.cookieDomain,
path:settings.cookiePath
}), settings.localStorage && localStorage.setItem(settings.localStorageKey, !0), 
settings.timer > 0 && clearTimeout(settings.automate), settings.modal && settings.expose && methods.un_expose(), 
settings.$current_tip && settings.$current_tip.hide(), settings.$li && (settings.postStepCallback(settings.$li.index(), settings.$current_tip), 
settings.postRideCallback(settings.$li.index(), settings.$current_tip)), $(".joyride-modal-bg").hide();
},
jquery_check:function() {
return $.isFunction($.fn.on) ? !0 :($.fn.on = function(types, sel, fn) {
return this.delegate(sel, types, fn);
}, $.fn.off = function(types, sel, fn) {
return this.undelegate(sel, types, fn);
}, !1);
},
outerHTML:function(el) {
return el.outerHTML || new XMLSerializer().serializeToString(el);
},
version:function() {
return settings.version;
},
tabbable:function(el) {
$(el).on("keydown", function(event) {
if (!event.isDefaultPrevented() && event.keyCode && 27 === event.keyCode) return event.preventDefault(), 
methods.end(), void 0;
if (9 === event.keyCode) {
var tabbables = $(el).find(":tabbable"), first = tabbables.filter(":first"), last = tabbables.filter(":last");
event.target !== last[0] || event.shiftKey ? event.target === first[0] && event.shiftKey && (last.focus(1), 
event.preventDefault()) :(first.focus(1), event.preventDefault());
}
});
}
};
$.fn.joyride = function(method) {
return methods[method] ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) :"object" != typeof method && method ? ($.error("Method " + method + " does not exist on jQuery.joyride"), 
void 0) :methods.init.apply(this, arguments);
};
}(jQuery, this);