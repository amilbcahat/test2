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
}, GenericModel.prototype.destroy = function(options) {
return void 0 === this.disableThrobber || this.disableThrobber !== !0 ? HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("Loading...", !1, !0, 1e3) :this.disableThrobber = !1, 
GenericModel.__super__.destroy.call(this, options);
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
"number" == typeof resp.total && (this.total = resp.total), "number" == typeof resp.page && (this.page = resp.page), 
void 0 === this.disableThrobber || this.disableThrobber !== !0 ? (HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("", !1, !0, 0), 
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
var GenericCompanyDashboardSecondaryView, HR, _ref;
return GenericCompanyDashboardSecondaryView = function(_super) {
function GenericCompanyDashboardSecondaryView() {
return GenericCompanyDashboardSecondaryView.__super__.constructor.apply(this, arguments);
}
return __extends(GenericCompanyDashboardSecondaryView, _super), GenericCompanyDashboardSecondaryView.prototype.subViewClasses = {}, 
GenericCompanyDashboardSecondaryView.prototype.events = {
"click a.graph-type-change":"changeGraphType"
}, GenericCompanyDashboardSecondaryView.prototype.initialize = function(options) {
var that;
return that = this, this.setupSubViewClasses(), this.company = options.model, this.parent = options.parent;
}, GenericCompanyDashboardSecondaryView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
graphType:this.graphType
}), $(this.el).html(content), setTimeout(function() {
return that.setSubView();
}), this;
}, GenericCompanyDashboardSecondaryView.prototype.changeGraphType = function(e) {
var currentTarget, newGraphType;
return e.preventDefault(), currentTarget = $(e.currentTarget), newGraphType = currentTarget.data("graph-type"), 
this.graphType !== newGraphType ? (this.graphType = newGraphType, this.render()) :void 0;
}, GenericCompanyDashboardSecondaryView.prototype.setSubView = function() {
var subView;
return subView = new this.subViewClasses[this.graphType]({
model:this.company,
parent:this
}), $("#data-sub-section-container").html(subView.el);
}, GenericCompanyDashboardSecondaryView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.GenericCompanyDashboardSecondaryView = GenericCompanyDashboardSecondaryView;
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
var GenericCompanyLineDataView, HR, _ref;
return GenericCompanyLineDataView = function(_super) {
function GenericCompanyLineDataView() {
return GenericCompanyLineDataView.__super__.constructor.apply(this, arguments);
}
return __extends(GenericCompanyLineDataView, _super), GenericCompanyLineDataView.prototype.template = "x-analytics/common-company-line-data-view", 
GenericCompanyLineDataView.prototype.initialize = function(options) {
return null == options && (options = {}), this.company = options.model, this.company.setAction(this.dataAction), 
this.dataPoint = options.dataPoint, this.series = options.series, this.graphType = options.graphType, 
this.aggregationFrame = options.aggregationFrame;
}, GenericCompanyLineDataView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
data:this.company.toJSON()[this.dataAction],
tableHeader:this.tableHeader
}), $(this.el).html(content), setTimeout(function() {
return that.initDataTable();
}), this;
}, GenericCompanyLineDataView.prototype.initDataTable = function() {
return this.dataTable = $(".line-graph-data-table").dataTable({
sDom:"<'row-fluid'<'span6'T><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
bPaginate:!0,
sPaginationType:"bootstrap",
iDisplayLength:50,
bDestroy:!0
});
}, GenericCompanyLineDataView.prototype.fetchData = function() {
var params, that;
return that = this, params = {
aggregation_frame:this.aggregationFrame,
date_object_string:this.dataPoint,
graph_type:this.graphType,
series:this.series
}, this.company.fetch({
data:params,
success:function() {
return that.render(), setTimeout(function() {
return $("#control-overflow").animate({
scrollTop:1500
}, 300);
});
}
});
}, GenericCompanyLineDataView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.GenericCompanyLineDataView = GenericCompanyLineDataView;
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
var GenericCompanyLineGraphView, HR, _ref;
return GenericCompanyLineGraphView = function(_super) {
function GenericCompanyLineGraphView() {
return GenericCompanyLineGraphView.__super__.constructor.apply(this, arguments);
}
return __extends(GenericCompanyLineGraphView, _super), GenericCompanyLineGraphView.prototype.aggregationFrame = "day", 
GenericCompanyLineGraphView.prototype.template = "x-analytics/company-common-line-graph", 
GenericCompanyLineGraphView.prototype.initialize = function(options) {
return this.company = options.model, this.company.get("created_at") ? this.startDate = moment(this.company.get("created_at")).format("YYYY/MM/DD") :(this.startDate = moment().subtract("days", 30).startOf("day").format("YYYY/MM/DD"), 
this.aggregationFrame = "day"), this.endDate = moment().format("YYYY/MM/DD"), this.parent = options.parent, 
this.fetchData();
}, GenericCompanyLineGraphView.prototype.events = {
"change #aggregation-select":"changeAggregation"
}, GenericCompanyLineGraphView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
startDate:this.startDate,
endDate:this.endDate,
aggregation_frame:this.aggregationFrame
}), $(this.el).html(content), setTimeout(function() {
return that.initGraph(), that.initDateRange();
}), this;
}, GenericCompanyLineGraphView.prototype.initDateRange = function() {
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
}, GenericCompanyLineGraphView.prototype.fetchData = function() {
var params, that;
return that = this, this.company.setAction(this.companyAction), params = {
aggregation_frame:this.aggregationFrame,
date_range:this.startDate + "-" + this.endDate,
graph_type:this.graphType
}, this.company.fetch({
data:params,
success:function() {
return that.render();
}
});
}, GenericCompanyLineGraphView.prototype.changeAggregation = function(e) {
var currentTarget;
return currentTarget = $(e.currentTarget), this.aggregationFrame = currentTarget.val(), 
this.fetchData();
}, GenericCompanyLineGraphView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.GenericCompanyLineGraphView = GenericCompanyLineGraphView;
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
AnalyticsNavigationView.prototype.className = "analytics-navigation", AnalyticsNavigationView;
}(window.HR.CommonSidebarNavigationView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.AnalyticsNavigationView = AnalyticsNavigationView;
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
var CommonSignupsDataView, HR, _ref;
return CommonSignupsDataView = function(_super) {
function CommonSignupsDataView() {
return CommonSignupsDataView.__super__.constructor.apply(this, arguments);
}
return __extends(CommonSignupsDataView, _super), CommonSignupsDataView.prototype.data = [], 
CommonSignupsDataView.prototype.fromTime = "", CommonSignupsDataView.prototype.toTime = "", 
CommonSignupsDataView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
data:this.data,
fromTime:this.fromTime,
toTime:this.toTime
}), $(this.el).html(content), setTimeout(function() {
return that.initDataTable();
}), this;
}, CommonSignupsDataView.prototype.initDataTable = function() {
return this.dataTable = $(".trial-data-table").dataTable({
sDom:"<'row-fluid'<'span6'T><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
bPaginate:!0,
sPaginationType:"bootstrap",
iDisplayLength:50,
bDestroy:!0
});
}, CommonSignupsDataView.prototype.fetchData = function(dataPoint, aggregationFrame) {
var params, that;
return that = this, params = {
aggregation_frame:aggregationFrame,
date_object_string:dataPoint
}, $.ajax({
url:this.dataUrl,
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
}, CommonSignupsDataView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CommonSignupsDataView = CommonSignupsDataView;
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
var CommonSignupsView, HR, _ref;
return CommonSignupsView = function(_super) {
function CommonSignupsView() {
return CommonSignupsView.__super__.constructor.apply(this, arguments);
}
return __extends(CommonSignupsView, _super), CommonSignupsView.prototype.aggregation_frame = "day", 
CommonSignupsView.prototype.data = [], CommonSignupsView.prototype.startDate = moment().subtract("month", 1).format("YYYY/MM/DD"), 
CommonSignupsView.prototype.endDate = moment().format("YYYY/MM/DD"), CommonSignupsView.prototype.subviews = [], 
CommonSignupsView.prototype.events = {
"change #aggregation-select":"changeAggregation",
"click .x-admin-sticky-note .hide-note":"hideNote"
}, CommonSignupsView.prototype.initialize = function() {
var _ref;
return this.noteHidden = null != (_ref = HR.AnalyticsLocalStorage.get("trial_signups_note_hide")) ? _ref :!1, 
this.fetchData();
}, CommonSignupsView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
aggregation_frame:this.aggregation_frame,
startDate:this.startDate,
endDate:this.endDate,
noteHidden:this.noteHidden
}), $(this.el).html(content), that.data.length && setTimeout(function() {
return that.initDateRangeSelect(), that.initGraph(), that.initDataView();
}), this;
}, CommonSignupsView.prototype.initDateRangeSelect = function() {
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
}, CommonSignupsView.prototype.initGraph = function() {
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
text:that.graphTitle,
margin:20,
floating:!1
},
backgroundColor:null,
height:250,
xAxis:{
categories:categories,
tickInterval:tickInterval,
offset:0,
startOnTick:!0,
endOnTick:!0,
showFirstLabel:!0,
showLastLabel:!0,
title:{
text:"Time"
}
},
yAxis:{
gridLineColor:"#E0E0E0",
allowDecimals:!1,
min:0,
tickLength:7,
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
}, CommonSignupsView.prototype.changeAggregation = function(e) {
var currentTarget;
return currentTarget = $(e.currentTarget), this.aggregation_frame = currentTarget.val(), 
this.fetchData();
}, CommonSignupsView.prototype.fetchData = function() {
var params, that;
return that = this, params = {
aggregation_frame:that.aggregation_frame,
date_range:that.startDate + "-" + that.endDate
}, $.ajax({
url:"/x/api/v1/analytics/users/signups",
type:"GET",
data:params,
success:function(response) {
return that.data = response, that.render();
}
});
}, CommonSignupsView.prototype.hideNote = function(e) {
return e.preventDefault();
}, CommonSignupsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CommonSignupsView = CommonSignupsView;
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
var CommonWatchlistView, HR, _ref;
return CommonWatchlistView = function(_super) {
function CommonWatchlistView() {
return CommonWatchlistView.__super__.constructor.apply(this, arguments);
}
return __extends(CommonWatchlistView, _super), CommonWatchlistView.prototype.searchBy = "id", 
CommonWatchlistView.prototype.searchBySelected = !1, CommonWatchlistView.prototype.events = {
"click a.delete-item":"removeFromWatchList",
"change .search-radio-grp input":"syncSearchBy"
}, CommonWatchlistView.prototype.initialize = function(options) {
return null == options && (options = {}), this.list = options.collection, this.listenTo(this.list, "add", this.render);
}, CommonWatchlistView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
list:this.list.toJSON(),
searchBy:this.searchBy
}), $(this.el).html(content), setTimeout(function() {
return that.initUserSelect2(), that.initWatchlistDataTable();
}), this;
}, CommonWatchlistView.prototype.syncSearchBy = function() {
return this.searchBy = $(".search-radio-grp input:checked").val(), this.searchBySelected = !0;
}, CommonWatchlistView.prototype.initWatchlistDataTable = function() {
var that;
return that = this, this.dataTable = $(".watchlist-table").dataTable({
sDom:"<'row-fluid'<'span6'T><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
bPaginate:!0,
sPaginationType:"bootstrap",
iDisplayLength:50,
bDestroy:!0,
aaSorting:[ [ 0, "asc" ] ]
});
}, CommonWatchlistView.prototype.removeFromWatchList = function(e) {
var currentTarget, id, model, that;
return that = this, e.preventDefault(), currentTarget = $(e.currentTarget), id = currentTarget.data("item-id"), 
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
}, CommonWatchlistView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CommonWatchlistView = CommonWatchlistView;
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
var CompaniesDashboardView, HR, _ref;
return CompaniesDashboardView = function(_super) {
function CompaniesDashboardView() {
return CompaniesDashboardView.__super__.constructor.apply(this, arguments);
}
return __extends(CompaniesDashboardView, _super), CompaniesDashboardView.prototype.template = "x-analytics/companies-dashboard", 
CompaniesDashboardView.prototype.localStorageKey = "companies_table_type", CompaniesDashboardView.prototype.viewType = "dataUsage", 
CompaniesDashboardView.prototype.startDate = moment().subtract("month", 1).format("YYYY/MM/DD"), 
CompaniesDashboardView.prototype.endDate = moment().format("YYYY/MM/DD"), CompaniesDashboardView.prototype.companyType = "all", 
CompaniesDashboardView.prototype.duration = "daily", CompaniesDashboardView.prototype.noSort = {
compact:{
licenseUsage:[ 2, 4, 6, 8, 10 ],
dataUsage:[ 2, 4, 6, 8 ]
},
full:{
licenseUsage:[ 6, 8, 10, 12, 14, 16 ],
dataUsage:[ 6, 8, 10, 12, 14 ]
}
}, CompaniesDashboardView.prototype.initialize = function(options) {
return null == options && (options = {}), this.companies = options.collection, this.setTableTypeFromLocal();
}, CompaniesDashboardView.prototype.events = {
"change select#payment-type-change":"changePaymentType",
"change select#duration-change":"changeDuration",
"change select#view-type-change":"changeViewType",
"click a#toggle-table-type":"toggleTableType"
}, CompaniesDashboardView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
viewType:this.viewType,
duration:this.duration,
companyType:this.companyType,
startDate:this.startDate,
endDate:this.endDate,
tableType:this.tableType
}), $(this.el).html(content), setTimeout(function() {
return that.initDateRangeSelect(), "compact" === that.tableType && HR.appView.closeSidebar(), 
that.initDataTable();
}, 100), this;
}, CompaniesDashboardView.prototype.initDataTable = function() {
var that;
return that = this, HR.util.admin.initDataTablePercentSort(), this.dataTable = $(".dash-table").dataTable({
sDom:"<'row-fluid'<'span6'T><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
oLanguage:{
sEmptyTable:"No Customers found matching these parameters",
sInfoEmpty:"No Customers found matching these parameters",
sZeroRecords:"No Customers found matching these parameters"
},
bPaginate:!0,
sPaginationType:"bootstrap",
iDisplayLength:50,
bServerSide:!0,
bDestroy:!0,
aaSorting:[ [ 1, "asc" ] ],
aoColumnDefs:[ {
bSortable:!1,
aTargets:this.noSort[this.tableType][this.viewType]
} ],
sAjaxSource:"/xrest/analytics/companies?type=" + that.companyType + "&duration=" + that.duration + "&date_range=" + that.dateRange + "&table_type=" + that.tableType + "&view_type=" + that.viewType,
fnServerData:function(sSource, aoData, fnCallback) {
return HR.util.ajaxmsg("Loading Customers Data..", !0, !1, 10), $.getJSON(sSource, aoData, function(json) {
return _.isFunction(that.afterRequest) && (json = that.afterRequest(json)), that.data = json, 
fnCallback(json);
});
},
fnRowCallback:function(row, data) {
return $(row).data("company-id", data[0]);
}
}), this.searchText && this.dataTable.fnFilter(this.searchText), this.dataTable.removeClass("hidden"), 
$(".dash-table tbody tr").live("click", function(e) {
var id;
return id = $(e.currentTarget).data("company-id"), HR.router.navigate("analytics/companies/" + id, !0);
});
}, CompaniesDashboardView.prototype.afterRequest = function(data) {
var result;
return HR.util.ajaxmsg("Done.", !1, !0, .5), result = {
aaData:[],
iTotalDisplayRecords:0,
iTotalRecords:0,
models:[]
}, _.isObject(data) && _.isArray(data.models) && (result.iTotalDisplayRecords = data.total, 
result.iTotalRecords = data.total, result.aaData = _.map(data.models, function(_this) {
return function(row, ix) {
return _this.mapColumns(row, ix);
};
}(this))), result;
}, CompaniesDashboardView.prototype.mapColumns = function(row) {
var ret;
return ret = [], "full" === this.tableType && ret.push(row.id), ret.push(row.name), 
"full" === this.tableType && (ret.push(row.email), ret.push(row.plan), ret.push(row.country)), 
"dataUsage" === this.viewType && (ret.push(row.tests_count), ret.push(row.tests_diff), 
ret.push(row.invites_count), ret.push(row.invites_diff), ret.push(row.attempts_count), 
ret.push(row.attempts_diff), ret.push(row.interviews_count), ret.push(row.interviews_diff)), 
"licenseUsage" === this.viewType && (ret.push(row.teams_count), ret.push(row.teams_diff), 
ret.push(row.admins_count), ret.push(row.admins_diff), ret.push(row.recruiters_count), 
ret.push(row.recruiters_diff), ret.push(row.developers_count), ret.push(row.developers_diff), 
ret.push(row.users_count), ret.push(row.users_diff)), "full" === this.tableType && (ret.push(row.created_at), 
ret.push(row.score_text)), ret;
}, CompaniesDashboardView.prototype.setTableTypeFromLocal = function() {
var tableType;
return tableType = HR.AnalyticsLocalStorage.get(this.localStorageKey), this.tableType = tableType ? tableType :"full";
}, CompaniesDashboardView.prototype.toggleTableType = function(e) {
return e.preventDefault(), "full" === this.tableType ? (this.tableType = "compact", 
HR.appView.closeSidebar()) :this.tableType = "full", HR.AnalyticsLocalStorage.set(this.localStorageKey, this.tableType), 
this.render();
}, CompaniesDashboardView.prototype.changePaymentType = function(e) {
var button, that, type;
return that = this, button = $(e.currentTarget), type = this.companyType, type !== button.val() ? (this.companyType = button.val(), 
this.searchText = $(".dataTables_filter input").val(), that.render()) :void 0;
}, CompaniesDashboardView.prototype.changeDuration = function(e) {
var button, duration, that;
return that = this, button = $(e.currentTarget), duration = this.duration, duration !== button.val() ? "custom" === button.val() ? this.customDuration() :(this.duration = button.val(), 
this.searchText = $(".dataTables_filter input").val(), that.render()) :void 0;
}, CompaniesDashboardView.prototype.initDateRangeSelect = function() {
var last_month_end, last_month_start, last_week_end, last_week_start, that;
return that = this, last_month_start = moment().subtract("month", 1).startOf("month"), 
last_week_start = moment().subtract("week", 1).startOf("week"), last_month_end = moment().subtract("month", 1).endOf("month"), 
last_week_end = moment().subtract("week", 1).endOf("week"), $("input#date-range-select").daterangepicker({
format:"YYYY-MM-DD",
ranges:{
"Last Month":[ last_month_start, last_month_end ],
"Last Week":[ last_week_start, last_week_end ]
},
startDate:that.startDate,
endDate:that.endDate
}, function(start, end) {
return that.startDate = start.format("YYYY/MM/DD"), that.endDate = end.format("YYYY/MM/DD"), 
that.fetchCustomData(), $("input#date-range-select").val(that.startDate + " - " + that.endDate);
});
}, CompaniesDashboardView.prototype.customDuration = function() {
return this.duration = "custom", this.fetchCustomData();
}, CompaniesDashboardView.prototype.fetchCustomData = function() {
var that;
return that = this, this.searchText = $(".dataTables_filter input").val(), this.dateRange = this.startDate + "-" + this.endDate, 
that.render();
}, CompaniesDashboardView.prototype.changeViewType = function(e) {
var button;
return button = $(e.currentTarget), this.viewType !== button.val() ? (this.searchText = $(".dataTables_filter input").val(), 
this.viewType = button.val(), this.render()) :void 0;
}, CompaniesDashboardView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CompaniesDashboardView = CompaniesDashboardView;
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
var CompanyAttemptsTimeDataView, HR, _ref;
return CompanyAttemptsTimeDataView = function(_super) {
function CompanyAttemptsTimeDataView() {
return CompanyAttemptsTimeDataView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyAttemptsTimeDataView, _super), CompanyAttemptsTimeDataView.prototype.dataAction = "data_usage_table", 
CompanyAttemptsTimeDataView.prototype.tableHeader = "Attempts Data", CompanyAttemptsTimeDataView;
}(window.HR.GenericCompanyLineDataView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.CompanyAttemptsTimeDataView = CompanyAttemptsTimeDataView;
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
var CompanyAttemptsTimeGraphView, HR, _ref;
return CompanyAttemptsTimeGraphView = function(_super) {
function CompanyAttemptsTimeGraphView() {
return CompanyAttemptsTimeGraphView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyAttemptsTimeGraphView, _super), CompanyAttemptsTimeGraphView.prototype.graphType = "attempts_time", 
CompanyAttemptsTimeGraphView.prototype.companyAction = "data_usage", CompanyAttemptsTimeGraphView.prototype.aggregationFrame = "month", 
CompanyAttemptsTimeGraphView.prototype.dataViewObject = function(params) {
return new HR.CompanyAttemptsTimeDataView(params);
}, CompanyAttemptsTimeGraphView.prototype.initGraph = function() {
var categories, data, params, results, that, tickInterval;
return that = this, data = this.company.get("data_usage").attempts_time, categories = _.map(data, function(elem) {
return elem.date;
}), results = _.map(data, function(elem) {
return elem.count;
}), tickInterval = Math.ceil(categories.length / 9), params = {
type:"line",
text:"# Attempts vs Time Graph",
categories:categories,
tickInterval:tickInterval,
xTitle:"Time",
yTitle:"# Tests Attempted",
results:results,
seriesName:"Attempts",
plotClick:function() {
var dataView;
return dataView = that.dataViewObject({
graphType:that.graphType,
aggregationFrame:that.aggregationFrame,
model:that.company,
dataAction:that.companyAction,
dataPoint:this.category,
series:this.series.name,
parent:that
}), dataView.fetchData(), $(".graph-data-view-container").html(dataView.el);
}
}, this.$(".graph-container").highcharts(HR.util.admin.highChartOptions(params));
}, CompanyAttemptsTimeGraphView;
}(window.HR.GenericCompanyLineGraphView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.CompanyAttemptsTimeGraphView = CompanyAttemptsTimeGraphView;
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
var CompanyBasicDataView, HR, _ref;
return CompanyBasicDataView = function(_super) {
function CompanyBasicDataView() {
return CompanyBasicDataView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyBasicDataView, _super), CompanyBasicDataView.prototype.template = "x-analytics/company-basic-data", 
CompanyBasicDataView.prototype.initialize = function(options) {
var that;
return null == options && (options = {}), that = this, this.parent = options.parent, 
this.company = options.model, this.company.setAction("basic"), this.company.fetch({
success:function() {
return that.render();
}
});
}, CompanyBasicDataView.prototype._render = function() {
var content;
return this.company.get("basic") && (content = HR.appController.template(this.template, this)({
company:this.company.toJSON()
}), $(this.el).html(content)), this;
}, CompanyBasicDataView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CompanyBasicDataView = CompanyBasicDataView;
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
var CompanyDashboardView, HR, _ref;
return CompanyDashboardView = function(_super) {
function CompanyDashboardView() {
return CompanyDashboardView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyDashboardView, _super), CompanyDashboardView.prototype.template = "x-analytics/company-dashboard", 
CompanyDashboardView.prototype.searchBy = "id", CompanyDashboardView.prototype.searchBySelected = !1, 
CompanyDashboardView.prototype.subViewType = "basic", CompanyDashboardView.prototype.companyFields = {
id:"id",
name:"name",
email:"email"
}, CompanyDashboardView.prototype.subViews = {}, CompanyDashboardView.prototype.rendered = !1, 
CompanyDashboardView.prototype.initialize = function(options) {
return null == options && (options = {}), this.model = options.model ? options.model :new HR.DashboardCompanyModel(), 
this.populateSubViews();
}, CompanyDashboardView.prototype.events = {
"change .search-radio-grp input":"syncSearchBy",
"click a.change-view-type":"changeViewType"
}, CompanyDashboardView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
company:this.model.toJSON(),
searchBy:this.searchBy,
subViewType:this.subViewType
}), $(this.el).html(content), setTimeout(function() {
return that.initSelect2();
}), this;
}, CompanyDashboardView.prototype.syncSearchBy = function() {
return this.searchBy = $(".search-radio-grp input:checked").val(), this.searchBySelected = !0;
}, CompanyDashboardView.prototype.initSelect2 = function() {
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
return that.model = new HR.DashboardCompanyModel(), that.model.set("id", e.val), 
that.fetchCompany();
}), this.model.get("name") && this.model.get("id") ? (this.selectBox.select2("data", {
id:this.model.get("id"),
primary:this.model.get("name")
}), that.renderSubView(), that.showSubViewOptions()) :void 0;
}, CompanyDashboardView.prototype.fetchCompany = function(options) {
var that;
return null == options && (options = {}), that = this, this.model.fetch({
success:function() {
return $("#sub-view-container").html(""), that.renderSubView(), that.showSubViewOptions();
}
});
}, CompanyDashboardView.prototype.populateSubViews = function() {
return this.subViews.basic = HR.CompanyBasicDataView, this.subViews.data = HR.CompanyDataUsageView, 
this.subViews.license = HR.CompanyLicenseUsageView;
}, CompanyDashboardView.prototype.showSubViewOptions = function() {
return this.$(".subview-header-container").removeClass("hidden");
}, CompanyDashboardView.prototype.renderSubView = function() {
var view;
return view = new this.subViews[this.subViewType]({
model:this.model,
parent:this
}), $("#sub-view-container").html(view.render().el);
}, CompanyDashboardView.prototype.changeViewType = function(e) {
var currentTarget, type;
return e.preventDefault(), this.model.get("id") && (currentTarget = $(e.currentTarget), 
type = currentTarget.data("view-type"), type !== this.subViewType) ? (this.subViewType = type, 
this.render(), this.renderSubView()) :void 0;
}, CompanyDashboardView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CompanyDashboardView = CompanyDashboardView;
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
var CompanyDataUsageView, HR, _ref;
return CompanyDataUsageView = function(_super) {
function CompanyDataUsageView() {
return CompanyDataUsageView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyDataUsageView, _super), CompanyDataUsageView.prototype.template = "x-analytics/company-data-usage", 
CompanyDataUsageView.prototype.graphType = "tests_time", CompanyDataUsageView.prototype.setupSubViewClasses = function() {
return this.subViewClasses.tests_time = HR.CompanyTestsTimeGraphView, this.subViewClasses.invites_time = HR.CompanyInvitesTimeGraphView, 
this.subViewClasses.attempts_time = HR.CompanyAttemptsTimeGraphView, this.subViewClasses.interviews_time = HR.CompanyInterviewsTimeGraphView;
}, CompanyDataUsageView;
}(window.HR.GenericCompanyDashboardSecondaryView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.CompanyDataUsageView = CompanyDataUsageView;
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
var CompanyInterviewsTimeDataView, HR, _ref;
return CompanyInterviewsTimeDataView = function(_super) {
function CompanyInterviewsTimeDataView() {
return CompanyInterviewsTimeDataView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyInterviewsTimeDataView, _super), CompanyInterviewsTimeDataView.prototype.dataAction = "data_usage_table", 
CompanyInterviewsTimeDataView.prototype.tableHeader = "Interviews Data", CompanyInterviewsTimeDataView;
}(window.HR.GenericCompanyLineDataView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.CompanyInterviewsTimeDataView = CompanyInterviewsTimeDataView;
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
var CompanyInterviewsTimeGraphView, HR, _ref;
return CompanyInterviewsTimeGraphView = function(_super) {
function CompanyInterviewsTimeGraphView() {
return CompanyInterviewsTimeGraphView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyInterviewsTimeGraphView, _super), CompanyInterviewsTimeGraphView.prototype.graphType = "interviews_time", 
CompanyInterviewsTimeGraphView.prototype.companyAction = "data_usage", CompanyInterviewsTimeGraphView.prototype.aggregationFrame = "month", 
CompanyInterviewsTimeGraphView.prototype.dataViewObject = function(params) {
return new HR.CompanyInterviewsTimeDataView(params);
}, CompanyInterviewsTimeGraphView.prototype.initGraph = function() {
var categories, data, params, results, that, tickInterval;
return that = this, data = this.company.get("data_usage").interviews_time, categories = _.map(data, function(elem) {
return elem.date;
}), results = _.map(data, function(elem) {
return elem.count;
}), tickInterval = Math.ceil(categories.length / 9), params = {
type:"line",
text:"# Interviews vs Time Graph",
categories:categories,
tickInterval:tickInterval,
xTitle:"Time",
yTitle:"# Interview Created",
results:results,
seriesName:"Interviews",
plotClick:function() {
var dataView;
return dataView = that.dataViewObject({
graphType:that.graphType,
aggregationFrame:that.aggregationFrame,
model:that.company,
dataAction:that.companyAction,
dataPoint:this.category,
series:this.series.name,
parent:that
}), dataView.fetchData(), $(".graph-data-view-container").html(dataView.el);
}
}, this.$(".graph-container").highcharts(HR.util.admin.highChartOptions(params));
}, CompanyInterviewsTimeGraphView;
}(window.HR.GenericCompanyLineGraphView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.CompanyInterviewsTimeGraphView = CompanyInterviewsTimeGraphView;
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
var CompanyInvitesTimeDataView, HR, _ref;
return CompanyInvitesTimeDataView = function(_super) {
function CompanyInvitesTimeDataView() {
return CompanyInvitesTimeDataView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyInvitesTimeDataView, _super), CompanyInvitesTimeDataView.prototype.dataAction = "data_usage_table", 
CompanyInvitesTimeDataView.prototype.tableHeader = "Invites Data", CompanyInvitesTimeDataView;
}(window.HR.GenericCompanyLineDataView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.CompanyInvitesTimeDataView = CompanyInvitesTimeDataView;
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
var CompanyInvitesTimeGraphView, HR, _ref;
return CompanyInvitesTimeGraphView = function(_super) {
function CompanyInvitesTimeGraphView() {
return CompanyInvitesTimeGraphView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyInvitesTimeGraphView, _super), CompanyInvitesTimeGraphView.prototype.graphType = "invites_time", 
CompanyInvitesTimeGraphView.prototype.companyAction = "data_usage", CompanyInvitesTimeGraphView.prototype.aggregationFrame = "month", 
CompanyInvitesTimeGraphView.prototype.dataViewObject = function(params) {
return new HR.CompanyInvitesTimeDataView(params);
}, CompanyInvitesTimeGraphView.prototype.initGraph = function() {
var categories, data, params, results, that, tickInterval;
return that = this, data = this.company.get("data_usage").invites_time, categories = _.map(data, function(elem) {
return elem.date;
}), results = _.map(data, function(elem) {
return elem.count;
}), tickInterval = Math.ceil(categories.length / 9), params = {
type:"line",
text:"Invites vs Time Graph",
categories:categories,
tickInterval:tickInterval,
xTitle:"Time",
yTitle:"# Invites Sent",
results:results,
seriesName:"Invites Sent",
plotClick:function() {
var dataView;
return dataView = that.dataViewObject({
graphType:that.graphType,
aggregationFrame:that.aggregationFrame,
model:that.company,
dataAction:that.companyAction,
dataPoint:this.category,
series:this.series.name,
parent:that
}), dataView.fetchData(), $(".graph-data-view-container").html(dataView.el);
}
}, this.$(".graph-container").highcharts(HR.util.admin.highChartOptions(params));
}, CompanyInvitesTimeGraphView;
}(window.HR.GenericCompanyLineGraphView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.CompanyInvitesTimeGraphView = CompanyInvitesTimeGraphView;
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
var CompanyLicenseUsageView, HR, _ref;
return CompanyLicenseUsageView = function(_super) {
function CompanyLicenseUsageView() {
return CompanyLicenseUsageView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyLicenseUsageView, _super), CompanyLicenseUsageView.prototype.template = "x-analytics/company-license-usage", 
CompanyLicenseUsageView.prototype.graphType = "teams_time", CompanyLicenseUsageView.prototype.subViewClasses = {}, 
CompanyLicenseUsageView.prototype.setupSubViewClasses = function() {
return this.subViewClasses.teams_time = HR.CompanyTeamsTimeGraphView, this.subViewClasses.users_time = HR.CompanyUsersTimeGraphView;
}, CompanyLicenseUsageView;
}(window.HR.GenericCompanyDashboardSecondaryView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.CompanyLicenseUsageView = CompanyLicenseUsageView;
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
var CompanySignupsDataView, HR, _ref;
return CompanySignupsDataView = function(_super) {
function CompanySignupsDataView() {
return CompanySignupsDataView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanySignupsDataView, _super), CompanySignupsDataView.prototype.template = "x-analytics/company-signups-data", 
CompanySignupsDataView.prototype.dataUrl = "/x/api/v1/analytics/companies/trial_signups_data", 
CompanySignupsDataView.prototype.initDataTable = function() {
return CompanySignupsDataView.__super__.initDataTable.apply(this, arguments), $(".trial-data-table tbody tr.company.clickable").live("click", function(e) {
var id;
return id = $(e.currentTarget).data("company-id"), HR.router.navigate("analytics/companies/" + id, !0);
});
}, CompanySignupsDataView;
}(window.HR.CommonSignupsDataView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.CompanySignupsDataView = CompanySignupsDataView;
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
var CompanySignupsView, HR, _ref;
return CompanySignupsView = function(_super) {
function CompanySignupsView() {
return CompanySignupsView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanySignupsView, _super), CompanySignupsView.prototype.template = "x-analytics/company-signups", 
CompanySignupsView.prototype.graphTitle = "Company Trial Signups", CompanySignupsView.prototype.initDataView = function() {
return this.dataView = new HR.CompanySignupsDataView(), this.subviews.push(this.dataView), 
this.$("#signups-data").html(this.dataView.render().el);
}, CompanySignupsView.prototype.fetchData = function() {
var params, that;
return that = this, params = {
aggregation_frame:that.aggregation_frame,
date_range:that.startDate + "-" + that.endDate
}, $.ajax({
url:"/x/api/v1/analytics/companies/trial_signups",
type:"GET",
data:params,
success:function(response) {
return that.data = response, that.render();
}
});
}, CompanySignupsView.prototype.hideNote = function(e) {
var currentTarget, currentUser;
return e.preventDefault(), currentTarget = $(e.currentTarget), currentUser = HR.currentUser, 
HR.AnalyticsLocalStorage.setId(currentUser.get("id")), HR.AnalyticsLocalStorage.set("trial_signups_note_hide", !0), 
currentTarget.parent().parent().slideUp();
}, CompanySignupsView;
}(window.HR.CommonSignupsView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CompanySignupsView = CompanySignupsView;
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
var CompanyTeamsTimeDataView, HR, _ref;
return CompanyTeamsTimeDataView = function(_super) {
function CompanyTeamsTimeDataView() {
return CompanyTeamsTimeDataView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyTeamsTimeDataView, _super), CompanyTeamsTimeDataView.prototype.dataAction = "license_usage_table", 
CompanyTeamsTimeDataView.prototype.tableHeader = "Teams Data", CompanyTeamsTimeDataView;
}(window.HR.GenericCompanyLineDataView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.CompanyTeamsTimeDataView = CompanyTeamsTimeDataView;
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
var CompanyTeamsTimeGraphView, HR, _ref;
return CompanyTeamsTimeGraphView = function(_super) {
function CompanyTeamsTimeGraphView() {
return CompanyTeamsTimeGraphView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyTeamsTimeGraphView, _super), CompanyTeamsTimeGraphView.prototype.graphType = "teams_time", 
CompanyTeamsTimeGraphView.prototype.aggregationFrame = "month", CompanyTeamsTimeGraphView.prototype.companyAction = "license_usage", 
CompanyTeamsTimeGraphView.prototype.dataViewObject = function(params) {
return new HR.CompanyTeamsTimeDataView(params);
}, CompanyTeamsTimeGraphView.prototype.initGraph = function() {
var categories, data, params, results, that, tickInterval;
return that = this, data = this.company.get("license_usage").teams_time, categories = _.map(data, function(elem) {
return elem.date;
}), results = _.map(data, function(elem) {
return elem.count;
}), tickInterval = Math.ceil(categories.length / 9), params = {
type:"line",
text:"#Teams vs Time Graph",
categories:categories,
tickInterval:tickInterval,
xTitle:"Time",
yTitle:"# Teams Created",
results:results,
seriesName:"Teams",
plotClick:function() {
var dataView;
return dataView = that.dataViewObject({
graphType:that.graphType,
aggregationFrame:that.aggregationFrame,
model:that.company,
dataAction:that.companyAction,
dataPoint:this.category,
series:this.series.name,
parent:that
}), dataView.fetchData(), $(".graph-data-view-container").html(dataView.el);
}
}, this.$(".graph-container").highcharts(HR.util.admin.highChartOptions(params));
}, CompanyTeamsTimeGraphView;
}(window.HR.GenericCompanyLineGraphView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.CompanyTeamsTimeGraphView = CompanyTeamsTimeGraphView;
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
var CompanyTestsTimeDataView, HR, _ref;
return CompanyTestsTimeDataView = function(_super) {
function CompanyTestsTimeDataView() {
return CompanyTestsTimeDataView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyTestsTimeDataView, _super), CompanyTestsTimeDataView.prototype.dataAction = "data_usage_table", 
CompanyTestsTimeDataView.prototype.tableHeader = "Tests Data", CompanyTestsTimeDataView;
}(window.HR.GenericCompanyLineDataView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.CompanyTestsTimeDataView = CompanyTestsTimeDataView;
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
var CompanyTestsTimeGraphView, HR, _ref;
return CompanyTestsTimeGraphView = function(_super) {
function CompanyTestsTimeGraphView() {
return CompanyTestsTimeGraphView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyTestsTimeGraphView, _super), CompanyTestsTimeGraphView.prototype.graphType = "tests_time", 
CompanyTestsTimeGraphView.prototype.aggregationFrame = "month", CompanyTestsTimeGraphView.prototype.companyAction = "data_usage", 
CompanyTestsTimeGraphView.prototype.dataViewObject = function(params) {
return new HR.CompanyTestsTimeDataView(params);
}, CompanyTestsTimeGraphView.prototype.initGraph = function() {
var categories, data, params, results, that, tickInterval;
return that = this, data = this.company.get("data_usage").tests_time, categories = _.map(data, function(elem) {
return elem.date;
}), results = _.map(data, function(elem) {
return elem.count;
}), tickInterval = Math.ceil(categories.length / 9), params = {
type:"line",
text:"#Tests vs Time Graph",
categories:categories,
tickInterval:tickInterval,
xTitle:"Time",
yTitle:"# Tests Created",
results:results,
seriesName:"Tests",
plotClick:function() {
var dataView;
return dataView = that.dataViewObject({
graphType:that.graphType,
aggregationFrame:that.aggregationFrame,
model:that.company,
dataAction:that.companyAction,
dataPoint:this.category,
series:this.series.name,
parent:that
}), dataView.fetchData(), $(".graph-data-view-container").html(dataView.el);
}
}, this.$(".graph-container").highcharts(HR.util.admin.highChartOptions(params));
}, CompanyTestsTimeGraphView;
}(window.HR.GenericCompanyLineGraphView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.CompanyTestsTimeGraphView = CompanyTestsTimeGraphView;
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
var CompanyUsersTimeDataView, HR, _ref;
return CompanyUsersTimeDataView = function(_super) {
function CompanyUsersTimeDataView() {
return CompanyUsersTimeDataView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyUsersTimeDataView, _super), CompanyUsersTimeDataView.prototype.dataAction = "license_usage_table", 
CompanyUsersTimeDataView.prototype.tableHeader = "Users Data", CompanyUsersTimeDataView.prototype.setTableHeader = function(header) {
return this.tableHeader = header;
}, CompanyUsersTimeDataView;
}(window.HR.GenericCompanyLineDataView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.CompanyUsersTimeDataView = CompanyUsersTimeDataView;
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
var CompanyUsersTimeGraphView, HR, _ref;
return CompanyUsersTimeGraphView = function(_super) {
function CompanyUsersTimeGraphView() {
return CompanyUsersTimeGraphView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyUsersTimeGraphView, _super), CompanyUsersTimeGraphView.prototype.graphType = "users_time", 
CompanyUsersTimeGraphView.prototype.aggregationFrame = "month", CompanyUsersTimeGraphView.prototype.companyAction = "license_usage", 
CompanyUsersTimeGraphView.prototype.dataViewObject = function(params) {
return new HR.CompanyUsersTimeDataView(params);
}, CompanyUsersTimeGraphView.prototype.initGraph = function() {
var admin_data, admin_results, categories, data, defaultOptions, developer_data, developer_results, options, params, recruiter_data, recruiter_results, that, tickInterval, user_data, user_results;
return that = this, data = this.company.get("license_usage").users_time, user_data = data.user_data, 
admin_data = data.admin_data, developer_data = data.developer_data, recruiter_data = data.recruiter_data, 
categories = _.map(user_data, function(elem) {
return elem.date;
}), user_results = _.map(user_data, function(elem) {
return elem.count;
}), admin_results = _.map(admin_data, function(elem) {
return elem.count;
}), developer_results = _.map(developer_data, function(elem) {
return elem.count;
}), recruiter_results = _.map(recruiter_data, function(elem) {
return elem.count;
}), tickInterval = Math.ceil(categories.length / 9), params = {
type:"line",
text:"Users SignUps vs Time Graph",
categories:categories,
tickInterval:tickInterval,
xTitle:"Time",
yTitle:"# Users Signed up",
plotClick:function() {
var dataView;
return dataView = that.dataViewObject({
graphType:that.graphType,
aggregationFrame:that.aggregationFrame,
model:that.company,
dataAction:that.companyAction,
dataPoint:this.category,
series:this.series.name,
parent:that
}), dataView.setTableHeader("" + this.series.name + " Data"), dataView.fetchData(), 
$(".graph-data-view-container").html(dataView.el);
}
}, defaultOptions = HR.util.admin.highChartOptions(params), options = {
series:[ {
name:"Users",
data:user_results,
type:"line"
}, {
name:"Admins",
data:admin_results,
type:"line"
}, {
name:"Developers",
data:developer_results,
type:"line"
}, {
name:"Recruiters",
data:recruiter_results,
type:"line"
} ],
legend:{
enabled:!0
}
}, options = _.extend(defaultOptions, options), this.$(".graph-container").highcharts(options);
}, CompanyUsersTimeGraphView;
}(window.HR.GenericCompanyLineGraphView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.CompanyUsersTimeGraphView = CompanyUsersTimeGraphView;
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
var CompanyWatchlistView, HR, _ref;
return CompanyWatchlistView = function(_super) {
function CompanyWatchlistView() {
return CompanyWatchlistView.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyWatchlistView, _super), CompanyWatchlistView.prototype.template = "x-analytics/company-watchlist", 
CompanyWatchlistView.prototype.companyFields = {
id:"id",
name:"name",
email:"email"
}, CompanyWatchlistView.prototype.initUserSelect2 = function() {
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
return that.addToWatchList(e.val, that.list);
});
}, CompanyWatchlistView.prototype.addToWatchList = function(companyId, collection) {
var model;
return model = new HR.CompanyWatchlistEntityModel(), model.set("company_id", companyId), 
model.save(null, {
success:function(model) {
return HR.util.ajaxmsg("Company has been added to your watchlist", !1, !1, 3), collection.add(model);
},
error:function(resp) {
return resp = JSON.parse(resp), HR.util.ajaxmsg(resp.message, !1, !1, 3);
}
});
}, CompanyWatchlistView;
}(window.HR.CommonWatchlistView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CompanyWatchlistView = CompanyWatchlistView;
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
var HR, RevenueHealthDataView, _ref;
return RevenueHealthDataView = function(_super) {
function RevenueHealthDataView() {
return RevenueHealthDataView.__super__.constructor.apply(this, arguments);
}
return __extends(RevenueHealthDataView, _super), RevenueHealthDataView.prototype.template = "x-analytics/revenue-health-data", 
RevenueHealthDataView.prototype.initialize = function(options) {
return null == options && (options = {}), this.model = options.model, this.type = options.type, 
this.month = options.month, this.reportType = options.reportType, this.reportDate = options.reportDate;
}, RevenueHealthDataView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
data:this.model.toJSON().table_data[this.month][this.type],
month:this.month,
type:this.type,
reportType:this.reportType,
reportDate:this.reportDate
}), $(this.el).html(content), setTimeout(function() {
return that.initDataTable();
}), this;
}, RevenueHealthDataView.prototype.initDataTable = function() {
return this.dataTable = $(".revenue-table").dataTable({
sDom:"<'row-fluid'<'span6'T><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
bPaginate:!0,
sPaginationType:"bootstrap",
iDisplayLength:50,
bDestroy:!0
});
}, RevenueHealthDataView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.RevenueHealthDataView = RevenueHealthDataView;
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
var HR, RevenueHealthView, _ref;
return RevenueHealthView = function(_super) {
function RevenueHealthView() {
return RevenueHealthView.__super__.constructor.apply(this, arguments);
}
return __extends(RevenueHealthView, _super), RevenueHealthView.prototype.template = "x-analytics/revenue-health", 
RevenueHealthView.prototype.reportType = "current", RevenueHealthView.prototype.reportDate = moment().subtract("day", 1).format("YYYY/MM/DD"), 
RevenueHealthView.prototype.initialize = function(options) {
return null == options && (options = {}), this.model = options.model, this.month = options.month, 
this.listenTo(this.model, "reset", this.render), this.listenTo(this.model, "change", this.render);
}, RevenueHealthView.prototype.events = {
"click a.get-data":"getOpportunitiesData",
"click a.change-month":"fetchAmounts",
"click a.edit-goal":"editGoal",
"click a.change-report-type":"changeReportType",
"submit form[name=goal-form]":"updateGoal"
}, RevenueHealthView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
data:this.model.toJSON().amounts[this.month],
month:this.month,
report_type:this.reportType,
report_date:this.reportDate
}), $(this.el).html(content), setTimeout(function() {
return that.initDateSelect();
}), this;
}, RevenueHealthView.prototype.initDateSelect = function() {
var that;
return that = this, $(".date-pick").datepicker({
autoclose:!0,
format:"yyyy/mm/dd",
startDate:"-61d",
endDate:"-1d"
}), $(".date-pick").bind("change", function(e) {
return that.reportDate = $(e.currentTarget).val(), that.fetchAmounts(e);
});
}, RevenueHealthView.prototype.fetchAmounts = function(e) {
var currentTarget, params, that, _ref;
return that = this, e.preventDefault(), this.model.unset("amounts", {
silent:!0
}), this.model.unset("table_date", {
silent:!0
}), currentTarget = $(e.currentTarget), this.month = null != (_ref = currentTarget.data("month")) ? _ref :this.month, 
params = {
month:this.month
}, "past" === this.reportType && (params.date = this.reportDate), this.model.fetch({
data:params
}), HR.router.navigate("/analytics/revenue/health/" + this.month, !1, !1);
}, RevenueHealthView.prototype.getOpportunitiesData = function(e) {
var currentTarget, params, that, type;
return that = this, e.preventDefault(), currentTarget = $(e.currentTarget), type = currentTarget.data("type"), 
params = {
month:that.month,
type:type
}, "past" === this.reportType && (params.date = this.reportDate), this.model.setDataAction(), 
this.model.fetch({
silent:!0,
data:params,
success:function() {
return that.model.unsetDataAction(), setTimeout(function() {
return that.renderDataView(type);
});
}
});
}, RevenueHealthView.prototype.renderDataView = function(type) {
var view;
return view = new HR.RevenueHealthDataView({
model:this.model,
type:type,
month:this.month,
reportType:this.reportType,
reportDate:this.reportDate
}), this.$("#health-data-section").html(view.render().el);
}, RevenueHealthView.prototype.changeReportType = function(e) {
var currentTarget;
return e.preventDefault(), currentTarget = $(e.currentTarget), this.reportType = currentTarget.data("report-type"), 
this.month = "current", this.fetchAmounts(e);
}, RevenueHealthView.prototype.editGoal = function(e) {
var currentTarget;
return e.preventDefault(), currentTarget = $(e.currentTarget), currentTarget.parent().addClass("hidden"), 
currentTarget.parent().parent().find("form").removeClass("hidden").find("input").focus();
}, RevenueHealthView.prototype.updateGoal = function(e) {
var button, currentTarget, input;
return e.preventDefault(), currentTarget = $(e.currentTarget), button = currentTarget.find("button"), 
input = currentTarget.find("input"), input.removeClass("error"), input.val() ? (HR.util.inlineLoadingStart(button), 
$.ajax({
type:"PUT",
data:{
goal:input.val()
},
url:"/x/api/v1/analytics/revenue/update_goal",
success:function(resp) {
return $(".goal-text").val("$ " + input.val()).removeClass("hidden"), HR.util.inlineLoadingEnd(resp), 
currentTarget.addClass("hidden");
}
})) :(input.addClass("error"), void 0);
}, RevenueHealthView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.RevenueHealthView = RevenueHealthView;
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
var HR, UserSignupsDataView, _ref;
return UserSignupsDataView = function(_super) {
function UserSignupsDataView() {
return UserSignupsDataView.__super__.constructor.apply(this, arguments);
}
return __extends(UserSignupsDataView, _super), UserSignupsDataView.prototype.template = "x-analytics/user-signups-data", 
UserSignupsDataView.prototype.dataUrl = "/x/api/v1/analytics/users/signups_data", 
UserSignupsDataView;
}(window.HR.CommonSignupsDataView), HR = null != (_ref = window.HR) ? _ref :{}, 
HR.UserSignupsDataView = UserSignupsDataView;
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
var HR, UserSignupsView, _ref;
return UserSignupsView = function(_super) {
function UserSignupsView() {
return UserSignupsView.__super__.constructor.apply(this, arguments);
}
return __extends(UserSignupsView, _super), UserSignupsView.prototype.template = "x-analytics/user-signups", 
UserSignupsView.prototype.graphTitle = "User Trial Signups", UserSignupsView.prototype.initDataView = function() {
return this.dataView = new HR.UserSignupsDataView(), this.subviews.push(this.dataView), 
this.$("#signups-data").html(this.dataView.render().el);
}, UserSignupsView.prototype.fetchData = function() {
var params, that;
return that = this, params = {
aggregation_frame:that.aggregation_frame,
date_range:that.startDate + "-" + that.endDate
}, $.ajax({
url:"/x/api/v1/analytics/users/signups",
type:"GET",
data:params,
success:function(response) {
return that.data = response, that.render();
}
});
}, UserSignupsView;
}(window.HR.CommonSignupsView), HR = null != (_ref = window.HR) ? _ref :{}, HR.UserSignupsView = UserSignupsView;
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
var HR, UserWatchlistView, _ref;
return UserWatchlistView = function(_super) {
function UserWatchlistView() {
return UserWatchlistView.__super__.constructor.apply(this, arguments);
}
return __extends(UserWatchlistView, _super), UserWatchlistView.prototype.template = "x-analytics/user-watchlist", 
UserWatchlistView.prototype.userFields = {
id:"id",
name:"firstname,email"
}, UserWatchlistView.prototype.initUserSelect2 = function() {
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
}, options = _.extend(defaultOptions, options), this.selectBox = $("#user-select2"), 
this.selectBox.select2(options), this.selectBox.on("change", function(e) {
return that.addToWatchList(e.val, that.list);
});
}, UserWatchlistView.prototype.addToWatchList = function(userId, collection) {
var model;
return model = new HR.UserWatchlistEntityModel(), model.set("user_id", userId), 
model.save(null, {
success:function(model) {
return HR.util.ajaxmsg("User has been added to your watchlist", !1, !1, 3), collection.add(model);
},
error:function(resp) {
return resp = JSON.parse(resp), HR.util.ajaxmsg(resp.message, !1, !1, 3);
}
});
}, UserWatchlistView;
}(window.HR.CommonWatchlistView), HR = null != (_ref = window.HR) ? _ref :{}, HR.UserWatchlistView = UserWatchlistView;
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
var CompanyWatchlistEntityModel, HR, _ref;
return CompanyWatchlistEntityModel = function(_super) {
function CompanyWatchlistEntityModel() {
return CompanyWatchlistEntityModel.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyWatchlistEntityModel, _super), CompanyWatchlistEntityModel.prototype.url = function() {
return this.id ? "/x/api/v1/analytics/companies/watchlist/" + this.id :"/x/api/v1/analytics/companies/watchlist";
}, CompanyWatchlistEntityModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.CompanyWatchlistEntityModel = CompanyWatchlistEntityModel;
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
return __extends(DashboardCompanyModel, _super), DashboardCompanyModel.prototype.url = function() {
return this.action ? "/x/api/v1/analytics/companies/" + this.id + "/" + this.action :"/x/api/v1/analytics/companies/" + this.id;
}, DashboardCompanyModel.prototype.setAction = function(action) {
return this.action = action;
}, DashboardCompanyModel;
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
var HR, RevenueHealthModel, _ref;
return RevenueHealthModel = function(_super) {
function RevenueHealthModel() {
return RevenueHealthModel.__super__.constructor.apply(this, arguments);
}
return __extends(RevenueHealthModel, _super), RevenueHealthModel.prototype.url = function() {
return this.dataAction ? "/x/api/v1/analytics/revenue/opportunities_data" :"/x/api/v1/analytics/revenue";
}, RevenueHealthModel.prototype.setDataAction = function() {
return this.dataAction = !0;
}, RevenueHealthModel.prototype.unsetDataAction = function() {
return this.dataAction = !1;
}, RevenueHealthModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.RevenueHealthModel = RevenueHealthModel;
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
var HR, UserWatchlistEntityModel, _ref;
return UserWatchlistEntityModel = function(_super) {
function UserWatchlistEntityModel() {
return UserWatchlistEntityModel.__super__.constructor.apply(this, arguments);
}
return __extends(UserWatchlistEntityModel, _super), UserWatchlistEntityModel.prototype.url = function() {
return this.id ? "/x/api/v1/analytics/users/watchlist/" + this.id :"/x/api/v1/analytics/users/watchlist";
}, UserWatchlistEntityModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.UserWatchlistEntityModel = UserWatchlistEntityModel;
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
var CompanyWatchlistCollection, HR, _ref;
return CompanyWatchlistCollection = function(_super) {
function CompanyWatchlistCollection() {
return CompanyWatchlistCollection.__super__.constructor.apply(this, arguments);
}
return __extends(CompanyWatchlistCollection, _super), CompanyWatchlistCollection.prototype.url = function() {
return "/x/api/v1/analytics/companies/watchlist";
}, CompanyWatchlistCollection.prototype.model = window.HR.CompanyWatchlistEntityModel, 
CompanyWatchlistCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.CompanyWatchlistCollection = CompanyWatchlistCollection;
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
return "/x/api/v1/analytics/companies?type=" + this.customer_type + "&duration=" + this.duration + "&date_range=" + this.dateRange;
}, DashboardCompaniesCollection.prototype.setType = function(type) {
return this.customer_type = type;
}, DashboardCompaniesCollection.prototype.getType = function() {
return this.customer_type;
}, DashboardCompaniesCollection.prototype.setDuration = function(duration) {
return this.duration = duration;
}, DashboardCompaniesCollection.prototype.getDuration = function() {
return this.duration;
}, DashboardCompaniesCollection.prototype.setDateRange = function(date_range) {
return this.dateRange = date_range;
}, DashboardCompaniesCollection.prototype.model = window.HR.DashboardCompanyModel, 
DashboardCompaniesCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.DashboardCompaniesCollection = DashboardCompaniesCollection;
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
var HR, UserWatchlistCollection, _ref;
return UserWatchlistCollection = function(_super) {
function UserWatchlistCollection() {
return UserWatchlistCollection.__super__.constructor.apply(this, arguments);
}
return __extends(UserWatchlistCollection, _super), UserWatchlistCollection.prototype.url = function() {
return "/x/api/v1/analytics/users/watchlist";
}, UserWatchlistCollection.prototype.model = window.HR.UserWatchlistEntityModel, 
UserWatchlistCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.UserWatchlistCollection = UserWatchlistCollection;
});
}.call(this), function() {}.call(this);