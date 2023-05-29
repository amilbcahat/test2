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
var DataTableView, HR, def, prop, range, toObj, val, _ref;
return val = function(v) {
return _.isFunction(v) ? v() :v;
}, range = function(val) {
var arr, ret;
return ret = val, val && (arr = val.split(/to/i), arr.length > 1 && (ret = arr[0].trim() + ".." + arr[1].trim())), 
ret;
}, prop = function(rows, p, name) {
return null == name && (name = "prop"), _.find(rows, function(row) {
return row[name] === p;
});
}, toObj = function(fields) {
var ret;
return ret = {}, _.each(fields, function(field) {
return ret[field.name] = field.value;
}), ret;
}, def = function(that, defaults, options) {
return null == that && (that = {}), null == defaults && (defaults = {}), null == options && (options = {}), 
_.each(defaults, function(v, k) {
return that[k] = v, void 0 !== options[k] ? that[k] = options[k] :void 0;
}), that;
}, DataTableView = function(_super) {
function DataTableView() {
return DataTableView.__super__.constructor.apply(this, arguments);
}
return __extends(DataTableView, _super), DataTableView.prototype.def = {}, DataTableView.prototype.setAsync = function(async) {
this.async = async;
}, DataTableView.prototype.defField = function() {
return {
template:"<%- row[prop] %>",
format:function(prop, row_no, template, field) {
return _.isFunction(template) || (template = _.template(template)), template({
row:this,
prop:prop,
row_no:row_no,
field:field
});
}
};
}, DataTableView.prototype.initialize = function(options) {
return null == options && (options = {}), def(this, val(this.def), options), _.bindAll(this), 
this.customDatatableOpt = options.customDatatableOpt, DataTableView.__super__.initialize.apply(this, arguments);
}, DataTableView.prototype.fields = null, DataTableView.prototype.url = null, DataTableView.prototype.datatableEl = "#datatable", 
DataTableView.prototype.modelClass = null, DataTableView.prototype.datatable = null, 
DataTableView.prototype.baseParams = null, DataTableView.prototype.getFields = function() {
var fields, that;
return that = this, fields = _.map(val(this.fields), function(field, ix) {
var o;
return o = {
ix:ix
}, _.extend(o, val(that.defField), field), _.isString(o.template) && (o.template = _.template(o.template)), 
o;
}), fields = _.sortBy(fields, function(field) {
return field.ix;
});
}, DataTableView.prototype.beforeRequest = function(params) {
var base, order_by, ret;
return ret = {}, base = val(this.baseParams), base && _.extend(ret, base), order_by = prop(this.getFields(), params.iSortCol_0, "ix"), 
order_by && order_by.prop && (ret.order_by = order_by.prop), ret.order_dir = params.sSortDir_0, 
ret.limit = params.iDisplayLength, ret.offset = params.iDisplayStart, ret;
}, DataTableView.prototype.afterRequest = function(data, fields) {
var result;
return result = {
aaData:[],
iTotalDisplayRecords:0,
iTotalRecords:0,
models:[]
}, _.isObject(data) && _.isArray(data.results) && (result.iTotalDisplayRecords = data.total, 
result.iTotalRecords = data.total, result.aaData = _.map(data.results, function(_this) {
return function(row, ix) {
var ret;
return _this.modelClass && (row = new _this.modelClass(row), result.models.push(row)), 
ret = _.map(fields, function(field) {
return field.format.call(row, field.prop, ix, field.template);
});
};
}(this))), result;
}, DataTableView.prototype.params = function() {
return {
model:this.model,
fields:this.getFields(),
collection:this.collection
};
}, DataTableView.prototype.sortableFields = function() {
var fields, ret;
return fields = this.getFields(), ret = _.chain(fields).filter(function(row) {
return row.sortable === !1;
}).map(function(row) {
return row.ix;
}).value();
}, DataTableView.prototype.defaultOrderBy = function() {
var p, params, ret;
return params = val(this.baseParams), ret = 0, params && params.order_by && (p = prop(this.getFields(), params.order_by, "prop"), 
p && (ret = p.ix)), ret;
}, DataTableView.prototype.defaultOrderDir = function() {
var params, ret;
return params = val(this.baseParams), ret = "asc", params && params.order_dir && (ret = params.order_dir), 
ret;
}, DataTableView.prototype.datatableOpt = function() {
var fields, that;
return that = this, fields = this.getFields(), {
sPaginationType:"bootstrap",
bProcessing:!1,
bServerSide:!0,
bDestroy:!0,
bAutoWidth:!1,
aaSorting:[ [ this.defaultOrderBy(), this.defaultOrderDir() ] ],
iDisplayLength:50,
aoColumnDefs:[ {
bVisible:!0,
aTargets:_.map(fields, function(field) {
return field.ix;
})
}, {
bSortable:!1,
aTargets:val(this.sortableFields)
} ],
fnPreDrawCallback:function(_this) {
return function(oSettings) {
return _this.customDatatableOpt && _this.customDatatableOpt.showAfterFetch && oSettings._iRecordsTotal > 0 ? $(_this.el).show() :void 0;
};
}(this),
sAjaxSource:val(this.url),
fnServerData:function(sSource, aoData, fnCallback) {
return aoData = toObj(aoData), _.isFunction(that.beforeRequest) && (aoData = that.beforeRequest(aoData), 
aoData === !1) ? void 0 :(HR.util.ajaxmsg("Loading...", !1, !0, 1e3), $.ajax({
url:sSource,
data:aoData,
dataType:"json",
crossDomain:!0,
xhrFields:{
withCredentials:!0
},
success:function(json) {
return _.isFunction(that.afterRequest) && (json = that.afterRequest(json, fields)), 
that.data = json, fnCallback(json), HR.util.ajaxmsg("", !1, !0, 0), $(".tip").tooltip();
}
}));
}
};
}, DataTableView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)(val(this.params))), 
this.customDatatableOpt && this.customDatatableOpt.showAfterFetch && $(this.el).hide(), 
this.async ? this :(this.timer && window.clearTimeout(this.timer), this.timer = window.setTimeout(function(_this) {
return function() {
return _.isFunction(_this.postRender) ? _this.postRender() :console.log("post render not present - datatable");
};
}(this), 1e3), this);
}, DataTableView.prototype.postRender = function() {
var options;
return options = {}, _.extend(options, val(this.datatableOpt), this.customDatatableOpt), 
this.datatable = this.$(this.datatableEl).dataTable(options);
}, DataTableView;
}(Backbone.View), HR = null != (_ref = window.HR) ? _ref :{}, HR.DataTableView = DataTableView;
});
}).call(this), function() {
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
var TeamUserView;
return TeamUserView = function(_super) {
function TeamUserView() {
return this.saveData = __bind(this.saveData, this), TeamUserView.__super__.constructor.apply(this, arguments);
}
var HR, _ref;
return __extends(TeamUserView, _super), TeamUserView.prototype.template = "x/add-user-modal", 
TeamUserView.prototype.tagName = "div", TeamUserView.prototype.initialize = function(options) {
return this.parent = options.parent, this.type = options.type, this.userLabels = options.userLabels, 
this.users = options.users, this.mapping_id = options.mapping_id, this.team_id = options.team_id, 
this.data = options.data, this.user_data = options.user_data, TeamUserView.__super__.initialize.call(this, options);
}, TeamUserView.prototype.render = function() {
var candidates_permission, disabled, interviews_permission, multiple, name, questions_permission, teams, tests_permission;
return $(this.el).empty(), $(this.el).html(HR.appController.template(this.template, this)({
collection:this.collection,
type:this.type
})), this.$("#new-add-user").modal(), teams = _.map(this.collection.models, function() {
return function(model) {
return "real" === model.get("type") && model.get("edit") === !0 ? {
id:model.get("id"),
text:model.get("name")
} :null;
};
}(this)), teams = _.compact(teams), "add user" === this.type ? (name = "new", multiple = !0, 
disabled = !1, this.setDefaultAndShowPermissions()) :"add to team" === this.type ? (name = "select2", 
multiple = !1, disabled = !0, this.setDefaultAndShowPermissions()) :"edit" === this.type && (name = "pre-filled", 
this.user_data = {}, _.each(this.collection.models, function(_this) {
return function(model) {
return _.each(model.get("users"), function(user) {
return user.get("id") === _this.mapping_id ? (_this.model = user, _this.user_data = user.toJSON(), 
_this.user_data.team = {
id:model.get("id"),
name:model.get("name")
}) :void 0;
});
};
}(this)), this.user_data && (this.$("span.js-user-name").html(this.user_data.firstname + " " + this.user_data.lastname), 
this.$("span.js-user-email").html(this.user_data.email), "admin" === this.user_data.role ? (this.$("span.js-user-profile").html("Recruitment"), 
this.$("span.js-user-admin").html("Yes")) :"recruiter" === this.user_data.role ? (this.$("span.js-user-profile").html("Recruitment"), 
this.$("span.js-user-admin").html("No")) :(this.$("span.js-user-profile").html("Development"), 
this.$("span.js-user-admin").html("No"))), questions_permission = this.user_data.questions_permission_json, 
tests_permission = this.user_data.tests_permission_json, candidates_permission = this.user_data.candidates_permission_json, 
interviews_permission = this.user_data.interviews_permission_json, this.setDefaultAndShowPermissions(this.user_data.role, questions_permission, tests_permission, candidates_permission, interviews_permission)), 
"add user" === this.type && (setTimeout(function(_this) {
return function() {
return _this.$("input[name=user-teams-select]").select2({
data:teams,
multiple:!0
});
};
}(this)), this.user_data && (this.user_data.email && this.$("input[name=user-email]").val(this.user_data.email), 
this.user_data.firstname && (name = this.user_data.firstname, this.user_data.lastname && (name += " " + this.user_data.lastname), 
this.$("input[name=user-name]").val(name)))), "select2" === name && this.userLabels && setTimeout(function(_this) {
return function() {
return _this.$("input[name=user-name]").select2({
data:_this.userLabels,
width:200,
formatSelection:function(object) {
var data, role;
return _.isEmpty(object) ? void 0 :(data = _this.users[object.id], _this.user_data = data, 
_this.$("span.js-user-email").html(data.email), _this.$("span.js-user-name").html(data.firstname + " " + data.lastname), 
"admin" === data.role ? (_this.$("span.js-user-profile").html("Recruitment"), _this.$("span.js-user-admin").html("Yes")) :"recruiter" === data.role ? (_this.$("span.js-user-profile").html("Recruitment"), 
_this.$("span.js-user-admin").html("No")) :(_this.$("span.js-user-profile").html("Development"), 
_this.$("span.js-user-admin").html("No")), _this.user_id = data.user_id, _this.$(".js-user-info").removeClass("hidden"), 
role = "admin" === data.role || "recruiter" === data.role ? "recruiter" :"developer", 
_this.showPermissions(role, !1), _.compact([ data.firstname, data.lastname ]).join(" "));
}
});
};
}(this), 800), this;
}, TeamUserView.prototype.events = function() {
return {
"submit form[name=add-user-form]":"addUser",
"change select[name=user-role]":"toggleAdmin"
};
}, TeamUserView.prototype.toggleAdmin = function(e) {
var val;
return val = this.$(e.currentTarget).val(), "recruiter" === val ? this.$(".js-user-admin-container").removeClass("hidden") :this.$(".js-user-admin-container").addClass("hidden"), 
"edit" !== this.type ? this.showPermissions(val, !1) :void 0;
}, TeamUserView.prototype.disableForm = function() {
return this.$("button[type=submit]").attr("disabled", !0).addClass("disabled");
}, TeamUserView.prototype.enableForm = function() {
return this.$("button[type=submit]").attr("disabled", !1).removeClass("disabled");
}, TeamUserView.prototype.setDefaultAndShowPermissions = function(role, questions_permission, tests_permission, candidates_permission, interviews_permission) {
return null == role && (role = "recruiter"), null == questions_permission && (questions_permission = null), 
null == tests_permission && (tests_permission = null), null == candidates_permission && (candidates_permission = null), 
null == interviews_permission && (interviews_permission = null), "admin" === role && (role = "recruiter"), 
questions_permission = questions_permission ? {
developer:questions_permission,
recruiter:questions_permission
} :{
developer:{
owned:this.collection.new_user_permissions.owned.questions_permission.developer,
shared:this.collection.new_user_permissions.shared.questions_permission.developer
},
recruiter:{
owned:this.collection.new_user_permissions.owned.questions_permission.recruiter,
shared:this.collection.new_user_permissions.shared.questions_permission.recruiter
}
}, tests_permission = tests_permission ? {
developer:tests_permission,
recruiter:tests_permission
} :{
developer:{
owned:this.collection.new_user_permissions.owned.tests_permission.developer,
shared:this.collection.new_user_permissions.shared.tests_permission.developer
},
recruiter:{
owned:this.collection.new_user_permissions.owned.tests_permission.recruiter,
shared:this.collection.new_user_permissions.shared.tests_permission.recruiter
}
}, candidates_permission = candidates_permission ? {
developer:candidates_permission,
recruiter:candidates_permission
} :{
developer:{
owned:this.collection.new_user_permissions.owned.candidates_permission.developer,
shared:this.collection.new_user_permissions.shared.candidates_permission.developer
},
recruiter:{
owned:this.collection.new_user_permissions.owned.candidates_permission.recruiter,
shared:this.collection.new_user_permissions.shared.candidates_permission.recruiter
}
}, interviews_permission = interviews_permission ? {
developer:interviews_permission,
recruiter:interviews_permission
} :{
developer:{
owned:this.collection.new_user_permissions.owned.interviews_permission.developer,
shared:this.collection.new_user_permissions.shared.interviews_permission.developer
},
recruiter:{
owned:this.collection.new_user_permissions.owned.interviews_permission.recruiter,
shared:this.collection.new_user_permissions.shared.interviews_permission.recruiter
}
}, this.defaultPermissions = {
questions_permission:questions_permission,
tests_permission:tests_permission,
candidates_permission:candidates_permission,
interviews_permission:interviews_permission
}, this.showPermissions(role);
}, TeamUserView.prototype.showPermissions = function(role, create, questions_permission, tests_permission, candidates_permission, interviews_permission) {
return null == role && (role = "recruiter"), null == create && (create = !0), null == questions_permission && (questions_permission = null), 
null == tests_permission && (tests_permission = null), null == candidates_permission && (candidates_permission = null), 
null == interviews_permission && (interviews_permission = null), "admin" === role && (role = "recruiter"), 
questions_permission || (questions_permission = this.defaultPermissions.questions_permission[role]), 
tests_permission || (tests_permission = this.defaultPermissions.tests_permission[role]), 
candidates_permission || (candidates_permission = this.defaultPermissions.candidates_permission[role]), 
interviews_permission || (interviews_permission = this.defaultPermissions.interviews_permission[role]), 
questions_permission.shared > 1 ? this.$("input[name=questions-permission]").attr("checked", "checked") :this.$("input[name=questions-permission]").removeAttr("checked"), 
tests_permission.owned > 1 ? this.$("input[name=tests-permission][value=create-tests]").attr("checked", "checked") :this.$("input[name=tests-permission][value=create-tests]").removeAttr("checked"), 
tests_permission.shared > 1 ? this.$("input[name=tests-permission][value=share-tests]").attr("checked", "checked") :this.$("input[name=tests-permission][value=share-tests]").removeAttr("checked"), 
candidates_permission.shared > 1 ? this.$("input[name=candidates-permission][value=share-candidates]").attr("checked", "checked") :this.$("input[name=candidates-permission][value=share-candidates]").removeAttr("checked"), 
interviews_permission.owned > 1 ? this.$("input[name=interviews-permission][value=schedule-interviews]").attr("checked", "checked") :this.$("input[name=interviews-permission][value=schedule-interviews]").removeAttr("checked"), 
interviews_permission.shared > 1 ? this.$("input[name=interviews-permission][value=share-interviews]").attr("checked", "checked") :this.$("input[name=interviews-permission][value=share-interviews]").removeAttr("checked"), 
create ? setTimeout(function(_this) {
return function() {
var Switchery;
return Switchery = require__("switchery"), $.map($(_this.el).find(".js-switch"), function(item) {
return new Switchery(item), _this.$(item).attr("checked") ? _this.$(item).next().find("small").css("left", "20px") :void 0;
});
};
}(this)) :setTimeout(function(_this) {
return function() {
var Switchery;
return Switchery = require__("switchery"), $.map($(_this.el).find(".js-switch"), function(item) {
return _this.$(item).parent().find(".switchery").remove(), new Switchery(item), 
_this.$(item).attr("checked") ? _this.$(item).next().find("small").css("left", "20px") :void 0;
});
};
}(this));
}, TeamUserView.prototype.getPermissions = function(role) {
var permissions;
return permissions = {
questions_permission:{
shared:2,
owned:3
},
tests_permission:{
shared:2,
owned:3
},
candidates_permission:{
shared:2,
owned:3
},
interviews_permission:{
shared:2,
owned:3
}
}, "admin" === role && (role = "recruiter"), permissions.questions_permission.shared = this.$("input[name=questions-permission]").is(":checked") ? this.defaultPermissions.questions_permission[role].shared >= 2 ? this.defaultPermissions.questions_permission[role].shared :2 :this.defaultPermissions.questions_permission[role].shared <= 1 ? this.defaultPermissions.questions_permission[role].shared :1, 
permissions.tests_permission.owned = this.$("input[name=tests-permission][value=create-tests]").is(":checked") ? 3 :0, 
permissions.tests_permission.shared = this.$("input[name=tests-permission][value=share-tests]").is(":checked") ? this.defaultPermissions.tests_permission[role].shared >= 2 ? this.defaultPermissions.tests_permission[role].shared :2 :this.defaultPermissions.tests_permission[role].shared <= 1 ? this.defaultPermissions.tests_permission[role].shared :1, 
permissions.candidates_permission.shared = this.$("input[name=candidates-permission][value=share-candidates]").is(":checked") ? this.defaultPermissions.candidates_permission[role].shared >= 2 ? this.defaultPermissions.candidates_permission[role].shared :2 :0, 
permissions.interviews_permission.owned = this.$("input[name=interviews-permission][value=schedule-interviews]").is(":checked") ? 3 :0, 
permissions.interviews_permission.shared = this.$("input[name=interviews-permission][value=share-interviews]").is(":checked") ? this.defaultPermissions.interviews_permission[role].shared >= 2 ? this.defaultPermissions.interviews_permission[role].shared :2 :0, 
permissions;
}, TeamUserView.prototype.addUser = function(e) {
var email, firstname, lastname, name, nameComponents, owner_team, role, team_id, teams, user_data, user_id, user_team_model;
return e.preventDefault(), "add user" === this.type ? (name = this.$("input[name=user-name]").removeClass("error").val(), 
nameComponents = name.split(" "), firstname = nameComponents.shift(), lastname = nameComponents.join(" "), 
email = this.$("input[name=user-email]").val(), teams = this.$("input[name=user-teams-select]").val().split(","), 
role = this.$("select[name=user-role]").val(), this.$("input[name=user-admin]:checked").length > 0 && (role = "admin"), 
_.isEmpty(firstname) ? (this.$("input[name=user-name]").addClass("error"), this.enableForm(), 
void 0) :_.isEmpty(email) ? (this.$("input[name=user-email]").addClass("error"), 
this.enableForm(), void 0) :_.isEmpty(teams) ? (this.$("input[name=user-teams-select]").addClass("error"), 
this.enableForm(), void 0) :"developer" !== role && "trial" === HR.currentUser.get("company").striple_plan && this.userLabels.length >= 30 ? (this.enableForm(), 
alert("You can add only upto 30 users in the trial period"), null) :(user_data = {
firstname:firstname,
lastname:lastname,
email:email,
teams:teams,
role:role
}, owner_team = _.find(teams, function(_this) {
return function(team_id) {
var team;
return team = _this.collection.get(team_id), team.get("is_owner_team") ? !0 :!1;
};
}(this)), owner_team ? (this.$("#new-add-user").modal("hide"), 1 === this.collection.models.length ? HR.util.confirm({
title:"Adding user to Owner's Team",
message:"You are adding a new user to the Owner's Team. Members of this team have access to all your company data. It is good practise to create a different team for day to day operations. Would you like to create a new team now?",
okButtonText:"No, Add to Owner's Team",
cancelButtonText:"Create New Team",
okCallback:function(_this) {
return function() {
var user_team_model;
return _this.$("#new-add-user").modal("show"), user_team_model = new HR.UserTeamModel(), 
_this.saveData(user_data, role, user_team_model);
};
}(this),
cancelCallback:function(_this) {
return function() {
return HR.UserSettings.set("new_user_data", user_data), _this.parent.addTeamAndUser(_this);
};
}(this)
}) :HR.util.confirm({
title:"Adding user to Owner's Team",
message:"You are adding a new user to the Owner's Team. Members of this team have access to all your company data. It is good practise to create a different team for day to day operations. Are you sure?",
okButtonText:"Yes, I know what I am doing",
cancelButtonText:"Cancel",
okCallback:function(_this) {
return function() {
var user_team_model;
return _this.$("#new-add-user").modal("show"), user_team_model = new HR.UserTeamModel(), 
_this.saveData(user_data, role, user_team_model);
};
}(this)
})) :(user_team_model = new HR.UserTeamModel(), this.saveData(user_data, role, user_team_model)))) :"add to team" === this.type ? (team_id = this.team_id, 
user_id = this.user_id, role = this.user_data.role, user_data = {
user_id:user_id,
team_id:team_id
}, user_team_model = new HR.UserTeamModel(), this.saveData(user_data, role, user_team_model)) :"edit" === this.type ? (role = this.user_data.role, 
user_team_model = this.model, user_data = {
id:this.mapping_id
}, this.saveData(user_data, role, user_team_model)) :void 0;
}, TeamUserView.prototype.saveData = function(user_data, role, user_team_model) {
var permissions;
return permissions = this.getPermissions(role), user_data.questions_permission = permissions.questions_permission, 
user_data.tests_permission = permissions.tests_permission, user_data.candidates_permission = permissions.candidates_permission, 
user_data.interviews_permission = permissions.interviews_permission, user_team_model.save(user_data, {
success:function(_this) {
return function() {
return _this.$("button.close").click(), HR.util.trackTotango("Added User - " + role, "Account Settings"), 
setTimeout(function() {
return _this.collection.fetch({
success:function() {
return _this.parent.render();
}
});
}, 1e3);
};
}(this),
error:function(_this) {
return function(model, xhr) {
var response;
return response = $.parseJSON(xhr.responseText), 402 === xhr.status ? (_this.$("button.close").click(), 
setTimeout(function() {
return _this.checkout(user_data);
}, 500)) :(_this.$(".alert.error").html(response.message), _this.$(".alert.error").removeClass("hidden"), 
_this.enableForm());
};
}(this)
});
}, TeamUserView.prototype.checkout = function() {
return HR.util.alert({
title:"Plan upgrade required",
message:"Adding another user in recruitment profile would need you to upgrade your plan. Please contact support@hackerrank.com for more details."
});
}, HR = null != (_ref = window.HR) ? _ref :{}, HR.TeamUserView = TeamUserView, TeamUserView;
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
var CandidateSearchView, HR, _ref;
return CandidateSearchView = function(_super) {
function CandidateSearchView() {
return CandidateSearchView.__super__.constructor.apply(this, arguments);
}
return __extends(CandidateSearchView, _super), CandidateSearchView.prototype.template = "x/candidate-search", 
CandidateSearchView.prototype.className = "candidate-search", CandidateSearchView.prototype.initialize = function(options) {
return null == options && (options = {}), this.term = options.term || "", this.collection.bind("reset", this.render, this), 
this.collection.bind("change", this.render, this), CandidateSearchView.__super__.initialize.call(this, options);
}, CandidateSearchView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
collection:this.collection,
term:this.term
})), this;
}, CandidateSearchView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CandidateSearchView = CandidateSearchView;
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
var CardDetailsView, HR, _ref;
return CardDetailsView = function(_super) {
function CardDetailsView() {
return CardDetailsView.__super__.constructor.apply(this, arguments);
}
return __extends(CardDetailsView, _super), CardDetailsView.prototype.getToken = function() {
var message;
return this.validate() ? Stripe.createToken({
number:$("#card-number").val(),
cvc:$("#cvv").val(),
exp_month:$("#expiry-month").val(),
exp_year:$("#expiry-year").val()
}, this.cardCheckResponseHandler()) :(message = "Data provided is invalid", HR.util.inlineLoadingEnd({}), 
this.$(".response-message").removeClass("hidden").addClass("error").html(message), 
$("#card-details-submit").attr("disabled", !1).removeClass("disabled"), !1);
}, CardDetailsView.prototype.validate = function() {
var cvc, exp_month, exp_year, number;
return number = $("#card-number").val(), cvc = $("#cvv").val(), exp_month = $("#expiry-month").val(), 
exp_year = $("#expiry-year").val(), Stripe.validateExpiry(exp_month, exp_year) && Stripe.validateCVC(cvc) && "Unknown" !== Stripe.cardType(number) ? !0 :!1;
}, CardDetailsView.prototype.cardCheckResponseHandler = function() {}, CardDetailsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CardDetailsView = CardDetailsView;
});
}.call(this), function() {
var CreateQuestionModalView, HR, _ref, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {}), CreateQuestionModalView = function(_super) {
function CreateQuestionModalView() {
return CreateQuestionModalView.__super__.constructor.apply(this, arguments);
}
return __extends(CreateQuestionModalView, _super), CreateQuestionModalView.prototype.initialize = function() {
var that;
return that = this, this.listenTo(this.model, "change", this.render);
}, CreateQuestionModalView.prototype.template = "x/create-question-modal", CreateQuestionModalView.prototype.className = "create-question-modal", 
CreateQuestionModalView.prototype.events = function() {
return {
"click .js-create-question-tabs-select":"selectTab",
"click .js-question-tab":"closeModalAndNavigate"
};
}, CreateQuestionModalView.prototype.render = function() {
var content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:this.model,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content)), this.$("#create-question-modal").modal(), this;
}, CreateQuestionModalView.prototype.selectTab = function(e) {
var tab;
return e.preventDefault(), tab = this.$(e.currentTarget).data("tab"), this.$(".js-create-question-tabs").addClass("hidden"), 
this.$(".js-" + tab).removeClass("hidden"), this.$(".js-create-question-tabs-select").parent().removeClass("active"), 
this.$(e.currentTarget).parent().addClass("active");
}, CreateQuestionModalView.prototype.closeModalAndNavigate = function(e) {
var href;
return e.preventDefault(), href = this.$(e.currentTarget).attr("href"), this.$(".close").click(), 
setTimeout(function() {
return Backbone.history.navigate(href, !0);
}, 200);
}, CreateQuestionModalView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CreateQuestionModalView = CreateQuestionModalView;
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
var EditTeamView, HR, _ref;
return EditTeamView = function(_super) {
function EditTeamView() {
return EditTeamView.__super__.constructor.apply(this, arguments);
}
return __extends(EditTeamView, _super), EditTeamView.prototype.template = "x/edit-team-modal", 
EditTeamView.prototype.tagName = "div", EditTeamView.prototype.initialize = function(options) {
return this.parent = options.parent;
}, EditTeamView.prototype._render = function() {
return $(this.el).empty(), $(this.el).html(HR.appController.template(this.template, this)({
model:this.model
})), this.$("#new-team-modal").modal(), this;
}, EditTeamView.prototype.events = function() {
return {
"submit form[name=team-form]":"createTeam"
};
}, EditTeamView.prototype.createTeam = function(e) {
var name;
return e.preventDefault(), name = this.$("input[name=new-team-name]").val(), name ? (this.model.set("name", name, {
silent:!0
}), this.model.save(null, {
silent:!0,
success:function(_this) {
return function(model) {
return _this.$("button.close").click(), setTimeout(function() {
return _this.collection.get(model.get("id")) || _this.collection.add(model), _this.collection.fetch({
success:function() {
return _this.parent.render();
}
});
}, 1e3);
};
}(this),
error:function(_this) {
return function(model, xhr) {
var response;
return response = $.parseJSON(xhr), _this.$(".alert.error").html(response.message);
};
}(this)
})) :void 0;
}, EditTeamView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.EditTeamView = EditTeamView;
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
var EditUserTeamView, HR, _ref;
return EditUserTeamView = function(_super) {
function EditUserTeamView() {
return EditUserTeamView.__super__.constructor.apply(this, arguments);
}
return __extends(EditUserTeamView, _super), EditUserTeamView.prototype.template = "x/edit-user-team-modal", 
EditUserTeamView.prototype.tagName = "div", EditUserTeamView.prototype.initialize = function(options) {
return this.parent = options.parent, this.users = options.users, this.userLabels = options.userLabels, 
this.team_id = options.team_id, EditUserTeamView.__super__.initialize.call(this, options);
}, EditUserTeamView.prototype.events = function() {
return {
"submit form[name=team-member-form]":"updateUser"
};
}, EditUserTeamView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this.$("input[name=edit-user-team-id]").val(this.team_id), this.$("#edit-user-modal").modal(), 
this.$("select[name=new-user-role]").val(this.model.get("role")).attr("disabled", !0), 
this;
}, EditUserTeamView.prototype.updateUser = function(e) {
var candidates_permission, questions_permission, tests_permission, user_data;
return e.preventDefault(), $(".alert.error").addClass("hidden"), tests_permission = $("input[name=edit-user-tests-permission]").attr("checked") ? 2 :1, 
questions_permission = $("input[name=edit-user-questions-permission]").attr("checked") ? 2 :1, 
candidates_permission = $("input[name=edit-user-candidates-permission]").attr("checked") ? 2 :1, 
user_data = {
tests_permission:tests_permission,
questions_permission:questions_permission,
candidates_permission:candidates_permission
}, console.log(this.model), this.model.save(user_data, {
suppressMessage:!0,
success:function(_this) {
return function() {
return _this.$("button.close").click(), _this.collection.fetch();
};
}(this)
}, {
error:function(_this) {
return function(model, xhr) {
var response;
return response = $.parseJSON(xhr.responseText), _this.$(".alert.error").html(response.message), 
_this.$(".alert.error").removeClass("hidden");
};
}(this)
});
}, EditUserTeamView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.EditUserTeamView = EditUserTeamView;
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
var AttendantEditModalView, EditInterviewView, HR, SharePadModalView, _ref;
return EditInterviewView = function(_super) {
function EditInterviewView() {
return EditInterviewView.__super__.constructor.apply(this, arguments);
}
return __extends(EditInterviewView, _super), EditInterviewView.prototype.initialize = function() {
var that;
return that = this, this.just_created = "new interview" === HR.NotificationModel.pop();
}, EditInterviewView.prototype.template = "x/interview-edit", EditInterviewView.prototype.className = "interview-edit", 
EditInterviewView.prototype.events = function() {
return {
"submit form[name=quick-pad-form]":"createQuickPad",
"click .js-add-interviewer":"addInterviewer",
"click .js-edit-attendant":"editAttendant",
"click .js-done":"done",
"click .js-share-pad":"sharePad",
"submit form[name=update-interview-form]":"updateInterview",
"click  button[name=edit-interview-button]":"editInterview",
"click  button[name=cancel-button]":"cancelBtn"
};
}, EditInterviewView.prototype.render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
throbber:HR.appController.viewLoader(),
model:this.model.toJSON(),
time_diff:(this.model.get("to").getTime() - this.model.get("from").getTime()) / 6e4,
just_created:this.just_created
}), $(this.el).html(content), this.setupTimezoneSelect(), this.$("#copy-access-code").popover({
content:"Access Code has been copied",
trigger:"none"
}), this.initializeCopy(), this.$("input[type=file]").bootstrapFileInput(), this.$(".date.start").datepicker({
format:"m-d-yyyy",
autoclose:!0
}), this.$(".time.start").timepicker({
showDuration:!0,
timeFormat:"H:i",
scrollDefaultNow:!0
}), HR.currentUser.isLocked() && this.$(".account-locked").removeClass("hidden"), 
this.editInterview(), this;
}, EditInterviewView.prototype.initializeCopy = function() {
var that;
return that = this, this.client = new ZeroClipboard(this.$("#copy-access-code")), 
this.client.on("complete", function() {
var elem;
return $(this).popover("show"), elem = $(this), setTimeout(function() {
return function() {
return elem.popover("hide"), that.initializeCopy();
};
}(this), 2e3);
});
}, EditInterviewView.prototype.setupTimezoneSelect = function() {
var that;
return that = this, setTimeout(function() {
return $.ajax({
url:"/x/api/v1/users/timezones",
type:"GET",
success:function(response) {
return $("#timezones").select2({
width:"off",
data:response.data
});
}
});
});
}, EditInterviewView.prototype.done = function(e) {
return e.preventDefault(), Backbone.history.navigate("interviews", !0);
}, EditInterviewView.prototype.sharePad = function(e) {
var share_pad_view;
return e.preventDefault(), share_pad_view = new SharePadModalView({
model:this.model
}), this.$("#modal-container").html(share_pad_view.render().el);
}, EditInterviewView.prototype.addInterviewer = function(e) {
var new_interviewer_view;
return e.preventDefault(), new_interviewer_view = new AttendantEditModalView({
role:"interviewer",
attendant:{},
model:this.model,
parent:this
}), this.$("#modal-container").html(new_interviewer_view.render().el);
}, EditInterviewView.prototype.checkForResume = function() {
var $form, paramTwo, submitUrl, that;
return this.$("input[name=resume]").val() ? (submitUrl = "/x/api/v1/users/upload_codepair_resume", 
$form = this.$("form[name=update-interview-form]"), paramTwo = function() {
var returnValue;
return returnValue = {
type:"POST",
files:$form.find(":file"),
iframe:!0,
crossDomain:!0
};
}, that = this, $.ajax(submitUrl, paramTwo()).complete(function(_this) {
return function(data) {
return data = $.parseJSON(data.responseText), "Success" === data.message ? _this.saveInterview(data.upload_path) :(_this.$("button[name=schedule-interview-button]").attr("disabled", !1), 
_this.$(".file-upload-error").html(data.message));
};
}(this))) :this.model.get("resume") ? this.saveInterview(this.model.get("resume")) :this.saveInterview("");
}, EditInterviewView.prototype.editInterview = function() {
return this.$(".editData").show().removeClass("hidden"), this.$(".displayData").hide(), 
setTimeout(function(_this) {
return function() {
return _this.$(".overflow-content").animate({
scrollTop:200
});
};
}(this));
}, EditInterviewView.prototype.cancelBtn = function() {
return this.$(".editData").hide(), this.$(".displayData").show();
}, EditInterviewView.prototype.updateInterview = function(e) {
return e.preventDefault(), this.$("button[name=update-interview-button]").attr("disabled", !0), 
this.checkForResume();
}, EditInterviewView.prototype.editAttendant = function(e) {
var attendant, edit_attendant_view, id, role;
if (e.preventDefault(), role = this.$(e.currentTarget).data("role"), id = this.$(e.currentTarget).data("id"), 
attendant = {}, "candidate" === role) _.each(this.model.get("candidates"), function() {
return function(candidate) {
return candidate.id && candidate.id === id ? attendant = candidate :void 0;
};
}(this)); else {
if ("interviewer" !== role) return;
_.each(this.model.get("interviewers"), function() {
return function(interviewer) {
return interviewer.id && interviewer.id === id ? attendant = interviewer :void 0;
};
}(this));
}
return attendant && _.isEmpty(attendant) ? void 0 :(edit_attendant_view = new AttendantEditModalView({
role:role,
attendant:attendant,
model:this.model,
parent:this
}), this.$("#modal-container").html(edit_attendant_view.render().el));
}, EditInterviewView.prototype.saveInterview = function(resume) {
var duration, end, endtime, starttime;
return starttime = new Date(moment.tz(moment($(".date.start").val() + " " + $(".time.start").val(), "M-D-YYYY HH:mm"), $("#timezones").val()).format()), 
duration = this.$("select[name=interview-duration]").val(), end = moment(starttime) + 6e4 * parseInt(duration), 
endtime = new Date(moment(end)), this.model.set("from", new Date(moment(starttime).tz($("#timezones").val() || HR.currentUser.get("timezone")).format())), 
this.model.set("to", new Date(moment(endtime).tz($("#timezones").val() || HR.currentUser.get("timezone")).format())), 
this.model.set("notes", this.$("textarea[name=interview-notes]").val()), this.model.set("resume", resume), 
this.model.save(null, {
success:function(_this) {
return function(model) {
var track_data;
return HR.NotificationModel.push("updated interview"), Backbone.history.navigate("interviews/" + model.get("id"), !0), 
_this.$("button[name=update-interview-button]").removeAttr("disabled"), _this.cancelBtn(null), 
_this.render(), track_data = {
interview_id:model.get("id")
}, HR.util.track("Edited Interview", track_data);
};
}(this),
error:function(_this) {
return function() {
return _this.$("button[name=update-interview-button]").removeAttr("disabled");
};
}(this)
});
}, EditInterviewView;
}(window.HR.GenericView), AttendantEditModalView = function(_super) {
function AttendantEditModalView() {
return AttendantEditModalView.__super__.constructor.apply(this, arguments);
}
return __extends(AttendantEditModalView, _super), AttendantEditModalView.prototype.template = "x/attendant-edit-modal", 
AttendantEditModalView.prototype.className = "attendant-edit-modal", AttendantEditModalView.prototype.initialize = function(options) {
return this.attendant = options.attendant, this.role = options.role, this.parent = options.parent;
}, AttendantEditModalView.prototype.events = function() {
return {
"submit form[name=edit-attendant-form]":"saveAttendant"
};
}, AttendantEditModalView.prototype.render = function() {
var content;
return content = HR.appController.template(this.template, this)({
attendant:this.attendant,
role:this.role
}), $(this.el).html(content), this.$("#attendant-edit-modal").modal(), this;
}, AttendantEditModalView.prototype.saveAttendant = function(e) {
var attendant_data, candidates, email, error, interviewers, name, phone;
return e.preventDefault(), name = this.$("input[name=name]").removeClass("error").val(), 
email = this.$("input[name=email]").removeClass("error").val(), phone = this.$("input[name=phone]").val(), 
error = !1, _.isEmpty(name) && (this.$("input[name=name]").addClass("error"), error = !0), 
(_.isEmpty(email) || !email.match(/^\S+@\S+?\.[a-zA-Z]{2,5}$/)) && (this.$("input[name=email]").addClass("error"), 
error = !0), error ? void 0 :(attendant_data = {
name:name,
email:email,
phone:phone
}, this.attendant.id ? (attendant_data.email = this.attendant.email, "interviewer" === this.role ? (interviewers = [], 
_.each(this.model.get("interviewers"), function(_this) {
return function(interviewer) {
var new_interviewer_data;
return interviewer.id === _this.attendant.id ? (new_interviewer_data = {}, _.extend(new_interviewer_data, interviewer, attendant_data), 
interviewers.push(new_interviewer_data)) :interviewers.push(interviewer);
};
}(this)), this.model.set("interviewers", interviewers, {
silent:!0
})) :"candidate" === this.role && (candidates = [], _.each(this.model.get("candidates"), function(_this) {
return function(candidate) {
var new_candidate_data;
return candidate.id === _this.attendant.id ? (new_candidate_data = {}, _.extend(new_candidate_data, candidate, attendant_data), 
candidates.push(new_candidate_data)) :candidates.push(candidate);
};
}(this)), this.model.set("candidates", candidates, {
silent:!0
}))) :(interviewers = this.model.get("interviewers"), interviewers.push(attendant_data), 
this.model.set("interviewers", interviewers, {
silent:!0
})), this.model.save(null, {
silent:!0,
success:function(_this) {
return function(model) {
var track_data;
return _this.$(".close").click(), _this.parent.render(), track_data = {
interview_id:model.get("id")
}, HR.util.track("Edited Interview", track_data);
};
}(this)
}));
}, AttendantEditModalView;
}(window.HR.GenericView), SharePadModalView = function(_super) {
function SharePadModalView() {
return SharePadModalView.__super__.constructor.apply(this, arguments);
}
return __extends(SharePadModalView, _super), SharePadModalView.prototype.template = "x/share-pad-modal", 
SharePadModalView.prototype.className = "share-pad-modal", SharePadModalView.prototype.events = function() {
return {
"submit form[name=share-pad-form]":"sharePad",
"click .js-close-modal":"closeModalEvent"
};
}, SharePadModalView.prototype.render = function() {
var config, content, that, track_data;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON()
}), track_data = {
step:"Start"
}, HR.util.track("Shared QuickPad", track_data), $(this.el).html(content), this.$("#share-pad-modal").modal(), 
config = {
skin:"moono",
extraPlugins:"image",
filebrowserUploadUrl:"/x/api/v1/editor_uploads",
toolbar:[ [ "Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "-", "NumberedList", "BulletedList", "-", "Link", "Unlink" ], [ "Styles", "Format", "FontSize" ], [ "PasteFromWord", "-", "Undo", "Redo" ], [ "Source" ] ],
toolbarCanCollapse:!1,
autoGrow_onStartup:!0,
width:720,
removePlugins:"elementspath,contextmenu,liststyle,tabletools",
disableNativeSpellChecker:!1
}, that = this, setTimeout(function() {
return CKEDITOR.instances["email-content"] && delete CKEDITOR.instances["email-content"], 
this.$("textarea.texteditor").ckeditor(config);
}), this;
}, SharePadModalView.prototype.closeModalEvent = function() {
var track_data;
return track_data = {
step:"Cancel"
}, HR.util.track("Shared QuickPad", track_data);
}, SharePadModalView.prototype.sharePad = function(e) {
var content, email, subject;
return e.preventDefault(), email = this.$("input[name=email]").removeClass("error").val(), 
subject = this.$("input[name=subject]").val(), content = this.$("textarea[name=email-content]").ckeditorGet().getData(), 
-1 === email.lastIndexOf(" ") && -1 !== email.lastIndexOf(".") && -1 !== email.lastIndexOf("@") && email.lastIndexOf(".") > email.lastIndexOf("@") ? (this.$(".send-email").attr("disabled", !0), 
this.$(".send-email").html("Sending..."), HR.util.ajaxmsg("Loading...", !1, !0, 1e3), 
$.post("/x/api/v1/interviews/share", {
email:email,
subject:subject,
content:content
}, function(_this) {
return function(data) {
var track_data;
return data.status === !0 ? (_this.$(".send-email").html("Mail sent"), HR.util.ajaxmsg("Mail sent", !1, !0, 5), 
_this.$(".close").click(), track_data = {
step:"Finish"
}, HR.util.track("Shared QuickPad", track_data)) :console.log("mail failed");
};
}(this))) :(this.$("input[name=email]").addClass("error"), void 0);
}, SharePadModalView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.EditInterviewView = EditInterviewView;
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
var DeleteInterviewModalView, HR, InterviewsDashboardView, InterviewsDataTableView, InterviewsDoneDataTableView, InterviewsDoneView, InterviewsListingView, InterviewsQuickPadDataTableView, InterviewsQuickPadView, InterviewsThumbsDownDataTableView, InterviewsThumbsDownView, InterviewsThumbsUpDataTableView, InterviewsThumbsUpView, InterviewsUpcomingDataTableView, InterviewsUpcomingView, range, val, _ref;
return val = function(v) {
return _.isFunction(v) ? v() :v;
}, range = function(val) {
var arr, ret;
return ret = val, val && (arr = val.split(/to/i), arr.length > 1 && (ret = arr[0].trim() + ".." + arr[1].trim())), 
ret;
}, InterviewsDataTableView = function(_super) {
function InterviewsDataTableView() {
return InterviewsDataTableView.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewsDataTableView, _super), InterviewsDataTableView.prototype.def = function() {
return {
template:"x/interviews-datatable",
dashboard:!1,
title:"Interviews",
page_url:"interviews",
url:"" + HR.INTERVIEWS_DOMAIN + "/api/interviews?auth_v2=" + HR.currentUser.get("auth_v2") + "&api_key=" + HR.currentUser.get("apiKey"),
modelClass:HR.InterviewModel,
quickpad:0
};
}, InterviewsDataTableView.prototype.baseParams = function() {
var ret;
return ret = {
order_by:"from",
quickpad:this.quickpad
}, range(this.$("#daterange").val()) && (ret.from = range(this.$("#daterange").val())), 
this.$("#email").val().length > 0 && ("all" === this.$("#email-type").val() && (this.all_toggle ? ret["interview_attendants.email"] = this.$("#email").val() :ret["user.email"] = this.$("#email").val()), 
"candidate" === this.$("#email-type").val() && (ret["interview_attendants.role"] = "candidate", 
ret["interview_attendants.email"] = this.$("#email").val()), "interviewer" === this.$("#email-type").val() && (ret["interview_attendants.role"] = "interviewer", 
ret["interview_attendants.email"] = this.$("#email").val()), "owner" === this.$("#email-type").val() && (ret["user.email"] = this.$("#email").val())), 
"" !== this.$("#quickpad-title").val() && (ret.title = this.$("#quickpad-title").val()), 
"0" !== this.$("#thumbs").val() && (ret.thumbs = parseInt(this.$("#thumbs").val() - 1)), 
ret;
}, InterviewsDataTableView.prototype.beforeRequest = function(params) {
var base;
return base = InterviewsDataTableView.__super__.beforeRequest.call(this, params), 
range(this.$("#daterange").val()) && (base.from = range(this.$("#daterange").val())), 
base;
}, InterviewsDataTableView.prototype.afterRequest = function(data, fields) {
return "all" === this.$("#email-type").val() && this.$("#email").val().length > 0 && !this.all_toggle ? (this.all_data = data, 
this.all_toggle = !0, this.redraw(), InterviewsDataTableView.__super__.afterRequest.call(this, data, fields)) :(this.all_data && this.all_data.results && _.each(this.all_data.results, function(item) {
return _.include(_.pluck(data.results, "id"), item.id) ? void 0 :(data.results.push(item), 
data.total += 1);
}), this.all_toggle = !1, InterviewsDataTableView.__super__.afterRequest.call(this, data, fields));
}, InterviewsDataTableView.prototype.fields = function() {
return [ {
name:"CANDIDATE",
template:'<span class="sleekstrong"><%= row.candidate() ? row.candidate().name : row.get("title") ? row.get("title") : "-" %></span>',
prop:"interview_attendants.name",
className:"w25"
}, {
name:"WHEN",
template:"<%= row.when()  %>",
prop:"from",
className:"w25"
}, {
name:"INTERVIEWER",
template:'<%= row.interviewer() ? row.interviewersName() : "-" %>',
prop:"interview_attendants.name",
className:"w25"
}, {
name:"OWNER",
template:'<%= row.owner() ? row.ownerName() : "-" %>',
prop:"user.firstname",
className:"w25"
} ];
}, InterviewsDataTableView.prototype.events = function() {
return {
"click .js-dateclear":"clearDateRange"
};
}, InterviewsDataTableView.prototype.datatableOpt = function() {
var opt;
return opt = InterviewsDataTableView.__super__.datatableOpt.call(this), this.dashboard ? _.extend(opt, {
sDom:"t i",
iDisplayLength:10
}) :_.extend(opt, {
sDom:"t <'clear_float'> <'empty_heightspacer'><'clear_float'><'mjL' l> p <'empty_heightspacer'><'clear_float'><'empty_heightspacer'><'clear_float'> "
}), opt;
}, InterviewsDataTableView.prototype.dateRanges = function() {
return {
"Last week":[ moment().add("days", -7), moment().format() ],
"Last 2 weeks":[ moment().add("days", -14), moment().format() ],
"Last 30 days":[ moment().add("days", -30), moment().format() ],
"This Month":[ moment().startOf("month"), moment().endOf("month") ],
"Last month":[ moment().subtract("month", 1).startOf("month"), moment().subtract("month", 1).endOf("month") ]
};
}, InterviewsDataTableView.prototype.clearDateRange = function(e) {
return e.preventDefault(), this.$("#daterange").val(""), $(e.currentTarget).addClass("hidden"), 
this.redraw(!1);
}, InterviewsDataTableView.prototype.selectOptions = function() {
return {
FILTER:"Filter",
ALL:"All",
LAST_MONTH:"Last Month",
LAST_100:"Last 100"
};
}, InterviewsDataTableView.prototype.params = function() {
var params;
return params = InterviewsDataTableView.__super__.params.call(this), _.extend(params, {
title:this.title,
quickpadView:!1,
showInterviewer:!0,
showDateSelect:!0,
showThumbs:!0,
showTitle:!1,
showSelect:!1,
selectOptions:val(this.selectOptions)
}), this.dashboard && _.extend(params, {
showTitle:!0,
showSelect:!1,
showDateSelect:!1,
showInterviewer:!1
}), params;
}, InterviewsDataTableView.prototype.onChoose = function() {
return "Choose" !== this.$("#choose").val() ? Backbone.history.navigate(this.page_url + "/" + this.$("#choose").val(), !0) :void 0;
}, InterviewsDataTableView.prototype.redraw = function(showClear) {
return null == showClear && (showClear = !0), showClear ? this.$(".js-filterclear").show() :this.$(".js-filterclear").hide(), 
HR.util.ajaxmsg("Loading...", !1, !0, 1e3), this.datatable.fnDraw();
}, InterviewsDataTableView.prototype.postRender = function() {
var all, data_store, that, url_map;
return InterviewsDataTableView.__super__.postRender.call(this), that = this, this.delegateEvents(), 
this.$("#email-type").select2({
width:"160px",
minimumResultsForSearch:-1
}), this.$("#email-type").on("change", function(_this) {
return function() {
return _this.redraw();
};
}(this)), this.$("#email-filter").on("submit", function(_this) {
return function(e) {
return e.preventDefault(), _this.redraw();
};
}(this)), this.$("#thumbs").select2({
width:"150px",
minimumResultsForSearch:-1
}), this.$("#thumbs").on("change", function(_this) {
return function() {
return _this.redraw();
};
}(this)), this.$(".js-filterclear").on("click", function() {
return function() {
return Backbone.history.loadUrl(Backbone.history.fragment);
};
}(this)), this.$("#daterange").length > 0 && this.$("#daterange").daterangepicker({
latestDate:"today",
separator:" to ",
format:"YYYY-MM-DD",
ranges:val(this.dateRanges)
}, function() {
return that.$(".js-dateclear").removeClass("hidden"), that.redraw();
}), url_map = {
owner:"" + HR.INTERVIEWS_DOMAIN + "/api/interviews/owners?auth_v2=" + HR.currentUser.get("auth_v2") + "&api_key=" + HR.currentUser.get("apiKey") + "&quickpad=" + this.quickpad,
candidate:"" + HR.INTERVIEWS_DOMAIN + "/api/candidates?auth_v2=" + HR.currentUser.get("auth_v2") + "&api_key=" + HR.currentUser.get("apiKey"),
interviewer:"" + HR.INTERVIEWS_DOMAIN + "/api/interviewers?auth_v2=" + HR.currentUser.get("auth_v2") + "&api_key=" + HR.currentUser.get("apiKey")
}, data_store = {
owner:[],
candidate:[],
interviewer:[]
}, all = [], _.each(url_map, function(_this) {
return function(val, type) {
return $.ajax({
url:val,
data:{
"interview.from":_this.baseParams().from
},
dataType:"json",
crossDomain:!0,
xhrFields:{
withCredentials:!0
},
success:function(data) {
return _.each(data.results, function(row) {
var item;
return row.email && (item = {
value:row.email,
label:(row.name ? row.name + "-" :"") + row.email
}, data_store[type].push(item), !_.include(_.pluck(all, "value"), row.email)) ? all.push(item) :void 0;
});
}
});
};
}(this)), data_store.all = all, this.$("#email").autocomplete({
minLength:0,
source:function(query, cb) {
var results;
return results = $.grep(data_store[that.$("#email-type").val()], function(item) {
return item.label.toLowerCase().indexOf(query.term.toLowerCase()) >= 0;
}), cb(results);
},
select:function() {
return setTimeout(that.redraw, 100);
}
}), $("#email").data("autocomplete")._renderItem = function(ul, item) {
return ul.addClass("no-padding").addClass("autocomplete"), $("<li></li>").data("item.autocomplete", item).html("<a class='' href='#'>" + item.label + "</a>").appendTo(ul);
}, this;
}, InterviewsDataTableView;
}(window.HR.DataTableView), InterviewsListingView = function(_super) {
function InterviewsListingView() {
return InterviewsListingView.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewsListingView, _super), InterviewsListingView.prototype.template = "x/interviews-listing", 
InterviewsListingView.prototype.setAsync = function(async) {
this.async = async;
}, InterviewsListingView.prototype.initialize = function(options) {
var klass;
return null == options && (options = {}), _.bindAll(this), this.title = options.title || "Interviews Listing", 
klass = options.klass || HR.InterviewsDataTableView, this.table = new klass({
dashboard:!1,
title:this.title
});
}, InterviewsListingView.prototype._render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
title:this.title
})), HR.currentUser.isLocked() && this.$(".account-locked").removeClass("hidden"), 
this.async || this.$("#cnt-list").append(this.table.render().el), this;
}, InterviewsListingView;
}(window.HR.GenericView), InterviewsDoneView = function(_super) {
function InterviewsDoneView() {
return InterviewsDoneView.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewsDoneView, _super), InterviewsDoneView.prototype.initialize = function(options) {
return null == options && (options = {}), options.klass = HR.InterviewsDoneDataTableView, 
options.title = "Interviews Done", InterviewsDoneView.__super__.initialize.call(this, options);
}, InterviewsDoneView;
}(InterviewsListingView), InterviewsDoneDataTableView = function(_super) {
function InterviewsDoneDataTableView() {
return InterviewsDoneDataTableView.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewsDoneDataTableView, _super), InterviewsDoneDataTableView.prototype.initialize = function(options) {
var customDatatableOpt;
return customDatatableOpt = {
oLanguage:{
sEmptyTable:"No interviews in the done stage",
sInfoEmpty:"No interviews in the done stage",
sZeroRecords:"No interviews in the done stage"
},
fnRowCallback:function() {
return function(node) {
return $(node).find("td:not(:last)").each(function(i, ele) {
return $(ele).on("click", function(e) {
return HR.router.navigate($(e.currentTarget).parent().find(".nav-viewreport").attr("href"), !0);
});
});
};
}(this)
}, options.customDatatableOpt ? _.extend(customDatatableOpt, options.customDatatableOpt) :options.customDatatableOpt = customDatatableOpt, 
InterviewsDoneDataTableView.__super__.initialize.call(this, options);
}, InterviewsDoneDataTableView.prototype.def = function() {
var def;
return def = InterviewsDoneDataTableView.__super__.def.call(this), _.extend(def, {
url:"" + HR.INTERVIEWS_DOMAIN + "/api/interviews/done?auth_v2=" + HR.currentUser.get("auth_v2") + "&api_key=" + HR.currentUser.get("apiKey"),
page_url:"/x/interviews/done",
title:"INTERVIEWS DONE"
});
}, InterviewsDoneDataTableView.prototype.datatableEl = "#datatable-done", InterviewsDoneDataTableView.prototype.params = function() {
var base;
return base = InterviewsDoneDataTableView.__super__.params.call(this), base.id_suffix = "-done", 
base;
}, InterviewsDoneDataTableView.prototype.baseParams = function() {
var params;
return params = InterviewsDoneDataTableView.__super__.baseParams.call(this), _.extend(params, {
from:".." + JSON.stringify(new Date()).replace(/"/gi, ""),
order_by:"from",
order_dir:"desc"
}), params;
}, InterviewsDoneDataTableView.prototype.fields = function() {
var fields;
return fields = InterviewsDoneDataTableView.__super__.fields.call(this), fields.push({
name:"STATUS",
template:'<% var thumbs = row.get("thumbs"); if (thumbs == 1) { %><span class="thumbs_up"><i class="icon2-thumbsup"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><% } else if (thumbs == 0) { %><span class="thumbs_down"><i class="icon2-thumbsdown"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><% } else { %>Pending<% } %>',
prop:"status",
className:"w10"
}, {
name:"REPORT/LINK",
template:'<a href="interviews/<%= row.get("id") %>/report" class="txt-alt-grey mdL nav-viewreport js-backbone">\n  <i class="icon-eye tip" data-original-title="View Report"></i>\n</a>\n<a href="#" class="txt-alt-grey mdL js-share" data-id="<%= row.get("id") %>">\n  <i class="icon2-sharetest tip" data-original-title="Share"></i>\n</a>',
sortable:!1,
className:"w10",
sortable:!1
}), fields;
}, InterviewsDoneDataTableView.prototype.shareReport = function(ev) {
var result, share_modal;
return ev.preventDefault(), result = _.filter(this.data.models, function(row) {
return row.get("id").toString() === $(ev.currentTarget).attr("data-id");
}), result.length ? (share_modal = new HR.InterviewShareReportModalView({
link:HR.InterviewModel.shareReportLink(result[0]),
model:result[0]
}), $(".modal-container").html(share_modal.render().el)) :void 0;
}, InterviewsDoneDataTableView.prototype.events = function() {
var ob;
return ob = InterviewsDoneDataTableView.__super__.events.call(this) || {}, _.extend(ob, {
"click a.js-share":"shareReport"
}), ob;
}, InterviewsDoneDataTableView;
}(InterviewsDataTableView), InterviewsQuickPadView = function(_super) {
function InterviewsQuickPadView() {
return InterviewsQuickPadView.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewsQuickPadView, _super), InterviewsQuickPadView.prototype.initialize = function(options) {
return null == options && (options = {}), options.klass = HR.InterviewsQuickPadDataTableView, 
options.title = "QuickPad Interviews", InterviewsQuickPadView.__super__.initialize.call(this, options);
}, InterviewsQuickPadView;
}(InterviewsListingView), InterviewsQuickPadDataTableView = function(_super) {
function InterviewsQuickPadDataTableView() {
return InterviewsQuickPadDataTableView.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewsQuickPadDataTableView, _super), InterviewsQuickPadDataTableView.prototype.initialize = function(options) {
var customDatatableOpt;
return customDatatableOpt = {
oLanguage:{
sEmptyTable:"No quickpads generated yet!",
sInfoEmpty:"No quickpads generated yet!",
sZeroRecords:"No quickpads generated yet!"
},
fnRowCallback:function() {
return function(node) {
return $(node).find("td:not(:last)").each(function(i, ele) {
return $(ele).on("click", function(e) {
return HR.router.navigate($(e.currentTarget).parent().find(".nav-edit").attr("href"), !0);
});
});
};
}(this)
}, options.customDatatableOpt ? _.extend(customDatatableOpt, options.customDatatableOpt) :options.customDatatableOpt = customDatatableOpt, 
InterviewsQuickPadDataTableView.__super__.initialize.call(this, options);
}, InterviewsQuickPadDataTableView.prototype.def = function() {
var def;
return def = InterviewsQuickPadDataTableView.__super__.def.call(this), _.extend(def, {
page_url:"/x/interviews/quickpad",
title:"INTERVIEWS QUICKPADS",
quickpad:1
});
}, InterviewsQuickPadDataTableView.prototype.dateRanges = function() {
return {
"Past week":[ moment().format(), moment().subtract("days", 7) ],
"Next week":[ moment().format(), moment().add("days", 7) ],
"Next 2 weeks":[ moment().format(), moment().add("days", 14) ],
"Next 30 days":[ moment().format(), moment().add("days", 30) ],
"This Month":[ moment(), moment().endOf("month") ],
"Next month":[ moment().add("month", 1).startOf("month"), moment().add("month", 1).endOf("month") ]
};
}, InterviewsQuickPadDataTableView.prototype.selectOptions = function() {
return {
FILTER:"Filter",
ALL:"All",
NEXT_MONTH:"Next Month",
NEXT_100:"Next 100"
};
}, InterviewsQuickPadDataTableView.prototype.datatableEl = "#datatable-quickpads", 
InterviewsQuickPadDataTableView.prototype.params = function() {
var base;
return base = InterviewsQuickPadDataTableView.__super__.params.call(this), base.id_suffix = "-quickpads", 
base.quickpadView = !0, base;
}, InterviewsQuickPadDataTableView.prototype.baseParams = function() {
var base;
return base = InterviewsQuickPadDataTableView.__super__.baseParams.call(this), _.defaults(base, {
quickpad:1,
order_by:"created_at"
}), base;
}, InterviewsQuickPadDataTableView.prototype.fields = function() {
var fields;
return fields = [ {
name:'<span class="mjL">TITLE</span>',
template:'<span class="mjL"><%= row.get("title") %></span>',
prop:"title",
className:"w10"
}, {
name:"LINK",
template:'<a href="<%= row.get("interviewer_url") %>" target="_blank">[Link]</a>',
prop:"interviewer_url",
className:"w10",
sortable:!1
}, {
name:"ACCESS CODE",
template:'<%= row.get("access_code") %>',
prop:"access_code",
className:"w10",
sortable:!1
}, {
name:"OWNER",
template:'<%= row.owner() ? row.ownerName() : "-" %>',
prop:"user.firstname",
className:"w25"
}, {
name:"CREATED ON",
template:"<%= row.createdOn() %>",
prop:"created_at",
className:"w25"
}, {
name:"EDIT/REPORT/DELETE",
template:'<a href="interviews/<%= row.get("id") %>" class="txt-alt-grey mdL js-backbone nav-edit"><i class="icon2-edit tip" data-original-title="Edit"></i></a><a href="interviews/<%= row.get("id") %>/report" class="txt-alt-grey mdL js-backbone"><i class="icon-eye tip" data-original-title="View Report"></i></a><a href="#" class="txt-alt-grey mdL cancel js-delete-interview" data-interview="<%= row.get("id") %>"><i class="icon2-delete tip" data-original-title="Delete"></i></a>',
sortable:!1,
className:"w10",
sortable:!1
} ];
}, InterviewsQuickPadDataTableView.prototype.cancelInterview = function(ev) {
var delete_modal, result;
return ev.preventDefault(), result = _.filter(this.data.models, function(row) {
return row.get("id").toString() === $(ev.currentTarget).attr("data-interview");
}), result.length ? (delete_modal = new HR.DeleteInterviewModalView({
model:result[0],
parent:this
}), $(".modal-container").html(delete_modal.render().el)) :void 0;
}, InterviewsQuickPadDataTableView.prototype.events = function() {
var ob;
return ob = InterviewsQuickPadDataTableView.__super__.events.call(this) || {}, _.extend(ob, {
"click a.js-delete-interview":"cancelInterview"
}), ob;
}, InterviewsQuickPadDataTableView.prototype.postRender = function() {
return InterviewsQuickPadDataTableView.__super__.postRender.call(this), this.$("#quickpad-name-filter").on("submit", function(_this) {
return function(e) {
return e.preventDefault(), _this.redraw();
};
}(this));
}, InterviewsQuickPadDataTableView;
}(InterviewsDataTableView), InterviewsUpcomingView = function(_super) {
function InterviewsUpcomingView() {
return InterviewsUpcomingView.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewsUpcomingView, _super), InterviewsUpcomingView.prototype.initialize = function(options) {
return null == options && (options = {}), options.klass = HR.InterviewsUpcomingDataTableView, 
options.title = "Upcoming Interviews", InterviewsUpcomingView.__super__.initialize.call(this, options);
}, InterviewsUpcomingView;
}(InterviewsListingView), InterviewsUpcomingDataTableView = function(_super) {
function InterviewsUpcomingDataTableView() {
return InterviewsUpcomingDataTableView.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewsUpcomingDataTableView, _super), InterviewsUpcomingDataTableView.prototype.initialize = function(options) {
var customDatatableOpt;
return customDatatableOpt = {
oLanguage:{
sEmptyTable:'No interviews are upcoming. <br/><a class="btn fnt-sz-normal mdB msT js-backbone" href="interviews/new" id="scheduleInterview">Schedule a new Interview</a>',
sInfoEmpty:'No interviews are upcoming. <br/><a class="btn fnt-sz-normal mdB msT js-backbone" href="interviews/new" id="scheduleInterview">Schedule a new Interview</a>',
sZeroRecords:'No interviews are upcoming. <br/><a class="btn fnt-sz-normals mdB msT js-backbone" href="interviews/new" id="scheduleInterview">Schedule a new Interview</a>'
},
fnRowCallback:function() {
return function(node) {
return $(node).find("td:not(:last)").each(function(i, ele) {
return $(ele).on("click", function(e) {
return HR.router.navigate($(e.currentTarget).parent().find(".nav-edit").attr("href"), !0);
});
});
};
}(this)
}, options.customDatatableOpt ? _.extend(customDatatableOpt, options.customDatatableOpt) :options.customDatatableOpt = customDatatableOpt, 
InterviewsUpcomingDataTableView.__super__.initialize.call(this, options);
}, InterviewsUpcomingDataTableView.prototype.def = function() {
var def;
return def = InterviewsUpcomingDataTableView.__super__.def.call(this), _.extend(def, {
page_url:"/x/interviews/upcoming",
title:"INTERVIEWS UPCOMING"
});
}, InterviewsUpcomingDataTableView.prototype.dateRanges = function() {
return {
"Next week":[ moment().format(), moment().add("days", 7) ],
"Next 2 weeks":[ moment().format(), moment().add("days", 14) ],
"Next 30 days":[ moment().format(), moment().add("days", 30) ],
"This Month":[ moment(), moment().endOf("month") ],
"Next month":[ moment().add("month", 1).startOf("month"), moment().add("month", 1).endOf("month") ]
};
}, InterviewsUpcomingDataTableView.prototype.selectOptions = function() {
return {
FILTER:"Filter",
ALL:"All",
NEXT_MONTH:"Next Month",
NEXT_100:"Next 100"
};
}, InterviewsUpcomingDataTableView.prototype.datatableEl = "#datatable-upcoming", 
InterviewsUpcomingDataTableView.prototype.params = function() {
var base;
return base = InterviewsUpcomingDataTableView.__super__.params.call(this), base.id_suffix = "-upcoming", 
base;
}, InterviewsUpcomingDataTableView.prototype.baseParams = function() {
var base;
return base = InterviewsUpcomingDataTableView.__super__.baseParams.call(this), _.defaults(base, {
from:JSON.stringify(new Date()).replace(/"/gi, "") + "..",
current_status:0,
quickpad:!1
}), base;
}, InterviewsUpcomingDataTableView.prototype.fields = function() {
var fields;
return fields = InterviewsUpcomingDataTableView.__super__.fields.call(this), fields.push({
name:"EDIT/VISIT/DELETE",
template:'<a href="interviews/<%= row.get("id") %>" class="txt-alt-grey mdL js-backbone nav-edit">\n  <i class="icon2-edit tip"  data-original-title="Edit"></i>\n</a>\n<a href="<%= row.get("paperurl") %>" class="txt-alt-grey mdL" target="_blank">\n  <i class="icon-globe tip"  data-original-title="Visit"></i>\n</a>\n<a href="#" class="txt-alt-grey mdL cancel js-delete-interview" data-interview="<%= row.get("id") %>">\n  <i class="icon2-delete tip"  data-original-title="Delete"></i>\n</a>',
sortable:!1,
className:"w10",
sortable:!1
}), fields;
}, InterviewsUpcomingDataTableView.prototype.cancelInterview = function(ev) {
var delete_modal, result;
return ev.preventDefault(), result = _.filter(this.data.models, function(row) {
return row.get("id").toString() === $(ev.currentTarget).attr("data-interview");
}), result.length ? (delete_modal = new HR.DeleteInterviewModalView({
model:result[0],
parent:this
}), $(".modal-container").html(delete_modal.render().el)) :void 0;
}, InterviewsUpcomingDataTableView.prototype.events = function() {
var ob;
return ob = InterviewsUpcomingDataTableView.__super__.events.call(this) || {}, _.extend(ob, {
"click a.js-delete-interview":"cancelInterview"
}), ob;
}, InterviewsUpcomingDataTableView;
}(InterviewsDataTableView), InterviewsThumbsUpView = function(_super) {
function InterviewsThumbsUpView() {
return InterviewsThumbsUpView.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewsThumbsUpView, _super), InterviewsThumbsUpView.prototype.initialize = function(options) {
return null == options && (options = {}), options.klass = HR.InterviewsThumbsUpDataTableView, 
options.title = "Thumbs up", InterviewsThumbsUpView.__super__.initialize.call(this, options);
}, InterviewsThumbsUpView;
}(InterviewsListingView), InterviewsThumbsUpDataTableView = function(_super) {
function InterviewsThumbsUpDataTableView() {
return InterviewsThumbsUpDataTableView.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewsThumbsUpDataTableView, _super), InterviewsThumbsUpDataTableView.prototype.initialize = function(options) {
var customDatatableOpt;
return customDatatableOpt = {
oLanguage:{
sEmptyTable:"No interviews in the thumbs up",
sInfoEmpty:"No interviews in the thumbs up",
sZeroRecords:"No interviews in the thumbs up"
}
}, options.customDatatableOpt = customDatatableOpt, InterviewsThumbsUpDataTableView.__super__.initialize.call(this, options);
}, InterviewsThumbsUpDataTableView.prototype.def = function() {
var def;
return def = InterviewsThumbsUpDataTableView.__super__.def.call(this), _.extend(def, {
page_url:"/x/interviews/upcoming",
title:"Thumbs up"
}), def;
}, InterviewsThumbsUpDataTableView.prototype.datatableEl = "#datatable-thumbsup", 
InterviewsThumbsUpDataTableView.prototype.params = function() {
var base;
return base = InterviewsThumbsUpDataTableView.__super__.params.call(this), base.id_suffix = "-thumbsup", 
base;
}, InterviewsThumbsUpDataTableView.prototype.baseParams = function() {
var params;
return params = InterviewsThumbsUpDataTableView.__super__.baseParams.call(this), 
_.extend(params, {
thumbs:1
}), params;
}, InterviewsThumbsUpDataTableView;
}(InterviewsDoneDataTableView), InterviewsThumbsDownView = function(_super) {
function InterviewsThumbsDownView() {
return InterviewsThumbsDownView.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewsThumbsDownView, _super), InterviewsThumbsDownView.prototype.initialize = function(options) {
return null == options && (options = {}), options.klass = HR.InterviewsThumbsDownDataTableView, 
options.title = "Thumbs up", InterviewsThumbsDownView.__super__.initialize.call(this, options);
}, InterviewsThumbsDownView;
}(InterviewsListingView), InterviewsThumbsDownDataTableView = function(_super) {
function InterviewsThumbsDownDataTableView() {
return InterviewsThumbsDownDataTableView.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewsThumbsDownDataTableView, _super), InterviewsThumbsDownDataTableView.prototype.initialize = function(options) {
var customDatatableOpt;
return customDatatableOpt = {
oLanguage:{
sEmptyTable:"No interviews in the thumbs down",
sInfoEmpty:"No interviews in the thumbs down",
sZeroRecords:"No interviews in the thumbs down"
}
}, options.customDatatableOpt = customDatatableOpt, InterviewsThumbsDownDataTableView.__super__.initialize.call(this, options);
}, InterviewsThumbsDownDataTableView.prototype.def = function() {
var def;
return def = InterviewsThumbsDownDataTableView.__super__.def.call(this), _.extend(def, {
page_url:"/x/interviews/upcoming",
title:"Thumbs up"
}), def;
}, InterviewsThumbsDownDataTableView.prototype.baseParams = function() {
var params;
return params = InterviewsThumbsDownDataTableView.__super__.baseParams.call(this), 
_.extend(params, {
thumbs:0
}), params;
}, InterviewsThumbsDownDataTableView.prototype.datatableEl = "#datatable-thumbsdown", 
InterviewsThumbsDownDataTableView.prototype.params = function() {
var base;
return base = InterviewsThumbsDownDataTableView.__super__.params.call(this), base.id_suffix = "-thumbsdown", 
base;
}, InterviewsThumbsDownDataTableView;
}(InterviewsDoneDataTableView), InterviewsDashboardView = function(_super) {
function InterviewsDashboardView() {
return InterviewsDashboardView.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewsDashboardView, _super), InterviewsDashboardView.prototype.template = "x/interviews-dashboard", 
InterviewsDashboardView.prototype.initialize = function(options) {
return InterviewsDashboardView.__super__.initialize.call(this, options), _.bindAll(this, "render"), 
this.collection.bind("reset", this.render, this), this.collection.bind("change", this.render, this), 
this._subviews = [], this.upcoming = new InterviewsUpcomingDataTableView({
dashboard:!0,
customDatatableOpt:{
oLanguage:{
sEmptyTable:"No interviews are upcoming.",
sInfoEmpty:"No interviews are upcoming. ",
sZeroRecords:"No interviews are upcoming. ",
sInfo:"Showing _START_ to _END_ of _TOTAL_. Click <a href='interviews/upcoming' class='js-backbone'>here</a> to view all "
},
fnRowCallback:function() {
return function(node) {
return $(node).find("td:not(:last)").each(function(i, ele) {
return $(ele).on("click", function(e) {
return HR.router.navigate($(e.currentTarget).parent().find(".nav-edit").attr("href"), !0);
});
});
};
}(this)
}
}), this.done = new InterviewsDoneDataTableView({
dashboard:!0,
customDatatableOpt:{
showAfterFetch:!0,
oLanguage:{
sInfo:"Showing _START_ to _END_ of _TOTAL_. Click <a href='interviews/done' class='js-backbone'>here</a> to view all "
},
fnRowCallback:function() {
return function(node) {
return $(node).find("td:not(:last)").each(function(i, ele) {
return $(ele).on("click", function(e) {
return HR.router.navigate($(e.currentTarget).parent().find(".nav-viewreport").attr("href"), !0);
});
});
};
}(this)
}
}), this._subviews = [ this.done, this.upcoming ];
}, InterviewsDashboardView.prototype.setAsync = function(async) {
this.async = async;
}, InterviewsDashboardView.prototype.events = function() {
return {
"click .tour-leg":"tour",
"click .rt_content_wrap":"closeModal",
"click .onboard-tour-container":"disableCloseModal",
"click .common_margin":"closeModal"
};
}, InterviewsDashboardView.prototype._render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
len:this.collection.models.length
})), 0 === this.collection.models.length || this.async || (this.$("#cnt-upcoming").append(this.upcoming.render().el), 
this.$("#cnt-done").append(this.done.render().el)), HR.currentUser.isLocked() && this.$(".account-locked").removeClass("hidden"), 
this;
}, InterviewsDashboardView;
}(window.HR.GenericView), DeleteInterviewModalView = function(_super) {
function DeleteInterviewModalView() {
return DeleteInterviewModalView.__super__.constructor.apply(this, arguments);
}
return __extends(DeleteInterviewModalView, _super), DeleteInterviewModalView.prototype.template = "x/delete-interview-modal", 
DeleteInterviewModalView.prototype.className = "delete-interview-modal", DeleteInterviewModalView.prototype.initialize = function(options) {
return this.parent = options.parent, DeleteInterviewModalView.__super__.initialize.call(this, options);
}, DeleteInterviewModalView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON()
}), $(this.el).html(content), this.$("#delete-interview-modal").modal(), this;
}, DeleteInterviewModalView.prototype.events = function() {
return {
"click a.js-cancel-interview":"cancelInterview"
};
}, DeleteInterviewModalView.prototype.cancelInterview = function(e) {
return e.preventDefault(), HR.util.ajaxmsg("Loading...", !1, !0, 1e3), this.model.destroy({
success:function(_this) {
return function() {
var track_data;
return HR.util.ajaxmsg("", !1, !0, 0), _this.$(".close").click(), _this.parent.redraw(), 
track_data = {
interview_id:_this.model.get("id")
}, HR.util.track("Deleted Interview", track_data);
};
}(this)
});
}, DeleteInterviewModalView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.InterviewsDataTableView = InterviewsDataTableView, 
HR.InterviewsListingView = InterviewsListingView, HR.InterviewsDoneView = InterviewsDoneView, 
HR.InterviewsDoneDataTableView = InterviewsDoneDataTableView, HR.InterviewsUpcomingView = InterviewsUpcomingView, 
HR.InterviewsUpcomingDataTableView = InterviewsUpcomingDataTableView, HR.InterviewsQuickPadView = InterviewsQuickPadView, 
HR.InterviewsQuickPadDataTableView = InterviewsQuickPadDataTableView, HR.InterviewsThumbsUpView = InterviewsThumbsUpView, 
HR.InterviewsThumbsUpDataTableView = InterviewsThumbsUpDataTableView, HR.InterviewsThumbsDownDataTableView = InterviewsThumbsDownDataTableView, 
HR.InterviewsThumbsDownView = InterviewsThumbsDownView, HR.InterviewsDashboardView = InterviewsDashboardView, 
HR.DeleteInterviewModalView = DeleteInterviewModalView;
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
var HR, InterviewAttendantEditView, NewInterviewView, _ref;
return NewInterviewView = function(_super) {
function NewInterviewView() {
return NewInterviewView.__super__.constructor.apply(this, arguments);
}
return __extends(NewInterviewView, _super), NewInterviewView.prototype.initialize = function() {
var from, that, to;
return that = this, from = moment().minutes(0).seconds(0).milliseconds(0).add("hours", 1), 
to = moment(from).add("hours", 1), this.model = new HR.InterviewModel({
from:new Date(from),
to:new Date(to)
});
}, NewInterviewView.prototype.template = "x/interview-new", NewInterviewView.prototype.className = "interview-new", 
NewInterviewView.prototype.events = function() {
return {
"submit form[name=quick-pad-form]":"createQuickPad",
"click .js-add-interviewer":"addInterviewer",
"submit form[name=schedule-interview-form]":"scheduleInterview"
};
}, NewInterviewView.prototype.render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
throbber:HR.appController.viewLoader(),
model:this.model.toJSON(),
time_diff:(this.model.get("to").getTime() - this.model.get("from").getTime()) / 6e4
}), $(this.el).html(content), this.setupTimezoneSelect(), this.renderAttendants(), 
this.$("input[type=file]").bootstrapFileInput(), this.$(".date.start").datepicker({
format:"m-d-yyyy",
autoclose:!0
}), this.$(".time.start").timepicker({
showDuration:!0,
timeFormat:"H:i",
scrollDefaultNow:!0
}), HR.currentUser.isLocked() && this.$(".account-locked").removeClass("hidden"), 
this;
}, NewInterviewView.prototype.renderAttendants = function() {
var candidate_view, interviewer_view;
return candidate_view = new HR.InterviewAttendantEditView({
attendant:{},
role:"candidate",
add:!0
}), this.$("#interview-candidates-container").html(candidate_view.render().el), 
interviewer_view = new HR.InterviewAttendantEditView({
attendant:{},
role:"interviewer",
add:!0
}), this.$("#interview-interviewers-container").html(interviewer_view.render().el);
}, NewInterviewView.prototype.setupTimezoneSelect = function() {
var that;
return that = this, setTimeout(function() {
return $.ajax({
url:"/x/api/v1/users/timezones",
type:"GET",
success:function(response) {
return $("#timezones").select2({
width:"off",
data:response.data
});
}
});
});
}, NewInterviewView.prototype.addInterviewer = function(e) {
var interviewer_view;
return e.preventDefault(), interviewer_view = new HR.InterviewAttendantEditView({
attendant:{},
role:"interviewer",
add:!1
}), this.$("#interview-interviewers-container").append(interviewer_view.render().el);
}, NewInterviewView.prototype.createQuickPad = function(e) {
var from, name, save_data, to;
return e.preventDefault(), this.$("button[name=quick-pad-button]").attr("disabled", !0), 
name = this.$("input[name=quick-pad-title]").removeClass("error").val(), name ? (from = new Date(moment().add("minutes", 15)), 
to = moment(from).add("hours", 1), save_data = {
quickpad:!0,
title:name,
from:from,
to:to
}, this.model.save(save_data, {
success:function() {
return function(model) {
var track_data;
return HR.NotificationModel.push("new interview"), track_data = {
type:"QuickPad",
step:"Finish"
}, HR.util.track("Created Interview", track_data), HR.util.trackTotango("Created Interview - Quickpad", "Interviews"), 
Backbone.history.navigate("interviews/" + model.get("id"), !0);
};
}(this),
error:function() {
return function() {};
}(this)
})) :(this.$("button[name=quick-pad-button]").attr("disabled", !1), this.$("input[name=quick-pad-title]").addClass("error"));
}, NewInterviewView.prototype.validate = function() {
var return_val;
return return_val = !0, this.$(".error.data").hide(), this.$(".date.start").removeClass("error"), 
_.each(this.$(".js-candidate-edit"), function() {
return function(section) {
var email, name;
return email = $(section).find("input[name=email]").removeClass("error").val(), 
email && email.match(/^\S+@\S+?\.[a-zA-Z]{2,5}$/) || ($(section).find("input[name=email]").addClass("error"), 
return_val = !1), name = $(section).find("input[name=name]").removeClass("error").val(), 
name ? void 0 :($(section).find("input[name=name]").addClass("error"), return_val = !1);
};
}(this)), _.each(this.$(".js-interviewer-edit"), function() {
return function(section) {
var email, name;
return email = $(section).find("input[name=email]").removeClass("error").val(), 
email && email.match(/^\S+@\S+?\.[a-zA-Z]{2,5}$/) || ($(section).find("input[name=email]").addClass("error"), 
return_val = !1), name = $(section).find("input[name=name]").removeClass("error").val(), 
name ? void 0 :($(section).find("input[name=name]").addClass("error"), return_val = !1);
};
}(this)), return_val;
}, NewInterviewView.prototype.checkForResume = function() {
var $form, paramTwo, submitUrl, that;
return this.$("input[name=resume]").val() ? (submitUrl = "/x/api/v1/users/upload_codepair_resume", 
$form = this.$("form[name=schedule-interview-form]"), paramTwo = function() {
var returnValue;
return returnValue = {
type:"POST",
files:$form.find(":file"),
iframe:!0,
crossDomain:!0
};
}, that = this, $.ajax(submitUrl, paramTwo()).complete(function(_this) {
return function(data) {
return data = $.parseJSON(data.responseText), "Success" === data.message ? _this.saveInterview(data.upload_path) :(_this.$("button[name=schedule-interview-button]").attr("disabled", !1), 
_this.$(".file-upload-error").html(data.message));
};
}(this))) :this.model.get("resume") ? this.saveInterview(this.model.get("resume")) :this.saveInterview("");
}, NewInterviewView.prototype.scheduleInterview = function(e) {
return e.preventDefault(), this.$("button[name=schedule-interview-button]").attr("disabled", !0), 
this.validate() ? this.checkForResume() :(this.$("button[name=schedule-interview-button]").attr("disabled", !1), 
void 0);
}, NewInterviewView.prototype.saveInterview = function(resume) {
var candidates, duration, end, endtime, interviewers, starttime;
return candidates = [], _.each(this.$(".js-candidate-edit"), function() {
return function(section) {
var candidate, email, name, phone_number;
return email = $(section).find("input[name=email]").val(), name = $(section).find("input[name=name]").val(), 
phone_number = $(section).find("input[name=phone_number]").val(), candidate = {
name:name,
email:email,
phone:phone_number
}, candidates.push(candidate);
};
}(this)), this.model.set("candidates", candidates), interviewers = [], _.each(this.$(".js-interviewer-edit"), function() {
return function(section) {
var email, interviewer, name, phone_number;
return email = $(section).find("input[name=email]").val(), name = $(section).find("input[name=name]").val(), 
phone_number = $(section).find("input[name=phone_number]").val(), interviewer = {
name:name,
email:email,
phone:phone_number
}, interviewers.push(interviewer);
};
}(this)), this.model.set("interviewers", interviewers), starttime = new Date(moment.tz(moment($(".date.start").val() + " " + $(".time.start").val(), "M-D-YYYY HH:mm"), $("#timezones").val()).format()), 
duration = this.$("select[name=interview-duration]").val(), end = moment(starttime) + 6e4 * parseInt(duration), 
endtime = new Date(moment(end)), this.model.set("from", moment(starttime).tz($("#timezones").val() || HR.currentUser.get("timezone")).format()), 
this.model.set("to", moment(endtime).tz($("#timezones").val() || HR.currentUser.get("timezone")).format()), 
this.model.set("notes", this.$("textarea[name=interview-notes]").val()), this.model.set("resume", resume), 
this.model.save(null, {
success:function() {
return function() {
var track_data;
return HR.NotificationModel.push("new interview"), track_data = {
type:"Schedule",
step:"Finish"
}, HR.util.track("Created Interview", track_data), HR.util.trackTotango("Created Interview - Scheduled", "Interviews"), 
Backbone.history.navigate("interviews", !0);
};
}(this),
error:function(_this) {
return function(model, xhr) {
var resp;
return _this.$("button[name=schedule-interview-button]").attr("disabled", !1), resp = JSON.parse(xhr.responseText), 
resp && resp.from ? (_this.$(".date.start").addClass("error"), _this.$(".error.data").text("Interview cannot be scheduled for past time.").show()) :_this.$(".error.data").text("Some error occuered.").show();
};
}(this)
});
}, NewInterviewView;
}(window.HR.GenericView), InterviewAttendantEditView = function(_super) {
function InterviewAttendantEditView() {
return InterviewAttendantEditView.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewAttendantEditView, _super), InterviewAttendantEditView.prototype.template = "x/interview-attendant-edit", 
InterviewAttendantEditView.prototype.className = "block", InterviewAttendantEditView.prototype.tagName = "div", 
InterviewAttendantEditView.prototype.initialize = function(options) {
return this.attendant = options.attendant, this.role = options.role, this.add = options.add;
}, InterviewAttendantEditView.prototype.render = function() {
var content;
return content = HR.appController.template(this.template, this)({
throbber:HR.appController.viewLoader(),
attendant:this.attendant,
add:this.add,
role:this.role
}), $(this.el).html(content), $(this.el).addClass("js-" + this.role + "-edit"), 
this;
}, InterviewAttendantEditView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.NewInterviewView = NewInterviewView, 
HR.InterviewAttendantEditView = InterviewAttendantEditView;
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
var HR, InterviewCodeRecordingView, InterviewFeedbackView, InterviewReportView, InterviewShareReportModalView, InterviewThumbsView, _ref;
return InterviewThumbsView = function(_super) {
function InterviewThumbsView() {
return InterviewThumbsView.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewThumbsView, _super), InterviewThumbsView.prototype.tagName = "div", 
InterviewThumbsView.prototype.template = "x/interview-thumbs", InterviewThumbsView.prototype.initialize = function() {
return _.bindAll(this, "render"), this.model.on("change:thumbs", this.render);
}, InterviewThumbsView.prototype.events = {
"click .js-thumbs":"toggleThumbs"
}, InterviewThumbsView.prototype.toggleThumbs = function(ev) {
var track_data;
return ev.preventDefault(), this.model.set("thumbs", $(ev.currentTarget).attr("data-thumbs")), 
this.model.save(), track_data = {
action:1 === $(ev.currentTarget).attr("data-thumbs") ? "Thumbs Up" :"Thumbs Down"
}, HR.util.track("Edited Interview Report", track_data);
}, InterviewThumbsView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, InterviewThumbsView;
}(window.HR.GenericView), InterviewFeedbackView = function(_super) {
function InterviewFeedbackView() {
return InterviewFeedbackView.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewFeedbackView, _super), InterviewFeedbackView.prototype.tagName = "div", 
InterviewFeedbackView.prototype.template = "x/interview-feedback", InterviewFeedbackView.prototype.initialize = function(options) {
return _.bindAll(this), this.recordings = options.recordings, this.model.on("change:feedback", this.render);
}, InterviewFeedbackView.prototype.events = {
"click .js-edit-feedback":"editFeedback",
"click .js-save-feedback":"saveFeedback",
"click .js-feedback-cancel":"cancelEdit"
}, InterviewFeedbackView.prototype.cancelEdit = function(e) {
var feedback;
return e.preventDefault(), feedback = this.model.get("feedback") || "", this.$("textarea[name=feedback]").val(feedback), 
this.$(".js-edit-feedback-section").addClass("hidden"), this.$(".js-show-feedback-section").removeClass("hidden"), 
this.$(".js-edit-feedback-buttons").addClass("hidden"), this.$(".js-show-feedback-buttons").removeClass("hidden");
}, InterviewFeedbackView.prototype.editFeedback = function(e) {
return e.preventDefault(), this.$(".js-show-feedback-section").addClass("hidden"), 
this.$(".js-edit-feedback-section").removeClass("hidden"), this.$(".js-show-feedback-buttons").addClass("hidden"), 
this.$(".js-edit-feedback-buttons").removeClass("hidden");
}, InterviewFeedbackView.prototype.saveFeedback = function() {
var track_data;
return this.model.set("feedback", this.$("textarea[name=feedback]").val()), this.model.save(), 
track_data = {
action:"Edit Feedback"
}, HR.util.track("Edited Interview Report", track_data);
}, InterviewFeedbackView.prototype.render = function() {
var feedback, recording;
return feedback = "", 1 === this.recordings.models.length && (recording = this.recordings.models[0].recording, 
recording.get("data") && recording.get("data").feedback && (feedback = recording.get("data").feedback)), 
$(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON(),
feedback:feedback
})), this;
}, InterviewFeedbackView;
}(window.HR.GenericView), InterviewReportView = function(_super) {
function InterviewReportView() {
return InterviewReportView.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewReportView, _super), InterviewReportView.prototype.template = "x/interview-report", 
InterviewReportView.prototype.initialize = function(options) {
return _.bindAll(this), this.recordings = options.recordings, this.recordings.on("reset", this.onRecordings), 
this.recordings.on("change", this.renderRecordings), this._subviews = [];
}, InterviewReportView.prototype.events = function() {
return {
"click .js-share-report":"shareReport"
};
}, InterviewReportView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON(),
recordings:this.recordings
})), $(this.el).find(".js-feedback").append(new InterviewFeedbackView({
model:this.model,
recordings:this.recordings
}).render().el), $(this.el).find(".js-status").append(new InterviewThumbsView({
model:this.model
}).render().el), this.renderRecordings(), this;
}, InterviewReportView.prototype.renderRecordings = function() {
var index, recording;
return this.$(".cnt-recordings").empty(), 1 === this.recordings.models.length && (recording = this.recordings.models[0].recording, 
index = 1, recording.get("data") && recording.get("data").questions && _.each(recording.get("data").questions, function(_this) {
return function(question) {
var view;
return view = new InterviewCodeRecordingView({
question:question,
model:recording,
index:index
}), _this.$(".js-recordings").append(view.render().el), _this._subviews.push(view), 
index += 1;
};
}(this))), HR.util.fixedInfo("report", ".interview-question-recording", 0, !0);
}, InterviewReportView.prototype.shareReport = function(e) {
var share_modal, url;
return e.preventDefault(), url = "https://www.hackerrank.com/x/interviews/" + this.model.get("id") + "/report?auth_key=" + this.model.get("auth_key"), 
share_modal = new InterviewShareReportModalView({
link:HR.InterviewModel.shareReportLink(this.model),
model:this.model
}), this.$(".modal-container").html(share_modal.render().el);
}, InterviewReportView;
}(window.HR.GenericView), InterviewCodeRecordingView = function(_super) {
function InterviewCodeRecordingView() {
return InterviewCodeRecordingView.__super__.constructor.apply(this, arguments);
}
var lang_mime_mapping;
return __extends(InterviewCodeRecordingView, _super), InterviewCodeRecordingView.prototype.template = "x/interview-code-recording", 
InterviewCodeRecordingView.prototype.lang_mapping = {
c:"C",
cpp:"C++",
java:"Java",
python:"Python",
php:"PHP",
perl:"Perl",
ruby:"Ruby",
csharp:"C#",
haskell:"Haskell",
clojure:"Clojure",
scala:"Scala",
javascript:"Javascript",
go:"Go",
erlang:"Erlang",
code:"Code"
}, lang_mime_mapping = {
c:"text/x-csrc",
cpp:"text/x-c++src",
java:"text/x-java",
csharp:"text/x-csharp",
haskell:"text/x-haskell",
php:"text/x-php",
python:"text/x-python",
perl:"text/x-perl",
ruby:"text/x-ruby",
bash:"text/x-bash",
oracle:"text/x-plsql",
mysql:"text/x-plsql",
sql:"text/x-plsql",
clojure:"text/x-scheme",
scala:"text/plain",
code:"text/plain",
go:"text/x-go",
javascript:"text/javascript",
objectivec:"text/x-csrc"
}, InterviewCodeRecordingView.prototype.initialize = function(options) {
return _.bindAll(this), this.question = options.question, this.index = options.index, 
this.model.on("change", this.render), this.recording = {}, "task" === this.question.qtype ? $.ajax({
type:"GET",
url:"/x/api/v1/taskattempts/" + this.question.authkey,
success:function(_this) {
return function(resp) {
return _this.model.set(resp.model);
};
}(this)
}) :void 0;
}, InterviewCodeRecordingView.prototype.events = function() {
return {
"slide .slider":"sliderChange",
"change select[name=code-versions]":"select2Change",
"click .js-showmoretoggle":"showMoreToggle",
"click .js-fs-open":"openFullScreen",
"click .js-fs-close":"closeFullScreen",
"click .js-auto-play":"autoPlayCode",
"click .js-auto-pause":"pause_autoPlayCode",
"click .js-auto-stop":"stop_autoPlayCode"
};
}, InterviewCodeRecordingView.prototype.render = function() {
var that;
return that = this, this.type = this.question.runs ? "runs" :this.question.ops ? "ops" :"", 
$(this.el).html(HR.appController.template(this.template, this)({
question:this.question,
index:this.index,
model:this.model.toJSON()
})), this.question.qtype && "task" === this.question.qtype, setTimeout(function(_this) {
return function() {
var Switchery;
return Switchery || (Switchery = require__("switchery")), _this.$(".js-switch")[0] ? (new Switchery(_this.$(".js-switch")[0]), 
_this.$(".js-switch").on("change", _this.switchMode)) :void 0;
};
}(this)), this.question.ops && this.$("#report-codeshell").show(), "runs" === this.type ? (this.setupOps(), 
this.setupRuns(), this.showRunVersion(this.question.runs.length - 1)) :(this.setupRuns(), 
this.setupOps(), this.showOpVersion(this.question.ops.length - 1)), this;
}, InterviewCodeRecordingView.prototype.openFullScreen = function(e) {
return e && e.preventDefault(), this.$(".answer-player-wrapper").attr("data-style", this.$(".answer-player-wrapper").attr("style")).removeAttr("style"), 
this.$(".js-fs-open").hide(), this.$(".js-fs-close").show(), this.$(".answer-player-wrapper").removeClass("fixed-hand"), 
this.$(".fs-toggle").addClass("open"), this.fullScreenOpened = !0;
}, InterviewCodeRecordingView.prototype.closeFullScreen = function(e) {
return e && e.preventDefault(), this.$(".answer-player-wrapper").attr("style", this.$(".answer-player-wrapper").attr("data-style")).removeAttr("data-style"), 
this.$(".js-fs-open").show(), this.$(".js-fs-close").hide(), this.$(".answer-player-wrapper").addClass("fixed-hand"), 
this.$(".fs-toggle").removeClass("open"), this.fullScreenOpened = !1;
}, InterviewCodeRecordingView.prototype.setupRuns = function() {
var option;
return _.each(this.question.runs, function(_this) {
return function(run, i) {
var option;
return option = "<option value='" + i + "'>" + moment(run.time).format("h:mm:ss a") + "</option>", 
_this.$("select[name=code-versions]").append(option);
};
}(this)), this.question.runs && 0 !== this.question.runs.length || (option = "<option value='-1'>No versions were compiled</option>", 
this.$("select[name=code-versions]").append(option)), this.$("select[name=code-versions]").select2({
width:"240px",
formatNoMatches:function() {
return "No versions were compiled";
}
}), this.showSelect2();
}, InterviewCodeRecordingView.prototype.setupOps = function() {
return this.recording = new HR.InterviewCodeRecordingModel({
interview_id:this.model.get("interview_id")
}), this.recording.set("ops", this.question.ops), this.$(".slider").slider({
max:this.question.ops.length,
value:this.question.ops.length
}), this.showSlider();
}, InterviewCodeRecordingView.prototype.autoPlayCode = function(e) {
return e && e.preventDefault(), this.$(".js-auto-play").hasClass("active") ? void 0 :(this.i || (this.i = 0), 
this.player && clearInterval(this.player), this.$(".js-auto-play i").addClass("icon-pause").removeClass("icon-play"), 
this.$(".js-auto-play").addClass("js-auto-pause").removeClass("js-auto-play"), this.$(".js-auto-stop").removeClass("disabled"), 
this.playing = !0, this.player = setInterval(function(_this) {
return function() {
return _this.showOpVersion(++_this.i), _this.$(".slider").slider("value", _this.i), 
_this.i >= _this.question.ops.length ? _this.stop_autoPlayCode() :void 0;
};
}(this), 25));
}, InterviewCodeRecordingView.prototype.pause_autoPlayCode = function(e) {
return e && e.preventDefault(), this.player && clearInterval(this.player), this.$(".js-auto-pause i").addClass("icon-play").removeClass("icon-pause"), 
this.$(".js-auto-pause").addClass("js-auto-play").removeClass("js-auto-pause");
}, InterviewCodeRecordingView.prototype.stop_autoPlayCode = function(e) {
return e && e.preventDefault(), this.pause_autoPlayCode(), this.i = !1, this.$(".js-auto-stop").addClass("disabled"), 
this.showOpVersion(this.question.ops.length), this.$(".slider").slider("value", this.question.ops.length);
}, InterviewCodeRecordingView.prototype.showSelect2 = function() {
return this.$(".timeline-slider-wrapper").addClass("hidden"), this.$(".timeline-select2-wrapper").removeClass("hidden"), 
this.$(".switch-text").html("Compiled codes");
}, InterviewCodeRecordingView.prototype.showSlider = function() {
return this.$(".timeline-select2-wrapper").addClass("hidden"), this.$(".timeline-slider-wrapper").removeClass("hidden"), 
this.$(".switch-text").html("All code");
}, InterviewCodeRecordingView.prototype.showRunVersion = function(i) {
var current_recording, editor_lang, output;
return 0 > i ? (current_recording = {
code:"",
lang:"code"
}, this.$(".code-lang").html(this.lang_mapping.code), this.$(".lang-container").removeClass("hidden"), 
this.$(".code-response-container").removeClass("hidden")) :(this.$("select[name=code-versions]").val(i), 
current_recording = this.question.runs[i], this.$(".code-lang").html(this.lang_mapping[current_recording.lang]), 
this.$(".lang-container").removeClass("hidden"), this.$(".run-time").html(moment(current_recording.time).format("MMMM Do YYYY, h:mm:ss a")), 
this.$(".run-input").html(current_recording.input), output = this.cleanCodecheckerResponse(current_recording), 
this.$(".run-output").html(output), this.$(".code-response-container").removeClass("hidden")), 
editor_lang = current_recording.lang, "undefined" == typeof CodeMirror ? HR.appController.loadCodeMirrorMode(editor_lang, function(_this) {
return function() {
return _this.showCodeEditor(current_recording.code || "", lang_mime_mapping[editor_lang] || "code");
};
}(this)) :this.showCodeEditor(current_recording.code, lang_mime_mapping[editor_lang]);
}, InterviewCodeRecordingView.prototype.showOpVersion = function(i) {
var editor_lang;
return this.i && (this.i = i), this.$(".code-response-container").addClass("hidden"), 
this.recording ? (this.question.language ? (editor_lang = this.question.language, 
this.$(".code-lang").html(this.lang_mapping[this.question.language]), this.$(".lang-container").removeClass("hidden")) :editor_lang = "code", 
"undefined" == typeof CodeMirror ? "code" !== editor_lang ? HR.appController.loadCodeMirrorMode(editor_lang, function(_this) {
return function() {
return _this.showCodeEditor(_this.recording.gotoPosition(i), lang_mime_mapping[editor_lang], i);
};
}(this)) :HR.appController.loadCodeMirror(function(_this) {
return function() {
return _this.showCodeEditor(_this.recording.gotoPosition(i), lang_mime_mapping[editor_lang], i);
};
}(this)) :this.showCodeEditor(this.recording.gotoPosition(i), lang_mime_mapping[editor_lang], i)) :void 0;
}, InterviewCodeRecordingView.prototype.switchMode = function(e) {
var onlyRuns;
return onlyRuns = e.target.checked, onlyRuns ? (this.type = "ops", this.showSlider(), 
this.showOpVersion(this.question.ops.length - 1)) :(this.type = "runs", this.showSelect2(), 
this.question.runs ? this.showRunVersion(this.question.runs.length - 1) :this.showRunVersion(-1));
}, InterviewCodeRecordingView.prototype.sliderChange = function(ev, ui) {
return this.playing = !0, this.showOpVersion(ui.value), this.pause_autoPlayCode();
}, InterviewCodeRecordingView.prototype.select2Change = function(e) {
return this.showRunVersion(e.val);
}, InterviewCodeRecordingView.prototype.showMoreToggle = function(e) {
return e.preventDefault(), this.$(".js-question").hasClass("text-ellipsis-span") ? (this.$(".js-question").removeClass("text-ellipsis-span"), 
this.$(e.currentTarget).html('show less <i class="icon-up-open"></i>')) :(this.$(".js-question").addClass("text-ellipsis-span"), 
this.$(e.currentTarget).html('show more <i class="icon-down-open"></i>'));
}, InterviewCodeRecordingView.prototype.cleanCodecheckerResponse = function(current_recording) {
if (current_recording.response && 0 === current_recording.response.result) {
if (current_recording.response.signal && 0 === current_recording.response.signal[0] && current_recording.response.stdout && current_recording.response.stdout[0]) return current_recording.response.stdout[0];
if (current_recording.response.signal && (62 === current_recording.response.signal[0] || 24 === current_recording.response.signal[0])) return "Time Limit Exceeded";
if (current_recording.response.signal && 25 === current_recording.response.signal[0]) return "Output size exceeded";
if (current_recording.response.stderr && current_recording.response.stderr[0]) return current_recording.response.stderr[0];
} else if (current_recording.response && 255 === current_recording.response.result) return current_recording.response.compileMessage;
}, InterviewCodeRecordingView.prototype.showCodeEditor = function(answer, language, i) {
var answer_before, col, currentCodeLine, currentLineNumber, lineNumber, lines_before, node, path, tabSize;
return lines_before = 0, this.playing && this.recording.get("ops")[i] && this.recording.get("ops")[i].op && this.recording.get("ops")[i].op.length > 0 && (path = this.recording.get("ops")[i].op[0].p, 
answer_before = answer.slice(0, path - 1), lines_before = answer_before.split("\n").length), 
node = this.$("pre.outbox-temp"), node.empty(), $(node).append('<table style="width:100%;"><tr><td class="line-no" width="5%"></td><td class="code"></td></tr></table>'), 
currentCodeLine = $("<div></div>"), currentLineNumber = $("<div>1</div>"), $(node).find(".code").append(currentCodeLine), 
$(node).find(".line-no").append(currentLineNumber), col = 0, tabSize = CodeMirror.defaults.tabSize || 4, 
lineNumber = 2, CodeMirror.runMode(answer, language, function(text, style) {
var content, idx, pos, size, sp;
if ("\n" === text) return currentLineNumber.height(currentCodeLine.height()), lineNumber === lines_before ? (currentCodeLine = $('<div style="background-color:#EEE;"></div>'), 
currentLineNumber = $('<div><i class="icon icon-right"></i>' + lineNumber + "</div>")) :(currentCodeLine = $("<div></div>"), 
currentLineNumber = $("<div>" + lineNumber + "</div>")), lineNumber++, $(node).find(".code").append(currentCodeLine), 
$(node).find(".line-no").append(currentLineNumber), col = 0, void 0;
for (content = "", pos = 0; ;) {
if (idx = text.indexOf("	", pos), -1 === idx) {
content += text.slice(pos), col += text.length - pos;
break;
}
for (col += idx - pos, content += text.slice(pos, idx), size = tabSize - col % tabSize, 
col += size, i = 0; size > i; ) content += " ", ++i;
pos = idx + 1;
}
return style ? (sp = $("<span></span>"), sp.addClass("cm-" + style.replace(RegExp(" +", "g"), " cm-")), 
sp.append(document.createTextNode(content)), currentCodeLine.append(sp)) :currentCodeLine.append(document.createTextNode(content));
}), this.$("pre.outbox").html(node.html()).promise().done(function(_this) {
return function() {
var elem, height, height_before, rel_top;
return lines_before > 0 ? (elem = _this.$(".line-no > div:contains(" + lines_before + ")"), 
_this.fullScreenOpened ? (height = (_this.$(".fs-toggle").height() - 50) / 2, _this.$(".fs-toggle").stop(!0, !0).animate({
scrollTop:elem.position().top - height
}, 50, "linear")) :(height_before = $(".interview-feedback > div").height() + _this.$(".question-wrapper-collapsed").height() + 50, 
_.each(_this.$(".interview-question-recording").parent().prevAll(), function(ques) {
return height_before += $(ques).height();
}), rel_top = $("#control-overflow").height() / 2 - 150, $("#control-overflow").stop(!0, !0).animate({
scrollTop:elem.position().top - rel_top + height_before
}, 50, "linear"))) :void 0;
};
}(this));
}, InterviewCodeRecordingView;
}(window.HR.GenericView), InterviewShareReportModalView = function(_super) {
function InterviewShareReportModalView() {
return InterviewShareReportModalView.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewShareReportModalView, _super), InterviewShareReportModalView.prototype.template = "x/interview-share-report-modal", 
InterviewShareReportModalView.prototype.className = "interview-share-report-modal", 
InterviewShareReportModalView.prototype.initialize = function(options) {
return this.link = options.link, InterviewShareReportModalView.__super__.initialize.call(this, options);
}, InterviewShareReportModalView.prototype.events = function() {
return {
"click .js-copy-url":"copyURL"
};
}, InterviewShareReportModalView.prototype.copyURL = function() {
var track_data;
return track_data = {
interview_id:this.model.get("id")
}, HR.util.track("Shared Interview Report", track_data);
}, InterviewShareReportModalView.prototype.render = function() {
var content;
return content = HR.appController.template(this.template, this)({
link:this.link
}), $(this.el).html(content), this.initializeCopy(), $("#global-zeroclipboard-html-bridge").css("position", "fixed"), 
this.$("#copy-share-link-report").popover({
content:"URL has been coppied",
trigger:"none"
}), this.$("#interview-share-report-modal").modal(), this;
}, InterviewShareReportModalView.prototype.initializeCopy = function() {
var client, that;
return that = this, this.$("#copy-share-link-report").attr("data-clipboard-text", this.link), 
this.$("#report-link-inp").select(), client = new ZeroClipboard(this.$("#copy-share-link-report"), {
container:$("div.modal.fade.interview-share-report-modal")
}), client.on("complete", function() {
var elem;
return $(this).popover("show"), elem = $(this), setTimeout(function() {
return function() {
return elem.popover("hide"), that.initializeCopy();
};
}(this), 2e3);
});
}, InterviewShareReportModalView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.InterviewReportView = InterviewReportView, 
HR.InterviewShareReportModalView = InterviewShareReportModalView;
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
var HR, InterviewsNavigationView, _ref;
return InterviewsNavigationView = function(_super) {
function InterviewsNavigationView() {
return InterviewsNavigationView.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewsNavigationView, _super), InterviewsNavigationView.prototype.initialize = function(options) {
var that;
return that = this, this.active_nav_link = options.active_nav_link;
}, InterviewsNavigationView.prototype.template = "x/interviews-navigation", InterviewsNavigationView.prototype.className = "interviews-navigation", 
InterviewsNavigationView.prototype.updateData = function(model, active_nav_link) {
return this.active_nav_link = active_nav_link;
}, InterviewsNavigationView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
active_nav_link:this.active_nav_link,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content), HR.currentUser.isLocked() && this.disableNavigation(), 
this;
}, InterviewsNavigationView.prototype.disableNavigation = function() {
return this.$(".hre-sidebar a").removeAttr("href");
}, InterviewsNavigationView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.InterviewsNavigationView = InterviewsNavigationView;
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
var HR, LibraryNavigationView, _ref;
return LibraryNavigationView = function(_super) {
function LibraryNavigationView() {
return LibraryNavigationView.__super__.constructor.apply(this, arguments);
}
return __extends(LibraryNavigationView, _super), LibraryNavigationView.prototype.initialize = function(options) {
var that;
return that = this, this.active_nav_link = options.active_nav_link;
}, LibraryNavigationView.prototype.template = "x/library-navigation", LibraryNavigationView.prototype.className = "library-navigation", 
LibraryNavigationView.prototype.updateData = function(model, active_nav_link) {
return this.active_nav_link = active_nav_link;
}, LibraryNavigationView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
active_nav_link:this.active_nav_link,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content), HR.currentUser.isLocked() && this.disableNavigation(), 
this;
}, LibraryNavigationView.prototype.disableNavigation = function() {
return this.$(".hre-sidebar a").removeAttr("href");
}, LibraryNavigationView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.LibraryNavigationView = LibraryNavigationView;
});
}.call(this), function() {
var HR, LibraryQuestionView, LibrarySetModalView, LibrarySetView, LibraryView, _ref, __bind = function(fn, me) {
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
jQuery(function() {}), LibraryView = function(_super) {
function LibraryView() {
return this.loadLib = __bind(this.loadLib, this), this.createQuestion = __bind(this.createQuestion, this), 
this.editQuestion = __bind(this.editQuestion, this), LibraryView.__super__.constructor.apply(this, arguments);
}
return __extends(LibraryView, _super), LibraryView.prototype.template = "x/library", 
LibraryView.prototype.className = "library-view", LibraryView.prototype.initialize = function(options) {
return this.library = options.library, this.access_type = options.access, this.filter = options.filter, 
this.search = "", this.tags = "", this._subviews = [], HR.LibraryModel.setTid(null), 
this;
}, LibraryView.prototype.events = function() {
return {
"click .js-searchclear":"clearQuery",
"keypress .js-search":"setQuery",
"click .js-tags":"filterTags",
"click .js-edit-question":"editQuestion",
"click .js-duplicate-question":"copyQuestion"
};
}, LibraryView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
filter:this.filter,
library:this.library,
access:this.access_type
}), $(this.el).html(content), $(".js-create-question").off().on("click", this.createQuestion), 
setTimeout(this.loadLib, 200), this;
}, LibraryView.prototype.editQuestion = function(e) {
return e.preventDefault(), Backbone.history.navigate("library/questions/" + this.$(e.target).data("qid") + "/edit", !0);
}, LibraryView.prototype.createQuestion = function(e) {
var create_question_modal;
return e.preventDefault(), create_question_modal = new HR.CreateQuestionModalView({
model:HR.LibraryModel
}), this._subviews.push(create_question_modal), $("#modal-container").html(create_question_modal.render().el);
}, LibraryView.prototype.setQuery = function(e) {
return 13 === e.keyCode ? (this.$(".js-searchclear").removeClass("hide"), this.search = this.$(".js-search").val(), 
this.loadLib()) :void 0;
}, LibraryView.prototype.clearQuery = function(e) {
return e.preventDefault(), this.$(e.currentTarget).addClass("hide"), this.$(".js-search").val(""), 
this.search = "", this.loadLib();
}, LibraryView.prototype.filterTags = function() {
var newtags;
return newtags = this.$("input.js-tags").val(), newtags !== this.tags ? (this.tags = newtags, 
this.loadLib()) :void 0;
}, LibraryView.prototype.loadLib = function() {
var load;
return load = new HR.LoadingView(), this.$(".libcontent").html(load.render().el), 
HR.LibraryModel.fetch({
data:$.param({
library:null != this.access_type ? "" + this.library + "_" + this.access_type :this.library,
filter:this.filter,
q:this.search,
tags:this.tags
}),
silent:!0,
success:function(_this) {
return function() {
return _this.renderView();
};
}(this),
error:function(e) {
return console.log("error", e);
}
});
}, LibraryView.prototype.renderView = function() {
var countdata, q, qview, res, s, setview, _i, _j, _len, _len1, _ref, _ref1, _results;
for (res = HR.LibraryModel.attributes, this.$(".libcontent").empty(), countdata = [], 
1 === res.sets.length ? countdata.push("1 set") :res.sets.length > 1 && countdata.push("" + res.sets.length + " sets"), 
1 === res.questions.length ? countdata.push("1 question") :res.questions.length > 1 && countdata.push("" + res.questions.length + " questions"), 
countdata.length ? this.$(".js-count").html("Found: " + countdata.join(", ")) :(this.$(".js-count").html("Found nothing here."), 
this.$(".js-nothingfound").removeClass("hide")), this.$(".js-tags").select2("destroy"), 
res.tags.length > 0 ? (this.$(".js-tags").select2({
width:"off",
placeholder:"Filter tags",
allowClear:!0,
multiple:!0,
query:function(q) {
var data, tag, _i, _len, _ref;
for (data = {
results:[]
}, _ref = res.tags, _i = 0, _len = _ref.length; _len > _i; _i++) tag = _ref[_i], 
data.results.push({
id:tag,
text:HR.util.capitalize(tag)
});
return q.callback(data);
},
initSelection:function(e, c) {
var data, tag, _i, _len, _ref;
for (data = [], _ref = res.selected_tags, _i = 0, _len = _ref.length; _len > _i; _i++) tag = _ref[_i], 
data.push({
id:tag,
text:HR.util.capitalize(tag)
});
return c(data);
}
}), this.$(".js-tags").removeClass("hide")) :(this.$(".js-tags").addClass("hide"), 
this.$(".js-tags").css({
display:""
})), _ref = res.sets, _i = 0, _len = _ref.length; _len > _i; _i++) s = _ref[_i], 
setview = new HR.LibrarySetView({
set:s,
parent:this
}), this.$(".libcontent").append(setview.render().el);
for (_ref1 = res.questions, _results = [], _j = 0, _len1 = _ref1.length; _len1 > _j; _j++) q = _ref1[_j], 
qview = new HR.LibraryQuestionView({
question:q,
parent:this
}), _results.push(this.$(".libcontent").append(qview.render().el));
return _results;
}, LibraryView;
}(window.HR.GenericView), LibraryQuestionView = function(_super) {
function LibraryQuestionView() {
return LibraryQuestionView.__super__.constructor.apply(this, arguments);
}
return __extends(LibraryQuestionView, _super), LibraryQuestionView.prototype.template = "x/library-question", 
LibraryQuestionView.prototype.className = "library-question-view", LibraryQuestionView.prototype.events = function() {
return {
"click .js-toggleHeight":"toggleHeight"
};
}, LibraryQuestionView.prototype.initialize = function(options) {
return this.question = options.question, this.parent = options.parent, this.noexpand = "noexpand" in options ? options.noexpand :!1, 
this.actions = "actions" in options ? options.actions :!0;
}, LibraryQuestionView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
question:this.question,
hrqn:window.istreet.cfg.hrqn,
noexpand:this.noexpand,
actions:this.actions
}), $(this.el).html(content), this;
}, LibraryQuestionView.prototype.toggleHeight = function(e) {
var el;
return e.preventDefault(), el = this.$(e.currentTarget), "collapsed" === el.attr("data-state") ? (el.html('collapse <i class="icon-up-open">'), 
el.attr("data-state", "expanded"), $(this.el).find(".js-qcontent").removeClass("text-ellipsis-oneline")) :(el.html('expand <i class="icon-down-open">'), 
el.attr("data-state", "collapsed"), $(this.el).find(".js-qcontent").addClass("text-ellipsis-oneline"));
}, LibraryQuestionView;
}(window.HR.GenericView), LibrarySetView = function(_super) {
function LibrarySetView() {
return LibrarySetView.__super__.constructor.apply(this, arguments);
}
return __extends(LibrarySetView, _super), LibrarySetView.prototype.template = "x/library-set", 
LibrarySetView.prototype.className = "library-set-view", LibrarySetView.prototype.events = function() {
return {
"click .js-showset":"showSetModal"
};
}, LibrarySetView.prototype.initialize = function(options) {
return this.set = options.set, this.parent = options.parent;
}, LibrarySetView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
set:this.set,
hrqn:window.istreet.cfg.hrqn
}), $(this.el).html(content), this;
}, LibrarySetView.prototype.showSetModal = function(e) {
var el, styles, v;
return e.preventDefault(), el = this.$(e.currentTarget), v = new HR.LibrarySetModalView({
set:this.set,
parent:this
}), this.$(".js-setdetails-wrapper").html(v.render().el), styles = {
width:1e3,
"margin-left":-(parseInt(1e3) / 2),
"min-height":600,
height:"80%"
}, setTimeout(function(_this) {
return function() {
return _this.$(".js-setdetails").modal().css(styles);
};
}(this), 100);
}, LibrarySetView;
}(window.HR.GenericView), LibrarySetModalView = function(_super) {
function LibrarySetModalView() {
return LibrarySetModalView.__super__.constructor.apply(this, arguments);
}
return __extends(LibrarySetModalView, _super), LibrarySetModalView.prototype.template = "x/library-setmodal", 
LibrarySetModalView.prototype.className = "library-setmodal", LibrarySetModalView.prototype.events = function() {
return {
"click .js-qview":"showQuestion",
"click .js-qnext":"nextQuestion",
"click .js-qprev":"prevQuestion"
};
}, LibrarySetModalView.prototype.initialize = function(options) {
return this.set = options.set, this.parent = options.parent;
}, LibrarySetModalView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
set:this.set
}), $(this.el).html(content), setTimeout(function(_this) {
return function() {
return _this.$("a[qindex=0]").trigger("click");
};
}(this)), this;
}, LibrarySetModalView.prototype.showQuestion = function(e) {
var content, el, question;
return e.preventDefault(), el = this.$(e.currentTarget), el.parent().parent().find(".active").removeClass("active"), 
el.parent().addClass("active"), question = this.set.questions[el.attr("qindex")], 
content = new HR.LibraryQuestionView({
question:question,
noexpand:!0,
parent:this
}), this.$(".setqcontents").html(content.render().el);
}, LibrarySetModalView.prototype.nextQuestion = function(e) {
var el, qindex;
return e.preventDefault(), el = this.$(e.currentTarget), qindex = parseInt(el.parent().parent().find(".active").find("a").attr("qindex")), 
qindex === this.set.questions.length - 1 ? qindex = 0 :qindex += 1, el.parent().parent().find("a[qindex=" + qindex + "]").trigger("click");
}, LibrarySetModalView.prototype.prevQuestion = function(e) {
var el, qindex;
return e.preventDefault(), el = this.$(e.currentTarget), qindex = parseInt(el.parent().parent().find(".active").find("a").attr("qindex")), 
0 === qindex ? qindex = this.set.questions.length - 1 :qindex -= 1, el.parent().parent().find("a[qindex=" + qindex + "]").trigger("click");
}, LibrarySetModalView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.LibraryView = LibraryView, 
HR.LibraryQuestionView = LibraryQuestionView, HR.LibrarySetView = LibrarySetView, 
HR.LibrarySetModalView = LibrarySetModalView;
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
var HR, LogoUploadView, _ref;
return LogoUploadView = function(_super) {
function LogoUploadView() {
return LogoUploadView.__super__.constructor.apply(this, arguments);
}
return __extends(LogoUploadView, _super), LogoUploadView.prototype.initialize = function() {}, 
LogoUploadView.prototype.template = "x/logo-upload", LogoUploadView.prototype.className = "logo-upload", 
LogoUploadView.prototype.initialize = function(options) {
return this.parent = options.parent;
}, LogoUploadView.prototype.render = function() {
return $(this.el).empty(), this.$("#upload-logo-modal").html(""), $(this.el).html(HR.appController.template(this.template, this)), 
this.$("#upload-logo-modal").modal({
backdrop:!1
}), this;
}, LogoUploadView.prototype.events = function() {
return {
"click .upload-logo":"uploadLogo",
"change input":"enableUpload"
};
}, LogoUploadView.prototype.enableUpload = function() {
return $(".upload-logo").removeAttr("disabled").removeClass("disabled");
}, LogoUploadView.prototype.uploadLogo = function(e) {
var $form, file, paramTwo, submitUrl, that;
if (!$(".upload-logo").attr("disabled")) return $(".upload-logo").attr("data-throbber", "show"), 
$("#logo-throbber").attr("style", "display:block"), $(".upload-logo").attr("disabled", "true"), 
$(".upload-logo").addClass("disabled"), e.preventDefault(), this.$(".error-msg").addClass("hidden"), 
submitUrl = "/x/api/v1/users/upload_logo", $form = this.$("#logo-upload-form"), 
file = $form.find(":file"), paramTwo = function() {
var returnValue;
return returnValue = {
files:$form.find(":file"),
iframe:!0
};
}, that = this, $("#company-logo").hide(), $.ajax({
url:submitUrl,
type:"POST",
dataType:"json",
files:$form.find(":file"),
iframe:!0,
success:function(data) {
return HR.currentUser.fetch({
silent:!0,
success:function() {
return $("#company-logo").load(function() {
return setTimeout(function() {
return HR.util.ajaxmsg(data.message, !1, !0, 2);
}), $("#company-logo").show(), $("#logo-throbber").remove();
}).attr("src", data.url + "?" + new Date().getTime()), HR.currentUser.fetch(), that.$("#upload-logo-modal").modal("hide");
}
});
},
error:function(data) {
return data = $.parseJSON(data.responseText), that.$(".error-msg").removeClass("hidden").html(data.message);
}
});
}, LogoUploadView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.LogoUploadView = LogoUploadView;
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
var HR, NewTeamView, _ref;
return NewTeamView = function(_super) {
function NewTeamView() {
return NewTeamView.__super__.constructor.apply(this, arguments);
}
return __extends(NewTeamView, _super), NewTeamView.prototype.template = "x/new-team-modal", 
NewTeamView.prototype.tagName = "div", NewTeamView.prototype.initialize = function(options) {
return this.parent = options.parent, this.userLabels = options.userLabels, this.users = options.users, 
this.callback = options.callback, this.addUsers = options.addUsers, this.team_id = options.team_id;
}, NewTeamView.prototype.teamMemberTemplate = '<li data-user-label="<%= label%>">\n    <div class="team_email_cta psA msB">\n        <span class="fnt-sz-small"><%= label %></span>\n        <a href="" class="delete_email_from_team js-remove-new-team-member" data-user-label="<%= label %>"><i class="icon--single icon-cancel-small"></i></a>\n    </div>\n</li>', 
NewTeamView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
team:this.team_id ? this.collection.get(this.team_id) :"",
addUsers:this.addUsers
})), this.$("#new-team-modal").modal(), this.team_id || setTimeout(function(_this) {
return function() {
return _this.$("input[name=new-team-member]").select2({
data:_this.userLabels,
width:354
});
};
}(this)), this;
}, NewTeamView.prototype.events = function() {
return {
"click .js-add-existing-team-member":"addNewTeamMember",
"click .js-remove-new-team-member":"removeNewTeamMember",
"submit form[name=new-team-form]":"saveTeam"
};
}, NewTeamView.prototype.addNewTeamMember = function(e) {
var html, label;
return e.preventDefault(), label = this.$("input[name=new-team-member]").val(), 
html = _.template(this.teamMemberTemplate)({
label:label
}), this.userLabels = _.reject(this.userLabels, function() {
return function(user_label) {
return user_label.id === label ? !0 :void 0;
};
}(this)), this.$("ul#team_members_list").append(html), this.$("input[name=new-team-member]").select2({
data:this.userLabels,
width:354
});
}, NewTeamView.prototype.removeNewTeamMember = function(e) {
var userLabel;
return e.preventDefault(), userLabel = this.$(e.currentTarget).data("user-label"), 
this.userLabels[this.userLabels.length] = {
id:userLabel,
text:userLabel
}, this.$(e.currentTarget).parent().parent().remove();
}, NewTeamView.prototype.showError = function(error) {
return this.$(".alert-error").html(error).removeClass("hidden");
}, NewTeamView.prototype.resetError = function() {
return this.$(".alert-error").html("").addClass("hidden");
}, NewTeamView.prototype.saveTeam = function(e) {
var members, name;
return e.preventDefault(), this.resetError(), name = this.$("input[name=team-name]").removeClass("error").val(), 
_.isEmpty(name) ? (this.$("input[name=team-name]").addClass("error"), void 0) :(this.team_id ? (this.model = this.collection.get(this.team_id), 
this.model.set("name", name, {
silent:!0
})) :(this.model = new HR.TeamModel({
name:name
}), members = _.map(this.$("ul#team_members_list li"), function(_this) {
return function(list_item) {
var userLabel;
return userLabel = $(list_item).attr("data-user-label"), _this.users[userLabel].user_id;
};
}(this)), members.length > 0 && this.model.set("users", members)), this.model.save(null, {
silent:!0,
success:function(_this) {
return function() {
return _this.$(".close").click(), HR.util.trackTotango("Added New Team", "Account Settings"), 
_this.collection.fetch({
success:function() {
return _this.callback ? _this.callback() :_this.parent.render();
}
});
};
}(this),
error:function(_this) {
return function(model, xhr) {
var response;
return response = $.parseJSON(xhr), _this.showError(response.message);
};
}(this)
}));
}, NewTeamView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.NewTeamView = NewTeamView;
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
var HR, PaymentCardDetailsView, _ref;
return PaymentCardDetailsView = function(_super) {
function PaymentCardDetailsView() {
return PaymentCardDetailsView.__super__.constructor.apply(this, arguments);
}
return __extends(PaymentCardDetailsView, _super), PaymentCardDetailsView.prototype.template = "x/card-details", 
PaymentCardDetailsView.prototype.intialize = function(options) {
return null == options && (options = {}), this.model = options.model, this.listenTo(this.model, "change", this.render), 
this.listenTo(this.model, "reset", this.render);
}, PaymentCardDetailsView.prototype.events = function() {
return {
"submit form[name=credit-card-details]":"submitCard"
};
}, PaymentCardDetailsView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON()
}), $(this.el).html(content), this;
}, PaymentCardDetailsView.prototype.submitCard = function(e) {
return e.preventDefault(), this.$(".response-message").addClass("hidden"), $(e.currentTarget).children("button").attr("disabled", !0).addClass("disabled"), 
this.getToken(e.currentTarget);
}, PaymentCardDetailsView.prototype.cardCheckResponseHandler = function() {
var that;
return that = this, function(status, response) {
var message, newAttributes, token;
response.error ? (message = response.error.message, this.$(".response-message").removeClass("hidden").addClass("error").html(message), 
$("#card-details-submit").attr("disabled", !1).removeClass("disabled"), HR.util.inlineLoadingEnd({})) :(token = response.id, 
newAttributes = {
hr_uid:HR.currentUser.id,
token:response.id,
credit_card_number:response.card.last4
}, that.model.save(newAttributes, {
success:function() {
var track_data;
return track_data = {
Page:"Credit card details"
}, HR.util.track("Edited Account Settings", track_data), that.model.fetch({
success:function() {
return that.render(), $("#card-details-submit").attr("disabled", !1).removeClass("disabled"), 
message = "Card details have been saved", HR.util.inlineLoadingEnd({
message:message
});
}
});
},
error:function(model, response) {
return HR.util.inlineLoadingEnd({}), response = $.parseJSON(response.responseText), 
message = response.message, this.$(".response-message").removeClass("hidden").addClass("error").html(message), 
$("#card-details-submit").attr("disabled", !1).removeClass("disabled");
}
}));
};
}, PaymentCardDetailsView;
}(window.HR.CardDetailsView), HR = null != (_ref = window.HR) ? _ref :{}, HR.PaymentCardDetailsView = PaymentCardDetailsView;
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
var HR, PaymentCheckoutView, _ref;
return PaymentCheckoutView = function(_super) {
function PaymentCheckoutView() {
return PaymentCheckoutView.__super__.constructor.apply(this, arguments);
}
return __extends(PaymentCheckoutView, _super), PaymentCheckoutView.prototype.passwordConfirm = function(password, callback) {
var that;
return that = this, $.ajax({
url:"/x/validate_password",
type:"POST",
dataType:"json",
data:{
password:password
},
success:function() {
return callback("success");
},
error:function() {
return callback("error");
}
});
}, PaymentCheckoutView.prototype.gotoCardDetails = function(e) {
return e.preventDefault(), $("a.close").click(), setTimeout(function() {
return Backbone.history.navigate("/payments/card_details", !0);
}, 500);
}, PaymentCheckoutView.prototype.goBack = function(e) {
return e.preventDefault(), window.history.back();
}, PaymentCheckoutView;
}(window.HR.CardDetailsView), HR = null != (_ref = window.HR) ? _ref :{}, HR.PaymentCheckoutView = PaymentCheckoutView;
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
var HR, PlanPaymentCheckoutView, _ref;
return PlanPaymentCheckoutView = function(_super) {
function PlanPaymentCheckoutView() {
return this.passwordConfirmed = __bind(this.passwordConfirmed, this), PlanPaymentCheckoutView.__super__.constructor.apply(this, arguments);
}
return __extends(PlanPaymentCheckoutView, _super), PlanPaymentCheckoutView.prototype.template = "x/plan-payment-checkout", 
PlanPaymentCheckoutView.prototype.initialize = function(options) {
return this.plan = options.plan, this.model = options.model, this.model.bind("change", this.render);
}, PlanPaymentCheckoutView.prototype.events = function() {
return {
"submit form[name=checkout-form]":"pay",
"click .dev-edit-card-details":"editCardDetails",
"change select[name=payment-users]":"updateTotal",
"click .back":"goBack"
};
}, PlanPaymentCheckoutView.prototype.render = function() {
var total;
return this.checkout = this.model.toJSON(), this.checkout.min_users && (total = this.checkout.charge * this.checkout.min_users, 
this.checkout.prorated_deduction && (total -= this.checkout.plan_details.min_users * this.checkout.prorated_deduction), 
this.checkout.carryover_credit && (total -= this.checkout.carryover_credit), $(this.el).html(HR.appController.template(this.template, this)({
model:this.checkout,
total:total,
plan:this.plan
}))), this.delegateEvents(), this;
}, PlanPaymentCheckoutView.prototype.pay = function(e) {
var password;
return e.preventDefault(), this.$(".response-message").addClass("hidden"), this.$("button[type=submit]").attr("disabled", !0).addClass("disabled"), 
password = $("input[name=password]").val(), this.passwordConfirm(password, this.passwordConfirmed);
}, PlanPaymentCheckoutView.prototype.editCardDetails = function(e) {
return e.preventDefault(), this.checkout.credit_card_number = void 0, this.$(".credit-card-details-existing").addClass("hidden"), 
this.$(".new-credit-card-details").removeClass("hidden");
}, PlanPaymentCheckoutView.prototype.passwordConfirmed = function(result) {
var message;
return "error" === result ? (message = "The password entered is incorrect", this.$(".response-message").removeClass("hidden").addClass("error").html(message), 
HR.util.inlineLoadingEnd({}), this.$("button[type=submit]").attr("disabled", !1).removeClass("disabled"), 
void 0) :this.checkNewCard();
}, PlanPaymentCheckoutView.prototype.checkNewCard = function() {
var card_details, message;
return $("#card-number").val() && $("#cvv").val() && $("#expiry-month").val() && $("#expiry-year").val() ? card_details = this.getToken("button[type=submit]") :this.checkout.credit_card_number ? this.makePayment(null) :(message = "Please enter all the card details", 
this.$(".response-message").removeClass("hidden").addClass("error").html(message), 
HR.util.inlineLoadingEnd({}), this.$("button[type=submit]").attr("disabled", !1).removeClass("disabled"), 
void 0);
}, PlanPaymentCheckoutView.prototype.makePayment = function(card_details) {
var newAttributes, payment, uid, users;
return users = $("select[name=payment-users]").val() ? parseInt($("select[name=payment-users]").val(), 10) :1, 
newAttributes = {
plan:this.plan,
users:users
}, uid = HR.currentUser.id, payment = new HR.PaymentModel({
plan:this.plan,
users:users,
hr_uid:uid
}), card_details && (newAttributes.new_card_details = card_details), payment.save(newAttributes, {
silent:!0,
suppressMessage:!0,
override:!0,
success:function(_this) {
return function(model, response) {
return HR.UserSettings.set("checkout", void 0, {
silent:!0
}), $.inArray(HR.currentUser.get("stripe_plan"), [ "free", "trial" ]) && _this.adrollConversion(), 
HR.util.inlineLoadingEnd(response), HR.currentUser.fetch(), Backbone.history.navigate("/payments/plans", !0);
};
}(this),
error:function(_this) {
return function(model, resp) {
var response;
return response = $.parseJSON(resp.responseText), HR.util.inlineLoadingEnd({}), 
_this.$(".response-message").removeClass("hidden").addClass("error").html(response.message), 
_this.$("button[type=submit]").attr("disabled", !1).removeClass("disabled");
};
}(this)
});
}, PlanPaymentCheckoutView.prototype.adrollConversion = function() {
return window.adroll_segments = "paid_conversion", "undefined" != typeof __adroll ? __adroll.render_pixel_code(window.adroll_adv_id, window.adroll_pix_id) :void 0;
}, PlanPaymentCheckoutView.prototype.updateTotal = function() {
var base_charge, credit, prorated_deduction, total, users;
return users = parseInt($("select[name=payment-users]").val(), 10), base_charge = parseInt(this.checkout.charge * users, 10), 
total = base_charge, $(".item-total").html(base_charge), this.checkout.prorated_deduction && this.$(".prorated-deduction").length > 0 && (prorated_deduction = parseInt(users * this.checkout.prorated_deduction, 10), 
total -= prorated_deduction, this.$(".prorated-deduction").html(prorated_deduction)), 
this.checkout.carryover_credit && this.$(".credit").length > 0 && (credit = parseInt(this.checkout.carryover_credit, 10), 
total -= credit, this.$(".credit").html(credit)), this.$("#final-amount").html(total);
}, PlanPaymentCheckoutView.prototype.cardCheckResponseHandler = function() {
var that;
return that = this, function(status, response) {
var card_details, message, token;
return response.error ? (message = response.error.message, HR.util.inlineLoadingEnd({}), 
this.$(".response-message").removeClass("hidden").addClass("error").html(message), 
this.$("button[type=submit]").attr("disabled", !1).removeClass("disabled")) :(token = response.id, 
card_details = {
token:response.id,
last4:response.card.last4
}, that.makePayment(card_details));
};
}, PlanPaymentCheckoutView;
}(window.HR.PaymentCheckoutView), HR = null != (_ref = window.HR) ? _ref :{}, HR.PlanPaymentCheckoutView = PlanPaymentCheckoutView;
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
var HR, PricingPlansView, _ref;
return PricingPlansView = function(_super) {
function PricingPlansView() {
return PricingPlansView.__super__.constructor.apply(this, arguments);
}
return __extends(PricingPlansView, _super), PricingPlansView.prototype.template = "x/pricing-plans", 
PricingPlansView.prototype.initialize = function(options) {
return null == options && (options = {}), this.model = options.model, this.model.bind("change", this.render), 
this.model.bind("reset", this.render);
}, PricingPlansView.prototype.events = function() {
return {
"click  .payment-button":"changePlan"
};
}, PricingPlansView.prototype.render = function() {
var content;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON()
}), $(this.el).html(content), this;
}, PricingPlansView.prototype.changePlan = function(e) {
var cost, current_plan, plan;
return plan = $(e.currentTarget).attr("data-plan"), cost = $(e.currentTarget).attr("data-cost"), 
(current_plan = this.model.get("current_plan")) ? current_plan.price > cost ? (alert("Please contact support@hackerrank.com to downgrade the plan"), 
void 0) :this.checkout(plan) :this.checkout(plan);
}, PricingPlansView.prototype.checkout = function(plan) {
var data;
return data = {}, data.payment_type = "plan", data.plan = plan, HR.UserSettings.set("checkout", data), 
HR.router.navigate("/payments/checkout", !0);
}, PricingPlansView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.PricingPlansView = PricingPlansView;
});
}.call(this), function() {
var HR, RemoveQuestionModalView, _ref, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {}), RemoveQuestionModalView = function(_super) {
function RemoveQuestionModalView() {
return RemoveQuestionModalView.__super__.constructor.apply(this, arguments);
}
return __extends(RemoveQuestionModalView, _super), RemoveQuestionModalView.prototype.template = "x/remove-question-modal", 
RemoveQuestionModalView.prototype.className = "remove-question-modal", RemoveQuestionModalView.prototype.initialize = function(options) {
return this.parent = options.parent, this.qid = options.qid, this.index = options.index, 
RemoveQuestionModalView.__super__.initialize.call(this, options);
}, RemoveQuestionModalView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON()
}), $(this.el).html(content), this.$("#remove-question-modal").modal(), this;
}, RemoveQuestionModalView.prototype.events = function() {
return {
"click a.js-remove-question":"removeQuestion"
};
}, RemoveQuestionModalView.prototype.removeQuestion = function(e) {
var that;
return e.preventDefault(), that = this, this.$(".close").click(), this.model.removeQuestion(that.qid, {
success:function() {
var track_data;
return track_data = {
question_id:that.qid,
test_id:that.parent.model.get("id")
}, HR.util.track("Removed question", track_data), that.parent.showUndoMessage(that.qid, this.index), 
setTimeout(function() {
return that.parent.hideUndoMessage(), that.parent.render();
}, 1e4), that.parent.model.fetch();
},
error:function() {
return console.log("error");
}
});
}, RemoveQuestionModalView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.RemoveQuestionModalView = RemoveQuestionModalView;
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
var HR, SettingsBasicInfoView, _ref;
return SettingsBasicInfoView = function(_super) {
function SettingsBasicInfoView() {
return SettingsBasicInfoView.__super__.constructor.apply(this, arguments);
}
return __extends(SettingsBasicInfoView, _super), SettingsBasicInfoView.prototype.template = "x/settings-basic-info", 
SettingsBasicInfoView.prototype.class_name = "basic-info", SettingsBasicInfoView.prototype.country_select_box = "#user-country-select2", 
SettingsBasicInfoView.prototype.timezone_select_box = "#usr-tz-select2", SettingsBasicInfoView.prototype.user_form = "#settings-basic-info-form", 
SettingsBasicInfoView.prototype.initialize = function() {
return this.model = HR.currentUser;
}, SettingsBasicInfoView.prototype.events = function() {
return {
"click #update-basic-info":"update",
"click #c-logo-upload-btn":"openLogoUploadDialog"
};
}, SettingsBasicInfoView.prototype.render = function() {
var content, _model;
return _model = this.model.toJSON(), content = HR.appController.template(this.template, this)({
current_user:_model
}), $(this.el).html(content), this.initCountrySelect2(), this.initTimeZoneSelect2(), 
this.initializeCopy(), $("#global-zeroclipboard-html-bridge").css("position", "fixed"), 
this.$("#copy-apikey").popover({
content:"API Key has been coppied",
trigger:"none"
}), this;
}, SettingsBasicInfoView.prototype.initCountrySelect2 = function() {
var countries, data;
return countries = HR.countryNames, data = [], _.each(countries, function() {
return function(name) {
return data.push({
id:name,
text:name
});
};
}(this)), data.push({
id:"N/A",
text:"N/A"
}), this.$(this.country_select_box).select2({
width:"off",
data:data
});
}, SettingsBasicInfoView.prototype.initTimeZoneSelect2 = function() {
var that;
return that = this, setTimeout(function() {
return $.ajax({
url:"/x/api/v1/users/timezones",
type:"GET",
success:function(response) {
return $(that.timezone_select_box).select2({
width:"off",
data:response.data
});
}
});
});
}, SettingsBasicInfoView.prototype.openLogoUploadDialog = function() {
var upload_logo_view;
return upload_logo_view = new HR.LogoUploadView({
parent:this
}), $(this.el).find(".dialog-wrapper").html(upload_logo_view.render().el);
}, SettingsBasicInfoView.prototype.update = function(e) {
var country, data;
return e.preventDefault(), data = {}, data.user = {}, data.user.firstname = this.$("#usr-fname").val(), 
data.user.lastname = this.$("#usr-lname").val(), data.user.phone = this.$("#usr-phone").val(), 
country = this.$(this.country_select_box).val(), "N/A" === country && (country = ""), 
data.user.country = country, data.user.timezone = this.$(this.timezone_select_box).val(), 
data.user.company = this.model.get("company"), data.user.company.name = this.$("#usr-cname").val(), 
data.user.company.email_from = this.$("#usr-cemailfrom").val(), this.model.save(data.user, {
success:function() {
var track_data;
return track_data = {
Page:"Basic Settings"
}, HR.util.track("Edited Account Settings", track_data);
},
error:function(model, resp) {
return console.log(resp);
}
});
}, SettingsBasicInfoView.prototype.initializeCopy = function() {
var client, that;
return that = this, this.$("#copy-apikey").attr("data-clipboard-text", this.model.get("personal_api_key")), 
this.$("#apikey-input").select(), client = new ZeroClipboard(this.$("#copy-apikey")), 
client.on("complete", function() {
var elem;
return $(this).popover("show"), elem = $(this), setTimeout(function() {
return function() {
return elem.popover("hide"), that.initializeCopy();
};
}(this), 2e3);
});
}, SettingsBasicInfoView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SettingsBasicInfoView = SettingsBasicInfoView;
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
var HR, SettingsEmailView, _ref;
return SettingsEmailView = function(_super) {
function SettingsEmailView() {
return SettingsEmailView.__super__.constructor.apply(this, arguments);
}
return __extends(SettingsEmailView, _super), SettingsEmailView.prototype.template = "x/settings-email", 
SettingsEmailView.prototype.class_name = "settings-email", SettingsEmailView.prototype.initialize = function() {
return this.model = HR.currentUser;
}, SettingsEmailView.prototype.events = function() {
return {
"click #update-basic-info":"update"
};
}, SettingsEmailView.prototype.render = function() {
var content, _model;
return _model = this.model.toJSON(), content = HR.appController.template(this.template, this)({
current_user:_model
}), $(this.el).html(content), this;
}, SettingsEmailView.prototype.update = function(e) {
var data, that;
return e.preventDefault(), that = this, data = {}, data.user = {}, data.user.notification = this.$("input[name=usr-email-noti]:checked").val(), 
console.log(data), this.model.save(data.user, {
success:function() {
var track_data;
return track_data = {
Page:"Email Settings"
}, HR.util.track("Edited Account Settings", track_data);
},
error:function(model, resp) {
return console.log(resp);
}
});
}, SettingsEmailView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SettingsEmailView = SettingsEmailView;
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
var HR, SettingsNavigationView, _ref;
return SettingsNavigationView = function(_super) {
function SettingsNavigationView() {
return SettingsNavigationView.__super__.constructor.apply(this, arguments);
}
return __extends(SettingsNavigationView, _super), SettingsNavigationView.prototype.template = "x/settings-navigation", 
SettingsNavigationView.prototype.className = "settings-navigation", SettingsNavigationView.prototype.initialize = function(options) {
return this.model = HR.currentUser, this.active_nav_link = options.active_nav_link, 
this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "reset", this.render);
}, SettingsNavigationView.prototype.updateData = function(model, active_nav_link) {
return this.active_nav_link = active_nav_link;
}, SettingsNavigationView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
active_nav_link:this.active_nav_link,
model:this.model.toJSON(),
throbber:HR.appController.viewLoader()
}), $(this.el).html(content), this;
}, SettingsNavigationView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SettingsNavigationView = SettingsNavigationView;
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
var HR, SettingsPasswordView, _ref;
return SettingsPasswordView = function(_super) {
function SettingsPasswordView() {
return SettingsPasswordView.__super__.constructor.apply(this, arguments);
}
return __extends(SettingsPasswordView, _super), SettingsPasswordView.prototype.template = "x/settings-password", 
SettingsPasswordView.prototype.className = "settings-password", SettingsPasswordView.prototype.initialize = function() {
return this.model = HR.currentUser;
}, SettingsPasswordView.prototype.events = function() {
return {
"submit form[name=change-password-form]":"update"
};
}, SettingsPasswordView.prototype.render = function() {
var content, _model;
return _model = this.model.toJSON(), content = HR.appController.template(this.template, this)({
current_user:_model
}), $(this.el).html(content), this;
}, SettingsPasswordView.prototype.update = function(e) {
var data, message, promise, that;
return e.preventDefault(), this.$(".response").addClass("hidden"), this.$("#usr-old-pwd, #usr-new-pwd, #usr-cnfm-pwd").removeClass("error"), 
data = {}, data.user = {}, data.user.old_password = this.$("#usr-old-pwd").val(), 
data.user.new_password = this.$("#usr-new-pwd").val(), data.user.confirm_password = this.$("#usr-cnfm-pwd").val(), 
data.user.old_password ? data.user.new_password ? data.user.new_password.length < 6 ? (message = "Password should have atleast 6 characters", 
this.$(".response").html(message).removeClass("hidden"), this.$("#usr-new-pwd").addClass("error"), 
void 0) :data.user.new_password !== data.user.confirm_password ? (message = "Passwords do not match", 
this.$(".response").html(message).removeClass("hidden"), this.$("#usr-new-pwd, #usr-cnfm-pwd").addClass("error"), 
void 0) :(HR.util.inlineLoadingStart($(e.currentTarget).find("button[type=submit]")), 
that = this, promise = this.model.updatePassword(data.user), promise.success(function(response) {
var track_data;
return track_data = {}, HR.util.track("Successfully Changed Password", track_data), 
HR.util.inlineLoadingEnd({
message:response.message
});
}), promise.error(function(response) {
var errorFields, track_data;
return track_data = {}, HR.util.track("Failed to Change Password", track_data), 
response = JSON.parse(response.responseText), errorFields = response.error_fields, 
message = response.message, errorFields = null != errorFields ? errorFields :[], 
that.$(".response").html(message).removeClass("hidden"), $.inArray("old_password", errorFields) > -1 && that.$("#usr-old-pwd").addClass("error"), 
$.inArray("new_password", errorFields) > -1 && that.$("#usr-new-pwd").addClass("error"), 
$.inArray("confirm_password", errorFields) > -1 && that.$("#usr-cnfm-pwd").addClass("error"), 
HR.util.inlineLoadingEnd({
message:null
});
})) :(message = "Please Enter a new password", this.$(".response").html(message).removeClass("hidden"), 
this.$("#usr-new-pwd").addClass("error"), void 0) :(message = "Please Enter your current password", 
this.$(".response").html(message).removeClass("hidden"), this.$("#usr-old-pwd").addClass("error"), 
void 0);
}, SettingsPasswordView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SettingsPasswordView = SettingsPasswordView;
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
var HR, SettingsReportView, _ref;
return SettingsReportView = function(_super) {
function SettingsReportView() {
return SettingsReportView.__super__.constructor.apply(this, arguments);
}
return __extends(SettingsReportView, _super), SettingsReportView.prototype.template = "x/settings-report", 
SettingsReportView.prototype.initialize = function() {
return this.model = HR.currentUser;
}, SettingsReportView.prototype.events = function() {
return {
"click #update-basic-info":"update"
};
}, SettingsReportView.prototype.render = function() {
var content, that, _model;
return that = this, _model = this.model.toJSON(), content = HR.appController.template(this.template, this)({
current_user:_model
}), $(this.el).html(content), setTimeout(function() {
var Switchery;
return Switchery = require__("switchery"), $.map($(".js-switch"), function(item) {
return new Switchery(item);
});
}), this;
}, SettingsReportView.prototype.update = function(e) {
var excel_pref, excel_prefs, excel_prefs_hash, newAttributes, pdf_pref, pdf_prefs, pdf_prefs_hash, _i, _j, _len, _len1;
for (e.preventDefault(), $(e.currentTarget).button("loading"), excel_prefs = $("input[name=excel_prefs]"), 
excel_prefs_hash = {}, _i = 0, _len = excel_prefs.length; _len > _i; _i++) excel_pref = excel_prefs[_i], 
excel_prefs_hash[excel_pref.value] = excel_pref.checked;
for (pdf_prefs = $("input[name=pdf_prefs]"), pdf_prefs_hash = {}, _j = 0, _len1 = pdf_prefs.length; _len1 > _j; _j++) pdf_pref = pdf_prefs[_j], 
pdf_prefs_hash[pdf_pref.value] = pdf_pref.checked;
return newAttributes = {
excel_prefs:excel_prefs_hash,
pdf_prefs:pdf_prefs_hash
}, this.model.save(newAttributes, {
success:function() {
return function() {
var track_data;
return track_data = {
Page:"Report Settings"
}, HR.util.track("Edited Account Settings", track_data);
};
}(this),
error:function() {
return function() {};
}(this)
});
}, SettingsReportView;
}(Backbone.View), HR = null != (_ref = window.HR) ? _ref :{}, HR.SettingsReportView = SettingsReportView;
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
var AddUsersToTeamView, HR, RemoveUserView, SettingsTeamView, TeamsUserSearchView, _ref;
return SettingsTeamView = function(_super) {
function SettingsTeamView() {
return this.addUserCallback = __bind(this.addUserCallback, this), SettingsTeamView.__super__.constructor.apply(this, arguments);
}
return __extends(SettingsTeamView, _super), SettingsTeamView.prototype.template = "x/settings-team-2", 
SettingsTeamView.prototype.className = "settings-team", SettingsTeamView.prototype.initialize = function(options) {
return null == options && (options = {}), SettingsTeamView.__super__.initialize.call(this, options), 
this.model = HR.currentUser, this.collection = options.collection, this.subviews = [], 
this.listenTo(this.collection, "change", this.render), this.listenTo(this.collection, "reset", this.render), 
this.search_view = new HR.TeamsUserSearchView();
}, SettingsTeamView.prototype.events = function() {
return {
"click .teams-main-container .table-data header":"toggleTeamContainer",
"click .js-add-team":"addTeamEvent",
"click .js-add-user":"addUserEvent",
"click .js-user-spring-hide":"hideAdvancedOptions",
"click .js-user-spring-show":"showAdvancedOptions",
"submit form[name=teams-user-search-form]":"searchUser",
"click .js-search-user":"searchUser",
"change .teams-main-container .table-body .checkbox input[name=team-user]":"multiSelect",
"change .checkbox input[name=search-user]":"multiSelectSearch",
"click *[data-toggle='dropdown']":"toggleDropdown",
"click .js-team-users-action":"teamUsersAction",
"click .js-search-users-action":"searchUsersAction",
"click .js-edit-user":"editUser",
"click .js-add-team-member":"addTeamMember",
"click .js-remove-user-from-team":"removeUserFromTeam",
"click .js-team-settings-action":"teamSettings",
"click .js-team-settings":"toggleSettingsDropdown",
"click .js-show-all":"showAllTeams",
"click .js-collapse-all":"collapseAllTeams"
};
}, SettingsTeamView.prototype.render = function() {
var content, _model;
return _model = this.model.toJSON(), this.users = {}, this.userLabels = [], _.each(this.collection.models, function(_this) {
return function(model) {
return model.get("is_owner_team") && model.get("is_owner_team") === !0 && (_this.company_owners_team_id = model.get("id")), 
_.each(model.get("users"), function(user) {
var found, u, userLabel;
return found = _.find(_this.users, function(element) {
return element.email === user.get("email");
}), userLabel = user.get("firstname") + " " + user.get("lastname") + " - " + user.get("email"), 
_.isUndefined(found) ? (_this.userLabels.push({
id:userLabel,
text:userLabel
}), u = {
email:user.get("email"),
firstname:user.get("firstname"),
lastname:user.get("lastname"),
role:user.get("role"),
user_id:user.get("user_id"),
teams:[ model.get("name") ]
}, _this.users[userLabel] = u) :(u = _this.users[userLabel], u.teams.push(model.get("name")), 
_this.users[userLabel] = u), user.get("company_owner") && user.get("company_owner") === !0 ? _this.company_owner_id = user.get("user_id") :void 0;
});
};
}(this)), content = HR.appController.template(this.template, this)({
current_user:_model,
collection:this.collection,
userLabel:this.userLabel,
users:this.users
}), $(this.el).html(content), setTimeout(function() {
var Switchery;
return Switchery = require__("switchery"), $.map($(".js-switch"), function(item) {
return new Switchery(item);
});
}), $(".dropdown-menu").mouseleave(function(e) {
return $(e.currentTarget).toggleClass("dropdown-open");
}), this;
}, SettingsTeamView.prototype.toggleTeamContainer = function(e) {
return e.preventDefault(), $(e.currentTarget).closest(".table-wrap").find("header div:first-child .icon--single").hasClass("icon-up-open") ? $(e.currentTarget).closest(".table-wrap").find("header div:first-child .icon--single").removeClass("icon-up-open").addClass("icon-down-open") :$(e.currentTarget).closest(".table-wrap").find("header div:first-child .icon--single").removeClass("icon-down-open").addClass("icon-up-open"), 
$(e.currentTarget).closest(".table-wrap").toggleClass("team-open");
}, SettingsTeamView.prototype.addTeamEvent = function(e) {
return e.preventDefault(), e.stopPropagation(), this.addTeam();
}, SettingsTeamView.prototype.addTeamAndUser = function(old_view) {
return old_view.remove(), this.addTeam(this.addUserCallback, !1);
}, SettingsTeamView.prototype.addTeam = function(callback, addUsers) {
var new_team_modal;
return null == addUsers && (addUsers = !0), new_team_modal = new HR.NewTeamView({
parent:this,
collection:this.collection,
userLabels:this.userLabels,
users:this.users,
callback:callback,
addUsers:addUsers
}), this.subviews.push(new_team_modal), this.$(".dialog-wrapper").html(new_team_modal.render().el);
}, SettingsTeamView.prototype.addUserEvent = function(e) {
return e.preventDefault(), this.addUser();
}, SettingsTeamView.prototype.addUserWithData = function() {
var user_data;
return user_data = HR.UserSettings.get("new_user_data"), HR.UserSettings.set("new_user_data", void 0), 
setTimeout(function(_this) {
return function() {
return _this.addUser(user_data);
};
}(this));
}, SettingsTeamView.prototype.addUserCallback = function() {
return this.addUserWithData();
}, SettingsTeamView.prototype.addUser = function(user_data) {
var add_user_modal;
return add_user_modal = new HR.TeamUserView({
parent:this,
collection:this.collection,
userLabels:this.userLabels,
users:this.users,
type:"add user",
user_data:user_data
}), this.subviews.push(add_user_modal), this.$(".dialog-wrapper").html(add_user_modal.render().el);
}, SettingsTeamView.prototype.editUser = function(e) {
var edit_user_modal, mapping_id;
return e.preventDefault(), mapping_id = this.$(e.currentTarget).data("mapping-id"), 
edit_user_modal = new HR.TeamUserView({
parent:this,
collection:this.collection,
userLabels:this.userLabels,
users:this.users,
type:"edit",
mapping_id:mapping_id
}), this.subviews.push(edit_user_modal), this.$(".dialog-wrapper").html(edit_user_modal.render().el);
}, SettingsTeamView.prototype.addTeamMember = function(e) {
var add_team_member_modal, team_id;
return e.preventDefault(), e.stopPropagation(), team_id = this.$(e.currentTarget).data("team-id"), 
add_team_member_modal = new HR.TeamUserView({
parent:this,
collection:this.collection,
userLabels:this.userLabels,
users:this.users,
type:"add to team",
team_id:team_id
}), this.subviews.push(add_team_member_modal), this.$(".dialog-wrapper").html(add_team_member_modal.render().el);
}, SettingsTeamView.prototype.hideAdvancedOptions = function(e) {
return e.preventDefault(), this.$(e.currentTarget).addClass("hidden"), this.$(".js-user-spring-show").removeClass("hidden"), 
this.$(".user_spring").addClass("hidden");
}, SettingsTeamView.prototype.showAdvancedOptions = function(e) {
return e.preventDefault(), this.$(e.currentTarget).addClass("hidden"), this.$(".js-user-spring-hide").removeClass("hidden"), 
this.$(".user_spring").removeClass("hidden");
}, SettingsTeamView.prototype.searchUser = function(e) {
var data, search_str, searched_users;
return e.preventDefault(), search_str = this.$("input[name=search-user]").val(), 
search_str ? (searched_users = $.grep(this.userLabels, function() {
return function(user_label) {
return user_label.id.search(new RegExp(search_str, "i")) > -1 ? !0 :!1;
};
}(this)), data = {
users:this.users,
searched_users:searched_users
}, this.search_view.setData(data, search_str), this.$(".js-search-container").html(this.search_view.render().el), 
this.$(".js-search-container").removeClass("hidden"), this.$(".js-teams-container").addClass("hidden"), 
this.$(".js-search-batch-ops-container").addClass("hidden"), this.$(".js-search-container").css("margin-top", "0px")) :(this.$(".js-search-container").addClass("hidden"), 
this.$(".js-teams-container").removeClass("hidden"), this.$(".js-search-batch-ops-container").addClass("hidden"), 
this.$(".js-search-container").css("margin-top", "0px"));
}, SettingsTeamView.prototype.multiSelect = function(e) {
var counter;
return e.preventDefault(), counter = $(e.currentTarget).closest(".table-data").find(".checkbox input:checked").length, 
this.$(e.currentTarget).is(":checked") && counter > 0 ? this.$(".teams_main_cta").hasClass("invisible") && (this.$(e.currentTarget).closest(".table-data").find(".teams_main_cta").removeClass("invisible"), 
this.$(e.currentTarget).closest(".table-data").find(".team-mem-selected").removeClass("hidden"), 
this.$(e.currentTarget).closest(".table-data").find(".team-mem-count").addClass("hidden")) :1 > counter && (this.$(e.currentTarget).closest(".table-data").find(".teams_main_cta").addClass("invisible"), 
this.$(e.currentTarget).closest(".table-data").find(".team-mem-selected").addClass("hidden"), 
this.$(e.currentTarget).closest(".table-data").find(".team-mem-count").removeClass("hidden")), 
this.$(e.currentTarget).closest(".table-data").find(".check_count").html(this.$(e.currentTarget).closest(".table-data").find(".table-body .checkbox input:checked").length);
}, SettingsTeamView.prototype.multiSelectSearch = function(e) {
var counter, total;
return e.preventDefault(), counter = this.$(e.currentTarget).closest(".table-data").find(".checkbox input:checked").length, 
total = this.$(e.currentTarget).closest(".table-data").find(".checkbox input").length, 
this.$(e.currentTarget).is(":checked") && counter > 0 ? this.$(".js-search-batch-ops-container").hasClass("hidden") && (this.$(".js-search-batch-ops-container").removeClass("hidden"), 
this.$(".js-search-container").css("margin-top", "70px")) :1 > counter && (this.$(".js-search-batch-ops-container").addClass("hidden"), 
this.$(".js-search-container").css("margin-top", "0px")), this.$(".js-search-batch-ops-container").find(".check_count").html(counter), 
this.$(".js-search-batch-ops-container").find(".check_total_count").html(total);
}, SettingsTeamView.prototype.toggleDropdown = function(e) {
return e.stopPropagation(), e.preventDefault(), $(e.currentTarget).next().toggleClass("dropdown-open");
}, SettingsTeamView.prototype.toggleSettingsDropdown = function(e) {
return e.stopPropagation(), e.preventDefault(), $(e.currentTarget).next().find(".dropdown-menu").toggleClass("dropdown-open");
}, SettingsTeamView.prototype.teamUsersAction = function(e) {
var action, company_owner_present, data, team, team_id, user_ids, user_labels, user_names, users_checboxes;
return e.stopPropagation(), e.preventDefault(), action = this.$(e.currentTarget).data("action"), 
team_id = this.$(e.currentTarget).data("team-id"), team = this.collection.get(team_id), 
users_checboxes = this.$("input[name=team-user][data-team-id=" + team_id + "]:checked"), 
user_ids = [], user_names = [], user_labels = [], company_owner_present = !1, _.each(users_checboxes, function(_this) {
return function(checkbox) {
var user_id;
return user_id = $(checkbox).data("user-id"), user_ids.push(user_id), user_id === _this.company_owner_id && (company_owner_present = !0), 
_.each(team.get("users"), function(user) {
return user.get("user_id") === user_id ? (user_names.push(user.get("firstname") + " " + user.get("lastname")), 
user_labels.push(user.get("firstname") + " " + user.get("lastname") + " - " + user.get("email"))) :void 0;
});
};
}(this)), data = {
user_ids:user_ids,
team_id:team_id,
user_names:user_names,
user_labels:user_labels,
action:action,
company_owner_present:company_owner_present
}, this.performAction(data);
}, SettingsTeamView.prototype.searchUsersAction = function(e) {
var action, company_owner_present, data, team_id, user_ids, user_names, users_checboxes;
return e.stopPropagation(), e.preventDefault(), action = this.$(e.currentTarget).data("action"), 
team_id = this.collection.models[0].get("id"), users_checboxes = this.$("input[name=search-user]:checked"), 
user_ids = [], user_names = [], company_owner_present = !1, _.each(users_checboxes, function(_this) {
return function(checkbox) {
var user_id;
return user_id = $(checkbox).data("user-id"), user_ids.push(user_id), user_id === _this.company_owner_id ? company_owner_present = !0 :void 0;
};
}(this)), data = {
user_ids:user_ids,
team_id:team_id,
action:action,
company_owner_present:company_owner_present
}, this.performAction(data);
}, SettingsTeamView.prototype.performAction = function(data) {
var action, add_to_team_modal, company_owner_present, lock_users, message, team_id, user_ids, user_labels, user_names;
return user_ids = data.user_ids, team_id = data.team_id, action = data.action, "add-to-team" === action ? (add_to_team_modal = new HR.AddUsersToTeamView({
parent:this,
collection:this.collection,
user_ids:user_ids,
team_id:team_id
}), this.subviews.push(add_to_team_modal), this.$(".dialog-wrapper").html(add_to_team_modal.render().el)) :"remove-from-team" === action ? (company_owner_present = data.company_owner_present, 
company_owner_present && team_id === this.company_owners_team_id ? HR.util.alert({
title:"Not allowed",
message:"You can't remove the company owner from owners team. Please contact support@hackerrank.com for more details"
}) :(user_names = data.user_names, user_labels = data.user_labels, message = "Are you sure you want to remove " + HR.util.arrayToString(user_names) + " from the team " + this.collection.get(team_id).get("name") + "?", 
lock_users = [], _.each(user_labels, function(_this) {
return function(user_label) {
return _this.users[user_label].teams.length <= 1 ? lock_users.push(_this.users[user_label].firstname + " " + _this.users[user_label].lastname) :void 0;
};
}(this)), lock_users.length > 0 && (message += "<br/>", message += 1 === lock_users.length ? "The account of " + HR.util.arrayToString(lock_users) + " will be locked" :"The accounts of " + HR.util.arrayToString(lock_users) + " will be locked"), 
HR.util.confirm({
title:"Confirm removing user(s)",
message:message,
okButtonText:"Yes.",
cancelButtonText:"No, go back.",
okCallback:function(_this) {
return function() {
return $.ajax({
url:"/x/api/v1/teams/" + team_id + "/users/batch_ops",
dataType:"JSON",
type:"POST",
data:{
user_ids:user_ids,
operation:"remove from team"
},
success:function() {
return _this.collection.fetch(), _this.render();
},
error:function() {
return console.log("error");
}
});
};
}(this)
}))) :void 0;
}, SettingsTeamView.prototype.removeUserFromTeam = function(e) {
var mapping_id, remove_user_modal;
return e.preventDefault(), mapping_id = this.$(e.currentTarget).data("mapping-id"), 
remove_user_modal = new HR.RemoveUserView({
parent:this,
collection:this.collection,
userLabels:this.userLabels,
users:this.users,
mapping_id:mapping_id
}), this.subviews.push(remove_user_modal), this.$(".dialog-wrapper").html(remove_user_modal.render().el);
}, SettingsTeamView.prototype.showAllTeams = function(e) {
return e.preventDefault(), this.$(".js-team-div").addClass("team-open");
}, SettingsTeamView.prototype.collapseAllTeams = function(e) {
return e.preventDefault(), this.$(".js-team-div").removeClass("team-open");
}, SettingsTeamView.prototype.teamSettings = function(e) {
var action, change_team_modal, team_id, team_model;
return e.preventDefault(), e.stopPropagation(), action = this.$(e.currentTarget).data("action"), 
team_id = this.$(e.currentTarget).data("team-id"), "change-name" === action ? (change_team_modal = new HR.NewTeamView({
parent:this,
collection:this.collection,
team_id:team_id
}), this.subviews.push(change_team_modal), this.$(".dialog-wrapper").html(change_team_modal.render().el)) :"delete-team" === action ? (team_model = this.collection.get(team_id), 
team_model.get("users").length > 0 ? HR.util.alert({
title:"Not allowed",
message:"Please remove all members from this team before deleting it"
}) :HR.util.confirm({
title:"Confirm team delete",
message:"Are you sure you want to delete " + team_model.get("name") + " team?",
okButtonText:"Yes, delete this team.",
cancelButtonText:"No, go back.",
okCallback:function(_this) {
return function() {
return team_model.destroy({
success:function() {
return _this.collection.fetch(), _this.render();
},
error:function() {
return console.log("error");
}
});
};
}(this)
})) :void 0;
}, SettingsTeamView;
}(window.HR.GenericView), TeamsUserSearchView = function(_super) {
function TeamsUserSearchView() {
return TeamsUserSearchView.__super__.constructor.apply(this, arguments);
}
return __extends(TeamsUserSearchView, _super), TeamsUserSearchView.prototype.template = "x/teams-user-search-view", 
TeamsUserSearchView.prototype.className = "teams-user-search", TeamsUserSearchView.prototype.setData = function(data, search_str) {
return this.data = data, this.search_str = search_str;
}, TeamsUserSearchView.prototype.render = function() {
var content;
return content = HR.appController.template(this.template, this)({
data:this.data,
search_string:this.search_str
}), $(this.el).html(content), this;
}, TeamsUserSearchView;
}(window.HR.GenericView), RemoveUserView = function(_super) {
function RemoveUserView() {
return RemoveUserView.__super__.constructor.apply(this, arguments);
}
return __extends(RemoveUserView, _super), RemoveUserView.prototype.template = "x/teams-remove-user", 
RemoveUserView.prototype.className = "teams-remove-user", RemoveUserView.prototype.initialize = function(options) {
return this.parent = options.parent, this.userLabels = options.userLabels, this.users = options.users, 
this.mapping_id = options.mapping_id, RemoveUserView.__super__.initialize.call(this, options);
}, RemoveUserView.prototype.render = function() {
return $(this.el).empty(), this.user_data = {}, _.each(this.collection.models, function(_this) {
return function(model) {
return _.each(model.get("users"), function(user) {
return user.get("id") === _this.mapping_id ? (_this.model = user, _this.user_data = user.toJSON(), 
_this.user_data.team = {
id:model.get("id"),
name:model.get("name")
}) :void 0;
});
};
}(this)), $(this.el).html(HR.appController.template(this.template, this)({
user_data:this.user_data,
users:this.users,
userLabel:this.model.get("firstname") + " " + this.model.get("lastname") + " - " + this.model.get("email")
})), this.$("#remove-user-modal").modal(), this;
}, RemoveUserView.prototype.events = function() {
return {
"click .js-remove-user":"removeUser"
};
}, RemoveUserView.prototype.removeUser = function(e) {
return e.preventDefault(), this.model.destroy({
success:function(_this) {
return function() {
return _this.$("button.close").click(), setTimeout(function() {
return _this.collection.fetch({
success:function() {
return _this.parent.render();
}
});
}, 1e3);
};
}(this),
error:function() {
return function() {
return console.log("error");
};
}(this)
});
}, RemoveUserView;
}(window.HR.GenericView), AddUsersToTeamView = function(_super) {
function AddUsersToTeamView() {
return AddUsersToTeamView.__super__.constructor.apply(this, arguments);
}
return __extends(AddUsersToTeamView, _super), AddUsersToTeamView.prototype.template = "x/add-users-to-team", 
AddUsersToTeamView.prototype.className = "add-users-to-team", AddUsersToTeamView.prototype.initialize = function(options) {
return this.parent = options.parent, this.user_ids = options.user_ids, this.team_id = options.team_id, 
AddUsersToTeamView.__super__.initialize.call(this, options);
}, AddUsersToTeamView.prototype.render = function() {
var teams;
return $(this.el).empty(), teams = _.map(this.collection.models, function() {
return function(model) {
return {
id:model.get("id"),
text:model.get("name")
};
};
}(this)), $(this.el).html(HR.appController.template(this.template, this)), this.$("#remove-user-modal").modal(), 
setTimeout(function(_this) {
return function() {
return _this.$("input[name=user-teams-select]").select2({
data:teams,
multiple:!0
});
};
}(this)), this;
}, AddUsersToTeamView.prototype.events = function() {
return {
"click .js-add-users-to-team":"addUsersToTeam"
};
}, AddUsersToTeamView.prototype.addUsersToTeam = function(e) {
var teams;
return e.preventDefault(), teams = this.$("input[name=user-teams-select]").val().split(","), 
$.ajax({
url:"/x/api/v1/teams/" + this.team_id + "/users/batch_ops",
dataType:"JSON",
type:"POST",
data:{
user_ids:this.user_ids,
team_ids:teams,
operation:"add to other teams"
},
success:function(_this) {
return function() {
return _this.$(".close").click(), _this.collection.fetch(), _this.parent.render();
};
}(this),
error:function() {
return function() {
return console.log("error");
};
}(this)
});
}, AddUsersToTeamView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SettingsTeamView = SettingsTeamView, 
HR.TeamsUserSearchView = TeamsUserSearchView, HR.RemoveUserView = RemoveUserView, 
HR.AddUsersToTeamView = AddUsersToTeamView;
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
var HR, TestAcknowledgementTextView, _ref;
return TestAcknowledgementTextView = function(_super) {
function TestAcknowledgementTextView() {
return TestAcknowledgementTextView.__super__.constructor.apply(this, arguments);
}
return __extends(TestAcknowledgementTextView, _super), TestAcknowledgementTextView.prototype.initialize = function() {
var that;
return that = this;
}, TestAcknowledgementTextView.prototype.template = "x/test-custom-acknowledgement", 
TestAcknowledgementTextView.prototype.className = "test-custom-acknowledgement", 
TestAcknowledgementTextView.prototype.showSuccess = !1, TestAcknowledgementTextView.prototype.formName = null, 
TestAcknowledgementTextView.prototype.events = function() {
return {
"submit form[name=test-ack-form]":"setCustomAcknowledge",
"change input[name=enable-acknowledgement]":"showAckText"
};
}, TestAcknowledgementTextView.prototype.showAckText = function() {
var shuffling;
return shuffling = this.$("input[name=enable-acknowledgement]").attr("checked"), 
shuffling ? this.$(".js-ack-text").slideDown() :this.$(".js-ack-text").slideUp();
}, TestAcknowledgementTextView.prototype._render = function() {
var content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content)), this.showSuccess && (HR.util.showInlineSuccess(this, this.$("button[type=submit]")), 
this.showSuccess = !1), this.timer && clearTimeout(this.timer), this.timer = setTimeout(function(_this) {
return function() {
return _this.$(".switch").bootstrapSwitch();
};
}(this), 200), this;
}, TestAcknowledgementTextView.prototype.setCustomAcknowledge = function(e) {
var ack_text, attrs, shuffling, that;
if (e.preventDefault(), that = this, this.$(".validation-error").addClass("hidden"), 
ack_text = this.$("textarea[name=test-acknowledgement]").removeClass("error").val(), 
shuffling = this.$("input[name=enable-acknowledgement]").attr("checked"), attrs = shuffling ? {
enable_acknowledgement:"True"
} :{
enable_acknowledgement:"False"
}, ack_text) attrs.custom_acknowledge_text = ack_text; else if ("True" === attrs.enable_acknowledgement) return this.$("textarea[name=test-acknowledgement]").addClass("error"), 
HR.util.inlineLoadingEnd({
message:null
}), void 0;
return this.model.save(attrs, {
success:function() {
return that.showSuccess = !0, that.render();
},
error:function(model, jqXhr) {
var response;
return response = $.parseJSON(jqXhr.responseText), that.$("input[name=test-acknowledgement]").addClass("error"), 
that.$(".validation-error").find(".error").html(response.message), that.$(".validation-error").removeClass("hidden");
},
silent:!0
});
}, TestAcknowledgementTextView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestAcknowledgementTextView = TestAcknowledgementTextView;
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
var HR, TestAdminView, _ref;
return TestAdminView = function(_super) {
function TestAdminView() {
return TestAdminView.__super__.constructor.apply(this, arguments);
}
return __extends(TestAdminView, _super), TestAdminView.prototype.initialize = function() {
var that;
return that = this;
}, TestAdminView.prototype.template = "x/test-admin", TestAdminView.prototype.className = "test-admin", 
TestAdminView.prototype.showSuccess = !1, TestAdminView.prototype.events = function() {
return {
"submit form[name=test-admin-form]":"saveTestAdmin"
};
}, TestAdminView.prototype.render = function() {
var content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content), this.showSuccess && (HR.util.showInlineSuccess(this, this.$("button[type=submit]")), 
this.showSuccess = !1)), this;
}, TestAdminView.prototype.saveTestAdmin = function(e) {
var testAdmins, that;
return e.preventDefault(), that = this, this.$(".validation-error").addClass("hidden"), 
testAdmins = this.$("input[name=test-admins]").removeClass("error").val(), testAdmins ? (this.model.set("test_admins", testAdmins, {
silent:!0
}), this.model.save(null, {
success:function() {
return function() {
return that.showSuccess = !0, that.render();
};
}(this),
error:function(_this) {
return function(model, jqXhr) {
var response;
return _this.model.set("test_admins", _this.model.previousAttributes().test_admins, {
silent:!0
}), response = $.parseJSON(jqXhr.responseText), _this.$("input[name=test-admins]").addClass("error"), 
_this.$(".validation-error").find(".error").html(response.message), _this.$(".validation-error").removeClass("hidden");
};
}(this)
})) :(this.$("input[name=test-admins]").addClass("error"), HR.util.inlineLoadingEnd({
message:null
}));
}, TestAdminView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestAdminView = TestAdminView;
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
var HR, TestAdvancedCandidateOptionsView, _ref;
return TestAdvancedCandidateOptionsView = function(_super) {
function TestAdvancedCandidateOptionsView() {
return TestAdvancedCandidateOptionsView.__super__.constructor.apply(this, arguments);
}
return __extends(TestAdvancedCandidateOptionsView, _super), TestAdvancedCandidateOptionsView.prototype.initialize = function() {
var that;
return that = this;
}, TestAdvancedCandidateOptionsView.prototype.template = "x/test-advanced-candidate-options", 
TestAdvancedCandidateOptionsView.prototype.className = "test-questions-shuffling", 
TestAdvancedCandidateOptionsView.prototype.events = function() {
return {
"submit form[name=candidate-options-form]":"saveCandidateOptions"
};
}, TestAdvancedCandidateOptionsView.prototype._render = function() {
var content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content)), this.timer && clearTimeout(this.timer), this.timer = setTimeout(function(_this) {
return function() {
return _this.$(".switch").bootstrapSwitch();
};
}(this), 200), this;
}, TestAdvancedCandidateOptionsView.prototype.saveCandidateOptions = function(e) {
var attrs, hide_compile_test, hide_custom_testcase, hide_template;
return e.preventDefault(), hide_template = !this.$("input[name=hide_template]").attr("checked"), 
hide_custom_testcase = !this.$("input[name=hide_custom_testcase]").attr("checked"), 
hide_compile_test = !this.$("input[name=hide_compile_test]").attr("checked"), attrs = {
hide_template:hide_template ? "True" :"False",
hide_custom_testcase:hide_custom_testcase ? "True" :"False",
hide_compile_test:hide_compile_test ? "True" :"False"
}, console.log(attrs), this.model.save(attrs, {
silent:!0
});
}, TestAdvancedCandidateOptionsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestAdvancedCandidateOptionsView = TestAdvancedCandidateOptionsView;
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
var HR, TestAdvancedSearchView, _ref;
return TestAdvancedSearchView = function(_super) {
function TestAdvancedSearchView() {
return this.getFilter = __bind(this.getFilter, this), TestAdvancedSearchView.__super__.constructor.apply(this, arguments);
}
return __extends(TestAdvancedSearchView, _super), TestAdvancedSearchView.prototype.initialize = function(options) {
return this.parent = options.parent, this.page = options.page, this.filter_groups = {
"question-name":"question",
"question-question":"question",
"test-user_name":"owner",
"test-user_email":"owner",
"test-name":"test",
"test-created_at":"created_at"
}, this.public_url_keywords = {
question:[ "question-question", "question-name" ],
test:[ "test-name" ],
owner:[ "test-user_name", "test-user_email" ],
created:[ "test-created_at" ]
}, this.dataTypes = {
created_at:"date"
}, this.updateFiltersFromPath(options.filters), HR.search.tests.setGroups(this.filter_groups), 
HR.search.tests.setDataTypes(this.dataTypes), _.values(this.filters).length >= 0 && "" !== options.filters ? this.updateResults() :void 0;
}, TestAdvancedSearchView.prototype.template = "x/test-advanced-search", TestAdvancedSearchView.prototype.className = "test-advanced-search", 
TestAdvancedSearchView.prototype.events = function() {
return {
"submit form[name=search]":"basicSearch",
"submit form[name=advanced-search]":"advancedSearch",
"click .js-dateclear":"clearDate",
"click .js-clearAll":"clearAll",
"click .js-clear":"clearFilter"
};
}, TestAdvancedSearchView.prototype.clearFilter = function(e) {
return e.preventDefault(), $(e.target).parent().parent().find("input").val(""), 
this.advancedSearch();
}, TestAdvancedSearchView.prototype.clearAll = function(e) {
return e && e.preventDefault(), this.filters = {}, this.render(), this.clearDate();
}, TestAdvancedSearchView.prototype.clearDate = function(e) {
return e && e.preventDefault(), $(".js-daterange").val(""), this.date_filters = {}, 
$(".js-dateclear").hide(), this.advancedSearch();
}, TestAdvancedSearchView.prototype.basicSearch = function(test_name) {
return this.filters = {}, this.filters["test-name"] = test_name, this.page = 1, 
this.updateResults();
}, TestAdvancedSearchView.prototype.updateFiltersFromPath = function(filter_string) {
return this.filters = {}, this.date_filters = {}, filter_string = filter_string.replace("?", ""), 
_.each(filter_string.split("&"), function(_this) {
return function(filter) {
return "" !== filter ? (filter = filter.split("|"), _.each(_this.public_url_keywords[filter[0]], function(key) {
return filter[1] ? _this.filters[key] = filter[1] :void 0;
})) :void 0;
};
}(this));
}, TestAdvancedSearchView.prototype.getFilter = function(filter_name) {
return this.filters[filter_name] || null;
}, TestAdvancedSearchView.prototype.advancedSearch = function(e) {
return e && e.preventDefault(), this.filters = _.clone(this.date_filters), "" !== this.$("#test-name").val() && (this.filters["test-name"] = this.$("#test-name").val()), 
"" !== this.$("#question").val() && (this.filters["question-name"] = this.$("#question").val(), 
this.filters["question-question"] = this.$("#question").val()), "" !== this.$("#owner").val() && (this.filters["test-user_name"] = this.$("#owner").val(), 
this.filters["test-user_email"] = this.$("#owner").val()), this.page = 1, this.updateResults();
}, TestAdvancedSearchView.prototype.searchPath = function() {
var filter_url;
return filter_url = this.filterString().split("|").join("="), "/tests/search/" + filter_url;
}, TestAdvancedSearchView.prototype.filterString = function(backend) {
var urlstring, user_filters;
return null == backend && (backend = !1), backend ? user_filters = this.filters :(user_filters = {}, 
_.each(this.filters, function(_this) {
return function(value, key) {
return user_filters[_this.filter_groups[key]] = value;
};
}(this))), urlstring = _.map(user_filters, function() {
return function(value, key) {
return "" + key + "|" + value;
};
}(this)), backend ? urlstring.join(",") :(this.parent.filters = "?" + urlstring.join("&"), 
"?" + urlstring.join("&"));
}, TestAdvancedSearchView.prototype.getTids = function() {
return HR.search.tests.search(this.filters);
}, TestAdvancedSearchView.prototype.updateResults = function() {
return Backbone.history.navigate(this.searchPath() + ("&page=" + this.page)), this.parent.collection.setFilterString(this.filterString(!0)), 
this.parent.collection.setPage(this.page), this.parent.collection.fetch({
reset:!0,
success:function() {
return function(collection) {
return collection.trigger("change");
};
}(this)
});
}, TestAdvancedSearchView.prototype.render = function() {
var content, dateString, endDate, startDate;
return content = HR.appController.template(this.template, this)({
filters:this.filters
}), $(this.el).html(content), this.filters["test-created_at"] ? (dateString = this.filters["test-created_at"].split(".."), 
startDate = dateString[0], endDate = dateString[1], this.$(".js-daterange").val(this.filters["test-created_at"].replace("..", " to ")), 
$(".js-dateclear").show()) :(startDate = "1970-01-01", endDate = moment()), this.$(".js-daterange").daterangepicker({
latestDate:"today",
separator:" to ",
format:"YYYY-MM-DD",
ranges:{
"Last week":[ moment().add("days", -7), moment().format() ],
"Last 2 weeks":[ moment().add("days", -14), moment().format() ],
"Last 30 days":[ moment().add("days", -30), moment().format() ],
"This Month":[ moment().startOf("month"), moment().endOf("month") ],
"Last month":[ moment().subtract("month", 1).startOf("month"), moment().subtract("month", 1).endOf("month") ],
"Past year":[ moment().add("days", -365), moment().format() ]
},
startDate:startDate,
endDate:endDate
}, function(_this) {
return function(start, end) {
return _this.$(".js-dateclear").removeClass("hide"), _this.date_filters["test-created_at"] = start.format("YYYY-MM-DD") + ".." + end.format("YYYY-MM-DD"), 
$(".js-dateclear").show(), _this.advancedSearch();
};
}(this)), $(".input-icon").each(function() {
return function(index, input) {
return "" !== $(input).find("input").val() ? $(input).find("a").show() :$(input).find("a").hide();
};
}(this)), this;
}, TestAdvancedSearchView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestAdvancedSearchView = TestAdvancedSearchView;
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
var HR, TestAdvancedSettingsView, _ref;
return TestAdvancedSettingsView = function(_super) {
function TestAdvancedSettingsView() {
return TestAdvancedSettingsView.__super__.constructor.apply(this, arguments);
}
return __extends(TestAdvancedSettingsView, _super), TestAdvancedSettingsView.prototype.initialize = function() {
var that;
return that = this, this._subviews = [], this.listenTo(this.model, "change", this.render);
}, TestAdvancedSettingsView.prototype.template = "x/test-advanced-settings", TestAdvancedSettingsView.prototype.className = "test-advanced-settings", 
TestAdvancedSettingsView.prototype.render = function() {
var content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content)), this.custom_link_view = new HR.TestCustomLinkView({
model:this.model
}), this.custom_acknowledge_text = new HR.TestAcknowledgementTextView({
model:this.model
}), this.test_admin_view = new HR.TestAdminView({
model:this.model
}), this.cutoff_score_view = new HR.TestCutoffScoreView({
model:this.model
}), this.master_password_view = new HR.TestMasterPasswordView({
model:this.model
}), this.questions_shuffling_view = new HR.TestQuestionsShufflingView({
model:this.model
}), this.candidate_options = new HR.TestAdvancedCandidateOptionsView({
model:this.model
}), this.allowed_languages_view = new HR.TestAllowedLanguagesView({
model:this.model
}), this.duplicate_test_view = new HR.TestDuplicateView({
model:this.model
}), this.delete_test_view = new HR.TestDeleteView({
model:this.model
}), this.mcq_score_view = new HR.TestMcqScoreView({
model:this.model
}), this.time_settings_view = new HR.TestTimeSettingsView({
model:this.model
}), this.assign({
"div#custom_link":this.custom_link_view,
"div#ack_text":this.custom_acknowledge_text,
"div#time_settings":this.time_settings_view,
"div#test_admin":this.test_admin_view,
"div#cutoff_score":this.cutoff_score_view,
"div#mcq_score":this.mcq_score_view,
"div#master_password":this.master_password_view,
"div#questions_shuffling":this.questions_shuffling_view,
"div#allowed_languages":this.allowed_languages_view,
"div#duplicate_test":this.duplicate_test_view,
"div#delete_test":this.delete_test_view,
"div#candidate_options":this.candidate_options
}), this._subviews.push(this.custom_link_view, this.time_settings_view, this.test_admin_view, this.cutoff_score_view, this.mcq_score_view, this.master_password_view, this.questions_shuffling_view, this.allowed_languages_view, this.duplicate_test_view, this.delete_test_view, this.candidate_options), 
this;
}, TestAdvancedSettingsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestAdvancedSettingsView = TestAdvancedSettingsView;
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
var HR, TestAllowedLanguagesView, _ref;
return TestAllowedLanguagesView = function(_super) {
function TestAllowedLanguagesView() {
return TestAllowedLanguagesView.__super__.constructor.apply(this, arguments);
}
return __extends(TestAllowedLanguagesView, _super), TestAllowedLanguagesView.prototype.initialize = function() {
var that;
return that = this;
}, TestAllowedLanguagesView.prototype.template = "x/test-allowed-languages", TestAllowedLanguagesView.prototype.className = "test-allowed-languages", 
TestAllowedLanguagesView.prototype.events = function() {
return {
"click #select_all":"toggleCheckbox",
"submit form[name=test-allowedLanguages-form]":"saveAllowedLanguages"
};
}, TestAllowedLanguagesView.prototype._render = function() {
var allowedLanguages, content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (allowedLanguages = [], 
_model.allowedLanguages && (allowedLanguages = _model.allowedLanguages.split(",")), 
content = HR.appController.template(this.template, this)({
model:_model,
allowedLanguages:allowedLanguages,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content)), this;
}, TestAllowedLanguagesView.prototype.toggleCheckbox = function(e) {
var status;
return e.preventDefault(), status = $(e.currentTarget).hasClass("active") ? "" :"checked", 
"checked" === status ? this.changeAllCheckboxes(status) :void 0;
}, TestAllowedLanguagesView.prototype.changeAllCheckboxes = function(status) {
var languages;
return languages = this.$("input[name='allowedLanguages']"), "checked" === status ? _.each(languages, function(lang) {
return $(lang).attr("checked", "checked");
}) :_.each(languages, function(lang) {
return $(lang).removeAttr("checked");
});
}, TestAllowedLanguagesView.prototype.saveAllowedLanguages = function(e) {
var allowedLanguages, attrs, languages;
return e.preventDefault(), allowedLanguages = [], languages = $("input[name=allowedLanguages]:checked"), 
_.each(languages, function() {
return function(lang) {
return allowedLanguages.push(lang.value);
};
}(this)), attrs = {
allowedLanguages:allowedLanguages.join(",")
}, this.model.save(attrs, {
silent:!0
});
}, TestAllowedLanguagesView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestAllowedLanguagesView = TestAllowedLanguagesView;
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
var HR, TestCandidateSettingsView, _ref;
return TestCandidateSettingsView = function(_super) {
function TestCandidateSettingsView() {
return TestCandidateSettingsView.__super__.constructor.apply(this, arguments);
}
return __extends(TestCandidateSettingsView, _super), TestCandidateSettingsView.prototype.initialize = function() {
var that;
return that = this, this.listenTo(this.model, "change", this.render);
}, TestCandidateSettingsView.prototype.template = "x/test-candidate-settings", TestCandidateSettingsView.prototype.className = "test-candidate-settings", 
TestCandidateSettingsView.prototype.events = function() {
return {
"submit form[name=test-candidate-settings-form]":"saveCandidateSettings",
"submit form[name=add-custom-detail-form]":"addCustomField",
"click .js-add-custom-field":"addCustomField"
};
}, TestCandidateSettingsView.prototype.render = function() {
var content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
throbber:HR.appController.viewLoader(),
candidateSettings:this.prepareCandidateDetails()
}), $(this.el).html(content)), this;
}, TestCandidateSettingsView.prototype.prepareCandidateDetails = function() {
var candidateSettings, collectData, collectExtraData;
return collectData = this.model.get("collect_data") ? this.model.get("collect_data") :!1, 
candidateSettings = {}, _.each(HR.util.getCandidateDetailsMapping(), function(detail, mapping) {
var currentSettings;
return currentSettings = {
value:mapping,
label:detail,
name:"collect_candidate_details"
}, collectData && -1 !== _.indexOf(collectData, mapping) && (currentSettings.checked = "checked"), 
candidateSettings[mapping] = currentSettings;
}), this.model.get("collect_data_extra") && (collectExtraData = this.model.get("collect_data_extra"), 
_.each(collectExtraData, function(detail) {
var currentSettings, title;
return currentSettings = {
value:detail,
label:detail,
name:"collect_candidate_details_extra",
checked:"checked"
}, title = HR.util.convertToSlug(detail), candidateSettings[title] = currentSettings;
})), candidateSettings;
}, TestCandidateSettingsView.prototype.addCustomField = function(e) {
var fieldName;
return e.preventDefault(), fieldName = $("input[name=custom_field]").removeClass("error").bind("keyup", function(e) {
return $(e.currentTarget).unbind("keyup").removeClass("error");
}).val(), _.isEmpty(fieldName) ? ($("input[name=custom_field]").addClass("error").focus(), 
void 0) :this.saveCandidateSettings(null);
}, TestCandidateSettingsView.prototype.saveCandidateSettings = function(e) {
var additional_detail, additional_details, collect_candidate_additional_details, collect_candidate_details, custom_field, detail, details, _i, _j, _len, _len1;
if ($("input[name=custom_field]").removeClass("error"), e && e.preventDefault(), 
details = $("input[name=collect_candidate_details]:checked")) {
for (collect_candidate_details = [], _i = 0, _len = details.length; _len > _i; _i++) detail = details[_i], 
collect_candidate_details.push(detail.value);
this.model.set("collect_data", collect_candidate_details, {
silent:!0
});
}
if (additional_details = $("input[name=collect_candidate_details_extra]:checked"), 
custom_field = $("input[name=custom_field]").val(), additional_details || custom_field) {
if (collect_candidate_additional_details = [], additional_details) for (_j = 0, 
_len1 = additional_details.length; _len1 > _j; _j++) additional_detail = additional_details[_j], 
collect_candidate_additional_details.push(additional_detail.value);
custom_field && collect_candidate_additional_details.push(custom_field), this.model.set("collect_data_extra", collect_candidate_additional_details, {
silent:!0
});
}
return this.model.save(null, {
success:function(_this) {
return function() {
var track_data;
return track_data = {
Page:"Candidate Settings",
test_id:_this.model.get("id")
}, HR.util.track("Edited Test Settings", track_data), _this.model.fetch();
};
}(this)
});
}, TestCandidateSettingsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestCandidateSettingsView = TestCandidateSettingsView;
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
var TestCreateSavedMessageDialogView;
return TestCreateSavedMessageDialogView = function(_super) {
function TestCreateSavedMessageDialogView() {
return TestCreateSavedMessageDialogView.__super__.constructor.apply(this, arguments);
}
return __extends(TestCreateSavedMessageDialogView, _super), TestCreateSavedMessageDialogView.prototype.template = "x/test-create-saved-message-dialog", 
TestCreateSavedMessageDialogView.prototype.events = function() {
return {
"click a.cancel-dialog":this.closeDialog,
"click a.create-saved-message":this.createSavedMessage,
"blur input.error":this.removeError
};
}, TestCreateSavedMessageDialogView.prototype.initialize = function(options) {
return null == options && (options = {}), this.message = options.message, this.parent = options.parent;
}, TestCreateSavedMessageDialogView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)), this.$("#test-create-saved-message-modal").modal(), 
this;
}, TestCreateSavedMessageDialogView.prototype.removeError = function(e) {
return $(e.target).removeClass("error").closest(".error").removeClass("error");
}, TestCreateSavedMessageDialogView.prototype.setError = function(error_msg, message) {
return null == error_msg && (error_msg = null), null == message && (message = ""), 
setTimeout(function() {
return HR.util.inlineLoadingEnd({
message:message
});
}), error_msg && ($("#create-saved-msg-name").addClass("error").parent().addClass("error"), 
this.$(".alert").removeClass("hidden").html(error_msg)), this;
}, TestCreateSavedMessageDialogView.prototype.createSavedMessage = function(e) {
var attrs, message_name, saved_messages, that, _ref;
return e.preventDefault(), this.$(".alert").addClass("hidden"), $("#create-saved-msg-name").removeClass("error").parent().removeClass("error"), 
message_name = $("#create-saved-msg-name").val(), message_name.length > 32 ? this.setError("Title cannot be more than 32 characters.") :message_name ? (saved_messages = null != (_ref = this.model.get("saved_messages")) ? _ref :{}, 
saved_messages[message_name] = this.message, attrs = {
saved_messages:saved_messages
}, that = this, this.model.save(attrs, {
success:function() {
return setTimeout(function() {
return that.$(".close").click(), that.parent.render(), HR.util.inlineLoadingEnd({
message:"Template '" + message_name + "' has been saved"
});
}, 1500);
}
})) :this.setError("Enter a Title for the message", "Could not save template");
}, TestCreateSavedMessageDialogView.prototype.closeDialog = function(e) {
return e.preventDefault(), this.$(".close").click();
}, TestCreateSavedMessageDialogView;
}(window.HR.GenericView), HR.TestCreateSavedMessageDialogView = TestCreateSavedMessageDialogView;
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
var HR, TestCustomLinkView, _ref;
return TestCustomLinkView = function(_super) {
function TestCustomLinkView() {
return TestCustomLinkView.__super__.constructor.apply(this, arguments);
}
return __extends(TestCustomLinkView, _super), TestCustomLinkView.prototype.initialize = function() {
var that;
return that = this;
}, TestCustomLinkView.prototype.template = "x/test-custom-link", TestCustomLinkView.prototype.className = "test-custom-link", 
TestCustomLinkView.prototype.showSuccess = !1, TestCustomLinkView.prototype.formName = null, 
TestCustomLinkView.prototype.events = function() {
return {
"submit form[name=short-test-url-form]":"createShortURL",
"submit form[name=public-test-url-form]":"createPublicURL"
};
}, TestCustomLinkView.prototype.render = function() {
var content, element, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content), this.showSuccess && this.formName && (element = $("form[name=" + this.formName + "]"), 
HR.util.showInlineSuccess(this, element), this.showSuccess = this.formName = !1)), 
this;
}, TestCustomLinkView.prototype.createPublicURL = function(e) {
var attrs, public_url;
return e.preventDefault(), public_url = $("input[name=public-test-url]").removeClass("error").val(), 
attrs = {
short_url:public_url,
type:"public"
}, public_url ? this.sendAjaxRequest(e, attrs, "public-test-url-form") :$("input[name=public-test-url]").addClass("error").focus();
}, TestCustomLinkView.prototype.createShortURL = function(e) {
var attrs, short_url;
return e.preventDefault(), short_url = $("input[name=short-test-url]").removeClass("error").val(), 
attrs = {
short_url:short_url,
type:"short"
}, short_url ? this.sendAjaxRequest(e, attrs, "short-test-url-form") :$("input[name=short-test-url]").addClass("error").focus();
}, TestCustomLinkView.prototype.sendAjaxRequest = function(e, attrs, formName) {
var that;
return that = this, HR.util.inlineLoadingStart($(e.currentTarget)), $.ajax({
url:"/x/api/v1/tests/" + that.model.get("id") + "/link",
data:attrs,
type:"POST",
success:function(_this) {
return function(data) {
return HR.util.inlineLoadingEnd(data), "Success" === data.message ? _this.model.fetch({
silent:!0,
success:function() {
return that.showSuccess = !0, that.formName = formName, that.render();
}
}) :void 0;
};
}(this),
error:function(data) {
var response;
return response = JSON.parse(data.responseText), HR.util.inlineLoadingEnd(response);
}
});
}, TestCustomLinkView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestCustomLinkView = TestCustomLinkView;
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
var HR, TestCutoffScoreView, _ref;
return TestCutoffScoreView = function(_super) {
function TestCutoffScoreView() {
return TestCutoffScoreView.__super__.constructor.apply(this, arguments);
}
return __extends(TestCutoffScoreView, _super), TestCutoffScoreView.prototype.initialize = function() {
var that;
return that = this;
}, TestCutoffScoreView.prototype.template = "x/test-cutoff-score", TestCutoffScoreView.prototype.className = "test-cutoff-score", 
TestCutoffScoreView.prototype.showSuccess = !1, TestCutoffScoreView.prototype.events = function() {
return {
"submit form[name=test-cutoff-score-form]":"saveTestCutoff",
"keydown input[name=cutoff-score]":"checkInput"
};
}, TestCutoffScoreView.prototype.render = function() {
var content, _model;
return _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content), this.showSuccess && (HR.util.showInlineSuccess(this, this.$("button[type=submit]")), 
this.showSuccess = !1)), this;
}, TestCutoffScoreView.prototype.checkInput = function(e) {
return $(e.currentTarget).removeClass("error"), e.keyCode >= 65 && !(e.keyCode >= 96 && e.keyCode <= 105) || e.shiftKey ? ($(e.currentTarget).addClass("error"), 
!1) :void 0;
}, TestCutoffScoreView.prototype.saveTestCutoff = function(e) {
var attrs, cutoff, that;
return e.preventDefault(), that = this, cutoff = $("input[name=cutoff-score]").removeClass("error").val(), 
cutoff ? (attrs = {
cutoff_score:parseInt(cutoff, 10)
}, this.model.save(attrs, {
silent:!0,
success:function() {
return that.showSuccess = !0, that.render();
}
})) :(this.$("input[name=cutoff-score]").addClass("error"), HR.util.inlineLoadingEnd({
message:null
}));
}, TestCutoffScoreView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestCutoffScoreView = TestCutoffScoreView;
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
var TestDeleteSavedMessageDialogView;
return TestDeleteSavedMessageDialogView = function(_super) {
function TestDeleteSavedMessageDialogView() {
return TestDeleteSavedMessageDialogView.__super__.constructor.apply(this, arguments);
}
return __extends(TestDeleteSavedMessageDialogView, _super), TestDeleteSavedMessageDialogView.prototype.template = "x/test-delete-saved-message-dialog", 
TestDeleteSavedMessageDialogView.prototype.events = function() {
return {
"click a.cancel-dialog":this.closeDialog,
"click a.delete-saved-message":this.deleteSavedMessage
};
}, TestDeleteSavedMessageDialogView.prototype.initialize = function(options) {
return null == options && (options = {}), this.name = options.name, this.parent = options.parent;
}, TestDeleteSavedMessageDialogView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)), this.$("#test-delete-saved-message-modal").modal(), 
this;
}, TestDeleteSavedMessageDialogView.prototype.deleteSavedMessage = function(e) {
var attrs, saved_messages, that, _ref;
return e.preventDefault(), saved_messages = null != (_ref = this.model.get("saved_messages")) ? _ref :{}, 
saved_messages ? (delete saved_messages[this.name], attrs = {
saved_messages:saved_messages
}, that = this, this.model.save(attrs, {
success:function() {
return setTimeout(function() {
return that.$(".close").click(), that.parent.render(), HR.util.inlineLoadingEnd({
message:"Template '" + that.name + "' has been deleted"
});
});
}
})) :void 0;
}, TestDeleteSavedMessageDialogView.prototype.closeDialog = function(e) {
return e.preventDefault(), this.$(".close").click();
}, TestDeleteSavedMessageDialogView;
}(window.HR.GenericView), HR.TestDeleteSavedMessageDialogView = TestDeleteSavedMessageDialogView;
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
var HR, TestDeleteView, _ref;
return TestDeleteView = function(_super) {
function TestDeleteView() {
return TestDeleteView.__super__.constructor.apply(this, arguments);
}
return __extends(TestDeleteView, _super), TestDeleteView.prototype.initialize = function() {
var that;
return that = this;
}, TestDeleteView.prototype.template = "x/test-delete", TestDeleteView.prototype.className = "test-delete", 
TestDeleteView.prototype.events = function() {
return {
"click #delete_test_confirmation":"deleteTestConfirmation",
"click .cancel-test-delete":"closeDialog",
"click .delete-test":"deleteTest"
};
}, TestDeleteView.prototype._render = function() {
var content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content)), this;
}, TestDeleteView.prototype.deleteTestConfirmation = function(e) {
return e.preventDefault(), this.$("#test-delete-confirm-dialog").modal();
}, TestDeleteView.prototype.closeDialog = function(e) {
return e.preventDefault(), this.$(".close").click();
}, TestDeleteView.prototype.deleteTest = function(e) {
return e.preventDefault(), this.$(".close").click(), this.model.destroy({
success:function() {
return Backbone.history.navigate("tests", !0), setTimeout(function() {
return HR.util.ajaxmsg("Test has been deleted", !0, !1, 2);
});
},
error:function() {
return function(model, xhr) {
var response;
return response = $.parseJSON(xhr.responseText), $(e.currentTarget).html(response.message), 
$(e.currentTarget).removeAttr("id");
};
}(this)
});
}, TestDeleteView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestDeleteView = TestDeleteView;
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
var HR, TestDuplicateView, _ref;
return TestDuplicateView = function(_super) {
function TestDuplicateView() {
return TestDuplicateView.__super__.constructor.apply(this, arguments);
}
return __extends(TestDuplicateView, _super), TestDuplicateView.prototype.initialize = function() {
var that;
return that = this;
}, TestDuplicateView.prototype.template = "x/test-duplicate", TestDuplicateView.prototype.className = "test-duplicate", 
TestDuplicateView.prototype.events = function() {
return {
"click #clone_test":"cloneTest"
};
}, TestDuplicateView.prototype.render = function() {
var content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content)), this;
}, TestDuplicateView.prototype.cloneTest = function(e) {
var test;
return test = new HR.TestModel({
tid:this.model.get("id")
}), test.save(null, {
success:function(model) {
return $(e.currentTarget).html("Test created. Click here to go to the test"), $(e.currentTarget).removeAttr("id"), 
$(e.currentTarget).addClass("js-backbone"), $(e.currentTarget).attr("href", "/tests/" + model.get("id") + "/questions");
}
});
}, TestDuplicateView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestDuplicateView = TestDuplicateView;
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
var HR, TestGeneralSettingsView, _ref;
return TestGeneralSettingsView = function(_super) {
function TestGeneralSettingsView() {
return TestGeneralSettingsView.__super__.constructor.apply(this, arguments);
}
return __extends(TestGeneralSettingsView, _super), TestGeneralSettingsView.prototype.initialize = function() {
var that;
return that = this;
}, TestGeneralSettingsView.prototype.template = "x/test-general-settings", TestGeneralSettingsView.prototype.className = "test-general-settings", 
TestGeneralSettingsView.prototype.events = function() {
return {
"submit form[name=test-general-settings-form]":"saveGeneralSettings"
};
}, TestGeneralSettingsView.prototype.render = function() {
var config, content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content)), config = {
skin:"moono",
entities:!1,
htmlEncodeOutput:!0,
extraPlugins:"image",
removeFormatTags:"input,button",
toolbar:[ [ "Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "-", "NumberedList", "BulletedList", "-", "Indent", "Outdent", "-", "Link", "Unlink" ], [ "Styles", "Format", "Font", "FontSize", "TextColor" ], [ "Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo", "Image" ], [ "Source" ] ],
toolbarCanCollapse:!1,
autoGrow_onStartup:!0,
width:this.$("textarea[name=test-instructions]").width() || 780,
removePlugins:"elementspath,contextmenu,liststyle,tabletools",
filebrowserUploadUrl:"/x/api/v1/editor_uploads",
disableNativeSpellChecker:!1
}, that = this, setTimeout(function() {
return CKEDITOR.instances["test-instructions"] && delete CKEDITOR.instances["test-instructions"], 
config.width = this.$("textarea[name=test-instructions]").width() || 780, this.$("textarea.texteditor").ckeditor(config);
}), this;
}, TestGeneralSettingsView.prototype.saveGeneralSettings = function(e) {
var duration, editorInstance, fetchDefaultText, instructions, name, save_data, that;
return e.preventDefault(), editorInstance = CKEDITOR.instances["test-instructions"], 
editorInstance.setMode("wysiwyg"), name = this.$("input[name=test-name]").removeClass("error").val(), 
duration = this.$("input[name=duration]").removeClass("error").val(), instructions = this.$("textarea[name=test-instructions]").removeClass("error").ckeditorGet().getData(), 
_.isEmpty(name) ? (this.$("input[name=test-name]").addClass("error"), void 0) :_.isEmpty(duration) ? (this.$("input[name=duration]").addClass("error"), 
void 0) :(_.isEmpty(instructions) && (fetchDefaultText = !0), save_data = {
name:name,
duration:duration,
instructions:instructions
}, that = this, this.model.save(save_data, {
success:function() {
var track_data;
return track_data = {
Page:"General Settings",
test_id:this.model.get("id")
}, HR.util.track("Edited Test Settings", track_data), fetchDefaultText ? that.model.fetch({
silent:!0,
success:function(m) {
return instructions = m.get("instructions"), that.$("textarea[name=test-instructions]").ckeditorGet().insertHtml(instructions);
}
}) :void 0;
}
}));
}, TestGeneralSettingsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestGeneralSettingsView = TestGeneralSettingsView;
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
var HR, TestInviteView, _ref;
return TestInviteView = function(_super) {
function TestInviteView() {
return TestInviteView.__super__.constructor.apply(this, arguments);
}
return __extends(TestInviteView, _super), TestInviteView.prototype.initialize = function(options) {
var that;
return this.user = HR.currentUser, this.emails = options.emails, that = this;
}, TestInviteView.prototype.template = "x/test-invite", TestInviteView.prototype.className = "test-invite", 
TestInviteView.prototype.events = function() {
return {
"click #preview":"previewMail",
"change #emails":"resize",
"cut #emails":"delayedResize",
"paste #emails":"delayedResize",
"drop #emails":"delayedResize",
"keydown #emails":"delayedResize",
"click #send_invites":"sendInvites"
};
}, TestInviteView.prototype.render = function() {
var config, content, savedResponse, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
user:this.user,
throbber:HR.appController.viewLoader(),
emails:this.emails.join(", ")
}), $(this.el).html(content)), config = {
skin:"moono",
extraPlugins:"invite,image",
toolbar:[ [ "Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "-", "NumberedList", "BulletedList", "-", "Link", "Unlink" ], [ "Format", "TextColor" ], [ "Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo", "Image", "Table" ], [ "Source" ], [ "Invite" ] ],
toolbarCanCollapse:!1,
autoGrow_onStartup:!0,
pasteFromWordRemoveFontStyles:!1,
pasteFromWordRemoveStyles:!1,
removePlugins:"elementspath,contextmenu,liststyle,tabletools",
disableNativeSpellChecker:!1,
filebrowserUploadUrl:"/x/api/v1/editor_uploads",
width:this.$("textarea[name=email-content]").width() || 780
}, that = this, setTimeout(function() {
return CKEDITOR.instances["email-content"] && delete CKEDITOR.instances["email-content"], 
config.width = this.$("textarea[name=email-content]").width() || 780, this.$("textarea.texteditor").ckeditor(config);
}), savedResponse = new HR.TestSavedResponse({
model:HR.currentUser,
parent:this
}), this.$("#saved-responses-container").html(savedResponse.render().el), this;
}, TestInviteView.prototype.resize = function() {
var text;
return text = this.$("#emails")[0], text.style.height = "auto", text.style.height = text.scrollHeight + "px", 
text.style.maxHeight = "250px";
}, TestInviteView.prototype.delayedResize = function() {
var that;
return that = this, window.setTimeout(that.resize, 0);
}, TestInviteView.prototype.sendInvites = function(e) {
var attrs, content, emails, options, prefs_link, prefs_time, subject, that;
return e.preventDefault(), that = this, this.$(".invite_message").addClass("hidden").removeClass("error"), 
this.$(".js-erroralert").addClass("hidden"), emails = this.$("#emails").removeClass("error").val(), 
subject = this.$("input[name=subject]").val(), content = this.$("textarea[name=email-content]").removeClass("error").ckeditorGet().getData(), 
_.isEmpty(emails) ? (this.$("#emails").addClass("error"), void 0) :(options = {}, 
prefs_time = this.$("input[name=prefs-time]:checked").val(), options.time = "0" === prefs_time ? !1 :!0, 
prefs_link = this.$("input[name=prefs-link]:checked").val(), options.link = "0" === prefs_link ? !1 :!0, 
HR.util.inlineLoadingStart(e.currentTarget), attrs = {
emails:emails,
subject:subject,
message:content,
options:options
}, $.ajax({
url:"/x/api/v1/tests/" + that.model.get("id") + "/invite",
data:attrs,
type:"POST",
success:function(_this) {
return function(data) {
var track_data;
return HR.util.inlineLoadingEnd(data), data.model && data.model.invited && data.model.invited.length > 0 && (track_data = {
test_id:that.model.get("id"),
candidates:data.model.invited.length
}, HR.util.track("Invited candidate", track_data)), data.model.not_invited.length > 0 ? (that.$(".js-erroralert").removeClass("hidden"), 
that.$(".js-alertmsg").html("Following emails are invalid, and were not invited: <ul><li>" + data.model.not_invited.join("</li><li>") + "</li></ul>")) :_this.$("#emails").val(""), 
that.user.fetch({
success:function(model) {
return that.$(".user-invite-count").html("Invites Remaining: " + model.invites_count());
}
}), that.model.fetch({
success:function() {
return HR.appView.updateSidebarView();
}
}), that.$(".invite_message").removeClass("hidden").html(data.message);
};
}(this),
error:function(data) {
return data = JSON.parse(data.responseText), that.$(".invite_message").removeClass("hidden").addClass("error").html(data.message), 
HR.util.inlineLoadingEnd(data);
}
}));
}, TestInviteView.prototype.previewMail = function() {
var message, options, prefs_link, prefs_time, tid;
return message = this.$("textarea[name=email-content]").ckeditorGet().getData(), 
options = {}, prefs_time = this.$("input[name=prefs-time]:checked").val(), options.time = "0" === prefs_time ? !0 :!1, 
prefs_link = this.$("input[name=prefs-link]:checked").val(), options.link = "0" === prefs_link ? !0 :!1, 
tid = this.model.get("id"), $.post("/x/api/v1/tests/" + tid + "/preview_invite", {
message:message,
options:options
}, function(data) {
return $("#preview-body").html(data.message), $("#preview-mail-modal").modal(), 
!0;
}), !0;
}, TestInviteView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestInviteView = TestInviteView;
});
}.call(this), function() {
var HR, TestLibraryQuestionView, TestLibrarySetModalView, TestLibrarySetView, TestLibrarySidebarView, TestLibraryView, _ref, __bind = function(fn, me) {
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
jQuery(function() {}), TestLibraryView = function(_super) {
function TestLibraryView() {
return this.loadLib = __bind(this.loadLib, this), TestLibraryView.__super__.constructor.apply(this, arguments);
}
return __extends(TestLibraryView, _super), TestLibraryView.prototype.template = "x/test-library", 
TestLibraryView.prototype.className = "test-library-view", TestLibraryView.prototype.initialize = function(options) {
switch (options.library) {
case "personal":
this.library = "personal_mine";
break;

case "shared":
this.library = "personal_shared";
break;

default:
this.library = options.library;
}
return this.filter = options.filter, this.testmodel = options.testmodel, this.search = "", 
this.tags = "", HR.tm = this.testmodel, HR.LibraryModel.setTid(this.testmodel.get("id")), 
HR.candidate = {}, this;
}, TestLibraryView.prototype.events = function() {
return {
"click .js-searchclear":"clearQuery",
"keypress .js-search":"setQuery",
"click .js-tags":"filterTags",
"click .js-minitest":"toggleSidebar",
"click .js-closesidebar":"toggleSidebar"
};
}, TestLibraryView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
test:this.testmodel.attributes,
filter:this.filter,
library:this.library
}), $(this.el).html(content), setTimeout(this.loadLib, 200), this;
}, TestLibraryView.prototype.setQuery = function(e) {
return 13 === e.keyCode ? (this.$(".js-searchclear").removeClass("hide"), this.search = this.$(".js-search").val(), 
this.loadLib()) :void 0;
}, TestLibraryView.prototype.clearQuery = function(e) {
return e.preventDefault(), this.$(e.currentTarget).addClass("hide"), this.$(".js-search").val(""), 
this.search = "", this.loadLib();
}, TestLibraryView.prototype.filterTags = function() {
var newtags;
return newtags = this.$("input.js-tags").val(), newtags !== this.tags ? (this.tags = newtags, 
this.loadLib()) :void 0;
}, TestLibraryView.prototype.toggleSidebar = function(e) {
return e.preventDefault(), this.$(".js-minisidebar").hasClass("hidden") ? (this.updateSidebar(), 
$(".js-minisidebar").removeClass("hidden")) :this.$(".js-minisidebar").addClass("hidden");
}, TestLibraryView.prototype.updateSidebar = function() {
var sideview;
return sideview = new TestLibrarySidebarView({
testmodel:this.testmodel,
parent:this
}), this.$(".js-minisidebar").html(sideview.render().el), this.$(".js-qcount").html(this.testmodel.get("questions_array").length), 
this.$(".js-points").html(this.testmodel.get("totalpoints")), this.$(".js-minitest").removeClass("hidden");
}, TestLibraryView.prototype.loadLib = function() {
var load;
return load = new HR.LoadingView(), this.$(".libcontent").html(load.render().el), 
HR.LibraryModel.fetch({
data:$.param({
library:this.library,
filter:this.filter,
q:this.search,
tags:this.tags
}),
success:function(_this) {
return function() {
return _this.renderView();
};
}(this),
error:function(e) {
return console.log("error", e);
}
});
}, TestLibraryView.prototype.renderView = function() {
var countdata, q, qview, res, s, setview, _i, _j, _len, _len1, _ref, _ref1;
for (res = HR.LibraryModel.attributes, this.$(".libcontent").empty(), countdata = [], 
1 === res.sets.length ? countdata.push("1 set") :res.sets.length > 1 && countdata.push("" + res.sets.length + " sets"), 
1 === res.questions.length ? countdata.push("1 question") :res.questions.length > 1 && countdata.push("" + res.questions.length + " questions"), 
countdata.length ? this.$(".js-count").html("Found: " + countdata.join(", ")) :(this.$(".js-count").html("Found nothing here."), 
this.$(".js-nothingfound").removeClass("hide")), this.$(".js-tags").select2("destroy"), 
res.tags.length > 0 ? (this.$(".js-tags").select2({
width:"off",
placeholder:"Filter tags",
allowClear:!0,
multiple:!0,
query:function(q) {
var data, tag, _i, _len, _ref;
for (data = {
results:[]
}, _ref = res.tags, _i = 0, _len = _ref.length; _len > _i; _i++) tag = _ref[_i], 
data.results.push({
id:tag,
text:HR.util.capitalize(tag)
});
return q.callback(data);
},
initSelection:function(e, c) {
var data, tag, _i, _len, _ref;
for (data = [], _ref = res.selected_tags, _i = 0, _len = _ref.length; _len > _i; _i++) tag = _ref[_i], 
data.push({
id:tag,
text:HR.util.capitalize(tag)
});
return c(data);
}
}), this.$(".js-tags").removeClass("hide")) :(this.$(".js-tags").addClass("hide"), 
this.$(".js-tags").css({
display:""
})), _ref = res.sets, _i = 0, _len = _ref.length; _len > _i; _i++) s = _ref[_i], 
setview = new HR.TestLibrarySetView({
set:s,
test:this.testmodel,
parent:this
}), this.$(".libcontent").append(setview.render().el);
for (_ref1 = res.questions, _j = 0, _len1 = _ref1.length; _len1 > _j; _j++) q = _ref1[_j], 
qview = new HR.TestLibraryQuestionView({
question:q,
test:this.testmodel,
parent:this
}), this.$(".libcontent").append(qview.render().el);
return this.updateSidebar();
}, TestLibraryView;
}(window.HR.GenericView), TestLibraryQuestionView = function(_super) {
function TestLibraryQuestionView() {
return TestLibraryQuestionView.__super__.constructor.apply(this, arguments);
}
return __extends(TestLibraryQuestionView, _super), TestLibraryQuestionView.prototype.template = "x/test-library-question", 
TestLibraryQuestionView.prototype.className = "test-library-question-view", TestLibraryQuestionView.prototype.events = function() {
return {
"click .js-remove-question":"removeQuestion",
"click .js-add-question":"addQuestion",
"click .js-toggleHeight":"toggleHeight"
};
}, TestLibraryQuestionView.prototype.initialize = function(options) {
return this.test = options.test, this.question = options.question, this.parent = options.parent, 
this.withAns = !0, options.withAns || (this.withAns = options.withAns), this.noexpand = "noexpand" in options ? options.noexpand :!1, 
this.actions = "actions" in options ? options.actions :!0;
}, TestLibraryQuestionView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
question:this.question,
test:this.test.attributes,
hrqn:window.istreet.cfg.hrqn,
noexpand:this.noexpand,
actions:this.actions,
withAns:this.withAns
}), $(this.el).html(content), this;
}, TestLibraryQuestionView.prototype.removeQuestion = function(e) {
var el, that;
return e.preventDefault(), el = this.$(e.currentTarget), that = this, this.test.removeQuestion(el.attr("data-qid"), {
success:function() {
return function() {
return el.addClass("js-add-question btn-primary"), el.removeClass("js-remove-question btn-alert"), 
el.html("Add"), that.test.fetch({
success:function() {
return setTimeout(that.parent.updateSidebar());
}
});
};
}(this),
error:function() {
return function(e) {
return console.log(e);
};
}(this)
});
}, TestLibraryQuestionView.prototype.addQuestion = function(e) {
var el, that;
return e.preventDefault(), el = this.$(e.currentTarget), that = this, this.test.addQuestion(el.attr("data-qid"), null, {
success:function(_this) {
return function() {
var track_data;
return track_data = {
library:_this.parent.library,
step:"Finish",
type:_this.question.type,
question_id:_this.question.id,
test_id:_this.test.id
}, HR.util.track("Added question from library", track_data), track_data = {
question_id:_this.question.id,
test_id:_this.test.id
}, HR.util.track("Added question", track_data), el.removeClass("js-add-question btn-primary"), 
el.addClass("js-remove-question btn-alert"), el.html("Remove"), that.parent.updateSidebar();
};
}(this),
error:function(e) {
return console.log(e);
}
});
}, TestLibraryQuestionView.prototype.toggleHeight = function(e) {
var el;
return e.preventDefault(), el = this.$(e.currentTarget), "collapsed" === el.attr("data-state") ? (el.html('collapse <i class="icon-up-open">'), 
el.attr("data-state", "expanded"), $(this.el).find(".js-qcontent").removeClass("text-ellipsis-oneline")) :(el.html('expand <i class="icon-down-open">'), 
el.attr("data-state", "collapsed"), $(this.el).find(".js-qcontent").addClass("text-ellipsis-oneline"));
}, TestLibraryQuestionView;
}(window.HR.GenericView), TestLibrarySetView = function(_super) {
function TestLibrarySetView() {
return TestLibrarySetView.__super__.constructor.apply(this, arguments);
}
return __extends(TestLibrarySetView, _super), TestLibrarySetView.prototype.template = "x/test-library-set", 
TestLibrarySetView.prototype.className = "test-library-set-view", TestLibrarySetView.prototype.events = function() {
return {
"click .js-showset":"showSetModal"
};
}, TestLibrarySetView.prototype.initialize = function(options) {
return this.test = options.test, this.set = options.set, this.parent = options.parent;
}, TestLibrarySetView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
set:this.set,
test:this.test.attributes,
hrqn:window.istreet.cfg.hrqn
}), $(this.el).html(content), this;
}, TestLibrarySetView.prototype.showSetModal = function(e) {
var el, styles, v;
return e.preventDefault(), el = this.$(e.currentTarget), v = new HR.TestLibrarySetModalView({
set:this.set,
test:this.test,
parent:this
}), this.$(".js-setdetails-wrapper").html(v.render().el), styles = {
width:1e3,
"margin-left":-(parseInt(1e3) / 2),
"min-height":600,
height:"80%"
}, setTimeout(function(_this) {
return function() {
return _this.$(".js-setdetails").modal().css(styles);
};
}(this), 100);
}, TestLibrarySetView.prototype.updateSidebar = function() {
return this.parent.updateSidebar();
}, TestLibrarySetView;
}(window.HR.GenericView), TestLibrarySetModalView = function(_super) {
function TestLibrarySetModalView() {
return TestLibrarySetModalView.__super__.constructor.apply(this, arguments);
}
return __extends(TestLibrarySetModalView, _super), TestLibrarySetModalView.prototype.template = "x/test-library-setmodal", 
TestLibrarySetModalView.prototype.className = "test-library-setmodal", TestLibrarySetModalView.prototype.events = function() {
return {
"click .js-qview":"showQuestion",
"click .js-qnext":"nextQuestion",
"click .js-qprev":"prevQuestion"
};
}, TestLibrarySetModalView.prototype.initialize = function(options) {
return this.set = options.set, this.test = options.test, this.parent = options.parent;
}, TestLibrarySetModalView.prototype.updateSidebar = function() {
return this.parent.updateSidebar();
}, TestLibrarySetModalView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
set:this.set,
test:this.test.attributes
}), $(this.el).html(content), setTimeout(function(_this) {
return function() {
return _this.$("a[qindex=0]").trigger("click");
};
}(this)), this;
}, TestLibrarySetModalView.prototype.showQuestion = function(e) {
var content, el, question;
return e.preventDefault(), el = this.$(e.currentTarget), el.parent().parent().find(".active").removeClass("active"), 
el.parent().addClass("active"), question = this.set.questions[el.attr("qindex")], 
content = new HR.TestLibraryQuestionView({
question:question,
test:this.test,
noexpand:!0,
parent:this
}), this.$(".setqcontents").html(content.render().el);
}, TestLibrarySetModalView.prototype.nextQuestion = function(e) {
var el, qindex;
return e.preventDefault(), el = this.$(e.currentTarget), qindex = parseInt(el.parent().parent().find(".active").find("a").attr("qindex")), 
qindex === this.set.questions.length - 1 ? qindex = 0 :qindex += 1, el.parent().parent().find("a[qindex=" + qindex + "]").trigger("click");
}, TestLibrarySetModalView.prototype.prevQuestion = function(e) {
var el, qindex;
return e.preventDefault(), el = this.$(e.currentTarget), qindex = parseInt(el.parent().parent().find(".active").find("a").attr("qindex")), 
0 === qindex ? qindex = this.set.questions.length - 1 :qindex -= 1, el.parent().parent().find("a[qindex=" + qindex + "]").trigger("click");
}, TestLibrarySetModalView;
}(window.HR.GenericView), TestLibrarySidebarView = function(_super) {
function TestLibrarySidebarView() {
return TestLibrarySidebarView.__super__.constructor.apply(this, arguments);
}
return __extends(TestLibrarySidebarView, _super), TestLibrarySidebarView.prototype.template = "x/test-library-sidebar", 
TestLibrarySidebarView.prototype.tagName = "div", TestLibrarySidebarView.prototype.events = function() {
return {
"click .js-remove-question":"removeQuestion"
};
}, TestLibrarySidebarView.prototype.removeQuestion = function(e) {
var el, qid, that;
return e.preventDefault(), el = this.$(e.currentTarget), qid = el.attr("data-qid"), 
that = this, this.testmodel.removeQuestion(qid, {
success:function() {
return function() {
return that.$("#q" + qid).remove(), that.testmodel.fetch({
success:function() {
var pageEl;
return setTimeout(pageEl = $("a.js-remove-question[data-qid=" + qid + "]"), pageEl.addClass("js-add-question btn-primary"), pageEl.removeClass("js-remove-question btn-alert"), pageEl.html("Add"), that.parent.updateSidebar());
}
});
};
}(this),
error:function() {
return function(e) {
return console.log(e);
};
}(this)
});
}, TestLibrarySidebarView.prototype.initialize = function(options) {
return this.testmodel = options.testmodel, this.test = this.testmodel.toJSON(), 
this.parent = options.parent, _.bindAll(this, "render");
}, TestLibrarySidebarView.prototype._render = function() {
return $(this.el).empty(), $(this.el).html(HR.appController.template(this.template, this)({
questions:this.test.questions_data
})), this;
}, TestLibrarySidebarView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestLibraryView = TestLibraryView, 
HR.TestLibraryQuestionView = TestLibraryQuestionView, HR.TestLibrarySetView = TestLibrarySetView, 
HR.TestLibrarySetModalView = TestLibrarySetModalView;
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
var HR, TestMasterPasswordView, _ref;
return TestMasterPasswordView = function(_super) {
function TestMasterPasswordView() {
return TestMasterPasswordView.__super__.constructor.apply(this, arguments);
}
return __extends(TestMasterPasswordView, _super), TestMasterPasswordView.prototype.initialize = function() {
var that;
return that = this;
}, TestMasterPasswordView.prototype.template = "x/test-master-password", TestMasterPasswordView.prototype.className = "test-master-password", 
TestMasterPasswordView.prototype.showSuccess = !1, TestMasterPasswordView.prototype.events = function() {
return {
"submit form[name=test-master-password-form]":"saveMasterPassword",
"click #deletePassword":"deleteMasterPassword"
};
}, TestMasterPasswordView.prototype._render = function() {
var content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content), that = this, this.showSuccess && (HR.util.showInlineSuccess(this, this.$("button[type=submit]")), 
this.showSuccess = !1)), this;
}, TestMasterPasswordView.prototype.saveMasterPassword = function(e) {
var attrs, masterPassword, that;
return e.preventDefault(), that = this, masterPassword = $("input[name=master-password]").removeClass("error").val(), 
masterPassword ? (attrs = {
defPassword:masterPassword
}, this.model.save(attrs, {
silent:!0,
success:function() {
return that.showSuccess = !0, that.render();
}
})) :($("input[name=master-password]").addClass("error"), HR.util.inlineLoadingEnd({
message:null
}));
}, TestMasterPasswordView.prototype.deleteMasterPassword = function(e) {
var attrs, that;
return e.preventDefault(), that = this, attrs = {
defPassword:""
}, this.model.save(attrs, {
silent:!0,
success:function() {
return that.render();
}
}), this.$(".test-custom-link-wrap").innerHTML("");
}, TestMasterPasswordView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestMasterPasswordView = TestMasterPasswordView;
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
var HR, TestMcqScoreView, _ref;
return TestMcqScoreView = function(_super) {
function TestMcqScoreView() {
return TestMcqScoreView.__super__.constructor.apply(this, arguments);
}
return __extends(TestMcqScoreView, _super), TestMcqScoreView.prototype.initialize = function() {
var that;
return that = this;
}, TestMcqScoreView.prototype.template = "x/test-mcq-score", TestMcqScoreView.prototype.className = "test-mcq-score", 
TestMcqScoreView.prototype.events = function() {
return {
"submit form[name=test-mcq-score-form]":"saveMCQScore"
};
}, TestMcqScoreView.prototype._render = function() {
var content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content)), this;
}, TestMcqScoreView.prototype.saveMCQScore = function(e) {
var attrs, mcq_negative_score, mcq_score;
return e.preventDefault(), mcq_score = parseFloat($("input[name=correct-answer-score]").val()), 
mcq_negative_score = parseFloat($("input[name=wrong-answer-score]").val()), mcq_negative_score > 0 && (mcq_negative_score = -1 * mcq_negative_score), 
attrs = {
mcq_score:mcq_score,
mcq_negative_score:mcq_negative_score
}, this.model.save(attrs, {
silent:!0
});
}, TestMcqScoreView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestMcqScoreView = TestMcqScoreView;
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
var HR, TestNavigationView, _ref;
return TestNavigationView = function(_super) {
function TestNavigationView() {
return TestNavigationView.__super__.constructor.apply(this, arguments);
}
return __extends(TestNavigationView, _super), TestNavigationView.prototype.initialize = function(options) {
var that;
return that = this, this.active_nav_link = options.active_nav_link, this.listenTo(this.model, "change", this.render), 
this.listenTo(this.model, "reset", this.render);
}, TestNavigationView.prototype.template = "x/test-navigation", TestNavigationView.prototype.className = "test-navigation", 
TestNavigationView.prototype.events = {
"click .js-try-test-btn":"tryTest"
}, TestNavigationView.prototype.updateData = function(model, active_nav_link) {
return this.model = model, this.active_nav_link = active_nav_link;
}, TestNavigationView.prototype._render = function() {
var content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
active_nav_link:this.active_nav_link,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content)), HR.currentUser.isLocked() && this.disableNavigation(), 
this;
}, TestNavigationView.prototype.disableNavigation = function() {
return this.$(".hre-sidebar-link").removeAttr("href");
}, TestNavigationView.prototype.tryTest = function() {
var track_data;
return track_data = {
test_id:this.model.get("id")
}, HR.util.track("Tried Test", track_data);
}, TestNavigationView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestNavigationView = TestNavigationView;
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
var HR, TestReportsPDFView, _ref;
return TestReportsPDFView = function(_super) {
function TestReportsPDFView() {
return this.startDlProcess = __bind(this.startDlProcess, this), this.modalClosed = __bind(this.modalClosed, this), 
TestReportsPDFView.__super__.constructor.apply(this, arguments);
}
return __extends(TestReportsPDFView, _super), TestReportsPDFView.prototype.template = "x/test-pdfdownload", 
TestReportsPDFView.prototype.className = "test-pdfdownload", TestReportsPDFView.prototype.events = function() {
return {
"click .js-downloadbtn":"startDlProcess",
"hidden.bs.modal .js-pdfdlview":"modalClosed"
};
}, TestReportsPDFView.prototype.initialize = function(options) {
return this.usecache = !0, this.testmodel = options.testmodel, options.singleaid ? (this.single = !0, 
this.aid = options.singleaid, this.downloading = !1) :(this.single = !1, this.batch = options.batch), 
this.testmodel.setAction("pdf"), this.pdfurl = this.testmodel.url(), this.testmodel.unsetAction(), 
this.handling_multiple = !1;
}, TestReportsPDFView.prototype.render = function() {
var content;
return $(this.el).empty(), content = HR.appController.template(this.template, this)({
batch:this.batch,
single:this.single
}), $(this.el).html(content), this;
}, TestReportsPDFView.prototype.handleDownload = function() {
var dataobj;
return this.downloading ? (HR.util.ajaxmsg("Processing download.. please wait.", !1, !0, 2), 
void 0) :this.single ? (dataobj = {
aids:[ this.aid ],
cmd:"download",
usecache:this.usecache
}, HR.util.ajaxmsg("Downloading.. please wait.", !1, !0, 2), this.downloading = !0, 
$.fileDownload(this.pdfurl, {
data:dataobj,
httpMethod:"POST",
timeout:3e4,
successCallback:function(_this) {
return function() {
return _this.downloading = !1, _this.usecache = !_this.usecache;
};
}(this),
failCallback:function(_this) {
return function() {
return _this.downloading = !1, HR.util.ajaxmsg("Error downloading. Try again a little later.", !1, !0, 2);
};
}(this)
})) :setTimeout(function(_this) {
return function() {
return _this.$(".js-pdfdlview").removeClass("hidden").modal();
};
}(this), 100);
}, TestReportsPDFView.prototype.modalClosed = function() {
return this.handling_multiple = !1;
}, TestReportsPDFView.prototype.startDlProcess = function(e) {
var b;
if (e.preventDefault(), this.$(".js-batchview").addClass("hide"), this.$(".js-singlebatch").removeClass("hide"), 
this.batchkey = this.$(e.currentTarget).attr("data-key"), "_all" === this.batchkey) {
this.aids = [];
for (b in this.batch) this.aids = this.aids.concat(this.batch[b]);
} else this.$(".js-dltitle").html("Downloading reports: <em>" + this.batchkey + "</em>"), 
this.aids = this.batch[this.batchkey];
return 1 === this.aids.length ? (this.$(".js-pdfprogress").html("Downloading.."), 
$.fileDownload(this.pdfurl, {
data:{
aids:this.aids,
cmd:"download",
usecache:this.usecache
},
httpMethod:"POST",
timeout:3e4,
successCallback:function(_this) {
return function() {
return _this.$(".js-pdfprogress").html("Downloaded.");
};
}(this),
failCallback:function(_this) {
return function() {
return _this.$(".js-pdfprogress").html("Error downloading. Please try again later.");
};
}(this)
}), void 0) :(this.$(".js-pdfprogress").html("Checking PDFs status.."), this.parallel_slots = 1, 
this.aids_done = [], this.aids_notdone = [], this.aids_len = 0, this.handling_multiple = !0, 
$.ajax({
url:this.pdfurl,
type:"POST",
data:$.param({
aids:this.aids,
cmd:"status"
}),
traditional:!0,
success:function(_this) {
return function(m) {
var i;
return _this.aids_done = m.status.done, i = m.status.done.length, _this.aids_notdone = m.status.notdone, 
_this.aids_len = _this.aids_done.length + _this.aids_notdone.length, m.status.parallel_slots && (_this.parallel_slots = m.status.parallel_slots), 
_this.$(".js-pdfprogress").html("Processing.."), _this.processingLoop();
};
}(this),
error:function(_this) {
return function() {
return _this.$(".js-pdfprogress").html("Unable to check reports status.");
};
}(this)
}));
}, TestReportsPDFView.prototype._getNotDoneAid = function() {
var val;
return this.aids_notdone.length > 0 ? (val = this.aids_notdone.splice(this.aids_notdone.length - 1), 
val[0]) :null;
}, TestReportsPDFView.prototype._addNotDoneAid = function(aid) {
return this.aids_notdone.push(aid);
}, TestReportsPDFView.prototype._addDoneAid = function(aid) {
return this.aids_done.push(aid);
}, TestReportsPDFView.prototype.processingLoop = function() {
var aid, can_download, dataobj, download_zip, slot_free, stop_loop;
if (this.handling_multiple) return download_zip = this.aids_done.length === this.aids_len, 
can_download = this.aids_notdone.length > 0, slot_free = this.parallel_slots > 0, 
stop_loop = !1, download_zip && (this.$(".js-pdfprogress").html("Creating zip archive.."), 
clearTimeout(window.pdftimer), stop_loop = !0, $.fileDownload(this.pdfurl, {
httpMethod:"POST",
timeout:3e4,
data:{
aids:this.aids_done,
cmd:"download"
},
successCallback:function(_this) {
return function() {
return _this.$(".js-pdfprogress").html("File should be downloaded shortly.");
};
}(this),
failCallback:function(_this) {
return function() {
return _this.$(".js-pdfprogress").html("Unable to prepare file for download. Try again later.");
};
}(this)
})), can_download && slot_free && (aid = this._getNotDoneAid(), this.parallel_slots = this.parallel_slots - 1, 
dataobj = {
aids:[ aid ],
cmd:"status",
usecache:!0
}, $.ajax({
url:this.pdfurl,
type:"POST",
data:dataobj,
success:function(_this) {
return function() {
return _this.parallel_slots = _this.parallel_slots + 1, _this._addDoneAid(aid), 
_this.$(".js-pdfprogress").html("Processed " + _this.aids_done.length + " of " + _this.aids_len);
};
}(this),
error:function(_this) {
return function() {
return _this.parallel_slots = _this.parallel_slots + 1, _this._addNotDoneAid(aid);
};
}(this)
})), window.pdftimer && clearTimeout(window.pdftimer), stop_loop ? void 0 :window.pdftimer = setTimeout(function(_this) {
return function() {
return _this.processingLoop();
};
}(this), 500);
}, TestReportsPDFView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestReportsPDFView = TestReportsPDFView;
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
var HR, MCQChoiceView, QuestionCodeEditStep1View, QuestionCodeEditStep2View, QuestionCodeEditStep3View, QuestionCodeEditStep4View, QuestionCodeEditView, QuestionCompleteEditView, QuestionDesignEditStep1View, QuestionDesignEditStep2View, QuestionDesignEditView, QuestionMCQEditView, QuestionSubjectiveEditView, QuestionTagView, QuestionTaskEditView, TestQuestionEditView, TestcaseAlertModalView, TestcaseDeleteModalView, TestcaseEditModalView, TestcaseView, TestcasesUploadModalView, _ref;
return TestQuestionEditView = function(_super) {
function TestQuestionEditView() {
return this.createQuestion = __bind(this.createQuestion, this), TestQuestionEditView.__super__.constructor.apply(this, arguments);
}
return __extends(TestQuestionEditView, _super), TestQuestionEditView.prototype.className = "test-question-edit", 
TestQuestionEditView.prototype.initialize = function(options) {
return this._subviews = [], this.isLibrary = options.isLibrary ? options.isLibrary :!1, 
this.isLibrary || (this.testmodel = options.testmodel), this.qid = options.qid, 
this.type = options.type, this.step = options.step, this.qid ? (this.model = this.isLibrary ? new HR.QuestionModel({
id:this.qid,
type:this.type
}) :new HR.QuestionModel({
id:this.qid,
tid:this.testmodel.get("id"),
type:this.type
}), this.listenTo(this.model, "change", this.render), this.model.fetch()) :(this.model = this.isLibrary ? new HR.QuestionModel({
type:this.type
}) :new HR.QuestionModel({
tid:this.testmodel.get("id"),
type:this.type
}), this.listenTo(this.model, "change", this.render));
}, TestQuestionEditView.prototype.events = function() {}, TestQuestionEditView.prototype.render = function() {
var question_view, task_view;
switch (_.each(this._subviews, function() {
return function(view) {
return view.destroy();
};
}(this)), this.isLibrary && $(".js-create-question").off().on("click", this.createQuestion), 
this.model.get("type")) {
case "code":
case "approx":
question_view = new QuestionCodeEditView({
model:this.model,
testmodel:this.testmodel,
step:this.step,
isLibrary:this.isLibrary
}), this._subviews.push(question_view), $(this.el).html(question_view.render().el);
break;

case "design":
question_view = new QuestionDesignEditView({
model:this.model,
testmodel:this.testmodel,
step:this.step,
isLibrary:this.isLibrary
}), this._subviews.push(question_view), $(this.el).html(question_view.render().el);
break;

case "mcq":
case "multiple_mcq":
question_view = new QuestionMCQEditView({
model:this.model,
testmodel:this.testmodel,
isLibrary:this.isLibrary
}), this._subviews.push(question_view), $(this.el).html(question_view.render().el);
break;

case "textAns":
case "file_upload":
case "uml":
case "electrical":
question_view = new QuestionSubjectiveEditView({
model:this.model,
testmodel:this.testmodel,
isLibrary:this.isLibrary
}), this._subviews.push(question_view), $(this.el).html(question_view.render().el);
break;

case "task":
task_view = new QuestionTaskEditView({
model:this.model,
testmodel:this.testmodel,
isLibrary:this.isLibrary
}), this._subviews.push(task_view), $(this.el).html(task_view.render().el);
break;

case "complete":
question_view = new QuestionCompleteEditView({
model:this.model,
testModel:this.testmodel,
isLibrary:this.isLibrary
}), this._subviews.push(question_view), $(this.el).html(question_view.render().el);
}
return this;
}, TestQuestionEditView.prototype.createQuestion = function(e) {
var create_question_modal;
return e.preventDefault(), create_question_modal = new HR.CreateQuestionModalView({
model:HR.LibraryModel
}), this._subviews.push(create_question_modal), $("#modal-container").html(create_question_modal.render().el);
}, TestQuestionEditView;
}(window.HR.GenericView), QuestionTagView = function(_super) {
function QuestionTagView() {
return QuestionTagView.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionTagView, _super), QuestionTagView.prototype.initialize = function(options) {
return this.useDirty = options.useDirty ? options.useDirty :!1;
}, QuestionTagView.prototype.template = "x/question-tags", QuestionTagView.prototype.className = "question-tags", 
QuestionTagView.prototype.events = {
"click #add-tag-link":"addTag",
"keydown #q-tag-inp":"processKey",
"click .remove-tag":"removeTag"
}, QuestionTagView.prototype.render = function() {
var content, _ref;
return this.tags = null != (_ref = this.model.get("tags_array")) ? _ref :[], content = HR.appController.template(this.template, this)({
tags:this.tags
}), $(this.el).html(content), this;
}, QuestionTagView.prototype.addTag = function(e) {
var tag, tagHtml, tagInput;
return e.preventDefault(), tagInput = this.$("#q-tag-inp"), tag = tagInput.val(), 
tagInput.val(""), _.isEmpty(tag) || this.tags.push(tag), this.useDirty && (window.HR.appView.dirty = !0), 
this.tags = _.uniq(this.tags), tagHtml = "", _.each(this.tags, function(tag) {
return tagHtml += '<span class="label removable q-tags pull-left msR"><span class="tag-val">', 
tagHtml += tag, tagHtml += '</span><a href="javascript:;" class="remove-tag">x</a>', 
tagHtml += "</span>&nbsp;";
}), this.$(".tag-names-container").html(tagHtml);
}, QuestionTagView.prototype.removeTag = function(e) {
var that;
return e.preventDefault(), this.$(e.currentTarget).parent().remove(), this.tags = [], 
that = this, this.useDirty && (window.HR.appView.dirty = !0), this.$("span.q-tags").each(function() {
return that.tags.push($(this).find(".tag-val").html());
});
}, QuestionTagView.prototype.processKey = function(e) {
return 13 === e.which ? (this.addTag(e), this.$("#q-tag-inp").blur(), this.$("#q-tag-inp").focus()) :void 0;
}, QuestionTagView;
}(window.HR.GenericView), QuestionMCQEditView = function(_super) {
function QuestionMCQEditView() {
return this.toggleMultipleAnswers = __bind(this.toggleMultipleAnswers, this), QuestionMCQEditView.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionMCQEditView, _super), QuestionMCQEditView.prototype.template = "x/question-mcq", 
QuestionMCQEditView.prototype.className = "question-mcq", QuestionMCQEditView.prototype.initialize = function(options) {
return this.isLibrary = options.isLibrary, this.testmodel = options.testmodel, this._subviews = [], 
this._choices_views = [], this.tags_view = new QuestionTagView({
model:this.model,
useDirty:!0
}), this._subviews.push(this.tags_view), window.HR.appView.dirty = !1, window.HR.Vent.off("view:dirty").on("view:dirty", this.openDirtyModal);
}, QuestionMCQEditView.prototype.events = function() {
return {
"click .js-toggle-richtext":"toggleRichtext",
"submit form[name=mcq-question-form]":"saveQuestion",
"click button.js-save-and-add":"saveAndAdd",
"click .js-add-choice":"addChoice",
"click #js-toggle-multiple-mcq":"toggleMultipleAnswers"
};
}, QuestionMCQEditView.prototype.render = function() {
var config, content, that;
return this.richtext = this.model.get("richtext") ? this.model.get("richtext") :"False", 
content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
edit:this.model.get("id") ? !0 :!1,
test:this.isLibrary ? null :this.testmodel.toJSON(),
richtext:this.richtext
}), $(this.el).html(content), this.$(".js-tags").html(this.tags_view.render().el), 
config = {
skin:"moono",
extraPlugins:"image,widget,dialog,insertcode",
filebrowserUploadUrl:"/x/api/v1/editor_uploads",
toolbar:[ [ "Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "-", "NumberedList", "BulletedList", "-", "Indent", "Outdent", "-", "Link", "Unlink" ], [ "Styles", "Format", "Font", "FontSize", "TextColor" ], [ "Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo", "Image", "Table" ], [ "Source", "InsertCode" ] ],
toolbarCanCollapse:!1,
autoGrow_onStartup:!0,
allowedContent:!0,
width:this.$("textarea[name=problem-description]").width() || 780,
removePlugins:"elementspath,liststyle",
disableNativeSpellChecker:!1
}, that = this, setTimeout(function() {
return CKEDITOR.instances["problem-description"] && delete CKEDITOR.instances["problem-description"], 
config.width = this.$("textarea[name=problem-description]").width() || 780, this.$("textarea.texteditor").ckeditor(function() {
return this.on("change", function() {
return window.HR.appView.dirty = !0;
});
}, config);
}), this.renderChoices(), this;
}, QuestionMCQEditView.prototype.toggleMultipleAnswers = function() {
switch (this.model.get("type")) {
case "mcq":
this.model.set({
type:"multiple_mcq"
}, {
silent:!0
});
break;

case "multiple_mcq":
this.$("ul#choices-container li.active").length > 1 && (this.$("ul#choices-container li").removeClass("active").find(".js-mark-answer").html("Mark as answer"), 
HR.util.ajaxmsg("Please select only one option.", !1, !0, 5)), this.model.set({
type:"mcq"
}, {
silent:!0
});
}
return this;
}, QuestionMCQEditView.prototype.renderChoices = function() {
var choice_view, i, _results;
if (this._choices_views = [], this.model.get("options")) return _.each(this.model.get("options"), function(_this) {
return function(choice, index) {
var choice_view;
return choice_view = new MCQChoiceView({
model:_this.model,
index:index,
parent:_this,
richtext:_this.richtext
}), _this._subviews.push(choice_view), _this._choices_views.push(choice_view), _this.$("#choices-container").append(choice_view.render().el);
};
}(this));
for (i = 0, _results = []; 4 > i; ) choice_view = new MCQChoiceView({
model:this.model,
index:i,
parent:this,
richtext:this.richtext
}), this._subviews.push(choice_view), this._choices_views.push(choice_view), this.$("#choices-container").append(choice_view.render().el), 
_results.push(i++);
return _results;
}, QuestionMCQEditView.prototype.toggleSelectOption = function(index) {
var selector;
return selector = this.$(this.$("ul#choices-container li")[index]), "mcq" === this.model.get("type") ? selector.hasClass("active") ? (selector.removeClass("active"), 
selector.find(".js-mark-answer").html("Mark as answer")) :(this.$("ul#choices-container li").removeClass("active").find(".js-mark-answer").html("Mark as answer"), 
selector.addClass("active"), selector.find(".js-mark-answer").html("Unmark as answer")) :selector.hasClass("active") ? (selector.removeClass("active"), 
selector.find(".js-mark-answer").html("Mark as answer")) :(selector.addClass("active"), 
selector.find(".js-mark-answer").html("Unmark as answer")), window.HR.appView.dirty = !0;
}, QuestionMCQEditView.prototype.removeOption = function(view) {
return 2 !== this._choices_views.length ? (this._subviews = _.without(this._subviews, view), 
this._choices_views = _.without(this._choices_views, view), _.each(this._choices_views, function(choice_view, index) {
return choice_view.setIndex(index);
}), window.HR.appView.dirty = !0, view.destroy()) :void 0;
}, QuestionMCQEditView.prototype.toggleRichtext = function(e) {
var cnfrm;
return e.preventDefault(), "True" !== this.richtext ? (this.richtext = "True", _.each(this._choices_views, function(choice_view) {
return choice_view.makeRichText();
}), this.$(e.currentTarget).html("(edit as normal text)")) :(cnfrm = confirm("Converting to plain text will lose some formatting and remove inserted items. Are you sure you want to continue?")) ? (this.richtext = "False", 
_.each(this._choices_views, function(choice_view) {
return choice_view.removeRichText();
}), this.$(e.currentTarget).html("(edit as rich text)")) :void 0;
}, QuestionMCQEditView.prototype.addChoice = function(e) {
var choice_view, index;
return e.preventDefault(), index = this._choices_views.length, choice_view = new MCQChoiceView({
model:this.model,
index:index,
parent:this,
richtext:this.richtext
}), this._subviews.push(choice_view), this._choices_views.push(choice_view), window.HR.appView.dirty = !0, 
this.$("#choices-container").append(choice_view.render().el);
}, QuestionMCQEditView.prototype.saveAndAdd = function(e) {
return this.saveQuestion(e, !0);
}, QuestionMCQEditView.prototype.openDirtyModal = function(answer) {
return HR.util.confirm({
message:"You have unsaved changes. Are you sure you want to navigate from this page?",
title:"Unsaved changes",
okButtonText:"No, go back",
cancelButtonText:"Yes, discard changes",
okCallback:function() {
return function() {
return answer.promise();
};
}(this),
cancelCallback:function() {
return function() {
return window.HR.appView.dirty = !1, answer.resolve();
};
}(this)
});
}, QuestionMCQEditView.prototype.saveQuestion = function(e, add_another) {
var answer, options, question, saveModel, save_data, track_data;
return null == add_another && (add_another = !1), e.preventDefault(), this.$("#error-container").hide(), 
options = [], answer = [], _.each(this._choices_views, function() {
return function(choice_view) {
var data;
return data = choice_view.getData(), options.push(data.value), data.answer ? answer.push(parseInt(data.index, 10) + 1) :void 0;
};
}(this)), _.isEmpty(answer) ? (this.$(".text-error").html("Please select an option as the answer"), 
this.$("#error-container").show(), void 0) :("mcq" === this.model.get("type") && (answer = answer[0]), 
question = this.$("textarea[name=problem-description]").removeClass("error").ckeditorGet().getData(), 
save_data = {
options:options,
answer:answer,
richtext:this.richtext,
question:question,
tags_array:this.tags_view.tags
}, this.model.get("id") ? track_data = {} :(track_data = {
type:this.model.get("type"),
step:"Finish"
}, this.isLibrary || (track_data.test_id = this.testmodel.get("id"))), saveModel = function(_this) {
return function() {
return _this.model.save(save_data, {
success:function(model) {
return _.isEmpty(track_data) || (HR.util.track("Added new other question", track_data), 
_this.isLibrary ? HR.util.trackTotango("Added Question - Other", "Library") :HR.util.trackTotango("Added Question - Other", "Tests"), 
track_data = {}, track_data.question_id = model.get("id"), _this.isLibrary || (track_data.test_id = _this.testmodel.get("id")), 
HR.util.track("Added question", track_data)), window.HR.appView.dirty = !1, add_another ? (setTimeout(function() {
return HR.util.ajaxmsg("Question saved", !1, !0, 5);
}, 300), setTimeout(function() {
return _this.isLibrary ? (Backbone.history.navigate("library/questions/new/" + model.get("type"), !0), 
HR.router.createLibraryQuestion(model.get("type"))) :(Backbone.history.navigate("tests/" + _this.testmodel.get("id") + "/questions/new/" + model.get("type"), !0), 
HR.router.createQuestion(_this.testmodel.get("id"), model.get("type")));
}, 1e3)) :_this.isLibrary ? Backbone.history.navigate("library/questions/" + model.get("id") + "/edit", !0) :Backbone.history.navigate("tests/" + _this.testmodel.get("id") + "/questions/" + model.get("id") + "/edit", !0);
},
error:function(model, response) {
return response = JSON.parse(response.responseText), this.$(".text-error").html(response.message), 
this.$("#error-container").show();
}
});
};
}(this), "multiple_mcq" === this.model.get("type") && 1 === answer.length ? HR.util.confirm({
message:"You've set one correct answer for this answer while allowing candidates to select multiple answers.  Are you sure you want to allow this?",
cancelButtonText:"No, go back",
okButtonText:"Yes, save",
okCallback:function() {
return saveModel();
}
}) :saveModel());
}, QuestionMCQEditView;
}(window.HR.GenericView), MCQChoiceView = function(_super) {
function MCQChoiceView() {
return MCQChoiceView.__super__.constructor.apply(this, arguments);
}
return __extends(MCQChoiceView, _super), MCQChoiceView.prototype.template = "x/question-mcq-choice", 
MCQChoiceView.prototype.className = "question-mcq-choice", MCQChoiceView.prototype.tagName = "li", 
MCQChoiceView.prototype.initialize = function(options) {
return this.index = options.index, this.parent = options.parent, this.richtext = options.richtext, 
this.config = {
skin:"moono",
toolbar:[ [ "Image", "Superscript", "Subscript", "Link", "Unlink", "Table" ] ],
toolbarCanCollapse:!1,
autoUpdateElement:!0,
height:100,
htmlEncodeOutput:!1,
removePlugins:"elementspath,contextmenu,liststyle,tabletools",
disableNativeSpellChecker:!1,
filebrowserUploadUrl:"/x/api/v1/editor_uploads"
};
}, MCQChoiceView.prototype.getData = function() {
return "True" === this.richtext ? {
value:this.$("textarea").ckeditorGet().getData(),
index:this.index,
answer:$(this.el).hasClass("active")
} :{
value:this.$("textarea").val(),
index:this.index,
answer:$(this.el).hasClass("active")
};
}, MCQChoiceView.prototype.setIndex = function(index) {
return this.index = index, this.$(".option-title").html(String.fromCharCode(65 + this.index));
}, MCQChoiceView.prototype.events = function() {
return {
"click div.mcq-option":"toggleSelectOption",
"click .js-mark-answer":"toggleSelectOption",
"click .js-remove-option":"removeOption",
"change .choices":"choiceUpdated"
};
}, MCQChoiceView.prototype.render = function() {
var answer, choice, content;
return choice = "", answer = !1, this.model.get("options") && this.model.get("options")[this.index] && (choice = this.model.get("options")[this.index], 
"mcq" === this.model.get("type") ? (this.model.get("answer") === this.index + 1 || this.model.get("answer") === (this.index + 1).toString()) && (answer = !0) :(_.indexOf(this.model.get("answer"), this.index + 1) > -1 || _.indexOf(this.model.get("answer"), (this.index + 1).toString()) > -1) && (answer = !0)), 
content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
index:this.index,
choice:choice,
answer:answer
}), $(this.el).html(content), answer && $(this.el).addClass("active"), "True" === this.richtext && setTimeout(function(_this) {
return function() {
return _this.makeRichText();
};
}(this)), this;
}, MCQChoiceView.prototype.toggleSelectOption = function(e) {
return e.preventDefault(), this.parent.toggleSelectOption(this.index);
}, MCQChoiceView.prototype.removeOption = function(e) {
return e.preventDefault(), this.parent.removeOption(this);
}, MCQChoiceView.prototype.makeRichText = function() {
return this.richtext = "True", this.$("textarea").val(this.$("textarea").val()), 
this.$("textarea").ckeditor(function() {
return this.on("change", function() {
return window.HR.appView.dirty = !0;
}), this.container.addClass("mcq-rich-text");
}, this.config);
}, MCQChoiceView.prototype.removeRichText = function() {
var string, value, x;
return this.richtext = "False", this.$("textarea").ckeditor(function() {
return this.destroy();
}, this.config), string = this.$("textarea").val(), x = string.replace(/(<([^>]+)>)/gi, ""), 
x = HR.util.htmlDecode(x), x = $.trim(x), value = x, this.$("textarea").val(value);
}, MCQChoiceView.prototype.choiceUpdated = function() {
return window.HR.appView.dirty = !0;
}, MCQChoiceView;
}(window.HR.GenericView), QuestionCompleteEditView = function(_super) {
function QuestionCompleteEditView() {
return this.saveAndAdd = __bind(this.saveAndAdd, this), QuestionCompleteEditView.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionCompleteEditView, _super), QuestionCompleteEditView.prototype.template = "x/question-complete", 
QuestionCompleteEditView.prototype.className = "question-complete", QuestionCompleteEditView.prototype.newOption = '<div class="new-choice"><input type="text" /><a href="javascript:;" class="delete-choice" class="txt-alt-grey msL"><i class="icon2-close fnt-sz-big"></i></a><br/></div>', 
QuestionCompleteEditView.prototype.newBlank = '<div class="white-grid-block no-margin no-padding blank-container"><div class="mlA"><div class="choices-container"><div class="new-choice"><input type="text" /><a href="javascript:;" class="delete-choice" class="txt-alt-grey msL"><i class="icon2-close fnt-sz-big"></i></a><br/></div></div><button class="btn add-new-choice">Add one more Choice</button></div></div>', 
QuestionCompleteEditView.prototype.initialize = function(options) {
return this.isLibrary = options.isLibrary, this.testmodel = options.testModel, this._subviews = [], 
this.eventsSet = !1, this.tags_view = new QuestionTagView({
model:this.model
}), this._subviews.push(this.tags_view);
}, QuestionCompleteEditView.prototype.events = function() {
return {
"submit form[name=question-complete-form]":"submit",
"click button.js-save-and-add":"saveAndAdd"
};
}, QuestionCompleteEditView.prototype.render = function() {
var config, content;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
edit:this.model.get("id") ? !0 :!1,
test:this.isLibrary ? null :this.testmodel.toJSON()
}), $(this.el).html(content), this.$(".js-tags").html(this.tags_view.render().el), 
config = {
skin:"moono",
extraPlugins:"widget,dialog,insertcode",
filebrowserUploadUrl:"/x/api/v1/editor_uploads",
toolbar:[ [ "Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "-", "NumberedList", "BulletedList", "-", "Indent", "Outdent", "-", "Link", "Unlink" ], [ "Styles", "Format", "Font", "FontSize", "TextColor" ], [ "Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo", "Table" ], [ "Source", "InsertCode" ] ],
toolbarCanCollapse:!1,
autoGrow_onStartup:!0,
allowedContent:!0,
width:this.$("textarea[name=problem-description]").width() || 780,
removePlugins:"elementspath,liststyle",
disableNativeSpellChecker:!1
}, setTimeout(function() {
return CKEDITOR.instances["problem-description"] && delete CKEDITOR.instances["problem-description"], 
config.width = this.$("textarea[name=problem-description]").width() || 780, this.$("textarea.texteditor").ckeditor(config);
}), this.setEvents(), this;
}, QuestionCompleteEditView.prototype.remove = function() {
return $(".add-new-choice").die("click"), $(".add-new-blank").die("click"), $(".delete-choice").die("click"), 
QuestionCompleteEditView.__super__.remove.apply(this, arguments);
}, QuestionCompleteEditView.prototype.setEvents = function() {
var that;
return that = this, this.eventsSet ? void 0 :(this.eventsSet = !0, $(".add-new-choice").live("click", function(e) {
var parentDiv;
return e.preventDefault(), parentDiv = $(e.currentTarget).prev(), parentDiv.append(that.newOption);
}), $(".add-new-blank").live("click", function(e) {
var parentDiv;
return e.preventDefault(), parentDiv = $(e.currentTarget).prev(), parentDiv.append(that.newBlank);
}), $(".delete-choice").live("click", function(e) {
return e.preventDefault(), $(this).parent().parent().find("div").length > 1 ? $(this).parent().remove() :$(this).parent().parent().parent().parent().remove();
}));
}, QuestionCompleteEditView.prototype.saveAndAdd = function(e) {
return this.submit(e, !0);
}, QuestionCompleteEditView.prototype.submit = function(e, add_another) {
var attributes, blank, blankRegex, blanks, choice, choices, option, options, problemStatement, problemStatementTA, questionString, questionStringInput, responseBox, that, track_data, val, _i, _j, _len, _len1;
for (null == add_another && (add_another = !1), e.preventDefault(), problemStatementTA = $("textarea[name=problem-statement]"), 
responseBox = $("#complete-sentence-response-box"), questionStringInput = $("#problem-text"), 
questionString = questionStringInput.val(), problemStatement = problemStatementTA.ckeditorGet().getData(), 
responseBox.addClass("hidden"), blanks = $(".blank-container"), options = new Array(), 
_i = 0, _len = blanks.length; _len > _i; _i++) {
for (blank = blanks[_i], option = new Array(), choices = $(blank).find(".new-choice"), 
_j = 0, _len1 = choices.length; _len1 > _j; _j++) choice = choices[_j], val = $(choice).find("input").val(), 
_.isEmpty(val) || option.push(val);
_.isEmpty(option) || options.push(option);
}
return _.isEmpty(questionString) ? (questionStringInput.addClass("error"), responseBox.addClass("error").removeClass("hidden").html("Question String Cannot be empty"), 
void 0) :_.isEmpty(options) ? (responseBox.addClass("error").removeClass("hidden").html("You need to have atleast one option"), 
void 0) :(blankRegex = /\{blank\}/g, _.isNull(questionString.match(blankRegex)) ? (responseBox.addClass("error").removeClass("hidden").html("Question Should have atleast one blank"), 
void 0) :options.length !== questionString.match(blankRegex).length ? (responseBox.addClass("error").removeClass("hidden").html("There should be atleast one answer for every blank"), 
void 0) :(problemStatementTA.html(problemStatement), attributes = {
question:problemStatement,
complete_string:questionString,
answer:options,
tags_array:this.tags_view.tags
}, that = this, this.model.get("id") ? track_data = {} :(track_data = {
type:this.model.get("type"),
step:"Finish"
}, this.isLibrary || (track_data.test_id = this.testmodel.get("id"))), this.model.save(attributes, {
success:function(_this) {
return function(model) {
return _.isEmpty(track_data) || (HR.util.track("Added new other question", track_data), 
_this.isLibrary ? HR.util.trackTotango("Added Question - Other", "Library") :HR.util.trackTotango("Added Question - Other", "Tests"), 
track_data = {}, track_data.question_id = model.get("id"), _this.isLibrary || (track_data.test_id = that.testmodel.get("id")), 
HR.util.track("Added question", track_data)), add_another ? (setTimeout(function() {
return HR.util.ajaxmsg("Question saved", !1, !0, 5);
}, 300), setTimeout(function() {
return _this.isLibrary ? (Backbone.history.navigate("library/questions/new/" + that.model.get("type"), !0), 
HR.router.createLibraryQuestion(that.model.get("type"))) :(Backbone.history.navigate("tests/" + that.testmodel.get("id") + "/questions/new/" + that.model.get("type"), !0), 
HR.router.createQuestion(that.testmodel.get("id"), that.model.get("type")));
}, 1e3)) :_this.isLibrary ? Backbone.history.navigate("library/questions/" + that.model.get("id") + "/edit", !0) :Backbone.history.navigate("tests/" + that.testmodel.get("id") + "/questions/" + that.model.get("id") + "/edit", !0);
};
}(this),
error:function() {
return responseBox.addClass("error").removeClass("hidden").html("Could not create question, Try again after some time.");
}
})));
}, QuestionCompleteEditView;
}(window.HR.GenericView), QuestionSubjectiveEditView = function(_super) {
function QuestionSubjectiveEditView() {
return QuestionSubjectiveEditView.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionSubjectiveEditView, _super), QuestionSubjectiveEditView.prototype.template = "x/question-subjective", 
QuestionSubjectiveEditView.prototype.className = "question-subjective", QuestionSubjectiveEditView.prototype.initialize = function(options) {
return this.isLibrary = options.isLibrary, this.testmodel = options.testmodel, this._subviews = [], 
this.tags_view = new QuestionTagView({
model:this.model
}), this._subviews.push(this.tags_view);
}, QuestionSubjectiveEditView.prototype.events = function() {
return {
"click button.js-save-and-add":"saveAndAdd",
"submit form[name=subjective-question-form]":"saveQuestion"
};
}, QuestionSubjectiveEditView.prototype.render = function() {
var config, content, that;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
edit:this.model.get("id") ? !0 :!1,
test:this.isLibrary ? null :this.testmodel.toJSON()
}), $(this.el).html(content), this.$(".js-tags").html(this.tags_view.render().el), 
config = {
skin:"moono",
extraPlugins:"image,widget,dialog,insertcode",
filebrowserUploadUrl:"/x/api/v1/editor_uploads",
toolbar:[ [ "Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "-", "NumberedList", "BulletedList", "-", "Indent", "Outdent", "-", "Link", "Unlink" ], [ "Styles", "Format", "Font", "FontSize", "TextColor" ], [ "Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo", "Image", "Table" ], [ "Source", "InsertCode" ] ],
toolbarCanCollapse:!1,
autoGrow_onStartup:!0,
allowedContent:!0,
width:this.$("textarea[name=problem-description]").width() || 780,
removePlugins:"elementspath,liststyle",
disableNativeSpellChecker:!1
}, that = this, setTimeout(function() {
return CKEDITOR.instances["problem-description"] && delete CKEDITOR.instances["problem-description"], 
config.width = this.$("textarea[name=problem-description]").width() || 780, this.$("textarea.texteditor").ckeditor(config);
}), this;
}, QuestionSubjectiveEditView.prototype.saveAndAdd = function(e) {
return this.saveQuestion(e, !0);
}, QuestionSubjectiveEditView.prototype.saveQuestion = function(e, add_another) {
var name, question, save_data, score, track_data;
return null == add_another && (add_another = !1), e.preventDefault(), question = this.$("textarea[name=problem-description]").removeClass("error").ckeditorGet().getData(), 
score = this.$("#score").val(), name = this.$("#problem-name").val(), this.$("#score").removeClass("error"), 
this.$("textarea[name=problem-description]").removeClass("error"), _.isEmpty(question) ? (this.$("textarea[name=problem-description]").addClass("error"), 
HR.util.ajaxmsg("Problem cannot be empty", !1, !0), void 0) :/^\d+$/.test(score) ? (save_data = {
name:name,
question:question,
score:parseInt(score),
tags_array:this.tags_view.tags
}, this.model.get("id") ? track_data = {} :(track_data = {
type:this.model.get("type"),
step:"Finish"
}, this.isLibrary || (track_data.test_id = this.testmodel.get("id"))), this.model.save(save_data, {
silent:!0,
success:function(_this) {
return function(model) {
return _.isEmpty(track_data) || (HR.util.track("Added new other question", track_data), 
_this.isLibrary ? HR.util.trackTotango("Added Question - Other", "Library") :HR.util.trackTotango("Added Question - Other", "Tests"), 
track_data = {}, track_data.question_id = model.get("id"), _this.isLibrary || (track_data.test_id = _this.testmodel.get("id")), 
HR.util.track("Added question", track_data)), add_another ? (setTimeout(function() {
return HR.util.ajaxmsg("Question saved", !1, !0, 5);
}, 300), setTimeout(function() {
return _this.isLibrary ? (Backbone.history.navigate("library/questions/new/" + model.get("type"), !0), 
HR.router.createLibraryQuestion(model.get("type"))) :(Backbone.history.navigate("tests/" + _this.testmodel.get("id") + "/questions/new/" + model.get("type"), !0), 
HR.router.createQuestion(_this.testmodel.get("id"), model.get("type")));
}, 1e3)) :_this.isLibrary ? Backbone.history.navigate("library/questions/" + model.get("id") + "/edit", !0) :Backbone.history.navigate("tests/" + _this.testmodel.get("id") + "/questions/" + model.get("id") + "/edit", !0);
};
}(this)
})) :(this.$("#score").addClass("error"), HR.util.ajaxmsg("Invalid score.", !1, !0, 2), 
void 0);
}, QuestionSubjectiveEditView;
}(window.HR.GenericView), QuestionTaskEditView = function(_super) {
function QuestionTaskEditView() {
return QuestionTaskEditView.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionTaskEditView, _super), QuestionTaskEditView.prototype.template = "x/question-task", 
QuestionTaskEditView.prototype.className = "question-task", QuestionTaskEditView.prototype.events = function() {
return {
"submit form[name=task-form]":"saveTask"
};
}, QuestionTaskEditView.prototype.initialize = function(options) {
return this.isLibrary = options.isLibrary, this.isLibrary ? void 0 :this.testmodel = options.testmodel;
}, QuestionTaskEditView.prototype.render = function() {
var config, content, that;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
edit:this.model.get("id") ? !0 :!1,
test:this.isLibrary ? null :this.testmodel.toJSON()
}), config = {
skin:"moono",
extraPlugins:"image",
filebrowserUploadUrl:"/x/api/v1/editor_uploads",
toolbar:[ [ "Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "-", "NumberedList", "BulletedList", "-", "Indent", "Outdent", "-", "Link", "Unlink" ], [ "Styles", "Format", "Font", "FontSize", "TextColor" ], [ "Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo", "Image", "Table" ], [ "Source" ] ],
toolbarCanCollapse:!1,
autoGrow_onStartup:!0,
allowedContent:!0,
width:this.$("textarea[name=problem-description]").width() || 780,
removePlugins:"elementspath,liststyle",
disableNativeSpellChecker:!1
}, that = this, setTimeout(function() {
return CKEDITOR.instances["problem-description"] && delete CKEDITOR.instances["problem-description"], 
config.width = this.$("textarea[name=problem-description]").width() || 780, this.$("textarea.texteditor").ckeditor(config);
}), $(this.el).html(content), this;
}, QuestionTaskEditView.prototype.saveTask = function(e) {
var save_data;
return e.preventDefault(), save_data = {}, save_data.question = this.$("textarea[name=problem-description]").removeClass("error").ckeditorGet().getData(), 
save_data.task_script = this.$("textarea[name=script]").val(), save_data.task_duration = parseInt(this.$("#duration").val()), 
save_data.task_context = this.$("input[name=context]:checked").val(), save_data.score = parseInt(this.$("#score").val()), 
save_data.name = this.$("#problem-name").val(), console.log(save_data), this.model.save(save_data, {
silent:!0,
success:function(_this) {
return function(model) {
return _this.isLibrary ? Backbone.history.navigate("library/questions/" + model.get("id") + "/edit", !0) :Backbone.history.navigate("tests/" + _this.testmodel.get("id") + "/questions/" + model.get("id") + "/edit", !0);
};
}(this)
});
}, QuestionTaskEditView;
}(window.HR.GenericView), QuestionDesignEditView = function(_super) {
function QuestionDesignEditView() {
return QuestionDesignEditView.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionDesignEditView, _super), QuestionDesignEditView.prototype.template = "x/question-design", 
QuestionDesignEditView.prototype.className = "question-design", QuestionDesignEditView.prototype.initialize = function(options) {
return this._subviews = [], this.step = options.step, this.isLibrary = options.isLibrary, 
this.isLibrary ? void 0 :this.testmodel = options.testmodel;
}, QuestionDesignEditView.prototype.render = function() {
var content;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
edit:this.model.get("id") ? !0 :!1,
step:this.step,
test:this.isLibrary ? null :this.testmodel.toJSON()
}), $(this.el).html(content), this.renderStep(this.step), this;
}, QuestionDesignEditView.prototype.renderStep = function(step) {
var step_view;
switch (step) {
case "step1":
return step_view = new QuestionDesignEditStep1View({
model:this.model,
testmodel:this.testmodel,
isLibrary:this.isLibrary
}), this._subviews.push(step_view), this.$("#control-overflow").html(step_view.render().el);

case "step2":
return step_view = new QuestionDesignEditStep2View({
model:this.model,
testmodel:this.testmodel,
isLibrary:this.isLibrary
}), this._subviews.push(step_view), this.$("#control-overflow").html(step_view.render().el);
}
}, QuestionDesignEditView;
}(window.HR.GenericView), QuestionDesignEditStep1View = function(_super) {
function QuestionDesignEditStep1View() {
return QuestionDesignEditStep1View.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionDesignEditStep1View, _super), QuestionDesignEditStep1View.prototype.template = "x/question-design-step1", 
QuestionDesignEditStep1View.prototype.className = "question-design-step1", QuestionDesignEditStep1View.prototype.initialize = function(options) {
return this._subviews = [], this.isLibrary = options.isLibrary, this.testmodel = options.testmodel, 
this.edit = this.model.get("id") ? !0 :!1, this.tags_view = new QuestionTagView({
model:this.model
}), this._subviews.push(this.tags_view);
}, QuestionDesignEditStep1View.prototype.events = function() {
return {
"submit form[name=design-question-step1-form]":"saveQuestion",
"keyup input[name=name]":"validateName"
};
}, QuestionDesignEditStep1View.prototype.render = function() {
var config, content, that;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON()
}), $(this.el).html(content), this.$(".js-tags").html(this.tags_view.render().el), 
config = {
skin:"moono",
extraPlugins:"image,widget,dialog,insertcode",
filebrowserUploadUrl:"/x/api/v1/editor_uploads",
toolbar:[ [ "Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "-", "NumberedList", "BulletedList", "-", "Indent", "Outdent", "-", "Link", "Unlink" ], [ "Styles", "Format", "Font", "FontSize", "TextColor" ], [ "Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo", "Image", "Table" ], [ "Source", "InsertCode" ] ],
toolbarCanCollapse:!1,
autoGrow_onStartup:!0,
allowedContent:!0,
width:this.$("textarea[name=problem-description]").width() || 780,
removePlugins:"elementspath,liststyle",
disableNativeSpellChecker:!1
}, that = this, setTimeout(function() {
return CKEDITOR.instances["problem-description"] && delete CKEDITOR.instances["problem-description"], 
config.width = this.$("textarea[name=problem-description]").width() || 780, this.$("textarea.texteditor").ckeditor(config);
}), this;
}, QuestionDesignEditStep1View.prototype.validateName = function(e) {
if ($(e.currentTarget).val()) {
if ($(e.currentTarget).hasClass("error")) return $(e.currentTarget).removeClass("error");
} else if (!$(e.currentTarget).hasClass("error")) return $(e.currentTarget).addClass("error");
}, QuestionDesignEditStep1View.prototype.saveQuestion = function(e) {
var name, question, save_data, score, track_data;
return e.preventDefault(), name = this.$("input[name=name]").removeClass("error").val(), 
question = this.$("textarea[name=problem-description]").removeClass("error").ckeditorGet().getData(), 
score = this.$("#score").val(), this.$("#score").removeClass("error"), /^\d+$/.test(score) ? _.isEmpty(name) ? (this.$("input[name=name]").addClass("error").focus(), 
void 0) :_.isEmpty(question) ? (this.$("textarea[name=problem-description]").addClass("error").focus(), 
void 0) :(save_data = {
name:name,
question:question,
score:parseInt(score),
tags_array:this.tags_view.tags
}, this.model.get("id") ? track_data = {} :(track_data = {
type:this.model.get("type"),
step:"Finish"
}, this.isLibrary || (track_data.test_id = this.testmodel.get("id"))), this.model.save(save_data, {
silent:!0,
success:function(_this) {
return function(model) {
return _.isEmpty(track_data) || (HR.util.track("Added new design question", track_data), 
track_data = {}, track_data.question_id = model.get("id"), _this.isLibrary || (track_data.test_id = _this.testmodel.get("id")), 
HR.util.track("Added question", track_data), _this.isLibrary ? HR.util.trackTotango("Added Question - Other", "Library") :HR.util.trackTotango("Added Question - Other", "Tests")), 
_this.isLibrary ? Backbone.history.navigate("library/questions/" + model.get("id") + "/edit/step2", !0) :Backbone.history.navigate("tests/" + _this.testmodel.get("id") + "/questions/" + model.get("id") + "/edit/step2", !0);
};
}(this)
})) :(this.$("#score").addClass("error"), HR.util.ajaxmsg("Invalid score.", !1, !0, 2), 
void 0);
}, QuestionDesignEditStep1View;
}(window.HR.GenericView), QuestionDesignEditStep2View = function(_super) {
function QuestionDesignEditStep2View() {
return this.toggleFileTree = __bind(this.toggleFileTree, this), QuestionDesignEditStep2View.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionDesignEditStep2View, _super), QuestionDesignEditStep2View.prototype.template = "x/question-design-step2", 
QuestionDesignEditStep2View.prototype.className = "question-design-step2", QuestionDesignEditStep2View.prototype.langTextMapping = {
javascript:"Javascript",
html:"HTML",
css:"CSS"
}, QuestionDesignEditStep2View.prototype.lang_mime_mapping = {
css:"text/css",
javascript:"text/javascript",
html:"text/html"
}, QuestionDesignEditStep2View.prototype.initialize = function(options) {
return this._subviews = [], this.isLibrary = options.isLibrary, this.testmodel = options.testmodel, 
this.language = "html", null == this.model.get("multiple_files") ? this.model.set("multiple_files", "false", {
silent:!0
}) :void 0;
}, QuestionDesignEditStep2View.prototype.events = function() {
return {
"submit form[name=design-question-step2-form]":"saveQuestion",
"click .js-code-section-tab":"switchCodeSection",
"click button.js-save-and-add":"saveAndAdd",
"change input[name=multiple_files]:checked":"toggleFileTree"
};
}, QuestionDesignEditStep2View.prototype.render = function() {
var $tbody_textarea, content;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON()
}), $(this.el).html(content), this.editorOptions = {
lineNumbers:!0,
lineWrapping:!1,
mode:this.lang_mime_mapping[this.language]
}, $tbody_textarea = this.$("textarea#template_html").get(0), HR.appController.loadCodeMirrorMode(this.language, function(_this) {
return function() {
return $tbody_textarea && !_this.tbody_editor ? (_this.tbody_editor = CodeMirror.fromTextArea($tbody_textarea, _this.editorOptions), 
setTimeout(function() {
return _this.tbody_editor.refresh();
}, 10)) :void 0;
};
}(this)), this;
}, QuestionDesignEditStep2View.prototype.toggleFileTree = function(e) {
var multiple_files;
return multiple_files = $(e.currentTarget).val(), "true" === multiple_files ? (this.$(".js-code-stubs-section").slideUp(), 
this.$(".js-file-structure-section").slideDown()) :(this.$(".js-code-stubs-section").slideDown(), 
this.$(".js-file-structure-section").slideUp()), this.model.set("multiple_files", multiple_files, {
silent:!0
});
}, QuestionDesignEditStep2View.prototype.switchCodeSection = function(e) {
var $textarea, id, lang;
return e.preventDefault(), this.$(e.currentTarget).parent().hasClass("active") ? void 0 :(lang = this.$(".js-code-section-tabs-list li.active").find(".js-code-section-tab").data("lang"), 
this.model.get("" + lang + "_template") !== this.tbody_editor.getValue() && this.model.set("" + lang + "_template", this.tbody_editor.getValue(), {
silent:!0
}), id = this.$(e.currentTarget).data("id"), lang = this.$(e.currentTarget).data("lang"), 
$textarea = this.$("textarea#" + id).get(0), $textarea && (this.language = lang, 
this.tbody_editor.setOption("mode", this.lang_mime_mapping[lang]), this.tbody_editor.setValue(this.model.get("" + lang + "_template")), 
setTimeout(function(_this) {
return function() {
return _this.tbody_editor.refresh();
};
}(this), 10)), this.$(".js-code-section-tabs-list li").removeClass("active"), this.$(e.currentTarget).parent().addClass("active"));
}, QuestionDesignEditStep2View.prototype.saveAndAdd = function(e) {
return this.saveQuestion(e, !0);
}, QuestionDesignEditStep2View.prototype.saveQuestion = function(e, add_another) {
var js_error, lang, request_params;
if (null == add_another && (add_another = !1), e.preventDefault(), js_error = this.$(".js-error").addClass("hidden"), 
request_params = {
silent:!0,
success:function(_this) {
return function(model) {
return add_another ? (setTimeout(function() {
return HR.util.ajaxmsg("Question saved", !1, !0, 5);
}, 300), setTimeout(function() {
return _this.isLibrary ? (Backbone.history.navigate("library/questions/new/" + model.get("type"), !0), 
HR.router.createLibraryQuestion(model.get("type"))) :(Backbone.history.navigate("tests/" + _this.testmodel.get("id") + "/questions/new/" + model.get("type"), !0), 
HR.router.createQuestion(_this.testmodel.get("id"), model.get("type")));
}, 1e3)) :_this.isLibrary ? Backbone.history.navigate("library/personal/", !0) :Backbone.history.navigate("tests/" + _this.testmodel.get("id") + "/questions/", !0);
};
}(this)
}, "true" !== this.model.get("multiple_files")) lang = this.$(".js-code-section-tabs-list li.active").find(".js-code-section-tab").data("lang"), 
this.model.get("" + lang + "_template") !== this.tbody_editor.getValue() && this.model.set("" + lang + "_template", this.tbody_editor.getValue(), {
silent:!0
}); else if (this.$("input[name=filetree_upload]").val()) request_params.iframe = !0, 
request_params.processData = !1, request_params.files = this.$("input[name=filetree_upload]"), 
request_params.dataType = "json", request_params.data = this.model.toJSON(), request_params.url = this.model.url() + "/upload"; else if (!this.model.get("file_url")) return js_error.removeClass("hidden").find("header").html("There is no file structure provided. Please provide initial files in a zip format for the candidate."), 
void 0;
return this.model.save(null, request_params);
}, QuestionDesignEditStep2View;
}(window.HR.GenericView), QuestionCodeEditView = function(_super) {
function QuestionCodeEditView() {
return QuestionCodeEditView.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionCodeEditView, _super), QuestionCodeEditView.prototype.template = "x/question-coding", 
QuestionCodeEditView.prototype.className = "question-coding", QuestionCodeEditView.prototype.initialize = function(options) {
return this._subviews = [], this.step = options.step, this.isLibrary = options.isLibrary, 
this.isLibrary ? void 0 :this.testmodel = options.testmodel;
}, QuestionCodeEditView.prototype.render = function() {
var content;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
edit:this.model.get("id") ? !0 :!1,
step:this.step,
test:this.isLibrary ? null :this.testmodel.toJSON()
}), $(this.el).html(content), this.renderStep(this.step), this;
}, QuestionCodeEditView.prototype.renderStep = function(step) {
var step_view;
switch (step) {
case "step1":
return step_view = new QuestionCodeEditStep1View({
model:this.model,
testmodel:this.testmodel,
isLibrary:this.isLibrary
}), this._subviews.push(step_view), this.$("#control-overflow").html(step_view.render().el);

case "step2":
return step_view = new QuestionCodeEditStep2View({
model:this.model,
testmodel:this.testmodel,
isLibrary:this.isLibrary
}), this._subviews.push(step_view), this.$("#control-overflow").html(step_view.render().el);

case "step3":
return step_view = new QuestionCodeEditStep3View({
model:this.model,
testmodel:this.testmodel,
isLibrary:this.isLibrary
}), this._subviews.push(step_view), this.$("#control-overflow").html(step_view.render().el);

case "step4":
return step_view = new QuestionCodeEditStep4View({
model:this.model,
testmodel:this.testmodel,
isLibrary:this.isLibrary
}), this._subviews.push(step_view), this.$("#control-overflow").html(step_view.render().el);
}
}, QuestionCodeEditView;
}(window.HR.GenericView), QuestionCodeEditStep1View = function(_super) {
function QuestionCodeEditStep1View() {
return QuestionCodeEditStep1View.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionCodeEditStep1View, _super), QuestionCodeEditStep1View.prototype.template = "x/question-coding-step1", 
QuestionCodeEditStep1View.prototype.className = "question-coding-step1", QuestionCodeEditStep1View.prototype.initialize = function(options) {
return this.isLibrary = options.isLibrary, this.testmodel = options.testmodel, this._subviews = [], 
this.edit = this.model.get("id") ? !0 :!1, this.tags_view = new QuestionTagView({
model:this.model
}), this._subviews.push(this.tags_view);
}, QuestionCodeEditStep1View.prototype.events = function() {
return {
"submit form[name=coding-question-step1-form]":"saveQuestion",
"keyup input[name=name]":"validateName"
};
}, QuestionCodeEditStep1View.prototype.render = function() {
var config, content, that;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON()
}), $(this.el).html(content), this.$(".js-tags").html(this.tags_view.render().el), 
config = {
skin:"moono",
extraPlugins:"image,widget,dialog,insertcode",
filebrowserUploadUrl:"/x/api/v1/editor_uploads",
toolbar:[ [ "Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "-", "NumberedList", "BulletedList", "-", "Indent", "Outdent", "-", "Link", "Unlink" ], [ "Styles", "Format", "Font", "FontSize", "TextColor" ], [ "Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo", "Image", "Table" ], [ "Source", "InsertCode" ] ],
toolbarCanCollapse:!1,
autoGrow_onStartup:!0,
allowedContent:!0,
width:this.$("textarea[name=problem-description]").width() || 780,
removePlugins:"elementspath,liststyle",
disableNativeSpellChecker:!1
}, that = this, setTimeout(function() {
return CKEDITOR.instances["problem-description"] && delete CKEDITOR.instances["problem-description"], 
config.width = this.$("textarea[name=problem-description]").width() || 780, this.$("textarea.texteditor").ckeditor(config);
}), this;
}, QuestionCodeEditStep1View.prototype.validateName = function(e) {
if ($(e.currentTarget).val()) {
if ($(e.currentTarget).hasClass("error")) return $(e.currentTarget).removeClass("error");
} else if (!$(e.currentTarget).hasClass("error")) return $(e.currentTarget).addClass("error");
}, QuestionCodeEditStep1View.prototype.saveQuestion = function(e) {
var name, question, save_data, track_data;
return e.preventDefault(), name = this.$("input[name=name]").removeClass("error").val(), 
question = this.$("textarea[name=problem-description]").removeClass("error").ckeditorGet().getData(), 
_.isEmpty(name) ? (this.$("input[name=name]").addClass("error").focus(), void 0) :_.isEmpty(question) ? (this.$("textarea[name=problem-description]").addClass("error").focus(), 
void 0) :(save_data = {
name:name,
question:question,
tags_array:this.tags_view.tags
}, this.model.get("id") ? track_data = {} :(track_data = {
type:this.model.get("type"),
step:"Finish"
}, this.isLibrary || (track_data.test_id = this.testmodel.get("id"))), this.model.save(save_data, {
silent:!0,
success:function(_this) {
return function(model) {
return _.isEmpty(track_data) || (HR.util.track("Added new coding question", track_data), 
_this.isLibrary ? HR.util.trackTotango("Added Question - Coding", "Library") :HR.util.trackTotango("Added Question - Coding", "Tests"), 
track_data = {}, track_data.question_id = model.get("id"), _this.isLibrary || (track_data.test_id = _this.testmodel.get("id")), 
HR.util.track("Added question", track_data)), _this.isLibrary ? Backbone.history.navigate("library/questions/" + model.get("id") + "/edit/step2", !0) :Backbone.history.navigate("tests/" + _this.testmodel.get("id") + "/questions/" + model.get("id") + "/edit/step2", !0);
};
}(this)
}));
}, QuestionCodeEditStep1View;
}(window.HR.GenericView), QuestionCodeEditStep2View = function(_super) {
function QuestionCodeEditStep2View() {
return this.generateTemplates = __bind(this.generateTemplates, this), QuestionCodeEditStep2View.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionCodeEditStep2View, _super), QuestionCodeEditStep2View.prototype.template = "x/question-coding-step2", 
QuestionCodeEditStep2View.prototype.className = "question-coding-step2", QuestionCodeEditStep2View.prototype.returnTypes = [ {
id:"INTEGER",
text:"INTEGER"
}, {
id:"STRING",
text:"STRING"
}, {
id:"FLOAT",
text:"FLOAT"
}, {
id:"LONG_INTEGER",
text:"LONG INTEGER"
}, {
id:"INTEGER_ARRAY",
text:"INTEGER ARRAY"
}, {
id:"STRING_ARRAY",
text:"STRING ARRAY"
}, {
id:"INTEGER_SINGLY_LINKED_LIST",
text:"INTEGER SINGLY LINKED LIST"
}, {
id:"FLOAT_SINGLY_LINKED_LIST",
text:"FLOAT SINGLY LINKED LIST"
}, {
id:"CHARACTER_SINGLY_LINKED_LIST",
text:"CHARACTER SINGLY LINKED LIST"
}, {
id:"STRING_SINGLY_LINKED_LIST",
text:"STRING SINGLY LINKED LIST"
}, {
id:"INTEGER_DOUBLY_LINKED_LIST",
text:"INTEGER DOUBLY LINKED LIST"
}, {
id:"FLOAT_DOUBLY_LINKED_LIST",
text:"FLOAT DOUBLY LINKED LIST"
}, {
id:"CHARACTER_DOUBLY_LINKED_LIST",
text:"CHARACTER DOUBLY LINKED LIST"
}, {
id:"STRING_DOUBLY_LINKED_LIST",
text:"STRING DOUBLY LINKED LIST"
}, {
id:"VOID",
text:"VOID"
}, {
id:"BOOLEAN",
text:"BOOLEAN"
} ], QuestionCodeEditStep2View.prototype.parameterTypes = [ {
id:"INTEGER",
text:"INTEGER"
}, {
id:"STRING",
text:"STRING"
}, {
id:"FLOAT",
text:"FLOAT"
}, {
id:"LONG_INTEGER",
text:"LONG INTEGER"
}, {
id:"INTEGER_ARRAY",
text:"INTEGER ARRAY"
}, {
id:"STRING_ARRAY",
text:"STRING ARRAY"
}, {
id:"INTEGER_SINGLY_LINKED_LIST",
text:"INTEGER SINGLY LINKED LIST"
}, {
id:"FLOAT_SINGLY_LINKED_LIST",
text:"FLOAT SINGLY LINKED LIST"
}, {
id:"CHARACTER_SINGLY_LINKED_LIST",
text:"CHARACTER SINGLY LINKED LIST"
}, {
id:"STRING_SINGLY_LINKED_LIST",
text:"STRING SINGLY LINKED LIST"
}, {
id:"INTEGER_DOUBLY_LINKED_LIST",
text:"INTEGER DOUBLY LINKED LIST"
}, {
id:"FLOAT_DOUBLY_LINKED_LIST",
text:"FLOAT DOUBLY LINKED LIST"
}, {
id:"CHARACTER_DOUBLY_LINKED_LIST",
text:"CHARACTER DOUBLY LINKED LIST"
}, {
id:"STRING_DOUBLY_LINKED_LIST",
text:"STRING DOUBLY LINKED LIST"
}, {
id:"BOOLEAN",
text:"BOOLEAN"
} ], QuestionCodeEditStep2View.prototype.langTextMapping = {
c:"C",
cpp:"C++",
java:"Java",
csharp:"C#",
python:"Python 2",
php:"PHP",
ruby:"Ruby",
perl:"Perl",
javascript:"Javascript",
haskell:"Haskell",
clojure:"Clojure",
scala:"Scala",
go:"Go",
objectivec:"Objective C",
erlang:"Erlang",
groovy:"Groovy",
code:"Code",
oracle:"Oracle",
r:"R",
cobol:"Cobol",
visualbasic:"VB.NET",
java8:"Java 8",
r:"R",
octave:"Octave"
}, QuestionCodeEditStep2View.prototype.lang_mime_mapping = {
c:"text/x-csrc",
cpp:"text/x-c++src",
java:"text/x-java",
csharp:"text/x-csharp",
haskell:"text/x-haskell",
php:"text/x-php",
python:"text/x-python",
perl:"text/x-perl",
ruby:"text/x-ruby",
bash:"text/x-bash",
oracle:"text/x-plsql",
mysql:"text/x-plsql",
sql:"text/x-plsql",
clojure:"text/x-scheme",
scala:"text/plain",
code:"text/plain",
go:"text/x-go",
javascript:"text/javascript",
objectivec:"text/x-csrc",
cobol:"text/x-cobol",
visualbasic:"text/x-vb",
java8:"text/x-java",
octave:"text/x-octave",
r:"text/x-rsrc"
}, QuestionCodeEditStep2View.prototype.language_validation_mapping = {
c:/^[a-z_][a-z0-9_]*$/i,
cpp:/^[a-z_][a-z0-9_]*$/i,
java:/^[a-z_$][a-z0-9_$]*$/i,
csharp:/^[a-z_@][a-z0-9_@]*$/i,
haskell:/^[a-z][a-z0-9_']*$/,
php:/^[a-z_][a-z0-9_]*$/i,
python:/^[a-z_][a-z0-9_]*$/i,
perl:/./,
ruby:/^[a-z_][a-z0-9_]*$/i,
bash:/./,
oracle:/./,
mysql:/./,
sql:/./,
clojure:/^[a-z][a-z-]*$/,
scala:/^[a-z][a-z0-9_]*$/,
code:/./,
go:/^[a-z][a-z0-9_]*$/i,
erlang:/^[a-z_][a-z0-9_]*$/i,
javascript:/^[a-z_$][a-z0-9_$]*$/i,
groovy:/./,
objectivec:/^[a-z_][a-z0-9_]*$/i,
cobol:/./,
visualbasic:/./,
java8:/^[a-z_$][a-z0-9_$]*$/i,
octave:/./,
r:/./
}, QuestionCodeEditStep2View.prototype.initialize = function(options) {
return this._subviews = [], this.isLibrary = options.isLibrary, this.testmodel = options.testmodel, 
window.HR.appView.dirty = !1, HR.Vent.off("view:dirty").on("view:dirty", function(answer) {
return HR.util.confirm({
message:"You have unsaved changes. Are you sure you want to navigate from this page?",
title:"Unsaved changes",
okButtonText:"No, go back",
cancelButtonText:"Yes, discard changes",
okCallback:function() {
return function() {
return answer.promise();
};
}(this),
cancelCallback:function() {
return function() {
return window.HR.appView.dirty = !1, answer.resolve();
};
}(this)
});
});
}, QuestionCodeEditStep2View.prototype.events = function() {
return {
"submit form[name=coding-question-step2-form]":"saveQuestion",
"click label.hr-checkbox":"toggleCheckbox",
"click a.js-clear-all":"clearAllCheckbox",
"click a.js-select-all":"checkAllCheckbox",
"change input[name=template_type]:checked":"toggleCodeStubs",
"change #code-editor-lang-select2":"changeLanguage",
"click .js-code-section-tab":"switchCodeSection",
"click .js-add-parameter":"addParameter",
"click .js-remove-parameter":"removeParameter",
"click .js-generate-templates":"confirmAndGenerate"
};
}, QuestionCodeEditStep2View.prototype.render = function() {
var $tbody_textarea, allowedLanguages, content, _model;
return allowedLanguages = [], _model = this.model.toJSON(), _model.allowedLanguages && (this.allowedLanguages = _model.allowedLanguages.split(",")), 
this.language = _.first(this.allowedLanguages) || "c", content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
allowedLanguages:this.allowedLanguages
}), $(this.el).html(content), this.editorOptions = {
lineNumbers:!0,
lineWrapping:!1,
mode:this.lang_mime_mapping[this.language]
}, $tbody_textarea = this.$("textarea#template").get(0), HR.appController.loadCodeMirrorMode(this.language, function(_this) {
return function() {
var parameters;
return $tbody_textarea && !_this.tbody_editor ? (_this.tbody_editor = CodeMirror.fromTextArea($tbody_textarea, _this.editorOptions), 
setTimeout(function() {
return _this.tbody_editor.refresh();
}, 10), _this.initCodeEditorLanguageSelect2(), _this.initReturnTypeSelect2(), _this.model.get("functionParams") ? (parameters = _this.model.get("functionParams").split(","), 
_.each(parameters, function(parameter, index) {
return _this.initParametersSelect2("#brahma-parameter-select2-" + index);
})) :_this.initParametersSelect2("#brahma-parameter-select2-0")) :void 0;
};
}(this)), this;
}, QuestionCodeEditStep2View.prototype.initCodeEditorLanguageSelect2 = function() {
var data;
return data = [], _.each(this.allowedLanguages, function(_this) {
return function(lang) {
return data.push({
id:lang,
text:_this.langTextMapping[lang]
});
};
}(this)), this.$("#code-editor-lang-select2").select2({
width:"200",
data:data
});
}, QuestionCodeEditStep2View.prototype.initReturnTypeSelect2 = function() {
return this.$("#brahma-return-type").select2({
width:"off",
data:this.returnTypes
});
}, QuestionCodeEditStep2View.prototype.initParametersSelect2 = function(el) {
return this.$(el).select2({
width:"220px",
data:this.parameterTypes
});
}, QuestionCodeEditStep2View.prototype.changeLanguage = function(e) {
var id, lang;
return e.preventDefault(), id = this.$(".js-code-section-tabs-list li.active").find(".js-code-section-tab").data("id"), 
this.model.get("" + this.language + "_" + id) !== this.tbody_editor.getValue() && (this.model.set("template_type", "2", {
silent:!0
}), this.model.set("" + this.language + "_" + id, this.tbody_editor.getValue(), {
silent:!0
}), window.HR.appView.dirty = !0), this.$(".js-code-section-tabs-list li").removeClass("active"), 
this.$(".js-code-section-tab[data-id=template]").parent().addClass("active"), lang = this.$(e.currentTarget).val(), 
HR.appController.loadCodeMirrorMode(lang, function(_this) {
return function() {
var $tbody_textarea;
return _this.editorOptions.mode = _this.lang_mime_mapping[lang], $tbody_textarea = _this.$("textarea#template").get(0), 
$tbody_textarea ? (_this.language = lang, _this.tbody_editor.setOption("mode", _this.lang_mime_mapping[lang]), 
_this.tbody_editor.setValue(_this.model.get("" + lang + "_template")), setTimeout(function() {
return _this.tbody_editor.refresh();
}, 10)) :void 0;
};
}(this));
}, QuestionCodeEditStep2View.prototype.switchCodeSection = function(e) {
var $textarea, id, lang;
return e.preventDefault(), this.$(e.currentTarget).parent().hasClass("active") ? void 0 :(id = this.$(".js-code-section-tabs-list li.active").find(".js-code-section-tab").data("id"), 
this.model.get("" + this.language + "_" + id) !== this.tbody_editor.getValue() && (this.model.set("template_type", "2", {
silent:!0
}), this.model.set("" + this.language + "_" + id, this.tbody_editor.getValue(), {
silent:!0
}), window.HR.appView.dirty = !0), id = this.$(e.currentTarget).data("id"), lang = this.$("#code-editor-lang-select2").val(), 
$textarea = this.$("textarea#" + id).get(0), $textarea && (this.language = lang, 
this.tbody_editor.setOption("mode", this.lang_mime_mapping[lang]), this.tbody_editor.setValue(this.model.get("" + lang + "_" + id)), 
setTimeout(function(_this) {
return function() {
return _this.tbody_editor.refresh();
};
}(this), 10)), this.$(".js-code-section-tabs-list li").removeClass("active"), this.$(e.currentTarget).parent().addClass("active"));
}, QuestionCodeEditStep2View.prototype.isValidName = function(param) {
var notValidIn, paramName, that;
return that = this, paramName = this.$(param).removeClass("error").val(), notValidIn = [], 
paramName.trim() ? $("input[name=allowedLanguages]:checked").each(function() {
return that.language_validation_mapping[$(this).val()].test(paramName) ? void 0 :notValidIn.push(that.langTextMapping[that.$(this).val()]);
}) :notValidIn.push("ALL languages."), notValidIn.length > 0 ? (this.$(param).addClass("error"), 
this.$("#js-brahma-parameter-error").removeClass("hidden").children("ul").append("<li><b>" + (paramName.trim() ? paramName :"empty string") + "</b> is not a valid name in " + notValidIn.join(", ") + "</li>"), 
!1) :!0;
}, QuestionCodeEditStep2View.prototype.clearAllValidationErrors = function() {
return this.$("#js-brahma-parameter-error").addClass("hidden").children("ul").empty();
}, QuestionCodeEditStep2View.prototype.validateParameter = function() {
var brahma_params, retVal;
return brahma_params = this.$("#brahma-parameters-container .js-brahma-parameter"), 
this.clearAllValidationErrors(), retVal = !0, _.each(brahma_params.children('[name="functionParameterName"]'), function(_this) {
return function(inp) {
return _this.isValidName($(inp)) ? void 0 :retVal = !1;
};
}(this)), retVal;
}, QuestionCodeEditStep2View.prototype.addParameter = function(e) {
var last_parameter_container, last_parameter_id, next_parameter_id, parameter_block;
return e.preventDefault(), this.validateParameter() ? (window.HR.appView.dirty = !0, 
last_parameter_container = _.last(this.$("#brahma-parameters-container .js-brahma-parameter")), 
next_parameter_id = 1, last_parameter_container && (last_parameter_id = $(last_parameter_container).find("input.js-parameter-type")[0].getAttribute("data-id"), 
next_parameter_id = parseInt(last_parameter_id) + 1), parameter_block = "<div class='block js-brahma-parameter'> <input type='hidden' id='brahma-parameter-select2-" + next_parameter_id + "' class=' js-parameter-type' value='INTEGER' data-id='" + next_parameter_id + "' name='functionParameterType'> <input style='width:70px;' type='text' name='functionParameterName' value='' class='msA mmR'></input> <a href='#' class='txt-alt-grey psA js-remove-parameter'><i class='icon2-delete'></i></a> </div>", 
this.$("#brahma-parameters-container").append(parameter_block), this.$(e.target).html('<i class="icon-plus"></i>Add Another'), 
this.initParametersSelect2("#brahma-parameter-select2-" + next_parameter_id)) :void 0;
}, QuestionCodeEditStep2View.prototype.removeParameter = function(e) {
var parent;
return e.preventDefault(), window.HR.appView.dirty = !0, (parent = this.$(e.currentTarget).parent()).remove(), 
parent.siblings().length < 1 ? this.$("button.btn.js-add-parameter").html('<i class="icon-plus"></i>Add Parameter') :void 0;
}, QuestionCodeEditStep2View.prototype.confirmAndGenerate = function(e) {
var empty_param, functionName, functionOptions, functionParams, functionReturn, last_parameter_name, that;
return e.preventDefault(), this.clearAllValidationErrors(), functionName = this.$("input[name=functionName]").val().trim(), 
functionReturn = this.$("input[name=functionReturn]").val(), (null != functionName ? functionName.length :void 0) > 0 ? (empty_param = 0, 
last_parameter_name = null, functionParams = [], that = this, _.each($(".js-brahma-parameter"), function(_this) {
return function(parameter_block) {
var parameter, parameterName, parameterType, _ref;
return parameterName = null != (_ref = last_parameter_name = _this.$(parameter_block).find("input[name=functionParameterName]")) ? _ref.val() :void 0, 
parameterType = _this.$(parameter_block).find("input[name=functionParameterType]").val(), 
parameterType && _this.isValidName(last_parameter_name) ? (parameter = "" + parameterType + " " + parameterName, 
functionParams.push(parameter)) :empty_param += 1;
};
}(this)), empty_param > 0 ? void 0 :(functionOptions = {
functionParams:functionParams.join(","),
functionName:functionName,
functionReturn:functionReturn
}, this.model.get("template_type") > 1 ? HR.util.confirm({
okButtonText:"Yes, Generate Code",
okCallback:function() {
return that.generateTemplates(functionOptions, lang);
},
message:"You have previously edited our auto-generated templates; they will be overwritten if you continue."
}) :this.generateTemplates(functionOptions, lang))) :(this.$("#js-brahma-parameter-error").removeClass("hidden").children("ul").append("<li>Function Name cannot be empty.</li>"), 
void 0);
}, QuestionCodeEditStep2View.prototype.generateTemplates = function(options, lang) {
var tempQuesModel, that;
return this.model.set("functionParams", options.functionParams, {
silent:!0
}), this.model.set("functionReturn", options.functionReturn, {
silent:!0
}), this.model.set("functionName", options.functionName, {
silent:!0
}), this.model.set("allowedLanguages", this.$("input[name=allowedLanguages]:checked").map(function(i, lang) {
return lang.value;
}).toArray().join(","), {
silent:!0
}), that = this, tempQuesModel = this.model.clone(), tempQuesModel.save(null, {
silent:!0,
url:this.model.url() + "/generate",
success:function(model) {
var unsupportedLanguageList, unsupportedLanguages, unsupportedLanguagesData, updateTemplates;
return unsupportedLanguagesData = model.get("unsupportedLanguages"), unsupportedLanguages = unsupportedLanguagesData.summary, 
updateTemplates = function(deselectLanguages) {
var id;
return null == deselectLanguages && (deselectLanguages = !1), that.model = tempQuesModel, 
lang = that.$("#code-editor-lang-select2").val(), id = that.$(".js-code-section-tabs-list li.active").find(".js-code-section-tab").data("id"), 
setTimeout(function() {
return that.tbody_editor.setValue(model.get("" + lang + "_" + id)), that.tbody_editor.refresh();
}, 10), "checked" === $("input.disabledLanguages").attr("checked") && (deselectLanguages = !0), 
deselectLanguages ? (unsupportedLanguages.forEach(function(lng) {
return $(lng).addClass("active"), that.$("input[name=allowedLanguages][value=" + lng + "]").removeAttr("checked").closest(".hr-checkbox").removeClass("active");
}), that.allowedLanguages = _.difference(that.model.get("languages"), unsupportedLanguages), 
that.model.set("allowedLanguages", that.allowedLanguages.join(","), {
silent:!0
}), that.initCodeEditorLanguageSelect2(), that.$("#code-editor-lang-select2").val(lang)) :void 0;
}, unsupportedLanguages && unsupportedLanguages.length > 0 ? (unsupportedLanguageList = unsupportedLanguages.map(function(l) {
return this.lang_display_mapping[l];
}).join(", "), HR.util.confirm({
title:"Unsupported languages detected.",
okButtonText:"Yes, Generate Code",
closebutton:!0,
okCallback:updateTemplates,
message:"The template generator does not support the following languages you have selected: " + unsupportedLanguageList + ". If you continue without deselecting these languages, you should manually enter stubs for them, otherwise your candidates will be confused..<br /> <br /> <label><input class='disabledLanguages' type='checkbox' />Deselect " + unsupportedLanguageList + "</label>"
})) :updateTemplates();
}
});
}, QuestionCodeEditStep2View.prototype.openLanguageChangeModal = function(languageList) {
return HR.util.alert({
title:"New Languages Added",
message:"<p>You have enabled new languages (" + languageList.join(", ") + ") but have not regenerated the function stubs.\n<br/>Please fix this by either deselecting those languages, or generating stubs by clicking on the\n<br/>'Generate Code' link.</p>",
okButtonText:"Okay, I'll fix This"
});
}, QuestionCodeEditStep2View.prototype.saveQuestion = function(e) {
var allowedLanguages, id, languages, newLanguages;
return e.preventDefault(), allowedLanguages = [], languages = $("input[name=allowedLanguages]:checked"), 
_.each(languages, function() {
return function(lang) {
return allowedLanguages.push(lang.value);
};
}(this)), id = this.$(".js-code-section-tabs-list li.active").find(".js-code-section-tab").data("id"), 
"0" === this.$("input[name=template_type]:checked").val() ? this.model.set("template_type", "0", {
silent:!0
}) :this.model.get("" + this.language + "_" + id) !== this.tbody_editor.getValue() && (this.model.set("template_type", "2", {
silent:!0
}), this.model.set("" + this.language + "_" + id, this.tbody_editor.getValue(), {
silent:!0
})), newLanguages = _.difference(allowedLanguages, this.model.get("languages")).map(function(_this) {
return function(lang) {
return _this.langTextMapping[lang];
};
}(this)), "1" === this.model.get("template_type") && newLanguages.length > 0 ? (this.openLanguageChangeModal(newLanguages), 
void 0) :(this.model.set("allowedLanguages", allowedLanguages.join(",")), this.model.save(null, {
silent:!0,
success:function(_this) {
return function(model) {
return window.HR.appView.dirty = !1, _this.isLibrary ? Backbone.history.navigate("library/questions/" + model.get("id") + "/edit/step3", !0) :Backbone.history.navigate("tests/" + _this.testmodel.get("id") + "/questions/" + model.get("id") + "/edit/step3", !0);
};
}(this)
}));
}, QuestionCodeEditStep2View.prototype.toggleCheckbox = function(e) {
return e.preventDefault(), window.HR.appView.dirty = !0, $(e.currentTarget).hasClass("active") ? ($(e.currentTarget).removeClass("active").removeClass("active"), 
$(e.currentTarget).find("input").removeAttr("checked")) :($(e.currentTarget).addClass("active").addClass("active"), 
$(e.currentTarget).find("input").attr("checked", "checked"));
}, QuestionCodeEditStep2View.prototype.checkAllCheckbox = function(e) {
var languages;
return e.preventDefault(), window.HR.appView.dirty = !0, languages = this.$("input[name='allowedLanguages']"), 
_.each(languages, function() {
return function(lang) {
return $(lang).attr("checked", "checked");
};
}(this));
}, QuestionCodeEditStep2View.prototype.clearAllCheckbox = function(e) {
var languages;
return e.preventDefault(), window.HR.appView.dirty = !0, languages = this.$("input[name='allowedLanguages']"), 
_.each(languages, function() {
return function(lang) {
return $(lang).removeAttr("checked");
};
}(this));
}, QuestionCodeEditStep2View.prototype.toggleCodeStubs = function(e) {
var template_type;
return template_type = $(e.currentTarget).val(), window.HR.appView.dirty = !0, "0" === template_type ? this.$(".js-code-stubs-section").slideUp() :(this.$(".js-code-stubs-section").slideDown(), 
setTimeout(function(_this) {
return function() {
return _this.tbody_editor.refresh();
};
}(this), 10));
}, QuestionCodeEditStep2View;
}(window.HR.GenericView), QuestionCodeEditStep3View = function(_super) {
function QuestionCodeEditStep3View() {
return QuestionCodeEditStep3View.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionCodeEditStep3View, _super), QuestionCodeEditStep3View.prototype.template = "x/question-coding-step3", 
QuestionCodeEditStep3View.prototype.className = "question-coding-step3", QuestionCodeEditStep3View.prototype.initialize = function(options) {
return this._subviews = [], this.isLibrary = options.isLibrary, this.testmodel = options.testmodel, 
this.testcases = new HR.TestCasesCollection(), this.listenTo(this.testcases, "add", this.render), 
this.listenTo(this.testcases, "remove", this.render), this.listenTo(this.testcases, "reset", this.render), 
this.testCasesFetched = !1, this.fetchTestcases();
}, QuestionCodeEditStep3View.prototype.fetchTestcases = function() {
var that;
return that = this, this.testcases.reset(), this.isLibrary || this.testcases.setTid(this.testmodel.get("id")), 
this.testcases.setQid(this.model.get("id")), this.testcases.fetch({
silent:!0,
success:function() {
return that.testCasesFetched = !0, that.render(), HR.util.ajaxmsg("", !1, !0, 0);
},
error:function() {
return that.testCasesFetched = !0, that.render();
}
});
}, QuestionCodeEditStep3View.prototype.events = function() {
return {
"click .js-edit-testcase":"editTestcase",
"click .js-add-testcase":"addTestcase",
"click .js-upload-testcases":"uploadTestcases",
"click .save-question":"saveQuestion",
"click .js-save-and-add":"saveAndAdd",
"click .js-select-all":"selectAll",
"click .js-select-tc":"showHideBatchOperations",
"click .js-download":"downloadTestcases",
"click .js-change-difficulty":"changeDifficulty",
"click .js-change-score":"changeScore",
"click .js-mark-sample":"markSample",
"click .js-delete":"deleteSelected",
"submit form[name=score-change]":"changeScore"
};
}, QuestionCodeEditStep3View.prototype.selectAll = function() {
return this.$(".js-select-all:checked").length > 0 ? (this.$(".js-select-tc").prop("checked", !0), 
this.$(".batch-operations").show()) :(this.$(".js-select-tc").prop("checked", !1), 
this.$(".batch-operations").hide()), this.updateTcids();
}, QuestionCodeEditStep3View.prototype.showHideBatchOperations = function() {
return this.$(".js-select-tc:checked").length > 0 ? (this.$(".js-select-tc:checked").length < this.$(".js-select-tc").length ? this.$(".js-select-all").prop("indeterminate", !0) :this.$(".js-select-tc:checked").length === this.$(".js-select-tc").length && (this.$(".js-select-all").prop("indeterminate", !1), 
this.$(".js-select-all").prop("checked", !0)), this.$(".batch-operations").show()) :(this.$(".js-select-all").prop("checked", !1), 
this.$(".js-select-all").prop("indeterminate", !1), this.$(".batch-operations").hide()), 
this.updateTcids();
}, QuestionCodeEditStep3View.prototype.updateTcids = function() {
var tcids, testcases_selected;
return testcases_selected = this.$(".js-select-tc:checked"), tcids = _.map(testcases_selected, function() {
return function(testcase) {
return $(testcase).val();
};
}(this)), this.testcases.setTcids(tcids);
}, QuestionCodeEditStep3View.prototype.updateSelected = function() {
var tcids;
return "delete" !== this.testcases.getOperation() ? (tcids = this.testcases.getTcids(), 
this.$(".js-select-tc").prop("checked", !1), _.each(tcids, function(_this) {
return function(tcid) {
return $(_this.$(".js-select-tc")[tcid]).prop("checked", !0);
};
}(this)), this.showHideBatchOperations()) :void 0;
}, QuestionCodeEditStep3View.prototype.performOperation = function(params) {
return this.$(".operation-loader").show(), this.testcases.batchOperation(params), 
this.$(".testcase-operations").find("input, .btn, .dropdown").addClass("disabled").attr("disabled", "true"), 
this.$(".js-testcase-row-operation a").addClass("disabled");
}, QuestionCodeEditStep3View.prototype.changeDifficulty = function(e) {
var new_difficulty;
return new_difficulty = $(e.target).text().trim(), _.include([ "Easy", "Medium", "Hard" ], new_difficulty) ? (this.testcases.setOperation("changedifficulty"), 
this.performOperation({
type:new_difficulty
})) :void 0;
}, QuestionCodeEditStep3View.prototype.changeScore = function() {
var score;
return this.$(".score-grp").find("input, button").removeClass("error"), score = this.$("input.score").val().trim(), 
"" === score || isNaN(score) ? (this.$(".score-grp").find("input, button").addClass("error"), 
this.$(".score-grp").find("input").focus(), void 0) :(this.testcases.setOperation("changescore"), 
this.performOperation({
score:score
}));
}, QuestionCodeEditStep3View.prototype.markSample = function() {
return this.testcases.setOperation("marksample"), this.performOperation({
sample:!0
});
}, QuestionCodeEditStep3View.prototype.downloadTestcases = function(e) {
return e && e.preventDefault(), this.testcases.setOperation("download"), this.testcases.batchOperation();
}, QuestionCodeEditStep3View.prototype.deleteSelected = function() {
var dialog_options;
return dialog_options = {
title:"Confirm Delete",
body:"<div class='row'> Are you sure you want to delete " + this.testcases.getTcids().length + " test case(s)? </div>",
buttons:[ {
name:"Yes",
"class":"confirm-yes btn-green btn-small",
callback:function(_this) {
return function() {
return _this.testcases.setOperation("delete"), _this.performOperation(), _this.dialog.destroy();
};
}(this)
}, {
name:"No",
"class":"confirm-no btn-default btn-small msL",
callback:function(_this) {
return function() {
return _this.dialog.destroy();
};
}(this)
} ]
}, this.dialog = new HR.util.ShowConfirmationDialog(dialog_options), this.dialog.render();
}, QuestionCodeEditStep3View.prototype.render = function() {
var content;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
testcases:this.testcases.toJSON(),
testCasesFetched:this.testCasesFetched
}), $(this.el).html(content), this.$(".batch-operations").find("input, .btn, .dropdown").removeClass("disabled").removeAttr("disabled"), 
this.testcases.models.length > 0 && (this.$("tbody").empty(), _.each(this.testcases.models, function(_this) {
return function(model, index) {
var testcase_view;
return model.set("qid", _this.model.get("id")), _this.isLibrary || model.set("tid", _this.testmodel.get("id")), 
testcase_view = new TestcaseView({
model:model,
index:index,
parent:_this
}), _this._subviews.push(testcase_view), _this.$("tbody").append(testcase_view.render().el);
};
}(this))), this.updateSelected(), this;
}, QuestionCodeEditStep3View.prototype.fetchTestcaseView = function() {
return this.$("tbody").find("tr").addClass("hidden"), this.$("tbody").append('<tr><td colspan="6" class="fnt-wt-600 m">Fetching Test Cases</td></tr>');
}, QuestionCodeEditStep3View.prototype.saveAndAdd = function(e) {
return this.saveQuestion(e, !0);
}, QuestionCodeEditStep3View.prototype.saveQuestion = function(e, add_another) {
var qid, that, tid;
return null == add_another && (add_another = !1), e.preventDefault(), that = this, 
this.testCasesFetched ? (qid = this.model.get("id"), this.isLibrary || (tid = this.testmodel.get("id")), 
0 === this.testcases.models.length ? this.openTestCaseAlertModal("no_test_cases", add_another) :-1 === _.indexOf(_.map(this.testcases.models, function(testcase) {
return testcase.get("sample");
}), !0) ? this.openTestCaseAlertModal("no_sample_test_case") :"approx" === this.model.get("type") ? this.isLibrary ? HR.router.navigate("library/questions/" + qid + "/edit/step4", !0) :HR.router.navigate("/tests/" + tid + "/questions/" + qid + "/edit/step4", !0) :add_another ? (setTimeout(function() {
return function() {
return HR.util.ajaxmsg("Question saved", !1, !0, 5);
};
}(this), 300), setTimeout(function(_this) {
return function() {
return _this.isLibrary ? (Backbone.history.navigate("library/questions/new/" + _this.model.get("type"), !0), 
HR.router.createLibraryQuestion(model.get("type"))) :(Backbone.history.navigate("tests/" + tid + "/questions/new/" + _this.model.get("type"), !0), 
HR.router.createQuestion(tid, model.get("type")));
};
}(this), 1e3)) :this.isLibrary ? HR.router.navigate("library/personal/mine", !0) :HR.router.navigate("/tests/" + tid + "/questions", !0)) :setTimeout(that.saveQuestion(e), 600);
}, QuestionCodeEditStep3View.prototype.openTestCaseAlertModal = function(condition, add_another) {
var view;
return null == add_another && (add_another = !1), view = new TestcaseAlertModalView({
model:this.model,
qid:this.model.get("id"),
tid:this.isLibrary ? null :this.testmodel.get("id"),
"case":condition,
isLibrary:this.isLibrary,
add_another:add_another
}), this._subviews.push(view), this.$("#testcase-alert-modal-container").html(view.render().el);
}, QuestionCodeEditStep3View.prototype.editTestcase = function(e) {
var index, model;
return e.preventDefault(), $(e.currentTarget).hasClass("disabled") ? void 0 :(index = parseInt($(e.currentTarget).data("tcid")), 
model = this.testcases.at(index), model.fetch({
success:function(_this) {
return function(model) {
var edit_testcase_view;
return edit_testcase_view = new TestcaseEditModalView({
model:model,
index:index,
collection:_this.testcases
}), _this._subviews.push(edit_testcase_view), _this.$("#testcase-modal-container").html(edit_testcase_view.render().el);
};
}(this)
}));
}, QuestionCodeEditStep3View.prototype.addTestcase = function(e) {
var add_testcase_view, index, model;
return e.preventDefault(), index = this.testcases.models.length, model = new HR.TestCaseModel({
qid:this.model.get("id"),
tid:this.isLibrary ? null :this.testmodel.get("id")
}), add_testcase_view = new TestcaseEditModalView({
model:model,
index:index,
collection:this.testcases
}), this._subviews.push(add_testcase_view), this.$("#testcase-modal-container").html(add_testcase_view.render().el);
}, QuestionCodeEditStep3View.prototype.uploadTestcases = function(e) {
var upload_testcases_view;
return e.preventDefault(), upload_testcases_view = new TestcasesUploadModalView({
collection:this.testcases
}), this._subviews.push(upload_testcases_view), this.$("#testcase-modal-container").html(upload_testcases_view.render().el);
}, QuestionCodeEditStep3View;
}(window.HR.GenericView), TestcaseAlertModalView = function(_super) {
function TestcaseAlertModalView() {
return TestcaseAlertModalView.__super__.constructor.apply(this, arguments);
}
return __extends(TestcaseAlertModalView, _super), TestcaseAlertModalView.prototype.template = "x/testcase-alert-modal", 
TestcaseAlertModalView.prototype.className = "testcase-alert", TestcaseAlertModalView.prototype.initialize = function(options) {
return this.isLibrary = options.isLibrary, this.tid = options.tid, this.qid = options.qid, 
this["case"] = options["case"], this.add_another = options.add_another;
}, TestcaseAlertModalView.prototype.events = function() {
return {
"click .continue-navigation":"continueNavigation"
};
}, TestcaseAlertModalView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this), $(this.el).html(content), 
"no_test_cases" === this["case"] ? this.$("#testcase-no-cases-alert-modal").modal() :"no_sample_test_case" === this["case"] && this.$("#testcase-no-sample-alert-modal").modal(), 
this;
}, TestcaseAlertModalView.prototype.continueNavigation = function(e) {
return e.preventDefault(), this.$(".close").click(), "approx" === this.model.get("type") ? this.isLibrary ? HR.router.navigate("/library/questions/" + this.qid + "/edit/step4", !0) :HR.router.navigate("/tests/" + this.tid + "/questions/" + this.qid + "/edit/step4", !0) :(this.add_another && (setTimeout(function() {
return function() {
return HR.util.ajaxmsg("Question saved", !1, !0, 5);
};
}(this), 300), setTimeout(function(_this) {
return function() {
return _this.isLibrary ? (Backbone.history.navigate("library/questions/new/" + _this.model.get("type"), !0), 
HR.router.createLibraryQuestion(_this.model.get("type"))) :(Backbone.history.navigate("tests/" + _this.tid + "/questions/new/" + _this.model.get("type"), !0), 
HR.router.createQuestion(_this.tid, _this.model.get("type")));
};
}(this), 1e3)), this.isLibrary ? HR.router.navigate("/library/personal", !0) :HR.router.navigate("/tests/" + this.tid + "/questions", !0));
}, TestcaseAlertModalView;
}(window.HR.GenericView), TestcaseView = function(_super) {
function TestcaseView() {
return TestcaseView.__super__.constructor.apply(this, arguments);
}
return __extends(TestcaseView, _super), TestcaseView.prototype.template = "x/testcase-row", 
TestcaseView.prototype.className = "testcase-row", TestcaseView.prototype.tagName = "tr", 
TestcaseView.prototype.initialize = function(options) {
return this.index = options.index, this.parent = options.parent, this.listenTo(this.model, "change", this.render);
}, TestcaseView.prototype.events = function() {
return {
"click .js-remove-testcase":"removeTestcase",
"click .js-download-testcase":"downloadTestcase"
};
}, TestcaseView.prototype.render = function() {
var content;
return content = HR.appController.template(this.template, this)({
testcase:this.model.toJSON(),
index:this.index
}), $(this.el).html(content), this;
}, TestcaseView.prototype.removeTestcase = function(e) {
var delete_testcase_modal;
return e.preventDefault(), $(e.currentTarget).hasClass("disabled") ? void 0 :(delete_testcase_modal = new TestcaseDeleteModalView({
model:this.model,
parent:this
}), this.parent.$("#testcase-modal-container").html(delete_testcase_modal.render().el));
}, TestcaseView.prototype.downloadTestcase = function(e) {
return e.preventDefault(), $(e.currentTarget).hasClass("disabled") ? void 0 :$.getJSON(this.model.downloadURL(), function() {
return function(data) {
var response;
return data.status === !0 ? (response = data.model, $.fileDownload(response.input), 
$.fileDownload(response.output)) :console.log("error");
};
}(this));
}, TestcaseView;
}(window.HR.GenericView), TestcaseEditModalView = function(_super) {
function TestcaseEditModalView() {
return TestcaseEditModalView.__super__.constructor.apply(this, arguments);
}
return __extends(TestcaseEditModalView, _super), TestcaseEditModalView.prototype.template = "x/testcase-edit-modal", 
TestcaseEditModalView.prototype.className = "testcase-edit-modal", TestcaseEditModalView.prototype.initialize = function(options) {
return this.index = options.index;
}, TestcaseEditModalView.prototype.events = function() {
return {
"submit form[name=edit-testcase-form]":"saveTestcase"
};
}, TestcaseEditModalView.prototype.render = function() {
var content;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
index:this.index
}), $(this.el).html(content), this.$("#edit-testcase-modal").modal(), this;
}, TestcaseEditModalView.prototype.saveTestcase = function(e) {
var testcase_data;
return e.preventDefault(), testcase_data = {
name:this.$("input[name=name]").val() || "Testcase " + this.index,
type:this.$("select[name=type]").val() || "Easy",
score:parseInt(this.$("input[name=score]").val()),
input:this.$("textarea[name=input]").val(),
output:this.$("textarea[name=output]").val(),
sample:this.$("input[name=sample]:checked").length > 0 ? !0 :!1
}, this.model.save(testcase_data, {
success:function(_this) {
return function(model) {
return model.collection ? _this.$(".close").click() :(_this.$(".close").click(), 
_this.collection.add(model));
};
}(this)
});
}, TestcaseEditModalView;
}(window.HR.GenericView), TestcasesUploadModalView = function(_super) {
function TestcasesUploadModalView() {
return TestcasesUploadModalView.__super__.constructor.apply(this, arguments);
}
return __extends(TestcasesUploadModalView, _super), TestcasesUploadModalView.prototype.template = "x/testcases-upload-modal", 
TestcasesUploadModalView.prototype.className = "testcases-upload-modal", TestcasesUploadModalView.prototype.events = function() {
return {
"submit form[name=upload-testcases-form]":"uploadTestcases"
};
}, TestcasesUploadModalView.prototype.render = function() {
var content;
return content = HR.appController.template(this.template, this), $(this.el).html(content), 
this.$("#upload-testcases-modal").modal(), this;
}, TestcasesUploadModalView.prototype.uploadTestcases = function(e) {
var request_params;
return e.preventDefault(), this.$(".alert").addClass("hidden"), request_params = {
url:this.collection.url(),
type:"POST",
dataType:"json",
success:function(_this) {
return function(xhr) {
return "Success" === xhr.message ? (_this.$(".close").click(), _this.collection.fetch()) :(_this.$(".alert").html(xhr.message), 
_this.$(".alert").removeClass("hidden"));
};
}(this),
error:function() {
return function() {
return console.log("error");
};
}(this)
}, $(":file").length > 0 && (request_params.iframe = !0, request_params.processData = !1, 
request_params.files = $(":file")), $.ajax(request_params);
}, TestcasesUploadModalView;
}(window.HR.GenericView), TestcaseDeleteModalView = function(_super) {
function TestcaseDeleteModalView() {
return TestcaseDeleteModalView.__super__.constructor.apply(this, arguments);
}
return __extends(TestcaseDeleteModalView, _super), TestcaseDeleteModalView.prototype.template = "x/testcase-delete-modal", 
TestcaseDeleteModalView.prototype.className = "testcase-delete-modal", TestcaseDeleteModalView.prototype.initialize = function(options) {
return this.parent = options.parent, TestcaseDeleteModalView.__super__.initialize.call(this, options);
}, TestcaseDeleteModalView.prototype.events = function() {
return {
"click .js-delete-testcase":"deleteTestcase"
};
}, TestcaseDeleteModalView.prototype.render = function() {
var content;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON()
}), $(this.el).html(content), this.$("#delete-testcase-modal").modal(), this;
}, TestcaseDeleteModalView.prototype.deleteTestcase = function() {
return this.$(".close").click(), HR.util.ajaxmsg("Loading...", !1, !0, 1e3), this.model.destroy({
success:function(_this) {
return function() {
return _this.parent.parent.fetchTestcaseView(), _this.parent.parent.fetchTestcases();
};
}(this),
error:function() {
return function() {
return console.log("error");
};
}(this)
});
}, TestcaseDeleteModalView;
}(window.HR.GenericView), QuestionCodeEditStep4View = function(_super) {
function QuestionCodeEditStep4View() {
return QuestionCodeEditStep4View.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionCodeEditStep4View, _super), QuestionCodeEditStep4View.prototype.template = "x/question-coding-step4", 
QuestionCodeEditStep4View.prototype.className = "question-coding-step4", QuestionCodeEditStep4View.prototype.langTextMapping = {
c:"C",
cpp:"C++",
java:"Java",
csharp:"C#",
python:"Python",
php:"PHP",
ruby:"Ruby",
perl:"Perl",
javascript:"Javascript",
haskell:"Haskell",
clojure:"Clojure",
scala:"Scala",
go:"Go",
objectivec:"Objective C",
erlang:"Erlang",
groovy:"Groovy",
code:"Code",
oracle:"Oracle",
r:"R",
java8:"Java 8"
}, QuestionCodeEditStep4View.prototype.lang_mime_mapping = {
c:"text/x-csrc",
cpp:"text/x-c++src",
java:"text/x-java",
csharp:"text/x-csharp",
haskell:"text/x-haskell",
php:"text/x-php",
python:"text/x-python",
perl:"text/x-perl",
ruby:"text/x-ruby",
bash:"text/x-bash",
oracle:"text/x-plsql",
mysql:"text/x-plsql",
sql:"text/x-plsql",
clojure:"text/x-scheme",
scala:"text/plain",
code:"text/plain",
go:"text/x-go",
javascript:"text/javascript",
objectivec:"text/x-csrc",
java8:"text/x-java"
}, QuestionCodeEditStep4View.prototype.initialize = function(options) {
return this.isLibrary = options.isLibrary, this.testmodel = options.testmodel, this.savedCodes = {};
}, QuestionCodeEditStep4View.prototype.events = function() {
return {
"submit form[name=coding-question-step4-form]":"saveQuestion",
"change #code-editor-lang-select2":"changeLanguage",
"click button.js-save-and-add":"saveAndAdd"
};
}, QuestionCodeEditStep4View.prototype.render = function() {
var $tbody_textarea, content;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON()
}), $(this.el).html(content), this.language = this.model.get("evaluator_language") ? this.model.get("evaluator_language") :"cpp", 
this.editorOptions = {
lineNumbers:!0,
lineWrapping:!1,
mode:this.lang_mime_mapping[this.language]
}, $tbody_textarea = this.$("textarea#evaluator_code").get(0), HR.appController.loadCodeMirrorMode(this.language, function(_this) {
return function() {
return $tbody_textarea && !_this.tbody_editor && (_this.tbody_editor = CodeMirror.fromTextArea($tbody_textarea, _this.editorOptions), 
setTimeout(function() {
return _this.tbody_editor.refresh();
}, 10)), _this.initCodeEditorLanguageSelect2();
};
}(this)), this;
}, QuestionCodeEditStep4View.prototype.initCodeEditorLanguageSelect2 = function() {
var data;
return data = [], _.each(this.langTextMapping, function() {
return function(lang, label) {
return data.push({
id:label,
text:lang
});
};
}(this)), this.$("#code-editor-lang-select2").select2({
width:"off",
data:data
});
}, QuestionCodeEditStep4View.prototype.changeLanguage = function(e) {
var lang;
return e.preventDefault(), this.savedCodes[this.language] = this.tbody_editor.getValue(), 
lang = this.$(e.currentTarget).val(), HR.appController.loadCodeMirrorMode(lang, function(_this) {
return function() {
var $tbody_textarea;
return _this.editorOptions.mode = _this.lang_mime_mapping[lang], $tbody_textarea = _this.$("textarea#evaluator_code").get(0), 
$tbody_textarea ? (_this.language = lang, _this.tbody_editor.setOption("mode", _this.lang_mime_mapping[lang]), 
_this.savedCodes[_this.language] ? _this.tbody_editor.setValue(_this.savedCodes[_this.language]) :_this.tbody_editor.setValue(""), 
setTimeout(function() {
return _this.tbody_editor.refresh();
}, 10)) :void 0;
};
}(this));
}, QuestionCodeEditStep4View.prototype.saveAndAdd = function(e) {
return this.saveQuestion(e, !0);
}, QuestionCodeEditStep4View.prototype.saveQuestion = function(e, add_another) {
return null == add_another && (add_another = !1), e.preventDefault(), this.model.set("evaluator_language", this.language, {
silent:!0
}), this.model.set("evaluator_code", this.tbody_editor.getValue(), {
silent:!0
}), this.model.save(null, {
silent:!0,
success:function(_this) {
return function(model) {
return add_another ? (setTimeout(function() {
return HR.util.ajaxmsg("Question saved", !1, !0, 5);
}, 300), setTimeout(function() {
return _this.isLibrary ? (Backbone.history.navigate("library/questions/new/" + model.get("type"), !0), 
HR.router.createLibraryQuestion(model.get("type"))) :(Backbone.history.navigate("tests/" + _this.testmodel.get("id") + "/questions/new/" + model.get("type"), !0), 
HR.router.createQuestion(_this.testmodel.get("id"), model.get("type")));
}, 1e3)) :_this.isLibrary ? Backbone.history.navigate("library/personal", !0) :Backbone.history.navigate("tests/" + _this.testmodel.get("id") + "/questions", !0);
};
}(this)
});
}, QuestionCodeEditStep4View;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestQuestionEditView = TestQuestionEditView;
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
var HR, TestQuestionsShufflingView, _ref;
return TestQuestionsShufflingView = function(_super) {
function TestQuestionsShufflingView() {
return TestQuestionsShufflingView.__super__.constructor.apply(this, arguments);
}
return __extends(TestQuestionsShufflingView, _super), TestQuestionsShufflingView.prototype.initialize = function() {
var that;
return that = this;
}, TestQuestionsShufflingView.prototype.template = "x/test-questions-shuffling", 
TestQuestionsShufflingView.prototype.className = "test-questions-shuffling", TestQuestionsShufflingView.prototype.events = function() {
return {
"submit form[name=questions-shuffling-form]":"saveQuestionsShuffling"
};
}, TestQuestionsShufflingView.prototype._render = function() {
var content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content)), this.timer && clearTimeout(this.timer), this.timer = setTimeout(function(_this) {
return function() {
return _this.$(".switch").bootstrapSwitch();
};
}(this), 200), this;
}, TestQuestionsShufflingView.prototype.saveQuestionsShuffling = function(e) {
var attrs, shuffling;
return e.preventDefault(), shuffling = this.$("input[name=questions-shuffling]").attr("checked"), 
attrs = shuffling ? {
shuffle_questions:"True"
} :{
shuffle_questions:"False"
}, this.model.save(attrs, {
silent:!0
});
}, TestQuestionsShufflingView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestQuestionsShufflingView = TestQuestionsShufflingView;
});
}.call(this), function() {
var HR, TestQuestionsView, _ref, __bind = function(fn, me) {
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
jQuery(function() {}), TestQuestionsView = function(_super) {
function TestQuestionsView() {
return this.downloadPDF = __bind(this.downloadPDF, this), TestQuestionsView.__super__.constructor.apply(this, arguments);
}
return __extends(TestQuestionsView, _super), TestQuestionsView.prototype.initialize = function(options) {
var that;
return that = this, "download" === options.action ? (this.action = "download", this.withAns = !0) :"downloadnoans" === options.action ? (this.action = "download", 
this.withAns = !1) :this.action = options.action, this.listenTo(this.model, "change", this.render), 
this.listenTo(this.model, "reset", this.render), this.removeQuestionId = null;
}, TestQuestionsView.prototype.template = "x/test-questions", TestQuestionsView.prototype.className = "test-questions-view", 
TestQuestionsView.prototype.events = function() {
return {
"click .js-toggle-question-desc":"toggleQuestionDesc",
"click .js-createnew":"createNew",
"click .js-create-question":"createQuestion",
"click .js-question-remove":"removeQuestion",
"click #undo-remove-question":"undoRemoveQuestion",
"click #test-download-btn":"downloadPDF"
};
}, TestQuestionsView.prototype.render = function() {
var content, that, _model;
return that = this, $(".tooltip").hide(), _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
removeQuestionId:this.removeQuestionId,
throbber:HR.appController.viewLoader(),
h:window.istreet.cfg.permissions,
action:this.action
}), $(this.el).html(content), this.$(".tip").tooltip()), "download" === this.action && this.downloadQuestions(this.withAns), 
this.makeButtonsResponsive(), setTimeout(function(_this) {
return function() {
return _this.$("#questions-sortable").sortable({
revert:!0,
handle:".draggable",
stop:function() {
var new_questions_array;
return new_questions_array = [], _this.$("#questions-sortable tr").not(".q-desc").each(function() {
return $(this).data("qid") ? new_questions_array.push($(this).data("qid") + "") :void 0;
}), HR.util.compareArrays(new_questions_array, _this.model.get("questions_array")) || 0 !== _.difference(_this.model.get("questions_array"), new_questions_array).length ? void 0 :(_this.model.set("questions_array", new_questions_array, {
silent:!0
}), _this.model.save(null, {
success:function() {
var track_data;
return track_data = {
Page:"Questions",
test_id:_this.model.get("id")
}, HR.util.track("Edited Test Settings", track_data), _this.model.fetch();
}
}));
}
});
};
}(this), 300), "new" === this.action && this.$(".js-create-question").trigger("click"), 
this;
}, TestQuestionsView.prototype.remove = function() {
return $(".tooltip").hide(), TestQuestionsView.__super__.remove.apply(this, arguments);
}, TestQuestionsView.prototype.downloadQuestions = function(withAns) {
var download_questions, ques, question_index, view, _i, _len, _ref, _results;
for (null == withAns && (withAns = !0), download_questions = this.$("#questions-download"), 
question_index = 1, _ref = this.model.get("questions_data"), _results = [], _i = 0, 
_len = _ref.length; _len > _i; _i++) ques = _ref[_i], ques.question_index = question_index++, 
view = new HR.TestLibraryQuestionView({
question:ques,
test:this.model,
noexpand:!0,
actions:"download",
withAns:withAns
}), _results.push(download_questions.append(view.render().el));
return _results;
}, TestQuestionsView.prototype.downloadPDF = function(e) {
var startDownload;
return e.preventDefault(), startDownload = function(_this) {
return function(withAns) {
return HR.util.ajaxmsg("Generating question list as PDF... please wait.", !1, !1), 
$.fileDownload("/x/api/v1/tests/" + _this.model.get("id") + "/download?authkey=" + _this.model.get("authkey") + "&withAns=" + withAns, {
httpMethod:"GET",
timeout:1e4,
successCallback:function() {
return HR.util.ajaxmsg("Downloading question list as PDF... please wait.", !1, !0, 2);
},
failCallback:function() {
return HR.util.ajaxmsg("Error downloading. Try again a little later.", !1, !0, 2);
}
});
};
}(this), HR.util.confirm({
title:"Save Test as PDF",
width:600,
closebutton:!0,
okButtonText:"Save Recruiter View",
cancelButtonText:"Save Candidate View",
message:"In the Recruiter View, the saved PDF will include answers to certain question types, like multiple-choice questions.<br/>In the Candidate view the saved PDF will only include the questions.",
okCallback:function() {
return startDownload(!0);
},
cancelCallback:function() {
return startDownload(!1);
}
});
}, TestQuestionsView.prototype.toggleQuestionDesc = function(e) {
var el, q, qid, ques, view, _i, _len, _ref;
if (e.preventDefault(), qid = $(e.currentTarget).data("qid"), this.$("#q-" + qid + "-desc").hasClass("hidden") ? (this.$("#q-" + qid + "-desc").removeClass("hidden"), 
$(e.currentTarget).find("i").removeClass("icon-down-open").addClass("icon-up-open")) :(this.$("#q-" + qid + "-desc").addClass("hidden"), 
$(e.currentTarget).find("i").removeClass("icon-up-open").addClass("icon-down-open")), 
el = this.$(".js-question-desc[data-qid=" + qid + "]"), "0" === el.attr("data-rendered")) {
for (el.attr("data-rendered", "1"), q = null, _ref = this.model.get("questions_data"), 
_i = 0, _len = _ref.length; _len > _i; _i++) if (ques = _ref[_i], ques.id === qid) {
q = ques;
break;
}
if (!q) return el.html("<em>Question info unavailable.</em>"), void 0;
view = new HR.TestLibraryQuestionView({
question:q,
test:this.model,
noexpand:!0,
actions:!1
}), el.html(view.render().el);
}
return this.makeButtonsResponsive();
}, TestQuestionsView.prototype.createQuestion = function(e) {
var create_question_modal;
return e.preventDefault(), create_question_modal = new HR.CreateQuestionModalView({
model:this.model
}), this.$("#modal-container").html(create_question_modal.render().el);
}, TestQuestionsView.prototype.removeQuestion = function(e) {
var index, qid, remove_question_modal;
return e.preventDefault(), qid = $(e.currentTarget).data("question-id"), index = parseInt($(e.currentTarget).data("index"), 10), 
remove_question_modal = new HR.RemoveQuestionModalView({
model:this.model,
parent:this,
qid:qid,
index:index
}), this.$("#modal-container").html(remove_question_modal.render().el);
}, TestQuestionsView.prototype.showUndoMessage = function(id, index) {
return this.removeQuestionId = {
id:id,
index:index
}, this.render();
}, TestQuestionsView.prototype.hideUndoMessage = function() {
return this.removeQuestionId = null;
}, TestQuestionsView.prototype.undoRemoveQuestion = function(e) {
var index, qid, that;
return e.preventDefault(), that = this, qid = $(e.currentTarget).data("qid"), index = parseInt($(e.currentTarget).data("index"), 10), 
this.hideUndoMessage(), this.model.addQuestion(qid, index, {
success:function() {
return console.log("success"), that.model.fetch();
},
error:function() {
return console.log("error");
}
});
}, TestQuestionsView.prototype.makeButtonsResponsive = function() {
var html_found, overflow_container, responsive_bottom_holder;
if (overflow_container = $("#control-overflow")[0], responsive_bottom_holder = $("#responsive-bottom-holder")[0], 
html_found = $("#responsive-bottom-holder").html(), overflow_container) if (overflow_container.offsetHeight < overflow_container.scrollHeight || overflow_container.offsetWidth < overflow_container.scrollWidth) {
if ($(".overflow-content").addClass("support-reponsive-bottom-holder"), $("#responsive-bottom-holder").length > 0) return $("#responsive-bottom-holder").addClass("hidden"), 
$("#responsive-bottom-placeholder").html(html_found), $("#responsive-bottom-placeholder").addClass("float-bottom");
} else if ($(".overflow-content").removeClass("support-reponsive-bottom-holder"), 
$("#responsive-bottom-holder").length > 0) return $("#responsive-bottom-holder").removeClass("hidden"), 
$("#responsive-bottom-placeholder").html(""), $("#responsive-bottom-placeholder").removeClass("float-bottom");
}, TestQuestionsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestQuestionsView = TestQuestionsView;
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
}, __bind = function(fn, me) {
return function() {
return fn.apply(me, arguments);
};
};
jQuery(function() {
var HR, ReportDetailedCodeUploadView, ReportDetailedCodeView, ReportDetailedCorrectErrorsView, ReportDetailedDesignView, ReportDetailedDrawView, ReportDetailedMCQView, ReportDetailedQuestionView, ReportDetailedRewriteCompleteView, ReportDetailedTextAnsView, ReportDetailedView, ReportSummaryView, ReportTimelineView, TestReportView, _ref;
return TestReportView = function(_super) {
function TestReportView() {
return TestReportView.__super__.constructor.apply(this, arguments);
}
return __extends(TestReportView, _super), TestReportView.prototype.template = "x/test-report", 
TestReportView.prototype.className = "test-report", TestReportView.prototype.initialize = function(options) {
return this._subviews = [], this.testmodel = options.testmodel, this.aid = options.aid, 
this.tid = options.tid, this.qid = options.qid, this.user = HR.currentUser, this.tab = options.tab, 
this.auth_pass = options.auth_pass ? options.auth_pass :null, this.tq_split = {}, 
ZeroClipboard.config({
debug:!1
}), this.model = new HR.TestAttemptModel({
id:this.aid,
tid:this.tid,
auth_pass:this.auth_pass
}), this.summary_view = new HR.ReportSummaryView({
model:this.model,
testmodel:this.testmodel,
tq_split:this.tq_split,
parent:this,
tab:this.tab
}), this._subviews.push(this.summary_view), this.detailed_view = new HR.ReportDetailedView({
model:this.model,
testmodel:this.testmodel,
qid:this.qid,
parent:this,
tab:this.tab
}), this._subviews.push(this.detailed_view), this.timeline_view = new HR.ReportTimelineView({
model:this.model,
testmodel:this.testmodel,
parent:this
}), this._subviews.push(this.timeline_view), this.listenTo(this.model, "change", this.render), 
this.model.fetch({
data:{
auth_pass:this.auth_pass
},
error:function(m, e) {
return 403 === e.status ? bootbox.alert("Bad password.", function() {
return Backbone.history.loadUrl(Backbone.history.fragment);
}) :void 0;
}
});
}, TestReportView.prototype.events = function() {
return {
"click .js-report-tab":"changeTab",
"click .js-share":"shareReport",
"click .js-pdf":"downloadPDF",
"click .js-set-ats":"setAts",
"click .js-reportlink":"shareReportTrack"
};
}, TestReportView.prototype._render = function() {
var content;
return this.timeline_view.buildGoogleDatatable(), this.model.get("questions") && this.getQuestionTime(), 
content = HR.appController.template(this.template, this)({
test:this.testmodel.toJSON(),
user:this.user.toJSON(),
tab:this.tab,
model:this.model.toJSON()
}), $(this.el).html(content), this.renderTab(this.tab, this.qid), this;
}, TestReportView.prototype.shareReportTrack = function() {
var track_data;
return track_data = {
attempt_id:this.model.get("id"),
test_id:this.testmodel.get("id")
}, HR.util.track("Shared Test Report", track_data);
}, TestReportView.prototype.setAts = function(e) {
var ats, el;
return e.preventDefault(), el = this.$(e.currentTarget), ats = parseInt(el.attr("data-attribute-ats")), 
this.testmodel.setAction("set_attempts_ats"), this.$(".js-dropdowntxt").html("Saving new status.."), 
this.testmodel.save({
aids:[ this.model.get("id") ],
set_ats:ats
}, {
success:function(_this) {
return function() {
return _this.testmodel.unsetAction(), _this.model.fetch(), _this.testmodel.fetch({
success:function() {
var track_data;
return HR.appView.updateSidebarView(), track_data = {
candidate_id:_this.model.get("id"),
action:"ATS State change",
value:ats
}, HR.util.track("Edited Test Report", track_data);
}
});
};
}(this),
error:function(_this) {
return function() {
return _this.testmodel.unsetAction(), _this.$(".js-dropdowntxt").html("Status: " + window.istreet.cfg.ats[_this.model.get("ats_state")]);
};
}(this)
});
}, TestReportView.prototype.changeTab = function(e) {
var new_url, qid, tab;
return e.preventDefault(), tab = $(e.currentTarget).data("tab"), qid = $(e.currentTarget).data("qid"), 
this.$(".sub-topbar-tabs li").removeClass("active"), this.$(".sub-topbar-tabs li a[data-tab=" + tab + "]").parent().addClass("active"), 
new_url = "/x/tests/" + this.tid + "/candidates/" + this.aid + "/report/" + tab, 
qid && (new_url += "/" + qid), window.history && history.pushState && window.history.pushState(null, null, new_url), 
this.renderTab(tab, qid);
}, TestReportView.prototype.renderTab = function(tab, qid) {
return null == qid && (qid = null), this.model.get("test") ? (this.pdfview = new HR.TestReportsPDFView({
singleaid:this.model.get("id"),
testmodel:this.testmodel
}), "summary" === tab ? this.$("#report-tab-content-container").html(this.summary_view.render().el) :"detailed" === tab ? this.$("#report-tab-content-container").html(this.detailed_view.render(qid).el) :"timeline" === tab ? this.$("#report-tab-content-container").html(this.timeline_view.render().el) :"pdf" === tab ? (this.$("#report-tab-content-container").html(this.summary_view.render().el), 
this.$("#report-tab-content-container").append(this.detailed_view.render(qid).el), 
this.$("#report-tab").css({
overflow:"initial"
}), setTimeout(function(_this) {
return function() {
return $("body").attr("style", "font-family:sans-serif !important;font-weight:normal;font-style:normal"), 
_this.$(".text-ellipsis-span").removeClass("text-ellipsis-span"), _this.$("p").attr("style", "font-family:sans-serif !important;"), 
_this.$("button").attr("style", "font-family:sans-serif !important;");
};
}(this), 100)) :void 0) :void 0;
}, TestReportView.prototype.getQuestionTime = function() {
var i, j, model_qt_split, question, time, _i, _j, _len, _len1, _ref, _ref1, _results;
for (model_qt_split = this.model.get("questions_time_split"), _ref = this.model.get("questions"), 
_results = [], i = _i = 0, _len = _ref.length; _len > _i; i = ++_i) if (question = _ref[i], 
this.tq_split[i + 1] = null, this.timeline_view.qarray && this.timeline_view.qarray[i + 1]) {
for (time = 0, _ref1 = this.timeline_view.qarray[i + 1], _j = 0, _len1 = _ref1.length; _len1 > _j; _j++) j = _ref1[_j], 
time += j[1] - j[0];
_results.push(this.tq_split[i + 1] = time);
} else model_qt_split ? _results.push(this.tq_split[i + 1] = model_qt_split[question.id]) :_results.push(void 0);
return _results;
}, TestReportView.prototype.shareReport = function(e) {
return e.preventDefault(), this.$(".sharereport-modal").modal(), this.$("#copy-share-link-report").popover({
content:"Link has been copied",
trigger:"none"
}), $("#global-zeroclipboard-html-bridge").css("position", "fixed"), this.initializeCopy();
}, TestReportView.prototype.initializeCopy = function() {
var client, that, url;
return that = this, url = "" + document.location.host + "/x/tests/" + this.testmodel.get("id") + "/candidates/" + this.model.get("id") + "/report?authkey=" + this.testmodel.get("authkey"), 
this.$(".js-reportlink").val(url), this.$("#copy-share-link-report").attr("data-clipboard-text", url), 
this.$("#report-link-inp").select(), client = new ZeroClipboard(this.$("#copy-share-link-report"), {
container:$("div.modal.fade.sharereport-modal")
}), client.on("complete", function() {
var elem;
return $(this).popover("show"), elem = $(this), that.shareReportTrack(), setTimeout(function() {
return function() {
return elem.popover("hide"), that.initializeCopy();
};
}(this), 2e3);
});
}, TestReportView.prototype.downloadPDF = function(e) {
return e.preventDefault(), this.pdfview.handleDownload();
}, TestReportView;
}(window.HR.GenericView), ReportSummaryView = function(_super) {
function ReportSummaryView() {
return ReportSummaryView.__super__.constructor.apply(this, arguments);
}
return __extends(ReportSummaryView, _super), ReportSummaryView.prototype.template = "x/test-report-summary", 
ReportSummaryView.prototype.className = "test-report-summary", ReportSummaryView.prototype.initialize = function(options) {
return this.testmodel = options.testmodel, this.parent = options.parent, this.tq_split = options.tq_split, 
this.tab = options.tab;
}, ReportSummaryView.prototype.events = function() {
return {
"keyup #add_new_report_comment":"addReportComment"
};
}, ReportSummaryView.prototype.addReportComment = function(e) {
var comment, opts, that, url;
return 13 === e.which || 13 === e.keyCode ? (e.preventDefault(), that = this, comment = this.$("#add_new_report_comment").val(), 
comment ? (opts = {
comment:comment,
qid:0
}, url = "/x/api/v1/tests/" + this.model.get("tid") + "/attempts/" + this.model.get("id") + "/report_comment", 
$.post(url, opts, function(_this) {
return function(data) {
var html, track_data;
return data.status === !0 ? (html = '<div class="msT msB"> <p>' + _.escape(data.model.comment) + '</p> <p class="txt-alt-grey">- ' + data.model.name + " (" + HR.util.formatDateTime(data.model.inserttime) + ")</p> </div>", 
_this.$(".comments_container").append(html), _this.$("#add_new_report_comment").val(""), 
that.model.fetch({
silent:!0
}), track_data = {
candidate_id:_this.model.get("id"),
action:"Feedback"
}, HR.util.track("Edited Test Report", track_data)) :void 0;
};
}(this))) :alert("Please type a comment, and press enter.")) :!0;
}, ReportSummaryView.prototype._render = function() {
var content, html, more_details, outof;
return more_details = [], this.model.get("test") && (_.each(this.model.get("candidate_details"), function(detail) {
if ("gender" !== detail.field_name) return more_details.push(detail);
switch (detail.value) {
case "m":
return more_details.push({
title:"GENDER",
value:"Male"
});

case "f":
return more_details.push({
title:"GENDER",
value:"Female"
});
}
}), this.model.get("ip_address") && more_details.push({
title:"IP ADDRESS",
value:this.model.get("ip_address")
}), this.model.get("inviter") && more_details.push({
title:"INVITED BY",
value:this.model.get("inviter")
}), this.model.get("scores_tags_split") && (html = "", _.each(this.model.get("scores_tags_split"), function() {
return function(value, tag) {
return html += '<span class="label q-tags">' + tag + "</span> " + value + "<br/>";
};
}(this)), more_details.push({
title:"TAG SCORE",
value:html
}))), content = HR.appController.template(this.template, this)({
test:this.testmodel.toJSON(),
tab:this.tab,
model:this.model.toJSON(),
hasDisconnect:!1,
more_details:more_details,
tq_split:this.tq_split,
pdfmode:"pdf" === this.tab
}), $(this.el).html(content), this.model.get("test") && (outof = this.model.get("test").max_score, 
outof < this.model.get("score") && (outof = this.model.get("score")), this.makeDonut(this.model.get("score"), outof - this.model.get("score"))), 
this;
}, ReportSummaryView.prototype.makeDonut = function(a, b) {
var data, options;
if (this.model.get("test")) return google ? (data = google.visualization.arrayToDataTable([ [ "A", "B" ], [ "Right", parseInt(a) ], [ "Wrong", parseInt(b) ] ]), 
options = {
pieHole:.7,
pieSliceText:"none",
width:"260",
height:"260",
tooltip:{
trigger:"none",
showColorCode:!1
},
legend:{
position:"none"
},
colors:[ "#4dd486", "#f1f1f1" ]
}, setTimeout(function(_this) {
return function() {
return _this.$("#donut").length > 0 ? new google.visualization.PieChart(_this.$("#donut")[0]).draw(data, options) :void 0;
};
}(this), 300)) :void 0;
}, ReportSummaryView;
}(window.HR.GenericView), ReportDetailedView = function(_super) {
function ReportDetailedView() {
return ReportDetailedView.__super__.constructor.apply(this, arguments);
}
return __extends(ReportDetailedView, _super), ReportDetailedView.prototype.template = "x/test-report-detailed", 
ReportDetailedView.prototype.className = "test-report-detailed", ReportDetailedView.prototype.initialize = function(options) {
return this.testmodel = options.testmodel, this.tab = options.tab, this._subviews = [];
}, ReportDetailedView.prototype.events = function() {}, ReportDetailedView.prototype.render = function(qid) {
var content, that;
return null == qid && (qid = null), that = this, content = HR.appController.template(this.template, this), 
$(this.el).html(content), this.renderQuestions(), setTimeout(function() {
return function() {
return qid ? that.scrollToQuestion(qid) :void 0;
};
}(this), 500), this;
}, ReportDetailedView.prototype.renderQuestions = function() {
var questions_container;
return questions_container = $('<div id="report-questions-container"></div>'), _.each(this.model.get("questions"), function(_this) {
return function(question, index) {
var question_view;
return question_view = new ReportDetailedQuestionView({
model:_this.model,
question:question,
index:index + 1,
test:_this.testmodel,
showcomment:"pdf" !== _this.tab,
tab:_this.tab
}), questions_container.append(question_view.render().el);
};
}(this)), this.$("#detailed-report").append(questions_container), HR.util.fixedInfo("report", ".report_container_timeline", 0);
}, ReportDetailedView.prototype.scrollToQuestion = function(qid) {
var top;
return top = $("#report-q-" + qid).position().top, setTimeout(function() {
return function() {
return $("#report-tab").animate({
scrollTop:top
}, 500);
};
}(this));
}, ReportDetailedView;
}(window.HR.GenericView), ReportDetailedQuestionView = function(_super) {
function ReportDetailedQuestionView() {
return ReportDetailedQuestionView.__super__.constructor.apply(this, arguments);
}
return __extends(ReportDetailedQuestionView, _super), ReportDetailedQuestionView.prototype.template = "x/test-report-detailed-question", 
ReportDetailedQuestionView.prototype.className = "test-report-detailed-question", 
ReportDetailedQuestionView.prototype.status = {
correct:{
"class":"icon2-status_correct txt-green",
text:"Correct Answer",
color:"green"
},
wrong:{
"class":"icon2-status_wrong txt-orange",
text:"Wrong Answer",
color:"red"
},
review:{
"class":"icon2-generalsettings txt-yellow",
text:"Needs Review",
color:"Yellow"
},
unattempted:{
"class":"icon2-status_no_ans txt-alt-grey",
text:"Not Submitted",
color:"grey"
},
neutral:{
"class":"icon2-status_no_ans txt-alt-grey",
text:"Self Evaluation",
color:"grey"
}
}, ReportDetailedQuestionView.prototype.initialize = function(options) {
var p, _subviews;
return _subviews = [], this.question = options.question, this.index = options.index, 
this.test = options.test, this.showcomment = options.showcomment, this.tab = options.tab, 
p = this.model.get("plagiarism"), this.plagiarism = p && p.plagiarism.questions[this.question.id], 
this.status_icon = this.plagiarism ? "review" :this.status[this.question.status] ? this.status[this.question.status] :this.status.neutral;
}, ReportDetailedQuestionView.prototype.events = function() {
return {
"click .js-btn-copy":"copyCode",
"keyup #add_new_comment":"addComment",
"click #scoreedit.editable":"editScore",
"keyup .score-input":"setScoreOnEnter",
"keydown .score-input":"checkInput",
"focusout .score-input":"setScoreOnFocus"
};
}, ReportDetailedQuestionView.prototype.copyCode = function(e) {
return e.preventDefault();
}, ReportDetailedQuestionView.prototype.addComment = function(e) {
var comment, opts, that, url;
return 13 === e.which || 13 === e.keyCode ? (e.preventDefault(), that = this, comment = this.$("#add_new_comment").val(), 
comment ? (opts = {
comment:comment,
qid:this.question.id
}, url = "/x/api/v1/tests/" + this.model.get("tid") + "/attempts/" + this.model.get("id") + "/report_comment", 
$.post(url, opts, function(_this) {
return function(data) {
var html, track_data;
return data.status === !0 ? (html = '<div class="msT msB"> <p>' + _.escape(data.model.comment) + '</p> <p class="txt-alt-grey">- ' + data.model.name + " (" + HR.util.formatDateTime(data.model.inserttime) + ")</p> </div>", 
_this.$(".comments_container").append(html), _this.$("#add_new_comment").val(""), 
that.model.fetch({
silent:!0
}), track_data = {
candidate_id:_this.model.get("id"),
action:"Question Comment",
question_no:_this.question.id
}, HR.util.track("Edited Test Report", track_data)) :void 0;
};
}(this))) :alert("Please type a comment, and press enter.")) :!0;
}, ReportDetailedQuestionView.prototype.setScoreOnEnter = function(e) {
return 13 === e.keyCode ? (e.preventDefault(), this.setScore()) :void 0;
}, ReportDetailedQuestionView.prototype.setScoreOnFocus = function(e) {
return e.preventDefault(), this.setScore();
}, ReportDetailedQuestionView.prototype.setScore = function() {
var score, that;
return score = this.$(".score-input").removeClass("error").val(), score === !this.question.score ? (this.cancelEditScore(), 
void 0) :(score = parseInt(score, 10), that = this, isNaN(score) ? void 0 :$.ajax({
url:"/x/api/v1/tests/" + this.test.get("id") + "/attempts/" + this.model.id + "/update_score",
type:"PUT",
data:{
authkey:this.test.get("authkey"),
qid:this.question.id,
score:score
},
success:function() {
return that.model.fetch({
silent:!0,
success:function() {
var track_data;
return that.$(".score-changer").removeClass("hidden").html("Score " + score), that.$(".score-input").addClass("hidden"), 
that.question.score = score, track_data = {
candidate_id:that.model.get("id"),
action:"Edit Score",
question_no:that.question.id
}, HR.util.track("Edited Test Report", track_data);
},
error:function() {
return that.$(".score-input").addClass("error");
}
});
},
error:function() {
return that.$(".score-input").addClass("error");
}
}));
}, ReportDetailedQuestionView.prototype.checkInput = function(e) {
return $(e.currentTarget).removeClass("error"), e.keyCode >= 65 && !(e.keyCode >= 96 && e.keyCode <= 105) || e.shiftKey ? ($(e.currentTarget).addClass("error"), 
!1) :void 0;
}, ReportDetailedQuestionView.prototype.editScore = function(e) {
return e.preventDefault(), this.$(".score-changer").addClass("hidden"), this.$(".score-input").removeClass("hidden"), 
this.$(".score-input").val(this.question.score), this.$(".score-input").focus();
}, ReportDetailedQuestionView.prototype.cancelEditScore = function() {
return this.$(".score-changer").removeClass("hidden"), this.$(".score-input").css("display", "none");
}, ReportDetailedQuestionView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
question:this.question,
index:this.index,
time:0,
status:this.status_icon,
plagiarism:this.plagiarism,
showcomment:this.showcomment
}), $(this.el).html(content), this.displayAnswer(), this;
}, ReportDetailedQuestionView.prototype.displayAnswer = function() {
var view;
switch (this.question.type) {
case "mcq":
case "multiple_mcq":
return view = new ReportDetailedMCQView({
question:this.question
}), this.$("#question_answer").html(view.render().el);

case "textAns":
case "unscramble":
case "file_upload":
return view = new ReportDetailedTextAnsView({
question:this.question
}), this.$("#question_answer").html(view.render().el);

case "rewrite":
case "complete":
return view = new ReportDetailedRewriteCompleteView({
question:this.question
}), this.$("#question_answer").html(view.render().el);

case "correct_errors":
return view = new ReportDetailedCorrectErrorsView({
question:this.question
}), this.$("#question_answer").html(view.render().el);

case "uml":
case "electrical":
return view = new ReportDetailedDrawView({
question:this.question
}), this.$("#question_answer").html(view.render().el);

case "code":
case "approx":
return view = new ReportDetailedCodeView({
question:this.question,
model:this.model,
test:this.test,
tab:this.tab
}), this.$("#question_answer").html(view.render().el);

case "design":
return view = new ReportDetailedDesignView({
question:this.question,
model:this.model,
testmodel:this.test,
tab:this.tab
}), this.$("#question_answer").html(view.render().el);

case "code_upload":
return view = new ReportDetailedCodeUploadView({
question:this.question
}), this.$("#question_answer").html(view.render().el);
}
}, ReportDetailedQuestionView;
}(window.HR.GenericView), ReportDetailedMCQView = function(_super) {
function ReportDetailedMCQView() {
return ReportDetailedMCQView.__super__.constructor.apply(this, arguments);
}
return __extends(ReportDetailedMCQView, _super), ReportDetailedMCQView.prototype.template = "x/test-report-detailed-mcq", 
ReportDetailedMCQView.prototype.className = "test-report-detailed-mcq", ReportDetailedMCQView.prototype.initialize = function(options) {
return this.question = options.question;
}, ReportDetailedMCQView.prototype._render = function() {
var content, exp_ans, html, img, left, my_ans, optIndex, option, right, _i, _len, _ref, _ref1, _ref2;
if ("mcq" === this.question.type ? (my_ans = [ this.question.my_answer ], exp_ans = [ this.question.answer ]) :(my_ans = this.question.my_answer, 
exp_ans = this.question.answer), content = HR.appController.template(this.template, this)({
question:this.question,
my_ans:my_ans,
exp_ans:exp_ans
}), $(this.el).html(content), optIndex = 1, this.question.answered) {
for (html = "", _ref = this.question.options, _i = 0, _len = _ref.length; _len > _i; _i++) option = _ref[_i], 
_ref1 = optIndex.toString(), right = __indexOf.call(my_ans, _ref1) >= 0 || __indexOf.call(my_ans, optIndex) >= 0, 
_ref2 = optIndex.toString(), left = __indexOf.call(exp_ans, _ref2) >= 0 || __indexOf.call(exp_ans, optIndex) >= 0, 
img = left && right ? "cy" :left && !right ? "cn" :!left && right ? "ny" :"nn", 
html += "<li><img class='mcq-opt-img' src = '/assets/mcq_options/img_mcq_" + img + ".png' /><span class='mcq-opt'>" + option + "</span><div class='clear' /></li>", 
optIndex++;
this.$(".mcq-reports-answer").html(html);
}
return this;
}, ReportDetailedMCQView;
}(window.HR.GenericView), ReportDetailedDrawView = function(_super) {
function ReportDetailedDrawView() {
return ReportDetailedDrawView.__super__.constructor.apply(this, arguments);
}
return __extends(ReportDetailedDrawView, _super), ReportDetailedDrawView.prototype.template = "x/test-report-detailed-draw", 
ReportDetailedDrawView.prototype.className = "test-report-detailed-draw", ReportDetailedDrawView.prototype.initialize = function(options) {
return this.question = options.question;
}, ReportDetailedDrawView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
question:this.question
}), $(this.el).html(content), this;
}, ReportDetailedDrawView;
}(window.HR.GenericView), ReportDetailedCorrectErrorsView = function(_super) {
function ReportDetailedCorrectErrorsView() {
return ReportDetailedCorrectErrorsView.__super__.constructor.apply(this, arguments);
}
return __extends(ReportDetailedCorrectErrorsView, _super), ReportDetailedCorrectErrorsView.prototype.template = "x/test-report-detailed-correct-errors", 
ReportDetailedCorrectErrorsView.prototype.className = "test-report-detailed-correct-errors", 
ReportDetailedCorrectErrorsView.prototype.initialize = function(options) {
return this.question = options.question;
}, ReportDetailedCorrectErrorsView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
question:this.question
}), $(this.el).html(content), this;
}, ReportDetailedCorrectErrorsView;
}(window.HR.GenericView), ReportDetailedRewriteCompleteView = function(_super) {
function ReportDetailedRewriteCompleteView() {
return ReportDetailedRewriteCompleteView.__super__.constructor.apply(this, arguments);
}
return __extends(ReportDetailedRewriteCompleteView, _super), ReportDetailedRewriteCompleteView.prototype.template = "x/test-report-detailed-rewrite-complete", 
ReportDetailedRewriteCompleteView.prototype.className = "test-report-detailed-rewrite-complete", 
ReportDetailedRewriteCompleteView.prototype.initialize = function(options) {
return this.question = options.question;
}, ReportDetailedRewriteCompleteView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
question:this.question
}), $(this.el).html(content), this;
}, ReportDetailedRewriteCompleteView;
}(window.HR.GenericView), ReportDetailedTextAnsView = function(_super) {
function ReportDetailedTextAnsView() {
return ReportDetailedTextAnsView.__super__.constructor.apply(this, arguments);
}
return __extends(ReportDetailedTextAnsView, _super), ReportDetailedTextAnsView.prototype.template = "x/test-report-detailed-subjective", 
ReportDetailedTextAnsView.prototype.className = "test-report-detailed-subjective", 
ReportDetailedTextAnsView.prototype.initialize = function(options) {
return this.question = options.question;
}, ReportDetailedTextAnsView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
question:this.question
}), $(this.el).html(content), this;
}, ReportDetailedTextAnsView;
}(window.HR.GenericView), ReportDetailedCodeUploadView = function(_super) {
function ReportDetailedCodeUploadView() {
return ReportDetailedCodeUploadView.__super__.constructor.apply(this, arguments);
}
return __extends(ReportDetailedCodeUploadView, _super), ReportDetailedCodeUploadView.prototype.template = "x/test-report-detailed-code-upload", 
ReportDetailedCodeUploadView.prototype.className = "test-report-detailed-code-upload", 
ReportDetailedCodeUploadView.prototype.initialize = function(options) {
return this.question = options.question;
}, ReportDetailedCodeUploadView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
question:this.question
}), $(this.el).html(content), this;
}, ReportDetailedCodeUploadView;
}(window.HR.GenericView), ReportDetailedCodeView = function(_super) {
function ReportDetailedCodeView() {
return ReportDetailedCodeView.__super__.constructor.apply(this, arguments);
}
return __extends(ReportDetailedCodeView, _super), ReportDetailedCodeView.prototype.template = "x/test-report-detailed-coding", 
ReportDetailedCodeView.prototype.className = "test-report-detailed-code", ReportDetailedCodeView.prototype.initialize = function(options) {
var p, plagiarismList, sid;
return this.question = options.question, this.test = options.test, this.tab = options.tab, 
p = this.model.get("plagiarism"), this.plagiarism = p && p.plagiarism.questions && p.plagiarism.questions[this.question.id], 
sid = null, plagiarismList = {}, this.plagiarism ? (_.map(p.plagiarism.questions[this.question.id], function(val, psid) {
return sid = psid, _.map(val.occurances, function(o, sid) {
return plagiarismList[sid] = o;
});
}), this.plagiarismList = plagiarismList, this.sid = sid) :(this.plagiarismList = {}, 
this.sid = null);
}, ReportDetailedCodeView.prototype.events = function() {
return {
"click .code-player":"togglePlayer",
"slide .slider":"playcode",
"click #toggle_output":"toggleOutput",
"click .js-review":"showDiff",
"click .js-showoutputs":"showOutputs",
"click .js-fs-open":"openFullScreen",
"click .js-fs-close":"closeFullScreen"
};
}, ReportDetailedCodeView.prototype.openFullScreen = function(e) {
return e && e.preventDefault(), e && e.stopPropagation(), this.$(".js-fs-open").hide(), 
this.$(".js-fs-close").show(), setTimeout(function(_this) {
return function() {
return _this.$(".fs-toggle").addClass("open");
};
}(this), 200), this.fullScreenOpened = !0;
}, ReportDetailedCodeView.prototype.closeFullScreen = function(e) {
return e && e.preventDefault(), e && e.stopPropagation(), this.$(".js-fs-open").show(), 
this.$(".js-fs-close").hide(), setTimeout(function(_this) {
return function() {
return _this.$(".fs-toggle").removeClass("open");
};
}(this), 200), this.fullScreenOpened = !1;
}, ReportDetailedCodeView.prototype._render = function() {
var content, that;
return content = HR.appController.template(this.template, this)({
question:this.question,
sid:this.sid,
plagiarism:this.plagiarismList,
test:this.test.toJSON(),
anysubmissions:this.question.submissions && this.question.submissions.length > 0
}), $(this.el).html(content), this.question.submissions && ("undefined" == typeof CodeMirror ? HR.appController.loadCodeMirror(function(_this) {
return function() {
return _this.viewCode(_this.question.submissions, _this.question.my_lang, _this.question.submissions.length - 1);
};
}(this)) :this.viewCode(this.question.submissions, this.question.my_lang, this.question.submissions.length - 1)), 
this.$(".slider").slider({
min:1,
max:this.question.submissions.length,
value:this.question.submissions.length
}), that = this, setTimeout(function() {
var btn_el, client, e;
return btn_el = ".js-btn-copy-" + that.question.id, e = $(btn_el), that.question.submissions && that.question.submissions.length > 0 && (e.attr("data-clipboard-text", that.question.submissions[that.question.submissions.length - 1].answer), 
e.length && (e.popover({
content:"Code has been copied",
trigger:"none",
placement:"top"
}), client = new ZeroClipboard(e, {
container:$("div.right_cont div.rt_content_wrap").get(0)
}), client.on("complete", function() {
var elem;
return $(this).popover("show"), elem = $(this), setTimeout(function() {
return elem.popover("hide");
}, 2e3);
}))), "pdf" === that.tab && that.question.outputs && that.$(".js-showoutputs") ? that.$(".js-showoutputs").trigger("click") :void 0;
}), this;
}, ReportDetailedCodeView.prototype.showDiff = function(e) {
var diff_view, el, left, opcodes, pos, right, sim, sm, solves;
return e.preventDefault(), el = this.$(e.currentTarget), sim = el.attr("data-similarity"), 
pos = sim > 90 ? "high" :sim > 80 ? "medium" :"low", this.$(".js-possibility").html(pos), 
this.$(".js-similarity").html(parseFloat(sim).toFixed(2)), solves = this.model.get("plagiarism").solves, 
left = difflib.stringAsLines(solves[el.attr("data-current")].answer.code), right = difflib.stringAsLines(solves[el.attr("data-review")].answer.code), 
sm = new difflib.SequenceMatcher(left, right), opcodes = sm.get_opcodes(), diff_view = diffview.buildView({
baseTextLines:left,
newTextLines:right,
opcodes:opcodes,
baseTextName:"Current Solution",
newTextName:"Solution by " + el.attr("data-email"),
viewType:0
}), this.$(".js-code-diff").html(diff_view), this.$(".js-plagiarism-modal").modal();
}, ReportDetailedCodeView.prototype.showOutputs = function(e) {
var diff_view, i, left, opcodes, outobj, right, sm, tname, _i, _len, _ref, _results;
for (e.preventDefault(), this.$(e.currentTarget).addClass("hide"), this.$(".js-output").empty(), 
_ref = this.question.outputs, _results = [], i = _i = 0, _len = _ref.length; _len > _i; i = ++_i) outobj = _ref[i], 
tname = this.question.submission_testcases[i].name || "Testcase " + i, this.$(".js-output").append("<p class='mdL'><strong>" + tname + "</strong></p>"), 
outobj.too_large ? _results.push(this.$(".js-output").append("<p class='mdL'><em>Too large to include here.</em></p>")) :(left = difflib.stringAsLines(outobj.expected), 
right = difflib.stringAsLines(outobj.actual), sm = new difflib.SequenceMatcher(left, right), 
opcodes = sm.get_opcodes(), diff_view = diffview.buildView({
baseTextLines:left,
newTextLines:right,
opcodes:opcodes,
baseTextName:"Expected output",
newTextName:"Candidate output",
viewType:0
}), _results.push(this.$(".js-output").append(diff_view)));
return _results;
}, ReportDetailedCodeView.prototype.togglePlayer = function(e) {
return e.preventDefault(), 430 !== this.$("#code-player").width() ? (this.$(".code_play_slide_wrap").hide(), 
this.$("#code-player").animate({
width:"430px"
}).parent().css("z-index", 100), this.$(".playcode_txt").html(this.codeTime), setTimeout(function(_this) {
return function() {
return _this.$(".code_play_slide_wrap").fadeIn();
};
}(this), 300)) :(this.$(".code_play_slide_wrap").hide(), this.$(".playcode_txt").html("PLAY CODE"), 
this.$("#code-player").animate({
width:"140px"
}).parent().css("z-index", 1));
}, ReportDetailedCodeView.prototype.toggleOutput = function(e) {
var t;
return e.preventDefault(), t = this.$(".code-output"), t.hasClass("hidden") ? (t.removeClass("hidden"), 
this.$(e.currentTarget).html("[-] Click here to hide the output")) :(t.addClass("hidden"), 
this.$(e.currentTarget).html("[+] Click here to see the output"));
}, ReportDetailedCodeView.prototype.playcode = function(e, ui) {
var ans, btn_el;
return ans = this.question.submissions[parseInt(ui.value, 10) - 1].answer, this.$(".outbox").html(_.escape(ans)), 
"undefined" == typeof CodeMirror ? HR.appController.loadCodeMirrorMode(this.question.my_lang, function(_this) {
return function() {
return _this.viewCode(_this.question.submissions, _this.question.my_lang, parseInt(ui.value, 10) - 1);
};
}(this)) :this.viewCode(this.question.submissions, this.question.my_lang, parseInt(ui.value, 10) - 1), 
430 === this.$("#code-player").width() && this.$(".playcode_txt").html(this.codeTime), 
btn_el = ".js-btn-copy-" + this.question.id, e = $(btn_el), e.attr("data-clipboard-text", ans);
}, ReportDetailedCodeView.prototype.viewCode = function(submissions, lang, i) {
var ix, l, language, submission, that;
if (submissions) {
if (that = this, submission = submissions[i], ix = i, !submission) return;
return this.codeTime = "At " + submission.timespan, l = "code" === submission.lang || "" === submission.lang ? lang || "code" :submission.lang, 
language = lang_mime_mapping[l], this.$(".langused").html(l.toUpperCase()), HR.appController.loadCodeMirrorMode(l, function(_this) {
return function() {
var col, currentCodeLine, currentLineNumber, lineNumber, node, tabSize;
return node = _this.$("pre.outbox-temp"), node.empty(), $(node).append('<table><tr><td class="line-no" width="5%"></td><td class="code"></td></tr></table>'), 
currentCodeLine = $("<div></div>"), currentLineNumber = $("<div>1</div>"), $(node).find(".code").append(currentCodeLine), 
$(node).find(".line-no").append(currentLineNumber), col = 0, tabSize = CodeMirror.defaults.tabSize || 4, 
lineNumber = 2, CodeMirror.runMode(submission.answer, language, function(text, style) {
var content, idx, pos, size, sp;
if ("\n" === text) return currentLineNumber.height(currentCodeLine.height()), currentCodeLine = $("<div></div>"), 
currentLineNumber = $("<div>" + lineNumber + "</div>"), lineNumber++, $(node).find(".code").append(currentCodeLine), 
$(node).find(".line-no").append(currentLineNumber), col = 0, void 0;
for (content = "", pos = 0; ;) {
if (idx = text.indexOf("	", pos), -1 === idx) {
content += text.slice(pos), col += text.length - pos;
break;
}
for (col += idx - pos, content += text.slice(pos, idx), size = tabSize - col % tabSize, 
col += size, i = 0; size > i; ) content += " ", ++i;
pos = idx + 1;
}
return style ? (sp = $("<span></span>"), sp.addClass("cm-" + style.replace(RegExp(" +", "g"), " cm-")), 
sp.append(document.createTextNode(content)), currentCodeLine.append(sp)) :currentCodeLine.append(document.createTextNode(content));
}), _this.$("pre.outbox").html(_this.$("pre.outbox-temp").html());
};
}(this));
}
}, ReportDetailedCodeView;
}(window.HR.GenericView), ReportDetailedDesignView = function(_super) {
function ReportDetailedDesignView() {
return this.toggleAlert = __bind(this.toggleAlert, this), this.renderIframe = __bind(this.renderIframe, this), 
this.showLoading = __bind(this.showLoading, this), this.hideLoading = __bind(this.hideLoading, this), 
ReportDetailedDesignView.__super__.constructor.apply(this, arguments);
}
return __extends(ReportDetailedDesignView, _super), ReportDetailedDesignView.prototype.template = "x/test-report-detailed-design", 
ReportDetailedDesignView.prototype.className = "test-report-detailed-design", ReportDetailedDesignView.prototype.initialize = function(options) {
var that;
return this.question = options.question, this.testmodel = options.testmodel, this.tab = options.tab, 
this.suburl = null, this.lastView = "html", this.showAlert = !1, this.currentAnswer = {}, 
that = this, this.mime_lang_mapping = {}, "true" === this.question.multiple_files ? _.each(lang_mime_mapping, function(i, v) {
return that.mime_lang_mapping[i] = v;
}) :void 0;
}, ReportDetailedDesignView.prototype.events = function() {
return {
"click .code-player":"togglePlayer",
"slide .slider":"playcode",
"click ul.nav-tabs li a":"updateLastView"
};
}, ReportDetailedDesignView.prototype.updateLastView = function(e) {
return this.lastView = this.$(e.currentTarget).data("lang");
}, ReportDetailedDesignView.prototype.hideLoading = function() {
return this.$(".js-rendered-data-loading").addClass("hidden"), this.$(".js-rendered-data").removeClass("hidden");
}, ReportDetailedDesignView.prototype.showLoading = function() {
return this.$(".js-rendered-data-loading").removeClass("hidden"), this.$(".js-rendered-data").addClass("hidden");
}, ReportDetailedDesignView.prototype.renderIframe = function() {
return this.$(".rendered-output-title").removeClass("hidden"), this.showLoading(), 
this.$(".js-rendered-data").ready(this.hideLoading), this.$(".js-rendered-data").attr("src", "" + window.location.protocol + "//design." + window.location.host + this.suburl + "/?showAlert=" + this.showAlert);
}, ReportDetailedDesignView.prototype.toggleAlert = function() {
return this.showAlert = !this.showAlert;
}, ReportDetailedDesignView.prototype._render = function() {
var content, total_submissions;
return total_submissions = this.question.submissions.length, content = HR.appController.template(this.template, this)({
question:this.question,
tab:this.tab,
anysubmissions:this.question.submissions && total_submissions > 0
}), $(this.el).html(content), setTimeout(function(_this) {
return function() {
return $(".js-btn-render-" + _this.question.id).off("click", _this.renderIframe).click(_this.renderIframe), 
$("[for=js-render-" + _this.question.id + "-alert]").off("click", _this.toggleAlert).on("click", _this.toggleAlert);
};
}(this), 2e3), this.question.submissions && ("undefined" == typeof CodeMirror ? HR.appController.loadCodeMirror(function(_this) {
return function() {
return _this.viewCode(_this.question.submissions, total_submissions - 1);
};
}(this)) :this.viewCode(this.question.submissions, total_submissions - 1)), this.$(".slider").slider({
min:1,
max:total_submissions,
value:total_submissions
}), this;
}, ReportDetailedDesignView.prototype.togglePlayer = function(e) {
return e.preventDefault(), 430 !== this.$("#code-player").width() ? (this.$(".code_play_slide_wrap").hide(), 
this.$("#code-player").animate({
width:"430px"
}).parent().css("z-index", 100), this.$(".playcode_txt").html(this.codeTime), setTimeout(function(_this) {
return function() {
return _this.$(".code_play_slide_wrap").fadeIn();
};
}(this), 300)) :(this.$(".code_play_slide_wrap").hide(), this.$(".playcode_txt").html("PLAY CODE"), 
this.$("#code-player").animate({
width:"140px"
}).parent().css("z-index", 1));
}, ReportDetailedDesignView.prototype.playcode = function(e, ui) {
var ans;
return ans = this.question.submissions[parseInt(ui.value, 10) - 1].answer, "string" == typeof ans && (ans = this.question.submissions[parseInt(ui.value, 10) - 1].answer = $.parseJSON(this.question.submissions[parseInt(ui.value, 10) - 1].answer)), 
this.$(".outbox").html(_.escape(ans)), "undefined" == typeof CodeMirror ? HR.appController.loadCodeMirrorMode(this.question.my_lang, function(_this) {
return function() {
return _this.viewCode(_this.question.submissions, parseInt(ui.value, 10) - 1);
};
}(this)) :this.viewCode(this.question.submissions, parseInt(ui.value, 10) - 1), 
430 === this.$("#code-player").width() ? this.$(".playcode_txt").html(this.codeTime) :void 0;
}, ReportDetailedDesignView.prototype.loadAnswer = function(answer, node) {
var l, language;
return l = answer.language, language = lang_mime_mapping[l], HR.appController.loadCodeMirrorMode(l, function() {
return function() {
var col, currentCodeLine, currentLineNumber, lineNumber, tabSize;
return node.empty(), $(node).append('<table><tr><td class="line-no" width="5%"></td><td class="code"></td></tr></table>'), 
currentCodeLine = $("<div></div>"), currentLineNumber = $("<div>1</div>"), $(node).find(".code").append(currentCodeLine), 
$(node).find(".line-no").append(currentLineNumber), col = 0, tabSize = CodeMirror.defaults.tabSize || 4, 
lineNumber = 2, CodeMirror.runMode(answer.code, language, function(text, style) {
var content, i, idx, pos, size, sp;
if ("\n" === text) return currentLineNumber.height(currentCodeLine.height()), currentCodeLine = $("<div></div>"), 
currentLineNumber = $("<div>" + lineNumber + "</div>"), lineNumber++, $(node).find(".code").append(currentCodeLine), 
$(node).find(".line-no").append(currentLineNumber), col = 0, void 0;
for (content = "", pos = 0; ;) {
if (idx = text.indexOf("	", pos), -1 === idx) {
content += text.slice(pos), col += text.length - pos;
break;
}
for (col += idx - pos, content += text.slice(pos, idx), size = tabSize - col % tabSize, 
col += size, i = 0; size > i; ) content += " ", ++i;
pos = idx + 1;
}
return style ? (sp = $("<span></span>"), sp.addClass("cm-" + style.replace(RegExp(" +", "g"), " cm-")), 
sp.append(document.createTextNode(content)), currentCodeLine.append(sp)) :currentCodeLine.append(document.createTextNode(content));
});
};
}(this));
}, ReportDetailedDesignView.prototype.viewOldStructure = function(submission) {
var code_content, code_tab, that;
return this.$(".js-design-code"), code_tab = this.$(".js-code-tab").empty(), code_content = "pdf" !== this.tab ? this.$(".js-code-content").empty() :this.$(".js-code-pdf").empty(), 
that = this, "string" == typeof submission.answer && (submission.answer = $.parseJSON(submission.answer)), 
_.each(submission.answer, function(ans) {
var active, hideChange, l, node, node_html, tpl_id;
return tpl_id = "sub-" + submission.id + "-" + ans.language, l = lang_display_mapping[ans.language], 
active = "", hideChange = "", "pdf" !== that.tab ? (that.currentAnswer[ans.language] === ans.code && (hideChange = "hidden"), 
that.lastView === ans.language && (active = "active"), that.currentAnswer[ans.language] = ans.code, 
code_tab.append("<li class='" + active + "'><a href='#" + tpl_id + "' data-lang='" + ans.language + "' data-toggle='tab'><i class='tab-notification icon--single icon-circle txt-green " + hideChange + "'></i>" + l + "</a></li>"), 
node_html = "<div class='tab-pane " + active + "' id='" + tpl_id + '\'><pre class="outbox cm-s-default no-padding" style="border-top:1px solid #e6e6e6;border-bottom:1px solid #e6e6e6;">\n  Fetching Code...\n</pre>\n</div>') :node_html = '<ul class="nav nav-tabs ungroup"><li class="active"><a href=\'#' + tpl_id + "' data-lang='" + ans.language + "' data-toggle='tab'>" + l + "</a></li></ul>\n<div class=\"tab-content\">\n<div class='tab-pane active' id='" + tpl_id + '\'>\n  <pre class="outbox cm-s-default no-padding" style="border-top:1px solid #e6e6e6;border-bottom:1px solid #e6e6e6;">\n    Fetching Code...\n  </pre>\n</div>\n</div>', 
node = $(node_html), code_content.append(node), setTimeout(function() {
return that.loadAnswer(ans, node.find("pre.outbox"), 0);
});
}), code_tab.find('a[data-toggle="tab"]').on("shown.bs.tab", function(_this) {
return function(e) {
return _this.$(e.target).find("i").addClass("hidden");
};
}(this));
}, ReportDetailedDesignView.prototype.viewFileTree = function() {
var that;
return that = this, this.$(".js-file-tree").jstree({
core:{
data:this.question.file_tree,
multiple:!1
},
types:{
file:{
icon:"jstree-file"
}
},
plugins:[ "wholerow", "types" ]
}).on("activate_node.jstree", function(e, treeObj) {
return e.preventDefault(), treeObj.node.children.length > 0 ? void 0 :$.ajax({
url:"" + that.model.url() + "/files",
type:"POST",
data:{
node:that.$(".js-file-tree").jstree("get_path", treeObj.node).join("/"),
question:that.question.id
},
success:function(data) {
return data.fileContents.language = that.mime_lang_mapping[data.fileContents.mime_type], 
that.loadAnswer(data.fileContents, that.$("#editor-with-tree .cm-s-default"), !0);
},
error:function() {
return that.loadAnswer({
code:"File not supported.",
language:"text"
}, that.$("#editor-with-tree .cm-s-default"), !0);
}
});
});
}, ReportDetailedDesignView.prototype.viewCode = function(submissions, i, renIframe) {
var sub_id, submission, that;
if (null == renIframe && (renIframe = !1), submissions) {
if (that = this, submission = submissions[i], !submission) return;
return sub_id = "undefined" == typeof submission.id ? "saved-" + this.question.id :submission.id, 
this.suburl = "" + this.model.url() + "/render/" + sub_id + "/" + this.testmodel.get("authkey"), 
renIframe && this.renderIframe(), this.codeTime = "At " + submission.timespan, "true" === this.question.multiple_files ? this.viewFileTree() :this.viewOldStructure(submission);
}
}, ReportDetailedDesignView;
}(window.HR.GenericView), ReportTimelineView = function(_super) {
function ReportTimelineView() {
return this.checkForIframeError = __bind(this.checkForIframeError, this), this.setIframeData = __bind(this.setIframeData, this), 
ReportTimelineView.__super__.constructor.apply(this, arguments);
}
return __extends(ReportTimelineView, _super), ReportTimelineView.prototype.template = "x/test-report-timeline", 
ReportTimelineView.prototype.className = "test-report-timeline", ReportTimelineView.prototype.events = function() {
return {
"click .showEvents":"showDetails"
};
}, ReportTimelineView.prototype.initialize = function(options) {
return this.model = options.model, this.testmodel = options.testmodel, this.timeline = this.model.get("timeline") ? this.model.get("timeline") :[], 
this.qarray = {}, this.lastqno = null, this.hasDisconnect = !1, this.offlineTime = 0, 
this.dt = null, this.timeline.length > 1 ? this.buildGoogleDatatable() :void 0;
}, ReportTimelineView.prototype.showDetails = function(e) {
return this.$(".js-full-details").removeClass("hide"), this.$(e.currentTarget).hide();
}, ReportTimelineView.prototype.getTimeline = function() {
return this.timeline = this.model.get("timeline") ? this.model.get("timeline") :[], 
this.timeline.length > 1 ? this.buildGoogleDatatable() :void 0;
}, ReportTimelineView.prototype._render = function() {
var content, tllen;
return this.getTimeline(), tllen = this.timeline.length, content = HR.appController.template(this.template, this)({
test:this.testmodel.toJSON(),
timeline:this.timeline,
tab:this.tab,
starttime:this.model.get("starttime"),
total_time_taken:this.model.get("total_time_taken"),
tllen:tllen,
hasDisconnect:this.hasDisconnect,
offlineTime:HR.util.prettyPrintSeconds(this.offlineTime),
model:this.model.toJSON()
}), $(this.el).html(content), tllen > 1 && setTimeout(this.setIframeData, 500), 
this;
}, ReportTimelineView.prototype.setIframeData = function() {
return 0 !== this.$("#tl-frame").length && this.$("#tl-frame")[0].contentWindow && "notset" === this.$("#tl-frame")[0].contentWindow.s ? (this.$("#tl-frame").height(this.height + 30), 
this.$("#tl-frame")[0].contentWindow.opts = this.dtopts, this.$("#tl-frame")[0].contentWindow.s = this.dt, 
setTimeout(this.checkForIframeError, 1e3), this.$("ul.tnc").removeClass("hide"), 
this.hasDisconnect ? this.$("li.new-tl").removeClass("hide") :this.trackingListing ? void 0 :this.$("li.old-tl").removeClass("hide")) :setTimeout(this.setIframeData, 500);
}, ReportTimelineView.prototype.checkForIframeError = function() {
return 2 === this.$("#tl-frame")[0].contentWindow.errcount ? (this.$("#tl-frame").css("min-width", ""), 
this.$("#tl-frame")[0].contentWindow.drawChart()) :void 0;
}, ReportTimelineView.prototype.buildGoogleDatatable = function() {
var DISCONNECT_LABEL, LIST_LABEL, NO_PING_LABEL, PING_MAX_DIFF, colors, count, dataTable, dis_text, e, el, endrows, events, i, item, j, nextin, options, qno, qs, rows, trackingListing, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3;
if (this.timeline = this.model.get("timeline") ? this.model.get("timeline") :[], 
null === this.dt && 0 !== this.timeline.length) {
for (events = {
LOGIN:"1",
VIEW_LIST:"2",
QUES_VIEW:"3",
QUES_SUBMIT:"4",
QUES_COMPILE:"5",
PING:"6"
}, this.timetaken = {}, LIST_LABEL = "Question list", DISCONNECT_LABEL = "Offline", 
NO_PING_LABEL = "No ping", PING_MAX_DIFF = 70, trackingListing = this.timeline.length > 2 && (this.timeline[0].id === events.VIEW_LIST || this.timeline[1].id === events.VIEW_LIST) ? !0 :!1, 
el = this.timeline.length, _ref = this.timeline, i = _i = 0, _len = _ref.length; _len > _i; i = ++_i) e = _ref[i], 
nextin = i === el - 1 ? 0 :this.timeline[i + 1].inserttime - e.inserttime, e.id === events.VIEW_LIST || e.id === events.LOGIN ? this.streamevent(LIST_LABEL, e.inserttime) :e.qno && this.streamevent(e.qno, e.inserttime), 
null !== nextin && nextin > PING_MAX_DIFF && trackingListing && this.streamevent(DISCONNECT_LABEL, e.inserttime + 10);
if (this.streamevent("finish", e.inserttime + 10), dataTable = new google.visualization.DataTable(), 
dataTable.addColumn({
type:"string",
id:"Question"
}), dataTable.addColumn({
type:"string",
id:"Name"
}), dataTable.addColumn({
type:"date",
id:"Start"
}), dataTable.addColumn({
type:"date",
id:"End"
}), dis_text = trackingListing ? "No ping received in this time (maybe due to network disconnection)." :"No other events tracked in this timeslot.", 
count = _.keys(this.qarray).length + 1, rows = [], endrows = [], _.has(this.qarray, DISCONNECT_LABEL)) {
for (_ref1 = this.qarray[DISCONNECT_LABEL], _j = 0, _len1 = _ref1.length; _len1 > _j; _j++) item = _ref1[_j], 
endrows.push([ "Offline", dis_text, new Date(1e3 * item[0]), new Date(1e3 * item[1]) ]), 
this.offlineTime += item[1] - item[0];
delete this.qarray[DISCONNECT_LABEL];
}
if (_.has(this.qarray, LIST_LABEL)) {
for (_ref2 = this.qarray[LIST_LABEL], _k = 0, _len2 = _ref2.length; _len2 > _k; _k++) item = _ref2[_k], 
rows.push([ "Main listing", "Viewed question listing", new Date(1e3 * item[0]), new Date(1e3 * item[1]) ]);
delete this.qarray[LIST_LABEL];
}
for (qs = _.keys(this.qarray).sort(function(a, b) {
return a - b;
}), _l = 0, _len3 = qs.length; _len3 > _l; _l++) for (qno = qs[_l], _ref3 = this.qarray[qno], 
_m = 0, _len4 = _ref3.length; _len4 > _m; _m++) item = _ref3[_m], rows.push([ "Question " + qno, "q." + qno, new Date(1e3 * item[0]), new Date(1e3 * item[1]) ]);
return dataTable.addRows(rows), trackingListing ? dataTable.addRows(endrows) :count -= 1, 
options = {
width:700
}, this.height = 45 * (count + 1), trackingListing && 0 !== endrows.length ? (j = rows.length, 
colors = function() {
var _n, _results;
for (_results = [], i = _n = 1; j >= 1 ? j >= _n :_n >= j; i = j >= 1 ? ++_n :--_n) _results.push("#4dd486");
return _results;
}(), j = endrows.length, colors = colors.concat(function() {
var _n, _results;
for (_results = [], i = _n = 1; j >= 1 ? j >= _n :_n >= j; i = j >= 1 ? ++_n :--_n) _results.push("#f00");
return _results;
}()), options.colors = colors, this.hasDisconnect = !0) :(options.timeline = {
singleColor:"#4dd486"
}, this.hasDisconnect = !1), this.dt = dataTable.toJSON(), this.dtopts = options, 
this.trackingListing = trackingListing;
}
}, ReportTimelineView.prototype.streamevent = function(qno, time) {
var l;
return null === this.lastqno ? (_.has(this.qarray, qno) || (this.qarray[qno] = []), 
this.qarray[qno].push([ time, null ])) :"finish" === qno ? (l = this.qarray[this.lastqno].length - 1, 
this.qarray[this.lastqno][l][1] = time) :this.lastqno === qno ? (l = this.qarray[qno].length - 1, 
this.qarray[qno][l][1] = time) :(l = this.qarray[this.lastqno].length - 1, this.qarray[this.lastqno][l][1] = time, 
_.has(this.qarray, qno) || (this.qarray[qno] = []), this.qarray[qno].push([ time, null ])), 
this.lastqno = qno;
}, ReportTimelineView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestReportView = TestReportView, 
HR.ReportSummaryView = ReportSummaryView, HR.ReportDetailedView = ReportDetailedView, 
HR.ReportTimelineView = ReportTimelineView;
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
var HR, TestReportsDataTableView, TestReportsView, _ref;
return TestReportsView = function(_super) {
function TestReportsView() {
return TestReportsView.__super__.constructor.apply(this, arguments);
}
return __extends(TestReportsView, _super), TestReportsView.prototype.template = "x/test-reports", 
TestReportsView.prototype.className = "test-reports", TestReportsView.prototype.events = function() {
return {
"click .js-filterats":"atsFilter",
"keypress .js-search":"filterSummary",
"click .js-dateclear":"clearDate",
"click .js-emailclear":"clearEmail",
"click #qtype_check":"toggleQuestionType",
"click #qtags_check":"toggleQuestionTags",
"click .js-pdfdl":"pdfDownload",
"click .js-refresh":"refresh",
"click .js-csvdl":"excelDownload"
};
}, TestReportsView.prototype.initialize = function(options) {
return this._subviews = [], this.testmodel = options.testmodel, this.type = options.type, 
this.subtype = options.subtype, this.showTags = HR.UserSettings.get("showTags", !1), 
this.showQuesTypes = HR.UserSettings.get("showQuesTypes", !1), document.timestring || (document.timestring = {}), 
this.testmodel.get("id") in document.timestring ? void 0 :document.timestring[this.testmodel.get("id")] = moment().subtract("days", 6).format("YYYY-MM-DD") + " to " + moment().add("days", 1).format("YYYY-MM-DD");
}, TestReportsView.prototype._render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
test:this.testmodel.toJSON(),
throbber:HR.appController.viewLoader(),
hideElements:"in-progress" === this.type || "invited" === this.type,
showQuesTypes:this.showQuesTypes,
showTags:this.showTags
}), $(this.el).html(content), this.$(".js-daterange").val(document.timestring[this.testmodel.get("id")]), 
this.$(".js-daterange").daterangepicker({
latestDate:"today",
separator:" to ",
format:"YYYY-MM-DD",
ranges:{
"Last week":[ moment().add("days", -7), moment().format() ],
"Last 2 weeks":[ moment().add("days", -14), moment().format() ],
"Last 30 days":[ moment().add("days", -30), moment().format() ],
"This Month":[ moment().startOf("month"), moment().endOf("month") ],
"Last month":[ moment().subtract("month", 1).startOf("month"), moment().subtract("month", 1).endOf("month") ],
"Past year":[ moment().add("days", -365), moment().format() ]
}
}, function(_this) {
return function(start, end) {
return _this.$(".js-dateclear").removeClass("hide"), _this.datatable_view.daterange = [ start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD") ], 
document.timestring[_this.testmodel.get("id")] = start.format("YYYY-MM-DD") + " to " + end.format("YYYY-MM-DD"), 
_this.datatable_view.makeDT();
};
}(this)), null === document.timestring[this.testmodel.get("id")] && this.$(".js-dateclear").addClass("hide"), 
this.$(".js-emailclear").addClass("hide"), this.renderDataTable(), this.updateTitle(), 
this;
}, TestReportsView.prototype.refresh = function(e) {
return e.preventDefault(), this.render();
}, TestReportsView.prototype.toggleQuestionType = function() {
return this.showQuesTypes = this.$("#qtype_check").attr("checked") ? !0 :!1, HR.UserSettings.set("showQuesTypes", this.showQuesTypes), 
this.render();
}, TestReportsView.prototype.toggleQuestionTags = function() {
return this.showTags = this.$("#qtags_check").attr("checked") ? !0 :!1, HR.UserSettings.set("showTags", this.showTags), 
this.render();
}, TestReportsView.prototype.renderDataTable = function() {
return clearTimeout(HR.dttimeout), HR.dttimeout = setTimeout(function(_this) {
return function() {
return _this.datatable_view = new TestReportsDataTableView({
testmodel:_this.testmodel,
type:_this.type,
subtype:_this.subtype,
showTags:_this.showTags,
showQuesTypes:_this.showQuesTypes,
parent:_this
}), _this.$("#datatable_container").html(_this.datatable_view.render().el);
};
}(this), 500);
}, TestReportsView.prototype.clearDate = function(e) {
return this.$(".js-daterange").val(""), document.timestring[this.testmodel.get("id")] = null, 
this.$(e.currentTarget).addClass("hide"), this.datatable_view.daterange = null, 
this.datatable_view.makeDT();
}, TestReportsView.prototype.atsFilter = function(e) {
var el;
return e.preventDefault(), el = this.$(e.currentTarget), this.subtype = el.attr("data-attribute-ats"), 
this.datatable_view.ats = this.subtype, window.history && history.pushState && window.history.pushState(null, null, "/x/tests/" + this.testmodel.get("id") + "/candidates/completed/" + this.subtype), 
this.datatable_view.makeDT(), HR.appView.updateSidebarView(), this.updateTitle();
}, TestReportsView.prototype.clearEmail = function() {
var ev;
return this.$(".js-search").val(""), ev = $.Event("keypress"), ev.keyCode = 13, 
this.$(".js-search").trigger(ev);
}, TestReportsView.prototype.filterSummary = function(e) {
return 13 === e.keyCode ? (this.datatable_view.search = this.$(e.currentTarget).val(), 
this.datatable_view.makeDT(), "" === this.$(e.currentTarget).val() ? this.$(".js-emailclear").addClass("hide") :this.$(".js-emailclear").removeClass("hide")) :void 0;
}, TestReportsView.prototype.updateTitle = function() {
var txt;
return "completed" === this.type ? "" !== this.subtype ? (this.$(".js-dropdowntxt").html(window.istreet.cfg.ats[this.subtype]), 
txt = window.istreet.cfg.ats[this.subtype]) :txt = "Completed" :txt = "in-progress" === this.type ? "In progress" :null, 
txt ? this.$(".js-subtype").html("(" + txt + ")") :void 0;
}, TestReportsView.prototype.excelDownload = function() {
var checked, endtime, loc, starttime, _ref;
return checked = this.datatable_view.getCheckedIds(), 0 === checked.length && (this.datatable_view.daterange ? (starttime = moment(this.datatable_view.daterange[0], "YYYY-MM-DD").unix(), 
endtime = moment(this.datatable_view.daterange[1], "YYYY-MM-DD").unix()) :(starttime = moment("2000-01-01", "YYYY-MM-DD").unix(), 
endtime = moment("2020-01-01", "YYYY-MM-DD").unix())), loc = "localhost" === (_ref = window.location.hostname) || "localhost.com" === _ref || "127.0.0.1" === _ref ? window.location.hostname :"istreetapi.hackerrank.com", 
0 === checked.length ? window.open("http://" + loc + "/recruit2/report/downloadcsvreport/" + this.testmodel.get("id") + "/?authkey=" + this.testmodel.get("authkey") + "&starttime=" + starttime + "&endtime=" + endtime, "_blank") :window.open("http://" + loc + "/recruit2/report/downloadcsvreport/" + this.testmodel.get("id") + "/?authkey=" + this.testmodel.get("authkey") + "&attempt_id=" + checked.join(","), "_blank");
}, TestReportsView.prototype.pdfDownload = function() {
var all_ids, checked, ht, pdfmodal;
return checked = this.datatable_view.getCheckedIds(), 0 === checked.length && (all_ids = this.datatable_view.all_ids, 
1 === _.keys(all_ids).length && 1 === _.values(all_ids)[0].length && (checked = _.values(all_ids)[0])), 
1 === checked.length && (pdfmodal = new HR.TestReportsPDFView({
singleaid:checked[0],
testmodel:this.testmodel
})), checked.length > 1 && (pdfmodal = new HR.TestReportsPDFView({
batch:{
"Selected candidates":checked
},
testmodel:this.testmodel
})), 0 === checked.length && (pdfmodal = new HR.TestReportsPDFView({
batch:all_ids,
testmodel:this.testmodel
})), 1 !== checked.length && (ht = pdfmodal.render().el, this.$(".js-modalholder").html(ht)), 
pdfmodal.handleDownload();
}, TestReportsView;
}(window.HR.GenericView), TestReportsDataTableView = function(_super) {
function TestReportsDataTableView() {
return TestReportsDataTableView.__super__.constructor.apply(this, arguments);
}
return __extends(TestReportsDataTableView, _super), TestReportsDataTableView.prototype.template = "x/test-reports-datatable", 
TestReportsDataTableView.prototype.className = "test-reports-datatable", TestReportsDataTableView.prototype.events = function() {
return {
"click .js-addtime":"addTime",
"click #all_checkbox":"allCheckbox",
"click .candidate_checkbox":"candidateCheckboxAction",
"click .js-action":"atsAction",
"click .js-invaction":"invAction",
"click .js-setats":"atsAction",
"click .js-delete":"deleteAction"
};
}, TestReportsDataTableView.prototype.initialize = function(options) {
switch (this.testmodel = options.testmodel, this.parent = options.parent, this.type = options.type, 
this.subtype = options.subtype, this.search = "", this.daterange = this.testmodel.get("id") in document.timestring && null !== document.timestring[this.testmodel.get("id")] ? document.timestring[this.testmodel.get("id")].split(" to ") :null, 
this.state = -1, this.ats = -1, this.all_ids = null, this.showTags = options.showTags, 
this.showQuesTypes = options.showQuesTypes, this.type) {
case "all":
return this.state = -1;

case "invited":
return this.state = 0;

case "in-progress":
return this.state = 1;

case "completed":
if (this.state = 2, "" !== this.subtype) return this.ats = this.subtype;
}
}, TestReportsDataTableView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
invite_mode:"invited" === this.type,
test:this.testmodel.attributes,
showTags:this.showTags,
showQuesTypes:this.showQuesTypes,
hideElements:"in-progress" === this.type || "invited" === this.type
}), $(this.el).html(content), setTimeout(function(_this) {
return function() {
return _this.makeDT();
};
}(this), 100), this;
}, TestReportsDataTableView.prototype.allCheckbox = function() {
var checked;
return checked = this.$("#all_checkbox").attr("checked") ? !0 :!1, checked ? this.$(".candidate_checkbox").attr("checked", "") :this.$(".candidate_checkbox").removeAttr("checked", ""), 
this.candidateCheckboxAction();
}, TestReportsDataTableView.prototype.candidateCheckboxAction = function() {
return this.sel_ids = this.$("input.candidate_checkbox:checked").map(function() {
return $(this).attr("data-id");
}).get(), this.sel_ids.length > 0 && "in-progress" !== this.type ? (this.$(".js-acount").html(" " + this.sel_ids.length + " "), 
this.$(".js-reports-actions").show(200)) :this.$(".js-reports-actions").hide(200);
}, TestReportsDataTableView.prototype.getCheckedIds = function() {
return this.$("input.candidate_checkbox:checked").map(function() {
return parseInt($(this).attr("data-id"));
}).get();
}, TestReportsDataTableView.prototype.getCheckedEmails = function() {
return this.$("input.candidate_checkbox:checked").map(function() {
return $(this).attr("data-email");
}).get();
}, TestReportsDataTableView.prototype.deleteAction = function(e) {
var action, confirmDialog, plural, sel_ids;
return action = this.$(e.currentTarget).attr("data-action"), sel_ids = this.getCheckedIds(), 
"delete" === action ? (plural = sel_ids.length > 1 ? "s" :"", confirmDialog = new HR.util.confirmDialog({
message:"Are you sure you want to delete " + sel_ids.length + " report" + plural + "?",
confirmBtnText:"Yes",
callback:function(_this) {
return function() {
return _this.atsAction(e);
};
}(this)
})) :void 0;
}, TestReportsDataTableView.prototype.atsAction = function(e) {
var act, action, sel_ids;
return e.preventDefault(), action = this.$(e.currentTarget).attr("data-action"), 
sel_ids = this.getCheckedIds(), this.testmodel.setAction("set_attempts_ats"), act = "qualify" === action ? 2 :"fail" === action ? 3 :"delete" === action ? -1 :parseInt(this.$(e.currentTarget).attr("data-attribute-ats")), 
this.testmodel.save({
aids:sel_ids,
set_ats:act
}, {
success:function(_this) {
return function() {
return _this.testmodel.unsetAction(), _this.testmodel.fetch({
success:function() {
return HR.appView.updateSidebarView();
}
}), _this.parent.render();
};
}(this),
error:function(_this) {
return function(e) {
return console.log("success", e), _this.testmodel.unsetAction();
};
}(this)
});
}, TestReportsDataTableView.prototype.invAction = function(e) {
var action, ids;
return e.preventDefault(), action = this.$(e.currentTarget).attr("data-action"), 
"cancel" === action || "cancelmany" === action ? (ids = "cancel" === action ? [ parseInt(this.$(e.currentTarget).attr("data-id")) ] :this.getCheckedIds(), 
this.testmodel.setAction("cancel_invites"), this.testmodel.save({
tuids:ids
}, {
success:function(_this) {
return function() {
return _this.testmodel.unsetAction(), _this.makeDT(), _this.$("#all_checkbox").prop("checked", !1), 
HR.util.ajaxmsg("Successfully cancelled invites.", !1, !0, 2), _this.testmodel.fetch({
success:function() {
return HR.appView.updateSidebarView(), _this.$(".js-reports-actions").hide(200);
}
});
};
}(this),
error:function(_this) {
return function() {
return _this.testmodel.unsetAction();
};
}(this)
})) :(HR.emailqueue = "reinvitemany" === action ? this.getCheckedEmails() :[ this.$(e.currentTarget).attr("data-email") ], 
HR.router.navigate("/tests/" + this.testmodel.id + "/invite", !0));
}, TestReportsDataTableView.prototype.addTime = function(e) {
var aid, el, time;
return e.preventDefault(), el = this.$(e.currentTarget), aid = el.attr("aid"), time = this.$("input[aid=" + aid + "]").val(), 
isNaN(time) ? (alert("Invalid time. Enter number of minutes to add."), this.$("input[aid=" + aid + "]").val(""), 
void 0) :(time = parseInt(time), $.ajax({
type:"put",
url:"/x/api/v1/tests/" + this.testmodel.get("id") + "/attempts/" + aid,
data:{
action_type:"addtime",
time:time
},
success:function(_this) {
return function() {
return _this.makeDT();
};
}(this),
error:function() {
return console.log("There was an issue trying to add time.");
}
}));
}, TestReportsDataTableView.prototype.makeDT = function() {
var aaSorting, cols, dateparam, nosort, searchparam, tag, that, typ, _i, _j, _len, _len1, _ref, _ref1, _results, _results1;
if (that = this, this.columns = [ "index", "full_name", "email", "score", "endtime", "rating", "time_left", "link" ], 
this.showQuesTypes) for (_ref = this.testmodel.get("questions_types"), _i = 0, _len = _ref.length; _len > _i; _i++) typ = _ref[_i], 
this.columns.push("type_score_" + typ);
if (this.showTags) for (_ref1 = this.testmodel.get("questions_tags"), _j = 0, _len1 = _ref1.length; _len1 > _j; _j++) tag = _ref1[_j], 
this.columns.push("tag_score_" + tag);
return this.columns.push("invited_by"), cols = this.$("#reports-datatable").find("th").length, 
searchparam = "" !== this.search ? "&q=" + this.search :"", dateparam = this.daterange ? "&date_start=" + this.daterange[0] + "&date_end=" + this.daterange[1] :"", 
"invited" === this.type ? (nosort = _.difference(function() {
_results = [];
for (var _k = 0; cols >= 0 ? cols > _k :_k > cols; cols >= 0 ? _k++ :_k--) _results.push(_k);
return _results;
}.apply(this), [ 2, 4, 8 ]), aaSorting = [ [ 4, "desc" ] ]) :(nosort = _.difference(function() {
_results1 = [];
for (var _l = 0; cols >= 0 ? cols > _l :_l > cols; cols >= 0 ? _l++ :_l--) _results1.push(_l);
return _results1;
}.apply(this), [ 1, 2, 3, 8 ]), aaSorting = [ [ 3, "desc" ] ]), setTimeout(function(_this) {
return function() {
return HR.dt = _this.$("#reports-datatable").dataTable({
sDom:"<'row-fluid'<'span6'T><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
sPaginationType:"bootstrap",
iDisplayStart:0,
iDisplayLength:25,
bProcessing:!1,
bFilter:!1,
bServerSide:!0,
bDestroy:!0,
bAutoWidth:!1,
aaSorting:aaSorting,
oLanguage:{
sProcessing:"Loading data..",
sLoadingRecords:"Loading data.."
},
aoColumnDefs:[ {
sClass:"table-leftalign",
aTargets:[ 1, 2, 3, 4, 5 ]
}, {
bSortable:!1,
aTargets:nosort
} ],
sAjaxSource:"/x/api/v1/tests/" + _this.testmodel.get("id") + "/attempts?state=" + _this.state + "&ats=" + _this.ats + searchparam + dateparam,
fnServerData:function(sSource, aoData, fnCallback) {
return HR.util.ajaxmsg("Loading reports data..", !0), $.getJSON(sSource, aoData, function(json) {
return _.isFunction(that.afterRequest) && (json = that.afterRequest(json)), that.data = json, 
fnCallback(json), $(".tip").tooltip();
});
}
});
};
}(this));
}, TestReportsDataTableView.prototype.afterRequest = function(data) {
var result;
return HR.util.ajaxmsg("Done.", !1, !0, .5), result = {
aaData:[],
iTotalDisplayRecords:0,
iTotalRecords:0,
models:[]
}, this.all_ids = data.all_ids, _.isObject(data) && _.isArray(data.models) && (result.iTotalDisplayRecords = data.total_visible, 
result.iTotalRecords = data.total, result.aaData = _.map(data.models, function(_this) {
return function(row, ix) {
return row.plagiarism && row.plagiarism.length > 0 && (row.rating = "<i data-original-title='Possible plagiarism. Needs review' data-placement='bottom' class='tip icon2-generalsettings txt-yellow'></i>" + row.rating), 
_this.mapColumns(row, ix);
};
}(this))), result;
}, TestReportsDataTableView.prototype.mapColumns = function(row, index) {
var ret;
return ret = [], _.each(this.columns, function(_this) {
return function(column) {
var aid, str_addtime, tag, time_left, typ;
return "invited" === _this.type ? "index" === column ? (ret.push("<input id='candidate_" + index + "' data-id='" + row.id + "' data-email='" + row.email + "' name='candidate_" + index + "' type='checkbox' class='candidate_checkbox hr-sleek-input'> <label for='candidate_" + index + "'><span></span></label>"), 
void 0) :("email" === column ? ret.push(row.email) :"link" === column ? ret.push("<div class='btn-group'><a style='min-width:80px; padding:8px;' class='btn btn-mini mdL js-invaction' data-id='" + row.id + "' data-action='cancel'>Cancel invite</a><a style='min-width:80px; padding:8px;' class='btn btn-mini mdL js-invaction' data-action='reinvite' data-id='" + row.id + "' data-email='" + row.email + "'>Reinvite</a></div>") :"invited_by" === column ? ret.push(row.invited_by) :"endtime" === column ? ret.push(moment(row[column]).format("D MMM, YYYY - HH:mm")) :ret.push(""), 
void 0) :column.startsWith("type_score_") ? (typ = column.slice(11), row.question_types_score && row.question_types_score[typ] ? ret.push(row.question_types_score[typ]) :ret.push("-"), 
void 0) :column.startsWith("tag_score_") ? (tag = column.slice(10), row.tags_score && row.tags_score[tag] ? ret.push(row.tags_score[tag]) :ret.push("-"), 
void 0) :"invited_by" === column ? (ret.push(row.invited_by), void 0) :"endtime" === column ? (ret.push(moment(row[column]).format("D MMM, YYYY - HH:mm")), 
void 0) :"index" === column ? ret.push("<input id='candidate_" + index + "' data-id='" + row.id + "' name='candidate_" + index + "' type='checkbox' class='candidate_checkbox hr-sleek-input'> <label for='candidate_" + index + "'><span></span></label>") :"link" === column ? ret.push("<a style='min-width:100px; padding:8px;' class='js-backbone btn btn-line mdL' href=\"/tests/" + _this.testmodel.get("id") + "/candidates/" + row.id + '/report">View</a>') :"email" === column ? ret.push("<a class='js-backbone' href=\"tests/" + _this.testmodel.get("id") + "/candidates/" + row.id + '/report">' + row.email + "</a>") :"time_left" === column ? (aid = row.id, 
time_left = 0 === row[column] ? "None" :Math.ceil(row[column] / 60) + " min", row.added_time_buffer && "0" !== row.added_time_buffer && (time_left += "<span style='color:#979faf'> + " + row.added_time_buffer + "min :</span>"), 
str_addtime = _this.testmodel.get("time_slots") ? "" :"<input placeholder='(min)' class='span1 no-margin fnt-sz-mid' type='text' aid='" + aid + "' style='padding: 4px 7px 3px;' name='add_" + aid + "''><a style='position:relative; top:0px; padding: 7px 7px 6px 7px;' class='btn js-addtime' aid='" + aid + "'>Add</a>", 
ret.push("<div class='input-btn-group' style='min-width:160px;'>" + time_left + " " + str_addtime + "</div>")) :row[column] ? ret.push(row[column]) :ret.push("-");
};
}(this)), ret;
}, TestReportsDataTableView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestReportsView = TestReportsView;
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
var HR, TestSavedResponse, _ref;
return TestSavedResponse = function(_super) {
function TestSavedResponse() {
return TestSavedResponse.__super__.constructor.apply(this, arguments);
}
return __extends(TestSavedResponse, _super), TestSavedResponse.prototype.template = "x/test-saved-response", 
TestSavedResponse.prototype.className = "saved-responses", TestSavedResponse.prototype.initialize = function(options) {
return null == options && (options = {}), this.parent = options.parent, this.subviews = [];
}, TestSavedResponse.prototype.events = function() {
return {
"change #saved-messages":"changeMessage"
};
}, TestSavedResponse.prototype._render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
user:this.model.toJSON()
})), this;
}, TestSavedResponse.prototype.changeMessage = function(e) {
var action, message, name, selectedOption, value;
switch (value = $(e.currentTarget).val(), selectedOption = this.$("option:selected"), 
action = selectedOption.data("action"), name = selectedOption.html(), message = $("textarea[name=email-content]").ckeditorGet().getData(), 
message && (message = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")), 
action) {
case "create":
this.createMessage(message);
break;

case "update":
this.updateMessage(name, message);
break;

case "insert":
this.insertMessage(name, value);
break;

case "delete":
this.deleteMessage(name);
}
return $(e.currentTarget).val("");
}, TestSavedResponse.prototype.createMessage = function(message) {
var view;
return message ? (view = new HR.TestCreateSavedMessageDialogView({
parent:this,
message:message,
model:this.model
}), this.subviews.push(view), this.$("#test-saved-respose-modal-container").html(view.render().el)) :void 0;
}, TestSavedResponse.prototype.insertMessage = function(name, value) {
return $("#email_content").val(value), HR.util.ajaxmsg("Template '" + name + "' has been inserted", !1, !0, 2);
}, TestSavedResponse.prototype.updateMessage = function(name, message) {
var view;
return message ? (view = new HR.TestUpdateSavedMessageDialogView({
parent:this,
message:message,
model:this.model,
name:name
}), this.subviews.push(view), this.$("#test-saved-respose-modal-container").html(view.render().el)) :void 0;
}, TestSavedResponse.prototype.deleteMessage = function(name) {
var view;
return view = new HR.TestDeleteSavedMessageDialogView({
parent:this,
model:this.model,
name:name
}), this.subviews.push(view), this.$("#test-saved-respose-modal-container").html(view.render().el);
}, TestSavedResponse;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestSavedResponse = TestSavedResponse;
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
var HR, TestShareView, _ref;
return TestShareView = function(_super) {
function TestShareView() {
return TestShareView.__super__.constructor.apply(this, arguments);
}
return __extends(TestShareView, _super), TestShareView.prototype.initialize = function(options) {
var that;
return that = this, this.testmodel = options.testmodel, this.listenTo(this.model, "change", this.render), 
this;
}, TestShareView.prototype.template = "x/test-share", TestShareView.prototype.className = "test-share", 
TestShareView.prototype.permissionMappings = {
owner:"Owner",
ALLOW_ALL:"Has full access",
ALLOW_INVITE_CANDIDATES:"Can send invites only",
ALLOW_ADD_QUESTIONS:"Can edit tests only"
}, TestShareView.prototype.events = function() {
return {
"submit form[name=share-with-team-form]":"shareWithTeam",
"submit form[name=share-with-user-form]":"shareWithUser",
"click .js-remove-team":"removeTeam",
"click .js-remove-user":"removeUser",
"click .js-change-view":"changeView"
};
}, TestShareView.prototype.render = function() {
var content, show_teams, that, _model;
return that = this, _model = this.model.toJSON(), _model && (show_teams = HR.currentUser && HR.currentUser.get("company") && "user" === HR.currentUser.get("company").pricing_model, 
this.activeTab || (this.activeTab = show_teams ? "share-teams" :"share-users"), 
content = HR.appController.template(this.template, this)({
model:_model,
testmodel:this.testmodel.toJSON(),
throbber:HR.appController.viewLoader(),
permissionMappings:this.permissionMappings,
show_teams:show_teams,
active_tab:this.activeTab
}), $(this.el).html(content)), this;
}, TestShareView.prototype.shareWithUser = function(e) {
var email, permissions;
return e.preventDefault(), $(".js-share-error").addClass("hidden"), (permissions = this.$("input[name=share-permissions]:checked").val()) ? (email = this.$("input[name=user-email]").removeClass("error").val()) ? (HR.util.inlineLoadingStart($(e.currentTarget).find("button[type=submit]")), 
$.ajax({
url:"/x/api/v1/tests/" + this.testmodel.get("id") + "/share",
type:"POST",
dataType:"json",
data:{
type:"user",
email:email,
permissions:permissions
},
success:function(_this) {
return function() {
return _this.model.fetch();
};
}(this),
error:function() {
return function(jqXHR) {
var data;
return data = JSON.parse(jqXHR.responseText), HR.util.inlineLoadingEnd(data), "The user should have an account" === data.message ? (HR.currentUser && HR.currentUser.get("company") && "user" === HR.currentUser.get("company").pricing_model ? $(".js-share-error").html("The user should have an account. You can add users on the <a href='settings/team' target='_blank'>teams page</a>") :$(".js-share-error").html(data.message), 
$(".js-share-error").removeClass("hidden")) :data.message ? ($(".js-share-error").html(data.message), 
$(".js-share-error").removeClass("hidden")) :void 0;
};
}(this)
})) :(this.$("input[name=user-email]").addClass("error"), void 0) :void 0;
}, TestShareView.prototype.shareWithTeam = function(e) {
var team_id;
return e.preventDefault(), $(".js-share-error").addClass("hidden"), team_id = this.$("select[name=team]").val(), 
$.post("/x/api/v1/tests/" + this.testmodel.get("id") + "/share", {
type:"team",
team_id:team_id
}, function(_this) {
return function(data) {
return data.status === !0 ? _this.model.fetch() :void 0;
};
}(this));
}, TestShareView.prototype.removeUser = function(e) {
var user_id;
return e.preventDefault(), $(".js-share-error").addClass("hidden"), user_id = this.$(e.currentTarget).data("id"), 
$.ajax({
url:"/x/api/v1/tests/" + this.testmodel.get("id") + "/share",
type:"DELETE",
data:{
type:"user",
user_id:user_id
},
error:function() {
return function() {};
}(this),
success:function(_this) {
return function() {
return _this.model.fetch();
};
}(this)
});
}, TestShareView.prototype.removeTeam = function(e) {
var team_id;
return e.preventDefault(), $(".js-share-error").addClass("hidden"), team_id = this.$(e.currentTarget).data("id"), 
$.ajax({
url:"/x/api/v1/tests/" + this.testmodel.get("id") + "/share",
type:"DELETE",
data:{
type:"team",
team_id:team_id
},
error:function() {
return function() {};
}(this),
success:function(_this) {
return function() {
return _this.model.fetch();
};
}(this)
});
}, TestShareView.prototype.changeView = function(e) {
var active, view;
return e.preventDefault(), view = this.$(e.currentTarget).attr("data-view"), (active = this.$("#" + view).hasClass("active")) ? void 0 :(this.$(".js-change-view").removeClass("btn-primary"), 
this.$(e.currentTarget).addClass("btn-primary"), this.$(".js-share-views").removeClass("active").addClass("hidden"), 
this.$("#" + view).addClass("active").removeClass("hidden"), this.activeTab = view);
}, TestShareView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestShareView = TestShareView;
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
var HR, TestTimeSettingsView, _ref;
return TestTimeSettingsView = function(_super) {
function TestTimeSettingsView() {
return TestTimeSettingsView.__super__.constructor.apply(this, arguments);
}
return __extends(TestTimeSettingsView, _super), TestTimeSettingsView.prototype.initialize = function() {
var that;
return that = this;
}, TestTimeSettingsView.prototype.template = "x/test-time-settings", TestTimeSettingsView.prototype.className = "test-time-settings", 
TestTimeSettingsView.prototype.events = function() {
return {
"submit form[name=time-settings-form]":"saveTest",
"click #clear-time":"resetTime"
};
}, TestTimeSettingsView.prototype.render = function() {
var content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content), this.$("input#date-from, input#date-to").datepicker({
format:"yyyy/m/d",
autoclose:!0,
orientation:"bottom"
}), this.$("input.time").timepicker({
showDuration:!0,
timeFormat:"H:i",
scrollDefaultNow:!0
})), this;
}, TestTimeSettingsView.prototype.resetTime = function(e) {
return e.preventDefault(), this.$("input.date").attr("value", null).datepicker("update"), 
this.$("input.time").attr("value", null);
}, TestTimeSettingsView.prototype.saveTest = function(e) {
var attrs, end, enddate, endtime, start, startdate, starttime;
return e.preventDefault(), startdate = $("#date-from").val(), startdate && ("" === $.trim($(".time.start").val()) ? (starttime = "00:00", 
$(".time.start").val(starttime)) :starttime = $.trim($(".time.start").val()), starttime += ":00", 
start = startdate + " " + starttime), enddate = $("#date-to").val(), enddate && ("" === $.trim($(".time.end").val()) ? (endtime = "00:00", 
$(".time.end").val(endtime)) :endtime = $.trim($(".time.end").val()), endtime += ":00", 
end = enddate + " " + endtime), attrs = {
starttime:start,
endtime:end
}, this.model.save(attrs, {
silent:!0
});
}, TestTimeSettingsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestTimeSettingsView = TestTimeSettingsView;
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
var HR, TestTryQuestionView, _ref;
return TestTryQuestionView = function(_super) {
function TestTryQuestionView() {
return TestTryQuestionView.__super__.constructor.apply(this, arguments);
}
return __extends(TestTryQuestionView, _super), TestTryQuestionView.prototype.template = "x/test-tryquestion", 
TestTryQuestionView.prototype.className = "test-tryquestion", TestTryQuestionView.prototype.events = {
"click .js-ans-submit":"submitAnswer"
}, TestTryQuestionView.prototype.initialize = function(options) {
return this.test = options.test, this.qid = options.qid, HR.candidate = {};
}, TestTryQuestionView.prototype.render = function() {
var content;
return content = HR.appController.template(this.template, this)({
test:this.test.attributes
}), $(this.el).html(content), this.question = new HR.QuestionModel({
id:this.qid,
tid:this.test.get("id")
}), this.question.fetch({
success:function(_this) {
return function(model) {
return _this.question = model.attributes, _this.loadSubView();
};
}(this),
error:function(_this) {
return function() {
return _this.$(".js-questiontext").html("Unable to get question.");
};
}(this)
}), this;
}, TestTryQuestionView.prototype.loadSubView = function() {
var cnt, problem_statement, q, viewfound;
switch (viewfound = !0, this.question.type) {
case "code":
case "approx":
this.view = new HR.RecruitCandidateCodingView({
question:this.question,
test:this.test,
disableLocalStorage:!0
});
break;

case "design":
"true" === this.question.multiple_files ? (this.$(".js-tryview").html("<center>This question type is not available to try at this time.</center>"), 
this.$(".js-ans-submit").hide()) :(this.view = new HR.RecruitCandidateDesignView({
question:this.question,
test:this.test
}), this.$("#runstatus").remove(), this.$(".bb-compile").remove());
break;

case "mcq":
case "multiple_mcq":
this.view = new HR.RecruitCandidateMcqView({
question:this.question
});
break;

case "textAns":
this.view = new HR.RecruitCandidateSubjectiveView({
question:this.question
});
break;

case "file_upload":
this.view = new HR.RecruitCandidateFileUploadView({
question:this.question
});
break;

case "complete":
for (q = this.question.complete_string, cnt = 0, problem_statement = "<h4>Complete the blanks in the following question with the appropriate answer.</h4><br/>", 
problem_statement += _.isEmpty(this.question.question) ? "" :this.question.question; -1 !== q.search("{blank}"); ) q = q.replace("{blank}", "<input type='text' class='complete-question' name='blank" + cnt + "'/>"), 
cnt += 1;
problem_statement += q, this.view = new HR.RecruitCandidateCompleteView({
question:this.question
});
break;

default:
viewfound = !1;
}
return viewfound ? ("complete" === this.question.type ? this.$(".js-questiontext").html(problem_statement) :this.$(".js-questiontext").html(this.question.question), 
this.$(".js-tryview").html(this.view.render().el)) :(this.$(".js-tryview").html("<center>This question type is not available to try at this time.</center>"), 
this.$(".js-ans-submit").hide());
}, TestTryQuestionView.prototype.submitAnswer = function(e) {
var ans, answer, answers, correct, expected_ans, fillinblank, i, _i, _len, _ref;
if (e.preventDefault(), "mcq" === this.question.type) return answer = this.view.answer(), 
_.isObject(answer) && (answer = answer.answer), parseInt(answer) !== parseInt(this.question.answer) ? this.$(".js-trymsg").html("Incorrect. The correct answer is option " + this.question.answer) :this.$(".js-trymsg").html("Correct answer."), 
this.$(".js-tryalert").removeClass("hide");
if ("multiple_mcq" === this.question.type) return ans = _.map(this.view.answer(), function(i) {
return parseInt(i);
}), expected_ans = _.map(this.question.answer, function(i) {
return parseInt(i);
}), ans.length > 0 && 0 === _.difference(ans, expected_ans).length ? this.$(".js-trymsg").html("Correct answer.") :(correct = this.question.answer.join(", "), 
this.$(".js-trymsg").html("Incorrect. The correct options :[" + correct + "]")), 
this.$(".js-tryalert").removeClass("hide");
if ("textAns" === this.question.type || "file_upload" === this.question.type) return this.$(".js-trymsg").html("This answer is subjective, and evaluated later."), 
this.$(".js-tryalert").removeClass("hide");
if ("complete" === this.question.type) {
for (this.$(".js-trymsg").empty(), answers = this.view.answer(), expected_ans = JSON.parse(this.question.answer), 
i = _i = 0, _len = answers.length; _len > _i; i = ++_i) fillinblank = answers[i], 
__indexOf.call(expected_ans[i], fillinblank) >= 0 ? this.$(".js-trymsg").append("<p>Correct: <strong>" + fillinblank + "</strong>.</p>") :this.$(".js-trymsg").append("<p>Incorrect: <strong>" + fillinblank + "</strong>. Not in [" + expected_ans[i].join(", ") + "]</p>");
return this.$(".js-tryalert").removeClass("hide");
}
return "code" === (_ref = this.question.type) || "approx" === _ref ? this.submitCodeAnswer(this.view.answer()) :void 0;
}, TestTryQuestionView.prototype.submitCodeAnswer = function(data) {
return this.$(".js-tryalert").addClass("hide"), data.code ? this.$(".bb-compile").hasClass("disabled") ? void 0 :(this.$("#customtestcase") && this.$("#customtestcase").attr("checked") && (data.custominput = this.$("#custominput").val(), 
data.customtestcase = !0), this.$(".bb-compile").addClass("disabled"), HR.candidate.ctmodel = new HR.RecruitCompileTestModel(), 
HR.candidate.ctmodel.setTid(this.test.get("id")), HR.candidate.ctmodel.setQid(this.question.id), 
HR.candidate.ctview = new HR.RecruitCandidateCompileTestView(), this.$("#runstatus").html(HR.candidate.ctview.render().el), 
HR.util.scrollToBottom(1e3), HR.candidate.ctmodel.save(data, {
success:function(_this) {
return function() {
return HR.candidate.ctview.setStatus("Uploaded. Waiting for results.."), HR.candidate.ctloop = setTimeout(function() {
return _this.checkForResult(_this, data);
}, 2e3);
};
}(this),
error:function(_this) {
return function() {
return HR.candidate.ctmodel = null, HR.candidate.ctview.setStatus("Could not compile as server is unreachable."), 
_this.$(".bb-compile").removeClass("disabled");
};
}(this)
})) :(this.$(".js-trymsg").html("Please enter an answer."), this.$(".js-tryalert").removeClass("hide"), 
void 0);
}, TestTryQuestionView.prototype.checkForResult = function(that, data, liveStatus) {
return null == liveStatus && (liveStatus = null), HR.candidate.ctloop ? (HR.candidate.ctview.setStatus(liveStatus ? liveStatus :"Processing.."), 
HR.candidate.ctmodel.fetch({
success:function() {
return function(m) {
var expected_output, i, input, msg, output, output_debug, pass, st_class, _i, _len, _ref;
if (0 === m.get("status")) return liveStatus = m.get("status_string") ? m.get("status_string") :null, 
HR.candidate.ctloop = setTimeout(function() {
return that.checkForResult(that, data, liveStatus);
}, 2e3), void 0;
if (0 !== m.get("status")) {
if ($(".bb-compile").removeClass("disabled"), clearTimeout(HR.candidate.ctloop), 
HR.candidate.ctloop = null, m.get("result") > 0) return HR.candidate.ctview.setStatus("Error.", "red"), 
HR.candidate.ctview.setCompileStatus("Compilation failed.", m.get("compilemessage"));
if (pass = 0, m.get("customtestcase")) return HR.candidate.ctview.setStatus("Compiled successfully.", "orange"), 
input = m.get("stdin")[0], output = m.get("stdout")[0], output_debug = m.get("stdout_debug") ? m.get("stdout_debug")[0] :null, 
st_class = "green", HR.candidate.ctview.addTestCase(1, input, output, output_debug, null, "", st_class);
for (_ref = m.get("testcase_status"), i = _i = 0, _len = _ref.length; _len > _i; i = ++_i) input = _ref[i], 
output = m.get("stdout")[i], expected_output = m.get("expected_output")[i], output_debug = m.get("stdout_debug") ? m.get("stdout_debug")[i] :null, 
msg = m.get("testcase_message")[i], 1 === m.get("testcase_status")[i] ? (st_class = "green", 
pass++) :st_class = "red", HR.candidate.ctview.addTestCase(i + 1, input, output, output_debug, expected_output, msg, st_class);
return 0 === pass ? HR.candidate.ctview.setStatus("No test cases passed.", "red") :i > pass ? HR.candidate.ctview.setStatus("Compiled successfully. " + pass + "/" + i + " sample test cases passed.", "orange") :HR.candidate.ctview.setStatus("Compiled successfully. All sample test cases passed!", "green");
}
};
}(this),
error:function() {
return function() {
return $(".bb-compile").removeClass("disabled"), clearTimeout(HR.candidate.ctloop), 
HR.candidate.ctview.setStatus("Unable to fetch compile information from server."), 
HR.candidate.ctmodel = null, HR.candidate.ctview = null;
};
}(this)
})) :void 0;
}, TestTryQuestionView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestTryQuestionView = TestTryQuestionView;
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
var TestUpdateSavedMessageDialogView;
return TestUpdateSavedMessageDialogView = function(_super) {
function TestUpdateSavedMessageDialogView() {
return TestUpdateSavedMessageDialogView.__super__.constructor.apply(this, arguments);
}
return __extends(TestUpdateSavedMessageDialogView, _super), TestUpdateSavedMessageDialogView.prototype.template = "x/test-update-saved-message-dialog", 
TestUpdateSavedMessageDialogView.prototype.events = function() {
return {
"click a.cancel-dialog":this.closeDialog,
"click a.update-saved-message":this.updateSavedMessage
};
}, TestUpdateSavedMessageDialogView.prototype.initialize = function(options) {
return null == options && (options = {}), this.message = options.message, this.name = options.name, 
this.parent = options.parent;
}, TestUpdateSavedMessageDialogView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)), this.$("#test-update-saved-message-modal").modal(), 
this;
}, TestUpdateSavedMessageDialogView.prototype.updateSavedMessage = function(e) {
var attrs, saved_messages, that, _ref;
return e.preventDefault(), saved_messages = null != (_ref = this.model.get("saved_messages")) ? _ref :{}, 
saved_messages[this.name] = this.message, attrs = {
saved_messages:saved_messages
}, that = this, this.model.save(attrs, {
success:function() {
return setTimeout(function() {
return that.$(".close").click(), that.parent.render(), HR.util.inlineLoadingEnd({
message:"Template '" + that.name + "' has been updated"
});
});
}
});
}, TestUpdateSavedMessageDialogView.prototype.closeDialog = function(e) {
return e.preventDefault(), this.$(".close").click();
}, TestUpdateSavedMessageDialogView;
}(window.HR.GenericView), HR.TestUpdateSavedMessageDialogView = TestUpdateSavedMessageDialogView;
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
var HR, TestListItemView, TestsView, _ref;
return TestsView = function(_super) {
function TestsView() {
return TestsView.__super__.constructor.apply(this, arguments);
}
return __extends(TestsView, _super), TestsView.prototype.initialize = function(options) {
var that;
return that = this, this.filters = options.filters, this.page = options.page, this.advanced_search_open = options.advanced_search_open, 
this._subviews = [], this.listenTo(this.collection, "change", this.render), this.listenTo(this.collection, "sort", this.render);
}, TestsView.prototype.template = "x/tests", TestsView.prototype.className = "tests-list-view", 
TestsView.prototype.events = function() {
return {
"click .launch-wizard":"showWizardPopup",
"click .open-test":"openTest",
"click a#new-test-popup-link":"showCreateTestPopup",
"click a#wizard-modal-link":"showWizardPopup",
"click a#create-test":"showWizardPopup",
"click a#new-test-popup-cancel":"closeCreateTestPopup",
"submit form[name=new-test-form]":"createTest",
"click .create-test":"createTest",
"keydown #new-test-duration":"checkInput",
"submit form[name=search]":"searchTests",
"click .showAdvanceSearch":"showAdvanceSearch",
"click .hideAdvanceSearch":"hideAdvanceSearch",
"click .js-clear-title":"clearTestTitle",
"click a#csharp-test":"createWizardTest",
"click a#java-test":"createWizardTest",
"click a#cpp-test":"createWizardTest",
"click a#close-wizard-modal":"closeModal",
"click a#close-welcome-modal":"closeModal",
"click a#close-first-test-modal":"closeModal",
"click a#close-activation-modal":"closeModal"
};
}, TestsView.prototype.openTest = function(e) {
return e.preventDefault(), Backbone.history.navigate($("button[name=open-test]").attr("value"), !0);
}, TestsView.prototype.clearTestTitle = function(e) {
return e && e.preventDefault(), this.$("#test-search-input").val(""), this.searchTests();
}, TestsView.prototype.searchTests = function(e) {
return e && e.preventDefault(), this.test_name = this.$("#test-search-input").val(), 
"" === this.test_name ? HR.router.navigate("/tests", !0) :this.advacned_search.basicSearch(this.test_name);
}, TestsView.prototype.hideAdvanceSearch = function(e) {
return e && e.preventDefault(), $("#advanced-search").slideUp(), $(".hideAdvanceSearch").hide(), 
this.$("#basic-search").show(), this.$(".showAdvanceSearch").fadeIn(200), this.advanced_search_open = !1;
}, TestsView.prototype.showAdvanceSearch = function(e) {
return e && e.preventDefault(), $("#advanced-search").slideDown(), $("#basic-search").hide(), 
this.$(".showAdvanceSearch").hide(), setTimeout(function(_this) {
return function() {
return _this.$(".hideAdvanceSearch").fadeIn(200);
};
}(this), 200), this.$(".overflow-content").animate({
scrollTop:0
}), this.advanced_search_open = !0;
}, TestsView.prototype.paginationPath = function() {
return "" === this.filters.replace("?", "") ? "tests/page/" :this.advacned_search ? this.advacned_search.searchPath() + "&page=" :"/tests/search/" + this.filters + "&page=";
}, TestsView.prototype._render = function(first_test) {
var can_create_tests, content, that, _collection;
return null == first_test && (first_test = !1), that = this, _collection = this.collection.toJSON(), 
can_create_tests = HR.currentUser && HR.currentUser.get("permissions") && 0 === parseInt(HR.currentUser.get("permissions").tests_permission, 10) ? !1 :!0, 
_collection && (content = HR.appController.template(this.template, this)({
collection:_collection,
searchOn:"" !== this.filters.replace("?", ""),
throbber:HR.appController.viewLoader(),
advanced_search_open:this.advanced_search_open,
search_test_name:this.advacned_search ? this.advacned_search.getFilter("test-name") :"",
pagination:HR.util.pagination($("<div></div>"), this.collection.getTotal(), this.paginationPath(), this.collection.getPage(), null, 10, 5, "js-backbone", !0),
can_create_tests:can_create_tests
}), $(this.el).html(content)), 0 === _collection.length && this.$("#basic-search").addClass("hidden"), 
setTimeout(function() {
return $("body").click(function(e) {
return "new-test-popup-link" === e.target.id || "icon2-createtest" === e.target.className || "icon-down-open msL" === e.target.className || $(e.target).closest("#new-test-popup").length || that.closeCreateTestPopup(), 
"create-test" === e.target.id || "launch-wizard" === e.target.id || "wizard-modal-link" === e.target.id || "icon2-createtest" === e.target.className || $(e.target).closest(".wizard-modal").length ? void 0 :that.closeWizardPopup();
}), first_test ? this.$(".first-test-modal").removeClass("hidden") :void 0;
}), HR.currentUser.isLocked() && this.$(".account-locked").removeClass("hidden"), 
this.renderTests(), this.renderAdvancedSearch(), "" === this.$("#test-search-input").val() ? this.$(".js-clear-title").hide() :this.$(".js-clear-title").show(), 
1 === parseInt(HR.currentUser.get("sign_in_count"), 10) && 0 === parseInt(HR.currentUser.get("created_tests_count"), 10) && this.$(".welcome-modal").removeClass("hidden"), 
this;
}, TestsView.prototype.renderAdvancedSearch = function() {
return this.advacned_search ? this.advacned_search.setElement($(this.el).find("#advanced-search")).render() :(this.advacned_search || (this.advacned_search = new HR.TestAdvancedSearchView({
parent:this,
filters:this.filters,
page:this.page
})), this.advacned_search.setElement($(this.el).find("#advanced-search")).render()), 
this.$("#search-loading").hide(), "" !== this.advacned_search.filterString().replace("?", "") ? this.$("#tests-title").text("Tests matching search") :(this.$("#tests-title").text("All Tests"), 
this.$(".0-tests-message").text("")), this.advanced_search_open ? this.showAdvanceSearch() :this.hideAdvanceSearch();
}, TestsView.prototype.renderTests = function() {
return this.collection.models.length > 0 ? (this.$("#tests-container").empty(), 
_.each(this.collection.models, function(_this) {
return function(model) {
var test_list_item_view;
return test_list_item_view = new TestListItemView({
model:model,
parent:_this
}), _this._subviews.push(test_list_item_view), _this.$("#tests-container").append(test_list_item_view.render().el);
};
}(this))) :void 0;
}, TestsView.prototype.createTest = function(e) {
var attributes;
return e.preventDefault(), this.$(".response-message").removeClass("error").addClass("hidden"), 
attributes = {
name:this.$("#new-test-name").val(),
duration:this.$("#new-test-duration").val()
}, _.isEmpty(attributes.name) ? (this.$("#new-test-name").addClass("error"), this.$(".response-message").removeClass("hidden").addClass("error").html("Test Name Cannot be Empty"), 
!1) :this.collection.create(attributes, {
success:function(model) {
var track_data;
return this.$(".welcome-modal").addClass("hidden"), track_data = {
step:"Finish"
}, HR.util.track("Created test", track_data), HR.util.trackTotango("Created Test", "Tests"), 
Backbone.history.navigate("tests/" + model.id + "/questions", !0);
},
error:function() {
return this.$(".response-message").removeClass("hidden").addClass("error").html("Could not Save Test");
}
});
}, TestsView.prototype.checkInput = function(e) {
return $(e.currentTarget).removeClass("error"), $(".response-message").removeClass("error").addClass("hidden"), 
e.keyCode >= 65 && !(e.keyCode >= 96 && e.keyCode <= 105) || e.shiftKey ? ($(e.currentTarget).addClass("error"), 
$(".response-message").removeClass("hidden").addClass("error").html("Test Duration can only be a number"), 
!1) :void 0;
}, TestsView.prototype.showCreateTestPopup = function(e) {
var track_data;
return e.preventDefault(), track_data = {
step:"Start"
}, HR.util.track("Created test", track_data), this.$(".welcome-modal").addClass("hidden"), 
this.$(".first-test-modal").addClass("hidden"), this.$(".wizard-modal").addClass("hidden"), 
this.$("#new-test-popup").removeClass("hidden");
}, TestsView.prototype.showWizardPopup = function(e) {
var track_data;
return e.preventDefault(), track_data = {
step:"Start"
}, HR.util.track("Created test", track_data), this.$(".welcome-modal").addClass("hidden"), 
this.$(".first-test-modal").addClass("hidden"), this.$("#new-test-popup").addClass("hidden"), 
this.$(".wizard-modal").removeClass("hidden");
}, TestsView.prototype.closeCreateTestPopup = function(e) {
return e && e.preventDefault(), this.$("#new-test-name").val(""), this.$("#new-test-duration").val(""), 
this.$("#new-test-popup").addClass("hidden");
}, TestsView.prototype.closeWizardPopup = function(e) {
return e && e.preventDefault(), this.$(".wizard-modal").addClass("hidden");
}, TestsView.prototype.createWizardTest = function(e) {
var attributes, company_name;
return e.preventDefault(), HR.util.ajaxmsg("Creating Test...", !1, !0, 1e3), company_name = HR.currentUser.get("company").name, 
"java-test" === e.currentTarget.id ? attributes = {
name:company_name + " Java Test",
tid:24974
} :"csharp-test" === e.currentTarget.id ? attributes = {
name:company_name + " C# Test",
tid:28764
} :"cpp-test" === e.currentTarget.id && (attributes = {
name:company_name + " C++ Test",
tid:24975
}), this.collection.create(attributes, {
silent:!0,
success:function(_this) {
return function(model) {
var track_data;
return _this.$(".welcome-modal").addClass("hidden"), HR.util.ajaxmsg("Successfully created test...", !1, !0, 1e3), 
HR.currentUser.fetch({
success:function() {
return 1 === parseInt(HR.currentUser.get("created_tests_count"), 10) ? _this._render(!0) :(HR.util.ajaxmsg("Taking you to the test...", !1, !0, 1e3), 
Backbone.history.navigate("tests/" + model.id + "/questions", !0));
}
}), track_data = {
step:"Finish"
}, HR.util.track("Created test", track_data), HR.util.trackTotango("Created Test", "Tests");
};
}(this),
error:function() {
return this.$(".response-message").removeClass("hidden").addClass("error").html("Could not Save Test");
}
});
}, TestsView.prototype.closeModal = function(e) {
return e.preventDefault(), this.$(".sub-guide-1").addClass("hidden");
}, TestsView;
}(window.HR.GenericView), TestListItemView = function(_super) {
function TestListItemView() {
return TestListItemView.__super__.constructor.apply(this, arguments);
}
return __extends(TestListItemView, _super), TestListItemView.prototype.template = "x/tests-list-item", 
TestListItemView.prototype.className = "tests-list-item", TestListItemView.prototype.tagName = "li", 
TestListItemView.prototype.initialize = function(options) {
return this.parent = options.parent;
}, TestListItemView.prototype.events = function() {
return {
"click .js-toggle-star":"toggleStar"
};
}, TestListItemView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON()
}), $(this.el).html(content), this.model.get("starred") && $(this.el).addClass("starred"), 
this;
}, TestListItemView.prototype.toggleStar = function(e) {
var index, starred_test_ids;
return e.preventDefault(), starred_test_ids = HR.currentUser.get("starred_test_ids_array"), 
starred_test_ids || (starred_test_ids = []), $(this.el).hasClass("starred") ? (index = starred_test_ids.indexOf(this.model.get("id")), 
starred_test_ids.splice(index, 1)) :starred_test_ids.push(this.model.get("id")), 
HR.currentUser.set("starred_test_ids_array", starred_test_ids), HR.currentUser.save(null, {
success:function(_this) {
return function() {
return _this.parent.collection.fetch({
success:function(collection) {
return collection.sort();
}
});
};
}(this)
});
}, TestListItemView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestsView = TestsView, 
HR.TestListItemView = TestListItemView;
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
return __extends(TopNavigationBarView, _super), TopNavigationBarView.prototype.template = "x/top-nav-bar", 
TopNavigationBarView.prototype.class_name = "hr-nav", TopNavigationBarView.prototype.activeSection = "", 
TopNavigationBarView.prototype.initialize = function(options) {
return this.model = options.model, this.listenTo(this.model, "change", this.render);
}, TopNavigationBarView.prototype.events = function() {
return {
"click a.js-nav-link":"navigateAnchor",
"keydown input#candidate-search-box-gl":"goToCandidateSearch"
};
}, TopNavigationBarView.prototype.render = function() {
var content;
return this.activeSection = this.getActiveSection(), content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
_model:this.model,
term:this.term,
activeSection:this.activeSection
}), $(this.el).html(content), this.highlightActiveSection(), this;
}, TopNavigationBarView.prototype.setTerm = function(term) {
return this.term = term, this.render();
}, TopNavigationBarView.prototype.navigateAnchor = function(e) {
var href;
return e.ctrlKey || e.metaKey ? !0 :(e.preventDefault(), href = $(e.currentTarget).attr("href"), 
href && "#" !== href ? (HR.router.navigate(href, !0), this.highlightActiveSection()) :void 0);
}, TopNavigationBarView.prototype.highlightActiveSection = function() {
return this.activeSection = this.getActiveSection(), this.$(".js-nav-sections").removeClass("active"), 
"tests" === this.activeSection ? this.$(".js-tests-section").addClass("active") :"interviews" === this.activeSection ? this.$(".js-codepair-section").addClass("active") :"library" === this.activeSection ? this.$(".js-library-section").addClass("active") :void 0;
}, TopNavigationBarView.prototype.getActiveSection = function() {
return Backbone.history.fragment ? Backbone.history.fragment.split("/")[0] :void 0;
}, TopNavigationBarView.prototype.goToCandidateSearch = function(e) {
var val;
return val = $(e.currentTarget).val(), 13 === e.keyCode && val ? HR.router.navigate("search/" + val, !0) :void 0;
}, TopNavigationBarView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TopNavigationBarView = TopNavigationBarView;
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
var HR, UserPaymentCheckoutView, _ref;
return UserPaymentCheckoutView = function(_super) {
function UserPaymentCheckoutView() {
return this.passwordConfirmed = __bind(this.passwordConfirmed, this), UserPaymentCheckoutView.__super__.constructor.apply(this, arguments);
}
return __extends(UserPaymentCheckoutView, _super), UserPaymentCheckoutView.prototype.template = "x/user-payment-checkout", 
UserPaymentCheckoutView.prototype.initialize = function(options) {
return this.user_data = options.user_data, this.listenTo(this.model, "change", this.render), 
UserPaymentCheckoutView.__super__.initialize.call(this, options);
}, UserPaymentCheckoutView.prototype.events = function() {
return {
"submit form[name=checkout-form]":"pay",
"click .dev-edit-card-details":"gotoCardDetails",
"click .back":"goBack"
};
}, UserPaymentCheckoutView.prototype.render = function() {
var content, total;
return this.checkout = this.model.toJSON(), this.checkout.charge ? (total = this.checkout.charge, 
this.checkout.prorated_deduction && (total -= this.checkout.prorated_deduction), 
this.checkout.credit && (total -= credit)) :total = 518, content = HR.appController.template(this.template, this)({
model:this.checkout,
user_data:this.user_data,
total:total
}), $(this.el).html(content), this;
}, UserPaymentCheckoutView.prototype.pay = function(e) {
var password;
return e.preventDefault(), this.$(".response-message").addClass("hidden"), this.$("button[type=submit]").attr("disabled", !0).addClass("disabled"), 
password = $("input[name=password]").val(), this.passwordConfirm(password, this.passwordConfirmed);
}, UserPaymentCheckoutView.prototype.passwordConfirmed = function(result) {
var message;
return "error" === result ? (message = "The password entered is incorrect", this.$(".response-message").removeClass("hidden").addClass("error").html(message), 
HR.util.inlineLoadingEnd({}), this.$("button[type=submit]").attr("disabled", !1).removeClass("disabled"), 
void 0) :this.makePayment();
}, UserPaymentCheckoutView.prototype.makePayment = function() {
var newAttributes, payment, that, uid;
return that = this, newAttributes = {
plan:"user",
user_data:this.user_data,
hr_uid:HR.currentUser.id
}, this.model.get("credit_card_number") || Backbone.history.navigate("payments/card_details", !0), 
uid = HR.currentUser.id, payment = new HR.PaymentModel({
plan:this.plan,
uid:uid
}), payment.save(newAttributes, {
override:!0,
success:function() {
return that.model.fetch(), HR.UserSettings.set("checkout", void 0, {
silent:!0
}), Backbone.history.navigate("settings/team", !0);
},
error:function(model, resp) {
var response;
return response = $.parseJSON(resp.responseText), this.$(".response-message").removeClass("hidden").addClass("error").html(response.message), 
HR.util.inlineLoadingEnd({}), this.$("button[type=submit]").attr("disabled", !1).removeClass("disabled");
}
});
}, UserPaymentCheckoutView;
}(window.HR.PaymentCheckoutView), HR = null != (_ref = window.HR) ? _ref :{}, HR.UserPaymentCheckoutView = UserPaymentCheckoutView;
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
var HR, RecruitCompileTestModel, _ref;
return RecruitCompileTestModel = function(_super) {
function RecruitCompileTestModel() {
return RecruitCompileTestModel.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCompileTestModel, _super), RecruitCompileTestModel.prototype.initialize = function(attributes, options) {
return null == attributes && (attributes = {}), null == options && (options = {}), 
RecruitCompileTestModel.__super__.initialize.call(this, attributes, options);
}, RecruitCompileTestModel.prototype.setTid = function(tid) {
this.tid = tid;
}, RecruitCompileTestModel.prototype.setQid = function(qid) {
this.qid = qid;
}, RecruitCompileTestModel.prototype.url = function() {
return this.get("id") ? "/x/api/v1/tests/" + this.tid + "/questions/" + this.qid + "/compile_tests/" + this.get("id") :"/x/api/v1/tests/" + this.tid + "/questions/" + this.qid + "/compile_tests";
}, RecruitCompileTestModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.RecruitCompileTestModel = RecruitCompileTestModel;
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
var HR, RecruitDesignTestModel, _ref;
return RecruitDesignTestModel = function(_super) {
function RecruitDesignTestModel() {
return RecruitDesignTestModel.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitDesignTestModel, _super), RecruitDesignTestModel.prototype.initialize = function(attributes, options) {
return null == attributes && (attributes = {}), null == options && (options = {}), 
RecruitDesignTestModel.__super__.initialize.call(this, attributes, options);
}, RecruitDesignTestModel.prototype.setTid = function(tid) {
this.tid = tid;
}, RecruitDesignTestModel.prototype.setQid = function(qid) {
this.qid = qid;
}, RecruitDesignTestModel.prototype.url = function() {
return this.get("id") ? "/x/api/v1/tests/" + this.tid + "/questions/" + this.qid + "/render/" + this.get("id") :"/x/api/v1/tests/" + this.tid + "/questions/" + this.qid + "/render";
}, RecruitDesignTestModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.RecruitDesignTestModel = RecruitDesignTestModel;
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
var HR, InterviewModel, _ref;
return InterviewModel = function(_super) {
function InterviewModel() {
return InterviewModel.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewModel, _super), InterviewModel.prototype.url = function() {
var url;
return url = "" + HR.INTERVIEWS_DOMAIN + "/api/interviews", this.get("id") && (url += "/" + this.get("id")), 
url += "?auth_v2=" + HR.currentUser.get("auth_v2") + "&api_key=" + HR.currentUser.get("apiKey") + "&_=" + 1e7 * Math.random();
}, InterviewModel.shareReportLink = function(model) {
var auth_key, base, id, loc;
if (model) return auth_key = "", id = "", _.isFunction(model.get) ? (id = model.get("id"), 
auth_key = model.get("auth_key")) :(id = model.id, auth_key = model.auth_key), loc = window.location, 
base = loc.protocol + "//" + loc.host + "/x/interviews/" + id + "/report?auth_key=" + auth_key;
}, InterviewModel.prototype.parse = function(resp) {
var attendant, candidates, fn, interviewers, _i, _len, _ref;
if (resp) {
for (interviewers = [], candidates = [], fn = function() {
var data;
return resp.access_code && "interviewer" === this.role ? (data = _.clone(this), 
data.access_code = resp.access_code, resp.paperurl + "?b=" + HR.util.Base64.encode(JSON.stringify(data), !1)) :resp.paperurl + "?b=" + HR.util.Base64.encode(JSON.stringify(this), !1);
}, _ref = resp.interview_attendants, _i = 0, _len = _ref.length; _len > _i; _i++) attendant = _ref[_i], 
attendant.url = fn, "interviewer" === attendant.role ? interviewers.push(attendant) :"candidate" === attendant.role && candidates.push(attendant);
resp.interviewers = interviewers, resp.candidates = candidates, resp.from = new Date(resp.from), 
resp.to = new Date(resp.to);
}
return InterviewModel.__super__.parse.call(this, resp);
}, InterviewModel.prototype.interviewer = function() {
return this.get("interviewers") && this.get("interviewers").length ? this.get("interviewers")[0] :null;
}, InterviewModel.prototype.interviewersName = function() {
return this.get("interviewers") && this.get("interviewers").length ? _.pluck(this.get("interviewers"), "name").join(", ") :null;
}, InterviewModel.prototype.owner = function() {
return this.get("user") ? this.get("user") :null;
}, InterviewModel.prototype.createdOn = function() {
var created_at;
return created_at = new Date(this.get("created_at")), moment(created_at).tz(HR.currentUser.get("timezone")).format("D MMM, YYYY HH:mm");
}, InterviewModel.prototype.ownerName = function() {
return this.get("user") ? this.get("user").firstname + " " + this.get("user").lastname :null;
}, InterviewModel.prototype.candidate = function() {
return this.get("candidates") && this.get("candidates").length ? this.get("candidates")[0] :null;
}, InterviewModel.prototype.when = function() {
return HR.util.beautifyDates(this.get("from"), this.get("to"));
}, InterviewModel.prototype.get = function(prop) {
return prop.match(/interviewers|candidates/) && !this.attributes[prop] ? (prop = prop.substr(0, prop.length - 1), 
_.filter(this.attributes.interview_attendants, function(attendant) {
return attendant.role === prop;
})) :prop.match(/interviewer|candidate/) && !this.attributes[prop] ? _.find(this.attributes.interview_attendants, function(attendant) {
return attendant.role === prop;
}) :InterviewModel.__super__.get.call(this, prop);
}, InterviewModel.prototype.save = function(data, options) {
var attendant, attendants, candidate, interviewer, model, _i, _j, _len, _len1, _ref, _ref1;
if (attendants = [], model = this, model.get("candidates") && model.get("interviewers")) {
for (_ref = model.get("candidates"), _i = 0, _len = _ref.length; _len > _i; _i++) candidate = _ref[_i], 
attendant = candidate, attendant.role = "candidate", attendants.push(attendant);
for (_ref1 = model.get("interviewers"), _j = 0, _len1 = _ref1.length; _len1 > _j; _j++) interviewer = _ref1[_j], 
attendant = interviewer, attendant.role = "interviewer", attendants.push(attendant);
model.set("interview_attendants", attendants);
}
return InterviewModel.__super__.save.call(this, data, options);
}, InterviewModel.prototype.sync = function(method, model, options) {
return null == options && (options = {}), options.crossDomain = !0, InterviewModel.__super__.sync.call(this, method, model, options);
}, InterviewModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.InterviewModel = InterviewModel;
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
var HR, InterviewCodeRecordingModel, InterviewRecordingsModel, Player, TextPlayer, _ref;
return InterviewRecordingsModel = function(_super) {
function InterviewRecordingsModel() {
return InterviewRecordingsModel.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewRecordingsModel, _super), InterviewRecordingsModel.prototype.initialize = function() {
return this.on("reset", this.register), this.register();
}, InterviewRecordingsModel.prototype.register = function() {
return this.recording = new InterviewCodeRecordingModel({
interview_id:this.collection.interview_id
}), this.recording.fetch({
success:function(_this) {
return function(model) {
return model.get("runs") ? _this.set("type", "runs") :model.get("ops") ? _this.set("type", "ops") :_this.set("type", "none");
};
}(this),
error:function(_this) {
return function() {
return _this.recording.set("ops", null);
};
}(this)
});
}, InterviewRecordingsModel.prototype.get = function(prop) {
return this.recording && "ops" === prop ? this.recording.get("ops") :this.recording && "runs" === prop ? this.recording.get("runs") :InterviewRecordingsModel.__super__.get.apply(this, arguments);
}, InterviewRecordingsModel;
}(window.HR.GenericModel), Player = function(_super) {
function Player() {
return Player.__super__.constructor.apply(this, arguments);
}
return __extends(Player, _super), Player.prototype.defaults = function() {
return {
ops:[],
ob:[],
ix:-1
};
}, Player.prototype.clone = function(o) {
var ret;
if (_.isArray(o)) ret = []; else {
if (!_.isObject(o)) return o;
ret = {};
}
return _.each(o, function(_this) {
return function(val, key) {
return ret[key] = _this.clone(val);
};
}(this)), ret;
}, Player.prototype.apply = function() {}, Player.prototype.undo = function() {}, 
Player.prototype.next = function() {
return this.get("ix") < this.get("ops").length - 1 ? (this.set("ix", this.get("ix") + 1), 
this.apply(this.get("ops")[this.get("ix")])) :void 0;
}, Player.prototype.prev = function() {
var ret;
return this.get("ix") > -1 ? (ret = this.undo(this.get("ops")[this.get("ix")]), 
this.set("ix", this.get("ix") - 1), ret) :void 0;
}, Player;
}(window.HR.GenericModel), TextPlayer = function(_super) {
function TextPlayer() {
return TextPlayer.__super__.constructor.apply(this, arguments);
}
return __extends(TextPlayer, _super), TextPlayer.prototype.initialize = function(options) {
return null == options && (options = {}), TextPlayer.__super__.initialize.apply(this, arguments);
}, TextPlayer.prototype.apply = function(oper) {
return _.each(oper.op, function(_this) {
return function(op) {
var arr, pos;
return void 0 !== op.i ? (pos = _this.get("ob").length ? op.p :op.p - 1, arr = op.i.split(""), 
arr.unshift(pos, 0), _this.get("ob").splice.apply(_this.get("ob"), arr)) :void 0 !== op.d ? (pos = _this.get("ob").length - op.d.length ? op.p :0, 
_this.get("ob").splice(pos, op.d.length)) :console.log("no idea");
};
}(this)), this.get("ob").join("");
}, TextPlayer.prototype.undo = function(oper) {
var o;
return o = this.clone(oper), o.op = _.map(o.op.reverse(), function(oper) {
var ret;
return ret = {
p:oper.p
}, void 0 !== oper.i ? ret.d = oper.i :ret.i = oper.d, ret;
}), this.apply(o);
}, TextPlayer.prototype.gotoPosition = function(pos) {
var i, j;
for (i = pos - this.get("ix"), j = Math.abs(i); j > 0; ) i > 0 ? this.next() :this.prev(), 
j--;
return this.get("ob").join("");
}, TextPlayer;
}(Player), InterviewCodeRecordingModel = function(_super) {
function InterviewCodeRecordingModel() {
return InterviewCodeRecordingModel.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewCodeRecordingModel, _super), InterviewCodeRecordingModel.prototype.initialize = function(options) {
return this.interview_id = options.interview_id;
}, InterviewCodeRecordingModel.prototype.url = function() {
var url;
return url = "" + HR.INTERVIEWS_DOMAIN + "/api/interviews/" + this.interview_id + "/recordings/code?auth_v2=" + HR.currentUser.get("auth_v2") + "&api_key=" + HR.currentUser.get("apiKey");
}, InterviewCodeRecordingModel.prototype.get = function(prop) {
return "ops" === prop ? this.attributes.ops || [] :InterviewCodeRecordingModel.__super__.get.apply(this, arguments);
}, InterviewCodeRecordingModel.prototype.sync = function(method, collection, options) {
return null == options && (options = {}), options.crossDomain = !0, InterviewCodeRecordingModel.__super__.sync.call(this, method, collection, options);
}, InterviewCodeRecordingModel;
}(TextPlayer), HR = null != (_ref = window.HR) ? _ref :{}, HR.InterviewRecordingsModel = InterviewRecordingsModel, 
HR.InterviewCodeRecordingModel = InterviewCodeRecordingModel;
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
var HR, LibraryModel, _ref;
return LibraryModel = function(_super) {
function LibraryModel() {
return LibraryModel.__super__.constructor.apply(this, arguments);
}
return __extends(LibraryModel, _super), LibraryModel.prototype.setTid = function(tid) {
this.tid = tid;
}, LibraryModel.prototype.url = function() {
var root;
return root = "/x/api/v1/tests/" + this.tid + "/library";
}, LibraryModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.LibraryModel = new LibraryModel();
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
var HR, NotificationModel, _ref;
return NotificationModel = function(_super) {
function NotificationModel() {
return NotificationModel.__super__.constructor.apply(this, arguments);
}
return __extends(NotificationModel, _super), NotificationModel.prototype.initialize = function() {
return this.notifications = [];
}, NotificationModel.prototype.push = function(message) {
return this.notifications.push(message);
}, NotificationModel.prototype.pop = function(message) {
return this.notifications.pop(message);
}, NotificationModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.NotificationModel = new NotificationModel();
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
var HR, PaymentModel, _ref;
return PaymentModel = function(_super) {
function PaymentModel() {
return PaymentModel.__super__.constructor.apply(this, arguments);
}
return __extends(PaymentModel, _super), PaymentModel.prototype.initialize = function(options) {
return null == options && (options = {}), this.plan = options.plan, this.hr_uid = options.uid;
}, PaymentModel.prototype.url = function() {
var url;
return this.plan ? (url = "" + HR.RECRUIT2_DOMAIN + "/recruit2/billing/?plan=" + this.plan, 
this.hr_uid && (url += "&hr_uid=" + this.hr_uid)) :(url = "" + HR.RECRUIT2_DOMAIN + "/recruit2/billing", 
this.hr_uid && (url += "?hr_uid=" + this.hr_uid)), url;
}, PaymentModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.PaymentModel = PaymentModel;
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
return __extends(QuestionModel, _super), QuestionModel.prototype.urlRoot = function() {
var root;
return this.tid = this.get("tid"), root = this.tid ? "/x/api/v1/tests/" + this.tid + "/questions" :"/x/api/v1/questions";
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
var HR, TestAttemptModel, _ref;
return TestAttemptModel = function(_super) {
function TestAttemptModel() {
return TestAttemptModel.__super__.constructor.apply(this, arguments);
}
return __extends(TestAttemptModel, _super), TestAttemptModel.prototype.url = function() {
var url;
return this.id && this.tid ? url = "/x/tests/" + this.tid + "/attempts/{@id}" :void 0;
}, TestAttemptModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestAttemptModel = TestAttemptModel;
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
var HR, SearchCandidateModel, _ref;
return SearchCandidateModel = function(_super) {
function SearchCandidateModel() {
return SearchCandidateModel.__super__.constructor.apply(this, arguments);
}
return __extends(SearchCandidateModel, _super), SearchCandidateModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.SearchCandidateModel = SearchCandidateModel;
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
var HR, SearchItemModel, _ref;
return SearchItemModel = function(_super) {
function SearchItemModel() {
return SearchItemModel.__super__.constructor.apply(this, arguments);
}
return __extends(SearchItemModel, _super), SearchItemModel.prototype.urlRoot = function() {
return "x/api/v1/tests/";
}, SearchItemModel;
}(Backbone.Model), HR = null != (_ref = window.HR) ? _ref :{}, HR.SearchItemModel = SearchItemModel;
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
var HR, TestShareModel, _ref;
return TestShareModel = function(_super) {
function TestShareModel() {
return TestShareModel.__super__.constructor.apply(this, arguments);
}
return __extends(TestShareModel, _super), TestShareModel.prototype.url = function() {
return "/x/api/v1/tests/" + this.get("id") + "/share";
}, TestShareModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestShareModel = TestShareModel;
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
var HR, TeamModel, _ref;
return TeamModel = function(_super) {
function TeamModel() {
return TeamModel.__super__.constructor.apply(this, arguments);
}
return __extends(TeamModel, _super), TeamModel.prototype.urlRoot = "/x/api/v1/teams", 
TeamModel.prototype.parse = function(response) {
var users;
return response.users && (users = [], _.each(response.users, function(user) {
var new_user;
return new_user = new window.HR.UserTeamModel(user), users.push(new_user);
}), response.users = users), response;
}, TeamModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.TeamModel = TeamModel;
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
var HR, TestAttemptModel, _ref;
return TestAttemptModel = function(_super) {
function TestAttemptModel() {
return TestAttemptModel.__super__.constructor.apply(this, arguments);
}
return __extends(TestAttemptModel, _super), TestAttemptModel.prototype.url = function() {
var url;
return this.tid = this.get("tid"), this.id && this.tid && (url = "/x/api/v1/tests/" + this.tid + "/attempts/" + this.id), 
url;
}, TestAttemptModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestAttemptModel = TestAttemptModel;
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
var HR, RecruitTestModel, TestModel, _ref;
return TestModel = function(_super) {
function TestModel() {
return TestModel.__super__.constructor.apply(this, arguments);
}
return __extends(TestModel, _super), TestModel.prototype.action = null, TestModel.prototype.url = function() {
var u;
return u = "/x/api/v1/tests", this.get("id") && (u += "/" + this.get("id"), this.action && (u += "/" + this.action)), 
u;
}, TestModel.prototype.setAction = function(action) {
this.action = action;
}, TestModel.prototype.unsetAction = function() {
return this.action = null;
}, TestModel.prototype.removeQuestion = function(qid, callbacks) {
return $.ajax({
url:"/x/api/v1/tests/" + this.id + "/questions/" + qid,
type:"DELETE",
success:callbacks.success,
error:callbacks.error
}), this.fetch();
}, TestModel.prototype.addQuestion = function(qid, index, callbacks) {
var post_array, pre_array, questions_array;
return questions_array = this.get("questions_array"), index ? (pre_array = questions_array.splice(0, index), 
post_array = questions_array, questions_array = pre_array.concat([ qid ]), questions_array = questions_array.concat(post_array)) :questions_array.push(qid), 
this.save({
questions_array:questions_array
}, {
success:callbacks.success,
error:callbacks.error
});
}, TestModel;
}(window.HR.GenericModel), RecruitTestModel = function(_super) {
function RecruitTestModel() {
return RecruitTestModel.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitTestModel, _super), RecruitTestModel.prototype.url = function() {
return "/x/api/v1/tests/" + this.get("id") + "/candidate";
}, RecruitTestModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestModel = TestModel, 
HR.RecruitTestModel = RecruitTestModel;
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
var HR, TestCaseModel, _ref;
return TestCaseModel = function(_super) {
function TestCaseModel() {
return TestCaseModel.__super__.constructor.apply(this, arguments);
}
return __extends(TestCaseModel, _super), TestCaseModel.prototype.urlRoot = function() {
var root;
return this.tid = this.get("tid"), this.qid = this.get("qid"), root = this.tid ? "/x/api/v1/tests/" + this.tid + "/questions/" + this.qid + "/testcases" :"/x/api/v1/questions/" + this.qid + "/testcases";
}, TestCaseModel.prototype.downloadURL = function() {
return this.get("tid") ? "/x/api/v1/tests/" + this.get("tid") + "/questions/" + this.get("qid") + "/testcases/" + this.get("id") + "/download" :"/x/api/v1/questions/" + this.get("qid") + "/testcases/" + this.get("id") + "/download";
}, TestCaseModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestCaseModel = TestCaseModel;
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
var HR, UserTeamModel, _ref;
return UserTeamModel = function(_super) {
function UserTeamModel() {
return UserTeamModel.__super__.constructor.apply(this, arguments);
}
return __extends(UserTeamModel, _super), UserTeamModel.prototype.url = function() {
return this.id ? "/x/api/v1/teams/" + this.get("team_id") + "/users/" + this.id :"/x/api/v1/teams/" + this.get("team_id") + "/users";
}, UserTeamModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.UserTeamModel = UserTeamModel;
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
var HR, UserModel, _ref;
return UserModel = function(_super) {
function UserModel() {
return UserModel.__super__.constructor.apply(this, arguments);
}
return __extends(UserModel, _super), UserModel.prototype.urlRoot = "/x/api/v1/users", 
UserModel.prototype.parse = function(resp, options) {
var changeTimeZoneDialog, currentTimeZone;
return resp.model && (resp.model.timezone || "" === resp.model.timezone) && (currentTimeZone = jstz.determine_timezone().timezone.olson_tz, 
resp.model.timezone !== currentTimeZone && (changeTimeZoneDialog = new HR.util.changeTimeZoneDialog({
model:this,
userTimeZone:resp.model.timezone,
currentTimeZone:currentTimeZone
})), "" === resp.model.timezone && (resp.model.timezone = currentTimeZone, resp.model.timezone_local = !0)), 
UserModel.__super__.parse.call(this, resp, options);
}, UserModel.prototype.updatePassword = function(data) {
var promise;
return promise = $.ajax({
url:"/x/api/v1/users/change_password",
type:"PUT",
data:data
});
}, UserModel.prototype.invites_count = function() {
var company, count;
return company = this.get("company"), "unlimited" === company.type ? count = "unlimited" :(count = 0, 
company.invites && (count += company.invites), company.subscription_invites && (count += company.subscription_invites)), 
count;
}, UserModel.prototype.isLocked = function() {
return "locked" === this.get("type") || this.get("company") && "locked" === this.get("company").type ? !0 :!1;
}, UserModel.prototype.canCreateInterviews = function() {
return this.get("permissions") && 0 === parseInt(this.get("permissions").interviews_permission, 10) ? !1 :"developer" !== this.get("role") ? !0 :this.get("company") && this.get("company").developers_create_interviews && "False" === this.get("company").developers_create_interviews ? !1 :!0;
}, UserModel;
}(window.HR.GenericModel), HR = null != (_ref = window.HR) ? _ref :{}, HR.UserModel = UserModel;
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
var HR, TestCandidatesCollection, _ref;
return TestCandidatesCollection = function(_super) {
function TestCandidatesCollection() {
return TestCandidatesCollection.__super__.constructor.apply(this, arguments);
}
return __extends(TestCandidatesCollection, _super), TestCandidatesCollection.prototype.model = window.HR.TestAttemptModel, 
TestCandidatesCollection.prototype.url = function() {
var url;
return this.tid && (url = this.type ? "/x/api/v1/tests/" + this.tid + "/attempts?type=" + this.type :"/x/api/v1/tests/" + this.tid + "/attempts"), 
url;
}, TestCandidatesCollection.prototype.setTid = function(tid) {
this.tid = tid;
}, TestCandidatesCollection.prototype.setType = function(type) {
this.type = type;
}, TestCandidatesCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestCandidatesCollection = TestCandidatesCollection;
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
var HR, InterviewRecordingsCollection, _ref;
return InterviewRecordingsCollection = function(_super) {
function InterviewRecordingsCollection() {
return InterviewRecordingsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewRecordingsCollection, _super), InterviewRecordingsCollection.prototype.initialize = function(options) {
return this.interview_id = options.id;
}, InterviewRecordingsCollection.prototype.model = window.HR.InterviewRecordingsModel, 
InterviewRecordingsCollection.prototype.url = function() {
var url;
return url = "" + HR.INTERVIEWS_DOMAIN + "/api/interviews/" + this.interview_id + "/recordings?auth_v2=" + HR.currentUser.get("auth_v2") + "&api_key=" + HR.currentUser.get("apiKey");
}, InterviewRecordingsCollection.prototype.parse = function(response) {
return response;
}, InterviewRecordingsCollection.prototype.sync = function(method, collection, options) {
return null == options && (options = {}), options.crossDomain = !0, InterviewRecordingsCollection.__super__.sync.call(this, method, collection, options);
}, InterviewRecordingsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.InterviewRecordingsCollection = InterviewRecordingsCollection;
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
var HR, InterviewsCollection, _ref;
return InterviewsCollection = function(_super) {
function InterviewsCollection() {
return InterviewsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewsCollection, _super), InterviewsCollection.prototype.model = window.HR.InterviewModel, 
InterviewsCollection.prototype.initialize = function(options) {
return InterviewsCollection.__super__.initialize.call(this, options), this.filters = {};
}, InterviewsCollection.prototype.url = function() {
var url;
return url = "" + HR.INTERVIEWS_DOMAIN + "/api/interviews?auth_v2=" + HR.currentUser.get("auth_v2") + "&api_key=" + HR.currentUser.get("apiKey"), 
_.isEmpty(this.filters === !1) && _.each(this.filters, function(value, key) {
return url += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
}), url;
}, InterviewsCollection.prototype.setFilter = function(key, value) {
return this.filters[key] = value;
}, InterviewsCollection.prototype.parse = function(response) {
return response.results;
}, InterviewsCollection.prototype.sync = function(method, collection, options) {
return null == options && (options = {}), options.crossDomain = !0, InterviewsCollection.__super__.sync.call(this, method, collection, options);
}, InterviewsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.InterviewsCollection = InterviewsCollection;
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
var HR, SearchCandidatesCollection, _ref;
return SearchCandidatesCollection = function(_super) {
function SearchCandidatesCollection() {
return SearchCandidatesCollection.__super__.constructor.apply(this, arguments);
}
return __extends(SearchCandidatesCollection, _super), SearchCandidatesCollection.prototype.url = function() {
var url;
return url = "/x/api/v1/candidates";
}, SearchCandidatesCollection.prototype.model = window.HR.SearchCandidateModel, 
SearchCandidatesCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.SearchCandidatesCollection = SearchCandidatesCollection;
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
var HR, SearchItemsCollection, _ref;
return SearchItemsCollection = function(_super) {
function SearchItemsCollection() {
return this.initialize = __bind(this.initialize, this), SearchItemsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(SearchItemsCollection, _super), SearchItemsCollection.prototype.initialize = function(options) {
return SearchItemsCollection.__super__.initialize.call(this, options), this.data_type_map = [];
}, SearchItemsCollection.prototype.url = function() {
var url;
return url = "/x/api/v1/tests/search";
}, SearchItemsCollection.prototype.setType = function(type) {
this.type = type;
}, SearchItemsCollection.prototype.setDataTypes = function(dataTypes) {
this.dataTypes = dataTypes;
}, SearchItemsCollection.prototype.setGroups = function(groups) {
this.groups = groups;
}, SearchItemsCollection.prototype.search = function(filters, match_type, set_operation) {
var results;
return null == filters && (filters = {}), null == match_type && (match_type = "contains"), 
null == set_operation && (set_operation = "intersection"), results = {}, _.each(filters, function(_this) {
return function(value, filter) {
var group, matched_values, selected_items;
return group = _this.groups[filter] ? _this.groups[filter] :filter, results[group] || (results[group] = []), 
selected_items = _.select(_this.models, function(item) {
var from, from_compare, lookup_field, to, to_compare;
if (lookup_field = item.get("model") + "-" + item.get("field"), lookup_field === filter) {
if (_this.dataTypes[item.get("field")] && "date" === _this.dataTypes[item.get("field")]) return from = value.split("..")[0], 
to = value.split("..")[1], from_compare = "" === from ? !0 :_this.dateCompare(from, item.get("key")) <= 0, 
to_compare = "" === to ? !0 :_this.dateCompare(to, item.get("key")) >= 0, from_compare && to_compare;
if ("contains" === match_type) return item.get("key").toLowerCase().indexOf(value.toLowerCase()) >= 0;
if ("contains case" === match_type) return item.get("key").indexOf(value) >= 0;
if ("match" === match_type) return item.get("key").toLowerCase() === value.toLowerCase();
if ("match case" === match_type) return item.get("key") === value;
}
}), matched_values = _.map(selected_items, function(selected_item) {
return selected_item.get("value");
}), results[group] = _.union(results[group], _.unique(_.flatten(matched_values)));
};
}(this)), _.values(results).length > 0 ? "union" === set_operation ? _.union.apply(this, _.values(results)) :_.intersection.apply(this, _.values(results)) :[];
}, SearchItemsCollection.prototype.dateCompare = function(a, b) {
var date_a, date_b;
return date_a = moment(a), date_b = moment(b), date_a.diff(date_b) < 0 ? -1 :date_a.diff(date_b) > 0 ? 1 :0;
}, SearchItemsCollection.prototype.model = window.HR.SearchItemModel, SearchItemsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.SearchItemsCollection = SearchItemsCollection;
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
var HR, TeamsCollection, _ref;
return TeamsCollection = function(_super) {
function TeamsCollection() {
return TeamsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(TeamsCollection, _super), TeamsCollection.prototype.url = "/x/api/v1/teams", 
TeamsCollection.prototype.model = window.HR.TeamModel, TeamsCollection.prototype.parse = function(response) {
return this.permission = response.permission, this.new_user_permissions = response.new_user_permissions, 
TeamsCollection.__super__.parse.call(this, response);
}, TeamsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.TeamsCollection = TeamsCollection;
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
var HR, TestCasesCollection, _ref;
return TestCasesCollection = function(_super) {
function TestCasesCollection() {
return TestCasesCollection.__super__.constructor.apply(this, arguments);
}
return __extends(TestCasesCollection, _super), TestCasesCollection.prototype.model = window.HR.TestCaseModel, 
TestCasesCollection.prototype.setTid = function(tid) {
this.tid = tid;
}, TestCasesCollection.prototype.setQid = function(qid) {
this.qid = qid;
}, TestCasesCollection.prototype.url = function() {
return this.tid ? "/x/api/v1/tests/" + this.tid + "/questions/" + this.qid + "/testcases" :"/x/api/v1/questions/" + this.qid + "/testcases";
}, TestCasesCollection.prototype.setOperation = function(operation) {
this.operation = operation;
}, TestCasesCollection.prototype.getOperation = function() {
return this.operation;
}, TestCasesCollection.prototype.setTcids = function(tcids) {
this.tcids = tcids;
}, TestCasesCollection.prototype.getTcids = function() {
return this.tcids;
}, TestCasesCollection.prototype.batchOperation = function(params) {
var tcids_string;
return null == params && (params = {}), this.operation && 0 !== this.tcids.length ? (tcids_string = this.tcids.join("-"), 
"download" === this.operation ? document.location = "/x/api/v1/questions/" + this.qid + "/testcases/batch_ops?tcids=" + tcids_string + "&operation=" + this.operation :_.include([ "changescore", "changedifficulty", "marksample", "delete" ], this.operation) ? $.ajax({
type:"POST",
url:"/x/api/v1/questions/" + this.qid + "/testcases/batch_ops?tcids=" + tcids_string + "&operation=" + this.operation,
data:params,
success:function(_this) {
return function() {
return _this.fetch({
reset:!0
});
};
}(this)
}) :void 0) :void 0;
}, TestCasesCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestCasesCollection = TestCasesCollection;
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
var HR, TestsCollection, _ref;
return TestsCollection = function(_super) {
function TestsCollection() {
return TestsCollection.__super__.constructor.apply(this, arguments);
}
return __extends(TestsCollection, _super), TestsCollection.prototype.model = window.HR.TestModel, 
TestsCollection.prototype.initialize = function() {
return this.page = 1;
}, TestsCollection.prototype.url = function() {
var url;
return url = this.filterString ? "/x/api/v1/tests/search?type=advanced&filters=" + this.filterString :this.tids || "" === this.tids ? "/x/api/v1/tests/?tids=" + this.tids :"/x/api/v1/tests/?", 
this.page && (url += "&page=" + this.page), url;
}, TestsCollection.prototype.getTotal = function() {
return this.total;
}, TestsCollection.prototype.getPage = function() {
return this.page;
}, TestsCollection.prototype.setPage = function(page) {
this.page = page;
}, TestsCollection.prototype.setTids = function(tids) {
this.tids = tids;
}, TestsCollection.prototype.setFilterString = function(filterString) {
this.filterString = filterString;
}, TestsCollection.prototype.getTids = function() {
return this.tids;
}, TestsCollection.prototype.comparator = function(m1, m2) {
return m1.get("starred") && m2.get("starred") ? m1.get("id") > m2.get("id") ? -1 :1 :m1.get("starred") ? -1 :m2.get("starred") ? 1 :m1.get("id") > m2.get("id") ? -1 :1;
}, TestsCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestsCollection = TestsCollection;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
}, __bind = function(fn, me) {
return function() {
return fn.apply(me, arguments);
};
}, __indexOf = [].indexOf || function(item) {
for (var i = 0, l = this.length; l > i; i++) if (i in this && this[i] === item) return i;
return -1;
};
jQuery(function() {
var HR, RecruitCandidateCodeUploadView, RecruitCandidateCodingView, RecruitCandidateCompileTestView, RecruitCandidateCompleteView, RecruitCandidateDesignView, RecruitCandidateFileUploadView, RecruitCandidateFooterView, RecruitCandidateInstructionsView, RecruitCandidateListView, RecruitCandidateMcqView, RecruitCandidateQuestionView, RecruitCandidateSideBarView, RecruitCandidateSubjectiveView, RecruitCandidateTestCaseView, RecruitCandidateTopBarView, RecruitCandidateUMLView, _ref;
return RecruitCandidateInstructionsView = function(_super) {
function RecruitCandidateInstructionsView() {
return RecruitCandidateInstructionsView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateInstructionsView, _super), RecruitCandidateInstructionsView.prototype.template = "recruit/instructions", 
RecruitCandidateInstructionsView.prototype.className = "candidate-instructions", 
RecruitCandidateInstructionsView.prototype.initialize = function(options) {
return this.model = options.model;
}, RecruitCandidateInstructionsView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
instructions:this.model.get("instructions")
})), this;
}, RecruitCandidateInstructionsView;
}(window.HR.GenericView), RecruitCandidateListView = function(_super) {
function RecruitCandidateListView() {
return RecruitCandidateListView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateListView, _super), RecruitCandidateListView.prototype.template = "recruit/question-list", 
RecruitCandidateListView.prototype.className = "candidate-qlist", RecruitCandidateListView.prototype.events = {
"click .test-done":"testDone",
"click .next-section":"sectionNext",
"click .js-solvelink":"handleNav"
}, RecruitCandidateListView.prototype.initialize = function() {
return this.model = HR.candidate.candidateAttemptModel, this.tid = HR.candidate.candidateTestModel.get("unique_id"), 
this.aid = this.model.get("id");
}, RecruitCandidateListView.prototype.render = function() {
var current_section, qi, questions, sections_mapping, solves, v;
return questions = this.model.get("questions"), solves = this.model.get("solve_mapping"), 
sections_mapping = this.model.get("sections_mapping"), current_section = this.model.get("section"), 
$(this.el).html(HR.appController.template(this.template, this)({
section_count:sections_mapping ? sections_mapping.length :1,
current_section:current_section ? current_section :1,
footer_copyright:!!HR.candidate.candidateTestModel.get("footer_copyright")
})), sections_mapping ? (qi = 0, _.each(sections_mapping, function(_this) {
return function(sec, i) {
var v;
return v = _this.getTable(questions.slice(qi, qi + parseInt(sec.questions)), qi + 1, solves, i + 1 !== current_section), 
_this.$("table.section" + (i + 1)).html(v), qi += parseInt(sec.questions);
};
}(this)), sections_mapping.length > 1 && current_section < sections_mapping.length && this.$("button.section-finish-" + current_section).removeClass("hidden")) :(v = this.getTable(questions, 1, solves), 
this.$("table.section1").html(v)), HR.candidate.lastQuestionViewed && setTimeout(function(_this) {
return function() {
return _this.$(".qlist-" + HR.candidate.lastQuestionViewed)[0] && _this.$(".qlist-" + HR.candidate.lastQuestionViewed)[0].scrollIntoView();
};
}(this)), this;
}, RecruitCandidateListView.prototype.getTable = function(questions, start, solves, disabled) {
var el, i, tid;
return null == disabled && (disabled = !1), tid = this.tid, i = start, el = "", 
_.each(questions, function(q) {
var ahref, s;
return s = "", s += 1 === i ? "<tr class='border qlist-" + i + "''>" :"<tr class='qlist-" + i + "'>", 
s += "<td width='5%' class='grey right'><span class='mdR'>Q" + i + "</span></td>", 
s += '<td width="46%"><a class="js-solvelink question-name" ', s += disabled ? ">" :"href='" + tid + "/questions/" + q.unique_id + "'>", 
s += q.name ? q.name :"Question <em class='fnt-sz-small grey' style='font-weight: 500;'> &nbsp;&nbsp; " + _.escape(q.preview) + "..</em>", 
s += "</a></td>", s += "<td width='12%' class='fnt-sz-mid'>" + window.istreet.cfg.hrqn[q.type] + "</td>", 
ahref = disabled ? "" :"href='" + tid + "/questions/" + q.unique_id + "'", s += _.has(solves, q.unique_id) ? "<td width='12%' class='fnt-sz-mid'><span class='green customer-green-alternative'>submitted</span></td><td width='19%' class='right'><a " + ahref + " class='normal-underline display-inline-block margin-right-15 fnt-sz-mid js-solvelink' style='margin: 9px 11px 9px 0;''>Modify Submission</a></td>" :"<td width='12%' class='fnt-sz-mid'>not answered</td><td width='19%' class='right'><a " + ahref + " class='btn btn-line margin-right-15 fnt-sz-mid js-solvelink'>Solve Question</a></td>", 
s += "</tr>", i++, el += s;
}), el;
}, RecruitCandidateListView.prototype.handleNav = function(e) {
var me;
return e.preventDefault(), me = this.$(e.currentTarget), me.attr("href") && !HR.candidate.ongoingQuestionNavigation ? (HR.candidate.ongoingQuestionNavigation = !0, 
setTimeout(function() {
return HR.candidate.ongoingQuestionNavigation = !1;
}, 1e4), HR.candidate.attemptRefreshNeeded = !0, HR.router.navigate(me.attr("href"), {
trigger:!0,
replace:!0
})) :void 0;
}, RecruitCandidateListView.prototype.testDone = function() {
return HR.util.confirm({
title:"Confirm test close",
message:"Once closed, you can no longer view or modify this test.\n\nAre you sure you are done, and want to close the test?",
okButtonText:"Yes, close this test.",
cancelButtonText:"No, go back.",
okCallback:function() {
return function() {
return HR.candidate.candidateTestModel.setAction("logout"), HR.candidate.pingTimer && clearInterval(HR.candidate.pingTimer), 
HR.candidate.candidateTestModel.save({
how:"userclick"
}, {
success:function(m) {
return HR.router.navigate("" + m.get("unique_id") + "/redirect", {
trigger:!0,
replace:!0
});
}
});
};
}(this)
});
}, RecruitCandidateListView.prototype.sectionNext = function(e) {
return HR.util.confirm({
title:"Confirm section close",
message:"You will not be able access this section again.<br><br>Are you sure?",
okButtonText:"Yes, move to next section.",
cancelButtonText:"No, stay.",
okCallback:function(_this) {
return function() {
return HR.candidate.candidateAttemptModel.set("section_close", _this.$(e.currentTarget).attr("data-section")), 
HR.candidate.candidateAttemptModel.save(null, {
success:function() {
return HR.router.navigate("" + HR.candidate.candidateTestModel.get("unique_id") + "/redirect", {
trigger:!0,
replace:!0
});
},
error:function() {
return HR.router.navigate("" + HR.candidate.candidateTestModel.get("unique_id") + "/redirect", {
trigger:!0,
replace:!0
});
}
});
};
}(this)
});
}, RecruitCandidateListView;
}(window.HR.GenericView), RecruitCandidateQuestionView = function(_super) {
function RecruitCandidateQuestionView() {
return this.getAnswerToSave = __bind(this.getAnswerToSave, this), RecruitCandidateQuestionView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateQuestionView, _super), RecruitCandidateQuestionView.prototype.template = "recruit/question-base", 
RecruitCandidateQuestionView.prototype.className = "question-base", RecruitCandidateQuestionView.prototype.initialize = function(options) {
return this.model = options.model, this.tid = HR.candidate.candidateTestModel.get("unique_id");
}, RecruitCandidateQuestionView.prototype.events = {
"click .ans-submit":"submitAnswer"
}, RecruitCandidateQuestionView.prototype.getAnswerToSave = function() {
var a, qtype;
return qtype = this.model.get("type"), _.contains([ "code", "approx", "textAns", "design" ], qtype) ? this.view ? (a = {
type:qtype,
answer:this.view.answer()
}, a.answer ? a :null) :null :null;
}, RecruitCandidateQuestionView.prototype.submitAnswer = function(e) {
var a, data, request_params;
return e.preventDefault(), a = {
type:this.model.attributes.type,
answer:this.view.answer()
}, a.answer ? (this.$(e.currentTarget).html("Submitting.."), this.$(e.currentTarget).attr("disabled", "disabled"), 
data = {
qid:this.model.get("unique_id"),
answer:a
}, request_params = {
url:"/recruit/attempts/" + HR.candidate.candidateAttemptModel.get("id") + "/solves",
data:data,
dataType:"json",
type:"POST",
success:function(_this) {
return function(xhr) {
var nextpath;
return _this.$(e.currentTarget).html("Done, redirecting.."), xhr.error ? _this.showError(xhr.error) :(nextpath = _this.model.get("nextqid") ? "" + _this.tid + "/questions/" + _this.model.get("nextqid") :"" + _this.tid + "/questions", 
HR.candidate.attemptRefreshNeeded = !0, HR.router.navigate("" + nextpath, {
trigger:!0,
replace:!0
}));
};
}(this),
error:function(_this) {
return function(xhr) {
_this.$(e.currentTarget).html("Submit answer & continue"), _this.$(e.currentTarget).removeAttr("disabled");
try {
return data = JSON.parse(xhr.responseText), data.error ? _this.showError(data.error) :_this.showError();
} catch (_error) {
return _this.showError();
}
};
}(this)
}, _.contains([ "file_upload", "code_upload" ], this.model.get("type")) !== !0 || _.isString(this.view.answer()) || (data = {
qid:this.model.get("unique_id")
}, request_params.iframe = !0, request_params.processData = !1, request_params.data = data, 
request_params.files = this.view.answer()), $.ajax(request_params)) :HR.util.alert({
title:"Submit error",
message:"Please answer the question before submitting."
});
}, RecruitCandidateQuestionView.prototype.showError = function(err) {
return null == err && (err = "Unable to save your answer."), HR.util.candidatemsg("" + err + "<br><br>Click continue to refresh question listing.<br><br><a href='" + this.tid + "/questions' class='backbone btn'>Continue</a>", !1);
}, RecruitCandidateQuestionView.prototype._render = function() {
var cnt, problem_statement, q, viewfound;
switch (this.question = this.model.attributes, $(this.el).html(HR.appController.template(this.template, this)({
tid:this.tid,
question:this.question
})), viewfound = !0, this.question.type) {
case "code":
case "approx":
this.view = new HR.RecruitCandidateCodingView({
question:this.question
});
break;

case "design":
this.view = new HR.RecruitCandidateDesignView({
question:this.question,
model:this.model
});
break;

case "mcq":
case "multiple_mcq":
this.view = new HR.RecruitCandidateMcqView({
question:this.question
});
break;

case "textAns":
this.view = new HR.RecruitCandidateSubjectiveView({
question:this.question
});
break;

case "complete":
for (q = this.question.complete_string, cnt = 0, problem_statement = "<h4>Complete the blanks in the following question with the appropriate answer.</h4><br/>", 
problem_statement += _.isEmpty(this.question.question) ? "" :this.question.question; -1 !== q.search("{blank}"); ) q = q.replace("{blank}", "<input type='text' class='complete-question' name='blank" + cnt + "'/>"), 
cnt += 1;
problem_statement += q, this.view = new HR.RecruitCandidateCompleteView({
question:this.question
});
break;

case "file_upload":
this.view = new HR.RecruitCandidateFileUploadView({
question:this.question
});
break;

case "code_upload":
this.view = new HR.RecruitCandidateCodeUploadView({
question:this.question
});
break;

case "uml":
case "electrical":
this.view = new HR.RecruitCandidateUMLView({
question:this.question
});
break;

default:
viewfound = !1;
}
return this.question.name ? this.$(".qtitle").html("" + this.question.name + " (" + window.istreet.cfg.hrqn[this.question.type] + ")") :this.$(".qtitle").html(window.istreet.cfg.hrqn[this.question.type]), 
"complete" === this.question.type ? this.$(".challenge-text").html(problem_statement) :this.$(".challenge-text").html(this.question.question), 
viewfound ? this.$(".qcontent").html(this.view.render().el) :(this.$(".qcontent").html("<center>This question type is not available.</center>"), 
this.$(".ans-submit").addClass("disabled")), HR.candidate.lastQuestionViewed = this.model.get("qno"), 
"True" !== HR.candidate.candidateTestModel.get("enable_copy_paste") && $(document).on("cut copy paste contextmenu", function(e) {
return $(e.target).parents("#editor").length ? void 0 :e.preventDefault();
}), setTimeout(function() {
return HR.util.scrollToTop();
}, 200), this;
}, RecruitCandidateQuestionView;
}(window.HR.GenericView), RecruitCandidateCodingView = function(_super) {
function RecruitCandidateCodingView() {
return RecruitCandidateCodingView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateCodingView, _super), RecruitCandidateCodingView.prototype.template = "recruit/question-coding", 
RecruitCandidateCodingView.prototype.className = "question-coding", RecruitCandidateCodingView.prototype.initialize = function(options) {
return this.question = options.question, this.test = HR.candidate.candidateTestModel || options.test, 
this.codeshell = null, window.error_marker_widgets = [], HR.candidate && HR.candidate.candidateAttemptModel ? (this.aid = HR.candidate.candidateAttemptModel.get("id"), 
HR.appView.saveCodeOnNavigate = !0) :this.aid = "testing", this.autoSaveNamespace = options.disableLocalStorage && options.disableLocalStorage === !0 ? null :"" + this.aid + "-" + this.question.unique_id, 
this.compilingLock = !1, this;
}, RecruitCandidateCodingView.prototype.events = {
"codeshellcompile #editor":"compileAnswer",
"click #testcase-dl":"testcaseDownload"
}, RecruitCandidateCodingView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), this.show_template = !0, this.question.hide_template && "true" === this.question.hide_template.toLowerCase() && (this.show_template = !1), 
this.test.get("hide_template") && "true" === this.test.get("hide_template").toLowerCase() && (this.show_template = !1), 
HR.appController.loadCodeMirror(function(_this) {
return function() {
return _this.applyCodeshell();
};
}(this), function() {
return function() {
return HR.util.candidatemsg("Unable to load code editor.<br><br> Check your internet connection, and refresh the page to fix this.", !1);
};
}(this)), this;
}, RecruitCandidateCodingView.prototype.testcaseDownload = function() {
var url;
return url = "/recruit/attempts/" + HR.candidate.candidateAttemptModel.id + "/questions/" + this.question.unique_id + "/testcases", 
HR.util.downloadURL(url);
}, RecruitCandidateCodingView.prototype.applyCodeshell = function() {
var opts;
return opts = {
languages:this.question.languages,
language:"c",
showFileTree:!1,
autoSaveNamespace:this.autoSaveNamespace,
lang_template:this.getLangDefaults(),
showNonEditableHeadTail:this.show_template,
lang_head_template:this.getLangHeads(),
lang_tail_template:this.getLangTails(),
compile_button_text:"Run Code",
submit_button_text:"Submit code & Continue",
showSubmit:!0,
showCustomInput:this.showCustomInput(),
dynamicMode:!0,
lang_line_nos:this.question.line_nos,
enableIntellisense:!0,
loadmode:function() {
return function(e, data) {
return HR.appController.loadCodeMirrorMode(data.lang, function() {
return data.callback();
});
};
}(this)
}, ("True" === this.test.get("hide_compile_test") || "True" === this.question.hide_compile_test) && (opts.showCompileTest = !1), 
"testing" === this.aid && (opts.showSubmit = !1, opts.showCompileTest = !1), opts.showCompileTest !== !1 && (opts.showCompileTest = !0), 
this.$("#editor").codeshell(opts), this.$("#editor").codeshell("refresh"), this.$("#editor").codeshell("onChange", function(_this) {
return function(e, change) {
return _this.deleteMarkersOnSource(e, change);
};
}(this)), this.set_answer(), setTimeout(function(_this) {
return function() {
return _this.setDefaultText = !0;
};
}(this), 3e3);
}, RecruitCandidateCodingView.prototype.getLangDefaults = function() {
var l, m, _i, _len, _ref;
for (m = {}, _ref = this.question.languages, _i = 0, _len = _ref.length; _len > _i; _i++) l = _ref[_i], 
this.question[l + "_template"] && (m[l] = this.question[l + "_template"]);
return m;
}, RecruitCandidateCodingView.prototype.getLangHeads = function() {
var l, m, _i, _len, _ref;
if (m = {}, this.show_template) for (_ref = this.question.languages, _i = 0, _len = _ref.length; _len > _i; _i++) l = _ref[_i], 
this.question[l + "_template_head"] && (m[l] = this.question[l + "_template_head"]);
return m;
}, RecruitCandidateCodingView.prototype.getLangTails = function() {
var l, m, _i, _len, _ref;
if (m = {}, this.show_template) for (_ref = this.question.languages, _i = 0, _len = _ref.length; _len > _i; _i++) l = _ref[_i], 
this.question[l + "_template_tail"] && (m[l] = this.question[l + "_template_tail"]);
return m;
}, RecruitCandidateCodingView.prototype.showCustomInput = function() {
return this.question.custom_testcase_allowed && "False" === this.question.custom_testcase_allowed ? !1 :!0;
}, RecruitCandidateCodingView.prototype.compileAnswer = function(e, data) {
return data.code && !$(".bb-compile").hasClass("disabled") ? (data.custominput && (data.customtestcase = !0), 
$(".bb-compile").addClass("disabled"), this.deleteMarkersOnSource(), HR.candidate.ctmodel = new HR.CandidateCompileTestModel(), 
HR.candidate.ctmodel.setAid(this.aid), HR.candidate.ctmodel.setQid(this.question.unique_id), 
"runalltestcases" === e && HR.candidate.ctmodel.setAllCases(!0), HR.candidate.ctview = new HR.RecruitCandidateCompileTestView(), 
this.$("#runstatus").html(HR.candidate.ctview.render().el), HR.util.scrollToBottom(1e3), 
HR.candidate.ctmodel.save(data, {
success:function(_this) {
return function() {
return HR.candidate.ctview.setStatus("Uploaded. Waiting for results.."), HR.candidate.ctloop = setTimeout(function() {
return _this.checkForResult(_this, data, e);
}, 2e3);
};
}(this),
error:function() {
return function() {
return $(".bb-compile").removeClass("disabled"), HR.candidate.ctmodel = null, HR.candidate.ctview.setStatus("Could not compile as server is unreachable.");
};
}(this)
})) :void 0;
}, RecruitCandidateCodingView.prototype.checkForResult = function(that, data, e, liveStatus) {
return null == liveStatus && (liveStatus = null), HR.candidate.ctloop ? (HR.candidate.ctview.setStatus(liveStatus ? liveStatus :"Processing.."), 
HR.candidate.ctmodel.fetch({
success:function(_this) {
return function(m) {
var expected_output, i, input, msg, output, output_debug, pass, score, st_class, _i, _len, _ref;
if (0 === m.get("status")) return liveStatus = m.get("status_string") ? m.get("status_string") :null, 
HR.candidate.ctloop = setTimeout(function() {
return that.checkForResult(that, data, e, liveStatus);
}, 2e3), void 0;
if (0 !== m.get("status")) if ($(".bb-compile").removeClass("disabled"), clearTimeout(HR.candidate.ctloop), 
HR.candidate.ctloop = null, m.get("result") > 0) HR.candidate.ctview.setStatus("Error.", "red"), 
HR.candidate.ctview.setCompileStatus("Compilation failed.", m.get("compilemessage")), 
that.addMarkersOnSource(m); else if (pass = 0, m.get("customtestcase")) HR.candidate.ctview.setStatus("Compiled successfully.", "orange"), 
input = m.get("stdin")[0], output = m.get("stdout")[0], output_debug = m.get("stdout_debug") ? m.get("stdout_debug")[0] :null, 
st_class = "txt-green", HR.candidate.ctview.addTestCase(1, input, output, output_debug, null, "", st_class, score); else {
for (_ref = m.get("testcase_status"), i = _i = 0, _len = _ref.length; _len > _i; i = ++_i) input = _ref[i], 
output = m.get("stdout")[i], expected_output = m.get("expected_output")[i], output_debug = m.get("stdout_debug") ? m.get("stdout_debug")[i] :null, 
msg = m.get("testcase_message")[i], 1 === m.get("testcase_status")[i] ? (st_class = "txt-green", 
pass++) :st_class = "txt-orange", m.get("score") && _.isNumber(m.get("score")[i]) && (score = m.get("score")[i]), 
HR.candidate.ctview.addTestCase(i + 1, input, output, output_debug, expected_output, msg, st_class, score);
0 === m.get("testcase_status").length ? HR.candidate.ctview.setStatus("Compiled successfully.", "orange") :0 === pass ? HR.candidate.ctview.setStatus("No test cases passed.", "red") :i > pass ? "runalltestcases" === e ? HR.candidate.ctview.setStatus("Compiled successfully. " + pass + "/" + i + " test cases passed.", "orange") :HR.candidate.ctview.setStatus("Compiled successfully. " + pass + "/" + i + " sample test cases passed.", "orange") :"runalltestcases" !== e ? (HR.candidate.ctview.setStatus("Compiled successfully. All sample test cases passed!", "green"), 
_this.$(".bb-runall").show(), that.compileAnswer("runalltestcases", data)) :HR.candidate.ctview.setStatus("Compiled successfully. All test cases passed!", "green");
}
return HR.util.scrollToBottom(1e3);
};
}(this),
error:function() {
return function() {
return HR.candidate.ctmodel = null, $(".bb-compile").removeClass("disabled"), HR.candidate.ctview.setStatus("Unable to fetch compile information from server.");
};
}(this)
})) :void 0;
}, RecruitCandidateCodingView.prototype.answer = function() {
return this.$("#editor").codeshell("value");
}, RecruitCandidateCodingView.prototype.set_answer = function() {
return this.question.solve ? this.$("#editor").codeshell("setValue", this.question.solve.answer) :void 0;
}, RecruitCandidateCodingView.prototype.checkCopyPaste = function(change) {
var added_text;
if (this.setDefaultText && (added_text = change.text.join(""), added_text !== this.lastAddedText)) return this.lastAddedText = added_text, 
"paste" === change.origin && added_text.length > 100 ? HR.candidate.secureActivity.add({
action:"paste",
eid:9,
qid:this.question.unique_id,
insertTime:new Date()
}) :void 0;
}, RecruitCandidateCodingView.prototype.addMarkersOnSource = function(data) {
var editor, error_markers, error_message, i, line_number, line_offset, marker_node, markers, total_lines;
if (data.get("error_markers")) {
editor = window.codeEditor, error_markers = data.get("error_markers"), total_lines = editor.lineCount(), 
line_offset = error_markers.head_code_lines, markers = error_markers.markers;
for (i in markers) error_message = markers[i].message, line_number = markers[i].line_number, 
line_number -= line_offset, total_lines >= line_number && (marker_node = $("<div class='error-marker'><span class='error-marker-icon'>!</span>" + error_message + "</div>"), 
window.error_marker_widgets.push(editor.addLineWidget(line_number - 1, marker_node[0], {
above:!0
})));
return this.$("#editor").codeshell("refresh");
}
}, RecruitCandidateCodingView.prototype.deleteMarkersOnSource = function(e, change) {
var editor, i;
if (e && change && HR.candidate && HR.candidate.candidateAttemptModel && "True" === HR.candidate.candidateAttemptModel.get("secure") && this.checkCopyPaste(change), 
0 !== window.error_marker_widgets.length) {
editor = window.codeEditor;
for (i in window.error_marker_widgets) editor.removeLineWidget(window.error_marker_widgets[i]);
return this.$("#editor").codeshell("refresh"), window.error_marker_widgets = [];
}
}, RecruitCandidateCodingView;
}(window.HR.GenericView), RecruitCandidateDesignView = function(_super) {
function RecruitCandidateDesignView() {
return this.hideLoading = __bind(this.hideLoading, this), RecruitCandidateDesignView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateDesignView, _super), RecruitCandidateDesignView.prototype.template = "recruit/question-design", 
RecruitCandidateDesignView.prototype.className = "question-design", RecruitCandidateDesignView.prototype.initialize = function(options) {
return this.question = options.question, this.test = HR.candidate.candidateTestModel || options.test, 
this.codeshell = null, this.aid = HR.candidate && HR.candidate.candidateAttemptModel ? HR.candidate.candidateAttemptModel.get("id") :"testing", 
this.autoSaveNamespace = "testing" === this.aid ? "" + this.aid + "-" + this.test.id + "-" + this.question.id :"" + this.aid + "-" + this.question.unique_id, 
"true" === this.question.multiple_files ? this.initFileTree() :this.multipleFiles = !1, 
this;
}, RecruitCandidateDesignView.prototype.events = {
"click .bb-compile":"renderAnswer"
}, RecruitCandidateDesignView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), this.$("#runstatus").load(this.hideLoading), this.show_template = !1, HR.appController.loadCodeMirror(function(_this) {
return function() {
return _this.applyCodeshell();
};
}(this), function() {
return function() {
return HR.util.alert({
message:"There was an error loading the code editor. Please refresh the page."
});
};
}(this)), this;
}, RecruitCandidateDesignView.prototype.initFileTree = function() {
var performAction, that;
return that = this, performAction = function(opts) {
var node_path;
return node_path = null, node_path = opts.node_path ? opts.node_path :$.jstree.reference("#filetree").get_path(opts.node).join("/"), 
$.ajax({
url:"" + that.model.url() + "/files",
type:"POST",
data:{
node:opts.node,
operation:opts.operation,
node_path:node_path,
new_path:opts.new_name ? opts.new_name :void 0
},
success:opts.success,
error:opts.error
});
}, this.multipleFiles = {
data:this.question.file_tree,
onSave:function(node) {
return node.original && node.original.readOnly ? "" :performAction({
node:node,
operation:"save",
success:function() {},
error:function() {
return console.log("error");
}
});
},
fetch:function(treeObj, cb) {
return performAction({
node:treeObj.node,
operation:"fetch",
success:function(data) {
return treeObj.node.original.fileContents = data.fileContents, cb(treeObj);
},
error:function() {
return treeObj.node.original.fileContents = {
code:"File not supported.",
mime_type:"text/plain"
}, treeObj.node.original.readOnly = !0, cb(treeObj);
}
});
},
onCreate:function(node, node_parent) {
return "file" === node.type ? performAction({
node:node,
node_path:$.jstree.reference("#filetree").get_path(node_parent).join("/") + ("/" + node.text),
operation:"create",
success:function() {},
error:function() {
return console.log("error");
}
}) :void 0;
},
onRename:function(node, node_parent, new_name) {
return "file" === node.type || node.children.length > 0 ? performAction({
node:node,
operation:"rename",
new_name:new_name,
success:function() {},
error:function() {
return console.log("error");
}
}) :void 0;
},
onDelete:function(node) {
return "file" === node.type || node.children.length > 0 ? performAction({
node:node,
operation:"delete",
success:function() {},
error:function() {
return console.log("error");
}
}) :void 0;
}
};
}, RecruitCandidateDesignView.prototype.applyCodeshell = function() {
var opts, tabs, tabs_tooltip;
return opts = {
showFileTree:this.multipleFiles,
autoSaveNamespace:this.autoSaveNamespace,
lang_template:this.getLangDefaults(),
compile_button_text:"Render",
submit_button_text:"Submit code & Continue",
showSubmit:!0,
languageChangeStyle:"tabs",
showCustomInput:!1,
dynamicMode:!0,
enableIntellisense:!1,
loadmode:function() {
return function(e, data) {
return HR.appController.loadCodeMirrorMode(data.lang, function() {
return data.callback();
});
};
}(this)
}, this.multipleFiles || (opts.languages = this.question.languages, opts.language = "html", 
opts.showNonEditableHeadTail = this.show_template), "testing" === this.aid && (opts.showSubmit = !1, 
opts.showCompileTest = !0), opts.showCompileTest !== !1 && (opts.showCompileTest = !0), 
this.$("#editor").codeshell(opts), this.multipleFiles || (this.$("#select-lang").addClass("hidden"), 
this.$("#select-lang-tabs").remove(), tabs = "<div id='select-lang-tabs'> <div class='pull-left btn-group'>", 
this.question.languages.forEach(function(v) {
return tabs += "<a class='cursor btn btn-white " + (v === opts.language ? "active" :void 0) + "' data-lang='" + v + "'>" + lang_display_mapping[v] + "</a>";
}), tabs += "</div> </div>", tabs_tooltip = $("<span class=' pull-left icon-help-circled txt-blue psT psB psL' data-toggle='tooltip' data-placement='right' title='The tabs on the left help you view the corresponding code segment.'></span>").tooltip(), 
tabs = $(tabs), tabs.find("a").on({
click:function(_this) {
return function(e) {
return e.preventDefault(), tabs.find("a").removeClass("active"), _this.$("#editor").codeshell("saveLangCode"), 
_this.$("#editor").codeshell("changeLanguage", _this.$(e.currentTarget).addClass("active").data("lang"));
};
}(this)
}), this.$("#editor > div.grey-header").prepend(tabs.append(tabs_tooltip))), $("#render-help").remove(), 
this.$("#editor .bb-compile").parent().prepend($("<span id='render-help' class='pull-left icon-help-circled txt-blue psT psB psR' data-toggle='tooltip' data-placement='left' title='Press \"Render\" Button to view the visual output of your code. Press \"Submit code & Continue\" to submit your answer. '></span>").tooltip()), 
this.$("#editor").codeshell("refresh"), this.set_answer(), setTimeout(function(_this) {
return function() {
return _this.setDefaultText = !0;
};
}(this), 3e3);
}, RecruitCandidateDesignView.prototype.getLangDefaults = function() {
var l, m, _i, _len, _ref;
for (m = {}, _ref = this.question.languages, _i = 0, _len = _ref.length; _len > _i; _i++) l = _ref[_i], 
this.question[l + "_template"] && (m[l] = this.question[l + "_template"]);
return m;
}, RecruitCandidateDesignView.prototype.hideLoading = function() {
return this.$(".bb-compile").length ? (this.setStatus("Document prepared successfully.", "green"), 
this.$(".bb-compile").removeClass("disabled"), this.$("#runstatus-load").addClass("hidden"), 
this.$("#runstatus").removeClass("hidden")) :void 0;
}, RecruitCandidateDesignView.prototype.renderAnswer = function(e, data) {
var form_elem;
if (!$(".bb-compile").hasClass("disabled")) return this.$(".bb-compile").addClass("disabled").data("status", "sending"), 
"testing" !== this.aid ? (HR.candidate.dtmodel = new HR.CandidateDesignTestModel(), 
HR.candidate.dtmodel.setAid(this.aid), HR.candidate.dtmodel.setQid(this.question.unique_id)) :(HR.candidate.dtmodel = new HR.RecruitDesignTestModel(), 
HR.candidate.dtmodel.setQid(this.question.id), HR.candidate.dtmodel.setTid(this.test.id)), 
this.$("#runstatus").addClass("hidden"), this.$("#runstatus-load").removeClass("hidden"), 
data = this.answer(), this.setStatus("Preparing the document...", "black"), "testing" !== this.aid ? HR.candidate.dtmodel.save(data, {
success:function(_this) {
return function(m) {
var init_url;
return _this.setStatus("Loading document.."), init_url = HR.development ? "" + window.location.protocol + "//design." + window.location.host :"" + window.location.protocol + "//design.hackerrank.com", 
_this.$("#runstatus").attr("src", "" + init_url + m.url() + "/" + m.get("id")), 
HR.util.scrollToBottom(1e3);
};
}(this),
error:function(_this) {
return function() {
return HR.candidate.dtmodel = null, _this.setStatus("There was an issue with rendering this code.", "red");
};
}(this)
}) :(form_elem = $('<form target="runstatus" action="' + HR.candidate.dtmodel.url() + '" method="post">\n<input type="hidden" name="testing_design" />\n</form>'), 
form_elem.find('input[name="testing_design"]').val(JSON.stringify(data)), form_elem.submit());
}, RecruitCandidateDesignView.prototype.answer = function() {
return this.$("#editor").codeshell("value", !0);
}, RecruitCandidateDesignView.prototype.setStatus = function(s, additional_class) {
return null == additional_class && (additional_class = ""), this.$(".output-area-wrap").removeClass("hidden"), 
this.$(".status-msg").html(s), "" !== additional_class ? this.$(".status-msg").addClass(additional_class) :void 0;
}, RecruitCandidateDesignView.prototype.set_answer = function() {
var m;
return !this.multipleFiles && this.question.solve ? (m = {}, _.each(this.question.solve.answer, function(data) {
return m[data.language] = data.code;
}), this.$("#editor").codeshell("setOption", "lang_template", m), this.$("#editor").codeshell("setValue", {
language:"html",
code:m.html
})) :void 0;
}, RecruitCandidateDesignView.prototype.checkCopyPaste = function(change) {
var added_text;
if (this.setDefaultText && (added_text = change.text.join(""), added_text !== this.lastAddedText)) return this.lastAddedText = added_text, 
"paste" === change.origin && added_text.length > 100 ? HR.candidate.secureActivity.add({
action:"paste",
eid:9,
qid:this.question.unique_id,
insertTime:new Date()
}) :void 0;
}, RecruitCandidateDesignView;
}(window.HR.GenericView), RecruitCandidateMcqView = function(_super) {
function RecruitCandidateMcqView() {
return RecruitCandidateMcqView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateMcqView, _super), RecruitCandidateMcqView.prototype.template = "recruit/question-mcq", 
RecruitCandidateMcqView.prototype.className = "question-mcq", RecruitCandidateMcqView.prototype.events = {
"click .clearall":"clearAll"
}, RecruitCandidateMcqView.prototype.initialize = function(options) {
return this.question = options.question;
}, RecruitCandidateMcqView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), this.set_answer(), this;
}, RecruitCandidateMcqView.prototype.clearAll = function(e) {
return e.preventDefault(), this.$('input[name="mcqopts"]').attr("checked", !1);
}, RecruitCandidateMcqView.prototype.answer = function() {
var answer, o;
return "mcq" === this.question.type ? (o = this.$("input[name=mcqopts]:checked").val(), 
answer = o ? o :this.question.solve ? -1 :null, this.question.explanation_box && "true" === this.question.explanation_box ? {
explanation:this.$("textarea[name=explanation]").val(),
answer:answer
} :answer) :(o = [], _.each(this.$("input[name=mcqopts]:checked"), function(_this) {
return function(e) {
return o.push(_this.$(e).val());
};
}(this)), o.length ? o :this.question.solve ? -1 :null);
}, RecruitCandidateMcqView.prototype.set_answer = function() {
var ans, metadata, _i, _len, _ref, _results;
if (this.question.solve) {
if ("mcq" !== this.question.type) {
for (_ref = this.question.solve.answer.answer, _results = [], _i = 0, _len = _ref.length; _len > _i; _i++) ans = _ref[_i], 
_results.push(this.$("input#mcqopts" + ans).prop("checked", !0));
return _results;
}
return this.$("input#mcqopts" + this.question.solve.answer.answer).prop("checked", !0), 
this.question.explanation_box && "true" === this.question.explanation_box && this.question.solve.metadata ? (metadata = JSON.parse(this.question.solve.metadata), 
this.$("textarea[name=explanation]").val(metadata.explanation)) :void 0;
}
}, RecruitCandidateMcqView;
}(window.HR.GenericView), RecruitCandidateSubjectiveView = function(_super) {
function RecruitCandidateSubjectiveView() {
return RecruitCandidateSubjectiveView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateSubjectiveView, _super), RecruitCandidateSubjectiveView.prototype.template = "recruit/question-subjective", 
RecruitCandidateSubjectiveView.prototype.className = "question-subjective", RecruitCandidateSubjectiveView.prototype.initialize = function(options) {
return this.question = options.question, HR.candidate && HR.candidate.candidateAttemptModel ? (this.aid = HR.candidate.candidateAttemptModel.get("id"), 
this.autoSaveNamespace = "" + this.aid + "-" + this.question.unique_id, HR.appView.saveCodeOnNavigate = !0) :(this.aid = "testing", 
this.autoSaveNamespace = null);
}, RecruitCandidateSubjectiveView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), HR.appController.loadCodeMirror(function(_this) {
return function() {
return _this.applyCodeshell(), _this.set_answer();
};
}(this)), this;
}, RecruitCandidateSubjectiveView.prototype.applyCodeshell = function() {
var opts;
return opts = {
languages:[ "text" ],
language:"text",
autoSaveNamespace:this.autoSaveNamespace,
showSubmit:!1,
showCompileTest:!1,
dynamicMode:!0,
showCustomInput:!1,
lang_line_nos:this.question.line_nos,
loadmode:function() {
return function(e, data) {
return data.callback();
};
}(this)
}, this.$("#editor").codeshell(opts), this.$("#editor").codeshell("refresh");
}, RecruitCandidateSubjectiveView.prototype.answer = function() {
return this.$("#editor").codeshell("value");
}, RecruitCandidateSubjectiveView.prototype.set_answer = function() {
return this.question.solve ? this.$("#editor").codeshell("setValue", {
code:this.question.solve.answer.answer,
language:"text"
}) :void 0;
}, RecruitCandidateSubjectiveView;
}(window.HR.GenericView), RecruitCandidateFileUploadView = function(_super) {
function RecruitCandidateFileUploadView() {
return RecruitCandidateFileUploadView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateFileUploadView, _super), RecruitCandidateFileUploadView.prototype.template = "recruit/question-fileupload", 
RecruitCandidateFileUploadView.prototype.className = "question-fileupload", RecruitCandidateFileUploadView.prototype.initialize = function(options) {
return this.question = options.question;
}, RecruitCandidateFileUploadView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), this.set_answer(), window.view = this, this;
}, RecruitCandidateFileUploadView.prototype.answer = function() {
return $(":file").val() ? $(":file") :this.question.solve && this.question.solve.answer ? this.question.solve.answer :!1;
}, RecruitCandidateFileUploadView.prototype.set_answer = function() {
return this.question.solve ? this.show_answer(this.question.solve) :void 0;
}, RecruitCandidateFileUploadView.prototype.show_answer = function(solve) {
var answer, fileName, html, metadata;
return fileName = "", answer = solve.answer, solve.metadata && (metadata = JSON.parse(solve.metadata), 
metadata.filename && (fileName = metadata.filename)), html = HR.util.getFileAnchor(answer, fileName), 
this.$("#current_answer").html(html), this.$(".current-answer-section").removeClass("hidden");
}, RecruitCandidateFileUploadView;
}(window.HR.GenericView), RecruitCandidateCodeUploadView = function(_super) {
function RecruitCandidateCodeUploadView() {
return RecruitCandidateCodeUploadView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateCodeUploadView, _super), RecruitCandidateCodeUploadView.prototype.template = "recruit/question-code-upload", 
RecruitCandidateCodeUploadView.prototype.className = "question-code-upload", RecruitCandidateCodeUploadView.prototype.initialize = function(options) {
return this.question = options.question;
}, RecruitCandidateCodeUploadView.prototype.events = function() {
return {
"click button[name=run-code]":"runCode"
};
}, RecruitCandidateCodeUploadView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), this.set_answer(), window.view = this, this;
}, RecruitCandidateCodeUploadView.prototype.enableRunCode = function() {
return this.$("button[name=run-code]").removeClass("disabled").removeAttr("disabled");
}, RecruitCandidateCodeUploadView.prototype.disableRunCode = function() {
return this.$("button[name=run-code]").addClass("disabled").attr("disabled", !0);
}, RecruitCandidateCodeUploadView.prototype.showError = function(error) {
return HR.candidate.ctview.setStatus(error);
}, RecruitCandidateCodeUploadView.prototype.runCode = function(e) {
var answer, data, request_params;
return this.$("#runstatus").empty(), this.disableRunCode(), answer = this.answer(), 
data = {}, data.customtestcase = !1, data.kind = "project", data.language = "maven", 
HR.candidate.ctview = new HR.RecruitCandidateCompileTestView(), answer ? (this.$("#runstatus").html(HR.candidate.ctview.render().el), 
HR.util.scrollToBottom(1e3), request_params = {
url:"/recruit/attempts/" + this.aid + "/questions/" + this.question.unique_id + "/compile_tests?allcases=" + !0,
data:data,
dataType:"json",
type:"POST",
success:function(_this) {
return function(xhr) {
return xhr.error ? (_this.enableRunCode(), _this.showError(xhr.error)) :(HR.candidate.ctmodel = new HR.CandidateCompileTestModel(), 
HR.candidate.ctmodel.setAid(_this.aid), HR.candidate.ctmodel.setQid(_this.question.unique_id), 
HR.candidate.ctmodel.set("id", xhr.model.id), HR.candidate.ctview.setStatus("Uploaded. Waiting for results.."), 
HR.candidate.ctloop = setTimeout(function() {
return _this.checkForResult(_this, data, e);
}, 2e3));
};
}(this),
error:function(_this) {
return function(xhr) {
return _this.enableRunCode(), HR.candidate.ctview.setStatus(xhr.error);
};
}(this)
}, _.isString(answer) ? request_params.data.answer = answer :(request_params.iframe = !0, 
request_params.processData = !1, request_params.files = answer), $.ajax(request_params)) :(this.showError("Please upload a file"), 
void 0);
}, RecruitCandidateCodeUploadView.prototype.checkForResult = function(that, data, e) {
return HR.candidate.ctloop ? (HR.candidate.ctview.setStatus("Processing.."), HR.candidate.ctmodel.fetch({
success:function(_this) {
return function(m) {
var pass;
return 0 === m.get("status") ? (HR.candidate.ctloop = setTimeout(function() {
return that.checkForResult(that, data, e);
}, 2e3), void 0) :(0 !== m.get("status") && (_this.enableRunCode(), m.get("upload_url") && (_this.show_answer(m.get("upload_url")), 
_this.uploaded_answer = m.get("upload_url")), clearTimeout(HR.candidate.ctloop), 
HR.candidate.ctloop = null, m.get("result") > 0 ? (HR.candidate.ctview.setStatus("Error.", "red"), 
HR.candidate.ctview.setCompileStatus("Compilation failed.", m.get("compilemessage"))) :(pass = 0, 
m.get("signal") && 0 === m.get("signal")[0] ? (HR.candidate.ctview.setStatus("Build successful", "green"), 
HR.candidate.ctview.setSuccessfulCompileStatus("Build successful.", m.get("compilemessage"))) :(HR.candidate.ctview.setStatus("Error.", "red"), 
HR.candidate.ctview.setCompileStatus("Build failed.", m.get("compilemessage"))))), 
HR.util.scrollToBottom(1e3));
};
}(this),
error:function(_this) {
return function() {
return HR.candidate.ctmodel = null, _this.enableRunCode(), HR.candidate.ctview.setStatus("Unable to fetch compile information from server.");
};
}(this)
})) :void 0;
}, RecruitCandidateCodeUploadView.prototype.answer = function() {
return $(":file").val() ? $(":file") :this.question.solve && this.question.solve.answer ? this.question.solve.answer :this.uploaded_answer ? this.uploaded_answer :!1;
}, RecruitCandidateCodeUploadView.prototype.set_answer = function() {
return this.question.solve ? this.show_answer(this.question.solve.answer) :void 0;
}, RecruitCandidateCodeUploadView.prototype.show_answer = function(answer) {
var html;
return html = HR.util.getFileAnchor(answer), this.$("#current_answer").html(html), 
this.$(".current-answer-section").removeClass("hidden");
}, RecruitCandidateCodeUploadView;
}(window.HR.GenericView), RecruitCandidateCompleteView = function(_super) {
function RecruitCandidateCompleteView() {
return RecruitCandidateCompleteView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateCompleteView, _super), RecruitCandidateCompleteView.prototype.template = "recruit/question-completesentence", 
RecruitCandidateCompleteView.prototype.className = "question-complete", RecruitCandidateCompleteView.prototype.initialize = function(options) {
return this.question = options.question;
}, RecruitCandidateCompleteView.prototype._render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), this;
}, RecruitCandidateCompleteView.prototype.postrender = function() {
return setTimeout(function(_this) {
return function() {
return _this.set_answer();
};
}(this));
}, RecruitCandidateCompleteView.prototype.answer = function() {
return _.map($('input[name^="blank"]'), function(e) {
return $(e).val();
});
}, RecruitCandidateCompleteView.prototype.set_answer = function() {
var cnt;
return this.question.solve ? (cnt = 0, _.each(this.question.solve.answer, function(v) {
return $('input[name="blank' + cnt + '"]').val(v), cnt += 1;
})) :void 0;
}, RecruitCandidateCompleteView;
}(window.HR.GenericView), RecruitCandidateUMLView = function(_super) {
function RecruitCandidateUMLView() {
return this.saveUml = __bind(this.saveUml, this), RecruitCandidateUMLView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateUMLView, _super), RecruitCandidateUMLView.prototype.template = "recruit/question-uml", 
RecruitCandidateUMLView.prototype.className = "question-uml", RecruitCandidateUMLView.prototype.initialize = function(options) {
return this.question = options.question, HR.candidate && HR.candidate.candidateAttemptModel ? (this.aid = HR.candidate.candidateAttemptModel.get("id"), 
this.autoSaveNamespace = "" + this.aid + "-" + this.question.unique_id, HR.appView.saveCodeOnNavigate = !0) :(this.aid = "testing", 
this.autoSaveNamespace = null), this.umlStorageKey = this.autoSaveNamespace + "-" + this.question.hash, 
HR.appController.loadGraphLibraries(function(_this) {
return function() {
return _this.editor = new Editor();
};
}(this), function() {
return console.log("error");
});
}, RecruitCandidateUMLView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), HR.appController.loadCodeMirror(function(_this) {
return function() {
return _this.applyCodeshell(), _this.set_answer();
};
}(this)), HR.appController.loadGraphLibraries(function(_this) {
return function() {
return _this.initializeUMLView();
};
}(this), function() {
return console.log("error");
}), this;
}, RecruitCandidateUMLView.prototype.initializeUMLView = function() {
var choices;
if (this.localSubmissionData = $.jStorage.get(this.umlStorageKey), this.xml = "", 
this.xml = this.localSubmissionData ? this.localSubmissionData.xml :null, this.question.custom_draw_menus) choices = this.question.custom_draw_menus; else switch (this.question.type) {
case "uml":
choices = [ "uml" ];
break;

case "electrical":
choices = [ "electrical" ];
break;

default:
choices = [];
}
return this.ui = new EditorUi(this.editor, choices, this.$("#geEditor")[0]), this.xml && this.ui && mxGraphFiles.load_xml(this.ui, this.xml), 
this.ui ? setTimeout(this.saveUml, 3e3) :void 0;
}, RecruitCandidateUMLView.prototype.saveUml = function() {
return this.saveUmlTimeout && ($.jStorage.set(this.umlStorageKey, mxGraphFiles.save(this.ui)), 
clearTimeout(this.saveUmlTimeout)), this.saveUmlTimeout = setTimeout(function(_this) {
return function() {
return _this.saveUml();
};
}(this), 3e3);
}, RecruitCandidateUMLView.prototype.applyCodeshell = function() {
var opts;
return opts = {
languages:[ "text" ],
language:"text",
autoSaveNamespace:this.autoSaveNamespace,
showSubmit:!1,
showCompileTest:!1,
dynamicMode:!0,
showCustomInput:!1,
lang_line_nos:this.question.line_nos,
loadmode:function() {
return function(e, data) {
return data.callback();
};
}(this)
}, this.$("#editor").codeshell(opts), this.$("#editor").codeshell("refresh");
}, RecruitCandidateUMLView.prototype.answer = function() {
var umlDiag;
return umlDiag = mxGraphFiles.save(this.ui), {
description:this.$("#editor").codeshell("value").code,
svg:umlDiag.svg,
xml:umlDiag.xml
};
}, RecruitCandidateUMLView.prototype.set_answer = function() {
return this.question.solve ? this.$("#editor").codeshell("setValue", {
code:this.question.solve.answer.answer,
language:"text"
}) :void 0;
}, RecruitCandidateUMLView;
}(window.HR.GenericView), RecruitCandidateFooterView = function(_super) {
function RecruitCandidateFooterView() {
return RecruitCandidateFooterView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateFooterView, _super), RecruitCandidateFooterView.prototype.template = "recruit/footer", 
RecruitCandidateFooterView.prototype.className = "footer", RecruitCandidateFooterView.prototype.initialize = function() {}, 
RecruitCandidateFooterView.prototype.render = function() {
var footer_copyright;
return $("footer").show(), footer_copyright = HR.candidate.candidateTestModel.get("footer_copyright"), 
$(this.el).html(HR.appController.template(this.template, this)({
test:HR.candidate.candidateTestModel.toJSON()
})), this;
}, RecruitCandidateFooterView;
}(window.HR.GenericView), RecruitCandidateTopBarView = function(_super) {
function RecruitCandidateTopBarView() {
return RecruitCandidateTopBarView.__super__.constructor.apply(this, arguments);
}
var TIME_LEFT_FOR_ALERT;
return __extends(RecruitCandidateTopBarView, _super), RecruitCandidateTopBarView.prototype.template = "recruit/topbar", 
RecruitCandidateTopBarView.prototype.className = "topbar", TIME_LEFT_FOR_ALERT = 300, 
RecruitCandidateTopBarView.prototype.fullScreeenMode = function() {
return screenfull && !(HR.candidate.candidateAttemptModel.get("attempt_done") && HR.candidate.candidateAttemptModel.get("attempt_done") === !0 || (clearTimeout(this.fullscreenTimer), 
this.fullscreenTimer = setTimeout(function(_this) {
return function() {
return screenfull.isFullscreen || 0 !== $(".hr-dialog").length || (_this.renderedDialog = !1), 
_this.fullScreeenMode();
};
}(this), 2e3), this.renderedDialog)) ? ("undefined" == typeof this.renderedDialog && document.addEventListener(screenfull.raw.fullscreenchange, function(_this) {
return function() {
return screenfull.isFullscreen || "logout" === HR.candidate.candidateTestModel.action ? void 0 :(_this.renderedDialog = !1, 
_this.fullScreeenMode());
};
}(this)), this.renderedDialog = !0, HR.util.alert({
title:"Switch to full screen mode",
message:"Please switch to full screen mode to proceed to test",
callback:function() {
return screenfull.enabled ? (Backbone.History.started && Backbone.history.stop(), 
Backbone.history.start({
pushState:!1,
root:"/tests"
}), Backbone.history.navigate("" + HR.candidate.candidateTestModel.get("unique_id") + "/questions", !0), 
screenfull.request()) :void 0;
}
})) :void 0;
}, RecruitCandidateTopBarView.prototype.secureMonitoring = function() {
var logEvent;
if (!this.secureMonitoringActive && HR.candidate.candidateAttemptModel) return this.secureMonitoringActive = !0, 
logEvent = function(data) {
return data.insertTime = new Date(), HR.candidate.secureActivity.add(data);
}, window.onblur = function() {
return logEvent({
action:"blur",
eid:7
});
}, window.onfocus = function() {
return logEvent({
action:"focus",
eid:8
});
};
}, RecruitCandidateTopBarView.prototype.initialize = function() {
return Offline.options = {
reconnect:{
initialDelay:3
},
requests:!1,
game:!1
};
}, RecruitCandidateTopBarView.prototype.getTimeLeft = function() {
var tl;
return tl = HR.candidate.candidateTestModel.get("sectional") ? HR.candidate.candidateAttemptModel.get("section_time_left") :HR.candidate.candidateAttemptModel.get("time_left");
}, RecruitCandidateTopBarView.prototype.timerForSection = function() {
return HR.candidate.candidateTestModel.get("sectional") && HR.candidate.candidateAttemptModel.get("section_time_left") !== HR.candidate.candidateAttemptModel.get("time_left");
}, RecruitCandidateTopBarView.prototype.setAlertClass = function(time_left) {
return time_left < this.TIME_LEFT_FOR_ALERT ? $(".timerspan").addClass("alerttimer") :$(".timerspan").removeClass("alerttimer");
}, RecruitCandidateTopBarView.prototype.updateTimer = function() {
var time_left;
return time_left = this.getTimeLeft(), setTimeout(function(_this) {
return function() {
return $("#countdown-timer").countdown("destroy").countdown({
until:time_left,
layout:"{d<}{dn}{dl} {d>} {hnn}:{mnn}:{snn}",
compact:!0
}), $("#countdown-timer").countdown("option", "onExpiry", _this.testTimeUp), $("#countdown-timer").countdown("option", "tickInterval", 5), 
$("#countdown-timer").countdown("option", "onTick", function(a) {
return 0 === a[0] && 0 === a[1] && 0 === a[2] && 0 === a[3] && 0 === a[4] ? (time_left = 60 * a[5] + a[6], 
_this.setAlertClass(time_left)) :void 0;
}), _this.setAlertClass(time_left), _this.timerForSection() ? $("#timertag").html("to section end") :$("#timertag").html("to test end");
};
}(this));
}, RecruitCandidateTopBarView.prototype.render = function() {
var LONG_PING_TIME, QUICK_PING_TIME, interval, qcount, qdone;
return $(this.el).html(HR.appController.template(this.template, this)({
test:HR.candidate.candidateTestModel,
attempt:HR.candidate.candidateAttemptModel,
showalert:this.getTimeLeft < this.TIME_LEFT_FOR_ALERT
})), HR.candidate.candidateAttemptModel.get("secure") && "True" === HR.candidate.candidateAttemptModel.get("secure") ? (this.secureMonitoring(), 
HR.requires([ "screenfull/dist/screenfull" ], function(_this) {
return function() {
return _this.fullScreeenMode();
};
}(this))) :HR.candidate.windowFocushookPresent || (HR.candidate.windowFocushookPresent = !0, 
window.onfocus = function() {
return function() {
return HR.candidate.windowBlurred = !1, HR.candidate.showFocusMessage ? (HR.candidate.showFocusMessage = !1, 
HR.util.alert({
title:"Refresh needed",
message:"The test state changed while you were away, and will be refreshed shortly.",
timeout:15,
callback:function() {
var uid;
if (HR.candidate && HR.candidate.candidateTestModel) return uid = HR.candidate.candidateTestModel.get("unique_id"), 
HR.router.navigate("" + uid + "/redirect", {
trigger:!0,
replace:!0
});
}
})) :void 0;
};
}(this), window.onblur = function() {
return function() {
return HR.candidate.windowBlurred = !0;
};
}(this)), this.updateTimer(), HR.candidate.pingTimer && clearInterval(HR.candidate.pingTimer), 
HR.candidate.candidateAttemptModel.get("attempt_done") ? HR.appView.setTopbarView() :(qdone = _.keys(HR.candidate.candidateAttemptModel.get("solve_mapping") || {}).length, 
qcount = HR.candidate.candidateAttemptModel.get("questions").length, this.$(".qdone").html(qdone), 
this.$(".qcount").html(qcount), this.$(".progress-done").css({
width:Math.floor(100 * qdone / qcount)
}), LONG_PING_TIME = 6e4, QUICK_PING_TIME = 1e4, interval = this.getTimeLeft() < 100 ? QUICK_PING_TIME :LONG_PING_TIME, 
HR.candidate.pingTimer = setInterval(function(_this) {
return function() {
var ans, dat, outerSection, saving, sectional;
return dat = {
pong:!0
}, HR.candidate.currentQuestion && (ans = HR.candidate.questionView.getAnswerToSave(), 
saving = !1, ans && (saving = !0, dat.to_save_code = ans, dat.qid = HR.candidate.questionView.model.get("unique_id"))), 
saving && HR.candidate.questionView.view.$("#editor").codeshell("setStatusText", "Saving draft.."), 
HR.candidate.candidateTestModel ? (sectional = HR.candidate.candidateTestModel.get("sectional"), 
sectional && (outerSection = HR.candidate.candidateAttemptModel.get("section")), 
HR.candidate.candidateAttemptModel.save({
data:dat
}, {
success:function(model) {
return saving && HR.candidate.questionView.view.$("#editor").codeshell("setStatusText", "Draft saved " + moment().format("hh:mm a")), 
HR.candidate.windowBlurred && (sectional && model.get("section") !== outerSection || model.get("attempt_done")) ? HR.candidate.showFocusMessage = !0 :HR.candidate.showFocusMessage ? void 0 :_this.updateTimer();
},
error:function() {
return saving ? HR.candidate.questionView.view.$("#editor").codeshell("setStatusText", "Unable to save draft.") :void 0;
}
})) :void 0;
};
}(this), interval)), this;
}, RecruitCandidateTopBarView.prototype.testTimeUp = function() {
return HR.candidate.pingTimer && clearInterval(HR.candidate.pingTimer), HR.candidate.candidateTestModel.get("sectional") && HR.candidate.candidateAttemptModel.get("time_left") > 30 ? ($("#countdown-timer").countdown("destroy").html("Section done."), 
$(".timerspan").removeClass("alerttimer"), $("#timertag").empty(), HR.candidate.showFocusMessage = !1, 
HR.util.alert({
title:"Section closed",
message:"You have exceeded the time limit set for this section.<br><br>All answers you submitted before the time limit have been saved. You will automatically be moved to the next section shortly.",
timeout:15,
callback:function() {
var uid;
return uid = HR.candidate.candidateTestModel.get("unique_id"), HR.candidate.attemptRefreshNeeded = !0, 
HR.router.navigate("" + uid + "/redirect", {
trigger:!0,
replace:!0
});
}
})) :($("#countdown-timer").countdown("destroy").html("Test done."), $(".timerspan").removeClass("alerttimer"), 
$("#timertag").empty(), HR.candidate.showFocusMessage = !1, HR.util.alert({
title:"Test finished",
message:"Thank you for taking this test. You have exceeded the time limit set for this test.<br><br>All answers you submitted before the time limit have been saved.<br><br>You will shortly be redirected to the feedback page.",
timeout:60,
callback:function() {
return HR.candidate.candidateTestModel.setAction("logout"), HR.candidate.candidateTestModel.save({
how:"forced"
}, {
success:function() {
return function(m) {
return HR.router.navigate("" + m.get("unique_id") + "/redirect", {
trigger:!0,
replace:!0
});
};
}(this)
});
}
}));
}, RecruitCandidateTopBarView;
}(window.HR.GenericView), RecruitCandidateSideBarView = function(_super) {
function RecruitCandidateSideBarView() {
return RecruitCandidateSideBarView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateSideBarView, _super), RecruitCandidateSideBarView.prototype.template = "recruit/sidebar", 
RecruitCandidateSideBarView.prototype.className = "sbar", RecruitCandidateSideBarView.prototype.icon_types = {
QUESTION_ANSWERED:"nav",
QUESTION_UNANSWERED:1,
QUESTION_LIST:2
}, RecruitCandidateSideBarView.prototype.events = {
"click .js-navlink":"handleNav"
}, RecruitCandidateSideBarView.prototype.render = function() {
var url;
return HR.candidate.ongoingQuestionNavigation = !1, url = Backbone.history.fragment, 
$(this.el).html(HR.appController.template(this.template, this)), this.$(".fixed-nav").html(this.getTopIcons()), 
url.endsWith("questions") || url.endsWith("questions/") || (this.$(".questions-nav").html(this.getQuestionIcons()), 
HR.candidate.lastQuestionViewed && setTimeout(function(_this) {
return function() {
return _this.$(".qnav-" + HR.candidate.lastQuestionViewed)[0] && _this.$(".qnav-" + HR.candidate.lastQuestionViewed)[0].scrollIntoView(), 
_this.delegateEvents();
};
}(this))), this;
}, RecruitCandidateSideBarView.prototype.handleNav = function(e) {
var me, myhref;
return e.preventDefault(), me = this.$(e.currentTarget), me.hasClass("disabled") || HR.candidate.ongoingQuestionNavigation ? void 0 :(myhref = me.attr("href"), 
this.$(".js-navlink").removeAttr("href"), this.$(".js-navlink").addClass("disabled"), 
me.removeClass("disabled"), HR.candidate.attemptRefreshNeeded = !0, HR.candidate.ongoingQuestionNavigation = !0, 
setTimeout(function() {
return HR.candidate.ongoingQuestionNavigation = !1;
}, 1e4), HR.router.navigate(myhref, {
trigger:!0,
replace:!0
}));
}, RecruitCandidateSideBarView.prototype.getTopIcons = function() {
var cls, html, url;
return html = "", url = Backbone.history.fragment, cls = "", (url.endsWith("questions") || url.endsWith("questions/")) && (cls = "active"), 
html += '<li class="' + cls + '"><a href="' + HR.candidate.candidateTestModel.get("unique_id") + '/questions" class="backbone js-navlink"><i class="nav-icon icon-list-bullet-large"></i></a></li>', 
cls = "", (url.endsWith("instructions") || url.endsWith("instructions/")) && (cls = "active"), 
html += '<li class="' + cls + '"><a href="' + HR.candidate.candidateTestModel.get("unique_id") + '/instructions" class="backbone js-navlink"><i class="nav-icon icon-help-circled"></i></a></li>';
}, RecruitCandidateSideBarView.prototype.getQuestionIcons = function() {
var active, answered, answered_qs, elhtml, label, li_gen, q, qs, _i, _len, _ref;
for (elhtml = "", li_gen = function(answered, disabled, active, link, label) {
var act, ans, btnclass, dis, href;
return ans = answered ? "answered" :"not-answered", dis = disabled ? "disabled" :"", 
act = active ? "active" :"", btnclass = disabled || active ? "" :"js-navlink", href = disabled || active ? "" :"href='" + link + "'", 
'<li class="qnav-' + label + " " + ans + " " + dis + " " + act + '">\n  <a ' + href + ' class="' + btnclass + '">\n      <span class="quest-number">' + label + "</span>\n  </a>\n</li>";
}, qs = HR.candidate.candidateAttemptModel.get("questions"), answered_qs = _.keys(HR.candidate.candidateAttemptModel.get("solve_mapping")), 
label = 1, _i = 0, _len = qs.length; _len > _i; _i++) q = qs[_i], _ref = q.unique_id.toString(), 
answered = __indexOf.call(answered_qs, _ref) >= 0, active = q.unique_id === HR.candidate.currentQuestion, 
elhtml += q.disabled ? li_gen(answered, !0, active, "", label) :li_gen(answered, !1, active, "" + HR.candidate.candidateTestModel.get("unique_id") + "/questions/" + q.unique_id, label), 
label += 1;
return elhtml;
}, RecruitCandidateSideBarView;
}(window.HR.GenericView), RecruitCandidateCompileTestView = function(_super) {
function RecruitCandidateCompileTestView() {
return RecruitCandidateCompileTestView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateCompileTestView, _super), RecruitCandidateCompileTestView.prototype.template = "recruit/compiletest-base", 
RecruitCandidateCompileTestView.prototype.className = "ct-base", RecruitCandidateCompileTestView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)), this;
}, RecruitCandidateCompileTestView.prototype.setStatus = function(s, additional_class) {
return null == additional_class && (additional_class = ""), this.$(".status-msg").html(s), 
"" !== additional_class ? this.$(".status-msg").addClass(additional_class) :void 0;
}, RecruitCandidateCompileTestView.prototype.setCompileStatus = function(title, message) {
return this.$(".compile-header").html(title), this.$(".compile-message").html(message), 
this.$("#error-message").removeClass("hide");
}, RecruitCandidateCompileTestView.prototype.setSuccessfulCompileStatus = function(title, message) {
return this.$(".compile-header").html(title), this.$(".compile-message").html(message), 
this.$("#success-message").removeClass("hide");
}, RecruitCandidateCompileTestView.prototype.addTestCase = function(tno, input, output, output_debug, exp_output, compiler_msg, st_class, score) {
var tc;
return tc = new HR.RecruitCandidateTestCaseView({
tno:tno,
input:input,
output:output,
exp_output:exp_output,
st_class:st_class,
compiler_msg:compiler_msg,
output_debug:output_debug,
score:score
}), this.$(".testcases").append(tc.render().el);
}, RecruitCandidateCompileTestView;
}(window.HR.GenericView), RecruitCandidateTestCaseView = function(_super) {
function RecruitCandidateTestCaseView() {
return RecruitCandidateTestCaseView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateTestCaseView, _super), RecruitCandidateTestCaseView.prototype.template = "recruit/compiletest-testcase", 
RecruitCandidateTestCaseView.prototype.classname = "test-case-wrap", RecruitCandidateTestCaseView.prototype.initialize = function(o) {
return this.tno = o.tno, this.input = o.input, this.output = o.output, this.exp_output = o.exp_output, 
this.compiler_msg = o.compiler_msg, this.st_class = o.st_class, this.output_debug = o.output_debug, 
this.score = o.score;
}, RecruitCandidateTestCaseView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
tno:this.tno,
input:this.input,
output:this.output,
exp_output:this.exp_output,
compiler_msg:this.compiler_msg,
st_class:this.st_class,
output_debug:this.output_debug,
score:this.score
})), this;
}, RecruitCandidateTestCaseView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.RecruitCandidateListView = RecruitCandidateListView, 
HR.RecruitCandidateQuestionView = RecruitCandidateQuestionView, HR.RecruitCandidateCodingView = RecruitCandidateCodingView, 
HR.RecruitCandidateDesignView = RecruitCandidateDesignView, HR.RecruitCandidateMcqView = RecruitCandidateMcqView, 
HR.RecruitCandidateSubjectiveView = RecruitCandidateSubjectiveView, HR.RecruitCandidateCompleteView = RecruitCandidateCompleteView, 
HR.RecruitCandidateFileUploadView = RecruitCandidateFileUploadView, HR.RecruitCandidateUMLView = RecruitCandidateUMLView, 
HR.RecruitCandidateTopBarView = new RecruitCandidateTopBarView(), HR.RecruitCandidateFooterView = new RecruitCandidateFooterView(), 
HR.RecruitCandidateSideBarView = new RecruitCandidateSideBarView(), HR.RecruitCandidateCompileTestView = RecruitCandidateCompileTestView, 
HR.RecruitCandidateTestCaseView = RecruitCandidateTestCaseView, HR.RecruitCandidateInstructionsView = RecruitCandidateInstructionsView, 
HR.RecruitCandidateCodeUploadView = RecruitCandidateCodeUploadView;
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
var HR, RecruitCandidateLoginView, RecruitFacebookResumeView, RecruitInfoView, RecruitMessageView, RecruitMismatchView, _ref;
return RecruitCandidateLoginView = function(_super) {
function RecruitCandidateLoginView() {
return RecruitCandidateLoginView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateLoginView, _super), RecruitCandidateLoginView.prototype.template = "recruit/login", 
RecruitCandidateLoginView.prototype.className = "candidate-login", RecruitCandidateLoginView.prototype.events = {
"click .test-submit":"loginAction",
"click .test-submit-feedback":"submitFeedback",
"click .test-logout":"logoutTest",
"click .fblogin":"loginToFB",
"blur input.error":"removeError"
}, RecruitCandidateLoginView.prototype.initialize = function() {}, RecruitCandidateLoginView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
test:this.model.attributes
})), this.model.get("facebook_login") && !window.fbAdded && (window.fbAdded = !0, 
$.getScript("/assets/fb.js")), this.model.get("logged_in") && this.model.get("attempt_done") && setTimeout(function(_this) {
return function() {
return _this.$(".main-content").addClass("customer-feedback-box");
};
}(this)), $(this.el).find("div.gray").length > 0 && setTimeout(function(_this) {
return function() {
return _this.render();
};
}(this)), this;
}, RecruitCandidateLoginView.prototype.removeError = function(e) {
return $(e.target).removeClass("error").closest(".error").removeClass("error");
}, RecruitCandidateLoginView.prototype.resetError = function() {
var $err;
return $err = this.$("#error-message"), $err.find("header").html(""), $err.find("p").html(""), 
this.$(".formgroup").removeClass("error").find("[name]").removeClass("error"), $err.hide();
}, RecruitCandidateLoginView.prototype.setError = function(title, message, alertclass, field_name) {
var $err, duration, top;
return null == alertclass && (alertclass = null), null == field_name && (field_name = null), 
$err = this.$("#error-message"), $err.find("header").html(title), $err.find("p").html(message), 
alertclass && this.$("#error-message").addClass(alertclass), field_name && this.$("[name=" + field_name + "]").addClass("error").closest(".formgroup").addClass("error"), 
$err.show(), top = $err.position().top, duration = parseInt(top, 10) / 2, setTimeout(function() {
return $("html,body").animate({
scrollTop:top
}, duration);
}, 0);
}, RecruitCandidateLoginView.prototype.loginAction = function(e) {
var email, form_data, pass, put_data, request_params, that, uniqid;
if (this.disableButton("test-submit"), that = this, e.preventDefault(), this.resetError(), 
email = this.$("input[name=username]").val(), pass = this.$("input[name=password]").val(), 
null == this.model.get("enable_acknowledgement") || "True" === this.model.get("enable_acknowledgement")) {
if (!this.$("#acknowledge").is(":checked")) return this.enableButton("test-submit"), 
!this.$("#acknowledge-alert").length > 0 && this.$("#login-form").before('<div class="text-center alert error error-message" id="acknowledge-alert"> You cannot take this test without agreeing to the specified conditions. </div>'), 
void 0;
this.$("#acknowledge-alert").remove();
}
return form_data = $("#test-login-form").serializeArray(), put_data = {}, _.each(form_data, function(item) {
return "gender" !== item.name ? put_data[item.name] = item.value :("on" === $("input#gender-m:checked").val() && (put_data.gender = "m"), 
"on" === $("input#gender-f:checked").val() ? put_data.gender = "f" :void 0);
}), put_data.tauth_key = this.model.auth, $("#acknowledge").is(":checked") && (put_data.acknowledge = "on"), 
uniqid = this.model.get("unique_id"), request_params = {
url:"/recruit/tests/" + uniqid + "/login",
data:put_data,
type:"POST",
success:function(_this) {
return function(xhr) {
var r;
return r = "string" == typeof xhr ? $.parseJSON($(xhr).text()) :xhr, HR.candidate.candidateTestModel.set(r.model), 
r.status ? (HR.util.trackTotango("Candidate Attempted", "Tests"), r.model.attempt_done ? HR.router.navigate("" + uniqid) :HR.router.navigate("" + uniqid + "/questions", {
trigger:!0,
replace:!0
}), void 0) :(_this.enableButton("test-submit"), that.setError(r.message.title, r.message.body, null, r.message.field_name));
};
}(this),
error:function(_this) {
return function(xhr) {
var r;
return _this.enableButton("test-submit"), r = "string" == typeof xhr.responseText ? $.parseJSON($(xhr.responseText).text()) :xhr.responseText, 
r && r.message ? that.setError(r.message.title, r.message.body, r.message.alertclass, r.message.field_name) :that.setError("Login error", "There was an issue logging into the test");
};
}(this)
}, $(":file").length > 0 && (request_params.iframe = !0, request_params.processData = !1, 
request_params.data = put_data, request_params.files = $(":file")), $.ajax(request_params), 
this;
}, RecruitCandidateLoginView.prototype.submitFeedback = function() {
return this.disableButton("test-submit-feedback"), HR.candidate.candidateAttemptModel.set("feedback_text", this.$(".feedback-text").val()), 
HR.candidate.candidateAttemptModel.save(null, {
success:function(_this) {
return function() {
return $.removeCookie("email", {
path:"/"
}), $.removeCookie("tid", {
path:"/"
}), _this.enableButton("test-submit-feedback"), _this.logoutTest();
};
}(this),
error:function() {
return this.enableButton("test-submit-feedback"), console.log("Could not submit feedback.");
}
});
}, RecruitCandidateLoginView.prototype.logoutTest = function() {
return HR.clearCookies(), window.candidate = {}, this.$(".main-content").html("<h3>Thank you!</h3><br/><br/><p>The test is done. You may close this window, or head on to  <a href='//www.hackerrank.com'>hackerrank.com</a> and solve challenges.</p>");
}, RecruitCandidateLoginView.prototype.disableButton = function(cssClass) {
return this.$("button." + cssClass).attr("disabled", !0).addClass("disabled");
}, RecruitCandidateLoginView.prototype.enableButton = function(cssClass) {
return this.$("button." + cssClass).attr("disabled", !1).removeClass("disabled");
}, RecruitCandidateLoginView.prototype.loginToFB = function() {
return window.location = this.model.get("facebook_login_url");
}, RecruitCandidateLoginView;
}(window.HR.GenericView), RecruitInfoView = function(_super) {
function RecruitInfoView() {
return RecruitInfoView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitInfoView, _super), RecruitInfoView.prototype.template = "recruit/instructiontabs", 
RecruitInfoView.prototype.className = "ins-tabs", RecruitInfoView.prototype.initialize = function(options) {
return this.subpage = options.subpage, this.public_url = options.public_url;
}, RecruitInfoView.prototype.events = {
"click .js-tablink":"tabClick",
"click .js-anchor":"anchorClick",
"click .js-gototop":"gotoTop"
}, RecruitInfoView.prototype.gotoTop = function(e) {
return e.preventDefault(), $("html, body").animate({
scrollTop:0
}, "slow");
}, RecruitInfoView.prototype.anchorClick = function(e) {
var sect;
return e.preventDefault(), sect = this.$(e.currentTarget).attr("name"), console.log(sect, "a[name=" + sect + "]"), 
this.$("a[name=" + sect + "]")[1].scrollIntoView();
}, RecruitInfoView.prototype.tabClick = function(e) {
var ele, href, tabid;
return e.preventDefault(), ele = this.$(e.currentTarget), tabid = ele.attr("id"), 
href = ele.attr("href"), ele.parent().parent().find("li").removeClass("active"), 
this.$("li#" + tabid).addClass("active"), this.$(".js-content").addClass("hidden"), 
this.$(".js-content-" + tabid).removeClass("hidden"), this.public_url ? HR.router.navigate(href, {
replace:!0,
trigger:!1
}) :void 0;
}, RecruitInfoView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
subpage:this.subpage,
public_url:this.public_url,
test:HR.candidate.candidateTestModel
})), this;
}, RecruitInfoView;
}(window.HR.GenericView), RecruitFacebookResumeView = function(_super) {
function RecruitFacebookResumeView() {
return RecruitFacebookResumeView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitFacebookResumeView, _super), RecruitFacebookResumeView.prototype.template = "recruit/fbresume", 
RecruitFacebookResumeView.prototype.className = "candidate-fb", RecruitFacebookResumeView.prototype.events = {
"click .starttest":"startTest"
}, RecruitFacebookResumeView.prototype.initialize = function(options) {
return this.model = options.model, this.data = options.data;
}, RecruitFacebookResumeView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
test:this.model.attributes,
data:this.data
})), this;
}, RecruitFacebookResumeView.prototype.startTest = function() {
var p, req_params;
return p = this.$(".userprofile").val(), p ? (req_params = {
type:"put",
url:"/recruit/tests/" + this.model.get("unique_id") + "/fb_login",
data:{
profile:p
},
success:function(_this) {
return function() {
return HR.router.navigate("" + _this.model.get("unique_id") + "/questions", {
trigger:!0,
replace:!0
});
};
}(this),
error:function(_this) {
return function(e) {
return window.candidatemessage = JSON.parse(e.responseText).message, HR.router.navigate("" + _this.model.get("unique_id") + "/message", {
trigger:!0,
replace:!0
});
};
}(this)
}, $.ajax(req_params)) :new HR.util.ShowConfirmationDialog({
body:"Please enter a short profile about yourself.",
title:"Empty profile.",
buttons:[ {
name:"OK",
callback:function(dialog) {
return dialog.destroy();
}
} ]
}).render();
}, RecruitFacebookResumeView;
}(window.HR.GenericView), RecruitMessageView = function(_super) {
function RecruitMessageView() {
return RecruitMessageView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitMessageView, _super), RecruitMessageView.prototype.template = "recruit/candidatemessage", 
RecruitMessageView.prototype.className = "candidate-message", RecruitMessageView.prototype.initialize = function(options) {
return this.model = options.model, this.message = options.message;
}, RecruitMessageView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
test:this.model && this.model.attributes || {},
message:this.message
})), this;
}, RecruitMessageView;
}(window.HR.GenericView), RecruitMismatchView = function(_super) {
function RecruitMismatchView() {
return RecruitMismatchView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitMismatchView, _super), RecruitMismatchView.prototype.template = "recruit/candidatemismatch", 
RecruitMismatchView.prototype.className = "candidate-mismatch", RecruitMismatchView.prototype.events = {
"click .js-gotoother":"logoutGotoOther"
}, RecruitMismatchView.prototype.logoutGotoOther = function(e) {
return e.preventDefault(), HR.clearCookies(), HR.candidate.candidateTestModel = null, 
HR.candidate.candidateAttemptModel = null, HR.candidate.attemptRefreshNeeded = !1, 
HR.router.navigate(this.$(e.currentTarget).attr("href"), {
trigger:!0,
replace:!0
});
}, RecruitMismatchView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
test:HR.candidate.candidateTestModel.toJSON()
})), this;
}, RecruitMismatchView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.RecruitCandidateLoginView = RecruitCandidateLoginView, 
HR.RecruitFacebookResumeView = RecruitFacebookResumeView, HR.RecruitMessageView = RecruitMessageView, 
HR.RecruitMismatchView = RecruitMismatchView, HR.RecruitInfoView = RecruitInfoView;
});
}.call(this);