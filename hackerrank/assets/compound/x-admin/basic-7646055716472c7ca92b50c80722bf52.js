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
var GenericModel, HR, _ref;
return GenericModel = function(_super) {
function GenericModel() {
return GenericModel.__super__.constructor.apply(this, arguments);
}
return __extends(GenericModel, _super), GenericModel.prototype.initialize = function(attributes, options) {
return null == attributes && (attributes = {}), null == options && (options = {}), 
options.casual && (this.casual = {}, this.casual.min_fetch_timelapse = 1e4, this.casual.timestamp = new Date().getTime()), 
null == this.caching && (this.caching = !0), GenericModel.__super__.initialize.call(this, attributes, options);
}, GenericModel.prototype.url = function() {
return "" + this.restURL() + "?" + this.queryParams();
}, GenericModel.prototype.queryParams = function() {
return "";
}, GenericModel.prototype.setCaching = function(caching) {
this.caching = caching;
}, GenericModel.prototype.restPrefix = !0, GenericModel.prototype.restURL = function() {
var rest, _url;
return _url = "" + this.ns(rest = !0) + this.baseURL(), "" + HR.restURL(_url, this.restPrefix);
}, GenericModel.prototype.pageURL = function() {
return "" + this.ns() + this.baseURL();
}, GenericModel.prototype.baseURL = function() {
return "/dummy";
}, GenericModel.prototype.ns = function(rest) {
return null == rest && (rest = !1), this.collection && (this.contest_slug || (this.contest_slug = this.contest_slug || this.get("contest_slug") || this.collection.contest_slug)), 
this.contest_slug || (this.contest_slug = HR.appController.get_current_contest_slug()), 
this.contest_slug || (this.contest_slug = "master"), HR.namespace(this.contest_slug, rest);
}, GenericModel.prototype.hasChanged = function(attr) {
return GenericModel.__super__.hasChanged.call(this, attr);
}, GenericModel.prototype.keyPrefix = function() {
return HR.profile().get("key_prefix");
}, GenericModel.prototype.modelCrumbs = function() {
var crumbs;
return crumbs = HR.collection("bread-crumbs"), this.id && crumbs.add({
id:"" + this.constructor.name + "-" + this.id,
slug:this.get("slug") || this.get("id"),
path:this.pageURL(),
name:this.get("name") || this.get("title"),
model:this
}), crumbs;
}, GenericModel.prototype.setContestCrumb = function() {
var contest, contest_slug;
return contest_slug = this.contest_slug || this.get("contest-slug"), contest_slug ? contest = HR.model("contest", {
slug:this.contest_slug
}).cached({
success:function(_this) {
return function(model) {
return _this.crumbs.merge(model.breadCrumbs(), {
at:0
});
};
}(this)
}) :void 0;
}, GenericModel.prototype.breadCrumbs = function() {
return this.crumbs || (this.crumbs = HR.collection("bread-crumbs"), this.setContestCrumb()), 
this.crumbs.merge(this.modelCrumbs()), this.crumbs;
}, GenericModel.prototype.save = function(key, val, options) {
return this.id && this.caching && this.cacheSet(key, val, options), this.collection && this.collection.flush(), 
Backbone.Model.prototype.save.apply(this, arguments);
}, GenericModel.prototype.fetch = function() {
return void 0 === this.disableThrobber || this.disableThrobber !== !0 ? HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("Loading...", !1, !0, 1e3) :this.disableThrobber = !1, 
Backbone.Model.prototype.fetch.apply(this, arguments);
}, GenericModel.prototype.parse = function(resp, xhr) {
var f, parsed, set_data_fields, that, _fn, _i, _len;
if (void 0 !== xhr || resp.model) {
for (this.sync_status = !0, void 0 === this.disableThrobber || this.disableThrobber !== !0 ? HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("", !1, !0, 0) :this.disableThrobber = !1, 
set_data_fields = [ "total", "page", "activities", "gamedata", "status", "metadata", "errors" ], 
that = this, _fn = function(f) {
return void 0 !== resp[f] ? that[f] = resp[f] :void 0;
}, _i = 0, _len = set_data_fields.length; _len > _i; _i++) f = set_data_fields[_i], 
_fn(f);
parsed = GenericModel.__super__.parse.call(this, resp.model, xhr);
} else parsed = GenericModel.__super__.parse.call(this, resp, xhr);
return parsed;
}, GenericModel;
}(Backbone.Model), HR = null != (_ref = window.HR) ? _ref :{}, HR.GenericModel = GenericModel;
});
}).call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var GenericCollection, HR, _ref;
return GenericCollection = function(_super) {
function GenericCollection() {
return GenericCollection.__super__.constructor.apply(this, arguments);
}
return __extends(GenericCollection, _super), GenericCollection.prototype.url = function() {
return "" + this.restURL() + "?" + this.queryParams();
}, GenericCollection.prototype.queryParams = function() {
var _query;
return (!this.page || this.page < 1) && (this.page = 1), this.limit || (this.limit = 10), 
_query = this.query ? "&query=" + this.query :"", "offset=" + (this.page - 1) * this.limit + "&limit=" + this.limit + _query;
}, GenericCollection.prototype.restPrefix = !0, GenericCollection.prototype.restURL = function() {
var rest, _url;
return _url = "" + this.ns(rest = !0) + this.baseURL(), "" + HR.restURL(_url, this.restPrefix);
}, GenericCollection.prototype.pageURL = function() {
return "" + this.ns() + this.baseURL();
}, GenericCollection.prototype.getTotal = function() {
return this.total;
}, GenericCollection.prototype.getCurrentPage = function() {
return this.page;
}, GenericCollection.prototype.cacheModels = !1, GenericCollection.prototype.keyPrefix = function() {
return HR.profile().get("key_prefix");
}, GenericCollection.prototype.baseURL = function() {
return "/dummies";
}, GenericCollection.prototype.ns = function(rest) {
return null == rest && (rest = !1), HR.namespace(this.contest_slug, rest);
}, GenericCollection.prototype.collectionCrumbs = function() {
return HR.collection("bread-crumbs");
}, GenericCollection.prototype.setContestCrumb = function() {
var contest, contest_slug;
return contest_slug = this.contest_slug || this.get("contest-slug"), contest_slug ? contest = HR.model("contest", {
slug:this.contest_slug
}).cached({
success:function(_this) {
return function(model) {
return _this.crumbs.merge(model.breadCrumbs(), {
at:0
});
};
}(this)
}) :void 0;
}, GenericCollection.prototype.breadCrumbs = function() {
return this.crumbs || (this.crumbs = HR.collection("bread-crumbs"), this.setContestCrumb()), 
this.crumbs.merge(this.collectionCrumbs()), this.crumbs;
}, GenericCollection.prototype.merge = function(collection, options) {
return this.add(collection.models, options);
}, GenericCollection.prototype.parse = function(resp, xhr) {
var f, parsed, set_data_fields, that, _fn, _i, _len;
if (void 0 !== xhr || resp.models) {
for (this.sync_status = !0, set_data_fields = [ "total", "page", "activities", "round_data", "available", "ongoing_count", "slug_title", "errors", "current_hacker", "contest", "gross" ], 
that = this, _fn = function(f) {
return void 0 !== resp[f] ? that[f] = resp[f] :void 0;
}, _i = 0, _len = set_data_fields.length; _len > _i; _i++) f = set_data_fields[_i], 
_fn(f);
parsed = GenericCollection.__super__.parse.call(this, resp.models, xhr);
} else parsed = GenericCollection.__super__.parse.call(this, resp, xhr);
return parsed = _.map(parsed, function(_this) {
return function(modelData) {
var model;
return model = new _this.model(modelData), _this.cacheModels && model.cacheSet(), 
model;
};
}(this));
}, GenericCollection;
}(Backbone.Collection), HR = null != (_ref = window.HR) ? _ref :{}, HR.GenericCollection = GenericCollection;
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
var CommonSidebarNavigationView, HR, _ref;
return CommonSidebarNavigationView = function(_super) {
function CommonSidebarNavigationView() {
return CommonSidebarNavigationView.__super__.constructor.apply(this, arguments);
}
return __extends(CommonSidebarNavigationView, _super), CommonSidebarNavigationView.prototype.initialize = function(options) {
var _ref;
return this.active_nav_link = options.active_nav_link, this.sideBarClass = null != (_ref = options.sideBarClass) ? _ref :"open";
}, CommonSidebarNavigationView.prototype.updateData = function(model, active_nav_link) {
return this.model = model, this.active_nav_link = active_nav_link, this.sideBarClass = this.collapseClass();
}, CommonSidebarNavigationView.prototype.collapseClass = function() {
return $(".hre-sidebar").hasClass("open") ? "open" :$(".hre-sidebar").hasClass("closed") ? "closed" :void 0;
}, CommonSidebarNavigationView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
active_nav_link:this.active_nav_link,
throbber:HR.appController.viewLoader(),
sideBarClass:this.sideBarClass
}), $(this.el).html(content), this;
}, CommonSidebarNavigationView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CommonSidebarNavigationView = CommonSidebarNavigationView;
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
var AdminCommonPeriodicFormView, HR, _ref;
return AdminCommonPeriodicFormView = function(_super) {
function AdminCommonPeriodicFormView() {
return AdminCommonPeriodicFormView.__super__.constructor.apply(this, arguments);
}
return __extends(AdminCommonPeriodicFormView, _super), AdminCommonPeriodicFormView.prototype.template = "x-admin/periodic-report", 
AdminCommonPeriodicFormView.prototype.searchBy = "id", AdminCommonPeriodicFormView.prototype.searchBySelected = !1, 
AdminCommonPeriodicFormView.prototype.companyFields = {
id:"id",
name:"name",
email:"email"
}, AdminCommonPeriodicFormView.prototype.reportType = "company_attempts", AdminCommonPeriodicFormView.prototype.events = {
"change .search-radio-grp input":"syncSearchBy",
"change select#report-type-select":"changeReportType",
"submit form[name=periodic-table-form]":"addOrUpdateCron"
}, AdminCommonPeriodicFormView.prototype.initCompanySelectBox = function() {
var defaultOptions, options, that;
return that = this, defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
placeholder:"Select a Company",
ajax:{
url:"/x/api/v1/admin/search/companies",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return that.searchBySelected || ($.isNumeric(term) ? (that.searchBy = "id", $(".search-radio-grp input:nth(0)").prop("checked", !0)) :-1 === term.indexOf("@") ? (that.searchBy = "name", 
$(".search-radio-grp input:nth(1)").prop("checked", !0)) :-1 !== term.indexOf("@") && (that.searchBy = "email", 
$(".search-radio-grp input:nth(2)").prop("checked", !0))), {
q:term,
fields:that.companyFields[that.searchBy]
};
},
results:function(data) {
return {
results:data.results
};
}
}
}, options = _.extend(defaultOptions, options), this.companySelectBox = $("#company-select2"), 
this.companySelectBox.select2(options), this.companySelectBox.on("change", function(e) {
return that.fetchCompanyData(e.val);
});
}, AdminCommonPeriodicFormView.prototype.syncSearchBy = function() {
return this.searchBy = $(".search-radio-grp input:checked").val(), this.searchBySelected = !0;
}, AdminCommonPeriodicFormView.prototype.fetchCompanyData = function(id) {
return this.company = new HR.CompanyModel(), this.company.set("id", id), this.fetchData();
}, AdminCommonPeriodicFormView.prototype.changeReportType = function(e) {
var currentTarget;
return currentTarget = $(e.currentTarget), this.reportType = currentTarget.val(), 
this.fetchData();
}, AdminCommonPeriodicFormView.prototype.fetchFields = function() {
var fieldInputs, fields;
return $("#select-default-fields").prop("checked") && (fields = "default"), $("#select-all-fields").prop("checked") && (fields = "all"), 
$("#select-default-fields").prop("checked") || $("#select-all-fields").prop("checked") || (fields = [], 
fieldInputs = $(".fields-custom-container input"), _.each(fieldInputs, function(fieldInput) {
return $(fieldInput).prop("checked") ? fields.push($(fieldInput).val()) :void 0;
})), fields;
}, AdminCommonPeriodicFormView.prototype.fetchUserIds = function() {
var userInputs, user_ids;
return user_ids = [], userInputs = $(".user-custom-container input"), _.each(userInputs, function(userInput) {
return $(userInput).prop("checked") ? user_ids.push($(userInput).val()) :void 0;
}), user_ids;
}, AdminCommonPeriodicFormView.prototype.fetchTestIds = function() {
var testInputs, test_ids;
return test_ids = [], testInputs = $(".tests-custom-container input"), _.each(testInputs, function(testInput) {
return $(testInput).prop("checked") ? test_ids.push($(testInput).val()) :void 0;
}), test_ids;
}, AdminCommonPeriodicFormView.prototype.fetchData = function() {
var that;
return that = this, this.company.fetch({
data:{
company_data_action:"period_reports",
report_type:that.reportType
},
success:function(model) {
var view;
return view = new HR.AdminPeriodicReportFieldsView({
model:model,
record:that.record
}), $(".company-fields").html(view.render().el);
},
error:function() {}
});
}, AdminCommonPeriodicFormView.prototype.addOrUpdateCron = function(e) {
return "add" === this.cronAction ? this.addReportCron(e) :"update" === this.cronAction ? this.updateReportCron(e) :void 0;
}, AdminCommonPeriodicFormView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.AdminCommonPeriodicFormView = AdminCommonPeriodicFormView;
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
var AdminCommonReportsActionsView, HR, _ref;
return AdminCommonReportsActionsView = function(_super) {
function AdminCommonReportsActionsView() {
return AdminCommonReportsActionsView.__super__.constructor.apply(this, arguments);
}
return __extends(AdminCommonReportsActionsView, _super), AdminCommonReportsActionsView.prototype.template = "x-admin/admin-reports-actions", 
AdminCommonReportsActionsView.prototype.startDate = moment().subtract("month", 1), 
AdminCommonReportsActionsView.prototype.endDate = moment(), AdminCommonReportsActionsView.prototype.tableOpened = {
"user-custom-container":!1,
"tests-custom-container":!1,
"fields-custom-container":!1
}, AdminCommonReportsActionsView.prototype.events = {
"click a.show-custom-link":"showCustomContainer",
"click a.hide-custom-link":"hideCustomContainer",
"change input.select-all-input":"selectAll",
"change input.select-all-fields":"selectAllFields",
"change input.select-default-fields":"selectDefaultFields",
"change input.row-checkbox":"deselectAllAndDefault"
}, AdminCommonReportsActionsView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
startDate:this.startDate.format("YYYY/MM/DD"),
endDate:this.endDate.format("YYYY/MM/DD"),
defaultFields:this.defaultFields,
allFields:this.allFields
}), $(this.el).html(content), setTimeout(function() {
return that.initDateRangeSelect(), that.initDataTable();
}), this;
}, AdminCommonReportsActionsView.prototype.initDateRangeSelect = function() {
var last_month_end, last_month_start, last_week_end, last_week_start, minDate, that;
return that = this, last_month_start = moment().subtract("month", 1).startOf("month"), 
last_week_start = moment().subtract("week", 1).startOf("week"), last_month_end = moment().subtract("month", 1).endOf("month"), 
last_week_end = moment().subtract("week", 1).endOf("week"), minDate = that.model.get("created_at") || moment().subtract("year", 10), 
$("input#invite-report-date-range").daterangepicker({
format:"YYYY/MM/DD",
ranges:{
"Last Month":[ last_month_start, last_month_end ],
"Last Week":[ last_week_start, last_week_end ]
},
startDate:that.startDate,
endDate:that.endDate,
minDate:moment(minDate).subtract("day", 1),
maxDate:moment().add("day", 1)
}, function(start, end) {
return that.startDate = start, that.endDate = end, $("input#invite-report-date-range").val(that.startDate.format("YYYY/MM/DD") + " - " + that.endDate.format("YYYY/MM/DD"));
});
}, AdminCommonReportsActionsView.prototype.initDataTable = function() {
return this.userDataTable = $(".table").dataTable({
sDom:"<'row-fluid'<'span6'T><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
bPaginate:!1,
sPaginationType:"bootstrap",
bDestroy:!0,
aaSorting:[ [ 1, "asc" ] ]
});
}, AdminCommonReportsActionsView.prototype.selectAll = function(e) {
var containerClass, currentTarget, inputs;
return currentTarget = $(e.currentTarget), containerClass = currentTarget.data("list-container"), 
this.tableOpened[containerClass] || this.openContainer(containerClass), inputs = $("." + containerClass).find("input"), 
_.each(inputs, function(input) {
return $(input).prop("checked", currentTarget.prop("checked"));
});
}, AdminCommonReportsActionsView.prototype.selectAllFields = function(e) {
var currentTarget, defaultInput;
return currentTarget = $(e.currentTarget), defaultInput = currentTarget.parent().parent().find("#select-default-fields"), 
$(defaultInput).prop("checked", !1), this.selectAll(e);
}, AdminCommonReportsActionsView.prototype.selectDefaultFields = function(e) {
var allInput, containerClass, currentTarget;
return currentTarget = $(e.currentTarget), allInput = currentTarget.parent().parent().find("#select-all-fields"), 
$(allInput).prop("checked", !1), containerClass = currentTarget.data("list-container"), 
this.tableOpened[containerClass] || this.openContainer(containerClass), currentTarget.prop("checked") ? this.selectDefaultInputs(e) :this.selectAll(e);
}, AdminCommonReportsActionsView.prototype.selectDefaultInputs = function(e) {
var containerClass, currentTarget, inputs, that;
return that = this, currentTarget = $(e.currentTarget), containerClass = currentTarget.data("list-container"), 
inputs = $("." + containerClass).find("input"), _.each(inputs, function(input) {
return -1 !== that.defaultFields.indexOf($(input).val()) ? $(input).prop("checked", !0) :$(input).prop("checked", !1);
});
}, AdminCommonReportsActionsView.prototype.deselectAllAndDefault = function(e) {
var currentTarget;
return currentTarget = $(e.currentTarget), currentTarget.closest(".custom-container").parent().find(".select-all").prop("checked", !1);
}, AdminCommonReportsActionsView.prototype.showCustomContainer = function(e) {
var currentTarget;
return e.preventDefault(), currentTarget = $(e.currentTarget), currentTarget.addClass("hidden"), 
currentTarget.siblings(".hide-custom-link").removeClass("hidden"), $("." + currentTarget.data("container")).toggleClass("hidden"), 
this.tableOpened[currentTarget.data("container")] = !0;
}, AdminCommonReportsActionsView.prototype.openContainer = function(className) {
var container;
return container = $("." + className), container.removeClass("hidden"), container.parent().find(".hide-custom-link").removeClass("hidden"), 
container.parent().find(".show-custom-link").addClass("hidden"), this.tableOpened[className] = !0;
}, AdminCommonReportsActionsView.prototype.hideCustomContainer = function(e) {
var currentTarget;
return e.preventDefault(), currentTarget = $(e.currentTarget), currentTarget.addClass("hidden"), 
currentTarget.siblings(".show-custom-link").removeClass("hidden"), $("." + currentTarget.data("container")).toggleClass("hidden");
}, AdminCommonReportsActionsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.AdminCommonReportsActionsView = AdminCommonReportsActionsView;
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
var AdminCommonReportsView, HR, _ref;
return AdminCommonReportsView = function(_super) {
function AdminCommonReportsView() {
return AdminCommonReportsView.__super__.constructor.apply(this, arguments);
}
return __extends(AdminCommonReportsView, _super), AdminCommonReportsView.prototype.searchBy = "id", 
AdminCommonReportsView.prototype.searchBySelected = !1, AdminCommonReportsView.prototype.companyFields = {
id:"id",
name:"name",
email:"email"
}, AdminCommonReportsView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
searchBy:this.searchBy
}), $(this.el).html(content), setTimeout(function() {
return that.initCompanySelect2();
}), this;
}, AdminCommonReportsView.prototype.initCompanySelect2 = function() {
var defaultOptions, options, that;
return that = this, defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
placeholder:"Select a Company",
ajax:{
url:"/x/api/v1/admin/search/companies",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return that.searchBySelected || ($.isNumeric(term) ? (that.searchBy = "id", $(".search-radio-grp input:nth(0)").prop("checked", !0)) :-1 === term.indexOf("@") ? (that.searchBy = "name", 
$(".search-radio-grp input:nth(1)").prop("checked", !0)) :-1 !== term.indexOf("@") && (that.searchBy = "email", 
$(".search-radio-grp input:nth(2)").prop("checked", !0))), {
q:term,
fields:that.companyFields[that.searchBy]
};
},
results:function(data) {
return {
results:data.results
};
}
}
}, options = _.extend(defaultOptions, options), this.selectBox = $("#company-select2"), 
this.selectBox.select2(options), this.selectBox.on("change", function(e) {
return that.fetchCompany(e.val, that);
});
}, AdminCommonReportsView.prototype.syncSearchBy = function() {
return this.searchBy = $(".search-radio-grp input:checked").val(), this.searchBySelected = !0;
}, AdminCommonReportsView.prototype.fetchCompany = function(id, view) {
var model;
return model = new HR.CompanyModel(), model.set("id", id), view.model = model, model.fetch({
data:{
company_data_action:view.companyDataAction
},
success:function(model) {
var actionsView;
return actionsView = new view.actionViewClass({
model:model
}), view.actionsView = actionsView, $(".company-action-section").html(actionsView.render().el);
}
});
}, AdminCommonReportsView.prototype.generateReport = function(e) {
var button, currentTarget, fieldInputs, params, testInputs, that, userInputs;
return that = this, e.preventDefault(), $("a#link-box").addClass("hidden"), currentTarget = $(e.currentTarget), 
button = currentTarget.find("button"), params = {}, $("#select-all-tests").prop("checked") || (params.test_ids = [], 
testInputs = $(".tests-custom-container input"), _.each(testInputs, function(testInput) {
return $(testInput).prop("checked") ? params.test_ids.push($(testInput).val()) :void 0;
})), $("#select-all-users").prop("checked") || (params.user_ids = [], userInputs = $(".user-custom-container input"), 
_.each(userInputs, function(userInput) {
return $(userInput).prop("checked") ? params.user_ids.push($(userInput).val()) :void 0;
})), $("#select-default-fields").prop("checked") && (params.fields = "default"), 
$("#select-all-fields").prop("checked") && (params.fields = "all"), $("#select-default-fields").prop("checked") || $("#select-all-fields").prop("checked") || (params.fields = [], 
fieldInputs = $(".fields-custom-container input"), _.each(fieldInputs, function(fieldInput) {
return $(fieldInput).prop("checked") ? params.fields.push($(fieldInput).val()) :void 0;
})), params.company_id = this.model.get("id"), params.from_time = this.actionsView.startDate.format("YYYY/MM/DD"), 
params.to_time = this.actionsView.endDate.format("YYYY/MM/DD"), HR.util.inlineLoadingStart(button), 
$.ajax({
url:that.reportGenerationUrl,
type:"GET",
data:params,
success:function(response) {
return HR.util.inlineLoadingEnd({
message:"Downloading Report ..."
}), $("a#link-box").attr("href", response.url).removeClass("hidden").html(response.url), 
window.location.href = response.url;
},
error:function() {
return HR.util.inlineLoadingEnd({
message:"Error"
});
}
});
}, AdminCommonReportsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.AdminCommonReportsView = AdminCommonReportsView;
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
var HR, X404View, _ref;
return X404View = function(_super) {
function X404View() {
return X404View.__super__.constructor.apply(this, arguments);
}
return __extends(X404View, _super), X404View.prototype.template = "dashboard/e404", 
X404View.prototype.initialize = function() {}, X404View.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this), $(this.el).html(content);
}, X404View;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.X404View = X404View;
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
var AdminAddPeriodicReportsView, HR, _ref;
return AdminAddPeriodicReportsView = function(_super) {
function AdminAddPeriodicReportsView() {
return AdminAddPeriodicReportsView.__super__.constructor.apply(this, arguments);
}
return __extends(AdminAddPeriodicReportsView, _super), AdminAddPeriodicReportsView.prototype.cronAction = "add", 
AdminAddPeriodicReportsView.prototype.initialize = function(options) {
return null == options && (options = {}), this.company = new HR.CompanyModel(), 
this.record = new HR.PeriodicReportModel();
}, AdminAddPeriodicReportsView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
searchBy:this.searchBy,
company:this.company
}), $(this.el).html(content), setTimeout(function() {
return that.initCompanySelectBox();
}), this;
}, AdminAddPeriodicReportsView.prototype.addReportCron = function(e) {
var button, currentTarget, fields, model, test_ids, user_ids;
return e.preventDefault(), currentTarget = $(e.currentTarget), button = currentTarget.find("button"), 
HR.util.inlineLoadingStart(button), fields = this.fetchFields(), user_ids = this.fetchUserIds(), 
test_ids = this.fetchTestIds(), model = new HR.PeriodicReportModel(), model.set("entity_id", this.companySelectBox.select2("val")), 
model.set("time_frequency", $(".time-frequency").val()), model.set("report_type", $("#report-type-select").val()), 
model.set("report_fields", fields), model.set("report_user_ids", user_ids), model.set("report_test_ids", test_ids), 
model.set("recipients", $(".report-recipients").val()), model.save(null, {
success:function(model, response) {
return HR.router.navigate("/admin/reports/periodic", !0, !0), HR.util.inlineLoadingEnd(response);
},
error:function(model, response) {
return response = JSON.parse(response.responseText), HR.util.inlineLoadingEnd(response);
}
});
}, AdminAddPeriodicReportsView;
}(window.HR.AdminCommonPeriodicFormView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.AdminAddPeriodicReportsView = AdminAddPeriodicReportsView;
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
var AdminAttemptReportsActionsView, HR, _ref;
return AdminAttemptReportsActionsView = function(_super) {
function AdminAttemptReportsActionsView() {
return AdminAttemptReportsActionsView.__super__.constructor.apply(this, arguments);
}
return __extends(AdminAttemptReportsActionsView, _super), AdminAttemptReportsActionsView.prototype.initialize = function(options) {
var defaultFieldsHash, that;
return null == options && (options = {}), that = this, this.model = options.model, 
defaultFieldsHash = this.model.get("default_attempt_fields"), this.defaultFields = [], 
this.allFields = this.model.get("all_attempt_fields"), _.each(defaultFieldsHash, function(field) {
return that.defaultFields.push(field.id);
}), this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "reset", this.render);
}, AdminAttemptReportsActionsView;
}(window.HR.AdminCommonReportsActionsView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.AdminAttemptReportsActionsView = AdminAttemptReportsActionsView;
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
var AdminAttemptReportsView, HR, _ref;
return AdminAttemptReportsView = function(_super) {
function AdminAttemptReportsView() {
return AdminAttemptReportsView.__super__.constructor.apply(this, arguments);
}
return __extends(AdminAttemptReportsView, _super), AdminAttemptReportsView.prototype.template = "x-admin/attempt-reports", 
AdminAttemptReportsView.prototype.actionViewClass = window.HR.AdminAttemptReportsActionsView, 
AdminAttemptReportsView.prototype.companyDataAction = "attempt_reports", AdminAttemptReportsView.prototype.reportGenerationUrl = "/x/api/v1/admin/reports/generate_attempt_report", 
AdminAttemptReportsView.prototype.events = {
"change .search-radio-grp input":"syncSearchBy",
"submit form#attempts-report-form":"generateReport"
}, AdminAttemptReportsView;
}(window.HR.AdminCommonReportsView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.AdminAttemptReportsView = AdminAttemptReportsView;
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
var AdminEditPeriodicReportsView, HR, _ref;
return AdminEditPeriodicReportsView = function(_super) {
function AdminEditPeriodicReportsView() {
return AdminEditPeriodicReportsView.__super__.constructor.apply(this, arguments);
}
return __extends(AdminEditPeriodicReportsView, _super), AdminEditPeriodicReportsView.prototype.selectBoxSet = !1, 
AdminEditPeriodicReportsView.prototype.cronAction = "update", AdminEditPeriodicReportsView.prototype.initialize = function(options) {
var that;
return null == options && (options = {}), that = this, this.record = options.entity, 
this.company = new HR.CompanyModel(), this.company.set("id", this.record.get("company_id")), 
setTimeout(function() {
return that.fetchData();
}, 300), this.listenTo(this.company, "change", this.setSelectBox);
}, AdminEditPeriodicReportsView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
company:this.company.toJSON(),
record:this.record.toJSON(),
searchBy:this.searchBy
}), $(this.el).html(content), setTimeout(function() {
return that.initCompanySelectBox();
}), this;
}, AdminEditPeriodicReportsView.prototype.setSelectBox = function() {
return this.selectBoxSet ? void 0 :(this.selectBoxSet = !0, this.companySelectBox.select2("data", {
id:this.company.get("id"),
primary:this.company.get("name")
}));
}, AdminEditPeriodicReportsView.prototype.updateReportCron = function(e) {
var button, currentTarget, fields, test_ids, user_ids;
return e.preventDefault(), currentTarget = $(e.currentTarget), button = currentTarget.find("button"), 
HR.util.inlineLoadingStart(button), fields = this.fetchFields(), user_ids = this.fetchUserIds(), 
test_ids = this.fetchTestIds(), this.record.set("entity_id", this.companySelectBox.select2("val")), 
this.record.set("time_frequency", $(".time-frequency").val()), this.record.set("report_type", $("#report-type-select").val()), 
this.record.set("report_fields", fields), this.record.set("report_user_ids", user_ids), 
this.record.set("report_test_ids", test_ids), this.record.set("recipients", $(".report-recipients").val()), 
this.record.save(null, {
success:function(model, response) {
return HR.router.navigate("/admin/reports/periodic", !0, !0), HR.util.inlineLoadingEnd(response);
},
error:function(model, response) {
return response = JSON.parse(response.responseText), HR.util.inlineLoadingEnd(response);
}
});
}, AdminEditPeriodicReportsView;
}(window.HR.AdminCommonPeriodicFormView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.AdminEditPeriodicReportsView = AdminEditPeriodicReportsView;
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
var AdminInviteReportsActionsView, HR, _ref;
return AdminInviteReportsActionsView = function(_super) {
function AdminInviteReportsActionsView() {
return AdminInviteReportsActionsView.__super__.constructor.apply(this, arguments);
}
return __extends(AdminInviteReportsActionsView, _super), AdminInviteReportsActionsView.prototype.initialize = function(options) {
var defaultFieldsHash, that;
return null == options && (options = {}), that = this, this.model = options.model, 
defaultFieldsHash = this.model.get("default_invite_fields"), this.defaultFields = [], 
this.allFields = this.model.get("all_invite_fields"), _.each(defaultFieldsHash, function(field) {
return that.defaultFields.push(field.id);
}), this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "reset", this.render);
}, AdminInviteReportsActionsView;
}(window.HR.AdminCommonReportsActionsView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.AdminInviteReportsActionsView = AdminInviteReportsActionsView;
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
var AdminInviteReportsView, HR, _ref;
return AdminInviteReportsView = function(_super) {
function AdminInviteReportsView() {
return AdminInviteReportsView.__super__.constructor.apply(this, arguments);
}
return __extends(AdminInviteReportsView, _super), AdminInviteReportsView.prototype.template = "x-admin/invite-reports", 
AdminInviteReportsView.prototype.actionViewClass = window.HR.AdminInviteReportsActionsView, 
AdminInviteReportsView.prototype.companyDataAction = "invite_reports", AdminInviteReportsView.prototype.reportGenerationUrl = "/x/api/v1/admin/reports/generate_invite_report", 
AdminInviteReportsView.prototype.events = {
"change .search-radio-grp input":"syncSearchBy",
"submit form#invites-report-form":"generateReport"
}, AdminInviteReportsView;
}(window.HR.AdminCommonReportsView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.AdminInviteReportsView = AdminInviteReportsView;
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
var AdminNavigationView, HR, _ref;
return AdminNavigationView = function(_super) {
function AdminNavigationView() {
return AdminNavigationView.__super__.constructor.apply(this, arguments);
}
return __extends(AdminNavigationView, _super), AdminNavigationView.prototype.template = "x-admin/admin-navigation", 
AdminNavigationView.prototype.className = "admin-navigation", AdminNavigationView;
}(window.HR.CommonSidebarNavigationView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.AdminNavigationView = AdminNavigationView;
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
var AdminPeriodicReportFieldsView;
return AdminPeriodicReportFieldsView = function(_super) {
function AdminPeriodicReportFieldsView() {
return AdminPeriodicReportFieldsView.__super__.constructor.apply(this, arguments);
}
var HR, _ref;
return __extends(AdminPeriodicReportFieldsView, _super), AdminPeriodicReportFieldsView.prototype.template = "x-admin/periodic-report-fields", 
AdminPeriodicReportFieldsView.prototype.initialize = function(options) {
var defaultFieldsHash, that;
return null == options && (options = {}), that = this, this.model = options.model, 
this.record = options.record, defaultFieldsHash = this.model.get("default_period_fields"), 
this.defaultFields = [], this.allFields = this.model.get("all_period_fields"), _.each(defaultFieldsHash, function(field) {
return that.defaultFields.push(field.id);
});
}, AdminPeriodicReportFieldsView.prototype.events = {
"change input.select-all-input":"selectAll",
"change input.select-all-fields":"selectAllFields",
"change input.select-default-fields":"selectDefaultFields",
"change input.row-checkbox":"deselectAllAndDefault"
}, AdminPeriodicReportFieldsView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
company:this.model.toJSON(),
record:this.record.toJSON(),
defaultFields:this.defaultFields,
allFields:this.allFields
}), $(this.el).html(content), setTimeout(function() {
return that.initDataTables();
}), this;
}, AdminPeriodicReportFieldsView.prototype.initDataTables = function() {
return this.DataTables = $(".table").dataTable({
sDom:"<'row-fluid'<'span6'T><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
bPaginate:!1,
sPaginationType:"bootstrap",
bDestroy:!0,
aaSorting:[ [ 1, "asc" ] ],
bFilter:!1
});
}, AdminPeriodicReportFieldsView.prototype.selectAll = function(e) {
var containerClass, currentTarget, inputs;
return currentTarget = $(e.currentTarget), containerClass = currentTarget.data("list-container"), 
inputs = $("." + containerClass).find("input"), _.each(inputs, function(input) {
return $(input).prop("checked", currentTarget.prop("checked"));
});
}, AdminPeriodicReportFieldsView.prototype.selectAllFields = function(e) {
var currentTarget, defaultInput;
return currentTarget = $(e.currentTarget), defaultInput = currentTarget.parent().parent().find("#select-default-fields"), 
$(defaultInput).prop("checked", !1), this.selectAll(e);
}, AdminPeriodicReportFieldsView.prototype.selectDefaultFields = function(e) {
var allInput, containerClass, currentTarget;
return currentTarget = $(e.currentTarget), allInput = currentTarget.parent().parent().find("#select-all-fields"), 
$(allInput).prop("checked", !1), containerClass = currentTarget.data("list-container"), 
currentTarget.prop("checked") ? this.selectDefaultInputs(e) :this.selectAll(e);
}, AdminPeriodicReportFieldsView.prototype.selectDefaultInputs = function(e) {
var containerClass, currentTarget, inputs, that;
return that = this, currentTarget = $(e.currentTarget), containerClass = currentTarget.data("list-container"), 
inputs = $("." + containerClass).find("input"), _.each(inputs, function(input) {
return -1 !== that.defaultFields.indexOf($(input).val()) ? $(input).prop("checked", !0) :$(input).prop("checked", !1);
});
}, AdminPeriodicReportFieldsView.prototype.deselectAllAndDefault = function(e) {
var currentTarget;
return currentTarget = $(e.currentTarget), currentTarget.closest(".custom-container").parent().find(".select-all").prop("checked", !1);
}, HR = null != (_ref = window.HR) ? _ref :{}, HR.AdminPeriodicReportFieldsView = AdminPeriodicReportFieldsView, 
AdminPeriodicReportFieldsView;
}(window.HR.GenericView);
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
var AdminPeriodicReportsView, HR, _ref;
return AdminPeriodicReportsView = function(_super) {
function AdminPeriodicReportsView() {
return AdminPeriodicReportsView.__super__.constructor.apply(this, arguments);
}
return __extends(AdminPeriodicReportsView, _super), AdminPeriodicReportsView.prototype.template = "x-admin/periodic-reports", 
AdminPeriodicReportsView.prototype.initialize = function(options) {
return null == options && (options = {}), this.collection = options.collection;
}, AdminPeriodicReportsView.prototype.events = {
"click input.delete-cron-task":"deletePeriodicRecord"
}, AdminPeriodicReportsView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
collection:this.collection.toJSON()
}), $(this.el).html(content), setTimeout(function() {
return that.initDataTable();
}), this;
}, AdminPeriodicReportsView.prototype.initDataTable = function() {
return this.dataTable = $(".periodic-table").dataTable({
sDom:"<'row-fluid'<'span6'T><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
bPaginate:!0,
sPaginationType:"bootstrap",
iDisplayLength:10
});
}, AdminPeriodicReportsView.prototype.deletePeriodicRecord = function(e) {
var currentTarget, id, model;
return e.preventDefault(), currentTarget = $(e.currentTarget), id = currentTarget.data("item-id"), 
model = this.collection.find(function(model) {
return model.get("id") === id;
}), model.destroy({
success:function(model, resp) {
return HR.util.ajaxmsg(resp.message, !1, !0, 2), that.render();
},
error:function(resp) {
return resp = JSON.parse(resp), HR.util.ajaxmsg(resp.message, !1, !0, 2);
}
});
}, AdminPeriodicReportsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.AdminPeriodicReportsView = AdminPeriodicReportsView;
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
var AttemptsDashboardTableView, HR, _ref;
return AttemptsDashboardTableView = function(_super) {
function AttemptsDashboardTableView() {
return AttemptsDashboardTableView.__super__.constructor.apply(this, arguments);
}
return __extends(AttemptsDashboardTableView, _super), AttemptsDashboardTableView.prototype.template = "x-admin/attempts-dashboard-table", 
AttemptsDashboardTableView.prototype.initialize = function(options) {
return null == options && (options = {}), this.filters = options.filters;
}, AttemptsDashboardTableView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this), $(this.el).html(content), 
setTimeout(function() {
return that.initDataTable();
}), this;
}, AttemptsDashboardTableView.prototype.initDataTable = function() {
var that;
return that = this, this.attemptsTable = this.$(".attempts-table").dataTable({
sDom:"<'row-fluid'<'span6'T><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
sPaginationType:"bootstrap",
iDisplayStart:0,
iDisplayLength:50,
bProcessing:!1,
bFilter:!1,
bServerSide:!0,
bDestroy:!0,
bAutoWidth:!1,
oLanguage:{
sProcessing:"Loading data...",
sLoadingRecords:"Loading data..."
},
aoColumnDefs:[ {
bSortable:!1,
aTargets:[ 1, 2, 3, 6, 7 ]
} ],
sAjaxSource:"/x/api/v1/admin/attempts?" + this.filterString(),
fnServerData:function(sSource, aoData, fnCallback) {
return HR.util.ajaxmsg("Loading Attempts data..", !0), $.getJSON(sSource, aoData, function(json) {
return _.isFunction(that.afterRequest) && (json = that.afterRequest(json)), that.data = json, 
fnCallback(json);
});
}
});
}, AttemptsDashboardTableView.prototype.filterString = function() {
var filters;
return filters = [], this.filters.time_type && filters.push("time_type=" + this.filters.time_type), 
this.filters.company_ids && filters.push("company_ids=" + this.filters.company_ids), 
this.filters.user_ids && filters.push("user_ids=" + this.filters.user_ids), this.filters.test_ids && filters.push("user_ids=" + this.filters.test_ids), 
this.filters.date_range && filters.push("date_range=" + this.filters.date_range), 
filters.join("&");
}, AttemptsDashboardTableView.prototype.afterRequest = function(data) {
var result, that;
return that = this, HR.util.ajaxmsg("Done", !1, !0, .5), result = {
aaData:[],
iTotalDisplayRecords:0,
iTotalRecords:0,
models:[]
}, _.isObject(data) && _.isArray(data.models) && (result.iTotalDisplayRecords = data.total_attempts, 
result.iTotalRecords = data.total_attempts, result.aaData = _.map(data.models, function(row, ix) {
return that.mapColumns(row, ix);
})), result;
}, AttemptsDashboardTableView.prototype.mapColumns = function(row) {
var ret;
return ret = [], ret.push(row.id), ret.push(row.company_id), ret.push(HR.util.htmlEncode(row.company_name || "-")), 
ret.push(HR.util.htmlEncode(row.full_name || "-")), ret.push(HR.util.htmlEncode(row.email)), 
ret.push(row.test_id), ret.push(HR.util.htmlEncode(row.test_name)), ret.push(row.invited_by), 
ret;
}, AttemptsDashboardTableView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.AttemptsDashboardTableView = AttemptsDashboardTableView;
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
var AttemptsDashboardView, HR, _ref;
return AttemptsDashboardView = function(_super) {
function AttemptsDashboardView() {
return AttemptsDashboardView.__super__.constructor.apply(this, arguments);
}
return __extends(AttemptsDashboardView, _super), AttemptsDashboardView.prototype.template = "x-admin/attempts-dashboard", 
AttemptsDashboardView.prototype.attemptedAtType = "start_time", AttemptsDashboardView.prototype.userSearchBySelected = !1, 
AttemptsDashboardView.prototype.companySearchBySelected = !1, AttemptsDashboardView.prototype.testSearchBySelected = !1, 
AttemptsDashboardView.prototype.userSearchBy = "id", AttemptsDashboardView.prototype.companySearchBy = "id", 
AttemptsDashboardView.prototype.testSearchBy = "id", AttemptsDashboardView.prototype.userFields = {
id:"id",
name:"firstname,email"
}, AttemptsDashboardView.prototype.companyFields = {
id:"id",
name:"name",
email:"email"
}, AttemptsDashboardView.prototype.testFields = {
id:"id",
name:"name"
}, AttemptsDashboardView.prototype.startDate = moment().subtract(1, "w"), AttemptsDashboardView.prototype.endDate = moment(), 
AttemptsDashboardView.prototype.events = {
"click #filter-attempts":"filterAttempts",
"change .attempt-time-type input":"filterAttempts",
"click .js-dateclear":"clearDate",
"click a.show-advanced-filters":"showAdvancedOptions",
"click a.hide-advanced-filters":"hideAdvancedOptions",
"change .user-search-radio-grp input":"syncUserSearchBy",
"change .company-search-radio-grp input":"syncCompanySearchBy"
}, AttemptsDashboardView.prototype.initialize = function(options) {
return null == options && (options = {}), this.filters = {}, this.filters.date_range = this.startDate.format("YYYY/MM/DD") + "-" + this.endDate.format("YYYY/MM/DD");
}, AttemptsDashboardView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
attemptedAtType:this.attemptedAtType,
userSearchBy:this.userSearchBy,
companySearchBy:this.companySearchBy,
testSearchBy:this.testSearchBy,
startDate:this.startDate,
endDate:this.endDate
}), $(this.el).html(content), setTimeout(function() {
return that.initUserSelect2(), that.initCompanySelect2(), that.initTestSelect2(), 
that.initDatePicker(), that.filterAttempts(), that.initSaveAsCSVView();
}), this;
}, AttemptsDashboardView.prototype.clearDate = function(e) {
return e && e.preventDefault(), $(".js-daterange").val(""), this.filters.date_range = "", 
$(".js-dateclear").hide(), this.filterAttempts();
}, AttemptsDashboardView.prototype.initUserSelect2 = function() {
var defaultOptions, options, that;
return that = this, defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
width:"300px",
multiple:!0,
placeholder:"Select Users",
ajax:{
url:"/x/api/v1/admin/search/users",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return that.userSearchBySelected || ($.isNumeric(term) ? (that.userSearchBy = "id", 
$(".user-search-radio-grp.search-radio-grp input:nth(0)").prop("checked", !0)) :(that.userSearchBy = "name", 
$(".user-search-radio-grp.search-radio-grp input:nth(1)").prop("checked", !0))), 
{
q:term,
fields:that.userFields[that.userSearchBy],
company_ids:that.companySelectBox.select2("val")
};
},
results:function(data) {
return {
results:data.results
};
}
}
}, options = _.extend(defaultOptions, options), delete options.minimumInputLength, 
this.userSelectBox = $("#invited-by-attempts-filter"), this.userSelectBox.select2(options), 
this.userSelectBox.on("change", function() {
return that.filterAttempts();
});
}, AttemptsDashboardView.prototype.initCompanySelect2 = function() {
var defaultOptions, options, that;
return that = this, defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
width:"300px",
multiple:!0,
placeholder:"Select Companies",
ajax:{
url:"/x/api/v1/admin/search/companies",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return that.companySearchBySelected || ($.isNumeric(term) ? (that.companySearchBy = "id", 
$(".company-search-grp.search-radio-grp input:nth(0)").prop("checked", !0)) :-1 === term.indexOf("@") ? (that.companySearchBy = "name", 
$(".company-search-grp.search-radio-grp input:nth(1)").prop("checked", !0)) :(that.companySearchBy = "email", 
$(".company-search-grp.search-radio-grp input:nth(2)").prop("checked", !0))), {
q:term,
fields:that.companyFields[that.companySearchBy]
};
},
results:function(data) {
return {
results:data.results
};
}
}
}, options = _.extend(defaultOptions, options), delete options.minimumInputLength, 
this.companySelectBox = $("#company-attempts-filter"), this.companySelectBox.select2(options), 
this.companySelectBox.on("change", function() {
return that.filterAttempts();
});
}, AttemptsDashboardView.prototype.initTestSelect2 = function() {
var defaultOptions, options, that;
return that = this, defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
placeholder:"Select Tests",
multiple:!0,
width:"300px",
ajax:{
url:"/x/admin/v1/search/tests",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return that.testSearchBySelected || ($.isNumeric(term) ? (that.testSearchBy = "id", 
$(".test-search-grp.search-radio-grp input:nth(0)").prop("checked", !0)) :(that.testSearchBy = "email", 
$(".test-search-grp.search-radio-grp input:nth(2)").prop("checked", !0))), {
q:term,
fields:that.testFields[that.testSearchBy],
company_ids:that.companySelectBox.select2("val")
};
},
results:function(data) {
return {
results:data.results
};
}
}
}, options = _.extend(defaultOptions, options), this.testSelectBox = $("#test-attempts-filter"), 
this.testSelectBox.select2(options), this.testSelectBox.on("change", function() {
return that.filterAttempts();
});
}, AttemptsDashboardView.prototype.initDatePicker = function() {
return this.$("#attempt-from-time-filter").daterangepicker({
latestDate:"today",
separator:" to ",
format:"YYYY/MM/DD",
ranges:{
"Last week":[ moment().add("days", -7), moment().format() ],
"Last 2 weeks":[ moment().add("days", -14), moment().format() ],
"Last 30 days":[ moment().add("days", -30), moment().format() ],
"This Month":[ moment().startOf("month"), moment().endOf("month") ],
"Last month":[ moment().subtract("month", 1).startOf("month"), moment().subtract("month", 1).endOf("month") ],
"Past year":[ moment().add("days", -365), moment().format() ]
},
startDate:this.startDate,
endDate:this.endDate
}, function(_this) {
return function(start, end) {
return _this.$(".js-dateclear").removeClass("hide"), _this.filters.date_range = start.format("YYYY/MM/DD") + "-" + end.format("YYYY/MM/DD"), 
$(".js-dateclear").show(), _this.filterAttempts();
};
}(this));
}, AttemptsDashboardView.prototype.syncUserSearchBy = function() {
return this.userSearchBy = $(".user-search-radio-grp input:checked").val(), this.userSearchBySelected = !0;
}, AttemptsDashboardView.prototype.syncCompanySearchBy = function() {
return this.companySearchBy = $(".company-search-radio-grp input:checked").val(), 
this.companySearchBySelected = !0;
}, AttemptsDashboardView.prototype.showAdvancedOptions = function(e) {
var currentTarget;
return e.preventDefault(), currentTarget = $(e.currentTarget), currentTarget.parent().addClass("hidden"), 
$(".advanced-options").removeClass("hidden"), $("a.hide-advanced-filters").parent().removeClass("hidden");
}, AttemptsDashboardView.prototype.hideAdvancedOptions = function(e) {
var currentTarget;
return e.preventDefault(), currentTarget = $(e.currentTarget), currentTarget.parent().addClass("hidden"), 
$(".advanced-options").addClass("hidden"), $("a.show-advanced-filters").parent().removeClass("hidden");
}, AttemptsDashboardView.prototype.filterAttempts = function(e) {
return e && e.preventDefault(), this.filters.time_type = this.attemptedAtType, this.filters.company_ids = this.companySelectBox.select2("val"), 
this.filters.user_ids = this.userSelectBox.select2("val"), this.filters.test_ids = this.testSelectBox.select2("val"), 
this.initTableView();
}, AttemptsDashboardView.prototype.initTableView = function() {
var view;
return view = new HR.AttemptsDashboardTableView({
filters:this.filters
}), this.$("#attempts-table-container").html(view.render().el);
}, AttemptsDashboardView.prototype.initSaveAsCSVView = function() {}, AttemptsDashboardView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.AttemptsDashboardView = AttemptsDashboardView;
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
var CompanyAddInvitesDataView, HR, _ref;
return CompanyAddInvitesDataView = function(_super) {
function CompanyAddInvitesDataView() {
return CompanyAddInvitesDataView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyAddInvitesDataView, _super), CompanyAddInvitesDataView.prototype.template = "x-admin/company-add-invites-data", 
CompanyAddInvitesDataView.prototype.initialize = function(options) {
return null == options && (options = {}), this.model = options.model;
}, CompanyAddInvitesDataView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
model:this.model.toJSON()
}), $(this.el).html(content), this;
}, CompanyAddInvitesDataView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CompanyAddInvitesDataView = CompanyAddInvitesDataView;
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
var CompanyAddInvitesView, HR, _ref;
return CompanyAddInvitesView = function(_super) {
function CompanyAddInvitesView() {
return CompanyAddInvitesView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyAddInvitesView, _super), CompanyAddInvitesView.prototype.template = "x-admin/company-add-invites", 
CompanyAddInvitesView.prototype.searchBy = "id", CompanyAddInvitesView.prototype.searchBySelected = !1, 
CompanyAddInvitesView.prototype.companyFields = {
id:"id",
name:"name",
email:"email"
}, CompanyAddInvitesView.prototype.events = {
"change .search-radio-grp input":"syncSearchBy",
"submit form#add-invites-form":"addInvites"
}, CompanyAddInvitesView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
searchBy:this.searchBy
}), $(this.el).html(content), setTimeout(function() {
return that.initCompanySelect2();
}), this;
}, CompanyAddInvitesView.prototype.syncSearchBy = function() {
return this.searchBy = $(".search-radio-grp input:checked").val(), this.searchBySelected = !0;
}, CompanyAddInvitesView.prototype.initCompanySelect2 = function() {
var defaultOptions, options, that;
return that = this, defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
placeholder:"Select a Company",
ajax:{
url:"/x/api/v1/admin/search/companies",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return that.searchBySelected || ($.isNumeric(term) ? (that.searchBy = "id", $(".search-radio-grp input:nth(0)").prop("checked", !0)) :-1 === term.indexOf("@") ? (that.searchBy = "name", 
$(".search-radio-grp input:nth(1)").prop("checked", !0)) :-1 !== term.indexOf("@") && (that.searchBy = "email", 
$(".search-radio-grp input:nth(2)").prop("checked", !0))), {
q:term,
fields:that.companyFields[that.searchBy]
};
},
results:function(data) {
return {
results:data.results
};
}
}
}, options = _.extend(defaultOptions, options), this.selectBox = $("#company-select2"), 
this.selectBox.select2(options), this.selectBox.on("change", function(e) {
return that.fetchCompany(e.val, that);
});
}, CompanyAddInvitesView.prototype.fetchCompany = function(id, view) {
var model;
return model = new HR.CompanyModel(), model.set("id", id), view.model = model, model.fetch({
data:{
company_data_action:"add_invites"
},
success:function(model) {
var dataView;
return dataView = new HR.CompanyAddInvitesDataView({
model:model
}), $(".company-info-section").html(dataView.render().el);
}
});
}, CompanyAddInvitesView.prototype.addInvites = function(e) {
var button, currentTarget, invites, params, that;
return that = this, e.preventDefault(), currentTarget = $(e.currentTarget), this.$(".message-box").addClass("hidden").html(""), 
this.$("#invites-count").removeClass("error"), button = currentTarget.find("button"), 
this.model.get("id") ? (invites = parseInt(this.$("#invites-count").val(), 10)) ? (HR.util.inlineLoadingStart(button), 
params = {
id:this.model.get("id"),
invites_count:invites,
invites_type:this.$("#invites-type").val()
}, $.ajax({
url:"/x/api/v1/admin/companies/add_invites",
data:params,
type:"PUT",
success:function(response) {
return HR.util.inlineLoadingEnd({
message:"Success"
}), that.$(".message-box").removeClass("hidden").addClass("success").html(response.message);
},
error:function(response) {
return response = JSON.parse(response.responseText), HR.util.inlineLoadingEnd({
message:"Error"
}), that.$(".message-box").removeClass("hidden").addClass("error").html(response.message);
}
})) :(this.$(".message-box").removeClass("hidden").addClass("error").html("You need to enter the number of invites"), 
this.$("#invites-count").addClass("error"), void 0) :(this.$(".message-box").removeClass("hidden").addClass("error").html("You need to select a company"), 
void 0);
}, CompanyAddInvitesView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CompanyAddInvitesView = CompanyAddInvitesView;
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
var CompanyExtendTrialDataView, HR, _ref;
return CompanyExtendTrialDataView = function(_super) {
function CompanyExtendTrialDataView() {
return CompanyExtendTrialDataView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyExtendTrialDataView, _super), CompanyExtendTrialDataView.prototype.template = "x-admin/company-extend-trial-data", 
CompanyExtendTrialDataView.prototype.initialize = function(options) {
return null == options && (options = {}), this.model = options.model;
}, CompanyExtendTrialDataView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
model:this.model.toJSON()
}), $(this.el).html(content), setTimeout(function() {
return that.initDateSelect();
}), this;
}, CompanyExtendTrialDataView.prototype.initDateSelect = function() {
var that;
return that = this, $("#new-payment-date").datepicker({
autoclose:!0,
format:"yyyy/mm/dd",
startDate:"-1d"
});
}, CompanyExtendTrialDataView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CompanyExtendTrialDataView = CompanyExtendTrialDataView;
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
var CompanyExtendTrialView, HR, _ref;
return CompanyExtendTrialView = function(_super) {
function CompanyExtendTrialView() {
return CompanyExtendTrialView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyExtendTrialView, _super), CompanyExtendTrialView.prototype.template = "x-admin/company-extend-trial", 
CompanyExtendTrialView.prototype.searchBy = "id", CompanyExtendTrialView.prototype.searchBySelected = !1, 
CompanyExtendTrialView.prototype.companyFields = {
id:"id",
name:"name",
email:"email"
}, CompanyExtendTrialView.prototype.events = {
"change .search-radio-grp input":"syncSearchBy",
"submit form#extend-trial-form":"extendTrial"
}, CompanyExtendTrialView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
searchBy:this.searchBy
}), $(this.el).html(content), setTimeout(function() {
return that.initCompanySelect2();
}), this;
}, CompanyExtendTrialView.prototype.syncSearchBy = function() {
return this.searchBy = $(".search-radio-grp input:checked").val(), this.searchBySelected = !0;
}, CompanyExtendTrialView.prototype.initCompanySelect2 = function() {
var defaultOptions, options, that;
return that = this, defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
placeholder:"Select a Company",
ajax:{
url:"/x/api/v1/admin/search/companies",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return that.searchBySelected || ($.isNumeric(term) ? (that.searchBy = "id", $(".search-radio-grp input:nth(0)").prop("checked", !0)) :-1 === term.indexOf("@") ? (that.searchBy = "name", 
$(".search-radio-grp input:nth(1)").prop("checked", !0)) :-1 !== term.indexOf("@") && (that.searchBy = "email", 
$(".search-radio-grp input:nth(2)").prop("checked", !0))), {
q:term,
fields:that.companyFields[that.searchBy]
};
},
results:function(data) {
return {
results:data.results
};
}
}
}, options = _.extend(defaultOptions, options), this.selectBox = $("#company-select2"), 
this.selectBox.select2(options), this.selectBox.on("change", function(e) {
return that.fetchCompany(e.val, that);
});
}, CompanyExtendTrialView.prototype.fetchCompany = function(id, view) {
var model;
return model = new HR.CompanyModel(), model.set("id", id), view.model = model, model.fetch({
data:{
company_data_action:"extend_trial"
},
success:function(model) {
var dataView;
return dataView = new HR.CompanyExtendTrialDataView({
model:model
}), $(".company-info-section").html(dataView.render().el);
}
});
}, CompanyExtendTrialView.prototype.extendTrial = function(e) {
var button, currentTarget, params, that;
return that = this, e.preventDefault(), currentTarget = $(e.currentTarget), this.$(".message-box").addClass("hidden").html(""), 
button = currentTarget.find("button"), this.model.get("id") ? "Trial" === this.model.get("plan_name") || "Free" === this.model.get("plan_name") ? this.$("#new-payment-date").val() ? (HR.util.inlineLoadingStart(button), 
params = {
id:this.model.get("id"),
new_payment_date:this.$("#new-payment-date").val()
}, $.ajax({
url:"/x/api/v1/admin/companies/extend_trial",
data:params,
type:"PUT",
success:function(response) {
return HR.util.inlineLoadingEnd({
message:"Success"
}), that.$(".message-box").removeClass("hidden").addClass("success").html(response.message);
},
error:function(response) {
return response = JSON.parse(response.responseText), HR.util.inlineLoadingEnd({
message:"Error"
}), that.$(".message-box").removeClass("hidden").addClass("error").html(response.message);
}
})) :(this.$(".message-box").removeClass("hidden").addClass("error").html("You need to select a new expiry date"), 
void 0) :void 0 :(this.$(".message-box").removeClass("hidden").addClass("error").html("You need to select a company"), 
void 0);
}, CompanyExtendTrialView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CompanyExtendTrialView = CompanyExtendTrialView;
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
var DuplicateQuestionView, HR, _ref;
return DuplicateQuestionView = function(_super) {
function DuplicateQuestionView() {
return DuplicateQuestionView.__super__.constructor.apply(this, arguments);
}
return __extends(DuplicateQuestionView, _super), DuplicateQuestionView.prototype.template = "x-admin/duplicate-question", 
DuplicateQuestionView.prototype.searchBy = "id", DuplicateQuestionView.prototype.searchBySelected = !1, 
DuplicateQuestionView.prototype.userFields = {
id:"id",
name:"firstname, email"
}, DuplicateQuestionView.prototype.questionFields = {
id:"id",
name:"question"
}, DuplicateQuestionView.prototype.events = {
"change .search-radio-grp input":"syncSearchBy",
"submit #duplicate-question-form":"duplicate"
}, DuplicateQuestionView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
searchBy:this.searchBy
}), $(this.el).html(content), setTimeout(function() {
return that.initQuestionSelect2(), that.initUserSelect2();
}), this;
}, DuplicateQuestionView.prototype.initQuestionSelect2 = function() {
var defaultOptions, options, that;
return that = this, defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
placeholder:"Select a Question",
ajax:{
url:"/x/api/v1/admin/search/questions",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return that.searchBySelected || ($.isNumeric(term) ? (that.searchBy = "id", that.$(".search-radio-grp input:nth(0)").prop("checked", !0)) :(that.searchBy = "name", 
that.$(".search-radio-grp input:nth(1)").prop("checked", !0))), {
q:term,
fields:that.questionFields[that.searchBy]
};
},
results:function(data) {
return {
results:data.results
};
}
}
}, options = _.extend(defaultOptions, options), this.questionSelectBox = $("#question-select2"), 
this.questionSelectBox.select2(options);
}, DuplicateQuestionView.prototype.initUserSelect2 = function() {
var defaultOptions, options, that;
return that = this, defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
placeholder:"Select a User",
ajax:{
url:"/x/api/v1/admin/search/users",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return that.searchBySelected || ($.isNumeric(term) ? (that.searchBy = "id", that.$(".search-radio-grp input:nth(0)").prop("checked", !0)) :(that.searchBy = "name", 
that.$(".search-radio-grp input:nth(1)").prop("checked", !0))), {
q:term,
fields:that.userFields[that.searchBy]
};
},
results:function(data) {
return {
results:data.results
};
}
}
}, options = _.extend(defaultOptions, options), this.userSelectBox = $("#user-select2"), 
this.userSelectBox.select2(options);
}, DuplicateQuestionView.prototype.syncSearchBy = function() {
return this.searchBy = $(".search-radio-grp input:checked").val(), this.searchBySelected = !0;
}, DuplicateQuestionView.prototype.duplicate = function(e) {
var params, qid, that, uid;
return e.preventDefault(), this.$(".message-box").addClass("hidden"), that = this, 
uid = this.userSelectBox.select2("val"), qid = this.questionSelectBox.select2("val"), 
uid ? qid ? (params = {
uid:uid,
qid:qid
}, HR.util.inlineLoadingStart($(e.currentTarget).find("button")[0]), $.ajax({
url:"/x/api/v1/admin/questions/duplicate",
type:"POST",
dataType:"json",
data:params,
success:function(data) {
return HR.util.inlineLoadingEnd({
message:"Success"
}), that.$(".message-box").html(data.message).removeClass("hidden error").addClass("success");
},
error:function(data) {
return data = JSON.parse(data.responseText), HR.util.inlineLoadingEnd({
message:"Error"
}), that.$(".message-box").html(data.message).removeClass("hidden success").addClass("error");
}
})) :(this.$(".message-box").html("Please Select a Test").removeClass("hidden success").addClass("error"), 
void 0) :(this.$(".message-box").html("Please Select a User").removeClass("hidden success").addClass("error"), 
void 0);
}, DuplicateQuestionView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.DuplicateQuestionView = DuplicateQuestionView;
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
var DuplicateTestView, HR, _ref;
return DuplicateTestView = function(_super) {
function DuplicateTestView() {
return DuplicateTestView.__super__.constructor.apply(this, arguments);
}
return __extends(DuplicateTestView, _super), DuplicateTestView.prototype.template = "x-admin/duplicate-test", 
DuplicateTestView.prototype.searchBy = "id", DuplicateTestView.prototype.searchBySelected = !1, 
DuplicateTestView.prototype.userFields = {
id:"id",
name:"firstname,email"
}, DuplicateTestView.prototype.testFields = {
id:"id",
name:"name"
}, DuplicateTestView.prototype.events = function() {
return {
"change .search-radio-grp input":"syncSearchBy",
"submit #duplicate-test-form":"duplicate"
};
}, DuplicateTestView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
searchBy:that.searchBy
}), $(this.el).html(content), setTimeout(function() {
return that.initUserSelect2(), that.initTestSelect2();
}), this;
}, DuplicateTestView.prototype.initUserSelect2 = function() {
var defaultOptions, options, that;
return that = this, defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
placeholder:"Select a User",
ajax:{
url:"/x/api/v1/admin/search/users",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return that.searchBySelected || ($.isNumeric(term) ? (that.searchBy = "id", $(".search-radio-grp input:nth(0)").prop("checked", !0)) :(that.searchBy = "name", 
$(".search-radio-grp input:nth(1)").prop("checked", !0))), {
q:term,
fields:that.userFields[that.searchBy]
};
},
results:function(data) {
return {
results:data.results
};
}
}
}, options = _.extend(defaultOptions, options), this.userSelectBox = $(".user-select2"), 
this.userSelectBox.select2(options);
}, DuplicateTestView.prototype.initTestSelect2 = function() {
var defaultOptions, options, that;
return that = this, defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
placeholder:"Select a Test",
ajax:{
url:"/x/api/v1/admin/search/tests",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return that.searchBySelected || ($.isNumeric(term) ? (that.searchBy = "id", $(".search-radio-grp input:nth(0)").prop("checked", !0)) :(that.searchBy = "name", 
$(".search-radio-grp input:nth(1)").prop("checked", !0))), {
q:term,
fields:that.testFields[that.searchBy]
};
},
results:function(data) {
return {
results:data.results
};
}
}
}, options = _.extend(defaultOptions, options), this.testSelectBox = $(".test-select2"), 
this.testSelectBox.select2(options), $(".test-select2").on("change", function(e) {
return $(".test-name-edit").val(e.added.primary);
});
}, DuplicateTestView.prototype.syncSearchBy = function() {
return this.searchBy = $(".search-radio-grp input:checked").val(), this.searchBySelected = !0;
}, DuplicateTestView.prototype.duplicate = function(e) {
var name, params, that, tid, uid;
return e.preventDefault(), this.$(".message-box").addClass("hidden"), that = this, 
uid = this.userSelectBox.select2("val"), tid = this.testSelectBox.select2("val"), 
name = this.$(".test-name-edit").val(), uid ? tid ? (params = {
uid:uid,
tid:tid,
name:name
}, HR.util.inlineLoadingStart($(e.currentTarget).find("button")[0]), $.ajax({
url:"/x/api/v1/admin/tests/duplicate",
type:"POST",
dataType:"json",
data:params,
success:function(data) {
return HR.util.inlineLoadingEnd({
message:"Success"
}), that.$(".message-box").html(data.message).removeClass("hidden error").addClass("success");
},
error:function(data) {
return data = JSON.parse(data.responseText), HR.util.inlineLoadingEnd({
message:"Error"
}), that.$(".message-box").html(data.message).removeClass("hidden success").addClass("error");
}
})) :(this.$(".message-box").html("Please Select a Test").removeClass("hidden success").addClass("error"), 
void 0) :(this.$(".message-box").html("Please Select a User").removeClass("hidden success").addClass("error"), 
void 0);
}, DuplicateTestView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.DuplicateTestView = DuplicateTestView;
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
var HR, HomeView, _ref;
return HomeView = function(_super) {
function HomeView() {
return HomeView.__super__.constructor.apply(this, arguments);
}
return __extends(HomeView, _super), HomeView.prototype.template = "x-admin/home", 
HomeView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this), $(this.el).html(content), 
this;
}, HomeView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.HomeView = HomeView;
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
var HR, QuestionChangeOwnerDataView, _ref;
return QuestionChangeOwnerDataView = function(_super) {
function QuestionChangeOwnerDataView() {
return QuestionChangeOwnerDataView.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionChangeOwnerDataView, _super), QuestionChangeOwnerDataView.prototype.template = "x-admin/question-change-owner-data", 
QuestionChangeOwnerDataView.prototype.searchBy = "id", QuestionChangeOwnerDataView.prototype.searchBySelected = !1, 
QuestionChangeOwnerDataView.prototype.userFields = {
id:"id",
name:"firstname, email"
}, QuestionChangeOwnerDataView.prototype.events = {
"change .search-radio-grp input":"syncSearchBy",
"click a.show-sub-section":"showSubSection",
"click a.hide-sub-section":"hideSubSection",
"click a#change-test-owner-submit":"changeOwner"
}, QuestionChangeOwnerDataView.prototype.initialize = function(options) {
return null == options && (options = {}), this.model = options.model, this.listenTo(this.model, "change", this.render), 
this.listenTo(this.model, "reset", this.render);
}, QuestionChangeOwnerDataView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
searchBy:this.searchBy
}), $(this.el).html(content), setTimeout(function() {
return that.initUserSelect2();
}), this;
}, QuestionChangeOwnerDataView.prototype.initUserSelect2 = function() {
var defaultOptions, options, that;
return that = this, defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
placeholder:"Select a User",
ajax:{
url:"/x/api/v1/admin/search/users",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return that.searchBySelected || ($.isNumeric(term) ? (that.searchBy = "id", that.$(".search-radio-grp input:nth(0)").prop("checked", !0)) :(that.searchBy = "name", 
that.$(".search-radio-grp input:nth(1)").prop("checked", !0))), {
q:term,
fields:that.userFields[that.searchBy]
};
},
results:function(data) {
return {
results:data.results
};
}
}
}, options = _.extend(defaultOptions, options), this.selectBox = $("#user-select2"), 
this.selectBox.select2(options);
}, QuestionChangeOwnerDataView.prototype.syncSearchBy = function() {
return this.searchBy = this.$(".search-radio-grp input:checked").val(), this.searchBySelected = !0;
}, QuestionChangeOwnerDataView.prototype.showSubSection = function(e) {
var currentTarget;
return e.preventDefault(), currentTarget = $(e.currentTarget), currentTarget.addClass("hidden"), 
currentTarget.siblings(".hide-sub-section").removeClass("hidden"), $("." + currentTarget.data("link-container")).removeClass("hidden");
}, QuestionChangeOwnerDataView.prototype.hideSubSection = function(e) {
var currentTarget;
return e.preventDefault(), currentTarget = $(e.currentTarget), currentTarget.addClass("hidden"), 
currentTarget.siblings(".show-sub-section").removeClass("hidden"), $("." + currentTarget.data("link-container")).addClass("hidden");
}, QuestionChangeOwnerDataView.prototype.changeOwner = function(e) {
var currentTarget, params, that, userID;
return that = this, e.preventDefault(), currentTarget = $(e.currentTarget), userID = this.selectBox.val(), 
userID || $(".message-box").removeClass("hidden").addClass("error").html("Please Select a User"), 
HR.util.inlineLoadingStart(currentTarget), params = {
user_id:userID
}, $.ajax({
url:"/x/api/v1/admin/questions/" + this.model.get("id") + "/change_owner",
type:"PUT",
data:params,
success:function(response) {
return HR.util.inlineLoadingEnd(response), setTimeout(function() {
return that.model.fetch();
}, 1e3);
},
error:function(response) {
return response = JSON.parse(response.responseText), HR.util.inlineLoadingEnd(response);
}
});
}, QuestionChangeOwnerDataView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.QuestionChangeOwnerDataView = QuestionChangeOwnerDataView;
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
var HR, QuestionChangeOwnerView, _ref;
return QuestionChangeOwnerView = function(_super) {
function QuestionChangeOwnerView() {
return QuestionChangeOwnerView.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionChangeOwnerView, _super), QuestionChangeOwnerView.prototype.template = "x-admin/question-change-owner", 
QuestionChangeOwnerView.prototype.searchBy = "id", QuestionChangeOwnerView.prototype.searchBySelected = !1, 
QuestionChangeOwnerView.prototype.questionFields = {
id:"id",
name:"question"
}, QuestionChangeOwnerView.prototype.events = function() {
return {
"change .search-radio-grp input":"syncSearchBy"
};
}, QuestionChangeOwnerView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
searchBy:this.searchBy
}), $(this.el).html(content), setTimeout(function() {
return that.initQuestionSelect2();
}), this;
}, QuestionChangeOwnerView.prototype.initQuestionSelect2 = function() {
var defaultOptions, options, that;
return that = this, defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
placeholder:"Select a Question",
ajax:{
url:"/x/api/v1/admin/search/questions",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return that.searchBySelected || ($.isNumeric(term) ? (that.searchBy = "id", that.$(".search-radio-grp input:nth(0)").prop("checked", !0)) :(that.searchBy = "name", 
that.$(".search-radio-grp input:nth(1)").prop("checked", !0))), {
q:term,
fields:that.questionFields[that.searchBy]
};
},
results:function(data) {
return {
results:data.results
};
}
}
}, options = _.extend(defaultOptions, options), this.selectBox = $("#question-select2"), 
this.selectBox.select2(options), this.selectBox.on("change", function(e) {
return that.model = new HR.QuestionModel(), that.fetchQuestionData(e.val, that);
});
}, QuestionChangeOwnerView.prototype.syncSearchBy = function() {
return this.searchBy = this.$(".search-radio-grp input:checked").val(), this.searchBySelected = !0;
}, QuestionChangeOwnerView.prototype.fetchQuestionData = function(id, view) {
return view.model.set("id", id), view.model.fetch({
data:{
test_data_action:"change_question_owner"
},
success:function() {
return view.renderQuestionDataView();
}
});
}, QuestionChangeOwnerView.prototype.renderQuestionDataView = function() {
var view;
return view = new HR.QuestionChangeOwnerDataView({
model:this.model
}), $("#question-info-section").html(view.render().el);
}, QuestionChangeOwnerView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.QuestionChangeOwnerView = QuestionChangeOwnerView;
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
var HR, QuestionDuplicateFromHRView, _ref;
return QuestionDuplicateFromHRView = function(_super) {
function QuestionDuplicateFromHRView() {
return QuestionDuplicateFromHRView.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionDuplicateFromHRView, _super), QuestionDuplicateFromHRView.prototype.template = "x-admin/question-duplicate-from-hr", 
QuestionDuplicateFromHRView.prototype.searchBy = "id", QuestionDuplicateFromHRView.prototype.searchBySelected = !1, 
QuestionDuplicateFromHRView.prototype.userFields = {
id:"id",
name:"firstname,email"
}, QuestionDuplicateFromHRView.prototype.events = {
"change .search-radio-grp input":"syncSearchBy",
"submit form#duplicate-from-hr-form":"duplicate"
}, QuestionDuplicateFromHRView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
searchBy:this.searchBy
}), $(this.el).html(content), setTimeout(function() {
return that.initSlugSelect2(), that.initUserSelect2();
}), this;
}, QuestionDuplicateFromHRView.prototype.initSlugSelect2 = function() {
var defaultOptions, options;
return defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
placeholder:"Select a Challenge",
ajax:{
url:"/x/api/v1/admin/search/challenges",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return {
q:term
};
},
results:function(data) {
return {
results:data.results
};
}
}
}, options = _.extend(defaultOptions, options), this.challengeSelectBox = $("#challenge-select2"), 
this.challengeSelectBox.select2(options);
}, QuestionDuplicateFromHRView.prototype.initUserSelect2 = function() {
var defaultOptions, options, that;
return that = this, defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
placeholder:"Select a User",
ajax:{
url:"/x/api/v1/admin/search/users",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return that.searchBySelected || ($.isNumeric(term) ? (that.searchBy = "id", that.$(".search-radio-grp input:nth(0)").prop("checked", !0)) :(that.searchBy = "name", 
that.$(".search-radio-grp input:nth(1)").prop("checked", !0))), {
q:term,
fields:that.userFields[that.searchBy]
};
},
results:function(data) {
return {
results:data.results
};
}
}
}, options = _.extend(defaultOptions, options), this.userSelectBox = $("#user-select2"), 
this.userSelectBox.select2(options);
}, QuestionDuplicateFromHRView.prototype.syncSearchBy = function() {
return this.searchBy = $(".search-radio-grp input:checked").val(), this.searchBySelected = !0;
}, QuestionDuplicateFromHRView.prototype.duplicate = function(e) {
var button, currentTarget, params, slug, that, user_id;
return that = this, e.preventDefault(), currentTarget = $(e.currentTarget), button = currentTarget.find("button"), 
slug = this.challengeSelectBox.val(), user_id = this.userSelectBox.val(), slug ? (HR.util.inlineLoadingStart(button), 
params = {
slug:slug
}, user_id && (params.user_id = user_id), $.ajax({
url:"/x/api/v1/admin/questions/duplicate_from_hr",
type:"POST",
data:params,
success:function(response) {
var message;
return HR.util.inlineLoadingEnd({
message:"Success"
}), message = response.message + "<br> Question ID: " + response.question.id, that.$(".message-box").removeClass("hidden").addClass("success").html(message), 
that.userSelectBox.select2("data", null), that.challengeSelectBox.select2("data", null);
},
error:function(response) {
return HR.util.inlineLoadingEnd({
message:"Error"
}), that.$(".message-box").removeClass("hidden").addClass("error").html(response.message);
}
})) :(this.$(".message-box").removeClass("hidden").addClass("error").html("You need to select a challenge to duplicate"), 
void 0);
}, QuestionDuplicateFromHRView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.QuestionDuplicateFromHRView = QuestionDuplicateFromHRView;
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
var HR, SectionalTestView, _ref;
return SectionalTestView = function(_super) {
function SectionalTestView() {
return SectionalTestView.__super__.constructor.apply(this, arguments);
}
return __extends(SectionalTestView, _super), SectionalTestView.prototype.template = "x-admin/sectional-test", 
SectionalTestView.prototype.colors = [ "#FFBF00", "#8DB600", "#E30022", "#9BDDFF" ], 
SectionalTestView.prototype.initialize = function(options) {
return null == options && (options = {}), this.model = options.model;
}, SectionalTestView.prototype.events = function() {
return {
"click .confirm-new-section-button":"confirmAddSection",
"click .show-edit-section-button":"showEditSection",
"click .cancel-edit-section-button":"cancelEditSection",
"click .confirm-edit-section-button":"confirmEditSection",
"click .confirm-section-button":"confirmEditSection",
"click .remove-section-button":"removeSection",
"keydown .add-section-form input":"preventEnter"
};
}, SectionalTestView.prototype._render = function() {
var content;
return this.precalculateQuestionSection(), content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
colors:this.colors
}), $(this.el).html(content), this;
}, SectionalTestView.prototype.precalculateQuestionSection = function() {
var questions, time_slots, _ref;
return questions = this.model.get("questions"), time_slots = null != (_ref = this.model.get("time_slots_decoded")) ? _ref :[], 
_.each(questions, function(question, index) {
var count;
return count = 0, question.time_slot_index = void 0, _.each(time_slots, function(time_slot, tindex) {
return time_slot && (count += time_slot.questions, count >= index + 1 && void 0 === question.time_slot_index) ? question.time_slot_index = tindex :void 0;
});
}), this.model.set("questions", questions);
}, SectionalTestView.prototype.preventEnter = function(e) {
var keyCode;
return keyCode = e.keyCode || e.which, 13 === keyCode ? e.preventDefault() :void 0;
}, SectionalTestView.prototype.confirmAddSection = function(e) {
var count, duration, name, time_slots_decoded, _ref;
return e.preventDefault(), this.$(".new-section-msg").addClass("hidden"), this.$("#new-section-name").removeClass("error"), 
this.$("#new-section-no-ques").removeClass("error"), this.$("#new-section-duration").removeClass("error"), 
name = this.$("#new-section-name").val(), count = parseInt(this.$("#new-section-no-ques").val(), 10), 
duration = parseInt(this.$("#new-section-duration").val(), 10), name ? count ? duration ? (time_slots_decoded = null != (_ref = this.model.get("time_slots_decoded")) ? _ref :[], 
time_slots_decoded.push({
name:name,
duration:duration,
questions:count
}), this.model.set("time_slots_decoded", time_slots_decoded), this.model.set("duration", parseInt(this.model.get("duration"), 10) + duration), 
this.render(), setTimeout(function() {
return $("#new-section-name").focus();
})) :(this.$("#new-section-duration").addClass("error"), this.$(".new-section-msg").removeClass("hidden success").addClass("error").html("Section Duration Cannot be blank"), 
void 0) :(this.$("#new-section-no-ques").addClass("error"), this.$(".new-section-msg").removeClass("hidden success").addClass("error").html("Questions count cannot be blank"), 
void 0) :(this.$("#new-section-name").addClass("error"), this.$(".new-section-msg").removeClass("hidden success").addClass("error").html("Name cannot be blank"), 
void 0);
}, SectionalTestView.prototype.showEditSection = function(e) {
var target;
return e.preventDefault(), target = $(e.currentTarget), target.parent().parent().addClass("hidden"), 
target.parent().parent().parent().find(".section-edit").removeClass("hidden"), target.parent().parent().parent().find(".section-name").focus();
}, SectionalTestView.prototype.cancelEditSection = function(e) {
var target;
return e.preventDefault(), target = $(e.currentTarget), target.parent().parent().addClass("hidden"), 
target.parent().parent().parent().find(".section-info").removeClass("hidden");
}, SectionalTestView.prototype.confirmEditSection = function(e) {
var count, duration, index, name, old_time_slot, target, time_slots_decoded, _ref;
return e.preventDefault(), target = $(e.currentTarget), target.parent().parent().find(".section-name").removeClass("error"), 
target.parent().parent().find(".section-no-ques").removeClass("error"), target.parent().parent().find(".section-duration").removeClass("error"), 
index = parseInt(target.data("index")), name = target.parent().parent().find(".section-name").val(), 
count = parseInt(target.parent().parent().find(".section-no-ques").val(), 10), duration = parseInt(target.parent().parent().find(".section-duration").val(), 10), 
name ? count ? duration ? (time_slots_decoded = null != (_ref = this.model.get("time_slots_decoded")) ? _ref :[], 
old_time_slot = time_slots_decoded[index], time_slots_decoded[index] = {
name:name,
duration:duration,
questions:count
}, this.model.set("time_slots_decoded", time_slots_decoded), this.model.set("duration", parseInt(this.model.get("duration"), 10) - old_time_slot.duration + duration), 
this.render()) :(target.parent().parent().find(".section-duration").addClass("error"), 
target.parent().parent().find(".edit-section-msg").removeClass("hidden success").addClass("error").html("Section Duration Cannot be blank"), 
void 0) :(target.parent().parent().find(".section-no-ques").addClass("error"), target.parent().parent().find(".edit-section-msg").removeClass("hidden success").addClass("error").html("Questions count cannot be blank"), 
void 0) :(target.parent().parent().find(".section-name").addClass("error"), target.parent().parent().find(".edit-section-msg").removeClass("hidden success").addClass("error").html("Name cannot be blank"), 
void 0);
}, SectionalTestView.prototype.removeSection = function(e) {
var index, old_time_slot, target, time_slots_decoded;
return e.preventDefault(), target = $(e.currentTarget), index = parseInt(target.data("index"), 10), 
time_slots_decoded = this.model.get("time_slots_decoded"), old_time_slot = time_slots_decoded[index], 
time_slots_decoded.splice(index, 1), this.model.set("time_slots_decoded", time_slots_decoded), 
this.model.set("duration", parseInt(this.model.get("duration"), 10) - old_time_slot.duration), 
this.render();
}, SectionalTestView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SectionalTestView = SectionalTestView;
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
var HR, SwitchUserView, _ref;
return SwitchUserView = function(_super) {
function SwitchUserView() {
return SwitchUserView.__super__.constructor.apply(this, arguments);
}
return __extends(SwitchUserView, _super), SwitchUserView.prototype.searchBySelected = !1, 
SwitchUserView.prototype.searchBy = "id", SwitchUserView.prototype.userFields = {
id:"id",
name:"firstname,email"
}, SwitchUserView.prototype.template = "x-admin/switch-user", SwitchUserView.prototype.events = function() {
return {
"change .search-radio-grp input":"syncSearchBy",
"submit #su-form":"switchUser"
};
}, SwitchUserView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
searchBy:this.searchBy
}), $(this.el).html(content), that.initUserSelect2(), this;
}, SwitchUserView.prototype.initUserSelect2 = function() {
var defaultOptions, options, that;
return that = this, defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
placeholder:"Select a User",
ajax:{
url:"/x/api/v1/admin/search/users",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return that.searchBySelected || ($.isNumeric(term) ? (that.searchBy = "id", $(".search-radio-grp input:nth(0)").prop("checked", !0)) :(that.searchBy = "name", 
$(".search-radio-grp input:nth(1)").prop("checked", !0))), {
q:term,
fields:that.userFields[that.searchBy]
};
},
results:function(data) {
return {
results:data.results
};
}
}
}, options = _.extend(defaultOptions, options), this.userSelectBox = $("#user-select2"), 
this.userSelectBox.select2(options);
}, SwitchUserView.prototype.syncSearchBy = function() {
return this.searchBy = $(".search-radio-grp input:checked").val(), this.searchBySelected = !0;
}, SwitchUserView.prototype.switchUser = function(e) {
var id, params, target, that;
return e.preventDefault(), this.$(".message-box").html("").addClass("hidden"), that = this, 
target = $(e.currentTarget).find("button")[0], (id = this.userSelectBox.select2("val")) ? (params = {
id:id
}, HR.util.inlineLoadingStart(target), $.ajax({
url:"/x/api/v1/admin/users/su",
type:"POST",
dataType:"json",
data:params,
success:function(data) {
return HR.util.inlineLoadingEnd({
message:"Success"
}), that.$(".message-box").removeClass("hidden error").addClass("success").html(data.message), 
setTimeout(function() {
return window.location.href = "/x/tests";
}, 1e3);
},
error:function(data) {
return HR.util.inlineLoadingEnd({
message:null
}), data = JSON.parse(data.responseText), that.$(".message-box").removeClass("hidden success").addClass("error").html(data.message);
}
})) :(this.$(".message-box").html("Please select a user to switch into his account").addClass("error").removeClass("success hidden"), 
void 0);
}, SwitchUserView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SwitchUserView = SwitchUserView;
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
var HR, TestAddSectionsView, _ref;
return TestAddSectionsView = function(_super) {
function TestAddSectionsView() {
return TestAddSectionsView.__super__.constructor.apply(this, arguments);
}
return __extends(TestAddSectionsView, _super), TestAddSectionsView.prototype.template = "x-admin/test-add-sections", 
TestAddSectionsView.prototype.searchBy = "id", TestAddSectionsView.prototype.searchBySelected = !1, 
TestAddSectionsView.prototype.testFields = {
id:"id",
name:"name"
}, TestAddSectionsView.prototype.initialize = function() {
return this._subviews = [];
}, TestAddSectionsView.prototype.events = function() {
return {
"change .search-radio-grp input":"syncSearchBy",
"submit #test-sections-form":"updateTestSections"
};
}, TestAddSectionsView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
searchBy:this.searchBy
}), $(this.el).html(content), setTimeout(function() {
return that.initTestSelect2();
}), this;
}, TestAddSectionsView.prototype.initTestSelect2 = function() {
var defaultOptions, options, that;
return that = this, defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
placeholder:"Select a Test",
ajax:{
url:"/x/api/v1/admin/search/tests",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return that.searchBySelected || ($.isNumeric(term) ? (that.searchBy = "id", $(".search-radio-grp input:nth(0)").prop("checked", !0)) :(that.searchBy = "name", 
$(".search-radio-grp input:nth(1)").prop("checked", !0))), {
q:term,
fields:that.testFields[that.searchBy]
};
},
results:function(data) {
return {
results:data.results
};
}
}
}, options = _.extend(defaultOptions, options), this.testSelectBox = $(".test-select2"), 
this.testSelectBox.select2(options), this.testSelectBox.on("change", function(e) {
return that.fetchTestData(e.val);
});
}, TestAddSectionsView.prototype.syncSearchBy = function() {
return this.searchBy = $(".search-radio-grp input:checked").val(), this.searchBySelected = !0;
}, TestAddSectionsView.prototype.formatResult = function(result) {
var id, markup, primary, secondary;
return id = result.id, primary = result.primary, secondary = result.secondary, markup = "<table class='result-result'><tr>", 
primary && (markup += "<td class='result-info'><div class='result-title'>" + id + " : " + primary + "</div>"), 
secondary && (markup += "<div class='result-data'>" + secondary + "</div>"), markup += "</td></tr></table>";
}, TestAddSectionsView.prototype.formatSelection = function(result) {
var primary;
return primary = result.primary, primary ? "" + result.id + " : " + primary :void 0;
}, TestAddSectionsView.prototype.fetchTestData = function(id) {
var that;
return that = this, this.model = new HR.TestModel(), this.model.set("id", id), this.model.fetch({
silent:!0,
success:function(model) {
return that.testView = new HR.SectionalTestView({
model:model
}), that.$("#test-sections-container").html(that.testView.render().el);
}
});
}, TestAddSectionsView.prototype.updateTestSections = function(e) {
var button, count, duration, params, questions, that, tid, time_slots;
if (e.preventDefault(), that = this, this.$(".message-box").addClass("hidden"), 
button = $(e.currentTarget).find("button[type=submit]"), time_slots = this.model.get("time_slots_decoded"), 
tid = this.model.get("id"), questions = this.model.get("questions"), duration = this.model.get("duration"), 
time_slots && time_slots.length) {
if (count = 0, _.each(time_slots, function(time_slot) {
return time_slot ? count += parseInt(time_slot.questions, 10) :void 0;
}), questions.length > count) return this.$(".message-box").html("Sections contain lesser questions than total test questions").removeClass("hidden success").addClass("error"), 
void 0;
if (questions.length < count) return this.$(".message-box").html("Sections contain more questions than total test questions").removeClass("hidden success").addClass("error"), 
void 0;
}
return params = {
time_slots:JSON.stringify(null != time_slots ? time_slots :[]),
duration:duration
}, HR.util.inlineLoadingStart(button), $.ajax({
url:"/x/api/v1/admin/tests/" + tid + "/update_sections",
type:"PUT",
dataType:"json",
data:params,
success:function(response) {
return HR.util.inlineLoadingEnd({
message:response.message
});
},
error:function(response) {
return response = JSON.parse(response.responseText), HR.util.inlineLoadingEnd({
message:response.message
});
}
});
}, TestAddSectionsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestAddSectionsView = TestAddSectionsView;
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
var HR, TestChangeOwnerDataView, _ref;
return TestChangeOwnerDataView = function(_super) {
function TestChangeOwnerDataView() {
return TestChangeOwnerDataView.__super__.constructor.apply(this, arguments);
}
return __extends(TestChangeOwnerDataView, _super), TestChangeOwnerDataView.prototype.template = "x-admin/test-change-owner-data", 
TestChangeOwnerDataView.prototype.searchBy = "id", TestChangeOwnerDataView.prototype.searchBySelected = !1, 
TestChangeOwnerDataView.prototype.userFields = {
id:"id",
name:"firstname,email"
}, TestChangeOwnerDataView.prototype.events = {
"change .search-radio-grp input":"syncSearchBy",
"click a.show-sub-section":"showSubSection",
"click a.hide-sub-section":"hideSubSection",
"click a#change-test-owner-submit":"changeOwner"
}, TestChangeOwnerDataView.prototype.initialize = function(options) {
return null == options && (options = {}), this.model = options.model, this.listenTo(this.model, "reset", this.render), 
this.listenTo(this.model, "change", this.render);
}, TestChangeOwnerDataView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
searchBy:this.searchBy
}), $(this.el).html(content), setTimeout(function() {
return that.initUserSelect2();
}), this;
}, TestChangeOwnerDataView.prototype.initUserSelect2 = function() {
var defaultOptions, options, that;
return that = this, defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
placeholder:"Select a User",
ajax:{
url:"/x/api/v1/admin/search/users",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return that.searchBySelected || ($.isNumeric(term) ? (that.searchBy = "id", that.$(".search-radio-grp input:nth(0)").prop("checked", !0)) :(that.searchBy = "name", 
that.$(".search-radio-grp input:nth(1)").prop("checked", !0))), {
q:term,
fields:that.userFields[that.searchBy]
};
},
results:function(data) {
return {
results:data.results
};
}
}
}, options = _.extend(defaultOptions, options), this.selectBox = $("#user-select2"), 
this.selectBox.select2(options);
}, TestChangeOwnerDataView.prototype.syncSearchBy = function() {
return this.searchBy = $(".search-radio-grp input:checked").val(), this.searchBySelected = !0;
}, TestChangeOwnerDataView.prototype.showSubSection = function(e) {
var currentTarget;
return e.preventDefault(), currentTarget = $(e.currentTarget), currentTarget.addClass("hidden"), 
currentTarget.siblings(".hide-sub-section").removeClass("hidden"), $("." + currentTarget.data("link-container")).removeClass("hidden");
}, TestChangeOwnerDataView.prototype.hideSubSection = function(e) {
var currentTarget;
return e.preventDefault(), currentTarget = $(e.currentTarget), currentTarget.addClass("hidden"), 
currentTarget.siblings(".show-sub-section").removeClass("hidden"), $("." + currentTarget.data("link-container")).addClass("hidden");
}, TestChangeOwnerDataView.prototype.changeOwner = function(e) {
var changeQuestionOwner, currentTarget, params, that, userID;
return that = this, e.preventDefault(), currentTarget = $(e.currentTarget), userID = this.selectBox.val(), 
userID || $(".message-box").removeClass("hidden").addClass("error").html("Please Select a User"), 
changeQuestionOwner = $("#change-question-owner").prop("checked"), HR.util.inlineLoadingStart(currentTarget), 
params = {
user_id:userID,
change_question_owner:changeQuestionOwner
}, $.ajax({
url:"/x/api/v1/admin/tests/" + this.model.get("id") + "/change_owner",
type:"PUT",
data:params,
success:function(response) {
return HR.util.inlineLoadingEnd(response), setTimeout(function() {
return that.model.fetch();
}, 1e3);
},
error:function(response) {
return response = JSON.parse(response.responseText), HR.util.inlineLoadingEnd(response);
}
});
}, TestChangeOwnerDataView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestChangeOwnerDataView = TestChangeOwnerDataView;
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
var HR, TestChangeOwnerView, _ref;
return TestChangeOwnerView = function(_super) {
function TestChangeOwnerView() {
return TestChangeOwnerView.__super__.constructor.apply(this, arguments);
}
return __extends(TestChangeOwnerView, _super), TestChangeOwnerView.prototype.template = "x-admin/test-change-owner", 
TestChangeOwnerView.prototype.searchBy = "id", TestChangeOwnerView.prototype.searchBySelected = !1, 
TestChangeOwnerView.prototype.testFields = {
id:"id",
name:"name"
}, TestChangeOwnerView.prototype.events = function() {
return {
"change .search-radio-grp input":"syncSearchBy"
};
}, TestChangeOwnerView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
searchBy:this.searchBy
}), $(this.el).html(content), setTimeout(function() {
return that.initTestSelect2();
}), this;
}, TestChangeOwnerView.prototype.initTestSelect2 = function() {
var defaultOptions, options, that;
return that = this, defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
placeholder:"Select a Test",
ajax:{
url:"/x/api/v1/admin/search/tests",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return that.searchBySelected || ($.isNumeric(term) ? (that.searchBy = "id", that.$(".search-radio-grp input:nth(0)").prop("checked", !0)) :(that.searchBy = "name", 
that.$(".search-radio-grp input:nth(1)").prop("checked", !0))), {
q:term,
fields:that.testFields[that.searchBy]
};
},
results:function(data) {
return {
results:data.results
};
}
}
}, options = _.extend(defaultOptions, options), this.selectBox = $("#test-select2"), 
this.selectBox.select2(options), this.selectBox.on("change", function(e) {
return that.model = new HR.TestModel(), that.fetchTestData(e.val, that);
});
}, TestChangeOwnerView.prototype.syncSearchBy = function() {
return this.searchBy = $(".search-radio-grp input:checked").val(), this.searchBySelected = !0;
}, TestChangeOwnerView.prototype.fetchTestData = function(id, view) {
return view.model.set("id", id), view.model.fetch({
data:{
test_data_action:"change_test_owner"
},
success:function() {
return view.renderTestDataView();
}
});
}, TestChangeOwnerView.prototype.renderTestDataView = function() {
var view;
return view = new HR.TestChangeOwnerDataView({
model:this.model
}), $("#test-info-section").html(view.render().el);
}, TestChangeOwnerView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestChangeOwnerView = TestChangeOwnerView;
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
var HR, TestInviteCandidatesView, _ref;
return TestInviteCandidatesView = function(_super) {
function TestInviteCandidatesView() {
return TestInviteCandidatesView.__super__.constructor.apply(this, arguments);
}
return __extends(TestInviteCandidatesView, _super), TestInviteCandidatesView.prototype.template = "x-admin/test-invite-candidates", 
TestInviteCandidatesView.prototype.initialize = function() {
return this._subviews = [];
}, TestInviteCandidatesView.prototype.events = function() {
return {
"submit form[name=invite-candidates-form]":"inviteCandidates"
};
}, TestInviteCandidatesView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this), $(this.el).html(content), 
this;
}, TestInviteCandidatesView.prototype.inviteCandidates = function(e) {
var request_params;
return e.preventDefault(), this.$(".message-box").empty(), request_params = {
url:"/x/api/v1/admin/tests/invite_candidates?force_invite=" + $("input[name=force-invite]").get(0).checked,
type:"POST",
dataType:"json",
success:function(_this) {
return function(xhr) {
return _this.$(".message-box").empty(), xhr.invited && xhr.invited > 0 && _this.$(".message-box.success").append("" + xhr.invited + " candidates have been invited"), 
xhr.invited_rows && _this.$(".message-box.success").append(" from rows [" + xhr.invited_rows.join(",") + "] <br/>"), 
xhr.errors && xhr.errors.length > 0 ? _this.$(".message-box.error").append("" + xhr.errors.join("<br/>")) :void 0;
};
}(this),
error:function() {
return function(xhr) {
return console.log("Error Occured"), console.log(xhr);
};
}(this)
}, $(":file").length > 0 && (request_params.iframe = !0, request_params.processData = !1, 
request_params.files = $(":file")), $.ajax(request_params);
}, TestInviteCandidatesView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestInviteCandidatesView = TestInviteCandidatesView;
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
var HR, TopNavigationBarView, _ref;
return TopNavigationBarView = function(_super) {
function TopNavigationBarView() {
return TopNavigationBarView.__super__.constructor.apply(this, arguments);
}
return __extends(TopNavigationBarView, _super), TopNavigationBarView.prototype.template = "x-admin/top-nav-bar", 
TopNavigationBarView.prototype.class_name = "hr-nav", TopNavigationBarView.prototype.activeSection = "", 
TopNavigationBarView.prototype.initialize = function(options) {
return this.model = options.model, this.listenTo(this.model, "change", this.render);
}, TopNavigationBarView.prototype.events = function() {
return {
"click a.js-nav-link":"navigateAnchor"
};
}, TopNavigationBarView.prototype.render = function() {
var content;
return this.activeSection = this.getActiveSection(), content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
_model:this.model,
activeSection:this.activeSection
}), $(this.el).html(content), this.highlightActiveSection(), this;
}, TopNavigationBarView.prototype.navigateAnchor = function(e) {
var href;
return e.ctrlKey || e.metaKey ? !0 :(e.preventDefault(), href = $(e.currentTarget).attr("href"), 
href && "#" !== href ? (HR.router.navigate(href, !0), this.highlightActiveSection()) :void 0);
}, TopNavigationBarView.prototype.highlightActiveSection = function() {
return this.activeSection = this.getActiveSection(), this.$(".js-nav-sections").removeClass("active"), 
"admin" === this.activeSection ? this.$(".js-admin-section").addClass("active") :"analytics" === this.activeSection ? this.$(".js-analytics-section").addClass("active") :void 0;
}, TopNavigationBarView.prototype.getActiveSection = function() {
return Backbone.history.fragment ? Backbone.history.fragment.split("/")[0] :void 0;
}, TopNavigationBarView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TopNavigationBarView = TopNavigationBarView;
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
var HR, UserChangeEmailView, _ref;
return UserChangeEmailView = function(_super) {
function UserChangeEmailView() {
return UserChangeEmailView.__super__.constructor.apply(this, arguments);
}
return __extends(UserChangeEmailView, _super), UserChangeEmailView.prototype.template = "x-admin/user-change-email", 
UserChangeEmailView.prototype.searchBy = "id", UserChangeEmailView.prototype.searchBySelected = !1, 
UserChangeEmailView.prototype.userFields = {
id:"id",
name:"firstname,email"
}, UserChangeEmailView.prototype.events = function() {
return {
"change .search-radio-grp input":"syncSearchBy",
"submit #change-user-email":"updateUserEmail"
};
}, UserChangeEmailView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
searchBy:this.searchBy
}), $(this.el).html(content), setTimeout(function() {
return that.initUserSelect2();
}), this;
}, UserChangeEmailView.prototype.initUserSelect2 = function() {
var defaultOptions, options, that;
return that = this, defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
placeholder:"Select a User",
ajax:{
url:"/x/api/v1/admin/search/users",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return that.searchBySelected || ($.isNumeric(term) ? (that.searchBy = "id", $(".search-radio-grp input:nth(0)").prop("checked", !0)) :(that.searchBy = "name", 
$(".search-radio-grp input:nth(1)").prop("checked", !0))), {
q:term,
fields:that.userFields[that.searchBy]
};
},
results:function(data) {
return {
results:data.results
};
}
}
}, options = _.extend(defaultOptions, options), this.selectBox = $(".user-select2"), 
this.selectBox.select2(options);
}, UserChangeEmailView.prototype.syncSearchBy = function() {
return this.searchBy = $(".search-radio-grp input:checked").val(), this.searchBySelected = !0;
}, UserChangeEmailView.prototype.updateUserEmail = function(e) {
var button, currentTarget, email, id, params, send_confirmation, that;
return that = this, e.preventDefault(), currentTarget = $(e.currentTarget), button = currentTarget.find("button")[0], 
this.$(".message-box").addClass("hidden"), this.$(".new-email").removeClass("error"), 
id = this.$(".user-select2").select2("val"), email = this.$(".new-email").val(), 
send_confirmation = this.$(".send-confirmation-mail").prop("checked"), id ? email ? (HR.util.inlineLoadingStart(button), 
params = {
id:id,
email:email,
send_confirmation:send_confirmation
}, $.ajax({
url:"/x/api/v1/admin/users/update_email",
type:"PUT",
data:params,
dataType:"json",
success:function(response) {
return HR.util.inlineLoadingEnd(response), that.render();
},
error:function(response) {
return response = JSON.parse(response.responseText), HR.util.inlineLoadingEnd({
message:null
}), that.$(".message-box").removeClass("hidden success").addClass("error").html(response.message), 
that.$(".new-email").addClass("error");
}
})) :(this.$(".message-box").removeClass("hidden success").addClass("error").html("Please Enter an Email"), 
this.$(".new-email").addClass("error"), void 0) :(this.$(".message-box").removeClass("hidden success").addClass("error").html("Please Select a User"), 
void 0);
}, UserChangeEmailView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.UserChangeEmailView = UserChangeEmailView;
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
var CompanyModel, HR, _ref;
return CompanyModel = function(_super) {
function CompanyModel() {
return CompanyModel.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyModel, _super), CompanyModel.prototype.url = function() {
return this.get("id") ? "/x/api/v1/admin/companies/" + this.get("id") :"/x/api/v1/admin/companies";
}, CompanyModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.CompanyModel = CompanyModel;
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
var HR, PeriodicReportModel, _ref;
return PeriodicReportModel = function(_super) {
function PeriodicReportModel() {
return PeriodicReportModel.__super__.constructor.apply(this, arguments);
}
return __extends(PeriodicReportModel, _super), PeriodicReportModel.prototype.caching = !1, 
PeriodicReportModel.prototype.url = function() {
return this.get("id") ? "/x/api/v1/admin/periodic_reports/" + this.get("id") :"/x/api/v1/admin/periodic_reports";
}, PeriodicReportModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.PeriodicReportModel = PeriodicReportModel;
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
var HR, QuestionModel, _ref;
return QuestionModel = function(_super) {
function QuestionModel() {
return QuestionModel.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionModel, _super), QuestionModel.prototype.url = function() {
return "/x/api/v1/admin/questions/" + this.get("id");
}, QuestionModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.QuestionModel = QuestionModel;
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
var HR, TestModel, _ref;
return TestModel = function(_super) {
function TestModel() {
return TestModel.__super__.constructor.apply(this, arguments);
}
return __extends(TestModel, _super), TestModel.prototype.url = function() {
return "/x/api/v1/admin/tests/" + this.get("id");
}, TestModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestModel = TestModel;
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
var HR, PeriodicReportsCollection, _ref;
return PeriodicReportsCollection = function(_super) {
function PeriodicReportsCollection() {
return PeriodicReportsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(PeriodicReportsCollection, _super), PeriodicReportsCollection.prototype.page = 1, 
PeriodicReportsCollection.prototype.url = function() {
return "/x/api/v1/admin/periodic_reports?page=" + this.page;
}, PeriodicReportsCollection.prototype.setPage = function(page) {
return this.page = page;
}, PeriodicReportsCollection.prototype.model = window.HR.PeriodicReportModel, PeriodicReportsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.PeriodicReportsCollection = PeriodicReportsCollection;
});
}.call(this), function() {}.call(this);