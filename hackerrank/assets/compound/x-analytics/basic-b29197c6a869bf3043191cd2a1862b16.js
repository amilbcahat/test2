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
return __extends(GenericModel, _super), GenericModel.prototype.initialize = function(options) {
return this.on("error", function(_this) {
return function(model, xhr) {
var response;
return response = xhr && xhr.responseText ? JSON.parse(xhr.responseText) :{
message:""
}, void 0 !== _this.disableThrobber && _this.disableThrobber === !0 || (HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg(response.message, !1, !0, 1e4), 
!HR.loadingButton) ? void 0 :HR.util.inlineLoadingEnd(response);
};
}(this)), GenericModel.__super__.initialize.call(this, options);
}, GenericModel.prototype.save = function(key, val, options) {
return void 0 === this.disableThrobber || this.disableThrobber !== !0 ? HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("Loading...", !1, !0, 1e3) :this.disableThrobber = !1, 
GenericModel.__super__.save.call(this, key, val, options);
}, GenericModel.prototype.parse = function(resp, xhr) {
var model;
return this.sync_status = !0, void 0 === this.disableThrobber || this.disableThrobber !== !0 ? (HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("", !1, !0, 0), 
HR.loadingButton && HR.util.inlineLoadingEnd(resp)) :this.disableThrobber = !1, 
model = resp && resp.model ? resp.model :resp, GenericModel.__super__.parse.call(this, model, xhr);
}, GenericModel.prototype.fetch = function() {
return this.trigger("initreset"), void 0 === this.disableThrobber || this.disableThrobber !== !0 ? HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("Loading...", !1, !0, 1e3) :this.disableThrobber = !1, 
Backbone.Model.prototype.fetch.apply(this, arguments);
}, GenericModel.prototype.setCaching = function(caching) {
this.caching = caching;
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
return __extends(GenericCollection, _super), GenericCollection.prototype.initialize = function(options) {
return this.sync_status = !1, this.render_once = !1, this.on("error", function(_this) {
return function(model, xhr) {
var response;
return response = JSON.parse(xhr.responseText), void 0 !== _this.disableThrobber && _this.disableThrobber === !0 || (HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("", !1, !0, 0), 
!HR.loadingButton) ? void 0 :HR.util.inlineLoadingEnd(response);
};
}(this)), GenericCollection.__super__.initialize.call(this, options);
}, GenericCollection.prototype.fetch = function(options) {
return null == options && (options = {}), this.trigger("initreset"), void 0 === this.disableThrobber || this.disableThrobber !== !0 ? HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("Loading...", !1, !0, 1e3) :this.disableThrobber = !1, 
Backbone.Collection.prototype.fetch.apply(this, arguments);
}, GenericCollection.prototype.parse = function(resp) {
return this.sync_status = !0, this.render_once = !1, resp.metamodel && (this.metamodel = resp.metamodel), 
resp.total && (this.total = resp.total), resp.page && (this.page = resp.page), void 0 === this.disableThrobber || this.disableThrobber !== !0 ? (HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("", !1, !0, 0), 
HR.loadingButton && HR.util.inlineLoadingEnd(resp)) :this.disableThrobber = !1, 
resp.models;
}, GenericCollection.prototype.setCurrentPage = function(page) {
this.page = page;
}, GenericCollection.prototype.getCurrentPage = function() {
return this.page;
}, GenericCollection.prototype.getTotal = function() {
return this.total;
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
var AnalyticsNavigationView, HR, _ref;
return AnalyticsNavigationView = function(_super) {
function AnalyticsNavigationView() {
return AnalyticsNavigationView.__super__.constructor.apply(this, arguments);
}
return __extends(AnalyticsNavigationView, _super), AnalyticsNavigationView.prototype.template = "x-analytics/analytics-navigation", 
AnalyticsNavigationView.prototype.initialize = function(options) {
var that;
return that = this, this.active_nav_link = options.active_nav_link;
}, AnalyticsNavigationView.prototype.updateData = function(model, active_nav_link) {
return this.model = model, this.active_nav_link = active_nav_link;
}, AnalyticsNavigationView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
active_nav_link:this.active_nav_link,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content), this;
}, AnalyticsNavigationView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.AnalyticsNavigationView = AnalyticsNavigationView;
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
var CompaniesListView, HR, _ref;
return CompaniesListView = function(_super) {
function CompaniesListView() {
return CompaniesListView.__super__.constructor.apply(this, arguments);
}
return __extends(CompaniesListView, _super), CompaniesListView.prototype.template = "x-analytics/companies-list", 
CompaniesListView.prototype.viewType = "dataUsage", CompaniesListView.prototype.columnOptions = {
dataUsage:[ {
sWidth:"3%"
}, {
sWidth:"10%"
}, {
sWidth:"15%"
}, {
sWidth:"5%"
}, {
sWidth:"5%"
}, {
sWidth:"5%"
}, {
sWidth:"5%"
}, {
sWidth:"5%"
}, {
sWidth:"5%"
}, {
sWidth:"5%"
}, {
sWidth:"5%"
}, {
sWidth:"5%"
} ],
licenseUsage:[ {
sWidth:"3%"
}, {
sWidth:"10%"
}, {
sWidth:"15%"
}, {
sWidth:"5%"
}, {
sWidth:"5%"
}, {
sWidth:"5%"
}, {
sWidth:"5%"
}, {
sWidth:"5%"
}, {
sWidth:"5%"
}, {
sWidth:"5%"
}, {
sWidth:"5%"
}, {
sWidth:"5%"
}, {
sWidth:"5%"
}, {
sWidth:"5%"
} ]
}, CompaniesListView.prototype.initialize = function(options) {
return null == options && (options = {}), this.companies = options.collection;
}, CompaniesListView.prototype.events = {
"click a.payment-type-change":"changePaymentType",
"click a.duration-change":"changeDuration",
"click a.view-type-change":"changeViewType"
}, CompaniesListView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
companies:this.companies.toJSON(),
viewType:this.viewType,
duration:this.companies.getDuration(),
paymentType:this.companies.getType()
}), $(this.el).html(content), setTimeout(function() {
return that.initDataTable();
}), this;
}, CompaniesListView.prototype.initDataTable = function() {
var that;
return that = this, this.dataTable = $(".dash-table").dataTable({
sDom:"<'row-fluid'<'span6'T><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
bPaginate:!0,
sPaginationType:"bootstrap",
iDisplayLength:50,
bDestroy:!0,
sScrollX:"1900px",
aoColumns:that.columnOptions[that.viewType]
});
}, CompaniesListView.prototype.changePaymentType = function(e) {
var button, that, type;
return that = this, e.preventDefault(), button = $(e.currentTarget), type = this.companies.getType(), 
type !== button.data("payment-type") ? (this.companies.setType(button.data("payment-type")), 
this.dataTable.fnClearTable(), this.companies.fetch({
success:function() {
return that.render();
}
})) :void 0;
}, CompaniesListView.prototype.changeDuration = function(e) {
var button, duration, that;
return that = this, e.preventDefault(), button = $(e.currentTarget), duration = this.companies.getDuration(), 
duration !== button.data("duration") ? (this.companies.setDuration(button.data("duration")), 
this.dataTable.fnClearTable(), this.companies.fetch({
success:function() {
return that.render();
}
})) :void 0;
}, CompaniesListView.prototype.changeViewType = function(e) {
var button;
return e.preventDefault(), button = $(e.currentTarget), this.viewType !== button.data("view-type") ? (this.dataTable.fnClearTable(), 
this.viewType = button.data("view-type"), this.render()) :void 0;
}, CompaniesListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CompaniesListview = CompaniesListView;
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
var DefaultAnalyticsView, HR, _ref;
return DefaultAnalyticsView = function(_super) {
function DefaultAnalyticsView() {
return DefaultAnalyticsView.__super__.constructor.apply(this, arguments);
}
return __extends(DefaultAnalyticsView, _super), DefaultAnalyticsView.prototype.template = "x-analytics/default-home", 
DefaultAnalyticsView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this), $(this.el).html(content), 
this;
}, DefaultAnalyticsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.DefaultAnalyticsView = DefaultAnalyticsView;
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
var HR, TrialSignupsDataView, _ref;
return TrialSignupsDataView = function(_super) {
function TrialSignupsDataView() {
return TrialSignupsDataView.__super__.constructor.apply(this, arguments);
}
return __extends(TrialSignupsDataView, _super), TrialSignupsDataView.prototype.template = "x-analytics/trial-signups-data", 
TrialSignupsDataView.prototype.data = [], TrialSignupsDataView.prototype.fromTime = "", 
TrialSignupsDataView.prototype.toTime = "", TrialSignupsDataView.prototype.initialize = function(options) {
null == options && (options = {});
}, TrialSignupsDataView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
data:this.data,
fromTime:this.fromTime,
toTime:this.toTime
}), $(this.el).html(content), setTimeout(function() {
return that.initDataTable();
}), this;
}, TrialSignupsDataView.prototype.initDataTable = function() {
return this.dataTable = $(".trial-data-table").dataTable({
sDom:"<'row-fluid'<'span6'T><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
bPaginate:!0,
sPaginationType:"bootstrap",
iDisplayLength:50,
bDestroy:!0
});
}, TrialSignupsDataView.prototype.fetchData = function(dataPoint, aggregationFrame) {
var params, that;
return that = this, params = {
aggregation_frame:aggregationFrame,
date_object_string:dataPoint
}, $.ajax({
url:"/xrest/analytics/companies/trial_signups_data",
type:"GET",
data:params,
success:function(response) {
return that.data = response.data, that.fromTime = response.from_time, that.toTime = response.to_time, 
that.render(), setTimeout(function() {
return $("#control-overflow").animate({
scrollTop:520
}, 300);
});
}
});
}, TrialSignupsDataView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TrialSignupsDataView = TrialSignupsDataView;
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
var HR, TrialSignupsView, _ref;
return TrialSignupsView = function(_super) {
function TrialSignupsView() {
return TrialSignupsView.__super__.constructor.apply(this, arguments);
}
return __extends(TrialSignupsView, _super), TrialSignupsView.prototype.template = "x-analytics/trial-signups", 
TrialSignupsView.prototype.aggregation_frame = "day", TrialSignupsView.prototype.data = [], 
TrialSignupsView.prototype.startDate = moment().subtract("month", 1).format("YYYY/MM/DD"), 
TrialSignupsView.prototype.endDate = moment().format("YYYY/MM/DD"), TrialSignupsView.prototype.subviews = [], 
TrialSignupsView.prototype.events = {
"change #aggregation-select":"changeAggregation"
}, TrialSignupsView.prototype.initialize = function() {
return this.fetchData();
}, TrialSignupsView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
aggregation_frame:this.aggregation_frame,
startDate:this.startDate,
endDate:this.endDate
}), $(this.el).html(content), that.data.length && setTimeout(function() {
return that.initDateRangeSelect(), that.initGraph(), that.initDataView();
}), this;
}, TrialSignupsView.prototype.initDateRangeSelect = function() {
var last_month_end, last_month_start, last_week_end, last_week_start, that;
return that = this, last_month_start = moment().subtract("month", 1).startOf("month"), 
last_week_start = moment().subtract("week", 1).startOf("week"), last_month_end = moment().subtract("month", 1).endOf("month"), 
last_week_end = moment().subtract("week", 1).endOf("week"), $("input#date-range-select").daterangepicker({
format:"YYYY-MM-DD",
ranges:{
"Last 30 Days":[ moment().subtract("days", 29), moment() ],
"Last Month":[ last_month_start, last_month_end ],
"Last Week":[ last_week_start, last_week_end ]
},
startDate:that.startDate,
endDate:that.endDate
}, function(start, end) {
return that.startDate = start.format("YYYY/MM/DD"), that.endDate = end.format("YYYY/MM/DD"), 
that.fetchData(), $("input#date-range-select").val(that.startDate + " - " + that.endDate);
});
}, TrialSignupsView.prototype.initDataView = function() {
return this.dataView = new HR.TrialSignupsDataView(), this.subviews.push(this.dataView), 
this.$("#trial-signups-data").html(this.dataView.render().el);
}, TrialSignupsView.prototype.initGraph = function() {
var categories, results, that, tickInterval;
return that = this, categories = _.map(that.data, function(elem) {
return elem.date;
}), results = _.map(that.data, function(elem) {
return elem.count;
}), tickInterval = Math.ceil(categories.length / 9), $("#graph-signups").highcharts({
chart:{
type:"line",
spacingTop:40,
zoomType:"x"
},
title:{
text:"Company Trial Signups",
margin:20,
floating:!1
},
backgroundColor:null,
height:250,
xAxis:{
categories:categories,
tickInterval:tickInterval,
offset:0,
showFirstLabel:!0,
showLastLabel:!0,
title:{
text:"Time"
}
},
yAxis:{
min:-1,
title:{
text:"#Signups"
}
},
series:[ {
name:"Signups",
data:results,
type:"line"
} ],
legend:{
enabled:!1
},
credits:{
enabled:!1
},
plotOptions:{
series:{
cursor:"pointer",
point:{
events:{
click:function() {
var date;
return date = this.category, that.dataView.fetchData(date, that.aggregation_frame);
}
}
}
}
}
});
}, TrialSignupsView.prototype.changeAggregation = function(e) {
var currentTarget;
return currentTarget = $(e.currentTarget), this.aggregation_frame = currentTarget.val(), 
this.fetchData();
}, TrialSignupsView.prototype.fetchData = function() {
var params, that;
return that = this, params = {
aggregation_frame:that.aggregation_frame,
date_range:that.startDate + "-" + that.endDate
}, $.ajax({
url:"/xrest/analytics/companies/trial_signups",
type:"GET",
data:params,
success:function(response) {
return that.data = response, that.render();
}
});
}, TrialSignupsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TrialSignupsView = TrialSignupsView;
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
var DashboardCompanyModel, HR, _ref;
return DashboardCompanyModel = function(_super) {
function DashboardCompanyModel() {
return DashboardCompanyModel.__super__.constructor.apply(this, arguments);
}
return __extends(DashboardCompanyModel, _super), DashboardCompanyModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.DashboardCompanyModel = DashboardCompanyModel;
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
var DashboardCompaniesCollection, HR, _ref;
return DashboardCompaniesCollection = function(_super) {
function DashboardCompaniesCollection() {
return DashboardCompaniesCollection.__super__.constructor.apply(this, arguments);
}
return __extends(DashboardCompaniesCollection, _super), DashboardCompaniesCollection.prototype.customer_type = "paid", 
DashboardCompaniesCollection.prototype.duration = "daily", DashboardCompaniesCollection.prototype.url = function() {
return "/xrest/analytics/companies?type=" + this.customer_type + "&duration=" + this.duration;
}, DashboardCompaniesCollection.prototype.setType = function(type) {
return this.customer_type = type;
}, DashboardCompaniesCollection.prototype.getType = function() {
return this.customer_type;
}, DashboardCompaniesCollection.prototype.setDuration = function(duration) {
return this.duration = duration;
}, DashboardCompaniesCollection.prototype.getDuration = function() {
return this.duration;
}, DashboardCompaniesCollection.prototype.model = window.HR.DashboardCompanyModel, 
DashboardCompaniesCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.DashboardCompaniesCollection = DashboardCompaniesCollection;
});
}.call(this), function() {}.call(this);