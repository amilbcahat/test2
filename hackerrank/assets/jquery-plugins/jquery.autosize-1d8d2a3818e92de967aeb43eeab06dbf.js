!function($) {
var hidden = "hidden", borderBox = "border-box", copy = '<textarea tabindex="-1" style="position:absolute; top:-9999px; left:-9999px; right:auto; bottom:auto; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden">', copyStyle = [ "fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent" ], oninput = "oninput", onpropertychange = "onpropertychange", test = $(copy)[0];
test.setAttribute(oninput, "return"), $.fn.autosize = $.isFunction(test[oninput]) || onpropertychange in test ? function(className) {
return this.each(function() {
function adjust() {
var height, overflow;
active || (active = !0, mirror.value = ta.value, mirror.style.overflowY = ta.style.overflowY, 
mirror.style.width = $ta.css("width"), mirror.scrollTop = 0, mirror.scrollTop = 9e4, 
height = mirror.scrollTop, overflow = hidden, height > maxHeight ? (height = maxHeight, 
overflow = "scroll") :minHeight > height && (height = minHeight), ta.style.overflowY = overflow, 
ta.style.height = height + boxOffset + "px", setTimeout(function() {
active = !1;
}, 1));
}
var mirror, active, resize, ta = this, $ta = $(ta), minHeight = $ta.height(), maxHeight = parseInt($ta.css("maxHeight"), 10), i = copyStyle.length, boxOffset = 0;
if (($ta.css("box-sizing") === borderBox || $ta.css("-moz-box-sizing") === borderBox || $ta.css("-webkit-box-sizing") === borderBox) && (boxOffset = $ta.outerHeight() - $ta.height()), 
!$ta.data("mirror") && !$ta.data("ismirror")) {
for (mirror = $(copy).data("ismirror", !0).addClass(className || "autosizejs")[0], 
resize = "none" === $ta.css("resize") ? "none" :"horizontal", $ta.data("mirror", $(mirror)).css({
overflow:hidden,
overflowY:hidden,
wordWrap:"break-word",
resize:resize
}), maxHeight = maxHeight && maxHeight > 0 ? maxHeight :9e4; i--; ) mirror.style[copyStyle[i]] = $ta.css(copyStyle[i]);
$("body").append(mirror), onpropertychange in ta ? oninput in ta ? ta[oninput] = ta.onkeyup = adjust :ta[onpropertychange] = adjust :ta[oninput] = adjust, 
$(window).resize(adjust), $ta.bind("autosize", adjust), adjust();
}
});
} :function() {
return this;
};
}(jQuery);