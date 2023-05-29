(function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
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
return CalendarView.__super__.constructor.apply(this, arguments);
}
return __extends(CalendarView, _super), CalendarView.prototype.template = "calendar", 
CalendarView.prototype.className = "calendar-view container", CalendarView.prototype.initialize = function() {
return this.render(), this;
}, CalendarView.prototype.events = {
"click button.close":"closepopover"
}, CalendarView.prototype.closepopover = function(e) {
return $(e.currentTarget).parents(".popover").hide();
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
}, CalendarView.prototype.render = function() {
var offset;
return $(this.el).html(HR.appController.template(this.template, this)), $(this.el).find(".hr_calendar_links").prepend('<a class="btn btn-text " href="http://www.google.com/calendar/render?cid=http://' + window.location.host + '/calendar/cal.ics" target="_blank"><i class="icon-plus"></i> Add to Google Calendar</a>'), 
offset = this.getTimezoneOffset(), $(".calendar-note").html("All timezones are in UTC" + this.formatTZ(offset)), 
this.$("#calendar").length > 0 && (HR.requires([ "jquery-plugins/fullcalendar" ], function(_this) {
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
return element.popover({
animation:!0,
html:!0,
placement:"top",
title:event.title + '<button class="close" style="color:#2E363F">&times;</button>',
content:"<div class='text-center'><h3>" + event.startdate + "</h3><h3> " + event.starttime + "</h3><img width='48' height='48' src='https://" + window.location.host + "/assets/calendar/" + event.preview + "' alt=''/></div><p class='margin-large top text-center'><a href= " + event.url + " class='btn btn-green' target='_blank'>View Contest</a></p>",
container:element.context,
trigger:"click"
});
},
eventClick:function(event, jsEvent) {
return $(jsEvent.currentTarget).popover("show"), !1;
},
loading:function(isLoading) {
return HR.util.ajaxmsg("Loading Calendar", !0, !isLoading, 0);
}
});
};
}(this)), $(".close").live("click", this.closepopover)), this;
}, CalendarView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CalendarView = CalendarView;
});
}).call(this);