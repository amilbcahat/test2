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
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, NotificationsView, _ref;
return NotificationsView = function(_super) {
function NotificationsView() {
return NotificationsView.__super__.constructor.apply(this, arguments);
}
return __extends(NotificationsView, _super), NotificationsView.prototype.template = "notifications", 
NotificationsView.prototype.className = "notifications-view", NotificationsView.prototype.initialize = function(options) {
return null == options && (options = {}), this.listenTo(this.collection, "reset", this.render), 
this.listenTo(this.collection, "remove", this.onRemove), this.notifications_list_view = [], 
this.notif_id = options.notif_id;
}, NotificationsView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this;
}, NotificationsView.prototype.renderView = function() {
return this._template && !this.rendered ? ($(this.el).html(this._template()), this.rendered = !0, 
this.renderSubviews()) :this.rendered ? this.renderSubviews() :void 0;
}, NotificationsView.prototype.renderSubviews = function() {
var scrollToElement, that, url;
return url = "" + this.collection.pageURL(), this.collection.sync_status ? (this.$(".notifications-list-wrap").html(""), 
_.each(this.collection.models, function(model) {
var _model;
return this.notifications_list_view[model.get("id")] || (this.notifications_list_view[model.get("id")] = new HR.NotificationsListView({
model:model,
parent:this
}), this.add_subview(this.notifications_list_view[model.get("id")])), _model = model.toJSON(), 
this.$(".notifications-list-wrap").append("<div data-id='" + _model.id + "'></div>"), 
this.notifications_list_view[model.get("id")].setElement(this.$("div[data-id=" + _model.id + "]")).render();
}, this), 0 === this.collection.models.length && this.$(".notifications-list-wrap").html("<div class='gray'>No news is good news</div>")) :this.$(".notifications-list-wrap").html(HR.appController.viewLoader(64)), 
HR.util.pagination(this.$(".pagination-wrapper"), this.collection.total, "" + url + "/page/", this.collection.page, null, this.collection.limit), 
that = this, scrollToElement = function() {
var element;
return element = $("div[data-id=" + that.notif_id + "]"), element.length > 0 ? ($("html body").animate({
scrollTop:element.offset().top
}, 400), that.notifications_list_view[parseInt(that.notif_id)].model.markRead(), 
$("div[data-id=" + that.notif_id + "]").effect("highlight", {}, 2500), that.notif_id = null) :void 0;
}, this.notif_id ? setTimeout(function() {
return scrollToElement.call(that);
}, 300) :void 0;
}, NotificationsView.prototype.onRemove = function(model) {
return this.notifications_list_view[model.get("id")] ? this.notifications_list_view[model.get("id")].destroy() :void 0;
}, NotificationsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.NotificationsView = NotificationsView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, NotificationsListView, _ref;
return NotificationsListView = function(_super) {
function NotificationsListView() {
return NotificationsListView.__super__.constructor.apply(this, arguments);
}
return __extends(NotificationsListView, _super), NotificationsListView.prototype.template = "notifications-list", 
NotificationsListView.prototype.className = "notifications-list-view", NotificationsListView.prototype.initialize = function(options) {
return this.listenTo(this.model, "render", this.render), this.parent = options.parent;
}, NotificationsListView.prototype.events = {
"click a.mark-as-read":"markAsRead",
"click a.delete":"deleteNotification",
"click a.show-body":"showBody"
}, NotificationsListView.prototype.render = function() {
var that;
return that = this, this.has_template ? this.renderView() :HR.requires("moment", function() {
return HR.appController.getTemplate(that.template, function(template) {
return that._template = template, that.has_template = !0, that.renderView();
}, that);
}), this;
}, NotificationsListView.prototype.renderView = function() {
return this._template && !this.rendered && _.size(this.model.toJSON()) > 0 && this.model.get("notification_status") <= this.model.STATUS.READ ? ($(this.el).html(this._template({
model:this.model,
_model:this.model.toJSON(),
showbody:this.showbody
})), this.renderSubviews()) :this.rendered ? this.renderSubviews() :void 0;
}, NotificationsListView.prototype.renderSubviews = function() {
return this.showbody && this.$(".notification-body").show(), this.model.get("notification_status") === this.model.STATUS.UNSEEN && $(this.el).offset() && 0 !== $(this.el).offset().top ? this.model.markSeen() :this.model.get("notification_status") > this.model.STATUS.READ ? $(this.el).fadeOut() :void 0;
}, NotificationsListView.prototype.markAsRead = function(e) {
return null == e && (e = null), e && e.preventDefault(), this.model.markRead();
}, NotificationsListView.prototype.deleteNotification = function(e) {
var id, that;
return e.preventDefault(), that = this, id = this.model.get("id"), this.model.destroy({
success:function() {
return function(model, resp) {
return HR.appView.navigationView.updateNotificationsCount(resp.unread_count), HR.cachedNotificationsCollection ? HR.cachedNotificationsCollection.remove(id) :void 0;
};
}(this)
});
}, NotificationsListView.prototype.showBody = function() {
return this.showbody ? (this.showbody = !1, this.$(".notification-body").hide()) :(this.showbody = !0, 
this.$(".notification-body").fadeIn(), this.markAsRead()), !1;
}, NotificationsListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.NotificationsListView = NotificationsListView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, ParticipantApplicationView, _ref;
return ParticipantApplicationView = function(_super) {
function ParticipantApplicationView() {
return ParticipantApplicationView.__super__.constructor.apply(this, arguments);
}
return __extends(ParticipantApplicationView, _super), ParticipantApplicationView.prototype.template = "participant-application", 
ParticipantApplicationView.prototype.initialize = function(options) {
return this.hacker = options.hacker, this.companies_collection = options.companies, 
this.listenTo(this.hacker, "reset", this.render), this.listenTo(this.hacker, "change", this.render), 
this.listenTo(this.companies_collection, "reset", this.render), this.listenTo(this.companies_collection, "change", this.render);
}, ParticipantApplicationView.prototype.events = {
"click .update-applicant-btn":"showApplicantProfileEditor",
"click .cancel-update-applicant-btn":"cancelApplicantProfileEditor",
"change input.hacker_resume":"uploadResume",
"click .upload-resume-btn":"uploadResumePrompt",
"focusout textarea.hacker_about":"persistAboutMe",
"focusout input.hacker_school":"persistSchool",
"focusout input.hacker_name":"persistName",
"focusout input.hacker_phone":"persistPhone",
"click button.more-info":"showCompanyInfo",
"click button.apply":"applyCompanyDialog"
}, ParticipantApplicationView.prototype.render = function() {
return this.has_template ? this.renderCurrentView() :HR.appController.getTemplate(this.template, function(template) {
return this.has_template = !0, this._template = template, this.renderCurrentView();
}, this), this;
}, ParticipantApplicationView.prototype.renderCurrentView = function() {
var countries, data, that, _country;
return this._template && (this.hacker.get("username") || this.companies_collection.errors.length > 0) ? ($(this.el).html(this._template({
companies:this.companies_collection.toJSON(),
errors:this.companies_collection.errors,
contest:HR.model("contest").cached().toJSON(),
profile:this.hacker,
current_hacker:this.companies_collection.current_hacker,
meta_contest:this.companies_collection.contest
})), countries = window.countries_mapping, data = [], _.each(countries, function() {
return function(iso, name) {
return data.push({
id:name,
text:name
});
};
}(this)), this.$("#country").select2({
data:data,
width:"210px"
}), _country = this.hacker.get("country"), _country && this.setCountry(_country), 
that = this, this.$("#country").on("change", function(e) {
return that.updateCountry(e);
}), this.$("input.hacker_school").completer("school")) :void 0;
}, ParticipantApplicationView.prototype.setCountry = function(country) {
return this.$("#country").val(country), $(this.el).find("#s2id_country .select2-choice span").text(country);
}, ParticipantApplicationView.prototype.showApplicantProfileEditor = function(e) {
return e.preventDefault(), $(".applicant-profile-editor").show(), $(".cancel-update-applicant-profile-container").show(), 
$(".update-applicant-profile-container").hide();
}, ParticipantApplicationView.prototype.cancelApplicantProfileEditor = function(e) {
return e.preventDefault(), $(".applicant-profile-editor").hide(), $(".cancel-update-applicant-profile-container").hide(), 
$(".update-applicant-profile-container").show();
}, ParticipantApplicationView.prototype.uploadResume = function(e) {
var form_data, that;
if (e.currentTarget.files[0]) return form_data = new FormData(), form_data.append("resume", e.currentTarget.files[0]), 
this.$("#hacker_resume_status").text("Uploading"), that = this, this.$(".resume-iframe").hide(), 
this.$(".upload-resume-btn").hide(), $.ajax({
url:"/rest/hackers/" + this.hacker.get("id"),
type:"PUT",
data:form_data,
cache:!1,
contentType:!1,
processData:!1,
success:function(data) {
var embed_url;
return that.$(".upload-resume-btn").show(), data.model.errors.resume ? that.$("#hacker_resume_status").text(data.model.errors.resume) :that.$("#hacker_resume_status").text(""), 
data.model.resume_url ? (embed_url = "https://docs.google.com/viewer?url=" + encodeURIComponent(data.model.resume_url) + "&embedded=true", 
0 === that.$(".resume-iframe iframe").length ? (that.$(".resume-iframe").html("<iframe width='600' height='780' src='" + embed_url + "' style='border: none; margin-left: 222px; margin-top: 20px;'></iframe>"), 
that.$(".upload-resume-btn").text("Upload a new resume")) :that.$(".resume-iframe iframe").attr("src", embed_url), 
that.$(".resume-iframe").show()) :void 0;
},
error:function() {
return that.$(".upload-resume-btn").show(), that.$("#hacker_resume_status").text("there was an error");
}
});
}, ParticipantApplicationView.prototype.uploadResumePrompt = function() {
return this.$(".upload-resume-input").show(), this.$(".upload-resume-input input[type=file]").click();
}, ParticipantApplicationView.prototype.persistAboutMe = function(e) {
return this.persist("hack", $(e.currentTarget).val());
}, ParticipantApplicationView.prototype.updateCountry = function(e) {
return this.persist("country", e.val);
}, ParticipantApplicationView.prototype.persistSchool = function(e) {
return this.persist("school", $(e.currentTarget).val());
}, ParticipantApplicationView.prototype.persistName = function(e) {
return this.persist("name", $(e.currentTarget).val());
}, ParticipantApplicationView.prototype.persistPhone = function(e) {
var phone_no;
return phone_no = HR.util.trim($(e.currentTarget).val().replace(" ", "")), /^\+[0-9]{5,15}$/.test(phone_no) ? this.persist("phone", phone_no) :this.$(".hacker_phone_status").html("please provide a valid phone number").show();
}, ParticipantApplicationView.prototype.persist = function(field, value) {
var data, that;
return this.$(".hacker_" + field + "_status").text("saving").show(), that = this, 
data = {}, data[field] = value, this.hacker.save(data, {
silent:!0,
success:function() {
return that.$(".hacker_" + field + "_status").text("saved").show(), setTimeout(function() {
return that.$(".hacker_" + field + "_status").text("").hide();
}, 1e3);
},
error:function() {
return that.$(".hacker_" + field + "_status").text("there was an error").show();
}
});
}, ParticipantApplicationView.prototype.showCompanyInfo = function(e) {
var company_id, company_info_view, company_meta_model, that;
return that = this, company_id = parseInt($(e.currentTarget).attr("data-id")), company_meta_model = this.companies_collection.get(company_id), 
company_info_view = new HR.ParticipantApplicationCompanyInfoView({
meta_model:company_meta_model,
parent:this
}), new HR.util.ShowDialog({
title:"" + company_meta_model.get("name") + " | Company Info",
body_view:company_info_view,
width:600,
height:350,
buttons:[ {
name:"Apply to " + company_meta_model.get("name"),
"class":"btn-primary",
callback:function(dialog) {
return dialog.destroy(), that.applyCompanyDialog(e);
}
} ]
}).render();
}, ParticipantApplicationView.prototype.applyCompanyDialog = function(e) {
var company_apply_view, company_id, company_meta_model, that;
return that = this, company_id = parseInt($(e.currentTarget).attr("data-id")), company_meta_model = this.companies_collection.get(company_id), 
company_apply_view = new HR.ParticipantApplicationCompanyApplyView({
meta_model:company_meta_model,
parent:this,
collection:this.companies_collection
}), new HR.util.ShowDialog({
title:"" + company_meta_model.get("name") + " | Apply",
body_view:company_apply_view,
width:600,
height:400,
buttons:[ {
name:"Apply",
"class":"btn-primary",
callback:function(dialog) {
return company_apply_view.applyConfirm(this, dialog);
}
} ]
}).render();
}, ParticipantApplicationView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ParticipantApplicationView = ParticipantApplicationView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, ParticipantApplicationCompanyInfoView, _ref;
return ParticipantApplicationCompanyInfoView = function(_super) {
function ParticipantApplicationCompanyInfoView() {
return ParticipantApplicationCompanyInfoView.__super__.constructor.apply(this, arguments);
}
return __extends(ParticipantApplicationCompanyInfoView, _super), ParticipantApplicationCompanyInfoView.prototype.template = "participant-application-company-info", 
ParticipantApplicationCompanyInfoView.prototype.initialize = function(options) {
return null == options && (options = {}), this.meta_model = options.meta_model, 
this.parent = options.parent;
}, ParticipantApplicationCompanyInfoView.prototype.events = {
"click button.apply":"applyCompany"
}, ParticipantApplicationCompanyInfoView.prototype.render = function() {
return this.has_template ? this.renderCurrentView() :HR.appController.getTemplate(this.template, function(template) {
return this.has_template = !0, this._template = template, this.renderCurrentView();
}, this), this;
}, ParticipantApplicationCompanyInfoView.prototype.renderCurrentView = function() {
return this._template && this.meta_model ? $(this.el).html(this._template({
meta_model:this.meta_model.toJSON()
})) :void 0;
}, ParticipantApplicationCompanyInfoView.prototype.set_dialog = function(dialog) {
this.dialog = dialog;
}, ParticipantApplicationCompanyInfoView.prototype.applyCompany = function(e) {
return this.dialog.destroy(), this.parent.applyCompanyDialog(e);
}, ParticipantApplicationCompanyInfoView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ParticipantApplicationCompanyInfoView = ParticipantApplicationCompanyInfoView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, ParticipantApplicationCompanyApplyView, _ref;
return ParticipantApplicationCompanyApplyView = function(_super) {
function ParticipantApplicationCompanyApplyView() {
return ParticipantApplicationCompanyApplyView.__super__.constructor.apply(this, arguments);
}
return __extends(ParticipantApplicationCompanyApplyView, _super), ParticipantApplicationCompanyApplyView.prototype.template = "participant-application-company-apply", 
ParticipantApplicationCompanyApplyView.prototype.initialize = function(options) {
return null == options && (options = {}), this.meta_model = options.meta_model, 
this.parent = options.parent, this.collection = options.collection;
}, ParticipantApplicationCompanyApplyView.prototype.render = function() {
return this.has_template ? this.renderCurrentView() :HR.appController.getTemplate(this.template, function(template) {
return this.has_template = !0, this._template = template, this.renderCurrentView();
}, this), this;
}, ParticipantApplicationCompanyApplyView.prototype.renderCurrentView = function() {
return this._template && this.meta_model ? ($(this.el).html(this._template({
meta_model:this.meta_model.toJSON()
})), this.$("input[type=checkbox]").iCheck({
checkboxClass:"icheckbox_square-green",
radioClass:"iradio_square-green",
increaseArea:"20%"
}), this.$("input[name=offices]").on("ifChecked", function(e) {
return $(e.currentTarget).parent().parent().parent().find("select").removeAttr("disabled");
}), this.$("input[name=offices]").on("ifUnchecked", function(e) {
var $select;
return $select = $(e.currentTarget).parent().parent().parent().find("select"), $select.val($select.find("option:first").val()), 
$select.attr("disabled", "disabled");
}), this.$("input[type=radio]").iCheck({
checkboxClass:"icheckbox_square-green",
radioClass:"iradio_square-green",
increaseArea:"20%"
})) :void 0;
}, ParticipantApplicationCompanyApplyView.prototype.set_dialog = function(dialog) {
this.dialog = dialog;
}, ParticipantApplicationCompanyApplyView.prototype.applyConfirm = function(btn) {
var application_model, body_html, confirm_apply_view, data, errors, offices, positions, role, that, _errs;
return data = {}, _.each(this.$("input"), function(input) {
return data[$(input).attr("id")] = $(input).is(":checked");
}), positions = [], offices = {}, role = null, _.each(data, function(v, k) {
var office_id;
return k.startsWith("position_") && v === !0 ? positions.push(parseInt(k.substring(9))) :k.startsWith("office_") && v === !0 ? (office_id = parseInt(k.substring(7)), 
offices[office_id] = this.$("select#visa_status_" + office_id).val()) :k.startsWith("role_") && v === !0 ? role = k.substring(5) :void 0;
}), errors = {}, 0 === _.size(positions) && (errors.positions = "select atleast one position"), 
0 === _.size(offices) && (errors.offices = "select atleast one office"), null === role && (errors.role = "select a role"), 
that = this, _.size(errors) > 0 ? (_errs = _.map(errors, function(value, key) {
return "<li><p><em><strong>" + _.capitalize(key) + ":</strong></em> " + value + "</p></li>";
}), body_html = "<ul style='list-style: none;'>" + _errs.join("") + "</ul>", new HR.util.ShowDialog({
title:"There were error(s)",
body:body_html,
buttons:[ {
name:"Got it!",
"class":"btn-primary",
callback:function(dialog) {
return dialog.destroy();
}
} ]
}).render()) :(application_model = new HR.HackerApplicationModel({
positions:positions,
offices:offices,
role:role,
company_id:this.meta_model.get("id")
}), application_model.contest_slug = HR.appController.get_current_contest_slug(), 
confirm_apply_view = new HR.ParticipantApplicationCompanyApplyConfirmView({
model:application_model,
meta_model:this.meta_model,
parent_dialog:this.dialog,
collection:this.collection
}), new HR.util.ShowDialog({
title:"Application Confirmation",
body_view:confirm_apply_view,
width:500,
buttons:[ {
name:"Looks Good! Apply",
"class":"btn-primary",
callback:function(dialog) {
return confirm_apply_view.confirmApply(this, dialog);
}
}, {
name:"Cancel",
callback:function(dialog) {
return dialog.destroy();
}
} ]
}).render()), btn.setActive();
}, ParticipantApplicationCompanyApplyView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ParticipantApplicationCompanyApplyView = ParticipantApplicationCompanyApplyView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, ParticipantApplicationCompanyApplyConfirmView, _ref;
return ParticipantApplicationCompanyApplyConfirmView = function(_super) {
function ParticipantApplicationCompanyApplyConfirmView() {
return ParticipantApplicationCompanyApplyConfirmView.__super__.constructor.apply(this, arguments);
}
return __extends(ParticipantApplicationCompanyApplyConfirmView, _super), ParticipantApplicationCompanyApplyConfirmView.prototype.template = "participant-application-company-apply-confirm", 
ParticipantApplicationCompanyApplyConfirmView.prototype.initialize = function(options) {
return null == options && (options = {}), this.model = options.model, this.meta_model = options.meta_model, 
this.parent_dialog = options.parent_dialog, this.collection = options.collection;
}, ParticipantApplicationCompanyApplyConfirmView.prototype.render = function() {
return this.has_template ? this.renderCurrentView() :HR.appController.getTemplate(this.template, function(template) {
return this.has_template = !0, this._template = template, this.renderCurrentView();
}, this), this;
}, ParticipantApplicationCompanyApplyConfirmView.prototype.set_dialog = function(dialog) {
this.dialog = dialog;
}, ParticipantApplicationCompanyApplyConfirmView.prototype.renderCurrentView = function() {
return this._template && $(this.el).html(this._template({
model:this.model.toJSON(),
meta_model:this.meta_model.toJSON(),
visa_statuses:{
"not-required":"Not required",
"already-have":"Already have",
"dont-have":"Don't have"
}
})), this.dialog ? this.dialog.renderPosition() :void 0;
}, ParticipantApplicationCompanyApplyConfirmView.prototype.confirmApply = function(btn, dialog) {
var that;
return btn.setInactive(), that = this, this.model.save(null, {
success:function(model, resp) {
return btn.setActive(), resp.errors ? btn.setFailedMsg(HR.util.error_html(resp.errors)) :(alert("Your application has been accepeted! Thanks!"), 
dialog.destroy(), that.parent_dialog.destroy(), that.collection.fetch());
},
error:function() {
return btn.setActive(), btn.setFailedMsg("Internal Server Error");
}
});
}, ParticipantApplicationCompanyApplyConfirmView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ParticipantApplicationCompanyApplyConfirmView = ParticipantApplicationCompanyApplyConfirmView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_ChallengeAssociationItemView, _ref;
return Manage_ChallengeAssociationItemView = function(_super) {
function Manage_ChallengeAssociationItemView() {
return Manage_ChallengeAssociationItemView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_ChallengeAssociationItemView, _super), Manage_ChallengeAssociationItemView.prototype.tagName = "tr", 
Manage_ChallengeAssociationItemView.prototype.template = "manage/challenge-association-item", 
Manage_ChallengeAssociationItemView.prototype["class"] = "dummy", Manage_ChallengeAssociationItemView.prototype.initialize = function() {
return this.has_template = !1, this.rendered = !1, this.editDialog = !1, this.listenTo(this.model, "reset", this.render), 
this.listenTo(this.model, "sync", this.render), this.timebound = !1, this.model.dirty = !1;
}, Manage_ChallengeAssociationItemView.prototype.events = {
"click .delete":"confirmDelete",
"change .ca-attr":"setData",
"click .ca-save":"save",
"change .ca-timebound":"changeTimebound"
}, Manage_ChallengeAssociationItemView.prototype.changeTimebound = function(e) {
return this.timebound = $(e.target).is(":checked"), this.timebound || (this.model.set("start_time", ""), 
this.model.set("end_time", "")), this.model.dirty = !0, this.render(), this;
}, Manage_ChallengeAssociationItemView.prototype.setData = function() {
return this.model.set("dynamic", this.$(".ca-dynamic").is(":checked")), this.model.set("binary_scoring", this.$(".ca-binary_scoring").is(":checked")), 
this.model.set("weight", parseInt(this.$(".ca-weight").val())), this.model.set("priority", parseInt(this.$(".ca-priority").val())), 
this.model.set("start_time", this.$(".ca-start_time").val() || ""), this.model.get("start_time") && this.model.set("start_time", moment.utc(this.model.get("start_time"), "YYYY-MM-DD HH:mmZ").format("YYYY-MM-DD HH:mm")), 
this.model.set("end_time", this.$(".ca-end_time").val() || ""), this.model.get("end_time") && this.model.set("end_time", moment.utc(this.model.get("end_time"), "YYYY-MM-DD HH:mmZ").format("YYYY-MM-DD HH:mm")), 
this.model.dirty = !0, this.render();
}, Manage_ChallengeAssociationItemView.prototype.save = function(e) {
return e.preventDefault(), e.stopPropagation(), this.setData(), this.model.save("", "", {
success:function(_this) {
return function() {
return _this.$(".ca-save").remove(), _this.$(".msg").html("saving..."), _this.model.fetch({
success:function() {
return _this.render();
}
});
};
}(this)
}), this;
}, Manage_ChallengeAssociationItemView.prototype.confirmDelete = function(e) {
var dialog_options;
return e.preventDefault(), dialog_options = {
title:"Confirm Delete",
body:"<div class='row' style='margin-left:0px'> Are you sure you want to delete " + this.model.get("challenge").name + " from this contest? </div> <div class='row' style='margin-top:20px;'> <div class='span2 pull-right' > <a class='btn btn-green confirm-yes' href='#'>Yes</a> <a class='btn btn-green confirm-no' href='#'>No</a> </div> </div>",
events:{
"click .confirm-yes":function(_this) {
return function(e) {
return e.preventDefault(), _this.dialog.destroy(), _this["delete"]();
};
}(this),
"click .confirm-no":function(_this) {
return function(e) {
return e.preventDefault(), _this.dialog.destroy();
};
}(this)
}
}, this.dialog = new HR.util.ShowConfirmationDialog(dialog_options), this.dialog.render();
}, Manage_ChallengeAssociationItemView.prototype.showEditDialog = function(e) {
var binary_scoring;
return e.preventDefault(), this.editDialog = !0, binary_scoring = this.model.get("binary_scoring"), 
this.model.isNew() ? binary_scoring = $(".edit-contest #binary_scoring").is(":checked") :this.model.cached(), 
this.model.isNew() ? (this.dialog.$body().find("label#challengename").hide(), this.dialog.$body().find("input#challengename").select2({
minimumInputLength:1,
ajax:{
url:"/rest/contests/" + this.model.getContestId() + "/challengeassociations/available",
quietMillis:100,
data:function() {
return function(term) {
return {
filter:term
};
};
}(this),
results:function() {
return function(resp) {
var data;
return data = [], _.each(resp, function(item) {
return data.push({
id:item.id,
text:item.name
});
}), {
results:data,
more:!1
};
};
}(this)
}
}), this.dialog.$body().find("input#challengename").on("change", function(_this) {
return function(e) {
var item;
return e.preventDefault(), item = $(e.target).select2("data"), _this.model.set("challenge_id", item.id), 
_this.model.set("challenge_name", item.text);
};
}(this))) :(this.dialog.$body().find("label#challengename").show(), this.dialog.$body().find("input#challengename").hide());
}, Manage_ChallengeAssociationItemView.prototype["delete"] = function() {
return HR.util.ajaxmsg("Deleting...", !0, !0), this.model.destroy({
success:function(_this) {
return function(model, resp) {
return "deleted" === resp.status ? $(_this.el).html("") :void 0;
};
}(this)
}), this.remove();
}, Manage_ChallengeAssociationItemView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this.delegateEvents(), this;
}, Manage_ChallengeAssociationItemView.prototype.renderView = function() {
var endtime, starttime;
return this.has_template ? (starttime = "", this.model.get("start_time") && (starttime = moment.utc(this.model.get("start_time"), "YYYY-MM-DD HH:mmZ").format("YYYY-MM-DD HH:mm"), 
this.timebound = !0), endtime = "", this.model.get("end_time") && (endtime = moment.utc(this.model.get("end_time"), "YYYY-MM-DD HH:mmZ").format("YYYY-MM-DD HH:mm"), 
this.timebound = !0), $(this.el).html(this._template({
model:this.model.toJSON(),
starttime:starttime,
endtime:endtime,
timebound:this.timebound
}))) :void 0;
}, Manage_ChallengeAssociationItemView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_ChallengeAssociationItemView = Manage_ChallengeAssociationItemView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_ChallengeAssociationView, _ref;
return Manage_ChallengeAssociationView = function(_super) {
function Manage_ChallengeAssociationView() {
return Manage_ChallengeAssociationView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_ChallengeAssociationView, _super), Manage_ChallengeAssociationView.prototype.template = "manage/challenge-association", 
Manage_ChallengeAssociationView.prototype["class"] = "dummy", Manage_ChallengeAssociationView.prototype.events = {
"click .add-ca-btn":"addChallenge",
"click button#search":"filterList"
}, Manage_ChallengeAssociationView.prototype.addChallenge = function() {
var item, that;
return item = $("input#addnewca").select2("data"), that = this, this.collection.create({
challenge_id:item.id,
contest_id:this.collection.getContestId(),
challenge_name:item.text
}, {
success:function(model) {
return model && model.errors && model.errors.length > 0 ? (that.collection.remove(that.collection.last()), 
that.resetSubviews().render(), alert(model.errors[0])) :void 0;
}
}), this.resetSubviews().render(), this;
}, Manage_ChallengeAssociationView.prototype.resetSubviews = function() {
return this.subviews = _.map(this.collection.models, function(_this) {
return function(model) {
var _view;
return model.contestId = _this.collection.getContestId(), _view = new HR.Manage_ChallengeAssociationItemView({
model:model
});
};
}(this)), this;
}, Manage_ChallengeAssociationView.prototype.filterList = function(e) {
var query;
return e.preventDefault(), query = $(this.el).find("#filter").val(), this.collection.setFilter(query), 
this.collection.fetch({
success:function(_this) {
return function() {
return _this.collection.trigger("reset");
};
}(this)
});
}, Manage_ChallengeAssociationView.prototype.initialize = function() {
return this.has_template = !1, this.rendered = !1, this.listenTo(this.collection, "reset", this.render), 
this.listenTo(this.collection, "destroy", this.render), this.listenTo(this.collection, "add", this.render);
}, Manage_ChallengeAssociationView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this;
}, Manage_ChallengeAssociationView.prototype.renderView = function() {
return this.has_template ? ($(this.el).html(this._template({
collection:this.collection
})), this.collection.length > 0 && $(this.el).find(".challenges-list-wrapper").html(""), 
this.subviews || (this.subviews = _.map(this.collection.models, function(_this) {
return function(model) {
var _view;
return model.contestId = _this.collection.getContestId(), _view = new HR.Manage_ChallengeAssociationItemView({
model:model
}), _this.add_subview(_view), _view;
};
}(this))), _.each(this.subviews, function(_this) {
return function(sv) {
var tml;
return tml = $("<tr>"), sv.setElement(tml).render(), _this.$(".challenges-list-wrapper").append(tml);
};
}(this)), this.$("input#addnewca").select2({
minimumInputLength:1,
ajax:{
url:"/rest/contests/" + this.collection.getContestId() + "/challengeassociations/available",
quietMillis:100,
data:function() {
return function(term) {
return {
filter:term
};
};
}(this),
results:function() {
return function(resp) {
var data;
return data = [], _.each(resp, function(item) {
return data.push({
id:item.id,
text:item.name
});
}), {
results:data,
more:!1
};
};
}(this)
}
})) :void 0;
}, Manage_ChallengeAssociationView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_ChallengeAssociationView = Manage_ChallengeAssociationView;
});
}.call(this), function() {
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
var HR, Manage_ChallengeEditView, _ref;
return Manage_ChallengeEditView = function(_super) {
function Manage_ChallengeEditView() {
return this.updatePreview = __bind(this.updatePreview, this), Manage_ChallengeEditView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_ChallengeEditView, _super), Manage_ChallengeEditView.prototype.template = "manage/challenge-edit", 
Manage_ChallengeEditView.prototype["class"] = "dummy", Manage_ChallengeEditView.prototype.initialize = function(options) {
return this.autocreate_slug = !0, this.has_template = !1, this.rendered = !1, options.current_tab && (this.current_tab = options.current_tab), 
this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "reset", this.render), 
this.model.isNew() || (this.autocreate_slug = !1, this.model.fetch({
success:function() {},
error:function() {
return HR.router.e404();
}
})), this.preview_sync = !0, this.codeMirrorRefresh(), this.current_hacker = HR.profile();
}, Manage_ChallengeEditView.prototype.events = {
"click a.judgebot":"changeJudgeBotLang",
"click a.checker_program":"changeCheckerProgramLang",
"click a.template_lang":"changeTemplateLang",
"click .save":"save",
"change #sync":"toggleSync",
"keyup #name":"nameChanged",
"keypress #slug":"slugChanged",
"click #statementEditTab > .CodeMirror":"focusEditor",
"click .hr_judgebot-code > .CodeMirror":"focusJudgebot",
"click .hr_checker-program > .CodeMirror":"focusCheckerProgram",
"click .hr_checker-limits > .CodeMirror":"focusCheckerLimits",
"click .hr_lang-template-head > .CodeMirror":"focusLangHead",
"click .hr_lang-template-body > .CodeMirror":"focusLangBody",
"click .hr_lang-template-tail > .CodeMirror":"focusLangTail"
}, Manage_ChallengeEditView.prototype.focusEditor = function() {
return this.editor ? this.editor.focus() :void 0;
}, Manage_ChallengeEditView.prototype.focusJudgebot = function() {
return this.judgebot ? this.judgebot.focus() :void 0;
}, Manage_ChallengeEditView.prototype.focusCheckerProgram = function() {
return this.checker_program ? this.checker_program.focus() :void 0;
}, Manage_ChallengeEditView.prototype.focusCheckerLimits = function() {
return this.checker_limits ? this.checker_limits.focus() :void 0;
}, Manage_ChallengeEditView.prototype.focusLangHead = function() {
return this.lang_template_head ? this.lang_template_head.focus() :void 0;
}, Manage_ChallengeEditView.prototype.focusLangTail = function() {
return this.lang_template_tail ? this.lang_template_tail.focus() :void 0;
}, Manage_ChallengeEditView.prototype.focusLangBody = function() {
return this.lang_template ? this.lang_template.focus() :void 0;
}, Manage_ChallengeEditView.prototype.codeMirrorRefresh = function() {
return this.editor && this.editor.refresh(), this.judgebot && this.judgebot.refresh(), 
this.checker_program && this.checker_program.refresh(), this.lang_template_head && this.lang_template_head.refresh(), 
this.lang_template && this.lang_template.refresh(), this.lang_template_tail && this.lang_template_tail.refresh(), 
this.checker_limits ? this.checker_limits.refresh() :void 0;
}, Manage_ChallengeEditView.prototype.slugChanged = function() {
return this.autocreate_slug = !1, this;
}, Manage_ChallengeEditView.prototype.nameChanged = function() {
return this.autocreate_slug && this.$("#slug").val(HR.util.slugify(this.$("#name").val())), 
this;
}, Manage_ChallengeEditView.prototype.toggleSync = function(e) {
return this.preview_sync = $(e.target).get(0).checked;
}, Manage_ChallengeEditView.prototype.changeJudgeBotLang = function(e) {
var $el;
return $el = $(e.target), this.judgebot ? HR.appController.loadCodeMirrorMode($el.data("lang"), function(_this) {
return function() {
var _data;
return _this.judgebot.setOption("mode", $el.data("mime")), _this.$("span#judgebot_lang").html($el.html()), 
_data = _this.model.get("_data"), _data.judgebot_language = $el.data("lang"), _this.model.set({
_data:_data
});
};
}(this)) :void 0;
}, Manage_ChallengeEditView.prototype.changeCheckerProgramLang = function(e) {
var $el;
return $el = $(e.target), this.checker_program ? HR.appController.loadCodeMirrorMode($el.data("lang"), function(_this) {
return function() {
var _data;
return _this.checker_program.setOption("mode", $el.data("mime")), _this.$("span#custom_lang").html($el.html()), 
_data = _this.model.get("_data"), _data.custom_language = $el.data("lang");
};
}(this)) :void 0;
}, Manage_ChallengeEditView.prototype.changeTemplateLang = function(e) {
var $el, key, lang, mime;
return $el = $(e.target), key = $el.data("lang") + "_template", lang = $el.data("lang"), 
mime = $el.data("mime"), HR.appController.loadCodeMirrorMode(lang, function(_this) {
return function() {
return _this.updateTemplate(function() {
var _data;
return _data = _this.model.get("_data"), _this.$("#current_lang").val(lang), _this.$("span#lang_template_lang").html($el.html()), 
_this.lang_template.setOption("mode", mime), _this.lang_template_head.setOption("mode", mime), 
_this.lang_template_tail.setOption("mode", mime), _data[key] || "" === _data[key] ? (_this.lang_template.setValue(_data[key]), 
_this.lang_template_head.setValue(_data[key + "_head"] || ""), _this.lang_template_tail.setValue(_data[key + "_tail"] || "")) :(_this.lang_template.setValue(lang_default_text[$el.data("lang")] || ""), 
_this.lang_template_head.setValue(""), _this.lang_template_tail.setValue(""));
});
};
}(this));
}, Manage_ChallengeEditView.prototype.updateTemplate = function(_callback) {
var condn, current_key, current_lang, current_template, current_template_head, current_template_tail, _data;
return this.lang_template ? (_data = this.model.get("_data"), current_key = this.$("#current_lang").val() + "_template", 
current_lang = this.$("#current_lang").val(), current_template = this.lang_template.getValue().trim(), 
current_template_head = this.lang_template_head.getValue().trim(), current_template_tail = this.lang_template_tail.getValue().trim(), 
condn = !_data[current_key] && lang_default_text[current_lang] && lang_default_text[current_lang].trim() !== current_template && "" !== current_template, 
condn = condn || _data[current_key] && _data[current_key].trim() !== current_template && lang_default_text[current_lang] && lang_default_text[current_lang].trim() !== current_template, 
condn = condn || _data[current_key + "_head"] && _data[current_key + "_head"].trim() !== current_template_head || !_data[current_key + "_head"] && "" !== current_template_head, 
condn = condn || _data[current_key + "_tail"] && _data[current_key + "_tail"].trim() !== current_template_tail || !_data[current_key + "_tail"] && "" !== current_template_tail, 
condn && this.current_lang && (_data[current_key] = current_template, _data[current_key + "_head"] = current_template_head, 
_data[current_key + "_tail"] = current_template_tail, this.model.set({
_data:_data
})), this.current_lang = current_lang, _callback()) :(_callback(), void 0);
}, Manage_ChallengeEditView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this.current_tab && this.$("[data-toggle=tab][data-target=#" + this.current_tab + "]").trigger("click"), 
this;
}, Manage_ChallengeEditView.prototype.renderView = function() {
var editorOptions;
return this.has_template ? ($(this.el).html(this._template({
model:this.model.toJSON(),
new_model:this.model.isNew(),
current_hacker:this.current_hacker.toJSON()
})), HR.util.ajaxmsg("Loading...", !0, !0, .5), this.model.isNew() || this.renderTestCaseView(), 
this.renderProblemStatementEditor(), editorOptions = {
lineNumbers:!0,
lineWrapping:!0,
matchBrackets:!0,
minHeight:250,
mode:lang_mime_mapping[this.model.get("_data").judgebot_language],
indentUnit:4
}, HR.appController.loadCodeMirrorMode(this.model.get("_data").judgebot_language || "python", function(_this) {
return function() {
return _this.$("#judgebot").get(0) ? _this.judgebot = CodeMirror.fromTextArea(_this.$("#judgebot").get(0), editorOptions) :void 0;
};
}(this)), HR.appController.loadCodeMirrorMode(this.model.get("_data").custom_language || "python", function(_this) {
return function() {
return _this.$("#checker_program").get(0) ? (editorOptions.mode = lang_mime_mapping[_this.model.get("_data").custom_language], 
editorOptions.value = _this.model.get("_data").checker_program, _this.checker_program = CodeMirror.fromTextArea(_this.$("#checker_program").get(0), editorOptions), 
editorOptions.value = "") :void 0;
};
}(this)), editorOptions.mode = "text/x-c++src", HR.appController.loadCodeMirrorMode("cpp", function(_this) {
return function() {
var temp;
return _this.$("#lang_template").get(0) && (temp = _this.current_lang, _this.current_lang = !1, 
_this.lang_template_head = CodeMirror.fromTextArea(_this.$("#lang_template_head").get(0), editorOptions), 
_this.lang_template = CodeMirror.fromTextArea(_this.$("#lang_template").get(0), editorOptions), 
_this.lang_template_tail = CodeMirror.fromTextArea(_this.$("#lang_template_tail").get(0), editorOptions), 
_this.$("a.template_lang[data-lang=" + (temp || "cpp") + "]").trigger("click")), 
$(_this.el).find("#custom")[0] && ($(_this.el).find("#custom")[0].checked = _this.model.get("custom")), 
HR.profile().get("is_admin") ? $(_this.el).find("#submit_disabled")[0].checked = _this.model.get("submit_disabled") :void 0;
};
}(this)), this.renderCheckerLimitsEditor(), this.model.isNew() || this.renderModeratorsView(), 
this.$(".manage-switch").not(".has-switch").bootstrapSwitch()) :void 0;
}, Manage_ChallengeEditView.prototype.renderProblemStatementEditor = function() {
var $code_editor;
return $code_editor = this.$("textarea#statement").get(0), HR.appController.loadCodeMirrorMode("markdown", function(_this) {
return function() {
var editor_options;
return $code_editor ? (editor_options = {
lineNumbers:!1,
lineWrapping:!0,
matchBrackets:!1,
mode:"text/x-markdown",
indentUnit:4,
value:_this.model.get("body")
}, _this.editor = CodeMirror.fromTextArea($code_editor, editor_options), _this.editor.on("change", _this.updatePreview), 
_this.updatePreview()) :void 0;
};
}(this));
}, Manage_ChallengeEditView.prototype.renderCheckerLimitsEditor = function() {
var $checker_limits, editor_options;
return $checker_limits = this.$("textarea#checkerlimits").get(0), $checker_limits ? (editor_options = {
lineNumbers:!0,
lineWrapping:!0,
matchBrackets:!0,
mode:"application/json",
indentUnit:4
}, HR.appController.loadCodeMirrorMode("javascript", function(_this) {
return function() {
var limits;
return _this.checker_limits ? void 0 :(_this.checker_limits = CodeMirror.fromTextArea($checker_limits), 
limits = _this.model.get("_data") && _this.model.get("_data").checkerlimits ? _this.model.get("_data").checkerlimits :void 0, 
(!limits || _.isEmpty(limits)) && (limits = default_checker_limits, _this.model.set("checkerlimits", limits)), 
"object" == typeof limits && (limits = JSON.stringify(limits, null, 4)), _this.checker_limits.setValue(limits));
};
}(this))) :void 0;
}, Manage_ChallengeEditView.prototype.renderModeratorsView = function() {
var moderators, moderatorsview;
if (this.model.get("id")) return moderators = new HR.Manage_Moderators({
permissible_id:this.model.get("id"),
permissible_type:"Challenge"
}), moderatorsview = new HR.Manage_ModeratorsView({
el:this.$(".moderators-view"),
collection:moderators
}), moderators.fetch({
disable_throbber:!0,
success:function() {
return moderatorsview.render();
}
});
}, Manage_ChallengeEditView.prototype.updatePreview = function() {
var that;
return that = this, HR.requires("sanitize", function() {
return function() {
var sanitized_text;
return sanitized_text = HackDown.processData(that.editor.getValue()), that.$("#statementPreview").html(sanitized_text);
};
}(this));
}, Manage_ChallengeEditView.prototype.save = function(e) {
return e.preventDefault(), $(this.el).find(".message").removeClass("error success").addClass("info").html("<p>Saving!</p>"), 
this.updateTemplate(function(_this) {
return function() {
var data, fields, newModel, temp, _data;
return _data = _this.model.get("_data"), _this.judgebot && (_data.judgebot = _this.judgebot.getValue()), 
_this.checker_program && (_data.checker_program = _this.checker_program.getValue()), 
fields = [ "public_test_cases", "public_solutions" ], "game" === _this.$("#kind").val() && fields.push("player_count"), 
HR.profile().get("is_admin") && fields.push("submit_disabled"), temp = HR.util.formData($(_this.el), fields), 
_.extend(_data, temp), data = HR.util.formData($(_this.el), [ "name", "slug", "kind", "preview", "custom" ]), 
data.body = _this.editor.getValue(), _this.checker_limits && (data.checkerlimits = _this.checker_limits.getValue()), 
data._data = _data, newModel = _this.model.isNew(), _this.model.save(data, {
success:function(model, resp) {
return _this.parseErrors(resp.errors, resp.status), _this.renderTestCaseView();
},
error:function() {
return $(_this.el).find(".message").show().removeClass("error success").addClass("info").html("<p>Problem in Connecting to server.</p>"), 
setTimeout(function() {
return _this.$(".message").hide().html("");
}, 4e3);
}
});
};
}(this));
}, Manage_ChallengeEditView.prototype.parseErrors = function(errors, status) {
var error_html;
return status ? ($(this.el).find(".message").show().removeClass("error info").addClass("success").html("<i class='icon-ok'>Your changes have been saved.</i>"), 
setTimeout(function(_this) {
return function() {
return _this.$(".message").hide().html("");
};
}(this), 4e3), this.renderTestCaseView()) :($(this.el).find(".message").show().removeClass("success info").addClass("error"), 
setTimeout(function(_this) {
return function() {
return _this.$(".message").hide().html("");
};
}(this), 4e3), error_html = "", _.each(errors, function(_this) {
return function(error) {
var name, temp;
return name = "", temp = $(_this.el).find("[for=" + error.field + "]"), "body" === error.field && (temp = $(_this.el).find("[for=statement]")), 
temp.length > 0 && ($(temp).addClass("error"), name = $(temp).html() + " "), _.each(error.errors, function(error_text) {
return error_html += name + error_text + "<br >";
});
};
}(this)), $(this.el).find(".message").show().html("<i class='icon-alert'>" + error_html + "</i>"), 
setTimeout(function(_this) {
return function() {
return _this.$(".message").hide().html("");
};
}(this), 4e3));
}, Manage_ChallengeEditView.prototype.renderTestCaseView = function() {
var _base;
if (!this.model.isNew()) return this.testcaseview || (this.testcaseview = new HR.Manage_TestCaseView({
challenge:this.model,
collection:HR.collection("test-case")
}), this.add_subview(this.testcaseview)), (_base = this.testcaseview.collection).challenge_id || (_base.challenge_id = this.model.id), 
this.testcaseview.collection.fetch({
success:function(_this) {
return function() {
return _this.testcaseview.render().setElement($(_this.el).find(".test-case")).render();
};
}(this)
});
}, Manage_ChallengeEditView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_ChallengeEditView = Manage_ChallengeEditView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_ChallengeListItemView, _ref;
return Manage_ChallengeListItemView = function(_super) {
function Manage_ChallengeListItemView() {
return Manage_ChallengeListItemView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_ChallengeListItemView, _super), Manage_ChallengeListItemView.prototype.template = "manage/challenge-list-item", 
Manage_ChallengeListItemView.prototype["class"] = "dummy", Manage_ChallengeListItemView.prototype.events = {
"click .delete":"confirmDelete"
}, Manage_ChallengeListItemView.prototype.initialize = function(options) {
return this.index = options.index, this.has_template = !1, this.rendered = !1, this.listenTo(this.model, "change", this.render), 
this.listenTo(this.model, "reset", this.render);
}, Manage_ChallengeListItemView.prototype.confirmDelete = function(e) {
var dialog_options;
return e.preventDefault(), dialog_options = {
title:"Confirm Delete",
body:"<div class='row'> Are you sure you want to delete " + this.model.get("name") + " challenge? </div> <div class='row' style='margin-top:20px;'> <div class='span2 pull-right' > <a class='btn btn-green confirm-yes' href='#'>Yes</a> <a class='btn btn-green confirm-no' href='#'>No</a> </div> </div>",
events:{
"click .confirm-yes":function(_this) {
return function(e) {
return e.preventDefault(), _this["delete"](), _this.dialog.destroy();
};
}(this),
"click .confirm-no":function(_this) {
return function(e) {
return e.preventDefault(), _this.dialog.destroy();
};
}(this)
}
}, this.dialog = new HR.util.ShowConfirmationDialog(dialog_options), this.dialog.render();
}, Manage_ChallengeListItemView.prototype["delete"] = function() {
return HR.util.ajaxmsg("Deleting...", !0, !0), this.model.destroy({
success:function(_this) {
return function(model, resp) {
return "deleted" === resp.status ? $(_this.el).html("") :void 0;
};
}(this)
});
}, Manage_ChallengeListItemView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this;
}, Manage_ChallengeListItemView.prototype.renderView = function() {
return this.has_template ? $(this.el).html(this._template({
model:this.model.toJSON(),
index:this.index
})) :void 0;
}, Manage_ChallengeListItemView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_ChallengeListItemView = Manage_ChallengeListItemView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_ChallengeListView, _ref;
return Manage_ChallengeListView = function(_super) {
function Manage_ChallengeListView() {
return Manage_ChallengeListView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_ChallengeListView, _super), Manage_ChallengeListView.prototype.template = "manage/challenge-list", 
Manage_ChallengeListView.prototype["class"] = "dummy", Manage_ChallengeListView.prototype.initialize = function() {
return this.has_template = !1, this.rendered = !1, this.listenTo(this.collection, "change", this.render), 
this.listenTo(this.collection, "reset", this.render);
}, Manage_ChallengeListView.prototype.events = {
"keyup input.search":"filterList"
}, Manage_ChallengeListView.prototype.filterList = function(e) {
var query;
return e.preventDefault(), 13 === e.keyCode ? (query = $(this.el).find("input.search").val(), 
this.collection.setFilter(query), this.collection.fetch({
success:function(_this) {
return function() {
return _this.collection.trigger("reset");
};
}(this)
})) :void 0;
}, Manage_ChallengeListView.prototype.render = function() {
return $(this.el).html(HR.appController.viewLoader(64)), this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this;
}, Manage_ChallengeListView.prototype.renderView = function() {
return this.has_template ? ($(this.el).html(this._template({
collection:this.collection
})), HR.util.pagination($(this.el).find(".pagination-wrapper"), this.collection.getTotal(), this.collection.pageURL(), this.collection.getCurrentPage(), null, this.collection.getLimit()), 
_.each(this.collection.models, function(model, index) {
var _view;
return _view = new HR.Manage_ChallengeListItemView({
model:model,
index:10 * (this.collection.page - 1) + index + 1
}), $(this.el).find(".challenge-list-wrapper").append(_view.render().el), this.add_subview(_view);
}, this), HR.util.ajaxmsg("Loading...", !0, !0, .5)) :void 0;
}, Manage_ChallengeListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_ChallengeListView = Manage_ChallengeListView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_ContestAccessView, _ref;
return Manage_ContestAccessView = function(_super) {
function Manage_ContestAccessView() {
return Manage_ContestAccessView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_ContestAccessView, _super), Manage_ContestAccessView.prototype.template = "manage/contest-access", 
Manage_ContestAccessView.prototype["class"] = "dummy", Manage_ContestAccessView.prototype.initialize = function() {
return this.has_template = !1, this.rendered = !1, this.listenTo(this.collection, "add", this.render), 
this.listenTo(this.collection, "change", this.render), this.listenTo(this.collection, "reset", this.render), 
this.listenTo(this.collection, "destroy", this.render);
}, Manage_ContestAccessView.prototype.events = {
"click .add_emails ":"add_emails",
"click .add_hacker":"add_hacker",
"click .delete":"delete_item"
}, Manage_ContestAccessView.prototype.add_emails = function(e) {
var emails, emails_s;
return e.preventDefault(), emails_s = $(this.el).find(".emails").val().trim(), emails = emails_s.split(","), 
_.each(emails, function(_this) {
return function(email) {
var _model;
return _model = new HR.ContestAccessModel(), _model.setContestId(_this.collection.getContestId()), 
_model.set({
email:email
}), _model.save(null, {
success:function(model, resp) {
return resp.error ? void 0 :_this.collection.add(model);
}
});
};
}(this));
}, Manage_ContestAccessView.prototype.add_hacker = function(e) {
var _model;
return e.preventDefault(), _model = new HR.ContestAccessModel(), _model.setContestId(this.collection.getContestId()), 
_model.set({
username:$(this.el).find(".hacker").val()
}), _model.save(null, {
success:function(_this) {
return function(model, resp) {
return resp.error ? $(_this.el).find(".hacker_error").html("" + resp.error) :_this.collection.add(model);
};
}(this)
});
}, Manage_ContestAccessView.prototype.delete_item = function(e) {
var $el, id, _model;
return e.preventDefault(), $el = $(e.target), id = $el.data("id"), _model = this.collection.get(id), 
_model.setContestId(this.collection.getContestId()), _model.destroy();
}, Manage_ContestAccessView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this;
}, Manage_ContestAccessView.prototype.renderView = function() {
var hackers;
return this.has_template ? ($(this.el).html(this._template({
collection:this.collection.toJSON()
})), hackers = [], _.each(this.collection.models, function() {
return function(model) {
return model.get("username") ? hackers.push(model.get("username")) :void 0;
};
}(this)), this.$(".hacker").unbind(), this.$(".hacker").typeahead({
minLength:3,
menu:'<ul class="typeahead dropdown-menu clear-margin"></ul>',
source:function() {
return function(process, query) {
return $.ajax({
url:"/rest/hackers/autocomplete?q=" + query + "&without=" + hackers.join(","),
type:"GET",
success:function(resp) {
return process.process(resp);
}
});
};
}(this)
})) :void 0;
}, Manage_ContestAccessView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_ContestAccessView = Manage_ContestAccessView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_ContestEditView, _ref;
return Manage_ContestEditView = function(_super) {
function Manage_ContestEditView() {
return Manage_ContestEditView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_ContestEditView, _super), Manage_ContestEditView.prototype.template = "manage/contest-edit", 
Manage_ContestEditView.prototype["class"] = "dummy", Manage_ContestEditView.prototype.initialize = function(options) {
return this.autocreate_slug = !0, this.has_template = !1, this.rendered = !1, this.listenTo(this.model, "change", this.render), 
this.listenTo(this.model, "reset", this.render), options.current_tab && (this.current_tab = options.current_tab), 
this.model.isNew() || (this.autocreate_slug = !1, this.model.fetch({
error:function() {
return HR.router.e404();
}
})), this.current_hacker = HR.profile();
}, Manage_ContestEditView.prototype.events = {
"click .save":"save",
"click #newTemplate":"newTemplate",
"click #editTemplate":"editTemplate",
"click #previewTemplate":"previewTemplate",
"click [data-id]":"setCurrentTemplate",
"click .circle_add":"add_circle",
"click .circle_remove":"remove_circle",
"keyup #name":"nameChanged",
"keyup #slug":"slugChanged"
}, Manage_ContestEditView.prototype.tabChanged = function(e) {
return this.current_tab = $(e.target).attr("data-target").slice(1), HR.router.navigate("/manage/contest/edit/" + this.model.get("slug") + "/" + this.current_tab, {
trigger:!1
});
}, Manage_ContestEditView.prototype.slugChanged = function() {
return this.autocreate_slug = !1, this.$("#contest-url").html("https://hackerrank.com/" + this.$("#slug").val()), 
this.$("#contest-url").attr("href", "https://hackerrank.com/" + this.$("#slug").val()), 
this;
}, Manage_ContestEditView.prototype.nameChanged = function() {
return this.autocreate_slug && (this.$("#slug").val(HR.util.slugify(this.$("#name").val())), 
this.$("#contest-url").html("https://hackerrank.com/" + this.$("#slug").val()), 
this.$("#contest-url").attr("href", "https://hackerrank.com/" + this.$("#slug").val())), 
this;
}, Manage_ContestEditView.prototype.add_circle = function() {
var alt, circles, prizes, src, text;
return prizes = this.model.get("prizes"), circles = prizes.circles || [], src = this.$("#circle_src").val(), 
alt = this.$("#circle_alt").val(), text = this.$("#circle_text").val(), this.setData(), 
circles.push({
src:src,
alt:alt,
text:text
}), this.model.set({
prizes:{
circles:circles,
tagline:this.$("#prizes_tagline").val()
}
}), this.model_save(), this;
}, Manage_ContestEditView.prototype.remove_circle = function(e) {
var circles, new_circles, prizes, remove_index;
return this.setData(), remove_index = $(e.target).data("index"), prizes = this.model.get("prizes"), 
circles = prizes.circles || [], new_circles = [], _.each(circles, function() {
return function(circle, index) {
return index !== remove_index ? new_circles.push(circle) :void 0;
};
}(this)), this.model.set({
prizes:{
circles:new_circles,
tagline:this.$("#prizes_tagline").val()
}
});
}, Manage_ContestEditView.prototype.setCurrentTemplate = function(e) {
var $el;
return $el = $(e.target), this.template_id = $el.data("id"), $(this.el).find("span#templateSlug").html($el.html()), 
$el.data("sample") === !0 ? $(this.el).find("#editTemplate").hide() :$(this.el).find("#editTemplate").show();
}, Manage_ContestEditView.prototype.editTemplate = function(e) {
return e.preventDefault(), window.open("/manage/template/edit/" + this.template_id);
}, Manage_ContestEditView.prototype.previewTemplate = function(e) {
return e.preventDefault(), window.open("/rest/templates/" + this.template_id + "/preview?contest_id=" + this.model.get("id"));
}, Manage_ContestEditView.prototype.newTemplate = function(e) {
var dialog_options, properties;
return e.preventDefault(), this.dialog = !0, dialog_options = {
title:"Add New Template",
width:275,
body:"<div class='loader'>" + HR.appController.viewLoader(64) + "</div> <form class='hide'> <div class='row'> <div class='span4'> <label>Select Sample Template</label> </div> </div> <div class='row'> <div class='span4'> <select id='sample_id' class='span4 input_text'> </select> </div> </div> <div class='row'> <div class='span4'> <a id='preview' target='_blank' href='#'>Preview</a> </div> </div> <div class='row'> <div class='span4' style='text-align:right;' > <a class='btn btn-green save_template' href='#'>Add Template</a> </div> </div> </form>",
events:{
"click .save_template":function(_this) {
return function(e) {
var attr, dialog;
return e.preventDefault(), dialog = e.data.$dialog, attr = {
contest_id:_this.model.get("id"),
sample_id:$(dialog).find("#sample_id").val()
}, $.ajax({
url:"/rest/templates",
type:"POST",
data:attr,
success:function(resp) {
return resp.model ? (_this.log("MSOF"), _this.model.fetch(), _this.dialog.destroy()) :void 0;
}
});
};
}(this),
"click .close":function(_this) {
return function(e) {
return e.preventDefault(), _this.dialog.destroy();
};
}(this),
"click #preview":function(_this) {
return function(e) {
return e.preventDefault(), window.open("/rest/templates/" + _this.dialog.$body().find("#sample_id").val() + "/preview?contest_id=" + _this.model.get("id"), "_blank");
};
}(this)
}
}, properties = {
updateData:function(_this) {
return function(model) {
var sample_html, samples;
return samples = model.get("sample_templates"), sample_html = "", _.each(samples, function(sample) {
var html;
return html = "<option value='" + sample.id + "'>" + sample.slug + "</option>", 
sample_html += html;
}), _this.dialog.$body().find("#sample_id").html(sample_html), _this.dialog.$body().find(".loader").hide(), 
_this.dialog.$body().find("form").show();
};
}(this)
}, this.dialog = new HR.util.ShowDialog(dialog_options, properties), this.dialog.render().updateData(this.model);
}, Manage_ContestEditView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this.current_tab && this.$("[data-toggle=tab][data-target=#" + this.current_tab + "]").trigger("click"), 
this;
}, Manage_ContestEditView.prototype.renderView = function() {
var $codeeditor, fields;
return this.has_template ? ($(this.el).html(this._template({
model:this.model.toJSON(),
_model:this.model,
current_hacker:this.current_hacker.toJSON()
})), $codeeditor = this.$("#description").get(0), HR.appController.loadCodeMirrorMode("html", function(_this) {
return function() {
var editorOptions;
return editorOptions = {
lineNumbers:!1,
lineWrapping:!0,
matchBrackets:!0,
minHeight:250,
mode:"text/html",
indentUnit:4,
value:_this.model.get("description")
}, $codeeditor ? (_this.editor = CodeMirror.fromTextArea($codeeditor, editorOptions), 
_this.editor.on("change", function() {
return _this.updatePreview();
}), _this.updatePreview()) :void 0;
};
}(this)), $(this.el).find("#stdate").datetimepicker(), $(this.el).find("#endate").datetimepicker(), 
this.picker_start = $(this.el).find("#stdate").data("datetimepicker"), this.picker_end = $(this.el).find("#endate").data("datetimepicker"), 
this.setDateTime(), fields = [ "submit_disabled", "penalty", "binary_scoring", "participant_restriction" ], 
this.current_hacker.get("is_admin") === !0 && (fields = _.union(fields, [ "hacker_application", "enable_olark", "public", "is_private" ])), 
_.each(fields, function(_this) {
return function(field) {
var $el;
return $el = $(_this.el).find("#" + field), $el.is("select") ? $el.val(field) :$el[0].checked = _this.model.get(field);
};
}(this)), this.template_id = this.model.get("template_id"), _.each(this.model.get("templates"), function(_this) {
return function(template) {
return template.id === _this.model.get("template_id") ? $(_this.el).find("span#templateSlug").html(template.slug) :void 0;
};
}(this)), HR.util.ajaxmsg("Loading...", !0, !0, .5), this.renderChallengeAssociationView(), 
this.renderContestAccessView(), this.model.isNew() || (this.renderModeratorsView(), 
this.renderNotifications()), this.$(".manage-switch").not(".has-switch").bootstrapSwitch()) :void 0;
}, Manage_ContestEditView.prototype.renderModeratorsView = function() {
var moderators, moderatorsview;
if (this.model.get("id")) return moderators = new HR.Manage_Moderators({
permissible_id:this.model.get("id"),
permissible_type:"Contest"
}), moderatorsview = new HR.Manage_ModeratorsView({
el:this.$(".moderators-view"),
collection:moderators
}), moderators.fetch({
disable_throbber:!0,
success:function() {
return moderatorsview.render();
}
});
}, Manage_ContestEditView.prototype.renderNotifications = function() {
var notification, notificationview;
return notification = HR.model("manage_-notification"), notification.set("contest_id", this.model.get("id")), 
notificationview = new HR.Manage_NotificationView({
model:notification,
contest:this.model,
el:this.$(".notifications-view")
}), notificationview.render(), this;
}, Manage_ContestEditView.prototype.setDateTime = function() {
var endtime, starttime;
return "" !== this.model.get("epoch_starttime") && null !== this.model.get("epoch_starttime") && 0 !== parseInt(this.model.get("epoch_starttime")) && (starttime = new Date(parseInt(this.model.get("epoch_starttime"))), 
$(this.el).find("#startDate").val($.format.date(starttime, "yyyy-MM-dd hh:mm")), 
this.picker_start.setLocalDate(starttime)), null !== this.model.get("epoch_endtime") && "" !== this.model.get("epoch_endtime") && 0 !== parseInt(this.model.get("epoch_endtime")) ? (endtime = new Date(parseInt(this.model.get("epoch_endtime"))), 
$(this.el).find("#endDate").val($.format.date(endtime, "yyyy-MM-dd hh:mm")), this.picker_end.setLocalDate(endtime)) :void 0;
}, Manage_ContestEditView.prototype.updatePreview = function() {
var that;
return that = this, HR.requires("sanitize", function() {
return function() {
var sanitized_text;
return sanitized_text = HackDown.processData(that.editor.getValue()), that.$("#descriptionPreview").html(sanitized_text);
};
}(this));
}, Manage_ContestEditView.prototype.scrollView = function() {
var editor, editor_height, editor_scroll_height, factor, preview, preview_height, preview_scroll_height, scrollTop;
return editor = $(this.el).find(".CodeMirror-scrollbar"), preview = $(this.el).find(".preview"), 
preview.height($(this.el).find(".CodeMirror").height()), editor_scroll_height = editor.prop("scrollHeight"), 
preview_scroll_height = preview.prop("scrollHeight"), editor_height = editor.height(), 
preview_height = preview.height(), 0 >= editor_scroll_height && (preview_scroll_height *= -1), 
factor = Math.abs((preview_scroll_height - preview_height) / (editor_scroll_height - editor_height) - 1), 
1 > factor && (factor = 1), scrollTop = this.editor.cursorCoords(!0, "local").y * factor, 
preview.stop(!0, !1).animate({
scrollTop:scrollTop
}, 200);
}, Manage_ContestEditView.prototype.setData = function(_callback) {
var data, epoch_endtime, epoch_starttime, fields, temp;
return null == _callback && (_callback = null), this.starttime = $(this.el).find("#startDate").val(), 
this.endtime = $(this.el).find("#endDate").val(), epoch_starttime = epoch_endtime = null, 
"" !== this.starttime.trim() && (epoch_starttime = new Date(this.starttime).getTime()), 
"" !== this.endtime.trim() && (epoch_endtime = new Date(this.endtime).getTime()), 
fields = [ "name", "slug", "submit_disabled", "penalty", "tagline", "binary_scoring", "description", "homepage_background_color", "homepage_background_image", "participant_restriction", "is_private" ], 
this.current_hacker.get("is_admin") === !0 && (fields = _.union(fields, [ "scoring_template", "faq_template", "cutoff_score", "hacker_application", "public", "notification", "enable_olark" ])), 
data = HR.util.formData($(this.el), fields), temp = {
notification:[ this.$("#notification").val() ],
description:this.editor.getValue(),
starttime:this.starttime,
endtime:this.endtime,
epoch_starttime:epoch_starttime,
epoch_endtime:epoch_endtime,
template_id:this.template_id
}, temp.prizes = "" !== this.$("#prizes_tagline").val() || this.model.get("prizes").circles && null !== this.model.get("prizes").circles && 0 !== this.model.get("prizes").circles.length ? {
tagline:this.$("#prizes_tagline").val(),
circles:this.model.get("prizes").circles || []
} :{}, _.extend(data, temp), this.model.set(data), null !== _callback && "object" != typeof _callback ? _callback() :void 0;
}, Manage_ContestEditView.prototype.save = function(e) {
return e.preventDefault(), _(this.challenges.models).each(function() {
return function(challenge) {
return challenge.dirty ? challenge.save() :void 0;
};
}(this)), this.setData(function(_this) {
return function() {
return _this.model_save();
};
}(this));
}, Manage_ContestEditView.prototype.model_save = function() {
return this.model.save({}, {
success:function(_this) {
return function(model, resp) {
return _this.parseErrors(resp.errors, resp.status);
};
}(this),
error:function(_this) {
return function() {
return $(_this.el).find(".message").show().removeClass("error success").addClass("info").html("<ul style='margin-left:15px'><li>Problem in Connecting to server.</li></ul>"), 
setTimeout(function() {
return _this.$(".message").hide().html("");
}, 4e3);
};
}(this)
});
}, Manage_ContestEditView.prototype.parseErrors = function(errors, status) {
var error_html;
return status ? ($(this.el).find(".message").show().removeClass("error").addClass("success").html("<i class='icon-ok'>Your changes have been saved.</i>"), 
setTimeout(function(_this) {
return function() {
return $(_this.el).find(".message").hide().html("");
};
}(this), 4e3)) :($(this.el).find(".message").show().removeClass("success").addClass("error"), 
setTimeout(function(_this) {
return function() {
return _this.$(".message").hide().html("");
};
}(this), 4e3), error_html = _.map(errors, function(_this) {
return function(error) {
return _this.$("[for=" + error.split(" ")[0].toLowerCase() + "]").addClass("error"), 
"<br>" + error;
};
}(this)).join(""), $(this.el).find(".message").show().html("<i class='icon-alert'>" + error_html + "</i>"));
}, Manage_ContestEditView.prototype.renderContestAccessView = function() {
var _challenges, _contest_access, _view;
if (!this.model.isNew() && this.model.get("id") && this.model.get("participant_restriction") !== !1) return _contest_access = _challenges = HR.appController.getCollection("contestaccess", "contest-" + this.model.get("id"), function(_this) {
return function(collection) {
return collection.setContestId(_this.model.get("id")), collection.fetch();
};
}(this), !1, !1), _view = new HR.Manage_ContestAccessView({
collection:_contest_access
}), _view.setElement($(this.el).find(".contestaccess")).render(), this.add_subview(_view);
}, Manage_ContestEditView.prototype.renderChallengeAssociationView = function() {
return this.model.get("id") && !this.model.isNew() && this.model.get("id") ? (this.challenges = HR.collection("challenge-association"), 
this.challenges.setContestId(this.model.get("id")), this.challenges.fetch({
success:function(_this) {
return function() {
var _view;
return _view = new HR.Manage_ChallengeAssociationView({
collection:_this.challenges,
contest:_this.model
}), _view.setElement($(_this.el).find(".hr_challenge-associations")).render(), _this.add_subview(_view);
};
}(this)
})) :void 0;
}, Manage_ContestEditView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_ContestEditView = Manage_ContestEditView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_ContestListItemView, _ref;
return Manage_ContestListItemView = function(_super) {
function Manage_ContestListItemView() {
return Manage_ContestListItemView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_ContestListItemView, _super), Manage_ContestListItemView.prototype.template = "manage/contest-list-item", 
Manage_ContestListItemView.prototype["class"] = "dummy", Manage_ContestListItemView.prototype.events = {
"click .delete":"confirmDelete"
}, Manage_ContestListItemView.prototype.initialize = function(options) {
return this.index = options.index, this.has_template = !1, this.rendered = !1, this.listenTo(this.model, "change", this.render), 
this.listenTo(this.model, "reset", this.render);
}, Manage_ContestListItemView.prototype.confirmDelete = function(e) {
var dialog_options;
return e.preventDefault(), dialog_options = {
title:"Confirm Delete",
body:"<div class='row'> Are you sure you want to delete " + this.model.get("name") + "? </div> <div class='row' style='margin-top:20px;'> <div class='span2 pull-right' > <a class='btn btn-green confirm-yes' href='#'>Yes</a> <a class='btn btn-green confirm-no' href='#'>No</a> </div> </div>",
events:{
"click .confirm-yes":function(_this) {
return function(e) {
return e.preventDefault(), _this["delete"](), _this.dialog.destroy();
};
}(this),
"click .confirm-no":function(_this) {
return function(e) {
return e.preventDefault(), _this.dialog.destroy();
};
}(this)
}
}, this.dialog = new HR.util.ShowConfirmationDialog(dialog_options), this.dialog.render();
}, Manage_ContestListItemView.prototype["delete"] = function() {
return HR.util.ajaxmsg("Deleting...", !0, !0), this.model.destroy({
success:function(_this) {
return function(model, resp) {
return "deleted" === resp.status ? $(_this.el).html("") :void 0;
};
}(this)
});
}, Manage_ContestListItemView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this;
}, Manage_ContestListItemView.prototype.renderView = function() {
var status;
return this.has_template ? (status = "Not Available", status = this.model.get("started") === !0 && this.model.get("ended") === !0 ? "Ended" :this.model.get("started") === !0 && this.model.get("ended") === !1 ? "Going On" :"Not Started", 
$(this.el).html(this._template({
model:this.model.toJSON(),
index:this.index,
status:status
}))) :void 0;
}, Manage_ContestListItemView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_ContestListItemView = Manage_ContestListItemView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_ContestListView, _ref;
return Manage_ContestListView = function(_super) {
function Manage_ContestListView() {
return Manage_ContestListView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_ContestListView, _super), Manage_ContestListView.prototype.template = "manage/contest-list", 
Manage_ContestListView.prototype["class"] = "dummy", Manage_ContestListView.prototype.initialize = function() {
return this.has_template = !1, this.rendered = !1, this.listenTo(this.collection, "change", this.render), 
this.listenTo(this.collection, "reset", this.render);
}, Manage_ContestListView.prototype.events = {
"keyup input.search":"filterList"
}, Manage_ContestListView.prototype.filterList = function(e) {
var query;
return e.preventDefault(), 13 === e.keyCode ? (query = $(this.el).find("input.search").val(), 
this.collection.setFilter(query), this.collection.fetch({
success:function(_this) {
return function() {
return _this.collection.trigger("reset");
};
}(this)
})) :void 0;
}, Manage_ContestListView.prototype.render = function() {
return $(this.el).html(HR.appController.viewLoader(64)), this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this;
}, Manage_ContestListView.prototype.renderView = function() {
return this.has_template ? ($(this.el).html(this._template({
collection:this.collection,
query:this.collection.query
})), HR.util.pagination($(this.el).find(".pagination-wrapper"), this.collection.getTotal(), this.collection.pageURL(), this.collection.getCurrentPage(), null, this.collection.getLimit()), 
_.each(this.collection.models, function(model, index) {
var _view;
return _view = new HR.Manage_ContestListItemView({
model:model,
index:10 * (this.collection.page - 1) + index + 1
}), $(this.el).find(".contest-list-wrapper").append(_view.render().el), this.add_subview(_view);
}, this), HR.util.ajaxmsg("Loading...", !0, !0, .5)) :void 0;
}, Manage_ContestListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_ContestListView = Manage_ContestListView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_NotificationView, _ref;
return Manage_NotificationView = function(_super) {
function Manage_NotificationView() {
return Manage_NotificationView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_NotificationView, _super), Manage_NotificationView.prototype.template = "manage/emailnotification-send", 
Manage_NotificationView.prototype.setContest = function(contest) {
return this.contest = contest, this.challenges = {}, this.model.set("contest_id", contest.get("id")), 
this.challengeassociations = new HR.ChallengeAssociationCollection(), this.challengeassociations.getAll = !0, 
this.challengeassociations.setContestId(contest.get("id"));
}, Manage_NotificationView.prototype.initialize = function(options) {
return this.challenges = {}, options.contest && this.setContest(options.contest), 
options.el ? this.el = options.el :void 0;
}, Manage_NotificationView.prototype.events = {
"submit form":"sendEmails",
"change #email-notif-recipient-type":"recipientTypeChanged"
}, Manage_NotificationView.prototype.setRecipientDsl = function() {
var challenge_id, rdsl;
return rdsl = this.$("#email-notif-recipient-type").val().toLowerCase(), challenge_id = this.$("#email-notif-challenge-input").val(), 
"all" !== rdsl && "submitted-*" !== rdsl && challenge_id && (rdsl += "-" + challenge_id), 
this.model.set("recipient_dsl", rdsl);
}, Manage_NotificationView.prototype.sendEmails = function() {
return this.$(".send-btn").attr("disabled", "disabled"), this.model.set("message", this.$("#email-notif-message").val()), 
this.model.set("subject", this.$("#email-notif-subject").val()), this.model.set("type", this.$("#notif-type").val()), 
this.model.set("id", void 0), this.setRecipientDsl(), setTimeout(function() {
return this.$(".send-btn").removeAttr("disabled");
}, 2e4), this.model.save({}, {
success:function() {
return this.$(".error").html("Sent!"), setTimeout(function() {
return this.$(".error").html("");
}, 18e3);
},
error:function() {
return this.$(".error").html("Failed!"), setTimeout(function() {
return this.$(".error").html("");
}, 18e3);
}
});
}, Manage_NotificationView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView(), this.model.get("contest_id") ? this.challengeassociations.fetch({
success:function(_this) {
return function() {
return _.each(_this.challengeassociations.models, function(mdl) {
return _this.challenges[mdl.get("challenge_name")] = mdl.get("challenge_id");
}), _this.challenge_autocomp = [], _.each(_this.challenges, function(cid, cname) {
return _this.challenge_autocomp.push({
id:cid,
text:cname
});
}), $(function() {
return _this.$("#email-notif-challenge-input").select2({
data:_this.challenge_autocomp
});
});
};
}(this)
}) :void 0;
}, this), this;
}, Manage_NotificationView.prototype.renderView = function() {
return this.has_template ? $(this.el).html(this._template({
model:this.model.toJSON(),
contest:this.contest.toJSON()
})) :void 0;
}, Manage_NotificationView.prototype.recipientTypeChanged = function(evnt) {
return "All" === evnt.srcElement.value ? this.$("#email-notif-challenge-input").select2("destroy").hide() :this.$("#email-notif-challenge-input").show().select2({
data:this.challenge_autocomp
});
}, Manage_NotificationView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_NotificationView = Manage_NotificationView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_HackerApplicationsItemView, _ref;
return Manage_HackerApplicationsItemView = function(_super) {
function Manage_HackerApplicationsItemView() {
return Manage_HackerApplicationsItemView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_HackerApplicationsItemView, _super), Manage_HackerApplicationsItemView.prototype.template = "manage/hacker-applications-item", 
Manage_HackerApplicationsItemView.prototype["class"] = "dummy", Manage_HackerApplicationsItemView.prototype.getVisaStatus = function(visa_status) {
var visas;
return visas = {
not_applicable:"Not Applicable",
available:"Available",
not_available:"Not Available"
}, visas[visa_status] ? visas[visa_status] :"Not Available";
}, Manage_HackerApplicationsItemView.prototype.getRole = function(role) {
var roles;
return roles = {
intern:"Intern",
fulltime:"Full Time"
}, roles[role] ? roles[role] :"Not Available";
}, Manage_HackerApplicationsItemView.prototype.initialize = function(options) {
return this.contest = options.contest, this.key = options.key, this.index = options.index, 
this.hackerId = options.hacker_id, this.listenTo(this.model, "change", this.render), 
this.listenTo(this.model, "reset", this.render);
}, Manage_HackerApplicationsItemView.prototype.events = {
"click .change-tab":"renderChallengeTab"
}, Manage_HackerApplicationsItemView.prototype.renderChallengeTab = function(e) {
var ele;
return ele = $(e.target), this.challenge_models[ele.attr("data-id")].fetch({
disableThrobber:!0
});
}, Manage_HackerApplicationsItemView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this;
}, Manage_HackerApplicationsItemView.prototype.renderView = function() {
var _model;
return this.has_template ? (_model = this.model.toJSON(), $(this.el).html(this._template({
model:_model,
index:this.index,
visa_status:this.getVisaStatus(this.model.get("visa_status")),
role:this.getRole(this.model.get("role"))
})), this.challenge_models = new Object(), _.each(_model.challenges, function(challenge) {
var _view;
return this.challenge_models[challenge.id] = HR.appController.getModel("hackerchallenge", "hacker-" + _model.hacker_id + "-" + challenge.id, function(_this) {
return function(model) {
return model.setKey(_this.key), model.setHackerId(_model.hacker_id), model.setId(challenge.id), 
model.setContest(_this.contest.toJSON());
};
}(this), !1), _view = new HR.Manage_HackerChallengeView({
model:this.challenge_models[challenge.id]
}), _view.setElement($(this.el).find(".tab-content #" + challenge.slug + "-" + this.index)), 
this.add_subview(_view);
}, this)) :void 0;
}, Manage_HackerApplicationsItemView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_HackerApplicationsItemView = Manage_HackerApplicationsItemView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_HackerApplicationsView, _ref;
return Manage_HackerApplicationsView = function(_super) {
function Manage_HackerApplicationsView() {
return Manage_HackerApplicationsView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_HackerApplicationsView, _super), Manage_HackerApplicationsView.prototype.template = "manage/hacker-applications", 
Manage_HackerApplicationsView.prototype["class"] = "dummy", Manage_HackerApplicationsView.prototype.initialize = function(options) {
return this.contest = options.contest, this.listenTo(this.collection, "change", this.render), 
this.listenTo(this.collection, "reset", this.render);
}, Manage_HackerApplicationsView.prototype.events = {
"click [data-kind]":"filter_data"
}, Manage_HackerApplicationsView.prototype.render = function() {
return this.log("Rendering..."), this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this;
}, Manage_HackerApplicationsView.prototype.filter_data = function(e) {
var ele, filter, kind;
return e.preventDefault(), ele = $(e.target), kind = ele.data("kind"), filter = ele.data("filter"), 
$(this.el).find(".applications-list-wrapper").html('<div class="block-center text-center"> <img src="https://d3rpyts3de3lx8.cloudfront.net/hackerrank/hackerrank_spinner_64x64.gif"><br/><br/> Please wait while we fetch the applications </div>'), 
this.collection[kind] = filter, this.collection.setPage(1), this.collection.fetch({
disableThrobber:!0
}), $(this.el).find("[data-kind=" + kind + "][data-filter]").show(), $(this.el).find("[data-kind=" + kind + "][data-filter=" + filter + "]").hide(), 
"" !== filter ? $(this.el).find("[data-title=" + kind + "]").html($(this.el).find("[data-kind=" + kind + "][data-filter=" + filter + "]").html()) :void 0;
}, Manage_HackerApplicationsView.prototype.renderView = function() {
var country, filters, role, visa, _statement;
return this.has_template ? ($(this.el).html(this._template({
contest:this.contest,
company:this.collection.companyId,
key:this.collection.key
})), country = _.isEmpty(this.collection.country) ? "All" :$(this.el).find("[data-filter=" + this.collection.country + "]").html().trim(), 
visa = _.isEmpty(this.collection.visa) ? "any" :$(this.el).find("[data-filter=" + this.collection.visa + "]").html().trim(), 
role = _.isEmpty(this.collection.role) ? "any role" :$(this.el).find("[data-filter=" + this.collection.role + "]").html().trim(), 
_statement = "Currently showing <strong>" + country + "</strong> hacker(s) who have applied for <strong>" + role + "</strong> and have <strong>" + visa + "</strong>", 
$(this.el).find("#filter_text").html(_statement), filters = this.collection.getFilterString().split("-"), 
_.each(filters, function(_this) {
return function(filter, index) {
var kind;
return kind = $(_this.el).find("[data-title]:eq(" + index + ")").data("title"), 
$(_this.el).find("[data-kind=" + kind + "][data-filter]").show(), $(_this.el).find("[data-kind=" + kind + "][data-filter=" + filter + "]").hide(), 
"" !== filter ? $(_this.el).find("[data-title=" + kind + "]").html($(_this.el).find("[data-kind=" + kind + "][data-filter=" + filter + "]").html()) :void 0;
};
}(this)), HR.util.pagination($(this.el).find(".pagination-wrapper"), this.collection.getTotal(), this.collection.pageURL(), this.collection.getCurrentPage(), this.collection, this.collection.getLimit()), 
0 === this.collection.getTotal() ? $(this.el).find(".applications-list-wrapper").html("<p class='text-center'>None of the valid candidate has applied yet.</p>") :this.collection.getTotal() > 0 && $(this.el).find(".applications-list-wrapper").html(""), 
_.each(this.collection.models, function(_model, index) {
var _view;
return _view = new HR.Manage_HackerApplicationsItemView({
contest:this.contest,
model:_model,
index:(this.collection.page - 1) * this.collection.getLimit() + index + 1,
key:this.collection.key
}), $(this.el).find(".applications-list-wrapper").append(_view.render().el), this.add_subview(_view);
}, this)) :void 0;
}, Manage_HackerApplicationsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_HackerApplicationsView = Manage_HackerApplicationsView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_HackerChallengeView, _ref;
return Manage_HackerChallengeView = function(_super) {
function Manage_HackerChallengeView() {
return Manage_HackerChallengeView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_HackerChallengeView, _super), Manage_HackerChallengeView.prototype.template = "manage/hacker-challenges", 
Manage_HackerChallengeView.prototype["class"] = "dummy", Manage_HackerChallengeView.prototype.initialize = function() {
return this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "reset", this.render);
}, Manage_HackerChallengeView.prototype.events = {
"click [data-toggle=tab]":"switchCode"
}, Manage_HackerChallengeView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this;
}, Manage_HackerChallengeView.prototype.changeLanguage = function(lang_code) {
var mode_code;
return mode_code = lang_code, "c" === lang_code && (mode_code = "csrc"), "cpp" === lang_code && (mode_code = "c++src"), 
this.editor.setOption("mode", "text/x-" + mode_code);
}, Manage_HackerChallengeView.prototype.switchCode = function(e) {
var ele, index, submissions;
return e.preventDefault(), ele = $(e.target), index = ele.data("index"), submissions = this.model.get("submissions"), 
this.changeLanguage(submissions[index].language), this.editor.setValue(submissions[index].code), 
$(this.el).find("#language h5").html(lang_display_mapping[submissions[index].language]), 
$(this.el).find("#time_ago h5").html(submissions[index].time_ago);
}, Manage_HackerChallengeView.prototype.renderView = function() {
var $codeeditor, editorOptions, _model;
return this.has_template && this.model.get("submissions") ? (_model = this.model.toJSON(), 
$(this.el).html(this._template({
model:_model
})), editorOptions = {
lineNumbers:!0,
lineWrapping:!0,
matchBrackets:!0,
readOnly:!0,
mode:"text/x-markdown",
indentUnit:4
}, $codeeditor = this.$("#hacker_code").get(0), HR.appController.loadCodeMirrorMode("markdown", function(_this) {
return function() {
return $codeeditor ? (_this.editor = CodeMirror.fromTextArea($codeeditor, editorOptions), 
$(_this.el).find(".nav li:first a").trigger("click")) :void 0;
};
}(this))) :void 0;
}, Manage_HackerChallengeView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_HackerChallengeView = Manage_HackerChallengeView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_HackerSubmissionsItemView, _ref;
return Manage_HackerSubmissionsItemView = function(_super) {
function Manage_HackerSubmissionsItemView() {
return Manage_HackerSubmissionsItemView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_HackerSubmissionsItemView, _super), Manage_HackerSubmissionsItemView.prototype.template = "manage/hacker-submissions-item", 
Manage_HackerSubmissionsItemView.prototype["class"] = "dummy", Manage_HackerSubmissionsItemView.prototype.initialize = function(options) {
return this.contest = options.contest, this.index = options.index, this.filterString = options.filterString, 
this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "reset", this.render);
}, Manage_HackerSubmissionsItemView.prototype.events = {
"click .change-tab":"renderChallengeTab"
}, Manage_HackerSubmissionsItemView.prototype.renderChallengeTab = function(e) {
var ele;
return e.preventDefault(), ele = $(e.target), ele.data("id") && this.challenge_models[ele.attr("data-id")].fetch({
disableThrobber:!0
}), $(this.el).find(".tab-pane").removeClass("active").fadeOut(), $(this.el).find(".tab-pane" + ele.attr("href")).fadeIn().addClass("active");
}, Manage_HackerSubmissionsItemView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this;
}, Manage_HackerSubmissionsItemView.prototype.renderView = function() {
var _model;
return this.has_template ? (_model = this.model.toJSON(), $(this.el).html(this._template({
model:_model,
index:this.index
})), this.challenge_models = new Object(), _.each(_model.challenges, function(challenge) {
var _view;
return this.challenge_models[challenge.id] = HR.appController.getModel("hackerchallenge", "hacker-" + _model.id + "-" + challenge.id + "-filter-" + this.filterString, function(_this) {
return function(model) {
return model.setHackerId(_model.id), model.setId(challenge.id), model.setFilterString(_this.filterString), 
model.setContest(_this.contest);
};
}(this), !1), _view = new HR.Manage_HackerChallengeView({
model:this.challenge_models[challenge.id]
}), _view.setElement($(this.el).find(".tab-content #" + challenge.slug + "-" + this.index)), 
this.add_subview(_view);
}, this)) :void 0;
}, Manage_HackerSubmissionsItemView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_HackerSubmissionsItemView = Manage_HackerSubmissionsItemView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_HackerSubmissionsView, _ref;
return Manage_HackerSubmissionsView = function(_super) {
function Manage_HackerSubmissionsView() {
return Manage_HackerSubmissionsView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_HackerSubmissionsView, _super), Manage_HackerSubmissionsView.prototype.template = "manage/hacker-submissions", 
Manage_HackerSubmissionsView.prototype["class"] = "dummy", Manage_HackerSubmissionsView.prototype.initialize = function() {
var key;
return this.listenTo(this.collection, "change", this.render), this.listenTo(this.collection, "reset", this.render), 
key = "id-" + this.collection.contestSlug, this.contest = HR.appController.getModel("managecontest", key, function(_this) {
return function(model) {
return model.setId(_this.collection.contestSlug), model.sync_status ? void 0 :model.fetch();
};
}(this), !1), this.listenTo(this.contest, "change", this.render), this.listenTo(this.contest, "reset", this.render);
}, Manage_HackerSubmissionsView.prototype.events = {
"click .filter_remove":"removeFilter",
"click .filter_add":"addFilter",
"click .filter_apply":"applyFilter"
}, Manage_HackerSubmissionsView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this;
}, Manage_HackerSubmissionsView.prototype.addFilter = function(e) {
var $el, kind, value;
return e.preventDefault(), $el = $(e.target), kind = $el.data("kind"), value = this.$("#input_" + kind).val(), 
this.collection.addFilter(kind, value), Backbone.history.navigate("/manage/contests/" + this.collection.contestSlug + "/all_submissions/" + this.collection.getFilterString() + "/", !0);
}, Manage_HackerSubmissionsView.prototype.removeFilter = function(e) {
var $el, kind, value;
return $el = $(e.target), value = $el.data("value"), kind = $el.data("kind"), this.collection.removeFilter(kind, value), 
Backbone.history.navigate("/manage/contests/" + this.collection.contestSlug + "/all_submissions/" + this.collection.getFilterString() + "/", !0);
}, Manage_HackerSubmissionsView.prototype.applyFilter = function() {
return this.collection.addFilter("start_date", $(this.el).find("#startDate").val()), 
this.collection.addFilter("end_date", $(this.el).find("#endDate").val()), this.collection.addFilter("status", $(this.el).find("input:radio[name=status]:checked").val() || "all"), 
Backbone.history.navigate("/manage/contests/" + this.collection.contestSlug + "/all_submissions/" + this.collection.getFilterString() + "/", !0);
}, Manage_HackerSubmissionsView.prototype.setDateTime = function() {
var endtime, starttime;
return null !== this.collection.getFilters().start_date && "" !== this.collection.getFilters().start_date.trim() && (starttime = new Date(this.collection.getFilters().start_date), 
$(this.el).find("#startDate").val($.format.date(starttime, "yyyy-MM-dd hh:mm")), 
$(this.el).find("#stdate").datetimepicker("setLocalDate", starttime)), null !== this.collection.getFilters().end_date && "" !== this.collection.getFilters().end_date.trim() ? (endtime = new Date(this.collection.getFilters().end_date), 
$(this.el).find("#endDate").val($.format.date(endtime, "yyyy-MM-dd hh:mm")), $(this.el).find("#endate").datetimepicker("setLocalDate", endtime)) :void 0;
}, Manage_HackerSubmissionsView.prototype.renderView = function() {
if (this.has_template && this.collection.sync_status && this.contest.sync_status) {
if ($(this.el).html(this._template({
filters:this.collection.getFilters(),
contestSlug:this.collection.contestSlug,
contest:this.contest.toJSON()
})), $(".typeahead.dropdown-menu").remove(), this.$(".input_challenges").unbind(), 
this.$(".input_challenges").typeahead({
minLength:3,
menu:'<ul class="typeahead dropdown-menu margin-0" "margin:0px;"></ul>',
source:function(_this) {
return function(process, query) {
return $.ajax({
url:"/rest/contests/" + _this.collection.contestSlug + "/challenges/autocomplete?q=" + query + "&without=" + _this.collection.getFilters().challenges.join(","),
type:"GET",
success:function(resp) {
return process.process(resp);
}
});
};
}(this)
}), this.$(".input_hackers").unbind(), this.$(".input_hackers").typeahead({
minLength:3,
menu:'<ul class="typeahead dropdown-menu margin-0" "margin:0px;"></ul>',
source:function(_this) {
return function(process, query) {
return $.ajax({
url:"/rest/contests/" + HR.appController.get_current_contest_slug() + "/hackers/autocomplete?q=" + query + "&without=" + _this.collection.getFilters().hackers.join(","),
type:"GET",
success:function(resp) {
return process.process(resp);
}
});
};
}(this)
}), $(this.el).find("#stdate").datetimepicker(), $(this.el).find("#endate").datetimepicker(), 
HR.util.pagination($(this.el).find(".pagination-wrapper"), this.collection.getTotal(), this.collection.pageURL(), this.collection.getCurrentPage(), this.collection, this.collection.getLimit()), 
this.setDateTime(), 0 === this.collection.getTotal() && 0 === this.collection.errors.length) return $(this.el).find(".submissions-list-wrapper").html("<p class='text-center'>No hackers found matching the filters.</p>");
if (0 === this.collection.getTotal()) return $(this.el).find(".submissions-list-wrapper").html("<p class='text-center'>" + this.collection.errors + "</p>"), 
HR.appController.cleanCollectionCache("submission_hackers");
if (this.collection.getTotal() > 0) return $(this.el).find(".submissions-list-wrapper").html(""), 
_.each(this.collection.models, function(_model, index) {
var _view;
return _view = new HR.Manage_HackerSubmissionsItemView({
contest:this.contest,
model:_model,
index:(this.collection.page - 1) * this.collection.getLimit() + index + 1,
filterString:this.collection.getFilterString()
}), $(this.el).find(".submissions-list-wrapper").append(_view.render().el), this.add_subview(_view);
}, this);
}
}, Manage_HackerSubmissionsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_HackerSubmissionsView = Manage_HackerSubmissionsView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_HomeView, _ref;
return Manage_HomeView = function(_super) {
function Manage_HomeView() {
return Manage_HomeView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_HomeView, _super), Manage_HomeView.prototype.template = "manage/home", 
Manage_HomeView.prototype.className = "manage-view", Manage_HomeView.prototype.initialize = function(options) {
return Manage_HomeView.__super__.initialize.call(this, options);
}, Manage_HomeView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this;
}, Manage_HomeView.prototype.renderView = function() {
return this.has_template ? $(this.el).html(this._template) :void 0;
}, Manage_HomeView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_HomeView = Manage_HomeView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_ModeratorsView, _ref;
return Manage_ModeratorsView = function(_super) {
function Manage_ModeratorsView() {
return Manage_ModeratorsView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_ModeratorsView, _super), Manage_ModeratorsView.prototype.template = "manage/moderators", 
Manage_ModeratorsView.prototype.initialize = function(options) {
return Manage_ModeratorsView.__super__.initialize.call(this, options), this.listenTo(this.collection, "change", this.render), 
this.listenTo(this.collection, "reset", this.render);
}, Manage_ModeratorsView.prototype.events = {
"click .moderator-add":"add"
}, Manage_ModeratorsView.prototype.add = function(e) {
return $(e.target).html("Adding...").attr("disabled", "disabled"), this.collection.create({
permissible_type:this.collection.permissible_type,
permissible_id:this.collection.permissible_id,
username:this.$(".moderator-input").val()
}, {
wait:!0,
success:function(_this) {
return function() {
return _this.render();
};
}(this),
error:function(_this) {
return function() {
return _this.$(".error").html("Failed!"), $(e.target).html("Add").removeAttr("disabled");
};
}(this)
});
}, Manage_ModeratorsView.prototype.render = function() {
return this.$el.html(HR.appController.template(this.template, this)), this.$(".moderators").length > 0 ? _.each(this.collection.models, function(_this) {
return function(mdl) {
var _view;
return _view = new HR.Manage_ModeratorView({
model:mdl
}), _view.render(), _this.$(".moderators").append(_view.el);
};
}(this)) :void 0;
}, Manage_ModeratorsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_ModeratorsView = Manage_ModeratorsView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_ModeratorView, _ref;
return Manage_ModeratorView = function(_super) {
function Manage_ModeratorView() {
return Manage_ModeratorView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_ModeratorView, _super), Manage_ModeratorView.prototype.tagName = "tr", 
Manage_ModeratorView.prototype.template = "manage/moderator", Manage_ModeratorView.prototype.initialize = function(options) {
return Manage_ModeratorView.__super__.initialize.call(this, options), this.listenTo(this.model, "change", this.render), 
this.listenTo(this.model, "reset", this.render);
}, Manage_ModeratorView.prototype.events = {
"click .moderator-del":"del"
}, Manage_ModeratorView.prototype.del = function() {
return this.model.destroy(), this.remove();
}, Manage_ModeratorView.prototype.render = function() {
return HR.appController.getTemplate(this.template, function(_this) {
return function(t) {
return _this.$el.html(t({
model:_this.model.toJSON()
}));
};
}(this), this), this;
}, Manage_ModeratorView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_ModeratorView = Manage_ModeratorView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_NewContestView, _ref;
return Manage_NewContestView = function(_super) {
function Manage_NewContestView() {
return Manage_NewContestView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_NewContestView, _super), Manage_NewContestView.prototype.template = "manage/new-contest", 
Manage_NewContestView.prototype["class"] = "dummy", Manage_NewContestView.prototype.initialize = function() {
return this.autocreate_slug = !0, this.has_template = !1, this.rendered = !1, this.current_hacker = HR.profile(), 
this;
}, Manage_NewContestView.prototype.events = {
"click .save":"save",
"click .done":"done",
"click #newTemplate":"newTemplate",
"click #editTemplate":"editTemplate",
"click #previewTemplate":"previewTemplate",
"click [data-id]":"setCurrentTemplate",
"click .circle_add":"add_circle",
"click .circle_remove":"remove_circle",
"click a[data-toggle=tab]":"tabChanged",
"keyup #name":"nameChanged",
"keyup #slug":"slugChanged",
"change [name=preset-choice]":"presetChanged"
}, Manage_NewContestView.prototype.presetChanged = function(e) {
return scroll(0, $("#basic").position().top), $("#basic").show(), $("#presets-pane").hide(), 
$("#name").focus(), $("#title-thing").html($(e.target).attr("title-text")), "acm" === $(e.target).attr("value") ? (this.model.set("binary_scoring", !0), 
this.model.set("penalty", 1200)) :void 0;
}, Manage_NewContestView.prototype.tabChanged = function(e) {
return this.current_tab = $(e.target).attr("href");
}, Manage_NewContestView.prototype.slugChanged = function() {
return this.autocreate_slug = !1, this.$("#contest-url").html("https://hackerrank.com/" + this.$("#slug").val()), 
this;
}, Manage_NewContestView.prototype.nameChanged = function() {
return this.autocreate_slug && (this.$("#slug").val(HR.util.slugify(this.$("#name").val())), 
this.$("#contest-url").html("https://hackerrank.com/" + this.$("#slug").val())), 
this;
}, Manage_NewContestView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this;
}, Manage_NewContestView.prototype.renderView = function() {
var $codeeditor, editorOptions, fields;
return this.has_template ? ($(this.el).html(this._template()), editorOptions = {
lineNumbers:!1,
lineWrapping:!0,
matchBrackets:!0,
mode:"text/html",
indentUnit:4,
onChange:function(_this) {
return function() {
return _this.updatePreview(), _this;
};
}(this)
}, $codeeditor = this.$("#description").get(0), HR.appController.loadCodeMirrorMode("html", function(_this) {
return function() {
return $codeeditor && (_this.editor = CodeMirror.fromTextArea($codeeditor, editorOptions)), 
_this.updatePreview(), _this.scrollView();
};
}(this)), $(this.el).find("#stdate").datetimepicker(), $(this.el).find("#endate").datetimepicker(), 
this.picker_start = $(this.el).find("#stdate").data("datetimepicker"), this.picker_end = $(this.el).find("#endate").data("datetimepicker"), 
fields = [ "submit_disabled", "penalty", "binary_scoring", "participant_restriction" ]) :void 0;
}, Manage_NewContestView.prototype.updatePreview = function() {
var that;
return that = this, HR.requires("sanitize", function() {
return function() {
var sanitized_text;
return sanitized_text = HackDown.processData(that.editor.getValue()), that.$("#descriptionPreview").html(sanitized_text);
};
}(this));
}, Manage_NewContestView.prototype.scrollView = function() {
var editor, editor_height, editor_scroll_height, factor, preview, preview_height, preview_scroll_height, scrollTop;
return editor = $(this.el).find(".CodeMirror-scrollbar"), preview = $(this.el).find(".preview"), 
preview.height($(this.el).find(".CodeMirror").height()), editor_scroll_height = editor.prop("scrollHeight"), 
preview_scroll_height = preview.prop("scrollHeight"), editor_height = editor.height(), 
preview_height = preview.height(), 0 >= editor_scroll_height && (preview_scroll_height *= -1), 
factor = Math.abs((preview_scroll_height - preview_height) / (editor_scroll_height - editor_height) - 1), 
1 > factor && (factor = 1), scrollTop = this.editor.cursorCoords(!0, "local").y * factor, 
preview.stop(!0, !1).animate({
scrollTop:scrollTop
}, 200);
}, Manage_NewContestView.prototype.setData = function() {
var data, epoch_endtime, epoch_starttime, fields, temp;
return this.starttime = $(this.el).find("#startDate").val(), this.endtime = $(this.el).find("#endDate").val(), 
epoch_starttime = epoch_endtime = null, "" !== this.starttime.trim() && (epoch_starttime = new Date(this.starttime).getTime()), 
"" !== this.endtime.trim() && (epoch_endtime = new Date(this.endtime).getTime()), 
fields = [ "name", "slug", "tagline" ], data = HR.util.formData($(this.el), fields), 
temp = {
description:this.editor.getValue(),
starttime:this.starttime,
endtime:this.endtime,
epoch_starttime:epoch_starttime,
epoch_endtime:epoch_endtime,
template_id:1
}, _.extend(data, temp), this.model.set(data), this;
}, Manage_NewContestView.prototype.done = function(e) {
return e.preventDefault(), HR.router.navigate("/manage/contest/edit/" + this.model.get("slug"), {
trigger:!0
});
}, Manage_NewContestView.prototype.save = function(e) {
var thatmodel;
return e.preventDefault(), thatmodel = this.model, this.setData().model_save();
}, Manage_NewContestView.prototype.model_save = function() {
return this.model.save({}, {
success:function(_this) {
return function(model, resp) {
return resp.status ? (_this.renderChallengeAssociationView(), _this.$("#basic").hide(), 
_this.$("#challenges-pane").show(), scroll(0, $("#challenges-pane").position().top), 
_this.$(".save").hide()) :(_this.$(".error").show().html(""), _.each(resp.errors, function(errr) {
return this.$(".error").append("" + errr + "<br />");
}));
};
}(this),
error:function(_this) {
return function() {
return $(_this.el).find(".message").removeClass("error success").addClass("info").html("<ul style='margin-left:15px'><li>Problem in Connecting to server.</li></ul>");
};
}(this)
});
}, Manage_NewContestView.prototype.renderChallengeAssociationView = function() {
var challenges, _view;
return challenges = new HR.ChallengeAssociationCollection(), challenges.setContestId(this.model.get("id")), 
_view = new HR.Manage_ChallengeAssociationView({
collection:challenges,
contest:this.model
}), _view.setElement($(this.el).find(".challenges")).render(), this.add_subview(_view);
}, Manage_NewContestView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_NewContestView = Manage_NewContestView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_TemplateEditView, _ref;
return Manage_TemplateEditView = function(_super) {
function Manage_TemplateEditView() {
return Manage_TemplateEditView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_TemplateEditView, _super), Manage_TemplateEditView.prototype.template = "manage/template-editor", 
Manage_TemplateEditView.prototype["class"] = "dummy", Manage_TemplateEditView.prototype.initialize = function() {
return this.has_template = !1, this.rendered = !1, this.listenTo(this.model, "change", this.render), 
this.listenTo(this.model, "reset", this.render), this.model.fetch({
disableThrobber:!0,
error:function() {
return HR.router.e404();
}
});
}, Manage_TemplateEditView.prototype.events = {
"click .save":"save",
"click .preview":"preview"
}, Manage_TemplateEditView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this;
}, Manage_TemplateEditView.prototype.renderView = function() {
var $codeeditor, editorOptions;
return this.has_template && $(this.el).html(this._template({
model:this.model.toJSON()
})), this.model ? (editorOptions = {
lineNumbers:!0,
lineWrapping:!0,
matchBrackets:!0,
minHeight:250,
mode:"text/html",
indentUnit:4
}, $codeeditor = this.$("#inputstatement").get(0), HR.appController.loadCodeMirrorMode("html", function(_this) {
return function() {
return $codeeditor ? (_this.editor = CodeMirror.fromTextArea($codeeditor, editorOptions), 
window.editor = _this.editor) :void 0;
};
}(this))) :void 0;
}, Manage_TemplateEditView.prototype.save = function(e, _callback) {
var data;
return null == e && (e = null), null == _callback && (_callback = null), e && e.preventDefault(), 
data = {
slug:$(this.el).find("#slug").val(),
body:$("<div/>").text(this.editor.getValue()).html()
}, this.model.save(data, {
success:function(_this) {
return function(model, resp) {
return _callback && _callback.call(), _this.parseErrors(resp.errors, resp.status);
};
}(this),
error:function(_this) {
return function() {
return $(_this.el).find(".message").removeClass("error success").addClass("info").html("<ul style='margin-left:30px'><li>Problem in Connecting to server.</li></ul>");
};
}(this)
});
}, Manage_TemplateEditView.prototype.preview = function(e) {
return e.preventDefault(), $.ajax({
url:"/rest/templates/" + this.model.get("slug") + "/preview",
type:"POST",
data:{
body:$("<div/>").text(this.editor.getValue()).html()
},
success:function() {
return window.open($(e.target).attr("href"));
}
});
}, Manage_TemplateEditView.prototype.parseErrors = function(errors, status) {
var error_html;
return status ? $(this.el).find(".message").removeClass("error").addClass("success").html("<ul style='margin-left:30px'><li>Your Changes have been saved</li></ul>") :($(this.el).find(".message").removeClass("success").addClass("error"), 
error_html = "", _.each(errors, function(_this) {
return function(error) {
var name, temp;
return name = "", temp = $(_this.el).find("[for=input" + error.field + "]"), temp.length > 0 && ($(temp).addClass("error"), 
name = $(temp).html() + " "), _.each(error.errors, function(error_text) {
return error_html += "<li>" + name + error_text + "</li>";
});
};
}(this)), $(this.el).find(".message").html("<ul style='margin-left:30px'>" + error_html + "</ul>")), 
this.showFloatingMessage();
}, Manage_TemplateEditView.prototype.showFloatingMessage = function() {
return $(this.el).find(".floating-message").fadeIn(500, function(_this) {
return function() {
return setTimeout(function() {
return $(_this.el).find(".floating-message").fadeOut();
}, 3e3);
};
}(this));
}, Manage_TemplateEditView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_TemplateEditView = Manage_TemplateEditView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_TestCaseItemView, _ref;
return Manage_TestCaseItemView = function(_super) {
function Manage_TestCaseItemView() {
return Manage_TestCaseItemView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_TestCaseItemView, _super), Manage_TestCaseItemView.prototype.template = "manage/testcase-item", 
Manage_TestCaseItemView.prototype["class"] = "dummy", Manage_TestCaseItemView.prototype.events = {
"click .delete":"confirmDelete",
"click .edit":"showEditDialog",
"click .score-edit":"editScore",
"focusout .score":"restoreScore",
"click .sample":"updateSample"
}, Manage_TestCaseItemView.prototype.editScore = function(e) {
return e.preventDefault(), $(this.el).find(".score-edit").hide(), $(this.el).find(".score-wrapper").show();
}, Manage_TestCaseItemView.prototype.restoreScore = function() {
return this.model.set("score", $(this.el).find(".score").val()), this.model.set("contains_text", !1), 
this.model.save(), $(this.el).find(".score-edit").html($(this.el).find(".score").val()).show(), 
$(this.el).find(".score-wrapper").hide();
}, Manage_TestCaseItemView.prototype.updateSample = function() {
var _ref;
return this.model.set("sample", null != (_ref = !!$(this.el).find(".sample").attr("checked")) ? _ref :{
1:0
}), this.model.save();
}, Manage_TestCaseItemView.prototype.initialize = function(options) {
return options.challenge && (this.challenge = options.challenge), this.index = options.index, 
this.has_template = !1, this.rendered = !1, this.editDialog = !1, this.listenTo(this.model, "change", this.render), 
this.listenTo(this.model, "reset", this.render);
}, Manage_TestCaseItemView.prototype.confirmDelete = function(e) {
var dialog_options;
return e.preventDefault(), dialog_options = {
title:"Confirm Delete",
body:"<div class='row' style='margin-left:0px'> Are you sure you want to delete " + this.model.get("input") + ", " + this.model.get("output") + " testcase? </div> <div class='row' style='margin-top:20px;'> <div class='span2 pull-right' > <a class='btn btn-green confirm-yes' href='#'>Yes</a> <a class='btn btn-green confirm-no' href='#'>No</a> </div> </div>",
events:{
"click .confirm-yes":function(_this) {
return function(e) {
return e.preventDefault(), _this.dialog.destroy(), _this["delete"]();
};
}(this),
"click .confirm-no":function(_this) {
return function(e) {
return e.preventDefault(), _this.dialog.destroy();
};
}(this)
}
}, this.dialog = new HR.util.ShowConfirmationDialog(dialog_options), this.dialog.render();
}, Manage_TestCaseItemView.prototype.showEditDialog = function(e) {
var dialog_options, properties;
return e.preventDefault(), this.model.getEditData(), this.editDialog = !0, this.model.fetch(), 
dialog_options = {
title:"Edit Test Cases",
body:"<div class='loader'>" + HR.appController.viewLoader(64) + ("</div> <form class='hide'> <div class='row'> <div class='span1'> <p>Input</p> </div> <div class='span6'> <textarea class='span6 input_text'>" + this.model.get("input_text") + "</textarea> </div> </div> <div class='row'> <div class='span1'> <p>Output</p> </div> <div class='span6'> <textarea class='span6 output_text'>" + this.model.get("output_text") + "</textarea> </div> </div> <div class='row'> <div class='span1'> <p>Score</p> </div> <div class='span6'> <p><input class='span1 score' type='text' value='" + this.model.get("score") + "' /></p> </div> </div> <div class='row'> <div class='span3 pull-right' style='text-align:right;' > <a class='btn btn-green save' href='#'>Add Testcase</a> </div> </div> </form>"),
events:{
"click .save":function(_this) {
return function(e) {
var attr, dialog;
return $(e.currentTarget).html("Adding testcase...").attr("disabled", "disabled"), 
e.preventDefault(), dialog = e.data.$dialog, attr = {
input_text:$(dialog).find(".input_text").val(),
output_text:$(dialog).find(".output_text").val(),
score:$(dialog).find(".score").val()
}, _this.model.save(attr, {
success:function(model, resp) {
return resp.status ? _this.model.collection.fetch({
success:function() {
return _this.dialog.destroy();
}
}) :$(dialog).find(".hr-dialog-failed-message").html(resp.errors.join(","));
}
});
};
}(this),
"click .close":function(_this) {
return function(e) {
return e.preventDefault(), _this.model.isNew() && _this.model.destroy(), _this.dialog.destroy();
};
}(this)
}
}, properties = {
updateData:function(_this) {
return function(model) {
return _this.dialog.$body().find(".loader").hide(), _this.dialog.$body().find("form").show(), 
_this.dialog.$body().find(".input_text").val(model.get("input_text")), _this.dialog.$body().find(".output_text").val(model.get("output_text")), 
_this.dialog.$body().find(".score").val(model.get("score")), "" !== model.get("input_text") ? _this.dialog.$body().find(".save").html("Save Testcase") :void 0;
};
}(this),
onDestroy:function(_this) {
return function() {
return _this.model.isNew() ? $(_this.el).css("display", "none") :void 0;
};
}(this)
}, this.dialog = new HR.util.ShowDialog(dialog_options, properties), this.dialog.render();
}, Manage_TestCaseItemView.prototype["delete"] = function() {
return HR.util.ajaxmsg("Deleting...", !0, !0), this.model.destroy({
success:function(_this) {
return function(model, resp) {
return "deleted" === resp.status ? $(_this.el).html("") :void 0;
};
}(this)
});
}, Manage_TestCaseItemView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this;
}, Manage_TestCaseItemView.prototype.renderView = function() {
return this.editDialog && (this.editDialog = !1, this.dialog.updateData(this.model)), 
this.has_template ? $(this.el).html(this._template({
model:this.model.toJSON(),
challenge:this.challenge.toJSON(),
index:this.index
})) :void 0;
}, Manage_TestCaseItemView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_TestCaseItemView = Manage_TestCaseItemView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, Manage_TestCaseView, _ref;
return Manage_TestCaseView = function(_super) {
function Manage_TestCaseView() {
return Manage_TestCaseView.__super__.constructor.apply(this, arguments);
}
return __extends(Manage_TestCaseView, _super), Manage_TestCaseView.prototype.template = "manage/testcase", 
Manage_TestCaseView.prototype["class"] = "dummy", Manage_TestCaseView.prototype.events = {
"click .addnew":"addTestCase",
"click .uploadZip":"uploadZipDialog"
}, Manage_TestCaseView.prototype.addTestCase = function(e) {
var _model, _view;
return e.preventDefault(), _model = new HR.TestCaseModel(), _model.setChallengeId(this.collection.getChallengeId()), 
this.collection.add(_model), _view = new HR.Manage_TestCaseItemView({
model:_model,
index:this.collection.total + 1,
challenge:this.challenge
}), _view.showEditDialog(e);
}, Manage_TestCaseView.prototype.initialize = function(options) {
return options.challenge && (this.challenge = options.challenge), this.has_template = !1, 
this.rendered = !1, this.listenTo(this.collection, "change", this.render), this.listenTo(this.collection, "reset", this.render), 
this.listenTo(this.collection, "destroy", this.render);
}, Manage_TestCaseView.prototype.uploadZipDialog = function(e) {
var dialog, that;
return e.preventDefault(), $("#process-message").html(""), that = this, dialog = new HR.util.ShowFormDialog({
title:"Upload Dialog",
width:650,
enctype:"multipart/form-data",
fields:[ {
name:"source_file",
title:"Source File",
type:"file"
}, {
name:"challenge_id",
value:that.collection.getChallengeId(),
type:"hidden"
}, {
name:"is_file_upload",
value:"1",
type:"hidden"
} ],
buttons:[ {
name:"Upload",
callback:function(dialog) {
var $form, btn, formData;
return btn = this, $form = dialog.$form(), formData = new FormData($form[0]), btn.unSetFailedMsg(), 
$.ajax({
url:"/rest/challenges/" + that.collection.getChallengeId() + "/testcases/upload",
type:"POST",
data:formData,
cache:!1,
contentType:!1,
processData:!1,
success:function(data) {
return btn.setInactive(), data.ok ? (btn.failed(data.message), that.collection.fetch({
reset:!0,
success:function() {
return dialog.destroy();
}
})) :btn.failed(data.message);
}
});
}
} ]
}), dialog.render();
}, Manage_TestCaseView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this;
}, Manage_TestCaseView.prototype.renderView = function() {
return this.has_template ? ($(this.el).html(this._template({
collection:this.collection
})), _.each(this.collection.models, function(model, index) {
var _view;
return model.setChallengeId(this.collection.getChallengeId()), _view = new HR.Manage_TestCaseItemView({
challenge:this.challenge,
model:model,
index:index + 1
}), $(this.el).find(".testcase-list-wrapper").append(_view.render().el), this.add_subview(_view);
}, this), HR.util.ajaxmsg("Loading...", !0, !0, .5)) :void 0;
}, Manage_TestCaseView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Manage_TestCaseView = Manage_TestCaseView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var ChecklistView, HR, _ref;
return ChecklistView = function(_super) {
function ChecklistView() {
return ChecklistView.__super__.constructor.apply(this, arguments);
}
return __extends(ChecklistView, _super), ChecklistView.prototype.template = "checklist", 
ChecklistView.prototype.className = "checklist-view", ChecklistView.prototype.initialize = function() {
return this.listenTo(this.collection, "reset", this.render), this.listenTo(this.collection, "change", this.render), 
this.listenTo(this.model, "reset", this.render), this.listenTo(this.model, "change", this.render);
}, ChecklistView.prototype.render = function() {
var that;
return $(this.el).html(HR.appController.template(this.template, this)({
collection:this.collection,
_collection:this.collection.toJSON(),
model:this.model,
_model:this.model.toJSON()
})), that = this, this.$(".accordion-toggle").click(function(e) {
var action, id;
return id = $(e.currentTarget).attr("data-name"), action = "block" === that.$("#" + id).css("display") ? "fadeOut" :"fadeIn", 
that.$(".accordion-body").hide(), that.$("#" + id)[action]();
}), this;
}, ChecklistView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ChecklistView = ChecklistView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, PlayoffsView, _ref;
return PlayoffsView = function(_super) {
function PlayoffsView() {
return PlayoffsView.__super__.constructor.apply(this, arguments);
}
return __extends(PlayoffsView, _super), PlayoffsView.prototype.template = "playoffs", 
PlayoffsView.prototype.className = "playoffs-view", PlayoffsView.prototype.setChallenge = function(challenge) {
return this.challenge && (this.challenge.unbind("reset", this.render, this), this.challenge.unbind("change", this.render, this)), 
this.challenge = challenge, this.listenTo(this.challenge, "reset", this.render), 
this.listenTo(this.challenge, "change", this.render), this.render;
}, PlayoffsView.prototype.setCollection = function(collection) {
return this.collection && (this.collection.unbind("reset", this.render, this), this.collection.unbind("change", this.render, this)), 
this.collection = collection, this.listenTo(this.collection, "reset", this.render), 
this.listenTo(this.collection, "change", this.render), this.render;
}, PlayoffsView.prototype.setContest = function(contest) {
return this.contest && (this.contest.unbind("reset", this.render, this), this.contest.unbind("change", this.render, this)), 
this.contest = contest, this.listenTo(this.contest, "reset", this.render), this.listenTo(this.contest, "change", this.render), 
this.render;
}, PlayoffsView.prototype.applyTemplate = function() {
return this.has_template && !this.rendered && ($(this.el).html(this._template()), 
this.rendered = !0), this.rendered && (this.playoff_header_view || (this.playoff_header_view = new HR.PlayoffHeaderView()), 
this.playoff_header_view.setChallenge(this.challenge), this.playoff_header_view.setCollection(this.collection), 
this.playoff_header_view.setContest(this.contest), this.playoff_body_view || (this.playoff_body_view = new HR.PlayoffBodyView()), 
this.playoff_body_view.setChallenge(this.challenge), this.playoff_body_view.setCollection(this.collection), 
this.playoff_body_view.setContest(this.contest), this.playoff_body_view.once = !1, 
this.assign({
".playoffs .header":this.playoff_header_view,
".playoffs .body":this.playoff_body_view
})), this;
}, PlayoffsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.PlayoffsView = PlayoffsView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, PlayoffHeaderView, _ref;
return PlayoffHeaderView = function(_super) {
function PlayoffHeaderView() {
return PlayoffHeaderView.__super__.constructor.apply(this, arguments);
}
return __extends(PlayoffHeaderView, _super), PlayoffHeaderView.prototype.template = "playoff-header", 
PlayoffHeaderView.prototype.setChallenge = function(challenge) {
return this.challenge && (this.challenge.unbind("reset", this.render, this), this.challenge.unbind("change", this.render, this)), 
this.challenge = challenge, this.listenTo(this.challenge, "reset", this.render), 
this.listenTo(this.challenge, "change", this.render), this.render();
}, PlayoffHeaderView.prototype.setCollection = function(collection) {
return this.collection && (this.collection.unbind("reset", this.render, this), this.collection.unbind("change", this.render, this)), 
this.collection = collection, this.listenTo(this.collection, "reset", this.render), 
this.listenTo(this.collection, "change", this.render), this.render();
}, PlayoffHeaderView.prototype.setContest = function(contest) {
return this.contest && (this.contest.unbind("reset", this.render, this), this.contest.unbind("change", this.render, this)), 
this.contest = contest, this.listenTo(this.contest, "reset", this.render), this.listenTo(this.contest, "change", this.render), 
this.render();
}, PlayoffHeaderView.prototype.applyTemplate = function() {
return this.collection && this.collection.sync_status ? this.contest && this.contest.sync_status ? this.challenge && this.challenge.sync_status ? (this.has_template && $(this.el).html(this._template({
contest:this.contest.toJSON(),
challenge:this.challenge.toJSON(),
round_data:this.collection.round_data
})), this) :this :this :this;
}, PlayoffHeaderView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.PlayoffHeaderView = PlayoffHeaderView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, PlayoffBodyView, _ref;
return PlayoffBodyView = function(_super) {
function PlayoffBodyView() {
return PlayoffBodyView.__super__.constructor.apply(this, arguments);
}
return __extends(PlayoffBodyView, _super), PlayoffBodyView.prototype.template = "playoff-body", 
PlayoffBodyView.prototype.setChallenge = function(challenge) {
return this.challenge && (this.challenge.unbind("reset", this.render, this), this.challenge.unbind("change", this.render, this)), 
this.challenge = challenge, this.listenTo(this.challenge, "reset", this.render), 
this.listenTo(this.challenge, "change", this.render), this.render;
}, PlayoffBodyView.prototype.setCollection = function(collection) {
return this.collection && (this.collection.unbind("reset", this.render, this), this.collection.unbind("change", this.render, this)), 
this.collection = collection, this.listenTo(this.collection, "reset", this.render), 
this.listenTo(this.collection, "change", this.render), this.render;
}, PlayoffBodyView.prototype.setContest = function(contest) {
return this.contest && (this.contest.unbind("reset", this.render, this), this.contest.unbind("change", this.render, this)), 
this.contest = contest, this.listenTo(this.contest, "reset", this.render), this.listenTo(this.contest, "change", this.render), 
this.render;
}, PlayoffBodyView.prototype.applyTemplate = function() {
return this.collection.sync_status ? this.contest.sync_status ? this.challenge.sync_status ? (this.has_template && (this.rendered || ($(this.el).html(this._template()), 
this.rendered = !0), this.list_views || (this.list_views = {}), _.each(this.collection.models, function(model) {
var id;
return id = model.get("id"), this.list_views[id] || (this.list_views[id] = new HR.PlayoffBodyListView({
parent:this
}), this.add_subview(this.list_views[id])), this.list_views[id].setModel(model), 
0 === this.$(".playoffs-list-wrap #gameset-" + id).length && this.$(".playoffs-list-wrap").append("<div id='gameset-" + id + "' class='gameset-view'></div>"), 
this.list_views[id].setElement(this.$(".playoffs-list-wrap #gameset-" + id)).render();
}, this)), this) :this :this :this;
}, PlayoffBodyView.prototype.closeAllGameContainers = function() {
return _.each(this.list_views, function(view) {
return view.closeGameContainer();
});
}, PlayoffBodyView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.PlayoffBodyView = PlayoffBodyView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, PlayoffBodyListView, _ref;
return PlayoffBodyListView = function(_super) {
function PlayoffBodyListView() {
return PlayoffBodyListView.__super__.constructor.apply(this, arguments);
}
return __extends(PlayoffBodyListView, _super), PlayoffBodyListView.prototype.template = "playoff-body-list", 
PlayoffBodyListView.prototype.className = "playoff-body-list-view", PlayoffBodyListView.prototype.events = {
"click .play-game":"playGame"
}, PlayoffBodyListView.prototype.setModel = function(model) {
return this.model && (this.model.unbind("change", this.render, this), this.model.unbind("reset", this.render, this)), 
this.model = model, this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "reset", this.render);
}, PlayoffBodyListView.prototype.applyTemplate = function() {
return this.has_template && ($(this.el).html(this._template({
model:this.model.toJSON()
})), this.delegateEvents()), this;
}, PlayoffBodyListView.prototype.playGame = function(e) {
var player1, player2, that, _gameset_clbk;
return e && e.preventDefault(), this.parent.closeAllGameContainers(), this.$(".output-area-wrapper").html("").unbind().die(), 
this.gameset_model || (player1 = this.model.get("submission_id1"), player2 = this.model.get("submission_id2"), 
_gameset_clbk = function(model) {
return model.set("num_players", 2), model.set("player1", player1), model.set("player2", player2);
}, this.gameset_model = HR.appController.getModel("gameset", "player1-" + player1 + "-" + player2, _gameset_clbk), 
this.gameset_model.unbind("reset", this.playGame, this), this.gameset_model.bind("reset", this.playGame, this)), 
that = this, this.gameset_model ? (HR.requires("compound/game-views", function() {
return that.game_container_view = new HR.GameContainerView({
collection:that.gameset_model.getGameCollection(),
gameset:that.gameset_model
}), that.game_container_view.setElement(that.$(".output-area-wrapper")).render(), 
that.add_subview(that.game_container_view);
}), this) :void 0;
}, PlayoffBodyListView.prototype.closeGameContainer = function() {
return this.game_container_view ? this.game_container_view.closeContainer() :void 0;
}, PlayoffBodyListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.PlayoffBodyListView = PlayoffBodyListView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, SampleTemplateView, _ref;
return SampleTemplateView = function(_super) {
function SampleTemplateView() {
return SampleTemplateView.__super__.constructor.apply(this, arguments);
}
return __extends(SampleTemplateView, _super), SampleTemplateView.prototype.initialize = function(options) {
return null == options && (options = {}), options.template && (this.template = options.template), 
SampleTemplateView.__super__.initialize.apply(this, arguments);
}, SampleTemplateView.prototype.applyTemplate = function() {
return this.$el.html(this._template());
}, SampleTemplateView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SampleTemplateView = SampleTemplateView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, SampleTemplate1View, _ref;
return SampleTemplate1View = function(_super) {
function SampleTemplate1View() {
return SampleTemplate1View.__super__.constructor.apply(this, arguments);
}
return __extends(SampleTemplate1View, _super), SampleTemplate1View.prototype.template = "sampletemplate1", 
SampleTemplate1View.prototype.className = "sampletemplate1-view", SampleTemplate1View.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)), this;
}, SampleTemplate1View;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SampleTemplate1View = SampleTemplate1View;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, SampleTemplate2View, _ref;
return SampleTemplate2View = function(_super) {
function SampleTemplate2View() {
return SampleTemplate2View.__super__.constructor.apply(this, arguments);
}
return __extends(SampleTemplate2View, _super), SampleTemplate2View.prototype.template = "sampletemplate2", 
SampleTemplate2View.prototype.className = "sampletemplate2-view", SampleTemplate2View.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)), this;
}, SampleTemplate2View;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SampleTemplate2View = SampleTemplate2View;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var AboutusView, HR, _ref;
return AboutusView = function(_super) {
function AboutusView() {
return AboutusView.__super__.constructor.apply(this, arguments);
}
return __extends(AboutusView, _super), AboutusView.prototype.template = "aboutus", 
AboutusView.prototype.className = "aboutus-view", AboutusView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)), this;
}, AboutusView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.AboutusView = AboutusView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
}, __indexOf = [].indexOf || function(item) {
for (var i = 0, l = this.length; l > i; i++) if (i in this && this[i] === item) return i;
return -1;
};
jQuery(function() {
var CareersView, HR, _ref;
return CareersView = function(_super) {
function CareersView() {
return CareersView.__super__.constructor.apply(this, arguments);
}
return __extends(CareersView, _super), CareersView.prototype.template = "careers", 
CareersView.prototype.className = "careers-view", CareersView.prototype.initialize = function() {
var that;
return that = this, this.categories = [], this.jobs = [], $.ajax({
url:"/rest/job_postings",
success:function(data) {
return _.each(data, function(position) {
var team;
return team = position.categories.team, that.jobs.push(position), __indexOf.call(that.categories, team) < 0 ? that.categories.push(team) :void 0;
}), that.render();
}
});
}, CareersView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
categories:this.categories,
jobs:this.jobs
})), this;
}, CareersView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CareersView = CareersView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, ScoringView, _ref;
return ScoringView = function(_super) {
function ScoringView() {
return ScoringView.__super__.constructor.apply(this, arguments);
}
return __extends(ScoringView, _super), ScoringView.prototype.template = "scoring", 
ScoringView.prototype.className = "scoring-view container", ScoringView.prototype.initialize = function(options) {
return this.section = options.section, this.contest = HR.model("contest").cached(), 
this.template = this.contest.get("scoring_template") || this.template, this.listenTo(this.model, "change", this.render), 
this.listenTo(this.model, "reset", this.render);
}, ScoringView.prototype.render = function() {
var that;
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model
})), this.section && this.$("#" + this.section).length > 0 && (that = this, setTimeout(function() {
return $("body,html").animate({
scrollTop:$("#" + that.section).offset().top - 10
}, 800);
}, 800)), this;
}, ScoringView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ScoringView = ScoringView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var FaqView, HR, _ref;
return FaqView = function(_super) {
function FaqView() {
return FaqView.__super__.constructor.apply(this, arguments);
}
return __extends(FaqView, _super), FaqView.prototype.template = "faq", FaqView.prototype.className = "faq-view container", 
FaqView.prototype.initialize = function(options) {
return null == options && (options = {}), this.tab = options.tab, this.contest = HR.model("contest").cached(), 
this.template = this.contest.get("faq_template") || this.template;
}, FaqView.prototype.render = function() {
var that;
return $(this.el).html(HR.appController.template(this.template, this)), this.tab && this.$("#" + this.tab).length > 0 && (that = this, 
setTimeout(function() {
return $("body,html").animate({
scrollTop:$("#" + that.tab).offset().top - 10
}, 800);
}, 800)), this;
}, FaqView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.FaqView = FaqView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, PrivacyView, _ref;
return PrivacyView = function(_super) {
function PrivacyView() {
return PrivacyView.__super__.constructor.apply(this, arguments);
}
return __extends(PrivacyView, _super), PrivacyView.prototype.template = "privacy", 
PrivacyView.prototype.className = "privacy-view", PrivacyView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)), this;
}, PrivacyView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.PrivacyView = PrivacyView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var EnvironmentView, HR, _ref;
return EnvironmentView = function(_super) {
function EnvironmentView() {
return EnvironmentView.__super__.constructor.apply(this, arguments);
}
return __extends(EnvironmentView, _super), EnvironmentView.prototype.template = "environment", 
EnvironmentView.prototype.className = "environment-view container", EnvironmentView.prototype.initialize = function(options) {
return this.tab = options.tab;
}, EnvironmentView.prototype.render = function() {
var that;
return $(this.el).html(HR.appController.template(this.template, this)({
base_url:window.location.pathname
})), that = this, this.tab && "" !== this.tab && setTimeout(function() {
return $("html body").animate({
scrollTop:that.$("#" + that.tab).offset().top - 50
}, 300);
}, 500), this;
}, EnvironmentView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.EnvironmentView = EnvironmentView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, ProblemSetterView, _ref;
return ProblemSetterView = function(_super) {
function ProblemSetterView() {
return ProblemSetterView.__super__.constructor.apply(this, arguments);
}
return __extends(ProblemSetterView, _super), ProblemSetterView.prototype.template = "problem-setter", 
ProblemSetterView.prototype.className = "problem-setter-view", ProblemSetterView.prototype.initialize = function(options) {
return this.section = options.section;
}, ProblemSetterView.prototype.render = function() {
var that;
return $(this.el).html(HR.appController.template(this.template, this)), this.section && this.$("#" + this.section).length > 0 && (that = this, 
setTimeout(function() {
return $("body,html").animate({
scrollTop:$("#" + that.section).offset().top - 10
}, 800);
}, 800)), this;
}, ProblemSetterView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.ProblemSetterView = ProblemSetterView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var APIView, HR, _ref;
return APIView = function(_super) {
function APIView() {
return APIView.__super__.constructor.apply(this, arguments);
}
return __extends(APIView, _super), APIView.prototype.initialize = function() {
return APIView.__super__.initialize.apply(this, arguments), this.consumers = new HR.APIConsumerCollection(), 
this.errors = [], this.renderConsumers(), this.apiResponseTemplate = _.template("<div class='api-response-wrapper' style='padding: 10px;'> <dl class='api-response'> <dt>URI</dt> <dd><%= data.uri %></dd> <dt>Request Method</dt> <dd><%= data.method %></dd> <dt>Response Code</dt> <dd><%= data.code %></dd> <dt>Response Headers</dt> <dd><%= data.headers %></dd> <dt>Response Body</dt> <dd><pre><%= _.escape(data.response) %></pre></dd> </dl></div>");
}, APIView.prototype.template = "api", APIView.prototype.className = "api-view", 
APIView.prototype.events = {
"click .try-languages-btn":"tryLanguages",
"click .try-submission-btn":"trySubmission",
"click #genkey-api-btn":"genKey"
}, APIView.prototype.render = function() {
var profile;
return profile = HR.profile(), $(this.el).html(HR.appController.template(this.template, this)({
consumers:this.consumers.toJSON(),
errors:this.errors,
isLoggedIn:profile.isLoggedIn()
})), this;
}, APIView.prototype.renderConsumers = function() {
return this.consumers.fetch({
success:function(_this) {
return function() {
return _this.render();
};
}(this)
});
}, APIView.prototype.genKey = function() {
return this.errors = [], this.consumers.create({
name:this.$("#genkey-app-name").val(),
description:this.$("#genkey-app-description").val(),
website:this.$("#genkey-app-website").val()
}, {
success:function(_this) {
return function() {
return _this.renderConsumers();
};
}(this),
error:function(_this) {
return function(modl, xhr) {
return _this.errors = $.parseJSON(xhr.responseText).errors, _this.renderConsumers();
};
}(this)
});
}, APIView.prototype.tryLanguages = function() {
return this.$(".try-languages-btn").attr("disabled", "disabled").html("Requesting..."), 
$.ajax("api/shiv/languages", {
data:{
request_format:this.$("#api-languages-format").val()
},
context:this,
success:function(data) {
return this.$("#api-languages-output").html(this.apiResponseTemplate({
data:data
}));
},
error:function() {
return this.$("#api-languages-output").html("Failed");
},
complete:function() {
return this.$(".try-languages-btn").removeAttr("disabled").html("Try it!");
}
});
}, APIView.prototype.trySubmission = function() {
return this.$(".try-submission-btn").attr("disabled", "disabled").html("Requesting..."), 
$.ajax("api/shiv/submission", {
type:"POST",
data:{
request_format:this.$("#api-submission-format").val(),
source:this.$("#api-submission-source").val(),
lang:this.$("#api-submission-language").val(),
testcases:this.$("#api-submission-testcases").val(),
callback_url:this.$("#api-submission-callbackurl").val(),
wait:this.$("#api-submission-wait").val()
},
context:this,
success:function(data) {
return this.$("#api-submission-output").html(this.apiResponseTemplate({
data:data
}));
},
error:function() {
return this.$("#api-submission-output").html("Failed");
},
complete:function() {
return this.$(".try-submission-btn").removeAttr("disabled").html("Try it!");
}
});
}, APIView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.APIView = APIView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var APIHomeView, HR, _ref;
return APIHomeView = function(_super) {
function APIHomeView() {
return APIHomeView.__super__.constructor.apply(this, arguments);
}
return __extends(APIHomeView, _super), APIHomeView.prototype.template = "apihome", 
APIHomeView.prototype.className = "apihome-view", APIHomeView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)), this;
}, APIHomeView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.APIHomeView = APIHomeView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, NvNLeaderboardView, _ref;
return NvNLeaderboardView = function(_super) {
function NvNLeaderboardView() {
return NvNLeaderboardView.__super__.constructor.apply(this, arguments);
}
return __extends(NvNLeaderboardView, _super), NvNLeaderboardView.prototype.template = "nvn-leaderboard", 
NvNLeaderboardView.prototype.className = "nvn-leaderboard-view", NvNLeaderboardView.prototype.initialize = function() {
return this.listenTo(this.collection, "reset", this.render), this.collection.fetch();
}, NvNLeaderboardView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
leaderboard:this.collection.toJSON(),
kind:this.collection.kind
})), HR.util.pagination(this.$(".pagination-wrapper"), this.collection.getTotal(), "/" + this.collection.pageURL() + "/", this.collection.getCurrentPage()), 
this;
}, NvNLeaderboardView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.NvNLeaderboardView = NvNLeaderboardView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, HackerClubsView, _ref;
return HackerClubsView = function(_super) {
function HackerClubsView() {
return HackerClubsView.__super__.constructor.apply(this, arguments);
}
return __extends(HackerClubsView, _super), HackerClubsView.prototype.template = "hackerclubs", 
HackerClubsView.prototype.className = "hackerclubs-view", HackerClubsView.prototype.initialize = function() {
return this.listenTo(this.collection, "reset", this.render);
}, HackerClubsView.prototype.render = function() {
var pin_all, that;
return this.fetching_template ? this._template && this.collection.sync_status && ($(this.el).html(this._template({
_collection:this.collection.toJSON(),
collection:this.collection
})), this.$("#tiles li").length > 0 && (that = this, pin_all = function() {
return that.$("#tiles li").wookmark({
autoResize:!0,
offset:2,
container:that.$(".hackerclubs"),
itemWidth:310
});
}, this.$("img.pin").bind("load", function() {
return pin_all();
}), pin_all())) :(this.fetching_template = !0, HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.render();
}, this)), this;
}, HackerClubsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.HackerClubsView = HackerClubsView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var CompaniesView, HR, _ref;
return CompaniesView = function(_super) {
function CompaniesView() {
return CompaniesView.__super__.constructor.apply(this, arguments);
}
return __extends(CompaniesView, _super), CompaniesView.prototype.template = "companies", 
CompaniesView.prototype.className = "companies-view", CompaniesView.prototype.render = function() {
var profile, sorted_companies;
return profile = HR.profile(), sorted_companies = _.sortBy(this.collection.toJSON(), function(company) {
return _.filter(company.challenges, function(challenge) {
return challenge.solved;
}).length;
}), sorted_companies = sorted_companies.reverse(), _.each(sorted_companies, function(company) {
return company.solved_challenges = _.filter(company.challenges, function(challenge) {
return challenge.solved;
}), company.unsolved_challenges = _.filter(company.challenges, function(challenge) {
return !challenge.solved;
});
}), $(this.el).html(HR.appController.template(this.template, this)({
companies:sorted_companies
})), this;
}, CompaniesView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CompaniesView = CompaniesView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, OverallLeaderboardView, _ref;
return OverallLeaderboardView = function(_super) {
function OverallLeaderboardView() {
return OverallLeaderboardView.__super__.constructor.apply(this, arguments);
}
return __extends(OverallLeaderboardView, _super), OverallLeaderboardView.prototype.template = "leaderboard-overall", 
OverallLeaderboardView.prototype.className = "leaderboard-overall-view container", 
OverallLeaderboardView.prototype.events = {
"click .js-leaderboard-tab":"changeTab",
"click .js-weekly":"changeWeeklyTab"
}, OverallLeaderboardView.prototype.initialize = function(options) {
return null == options && (options = {}), this.level = options.level, this.listenTo(this.collection, "reset", this.render), 
this.weekly_type = "today", this.weekly_collection = {}, this.weekly_cache = {}, 
this.fetchWeeklyLeaderboard();
}, OverallLeaderboardView.prototype.changeTab = function(e) {
var new_level;
return e.preventDefault(), new_level = $(e.currentTarget).attr("data-level"), this.level !== new_level ? (this.$("a[data-level=" + this.level + "]").parent().removeClass("active"), 
this.$("a[data-level=" + new_level + "]").parent().addClass("active"), this.level = new_level, 
HR.router.navigate("/leaderboard/level/" + new_level, !1), this.collection = HR.collection("leaderboard"), 
this.collection.setPage(1), this.collection.setContestSlug("master"), this.collection.setLevel(this.level), 
this.collection.cached(), this.listenTo(this.collection, "reset", this.render), 
this.render()) :void 0;
}, OverallLeaderboardView.prototype.changeWeeklyTab = function(e) {
var new_type;
return e.preventDefault(), new_type = $(e.currentTarget).attr("data-type"), this.weekly_type !== new_type ? (this.$("a[data-type=" + this.weekly_type + "]").parent().removeClass("active"), 
this.$("a[data-type=" + new_type + "]").parent().addClass("active"), this.weekly_type = new_type, 
this.fetchWeeklyLeaderboard()) :void 0;
}, OverallLeaderboardView.prototype.processBlank = function() {
var blankDiv;
return blankDiv = this.$("#blank-reason-container .blank-reason"), this.collection.length > 0 ? (blankDiv.parent().hide(), 
!1) :(_.isBoolean(this.collection.sync_status) ? this.collection.available ? blankDiv.html("Sorry, we require a few more submissions before we generate the leaderboard.") :blankDiv.html("We are currently generating the leaderboard, please bear with us.") :blankDiv.html(HR.appController.viewLoader(64)), 
this.$("#blank-reason-container").show(), this.$("#leaders").hide(), !0);
}, OverallLeaderboardView.prototype.render = function() {
var leadersDiv, that;
return $(this.el).html(HR.appController.template(this.template, this)({
level:this.level,
current_hacker:this.collection.current_hacker,
has_weekly_leaderboard:!1,
weekly_contest:this.collection.weekly_contest,
weekly_type:this.weekly_type
})), this.renderWeekly(), this.processBlank() ? this :(this.collection.sync_status && (leadersDiv = $(), 
that = this, _.each(this.collection.models, function(model) {
var _view;
return _view = new HR.OverallLeaderboardListView({
leader:model
}), that.add_subview(_view), leadersDiv.push(_view.render().el);
}), this.$("#leaders").append(leadersDiv)), this.collection.available && HR.util.pagination(this.$(".pagination-wrapper"), this.collection.getTotal(), "" + this.collection.pageURL() + "/", this.collection.getCurrentPage(), this.collection, this.collection.limit, 10, "backbone", !1), 
this);
}, OverallLeaderboardView.prototype.fetchWeeklyLeaderboard = function() {
var that;
return that = this, this.weekly_cache[this.weekly_type] ? (this.weekly_collection = this.weekly_cache[this.weekly_type], 
this.renderWeekly()) :(this.weekly_collection = {}, that.renderWeekly(), $.ajax({
url:"rest/leaderboard/" + this.weekly_type,
success:function(data) {
return that.weekly_collection = data, that.weekly_cache[that.weekly_type] = data, 
that.renderWeekly();
}
}));
}, OverallLeaderboardView.prototype.createLeader = function(leader) {
return "<div class='leaderboard-overall-list-view'> <div class='row padding-small top bottom' style='height: 38px'> <div class='span-flex-2 text-center'> <p>" + leader.rank + "</p> </div> <div class='span-flex-10'> <p> <a class='backbone cursor leaderboard-hackername rg_" + leader.level + "' data-action='hacker-modal' rel='tooltip' data-value='" + leader.hacker + "' href='/" + leader.hacker + "' target='_blank'> <img class='avatar' width='30' height='30' src='" + leader.avatar + "' onerror='this.onerror=null; this.src='https://d3rpyts3de3lx8.cloudfront.net/hackerrank/assets/gravatar.jpg';'> " + leader.hacker + " </a> </p> </div> <div class='span-flex-4'> <p>" + leader.score.toFixed(2) + "</p> </div> </div> </div>";
}, OverallLeaderboardView.prototype.renderWeekly = function() {
var blankDiv, leadersDiv, that;
if (this.$(".js-weekly-leaderboard").length > 0) return blankDiv = this.$("#blank-reason-container2 .blank-reason"), 
this.$("#leaders2").html(""), that = this, this.weekly_collection.models ? this.weekly_collection.available ? (blankDiv.parent().hide(), 
leadersDiv = $(), _.each(this.weekly_collection.models, function(model) {
return $("#leaders2").append(that.createLeader(model));
})) :(blankDiv.html("No challenge at this time."), blankDiv.parent().show()) :(blankDiv.html(HR.appController.viewLoader(64)), 
blankDiv.parent().show());
}, OverallLeaderboardView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.OverallLeaderboardView = OverallLeaderboardView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, OverallLeaderboardListView, _ref;
return OverallLeaderboardListView = function(_super) {
function OverallLeaderboardListView() {
return OverallLeaderboardListView.__super__.constructor.apply(this, arguments);
}
return __extends(OverallLeaderboardListView, _super), OverallLeaderboardListView.prototype.template = "leaderboard-overall-list", 
OverallLeaderboardListView.prototype.className = "leaderboard-overall-list-view", 
OverallLeaderboardListView.prototype.initialize = function(options) {
return this.leader = options.leader, this.profile = HR.profile();
}, OverallLeaderboardListView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
leader:this.leader.toJSON(),
is_current_hacker:this.profile.get("id") === this.leader.get("hacker_id")
})), this;
}, OverallLeaderboardListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.OverallLeaderboardListView = OverallLeaderboardListView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, LeaderboardMainView, _ref;
return LeaderboardMainView = function(_super) {
function LeaderboardMainView() {
return LeaderboardMainView.__super__.constructor.apply(this, arguments);
}
return __extends(LeaderboardMainView, _super), LeaderboardMainView.prototype.template = "leaderboard-main", 
LeaderboardMainView.prototype.className = "leaderboard-main-view container", LeaderboardMainView.prototype.events = {
"click .js-leaderboard-tab":"changeTab",
"click .switchery":"changeType",
"click .leaderboard-filters-dropdown":"changeFilter",
"click .filters-close":"closeFilter",
"focus .filter-input":"filterInputFocus"
}, LeaderboardMainView.prototype.filters = [ "school", "country", "company" ], LeaderboardMainView.prototype.initialize = function(options) {
return null == options && (options = {}), this.level = this.collection.level, this.type = this.collection.type, 
this.track = this.collection.track, this.scores = [], this.renderScores(), this.listenTo(this.collection, "reset", this.render), 
LeaderboardMainView.__super__.initialize.call(this, options);
}, LeaderboardMainView.prototype.fetchCollection = function() {
var oldFilters;
return oldFilters = this.collection.filters, this.collection = HR.collection("track-leaderboard"), 
this.collection.setPage(1), this.collection.setLevel(this.level), this.collection.setTrack(this.track), 
this.collection.setType(this.type), this.collection.filters = oldFilters, this.collection.cached(), 
this.listenTo(this.collection, "reset", this.render), HR.router.navigate(this.collection.pageURL() + ("/" + this.collection.page), !1), 
this.render();
}, LeaderboardMainView.prototype.changeTab = function(e) {
var new_level;
return e.preventDefault(), new_level = $(e.currentTarget).attr("data-level"), this.level !== new_level ? (this.$("a[data-level=" + this.level + "]").parent().removeClass("active"), 
this.$("a[data-level=" + new_level + "]").parent().addClass("active"), this.level = new_level, 
this.fetchCollection()) :void 0;
}, LeaderboardMainView.prototype.filterInputFocus = function(e) {
var that;
return that = this, $(e.currentTarget).live("keyup", function(e) {
return that.filterInputKeyup(e);
});
}, LeaderboardMainView.prototype.setFilter = function(value) {
return this.$(".filter-input").val(value), this.$(".filter-input").addClass("disabled"), 
this.collection.addFilter(this.activeFilter, value), this.collection.cached(), HR.router.navigate(this.collection.pageURL() + ("/" + this.collection.page), !1);
}, LeaderboardMainView.prototype.filterInputKeyup = function(e) {
var filter, input, value;
return input = $(e.currentTarget), 13 === e.keyCode ? (filter = input.attr("data-filter"), 
value = input.val().replace(/</g, "").replace(/>/g, ""), this.setFilter(value)) :void 0;
}, LeaderboardMainView.prototype.closeFilter = function() {
return this.$(".btn-group-filters").removeClass("is-open"), this.collection.clearFilters(), 
this.collection.cached(), HR.router.navigate(this.collection.pageURL() + ("/" + this.collection.page), !1);
}, LeaderboardMainView.prototype.changeFilter = function(e) {
var that, _typeaheadOnselect;
return this.collection.clearFilters(), this.activeFilter = $(e.target).html().toLowerCase(), 
this.$(".btn-group-filters").addClass("is-open"), this.$(".filter-input").remove(), 
$("<input type='text' class='filter-input'>").insertBefore(".filters-close"), that = this, 
_typeaheadOnselect = function() {
return that.filterInputKeyup({
currentTarget:this.$element,
keyCode:13
});
}, this.$(".filter-input").completer(this.activeFilter, {
onselect:_typeaheadOnselect
});
}, LeaderboardMainView.prototype.changeTrack = function(newTrack) {
return this.track !== newTrack ? (this.track = newTrack, this.level = 1, this.fetchCollection()) :void 0;
}, LeaderboardMainView.prototype.changeType = function() {
var newType;
return newType = this.$(".leaderboard-option").is(":checked") ? "contest" :"practice", 
newType !== this.type ? (this.type = newType, this.fetchCollection()) :void 0;
}, LeaderboardMainView.prototype.processBlank = function() {
var blankDiv;
return blankDiv = this.$("#blank-reason-container .blank-reason"), this.collection.length > 0 ? (blankDiv.parent().hide(), 
!1) :(_.isBoolean(this.collection.sync_status) ? this.collection.available ? blankDiv.html("Sorry, we do not have enough data to generate the leaderboard.") :blankDiv.html("We are currently generating the leaderboard, please bear with us.") :blankDiv.html(HR.appController.viewLoader(64)), 
this.$("#blank-reason-container").show(), this.$("#leaders").hide(), !0);
}, LeaderboardMainView.prototype.renderScores = function() {
var that;
if (!(this.scores.count > 0 || this.rendering_score) && HR.profile().isLoggedIn()) return that = this, 
this.rendering_score = !0, $.ajax({
url:"/rest/hackers/me/scores",
success:function(data) {
return that.scores = data, that.rendering_score = !1, that.render();
}
});
}, LeaderboardMainView.prototype.render = function() {
var filterValue, keys, leadersDiv, level_to_title, score, that, track, tracks, _i, _j, _len, _len1, _ref;
for (tracks = [ {
slug:"algorithms",
name:"Algorithms",
"short":"AL"
}, {
slug:"ai",
name:"Artificial Intelligence",
"short":"AI"
}, {
slug:"miscellaneous",
name:"Miscellaneous",
"short":"MI"
}, {
slug:"fp",
name:"Functional Programming",
"short":"FP"
} ], _ref = this.scores, _i = 0, _len = _ref.length; _len > _i; _i++) for (score = _ref[_i], 
_j = 0, _len1 = tracks.length; _len1 > _j; _j++) track = tracks[_j], score.slug === track.slug && (score.short = track.short);
return level_to_title = [ "O(1)", "O(logN)", "O(N)", "O(N<sup>2</sup>)", "O(2<sup>N</sup>)" ], 
$(this.el).html(HR.appController.template(this.template, this)({
level:this.level,
track:this.track,
type:this.type,
scores:this.scores,
tracks:tracks,
level_to_title:level_to_title
})), that = this, this.$(".track-selection select").select2(), this.$(".track-selection select").on("change", function(e) {
return that.changeTrack(e.val);
}), this.Switchery || (this.Switchery = require__("switchery")), $.map($(".js-switch"), function(item) {
return $(item).next().hasClass("switchery") ? void 0 :new that.Switchery(item);
}), keys = _.keys(this.collection.filters), keys.length > 0 && (keys.length > 0 && (this.activeFilter = keys[0]), 
filterValue = this.collection.filters[this.activeFilter], this.$(".filter-value-" + this.activeFilter).click(), 
this.setFilter(filterValue)), this.processBlank() ? this :(this.collection.sync_status && (leadersDiv = $(), 
that = this, _.each(this.collection.models, function(model) {
var _view;
return _view = new HR.OverallLeaderboardListView({
leader:model
}), that.add_subview(_view), leadersDiv.push(_view.render().el);
}), this.$("#leaders").append(leadersDiv), this.collection.available && HR.util.pagination(this.$(".pagination-wrapper"), this.collection.getTotal(), "" + this.collection.pageURL() + "/", this.collection.getCurrentPage(), this.collection, this.collection.limit, 10, "backbone", !1)), 
this);
}, LeaderboardMainView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.LeaderboardMainView = LeaderboardMainView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, TracksView, _ref;
return TracksView = function(_super) {
function TracksView() {
return TracksView.__super__.constructor.apply(this, arguments);
}
return __extends(TracksView, _super), TracksView.prototype.template = "tracks", 
TracksView.prototype.className = "tracks-view", TracksView.prototype.initialize = function() {
return this.tracks_list_view = [], this.listenTo(this.collection, "reset", this.render);
}, TracksView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this;
}, TracksView.prototype.renderView = function() {
return this._template && !this.rendered ? ($(this.el).html(this._template()), this.rendered = !0, 
this.renderSubviews()) :this.rendered ? this.renderSubviews() :void 0;
}, TracksView.prototype.renderSubviews = function() {
return this.collection.sync_status ? (this.$(".tracks_list").html(""), _.each(this.collection.models, function(model) {
var _model;
return _model = model.toJSON(), this.track = new HR.TracksListView({
model:model
}), this.add_subview(this.track), this.$(".tracks_list").append("<div class='track_" + _model.slug + "'></div>"), 
this.track.setElement(this.$(".track_" + _model.slug)).render();
}, this)) :void 0;
}, TracksView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TracksView = TracksView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, TracksListView, _ref;
return TracksListView = function(_super) {
function TracksListView() {
return TracksListView.__super__.constructor.apply(this, arguments);
}
return __extends(TracksListView, _super), TracksListView.prototype.template = "tracks-list", 
TracksListView.prototype.className = "tracks-list-view", TracksListView.prototype.initialize = function() {
return this.listenTo(this.model, "render", this.render);
}, TracksListView.prototype.render = function() {
var _model;
return _model = this.model.toJSON(), $(this.el).html(HR.appController.template(this.template, this)({
model:_model
})), this;
}, TracksListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TracksListView = TracksListView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, InboxView, _ref;
return InboxView = function(_super) {
function InboxView() {
return InboxView.__super__.constructor.apply(this, arguments);
}
return __extends(InboxView, _super), InboxView.prototype.template = "inbox", InboxView.prototype.className = "inbox-view", 
InboxView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)), this;
}, InboxView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.InboxView = InboxView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, MessageThreadListView, _ref;
return MessageThreadListView = function(_super) {
function MessageThreadListView() {
return MessageThreadListView.__super__.constructor.apply(this, arguments);
}
return __extends(MessageThreadListView, _super), MessageThreadListView.prototype.template = "messagethread-list", 
MessageThreadListView.prototype.className = "messagethread-list-view", MessageThreadListView.prototype.initialize = function(options) {
return this.thread = options.thread, this.parent = options.parent, this.listenTo(this.model, "reset", this.render), 
this.listenTo(this.model, "change", this.render);
}, MessageThreadListView.prototype.render = function() {
var _model;
return _model = this.model.toJSON(), _model.active = parseInt(_model.id) === parseInt(this.parent.thread_id), 
_model.last_message.receiver_id === (_model.user1 || {}).id ? (_model.receiver = _model.user1, 
_model.sender = _model.user2) :(_model.receiver = _model.user2, _model.sender = _model.user1), 
$(this.el).html(HR.appController.template(this.template, this)({
model:_model,
profile:HR.profile().toJSON()
})), this;
}, MessageThreadListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.MessageThreadListView = MessageThreadListView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, MessageThreadView, _ref;
return MessageThreadView = function(_super) {
function MessageThreadView() {
return MessageThreadView.__super__.constructor.apply(this, arguments);
}
return __extends(MessageThreadView, _super), MessageThreadView.prototype.template = "messagethread", 
MessageThreadView.prototype.className = "messagethread-view", MessageThreadView.prototype.events = {
"click div[data-thread-id]":"viewThread",
"click .hr_send_new_message":"newMessage"
}, MessageThreadView.prototype.initialize = function(options) {
return this.active_thread_id = options.active_thread_id, this.listenTo(this.collection, "reset", this.render), 
this.listenTo(this.collection, "add", this.onAdd), this.listenTo(this.collection, "remove", this.onRemove), 
this.messages_view = {}, this.messages_collection = {}, this.threads_view = {};
}, MessageThreadView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), this;
}, MessageThreadView.prototype.renderView = function() {
return this.has_template ? ($(this.el).html(this._template), this.renderSubviews()) :void 0;
}, MessageThreadView.prototype.renderSubviews = function() {
var that;
return that = this, 0 === this.collection.length ? (this.$(".threads_list").html("<p class='gray'>You have no conversation</p>"), 
this.$(".messaging_content").html("<p class='gray'>No Conversation Selected</p>"), 
void 0) :(this.thread_id || (this.thread_id = this.active_thread_id || this.collection.first().get("id")), 
this.showThread(), this.$(".threads-list-wrap").html(""), _.each(this.collection.models, function(model) {
return that.threads_view[model.get("id")] = new HR.MessageThreadListView({
model:model,
parent:this
}), that.add_subview(that.threads_view[model.get("id")]), this.$(".threads-list-wrap").append("<div data-thread-id='" + model.get("id") + "'></div>"), 
that.threads_view[model.get("id")].setElement(this.$("div[data-thread-id=" + model.get("id") + "]")).render();
}, this));
}, MessageThreadView.prototype.renderMessagesView = function() {
var _base, _name;
return (_base = this.messages_view)[_name = this.thread_id] || (_base[_name] = new HR.MessageView({
collection:this.messages_collection[this.thread_id],
parent:this.threads_view[this.thread_id],
parent2:this
})), this.$(".messaging_content").html(""), this.messages_view[this.thread_id].setElement(this.$(".messaging_content")).render();
}, MessageThreadView.prototype.showThread = function() {
var that;
return that = this, this.messages_collection[this.thread_id] ? that.renderMessagesView() :(this.messages_collection[this.thread_id] = new HR.collection("messages"), 
this.messages_collection[this.thread_id].thread_id = this.thread_id, this.messages_collection[this.thread_id].fetch({
success:function() {
return that.renderMessagesView();
}
})), this.readThread(this.thread_id);
}, MessageThreadView.prototype.viewThread = function(e) {
var $el;
return $el = $(e.currentTarget), this.thread_id = $el.attr("data-thread-id"), this.showThread(), 
Backbone.history.navigate("/inbox/thread/" + this.thread_id), this.$("div li.active").removeClass("active"), 
this.$("div[data-thread-id=" + this.thread_id + "] li").addClass("active");
}, MessageThreadView.prototype.sortByDate = function(a, b) {
return new Date(a.get("last_message").created_at) < new Date(b.get("last_message").created_at);
}, MessageThreadView.prototype.readThread = function(thread_id) {
return this.collection.findWhere({
id:parseInt(thread_id)
}) ? this.collection.findWhere({
id:parseInt(thread_id)
}).markAsRead() :void 0;
}, MessageThreadView.prototype.rearrangeThread = function(id) {
var tempModel;
return tempModel = this.threads_view[id].model, this.collection.remove(tempModel), 
this.collection.add(tempModel, {
at:0
});
}, MessageThreadView.prototype.onAdd = function(model) {
return 1 === this.collection.length && this.$(".threads_list").html(""), this.threads_view[model.get("id")] = new HR.MessageThreadListView({
model:model,
parent:this
}), $(".threads-list-wrap").prepend("<div data-thread-id='" + model.get("id") + "'></div>"), 
this.threads_view[model.get("id")].setElement($("div[data-thread-id=" + model.get("id") + "]")).render();
}, MessageThreadView.prototype.onRemove = function(model) {
var element;
return element = this.$("div[data-thread-id=" + model.get("id") + "]"), element.remove();
}, MessageThreadView.prototype.newMessage = function(e) {
var dialog;
return e.preventDefault(), dialog = new HR.util.ShowMessageDialog(), dialog.render();
}, MessageThreadView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.MessageThreadView = MessageThreadView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, MessageListView, _ref;
return MessageListView = function(_super) {
function MessageListView() {
return MessageListView.__super__.constructor.apply(this, arguments);
}
return __extends(MessageListView, _super), MessageListView.prototype.template = "message-list", 
MessageListView.prototype.className = "message-list-view", MessageListView.prototype.initialize = function(options) {
return this.thread = options.thread, this.listenTo(this.model, "render", this.render);
}, MessageListView.prototype.nl2br = function(str) {
var breakTag;
return breakTag = "<br />", (str + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1" + breakTag + "$2");
}, MessageListView.prototype.render = function() {
var _model;
return _model = this.model.toJSON(), _model.message = this.model.get("id") ? this.nl2br(_model.message) :this.nl2br(_.escape(_model.message)), 
_model.receiver_id === this.thread.user1.id ? (_model.receiver = this.thread.user1, 
_model.sender = this.thread.user2) :(_model.receiver = this.thread.user2, _model.sender = this.thread.user1), 
$(this.el).html(HR.appController.template(this.template, this)({
model:_model
}));
}, MessageListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.MessageListView = MessageListView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, MessageView, _ref;
return MessageView = function(_super) {
function MessageView() {
return MessageView.__super__.constructor.apply(this, arguments);
}
return __extends(MessageView, _super), MessageView.prototype.template = "message", 
MessageView.prototype.className = "message-view", MessageView.prototype.events = {
"click .hr_send":"sendMessage",
"click .hr_load_more":"loadMore",
"keydown .hr_message_text":"keyPressed"
}, MessageView.prototype.initialize = function(options) {
return this.local_id = 0, this.messages = {}, this.parent = options.parent, this.parent2 = options.parent2, 
this.listenTo(this.collection, "add", this.onAdd), $(window).resize(this.resize), 
this.resize(), this.collection.length > 0 ? this.parent.model.set("last_message", this.collection.first().toJSON()) :void 0;
}, MessageView.prototype.render = function() {
var func;
if (parseInt(this.parent.model.get("id")) === parseInt(this.parent2.thread_id)) return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this._template = template, this.has_template = !0, this.renderView();
}, this), func = function() {
return $(".hr_message_text").focus();
}, setTimeout(func, 1);
}, MessageView.prototype.resize = function() {
var messageHeight, windowHeight;
return windowHeight = $(window).height(), messageHeight = .75 * windowHeight, $(".messaging_content").css("height", messageHeight);
}, MessageView.prototype.renderView = function() {
return this.has_template && ($(this.el).html(this._template({
has_more:this.collection.has_more
})), this.renderSubviews()), $(".message_history").scrollTop($(".message_history")[0].scrollHeight), 
this.resize();
}, MessageView.prototype.prependElement = function(model) {
var id, thread;
if (parseInt(this.parent.model.get("id")) === parseInt(this.parent2.thread_id)) return thread = new HR.MessageListView({
model:model,
thread:this.collection.thread,
parent:this
}), this.add_subview(thread), id = model.get("id") || model.get("local_id"), this.messages[id] = thread, 
this.$(".message_list").prepend("<div data-id='" + id + "'></div>"), thread.setElement(this.$("div[data-id=" + id + "]")).render(), 
this.from_bottom || (this.from_bottom = 0), $(".message_history").scrollTop($(".message_history")[0].scrollHeight - this.from_bottom);
}, MessageView.prototype.appendElement = function(model) {
var id, thread;
if (parseInt(this.parent.model.get("id")) === parseInt(this.parent2.thread_id)) return thread = new HR.MessageListView({
model:model,
thread:this.collection.thread,
parent:this
}), this.add_subview(thread), id = model.get("id") || model.get("local_id"), this.messages[id] = thread, 
this.$(".message_list").append("<div data-id='" + id + "'></div>"), thread.setElement(this.$("div[data-id=" + id + "]")).render(), 
this.from_bottom || (this.from_bottom = 0), $(".message_history").scrollTop($(".message_history")[0].scrollHeight - this.from_bottom);
}, MessageView.prototype.renderSubviews = function() {
var that;
return that = this, this.collection.sync_status ? (this.$(".message_list").html(""), 
_.each(this.collection.models, function(model) {
return that.prependElement(model);
}, this)) :void 0;
}, MessageView.prototype.loadMore = function() {
var newCollection, that;
if (parseInt(this.parent.model.get("id")) === parseInt(this.parent2.thread_id) && !this.loading_more) return this.loading_more = !0, 
that = this, this.from_bottom = $(".message_history")[0].scrollHeight, this.collection.length > 0 ? (newCollection = new HR.collection("messages"), 
newCollection.thread_id = this.collection.thread_id, newCollection.setUntil(this.collection.last().get("id")), 
newCollection.fetch({
success:function() {
var index;
return that.loading_more = !1, that.collection.has_more = newCollection.has_more, 
index = 0, _.each(newCollection.models, function(model) {
return that.ignore = !0, that.collection.add(model), that.ignore = !1, that.prependElement(model), 
index++;
}), that.collection.has_more === !1 ? $(".hr_load_more").hide() :void 0;
},
error:function() {
return that.loading_more = !1;
}
})) :void 0;
}, MessageView.prototype.keyPressed = function(e) {
return 13 !== e.keyCode || e.shiftKey ? void 0 :(e.preventDefault(), this.sendMessage());
}, MessageView.prototype.sendMessage = function() {
var data, model, that;
if (parseInt(this.parent.model.get("id")) === parseInt(this.parent2.thread_id) && "" !== $(".hr_message_text").val()) return this.from_bottom = 0, 
that = this, model = new HR.MessageModel(), data = {
sender_id:this.collection.thread.user1.id,
receiver_id:this.collection.thread.user2.id,
message:$(".hr_message_text").val()
}, model.set("message", data.message), model.set("sender_id", data.sender_id), model.set("receiver_id", data.receiver_id), 
model.set("created_at", new Date()), that.collection.add(model, {
at:0
}), $(".hr_message_text").val(""), model.save(data, {
success:function() {
return function(resp) {
return model.set("created_at", resp.get("created_at")), that.messages[model.get("local_id")].render();
};
}(this)
});
}, MessageView.prototype.onAdd = function(model) {
return this.ignore ? void 0 :(model.set("local_id", this.local_id), this.parent2.rearrangeThread(this.parent.model.get("id")), 
this.local_id -= 1, this.appendElement(model), this.parent.model.set("last_message", model.toJSON()), 
this.parent.render());
}, MessageView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.MessageView = MessageView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, NavigationMessageView, _ref;
return NavigationMessageView = function(_super) {
function NavigationMessageView() {
return NavigationMessageView.__super__.constructor.apply(this, arguments);
}
return __extends(NavigationMessageView, _super), NavigationMessageView.prototype.template = "navigation-message", 
NavigationMessageView.prototype.initialize = function() {
return this.collection = HR.cachedMessagesCollection, this.thread_views = {}, this.listenTo(this.collection, "reset", this.render), 
this.listenTo(this.collection, "remove", this.onRemove), this.listenTo(this.collection, "add", this.onAdd);
}, NavigationMessageView.prototype.render = function() {
var that;
return $(this.el).html(HR.appController.template(this.template, this, !1)), that = this, 
this.thread_views = {}, this.$(".hr_nav_messages_list").html(""), _.each(this.collection.models, function(model) {
return that.thread_views[model.get("id")] = new HR.NavigationMessageListView({
model:model
}), that.$(".hr_nav_messages_list").append(that.thread_views[model.get("id")].render().el);
});
}, NavigationMessageView.prototype.onAdd = function(model) {
return this.thread_views[model.get("id")] = new HR.NavigationMessageListView({
model:model
}), this.$(".hr_nav_messages_list").prepend(this.thread_views[model.get("id")].render().el);
}, NavigationMessageView.prototype.onRemove = function(model) {
return this.thread_views[model.get("id")].remove();
}, NavigationMessageView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.NavigationMessageView = NavigationMessageView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, NavigationMessageListView, _ref;
return NavigationMessageListView = function(_super) {
function NavigationMessageListView() {
return NavigationMessageListView.__super__.constructor.apply(this, arguments);
}
return __extends(NavigationMessageListView, _super), NavigationMessageListView.prototype.template = "navigation-message-list", 
NavigationMessageListView.prototype["class"] = "navigation-message-list-view", NavigationMessageListView.prototype.events = {
"click a.message_status":"markAsRead",
"click li.notify_item":"goToThread"
}, NavigationMessageListView.prototype.initialize = function() {
return this.listenTo(this.model, "change", this.render);
}, NavigationMessageListView.prototype.goToThread = function(e) {
return "I" !== e.target.tagName || "icon-reply" === e.target.className ? (HR.router.navigate("/inbox/thread/" + this.model.get("id"), {
trigger:!0,
replace:!0
}), $(".notify_dropdown").removeClass("open")) :void 0;
}, NavigationMessageListView.prototype.markAsRead = function(e) {
return "mark as read" === $(e.currentTarget).attr("data-original-title") ? this.model.markAsRead() :this.model.markAsUnread();
}, NavigationMessageListView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this, !1)({
model:this.model
})), this;
}, NavigationMessageListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.NavigationMessageListView = NavigationMessageListView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, NavigationNotificationView, _ref;
return NavigationNotificationView = function(_super) {
function NavigationNotificationView() {
return NavigationNotificationView.__super__.constructor.apply(this, arguments);
}
return __extends(NavigationNotificationView, _super), NavigationNotificationView.prototype.template = "navigation-notification", 
NavigationNotificationView.prototype.events = {
"click .hr_archive_all":"archiveAll",
"click .no-propagation":"stopPropagation",
"click li[data-id]":"clickNotification"
}, NavigationNotificationView.prototype.initialize = function() {
return HR.cachedNotificationsCollection ? this.collection = HR.cachedNotificationsCollection :(this.collection = HR.collection("notifications"), 
this.collection.unread_only = !0, HR.cachedNotificationsCollection = this.collection, 
this.collection.cached()), this.list_views = {}, this.listenTo(this.collection, "reset", this.render), 
this.listenTo(this.collection, "add", this.render), this.listenTo(this.collection, "remove", this.onRemove);
}, NavigationNotificationView.prototype.showLoader = function() {
var loader;
return loader = $(HR.appController.viewLoader(32)), loader.css({
"padding-top":"20px",
"padding-bottom":"20px"
}), this.$(".hr_nav_notifications_list").html(loader);
}, NavigationNotificationView.prototype.archiveAll = function(e) {
var newCollection, notif_ids, that;
return e.stopPropagation(), this.collection.sync_status ? (notif_ids = [], _.each(this.collection.models, function(model) {
return notif_ids.push(model.get("id"));
}), that = this, newCollection = HR.collection("notifications"), newCollection.unread_only = !0, 
newCollection.offset = this.collection.length, this.collection.reset(), this.showLoader(), 
newCollection.fetch({
success:function(resp) {
return $.ajax({
type:"POST",
url:"/rest/contests/master/notifications/archive_all",
data:{
notif_ids:notif_ids
},
success:function(resp) {
return HR.appView.navigationView.updateNotificationsCount(resp.unread_count);
}
}), _.each(resp.models, function(model) {
return that.collection.add(model);
}), that.collection.has_more = newCollection.has_more, that.render();
},
error:function() {
return that.render();
}
})) :void 0;
}, NavigationNotificationView.prototype.stopPropagation = function(e) {
return e.stopPropagation();
}, NavigationNotificationView.prototype.clickNotification = function(e) {
var id, that;
return id = $(e.currentTarget).attr("data-id"), that = this, HR.router.navigate("/notifications/notif_id/" + id, !0);
}, NavigationNotificationView.prototype.render = function() {
var handleScroll, that;
return this.collection.sync_status ? (that = this, handleScroll = function() {
var element, loader, newCollection, pos;
return element = $(".hr_nav_notifications_list"), pos = element.scrollTop(), pos + element.height() === element[0].scrollHeight && that.collection.has_more && !that.loading_more ? (that.loading_more = !0, 
loader = $(HR.appController.viewLoader(32)), loader.css({
"padding-top":"20px",
"padding-bottom":"20px"
}), element.append(loader), newCollection = HR.collection("notifications"), newCollection.unread_only = !0, 
newCollection.offset = that.collection.length, newCollection.fetch({
success:function(resp) {
return _.each(resp.models, function(model) {
return that.collection.add(model);
}), that.collection.has_more = newCollection.has_more, that.loading_more = !1, loader.remove();
},
error:function() {
return loader.remove();
}
})) :void 0;
}, this.$(".hr_nav_notifications_list").scroll(handleScroll), 0 === this.collection.length ? this.$(".hr_nav_notifications_list").html("<div class='no-propagation text-center' style='padding: 30px 0px 30px 0px; font-size:16px'>You have no unread notifications</div>") :(that = this, 
this.$(".hr_nav_notifications_list").html(""), _.each(this.collection.models, function(model) {
var listview;
return model.get("notification_status") < 2 ? (listview = new HR.NavigationNotificationListView({
model:model
}), that.list_views[model.get("id")] = listview, that.$(".hr_nav_notifications_list").append(listview.render().el)) :void 0;
})), this) :(this.showLoader(), void 0);
}, NavigationNotificationView.prototype.onRemove = function() {
return 0 === this.collection.length && (this.collection.sync_status = !1, this.collection.cached({
fetch:!0
})), this.render();
}, NavigationNotificationView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.NavigationNotificationView = NavigationNotificationView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, NavigationNotificationListView, _ref;
return NavigationNotificationListView = function(_super) {
function NavigationNotificationListView() {
return NavigationNotificationListView.__super__.constructor.apply(this, arguments);
}
return __extends(NavigationNotificationListView, _super), NavigationNotificationListView.prototype.template = "navigation-notification-list", 
NavigationNotificationListView.prototype.events = {
"click a.close":"archive"
}, NavigationNotificationListView.prototype.initialize = function() {
return this.listenTo(this.model, "destroy", this.remove);
}, NavigationNotificationListView.prototype.archive = function(e) {
return e.stopPropagation(), this.model.markRead();
}, NavigationNotificationListView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this, !1)({
model:this.model.toJSON()
})), this;
}, NavigationNotificationListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.NavigationNotificationListView = NavigationNotificationListView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var BlogIndexView, HR, _ref;
return BlogIndexView = function(_super) {
function BlogIndexView() {
return BlogIndexView.__super__.constructor.apply(this, arguments);
}
return __extends(BlogIndexView, _super), BlogIndexView.prototype.template = "blogindex", 
BlogIndexView.prototype.template404 = "dashboard/e404", BlogIndexView.prototype.className = "blogindex-view", 
BlogIndexView.prototype.initialize = function(options) {
return this.collection = options.collection, this.current_hacker = options.current_hacker, 
this.listenTo(this.collection, "reset", this.render), this.listenTo(this.collection, "change", this.render);
}, BlogIndexView.prototype.render = function() {
var url;
return this.collection.sync_status && (this.current_hacker.get("is_admin") ? $(this.el).html(HR.appController.template(this.template, this)({
collection:this.collection.toJSON(),
current_hacker:this.current_hacker.toJSON()
})) :(HR.appController.setTitle("HTTP 404: Page Not Found"), $(this.el).html(HR.appController.template(this.template404, this)))), 
url = "" + this.collection.pageURL(), HR.util.pagination(this.$(".pagination-wrapper"), this.collection.getTotal(), "" + url + "/page/", this.collection.getCurrentPage(), null, this.collection.limit), 
this;
}, BlogIndexView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.BlogIndexView = BlogIndexView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var BlogAdminView, HR, _ref;
return BlogAdminView = function(_super) {
function BlogAdminView() {
return BlogAdminView.__super__.constructor.apply(this, arguments);
}
return __extends(BlogAdminView, _super), BlogAdminView.prototype.template = "blogadmin", 
BlogAdminView.prototype.template404 = "dashboard/e404", BlogAdminView.prototype.className = "blogadmin-view", 
BlogAdminView.prototype.initialize = function(options) {
return this.templates = HR.collection("blog-templates").cached(), this.current_hacker = options.current_hacker.toJSON(), 
this.listenTo(this.model, "reset", this.render), this.listenTo(this.model, "change", this.render), 
this.listenTo(this.templates, "reset", this.render), this.listenTo(this.templates, "change", this.render), 
this.render;
}, BlogAdminView.prototype.render = function() {
var that, _model, _templates;
return that = this, _model = this.model.toJSON(), _templates = this.templates.toJSON(), 
this.current_hacker.is_admin ? (HR.appController.setTitle("Blog-Edit"), $(this.el).html(HR.appController.template(this.template, this)({
model:_model,
templates:_templates
})), _templates && $("select.js-template").val(_model.blog_template_id), this.setFields()) :(HR.appController.setTitle("HTTP 404: Page Not Found"), 
$(this.el).html(HR.appController.template(this.template404, this))), this;
}, BlogAdminView.prototype.setFields = function() {
var _model;
return _model = this.model.toJSON(), $("#postTitle").val(_model.title), $("#postContent").val(_model.content), 
$("#postSlug").val(_model.slug);
}, BlogAdminView.prototype.events = {
"click a.js-save-draft":"saveDraft",
"click a.js-publish-post":"publishPost",
"click a.js-unpublish":"unpublishPost",
"click a.js-preview-post":"saveDraft",
"change select.js-template":"selectTemplate",
"change input.js-slug":"editSlug"
}, BlogAdminView.prototype.publishPost = function(event) {
return event.preventDefault(), this.model.set({
content:$("#postContent").val(),
title:$("#postTitle").val(),
slug:$("#postSlug").val(),
draft:!1
}), this.saveModel();
}, BlogAdminView.prototype.saveDraft = function(event) {
return event.preventDefault(), this.model.set({
content:$("#postContent").val(),
title:$("#postTitle").val(),
slug:$("#postSlug").val()
}), this.saveModel();
}, BlogAdminView.prototype.unpublishPost = function(event) {
return event.preventDefault(), this.model.set({
draft:!0
}), this.saveModel();
}, BlogAdminView.prototype.saveModel = function() {
return this.model.save(null, {
success:function(_this) {
return function(model) {
return _this.model = model, new HR.BlogsCollection().cached({
fetch:!0
}), HR.router.navigate("/oldblog/" + model.id + "/edit", !0);
};
}(this),
error:function() {
return function() {};
}(this)
});
}, BlogAdminView.prototype.selectTemplate = function() {
var template;
return template = this.templates.toJSON()[parseInt($("select.js-template").val()) - 1], 
this.model.set({
blog_template_id:$("select.js-template").val(),
content:template.template
});
}, BlogAdminView.prototype.editSlug = function() {
return this.model.set({
manual_slug:!0
});
}, BlogAdminView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.BlogAdminView = BlogAdminView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, SinglePostView, _ref;
return SinglePostView = function(_super) {
function SinglePostView() {
return SinglePostView.__super__.constructor.apply(this, arguments);
}
return __extends(SinglePostView, _super), SinglePostView.prototype.template = "singlepost", 
SinglePostView.prototype.template404 = "dashboard/e404", SinglePostView.prototype.className = "singlepost-view container", 
SinglePostView.prototype.initialize = function(options) {
return this.current_hacker = options.current_hacker, this.listenTo(this.model, "reset", this.render), 
this.listenTo(this.model, "change", this.render), this.render();
}, SinglePostView.prototype.render = function() {
var _model;
return _model = this.model.toJSON(), this.model.sync_status && (this.current_hacker.get("is_admin") ? (HR.appController.setTitle("Blogs-" + _model.title), 
$(this.el).html(HR.appController.template(this.template, this)({
model:_model,
current_hacker:this.current_hacker.toJSON()
}))) :(HR.appController.setTitle("HTTP 404: Page Not Found"), $(this.el).html(HR.appController.template(this.template404, this)))), 
this;
}, SinglePostView.prototype.events = {
"click a.js-blog-tweet":"tweet",
"click a.js-blog-fb-share":"fbshare"
}, SinglePostView.prototype.fbshare = function(event) {
var h, left, permalink, top, url, w;
return permalink = this.getPermaLink(), event.preventDefault(), w = 600, h = 350, 
left = screen.width / 2 - w / 2, top = screen.height / 2 - h / 2, url = "https://www.facebook.com/sharer/sharer.php?s=100&p[url]=" + encodeURIComponent(document.location.href) + "&p[title]=" + encodeURIComponent(this.model.get("title")) + "&p[summary]=" + encodeURIComponent(this.model.get("preview_plain")), 
window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left), 
window.focus();
}, SinglePostView.prototype.tweet = function(event) {
var h, left, permalink, text, top, url, w;
return permalink = this.getPermaLink(), event.preventDefault(), w = 600, h = 350, 
left = screen.width / 2 - w / 2, top = screen.height / 2 - h / 2, text = "Awesome blog post from @HackerRank. Read it: " + permalink, 
url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text), window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left), 
window.focus();
}, SinglePostView.prototype.getPermaLink = function() {
return "" + document.location.protocol + "//" + document.location.host + "/blog/" + this.model.get("slug");
}, SinglePostView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SinglePostView = SinglePostView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, TeamView, _ref;
return TeamView = function(_super) {
function TeamView() {
return TeamView.__super__.constructor.apply(this, arguments);
}
return __extends(TeamView, _super), TeamView.prototype.template = "team", TeamView.prototype.className = "team-view", 
TeamView.prototype.initialize = function(options) {
return this.action = options.action || "create", this.model ? (this.listenTo(this.model, "reset", this.render), 
this.listenTo(this.model, "sync", this.render), this.model.fetch()) :void 0;
}, TeamView.prototype.events = {
"click a[data-toggle=tab]":"changeTab",
"keyup input#name":"updateHandle",
"keyup input#slug":"enableSave",
"click button.team-submit":"updateTeam",
"click button.add-member-submit":"addMember",
"click button.remove-member":"removeMember"
}, TeamView.prototype.render = function() {
var that;
return this.hacker = HR.profile(), this.model && _.size(this.model.attributes) > 0 && this.model.sync_status && this.model.get("manager_id") !== this.hacker.get("id") && "view" !== this.action && (HR.CONTEST_NAMESPACE ? HR.router.navigate("/contests/" + HR.CONTEST_NAMESPACE + "/teams/" + this.model.get("id") + "/view", !0) :HR.router.navigate("/teams/" + this.model.get("id") + "/view", !0)), 
this.render_locked || ($(this.el).html(HR.appController.template(this.template, this)({
team:this.model,
hacker:this.hacker,
action:this.action
})), "create" === this.action && (that = this, this.$("input#contest_id").select2({
minimumInputLength:1,
query:function(query) {
return $.ajax("/rest/contests/team_events", {
success:function(data) {
return query.callback(data), that.enableSave();
}
});
}
}))), this;
}, TeamView.prototype.destroy = function() {
return this.$("input#contest_id").select2("close"), TeamView.__super__.destroy.call(this);
}, TeamView.prototype.changeTab = function(e) {
var tab;
return e.preventDefault(), "create" !== this.action ? $(e.currentTarget).hasClass("active") ? void 0 :(tab = $(e.currentTarget).parent().attr("data-action"), 
HR.CONTEST_NAMESPACE ? HR.router.navigate("/contests/" + HR.CONTEST_NAMESPACE + "/teams/" + this.model.get("id") + "/" + tab, !0) :HR.router.navigate("/teams/" + this.model.get("id") + "/" + tab, !0)) :void 0;
}, TeamView.prototype.updateHandle = function(e) {
return this.$("input#slug").val(HR.util.slugify($(e.currentTarget).val(), "_")), 
this.enableSave(e);
}, TeamView.prototype.enableSave = function() {
return this.$("button.team-submit").removeClass("disabled");
}, TeamView.prototype.updateTeam = function(e) {
var allowed_fields, that;
return e.preventDefault(), $(e.currentTarget).hasClass("disabled") ? void 0 :($(e.currentTarget).html("Saving..."), 
this.$("article#details p.success").addClass("hide").html(""), this.$("article#details p.error").addClass("hide").html(""), 
this.$("article#details small.error").html(""), allowed_fields = [ "name", "slug" ], 
"create" === this.action && allowed_fields.push("contest_id"), this.model || (this.model = new HR.TeamModel()), 
_.each(allowed_fields, function(field) {
return this.model.set(field, this.$("article#details form input#" + field).val());
}, this), that = this, this.render_locked = !0, this.model.save(null, {
success:function(model) {
return model.status ? "details" === that.action ? that.$("article#details p.success").removeClass("hide").html("Changes have been saved successfully") :"create" === that.action && HR.router.navigate((HR.CURRENT_NAMESPACE ? "/contest/" + HR.CURRENT_NAMESPACE :"") + ("/teams/" + model.get("id") + "/details"), !0) :(model.errors._global ? that.$("article#details p.error").removeClass("hide").html(model.errors._global) :that.$("article#details p.error").removeClass("hide").html("There was an error").show(), 
_.each(model.errors, function(value, key) {
return "_global" !== key ? that.$("article#details input#" + key).parent().find(".error").html(value[0]) :void 0;
})), $(e.currentTarget).html("Save").addClass("disabled");
}
}));
}, TeamView.prototype.addMember = function(e) {
var team_member, that;
return e.preventDefault(), this.$("input.add-member-username").val() ? (team_member = new HR.TeamMemberModel(), 
team_member.set("team_id", this.model.get("id")), team_member.set("username", this.$("input.add-member-username").val()), 
that = this, team_member.save(null, {
success:function(model) {
return model.status ? (that.model.members().add(model), that.render_locked = !1, 
that.model.fetch()) :(model.errors._global ? that.$("article#members p.error").removeClass("hide").html(model.errors._global) :that.$("article#members p.error").removeClass("hide").html("There was an error").show(), 
_.each(model.errors, function(value, key) {
return "_global" !== key ? that.$("article#members input#" + key).parent().find(".error").html(value[0]) :void 0;
}));
}
})) :void 0;
}, TeamView.prototype.removeMember = function(e) {
var dialog, that;
return e.preventDefault(), $(e.currentTarget).hasClass("disabled") ? void 0 :($(e.currentTarget).addClass("disabled"), 
that = this, dialog = HR.util.ShowConfirmationDialog({
title:"Confirm Removal",
body:"Are you sure?",
onDestroy:function() {
return $(e.currentTarget).removeClass("disabled");
},
buttons:[ {
name:"Yes",
callback:function(dialog) {
var btn, team_member;
return btn = this, team_member = that.model.members().get($(e.currentTarget).attr("data-id")), 
that.model.members().remove(team_member), team_member.destroy({
success:function() {
return btn.setInactive(), dialog.destroy(), that.render_locked = !1, that.model.fetch();
}
});
}
}, {
name:"No",
callback:function(dialog) {
return this.setInactive(), dialog.destroy();
}
} ]
}), dialog.render());
}, TeamView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TeamView = TeamView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var EditorialView, HR, _ref;
return EditorialView = function(_super) {
function EditorialView() {
return EditorialView.__super__.constructor.apply(this, arguments);
}
return __extends(EditorialView, _super), EditorialView.prototype.template = "editorial", 
EditorialView.prototype.className = "editorial-view container", EditorialView.prototype.initialize = function(options) {
return this.current_hacker = options.current_hacker, this.listenTo(this.model, "reset", this.render), 
this.listenTo(this.model, "change", this.render), this.render();
}, EditorialView.prototype.render = function() {
return this.model.sync_status && $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON(),
current_hacker:this.current_hacker.toJSON()
})), this;
}, EditorialView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.EditorialView = EditorialView;
});
}.call(this);