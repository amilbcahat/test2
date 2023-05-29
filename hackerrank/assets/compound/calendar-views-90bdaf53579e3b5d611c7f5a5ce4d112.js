(function() {
var __bind = function(fn, me) {
return function() {
return fn.apply(me, arguments);
};
}, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var CalendarView, HR, _ref;
return CalendarView = function(_super) {
function CalendarView() {
return this.register = __bind(this.register, this), CalendarView.__super__.constructor.apply(this, arguments);
}
var downloadfile;
return __extends(CalendarView, _super), CalendarView.prototype.template = "calendar", 
CalendarView.prototype.className = "calendar-view container", CalendarView.prototype.initialize = function() {
return this.render(), this;
}, CalendarView.prototype.events = {
"click button.close":"closepopover",
"click a.fullcalendar":"downloadics"
}, CalendarView.prototype.closepopover = function(e) {
return $(e.currentTarget).parents(".popover").hide();
}, CalendarView.prototype.downloadics = function(e) {
var that;
return e.preventDefault(), $(e.currentTarget).parents(".popover").hide(), that = this, 
$.ajax({
url:"/calendar/cal.ics/" + e.currentTarget.id,
type:"GET",
success:function() {
return function(resp) {
return downloadfile("import.ics", resp);
};
}(this)
});
}, CalendarView.prototype.register = function(e) {
var current_text, that;
return e.preventDefault(), "disabled" !== $(e.currentTarget).attr("disabled") ? (current_text = $(e.currentTarget).html(), 
$(e.currentTarget).html("Signing up..."), $(e.currentTarget).attr("disabled", "disabled"), 
that = this, $.ajax({
type:"POST",
beforeSend:function(xhr) {
return xhr.setRequestHeader("X-CSRF-Token", $('meta[name="csrf-token"]').attr("content"));
},
url:"/rest/contests/" + this.contest_slug + "/signup",
data:{
contest_crp:$.cookie("" + this.contest_slug + "_crp")
},
success:function(_this) {
return function(data) {
var profile;
return mixpanel.push([ "track", "Contest Signup", {
contest:_this.contest_slug,
username:HR.profile().get("username")
} ]), data.status ? ($(e.currentTarget).html("Registered"), $(e.currentTarget).removeAttr("disabled")) :(profile = HR.profile(), 
profile.isLoggedIn() ? alert(data.message) :new HR.util.ShowLoginDialog({
show_sign_up_link:!0,
error_message:data.message
}).render(), $(e.currentTarget).html(current_text), $(e.currentTarget).removeAttr("disabled"));
};
}(this)
})) :void 0;
}, CalendarView.prototype.loadcontestdata = function(event, e) {
return e.preventDefault(), this.contest_slug = event.url.split("/")[4], this.contest = new HR.ContestModel({
slug:this.contest_slug
}).cached(), $(e.currentTarget).parents(".popover").hide();
}, CalendarView.prototype.baseURL = function() {
return this.model.pageURL();
}, CalendarView.prototype.getTimezoneOffset = function() {
var current_date, offset;
return current_date = new Date(), offset = -current_date.getTimezoneOffset() / 60;
}, CalendarView.prototype.pad = function(num) {
return 10 > num && (num = "0" + num), num;
}, CalendarView.prototype.formatTZ = function(offset) {
var sign;
return 0 === offset ? "" :(sign = " ", 0 > offset && (sign = " -", offset = -offset), 
sign + this.pad(Math.floor(offset)) + ":" + this.pad(60 * offset % 60));
}, CalendarView.prototype.destroy = function() {
return $("div.popover").remove(), CalendarView.__super__.destroy.call(this);
}, downloadfile = function(filename, text) {
var pom;
return pom = document.createElement("a"), pom.setAttribute("href", "data:text/calendar;charset=utf-8," + encodeURIComponent(text)), 
pom.setAttribute("download", filename), pom.click();
}, CalendarView.prototype.render = function() {
var offset, that;
return $(this.el).html(HR.appController.template(this.template, this)), $(this.el).find(".hr_calendar_links").prepend('<a class="btn btn-text fullcalendar" href="http://www.google.com/calendar/render?cid=http://' + window.location.host + '/calendar/cal.ics" target="_blank"><i class="icon-download"></i> Download Calendar</a>'), 
offset = this.getTimezoneOffset(), $(".calendar-note").html("All timezones are in UTC" + this.formatTZ(offset)), 
that = this, this.$("#calendar").length > 0 && (HR.requires("jquery-plugins/fullcalendar", function(_this) {
return function() {
return $(_this.el).find("#calendar").html(""), $(_this.el).find("#calendar").fullCalendar({
weekMode:"variable",
defaultView:"month",
header:{
left:"prev",
center:"title",
right:"next"
},
events:"/events?offset=" + offset,
eventAfterRender:function(event, element) {
var register_string;
return register_string = "", event.domain || (register_string = "<p class='margin-large top text-center register'><a href= " + event.url + " class='btn btn-green' target='_blank'>Register</a></p>"), 
element.popover({
animation:!0,
html:!0,
placement:"top",
title:event.title + '<button class="close" style="color:#2E363F">&times;</button>',
content:"<div class='text-center'><h3>" + event.startdate + "</h3><h3> " + event.starttime + "</h3><img width='48' height='48' src='https://" + window.location.host + "/assets/calendar/" + event.preview + "' alt=''/></div><p class='margin-large top text-center'><a href= " + event.url + " class='btn' target='_blank'>View Contest</a></p><p class='margin-large top text-center addtocalendar' id= " + event.id + " ><a href= " + event.url + " class='btn' target='_blank'>Add to Calendar</a></p>" + register_string,
container:element.context,
trigger:"click"
});
},
eventClick:function(event, jsEvent) {
return that.loadcontestdata(event, jsEvent), $(jsEvent.currentTarget).popover("show"), 
!1;
},
loading:function(isLoading) {
return HR.util.ajaxmsg("Loading Calendar", !0, !isLoading, 0);
}
});
};
}(this)), $(".close").live("click", this.closepopover), $(".addtocalendar").die("click").live("click", this.downloadics), 
$(".register").die("click").live("click", this.register)), this;
}, CalendarView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CalendarView = CalendarView;
});
}).call(this);