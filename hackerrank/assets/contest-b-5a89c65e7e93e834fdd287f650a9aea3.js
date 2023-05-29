(function() {
var __indexOf = [].indexOf || function(item) {
for (var i = 0, l = this.length; l > i; i++) if (i in this && this[i] === item) return i;
return -1;
};
jQuery(function() {
var ALLOWED_EXTENDED_ATTRIBUTES, Base64, HR, ajaxmsg, bindFormEvents, closeSuccessStatus, countdownTimer, date_get12hour_hour, date_get12hour_offset, date_getMon, date_getMonth, error_html, formData, formatTimeInUserTz, genFormHTML, genModContainer, getDateFromEpoch, getEpochTimeStampFromDateTime, getErrorList, getRemainingTime, htmlDecode, htmlEncode, initializeTimers, inlineLoadingEnd, inlineLoadingStart, mp_ping, numberSuffix, padZeros, pagination, removeAllInlineThrobbers, renderBreadCrumbs, scrollToBottom, scrollToTop, semiFix, setTab, showInlineSuccess, showLoginError, slugify, sortNumbers, splitDate, successStatus, timezone_abbr, trim, uploadDialog, validate_date, validate_time, _addExtendedAttributes, _encType, _ref;
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
}, formatTimeInUserTz = function(time, format) {
var timezone;
return null == format && (format = null), timezone = HR.currentUser.get("timezone"), 
time = moment(time), timezone && (time = time.tz(timezone)), time.format(format);
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
return this.remove();
}) :$(HR.loadingButton).siblings(".inline-throbber").remove();
}, showInlineSuccess = function(view, element, time) {
var html;
return null == time && (time = 1e3), html = '<span class="inline-throbber success"> <i class="icon2-status_correct txt-green throbber-success"></i> </span>', 
setTimeout(function() {
return $(html).insertAfter(element).fadeIn("Normal"), HR.loadingButton = element;
}), setTimeout(function() {
return HR.util.removeAllInlineThrobbers(!0);
}, time);
}, HR = null != (_ref = window.HR) ? _ref :{}, HR.util || (HR.util = {}), HR.util.log = Backbone.log, 
HR.util.pagination = pagination, HR.util.trim = trim, HR.util.formatTimeInUserTz = formatTimeInUserTz, 
HR.util.ajaxmsg = ajaxmsg, HR.util.initializeTimers = initializeTimers, HR.util.semiFix = semiFix, 
HR.util.uploadDialog = uploadDialog, HR.util.padZeros = padZeros, HR.util.mp_ping = mp_ping, 
HR.util.Base64 = Base64, HR.util.numberSuffix = numberSuffix, HR.util.showLoginError = showLoginError, 
HR.util.successStatus = successStatus, HR.util.closeSuccessStatus = closeSuccessStatus, 
HR.util.htmlEncode = htmlEncode, HR.util.htmlDecode = htmlDecode, HR.util.setTab = setTab, 
HR.util.countdownTimer = countdownTimer, HR.util.genFormHTML = genFormHTML, HR.util.bindFormEvents = bindFormEvents, 
HR.util.sortNumbers = sortNumbers, HR.util.formData = formData, HR.util.scrollToTop = scrollToTop, 
HR.util.scrollToBottom = scrollToBottom, HR.util.renderBreadCrumbs = renderBreadCrumbs, 
HR.util.slugify = slugify, HR.util.getRemainingTime = getRemainingTime, HR.util.timezone_abbr = timezone_abbr, 
HR.util.date_getMon = date_getMon, HR.util.date_getMonth = date_getMonth, HR.util.date_get12hour_hour = date_get12hour_hour, 
HR.util.date_get12hour_offset = date_get12hour_offset, HR.util.validate_time = validate_time, 
HR.util.validate_date = validate_date, HR.util.getEpochTimeStampFromDateTime = getEpochTimeStampFromDateTime, 
HR.util.getErrorList = getErrorList, HR.util.getDateFromEpoch = getDateFromEpoch, 
HR.util.splitDate = splitDate, HR.util.genModContainer = genModContainer, HR.util.error_html = error_html, 
HR.util.inlineLoadingStart = inlineLoadingStart, HR.util.inlineLoadingEnd = inlineLoadingEnd, 
HR.util.removeAllInlineThrobbers = removeAllInlineThrobbers, HR.util.showInlineSuccess = showInlineSuccess, 
window.HR || (window.HR = HR);
}), String.prototype.endsWith = function(suffix) {
return -1 !== this.indexOf(suffix, this.length - suffix.length);
}, String.prototype.startsWith = function(prefix) {
return 0 === this.indexOf(prefix);
};
}).call(this);