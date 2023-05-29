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
var AdminNavigationView, HR, _ref;
return AdminNavigationView = function(_super) {
function AdminNavigationView() {
return AdminNavigationView.__super__.constructor.apply(this, arguments);
}
return __extends(AdminNavigationView, _super), AdminNavigationView.prototype.template = "x-admin/admin-navigation", 
AdminNavigationView.prototype.className = "admin-navigation", AdminNavigationView.prototype.initialize = function(options) {
var _ref;
return this.active_nav_link = options.active_nav_link, this.sideBarClass = null != (_ref = options.sideBarClass) ? _ref :"open";
}, AdminNavigationView.prototype.updateData = function(model, active_nav_link) {
return this.model = model, this.active_nav_link = active_nav_link;
}, AdminNavigationView.prototype.collapseClass = function() {
return $(".hre-sidebar").hasClass("open") ? "open" :$(".hre-sidebar").hasClass("closed") ? "closed" :void 0;
}, AdminNavigationView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
active_nav_link:this.active_nav_link,
throbber:HR.appController.viewLoader(),
sideBarClass:this.sideBarClass
}), $(this.el).html(content), this;
}, AdminNavigationView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.AdminNavigationView = AdminNavigationView;
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
CompanyAddInvitesView.prototype.searchBy = "id", CompanyAddInvitesView.prototype.companyFields = {
id:"id",
name:"name",
email:"email"
}, CompanyAddInvitesView.prototype.events = {
"submit form#add-invites-form":"addInvites"
}, CompanyAddInvitesView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
searchBy:this.searchBy
}), $(this.el).html(content), setTimeout(function() {
return that.initCompanySelect2();
}), this;
}, CompanyAddInvitesView.prototype.initCompanySelect2 = function() {
var defaultOptions, options, that;
return that = this, defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
placeholder:"Select a Company",
ajax:{
url:"/xrest/admin/search/companies",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return $.isNumeric(term) ? (that.searchBy = "id", $(".search-radio-grp input:nth(0)").prop("checked", !0)) :-1 === term.indexOf("@") ? (that.searchBy = "name", 
$(".search-radio-grp input:nth(1)").prop("checked", !0)) :-1 !== term.indexOf("@") && (that.searchBy = "email", 
$(".search-radio-grp input:nth(2)").prop("checked", !0)), {
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
url:"/xrest/admin/companies/add_invites",
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
CompanyExtendTrialView.prototype.searchBy = "id", CompanyExtendTrialView.prototype.companyFields = {
id:"id",
name:"name",
email:"email"
}, CompanyExtendTrialView.prototype.events = {
"submit form#extend-trial-form":"extendTrial"
}, CompanyExtendTrialView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
searchBy:this.searchBy
}), $(this.el).html(content), setTimeout(function() {
return that.initCompanySelect2();
}), this;
}, CompanyExtendTrialView.prototype.initCompanySelect2 = function() {
var defaultOptions, options, that;
return that = this, defaultOptions = HR.util.admin.defaultSelect2Options(), options = {
placeholder:"Select a Company",
ajax:{
url:"/xrest/admin/search/companies",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return $.isNumeric(term) ? (that.searchBy = "id", $(".search-radio-grp input:nth(0)").prop("checked", !0)) :-1 === term.indexOf("@") ? (that.searchBy = "name", 
$(".search-radio-grp input:nth(1)").prop("checked", !0)) :-1 !== term.indexOf("@") && (that.searchBy = "email", 
$(".search-radio-grp input:nth(2)").prop("checked", !0)), {
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
url:"/xrest/admin/companies/extend_trial",
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
DuplicateQuestionView.prototype.searchBy = "id", DuplicateQuestionView.prototype.userFields = {
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
url:"/xrest/admin/search/questions",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return $.isNumeric(term) ? (that.searchBy = "id", that.$(".search-radio-grp input:nth(0)").prop("checked", !0)) :(that.searchBy = "name", 
that.$(".search-radio-grp input:nth(1)").prop("checked", !0)), {
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
url:"/xrest/admin/search/users",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return $.isNumeric(term) ? (that.searchBy = "id", that.$(".search-radio-grp input:nth(0)").prop("checked", !0)) :(that.searchBy = "name", 
that.$(".search-radio-grp input:nth(1)").prop("checked", !0)), {
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
return this.searchBy = $(".search-radio-grp input:checked").val();
}, DuplicateQuestionView.prototype.duplicate = function(e) {
var params, qid, that, uid;
return e.preventDefault(), this.$(".message-box").addClass("hidden"), that = this, 
uid = this.userSelectBox.select2("val"), qid = this.questionSelectBox.select2("val"), 
uid ? qid ? (params = {
uid:uid,
qid:qid
}, HR.util.inlineLoadingStart($(e.currentTarget).find("button")[0]), $.ajax({
url:"/xrest/admin/questions/duplicate",
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
DuplicateTestView.prototype.searchBy = "id", DuplicateTestView.prototype.userFields = {
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
var that;
return that = this, $(".user-select2").select2({
minimumInputLength:1,
placeholder:"Select a User",
width:"off",
ajax:{
url:"/xrest/admin/search/users",
dataType:"json",
type:"GET",
data:function(term) {
return {
q:term,
fields:that.userFields[that.searchBy]
};
},
results:function(data) {
return {
results:data.results
};
}
},
formatResult:that.formatResult,
formatSelection:that.formatSelection
});
}, DuplicateTestView.prototype.initTestSelect2 = function() {
var that;
return that = this, $(".test-select2").select2({
minimumInputLength:1,
placeholder:"Select a Test",
width:"off",
ajax:{
url:"/xrest/admin/search/tests",
dataType:"json",
type:"GET",
data:function(term) {
return {
q:term,
fields:that.testFields[that.searchBy]
};
},
results:function(data) {
return {
results:data.results
};
}
},
formatResult:that.formatResult,
formatSelection:that.formatSelection
}), $(".test-select2").on("change", function(e) {
return $(".test-name-edit").val(e.added.text);
});
}, DuplicateTestView.prototype.syncSearchBy = function() {
return this.searchBy = $(".search-radio-grp input:checked").val();
}, DuplicateTestView.prototype.formatResult = function(result) {
var id, markup, primary, secondary;
return id = result.id, primary = result.primary, secondary = result.secondary, markup = "<table class='result-result'><tr>", 
primary && (markup += "<td class='result-info'><div class='result-title'>" + id + " : " + primary + "</div>"), 
secondary && (markup += "<div class='result-data'>" + secondary + "</div>"), markup += "</td></tr></table>";
}, DuplicateTestView.prototype.formatSelection = function(result) {
var primary;
return primary = result.primary, primary ? "" + result.id + " : " + primary :void 0;
}, DuplicateTestView.prototype.duplicate = function(e) {
var name, params, that, tid, uid;
return e.preventDefault(), this.$(".message-box").addClass("hidden"), that = this, 
uid = this.$(".user-select2").select2("val"), tid = this.$(".test-select2").select2("val"), 
name = this.$(".test-name-edit").val(), uid ? tid ? (params = {
uid:uid,
tid:tid,
name:name
}, HR.util.inlineLoadingStart($(e.currentTarget).find("button")[0]), $.ajax({
url:"/xrest/admin/tests/duplicate",
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
QuestionChangeOwnerDataView.prototype.searchBy = "id", QuestionChangeOwnerDataView.prototype.userFields = {
id:"id",
name:"firstname, email"
}, QuestionChangeOwnerDataView.prototype.events = {
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
url:"/xrest/admin/search/users",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return $.isNumeric(term) ? (that.searchBy = "id", that.$(".search-radio-grp input:nth(0)").prop("checked", !0)) :(that.searchBy = "name", 
that.$(".search-radio-grp input:nth(1)").prop("checked", !0)), {
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
url:"/xrest/admin/questions/" + this.model.get("id") + "/change_owner",
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
QuestionChangeOwnerView.prototype.searchBy = "id", QuestionChangeOwnerView.prototype.questionFields = {
id:"id",
name:"question"
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
url:"/xrest/admin/search/questions",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return $.isNumeric(term) ? (that.searchBy = "id", that.$(".search-radio-grp input:nth(0)").prop("checked", !0)) :(that.searchBy = "name", 
that.$(".search-radio-grp input:nth(1)").prop("checked", !0)), {
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
QuestionDuplicateFromHRView.prototype.searchBy = "id", QuestionDuplicateFromHRView.prototype.userFields = {
id:"id",
name:"firstname,email"
}, QuestionDuplicateFromHRView.prototype.events = {
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
url:"/xrest/admin/search/challenges",
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
url:"/xrest/admin/search/users",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return $.isNumeric(term) ? (that.searchBy = "id", that.$(".search-radio-grp input:nth(0)").prop("checked", !0)) :(that.searchBy = "name", 
that.$(".search-radio-grp input:nth(1)").prop("checked", !0)), {
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
}, QuestionDuplicateFromHRView.prototype.duplicate = function(e) {
var button, currentTarget, params, slug, that, user_id;
return that = this, e.preventDefault(), currentTarget = $(e.currentTarget), button = currentTarget.find("button"), 
slug = this.challengeSelectBox.val(), user_id = this.userSelectBox.val(), slug ? (HR.util.inlineLoadingStart(button), 
params = {
slug:slug
}, user_id && (params.user_id = user_id), $.ajax({
url:"/xrest/admin/questions/duplicate_from_hr",
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
"click #confirm-new-section-button":"confirmAddSection",
"click .show-edit-section-button":"showEditSection",
"click .cancel-edit-section-button":"cancelEditSection",
"click .confirm-edit-section-button":"confirmEditSection",
"click .confirm-section-button":"confirmEditSection",
"click .remove-section-button":"removeSection"
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
return __extends(SwitchUserView, _super), SwitchUserView.prototype.template = "x-admin/switch-user", 
SwitchUserView.prototype.events = function() {
return {
"submit #su-form":"su"
};
}, SwitchUserView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this), $(this.el).html(content), 
this;
}, SwitchUserView.prototype.su = function(e) {
var email, params, target, that;
return e.preventDefault(), this.$(".message-box").html("").addClass("hidden"), that = this, 
target = $(e.currentTarget).find("button")[0], (email = this.$("#su-email").val()) ? (params = {
email:email
}, HR.util.inlineLoadingStart(target), $.ajax({
url:"/xrest/admin/users/su",
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
})) :(this.$(".message-box").html("Please enter an email address").addClass("error").removeClass("success hidden"), 
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
TestAddSectionsView.prototype.searchBy = "id", TestAddSectionsView.prototype.testFields = {
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
var that;
return that = this, this.$(".test-select2").select2({
minimumInputLength:1,
placeholder:"Select a Test",
width:"off",
ajax:{
url:"/xrest/admin/search/tests",
dataType:"json",
type:"GET",
data:function(term) {
return {
q:term,
fields:that.testFields[that.searchBy]
};
},
results:function(data) {
return {
results:data.results
};
}
},
formatResult:that.formatResult,
formatSelection:that.formatSelection
}), $(".test-select2").on("change", function(e) {
return that.fetchTestData(e.val);
});
}, TestAddSectionsView.prototype.syncSearchBy = function() {
return this.searchBy = $(".search-radio-grp input:checked").val();
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
url:"/xrest/admin/tests/" + tid + "/update_sections",
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
TestChangeOwnerDataView.prototype.searchBy = "id", TestChangeOwnerDataView.prototype.userFields = {
id:"id",
name:"firstname,email"
}, TestChangeOwnerDataView.prototype.events = {
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
url:"/xrest/admin/search/users",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return $.isNumeric(term) ? (that.searchBy = "id", that.$(".search-radio-grp input:nth(0)").prop("checked", !0)) :(that.searchBy = "name", 
that.$(".search-radio-grp input:nth(1)").prop("checked", !0)), {
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
url:"/xrest/admin/tests/" + this.model.get("id") + "/change_owner",
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
TestChangeOwnerView.prototype.searchBy = "id", TestChangeOwnerView.prototype.testFields = {
id:"id",
name:"name"
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
url:"/xrest/admin/search/tests",
type:"GET",
quietMillis:800,
dataType:"json",
data:function(term) {
return $.isNumeric(term) ? (that.searchBy = "id", that.$(".search-radio-grp input:nth(0)").prop("checked", !0)) :(that.searchBy = "name", 
that.$(".search-radio-grp input:nth(1)").prop("checked", !0)), {
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
url:"/xrest/admin/tests/invite_candidates?force_invite=" + $("input[name=force-invite]").get(0).checked,
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
}), $(this.el).html(content), this;
}, TopNavigationBarView.prototype.navigateAnchor = function(e) {
var href;
return e.ctrlKey || e.metaKey ? !0 :(e.preventDefault(), href = $(e.currentTarget).attr("href"), 
href && "#" !== href ? (HR.router.navigate(href, !0), this.render()) :void 0);
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
UserChangeEmailView.prototype.searchBy = "id", UserChangeEmailView.prototype.userFields = {
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
var that;
return that = this, this.$(".user-select2").select2({
minimumInputLength:1,
placeholder:"Select a User",
width:"off",
ajax:{
url:"/xrest/admin/search/users",
dataType:"json",
type:"GET",
data:function(term) {
return $.isNumeric(term) ? (that.searchBy = "id", $(".search-radio-grp input:nth(0)").prop("checked", !0)) :(that.searchBy = "name", 
$(".search-radio-grp input:nth(1)").prop("checked", !0)), {
q:term,
fields:that.userFields[that.searchBy]
};
},
results:function(data) {
return {
results:data.results
};
}
},
formatResult:that.formatResult,
formatSelection:that.formatSelection
}).on("keyup", function() {
return alert(";");
});
}, UserChangeEmailView.prototype.formatResult = function(result) {
var id, markup, primary, secondary;
return id = result.id, primary = result.primary, secondary = result.secondary, markup = "<table class='result-result'><tr>", 
primary && (markup += "<td class='result-info'><div class='result-title'>" + id + " : " + primary + "</div>"), 
secondary && (markup += "<div class='result-data'>" + secondary + "</div>"), markup += "</td></tr></table>";
}, UserChangeEmailView.prototype.formatSelection = function(result) {
var primary;
return primary = result.primary, primary ? "" + result.id + " : " + primary :void 0;
}, UserChangeEmailView.prototype.syncSearchBy = function() {
return this.searchBy = $(".search-radio-grp input:checked").val();
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
url:"/xrest/admin/users/update_email",
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
return this.get("id") ? "/xrest/admin/companies/" + this.get("id") :"/xrest/admin/companies";
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
var HR, QuestionModel, _ref;
return QuestionModel = function(_super) {
function QuestionModel() {
return QuestionModel.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionModel, _super), QuestionModel.prototype.url = function() {
return "/xrest/admin/questions/" + this.get("id");
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
return "/xrest/admin/tests/" + this.get("id");
}, TestModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestModel = TestModel;
});
}.call(this), function() {}.call(this);