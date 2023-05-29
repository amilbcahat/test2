/*
 * Basic jQuery Slider plug-in v.1.1
 * 
 * http://www.basic-slider.com
 *
 * Authored by John Cobb
 * Visit my blog at http://www.johncobb.name
 * Or say helo on twitter: @john0514
 *
 * Copyright 2011, John Cobb
 * Free for all to use, abuse and improve under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * First published: August 2011
 * Updated v1.1: September 2011
 * Updated v1.2: Janurary 2012
 * 
 */
!function($) {
$.fn.bjqs = function(options) {
var settings = {}, defaults = {
width:700,
height:300,
animation:"fade",
animationDuration:450,
automatic:!0,
rotationSpeed:4e3,
hoverPause:!0,
showControls:!0,
centerControls:!0,
nextText:"Next",
prevText:"Prev",
showMarkers:!0,
centerMarkers:!0,
keyboardNav:!0,
useCaptions:!0
}, $container = this, $slider = $container.find(".bjqs"), slides = $slider.children("li"), slideCount = slides.length, animating = !1, paused = !1, current = 0, slidePosition = 1, next = 0, $active = slides.eq(current), forward = "forward", back = "backward";
if (settings = $.extend({}, defaults, options), slides.css({
height:settings.height,
width:settings.width
}), $slider.css({
height:settings.height,
width:settings.width
}), $container.css({
height:settings.height,
width:settings.width
}), slides.addClass("bjqs-slide"), settings.showControls && slideCount > 1) {
var $controlContainer = $('<ul class="bjqs-controls"></ul>'), $next = $('<li><a href="#" class="bjqs-next" class="controls">' + settings.nextText + "</a></li>"), $previous = $('<li><a href="#" class="bjqs-prev" class="controls">' + settings.prevText + "</a></li>");
if ($next.click(function(e) {
e.preventDefault(), animating || bjqsGo(forward, !1);
}), $previous.click(function(e) {
e.preventDefault(), animating || bjqsGo(back, !1);
}), $next.appendTo($controlContainer), $previous.appendTo($controlContainer), $controlContainer.appendTo($container), 
settings.centerControls) {
var $control = $next.children("a"), offset = ($container.height() - $control.height()) / 2;
$next.children("a").css("top", offset).show(), $previous.children("a").css("top", offset).show();
}
}
if (settings.showMarkers && slideCount > 1) {
var $marker, markers, offset, $markerContainer = $('<ol class="bjqs-markers"></ol>');
$.each(slides, function(key) {
"slide" === settings.animType ? 0 !== key && key !== slideCount - 1 && ($marker = $('<li><a href="#">' + key + "</a></li>")) :(key++, 
$marker = $('<li><a href="#">' + key + "</a></li>")), $marker.click(function(e) {
e.preventDefault(), $(this).hasClass("active-marker") || animating || bjqsGo(!1, key);
}), $marker.appendTo($markerContainer);
}), markers = $markerContainer.children("li"), markers.eq(current).addClass("active-marker"), 
$markerContainer.appendTo($container), settings.centerMarkers && (offset = (settings.width - $markerContainer.width()) / 2, 
$markerContainer.css("left", offset));
}
settings.keyboardNav && slideCount > 1 && $(document).keyup(function(event) {
paused || (clearInterval(bjqsInterval), paused = !0), animating || (39 === event.keyCode ? (event.preventDefault(), 
bjqsGo(forward, !1)) :37 === event.keyCode && (event.preventDefault(), bjqsGo(back, !1))), 
paused & settings.automatic && (bjqsInterval = setInterval(function() {
bjqsGo(forward);
}, settings.rotationSpeed), paused = !1);
}), settings.useCaptions && $.each(slides, function(key, value) {
var $slide = $(value), $slideChild = $slide.children("img:first-child"), title = $slideChild.attr("title");
if (title) {
var $caption = $('<p class="bjqs-caption">' + title + "</p>");
$caption.appendTo($slide);
}
}), settings.hoverPause && settings.automatic && $container.hover(function() {
paused || (clearInterval(bjqsInterval), paused = !0);
}, function() {
paused && (bjqsInterval = setInterval(function() {
bjqsGo(forward);
}, settings.rotationSpeed), paused = !1);
}), "slide" === settings.animation && slideCount > 1 && ($first = slides.eq(0), 
$last = slides.eq(slideCount - 1), $first.clone().addClass("clone").removeClass("slide").appendTo($slider), 
$last.clone().addClass("clone").removeClass("slide").prependTo($slider), slides = $slider.children("li"), 
slideCount = slides.length, $wrapper = $('<div class="bjqs-wrapper"></div>').css({
width:settings.width,
height:settings.height,
overflow:"hidden",
position:"relative"
}), $slider.css({
width:settings.width * slideCount,
left:-settings.width
}), slides.css({
"float":"left",
position:"relative",
display:"list-item"
}), $wrapper.prependTo($container), $slider.appendTo($wrapper));
var checkPosition = function(direction) {
return "fade" === settings.animation && (direction === forward ? $active.next().length ? next++ :next = 0 :direction === back && ($active.prev().length ? next-- :next = slideCount - 1)), 
"slide" === settings.animation && (direction === forward && (next = slidePosition + 1), 
direction === back && (next = slidePosition - 1)), next;
};
if (settings.automatic && slideCount > 1) var bjqsInterval = setInterval(function() {
bjqsGo(forward, !1);
}, settings.rotationSpeed);
slides.eq(current).show(), $slider.show();
var bjqsGo = function(direction, position) {
animating || (next = direction ? checkPosition(direction) :position && "fade" === settings.animation ? position - 1 :position, 
animating = !0, "fade" === settings.animation ? (settings.showMarkers && (markers.eq(current).removeClass("active-marker"), 
markers.eq(next).addClass("active-marker")), $next = slides.eq(next), $active.fadeOut(settings.animationDuration), 
$next.fadeIn(settings.animationDuration, function() {
$active.hide(), current = next, $active = $next, animating = !1;
})) :"slide" === settings.animation && (settings.showMarkers && (markers.eq(slidePosition - 1).removeClass("active-marker"), 
next === slideCount - 1 ? markers.eq(0).addClass("active-marker") :0 === next ? markers.eq(slideCount - 3).addClass("active-marker") :markers.eq(next - 1).addClass("active-marker")), 
$slider.animate({
left:-next * settings.width
}, settings.animationDuration, function() {
0 === next ? (slidePosition = slideCount - 2, $slider.css({
left:-slidePosition * settings.width
})) :next === slideCount - 1 ? (slidePosition = 1, $slider.css({
left:-settings.width
})) :slidePosition = next, animating = !1;
})));
};
return this;
};
}(jQuery);