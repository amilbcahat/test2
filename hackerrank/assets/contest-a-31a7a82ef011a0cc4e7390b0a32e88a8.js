!function(jQuery) {
var daysInWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ], shortMonthsInYear = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ], longMonthsInYear = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ], shortMonthsToNumber = [];
shortMonthsToNumber.Jan = "01", shortMonthsToNumber.Feb = "02", shortMonthsToNumber.Mar = "03", 
shortMonthsToNumber.Apr = "04", shortMonthsToNumber.May = "05", shortMonthsToNumber.Jun = "06", 
shortMonthsToNumber.Jul = "07", shortMonthsToNumber.Aug = "08", shortMonthsToNumber.Sep = "09", 
shortMonthsToNumber.Oct = "10", shortMonthsToNumber.Nov = "11", shortMonthsToNumber.Dec = "12", 
jQuery.format = function() {
function strDay(value) {
return daysInWeek[parseInt(value, 10)] || value;
}
function strMonth(value) {
var monthArrayIndex = parseInt(value, 10) - 1;
return shortMonthsInYear[monthArrayIndex] || value;
}
function strLongMonth(value) {
var monthArrayIndex = parseInt(value, 10) - 1;
return longMonthsInYear[monthArrayIndex] || value;
}
var parseMonth = function(value) {
return shortMonthsToNumber[value] || value;
}, parseTime = function(value) {
var retValue = value, millis = "";
if (-1 !== retValue.indexOf(".")) {
var delimited = retValue.split(".");
retValue = delimited[0], millis = delimited[1];
}
var values3 = retValue.split(":");
return 3 === values3.length ? (hour = values3[0], minute = values3[1], second = values3[2], 
{
time:retValue,
hour:hour,
minute:minute,
second:second,
millis:millis
}) :{
time:"",
hour:"",
minute:"",
second:"",
millis:""
};
};
return {
date:function(value, format) {
try {
var date = null, year = null, month = null, dayOfMonth = null, dayOfWeek = null, time = null;
if ("number" == typeof value) return this.date(new Date(value), format);
if ("function" == typeof value.getFullYear) year = value.getFullYear(), month = value.getMonth() + 1, 
dayOfMonth = value.getDate(), dayOfWeek = value.getDay(), time = parseTime(value.toTimeString()); else if (-1 != value.search(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?\d{0,3}[-+]?\d{2}:?\d{2}/)) {
var values = value.split(/[T\+-]/);
year = values[0], month = values[1], dayOfMonth = values[2], time = parseTime(values[3].split(".")[0]), 
date = new Date(year, month - 1, dayOfMonth), dayOfWeek = date.getDay();
} else {
var values = value.split(" ");
switch (values.length) {
case 6:
year = values[5], month = parseMonth(values[1]), dayOfMonth = values[2], time = parseTime(values[3]), 
date = new Date(year, month - 1, dayOfMonth), dayOfWeek = date.getDay();
break;

case 2:
var values2 = values[0].split("-");
year = values2[0], month = values2[1], dayOfMonth = values2[2], time = parseTime(values[1]), 
date = new Date(year, month - 1, dayOfMonth), dayOfWeek = date.getDay();
break;

case 7:
case 9:
case 10:
year = values[3], month = parseMonth(values[1]), dayOfMonth = values[2], time = parseTime(values[4]), 
date = new Date(year, month - 1, dayOfMonth), dayOfWeek = date.getDay();
break;

case 1:
var values2 = values[0].split("");
year = values2[0] + values2[1] + values2[2] + values2[3], month = values2[5] + values2[6], 
dayOfMonth = values2[8] + values2[9], time = parseTime(values2[13] + values2[14] + values2[15] + values2[16] + values2[17] + values2[18] + values2[19] + values2[20]), 
date = new Date(year, month - 1, dayOfMonth), dayOfWeek = date.getDay();
break;

default:
return value;
}
}
for (var pattern = "", retValue = "", unparsedRest = "", i = 0; i < format.length; i++) {
var currentPattern = format.charAt(i);
switch (pattern += currentPattern, unparsedRest = "", pattern) {
case "ddd":
retValue += strDay(dayOfWeek), pattern = "";
break;

case "dd":
if ("d" == format.charAt(i + 1)) break;
1 === String(dayOfMonth).length && (dayOfMonth = "0" + dayOfMonth), retValue += dayOfMonth, 
pattern = "";
break;

case "d":
if ("d" == format.charAt(i + 1)) break;
retValue += parseInt(dayOfMonth, 10), pattern = "";
break;

case "MMMM":
retValue += strLongMonth(month), pattern = "";
break;

case "MMM":
if ("M" === format.charAt(i + 1)) break;
retValue += strMonth(month), pattern = "";
break;

case "MM":
if ("M" == format.charAt(i + 1)) break;
1 === String(month).length && (month = "0" + month), retValue += month, pattern = "";
break;

case "M":
if ("M" == format.charAt(i + 1)) break;
retValue += parseInt(month, 10), pattern = "";
break;

case "yyyy":
retValue += year, pattern = "";
break;

case "yy":
if ("y" == format.charAt(i + 1) && "y" == format.charAt(i + 2)) break;
retValue += String(year).slice(-2), pattern = "";
break;

case "HH":
retValue += time.hour, pattern = "";
break;

case "hh":
var hour = 0 == time.hour ? 12 :time.hour < 13 ? time.hour :time.hour - 12;
hour = 1 == String(hour).length ? "0" + hour :hour, retValue += hour, pattern = "";
break;

case "h":
if ("h" == format.charAt(i + 1)) break;
var hour = 0 == time.hour ? 12 :time.hour < 13 ? time.hour :time.hour - 12;
retValue += parseInt(hour, 10), pattern = "";
break;

case "mm":
retValue += time.minute, pattern = "";
break;

case "ss":
retValue += time.second.substring(0, 2), pattern = "";
break;

case "SSS":
retValue += time.millis.substring(0, 3), pattern = "";
break;

case "a":
retValue += time.hour >= 12 ? "PM" :"AM", pattern = "";
break;

case " ":
retValue += currentPattern, pattern = "";
break;

case "/":
retValue += currentPattern, pattern = "";
break;

case ":":
retValue += currentPattern, pattern = "";
break;

default:
2 === pattern.length && 0 !== pattern.indexOf("y") && "SS" != pattern ? (retValue += pattern.substring(0, 1), 
pattern = pattern.substring(1, 2)) :3 === pattern.length && -1 === pattern.indexOf("yyy") ? pattern = "" :unparsedRest = pattern;
}
}
return retValue += unparsedRest;
} catch (e) {
throw e;
}
}
};
}();
}(jQuery), jQuery.format.date.defaultShortDateFormat = "dd/MM/yyyy", jQuery.format.date.defaultLongDateFormat = "dd/MM/yyyy hh:mm:ss", 
jQuery(document).ready(function() {
jQuery(".shortDateFormat").each(function(idx, elem) {
jQuery(elem).is(":input") ? jQuery(elem).val(jQuery.format.date(jQuery(elem).val(), jQuery.format.date.defaultShortDateFormat)) :jQuery(elem).text(jQuery.format.date(jQuery(elem).text(), jQuery.format.date.defaultShortDateFormat));
}), jQuery(".longDateFormat").each(function(idx, elem) {
jQuery(elem).is(":input") ? jQuery(elem).val(jQuery.format.date(jQuery(elem).val(), jQuery.format.date.defaultLongDateFormat)) :jQuery(elem).text(jQuery.format.date(jQuery(elem).text(), jQuery.format.date.defaultLongDateFormat));
});
}), function() {
var __indexOf = [].indexOf || function(item) {
for (var i = 0, l = this.length; l > i; i++) if (i in this && this[i] === item) return i;
return -1;
};
jQuery(function() {
var ALLOWED_EXTENDED_ATTRIBUTES, Base64, HR, ajaxmsg, bindFormEvents, closeSuccessStatus, confirmDialog, countdownTimer, date_get12hour_hour, date_get12hour_offset, date_getMon, date_getMonth, downloadURL, error_html, formData, genFormHTML, genModContainer, getDateFromEpoch, getEpochTimeStampFromDateTime, getErrorList, getFileAnchor, getRemainingTime, htmlDecode, htmlEncode, initializeTimers, inlineLoadingEnd, inlineLoadingStart, mp_ping, numberSuffix, padZeros, pagination, removeAllInlineThrobbers, renderBreadCrumbs, scrollToBottom, scrollToTop, semiFix, setTab, showInlineSuccess, showLoginError, slugify, sortNumbers, splitDate, successStatus, timezone_abbr, trim, uploadDialog, validate_date, validate_time, _addExtendedAttributes, _encType, _ref;
return slugify = function(str, delim) {
return null == delim && (delim = "-"), str.replace(/[ \t\n_]+/g, delim).toLowerCase();
}, ALLOWED_EXTENDED_ATTRIBUTES = [ "type", "value", "placeholder", "disabled", "name" ], 
setTab = function(tabName) {
var tab, tabs, targetTab, _i, _len, _results;
for (HR.tab = tabName, tabs = $(".page-nav").find(".nav").find("li"), targetTab = "profile" !== tabName ? "tab-" + tabName :"profile-menu", 
_results = [], _i = 0, _len = tabs.length; _len > _i; _i++) tab = tabs[_i], $(tab).attr("id") !== targetTab ? _results.push($(tab).removeClass("active")) :_results.push($(tab).addClass("active"));
return _results;
}, pagination = function($obj, total, url_prefix, current_page, collection, count, pages, class_name, pagination_select) {
var eachpage, last, last_page, onBegining, onEnd, output, start, _fn, _i;
if (null == current_page && (current_page = 1), null == collection && (collection = null), 
null == count && (count = 10), null == pages && (pages = 10), null == class_name && (class_name = "backbone"), 
null == pagination_select && (pagination_select = !0), $obj) {
if (current_page = parseInt(current_page), output = '<div class="pagination"><ul>', 
start = Math.floor(pages / 2) >= current_page && current_page >= 1 ? 1 :current_page - Math.floor(pages / 2), 
last_page = Math.ceil(total / count), 0 === last_page && (last_page = 1), last = last_page >= start + (pages - 1) ? start + (pages - 1) :last_page, 
pages - 1 > last - start && (start = last - (pages - 1), 1 > start && (start = 1)), 
last === start || _.isNaN(last)) return "";
for (onBegining = 1 === current_page ? !0 :!1, onEnd = current_page === last_page ? !0 :!1, 
onBegining ? (output += '<li class="disabled"><a><span class="double-caret left"></span><span class="double-caret left"></span></a></li>', 
output += '<li class="disabled"><a><span class="caret left"></span></a></li>') :(output += '<li><a class="' + class_name + '" data-page="1" href="' + url_prefix + '1"><span class="double-caret left"></span><span class="double-caret left"></span></a></li>', 
output += '<li><a class="' + class_name + '" data-page="' + (current_page - 1) + '" href="' + url_prefix + (current_page - 1) + '"><span class="caret left"></span></a></li>'), 
_fn = function(eachpage) {
return output += eachpage !== current_page ? '<li><a class="' + class_name + '" data-page="' + eachpage + '" href="' + url_prefix + eachpage + '">' + eachpage + "</a></li>" :'<li class="active"><a class="' + class_name + '" data-page="' + eachpage + '" href="' + url_prefix + eachpage + '">' + eachpage + "</a></li>";
}, eachpage = _i = start; last >= start ? last >= _i :_i >= last; eachpage = last >= start ? ++_i :--_i) _fn(eachpage);
return onEnd ? (output += '<li class="disabled"><a><span class="caret right"></span></a></li>', 
output += '<li class="disabled"><a><span class="double-caret right"></span><span class="double-caret right"></span></a></li>') :(output += '<li><a class="' + class_name + '" data-page="' + (current_page + 1) + '" href="' + url_prefix + (current_page + 1) + '"><span class="caret right"></span></a></li>', 
output += '<li><a class="' + class_name + '" data-page="' + last_page + '" href="' + url_prefix + last_page + '"><span class="double-caret right"></span><span class="double-caret right"></span></a></li>'), 
output += "</ul></div>", pagination_select && (output += "<div class='pagination-sub block-center clearfix' style='width: 140px;'>", 
null !== collection && (output += "<div class='select-wrap' id='pagination-length'> <a href='' class='dropdown-toggle clearfix select-wrap' data-toggle='dropdown'> <span class='select'><span class='page-number'>" + count + "</span> per page</span><span class='indent'><b class='caret'></b></span> </a> <ul class='dropdown-menu unstyled' id='pagination-length-select'> <li><a href='#'>10</a></li> <li><a href='#'>20</a></li> <li><a href='#'>50</a></li> <li><a href='#'>100</a></li> </ul> </div>"), 
output += "</div>"), $obj.html(output), $obj.find("#pagination-length ul li a").bind("click", function(e) {
var new_limit;
return e.preventDefault(), null !== collection && (new_limit = parseInt($(e.currentTarget).html()), 
new_limit && !_.isNaN(new_limit)) ? ($obj.find(".page-number").html($(e.currentTarget).html()), 
$.cookie("pagination_per_page_limit", new_limit, {
expires:365
}), collection.setLimit(new_limit), collection.cached(), $("html body").animate({
scrollTop:0
}, 300)) :void 0;
}), $obj;
}
}, trim = function(text) {
return text.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}, ajaxmsg = function(msg, loader, autohide, timeout) {
var $ajaxmsg;
return null == loader && (loader = !0), null == autohide && (autohide = !1), null == timeout && (timeout = .5), 
$ajaxmsg = $("div#ajax-msg-wrap #ajax-msg"), 0 === $ajaxmsg.length ? ($("div#ajax-msg-wrap").append('<div id="ajax-msg"><span class="ajax-loader"></span><span class="ajax-msg"></span></div>'), 
$ajaxmsg = $("div#ajax-msg-wrap #ajax-msg")) :$ajaxmsg.show(), $(".track-nav-wrap").length > 0 ? $("div#ajax-msg-wrap #ajax-msg").css("margin-top", "102px") :$("div#ajax-msg-wrap #ajax-msg").css("margin-top", "0px"), 
loader ? $ajaxmsg.find(".ajax-loader").addClass("ajax-loading") :$ajaxmsg.find(".ajax-loader").removeClass("ajax-loading"), 
$ajaxmsg.find(".ajax-msg").html(msg), $ajaxmsg.css("margin-left", -1 * ($ajaxmsg.width() / 2)), 
autohide ? setTimeout(function() {
return $("#ajax-msg").hide();
}, 1e3 * timeout) :void 0;
}, initializeTimers = function() {
var timer, _i, _len, _ref, _ref1, _results;
for (_ref = $(".countdowntimer"), _results = [], _i = 0, _len = _ref.length; _len > _i; _i++) timer = _ref[_i], 
(null != (_ref1 = $(timer).attr("data-start-time")) ? _ref1 :"0000-00-00 00:00:00") && " " !== $(timer).attr("data-start-time") && "0000-00-00 00:00:00" !== $(timer).attr("data-start-time") && _results.push(function(timer) {
var t;
return t = $(timer).attr("data-start-time").split(/[- :]/), $(timer).countdown({
until:new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]),
layout:$(timer).attr("data-text") + "{dn} {dl} {hnn}:{mnn}:{snn}",
timezone:0,
alwaysExpire:!0,
onExpiry:function() {
return $(this).html($(this).attr("data-done-text")), this;
}
});
}(timer));
return _results;
}, semiFix = function(selector, wrapselector) {
return $(window).scroll(function() {
var offset, scroller_object;
if ($(wrapselector).length > 0) {
if (offset = $(wrapselector).offset().top - 40, scroller_object = $(selector), document.documentElement.scrollTop >= offset || window.pageYOffset >= offset) return $.browser.msie && "6.0" === $.browser.version ? scroller_object.css("top", document.documentElement.scrollTop + 15 + "px") :scroller_object.css({
top:"40px"
});
if (document.documentElement.scrollTop < offset || window.pageYOffset < offset) return scroller_object.css({
position:"absolute",
top:"0"
});
}
});
}, uploadDialog = function(options) {
var body_message, disable_weburl, header_message, template, that;
if (options && options.upload_url) return this.options = options, this.$upload_dialog = $("#upload-dialog"), 
0 === this.$upload_dialog.length ? ($("body").append('<div id="upload-dialog"><div>'), 
this.$upload_dialog = $("#upload-dialog")) :this.$upload_dialog.empty(), template = _.template($("#upload-dialog-template").html()), 
header_message = options.header_message ? options.header_message :"File upload dialog", 
body_message = options.body_message ? options.body_message :"", disable_weburl = options.disable_weburl === !0 ? !0 :!1, 
this.$upload_dialog.html(template({
header_message:header_message,
body_message:body_message,
disable_weburl:disable_weburl
})), this.$upload_dialog.find("#fileupload-modal").modal(), that = this, this.$upload_dialog.find("a[data-toggle='tab']").bind("click", function(e) {
var tabSelector;
return tabSelector = $(e.currentTarget).parent().siblings().find("a").attr("href"), 
$(that.$upload_dialog).find(tabSelector).find("input").val("");
}), this.$upload_dialog.find("input.uploadurl").unbind(), this.$upload_dialog.find("input.uploadurl").bind("keypress", function(e) {
var code;
return code = e.keyCode ? e.keyCode :e.which, 13 === code ? (e.preventDefault(), 
that.$upload_dialog.find("a.upload").click()) :void 0;
}), this.$upload_dialog.find("a.upload").bind("click", function(e) {
var data;
if (!$(e.currentTarget).hasClass("disabled")) return that.$upload_dialog.find(".errorp").hide(), 
that.$upload_dialog.find(".successp").hide(), $(e.currentTarget).addClass("disabled"), 
$(e.currentTarget).button("loading"), data = that.options.data ? that.options.data :{}, 
$.ajax(that.options.upload_url, {
data:data,
files:$(":file", that.$upload_dialog),
iframe:!0,
processData:!0
}).complete(function(data) {
var resp;
return resp = $.parseJSON(data.responseText), $(e.currentTarget).removeClass("disabled"), 
$(e.currentTarget).button("reset"), resp.status ? (void 0 !== that.options.success_message ? (that.$upload_dialog.find(".successp").html(that.options.success_message), 
that.$upload_dialog.find(".successp").show(), that.$upload_dialog.find("form").hide(), 
$(e.currentTarget).hide()) :that.$upload_dialog.find("#fileupload-modal").modal("hide"), 
that.options.parent_model && that.options.parent_view ? (that.options.parent_model.render_once = !1, 
that.options.parent_model.fetch({
success:function() {
var activeTab;
return activeTab = that.options.parent_view.activeTab, activeTab ? (that.options.parent_view.activeTab = 3, 
that.options.parent_view.render(), that.options.parent_view.activeTab = activeTab, 
that.options.parent_view.renderResume(!0)) :void 0;
}
})) :void 0) :(that.$upload_dialog.find(".errorp").html(resp.message), that.$upload_dialog.find(".errorp").show());
});
});
}, padZeros = function(num, size) {
var s;
return s = "0000000000" + num, s.substr(s.length - size);
}, mp_ping = function() {
var data;
return void 0 !== HR.mp_ping_interval ? HR.mp_ping_interval += 2 :HR.mp_ping_interval = 0, 
HR.loggedin || (HR.loggedin = !1), data = {
interval:HR.mp_ping_interval,
loggedin:HR.loggedin
}, void 0 !== mpq && void 0 !== mpq.track && HR.mp_ping_interval % 10 === 0 ? mpq.track("Ping", data) :void 0;
}, Base64 = {
_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
encode:function(input) {
var chr1, chr2, chr3, enc1, enc2, enc3, enc4, i, output;
for (output = "", chr1 = void 0, chr2 = void 0, chr3 = void 0, enc1 = void 0, enc2 = void 0, 
enc3 = void 0, enc4 = void 0, i = 0, input = Base64._utf8_encode(input); i < input.length; ) chr1 = input.charCodeAt(i++), 
chr2 = input.charCodeAt(i++), chr3 = input.charCodeAt(i++), enc1 = chr1 >> 2, enc2 = (3 & chr1) << 4 | chr2 >> 4, 
enc3 = (15 & chr2) << 2 | chr3 >> 6, enc4 = 63 & chr3, isNaN(chr2) ? enc3 = enc4 = 64 :isNaN(chr3) && (enc4 = 64), 
output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
return output;
},
decode:function(input) {
var chr1, chr2, chr3, enc1, enc2, enc3, enc4, i, output;
for (output = "", chr1 = void 0, chr2 = void 0, chr3 = void 0, enc1 = void 0, enc2 = void 0, 
enc3 = void 0, enc4 = void 0, i = 0, input = input.replace(/[^A-Za-z0-9\+\/\=]/g, ""); i < input.length; ) enc1 = this._keyStr.indexOf(input.charAt(i++)), 
enc2 = this._keyStr.indexOf(input.charAt(i++)), enc3 = this._keyStr.indexOf(input.charAt(i++)), 
enc4 = this._keyStr.indexOf(input.charAt(i++)), chr1 = enc1 << 2 | enc2 >> 4, chr2 = (15 & enc2) << 4 | enc3 >> 2, 
chr3 = (3 & enc3) << 6 | enc4, output += String.fromCharCode(chr1), 64 !== enc3 && (output += String.fromCharCode(chr2)), 
64 !== enc4 && (output += String.fromCharCode(chr3));
return output = Base64._utf8_decode(output);
},
_utf8_encode:function(string) {
var c, n, utftext;
for (string = string.replace(/\r\n/g, "\n"), utftext = "", n = 0; n < string.length; ) c = string.charCodeAt(n), 
128 > c ? utftext += String.fromCharCode(c) :c > 127 && 2048 > c ? (utftext += String.fromCharCode(c >> 6 | 192), 
utftext += String.fromCharCode(63 & c | 128)) :(utftext += String.fromCharCode(c >> 12 | 224), 
utftext += String.fromCharCode(c >> 6 & 63 | 128), utftext += String.fromCharCode(63 & c | 128)), 
n++;
return utftext;
},
_utf8_decode:function(utftext) {
var c, c1, c2, c3, i, string;
for (string = "", i = 0, c = c1 = c2 = 0; i < utftext.length; ) c = utftext.charCodeAt(i), 
128 > c ? (string += String.fromCharCode(c), i++) :c > 191 && 224 > c ? (c2 = utftext.charCodeAt(i + 1), 
string += String.fromCharCode((31 & c) << 6 | 63 & c2), i += 2) :(c2 = utftext.charCodeAt(i + 1), 
c3 = utftext.charCodeAt(i + 2), string += String.fromCharCode((15 & c) << 12 | (63 & c2) << 6 | 63 & c3), 
i += 3);
return string;
}
}, numberSuffix = function(number) {
var mod10;
return number > 0 ? (mod10 = number % 10, 1 === mod10 && 11 !== number ? number + "st" :2 === mod10 && 12 !== number ? number + "nd" :3 === mod10 && 13 !== number ? number + "rd" :number + "th") :number;
}, showLoginError = function(prefix) {
return "phackerprofile" !== _.clone(prefix) || "phackerboard" !== _.clone(prefix) ? $("body").append('<div style="position: absolute; top: 30%; left: 40%; background-color: #fff; border-radius: 15px; padding: 20px; border: 3px #ccc solid;"><p>You must <a href="user/login">login</a> before you can view this page</p></div>') :void 0;
}, successStatus = function() {
var height, styles, that;
return this.$success_status = $("#success-status-wrap"), 0 === this.$success_status.length ? ($("body").append('<div id="success-status-wrap"><div>'), 
this.$success_status = $("#success-status-wrap")) :this.$success_status.empty(), 
height = 50, styles = {
position:"fixed",
top:"0px",
left:"0px",
height:height + "px",
"text-align":"center",
width:"100%",
"z-index":"9999",
background:"#333 url('public/images/success-bar-bg.jpg')"
}, that = this, _.each(styles, function(v, k) {
return that.$success_status.css(k, v);
}), $("body").addClass("home-status-padding"), $("body div.navbar.navbar-fixed-top").addClass("navbar-status-padding"), 
this.$success_status.hide(), this.$success_status.html("<div style='width: 960px; margin: 0px auto; position: relative;'>\n  <p style='margin-top:10px; font-size: 20px; color: white; padding-top: 3px;'>Congratulations! You have solved this problem!</p>\n</div>"), 
this.$success_status.fadeIn(), this.$success_status.find("a.closeit").die(), this;
}, closeSuccessStatus = function() {
var $success_status;
return $success_status = $("#success-status-wrap"), 0 !== $success_status.length && ($success_status.fadeOut(), 
$("body").removeClass("home-status-padding"), $("body div.navbar.navbar-fixed-top").removeClass("navbar-status-padding"), 
$success_status.html("")), this;
}, getRemainingTime = function(destination) {
var current, date_time_string, days, days_string, hours, hours_string, minutes, minutes_string, offset_hours, offset_minutes, seconds, seconds_diff, seconds_string, target;
return target = new Date(0), target.setUTCSeconds(destination), current = new Date(), 
seconds_diff = Math.floor((target - current) / 1e3), seconds_diff > 0 && (days = Math.floor(seconds_diff / 86400), 
offset_hours = seconds_diff % 86400, hours = Math.floor(offset_hours / 3600), offset_minutes = offset_hours % 3600, 
minutes = Math.floor(offset_minutes / 60), seconds = offset_minutes % 60, date_time_string = "", 
days > 0 && (days_string = 1 === days ? "Day" :"Days", date_time_string += "" + days + " " + days_string + " "), 
(days > 0 || hours > 0) && (hours_string = 1 === hours ? "Hour" :"Hours", date_time_string += "" + hours + " " + hours_string + " "), 
(days > 0 || hours > 0 || minutes > 0) && (minutes_string = 1 === minutes ? "Minute" :"Minutes", 
date_time_string += "" + minutes + " " + minutes_string + " "), (days > 0 || hours > 0 || minutes > 0 || seconds > 0) && (seconds_string = 1 === seconds ? "Second" :"Seconds", 
date_time_string += "" + seconds + " " + seconds_string)), date_time_string;
}, countdownTimer = function($el, destination, callback, recursion) {
var clbk, date_time_string;
return null == callback && (callback = null), null == recursion && (recursion = !1), 
recursion || !$el.data("timer_running") ? (window.el = $el, destination ? (date_time_string = getRemainingTime(destination), 
$el.html(date_time_string), clbk = function() {
return countdownTimer($el, destination, callback, !0);
}, setTimeout(clbk, 1e3), $el.data("timer_running", !0)) :($el.html("0 Seconds (Loading...)"), 
callback ? callback() :void 0)) :void 0;
}, _addExtendedAttributes = function(attributes) {
var output;
return output = "", _.each(attributes, function(value, key) {
return __indexOf.call(ALLOWED_EXTENDED_ATTRIBUTES, key) >= 0 ? output += "" + key + "='" + value + "' " :void 0;
}, this), output;
}, _encType = function(metadata) {
var has_file;
return has_file = !1, _.each(metadata, function(value) {
return "file" === value.type ? has_file = !0 :void 0;
}), null != has_file ? has_file :{
"multipart/form-data":"application/x-www-form-urlencoded"
};
}, bindFormEvents = function($view, model, metadata, options) {
var _clbk;
return null == options && (options = {}), _.each(metadata, function(value, key) {
var event, selector, _ref, _ref1;
return "color" === (_ref = value.type) || "date" === _ref || "datetime" === _ref || "datetime-local" === _ref || "email" === _ref || "month" === _ref || "number" === _ref || "password" === _ref || "range" === _ref || "search" === _ref || "tel" === _ref || "text" === _ref || "time" === _ref || "url" === _ref || "week" === _ref || "file" === _ref || "image" === _ref ? (event = "input", 
selector = "input[name=" + key + "]") :"file" === value.type ? (event = "change", 
selector = "input[name=" + key + "]") :"checkbox" === value.type ? (event = "change", 
selector = "input[name=" + key + "]") :"image" === value.type ? (event = "click", 
selector = "input[name=" + key + "]") :"textarea" === value.type ? (event = "input", 
selector = "textarea[name=" + key + "]") :"radio" === (_ref1 = value.type) || "select" === _ref1, 
$view.find("form " + selector).bind(event, function(e) {
var data;
return data = {}, data[key] = "checkbox" === value.type ? $(e.currentTarget).is(":checked") :$(e.currentTarget).val(), 
model.set(data, {
silent:!0
}), model.trigger("modified");
});
}, this), model.bind("modified", function() {
return options.submit && options.submit.enable && options.submit.enable.that && options.submit.enable.callback && options.submit.enable.callback.call(options.submit.that), 
$view.find("form input[type=submit]").removeAttr("disabled"), $view.find("form input[type=reset]").removeAttr("disabled");
}), model.bind("reset", function() {
return $view.find("form input[type=submit]").attr("disabled", "disabled"), $view.find("form input[type=reset]").attr("disabled", "disabled");
}), $view.find("form input[type=reset]").click(function() {
return $view.find("form input[type=submit]").attr("disabled", "disabled"), $view.find("form input[type=reset]").attr("disabled", "disabled"), 
$view.find("form").get(0).reset();
}), _clbk = function(e) {
return null == e && (e = null), null !== e && e.preventDefault(), model.save(null, {
success:function() {
return $view.find("form input[type=submit]").attr("disabled", "disabled"), $view.find("form input[type=reset]").attr("disabled", "disabled");
}
});
}, $view.find("form input[type=submit]").click(_clbk), options.submit && options.submit.action && options.submit.action.that && options.submit.action.callback ? options.submit.action.that[options.submit.action.callback] = _clbk :void 0;
}, genFormHTML = function(metadata, model) {
var enctype, output;
return enctype = _encType(metadata), output = "<form enctype='" + enctype + "'>", 
_.each(metadata, function(value, key) {
var error, hint, input_span, label, label_span, name, _ref, _ref1, _ref2, _ref3, _ref4;
if (name = key, value.name = name, value.value = model.get(key), value.type || (value.type = "text"), 
"color" === (_ref = value.type) || "date" === _ref || "datetime" === _ref || "datetime-local" === _ref || "email" === _ref || "month" === _ref || "number" === _ref || "password" === _ref || "range" === _ref || "search" === _ref || "tel" === _ref || "text" === _ref || "time" === _ref || "url" === _ref || "week" === _ref || "file" === _ref || "image" === _ref || "radio" === _ref || "checkbox" === _ref || "textarea" === _ref || "select" === _ref) return "checkbox" === value.type ? (label_span = "5", 
input_span = "4") :(label_span = "3", input_span = "6"), output += "<div class='formgroup horizontal'>", 
label = value.label || name, output += "<label for='" + name + "' class='pull-left span" + label_span + "' style='text-align: left; padding-left: 10px;' >" + label + "</label>", 
output += "<div class='block span" + (input_span + 1) + "'>", "color" === (_ref1 = value.type) || "date" === _ref1 || "datetime" === _ref1 || "datetime-local" === _ref1 || "email" === _ref1 || "month" === _ref1 || "number" === _ref1 || "password" === _ref1 || "range" === _ref1 || "search" === _ref1 || "tel" === _ref1 || "text" === _ref1 || "time" === _ref1 || "url" === _ref1 || "week" === _ref1 || "file" === _ref1 || "image" === _ref1 ? (output += "<input class='span" + input_span + "' ", 
output += _addExtendedAttributes(value), output += "/>") :"radio" === (_ref2 = value.type) || "select" === _ref2 || ("textarea" === (_ref3 = value.type) ? (output += "<textarea", 
output += _addExtendedAttributes(value), output += ">", value.value && (output += value.value), 
output += "</textarea>") :"checkbox" === value.type && (output += "<div class='switch' data-on='success' data-off='info'><input name='" + name + "' type='" + value.type + "'", 
value.value && (output += "checked='checked'"), output += "></div>")), hint = value.hint || "", 
error = value.error || "", output += "<small class='sub-help'>" + hint + "</small><br>", 
output += "<small class='error'>" + error + "</small>", output += "</div>", output += "</div>";
if ("button" === (_ref4 = value.type) || "submit" === _ref4 || "reset" === _ref4) ; else if ("hidden" === value.type) return output += "<input ", 
output += _addExtendedAttributes(value), output += ">";
}, this), output += "</form>";
}, sortNumbers = function(a, b) {
return a - b;
}, renderBreadCrumbs = function(el, breadcrumbs) {
var breadCrumbsView;
return breadCrumbsView = new HR.BreadCrumbsView({
collection:breadcrumbs
}), $(el).html(breadCrumbsView.render().el), breadCrumbsView;
}, htmlEncode = function(value) {
return "" === value || void 0 === value ? "" :String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}, htmlDecode = function(value) {
return String(value).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}, formData = function($el, ids) {
var attr;
return attr = {}, _.each(ids, function() {
return function(id) {
var el;
return el = $el.find("#" + id), el.length > 0 ? attr[id] = "checkbox" === el.attr("type") ? el.is(":checked") :el.val() :console.warn("HR::Util::FormData:: Cannot Find field #" + id);
};
}(this)), attr;
}, scrollToTop = function(speed) {
return null == speed && (speed = 0), $("html body").animate({
scrollTop:0
}, speed);
}, scrollToBottom = function(speed) {
return null == speed && (speed = 0), $("html, body").animate({
scrollTop:$(document).height()
}, speed);
}, timezone_abbr = function(dateInput) {
var dateObject, dateString, tzAbbr;
return dateObject = dateInput || new Date(), dateString = dateObject + "", tzAbbr = dateString.match(/\(([^\)]+)\)$/) || dateString.match(/([A-Z]+) [\d]{4}$/), 
tzAbbr && (tzAbbr = tzAbbr[1].match(/[A-Z]/g).join("")), !tzAbbr && /(GMT\W*\d{4})/.test(dateString) ? RegExp.$1 :tzAbbr;
}, date_getMon = function(date) {
return [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ][date.getMonth()];
}, date_getMonth = function(date) {
return [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ][date.getMonth()];
}, date_get12hour_hour = function(date) {
return date.getHours() % 12;
}, date_get12hour_offset = function(date) {
return date.getHours() < 12 ? "AM" :"PM";
}, validate_time = function(time) {
var hh, mm, time_parts;
return time_parts = time.split(":"), 2 === time_parts.length ? (hh = parseInt(time_parts[0]), 
mm = parseInt(time_parts[1]), _.isNaN(hh) || _.isNaN(mm) ? !1 :24 > hh && hh >= 0 && 60 > mm && mm >= 0 ? !0 :!1) :!1;
}, validate_date = function(date) {
var date_parts, days_in_the_month, dd, mm, yyyy;
return date_parts = date.split("/"), 3 === date_parts.length ? (mm = parseInt(date_parts[0]), 
dd = parseInt(date_parts[1]), yyyy = parseInt(date_parts[2]), _.isNaN(mm) || _.isNaN(dd) || _.isNaN(yyyy) ? !1 :mm > 0 && 12 >= mm && dd > 0 && 31 >= dd && yyyy >= 1970 && 2038 > yyyy ? (days_in_the_month = 31, 
days_in_the_month = 1 === mm || 3 === mm || 5 === mm || 7 === mm || 8 === mm || 10 === mm || 12 === mm ? 31 :4 === mm || 6 === mm || 9 === mm || 11 === mm ? 30 :yyyy % 4 === 0 ? 29 :28, 
days_in_the_month >= mm ? !0 :!1) :!1) :!1;
}, getEpochTimeStampFromDateTime = function(date, time) {
var MM, date_parts, dd, hh, mm, time_parts, yyyy, _d;
return validate_date(date) && validate_time(time) ? (date_parts = date.split("/"), 
time_parts = time.split(":"), MM = date_parts[0], dd = date_parts[1], yyyy = date_parts[2], 
hh = time_parts[0], mm = time_parts[1], _d = new Date(yyyy, MM - 1, dd, hh, mm, 0), 
_d.getTime() / 1e3) :null;
}, getErrorList = function(errors) {
var error, _html, _i, _len;
for (null == errors && (errors = []), _html = "<ul>", _i = 0, _len = errors.length; _len > _i; _i++) error = errors[_i], 
_html += "<li>" + error + "</li>";
return _html += "</ul>";
}, getDateFromEpoch = function(epoch) {
var d;
return d = new Date(0), d.setUTCSeconds(epoch), d;
}, splitDate = function(date) {
var resp;
return resp = {}, resp.dd = date.getDate(), resp.MM = date.getMonth() + 1, resp.yyyy = date.getFullYear(), 
resp.hh = date.getHours(), resp.mm = date.getMinutes(), resp.dd = resp.dd < 10 ? "0" + resp.dd :"" + resp.dd, 
resp.MM = resp.MM < 10 ? "0" + resp.MM :"" + resp.MM, resp.hh = resp.hh < 10 ? "0" + resp.hh :"" + resp.hh, 
resp.mm = resp.mm < 10 ? "0" + resp.mm :"" + resp.mm, resp;
}, error_html = function(errors) {
return _.isString(errors) ? errors :_.isNaN(errors) || _.isNull(errors) ? "" :_.isObject(errors) ? "<ul>" + _.map(errors, function(error, key) {
return "<li><strong>" + _.capitalize(key) + ":</strong> " + error + "</li>";
}) + "<ul>" :_.isArray(errors) ? "<ul>" + _.map(errors, function(error) {
return "<li>" + error + "</li>";
}) + "<ul>" :void 0;
}, genModContainer = function(data) {
var hide;
return hide = data.close === !0 ? "" :"hide", "<div class='moderator-container' data-username='" + data.name + "'> <div class='moderator-close'> <a class='btn btn-text small msR cursor " + hide + " remove-moderator' data-username='" + data.name + "'><i class='icon-cancel-small'></i></a> </div> <div class='moderator-avatar'> <img height='50' width='50' class='pull-left msR avatar profile_avatar' src='" + data.avatar + "' > </div> <div class='moderator-details'> <p class='moderator-name'>" + data.name + "</p> <p class='moderator-role'>" + data.role + "</p> </div> </div>";
}, inlineLoadingStart = function(target) {
var html;
return html = '<span class="inline-throbber loading"> <i class="icon2-status_correct txt-green throbber-success"></i> </span>', 
HR.loadingButton = target, HR.util.removeAllInlineThrobbers(!1), $(html).insertAfter(target).fadeIn("normal");
}, inlineLoadingEnd = function(response) {
var successHTML;
if (HR.loadingButton) return "Success" === response.message ? (successHTML = '<span class="inline-throbber success"> <i class="icon2-status_correct txt-green throbber-success"></i> </span>', 
setTimeout(function() {
return function() {
return HR.util.removeAllInlineThrobbers(!1), $(successHTML).insertAfter(HR.loadingButton).fadeIn("normal");
};
}(this), 500), setTimeout(function() {
return function() {
return HR.util.removeAllInlineThrobbers(!0), HR.loadingButton = "";
};
}(this), 3e3)) :(HR.util.removeAllInlineThrobbers(!0), setTimeout(function() {
return function() {
return response.message ? HR.util.ajaxmsg(response.message, !1, !0, 5, 50) :void 0;
};
}(this)));
}, removeAllInlineThrobbers = function(fade) {
return fade ? $(HR.loadingButton).siblings(".inline-throbber").fadeOut("fast", function() {
return _.isFunction(this.remove) ? this.remove() :void 0;
}) :$(HR.loadingButton).siblings(".inline-throbber").remove();
}, showInlineSuccess = function(view, element, time) {
var html;
return null == time && (time = 1e3), html = '<span class="inline-throbber success"> <i class="icon2-status_correct txt-green throbber-success"></i> </span>', 
setTimeout(function() {
return $(html).insertAfter(element).fadeIn("Normal"), HR.loadingButton = element;
}), setTimeout(function() {
return HR.util.removeAllInlineThrobbers(!0);
}, time);
}, confirmDialog = function(options) {
var modal_template;
return this.options = _.extend({
confirmBtnText:"Ok",
cancelBtnText:"Cancel",
message:"Are you sure"
}, options), modal_template = _.template('<div class="confirm-modal-wrapper"> <div class="modal modal-mid fade in" id="confirm-modal"> <div class="modal-header"> Please Confirm <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\xd7</button> </div> <div class="modal-body"> <%= options.message %> </div> <div class="modal-footer"> <button type="button" id="confirmBtn" class="btn btn-primary"><%= options.confirmBtnText %></button> <button type="button" id="cancelBtn" class="btn btn-primary"><%= options.cancelBtnText %></button> </div> </div> </div>'), 
$(document).find(".confirm-modal-wrapper").remove(), $("body").append(modal_template({
options:this.options
})), this.dialog = $(document).find(".confirm-modal-wrapper"), this.dialog.find("#confirm-modal").modal(), 
this.dialog.find(".close").click(function(_this) {
return function() {
return _this.dialog.find("#confirm-modal").modal("hide"), $(document).find(".confirm-modal-wrapper").remove();
};
}(this)), this.dialog.find("#cancelBtn").click(function(_this) {
return function() {
return _this.dialog.find(".close").click();
};
}(this)), this.dialog.find("#confirmBtn").click(function(_this) {
return function() {
return _this.options.callback ? (_this.options.callback(), _this.dialog.find(".close").click()) :void 0;
};
}(this));
}, downloadURL = function(url) {
var hiddenIFrameID, iframe;
return hiddenIFrameID = "hiddenDownloader", iframe = document.getElementById(hiddenIFrameID), 
null === iframe && (iframe = document.createElement("iframe"), iframe.id = hiddenIFrameID, 
iframe.style.display = "none", document.body.appendChild(iframe)), iframe.src = url;
}, getFileAnchor = function(url, newTab, image) {
var fileName, html;
return null == newTab && (newTab = !0), null == image && (image = !0), fileName = url.substr(url.lastIndexOf("/") + 1), 
html = "<a href='" + url + "'", newTab && (html += " target='_blank'"), html += ">", 
html += "" + fileName + "</a>";
}, HR = null != (_ref = window.HR) ? _ref :{}, HR.util || (HR.util = {}), HR.util.log = Backbone.log, 
HR.util.pagination = pagination, HR.util.trim = trim, HR.util.ajaxmsg = ajaxmsg, 
HR.util.initializeTimers = initializeTimers, HR.util.semiFix = semiFix, HR.util.uploadDialog = uploadDialog, 
HR.util.padZeros = padZeros, HR.util.mp_ping = mp_ping, HR.util.Base64 = Base64, 
HR.util.numberSuffix = numberSuffix, HR.util.showLoginError = showLoginError, HR.util.successStatus = successStatus, 
HR.util.closeSuccessStatus = closeSuccessStatus, HR.util.htmlEncode = htmlEncode, 
HR.util.htmlDecode = htmlDecode, HR.util.setTab = setTab, HR.util.countdownTimer = countdownTimer, 
HR.util.genFormHTML = genFormHTML, HR.util.bindFormEvents = bindFormEvents, HR.util.sortNumbers = sortNumbers, 
HR.util.formData = formData, HR.util.scrollToTop = scrollToTop, HR.util.scrollToBottom = scrollToBottom, 
HR.util.renderBreadCrumbs = renderBreadCrumbs, HR.util.slugify = slugify, HR.util.getRemainingTime = getRemainingTime, 
HR.util.timezone_abbr = timezone_abbr, HR.util.date_getMon = date_getMon, HR.util.date_getMonth = date_getMonth, 
HR.util.date_get12hour_hour = date_get12hour_hour, HR.util.date_get12hour_offset = date_get12hour_offset, 
HR.util.validate_time = validate_time, HR.util.validate_date = validate_date, HR.util.getEpochTimeStampFromDateTime = getEpochTimeStampFromDateTime, 
HR.util.getErrorList = getErrorList, HR.util.getDateFromEpoch = getDateFromEpoch, 
HR.util.splitDate = splitDate, HR.util.genModContainer = genModContainer, HR.util.error_html = error_html, 
HR.util.inlineLoadingStart = inlineLoadingStart, HR.util.inlineLoadingEnd = inlineLoadingEnd, 
HR.util.removeAllInlineThrobbers = removeAllInlineThrobbers, HR.util.showInlineSuccess = showInlineSuccess, 
HR.util.confirmDialog = confirmDialog, HR.util.downloadURL = downloadURL, HR.util.getFileAnchor = getFileAnchor, 
window.HR || (window.HR = HR);
}), String.prototype.endsWith = function(suffix) {
return -1 !== this.indexOf(suffix, this.length - suffix.length);
}, String.prototype.startsWith = function(prefix) {
return 0 === this.indexOf(prefix);
};
}.call(this), function() {
function eq(a, b, stack) {
if (a === b) return 0 !== a || 1 / a == 1 / b;
if (null == a || null == b) return a === b;
if (a._chain && (a = a._wrapped), b._chain && (b = b._wrapped), a.isEqual && _.isFunction(a.isEqual)) return a.isEqual(b);
if (b.isEqual && _.isFunction(b.isEqual)) return b.isEqual(a);
var className = toString.call(a);
if (className != toString.call(b)) return !1;
switch (className) {
case "[object String]":
return a == String(b);

case "[object Number]":
return a != +a ? b != +b :0 == a ? 1 / a == 1 / b :a == +b;

case "[object Date]":
case "[object Boolean]":
return +a == +b;

case "[object RegExp]":
return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
}
if ("object" != typeof a || "object" != typeof b) return !1;
for (var length = stack.length; length--; ) if (stack[length] == a) return !0;
stack.push(a);
var size = 0, result = !0;
if ("[object Array]" == className) {
if (size = a.length, result = size == b.length) for (;size-- && (result = size in a == size in b && eq(a[size], b[size], stack)); ) ;
} else {
if ("constructor" in a != "constructor" in b || a.constructor != b.constructor) return !1;
for (var key in a) if (_.has(a, key) && (size++, !(result = _.has(b, key) && eq(a[key], b[key], stack)))) break;
if (result) {
for (key in b) if (_.has(b, key) && !size--) break;
result = !size;
}
}
return stack.pop(), result;
}
var root = this, previousUnderscore = root._, breaker = {}, ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype, slice = ArrayProto.slice, unshift = ArrayProto.unshift, toString = ObjProto.toString, hasOwnProperty = ObjProto.hasOwnProperty, nativeForEach = ArrayProto.forEach, nativeMap = ArrayProto.map, nativeReduce = ArrayProto.reduce, nativeReduceRight = ArrayProto.reduceRight, nativeFilter = ArrayProto.filter, nativeEvery = ArrayProto.every, nativeSome = ArrayProto.some, nativeIndexOf = ArrayProto.indexOf, nativeLastIndexOf = ArrayProto.lastIndexOf, nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = FuncProto.bind, _ = function(obj) {
return new wrapper(obj);
};
"undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = _), 
exports._ = _) :root._ = _, _.VERSION = "1.3.3";
var each = _.each = _.forEach = function(obj, iterator, context) {
if (null != obj) if (nativeForEach && obj.forEach === nativeForEach) obj.forEach(iterator, context); else if (obj.length === +obj.length) {
for (var i = 0, l = obj.length; l > i; i++) if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
} else for (var key in obj) if (_.has(obj, key) && iterator.call(context, obj[key], key, obj) === breaker) return;
};
_.map = _.collect = function(obj, iterator, context) {
var results = [];
return null == obj ? results :nativeMap && obj.map === nativeMap ? obj.map(iterator, context) :(each(obj, function(value, index, list) {
results[results.length] = iterator.call(context, value, index, list);
}), obj.length === +obj.length && (results.length = obj.length), results);
}, _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
var initial = arguments.length > 2;
if (null == obj && (obj = []), nativeReduce && obj.reduce === nativeReduce) return context && (iterator = _.bind(iterator, context)), 
initial ? obj.reduce(iterator, memo) :obj.reduce(iterator);
if (each(obj, function(value, index, list) {
initial ? memo = iterator.call(context, memo, value, index, list) :(memo = value, 
initial = !0);
}), !initial) throw new TypeError("Reduce of empty array with no initial value");
return memo;
}, _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
var initial = arguments.length > 2;
if (null == obj && (obj = []), nativeReduceRight && obj.reduceRight === nativeReduceRight) return context && (iterator = _.bind(iterator, context)), 
initial ? obj.reduceRight(iterator, memo) :obj.reduceRight(iterator);
var reversed = _.toArray(obj).reverse();
return context && !initial && (iterator = _.bind(iterator, context)), initial ? _.reduce(reversed, iterator, memo, context) :_.reduce(reversed, iterator);
}, _.find = _.detect = function(obj, iterator, context) {
var result;
return any(obj, function(value, index, list) {
return iterator.call(context, value, index, list) ? (result = value, !0) :void 0;
}), result;
}, _.filter = _.select = function(obj, iterator, context) {
var results = [];
return null == obj ? results :nativeFilter && obj.filter === nativeFilter ? obj.filter(iterator, context) :(each(obj, function(value, index, list) {
iterator.call(context, value, index, list) && (results[results.length] = value);
}), results);
}, _.reject = function(obj, iterator, context) {
var results = [];
return null == obj ? results :(each(obj, function(value, index, list) {
iterator.call(context, value, index, list) || (results[results.length] = value);
}), results);
}, _.every = _.all = function(obj, iterator, context) {
var result = !0;
return null == obj ? result :nativeEvery && obj.every === nativeEvery ? obj.every(iterator, context) :(each(obj, function(value, index, list) {
return (result = result && iterator.call(context, value, index, list)) ? void 0 :breaker;
}), !!result);
};
var any = _.some = _.any = function(obj, iterator, context) {
iterator || (iterator = _.identity);
var result = !1;
return null == obj ? result :nativeSome && obj.some === nativeSome ? obj.some(iterator, context) :(each(obj, function(value, index, list) {
return result || (result = iterator.call(context, value, index, list)) ? breaker :void 0;
}), !!result);
};
_.include = _.contains = function(obj, target) {
var found = !1;
return null == obj ? found :nativeIndexOf && obj.indexOf === nativeIndexOf ? -1 != obj.indexOf(target) :found = any(obj, function(value) {
return value === target;
});
}, _.invoke = function(obj, method) {
var args = slice.call(arguments, 2);
return _.map(obj, function(value) {
return (_.isFunction(method) ? method || value :value[method]).apply(value, args);
});
}, _.pluck = function(obj, key) {
return _.map(obj, function(value) {
return value[key];
});
}, _.max = function(obj, iterator, context) {
if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.max.apply(Math, obj);
if (!iterator && _.isEmpty(obj)) return -1/0;
var result = {
computed:-1/0
};
return each(obj, function(value, index, list) {
var computed = iterator ? iterator.call(context, value, index, list) :value;
computed >= result.computed && (result = {
value:value,
computed:computed
});
}), result.value;
}, _.min = function(obj, iterator, context) {
if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.min.apply(Math, obj);
if (!iterator && _.isEmpty(obj)) return 1/0;
var result = {
computed:1/0
};
return each(obj, function(value, index, list) {
var computed = iterator ? iterator.call(context, value, index, list) :value;
computed < result.computed && (result = {
value:value,
computed:computed
});
}), result.value;
}, _.shuffle = function(obj) {
var rand, shuffled = [];
return each(obj, function(value, index) {
rand = Math.floor(Math.random() * (index + 1)), shuffled[index] = shuffled[rand], 
shuffled[rand] = value;
}), shuffled;
}, _.sortBy = function(obj, val, context) {
var iterator = _.isFunction(val) ? val :function(obj) {
return obj[val];
};
return _.pluck(_.map(obj, function(value, index, list) {
return {
value:value,
criteria:iterator.call(context, value, index, list)
};
}).sort(function(left, right) {
var a = left.criteria, b = right.criteria;
return void 0 === a ? 1 :void 0 === b ? -1 :b > a ? -1 :a > b ? 1 :0;
}), "value");
}, _.groupBy = function(obj, val) {
var result = {}, iterator = _.isFunction(val) ? val :function(obj) {
return obj[val];
};
return each(obj, function(value, index) {
var key = iterator(value, index);
(result[key] || (result[key] = [])).push(value);
}), result;
}, _.sortedIndex = function(array, obj, iterator) {
iterator || (iterator = _.identity);
for (var low = 0, high = array.length; high > low; ) {
var mid = low + high >> 1;
iterator(array[mid]) < iterator(obj) ? low = mid + 1 :high = mid;
}
return low;
}, _.toArray = function(obj) {
return obj ? _.isArray(obj) ? slice.call(obj) :_.isArguments(obj) ? slice.call(obj) :obj.toArray && _.isFunction(obj.toArray) ? obj.toArray() :_.values(obj) :[];
}, _.size = function(obj) {
return _.isArray(obj) ? obj.length :_.keys(obj).length;
}, _.first = _.head = _.take = function(array, n, guard) {
return null == n || guard ? array[0] :slice.call(array, 0, n);
}, _.initial = function(array, n, guard) {
return slice.call(array, 0, array.length - (null == n || guard ? 1 :n));
}, _.last = function(array, n, guard) {
return null == n || guard ? array[array.length - 1] :slice.call(array, Math.max(array.length - n, 0));
}, _.rest = _.tail = function(array, index, guard) {
return slice.call(array, null == index || guard ? 1 :index);
}, _.compact = function(array) {
return _.filter(array, function(value) {
return !!value;
});
}, _.flatten = function(array, shallow) {
return _.reduce(array, function(memo, value) {
return _.isArray(value) ? memo.concat(shallow ? value :_.flatten(value)) :(memo[memo.length] = value, 
memo);
}, []);
}, _.without = function(array) {
return _.difference(array, slice.call(arguments, 1));
}, _.uniq = _.unique = function(array, isSorted, iterator) {
var initial = iterator ? _.map(array, iterator) :array, results = [];
return array.length < 3 && (isSorted = !0), _.reduce(initial, function(memo, value, index) {
return (isSorted ? _.last(memo) === value && memo.length :_.include(memo, value)) || (memo.push(value), 
results.push(array[index])), memo;
}, []), results;
}, _.union = function() {
return _.uniq(_.flatten(arguments, !0));
}, _.intersection = _.intersect = function(array) {
var rest = slice.call(arguments, 1);
return _.filter(_.uniq(array), function(item) {
return _.every(rest, function(other) {
return _.indexOf(other, item) >= 0;
});
});
}, _.difference = function(array) {
var rest = _.flatten(slice.call(arguments, 1), !0);
return _.filter(array, function(value) {
return !_.include(rest, value);
});
}, _.zip = function() {
for (var args = slice.call(arguments), length = _.max(_.pluck(args, "length")), results = new Array(length), i = 0; length > i; i++) results[i] = _.pluck(args, "" + i);
return results;
}, _.indexOf = function(array, item, isSorted) {
if (null == array) return -1;
var i, l;
if (isSorted) return i = _.sortedIndex(array, item), array[i] === item ? i :-1;
if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
for (i = 0, l = array.length; l > i; i++) if (i in array && array[i] === item) return i;
return -1;
}, _.lastIndexOf = function(array, item) {
if (null == array) return -1;
if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
for (var i = array.length; i--; ) if (i in array && array[i] === item) return i;
return -1;
}, _.range = function(start, stop, step) {
arguments.length <= 1 && (stop = start || 0, start = 0), step = arguments[2] || 1;
for (var len = Math.max(Math.ceil((stop - start) / step), 0), idx = 0, range = new Array(len); len > idx; ) range[idx++] = start, 
start += step;
return range;
};
var ctor = function() {};
_.bind = function(func, context) {
var bound, args;
if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
if (!_.isFunction(func)) throw new TypeError();
return args = slice.call(arguments, 2), bound = function() {
if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
ctor.prototype = func.prototype;
var self = new ctor(), result = func.apply(self, args.concat(slice.call(arguments)));
return Object(result) === result ? result :self;
};
}, _.bindAll = function(obj) {
var funcs = slice.call(arguments, 1);
return 0 == funcs.length && (funcs = _.functions(obj)), each(funcs, function(f) {
obj[f] = _.bind(obj[f], obj);
}), obj;
}, _.memoize = function(func, hasher) {
var memo = {};
return hasher || (hasher = _.identity), function() {
var key = hasher.apply(this, arguments);
return _.has(memo, key) ? memo[key] :memo[key] = func.apply(this, arguments);
};
}, _.delay = function(func, wait) {
var args = slice.call(arguments, 2);
return setTimeout(function() {
return func.apply(null, args);
}, wait);
}, _.defer = function(func) {
return _.delay.apply(_, [ func, 1 ].concat(slice.call(arguments, 1)));
}, _.throttle = function(func, wait) {
var context, args, timeout, throttling, more, result, whenDone = _.debounce(function() {
more = throttling = !1;
}, wait);
return function() {
context = this, args = arguments;
var later = function() {
timeout = null, more && func.apply(context, args), whenDone();
};
return timeout || (timeout = setTimeout(later, wait)), throttling ? more = !0 :result = func.apply(context, args), 
whenDone(), throttling = !0, result;
};
}, _.debounce = function(func, wait, immediate) {
var timeout;
return function() {
var context = this, args = arguments, later = function() {
timeout = null, immediate || func.apply(context, args);
};
immediate && !timeout && func.apply(context, args), clearTimeout(timeout), timeout = setTimeout(later, wait);
};
}, _.once = function(func) {
var memo, ran = !1;
return function() {
return ran ? memo :(ran = !0, memo = func.apply(this, arguments));
};
}, _.wrap = function(func, wrapper) {
return function() {
var args = [ func ].concat(slice.call(arguments, 0));
return wrapper.apply(this, args);
};
}, _.compose = function() {
var funcs = arguments;
return function() {
for (var args = arguments, i = funcs.length - 1; i >= 0; i--) args = [ funcs[i].apply(this, args) ];
return args[0];
};
}, _.after = function(times, func) {
return 0 >= times ? func() :function() {
return --times < 1 ? func.apply(this, arguments) :void 0;
};
}, _.keys = nativeKeys || function(obj) {
if (obj !== Object(obj)) throw new TypeError("Invalid object");
var keys = [];
for (var key in obj) _.has(obj, key) && (keys[keys.length] = key);
return keys;
}, _.values = function(obj) {
return _.map(obj, _.identity);
}, _.functions = _.methods = function(obj) {
var names = [];
for (var key in obj) _.isFunction(obj[key]) && names.push(key);
return names.sort();
}, _.extend = function(obj) {
return each(slice.call(arguments, 1), function(source) {
for (var prop in source) obj[prop] = source[prop];
}), obj;
}, _.pick = function(obj) {
var result = {};
return each(_.flatten(slice.call(arguments, 1)), function(key) {
key in obj && (result[key] = obj[key]);
}), result;
}, _.defaults = function(obj) {
return each(slice.call(arguments, 1), function(source) {
for (var prop in source) null == obj[prop] && (obj[prop] = source[prop]);
}), obj;
}, _.clone = function(obj) {
return _.isObject(obj) ? _.isArray(obj) ? obj.slice() :_.extend({}, obj) :obj;
}, _.tap = function(obj, interceptor) {
return interceptor(obj), obj;
}, _.isEqual = function(a, b) {
return eq(a, b, []);
}, _.isEmpty = function(obj) {
if (null == obj) return !0;
if (_.isArray(obj) || _.isString(obj)) return 0 === obj.length;
for (var key in obj) if (_.has(obj, key)) return !1;
return !0;
}, _.isElement = function(obj) {
return !(!obj || 1 != obj.nodeType);
}, _.isArray = nativeIsArray || function(obj) {
return "[object Array]" == toString.call(obj);
}, _.isObject = function(obj) {
return obj === Object(obj);
}, _.isArguments = function(obj) {
return "[object Arguments]" == toString.call(obj);
}, _.isArguments(arguments) || (_.isArguments = function(obj) {
return !(!obj || !_.has(obj, "callee"));
}), _.isFunction = function(obj) {
return "[object Function]" == toString.call(obj);
}, _.isString = function(obj) {
return "[object String]" == toString.call(obj);
}, _.isNumber = function(obj) {
return "[object Number]" == toString.call(obj);
}, _.isFinite = function(obj) {
return _.isNumber(obj) && isFinite(obj);
}, _.isNaN = function(obj) {
return obj !== obj;
}, _.isBoolean = function(obj) {
return obj === !0 || obj === !1 || "[object Boolean]" == toString.call(obj);
}, _.isDate = function(obj) {
return "[object Date]" == toString.call(obj);
}, _.isRegExp = function(obj) {
return "[object RegExp]" == toString.call(obj);
}, _.isNull = function(obj) {
return null === obj;
}, _.isUndefined = function(obj) {
return void 0 === obj;
}, _.has = function(obj, key) {
return hasOwnProperty.call(obj, key);
}, _.noConflict = function() {
return root._ = previousUnderscore, this;
}, _.identity = function(value) {
return value;
}, _.times = function(n, iterator, context) {
for (var i = 0; n > i; i++) iterator.call(context, i);
}, _.escape = function(string) {
return ("" + string).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
}, _.result = function(object, property) {
if (null == object) return null;
var value = object[property];
return _.isFunction(value) ? value.call(object) :value;
}, _.mixin = function(obj) {
each(_.functions(obj), function(name) {
addToWrapper(name, _[name] = obj[name]);
});
};
var idCounter = 0;
_.uniqueId = function(prefix) {
var id = idCounter++;
return prefix ? prefix + id :id;
}, _.templateSettings = {
evaluate:/<%([\s\S]+?)%>/g,
interpolate:/<%=([\s\S]+?)%>/g,
escape:/<%-([\s\S]+?)%>/g
};
var noMatch = /.^/, escapes = {
"\\":"\\",
"'":"'",
r:"\r",
n:"\n",
t:"	",
u2028:"\u2028",
u2029:"\u2029"
};
for (var p in escapes) escapes[escapes[p]] = p;
var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g, unescaper = /\\(\\|'|r|n|t|u2028|u2029)/g, unescape = function(code) {
return code.replace(unescaper, function(match, escape) {
return escapes[escape];
});
};
_.template = function(text, data, settings) {
settings = _.defaults(settings || {}, _.templateSettings);
var source = "__p+='" + text.replace(escaper, function(match) {
return "\\" + escapes[match];
}).replace(settings.escape || noMatch, function(match, code) {
return "'+\n_.escape(" + unescape(code) + ")+\n'";
}).replace(settings.interpolate || noMatch, function(match, code) {
return "'+\n(" + unescape(code) + ")+\n'";
}).replace(settings.evaluate || noMatch, function(match, code) {
return "';\n" + unescape(code) + "\n;__p+='";
}) + "';\n";
settings.variable || (source = "with(obj||{}){\n" + source + "}\n"), source = "var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" + source + "return __p;\n";
var render = new Function(settings.variable || "obj", "_", source);
if (data) return render(data, _);
var template = function(data) {
return render.call(this, data, _);
};
return template.source = "function(" + (settings.variable || "obj") + "){\n" + source + "}", 
template;
}, _.chain = function(obj) {
return _(obj).chain();
};
var wrapper = function(obj) {
this._wrapped = obj;
};
_.prototype = wrapper.prototype;
var result = function(obj, chain) {
return chain ? _(obj).chain() :obj;
}, addToWrapper = function(name, func) {
wrapper.prototype[name] = function() {
var args = slice.call(arguments);
return unshift.call(args, this._wrapped), result(func.apply(_, args), this._chain);
};
};
_.mixin(_), each([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(name) {
var method = ArrayProto[name];
wrapper.prototype[name] = function() {
var wrapped = this._wrapped;
method.apply(wrapped, arguments);
var length = wrapped.length;
return "shift" != name && "splice" != name || 0 !== length || delete wrapped[0], 
result(wrapped, this._chain);
};
}), each([ "concat", "join", "slice" ], function(name) {
var method = ArrayProto[name];
wrapper.prototype[name] = function() {
return result(method.apply(this._wrapped, arguments), this._chain);
};
}), wrapper.prototype.chain = function() {
return this._chain = !0, this;
}, wrapper.prototype.value = function() {
return this._wrapped;
};
}.call(this), /* ===================================================
 * bootstrap-transition.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
!function($) {
$(function() {
"use strict";
$.support.transition = function() {
var transitionEnd = function() {
var name, el = document.createElement("bootstrap"), transEndEventNames = {
WebkitTransition:"webkitTransitionEnd",
MozTransition:"transitionend",
OTransition:"oTransitionEnd",
msTransition:"MSTransitionEnd",
transition:"transitionend"
};
for (name in transEndEventNames) if (void 0 !== el.style[name]) return transEndEventNames[name];
}();
return transitionEnd && {
end:transitionEnd
};
}();
});
}(window.jQuery), /* =========================================================
 * bootstrap-modal.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
!function($) {
"use strict";
function hideWithTransition() {
var that = this, timeout = setTimeout(function() {
that.$element.off($.support.transition.end), hideModal.call(that);
}, 500);
this.$element.one($.support.transition.end, function() {
clearTimeout(timeout), hideModal.call(that);
});
}
function hideModal() {
this.$element.hide().trigger("hidden"), backdrop.call(this);
}
function backdrop(callback) {
var animate = this.$element.hasClass("fade") ? "fade" :"";
if (this.isShown && this.options.backdrop) {
var doAnimate = $.support.transition && animate;
this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(document.body), 
"static" != this.options.backdrop && this.$backdrop.click($.proxy(this.hide, this)), 
doAnimate && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), doAnimate ? this.$backdrop.one($.support.transition.end, callback) :callback();
} else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one($.support.transition.end, $.proxy(removeBackdrop, this)) :removeBackdrop.call(this)) :callback && callback();
}
function removeBackdrop() {
this.$backdrop.remove(), this.$backdrop = null;
}
function escape() {
var that = this;
this.isShown && this.options.keyboard ? $(document).on("keyup.dismiss.modal", function(e) {
27 == e.which && that.hide();
}) :this.isShown || $(document).off("keyup.dismiss.modal");
}
var Modal = function(content, options) {
this.options = options, this.$element = $(content).delegate('[data-dismiss="modal"]', "click.dismiss.modal", $.proxy(this.hide, this));
};
Modal.prototype = {
constructor:Modal,
toggle:function() {
return this[this.isShown ? "hide" :"show"]();
},
show:function() {
var that = this, e = $.Event("show");
this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || ($("body").addClass("modal-open"), 
this.isShown = !0, escape.call(this), backdrop.call(this, function() {
var transition = $.support.transition && that.$element.hasClass("fade");
that.$element.parent().length || that.$element.appendTo(document.body), that.$element.show(), 
transition && that.$element[0].offsetWidth, that.$element.addClass("in"), transition ? that.$element.one($.support.transition.end, function() {
that.$element.trigger("shown");
}) :that.$element.trigger("shown");
}));
},
hide:function(e) {
e && e.preventDefault();
e = $.Event("hide"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, 
$("body").removeClass("modal-open"), escape.call(this), this.$element.removeClass("in"), 
$.support.transition && this.$element.hasClass("fade") ? hideWithTransition.call(this) :hideModal.call(this));
}
}, $.fn.modal = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("modal"), options = $.extend({}, $.fn.modal.defaults, $this.data(), "object" == typeof option && option);
data || $this.data("modal", data = new Modal(this, options)), "string" == typeof option ? data[option]() :options.show && data.show();
});
}, $.fn.modal.defaults = {
backdrop:!0,
keyboard:!0,
show:!0
}, $.fn.modal.Constructor = Modal, $(function() {
$("body").on("click.modal.data-api", '[data-toggle="modal"]', function(e) {
var href, $this = $(this), $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "")), option = $target.data("modal") ? "toggle" :$.extend({}, $target.data(), $this.data());
e.preventDefault(), $target.modal(option);
});
});
}(window.jQuery), /* ============================================================
 * bootstrap-dropdown.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
!function($) {
"use strict";
function clearMenus() {
$(toggle).parent().removeClass("open");
}
var toggle = '[data-toggle="dropdown"]', Dropdown = function(element) {
var $el = $(element).on("click.dropdown.data-api", this.toggle);
$("html").on("click.dropdown.data-api", function() {
$el.parent().removeClass("open");
});
};
Dropdown.prototype = {
constructor:Dropdown,
toggle:function() {
var $parent, selector, isActive, $this = $(this);
if (!$this.is(".disabled, :disabled")) return selector = $this.attr("data-target"), 
selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")), 
$parent = $(selector), $parent.length || ($parent = $this.parent()), isActive = $parent.hasClass("open"), 
clearMenus(), isActive || $parent.toggleClass("open"), !1;
}
}, $.fn.dropdown = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("dropdown");
data || $this.data("dropdown", data = new Dropdown(this)), "string" == typeof option && data[option].call($this);
});
}, $.fn.dropdown.Constructor = Dropdown, $(function() {
$("html").on("click.dropdown.data-api", clearMenus), $("body").on("click.dropdown", ".dropdown form", function(e) {
e.stopPropagation();
}).on("click.dropdown.data-api", toggle, Dropdown.prototype.toggle);
});
}(window.jQuery), /* =============================================================
 * bootstrap-scrollspy.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */
!function($) {
"use strict";
function ScrollSpy(element, options) {
var href, process = $.proxy(this.process, this), $element = $(element).is("body") ? $(window) :$(element);
this.options = $.extend({}, $.fn.scrollspy.defaults, options), this.$scrollElement = $element.on("scroll.scroll.data-api", process), 
this.selector = (this.options.target || (href = $(element).attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", 
this.$body = $("body"), this.refresh(), this.process();
}
ScrollSpy.prototype = {
constructor:ScrollSpy,
refresh:function() {
var $targets, self = this;
this.offsets = $([]), this.targets = $([]), $targets = this.$body.find(this.selector).map(function() {
var $el = $(this), href = $el.data("target") || $el.attr("href"), $href = /^#\w/.test(href) && $(href);
return $href && href.length && [ [ $href.position().top, href ] ] || null;
}).sort(function(a, b) {
return a[0] - b[0];
}).each(function() {
self.offsets.push(this[0]), self.targets.push(this[1]);
});
},
process:function() {
var i, scrollTop = this.$scrollElement.scrollTop() + this.options.offset, scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, maxScroll = scrollHeight - this.$scrollElement.height(), offsets = this.offsets, targets = this.targets, activeTarget = this.activeTarget;
if (scrollTop >= maxScroll) return activeTarget != (i = targets.last()[0]) && this.activate(i);
for (i = offsets.length; i--; ) activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i]);
},
activate:function(target) {
var active, selector;
this.activeTarget = target, $(this.selector).parent(".active").removeClass("active"), 
selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]', 
active = $(selector).parent("li").addClass("active"), active.parent(".dropdown-menu") && (active = active.closest("li.dropdown").addClass("active")), 
active.trigger("activate");
}
}, $.fn.scrollspy = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("scrollspy"), options = "object" == typeof option && option;
data || $this.data("scrollspy", data = new ScrollSpy(this, options)), "string" == typeof option && data[option]();
});
}, $.fn.scrollspy.Constructor = ScrollSpy, $.fn.scrollspy.defaults = {
offset:10
}, $(function() {
$('[data-spy="scroll"]').each(function() {
var $spy = $(this);
$spy.scrollspy($spy.data());
});
});
}(window.jQuery), /* ========================================================
 * bootstrap-tab.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */
!function($) {
"use strict";
var Tab = function(element) {
this.element = $(element);
};
Tab.prototype = {
constructor:Tab,
show:function() {
var previous, $target, e, $this = this.element, $ul = $this.closest("ul:not(.dropdown-menu)"), selector = $this.attr("data-target");
selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")), 
$this.parent("li").hasClass("active") || (previous = $ul.find(".active a").last()[0], 
e = $.Event("show", {
relatedTarget:previous
}), $this.trigger(e), e.isDefaultPrevented() || ($target = $(selector), this.activate($this.parent("li"), $ul), 
this.activate($target, $target.parent(), function() {
$this.trigger({
type:"shown",
relatedTarget:previous
});
})));
},
activate:function(element, container, callback) {
function next() {
$active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), 
element.addClass("active"), transition ? (element[0].offsetWidth, element.addClass("in")) :element.removeClass("fade"), 
element.parent(".dropdown-menu") && element.closest("li.dropdown").addClass("active"), 
callback && callback();
}
var $active = container.find("> .active"), transition = callback && $.support.transition && $active.hasClass("fade");
transition ? $active.one($.support.transition.end, next) :next(), $active.removeClass("in");
}
}, $.fn.tab = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("tab");
data || $this.data("tab", data = new Tab(this)), "string" == typeof option && data[option]();
});
}, $.fn.tab.Constructor = Tab, $(function() {
$("body").on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
e.preventDefault(), $(this).tab("show");
});
});
}(window.jQuery), /* ===========================================================
 * bootstrap-tooltip.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
!function($) {
"use strict";
var Tooltip = function(element, options) {
this.init("tooltip", element, options);
};
Tooltip.prototype = {
constructor:Tooltip,
init:function(type, element, options) {
var eventIn, eventOut;
this.type = type, this.$element = $(element), this.options = this.getOptions(options), 
this.enabled = !0, "manual" != this.options.trigger && (eventIn = "hover" == this.options.trigger ? "mouseenter" :"focus", 
eventOut = "hover" == this.options.trigger ? "mouseleave" :"blur", this.$element.on(eventIn, this.options.selector, $.proxy(this.enter, this)), 
this.$element.on(eventOut, this.options.selector, $.proxy(this.leave, this))), this.options.selector ? this._options = $.extend({}, this.options, {
trigger:"manual",
selector:""
}) :this.fixTitle();
},
getOptions:function(options) {
return options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data()), 
options.delay && "number" == typeof options.delay && (options.delay = {
show:options.delay,
hide:options.delay
}), options;
},
enter:function(e) {
var self = $(e.currentTarget)[this.type](this._options).data(this.type);
return self.options.delay && self.options.delay.show ? (clearTimeout(this.timeout), 
self.hoverState = "in", this.timeout = setTimeout(function() {
"in" == self.hoverState && self.show();
}, self.options.delay.show), void 0) :self.show();
},
leave:function(e) {
var self = $(e.currentTarget)[this.type](this._options).data(this.type);
return this.timeout && clearTimeout(this.timeout), self.options.delay && self.options.delay.hide ? (self.hoverState = "out", 
this.timeout = setTimeout(function() {
"out" == self.hoverState && self.hide();
}, self.options.delay.hide), void 0) :self.hide();
},
show:function() {
var $tip, inside, pos, actualWidth, actualHeight, placement, tp;
if (this.hasContent() && this.enabled) {
switch ($tip = this.tip(), this.setContent(), this.options.animation && $tip.addClass("fade"), 
placement = "function" == typeof this.options.placement ? this.options.placement.call(this, $tip[0], this.$element[0]) :this.options.placement, 
inside = /in/.test(placement), $tip.remove().css({
top:0,
left:0,
display:"block"
}).appendTo(inside ? this.$element :document.body), pos = this.getPosition(inside), 
actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight, inside ? placement.split(" ")[1] :placement) {
case "bottom":
tp = {
top:pos.top + pos.height,
left:pos.left + pos.width / 2 - actualWidth / 2
};
break;

case "top":
tp = {
top:pos.top - actualHeight,
left:pos.left + pos.width / 2 - actualWidth / 2
};
break;

case "left":
tp = {
top:pos.top + pos.height / 2 - actualHeight / 2,
left:pos.left - actualWidth
};
break;

case "right":
tp = {
top:pos.top + pos.height / 2 - actualHeight / 2,
left:pos.left + pos.width
};
}
$tip.css(tp).addClass(placement).addClass("in");
}
},
isHTML:function(text) {
return "string" != typeof text || "<" === text.charAt(0) && ">" === text.charAt(text.length - 1) && text.length >= 3 || /^(?:[^<]*<[\w\W]+>[^>]*$)/.exec(text);
},
setContent:function() {
var $tip = this.tip(), title = this.getTitle();
$tip.find(".tooltip-inner")[this.isHTML(title) ? "html" :"text"](title), $tip.removeClass("fade in top bottom left right");
},
hide:function() {
function removeWithAnimation() {
var timeout = setTimeout(function() {
$tip.off($.support.transition.end).remove();
}, 500);
$tip.one($.support.transition.end, function() {
clearTimeout(timeout), $tip.remove();
});
}
var $tip = this.tip();
$tip.removeClass("in"), $.support.transition && this.$tip.hasClass("fade") ? removeWithAnimation() :$tip.remove();
},
fixTitle:function() {
var $e = this.$element;
($e.attr("title") || "string" != typeof $e.attr("data-original-title")) && $e.attr("data-original-title", $e.attr("title") || "").removeAttr("title");
},
hasContent:function() {
return this.getTitle();
},
getPosition:function(inside) {
return $.extend({}, inside ? {
top:0,
left:0
} :this.$element.offset(), {
width:this.$element[0].offsetWidth,
height:this.$element[0].offsetHeight
});
},
getTitle:function() {
var title, $e = this.$element, o = this.options;
return title = $e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call($e[0]) :o.title);
},
tip:function() {
return this.$tip = this.$tip || $(this.options.template);
},
validate:function() {
this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null);
},
enable:function() {
this.enabled = !0;
},
disable:function() {
this.enabled = !1;
},
toggleEnabled:function() {
this.enabled = !this.enabled;
},
toggle:function() {
this[this.tip().hasClass("in") ? "hide" :"show"]();
}
}, $.fn.tooltip = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("tooltip"), options = "object" == typeof option && option;
data || $this.data("tooltip", data = new Tooltip(this, options)), "string" == typeof option && data[option]();
});
}, $.fn.tooltip.Constructor = Tooltip, $.fn.tooltip.defaults = {
animation:!0,
placement:"top",
selector:!1,
template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
trigger:"hover",
title:"",
delay:0
};
}(window.jQuery), /* ===========================================================
 * bootstrap-popover.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */
!function($) {
"use strict";
var Popover = function(element, options) {
this.init("popover", element, options);
};
Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {
constructor:Popover,
setContent:function() {
var $tip = this.tip(), title = this.getTitle(), content = this.getContent();
$tip.find(".popover-title")[this.isHTML(title) ? "html" :"text"](title), $tip.find(".popover-content > *")[this.isHTML(content) ? "html" :"text"](content), 
$tip.removeClass("fade top bottom left right in");
},
hasContent:function() {
return this.getTitle() || this.getContent();
},
getContent:function() {
var content, $e = this.$element, o = this.options;
return content = $e.attr("data-content") || ("function" == typeof o.content ? o.content.call($e[0]) :o.content);
},
tip:function() {
return this.$tip || (this.$tip = $(this.options.template)), this.$tip;
}
}), $.fn.popover = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("popover"), options = "object" == typeof option && option;
data || $this.data("popover", data = new Popover(this, options)), "string" == typeof option && data[option]();
});
}, $.fn.popover.Constructor = Popover, $.fn.popover.defaults = $.extend({}, $.fn.tooltip.defaults, {
placement:"right",
content:"",
template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
});
}(window.jQuery), /* ==========================================================
 * bootstrap-alert.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
!function($) {
"use strict";
var dismiss = '[data-dismiss="alert"]', Alert = function(el) {
$(el).on("click", dismiss, this.close);
};
Alert.prototype.close = function(e) {
function removeElement() {
$parent.trigger("closed").remove();
}
var $parent, $this = $(this), selector = $this.attr("data-target");
selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")), 
$parent = $(selector), e && e.preventDefault(), $parent.length || ($parent = $this.hasClass("alert") ? $this :$this.parent()), 
$parent.trigger(e = $.Event("close")), e.isDefaultPrevented() || ($parent.removeClass("in"), 
$.support.transition && $parent.hasClass("fade") ? $parent.on($.support.transition.end, removeElement) :removeElement());
}, $.fn.alert = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("alert");
data || $this.data("alert", data = new Alert(this)), "string" == typeof option && data[option].call($this);
});
}, $.fn.alert.Constructor = Alert, $(function() {
$("body").on("click.alert.data-api", dismiss, Alert.prototype.close);
});
}(window.jQuery), /* ============================================================
 * bootstrap-button.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
!function($) {
"use strict";
var Button = function(element, options) {
this.$element = $(element), this.options = $.extend({}, $.fn.button.defaults, options);
};
Button.prototype.setState = function(state) {
var d = "disabled", $el = this.$element, data = $el.data(), val = $el.is("input") ? "val" :"html";
state += "Text", data.resetText || $el.data("resetText", $el[val]()), $el[val](data[state] || this.options[state]), 
setTimeout(function() {
"loadingText" == state ? $el.addClass(d).attr(d, d) :$el.removeClass(d).removeAttr(d);
}, 0);
}, Button.prototype.toggle = function() {
var $parent = this.$element.parent('[data-toggle="buttons-radio"]');
$parent && $parent.find(".active").removeClass("active"), this.$element.toggleClass("active");
}, $.fn.button = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("button"), options = "object" == typeof option && option;
data || $this.data("button", data = new Button(this, options)), "toggle" == option ? data.toggle() :option && data.setState(option);
});
}, $.fn.button.defaults = {
loadingText:"loading..."
}, $.fn.button.Constructor = Button, $(function() {
$("body").on("click.button.data-api", "[data-toggle^=button]", function(e) {
var $btn = $(e.target);
$btn.hasClass("btn") || ($btn = $btn.closest(".btn")), $btn.button("toggle");
});
});
}(window.jQuery), /* =============================================================
 * bootstrap-collapse.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
!function($) {
"use strict";
var Collapse = function(element, options) {
this.$element = $(element), this.options = $.extend({}, $.fn.collapse.defaults, options), 
this.options.parent && (this.$parent = $(this.options.parent)), this.options.toggle && this.toggle();
};
Collapse.prototype = {
constructor:Collapse,
dimension:function() {
var hasWidth = this.$element.hasClass("width");
return hasWidth ? "width" :"height";
},
show:function() {
var dimension, scroll, actives, hasData;
if (!this.transitioning) {
if (dimension = this.dimension(), scroll = $.camelCase([ "scroll", dimension ].join("-")), 
actives = this.$parent && this.$parent.find("> .accordion-group > .in"), actives && actives.length) {
if (hasData = actives.data("collapse"), hasData && hasData.transitioning) return;
actives.collapse("hide"), hasData || actives.data("collapse", null);
}
this.$element[dimension](0), this.transition("addClass", $.Event("show"), "shown"), 
this.$element[dimension](this.$element[0][scroll]);
}
},
hide:function() {
var dimension;
this.transitioning || (dimension = this.dimension(), this.reset(this.$element[dimension]()), 
this.transition("removeClass", $.Event("hide"), "hidden"), this.$element[dimension](0));
},
reset:function(size) {
var dimension = this.dimension();
return this.$element.removeClass("collapse")[dimension](size || "auto")[0].offsetWidth, 
this.$element[null !== size ? "addClass" :"removeClass"]("collapse"), this;
},
transition:function(method, startEvent, completeEvent) {
var that = this, complete = function() {
"show" == startEvent.type && that.reset(), that.transitioning = 0, that.$element.trigger(completeEvent);
};
this.$element.trigger(startEvent), startEvent.isDefaultPrevented() || (this.transitioning = 1, 
this.$element[method]("in"), $.support.transition && this.$element.hasClass("collapse") ? this.$element.one($.support.transition.end, complete) :complete());
},
toggle:function() {
this[this.$element.hasClass("in") ? "hide" :"show"]();
}
}, $.fn.collapse = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("collapse"), options = "object" == typeof option && option;
data || $this.data("collapse", data = new Collapse(this, options)), "string" == typeof option && data[option]();
});
}, $.fn.collapse.defaults = {
toggle:!0
}, $.fn.collapse.Constructor = Collapse, $(function() {
$("body").on("click.collapse.data-api", "[data-toggle=collapse]", function(e) {
var href, $this = $(this), target = $this.attr("data-target") || e.preventDefault() || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""), option = $(target).data("collapse") ? "toggle" :$this.data();
$(target).collapse(option);
});
});
}(window.jQuery), /* ==========================================================
 * bootstrap-carousel.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
!function($) {
"use strict";
var Carousel = function(element, options) {
this.$element = $(element), this.options = options, this.options.slide && this.slide(this.options.slide), 
"hover" == this.options.pause && this.$element.on("mouseenter", $.proxy(this.pause, this)).on("mouseleave", $.proxy(this.cycle, this));
};
Carousel.prototype = {
cycle:function(e) {
return e || (this.paused = !1), this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval)), 
this;
},
to:function(pos) {
var $active = this.$element.find(".active"), children = $active.parent().children(), activePos = children.index($active), that = this;
if (!(pos > children.length - 1 || 0 > pos)) return this.sliding ? this.$element.one("slid", function() {
that.to(pos);
}) :activePos == pos ? this.pause().cycle() :this.slide(pos > activePos ? "next" :"prev", $(children[pos]));
},
pause:function(e) {
return e || (this.paused = !0), clearInterval(this.interval), this.interval = null, 
this;
},
next:function() {
return this.sliding ? void 0 :this.slide("next");
},
prev:function() {
return this.sliding ? void 0 :this.slide("prev");
},
slide:function(type, next) {
var $active = this.$element.find(".active"), $next = next || $active[type](), isCycling = this.interval, direction = "next" == type ? "left" :"right", fallback = "next" == type ? "first" :"last", that = this, e = $.Event("slide");
if (this.sliding = !0, isCycling && this.pause(), $next = $next.length ? $next :this.$element.find(".item")[fallback](), 
!$next.hasClass("active")) {
if ($.support.transition && this.$element.hasClass("slide")) {
if (this.$element.trigger(e), e.isDefaultPrevented()) return;
$next.addClass(type), $next[0].offsetWidth, $active.addClass(direction), $next.addClass(direction), 
this.$element.one($.support.transition.end, function() {
$next.removeClass([ type, direction ].join(" ")).addClass("active"), $active.removeClass([ "active", direction ].join(" ")), 
that.sliding = !1, setTimeout(function() {
that.$element.trigger("slid");
}, 0);
});
} else {
if (this.$element.trigger(e), e.isDefaultPrevented()) return;
$active.removeClass("active"), $next.addClass("active"), this.sliding = !1, this.$element.trigger("slid");
}
return isCycling && this.cycle(), this;
}
}
}, $.fn.carousel = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("carousel"), options = $.extend({}, $.fn.carousel.defaults, "object" == typeof option && option);
data || $this.data("carousel", data = new Carousel(this, options)), "number" == typeof option ? data.to(option) :"string" == typeof option || (option = options.slide) ? data[option]() :options.interval && data.cycle();
});
}, $.fn.carousel.defaults = {
interval:5e3,
pause:"hover"
}, $.fn.carousel.Constructor = Carousel, $(function() {
$("body").on("click.carousel.data-api", "[data-slide]", function(e) {
var href, $this = $(this), $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "")), options = !$target.data("modal") && $.extend({}, $target.data(), $this.data());
$target.carousel(options), e.preventDefault();
});
});
}(window.jQuery), /* =============================================================
 * bootstrap-typeahead.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
!function($) {
"use strict";
var Typeahead = function(element, options) {
this.$element = $(element), this.options = $.extend({}, $.fn.typeahead.defaults, options), 
this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, 
this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, 
this.$menu = $(this.options.menu).appendTo("body"), this.source = this.options.source, 
this.shown = !1, this.listen();
};
Typeahead.prototype = {
constructor:Typeahead,
select:function() {
var val = this.$menu.find(".active").attr("data-value");
return this.$element.val(this.updater(val)).change(), this.hide();
},
updater:function(item) {
return item;
},
show:function() {
var pos = $.extend({}, this.$element.offset(), {
height:this.$element[0].offsetHeight
});
return this.$menu.css({
top:pos.top + pos.height,
left:pos.left
}), this.$menu.show(), this.shown = !0, this;
},
hide:function() {
return this.$menu.hide(), this.shown = !1, this;
},
lookup:function() {
var items, that = this;
return this.query = this.$element.val(), this.query ? (items = $.grep(this.source, function(item) {
return that.matcher(item);
}), items = this.sorter(items), items.length ? this.render(items.slice(0, this.options.items)).show() :this.shown ? this.hide() :this) :this.shown ? this.hide() :this;
},
matcher:function(item) {
return ~item.toLowerCase().indexOf(this.query.toLowerCase());
},
sorter:function(items) {
for (var item, beginswith = [], caseSensitive = [], caseInsensitive = []; item = items.shift(); ) item.toLowerCase().indexOf(this.query.toLowerCase()) ? ~item.indexOf(this.query) ? caseSensitive.push(item) :caseInsensitive.push(item) :beginswith.push(item);
return beginswith.concat(caseSensitive, caseInsensitive);
},
highlighter:function(item) {
var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
return item.replace(new RegExp("(" + query + ")", "ig"), function($1, match) {
return "<strong>" + match + "</strong>";
});
},
render:function(items) {
var that = this;
return items = $(items).map(function(i, item) {
return i = $(that.options.item).attr("data-value", item), i.find("a").html(that.highlighter(item)), 
i[0];
}), items.first().addClass("active"), this.$menu.html(items), this;
},
next:function() {
var active = this.$menu.find(".active").removeClass("active"), next = active.next();
next.length || (next = $(this.$menu.find("li")[0])), next.addClass("active");
},
prev:function() {
var active = this.$menu.find(".active").removeClass("active"), prev = active.prev();
prev.length || (prev = this.$menu.find("li").last()), prev.addClass("active");
},
listen:function() {
this.$element.on("blur", $.proxy(this.blur, this)).on("keypress", $.proxy(this.keypress, this)).on("keyup", $.proxy(this.keyup, this)), 
($.browser.webkit || $.browser.msie) && this.$element.on("keydown", $.proxy(this.keypress, this)), 
this.$menu.on("click", $.proxy(this.click, this)).on("mouseenter", "li", $.proxy(this.mouseenter, this));
},
keyup:function(e) {
switch (e.keyCode) {
case 40:
case 38:
break;

case 9:
case 13:
if (!this.shown) return;
this.select();
break;

case 27:
if (!this.shown) return;
this.hide();
break;

default:
this.lookup();
}
e.stopPropagation(), e.preventDefault();
},
keypress:function(e) {
if (this.shown) {
switch (e.keyCode) {
case 9:
case 13:
case 27:
e.preventDefault();
break;

case 38:
if ("keydown" != e.type) break;
e.preventDefault(), this.prev();
break;

case 40:
if ("keydown" != e.type) break;
e.preventDefault(), this.next();
}
e.stopPropagation();
}
},
blur:function() {
var that = this;
setTimeout(function() {
that.hide();
}, 150);
},
click:function(e) {
e.stopPropagation(), e.preventDefault(), this.select();
},
mouseenter:function(e) {
this.$menu.find(".active").removeClass("active"), $(e.currentTarget).addClass("active");
}
}, $.fn.typeahead = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("typeahead"), options = "object" == typeof option && option;
data || $this.data("typeahead", data = new Typeahead(this, options)), "string" == typeof option && data[option]();
});
}, $.fn.typeahead.defaults = {
source:[],
items:8,
menu:'<ul class="typeahead dropdown-menu"></ul>',
item:'<li><a href="#"></a></li>'
}, $.fn.typeahead.Constructor = Typeahead, $(function() {
$("body").on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(e) {
var $this = $(this);
$this.data("typeahead") || (e.preventDefault(), $this.typeahead($this.data()));
});
});
}(window.jQuery), /* =============================================================
 * bootstrap-typeahead.js v2.0.0
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
!function($) {
"use strict";
var Typeahead = function(element, options) {
this.$element = $(element), this.options = $.extend({}, $.fn.typeahead.defaults, options), 
this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, 
this.highlighter = this.options.highlighter || this.highlighter, this.$menu = $(this.options.menu).appendTo("body"), 
this.source = this.options.source, this.onselect = this.options.onselect, this.strings = !0, 
this.shown = !1, this.listen();
};
Typeahead.prototype = {
constructor:Typeahead,
select:function() {
var text, val = JSON.parse(this.$menu.find(".active").attr("data-value"));
return text = this.strings ? val :val[this.options.property], this.$element.val(text), 
"function" == typeof this.onselect && this.onselect(val), this.hide();
},
show:function() {
var pos = $.extend({}, this.$element.offset(), {
height:this.$element[0].offsetHeight
});
return this.$menu.css({
top:pos.top + pos.height,
left:pos.left
}), this.$menu.show(), this.shown = !0, this;
},
hide:function() {
return this.$menu.hide(), this.shown = !1, this;
},
lookup:function() {
var value;
this.query = this.$element.val(), "function" == typeof this.source ? (value = this.source(this, this.query), 
value && this.process(value)) :this.process(this.source);
},
process:function(results) {
var items, that = this;
return results.length && "string" != typeof results[0] && (this.strings = !1), this.query = this.$element.val(), 
this.query ? (items = $.grep(results, function(item) {
return that.strings || (item = item[that.options.property]), that.matcher(item) ? item :void 0;
}), items = this.sorter(items), items.length ? this.render(items.slice(0, this.options.items)).show() :this.shown ? this.hide() :this) :this.shown ? this.hide() :this;
},
matcher:function(item) {
return ~item.toLowerCase().indexOf(this.query.toLowerCase());
},
sorter:function(items) {
for (var item, sortby, beginswith = [], caseSensitive = [], caseInsensitive = []; item = items.shift(); ) sortby = this.strings ? item :item[this.options.property], 
sortby.toLowerCase().indexOf(this.query.toLowerCase()) ? ~sortby.indexOf(this.query) ? caseSensitive.push(item) :caseInsensitive.push(item) :beginswith.push(item);
return beginswith.concat(caseSensitive, caseInsensitive);
},
highlighter:function(item) {
return item.replace(new RegExp("(" + this.query + ")", "ig"), function($1, match) {
return "<strong>" + match + "</strong>";
});
},
render:function(items) {
var that = this;
return items = $(items).map(function(i, item) {
return i = $(that.options.item).attr("data-value", JSON.stringify(item)), that.strings || (item = item[that.options.property]), 
i.find("a").html(that.highlighter(item)), i[0];
}), items.first().addClass("active"), this.$menu.html(items), this;
},
next:function() {
var active = this.$menu.find(".active").removeClass("active"), next = active.next();
next.length || (next = $(this.$menu.find("li")[0])), next.addClass("active");
},
prev:function() {
var active = this.$menu.find(".active").removeClass("active"), prev = active.prev();
prev.length || (prev = this.$menu.find("li").last()), prev.addClass("active");
},
listen:function() {
this.$element.on("blur", $.proxy(this.blur, this)).on("keypress", $.proxy(this.keypress, this)).on("keyup", $.proxy(this.keyup, this)), 
($.browser.webkit || $.browser.msie) && this.$element.on("keydown", $.proxy(this.keypress, this)), 
this.$menu.on("click", $.proxy(this.click, this)).on("mouseenter", "li", $.proxy(this.mouseenter, this));
},
keyup:function(e) {
switch (e.stopPropagation(), e.preventDefault(), e.keyCode) {
case 40:
case 38:
break;

case 9:
case 13:
if (!this.shown) return;
this.select();
break;

case 27:
this.hide();
break;

default:
this.lookup();
}
},
keypress:function(e) {
if (e.stopPropagation(), this.shown) switch (e.keyCode) {
case 9:
case 13:
case 27:
e.preventDefault();
break;

case 38:
e.preventDefault(), this.prev();
break;

case 40:
e.preventDefault(), this.next();
}
},
blur:function(e) {
var that = this;
e.stopPropagation(), e.preventDefault(), setTimeout(function() {
that.hide();
}, 150);
},
click:function(e) {
e.stopPropagation(), e.preventDefault(), this.select();
},
mouseenter:function(e) {
this.$menu.find(".active").removeClass("active"), $(e.currentTarget).addClass("active");
}
}, $.fn.typeahead = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("typeahead"), options = "object" == typeof option && option;
data || $this.data("typeahead", data = new Typeahead(this, options)), "string" == typeof option && data[option]();
});
}, $.fn.typeahead.defaults = {
source:[],
items:8,
menu:'<ul class="typeahead dropdown-menu"></ul>',
item:'<li><a href="#"></a></li>',
onselect:null,
property:"value"
}, $.fn.typeahead.Constructor = Typeahead, $(function() {
$("body").on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(e) {
var $this = $(this);
$this.data("typeahead") || (e.preventDefault(), $this.typeahead($this.data()));
});
});
}(window.jQuery), function($) {
$.fn.completer = function(cat, data) {
data = $.extend({
source:function(typeahead, query) {
$.getJSON("/autocomplete", {
fq:"cat:" + cat,
q:query + "*"
}, function(resp) {
typeahead.process(_.map(resp.models, function(e) {
return e.name;
}));
});
},
matcher:function() {
return !0;
}
}, data), this.typeahead(data);
};
}(jQuery), function() {}.call(this), function(undefined) {
function padToken(func, count) {
return function(a) {
return leftZeroFill(func.call(this, a), count);
};
}
function ordinalizeToken(func, period) {
return function(a) {
return this.lang().ordinal(func.call(this, a), period);
};
}
function Language() {}
function Moment(config) {
checkOverflow(config), extend(this, config);
}
function Duration(duration) {
var normalizedInput = normalizeObjectUnits(duration), years = normalizedInput.year || 0, months = normalizedInput.month || 0, weeks = normalizedInput.week || 0, days = normalizedInput.day || 0, hours = normalizedInput.hour || 0, minutes = normalizedInput.minute || 0, seconds = normalizedInput.second || 0, milliseconds = normalizedInput.millisecond || 0;
this._input = duration, this._milliseconds = +milliseconds + 1e3 * seconds + 6e4 * minutes + 36e5 * hours, 
this._days = +days + 7 * weeks, this._months = +months + 12 * years, this._data = {}, 
this._bubble();
}
function extend(a, b) {
for (var i in b) b.hasOwnProperty(i) && (a[i] = b[i]);
return b.hasOwnProperty("toString") && (a.toString = b.toString), b.hasOwnProperty("valueOf") && (a.valueOf = b.valueOf), 
a;
}
function absRound(number) {
return 0 > number ? Math.ceil(number) :Math.floor(number);
}
function leftZeroFill(number, targetLength) {
for (var output = number + ""; output.length < targetLength; ) output = "0" + output;
return output;
}
function addOrSubtractDurationFromMoment(mom, duration, isAdding, ignoreUpdateOffset) {
var minutes, hours, milliseconds = duration._milliseconds, days = duration._days, months = duration._months;
milliseconds && mom._d.setTime(+mom._d + milliseconds * isAdding), (days || months) && (minutes = mom.minute(), 
hours = mom.hour()), days && mom.date(mom.date() + days * isAdding), months && mom.month(mom.month() + months * isAdding), 
milliseconds && !ignoreUpdateOffset && moment.updateOffset(mom), (days || months) && (mom.minute(minutes), 
mom.hour(hours));
}
function isArray(input) {
return "[object Array]" === Object.prototype.toString.call(input);
}
function isDate(input) {
return "[object Date]" === Object.prototype.toString.call(input) || input instanceof Date;
}
function compareArrays(array1, array2, dontConvert) {
var i, len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0;
for (i = 0; len > i; i++) (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) && diffs++;
return diffs + lengthDiff;
}
function normalizeUnits(units) {
if (units) {
var lowered = units.toLowerCase().replace(/(.)s$/, "$1");
units = unitAliases[units] || camelFunctions[lowered] || lowered;
}
return units;
}
function normalizeObjectUnits(inputObject) {
var normalizedProp, prop, normalizedInput = {};
for (prop in inputObject) inputObject.hasOwnProperty(prop) && (normalizedProp = normalizeUnits(prop), 
normalizedProp && (normalizedInput[normalizedProp] = inputObject[prop]));
return normalizedInput;
}
function makeList(field) {
var count, setter;
if (0 === field.indexOf("week")) count = 7, setter = "day"; else {
if (0 !== field.indexOf("month")) return;
count = 12, setter = "month";
}
moment[field] = function(format, index) {
var i, getter, method = moment.fn._lang[field], results = [];
if ("number" == typeof format && (index = format, format = undefined), getter = function(i) {
var m = moment().utc().set(setter, i);
return method.call(moment.fn._lang, m, format || "");
}, null != index) return getter(index);
for (i = 0; count > i; i++) results.push(getter(i));
return results;
};
}
function toInt(argumentForCoercion) {
var coercedNumber = +argumentForCoercion, value = 0;
return 0 !== coercedNumber && isFinite(coercedNumber) && (value = coercedNumber >= 0 ? Math.floor(coercedNumber) :Math.ceil(coercedNumber)), 
value;
}
function daysInMonth(year, month) {
return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}
function daysInYear(year) {
return isLeapYear(year) ? 366 :365;
}
function isLeapYear(year) {
return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function checkOverflow(m) {
var overflow;
m._a && -2 === m._pf.overflow && (overflow = m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :m._a[HOUR] < 0 || m._a[HOUR] > 23 ? HOUR :m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :-1, 
m._pf._overflowDayOfYear && (YEAR > overflow || overflow > DATE) && (overflow = DATE), 
m._pf.overflow = overflow);
}
function initializeParsingFlags(config) {
config._pf = {
empty:!1,
unusedTokens:[],
unusedInput:[],
overflow:-2,
charsLeftOver:0,
nullInput:!1,
invalidMonth:null,
invalidFormat:!1,
userInvalidated:!1,
iso:!1
};
}
function isValid(m) {
return null == m._isValid && (m._isValid = !isNaN(m._d.getTime()) && m._pf.overflow < 0 && !m._pf.empty && !m._pf.invalidMonth && !m._pf.nullInput && !m._pf.invalidFormat && !m._pf.userInvalidated, 
m._strict && (m._isValid = m._isValid && 0 === m._pf.charsLeftOver && 0 === m._pf.unusedTokens.length)), 
m._isValid;
}
function normalizeLanguage(key) {
return key ? key.toLowerCase().replace("_", "-") :key;
}
function loadLang(key, values) {
return values.abbr = key, languages[key] || (languages[key] = new Language()), languages[key].set(values), 
languages[key];
}
function unloadLang(key) {
delete languages[key];
}
function getLangDefinition(key) {
var j, lang, next, split, i = 0, get = function(k) {
if (!languages[k] && hasModule) try {
require("./lang/" + k);
} catch (e) {}
return languages[k];
};
if (!key) return moment.fn._lang;
if (!isArray(key)) {
if (lang = get(key)) return lang;
key = [ key ];
}
for (;i < key.length; ) {
for (split = normalizeLanguage(key[i]).split("-"), j = split.length, next = normalizeLanguage(key[i + 1]), 
next = next ? next.split("-") :null; j > 0; ) {
if (lang = get(split.slice(0, j).join("-"))) return lang;
if (next && next.length >= j && compareArrays(split, next, !0) >= j - 1) break;
j--;
}
i++;
}
return moment.fn._lang;
}
function removeFormattingTokens(input) {
return input.match(/\[[\s\S]/) ? input.replace(/^\[|\]$/g, "") :input.replace(/\\/g, "");
}
function makeFormatFunction(format) {
var i, length, array = format.match(formattingTokens);
for (i = 0, length = array.length; length > i; i++) array[i] = formatTokenFunctions[array[i]] ? formatTokenFunctions[array[i]] :removeFormattingTokens(array[i]);
return function(mom) {
var output = "";
for (i = 0; length > i; i++) output += array[i] instanceof Function ? array[i].call(mom, format) :array[i];
return output;
};
}
function formatMoment(m, format) {
return m.isValid() ? (format = expandFormat(format, m.lang()), formatFunctions[format] || (formatFunctions[format] = makeFormatFunction(format)), 
formatFunctions[format](m)) :m.lang().invalidDate();
}
function expandFormat(format, lang) {
function replaceLongDateFormatTokens(input) {
return lang.longDateFormat(input) || input;
}
var i = 5;
for (localFormattingTokens.lastIndex = 0; i >= 0 && localFormattingTokens.test(format); ) format = format.replace(localFormattingTokens, replaceLongDateFormatTokens), 
localFormattingTokens.lastIndex = 0, i -= 1;
return format;
}
function getParseRegexForToken(token, config) {
var a;
switch (token) {
case "DDDD":
return parseTokenThreeDigits;

case "YYYY":
case "GGGG":
case "gggg":
return parseTokenFourDigits;

case "YYYYY":
case "GGGGG":
case "ggggg":
return parseTokenSixDigits;

case "S":
case "SS":
case "SSS":
case "DDD":
return parseTokenOneToThreeDigits;

case "MMM":
case "MMMM":
case "dd":
case "ddd":
case "dddd":
return parseTokenWord;

case "a":
case "A":
return getLangDefinition(config._l)._meridiemParse;

case "X":
return parseTokenTimestampMs;

case "Z":
case "ZZ":
return parseTokenTimezone;

case "T":
return parseTokenT;

case "SSSS":
return parseTokenDigits;

case "MM":
case "DD":
case "YY":
case "GG":
case "gg":
case "HH":
case "hh":
case "mm":
case "ss":
case "M":
case "D":
case "d":
case "H":
case "h":
case "m":
case "s":
case "w":
case "ww":
case "W":
case "WW":
case "e":
case "E":
return parseTokenOneOrTwoDigits;

default:
return a = new RegExp(regexpEscape(unescapeFormat(token.replace("\\", "")), "i"));
}
}
function timezoneMinutesFromString(string) {
var tzchunk = (parseTokenTimezone.exec(string) || [])[0], parts = (tzchunk + "").match(parseTimezoneChunker) || [ "-", 0, 0 ], minutes = +(60 * parts[1]) + toInt(parts[2]);
return "+" === parts[0] ? -minutes :minutes;
}
function addTimeToArrayFromToken(token, input, config) {
var a, datePartArray = config._a;
switch (token) {
case "M":
case "MM":
null != input && (datePartArray[MONTH] = toInt(input) - 1);
break;

case "MMM":
case "MMMM":
a = getLangDefinition(config._l).monthsParse(input), null != a ? datePartArray[MONTH] = a :config._pf.invalidMonth = input;
break;

case "D":
case "DD":
null != input && (datePartArray[DATE] = toInt(input));
break;

case "DDD":
case "DDDD":
null != input && (config._dayOfYear = toInt(input));
break;

case "YY":
datePartArray[YEAR] = toInt(input) + (toInt(input) > 68 ? 1900 :2e3);
break;

case "YYYY":
case "YYYYY":
datePartArray[YEAR] = toInt(input);
break;

case "a":
case "A":
config._isPm = getLangDefinition(config._l).isPM(input);
break;

case "H":
case "HH":
case "h":
case "hh":
datePartArray[HOUR] = toInt(input);
break;

case "m":
case "mm":
datePartArray[MINUTE] = toInt(input);
break;

case "s":
case "ss":
datePartArray[SECOND] = toInt(input);
break;

case "S":
case "SS":
case "SSS":
case "SSSS":
datePartArray[MILLISECOND] = toInt(1e3 * ("0." + input));
break;

case "X":
config._d = new Date(1e3 * parseFloat(input));
break;

case "Z":
case "ZZ":
config._useUTC = !0, config._tzm = timezoneMinutesFromString(input);
break;

case "w":
case "ww":
case "W":
case "WW":
case "d":
case "dd":
case "ddd":
case "dddd":
case "e":
case "E":
token = token.substr(0, 1);

case "gg":
case "gggg":
case "GG":
case "GGGG":
case "GGGGG":
token = token.substr(0, 2), input && (config._w = config._w || {}, config._w[token] = input);
}
}
function dateFromConfig(config) {
var i, date, currentDate, yearToUse, fixYear, w, temp, lang, weekday, week, input = [];
if (!config._d) {
for (currentDate = currentDateArray(config), config._w && null == config._a[DATE] && null == config._a[MONTH] && (fixYear = function(val) {
return val ? val.length < 3 ? parseInt(val, 10) > 68 ? "19" + val :"20" + val :val :null == config._a[YEAR] ? moment().weekYear() :config._a[YEAR];
}, w = config._w, null != w.GG || null != w.W || null != w.E ? temp = dayOfYearFromWeeks(fixYear(w.GG), w.W || 1, w.E, 4, 1) :(lang = getLangDefinition(config._l), 
weekday = null != w.d ? parseWeekday(w.d, lang) :null != w.e ? parseInt(w.e, 10) + lang._week.dow :0, 
week = parseInt(w.w, 10) || 1, null != w.d && weekday < lang._week.dow && week++, 
temp = dayOfYearFromWeeks(fixYear(w.gg), week, weekday, lang._week.doy, lang._week.dow)), 
config._a[YEAR] = temp.year, config._dayOfYear = temp.dayOfYear), config._dayOfYear && (yearToUse = null == config._a[YEAR] ? currentDate[YEAR] :config._a[YEAR], 
config._dayOfYear > daysInYear(yearToUse) && (config._pf._overflowDayOfYear = !0), 
date = makeUTCDate(yearToUse, 0, config._dayOfYear), config._a[MONTH] = date.getUTCMonth(), 
config._a[DATE] = date.getUTCDate()), i = 0; 3 > i && null == config._a[i]; ++i) config._a[i] = input[i] = currentDate[i];
for (;7 > i; i++) config._a[i] = input[i] = null == config._a[i] ? 2 === i ? 1 :0 :config._a[i];
input[HOUR] += toInt((config._tzm || 0) / 60), input[MINUTE] += toInt((config._tzm || 0) % 60), 
config._d = (config._useUTC ? makeUTCDate :makeDate).apply(null, input);
}
}
function dateFromObject(config) {
var normalizedInput;
config._d || (normalizedInput = normalizeObjectUnits(config._i), config._a = [ normalizedInput.year, normalizedInput.month, normalizedInput.day, normalizedInput.hour, normalizedInput.minute, normalizedInput.second, normalizedInput.millisecond ], 
dateFromConfig(config));
}
function currentDateArray(config) {
var now = new Date();
return config._useUTC ? [ now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() ] :[ now.getFullYear(), now.getMonth(), now.getDate() ];
}
function makeDateFromStringAndFormat(config) {
config._a = [], config._pf.empty = !0;
var i, parsedInput, tokens, token, skipped, lang = getLangDefinition(config._l), string = "" + config._i, stringLength = string.length, totalParsedInputLength = 0;
for (tokens = expandFormat(config._f, lang).match(formattingTokens) || [], i = 0; i < tokens.length; i++) token = tokens[i], 
parsedInput = (getParseRegexForToken(token, config).exec(string) || [])[0], parsedInput && (skipped = string.substr(0, string.indexOf(parsedInput)), 
skipped.length > 0 && config._pf.unusedInput.push(skipped), string = string.slice(string.indexOf(parsedInput) + parsedInput.length), 
totalParsedInputLength += parsedInput.length), formatTokenFunctions[token] ? (parsedInput ? config._pf.empty = !1 :config._pf.unusedTokens.push(token), 
addTimeToArrayFromToken(token, parsedInput, config)) :config._strict && !parsedInput && config._pf.unusedTokens.push(token);
config._pf.charsLeftOver = stringLength - totalParsedInputLength, string.length > 0 && config._pf.unusedInput.push(string), 
config._isPm && config._a[HOUR] < 12 && (config._a[HOUR] += 12), config._isPm === !1 && 12 === config._a[HOUR] && (config._a[HOUR] = 0), 
dateFromConfig(config), checkOverflow(config);
}
function unescapeFormat(s) {
return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
return p1 || p2 || p3 || p4;
});
}
function regexpEscape(s) {
return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function makeDateFromStringAndArray(config) {
var tempConfig, bestMoment, scoreToBeat, i, currentScore;
if (0 === config._f.length) return config._pf.invalidFormat = !0, config._d = new Date(0/0), 
void 0;
for (i = 0; i < config._f.length; i++) currentScore = 0, tempConfig = extend({}, config), 
initializeParsingFlags(tempConfig), tempConfig._f = config._f[i], makeDateFromStringAndFormat(tempConfig), 
isValid(tempConfig) && (currentScore += tempConfig._pf.charsLeftOver, currentScore += 10 * tempConfig._pf.unusedTokens.length, 
tempConfig._pf.score = currentScore, (null == scoreToBeat || scoreToBeat > currentScore) && (scoreToBeat = currentScore, 
bestMoment = tempConfig));
extend(config, bestMoment || tempConfig);
}
function makeDateFromString(config) {
var i, string = config._i, match = isoRegex.exec(string);
if (match) {
for (config._pf.iso = !0, i = 4; i > 0; i--) if (match[i]) {
config._f = isoDates[i - 1] + (match[6] || " ");
break;
}
for (i = 0; 4 > i; i++) if (isoTimes[i][1].exec(string)) {
config._f += isoTimes[i][0];
break;
}
parseTokenTimezone.exec(string) && (config._f += "Z"), makeDateFromStringAndFormat(config);
} else config._d = new Date(string);
}
function makeDateFromInput(config) {
var input = config._i, matched = aspNetJsonRegex.exec(input);
input === undefined ? config._d = new Date() :matched ? config._d = new Date(+matched[1]) :"string" == typeof input ? makeDateFromString(config) :isArray(input) ? (config._a = input.slice(0), 
dateFromConfig(config)) :isDate(input) ? config._d = new Date(+input) :"object" == typeof input ? dateFromObject(config) :config._d = new Date(input);
}
function makeDate(y, m, d, h, M, s, ms) {
var date = new Date(y, m, d, h, M, s, ms);
return 1970 > y && date.setFullYear(y), date;
}
function makeUTCDate(y) {
var date = new Date(Date.UTC.apply(null, arguments));
return 1970 > y && date.setUTCFullYear(y), date;
}
function parseWeekday(input, language) {
if ("string" == typeof input) if (isNaN(input)) {
if (input = language.weekdaysParse(input), "number" != typeof input) return null;
} else input = parseInt(input, 10);
return input;
}
function substituteTimeAgo(string, number, withoutSuffix, isFuture, lang) {
return lang.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}
function relativeTime(milliseconds, withoutSuffix, lang) {
var seconds = round(Math.abs(milliseconds) / 1e3), minutes = round(seconds / 60), hours = round(minutes / 60), days = round(hours / 24), years = round(days / 365), args = 45 > seconds && [ "s", seconds ] || 1 === minutes && [ "m" ] || 45 > minutes && [ "mm", minutes ] || 1 === hours && [ "h" ] || 22 > hours && [ "hh", hours ] || 1 === days && [ "d" ] || 25 >= days && [ "dd", days ] || 45 >= days && [ "M" ] || 345 > days && [ "MM", round(days / 30) ] || 1 === years && [ "y" ] || [ "yy", years ];
return args[2] = withoutSuffix, args[3] = milliseconds > 0, args[4] = lang, substituteTimeAgo.apply({}, args);
}
function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
var adjustedMoment, end = firstDayOfWeekOfYear - firstDayOfWeek, daysToDayOfWeek = firstDayOfWeekOfYear - mom.day();
return daysToDayOfWeek > end && (daysToDayOfWeek -= 7), end - 7 > daysToDayOfWeek && (daysToDayOfWeek += 7), 
adjustedMoment = moment(mom).add("d", daysToDayOfWeek), {
week:Math.ceil(adjustedMoment.dayOfYear() / 7),
year:adjustedMoment.year()
};
}
function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
var daysToAdd, dayOfYear, d = new Date(Date.UTC(year, 0)).getUTCDay();
return weekday = null != weekday ? weekday :firstDayOfWeek, daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 :0), 
dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1, {
year:dayOfYear > 0 ? year :year - 1,
dayOfYear:dayOfYear > 0 ? dayOfYear :daysInYear(year - 1) + dayOfYear
};
}
function makeMoment(config) {
var input = config._i, format = config._f;
return "undefined" == typeof config._pf && initializeParsingFlags(config), null === input ? moment.invalid({
nullInput:!0
}) :("string" == typeof input && (config._i = input = getLangDefinition().preparse(input)), 
moment.isMoment(input) ? (config = extend({}, input), config._d = new Date(+input._d)) :format ? isArray(format) ? makeDateFromStringAndArray(config) :makeDateFromStringAndFormat(config) :makeDateFromInput(config), 
new Moment(config));
}
function makeGetterAndSetter(name, key) {
moment.fn[name] = moment.fn[name + "s"] = function(input) {
var utc = this._isUTC ? "UTC" :"";
return null != input ? (this._d["set" + utc + key](input), moment.updateOffset(this), 
this) :this._d["get" + utc + key]();
};
}
function makeDurationGetter(name) {
moment.duration.fn[name] = function() {
return this._data[name];
};
}
function makeDurationAsGetter(name, factor) {
moment.duration.fn["as" + name] = function() {
return +this / factor;
};
}
function makeGlobal(deprecate) {
var warned = !1, local_moment = moment;
"undefined" == typeof ender && (this.moment = deprecate ? function() {
return !warned && console && console.warn && (warned = !0, console.warn("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.")), 
local_moment.apply(null, arguments);
} :moment);
}
for (var moment, i, VERSION = "2.4.0", round = Math.round, YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, languages = {}, hasModule = "undefined" != typeof module && module.exports, aspNetJsonRegex = /^\/?Date\((\-?\d+)/i, aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, parseTokenOneOrTwoDigits = /\d\d?/, parseTokenOneToThreeDigits = /\d{1,3}/, parseTokenThreeDigits = /\d{3}/, parseTokenFourDigits = /\d{1,4}/, parseTokenSixDigits = /[+\-]?\d{1,6}/, parseTokenDigits = /\d+/, parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/i, parseTokenT = /T/i, parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, isoRegex = /^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d:?\d\d|Z)?)?$/, isoFormat = "YYYY-MM-DDTHH:mm:ssZ", isoDates = [ "YYYY-MM-DD", "GGGG-[W]WW", "GGGG-[W]WW-E", "YYYY-DDD" ], isoTimes = [ [ "HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/ ], [ "HH:mm:ss", /(T| )\d\d:\d\d:\d\d/ ], [ "HH:mm", /(T| )\d\d:\d\d/ ], [ "HH", /(T| )\d\d/ ] ], parseTimezoneChunker = /([\+\-]|\d\d)/gi, proxyGettersAndSetters = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"), unitMillisecondFactors = {
Milliseconds:1,
Seconds:1e3,
Minutes:6e4,
Hours:36e5,
Days:864e5,
Months:2592e6,
Years:31536e6
}, unitAliases = {
ms:"millisecond",
s:"second",
m:"minute",
h:"hour",
d:"day",
D:"date",
w:"week",
W:"isoWeek",
M:"month",
y:"year",
DDD:"dayOfYear",
e:"weekday",
E:"isoWeekday",
gg:"weekYear",
GG:"isoWeekYear"
}, camelFunctions = {
dayofyear:"dayOfYear",
isoweekday:"isoWeekday",
isoweek:"isoWeek",
weekyear:"weekYear",
isoweekyear:"isoWeekYear"
}, formatFunctions = {}, ordinalizeTokens = "DDD w W M D d".split(" "), paddedTokens = "M D H h m s w W".split(" "), formatTokenFunctions = {
M:function() {
return this.month() + 1;
},
MMM:function(format) {
return this.lang().monthsShort(this, format);
},
MMMM:function(format) {
return this.lang().months(this, format);
},
D:function() {
return this.date();
},
DDD:function() {
return this.dayOfYear();
},
d:function() {
return this.day();
},
dd:function(format) {
return this.lang().weekdaysMin(this, format);
},
ddd:function(format) {
return this.lang().weekdaysShort(this, format);
},
dddd:function(format) {
return this.lang().weekdays(this, format);
},
w:function() {
return this.week();
},
W:function() {
return this.isoWeek();
},
YY:function() {
return leftZeroFill(this.year() % 100, 2);
},
YYYY:function() {
return leftZeroFill(this.year(), 4);
},
YYYYY:function() {
return leftZeroFill(this.year(), 5);
},
gg:function() {
return leftZeroFill(this.weekYear() % 100, 2);
},
gggg:function() {
return this.weekYear();
},
ggggg:function() {
return leftZeroFill(this.weekYear(), 5);
},
GG:function() {
return leftZeroFill(this.isoWeekYear() % 100, 2);
},
GGGG:function() {
return this.isoWeekYear();
},
GGGGG:function() {
return leftZeroFill(this.isoWeekYear(), 5);
},
e:function() {
return this.weekday();
},
E:function() {
return this.isoWeekday();
},
a:function() {
return this.lang().meridiem(this.hours(), this.minutes(), !0);
},
A:function() {
return this.lang().meridiem(this.hours(), this.minutes(), !1);
},
H:function() {
return this.hours();
},
h:function() {
return this.hours() % 12 || 12;
},
m:function() {
return this.minutes();
},
s:function() {
return this.seconds();
},
S:function() {
return toInt(this.milliseconds() / 100);
},
SS:function() {
return leftZeroFill(toInt(this.milliseconds() / 10), 2);
},
SSS:function() {
return leftZeroFill(this.milliseconds(), 3);
},
SSSS:function() {
return leftZeroFill(this.milliseconds(), 3);
},
Z:function() {
var a = -this.zone(), b = "+";
return 0 > a && (a = -a, b = "-"), b + leftZeroFill(toInt(a / 60), 2) + ":" + leftZeroFill(toInt(a) % 60, 2);
},
ZZ:function() {
var a = -this.zone(), b = "+";
return 0 > a && (a = -a, b = "-"), b + leftZeroFill(toInt(10 * a / 6), 4);
},
z:function() {
return this.zoneAbbr();
},
zz:function() {
return this.zoneName();
},
X:function() {
return this.unix();
}
}, lists = [ "months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin" ]; ordinalizeTokens.length; ) i = ordinalizeTokens.pop(), 
formatTokenFunctions[i + "o"] = ordinalizeToken(formatTokenFunctions[i], i);
for (;paddedTokens.length; ) i = paddedTokens.pop(), formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
for (formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3), extend(Language.prototype, {
set:function(config) {
var prop, i;
for (i in config) prop = config[i], "function" == typeof prop ? this[i] = prop :this["_" + i] = prop;
},
_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
months:function(m) {
return this._months[m.month()];
},
_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
monthsShort:function(m) {
return this._monthsShort[m.month()];
},
monthsParse:function(monthName) {
var i, mom, regex;
for (this._monthsParse || (this._monthsParse = []), i = 0; 12 > i; i++) if (this._monthsParse[i] || (mom = moment.utc([ 2e3, i ]), 
regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, ""), this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i")), 
this._monthsParse[i].test(monthName)) return i;
},
_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
weekdays:function(m) {
return this._weekdays[m.day()];
},
_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
weekdaysShort:function(m) {
return this._weekdaysShort[m.day()];
},
_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
weekdaysMin:function(m) {
return this._weekdaysMin[m.day()];
},
weekdaysParse:function(weekdayName) {
var i, mom, regex;
for (this._weekdaysParse || (this._weekdaysParse = []), i = 0; 7 > i; i++) if (this._weekdaysParse[i] || (mom = moment([ 2e3, 1 ]).day(i), 
regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, ""), 
this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i")), this._weekdaysParse[i].test(weekdayName)) return i;
},
_longDateFormat:{
LT:"h:mm A",
L:"MM/DD/YYYY",
LL:"MMMM D YYYY",
LLL:"MMMM D YYYY LT",
LLLL:"dddd, MMMM D YYYY LT"
},
longDateFormat:function(key) {
var output = this._longDateFormat[key];
return !output && this._longDateFormat[key.toUpperCase()] && (output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(val) {
return val.slice(1);
}), this._longDateFormat[key] = output), output;
},
isPM:function(input) {
return "p" === (input + "").toLowerCase().charAt(0);
},
_meridiemParse:/[ap]\.?m?\.?/i,
meridiem:function(hours, minutes, isLower) {
return hours > 11 ? isLower ? "pm" :"PM" :isLower ? "am" :"AM";
},
_calendar:{
sameDay:"[Today at] LT",
nextDay:"[Tomorrow at] LT",
nextWeek:"dddd [at] LT",
lastDay:"[Yesterday at] LT",
lastWeek:"[Last] dddd [at] LT",
sameElse:"L"
},
calendar:function(key, mom) {
var output = this._calendar[key];
return "function" == typeof output ? output.apply(mom) :output;
},
_relativeTime:{
future:"in %s",
past:"%s ago",
s:"a few seconds",
m:"a minute",
mm:"%d minutes",
h:"an hour",
hh:"%d hours",
d:"a day",
dd:"%d days",
M:"a month",
MM:"%d months",
y:"a year",
yy:"%d years"
},
relativeTime:function(number, withoutSuffix, string, isFuture) {
var output = this._relativeTime[string];
return "function" == typeof output ? output(number, withoutSuffix, string, isFuture) :output.replace(/%d/i, number);
},
pastFuture:function(diff, output) {
var format = this._relativeTime[diff > 0 ? "future" :"past"];
return "function" == typeof format ? format(output) :format.replace(/%s/i, output);
},
ordinal:function(number) {
return this._ordinal.replace("%d", number);
},
_ordinal:"%d",
preparse:function(string) {
return string;
},
postformat:function(string) {
return string;
},
week:function(mom) {
return weekOfYear(mom, this._week.dow, this._week.doy).week;
},
_week:{
dow:0,
doy:6
},
_invalidDate:"Invalid date",
invalidDate:function() {
return this._invalidDate;
}
}), moment = function(input, format, lang, strict) {
return "boolean" == typeof lang && (strict = lang, lang = undefined), makeMoment({
_i:input,
_f:format,
_l:lang,
_strict:strict,
_isUTC:!1
});
}, moment.utc = function(input, format, lang, strict) {
var m;
return "boolean" == typeof lang && (strict = lang, lang = undefined), m = makeMoment({
_useUTC:!0,
_isUTC:!0,
_l:lang,
_i:input,
_f:format,
_strict:strict
}).utc();
}, moment.unix = function(input) {
return moment(1e3 * input);
}, moment.duration = function(input, key) {
var sign, ret, parseIso, isDuration = moment.isDuration(input), isNumber = "number" == typeof input, duration = isDuration ? input._input :isNumber ? {} :input, match = null;
return isNumber ? key ? duration[key] = input :duration.milliseconds = input :(match = aspNetTimeSpanJsonRegex.exec(input)) ? (sign = "-" === match[1] ? -1 :1, 
duration = {
y:0,
d:toInt(match[DATE]) * sign,
h:toInt(match[HOUR]) * sign,
m:toInt(match[MINUTE]) * sign,
s:toInt(match[SECOND]) * sign,
ms:toInt(match[MILLISECOND]) * sign
}) :(match = isoDurationRegex.exec(input)) && (sign = "-" === match[1] ? -1 :1, 
parseIso = function(inp) {
var res = inp && parseFloat(inp.replace(",", "."));
return (isNaN(res) ? 0 :res) * sign;
}, duration = {
y:parseIso(match[2]),
M:parseIso(match[3]),
d:parseIso(match[4]),
h:parseIso(match[5]),
m:parseIso(match[6]),
s:parseIso(match[7]),
w:parseIso(match[8])
}), ret = new Duration(duration), isDuration && input.hasOwnProperty("_lang") && (ret._lang = input._lang), 
ret;
}, moment.version = VERSION, moment.defaultFormat = isoFormat, moment.updateOffset = function() {}, 
moment.lang = function(key, values) {
var r;
return key ? (values ? loadLang(normalizeLanguage(key), values) :null === values ? (unloadLang(key), 
key = "en") :languages[key] || getLangDefinition(key), r = moment.duration.fn._lang = moment.fn._lang = getLangDefinition(key), 
r._abbr) :moment.fn._lang._abbr;
}, moment.langData = function(key) {
return key && key._lang && key._lang._abbr && (key = key._lang._abbr), getLangDefinition(key);
}, moment.isMoment = function(obj) {
return obj instanceof Moment;
}, moment.isDuration = function(obj) {
return obj instanceof Duration;
}, i = lists.length - 1; i >= 0; --i) makeList(lists[i]);
for (moment.normalizeUnits = function(units) {
return normalizeUnits(units);
}, moment.invalid = function(flags) {
var m = moment.utc(0/0);
return null != flags ? extend(m._pf, flags) :m._pf.userInvalidated = !0, m;
}, moment.parseZone = function(input) {
return moment(input).parseZone();
}, extend(moment.fn = Moment.prototype, {
clone:function() {
return moment(this);
},
valueOf:function() {
return +this._d + 6e4 * (this._offset || 0);
},
unix:function() {
return Math.floor(+this / 1e3);
},
toString:function() {
return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
},
toDate:function() {
return this._offset ? new Date(+this) :this._d;
},
toISOString:function() {
return formatMoment(moment(this).utc(), "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
},
toArray:function() {
var m = this;
return [ m.year(), m.month(), m.date(), m.hours(), m.minutes(), m.seconds(), m.milliseconds() ];
},
isValid:function() {
return isValid(this);
},
isDSTShifted:function() {
return this._a ? this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) :moment(this._a)).toArray()) > 0 :!1;
},
parsingFlags:function() {
return extend({}, this._pf);
},
invalidAt:function() {
return this._pf.overflow;
},
utc:function() {
return this.zone(0);
},
local:function() {
return this.zone(0), this._isUTC = !1, this;
},
format:function(inputString) {
var output = formatMoment(this, inputString || moment.defaultFormat);
return this.lang().postformat(output);
},
add:function(input, val) {
var dur;
return dur = "string" == typeof input ? moment.duration(+val, input) :moment.duration(input, val), 
addOrSubtractDurationFromMoment(this, dur, 1), this;
},
subtract:function(input, val) {
var dur;
return dur = "string" == typeof input ? moment.duration(+val, input) :moment.duration(input, val), 
addOrSubtractDurationFromMoment(this, dur, -1), this;
},
diff:function(input, units, asFloat) {
var diff, output, that = this._isUTC ? moment(input).zone(this._offset || 0) :moment(input).local(), zoneDiff = 6e4 * (this.zone() - that.zone());
return units = normalizeUnits(units), "year" === units || "month" === units ? (diff = 432e5 * (this.daysInMonth() + that.daysInMonth()), 
output = 12 * (this.year() - that.year()) + (this.month() - that.month()), output += (this - moment(this).startOf("month") - (that - moment(that).startOf("month"))) / diff, 
output -= 6e4 * (this.zone() - moment(this).startOf("month").zone() - (that.zone() - moment(that).startOf("month").zone())) / diff, 
"year" === units && (output /= 12)) :(diff = this - that, output = "second" === units ? diff / 1e3 :"minute" === units ? diff / 6e4 :"hour" === units ? diff / 36e5 :"day" === units ? (diff - zoneDiff) / 864e5 :"week" === units ? (diff - zoneDiff) / 6048e5 :diff), 
asFloat ? output :absRound(output);
},
from:function(time, withoutSuffix) {
return moment.duration(this.diff(time)).lang(this.lang()._abbr).humanize(!withoutSuffix);
},
fromNow:function(withoutSuffix) {
return this.from(moment(), withoutSuffix);
},
calendar:function() {
var diff = this.diff(moment().zone(this.zone()).startOf("day"), "days", !0), format = -6 > diff ? "sameElse" :-1 > diff ? "lastWeek" :0 > diff ? "lastDay" :1 > diff ? "sameDay" :2 > diff ? "nextDay" :7 > diff ? "nextWeek" :"sameElse";
return this.format(this.lang().calendar(format, this));
},
isLeapYear:function() {
return isLeapYear(this.year());
},
isDST:function() {
return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone();
},
day:function(input) {
var day = this._isUTC ? this._d.getUTCDay() :this._d.getDay();
return null != input ? (input = parseWeekday(input, this.lang()), this.add({
d:input - day
})) :day;
},
month:function(input) {
var dayOfMonth, utc = this._isUTC ? "UTC" :"";
return null != input ? "string" == typeof input && (input = this.lang().monthsParse(input), 
"number" != typeof input) ? this :(dayOfMonth = this.date(), this.date(1), this._d["set" + utc + "Month"](input), 
this.date(Math.min(dayOfMonth, this.daysInMonth())), moment.updateOffset(this), 
this) :this._d["get" + utc + "Month"]();
},
startOf:function(units) {
switch (units = normalizeUnits(units)) {
case "year":
this.month(0);

case "month":
this.date(1);

case "week":
case "isoWeek":
case "day":
this.hours(0);

case "hour":
this.minutes(0);

case "minute":
this.seconds(0);

case "second":
this.milliseconds(0);
}
return "week" === units ? this.weekday(0) :"isoWeek" === units && this.isoWeekday(1), 
this;
},
endOf:function(units) {
return units = normalizeUnits(units), this.startOf(units).add("isoWeek" === units ? "week" :units, 1).subtract("ms", 1);
},
isAfter:function(input, units) {
return units = "undefined" != typeof units ? units :"millisecond", +this.clone().startOf(units) > +moment(input).startOf(units);
},
isBefore:function(input, units) {
return units = "undefined" != typeof units ? units :"millisecond", +this.clone().startOf(units) < +moment(input).startOf(units);
},
isSame:function(input, units) {
return units = "undefined" != typeof units ? units :"millisecond", +this.clone().startOf(units) === +moment(input).startOf(units);
},
min:function(other) {
return other = moment.apply(null, arguments), this > other ? this :other;
},
max:function(other) {
return other = moment.apply(null, arguments), other > this ? this :other;
},
zone:function(input) {
var offset = this._offset || 0;
return null == input ? this._isUTC ? offset :this._d.getTimezoneOffset() :("string" == typeof input && (input = timezoneMinutesFromString(input)), 
Math.abs(input) < 16 && (input = 60 * input), this._offset = input, this._isUTC = !0, 
offset !== input && addOrSubtractDurationFromMoment(this, moment.duration(offset - input, "m"), 1, !0), 
this);
},
zoneAbbr:function() {
return this._isUTC ? "UTC" :"";
},
zoneName:function() {
return this._isUTC ? "Coordinated Universal Time" :"";
},
parseZone:function() {
return "string" == typeof this._i && this.zone(this._i), this;
},
hasAlignedHourOffset:function(input) {
return input = input ? moment(input).zone() :0, (this.zone() - input) % 60 === 0;
},
daysInMonth:function() {
return daysInMonth(this.year(), this.month());
},
dayOfYear:function(input) {
var dayOfYear = round((moment(this).startOf("day") - moment(this).startOf("year")) / 864e5) + 1;
return null == input ? dayOfYear :this.add("d", input - dayOfYear);
},
weekYear:function(input) {
var year = weekOfYear(this, this.lang()._week.dow, this.lang()._week.doy).year;
return null == input ? year :this.add("y", input - year);
},
isoWeekYear:function(input) {
var year = weekOfYear(this, 1, 4).year;
return null == input ? year :this.add("y", input - year);
},
week:function(input) {
var week = this.lang().week(this);
return null == input ? week :this.add("d", 7 * (input - week));
},
isoWeek:function(input) {
var week = weekOfYear(this, 1, 4).week;
return null == input ? week :this.add("d", 7 * (input - week));
},
weekday:function(input) {
var weekday = (this.day() + 7 - this.lang()._week.dow) % 7;
return null == input ? weekday :this.add("d", input - weekday);
},
isoWeekday:function(input) {
return null == input ? this.day() || 7 :this.day(this.day() % 7 ? input :input - 7);
},
get:function(units) {
return units = normalizeUnits(units), this[units]();
},
set:function(units, value) {
return units = normalizeUnits(units), "function" == typeof this[units] && this[units](value), 
this;
},
lang:function(key) {
return key === undefined ? this._lang :(this._lang = getLangDefinition(key), this);
}
}), i = 0; i < proxyGettersAndSetters.length; i++) makeGetterAndSetter(proxyGettersAndSetters[i].toLowerCase().replace(/s$/, ""), proxyGettersAndSetters[i]);
makeGetterAndSetter("year", "FullYear"), moment.fn.days = moment.fn.day, moment.fn.months = moment.fn.month, 
moment.fn.weeks = moment.fn.week, moment.fn.isoWeeks = moment.fn.isoWeek, moment.fn.toJSON = moment.fn.toISOString, 
extend(moment.duration.fn = Duration.prototype, {
_bubble:function() {
var seconds, minutes, hours, years, milliseconds = this._milliseconds, days = this._days, months = this._months, data = this._data;
data.milliseconds = milliseconds % 1e3, seconds = absRound(milliseconds / 1e3), 
data.seconds = seconds % 60, minutes = absRound(seconds / 60), data.minutes = minutes % 60, 
hours = absRound(minutes / 60), data.hours = hours % 24, days += absRound(hours / 24), 
data.days = days % 30, months += absRound(days / 30), data.months = months % 12, 
years = absRound(months / 12), data.years = years;
},
weeks:function() {
return absRound(this.days() / 7);
},
valueOf:function() {
return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * toInt(this._months / 12);
},
humanize:function(withSuffix) {
var difference = +this, output = relativeTime(difference, !withSuffix, this.lang());
return withSuffix && (output = this.lang().pastFuture(difference, output)), this.lang().postformat(output);
},
add:function(input, val) {
var dur = moment.duration(input, val);
return this._milliseconds += dur._milliseconds, this._days += dur._days, this._months += dur._months, 
this._bubble(), this;
},
subtract:function(input, val) {
var dur = moment.duration(input, val);
return this._milliseconds -= dur._milliseconds, this._days -= dur._days, this._months -= dur._months, 
this._bubble(), this;
},
get:function(units) {
return units = normalizeUnits(units), this[units.toLowerCase() + "s"]();
},
as:function(units) {
return units = normalizeUnits(units), this["as" + units.charAt(0).toUpperCase() + units.slice(1) + "s"]();
},
lang:moment.fn.lang,
toIsoString:function() {
var years = Math.abs(this.years()), months = Math.abs(this.months()), days = Math.abs(this.days()), hours = Math.abs(this.hours()), minutes = Math.abs(this.minutes()), seconds = Math.abs(this.seconds() + this.milliseconds() / 1e3);
return this.asSeconds() ? (this.asSeconds() < 0 ? "-" :"") + "P" + (years ? years + "Y" :"") + (months ? months + "M" :"") + (days ? days + "D" :"") + (hours || minutes || seconds ? "T" :"") + (hours ? hours + "H" :"") + (minutes ? minutes + "M" :"") + (seconds ? seconds + "S" :"") :"P0D";
}
});
for (i in unitMillisecondFactors) unitMillisecondFactors.hasOwnProperty(i) && (makeDurationAsGetter(i, unitMillisecondFactors[i]), 
makeDurationGetter(i.toLowerCase()));
makeDurationAsGetter("Weeks", 6048e5), moment.duration.fn.asMonths = function() {
return (+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years();
}, moment.lang("en", {
ordinal:function(number) {
var b = number % 10, output = 1 === toInt(number % 100 / 10) ? "th" :1 === b ? "st" :2 === b ? "nd" :3 === b ? "rd" :"th";
return number + output;
}
}), hasModule ? (module.exports = moment, makeGlobal(!0)) :"function" == typeof define && define.amd ? define("moment", function(require, exports, module) {
return module.config().noGlobal !== !0 && makeGlobal(module.config().noGlobal === undefined), 
moment;
}) :makeGlobal();
}.call(this), function($) {
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