(function() {
!function($) {
return $.dragResize = {
version:"1.0"
}, $.fn.dragResize = function(options) {
var default_options, enable_resize, that;
return default_options = {
resize:function() {},
activeColor:"#AAA",
inactiveColor:"#DDD"
}, that = this, options = $.extend(default_options, options), enable_resize = !1, 
$(this).mousedown(function() {
return enable_resize = !0, !1;
}), $(this).mouseup(function() {
return enable_resize = !1;
}), $(this).mouseenter(function() {
return $(that).css("background-color", options.activeColor);
}), $(this).mouseleave(function() {
return $(that).css("background-color", options.inactiveColor);
}), $(window).mouseout(function(e) {
return null === e.relatedTarget ? enable_resize = !1 :void 0;
}), $(window).mousemove(function(e) {
return enable_resize === !0 ? ((e.pageY < 0 || e.pageY > document.height || e.pageX < 0 || e.pageX > document.width) && (enable_resize = !1), 
options.resize(e.pageX, e.pageY)) :void 0;
});
};
}($);
}).call(this);