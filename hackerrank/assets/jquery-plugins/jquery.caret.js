/*
 *
 * Copyright (c) 2010 C. F., Wong (<a href="http://cloudgen.w0ng.hk">Cloudgen Examplet Store</a>)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
!function($, len, createRange, duplicate) {
$.fn.caret = function(options, opt2) {
var start, end, t = this[0], browser = $.browser.msie;
if ("object" == typeof options && "number" == typeof options.start && "number" == typeof options.end) start = options.start, 
end = options.end; else if ("number" == typeof options && "number" == typeof opt2) start = options, 
end = opt2; else if ("string" == typeof options) (start = t.value.indexOf(options)) > -1 ? end = start + options[len] :start = null; else if ("[object RegExp]" === Object.prototype.toString.call(options)) {
var re = options.exec(t.value);
null != re && (start = re.index, end = start + re[0][len]);
}
if ("undefined" != typeof start) {
if (browser) {
var selRange = this[0].createTextRange();
selRange.collapse(!0), selRange.moveStart("character", start), selRange.moveEnd("character", end - start), 
selRange.select();
} else this[0].selectionStart = start, this[0].selectionEnd = end;
return this[0].focus(), this;
}
if (browser) {
var selection = document.selection;
if ("textarea" != this[0].tagName.toLowerCase()) {
var val = this.val(), range = selection[createRange]()[duplicate]();
range.moveEnd("character", val[len]);
var s = "" == range.text ? val[len] :val.lastIndexOf(range.text);
range = selection[createRange]()[duplicate](), range.moveStart("character", -val[len]);
var e = range.text[len];
} else {
var range = selection[createRange](), stored_range = range[duplicate]();
stored_range.moveToElementText(this[0]), stored_range.setEndPoint("EndToEnd", range);
var s = stored_range.text[len] - range.text[len], e = s + range.text[len];
}
} else var s = t.selectionStart, e = t.selectionEnd;
var te = t.value.substring(s, e);
return {
start:s,
end:e,
text:te,
replace:function(st) {
return t.value.substring(0, s) + st + t.value.substring(e, t.value[len]);
}
};
};
}(jQuery, "length", "createRange", "duplicate");