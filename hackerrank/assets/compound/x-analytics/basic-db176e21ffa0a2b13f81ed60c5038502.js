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
HR.namespace(this.contest_slug, rest);
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
for (this.sync_status = !0, set_data_fields = [ "total", "page", "activities", "round_data", "available", "ongoing_count", "slug_title", "errors", "current_hacker", "contest" ], 
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
CompaniesListView.prototype.dataType = "figures", CompaniesListView.prototype.initialize = function(options) {
return null == options && (options = {}), this.companies = options.collection;
}, CompaniesListView.prototype.events = {
"click a.payment-type-change":"changePaymentType",
"click a.duration-change":"changeDuration",
"click a.data-type-change":"changeDataType"
}, CompaniesListView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
companies:this.companies.toJSON(),
dataType:this.dataType,
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
bDestroy:!0
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
}, CompaniesListView.prototype.changeDataType = function(e) {
var button;
return e.preventDefault(), button = $(e.currentTarget), this.dataType !== button.data("data-type") ? (this.dataTable.fnClearTable(), 
this.dataType = button.data("data-type"), this.render()) :void 0;
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