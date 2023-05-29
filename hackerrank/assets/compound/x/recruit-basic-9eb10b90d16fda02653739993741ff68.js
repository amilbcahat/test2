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
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var AddUserTeamView;
return AddUserTeamView = function(_super) {
function AddUserTeamView() {
return AddUserTeamView.__super__.constructor.apply(this, arguments);
}
var HR, _ref;
return __extends(AddUserTeamView, _super), AddUserTeamView.prototype.template = "x/add-user-team-modal", 
AddUserTeamView.prototype.tagName = "div", AddUserTeamView.prototype.initialize = function(options) {
return this.parent = options.parent, this.currentUser = HR.currentUser, this.users = options.users, 
this.userLabels = options.userLabels, this.team_id = options.team_id, AddUserTeamView.__super__.initialize.call(this, options);
}, AddUserTeamView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this.$("input[name=new-user-team-id]").val(this.team_id), this.$("#add-user-modal").modal(), 
this.userLabels && this.$("input[name=new-user-name]").typeahead({
source:this.userLabels,
onselect:function(_this) {
return function(item) {
var user;
return user = _this.users[item].toJSON(), _this.$("input[name=new-user-label]").val(item), 
_this.$("input[name=new-user-email]").val(user.email).attr("disabled", !0), _this.$("select[name=new-user-role]").val(user.role).attr("disabled", !0), 
user.firstname + " " + user.lastname;
};
}(this)
}), this;
}, AddUserTeamView.prototype.events = function() {
return {
"submit form[name=team-member-form]":"checkForPayment"
};
}, AddUserTeamView.prototype.checkForPayment = function(e) {
var candidates_permission, email, firstname, lastname, name, nameComponents, newUserLabel, questions_permission, role, team_id, tests_permission, user_data;
if (e.preventDefault(), $(".alert-error").addClass("hidden"), newUserLabel = $("input[name=new-user-label]").val(), 
role = $("select[name=new-user-role]").val(), name = $("input[name=new-user-name]").val(), 
email = $("input[name=new-user-email]").val(), team_id = $("input[name=new-user-team-id]").val(), 
tests_permission = $("input[name=new-user-tests-permission]").attr("checked") ? 2 :1, 
questions_permission = $("input[name=new-user-questions-permission]").attr("checked") ? 2 :1, 
candidates_permission = $("input[name=new-user-candidates-permission]").attr("checked") ? 2 :1, 
nameComponents = name.split(" "), firstname = nameComponents.shift(), lastname = nameComponents.join(" "), 
user_data = {
role:role,
firstname:firstname,
lastname:lastname,
email:email,
team_id:team_id,
tests_permission:tests_permission,
questions_permission:questions_permission,
candidates_permission:candidates_permission
}, newUserLabel && this.users[newUserLabel]) user_data.user_id = this.users[newUserLabel].get("user_id"); else if ("developer" !== role && "trial" !== this.currentUser.get("company").striple_plan && this.userLabels.length >= 30) return alert("You can add only upto 30 users in the trial period"), 
null;
return this.addUser(user_data);
}, AddUserTeamView.prototype.addUser = function(user_data) {
return this.model.save(user_data, {
suppressMessage:!0,
success:function(_this) {
return function() {
return $("button.close").click(), _this.collection.fetch();
};
}(this),
error:function(_this) {
return function(model, xhr) {
var response;
return response = $.parseJSON(xhr.responseText), 402 === xhr.status ? (_this.$("button.close").click(), 
setTimeout(function() {
return _this.checkout(user_data);
}, 500)) :void 0;
};
}(this)
});
}, AddUserTeamView.prototype.checkout = function(data) {
var checkout_data;
return checkout_data = {}, checkout_data.payment_type = "user", checkout_data.user_data = data, 
HR.UserSettings.set("checkout", checkout_data), Backbone.history.navigate("/payments/checkout", !0);
}, HR = null != (_ref = window.HR) ? _ref :{}, HR.AddUserTeamView = AddUserTeamView, 
AddUserTeamView;
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
model:_model,
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
return response = $.parseJSON(xhr), _this.$(".alert-error").html(response.message);
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
return e.preventDefault(), $(".alert-error").addClass("hidden"), tests_permission = $("input[name=edit-user-tests-permission]").attr("checked") ? 2 :1, 
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
return response = $.parseJSON(xhr.responseText), _this.$(".alert-error").html(response.message), 
_this.$(".alert-error").removeClass("hidden");
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
return that = this;
}, EditInterviewView.prototype.template = "x/interview-edit", EditInterviewView.prototype.className = "interview-edit", 
EditInterviewView.prototype.events = function() {
return {
"submit form[name=quick-pad-form]":"createQuickPad",
"click .js-add-interviewer":"addInterviewer",
"click .js-edit-attendant":"editAttendant",
"click .js-done":"done",
"click .js-share-pad":"sharePad"
};
}, EditInterviewView.prototype.render = function() {
var content, that;
return that = this, content = HR.appController.template(this.template, this)({
throbber:HR.appController.viewLoader(),
model:this.model.toJSON(),
just_created:"new interview" === HR.NotificationModel.pop()
}), $(this.el).html(content), this;
}, EditInterviewView.prototype.setupTimezoneSelect = function() {
return setTimeout(function() {
return $.post("http://localhost.com/recruit2/user/timezones", function(data) {
return $("#timezone_container").html(data), $("#timezones").select2({
width:"360px",
matcher:function(term, text, option) {
var alias, arr;
return arr = [], arr.push(text, $(option).val()), alias = $(option).attr("data-alias"), 
alias && arr.push.apply(arr, alias.split(",")), _.some(arr, function(x) {
return x.toUpperCase().indexOf(term.toUpperCase()) > -1;
});
}
});
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
var attendant_data, candidates, email, interviewers, name, phone;
return e.preventDefault(), name = this.$("input[name=name]").removeClass("error").val(), 
email = this.$("input[name=email]").removeClass("error").val(), phone = this.$("input[name=phone]").val(), 
_.isEmpty(name) ? (this.$("input[name=name]").addClass("error"), void 0) :_.isEmpty(email) ? (this.$("input[name=email]").addClass("error"), 
void 0) :(attendant_data = {
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
return function() {
return _this.$(".close").click(), _this.parent.render();
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
"submit form[name=share-pad-form]":"sharePad"
};
}, SharePadModalView.prototype.render = function() {
var config, content, that;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON()
}), $(this.el).html(content), this.$("#share-pad-modal").modal(), config = {
skin:"moono",
extraPlugins:"image",
filebrowserUploadUrl:"/xrest/editor_uploads",
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
}, SharePadModalView.prototype.sharePad = function(e) {
var content, email, subject;
return e.preventDefault(), email = this.$("input[name=email]").removeClass("error").val(), 
subject = this.$("input[name=subject]").val(), content = this.$("textarea[name=email-content]").ckeditorGet().getData(), 
-1 === email.lastIndexOf(" ") && -1 !== email.lastIndexOf(".") && -1 !== email.lastIndexOf("@") && email.lastIndexOf(".") > email.lastIndexOf("@") ? (HR.util.ajaxmsg("Loading...", !1, !0, 1e3), 
$.post("/xrest/interviews/share", {
email:email,
subject:subject,
content:content
}, function(_this) {
return function(data) {
return data.status === !0 ? (console.log("mail sent"), HR.util.ajaxmsg("Mail sent", !1, !0, 5), 
_this.$(".close").click()) :console.log("mail failed");
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
var DeleteInterviewModalView, HR, InterviewsDashboardView, InterviewsDataTableView, InterviewsDoneDataTableView, InterviewsDoneView, InterviewsListingView, InterviewsThumbsDownDataTableView, InterviewsThumbsDownView, InterviewsThumbsUpDataTableView, InterviewsThumbsUpView, InterviewsUpcomingDataTableView, InterviewsUpcomingView, range, val, _ref;
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
url:"" + HR.INTERVIEWS_DOMAIN + "/api/interviews?api_key=" + HR.currentUser.get("apiKey"),
modelClass:HR.InterviewModel
};
}, InterviewsDataTableView.prototype.baseParams = function() {
var ret;
return ret = {
order_by:"from"
}, range(this.$("#daterange").val()) && (ret.from = range(this.$("#daterange").val())), 
"0" !== this.$("#interviewer").val() && (ret["interview_attendants.role"] = "interviewer", 
ret["interview_attendants.email"] = this.$("#interviewer").val()), "0" !== this.$("#thumbs").val() && (ret.thumbs = parseInt(this.$("#thumbs").val() - 1)), 
ret;
}, InterviewsDataTableView.prototype.beforeRequest = function(params) {
var base;
return base = InterviewsDataTableView.__super__.beforeRequest.call(this, params), 
range(this.$("#daterange").val()) && (base.from = range(this.$("#daterange").val())), 
base;
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
template:'<%= row.interviewer() ? row.interviewer().name : "-" %>',
prop:"interview_attendants.name",
className:"w25"
} ];
}, InterviewsDataTableView.prototype.events = function() {
return {
"click .js-dateclear":"clearDateRange"
};
}, InterviewsDataTableView.prototype.datatableOpt = function() {
var opt;
return opt = InterviewsDataTableView.__super__.datatableOpt.call(this), this.dashboard ? _.extend(opt, {
sDom:"t",
iDisplayLength:10
}) :_.extend(opt, {
sDom:"t <'clear_float'> <'empty_heightspacer'><'clear_float'>l p <'empty_heightspacer'><'clear_float'><'empty_heightspacer'><'clear_float'> "
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
this.redraw();
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
}, InterviewsDataTableView.prototype.redraw = function() {
return HR.util.ajaxmsg("Loading...", !1, !0, 1e3), this.datatable.fnDraw();
}, InterviewsDataTableView.prototype.postRender = function() {
var that;
return InterviewsDataTableView.__super__.postRender.call(this), that = this, this.delegateEvents(), 
this.$("#interviewer").select2({
width:"150px"
}), this.$("#interviewer").on("change", function(_this) {
return function() {
return _this.redraw();
};
}(this)), this.$("#thumbs").select2({
width:"150px"
}), this.$("#thumbs").on("change", function(_this) {
return function() {
return _this.redraw();
};
}(this)), this.$("#daterange").length > 0 && this.$("#daterange").daterangepicker({
latestDate:"today",
separator:" to ",
format:"YYYY-MM-DD",
ranges:val(this.dateRanges)
}, function() {
return that.$(".js-dateclear").removeClass("hidden"), that.redraw();
}), $.ajax({
url:"" + HR.INTERVIEWS_DOMAIN + "/api/interviewers?api_key=" + HR.currentUser.get("apiKey"),
data:{
"interview.from":this.baseParams().from
},
dataType:"json",
crossDomain:!0,
xhrFields:{
withCredentials:!0
},
success:function(_this) {
return function(data) {
return _.each(data.results, function(row) {
return row.email ? _this.$("#interviewer").append('<option value="' + row.email + '">' + row.name + "<option>") :void 0;
});
};
}(this)
});
}, InterviewsDataTableView;
}(window.HR.DataTableView), InterviewsListingView = function(_super) {
function InterviewsListingView() {
return InterviewsListingView.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewsListingView, _super), InterviewsListingView.prototype.template = "/x/interviews-listing", 
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
})), this.async || this.$("#cnt-list").append(this.table.render().el), this;
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
}
}, options.customDatatableOpt ? _.extend(options.customDatatableOpt, customDatatableOpt) :options.customDatatableOpt = customDatatableOpt, 
InterviewsDoneDataTableView.__super__.initialize.call(this, options);
}, InterviewsDoneDataTableView.prototype.def = function() {
var def;
return def = InterviewsDoneDataTableView.__super__.def.call(this), _.extend(def, {
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
template:'<a href="interviews/<%= row.get("id") %>/report" class="txt-alt-grey mdL js-backbone"><i class="icon-eye tip" data-original-title="View Report"></i></a><a href="#" class="txt-alt-grey mdL js-share" data-id="<%= row.get("id") %>"><i class="icon2-sharetest tip" data-original-title="Share"></i></a>',
sortable:!1,
className:"w10",
sortable:!1
}), fields;
}, InterviewsDoneDataTableView.prototype.shareReport = function(ev) {
var result, share_modal;
return ev.preventDefault(), result = _.filter(this.data.models, function(row) {
return row.get("id").toString() === $(ev.currentTarget).attr("data-id");
}), result.length ? (share_modal = new HR.InterviewShareReportModalView({
link:HR.InterviewModel.shareReportLink(result[0])
}), $(".modal-container").html(share_modal.render().el)) :void 0;
}, InterviewsDoneDataTableView.prototype.events = function() {
var ob;
return ob = InterviewsDoneDataTableView.__super__.events.call(this) || {}, _.extend(ob, {
"click a.js-share":"shareReport"
}), ob;
}, InterviewsDoneDataTableView;
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
}
}, options.customDatatableOpt ? _.extend(options.customDatatableOpt, customDatatableOpt) :options.customDatatableOpt = customDatatableOpt, 
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
from:JSON.stringify(new Date()).replace(/"/gi, "") + ".."
}), base;
}, InterviewsUpcomingDataTableView.prototype.fields = function() {
var fields;
return fields = InterviewsUpcomingDataTableView.__super__.fields.call(this), fields.push({
name:"EDIT/VISIT/DELETE",
template:'<a href="interviews/<%= row.get("id") %>" class="txt-alt-grey mdL js-backbone"><i class="icon2-edit tip" data-original-title="Edit"></i></a><a href="<%= row.get("paperurl") %>" class="txt-alt-grey mdL" target="_blank"><i class="icon-globe tip" data-original-title="Visit"></i></a><a href="#" class="txt-alt-grey mdL cancel js-delete-interview" data-interview="<%= row.get("id") %>"><i class="icon2-delete tip" data-original-title="Delete"></i></a>',
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
return __extends(InterviewsThumbsUpDataTableView, _super), InterviewsThumbsUpDataTableView.prototype.def = function() {
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
return __extends(InterviewsThumbsDownDataTableView, _super), InterviewsThumbsDownDataTableView.prototype.def = function() {
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
dashboard:!0
}), this.done = new InterviewsDoneDataTableView({
dashboard:!0,
customDatatableOpt:{
showAfterFetch:!0
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
this.$("#cnt-done").append(this.done.render().el)), this;
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
return HR.util.ajaxmsg("", !1, !0, 0), _this.$(".close").click(), _this.parent.redraw();
};
}(this)
});
}, DeleteInterviewModalView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.InterviewsDataTableView = InterviewsDataTableView, 
HR.InterviewsListingView = InterviewsListingView, HR.InterviewsDoneView = InterviewsDoneView, 
HR.InterviewsDoneDataTableView = InterviewsDoneDataTableView, HR.InterviewsUpcomingView = InterviewsUpcomingView, 
HR.InterviewsUpcomingDataTableView = InterviewsUpcomingDataTableView, HR.InterviewsThumbsUpView = InterviewsThumbsUpView, 
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
}), $(this.el).html(content), this.renderAttendants(), this.$("input[type=file]").bootstrapFileInput(), 
this.$(".date.start").datepicker({
format:"m-d-yyyy",
autoclose:!0
}), this.$(".time.start").timepicker({
showDuration:!0,
timeFormat:"H:i",
scrollDefaultNow:!0
}), this;
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
return setTimeout(function() {
return $.post("http://localhost.com/recruit2/user/timezones", function(data) {
return $("#timezone_container").html(data), $("#timezones").select2({
width:"360px",
matcher:function(term, text, option) {
var alias, arr;
return arr = [], arr.push(text, $(option).val()), alias = $(option).attr("data-alias"), 
alias && arr.push.apply(arr, alias.split(",")), _.some(arr, function(x) {
return x.toUpperCase().indexOf(term.toUpperCase()) > -1;
});
}
});
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
return HR.NotificationModel.push("new interview"), Backbone.history.navigate("interviews/" + model.get("id"), !0);
};
}(this),
error:function() {
return function() {};
}(this)
})) :(this.$("button[name=quick-pad-button]").attr("disabled", !1), this.$("input[name=quick-pad-title]").addClass("error"));
}, NewInterviewView.prototype.validate = function() {
var return_val;
return return_val = !0, _.each(this.$(".js-candidate-edit"), function() {
return function(section) {
var email, name;
return email = $(section).find("input[name=email]").removeClass("error").val(), 
email || ($(section).find("input[name=email]").addClass("error"), return_val = !1), 
name = $(section).find("input[name=name]").removeClass("error").val(), email ? void 0 :($(section).find("input[name=name]").addClass("error"), 
return_val = !1);
};
}(this)), _.each(this.$(".js-interviewer-edit"), function() {
return function(section) {
var email, name;
return email = $(section).find("input[name=email]").removeClass("error").val(), 
email || ($(section).find("input[name=email]").addClass("error"), return_val = !1), 
name = $(section).find("input[name=name]").removeClass("error").val(), email ? void 0 :($(section).find("input[name=name]").addClass("error"), 
return_val = !1);
};
}(this)), return_val;
}, NewInterviewView.prototype.checkForResume = function() {
var $form, paramTwo, submitUrl, that;
return this.$("input[name=interview-resume]").val() ? (submitUrl = "" + HR.INTERVIEWS_DOMAIN + "/api/interview/resume", 
$form = this.$("form[name=new-interview-form]"), paramTwo = function() {
var returnValue;
return returnValue = {
files:$form.find(":file"),
iframe:!0,
crossDomain:!0
};
}, that = this, $.ajax(submitUrl, paramTwo()).complete(function(_this) {
return function(data) {
return data = $.parseJSON(data.responseText), "Success" === data.status ? _this.saveInterview(data.url) :(_this.$("button[name=schedule-interview-button]").attr("disabled", !1), 
_this.$(".file-upload-error").html(data.error));
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
}(this)), this.model.set("interviewers", interviewers), starttime = new Date(moment($(".date.start").val() + " " + $(".time.start").val(), "M-D-YYYY HH:mm")), 
duration = this.$("select[name=interview-duration]").val(), end = moment(starttime) + 6e4 * parseInt(duration), 
endtime = new Date(moment(end)), this.model.set("from", moment(starttime).format()), 
this.model.set("to", moment(endtime).format()), this.model.set("notes", this.$("textarea[name=interview-notes]").val()), 
this.model.set("resume", resume), this.model.save(null, {
success:function() {
return function(model) {
return HR.NotificationModel.push("new interview"), Backbone.history.navigate("interviews/" + model.get("id"), !0);
};
}(this),
error:function() {
return function() {};
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
return __extends(InterviewThumbsView, _super), InterviewThumbsView.prototype.tagName = "span", 
InterviewThumbsView.prototype.template = "x/interview-thumbs", InterviewThumbsView.prototype.initialize = function() {
return _.bindAll(this, "render"), this.model.on("change:thumbs", this.render);
}, InterviewThumbsView.prototype.events = {
"click .js-thumbs":"toggleThumbs"
}, InterviewThumbsView.prototype.toggleThumbs = function(ev) {
return ev.preventDefault(), this.model.set("thumbs", $(ev.currentTarget).attr("data-thumbs")), 
this.model.save();
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
return this.model.set("feedback", this.$("textarea[name=feedback]").val()), this.model.save();
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
index = 1, recording.get("data") && recording.get("data").questions) ? _.each(recording.get("data").questions, function(_this) {
return function(question) {
var view;
return view = new InterviewCodeRecordingView({
question:question,
model:recording,
index:index
}), _this.$(".js-recordings").append(view.render().el), _this._subviews.push(view), 
index += 1;
};
}(this)) :void 0;
}, InterviewReportView.prototype.shareReport = function(e) {
var share_modal, url;
return e.preventDefault(), url = "https://www.hackerrank.com/x/interviews/" + this.model.get("id") + "/report?auth_key=" + this.model.get("auth_key"), 
share_modal = new InterviewShareReportModalView({
link:HR.InterviewModel.shareReportLink(this.model)
}), this.$(".modal-container").html(share_modal.render().el);
}, InterviewReportView;
}(window.HR.GenericView), InterviewCodeRecordingView = function(_super) {
function InterviewCodeRecordingView() {
return InterviewCodeRecordingView.__super__.constructor.apply(this, arguments);
}
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
erlang:"Erlang"
}, InterviewCodeRecordingView.prototype.initialize = function(options) {
return _.bindAll(this), this.question = options.question, this.index = options.index, 
this.model.on("change", this.render), this.recording = {};
}, InterviewCodeRecordingView.prototype.events = function() {
return {
"slide .slider":"sliderChange",
"click .js-showmoretoggle":"showMoreToggle"
};
}, InterviewCodeRecordingView.prototype.render = function() {
var that;
return that = this, this.type = this.question.runs ? "runs" :this.question.ops ? "ops" :"", 
$(this.el).html(HR.appController.template(this.template, this)({
question:this.question,
index:this.index
})), "runs" === this.type ? this.question.runs && (this.$(".slider").slider({
max:this.question.runs.length - 1,
value:this.question.runs.length - 1
}), this.viewCode(this.question.runs.length - 1)) :"ops" === this.type && (this.$("#report-codeshell").show(), 
this.question.ops && (this.recording = new HR.InterviewCodeRecordingModel({
interview_id:this.model.get("interview_id")
}), this.recording.set("ops", this.question.ops), this.$(".slider").slider({
max:this.question.ops.length,
value:this.question.ops.length
}), this.viewCode(this.question.ops.length - 1))), this;
}, InterviewCodeRecordingView.prototype.sliderChange = function(ev, ui) {
return this.viewCode(ui.value);
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
}, InterviewCodeRecordingView.prototype.viewCode = function(i) {
var current_recording, editor_lang, lang_mime_mapping, output;
return lang_mime_mapping = {
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
}, "runs" === this.type ? (current_recording = this.question.runs[i], this.$(".code-lang").html(this.lang_mapping[current_recording.lang]), 
this.$(".lang-container").removeClass("hidden"), this.$(".run-time").html(moment(current_recording.time).format("M-D-YYYY HH:mm")), 
this.$(".run-input").html(current_recording.input), output = this.cleanCodecheckerResponse(current_recording), 
this.$(".run-output").html(output), this.$(".code-response-container").removeClass("hidden"), 
editor_lang = current_recording.lang, this.showCodeEditor(current_recording.code, lang_mime_mapping[editor_lang])) :"ops" === this.type && this.recording ? (this.question.language ? (editor_lang = this.question.language, 
this.$(".code-lang").html(this.lang_mapping[this.question.language]), this.$(".lang-container").removeClass("hidden")) :editor_lang = "code", 
this.showCodeEditor(this.recording.gotoPosition(i), lang_mime_mapping[editor_lang])) :void 0;
}, InterviewCodeRecordingView.prototype.showCodeEditor = function(answer, language) {
var col, currentCodeLine, currentLineNumber, lineNumber, node, tabSize;
return node = this.$("pre.outbox"), node.empty(), $(node).append('<table><tr><td class="line-no" width="5%"></td><td class="code"></td></tr></table>'), 
currentCodeLine = $("<div></div>"), currentLineNumber = $("<div>1</div>"), $(node).find(".code").append(currentCodeLine), 
$(node).find(".line-no").append(currentLineNumber), col = 0, tabSize = CodeMirror.defaults.tabSize || 4, 
lineNumber = 2, CodeMirror.runMode(answer, language, function(text, style) {
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
}, InterviewCodeRecordingView;
}(window.HR.GenericView), InterviewShareReportModalView = function(_super) {
function InterviewShareReportModalView() {
return InterviewShareReportModalView.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewShareReportModalView, _super), InterviewShareReportModalView.prototype.template = "x/interview-share-report-modal", 
InterviewShareReportModalView.prototype.className = "interview-share-report-modal", 
InterviewShareReportModalView.prototype.initialize = function(options) {
return this.link = options.link, InterviewShareReportModalView.__super__.initialize.call(this, options);
}, InterviewShareReportModalView.prototype.render = function() {
var client, content;
return content = HR.appController.template(this.template, this)({
link:this.link
}), $(this.el).html(content), $("#copy-share-link-report").attr("data-clipboard-text", this.link), 
this.$("#report-link-inp").select(), client = new ZeroClipboard($("#copy-share-link-report"), {
container:$("div.modal.fade.interview-share-report-modal")
}), $("#global-zeroclipboard-html-bridge").css("position", "fixed"), this.$("#interview-share-report-modal").modal(), 
this;
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
}), $(this.el).html(content), this;
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
"click .upload-logo":"uploadLogo"
};
}, LogoUploadView.prototype.uploadLogo = function(e) {
var $form, file, paramTwo, submitUrl, that;
return e.preventDefault(), this.$(".error-msg").addClass("hidden"), submitUrl = "/xrest/users/upload_logo", 
$form = this.$("#logo-upload-form"), file = $form.find(":file"), paramTwo = function() {
var returnValue;
return returnValue = {
files:$form.find(":file"),
iframe:!0
};
}, that = this, $.ajax({
url:submitUrl,
type:"POST",
dataType:"json",
files:$form.find(":file"),
iframe:!0,
success:function(data) {
return HR.currentUser.fetch({
silent:!0,
success:function() {
return that.$("#upload-logo-modal").modal("hide"), that.parent.render(), setTimeout(function() {
return HR.util.ajaxmsg(data.message, !1, !0, 2);
});
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
return this.parent = options.parent;
}, NewTeamView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this.$("#new-team-modal").modal(), this;
}, NewTeamView.prototype.events = function() {
return {
"submit form[name=team-form]":"createTeam"
};
}, NewTeamView.prototype.createTeam = function(e) {
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
return response = $.parseJSON(xhr), _this.$(".alert-error").html(response.message);
};
}(this)
})) :void 0;
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
return that.model.fetch({
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
(current_plan = this.model.get("current_plan")) ? current_plan.price > cost ? (alert("Please contact support@interviewstreet.com to downgrade the plan"), 
void 0) :this.checkout(plan) :this.checkout(plan);
}, PricingPlansView.prototype.checkout = function(plan) {
var data;
return data = {}, data.payment_type = "plan", data.plan = plan, HR.UserSettings.set("checkout", data), 
HR.router.navigate("/payments/checkout", !0);
}, PricingPlansView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.PricingPlansView = PricingPlansView;
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
this;
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
data:data
});
}, SettingsBasicInfoView.prototype.initTimeZoneSelect2 = function() {
var that;
return that = this, setTimeout(function() {
return $.ajax({
url:"/xrest/users/timezones",
type:"GET",
success:function(response) {
return $(that.timezone_select_box).select2({
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
data.user.company = {}, data.user.company.name = this.$("#usr-cname").val(), data.user.company.email_from = this.$("#usr-cemailfrom").val(), 
this.model.save(data.user, {
success:function(model) {
return console.log(model);
},
error:function(model, resp) {
return console.log(resp);
}
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
success:function(model, resp) {
return console.log(resp);
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
var data, message, promise;
return e.preventDefault(), this.$(".response").addClass("hidden"), this.$("#usr-old-pwd, #usr-new-pwd, #usr-cnfm-pwd").removeClass("error"), 
data = {}, data.user = {}, data.user.old_password = this.$("#usr-old-pwd").val(), 
data.user.new_password = this.$("#usr-new-pwd").val(), data.user.confirm_password = this.$("#usr-cnfm-pwd").val(), 
data.user.old_password ? data.user.new_password ? data.user.new_password.length < 6 ? (message = "Password should have atleast 6 characters", 
this.$(".response").html(message).removeClass("hidden"), this.$("#usr-new-pwd").addClass("error"), 
void 0) :data.user.new_password !== data.user.confirm_password ? (message = "Passwords do not match", 
this.$(".response").html(message).removeClass("hidden"), this.$("#usr-new-pwd, #usr-cnfm-pwd").addClass("error"), 
void 0) :(HR.util.inlineLoadingStart($(e.currentTarget).find("button[type=submit]")), 
promise = this.model.updatePassword(data.user), promise.success(function(response) {
return HR.util.inlineLoadingEnd(response);
}), promise.error(function(response) {
return message = JSON.parse(response.responseText), HR.util.inlineLoadingEnd({
message:message
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
return function() {};
}(this),
error:function() {
return function() {};
}(this)
});
}, SettingsReportView;
}(Backbone.View), HR = null != (_ref = window.HR) ? _ref :{}, HR.SettingsReportView = SettingsReportView;
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
var HR, SettingsTeamView, _ref;
return SettingsTeamView = function(_super) {
function SettingsTeamView() {
return SettingsTeamView.__super__.constructor.apply(this, arguments);
}
return __extends(SettingsTeamView, _super), SettingsTeamView.prototype.template = "x/settings-team", 
SettingsTeamView.prototype.className = "settings-team", SettingsTeamView.prototype.initialize = function(options) {
return null == options && (options = {}), SettingsTeamView.__super__.initialize.call(this, options), 
this.model = HR.currentUser, this.collection = options.collection, this.subviews = [], 
this.listenTo(this.collection, "change", this.render), this.listenTo(this.collection, "reset", this.render);
}, SettingsTeamView.prototype.events = function() {
return {
"click .add-usr-team":"addTeamMember",
"click .edit-usr-team":"editTeamMember",
"click #add-new-team":"newTeam",
"click .edit-team-link":"editTeam"
};
}, SettingsTeamView.prototype.render = function() {
var content, _model;
return _model = this.model.toJSON(), content = HR.appController.template(this.template, this)({
current_user:_model,
collection:this.collection
}), $(this.el).html(content), this;
}, SettingsTeamView.prototype.editTeam = function(e) {
var editTeamView, team, team_id;
return e.preventDefault(), team_id = $(e.currentTarget).data("team-id"), team = this.collection.get(parseInt(team_id, 10)), 
editTeamView = new HR.EditTeamView({
parent:this,
model:team,
collection:this.collection
}), this.subviews.push(editTeamView), this.$(".dialog-wrapper").html(editTeamView.render().el);
}, SettingsTeamView.prototype.addTeamMember = function(e) {
var team_id, user_team_modal, user_team_model;
return e.preventDefault(), this.users = {}, this.userLabels = [], _.each(this.collection.models, function(_this) {
return function(model) {
return _.each(model.get("users"), function(user) {
var found, userLabel;
return found = _.find(_this.users, function(element) {
return element.get("email") === user.get("email");
}), "undefined" !== found ? (userLabel = user.get("firstname") + " " + user.get("lastname") + " - " + user.get("email"), 
_this.userLabels.push(userLabel), _this.users[userLabel] = user) :void 0;
});
};
}(this)), team_id = this.$(e.currentTarget).data("team-id"), user_team_model = new HR.UserTeamModel(), 
user_team_modal = new HR.AddUserTeamView({
users:this.users,
userLabels:this.userLabels,
parent:this,
team_id:team_id,
model:user_team_model,
collection:this.collection
}), this.subviews.push(user_team_modal), this.$(".dialog-wrapper").html(user_team_modal.render().el);
}, SettingsTeamView.prototype.editTeamMember = function(e) {
var team, team_id, user_team_id, user_team_modal, user_team_model;
return e.preventDefault(), team_id = parseInt($(e.currentTarget).data("team-id"), 10), 
user_team_id = parseInt($(e.currentTarget).data("id"), 10), team = this.collection.get(team_id), 
team && team.get("users") && (user_team_model = _.find(team.get("users"), function() {
return function(user) {
return parseInt(user.get("id")) === user_team_id;
};
}(this))) ? (user_team_modal = new HR.EditUserTeamView({
parent:this,
team_id:team_id,
model:user_team_model,
collection:this.collection
}), this.subviews.push(user_team_modal), this.$(".dialog-wrapper").html(user_team_modal.render().el)) :void 0;
}, SettingsTeamView.prototype.newTeam = function(e) {
var new_team_modal, team;
return e.preventDefault(), team = new HR.TeamModel(), new_team_modal = new HR.NewTeamView({
parent:this,
model:team,
collection:this.collection
}), this.subviews.push(new_team_modal), this.$(".dialog-wrapper").html(new_team_modal.render().el);
}, SettingsTeamView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SettingsTeamView = SettingsTeamView;
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
TestAdminView.prototype.events = function() {
return {
"submit form[name=test-admin-form]":"saveTestAdmin"
};
}, TestAdminView.prototype.render = function() {
var content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content)), this;
}, TestAdminView.prototype.saveTestAdmin = function(e) {
var testAdmins;
return e.preventDefault(), this.$(".validation-error").addClass("hidden"), testAdmins = $("input[name=test-admins]").removeClass("error").val(), 
testAdmins ? (this.model.set("test_admins", testAdmins, {
silent:!0
}), this.model.save(null, {
success:function(_this) {
return function() {
return _this.render();
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
})) :$("input[name=test-admin]").addClass("error");
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
}), this.test_admin_view = new HR.TestAdminView({
model:this.model
}), this.cutoff_score_view = new HR.TestCutoffScoreView({
model:this.model
}), this.master_password_view = new HR.TestMasterPasswordView({
model:this.model
}), this.questions_shuffling_view = new HR.TestQuestionsShufflingView({
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
"div#time_settings":this.time_settings_view,
"div#test_admin":this.test_admin_view,
"div#cutoff_score":this.cutoff_score_view,
"div#mcq_score":this.mcq_score_view,
"div#master_password":this.master_password_view,
"div#questions_shuffling":this.questions_shuffling_view,
"div#allowed_languages":this.allowed_languages_view,
"div#duplicate_test":this.duplicate_test_view,
"div#delete_test":this.delete_test_view
}), this._subviews.push(this.custom_link_view, this.time_settings_view, this.test_admin_view, this.cutoff_score_view, this.mcq_score_view, this.master_password_view, this.questions_shuffling_view, this.allowed_languages_view, this.duplicate_test_view, this.delete_test_view), 
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
"click label.hr-checkbox":"toggleCheckbox",
"submit form[name=test-allowedLanguages-form]":"saveAllowedLanguages"
};
}, TestAllowedLanguagesView.prototype.render = function() {
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
return e.preventDefault(), $(e.currentTarget).hasClass("active") ? (status = "", 
$(e.currentTarget).removeClass("active").removeClass("active"), $(e.currentTarget).find("input").removeAttr("checked")) :(status = "checked", 
$(e.currentTarget).addClass("active").addClass("active"), $(e.currentTarget).find("input").attr("checked", "checked")), 
$(e.currentTarget).hasClass("select-all") ? this.changeAllCheckboxes(status) :void 0;
}, TestAllowedLanguagesView.prototype.changeAllCheckboxes = function(status) {
var languages;
return languages = this.$(".hr-checkbox.languages"), "checked" === status ? _.each(languages, function(lang) {
return $(lang).addClass("active"), $(lang).find("input").attr("checked", "checked");
}) :_.each(languages, function(lang) {
return $(lang).removeClass("active"), $(lang).find("input").removeAttr("checked");
});
}, TestAllowedLanguagesView.prototype.saveAllowedLanguages = function(e) {
var allowedLanguages, languages;
return e.preventDefault(), allowedLanguages = [], languages = $("input[name=allowedLanguages]:checked"), 
_.each(languages, function() {
return function(lang) {
return allowedLanguages.push(lang.value);
};
}(this)), this.model.set("allowedLanguages", allowedLanguages.join(",")), this.model.save();
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
return _this.model.fetch();
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
"click a.create-saved-message":this.createSavedMessage
};
}, TestCreateSavedMessageDialogView.prototype.initialize = function(options) {
return null == options && (options = {}), this.message = options.message, this.parent = options.parent;
}, TestCreateSavedMessageDialogView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)), this.$("#test-create-saved-message-modal").modal(), 
this;
}, TestCreateSavedMessageDialogView.prototype.createSavedMessage = function(e) {
var attrs, message_name, saved_messages, that, _ref;
return e.preventDefault(), this.$(".error-msg").addClass("hidden"), message_name = $("#create-saved-msg-name").val(), 
message_name ? (saved_messages = null != (_ref = this.model.get("saved_messages")) ? _ref :{}, 
saved_messages[message_name] = this.message, attrs = {
saved_messages:saved_messages
}, that = this, this.model.save(attrs, {
success:function() {
return setTimeout(function() {
return that.$(".close").click(), that.parent.render();
}, 1500);
}
})) :(setTimeout(function() {
return HR.util.inlineLoadingEnd({
message:""
});
}), this.$(".error-msg").removeClass("hidden").html("Enter a Title for the message"));
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
TestCustomLinkView.prototype.events = function() {
return {
"submit form[name=short-test-url-form]":"createShortURL",
"submit form[name=public-test-url-form]":"createPublicURL"
};
}, TestCustomLinkView.prototype.render = function() {
var content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content)), this;
}, TestCustomLinkView.prototype.createPublicURL = function(e) {
var public_url;
return e.preventDefault(), public_url = $("input[name=public-test-url]").removeClass("error").val(), 
public_url ? (HR.util.inlineLoadingStart(e.currentTarget), $.post("/xrest/tests/" + this.model.get("id") + "/link", {
short_url:public_url,
type:"public"
}, function(_this) {
return function(data) {
return HR.util.inlineLoadingEnd(data), "Success" === data.message ? _this.model.fetch({
silent:!0,
success:function(model) {
var html;
return html = '<div class="mdT test-custom-link-wrap">', html += '<div class="cust_link_bg" id="current_public_pass">', 
html += 'Current Test Link: &nbsp;&nbsp; <span id="current_public_login_url"><a href=' + model.get("short_url") + ' target="_blank">' + model.get("short_url") + "</a></span>", 
html += "</div></div>", $("#public-login-url-test-container").html(html);
}
}) :void 0;
};
}(this))) :$("input[name=public-test-url]").addClass("error").focus();
}, TestCustomLinkView.prototype.createShortURL = function(e) {
var short_url;
return e.preventDefault(), short_url = $("input[name=short-test-url]").removeClass("error").val(), 
short_url ? (HR.util.inlineLoadingStart(e.currentTarget), $.post("/xrest/tests/" + this.model.get("id") + "/link", {
short_url:short_url,
type:"short"
}, function(_this) {
return function(data) {
return HR.util.inlineLoadingEnd(data), "Success" === data.message ? _this.model.fetch({
silent:!0,
success:function(model) {
var html;
return html = '<div class="mdT test-custom-link-wrap">', html += '<div class="cust_link_bg" id="current_short_pass">', 
html += 'Current Test Link: &nbsp;&nbsp; <span id="current_short_login_url"><a href=' + model.get("short_login_url") + ' target="_blank">' + model.get("short_login_url") + "</a></span>", 
html += "</div></div>", $("#short-login-url-test-container").html(html);
}
}) :void 0;
};
}(this))) :$("input[name=short-test-url]").addClass("error").focus();
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
TestCutoffScoreView.prototype.events = function() {
return {
"submit form[name=test-cutoff-score-form]":"saveTestCutoff"
};
}, TestCutoffScoreView.prototype.render = function() {
var content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content)), this;
}, TestCutoffScoreView.prototype.saveTestCutoff = function(e) {
var cutoff;
return e.preventDefault(), cutoff = $("input[name=cutoff-score]").removeClass("error").val(), 
cutoff ? (this.model.set("cutoff_score", parseInt(cutoff, 10)), this.model.save()) :$("input[name=test-cutoff]").addClass("error");
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
return that.$(".close").click(), that.parent.render();
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
}, TestDeleteView.prototype.render = function() {
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
filebrowserUploadUrl:"/xrest/editor_uploads",
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
return fetchDefaultText ? that.model.fetch({
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
filebrowserUploadUrl:"/xrest/editor_uploads",
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
var content, emails, options, prefs_link, prefs_time, subject;
return e.preventDefault(), this.$(".invite_message").addClass("hidden"), this.$(".js-erroralert").addClass("hidden"), 
emails = this.$("#emails").removeClass("error").val(), subject = this.$("input[name=subject]").val(), 
content = this.$("textarea[name=email-content]").removeClass("error").ckeditorGet().getData(), 
_.isEmpty(emails) ? (this.$("#emails").addClass("error"), void 0) :(options = {}, 
prefs_time = this.$("input[name=prefs-time]:checked").val(), options.time = "0" === prefs_time ? !1 :!0, 
prefs_link = this.$("input[name=prefs-link]:checked").val(), options.link = "0" === prefs_link ? !1 :!0, 
HR.util.inlineLoadingStart(e.currentTarget), $.post("/xrest/tests/" + this.model.get("id") + "/invite", {
emails:emails,
subject:subject,
message:content,
options:options
}, function(_this) {
return function(data) {
return HR.util.inlineLoadingEnd(data), data.model.not_invited.length > 0 && (_this.$(".js-erroralert").removeClass("hidden"), 
_this.$(".js-alertmsg").html("Following emails are invalid, and were not invited: <ul><li>" + data.model.not_invited.join("</li><li>") + "</li></ul>")), 
data.status === !0 ? (_this.user.fetch({
success:function(model) {
return this.$(".user-invite-count").html("Invites Remaining: " + model.invites_count());
}
}), _this.model.fetch({
success:function() {
return HR.appView.updateSidebarView();
}
}), _this.$(".invite_message").removeClass("hidden").html(data.message)) :_this.$(".invite_message").removeClass("hidden").html(data.message);
};
}(this)));
}, TestInviteView.prototype.previewMail = function() {
var message, options, prefs_link, prefs_time, tid;
return message = this.$("textarea[name=email-content]").ckeditorGet().getData(), 
options = {}, prefs_time = this.$("input[name=prefs-time]:checked").val(), options.time = "0" === prefs_time ? !0 :!1, 
prefs_link = this.$("input[name=prefs-link]:checked").val(), options.link = "0" === prefs_link ? !0 :!1, 
tid = this.model.get("id"), $.post("/xrest/tests/" + tid + "/preview_invite", {
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
return this.library = options.library, this.filter = options.filter, this.testmodel = options.testmodel, 
this.search = "", this.tags = "", HR.tm = this.testmodel, HR.LibraryModel.setTid(this.testmodel.get("id")), 
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
return newtags = this.$(".js-tags").val(), newtags !== this.tags ? (this.tags = newtags, 
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
this.noexpand = "noexpand" in options ? options.noexpand :!1, this.actions = "actions" in options ? options.actions :!0;
}, TestLibraryQuestionView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this)({
question:this.question,
test:this.test.attributes,
hrqn:window.istreet.cfg.hrqn,
noexpand:this.noexpand,
actions:this.actions
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
success:function() {
return function() {
return el.removeClass("js-add-question btn-primary"), el.addClass("js-remove-question btn-alert"), 
el.html("Remove"), that.parent.updateSidebar();
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
TestMasterPasswordView.prototype.events = function() {
return {
"submit form[name=test-master-password-form]":"saveMasterPassword"
};
}, TestMasterPasswordView.prototype.render = function() {
var content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content)), this;
}, TestMasterPasswordView.prototype.saveMasterPassword = function(e) {
var masterPassword;
return e.preventDefault(), masterPassword = $("input[name=master-password]").removeClass("error").val(), 
masterPassword ? (this.model.set("defPassword", masterPassword), this.model.save()) :$("input[name=master-password]").addClass("error");
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
}, TestMcqScoreView.prototype.render = function() {
var content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content)), this;
}, TestMcqScoreView.prototype.saveMCQScore = function(e) {
var mcq_negative_score, mcq_score;
return e.preventDefault(), mcq_score = parseInt($("input[name=correct-answer-score]").val(), 10), 
mcq_negative_score = parseInt($("input[name=wrong-answer-score]").val(), 10), mcq_negative_score > 0 && (mcq_negative_score = -1 * mcq_negative_score), 
this.model.set({
mcq_score:mcq_score,
mcq_negative_score:mcq_negative_score
}), this.model.save();
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
TestNavigationView.prototype.updateData = function(model, active_nav_link) {
return this.model = model, this.active_nav_link = active_nav_link;
}, TestNavigationView.prototype._render = function() {
var content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
active_nav_link:this.active_nav_link,
throbber:HR.appController.viewLoader()
}), $(this.el).html(content)), this;
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
return this.processReport = __bind(this.processReport, this), this.startDlProcess = __bind(this.startDlProcess, this), 
this.modalClosed = __bind(this.modalClosed, this), TestReportsPDFView.__super__.constructor.apply(this, arguments);
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
}), void 0) :(this.$(".js-pdfprogress").html("Checking PDFs status.."), this.available = 1, 
this.handling_multiple = !0, $.ajax({
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
return _this.toprocess = [], _this.toprocess = _this.toprocess.concat(m.status.done), 
i = m.status.done.length, _this.toprocess = _this.toprocess.concat(m.status.notdone), 
_this.startProcessing(i);
};
}(this),
error:function(_this) {
return function() {
return _this.$(".js-pdfprogress").html("Unable to check reports status.");
};
}(this)
}));
}, TestReportsPDFView.prototype.startProcessing = function(i) {
var aid, fail, success;
return this.available <= 0 ? (setTimeout(function(_this) {
return function() {
return _this.startProcessing(i);
};
}(this), 2e3), void 0) :i === this.toprocess.length ? (this.$(".js-pdfprogress").html("Creating archive for download. Please wait."), 
$.fileDownload(this.pdfurl, {
httpMethod:"POST",
timeout:3e4,
data:{
aids:this.aids,
cmd:"download"
},
successCallback:function(_this) {
return function() {
return _this.$(".js-pdfprogress").html("File downloaded!");
};
}(this),
failCallback:function(_this) {
return function() {
return _this.$(".js-pdfprogress").html("Unable to prepare file for download. Try again later.");
};
}(this)
})) :(this.$(".js-pdfprogress").html("Processing report " + (i + 1) + " of " + this.toprocess.length), 
aid = this.toprocess[i], success = function(_this) {
return function() {
return _this.available = _this.available + 1, _this.startProcessing(i + 1);
};
}(this), fail = function(_this) {
return function() {
return _this.available = _this.available + 1, _this.$(".js-pdfprogress").append("<br><p>Processing error with report no. " + (i + 1) + " (" + aid + ").</p>");
};
}(this), this.available = this.available - 1, this.processReport(aid, success, fail));
}, TestReportsPDFView.prototype.processReport = function(aid, success, fail) {
var dataobj;
if (this.handling_multiple) return dataobj = {
aids:[ aid ],
cmd:"status",
usecache:!0
}, setTimeout(function(_this) {
return function() {
return $.ajax({
url:_this.pdfurl,
type:"POST",
data:dataobj,
success:function() {
return success();
},
error:function(f) {
return console.log("fail call", f), fail();
}
});
};
}(this), 300);
}, TestReportsPDFView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestReportsPDFView = TestReportsPDFView;
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
var HR, MCQChoiceView, QuestionCodeEditStep1View, QuestionCodeEditStep2View, QuestionCodeEditStep3View, QuestionCodeEditStep4View, QuestionCodeEditView, QuestionCompleteEditView, QuestionMCQEditView, QuestionSubjectiveEditView, TestQuestionEditView, TestcaseAlertModalView, TestcaseDeleteModalView, TestcaseEditModalView, TestcaseView, TestcasesUploadModalView, _ref;
return TestQuestionEditView = function(_super) {
function TestQuestionEditView() {
return TestQuestionEditView.__super__.constructor.apply(this, arguments);
}
return __extends(TestQuestionEditView, _super), TestQuestionEditView.prototype.className = "test-question-edit", 
TestQuestionEditView.prototype.initialize = function(options) {
return this._subviews = [], this.testmodel = options.testmodel, this.qid = options.qid, 
this.type = options.type, this.step = options.step, this.qid ? (this.model = new HR.QuestionModel({
id:this.qid,
tid:this.testmodel.get("id"),
type:this.type
}), this.listenTo(this.model, "change", this.render), this.model.fetch()) :(this.model = new HR.QuestionModel({
tid:this.testmodel.get("id"),
type:this.type
}), this.listenTo(this.model, "change", this.render));
}, TestQuestionEditView.prototype.events = function() {}, TestQuestionEditView.prototype.render = function() {
var question_view;
switch (_.each(this._subviews, function() {
return function(view) {
return view.destroy();
};
}(this)), this.model.get("type")) {
case "code":
case "approx":
question_view = new QuestionCodeEditView({
model:this.model,
testmodel:this.testmodel,
step:this.step
}), this._subviews.push(question_view), $(this.el).html(question_view.render().el);
break;

case "mcq":
case "multiple_mcq":
question_view = new QuestionMCQEditView({
model:this.model,
testmodel:this.testmodel
}), this._subviews.push(question_view), $(this.el).html(question_view.render().el);
break;

case "textAns":
case "file_upload":
case "uml":
case "electrical":
question_view = new QuestionSubjectiveEditView({
model:this.model,
testmodel:this.testmodel
}), this._subviews.push(question_view), $(this.el).html(question_view.render().el);
break;

case "complete":
question_view = new QuestionCompleteEditView({
model:this.model,
testModel:this.testmodel
}), this._subviews.push(question_view), $(this.el).html(question_view.render().el);
}
return this;
}, TestQuestionEditView;
}(window.HR.GenericView), QuestionMCQEditView = function(_super) {
function QuestionMCQEditView() {
return QuestionMCQEditView.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionMCQEditView, _super), QuestionMCQEditView.prototype.template = "x/question-mcq", 
QuestionMCQEditView.prototype.className = "question-mcq", QuestionMCQEditView.prototype.initialize = function(options) {
return this.testmodel = options.testmodel, this._subviews = [], this._choices_views = [];
}, QuestionMCQEditView.prototype.events = function() {
return {
"click .js-toggle-richtext":"toggleRichtext",
"submit form[name=mcq-question-form]":"saveQuestion",
"click .js-add-choice":"addChoice",
"click #add-tag-link":"addTag",
"click .remove-tag":"removeTag"
};
}, QuestionMCQEditView.prototype.render = function() {
var config, content, that, _ref;
return this.richtext = this.model.get("richtext") ? this.model.get("richtext") :"False", 
this.tags = null != (_ref = this.model.get("tags_array")) ? _ref :[], content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
tags:this.tags,
edit:this.model.get("id") ? !0 :!1,
test:this.testmodel.toJSON(),
richtext:this.richtext
}), $(this.el).html(content), config = {
skin:"moono",
extraPlugins:"image",
filebrowserUploadUrl:"/xrest/editor_uploads",
toolbar:[ [ "Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "-", "NumberedList", "BulletedList", "-", "Indent", "Outdent", "-", "Link", "Unlink" ], [ "Styles", "Format", "Font", "FontSize", "TextColor" ], [ "Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo", "Image" ], [ "Source" ] ],
toolbarCanCollapse:!1,
autoGrow_onStartup:!0,
width:this.$("textarea[name=problem-description]").width() || 780,
removePlugins:"elementspath,contextmenu,liststyle,tabletools",
disableNativeSpellChecker:!1
}, that = this, setTimeout(function() {
return CKEDITOR.instances["problem-description"] && delete CKEDITOR.instances["problem-description"], 
config.width = this.$("textarea[name=problem-description]").width() || 780, this.$("textarea.texteditor").ckeditor(config);
}), this.renderChoices(), this;
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
}, QuestionMCQEditView.prototype.addTag = function(e) {
var tag, tagHtml, tagInput;
return e.preventDefault(), tagInput = this.$("#q-tag-inp"), tag = tagInput.val(), 
tagInput.val(""), _.isEmpty(tag) || this.tags.push(tag), this.tags = _.uniq(this.tags), 
tagHtml = "", _.each(this.tags, function(tag) {
return tagHtml += '<span class="label removable q-tags"><span class="tag-val">', 
tagHtml += tag, tagHtml += '</span><a href="javascript:;" class="remove-tag">x</a>', 
tagHtml += "</span>&nbsp;";
}), this.$(".tag-names-container").html(tagHtml);
}, QuestionMCQEditView.prototype.removeTag = function(e) {
var that;
return e.preventDefault(), this.$(e.currentTarget).parent().remove(), this.tags = [], 
that = this, this.$("span.q-tags").each(function() {
return that.tags.push($(this).find(".tag-val").html());
});
}, QuestionMCQEditView.prototype.toggleSelectOption = function(index) {
var selector;
return selector = this.$(this.$("ul#choices-container li")[index]), "mcq" === this.model.get("type") ? selector.hasClass("active") ? (selector.removeClass("active"), 
selector.find(".js-mark-answer").html("Mark as answer")) :(this.$("ul#choices-container li").removeClass("active"), 
selector.addClass("active"), selector.find(".js-mark-answer").html("Unmark as answer")) :selector.hasClass("active") ? (selector.removeClass("active"), 
selector.find(".js-mark-answer").html("Mark as answer")) :(selector.addClass("active"), 
selector.find(".js-mark-answer").html("Unmark as answer"));
}, QuestionMCQEditView.prototype.removeOption = function(view) {
return 2 !== this._choices_views.length ? (this._subviews = _.without(this._subviews, view), 
this._choices_views = _.without(this._choices_views, view), _.each(this._choices_views, function(choice_view, index) {
return choice_view.setIndex(index);
}), view.destroy()) :void 0;
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
}), this._subviews.push(choice_view), this._choices_views.push(choice_view), this.$("#choices-container").append(choice_view.render().el);
}, QuestionMCQEditView.prototype.saveQuestion = function(e) {
var answer, options, question, save_data;
return e.preventDefault(), this.$("#error-container").hide(), options = [], answer = [], 
_.each(this._choices_views, function() {
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
tags_array:this.tags
}, this.model.save(save_data, {
success:function(_this) {
return function(model) {
return Backbone.history.navigate("tests/" + _this.testmodel.get("id") + "/questions/" + model.get("id") + "/edit", !0);
};
}(this),
error:function(model, response) {
return response = JSON.parse(response.responseText), this.$(".text-error").html(response.message), 
this.$("#error-container").show();
}
}));
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
filebrowserUploadUrl:"/xrest/editor_uploads"
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
"click .js-remove-option":"removeOption"
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
return this.container.addClass("mcq-rich-text");
}, this.config);
}, MCQChoiceView.prototype.removeRichText = function() {
var string, value, x;
return this.richtext = "False", this.$("textarea").ckeditor(function() {
return this.destroy();
}, this.config), string = this.$("textarea").val(), x = string.replace(/(<([^>]+)>)/gi, ""), 
x = HR.util.htmlDecode(x), x = $.trim(x), value = x, this.$("textarea").val(value);
}, MCQChoiceView;
}(window.HR.GenericView), QuestionCompleteEditView = function(_super) {
function QuestionCompleteEditView() {
return QuestionCompleteEditView.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionCompleteEditView, _super), QuestionCompleteEditView.prototype.template = "x/question-complete", 
QuestionCompleteEditView.prototype.className = "question-complete", QuestionCompleteEditView.prototype.newOption = '<div class="new-choice"><input type="text" /><a href="javascript:;" class="delete-choice" class="txt-alt-grey msL"><i class="icon2-close fnt-sz-big"></i></a><br/></div>', 
QuestionCompleteEditView.prototype.newBlank = '<div class="white-grid-block no-margin no-padding blank-container"><div class="mlA"><div class="choices-container"><div class="new-choice"><input type="text" /><a href="javascript:;" class="delete-choice" class="txt-alt-grey msL"><i class="icon2-close fnt-sz-big"></i></a><br/></div></div><button class="btn add-new-choice">Add one more Choice</button></div></div>', 
QuestionCompleteEditView.prototype.initialize = function(options) {
return this.testmodel = options.testModel, this._subviews = [], this.eventsSet = !1;
}, QuestionCompleteEditView.prototype.events = function() {
return {
"submit form[name=question-complete-form]":"submit"
};
}, QuestionCompleteEditView.prototype.render = function() {
var config, content;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
edit:this.model.get("id") ? !0 :!1,
test:this.testmodel.toJSON()
}), $(this.el).html(content), config = {
skin:"moono",
filebrowserUploadUrl:"/xrest/editor_uploads",
toolbar:[ [ "Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "-", "NumberedList", "BulletedList", "-", "Indent", "Outdent", "-", "Link", "Unlink" ], [ "Styles", "Format", "Font", "FontSize", "TextColor" ], [ "Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo" ], [ "Source" ] ],
toolbarCanCollapse:!1,
autoGrow_onStartup:!0,
width:this.$("textarea[name=problem-description]").width() || 780,
removePlugins:"elementspath,contextmenu,liststyle,tabletools",
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
}, QuestionCompleteEditView.prototype.submit = function(e) {
var attributes, blank, blankRegex, blanks, choice, choices, option, options, problemStatement, problemStatementTA, questionString, questionStringInput, responseBox, that, val, _i, _j, _len, _len1;
for (e.preventDefault(), problemStatementTA = $("textarea[name=problem-statement]"), 
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
answer:options
}, that = this, this.model.save(attributes, {
success:function() {
return Backbone.history.navigate("tests/" + that.testmodel.get("id") + "/questions/" + that.model.get("id") + "/edit", !0);
},
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
return this.testmodel = options.testmodel, this._subviews = [];
}, QuestionSubjectiveEditView.prototype.events = function() {
return {
"submit form[name=subjective-question-form]":"saveQuestion"
};
}, QuestionSubjectiveEditView.prototype.render = function() {
var config, content, that;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
edit:this.model.get("id") ? !0 :!1,
test:this.testmodel.toJSON()
}), $(this.el).html(content), config = {
skin:"moono",
extraPlugins:"image",
filebrowserUploadUrl:"/xrest/editor_uploads",
toolbar:[ [ "Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "-", "NumberedList", "BulletedList", "-", "Indent", "Outdent", "-", "Link", "Unlink" ], [ "Styles", "Format", "Font", "FontSize", "TextColor" ], [ "Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo", "Image" ], [ "Source" ] ],
toolbarCanCollapse:!1,
autoGrow_onStartup:!0,
width:this.$("textarea[name=problem-description]").width() || 780,
removePlugins:"elementspath,contextmenu,liststyle,tabletools",
disableNativeSpellChecker:!1
}, that = this, setTimeout(function() {
return CKEDITOR.instances["problem-description"] && delete CKEDITOR.instances["problem-description"], 
config.width = this.$("textarea[name=problem-description]").width() || 780, this.$("textarea.texteditor").ckeditor(config);
}), this;
}, QuestionSubjectiveEditView.prototype.saveQuestion = function(e) {
var question, save_data;
return e.preventDefault(), question = this.$("textarea[name=problem-description]").removeClass("error").ckeditorGet().getData(), 
_.isEmpty(question) ? (this.$("textarea[name=problem-description]").addClass("error"), 
void 0) :(save_data = {
question:question
}, this.model.save(save_data, {
silent:!0,
success:function(_this) {
return function(model) {
return Backbone.history.navigate("tests/" + _this.testmodel.get("id") + "/questions/" + model.get("id") + "/edit", !0);
};
}(this)
}));
}, QuestionSubjectiveEditView;
}(window.HR.GenericView), QuestionCodeEditView = function(_super) {
function QuestionCodeEditView() {
return QuestionCodeEditView.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionCodeEditView, _super), QuestionCodeEditView.prototype.template = "x/question-coding", 
QuestionCodeEditView.prototype.className = "question-coding", QuestionCodeEditView.prototype.initialize = function(options) {
return this._subviews = [], this.step = options.step, this.testmodel = options.testmodel;
}, QuestionCodeEditView.prototype.render = function() {
var content;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
edit:this.model.get("id") ? !0 :!1,
step:this.step,
test:this.testmodel.toJSON()
}), $(this.el).html(content), this.renderStep(this.step), this;
}, QuestionCodeEditView.prototype.renderStep = function(step) {
var step_view;
switch (step) {
case "step1":
return step_view = new QuestionCodeEditStep1View({
model:this.model,
testmodel:this.testmodel
}), this._subviews.push(step_view), this.$("#control-overflow").html(step_view.render().el);

case "step2":
return step_view = new QuestionCodeEditStep2View({
model:this.model,
testmodel:this.testmodel
}), this._subviews.push(step_view), this.$("#control-overflow").html(step_view.render().el);

case "step3":
return step_view = new QuestionCodeEditStep3View({
model:this.model,
testmodel:this.testmodel
}), this._subviews.push(step_view), this.$("#control-overflow").html(step_view.render().el);

case "step4":
return step_view = new QuestionCodeEditStep4View({
model:this.model,
testmodel:this.testmodel
}), this._subviews.push(step_view), this.$("#control-overflow").html(step_view.render().el);
}
}, QuestionCodeEditView;
}(window.HR.GenericView), QuestionCodeEditStep1View = function(_super) {
function QuestionCodeEditStep1View() {
return QuestionCodeEditStep1View.__super__.constructor.apply(this, arguments);
}
return __extends(QuestionCodeEditStep1View, _super), QuestionCodeEditStep1View.prototype.template = "x/question-coding-step1", 
QuestionCodeEditStep1View.prototype.className = "question-coding-step1", QuestionCodeEditStep1View.prototype.initialize = function(options) {
return this.testmodel = options.testmodel, this.edit = this.model.get("id") ? !0 :!1;
}, QuestionCodeEditStep1View.prototype.events = function() {
return {
"submit form[name=coding-question-step1-form]":"saveQuestion"
};
}, QuestionCodeEditStep1View.prototype.render = function() {
var config, content, that;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON()
}), $(this.el).html(content), config = {
skin:"moono",
extraPlugins:"image",
filebrowserUploadUrl:"/xrest/editor_uploads",
toolbar:[ [ "Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript", "-", "NumberedList", "BulletedList", "-", "Indent", "Outdent", "-", "Link", "Unlink" ], [ "Styles", "Format", "Font", "FontSize", "TextColor" ], [ "Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo", "Image" ], [ "Source" ] ],
toolbarCanCollapse:!1,
autoGrow_onStartup:!0,
width:this.$("textarea[name=problem-description]").width() || 780,
removePlugins:"elementspath,contextmenu,liststyle,tabletools",
disableNativeSpellChecker:!1
}, that = this, setTimeout(function() {
return CKEDITOR.instances["problem-description"] && delete CKEDITOR.instances["problem-description"], 
config.width = this.$("textarea[name=problem-description]").width() || 780, this.$("textarea.texteditor").ckeditor(config);
}), this;
}, QuestionCodeEditStep1View.prototype.saveQuestion = function(e) {
var name, question, save_data;
return e.preventDefault(), name = this.$("input[name=name]").removeClass("error").val(), 
question = this.$("textarea[name=problem-description]").removeClass("error").ckeditorGet().getData(), 
_.isEmpty(name) ? (this.$("input[name=name]").addClass("error"), void 0) :_.isEmpty(question) ? (this.$("textarea[name=problem-description]").addClass("error"), 
void 0) :(save_data = {
name:name,
question:question
}, this.model.save(save_data, {
silent:!0,
success:function(_this) {
return function(model) {
return Backbone.history.navigate("tests/" + _this.testmodel.get("id") + "/questions/" + model.get("id") + "/edit/step2", !0);
};
}(this)
}));
}, QuestionCodeEditStep1View;
}(window.HR.GenericView), QuestionCodeEditStep2View = function(_super) {
function QuestionCodeEditStep2View() {
return QuestionCodeEditStep2View.__super__.constructor.apply(this, arguments);
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
r:"R"
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
objectivec:"text/x-csrc"
}, QuestionCodeEditStep2View.prototype.initialize = function(options) {
return this.testmodel = options.testmodel;
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
"click .js-generate-templates":"generateTemplates"
};
}, QuestionCodeEditStep2View.prototype.render = function() {
var $tbody_textarea, allowedLanguages, content, parameters, _model;
return allowedLanguages = [], _model = this.model.toJSON(), _model.allowedLanguages && (this.allowedLanguages = _model.allowedLanguages.split(",")), 
this.language = _.first(this.allowedLanguages) || "c", content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
allowedLanguages:this.allowedLanguages
}), $(this.el).html(content), this.editorOptions = {
lineNumbers:!0,
lineWrapping:!1,
mode:this.lang_mime_mapping[this.language]
}, $tbody_textarea = this.$("textarea#template").get(0), $tbody_textarea && (this.tbody_editor = CodeMirror.fromTextArea($tbody_textarea, this.editorOptions), 
setTimeout(function(_this) {
return function() {
return _this.tbody_editor.refresh();
};
}(this), 10)), this.initCodeEditorLanguageSelect2(), this.initReturnTypeSelect2(), 
this.model.get("functionParams") ? (parameters = this.model.get("functionParams").split(","), 
_.each(parameters, function(_this) {
return function(parameter, index) {
return _this.initParametersSelect2("#brahma-parameter-select2-" + index);
};
}(this))) :this.initParametersSelect2("#brahma-parameter-select2-0"), this;
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
data:data
});
}, QuestionCodeEditStep2View.prototype.initReturnTypeSelect2 = function() {
return this.$("#brahma-return-type").select2({
data:this.returnTypes
});
}, QuestionCodeEditStep2View.prototype.initParametersSelect2 = function(el) {
return this.$(el).select2({
data:this.parameterTypes
});
}, QuestionCodeEditStep2View.prototype.changeLanguage = function(e) {
var $tbody_textarea, id, lang;
return e.preventDefault(), id = this.$(".js-code-section-tabs-list li.active").find(".js-code-section-tab").data("id"), 
this.model.get("" + this.language + "_" + id) !== this.tbody_editor.getValue() && (this.model.set("template_type", "2", {
silent:!0
}), this.model.set("" + this.language + "_" + id, this.tbody_editor.getValue(), {
silent:!0
})), this.$(".js-code-section-tabs-list li").removeClass("active"), this.$(".js-code-section-tab[data-id=template]").parent().addClass("active"), 
lang = this.$(e.currentTarget).val(), this.editorOptions.mode = this.lang_mime_mapping[lang], 
$tbody_textarea = this.$("textarea#template").get(0), $tbody_textarea ? (this.language = lang, 
this.tbody_editor.setOption("mode", this.lang_mime_mapping[lang]), this.tbody_editor.setValue(this.model.get("" + lang + "_template")), 
setTimeout(function(_this) {
return function() {
return _this.tbody_editor.refresh();
};
}(this), 10)) :void 0;
}, QuestionCodeEditStep2View.prototype.switchCodeSection = function(e) {
var $textarea, id, lang;
return e.preventDefault(), this.$(e.currentTarget).parent().hasClass("active") ? void 0 :(id = this.$(".js-code-section-tabs-list li.active").find(".js-code-section-tab").data("id"), 
this.model.get("" + this.language + "_" + id) !== this.tbody_editor.getValue() && (this.model.set("template_type", "2", {
silent:!0
}), this.model.set("" + this.language + "_" + id, this.tbody_editor.getValue(), {
silent:!0
})), id = this.$(e.currentTarget).data("id"), lang = this.$("#code-editor-lang-select2").val(), 
$textarea = this.$("textarea#" + id).get(0), $textarea && (this.language = lang, 
this.tbody_editor.setOption("mode", this.lang_mime_mapping[lang]), this.tbody_editor.setValue(this.model.get("" + lang + "_" + id)), 
setTimeout(function(_this) {
return function() {
return _this.tbody_editor.refresh();
};
}(this), 10)), this.$(".js-code-section-tabs-list li").removeClass("active"), this.$(e.currentTarget).parent().addClass("active"));
}, QuestionCodeEditStep2View.prototype.addParameter = function(e) {
var last_parameter_container, last_parameter_id, next_parameter_id, parameter_block;
return e.preventDefault(), last_parameter_container = _.last(this.$("#brahma-parameters-container .js-brahma-parameter")), 
last_parameter_container ? (last_parameter_id = $(last_parameter_container).find("input.js-parameter-type")[0].getAttribute("data-id"), 
next_parameter_id = parseInt(last_parameter_id) + 1, parameter_block = "<div class='block js-brahma-parameter'> <input type='text' name='functionParameterName'></input><input type='hidden' id='brahma-parameter-select2-" + next_parameter_id + "' class='wide js-parameter-type' value='INTEGER' data-id='" + next_parameter_id + "' name='functionParameterType'> <a href='#' class='txt-alt-grey psA js-remove-parameter'><i class='icon2-delete'></i></a> </div>", 
this.$("#brahma-parameters-container").append(parameter_block), this.initParametersSelect2("#brahma-parameter-select2-" + next_parameter_id)) :void 0;
}, QuestionCodeEditStep2View.prototype.removeParameter = function(e) {
return e.preventDefault(), this.$(e.currentTarget).parent().remove();
}, QuestionCodeEditStep2View.prototype.generateTemplates = function(e) {
var functionName, functionParams, functionReturn;
return e.preventDefault(), functionName = this.$("input[name=functionName]").val(), 
functionReturn = this.$("input[name=functionReturn]").val(), functionParams = [], 
_.each($(".js-brahma-parameter"), function(_this) {
return function(parameter_block) {
var parameter, parameterName, parameterType;
return parameterName = _this.$(parameter_block).find("input[name=functionParameterName]").val(), 
parameterType = _this.$(parameter_block).find("input[name=functionParameterType]").val(), 
parameterName && parameterType ? (parameter = "" + parameterType + " " + parameterName, 
functionParams.push(parameter)) :void 0;
};
}(this)), functionParams = functionParams.join(","), this.model.set("functionParams", functionParams, {
silent:!0
}), this.model.set("functionReturn", functionReturn, {
silent:!0
}), this.model.set("functionName", functionName, {
silent:!0
}), this.model.set("template_type", "1", {
silent:!0
}), this.model.save(null, {
silent:!0,
success:function(_this) {
return function(model) {
var id, lang;
return lang = _this.$("#code-editor-lang-select2").val(), id = _this.$(".js-code-section-tabs-list li.active").find(".js-code-section-tab").data("id"), 
setTimeout(function() {
return _this.tbody_editor.setValue(model.get("" + lang + "_" + id)), _this.tbody_editor.refresh();
}, 10);
};
}(this)
});
}, QuestionCodeEditStep2View.prototype.saveQuestion = function(e) {
var allowedLanguages, id, languages;
return e.preventDefault(), allowedLanguages = [], languages = $("input[name=allowedLanguages]:checked"), 
_.each(languages, function() {
return function(lang) {
return allowedLanguages.push(lang.value);
};
}(this)), this.model.set("allowedLanguages", allowedLanguages.join(",")), id = this.$(".js-code-section-tabs-list li.active").find(".js-code-section-tab").data("id"), 
"0" === this.$("input[name=template_type]:checked").val() ? this.model.set("template_type", "0", {
silent:!0
}) :this.model.get("" + this.language + "_" + id) !== this.tbody_editor.getValue() && (this.model.set("template_type", "2", {
silent:!0
}), this.model.set("" + this.language + "_" + id, this.tbody_editor.getValue(), {
silent:!0
})), this.model.save(null, {
silent:!0,
success:function(_this) {
return function(model) {
return Backbone.history.navigate("tests/" + _this.testmodel.get("id") + "/questions/" + model.get("id") + "/edit/step3", !0);
};
}(this)
});
}, QuestionCodeEditStep2View.prototype.toggleCheckbox = function(e) {
return e.preventDefault(), $(e.currentTarget).hasClass("active") ? ($(e.currentTarget).removeClass("active").removeClass("active"), 
$(e.currentTarget).find("input").removeAttr("checked")) :($(e.currentTarget).addClass("active").addClass("active"), 
$(e.currentTarget).find("input").attr("checked", "checked"));
}, QuestionCodeEditStep2View.prototype.checkAllCheckbox = function(e) {
var languages;
return e.preventDefault(), languages = this.$(".hr-checkbox.languages"), _.each(languages, function() {
return function(lang) {
return $(lang).addClass("active"), $(lang).find("input").attr("checked", "checked");
};
}(this));
}, QuestionCodeEditStep2View.prototype.clearAllCheckbox = function(e) {
var languages;
return e.preventDefault(), languages = this.$(".hr-checkbox.languages"), _.each(languages, function() {
return function(lang) {
return $(lang).removeClass("active"), $(lang).find("input").removeAttr("checked");
};
}(this));
}, QuestionCodeEditStep2View.prototype.toggleCodeStubs = function(e) {
var template_type;
return template_type = $(e.currentTarget).val(), "0" === template_type ? this.$(".js-code-stubs-section").slideUp() :(this.$(".js-code-stubs-section").slideDown(), 
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
var that;
return this._subviews = [], this.testmodel = options.testmodel, this.testcases = new HR.TestCasesCollection(), 
this.testcases.setTid(this.testmodel.get("id")), this.testcases.setQid(this.model.get("id")), 
this.listenTo(this.testcases, "add", this.render), this.listenTo(this.testcases, "remove", this.render), 
this.testCasesFetched = !1, that = this, this.testcases.fetch({
silent:!0,
success:function() {
return that.testCasesFetched = !0, that.render();
},
error:function() {
return that.testCasesFetched = !0, that.render();
}
});
}, QuestionCodeEditStep3View.prototype.events = function() {
return {
"click .js-edit-testcase":"editTestcase",
"click .js-add-testcase":"addTestcase",
"click .js-remove-testcase":"removeTestcase",
"click .js-upload-testcases":"uploadTestcases",
"click .save-question":"saveQuestion"
};
}, QuestionCodeEditStep3View.prototype.render = function() {
var content;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
testcases:this.testcases.toJSON(),
testCasesFetched:this.testCasesFetched
}), $(this.el).html(content), this.testcases.models.length > 0 && _.each(this.testcases.models, function(_this) {
return function(model, index) {
var testcase_view;
return model.set("qid", _this.model.get("id")), model.set("tid", _this.testmodel.get("id")), 
testcase_view = new TestcaseView({
model:model,
index:index,
parent:_this
}), _this._subviews.push(testcase_view), _this.$("tbody").append(testcase_view.render().el);
};
}(this)), this;
}, QuestionCodeEditStep3View.prototype.saveQuestion = function(e) {
var qid, that, tid, view;
return e.preventDefault(), that = this, this.testCasesFetched ? (qid = this.model.get("id"), 
tid = this.testmodel.get("id"), -1 === _.indexOf(_.map(this.testcases.models, function(testcase) {
return testcase.get("sample");
}), !0) ? (view = new TestcaseAlertModalView({
model:this.model,
qid:this.model.get("id"),
tid:this.testmodel.get("id")
}), this._subviews.push(view), this.$("#testcase-alert-modal-container").html(view.render().el)) :"approx" === this.model.get("type") ? HR.router.navigate("/tests/" + tid + "/questions/" + qid + "/edit/step4", !0) :HR.router.navigate("/tests/" + tid + "/questions", !0)) :setTimeout(that.saveQuestion(e), 600);
}, QuestionCodeEditStep3View.prototype.editTestcase = function(e) {
var index, model;
return e.preventDefault(), index = parseInt($(e.currentTarget).data("tcid")), model = this.testcases.at(index), 
model.fetch({
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
});
}, QuestionCodeEditStep3View.prototype.addTestcase = function(e) {
var add_testcase_view, index, model;
return e.preventDefault(), index = this.testcases.models.length, model = new HR.TestCaseModel({
qid:this.model.get("id"),
tid:this.testmodel.get("id")
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
return this.tid = options.tid, this.qid = options.qid;
}, TestcaseAlertModalView.prototype.events = function() {
return {
"click .continue-navigation":"continueNavigation"
};
}, TestcaseAlertModalView.prototype._render = function() {
var content;
return content = HR.appController.template(this.template, this), $(this.el).html(content), 
this.$("#testcase-alert-modal").modal(), this;
}, TestcaseAlertModalView.prototype.continueNavigation = function(e) {
return e.preventDefault(), this.$(".close").click(), "approx" === this.model.get("type") ? HR.router.navigate("/tests/" + this.tid + "/questions/" + this.qid + "/edit/step4", !0) :HR.router.navigate("/tests/" + this.tid + "/questions", !0);
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
return e.preventDefault(), delete_testcase_modal = new TestcaseDeleteModalView({
model:this.model
}), this.parent.$("#testcase-modal-container").html(delete_testcase_modal.render().el);
}, TestcaseView.prototype.downloadTestcase = function(e) {
return e.preventDefault(), $.getJSON(this.model.downloadURL(), function() {
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
TestcaseDeleteModalView.prototype.className = "testcase-delete-modal", TestcaseDeleteModalView.prototype.events = function() {
return {
"click .js-delete-testcase":"deleteTestcase"
};
}, TestcaseDeleteModalView.prototype.render = function() {
var content;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON()
}), $(this.el).html(content), this.$("#delete-testcase-modal").modal(), this;
}, TestcaseDeleteModalView.prototype.deleteTestcase = function() {
return this.$(".close").click(), this.model.destroy({
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
r:"R"
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
objectivec:"text/x-csrc"
}, QuestionCodeEditStep4View.prototype.initialize = function(options) {
return this.testmodel = options.testmodel, this.savedCodes = {};
}, QuestionCodeEditStep4View.prototype.events = function() {
return {
"submit form[name=coding-question-step4-form]":"saveQuestion",
"change #code-editor-lang-select2":"changeLanguage"
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
}, $tbody_textarea = this.$("textarea#evaluator_code").get(0), $tbody_textarea && (this.tbody_editor = CodeMirror.fromTextArea($tbody_textarea, this.editorOptions), 
setTimeout(function(_this) {
return function() {
return _this.tbody_editor.refresh();
};
}(this), 10)), this.initCodeEditorLanguageSelect2(), this;
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
data:data
});
}, QuestionCodeEditStep4View.prototype.changeLanguage = function(e) {
var $tbody_textarea, lang;
return e.preventDefault(), this.savedCodes[this.language] = this.tbody_editor.getValue(), 
lang = this.$(e.currentTarget).val(), this.editorOptions.mode = this.lang_mime_mapping[lang], 
$tbody_textarea = this.$("textarea#evaluator_code").get(0), $tbody_textarea ? (this.language = lang, 
this.tbody_editor.setOption("mode", this.lang_mime_mapping[lang]), this.savedCodes[this.language] ? this.tbody_editor.setValue(this.savedCodes[this.language]) :this.tbody_editor.setValue(""), 
setTimeout(function(_this) {
return function() {
return _this.tbody_editor.refresh();
};
}(this), 10)) :void 0;
}, QuestionCodeEditStep4View.prototype.saveQuestion = function(e) {
return e.preventDefault(), this.model.set("evaluator_language", this.language, {
silent:!0
}), this.model.set("evaluator_code", this.tbody_editor.getValue(), {
silent:!0
}), this.model.save(null, {
silent:!0,
success:function(_this) {
return function() {
return Backbone.history.navigate("tests/" + _this.testmodel.get("id") + "/questions", !0);
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
}, TestQuestionsShufflingView.prototype.render = function() {
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
var shuffling;
return e.preventDefault(), shuffling = this.$("input[name=questions-shuffling]").attr("checked"), 
shuffling ? this.model.set("shuffle_questions", "True") :this.model.set("shuffle_questions", "False"), 
this.model.save();
}, TestQuestionsShufflingView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestQuestionsShufflingView = TestQuestionsShufflingView;
});
}.call(this), function() {
var HR, TestQuestionsView, _ref, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {}), TestQuestionsView = function(_super) {
function TestQuestionsView() {
return TestQuestionsView.__super__.constructor.apply(this, arguments);
}
return __extends(TestQuestionsView, _super), TestQuestionsView.prototype.initialize = function(options) {
var that;
return that = this, this.action = options.action, this.listenTo(this.model, "change", this.render), 
this.listenTo(this.model, "reset", this.render), this.deleteQuestionId = null;
}, TestQuestionsView.prototype.template = "x/test-questions", TestQuestionsView.prototype.className = "test-questions-view", 
TestQuestionsView.prototype.events = function() {
return {
"click .js-toggle-question-desc":"toggleQuestionDesc",
"click .js-createnew":"createNew",
"click .js-create-question":"createQuestion",
"click .js-question-delete":"deleteQuestion",
"click #undo-delete-question":"undoDeleteQuestion"
};
}, TestQuestionsView.prototype.render = function() {
var content, that, _model;
return that = this, $(".tooltip").hide(), _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
deleteQuestionId:this.deleteQuestionId,
throbber:HR.appController.viewLoader(),
h:window.istreet.cfg.permissions
}), $(this.el).html(content), this.$(".tip").tooltip()), this.makeButtonsResponsive(), 
setTimeout(function(_this) {
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
return _this.model.fetch();
}
}));
}
});
};
}(this), 300), "new" === this.action && this.$(".js-create-question").trigger("click"), 
this;
}, TestQuestionsView.prototype.remove = function() {
return $(".tooltip").hide(), TestQuestionsView.__super__.remove.apply(this, arguments);
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
}, TestQuestionsView.prototype.deleteQuestion = function(e) {
var index, qid, that;
return e.preventDefault(), that = this, qid = $(e.currentTarget).data("question-id"), 
index = parseInt($(e.currentTarget).data("index"), 10), this.model.removeQuestion(qid, {
success:function() {
return console.log("success"), that.showUndoMessage(qid, index), setTimeout(function() {
return that.hideUndoMessage(), that.render();
}, 1e4), that.model.fetch();
},
error:function() {
return console.log("error");
}
});
}, TestQuestionsView.prototype.showUndoMessage = function(id, index) {
return this.deleteQuestionId = {
id:id,
index:index
}, this.render();
}, TestQuestionsView.prototype.hideUndoMessage = function() {
return this.deleteQuestionId = null;
}, TestQuestionsView.prototype.undoDeleteQuestion = function(e) {
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
var HR, ReportDetailedCodeView, ReportDetailedCorrectErrorsView, ReportDetailedDrawView, ReportDetailedMCQView, ReportDetailedQuestionView, ReportDetailedRewriteCompleteView, ReportDetailedTextAnsView, ReportDetailedView, ReportSummaryView, ReportTimelineView, TestReportView, _ref;
return TestReportView = function(_super) {
function TestReportView() {
return TestReportView.__super__.constructor.apply(this, arguments);
}
return __extends(TestReportView, _super), TestReportView.prototype.template = "x/test-report", 
TestReportView.prototype.className = "test-report", TestReportView.prototype.initialize = function(options) {
return this._subviews = [], this.testmodel = options.testmodel, this.aid = options.aid, 
this.tid = options.tid, this.qid = options.qid, this.user = HR.currentUser, this.tab = options.tab, 
this.auth_pass = options.auth_pass ? options.auth_pass :null, this.tq_split = {}, 
this.model = new HR.TestAttemptModel({
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
"click .js-set-ats":"setAts"
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
}, TestReportView.prototype.setAts = function(e) {
var ats, el;
return e.preventDefault(), el = this.$(e.currentTarget), ats = parseInt(el.attr("data-attribute-ats")), 
this.testmodel.setAction("set_attempts_ats"), this.testmodel.save({
aids:[ this.model.get("id") ],
set_ats:ats
}, {
success:function(_this) {
return function() {
return _this.testmodel.unsetAction(), _this.model.fetch(), _this.testmodel.fetch({
success:function() {
return HR.appView.updateSidebarView();
}
});
};
}(this),
error:function(_this) {
return function() {
return _this.testmodel.unsetAction();
};
}(this)
});
}, TestReportView.prototype.changeTab = function(e) {
var new_url, qid, tab;
return e.preventDefault(), tab = $(e.currentTarget).data("tab"), qid = $(e.currentTarget).data("qid"), 
this.$(".sub-topbar-tabs li").removeClass("active"), this.$(".sub-topbar-tabs li a[data-tab=" + tab + "]").parent().addClass("active"), 
new_url = "/x/tests/" + this.tid + "/candidates/" + this.aid + "/report/" + tab, 
qid && (new_url += "/" + qid), window.history.pushState(null, null, new_url), this.renderTab(tab, qid);
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
var client, url;
return e.preventDefault(), url = "" + document.location.host + "/x/tests/" + this.testmodel.get("id") + "/candidates/" + this.model.get("id") + "/report?authkey=" + this.testmodel.get("authkey"), 
this.$(".js-reportlink").val(url), $("#copy-share-link-report").attr("data-clipboard-text", url), 
this.$(".sharereport-modal").modal(), this.$("#report-link-inp").select(), client = new ZeroClipboard($("#copy-share-link-report"), {
container:$("div.modal.fade.sharereport-modal")
}), $("#global-zeroclipboard-html-bridge").css("position", "fixed");
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
}, url = "/xrest/tests/" + this.model.get("tid") + "/attempts/" + this.model.get("id") + "/report_comment", 
$.post(url, opts, function(_this) {
return function(data) {
var html;
return data.status === !0 ? (html = '<div class="msT msB"> <p>' + _.escape(data.model.comment) + '</p> <p class="txt-alt-grey">- ' + data.model.name + " (" + HR.util.formatDateTime(data.model.inserttime) + ")</p> </div>", 
_this.$(".comments_container").append(html), _this.$("#add_new_report_comment").val(""), 
that.model.fetch({
silent:!0
})) :void 0;
};
}(this))) :alert("Please type a comment, and press enter.")) :!0;
}, ReportSummaryView.prototype._render = function() {
var content, html, more_details, outof;
return more_details = [], this.model.get("test") && (_.each(this.model.get("candidate_details"), function(detail) {
return more_details.push(detail);
}), this.model.get("ip_address") && more_details.push({
title:"IP ADDRESS",
value:this.model.get("ip_address")
}), this.model.get("inviter") && more_details.push({
title:"INVITED BY",
value:this.model.get("inviter")
}), this.model.get("feedback") && more_details.push({
title:"FEEDBACK",
value:this.model.get("feedback")
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
showcomment:"pdf" !== this.tab
}), $(this.el).html(content), this.model.get("test") && (outof = this.model.get("test").max_score, 
outof < this.model.get("score") && (outof = this.model.get("score")), this.makeDonut(this.model.get("score"), outof - this.model.get("score"))), 
this;
}, ReportSummaryView.prototype.makeDonut = function(a, b) {
var data, options;
if (this.model.get("test")) return data = google.visualization.arrayToDataTable([ [ "A", "B" ], [ "Right", parseInt(a) ], [ "Wrong", parseInt(b) ] ]), 
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
}, setTimeout(function() {
return new google.visualization.PieChart(this.$("#donut")[0]).draw(data, options);
}, 300);
}, ReportSummaryView;
}(window.HR.GenericView), ReportDetailedView = function(_super) {
function ReportDetailedView() {
return ReportDetailedView.__super__.constructor.apply(this, arguments);
}
return __extends(ReportDetailedView, _super), ReportDetailedView.prototype.template = "x/test-report-detailed", 
ReportDetailedView.prototype.className = "test-report-detailed", ReportDetailedView.prototype.initialize = function(options) {
return this.testmodel = options.testmodel, this.tab = options.tab, this._subviews = [];
}, ReportDetailedView.prototype.events = function() {}, ReportDetailedView.prototype._render = function(qid) {
var content;
return null == qid && (qid = null), content = HR.appController.template(this.template, this), 
$(this.el).html(content), this.renderQuestions(), setTimeout(function(_this) {
return function() {
return qid ? _this.scrollToQuestion(qid) :void 0;
};
}(this), 200), this;
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
showcomment:"pdf" !== _this.tab
}), questions_container.append(question_view.render().el);
};
}(this)), this.$("#detailed-report").append(questions_container);
}, ReportDetailedView.prototype.scrollToQuestion = function(qid) {
return $("#report-tab").animate({
scrollTop:$("#report-q-" + qid).position().top
}, 2e3);
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
text:"Not attempted",
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
this.test = options.test, this.showcomment = options.showcomment, p = this.model.get("plagiarism"), 
this.plagiarism = p && p.plagiarism.questions[this.question.id], this.status_icon = this.plagiarism ? "review" :this.status[this.question.status] ? this.status[this.question.status] :this.status.neutral;
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
}, url = "/xrest/tests/" + this.model.get("tid") + "/attempts/" + this.model.get("id") + "/report_comment", 
$.post(url, opts, function(_this) {
return function(data) {
var html;
return data.status === !0 ? (html = '<div class="msT msB"> <p>' + _.escape(data.model.comment) + '</p> <p class="txt-alt-grey">- ' + data.model.name + " (" + HR.util.formatDateTime(data.model.inserttime) + ")</p> </div>", 
_this.$(".comments_container").append(html), _this.$("#add_new_comment").val(""), 
that.model.fetch({
silent:!0
})) :void 0;
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
url:"/xrest/tests/" + this.test.get("id") + "/attempts/" + this.model.id + "/update_score",
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
return that.$(".score-changer").removeClass("hidden").html("Score " + score), that.$(".score-input").addClass("hidden"), 
that.question.score = score;
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
var btn_el, clip, content, e;
return content = HR.appController.template(this.template, this)({
model:this.model.toJSON(),
question:this.question,
index:this.index,
time:0,
status:this.status_icon,
plagiarism:this.plagiarism,
showcomment:this.showcomment
}), $(this.el).html(content), btn_el = ".btn-copy-" + this.question.id, e = $(btn_el), 
this.question.submissions && this.question.submissions.length > 0 && (e.attr("data-clipboard-text", this.question.submissions[this.question.submissions.length - 1].answer), 
e.length && (clip = new ZeroClipboard(e), clip.setTitle("Copy this code"))), this.displayAnswer(), 
this;
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
test:this.test
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
}(window.HR.GenericView), ReportDetailedCodeView = function(_super) {
function ReportDetailedCodeView() {
return ReportDetailedCodeView.__super__.constructor.apply(this, arguments);
}
return __extends(ReportDetailedCodeView, _super), ReportDetailedCodeView.prototype.template = "x/test-report-detailed-coding", 
ReportDetailedCodeView.prototype.className = "test-report-detailed-code", ReportDetailedCodeView.prototype.initialize = function(options) {
var p, plagiarismList, sid;
return this.question = options.question, this.test = options.test, p = this.model.get("plagiarism"), 
this.plagiarism = p && p.plagiarism.questions && p.plagiarism.questions[this.question.id], 
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
"click .js-review":"showDiff"
};
}, ReportDetailedCodeView.prototype._render = function() {
var content, that;
return content = HR.appController.template(this.template, this)({
question:this.question,
sid:this.sid,
plagiarism:this.plagiarismList,
test:this.test.toJSON(),
anysubmissions:this.question.submissions && this.question.submissions.length > 0
}), $(this.el).html(content), this.question.submissions && this.viewCode(this.question.submissions, this.question.my_lang, this.question.submissions.length - 1), 
this.$(".slider").slider({
min:1,
max:this.question.submissions.length,
value:this.question.submissions.length
}), that = this, setTimeout(function() {
var btn_el, clip, e;
return btn_el = ".js-btn-copy-" + that.question.id, e = $(btn_el), that.question.submissions && that.question.submissions.length > 0 && (e.attr("data-clipboard-text", that.question.submissions[that.question.submissions.length - 1].answer), 
e.length) ? (clip = new ZeroClipboard(e, {
container:$("div.right_cont div.rt_content_wrap").get(0)
}), clip.setTitle("Copy this code")) :void 0;
}, 200), this;
}, ReportDetailedCodeView.prototype.showDiff = function(e) {
var diff_view, el, left, opcodes, pos, right, sim, sm, solves;
return e.preventDefault(), el = this.$(e.currentTarget), sim = el.attr("data-similarity"), 
pos = sim > 90 ? "high" :sim > 80 ? "medium" :"low", this.$(".js-possibility").html(pos), 
this.$(".js-similarity").html(sim), solves = this.model.get("plagiarism").solves, 
left = difflib.stringAsLines(solves[el.attr("data-current")].answer.code), right = difflib.stringAsLines(solves[el.attr("data-review")].answer.code), 
sm = new difflib.SequenceMatcher(left, right), opcodes = sm.get_opcodes(), diff_view = diffview.buildView({
baseTextLines:left,
newTextLines:right,
opcodes:opcodes,
baseTextName:"Current Solution",
newTextName:"Solution by " + el.attr("data-email"),
viewType:0
}), this.$(".js-code-diff").html(diff_view), this.$(".js-plagiarism-modal").modal();
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
this.viewCode(this.question.submissions, this.question.my_lang, parseInt(ui.value, 10) - 1), 
430 === this.$("#code-player").width() && this.$(".playcode_txt").html(this.codeTime), 
btn_el = ".js-btn-copy-" + this.question.id, e = $(btn_el), e.attr("data-clipboard-text", ans);
}, ReportDetailedCodeView.prototype.viewCode = function(submissions, lang, i) {
var col, currentCodeLine, currentLineNumber, ix, l, lang_mime_mapping, language, lineNumber, node, submission, tabSize, that;
if (lang_mime_mapping = {
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
}, submissions) {
if (that = this, submission = submissions[i], ix = i, !submission) return;
return this.codeTime = "At " + submission.timespan, l = submission.lang || lang, 
language = lang_mime_mapping[l], this.$(".langused").html(l.toUpperCase()), node = this.$("pre.outbox"), 
node.empty(), $(node).append('<table><tr><td class="line-no" width="5%"></td><td class="code"></td></tr></table>'), 
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
});
}
}, ReportDetailedCodeView;
}(window.HR.GenericView), ReportTimelineView = function(_super) {
function ReportTimelineView() {
return this.checkForIframeError = __bind(this.checkForIframeError, this), this.setIframeData = __bind(this.setIframeData, this), 
ReportTimelineView.__super__.constructor.apply(this, arguments);
}
return __extends(ReportTimelineView, _super), ReportTimelineView.prototype.template = "x/test-report-timeline", 
ReportTimelineView.prototype.className = "test-report-timeline", ReportTimelineView.prototype.initialize = function(options) {
return this.model = options.model, this.testmodel = options.testmodel, this.timeline = this.model.get("timeline") ? this.model.get("timeline") :[], 
this.qarray = {}, this.lastqno = null, this.hasDisconnect = !1, this.offlineTime = 0, 
this.dt = null, this.timeline.length > 1 ? this.buildGoogleDatatable() :void 0;
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
if (null === this.dt && 0 !== this.timeline.length) {
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
"click .js-ats":"atsFilter",
"keypress .js-search":"filterSummary",
"click .js-dateclear":"clearDate",
"click .js-emailclear":"clearEmail",
"click #qtype_check":"toggleQuestionType",
"click #qtags_check":"toggleQuestionTags",
"click .js-pdfdl":"pdfDownload",
"click .js-refresh":"refresh"
};
}, TestReportsView.prototype.initialize = function(options) {
return this._subviews = [], this.testmodel = options.testmodel, this.type = options.type, 
this.subtype = options.subtype, this.showTags = HR.UserSettings.get("showTags", !1), 
this.showQuesTypes = HR.UserSettings.get("showQuesTypes", !1), document.timestring || (document.timestring = {}), 
this.testmodel.get("id") in document.timestring ? void 0 :document.timestring[this.testmodel.get("id")] = moment().subtract("days", 7).format("YYYY-MM-DD") + " to " + moment().format("YYYY-MM-DD");
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
this.datatable_view.ats = this.subtype, window.history.pushState(null, null, "/x/tests/" + this.testmodel.get("id") + "/candidates/completed/" + this.subtype), 
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
"click .js-invaction":"invAction"
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
showQuesTypes:this.showQuesTypes
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
}, TestReportsDataTableView.prototype.atsAction = function(e) {
var act, action, sel_ids;
return e.preventDefault(), action = this.$(e.currentTarget).attr("data-action"), 
sel_ids = this.getCheckedIds(), this.testmodel.setAction("set_attempts_ats"), act = "qualify" === action ? 2 :3, 
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
return HR.appView.updateSidebarView();
}
});
};
}(this),
error:function(_this) {
return function() {
return _this.testmodel.unsetAction();
};
}(this)
})) :(HR.emailqueue = "reinvitemany" === action ? this.getCheckedEmails :[ parseInt(this.$(e.currentTarget).attr("data-email")) ], 
HR.router.navigate("/tests/" + this.testmodel.id + "/invite", !0));
}, TestReportsDataTableView.prototype.addTime = function(e) {
var aid, el, time;
return e.preventDefault(), el = this.$(e.currentTarget), aid = el.attr("aid"), time = this.$("input[aid=" + aid + "]").val(), 
isNaN(time) ? (alert("Invalid time. Enter number of minutes to add."), this.$("input[aid=" + aid + "]").val(""), 
void 0) :(time = parseInt(time), $.ajax({
type:"put",
url:"/xrest/tests/" + this.testmodel.get("id") + "/attempts/" + aid,
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
}.apply(this), [ 2, 4 ]), aaSorting = [ [ 4, "desc" ] ]) :(nosort = _.difference(function() {
_results1 = [];
for (var _l = 0; cols >= 0 ? cols > _l :_l > cols; cols >= 0 ? _l++ :_l--) _results1.push(_l);
return _results1;
}.apply(this), [ 2, 3, 4 ]), aaSorting = [ [ 3, "desc" ] ]), setTimeout(function(_this) {
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
sAjaxSource:"/xrest/tests/" + _this.testmodel.get("id") + "/attempts?state=" + _this.state + "&ats=" + _this.ats + searchparam + dateparam,
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
return _this.mapColumns(row, ix);
};
}(this))), result;
}, TestReportsDataTableView.prototype.mapColumns = function(row, index) {
var ret;
return ret = [], _.each(this.columns, function(_this) {
return function(column) {
var aid, tag, time_left, typ;
return "invited" === _this.type ? "index" === column ? (ret.push("<input id='candidate_" + index + "' data-id='" + row.id + "' data-email='" + row.email + "' name='candidate_" + index + "' type='checkbox' class='candidate_checkbox hr-sleek-input'> <label for='candidate_" + index + "'><span></span></label>"), 
void 0) :("email" === column ? ret.push(row.email) :"link" === column ? ret.push("<div class='btn-group'><a style='min-width:80px; padding:8px;' class='btn btn-mini mdL js-invaction' data-id='" + row.id + "' data-action='cancel'>Cancel invite</a><a style='min-width:80px; padding:8px;' class='btn btn-mini mdL js-invaction' data-action='reinvite' data-id='" + row.email + "'>Reinvite</a></div>") :"invited_by" === column ? ret.push(row.invited_by) :"endtime" === column ? ret.push(moment(row[column]).format("D MMM, YYYY - HH:mm")) :ret.push(""), 
void 0) :column.startsWith("type_score_") ? (typ = column.slice(11), row.question_types_score && row.question_types_score[typ] ? ret.push(row.question_types_score[typ]) :ret.push("-"), 
void 0) :column.startsWith("tag_score_") ? (tag = column.slice(10), row.tags_score && row.tags_score[tag] ? ret.push(row.tags_score[tag]) :ret.push("-"), 
void 0) :"invited_by" === column ? (ret.push(row.invited_by), void 0) :"endtime" === column ? (ret.push(moment(row[column]).format("D MMM, YYYY - HH:mm")), 
void 0) :"index" === column ? ret.push("<input id='candidate_" + index + "' data-id='" + row.id + "' name='candidate_" + index + "' type='checkbox' class='candidate_checkbox hr-sleek-input'> <label for='candidate_" + index + "'><span></span></label>") :"link" === column ? ret.push("<a style='min-width:100px; padding:8px;' class='js-backbone btn btn-line mdL' href=\"/tests/" + _this.testmodel.get("id") + "/candidates/" + row.id + '/report">View</a>') :"email" === column ? ret.push("<a class='js-backbone' href=\"/tests/" + _this.testmodel.get("id") + "/candidates/" + row.id + '/report">' + row.email + "</a>") :"time_left" === column ? (aid = row.id, 
time_left = 0 === row[column] ? "None" :Math.ceil(row[column] / 60) + " min", row.added_time_buffer && "0" !== row.added_time_buffer && (time_left += "<span style='color:#979faf'> + " + row.added_time_buffer + "min :</span>"), 
ret.push("<div class='input-btn-group' style='min-width:160px;'>" + time_left + " <input placeholder='(min)' class='span1 no-margin fnt-sz-mid' type='text' aid='" + aid + "' name='add_" + aid + "''><a style=\n'position:relative; top:1px; padding: 7px 7px 6px 7px;' class='btn js-addtime' aid='" + aid + "'>Add</a></div>")) :row[column] ? ret.push(row[column]) :ret.push("-");
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
this.insertMessage(value);
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
}, TestSavedResponse.prototype.insertMessage = function(value) {
return $("#email_content").val(value);
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
"click .js-remove-user":"removeUser"
};
}, TestShareView.prototype.render = function() {
var content, that, _model;
return that = this, _model = this.model.toJSON(), _model && (content = HR.appController.template(this.template, this)({
model:_model,
testmodel:this.testmodel.toJSON(),
throbber:HR.appController.viewLoader(),
permissionMappings:this.permissionMappings
}), $(this.el).html(content)), this;
}, TestShareView.prototype.shareWithUser = function(e) {
var email, permissions;
return e.preventDefault(), (permissions = this.$("input[name=share-permissions]:checked").val()) ? (email = this.$("input[name=user-email]").removeClass("error").val(), 
email ? $.post("/xrest/tests/" + this.testmodel.get("id") + "/share", {
type:"user",
email:email,
permissions:permissions
}, function(_this) {
return function(data) {
return data.status === !0 ? _this.model.fetch() :void 0;
};
}(this)) :(this.$("input[name=user-email]").addClass("error"), void 0)) :void 0;
}, TestShareView.prototype.shareWithTeam = function(e) {
var team_id;
return e.preventDefault(), team_id = this.$("select[name=team]").val(), $.post("/xrest/tests/" + this.testmodel.get("id") + "/share", {
type:"team",
team_id:team_id
}, function(_this) {
return function(data) {
return data.status === !0 ? _this.model.fetch() :void 0;
};
}(this));
}, TestShareView.prototype.removeUser = function(e) {
var user_id;
return e.preventDefault(), user_id = this.$(e.currentTarget).data("id"), $.ajax({
url:"/xrest/tests/" + this.testmodel.get("id") + "/share",
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
return e.preventDefault(), team_id = this.$(e.currentTarget).data("id"), $.ajax({
url:"/xrest/tests/" + this.testmodel.get("id") + "/share",
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
format:"yyyy-m-d",
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
var end, enddate, endtime, start, startdate, starttime;
return e.preventDefault(), startdate = $("#date-from").val(), startdate ? (starttime = $.trim($(".time.start").val()) + ":00", 
start = startdate + " " + starttime) :starttime = "0000-00-00 00:00:00", enddate = $("#date-to").val(), 
enddate ? (endtime = $.trim($(".time.end").val()) + ":00", end = enddate + " " + endtime) :endtime = "0000-00-00 00:00:00", 
this.model.set("starttime", start), this.model.set("endtime", end), this.model.save();
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
var viewfound;
switch (this.$(".js-questiontext").html(this.question.question), viewfound = !0, 
this.question.type) {
case "code":
case "approx":
this.view = new HR.RecruitCandidateCodingView({
question:this.question,
disableLocalStorage:!0
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

default:
viewfound = !1;
}
return viewfound ? this.$(".js-tryview").html(this.view.render().el) :(this.$(".js-tryview").html("<center>This question type is not available to try at this time.</center>"), 
this.$(".js-ans-submit").hide());
}, TestTryQuestionView.prototype.submitAnswer = function(e) {
var ans, correct, _ref;
return e.preventDefault(), "mcq" === this.question.type ? (this.view.answer() !== this.question.answer ? this.$(".js-trymsg").html("Incorrect. The correct answer is option " + this.question.answer) :this.$(".js-trymsg").html("Correct answer."), 
this.$(".js-tryalert").removeClass("hide")) :"multiple_mcq" === this.question.type ? (ans = _.map(this.view.answer(), function(i) {
return parseInt(i);
}), 0 === _.difference(ans, this.question.answer).length ? this.$(".js-trymsg").html("Correct answer.") :(correct = this.question.answer.join(", "), 
this.$(".js-trymsg").html("Incorrect. The correct options :[" + correct + "]")), 
this.$(".js-tryalert").removeClass("hide")) :"textAns" === this.question.type ? (this.$(".js-trymsg").html("This answer is subjective, and evaluated later."), 
this.$(".js-tryalert").removeClass("hide")) :"code" === (_ref = this.question.type) || "approx" === _ref ? this.submitCodeAnswer(this.view.answer()) :void 0;
}, TestTryQuestionView.prototype.submitCodeAnswer = function(data) {
return this.$(".js-tryalert").addClass("hide"), data.code ? this.$(".bb-compile").hasClass("disabled") ? void 0 :(this.$(".bb-compile").addClass("disabled"), 
HR.candidate.ctmodel = new HR.RecruitCompileTestModel(), HR.candidate.ctmodel.setTid(this.test.get("id")), 
HR.candidate.ctmodel.setQid(this.question.id), HR.candidate.ctview = new HR.RecruitCandidateCompileTestView(), 
this.$("#runstatus").html(HR.candidate.ctview.render().el), HR.util.scrollToBottom(1e3), 
HR.candidate.ctmodel.save(data, {
success:function(_this) {
return function() {
return HR.candidate.ctview.setStatus("Uploaded. Waiting for results.."), HR.candidate.ctloop = setTimeout(function() {
return _this.checkForResult(_this, data);
}, 2e3);
};
}(this),
error:function(_this) {
return function() {
return HR.candidate.ctmodel = null, HR.candidate.ctview.setStatus("There was an issue with compiling this code."), 
_this.$(".bb-compile").removeClass("disabled");
};
}(this)
})) :(this.$(".js-trymsg").html("Please enter an answer."), this.$(".js-tryalert").removeClass("hide"), 
void 0);
}, TestTryQuestionView.prototype.checkForResult = function(that, data) {
return HR.candidate.ctloop ? (HR.candidate.ctview.setStatus("Processing.."), HR.candidate.ctmodel.fetch({
success:function(_this) {
return function(m) {
var expected_output, i, input, msg, output, pass, st_class, _i, _len, _ref;
if (0 === m.get("status")) return HR.candidate.ctloop = setTimeout(function() {
return that.checkForResult(that, data);
}, 2e3), void 0;
if (0 !== m.get("status")) {
if ($(".bb-compile").removeClass("disabled"), clearTimeout(HR.candidate.ctloop), 
HR.candidate.ctloop = null, m.get("result") > 0) return HR.candidate.ctview.setStatus("Error.", "red"), 
HR.candidate.ctview.setCompileStatus("Compilation failed.", m.get("compilemessage"));
for (pass = 0, _ref = m.get("testcase_status"), i = _i = 0, _len = _ref.length; _len > _i; i = ++_i) input = _ref[i], 
output = m.get("stdout")[i], expected_output = m.get("expected_output")[i], msg = m.get("testcase_message")[i], 
1 === m.get("testcase_status")[i] ? (st_class = "green", pass++) :st_class = "red", 
HR.candidate.ctview.addTestCase(i + 1, input, output, expected_output, msg, st_class);
if (0 === pass) return HR.candidate.ctview.setStatus("No test cases passed.", "red");
if (i > pass) return HR.candidate.ctview.setStatus("Compiled successfully. " + pass + "/" + i + " sample test cases passed.", "orange");
if (HR.candidate.ctview.setStatus("Compiled successfully. All sample test cases passed!", "green"), 
"runalltestcases" !== e) return _this.$(".bb-runall").show(), that.compileAnswer("runalltestcases", data);
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
return that.$(".close").click(), that.parent.render();
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
return __extends(TestsView, _super), TestsView.prototype.initialize = function() {
var that;
return that = this, this._subviews = [], this.listenTo(this.collection, "change", this.render), 
this.listenTo(this.collection, "sort", this.render);
}, TestsView.prototype.template = "x/tests", TestsView.prototype.className = "tests-list-view", 
TestsView.prototype.events = function() {
return {
"click a#new-test-popup-link":"showCreateTestPopup",
"click a#new-test-popup-cancel":"closeCreateTestPopup",
"submit form[name=new-test-form]":"createTest",
"keydown #new-test-duration":"checkInput"
};
}, TestsView.prototype._render = function() {
var content, that, _collection;
return that = this, _collection = this.collection.toJSON(), _collection && (content = HR.appController.template(this.template, this)({
collection:_collection,
throbber:HR.appController.viewLoader(),
pagination:HR.util.pagination($("<div></div>"), this.collection.getTotal(), "tests/page/", this.collection.getPage(), null, 10, 5, "js-backbone", !0)
}), $(this.el).html(content)), setTimeout(function() {
return $("body").click(function(e) {
return "new-test-popup-link" === e.target.id || "icon2-createtest" === e.target.className || $(e.target).closest("#new-test-popup").length ? void 0 :that.closeCreateTestPopup();
});
}), this.renderTests(), this;
}, TestsView.prototype.renderTests = function() {
return this.collection.models.length > 0 ? _.each(this.collection.models, function(_this) {
return function(model) {
var test_list_item_view;
return test_list_item_view = new TestListItemView({
model:model,
parent:_this
}), _this._subviews.push(test_list_item_view), _this.$("#tests-container").append(test_list_item_view.render().el);
};
}(this)) :void 0;
}, TestsView.prototype.createTest = function(e) {
var attributes;
return e.preventDefault(), this.$(".response-message").removeClass("error").addClass("hidden"), 
attributes = {
name:this.$("#new-test-name").val(),
duration:this.$("#new-test-duration").val()
}, _.isEmpty(attributes.name) ? (this.$("#new-test-name").addClass("error"), this.$(".response-message").removeClass("hidden").addClass("error").html("Test Name Cannot be Empty"), 
!1) :this.collection.create(attributes, {
success:function(model) {
return Backbone.history.navigate("tests/" + model.id + "/questions", !0);
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
return e.preventDefault(), this.$("#create-new-test-pointer").addClass("hidden"), 
this.$("#new-test-popup").removeClass("hidden");
}, TestsView.prototype.closeCreateTestPopup = function(e) {
return e && e.preventDefault(), {
name:this.$("#new-test-name").val(""),
duration:this.$("#new-test-duration").val("")
}, this.$("#create-new-test-pointer").removeClass("hidden"), this.$("#new-test-popup").addClass("hidden");
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
return e.preventDefault(), starred_test_ids = HR.currentUser.get("starred_test_ids"), 
starred_test_ids || (starred_test_ids = []), $(this.el).hasClass("starred") ? (index = starred_test_ids.indexOf(this.model.get("id")), 
starred_test_ids.splice(index, 1)) :starred_test_ids.push(this.model.get("id")), 
HR.currentUser.set("starred_test_ids", starred_test_ids), HR.currentUser.save(null, {
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
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.TestsView = TestsView;
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
}), $(this.el).html(content), this;
}, TopNavigationBarView.prototype.setTerm = function(term) {
return this.term = term, this.render();
}, TopNavigationBarView.prototype.navigateAnchor = function(e) {
var href;
return e.ctrlKey || e.metaKey ? !0 :(e.preventDefault(), href = $(e.currentTarget).attr("href"), 
href && "#" !== href ? (HR.router.navigate(href, !0), this.render()) :void 0);
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
}, GenericModel.prototype.parse = function(resp, xhr) {
var model;
return this.sync_status = !0, void 0 === this.disableThrobber || this.disableThrobber !== !0 ? (HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("", !1, !0, 0), 
HR.loadingButton && HR.util.inlineLoadingEnd(resp)) :this.disableThrobber = !1, 
model = resp && resp.model ? resp.model :resp, GenericModel.__super__.parse.call(this, model, xhr);
}, GenericModel.prototype.fetch = function() {
return this.trigger("initreset"), void 0 === this.disableThrobber || this.disableThrobber !== !0 ? HR.util && HR.util.ajaxmsg && HR.util.ajaxmsg("Loading...", !1, !0, 1e3) :this.disableThrobber = !1, 
Backbone.Model.prototype.fetch.apply(this, arguments);
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
return this.get("id") ? "/xrest/tests/" + this.tid + "/questions/" + this.qid + "/compile_tests/" + this.get("id") :"/xrest/tests/" + this.tid + "/questions/" + this.qid + "/compile_tests";
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
var HR, InterviewModel, _ref;
return InterviewModel = function(_super) {
function InterviewModel() {
return InterviewModel.__super__.constructor.apply(this, arguments);
}
return __extends(InterviewModel, _super), InterviewModel.prototype.url = function() {
var url;
return url = "" + HR.INTERVIEWS_DOMAIN + "/api/interviews", this.get("id") && (url += "/" + this.get("id")), 
url += "?api_key=" + HR.currentUser.get("apiKey");
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
return resp.access_code && "interviewer" === this.role ? (data = this, data.access_code = resp.access_code, 
resp.paperurl + "?b=" + HR.util.Base64.encode(JSON.stringify(data), !1).replace("=", "")) :resp.paperurl + "?b=" + HR.util.Base64.encode(JSON.stringify(this), !1).replace("=", "");
}, _ref = resp.interview_attendants, _i = 0, _len = _ref.length; _len > _i; _i++) attendant = _ref[_i], 
attendant.url = fn, "interviewer" === attendant.role ? interviewers.push(attendant) :"candidate" === attendant.role && candidates.push(attendant);
resp.interviewers = interviewers, resp.candidates = candidates, resp.from = new Date(resp.from), 
resp.to = new Date(resp.to);
}
return InterviewModel.__super__.parse.call(this, resp);
}, InterviewModel.prototype.interviewer = function() {
return this.get("interviewers") && this.get("interviewers").length ? this.get("interviewers")[0] :null;
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
return url = "" + HR.INTERVIEWS_DOMAIN + "/api/interviews/" + this.interview_id + "/recordings/code?api_key=" + HR.currentUser.get("apiKey");
}, InterviewCodeRecordingModel.prototype.get = function(prop) {
return "ops" === prop ? this.attributes.ops || [] :InterviewCodeRecordingModel.__super__.get.apply(this, arguments);
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
return root = "/xrest/tests/" + this.tid + "/library";
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
return this.tid = this.get("tid"), this.tid && (root = "/xrest/tests/" + this.tid + "/questions"), 
root;
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
var HR, TestShareModel, _ref;
return TestShareModel = function(_super) {
function TestShareModel() {
return TestShareModel.__super__.constructor.apply(this, arguments);
}
return __extends(TestShareModel, _super), TestShareModel.prototype.url = function() {
return "/xrest/tests/" + this.get("id") + "/share";
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
return __extends(TeamModel, _super), TeamModel.prototype.urlRoot = "/xrest/teams", 
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
return this.tid = this.get("tid"), this.id && this.tid && (url = "/xrest/tests/" + this.tid + "/attempts/" + this.id), 
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
var HR, TestModel, _ref;
return TestModel = function(_super) {
function TestModel() {
return TestModel.__super__.constructor.apply(this, arguments);
}
return __extends(TestModel, _super), TestModel.prototype.action = null, TestModel.prototype.url = function() {
var u;
return u = "/xrest/tests", this.get("id") && (u += "/" + this.get("id"), this.action && (u += "/" + this.action)), 
u;
}, TestModel.prototype.setAction = function(action) {
this.action = action;
}, TestModel.prototype.unsetAction = function() {
return this.action = null;
}, TestModel.prototype.removeQuestion = function(qid, callbacks) {
return $.ajax({
url:"/xrest/tests/" + this.id + "/questions/" + qid,
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
var HR, TestCaseModel, _ref;
return TestCaseModel = function(_super) {
function TestCaseModel() {
return TestCaseModel.__super__.constructor.apply(this, arguments);
}
return __extends(TestCaseModel, _super), TestCaseModel.prototype.urlRoot = function() {
var root;
return this.tid = this.get("tid"), this.qid = this.get("qid"), root = "/xrest/tests/" + this.tid + "/questions/" + this.qid + "/testcases";
}, TestCaseModel.prototype.downloadURL = function() {
return "/xrest/tests/" + this.get("tid") + "/questions/" + this.get("qid") + "/testcases/" + this.get("id") + "/download";
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
return this.id ? "/xrest/teams/" + this.get("team_id") + "/users/" + this.id :"/xrest/teams/" + this.get("team_id") + "/users";
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
return __extends(UserModel, _super), UserModel.prototype.urlRoot = "/xrest/users", 
UserModel.prototype.parse = function(resp, options) {
var changeTimeZoneDialog, currentTimeZone;
return resp.model && resp.model.timezone && (currentTimeZone = jstz.determine_timezone().timezone.olson_tz, 
resp.model.timezone !== currentTimeZone && (changeTimeZoneDialog = new HR.util.changeTimeZoneDialog({
model:this,
userTimeZone:resp.model.timezone,
currentTimeZone:currentTimeZone
}))), UserModel.__super__.parse.call(this, resp, options);
}, UserModel.prototype.updatePassword = function(data) {
var promise;
return promise = $.ajax({
url:"/xrest/users/change_password",
type:"PUT",
data:data
});
}, UserModel.prototype.invites_count = function() {
var company, count;
return company = this.get("company"), "unlimited" === company.type ? count = "unlimited" :(count = 0, 
company.invites && (count += company.invites), company.subscription_invites && (count += company.subscription_invites)), 
count;
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
var HR, TestCandidatesCollection, _ref;
return TestCandidatesCollection = function(_super) {
function TestCandidatesCollection() {
return TestCandidatesCollection.__super__.constructor.apply(this, arguments);
}
return __extends(TestCandidatesCollection, _super), TestCandidatesCollection.prototype.model = window.HR.TestAttemptModel, 
TestCandidatesCollection.prototype.url = function() {
var url;
return this.tid && (url = this.type ? "/xrest/tests/" + this.tid + "/attempts?type=" + this.type :"/xrest/tests/" + this.tid + "/attempts"), 
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
return url = "" + HR.INTERVIEWS_DOMAIN + "/api/interviews/" + this.interview_id + "/recordings?api_key=" + HR.currentUser.get("apiKey");
}, InterviewRecordingsCollection.prototype.parse = function(response) {
return response;
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
return url = "" + HR.INTERVIEWS_DOMAIN + "/api/interviews?api_key=" + HR.currentUser.get("apiKey"), 
_.isEmpty(this.filters === !1) && _.each(this.filters, function(value, key) {
return url += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
}), url;
}, InterviewsCollection.prototype.setFilter = function(key, value) {
return this.filters[key] = value;
}, InterviewsCollection.prototype.parse = function(response) {
return response.results;
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
return url = "/xrest/candidates";
}, SearchCandidatesCollection.prototype.model = window.HR.SearchCandidateModel, 
SearchCandidatesCollection;
}(window.HR.GenericCollection), HR = null != (_ref = window.HR) ? _ref :{}, HR.SearchCandidatesCollection = SearchCandidatesCollection;
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
return __extends(TeamsCollection, _super), TeamsCollection.prototype.url = "/xrest/teams", 
TeamsCollection.prototype.model = window.HR.TeamModel, TeamsCollection.prototype.parse = function(response) {
return this.permission = response.permission, TeamsCollection.__super__.parse.call(this, response);
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
return "/xrest/tests/" + this.tid + "/questions/" + this.qid + "/testcases";
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
return url = this.page ? "/xrest/tests?page=" + this.page :"/xrest/tests";
}, TestsCollection.prototype.getTotal = function() {
return this.total;
}, TestsCollection.prototype.getPage = function() {
return this.page;
}, TestsCollection.prototype.setPage = function(page) {
this.page = page;
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
var HR, RecruitCandidateCodingView, RecruitCandidateCompileTestView, RecruitCandidateCompleteView, RecruitCandidateInstructionsView, RecruitCandidateListView, RecruitCandidateMcqView, RecruitCandidateQuestionView, RecruitCandidateSideBarView, RecruitCandidateSubjectiveView, RecruitCandidateTestCaseView, RecruitCandidateTopBarView, _ref;
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
"click .next-section":"sectionNext"
}, RecruitCandidateListView.prototype.initialize = function() {
return this.model = HR.candidate.candidateAttemptModel, this.tid = HR.candidate.candidateTestModel.get("unique_id"), 
this.aid = this.model.get("id");
}, RecruitCandidateListView.prototype.render = function() {
var current_section, qi, questions, sections_mapping, solves, v;
return questions = this.model.get("questions"), solves = this.model.get("solve_mapping"), 
sections_mapping = this.model.get("sections_mapping"), current_section = this.model.get("section"), 
$(this.el).html(HR.appController.template(this.template, this)({
section_count:sections_mapping ? sections_mapping.length :1,
current_section:current_section ? current_section :1
})), sections_mapping ? (qi = 0, _.each(sections_mapping, function(_this) {
return function(sec, i) {
var v;
return v = _this.getTable(questions.slice(qi, qi + parseInt(sec.questions)), qi + 1, solves, i + 1 !== current_section), 
_this.$("table.section" + (i + 1)).html(v), qi += parseInt(sec.questions);
};
}(this)), sections_mapping.length > 1 && current_section < sections_mapping.length && this.$("button.section-finish-" + current_section).removeClass("hidden")) :(v = this.getTable(questions, 1, solves), 
this.$("table.section1").html(v)), this;
}, RecruitCandidateListView.prototype.getTable = function(questions, start, solves, disabled) {
var el, i, tid;
return null == disabled && (disabled = !1), tid = this.tid, i = start, el = "", 
_.each(questions, function(q) {
var ahref, s;
return s = "", s += 1 === i ? '<tr class="border">' :"<tr>", s += "<td width='5%' class='grey right'><span class='mdR'>Q" + i + "</span></td>", 
s += '<td width="46%"><a class="backbone question-name" ', s += disabled ? ">" :"href='" + tid + "/questions/" + q.unique_id + "'>", 
s += q.name ? q.name :"Question <em class='fnt-sz-small grey' style='font-weight: 500;'> &nbsp;&nbsp; " + q.preview + "..</em>", 
s += "</a></td>", s += "<td width='12%' class='fnt-sz-mid'>" + window.istreet.cfg.hrqn[q.type] + "</td>", 
ahref = disabled ? "" :"href='" + tid + "/questions/" + q.unique_id + "'", s += _.has(solves, q.unique_id) ? "<td width='12%' class='fnt-sz-mid'><span class='green'>submitted</span></td><td width='19%' class='right'><a " + ahref + " class='normal-underline display-inline-block margin-right-15 fnt-sz-mid backbone' style='margin: 9px 11px 9px 0;''>Modify Submission</a></td>" :"<td width='12%' class='fnt-sz-mid'>not answered</td><td width='19%' class='right'><a " + ahref + " class='btn btn-line margin-right-15 fnt-sz-mid backbone'>Solve Question</a></td>", 
s += "</tr>", i++, el += s;
}), el;
}, RecruitCandidateListView.prototype.testDone = function() {
return new HR.util.ShowConfirmationDialog({
body:"Once closed, you can no longer view or modify this test.\n\nAre you sure you are done, and want to close the test?",
title:"Confirm test close.",
buttons:[ {
name:"Yes, close this test.",
callback:function(dialog) {
return dialog.destroy(), HR.candidate.candidateTestModel.setAction("logout"), HR.candidate.pingTimer && clearInterval(HR.candidate.pingTimer), 
HR.candidate.candidateTestModel.save(null, {
success:function() {
return function(m) {
return HR.router.navigate("" + m.get("unique_id") + "/feedback", {
trigger:!0,
replace:!0
});
};
}(this)
});
}
}, {
name:"No, go back.",
className:"btn",
callback:function(dialog) {
return dialog.destroy();
}
} ]
}).render();
}, RecruitCandidateListView.prototype.sectionNext = function(e) {
return HR.candidate.candidateAttemptModel.set("section_close", this.$(e.currentTarget).attr("data-section")), 
HR.candidate.candidateAttemptModel.save(null, {
success:function(_this) {
return function(m) {
return HR.candidate.candidateAttemptModel = m, HR.router.navigate("" + _this.aid, {
trigger:!0,
replace:!0
});
};
}(this),
error:function() {
return console.log("Could not close and move to next section.");
}
});
}, RecruitCandidateListView;
}(window.HR.GenericView), RecruitCandidateQuestionView = function(_super) {
function RecruitCandidateQuestionView() {
return RecruitCandidateQuestionView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateQuestionView, _super), RecruitCandidateQuestionView.prototype.template = "recruit/question-base", 
RecruitCandidateQuestionView.prototype.className = "question-base", RecruitCandidateQuestionView.prototype.initialize = function(options) {
return this.model = options.model, this.tid = HR.candidate.candidateTestModel.get("unique_id");
}, RecruitCandidateQuestionView.prototype.events = {
"click .ans-submit":"submitAnswer"
}, RecruitCandidateQuestionView.prototype.submitAnswer = function(e) {
var a, data, s;
return e.preventDefault(), a = {
type:this.model.attributes.type,
answer:this.view.answer()
}, a.answer ? (data = {
qid:this.model.get("unique_id"),
answer:a
}, s = new HR.CandidateSolveModel(), s.setAttempt(HR.candidate.candidateAttemptModel.get("id")), 
s.save(data, {
success:function(_this) {
return function() {
var next_url;
return next_url = _this.model.get("nextqid") ? "" + _this.tid + "/questions/" + _this.model.get("nextqid") :"" + _this.tid + "/questions", 
HR.router.navigate(next_url, {
trigger:!0,
replace:!0
});
};
}(this),
error:function() {
return function() {
return new HR.util.ShowConfirmationDialog({
title:"Server error",
body:"Unable to save your answer. Please retry after sometime.",
buttons:[ {
name:"OK",
"class":"btn-primary",
callback:function(dialog) {
return dialog.destroy();
}
} ]
}).render();
};
}(this)
})) :new HR.util.ShowConfirmationDialog({
title:"Error",
body:"Please answer the question before submitting.",
buttons:[ {
name:"OK",
"class":"btn-primary",
callback:function(dialog) {
return dialog.destroy();
}
} ]
}).render();
}, RecruitCandidateQuestionView.prototype._render = function() {
var cnt, q, viewfound;
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
for (q = this.question.complete_string, cnt = 0; -1 !== q.search("{blank}"); ) q = q.replace("{blank}", "<input type='text' class='complete-question' name='blank" + cnt + "'/>"), 
cnt += 1;
this.question.question = q, this.view = new HR.RecruitCandidateCompleteView({
question:this.question
});
break;

default:
viewfound = !1;
}
return this.question.name ? this.$(".qtitle").html("" + this.question.name + " (" + window.istreet.cfg.hrqn[this.question.type] + ")") :this.$(".qtitle").html(window.istreet.cfg.hrqn[this.question.type]), 
this.$(".challenge-text").html(this.question.question), viewfound ? this.$(".qcontent").html(this.view.render().el) :(this.$(".qcontent").html("<center>This question type is not available.</center>"), 
this.$(".ans-submit").addClass("disabled")), this;
}, RecruitCandidateQuestionView;
}(window.HR.GenericView), RecruitCandidateCodingView = function(_super) {
function RecruitCandidateCodingView() {
return RecruitCandidateCodingView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateCodingView, _super), RecruitCandidateCodingView.prototype.template = "recruit/question-coding", 
RecruitCandidateCodingView.prototype.className = "question-coding", RecruitCandidateCodingView.prototype.initialize = function(options) {
return this.question = options.question, this.codeshell = null, this.aid = HR.candidate && HR.candidate.candidateAttemptModel ? HR.candidate.candidateAttemptModel.get("id") :"testing", 
this.autoSaveNamespace = options.disableLocalStorage && options.disableLocalStorage === !0 ? null :"" + this.aid + "-" + this.question.unique_id, 
this.compilingLock = !1, this;
}, RecruitCandidateCodingView.prototype.events = {
"codeshellcompile #editor":"compileAnswer"
}, RecruitCandidateCodingView.prototype.render = function() {
var opts;
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), opts = {
languages:this.question.languages,
language:"c",
autoSaveNamespace:this.autoSaveNamespace,
lang_default_text:this.getLangDefaults(),
submit_button_text:"Submit code & Continue",
showSubmit:!0,
showCustomInput:!1
}, "testing" === this.aid && (opts.showSubmit = !1, opts.showCompileTest = !1), 
this.$("#editor").codeshell(opts), this.$("#editor").codeshell("refresh"), this.set_answer(), 
this;
}, RecruitCandidateCodingView.prototype.getLangDefaults = function() {
var l, m, _i, _len, _ref;
for (m = {}, _ref = this.question.languages, _i = 0, _len = _ref.length; _len > _i; _i++) l = _ref[_i], 
this.question[l + "_template"] && (m[l] = this.question[l + "_template"]);
return m;
}, RecruitCandidateCodingView.prototype.compileAnswer = function(e, data) {
return data.code && !$(".bb-compile").hasClass("disabled") ? ($(".bb-compile").addClass("disabled"), 
HR.candidate.ctmodel = new HR.CandidateCompileTestModel(), HR.candidate.ctmodel.setAid(this.aid), 
HR.candidate.ctmodel.setQid(this.question.unique_id), "runalltestcases" === e && HR.candidate.ctmodel.setAllCases(!0), 
HR.candidate.ctview = new HR.RecruitCandidateCompileTestView(), this.$("#runstatus").html(HR.candidate.ctview.render().el), 
HR.util.scrollToBottom(1e3), HR.candidate.ctmodel.save(data, {
success:function(_this) {
return function() {
return HR.candidate.ctview.setStatus("Uploaded. Waiting for results.."), HR.candidate.ctloop = setTimeout(function() {
return _this.checkForResult(_this, data, e);
}, 2e3);
};
}(this),
error:function() {
return function() {
return HR.candidate.ctmodel = null, HR.candidate.ctview.setStatus("There was an issue with compiling this code.");
};
}(this)
})) :void 0;
}, RecruitCandidateCodingView.prototype.checkForResult = function(that, data, e) {
return HR.candidate.ctloop ? (HR.candidate.ctview.setStatus("Processing.."), HR.candidate.ctmodel.fetch({
success:function(_this) {
return function(m) {
var expected_output, i, input, msg, output, pass, st_class, _i, _len, _ref;
if (0 === m.get("status")) return HR.candidate.ctloop = setTimeout(function() {
return that.checkForResult(that, data, e);
}, 2e3), void 0;
if (0 !== m.get("status")) if ($(".bb-compile").removeClass("disabled"), clearTimeout(HR.candidate.ctloop), 
HR.candidate.ctloop = null, m.get("result") > 0) HR.candidate.ctview.setStatus("Error.", "red"), 
HR.candidate.ctview.setCompileStatus("Compilation failed.", m.get("compilemessage")); else {
for (pass = 0, _ref = m.get("testcase_status"), i = _i = 0, _len = _ref.length; _len > _i; i = ++_i) input = _ref[i], 
output = m.get("stdout")[i], expected_output = m.get("expected_output")[i], msg = m.get("testcase_message")[i], 
1 === m.get("testcase_status")[i] ? (st_class = "green", pass++) :st_class = "red", 
HR.candidate.ctview.addTestCase(i + 1, input, output, expected_output, msg, st_class);
0 === m.get("testcase_status").length ? HR.candidate.ctview.setStatus("Compiled successfully.", "orange") :0 === pass ? HR.candidate.ctview.setStatus("No test cases passed.", "red") :i > pass ? HR.candidate.ctview.setStatus("Compiled successfully. " + pass + "/" + i + " sample test cases passed.", "orange") :(HR.candidate.ctview.setStatus("Compiled successfully. All sample test cases passed!", "green"), 
"runalltestcases" !== e && (_this.$(".bb-runall").show(), that.compileAnswer("runalltestcases", data)));
}
return HR.util.scrollToBottom(1e3);
};
}(this),
error:function() {
return function() {
return HR.candidate.ctmodel = null, HR.candidate.ctview = null, HR.candidate.ctview.setStatus("Unable to fetch compile information from server.");
};
}(this)
})) :void 0;
}, RecruitCandidateCodingView.prototype.answer = function() {
return this.$("#editor").codeshell("value");
}, RecruitCandidateCodingView.prototype.set_answer = function() {
return this.question.solve ? this.$("#editor").codeshell("setValue", this.question.solve.answer) :void 0;
}, RecruitCandidateCodingView;
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
var o;
return "mcq" === this.question.type ? (o = this.$("input[name=mcqopts]:checked").val(), 
o ? o :-1) :(o = [], _.each(this.$("input[name=mcqopts]:checked"), function(_this) {
return function(e) {
return o.push(_this.$(e).val());
};
}(this)), o.length ? o :-1);
}, RecruitCandidateMcqView.prototype.set_answer = function() {
var ans, _i, _len, _ref, _results;
if (this.question.solve) {
if ("mcq" === this.question.type) return this.$("input#mcqopts" + this.question.solve.answer.answer).prop("checked", !0);
for (_ref = this.question.solve.answer.answer, _results = [], _i = 0, _len = _ref.length; _len > _i; _i++) ans = _ref[_i], 
_results.push(this.$("input#mcqopts" + ans).prop("checked", !0));
return _results;
}
}, RecruitCandidateMcqView;
}(window.HR.GenericView), RecruitCandidateSubjectiveView = function(_super) {
function RecruitCandidateSubjectiveView() {
return RecruitCandidateSubjectiveView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateSubjectiveView, _super), RecruitCandidateSubjectiveView.prototype.template = "recruit/question-subjective", 
RecruitCandidateSubjectiveView.prototype.className = "question-subjective", RecruitCandidateSubjectiveView.prototype.initialize = function(options) {
return this.question = options.question;
}, RecruitCandidateSubjectiveView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
question:this.question
})), this.set_answer(), this;
}, RecruitCandidateSubjectiveView.prototype.answer = function() {
return this.$(".sub-answer").val();
}, RecruitCandidateSubjectiveView.prototype.set_answer = function() {
return this.question.solve ? this.$(".sub-answer").val(this.question.solve.answer.answer) :void 0;
}, RecruitCandidateSubjectiveView;
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
}(window.HR.GenericView), RecruitCandidateTopBarView = function(_super) {
function RecruitCandidateTopBarView() {
return this.updateTimer = __bind(this.updateTimer, this), RecruitCandidateTopBarView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateTopBarView, _super), RecruitCandidateTopBarView.prototype.template = "recruit/topbar", 
RecruitCandidateTopBarView.prototype.className = "topbar", RecruitCandidateTopBarView.prototype.initialize = function() {
return Offline.options = {
reconnect:{
initialDelay:3
},
requests:!1,
game:!1
};
}, RecruitCandidateTopBarView.prototype.updateTimer = function() {
return $("#countdown-timer").countdown("option", "until", HR.candidate.candidateAttemptModel.get("time_left"));
}, RecruitCandidateTopBarView.prototype.render = function() {
var qcount, qdone;
return $(this.el).html(HR.appController.template(this.template, this)({
test:HR.candidate.candidateTestModel,
attempt:HR.candidate.candidateAttemptModel
})), HR.candidate.pingTimer && clearInterval(HR.candidate.pingTimer), HR.candidate.candidateAttemptModel.get("attempt_done") ? HR.appView.setTopbarView() :(qdone = _.keys(HR.candidate.candidateAttemptModel.get("solve_mapping") || {}).length, 
qcount = HR.candidate.candidateAttemptModel.get("questions").length, this.$(".qdone").html(qdone), 
this.$(".qcount").html(qcount), this.$(".progress-done").css({
width:Math.floor(100 * qdone / qcount)
}), $("#countdown-timer").countdown("destroy").countdown({
until:HR.candidate.candidateAttemptModel.get("time_left"),
layout:"{d<}{dn}{dl} {d>} {hnn}:{mnn}:{snn}",
compact:!0
}), $("#countdown-timer").countdown("option", "onExpiry", this.testTimeUp), HR.candidate.pingTimer = setInterval(function(_this) {
return function() {
return HR.candidate.candidateAttemptModel.fetch({
success:function(model) {
return model.get("attempt_done") ? _this.testTimeUp() :_this.updateTimer();
}
});
};
}(this), 3e4)), this;
}, RecruitCandidateTopBarView.prototype.testTimeUp = function() {
return HR.candidate.pingTimer && clearInterval(HR.candidate.pingTimer), new HR.util.ShowConfirmationDialog({
closebutton:!1,
title:"Test finished",
body:"You have exceeded the time limit set for this test. All answers you submitted before the time limit have been saved. You cannot attempt any more questions now. Thank you for taking this test.",
buttons:[ {
name:"Proceed to Feedback",
"class":"btn-primary",
callback:function(dialog) {
dialog.destroy(), HR.candidate.candidateTestModel.setAction("logout"), HR.candidate.candidateTestModel.save(null, {
success:function() {
return function(m) {
return HR.router.navigate("" + m.get("unique_id") + "/feedback", {
trigger:!0,
replace:!0
});
};
}(this)
});
}
} ]
}).render();
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
}, RecruitCandidateSideBarView.prototype.render = function() {
var url;
return url = Backbone.history.fragment, $(this.el).html(HR.appController.template(this.template, this)), 
this.$(".fixed-nav").html(this.getTopIcons()), url.endsWith("questions") || url.endsWith("questions/") || this.$(".questions-nav").html(this.getQuestionIcons()), 
this;
}, RecruitCandidateSideBarView.prototype.getTopIcons = function() {
var cls, html, url;
return html = "", url = Backbone.history.fragment, cls = "", (url.endsWith("questions") || url.endsWith("questions/")) && (cls = "active"), 
html += '<li class="' + cls + '"><a href="' + HR.candidate.candidateTestModel.get("unique_id") + '/questions" class="backbone"><i class="nav-icon icon-list-bullet-large"></i></a></li>', 
cls = "", (url.endsWith("instructions") || url.endsWith("instructions/")) && (cls = "active"), 
html += '<li class="' + cls + '"><a href="' + HR.candidate.candidateTestModel.get("unique_id") + '/instructions" class="backbone"><i class="nav-icon icon-help-circled"></i></a></li>';
}, RecruitCandidateSideBarView.prototype.getQuestionIcons = function() {
var active, answered, answered_qs, elhtml, label, li_gen, q, qs, _i, _len, _ref;
for (elhtml = "", li_gen = function(answered, disabled, active, link, label) {
var act, ans, dis;
return ans = answered ? "answered" :"not-answered", dis = disabled ? "disabled" :"", 
act = active ? "active" :"", '<li class="' + ans + " " + dis + " " + act + '">\n  <a href="' + link + '" class="backbone">\n      <span class="quest-number">' + label + "</span>\n  </a>\n</li>";
}, qs = HR.candidate.candidateAttemptModel.get("questions"), answered_qs = _.keys(HR.candidate.candidateAttemptModel.get("solve_mapping")), 
label = 1, _i = 0, _len = qs.length; _len > _i; _i++) q = qs[_i], _ref = q.unique_id.toString(), 
answered = __indexOf.call(answered_qs, _ref) >= 0, active = q.unique_id === HR.candidate.currentQuestion, 
elhtml += q.disabled ? li_gen(answered, !0, active, "javascript:void(0)", label) :li_gen(answered, !1, active, "" + HR.candidate.candidateTestModel.get("unique_id") + "/questions/" + q.unique_id, label), 
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
}, RecruitCandidateCompileTestView.prototype.addTestCase = function(tno, input, output, exp_output, compiler_msg, st_class) {
var tc;
return tc = new HR.RecruitCandidateTestCaseView({
tno:tno,
input:input,
output:output,
exp_output:exp_output,
st_class:st_class,
compiler_msg:compiler_msg
}), this.$(".testcases").append(tc.render().el);
}, RecruitCandidateCompileTestView;
}(window.HR.GenericView), RecruitCandidateTestCaseView = function(_super) {
function RecruitCandidateTestCaseView() {
return RecruitCandidateTestCaseView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateTestCaseView, _super), RecruitCandidateTestCaseView.prototype.template = "recruit/compiletest-testcase", 
RecruitCandidateTestCaseView.prototype.classname = "test-case-wrap", RecruitCandidateTestCaseView.prototype.initialize = function(o) {
return this.tno = o.tno, this.input = o.input, this.output = o.output, this.exp_output = o.exp_output, 
this.compiler_msg = o.compiler_msg, this.st_class = o.st_class;
}, RecruitCandidateTestCaseView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
tno:this.tno,
input:this.input,
output:this.output,
exp_output:this.exp_output,
compiler_msg:this.compiler_msg,
st_class:this.st_class
})), this;
}, RecruitCandidateTestCaseView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.RecruitCandidateListView = RecruitCandidateListView, 
HR.RecruitCandidateQuestionView = RecruitCandidateQuestionView, HR.RecruitCandidateCodingView = RecruitCandidateCodingView, 
HR.RecruitCandidateMcqView = RecruitCandidateMcqView, HR.RecruitCandidateSubjectiveView = RecruitCandidateSubjectiveView, 
HR.RecruitCandidateCompleteView = RecruitCandidateCompleteView, HR.RecruitCandidateTopBarView = new RecruitCandidateTopBarView(), 
HR.RecruitCandidateSideBarView = new RecruitCandidateSideBarView(), HR.RecruitCandidateCompileTestView = RecruitCandidateCompileTestView, 
HR.RecruitCandidateTestCaseView = RecruitCandidateTestCaseView, HR.RecruitCandidateInstructionsView = RecruitCandidateInstructionsView;
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
var HR, RecruitCandidateLoginView, _ref;
return RecruitCandidateLoginView = function(_super) {
function RecruitCandidateLoginView() {
return RecruitCandidateLoginView.__super__.constructor.apply(this, arguments);
}
return __extends(RecruitCandidateLoginView, _super), RecruitCandidateLoginView.prototype.template = "recruit/login", 
RecruitCandidateLoginView.prototype.className = "candidate-login", RecruitCandidateLoginView.prototype.events = {
"click .test-submit":"loginAction",
"click .test-submit-feedback":"submitFeedback",
"click .test-logout":"logoutTest"
}, RecruitCandidateLoginView.prototype.initialize = function() {}, RecruitCandidateLoginView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
test:this.model.attributes
})), this;
}, RecruitCandidateLoginView.prototype.resetError = function() {
var $err;
return $err = this.$("#error-message"), $err.find("header").html(""), $err.find("p").html(""), 
$err.hide();
}, RecruitCandidateLoginView.prototype.setError = function(title, message) {
var $err;
return $err = this.$("#error-message"), $err.find("header").html(title), $err.find("p").html(message), 
$err.show();
}, RecruitCandidateLoginView.prototype.loginAction = function(e) {
var email, form_data, pass, put_data, request_params, that, uniqid;
return that = this, e.preventDefault(), this.resetError(), email = this.$("input[name=username]").val(), 
pass = this.$("input[name=password]").val(), this.$("#acknowledge").is(":checked") ? (form_data = $("#test-login-form").serializeArray(), 
put_data = {}, _.each(form_data, function(item) {
return put_data[item.name] = item.value;
}), put_data.auth_key = this.model.auth, $("#acknowledge").is(":checked") && (put_data.acknowledge = "on"), 
uniqid = this.model.get("unique_id"), request_params = {
url:"/recruit/tests/" + uniqid + "/login",
data:put_data,
type:"POST",
success:function() {
return function(xhr) {
var r;
return r = "string" == typeof xhr ? $.parseJSON($(xhr).text()) :xhr, r.status ? HR.router.navigate("" + uniqid + "/questions", {
trigger:!0,
replace:!0
}) :that.setError(r.message.title, r.message.body);
};
}(this),
error:function() {
return function(xhr) {
var r;
return r = "string" == typeof xhr.responseText ? $.parseJSON($(xhr.responseText).text()) :xhr.responseText, 
that.setError(r.message.title, r.message.body);
};
}(this)
}, $(":file").length > 0 && (request_params.iframe = !0, request_params.processData = !1, 
request_params.data = put_data, request_params.files = $(":file")), $.ajax(request_params), 
this) :(new HR.util.ShowConfirmationDialog({
body:"You cannot take this test without agreeing to the specified conditions.",
buttons:[ {
name:"OK",
"class":"btn-primary",
callback:function(dialog) {
return dialog.destroy();
}
} ]
}).render(), void 0);
}, RecruitCandidateLoginView.prototype.submitFeedback = function() {
return HR.candidate.candidateAttemptModel.set("feedback_text", this.$(".feedback-text").val()), 
HR.candidate.candidateAttemptModel.save(null, {
success:function(_this) {
return function() {
return $.removeCookie("email", {
path:"/"
}), $.removeCookie("tid", {
path:"/"
}), _this.logoutTest();
};
}(this),
error:function() {
return console.log("Could not submit feedback.");
}
});
}, RecruitCandidateLoginView.prototype.logoutTest = function() {
return $.removeCookie("email", {
path:"/"
}), $.removeCookie("tid", {
path:"/"
}), window.candidate = {}, this.$(".main-content").html("<h3>Thank you!</h3><br/><br/><p>The test is done. You may close this window, or head on to  <a href='//www.hackerrank.com'>hackerrank.com</a> and solve challenges.</p>");
}, RecruitCandidateLoginView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.RecruitCandidateLoginView = RecruitCandidateLoginView;
});
}.call(this);