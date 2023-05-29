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
var HR, SecondaryEmailView, _ref;
return SecondaryEmailView = function(_super) {
function SecondaryEmailView() {
return SecondaryEmailView.__super__.constructor.apply(this, arguments);
}
return __extends(SecondaryEmailView, _super), SecondaryEmailView.prototype.template = "secondary-email", 
SecondaryEmailView.prototype.tagName = "p", SecondaryEmailView.prototype.className = "static-input span12 email-container", 
SecondaryEmailView.prototype.initialize = function() {
return this.listenTo(this.model, "reset", this.render), this.listenTo(this.model, "change", this.render);
}, SecondaryEmailView.prototype.events = {
"click a.settings_email_make_primary":"make_primary",
"click a.settings_email_resend_verification":"resend_verification",
"click a.settings_email_remove":"remove_email"
}, SecondaryEmailView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model
})), this;
}, SecondaryEmailView.prototype.make_primary = function(e) {
return e.preventDefault(), $(e.currentTarget).html("Making..."), this.model.make_primary(function(_this) {
return function() {
return $(e.currentTarget).html("Done!"), _this.collection.fetch();
};
}(this));
}, SecondaryEmailView.prototype.remove_email = function(e) {
return e.preventDefault(), $(e.currentTarget).html("Removing..."), this.model.destroy({
success:function(_this) {
return function() {
return $(e.currentTarget).html("Removed!"), _this.collection.fetch();
};
}(this)
});
}, SecondaryEmailView.prototype.resend_verification = function(e) {
return e.preventDefault(), $(e.currentTarget).html("Sending..."), this.model.resend_confirmation(function() {
return $(e.currentTarget).html("Sent! Resend?");
});
}, SecondaryEmailView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SecondaryEmailView = SecondaryEmailView;
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
var HR, SecondaryEmailsView, _ref;
return SecondaryEmailsView = function(_super) {
function SecondaryEmailsView() {
return SecondaryEmailsView.__super__.constructor.apply(this, arguments);
}
return __extends(SecondaryEmailsView, _super), SecondaryEmailsView.prototype.url = "/rest/secondary_emails", 
SecondaryEmailsView.prototype.template = "secondary-emails", SecondaryEmailsView.prototype.initialize = function() {
return this.input = "", this.errors = [], this.listenTo(this.collection, "reset change add sync", this.render);
}, SecondaryEmailsView.prototype.events = {
"click a#btn-add-sec-email":"showAddEmail",
"click button#secondary-email-cancel-button":"hideAddEmail",
"click button#secondary-email-add-button":"commitEmail"
}, SecondaryEmailsView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
errors:this.errors,
input:this.input
})), _.each(this.collection.models, function(item) {
var _view;
return _view = new HR.SecondaryEmailView({
model:item,
collection:this.collection
}), $(this.el).find("div#secondary-email-list").append(_view.render().el), this.add_subview(_view);
}, this), this;
}, SecondaryEmailsView.prototype.hideAddEmail = function(e) {
return e.preventDefault(), this.$("#add-new-secondary-email").hide(), this.$("a#btn-add-sec-email").show();
}, SecondaryEmailsView.prototype.showAddEmail = function(e) {
return e.preventDefault(), this.$("#add-new-secondary-email").show(), this.$("#add-new-secondary-email input").focus(), 
this.$(e.currentTarget).hide();
}, SecondaryEmailsView.prototype.commitEmail = function(e) {
var email, mdl;
return e.preventDefault(), (email = _.escape($("#secondary-email-input").val())) ? ($(e.currentTarget).html("Adding..."), 
this.input = "", this.errors = [], mdl = new this.collection.model({
email:email
}, {
collection:this.collection
}), mdl.save({}, {
success:function(_this) {
return function() {
return _this.collection.fetch(), $("#secondary-email-input").val("");
};
}(this),
error:function(_this) {
return function(modl, xhr) {
return _this.errors = $.parseJSON(xhr.responseText).errors, _this.input = email, 
_this.render();
};
}(this)
})) :void 0;
}, SecondaryEmailsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SecondaryEmailsView = SecondaryEmailsView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, SettingsAccountView, _ref;
return SettingsAccountView = function(_super) {
function SettingsAccountView() {
return SettingsAccountView.__super__.constructor.apply(this, arguments);
}
return __extends(SettingsAccountView, _super), SettingsAccountView.prototype.template = "settings-account", 
SettingsAccountView.prototype.className = "settings-account-view", SettingsAccountView.prototype.events = function() {
return {
"click .btn-github":"githubLogin",
"click .btn-facebook":"facebookLogin",
"click .btn-merge":"mergeAccounts"
};
}, SettingsAccountView.prototype.initialize = function(options) {
var secondary_emails_collection;
return this.parent = options.parent, this.profile = options.profile, this.listenTo(this.model, "reset", this.render), 
secondary_emails_collection = HR.collection("secondary-email"), secondary_emails_collection.fetch(), 
this.secondary_emails = new HR.SecondaryEmailsView({
parent:this,
collection:secondary_emails_collection
}), this.add_subview(this.secondary_emails), this.render();
}, SettingsAccountView.prototype.render = function() {
var renderSwitchery, that;
return that = this, $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this.secondary_emails.setElement($(this.el).find("#settings_emails")).render(), 
this.Switchery || (this.Switchery = require__("switchery")), that = this, renderSwitchery = function() {
return $.map($(".js-switch"), function(item) {
return $(item).next().hasClass("switchery") ? void 0 :new that.Switchery(item);
});
}, setTimeout(renderSwitchery, 300), this;
}, SettingsAccountView.prototype.mergeAccounts = function(e) {
var merge, other, username;
return username = this.model.get("username"), e.preventDefault(), merge = new HR.HackerMerge(), 
other = this.$("#mergeaccounts").val(), merge.save({
username:other
}, {
success:function(_this) {
return function() {
return _this.$(".merge-response").addClass("success").removeClass("error").html("Great! We have sent a confirmation email to " + username + " and " + other + ". Please click the link in both of those emails to confirm the merge.");
};
}(this),
error:function(_this) {
return function(model, xhr) {
return _this.$(".merge-response").addClass("error").removeClass("success").html(JSON.parse(xhr.responseText).message);
};
}(this)
}), e.preventDefault(), $(e.currentTarget).hasClass("active") ? ($(e.currentTarget).removeClass("active").removeClass("active"), 
$(e.currentTarget).find("input").removeAttr("checked")) :($(e.currentTarget).addClass("active").addClass("active"), 
$(e.currentTarget).find("input").attr("checked", "checked")), this.saveChanges();
}, SettingsAccountView.prototype.githubLogin = function(e) {
return HR.appController.github_login(e);
}, SettingsAccountView.prototype.facebookLogin = function(e) {
return HR.appController.facebook_login(e);
}, SettingsAccountView.prototype.saveChanges = function() {
return this.model.set("facebook_allow_opengraph", $("#facebook_allow_opengraph").is(":checked"), {
silent:!0
}), this.parent.saveModel(this.model), this.render();
}, SettingsAccountView.prototype.isUpdated = function() {
return this.$("#mergeaccounts").val() || this.$("#secondary-email-input").val();
}, SettingsAccountView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SettingsAccountView = SettingsAccountView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, SettingsCampusRepProgramView, _ref;
return SettingsCampusRepProgramView = function(_super) {
function SettingsCampusRepProgramView() {
return SettingsCampusRepProgramView.__super__.constructor.apply(this, arguments);
}
return __extends(SettingsCampusRepProgramView, _super), SettingsCampusRepProgramView.prototype.template = "settings-campus-rep-program", 
SettingsCampusRepProgramView.prototype.className = "settings-campus-rep-program-view", 
SettingsCampusRepProgramView.prototype.initialize = function(options) {
return this.parent = options.parent, this.listenTo(this.model, "reset", this.render), 
this.listenTo(this.model, "change", this.render), this.referrals = HR.appController.getCollection("campus-rep-stats-collection"), 
this.listenTo(this.referrals, "reset", this.render), this.listenTo(this.referrals, "change", this.render), 
this.referral;
}, SettingsCampusRepProgramView.prototype.render = function() {
return this.model.sync_status && this.referrals.sync_status ? $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON(),
referrals:this.referrals.toJSON()
})) :$(this.el).html(HR.appController.viewLoader(64)), this;
}, SettingsCampusRepProgramView.prototype.saveChanges = function() {}, SettingsCampusRepProgramView.prototype.isUpdated = function() {
return !1;
}, SettingsCampusRepProgramView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SettingsCampusRepProgramView = SettingsCampusRepProgramView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, SettingsChangePasswordView, _ref;
return SettingsChangePasswordView = function(_super) {
function SettingsChangePasswordView() {
return SettingsChangePasswordView.__super__.constructor.apply(this, arguments);
}
return __extends(SettingsChangePasswordView, _super), SettingsChangePasswordView.prototype.template = "settings-change-password", 
SettingsChangePasswordView.prototype.className = "settings-change-password-view", 
SettingsChangePasswordView.prototype.initialize = function(options) {
return this.parent = options.parent, this.render();
}, SettingsChangePasswordView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, SettingsChangePasswordView.prototype.saveChanges = function() {
var change_password, error, that;
return that = this, change_password = {}, change_password.current_password = this.$("#current_password").val(), 
change_password.new_password = this.$("#new_password").val(), change_password.confirm_password = this.$("#confirm_password").val(), 
error = null, change_password.current_password ? change_password.current_password.length < 6 || change_password.confirm_password.length < 6 ? error = "Your new password must be at least 6 characters in length." :change_password.new_password !== change_password.confirm_password && (error = "Your new password and confirmation don't match.") :error = "You must enter your current password.", 
error ? this.$(".error-block").html(error).parent().fadeIn() :(this.parent.showSavingMsg(), 
$.ajax({
url:"/rest/change_password",
type:"POST",
data:{
current_password:change_password.current_password,
new_password:change_password.new_password,
confirm_password:change_password.confirm_password
},
success:function(data) {
var _callback;
return data.ok ? (that.$(".error-block").html("<span style='color:green;'>" + data.message + "</span>").parent().fadeIn(), 
that.$(".formgroup input,textarea").val(""), _callback = function() {
return window.location.href = "/login";
}, setTimeout(_callback, 2e3)) :(that.$(".error-block").html(data.message).parent().fadeIn(), 
that.parent.saveCallback("There was some error while saving your data. Please try again."));
}
}));
}, SettingsChangePasswordView.prototype.isUpdated = function() {
return this.$("#current_password").val() || this.$("#new_password").val() || this.$("#confirm_password").val();
}, SettingsChangePasswordView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SettingsChangePasswordView = SettingsChangePasswordView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, SettingsEmailPreferencesView, _ref;
return SettingsEmailPreferencesView = function(_super) {
function SettingsEmailPreferencesView() {
return SettingsEmailPreferencesView.__super__.constructor.apply(this, arguments);
}
return __extends(SettingsEmailPreferencesView, _super), SettingsEmailPreferencesView.prototype.template = "settings-email-preferences", 
SettingsEmailPreferencesView.prototype.className = "settings-email-preferences-view", 
SettingsEmailPreferencesView.prototype.initialize = function(options) {
return this.parent = options.parent, this.listenTo(this.model, "reset", this.render), 
this.profile = options.profile, this.listenTo(this.profile, "change", this.fetchModel), 
this.listenTo(this.profile, "reset", this.fetchModel), this.render();
}, SettingsEmailPreferencesView.prototype.events = {
"click label.email-option":"toggleCheckbox"
}, SettingsEmailPreferencesView.prototype.toggleCheckbox = function(e) {
return e.preventDefault(), $(e.currentTarget).hasClass("active") ? ($(e.currentTarget).removeClass("active").removeClass("active"), 
$(e.currentTarget).find("input").removeAttr("checked")) :($(e.currentTarget).addClass("active").addClass("active"), 
$(e.currentTarget).find("input").attr("checked", "checked")), this.saveChanges();
}, SettingsEmailPreferencesView.prototype.render = function() {
return this.has_template ? this.renderCurrentView() :HR.appController.getTemplate(this.template, function(template) {
return this.has_template = !0, this._template = template, this.renderCurrentView();
}, this), this;
}, SettingsEmailPreferencesView.prototype.renderCurrentView = function() {
var renderSwitchery, that;
return that = this, this._template && this.model.sync_status && ($(this.el).html(this._template({
model:this.model.toJSON()
})), this.Switchery || (this.Switchery = require__("switchery")), that = this, renderSwitchery = function() {
return $.map($(".js-switch"), function(item) {
return $(item).next().hasClass("switchery") ? void 0 :new that.Switchery(item);
});
}, setTimeout(renderSwitchery, 300), this.delegateEvents()), this;
}, SettingsEmailPreferencesView.prototype.saveChanges = function() {
var that;
return that = this, this.$("input").each(function(index, elem) {
var field, val;
return field = $(elem).attr("id"), "checkbox" === $(elem).attr("type") && (val = $(elem).is(":checked")), 
that.model.set(field, val, {
silent:!0
});
}), this.parent.saveModel(this.model);
}, SettingsEmailPreferencesView.prototype.isUpdated = function() {
var changed, that;
return that = this, changed = !1, this.$("input").each(function(index, elem) {
var field, val;
return field = $(elem).attr("id"), "checkbox" === $(elem).attr("type") && (val = $(elem).is(":checked")), 
that.model.get(field) !== val ? changed = !0 :void 0;
}), changed;
}, SettingsEmailPreferencesView.prototype.fetchModel = function() {
return this.model.fetch();
}, SettingsEmailPreferencesView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SettingsEmailPreferencesView = SettingsEmailPreferencesView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, SettingsProfileView, _ref;
return SettingsProfileView = function(_super) {
function SettingsProfileView() {
return SettingsProfileView.__super__.constructor.apply(this, arguments);
}
return __extends(SettingsProfileView, _super), SettingsProfileView.prototype.template = "settings-profile", 
SettingsProfileView.prototype.className = "settings-profile-view", SettingsProfileView.prototype.initialize = function(options) {
return this.parent = options.parent, this.listenTo(this.model, "reset", this.render), 
this.listenTo(this.model, "change", this.render), this.render();
}, SettingsProfileView.prototype.events = function() {
return {
"click label.email-option":"toggleCheckbox"
};
}, SettingsProfileView.prototype.toggleCheckbox = function(e) {
return e.preventDefault(), $(e.currentTarget).hasClass("active") ? ($(e.currentTarget).removeClass("active").removeClass("active"), 
$(e.currentTarget).find("input").removeAttr("checked")) :($(e.currentTarget).addClass("active").addClass("active"), 
$(e.currentTarget).find("input").attr("checked", "checked")), this.saveChanges();
}, SettingsProfileView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), $(this.el).find(".switch").bootstrapSwitch(), $("input#school").completer("school"), 
$("input#company").completer("company"), $("#tsize").select2(), this.setupCountrySelect(), 
this.setupLocalLanguageSelect(), this;
}, SettingsProfileView.prototype.destroy = function() {
return this.$("#tsize").select2("close"), this.$("#country").select2("close"), SettingsProfileView.__super__.destroy.call(this);
}, SettingsProfileView.prototype.setupCountrySelect = function() {
var countries, data;
return countries = window.countries_mapping, data = [], _.each(countries, function() {
return function(iso, name) {
return data.push({
id:name,
text:name
});
};
}(this)), $(this.el).find("#country").select2({
data:data,
width:"copy"
}), this.setCountry(this.model.get("country") || "");
}, SettingsProfileView.prototype.setupLocalLanguageSelect = function() {
var data, languages;
return languages = HR.TRANSLATION_LANGUAGES, data = [], _.each(languages, function() {
return function(code, name) {
return data.push({
id:name,
text:name
});
};
}(this)), $(this.el).find("#local_language").select2({
data:data,
width:"copy"
}), this.setLocalLanguage(this.model.get("local_language") || "English");
}, SettingsProfileView.prototype.getCountry = function() {
return $(this.el).find("#country").val();
}, SettingsProfileView.prototype.setCountry = function(country) {
return $(this.el).find("#country").val(country), $(this.el).find("#s2id_country .select2-choice span").text(country);
}, SettingsProfileView.prototype.setLocalLanguage = function(local_language) {
return $(this.el).find("#local_language").val(local_language), $(this.el).find("#s2id_local_language .select2-choice span").text(local_language);
}, SettingsProfileView.prototype.saveChanges = function() {
var data, that;
return that = this, data = this.getData(), _.each(data, function(val, field) {
return "secondary-email-input" !== field ? that.model.set(field, val, {
silent:!0
}) :void 0;
}), this.parent.saveModel(this.model), this.render();
}, SettingsProfileView.prototype.isUpdated = function() {
var changed, data, that;
return that = this, data = this.getData(), changed = !1, _.each(data, function(val, field) {
return "tsize" === field ? null === that.model.get(field) && "--" !== val && (changed = !0) :"local_language" === field ? null === that.model.get(field) && "English" !== val && (changed = !0) :null === that.model.get(field) && "" !== val && (changed = !0), 
null !== that.model.get(field) && that.model.get(field) !== val ? changed = !0 :void 0;
}), changed;
}, SettingsProfileView.prototype.getData = function() {
var data;
return data = {
name:this.$("input#name").val(),
username:this.$("input#username").val(),
school:this.$("input#school").val(),
company:this.$("input#company").val(),
country:this.$("input#country").val(),
website:this.$("input#website").val(),
hack:this.$("textarea#hack").val(),
tsize:this.$("#tsize").val(),
local_language:this.$("#local_language").val(),
address:this.$("#address").val()
};
}, SettingsProfileView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SettingsProfileView = SettingsProfileView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, SettingsTeamsView, _ref;
return SettingsTeamsView = function(_super) {
function SettingsTeamsView() {
return SettingsTeamsView.__super__.constructor.apply(this, arguments);
}
return __extends(SettingsTeamsView, _super), SettingsTeamsView.prototype.template = "settings-team", 
SettingsTeamsView.prototype.className = "settings-team-view", SettingsTeamsView.prototype.initialize = function(options) {
return this.parent = options.parent, this.listenTo(this.model, "reset", this.render), 
this.listenTo(this.model, "change", this.render), this.teams = new HR.TeamsCollection(), 
this.listenTo(this.teams, "reset", this.render), this.listenTo(this.teams, "remove", this.render), 
this.listenTo(this.teams, "sync", this.render), this.teams.fetch();
}, SettingsTeamsView.prototype.events = {
"click button.remove":"removeTeam"
}, SettingsTeamsView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
teams:this.teams,
hacker:this.model
})), this;
}, SettingsTeamsView.prototype.removeTeam = function(e) {
var dialog, that;
if (!$(e.currentTarget).hasClass("disabled")) return $(e.currentTarget).addClass("disabled"), 
that = this, dialog = HR.util.ShowConfirmationDialog({
title:"Confirm " + ("Delete" === $(e.currentTarget).html() ? "Deletion" :"Removal"),
body:"Are you sure?",
onDestroy:function() {
return $(e.currentTarget).removeClass("disabled");
},
buttons:[ {
name:"Yes",
callback:function(dialog) {
var btn, team, team_id;
return btn = this, this.setInactive(), $(e.currentTarget).addClass("disabled"), 
$(e.currentTarget).html("Delete" === $(e.currentTarget).html() ? "Deleting" :"Removing"), 
team_id = $(e.currentTarget).attr("data-id"), team = that.teams.get(team_id), team.destroy(), 
dialog.destroy();
}
}, {
name:"No",
callback:function(dialog) {
return this.setInactive(), dialog.destroy();
}
} ]
}), dialog.render();
}, SettingsTeamsView.prototype.saveChanges = function() {}, SettingsTeamsView.prototype.isUpdated = function() {
return !1;
}, SettingsTeamsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SettingsTeamsView = SettingsTeamsView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, SettingsView, _ref;
return SettingsView = function(_super) {
function SettingsView() {
return SettingsView.__super__.constructor.apply(this, arguments);
}
return __extends(SettingsView, _super), SettingsView.prototype.template = "settings", 
SettingsView.prototype.className = "settings-view", SettingsView.prototype.initialize = function(options) {
return this.listenTo(this.model, "reset", this.render), this.listenTo(this.model, "change", this.render), 
this.model.set("avatar_url", void 0), this.tab = options.tab, this.subview = null, 
this.subview = "teams" === this.tab ? new HR.SettingsTeamsView({
model:this.model,
parent:this
}) :"email-preferences" === this.tab ? new HR.SettingsEmailPreferencesView({
model:HR.model("email-preferences", {
username:this.model.get("username")
}).cached(),
profile:this.model,
parent:this
}) :"change-password" === this.tab ? new HR.SettingsChangePasswordView({
model:this.model,
parent:this
}) :"account" === this.tab ? new HR.SettingsAccountView({
model:this.model,
parent:this
}) :"campus-rep-program" === this.tab ? new HR.SettingsCampusRepProgramView({
model:this.model,
parent:this
}) :new HR.SettingsProfileView({
model:this.model,
parent:this
});
}, SettingsView.prototype.events = {
"click button#save-btn":"delegateSave",
"click button#upload-avatar":"handleAvatarUpload",
"click a#account":"checkUpdated",
"click a#profile":"checkUpdated",
"click a#teams":"checkUpdated",
"click a#change-password":"checkUpdated",
"click a#email-preferences":"checkUpdated",
"click a#campus-rep-program":"checkUpdated"
}, SettingsView.prototype.checkUpdated = function(e) {
var dialog, href, that;
return href = $(e.currentTarget).attr("href"), href.endsWith(this.tab) ? !1 :(that = this, 
this.subview.isUpdated() ? (dialog = new HR.util.ShowConfirmationDialog({
title:"Unsaved Changes",
body:"<p>You have unsaved changes. Would you like to save ?</p>",
buttons:[ {
name:"Save",
"class":"hr_secondary-btn hr-dialog-button",
callback:function(dialog) {
return dialog.destroy(), that.delegateSave(e), HR.router.navigate(href, !0);
}
}, {
name:"Discard",
"class":"hr_primary-btn hr-dialog-button",
callback:function(dialog) {
return dialog.destroy(), HR.router.navigate(href, !0);
}
} ]
}), dialog.render(), !1) :void 0);
}, SettingsView.prototype.settingsSaveMsg = function(message) {
return null == message && (message = ""), $(".settings_save").html(message);
}, SettingsView.prototype.showSavingMsg = function() {
return this.settingsSaveMsg("Saving..."), $("#save-success").hide(), this.disableSave();
}, SettingsView.prototype.saveCallback = function(message) {
return null == message && (message = ""), $("#save-success").html(message), $("#save-success").show(), 
this.settingsSaveMsg("Save Changes"), this.enableSave();
}, SettingsView.prototype.disableSave = function() {
return $(".settings_save").attr("disabled", "disabled");
}, SettingsView.prototype.enableSave = function() {
return $(".settings_save").removeAttr("disabled");
}, SettingsView.prototype.saveModel = function(model) {
var that;
return this.showSavingMsg(), that = this, model.save(null, {
success:function() {
return that.saveCallback("Changes saved");
},
error:function() {
return that.saveCallback("There was some error while saving your data. Please try again.");
}
});
}, SettingsView.prototype.delegateSave = function(e) {
return e.preventDefault(), this.subview.isUpdated() ? this.subview.saveChanges(e) :this.saveCallback("Changes saved");
}, SettingsView.prototype.setupTabs = function() {
var that;
return that = this, this.$("#profileTabs").length > 0 ? (this.$(".sidebar_list-heading").removeClass("active"), 
this.$("#" + this.tab + ".sidebar_list-heading").addClass("active")) :void 0;
}, SettingsView.prototype.render = function() {
var options, that, _next;
return that = this, $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this.model.id ? (this.setupTabs(), 0 === _.size(this.model.toJSON()) ? this :(this.assign({
"article#settings-subview":this.subview
}), this)) :(_next = Backbone.history.fragment, options = {
show_signup_up_link:!0,
success_callback:function() {
return HR.router.navigate(_next, !0);
}
}, this.login_dialog || (this.login_dialog = new HR.util.ShowLoginDialog(options)), 
this.login_dialog.render(), this);
}, SettingsView.prototype.handleAvatarUpload = function() {
var that, _onSuccess;
return that = this, _onSuccess = function(FPFile) {
var url;
return url = FPFile.url + "/convert?w=80&h=80", that.model.set({
avatar_url:url
}), HR.profile().set("avatar", url), $(that.$("button#save-btn")).html("Saving"), 
that.model.save(null, {
success:function() {
return $(that.$("button#save-btn")).addClass("disabled");
}
}), $(".user-head .pic-wrap img").attr("src", url);
}, filepicker.pick({
mimetypes:[ "image/*" ],
services:[ "COMPUTER", "URL", "WEBCAM", "FACEBOOK", "PICASA", "BOX", "GOOGLE_DRIVE", "DROPBOX" ]
}, _onSuccess);
}, SettingsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.SettingsView = SettingsView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, HackerProfileView, _ref;
return HackerProfileView = function(_super) {
function HackerProfileView() {
return HackerProfileView.__super__.constructor.apply(this, arguments);
}
return __extends(HackerProfileView, _super), HackerProfileView.prototype.template = "hacker-profile", 
HackerProfileView.prototype.className = "hacker-profile-view", HackerProfileView.prototype.initialize = function(options) {
return this.hacker = options.hacker, this.listenTo(this.model, "change", this.render), 
this.listenTo(this.model, "reset", this.render), this.leaderboard_stats = new HR.HackerLeaderboardStatsModel(), 
this.leaderboard_stats.setId(this.hacker), this.leaderboard_stats.cached(), this.listenTo(this.leaderboard_stats, "reset", this.renderScore), 
this.renderScore();
}, HackerProfileView.prototype.setHackerProfile = function(model) {
return this.model && delete this.model, this.model = model;
}, HackerProfileView.prototype.events = {
"click a.view-more":"show_more",
"click a.send-message":"send_message"
}, HackerProfileView.prototype.show_more = function(e) {
return e.preventDefault(), "post" === $(e.target).attr("id") ? this.posts.add_more() :"event" === $(e.target).attr("id") ? this.events_view.add_more() :void 0;
}, HackerProfileView.prototype.send_message = function() {
var model, show_dialog;
return model = this.model, show_dialog = function() {
var dialog;
return dialog = new HR.util.ShowMessageDialog({
username:model.get("username")
}), dialog.render();
}, $.ajax({
url:"/rest/threads/find?sender_id=" + HR.profile().id + "&receiver_id=" + this.model.get("id"),
success:function(resp) {
return resp.status ? Backbone.history.navigate("/inbox/thread/" + resp.thread_id, !0) :show_dialog();
},
error:function() {
return show_dialog();
}
});
}, HackerProfileView.prototype.render = function() {
return this.has_template ? (this.renderCurrentView(), this.renderSubViews(), this.renderGraphView()) :($(this.el).html(HR.appController.viewLoader(64)), 
HR.appController.getTemplate(this.template, function(template) {
return this.has_template = !0, this._template = template, this.renderCurrentView(), 
this.renderSubViews(), this.renderGraphView();
}, this)), this;
}, HackerProfileView.prototype.renderSubViews = function() {
return this.post_collection || (this.post_collection = HR.collection("hacker-post"), 
this.post_collection.setHacker(this.hacker), this.post_collection.cached()), this.event_collection || (this.event_collection = HR.collection("hacker-event"), 
this.event_collection.setHacker(this.hacker), this.event_collection.cached()), this.posts || (this.posts = new HR.HackerPostView({
collection:this.post_collection,
more:$(this.el).find(".view-more#post")
}), this.add_subview(this.posts)), this.posts.setElement($(this.el).find(".profile-post-view")), 
this.posts.render(), this.events_view || (this.events_view = new HR.HackerEventView({
collection:this.event_collection,
more:$(this.el).find(".view-more#event")
}), this.add_subview(this.events_view)), this.events_view.setElement($(this.el).find(".profile-event-view")), 
this.events_view.render(), this.renderScore();
}, HackerProfileView.prototype.renderScore = function() {
var score;
return this.model.sync_status && this.leaderboard_stats.sync_status ? (this.$(".hr_profile_rank").html("Rank: " + (this.leaderboard_stats.get("rank") || "N/A")), 
score = parseFloat(this.leaderboard_stats.get("score") || 0).toFixed(2), this.$(".hr_profile_score").html("Score: " + score)) :void 0;
}, HackerProfileView.prototype.renderCurrentView = function() {
return this._template && this.model && this.model.sync_status ? (HR.appController.setTitle(this.model.get("name")), 
$(this.el).html(this._template({
model:this.model.toJSON()
}))) :void 0;
}, HackerProfileView.prototype.renderGraphView = function() {
return this.ratingView || (this.ratingView = new HR.RatingHistoryView({
model:this.model
})), this.ratingView.setElement($(this.el).find("#profile-graph-view")), this.ratingView.render();
}, HackerProfileView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.HackerProfileView = HackerProfileView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, HackerPostView, _ref;
return HackerPostView = function(_super) {
function HackerPostView() {
return HackerPostView.__super__.constructor.apply(this, arguments);
}
return __extends(HackerPostView, _super), HackerPostView.prototype.template = "hacker-post", 
HackerPostView.prototype.initialize = function(options) {
return this.collection = options.collection, this.listenTo(this.collection, "change", this.render), 
this.listenTo(this.collection, "reset", this.render), this.more = options.more;
}, HackerPostView.prototype.add_more = function() {
return $(this.el).append(HR.appController.viewLoader(64)), this.collection.setOffset(this.collection.length), 
this.collection.fetch({
add:!0
});
}, HackerPostView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this.has_template = !0, this._template = template, this.renderView();
}, this), this;
}, HackerPostView.prototype.renderView = function() {
return this._template && this.collection.sync_status ? ($(this.el).html(this._template({
model:this.collection.toJSON(),
hacker:this.collection.hacker
})), HR.util.ajaxmsg("Loading...", !0, !0, .5)) :void 0;
}, HackerPostView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.HackerPostView = HackerPostView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, HackerEventView, _ref;
return HackerEventView = function(_super) {
function HackerEventView() {
return HackerEventView.__super__.constructor.apply(this, arguments);
}
return __extends(HackerEventView, _super), HackerEventView.prototype.template = "hacker-event", 
HackerEventView.prototype.initialize = function(options) {
return this.listenTo(this.collection, "change", this.render), this.listenTo(this.collection, "reset", this.render), 
this.more = options.more;
}, HackerEventView.prototype.add_more = function() {
return $(this.el).append(HR.appController.viewLoader(64)), this.collection.setOffset(this.collection.length), 
this.collection.fetch({
add:!0
});
}, HackerEventView.prototype.render = function() {
return this.has_template ? this.renderView() :HR.appController.getTemplate(this.template, function(template) {
return this.has_template = !0, this._template = template, this.renderView();
}, this), this;
}, HackerEventView.prototype.renderView = function() {
return this._template && this.collection ? $(this.el).html(this._template({
model:this.collection.toJSON(),
hacker:this.collection.hacker
})) :void 0;
}, HackerEventView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.HackerEventView = HackerEventView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var DashboardView, HR, _ref;
return DashboardView = function(_super) {
function DashboardView() {
return DashboardView.__super__.constructor.apply(this, arguments);
}
return __extends(DashboardView, _super), DashboardView.prototype.template = "dashboard/base", 
DashboardView.prototype.className = "dashboard-view", DashboardView.prototype.initialize = function() {
return this.hacker = HR.profile(), this.dashboard = HR.model("dashboard").cached(), 
this.listenTo(this.hacker, "reset", this.render), this.listenTo(this.dashboard, "reset", this.render), 
HR.requires("compound/highcharts", function() {});
}, DashboardView.prototype.render = function() {
return this.hacker.sync_status && this.dashboard.sync_status ? ($(this.el).html(HR.appController.template(this.template, this)({
model:this.dashboard.toJSON()
})), this.historyView || (this.historyView = new HR.DashboardHistoryView({
model:HR.profile().toJSON(),
username:HR.profile().get("username")
})), this.trackView || (this.trackView = new HR.DashboardTrackView({
dashboard:this.dashboard
})), this.submissionsView || (this.submissionsView = new HR.DashboardSubmissionsView()), 
this.assign({
".dashboard_submissions":this.submissionsView,
".dashboard_tracks":this.trackView,
".dashboard_history":this.historyView
}), this) :($(this.el).html(HR.appController.viewLoader(64)), this);
}, DashboardView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.DashboardView = DashboardView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var DashboardHistoryView, HR, _ref;
return DashboardHistoryView = function(_super) {
function DashboardHistoryView() {
return DashboardHistoryView.__super__.constructor.apply(this, arguments);
}
return __extends(DashboardHistoryView, _super), DashboardHistoryView.prototype.template = "dashboard/history", 
DashboardHistoryView.prototype.className = "dashboard-history", DashboardHistoryView.prototype.initialize = function(options) {
return null == options && (options = {}), this.history = HR.collection("dashboard-history"), 
this.history.setHacker(this.model.username), this.history.cached(), this.listenTo(this.history, "reset", this.render), 
this.listenTo(this.history, "change", this.render);
}, DashboardHistoryView.prototype.setupChange = function() {
var lastRank;
return lastRank = 0, this.maxRank = 0, this.lowestRank = null, this.history.each(function(_this) {
return function(event) {
var change, currentRank;
return currentRank = event.get("rank"), change = currentRank - lastRank, currentRank > _this.maxRank && (_this.maxRank = currentRank), 
_this.lowestRank && currentRank < _this.lowestRank && (_this.lowestRank = currentRank), 
event.set({
increase:change >= 0,
change:change,
logged_at:new Date(event.get("logged_at"))
}, {
silent:!0
}), lastRank = currentRank;
};
}(this));
}, DashboardHistoryView.prototype.renderChart = function(options) {
var defaultOptions, that;
return null == options && (options = {}), that = this, defaultOptions = {
chart:{
type:"line",
zoomType:"x",
backgroundColor:null,
height:250
},
colors:[ "#00beff", "#9bc0e3" ],
title:{
text:null
},
legend:{
enabled:!1
},
xAxis:{
title:{
text:null
},
categories:this.history.map(function(event) {
return event.get("logged_at");
}),
labels:{
enabled:!1
}
},
yAxis:{
title:{
text:null
},
labels:{
enabled:!1
},
gridLineWidth:0,
tickInterval:100
},
credits:{
enabled:!1
},
series:[ {
data:this.history.map(function(event) {
return {
y:that.maxRank - event.get("rank"),
event:event
};
}),
name:"Rank"
} ],
tooltip:{
formatter:function() {
var change, change_color, change_sign, event, html, logged_at, rank;
return event = this.point.event, rank = event.get("rank"), change = event.get("change"), 
logged_at = event.get("logged_at"), html = "<b>" + event.get("rank") + "</b>", rank !== change && (event.get("change") >= 0 ? (change_color = "red", 
change_sign = "+") :(change_color = "green", change_sign = "-"), html += ' (<span style="color:' + change_color + '">' + change_sign + " " + Math.abs(change) + "</span>)"), 
html += "<br/><i>" + logged_at.toDateString() + "</i>";
}
}
}, options = _.extend(defaultOptions, options), HR.requires("compound/highcharts", function(_this) {
return function() {
return that = _this, setTimeout(function() {
return that.$(".history-chart").length > 0 ? that.$(".history-chart").highcharts(options) :void 0;
}, 0);
};
}(this));
}, DashboardHistoryView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
history:this.history,
model:this.model
})), this.history.sync_status ? (this.setupChange(), this.history.length > 1 && this.renderChart(), 
this) :($(this.el).html(HR.appController.viewLoader()), this);
}, DashboardHistoryView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.DashboardHistoryView = DashboardHistoryView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, RatingHistoryView, _ref;
return RatingHistoryView = function(_super) {
function RatingHistoryView() {
return RatingHistoryView.__super__.constructor.apply(this, arguments);
}
return __extends(RatingHistoryView, _super), RatingHistoryView.prototype.template = "dashboard/rating-history", 
RatingHistoryView.prototype.className = "dashboard-rating-history", RatingHistoryView.prototype.initialize = function(options) {
var that;
return null == options && (options = {}), this.rendered = !1, that = this, this.listenTo(this.model, "reset", this.render), 
this.listenTo(this.model, "change", this.render), $.ajax({
async:!1,
url:"rest/hackers/" + this.model.get("username") + "/rating_histories",
success:function(data) {
return that.data = data;
}
});
}, RatingHistoryView.prototype.renderChart = function(history, options) {
var defaultOptions, event, prev, that, _i, _len, _ref;
for (null == options && (options = {}), prev = 1500, _ref = history.events, _i = 0, 
_len = _ref.length; _len > _i; _i++) event = _ref[_i], event.rating = Math.floor(event.rating), 
event.change = event.rating - prev, prev = event.rating;
return that = this, defaultOptions = {
chart:{
type:"line",
zoomType:"x",
backgroundColor:null,
height:250,
width:600
},
colors:[ "#00beff", "#9bc0e3" ],
title:{
text:null
},
legend:{
enabled:!1
},
xAxis:{
title:{
text:null
},
labels:{
enabled:!1
}
},
yAxis:{
title:{
text:null
},
labels:{
format:"{value}"
},
gridLineWidth:0
},
credits:{
enabled:!1
},
series:[ {
data:history.events.map(function(event) {
return {
x:new Date(event.date).getTime(),
y:event.rating,
event:event
};
}),
name:"Rank"
} ],
tooltip:{
formatter:function() {
var change_color, change_sign, date, html;
return event = this.point.event, date = new Date(event.date), html = "<a href='www.hackerrank.com/contests/" + event.contest_slug + "/leaderboard'>" + event.contest_name + "</a><br/>", 
html += "<b>" + event.rating + "</b>", event.change >= 0 ? (change_color = "green", 
change_sign = "+") :(change_color = "red", change_sign = "-"), html += ' (<span style="color:' + change_color + '">' + change_sign + Math.abs(event.change) + "</span>)<br/>", 
html += "<i>" + date.toDateString() + "</i>";
}
}
}, options = _.extend(defaultOptions, options), HR.requires("compound/highcharts", function(_this) {
return function() {
return _this.$("." + history.index + "-history-chart").highcharts(options);
};
}(this));
}, RatingHistoryView.prototype.render = function() {
var history, index, rating, tracks, _i, _j, _len, _len1, _ref, _ref1;
if (this.data && this.model.sync_status) {
for (tracks = [], _ref = this.data.models, index = _i = 0, _len = _ref.length; _len > _i; index = ++_i) history = _ref[index], 
tracks.push({
id:index + 1,
text:history.category,
count:history.events.length
});
for (rating = this.model.get("current_rating"), $(this.el).html(HR.appController.template(this.template, this)({
model:tracks,
rating:rating
})), _ref1 = this.data.models, index = _j = 0, _len1 = _ref1.length; _len1 > _j; index = ++_j) history = _ref1[index], 
history.index = index + 1, this.renderChart(history);
}
return this;
}, RatingHistoryView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.RatingHistoryView = RatingHistoryView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var DashboardSubmissionView, HR, _ref;
return DashboardSubmissionView = function(_super) {
function DashboardSubmissionView() {
return DashboardSubmissionView.__super__.constructor.apply(this, arguments);
}
return __extends(DashboardSubmissionView, _super), DashboardSubmissionView.prototype.template = "dashboard/submission", 
DashboardSubmissionView.prototype.className = "dashboard-submission-view", DashboardSubmissionView.prototype.initialize = function(options) {
return this.model = options.model, this.listenTo(this.model, "reset", this.render);
}, DashboardSubmissionView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model.toJSON()
})), this;
}, DashboardSubmissionView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.DashboardSubmissionView = DashboardSubmissionView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var DashboardSubmissionsView, HR, _ref;
return DashboardSubmissionsView = function(_super) {
function DashboardSubmissionsView() {
return DashboardSubmissionsView.__super__.constructor.apply(this, arguments);
}
return __extends(DashboardSubmissionsView, _super), DashboardSubmissionsView.prototype.template = "dashboard/submissions", 
DashboardSubmissionsView.prototype.className = "dashboard-submissions-view", DashboardSubmissionsView.prototype.initialize = function() {
return this.submissions = HR.collection("submissions").cached(), this.listenTo(this.submissions, "reset", this.render);
}, DashboardSubmissionsView.prototype.render = function() {
var submissions;
return $(this.el).html("<p class='block-margin'>You have not submitted a solution to any challenges yet.</p>"), 
submissions = $("<div>"), this.submissions.length && (_.each(this.submissions.slice(0, 5), function() {
return function(model) {
var submissionView;
return submissionView = new HR.DashboardSubmissionView({
model:model
}), submissions.append(submissionView.render().el);
};
}(this)), $(this.el).html(submissions)), this;
}, DashboardSubmissionsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.DashboardSubmissionsView = DashboardSubmissionsView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var DashboardTrackView, HR, _ref;
return DashboardTrackView = function(_super) {
function DashboardTrackView() {
return DashboardTrackView.__super__.constructor.apply(this, arguments);
}
return __extends(DashboardTrackView, _super), DashboardTrackView.prototype.template = "dashboard/track", 
DashboardTrackView.prototype.className = "dashboard-track-view", DashboardTrackView.prototype.initialize = function(options) {
return this.dashboard = options.dashboard, this.progress = HR.model("dashboard-progress").cached(), 
this.listenTo(this.progress, "reset", this.render);
}, DashboardTrackView.prototype.events = {
"click .track-select":"trackSelect"
}, DashboardTrackView.prototype.currentName = function() {
return this.track ? this.track.get("name") :"All Tracks";
}, DashboardTrackView.prototype.trackSelect = function(e) {
var el;
return el = $(e.currentTarget), this.track_id = el.attr("data-track-id") || null, 
this.track = this.progress.tracks().get(this.track_id), this.render();
}, DashboardTrackView.prototype.stats = function() {
var stats;
return stats = this.progress.stats(this.track_id), stats.languages && (stats.languages[0] = "<strong>" + stats.languages[0] + "</strong>"), 
stats;
}, DashboardTrackView.prototype.renderChart = function(options) {
var defaultOptions, stats;
return null == options && (options = {}), stats = this.stats(), defaultOptions = {
chart:{
plotBackgroundColor:null,
plotBorderWidth:null,
plotShadow:!1,
backgroundColor:null,
height:250
},
colors:[ "#2674c6", "#ddd9d9" ],
title:{
text:null
},
tooltip:{
pointFormat:"{series.name}: <b>{point.percentage}%</b>",
percentageDecimals:1
},
plotOptions:{
pie:{
allowPointSelect:!0,
cursor:"pointer",
dataLabels:{
enabled:!1
},
innerSize:"30%",
startAngle:-90
}
},
series:[ {
type:"pie",
name:"Challenges share",
data:[ {
name:"Completed",
y:stats.completion,
sliced:!0,
selected:!0
}, {
name:"Remaining",
y:100 - stats.completion
} ]
} ]
}, options = _.extend(defaultOptions, options), HR.requires("compound/highcharts", function() {
return function() {
return $(".track-chart").highcharts(options);
};
}(this));
}, DashboardTrackView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.progress.toJSON(),
stats:this.stats(),
currentName:this.currentName()
})), this.progress.sync_status ? (this.renderChart(), this.delegateEvents(), this) :($(this.el).html(HR.appController.viewLoader()), 
this);
}, DashboardTrackView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.DashboardTrackView = DashboardTrackView;
});
}.call(this), window.googleLT_ || (window.googleLT_ = new Date().getTime()), window.google || (window.google = {}), 
window.google.loader || (window.google.loader = {}, google.loader.ServiceBase = "https://www.google.com/uds", 
google.loader.GoogleApisBase = "https://ajax.googleapis.com/ajax", google.loader.ApiKey = "notsupplied", 
google.loader.KeyVerified = !0, google.loader.LoadFailure = !1, google.loader.Secure = !0, 
google.loader.GoogleLocale = "www.google.com", google.loader.ClientLocation = {
latitude:12.967,
longitude:77.583,
address:{
city:"Bengaluru",
region:"Karnataka",
country:"India",
country_code:"IN"
}
}, google.loader.AdditionalParams = "", function() {
function p(a, b) {
return a.load = b;
}
function G(a) {
return a in H ? H[a] :H[a] = -1 != navigator.userAgent[F]()[v](a);
}
function I(a, b) {
var c = function() {};
c.prototype = b[A], a.T = b[A], a.prototype = new c();
}
function J(a, b) {
var e = Array[A].slice.call(arguments, 2) || [];
return function() {
var c = e.concat(Array[A].slice.call(arguments));
return a.apply(b, c);
};
}
function K(a) {
return a = Error(a), a.toString = function() {
return this.message;
}, a;
}
function L(a, b) {
for (var c = a.split(/\./), e = m, f = 0; f < c[z] - 1; f++) e[c[f]] || (e[c[f]] = {}), 
e = e[c[f]];
e[c[c[z] - 1]] = b;
}
function aa(a, b, c) {
a[b] = c;
}
function R(a, b, c) {
if (a.addEventListener) a.addEventListener(b, c, k); else if (a.attachEvent) a.attachEvent("on" + b, c); else {
var e = a["on" + b];
if (e != h) {
var f = [ c, e ];
c = function() {
for (var a = 0; a < f[z]; a++) f[a]();
};
}
a["on" + b] = c;
}
}
function ba() {
ca[n.readyState] ? S() :0 < Q[z] && m[B](ba, 10);
}
function S() {
for (var a = 0; a < Q[z]; a++) Q[a]();
Q.length = 0;
}
function V(a) {
this.b = a, this.o = [], this.n = {}, this.e = {}, this.f = {}, this.j = g, this.c = -1;
}
function X(a) {
this.D = a, this.q = {}, this.r = 0;
}
function W(a, b, c) {
this.name = a, this.C = b, this.p = c, this.u = this.h = k, this.k = [], google[C].v[this[x]] = J(this.l, this);
}
function T(a, b) {
this.b = a, this.i = b, this.h = k;
}
var d = void 0, g = !0, h = null, k = !1, l = encodeURIComponent, m = window, n = document, r = "push", s = "replace", t = "charAt", v = "indexOf", w = "ServiceBase", x = "name", y = "getTime", z = "length", A = "prototype", B = "setTimeout", C = "loader", D = "substring", E = "join", F = "toLowerCase", H = {};
if (!M) var M = L;
if (!N) var N = aa;
google[C].v = {}, M("google.loader.callbacks", google[C].v);
var O = {}, P = {};
google[C].eval = {}, M("google.loader.eval", google[C].eval), p(google, function(a, b, c) {
function e(a) {
var b = a.split(".");
if (2 < b[z]) throw K("Module: '" + a + "' not found!");
"undefined" != typeof b[1] && (f = b[0], c.packages = c.packages || [], c.packages[r](b[1]));
}
var f = a;
if (c = c || {}, a instanceof Array || a && "object" == typeof a && "function" == typeof a[E] && "function" == typeof a.reverse) for (var j = 0; j < a[z]; j++) e(a[j]); else e(a);
if (!(a = O[":" + f])) throw K("Module: '" + f + "' not found!");
if (c && !c.language && c.locale && (c.language = c.locale), c && "string" == typeof c.callback && (j = c.callback, 
j.match(/^[[\]A-Za-z0-9._]+$/) && (j = m.eval(j), c.callback = j)), (j = c && c.callback != h) && !a.s(b)) throw K("Module: '" + f + "' must be loaded before DOM onLoad!");
j ? a.m(b, c) ? m[B](c.callback, 0) :a.load(b, c) :a.m(b, c) || a.load(b, c);
}), M("google.load", google.load), google.S = function(a, b) {
b ? (0 == Q[z] && (R(m, "load", S), !G("msie") && !G("safari") && !G("konqueror") && G("mozilla") || m.opera ? m.addEventListener("DOMContentLoaded", S, k) :G("msie") ? n.write("<script defer onreadystatechange='google.loader.domReady()' src=//:></script>") :(G("safari") || G("konqueror")) && m[B](ba, 10)), 
Q[r](a)) :R(m, "load", a);
}, M("google.setOnLoadCallback", google.S);
var Q = [];
google[C].O = function() {
var a = m.event.srcElement;
"complete" == a.readyState && (a.onreadystatechange = h, a.parentNode.removeChild(a), 
S());
}, M("google.loader.domReady", google[C].O);
var ca = {
loaded:g,
complete:g
};
google[C].d = function(a, b, c) {
if (c) {
var e;
"script" == a ? (e = n.createElement("script"), e.type = "text/javascript", e.src = b) :"css" == a && (e = n.createElement("link"), 
e.type = "text/css", e.href = b, e.rel = "stylesheet"), (a = n.getElementsByTagName("head")[0]) || (a = n.body.parentNode.appendChild(n.createElement("head"))), 
a.appendChild(e);
} else "script" == a ? n.write('<script src="' + b + '" type="text/javascript"></script>') :"css" == a && n.write('<link href="' + b + '" type="text/css" rel="stylesheet"></link>');
}, M("google.loader.writeLoadTag", google[C].d), google[C].P = function(a) {
P = a;
}, M("google.loader.rfm", google[C].P), google[C].R = function(a) {
for (var b in a) "string" == typeof b && b && ":" == b[t](0) && !O[b] && (O[b] = new T(b[D](1), a[b]));
}, M("google.loader.rpl", google[C].R), google[C].Q = function(a) {
if ((a = a.specs) && a[z]) for (var b = 0; b < a[z]; ++b) {
var c = a[b];
"string" == typeof c ? O[":" + c] = new V(c) :(c = new W(c[x], c.baseSpec, c.customSpecs), 
O[":" + c[x]] = c);
}
}, M("google.loader.rm", google[C].Q), google[C].loaded = function(a) {
O[":" + a.module].l(a);
}, M("google.loader.loaded", google[C].loaded), google[C].N = function() {
return "qid=" + (new Date()[y]().toString(16) + Math.floor(1e7 * Math.random()).toString(16));
}, M("google.loader.createGuidArg_", google[C].N), L("google_exportSymbol", L), 
L("google_exportProperty", aa), google[C].a = {}, M("google.loader.themes", google[C].a), 
google[C].a.H = "//www.google.com/cse/style/look/bubblegum.css", N(google[C].a, "BUBBLEGUM", google[C].a.H), 
google[C].a.J = "//www.google.com/cse/style/look/greensky.css", N(google[C].a, "GREENSKY", google[C].a.J), 
google[C].a.I = "//www.google.com/cse/style/look/espresso.css", N(google[C].a, "ESPRESSO", google[C].a.I), 
google[C].a.L = "//www.google.com/cse/style/look/shiny.css", N(google[C].a, "SHINY", google[C].a.L), 
google[C].a.K = "//www.google.com/cse/style/look/minimalist.css", N(google[C].a, "MINIMALIST", google[C].a.K), 
google[C].a.M = "//www.google.com/cse/style/look/v2/default.css", N(google[C].a, "V2_DEFAULT", google[C].a.M), 
V[A].g = function(a, b) {
var c = "";
if (b != d && (b.language != d && (c += "&hl=" + l(b.language)), b.nocss != d && (c += "&output=" + l("nocss=" + b.nocss)), 
b.nooldnames != d && (c += "&nooldnames=" + l(b.nooldnames)), b.packages != d && (c += "&packages=" + l(b.packages)), 
b.callback != h && (c += "&async=2"), b.style != d && (c += "&style=" + l(b.style)), 
b.noexp != d && (c += "&noexp=true"), b.other_params != d && (c += "&" + b.other_params)), 
!this.j) {
google[this.b] && google[this.b].JSHash && (c += "&sig=" + l(google[this.b].JSHash));
var f, e = [];
for (f in this.n) ":" == f[t](0) && e[r](f[D](1));
for (f in this.e) ":" == f[t](0) && this.e[f] && e[r](f[D](1));
c += "&have=" + l(e[E](","));
}
return google[C][w] + "/?file=" + this.b + "&v=" + a + google[C].AdditionalParams + c;
}, V[A].t = function(a) {
var b = h;
a && (b = a.packages);
var c = h;
if (b) if ("string" == typeof b) c = [ a.packages ]; else if (b[z]) for (c = [], 
a = 0; a < b[z]; a++) "string" == typeof b[a] && c[r](b[a][s](/^\s*|\s*$/, "")[F]());
for (c || (c = [ "default" ]), b = [], a = 0; a < c[z]; a++) this.n[":" + c[a]] || b[r](c[a]);
return b;
}, p(V[A], function(a, b) {
var c = this.t(b), e = b && b.callback != h;
if (e) var f = new X(b.callback);
for (var j = [], q = c[z] - 1; q >= 0; q--) {
var u = c[q];
e && f.A(u), this.e[":" + u] ? (c.splice(q, 1), e && this.f[":" + u][r](f)) :j[r](u);
}
if (c[z]) {
for (b && b.packages && (b.packages = c.sort()[E](",")), q = 0; q < j[z]; q++) u = j[q], 
this.f[":" + u] = [], e && this.f[":" + u][r](f);
if (b || P[":" + this.b] == h || P[":" + this.b].versions[":" + a] == h || google[C].AdditionalParams || !this.j) (!b || !b.autoloaded) && google[C].d("script", this.g(a, b), e); else {
c = P[":" + this.b], google[this.b] = google[this.b] || {};
for (var U in c.properties) U && ":" == U[t](0) && (google[this.b][U[D](1)] = c.properties[U]);
google[C].d("script", google[C][w] + c.path + c.js, e), c.css && google[C].d("css", google[C][w] + c.path + c.css, e);
}
for (this.j && (this.j = k, this.c = new Date()[y](), 1 != this.c % 100 && (this.c = -1)), 
q = 0; q < j[z]; q++) u = j[q], this.e[":" + u] = g;
}
}), V[A].l = function(a) {
-1 != this.c && (da("al_" + this.b, "jl." + (new Date()[y]() - this.c), g), this.c = -1), 
this.o = this.o.concat(a.components), google[C][this.b] || (google[C][this.b] = {}), 
google[C][this.b].packages = this.o.slice(0);
for (var b = 0; b < a.components[z]; b++) {
this.n[":" + a.components[b]] = g, this.e[":" + a.components[b]] = k;
var c = this.f[":" + a.components[b]];
if (c) {
for (var e = 0; e < c[z]; e++) c[e].B(a.components[b]);
delete this.f[":" + a.components[b]];
}
}
}, V[A].m = function(a, b) {
return 0 == this.t(b)[z];
}, V[A].s = function() {
return g;
}, X[A].A = function(a) {
this.r++, this.q[":" + a] = g;
}, X[A].B = function(a) {
this.q[":" + a] && (this.q[":" + a] = k, this.r--, 0 == this.r && m[B](this.D, 0));
}, I(W, V), p(W[A], function(a, b) {
var c = b && b.callback != h;
c ? (this.k[r](b.callback), b.callback = "google.loader.callbacks." + this[x]) :this.h = g, 
(!b || !b.autoloaded) && google[C].d("script", this.g(a, b), c);
}), W[A].m = function(a, b) {
return b && b.callback != h ? this.u :this.h;
}, W[A].l = function() {
this.u = g;
for (var a = 0; a < this.k[z]; a++) m[B](this.k[a], 0);
this.k = [];
};
var Y = function(a, b) {
return a.string ? l(a.string) + "=" + l(b) :a.regex ? b[s](/(^.*$)/, a.regex) :"";
};
W[A].g = function(a, b) {
return this.F(this.w(a), a, b);
}, W[A].F = function(a, b, c) {
var e = "";
if (a.key && (e += "&" + Y(a.key, google[C].ApiKey)), a.version && (e += "&" + Y(a.version, b)), 
b = google[C].Secure && a.ssl ? a.ssl :a.uri, c != h) for (var f in c) a.params[f] ? e += "&" + Y(a.params[f], c[f]) :"other_params" == f ? e += "&" + c[f] :"base_domain" == f && (b = "http://" + c[f] + a.uri[D](a.uri[v]("/", 7)));
return google[this[x]] = {}, -1 == b[v]("?") && e && (e = "?" + e[D](1)), b + e;
}, W[A].s = function(a) {
return this.w(a).deferred;
}, W[A].w = function(a) {
if (this.p) for (var b = 0; b < this.p[z]; ++b) {
var c = this.p[b];
if (RegExp(c.pattern).test(a)) return c;
}
return this.C;
}, I(T, V), p(T[A], function(a, b) {
this.h = g, google[C].d("script", this.g(a, b), k);
}), T[A].m = function() {
return this.h;
}, T[A].l = function() {}, T[A].g = function(a, b) {
if (!this.i.versions[":" + a]) {
if (this.i.aliases) {
var c = this.i.aliases[":" + a];
c && (a = c);
}
if (!this.i.versions[":" + a]) throw K("Module: '" + this.b + "' with version '" + a + "' not found!");
}
return google[C].GoogleApisBase + "/libs/" + this.b + "/" + a + "/" + this.i.versions[":" + a][b && b.uncompressed ? "uncompressed" :"compressed"];
}, T[A].s = function() {
return k;
};
var ea = k, Z = [], fa = new Date()[y](), ha = function() {
ea || (R(m, "unload", ga), ea = g);
}, ia = function(a, b) {
if (ha(), !(google[C].Secure || google[C].Options && google[C].Options.csi !== k)) {
for (var c = 0; c < a[z]; c++) a[c] = l(a[c][F]()[s](/[^a-z0-9_.]+/g, "_"));
for (c = 0; c < b[z]; c++) b[c] = l(b[c][F]()[s](/[^a-z0-9_.]+/g, "_"));
m[B](J($, h, "//gg.google.com/csi?s=uds&v=2&action=" + a[E](",") + "&it=" + b[E](",")), 1e4);
}
}, da = function(a, b, c) {
c ? ia([ a ], [ b ]) :(ha(), Z[r]("r" + Z[z] + "=" + l(a + (b ? "|" + b :""))), 
m[B](ga, 5 < Z[z] ? 0 :15e3));
}, ga = function() {
if (Z[z]) {
var a = google[C][w];
0 == a[v]("http:") && (a = a[s](/^http:/, "https:")), $(a + "/stats?" + Z[E]("&") + "&nc=" + new Date()[y]() + "_" + (new Date()[y]() - fa)), 
Z.length = 0;
}
}, $ = function(a) {
var b = new Image(), c = $.G++;
$.z[c] = b, b.onload = b.onerror = function() {
delete $.z[c];
}, b.src = a, b = h;
};
$.z = {}, $.G = 0, L("google.loader.recordCsiStat", ia), L("google.loader.recordStat", da), 
L("google.loader.createImageForLogging", $);
}(), google.loader.rm({
specs:[ "feeds", "spreadsheets", "gdata", "visualization", {
name:"sharing",
baseSpec:{
uri:"http://www.google.com/s2/sharing/js",
ssl:null,
key:{
string:"key"
},
version:{
string:"v"
},
deferred:!1,
params:{
language:{
string:"hl"
}
}
}
}, "search", "orkut", "ads", "elements", {
name:"books",
baseSpec:{
uri:"http://books.google.com/books/api.js",
ssl:"https://encrypted.google.com/books/api.js",
key:{
string:"key"
},
version:{
string:"v"
},
deferred:!0,
params:{
callback:{
string:"callback"
},
language:{
string:"hl"
}
}
}
}, {
name:"friendconnect",
baseSpec:{
uri:"http://www.google.com/friendconnect/script/friendconnect.js",
ssl:null,
key:{
string:"key"
},
version:{
string:"v"
},
deferred:!1,
params:{}
}
}, "identitytoolkit", "ima", {
name:"maps",
baseSpec:{
uri:"http://maps.google.com/maps?file=googleapi",
ssl:"https://maps-api-ssl.google.com/maps?file=googleapi",
key:{
string:"key"
},
version:{
string:"v"
},
deferred:!0,
params:{
callback:{
regex:"callback=$1&async=2"
},
language:{
string:"hl"
}
}
},
customSpecs:[ {
uri:"http://maps.googleapis.com/maps/api/js",
ssl:"https://maps.googleapis.com/maps/api/js",
version:{
string:"v"
},
deferred:!0,
params:{
callback:{
string:"callback"
},
language:{
string:"hl"
}
},
pattern:"^(3|3..*)$"
} ]
}, "payments", "wave", "annotations_v2", "earth", "language", {
name:"annotations",
baseSpec:{
uri:"http://www.google.com/reviews/scripts/annotations_bootstrap.js",
ssl:null,
key:{
string:"key"
},
version:{
string:"v"
},
deferred:!0,
params:{
callback:{
string:"callback"
},
language:{
string:"hl"
},
country:{
string:"gl"
}
}
}
}, "picker" ]
}), google.loader.rfm({
":search":{
versions:{
":1":"1",
":1.0":"1"
},
path:"/api/search/1.0/981037b0e11ff304c7b2bfd67d56a506/",
js:"default+en.I.js",
css:"default+en.css",
properties:{
":JSHash":"981037b0e11ff304c7b2bfd67d56a506",
":NoOldNames":!1,
":Version":"1.0"
}
},
":language":{
versions:{
":1":"1",
":1.0":"1"
},
path:"/api/language/1.0/5c0e5bb3f3395bbb139742509e2bb268/",
js:"default+en.I.js",
properties:{
":JSHash":"5c0e5bb3f3395bbb139742509e2bb268",
":Version":"1.0"
}
},
":feeds":{
versions:{
":1":"1",
":1.0":"1"
},
path:"/api/feeds/1.0/77f89919ef841f93359ce886504e4e3f/",
js:"default+en.I.js",
css:"default+en.css",
properties:{
":JSHash":"77f89919ef841f93359ce886504e4e3f",
":Version":"1.0"
}
},
":spreadsheets":{
versions:{
":0":"1",
":0.4":"1"
},
path:"/api/spreadsheets/0.4/87ff7219e9f8a8164006cbf28d5e911a/",
js:"default.I.js",
properties:{
":JSHash":"87ff7219e9f8a8164006cbf28d5e911a",
":Version":"0.4"
}
},
":ima":{
versions:{
":3":"1",
":3.0":"1"
},
path:"/api/ima/3.0/28a914332232c9a8ac0ae8da68b1006e/",
js:"default.I.js",
properties:{
":JSHash":"28a914332232c9a8ac0ae8da68b1006e",
":Version":"3.0"
}
},
":wave":{
versions:{
":1":"1",
":1.0":"1"
},
path:"/api/wave/1.0/3b6f7573ff78da6602dda5e09c9025bf/",
js:"default.I.js",
properties:{
":JSHash":"3b6f7573ff78da6602dda5e09c9025bf",
":Version":"1.0"
}
},
":earth":{
versions:{
":1":"1",
":1.0":"1"
},
path:"/api/earth/1.0/109c7b2bae7fe6cc34ea875176165d81/",
js:"default.I.js",
properties:{
":JSHash":"109c7b2bae7fe6cc34ea875176165d81",
":Version":"1.0"
}
},
":annotations":{
versions:{
":1":"1",
":1.0":"1"
},
path:"/api/annotations/1.0/632d801f04d14d064b3a2e4290697a29/",
js:"default+en.I.js",
properties:{
":JSHash":"632d801f04d14d064b3a2e4290697a29",
":Version":"1.0"
}
},
":picker":{
versions:{
":1":"1",
":1.0":"1"
},
path:"/api/picker/1.0/05c87704cd84b49307c16b1e4e9aee7c/",
js:"default.I.js",
css:"default.css",
properties:{
":JSHash":"05c87704cd84b49307c16b1e4e9aee7c",
":Version":"1.0"
}
}
}), google.loader.rpl({
":scriptaculous":{
versions:{
":1.8.3":{
uncompressed:"scriptaculous.js",
compressed:"scriptaculous.js"
},
":1.9.0":{
uncompressed:"scriptaculous.js",
compressed:"scriptaculous.js"
},
":1.8.2":{
uncompressed:"scriptaculous.js",
compressed:"scriptaculous.js"
},
":1.8.1":{
uncompressed:"scriptaculous.js",
compressed:"scriptaculous.js"
}
},
aliases:{
":1.8":"1.8.3",
":1":"1.9.0",
":1.9":"1.9.0"
}
},
":yui":{
versions:{
":2.6.0":{
uncompressed:"build/yuiloader/yuiloader.js",
compressed:"build/yuiloader/yuiloader-min.js"
},
":2.9.0":{
uncompressed:"build/yuiloader/yuiloader.js",
compressed:"build/yuiloader/yuiloader-min.js"
},
":2.7.0":{
uncompressed:"build/yuiloader/yuiloader.js",
compressed:"build/yuiloader/yuiloader-min.js"
},
":2.8.0r4":{
uncompressed:"build/yuiloader/yuiloader.js",
compressed:"build/yuiloader/yuiloader-min.js"
},
":2.8.2r1":{
uncompressed:"build/yuiloader/yuiloader.js",
compressed:"build/yuiloader/yuiloader-min.js"
},
":2.8.1":{
uncompressed:"build/yuiloader/yuiloader.js",
compressed:"build/yuiloader/yuiloader-min.js"
},
":3.3.0":{
uncompressed:"build/yui/yui.js",
compressed:"build/yui/yui-min.js"
}
},
aliases:{
":3":"3.3.0",
":2":"2.9.0",
":2.7":"2.7.0",
":2.8.2":"2.8.2r1",
":2.6":"2.6.0",
":2.9":"2.9.0",
":2.8":"2.8.2r1",
":2.8.0":"2.8.0r4",
":3.3":"3.3.0"
}
},
":swfobject":{
versions:{
":2.1":{
uncompressed:"swfobject_src.js",
compressed:"swfobject.js"
},
":2.2":{
uncompressed:"swfobject_src.js",
compressed:"swfobject.js"
}
},
aliases:{
":2":"2.2"
}
},
":webfont":{
versions:{
":1.0.28":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.27":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.29":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.12":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.13":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.14":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.15":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.10":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.11":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.2":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.1":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.0":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.6":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.19":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.5":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.18":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.4":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.17":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.3":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.16":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.9":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.21":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.22":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.25":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.26":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.23":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
},
":1.0.24":{
uncompressed:"webfont_debug.js",
compressed:"webfont.js"
}
},
aliases:{
":1":"1.0.29",
":1.0":"1.0.29"
}
},
":ext-core":{
versions:{
":3.1.0":{
uncompressed:"ext-core-debug.js",
compressed:"ext-core.js"
},
":3.0.0":{
uncompressed:"ext-core-debug.js",
compressed:"ext-core.js"
}
},
aliases:{
":3":"3.1.0",
":3.0":"3.0.0",
":3.1":"3.1.0"
}
},
":mootools":{
versions:{
":1.3.1":{
uncompressed:"mootools.js",
compressed:"mootools-yui-compressed.js"
},
":1.1.1":{
uncompressed:"mootools.js",
compressed:"mootools-yui-compressed.js"
},
":1.3.0":{
uncompressed:"mootools.js",
compressed:"mootools-yui-compressed.js"
},
":1.3.2":{
uncompressed:"mootools.js",
compressed:"mootools-yui-compressed.js"
},
":1.1.2":{
uncompressed:"mootools.js",
compressed:"mootools-yui-compressed.js"
},
":1.2.3":{
uncompressed:"mootools.js",
compressed:"mootools-yui-compressed.js"
},
":1.2.4":{
uncompressed:"mootools.js",
compressed:"mootools-yui-compressed.js"
},
":1.2.1":{
uncompressed:"mootools.js",
compressed:"mootools-yui-compressed.js"
},
":1.2.2":{
uncompressed:"mootools.js",
compressed:"mootools-yui-compressed.js"
},
":1.2.5":{
uncompressed:"mootools.js",
compressed:"mootools-yui-compressed.js"
},
":1.4.0":{
uncompressed:"mootools.js",
compressed:"mootools-yui-compressed.js"
},
":1.4.1":{
uncompressed:"mootools.js",
compressed:"mootools-yui-compressed.js"
},
":1.4.2":{
uncompressed:"mootools.js",
compressed:"mootools-yui-compressed.js"
}
},
aliases:{
":1":"1.1.2",
":1.11":"1.1.1",
":1.4":"1.4.2",
":1.3":"1.3.2",
":1.2":"1.2.5",
":1.1":"1.1.2"
}
},
":jqueryui":{
versions:{
":1.8.0":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.8.2":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.8.1":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.8.15":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.8.14":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.8.13":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.8.12":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.8.11":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.8.10":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.8.17":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.8.16":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.6.0":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.8.9":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.8.7":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.8.8":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.7.2":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.8.5":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.7.3":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.8.6":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.7.0":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.7.1":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.8.4":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.5.3":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
},
":1.5.2":{
uncompressed:"jquery-ui.js",
compressed:"jquery-ui.min.js"
}
},
aliases:{
":1.8":"1.8.17",
":1.7":"1.7.3",
":1.6":"1.6.0",
":1":"1.8.17",
":1.5":"1.5.3",
":1.8.3":"1.8.4"
}
},
":chrome-frame":{
versions:{
":1.0.2":{
uncompressed:"CFInstall.js",
compressed:"CFInstall.min.js"
},
":1.0.1":{
uncompressed:"CFInstall.js",
compressed:"CFInstall.min.js"
},
":1.0.0":{
uncompressed:"CFInstall.js",
compressed:"CFInstall.min.js"
}
},
aliases:{
":1":"1.0.2",
":1.0":"1.0.2"
}
},
":prototype":{
versions:{
":1.7.0.0":{
uncompressed:"prototype.js",
compressed:"prototype.js"
},
":1.6.0.2":{
uncompressed:"prototype.js",
compressed:"prototype.js"
},
":1.6.1.0":{
uncompressed:"prototype.js",
compressed:"prototype.js"
},
":1.6.0.3":{
uncompressed:"prototype.js",
compressed:"prototype.js"
}
},
aliases:{
":1.7":"1.7.0.0",
":1.6.1":"1.6.1.0",
":1":"1.7.0.0",
":1.6":"1.6.1.0",
":1.7.0":"1.7.0.0",
":1.6.0":"1.6.0.3"
}
},
":jquery":{
versions:{
":1.6.2":{
uncompressed:"jquery.js",
compressed:"jquery.min.js"
},
":1.3.1":{
uncompressed:"jquery.js",
compressed:"jquery.min.js"
},
":1.6.1":{
uncompressed:"jquery.js",
compressed:"jquery.min.js"
},
":1.3.0":{
uncompressed:"jquery.js",
compressed:"jquery.min.js"
},
":1.6.4":{
uncompressed:"jquery.js",
compressed:"jquery.min.js"
},
":1.6.3":{
uncompressed:"jquery.js",
compressed:"jquery.min.js"
},
":1.3.2":{
uncompressed:"jquery.js",
compressed:"jquery.min.js"
},
":1.6.0":{
uncompressed:"jquery.js",
compressed:"jquery.min.js"
},
":1.2.3":{
uncompressed:"jquery.js",
compressed:"jquery.min.js"
},
":1.7.0":{
uncompressed:"jquery.js",
compressed:"jquery.min.js"
},
":1.7.1":{
uncompressed:"jquery.js",
compressed:"jquery.min.js"
},
":1.2.6":{
uncompressed:"jquery.js",
compressed:"jquery.min.js"
},
":1.4.3":{
uncompressed:"jquery.js",
compressed:"jquery.min.js"
},
":1.4.4":{
uncompressed:"jquery.js",
compressed:"jquery.min.js"
},
":1.5.1":{
uncompressed:"jquery.js",
compressed:"jquery.min.js"
},
":1.5.0":{
uncompressed:"jquery.js",
compressed:"jquery.min.js"
},
":1.4.0":{
uncompressed:"jquery.js",
compressed:"jquery.min.js"
},
":1.5.2":{
uncompressed:"jquery.js",
compressed:"jquery.min.js"
},
":1.4.1":{
uncompressed:"jquery.js",
compressed:"jquery.min.js"
},
":1.4.2":{
uncompressed:"jquery.js",
compressed:"jquery.min.js"
}
},
aliases:{
":1.7":"1.7.1",
":1.6":"1.6.4",
":1":"1.7.1",
":1.5":"1.5.2",
":1.4":"1.4.4",
":1.3":"1.3.2",
":1.2":"1.2.6"
}
},
":dojo":{
versions:{
":1.3.1":{
uncompressed:"dojo/dojo.xd.js.uncompressed.js",
compressed:"dojo/dojo.xd.js"
},
":1.3.0":{
uncompressed:"dojo/dojo.xd.js.uncompressed.js",
compressed:"dojo/dojo.xd.js"
},
":1.6.1":{
uncompressed:"dojo/dojo.xd.js.uncompressed.js",
compressed:"dojo/dojo.xd.js"
},
":1.1.1":{
uncompressed:"dojo/dojo.xd.js.uncompressed.js",
compressed:"dojo/dojo.xd.js"
},
":1.3.2":{
uncompressed:"dojo/dojo.xd.js.uncompressed.js",
compressed:"dojo/dojo.xd.js"
},
":1.6.0":{
uncompressed:"dojo/dojo.xd.js.uncompressed.js",
compressed:"dojo/dojo.xd.js"
},
":1.2.3":{
uncompressed:"dojo/dojo.xd.js.uncompressed.js",
compressed:"dojo/dojo.xd.js"
},
":1.7.2":{
uncompressed:"dojo/dojo.js.uncompressed.js",
compressed:"dojo/dojo.js"
},
":1.7.0":{
uncompressed:"dojo/dojo.js.uncompressed.js",
compressed:"dojo/dojo.js"
},
":1.7.1":{
uncompressed:"dojo/dojo.js.uncompressed.js",
compressed:"dojo/dojo.js"
},
":1.4.3":{
uncompressed:"dojo/dojo.xd.js.uncompressed.js",
compressed:"dojo/dojo.xd.js"
},
":1.5.1":{
uncompressed:"dojo/dojo.xd.js.uncompressed.js",
compressed:"dojo/dojo.xd.js"
},
":1.5.0":{
uncompressed:"dojo/dojo.xd.js.uncompressed.js",
compressed:"dojo/dojo.xd.js"
},
":1.2.0":{
uncompressed:"dojo/dojo.xd.js.uncompressed.js",
compressed:"dojo/dojo.xd.js"
},
":1.4.0":{
uncompressed:"dojo/dojo.xd.js.uncompressed.js",
compressed:"dojo/dojo.xd.js"
},
":1.4.1":{
uncompressed:"dojo/dojo.xd.js.uncompressed.js",
compressed:"dojo/dojo.xd.js"
}
},
aliases:{
":1.7":"1.7.2",
":1":"1.6.1",
":1.6":"1.6.1",
":1.5":"1.5.1",
":1.4":"1.4.3",
":1.3":"1.3.2",
":1.2":"1.2.3",
":1.1":"1.1.1"
}
}
})), function() {
!function() {
function y(a, b) {
return a.format = b;
}
function ca(a, b) {
return a.type = b;
}
function Ic(a, b) {
for (var e, c = a[pa](M), d = b || S; e = c.shift(); ) {
if (d[e] == h) return h;
d = d[e];
}
return d;
}
function Jc(a) {
var b = typeof a;
if (b == gc) {
if (!a) return fc;
if (a instanceof p) return sb;
if (a instanceof Object) return b;
var c = Object[I][ma][J](a);
if (c == nb) return gc;
if (c == lb || typeof a[H] == P && "undefined" != typeof a.splice && "undefined" != typeof a[oa] && !a[oa](pc)) return sb;
if (c == mb || "undefined" != typeof a[J] && "undefined" != typeof a[oa] && !a[oa](yb)) return Jb;
} else if (b == Jb && "undefined" == typeof a[J]) return gc;
return b;
}
function Kc(a) {
var b = typeof a;
return (b == gc && a != h || b == Jb) && typeof a.getFullYear == Jb;
}
function Lc(a) {
return a[J][ua](a.bind, arguments);
}
function Mc(a, b) {
if (!a) throw s();
if (2 < arguments[H]) {
var d = p[I][ea][J](arguments, 2);
return function() {
var c = p[I][ea][J](arguments);
return p[I].unshift[ua](c, d), a[ua](b, c);
};
}
return function() {
return a[ua](b, arguments);
};
}
function Nc() {
return Nc = Function[I].bind && -1 != Function[I].bind[ma]()[F](bc) ? Lc :Mc, Nc[ua](h, arguments);
}
function Oc(a) {
var c = p[I][ea][J](arguments, 1);
return function() {
var b = p[I][ea][J](arguments);
return b.unshift[ua](b, c), a[ua](this, b);
};
}
function Pc(a) {
this.L = a || {};
a:{
for (var b = Qc() + Oa, a = k[ka](db), c = 0; c < a[H]; c++) if (a[c] && a[c].href && a[c].href == b) break a;
if (a = k.createElement(Xb), a.href = b, a.rel = sc, ca(a, uc), 0 == k[ka](Sb)[H]) {
var b = k[ka](Ub)[0], c = k[ka](vb)[0], d = k.createElement(Sb);
b.insertBefore(d, c);
}
k[ka](Sb)[0].appendChild(a);
}
}
function T(a, b, c) {
return a = c !== g ? a.toFixed(c) :v(a), c = a[F](M), -1 == c && (c = a[H]), b = m.max(0, b - c), 
p(b + 1)[K](N) + a;
}
function Rc(a, b) {
for (var c = 0, d = v(a)[C](/^[\s\xa0]+|[\s\xa0]+$/g, L)[pa](M), e = v(b)[C](/^[\s\xa0]+|[\s\xa0]+$/g, L)[pa](M), f = m.max(d[H], e[H]), n = 0; 0 == c && f > n; n++) {
var q = d[n] || L, B = e[n] || L, R = RegExp(Ga, Kb), Z = RegExp(Ga, Kb);
do {
var w = R.exec(q) || [ L, L, L ], t = Z.exec(B) || [ L, L, L ];
if (0 == w[0][H] && 0 == t[0][H]) break;
c = ((0 == w[1][H] ? 0 :u(w[1], 10)) < (0 == t[1][H] ? 0 :u(t[1], 10)) ? -1 :(0 == w[1][H] ? 0 :u(w[1], 10)) > (0 == t[1][H] ? 0 :u(t[1], 10)) ? 1 :0) || ((0 == w[2][H]) < (0 == t[2][H]) ? -1 :(0 == w[2][H]) > (0 == t[2][H]) ? 1 :0) || (w[2] < t[2] ? -1 :w[2] > t[2] ? 1 :0);
} while (0 == c);
}
return c;
}
function Vc(a) {
var b = {}, a = v(a), c = a[E](0) == za ? a :za + a;
if (Wc[da](c)) return b.k = Xc(c), ca(b, Tb), b;
a:{
var d = a.match(Yc);
if (d) {
var c = r(d[1]), e = r(d[2]), d = r(d[3]);
if (c >= 0 && 255 >= c && e >= 0 && 255 >= e && d >= 0 && 255 >= d) {
c = [ c, e, d ];
break a;
}
}
c = [];
}
if (c[H]) return b.k = Zc(c[0], c[1], c[2]), ca(b, kc), b;
if (Uc && (c = Uc[a[va]()])) return b.k = c, ca(b, ac), b;
throw s(a + " is not a valid color string");
}
function Xc(a) {
if (!Wc[da](a)) throw s(Da + a + "' is not a valid hex color");
return 4 == a[H] && (a = a[C]($c, Aa)), a[va]();
}
function ad(a) {
return a = Xc(a), [ u(a[la](1, 2), 16), u(a[la](3, 2), 16), u(a[la](5, 2), 16) ];
}
function Zc(a, b, c) {
if (a = r(a), b = r(b), c = r(c), ba(a) || 0 > a || a > 255 || ba(b) || 0 > b || b > 255 || ba(c) || 0 > c || c > 255) throw s('"(' + a + Ja + b + Ja + c + '") is not a valid RGB color');
return a = bd(a[ma](16)), b = bd(b[ma](16)), c = bd(c[ma](16)), za + a + b + c;
}
function bd(a) {
return 1 == a[H] ? N + a :a;
}
function gd() {
return S.navigator ? S.navigator.userAgent :h;
}
function wd(a) {
return vd[a] || (vd[a] = jd && !!k.documentMode && k.documentMode >= a);
}
function xd(a) {
return a == ec || a == L || a == yc ? ec :Vc(a).k;
}
function yd(a) {
if (a = a || {}, a.fill != h && this.Qa(a.fill), a.Q != h && this.Ra(a.Q), a.stroke != h && this.Ta(a.stroke), 
a.R != h && this.Ua(a.R), this.f = h, a.f) {
var d, b = a.f, c = {};
for (d in b) c[d] = b[d];
this.f = c, this.f.Oa = xd(this.f.Oa), this.f.Pa = xd(this.f.Pa);
}
this.c = h, a.pattern && this.Sa(a.pattern);
}
function zd(a) {
this.ga = a;
}
function Ad(a, b, c) {
a:{
for (var b = b[pa](M), a = a || S, d = 0; d < b[H]; d++) {
var e = b[d];
if (a[e] == h) {
b = h;
break a;
}
a = a[e];
}
b = a;
}
return b != h && Jc(c) == Jb ? c(b) :b;
}
function Bd(a) {
return a == h ? h :typeof a == wb ? a :(a = v(a), a == Qa || a[va]() == zc ? aa :a == N || a[va]() == Fb ? i :h);
}
function Cd(a) {
if (a == h) return h;
if (typeof a == P) return a;
var a = v(a), b = r(a), a = 0 == b && /^[\s\xa0]*$/[da](a) ? 0/0 :b;
return ba(a) ? h :a;
}
function Dd(a) {
return a = Cd(a), a != h && a >= 0 ? a :h;
}
function Ed(a) {
return a == h ? h :v(a);
}
function Fd(a, b) {
var c = Ed(a);
return c ? 0 <= Tc(b || [], c) ? c :xd(c) :h;
}
function Gd(a, b) {
var d, c = Ed(b);
a:{
for (d in a) if (a[d] == c) {
d = aa;
break a;
}
d = i;
}
return d ? c :h;
}
function Qc() {
var a = Ic(Ob);
a != h || (a = Vb);
var b = Ic(Pb);
return b != h || (b = Ra), a + Ma + b;
}
function Hd(a) {
this.L = a || {}, Id || (Id = Qc() + Na);
}
function V(a, b, c) {
b > 0 && c[z](Va, Id, a, La, b, ya);
}
function Kd(a, b) {
return a = (a || L)[va](), Jd[a] || b;
}
function Ld(a, b, c, d) {
Kc(a) && (a = a[ja]()), Kc(b) && (b = b[ja]()), Jc(a) == sb && (a = Md(a)), Jc(b) == sb && (b = Md(b)), 
this.X = a, this.ub = b, this.qb = c, this.vb = d;
}
function Nd(a, b, c, d, e) {
Ld[J](this, a, b, c, L), this.I = b - a, 0 >= this.I && (this.I = 1), this.jb = ad(Vc(d).k), 
this.kb = ad(Vc(e).k);
}
function Od() {}
function W() {
this.w = [];
}
function Md(a) {
return 36e5 * a[0] + 6e4 * a[1] + 1e3 * a[2] + (4 == a[H] ? a[3] :0);
}
function Pd() {}
function Qd(a) {
if (typeof a == P) {
var b = new Pd();
b.$ = a;
var c;
if (c = a, 0 == c) c = Ya; else {
var d = [ Ya, 0 > c ? Ka :Ia ];
c = m.abs(c), d[z](m[D](c / 60) % 100), c %= 60, 0 != c && d[z](Sa, T(c, 2)), c = d[K](L);
}
return b.ba = c, 0 == a ? a = jb :(c = [ jb, 0 > a ? Ia :Ka ], a = m.abs(a), c[z](m[D](a / 60) % 100), 
a %= 60, 0 != a && c[z](Sa, a), a = c[K](L)), b.J = [ a, a ], b.v = [], b;
}
return b = new Pd(), b.ba = a.id, b.$ = -a.std_offset, b.J = a.names, b.v = a.transitions, 
b;
}
function Rd(a) {
this.u = [], typeof a == P ? this.q(a) :this.d(a);
}
function X(a) {
a = new zd([ a || {}, {
formatType:oc,
valueType:Db
} ]), this.c = a.e(hc), this.H = h, this.Va = a.T(Gb, Td), this.Na = a.T(Bc, Ud), 
this.V = h, a = a.U(wc), a != h && (this.V = Qd(60 * -a));
}
function Vd() {
U.fa = g;
}
function Wd(a, b) {
switch (a) {
case Cb:
switch (b) {
case Ib:
return 0;

case Yb:
return 1;

case $b:
return 2;

case oc:
return 3;
}

case Db:
switch (b) {
case Ib:
return 8;

case Yb:
return 9;

case $b:
return 10;

case oc:
return 11;
}

case vc:
switch (b) {
case Ib:
return 4;

case Yb:
return 5;

case $b:
return 6;

case oc:
return 7;
}
}
}
function Xd(a, b) {
var c = [ N ], d = 7 & Yd[b][0];
if (d > 0) {
c[z](M);
for (var e = 0; d > e; e++) c[z](N);
}
return a[C](/0.00/g, c[K](L));
}
function $d(a, b, c) {
this.h = b || Y.ia, this.ha = c || 0, this.p = 40, this.b = 1, this.C = 3, this.o = this.i = 0, 
this.M = i, this.A = this.z = L, this.l = Ka, this.m = L, this.g = 1, this.B = 3, 
this.n = this.N = i, typeof a == P ? this.q(a) :this.d(a);
}
function $(a) {
if (a = new zd([ a || {}, {
decimalSymbol:ce,
groupingSymbol:de,
fractionDigits:2,
negativeParens:i,
prefix:L,
suffix:L,
scaleFactor:1
} ]), this.j = a.na(Hb), this.la = a.r(Eb), this.F = a.r(Qb), this.ja = a.r(ic), 
this.ka = a.r(tc), this.G = a.pa(cc), this.O = a.ma(dc), this.c = a.qa(hc), this.P = a.oa(nc), 
0 >= this.P) throw s("Scale factor must be a positive number.");
}
function fe(a) {
this.c = a || L;
}
function ge(a, b, c, d, e, f, n) {
return f > 0 && n[f - 1] == ob ? d :b.getFormattedValue(a, c[u(e, 10)]);
}
var Q, g = void 0, aa = !0, h = null, i = !1, j = google_exportSymbol, k = document, ba = isNaN, l = google_exportProperty, m = Math, p = Array, r = Number, s = Error, u = parseInt, v = String, z = "push", da = "test", A = "round", ea = "slice", C = "replace", D = "floor", E = "charAt", F = "indexOf", G = "format", fa = "fromCharCode", ga = "getColumnType", ha = "getHours", ia = "getValue", ja = "getTime", ka = "getElementsByTagName", la = "substr", ma = "toString", na = "getNumberOfRows", H = "length", oa = "propertyIsEnumerable", I = "prototype", pa = "split", qa = "setFormattedValue", J = "call", ra = "setProperty", ta = "substring", ua = "apply", K = "join", va = "toLowerCase", wa = "getTimezoneOffset", L = "", xa = " ", ya = '" />', za = "#", Aa = "#$1$1$2$2$3$3", Ba = "$1", Ca = "%", Da = "'", Ea = "''", Fa = "(", Ga = "(\\d*)(\\D*)", Ha = ")", Ia = "+", Ja = ",", Ka = "-", M = ".", La = '.png" height="12" width="', Ma = "/static/modules/gviz/", Na = "/util/bar_", Oa = "/util/format.css", N = "0", Pa = "0000000000000000", Qa = "1", Ra = "1.0", Sa = ":", Ta = ";", Ua = "</span>\xa0", Va = '<img style="padding: 0" src="', Wa = '<span style="padding: 0; float: left; white-space: nowrap;">', Xa = "E", Ya = "Etc/GMT", Za = "G", $a = "GMT", ab = "H", bb = "K", cb = "L", db = "LINK", fb = "M", gb = "Q", hb = "S", ib = "Too many percent/permill", jb = "UTC", kb = "Z", lb = "[object Array]", mb = "[object Function]", nb = "[object Window]", ob = "\\", pb = "_bar_format_old_value", qb = "a", rb = "addGradientRange", sb = "array", tb = "b", ub = "background-color:", vb = "body", wb = "boolean", xb = "c", yb = "call", zb = "className", Ab = "color:", Bb = "d", Cb = "date", Db = "datetime", Eb = "decimalSymbol", Fb = "false", O = "format", Gb = "formatType", Hb = "fractionDigits", Ib = "full", Jb = "function", Kb = "g", Lb = "google-visualization-formatters-arrow-dr", Mb = "google-visualization-formatters-arrow-empty", Nb = "google-visualization-formatters-arrow-ug", Ob = "google.loader.GoogleApisBase", Pb = "google.visualization.Version", Qb = "groupingSymbol", Rb = "h", Sb = "head", Tb = "hex", Ub = "html", Vb = "http://ajax.googleapis.com/ajax", Wb = "k", Xb = "link", Yb = "long", Zb = "m", $b = "medium", ac = "named", bc = "native code", cc = "negativeColor", dc = "negativeParens", ec = "none", fc = "null", P = "number", gc = "object", hc = "pattern", ic = "prefix", jc = "r", kc = "rgb", lc = "s", nc = "scaleFactor", oc = "short", pc = "splice", qc = "string", rc = "style", sc = "stylesheet", tc = "suffix", uc = "text/css", vc = "time", wc = "timeZone", xc = "timeofday", yc = "transparent", zc = "true", Ac = "v", Bc = "valueType", Cc = "w", Dc = "y", Ec = "z", Fc = "\xa0", Gc = "\xa4", Hc = "\u2030", S = this;
m[D](2147483648 * m.random())[ma](36), y(Pc[I], function(a, b) {
if (a[ga](b) == P) for (var c = this.L.base || 0, d = 0; d < a[na](); d++) {
var e = a[ia](d, b), f = h, f = c > e ? Lb :e > c ? Nb :Mb;
a[ra](d, b, zb, f);
}
});
var cd, dd, ed, fd, Sc = p[I], Tc = Sc[F] ? function(a, b, c) {
return Sc[F][J](a, b, c);
} :function(a, b, c) {
if (c = c == h ? 0 :0 > c ? m.max(0, a[H] + c) :c, typeof a == qc) return typeof b != qc || 1 != b[H] ? -1 :a[F](b, c);
for (;c < a[H]; c++) if (c in a && a[c] === b) return c;
return -1;
}, Uc = {
aliceblue:"#f0f8ff",
antiquewhite:"#faebd7",
aqua:"#00ffff",
aquamarine:"#7fffd4",
azure:"#f0ffff",
beige:"#f5f5dc",
bisque:"#ffe4c4",
black:"#000000",
blanchedalmond:"#ffebcd",
blue:"#0000ff",
blueviolet:"#8a2be2",
brown:"#a52a2a",
burlywood:"#deb887",
cadetblue:"#5f9ea0",
chartreuse:"#7fff00",
chocolate:"#d2691e",
coral:"#ff7f50",
cornflowerblue:"#6495ed",
cornsilk:"#fff8dc",
crimson:"#dc143c",
cyan:"#00ffff",
darkblue:"#00008b",
darkcyan:"#008b8b",
darkgoldenrod:"#b8860b",
darkgray:"#a9a9a9",
darkgreen:"#006400",
darkgrey:"#a9a9a9",
darkkhaki:"#bdb76b",
darkmagenta:"#8b008b",
darkolivegreen:"#556b2f",
darkorange:"#ff8c00",
darkorchid:"#9932cc",
darkred:"#8b0000",
darksalmon:"#e9967a",
darkseagreen:"#8fbc8f",
darkslateblue:"#483d8b",
darkslategray:"#2f4f4f",
darkslategrey:"#2f4f4f",
darkturquoise:"#00ced1",
darkviolet:"#9400d3",
deeppink:"#ff1493",
deepskyblue:"#00bfff",
dimgray:"#696969",
dimgrey:"#696969",
dodgerblue:"#1e90ff",
firebrick:"#b22222",
floralwhite:"#fffaf0",
forestgreen:"#228b22",
fuchsia:"#ff00ff",
gainsboro:"#dcdcdc",
ghostwhite:"#f8f8ff",
gold:"#ffd700",
goldenrod:"#daa520",
gray:"#808080",
green:"#008000",
greenyellow:"#adff2f",
grey:"#808080",
honeydew:"#f0fff0",
hotpink:"#ff69b4",
indianred:"#cd5c5c",
indigo:"#4b0082",
ivory:"#fffff0",
khaki:"#f0e68c",
lavender:"#e6e6fa",
lavenderblush:"#fff0f5",
lawngreen:"#7cfc00",
lemonchiffon:"#fffacd",
lightblue:"#add8e6",
lightcoral:"#f08080",
lightcyan:"#e0ffff",
lightgoldenrodyellow:"#fafad2",
lightgray:"#d3d3d3",
lightgreen:"#90ee90",
lightgrey:"#d3d3d3",
lightpink:"#ffb6c1",
lightsalmon:"#ffa07a",
lightseagreen:"#20b2aa",
lightskyblue:"#87cefa",
lightslategray:"#778899",
lightslategrey:"#778899",
lightsteelblue:"#b0c4de",
lightyellow:"#ffffe0",
lime:"#00ff00",
limegreen:"#32cd32",
linen:"#faf0e6",
magenta:"#ff00ff",
maroon:"#800000",
mediumaquamarine:"#66cdaa",
mediumblue:"#0000cd",
mediumorchid:"#ba55d3",
mediumpurple:"#9370d8",
mediumseagreen:"#3cb371",
mediumslateblue:"#7b68ee",
mediumspringgreen:"#00fa9a",
mediumturquoise:"#48d1cc",
mediumvioletred:"#c71585",
midnightblue:"#191970",
mintcream:"#f5fffa",
mistyrose:"#ffe4e1",
moccasin:"#ffe4b5",
navajowhite:"#ffdead",
navy:"#000080",
oldlace:"#fdf5e6",
olive:"#808000",
olivedrab:"#6b8e23",
orange:"#ffa500",
orangered:"#ff4500",
orchid:"#da70d6",
palegoldenrod:"#eee8aa",
palegreen:"#98fb98",
paleturquoise:"#afeeee",
palevioletred:"#d87093",
papayawhip:"#ffefd5",
peachpuff:"#ffdab9",
peru:"#cd853f",
pink:"#ffc0cb",
plum:"#dda0dd",
powderblue:"#b0e0e6",
purple:"#800080",
red:"#ff0000",
rosybrown:"#bc8f8f",
royalblue:"#4169e1",
saddlebrown:"#8b4513",
salmon:"#fa8072",
sandybrown:"#f4a460",
seagreen:"#2e8b57",
seashell:"#fff5ee",
sienna:"#a0522d",
silver:"#c0c0c0",
skyblue:"#87ceeb",
slateblue:"#6a5acd",
slategray:"#708090",
slategrey:"#708090",
snow:"#fffafa",
springgreen:"#00ff7f",
steelblue:"#4682b4",
tan:"#d2b48c",
teal:"#008080",
thistle:"#d8bfd8",
tomato:"#ff6347",
turquoise:"#40e0d0",
violet:"#ee82ee",
wheat:"#f5deb3",
white:"#ffffff",
whitesmoke:"#f5f5f5",
yellow:"#ffff00",
yellowgreen:"#9acd32"
}, $c = /#(.)(.)(.)/, Wc = /^#(?:[0-9a-f]{3}){1,2}$/i, Yc = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
fd = ed = dd = cd = i;
var hd;
if (hd = gd()) {
var id = S.navigator;
cd = 0 == hd[F]("Opera"), dd = !cd && -1 != hd[F]("MSIE"), ed = !cd && -1 != hd[F]("WebKit"), 
fd = !cd && !ed && "Gecko" == id.product;
}
var md, jd = dd, kd = fd, ld = ed;
a:{
var od, nd = L;
if (cd && S.opera) var pd = S.opera.version, nd = typeof pd == Jb ? pd() :pd; else if (kd ? od = /rv\:([^\);]+)(\)|;)/ :jd ? od = /MSIE\s+([^\);]+)(\)|;)/ :ld && (od = /WebKit\/(\S+)/), 
od) var qd = od.exec(gd()), nd = qd ? qd[1] :L;
if (jd) {
var rd, sd = S.document;
if (rd = sd ? sd.documentMode :g, rd > parseFloat(nd)) {
md = v(rd);
break a;
}
}
md = nd;
}
var td = md, ud = {}, vd = {};
!jd || wd(9), !kd && !jd || jd && wd(9) || kd && (ud["1.9.1"] || (ud["1.9.1"] = 0 <= Rc(td, "1.9.1"))), 
jd && (ud["9"] || (ud["9"] = 0 <= Rc(td, "9"))), Q = yd[I], Q.Qa = function(a) {
xd(a);
}, Q.Ra = function(a) {
m.min(m.max(a, 0), 1);
}, Q.Ta = function(a) {
xd(a);
}, Q.Ua = function(a) {
m.min(m.max(a, 0), 1);
}, Q.Sa = function(a) {
this.c = a;
}, new yd({
Q:0,
fill:"white",
R:0,
stroke:"white"
});
var U = {
xb:[ "BC", "AD" ],
wb:[ "Before Christ", "Anno Domini" ],
ab:[ "J", "F", fb, "A", fb, "J", "J", "A", hb, "O", "N", "D" ],
eb:[ "J", "F", fb, "A", fb, "J", "J", "A", hb, "O", "N", "D" ],
$a:"January February March April May June July August September October November December".split(" "),
cb:"January February March April May June July August September October November December".split(" "),
bb:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
gb:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
Bb:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
ib:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
Ab:"Sun Mon Tue Wed Thu Fri Sat".split(" "),
hb:"Sun Mon Tue Wed Thu Fri Sat".split(" "),
Ob:[ hb, fb, "T", "W", "T", "F", hb ],
fb:[ hb, fb, "T", "W", "T", "F", hb ],
zb:[ "Q1", "Q2", "Q3", "Q4" ],
yb:[ "1st quarter", "2nd quarter", "3rd quarter", "4th quarter" ],
Eb:[ "AM", "PM" ],
Y:[ "EEEE, MMMM d, y", "MMMM d, y", "MMM d, y", "M/d/yy" ],
Z:[ "h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a" ],
Jb:6,
Qb:[ 5, 6 ],
Kb:5
};
Q = zd[I], Q.e = function(a, b, c) {
for (var d = h, e = 0; e < this.ga[H]; e++) {
a:{
var d = this.ga[e], f = a, n = c;
if (typeof f == qc) d = Ad(d, f, n); else {
for (var q = 0; q < f[H]; ++q) {
var B = Ad(d, f[q], n);
if (B != h) {
d = B;
break a;
}
}
d = h;
}
}
if (d != h) return d;
}
return d = b, d !== g ? d :h;
}, Q.ma = function(a, b) {
var c = this.Fb(a);
return c != h ? c :(b !== g || (b = i), b);
}, Q.Fb = function(a) {
return this.e(a, h, Bd);
}, Q.oa = function(a, b) {
var c = this.U(a);
return c != h ? c :(b !== g || (b = 0), b);
}, Q.U = function(a) {
return this.e(a, h, Cd);
}, Q.na = function(a, b) {
var c = this.Gb(a);
return c != h ? c :(b !== g || (b = 0), b);
}, Q.Gb = function(a) {
return this.e(a, h, Dd);
}, Q.r = function(a, b) {
return b !== g || (b = L), this.e(a, b, Ed);
}, Q.qa = function(a) {
return this.e(a, h, Ed);
}, Q.pa = function(a) {
return this.e(a, h, Fd);
}, Q.T = function(a, b) {
return this.e(a, h, Nc(Gd, h, b));
};
var Id = h, Jd = {
red:jc,
blue:tb,
green:Kb
};
y(Hd[I], function(a, b) {
if (a[ga](b) == P) {
var c = this.L, d = c.min, e = c.max, f = h;
(d == h || e == h) && (f = a.getColumnRange(b), e == h && (e = f.max), d == h && (d = m.min(0, f.min))), 
d >= e && (f = f || a.getColumnRange(b), e = f.max, d = f.min), d == e && (0 == d ? e = 1 :d > 0 ? d = 0 :e = 0);
var f = e - d, n = c.base || 0, n = m.max(d, m.min(e, n)), q = c.width || 100, B = c.showValue;
B == h && (B = aa);
for (var R = m[A]((n - d) / f * q), Z = q - R, w = 0; w < a[na](); w++) {
var t = a[ia](w, b), x = [], t = m.max(d, m.min(e, t)), sa = m.ceil((t - d) / f * q);
x[z](Wa), V(lc, 1, x);
var mc = Kd(c.colorPositive, tb), ae = Kd(c.colorNegative, jc), eb = c.drawZeroLine ? 1 :0;
R > 0 ? n > t ? (V(Cc, sa, x), V(ae, R - sa, x), eb > 0 && V(Ec, eb, x), V(Cc, Z, x)) :(V(Cc, R, x), 
eb > 0 && V(Ec, eb, x), V(mc, sa - R, x), V(Cc, q - sa, x)) :(V(mc, sa, x), V(Cc, q - sa, x)), 
V(lc, 1, x), t = a.getProperty(w, b, pb), t == h && (t = a.getFormattedValue(w, b), 
a[ra](w, b, pb, t)), B && (x[z](Fc), x[z](t)), x[z](Ua), a[qa](w, b, x[K](L));
}
}
}), Ld[I].contains = function(a) {
var b = this.X, c = this.ub;
return a == h ? b == h && c == h :(Kc(a) ? a = a[ja]() :Jc(a) == sb && (a = Md(a)), 
(b == h || a >= b) && (c == h || c > a));
}, Ld[I].ca = function() {
return this.vb;
}, Od.prototype = Ld[I], Nd.Rb = Ld[I], Nd.prototype = new Od(), Nd[I].ca = function(a) {
var b;
b = this.jb;
var c = this.kb, a = 1 - (a - this.X) / this.I, a = m.min(m.max(a, 0), 1);
return b = [ m[A](a * b[0] + (1 - a) * c[0]), m[A](a * b[1] + (1 - a) * c[1]), m[A](a * b[2] + (1 - a) * c[2]) ], 
Zc(b[0], b[1], b[2]);
}, W[I].addRange = function(a, b, c, d) {
this.w[z](new Ld(a, b, c, d));
}, W[I].addGradientRange = function(a, b, c, d, e) {
this.w[z](new Nd(a, b, c, d, e));
}, y(W[I], function(a, b) {
var c = a[ga](b);
if (c == P || c == qc || c == Cb || c == Db || c == xc) for (c = 0; c < a[na](); c++) {
for (var d = a[ia](c, b), e = L, f = 0; f < this.w[H]; f++) {
var n = this.w[f];
if (n.contains(d)) {
f = n.qb, d = n.ca(d), f && (e += Ab + f + Ta), d && (e += ub + d + Ta);
break;
}
}
a[ra](c, b, rc, e);
}
}), Q = Pd[I], Q.ea = function(a) {
for (var a = Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate(), a.getUTCHours(), a.getUTCMinutes()) / 36e5, b = 0; b < this.v[H] && a >= this.v[b]; ) b += 2;
return 0 == b ? 0 :this.v[b - 1];
}, Q.rb = function(a) {
var a = this.K(a), b = [ $a ];
return b[z](0 >= a ? Ia :Ka), a = m.abs(a), b[z](T(m[D](a / 60) % 100, 2), Sa, T(a % 60, 2)), 
b[K](L);
}, Q.Cb = function(a) {
return this.J[this.da(a) ? 3 :1];
}, Q.K = function(a) {
return this.$ - this.ea(a);
}, Q.sb = function(a) {
var a = -this.K(a), b = [ 0 > a ? Ka :Ia ], a = m.abs(a);
return b[z](T(m[D](a / 60) % 100, 2), T(a % 60, 2)), b[K](L);
}, Q.Db = function(a) {
return this.J[this.da(a) ? 2 :0];
}, Q.da = function(a) {
return 0 < this.ea(a);
};
var Sd = [ /^\'(?:[^\']|\'\')*\'/, /^(?:G+|y+|M+|k+|S+|E+|a+|h+|K+|H+|c+|L+|Q+|d+|m+|s+|v+|z+|Z+)/, /^[^\'GyMkSEahKHcLQdmsvzZ]+/ ];
Q = Rd[I], Q.d = function(a) {
for (;a; ) for (var b = 0; b < Sd[H]; ++b) {
var c = a.match(Sd[b]);
if (c) {
c = c[0], a = a[ta](c[H]), 0 == b && (c == Ea ? c = Da :(c = c[ta](1, c[H] - 1), 
c = c[C](/\'\'/, Da))), this.u[z]({
text:c,
type:b
});
break;
}
}
}, y(Q, function(a, b) {
var c = b ? 6e4 * (a[wa]() - b.K(a)) :0, d = c ? new Date(a[ja]() + c) :a, e = d;
b && d[wa]() != a[wa]() && (e = new Date(a[ja]() + (c + (c > 0 ? -864e5 :864e5))));
for (var c = [], f = 0; f < this.u[H]; ++f) {
var n = this.u[f].text;
1 == this.u[f].type ? c[z](this.tb(n, a, d, e, b)) :c[z](n);
}
return c[K](L);
}), Q.q = function(a) {
if (4 > a) a = U.Y[a]; else if (8 > a) a = U.Z[a - 4]; else {
if (!(12 > a)) return this.q(10), void 0;
a = U.Y[a - 8] + xa + U.Z[a - 8];
}
this.d(a);
}, Q.a = function(a) {
if (U.fa === g) return a;
for (var b = [], c = 0; c < a[H]; c++) {
var d = a.charCodeAt(c);
b[z](d >= 48 && 57 >= d ? v[fa](U.fa + d - 48) :a[E](c));
}
return b[K](L);
}, Q.Ba = function(a, b) {
var c = 0 < b.getFullYear() ? 1 :0;
return a >= 4 ? U.wb[c] :U.xb[c];
}, Q.Ma = function(a, b) {
var c = b.getFullYear();
return 0 > c && (c = -c), this.a(2 == a ? T(c % 100, 2) :v(c));
}, Q.Ea = function(a, b) {
var c = b.getMonth();
switch (a) {
case 5:
return U.ab[c];

case 4:
return U.$a[c];

case 3:
return U.bb[c];

default:
return this.a(T(c + 1, a));
}
}, Q.xa = function(a, b) {
return this.a(T(b[ha]() || 24, a));
}, Q.Ca = function(a, b) {
return this.a((b[ja]() % 1e3 / 1e3).toFixed(m.min(3, a))[la](2) + (a > 3 ? T(0, a - 3) :L));
}, Q.Aa = function(a, b) {
var c = b.getDay();
return a >= 4 ? U.Bb[c] :U.Ab[c];
}, Q.ya = function(a, b) {
var c = b[ha]();
return U.Eb[c >= 12 && 24 > c ? 1 :0];
}, Q.wa = function(a, b) {
return this.a(T(b[ha]() % 12 || 12, a));
}, Q.ua = function(a, b) {
return this.a(T(b[ha]() % 12, a));
}, Q.va = function(a, b) {
return this.a(T(b[ha](), a));
}, Q.Ha = function(a, b) {
var c = b.getDay();
switch (a) {
case 5:
return U.fb[c];

case 4:
return U.ib[c];

case 3:
return U.hb[c];

default:
return this.a(T(c, 1));
}
}, Q.Ia = function(a, b) {
var c = b.getMonth();
switch (a) {
case 5:
return U.eb[c];

case 4:
return U.cb[c];

case 3:
return U.gb[c];

default:
return this.a(T(c + 1, a));
}
}, Q.Fa = function(a, b) {
var c = m[D](b.getMonth() / 3);
return 4 > a ? U.zb[c] :U.yb[c];
}, Q.za = function(a, b) {
return this.a(T(b.getDate(), a));
}, Q.Da = function(a, b) {
return this.a(T(b.getMinutes(), a));
}, Q.Ga = function(a, b) {
return this.a(T(b.getSeconds(), a));
}, Q.Ka = function(a, b, c) {
return c = c || Qd(b[wa]()), 4 > a ? c.sb(b) :this.a(c.rb(b));
}, Q.La = function(a, b, c) {
return c = c || Qd(b[wa]()), 4 > a ? c.Db(b) :c.Cb(b);
}, Q.Ja = function(a, b) {
return b = b || Qd(a[wa]()), b.ba;
}, Q.tb = function(a, b, c, d, e) {
var f = a[H];
switch (a[E](0)) {
case Za:
return this.Ba(f, c);

case Dc:
return this.Ma(f, c);

case fb:
return this.Ea(f, c);

case Wb:
return this.xa(f, d);

case hb:
return this.Ca(f, d);

case Xa:
return this.Aa(f, c);

case qb:
return this.ya(f, d);

case Rb:
return this.wa(f, d);

case bb:
return this.ua(f, d);

case ab:
return this.va(f, d);

case xb:
return this.Ha(f, c);

case cb:
return this.Ia(f, c);

case gb:
return this.Fa(f, c);

case Bb:
return this.za(f, c);

case Zb:
return this.Da(f, d);

case lc:
return this.Ga(f, d);

case Ac:
return this.Ja(b, e);

case Ec:
return this.La(f, b, e);

case kb:
return this.Ka(f, b, e);

default:
return L;
}
};
var Td = {
Lb:Ib,
Mb:Yb,
Nb:$b,
SHORT:oc
}, Ud = {
Hb:Cb,
Ib:Db,
Pb:vc
};
y(X[I], function(a, b) {
var c = a[ga](b);
if (c == Cb || c == Db) for (var c = this.aa(c), d = a[na](), e = 0; d > e; e++) {
var f = a[ia](e, b), f = this.s(c, f);
a[qa](e, b, f);
}
}), X[I].formatValue = function(a) {
return this.H || (this.H = this.aa(this.Na)), this.s(this.H, a);
}, X[I].aa = function(a) {
var b = this.c;
return b != h || (b = Wd(a, this.Va)), new Rd(b);
}, X[I].s = function(a, b) {
if (b === h) return L;
var c = this.V;
return c == h && (c = Qd(b[wa]())), a[G](b, c);
};
var Yd = {
AED:[ 2, "dh", "\u062f.\u0625.", "DH" ],
AUD:[ 2, "$", "AU$" ],
BDT:[ 2, "\u09f3", "Tk" ],
BRL:[ 2, "R$", "R$" ],
CAD:[ 2, "$", "C$" ],
CHF:[ 2, "CHF", "CHF" ],
CLP:[ 0, "$", "CL$" ],
CNY:[ 2, "\xa5", "RMB\xa5" ],
COP:[ 0, "$", "COL$" ],
CRC:[ 0, "\u20a1", "CR\u20a1" ],
CZK:[ 2, "K\u010d", "K\u010d" ],
DKK:[ 18, "kr", "kr" ],
DOP:[ 2, "$", "RD$" ],
EGP:[ 2, "\xa3", "LE" ],
EUR:[ 18, "\u20ac", "\u20ac" ],
GBP:[ 2, "\xa3", "GB\xa3" ],
HKD:[ 2, "$", "HK$" ],
ILS:[ 2, "\u20aa", "IL\u20aa" ],
INR:[ 2, "\u20b9", "Rs" ],
ISK:[ 0, "kr", "kr" ],
JMD:[ 2, "$", "JA$" ],
JPY:[ 0, "\xa5", "JP\xa5" ],
KRW:[ 0, "\u20a9", "KR\u20a9" ],
LKR:[ 2, "Rs", "SLRs" ],
MNT:[ 0, "\u20ae", "MN\u20ae" ],
MXN:[ 2, "$", "Mex$" ],
MYR:[ 2, "RM", "RM" ],
NOK:[ 18, "kr", "NOkr" ],
PAB:[ 2, "B/.", "B/." ],
PEN:[ 2, "S/.", "S/." ],
PHP:[ 2, "\u20b1", "Php" ],
PKR:[ 0, "Rs", "PKRs." ],
RUB:[ 2, "Rup", "Rup" ],
SAR:[ 2, "Rial", "Rial" ],
SEK:[ 2, "kr", "kr" ],
SGD:[ 2, "$", "S$" ],
THB:[ 2, "\u0e3f", "THB" ],
TRY:[ 2, "TL", "YTL" ],
TWD:[ 2, "NT$", "NT$" ],
USD:[ 2, "$", "US$" ],
UYU:[ 2, "$", "UY$" ],
VND:[ 0, "\u20ab", "VN\u20ab" ],
YER:[ 0, "Rial", "Rial" ],
ZAR:[ 2, "R", "ZAR" ]
}, Zd = {
DECIMAL_SEP:M,
GROUP_SEP:Ja,
nb:Ca,
S:N,
pb:Ia,
mb:Ka,
lb:Xa,
ob:Hc,
ra:"\u221e",
sa:"NaN",
DECIMAL_PATTERN:"#,##0.###",
Za:"#E0",
Ya:"#,##0%",
Xa:"\xa4#,##0.00;(\xa4#,##0.00)",
ia:"USD"
}, Y = Zd, Y = Zd, be = i;
Q = $d[I], Q.d = function(a) {
this.c = a[C](/ /g, Fc);
var b = [ 0 ];
this.z = this.t(a, b);
var c = b[0];
this.Wa(a, b), c = b[0] - c, this.A = this.t(a, b), b[0] < a[H] && a[E](b[0]) == Ta ? (b[0]++, 
this.l = this.t(a, b), b[0] += c, this.m = this.t(a, b)) :(this.l = this.z + this.l, 
this.m += this.A);
}, Q.q = function(a) {
switch (a) {
case 1:
this.d(Y.DECIMAL_PATTERN);
break;

case 2:
this.d(Y.Za);
break;

case 3:
this.d(Y.Ya);
break;

case 4:
this.d(Xd(Y.Xa, this.h));
break;

default:
throw s("Unsupported pattern type.");
}
}, y(Q, function(a) {
if (ba(a)) return Y.sa;
var b = [], c = 0 > a || 0 == a && 0 > 1 / a;
return b[z](c ? this.l :this.z), isFinite(a) ? (a = a * (c ? -1 :1) * this.g, this.n ? this.ta(a, b) :this.D(a, this.b, b)) :b[z](Y.ra), 
b[z](c ? this.m :this.A), b[K](L);
}), Q.D = function(a, b, c) {
var f, d = m.pow(10, this.C), e = m[A](a * d);
isFinite(e) ? (a = m[D](e / d), f = m[D](e - a * d)) :f = 0;
for (var n = 0 < this.i || f > 0, q = L, e = a; e > 1e20; ) q = N + q, e = m[A](e / 10);
var q = e + q, B = Y.DECIMAL_SEP, R = Y.GROUP_SEP, e = be ? 48 :Y.S.charCodeAt(0), Z = q[H];
if (a > 0 || b > 0) {
for (a = Z; b > a; a++) c[z](v[fa](e));
for (a = 0; Z > a; a++) c[z](v[fa](e + 1 * q[E](a))), Z - a > 1 && 0 < this.B && 1 == (Z - a) % this.B && c[z](R);
} else n || c[z](v[fa](e));
for ((this.N || n) && c[z](B), b = L + (f + d), d = b[H]; b[E](d - 1) == N && d > this.i + 1; ) d--;
for (a = 1; d > a; a++) c[z](v[fa](e + 1 * b[E](a)));
}, Q.W = function(a, b) {
b[z](Y.lb), 0 > a ? (a = -a, b[z](Y.mb)) :this.M && b[z](Y.pb);
for (var c = L + a, d = be ? N :Y.S, e = c[H]; e < this.o; e++) b[z](d);
b[z](c);
}, Q.ta = function(a, b) {
if (0 == a) this.D(a, this.b, b), this.W(0, b); else {
var c = m[D](m.log(a) / m.log(10)), a = a / m.pow(10, c), d = this.b;
if (1 < this.p && this.p > this.b) {
for (;0 != c % this.p; ) a *= 10, c--;
d = 1;
} else 1 > this.b ? (c++, a /= 10) :(c -= this.b - 1, a *= m.pow(10, this.b - 1));
this.D(a, d, b), this.W(c, b);
}
}, Q.t = function(a, b) {
for (var c = L, d = i, e = a[H]; b[0] < e; b[0]++) {
var f = a[E](b[0]);
if (f == Da) b[0] + 1 < e && a[E](b[0] + 1) == Da ? (b[0]++, c += Da) :d = !d; else if (d) c += f; else switch (f) {
case za:
case N:
case Ja:
case M:
case Ta:
return c;

case Gc:
if (b[0] + 1 < e && a[E](b[0] + 1) == Gc) b[0]++, c += this.h; else switch (this.ha) {
case 0:
c += Yd[this.h][1];
break;

case 2:
var f = this.h, n = Yd[f], c = c + (f == n[1] ? f :f + xa + n[1]);
break;

case 1:
c += Yd[this.h][2];
}
break;

case Ca:
if (1 != this.g) throw s(ib);
this.g = 100, c += Y.nb;
break;

case Hc:
if (1 != this.g) throw s(ib);
this.g = 1e3, c += Y.ob;
break;

default:
c += f;
}
}
return c;
}, Q.Wa = function(a, b) {
for (var c = -1, d = 0, e = 0, f = 0, n = -1, q = a[H], B = aa; b[0] < q && B; b[0]++) switch (a[E](b[0])) {
case za:
e > 0 ? f++ :d++, n >= 0 && 0 > c && n++;
break;

case N:
if (f > 0) throw s('Unexpected "0" in pattern "' + a + '"');
e++, n >= 0 && 0 > c && n++;
break;

case Ja:
n = 0;
break;

case M:
if (c >= 0) throw s('Multiple decimal separators in pattern "' + a + '"');
c = d + e + f;
break;

case Xa:
if (this.n) throw s('Multiple exponential symbols in pattern "' + a + '"');
for (this.n = aa, this.o = 0, b[0] + 1 < q && a[E](b[0] + 1) == Ia && (b[0]++, this.M = aa); b[0] + 1 < q && a[E](b[0] + 1) == N; ) b[0]++, 
this.o++;
if (1 > d + e || 1 > this.o) throw s('Malformed exponential pattern "' + a + '"');
B = i;
break;

default:
b[0]--, B = i;
}
if (0 == e && d > 0 && c >= 0 && (e = c, 0 == e && e++, f = d - e, d = e - 1, e = 1), 
0 > c && f > 0 || c >= 0 && (d > c || c > d + e) || 0 == n) throw s('Malformed pattern "' + a + '"');
f = d + e + f, this.C = c >= 0 ? f - c :0, c >= 0 && (this.i = d + e - c, 0 > this.i && (this.i = 0)), 
this.b = (c >= 0 ? c :f) - d, this.n && (this.p = d + this.b, 0 == this.C && 0 == this.b && (this.b = 1)), 
this.B = m.max(0, n), this.N = 0 == c || c == f;
};
var ce = Y.DECIMAL_SEP, de = Y.GROUP_SEP, ee = Y.DECIMAL_PATTERN;
y($[I], function(a, b) {
if (a[ga](b) == P) for (var c = 0; c < a[na](); c++) {
var d = a[ia](c, b);
if (d != h) {
var e = this.formatValue(d);
a[qa](c, b, e), !/^[\s\xa0]*$/[da](this.G == h ? L :v(this.G)) && 0 > d && a[ra](c, b, rc, Ab + this.G + Ta);
}
}
}), $[I].formatValue = function(a) {
var b = h, b = a / this.P;
return this.c === h ? (this.O && (b = m.abs(b)), b = this.s(b), b = this.ja + b + this.ka, 
this.O && 0 > a && (b = Fa + b + Ha)) :b = new $d(this.c)[G](b), b;
}, $[I].s = function(a) {
0 == this.j && (a = m[A](a));
var b = [];
0 > a && (a = -a, b[z](Ka));
var c = m.pow(10, this.j), d = m[A](a * c), a = v(m[D](d / c)), c = v(d % c);
if (3 < a[H] && this.F) for (d = a[H] % 3, d > 0 && (b[z](a[ta](0, d), this.F), 
a = a[ta](d)); 3 < a[H]; ) b[z](a[ta](0, 3), this.F), a = a[ta](3);
return b[z](a), 0 < this.j && (b[z](this.la), c[H] < this.j && (c = Pa + c), b[z](c[ta](c[H] - this.j))), 
b[K](L);
}, y(fe[I], function(a, b, c, d) {
var e = b[0];
for (c != h && Jc(c) == P && (e = c), c = d || h, d = 0; d < a[na](); d++) {
var f = this.c[C](/{(\d+)}/g, Oc(ge, d, a, b)), f = f[C](/\\(.)/g, Ba);
c ? a[ra](d, e, c, f) :a[qa](d, e, f);
}
}), j("google.visualization.NumberFormat", $), l($[I], O, $[I][G]), l($[I], "formatValue", $[I].formatValue), 
j("google.visualization.NumberFormat.useNativeCharactersIfAvailable", function(a) {
be = !a;
}), j("google.visualization.NumberFormat.DECIMAL_SEP", ce), j("google.visualization.NumberFormat.GROUP_SEP", de), 
j("google.visualization.NumberFormat.DECIMAL_PATTERN", ee), j("google.visualization.ColorFormat", W), 
l(W[I], O, W[I][G]), l(W[I], "addRange", W[I].addRange), l(W[I], rb, W[I].addGradientRange), 
j("google.visualization.BarFormat", Hd), l(Hd[I], O, Hd[I][G]), j("google.visualization.ArrowFormat", Pc), 
l(Pc[I], O, Pc[I][G]), j("google.visualization.PatternFormat", fe), l(fe[I], O, fe[I][G]), 
j("google.visualization.DateFormat", X), l(Vd, "dontLocalizeDigits", Vd), l(X[I], O, X[I][G]), 
l(X[I], "formatValue", X[I].formatValue), j("google.visualization.TableNumberFormat", $), 
l($[I], O, $[I][G]), j("google.visualization.TableColorFormat", W), l(W[I], O, W[I][G]), 
l(W[I], "addRange", W[I].addRange), l(W[I], rb, W[I].addGradientRange), j("google.visualization.TableBarFormat", Hd), 
l(Hd[I], O, Hd[I][G]), j("google.visualization.TableArrowFormat", Pc), l(Pc[I], O, Pc[I][G]), 
j("google.visualization.TablePatternFormat", fe), l(fe[I], O, fe[I][G]), j("google.visualization.TableDateFormat", X), 
l(X[I], O, X[I][G]);
}(), function() {
function d(a) {
throw a;
}
function pa(a, b) {
return a.width = b;
}
function qa(a, b) {
return a.innerHTML = b;
}
function ra(a, b) {
return a.currentTarget = b;
}
function sa(a, b) {
return a.left = b;
}
function ta(a, b) {
return a.screenX = b;
}
function va(a, b) {
return a.screenY = b;
}
function wa(a, b) {
return a.send = b;
}
function xa(a, b) {
return a.keyCode = b;
}
function ya(a, b) {
return a.handleEvent = b;
}
function za(a, b) {
return a.depth = b;
}
function Aa(a, b) {
return a.type = b;
}
function Ba(a, b) {
return a.setContent = b;
}
function Ca(a, b) {
return a.getValue = b;
}
function Da(a, b) {
return a.clientX = b;
}
function Ea(a, b) {
return a.clientY = b;
}
function Fa(a, b) {
return a.visibility = b;
}
function Ga(a, b) {
return a.setState = b;
}
function Ha(a, b) {
return a.altKey = b;
}
function Ia(a, b) {
return a.length = b;
}
function Ja(a, b) {
return a.setValue = b;
}
function La(a, b) {
return a.className = b;
}
function Ma(a, b) {
return a.next = b;
}
function Na(a, b) {
return a.visualization = b;
}
function Oa(a, b) {
return a.clone = b;
}
function Pa(a, b) {
return a.target = b;
}
function Qa(a, b) {
return a.bottom = b;
}
function Ra(a, b) {
return a.display = b;
}
function Sa(a, b) {
return a.height = b;
}
function Ta(a, b) {
return a.right = b;
}
function nn(a, b) {
for (var f, c = a[Kc](af), e = b || M; f = c.shift(); ) {
if (e[f] == k) return k;
e = e[f];
}
return e;
}
function on() {}
function pn(a) {
a.la = function() {
return a.rh ? a.rh :a.rh = new a();
};
}
function qn(a) {
var b = typeof a;
if (b == fl) {
if (!a) return cl;
if (a instanceof ia) return Dh;
if (a instanceof da) return b;
var c = da[F][tc][I](a);
if (c == jh) return fl;
if (c == hh || typeof a[D] == dl && "undefined" != typeof a[Jd] && "undefined" != typeof a[zc] && !a[zc](jm)) return Dh;
if (c == ih || "undefined" != typeof a[I] && "undefined" != typeof a[zc] && !a[zc](Yh)) return Xi;
} else if (b == Xi && "undefined" == typeof a[I]) return fl;
return b;
}
function rn(a) {
return a !== g;
}
function sn(a) {
return qn(a) == Dh;
}
function tn(a) {
var b = qn(a);
return b == Dh || b == fl && typeof a[D] == dl;
}
function un(a) {
return vn(a) && typeof a[jd] == Xi;
}
function O(a) {
return typeof a == nm;
}
function wn(a) {
return typeof a == Lh;
}
function xn(a) {
return typeof a == dl;
}
function yn(a) {
return qn(a) == Xi;
}
function vn(a) {
var b = typeof a;
return b == fl && a != k || b == Xi;
}
function zn(a) {
return a[An] || (a[An] = ++Bn);
}
function Cn(a) {
var b = qn(a);
if (b == fl || b == Dh) {
if (a[Zc]) return a[Zc]();
var c, b = b == Dh ? [] :{};
for (c in a) b[c] = Cn(a[c]);
return b;
}
return a;
}
function Dn(a) {
return a[I][yd](a[ec], arguments);
}
function En(a, b) {
if (a || d(r()), 2 < arguments[D]) {
var e = ia[F][cb][I](arguments, 2);
return function() {
var c = ia[F][cb][I](arguments);
return ia[F].unshift[yd](c, e), a[yd](b, c);
};
}
return function() {
return a[yd](b, arguments);
};
}
function Fn() {
return Fn = Function[F][ec] && -1 != Function[F][ec][tc]()[w](Yk) ? Dn :En, Fn[yd](k, arguments);
}
function Gn(a) {
var c = ia[F][cb][I](arguments, 1);
return function() {
var b = ia[F][cb][I](arguments);
return b.unshift[yd](b, c), a[yd](this, b);
};
}
function In(a) {
if (M[Md]) M[Md](a, vg); else if (M.eval) if (Jn == k && (M.eval(Wm), "undefined" != typeof M._et_ ? (delete M._et_, 
Jn = i) :Jn = l), Jn) M.eval(a); else {
var b = M[Ic], c = b[Jb](Pl);
Aa(c, ym), c.defer = l, c[Ua](b[mb](a)), b[Xc][Ua](c), b[Xc][Yc](c);
} else d(r("goog.globalEval not available"));
}
function P(a, b) {
function c() {}
c.prototype = b[F], a.b = b[F], a.prototype = new c(), a[F].constructor = a;
}
function Kn(a) {
var b;
if (0 == ga[mc](Xj)[D]) {
b = ga[mc](dk)[0];
var c = ga[mc](Kh)[0], e = ga[Jb](Xj);
b[rb](e, c);
}
b = ga[mc](Xj)[0], c = ga[Jb](Pl), Aa(c, ym), c.src = a, b[Ua](c);
}
function Ln(a) {
return function(b) {
google[G][Fd][fd](a);
var c = b[Hb]();
return c && google[G][Fd].addErrorFromQueryResponse(a, b), !c;
};
}
function Mn(a) {
if (a = ma(a), /^\s*$/[Za](a) ? 0 :/^[\],:{}\s\u2028\u2029]*$/[Za](a[v](/\\["\\\/bfnrtu]/g, Lf)[v](/"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, oh)[v](/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, K))) try {
return eval(re + a + ue);
} catch (b) {}
d(r("Invalid JSON string: " + a));
}
function Nn(a) {
this.Td = a;
}
function Qn(a) {
return a = Rn(a, Sn), new Nn(g).Vk(a);
}
function Tn(a) {
return Mn(a), Un(a);
}
function Un(a) {
return a = Vn(a), eval(re + a + ue);
}
function Rn(a, b) {
var a = b(a), c = qn(a);
if (c == fl || c == Dh) {
var e, c = c == Dh ? [] :{};
for (e in a) {
var f = Rn(a[e], b);
rn(f) && (c[e] = f);
}
} else c = a;
return c;
}
function Vn(a) {
return a[v](/"(Date\([\d,\s]*\))"/g, function(a, c) {
return Zk + c;
});
}
function Sn(a) {
return un(a) && (a = 0 !== a.getMilliseconds() ? [ a[jd](), a[vc](), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds() ] :0 !== a.getSeconds() || 0 !== a.getMinutes() || 0 !== a.getHours() ? [ a[jd](), a[vc](), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds() ] :[ a[jd](), a[vc](), a.getDate() ], 
a = dg + a[Kd](xe) + ue), a;
}
function Wn(a) {
return /^[\s\xa0]*$/[Za](a);
}
function Xn(a) {
return a[v](/[\t\r\n ]+/g, Sd)[v](/^[\t\r\n ]+|[\t\r\n ]+$/g, K);
}
function Yn(a) {
return a[v](/^[\s\xa0]+|[\s\xa0]+$/g, K);
}
function Zn(a, b) {
return b ? a[v]($n, ie)[v](ao, ke)[v](bo, je)[v](co, le) :eo[Za](a) ? (-1 != a[w](he) && (a = a[v]($n, ie)), 
-1 != a[w](Ef) && (a = a[v](ao, ke)), -1 != a[w](Jf) && (a = a[v](bo, je)), -1 != a[w](Yd) && (a = a[v](co, le)), 
a) :a;
}
function fo(a) {
return a == k ? K :ma(a);
}
function mo(a, b) {
return 0 <= ho(a, b);
}
function no(a, b) {
var e, c = ho(a, b);
return (e = c >= 0) && go[Jd][I](a, c, 1), e;
}
function oo() {
return go[jb][yd](go, arguments);
}
function po(a) {
var b = a[D];
if (b > 0) {
for (var c = ia(b), e = 0; b > e; e++) c[e] = a[e];
return c;
}
return [];
}
function qo(a) {
for (var c = 1; c < arguments[D]; c++) {
var f, e = arguments[c];
if (sn(e) || (f = tn(e)) && e[Uc](Zh)) a[t][yd](a, e); else if (f) for (var h = a[D], j = e[D], m = 0; j > m; m++) a[h + m] = e[m]; else a[t](e);
}
}
function ro(a) {
return go[Jd][yd](a, so(arguments, 1));
}
function so(a, b, c) {
return 2 >= arguments[D] ? go[cb][I](a, b) :go[cb][I](a, b, c);
}
function to(a, b) {
for (var c = 0; c < a[D]; c++) a[c] = {
index:c,
value:a[c]
};
var e = b || uo;
for (go.sort[I](a, function(a, b) {
return e(a[ob], b[ob]) || a.index - b.index;
} || uo), c = 0; c < a[D]; c++) a[c] = a[c][ob];
}
function uo(a, b) {
return a > b ? 1 :b > a ? -1 :0;
}
function vo(a, b) {
this.x = rn(a) ? a :0, this.y = rn(b) ? b :0;
}
function wo(a, b) {
return new vo(a.x - b.x, a.y - b.y);
}
function xo(a, b) {
pa(this, a), Sa(this, b);
}
function Do() {
return M.navigator ? M.navigator.userAgent :k;
}
function Eo() {
return M.navigator;
}
function Wo(a) {
var b;
if (!(b = Vo[a])) {
b = 0;
for (var c = Yn(ma(Uo))[Kc](af), e = Yn(ma(a))[Kc](af), f = q.max(c[D], e[D]), h = 0; 0 == b && f > h; h++) {
var j = c[h] || K, m = e[h] || K, s = oa(te, Yi), x = oa(te, Yi);
do {
var z = s.exec(j) || [ K, K, K ], E = x.exec(m) || [ K, K, K ];
if (0 == z[0][D] && 0 == E[0][D]) break;
b = ((0 == z[1][D] ? 0 :ka(z[1], 10)) < (0 == E[1][D] ? 0 :ka(E[1], 10)) ? -1 :(0 == z[1][D] ? 0 :ka(z[1], 10)) > (0 == E[1][D] ? 0 :ka(E[1], 10)) ? 1 :0) || ((0 == z[2][D]) < (0 == E[2][D]) ? -1 :(0 == z[2][D]) > (0 == E[2][D]) ? 1 :0) || (z[2] < E[2] ? -1 :z[2] > E[2] ? 1 :0);
} while (0 == b);
}
b = Vo[a] = b >= 0;
}
return b;
}
function Yo(a) {
return Xo[a] || (Xo[a] = Q && !!ga.documentMode && ga.documentMode >= a);
}
function $o(a) {
if (ap) {
ap = l;
var b = M[Qc];
if (b) {
var c = b[ud];
c && (c = bp($o(c)[3] || k)) && c != b.hostname && (ap = i, d(r()));
}
}
return a[Bb](Zo);
}
function bp(a) {
return a && na(a);
}
function lp(a) {
var b = bp($o(a)[3] || k), c = hp[Za](b), e = jp[Za](b), f = kp[Za](b), b = ip[Za](b), h = bp($o(a)[5] || k), j = oa(gp[fc] + ep[fc]), h = (a = oa(gp[fc] + dp[fc] + ep[fc])[Za](h)) || j[Za](h);
return b && a || (e || f || c) && h;
}
function mp(a) {
var e, b = [], c = 0;
for (e in a) b[c++] = a[e];
return b;
}
function np(a) {
var e, b = [], c = 0;
for (e in a) b[c++] = e;
return b;
}
function op(a, b) {
for (var c in a) if (a[c] == b) return i;
return l;
}
function pp(a, b) {
var c;
return (c = b in a) && delete a[b], c;
}
function qp(a) {
var c, b = {};
for (c in a) b[c] = a[c];
return b;
}
function sp(a) {
for (var c, e, f = 1; f < arguments[D]; f++) {
e = arguments[f];
for (c in e) a[c] = e[c];
for (var h = 0; h < rp[D]; h++) c = rp[h], da[F][Uc][I](e, c) && (a[c] = e[c]);
}
}
function wp(a) {
return a = a.className, O(a) && a[Bb](/\S+/g) || [];
}
function xp(a) {
for (var c = wp(a), e = so(arguments, 1), f = c[D] + e[D], h = c, j = 0; j < e[D]; j++) mo(h, e[j]) || h[t](e[j]);
return La(a, c[Kd](Sd)), c[D] == f;
}
function yp(a) {
var f, c = wp(a), e = so(arguments, 1), h = e;
return f = jo(c, function(a) {
return !mo(h, a);
}), La(a, f[Kd](Sd)), f[D] == c[D] - e[D];
}
function zp(a) {
return a ? new Ap(Bp(a)) :tp || (tp = new Ap());
}
function Cp(a) {
return O(a) ? ga[gb](a) :a;
}
function Dp(a, b) {
function c(b, c) {
c == pm ? a[H].cssText = b :c == ei ? La(a, b) :c == Vi ? a.htmlFor = b :c in Ep ? a[Ub](Ep[c], b) :0 == c[hd](Ch, 0) || 0 == c[hd](qi, 0) ? a[Ub](c, b) :a[c] = b;
}
for (var e in b) c[I](g, b[e], e, b);
}
function Fp(a) {
return a = a[Ic], a = Gp(a) ? a[pc] :a[Xc], new xo(a[Ec], a[nd]);
}
function Hp(a) {
return a ? a.parentWindow || a[cc] :ca;
}
function Ip() {
return Jp(ga, arguments);
}
function Jp(a, b) {
var c = b[0], e = b[1];
if (!up && e && (e[hc] || e[B])) {
if (c = [ Ef, c ], e[hc] && c[t](Wd, Zn(e[hc]), Yd), e[B]) {
c[t](Xd, Zn(e[B]), Yd);
var f = {};
sp(f, e), delete f[B], e = f;
}
c[t](Jf), c = c[Kd](K);
}
return c = a[Jb](c), e && (O(e) ? La(c, e) :sn(e) ? xp[yd](k, [ c ][jb](e)) :Dp(c, e)), 
2 < b[D] && Kp(a, c, b, 2), c;
}
function Kp(a, b, c, e) {
function f(c) {
c && b[Ua](O(c) ? a[mb](c) :c);
}
for (;e < c[D]; e++) {
var h = c[e];
if (tn(h) && !Lp(h)) {
var m, j = io;
a:{
if ((m = h) && typeof m[D] == dl) {
if (vn(m)) {
m = typeof m.item == Xi || typeof m.item == nm;
break a;
}
if (yn(m)) {
m = typeof m.item == Xi;
break a;
}
}
m = l;
}
j(m ? po(h) :h, f);
} else f(h);
}
}
function Gp(a) {
return a.compatMode == Xf;
}
function Mp(a) {
Kp(Bp(a), a, arguments, 1);
}
function Np(a) {
for (var b; b = a[Pb]; ) a[Yc](b);
}
function Op(a, b) {
b[Gd] && b[Gd][rb](a, b);
}
function Pp(a) {
return a && a[Gd] ? a[Gd][Yc](a) :k;
}
function Lp(a) {
return vn(a) && 0 < a[db];
}
function Qp(a, b) {
if (a.contains && 1 == b[db]) return a == b || a.contains(b);
if ("undefined" != typeof a.compareDocumentPosition) return a == b || Boolean(16 & a.compareDocumentPosition(b));
for (;b && a != b; ) b = b[Gd];
return b == a;
}
function Bp(a) {
return 9 == a[db] ? a :a.ownerDocument || a[Ic];
}
function Rp(a) {
if (nl in a) return a.outerHTML;
var b = Bp(a)[Jb](Di);
return b[Ua](a.cloneNode(i)), b.innerHTML;
}
function Up(a) {
var b = a.getAttributeNode(tm);
return b && b.specified ? (a = a.tabIndex, xn(a) && a >= 0 && 32768 > a) :l;
}
function Vp(a, b) {
b ? a.tabIndex = 0 :(a.tabIndex = -1, a.removeAttribute(sm));
}
function Wp(a) {
var b = [];
return Xp(a, b, l), b[Kd](K);
}
function Xp(a, b, c) {
if (!(a[xb] in Sp)) if (3 == a[db]) c ? b[t](ma(a.nodeValue)[v](/(\r\n|\r|\n)/g, K)) :b[t](a.nodeValue); else if (a[xb] in Tp) b[t](Tp[a[xb]]); else for (a = a[Pb]; a; ) Xp(a, b, c), 
a = a[jc];
}
function Ap(a) {
this.l = a || M[Ic] || ga;
}
function Zp() {}
function $p(a) {
if (typeof a.Ma == Xi) return a.Ma();
if (O(a)) return a[Kc](K);
if (tn(a)) {
for (var b = [], c = a[D], e = 0; c > e; e++) b[t](a[e]);
return b;
}
return mp(a);
}
function aq(a, b, c) {
if (typeof a[Rb] == Xi) a[Rb](b, c); else if (tn(a) || O(a)) io(a, b, c); else {
var e;
if (typeof a.Kb == Xi) e = a.Kb(); else if (typeof a.Ma != Xi) if (tn(a) || O(a)) {
e = [];
for (var f = a[D], h = 0; f > h; h++) e[t](h);
} else e = np(a); else e = g;
for (var f = $p(a), h = f[D], j = 0; h > j; j++) b[I](c, f[j], e && e[j], a);
}
}
function bq(a) {
this.na = {}, this.C = [];
var c = arguments[D];
if (c > 1) {
c % 2 && d(r("Uneven number of arguments"));
for (var e = 0; c > e; e += 2) this.set(arguments[e], arguments[e + 1]);
} else a && this.Qj(a);
}
function cq(a, b) {
return da[F][Uc][I](a, b);
}
function dq() {}
function fq(a) {
a && typeof a.U == Xi && a.U();
}
function eq() {
for (var b = 0, c = arguments[D]; c > b; ++b) {
var e = arguments[b];
tn(e) ? eq[yd](k, e) :fq(e);
}
}
function gq(a) {
return gq[Sd](a), a;
}
function kq(a, b) {
Aa(this, a), Pa(this, b), ra(this, this[ad]);
}
function lq(a) {
a[qb]();
}
function mq(a, b) {
a && this.Ib(a, b);
}
function oq() {}
function uq(a, b, c, e, f) {
if (b) {
if (sn(b)) {
for (var h = 0; h < b[D]; h++) uq(a, b[h], c, e, f);
return k;
}
var e = !!e, j = rq;
b in j || (j[b] = {
o:0,
ga:0
}), j = j[b], e in j || (j[e] = {
o:0,
ga:0
}, j.o++);
var s, j = j[e], m = zn(a);
if (j.ga++, j[m]) {
for (s = j[m], h = 0; h < s[D]; h++) if (j = s[h], j.$b == c && j.wd == f) {
if (j.Ab) break;
return s[h].key;
}
} else s = j[m] = [], j.o++;
var x = vq, z = iq ? function(a) {
return x[I](z.src, z.key, a);
} :function(a) {
return a = x[I](z.src, z.key, a), a ? void 0 :a;
}, h = z;
return h.src = a, j = new oq(), j.Ib(c, h, a, b, e, f), c = j.key, h.key = c, s[t](j), 
qq[c] = j, sq[m] || (sq[m] = []), sq[m][t](j), a.addEventListener ? (a == M || !a.Fg) && a.addEventListener(b, h, e) :a.attachEvent(b in tq ? tq[b] :tq[b] = gl + b, h), 
c;
}
d(r("Invalid event type"));
}
function wq(a, b, c, e, f) {
if (sn(b)) {
for (var h = 0; h < b[D]; h++) wq(a, b[h], c, e, f);
return k;
}
return a = uq(a, b, c, e, f), qq[a].lf = i, a;
}
function xq(a, b, c, e, f) {
if (sn(b)) {
for (var h = 0; h < b[D]; h++) xq(a, b[h], c, e, f);
return k;
}
if (e = !!e, a = yq(a, b, e), !a) return l;
for (h = 0; h < a[D]; h++) if (a[h].$b == c && a[h][vb] == e && a[h].wd == f) return zq(a[h].key);
return l;
}
function zq(a) {
if (!qq[a]) return l;
var b = qq[a];
if (b.Ab) return l;
var c = b.src, e = b[B], f = b.Kg, h = b[vb];
return c.removeEventListener ? (c == M || !c.Fg) && c.removeEventListener(e, f, h) :c.detachEvent && c.detachEvent(e in tq ? tq[e] :tq[e] = gl + e, f), 
c = zn(c), sq[c] && (f = sq[c], no(f, b), 0 == f[D] && delete sq[c]), b.Ab = i, 
(b = rq[e][h][c]) && (b.Tg = i, Aq(e, h, c, b)), delete qq[a], i;
}
function Aq(a, b, c, e) {
if (!e.Id && e.Tg) {
for (var f = 0, h = 0; f < e[D]; f++) e[f].Ab ? e[f].Kg.src = k :(f != h && (e[h] = e[f]), 
h++);
Ia(e, h), e.Tg = l, 0 == h && (delete rq[a][b][c], rq[a][b].o--, 0 == rq[a][b].o && (delete rq[a][b], 
rq[a].o--), 0 == rq[a].o && delete rq[a]);
}
}
function Bq(a, b, c) {
var e = 0, f = b == k, h = c == k, c = !!c;
if (a == k) {
var j, a = function(a) {
for (var j = a[D] - 1; j >= 0; j--) {
var m = a[j];
!f && b != m[B] || !h && c != m[vb] || (zq(m.key), e++);
}
};
for (j in sq) a[I](g, sq[j], j, sq);
} else if (j = zn(a), sq[j]) for (j = sq[j], a = j[D] - 1; a >= 0; a--) {
var m = j[a];
!f && b != m[B] || !h && c != m[vb] || (zq(m.key), e++);
}
return e;
}
function yq(a, b, c) {
var e = rq;
return b in e && (e = e[b], c in e && (e = e[c], a = zn(a), e[a])) ? e[a] :k;
}
function Cq(a, b, c, e, f) {
var h = 1, b = zn(b);
if (a[b]) {
a.ga--, a = a[b], a.Id ? a.Id++ :a.Id = 1;
try {
for (var j = a[D], m = 0; j > m; m++) {
var s = a[m];
s && !s.Ab && (h &= Dq(s, f) !== l);
}
} finally {
a.Id--, Aq(c, e, b, a);
}
}
return Boolean(h);
}
function Dq(a, b) {
return a.lf && zq(a.key), a[Xb](b);
}
function Eq(a, b) {
var c = b[B] || b, e = rq;
if (!(c in e)) return i;
if (O(b)) b = new kq(b, a); else if (b instanceof kq) Pa(b, b[ad] || a); else {
var f = b, b = new kq(c, a);
sp(b, f);
}
var h, j, f = 1, e = e[c], c = i in e;
if (c) {
for (h = [], j = a; j; j = j.hd) h[t](j);
j = e[i], j.ga = j.o;
for (var m = h[D] - 1; !b.Jb && m >= 0 && j.ga; m--) ra(b, h[m]), f &= Cq(j, h[m], b[B], i, b) && b.Jd != l;
}
if (l in e) if (j = e[l], j.ga = j.o, c) for (m = 0; !b.Jb && m < h[D] && j.ga; m++) ra(b, h[m]), 
f &= Cq(j, h[m], b[B], l, b) && b.Jd != l; else for (e = a; !b.Jb && e && j.ga; e = e.hd) ra(b, e), 
f &= Cq(j, e, b[B], l, b) && b.Jd != l;
return Boolean(f);
}
function vq(a, b) {
if (!qq[a]) return i;
var c = qq[a], e = c[B], f = rq;
if (!(e in f)) return i;
var h, j, f = f[e];
if (!iq) {
h = b || nn(bn);
var m = i in f, s = l in f;
if (m) {
if (0 > h[Nb] || h.returnValue != g) return i;
a:{
var x = l;
if (0 == h[Nb]) try {
xa(h, -1);
break a;
} catch (z) {
x = i;
}
(x || h.returnValue == g) && (h.returnValue = i);
}
}
x = new mq(), x.Ib(h, this), h = i;
try {
if (m) {
for (var E = [], ea = x.currentTarget; ea; ea = ea[Gd]) E[t](ea);
j = f[i], j.ga = j.o;
for (var ba = E[D] - 1; !x.Jb && ba >= 0 && j.ga; ba--) ra(x, E[ba]), h &= Cq(j, E[ba], e, i, x);
if (s) for (j = f[l], j.ga = j.o, ba = 0; !x.Jb && ba < E[D] && j.ga; ba++) ra(x, E[ba]), 
h &= Cq(j, E[ba], e, l, x);
} else h = Dq(c, x);
} finally {
E && Ia(E, 0);
}
return h;
}
return e = new mq(b, this), h = Dq(c, e);
}
function Fq() {}
function Gq(a, b) {
this.Kd = a || 1, this.Bc = b || Hq, this.af = Fn(this.bk, this), this.bf = Hn();
}
function Iq() {}
function Kq() {}
function Lq(a) {
this.headers = new bq(), this.xd = a || k;
}
function Oq(a) {
a.U(), no(Nq, a);
}
function Pq(a, b) {
var c;
a instanceof Pq ? (this.ca = rn(b) ? b :a.ca, this.pd(a.Ya), this.Ae(a.Ac), this.ye(a.yc), 
this.od(a.vb), this.nd(a.Xa), this.ud(a.fa[Zc]()), this.ze(a.zc)) :a && (c = $o(ma(a))) ? (this.ca = !!b, 
this.pd(c[1] || K, i), this.Ae(c[2] || K, i), this.ye(c[3] || K, i), this.od(c[4]), 
this.nd(c[5] || K, i), this.ud(c[6] || K, i), this.ze(c[7] || K, i)) :(this.ca = !!b, 
this.fa = new Qq(k, k, this.ca));
}
function Rq(a, b) {
return O(a) ? encodeURI(a)[v](b, Xq) :k;
}
function Xq(a) {
return a = a[pd](0), ee + (a >> 4 & 15)[tc](16) + (15 & a)[tc](16);
}
function Qq(a, b, c) {
this.ab = a || k, this.ca = !!c;
}
function Yq(a) {
var b = {};
if (qn(a) != fl || un(a)) b.v = a != k ? a :k, b.f = k; else {
b.v = "undefined" == typeof a.v ? k :a.v;
var c = typeof a.f;
"undefined" == c || c == cl ? b.f = k :c == nm ? b.f = a.f :d(r("Formatted value ('f'), if specified, must be a string.")), 
c = typeof a.p, c == fl ? b.p = a.p :c != cl && "undefined" != c && d(r("Properties ('p'), if specified, must be an Object."));
}
return {
v:b.v,
f:b.f,
p:b.p
};
}
function Zq(a, b, c) {
!(typeof b == fl && hi in b || !d(r(c + ' must have a property "column"'))), vi in b && typeof b.desc != Lh && d(r('Property "desc" in ' + c + " must be boolean.")), 
R(a, b.column);
}
function $q(a, b) {
if (typeof b == dl) return R(a, b), [ {
column:b
} ];
if (typeof b == fl) {
if (tn(b)) {
1 > b[D] && d(r("sortColumns is an empty array. Must have at least one element."));
var c = {};
if (typeof b[0] == fl) {
for (var e = 0; e < b[D]; e++) {
Zq(a, b[e], hm + e + oh);
var f = b[e].column;
f in c && d(r(Zf + f + Vd)), c[f] = i;
}
return b;
}
if (typeof b[0] == dl) {
for (var h = [], e = 0; e < b[D]; e++) R(a, b[e]), b[e] in c && d(r(Zf + f + Vd)), 
c[f] = i, h[t]({
column:b[e]
});
return h;
}
d(r("sortColumns is an array, but neither of objects nor of numbers. Must be either of those."));
}
return Zq(a, b, gm), [ b ];
}
}
function ar(a, b) {
var c = a[yc]();
c > 0 ? (q[fb](b) !== b || 0 > b || b >= c) && d(r("Invalid row index " + b + ". Should be in the range [0-" + (c - 1) + "].")) :d(r("Table has no rows."));
}
function R(a, b) {
var c = a[nb]();
c > 0 ? (q[fb](b) !== b || 0 > b || b >= c) && d(r("Invalid column index " + b + ". Should be an integer in the range [0-" + (c - 1) + "].")) :d(r("Table has no columns."));
}
function br(a, b, c) {
a = a[Ob](b), cr(c, a) || d(r(ch + c + Ud + a + " in column index " + b));
}
function cr(a, b) {
if (a == k) return i;
var c = typeof a;
switch (b) {
case dl:
if (c == dl) return i;
break;

case nm:
if (c == nm) return i;
break;

case Lh:
if (c == Lh) return i;
break;

case ri:
case si:
if (un(a)) return i;
break;

case Bm:
if (tn(a) && 2 < a[D] && 5 > a[D]) {
for (var c = i, e = 0; e < a[D]; e++) {
var f = a[e];
if (typeof f != dl || f != q[fb](f)) {
c = l;
break;
}
}
if ((0 > a[0] || 23 < a[0] || 0 > a[1] || 59 < a[1] || 0 > a[2] || 59 < a[2]) && (c = l), 
4 == a[D] && (0 > a[3] || 999 < a[3]) && (c = l), c) return i;
}
}
return l;
}
function dr(a, b, c) {
if (b == k) return c == k ? 0 :-1;
if (c == k) return 1;
switch (a) {
case Lh:
case dl:
case nm:
case ri:
case si:
return c > b ? -1 :b > c ? 1 :0;

case Bm:
for (a = 0; 3 > a; a++) {
if (b[a] < c[a]) return -1;
if (c[a] < b[a]) return 1;
}
return b = 4 > b[D] ? 0 :b[3], c = 4 > c[D] ? 0 :c[3], c > b ? -1 :b > c ? 1 :0;
}
}
function er(a, b) {
R(a, b);
var h, j, c = a[Ob](b), e = k, f = k, m = a[yc]();
for (h = 0; m > h; h++) if (j = a[C](h, b), j != k) {
f = e = j;
break;
}
if (e == k) return {
min:k,
max:k
};
for (h++; m > h; h++) j = a[C](h, b), j != k && (0 > dr(c, j, e) ? e = j :0 > dr(c, f, j) && (f = j));
return {
min:e,
max:f
};
}
function fr(a, b) {
for (var b = $q(a, b), c = [], e = a[yc](), f = 0; e > f; f++) c[t](f);
return to(c, function(c, e) {
for (var f = 0; f < b[D]; f++) {
var s = b[f], x = s.column, x = dr(a[Ob](x), a[C](c, x), a[C](e, x));
if (0 != x) return x * (s.desc ? -1 :1);
}
return 0;
}), c;
}
function gr(a, b) {
R(a, b);
var c = a[yc]();
if (0 == c) return [];
for (var e = [], f = 0; c > f; ++f) e[t](a[C](f, b));
var h = a[Ob](b);
to(e, function(a, b) {
return dr(h, a, b);
});
var c = e[0], j = [];
for (j[t](c), f = 1; f < e[D]; f++) {
var m = e[f];
0 != dr(h, m, c) && j[t](m), c = m;
}
return j;
}
function hr(a, b) {
(!tn(b) || 0 == b[D]) && d(r("columnFilters must be a non-empty array"));
for (var c = {}, e = 0; e < b[D]; e++) {
typeof b[e] == fl && hi in b[e] || (Um in b[e] || Ok in b[e] || Jk in b[e] ? Um in b[e] && (Ok in b[e] || Jk in b[e]) && d(r(ii + e + '] must specify either "value" or range properties ("minValue" and/or "maxValue"')) :d(r(ii + e + '] must have properties "column" and "value", "minValue"or "maxValue"')));
var f = b[e].column;
f in c && d(r(Zf + f + " is duplicate in columnFilters.")), R(a, f), br(a, f, b[e][ob]), 
c[f] = i;
}
for (c = [], e = a[yc](), f = 0; e > f; f++) {
var h;
a:{
h = a;
for (var j = b, m = f, s = 0; s < j[D]; s++) {
var x = j[s], z = x.column, E = h[C](m, z), z = h[Ob](z);
if (x.minValue != k || x.maxValue != k) {
if (E == k || x.minValue != k && 0 > dr(z, E, x.minValue) || x.maxValue != k && 0 < dr(z, E, x.maxValue)) {
h = l;
break a;
}
} else if (0 != dr(z, E, x[ob])) {
h = l;
break a;
}
}
h = i;
}
h && c[t](f);
}
return c;
}
function ir(a, b) {
var c;
return b == Bm ? (c = [], c[t](a[0]), c[t]((10 > a[1] ? nf :K) + a[1]), c[t]((10 > a[2] ? nf :K) + a[2]), 
c = c[Kd](Af), 3 < a[D] && 0 < a[3] && (c += af + (10 > a[3] ? qf :100 > a[3] ? nf :K) + a[3])) :b == ri ? (c = new google[G].DateFormat({
formatType:Kk,
valueType:ri
}), c = c.formatValue(a)) :b == si ? (c = new google[G].DateFormat({
formatType:Kk,
valueType:si
}), c = c.formatValue(a)) :c = a != k ? ma(a) :K, c;
}
function jr(a, b, c, e) {
for (var f = k, h = a[yc](); (e ? b >= 0 :h > b) && f === k; ) f = a[C](b, c), b += e ? -1 :1;
return f;
}
function S(a, b) {
if (this.yb = b ? b == of ? of :pf :pf, a) {
if (O(a)) a = Tn(a); else a:for (var c = a.cols || [], e = a[xd] || [], f = c[D], h = 0; f > h; h++) {
var j = c[h][B];
if (j == ri || j == si) for (var j = e[D], m = 0; j > m; m++) {
var s = e[m].c[h];
if (s) {
var x = s.v;
if (un(x)) break a;
O(x) && (s = Qn(s), s = Tn(s), e[m].c[h] = s);
}
}
}
this.z = a.cols || [], this.D = a[xd] || [], this.Na = a.p || k;
} else this.z = [], this.D = [], this.Na = k;
this.za = [];
}
function lr(a) {
var b = a.version || pf;
this.nj = op(mr, b) ? b :pf, this.Ve = a.status, this.fb = [], this.gb = [], this.gb = a.warnings || [], 
this.fb = a[Fd] || [], nr(this.gb), nr(this.fb), this.Ve != Ni && (this.Mg = a.sig, 
this.g = new S(a.table, this.nj));
}
function nr(a) {
for (var b = 0; b < a[D]; b++) {
var c = a[b].detailed_message;
c && (a[b].detailed_message = c ? c[Bb](or) && !c[Bb](pr) ? c :c[v](/&/g, ie)[v](/</g, ke)[v](/>/g, je)[v](/\"/g, le) :K);
}
}
function qr(a, b) {
var c = b || {};
this.cf = c.sendMethod || Eh, op(rr, this.cf) || d(r("Send method not supported: " + this.cf)), 
this.Lg = c.makeRequestParams_ || {}, lp(a) && (a = this.fk(a));
var e = a, c = lp(e), e = bp($o(e)[5] || k), e = fp[Za](e);
this.Hj = c && e, this.Gj = a, this.Ig = sr++, tr[t](this);
}
function xr() {
for (var a = 0; a < tr[D]; a++) {
var b = tr[a];
b.jf && b.ic();
}
}
function yr(a, b) {
var c = a[w](ce);
-1 != c && (a = a[vd](0, c));
var e = a[w](Kf), f = c = K, h = [];
for (-1 == e ? c = a :(c = a[vd](0, e), f = a[vd](e + 1), h = f[Kc](he)), e = [], 
f = 0; f < h[D]; f++) {
var j = {};
j.name = h[f][Kc](If)[0], j.Af = h[f], e[t](j);
}
for (var m in b) {
for (h = b[m], j = l, f = 0; f < e[D]; f++) if (e[f][hc] == m) {
e[f].Af = m + If + aa(h), j = i;
break;
}
j || (f = {}, f.name = m, f.Af = m + If + aa(h), e[t](f));
}
if (m = c, 0 < e[D]) {
for (m += Kf, c = [], f = 0; f < e[D]; f++) c[t](e[f].Af);
m += c[Kd](he);
}
return m;
}
function zr(a) {
a[ad].Ng() ? (a = Yn(a[ad].xk()), a[Bb](/^({.*})$/) ? (a = Un(a), Ar(a)) :In(Vn(a))) :d(r("google.visualization.Query: " + a[ad].wk()));
}
function Ar(a) {
var b = a.reqId, c = vr[b];
c ? (vr[b] = k, c.kc(a)) :d(r("Missing query for request id: " + b));
}
function Br() {
var a;
Cr || (Cr = i, M.IDIModule && M.IDIModule.registerListener(xr, {
pollingInterval:100
}), M.gadgets && (Dr(bf), this.yh())), a = ga, a = a.querySelectorAll && a.querySelector ? a.querySelectorAll(Qf) :a[mc](Qf), 
this.Ik = Ln(a[0]);
}
function Er() {
return !!M.gadgets && !!M.gadgets.rpc;
}
function Dr(a) {
if (Er()) {
var b = M.gadgets;
try {
b.rpc.getRelayUrl(a) || b.rpc.setRelayUrl(a, ik);
} catch (c) {
yn(b.rpc.setRelayUrl) && b.rpc.setRelayUrl(a, ik);
}
}
}
function Fr(a) {
var b = a.__eventTarget;
return b == k && (b = new Fq(), a.__eventTarget = b), a = b;
}
function Gr(a) {
this.Sk = a;
}
function Hr(a, b) {
kq[I](this, a), this.Uk = b;
}
function Ir(a, b, c, e) {
this.Ea = a, this.Eg = b, this.Za = c || {}, this.vc = e, this.Hc = k, e && (this.Hc = this.ff = Ln(e)), 
!(b && Hi in b && typeof b[id] == Xi || !d(r("Visualization must have a draw method.")));
}
function T(a) {
this.g = a;
for (var b = [], a = a[nb](), c = 0; a > c; c++) b[t](c);
this.t = b, this.Ja = i, this.Ia = k, this.Je = [], this.Ie = i;
}
function Kr(a, b) {
this.sd = b, this.gk = a;
}
function Mr(a) {
var b = {}, a = ma(a), c = a[lb](0) == ce ? a :ce + a;
if (Nr[Za](c)) return a = c, Nr[Za](a) || d(r("'" + a + "' is not a valid hex color")), 
4 == a[D] && (a = a[v](Or, de)), b.zf = a[Nd](), Aa(b, Yj), b;
a:{
var e = a[Bb](Pr);
if (e) {
var c = ja(e[1]), f = ja(e[2]), e = ja(e[3]);
if (c >= 0 && 255 >= c && f >= 0 && 255 >= f && e >= 0 && 255 >= e) {
c = [ c, f, e ];
break a;
}
}
c = [];
}
return c[D] ? (f = c[0], a = c[1], c = c[2], f = ja(f), a = ja(a), c = ja(c), (ha(f) || 0 > f || f > 255 || ha(a) || 0 > a || a > 255 || ha(c) || 0 > c || c > 255) && d(r('"(' + f + we + a + we + c + '") is not a valid RGB color')), 
f = Qr(f[tc](16)), a = Qr(a[tc](16)), c = Qr(c[tc](16)), b.zf = ce + f + a + c, 
Aa(b, Ll), b) :Lr && (c = Lr[a[Nd]()]) ? (b.zf = c, Aa(b, Xk), b) :(d(r(a + " is not a valid color string")), 
void 0);
}
function Qr(a) {
return 1 == a[D] ? nf + a :a;
}
function Rr(a) {
return a == al || a == K || a == Lm ? al :Mr(a).zf;
}
function Sr(a, b, c, e) {
this.top = a, Ta(this, b), Qa(this, c), sa(this, e);
}
function Tr(a) {
a = a || {}, this.xg = al, a.fill != k && this.gj(a.fill), this.wg = 1, a.Re != k && this.hj(a.Re), 
this.vg = al, a.stroke != k && this.jj(a.stroke), this.Dg = 1, a.Cg != k && this.Jg(a.Cg), 
this.Bg = 1, a.Se != k && this.lj(a.Se), this.Ag = fm, a.zg != k && this.kj(a.zg), 
this.ya = k, a.ya && (this.ya = qp(a.ya), this.ya.ej = Rr(this.ya.ej), this.ya.fj = Rr(this.ya.fj)), 
this.yg = k, a.pattern && this.ij(a.pattern);
}
function Ur(a) {
if (un(a)) {
var b = new Date();
return b.setTime(a.valueOf()), b;
}
var c = qn(a);
if (c == fl || c == Dh) {
if (a[Zc]) return a[Zc]();
c = c == Dh ? [] :{};
for (b in a) c[b] = Ur(a[b]);
return c;
}
return a;
}
function Vr(a, b, c, e) {
sa(this, a), this.top = b, pa(this, c), Sa(this, e);
}
function Wr(a, b) {
var c = Bp(a);
return c[cc] && c[cc].getComputedStyle && (c = c[cc].getComputedStyle(a, k)) ? c[b] || c.getPropertyValue(b) || K :K;
}
function Xr(a, b) {
return Wr(a, b) || (a[td] ? a[td][b] :k) || a[H] && a[H][b];
}
function Yr(a) {
return Xr(a, xl);
}
function Zr(a, b, c) {
var e, f = Io && (Co || Mo) && Wo(uf);
b instanceof vo ? (e = b.x, b = b.y) :(e = b, b = c), sa(a[H], $r(e, f)), a[H].top = $r(b, f);
}
function as(a) {
var b = a[Wa]();
return Q && (a = a.ownerDocument, sa(b, b[A] - (a[pc][Sb] + a[Xc][Sb])), b.top -= a[pc][Vb] + a[Xc][Vb]), 
b;
}
function bs(a) {
if (Q && !Yo(8)) return a[Mc];
for (var b = Bp(a), c = Xr(a, xl), e = c == Ri || c == th, a = a[Gd]; a && a != b; a = a[Gd]) if (c = Xr(a, xl), 
e = e && c == mm && a != b[pc] && a != b[Xc], !e && (a[gd] > a[Ec] || a[Mb] > a[nd] || c == Ri || c == th || c == Il)) return a;
return k;
}
function cs(a) {
for (var b = new Sr(0, fa, fa, 0), c = zp(a), e = c.l[Xc], f = c.l[pc], h = c.Tj(); a = bs(a); ) if (!(Q && 0 == a[Ec] || Jo && 0 == a[nd] && a == e || a == e || a == f || Xr(a, ol) == Ym)) {
var m, j = ds(a);
if (m = a, Io && !Wo(uf)) {
var s = la(Wr(m, Rh));
if (es(m)) var x = m.offsetWidth - m[Ec] - s - la(Wr(m, Th)), s = s + x;
m = new vo(s, la(Wr(m, Vh)));
} else m = new vo(m[Sb], m[Vb]);
j.x += m.x, j.y += m.y, b.top = q.max(b.top, j.y), Ta(b, q.min(b[Od], j.x + a[Ec])), 
Qa(b, q.min(b[sd], j.y + a[nd])), sa(b, q.max(b[A], j.x));
}
return e = h[od], h = h[rc], sa(b, q.max(b[A], e)), b.top = q.max(b.top, h), c = c.Vj(), 
Ta(b, q.min(b[Od], e + c[u])), Qa(b, q.min(b[sd], h + c[J])), 0 <= b.top && 0 <= b[A] && b[sd] > b.top && b[Od] > b[A] ? b :k;
}
function ds(a) {
var b, j, c = Bp(a), e = Xr(a, xl), f = Io && c[Cb] && !a[Wa] && e == th && (b = c[Cb](a)) && (0 > b[zb] || 0 > b[Ab]), h = new vo(0, 0);
if (b = c ? Bp(c) :ga, j = !Q || Yo(9) || zp(b).We() ? b[pc] :b[Xc], a == j) return h;
if (a[Wa]) b = as(a), a = zp(c).Tb(), h.x = b[A] + a.x, h.y = b.top + a.y; else if (c[Cb] && !f) b = c[Cb](a), 
a = c[Cb](j), h.x = b[zb] - a[zb], h.y = b[Ab] - a[Ab]; else {
b = a;
do {
if (h.x += b[Sc], h.y += b[Id], b != a && (h.x += b[Sb] || 0, h.y += b[Vb] || 0), 
Jo && Yr(b) == Ri) {
h.x += c[Xc][od], h.y += c[Xc][rc];
break;
}
b = b[Mc];
} while (b && b != a);
for ((Ho || Jo && e == th) && (h.y -= c[Xc][Id]), b = a; (b = bs(b)) && b != c[Xc] && b != j; ) h.x -= b[od], 
Ho && b[Ad] == Yg || (h.y -= b[rc]);
}
return h;
}
function fs(a, b, c) {
b instanceof xo ? (c = b[J], b = b[u]) :c == g && d(r("missing height argument")), 
pa(a[H], $r(b, i)), Sa(a[H], $r(c, i));
}
function $r(a, b) {
return typeof a == dl && (a = (b ? q.round(a) :a) + Cl), a;
}
function gs(a) {
if (Xr(a, Bi) != al) return hs(a);
var b = a[H], c = b.display, e = b.visibility, f = b.position;
return Fa(b, Zj), b.position = th, Ra(b, qk), a = hs(a), Ra(b, c), b.position = f, 
Fa(b, e), a;
}
function hs(a) {
var b = a.offsetWidth, c = a.offsetHeight, e = Jo && !b && !c;
return rn(b) && !e || !a[Wa] ? new xo(b, c) :(a = as(a), new xo(a[Od] - a[A], a[sd] - a.top));
}
function is(a) {
var b = ds(a), a = gs(a);
return new Vr(b.x, b.y, a[u], a[J]);
}
function js(a, b) {
var c = a[H];
hl in c ? c.opacity = b :Eg in c ? c.MozOpacity = b :Qi in c && (c.filter = b === K ? K :Ah + 100 * b + ue);
}
function ks(a, b) {
Ra(a[H], b ? K :al);
}
function es(a) {
return Ol == Xr(a, yi);
}
function ms(a, b, c) {
if (c = c ? k :a[mc](ve), ls) {
if (b = b ? al :K, a[H][ls] = b, c) for (var e, a = 0; e = c[a]; a++) e[H][ls] = b;
} else if ((Q || Ho) && (b = b ? gl :K, a[Ub](Rm, b), c)) for (a = 0; e = c[a]; a++) e[Ub](Rm, b);
}
function ns(a, b, c, e) {
if (/^\d+px?$/[Za](b)) return ka(b, 10);
var f = a[H][c], h = a.runtimeStyle[c];
return a.runtimeStyle[c] = a[td][c], a[H][c] = b, b = a[H][e], a[H][c] = f, a.runtimeStyle[c] = h, 
b;
}
function os(a, b) {
return ns(a, a[td] ? a[td][b] :k, Dk, wl);
}
function qs(a, b) {
if ((a[td] ? a[td][b + Wg] :k) == al) return 0;
var c = a[td] ? a[td][b + fh] :k;
return c in ps ? ps[c] :ns(a, c, Dk, wl);
}
function rs(a) {
if (Q) {
var b = qs(a, Qh), c = qs(a, Sh), e = qs(a, Uh), a = qs(a, Oh);
return new Sr(e, c, a, b);
}
return b = Wr(a, Rh), c = Wr(a, Th), e = Wr(a, Vh), a = Wr(a, Ph), new Sr(la(e), la(c), la(a), la(b));
}
function ts() {
var a = nn(Sj);
a != k || (a = hk);
var b = nn(Uj);
return b != k || (b = tf), a + kf + b;
}
function us(a) {
var b = nn(a);
return yn(b) || (b = nn(Tj + a), yn(b) || (b = k)), b;
}
function ws(a, b) {
var c = a.useFormatFromData;
if ((!wn(c) || c) && Wn(fo(a.format))) {
for (var c = b = jo(b, function(a) {
return !Wn(fo(a));
}), e = {}, f = 0, h = 0; h < c[D]; ) {
var j = c[h++], m = vn(j) ? el + zn(j) :(typeof j)[lb](0) + j;
da[F][Uc][I](e, m) || (e[m] = i, c[f++] = j);
}
Ia(c, f), 1 == b[D] && (c = b[0], Wn(fo(c)) || (c = c[v](/\d/g, nf), c = c[v](/#{10,}/, ia(11)[Kd](ce))), 
a.format = c);
}
}
function xs(a, b) {
var c = a[C](b, 0), e = a[C](b, 1);
return c == k || e == k ? k :new vo(c, e);
}
function ys(a) {
var e, b = a.da, c = a[pb](), a = a[hb]();
a:if (e = a.useFormatFromData, wn(e) && !e) e = l; else {
e = [ Tm, wm, um, vm, Ei ];
for (var f = 0; f < e[D]; f++) if (nn(e[f] + df, a)) {
e = l;
break a;
}
e = i;
}
if (e) if (b == Uf) 3 > c[nb]() || (b = c[Pc](1), e = a.hAxis || {}, ws(e, [ b ]), 
a.hAxis = e, c = c[Pc](2), b = a.vAxes || {}, e = b[0] || {}, ws(e, [ c ]), b[0] = e, 
a.vAxes = b); else {
e = a.vAxes || [ {}, {} ];
for (var f = a.hAxis || {}, h = e[0] || {}, j = e[1] || {}, m = [], s = [], x = c && c[nb]() || 0, z = 0; x > z; z++) if (c[Ob](z) == dl) {
var ea, E = c[Pc](z);
switch (ea = z, 0 == ea ? ea = k :(ea--, ea = ((a.series || {})[ea] || {}).targetAxisIndex || 0), 
ea) {
case 0:
m[t](E);
break;

case 1:
s[t](E);
}
}
b == Tf ? ws(f, m) :(ws(h, m), ws(j, s)), x > 0 && c[Ob](0) != nm && (b = b == Tf ? h :f, 
E = c[Pc](0), ws(b, [ E ])), e[0] = h, e[1] = j, a.vAxes = e, a.hAxis = f;
}
}
function zs(a) {
if (a[cd](xh)) {
var b = a[pb]();
if (a.da == Sg && 2 == b[nb]()) {
var c;
c = b[yc]();
for (var e = new vo(), f = 0; c > f; f++) {
var h = xs(b, f);
h != k && (e.x += h.x, e.y += h.y);
}
for (c = new vo(e.x / c, e.y / c), h = f = e = 0; h < b[yc](); h++) {
var j = xs(b, h);
j != k && (j = new vo(j.x - c.x, j.y - c.y), e += j.x * j.y, f += j.x * j.x);
}
var m, s;
m = e / f || 1, s = c.y - m * c.x, c = new google[G][kd](b), c[Ld]([ 0, 1, {
type:dl,
calc:function(a, c) {
var e = xs(b, c);
return e != k ? m * e.x + s :k;
}
} ]), a[ed](c), a[Pd](Ul, 2), a[Pd](Vl, 0), a[Pd](Wl, l);
}
a[Pd](xh, k);
}
}
function As(a) {
var b = a[pb](), c = a[xc]();
if (sn(c)) for (var e = 0; e < c[D]; e++) b = google[G][kd].fromJSON(b, c[e]); else c != k && (b = google[G][kd].fromJSON(b, c));
a[Vc](k), a[ed](b);
}
function Bs(a) {
var b = a.da;
if ((vs[b] || k) == ni && b != Sg) {
var b = a[pb](), c = a[cd](Vj);
if (c != k) {
for (var e = [ {
calc:c ? om :Ji,
sourceColumn:0,
type:nm
} ], f = c ? 1 :0, c = b[nb](); c > f; f++) e[t](f);
b = new google[G][kd](b), b[Ld](e), a[Pd](Vj, k), a[ed](b);
}
}
}
function Cs(a, b) {
var c = b || {};
O(c) && (c = Tn(c)), this.cg = c.containerId || k, this.gd = a, this.da = c[a + bh] || k, 
this.dg = c[a + Hg] || k, Na(this, k), this.qd = k, this.sd = c.dataSourceUrl || k, 
this.g = k, this[ed](c.dataTable), this.Za = c.options || {}, this.Fa = c.state || {};
var e = c.packages;
this.eg = rn(e) ? e :k, this.Ea = c.query || k, this.tb = c.refreshInterval || k, 
this.Bb = c.view || k, this.vd = k, this.Zf = [ As, Bs, ys, zs ];
}
function Ds(a, b, c) {
return a = -1 == b[w](af) ? a[b] :nn(b, a), c = rn(c) ? c :k, a != k ? a :c;
}
function W(a) {
Cs[I](this, bi, a);
}
function X(a) {
Cs[I](this, li, a);
}
function Y(a) {
Cs[I](this, pi, a), a = a || {}, O(a) && (a = Tn(a)), this.xa = a.wrappers || k, 
this.ec = a.bindings || k, this.of(a.dashboardType || cg), this.mf();
}
function Es(a, b) {
Fs(a)[id](b);
}
function Fs(a) {
return a = a || {}, O(a) && (a = Tn(a)), a.controlType ? new google[G].ControlWrapper(a) :a.dashboardType ? new google[G].DashboardWrapper(a) :new google[G].ChartWrapper(a);
}
function Gs(a) {
for (var b = 0, c = 0; c < a[D]; c++) b += a[c];
return b;
}
function Hs(a, b, c, e, f) {
this.S = !!b, a && this.hc(a, e), za(this, f != g ? f :this.oa || 0), this.S && za(this, -1 * this[ac]), 
this.Hd = !c;
}
function Is(a, b) {
Hs[I](this, a, b, i);
}
function Js(a, b, c, e, f) {
var h;
if (a && (this.H = a, this.L = b, this.A = c, this.K = e, 1 == a[db] && a[Ad] != Rf && (a = a[bc], 
(b = a[b]) ? (this.H = b, this.L = 0) :(a[D] && (this.H = a[a[D] - 1]), h = i)), 
1 == c[db]) && ((this.A = c[bc][e]) ? this.K = 0 :this.A = c), Hs[I](this, f ? this.A :this.H, f, i), 
h) try {
this.next();
} catch (j) {
j != Yp && d(j);
}
}
function Ks() {}
function Ls(a) {
this.m = a;
}
function Ms(a) {
var b = Bp(a).createRange();
if (3 == a[db]) b[wc](a, 0), b[ub](a, a[D]); else if (Ns(a)) {
for (var c, e = a; (c = e[Pb]) && Ns(c); ) e = c;
for (b[wc](e, 0), e = a; (c = e[bd]) && Ns(c); ) e = c;
b[ub](e, 1 == e[db] ? e[bc][D] :e[D]);
} else c = a[Gd], a = ho(c[bc], a), b[wc](c, a), b[ub](c, a + 1);
return b;
}
function Os(a, b, c, e) {
var f = Bp(a).createRange();
return f[wc](a, b), f[ub](c, e), f;
}
function Ps(a) {
this.m = a;
}
function Qs(a, b) {
this.m = a, this.$i = b;
}
function Rs(a) {
var b = Bp(a)[Xc].createTextRange();
if (1 == a[db]) b.moveToElementText(a), Ns(a) && !a[bc][D] && b[bb](l); else {
for (var c = 0, e = a; e = e.previousSibling; ) {
var f = e[db];
if (3 == f) c += e[D]; else if (1 == f) {
b.moveToElementText(e);
break;
}
}
e || b.moveToElementText(a[Gd]), b[bb](!e), c && b.move(ai, c), b.moveEnd(ai, a[D]);
}
return b;
}
function Ss(a, b, c, e) {
var f = a, h = b, j = c, m = e, s = l;
1 == f[db] && (h = f[bc][h], s = !h, f = h || f[bd] || f, h = 0);
var x = Rs(f);
return h && x.move(ai, h), f == j && h == m ? x[bb](i) :(s && x[bb](l), s = l, 1 == j[db] && (j = (h = j[bc][m]) || j[bd] || j, 
m = 0, s = !h), f = Rs(j), f[bb](!s), m && f.moveEnd(ai, m), x.setEndPoint(gg, f)), 
m = new Qs(x, Bp(a)), m.H = a, m.L = b, m.A = c, m.K = e, m;
}
function Us(a) {
this.m = a;
}
function Vs(a) {
this.m = a;
}
function Ts(a) {
if (Q && !Yo(9)) {
var b = new Qs(Rs(a), Bp(a));
if (Ns(a)) {
for (var c, e = a; (c = e[Pb]) && Ns(c); ) e = c;
for (b.H = e, b.L = 0, e = a; (c = e[bd]) && Ns(c); ) e = c;
b.A = e, b.K = 1 == e[db] ? e[bc][D] :e[D], b.Ha = a;
} else b.H = b.A = b.Ha = a[Gd], b.L = ho(b.Ha[bc], a), b.K = b.L + 1;
a = b;
} else a = Jo ? new Vs(Ms(a)) :Io ? new Ps(Ms(a)) :Ho ? new Us(Ms(a)) :new Ls(Ms(a));
return a;
}
function Ns(a) {
var b;
a:if (1 != a[db]) b = l; else {
switch (a[Ad]) {
case Mf:
case Nf:
case Pf:
case Rf:
case Vf:
case Wf:
case eg:
case jg:
case ng:
case qg:
case rg:
case pg:
case sg:
case xg:
case yg:
case Fg:
case Gg:
case zg:
case Jg:
case Kg:
case Og:
case Qg:
case Rg:
case Zg:
case eh:
b = l;
break a;
}
b = i;
}
return b || 3 == a[db];
}
function Ws(a, b, c) {
a[Ub](Ch + b, c);
}
function Xs(a, b, c, e, f) {
if (!(Q || Jo && Wo(vf))) return i;
if (Co && f) return Ys(a);
if (f && !e || !c && (17 == b || 18 == b) || Q && e && b == a) return l;
switch (a) {
case 13:
return !(Q && Yo(9));

case 27:
return !Jo;
}
return Ys(a);
}
function Ys(a) {
if (a >= 48 && 57 >= a || a >= 96 && 106 >= a || a >= 65 && 90 >= a || Jo && 0 == a) return i;
switch (a) {
case 32:
case 63:
case 107:
case 109:
case 110:
case 111:
case 186:
case 59:
case 189:
case 187:
case 61:
case 188:
case 190:
case 191:
case 192:
case 222:
case 219:
case 220:
case 221:
return i;

default:
return l;
}
}
function Zs(a) {
switch (a) {
case 61:
return 187;

case 59:
return 186;

case 224:
return 91;

case 0:
return 224;

default:
return a;
}
}
function $s(a) {
this.Rg = a, this.C = [];
}
function bt(a, b, c) {
Pa(this, a), this.handle = b || a, this.Ze = c || new Vr(0/0, 0/0, 0/0, 0/0), this.l = Bp(a), 
this.Da = new $s(this), uq(this.handle, [ Hm, Rk ], this.Wf, l, this);
}
function dt(a, b, c, e, f, h, j) {
kq[I](this, a), Da(this, c), Ea(this, e), sa(this, rn(h) ? h :b.cc), this.top = rn(j) ? j :b.dc;
}
function et(a) {
this.i = a, a = Q ? Ui :Jh, this.ni = uq(this.i, Q ? Ti :Si, this, !Q), this.oi = uq(this.i, a, this, !Q);
}
function ft() {}
function gt(a) {
this.Ta = a || zp(), this.$a = ht;
}
function it(a, b) {
switch (a) {
case 1:
return b ? zi :Ki;

case 2:
return b ? bk :Pm;

case 4:
return b ? vh :ui;

case 8:
return b ? Rl :Qm;

case 16:
return b ? ci :Om;

case 32:
return b ? Si :Jh;

case 64:
return b ? il :gi;
}
d(r("Invalid component state"));
}
function jt(a, b) {
gt[I](this, b), this.pi = !!a;
}
function kt(a, b, c) {
jt[I](this, b, c), this.ra = a || Pk, this.Ra = new lt().Z(mt, i).Z(nt, l, i);
}
function ot(a, b) {
Aa(this, xi), this.key = a, this.caption = b;
}
function lt(a) {
this.Ta = a || zp(), bq[I](this);
}
function tt(a, b) {
a && this.Mf(a, b);
}
function yt(a, b, c, e) {
e && this.Ib(e, g), Aa(this, xk), xa(this, a), this.charCode = b, this.repeat = c;
}
function zt() {}
function Bt(a, b) {
a || d(r("Invalid class name " + a)), yn(b) || d(r("Invalid decorator function " + b));
}
function Dt(a, b, c) {
if (gt[I](this, c), !b) {
for (var e, b = this[Nc]; b && (e = zn(b), !(e = Ct[e])); ) b = b.b ? b.b[Nc] :k;
b = e ? yn(e.la) ? e.la() :new e() :k;
}
this.k = b, this.Rf(a);
}
function Ft() {
this.wh = [];
}
function Gt(a, b, c, e) {
Dt[I](this, a, e || Ft.la(), c), this[Dc](b);
}
function Ht(a, b, c, e, f, h, j, m, s) {
var x, z;
if (x = c[Mc]) {
var E = x[Ad] == og || x[Ad] == Qf;
E && Yr(x) == mm || (z = ds(x), E || (E = (E = es(x)) && Io ? -x[od] :!E || Q && Wo(zf) ? x[od] :x[gd] - x[Ec] - x[od], 
z = wo(z, new vo(E, x[rc]))));
}
x = z || new vo(), z = is(a), (E = cs(a)) && z.qj(new Vr(E[A], E.top, E[Od] - E[A], E[sd] - E.top));
var E = zp(a), ea = zp(c);
if (E.l != ea.l) {
var ba = E.l[Xc], ea = ea.Wc(), kb = new vo(0, 0), ua = Hp(Bp(ba)), Db = ba;
do {
var Z;
if (ua == ea) Z = ds(Db); else {
Z = Db;
var $ = new vo();
if (1 == Z[db]) {
if (Z[Wa]) {
var U = as(Z);
$.x = U[A], $.y = U.top;
} else {
var U = zp(Z).Tb(), Ka = ds(Z);
$.x = Ka.x - U.x, $.y = Ka.y - U.y;
}
Io && !Wo(12) && (U = g, U = g, Q ? U = Oe :Jo ? U = $e :Ho ? U = Pe :Io && (U = Ne), 
Ka = g, U && (Ka = Xr(Z, U)), Ka || (Ka = Xr(Z, Km)), Ka ? (Z = Ka[Bb](ss), U = Z ? new vo(la(Z[1]), la(Z[2])) :new vo(0, 0)) :U = new vo(0, 0), 
$ = new vo($.x + U.x, $.y + U.y));
} else U = yn(Z.pj), Ka = Z, Z[sb] ? Ka = Z[sb][0] :U && Z.V[sb] && (Ka = Z.V[sb][0]), 
$.x = Ka[nc], $.y = Ka[oc];
Z = $;
}
kb.x += Z.x, kb.y += Z.y;
} while (ua && ua != ea && (Db = ua.frameElement) && (ua = ua.parent));
ba = wo(kb, ds(ba)), Q && !E.We() && (ba = wo(ba, E.Tb())), sa(z, z[A] + ba.x), 
z.top += ba.y;
}
a = -5 & (4 & b && es(a) ? 2 ^ b :b), b = new vo(2 & a ? z[A] + z[u] :z[A], 1 & a ? z.top + z[J] :z.top), 
b = wo(b, x), f && (b.x += (2 & a ? -1 :1) * f.x, b.y += (1 & a ? -1 :1) * f.y);
var N;
return j && (s ? N = s :(N = cs(c)) && (N.top -= x.y, Ta(N, N[Od] - x.x), Qa(N, N[sd] - x.y), 
sa(N, N[A] - x.x))), s = b[Zc](), f = 0, a = -5 & (4 & e && es(c) ? 2 ^ e :e), e = gs(c), 
m = m ? m[Zc]() :e[Zc](), (h || 0 != a) && (2 & a ? s.x -= m[u] + (h ? h[Od] :0) :h && (s.x += h[A]), 
1 & a ? s.y -= m[J] + (h ? h[sd] :0) :h && (s.y += h.top)), j && (N ? (h = s, f = 0, 
65 == (65 & j) && (h.x < N[A] || h.x >= N[Od]) && (j &= -2), 132 == (132 & j) && (h.y < N.top || h.y >= N[sd]) && (j &= -5), 
h.x < N[A] && 1 & j && (h.x = N[A], f |= 1), h.x < N[A] && h.x + m[u] > N[Od] && 16 & j && (pa(m, q.max(m[u] - (h.x + m[u] - N[Od]), 0)), 
f |= 4), h.x + m[u] > N[Od] && 1 & j && (h.x = q.max(N[Od] - m[u], N[A]), f |= 1), 
2 & j && (f |= (h.x < N[A] ? 16 :0) | (h.x + m[u] > N[Od] ? 32 :0)), h.y < N.top && 4 & j && (h.y = N.top, 
f |= 2), h.y >= N.top && h.y + m[J] > N[sd] && 32 & j && (Sa(m, q.max(m[J] - (h.y + m[J] - N[sd]), 0)), 
f |= 8), h.y + m[J] > N[sd] && 4 & j && (h.y = q.max(N[sd] - m[J], N.top), f |= 2), 
8 & j && (f |= (h.y < N.top ? 64 :0) | (h.y + m[J] > N[sd] ? 128 :0)), j = f) :j = 256, 
f = j, 496 & f) ? c = f :(Zr(c, s), e == m || (e && m ? e[u] == m[u] && e[J] == m[J] :0) || (h = zp(Bp(c)).We(), 
!Q || h && Wo(zf) ? (c = c[H], Io ? c.MozBoxSizing = Mh :Jo ? c.WebkitBoxSizing = Mh :c.boxSizing = Mh, 
pa(c, q.max(m[u], 0) + Cl), Sa(c, q.max(m[J], 0) + Cl)) :(j = c[H], h ? (Q ? (h = os(c, sl), 
e = os(c, tl), s = os(c, ul), N = os(c, rl), h = new Sr(s, e, N, h)) :(h = Wr(c, sl), 
e = Wr(c, tl), s = Wr(c, ul), N = Wr(c, rl), h = new Sr(la(s), la(e), la(N), la(h))), 
c = rs(c), j.pixelWidth = m[u] - c[A] - h[A] - h[Od] - c[Od], j.pixelHeight = m[J] - c.top - h.top - h[sd] - c[sd]) :(j.pixelWidth = m[u], 
j.pixelHeight = m[J]))), c = f), c;
}
function It() {}
function Jt(a, b, c) {
this.element = a, this.ad = b, this.yk = c;
}
function Kt(a, b, c, e) {
Jt[I](this, a, b), this.Nd = c ? 5 :0, this.pf = e || g;
}
function Lt(a, b, c, e) {
Kt[I](this, a, b, c || e), (c || e) && this.Yk(65 | (e ? 32 :132));
}
function Rt() {}
function St() {}
function Tt(a, b, c) {
Dt[I](this, a, b || St.la(), c);
}
function Ut() {}
function Vt(a, b) {
Dt[I](this, k, a || Ut.la(), b), this.ja(1, l), this.ja(2, l), this.ja(4, l), this.ja(32, l), 
this.ih(1);
}
function Wt() {}
function Xt(a, b, c) {
gt[I](this, c), this.k = b || Wt.la(), this.Yb = a || Xm;
}
function Yt() {}
function Zt(a, b, c) {
Dt[I](this, a, c || Yt.la(), b), this.ja(1, l), this.ja(2, l), this.ja(4, l), this.ja(32, l), 
this.ih(1);
}
function $t() {}
function au(a, b) {
Xt[I](this, Xm, b || $t.la(), a), this.qb(l);
}
function bu() {}
function cu() {}
function du(a, b, c, e) {
Tt[I](this, a, c || cu.la(), e), this.ja(64, i), this.Vc = new Lt(k, 5), b && this.Xc(b), 
this.di = k, this.$ = new Gq(500), (Pt || Qt) && !Wo(xf) && this.Bj(i);
}
function eu(a) {
this.Db = [], this.sk(a);
}
function fu(a, b, c, e) {
du[I](this, a, b, c, e), this.Dk(a), this.vf(Fk);
}
function gu(a, b) {
this.Ta = zp(), this.vc = a, this.bh = [];
a:{
for (var c = ts() + mf, e = ga[mc](yg), f = 0; f < e[D]; f++) if (e[f] && e[f][ud] && e[f][ud] == c) break a;
if (e = ga[Jb](Ek), e.href = c, e.rel = qm, Aa(e, xm), 0 == ga[mc](Xj)[D]) {
var c = ga[mc](dk)[0], f = ga[mc](Kh)[0], h = ga[Jb](Xj);
c[rb](h, f);
}
ga[mc](Xj)[0][Ua](e);
}
this.ck(b);
}
function hu(a, b) {
var e, f, c = zp(), h = k;
switch (a) {
case 2:
e = new kt(Qj), h = Dl + e.Lb(), f = c.d(Di, k, c.d(Di, {
"class":Pj
}, bg), c.d(Wh, k), c.d(zl, k, c.d(Di, {
id:h
}, b[Tc])));
break;

case 3:
e = new kt(Lj), f = c.d(Di, k, c.d(Di, {
"class":Pj
}, bg), c.d(Wh, k));
var j = c.d(Di, k, c.d(zl, k, b[Tc]));
c[Ua](f, j);
}
e[gc](f.innerHTML), qa(e.Zi(), lg), qa(e.Yi(), K), e.F(i), h && (c = Cp(h), (Q && !Yo(9) ? Ss(c, 0, c, 1) :Jo ? new Vs(Os(c, 0, c, 1)) :Io ? new Ps(Os(c, 0, c, 1)) :Ho ? new Us(Os(c, 0, c, 1)) :new Ls(Os(c, 0, c, 1))).select());
}
function iu(a) {
if (!a) return K;
var c, b = K;
for (c in a) b += ne + c + If + aa(a[c]);
return b;
}
if (!window.__gvizguard__) {
var g = void 0, i = !0, k = null, l = !1, aa = encodeURIComponent, n = google_exportSymbol, ca = window, da = Object, fa = 1/0, ga = document, ha = isNaN, p = google_exportProperty, q = Math, ia = Array, ja = Number, r = Error, ka = parseInt, la = parseFloat, ma = String, na = decodeURIComponent, oa = RegExp, Ua = "appendChild", t = "push", Va = "isCollapsed", Wa = "getBoundingClientRect", Xa = "getParent", Ya = "open", Za = "test", $a = "relatedTarget", ab = "clearTimeout", u = "width", bb = "collapse", cb = "slice", v = "replace", db = "nodeType", eb = "events", fb = "floor", gb = "getElementById", hb = "getOptions", ib = "RequestParameters", jb = "concat", lb = "charAt", mb = "createTextNode", nb = "getNumberOfColumns", ob = "value", pb = "getDataTable", qb = "preventDefault", rb = "insertBefore", sb = "targetTouches", w = "indexOf", tb = "metaKey", ub = "setEnd", y = "dispatchEvent", vb = "capture", wb = "getColumnProperties", xb = "nodeName", A = "left", yb = "setColumnProperties", zb = "screenX", Ab = "screenY", Bb = "match", Cb = "getBoxObjectFor", Eb = "send", Fb = "getName", Gb = "charCode", Hb = "isError", Ib = "focus", Jb = "createElement", Kb = "getColumnLabel", Lb = "toDataTable", Mb = "scrollHeight", Nb = "keyCode", Ob = "getColumnType", Pb = "firstChild", Qb = "getSortedRows", Rb = "forEach", Sb = "clientLeft", Tb = "getTableRowIndex", Ub = "setAttribute", Vb = "clientTop", Wb = "play", Xb = "handleEvent", Yb = "getRowProperties", Zb = "getTableProperties", $b = "setRefreshInterval", ac = "depth", B = "type", bc = "childNodes", cc = "defaultView", dc = "setCell", ec = "bind", fc = "source", gc = "setContent", hc = "name", C = "getValue", jc = "nextSibling", kc = "addRows", lc = "setActive", mc = "getElementsByTagName", nc = "clientX", oc = "clientY", pc = "documentElement", qc = "setState", rc = "scrollTop", sc = "stop", tc = "toString", uc = "altKey", vc = "getMonth", wc = "setStart", xc = "getView", yc = "getNumberOfRows", D = "length", zc = "propertyIsEnumerable", Ac = "getProperties", Bc = "addError", F = "prototype", Cc = "toJSON", Dc = "setValue", Ec = "clientWidth", Fc = "abort", Gc = "setTimeout", Hc = "setDataSourceUrl", Ic = "document", Jc = "ctrlKey", Kc = "split", Lc = "getColumnProperty", Mc = "offsetParent", Nc = "constructor", Oc = "stopPropagation", Pc = "getColumnPattern", Qc = "location", G = "visualization", Rc = "disabled", Sc = "offsetLeft", Tc = "message", Uc = "hasOwnProperty", H = "style", Vc = "setView", Wc = "setQuery", Xc = "body", Yc = "removeChild", Zc = "clone", $c = "getDataSourceUrl", ad = "target", bd = "lastChild", cd = "getOption", I = "call", dd = "isEnabled", ed = "setDataTable", fd = "removeAll", gd = "scrollWidth", hd = "lastIndexOf", id = "draw", jd = "getFullYear", kd = "DataView", ld = "getRefreshInterval", md = "getState", nd = "clientHeight", od = "scrollLeft", pd = "charCodeAt", qd = "getPackages", rd = "getContainerId", sd = "bottom", td = "currentStyle", ud = "href", vd = "substring", wd = "getQuery", xd = "rows", yd = "apply", zd = "shiftKey", Ad = "tagName", Bd = "addColumn", Cd = "element", Dd = "getContainer", Ed = "getFormattedValue", Fd = "errors", Gd = "parentNode", Hd = "label", Id = "offsetTop", J = "height", Jd = "splice", Kd = "join", Ld = "setColumns", Md = "execScript", Nd = "toLowerCase", Od = "right", Pd = "setOption", K = "", Qd = "\n", Rd = "\n</script>", Sd = " ", Td = " [", Ud = " does not match type ", Vd = " is duplicate in sortColumns.", Wd = ' name="', Xd = ' type="', Yd = '"', Zd = '" />', $d = '" src="http://www.google.com/ig/ifr?url=', ae = '""', be = '">\n', ce = "#", de = "#$1$1$2$2$3$3", ee = "%", fe = "%22", ge = "%27", he = "&", ie = "&amp;", je = "&gt;", ke = "&lt;", le = "&quot;", me = "&requireauth=1&", ne = "&up_", oe = "&up__table_query_url=", pe = "').send(\n     function(response) {\n      new ", qe = "']});\n\n   function drawVisualization() {\n    new google.visualization.Query('", re = "(", se = '(\n       document.getElementById(\'visualization\')).\n        draw(response.getDataTable(), null);\n      });\n   }\n\n   google.setOnLoadCallback(drawVisualization);\n  </script>\n </head>\n <body>\n  <div id="visualization" style="width: 500px; height: 500px;"></div>\n </body>\n</html>', te = "(\\d*)(\\D*)", ue = ")", ve = "*", we = ",", xe = ", ", ye = "-active", ze = "-bg", Ae = "-buttons", Be = "-caption", Ce = "-checkbox", De = "-checked", Ee = "-content", Fe = "-default", Ge = "-disabled", He = "-dropdown", Ie = "-focused", Je = "-highlight", Ke = "-horizontal", Le = "-hover", Me = "-inner-box", Ne = "-moz-transform", Oe = "-ms-transform", Pe = "-o-transform", Qe = "-open", Re = "-outer-box", Se = "-rtl", Te = "-selected", Ue = "-title", We = "-title-close", Xe = "-title-draggable", Ye = "-title-text", Ze = "-vertical", $e = "-webkit-transform", af = ".", bf = "..", cf = "./", df = ".format", ef = "/", ff = "/.", gf = "//", hf = "/chart.html", jf = "/chart.js", kf = "/static/modules/gviz/", lf = "/tq", mf = "/util/toolbar.css", nf = "0", of = "0.5", pf = "0.6", qf = "00", rf = "000", sf = "1", tf = "1.0", uf = "1.9", vf = "525", wf = "528", xf = "533.17.9", yf = "7", zf = "8", Af = ":", Bf = ";", Cf = ";sig:", Df = ";type:", Ef = "<", Ff = '<html>\n <head>\n  <title>Google Visualization API</title>\n  <script type="text/javascript" src="http://www.google.com/jsapi"></script>\n  <script type="text/javascript">\n   google.load(\'visualization\', \'1\', {packages: [\'', Gf = '<iframe style="', Hf = '<script type="text/javascript" src="', If = "=", Jf = ">", Kf = "?", Lf = "@", Mf = "APPLET", Nf = "AREA", Of = "Add to iGoogle", Pf = "BASE", Qf = "BODY", Rf = "BR", Sf = "BUTTON", Tf = "BarChart", Uf = "BubbleChart", Vf = "COL", Wf = "COMMAND", Xf = "CSS1Compat", Yf = "Chart options", Zf = "Column index ", $f = "Component already rendered", ag = "Content-Type", bg = "Copy-Paste this code to an HTML page", cg = "Dashboard", dg = "Date(", eg = "EMBED", fg = "End", gg = "EndToEnd", hg = "Export data as CSV", ig = "Export data as HTML", jg = "FRAME", kg = "GET", lg = "Google Visualization", mg = "Google_Visualization", ng = "HR", og = "HTML", pg = "IFRAME", qg = "IMG", rg = "INPUT", sg = "ISINDEX", tg = "Invalid DataView column type.", ug = "Invalid listener argument", vg = "JavaScript", wg = "Javascript code", xg = "KEYGEN", yg = "LINK", zg = "META", Ag = "MSXML2.XMLHTTP", Bg = "MSXML2.XMLHTTP.3.0", Cg = "MSXML2.XMLHTTP.6.0", Dg = "Microsoft.XMLHTTP", Eg = "MozOpacity", Fg = "NOFRAMES", Gg = "NOSCRIPT", Hg = "Name", Ig = "Not a valid 2D array.", Jg = "OBJECT", Kg = "PARAM", Lg = "POST", Mg = "Publish to web page", Ng = "Request timed out", Og = "SCRIPT", Pg = "SELECT", Qg = "SOURCE", Rg = "STYLE", Sg = "ScatterChart", Tg = "Start", Ug = "StartToEnd", Vg = "StartToStart", Wg = "Style", Xg = "TEXTAREA", Yg = "TR", Zg = "TRACK", $g = "Timed out after ", ah = "To", bh = "Type", ch = "Type mismatch. Value ", dh = "Unable to set parent component", eh = "WBR", fh = "Width", gh = "[", hh = "[object Array]", ih = "[object Function]", jh = "[object Window]", kh = "\\\\", lh = "\\c", mh = "\\s", nh = "\\u", oh = "]", ph = "_", qh = "_table_query_refresh_interval", rh = "_table_query_url", sh = "abort", th = "absolute", uh = "action", vh = "activate", wh = "activedescendant", xh = "addTrendLine", yh = "afterhide", zh = "aftershow", Ah = "alpha(opacity=", Bh = "application/x-www-form-urlencoded;charset=utf-8", Ch = "aria-", Dh = "array", Eh = "auto", Fh = "beforedrag", Gh = "beforehide", Hh = "beforeshow", Ih = "block", Jh = "blur", Kh = "body", Lh = "boolean", Mh = "border-box", Nh = "border:0;vertical-align:bottom;", Oh = "borderBottom", Ph = "borderBottomWidth", Qh = "borderLeft", Rh = "borderLeftWidth", Sh = "borderRight", Th = "borderRightWidth", Uh = "borderTop", Vh = "borderTopWidth", Wh = "br", Xh = "button", Yh = "call", Zh = "callee", $h = "change", ai = "character", bi = "chart", ci = "check", di = "checked", ei = "class", fi = "click", gi = "close", hi = "column", ii = "columnFilters[", ji = "complete", ki = "contextmenu", li = "control", mi = "controls", ni = "corechart", oi = "csv", pi = "dashboard", qi = "data-", ri = "date", si = "datetime", ti = "dblclick", ui = "deactivate", vi = "desc", wi = "detailed_message", xi = "dialogselect", yi = "direction", zi = "disable", Ai = "disabled", Bi = "display", Ci = "display: none; padding-top: 2px", Di = "div", Ei = "domainAxis", Fi = "drag", Gi = "dragstart", Hi = "draw", Ii = "earlycancel", Ji = "emptyString", Ki = "enable", Li = "end", Mi = "enter", Ni = "error", Oi = "expanded", Pi = "false", Qi = "filter", Ri = "fixed", Si = "focus", Ti = "focusin", Ui = "focusout", Vi = "for", Wi = "full", Xi = "function", Yi = "g", Zi = "gadgets.io.makeRequest", $i = "gadgets.io.makeRequest failed", aj = "getColumnIndex", bj = "getColumnLabel", cj = "getColumnPattern", dj = "getColumnProperties", ej = "getColumnProperty", fj = "getColumnRange", gj = "getContainerId", hj = "getDataSourceUrl", ij = "getDataTable", jj = "getDistinctValues", kj = "getFilteredRows", lj = "getFormattedValue", mj = "getNumberOfColumns", nj = "getNumberOfRows", oj = "getPackages", pj = "getQuery", qj = "getRefreshInterval", rj = "getRowProperties", sj = "getRowProperty", tj = "getSnapshot", uj = "getTableProperties", vj = "getTableProperty", wj = "goog-button", xj = "goog-container", yj = "goog-control", zj = "goog-custom-button", Aj = "goog-inline-block ", Bj = "goog-menu", Cj = "goog-menu-button", Dj = "goog-menuheader", Ej = "goog-menuitem", Fj = "goog-menuitem-accel", Gj = "goog-menuitem-mnemonic-separator", Hj = "goog-menuseparator", Ij = "goog-modalpopup", Jj = "goog-option", Kj = "goog-option-selected", Lj = "google-visualization-toolbar-big-dialog", Mj = "google-visualization-toolbar-export-data", Nj = "google-visualization-toolbar-export-igoogle", Oj = "google-visualization-toolbar-html-code", Pj = "google-visualization-toolbar-html-code-explanation", Qj = "google-visualization-toolbar-small-dialog", Rj = "google-visualization-toolbar-triangle", Sj = "google.loader.GoogleApisBase", Tj = "google.visualization.", Uj = "google.visualization.Version", Vj = "hasLabelsColumn", Wj = "haspopup", Xj = "head", Yj = "hex", Zj = "hidden", $j = "hide", bk = "highlight", ck = "horizontal", dk = "html", ek = "htmlcode", fk = "http", gk = "http%", hk = "http://ajax.googleapis.com/ajax", ik = "http://dummy.com", jk = "http://www.google.com/ig/adde?moduleurl=", kk = "https", lk = "https%", mk = "identity", nk = "iframe", ok = "igoogle", pk = "img", qk = "inline", rk = "innerText", sk = "input", tk = "invalid_query", uk = 'javascript:""', vk = "jscode", wk = "json", xk = "key", yk = "keydown", zk = "keypress", Ak = "keyup", Bk = "labelledby", Ck = "leave", Dk = "left", Ek = "link", Fk = "listbox", Gk = "losecapture", Hk = "makeRequest", Ik = "make_request_failed", Jk = "maxValue", Kk = "medium", Lk = "menu", Mk = "menuitem", Nk = "message", Ok = "minValue", Pk = "modal-dialog", Qk = "modifier", Rk = "mousedown", Sk = "mousemove", Tk = "mouseout", Uk = "mouseover", Vk = "mouseup", Wk = "ms, aborting", Xk = "named", Yk = "native code", Zk = "new ", $k = "nodeType", al = "none", bl = "not_modified", cl = "null", dl = "number", el = "o", fl = "object", gl = "on", hl = "opacity", il = "open", jl = "option", kl = "options", ll = "out:csv;", ml = "out:html;", nl = "outerHTML", ol = "overflow", pl = "package", ql = "padding: 2px", rl = "paddingBottom", sl = "paddingLeft", tl = "paddingRight", ul = "paddingTop", vl = "percent", wl = "pixelLeft", xl = "position", yl = "position:fixed;width:0;height:0;left:0;top:0;", zl = "pre", Al = "pressed", Bl = "pub", Cl = "px", Dl = "range", El = "ready", Fl = "readystatechange", Gl = "reason", Hl = "refresh", Il = "relative", Jl = "reqId:", Kl = "resize", Ll = "rgb", Ml = "right", Nl = "role", Ol = "rtl", Pl = "script", Ql = "scroll", Rl = "select", Sl = "selected", Tl = "separator", Ul = "series.1.lineWidth", Vl = "series.1.pointSize", Wl = "series.1.visibleInLegend", Xl = "setContainerId", Yl = "setDataSourceUrl", Zl = "setDataTable", $l = "setOptions", am = "setPackages", bm = "setQuery", cm = "setRefreshInterval", dm = "show", em = "sig:", fm = "solid", gm = "sortColumns", hm = "sortColumns[", im = "span", jm = "splice", km = "start", lm = "statechange", mm = "static", nm = "string", om = "stringify", pm = "style", qm = "stylesheet", rm = "success", sm = "tabIndex", tm = "tabindex", um = "targetAxes.0", vm = "targetAxes.1", wm = "targetAxis", xm = "text/css", ym = "text/javascript", zm = "textContent", Am = "tick", Bm = "timeofday", Cm = "timeout", Dm = "toJSON", Em = "touchcancel", Fm = "touchend", Gm = "touchmove", Hm = "touchstart", Im = "tqrt", Jm = "tqx", Km = "transform", Lm = "transparent", Mm = "true", Nm = "type", Om = "uncheck", Pm = "unhighlight", Qm = "unselect", Rm = "unselectable", Sm = "user_not_authenticated", Tm = "vAxis", Um = "value", Vm = "var ", Wm = "var _et_ = 1;", Xm = "vertical", Ym = "visible", Zm = "visualization", $m = "warning", an = "width: 700px; height: 500px;", bn = "window.event", cn = "withCredentials", dn = "xhr", en = "xhrpost", fn = "zx", gn = "{", hn = "}", jn = "\xa0", kn = "\xd7", ln = "\u25bc", L, mn = mn || {}, M = this, An = "closure_uid_" + q[fb](2147483648 * q.random())[tc](36), Bn = 0, Hn = Date.now || function() {
return +new Date();
}, Jn = k;
Nn[F].Vk = function(a) {
var b = [];
return this.sf(a, b), b[Kd](K);
}, Nn[F].sf = function(a, b) {
switch (typeof a) {
case nm:
this.mh(a, b);
break;

case dl:
this.qk(a, b);
break;

case Lh:
b[t](a);
break;

case "undefined":
b[t](cl);
break;

case fl:
if (a == k) {
b[t](cl);
break;
}
if (sn(a)) {
this.pk(a, b);
break;
}
this.rk(a, b);
break;

case Xi:
break;

default:
d(r("Unknown type: " + typeof a));
}
};
var On = {
'"':'\\"',
"\\":kh,
"/":"\\/",
"\b":"\\b",
"\f":"\\f",
"\n":"\\n",
"\r":"\\r",
"	":"\\t",
"":"\\u000b"
}, Pn = /\uffff/[Za]("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g :/[\\\"\x00-\x1f\x7f-\xff]/g;
Nn[F].mh = function(a, b) {
b[t](Yd, a[v](Pn, function(a) {
if (a in On) return On[a];
var b = a[pd](0), f = nh;
return 16 > b ? f += rf :256 > b ? f += qf :4096 > b && (f += nf), On[a] = f + b[tc](16);
}), Yd);
}, Nn[F].qk = function(a, b) {
b[t](isFinite(a) && !ha(a) ? a :cl);
}, Nn[F].pk = function(a, b) {
var c = a[D];
b[t](gh);
for (var e = K, f = 0; c > f; f++) b[t](e), e = a[f], this.sf(this.Td ? this.Td[I](a, ma(f), e) :e, b), 
e = we;
b[t](oh);
}, Nn[F].rk = function(a, b) {
b[t](gn);
var e, c = K;
for (e in a) if (da[F][Uc][I](a, e)) {
var f = a[e];
typeof f != Xi && (b[t](c), this.mh(e, b), b[t](Af), this.sf(this.Td ? this.Td[I](a, e, f) :f, b), 
c = we);
}
b[t](hn);
};
var $n = /&/g, ao = /</g, bo = />/g, co = /\"/g, eo = /[&<>\"]/, go = ia[F], ho = go[w] ? function(a, b, c) {
return go[w][I](a, b, c);
} :function(a, b, c) {
if (c = c == k ? 0 :0 > c ? q.max(0, a[D] + c) :c, O(a)) return O(b) && 1 == b[D] ? a[w](b, c) :-1;
for (;c < a[D]; c++) if (c in a && a[c] === b) return c;
return -1;
}, io = go[Rb] ? function(a, b, c) {
go[Rb][I](a, b, c);
} :function(a, b, c) {
for (var e = a[D], f = O(a) ? a[Kc](K) :a, h = 0; e > h; h++) h in f && b[I](c, f[h], h, a);
}, jo = go.filter ? function(a, b, c) {
return go.filter[I](a, b, c);
} :function(a, b, c) {
for (var e = a[D], f = [], h = 0, j = O(a) ? a[Kc](K) :a, m = 0; e > m; m++) if (m in j) {
var s = j[m];
b[I](c, s, m, a) && (f[h++] = s);
}
return f;
}, ko = go.map ? function(a, b, c) {
return go.map[I](a, b, c);
} :function(a, b, c) {
for (var e = a[D], f = ia(e), h = O(a) ? a[Kc](K) :a, j = 0; e > j; j++) j in h && (f[j] = b[I](c, h[j], j, a));
return f;
}, lo = go.every ? function(a, b, c) {
return go.every[I](a, b, c);
} :function(a, b, c) {
for (var e = a[D], f = O(a) ? a[Kc](K) :a, h = 0; e > h; h++) if (h in f && !b[I](c, f[h], h, a)) return l;
return i;
};
Oa(vo[F], function() {
return new vo(this.x, this.y);
}), Oa(xo[F], function() {
return new xo(this[u], this[J]);
}), xo[F].floor = function() {
return pa(this, q[fb](this[u])), Sa(this, q[fb](this[J])), this;
}, xo[F].round = function() {
return pa(this, q.round(this[u])), Sa(this, q.round(this[J])), this;
};
var yo, zo, Ao, Bo, Co;
Bo = Ao = zo = yo = l;
var Fo;
if (Fo = Do()) {
var Go = Eo();
yo = 0 == Fo[w]("Opera"), zo = !yo && -1 != Fo[w]("MSIE"), (Ao = !yo && -1 != Fo[w]("WebKit")) && Fo[w]("Mobile"), 
Bo = !yo && !Ao && "Gecko" == Go.product;
}
var Ho = yo, Q = zo, Io = Bo, Jo = Ao, Ko = Eo(), Lo = Ko && Ko.platform || K;
Co = -1 != Lo[w]("Mac"), Lo[w]("Win"), Lo[w]("Linux");
var Mo = !!Eo() && -1 != (Eo().appVersion || K)[w]("X11"), No;
a:{
var Oo = K, Po;
if (Ho && M.opera) var Qo = M.opera.version, Oo = typeof Qo == Xi ? Qo() :Qo; else if (Io ? Po = /rv\:([^\);]+)(\)|;)/ :Q ? Po = /MSIE\s+([^\);]+)(\)|;)/ :Jo && (Po = /WebKit\/(\S+)/), 
Po) var Ro = Po.exec(Do()), Oo = Ro ? Ro[1] :K;
if (Q) {
var So, To = M[Ic];
if (So = To ? To.documentMode :g, So > la(Oo)) {
No = ma(So);
break a;
}
}
No = Oo;
}
var Uo = No, Vo = {}, Xo = {}, Zo = oa("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"), ap = Jo, cp = /#|$/, dp = /\/spreadsheet/, ep = /\/(ccc|tq|pub)$/, fp = /^\/a\/(\w+.)*\w+/, gp = /^(\/a\/(\w+.)*\w+)?/, hp = /^spreadsheets?[0-9]?\.google\.com$/, ip = /^docs\.google\.com*$/, jp = /^(trix|spreadsheets|docs|webdrive)-[a-z]+\.corp\.google\.com/, kp = /^(\w*\.){1,2}corp\.google\.com$/, rp = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), tp, up = !Q || Yo(9);
!Io && !Q || Q && Yo(9) || Io && Wo("1.9.1");
var vp = Q && !Wo("9"), Ep = {
cellpadding:"cellPadding",
cellspacing:"cellSpacing",
colspan:"colSpan",
frameborder:"frameBorder",
height:"height",
maxlength:"maxLength",
role:Nl,
rowspan:"rowSpan",
type:Nm,
usemap:"useMap",
valign:"vAlign",
width:"width"
}, Sp = {
SCRIPT:1,
STYLE:1,
HEAD:1,
IFRAME:1,
OBJECT:1
}, Tp = {
IMG:Sd,
BR:Qd
};
L = Ap[F], L.r = zp, L.a = function(a) {
return O(a) ? this.l[gb](a) :a;
}, L.setProperties = Dp, L.Vj = function(a) {
return a = a || this.Wc(), Fp(a || ca);
}, L.d = function() {
return Jp(this.l, arguments);
}, L.createElement = function(a) {
return this.l[Jb](a);
}, L.createTextNode = function(a) {
return this.l[mb](a);
}, L.We = function() {
return Gp(this.l);
}, L.Wc = function() {
return this.l.parentWindow || this.l[cc];
}, L.Tj = function() {
return !Jo && Gp(this.l) ? this.l[pc] :this.l[Xc];
}, L.Tb = function() {
var a = this.l, b = !Jo && Gp(a) ? a[pc] :a[Xc], a = a.parentWindow || a[cc];
return new vo(a.pageXOffset || b[od], a.pageYOffset || b[rc]);
}, L.appendChild = function(a, b) {
a[Ua](b);
}, L.pg = Np, L.re = Op, L.removeNode = Pp, L.contains = Qp;
var Yp = "StopIteration" in M ? M.StopIteration :r("StopIteration");
Ma(Zp[F], function() {
d(Yp);
}), Zp[F].Hh = function() {
return this;
}, L = bq[F], L.o = 0, L.yb = 0, L.Ma = function() {
this.Ed();
for (var a = [], b = 0; b < this.C[D]; b++) a[t](this.na[this.C[b]]);
return a;
}, L.Kb = function() {
return this.Ed(), this.C[jb]();
}, L.Xb = function(a) {
return cq(this.na, a);
}, L.clear = function() {
this.na = {}, Ia(this.C, 0), this.yb = this.o = 0;
}, L.remove = function(a) {
return cq(this.na, a) ? (delete this.na[a], this.o--, this.yb++, this.C[D] > 2 * this.o && this.Ed(), 
i) :l;
}, L.Ed = function() {
if (this.o != this.C[D]) {
for (var a = 0, b = 0; a < this.C[D]; ) {
var c = this.C[a];
cq(this.na, c) && (this.C[b++] = c), a++;
}
Ia(this.C, b);
}
if (this.o != this.C[D]) {
for (var e = {}, b = a = 0; a < this.C[D]; ) c = this.C[a], cq(e, c) || (this.C[b++] = c, 
e[c] = 1), a++;
Ia(this.C, b);
}
}, L.get = function(a, b) {
return cq(this.na, a) ? this.na[a] :b;
}, L.set = function(a, b) {
cq(this.na, a) || (this.o++, this.C[t](a), this.yb++), this.na[a] = b;
}, L.Qj = function(a) {
var b;
a instanceof bq ? (b = a.Kb(), a = a.Ma()) :(b = np(a), a = mp(a));
for (var c = 0; c < b[D]; c++) this.set(b[c], a[c]);
}, Oa(L, function() {
return new bq(this);
}), L.Hh = function(a) {
this.Ed();
var b = 0, c = this.C, e = this.na, f = this.yb, h = this, j = new Zp();
return Ma(j, function() {
for (;;) {
f != h.yb && d(r("The map has changed since the iterator was created")), b >= c[D] && d(Yp);
var j = c[b++];
return a ? j :e[j];
}
}), j;
}, dq[F].mc = l, dq[F].U = function() {
this.mc || (this.mc = i, this.j());
}, dq[F].j = function() {
if (this.Fk && eq[yd](k, this.Fk), this.Gh) for (;this.Gh[D]; ) this.Gh.shift()();
}, gq[Sd] = on;
var hq = !Q || Yo(9), iq = !Q || Yo(9), jq = Q && !Wo("9");
!Jo || Wo(wf), Io && Wo("1.9b") || Q && Wo(zf) || Ho && Wo("9.5") || Jo && Wo(wf), 
Io && !Wo(zf) || Q && Wo("9"), L = kq[F], L.j = function() {}, L.U = function() {}, 
L.Jb = l, L.defaultPrevented = l, L.Jd = i, L.stopPropagation = function() {
this.Jb = i;
}, L.preventDefault = function() {
this.defaultPrevented = i, this.Jd = l;
}, P(mq, kq);
var nq = [ 1, 4, 2 ];
L = mq[F], Pa(L, k), L.relatedTarget = k, L.offsetX = 0, L.offsetY = 0, Da(L, 0), 
Ea(L, 0), ta(L, 0), va(L, 0), L.button = 0, xa(L, 0), L.charCode = 0, L.ctrlKey = l, 
Ha(L, l), L.shiftKey = l, L.metaKey = l, L.Te = l, L.V = k, L.Ib = function(a, b) {
var c = Aa(this, a[B]);
kq[I](this, c), Pa(this, a[ad] || a.srcElement), ra(this, b);
var e = a[$a];
if (e) {
if (Io) {
var f;
a:{
try {
gq(e[xb]), f = i;
break a;
} catch (h) {}
f = l;
}
f || (e = k);
}
} else c == Uk ? e = a.fromElement :c == Tk && (e = a.toElement);
this.relatedTarget = e, this.offsetX = Jo || a.offsetX !== g ? a.offsetX :a.layerX, 
this.offsetY = Jo || a.offsetY !== g ? a.offsetY :a.layerY, Da(this, a[nc] !== g ? a[nc] :a.pageX), 
Ea(this, a[oc] !== g ? a[oc] :a.pageY), ta(this, a[zb] || 0), va(this, a[Ab] || 0), 
this.button = a.button, xa(this, a[Nb] || 0), this.charCode = a[Gb] || (c == zk ? a[Nb] :0), 
this.ctrlKey = a[Jc], Ha(this, a[uc]), this.shiftKey = a[zd], this.metaKey = a[tb], 
this.Te = Co ? a[tb] :a[Jc], this.state = a.state, this.V = a, a.defaultPrevented && this[qb](), 
delete this.Jb;
}, L.Qk = function(a) {
return hq ? this.V.button == a :this[B] == fi ? 0 == a :!!(this.V.button & nq[a]);
}, L.ke = function() {
return this.Qk(0) && !(Jo && Co && this[Jc]);
}, L.stopPropagation = function() {
mq.b[Oc][I](this), this.V[Oc] ? this.V[Oc]() :this.V.cancelBubble = i;
}, L.preventDefault = function() {
mq.b[qb][I](this);
var a = this.V;
if (a[qb]) a[qb](); else if (a.returnValue = l, jq) try {
(a[Jc] || 112 <= a[Nb] && 123 >= a[Nb]) && xa(a, -1);
} catch (b) {}
}, L.pj = function() {
return this.V;
}, L.j = function() {};
var pq = 0;
L = oq[F], L.key = 0, L.Ab = l, L.lf = l, L.Ib = function(a, b, c, e, f, h) {
yn(a) ? this.fh = i :a && a[Xb] && yn(a[Xb]) ? this.fh = l :d(r(ug)), this.$b = a, 
this.Kg = b, this.src = c, Aa(this, e), this.capture = !!f, this.wd = h, this.lf = l, 
this.key = ++pq, this.Ab = l;
}, ya(L, function(a) {
return this.fh ? this.$b[I](this.wd || this.src, a) :this.$b[Xb][I](this.$b, a);
});
var qq = {}, rq = {}, sq = {}, tq = {};
P(Fq, dq), L = Fq[F], L.Fg = i, L.hd = k, L.Oe = function(a) {
this.hd = a;
}, L.addEventListener = function(a, b, c, e) {
uq(this, a, b, c, e);
}, L.removeEventListener = function(a, b, c, e) {
xq(this, a, b, c, e);
}, L.dispatchEvent = function(a) {
return Eq(this, a);
}, L.j = function() {
Fq.b.j[I](this), Bq(this), this.hd = k;
}, P(Gq, Fq), Gq[F].enabled = l;
var Hq = M.window;
L = Gq[F], L.$ = k, L.bk = function() {
if (this.enabled) {
var a = Hn() - this.bf;
a > 0 && a < .8 * this.Kd ? this.$ = this.Bc[Gc](this.af, this.Kd - a) :(this.Rj(), 
this.enabled && (this.$ = this.Bc[Gc](this.af, this.Kd), this.bf = Hn()));
}
}, L.Rj = function() {
this[y](Am);
}, L.start = function() {
this.enabled = i, this.$ || (this.$ = this.Bc[Gc](this.af, this.Kd), this.bf = Hn());
}, L.stop = function() {
this.enabled = l, this.$ && (this.Bc[ab](this.$), this.$ = k);
}, L.j = function() {
Gq.b.j[I](this), this[sc](), delete this.Bc;
}, Iq[F].Fh = k, Iq[F].getOptions = function() {
return this.Fh || (this.Fh = this.Hk());
};
var Jq;
P(Kq, Iq), Kq[F].Ah = function() {
var a = this.Jh();
return a ? new ActiveXObject(a) :new XMLHttpRequest();
}, Kq[F].Hk = function() {
var a = {};
return this.Jh() && (a[0] = i, a[1] = i), a;
}, Kq[F].Jh = function() {
if (!this.Lh && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
for (var a = [ Cg, Bg, Ag, Dg ], b = 0; b < a[D]; b++) {
var c = a[b];
try {
return new ActiveXObject(c), this.Lh = c;
} catch (e) {}
}
d(r("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed"));
}
return this.Lh;
}, Jq = new Kq(), P(Lq, Fq);
var Mq = /^https?$/i, Nq = [];
L = Lq[F], L.Sa = l, L.s = k, L.td = k, L.ng = K, L.wb = K, L.He = l, L.jd = l, 
L.Ce = l, L.ub = l, L.yd = 0, L.Hb = k, L.og = K, L.Ai = l, L.$k = function(a) {
this.yd = q.max(0, a);
}, wa(L, function(a, b, c, e) {
this.s && d(r("[goog.net.XhrIo] Object is active with another request")), b = b ? b.toUpperCase() :kg, 
this.ng = a, this.wb = K, this.He = l, this.Sa = i, this.s = this.yi(), this.td = this.xd ? this.xd[hb]() :Jq[hb](), 
this.s.onreadystatechange = Fn(this.ag, this);
try {
this.Ce = i, this.s[Ya](b, a, i), this.Ce = l;
} catch (f) {
return this.mg(5, f), void 0;
}
var a = c || K, h = this.headers[Zc]();
e && aq(e, function(a, b) {
h.set(b, a);
}), e = M.FormData && a instanceof M.FormData, b == Lg && !h.Xb(ag) && !e && h.set(ag, Bh), 
aq(h, function(a, b) {
this.s.setRequestHeader(b, a);
}, this), this.og && (this.s.responseType = this.og), cn in this.s && (this.s.withCredentials = this.Ai);
try {
this.Hb && (Hq[ab](this.Hb), this.Hb = k), 0 < this.yd && (this.Hb = Hq[Gc](Fn(this.zi, this), this.yd)), 
this.jd = i, this.s[Eb](a), this.jd = l;
} catch (j) {
this.mg(5, j);
}
}), L.yi = function() {
return this.xd ? this.xd.Ah() :Jq.Ah();
}, L.zi = function() {
"undefined" != typeof mn && this.s && (this.wb = $g + this.yd + Wk, this[y](Cm), 
this[Fc](8));
}, L.mg = function(a, b) {
this.Sa = l, this.s && (this.ub = i, this.s[Fc](), this.ub = l), this.wb = b, this.tg(), 
this.cd();
}, L.tg = function() {
this.He || (this.He = i, this[y](ji), this[y](Ni));
}, L.abort = function() {
this.s && this.Sa && (this.Sa = l, this.ub = i, this.s[Fc](), this.ub = l, this[y](ji), 
this[y](sh), this.cd());
}, L.j = function() {
this.s && (this.Sa && (this.Sa = l, this.ub = i, this.s[Fc](), this.ub = l), this.cd(i)), 
Lq.b.j[I](this);
}, L.ag = function() {
this.Ce || this.jd || this.ub ? this.jh() :this.nf();
}, L.nf = function() {
this.jh();
}, L.jh = function() {
if (this.Sa && "undefined" != typeof mn && (!this.td[1] || 4 != this.Ic() || 2 != this.Xe())) if (this.jd && 4 == this.Ic()) Hq[Gc](Fn(this.ag, this), 0); else if (this[y](Fl), 
this.tj()) {
this.Sa = l;
try {
this.Ng() ? (this[y](ji), this[y](rm)) :(this.wb = this.rj() + Td + this.Xe() + oh, 
this.tg());
} finally {
this.cd();
}
}
}, L.cd = function(a) {
if (this.s) {
var b = this.s, c = this.td[0] ? on :k;
this.td = this.s = k, this.Hb && (Hq[ab](this.Hb), this.Hb = k), a || this[y](El);
try {
b.onreadystatechange = c;
} catch (e) {}
}
}, L.va = function() {
return !!this.s;
}, L.tj = function() {
return 4 == this.Ic();
}, L.Ng = function() {
var b, a = this.Xe();
a:switch (a) {
case 200:
case 201:
case 202:
case 204:
case 206:
case 304:
case 1223:
b = i;
break a;

default:
b = l;
}
return b || 0 === a && !this.Ck();
}, L.Ck = function() {
var a = $o(ma(this.ng))[1] || k;
return !a && self[Qc] && (a = self[Qc].protocol, a = a.substr(0, a[D] - 1)), Mq[Za](a ? a[Nd]() :K);
}, L.Ic = function() {
return this.s ? this.s.readyState :0;
}, L.Xe = function() {
try {
return 2 < this.Ic() ? this.s.status :-1;
} catch (a) {
return -1;
}
}, L.rj = function() {
try {
return 2 < this.Ic() ? this.s.statusText :K;
} catch (a) {
return K;
}
}, L.xk = function() {
try {
return this.s ? this.s.responseText :K;
} catch (a) {
return K;
}
}, L.wk = function() {
return O(this.wb) ? this.wb :ma(this.wb);
}, wa(Lq, function(a, b, c, e, f, h) {
var j = new Lq();
Nq[t](j), b && uq(j, ji, b), uq(j, El, Gn(Oq, j)), h && j.$k(h), j[Eb](a, c, e, f);
}), Lq.rl = function() {
for (;Nq[D]; ) Nq.pop().U();
}, Lq.tl = function(a) {
Lq[F].nf = a.bl(Lq[F].nf);
}, Lq.sl = Oq, Lq.el = ag, Lq.hl = Bh, Lq.ul = Nq, L = Pq[F], L.Ya = K, L.Ac = K, 
L.yc = K, L.vb = k, L.Xa = K, L.zc = K, L.Rk = l, L.ca = l, L.toString = function() {
var a = [], b = this.Ya;
if (b && a[t](Rq(b, Sq), Af), b = this.yc) {
a[t](gf);
var c = this.Ac;
c && a[t](Rq(c, Sq), Lf), a[t](aa(ma(b))), b = this.vb, b != k && a[t](Af, ma(b));
}
return (b = this.Xa) && (this.Fe() && b[lb](0) != ef && a[t](ef), a[t](Rq(b, b[lb](0) == ef ? Tq :Uq))), 
(b = this.Ug()) && a[t](Kf, b), (b = this.zc) && a[t](ce, Rq(b, Vq)), a[Kd](K);
}, L.Oj = function(a) {
var b = this[Zc](), c = a.Gi();
c ? b.pd(a.Ya) :c = a.Hi(), c ? b.Ae(a.Ac) :c = a.Fe(), c ? b.ye(a.yc) :c = a.Ei();
var e = a.Xa;
if (c) b.od(a.vb); else if (c = a.qg()) {
if (e[lb](0) != ef) if (this.Fe() && !this.qg()) e = ef + e; else {
var f = b.Xa[hd](ef);
-1 != f && (e = b.Xa.substr(0, f + 1) + e);
}
if (f = e, f == bf || f == af) e = K; else if (-1 == f[w](cf) && -1 == f[w](ff)) e = f; else {
for (var e = 0 == f[hd](ef, 0), f = f[Kc](ef), h = [], j = 0; j < f[D]; ) {
var m = f[j++];
m == af ? e && j == f[D] && h[t](K) :m == bf ? ((1 < h[D] || 1 == h[D] && h[0] != K) && h.pop(), 
e && j == f[D] && h[t](K)) :(h[t](m), e = i);
}
e = h[Kd](ef);
}
}
return c ? b.nd(e) :c = a.Fi(), c ? b.ud(a.Ci()) :c = a.Di(), c && b.ze(a.zc), b;
}, Oa(L, function() {
return new Pq(this);
}), L.pd = function(a, b) {
return this.La(), (this.Ya = b ? a ? na(a) :K :a) && (this.Ya = this.Ya[v](/:$/, K)), 
this;
}, L.Gi = function() {
return !!this.Ya;
}, L.Ae = function(a, b) {
return this.La(), this.Ac = b ? a ? na(a) :K :a, this;
}, L.Hi = function() {
return !!this.Ac;
}, L.ye = function(a, b) {
return this.La(), this.yc = b ? a ? na(a) :K :a, this;
}, L.Fe = function() {
return !!this.yc;
}, L.od = function(a) {
return this.La(), a ? (a = ja(a), (ha(a) || 0 > a) && d(r("Bad port number " + a)), 
this.vb = a) :this.vb = k, this;
}, L.Ei = function() {
return this.vb != k;
}, L.nd = function(a, b) {
return this.La(), this.Xa = b ? a ? na(a) :K :a, this;
}, L.qg = function() {
return !!this.Xa;
}, L.Fi = function() {
return this.fa[tc]() !== K;
}, L.ud = function(a, b) {
return this.La(), a instanceof Qq ? (this.fa = a, this.fa.gf(this.ca)) :(b || (a = Rq(a, Wq)), 
this.fa = new Qq(a, k, this.ca)), this;
}, L.setQuery = function(a, b) {
return this.ud(a, b);
}, L.Ug = function() {
return this.fa[tc]();
}, L.Ci = function() {
return this.fa.mk();
}, L.getQuery = function() {
return this.Ug();
}, L.md = function(a, b) {
return this.La(), this.fa.set(a, b), this;
}, L.kh = function(a) {
return this.fa.get(a);
}, L.ze = function(a, b) {
return this.La(), this.zc = b ? a ? na(a) :K :a, this;
}, L.Di = function() {
return !!this.zc;
}, L.Ij = function() {
return this.La(), this.md(fn, q[fb](2147483648 * q.random())[tc](36) + q.abs(q[fb](2147483648 * q.random()) ^ Hn())[tc](36)), 
this;
}, L.La = function() {
this.Rk && d(r("Tried to modify a read-only Uri"));
}, L.gf = function(a) {
return this.ca = a, this.fa && this.fa.gf(a), this;
};
var Sq = /[#\/\?@]/g, Uq = /[\#\?:]/g, Tq = /[\#\?]/g, Wq = /[\#\?@]/g, Vq = /#/g;
L = Qq[F], L.Cb = function() {
if (!this.B && (this.B = new bq(), this.o = 0, this.ab)) for (var a = this.ab[Kc](he), b = 0; b < a[D]; b++) {
var c = a[b][w](If), e = k, f = k;
c >= 0 ? (e = a[b][vd](0, c), f = a[b][vd](c + 1)) :e = a[b], e = na(e[v](/\+/g, Sd)), 
e = this.Gb(e), this.add(e, f ? na(f[v](/\+/g, Sd)) :K);
}
}, L.B = k, L.o = k, L.add = function(a, b) {
this.Cb(), this.fc();
var a = this.Gb(a), c = this.B.get(a);
return c || this.B.set(a, c = []), c[t](b), this.o++, this;
}, L.remove = function(a) {
return this.Cb(), a = this.Gb(a), this.B.Xb(a) ? (this.fc(), this.o -= this.B.get(a)[D], 
this.B.remove(a)) :l;
}, L.clear = function() {
this.fc(), this.B = k, this.o = 0;
}, L.Xb = function(a) {
return this.Cb(), a = this.Gb(a), this.B.Xb(a);
}, L.Kb = function() {
this.Cb();
for (var a = this.B.Ma(), b = this.B.Kb(), c = [], e = 0; e < b[D]; e++) for (var f = a[e], h = 0; h < f[D]; h++) c[t](b[e]);
return c;
}, L.Ma = function(a) {
this.Cb();
var b = [];
if (a) this.Xb(a) && (b = oo(b, this.B.get(this.Gb(a)))); else for (var a = this.B.Ma(), c = 0; c < a[D]; c++) b = oo(b, a[c]);
return b;
}, L.set = function(a, b) {
return this.Cb(), this.fc(), a = this.Gb(a), this.Xb(a) && (this.o -= this.B.get(a)[D]), 
this.B.set(a, [ b ]), this.o++, this;
}, L.get = function(a, b) {
var c = a ? this.Ma(a) :[];
return 0 < c[D] ? ma(c[0]) :b;
}, L.Cj = function(a, b) {
this.remove(a), 0 < b[D] && (this.fc(), this.B.set(this.Gb(a), po(b)), this.o += b[D]);
}, L.toString = function() {
if (this.ab) return this.ab;
if (!this.B) return K;
for (var a = [], b = this.B.Kb(), c = 0; c < b[D]; c++) for (var e = b[c], f = aa(ma(e)), e = this.Ma(e), h = 0; h < e[D]; h++) {
var j = f;
e[h] !== K && (j += If + aa(ma(e[h]))), a[t](j);
}
return this.ab = a[Kd](he);
}, L.mk = function() {
return this[tc]() ? na(this[tc]()) :K;
}, L.fc = function() {
this.ab = k;
}, Oa(L, function() {
var a = new Qq();
return a.ab = this.ab, this.B && (a.B = this.B[Zc]()), a;
}), L.Gb = function(a) {
return a = ma(a), this.ca && (a = a[Nd]()), a;
}, L.gf = function(a) {
a && !this.ca && (this.Cb(), this.fc(), aq(this.B, function(a, c) {
var e = c[Nd]();
c != e && (this.remove(c), this.Cj(e, a));
}, this)), this.ca = a;
}, L.extend = function() {
for (var b = 0; b < arguments[D]; b++) aq(arguments[b], function(a, b) {
this.add(b, a);
}, this);
};
var kr = {
dl:Lh,
jl:dl,
ll:nm,
fl:ri,
ml:Bm,
gl:si
};
L = S[F], L.z = k, L.yb = k, L.D = k, L.Na = k, L.za = k, L.getNumberOfRows = function() {
return this.D[D];
}, L.getNumberOfColumns = function() {
return this.z[D];
}, Oa(L, function() {
return new S(this[Cc]());
}), L.getColumnId = function(a) {
return R(this, a), this.z[a].id || K;
}, L.getColumnIndex = function(a) {
for (var b = this.z, c = 0; c < b[D]; c++) if (b[c].id == a) return c;
return -1;
}, L.getColumnLabel = function(a) {
return R(this, a), this.z[a][Hd] || K;
}, L.getColumnPattern = function(a) {
return R(this, a), this.z[a].pattern;
}, L.getColumnRole = function(a) {
return a = this[Lc](a, Nl), a = O(a) ? a :K;
}, L.getColumnType = function(a) {
return R(this, a), this.z[a][B];
}, Ca(L, function(a, b) {
ar(this, a), R(this, b);
var c = this.Ka(a, b), e = k;
return c && (e = c.v, e = rn(e) ? e :k), e;
}), L.Ka = function(a, b) {
return this.D[a].c[b];
}, L.kk = function(a, b) {
this.za[a] = this.za[a] || [];
var c = this.za[a], e = c[b] || {};
return c[b] = e;
}, L.Wj = function(a, b) {
var c = this.za[a];
c && c[b] && (c[b] = {});
}, L.getFormattedValue = function(a, b) {
ar(this, a), R(this, b);
var c = this.Ka(a, b), e = K;
if (c) if ("undefined" != typeof c.f && c.f != k) e = c.f; else if (c = this.kk(a, b), 
rn(c.ph)) e = c.ph; else {
var f = this[C](a, b);
f === k || (e = ir(f, this[Ob](b))), c.ph = e;
}
return e;
}, L.getProperty = function(a, b, c) {
return ar(this, a), R(this, b), (a = (a = this.Ka(a, b)) && a.p) && c in a ? a[c] :k;
}, L.getProperties = function(a, b) {
ar(this, a), R(this, b);
var c = this.Ka(a, b);
return c || (c = {
v:k,
f:k
}, this.D[a].c[b] = c), c.p || (c.p = {}), c.p;
}, L.getTableProperties = function() {
return this.Na;
}, L.getTableProperty = function(a) {
var b = this.Na;
return b && a in b ? b[a] :k;
}, L.setTableProperties = function(a) {
this.Na = a;
}, L.setTableProperty = function(a, b) {
this.Na || (this.Na = {}), this.Na[a] = b;
}, Ja(L, function(a, b, c) {
this[dc](a, b, c, g, g);
}), L.setFormattedValue = function(a, b, c) {
this[dc](a, b, g, c, g);
}, L.setProperties = function(a, b, c) {
this[dc](a, b, g, g, c);
}, L.setProperty = function(a, b, c, e) {
this[Ac](a, b)[c] = e;
}, L.setCell = function(a, b, c, e, f) {
ar(this, a), R(this, b), this.Wj(a, b);
var h = this.Ka(a, b);
h || (h = {}, this.D[a].c[b] = h), "undefined" != typeof c && (br(this, b, c), h.v = c), 
"undefined" != typeof e && (h.f = e), rn(f) && (h.p = vn(f) ? f :{});
}, L.setRowProperties = function(a, b) {
ar(this, a), this.D[a].p = b;
}, L.setRowProperty = function(a, b, c) {
this[Yb](a)[b] = c;
}, L.getRowProperty = function(a, b) {
ar(this, a);
var c = this.D[a];
return (c = c && c.p) && b in c ? c[b] :k;
}, L.getRowProperties = function(a) {
return ar(this, a), a = this.D[a], a.p || (a.p = {}), a.p;
}, L.setColumnLabel = function(a, b) {
R(this, a), this.z[a].label = b;
}, L.setColumnProperties = function(a, b) {
R(this, a), this.z[a].p = b;
}, L.setColumnProperty = function(a, b, c) {
this[wb](a)[b] = c;
}, L.getColumnProperty = function(a, b) {
R(this, a);
var c = this.z[a];
return (c = c && c.p) && b in c ? c[b] :k;
}, L.getColumnProperties = function(a) {
return R(this, a), a = this.z[a], a.p || (a.p = {}), a.p;
}, L.insertColumn = function(a, b, c, e) {
for (a !== this.z[D] && (this.za = [], R(this, a)), vn(b) || (b = {
id:e || K,
label:c || K,
pattern:K,
type:b
}), c = b[B], op(kr, c) || d(r("Invalid type: " + c + af)), (c = b.role) && (e = b.p || {}, 
e.role = c, b.p = e), this.z[Jd](a, 0, b), b = 0; b < this.D[D]; b++) this.D[b].c[Jd](a, 0, {
v:k,
f:k
});
}, L.addColumn = function(a, b, c) {
return this.insertColumn(this.z[D], a, b, c), this.z[D] - 1;
}, L.wj = function(a, b) {
var c = Yq(b);
return br(this, a, c.v), c;
}, L.insertRows = function(a, b) {
a !== this.D[D] && (this.za = [], ar(this, a));
var c;
if (sn(b)) c = b; else if (typeof b == dl) {
(b != q[fb](b) || 0 > b) && d(r("Invalid value for numOrArray: " + b + ". If numOrArray is a number it should be a nonnegative integer.")), 
c = [];
for (var e = 0; b > e; e++) c[e] = k;
} else d(r("Invalid value for numOrArray. Should be a number or an array of arrays of cells."));
for (var e = [], f = 0; f < c[D]; f++) {
var h = c[f], j = [];
if (h === k) for (h = 0; h < this.z[D]; h++) j[t]({
v:k,
f:k
}); else if (sn(h)) {
h[D] != this.z[D] && d(r("Row given with size different than " + this.z[D] + " (the number of columns in the table)."));
for (var m = 0; m < h[D]; m++) j[t](this.wj(m, h[m]));
} else d(r("Every row given must be either null or an array."));
h = {}, h.c = j, e[t](h), 1e4 == e[D] && (j = e, Gn(ro, this.D, a, 0)[yd](k, j), 
a += e[D], e = []);
}
return Gn(ro, this.D, a, 0)[yd](k, e), a + e[D] - 1;
}, L.addRows = function(a) {
return typeof a == dl || sn(a) ? this.insertRows(this.D[D], a) :(d(r("Argument given to addRows must be either a number or an array")), 
void 0);
}, L.addRow = function(a) {
return sn(a) ? this[kc]([ a ]) :(a != k && d(r("If argument is given to addRow, it must be an array, or null")), 
this[kc](1));
}, L.getColumnRange = function(a) {
return er(this, a);
}, L.getSortedRows = function(a) {
return fr(this, a);
}, L.sort = function(a) {
this.za = [];
var a = $q(this, a), b = this;
to(this.D, function(c, e) {
for (var f = 0; f < a[D]; f++) {
var h = a[f], j = h.column, m = c.c[j], s = e.c[j], m = m ? m.v :k, s = s ? s.v :k, j = dr(b[Ob](j), m, s);
if (0 != j) return j * (h.desc ? -1 :1);
}
return 0;
});
}, L.toJSON = function() {
return Qn({
cols:this.z,
rows:this.D,
p:this.Na
});
}, L.getDistinctValues = function(a) {
return gr(this, a);
}, L.getFilteredRows = function(a) {
return hr(this, a);
}, L.removeRows = function(a, b) {
0 >= b || (this.za = [], ar(this, a), a + b > this.D[D] && (b = this.D[D] - a), 
this.D[Jd](a, b));
}, L.removeRow = function(a) {
this.removeRows(a, 1);
}, L.removeColumns = function(a, b) {
if (!(0 >= b)) {
this.za = [], R(this, a), a + b > this.z[D] && (b = this.z[D] - a), this.z[Jd](a, b);
for (var c = 0; c < this.D[D]; c++) this.D[c].c[Jd](a, b);
}
}, L.removeColumn = function(a) {
this.removeColumns(a, 1);
};
var or = /^[^<]*(<a(( )+target=('_blank')?("_blank")?)?( )+(href=('[^']*')?("[^"]*")?)>[^<]*<\/a>[^<]*)*$/, pr = /javascript((s)?( )?)*:/, mr = {
nl:of,
ol:pf
};
L = lr[F], L.Mg = k, L.g = k, L.isError = function() {
return this.Ve == Ni;
}, L.hasWarning = function() {
return this.Ve == $m;
}, L.containsReason = function(a) {
for (var b = 0; b < this.fb[D]; b++) if (this.fb[b].reason == a) return i;
for (b = 0; b < this.gb[D]; b++) if (this.gb[b].reason == a) return i;
return l;
}, L.getDataSignature = function() {
return this.Mg;
}, L.getDataTable = function() {
return this.g;
}, L.xf = function(a) {
return this[Hb]() && this.fb && this.fb[0] && this.fb[0][a] ? this.fb[0][a] :this.hasWarning() && this.gb && this.gb[0] && this.gb[0][a] ? this.gb[0][a] :k;
}, L.getReasons = function() {
var a = this.xf(Gl);
return a != k && a != K ? [ a ] :[];
}, L.getMessage = function() {
return this.xf(Nk) || K;
}, L.getDetailedMessage = function() {
return this.xf(wi) || K;
};
var rr = {
pl:dn,
ql:en,
kl:"scriptInjection",
il:Hk,
cl:Eh
}, ur = new bq({
"X-DataSource-Auth":"a"
}), sr = 0, vr = {};
qr[F].qh = 30;
var tr = [], wr = M.gadgets;
L = qr[F], L.fk = function(a) {
var b = new Pq(a);
433 == b.vb && b.od(k);
var c = b.Xa, c = c[v](/\/ccc$/, lf);
/\/pub$/[Za](c) && (c = c[v](/\/pub$/, lf), b.md(Bl, sf)), b.nd(c);
var c = bp($o(a)[3] || k), a = (ja($o(a)[4] || k) || k) != k, e = jp[Za](c), c = kp[Za](c) && !e && a;
return b.pd(c ? fk :kk), b[tc]();
}, L.Kc = k, L.Ld = k, L.Sd = k, L.Ea = k, L.$e = k, L.jc = k, L.jf = i, L.tb = 0, 
L.Jc = k, L.va = l, L.setRefreshInterval = function(a) {
(typeof a != dl || 0 > a) && d(r("Refresh interval must be a non-negative number")), 
this.tb = a, this.sh();
}, L.df = function() {
this.Sd && (ca[ab](this.Sd), this.Sd = k);
}, L.lk = function() {
this.Mh(Cm, Ng);
}, L.Mh = function(a, b, c) {
this.kc({
version:pf,
status:Ni,
errors:[ {
reason:a,
message:b,
detailed_message:c
} ]
});
}, L.Lj = function(a) {
var b = {};
this.Ea && (b.tq = ma(this.Ea));
var c = Jl + ma(this.Ig), e = this.Jc;
if (e && (c += Cf + e), this.$e && (c += Df + this.$e), b.tqx = c, this.jc) {
var f, c = [];
for (f in this.jc) c[t](f + Af + this.jc[f]);
b.tqh = c[Kd](Bf);
}
return a = yr(a, b), this.tb && (a = new Pq(a), Jo && a.Ij(), a = a[tc]()), a;
}, L.ic = function() {
var a = this.Lj(this.Gj);
vr[ma(this.Ig)] = this;
var b = this.cf, c = kg;
if (b == en && (b = dn, c = Lg), b == Eh) if (/[?&]alt=gviz(&[^&]*)*$/[Za](a)) b = Hk; else {
var e, b = a.search(cp);
b:{
for (e = 0; 0 <= (e = a[w](Im, e)) && b > e; ) {
var f = a[pd](e - 1);
if ((38 == f || 63 == f) && (f = a[pd](e + 4), !f || 61 == f || 38 == f || 35 == f)) break b;
e += 5;
}
e = -1;
}
0 > e ? b = k :(f = a[w](he, e), (0 > f || f > b) && (f = b), e += 5, b = na(a.substr(e, f - e)[v](/\+/g, Sd))), 
b = b || Eh, op(rr, b) || (b = Eh);
}
b == Hk ? nn(Zi) ? this.Pj(a, this.Lg) :d(r("gadgets.io.makeRequest is not defined.")) :((e = b == dn) || ((b = b == Eh) && (e = new Pq(M[Qc][ud]).Oj(new Pq(a))[tc](), 
b = $o(M[Qc][ud]), e = $o(e), b = b[3] == e[3] && b[1] == e[1] && b[4] == e[4]), 
e = b), e ? (b = g, e = a, c == Lg && (a = a[Kc](Kf), 1 <= a[D] && (e = a[0]), 2 <= a[D] && (b = a[1])), 
Lq[Eb](e, zr, c, b, ur)) :(c = ga[mc](Kh)[0], b = this.Jc === k, this.Hj && b ? (b = ga[Jb](pk), 
this.Nj(b, a), c[Ua](b)) :this.kf(a)));
}, L.Nj = function(a, b) {
var c = this;
a.onerror = function() {
c.kf(b);
}, a.onload = function() {
c.kf(b);
}, Ra(a[H], al), a.src = b + me + new Date().getTime();
}, L.Pj = function(a, b) {
b[wr.io[ib].CONTENT_TYPE] == k && (b[wr.io[ib].CONTENT_TYPE] = wr.io.ContentType.TEXT), 
b[wr.io[ib].AUTHORIZATION] == k && (b[wr.io[ib].AUTHORIZATION] = wr.io.AuthorizationType.SIGNED), 
b.OAUTH_ENABLE_PRIVATE_NETWORK == k && (b.OAUTH_ENABLE_PRIVATE_NETWORK = i), b.OAUTH_ADD_EMAIL == k && (b.OAUTH_ADD_EMAIL = i), 
wr.io.makeRequest(a, Fn(this.Gk, this), b), this.zh();
}, L.Gk = function(a) {
if (a != k && a.data) In(Vn(a.data)); else {
var b = K;
a && a[Fd] && (b = a[Fd][Kd](Sd)), this.Mh(Ik, $i, b);
}
}, L.kf = function(a) {
this.zh(), Kn(a), this.sh();
}, L.zh = function() {
var a = this;
this.df(), this.Sd = ca[Gc](function() {
a.lk();
}, 1e3 * this.qh);
}, L.Zg = function() {
this.Ld && (ca[ab](this.Ld), this.Ld = k);
}, L.sh = function() {
if (this.Zg(), 0 != this.tb && this.jf && this.va) {
var a = this;
this.Ld = ca[Gc](function() {
a.ic();
}, 1e3 * this.tb);
}
}, wa(L, function(a) {
this.va = i, this.Kc = a, this.ic();
}), L.makeRequest = function(a, b) {
this.va = i, this.Kc = a, this.Lg = b || {}, this.ic();
}, L.abort = function() {
this.va = l, this.df(), this.Zg();
}, L.kc = function(a) {
if (this.df(), a = new lr(a), !a.containsReason(bl)) {
this.Jc = a[Hb]() ? k :a.getDataSignature();
var b = this.Kc;
b[I](b, a);
}
}, L.setTimeout = function(a) {
(typeof a != dl || ha(a) || 0 >= a) && d(r("Timeout must be a positive number")), 
this.qh = a;
}, L.setRefreshable = function(a) {
return typeof a != Lh && d(r("Refreshable must be a boolean")), this.jf = a;
}, L.setQuery = function(a) {
typeof a != nm && d(r("queryString must be a string")), this.Ea = a;
}, L.Xk = function(a) {
this.$e = a, a != k && this.Ch(Nm, a);
}, L.Ch = function(a, b) {
a = a[v](/\\/g, kh), b = b[v](/\\/g, kh), a = a[v](/:/g, lh), b = b[v](/:/g, lh), 
a = a[v](/;/g, mh), b = b[v](/;/g, mh), this.jc || (this.jc = {}), this.jc[a] = b;
};
var Cr = l;
Br[F].Eh = 200, Br[F].yh = function() {
if (Er()) {
var a = M.gadgets;
yn(a.rpc.register) && a.rpc.register(Hl, xr);
} else 0 < this.Eh && (this.Eh--, ca[Gc](Fn(this.yh, this), 100));
}, Br[F].createQueryFromPrefs = function(a) {
var b = a.getString(rh), c = b[Nd]();
return (0 == c[w](gk) || 0 == c[w](lk)) && (b = na(b)), b = new qr(b), a = a.getInt(qh), 
b[$b](a), b;
}, Br[F].validateResponse = function(a) {
return this.Ik(a);
}, M.gadgets && !Er() && Kn("http://www.gmodules.com/gadgets/rpc/rpc.v.js"), Dr(bf), 
Gr[F].getKey = function() {
return this.Sk;
}, P(Hr, kq), L = Ir[F], L.ff = k, L.hh = k, L.gh = k, L.g = k, L.setOptions = function(a) {
this.Za = a || {};
}, L.draw = function() {
this.g && this.Eg[id](this.g, this.Za);
}, L.Wk = function(a) {
var b = this.vc;
this.Hc = a ? a :b ? this.Hc = this.ff :k;
}, L.sendAndDraw = function() {
this.Hc || d(r("If no container was supplied, a custom error handler must be supplied instead."));
var a = this;
this.Ea[Eb](function(b) {
var c = a.hh;
c && c(b), a.kc(b), (c = a.gh) && c(b);
});
}, L.kc = function(a) {
var b = this.Hc;
b(a) && (this.g = a[pb](), this.Eg[id](this.g, this.Za));
}, L.setCustomResponseHandler = function(a) {
a != k && (typeof a != Xi && d(r("Custom response handler must be a function.")), 
this.hh = a);
}, L.setCustomPostResponseHandler = function(a) {
a != k && (typeof a != Xi && d(r("Custom post response handler must be a function.")), 
this.gh = a);
}, L.abort = function() {
this.Ea[Fc]();
}, L = T[F], L.cj = function() {
for (var a = 0; a < this.t[D]; a++) vn(this.t[a]) && (this.Je[a] = []);
this.Ie = l;
}, L.Gc = function() {
this.Ie = i;
}, L.Yj = function() {
for (var a = [], b = this.g[yc](), c = 0; b > c; c++) a[t](c);
this.Ia = a, this.Gc();
}, L.setColumns = function(a) {
for (var b = this.g, c = np(Jr), e = 0; e < a[D]; e++) {
var f = a[e];
if (xn(f)) R(b, f); else if (vn(f)) {
var h = f.sourceColumn, f = f.calc;
O(f) && ((!c || c && !mo(c, f)) && d(r('Unknown function "' + f + Yd)), h != k && R(b, h));
} else d(r("Invalid column input, expected either a number or an object."));
}
for (this.t = Cn(a), a = this.g, b = this.t, c = 0; c < b[D]; c++) e = b[c], vn(e) && ((h = e.role) && (f = e.properties || {}, 
f.role = h, e.properties = f), h = e.sourceColumn, xn(h) && (R(a, h), e.calc = e.calc || mk, 
Aa(e, e[B] || a[Ob](h))));
this.Gc();
}, L.eh = function(a, b) {
if (sn(a)) {
rn(b) && d(r("If the first parameter is an array, no second parameter is expected"));
for (var c = 0; c < a[D]; c++) ar(this.g, a[c]);
return po(a);
}
if (qn(a) == dl) {
!qn(b) == dl && d(r("If first parameter is a number, second parameter must be specified and be a number.")), 
a > b && d(r("The first parameter (min) must be smaller than or equal to the second parameter (max).")), 
ar(this.g, a), ar(this.g, b);
for (var e = [], c = a; b >= c; c++) e[t](c);
return e;
}
d(r("First parameter must be a number or an array."));
}, L.setRows = function(a, b) {
this.Ia = this.eh(a, b), this.Ja = l, this.Gc();
}, L.getViewColumns = function() {
return Cn(this.t);
}, L.getViewRows = function() {
if (this.Ja) {
for (var a = [], b = this.g[yc](), c = 0; b > c; c++) a[t](c);
return a;
}
return po(this.Ia);
}, L.hideColumns = function(a) {
this[Ld](jo(this.t, function(b) {
return !mo(a, b);
})), this.Gc();
}, L.hideRows = function(a, b) {
var c = this.eh(a, b);
this.Ja && (this.Yj(), this.Ja = l), this.setRows(jo(this.Ia, function(a) {
return !mo(c, a);
})), this.Gc();
}, L.getViewColumnIndex = function(a) {
for (var b = 0; b < this.t[D]; b++) {
var c = this.t[b];
if (c == a || vn(c) && c.sourceColumn == a) return b;
}
return -1;
}, L.getViewRowIndex = function(a) {
return this.Ja ? 0 > a || a >= this.g[yc]() ? -1 :a :ho(this.Ia, a);
}, L.getTableColumnIndex = function(a) {
return R(this, a), a = this.t[a], xn(a) ? a :vn(a) && xn(a.sourceColumn) ? a.sourceColumn :-1;
}, L.getUnderlyingTableColumnIndex = function(a) {
return a = this.getTableColumnIndex(a), -1 == a ? a :(yn(this.g.getUnderlyingTableColumnIndex) && (a = this.g.getUnderlyingTableColumnIndex(a)), 
a);
}, L.getTableRowIndex = function(a) {
return ar(this, a), this.Ja ? a :this.Ia[a];
}, L.getUnderlyingTableRowIndex = function(a) {
return a = this[Tb](a), yn(this.g.getUnderlyingTableRowIndex) && (a = this.g.getUnderlyingTableRowIndex(a)), 
a;
}, L.getNumberOfRows = function() {
return this.Ja ? this.g[yc]() :this.Ia[D];
}, L.getNumberOfColumns = function() {
return this.t[D];
}, L.getColumnId = function(a) {
return R(this, a), a = this.t[a], xn(a) ? this.g.getColumnId(a) :a.id || K;
}, L.getColumnIndex = function(a) {
for (var b = 0; b < this.t[D]; b++) {
var c = this.t[b];
if (vn(c) && c.id == a) return b;
}
return a = this.g.getColumnIndex(a), this.getViewColumnIndex(a);
}, L.getColumnLabel = function(a) {
return R(this, a), a = this.t[a], xn(a) ? this.g[Kb](a) :a[Hd] || K;
}, L.getColumnPattern = function(a) {
return R(this, a), a = this.t[a], xn(a) ? this.g[Pc](a) :k;
}, L.getColumnRole = function(a) {
return a = this[Lc](a, Nl), a = O(a) ? a :K;
}, L.getColumnType = function(a) {
return R(this, a), a = this.t[a], xn(a) ? this.g[Ob](a) :a[B];
}, L.oj = function(a, b) {
this.Ie && this.cj();
var c = this.Je[b][a];
if (rn(c)) return c;
var c = k, e = this.t[b], f = e.calc;
return O(f) ? (f = Jr[f], c = f(this.g, a, e)) :yn(f) && (c = f[I](k, this.g, a)), 
c = Yq(c), this.dj(c, e[B]), this.Je[b][a] = c;
}, L.dj = function(a, b) {
var c = a.v;
Wn(fo(b)) && d(r('"type" must be specified')), cr(c, b) || d(r(ch + c + Ud + b));
}, L.Ka = function(a, b) {
R(this, b);
var c = this.t[b], e = k, f = this[Tb](a);
return vn(c) ? (e = this.oj(f, b), e.p = vn(e.p) ? e.p :{}) :xn(c) ? e = {
v:this.g[C](f, c),
f:k,
p:k
} :d(r("Invalid column definition: " + e)), e;
}, Ca(L, function(a, b) {
return this.Ka(a, b).v;
}), L.getFormattedValue = function(a, b) {
var c = this.Ka(a, b);
if (c.f == k) {
var e = this.t[b];
if (vn(e)) e = this[Ob](b), c.f = c.v != k ? ir(c.v, e) :K; else if (xn(e)) {
var f = this[Tb](a);
c.f = this.g[Ed](f, e);
}
}
return c.f;
}, L.getProperty = function(a, b, c) {
return a = this[Ac](a, b)[c], rn(a) ? a :k;
}, L.getProperties = function(a, b) {
var c = this.Ka(a, b);
if (!c.p) {
var c = this[Tb](a), e = this.getTableColumnIndex(b);
return this.g[Ac](c, e);
}
return c.p;
}, L.getColumnProperty = function(a, b) {
R(this, a);
var c = this.t[a];
return xn(c) ? this.g[Lc](c, b) :this[wb](a)[b] || k;
}, L.getColumnProperties = function(a) {
return R(this, a), a = this.t[a], xn(a) ? this.g[wb](a) :a.properties || {};
}, L.getTableProperty = function(a) {
return this.g.getTableProperty(a);
}, L.getTableProperties = function() {
return this.g[Zb]();
}, L.getRowProperty = function(a, b) {
var c = this[Tb](a);
return this.g.getRowProperty(c, b);
}, L.getRowProperties = function(a) {
return ar(this, a), a = this[Tb](a), this.g[Yb](a);
}, L.getColumnRange = function(a) {
return er(this, a);
}, L.getDistinctValues = function(a) {
return gr(this, a);
}, L.getSortedRows = function(a) {
return fr(this, a);
}, L.getFilteredRows = function(a) {
return hr(this, a);
}, L.toDataTable = function() {
var a = this.g;
yn(a[Lb]) && (a = a[Lb]());
var e, f, h, a = Tn(a[Cc]()), b = this[nb](), c = this[yc](), j = [], m = [];
for (e = 0; b > e; e++) h = this.t[e], vn(h) ? (f = qp(h), delete f.calc, delete f.sourceColumn) :xn(h) ? f = a.cols[h] :d(r(tg)), 
j[t](f);
for (f = 0; c > f; f++) {
var s = a[xd][this.Ja ? f :this.Ia[f]], x = [];
for (e = 0; b > e; e++) {
h = this.t[e];
var z;
vn(h) ? z = {
v:this[C](f, e)
} :xn(h) ? z = s.c[this.t[e]] :d(r(tg)), x[t](z);
}
s.c = x, m[t](s);
}
return a.cols = j, a.rows = m, a = new S(a);
}, L.toJSON = function() {
for (var a = {}, b = [], c = 0; c < this.t[D]; c++) {
var e = this.t[c];
(!vn(e) || O(e.calc)) && b[t](e);
}
return 0 == b[D] || (a.columns = b), this.Ja || (a.rows = po(this.Ia)), Qn(a);
};
var Jr = {
emptyString:function() {
return K;
},
error:function(a, b, c) {
var e = c.sourceColumn, f = c.magnitude;
return xn(e) && xn(f) ? (a = a[C](b, e), xn(a) ? c.errorType == vl ? a + a * (f / 100) :a + f :k) :k;
},
stringify:function(a, b, c) {
return c = c.sourceColumn, xn(c) ? a[Ed](b, c) :K;
},
fillFromTop:function(a, b, c) {
return c = c.sourceColumn, xn(c) ? jr(a, b, c, i) :k;
},
fillFromBottom:function(a, b, c) {
return c = c.sourceColumn, xn(c) ? jr(a, b, c, l) :k;
},
identity:function(a, b, c) {
return c = c.sourceColumn, xn(c) ? a[C](b, c) :k;
}
};
wa(Kr[F], function(a) {
this.Kc = a, this.ic();
}), Kr[F].jk = function(a) {
var c, b = {}, e = this.Jc;
return e && (c = em + e), c && (b.tqx = c, a = yr(a, b)), a;
}, Kr[F].ic = function() {
var a = this.jk(this.sd);
this.gk[I](this, Fn(this.kc, this), a);
}, Kr[F].kc = function(a) {
if (a = new lr(a), !a.containsReason(bl)) {
this.Jc = a[Hb]() ? k :a.getDataSignature();
var b = this.Kc;
b[I](b, a);
}
};
var V = {
wf:"google-visualization-errors"
};
V.sg = V.wf + "-", V.vh = V.wf + Af, V.rf = V.wf + "-all-", V.Ke = V.vh + " container is null", 
V.Li = "background-color: #c00000; color: white; padding: 2px;", V.Ni = "background-color: #fff4c2; color: black; white-space: nowrap; padding: 2px; border: 1px solid black;", 
V.Oi = "font: normal 0.8em arial,sans-serif; margin-bottom: 5px;", V.Mi = "font-size: 1.1em; color: #0000cc; font-weight: bold; cursor: pointer; padding-left: 10px; color: black;text-align: right; vertical-align: top;", 
V.rg = 0, V.addError = function(a, b, c, e) {
V.Le(a) || d(r(V.Ke + ". message: " + b));
var c = V.Qi(b, c, e), f = c.errorMessage, b = c.detailedMessage, c = c.options, h = c.showInTooltip != k ? !!c.showInTooltip :i, j = c[B] != $m ? V.Li :V.Ni, j = j + (c[H] ? c[H] :K), m = !!c.removable, e = zp(), f = e.d(im, {
style:j
}, e[mb](f)), j = V.sg + V.rg++, s = e.d(Di, {
id:j,
style:V.Oi
}, f);
return b && (h ? f.title = b :(h = ga[Jb](im), qa(h, b), e[Ua](s, e.d(Di, {
style:ql
}, h)))), m && (b = e.d(im, {
style:V.Mi
}, e[mb](kn)), b.onclick = Gn(V.Ne, s), e[Ua](f, b)), V.Pi(a, s), c.removeDuplicates && V.Ri(a, s), 
j;
}, V.removeAll = function(a) {
V.Le(a) || d(r(V.Ke)), (a = V.qf(a, l)) && (Ra(a[H], al), Np(a));
}, V.addErrorFromQueryResponse = function(a, b) {
if (V.Le(a) || d(r(V.Ke)), b || d(r(V.vh + " response is null")), !b[Hb]() && !b.hasWarning()) return k;
var c = b.getReasons(), e = i;
b[Hb]() && (e = !(mo(c, Sm) || mo(c, tk)));
var c = b.getMessage(), f = b.getDetailedMessage(), e = {
showInTooltip:e
};
return Aa(e, b[Hb]() ? Ni :$m), e.removeDuplicates = i, V[Bc](a, c, f, e);
}, V.removeError = function(a) {
return a = ga[gb](a), V.tf(a) ? (V.Ne(a), i) :l;
}, V.getContainer = function(a) {
return a = ga[gb](a), V.tf(a) ? a[Gd][Gd] :k;
}, V.createProtectedCallback = function(a, b) {
return function() {
try {
a[yd](k, arguments);
} catch (c) {
yn(b) ? b(c) :google[G][Fd][Bc](b, c[Tc]);
}
};
}, V.Ne = function(a) {
var b = a[Gd];
Pp(a), 0 == b[bc][D] && Ra(b[H], al);
}, V.tf = function(a) {
return Lp(a) && a.id && 0 == a.id[hd](V.sg, 0) && (a = a[Gd]) && a.id && 0 == a.id[hd](V.rf, 0) && a[Gd] ? i :l;
}, V.Qi = function(a, b, c) {
var e = a != k && a ? a :Ni, f = K, h = {}, j = arguments[D];
return 2 == j ? b && qn(b) == fl ? h = b :f = b != k ? b :f :3 == j && (f = b != k ? b :f, 
h = c || {}), e = Yn(e), f = Yn(f), {
errorMessage:e,
detailedMessage:f,
options:h
};
}, V.Le = function(a) {
return a != k && Lp(a);
}, V.qf = function(a, b) {
for (var c = a[bc], e = k, f = zp(), h = 0; h < c[D]; h++) if (c[h].id && 0 == c[h].id[hd](V.rf, 0)) {
e = c[h], f.removeNode(e);
break;
}
return !e && b && (e = V.rf + V.rg++, e = Ip(Di, {
id:e,
style:Ci
}, k)), e && ((c = a[Pb]) ? f.re(e, c) :f[Ua](a, e)), e;
}, V.Pi = function(a, b) {
var c = V.qf(a, i);
Ra(c[H], Ih), c[Ua](b);
}, V.Bk = function(a, b) {
var c = V.qf(a, i);
io(c && c[bc], function(a) {
V.tf(a) && b(a);
});
}, V.Ri = function(a, b) {
var c = /id="?google-visualization-errors-[0-9]*"?/, e = Rp(b), e = e[v](c, K), f = [];
return V.Bk(a, function(a) {
if (a != b) {
var j = Rp(a), j = j[v](c, K);
j == e && f[t](a);
}
}), io(f, V.Ne), f[D];
};
var Lr = {
aliceblue:"#f0f8ff",
antiquewhite:"#faebd7",
aqua:"#00ffff",
aquamarine:"#7fffd4",
azure:"#f0ffff",
beige:"#f5f5dc",
bisque:"#ffe4c4",
black:"#000000",
blanchedalmond:"#ffebcd",
blue:"#0000ff",
blueviolet:"#8a2be2",
brown:"#a52a2a",
burlywood:"#deb887",
cadetblue:"#5f9ea0",
chartreuse:"#7fff00",
chocolate:"#d2691e",
coral:"#ff7f50",
cornflowerblue:"#6495ed",
cornsilk:"#fff8dc",
crimson:"#dc143c",
cyan:"#00ffff",
darkblue:"#00008b",
darkcyan:"#008b8b",
darkgoldenrod:"#b8860b",
darkgray:"#a9a9a9",
darkgreen:"#006400",
darkgrey:"#a9a9a9",
darkkhaki:"#bdb76b",
darkmagenta:"#8b008b",
darkolivegreen:"#556b2f",
darkorange:"#ff8c00",
darkorchid:"#9932cc",
darkred:"#8b0000",
darksalmon:"#e9967a",
darkseagreen:"#8fbc8f",
darkslateblue:"#483d8b",
darkslategray:"#2f4f4f",
darkslategrey:"#2f4f4f",
darkturquoise:"#00ced1",
darkviolet:"#9400d3",
deeppink:"#ff1493",
deepskyblue:"#00bfff",
dimgray:"#696969",
dimgrey:"#696969",
dodgerblue:"#1e90ff",
firebrick:"#b22222",
floralwhite:"#fffaf0",
forestgreen:"#228b22",
fuchsia:"#ff00ff",
gainsboro:"#dcdcdc",
ghostwhite:"#f8f8ff",
gold:"#ffd700",
goldenrod:"#daa520",
gray:"#808080",
green:"#008000",
greenyellow:"#adff2f",
grey:"#808080",
honeydew:"#f0fff0",
hotpink:"#ff69b4",
indianred:"#cd5c5c",
indigo:"#4b0082",
ivory:"#fffff0",
khaki:"#f0e68c",
lavender:"#e6e6fa",
lavenderblush:"#fff0f5",
lawngreen:"#7cfc00",
lemonchiffon:"#fffacd",
lightblue:"#add8e6",
lightcoral:"#f08080",
lightcyan:"#e0ffff",
lightgoldenrodyellow:"#fafad2",
lightgray:"#d3d3d3",
lightgreen:"#90ee90",
lightgrey:"#d3d3d3",
lightpink:"#ffb6c1",
lightsalmon:"#ffa07a",
lightseagreen:"#20b2aa",
lightskyblue:"#87cefa",
lightslategray:"#778899",
lightslategrey:"#778899",
lightsteelblue:"#b0c4de",
lightyellow:"#ffffe0",
lime:"#00ff00",
limegreen:"#32cd32",
linen:"#faf0e6",
magenta:"#ff00ff",
maroon:"#800000",
mediumaquamarine:"#66cdaa",
mediumblue:"#0000cd",
mediumorchid:"#ba55d3",
mediumpurple:"#9370d8",
mediumseagreen:"#3cb371",
mediumslateblue:"#7b68ee",
mediumspringgreen:"#00fa9a",
mediumturquoise:"#48d1cc",
mediumvioletred:"#c71585",
midnightblue:"#191970",
mintcream:"#f5fffa",
mistyrose:"#ffe4e1",
moccasin:"#ffe4b5",
navajowhite:"#ffdead",
navy:"#000080",
oldlace:"#fdf5e6",
olive:"#808000",
olivedrab:"#6b8e23",
orange:"#ffa500",
orangered:"#ff4500",
orchid:"#da70d6",
palegoldenrod:"#eee8aa",
palegreen:"#98fb98",
paleturquoise:"#afeeee",
palevioletred:"#d87093",
papayawhip:"#ffefd5",
peachpuff:"#ffdab9",
peru:"#cd853f",
pink:"#ffc0cb",
plum:"#dda0dd",
powderblue:"#b0e0e6",
purple:"#800080",
red:"#ff0000",
rosybrown:"#bc8f8f",
royalblue:"#4169e1",
saddlebrown:"#8b4513",
salmon:"#fa8072",
sandybrown:"#f4a460",
seagreen:"#2e8b57",
seashell:"#fff5ee",
sienna:"#a0522d",
silver:"#c0c0c0",
skyblue:"#87ceeb",
slateblue:"#6a5acd",
slategray:"#708090",
slategrey:"#708090",
snow:"#fffafa",
springgreen:"#00ff7f",
steelblue:"#4682b4",
tan:"#d2b48c",
teal:"#008080",
thistle:"#d8bfd8",
tomato:"#ff6347",
turquoise:"#40e0d0",
violet:"#ee82ee",
wheat:"#f5deb3",
white:"#ffffff",
whitesmoke:"#f5f5f5",
yellow:"#ffff00",
yellowgreen:"#9acd32"
}, Or = /#(.)(.)(.)/, Nr = /^#(?:[0-9a-f]{3}){1,2}$/i, Pr = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
Oa(Sr[F], function() {
return new Sr(this.top, this[Od], this[sd], this[A]);
}), Sr[F].contains = function(a) {
return this && a ? a instanceof Sr ? a[A] >= this[A] && a[Od] <= this[Od] && a.top >= this.top && a[sd] <= this[sd] :a.x >= this[A] && a.x <= this[Od] && a.y >= this.top && a.y <= this[sd] :l;
}, L = Tr[F], L.getProperties = function() {
return {
fill:this.xg,
Re:this.wg,
stroke:this.vg,
Cg:this.Dg,
Se:this.Bg,
zg:this.Ag,
ya:this.ya ? qp(this.ya) :k,
pattern:this.yg
};
}, Oa(L, function() {
return new Tr(this[Ac]());
}), L.gj = function(a) {
this.xg = Rr(a);
}, L.hj = function(a) {
this.wg = q.min(q.max(a, 0), 1);
}, L.jj = function(a, b) {
this.vg = Rr(a), b != k && this.Jg(b);
}, L.Jg = function(a) {
this.Dg = a;
}, L.lj = function(a) {
this.Bg = q.min(q.max(a, 0), 1);
}, L.kj = function(a) {
this.Ag = a;
}, L.ij = function(a) {
this.yg = a;
}, new Tr({
Re:0,
fill:"white",
Se:0,
stroke:"white"
}), Oa(Vr[F], function() {
return new Vr(this[A], this.top, this[u], this[J]);
}), Vr[F].qj = function(a) {
var b = q.max(this[A], a[A]), c = q.min(this[A] + this[u], a[A] + a[u]);
if (c >= b) {
var e = q.max(this.top, a.top), a = q.min(this.top + this[J], a.top + a[J]);
if (a >= e) return sa(this, b), this.top = e, pa(this, c - b), Sa(this, a - e), 
i;
}
return l;
}, Vr[F].contains = function(a) {
return a instanceof Vr ? this[A] <= a[A] && this[A] + this[u] >= a[A] + a[u] && this.top <= a.top && this.top + this[J] >= a.top + a[J] :a.x >= this[A] && a.x <= this[A] + this[u] && a.y >= this.top && a.y <= this.top + this[J];
};
var ls = Io ? "MozUserSelect" :Jo ? "WebkitUserSelect" :k, ps = {
thin:2,
medium:4,
thick:6
}, ss = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/, vs = {
AnnotatedTimeLine:"annotatedtimeline",
AreaChart:ni,
BarChart:ni,
BubbleChart:ni,
CandlestickChart:ni,
ColumnChart:ni,
ComboChart:ni,
Gauge:"gauge",
GeoChart:"geochart",
GeoMap:"geomap",
ImageAreaChart:"imageareachart",
ImageBarChart:"imagebarchart",
ImageCandlestickChart:"imagechart",
ImageChart:"imagechart",
ImageLineChart:"imagelinechart",
ImagePieChart:"imagepiechart",
ImageSparkLine:"imagesparkline",
IntensityMap:"intensitymap",
LineChart:ni,
Map:"map",
MotionChart:"motionchart",
OrgChart:"orgchart",
PieChart:ni,
RangeSelector:ni,
ScatterChart:ni,
SparklineChart:ni,
SteppedAreaChart:ni,
Table:"table",
Timeline:"timeline",
TreeMap:"treemap",
StringFilter:mi,
NumberRangeFilter:mi,
CategoryFilter:mi,
ChartRangeFilter:mi,
Dashboard:mi
};
L = Cs[F], L.$g = k, L.Ud = k, L.vc = k, Oa(L, function() {
var a = new this[Nc](this[Cc]());
return a.vd = this.vd, a;
}), L.draw = function(a) {
a = Cp(a || K), Lp(a) || (a = Cp(this[rd]()), Lp(a) || d(r("The container is null or not defined."))), 
this.vc = a;
try {
if (this.da == k && d(r("The " + this.gd + " type is not defined.")), us(this.da)) this.dh(a); else {
var b = Fn(this.dh, this, a), b = google[G][Fd].createProtectedCallback(b, Fn(this.ef, this, a));
this.Sj(b);
}
} catch (c) {
this.ef(a, c);
}
}, L.toJSON = function() {
return this.Dh(this[pb]());
}, L.Dh = function(a) {
var b = this[qd](), c = g;
return a === k || (c = yn(a[Lb]) ? Tn(a[Lb]()[Cc]()) :Tn(a[Cc]())), a = {
containerId:this[rd]() || g,
dataSourceUrl:this[$c]() || g,
dataTable:c,
options:this[hb]() || g,
state:this[md]() || g,
packages:b === k ? g :b,
refreshInterval:this[ld]() || g,
query:this[wd]() || g,
view:this[xc]() || g
}, a[this.gd + bh] = this.da || g, a[this.gd + Hg] = this[Fb]() || g, this.lh(a), 
Qn(a);
}, L.lh = function() {}, L.getDataSourceUrl = function() {
return this.sd;
}, L.getDataTable = function() {
return this.g;
}, L.Kh = function() {
return this.da;
}, L.getName = function() {
return this.dg;
}, L.yf = function() {
return this[G];
}, L.getContainerId = function() {
return this.cg;
}, L.getQuery = function() {
return this.Ea;
}, L.getRefreshInterval = function() {
return this.tb;
}, L.getOption = function(a, b) {
return Ds(this.Za, a, b);
}, L.getOptions = function() {
return this.Za;
}, L.getState = function() {
return this.Fa;
}, L.setDataSourceUrl = function(a) {
this.sd = a;
}, L.setCustomRequestHandler = function(a) {
this.vd = a;
}, L.getCustomRequestHandler = function() {
return this.vd;
}, L.setDataTable = function(a) {
this.g = a == k ? k :yn(a[Zb]) ? a :sn(a) ? google[G].arrayToDataTable(a) :new google[G].DataTable(a);
}, L.of = function(a) {
this.da = a;
}, L.Bf = function(a) {
this.dg = a;
}, L.setContainerId = function(a) {
this.cg = a;
}, L.setQuery = function(a) {
this.Ea = a;
}, L.setRefreshInterval = function(a) {
this.tb = a;
}, L.setOption = function(a, b) {
var c = this.Za, e = a;
if (b == k) {
if (Ds(c, e) !== k) {
var f = e[Kc](af);
1 < f[D] && (e = f.pop(), c = Ds(c, f[Kd](af))), delete c[e];
}
} else {
e = e[Kc](af), c = c || M, !(e[0] in c) && c[Md] && c[Md](Vm + e[0]);
for (;e[D] && (f = e.shift()); ) !e[D] && rn(b) ? c[f] = b :c = c[f] ? c[f] :c[f] = {};
}
}, L.setOptions = function(a) {
this.Za = a || {};
}, Ga(L, function(a) {
this.Fa = a || {};
}), L.setPackages = function(a) {
this.eg = a;
}, L.setView = function(a) {
this.Bb = a;
}, L.al = function(a) {
a != this[G] && (this.qd = a);
}, L.getSnapshot = function() {
return new this[Nc](this.Dh(this.$g || this[pb]()));
}, L.getView = function() {
return this.Bb;
}, L.getPackages = function() {
return this.eg;
}, L.ef = function(a, b) {
var c = b && b[Tc] || Ni, e = google[G][Fd][Bc](a, c);
google[G][eb].trigger(this, Ni, {
id:e,
message:c
});
}, L.Ak = function(a, b) {
var c = b.getMessage(), e = b.getDetailedMessage(), f = google[G][Fd].addErrorFromQueryResponse(a, b);
google[G][eb].trigger(this, Ni, {
id:f,
message:c,
detailedMessage:e
});
}, L.Nk = function() {
var a = this[qd]();
if (a == k) {
var b = this.da, b = b[v](Tj, K), a = vs[b] || k;
a == k && d(r("Invalid visualization type: " + b));
}
return O(a) && (a = [ a ]), a;
}, L.zd = function(a, b) {
var c = us(this.da);
c || d(r("Invalid " + this.gd + " type: " + this.da)), this.qd && (this.ah(), Na(this, this.qd), 
this.qd = k), this[G] && this[G][Nc] == c && this.Kj(a, this[G]) ? c = this[G] :(this.ah(), 
c = new c(a)), this.Jj(c), this.$g = b;
for (var e = Ur(this[hb]()), e = new W({
chartType:this.da,
dataTable:b,
options:e,
view:this[xc]()
}), f = 0; f < this.Zf[D]; f++) this.Zf[f](e);
c[id](e[pb](), e[hb](), this[md]());
}, L.pushView = function(a) {
sn(this.Bb) ? this.Bb[t](a) :this.Bb = this.Bb === k ? [ a ] :[ this.Bb, a ];
}, L.ok = function(a, b) {
if (b[Hb]()) this.Ak(a, b); else {
var c = b[pb]();
this.zd(a, c);
}
}, L.Jj = function(a) {
var b = this;
this.zk();
var c = [];
io([ El, Rl, Ni, lm ], function(e) {
var f = google[G][eb].addListener(a, e, function(c) {
e == El && Na(b, a), (e == El || e == lm) && yn(a[md]) && b[qc](a[md][I](a)), google[G][eb].trigger(b, e, c);
});
c[t](f);
}), this.Ud = c;
}, L.Sj = function(a) {
var a = {
packages:this.Nk(),
callback:a
}, b = nn(Uj);
b === k && (b = tf), google.load(Zm, b, a);
}, L.dh = function(a) {
var b = this[pb]();
b ? this.zd(a, b) :(b = Fn(this.ok, this, a), b = google[G][Fd].createProtectedCallback(b, Fn(this.ef, this, a)), 
this.sendQuery(b, i));
}, L.sendQuery = function(a, b) {
var c = wn(b) ? b :l, e = this[$c]() || K, e = new google[G].Query(e), f = this[ld]();
f && c && e[$b](f), (c = this[wd]()) && e[Wc](c), e[Eb](a);
}, L.ah = function() {
this[G] && yn(this[G].clearChart) && this[G].clearChart(), Na(this, k);
}, L.zk = function() {
sn(this.Ud) && (io(this.Ud, function(a) {
google[G][eb].removeListener(a);
}), this.Ud = k);
}, L.Kj = function(a, b) {
return b && yn(b[Dd]) ? b[Dd]() == a :l;
}, P(W, Cs), L = W[F], L.getChart = Cs[F].yf, L.setChart = Cs[F].al, L.setChartType = Cs[F].of, 
L.getChartType = Cs[F].Kh, L.setChartName = Cs[F].Bf, L.getChartName = Cs[F][Fb], 
P(X, Cs), L = X[F], L.getControl = Cs[F].yf, L.setControlType = Cs[F].of, L.getControlType = Cs[F].Kh, 
L.setControlName = Cs[F].Bf, L.getControlName = Cs[F][Fb], P(Y, Cs), L = Y[F], L.zd = function(a, b) {
function c(a) {
return h[a];
}
fq(this[G]);
for (var e = new google[G].Dashboard(a), f = this.ec || [], h = this.xa, j = f[D], m = 0; j > m; m++) {
var s = ko(f[m].controls, c), x = ko(f[m].participants, c);
e[ec](s, x);
}
Na(this, e), Y.b.zd[I](this, a, b);
}, L.lh = function(a) {
a.wrappers = this.xa ? ko(this.xa, function(a) {
return a[Cc]();
}) :g, a.bindings = this.ec || g;
}, L.setWrappers = function(a) {
this.xa = a || k, this.mf();
}, L.getWrappers = function() {
return this.xa;
}, L.setBindings = function(a) {
this.ec = a || k, this.mf();
}, L.getBindings = function() {
return this.ec;
}, L.getDashboard = Cs[F].yf, L.setDashboardName = Cs[F].Bf, L.getDashboardName = Cs[F][Fb], 
L.mf = function() {
var a = this.xa, b = this.ec;
(sn(a) ? 0 == a[D] :1) && (sn(b) ? 0 == b[D] :1) || (this.xa = ko(a, this.ak, this), 
this.ec = ko(b, this.$j, this));
}, L.ak = function(a) {
return this.nh(a) || (a = google[G].createWrapper(a)), a[ed](k), a[Hc](k), a;
}, L.$j = function(a) {
var b = a.controls, c = a.participants;
return ((sn(b) ? 0 == b[D] :1) || (sn(c) ? 0 == c[D] :1)) && d(r("invalid binding: " + a)), 
b = ko(b, this.Ih, this), c = ko(c, this.Ih, this), {
controls:b,
participants:c
};
}, L.Ih = function(a) {
if (!/[^0-9]/[Za](a) && (a = ka(a, 10)), xn(a)) return a;
var b = a;
return this.ek(a) ? (this.nh(b) || (b = google[G].createWrapper(b)), this.xa[t](b), 
this.xa[D] - 1) :(a = this.dk(), a = Wn(fo(b)) ? -1 :ho(a, b), -1 == a && d(r("Invalid wrapper name: " + b)), 
a);
}, L.nh = function(a) {
return yn(a[Cc]);
}, L.ek = function(a) {
var b = /${.*}^/;
return vn(a) || O(a) && b[Za](a);
}, L.dk = function() {
return ko(this.xa, function(a) {
return a[Fb]();
});
}, P(Hs, Zp), L = Hs[F], L.ma = k, L.oa = 0, L.Me = l, L.hc = function(a, b, c) {
(this.ma = a) && (this.oa = xn(b) ? b :1 != this.ma[db] ? 0 :this.S ? -1 :1), xn(c) && za(this, c);
}, L.te = function(a) {
this.ma = a.ma, this.oa = a.oa, za(this, a[ac]), this.S = a.S, this.Hd = a.Hd;
}, Oa(L, function() {
return new Hs(this.ma, this.S, !this.Hd, this.oa, this[ac]);
}), L.Zj = function() {
var a = this.S ? 1 :-1;
this.oa == a && (this.oa = -1 * a, za(this, this[ac] + this.oa * (this.S ? -1 :1)));
}, Ma(L, function() {
var a;
if (this.Me) {
(!this.ma || this.Hd && 0 == this[ac]) && d(Yp), a = this.ma;
var b = this.S ? -1 :1;
if (this.oa == b) {
var c = this.S ? a[bd] :a[Pb];
c ? this.hc(c) :this.hc(a, -1 * b);
} else (c = this.S ? a.previousSibling :a[jc]) ? this.hc(c) :this.hc(a[Gd], -1 * b);
za(this, this[ac] + this.oa * (this.S ? -1 :1));
} else this.Me = i;
return (a = this.ma) || d(Yp), a;
}), L.vj = function() {
return 1 == this.oa;
}, L.splice = function() {
var b = this.ma;
this.Zj(), this.S = !this.S, Hs[F].next[I](this), this.S = !this.S;
for (var c = tn(arguments[0]) ? arguments[0] :arguments, e = c[D] - 1; e >= 0; e--) b[Gd] && b[Gd][rb](c[e], b[jc]);
Pp(b);
}, P(Is, Hs), P(Js, Is), L = Js[F], L.H = k, L.A = k, L.L = 0, L.K = 0, L.ka = function() {
return this.H;
}, L.Ga = function() {
return this.A;
}, L.mj = function() {
return this.Me && this.ma == this.A && (!this.K || !this.vj());
}, Ma(L, function() {
return this.mj() && d(Yp), Js.b.next[I](this);
}), L.te = function(a) {
this.H = a.H, this.A = a.A, this.L = a.L, this.K = a.K, this.Tf = a.Tf, Js.b.te[I](this, a);
}, Oa(L, function() {
var a = new Js(this.H, this.L, this.A, this.K, this.Tf);
return a.te(this), a;
}), Ks[F].ug = function(a, b) {
var c = b && !a[Va](), e = a.m;
try {
return c ? 0 <= this.ea(e, 0, 1) && 0 >= this.ea(e, 1, 0) :0 <= this.ea(e, 0, 0) && 0 >= this.ea(e, 1, 1);
} catch (f) {
return Q || d(f), l;
}
}, Ks[F].Hh = function() {
return new Js(this.ka(), this.Va(), this.Ga(), this.xb());
}, P(Ls, Ks), L = Ls[F], Oa(L, function() {
return new this[Nc](this.m.cloneRange());
}), L.getContainer = function() {
return this.m.commonAncestorContainer;
}, L.ka = function() {
return this.m.startContainer;
}, L.Va = function() {
return this.m.startOffset;
}, L.Ga = function() {
return this.m.endContainer;
}, L.xb = function() {
return this.m.endOffset;
}, L.ea = function(a, b, c) {
return this.m.compareBoundaryPoints(1 == c ? 1 == b ? M.Range.START_TO_START :M.Range.START_TO_END :1 == b ? M.Range.END_TO_START :M.Range.END_TO_END, a);
}, L.isCollapsed = function() {
return this.m.collapsed;
}, L.select = function(a) {
var b = Hp(Bp(this.ka()));
this.Ec(b.getSelection(), a);
}, L.Ec = function(a) {
a.removeAllRanges(), a.addRange(this.m);
}, L.collapse = function(a) {
this.m[bb](a);
}, P(Ps, Ls), Ps[F].Ec = function(a, b) {
!b || this[Va]() ? Ps.b.Ec[I](this, a, b) :(a[bb](this.Ga(), this.xb()), a.extend(this.ka(), this.Va()));
}, P(Qs, Ks), L = Qs[F], L.Ha = k, L.H = k, L.A = k, L.L = -1, L.K = -1, Oa(L, function() {
var a = new Qs(this.m.duplicate(), this.$i);
return a.Ha = this.Ha, a.H = this.H, a.A = this.A, a;
}), L.getContainer = function() {
if (!this.Ha) {
var a = this.m.text, b = this.m.duplicate(), c = a[v](/ +$/, K);
if ((c = a[D] - c[D]) && b.moveEnd(ai, -c), c = b.parentElement(), b = b.htmlText[v](/(\r\n|\r|\n)+/g, Sd)[D], 
this[Va]() && b > 0) return this.Ha = c;
for (;b > c.outerHTML[v](/(\r\n|\r|\n)+/g, Sd)[D]; ) c = c[Gd];
for (;1 == c[bc][D] && c.innerText == (3 == c[Pb][db] ? c[Pb].nodeValue :c[Pb].innerText) && Ns(c[Pb]); ) c = c[Pb];
0 == a[D] && (c = this.Sg(c)), this.Ha = c;
}
return this.Ha;
}, L.Sg = function(a) {
for (var b = a[bc], c = 0, e = b[D]; e > c; c++) {
var f = b[c];
if (Ns(f)) {
var h = Rs(f), j = h.htmlText != f.outerHTML;
if (this[Va]() && j ? 0 <= this.ea(h, 1, 1) && 0 >= this.ea(h, 1, 0) :this.m.inRange(h)) return this.Sg(f);
}
}
return a;
}, L.ka = function() {
return this.H || (this.H = this.Cc(1), this[Va]() && (this.A = this.H)), this.H;
}, L.Va = function() {
return 0 > this.L && (this.L = this.Vg(1), this[Va]() && (this.K = this.L)), this.L;
}, L.Ga = function() {
return this[Va]() ? this.ka() :(this.A || (this.A = this.Cc(0)), this.A);
}, L.xb = function() {
return this[Va]() ? this.Va() :(0 > this.K && (this.K = this.Vg(0), this[Va]() && (this.L = this.K)), 
this.K);
}, L.ea = function(a, b, c) {
return this.m.compareEndPoints((1 == b ? Tg :fg) + ah + (1 == c ? Tg :fg), a);
}, L.Cc = function(a, b) {
var c = b || this[Dd]();
if (!c || !c[Pb]) return c;
for (var e = 1 == a, f = 0, h = c[bc][D]; h > f; f++) {
var s, j = e ? f :h - f - 1, m = c[bc][j];
try {
s = Ts(m);
} catch (x) {
continue;
}
var z = s.m;
if (this[Va]()) {
if (Ns(m)) {
if (s.ug(this)) return this.Cc(a, m);
} else if (0 == this.ea(z, 1, 1)) {
this.L = this.K = j;
break;
}
} else {
if (this.ug(s)) {
if (!Ns(m)) {
e ? this.L = j :this.K = j + 1;
break;
}
return this.Cc(a, m);
}
if (0 > this.ea(z, 1, 0) && 0 < this.ea(z, 0, 1)) return this.Cc(a, m);
}
}
return c;
}, L.Aj = function(a, b, c) {
return this.m.compareEndPoints((1 == b ? Tg :fg) + ah + (1 == c ? Tg :fg), Ts(a).m);
}, L.Vg = function(a, b) {
var c = 1 == a, e = b || (c ? this.ka() :this.Ga());
if (1 == e[db]) {
for (var e = e[bc], f = e[D], h = c ? 1 :-1, j = c ? 0 :f - 1; j >= 0 && f > j; j += h) {
var m = e[j];
if (!Ns(m) && 0 == this.Aj(m, a, a)) return c ? j :j + 1;
}
return -1 == j ? 0 :j;
}
return f = this.m.duplicate(), h = Rs(e), f.setEndPoint(c ? gg :Vg, h), f = f.text[D], 
c ? e[D] - f :f;
}, L.isCollapsed = function() {
return 0 == this.m.compareEndPoints(Ug, this.m);
}, L.select = function() {
this.m.select();
}, L.collapse = function(a) {
this.m[bb](a), a ? (this.A = this.H, this.K = this.L) :(this.H = this.A, this.L = this.K);
}, P(Us, Ls), Us[F].Ec = function(a) {
a[bb](this.ka(), this.Va()), (this.Ga() != this.ka() || this.xb() != this.Va()) && a.extend(this.Ga(), this.xb()), 
0 == a.rangeCount && a.addRange(this.m);
}, P(Vs, Ls), Vs[F].ea = function(a, b, c) {
return Wo(wf) ? Vs.b.ea[I](this, a, b, c) :this.m.compareBoundaryPoints(1 == c ? 1 == b ? M.Range.START_TO_START :M.Range.END_TO_START :1 == b ? M.Range.START_TO_END :M.Range.END_TO_END, a);
}, Vs[F].Ec = function(a, b) {
a.removeAllRanges(), b ? a.setBaseAndExtent(this.Ga(), this.xb(), this.ka(), this.Va()) :a.setBaseAndExtent(this.ka(), this.Va(), this.Ga(), this.xb());
}, P($s, dq);
var at = [];
L = $s[F], L.h = function(a, b, c, e, f) {
sn(b) || (at[0] = b, b = at);
for (var h = 0; h < b[D]; h++) {
var j = uq(a, b[h], c || this, e || l, f || this.Rg || this);
this.C[t](j);
}
return this;
}, L.W = function(a, b, c, e, f) {
if (sn(b)) for (var h = 0; h < b[D]; h++) this.W(a, b[h], c, e, f); else {
a:{
if (c = c || this, f = f || this.Rg || this, e = !!e, a = yq(a, b, e)) for (b = 0; b < a[D]; b++) if (!a[b].Ab && a[b].$b == c && a[b][vb] == e && a[b].wd == f) {
a = a[b];
break a;
}
a = k;
}
a && (a = a.key, zq(a), no(this.C, a));
}
return this;
}, L.removeAll = function() {
io(this.C, zq), Ia(this.C, 0);
}, L.j = function() {
$s.b.j[I](this), this[fd]();
}, ya(L, function() {
d(r("EventHandler.handleEvent not implemented"));
}), P(bt, Fq);
var ct = Q || Io && Wo("1.9.3");
L = bt[F], Da(L, 0), Ea(L, 0), ta(L, 0), va(L, 0), L.hg = 0, L.ig = 0, L.cc = 0, 
L.dc = 0, L.lb = i, L.zb = l, L.gg = 0, L.Ti = l, L.Be = l, L.O = function() {
return this.Da;
}, L.bg = function(a) {
this.Ze = a || new Vr(0/0, 0/0, 0/0, 0/0);
}, L.j = function() {
bt.b.j[I](this), xq(this.handle, [ Hm, Rk ], this.Wf, l, this), this.Uf(), Pa(this, k), 
this.Da = this.handle = k;
}, L.Qg = function() {
return rn(this.$a) || (this.$a = es(this[ad])), this.$a;
}, L.Wf = function(a) {
var b = a[B] == Rk;
if (!this.lb || this.zb || b && !a.ke()) this[y](Ii); else {
if (this.xe(a), 0 == this.gg) {
if (!this.fg(a)) return;
this.zb = i, a[qb]();
} else a[qb]();
if (this.Ii(), Da(this, this.hg = a[nc]), Ea(this, this.ig = a[oc]), ta(this, a[zb]), 
va(this, a[Ab]), this.Be) {
var a = this[ad], b = a[Sc], c = a[Mc];
if (!c && Yr(a) == Ri && (c = Bp(a)[pc]), c) {
if (Io) var e = rs(c), b = b + e[A]; else Yo(8) && (e = rs(c), b -= e[A]);
a = es(c) ? c[Ec] - (b + a.offsetWidth) :b;
} else a = b;
} else a = this[ad][Sc];
this.cc = a, this.dc = this[ad][Id], this.Ge = zp(this.l).Tb(), Hn();
}
}, L.Ii = function() {
var a = this.l, b = a[pc], c = !ct;
this.Da.h(a, [ Gm, Sk ], this.Si, c), this.Da.h(a, [ Fm, Vk ], this.rd, c), ct ? (b.setCapture(l), 
this.Da.h(b, Gk, this.rd)) :this.Da.h(Hp(a), Jh, this.rd), Q && this.Ti && this.Da.h(a, Gi, lq), 
this.Vi && this.Da.h(this.Vi, Ql, this.Ui, c);
}, L.fg = function(a) {
return this[y](new dt(km, this, a[nc], a[oc], a));
}, L.Uf = function() {
this.Da[fd](), ct && this.l.releaseCapture();
}, L.rd = function(a, b) {
if (this.Uf(), this.zb) {
this.xe(a), this.zb = l;
var c = this.Gg(this.cc), e = this.Hg(this.dc);
this[y](new dt(Li, this, a[nc], a[oc], a, c, e, b || a[B] == Em));
} else this[y](Ii);
(a[B] == Fm || a[B] == Em) && a[qb]();
}, L.xe = function(a) {
var b = a[B];
b == Hm || b == Gm ? a.Ib(a.V[sb][0], a.currentTarget) :(b == Fm || b == Em) && a.Ib(a.V.changedTouches[0], a.currentTarget);
}, L.Si = function(a) {
if (this.lb) {
this.xe(a);
var b = (this.Be && this.Qg() ? -1 :1) * (a[nc] - this[nc]), c = a[oc] - this[oc];
if (Da(this, a[nc]), Ea(this, a[oc]), ta(this, a[zb]), va(this, a[Ab]), !this.zb) {
var e = this.hg - this[nc], f = this.ig - this[oc];
if (e * e + f * f > this.gg) {
if (!this.fg(a)) return this.mc || this.rd(a), void 0;
this.zb = i;
}
}
c = this.Og(b, c), b = c.x, c = c.y, this.zb && this[y](new dt(Fh, this, a[nc], a[oc], a, b, c)) && (this.Pg(a, b, c, l), 
a[qb]());
}
}, L.Og = function(a, b) {
var c = zp(this.l).Tb(), a = a + (c.x - this.Ge.x), b = b + (c.y - this.Ge.y);
this.Ge = c, this.cc += a, this.dc += b;
var c = this.Gg(this.cc), e = this.Hg(this.dc);
return new vo(c, e);
}, L.Ui = function(a) {
var b = this.Og(0, 0);
Da(a, this[nc]), Ea(a, this[oc]), this.Pg(a, b.x, b.y, i);
}, L.Pg = function(a, b, c) {
this.Ok(b, c), this[y](new dt(Fi, this, a[nc], a[oc], a, b, c));
}, L.Gg = function(a) {
var b = this.Ze, c = ha(b[A]) ? k :b[A], b = ha(b[u]) ? 0 :b[u];
return q.min(c != k ? c + b :fa, q.max(c != k ? c :-fa, a));
}, L.Hg = function(a) {
var b = this.Ze, c = ha(b.top) ? k :b.top, b = ha(b[J]) ? 0 :b[J];
return q.min(c != k ? c + b :fa, q.max(c != k ? c :-fa, a));
}, L.Ok = function(a, b) {
this.Be && this.Qg() ? Ta(this[ad][H], a + Cl) :sa(this[ad][H], a + Cl), this[ad][H].top = b + Cl;
}, P(dt, kq), P(et, Fq), ya(et[F], function(a) {
var b = new mq(a.V);
Aa(b, a[B] == Ti || a[B] == Si ? Ti :Ui), this[y](b);
}), et[F].j = function() {
et.b.j[I](this), zq(this.ni), zq(this.oi), delete this.i;
}, pn(ft), ft[F].Tk = 0, ft[F].tk = function() {
return Af + (this.Tk++)[tc](36);
}, ft.la(), P(gt, Fq), gt[F].uk = ft.la();
var ht = k;
L = gt[F], L.Cd = k, L.q = l, L.i = k, L.$a = k, L.he = k, L.ta = k, L.P = k, L.Aa = k, 
L.ci = l, L.Lb = function() {
return this.Cd || (this.Cd = this.uk.tk());
}, L.a = function() {
return this.i;
}, L.Vf = function(a) {
this.i = a;
}, L.O = function() {
return this.Ub || (this.Ub = new $s(this));
}, L.Yd = function(a) {
this == a && d(r(dh)), a && this.ta && this.Cd && this.ta.ae(this.Cd) && this.ta != a && d(r(dh)), 
this.ta = a, gt.b.Oe[I](this, a);
}, L.getParent = function() {
return this.ta;
}, L.Oe = function(a) {
this.ta && this.ta != a && d(r("Method not supported")), gt.b.Oe[I](this, a);
}, L.r = function() {
return this.Ta;
}, L.d = function() {
this.i = this.Ta[Jb](Di);
}, L.kb = function(a) {
this.Kf(a);
}, L.Kf = function(a, b) {
this.q && d(r($f)), this.i || this.d(), a ? a[rb](this.i, b || k) :this.Ta.l[Xc][Ua](this.i), 
(!this.ta || this.ta.q) && this.I();
}, L.I = function() {
this.q = i, this.hb(function(a) {
!a.q && a.a() && a.I();
});
}, L.T = function() {
this.hb(function(a) {
a.q && a.T();
}), this.Ub && this.Ub[fd](), this.q = l;
}, L.j = function() {
gt.b.j[I](this), this.q && this.T(), this.Ub && (this.Ub.U(), delete this.Ub), this.hb(function(a) {
a.U();
}), !this.ci && this.i && Pp(this.i), this.ta = this.he = this.i = this.Aa = this.P = k;
}, L.Zk = function(a) {
this.he = a;
}, L.Dd = function(a, b) {
this.xc(a, this.Pa(), b);
}, L.xc = function(a, b, c) {
if (a.q && (c || !this.q) && d(r($f)), (0 > b || b > this.Pa()) && d(r("Child component index out of bounds")), 
this.Aa && this.P || (this.Aa = {}, this.P = []), a[Xa]() == this) {
var e = a.Lb();
this.Aa[e] = a, no(this.P, a);
} else {
var e = this.Aa, f = a.Lb();
f in e && d(r('The object already contains the key "' + f + Yd)), e[f] = a;
}
a.Yd(this), ro(this.P, b, 0, a), a.q && this.q && a[Xa]() == this ? (c = this.N(), 
c[rb](a.a(), c[bc][b] || k)) :c ? (this.i || this.d(), b = this.Qa(b + 1), a.Kf(this.N(), b ? b.i :k)) :this.q && !a.q && a.i && a.i[Gd] && a.I();
}, L.N = function() {
return this.i;
}, L.je = function() {
return this.$a == k && (this.$a = es(this.q ? this.i :this.Ta.l[Xc])), this.$a;
}, L.Wb = function(a) {
this.q && d(r($f)), this.$a = a;
}, L.Kk = function() {
return !!this.P && 0 != this.P[D];
}, L.Pa = function() {
return this.P ? this.P[D] :0;
}, L.ae = function(a) {
return this.Aa && a ? (a in this.Aa ? this.Aa[a] :g) || k :k;
}, L.Qa = function(a) {
return this.P ? this.P[a] || k :k;
}, L.hb = function(a, b) {
this.P && io(this.P, a, b);
}, L.Sc = function(a) {
return this.P && a ? ho(this.P, a) :-1;
}, L.removeChild = function(a, b) {
if (a) {
var c = O(a) ? a :a.Lb(), a = this.ae(c);
c && a && (pp(this.Aa, c), no(this.P, a), b && (a.T(), a.i && Pp(a.i)), a.Yd(k));
}
return a || d(r("Child is not in parent component")), a;
}, L.Lk = function(a, b) {
return this[Yc](this.Qa(a), b);
}, L.pg = function(a) {
for (var b = []; this.Kk(); ) b[t](this.Lk(0, a));
return b;
}, P(jt, gt), L = jt[F], L.Zd = k, L.n = l, L.X = k, L.Q = k, L.sa = k, L.w = function() {
return Ij;
}, L.Yc = function() {
return this.X;
}, L.d = function() {
jt.b.d[I](this);
var a = this.a();
xp(a, this.w()), Vp(a, i), ks(a, l), this.fi(), this.ei();
}, L.fi = function() {
this.pi && !this.Q && (this.Q = this.r().d(nk, {
frameborder:0,
style:Nh,
src:uk
}), La(this.Q, this.w() + ze), ks(this.Q, l), js(this.Q, 0)), this.X || (this.X = this.r().d(Di, this.w() + ze), 
ks(this.X, l));
}, L.ei = function() {
this.sa || (this.sa = this.r()[Jb](im), ks(this.sa, l), Vp(this.sa, i), this.sa[H].position = th);
}, L.Yh = function() {
this.Q && Op(this.Q, this.a()), Op(this.X, this.a());
}, L.I = function() {
this.Yh(), jt.b.I[I](this);
var a = this.a();
a[Gd] && a[Gd][rb](this.sa, a[jc]), this.Zd = new et(this.r().l), this.O().h(this.Zd, Ti, this.Xh);
}, L.T = function() {
this.n && this.F(l), fq(this.Zd), jt.b.T[I](this), Pp(this.Q), Pp(this.X), Pp(this.sa);
}, L.F = function(a) {
a != this.n && (this.Sb && this.Sb[sc](), this.qc && this.qc[sc](), this.Vb && this.Vb[sc](), 
this.sc && this.sc[sc](), a ? this.uj() :this.sj());
}, L.uj = function() {
this[y](Hh) && (this.pe(), this.oc(), this.O().h(this.r().Wc(), Kl, this.pe), this.$f(i), 
this[Ib](), this.n = i, this.Sb && this.qc ? (wq(this.Sb, Li, this.bd, l, this), 
this.qc[Wb](), this.Sb[Wb]()) :this.bd());
}, L.sj = function() {
this[y](Gh) && (this.O().W(this.r().Wc(), Kl, this.pe), this.n = l, this.Vb && this.sc ? (wq(this.Vb, Li, this.dd, l, this), 
this.sc[Wb](), this.Vb[Wb]()) :this.dd());
}, L.$f = function(a) {
this.Q && ks(this.Q, a), this.X && ks(this.X, a), ks(this.a(), a), ks(this.sa, a);
}, L.bd = function() {
this[y](dm);
}, L.dd = function() {
this.$f(l), this[y]($j);
}, L.focus = function() {
this.th();
}, L.pe = function() {
this.Q && ks(this.Q, l), this.X && ks(this.X, l);
var a = this.r().l, b = Fp(Hp(a) || ca || ca), c = q.max(b[u], q.max(a[Xc][gd], a[pc][gd])), a = q.max(b[J], q.max(a[Xc][Mb], a[pc][Mb]));
this.Q && (ks(this.Q, i), fs(this.Q, c, a)), this.X && (ks(this.X, i), fs(this.X, c, a));
}, L.oc = function() {
var a = this.r().l, b = Hp(a) || ca;
if (Yr(this.a()) == Ri) var c = a = 0; else c = this.r().Tb(), a = c.x, c = c.y;
var e = gs(this.a()), b = Fp(b || ca), a = q.max(a + b[u] / 2 - e[u] / 2, 0), c = q.max(c + b[J] / 2 - e[J] / 2, 0);
Zr(this.a(), a, c), Zr(this.sa, a, c);
}, L.Xh = function(a) {
a[ad] == this.sa && (a = this.th, yn(a) ? this && (a = Fn(a, this)) :a && typeof a[Xb] == Xi ? a = Fn(a[Xb], a) :d(r(ug)), 
Hq[Gc](a, 0));
}, L.th = function() {
try {
Q && this.r().l[Xc][Ib](), this.a()[Ib]();
} catch (a) {}
}, L.j = function() {
fq(this.Sb), this.Sb = k, fq(this.Vb), this.Vb = k, fq(this.qc), this.qc = k, fq(this.sc), 
this.sc = k, jt.b.j[I](this);
}, P(kt, jt), L = kt[F], L.ti = i, L.Ef = i, L.Ff = i, L.Zh = i, L.$d = .5, L.Wh = K, 
L.ha = K, L.Wa = k, L.Ki = l, L.Qb = k, L.Nc = k, L.If = k, L.Mc = k, L.nc = k, 
L.Oa = k, L.Mb = "dialog", L.w = function() {
return this.ra;
}, Ba(L, function(a) {
this.ha = a, this.nc && qa(this.nc, a);
}), L.vf = function(a) {
this.Mb = a;
}, L.Bd = function() {
this.a() || this.kb();
}, L.N = function() {
return this.Bd(), this.nc;
}, L.Zi = function() {
return this.Bd(), this.Nc;
}, L.Yi = function() {
return this.Bd(), this.Oa;
}, L.Yc = function() {
return this.Bd(), kt.b.Yc[I](this);
}, L.Vh = function(a) {
this.$d = a, this.a() && (a = this.Yc()) && js(a, this.$d);
}, L.bi = function(a) {
if (this.Ff = a, this.q) {
var b = this.r(), c = this.Yc(), e = this.Q;
a ? (e && b.re(e, this.a()), b.re(c, this.a())) :(b.removeNode(e), b.removeNode(c));
}
}, L.ri = function() {
return new bt(this.a(), this.Qb);
}, L.Gf = function(a) {
if (this.a()) {
var b = this.Qb, c = this.ra + Xe;
a ? xp(b, c) :yp(b, c);
}
a && !this.Wa ? (this.Wa = this.ri(), xp(this.Qb, this.ra + Xe), uq(this.Wa, km, this.si, l, this)) :!a && this.Wa && (this.Wa.U(), 
this.Wa = k);
}, L.d = function() {
kt.b.d[I](this);
var a = this.a(), b = this.r();
this.Qb = b.d(Di, {
className:this.ra + Ue,
id:this.Lb()
}, this.Nc = b.d(im, this.ra + Ye, this.Wh), this.Mc = b.d(im, this.ra + We)), Mp(a, this.Qb, this.nc = b.d(Di, this.ra + Ee), this.Oa = b.d(Di, this.ra + Ae)), 
this.If = this.Qb.id, a[Ub](Nl, this.Mb), Ws(a, Bk, this.If || K), this.ha && qa(this.nc, this.ha), 
ks(this.Mc, this.Ef), this.Ra && this.Ra.Uh(this.Oa), ks(this.Oa, !!this.Ra), this.Vh(this.$d);
}, L.I = function() {
kt.b.I[I](this), this.O().h(this.a(), yk, this.Lf).h(this.a(), zk, this.Lf), this.O().h(this.Oa, fi, this.$h), 
this.Gf(this.Zh), this.O().h(this.Mc, fi, this.ai), this.a()[Ub](Nl, this.Mb), this.Nc.id !== K && Ws(this.a(), Bk, this.Nc.id), 
this.Ff || this.bi(l);
}, L.T = function() {
this.n && this.F(l), this.Gf(l), kt.b.T[I](this);
}, L.F = function(a) {
a != this.n && (this.q || this.kb(), kt.b.F[I](this, a));
}, L.bd = function() {
kt.b.bd[I](this), this[y](zh);
}, L.dd = function() {
kt.b.dd[I](this), this[y](yh), this.Ki && this.U();
}, L.focus = function() {
if (kt.b[Ib][I](this), this.Ra) {
var a = this.Ra.Pc;
if (a) for (var f, b = this.r().l, c = this.Oa[mc](Xh), e = 0; f = c[e]; e++) if (f[hc] == a) {
try {
if (Jo || Ho) {
var h = b[Jb](sk);
h[H].cssText = yl, this.a()[Ua](h), h[Ib](), this.a()[Yc](h);
}
f[Ib]();
} catch (j) {}
break;
}
}
}, L.si = function() {
var a = this.r().l, b = Fp(Hp(a) || ca || ca), c = q.max(a[Xc][gd], b[u]), a = q.max(a[Xc][Mb], b[J]), e = gs(this.a());
Yr(this.a()) == Ri ? this.Wa.bg(new Vr(0, 0, q.max(0, b[u] - e[u]), q.max(0, b[J] - e[J]))) :this.Wa.bg(new Vr(0, 0, c - e[u], a - e[J]));
}, L.ai = function() {
if (this.Ef) {
var a = this.Ra, b = a && a.De;
b ? (a = a.get(b), this[y](new ot(b, a)) && this.F(l)) :this.F(l);
}
}, L.j = function() {
this.Oa = this.Mc = k, kt.b.j[I](this);
}, L.$h = function(a) {
if ((a = this.Xj(a[ad])) && !a[Rc]) {
var a = a[hc], b = this.Ra.get(a);
this[y](new ot(a, b)) && this.F(l);
}
}, L.Xj = function(a) {
for (;a != k && a != this.Oa; ) {
if (a[Ad] == Sf) return a;
a = a[Gd];
}
return k;
}, L.Lf = function(a) {
var b = l, c = l, e = this.Ra, f = a[ad];
if (a[B] == yk) if (this.ti && 27 == a[Nb]) {
var h = e && e.De, f = f[Ad] == Pg && !f[Rc];
h && !f ? (c = i, b = e.get(h), b = this[y](new ot(h, b))) :f || (b = i);
} else 9 == a[Nb] && a[zd] && f == this.a() && (c = i); else if (13 == a[Nb]) {
if (f[Ad] == Sf) h = f[hc]; else if (e) {
var j = e.Pc, m = j && e.ui(j), f = (f[Ad] == Xg || f[Ad] == Pg) && !f[Rc];
m && !m[Rc] && !f && (h = j);
}
h && e && (c = i, b = this[y](new ot(h, ma(e.get(h)))));
}
(b || c) && (a[Oc](), a[qb]()), b && this.F(l);
}, P(ot, kq), P(lt, bq), L = lt[F], L.ra = "goog-buttonset", L.Pc = k, L.i = k, 
L.De = k, L.set = function(a, b, c, e) {
return bq[F].set[I](this, a, b), c && (this.Pc = a), e && (this.De = a), this;
}, L.Z = function(a, b, c) {
return this.set(a.key, a.caption, b, c);
}, L.Uh = function(a) {
this.i = a, this.kb();
}, L.kb = function() {
if (this.i) {
qa(this.i, K);
var a = zp(this.i);
aq(this, function(b, c) {
var e = a.d(Xh, {
name:c
}, b);
c == this.Pc && La(e, this.ra + Fe), this.i[Ua](e);
}, this);
}
}, L.a = function() {
return this.i;
}, L.r = function() {
return this.Ta;
}, L.ui = function(a) {
for (var e, b = this.Pk(), c = 0; e = b[c]; c++) if (e[hc] == a || e.id == a) return e;
return k;
}, L.Pk = function() {
return this.i[mc](Sf);
};
var mt = {
key:"ok",
caption:"OK"
}, nt = {
key:"cancel",
caption:"Cancel"
}, pt = {
key:"yes",
caption:"Yes"
}, qt = {
key:"no",
caption:"No"
}, rt = {
key:"save",
caption:"Save"
}, st = {
key:"continue",
caption:"Continue"
};
"undefined" != typeof ga && (new lt().Z(mt, i, i), new lt().Z(mt, i).Z(nt, l, i), 
new lt().Z(pt, i).Z(qt, l, i), new lt().Z(pt).Z(qt, i).Z(nt, l, i), new lt().Z(st).Z(rt).Z(nt, i, i)), 
P(tt, Fq), L = tt[F], L.i = k, L.Fd = k, L.Ue = k, L.Gd = k, L.cb = -1, L.bb = -1, 
L.hf = l;
var ut = {
3:13,
12:144,
63232:38,
63233:40,
63234:37,
63235:39,
63236:112,
63237:113,
63238:114,
63239:115,
63240:116,
63241:117,
63242:118,
63243:119,
63244:120,
63245:121,
63246:122,
63247:123,
63248:44,
63272:46,
63273:36,
63275:35,
63276:33,
63277:34,
63289:144,
63302:45
}, vt = {
Up:38,
Down:40,
Left:37,
Right:39,
Enter:13,
F1:112,
F2:113,
F3:114,
F4:115,
F5:116,
F6:117,
F7:118,
F8:119,
F9:120,
F10:121,
F11:122,
F12:123,
"U+007F":46,
Home:36,
End:35,
PageUp:33,
PageDown:34,
Insert:45
}, wt = Q || Jo && Wo(vf), xt = Co && Io;
L = tt[F], L.yj = function(a) {
Jo && (17 == this.cb && !a[Jc] || 18 == this.cb && !a[uc]) && (this.bb = this.cb = -1), 
wt && !Xs(a[Nb], this.cb, a[zd], a[Jc], a[uc]) ? this[Xb](a) :(this.bb = Io ? Zs(a[Nb]) :a[Nb], 
xt && (this.hf = a[uc]));
}, L.zj = function(a) {
this.bb = this.cb = -1, this.hf = a[uc];
}, ya(L, function(a) {
var c, e, b = a.V, f = b[uc];
Q && a[B] == zk ? (c = this.bb, e = 13 != c && 27 != c ? b[Nb] :0) :Jo && a[B] == zk ? (c = this.bb, 
e = 0 <= b[Gb] && 63232 > b[Gb] && Ys(c) ? b[Gb] :0) :Ho ? (c = this.bb, e = Ys(c) ? b[Nb] :0) :(c = b[Nb] || this.bb, 
e = b[Gb] || 0, xt && (f = this.hf), Co && 63 == e && 224 == c && (c = 191));
var h = c, j = b.keyIdentifier;
c ? c >= 63232 && c in ut ? h = ut[c] :25 == c && a[zd] && (h = 9) :j && j in vt && (h = vt[j]), 
a = h == this.cb, this.cb = h, b = new yt(h, e, a, b), Ha(b, f), this[y](b);
}), L.a = function() {
return this.i;
}, L.Mf = function(a, b) {
this.Gd && this.detach(), this.i = a, this.Fd = uq(this.i, zk, this, b), this.Ue = uq(this.i, yk, this.yj, b, this), 
this.Gd = uq(this.i, Ak, this.zj, b, this);
}, L.detach = function() {
this.Fd && (zq(this.Fd), zq(this.Ue), zq(this.Gd), this.Gd = this.Ue = this.Fd = k), 
this.i = k, this.bb = this.cb = -1;
}, L.j = function() {
tt.b.j[I](this), this.detach();
}, P(yt, mq);
var At;
pn(zt), L = zt[F], L.eb = function() {}, L.d = function(a) {
var b = a.r().d(Di, this.Zb(a)[Kd](Sd), a.ha);
return this.lg(a, b), b;
}, L.N = function(a) {
return a;
}, L.Ad = function(a, b, c) {
if (a = a.a ? a.a() :a) if (Q && !Wo(yf)) {
var e = this.kg(wp(a), b);
e[t](b), Gn(c ? xp :yp, a)[yd](k, e);
} else c ? xp(a, b) :yp(a, b);
}, L.Xg = function(a, b, c) {
this.Ad(a, b, c);
}, L.Nb = function(a) {
a.je() && this.Wb(a.a(), i), a[dd]() && this.qb(a, a.n);
}, L.li = function(a, b) {
var c = b || this.eb();
c && a[Ub](Nl, c);
}, L.lg = function(a, b) {
a[dd]() || this.Ca(b, 1, i), a.Mj() && this.Ca(b, 8, i), a.R(16) && this.Ca(b, 16, a.ie()), 
a.R(64) && this.Ca(b, 64, a.rc());
}, L.Zc = function(a, b) {
ms(a, !b, !Q && !Ho);
}, L.Wb = function(a, b) {
this.Ad(a, this.gc() + Se, b);
}, L.ib = function(a) {
var b;
return a.R(32) && (b = a.M()) ? Up(b) :l;
}, L.qb = function(a, b) {
var c;
if (a.R(32) && (c = a.M())) {
if (!b && a.Yg()) {
try {
c.blur();
} catch (e) {}
a.Yg() && a.pb(k);
}
Up(c) != b && Vp(c, b);
}
}, L.F = function(a, b) {
ks(a, b);
}, Ga(L, function(a, b, c) {
var e = a.a();
if (e) {
var f = this.fd(b);
f && this.Ad(a, f, c), this.Ca(e, b, c);
}
}), L.Ca = function(a, b, c) {
At || (At = {
1:Ai,
8:Sl,
16:di,
64:Oi
}), (b = At[b]) && Ws(a, b, c);
}, Ba(L, function(a, b) {
var c = this.N(a);
if (c && (Np(c), b)) if (O(b)) if (zm in c) c.textContent = b; else if (c[Pb] && 3 == c[Pb][db]) {
for (;c[bd] != c[Pb]; ) c[Yc](c[bd]);
c[Pb].data = b;
} else Np(c), c[Ua](Bp(c)[mb](b)); else {
var e = function(a) {
if (a) {
var b = Bp(c);
c[Ua](O(a) ? b[mb](a) :a);
}
};
sn(b) ? io(b, e) :!tn(b) || $k in b ? e(b) :io(po(b), e);
}
}), L.M = function(a) {
return a.a();
}, L.w = function() {
return yj;
}, L.gc = function() {
return this.w();
}, L.Zb = function(a) {
var b = this.w(), c = [ b ], e = this.gc();
return e != b && c[t](e), b = this.Ej(a[md]()), c[t][yd](c, b), (a = a.wa) && c[t][yd](c, a), 
Q && !Wo(yf) && c[t][yd](c, this.kg(c)), c;
}, L.kg = function(a, b) {
var c = [];
return b && (a = a[jb]([ b ])), io([], function(e) {
lo(e, Gn(mo, a)) && (!b || mo(e, b)) && c[t](e[Kd](ph));
}), c;
}, L.Ej = function(a) {
for (var b = []; a; ) {
var c = a & -a;
b[t](this.fd(c)), a &= ~c;
}
return b;
}, L.fd = function(a) {
return this.uh || this.Ek(), this.uh[a];
}, L.Ek = function() {
var a = this.gc();
this.uh = {
1:a + Ge,
2:a + Le,
4:a + ye,
8:a + Te,
16:a + De,
32:a + Ie,
64:a + Qe
};
};
var Ct = {};
P(Dt, gt), L = Dt[F], L.ha = k, L.Fa = 0, L.pc = 39, L.Rd = 255, L.Md = 0, L.n = i, 
L.wa = k, L.be = i, L.ce = l, L.Mb = k, L.fe = function(a) {
this.q && a != this.be && this.Jf(a), this.be = a;
}, L.M = function() {
return this.k.M(this);
}, L.Tc = function() {
return this.ba || (this.ba = new tt());
}, L.Jk = function(a) {
a && (this.wa ? mo(this.wa, a) || this.wa[t](a) :this.wa = [ a ], this.k.Xg(this, a, i));
}, L.Mk = function(a) {
a && this.wa && (no(this.wa, a), 0 == this.wa[D] && (this.wa = k), this.k.Xg(this, a, l));
}, L.Ad = function(a, b) {
b ? this.Jk(a) :this.Mk(a);
}, L.d = function() {
var a = this.k.d(this);
this.Vf(a), this.k.li(a, this.Mb), this.ce || this.k.Zc(a, l), this.n || this.k.F(a, l);
}, L.vf = function(a) {
this.Mb = a;
}, L.N = function() {
return this.k.N(this.a());
}, L.I = function() {
if (Dt.b.I[I](this), this.k.Nb(this), -2 & this.pc && (this.be && this.Jf(i), this.R(32))) {
var a = this.M();
if (a) {
var b = this.Tc();
b.Mf(a), this.O().h(b, xk, this.pa).h(a, Si, this.Uc).h(a, Jh, this.pb);
}
}
}, L.Jf = function(a) {
var b = this.O(), c = this.a();
a ? (b.h(c, Uk, this.oe).h(c, Rk, this.jb).h(c, Vk, this.ob).h(c, Tk, this.ne), 
this.wc != on && b.h(c, ki, this.wc), Q && b.h(c, ti, this.Sf)) :(b.W(c, Uk, this.oe).W(c, Rk, this.jb).W(c, Vk, this.ob).W(c, Tk, this.ne), 
this.wc != on && b.W(c, ki, this.wc), Q && b.W(c, ti, this.Sf));
}, L.T = function() {
Dt.b.T[I](this), this.ba && this.ba.detach(), this.n && this[dd]() && this.k.qb(this, l);
}, L.j = function() {
Dt.b.j[I](this), this.ba && (this.ba.U(), delete this.ba), delete this.k, this.wa = this.ha = k;
}, Ba(L, function(a) {
this.k[gc](this.a(), a), this.Rf(a);
}), L.Rf = function(a) {
this.ha = a;
}, L.tc = function() {
var a = this.ha;
if (!a) return K;
if (!O(a)) if (sn(a)) a = ko(a, Wp)[Kd](K); else {
if (vp && rk in a) a = a.innerText[v](/(\r\n|\r|\n)/g, Qd); else {
var b = [];
Xp(a, b, i), a = b[Kd](K);
}
a = a[v](/ \xAD /g, Sd)[v](/\xAD/g, K), a = a[v](/\u200B/g, K), vp || (a = a[v](/ +/g, Sd)), 
a != Sd && (a = a[v](/^\s*/, K));
}
return Xn(a);
}, L.Wb = function(a) {
Dt.b.Wb[I](this, a);
var b = this.a();
b && this.k.Wb(b, a);
}, L.Zc = function(a) {
this.ce = a;
var b = this.a();
b && this.k.Zc(b, a);
}, L.F = function(a, b) {
if (b || this.n != a && this[y](a ? dm :$j)) {
var c = this.a();
return c && this.k.F(c, a), this[dd]() && this.k.qb(this, a), this.n = a, i;
}
return l;
}, L.isEnabled = function() {
return !this.ia(1);
}, L.qa = function(a) {
this.lc(2, a) && this[qc](2, a);
}, L.va = function() {
return this.ia(4);
}, L.setActive = function(a) {
this.lc(4, a) && this[qc](4, a);
}, L.Mj = function() {
return this.ia(8);
}, L.Ye = function(a) {
this.lc(8, a) && this[qc](8, a);
}, L.ie = function() {
return this.ia(16);
}, L.xj = function(a) {
this.lc(16, a) && this[qc](16, a);
}, L.Yg = function() {
return this.ia(32);
}, L.oh = function(a) {
this.lc(32, a) && this[qc](32, a);
}, L.rc = function() {
return this.ia(64);
}, L.G = function(a) {
this.lc(64, a) && this[qc](64, a);
}, L.getState = function() {
return this.Fa;
}, L.ia = function(a) {
return !!(this.Fa & a);
}, Ga(L, function(a, b) {
this.R(a) && b != this.ia(a) && (this.k[qc](this, a, b), this.Fa = b ? this.Fa | a :this.Fa & ~a);
}), L.ih = function(a) {
this.Fa = a;
}, L.R = function(a) {
return !!(this.pc & a);
}, L.ja = function(a, b) {
this.q && this.ia(a) && !b && d(r($f)), !b && this.ia(a) && this[qc](a, l), this.pc = b ? this.pc | a :this.pc & ~a;
}, L.Y = function(a) {
return !!(this.Rd & a) && this.R(a);
}, L.hk = function(a, b) {
this.Rd = b ? this.Rd | a :this.Rd & ~a;
}, L.Yf = function(a, b) {
this.Md = b ? this.Md | a :this.Md & ~a;
}, L.lc = function(a, b) {
return !(!this.R(a) || this.ia(a) == b || this.Md & a && !this[y](it(a, b)) || this.mc);
}, L.oe = function(a) {
(!a[$a] || !Qp(this.a(), a[$a])) && this[y](Mi) && this[dd]() && this.Y(2) && this.qa(i);
}, L.ne = function(a) {
a[$a] && Qp(this.a(), a[$a]) || !this[y](Ck) || (this.Y(4) && this[lc](l), this.Y(2) && this.qa(l));
}, L.wc = on, L.jb = function(a) {
this[dd]() && (this.Y(2) && this.qa(i), a.ke() && (this.Y(4) && this[lc](i), this.k.ib(this) && this.M()[Ib]())), 
!this.ce && a.ke() && a[qb]();
}, L.ob = function(a) {
this[dd]() && (this.Y(2) && this.qa(i), this.va() && this.rb(a) && this.Y(4) && this[lc](l));
}, L.Sf = function(a) {
this[dd]() && this.rb(a);
}, L.rb = function(a) {
this.Y(16) && this.xj(!this.ie()), this.Y(8) && this.Ye(i), this.Y(64) && this.G(!this.rc());
var b = new kq(uh, this);
return a && (Ha(b, a[uc]), b.ctrlKey = a[Jc], b.metaKey = a[tb], b.shiftKey = a[zd], 
b.Te = a.Te), this[y](b);
}, L.Uc = function() {
this.Y(32) && this.oh(i);
}, L.pb = function() {
this.Y(4) && this[lc](l), this.Y(32) && this.oh(l);
}, L.pa = function(a) {
return this.n && this[dd]() && this.ua(a) ? (a[qb](), a[Oc](), i) :l;
}, L.ua = function(a) {
return 13 == a[Nb] && this.rb(a);
}, yn(Dt) || d(r("Invalid component class " + Dt)), yn(zt) || d(r("Invalid renderer class " + zt));
var Et = zn(Dt);
Ct[Et] = zt, Bt(yj, function() {
return new Dt(k);
}), P(Ft, zt), pn(Ft), L = Ft[F], L.ed = function(a) {
var b = this.wh[a];
if (!b) {
switch (a) {
case 0:
b = this.gc() + Je;
break;

case 1:
b = this.gc() + Ce;
break;

case 2:
b = this.gc() + Ee;
}
this.wh[a] = b;
}
return b;
}, L.eb = function() {
return Mk;
}, L.d = function(a) {
var b = a.r().d(Di, this.Zb(a)[Kd](Sd), this.vi(a.ha, a.r()));
return this.xi(a, b, a.R(8) || a.R(16)), b;
}, L.N = function(a) {
return a && a[Pb];
}, Ba(L, function(a, b) {
var c = this.N(a), e = this.qe(a) ? c[Pb] :k;
Ft.b[gc][I](this, a, b), e && !this.qe(a) && c[rb](e, c[Pb] || k);
}), L.vi = function(a, b) {
var c = this.ed(2);
return b.d(Di, c, a);
}, L.qe = function(a) {
if (a = this.N(a)) {
var a = a[Pb], b = this.ed(1);
return !!a && mo(wp(a), b);
}
return l;
}, L.xi = function(a, b, c) {
c != this.qe(b) && (c ? xp(b, Jj) :yp(b, Jj), b = this.N(b), c ? (c = this.ed(1), 
b[rb](a.r().d(Di, c), b[Pb] || k)) :b[Yc](b[Pb]));
}, L.fd = function(a) {
switch (a) {
case 2:
return this.ed(0);

case 16:
case 8:
return Kj;

default:
return Ft.b.fd[I](this, a);
}
}, L.w = function() {
return Ej;
}, P(Gt, Dt), L = Gt[F], Ca(L, function() {
var a = this.he;
return a != k ? a :this.tc();
}), Ja(L, function(a) {
this.Zk(a);
}), L.tc = function() {
var a = this.ha;
return sn(a) ? (a = ko(a, function(a) {
var c = wp(a);
return mo(c, Fj) || mo(c, Gj) ? K :Wp(a);
})[Kd](K), Xn(a)) :Gt.b.tc[I](this);
}, L.ob = function(a) {
var b = this[Xa]();
if (b) {
var c = b.Xf;
if (b.Xf = k, (b = c && xn(a[nc])) && (b = new vo(a[nc], a[oc]), b = c == b ? i :c && b ? c.x == b.x && c.y == b.y :l), 
b) return;
}
Gt.b.ob[I](this, a);
}, L.ua = function(a) {
return a[Nb] == this.jg && this.rb(a) ? i :Gt.b.ua[I](this, a);
}, L.wi = function() {
return this.jg;
}, Bt(Ej, function() {
return new Gt(k);
}), It[F].oc = function() {}, P(Jt, It), Jt[F].oc = function(a, b, c) {
Ht(this[Cd], this.ad, a, b, g, c, this.yk);
}, P(Kt, Jt), Kt[F].nk = function() {
return this.Nd;
}, Kt[F].Yk = function(a) {
this.Nd = a;
}, Kt[F].oc = function(a, b, c, e) {
var f = Ht(this[Cd], this.ad, a, b, k, c, 10, e, this.pf);
if (496 & f) {
var h = this.Qd(f, this.ad), b = this.Qd(f, b), f = Ht(this[Cd], h, a, b, k, c, 10, e, this.pf);
496 & f && (h = this.Qd(f, h), b = this.Qd(f, b), Ht(this[Cd], h, a, b, k, c, this.Nd, e, this.pf));
}
}, Kt[F].Qd = function(a, b) {
return 48 & a && (b ^= 2), 192 & a && (b ^= 1), b;
}, P(Lt, Kt);
var Mt, Nt;
Nt = Mt = l;
var Ot = Do();
Ot && (-1 != Ot[w]("Firefox") || -1 != Ot[w]("Camino") || (-1 != Ot[w]("iPhone") || -1 != Ot[w]("iPod") ? Mt = i :-1 != Ot[w]("iPad") ? Nt = i :-1 != Ot[w]("Android") || -1 != Ot[w]("Chrome") || Ot[w]("Safari")));
var Pt = Mt, Qt = Nt;
P(Rt, zt), pn(Rt), L = Rt[F], L.eb = function() {
return Xh;
}, L.Ca = function(a, b, c) {
16 == b ? Ws(a, Al, c) :Rt.b.Ca[I](this, a, b, c);
}, L.d = function(a) {
var b = Rt.b.d[I](this, a), c = a.$c();
return c && this.de(b, c), (c = a[C]()) && this[Dc](b, c), a.R(16) && this.Ca(b, 16, a.ie()), 
b;
}, Ca(L, on), Ja(L, on), L.$c = function(a) {
return a.title;
}, L.de = function(a, b) {
a && (a.title = b || K);
}, L.w = function() {
return wj;
}, P(St, Rt), pn(St), L = St[F], L.eb = function() {}, L.d = function(a) {
return this.Ji(a), a.r().d(Xh, {
"class":this.Zb(a)[Kd](Sd),
disabled:!a[dd](),
title:a.$c() || K,
value:a[C]() || K
}, a.tc() || K);
}, L.Nb = function(a) {
a.O().h(a.a(), fi, a.rb);
}, L.Zc = on, L.Wb = on, L.ib = function(a) {
return a[dd]();
}, L.qb = on, Ga(L, function(a, b, c) {
St.b[qc][I](this, a, b, c), (a = a.a()) && 1 == b && (a.disabled = c);
}), Ca(L, function(a) {
return a[ob];
}), Ja(L, function(a, b) {
a && (a.value = b);
}), L.Ca = on, L.Ji = function(a) {
a.fe(l), a.hk(255, l), a.ja(32, l);
}, P(Tt, Dt), L = Tt[F], Ca(L, function() {
return this.Pf;
}), Ja(L, function(a) {
this.Pf = a, this.k[Dc](this.a(), a);
}), L.$c = function() {
return this.Nf;
}, L.de = function(a) {
this.Nf = a, this.k.de(this.a(), a);
}, L.j = function() {
Tt.b.j[I](this), delete this.Pf, delete this.Nf;
}, L.I = function() {
if (Tt.b.I[I](this), this.R(32)) {
var a = this.M();
a && this.O().h(a, Ak, this.ua);
}
}, L.ua = function(a) {
return 13 == a[Nb] && a[B] == xk || 32 == a[Nb] && a[B] == Ak ? this.rb(a) :32 == a[Nb];
}, Bt(wj, function() {
return new Tt(k);
}), P(Ut, zt), pn(Ut), Ut[F].d = function(a) {
return a.r().d(Di, this.w());
}, Ba(Ut[F], function() {}), Ut[F].w = function() {
return Hj;
}, P(Vt, Dt), Vt[F].I = function() {
Vt.b.I[I](this), this.a()[Ub](Nl, Tl);
}, Bt(Hj, function() {
return new Vt();
}), pn(Wt), L = Wt[F], L.eb = function() {}, L.Qf = function(a, b) {
a && (a.tabIndex = b ? 0 :-1);
}, L.d = function(a) {
return a.r().d(Di, this.Zb(a)[Kd](Sd));
}, L.N = function(a) {
return a;
}, L.Nb = function(a) {
a = a.a(), ms(a, i, Io), Q && (a.hideFocus = i);
var b = this.eb();
b && a[Ub](Nl, b);
}, L.M = function(a) {
return a.a();
}, L.w = function() {
return xj;
}, L.Zb = function(a) {
var b = this.w(), c = [ b, a.Yb == ck ? b + Ke :b + Ze ];
return a[dd]() || c[t](b + Ge), c;
}, P(Xt, gt), L = Xt[F], L.ge = k, L.ba = k, L.k = k, L.Yb = k, L.n = i, L.lb = i, 
L.Ee = i, L.aa = -1, L.J = k, L.ee = l, L.mi = l, L.ki = i, L.Ba = k, L.M = function() {
return this.ge || this.k.M(this);
}, L.Tc = function() {
return this.ba || (this.ba = new tt(this.M()));
}, L.d = function() {
this.Vf(this.k.d(this));
}, L.N = function() {
return this.k.N(this.a());
}, L.I = function() {
Xt.b.I[I](this), this.hb(function(a) {
a.q && this.Cf(a);
}, this);
var a = this.a();
this.k.Nb(this), this.F(this.n, i), this.O().h(this, Mi, this.Vd).h(this, bk, this.Wd).h(this, Pm, this.Xd).h(this, il, this.Qh).h(this, gi, this.Oh).h(a, Rk, this.jb).h(Bp(a), Vk, this.Ph).h(a, [ Rk, Vk, Uk, Tk, ki ], this.Nh), 
this.ib() && this.Df(i);
}, L.Df = function(a) {
var b = this.O(), c = this.M();
a ? b.h(c, Si, this.Uc).h(c, Jh, this.pb).h(this.Tc(), xk, this.pa) :b.W(c, Si, this.Uc).W(c, Jh, this.pb).W(this.Tc(), xk, this.pa);
}, L.T = function() {
this.Pb(-1), this.J && this.J.G(l), this.ee = l, Xt.b.T[I](this);
}, L.j = function() {
Xt.b.j[I](this), this.ba && (this.ba.U(), this.ba = k), this.k = this.J = this.Ba = this.ge = k;
}, L.Vd = function() {
return i;
}, L.Wd = function(a) {
var b = this.Sc(a[ad]);
if (b > -1 && b != this.aa) {
var c = this.Rb();
c && c.qa(l), this.aa = b, c = this.Rb(), this.ee && c[lc](i), this.ki && this.J && c != this.J && (c.R(64) ? c.G(i) :this.J.G(l));
}
Ws(this.a(), wh, a[ad].a().id);
}, L.Xd = function(a) {
a[ad] == this.Rb() && (this.aa = -1), Ws(this.a(), wh, K);
}, L.Qh = function(a) {
(a = a[ad]) && a != this.J && a[Xa]() == this && (this.J && this.J.G(l), this.J = a);
}, L.Oh = function(a) {
a[ad] == this.J && (this.J = k);
}, L.jb = function(a) {
this.lb && this.Ob(i);
var b = this.M();
b && Up(b) ? b[Ib]() :a[qb]();
}, L.Ph = function() {
this.Ob(l);
}, L.Nh = function(a) {
var b = this.Uj(a[ad]);
if (b) switch (a[B]) {
case Rk:
b.jb(a);
break;

case Vk:
b.ob(a);
break;

case Uk:
b.oe(a);
break;

case Tk:
b.ne(a);
break;

case ki:
b.wc(a);
}
}, L.Uj = function(a) {
if (this.Ba) for (var b = this.a(); a && a !== b; ) {
var c = a.id;
if (c in this.Ba) return this.Ba[c];
a = a[Gd];
}
return k;
}, L.Uc = function() {}, L.pb = function() {
this.Pb(-1), this.Ob(l), this.J && this.J.G(l);
}, L.pa = function(a) {
return this[dd]() && this.n && (0 != this.Pa() || this.ge) && this.ua(a) ? (a[qb](), 
a[Oc](), i) :l;
}, L.ua = function(a) {
var b = this.Rb();
if (b && typeof b.pa == Xi && b.pa(a) || this.J && this.J != b && typeof this.J.pa == Xi && this.J.pa(a)) return i;
if (a[zd] || a[Jc] || a[tb] || a[uc]) return l;
switch (a[Nb]) {
case 27:
if (!this.ib()) return l;
this.M().blur();
break;

case 36:
this.Wi();
break;

case 35:
this.Xi();
break;

case 38:
if (this.Yb != Xm) return l;
this.Qe();
break;

case 37:
if (this.Yb != ck) return l;
this.je() ? this.Pe() :this.Qe();
break;

case 40:
if (this.Yb != Xm) return l;
this.Pe();
break;

case 39:
if (this.Yb != ck) return l;
this.je() ? this.Qe() :this.Pe();
break;

default:
return l;
}
return i;
}, L.Cf = function(a) {
var b = a.a(), b = b.id || (b.id = a.Lb());
this.Ba || (this.Ba = {}), this.Ba[b] = a;
}, L.Dd = function(a, b) {
Xt.b.Dd[I](this, a, b);
}, L.xc = function(a, b, c) {
a.Yf(2, i), a.Yf(64, i), (this.ib() || !this.mi) && a.ja(32, l), a.fe(l), Xt.b.xc[I](this, a, b, c), 
a.q && this.q && this.Cf(a), b <= this.aa && this.aa++;
}, L.removeChild = function(a, b) {
if (a = O(a) ? this.ae(a) :a) {
var c = this.Sc(a);
-1 != c && (c == this.aa ? a.qa(l) :c < this.aa && this.aa--), (c = a.a()) && c.id && this.Ba && pp(this.Ba, c.id);
}
return a = Xt.b[Yc][I](this, a, b), a.fe(i), a;
}, L.F = function(a, b) {
if (b || this.n != a && this[y](a ? dm :$j)) {
this.n = a;
var c = this.a();
return c && (ks(c, a), this.ib() && this.k.Qf(this.M(), this.lb && this.n), b || this[y](this.n ? zh :yh)), 
i;
}
return l;
}, L.isEnabled = function() {
return this.lb;
}, L.ib = function() {
return this.Ee;
}, L.qb = function(a) {
a != this.Ee && this.q && this.Df(a), this.Ee = a, this.lb && this.n && this.k.Qf(this.M(), a);
}, L.Pb = function(a) {
(a = this.Qa(a)) ? a.qa(i) :-1 < this.aa && this.Rb().qa(l);
}, L.qa = function(a) {
this.Pb(this.Sc(a));
}, L.Rb = function() {
return this.Qa(this.aa);
}, L.Wi = function() {
this.Od(function(a, b) {
return (a + 1) % b;
}, this.Pa() - 1);
}, L.Xi = function() {
this.Od(function(a, b) {
return a--, 0 > a ? b - 1 :a;
}, 0);
}, L.Pe = function() {
this.Od(function(a, b) {
return (a + 1) % b;
}, this.aa);
}, L.Qe = function() {
this.Od(function(a, b) {
return a--, 0 > a ? b - 1 :a;
}, this.aa);
}, L.Od = function(a, b) {
for (var c = 0 > b ? this.Sc(this.J) :b, e = this.Pa(), c = a[I](this, c, e), f = 0; e >= f; ) {
var h = this.Qa(c);
if (h && this.Wg(h)) return this.Dj(c), i;
f++, c = a[I](this, c, e);
}
return l;
}, L.Wg = function(a) {
return a.n && a[dd]() && a.R(2);
}, L.Dj = function(a) {
this.Pb(a);
}, L.Ob = function(a) {
this.ee = a;
}, P(Yt, zt), pn(Yt), Yt[F].w = function() {
return Dj;
}, P(Zt, Dt), Bt(Dj, function() {
return new Zt(k);
}), P($t, Wt), pn($t), $t[F].eb = function() {
return Lk;
}, $t[F].sb = function(a, b) {
return Qp(a.a(), b);
}, $t[F].w = function() {
return Bj;
}, $t[F].Nb = function(a) {
$t.b.Nb[I](this, a), Ws(a.a(), Wj, Mm);
}, Bt(Hj, function() {
return new Vt();
}), P(au, Xt), L = au[F], L.ue = i, L.Fj = l, L.w = function() {
return this.k.w();
}, L.sb = function(a) {
if (this.k.sb(this, a)) return i;
for (var b = 0, c = this.Pa(); c > b; b++) {
var e = this.Qa(b);
if (typeof e.sb == Xi && e.sb(a)) return i;
}
return l;
}, L.Ua = function(a) {
this.Dd(a, i);
}, L.bc = function(a, b) {
this.xc(a, b, i);
}, L.Lc = function(a) {
return this.Qa(a);
}, L.uf = function() {
return this.Pa();
}, L.hc = function(a, b) {
var c = this.n;
c || ks(this.a(), i);
var e = this.a(), f = a, h = b, j = ds(e);
f instanceof vo && (h = f.y, f = f.x), Zr(e, e[Sc] + (f - j.x), e[Id] + (h - j.y)), 
c || ks(this.a(), l);
}, L.qi = function(a) {
(this.ue = a) && this.qb(i);
}, L.F = function(a, b, c) {
return (b = au.b.F[I](this, a, b)) && a && this.q && this.ue && this.M()[Ib](), 
this.Xf = a && c && xn(c[nc]) ? new vo(c[nc], c[oc]) :k, b;
}, L.Vd = function(a) {
return this.ue && this.M()[Ib](), au.b.Vd[I](this, a);
}, L.Wg = function(a) {
return (this.Fj || a[dd]()) && a.n && a.R(2);
}, L.ua = function(a) {
var b = au.b.ua[I](this, a);
return b || this.hb(function(c) {
!b && c.wi && c.jg == a[Nb] && (this[dd]() && this.qa(c), b = c.pa(a));
}, this), b;
}, P(bu, Rt), pn(bu), L = bu[F], L.d = function(a) {
var b = {
"class":Aj + this.Zb(a)[Kd](Sd),
title:a.$c() || K
}, b = a.r().d(Di, b, this.le(a.ha, a.r()));
return this.lg(a, b), b;
}, L.eb = function() {
return Xh;
}, L.N = function(a) {
return a && a[Pb][Pb];
}, L.le = function(a, b) {
return b.d(Di, Aj + (this.w() + Re), b.d(Di, Aj + (this.w() + Me), a));
}, L.w = function() {
return zj;
}, P(cu, bu), pn(cu), Io && Ba(cu[F], function(a, b) {
var c = cu.b.N[I](this, a && a[Pb]);
if (c) {
var e = this.createCaption(b, zp(a)), f = c[Gd];
f && f.replaceChild(e, c);
}
}), L = cu[F], L.N = function(a) {
return a = cu.b.N[I](this, a && a[Pb]), Io && a && a.__goog_wrapper_div && (a = a[Pb]), 
a;
}, L.le = function(a, b) {
return cu.b.le[I](this, [ this.createCaption(a, b), this.aj(b) ], b);
}, L.createCaption = function(a, b) {
return b.d(Di, Aj + (this.w() + Be), a);
}, L.aj = function(a) {
return a.d(Di, Aj + (this.w() + He), jn);
}, L.w = function() {
return Cj;
}, P(du, Tt), L = du[F], L.Qc = l, L.Th = l, L.I = function() {
du.b.I[I](this), this.e && this.Rc(this.e, i), Ws(this.a(), Wj, Mm);
}, L.T = function() {
if (du.b.T[I](this), this.e) {
this.G(l), this.e.T(), this.Rc(this.e, l);
var a = this.e.a();
a && Pp(a);
}
}, L.j = function() {
du.b.j[I](this), this.e && (this.e.U(), delete this.e), delete this.Rh, this.$.U();
}, L.jb = function(a) {
du.b.jb[I](this, a), this.va() && (this.G(!this.rc(), a), this.e && this.e.Ob(this.rc()));
}, L.ob = function(a) {
du.b.ob[I](this, a), this.e && !this.va() && this.e.Ob(l);
}, L.rb = function() {
return this[lc](l), i;
}, L.hi = function(a) {
this.e && this.e.n && !this.sb(a[ad]) && this.G(l);
}, L.sb = function(a) {
return a && Qp(this.a(), a) || this.e && this.e.sb(a) || l;
}, L.ua = function(a) {
if (32 == a[Nb]) {
if (a[qb](), a[B] != Ak) return i;
} else if (a[B] != xk) return l;
if (this.e && this.e.n) {
var b = this.e.pa(a);
return 27 == a[Nb] ? (this.G(l), i) :b;
}
return 40 == a[Nb] || 38 == a[Nb] || 32 == a[Nb] ? (this.G(i), i) :l;
}, L.ve = function() {
this.G(l);
}, L.ii = function() {
this.va() || this.G(l);
}, L.pb = function(a) {
this.Qc || this.G(l), du.b.pb[I](this, a);
}, L.uc = function() {
return this.e || this.Xc(new au(this.r())), this.e || k;
}, L.Xc = function(a) {
var b = this.e;
return a != b && (b && (this.G(l), this.q && this.Rc(b, l), delete this.e), a) && (this.e = a, 
a.Yd(this), a.F(l), a.qi(this.Qc), this.q && this.Rc(a, i)), b;
}, L.Ua = function(a) {
this.uc().Dd(a, i);
}, L.bc = function(a, b) {
this.uc().xc(a, b, i);
}, L.Lc = function(a) {
return this.e ? this.e.Qa(a) :k;
}, L.uf = function() {
return this.e ? this.e.Pa() :0;
}, L.F = function(a, b) {
var c = du.b.F[I](this, a, b);
return c && !this.n && this.G(l), c;
}, L.gi = function() {
return this.Vc.nk && !!(32 & this.Vc.Nd);
}, L.Bj = function(a) {
this.Qc = a;
}, L.G = function(a, b) {
if (du.b.G[I](this, a), this.e && this.ia(64) == a) {
if (a) this.e.q || (this.Th ? this.e.kb(this.a()[Gd]) :this.e.kb()), this.nb = cs(this.a()), 
this.mb = is(this.a()), this.Hf(), this.e.Pb(-1); else if (this[lc](l), this.e.Ob(l), 
this.a() && Ws(this.a(), wh, K), this.Oc != k) {
this.Oc = g;
var c = this.e.a();
c && fs(c, K, K);
}
this.e.F(a, l, b), this.mc || this.Sh(a);
}
}, L.Hf = function() {
if (this.e.q) {
var a = this.Vc;
this.Vc.element = this.Rh || this.a();
var b = this.e.a();
this.e.n || (Fa(b[H], Zj), ks(b, i)), !this.Oc && this.gi() && (this.Oc = gs(b)), 
a.oc(b, 1 ^ a.ad, this.di, this.Oc), this.e.n || (ks(b, l), Fa(b[H], Ym));
}
}, L.ji = function() {
var a = is(this.a()), b = cs(this.a());
(this.mb != a && (this.mb && a ? this.mb[A] != a[A] || this.mb[u] != a[u] || this.mb.top != a.top || this.mb[J] != a[J] :!0) || this.nb != b && (this.nb && b ? this.nb.top != b.top || this.nb[Od] != b[Od] || this.nb[sd] != b[sd] || this.nb[A] != b[A] :!0)) && (this.mb = a, 
this.nb = b, this.Hf());
}, L.Rc = function(a, b) {
var c = this.O(), e = b ? c.h :c.W;
e[I](c, a, uh, this.ve), e[I](c, a, bk, this.Wd), e[I](c, a, Pm, this.Xd);
}, L.Wd = function(a) {
Ws(this.a(), wh, a[ad].a().id);
}, L.Xd = function() {
this.e.Rb() || Ws(this.a(), wh, K);
}, L.Sh = function(a) {
var b = this.O(), c = a ? b.h :b.W;
c[I](b, this.r().l, Rk, this.hi, i), this.Qc && c[I](b, this.e, Jh, this.ii), c[I](b, this.$, Am, this.ji), 
a ? this.$.start() :this.$[sc]();
}, Bt(Cj, function() {
return new du(k);
}), P(eu, Fq), L = eu[F], L.Eb = k, L.Bh = k, L.uf = function() {
return this.Db[D];
}, L.vk = function(a) {
return a ? ho(this.Db, a) :-1;
}, L.Lc = function(a) {
return this.Db[a] || k;
}, L.sk = function(a) {
a && (io(a, function(a) {
this.Pd(a, l);
}, this), qo(this.Db, a));
}, L.Ua = function(a) {
this.bc(a, this.uf());
}, L.bc = function(a, b) {
a && (this.Pd(a, l), ro(this.Db, b, 0, a));
}, L.Dc = function() {
return this.Eb;
}, L.Fb = function(a) {
a != this.Eb && (this.Pd(this.Eb, l), this.Eb = a, this.Pd(a, i)), this[y](Rl);
}, L.ld = function() {
return this.vk(this.Eb);
}, L.xh = function(a) {
this.Fb(this.Lc(a));
}, L.clear = function() {
var a = this.Db;
if (!sn(a)) for (var b = a[D] - 1; b >= 0; b--) delete a[b];
Ia(a, 0), this.Eb = k;
}, L.j = function() {
eu.b.j[I](this), delete this.Db, this.Eb = k;
}, L.Pd = function(a, b) {
a && (typeof this.Bh == Xi ? this.Bh(a, b) :typeof a.Ye == Xi && a.Ye(b));
}, P(fu, du), L = fu[F], L.u = k, L.se = k, L.I = function() {
fu.b.I[I](this), this.me(), this.Of(), Ws(this.a(), Wj, Pi);
}, L.j = function() {
fu.b.j[I](this), this.u && (this.u.U(), this.u = k), this.se = k;
}, L.ve = function(a) {
this.Fb(a[ad]), fu.b.ve[I](this, a), a[Oc](), this[y](uh);
}, L.bj = function() {
var a = this.Dc();
fu.b[Dc][I](this, a && a[C]()), this.me();
}, L.Xc = function(a) {
var b = fu.b.Xc[I](this, a);
return a != b && (this.u && this.u.clear(), a && (this.u ? a.hb(function(a) {
this.kd(a), this.u.Ua(a);
}, this) :this.we(a))), b;
}, L.Dk = function(a) {
this.se = a, this.me();
}, L.Ua = function(a) {
this.kd(a), fu.b.Ua[I](this, a), this.u ? this.u.Ua(a) :this.we(this.uc());
}, L.bc = function(a, b) {
this.kd(a), fu.b.bc[I](this, a, b), this.u ? this.u.bc(a, b) :this.we(this.uc());
}, L.Fb = function(a) {
if (this.u) {
var b = this.Dc();
this.u.Fb(a), a != b && this[y]($h);
}
}, L.xh = function(a) {
this.u && this.Fb(this.u.Lc(a));
}, Ja(L, function(a) {
if (a != k && this.u) for (var c, b = 0; c = this.u.Lc(b); b++) if (c && typeof c[C] == Xi && c[C]() == a) return this.Fb(c), 
void 0;
this.Fb(k);
}), L.Dc = function() {
return this.u ? this.u.Dc() :k;
}, L.ld = function() {
return this.u ? this.u.ld() :-1;
}, L.we = function(a) {
this.u = new eu(), a && a.hb(function(a) {
this.kd(a), this.u.Ua(a);
}, this), this.Of();
}, L.Of = function() {
this.u && this.O().h(this.u, Rl, this.bj);
}, L.me = function() {
var a = this.Dc();
this[gc](a ? a.tc() :this.se);
}, L.kd = function(a) {
a.vf(a instanceof Gt ? jl :Tl);
}, L.G = function(a, b) {
fu.b.G[I](this, a, b), this.rc() && this.uc().Pb(this.ld());
}, Bt("goog-select", function() {
return new fu(k);
}), L = gu[F], L.ac = k, L.ck = function(a) {
var a = a || [], b = this.vc, c = this.Ta;
c.pg(b), b || d(r("Container is not defined"));
var e = c.d(im, k), f = [ c.d(im, k, Yf), c.d(Di, {
"class":Rj
}, ln) ];
if (this.ac = new fu(f), a) for (f = 0; f < a[D]; f++) {
var h = k, j = a[f], m = j.datasource, s = j.gadget, x = j.userprefs, z = j[G], E = j[pl], ea = j[H] || an;
switch (j[B]) {
case oi:
h = this.Fc(f, Gn(function(a) {
ca[Ya](new Pq(a).md(Jm, ll), mg);
}, m), hg, Mj);
break;

case ek:
h = this.Fc(f, Gn(function(a, b) {
hu(2, {
message:Gf + ea + $d + aa(a) + oe + aa(b) + iu(x) + Zd
});
}, s, m), Mg, Oj);
break;

case vk:
h = this.Fc(f, Gn(function(a, b, c) {
hu(3, {
message:Ff + aa(b) + qe + a + pe + aa(c) + se
});
}, m, E, z), wg, Oj);
break;

case dk:
h = this.Fc(f, Gn(function(a) {
ca[Ya](new Pq(a).md(Jm, ml), mg);
}, m), ig, Mj);
break;

case ok:
h = this.Fc(f, Gn(function(a, b, c) {
ca[Ya](jk + aa(a) + oe + aa(b) + iu(c));
}, s, m, x), Of, Nj);
break;

default:
d(r("No such toolbar component as: " + j.toSource()));
}
h && this.ac.Ua(h);
}
uq(this.ac, uh, Fn(this.Bi, this)), this.ac.kb(e), c[Ua](b, e);
}, L.ik = function() {
this.ac.xh(-1);
}, L.Bi = function() {
var a = this.ac.ld();
this.bh[a](), this.ik();
}, L.Fc = function(a, b, c) {
return c = new Gt(c), this.bh[a] = b, c;
}, n("google.visualization.drawChart", Es), n("google.visualization.drawFromUrl", function(a, b) {
var f, c = new Pq(b || ga[Qc][ud]), e = c.kh(wk);
e != k ? f = e :(f = {}, io(c.fa.Kb(), function(a) {
var b = c.kh(a);
try {
b != k && (b = Tn(b));
} catch (e) {}
f[a] = b;
}), f.options = Cn(f)), Es(f, a);
}), n("google.visualization.createUrl", function(a, b) {
O(a) && (a = Tn(a));
var e, f, c = [];
for (f in a) if (f == kl) {
var j, h = a[f];
for (j in h) e = h[j], O(e) || (e = Qn(e)), c[t](j + If + aa(ma(e)));
} else e = a[f], O(e) || (e = yn(e[Cc]) ? e[Cc]() :Qn(e)), c[t](f + If + aa(ma(e)));
return e = ts() + hf, e = e[v](/^https?:/, K), c = (b || e) + Kf + c[Kd](he), c = c[v](/'/g, ge), 
c = c[v](/"/g, fe);
}), n("google.visualization.createSnippet", function(a) {
var b = ts() + jf, b = b[v](/^https?:/, K), b = Hf + b + be, a = Fs(a)[Cc](), a = a[v](/</g, ke), a = a[v](/>/g, je);
return b = b + a + Rd;
}), n("google.visualization.createWrapper", Fs), n("google.visualization.ChartWrapper", W), 
p(W[F], Hi, W[F][id]), p(W[F], Dm, W[F][Cc]), p(W[F], tj, W[F].getSnapshot), p(W[F], hj, W[F][$c]), 
p(W[F], ij, W[F][pb]), p(W[F], "getChartName", W[F].getChartName), p(W[F], "getChartType", W[F].getChartType), 
p(W[F], "getChart", W[F].getChart), p(W[F], gj, W[F][rd]), p(W[F], oj, W[F][qd]), 
p(W[F], pj, W[F][wd]), p(W[F], qj, W[F][ld]), p(W[F], "getView", W[F][xc]), p(W[F], "getOption", W[F][cd]), 
p(W[F], "getOptions", W[F][hb]), p(W[F], "getState", W[F][md]), p(W[F], "getCustomRequestHandler", W[F].getCustomRequestHandler), 
p(W[F], "pushView", W[F].pushView), p(W[F], "sendQuery", W[F].sendQuery), p(W[F], Yl, W[F][Hc]), 
p(W[F], Zl, W[F][ed]), p(W[F], "setChart", W[F].setChart), p(W[F], "setChartName", W[F].setChartName), 
p(W[F], "setChartType", W[F].setChartType), p(W[F], Xl, W[F].setContainerId), p(W[F], am, W[F].setPackages), 
p(W[F], bm, W[F][Wc]), p(W[F], cm, W[F][$b]), p(W[F], "setView", W[F][Vc]), p(W[F], "setOption", W[F][Pd]), 
p(W[F], $l, W[F].setOptions), p(W[F], "setState", W[F][qc]), p(W[F], "setCustomRequestHandler", W[F].setCustomRequestHandler), 
n("google.visualization.ControlWrapper", X), p(X[F], Hi, X[F][id]), p(X[F], Dm, X[F][Cc]), 
p(X[F], tj, X[F].getSnapshot), p(X[F], hj, X[F][$c]), p(X[F], ij, X[F][pb]), p(X[F], "getControlName", X[F].getControlName), 
p(X[F], "getControlType", X[F].getControlType), p(X[F], "getControl", X[F].getControl), 
p(X[F], gj, X[F][rd]), p(X[F], oj, X[F][qd]), p(X[F], pj, X[F][wd]), p(X[F], qj, X[F][ld]), 
p(X[F], "getView", X[F][xc]), p(X[F], "getOption", X[F][cd]), p(X[F], "getOptions", X[F][hb]), 
p(X[F], "getState", X[F][md]), p(X[F], "sendQuery", X[F].sendQuery), p(X[F], Yl, X[F][Hc]), 
p(X[F], Zl, X[F][ed]), p(X[F], "setControlName", X[F].setControlName), p(X[F], "setControlType", X[F].setControlType), 
p(X[F], Xl, X[F].setContainerId), p(X[F], am, X[F].setPackages), p(X[F], bm, X[F][Wc]), 
p(X[F], cm, X[F][$b]), p(X[F], "setView", X[F][Vc]), p(X[F], "setOption", X[F][Pd]), 
p(X[F], $l, X[F].setOptions), p(X[F], "setState", X[F][qc]), n("google.visualization.DashboardWrapper", Y), 
p(Y[F], Hi, Y[F][id]), p(Y[F], Dm, Y[F][Cc]), p(Y[F], "getBindings", Y[F].getBindings), 
p(Y[F], hj, Y[F][$c]), p(Y[F], ij, Y[F][pb]), p(Y[F], "getDashboard", Y[F].getDashboard), 
p(Y[F], "getDashboardName", Y[F].getDashboardName), p(Y[F], gj, Y[F][rd]), p(Y[F], oj, Y[F][qd]), 
p(Y[F], pj, Y[F][wd]), p(Y[F], qj, Y[F][ld]), p(Y[F], "getView", Y[F][xc]), p(Y[F], "getWrappers", Y[F].getWrappers), 
p(Y[F], "setBindings", Y[F].setBindings), p(Y[F], Yl, Y[F][Hc]), p(Y[F], Zl, Y[F][ed]), 
p(Y[F], "setDashboardName", Y[F].setDashboardName), p(Y[F], Xl, Y[F].setContainerId), 
p(Y[F], am, Y[F].setPackages), p(Y[F], bm, Y[F][Wc]), p(Y[F], cm, Y[F][$b]), p(Y[F], "setView", Y[F][Vc]), 
p(Y[F], tj, Y[F].getSnapshot), p(Y[F], "setWrappers", Y[F].setWrappers), n("google.visualization.drawToolbar", function(a, b) {
new gu(a, b);
}), n("google.visualization.data.avg", function(a) {
return Gs(a) / a[D];
}), n("google.visualization.data.count", function(a) {
return a[D];
}), n("google.visualization.data.group", function(a, b, c) {
function e(a, b, c, e) {
return b[I](k, c[C](e, a));
}
var f = [], h = [];
if (io(b, function(a) {
if (xn(a)) f[t](a); else if (qn(a) == fl) {
var b = a.column;
Qk in a && h[t]([ b, {
calc:Gn(e, b, a.modifier),
type:a[B],
label:a[Hd],
id:a.id
} ]), f[t](b);
}
}), 0 != h[D]) {
for (var j = new google[G][kd](a), m = j.getViewColumns(), s = a[yc](), x = 0; s > x; x++) io(h, function(a) {
m[a[0]] = a[1];
});
j[Ld](m), a = j;
}
var z = new google[G].DataTable(), E = [];
io(f, function(c, e) {
var f = a[Ob](c), h = b[e][Hd] || a[Kb](c);
z[Bd](f, h, b[e].id), E[t](f);
}), c = c || [], io(c, function(b) {
var c = b.column, c = b[Hd] || a[Kb](c);
z[Bd](b[B], c, b.id);
});
var ea = [];
io(f, function(a) {
ea[t]({
column:a
});
});
for (var ba = a[Qb](ea), kb = [], ua = 0; ua < c[D]; ua++) kb[t]([]);
for (ua = 0; ua < ba[D]; ua++) {
if (io(c, function(b, c) {
kb[c][t](a[C](ba[ua], b.column));
}), j = l, ua < ba[D] - 1) for (j = i, s = 0; s < f[D]; s++) {
var x = a[C](ba[ua], f[s]), Db = a[C](ba[ua + 1], f[s]);
if (0 != google[G].datautils.compareValues(E[s], x, Db)) {
j = l;
break;
}
}
if (!j) {
var Z = z.addRow();
io(f, function(b, c) {
z[Dc](Z, c, a[C](ba[ua], b));
});
var $ = b[D];
for (io(c, function(a, b) {
var c = a.aggregation[I](k, kb[b]);
z[Dc](Z, $ + b, c);
}), j = 0; j < c[D]; j++) kb[j] = [];
}
}
return z;
}), n("google.visualization.data.join", function(a, b, c, e, f, h) {
var j = c == Dk || c == Wi, m = c == Ml || c == Wi, s = new google[G].DataTable(), x = [];
io(e, function(c) {
var e = a[Ob](c[0]), f = b[Ob](c[1]);
e != f && d(r("Key types do not match:" + e + xe + f)), f = s[Bd](e, a[Kb](c[0])), 
s[yb](f, a[wb](c[0])), x[t](e);
});
var z = [], E = [];
io(e, function(a) {
z[t]({
column:a[0]
}), E[t]({
column:a[1]
});
});
var ea = a[Qb](z), ba = b[Qb](E);
io(f, function(b) {
var c = s[Bd](a[Ob](b), a[Kb](b));
s[yb](c, a[wb](b));
}), io(h, function(a) {
var c = s[Bd](b[Ob](a), b[Kb](a));
s[yb](c, b[wb](a));
});
for (var kb = l, ua = 0, Db = 0, Z = 0; ua < ea[D] || Db < ba[D]; ) {
var $ = 0, U = [];
if (Db >= ba[D]) {
if (!j) break;
U[0] = ea[ua], $ = -1;
} else if (ua >= ea[D]) {
if (!m) break;
U[1] = ba[Db], $ = 1;
} else {
U[0] = ea[ua], U[1] = ba[Db];
for (var Ka = 0; Ka < e[D]; Ka++) {
var $ = a[C](U[0], e[Ka][0]), N = b[C](U[1], e[Ka][1]), $ = google[G].datautils.compareValues(x[Ka], $, N);
if (0 != $) break;
}
}
if (kb && 0 != $) kb = l, Db++; else {
if (-1 == $ && j || 1 == $ && m || 0 == $) {
s.addRow();
var Ve, ic;
if (-1 == $ && j || 0 == $ && c != Ml ? (Ve = a, ic = 0) :(Ve = b, ic = 1), io(e, function(a, b) {
c == Wi ? s[Dc](Z, b, Ve[C](U[ic], a[ic])) :s[dc](Z, b, Ve[C](U[ic], a[ic]), Ve[Ed](U[ic], a[ic]), Ve[Ac](U[ic], a[ic]));
}), -1 == $ && j || 0 == $) {
var ak = e[D];
io(f, function(b, c) {
s[dc](Z, c + ak, a[C](U[0], b), a[Ed](U[0], b), a[Ac](U[0], b));
});
}
(1 == $ && m || 0 == $) && (ak = f[D] + e[D], io(h, function(a, c) {
s[dc](Z, c + ak, b[C](U[1], a), b[Ed](U[1], a), b[Ac](U[1], a));
})), Z++;
}
1 == $ ? Db++ :ua++, 0 == $ && (kb = i);
}
}
return s;
}), n("google.visualization.data.max", function(a) {
if (0 == a[D]) return k;
for (var b = a[0], c = 1; c < a[D]; c++) {
var e = a[c];
e != k && e > b && (b = e);
}
return b;
}), n("google.visualization.data.min", function(a) {
if (0 == a[D]) return k;
for (var b = a[0], c = 1; c < a[D]; c++) {
var e = a[c];
e != k && b > e && (b = e);
}
return b;
}), n("google.visualization.data.month", function(a) {
return a[vc]() + 1;
}), n("google.visualization.data.sum", Gs), n("__gvizguard__", i), n("google.visualization.Query", qr), 
p(qr[F], Hk, qr[F].makeRequest), p(qr[F], cm, qr[F][$b]), p(qr[F], bm, qr[F][Wc]), 
p(qr[F], "send", qr[F][Eb]), p(qr[F], "setRefreshable", qr[F].setRefreshable), p(qr[F], "setTimeout", qr[F][Gc]), 
p(qr[F], "setHandlerType", qr[F].Xk), p(qr[F], "setHandlerParameter", qr[F].Ch), 
p(qr, "setResponse", Ar), p(qr[F], sh, qr[F][Fc]), n("google.visualization.CustomQuery", Kr), 
p(Kr[F], "send", Kr[F][Eb]), n("google.visualization.QueryResponse", lr), p(lr[F], ij, lr[F][pb]), 
p(lr[F], "isError", lr[F][Hb]), p(lr[F], "hasWarning", lr[F].hasWarning), p(lr[F], "getReasons", lr[F].getReasons), 
p(lr[F], "getMessage", lr[F].getMessage), p(lr[F], "getDetailedMessage", lr[F].getDetailedMessage), 
n("google.visualization.DataTable", S), p(S[F], "addColumn", S[F][Bd]), p(S[F], "addRow", S[F].addRow), 
p(S[F], "addRows", S[F][kc]), p(S[F], "clone", S[F][Zc]), p(S[F], "getColumnId", S[F].getColumnId), 
p(S[F], aj, S[F].getColumnIndex), p(S[F], bj, S[F][Kb]), p(S[F], cj, S[F][Pc]), 
p(S[F], ej, S[F][Lc]), p(S[F], dj, S[F][wb]), p(S[F], fj, S[F].getColumnRange), 
p(S[F], "getColumnRole", S[F].getColumnRole), p(S[F], "getColumnType", S[F][Ob]), 
p(S[F], jj, S[F].getDistinctValues), p(S[F], kj, S[F].getFilteredRows), p(S[F], lj, S[F][Ed]), 
p(S[F], mj, S[F][nb]), p(S[F], nj, S[F][yc]), p(S[F], "getProperties", S[F][Ac]), 
p(S[F], "getProperty", S[F].getProperty), p(S[F], sj, S[F].getRowProperty), p(S[F], rj, S[F][Yb]), 
p(S[F], "getSortedRows", S[F][Qb]), p(S[F], vj, S[F].getTableProperty), p(S[F], uj, S[F][Zb]), 
p(S[F], "getValue", S[F][C]), p(S[F], "insertColumn", S[F].insertColumn), p(S[F], "insertRows", S[F].insertRows), 
p(S[F], "removeColumn", S[F].removeColumn), p(S[F], "removeColumns", S[F].removeColumns), 
p(S[F], "removeRow", S[F].removeRow), p(S[F], "removeRows", S[F].removeRows), p(S[F], "setCell", S[F][dc]), 
p(S[F], "setColumnLabel", S[F].setColumnLabel), p(S[F], "setColumnProperties", S[F][yb]), 
p(S[F], "setColumnProperty", S[F].setColumnProperty), p(S[F], "setFormattedValue", S[F].setFormattedValue), 
p(S[F], "setProperties", S[F].setProperties), p(S[F], "setProperty", S[F].setProperty), 
p(S[F], "setRowProperties", S[F].setRowProperties), p(S[F], "setRowProperty", S[F].setRowProperty), 
p(S[F], "setTableProperties", S[F].setTableProperties), p(S[F], "setTableProperty", S[F].setTableProperty), 
p(S[F], "setValue", S[F][Dc]), p(S[F], "sort", S[F].sort), p(S[F], Dm, S[F][Cc]), 
n("google.visualization.DataView", T), p(T, "fromJSON", function(a, b) {
O(b) && (b = Tn(b));
var c = new T(a), e = b.columns, f = b[xd];
return e != k && c[Ld](e), f != k && c.setRows(f), c;
}), p(T[F], "getColumnId", T[F].getColumnId), p(T[F], aj, T[F].getColumnIndex), 
p(T[F], bj, T[F][Kb]), p(T[F], cj, T[F][Pc]), p(T[F], ej, T[F][Lc]), p(T[F], ej, T[F][Lc]), 
p(T[F], dj, T[F][wb]), p(T[F], fj, T[F].getColumnRange), p(T[F], "getColumnRole", T[F].getColumnRole), 
p(T[F], "getColumnType", T[F][Ob]), p(T[F], jj, T[F].getDistinctValues), p(T[F], kj, T[F].getFilteredRows), 
p(T[F], lj, T[F][Ed]), p(T[F], mj, T[F][nb]), p(T[F], nj, T[F][yc]), p(T[F], "getProperties", T[F][Ac]), 
p(T[F], "getProperty", T[F].getProperty), p(T[F], sj, T[F].getRowProperty), p(T[F], rj, T[F][Yb]), 
p(T[F], "getSortedRows", T[F][Qb]), p(T[F], "getTableColumnIndex", T[F].getTableColumnIndex), 
p(T[F], "getUnderlyingTableColumnIndex", T[F].getUnderlyingTableColumnIndex), p(T[F], "getTableRowIndex", T[F][Tb]), 
p(T[F], "getUnderlyingTableRowIndex", T[F].getUnderlyingTableRowIndex), p(T[F], vj, T[F].getTableProperty), 
p(T[F], uj, T[F][Zb]), p(T[F], "getValue", T[F][C]), p(T[F], "getViewColumnIndex", T[F].getViewColumnIndex), 
p(T[F], "getViewColumns", T[F].getViewColumns), p(T[F], "getViewRowIndex", T[F].getViewRowIndex), 
p(T[F], "getViewRows", T[F].getViewRows), p(T[F], "hideColumns", T[F].hideColumns), 
p(T[F], "hideRows", T[F].hideRows), p(T[F], "setColumns", T[F][Ld]), p(T[F], "setRows", T[F].setRows), 
p(T[F], "toDataTable", T[F][Lb]), p(T[F], Dm, T[F][Cc]), n("google.visualization.errors", V), 
p(V, "addError", V[Bc]), p(V, "removeAll", V[fd]), p(V, "removeError", V.removeError), 
p(V, "addErrorFromQueryResponse", V.addErrorFromQueryResponse), p(V, "getContainer", V[Dd]), 
p(V, "createProtectedCallback", V.createProtectedCallback), n("google.visualization.events.addListener", function(a, b, c) {
return a = Fr(a), b = uq(a, b, function(a) {
c(a.Uk);
}), new Gr(b);
}), n("google.visualization.events.trigger", function(a, b, c) {
a = Fr(a), Eq(a, new Hr(b, c));
}), n("google.visualization.events.removeListener", function(a) {
return a = a && yn(a.getKey) && a.getKey(), xn(a) ? zq(a) :l;
}), n("google.visualization.events.removeAllListeners", function(a) {
var b = Fr(a), b = Bq(b);
return fq(a.__eventTarget), a.__eventTarget = g, b;
}), n("google.visualization.QueryWrapper", Ir), p(Ir[F], $l, Ir[F].setOptions), 
p(Ir[F], Hi, Ir[F][id]), p(Ir[F], "setCustomErrorHandler", Ir[F].Wk), p(Ir[F], "sendAndDraw", Ir[F].sendAndDraw), 
p(Ir[F], "setCustomPostResponseHandler", Ir[F].setCustomPostResponseHandler), p(Ir[F], "setCustomResponseHandler", Ir[F].setCustomResponseHandler), 
p(Ir[F], sh, Ir[F][Fc]), n("google.visualization.arrayToDataTable", function(a, b) {
var e, f, h, c = new S();
if (sn(a) || d(r("Not an array")), 0 == a[D]) return c;
sn(a[0]) || d(r(Ig));
var j = a[0][D];
for (e = 1; e < a[D]; e++) (!sn(a[e]) || a[e][D] != j) && d(r(Ig));
var m = (e = !b) ? a[0] :[], s = e ? a[cb](1, a[D]) :a, x = [];
for (f = 0; j > f; f++) {
var z = nm;
for (e = 0; e < s[D]; e++) if (h = s[e][f], h != k) {
O(h) ? z = nm :xn(h) ? z = dl :sn(h) ? z = Bm :wn(h) ? z = Lh :(un(h) && d(r("Date and datetime column types are not supported")), 
d(r("Invalid value in " + e + we + f)));
break;
}
x[f] = z;
}
for (f = 0; j > f; f++) c[Bd](x[f], m[f]);
return c[kc](s), c;
}), n("google.visualization.datautils.compareValues", dr), n("google.visualization.dataTableToCsv", function(a) {
for (var b = K, c = 0; c < a[yc](); c++) {
for (var e = 0; e < a[nb](); e++) {
e > 0 && (b += we);
var f = a[Ed](c, e), f = f[v](oa(Yd, Yi), ae), h = -1 != f[w](we), j = -1 != f[w](Qd), m = -1 != f[w](Yd);
(h || j || m) && (f = Yd + f + Yd), b += f;
}
b += Qd;
}
return b;
}), n("google.visualization.GadgetHelper", Br), p(Br[F], "createQueryFromPrefs", Br[F].createQueryFromPrefs), 
p(Br[F], "validateResponse", Br[F].validateResponse);
}
}(), function() {
function h(a) {
throw a;
}
function pa(a, b) {
return a.width = b;
}
function qa(a, b) {
return a.text = b;
}
function ra(a, b) {
return a.round = b;
}
function sa(a, b) {
return a.fontFamily = b;
}
function ta(a, b) {
return a.data = b;
}
function ua(a, b) {
return a.ceil = b;
}
function va(a, b) {
return a.floor = b;
}
function wa(a, b) {
return a.stroked = b;
}
function xa(a, b) {
return a.color = b;
}
function ya(a, b) {
return a.currentTarget = b;
}
function Aa(a, b) {
return a.left = b;
}
function Ba(a, b) {
return a.format = b;
}
function Ca(a, b) {
return a.keyCode = b;
}
function Da(a, b) {
return a.type = b;
}
function Ea(a, b) {
return a.clear = b;
}
function Fa(a, b) {
return a.orientation = b;
}
function Ha(a, b) {
return a.getValue = b;
}
function Ia(a, b) {
return a.visible = b;
}
function Ja(a, b) {
return a.visibility = b;
}
function Ka(a, b) {
return a.length = b;
}
function La(a, b) {
return a.title = b;
}
function Ma(a, b) {
return a.position = b;
}
function Na(a, b) {
return a.cursor = b;
}
function Oa(a, b) {
return a.className = b;
}
function Pa(a, b) {
return a.index = b;
}
function Qa(a, b) {
return a.next = b;
}
function Ra(a, b) {
return a.fontSize = b;
}
function Sa(a, b) {
return a.clone = b;
}
function Ta(a, b) {
return a.target = b;
}
function Ua(a, b) {
return a.anchor = b;
}
function Va(a, b) {
return a.start = b;
}
function Xa(a, b) {
return a.bottom = b;
}
function Ya(a, b) {
return a.contains = b;
}
function Za(a, b) {
return a.display = b;
}
function $a(a, b) {
return a.height = b;
}
function ab(a, b) {
return a.right = b;
}
function gr(a, b) {
for (var e, c = a[zc](Ge), d = b || fr; e = c.shift(); ) {
if (d[e] == l) return l;
d = d[e];
}
return d;
}
function hr() {}
function ir(a) {
var b = typeof a;
if (b == Wm) {
if (!a) return Tm;
if (a instanceof ia) return zh;
if (a instanceof da) return b;
var c = da[M][kc][P](a);
if (c == Mg) return Wm;
if (c == Kg || typeof a[L] == Um && "undefined" != typeof a[od] && "undefined" != typeof a[nc] && !a[nc](dp)) return zh;
if (c == Lg || "undefined" != typeof a[P] && "undefined" != typeof a[nc] && !a[nc](oi)) return W;
} else if (b == W && "undefined" == typeof a[P]) return Wm;
return b;
}
function jr(a) {
return a !== aa;
}
function kr(a) {
return a === l;
}
function lr(a) {
return a != l;
}
function mr(a) {
return ir(a) == zh;
}
function nr(a) {
var b = ir(a);
return b == zh || b == Wm && typeof a[L] == Um;
}
function or(a) {
return pr(a) && typeof a[Yc] == W;
}
function qr(a) {
return typeof a == op;
}
function rr(a) {
return typeof a == Um;
}
function sr(a) {
return ir(a) == W;
}
function pr(a) {
var b = typeof a;
return b == Wm && a != l || b == W;
}
function tr(a) {
return a[ur] || (a[ur] = ++vr);
}
function wr(a) {
return a[P][gd](a.bind, arguments);
}
function xr(a, b) {
if (a || h(u()), 2 < arguments[L]) {
var d = ia[M][hb][P](arguments, 2);
return function() {
var c = ia[M][hb][P](arguments);
return ia[M].unshift[gd](c, d), a[gd](b, c);
};
}
return function() {
return a[gd](b, arguments);
};
}
function Z() {
return Z = Function[M].bind && -1 != Function[M].bind[kc]()[yb](Pm) ? wr :xr, Z[gd](l, arguments);
}
function yr(a) {
var c = ia[M][hb][P](arguments, 1);
return function() {
var b = ia[M][hb][P](arguments);
return b.unshift[gd](b, c), a[gd](this, b);
};
}
function Ar(a, b) {
function c() {}
c.prototype = b[M], a.lc = b[M], a.prototype = new c(), a[M].constructor = a;
}
function Br() {}
function Dr(a) {
a && typeof a.pi == W && a.pi();
}
function Cr() {
for (var b = 0, c = arguments[L]; c > b; ++b) {
var d = arguments[b];
nr(d) ? Cr[gd](l, d) :Dr(d);
}
}
function Er(a, b) {
return b ? a[ib](Fr, qe)[ib](Gr, se)[ib](Hr, re)[ib](Ir, te) :Jr[eb](a) ? (-1 != a[yb](pe) && (a = a[ib](Fr, qe)), 
-1 != a[yb](Af) && (a = a[ib](Gr, se)), -1 != a[yb](Nf) && (a = a[ib](Hr, re)), 
-1 != a[yb](Hd) && (a = a[ib](Ir, te)), a) :a;
}
function Kr(a, b) {
for (var c = 0, d = na(a)[ib](/^[\s\xa0]+|[\s\xa0]+$/g, U)[zc](Ge), e = na(b)[ib](/^[\s\xa0]+|[\s\xa0]+$/g, U)[zc](Ge), f = s.max(d[L], e[L]), g = 0; 0 == c && f > g; g++) {
var i = d[g] || U, k = e[g] || U, m = RegExp(ve, wk), p = RegExp(ve, wk);
do {
var q = m.exec(i) || [ U, U, U ], t = p.exec(k) || [ U, U, U ];
if (0 == q[0][L] && 0 == t[0][L]) break;
c = ((0 == q[1][L] ? 0 :la(q[1], 10)) < (0 == t[1][L] ? 0 :la(t[1], 10)) ? -1 :(0 == q[1][L] ? 0 :la(q[1], 10)) > (0 == t[1][L] ? 0 :la(t[1], 10)) ? 1 :0) || ((0 == q[2][L]) < (0 == t[2][L]) ? -1 :(0 == q[2][L]) > (0 == t[2][L]) ? 1 :0) || (q[2] < t[2] ? -1 :q[2] > t[2] ? 1 :0);
} while (0 == c);
}
return c;
}
function Lr(a) {
var b = ja(a);
return 0 == b && /^[\s\xa0]*$/[eb](a) ? 0/0 :b;
}
function Mr(a) {
return a[a[L] - 1];
}
function Sr(a, b, c, d) {
if (a.reduce) return d ? a.reduce(Z(b, d), c) :a.reduce(b, c);
var e = c;
return Pr(a, function(c, g) {
e = b[P](d, e, c, g, a);
}), e;
}
function Vr(a, b, c) {
return b = Wr(a, b, c), 0 > b ? l :qr(a) ? a[qb](b) :a[b];
}
function Wr(a, b, c) {
for (var d = a[L], e = qr(a) ? a[zc](U) :a, f = 0; d > f; f++) if (f in e && b[P](c, e[f], f, a)) return f;
return -1;
}
function Xr(a, b, c) {
a:{
for (var d = qr(a) ? a[zc](U) :a, e = a[L] - 1; e >= 0; e--) if (e in d && b[P](c, d[e], e, a)) {
b = e;
break a;
}
b = -1;
}
return 0 > b ? l :qr(a) ? a[qb](b) :a[b];
}
function Yr(a, b) {
var d, c = Or(a, b);
return (d = c >= 0) && Nr[od][P](a, c, 1), d;
}
function Zr() {
return Nr[pb][gd](Nr, arguments);
}
function $r(a) {
var b = a[L];
if (b > 0) {
for (var c = ia(b), d = 0; b > d; d++) c[d] = a[d];
return c;
}
return [];
}
function as(a) {
for (var c = 1; c < arguments[L]; c++) {
var e, d = arguments[c];
if (mr(d) || (e = nr(d)) && d[Jc](pi)) a[x][gd](a, d); else if (e) for (var f = a[L], g = d[L], i = 0; g > i; i++) a[f + i] = d[i]; else a[x](d);
}
}
function bs(a) {
return Nr[od][gd](a, cs(arguments, 1));
}
function cs(a, b, c) {
return 2 >= arguments[L] ? Nr[hb][P](a, b) :Nr[hb][P](a, b, c);
}
function ds(a, b, c, d, e) {
for (var i, f = 0, g = a[L]; g > f; ) {
var m, k = f + g >> 1;
m = c ? b[P](e, a[k], k, a) :b(d, a[k]), m > 0 ? f = k + 1 :(g = k, i = !m);
}
return i ? f :~f;
}
function es(a, b) {
Nr.sort[P](a, b || fs);
}
function fs(a, b) {
return a > b ? 1 :b > a ? -1 :0;
}
function gs(a, b) {
for (var c = [], d = 0; b > d; d++) c[d] = a;
return c;
}
function hs() {
if (!arguments[L]) return [];
for (var b = [], c = 0; ;c++) {
for (var d = [], e = 0; e < arguments[L]; e++) {
var f = arguments[e];
if (c >= f[L]) return b;
d[x](f[c]);
}
b[x](d);
}
}
function is(a, b, c) {
return s.min(s.max(a, b), c);
}
function js(a, b) {
var c = a % b;
return 0 > c * b ? c + b :c;
}
function ks(a) {
return a * s.PI / 180;
}
function ls() {
return Sr(arguments, function(a, c) {
return a + c;
}, 0);
}
function ms() {
return ls[gd](l, arguments) / arguments[L];
}
function $(a, b) {
this.x = jr(a) ? a :0, this.y = jr(b) ? b :0;
}
function ns(a, b) {
return a == b ? j :a && b ? a.x == b.x && a.y == b.y :n;
}
function os(a, b) {
return new $(a.x - b.x, a.y - b.y);
}
function ps(a, b) {
return new $(a.x + b.x, a.y + b.y);
}
function qs(a, b) {
pa(this, a), $a(this, b);
}
function rs(a, b, c) {
for (var d in a) b[P](c, a[d], d, a);
}
function ss(a, b, c) {
var e, d = {};
for (e in a) d[e] = b[P](c, a[e], e, a);
return d;
}
function ts(a) {
for (var b in a) return a[b];
}
function us(a) {
var d, b = [], c = 0;
for (d in a) b[c++] = a[d];
return b;
}
function vs(a) {
var d, b = [], c = 0;
for (d in a) b[c++] = d;
return b;
}
function ws(a, b) {
for (var c in a) if (a[c] == b) return j;
return n;
}
function xs(a) {
var c, b = {};
for (c in a) b[c] = a[c];
return b;
}
function ys(a) {
var b = ir(a);
if (b == Wm || b == zh) {
if (a[Oc]) return a[Oc]();
var c, b = b == zh ? [] :{};
for (c in a) b[c] = ys(a[c]);
return b;
}
return a;
}
function As(a) {
for (var c, d, e = 1; e < arguments[L]; e++) {
d = arguments[e];
for (c in d) a[c] = d[c];
for (var f = 0; f < zs[L]; f++) c = zs[f], da[M][Jc][P](d, c) && (a[c] = d[c]);
}
}
function Gs() {
return fr.navigator ? fr.navigator.userAgent :l;
}
function Hs() {
return fr.navigator;
}
function Zs(a) {
return Ys[a] || (Ys[a] = 0 <= Kr(Xs, a));
}
function at(a) {
return $s[a] || ($s[a] = Ls && !!ea[bd] && ea[bd] >= a);
}
function dt(a) {
var c;
c = a.className, c = qr(c) && c.match(/\S+/g) || [];
for (var d = cs(arguments, 1), e = c[L] + d[L], f = c, g = 0; g < d[L]; g++) 0 <= Or(f, d[g]) || f[x](d[g]);
return Oa(a, c[pd](vd)), c[L] == e;
}
function et(a) {
return a ? new ft(gt(a)) :bt || (bt = new ft());
}
function ht(a, b) {
rs(b, function(b, d) {
d == up ? a[O].cssText = b :d == Ti ? Oa(a, b) :d == mk ? a.htmlFor = b :d in it ? a[H](it[d], b) :0 == d[Uc](yh, 0) || 0 == d[Uc](yj, 0) ? a[H](d, b) :a[d] = b;
});
}
function jt() {
return kt(ea, arguments);
}
function kt(a, b) {
var c = b[0], d = b[1];
if (!ct && d && (d[$b] || d[I])) {
if (c = [ Af, c ], d[$b] && c[x](Cd, Er(d[$b]), Hd), d[I]) {
c[x](Ed, Er(d[I]), Hd);
var e = {};
As(e, d), delete e[I], d = e;
}
c[x](Nf), c = c[pd](U);
}
var f = a[Ib](c);
if (d && (qr(d) ? Oa(f, d) :mr(d) ? dt[gd](l, [ f ][pb](d)) :ht(f, d)), 2 < b[L]) for (d = function(b) {
b && f[v](qr(b) ? a[sb](b) :b);
}, c = 2; c < b[L]; c++) if (e = b[c], !nr(e) || pr(e) && 0 < e[kb]) d(e); else {
var i, g = Pr;
a:{
if ((i = e) && typeof i[L] == Um) {
if (pr(i)) {
i = typeof i.item == W || typeof i.item == op;
break a;
}
if (sr(i)) {
i = typeof i.item == W;
break a;
}
}
i = n;
}
g(i ? $r(e) :e, d);
}
return f;
}
function lt(a) {
return a.compatMode == Vf;
}
function mt(a) {
for (var b; b = a[Nb]; ) a[Nc](b);
}
function nt(a) {
return a && a[ld] ? a[ld][Nc](a) :l;
}
function ot(a, b) {
if (a[fd] && 1 == b[kb]) return a == b || a[fd](b);
if ("undefined" != typeof a.compareDocumentPosition) return a == b || Boolean(16 & a.compareDocumentPosition(b));
for (;b && a != b; ) b = b[ld];
return b == a;
}
function gt(a) {
return 9 == a[kb] ? a :a.ownerDocument || a[xc];
}
function pt(a, b, c, d) {
c || (a = a[ld]);
for (var c = d == l, e = 0; a && (c || d >= e); ) {
if (b(a)) return a;
a = a[ld], e++;
}
return l;
}
function ft(a) {
this.mb = a || fr[xc] || ea;
}
function qt(a) {
return qt[vd](a), a;
}
function ut(a, b) {
Da(this, a), Ta(this, b), ya(this, this[Pc]);
}
function vt(a, b) {
a && this.Kc(a, b);
}
function xt(a, b, c, d) {
this.top = a, ab(this, b), Xa(this, c), Aa(this, d);
}
function yt(a, b) {
return a[F] <= b[T] && b[F] <= a[T] && a.top <= b[R] && b.top <= a[R];
}
function zt(a, b, c, d) {
Aa(this, a), this.top = b, pa(this, c), $a(this, d);
}
function At(a) {
return new zt(a[F], a.top, a[T] - a[F], a[R] - a.top);
}
function Bt(a, b, c) {
qr(b) ? Ct(a, c, b) :rs(b, yr(Ct, a));
}
function Ct(a, b, c) {
a[O][na(c)[ib](/\-([a-z])/g, function(a, b) {
return b.toUpperCase();
})] = b;
}
function Dt(a, b) {
var c = gt(a);
return c[Xb] && c[Xb].getComputedStyle && (c = c[Xb].getComputedStyle(a, l)) ? c[b] || c.getPropertyValue(b) || U :U;
}
function Et(a, b) {
return Dt(a, b) || (a[ad] ? a[ad][b] :l) || a[O] && a[O][b];
}
function Ft(a, b, c) {
var d, e = Ms && (Fs || Ps) && Zs(gf);
b instanceof $ ? (d = b.x, b = b.y) :(d = b, b = c), Aa(a[O], Gt(d, e)), a[O].top = Gt(b, e);
}
function Ht(a) {
return a = a ? gt(a) :ea, !Ls || at(9) || et(a).Sn() ? a[hc] :a[Lc];
}
function It(a) {
var b = a[db]();
return Ls && (a = a.ownerDocument, Aa(b, b[F] - (a[hc][Ob] + a[Lc][Ob])), b.top -= a[hc][Qb] + a[Lc][Qb]), 
b;
}
function Jt(a) {
if (Ls && !at(8)) return a.offsetParent;
for (var b = gt(a), c = Et(a, Fn), d = c == bk || c == Sg, a = a[ld]; a && a != b; a = a[ld]) if (c = Et(a, Fn), 
d = d && c == hp && a != b[hc] && a != b[Lc], !d && (a.scrollWidth > a[uc] || a.scrollHeight > a[Zc] || c == bk || c == Sg || c == Rn)) return a;
return l;
}
function Kt(a) {
for (var b = new xt(0, r, r, 0), c = et(a), d = c.mb[Lc], e = c.mb[hc], f = c.uA(); a = Jt(a); ) if (!(Ls && 0 == a[uc] || Ns && 0 == a[Zc] && a == d || a == d || a == e || Et(a, fn) == Rq)) {
var i, g = Lt(a);
if (i = a, Ms && !Zs(gf)) {
var k = ma(Dt(i, Yh));
if (Mt(i)) var m = i.offsetWidth - i[uc] - k - ma(Dt(i, $h)), k = k + m;
i = new $(k, ma(Dt(i, bi)));
} else i = new $(i[Ob], i[Qb]);
g.x += i.x, g.y += i.y, b.top = s.max(b.top, g.y), ab(b, s.min(b[T], g.x + a[uc])), 
Xa(b, s.min(b[R], g.y + a[Zc])), Aa(b, s.max(b[F], g.x));
}
return d = f[$c], f = f[jc], Aa(b, s.max(b[F], d)), b.top = s.max(b.top, f), c = c.vA(), 
ab(b, s.min(b[T], d + c[y])), Xa(b, s.min(b[R], f + c[S])), 0 <= b.top && 0 <= b[F] && b[R] > b.top && b[T] > b[F] ? b :l;
}
function Lt(a) {
var b, c = gt(a), d = Et(a, Fn), e = Ms && c[Gb] && !a[db] && d == Sg && (b = c[Gb](a)) && (0 > b[Db] || 0 > b[Eb]), f = new $(0, 0), g = Ht(c);
if (a == g) return f;
if (a[db]) b = It(a), a = et(c).tk(), f.x = b[F] + a.x, f.y = b.top + a.y; else if (c[Gb] && !e) b = c[Gb](a), 
a = c[Gb](g), f.x = b[Db] - a[Db], f.y = b[Eb] - a[Eb]; else {
b = a;
do {
if (f.x += b.offsetLeft, f.y += b.offsetTop, b != a && (f.x += b[Ob] || 0, f.y += b[Qb] || 0), 
Ns && Et(b, Fn) == bk) {
f.x += c[Lc][$c], f.y += c[Lc][jc];
break;
}
b = b.offsetParent;
} while (b && b != a);
for ((Ks || Ns && d == Sg) && (f.y -= c[Lc].offsetTop), b = a; (b = Jt(b)) && b != c[Lc] && b != g; ) f.x -= b[$c], 
Ks && b[hd] == Cg || (f.y -= b[jc]);
}
return f;
}
function Nt(a, b) {
var c = Ot(a), d = Ot(b);
return new $(c.x - d.x, c.y - d.y);
}
function Ot(a) {
var b = new $();
if (1 == a[kb]) {
if (a[db]) {
var c = It(a);
b.x = c[F], b.y = c.top;
} else {
var c = et(a).tk(), d = Lt(a);
b.x = d.x - c.x, b.y = d.y - c.y;
}
if (Ms && !Zs(12)) {
var e;
Ls ? e = De :Ns ? e = Fe :Ks ? e = Ee :Ms && (e = Ce);
var f;
e && (f = Et(a, e)), f || (f = Et(a, lq)), f ? (a = f.match(Pt), a = a ? new $(ma(a[1]), ma(a[2])) :new $(0, 0)) :a = new $(0, 0), 
b = ps(b, a);
}
} else e = sr(a.KA), f = a, a[wb] ? f = a[wb][0] :e && a.td[wb] && (f = a.td[wb][0]), 
b.x = f[fc], b.y = f[gc];
return b;
}
function Qt(a, b, c) {
b instanceof qs ? (c = b[S], b = b[y]) :c == aa && h(u("missing height argument")), 
pa(a[O], Gt(b, j)), $a(a[O], Gt(c, j));
}
function Gt(a, b) {
return typeof a == Um && (a = (b ? s[B](a) :a) + Kn), a;
}
function Rt(a) {
if (Et(a, Jj) != X) return St(a);
var b = a[O], c = b.display, d = b.visibility, e = b[pc];
return Ja(b, fl), Ma(b, Sg), Za(b, ul), a = St(a), Za(b, c), Ma(b, e), Ja(b, d), 
a;
}
function St(a) {
var b = a.offsetWidth, c = a.offsetHeight, d = Ns && !b && !c;
return jr(b) && !d || !a[db] ? new qs(b, c) :(a = It(a), new qs(a[T] - a[F], a[R] - a.top));
}
function Tt(a, b) {
Za(a[O], b ? U :X);
}
function Mt(a) {
return jo == Et(a, Ij);
}
function Ut(a, b, c, d) {
if (/^\d+px?$/[eb](b)) return la(b, 10);
var e = a[O][c], f = a.runtimeStyle[c];
return a.runtimeStyle[c] = a[ad][c], a[O][c] = b, b = a[O][d], a[O][c] = e, a.runtimeStyle[c] = f, 
b;
}
function Vt(a, b) {
return Ut(a, a[ad] ? a[ad][b] :l, Jl, An);
}
function Xt(a, b) {
if ((a[ad] ? a[ad][b + Ag] :l) == X) return 0;
var c = a[ad] ? a[ad][b + Fg] :l;
return c in Wt ? Wt[c] :Ut(a, c, Jl, An);
}
function Yt(a) {
return pt(a, function(a) {
return a.referencepoint;
}, j);
}
function Zt() {}
function eu(a, b, c, d, e) {
if (b) {
if (mr(b)) {
for (var f = 0; f < b[L]; f++) eu(a, b[f], c, d, e);
return l;
}
var d = !!d, g = bu;
b in g || (g[b] = {
bb:0,
Mc:0
}), g = g[b], d in g || (g[d] = {
bb:0,
Mc:0
}, g.bb++);
var k, g = g[d], i = tr(a);
if (g.Mc++, g[i]) {
for (k = g[i], f = 0; f < k[L]; f++) if (g = k[f], g.ri == c && g.En == e) {
if (g.Qg) break;
return k[f].key;
}
} else k = g[i] = [], g.bb++;
var m = fu, p = st ? function(a) {
return m[P](p.src, p.key, a);
} :function(a) {
return a = m[P](p.src, p.key, a), a ? void 0 :a;
}, f = p;
return f.src = a, g = new Zt(), g.Kc(c, f, a, b, d, e), c = g.key, f.key = c, k[x](g), 
au[c] = g, cu[i] || (cu[i] = []), cu[i][x](g), a.addEventListener ? (a == fr || !a.Bs) && a.addEventListener(b, f, d) :a.attachEvent(b in du ? du[b] :du[b] = Ym + b, f), 
c;
}
h(u("Invalid event type"));
}
function gu(a, b, c, d, e) {
if (mr(b)) {
for (var f = 0; f < b[L]; f++) gu(a, b[f], c, d, e);
return l;
}
return a = eu(a, b, c, d, e), au[a].Wn = j, a;
}
function hu(a, b, c, d, e) {
if (mr(b)) {
for (var f = 0; f < b[L]; f++) hu(a, b[f], c, d, e);
return l;
}
if (d = !!d, f = bu, a = b in f && (f = f[b], d in f && (f = f[d], a = tr(a), f[a])) ? f[a] :l, 
!a) return n;
for (f = 0; f < a[L]; f++) if (a[f].ri == c && a[f][Bb] == d && a[f].En == e) return iu(a[f].key);
return n;
}
function iu(a) {
if (!au[a]) return n;
var b = au[a];
if (b.Qg) return n;
var c = b.src, d = b[I], e = b.Is, f = b[Bb];
return c.removeEventListener ? (c == fr || !c.Bs) && c.removeEventListener(d, e, f) :c.detachEvent && c.detachEvent(d in du ? du[d] :du[d] = Ym + d, e), 
c = tr(c), cu[c] && (e = cu[c], Yr(e, b), 0 == e[L] && delete cu[c]), b.Qg = j, 
(b = bu[d][f][c]) && (b.Vs = j, ju(d, f, c, b)), delete au[a], j;
}
function ju(a, b, c, d) {
if (!d.Ak && d.Vs) {
for (var e = 0, f = 0; e < d[L]; e++) d[e].Qg ? d[e].Is.src = l :(e != f && (d[f] = d[e]), 
f++);
Ka(d, f), d.Vs = n, 0 == f && (delete bu[a][b][c], bu[a][b].bb--, 0 == bu[a][b].bb && (delete bu[a][b], 
bu[a].bb--), 0 == bu[a].bb && delete bu[a]);
}
}
function ku(a, b, c) {
var d = 0, e = b == l, f = c == l, c = !!c;
if (a == l) rs(cu, function(a) {
for (var g = a[L] - 1; g >= 0; g--) {
var i = a[g];
!e && b != i[I] || !f && c != i[Bb] || (iu(i.key), d++);
}
}); else if (a = tr(a), cu[a]) for (var a = cu[a], g = a[L] - 1; g >= 0; g--) {
var i = a[g];
!e && b != i[I] || !f && c != i[Bb] || (iu(i.key), d++);
}
return d;
}
function lu(a, b, c, d, e) {
var f = 1, b = tr(b);
if (a[b]) {
a.Mc--, a = a[b], a.Ak ? a.Ak++ :a.Ak = 1;
try {
for (var g = a[L], i = 0; g > i; i++) {
var k = a[i];
k && !k.Qg && (f &= mu(k, e) !== n);
}
} finally {
a.Ak--, ju(c, d, b, a);
}
}
return Boolean(f);
}
function mu(a, b) {
return a.Wn && iu(a.key), a[Rb](b);
}
function fu(a, b) {
if (!au[a]) return j;
var c = au[a], d = c[I], e = bu;
if (!(d in e)) return j;
var f, g, e = e[d];
if (!st) {
f = b || gr(Vq);
var i = j in e, k = n in e;
if (i) {
if (0 > f[Lb] || f.returnValue != aa) return j;
a:{
var m = n;
if (0 == f[Lb]) try {
Ca(f, -1);
break a;
} catch (p) {
m = j;
}
(m || f.returnValue == aa) && (f.returnValue = j);
}
}
m = new vt(), m.Kc(f, this), f = j;
try {
if (i) {
for (var q = [], t = m.currentTarget; t; t = t[ld]) q[x](t);
g = e[j], g.Mc = g.bb;
for (var w = q[L] - 1; !m.Jf && w >= 0 && g.Mc; w--) ya(m, q[w]), f &= lu(g, q[w], d, j, m);
if (k) for (g = e[n], g.Mc = g.bb, w = 0; !m.Jf && w < q[L] && g.Mc; w++) ya(m, q[w]), 
f &= lu(g, q[w], d, n, m);
} else f = mu(c, m);
} finally {
q && Ka(q, 0);
}
return f;
}
return d = new vt(b, this), f = mu(c, d);
}
function nu(a) {
this.$c = a, this.za = [];
}
function pu(a) {
this.na = a, this.wc = new nu();
}
function qu(a, b, c, d) {
this.ef = a, this.ff = b, this.Qa = c, this.Xa = d;
}
function ru(a, b) {
this.x = a, this.y = b;
}
function su(a, b) {
return new ru(a.x + b.x, a.y + b.y);
}
function tu(a, b) {
return new ru(a.x - b.x, a.y - b.y);
}
function uu(a) {
if (a = na(a), /^\s*$/[eb](a) ? 0 :/^[\],:{}\s\u2028\u2029]*$/[eb](a[ib](/\\["\\\/bfnrtu]/g, Of)[ib](/"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, Og)[ib](/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, U))) try {
return eval(ue + a + we);
} catch (b) {}
h(u("Invalid JSON string: " + a));
}
function vu(a) {
this.Hk = a;
}
function yu(a, b) {
for (var c = [ a ], d = b[L] - 1; d >= 0; --d) c[x](typeof b[d], b[d]);
return c[pd](ud);
}
function zu(a, b, c, d, e, f, g, i, k) {
var m, p;
if (m = c.offsetParent) {
var q = m[hd] == fg || m[hd] == Tf;
q && Et(m, Fn) == hp || (p = Lt(m), q || (q = (q = Mt(m)) && Ms ? -m[$c] :!q || Ls && Zs(rf) ? m[$c] :m.scrollWidth - m[uc] - m[$c], 
p = os(p, new $(q, m[jc]))));
}
m = p || new $(), p = Lt(a), q = Rt(a), p = new zt(p.x, p.y, q[y], q[S]), (q = Kt(a)) && p.bt(At(q));
var q = et(a), t = et(c);
if (q.mb != t.mb) {
var w = q.mb[Lc], t = t.at(), A = new $(0, 0), E = gt(w) ? gt(w)[Ub] || gt(w)[Xb] :ca, K = w;
do {
var V = E == t ? Lt(K) :Ot(K);
A.x += V.x, A.y += V.y;
} while (E && E != t && (K = E.frameElement) && (E = E.parent));
w = os(A, Lt(w)), Ls && !q.Sn() && (w = os(w, q.tk())), Aa(p, p[F] + w.x), p.top += w.y;
}
a = -5 & (4 & b && Mt(a) ? 2 ^ b :b), b = new $(2 & a ? p[F] + p[y] :p[F], 1 & a ? p.top + p[S] :p.top), 
b = os(b, m), e && (b.x += (2 & a ? -1 :1) * e.x, b.y += (1 & a ? -1 :1) * e.y);
var G;
return g && (k ? G = k :(G = Kt(c)) && (G.top -= m.y, ab(G, G[T] - m.x), Xa(G, G[R] - m.y), 
Aa(G, G[F] - m.x))), Au(b, c, d, f, G, g, i);
}
function Au(a, b, c, d, e, f, g) {
var a = a[Oc](), i = 0, k = -5 & (4 & c && Mt(b) ? 2 ^ c :c), c = Rt(b), g = g ? g[Oc]() :c[Oc]();
return (d || 0 != k) && (2 & k ? a.x -= g[y] + (d ? d[T] :0) :d && (a.x += d[F]), 
1 & k ? a.y -= g[S] + (d ? d[R] :0) :d && (a.y += d.top)), f && (e ? (i = a, d = 0, 
65 == (65 & f) && (i.x < e[F] || i.x >= e[T]) && (f &= -2), 132 == (132 & f) && (i.y < e.top || i.y >= e[R]) && (f &= -5), 
i.x < e[F] && 1 & f && (i.x = e[F], d |= 1), i.x < e[F] && i.x + g[y] > e[T] && 16 & f && (pa(g, s.max(g[y] - (i.x + g[y] - e[T]), 0)), 
d |= 4), i.x + g[y] > e[T] && 1 & f && (i.x = s.max(e[T] - g[y], e[F]), d |= 1), 
2 & f && (d |= (i.x < e[F] ? 16 :0) | (i.x + g[y] > e[T] ? 32 :0)), i.y < e.top && 4 & f && (i.y = e.top, 
d |= 2), i.y >= e.top && i.y + g[S] > e[R] && 32 & f && ($a(g, s.max(g[S] - (i.y + g[S] - e[R]), 0)), 
d |= 8), i.y + g[S] > e[R] && 4 & f && (i.y = s.max(e[R] - g[S], e.top), d |= 2), 
8 & f && (d |= (i.y < e.top ? 64 :0) | (i.y + g[S] > e[R] ? 128 :0)), i = d) :i = 256, 
496 & i) ? i :(Ft(b, a), c == g || (c && g ? c[y] == g[y] && c[S] == g[S] :0) || (e = et(gt(b)).Sn(), 
!Ls || e && Zs(rf) ? (b = b[O], Ms ? b.MozBoxSizing = Uh :Ns ? b.WebkitBoxSizing = Uh :b.boxSizing = Uh, 
pa(b, s.max(g[y], 0) + Kn), $a(b, s.max(g[S], 0) + Kn)) :(a = b[O], e ? (Ls ? (e = Vt(b, hn), 
c = Vt(b, jn), f = Vt(b, kn), d = Vt(b, gn), e = new xt(f, c, d, e)) :(e = Dt(b, hn), 
c = Dt(b, jn), f = Dt(b, kn), d = Dt(b, gn), e = new xt(ma(f), ma(c), ma(d), ma(e))), 
Ls ? (c = Xt(b, Xh), f = Xt(b, Zh), d = Xt(b, ai), b = Xt(b, Vh), b = new xt(d, f, b, c)) :(c = Dt(b, Yh), 
f = Dt(b, $h), d = Dt(b, bi), b = Dt(b, Wh), b = new xt(ma(d), ma(f), ma(b), ma(c))), 
a.pixelWidth = g[y] - b[F] - e[F] - e[T] - b[T], a.pixelHeight = g[S] - b.top - e.top - e[R] - b[R]) :(a.pixelWidth = g[y], 
a.pixelHeight = g[S]))), i);
}
function Bu() {}
function Cu(a, b, c) {
this.element = a, this.Dt = b, this.wB = c;
}
function Du(a, b) {
this.l = a instanceof $ ? a :new $(a, b);
}
function Fu() {}
function Gu(a) {
if (typeof a.If == W) a = a.If(); else if (nr(a) || qr(a)) a = a[L]; else {
var c, b = 0;
for (c in a) b++;
a = b;
}
return a;
}
function Hu(a) {
if (typeof a.Be == W) return a.Be();
if (qr(a)) return a[zc](U);
if (nr(a)) {
for (var b = [], c = a[L], d = 0; c > d; d++) b[x](a[d]);
return b;
}
return us(a);
}
function Iu(a) {
this.Ua = {}, this.za = [];
var c = arguments[L];
if (c > 1) {
c % 2 && h(u("Uneven number of arguments"));
for (var d = 0; c > d; d += 2) this.set(arguments[d], arguments[d + 1]);
} else a && this.Kn(a);
}
function Ku(a, b) {
return a === b;
}
function Ju(a, b) {
return da[M][Jc][P](a, b);
}
function Lu(a) {
this.Ua = new Iu(), a && this.Kn(a);
}
function Mu(a) {
var b = typeof a;
return b == Wm && a || b == W ? Vm + tr(a) :b[ic](0, 1) + a;
}
function Nu() {}
function Ou(a, b) {
this.Dk = a || 1, this.si = b || Pu, this.Nn = Z(this.On, this), this.Sg = zr();
}
function Qu(a, b, c) {
return sr(a) ? c && (a = Z(a, c)) :a && typeof a[Rb] == W ? a = Z(a[Rb], a) :h(u(jg)), 
b > 2147483647 ? -1 :Pu[wc](a, b || 0);
}
function Ru(a, b) {
this.$c = new nu(this), this.yn(a || l), b && this.SA(b);
}
function Su(a, b) {
this.vx = 4, this.k = b || aa, Ru[P](this, a);
}
function Tu(a, b, c) {
this.ak = c || (a ? et(qr(a) ? ea[ob](a) :a) :et()), Su[P](this, this.ak.kk(Lj, {
style:Hn
})), this.Wb = new $(1, 1), this.yf = new Lu(), a && this.Zz(a), b != l && this.aA(b);
}
function Vu(a, b) {
Du[P](this, a, b);
}
function Wu(a) {
Cu[P](this, a, 3);
}
function Yu(a) {
var b = {}, a = na(a), c = a[qb](0) == Id ? a :Id + a;
if (Zu[eb](c)) return b.Fk = $u(c), Da(b, el), b;
a:{
var d = a.match(av);
if (d) {
var c = ja(d[1]), e = ja(d[2]), d = ja(d[3]);
if (c >= 0 && 255 >= c && e >= 0 && 255 >= e && d >= 0 && 255 >= d) {
c = [ c, e, d ];
break a;
}
}
c = [];
}
return c[L] ? (b.Fk = bv(c), Da(b, ao), b) :Xu && (c = Xu[a[sd]()]) ? (b.Fk = c, 
Da(b, Om), b) :(h(u(a + " is not a valid color string")), void 0);
}
function $u(a) {
return Zu[eb](a) || h(u("'" + a + "' is not a valid hex color")), 4 == a[L] && (a = a[ib](cv, Jd)), 
a[sd]();
}
function dv(a) {
return a = $u(a), [ la(a[ic](1, 2), 16), la(a[ic](3, 2), 16), la(a[ic](5, 2), 16) ];
}
function ev(a, b, c) {
return a = ja(a), b = ja(b), c = ja(c), (ga(a) || 0 > a || a > 255 || ga(b) || 0 > b || b > 255 || ga(c) || 0 > c || c > 255) && h(u('"(' + a + xe + b + xe + c + '") is not a valid RGB color')), 
a = fv(a[kc](16)), b = fv(b[kc](16)), c = fv(c[kc](16)), Id + a + b + c;
}
function bv(a) {
return ev(a[0], a[1], a[2]);
}
function fv(a) {
return 1 == a[L] ? Ye + a :a;
}
function gv(a, b, c) {
return c = is(c, 0, 1), [ s[B](c * a[0] + (1 - c) * b[0]), s[B](c * a[1] + (1 - c) * b[1]), s[B](c * a[2] + (1 - c) * b[2]) ];
}
function hv(a, b) {
a && (a.logicalname = b);
}
function iv(a) {
return a = pt(a, function(a) {
return a.logicalname != l;
}, j), a ? a.logicalname :Rg;
}
function jv(a) {
return a == X || a == U || a == nq ? X :Yu(a).Fk;
}
function kv(a) {
return a == X ? X :(a = dv(a), a = s[B]((a[0] + a[1] + a[2]) / 3), ev(a, a, a));
}
function lv(a, b) {
var c = a.kk(b[$b], b.Ud);
if (a.setProperties(c, {
style:b[O]
}), b[nb] != l) {
var d = mr(b[nb]) ? b[nb] :[ b[nb] ];
Pr(d, function(b) {
qr(b) ? a[v](c, a[sb](b)) :a[v](c, lv(a, b));
});
}
return b.id != l && hv(c, b.id), c;
}
function mv(a, b) {
Va(this, b > a ? a :b), this.end = b > a ? b :a;
}
function nv(a, b) {
return a[Q] <= b && a.end >= b;
}
function ov(a, b, c) {
return a == b || s.abs(a - b) <= (c != l ? c :1e-5);
}
function pv(a, b, c) {
return a && a != X ? b && b != X ? bv(gv(dv(a), dv(b), c)) :a :b;
}
function qv(a, b) {
if (b == l) return a;
var c = new mv(b, b);
return a ? new mv(s.min(a[Q], c[Q]), s.max(a.end, c.end)) :c;
}
function rv(a, b, c) {
var d = b != l ? b :a && c != l && c < a[Q] ? c :a ? a[Q] :l, a = c != l ? c :a && b != l && b > a.end ? b :a ? a.end :l;
return d != l && a != l ? new mv(d, a) :l;
}
function sv(a) {
if (0 == a[L]) return l;
for (var b = a[0][Oc](), c = 1; c < a[L]; c++) b.PB(a[c]);
return b;
}
function tv(a, b) {
var c = ds(a, fs, n, b);
if (c >= 0) return b;
if (c = -(c + 1), 0 == c) return a[0];
if (c == a[L]) return Mr(a);
var d = a[c - 1], c = a[c];
return s.abs(b - d) <= s.abs(b - c) ? d :c;
}
function uv(a, b, c) {
this.uf = a, this.tf = jv(b), this.sf = jv(c != l ? c :ne);
}
function vv(a) {
a = a || {}, this.Y = X, a.fill != l && this.Bm(a.fill), this.Ic = 1, a.Cb != l && this.Fl(a.Cb), 
this.Ob = X, a.stroke != l && this.Gc(a.stroke), this.I = 1, a.Aa != l && this.Re(a.Aa), 
this.Yc = 1, a.jd != l && this.Zg(a.jd), this.xe = $o, a.Im != l && this.Rq(a.Im), 
this.q = l, a.q && (this.q = xs(a.q), this.q.Jd = jv(this.q.Jd), this.q.Kd = jv(this.q.Kd)), 
this.$a = l, a.pattern && this.Hm(a.pattern);
}
function xv(a, b) {
return new vv({
stroke:X,
fill:a,
Cb:b != l ? b :1
});
}
function yv(a, b, c) {
return new vv({
stroke:a,
Aa:b,
fill:c != l && c ? ke :X
});
}
function zv(a, b) {
return a === b ? j :a == l || b == l ? n :a.Y == b.Y && a.Ic == b.Ic && a.Ob == b.Ob && a.I == b.I && a.Yc == b.Yc && a.xe == b.xe && (a.q === b.q ? j :a.q == l || b.q == l ? n :a.q.Jd == b.q.Jd && a.q.Kd == b.q.Kd && a.q.Qa == b.q.Qa && a.q.Xa == b.q.Xa && a.q.ic == b.q.ic && a.q.xc == b.q.xc) && (a.$a === b.$a ? j :a.$a == l || b.$a == l ? n :a.$a.sf == b.$a.sf && a.$a.tf == b.$a.tf && a.$a.uf == b.$a.uf);
}
function Av(a) {
var b = l, c = l;
sr(a) ? b = a :c = a, this.iA = b, this.Ta = c, this.Ek = l;
}
function Bv() {
this.Sa = [];
}
function Cv(a, b) {
var c = new Bv();
return 0 < a[L] && (c.zm(a), b || c[Kc]()), c;
}
function Dv(a, b, c) {
switch (c) {
case gp:
c = a, a += b;
break;

case Uj:
c = a - b;
break;

case Ci:
c = a - b / 2, a += b / 2;
break;

default:
c = a = 0/0;
}
return {
start:c,
end:a
};
}
function Ev(a, b, c) {
switch (c) {
case gp:
return a;

case Uj:
return b;

case Ci:
return ms(a, b);
}
}
function Fv(a, b) {
this.Zc = a, this.Sr = b, this.Gf = et(a), this.mn = this.Gf.mb, this.Um = l, this.ln = [], 
this.wc = new nu();
var c = Z(function(a, b) {
return this.zs(a, b);
}, this), d = tr(c), e = function(a, b) {
var c = [ a, b[0] ];
return rs(b[1], function(a, b) {
c[x](a), c[x](b);
}), c[pd](Pg);
} || yu;
this.np = function() {
var a = this || fr, a = a.closure_memoize_cache_ || (a.closure_memoize_cache_ = {}), b = e(d, arguments);
return a[Jc](b) ? a[b] :a[b] = c[gd](this, arguments);
};
}
function Gv() {
fr.__googleVisualizationAbstractRendererElementsCount__ = fr.__googleVisualizationAbstractRendererElementsCount__ || 0;
var a = Qg + fr.__googleVisualizationAbstractRendererElementsCount__[kc]();
return fr.__googleVisualizationAbstractRendererElementsCount__++, a;
}
function Hv(a, b) {
Fv[P](this, a, b), this.Ig = l, this.sk = {};
}
function Iv(a, b) {
switch (a) {
case $o:
return Ye;

case wj:
return na(4 * b) + xe + na(b);

default:
return Iv($o, b);
}
}
function Jv(a, b) {
if (a == l && b == l) return a === b;
if (a === b) return j;
var c = ir(a), d = ir(b);
if (c != d) return n;
var d = or(a), e = or(b);
if (d != e) return n;
switch (c) {
case Wm:
if (d && e) return 0 == a[dc]() - b[dc]();
for (var f in a) if (a[Jc](f) && (!b[Jc](f) || !Jv(a[f], b[f]))) return n;
for (var g in b) if (b[Jc](g) && !a[Jc](g)) return n;
return j;

case zh:
if (a[L] != b[L]) return n;
for (c = 0; c < a[L]; ++c) if (!Jv(a[c], b[c])) return n;
return j;

case W:
return j;

case op:
case Um:
case Th:
return n;

default:
h(u("Error while comparing " + a + " and " + b + ": unexpected type of obj1 " + c));
}
}
function Kv(a) {
if (or(a)) {
var b = new Date();
return b[cd](a.valueOf()), b;
}
var c = ir(a);
if (c == Wm || c == zh) {
if (a[Oc]) return a[Oc]();
c = c == zh ? [] :{};
for (b in a) c[b] = Kv(a[b]);
return c;
}
return a;
}
function Lv(a) {
this.Ie = a;
}
function Mv(a, b, c) {
a:{
for (var b = b[zc](Ge), a = a || fr, d = 0; d < b[L]; d++) {
var e = b[d];
if (a[e] == l) {
b = l;
break a;
}
a = a[e];
}
b = a;
}
return b != l && sr(c) ? c(b) :b;
}
function Nv(a) {
return a == l ? l :typeof a == Th ? a :(a = na(a), a == df || a[sd]() == pq ? j :a == Ye || a[sd]() == Xj ? n :l);
}
function Ov(a) {
return a == l ? l :typeof a == Um ? a :(a = Lr(na(a)), ga(a) ? l :a);
}
function Pv(a) {
return a = Ov(a), a != l && a >= 0 ? a :l;
}
function Qv(a) {
return a = Pv(a), a != l ? is(a, 0, 1) :l;
}
function Rv(a) {
return a == l ? l :na(a);
}
function Sv(a, b) {
var c = Rv(a);
return c ? 0 <= Or(b || [], c) ? c :jv(c) :l;
}
function Tv(a, b) {
var c = Rv(b);
return ws(a, c) ? c :l;
}
function Uv(a, b) {
var c = {}, d = Sv(a[zb], b);
return d != l && xa(c, d), d = Sv(a.auraColor, b), d != l && (c.fb = d), (d = Rv(a.fontName)) && (c.eb = d), 
(d = Pv(a[N])) && Ra(c, d), d = Nv(a[lc]), d != l && (c.bold = d), d = Nv(a.italic), 
d != l && (c.hf = d), d = Nv(a.underline), d != l && (c.rm = d), c;
}
function Vv(a, b) {
var c = l, d = Ov(b);
if (d != l) c = d; else if (d = Rv(b), d != l) {
var e = d[L] - 1;
e >= 0 && d[yb](oe, e) == e && (c = d[L] - 1, e = d, c >= 0 && c < d[L] && (e = d[ic](0, c) + d[ic](c + 1, d[L] - c - 1)), 
c = a * Lr(e) / 100);
}
return c != l && (c = is(c, 0, a)), c;
}
function Yv() {
var a = gr(Gk);
a != l || (a = ll);
var b = gr(Hk);
return b != l || (b = ef), a + Xe + b;
}
function Zv(a, b) {
Fv[P](this, a, b);
}
function $v(a) {
switch (a) {
case $o:
return $o;

case wj:
return Go;

default:
return $v($o);
}
}
function aw(a, b, c, d) {
(Ls ? 0 <= Kr(Xs, of) :Ms ? 0 <= Kr(Xs, ff) :Ks ? 0 <= Kr(Xs, tf) :Ns && 0 <= Kr(Xs, nf)) || h(u("Graphics is not supported"));
for (var e = s[D](1e5 * s.random()); ca.frames[ag + e]; ) e++;
this.cn = ag + e, (a = this.na = a) && (a.referencepoint = j), this.na.innerHTML = U, 
this.$d = b, this.zf = et(this.na), this.ii = this.cd = l, this.ji = n, this.xn = [], 
this.nk = l, this.Dy = (b = Ls ? ea[bd] != l ? 9 > ea[bd] :!Zs(sf) :n) ? Zv :Hv, 
(this.jk = b || d) && this.Oy(b), this.fs(c);
}
function bw(a, b, c, d) {
if (a[P]()) b[P](); else {
var e = d != l ? d :10;
ca[wc](c(function() {
bw(a, b, c, e);
}), e);
}
}
function cw(a) {
return a * a * a;
}
function dw(a) {
return 1 - s.pow(1 - a, 3);
}
function ew(a) {
return 3 * a * a - 2 * a * a * a;
}
function gw(a) {
switch (a) {
case km:
return function(a) {
return a;
};

case ql:
return cw;

case cn:
return dw;

case rl:
return ew;
}
}
function hw() {
this.qc = {}, this.pc = {}, this.rc = {};
}
function iw() {}
function jw(a) {
this.Ie = gs({}, a), this.fo = gs({}, a);
}
function kw(a) {
return a[pd](Id);
}
function mw(a) {
return a;
}
function ow(a, b) {
return s.abs(a - b);
}
function pw(a, b, c, d) {
if (!a || !b) return j;
var e = d || ow;
a:{
var f, d = function(a, d) {
var f = b[d];
return !jr(b[d]) || e(a, f) <= c;
};
for (f in a) if (!d[P](aa, a[f], f, a)) {
a = n;
break a;
}
a = j;
}
return a;
}
function qw(a, b, c) {
return 0 == a.x || 0 == b.x ? {
x:0,
y:(0 == a.x && 0 == b.x ? 0 :0 == a.x ? a.y :b.y) * c / 6
} :(c = c / 3 * s.min(s.abs(a.x), s.abs(b.x)), b = (a.y / a.x + b.y / b.x) / 2, 
0 < a.x ? {
x:c,
y:c * b
} :{
x:-c,
y:-c * b
});
}
function rw(a, b, c) {
var d = a.Nt(), e = b.Nt();
return 0 == d || 0 == e ? new ru(0, 0) :(d = s[Pb](d / e), su(a[Oc]()[dd](1 / d), b[Oc]()[dd](d))[dd](c / 6));
}
function sw(a, b, c, d, e) {
for (var c = c ? qw :rw, f = [], g = 0; g < a[L]; ++g) {
var i, k;
e ? (i = tw(a, g, 1, d), k = tw(a, g, -1, d)) :(i = d ? (g + 1) % a[L] :g + 1, k = d ? (a[L] + g - 1) % a[L] :g - 1), 
i != l && k != l && a[g] != l && a[k] != l && a[i] != l ? (i = c(tu(a[g], a[k]), tu(a[i], a[g]), b), 
f[x]([ tu(a[g], i), su(a[g], i) ])) :a[g] != l ? f[x]([ a[g][Oc](), a[g][Oc]() ]) :f[x](l);
}
return f;
}
function tw(a, b, c, d) {
var e = b + c;
for (d && (e = (e + a[L]) % a[L]); e != b && e >= 0 && e < a[L]; ) {
if (a[e] != l) return e;
e += c, d && (e = (e + a[L]) % a[L]);
}
return l;
}
function uw(a, b, c) {
var c = c || 0, d = Wr(b, function(b) {
return b[c] > a;
});
return -1 == d ? b[L] - 1 :0 == d ? 0 :b[d][c] - a < a - b[d - 1][c] ? d :d - 1;
}
function vw(a, b, c) {
for (var d = [], e = 0; a > e; e++) d[e] = b[P](c, e);
return d;
}
function ww(a) {
return a.max != l ? a.max :a.min;
}
function xw(a, b, c, d) {
var e, f;
a:{
jr(c) || (c = 0), jr(d) || (d = a[L]), c = b - c, f = 0, e = c >= 0 ? 0 :l;
for (var g = 0, i = 0, k = l, m = l; f < a[L]; ) {
var p = a[f].min, q = ww(a[f]) - p, g = g + p;
if (c >= g) {
e = f + 1;
var t = s.min(c - g, q), i = g + t, m = p + t;
}
if (g > b) {
e = f >= d ? {
dd:f,
In:k,
Jn:b - (g - p)
} :e === l ? l :{
dd:e,
In:m,
Jn:c - i
};
break a;
}
t = s.min(b - g, q), g += t, k = p + t, f++;
}
e = {
dd:f,
In:k,
Jn:b - g
};
}
if (!e) return l;
f = e.Jn, b = cs(a, 0, e.dd), d = Sr(b, function(a, b) {
return s.max(a, b.T[L]);
}, 0), c = Rr(b, ww), 0 < c[L] && (c[c[L] - 1] = e.In);
for (var w = 0; d > w; w++) {
for (e = Rr(b, function(a) {
return a.T[w] || 0;
} || mw), es(e), i = g = 0; i < e[L]; i++) {
if (k = e[L] - i, m = (e[i] - g) * k, !(f >= m)) {
g += f / k, f = 0;
break;
}
g = e[i], f -= m;
}
for (e = g, g = 0; g < c[L]; g++) c[g] += s.min(e, a[g].T[w] || 0);
if (0 == f) break;
}
return c;
}
function yw(a, b, c, d) {
var e = xw(a, b, c, d), f = {};
return Pr(a, function(a, b) {
var c = a.key;
f[c] != l || (f[c] = []), b < e[L] && f[c][x](e[b]);
}), f;
}
function zw(a) {
for (var c = cs(arguments, 1), d = [], e = 0; e < c[L]; e += 2) {
var f = s.min(c[e], a[L]), g = s.min(c[e + 1], a[L]), f = cs(a, f, g);
as(d, f);
}
return d;
}
function Aw(a) {
var b = google[Hc][ac].DECIMAL_PATTERN;
if (0 >= a) return b[ic](0, b[Uc](Ge));
for (var b = b[ic](0, b[Uc](Ge) + 1), c = 0; a > c; c++) b += Id;
return b;
}
function Bw(a, b) {
return qr(a) ? [ a + Ge + b ] :Rr(a, function(a) {
return a + Ge + b;
});
}
function Cw(a, b, c, d, e, f) {
var g = [], i = 0 > d - 1 || 0 > e ? l :c[d - 1][e];
return i && g[x]({
vk:i,
Dc:i.Dc + 1,
ui:d - 1,
wk:l,
vi:l,
xk:l
}), (i = 0 > d || 0 > e - 1 ? l :c[d][e - 1]) && g[x]({
vk:i,
Dc:i.Dc + 1,
ui:l,
wk:l,
vi:e - 1,
xk:l
}), (c = 0 > d - 1 || 0 > e - 1 ? l :c[d - 1][e - 1]) && f(a[d - 1], b[e - 1]) && g[x]({
vk:c,
Dc:c.Dc,
ui:d - 1,
wk:e - 1,
vi:e - 1,
xk:d - 1
}), es(g, function(a, b) {
return a.Dc - b.Dc;
}), 0 < g[L] ? g[0] :{
vk:l,
Dc:0,
ui:l,
wk:l,
vi:l,
xk:l
};
}
function Dw(a, b, c) {
for (var d = c || function(a, b) {
return a == b;
}, c = [], e = 0; e <= a[L]; e++) {
c[e] = c[e] || [];
for (var f = 0; f <= b[L]; f++) c[e][f] = Cw(a, b, c, e, f, d);
}
for (d = {}, e = {}, a = c[a[L]][b[L]], b = a.Dc; a; ) a.ui != l && (d[a.ui] = a.wk), 
a.vi != l && (e[a.vi] = a.xk), a = a.vk;
return {
Dc:b,
uh:d,
vh:e
};
}
function Ew(a, b, c) {
if (!a || !b) return l;
var d = {};
if (0 == a[L] || 0 == b[L]) return d;
for (var c = c || mw, e = 0, f = 0; f < a[L]; f++) {
var g = l, i = c(a[f]);
for (0 == f || c(a[f - 1]); e < b[L]; ) {
var k = c(b[e]);
if (0 == e || c(b[e - 1]), k = s.abs(i - k), g == l || g > k) g = k, d[f] = e, e++; else {
if (k != g) break;
e++;
}
}
e--;
}
return d;
}
function Fw(a, b) {
for (var c in a) if (!(0 <= Or(b, c))) return n;
return j;
}
function Gw(a, b, c, d) {
var e = {};
return rs(a, function(f, g) {
for (var i = f, k = 0; k < b[L]; k++) var m = b[k](a, g, d), i = c(i, m);
e[g] = i;
}), e;
}
function Hw(a, b, c) {
if (c) return Iw(Qr(a, lr), b);
for (var d = -1, c = 0; c < a[L]; c++) if (a[c] === l) {
if (d = cs(a, d + 1, c), d = Iw(d, b), d !== l) return d;
d = c;
}
return a = cs(a, d + 1), Iw(a, b);
}
function Iw(a, b) {
var c = ds(a, function(a, b) {
return fs(a, b.x);
} || fs, n, b);
if (c >= 0) return a[c].y;
var d = -(c + 1);
return 0 == d || d == a[L] ? l :(c = a[d - 1], d = a[d], new qu(c.x, c.y, d.x, d.y).Hn((b - c.x) / (d.x - c.x)).y);
}
function Jw(a, b, c) {
for (var d = new Date(a), e = n, f = b[L], g = [ s[D], s[lb] ][c], i = 0; f > i; ++i) {
var k = a[Do + Kw[i]], m = a[xk + Kw[i]][gd](a), p = b[i], q = Lw[i];
if (0 != p) return e ? k[gd](d, [ q + p * (1 + s[D]((m - q) / p)) ]) :k[gd](d, [ q + p * g((m - q) / p) ]), 
d;
e = e || 0 != m && 0 != c, k[gd](d, [ q ]);
}
}
function Mw(a, b, c) {
var e, d = $r(a);
for (e = 0; e < d[L] && 0 == b[e]; ++e) d[e] = 0;
if (0 == e) return d[0] = c(a[0] / b[0]) * b[0], d;
var f = 0;
return a[e - 1] >= Nw[e - 1] ? f = .7 :0 < a[e - 1] && (f = .1), d[e] = c((a[e] + f) / b[e]) * b[e], 
d;
}
function Ow(a, b, c) {
var d = Rr(b, function(a) {
return [ s.log(Pw(a)) ];
});
if (!c) return c = uw(s.log(a), d), b[c];
var e = s.log(a), f = aa, f = f || 0, c = c || 0;
if (0 < d[L] && e <= Mr(d)) c = uw(e, d, f), a = [ c, d[c][f] ]; else var g = d[L] - 1 - c, a = Mr(d)[f], i = d[g][f], k = a - i, m = s[D]((e - a) / k), e = e - a - m * k, g = Rr(cs(d, g), function(a) {
return [ a[f] - i ];
}), e = uw(e, g, 0), a = [ d[L] - 1 + m * c + e, a + m * k + g[e][0] ];
return c = a[0], c <= d[L] - 1 ? b[c] :Mw(Qw(s.exp(a[1])), Mr(b), s[B]);
}
function Rw(a, b, c) {
var e, d = new Date(a[dc]());
a:{
for (e = 0; e < b[L]; ++e) if (0 != b[e]) {
e = n;
break a;
}
e = j;
}
if (e) return d;
for (e = 0; e < b[L]; ++e) if (0 != b[e]) {
var f = Kw[e], g = d[Do + f], f = d[xk + f][gd](d, []);
g[gd](d, [ f + c * b[e] ]);
}
return c > 0 && a >= d && h("Error adding duration to date"), 0 > c && d >= a && h("Error subtracting duration from date"), 
d;
}
function Sw(a, b, c, d) {
this.lt = a[dc](), this.AA = b, this.qA = d, this.Yn = a[xk + Kw[c]][gd](a, []), 
this.rA = a[Do + Kw[c]], this.Ai = new Date(this.lt);
}
function Tw(a) {
return a = Wr(a, function(a) {
return 0 != a;
}), s.max(0, a);
}
function Pw(a) {
if (a == l) return -1;
for (var b = 0, c = a[L], d = 0; c > d; ++d) b += a[d] * Uw[d];
return b;
}
function Qw(a) {
for (var b = [], c = Uw[L] - 1; c >= 0; c--) b[c] = s[D](a / Uw[c]), a -= b[c] * Uw[c];
return b;
}
function Vw(a) {
var b = [], a = s[D](a / 1e3);
return b[x](s[D](a / 3600)), b[x](s[D](a / 60) - 60 * b[0]), b[x](a - 3600 * b[0] - 60 * b[1]), 
b;
}
function Ww(a, b) {
return Rr(a, function(a) {
return a * b;
});
}
function Xw(a) {
return a;
}
function Yw(a) {
return a;
}
function Zw(a) {
return a[dc]();
}
function $w(a) {
return new Date(a);
}
function ax(a) {
return mr(a), 1e3 * (60 * (60 * a[0] + a[1]) + a[2]);
}
function bx(a) {
return Vw(a);
}
function cx(a, b, c) {
return b = ds(a, function(a, b) {
var f = c(a), g = c(b);
return g > f ? -1 :f > g ? 1 :0;
} || fs, n, {
source:b,
target:b
}), 0 > b && (b = -b - 2), 0 > b ? l :a[b];
}
function ex(a, b, c) {
return (c = a.gh(c, dx)) ? c :a.$(b) ? nm :zn;
}
function fx(a, b, c) {
switch (a) {
case zn:
if (0 == c[L]) c = {
transform:function(a) {
return a;
},
inverse:function(a) {
return a;
}
}; else {
for (var d = [], a = 0, e = l, b = 0; b < c[L]; b++) {
var f = c[b], g = f.mA, i = f[Q], f = f.end, k = g / (f - i);
e === l || e != i ? (e = {
source:i,
target:i + a,
Ci:k
}, d[x](e)) :(e = d[d[L] - 1], e.Ci = k), d[x]({
source:f,
target:i + a + g,
Ci:1
}), a += g - (f - i), e = f;
}
c = {
transform:function(a) {
var b = cx(d, a, function(a) {
return a[Yb];
});
return b === l ? a :b[Pc] + (a - b[Yb]) * b.Ci;
},
inverse:function(a) {
var b = cx(d, a, function(a) {
return a[Pc];
});
return b === l ? a :0 == b.Ci ? b[Yb] :b[Yb] + (a - b[Pc]) / b.Ci;
}
};
}
return c;

case nm:
return {
transform:function(a) {
return s.log(a) / s.LN10;
},
inverse:function(a) {
return s.pow(10, a);
}
};

case Gm:
var m = b / 2;
return {
transform:function(a) {
return a > m ? s.log(a / m) / s.LN10 :-m > a ? -s.log(-a / m) / s.LN10 :0;
},
inverse:function(a) {
return a > 0 ? s.pow(10, a) * m :0 > a ? -s.pow(10, -a) * m :0;
}
};
}
}
function gx() {}
function hx(a, b, c) {
this.Xh = a, this.Sj = b, this.zn = c;
}
function mx(a, b, c, d, e, f, g, i) {
var k = b - a;
if (0 >= k) c = l; else {
for (var m = s[D](s.log(k) / s.log(10)), k = vw(5, function(a) {
return {
ti:s.pow(10, m - a),
uk:5
};
}), p = [], q = n, t = 0; t < k[L]; ++t) {
var A, w = k[t];
A = a / (w.ti * w.uk);
for (var E = b / (w.ti * w.uk), K = c, V = d, G = e, ka = f, Wa = g, fb = [], fa = E - A, za = V + ka, Hb = s[lb](fa / (1 - (K + G)) / Wa), fa = s[D](fa / (1 - za) / Wa); fa >= Hb; ++Hb) {
var za = Hb * Wa, Ga = s[lb](s.max(A - V * za, E - (1 - G) * za)), Dc = s[D](s.min(A - K * za, E - (1 - ka) * za)), le = 1;
E > 0 && 0 > A ? Wa > 1 && (Ga = s[lb](Ga / Hb) * Hb, Dc = s[D](Dc / Hb) * Hb, le = Hb) :A >= 0 ? Ga = s.max(0, Ga) :Dc = s.min(-za, Dc), 
Dc - Ga >= 0 && fb[x]({
Pz:Hb,
Oz:le,
Nz:Ga,
Mz:Dc
});
}
if (A = fb, p = p[pb](Rr(A, function(a) {
return [ w, a ];
})), q) break;
q = 0 != A[L];
}
c = Sr(p, function(a, b) {
for (var c = b[0], d = b[1], e = d.Nz; e <= d.Mz; e += d.Oz) {
var f = s[B](c.uk * e), k = s[B](c.uk * (e + g * d.Pz)), m = i(f, k, c.ti);
m > a.Dc && (a = {
Dc:m,
Hs:{
fc:s[B](f) * c.ti,
ld:s[B](k) * c.ti
}
});
}
return a;
}, {
Dc:-r,
Hs:l
}).Hs;
}
return c || (a >= 0 || 0 >= b || 1 == g ? c = {
fc:a,
ld:b
} :(c = s.max(1, s.min(g - 1, s[B](g * (b / (b - a))))), d = g - c, a = s.max(b / c, -a / d), 
c = {
fc:-d * a,
ld:c * a
})), c;
}
function nx(a) {
if (0 == a) return 0;
for (0 > a && (a = -a); 0 == s[B](a % 10); ) a = s[B](a / 10);
return 1 == a || 5 == a ? .5 :s[D](s.log(a) / s.log(10)) + 1;
}
function ox() {}
function px(a, b, c, d, e, f, g) {
for (c = a[0] * (d - c) / (g * (f - e)), d = (f - e) / b, g = 1; b > g; ++g) c -= a[1] * s.pow(nx(e + g * d), 1.2);
return c -= a[2] * s.pow(nx(e), 1.2), c -= a[2] * s.pow(nx(f), 1.2), c -= a[3] * s.pow(nx(d), 1.2);
}
function qx() {
this.Ot = {};
}
function sx() {
return rx ? rx :rx = new qx();
}
function tx(a) {
this.Xh = a;
}
function ux(a, b, c, d, e, f) {
for (c = a[0] * (d - c) / (f - e), f = (f - e) / b, d = 0; b >= d; ++d) c -= a[1] * nx(e + d * f);
return c -= a[2] * nx(f);
}
function Sx(a) {
var b = Rr(a.f, function(b) {
var d = a[Sc] ? a[Sc] :{
x:0,
y:0
}, e = Dv(b.x + d.x, b[L], a.Va), b = Dv(b.y + d.y, a.u[N], a.Oa);
return e[Q] == e.end || b[Q] == b.end ? l :new xt(b[Q], e.end, b.end, e[Q]);
}), b = Qr(b, lr);
return sv(b);
}
function Tx(a, b, c, d, e) {
if (e != l || (e = 1), 0 == e) return {
f:[],
la:n,
ec:0
};
var f = [], b = Ux(b, f, d, e, function(b) {
return a(b, c)[y];
});
return {
f:f,
la:b.Hf,
ec:b.ec
};
}
function Ux(a, b, c, d, e) {
var f = e(a);
if (c >= f) return a && b[x](a), {
Hf:n,
ec:f
};
if (d > 1) {
for (var g = 0, i = 0, f = 1; f < a[L]; f++) if (a[qb](f) == vd) {
var k = e(a[ic](0, f));
if (!(c >= k)) break;
i = k, g = f;
}
if (g > 0) return b[x](a[ic](0, g)), b = Ux(a[ic](g + 1), b, c, d - 1, e), {
Hf:b.Hf,
ec:s.max(i, b.ec)
};
}
if (d = e(He), d > c) {
for (f = 2; f >= 1; f--) if (a = e("..."[ic](0, f)), c >= a) return b[x]("..."[ic](0, f)), 
{
Hf:j,
ec:a
};
return {
Hf:j,
ec:0
};
}
for (f = a[L] - 1; f >= 1; f--) if (i = a[ic](0, f) + He, g = e(i), c >= g) return b[x](i), 
{
Hf:j,
ec:g
};
return b[x](He), {
Hf:j,
ec:d
};
}
function Vx(a, b) {
this.e = b, this.Fh = a, this.cf = this.Gd = this.ul = this.Pe = this.Ng = this.Ra = this.ve = l;
}
function Wx() {
this.Sa = [];
}
function Xx(a) {
switch (a[I]) {
case Mm:
case hm:
case rj:
return a = a[C], new $(a.x, a.y);

case vh:
var a = a[C], b = js(a.kn, 360);
return new $(a.fn + a.hn * s.cos(ks(b - 90)), a.gn + a.jn * s.sin(ks(b - 90)));
}
}
function Yx(a, b) {
return a.h && a.h.a || a.a || b.Ko;
}
function Zx(a) {
return a[I] == hm || a[I] == wh || a[I] == no;
}
function $x(a, b) {
return a.visible != l ? a.visible :b.Do;
}
function ay(a, b) {
return a.h && a.h.Pb != l ? a.h.Pb :a.Pb != l ? a.Pb :b.Bu;
}
function by(a, b) {
return ay(a, b) + Yx(a, b).ar() / 2;
}
function cy(a) {
return a.vd && a.J == W && a[Wb] == il;
}
function dy(a, b) {
for (var c = new Wx(), d = j, e = j, f = l, g = l, i = 0; i < a.c[L]; i++) {
var k = a.c[i];
if (k && k.h && k.h.x != l && k.h.y != l) {
d && (f = i, d = n);
var m = k.h, p = k.Od === l ? l :k.Od || a.Pa;
e || p === l ? (c[xb](m.x, m.y), e = n) :a.Ol ? c.Pj(p, a.c[g].Qd.x, a.c[g].Qd.y, k.Pd.x, k.Pd.y, m.x, m.y) :c.H(p, m.x, m.y), 
g = i;
} else e = !b || d;
}
return !d & a.su && (d = b ? g :a.c[L] - 1, f = b ? f :0, d != l && f != l && a.c[d] && a.c[f] && (p = a.c[f].Od === l ? l :a.c[f].Od || a.Pa, 
a.Ol ? c.Pj(p, a.c[d].Qd.x, a.c[d].Qd.y, a.c[f].Pd.x, a.c[f].Pd.y, a.c[f].h.x, a.c[f].h.y) :c[Kc](p))), 
c;
}
function ey(a) {
for (var b = new Wx(), c = j, d = 0; d < a.c[L]; d++) {
var e = a.c[d].h;
e.x == l || e.y == l ? c = j :(c || b.H(a.c[d].Od === l ? l :a.c[d].Od || a.Pa, e.Aj, e.Bj), 
(c || e.Aj != e.yj || e.Bj != e.zj) && b[xb](e.yj, e.zj), c = n);
}
return b;
}
function fy(a, b, c) {
return (c = (a = a.Ja) && a[c || 0]) && c[pc].Jb(b);
}
function gy(a, b, c) {
return (c = (a = a.va) && a[c || 0]) && c[pc].Jb(b);
}
function hy(a, b, c) {
return (c = (a = a.Ja) && a[c || 0]) && c[pc].Md(b);
}
function iy(a, b, c) {
return (c = (a = a.va) && a[c || 0]) && c[pc].Md(b);
}
function jy(a, b) {
Vx[P](this, a, b), this.Ca = l;
}
function ly(a, b, c, d) {
this.oe = a, this.e = b, this.Fh = c, this.Fg = d, this.Bf = l;
}
function my(a, b, c, d) {
ly[P](this, a, b, c, d.J), this.p = d, this.zr = this.Ny();
}
function ny(a, b) {
var c = new Bv(), d = a.Sa;
if (0 == d[L] || 1 == d[L]) return c;
for (var e = [ l ], f = 0; f < d[L]; f++) {
var g = d[f];
g[C] && e[x](new $(g[C].x, g[C].y));
}
e[x](l);
var g = d[d[L] - 1][I] == Yi, f = e[1][Oc](), i = e[2][Oc](), k = e[e[L] - 3][Oc](), m = e[e[L] - 2][Oc]();
g ? (e[0] = m, e[e[L] - 1] = f) :ns(f, m) ? (e[0] = k, e[e[L] - 1] = i) :(e[0] = new qu(f.x, f.y, i.x, i.y).Hn(-1), 
e[e[L] - 1] = new qu(m.x, m.y, k.x, k.y).Hn(-1));
for (var i = 0 > b, p = oy(e[0], e[1], b), k = e[L] - 2, f = 1; k >= f; f++) {
var t, m = oy(e[f], e[f + 1], b), q = py(p, m);
if (pr(q)) {
t = py(qy(e[f - 1], e[f]), p);
var w = py(qy(e[f], e[f - 1]), p);
t = nv(new mv(t.x, w.x), q.x) && nv(new mv(t.y, w.y), q.y);
} else t = q == r;
p = t && q != r ? q :py(qy(e[f], e[f - 1]), p), c.zc(ry(d[f - 1], p)), t || (p = 180 - 180 * s[Kb](p.x - e[f].x, p.y - e[f].y) / s.PI, 
q = py(qy(e[f], e[f + 1]), m), c.yb(e[f].x, e[f].y, s.abs(b), s.abs(b), p, 180 - 180 * s[Kb](q.x - e[f].x, q.y - e[f].y) / s.PI, i)), 
p = m;
}
return g && c[Kc](), c;
}
function ry(a, b) {
var c = ys(a);
switch (a[I]) {
case Mm:
case hm:
c[C].x = b.x, c[C].y = b.y;
break;

case rj:
c[C].x = b.x, c[C].y = b.y;
var d = b.x - a[C].x, e = b.y - a[C].y;
c[C].Qa += d, c[C].Xa += e, c[C].ic += d, c[C].xc += e;
}
return c;
}
function oy(a, b, c) {
var d, e = (b.y - a.y) / (b.x - a.x);
return d = oa(e) ? {
Pf:e,
dd:a.y - e * a.x
} :{
Pf:r,
dd:a.x
}, e = d.Pf, d = d.dd, e == r ? {
Pf:r,
dd:0 > b.y - a.y ? d + c :d - c
} :(c *= s[Pb](1 + e * e), {
Pf:e,
dd:0 < b.x - a.x ? d + c :d - c
});
}
function qy(a, b) {
var d, c = (a.x - b.x) / (b.y - a.y);
return oa(c) ? d = a.y - c * a.x :(c = r, d = a.x), {
Pf:c,
dd:d
};
}
function py(a, b) {
var c = a.Pf, d = a.dd, e = b.Pf, f = b.dd;
if (oa(c) || (c = r), oa(e) || (e = r), ov(c, e)) return ov(d, f) ? r :l;
if (c == r) return new $(d, e * d + f);
if (e == r) return new $(f, c * f + d);
var g = e - c;
return new $(-(f - d) / g, (d * e - c * f) / g);
}
function sy(a, b) {
a ? b[L] != a[L] && h(u("colorsScale and valuesScale must be of the same length")) :1 != b[L] && h(u("colorsScale must contain exactly one element when no valueScale is provided")), 
this.yc = a, this.Ae = Rr(b, function(a) {
return Yu(a).Fk;
});
}
function vy(a, b) {
if (b && 0 != b[L] ? 1 == b[L] && (b = [ ty[0], b[0] ]) :b = a && 3 == a[L] ? uy :ty, 
!a || 2 > a[L]) return {
Sl:l,
Rl:[ Mr(b) ]
};
var c = a[0], d = a[a[L] - 1], e = d - c;
if (0 == e) return {
Sl:[ d ],
Rl:[ Mr(b) ]
};
if (2 == a[L]) for (a = [], d = e / (b[L] - 1), e = 0; e < b[L]; e++) a[x](c + d * e);
return {
Sl:a,
Rl:b
};
}
function wy(a, b, c, d) {
var e = {}, f = {}, g = b.gv || google[Hc][ac].DECIMAL_PATTERN;
if (b[Wb] == il) var f = b.u, e = a.yc[0][kc](), i = a.yc[a.yc[L] - 1][kc](), g = new google[Hc][ac]({
pattern:g
}), e = g[Ac](e), i = g[Ac](i), f = {
Db:{
text:e,
width:d ? d(e, f)[y] :0,
height:f[N]
},
Mb:{
text:i,
width:d ? d(i, f)[y] :0,
height:f[N]
}
}, d = f.Db[S] / 4, e = new zt(f.Db[y] + d, 0, b[y] - (f.Db[y] + f.Mb[y] + 2 * d), b[S]); else e = new zt(0, 0, b[y], b[S]);
var q, d = .33 * e[S], i = 2 * (d / s[Pb](3)), g = new zt(e[F] + i / 2, e.top + d + 1, e[y] - i, e[S] - d - 1), k = a.Ae, m = a.yc, p = m[m[L] - 1] - m[0];
if (0 == p) q = [ {
zb:new zt(g[F], g.top, g[y], g[S]),
a:new vv({
fill:k[0]
})
} ]; else {
q = [];
for (var p = g[y] / p, t = g[F], w = 0, A = 0; A < m[L] - 1; ++A) w = t + (m[A + 1] - m[A]) * p, 
q[A] = {
zb:new zt(t, g.top, w - t, g[S]),
a:new vv({
q:{
Qa:t,
Xa:0,
ic:w,
xc:0,
Jd:k[A],
Kd:k[A + 1]
}
})
}, t = w;
}
for (g = q, k = e, m = b.fv, e = [], q = 0; q < c[L]; ++q) p = c[q][ub], t = a.yc, 
p < t[0] ? p = 0 :(w = k[y] - i, p > t[t[L] - 1] ? p = w :(A = t[t[L] - 1] - t[0], 
p = 0 == A ? .5 * w :w * ((p - t[0]) / A))), p = k[F] + p + i / 2, p = [ p - i / 2, k.top, p + i / 2, k.top, p, k.top + d ], 
t = new vv({
fill:m,
stroke:m
}), e[q] = {
path:p,
a:t
};
for (a = [], b[Wb] == il && (a = f, c = [], c[0] = {
x:0,
y:b[S] - a.Db[S],
text:a.Db[z],
style:b.u
}, c[1] = {
x:b[y] - a.Mb[y],
y:b[S] - a.Mb[S],
text:a.Mb[z],
style:b.u
}, a = c), a = {
Zp:g,
$p:e,
aq:a
}, f = a.Zp, c = 0; c < f[L]; ++c) d = f[c], b[Wb] == Mq && (i = d.zb[F], Aa(d.zb, d.zb.top), 
d.zb.top = i, i = d.zb[y], pa(d.zb, d.zb[S]), $a(d.zb, i)), Aa(d.zb, d.zb[F] + b[F]), 
d.zb.top += b.top, b[Wb] == Mq && (d.a.q.Xa = d.a.q.Qa, d.a.q.Qa = 0, d.a.q.xc = d.a.q.ic, 
d.a.q.ic = 0), d.a.q != l && (d.a.q.Qa += b[F], d.a.q.Xa += b.top, d.a.q.ic += b[F], 
d.a.q.xc += b.top);
for (f = a.$p, c = 0; c < f[L]; ++c) for (d = 0; 3 > d; ++d) b[Wb] == Mq && (i = f[c][Sb][2 * d], 
f[c][Sb][2 * d] = f[c][Sb][2 * d + 1], f[c][Sb][2 * d + 1] = i), f[c][Sb][2 * d] += b[F], 
f[c][Sb][2 * d + 1] += b.top;
for (f = a.aq, c = 0; c < f[L]; ++c) f[c].x += b[F], f[c].y += b.top;
return a;
}
function xy(a) {
return {
name:rq,
Ud:{
className:Dk
},
content:Rr(a, function(a) {
return {
name:gm,
content:yy(a[C]),
Ud:{
className:Ck
}
};
})
};
}
function yy(a) {
return Rr(a.gc, function(a, c) {
switch (a[I]) {
case Ap:
return {
name:bp,
style:gk + a[C][O].eb + xf + (a[C][O].hf ? Dl :X) + zf + (a[C][O].rm ? tq :X) + yf + (a[C][O][lc] ? Sh :X) + wf,
content:(0 == c ? U :vd) + a[C][z]
};

case ep:
return {
name:Lj,
style:Eh + (a[C].a && a[C].a.Y) + wf,
Ud:{
className:Fk
}
};
}
});
}
function zy(a, b, c, d, e, f) {
var g = {
gc:[]
};
return e != l && (e = xv(e), g.gc[x]({
type:ep,
data:{
size:b[N] / 2,
a:e
}
})), c != l && (d == l && h(u("Line title is specified without a text style.")), 
c = {
type:Ap,
data:{
text:c + vf,
style:d
}
}, g.gc[x](c)), c = {
type:Ap,
data:{
text:a,
style:b
}
}, g.gc[x](c), f != l && (g.id = f, g.background = {
a:wv
}), {
type:hm,
data:g
};
}
function Ay(a, b, c, d, e, f, g, i) {
if (i) return 0 == a.W[L] ? a = {
name:Lj,
content:[],
Ud:{
className:zk
}
} :(Qr(a.W, function(a) {
return a[I] == so;
}), g = Wr(a.W, function(a) {
return a[I] == so;
}), -1 == g ? a = xy(a.W) :(b = xy(cs(a.W, 0, g)), a = cs(a.W, g + 1), a = {
name:rq,
Ud:{
className:Bk
},
content:Rr(a, function(a) {
return {
name:gm,
id:kw([ Tg, a[C].id ]),
content:yy(a[C]),
Ud:{
className:Ak
}
};
})
}, a = Zr(b, {
name:Lj,
Ud:{
className:Ek
}
}, a)), a = {
name:Lj,
content:a,
Ud:{
className:zk
}
}), {
zh:a,
ap:n,
bp:f,
anchor:f,
$o:e,
cp:20,
margin:5
};
for (var k = i = 0; k < a.W[L]; k++) {
var m = a.W[k];
if (m[I] == hm) for (var m = m[C], p = 0; p < m.gc[L]; p++) {
var q = m.gc[p];
q[I] == Ap && (i = s.max(i, q[C][O][N]));
}
}
g = 0 == i ? g :i;
for (var t, m = i = k = 0; m < a.W[L]; m++) switch (p = a.W[m], p[I]) {
case hm:
p = By(p[C], b), i += p[S] + (m > 0 ? p.pf :0), k = s.max(k, p[y]);
break;

case so:
i += 1.5 * g + p[C].a.I;
}
k = s.max(k, 2 * g), k = s[B](k + 2 * g / 1.618), i = s[B](i + 2 * g / 1.618), t = new qs(k, i);
var k = d.x >= f.x ? 1 :-1, m = d.y > f.y ? 1 :-1, w = l, w = c ? new $(d.x + k * g, d.y + m * (g + t[S] / 2)) :new $(d.x + k * t[y] / 2, d.y + m * t[S] / 2), p = w.x - t[y] / 2, q = p + t[y], A = w.y - t[S] / 2, E = A + t[S], i = {};
for (c && (c = new $(w.x, d.y + g / (g + t[S] / 2) * (w.y - d.y)), w = new $(w.x + -1 * (d.x - w.x), c.y), 
c.x = s[B](c.x), c.y = s[B](c.y), w.x = s[B](w.x), w.y = s[B](w.y), i.Sb = 1 == k * m ? [ c, d, w ] :[ w, d, c ]), 
i.j = new xt(s[B](A), s[B](q), s[B](E), s[B](p)), d = e[F] + 5, c = e[T] - 5, i.j[F] >= d && i.j[T] <= c || (k = ys(i), 
m = k.j[F], Aa(k.j, f.x + -1 * (k.j[T] - f.x)), ab(k.j, f.x + -1 * (m - f.x)), (m = k.Sb) && (p = m[0], 
m[0] = m[2], m[2] = p, m[0].x = f.x + -1 * (m[0].x - f.x), m[1].x = f.x + -1 * (m[1].x - f.x), 
m[2].x = f.x + -1 * (m[2].x - f.x)), k.j[F] >= d && k.j[T] <= c ? (i.j = k.j, i.Sb = k.Sb) :(i.Sb && (m = new mv(d + 4, c - 4), 
p = new mv(k.Sb[0].x, k.Sb[2].x), q = new mv(i.Sb[0].x, i.Sb[2].x), !(m[Q] <= q[Q] && m.end >= q.end) && m[Q] <= p[Q] && m.end >= p.end && (i.j = k.j, 
i.Sb = k.Sb)), i.j[T] > c && (Aa(i.j, i.j[F] - (i.j[T] - c)), ab(i.j, c)), i.j[F] < d && (ab(i.j, i.j[T] + (d - i.j[F])), 
Aa(i.j, d)))), d = e.top + 5, e = e[R] - 5, i.j.top >= d && i.j[R] <= e || (c = ys(i), 
k = c.j.top, c.j.top = f.y + -1 * (c.j[R] - f.y), Xa(c.j, f.y + -1 * (k - f.y)), 
(k = c.Sb) && (m = k[0], k[0] = k[2], k[2] = m, k[0].y = f.y + -1 * (k[0].y - f.y), 
k[1].y = f.y + -1 * (k[1].y - f.y), k[2].y = f.y + -1 * (k[2].y - f.y)), c.j.top >= d && c.j[R] <= e ? (i.j = c.j, 
i.Sb = c.Sb) :(i.j[R] > e && (i.j.top -= i.j[R] - e, Xa(i.j, e)), i.j.top < d && (Xa(i.j, i.j[R] + (d - i.j.top)), 
i.j.top = d), delete i.Sb)), f = {}, e = g / 1.618, e = new xt(i.j.top + e, i.j[T] - e, i.j[R] - e, i.j[F] + e), 
d = [], A = e.top, c = 0; c < a.W[L]; c++) {
switch (m = a.W[c], k = {
ob:m,
data:{}
}, m[I]) {
case hm:
for (m = m[C], p = k[C], q = By(m, b), c > 0 && (A += q.pf), m[Mc] && (p.background = {
j:new xt(A - q.pf / 2, i.j[T], A + q[S] + q.pf, i.j[F])
}), E = [], w = e[F], t = 0; t < m.gc[L]; t++) {
var K = {}, V = Cy(m.gc[t], b);
t > 0 && (w += V.Fm);
var G = A + (q[S] - V[S]) / 2;
K.j = new xt(s[B](G), s[B](w + V[y]), s[B](G + V[S]), s[B](w)), E[x](K), w += V[y];
}
p.gc = E, A += q[S];
break;

case so:
m = m[C], p = A + g + m.a.I / 2, k[C].Wa = new qu(i.j[F], p, i.j[T], p), A += 1.5 * g + m.a.I / 2;
}
d[x](k);
}
return f.W = d, {
outline:i,
Ch:f
};
}
function By(a, b) {
for (var c = 0, d = 0, e = 0, f = 0; f < a.gc[L]; f++) var g = Cy(a.gc[f], b), c = c + (g[y] + (f > 0 ? g.Fm :0)), d = s.max(d, g[S]), e = s.max(e, g[S] / 2 + g.pf);
return {
width:c,
height:d,
pf:e - d / 2
};
}
function Cy(a, b) {
switch (a[I]) {
case Ap:
return {
width:b ? b(a[C][z], a[C][O])[y] :0,
height:a[C][O][N],
pf:a[C][O][N] / 3.236,
Fm:a[C][O][N] / 3.236
};

case ep:
var c = a[C].size;
return {
width:c,
height:c,
pf:c,
Fm:c
};
}
}
function Dy(a, b) {
var c = a.sc(Wg, b), d = [], e = a.Uh(Vg);
if (e !== l) for (var f = {}, g = 0; e > g; g++) {
var i = a.O(Ug + g + Ne);
i === l && h(u('Missing mandatory ID for action at index "' + g + Hd)), f[i] && h(u('Duplicate action ID "' + i + '": unique ID expected')), 
f[i] = j, d[x]({
id:i,
text:a.ud(Ug + g + Qe)
});
}
for (this.Gs = [], g = 0; e > g; g++) f = d[g], this.Gs[x](zy(f[z], c, l, l, l, f.id));
}
function Ey(a, b, c, d) {
b = a.sc(aq, {
eb:b.eb,
fontSize:b[N]
}), this.wg = a.$(Zp, c == vi), this.w = b, a = xs(b), a[lc] == l && (a.bold = j), 
this.bk = a, this.Vd = d || l;
}
function Fy(a, b, c, d) {
Ey[P](this, a, b, c, d);
}
function Gy(a, b, c) {
Ey[P](this, a, b, c), this.Mq = this.bk, this.Oj = xs(this.w), xa(this.Oj, Nd), 
Ra(this.Oj, this.Oj[N] - 2);
}
function Hy(a) {
return new ru(s[B](a.x), s[B](a.y));
}
function Iy() {
return Sr(arguments, su, new ru(0, 0));
}
function Jy() {
return Sr(arguments, function(a, c) {
return new qs(a[y] + c[y], a[S] + c[S]);
}, new qs(0, 0));
}
function Ky(a, b, c) {
return new ru(s.cos(a) * b, s.sin(a) * c);
}
function Ly(a) {
return new ru(a[0], a[1]);
}
function My(a, b) {
return Rr([ [ a.x - b[y] / 2, a.y - b[S] / 2 ], [ a.x + b[y] / 2, a.y - b[S] / 2 ], [ a.x + b[y] / 2, a.y + b[S] / 2 ], [ a.x - b[y] / 2, a.y + b[S] / 2 ] ], Ly);
}
function Ny(a, b, c) {
this.yg = b, this.kf = new xt(0, c[y], c[S], 0), b = b.lr() ? ci :dk, this.Zk = a.U(bq, Xv, b);
}
function Oy(a, b, c, d, e) {
d != Mj && (this.Vd = new Dy(a, c)), c = this.CA(a, c, d, e), this.je = new Ny(a, c, b);
}
function Py(a) {
this.selected = new hw(), this.z = {
Qb:l,
Bd:l,
nd:l
}, this.qb = {
z:l,
Ni:l
}, this.o = {
z:{
ob:l
},
vg:l
}, this.kc = {
z:{
Ph:l
}
}, Na(this, {
position:l,
Vp:l
}), a && (this[rb][Tb](a[rb]), a.z && (this.z = Qy(this.z, a.z)), a.qb && (this.qb = Qy(this.qb, a.qb)), 
a.o && (this.o = Qy(this.o, a.o)), a.kc) && (this.kc = Qy(this.kc, a.kc));
}
function Qy(a, b) {
var c = new jw(2);
return c.vb(0, a), c.vb(1, b), c[nd]();
}
function Ry(a, b, c, d, e, f) {
Oy[P](this, a, b, c, d, e);
var g = a.$(Tj, j);
this.Qz = g, this.Ws = vw(f, function(b) {
return a.$(Bo + b + Ke, g);
}), this.zy = Tr(this.Ws, mw), this.Si = j;
}
function Vy(a, b, c, d) {
this.jt = s.pow(a, 2), this.oA = s.pow(b, 2), this.nA = b, this.kt = (this.Wg = c ? new mv(d[rd](c[Q]), d[rd](c.end)) :l) ? this.Wg.end - this.Wg[Q] :l, 
this.pA = d;
}
function Yy(a) {
var b = {};
xa(b, a[zb] || a);
var c = jv(b[zb]);
return c == X ? (b.rg = a.darker || c, b.Uj = a.lighter || c) :(c = dv(c), b.rg = a.darker || bv(gv([ 0, 0, 0 ], c, .25)), 
b.Uj = a.lighter || bv(gv([ 255, 255, 255 ], c, .25))), b;
}
function Zy(a, b, c, d) {
this.D = a, this.i = b, this.g = d, this.pa = c, this.w = this.i.sc(mi, {
eb:d.ed,
fontSize:d.Fc,
fb:d.Je
}), this.Ob = this.i.fd(li, Zd), this.Hu = this.i.Uf(ki, .8), this.cl = 0, this.jh = 1, 
this.kh = 2, this.ke = 3, this.le = 4, this.yd = this.Go = this.Fo = this.Io = this.Ho = U, 
this.Jl = this.i.O(mj, Qx), this.Gu = Yy(this.Jl[0])[zb], this.zo = this.ll = this.Yk = this.Xk = this.bg = this.Xf = l, 
this.$k();
}
function az(a) {
switch (a) {
case og:
return 1;

case yg:
return 1e3;

case pg:
return 6e4;

case eg:
return 36e5;

case Zf:
return 864e5;

case Eg:
return 6048e5;

case rg:
return 2629746e3;

case wg:
return 7889238e3;

case Hg:
return 31556952e3;
}
}
function dz(a, b, c, d) {
this.yk = b, this.pd = new google[Hc][ac]({
pattern:a
}), this.xA = c, this.wA = d;
}
function ez() {
this.rt = new Date(), this.Nh(og);
}
function fz() {
this.Un = l, this.Ug = [], this.Tn = this.Mf = this.yi = l;
}
function gz(a, b, c, d) {
this.cA = a, this.Ug = b || [], this.yi = c || l, this.Mf = d || l;
a:for (a = this.Ug, b = r, c = 0; c < a[L]; c++) {
if (d = a[c], b < d.yk) break a;
b = d.yk;
}
}
function hz(a, b, c, d, e, f) {
this.vz = a, this.k = b, this.tz = c, this.uz = d, this.te = f;
}
function iz(a, b, c) {
return new hz(a, b, j, j, j, c);
}
function jz(a, b, c) {
return new hz(a, b, n, n, n, c);
}
function kz(a, b) {
this.oi = a, this.ni = b || 0, this.vs = this.sz(this.oi + this.ni), this.k = 0;
}
function lz(a, b, c, d) {
this.N = a, this.Jc = b, this.Hb = c, this.pd = d;
}
function mz(a, b, c, d, e) {
this.Ck = a, this.Mn = b, this.Vg = e, a = this.Rn(a), b = this.Rn(b) - a, this.Kf = (d - c) / b, 
this.xi = this.Kf * a - c;
}
function nz(a, b) {
return 0 > b ? a / s.pow(10, -b) :a * s.pow(10, b);
}
function oz(a) {
return s[D](.4342944819032518 * s.log(a));
}
function pz(a) {
return s[lb](.4342944819032518 * s.log(a));
}
function qz(a, b, c, d, e, f) {
this.Ef = a, this.ai = b, this.ng = c, this.mg = d, this.cy = e, this.Jr = f, this.Cc = this.dy(), 
a >= this.Cc ? (this.Na = this.Fe(a, b, c, d), this.Ab = s[B](this.Na.ua(this.Cc))) :b <= -this.Cc ? (this.Na = this.Fe(-b, -a, d, c), 
this.Ab = s[B](this.Na.ua(this.Cc)), f = 2 * this.Ab - d, e = 2 * this.Ab - c, this.Na = this.Fe(-b, -a, f, e)) :a >= -this.Cc ? (this.Ab = s[B](c), 
this.Na = this.Fe(this.Cc, b, this.Ab, d)) :b <= this.Cc ? (this.Ab = s[B](d), e = 2 * this.Ab - c, 
this.Na = this.Fe(this.Cc, -a, this.Ab, e)) :(this.Na = this.Fe(this.Cc, b, 0, 1), 
e = this.Na.ua(-a), this.Ab = s[B](c + (d - c) * (e / (e + 1))), b >= -a ? this.Na = this.Fe(this.Cc, b, this.Ab, d) :(e = 2 * this.Ab - c, 
this.Na = this.Fe(this.Cc, -a, this.Ab, e))), this.gg = c > d;
}
function rz(a) {
this.Dz(a), this.Cz = a[pb](), this.li = a[L], this.k = 0;
}
function sz(a, b, c, d, e) {
this.Na = a, this.wn = e, this.Ac = new lz(a, c, d, b), this.Xd = new rz([ 1, 2, 5 ]);
}
function tz(a, b, c, d) {
this.Ck = a, this.Mn = b, this.Vn = c, this.dt = d, this.Kf = (this.dt - this.Vn) / (this.Mn - this.Ck), 
this.xi = this.Kf * this.Ck - this.Vn;
}
function uz(a, b) {
this.ek = a, this.di = s[D](a / 10), this.Zd = a - this.di, this.cb = 0, this.fk = oz(s.abs(b)), 
this.Ff = this.Zd * this.fk, this.k = 0;
}
function vz(a, b, c, d, e, f) {
this.N = a, this.pd = b, this.Jc = c, this.Hb = d, this.Zj = f, this.Rx = e, this.Ac = new lz(a, c, d, b), 
this.Xd = new rz([ 1, 2, 5 ]);
}
function wz(a, b) {
a != l ? (s[B](a), this.He = a) :this.He = 1, 12 < this.He && (this.kA = new kz(s[D](this.He / 12)));
var c = b || 0;
s[B](c), this.jA = c, this.Ec = new Date(), this[D](0);
}
function xz() {
this.k = 0;
}
function yz(a) {
a ? (this.Xb = [ 1e3, 5e3, 1e4, 15e3, 3e4, 6e4, 3e5, 6e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 6048e5, 2629746e3, 7889238e3, 31556952e3 ], 
this.ab = new rz([ 1, 2, 5 ])) :(this.Xb = [ 1e3, 6e4, 36e5, 864e5, 6048e5, 2629746e3, 7889238e3, 31556952e3 ], 
this.ab = new xz()), this.$j = this.ab[B](this.Xb[0]), this.Xm = this.ab.jb(), this.Bx = this.Xm + (this.$j - this.Xm) / 2, 
this.Lg = this.Xb[this.Xb[L] - 1], this.ab[B](1), this.Ar = this.Lg * this.ab[yc](), 
this.Cx = this.Lg + (this.Ar - this.Lg) / 2, this.oc(2);
}
function zz(a, b) {
var c = b != l ? b :1, a = new yz(j)[B](a);
return 2629746e3 > a ? 6048e5 == a ? new kz(a, 864e5 * (3 + c)) :new kz(a) :new wz(s[B](a / 2629746e3));
}
function Az(a, b) {
if (0 == a) return 0;
for (var c = a, d = 0, e = 0/0; ;) {
var f = oz(c), g = nz(1, f), i = Bz(c);
if (i > 5 && (e = 5 * g + d, e = Cz(e, f), a >= e && e > a - b)) break;
if (e = i * g + d, e = Cz(e, f), a >= e && e > a - b) break;
f = i * g, d += f, c -= f;
}
return e;
}
function Dz(a, b) {
if (0 == a) return 0;
for (var c = a, d = 0, e = 0/0; ;) {
var f = oz(c), g = nz(1, f), i = Bz(c);
if (5 > i && (e = 5 * g + d, e = Cz(e, f), a + b >= e && e >= a)) break;
if (e = i * g + d, e = Cz(e, f), a + b >= e && e >= a) break;
if (e = (i + 1) * g + d, e = Cz(e, f), a + b >= e && e >= a) break;
f = i * g, d += f, c -= f;
}
return e;
}
function Cz(a, b) {
var c = nz(1, s.abs(b));
return s[B](a * c) / c;
}
function Bz(a) {
var b = oz(a), a = a / nz(1, b), b = s.abs(s[B](a) - a);
return 0 != b && 1e-10 > b && (a = s[B](a)), s[D](a);
}
function Ez(a, b, c, d, e, f, g, i, k) {
this.rx = a, this.tr = b, this.vr = c, this.Jc = d, this.mc = e, this.N = f, this.Xj = g, 
this.Hb = i, this.Rm = k, this.qx = az(a), this.Wj = az(b), this.mc.Nh(this.tr);
}
function Fz(a, b, c, d, e, f, g) {
this.N = a, this.eh = b, this.Jc = c, this.mc = d, this.Xj = e, this.Hb = f, this.Rm = g, 
this.ds = this.Gy();
}
function Gz(a, b) {
this.Ps = a, this.w = b;
}
function Hz(a, b, c, d, e) {
this.Xh = a, this.Sj = b, this.Nq = c, this.kw = d.R(e(Sk)), this.mw = d.R(e(Uk)), 
this.lw = d.R(e(Tk)), this.Hv = d.R(e(Rk)), this.jw = d.R(e(Pk)), this.Kp = d.R(e(Qk)), 
this.Sx = d.R(e(Yk)), this.Qq = d.$(e(Mk));
}
function Jz(a, b, c, d) {
return d = jr(d) ? d :0, c == gp ? (c = a, a = c + b) :(c = s[B](a - b / 2), a = s[B](a + b / 2)), 
new mv(c - d, a + d);
}
function Mz(a, b, c, d, e, f) {
this.rh = c, this.i = b, Pa(this, d), Da(this, b.U(this.s(qq), Ax, e)), this.Mb = this.Db = l, 
this.oh = [], this.Ji = l, this.St = 0 < a.gb.bars, c = b.ud(this.s(Pp)), d = {
eb:a.ed,
fontSize:a.Fc,
fb:a.Xg == ql ? a.Je :X
}, d = b.sc(this.s(Tp), d), La(this, {
text:c,
u:d,
f:[],
Va:Ci,
Oa:gp,
G:U
}), this.Nc = l, this.tc = b.U(this.s(Hp), Gx, cn), c = {
color:this[I] != Jq || a.J == no ? b.ud(sm) :b.ud(Dm),
eb:a.ed,
fontSize:a.Fc,
fb:this.tc == ql ? a.Je :X
}, this.Z = b.sc(this.s(Ip), c), d = b.R(this.s(Wk)), d = pv(this.Z[zb], a.Di || ke, d), 
this.ih = b.sc(this.s(Ip), c), xa(this.ih, d), this.Tt = b.U(this.s(dn), Hx, sq), 
this.oo = b.U(this.s(sl), Ix, qm), c = b.fd(this.s(Lh), a.Pt), this.Rt = new vv({
fill:c
}), c = b.fd(this.s(Nk), a.Qt), this.ce = new vv({
fill:c
}), this.ml = b.R(this.s(Fm), 0), d = b.R(this.s(Vk)), a = pv(c, a.Di || ke, d), 
a = b.fd(this.s(Em), a), this.Gi = new vv({
fill:a
}), this.kd = 2, this.lo = s.max(this.kd, s[B](this[oc].u[N] / 3.236)), this.A = [], 
this.Ei = 0, this.direction = this.Tc = b.Ke(this.s(Ij), 1), this.xb = this.ac = l, 
this.fh = this.ah = 0, this.B = {
min:-r,
max:r
}, this.Sc = l, this.Ut = f, this[I] == Jq && (this.qo = this.ga = this.n = l, this.eh = b.U(this.s(Np), $y, og), 
this.Hi = r);
}
function Nz(a, b, c, d, e, f, g, i, k, m) {
this.hr = a, this.Ee = b, this.Ey = c, this.wx = d, this.$r = e, this.lk = f, this.Rw = g, 
this.Fy = i, this.Ow = k, this.ir = m;
}
function Oz(a, b, c, d) {
switch (d) {
case Bh:
return a;

case Ah:
return (b - 1 - a) % c;
}
}
function Pz(a, b, c, d, e, f) {
Mz[P](this, a, b, Zr([ $k + d, al ], c), d, e, f), this.kl = b.or(this.s(To)), a = b.R(this.s(Uo), 30), 
(1 > a || a > 90) && (a = 30), this.Iu = a, this.qj = ks(a), this.wo = b.R(this.s(ak)), 
this.xo = b.R(this.s(vm), r), this.hl = b.R(this.s(um), 2), this.Yi = b.R(this.s(Jo), 0), 
this.el = b.U(this.s(Ko), Ox, Bh), this.yo = b.R(this.s(Bm), this.Z[N]), this.vo = b.$(this.s($g), n);
}
function Qz(a, b, c, d, e, f) {
Mz[P](this, a, b, Zr([ Gq + d, Hq ], c), d, e, f), this[I] == Jq && (this.direction = -this[bb]);
}
function Rz(a, b, c, d) {
this.D = a, this.i = b, this.pa = c, this.Yf = l, this.g = d, this.cc = this.ma = this.qe = this.dl = this.Ba = this.ea = this.hb = this.pb = l, 
this.Kl = 1, this.Ui = l, this.Qi = b.gh(bq, Xv) != X, this.g.Gb = b.U(ek, Mx, Bj), 
d.Gb == vi && d.J != W && h(u("Focus target " + d.Gb + " is not supported for the chosen chart type.")), 
d.J == ji ? this.qe = new Zy(this.D, this.i, this.pa, d) :(this.Yf = b.O(mj, Qx), 
this.uv()), a = 0 < d.gb.bars || 0 < d.gb.area || 0 < d.gb.steppedArea, this.g.vd = this.i.$(Cl) && a, 
this.g.mo = this.i.$(Io, n), this.tv();
}
function Sz(a, b) {
switch (a) {
case zo:
return b.rg;

case Ao:
return b.Uj;

case yo:
return b[zb];

default:
return a;
}
}
function Tz(a, b, c) {
this.g = a, this.k = c ? b.U(ej, Dx, c) :X, this.w = b.sc(fj, {
eb:a.ed,
fontSize:a.Fc,
fb:this.k == ql ? a.Je :X
}), this.Kv = b.Xl(dj), this.Lj = this.L = l;
}
function Uz(a, b, c) {
this.Gn = a, this.pg = b, this.Dh = a - b / 2, this.ju = c, Pa(this, 0);
}
function Vz(a, b) {
this.Ln = a, this.Lf = b;
for (var c = 0, d = b[L]; d > c; c++) Pa(b[c], c);
}
function Wz(a, b, c) {
this.g = a, this.k = c ? b.U(Pl, Cx, c) :X, this.Ti = b.U(Ll, Fx, this.k == di ? Ci :gp), 
c = il, (this.k == Jl || this.k == bo || this.k == Il) && (c = Mq), this.Hb = c, 
this.w = b.sc(Ul, {
eb:a.ed,
fontSize:a.Fc,
fb:this.k == ql ? a.Je :X
}), this.Cd = n, this.Jo = b.sc(Ol, this.w), this.pa = a.wb, this.rb = this.w[N], 
this.ge = s[B](this.w[N] / (1.618 * 1.618)), this.Hh = this.L = l, this.pl = b.$(Tl, j), 
this.Yt = b.U(Sl, Ex, this.Hb), this.Wt = b.Ne(Ql), this.Xt = b.Ne(Rl), this.ta = l, 
this.rj = this.ge, this.Ue = this.Ve = this.ol = 0, this.bq = this.k == jq ? b.R(Nl, 1) :1, 
this.nh = 0;
}
function Xz(a, b, c, d, e) {
var f = a[T] - a[F], g = xs(d);
xa(g, qf);
var i = xs(d);
xa(i, uf);
var q, k = d[N] / 3.236, m = g[N] + k, p = i[N] + k, d = g[N] + k, t = i[N] + k, w = Rr(e, function(a, c) {
var d = Tx(b, a.dg, g, f, r), e = Tx(b, a.eg, i, f, r);
return {
nf:c,
vm:a.Co,
Ag:a.Co,
ye:d.f[L],
mf:e.f[L],
Ij:k,
Jj:k
};
});
es(w, function(a, b) {
return a.Ag - b.Ag;
});
var A = Rr(w, function(a) {
return a;
});
for (es(A, function(a, b) {
return e[a.nf].Ao - e[b.nf].Ao;
}); q = Yz(a, d, t, e, w, n), q.Kj; ) {
for (var E = q.me, K = 0; K < w[L]; K++) {
var V = w[K];
V.Ag = E[V.nf].y;
}
for (K = 0; K < A[L]; K++) if (V = A[K], E[V.nf].Kj) {
0 < V.mf ? V.mf-- :0 < V.ye && (V.ye--, 0 == V.ye && (Yr(w, V), Nr[od][P](A, K, 1)));
break;
}
}
for (d = Yz(a, d, t, e, w, j), d.Kj || (q = d), q = q.me, d = [], 2 == c ? (c = a[T], 
a = a[F], t = Uj) :(c = a[F], a = a[T], t = gp), w = 0; w < e[L]; ++w) if (A = e[w], 
E = q[w], E != l) {
var G = Tx(b, A.dg, g, f, E.ye), ka = Tx(b, A.eg, i, f, E.mf), K = Hy(new ru(c, E.y));
d[x]({
vp:2,
fc:Hy(A.Bo(is(E.y, A.$i[Q], A.$i.end))),
xp:a,
ld:K,
zu:new vv({
fill:pf,
Cb:.7
}),
Pa:new vv({
stroke:pf,
Aa:1,
jd:.7
}),
$B:k,
dg:{
text:A.dg,
u:g,
anchor:{
x:K.x,
y:K.y
},
f:Rr(G.f, function(a, b) {
return {
x:0,
y:(b - G.f[L]) * m,
length:G.ec,
text:a
};
}),
Va:t,
Oa:gp,
G:G.la ? A.dg :U
},
XB:g,
eg:{
text:A.eg,
u:i,
anchor:{
x:K.x,
y:K.y
},
f:Rr(ka.f, function(a, b) {
return {
x:0,
y:(b + 1) * p,
length:ka.ec,
text:a
};
}),
Va:t,
Oa:Uj,
G:ka.la ? A.eg :U
},
ZB:i,
YB:t,
index:A[sc]
});
}
return d;
}
function Yz(a, b, c, d, e, f) {
function g(a, b) {
return s.max(s.abs(a[Sc] - b[Sc]), s.abs(a.top - b.top), s.abs(a[R] - b[R]));
}
function i(a, b) {
return {
anchor:a[Sc] + (b[Sc] || 0),
top:a.top + (b.top || 0),
bottom:a[R] + (b[R] || 0)
};
}
0 < e[L] && (e[0].Ij = 0, Mr(e).Jj = 0);
for (var k = 0; k < e[L]; k++) {
var m = e[k], p = e[k - 1], q = e[k + 1], q = q ? d[q.nf].$i.end - 5 :a[R];
m.Ds = new mv(s.min(m.vm, p ? d[p.nf].$i[Q] + 5 :a.top), s.max(m.vm, q));
}
m = ss(e, function(a) {
return {
anchor:a.Ag,
top:a.Ag - (a.ye * b + a.Ij),
bottom:a.Ag + (a.mf * c + a.Jj)
};
}), k = [], k[x](function(b, c) {
var d = b[c].top;
return 0 == c ? {
top:s.max(a.top - d, 0)
} :{
top:s.max(b[Lr(c) - 1][R] - d, 0) / 2
};
}), k[x](function(b, c) {
var d = b[c][R];
return c == e[L] - 1 ? {
bottom:s.min(a[R] - d, 0)
} :{
bottom:s.min(b[Lr(c) + 1].top - d, 0) / 2
};
}), k[x](function(a, c, d) {
var g = a[c][Sc] - a[c].top, a = s.max(-g, 0), c = s.max(e[c].ye * b + e[c].Ij - s.max(g, 0), 0), d = (a + c * (f ? 1 :d)) / 2;
return {
anchor:d,
top:-d
};
}), k[x](function(a, b, d) {
var g = a[b][R] - a[b][Sc], a = s.max(-g, 0), b = s.max(e[b].mf * c + e[b].Jj - s.max(g, 0), 0), d = (a + b * (f ? 1 :d)) / 2;
return {
anchor:-d,
bottom:d
};
}), k[x](function(a, b) {
var c = a[b][Sc], d = e[b];
return {
anchor:is(c, d.Ds[Q], d.Ds.end) - c
};
}), f && k[x](function(a, b, c) {
return {
anchor:(e[b].vm - a[b][Sc]) * c
};
});
for (var t, d = 1, p = 0; 1e3 > p; p++) {
var q = Gw(m, k, i, d), w = Gw(m, k, i, 0), A = pw(m, q, .05, g), w = pw(m, w, .05, g);
if (A && w) break;
m = q, d *= .99;
}
for (t = m, d = Rr(e, function(a, b) {
var c = t[na(b)];
return {
anchor:c[Sc],
top:c.top,
bottom:c[R]
};
}), p = n, q = {}, k = 0; k < e[L]; k++) {
var m = e[k], A = d[k], w = (A[Sc] - A.top - m.Ij) / b, E = (A[R] - A[Sc] - m.Jj) / c, w = s[D](w + .1), E = s[D](E + .1), K = w < m.ye || E < m.mf, p = p || K;
q[m.nf] = {
y:A[Sc],
ye:w,
mf:E,
Kj:K
};
}
return {
me:q,
Kj:p
};
}
function Zz(a, b) {
var c = Wr(a, function(a) {
return a[sc] == b;
});
if (0 > c) return {};
var d = {};
return d[c] = {
vp:4,
Pa:new vv({
stroke:pf,
Aa:2,
jd:.7
})
}, d;
}
function $z(a, b, c, d) {
for (var e = 0; e < a[mc](); e++) 0 > a[J](e, 1) && h(u("Negative values are invalid for a pie chart."));
this.D = a, this.i = b, this.pa = c, this.Yf = b.O(mj, Qx), this.ep = b.Ke(yn, 0), 
this.ku = 0 > b.Ke(Ij, 1), this.g = d, this.g.Gb = xo, this.ma = l;
}
function aA(a, b) {
switch (b) {
case pn:
return a.am;

case Jq:
return a.Xp;

case ci:
return a.Xp + wd + a.am + we;
}
}
function bA(a, b, c, d, e) {
this.Oc = a, this.D = l, this.i = b, this.pa = c, a = this.g = {}, a.wb = c, pa(a, d), 
$a(a, e), a.J = b.U(qq, wx, X), a.ed = b.ud(kk), a.Fc = b.R(lk, s[B](s.pow(2 * (a[y] + a[S]), 1 / 3))), 
a.ko = b.U(Co, xx, hm), a.cg = b.$(Yp), a.Oi = b.U(ro, Wv, Mo), a.Li = b.Ne(Fh), 
a.Vf = b.Ne(Fi), a.Di = a.Vf.fg() ? a.Vf.Y :a.Li.fg() ? a.Vf.lh() ? pv(a.Vf.Y, a.Li.Y, a.Vf.Ic) :a.Li.Y :l, 
a.Pt = b.fd(Lh, U), a.Qt = b.fd(Lk, U), a.Je = a.Di || U, c = b.ud(Pp), a.Qf = b.U(Sp, Gx, cn), 
d = b.sc(Tp, {
eb:a.ed,
fontSize:a.Fc,
fb:a.Qf == ql ? a.Je :X
}), La(a, {
text:c,
u:d,
f:[],
Va:gp,
Oa:Uj,
G:U
}), a.Xg = b.U(Dh, Gx, cn), a.Tf = b.$(Bl), a.ae = b.$(xl), a.Rf = b.U(wl, Lx, Gj), 
this.$k(), a.Rf == Mj && (!a.gb || a.gb.line != a.d[L]) && h(u("DIVE interactivity model is only supported when all series are of type line."));
}
function cA(a, b) {
this.Ah = a, this.Bh = b, this.Rb = xs(a), this.Rb.Ja && (this.Rb.Ja = ss(this.Rb.Ja, xs), 
this.fp = ss(a.Ja, function(c, d) {
return dA(a.Ja[d], b.Ja[d], this.Rb.Ja[d], j, n);
}, this)), this.Rb.va && (this.Rb.va = ss(this.Rb.va, xs), this.gp = ss(a.va, function(c, d) {
return dA(a.va[d], b.va[d], this.Rb.va[d], n, j);
}, this)), this.og = this.re = l, this.Cy(), this.ij = this.Dl = l, this.By();
}
function dA(a, b, c, d, e) {
var f = xs(a), g = xs(a);
if (a[I] == Jq && b[I] == Jq) {
a.ga && b.ga && (g.ga = b.ga, c.ga = xs(c.ga));
var i = a[pc].Jb, k = b[pc].Jb;
if (g.sg = xs(g.sg), Ma(g, xs(g[pc])), c.sg = xs(c.sg), Ma(c, xs(c[pc])), g[pc].Jb = k, 
a.Q && b.Q) {
g.Q = $r(g.Q), c.Q = $r(c.Q);
for (var m = g.Q, p = c.Q, q = 0; q < m[L]; q++) {
m[q] = xs(m[q]), p[q] = xs(p[q]);
var t = m[q];
t.l = k(t.S);
}
}
if (a[z] && b[z]) for (qa(g, $r(g[z])), qa(c, $r(c[z])), b = g[z], q = c[z], eA(b), 
eA(q), q = 0; q < b[L]; q++) {
var c = a[z][q], w = k, A = b[q], E = d, m = e, p = A.m, t = i(A.S), w = w(A.S);
E && (E = c.m[Sc].x - t, p[Sc].x = w + E), m && (E = c.m[Sc].y - t, p[Sc].y = w + E);
}
} else if (a[z] && b[z]) {
var K = Dw(a[z], b[z], function(a, b) {
return a.S == b.S;
});
qa(f, Qr(a[z], function(a, b) {
return K.uh[b] != l;
})), qa(g, Qr(b[z], function(a, b) {
return K.vh[b] != l;
})), qa(c, $r(f[z])), eA(f[z]), eA(g[z]), eA(c[z]);
}
return [ f, g ];
}
function eA(a) {
Pr(a, function(b, c) {
a[c] = xs(a[c]), b = a[c], b.m = xs(b.m);
var d = b.m;
d[Sc] && Ua(d, xs(d[Sc]));
});
}
function gA(a, b) {
var c = xs(a);
return c.c = b, c.Ha && (c.Ha = l), c;
}
function hA(a, b, c) {
if (a !== b) if (a && a[Bc] == vv && b && b[Bc] == vv) a = new vv({
fill:pv(a.Y, b.Y, 1 - c),
Cb:hA(a.Ic, b.Ic, c),
stroke:pv(a.Ob, b.Ob, 1 - c),
Aa:hA(a.I, b.I, c),
jd:hA(a.Yc, b.Yc, c),
Im:a.xe,
q:a.q,
pattern:a.$a
}); else if (mr(a) && mr(b)) if (a) {
if (b) {
for (var d = [], e = s.min(a[L], b[L]), f = 0; e > f; f++) d[x](hA(a[f], b[f], c));
a = d;
}
} else a = b; else a = pr(a) && pr(b) ? iA(a, b, c) :rr(a) && rr(b) ? a * (1 - c) + b * c :l;
return a;
}
function iA(a, b, c) {
if (!a) return b;
if (!b) return a;
var d = {};
return rs(a, function(e, f) {
jr(b[f]) && (d[f] = hA(a[f], b[f], c));
}), d;
}
function jA(a, b, c, d, e) {
return b = !e || (c ? b >= c.top && b <= c[R] :n), (!d || (c ? a >= c[F] && a <= c[T] :n)) && b;
}
function oA(a, b, c, d, e) {
a[pc] && a[pc].Jb && b[pc] && b[pc].Jb && (c[pc].Jb = function(c) {
var d = a[pc].Jb(c), c = b[pc].Jb(c);
return hA(d, c, e);
}), a.ga && b.ga && (c.ga.l = hA(a.ga.l, b.ga.l, e)), a.Q && b.Q && Pr(c.Q, function(c, g) {
c.l = hA(a.Q[g].l, b.Q[g].l, e), c.v = d(c.l, c.l);
}), a[z] && b[z] && Pr(c[z], function(c, g) {
if (c) {
var i = a[z][g].m, k = b[z][g].m, m = c.m;
m && m[Sc] && (m[Sc].x = hA(i[Sc].x, k[Sc].x, e), m[Sc].y = hA(i[Sc].y, k[Sc].y, e)), 
c.m && (c.v = d(c.m[Sc].x, c.m[Sc].y));
}
});
}
function fA(a, b, c) {
if (!a || !b) return l;
var d = xs(a);
return jr(a.h) && jr(b.h) && (d.h = hA(a.h, b.h, c)), jr(a.Pd) && jr(b.Pd) && (d.Pd = hA(a.Pd, b.Pd, c)), 
jr(a.Qd) && jr(b.Qd) && (d.Qd = hA(a.Qd, b.Qd, c)), d;
}
function pA(a) {
this.OB = a;
}
function qA(a) {
this.lA = a, this.Of = r, this.Sg = 0, a = new Ou(50), this.Vm(a), eu(a, Kp, Z(this.On, this)), 
a[Q]();
}
function rA(a, b, c, d, e) {
this.p = a, this.C = b, this.oe = c, this.md = d, this.Fa = new qA(e), this.Vm(this.Fa), 
this.Tx();
}
function sA(a, b) {
Vx[P](this, a, b), this.xj = this.nl = l;
}
function tA(a, b, c) {
ly[P](this, a, b, c, rn);
}
function uA(a, b, c, d, e, f) {
Oy[P](this, a, b, c, d, e);
var g = a.$(Tj, j);
this.fA = vw(f, function(b) {
return a.$(Xo + b + Ke, g);
});
}
function vA(a, b) {
this.i = this.p = l, this.na = a, this.Ld = this.Xc = this.Bg = this.C = this.nj = this.qg = l, 
this.oe = new Nu(), this.wc = l, this.md = new pA(b);
}
function wA(a, b, c) {
this.bA = a, this.na = b, a = Et(b, Fn), (a == U || a == hp) && Bt(b, Fn, Rn), this.zi = l, 
c && (this.zi = jt(Lj, {
style:Gn
}));
}
function xA(a) {
this.oB = a, this.zt = n;
}
function yA(a) {
pr(a) && 0 < a[kb] || h(u("Container is not defined")), this.Zc = a, this.Xs = new wA(this, this.Zc), 
this.Ge = l;
}
function zA(a) {
return a = a[ib](/"(Date\([\d,\s]*\))"/g, function(a, c) {
return Qm + c;
}), eval(ue + a + we);
}
function AA(a, b) {
var a = b(a), c = ir(a);
if (c == Wm || c == zh) {
var d, c = c == zh ? [] :{};
for (d in a) {
var e = AA(a[d], b);
jr(e) && (c[d] = e);
}
} else c = a;
return c;
}
function BA(a) {
return or(a) && (a = 0 !== a.getMilliseconds() ? [ a[Yc](), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds() ] :0 !== a.getSeconds() || 0 !== a.getMinutes() || 0 !== a.getHours() ? [ a[Yc](), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds() ] :[ a[Yc](), a.getMonth(), a.getDate() ], 
a = $f + a[pd](ye) + we), a;
}
function CA(a) {
yA[P](this, a), DA++, this.Js = this.Fg = X, this.Hb = il, this.os = l, this.Cn = n, 
this.oa = l;
}
function GA(a) {
if (a != l) {
FA(a, Ep, Gp, Ip), FA(a, Qp, Rp, Tp), a.gridlines = a.gridlines || {};
var b = a.gridlines, c = a.numberOfSections;
!jr(b.count) && jr(c) && typeof c == Um && (b.count = c + 1), a = a.gridlineColor, 
!jr(b[zb]) && jr(a) && xa(b, a);
}
}
function FA(a, b, c, d) {
a[d] = a[d] || {}, d = a[d], EA(a, b, d, aj), EA(a, c, d, lk);
}
function EA(a, b, c, d) {
jr(a[b]) && !jr(c[d]) && (c[d] = a[b]);
}
function HA(a) {
CA[P](this, a), this[tc](W, wh, il);
}
function IA(a) {
CA[P](this, a), this[tc](W, jp, il);
}
function JA(a) {
CA[P](this, a), this[tc](W, X, il, cp);
}
function KA(a) {
CA[P](this, a), this[tc](W, hm, il);
}
function LA(a) {
CA[P](this, a), this[tc](no);
}
function MA(a) {
CA[P](this, a), this[tc](ji);
}
function NA(a) {
CA[P](this, a), this[tc](W, Jh, Mq);
}
function OA(a) {
CA[P](this, a), this[tc](W, ui, il);
}
function PA(a) {
CA[P](this, a), this[tc](W, Jh, il);
}
function QA(a) {
CA[P](this, a), this[tc](W, X, il);
}
function RA(a) {
CA[P](this, a), this[tc](rn);
}
function SA(a) {
this.Ra = {}, this.oa = l, this.dc = {
we:n
}, this.Qh = this.Rh = this.Ib = this.Za = this.p = this.Vb = this.Oc = l, this.na = a, 
this.Mh = 50, this.lq = 0, this.Fj = 1, this.bm = this.cm = this.vj = n, this.Gj = this.Hj = this.rl = this.sl = l, 
this.Ya = n, this.Sd = l, this.Da = {
ya:l,
Ej:l,
ib:l
}, this.Tb = {
jc:{
min:0,
max:0
},
value:{
min:0,
max:0
}
}, this.qm = l, this.Al = n, this.ze = l;
}
var aa = void 0, j = !0, l = null, n = !1, ba = google_exportSymbol, ca = window, da = Object, r = 1/0, ea = document, ga = isNaN, ha = google_exportProperty, s = Math, ia = Array, ja = Number, u = Error, la = parseInt, ma = parseFloat, na = String, oa = isFinite, v = "appendChild", x = "push", bb = "direction", cb = "trigger", db = "getBoundingClientRect", eb = "test", gb = "relatedTarget", y = "width", z = "text", B = "round", hb = "slice", ib = "replace", jb = "reverse", kb = "nodeType", C = "data", lb = "ceil", mb = "events", D = "floor", nb = "content", ob = "getElementById", pb = "concat", qb = "charAt", rb = "selected", sb = "createTextNode", tb = "getNumberOfColumns", ub = "value", vb = "preventDefault", wb = "targetTouches", xb = "move", yb = "indexOf", zb = "color", Ab = "dispatchEvent", Bb = "capture", F = "left", Cb = "domain", Db = "screenX", Eb = "screenY", Fb = "format", Gb = "getBoxObjectFor", Ib = "createElement", Jb = "getColumnLabel", Kb = "atan2", Lb = "keyCode", Mb = "getColumnType", Nb = "firstChild", Ob = "clientLeft", Pb = "sqrt", H = "setAttribute", Qb = "clientTop", Rb = "handleEvent", Sb = "path", Tb = "setSelection", I = "type", Ub = "parentWindow", Vb = "clear", Wb = "orientation", Xb = "defaultView", Yb = "source", Zb = "offset", $b = "name", J = "getValue", ac = "NumberFormat", bc = "contentWindow", cc = "getBoundingBox", dc = "getTime", ec = "getElementsByTagName", fc = "clientX", gc = "clientY", hc = "documentElement", ic = "substr", jc = "scrollTop", kc = "toString", lc = "bold", mc = "getNumberOfRows", L = "length", nc = "propertyIsEnumerable", oc = "title", pc = "position", M = "prototype", qc = "cursor", rc = "labels", sc = "index", tc = "setChartType", uc = "clientWidth", vc = "getSelection", wc = "setTimeout", xc = "document", yc = "next", zc = "split", Ac = "formatValue", Bc = "constructor", Cc = "stopPropagation", Ec = "scope", Fc = "rect", Gc = "clearChart", N = "fontSize", Hc = "visualization", Ic = "rotate", Jc = "hasOwnProperty", O = "style", Kc = "close", Lc = "body", Mc = "background", Nc = "removeChild", Oc = "clone", Pc = "target", Qc = "dataType", Rc = "getUTCMonth", P = "call", Sc = "anchor", Tc = "removeAll", Q = "start", Uc = "lastIndexOf", Vc = "draw", Wc = "DateFormat", Xc = "multiple", Yc = "getFullYear", Zc = "clientHeight", $c = "scrollLeft", R = "bottom", ad = "currentStyle", bd = "documentMode", cd = "setTime", dd = "scale", ed = "every", fd = "contains", gd = "apply", hd = "tagName", id = "getContainer", jd = "contentDocument", kd = "getFormattedValue", ld = "parentNode", md = "areas", S = "height", nd = "compact", od = "splice", pd = "join", qd = "lineWidth", rd = "transform", sd = "toLowerCase", T = "right", U = "", td = "\n", ud = "", vd = " ", wd = " (", xd = " - ", yd = " / ", zd = " [", Ad = " [+]", Bd = " _loaded = true;", Cd = ' name="', Dd = ' onload="CHART_loaded()"', Ed = ' type="', Fd = ' xmlns:svg="http://www.w3.org/2000/svg"', Gd = ' xmlns:xlink="http://www.w3.org/1999/xlink">', Hd = '"', Id = "#", Jd = "#$1$1$2$2$3$3", Kd = "#000000", Ld = "#000020", Md = "#222222", Nd = "#666666", Od = "#7993ad", Pd = "#7f9a6b", Qd = "#8080ff", Rd = "#9bbdde", Sd = "#CCCCCC", Td = "#DDD", Ud = "#a2c488", Vd = "#a992ad", Wd = "#ad7d79", Xd = "#aea971", Yd = "#c991ff", Zd = "#ccc", $d = "#cdc785", ae = "#ce9839", be = "#d2feb0", ce = "#d6b9db", de = "#dea19b", ee = "#e0e0e0", fe = "#eee", ge = "#eeee5b", he = "#eeeeac", ie = "#ffbc46", je = "#ffd1c9", ke = "#fff", me = "#fff0db", ne = "#ffffff", oe = "%", pe = "&", qe = "&amp;", re = "&gt;", se = "&lt;", te = "&quot;", ue = "(", ve = "(\\d*)(\\D*)", we = ")", xe = ",", ye = ", ", ze = ",0,", Ae = "-", Be = "-10000px", Ce = "-moz-transform", De = "-ms-transform", Ee = "-o-transform", Fe = "-webkit-transform", Ge = ".", He = "...", Ie = ".annotations.", Je = ".color", Ke = ".enableInteractivity", Le = ".gif", Me = ".hole", Ne = ".id", Oe = ".offset", Pe = ".style", Qe = ".text", Re = ".textStyle", Se = ".type", Te = ".visibleInLegend", Ue = "/", Ve = "/core/patterns/", We = "/core/tooltip.css", Xe = "/static/modules/gviz/", Ye = "0", Ze = "0 0", $e = "0 0 4 4", af = "0%", bf = "00", cf = "000", df = "1", ef = "1.0", ff = "1.8", gf = "1.9", hf = "100%", jf = "1px", kf = "1px solid infotext", lf = "2", mf = "4", nf = "420+", of = "5.5", pf = "636363", qf = "6c6c6c", rf = "8", sf = "9", tf = "9.0", uf = "9e9e9e", vf = ":", wf = ";", xf = ";color: #333333;margin:0;font-style:", yf = ";font-weight:", zf = ";text-decoration:", Af = "<", Bf = "</body>", Cf = "</head>", Df = "</html>", Ef = "</script>", Ff = '<?xml version="1.0"?>', Gf = '<body marginwidth="0" marginheight="0"', Hf = '<div id="renderers"></div>', If = "<head>", Jf = '<html xmlns:v="urn:scheman-microsoft-com:vml">', Kf = '<html xmlns="http://www.w3.org/1999/xhtml"', Lf = '<script type="text/javascript">', Mf = "<style> v\\:* { behavior:url(#default#VML);}</style>", Nf = ">", Of = "@", Pf = "A", Qf = "AT", Rf = "AreaChart", Sf = "B", Tf = "BODY", Uf = "C", Vf = "CSS1Compat", Wf = "Click", Xf = "Click to expand annotations", Yf = "ComboChart", Zf = "DAY", $f = "Date(", ag = "Drawing_Frame_", bg = "E", cg = "HH:mm", dg = "HH:mm:ss", eg = "HOUR", fg = "HTML", gg = "HoverIn", hg = "HoverOut", ig = "IFRAME", jg = "Invalid listener argument", kg = "L", lg = "LINK", mg = "LineChart", ng = "M", og = "MILLISECOND", pg = "MINUTE", qg = "MMM d, y", rg = "MONTH", sg = "No data", tg = "Other", ug = "Q", vg = "Q yyyy", wg = "QUARTER", xg = "RightClick", yg = "SECOND", zg = "ScatterChart", Ag = "Style", Bg = "T", Cg = "TR", Dg = "WA", Eg = "WEEK", Fg = "Width", Gg = "X", Hg = "YEAR", Ig = "Z", Jg = "[", Kg = "[object Array]", Lg = "[object Function]", Mg = "[object Window]", Ng = "\\u", Og = "]", Pg = "_", Qg = "_ABSTRACT_RENDERER_ID_", Rg = "_default_", Sg = "absolute", Tg = "action", Ug = "actionsMenu.entries.", Vg = "actionsMenu.entries.length", Wg = "actionsMenu.textStyle", Xg = "actionsMenuEntry", Yg = "actionsMenuEntryHoverIn", Zg = "actionsMenuEntryHoverOut", $g = "allowContainerBoundaryTextCufoff", ah = "angle", bh = "animation.duration", ch = "animation.easing", dh = "animationEasing", eh = "animationfinish", fh = "animationframefinish", gh = "annotation", hh = "annotation.", ih = "annotationClick", jh = "annotationHoverIn", kh = "annotationHoverOut", lh = "annotations.datum.stemColor", mh = "annotations.datum.style", nh = "annotations.datum.textStyle", oh = "annotations.domain.stemColor", ph = "annotations.domain.style", qh = "annotations.domain.textStyle", rh = "annotations.stemColor", sh = "annotations.style", th = "annotations.textStyle", uh = "annotationtext", vh = "arc", wh = "area", xh = "areaOpacity", yh = "aria-", zh = "array", Ah = "attachToEnd", Bh = "attachToStart", Ch = "axisBackgroundColor", Dh = "axisTitlesPosition", Eh = "background-color:", Fh = "backgroundColor", Gh = "bar", Hh = "bar.groupWidth", Ih = "barWidth", Jh = "bars", Kh = "baseline", Lh = "baselineColor", Mh = "beforehide", Nh = "beforeshow", Oh = "black", Ph = "block", Qh = "blur", Rh = "body", Sh = "bold", Th = "boolean", Uh = "border-box", Vh = "borderBottom", Wh = "borderBottomWidth", Xh = "borderLeft", Yh = "borderLeftWidth", Zh = "borderRight", $h = "borderRightWidth", ai = "borderTop", bi = "borderTopWidth", ci = "both", di = "bottom", ei = "bottom-space", fi = "bound", gi = "boxWidth", hi = "boxes", ii = "br", ji = "bubble", ki = "bubble.opacity", li = "bubble.stroke", mi = "bubble.textStyle", ni = "bubbles", oi = "call", pi = "callee", qi = "candlestick", ri = "candlestick.fallingColor", si = "candlestick.hollowIsRising", ti = "candlestick.risingColor", ui = "candlesticks", vi = "category", wi = "categoryClick", xi = "categoryHoverIn", yi = "categoryHoverOut", zi = "categorypoint", Ai = "categorysensitivityarea", Bi = "cell", Ci = "center", Di = "centerSelectionAroundData", Ei = "chart", Fi = "chartArea.backgroundColor", Gi = "chartArea.height", Hi = "chartArea.left", Ii = "chartArea.top", Ji = "chartArea.width", Ki = "chartClick", Li = "chartHoverIn", Mi = "chartHoverOut", Ni = "chartMouseMove", Oi = "chartOptions", Pi = "chartRightClick", Qi = "chartType", Ri = "chartarea", Si = "circle", Ti = "class", Ui = "click", Vi = "clip-path", Wi = "clipPath", Xi = "clipped", Yi = "close", Zi = "closedPhase", $i = "col-resize", aj = "color", bj = "color2", cj = "colorAxis.colors", dj = "colorAxis.legend.numberFormat", ej = "colorAxis.legend.position", fj = "colorAxis.legend.textStyle", gj = "colorAxis.maxValue", hj = "colorAxis.minValue", ij = "colorAxis.values", jj = "colorAxis.values must not contain nulls", kj = "colorBar", lj = "colorbar", mj = "colors", nj = "column", oj = "columns", pj = "connectSteps", qj = "contextmenu", rj = "curve", sj = "curveType", tj = "cx", uj = "cy", vj = "d", wj = "dash", xj = "data", yj = "data-", zj = "date", Aj = "datetime", Bj = "datum", Cj = "datumClick", Dj = "datumHoverIn", Ej = "datumHoverOut", Fj = "deactivate", Gj = "default", Hj = "defs", Ij = "direction", Jj = "display", Kj = "displayTinySlicesInLenged", Lj = "div", Mj = "dive", Nj = "domain", Oj = "domainAxis", Pj = "draw", Qj = "e", Rj = "easing", Sj = "ellipse", Tj = "enableInteractivity", Uj = "end", Vj = "error", Wj = "explicit", Xj = "false", Yj = "fill", Zj = "fill-opacity", $j = "fillOpacity", ak = "firstVisibleText", bk = "fixed", ck = "fixedRangeSize", dk = "focus", ek = "focusTarget", fk = "font-family", gk = "font-family:", hk = "font-size", ik = "font-style", jk = "font-weight", kk = "fontName", lk = "fontSize", mk = "for", nk = "forceIFrame", ok = "format", pk = "formatOptions", qk = "formatOptions.scaleFactor", rk = "formatter.numDecimals", sk = "formatter.numSignificantDigits", tk = "formatter.unit", uk = "formatter.useMagnitudes", W = "function", vk = "function CHART_loaded() {", wk = "g", xk = "get", yk = "getSelection", zk = "google-visualization-tooltip", Ak = "google-visualization-tooltip-action", Bk = "google-visualization-tooltip-action-list", Ck = "google-visualization-tooltip-item", Dk = "google-visualization-tooltip-item-list", Ek = "google-visualization-tooltip-separator", Fk = "google-visualization-tooltip-square", Gk = "google.loader.GoogleApisBase", Hk = "google.visualization.Version", Ik = "gradient", Jk = "gradientUnits", Kk = "gridline", Lk = "gridlineColor", Mk = "gridlines.allowMinor", Nk = "gridlines.color", Ok = "gridlines.count", Pk = "gridlines.minMajorTextDistance", Qk = "gridlines.minMinorTextDistance", Rk = "gridlines.minNotchDistance", Sk = "gridlines.minStrongLineDistance", Tk = "gridlines.minStrongToWeakLineDistance", Uk = "gridlines.minWeakLineDistance", Vk = "gridlines.minorGridlineOpacity", Wk = "gridlines.minorTextOpacity", Xk = "gridlines.newTimeline", Yk = "gridlines.unitThreshold", Zk = "h:mm:ss a", $k = "hAxes.", al = "hAxis", bl = "hAxis#", cl = "head", dl = "height", el = "hex", fl = "hidden", gl = "hide", hl = "high", il = "horizontal", jl = "hover", kl = "html", ll = "http://ajax.googleapis.com/ajax", ml = "http://www.w3.org/2000/svg", nl = "id", ol = "iframe", pl = "image/svg+xml", ql = "in", rl = "inAndOut", sl = "inTextPosition", tl = "infobackground", ul = "inline", vl = "inside", wl = "interactivityModel", xl = "interpolateNulls", yl = "interval", zl = "interval.", Al = "intervals.", Bl = "is3D", Cl = "isStacked", Dl = "italic", El = "keydown", Fl = "keypress", Gl = "label", Hl = "labelInLegend", Il = "labeled", Jl = "left", Kl = "legend", Ll = "legend.alignment", Ml = "legend.labeledValueText", Nl = "legend.maxLines", Ol = "legend.pagingTextStyle", Pl = "legend.position", Ql = "legend.scrollArrows.activeColor", Rl = "legend.scrollArrows.inactiveColor", Sl = "legend.scrollArrows.orientation", Tl = "legend.showPageIndex", Ul = "legend.textStyle", Vl = "legendEntry", Wl = "legendEntryClick", Xl = "legendEntryHoverIn", Yl = "legendEntryHoverOut", Zl = "legendFontSize", $l = "legendScrollButton", am = "legendScrollButtonClick", bm = "legendTextColor", cm = "legendTextStyle", dm = "legendentry", em = "legendscrollbutton", fm = "letter", gm = "li", hm = "line", im = "lineSize", jm = "lineWidth", km = "linear", lm = "linearGradient", mm = "link", nm = "log", om = "logScale", pm = "logScaleX", qm = "low", rm = "ltr", sm = "majorAxisTextColor", tm = "max", um = "maxAlternation", vm = "maxTextLines", wm = "maxValue", xm = "maximized", ym = "middle", zm = "min", Am = "minRangeSize", Bm = "minTextSpacing", Cm = "minValue", Dm = "minorAxisTextColor", Em = "minorGridlines.color", Fm = "minorGridlines.count", Gm = "mirrorLog", Hm = "mousedown", Im = "mousemove", Jm = "mouseout", Km = "mouseover", Lm = "mouseup", Mm = "move", Nm = "move_offscreen", Om = "named", Pm = "native code", Qm = "new ", Rm = "no", X = "none", Sm = "nowrap", Tm = "null", Um = "number", Vm = "o", Wm = "object", Xm = "offset", Ym = "on", Zm = "onmousemove", $m = "onmouseout", an = "onmouseover", bn = "orientation", cn = "out", dn = "outTextPosition", en = "outside", fn = "overflow", gn = "paddingBottom", hn = "paddingLeft", jn = "paddingRight", kn = "paddingTop", ln = "path", mn = "pathinterval", nn = "pattern", on = "patternUnits", pn = "percentage", qn = "phase", rn = "pie", sn = "pieHole", tn = "pieResidueSliceColor", un = "pieResidueSliceLabel", vn = "pieSliceBorderColor", wn = "pieSliceText", xn = "pieSliceTextStyle", yn = "pieStartAngle", zn = "piecewiseLinear", An = "pixelLeft", Bn = "point", Cn = "pointSize", Dn = "points", En = "pointsensitivityarea", Fn = "position", Gn = "position: absolute; top: 0; left: 0; z-index: 1;", Hn = "position:absolute;display:none;", In = "pretty", Jn = "primarydiagonalstripes", Kn = "px", Ln = "r", Mn = "rangeChangeEventFiringRate", Nn = "rangechange", On = "ready", Pn = "rect", Qn = "rect(", Rn = "relative", Sn = "removeSerieButton", Tn = "removeSerieButtonClick", Un = "removeSerieButtonHoverIn", Vn = "removeSerieButtonHoverOut", Wn = "removeserie", Xn = "removeseriebutton", Yn = "renderers", Zn = "reverseAxis", $n = "reverseCategories", ao = "rgb", bo = "right", co = "right-space", eo = "rightclick", fo = "role", go = "rotate(", ho = "row", io = "row-resize", jo = "rtl", ko = "rx", lo = "ry", mo = "scaleType", no = "scatter", oo = "screen", po = "select", qo = "selection", ro = "selectionMode", so = "separator", to = "serie", uo = "serieClick", vo = "serieHoverIn", wo = "serieHoverOut", xo = "series", yo = "series-color", zo = "series-color-dark", Ao = "series-color-light", Bo = "series.", Co = "seriesType", Do = "set", Eo = "setSelection", Fo = "shortBarWidth", Go = "shortdash", Ho = "show", Io = "showRemoveSeriesButton", Jo = "showTextEvery", Ko = "showTextEveryMode", Lo = "sideScreenColor", Mo = "single", No = "sizeAxis.logScale", Oo = "sizeAxis.maxSize", Po = "sizeAxis.maxValue", Qo = "sizeAxis.minSize", Ro = "sizeAxis.minValue", So = "sizeAxis.scaleType", To = "slantedText", Uo = "slantedTextAngle", Vo = "slice", Wo = "sliceVisibilityThreshold", Xo = "slices.", Yo = "smoothingFactor", Zo = "snapToData", $o = "solid", ap = "sortBubblesBySize", bp = "span", cp = "sparkline", dp = "splice", ep = "square", fp = "src", gp = "start", hp = "static", ip = "stemColor", jp = "steppedArea", kp = "steppedareabar", lp = "sticks", mp = "stop", np = "stop-color:", op = "string", pp = "stroke", qp = "stroke-dasharray", rp = "stroke-linecap", sp = "stroke-opacity", tp = "stroke-width", up = "style", vp = "stylesheet", wp = "svg", xp = "targetAxes.", yp = "targetAxis", zp = "targetAxisIndex", Ap = "text", Bp = "text-anchor", Cp = "text-decoration", Dp = "text/css", Ep = "textColor", Fp = "textContent", Gp = "textFontSize", Hp = "textPosition", Ip = "textStyle", Jp = "textpathok", Kp = "tick", Lp = "tickScoringWeights", Mp = "ticks", Np = "timeGranularity", Op = "timeofday", Pp = "title", Qp = "titleColor", Rp = "titleFontSize", Sp = "titlePosition", Tp = "titleTextStyle", Up = "titleX", Vp = "titleY", Wp = "toggle_display", Xp = "tooltip", Yp = "tooltip.isHtml", Zp = "tooltip.showColorCode", $p = "tooltip.text", aq = "tooltip.textStyle", bq = "tooltip.trigger", cq = "tooltipFontSize", dq = "tooltipHoverIn", eq = "tooltipHoverOut", fq = "tooltipText", gq = "tooltipTextColor", hq = "tooltipTextStyle", iq = "tooltipTrigger", jq = "top", kq = "top-space", lq = "transform", mq = "translate(", nq = "transparent", oq = "trigger", pq = "true", qq = "type", rq = "ul", sq = "unbound", tq = "underline", uq = "url(#", vq = "userSpaceOnUse", wq = "v", xq = "v-text-align", yq = "v:fill", zq = "v:group", Aq = "v:oval", Bq = "v:path", Cq = "v:rect", Dq = "v:shape", Eq = "v:stroke", Fq = "v:textpath", Gq = "vAxes.", Hq = "vAxis", Iq = "vAxis#", Jq = "value", Kq = "valueFormatter", Lq = "var _loaded = false;", Mq = "vertical", Nq = "viewBox", Oq = "viewWindow.max", Pq = "viewWindow.min", Qq = "viewWindowMode", Rq = "visible", Sq = "visibleInLegend", Tq = "white", Uq = "width", Vq = "window.event", Wq = "x", Xq = "x1", Yq = "x2", Zq = "y", $q = "y1", ar = "y2", br = "zOrder", cr = "zoomAroundSelection", dr = "{", er = "}", Y, fr = this, ur = "closure_uid_" + s[D](2147483648 * s.random())[kc](36), vr = 0, zr = Date.now || function() {
return +new Date();
};
Br[M].Rj = n, Br[M].pi = function() {
this.Rj || (this.Rj = j, this.lb());
}, Br[M].Vm = function(a) {
this.Jk || (this.Jk = []), this.Jk[x](a);
}, Br[M].lb = function() {
if (this.Jk && Cr[gd](l, this.Jk), this.At) for (;this.At[L]; ) this.At.shift()();
};
var Fr = /&/g, Gr = /</g, Hr = />/g, Ir = /\"/g, Jr = /[&<>\"]/, Nr = ia[M], Or = Nr[yb] ? function(a, b, c) {
return Nr[yb][P](a, b, c);
} :function(a, b, c) {
if (c = c == l ? 0 :0 > c ? s.max(0, a[L] + c) :c, qr(a)) return qr(b) && 1 == b[L] ? a[yb](b, c) :-1;
for (;c < a[L]; c++) if (c in a && a[c] === b) return c;
return -1;
}, Pr = Nr.forEach ? function(a, b, c) {
Nr.forEach[P](a, b, c);
} :function(a, b, c) {
for (var d = a[L], e = qr(a) ? a[zc](U) :a, f = 0; d > f; f++) f in e && b[P](c, e[f], f, a);
}, Qr = Nr.filter ? function(a, b, c) {
return Nr.filter[P](a, b, c);
} :function(a, b, c) {
for (var d = a[L], e = [], f = 0, g = qr(a) ? a[zc](U) :a, i = 0; d > i; i++) if (i in g) {
var k = g[i];
b[P](c, k, i, a) && (e[f++] = k);
}
return e;
}, Rr = Nr.map ? function(a, b, c) {
return Nr.map[P](a, b, c);
} :function(a, b, c) {
for (var d = a[L], e = ia(d), f = qr(a) ? a[zc](U) :a, g = 0; d > g; g++) g in f && (e[g] = b[P](c, f[g], g, a));
return e;
}, Tr = Nr.some ? function(a, b, c) {
return Nr.some[P](a, b, c);
} :function(a, b, c) {
for (var d = a[L], e = qr(a) ? a[zc](U) :a, f = 0; d > f; f++) if (f in e && b[P](c, e[f], f, a)) return j;
return n;
}, Ur = Nr[ed] ? function(a, b, c) {
return Nr[ed][P](a, b, c);
} :function(a, b, c) {
for (var d = a[L], e = qr(a) ? a[zc](U) :a, f = 0; d > f; f++) if (f in e && !b[P](c, e[f], f, a)) return n;
return j;
};
Sa($[M], function() {
return new $(this.x, this.y);
}), Y = qs[M], Sa(Y, function() {
return new qs(this[y], this[S]);
}), Y.Vk = function() {
return this[y] * this[S];
}, ua(Y, function() {
return pa(this, s[lb](this[y])), $a(this, s[lb](this[S])), this;
}), va(Y, function() {
return pa(this, s[D](this[y])), $a(this, s[D](this[S])), this;
}), ra(Y, function() {
return pa(this, s[B](this[y])), $a(this, s[B](this[S])), this;
}), Y.scale = function(a) {
return pa(this, this[y] * a), $a(this, this[S] * a), this;
};
var zs = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), Bs, Cs, Ds, Es, Fs;
Es = Ds = Cs = Bs = n;
var Is;
if (Is = Gs()) {
var Js = Hs();
Bs = 0 == Is[yb]("Opera"), Cs = !Bs && -1 != Is[yb]("MSIE"), Ds = !Bs && -1 != Is[yb]("WebKit"), 
Es = !Bs && !Ds && "Gecko" == Js.product;
}
var Ks = Bs, Ls = Cs, Ms = Es, Ns = Ds, Os = Hs();
Fs = -1 != (Os && Os.platform || U)[yb]("Mac");
var Ps = !!Hs() && -1 != (Hs().appVersion || U)[yb]("X11"), Qs;
a:{
var Rs = U, Ss;
if (Ks && fr.opera) var Ts = fr.opera.version, Rs = typeof Ts == W ? Ts() :Ts; else if (Ms ? Ss = /rv\:([^\);]+)(\)|;)/ :Ls ? Ss = /MSIE\s+([^\);]+)(\)|;)/ :Ns && (Ss = /WebKit\/(\S+)/), 
Ss) var Us = Ss.exec(Gs()), Rs = Us ? Us[1] :U;
if (Ls) {
var Vs, Ws = fr[xc];
if (Vs = Ws ? Ws[bd] :aa, Vs > ma(Rs)) {
Qs = na(Vs);
break a;
}
}
Qs = Rs;
}
var Xs = Qs, Ys = {}, $s = {}, bt, ct = !Ls || at(9);
!Ms && !Ls || Ls && at(9) || Ms && Zs("1.9.1"), Ls && Zs(sf);
var it = {
cellpadding:"cellPadding",
cellspacing:"cellSpacing",
colspan:"colSpan",
frameborder:"frameBorder",
height:dl,
maxlength:"maxLength",
role:fo,
rowspan:"rowSpan",
type:qq,
usemap:"useMap",
valign:"vAlign",
width:Uq
};
Y = ft[M], Y.t = function(a) {
return qr(a) ? this.mb[ob](a) :a;
}, Y.setProperties = ht, Y.vA = function(a) {
return a = (a || this.at() || ca)[xc], a = lt(a) ? a[hc] :a[Lc], new qs(a[uc], a[Zc]);
}, Y.kk = function() {
return kt(this.mb, arguments);
}, Y.createElement = function(a) {
return this.mb[Ib](a);
}, Y.createTextNode = function(a) {
return this.mb[sb](a);
}, Y.Sn = function() {
return lt(this.mb);
}, Y.at = function() {
return this.mb[Ub] || this.mb[Xb];
}, Y.uA = function() {
return !Ns && lt(this.mb) ? this.mb[hc] :this.mb[Lc];
}, Y.tk = function() {
var a = this.mb, b = !Ns && lt(a) ? a[hc] :a[Lc], a = a[Ub] || a[Xb];
return new $(a.pageXOffset || b[$c], a.pageYOffset || b[jc]);
}, Y.appendChild = function(a, b) {
a[v](b);
}, Y.Dg = mt, Y.removeNode = nt, Ya(Y, ot), qt[vd] = hr;
var rt = !Ls || at(9), st = !Ls || at(9), tt = Ls && !Zs(sf);
!Ns || Zs("528"), Ms && Zs("1.9b") || Ls && Zs(rf) || Ks && Zs("9.5") || Ns && Zs("528"), 
Ms && !Zs(rf) || Ls && Zs(sf), Y = ut[M], Y.lb = function() {}, Y.pi = function() {}, 
Y.Jf = n, Y.defaultPrevented = n, Y.Bk = j, Y.stopPropagation = function() {
this.Jf = j;
}, Y.preventDefault = function() {
this.defaultPrevented = j, this.Bk = n;
}, Ar(vt, ut);
var wt = [ 1, 4, 2 ];
Y = vt[M], Ta(Y, l), Y.relatedTarget = l, Y.offsetX = 0, Y.offsetY = 0, Y.clientX = 0, 
Y.clientY = 0, Y.screenX = 0, Y.screenY = 0, Y.button = 0, Ca(Y, 0), Y.charCode = 0, 
Y.ctrlKey = n, Y.altKey = n, Y.shiftKey = n, Y.metaKey = n, Y.td = l, Y.Kc = function(a, b) {
var c = Da(this, a[I]);
ut[P](this, c), Ta(this, a[Pc] || a.srcElement), ya(this, b);
var d = a[gb];
if (d) {
if (Ms) {
var e;
a:{
try {
qt(d.nodeName), e = j;
break a;
} catch (f) {}
e = n;
}
e || (d = l);
}
} else c == Km ? d = a.fromElement :c == Jm && (d = a.toElement);
this.relatedTarget = d, this.offsetX = Ns || a.offsetX !== aa ? a.offsetX :a.layerX, 
this.offsetY = Ns || a.offsetY !== aa ? a.offsetY :a.layerY, this.clientX = a[fc] !== aa ? a[fc] :a.pageX, 
this.clientY = a[gc] !== aa ? a[gc] :a.pageY, this.screenX = a[Db] || 0, this.screenY = a[Eb] || 0, 
this.button = a.button, Ca(this, a[Lb] || 0), this.charCode = a.charCode || (c == Fl ? a[Lb] :0), 
this.ctrlKey = a.ctrlKey, this.altKey = a.altKey, this.shiftKey = a.shiftKey, this.metaKey = a.metaKey, 
this.state = a.state, this.td = a, a.defaultPrevented && this[vb](), delete this.Jf;
}, Y.TB = function(a) {
return rt ? this.td.button == a :this[I] == Ui ? 0 == a :!!(this.td.button & wt[a]);
}, Y.mz = function() {
return this.TB(0) && !(Ns && Fs && this.ctrlKey);
}, Y.stopPropagation = function() {
vt.lc[Cc][P](this), this.td[Cc] ? this.td[Cc]() :this.td.cancelBubble = j;
}, Y.preventDefault = function() {
vt.lc[vb][P](this);
var a = this.td;
if (a[vb]) a[vb](); else if (a.returnValue = n, tt) try {
(a.ctrlKey || 112 <= a[Lb] && 123 >= a[Lb]) && Ca(a, -1);
} catch (b) {}
}, Y.KA = function() {
return this.td;
}, Y.lb = function() {}, Sa(xt[M], function() {
return new xt(this.top, this[T], this[R], this[F]);
}), Ya(xt[M], function(a) {
return this && a ? a instanceof xt ? a[F] >= this[F] && a[T] <= this[T] && a.top >= this.top && a[R] <= this[R] :a.x >= this[F] && a.x <= this[T] && a.y >= this.top && a.y <= this[R] :n;
}), xt[M].PB = function(a) {
Aa(this, s.min(this[F], a[F])), this.top = s.min(this.top, a.top), ab(this, s.max(this[T], a[T])), 
Xa(this, s.max(this[R], a[R]));
}, Sa(zt[M], function() {
return new zt(this[F], this.top, this[y], this[S]);
}), zt[M].fy = function() {
return new xt(this.top, this[F] + this[y], this.top + this[S], this[F]);
}, zt[M].bt = function(a) {
var b = s.max(this[F], a[F]), c = s.min(this[F] + this[y], a[F] + a[y]);
if (c >= b) {
var d = s.max(this.top, a.top), a = s.min(this.top + this[S], a.top + a[S]);
if (a >= d) return Aa(this, b), this.top = d, pa(this, c - b), $a(this, a - d), 
j;
}
return n;
}, Ya(zt[M], function(a) {
return a instanceof zt ? this[F] <= a[F] && this[F] + this[y] >= a[F] + a[y] && this.top <= a.top && this.top + this[S] >= a.top + a[S] :a.x >= this[F] && a.x <= this[F] + this[y] && a.y >= this.top && a.y <= this.top + this[S];
});
var Wt = {
thin:2,
medium:4,
thick:6
}, Pt = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/, $t = 0;
Y = Zt[M], Y.key = 0, Y.Qg = n, Y.Wn = n, Y.Kc = function(a, b, c, d, e, f) {
sr(a) ? this.ft = j :a && a[Rb] && sr(a[Rb]) ? this.ft = n :h(u(jg)), this.ri = a, 
this.Is = b, this.src = c, Da(this, d), this.capture = !!e, this.En = f, this.Wn = n, 
this.key = ++$t, this.Qg = n;
}, Y.handleEvent = function(a) {
return this.ft ? this.ri[P](this.En || this.src, a) :this.ri[Rb][P](this.ri, a);
};
var au = {}, bu = {}, cu = {}, du = {};
Ar(nu, Br);
var ou = [];
nu[M].Df = function(a, b, c, d, e) {
mr(b) || (ou[0] = b, b = ou);
for (var f = 0; f < b[L]; f++) {
var g = eu(a, b[f], c || this, d || n, e || this.$c || this);
this.za[x](g);
}
return this;
}, nu[M].removeAll = function() {
Pr(this.za, iu), Ka(this.za, 0);
}, nu[M].lb = function() {
nu.lc.lb[P](this), this[Tc]();
}, nu[M].handleEvent = function() {
h(u("EventHandler.handleEvent not implemented"));
}, Y = pu[M], Y.getContainer = function() {
return this.na;
}, Ea(Y, function() {
this.wi(), this.wc = new nu();
}), Y.wi = function() {
mt(this.na), Dr(this.wc);
}, Y.lb = function() {
pu.lc.lb[P](this), this.wi();
}, Y.vn = function(a, b, c) {
this.wc.Df(a, b, c);
}, Y = qu[M], Sa(Y, function() {
return new qu(this.ef, this.ff, this.Qa, this.Xa);
}), Y.Yd = function(a) {
return this.ef == a.ef && this.ff == a.ff && this.Qa == a.Qa && this.Xa == a.Xa;
}, Y.QB = function() {
var a = this.Qa - this.ef, b = this.Xa - this.ff;
return a * a + b * b;
}, Y.vB = function() {
return s[Pb](this.QB());
}, Y.Hn = function(a) {
return new $(this.ef + a * (this.Qa - this.ef), this.ff + a * (this.Xa - this.ff));
}, Ar(ru, $), Y = ru[M], Sa(Y, function() {
return new ru(this.x, this.y);
}), Y.Nt = function() {
return s[Pb](this.x * this.x + this.y * this.y);
}, Y.iv = function() {
return this.x * this.x + this.y * this.y;
}, Y.scale = function(a) {
return this.x *= a, this.y *= a, this;
}, Y.add = function(a) {
return this.x += a.x, this.y += a.y, this;
}, Y.Bt = function(a) {
return this.x -= a.x, this.y -= a.y, this;
}, Y.rotate = function(a) {
var b = s.cos(a), a = s.sin(a), c = this.y * b + this.x * a;
return this.x = this.x * b - this.y * a, this.y = c, this;
}, Y.Yd = function(a) {
return this == a || !!a && this.x == a.x && this.y == a.y;
}, vu[M].pz = function(a) {
var b = [];
return this.ho(a, b), b[pd](U);
}, vu[M].ho = function(a, b) {
switch (typeof a) {
case op:
this.qt(a, b);
break;

case Um:
this.mB(a, b);
break;

case Th:
b[x](a);
break;

case "undefined":
b[x](Tm);
break;

case Wm:
if (a == l) {
b[x](Tm);
break;
}
if (mr(a)) {
this.lB(a, b);
break;
}
this.nB(a, b);
break;

case W:
break;

default:
h(u("Unknown type: " + typeof a));
}
};
var wu = {
'"':'\\"',
"\\":"\\\\",
"/":"\\/",
"\b":"\\b",
"\f":"\\f",
"\n":"\\n",
"\r":"\\r",
"	":"\\t",
"":"\\u000b"
}, xu = /\uffff/[eb]("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g :/[\\\"\x00-\x1f\x7f-\xff]/g;
vu[M].qt = function(a, b) {
b[x](Hd, a[ib](xu, function(a) {
if (a in wu) return wu[a];
var b = a.charCodeAt(0), e = Ng;
return 16 > b ? e += cf :256 > b ? e += bf :4096 > b && (e += Ye), wu[a] = e + b[kc](16);
}), Hd);
}, vu[M].mB = function(a, b) {
b[x](oa(a) && !ga(a) ? a :Tm);
}, vu[M].lB = function(a, b) {
var c = a[L];
b[x](Jg);
for (var d = U, e = 0; c > e; e++) b[x](d), d = a[e], this.ho(this.Hk ? this.Hk[P](a, na(e), d) :d, b), 
d = xe;
b[x](Og);
}, vu[M].nB = function(a, b) {
b[x](dr);
var d, c = U;
for (d in a) if (da[M][Jc][P](a, d)) {
var e = a[d];
typeof e != W && (b[x](c), this.qt(d, b), b[x](vf), this.ho(this.Hk ? this.Hk[P](a, d, e) :e, b), 
c = xe);
}
b[x](er);
}, Bu[M].qd = function() {}, Ar(Cu, Bu), Cu[M].qd = function(a, b, c) {
zu(this.element, this.Dt, a, b, aa, c, this.wB);
}, Ar(Du, Bu), Du[M].qd = function(a, b, c, d) {
zu(Ht(a), 0, a, b, this.l, c, l, d);
};
var Eu = "StopIteration" in fr ? fr.StopIteration :u("StopIteration");
Qa(Fu[M], function() {
h(Eu);
}), Fu[M].Zn = function() {
return this;
}, Y = Iu[M], Y.bb = 0, Y.qi = 0, Y.If = function() {
return this.bb;
}, Y.Be = function() {
this.mi();
for (var a = [], b = 0; b < this.za[L]; b++) a[x](this.Ua[this.za[b]]);
return a;
}, Y.Xn = function() {
return this.mi(), this.za[pb]();
}, Y.zA = function(a) {
return Ju(this.Ua, a);
}, Y.nt = function(a) {
for (var b = 0; b < this.za[L]; b++) {
var c = this.za[b];
if (Ju(this.Ua, c) && this.Ua[c] == a) return j;
}
return n;
}, Y.Yd = function(a, b) {
if (this === a) return j;
if (this.bb != a.If()) return n;
var c = b || Ku;
this.mi();
for (var d, e = 0; d = this.za[e]; e++) if (!c(this.get(d), a.get(d))) return n;
return j;
}, Ea(Y, function() {
this.Ua = {}, Ka(this.za, 0), this.qi = this.bb = 0;
}), Y.remove = function(a) {
return Ju(this.Ua, a) ? (delete this.Ua[a], this.bb--, this.qi++, this.za[L] > 2 * this.bb && this.mi(), 
j) :n;
}, Y.mi = function() {
if (this.bb != this.za[L]) {
for (var a = 0, b = 0; a < this.za[L]; ) {
var c = this.za[a];
Ju(this.Ua, c) && (this.za[b++] = c), a++;
}
Ka(this.za, b);
}
if (this.bb != this.za[L]) {
for (var d = {}, b = a = 0; a < this.za[L]; ) c = this.za[a], Ju(d, c) || (this.za[b++] = c, 
d[c] = 1), a++;
Ka(this.za, b);
}
}, Y.get = function(a, b) {
return Ju(this.Ua, a) ? this.Ua[a] :b;
}, Y.set = function(a, b) {
Ju(this.Ua, a) || (this.bb++, this.za[x](a), this.qi++), this.Ua[a] = b;
}, Y.Kn = function(a) {
var b;
a instanceof Iu ? (b = a.Xn(), a = a.Be()) :(b = vs(a), a = us(a));
for (var c = 0; c < b[L]; c++) this.set(b[c], a[c]);
}, Sa(Y, function() {
return new Iu(this);
}), Y.Zn = function(a) {
this.mi();
var b = 0, c = this.za, d = this.Ua, e = this.qi, f = this, g = new Fu();
return Qa(g, function() {
for (;;) {
e != f.qi && h(u("The map has changed since the iterator was created")), b >= c[L] && h(Eu);
var g = c[b++];
return a ? g :d[g];
}
}), g;
}, Y = Lu[M], Y.If = function() {
return this.Ua.If();
}, Y.add = function(a) {
this.Ua.set(Mu(a), a);
}, Y.Kn = function(a) {
for (var a = Hu(a), b = a[L], c = 0; b > c; c++) this.add(a[c]);
}, Y.removeAll = function(a) {
for (var a = Hu(a), b = a[L], c = 0; b > c; c++) this.remove(a[c]);
}, Y.remove = function(a) {
return this.Ua.remove(Mu(a));
}, Ea(Y, function() {
this.Ua[Vb]();
}), Ya(Y, function(a) {
return this.Ua.zA(Mu(a));
}), Y.bt = function(a) {
for (var b = new Lu(), a = Hu(a), c = 0; c < a[L]; c++) {
var d = a[c];
this[fd](d) && b.add(d);
}
return b;
}, Y.Be = function() {
return this.Ua.Be();
}, Sa(Y, function() {
return new Lu(this);
}), Y.Yd = function(a) {
return this.If() == Gu(a) && this.pB(a);
}, Y.pB = function(a) {
var b = Gu(a);
if (this.If() > b) return n;
!(a instanceof Lu) && b > 5 && (a = new Lu(a));
a:if (b = function(b) {
return typeof a[fd] == W ? a[fd](b) :typeof a.nt == W ? a.nt(b) :nr(a) || qr(a) ? 0 <= Or(a, b) :ws(a, b);
}, typeof this[ed] == W) b = this[ed](b, aa); else if (nr(this) || qr(this)) b = Ur(this, b, aa); else {
var c;
if (typeof this.Xn == W) c = this.Xn(); else if (typeof this.Be != W) if (nr(this) || qr(this)) {
c = [];
for (var d = this[L], e = 0; d > e; e++) c[x](e);
} else c = vs(this); else c = aa;
for (var d = Hu(this), e = d[L], f = 0; e > f; f++) if (!b[P](aa, d[f], c && c[f], this)) {
b = n;
break a;
}
b = j;
}
return b;
}, Y.Zn = function() {
return this.Ua.Zn(n);
}, Ar(Nu, Br), Y = Nu[M], Y.Bs = j, Y.Dn = l, Y.addEventListener = function(a, b, c, d) {
eu(this, a, b, c, d);
}, Y.removeEventListener = function(a, b, c, d) {
hu(this, a, b, c, d);
}, Y.dispatchEvent = function(a) {
var b = a[I] || a, c = bu;
if (b in c) {
if (qr(a)) a = new ut(a, this); else if (a instanceof ut) Ta(a, a[Pc] || this); else {
var d = a, a = new ut(b, this);
As(a, d);
}
var e, f, d = 1, c = c[b], b = j in c;
if (b) {
for (e = [], f = this; f; f = f.Dn) e[x](f);
f = c[j], f.Mc = f.bb;
for (var g = e[L] - 1; !a.Jf && g >= 0 && f.Mc; g--) ya(a, e[g]), d &= lu(f, e[g], a[I], j, a) && a.Bk != n;
}
if (n in c) if (f = c[n], f.Mc = f.bb, b) for (g = 0; !a.Jf && g < e[L] && f.Mc; g++) ya(a, e[g]), 
d &= lu(f, e[g], a[I], n, a) && a.Bk != n; else for (e = this; !a.Jf && e && f.Mc; e = e.Dn) ya(a, e), 
d &= lu(f, e, a[I], n, a) && a.Bk != n;
a = Boolean(d);
} else a = j;
return a;
}, Y.lb = function() {
Nu.lc.lb[P](this), ku(this), this.Dn = l;
}, Ar(Ou, Nu), Ou[M].enabled = n;
var Pu = fr.window;
Y = Ou[M], Y.Nf = l, Y.On = function() {
if (this.enabled) {
var a = zr() - this.Sg;
a > 0 && a < .8 * this.Dk ? this.Nf = this.si[wc](this.Nn, this.Dk - a) :(this.dA(), 
this.enabled && (this.Nf = this.si[wc](this.Nn, this.Dk), this.Sg = zr()));
}
}, Y.dA = function() {
this[Ab](Kp);
}, Va(Y, function() {
this.enabled = j, this.Nf || (this.Nf = this.si[wc](this.Nn, this.Dk), this.Sg = zr());
}), Y.stop = function() {
this.enabled = n, this.Nf && (this.si.clearTimeout(this.Nf), this.Nf = l);
}, Y.lb = function() {
Ou.lc.lb[P](this), this.stop(), delete this.si;
}, Ar(Ru, Nu), Y = Ru[M], Y.Ta = l, Y.Hy = j, Y.ct = l, Y.Pg = n, Y.GA = n, Y.Mt = -1, 
Y.Iy = n, Y.eA = j, Y.Gg = Wp, Y.SA = function(a) {
this.Gg = a;
}, Y.t = function() {
return this.Ta;
}, Y.yn = function(a) {
this.BA(), this.Ta = a;
}, Y.BA = function() {
this.Pg && h(u("Can not change this state of the popup while showing."));
}, Y.v = function() {
return this.Pg;
}, Y.Hg = function(a) {
this.ci && this.ci.stop(), this.ki && this.ki.stop(), a ? this.HA() :this.zk();
}, Y.qd = hr, Y.HA = function() {
if (!this.Pg && this.Ym()) {
this.Ta || h(u("Caller must call setElement before trying to show the popup")), 
this.qd();
var a = gt(this.Ta);
if (this.Iy && this.$c.Df(a, El, this.Jy, j), this.Hy) if (this.$c.Df(a, Hm, this.hs, j), 
Ls) {
var b;
try {
b = a.activeElement;
} catch (c) {}
for (;b && b.nodeName == ig; ) {
try {
var d = b[jd] || b[bc][xc];
} catch (e) {
break;
}
a = d, b = a.activeElement;
}
this.$c.Df(a, Hm, this.hs, j), this.$c.Df(a, Fj, this.gs);
} else this.$c.Df(a, Qh, this.gs);
this.Gg == Wp ? this.Ky() :this.Gg == Nm && this.qd(), this.Pg = j, this.ci ? (gu(this.ci, Uj, this.is, n, this), 
this.ci.play()) :this.is();
}
}, Y.zk = function(a) {
return this.Pg && this.gA(a) ? (this.$c && this.$c[Tc](), this.Pg = n, zr(), this.ki ? (gu(this.ki, Uj, yr(this.et, a), n, this), 
this.ki.play()) :this.et(a), j) :n;
}, Y.et = function(a) {
this.Gg == Wp ? this.GA ? Qu(this.tt, 0, this) :this.tt() :this.Gg == Nm && this.FA(), 
this.An(a);
}, Y.Ky = function() {
Ja(this.Ta[O], Rq), Tt(this.Ta, j);
}, Y.tt = function() {
Ja(this.Ta[O], fl), Tt(this.Ta, n);
}, Y.FA = function() {
this.Ta[O].top = Be;
}, Y.Ym = function() {
return this[Ab](Nh);
}, Y.is = function() {
this.Mt = zr(), this[Ab](Ho);
}, Y.gA = function(a) {
return this[Ab]({
type:Mh,
target:a
});
}, Y.An = function(a) {
this[Ab]({
type:gl,
target:a
});
}, Y.hs = function(a) {
a = a[Pc], !ot(this.Ta, a) && (!this.ct || ot(this.ct, a)) && !this.Zs() && this.zk(a);
}, Y.Jy = function(a) {
27 == a[Lb] && this.zk(a[Pc]) && (a[vb](), a[Cc]());
}, Y.gs = function(a) {
if (this.eA) {
var b = gt(this.Ta);
if (Ls || Ks) {
if (a = b.activeElement, !a || ot(this.Ta, a) || a[hd] == Tf) return;
} else if (a[Pc] != b) return;
this.Zs() || this.zk();
}
}, Y.Zs = function() {
return 150 > zr() - this.Mt;
}, Y.lb = function() {
Ru.lc.lb[P](this), this.$c.pi(), Dr(this.ci), Dr(this.ki), delete this.Ta, delete this.$c;
}, Ar(Su, Ru), Su[M].nb = function() {
return this.k || l;
}, Su[M].fB = function(a) {
this.k = a || aa, this.v() && this.qd();
}, Su[M].qd = function() {
if (this.k) {
var a = !this.v() && this.Gg != Nm, b = this.t();
a && (Ja(b[O], fl), Tt(b, j)), this.k.qd(b, this.vx, this.cC), a && Tt(b, n);
}
}, Ar(Tu, Su);
var Uu = [];
Y = Tu[M], Y.nc = l, Oa(Y, "goog-tooltip"), Y.wt = 500, Y.xt = 0, Y.Zz = function(a) {
a = qr(a) ? ea[ob](a) :a, this.yf.add(a), eu(a, Km, this.it, n, this), eu(a, Jm, this.Gk, n, this), 
eu(a, Im, this.ht, n, this), eu(a, dk, this.gt, n, this), eu(a, Qh, this.Gk, n, this);
}, Y.detach = function(a) {
if (a) a = qr(a) ? ea[ob](a) :a, this.st(a), this.yf.remove(a); else {
for (var b = this.yf.Be(), c = 0; a = b[c]; c++) this.st(a);
this.yf[Vb]();
}
}, Y.st = function(a) {
hu(a, Km, this.it, n, this), hu(a, Jm, this.Gk, n, this), hu(a, Im, this.ht, n, this), 
hu(a, dk, this.gt, n, this), hu(a, Qh, this.Gk, n, this);
}, Y.Iz = function(a) {
this.wt = a;
}, Y.Hz = function(a) {
this.xt = a;
}, Y.aA = function(a) {
var b = this.t();
if (Fp in b) b.textContent = a; else if (b[Nb] && 3 == b[Nb][kb]) {
for (;b.lastChild != b[Nb]; ) b[Nc](b.lastChild);
ta(b[Nb], a);
} else mt(b), b[v](gt(b)[sb](a));
}, Y.yn = function(a) {
var b = this.t();
b && nt(b), Tu.lc.yn[P](this, a), a && (b = this.ak.mb[Lc], b.insertBefore(a, b.lastChild));
}, Y.getState = function() {
return this.Rg ? this.v() ? 4 :1 :this.ei ? 3 :this.v() ? 2 :0;
}, Y.Ym = function() {
if (!Ru[M].Ym[P](this)) return n;
if (this[Sc]) for (var a, b = 0; a = Uu[b]; b++) ot(a.t(), this[Sc]) || a.Hg(n);
return 0 <= Or(Uu, this) || Uu[x](this), a = this.t(), Oa(a, this.className), this.ik(), 
eu(a, Km, this.ks, n, this), eu(a, Jm, this.js, n, this), this.Tm(), j;
}, Y.An = function() {
Yr(Uu, this);
for (var b, a = this.t(), c = 0; b = Uu[c]; c++) b[Sc] && ot(a, b[Sc]) && b.Hg(n);
this.us && this.us.bn(), hu(a, Km, this.ks, n, this), hu(a, Jm, this.js, n, this), 
Ua(this, aa), 0 == this.getState() && (this.Yj = n), Ru[M].An[P](this);
}, Y.eB = function(a, b) {
this[Sc] == a && this.yf[fd](this[Sc]) && (this.Yj || !this.dC ? (this.Hg(n), this.v() || this.wz(a, b)) :Ua(this, aa)), 
this.Rg = aa;
}, Y.wz = function(a, b) {
Ua(this, a), this.fB(b || this.Os(0)), this.Hg(j);
}, Y.hB = function(a) {
this.ei = aa, a == this[Sc] && (this.nc == l || this.nc != this.t() && !this.yf[fd](this.nc)) && !this.kz() && this.Hg(n);
}, Y.kz = function() {
return !(!this.Fs || !this.Fs.nc);
}, Y.Ys = function(a) {
var b = this.ak.tk();
this.Wb.x = a[fc] + b.x, this.Wb.y = a[gc] + b.y;
}, Y.it = function(a) {
var b = this.dk(a[Pc]);
this.nc = b, this.ik(), b != this[Sc] && (Ua(this, b), this.Us(b), this.Ts(), this.Ys(a));
}, Y.dk = function(a) {
try {
for (;a && !this.yf[fd](a); ) a = a[ld];
return a;
} catch (b) {
return l;
}
}, Y.ht = function(a) {
this.Ys(a), this.Yj = j;
}, Y.gt = function(a) {
if (this.nc = a = this.dk(a[Pc]), this.Yj = j, this[Sc] != a) {
Ua(this, a);
var b = this.Os(1);
this.ik(), this.Us(a, b), this.Ts();
}
}, Y.Os = function(a) {
return 0 == a ? (a = this.Wb[Oc](), new Vu(a)) :new Wu(this.nc);
}, Y.Ts = function() {
if (this[Sc]) for (var a, b = 0; a = Uu[b]; b++) ot(a.t(), this[Sc]) && (a.Fs = this, 
this.us = a);
}, Y.Gk = function(a) {
var b = this.dk(a[Pc]), c = this.dk(a[gb]);
b != c && (b == this.nc && (this.nc = l), this.Tm(), this.Yj = n, !this.v() || a[gb] && ot(this.t(), a[gb]) ? Ua(this, aa) :this.bn());
}, Y.ks = function() {
var a = this.t();
this.nc != a && (this.ik(), this.nc = a);
}, Y.js = function(a) {
var b = this.t();
this.nc != b || a[gb] && ot(b, a[gb]) || (this.nc = l, this.bn());
}, Y.Us = function(a, b) {
this.Rg || (this.Rg = Qu(Z(this.eB, this, a, b), this.wt));
}, Y.Tm = function() {
this.Rg && (Pu.clearTimeout(this.Rg), this.Rg = aa);
}, Y.bn = function() {
2 == this.getState() && (this.ei = Qu(Z(this.hB, this, this[Sc]), this.xt));
}, Y.ik = function() {
this.ei && (Pu.clearTimeout(this.ei), this.ei = aa);
}, Y.lb = function() {
this.Hg(n), this.Tm(), this.detach(), this.t() && nt(this.t()), this.nc = l, delete this.ak, 
Tu.lc.lb[P](this);
}, Ar(Vu, Du), Vu[M].qd = function(a, b, c) {
b = Ht(a), b = Kt(b), c = c ? new xt(c.top + 10, c[T], c[R], c[F] + 10) :new xt(10, 0, 0, 10), 
496 & Au(this.l, a, 4, c, b, 9) && Au(this.l, a, 4, c, b, 5);
}, Ar(Wu, Cu), Wu[M].qd = function(a, b, c) {
var d = new $(10, 0);
496 & zu(this.element, this.Dt, a, b, d, c, 9) && zu(this.element, 2, a, 1, d, c, 5);
};
var Xu = {
aliceblue:"#f0f8ff",
antiquewhite:"#faebd7",
aqua:"#00ffff",
aquamarine:"#7fffd4",
azure:"#f0ffff",
beige:"#f5f5dc",
bisque:"#ffe4c4",
black:Kd,
blanchedalmond:"#ffebcd",
blue:"#0000ff",
blueviolet:"#8a2be2",
brown:"#a52a2a",
burlywood:"#deb887",
cadetblue:"#5f9ea0",
chartreuse:"#7fff00",
chocolate:"#d2691e",
coral:"#ff7f50",
cornflowerblue:"#6495ed",
cornsilk:"#fff8dc",
crimson:"#dc143c",
cyan:"#00ffff",
darkblue:"#00008b",
darkcyan:"#008b8b",
darkgoldenrod:"#b8860b",
darkgray:"#a9a9a9",
darkgreen:"#006400",
darkgrey:"#a9a9a9",
darkkhaki:"#bdb76b",
darkmagenta:"#8b008b",
darkolivegreen:"#556b2f",
darkorange:"#ff8c00",
darkorchid:"#9932cc",
darkred:"#8b0000",
darksalmon:"#e9967a",
darkseagreen:"#8fbc8f",
darkslateblue:"#483d8b",
darkslategray:"#2f4f4f",
darkslategrey:"#2f4f4f",
darkturquoise:"#00ced1",
darkviolet:"#9400d3",
deeppink:"#ff1493",
deepskyblue:"#00bfff",
dimgray:"#696969",
dimgrey:"#696969",
dodgerblue:"#1e90ff",
firebrick:"#b22222",
floralwhite:"#fffaf0",
forestgreen:"#228b22",
fuchsia:"#ff00ff",
gainsboro:"#dcdcdc",
ghostwhite:"#f8f8ff",
gold:"#ffd700",
goldenrod:"#daa520",
gray:"#808080",
green:"#008000",
greenyellow:"#adff2f",
grey:"#808080",
honeydew:"#f0fff0",
hotpink:"#ff69b4",
indianred:"#cd5c5c",
indigo:"#4b0082",
ivory:"#fffff0",
khaki:"#f0e68c",
lavender:"#e6e6fa",
lavenderblush:"#fff0f5",
lawngreen:"#7cfc00",
lemonchiffon:"#fffacd",
lightblue:"#add8e6",
lightcoral:"#f08080",
lightcyan:"#e0ffff",
lightgoldenrodyellow:"#fafad2",
lightgray:"#d3d3d3",
lightgreen:"#90ee90",
lightgrey:"#d3d3d3",
lightpink:"#ffb6c1",
lightsalmon:"#ffa07a",
lightseagreen:"#20b2aa",
lightskyblue:"#87cefa",
lightslategray:"#778899",
lightslategrey:"#778899",
lightsteelblue:"#b0c4de",
lightyellow:"#ffffe0",
lime:"#00ff00",
limegreen:"#32cd32",
linen:"#faf0e6",
magenta:"#ff00ff",
maroon:"#800000",
mediumaquamarine:"#66cdaa",
mediumblue:"#0000cd",
mediumorchid:"#ba55d3",
mediumpurple:"#9370d8",
mediumseagreen:"#3cb371",
mediumslateblue:"#7b68ee",
mediumspringgreen:"#00fa9a",
mediumturquoise:"#48d1cc",
mediumvioletred:"#c71585",
midnightblue:"#191970",
mintcream:"#f5fffa",
mistyrose:"#ffe4e1",
moccasin:"#ffe4b5",
navajowhite:"#ffdead",
navy:"#000080",
oldlace:"#fdf5e6",
olive:"#808000",
olivedrab:"#6b8e23",
orange:"#ffa500",
orangered:"#ff4500",
orchid:"#da70d6",
palegoldenrod:"#eee8aa",
palegreen:"#98fb98",
paleturquoise:"#afeeee",
palevioletred:"#d87093",
papayawhip:"#ffefd5",
peachpuff:"#ffdab9",
peru:"#cd853f",
pink:"#ffc0cb",
plum:"#dda0dd",
powderblue:"#b0e0e6",
purple:"#800080",
red:"#ff0000",
rosybrown:"#bc8f8f",
royalblue:"#4169e1",
saddlebrown:"#8b4513",
salmon:"#fa8072",
sandybrown:"#f4a460",
seagreen:"#2e8b57",
seashell:"#fff5ee",
sienna:"#a0522d",
silver:"#c0c0c0",
skyblue:"#87ceeb",
slateblue:"#6a5acd",
slategray:"#708090",
slategrey:"#708090",
snow:"#fffafa",
springgreen:"#00ff7f",
steelblue:"#4682b4",
tan:"#d2b48c",
teal:"#008080",
thistle:"#d8bfd8",
tomato:"#ff6347",
turquoise:"#40e0d0",
violet:"#ee82ee",
wheat:"#f5deb3",
white:ne,
whitesmoke:"#f5f5f5",
yellow:"#ffff00",
yellowgreen:"#9acd32"
}, cv = /#(.)(.)(.)/, Zu = /^#(?:[0-9a-f]{3}){1,2}$/i, av = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
Sa(mv[M], function() {
return new mv(this[Q], this.end);
}), Sa(uv[M], function() {
return new uv(this.uf, this.tf, this.sf);
}), uv[M].Eh = function() {
return new uv(this.uf, kv(this.tf), kv(this.sf));
}, Y = vv[M], Y.getProperties = function() {
return {
fill:this.Y,
Cb:this.Ic,
stroke:this.Ob,
Aa:this.I,
jd:this.Yc,
Im:this.xe,
q:this.q ? xs(this.q) :l,
pattern:this.$a
};
}, Sa(Y, function() {
return new vv(this.getProperties());
}), Y.Eh = function() {
var a = this[Oc]();
if (a.Bm(kv(this.Y)), a.Gc(kv(this.Ob)), this.q) {
var b = xs(this.q);
b.Jd = kv(this.q.Jd), b.Kd = kv(this.q.Kd), a.q = b;
}
return this.$a && a.Hm(this.$a.Eh()), a;
}, Y.Bm = function(a) {
this.Y = jv(a);
}, Y.Fl = function(a) {
this.Ic = is(a, 0, 1);
}, Y.Gc = function(a, b) {
this.Ob = jv(a), b != l && this.Re(b);
}, Y.Re = function(a) {
this.I = a;
}, Y.ar = function() {
return this.od() ? this.I :0;
}, Y.Zg = function(a) {
this.Yc = is(a, 0, 1);
}, Y.Rq = function(a) {
this.xe = a;
}, Y.Hm = function(a) {
this.$a = a;
}, Y.lh = function() {
return 0 < this.Ic && (!(this.Y == l || this.Y == X) || this.q != l || this.$a != l);
}, Y.od = function() {
return 0 < this.I && 0 < this.Yc && !(this.Ob == l || this.Ob == X);
}, Y.Pq = function() {
return this.xe != $o;
}, Y.dq = function() {
return !this.lh() && !this.od();
}, Y.fg = function() {
return this.lh() && 1 <= this.Ic;
}, Y.Oq = function() {
return this.od() && 1 <= this.Yc;
};
var wv = new vv({
Cb:0,
fill:Tq,
jd:0,
stroke:Tq
});
Av[M].ig = function(a) {
this.Ek = a, this.Sh() && hv(this.Ta, a);
}, Av[M].pn = function() {
return this.Sh() ? iv(this.Ta) :this.Ek;
}, Av[M].t = function() {
return this.Ta || (this.Ta = this.iA(), this.Ek === l || hv(this.Ta, this.Ek)), 
this.Ta;
}, Av[M].Sh = function() {
return !!this.Ta;
}, Y = Bv[M], Y.zc = function(a) {
this.Sa[x](a);
}, Y.move = function(a, b) {
this.zc({
type:Mm,
data:{
x:a,
y:b
}
});
}, Y.H = function(a, b) {
this.zc({
type:hm,
data:{
x:a,
y:b
}
});
}, Y.Pj = function(a, b, c, d, e, f) {
this.zc({
type:rj,
data:{
Qa:a,
Xa:b,
ic:c,
xc:d,
x:e,
y:f
}
});
}, Y.yb = function(a, b, c, d, e, f, g) {
this.zc({
type:vh,
data:{
fn:a,
gn:b,
hn:c,
jn:d,
Gr:e,
kn:f,
Hr:g
}
});
}, Y.zm = function(a, b) {
if (0 != a[L]) if (0 == this.Sa[L] ? this[xb](a[0].x, a[0].y) :this.H(a[0].x, a[0].y), 
b) for (var c = 1; c < a[L]; ++c) this.Pj(b[c - 1][1].x, b[c - 1][1].y, b[c][0].x, b[c][0].y, a[c].x, a[c].y); else for (c = 1; c < a[L]; ++c) this.H(a[c].x, a[c].y);
}, Y.close = function() {
this.zc({
type:Yi,
data:l
});
}, Ar(Fv, Br), Y = Fv[M], pa(Y, 0), $a(Y, 0), Y.Lo = function(a, b) {
var c = this.vt(a, b);
return c.ig(Rg), this.Um = c;
}, Ea(Y, function() {
this.wi(), this.wc = new nu();
}), Y.wi = function() {
this.Um = l, Dr(this.wc), Pr(this.ln, function(a) {
Dr(a);
});
var a = this.ln;
if (!mr(a)) for (var b = a[L] - 1; b >= 0; b--) delete a[b];
Ka(a, 0), this.ns(this.Zc);
}, Y.lb = function() {
Fv.lc.lb[P](this), this.wi();
}, Y.getContainer = function() {
return this.Zc;
}, Y.ck = function(a) {
var b = Yt(a[Pc]);
return Nt(a, b);
}, Y.ig = function(a, b) {
a && (a[Bc] == Av ? a.ig(b) :hv(a, b));
}, Y.pn = function(a) {
return iv(a);
}, Y.vn = function(a, b, c) {
a[Bc] == Av && (a = a.t()), this.wc.Df(a, b, c);
}, Y.zv = function(a, b, c) {
var a = new Tu(a), d = this.Gf.kk(Lj), b = b[zc](td);
d[v](this.Gf[sb](b[0]));
for (var e = 1; e < b[L]; ++e) d[v](this.Gf.kk(ii)), d[v](this.Gf[sb](b[e]));
return Bt(d, c), a.t()[v](d), a.Iz(100), a.Hz(100), this.ln[x](a), a;
}, Y.appendChild = function(a, b) {
if (b) {
var c;
if (b[Bc] == Av) {
if (!b.Sh()) return;
c = b.t();
} else c = b;
a.t()[v](c);
}
}, Y.replaceChild = function(a, b, c) {
a.t().replaceChild(b, c), ku(c);
}, Y.Dg = function(a) {
a.Sh() && this.ns(a.t());
}, Y.ns = function(a) {
this.Gf.Dg(a);
}, Y.Ur = function(a) {
this.Gf.removeNode(a), ku(a);
}, Y.aa = function(a) {
var a = a != l ? a :n, b = new Av(Z(this.Ns, this));
return a || b.t(), b;
}, Y.xg = function(a, b) {
var c = this.xB(a);
return this.Et(c, b);
}, Y.Tl = function(a, b, c, d, e) {
return a = this.pj(a, b, c, d), this[v](e, a), a;
}, Y.So = function(a, b, c, d, e, f) {
return a = this.It(a, b, c, d, e), this[v](f, a), a;
}, Y.Ga = function(a, b, c, d, e, f) {
return a = this.df(a, b, c, d, e), this[v](f, a), a;
}, Y.ja = function(a, b, c) {
return a = this.xg(a, b), this[v](c, a), a;
}, Y.Yg = function(a, b, c, d, e, f, g, i) {
return a = this.Jt(a, b, c, d, e, f, g), this[v](i, a), a;
}, Y.Bw = function(a, b, c, d, e, f, g, i, k) {
return a = this.Ik(a, b, c, d, e, f, g, i), this[v](k, a), a;
}, Y.Av = function(a, b, c, d, e, f, g, i, k) {
return a = this.Kk(a, b, c, d, e, f, g, i), this[v](k, a), a;
}, Y.Py = function(a, b) {
return this.np(a, b)[y];
}, Y.yA = function(a, b) {
switch (b[I]) {
case Mm:
var c = b[C];
this.Zr(a, c.x, c.y);
break;

case hm:
c = b[C], this.Yr(a, c.x, c.y);
break;

case rj:
c = b[C], this.Xr(a, c.Qa, c.Xa, c.ic, c.xc, c.x, c.y);
break;

case vh:
c = b[C], this.Vr(a, c.fn, c.gn, c.hn, c.jn, c.Gr, c.kn, c.Hr);
break;

case Yi:
this.Wr(a);
}
}, Y.xB = function(a) {
for (var b = [], c = 0; c < a.Sa[L]; c++) this.yA(b, a.Sa[c]);
return b;
}, Y.getBoundingBox = function(a) {
var b = Yt(a), b = Nt(a, b), a = Rt(a);
return new xt(b.y, b.x + a[y], b.y + a[S], b.x);
}, Ar(Hv, Fv), Y = Hv[M], Y.vt = function(a, b) {
pa(this, a), $a(this, b);
var c = this.kb(wp);
return c[H](Uq, a), c[H](dl, b), c[O].overflow = fl, this.Zc[v](c), this.Ig = this.kb(Hj), 
this.Ig[H](nl, Hj), this.sk = {}, c[v](this.Ig), new Av(c);
}, Y.Rz = function() {
return this.Zc.innerHTML;
}, ra(Y, function(a) {
return s[B](100 * a) / 100;
}), Y.pj = function(a, b, c, d) {
var e = this.kb(Si);
return e[H](tj, a), e[H](uj, b), e[H](Ln, c), this.bd(e, d), e;
}, Y.It = function(a, b, c, d, e) {
var f = this.kb(Sj);
return f[H](tj, a), f[H](uj, b), f[H](ko, c), f[H](lo, d), this.bd(f, e), f;
}, Y.df = function(a, b, c, d, e) {
var f = this.kb(Pn);
return f[H](Wq, a), f[H](Zq, b), f[H](Uq, c), f[H](dl, d), this.bd(f, e), f;
}, Y.Et = function(a, b) {
var c = this.kb(ln);
return c[H](vj, a[pd](U)), this.bd(c, b), c;
}, Y.Jt = function(a, b, c, d, e, f, g) {
return this.Kk(a, b, c, d, 0, e, f, g);
}, Y.Ik = function(a, b, c, d, e, f, g, i) {
var k = Ev(b, d, f), m = Ev(c, e, f);
return this.Kk(a, k, m, new qu(b, c, d, e).vB(), js(180 * s[Kb](e - c, d - b) / s.PI, 360), f, g, i);
}, Y.Kk = function(a, b, c, d, e, f, g, i) {
var k = new vv({
fill:i[zb]
});
if (i[zb] && i[zb] != X && i.fb && i.fb != X) {
var m = new vv({
fill:i[zb],
stroke:i.fb,
Aa:3
}), p = this.aa();
return this.gi(a, b, c, d, e, f, g, i, m, p), this.gi(a, b, c, d, e, f, g, i, k, p), 
p.t();
}
return this.fi(a, b, c, d, e, f, g, i, k);
}, Y.fi = function(a, b, c, d, e, f, g, i, k) {
switch (d = this.kb(Ap), g = Dv(0, i[N], g), g = Ev(g[Q], g.end, Uj), g -= .15 * i[N], 
g = new ru(0, g), g[Ic](ks(e)), c = new ru(b, c), c.add(g), b = c.x, c = c.y, d[v](this.mn[sb](a)), 
f) {
case gp:
d[H](Bp, gp);
break;

case Ci:
d[H](Bp, ym);
break;

case Uj:
d[H](Bp, Uj);
}
return d[H](Wq, b), d[H](Zq, c), d[H](fk, i.eb), d[H](hk, i[N] || 0), i[lc] && d[H](jk, Sh), 
i.hf && d[H](ik, Dl), i.rm && d[H](Cp, tq), 0 != e && d[H](lq, go + e + vd + b + vd + c + we), 
this.bd(d, k), d;
}, Y.gi = function(a, b, c, d, e, f, g, i, k, m) {
return a = this.fi(a, b, c, d, e, f, g, i, k), this[v](m, a), a;
}, Y.Ns = function() {
return this.kb(wk);
}, Y.Ip = function(a, b, c) {
var d = Gv(), e = this.kb(Wi);
return c ? (c = this.kb(Sj), c[H](tj, b[F] + b[y] / 2), c[H](uj, b.top + b[S] / 2), 
c[H](ko, b[y] / 2), c[H](lo, b[S] / 2)) :(c = this.kb(Pn), c[H](Wq, b[F]), c[H](Zq, b.top), 
c[H](Uq, b[y]), c[H](dl, b[S])), e[v](c), e[H](nl, d), this.Ig[v](e), a = a.t(), 
a[H](Vi, uq + d + we), a;
}, Y.Zr = function(a, b, c) {
a[x](ng + this[B](b) + xe + this[B](c));
}, Y.Yr = function(a, b, c) {
a[x](kg + this[B](b) + xe + this[B](c));
}, Y.Xr = function(a, b, c, d, e, f, g) {
a[x](Uf + this[B](b) + xe + this[B](c) + xe + this[B](d) + xe + this[B](e) + xe + this[B](f) + xe + this[B](g));
}, Y.Wr = function(a) {
a[x](Ig);
}, Y.Vr = function(a, b, c, d, e, f, g, i) {
var f = js(f, 360), g = js(g, 360), k = d * s.cos(ks(g - 90)), m = e * s.sin(ks(g - 90)), f = i ? g - f :f - g;
0 > f && (f += 360), a[x](Pf + d + xe + e + ze + (f > 180 ? 1 :0) + xe + (i ? 1 :0) + xe + (b + k) + xe + (c + m));
}, Y.Ze = function(a, b, c) {
a[H](lq, mq + b + ye + c + we);
}, Y.tn = function(a, b) {
a[H](Uq, b);
}, Y.qn = function(a, b) {
a[H](dl, b);
}, Y.rn = function(a, b) {
a[H](Wq, b);
}, Y.sn = function(a, b) {
a[H](Zq, b);
}, Y.Gc = function(a, b, c) {
a[H](tp, c), b && a[H](pp, b);
}, Y.zs = function(a, b) {
var c = this.Sr;
ta(c[Nb], a);
var d = c[O];
sa(d, b.eb), Ra(d, b[N] + Kn), d.fontWeight = b[lc] ? Sh :U, d.fontStyle = b.hf ? Dl :U, 
Za(d, Ph);
var e = c[uc], c = c[Zc];
return Za(d, X), new qs(e, c);
}, Y.kb = function(a) {
return this.mn.createElementNS(ml, a);
}, Y.bd = function(a, b) {
b.od() ? (a[H](pp, b.Ob), a[H](tp, b.I), b.Oq() ? a.removeAttribute(sp) :a[H](sp, b.Yc), 
b.Pq() ? a[H](qp, Iv(b.xe, b.I)) :a.removeAttribute(qp)) :(a[H](pp, X), a[H](tp, 0)), 
b.fg() ? a.removeAttribute(Zj) :a[H](Zj, b.Ic);
var c = b.q;
c ? (c = this.cx(c), a[H](Yj, uq + c + we)) :b.$a != l ? (c = this.dx(b.$a), a[H](Yj, uq + c + we)) :a[H](Yj, b.Y);
}, Y.cx = function(a) {
var b = Gv(), c = this.kb(lm), d = a.Qa, e = a.ic, f = a.Xa, g = a.xc;
return typeof d == op && d[qb](d[L] - 1) == oe && (d = s[B](la(d, 10) * this[y] / 100)), 
typeof e == op && e[qb](e[L] - 1) == oe && (e = s[B](la(e, 10) * this[y] / 100)), 
typeof f == op && f[qb](f[L] - 1) == oe && (f = s[B](la(f, 10) * this[S] / 100)), 
typeof g == op && g[qb](g[L] - 1) == oe && (g = s[B](la(g, 10) * this[S] / 100)), 
c[H](nl, b), c[H](Xq, d), c[H]($q, f), c[H](Yq, e), c[H](ar, g), c[H](Jk, vq), d = this.kb(mp), 
d[H](Xm, af), d[H](up, np + a.Jd), c[v](d), d = this.kb(mp), d[H](Xm, hf), d[H](up, np + a.Kd), 
c[v](d), this.Ig[v](c), b;
}, Y.dx = function(a) {
var b = a.uf + Pg + a.tf + Pg + a.sf;
if (!(b in this.sk)) {
var c = l;
switch (a.uf) {
case Jn:
c = this.$z(a);
}
a = Gv(), c[H](nl, a), this.Ig[v](c), this.sk[b] = a;
}
return this.sk[b];
}, Y.$z = function(a) {
var b = this.kb(nn);
b[H](on, vq), b[H](Wq, Ye), b[H](Zq, Ye), b[H](Uq, mf), b[H](dl, mf), b[H](Nq, $e);
var c = this.kb(Pn);
return c[H](Wq, Ye), c[H](Zq, Ye), c[H](Uq, mf), c[H](dl, mf), c[H](Yj, a.sf), b[v](c), 
c = this.kb(wk), c[H](pp, a.tf), c[H](rp, ep), a = this.kb(hm), a[H](Xq, lf), a[H]($q, Ye), 
a[H](Yq, mf), a[H](ar, lf), a[H](tp, lf), c[v](a), a = this.kb(hm), a[H](Xq, Ye), 
a[H]($q, lf), a[H](Yq, lf), a[H](ar, mf), a[H](tp, lf), c[v](a), b[v](c), b;
}, Y = Lv[M], Y.O = function(a, b, c) {
for (var d = l, e = 0; e < this.Ie[L]; e++) {
a:{
var d = this.Ie[e], f = a, g = c;
if (qr(f)) d = Mv(d, f, g); else {
for (var i = 0; i < f[L]; ++i) {
var k = Mv(d, f[i], g);
if (k != l) {
d = k;
break a;
}
}
d = l;
}
}
if (d != l) return d;
}
return d = b, jr(d) ? d :l;
}, Y.Vh = function(a, b, c) {
for (var b = b != l ? xs(b) :{}, d = this.Ie[L] - 1; d >= 0; d--) {
var e = b, f = this.Ie[d], g = a, i = c;
qr(g) && (g = [ g ]);
for (var k = g[L] - 1; k >= 0; --k) {
var m = Mv(f, g[k], i) || {};
As(e, m);
}
}
return b;
}, Y.$ = function(a, b) {
var c = this.or(a);
return c != l ? c :(jr(b) || (b = n), b);
}, Y.or = function(a) {
return this.O(a, l, Nv);
}, Y.Ke = function(a, b) {
var c = this.Hd(a);
return c != l ? c :(jr(b) || (b = 0), b);
}, Y.Hd = function(a) {
return this.O(a, l, Ov);
}, Y.R = function(a, b) {
var c = this.Uh(a);
return c != l ? c :(jr(b) || (b = 0), b);
}, Y.Uh = function(a) {
return this.O(a, l, Pv);
}, Y.Uf = function(a, b) {
var c = this.RB(a);
return c != l ? c :(jr(b) || (b = 0), b);
}, Y.RB = function(a) {
return this.O(a, l, Qv);
}, Y.ud = function(a, b) {
return jr(b) || (b = U), this.O(a, b, Rv);
}, Y.Xl = function(a) {
return this.O(a, l, Rv);
}, Y.fd = function(a, b) {
return this.O(a, b, Sv);
}, Y.Tk = function(a, b, c) {
return this.O(a, c, function(a) {
return Sv(a, b);
});
}, Y.U = function(a, b, c) {
return this.O(a, c, Z(Tv, l, b));
}, Y.gh = function(a, b) {
return this.O(a, l, Z(Tv, l, b));
}, Y.SB = function(a) {
if (a = this.O(a, l), qr(a)) {
var b = a[zc](vf);
if (1 == b[L] && (b = a[zc](xe)), 3 == b[L]) {
var c = Lr(b[0]), d = Lr(b[1]), b = Lr(b[2]);
if (b >= 0 && d >= 0 && c >= 0) return [ c, d, b ];
}
}
return !mr(a) || 3 != a[L] && 4 != a[L] ? l :a;
}, Y.Ne = function(a, b) {
var c = b ? b.getProperties() :l, c = this.Vh(a, c, function(a) {
pr(a) || (a = {
fill:a
});
var b = {}, c = Sv(a.fill);
return c != l && (b.fill = c), c = Qv(a.fillOpacity), c != l && (b.Cb = c), c = Sv(a.stroke), 
c != l && (b.stroke = c), c = Pv(a.strokeWidth), c != l && (b.Aa = c), c = Qv(a.strokeOpacity), 
c != l && (b.jd = c), (a = a.gradient) && a.color1 != l && a.color2 != l && a.x1 != l && a.y1 != l && a.x2 != l && a.y2 != l && (c = {}, 
c.Jd = Sv(a.color1), c.Kd = Sv(a.color2), c.Qa = a.x1, c.Xa = a.y1, c.ic = a.x2, 
c.xc = a.y2, b.q = c), b;
}), c = new vv(c);
return c.lh() || (c.Bm(wv.Y), c.Fl(wv.Ic)), c.od() || (c.Gc(wv.Ob), c.Zg(wv.Yc)), 
c;
}, Y.sc = function(a, b) {
return this.Vh(a, b, function(a) {
return Uv(a);
});
}, Y.Po = function(a, b, c) {
return this.Vh(a, c, function(a) {
return Uv(a, b);
});
}, Y.Mv = function(a, b, c) {
return a = this.Yh(a, b), a != l ? a :(jr(c) || (c = 0), c);
}, Y.Yh = function(a, b) {
return this.O(a, l, Z(Vv, l, b));
};
var Wv = {
WC:"multiple",
hD:Mo
}, Xv = {
NONE:X,
zC:dk,
fD:qo,
qk:ci
};
Ar(Zv, Fv), Y = Zv[M], Y.vt = function(a, b) {
pa(this, a), $a(this, b);
var c = this.Ub(Lj);
this.Ce(c, -5e4, -5e4, this[y] + 1e5, this[S] + 1e5), this.Zc[v](c);
var d = this.aa(), e = d.t();
return e.coordorigin = Ze, e.coordsize = a + vd + b, e[O].top = 5e4, Aa(e[O], 5e4), 
c[v](e), d;
}, ra(Y, function(a) {
return s[B](a);
}), Y.pj = function(a, b, c, d) {
var e = this.Ub(Aq), f = 2 * c;
return this.Ce(e, a - c, b - c, f, f), this.bd(e, d, n), e;
}, Y.It = function(a, b, c, d, e) {
var f = this.Ub(Aq);
return this.Ce(f, a - c, b - d, 2 * c, 2 * d), this.bd(f, e, n), f;
}, Y.df = function(a, b, c, d, e) {
var f = this.Ub(Cq), g = e.fg() && d >= 1 && c >= 1 && e.q == l;
return this.bd(f, e, g), (e.od() || g) && (c = s.max(c - 1, 0), d = s.max(d - 1, 0)), 
this.Ce(f, a, b, c, d), f;
}, Y.Et = function(a, b) {
for (var c = this.Ub(Dq), d = this.Ub(Bq); 0 < a[L] && 0 == Mr(a)[Uc](ng, 0); ) a = cs(a, 0, a[L] - 1);
return d[H](wq, a[pd](U)), this.Ce(c, 0, 0, this[y], this[S]), c[v](d), this.bd(c, b, n), 
c;
}, Y.Jt = function(a, b, c, d, e, f, g) {
return b = Dv(b, d, e), c = Dv(c, g[N], f), f = Ci, c = Ev(c[Q], c.end, f), this.Ik(a, b[Q], c, b.end, c, e, f, g);
}, Y.Ik = function(a, b, c, d, e, f, g, i) {
var k = new vv({
fill:i[zb]
});
if (i[zb] && i[zb] != X && i.fb && i.fb != X) {
var m = new vv({
fill:i[zb],
stroke:i.fb,
Aa:2
}), p = this.aa();
return this.gi(a, b, c, d, e, f, g, i, m, p), this.gi(a, b, c, d, e, f, g, i, k, p), 
p.t();
}
return this.fi(a, b, c, d, e, f, g, i, k);
}, Y.Kk = function(a, b, c, d, e, f, g, i) {
var e = ks(e), d = Dv(b, d, f), b = new ru(b, c), k = new ru(d[Q], c), k = k[Oc]().Bt(b)[Ic](e).add(b), c = new ru(d.end, c), c = c[Oc]().Bt(b)[Ic](e).add(b);
return this.Ik(a, k.x, k.y, c.x, c.y, f, g, i);
}, Y.fi = function(a, b, c, d, e, f, g, i, k) {
var m = this.Ub(Dq);
switch (this.Ce(m, 0, 0, this[y], this[S]), g != Ci && (g = Dv(0, i[N], g), g = Ev(g[Q], g.end, Ci), 
g = new ru(0, g), g[Ic](ks(js(180 * s[Kb](e - c, d - b) / s.PI, 360))), c = new ru(b, c), 
e = new ru(d, e), c.add(g), e.add(g), b = c.x, c = c.y, d = e.x, e = e.y), b = s[B](b), 
c = s[B](c), d = s[B](d), e = s[B](e), g = this.Ub(Bq), g[H](wq, ng + b + xe + c + kg + d + xe + e + bg), 
g[H](Jp, pq), b = this.Ub(Fq), b[H](Ym, pq), d = b[O], Ra(d, i[N]), sa(d, i.eb), 
f) {
case gp:
d[H](xq, Jl);
break;

case Ci:
d[H](xq, Ci);
break;

case Uj:
d[H](xq, bo);
}
return i[lc] && (d.fontWeight = Sh), i.hf && (d.fontStyle = Dl), b[H](op, a), m[v](g), 
m[v](b), this.bd(m, k, n), m;
}, Y.gi = function(a, b, c, d, e, f, g, i, k, m) {
return a = this.fi(a, b, c, d, e, f, g, i, k), this[v](m, a), a;
}, Y.Ns = function() {
var a = this.Ub(zq);
return this.Ce(a, 0, 0, this[y], this[S]), a;
}, Y.Ip = function(a, b) {
var c = this.Ub(Lj), d = [ this.Yb(5e4 + b.top), this.Yb(5e4 + b[F] + b[y]), this.Yb(5e4 + b.top + b[S]), this.Yb(5e4 + b[F]) ];
return c[O].clip = Qn + d[pd](ye) + we, this.Ce(c, 0, 0, this[y] + 1e5, this[S] + 1e5), 
a.t(), d = new Av(c), this[v](d, a), this.Ga(1, 1, 1, 1, new vv({
fill:Tq
}), d), c;
}, Y.Zr = function(a, b, c) {
a[x](ng + s[B](b) + xe + s[B](c));
}, Y.Yr = function(a, b, c) {
a[x](kg + s[B](b) + xe + s[B](c));
}, Y.Xr = function(a, b, c, d, e, f, g) {
a[x](Uf + s[B](b) + xe + s[B](c) + xe + s[B](d) + xe + s[B](e) + xe + s[B](f) + xe + s[B](g));
}, Y.Wr = function(a) {
a[x](Gg);
}, Y.Vr = function(a, b, c, d, e, f, g, i) {
var f = js(f, 360), g = js(g, 360), k = s[B](d * s.cos(ks(f - 90))), m = s[B](e * s.sin(ks(f - 90))), p = s[B](d * s.cos(ks(g - 90))), q = s[B](e * s.sin(ks(g - 90))), d = s[B](d), e = s[B](e), b = s[B](b), c = s[B](c);
k === p && m === q && (i && 180 > js(g - f, 360) || !i && 180 > js(f - g, 360)) || a[x]((i ? Dg :Qf) + (b - d) + xe + (c - e) + xe + (b + d) + xe + (c + e) + xe + (b + k) + xe + (c + m) + xe + (b + p) + xe + (c + q));
}, Y.Ze = function(a, b, c) {
a[O].top = this.Yb(c), Aa(a[O], this.Yb(b));
}, Y.tn = function(a, b) {
pa(a[O], this.Yb(b));
}, Y.qn = function(a, b) {
$a(a[O], this.Yb(b));
}, Y.rn = function(a, b) {
Aa(a[O], this.Yb(b));
}, Y.sn = function(a, b) {
a[O].top = this.Yb(b);
}, Y.Gc = function(a, b, c) {
0 == c ? wa(a, n) :(wa(a, j), b && (a.strokecolor = b), a.strokeweight = c);
}, Y.zs = function(a, b) {
var c = this.Sr;
ta(c[Nb], a);
var d = c[O];
sa(d, b.eb), Ra(d, this.Yb(b[N] || 0)), d.fontWeight = b[lc] ? Sh :U, d.fontStyle = b.hf ? Dl :U, 
Za(d, Ph);
var e = c[uc], c = c[Zc];
return Za(d, X), b[lc] && (e *= 1.1), b.hf && (e *= .9), new qs(e, c);
}, Y.Yb = function(a) {
return s[B](a) + Kn;
}, Y.Ub = function(a) {
return this.mn[Ib](a);
}, Y.bd = function(a, b, c) {
for (var d = a.children, e = 0; e < d[L]; e++) (a.children[e][hd] == Yj || a.children[e][hd] == pp) && a[Nc](d[e]);
if (c = c != l ? c :j, b.od() ? (wa(a, j), a.strokeweight = b.I, a.strokecolor = b.Ob, 
c = !b.Oq(), d = b.Pq(), (c || d) && (e = this.Ub(Eq), c && (e.opacity = na(s[B](100 * b.Yc)) + oe), 
d && (e.dashstyle = $v(b.xe)), a[v](e))) :c && b.fg() ? (wa(a, j), a.strokeweight = 1, 
a.strokecolor = b.Y) :wa(a, n), jr(a.filled) && (a.filled = j), c = b.q, b.q != l) {
b = this.Ub(yq), b[H](aj, c.Jd), b[H](bj, c.Kd);
var d = c.Qa, e = c.Xa, f = c.ic, c = c.xc;
typeof d == op && (d = la(d, 10)), typeof e == op && (e = la(e, 10)), typeof f == op && (f = la(f, 10)), 
typeof c == op && (c = la(c, 10)), c = js(180 * s[Kb](c - e, f - d) / s.PI, 360), 
c = js(270 - c, 360), b[H](ah, c), b[H](qq, Ik), a[v](b);
} else b.$a ? (b = this.rw(b.$a), a[v](b)) :b.Y == X ? a.filled = n :b.fg() ? a.fillcolor = b.Y :(c = this.Ub(yq), 
c.opacity = na(s[B](100 * b.Ic)) + oe, xa(c, b.Y), a[v](c));
}, Y.rw = function(a) {
var b = this.Ub(yq);
return b[H](qq, nn), b[H](aj, a.tf), b[H](bj, a.sf), a = Yv() + Ve + a.uf + Le, 
b[H](fp, a), b;
}, Y.Ce = function(a, b, c, d, e) {
a = a[O], Ma(a, Sg), Aa(a, this.Yb(b)), a.top = this.Yb(c), pa(a, this.Yb(d)), $a(a, this.Yb(e));
}, Ar(aw, Br), Y = aw[M], Y.fs = function(a) {
var b = Z(this.yB, this), c = Z(this.AB, this);
bw(b, c, a);
}, Y.AB = function() {
if (this.jk) {
var a = this.Gz(), b = this.cd = a[ob](Yn);
b && (b.referencepoint = j), this.Cs(a[Lc]);
} else this.cd = this.zf[Ib](Lj), Bt(this.cd, Fn, Rn), Qt(this.cd, this.$d), this.cd.dir = rm, 
this.na[v](this.cd), this.Cs(this.na);
this.ji = j;
}, Y.Cs = function(a) {
var b = et(a);
this.ii = b[Ib](Lj);
var c = this.ii[O];
Za(c, X), Ma(c, Sg), c.top = this.$d[S] + 10 + Kn, Aa(c, this.$d[y] + 10 + Kn), 
c.whiteSpace = Sm, b[v](this.ii, b.mb[sb](vd)), b[v](a, this.ii);
}, Y.cB = function() {
var a = et(this.cd)[Ib](Lj);
Bt(a, Fn, Sg), Ft(a, 0, 0), Qt(a, hf, hf), this.cd[v](a), a = new this.Dy(a, this.ii), 
this.Vm(a), this.xn[x](a);
}, Y.YA = function() {
var a = this.zf[Ib](Lj);
this.nk = new pu(a), this.zf[v](this.na, this.nk[id]());
}, Y.yB = function() {
if (!this.jk) return j;
var a = this.uB();
return a && a._loaded;
}, Y.kj = function(a) {
if (!this.ji) return l;
for (a = a != l ? a :0; this.xn[L] <= a; ) this.cB();
return this.xn[a];
}, Y.wp = function() {
return this.ji ? (this.nk || this.YA(), this.nk) :l;
}, Y.bx = function(a, b) {
bw(Z(function() {
return this.cd != l;
}, this), a, b);
}, Y.update = function(a, b) {
if (this.$d = a, this.jk) {
var c = this.Pn();
c && (pa(c, this.$d[y][kc]()), $a(c, this.$d[S][kc]()));
} else this.ji && Qt(this.cd, this.$d);
this.ji || this.fs(b);
}, Y.Gz = function() {
var a = this.Pn();
return a ? a[jd] || a[bc][xc] :l;
}, Y.uB = function() {
var a = this.Pn();
return a ? a[bc] || (a[jd] || a[bc][xc])[Ub] || (a[jd] || a[bc][xc])[Xb] :l;
}, Y.Pn = function() {
return this.zf.t(this.cn);
}, Y.Oy = function(a) {
var b = this.zf[Ib](ol);
b.name = this.cn, b.id = this.cn, pa(b, this.$d[y][kc]()), $a(b, this.$d[S][kc]()), 
b.frameBorder = 0, b.scrolling = Rm, b.marginHeight = 0, b.marginWidth = 0, b.allowTransparency = pq, 
a || Da(b, pl), this.zf[v](this.na, b), b = b[jd] || b[bc][xc], b.open();
var c = [];
a ? (c[x](Jf), c[x](If), c[x](Mf)) :(c[x](Ff), c[x](Kf), c[x](Fd), c[x](Gd), c[x](If)), 
c[x](Lf), c[x](Lq), c[x](vk), c[x](Bd), c[x](er), c[x](Ef), c[x](Cf), c[x](Gf), 
c[x](Dd), c[x](Nf), c[x](Hf), c[x](Bf), c[x](Df), b.write(c[pd](td)), b[Kc]();
}, Y.lb = function() {
aw.lc.lb[P](this), this.zf.Dg(this.na);
};
var fw = {
LINEAR:km,
DC:ql,
XC:cn,
EC:rl
};
Y = hw[M], Ea(Y, function() {
this.qc = {}, this.pc = {}, this.rc = {};
}), Sa(Y, function() {
var a = new hw();
return a.qc = xs(this.qc), a.pc = xs(this.pc), a.rc = xs(this.rc), a;
}), Y.Yd = function(a) {
return Jv(this.qc, a.qc) && Jv(this.pc, a.pc) && Jv(this.rc, a.rc);
}, Y.Lt = function(a) {
var c, a = a == ho ? this.qc :this.pc, b = [];
for (c in a) b[x](la(c, 10));
return b;
}, Y.xm = function() {
return this.Lt(ho);
}, Y.uq = function() {
return this.Lt(nj);
}, Y.jj = function() {
var b, a = [];
for (b in this.rc) {
var c = b[zc](xe);
a[x]({
row:la(c[0], 10),
column:la(c[1], 10)
});
}
return a;
}, Y.getSelection = function() {
for (var a = [], b = this.xm(), c = this.uq(), d = this.jj(), e = 0; e < b[L]; e++) {
var f = {};
f.row = b[e], a[x](f);
}
for (e = 0; e < c[L]; e++) f = {}, f.column = c[e], a[x](f);
for (e = 0; e < d[L]; e++) f = {}, f.row = d[e].row, f.column = d[e].column, a[x](f);
return a;
}, Y.Wz = function(a, b) {
return a == ho ? this.ao(b[0]) :this.$n(b[0]);
}, Y.ao = function(a) {
return this.qc[na(a)] != l;
}, Y.$n = function(a) {
return this.pc[na(a)] != l;
}, Y.ot = function(a, b) {
return this.rc[na(a + xe + b)] != l;
}, Y.jo = function(a, b) {
return this.Wz(a, b) ? n :(a == ho ? this.qc[b[0]] = 1 :a == nj ? this.pc[b[0]] = 1 :this.rc[na(b[0] + xe + b[1])] = 1, 
j);
}, Y.addRow = function(a) {
return this.jo(ho, [ a ]);
}, Y.addColumn = function(a) {
return this.jo(nj, [ a ]);
}, Y.rB = function(a, b) {
return this.jo(Bi, [ a, b ]);
}, Y.ym = function(a, b) {
var c = this.ao(a);
return b && this[Vb](), c ? this.removeRow(a) :this.addRow(a), !c;
}, Y.Gq = function(a, b) {
var c = this.$n(a);
return b && this[Vb](), c ? this.removeColumn(a) :this.addColumn(a), !c;
}, Y.sq = function(a, b, c) {
var d = this.ot(a, b);
return c && this[Vb](), d ? this.tB(a, b) :this.rB(a, b), !d;
}, Y.removeRow = function(a) {
return this.ao(a) ? (delete this.qc[a], j) :n;
}, Y.removeColumn = function(a) {
return this.$n(a) ? (delete this.pc[a], j) :n;
}, Y.tB = function(a, b) {
return this.ot(a, b) ? (delete this.rc[na(a + xe + b)], j) :n;
}, Y.setSelection = function(a) {
var b = {}, c = {}, d = {};
a || (a = []);
for (var e = 0; e < a[L]; e++) {
var f = a[e];
f.row != l && f.column != l ? d[na(f.row + xe + f.column)] = 1 :f.row != l ? b[f.row] = 1 :f.column != l && (c[f.column] = 1);
}
var g = this.Tg(b, this.qc), i = this.Tg(c, this.pc), k = this.Tg(d, this.rc), a = this.Tg(this.qc, b), e = this.Tg(this.pc, c), f = this.Tg(this.rc, d);
return this.qc = b, this.pc = c, this.rc = d, b = new hw(), b.qc = g, b.pc = i, 
b.rc = k, c = new hw(), c.qc = a, c.pc = e, c.rc = f, new iw(b, c);
}, Y.Tg = function(a, b) {
var d, c = {};
for (d in a) b[d] || (c[d] = 1);
return c;
}, jw[M].vb = function(a, b) {
var c = this.Ie[L];
this.Ie[a] = b;
for (var d = a; c > d; ++d) this.fo[d] = this.co(0 == d ? {} :this.fo[d - 1], this.Ie[d]);
}, jw[M].Ct = function(a) {
var b = ir(a);
return b != Wm && b != zh || b == Wm && sr(a[Oc]) || or(a);
}, jw[M].co = function(a, b) {
if (this.Ct(b) || this.Ct(a) || ir(b) == zh) return b;
if (ir(a) == Wm) {
var c = xs(a);
rs(b, function(b, e) {
c[e] = e in a && a[e] != l ? this.co(a[e], b) :b;
}, this);
} else c = $r(a), rs(b, function(b, e) {
c[e] = this.co(a[e], b);
}, this);
return c;
}, jw[M].compact = function() {
return Mr(this.fo);
};
var lw = [ "minorgridline", Kk, wh, kp, Gh, mn, Kh, yl, hm, qi, ji, gh, En, Bn, Pp, "axistick", "axistitle", Ai, uh, Kl, em, dm, lj, Xp, Tg ], nw = s.log(10);
Sw[M].Am = function() {
return this.Ai < this.AA;
}, Qa(Sw[M], function() {
var a = this.Ai;
return this.Ai = new Date(this.lt), this.Yn += this.qA, this.rA[gd](this.Ai, [ this.Yn ]), 
a;
}), Sw[M].Wv = function() {
return this.Am() ? this.Ai :l;
};
var Kw = "Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), Lw = [ 0, 0, 0, 0, 1, 0, 0 ], Nw = [ 500, 30, 30, 12, 15, 6, 0 ], Uw = [ 1, 1e3, 6e4, 36e5, 864e5, 2629743830, 31556926e3 ], dx = {
$C:zn,
LC:nm,
QC:Gm
};
Y = gx[M], Y.Kc = function(a, b, c) {
this.i = a, this.rh = b, this.Lb = c !== l ? c - 1 :this.Yq(), this.A = [], this.X = r, 
this.da = -r, Ba(this, a.Xl(this.s(ok))), this.vw = a.O(this.s(Kq), function(a, b) {
return b;
}), this.Mm = l;
}, Y.tg = function(a, b) {
var c = ex(this.i, this.s(om), this.s(mo));
0 != b[L] && c != zn && h(u("Non-linear scale with gaps is not supported."));
for (var d = [], e = 0; e < b[L]; e++) {
var f = this.ny(b[e]);
f && d[x](f);
}
this.Mm = fx(c, a, d);
}, Y.ny = function(a) {
var b = this.bo(a.lx), c = this.Bi(a.mx), a = this.Bi(a.kx);
if (b > 0) {
if (!(a > c + b)) return l;
c += b;
}
return {
mA:0,
start:c,
end:a
};
}, Y.s = function(a) {
return Bw(this.rh, a);
}, Y.Yq = function() {
return -1;
}, Y.Gv = function(a, b, c) {
c && (this.Pr(a), this.Pr(b)), this.X == r && this.da == -r && (this.X = 0, this.da = 1), 
this.X == r && (this.X = this.da), this.da == -r && (this.da = this.X), this.X == this.da && (0 == this.X ? (this.X = -1, 
this.da = 1) :0 < this.X ? (this.X /= 2, this.da *= 2) :(this.X *= 2, this.da /= 2)), 
this.on(this.X, this.da, c), this.Lb = s.max(1, this.A[L] - 1);
}, Y.Iv = function(a) {
var b = this.Lk(a);
return this.vw(a, b);
}, Y.ha = function(a) {
return a = this.jf(a), a == l ? l :(a = this.qB(a), oa(a) ? a :l);
}, Y.jf = function(a) {
return a != l ? this.Bi(a) :l;
}, Y.V = function(a) {
a != l && (this.X = s.min(this.X, a), this.da = s.max(this.da, a));
}, Y.Pr = function(a) {
this.V(this.ha(a));
}, Y.Ed = function(a) {
return this.io(this.Zl(a));
}, Y.qB = function(a) {
return this.Mm[rd](a);
}, Y.Zl = function(a) {
return this.Mm.inverse(a);
}, Y.Lk = function(a) {
return a[kc]();
}, Ar(hx, gx), Y = hx[M], Y.Kc = function(a, b, c) {
hx.lc.Kc[P](this, a, b, c), a = a.Vh(this.s(pk)), b = [], b[x](a.millisecond), b[x](a.second), 
b[x](a.minute), b[x](a.hour), b[x](a.day), b[x](a.month), b[x](a.year), a = hs[gd](l, [ b, gs(this[Fb], b[L]), this.zn ]), 
this.zn = Rr(a, function(a) {
return Vr(a, function(a) {
return a;
});
});
}, Y.O = function(a, b) {
return a.O(b);
}, Y.Bi = function(a) {
return Zw(a);
}, Y.io = function(a) {
return $w(a);
}, Y.bo = function(a) {
return a;
}, Y.Gm = function() {
var a = new Date(0);
return a.setFullYear(0), a;
}, Y.on = function(a, b, c) {
var d = (b - a) / 6, e = Ow(d, this.Xh, this.Sj);
for (c ? (a = Jw(new Date(a), e, 0), b = Jw(new Date(b), e, 1)) :(a = Jw(new Date(a), e, 1), 
b = Jw(new Date(b), e, 0)), d = Qw(d), d = Mw(d, e, s[B]), d = 0 < Pw(d) ? d :e, 
this.A = [], e = a; b > e; ) this.A[x](e[dc]()), e = Rw(e, d, 1);
(c || b >= e) && this.A[x](e[dc]()), c && (this.X = a[dc](), this.da = e[dc]()), 
this.ty = this.vy(d);
}, Y.Lk = function(a) {
return this.ty[Ac](a);
}, Y.vy = function(a) {
return a = Tw(a), new google[Hc][Wc]({
pattern:this.zn[a]
});
};
var ix = [ [ 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 2 ], [ 0, 0, 0, 0, 7 ], [ 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 3 ], [ 0, 0, 0, 0, 0, 6 ], [ 0, 0, 0, 0, 0, 12 ], [ 0, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 5 ], [ 0, 0, 0, 0, 0, 0, 10 ], [ 0, 0, 0, 0, 0, 0, 25 ], [ 0, 0, 0, 0, 0, 0, 50 ], [ 0, 0, 0, 0, 0, 0, 100 ] ], jx = [ qg, qg, qg, qg, qg, "MMM y", Zq ], kx = [ [ 1 ], [ 2 ], [ 5 ], [ 10 ], [ 20 ], [ 50 ], [ 100 ], [ 200 ], [ 500 ], [ 0, 1 ], [ 0, 2 ], [ 0, 5 ], [ 0, 10 ], [ 0, 15 ], [ 0, 30 ], [ 0, 0, 1 ], [ 0, 0, 2 ], [ 0, 0, 5 ], [ 0, 0, 10 ], [ 0, 0, 15 ], [ 0, 0, 30 ], [ 0, 0, 0, 1 ], [ 0, 0, 0, 2 ], [ 0, 0, 0, 3 ], [ 0, 0, 0, 4 ], [ 0, 0, 0, 6 ], [ 0, 0, 0, 12 ], [ 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 2 ], [ 0, 0, 0, 0, 7 ], [ 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 3 ], [ 0, 0, 0, 0, 0, 6 ], [ 0, 0, 0, 0, 0, 12 ], [ 0, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 5 ], [ 0, 0, 0, 0, 0, 0, 10 ], [ 0, 0, 0, 0, 0, 0, 25 ], [ 0, 0, 0, 0, 0, 0, 50 ], [ 0, 0, 0, 0, 0, 0, 100 ] ], lx = [ Zk, Zk, "h:mm a", "h:00 a", qg, "MMM y", Zq ];
Ar(ox, gx), Y = ox[M], Y.Yq = function() {
return 4;
}, Y.Kc = function(a, b, c) {
ox.lc.Kc[P](this, a, b, c), this.pd = l, this.Nm = a.Hd(this.s(qk)), this.Wd = a.O(this.s(Lp), [ 10, 2, 5, 1 ]);
}, Y.on = function(a, b, c) {
var d, e, f, g;
for (c ? (c = Z(px, l, this.Wd, this.Lb, a, b), d = -1e-4, e = 1 / s.max(this.Lb, 3), 
f = d, g = e) :(d = -1 / s.max(this.Lb, 3), e = 0, f = d, g = e, this.Wd[0] *= -1, 
c = Z(px, l, this.Wd, this.Lb, this.X, this.da)), c = mx(a, b, d, e, f, g, this.Lb, c), 
d = (c.ld - c.fc) / this.Lb, this.A = [], e = 0; e <= this.Lb; ++e) this.A[x](c.fc + d * e);
this.X = s.min(c.fc, a), this.da = s.max(c.ld, b);
a:if (a = this.Nm ? d / this.Nm :d, 0 == a) a = 0; else {
for (a = s.abs(a), b = 0; 16 > b; ++b) {
if (s.abs(a - s[B](a)) < 1e-7 * a) {
a = b;
break a;
}
a *= 10;
}
a = 16;
}
this.zx = a, this.pd = new google[Hc][ac]({
pattern:this[Fb],
fractionDigits:this[Fb] ? l :this.zx,
scaleFactor:this.Nm
});
}, Y.O = function(a, b) {
return a.Hd(b);
}, Y.Lk = function(a) {
return this.pd[Ac](a);
}, Y.Bi = function(a) {
return a;
}, Y.io = function(a) {
return a;
}, Y.bo = function(a) {
return a;
}, Y.Gm = function() {
return 0;
};
var rx = l;
qx[M].gx = function(a) {
return (a = this.Ot[a]) ? a[gd](l, []) :l;
}, qx[M].Mk = function(a, b) {
this.Ot[a] = b;
}, Ar(tx, gx), Y = tx[M], Y.Kc = function(a, b, c) {
tx.lc.Kc[P](this, a, b, c), this.Wd = a.O(this.s(Lp), [ 10, 2, 1 ]);
}, Y.O = function(a, b) {
return a.SB(b);
}, Y.Bi = function(a) {
return ax(a);
}, Y.io = function(a) {
return Vw(a);
}, Y.bo = function(a) {
return a;
}, Y.Gm = function() {
return Vw(0);
}, Y.on = function(a, b, c) {
if (-1 == this.Lb) {
var d = (b - a) / 6, e = Ow(d, this.Xh, 0), f = Pw(e), d = s.max(1, s[B](d / f)) * f;
for (c ? (a = s[D](a / d) * d, b = s[lb](b / d) * d) :(a = s[lb](a / d) * d, b = s[D](b / d) * d), 
this.A = [], f = a; b > f; ) this.A[x](f), f += d;
this.A[x](f), c && (this.X = a, this.da = b), this.Br = Tw(e);
} else this.by(a, b, c);
}, Y.by = function(a, b, c) {
var d, e, f, g;
for (c ? (c = Z(ux, l, this.Wd, this.Lb, a, b), d = -1e-4, e = 1 / s.max(this.Lb, 3), 
f = d, g = e) :(d = -1 / s.max(this.Lb, 3), e = 0, f = d, g = e, this.Wd[0] *= -1, 
c = Z(ux, l, this.Wd, this.Lb, this.X, this.da)), c = mx(a, b, d, e, f, g, this.Lb, c), 
d = (c.ld - c.fc) / this.Lb, this.A = [], e = 0; e <= this.Lb; ++e) this.A[x](c.fc + d * e);
this.X = s.min(c.fc, a), this.da = s.max(c.ld, b), this.Br = 0 == d - s[D](d) ? 1 :0;
}, Y.Lk = function(a) {
return new google[Hc][Wc]({
pattern:this[Fb] ? this[Fb] :1 >= this.Br ? dg :cg
})[Ac](new Date(1970, 0, 1, a[0], a[1], a[2], 0));
};
var vx = [ [ 0, 1, 0, 0 ], [ 0, 2, 0, 0 ], [ 0, 5, 0, 0 ], [ 0, 10, 0, 0 ], [ 0, 20, 0, 0 ], [ 0, 30, 0, 0 ], [ 0, 0, 1, 0 ], [ 0, 0, 5, 0 ], [ 0, 0, 10, 0 ], [ 0, 0, 15, 0 ], [ 0, 0, 30, 0 ], [ 0, 0, 0, 1 ], [ 0, 0, 0, 2 ], [ 0, 0, 0, 3 ], [ 0, 0, 0, 4 ], [ 0, 0, 0, 6 ], [ 0, 0, 0, 12 ] ];
sx().Mk(Op, function() {
return new tx(vx);
}), sx().Mk(zj, function() {
return new hx(ix, 3, jx);
}), sx().Mk(Aj, function() {
return new hx(kx, 3, lx);
}), sx().Mk(Um, function() {
return new ox();
});
var wx = {
NONE:X,
ZC:rn,
IB:W,
KB:no,
jC:ji
}, xx = {
NONE:X,
Gt:hm,
EB:wh,
jD:jp,
FB:Jh,
lC:ui,
KB:no,
kC:ni
}, yx = {
FB:Jh,
kD:lp,
iC:hi,
POINTS:Dn,
Gt:hm,
EB:wh,
NONE:X
}, zx = {
rC:zo,
JC:Ao,
pC:yo
}, Ax = {
HB:vi,
Ht:Jq,
mC:zi
}, Bx = {
aD:In,
NC:xm,
yC:Wj
}, Cx = {
NONE:X,
cD:bo,
HC:Jl,
LB:jq,
GB:di,
ad:ql,
GC:Il
}, Dx = {
NONE:X,
LB:jq,
GB:di,
ad:ql
}, Ex = {
mD:Mq,
BC:il
}, Fx = {
iD:gp,
nC:Ci,
xC:Uj
}, Gx = {
NONE:X,
ad:ql,
Af:cn
}, Hx = {
hC:fi,
lD:sq
}, Ix = {
AC:hl,
MC:qm
}, Jx = {
NONE:X,
FC:Gl,
Ht:Jq,
JB:pn
}, Kx = {
qk:ci,
Ht:Jq,
JB:pn
}, Lx = {
vC:Gj,
wC:Mj
}, Mx = {
sC:Bj,
HB:vi,
gD:xo
}, Nx = {
NONE:X,
IB:W,
YC:qn,
oC:Zi
}, Ox = {
gC:Bh,
fC:Ah
}, Px = {
IC:fm,
Gt:hm
}, Qx = [ {
color:"#3366CC",
lighter:"#45AFE2"
}, {
color:"#DC3912",
lighter:"#FF3300"
}, {
color:"#FF9900",
lighter:"#FFCC00"
}, {
color:"#109618",
lighter:"#14C21D"
}, {
color:"#990099",
lighter:"#DF51FD"
}, {
color:"#0099C6",
lighter:"#15CBFF"
}, {
color:"#DD4477",
lighter:"#FF97D2"
}, {
color:"#66AA00",
lighter:"#97FB00"
}, {
color:"#B82E2E",
lighter:"#DB6651"
}, {
color:"#316395",
lighter:"#518BC6"
}, {
color:"#994499",
lighter:"#BD6CBD"
}, {
color:"#22AA99",
lighter:"#35D7C2"
}, {
color:"#AAAA11",
lighter:"#E9E91F"
}, {
color:"#6633CC",
lighter:"#9877DD"
}, {
color:"#E67300",
lighter:"#FF8F20"
}, {
color:"#8B0707",
lighter:"#D20B0B"
}, {
color:"#651067",
lighter:"#B61DBA"
}, {
color:"#329262",
lighter:"#40BD7E"
}, {
color:"#5574A6",
lighter:"#6AA7C4"
}, {
color:"#3B3EAC",
lighter:"#6D70CD"
}, {
color:"#B77322",
lighter:"#DA9136"
}, {
color:"#16D620",
lighter:"#2DEA36"
}, {
color:"#B91383",
lighter:"#E81EA6"
}, {
color:"#F4359E",
lighter:"#F558AE"
}, {
color:"#9C5935",
lighter:"#C07145"
}, {
color:"#A9C413",
lighter:"#D7EE53"
}, {
color:"#2A778D",
lighter:"#3EA7C6"
}, {
color:"#668D1C",
lighter:"#97D129"
}, {
color:"#BEA413",
lighter:"#E9CA1D"
}, {
color:"#0C5922",
lighter:"#149638"
}, {
color:"#743411",
lighter:"#C5571D"
} ], Rx = {
vAxis:{
titleTextStyle:{
color:Md,
italic:j
}
},
hAxis:{
titleTextStyle:{
color:Md,
italic:j
},
gridlines:{
minorTextOpacity:.7,
minorGridlineOpacity:.4,
newTimeline:n,
allowMinor:j,
minStrongLineDistance:40,
minWeakLineDistance:40,
minStrongToWeakLineDistance:5,
minNotchDistance:10,
minMajorTextDistance:10,
minMinorTextDistance:5,
unitThreshold:1.5
}
},
sizeAxis:{
minSize:5,
maxSize:30
},
fontName:"Arial",
titleTextStyle:{
color:Kd,
bold:j
},
bubble:{
textStyle:{
color:Kd
}
},
candlestick:{
hollowIsRising:n
},
annotations:{
datum:{
textStyle:{
color:yo
},
stemColor:"#999999"
},
domain:{
textStyle:{
color:Md
},
stemColor:"#999999"
}
},
majorAxisTextColor:Md,
minorAxisTextColor:"#444444",
backgroundColor:{
fill:ke,
stroke:Nd,
strokeWidth:0
},
chartArea:{
backgroundColor:{
fill:X
}
},
tooltip:{
textStyle:{
color:Kd
}
},
baselineColor:"#333333",
gridlineColor:"#cccccc",
pieSliceBorderColor:ne,
pieResidueSliceColor:"#cccccc",
pieSliceTextStyle:{
color:ne
},
areaOpacity:.3,
intervals:{
style:Jh,
color:zo,
lineWidth:1,
fillOpacity:.3,
barWidth:.25,
shortBarWidth:.1,
boxWidth:.25,
pointSize:6
},
actionsMenu:{
textStyle:{
color:Kd
}
},
legend:{
textStyle:{
color:Md
},
pagingTextStyle:{
color:"#0011cc"
},
scrollArrows:{
activeColor:"#0011cc",
inactiveColor:"#cccccc"
}
},
colorAxis:{
legend:{
textStyle:{
color:Kd
}
}
},
bar:{
groupWidth:100 / 1.618 + oe
}
};
Y = Vx[M], Y.drawChart = function(a, b) {
this.$v();
var c = new jw(2);
c.vb(0, a), c.vb(1, b);
var c = this.Pe = c[nd](), d = this.e, e = d.Lo(c[y], c[S]);
this.Nb(e.t(), Ei);
var f = c.Li;
f.dq() || d.Ga(0, 0, c[y], c[S], f, e), c.Qf == cn && (f = this.de(c[oc], e), this.Nb(f, Pp)), 
this.Gd = d.aa(j), f = c.o, this.Aq(f), f && f[pc] != ql && (d[v](e, this.Gd), this.Nb(this.Gd.t(), Kl)), 
this.cf = d.aa(j), f = c.Wc, this.zq(f), f && f[pc] != ql && (d[v](e, this.cf), 
this.Ra.colorbar = this.cf.t()), this.Dq(c, e) || this.aw(c, e), this.ul = d.aa(n), 
d[v](e, this.ul), this.ve = b;
}, Y.xw = function(a, b) {
var c = vs({
d:l,
r:l,
o:l,
vc:l,
Wc:l
});
Fw(b, c) && Fw(this.ve, c) ? (this.Kw(a, b), this.Jw(a, b), this.er(a, b), this.ve = b) :this.drawChart(a, b);
}, Y.Kw = function(a, b) {
if (!Jv(b.o, this.ve.o)) {
this.e.Dg(this.Gd);
var c = new jw(2);
c.vb(0, a.o || {}), c.vb(1, b.o || {}), c = c[nd](), this.Aq(c);
}
}, Y.Jw = function(a, b) {
if (!Jv(b.Wc, this.ve.Wc)) {
this.e.Dg(this.cf);
var c = new jw(2);
c.vb(0, a.Wc || {}), c.vb(1, b.Wc || {}), c = c[nd](), this.zq(c);
}
}, Y.aw = function(a, b) {
var c = {
color:Oh,
eb:a.ed,
fontSize:a.Fc,
bold:n,
hf:n,
rm:n
};
this.Cw(sg, c, a.b[y]);
var d = a.b.top + s[B](a.b[S] / 2);
this.e.Bw(sg, a.b[F], d, a.b[F] + a.b[y], d, Ci, Ci, c, b);
}, Y.Aq = function(a) {
if (a) {
var b = a.Vc;
if (b) {
var c;
for (a.Lh ? c = a.Vk :(c = Rr(b, function(a) {
return this.cq(a);
}, this), c = sv(c)), c && (c = At(c), this.e.Ga(c[F], c.top, c[y], c[S], wv, this.Gd)), 
c = 0; c < b[L]; c++) this.Px(b[c]);
this.Qx(a.Lh);
}
}
}, Y.cq = function(a) {
var b = [];
if (a.m) {
var c = Sx(a.m);
c && b[x](c);
}
return a.M && b[x](a.M.P.fy()), sv(b);
}, Y.Px = function(a) {
if (a.v) {
var b = this.e.aa(n), c = kw([ dm, a[sc] ]);
this.Nb(b.t(), c, dm), (c = this.cq(a)) && (c = At(c), this.e.Ga(c[F], c.top, c[y], c[S], wv, b)), 
a.m && this.de(a.m, b), a.M && this.e.Ga(a.M.P[F], a.M.P.top, a.M.P[y], a.M.P[S], a.M.a, b), 
c = l, a.ka && a.ka.v && (c = this.vv(a.ka.P.x, a.ka.P.y, a.ka.a, b), a = kw([ Xn, a[sc] ]), 
this.Nb(c, a)), this.e[v](this.Gd, b);
}
}, Y.Qx = function(a) {
a && (this.$s(a.gm, -1), a.fm && this.de(a.fm, this.Gd), this.$s(a.em, 1));
}, Y.$s = function(a, b) {
if (a) {
var c = Cv(a[Sb]), c = this.e.ja(c, a.a, this.Gd);
if (a.Nd) {
var d = kw([ em, b ]);
this.Nb(c, d);
}
}
}, Y.vv = function(a, b, c, d) {
var e = this.e, f = e.aa();
return e.Ga(a, b, 12, 12, c, f), e[v](d, f), c = new Bv(), c[xb](a + 2, b + 2), 
c.H(a + 12 - 2, b + 12 - 2), c[xb](a + 12 - 2, b + 2), c.H(a + 2, b + 12 - 2), a = new vv(), 
a.Gc(ne), a.Re(2), e.ja(c, a, f), f.t();
}, Y.zq = function(a) {
if (a) {
for (var b = a.definition, c = this.e, d = this.cf, e = b.Zp, f = 0; f < e[L]; ++f) c.Ga(e[f].zb[F], e[f].zb.top, e[f].zb[y], e[f].zb[S], e[f].a, d);
for (e = b.$p, f = 0; f < e[L]; ++f) {
var g = new Bv();
g[xb](e[f][Sb][0], e[f][Sb][1]), g.H(e[f][Sb][2], e[f][Sb][3]), g.H(e[f][Sb][4], e[f][Sb][5]), 
g[Kc](), c.ja(g, e[f].a, d);
}
for (b = b.aq, e = 0; e < b[L]; ++e) c.Yg(b[e][z], b[e].x, b[e].y, 1, gp, gp, b[e][O], d);
a = this.e.Ga(a.xh[F], a.xh.top, a.xh[y], a.xh[S], wv, this.cf), this.Nb(a, lj);
}
}, Y.Cw = function(a, b, c) {
var d = b[N], a = this.e.Py(a, b);
return a > c && (d = s.max(1, s[D](b[N] * c / a))), d;
}, Y.Cg = function(a) {
var b = this.Ra[a];
b && (this.e.Ur(b), delete this.Ra[a]);
}, Y.Le = function(a, b) {
var c;
if (a.zh) {
var d = this.Fh[id]();
c = a.zh, c = lv(et(d), c), d[v](c), a.ap && (c.innerHTML = a.zh[nb]);
var e = a.bp, d = a.$o, f = a.cp, g = a.margin, i = new qs(c[uc], c[Zc]), k = d[T] - e.x >= i[y] + g, m = d[R] - e.y >= i[S] + g, p = e.y - d.top >= i[S] + g, q = e.y + (f + i[S] / 2) * (p || k ? -1 :1), e = is(e.x + (f + i[y] / 2) * (e.x - d[F] >= i[y] + g && !k && !m && !p ? -1 :1) - i[y] / 2, d[F] + g, d[T] - g - i[y]), d = is(q - i[S] / 2, d.top + g, d[R] - g - i[S]), d = new $(e, d);
pa(c[O], c[uc] + 1 + Kn), $a(c[O], c[Zc] + Kn), Aa(c[O], d.x + Kn), c[O].top = d.y + Kn;
} else {
if (c = this.e, d = this.ul, g = c.aa(), q = a.outline, i = new Bv(), e = new xt(q.j.top + .5, q.j[T] + .5, q.j[R] + .5, q.j[F] + .5), 
f = q.Sb, i[xb](e[F] + 1, e[R]), i.yb(e[F] + 1, e[R] - 1, 1, 1, 180, 270, j), i.H(e[F], e.top + 1), 
i.yb(e[F] + 1, e.top + 1, 1, 1, 270, 0, j), f != l && f[0].y == q.j.top) for (k = 0; 3 > k; ++k) i.H(f[k].x + .5, f[k].y + .5);
if (i.H(e[T] - 1, e.top), i.yb(e[T] - 1, e.top + 1, 1, 1, 0, 90, j), i.H(e[T], e[R] - 1), 
i.yb(e[T] - 1, e[R] - 1, 1, 1, 90, 180, j), f != l && f[0].y == q.j[R]) for (k = 0; 3 > k; ++k) i.H(f[k].x + .5, f[k].y + .5);
for (i[Kc](), q = [ new vv({
fill:Tq,
stroke:Zd,
Aa:1
}), new vv({
fill:Zd,
Aa:0,
Cb:.6
}), new vv({
fill:Zd,
Aa:0,
Cb:.4
}) ], e = q[L] - 1; e >= 0; --e) f = c.ja(i, q[e], g), c.Ze(f, e, e);
for (i = a.Ch, q = 0; q < i.W[L]; q++) switch (k = i.W[q], f = k.ob, e = c.aa(), 
c[v](g, e), f[I]) {
case hm:
for (f = f[C], k = k[C], k[Mc] && c.Ga(k[Mc].j[F], k[Mc].j.top, k[Mc].j[T] - k[Mc].j[F], k[Mc].j[R] - k[Mc].j.top, f[Mc].a, e), 
m = 0; m < k.gc[L]; m++) {
var p = f.gc[m], t = k.gc[m];
switch (p[I]) {
case Ap:
c.Yg(p[C][z], t.j[F], t.j.top, 1, gp, gp, p[C][O], e);
break;

case ep:
c.Ga(t.j[F], t.j.top, t.j[T] - t.j[F], t.j[R] - t.j.top, p[C].a, e);
}
}
f.id != l && (f = kw([ Tg, f.id ]), c.ig(e, f));
break;

case so:
f = f[C], k = k[C], m = new Bv(), m[xb](k.Wa.ef, k.Wa.ff), m.H(k.Wa.Qa, k.Wa.Xa), 
c.ja(m, f.a, e);
}
c[v](d, g), c = g.t();
}
this.Nb(c, b);
}, Y.de = function(a, b, c) {
return (a = this.yq(a, c)) && this.e[v](b, a), a;
}, Y.yq = function(a, b) {
var c = a.f;
if (!c || 0 == c[L]) return l;
for (var d = this.e, e = a.u, f = a.Dd != l ? a.Dd :0, g = a[Sc] ? a[Sc] :{
x:0,
y:0
}, i = a.G, k = !!i || b || n, m = d.aa(), p = 0; p < c[L]; p++) {
var q = c[p];
0 == f ? d.Yg(q[z], q.x + g.x, q.y + g.y, q[L], a.Va, a.Oa, e, m) :d.Av(q[z], q.x + g.x, q.y + g.y, q[L], f, a.Va, a.Oa, e, m);
}
if (k) {
if (k = l, 0 == f) (c = Sx(a)) && (k = d.Ga(c[F], c.top, c[T] - c[F], c[R] - c.top, wv, m)); else {
var t = ks(f), f = ys(a);
for (f.Dd = 0, p = new ru(g.x, g.y)[Ic](-t), Ua(f, {
x:p.x,
y:p.y
}), p = 0; p < c[L]; p++) g = new ru(c[p].x, c[p].y)[Ic](-t), f.f[p].x = g.x, f.f[p].y = g.y;
(c = Sx(f)) && (c = [ new ru(c[F], c.top), new ru(c[T], c.top), new ru(c[T], c[R]), new ru(c[F], c[R]) ], 
Pr(c, function(a) {
a[Ic](t);
}), c = Cv(c, n), k = d.ja(c, wv, m));
}
i && k && (c = {
background:tl,
padding:jf,
border:kf
}, e[N] != l && (Ra(c, e[N] + Kn), c.margin = e[N] + Kn), e.eb != l && sa(c, e.eb), 
d.zv(k, i, c));
}
return m.t();
}, Y.Qc = function(a, b, c) {
var d = this.Ra[b];
d != l ? this.e.replaceChild(a, c, d) :this.e[v](a, c), this.Nb(c, b);
}, Y.Nb = function(a, b, c) {
a && (this.e.ig(a, b), this.Ra[b] = a, c && this.my(c, b));
}, Y.Pp = function(a) {
var b = this.Ra[a];
b && (this.e.Ur(b), delete this.Ra[a]);
}, Y.$v = function() {
this.Ra = {}, this.Ng = {}, this.e[Vb](), this.Fh[Vb]();
}, Y.my = function(a, b) {
this.Ng[a] || (this.Ng[a] = []), 0 <= Or(this.Ng[a], b) || this.Ng[a][x](b);
}, Y.getBoundingBox = function(a) {
var b = [];
if (this.Ra[a]) {
var c = this.e[cc](this.Ra[a]);
c && b[x](c);
}
for (var a = this.Ng[a] || [], d = 0; d < a[L]; ++d) (c = this.e[cc](this.Ra[a[d]])) && b[x](c);
return sv(b);
}, Y = Wx[M], Y.zc = function(a, b) {
this.Sa[x]({
a:a,
Pm:b
});
}, Y.move = function(a, b) {
this.zc(l, {
type:Mm,
data:{
x:a,
y:b
}
});
}, Y.H = function(a, b, c) {
this.zc(a, {
type:hm,
data:{
x:b,
y:c
}
});
}, Y.Pj = function(a, b, c, d, e, f, g) {
this.zc(a, {
type:rj,
data:{
Qa:b,
Xa:c,
ic:d,
xc:e,
x:f,
y:g
}
});
}, Y.yb = function(a, b, c, d, e, f, g, i) {
this.zc(a, {
type:vh,
data:{
fn:b,
gn:c,
hn:d,
jn:e,
Gr:f,
kn:g,
Hr:i
}
});
}, Y.close = function(a) {
var b = this.Sa[0].Pm[C];
this.H(a, b.x, b.y);
}, Y.Sw = function() {
for (var a = [], b = l, c = 0; c < this.Sa[L]; c++) {
var d = this.Sa[c], e = d.Pm;
if (e[I] == Mm) b = Xx(e); else {
d = d.a;
a:{
for (var f = 0; f < a[L]; f++) {
var g = a[f];
if (zv(d, g.a)) {
d = g;
break a;
}
}
g = {
a:d,
Sa:new Bv(),
xb:l
}, a[x](g), d = g;
}
ns(d.xb, b) || d.Sa[xb](b.x, b.y), d.Sa.zc(e), b = d.xb = Xx(e);
}
}
return a;
}, Y.xg = function(a) {
var b = this.Sw();
if (0 == b[L]) a = l; else if (1 == b[L]) a = a.xg(b[0].Sa, b[0].a); else {
for (var c = a.aa(), d = 0; d < b[L]; d++) {
var e = b[d], e = a.xg(e.Sa, e.a);
a[v](c, e);
}
a = c.t();
}
return a;
}, Y.eq = function() {
for (var a = new Bv(), b = 0; b < this.Sa[L]; b++) a.zc(this.Sa[b].Pm);
return a;
}, Ar(jy, Vx);
var ky = {
Af:en,
ad:vl,
Bc:Xi
};
Y = jy[M], Y.Dq = function(a, b) {
this.Fu(a);
var c = this.e.aa(n);
this.e[v](b, c), this.Nb(c.t(), Ri), rs(this.Ca, function(a) {
a.sa || (a.sa = this.e.aa(!jr(a.Yo) || a.Yo));
}, this), this.e.Ga(a.b[F], a.b.top, a.b[y], a.b[S], a.Vf, c), rs(a.Ja, function(b) {
this.Du(a, b);
}, this), rs(a.va, function(b) {
this.Eu(a, b);
}, this), rs(a.Ja, function(b) {
this.Jp(a, b);
}, this), rs(a.va, function(b) {
this.Jp(a, b);
}, this), a.Qf == ql && this.de(a[oc], this.Ca[oc].sa), a.bh && this.de(a.bh, this.Ca.axistitle.sa), 
Pr(a.r, function(a, b) {
a.xa && this.Ri(a.xa, l, l, b);
}, this);
for (var d = [], e = 0; e < a.d[L]; e++) d[x]({
Mi:a.d[e].Mi,
index:e
});
for (e = 0; e < d[L]; e++) d[e] = {
index:e,
value:d[e]
};
var f = function(a, b) {
return fs(a.Mi, b.Mi);
} || fs;
for (es(d, function(a, b) {
return f(a[ub], b[ub]) || a[sc] - b[sc];
}), e = 0; e < d[L]; e++) d[e] = d[e][ub];
for (e = 0; e < d[L]; e++) {
var g = d[e][sc];
this.Bl(a.d[g], g);
}
for (e = 0; e < a.r[L]; e++) a.r[e].G && (d = kw([ Xp, e ]), this.Le(a.r[e].G, d));
var d = new zt(a.b[F], a.b.top, a.b[y], a.b[S]), i = this.e.aa(n), d = this.e.Ip(i, d);
return this.e[v](c, d), Pr(lw, function(a) {
var d = this.Ca[a].sa;
if (d) {
var e;
switch (this.Ca[a][pc]) {
case Xi:
e = i;
break;

case vl:
e = c;
break;

case en:
e = b;
}
this.e[v](e, d);
}
}, this), j;
}, Y.Fu = function(a) {
var b = this.Ca = {};
b.action = {
position:ky.Af
}, b.annotation = {
position:ky.Bc
}, b.annotationtext = {
position:ky.ad
}, b.area = {
position:ky.Bc
}, b.bar = {
position:ky.Bc
}, b.baseline = {
position:ky.Bc
}, b.bubble = {
position:ky.Bc
}, b.categorysensitivityarea = {
position:ky.Bc
}, b.candlestick = {
position:ky.Bc
}, b.gridline = {
position:ky.Bc
}, b.interval = {
position:ky.Bc
}, b.line = {
position:ky.Bc
}, b.minorgridline = {
position:ky.Bc
}, b.pathinterval = {
position:ky.Bc
}, b.point = {
position:ky.ad,
Yo:n
}, b.pointsensitivityarea = {
position:ky.ad
}, b.steppedareabar = {
position:ky.Bc
}, b.tooltip = {
position:ky.Af
}, La(b, {
position:a.Qf == ql ? ky.ad :ky.Af
}), b.axistick = {
position:ky.ad
}, b.axistitle = {
position:a.Xg == ql ? ky.ad :ky.Af
};
var c = a.o && a.o[pc] == ql, d = c ? this.Gd :l, c = c ? ky.ad :ky.Af;
b.legend = {
sa:d,
position:c
}, b.legendscrollbutton = {
sa:d,
position:c
}, b.legendentry = {
sa:d,
position:c
}, a = a.Wc && a.Wc[pc] == ql, b.colorbar = {
sa:a ? this.cf :l,
position:a ? ky.ad :ky.Af
};
}, Y.Bl = function(a, b) {
a[I] == ni ? this.zz(a, b) :a[I] == Jh ? this.As(a, b) :a[I] == jp ? this.As(a, b) :a[I] == ui ? this.Az(a, b) :a[I] == wh ? this.yz(a, b, this.Pe.vd) :this.Wp(a, b, this.Pe.ae), 
a.Ha && a.Ha.fe && this.Bz(a, b);
}, Y.Bz = function(a, b) {
for (var e, c = a.Ha.fe, d = 0; e = c[d]; ++d) if (0 != e.Wa[L]) {
var f = new Bv();
f.zm(e.Wa, e.ro), e[R] && f.zm(e[R], e.Yu);
var g = this.e.aa();
this.e.ja(f, e.a, g), e = g.t(), f = kw([ mn, b, d ]), this.Qc(this.Ca.pathinterval.sa, f, e);
}
}, Y.Eq = function(a, b, c, d) {
a[I] == Jh || a[I] == jp ? this.Mr(a, b, c, d) :a[I] == ui ? this.Nr(a, b, c, d) :a[I] == ni ? this.tq(a, b, c, d) :this.Or(a, b, c, d);
}, Y.zz = function(a, b) {
var c = this.Ca.bubble.sa, d = vw(a.c[L], function(a) {
return a;
});
a.au && es(d, function(b, c) {
var d = a.c[b], e = a.c[c];
return (e ? e.h.Pb :0) - (d ? d.h.Pb :0);
});
for (var e = 0; e < d[L]; e++) {
var f = d[e], g = a.c[f];
g && (this.tq(a, b, g, f), g = this.e.Yg(g[z], g.h.x, g.h.y, g.du, Ci, Ci, g.u, c), 
f = kw([ ji, b, f ]), this.e.ig(g, f));
}
}, Y.As = function(a, b) {
for (var c = 0; c < a.c[L]; c++) this.Mr(a, b, a.c[c], c);
}, Y.Mr = function(a, b, c, d) {
if (c && c.h) {
var e = Yx(c, a), f = a[I] == Jh ? Gh :kp, g = kw([ f, b, d ]), i = c.h.$g || c.h, e = this.e.df(i[F], i.top, i[y], i[S], e), i = l, k = c.h.outline, m = c.Pc, p = c.Eb;
if (k || m || p) {
if (i = this.e.aa(), this.e[v](i, e), k) {
var q = c.Pa || a.Pa, k = Cv(k, j);
this.e.ja(k, q, i);
}
if (m) for (q = 0; q < m.Ma[L]; q++) k = m.Ma[q][Fc], this.e.Ga(k[F], k.top, k[y], k[S], m.Ma[q].a, i);
p && this.e.Ga(p[Fc][F], p[Fc].top, p[Fc][y], p[Fc][S], p.a, i);
}
e = i ? i.t() :e, this.Qc(this.Ca[f].sa, g, e), c.G && (f = kw([ Xp, b, d ]), this.Le(c.G, f)), 
c.h.xd && this.Lp(a, b, d, c.h.xd);
}
}, Y.yz = function(a, b, c) {
if (0 != a.c[L]) {
for (var d = [], e = l, f = 0, g = 0; g < a.c[L]; g++) {
var i = l;
if (g + 1 < a.c[L]) var k = a, i = a.c[g + 1].$t || k.po;
e != l && !zv(i, e) && (k = Vr(d, function(a) {
return zv(e, a.a);
}), k || (k = {
a:e,
Sa:new Bv()
}, d[x](k)), this.qv(k.Sa, a, c, f, g), f = g), e = i;
}
for (f = this.e.aa(), g = 0; g < d[L]; g++) k = d[g], this.e.ja(k.Sa, k.a, f);
if (g = kw([ wh, b ]), this.Qc(this.Ca.area.sa, g, f.t()), c) {
if (g = ey(a), c = kw([ hm, b ]), d = g.xg(this.e)) {
if (f = l, k = a.Pc, i = a.Eb, k || i) {
if (f = this.e.aa(), k) for (g = 0; g < k.Ma[L]; g++) this.e.ja(k.Ma[g][Sb], k.Ma[g].a, f);
i && this.e.ja(i[Sb], i.a, f), this.e[v](f, d);
}
g = f ? f.t() :d, this.Qc(this.Ca.line.sa, c, g);
}
this.dm(a, b);
} else this.Wp(a, b, n);
}
}, Y.qv = function(a, b, c, d, e) {
var f = j, g = l;
a[xb](b.c[d].h.lm, b.c[d].h.mm);
for (var i = d; e >= i; i++) {
var k = b.c[i].h;
a.H(k.Aj, k.Bj), (k.yj != k.Aj || k.zj != k.Bj) && a.H(k.yj, k.zj), k.x != l && k.y != l && (f = n, 
g = i);
}
if (!f) if (c) for (i = e; i >= d; i--) k = b.c[i].h, a.H(k.nm, k.om), (k.lm != k.nm || k.mm != k.om) && a.H(k.lm, k.mm); else k = b.c[g].h, 
a.H(k.nm, k.om), a[Kc]();
}, Y.Wp = function(a, b, c) {
var d = kw([ hm, b ]);
if (0 >= a[qd]) this.Pp(d), this.dm(a, b); else if (c = dy(a, c), 0 != c.Sa[L]) {
if (c = c.xg(this.e)) {
var e = l, f = a.Pc, g = a.Eb;
if (f || g) {
if (e = this.e.aa(), f) for (var i = 0; i < f.Ma[L]; i++) this.e.ja(f.Ma[i][Sb], f.Ma[i].a, e);
g && this.e.ja(g[Sb], g.a, e), this.e[v](e, c);
}
c = e ? e.t() :c, this.Qc(this.Ca.line.sa, d, c);
}
this.dm(a, b);
}
}, Y.dm = function(a, b) {
for (var c = 0; c < a.c[L]; c++) this.Or(a, b, a.c[c], c);
}, Y.sv = function(a, b) {
var c = this.Pe.b;
if (a.x - b >= c[T] || a.x + b <= c[F] || a.y - b >= c[R] || a.y + b <= c.top) return n;
if ((a.x >= c[T] || a.x <= c[F]) && (a.y >= c[R] || a.y <= c.top)) {
var d = b * b, e = a.x - c[T], f = a.x - c[F], g = a.y - c[R], c = a.y - c.top, e = e * e, f = f * f, g = g * g, c = c * c;
if (e + g >= d && e + c >= d && f + c >= d && f + g >= d) return n;
}
return j;
}, Y.Or = function(a, b, c, d) {
this.Ms(a, b, c, d, this.Ca.point.sa, this.Ca.pointsensitivityarea.sa);
}, Y.tq = function(a, b, c, d) {
this.Ms(a, b, c, d, this.Ca.bubble.sa, l);
}, Y.Ms = function(a, b, c, d, e) {
if (c && c.h && !c.Zb && this.sv(c.h, by(c, a))) {
var f = kw([ a[I] == ni ? ji :Bn, b, d ]);
if ($x(c, a)) {
var g = this.e.pj(c.h.x, c.h.y, ay(c, a), Yx(c, a)), i = l, k = c.Eb, m = c.Pc;
if ((k || m) && (i = this.e.aa(), k && this.e.Tl(k.x, k.y, k.Pb, k.a, i), this.e[v](i, g), 
m)) for (k = 0; k < m.Ma[L]; k++) this.e.Tl(m.x, m.y, m.Ma[k].Pb, m.Ma[k].a, i);
g = i ? i.t() :g, this.Qc(e, f, g);
} else this.Pp(f);
c.G && (e = kw([ Xp, b, d ]), this.Le(c.G, e)), c.xa && this.Ri(c.xa, a, b, d), 
c.h.xd && this.Lp(a, b, d, c.h.xd);
}
}, Y.Az = function(a, b) {
for (var c = 0; c < a.c[L]; c++) this.Nr(a, b, a.c[c], c);
}, Y.Nr = function(a, b, c, d) {
if (c && c.h) {
var e = this.e.df(c.h.Wa[F], c.h.Wa.top, c.h.Wa[y], c.h.Wa[S], c.Pa), f = this.e.df(c.h[Fc][F], c.h[Fc].top, c.h[Fc][y], c.h[Fc][S], c.no), a = this.e.aa();
if (this.e[v](a, e), this.e[v](a, f), e = c.Pc) for (f = 0; f < e.Ma[L]; f++) {
var g = e.Ma[f][Fc];
this.e.Ga(g[F], g.top, g[y], g[S], e.Ma[f].a, a);
}
(e = c.Eb) && this.e.Ga(e[Fc][F], e[Fc].top, e[Fc][y], e[Fc][S], e.a, a), e = kw([ qi, b, d ]), 
this.Qc(this.Ca.candlestick.sa, e, a.t()), c.G && (b = kw([ Xp, b, d ]), this.Le(c.G, b));
}
}, Y.Ri = function(a, b, c, d) {
if (a) {
var e = a.Zo, b = this.Pe.b;
if (!(e.x < b[F] || e.x > b[T]) && (b = a[rc]) && 0 != b[L]) {
var f = [ gh, d ];
c != l && bs(f, 1, 0, c), f = kw(f), e = this.Xv(e[Wb], e.x, e.y, e[L], e[zb]), 
this.Qc(this.Ca.annotation.sa, f, e), e = this.e.aa(), f = [ uh, d ], c != l && bs(f, 1, 0, c);
var g = l;
for (a.hd && !a.hd.Nk && (b = [ a.hd.label ], g = -1), a = 0; a < b[L]; a++) {
var i = b[a], k = this.yq(i, j);
if (k) {
if (i.Gh) {
var m = kw([ Xp, c, d, a ]);
this.Le(i.Gh, m);
}
this.e[v](e, k), i = $r(f), i[x](g || a), i = kw(i), this.Nb(k, i);
}
}
c = kw(f), this.Qc(this.Ca.annotationtext.sa, c, e.t());
}
}
}, Y.Xv = function(a, b, c, d, e) {
return a = a == il ? [ d, 1 ] :[ 1, d ], this.e.df(s.min(b, b + a[0]), s.min(c, c + a[1]), s.abs(a[0]), s.abs(a[1]), new vv({
fill:e
}));
}, Y.Lp = function(a, b, c, d) {
if (a.Ha == l) return l;
for (var e = this.e.aa(), a = a.Ha.mh, f = 0; f < d[L]; f++) {
var g = d[f][Fc], i = a[d[f].hh];
if (i[O] != wh && i[O] != hm) {
var k = i.a;
0 == g[y] && 0 == g[S] ? (i = i.bu / 2, i > 0 && (g = this.e.pj(g[F], g.top, i, k), 
this.e[v](e, g))) :0 == g[y] || 0 == g[S] ? (i = new Bv(), i[xb](g[F], g.top), i.H(g[F] + g[y], g.top + g[S]), 
this.e.ja(i, k, e)) :this.e[v](e, this.e.df(g[F], g.top, g[y], g[S], k));
}
}
return e.Sh() ? (b = kw([ yl, b, c ]), e = e.t(), this.Qc(this.Ca.interval.sa, b, e), 
e) :l;
}, Y.Du = function(a, b) {
var c = Z(function(c, e) {
var f = s[D](c.l), g = c[L] != l ? c[L] :a.b[S], i = b.mj.l, i = s.min(i, i + b.mj[bb] * g);
return this.e.Ga(f, i, 1, g, c.a, e);
}, this);
this.qq(b, c);
}, Y.Eu = function(a, b) {
var c = Z(function(c, e) {
var f = s[D](c.l), g = c[L] != l ? c[L] :a.b[y], i = b.mj.l, i = s.min(i, i + b.mj[bb] * g);
return this.e.Ga(i, f, g, 1, c.a, e);
}, this);
this.qq(b, c);
}, Y.qq = function(a, b) {
if (a.Q) {
var c = this.Ca.gridline.sa, d = kw([ a[$b], Kk ]);
Pr(a.Q, function(e, f) {
var k = kw([ a[$b], Kk, f ]);
this.bs(e, b, c, k, d);
}, this);
}
var e = this.Ca.baseline.sa, f = kw([ a[$b], Kh ]);
this.bs(a.ga, b, e, f);
}, Y.bs = function(a, b, c, d, e) {
a && a.v && !a.a.dq() && (a = b(a, c), this.Nb(a, d, e));
}, Y.Jp = function(a, b) {
var c = this.Ca, d = this.de(b[oc], c.axistitle.sa), e = kw([ b[$b], Pp ]);
if (this.Nb(d, e), b[z]) {
var f = c.axistick.sa, g = kw([ b[$b], Gl ]);
Pr(b[z], function(a, c) {
if (a.v) {
var d = this.de(a.m, f), e = kw([ b[$b], Gl, c ]);
this.Nb(d, e, g);
}
}, this);
}
}, Y.er = function(a, b) {
this.an(a, this.ve), this.$m(a, b);
}, Y.an = function(a, b) {
for (var c in b.d) {
var d = a.d[c];
if (Fw(b.d[c], vs({
c:l
}))) {
var f, e = b.d[c].c;
for (f in e) {
var g = e[f];
if (g.G) {
var i = kw([ Xp, ja(c), ja(f) ]);
this.Cg(i);
}
if (g = g.xa) for (var k in g[rc]) g[rc][k].Gh && (i = kw([ Xp, ja(c), ja(f), ja(k) ]), 
this.Cg(i));
this.Eq(d, ja(c), d.c[f], ja(f));
}
} else {
for (f in b.d[c].c) b.d[c].c[f].G && (i = kw([ Xp, ja(c), ja(f) ]), this.Cg(i));
this.Bl(d, ja(c));
}
}
for (var m in b.r) if (c = b.r[m], c.G && (i = kw([ Xp, ja(m) ]), this.Cg(i)), g = c.xa) {
for (k in g[rc]) g[rc][k].Gh && (i = kw([ Xp, l, ja(m), ja(k) ]), this.Cg(i));
this.Ri(a.r[m].xa, l, l, ja(m));
}
}, Y.$m = function(a, b) {
for (var c in b.d) {
var d = a.d[c];
if (Fw(b.d[c], vs({
c:l
}))) for (var e in b.d[c].c) {
var f = new jw(2);
f.vb(0, d.c[e]), f.vb(1, b.d[c].c[e]), f = f[nd](), this.Eq(d, ja(c), f, ja(e));
} else f = new jw(2), f.vb(0, d), f.vb(1, b.d[c]), this.Bl(f[nd](), ja(c));
}
for (var g in b.r) b.r[g].G && (c = kw([ Xp, ja(g) ]), this.Le(b.r[g].G, c)), b.r[g].xa && (c = new jw(2), 
c.vb(0, a.r[g].xa), c.vb(1, b.r[g].xa), c = c[nd](), this.Ri(c, l, l, ja(g)));
}, Y = ly[M], Y.jy = function() {
var a = this.e.Um;
this.as(Z(function(b, c) {
this.e.vn(a, b, c);
}, this));
}, Y.iy = function() {
var a = this.Fh[id]();
this.as(Z(function(b, c) {
this.Fh.vn(a, b, c);
}, this));
}, Y.as = function(a) {
a(Km, Z(this.yt, this)), a(Jm, Z(this.jB, this)), a(Im, Z(this.yt, this)), a(Ui, Z(this.iB, this)), 
a(qj, Z(this.kB, this));
}, Y.yt = function(a) {
var b = this.e.ck(a), c = this.bi(a);
a[I] == Im && this[Ab](Ni, {
Wb:b,
$h:c
}), c != this.Bf && (this.Bf != l && this.Fr(this.Bf), this.Wx(c, b), this.Bf = c);
}, Y.jB = function(a) {
a = this.bi(a), a == this.Bf && (this.Fr(a), this.Bf = l);
}, Y.Fr = function(a) {
this[Ab](Mi, l), this.hk(hg, a);
}, Y.Wx = function(a, b) {
this[Ab](Li, {
Wb:b
}), this.hk(gg, a);
}, Y.iB = function(a) {
var b = this.e.ck(a), a = this.bi(a);
this[Ab](Ki, {
Wb:b,
$h:a
}), this.hk(Wf, a);
}, Y.kB = function(a) {
var b = this.e.ck(a), c = this.bi(a);
this[Ab](Pi, {
Wb:b,
$h:c
}), this.hk(xg, c), a[vb]();
}, Y.hk = function(a, b) {
var c = b[zc](Id);
switch (c[0]) {
case Xp:
var d = l, e = l, f = l;
this.Fg == rn ? d = ja(c[1]) :4 == c[L] ? (d = c[1] ? ja(c[1]) :l, e = ja(c[2]), 
f = ja(c[3])) :3 == c[L] ? (d = ja(c[1]), e = ja(c[2])) :e = ja(c[1]), c = {
ba:d,
Kb:e,
of:f
}, this[Ab](Xp + a, c);
break;

case Tg:
c = {
Ph:c[1]
}, this[Ab](Xg + a, c);
break;

case dm:
if (c = ja(c[1]), 0 > c) break;
c = {
Mj:c
}, this[Ab](Vl + a, c);
break;

case em:
c = {
Tw:ja(c[1])
}, this[Ab]($l + a, c);
break;

case Xn:
c = ja(c[1]), c = {
Mj:c
}, this[Ab](Sn + a, c);
break;

default:
this.ys(a, b);
}
}, Y.dispatchEvent = function(a, b) {
this.oe[Ab]({
type:a,
data:b
});
}, Ar(my, ly), Y = my[M], Y.Ny = function() {
var a = this.p;
if (a.J != W && a.J != no) return {};
for (var b = {}, a = a.d, c = 0; c < a[L]; c++) {
var d = a[c];
if (Zx(d)) for (var e = d.c, f = 0; f < e[L]; f++) {
var g = e[f];
if (g && g.h && !g.Zb) {
var i = kw([ Bn, c, f ]);
b[i] = {
$b:g.h,
Pb:g.h && g.h.tj != l ? g.h.tj :g.tj != l ? g.tj :d.Vt,
ba:c,
Kb:f
};
}
}
}
return b;
}, Y.bi = function(a) {
var b = this.e.pn(a[Pc]), c = this.e.ck(a), c = this.uy(c);
if (a[I] == Jm) {
if (a = this.Bf, a == l) return b;
c = c == a ? l :a;
}
if (c != l) var a = this.Tr(b), d = this.Tr(c), b = a > d ? b :c;
return this.wy(b) ? b :Ei;
}, Y.uy = function(a) {
if (!new zt(this.p.b[F] + 1, this.p.b.top + 1, this.p.b[y] - 2, this.p.b[S] - 2)[fd](a)) return l;
switch (this.p.Gb) {
case Bj:
return this.ox(a);

case vi:
return this.nx(a);

case xo:
return l;
}
}, Y.nx = function(a) {
for (var b = this.p.r, c = 0; c < b[L]; c++) {
var d = b[c].iw;
if (d && d[fd](a)) return kw([ Ai, c ]);
}
return l;
}, Y.ox = function(a) {
var e, b = a.x, a = a.y, c = l, d = r;
for (e in this.zr) {
var f = this.zr[e], g = f.$b.x, i = f.$b.y, k = f.Pb;
k >= g - b && g - b >= -k && k >= i - a && i - a >= -k && (g = (g - b) * (g - b) + (i - a) * (i - a), 
k * k >= g && d >= g && (c = kw([ En, f.ba, f.Kb ]), d = g));
}
return c;
}, Y.wy = function(a) {
return this.p.Gb == vi ? (a = a[zc](Id)[0], a != Gh && a != ji && a != qi && a != Bn && a != En && a != kp) :j;
}, Y.Tr = function(a) {
return Or(lw, a[zc](Id)[0]);
}, Y.ys = function(a, b) {
var c = b[zc](Id);
switch (c[0]) {
case Gh:
case ji:
case qi:
case Bn:
case En:
case kp:
var d = ja(c[1]), c = {
ba:d,
Kb:ja(c[2])
};
this[Ab](Bj + a, c);
break;

case Ai:
c = ja(c[1]), c = {
ba:l,
Kb:c
}, this[Ab](vi + a, c);
break;

case uh:
this.Uz(a, c);
break;

case hm:
case wh:
d = ja(c[1]), c = {
ba:d,
Kb:l
}, this[Ab](to + a, c);
}
}, Y.Uz = function(a, b) {
var c = ja(Mr(b));
this[Ab](gh + a, 3 == b[L] ? {
ba:l,
Kb:ja(b[1]),
of:c
} :{
ba:ja(b[1]),
Kb:ja(b[2]),
of:c
});
};
var ty = [ "#EFE6DC", "#109618" ], uy = [ "#DC3912", "#EFE6DC", "#109618" ];
sy[M].Pw = function(a) {
if (!this.yc) return this.Ae[0];
if (a >= this.yc[this.yc[L] - 1]) return this.Ae[this.Ae[L] - 1];
if (a <= this.yc[0]) return this.Ae[0];
var b = ds(this.yc, fs, n, a);
if (b >= 0) return this.Ae[b];
var c = -b - 2, b = -b - 1;
return pv(this.Ae[b], this.Ae[c], (a - this.yc[c]) / (this.yc[b] - this.yc[c]));
}, Dy[M].yr = function() {
return ys(this.Gs);
}, Dy[M].Nw = function(a, b) {
a.Ch = a.Ch || {};
var c = a.Ch;
return c.W = c.W || {}, c = c.W, c[b] = c[b] || {}, c = c[b], c.ob = c.ob || {}, 
c.ob;
}, Dy[M].Cf = function(a, b, c) {
if (!a.zh) {
var d = b.z.Ph;
d != l && (a = Wr(a.Ch.W, function(a) {
return a.ob[C].id == d;
}), c = this.Nw(c, a), ta(c, c[C] || {}), c[C].background = c[C][Mc] || {}, c[C][Mc].a = xv(Td));
}
}, Ey[M].hw = function(a, b, c, d, e) {
return a = {
W:[ zy(a.d[c].c[d].xa[rc][e].qa[nb], this.w) ]
}, b && this.Oh(a), a;
}, Ey[M].Ax = function(a, b, c, d) {
return a = {
W:[ zy(a.r[c].xa[rc][d].qa[nb], this.w) ]
}, b && this.Oh(a), a;
}, Ey[M].lr = function() {
return this.Vd != l && 0 < this.Vd.yr()[L];
}, Ar(Fy, Ey), Y = Fy[M], Y.Sq = function(a, b, c, d) {
if (c = a.d[c], d = c.c[d].qa, a = {
W:[]
}, d.f) for (d[oc] && this.tm(a, d[oc]), c = 0; c < d.f[L]; c++) {
var e = d.f[c];
this.Zv(a, e[oc], e[ub]);
} else d.$l ? (this.tm(a, d.$l), this.lf(a, d.ne, d[nb], j, this.wg, c)) :d.ne ? this.lf(a, d.ne, d[nb], j, this.wg, c, j) :this.lf(a, l, d[nb], n, this.wg, c);
return b && this.Oh(a), a;
}, Y.qr = function(a, b, c) {
var a = a.d[c], c = a.qa, d = {
W:[]
};
return c.ne ? this.lf(d, c.ne, c[nb], j, this.wg, a, j) :this.lf(d, l, c[nb], n, this.wg, a), 
b && this.Oh(d), d;
}, Y.Er = function(a, b, c) {
var d = a.r[c].qa, e = {
W:[]
};
if (d && d[nb]) this.lf(e, l, d[nb], n, n); else {
var f = 0, g = 1, i = a.d[L];
cy(a) && (f = a.d[L] - 1, i = g = -1);
for (var k = l; f != i; f += g) {
var m = a.d[f];
k != m.Hc && (k = m.Hc, d = a.r[c].Wk[k], /^[\s\xa0]*$/[eb](d == l ? U :na(d)) || this.tm(e, d)), 
m.c[c] && m.c[c].qa && m.c[c].qa[nb] && (d = m.c[c].qa, this.lf(e, d.ne, d[nb], j, this.wg, m));
}
}
return b && this.Oh(e), e;
}, Y.tm = function(a, b) {
var c = zy(b, this.bk);
a.W[x](c);
}, Y.lf = function(a, b, c, d, e, f, g) {
for (g = g != l ? g :n, d = d ? this.bk :this.w, c = c[zc](td), f = e ? f[zb][zb] :l, 
b = g && b != l ? zy(b, this.w, l, l, f) :zy(c[0], d, b, this.w, f), a.W[x](b), 
g = g ? 0 :1; g < c[L]; g++) f = e ? X :l, b = zy(c[g], d, l, l, f), a.W[x](b);
}, Y.Zv = function(a, b, c) {
b && (b = zy(c, this.bk, b, this.w), a.W[x](b));
}, Y.Oh = function(a) {
this.lr() && (a.W[x]({
type:so,
data:{
a:yv(fe, 1)
}
}), as(a.W, this.Vd.yr()));
}, Ar(Gy, Ey), Gy[M].Sq = function(a, b, c, d) {
return b = a.d[c], a = b.c[d].qa, d = [], b.Fi || (b = zy(b[oc], this.Mq), d[x](b)), 
b = zy(a[nb], this.Mq), d[x](b), a = zy(a.$l, this.Oj), d[x](a), {
W:d
};
}, Gy[M].qr = function() {
return {
W:[]
};
}, Gy[M].Er = function() {
return {
W:[]
};
}, Y = Ny[M], Y.pk = function(a) {
if (a.J == rn) {
var b = a.ia.$b;
return new $(b.x, b.y);
}
return b = ts(a.Ja), b = b.ga != l ? b.ga.l :s.min(b.ac, b.xb), a = ts(a.va), a = a.ga != l ? a.ga.l :s.max(a.ac, a.xb), 
new $(b, a);
}, Y.Zt = function(a) {
this.kf = a;
}, Y.um = function(a, b, c) {
var d = b.h, b = by(b, c), a = this.pk(a), b = 1 + s[lb](b / s[Pb](2));
return new $(d.x + (d.x >= a.x ? b :-b), d.y + (d.y <= a.y ? -b :b));
}, Y.Hw = function(a, b, c) {
var d = b.h, b = this.um(a, b, c);
return (b.x < a.b[F] || b.x > a.b[T]) && (b.x += 2 * (d.x - b.x)), (b.y < a.b.top || b.y > a.b[R]) && (b.y += 2 * (d.y - b.y)), 
b;
}, Y.Gw = function(a, b) {
var c = b.h.$g || b.h, d = this.pk(a), c = new $(c[F] + (c[F] < d.x ? 0 :c[y]), c.top + (c.top < d.y ? 0 :c[S]));
return this.ms(a, c), c;
}, Y.Iw = function(a, b) {
var c = b.h[Fc], d = this.pk(a), c = new $(c[F] + c[y] > d.x ? c[F] + c[y] :c[F], c.top < d.y ? c.top :c.top + c[S]);
return this.ms(a, c), c;
}, Y.hx = function(a, b) {
var c = su(a.ia.$b, Ky(((b.zd ? 45 :(b.fa + b.ca) / 2) / 180 - .5) * s.PI, a.ia.ra, a.ia.wa)), c = new $(c.x + b[Zb].x, c.y + b[Zb].y);
return this.Mx(a, c), c;
}, Y.Bq = function(a, b) {
var c = b.f[0], d = b.u[N];
return 270 == b.Dd ? new $(c.x + d, c.y - c[L] / 2) :new $(c.x + c[L] / 2, c.y - d);
}, Y.pw = function(a, b, c) {
var b = a.d[b], d = b[I];
switch (a.J) {
case W:
switch (d) {
case Jh:
case jp:
return this.Gw(a, b.c[c]);

case hm:
case wh:
return this.um(a, b.c[c], b);

case ui:
return this.Iw(a, b.c[c]);
}

case no:
return this.um(a, b.c[c], b);

case ji:
return this.Hw(a, b.c[c], b);
}
}, Y.ms = function(a, b) {
var c = a.b;
b.x = is(b.x, c[F], c[T]), b.y = is(b.y, c.top, c[R]);
}, Y.Mx = function(a, b) {
b.x = is(b.x, 0, a[y]), b.y = is(b.y, 0, a[S]);
}, Y.Ux = function(a, b) {
var c = this.yg.w[N];
return new $(b.x - 4 * ts(a.Ja).Tc * c, b.y - ts(a.va).Tc * c);
}, Y.uw = function(a, b) {
var c = b[F], d = b[y], e = c + d, f = b.top, g = b[S], i = f + g, k = this.pk(a);
return a[Wb] == il ? i > k.y ? new $(c + d / 2, i - .1) :new $(c + d / 2, f + .1) :c < k.x ? new $(c + .1, f + g / 2) :new $(e - .1, f + g / 2);
}, Y.ix = function(a, b) {
var c = su(a.ia.$b, Ky(((b.zd ? 45 :(b.fa + b.ca) / 2) / 180 - .5) * s.PI, a.ia.ra - .1, a.ia.wa - .1));
return new $(c.x + b[Zb].x, c.y + b[Zb].y);
}, Y.Cq = function(a, b) {
var c = b.f[0], d = b.u[N];
return 270 == b.Dd ? new $(c.x + d / 2, c.y) :new $(c.x, c.y - d / 2);
}, Y.qw = function(a, b, c) {
var d = a.d[b], b = d[I], c = d.c[c].h;
return b == Jh || b == jp || b == ui ? this.uw(a, c.$g || c[Fc] || c) :new $(c.x, c.y);
}, Y.mk = function(a, b, c, d, e, f) {
return c !== l && d !== l && e !== l ? this.aB(a, b, c, d, e) :c !== l && d !== l ? this.bB(a, b, c, d) :c !== l && d === l ? this.dB(a, b, c) :c === l && d !== l && e !== l ? this.ZA(a, b, d, e) :c === l && d !== l ? this.$A(a, b, d, f) :void 0;
}, Y.bB = function(a, b, c, d) {
var e = this.pw(a, c, d), f = this.qw(a, c, d), g = a.d[c].c[d].qa;
return g.af && g.Id ? this.Th(g[nb], f) :(b = this.yg.Sq(a, b, c, d), Ay(b, a.wb, j, e, this.kf, f, aa, a.cg));
}, Y.dB = function(a, b, c) {
var d = a.d[c], e = this.hx(a, d), d = this.ix(a, d), f = a.d[c].qa;
return f.af && f.Id ? this.Th(f[nb], d) :(b = this.yg.qr(a, b, c), Ay(b, a.wb, j, e, this.kf, d, aa, a.cg));
}, Y.aB = function(a, b, c, d, e) {
var f = a.d[c].c[d].xa[rc][e], g = f.qa;
if (!g) return l;
var i = this.Bq(a, f), f = this.Cq(a, f);
return g.af && g.Id ? this.Th(g[nb], f) :(b = this.yg.hw(a, b, c, d, e), Ay(b, a.wb, n, i, this.kf, f, aa, a.cg));
}, Y.$A = function(a, b, c, d) {
var e = this.Ux(a, d), f = a.r[c].qa;
return f && f.af && f.Id ? this.Th(f[nb], d) :(b = this.yg.Er(a, b, c), Ay(b, a.wb, n, e, this.kf, d, aa, a.cg));
}, Y.Th = function(a, b) {
return {
zh:{
content:a,
Ud:{
className:zk
}
},
ap:j,
bp:b,
anchor:b,
$o:this.kf,
cp:20,
margin:5
};
}, Y.ZA = function(a, b, c, d) {
var e = a.r[c].xa[rc][d], f = e.qa;
if (!f) return l;
var g = this.Bq(a, e), e = this.Cq(a, e);
return f.af && f.Id ? this.Th(f[nb], e) :(b = this.yg.Ax(a, b, c, d), Ay(b, a.wb, n, g, this.kf, e, aa, a.cg));
}, Oy[M].Xq = function(a, b) {
var c = {};
return b.o.vg != l && this.xz(a, b, c), this.Cf(a, b, c), c;
}, Oy[M].CA = function(a, b, c, d) {
return c == Mj ? new Gy(a, b, d) :new Fy(a, b, d, this.Vd);
}, Oy[M].xz = function(a, b, c) {
c.o = c.o || {};
var d = a.o, e = b.o.vg;
c.o.Vc = d.ta[e];
var b = e + 1 + Ue + d.ta[L], f = d.Lh.gm, g = e > 0, d = d.Lh.em, a = e < a.o.ta[L] - 1;
c.o.Lh = {
gm:{
a:g ? f.Fd.Nd :f.Fd.Cj,
Nd:g
},
em:{
a:a ? d.Fd.Nd :d.Fd.Cj,
Nd:a
},
fm:{
text:b,
f:{
"0":{
text:b
}
}
}
};
}, Sa(Py[M], function() {
var a = new Py();
return a.selected = this[rb][Oc](), a.z = Kv(this.z), a.qb = Kv(this.qb), a.o = Kv(this.o), 
a.kc = Kv(this.kc), Na(a, Kv(this[qc])), a;
}), Py[M].Yd = function(a, b) {
var c = jr(b) ? b :n;
return this[rb].Yd(a[rb]) && Jv(this.z, a.z) && Jv(this.qb, a.qb) && Jv(this.o, a.o) && Jv(this.kc, a.kc) && (c || Jv(this[qc], a[qc]));
}, Ar(Ry, Oy), Y = Ry[M], Y.Cf = function(a, b, c) {
switch (this.Si = j, a.Rf) {
case Gj:
this.eo(a, b, c);
break;

case Mj:
this.IA(a, b, c);
}
}, Y.Zq = function(a, b) {
return a.Yd(b, this.Si);
}, Y.Td = function(a) {
return this.Ws[a];
}, Y.gl = function(a) {
return a != l ? this.Td(a) :this.Qz;
}, Y.ag = function(a, b, c) {
return a.d = a.d || {}, a = a.d, a[b] = a[b] || {}, b = a[b], b.c = b.c || {}, b = b.c, 
b[c] = b[c] || {}, b[c];
}, Y.Wi = function(a, b, c) {
return b != l ? (a = this.ag(a, b, c), a.xa = a.xa || {}, a.xa) :(a = this.es(a, c), 
a.xa = a.xa || {}, a.xa);
}, Y.Pi = function(a, b) {
a.d = a.d || {};
var c = a.d;
return c[b] = c[b] || {}, c[b];
}, Y.es = function(a, b) {
a.r = a.r || {};
var c = a.r;
return c[b] = c[b] || {}, c[b];
}, Y.bj = function(a, b) {
a.o = a.o || {};
var c = a.o;
return c.Vc = c.Vc || {}, c = c.Vc, c[b] = c[b] || {}, c[b];
}, Y.eo = function(a, b, c) {
for (var d = this.je.Zk, e = d == qo || d == ci, d = d == dk || d == ci && 0 == b[rb][vc]()[L], f = b[rb].jj(), g = 0; g < f[L]; ++g) {
var i = f[g], k = i.column, i = i.row, m = a.Sf[k], k = m.ba, i = a.Me[i];
switch (m.Sk) {
case xj:
if (!this.Td(k)) break;
this.fj(a, k, i, c), e && this.sh(a, k, i, c, b.kc);
break;

case gh:
if (!this.gl(k)) break;
m = m.Ok, this.Nv(a, k, i, m, c), e && this.fl(a, k, i, m, c);
}
}
for (f = b[rb].uq(), g = 0; g < f[L]; ++g) k = f[g], m = a.Sf[k], k = m.ba, k != l && this.Td(k) && this.Qv(a, k, c);
for (f = b[rb].xm(), g = 0; g < f[L]; ++g) i = f[g], i = a.Me[i], a.J == ji ? (k = 0, 
this.Td(k) && (this.fj(a, k, i, c), e && this.sh(a, k, i, c, b.kc))) :(this.Pv(a, i, c), 
e && this.vq(a, b[qc].Vp, i, c, b.kc));
e = b.z.Qb, g = b.z.Bd, g != l ? this.Td(e) && (this.vl(a, e, g, c), d && this.sh(a, e, g, c), 
this.Ov(a, e, g, c)) :e != l && this.Td(e) && this.xq(a, e, c), e = b.o.z.ob, e != l && this.Td(e) && this.xq(a, e, c), 
e = b.z.nd, e != l && (this.Lv(a, e, c), d && (this.vq(a, b[qc][pc], e, c), this.Si = n)), 
(e = b.qb.Ni) && (e = this.Wi(c, e.ba, e.Uk), e.hd = e.hd || {}, e.hd.Nk = j), (e = b.qb.z) && d && (d = a.Sf[e.he], 
b = d.ba, e = a.Me[e.ie], d = d.Ok, this.gl(b) && this.fl(a, b, e, d, c));
};
var Sy = [ .25, .1, .05 ], Ty = [ .3, .1, .05 ], Uy = [ .3, .15, .05 ];
Y = Ry[M], Y.vl = function(a, b, c, d) {
var e = a.d[b], f = e.c[c];
if (f && !f.Zb && f.h && (!Zx(e) || 0 != e[qd] || $x(f, e))) {
for (a = e[I] == Jh ? Uy :Sy, d = this.ag(d, b, c), d.Pc = {}, b = d.Pc, b.Ma = [], 
c = 0; c < a[L]; c++) {
var g = new vv({
fill:X,
stroke:Oh,
jd:a[c],
Aa:1
});
b.Ma[x]({
a:g
});
}
switch (e[I]) {
case Jh:
case jp:
case ui:
for (e = f.h.$g || f.h[Fc] || f.h, f = new zt(e[F], e.top, e[y], e[S]), c = 0; c < a[L]; c++) e = b.Ma[c].a.I, 
b.Ma[c].rect = new zt(f[F] - e / 2, f.top - e / 2, f[y] + e, f[S] + e), Aa(f, f[F] - e), 
f.top -= e, pa(f, f[y] + 2 * e), $a(f, f[S] + 2 * e);
break;

case hm:
case wh:
case no:
case ni:
for (Ia(d, j), b.x = f.h.x, b.y = f.h.y, d.Eb ? (e = d.Eb, f = e.Pb + e.a.I / 2) :f = by(f, e), 
c = 0; c < a[L]; c++) e = b.Ma[c].a.I, b.Ma[c].Pb = f + e / 2, f += e;
}
}
}, Y.xq = function(a, b, c) {
var e, d = a.d[b];
if (Zx(d) && 0 < d[qd]) {
e = this.Pi(c, b), e.Pc = {}, e = e.Pc, e.Ma = [];
var f;
f = d[I] == wh ? a.vd ? ey(d) :dy(d, n) :dy(d, a.ae), f = f.eq();
for (var g = d.Pa.I / 2, i = 0; i < Ty[L]; i++) {
var k = new vv({
fill:X,
stroke:Oh,
jd:Ty[i],
Aa:1
}), m = ny(f, g + k.I / 2);
e.Ma[x]({
a:k,
path:m
}), g += k.I;
}
}
for (e = (e = (e = c.d) && e[b]) && e.c, f = 0; f < d.c[L]; ++f) g = d.c[f], !g || g.Zb || ($x(g, d) || e && e[f] && e[f].visible) && this.vl(a, b, f, c);
}, Y.Lv = function(a, b, c) {
for (var d = a.d, e = 0; e < d[L]; e++) this.Td(e) && this.vl(a, e, b, c);
}, Y.fj = function(a, b, c, d) {
var e = a.d[b], f = e.c[c];
if (f && !f.Zb && f.h && (!Zx(e) || 0 != e[qd] || $x(f, e))) {
var g = Yx(f, e), b = this.ag(d, b, c);
switch (b.Eb = {}, c = b.Eb, a = a.Di, d = 1, a == l && (a = Tq, d = 0), e[I]) {
case Jh:
case jp:
case ui:
c.a = wv[Oc](), c.a.Gc(a), e[I] == ui && f.no.Y == a && c.a.Gc(g.Y), c.a.Zg(d), 
c.a.Re(1), e = f.h.$g || f.h[Fc] || f.h, g = g.I, f = c.a.I, c.rect = new zt(e[F] + g / 2 + 1.5 + f / 2, e.top + g / 2 + 1.5 + f / 2, e[y] - (g + 3 + f), e[S] - (g + 3 + f)), 
(0 >= c[Fc][y] || 0 >= c[Fc][S]) && delete b.Eb;
break;

case hm:
case wh:
case no:
case ni:
Ia(b, j), c.x = f.h.x, c.y = f.h.y, c.a = new vv({
fill:a,
Cb:d,
stroke:g.Y,
Aa:1
}), c.Pb = by(f, e) + 1.5 + c.a.I / 2;
}
}
}, Y.Qv = function(a, b, c) {
var d = a.d[b];
if ((d[I] == hm || d[I] == wh || d[I] == no) && 0 < d[qd]) {
var e = this.Pi(c, b);
e.Eb = {};
var f, e = e.Eb;
f = d[I] == wh ? a.vd ? ey(d) :dy(d, n) :dy(d, a.ae), f = f.eq(), e.a = new vv({
stroke:d.Pa.Ob,
Aa:s.min(1, d.Pa.I / 2)
}), e.path = ny(f, -(d.Pa.I / 2 + 2 + e.a.I / 2));
}
for (e = 0; e < d.c[L]; ++e) f = d.c[e], !f || f.Zb || $x(f, d) && this.fj(a, b, e, c);
}, Y.Pv = function(a, b, c) {
for (var d = a.d, e = 0; e < d[L]; ++e) this.Td(e) && this.fj(a, e, b, c);
}, Y.sh = function(a, b, c, d, e) {
d = this.ag(d, b, c), a = this.je.mk(a, e != l, b, c, l), d.G = a, e && this.Vd.Cf(a, e, d.G);
}, Y.vq = function(a, b, c, d, e) {
b && this.zy && (d = this.es(d, c), a = this.je.mk(a, e != l, l, c, l, b), d.G = a, 
e && this.Vd.Cf(a, e, d.G));
}, Y.fl = function(a, b, c, d, e, f) {
e = this.Wi(e, b, c), e.labels = e[rc] || {}, e = e[rc], e[d] = e[d] || {}, e = e[d], 
a = this.je.mk(a, f != l, b, c, d), e.Gh = a, f && a && this.Vd.Cf(a, f, e.Gh);
}, Y.Ov = function(a, b, c, d) {
if (a.Wc) {
var e = a.Wc, a = wy(e[dd], e.xh, [ {
value:a.d[b].c[c].Fb[zb]
} ], a.wb);
d.Wc = {
definition:a
};
}
}, Y.Nv = function(a, b, c, d, e) {
a = this.Wi(e, b, c), a.labels = a[rc] || {}, a = a[rc], a[d] = a[d] || {}, d = a[d], 
d.u = d.u || {}, d.u.bold = j;
}, Y.IA = function(a, b, c) {
var d = b.z.Qb, e = b.z.Bd;
a.o && this.je.Zt(new xt(0, a.o.Vk[F], a[S], 0));
var f = this.je.Zk;
if (d != l && e == l) {
for (var g = b[qc][pc].x, i = a.d[d].c, e = Qr(i, function(a) {
return a != l;
}), k = 0; k < e[L] && e[k].h.x < g; ) k++;
0 == k ? e = 0 :k == e[L] ? e = e[L] - 1 :(g = g < ms(e[k - 1].h.x, e[k].h.x) ? k - 1 :k, 
e = Or(i, e[g])), this.Si = n;
}
if (i = l, e != l) for (i = this.ag(c, d, e), Ia(i, j), f == dk && this.sh(a, d, e, c), 
a.o && (i = this.bj(c, d), i.ka = {
v:a.mo
}), i = 0; i < a.d[L]; i++) i != d && (a.o && (e = this.bj(c, i), e.m = {
u:{
color:Sd
}
}), e = this.Pi(c, i), g = a.d[i], e.Pa = g.Pa[Oc](), e.Pa.Zg(.3));
if ((d = b.qb.Ni) && (d = this.Wi(c, d.ba, d.Uk), d.hd = d.hd || {}, d.hd.Nk = j), 
(e = b.qb.z) && (i = a.Sf[e.he], d = i.ba, e = a.Me[e.ie], i = i.Ok, this.gl(d) && this.fl(a, d, e, i, c)), 
a.o && a.o[pc] == Il && b.o.z.ob != l) {
b = b.o.z.ob, i = this.bj(c, b), i.ka = {
v:a.mo
};
for (var m, d = a.d[b].c, i = d[L] - 1; i >= 0; i--) if ((e = d[i]) && !e.Zb && e.h && new xt(a.b.top, a.b[T], a.b[R], a.b[F])[fd](new $(e.h.x, e.h.y))) {
m = i;
break;
}
for (m != l && (i = this.ag(c, b, m), Ia(i, j), f == dk && this.sh(a, b, m, c)), 
i = 0; i < a.d[L]; i++) i != b && (e = this.bj(c, i), e.m = {
u:{
color:Sd
}
}, e = this.Pi(c, i), g = a.d[i], e.Pa = g.Pa[Oc](), e.Pa.Zg(.3));
}
}, Vy[M].Qw = function(a) {
return this.kt && a != l ? (a = this.pA[rd](a), a = is(a, this.Wg[Q], this.Wg.end), 
s[B](s[Pb](this.jt + (a - this.Wg[Q]) / this.kt * (this.oA - this.jt)))) :this.nA;
};
var Wy = {}, Xy = n;
Y = Zy[M], Y.$k = function() {
function a(a, b, d) {
if (c[tb]() <= a) return U;
var e = c[Mb](a);
return b && !(0 <= Or(d, e)) && h(u("Column " + a + " must be of type " + d[pd](Ue))), 
!b && 0 <= Or(d, e) && h(u("Column " + a + " cannot be of type " + d[pd](Ue))), 
e;
}
var b = this.g, c = this.D, d = c[tb]();
3 > d && h(u("Data table should have at least 3 columns")), a(this.cl, j, [ op ]);
var e = a(this.jh, n, [ op ]), f = a(this.kh, n, [ op ]);
this.Ho = c[Jb](this.jh), this.Io = c[Jb](this.kh), this.ke < d ? (this.yd = a(this.ke, j, [ Um, op ]), 
this.yd == op && (this.Xf = {}, this.bg = []), this.Fo = c[Jb](this.ke)) :this.ke = l;
var g = n;
for (this.le < d ? (a(this.le, j, [ Um ]), this.Go = c[Jb](this.le), g = this.i.$(ap, j)) :this.le = l, 
b.r = [], b.Me = {}, d = 0; d < c[mc](); d++) {
var i = c.getTableRowIndex(d);
b.Me[i] = d;
}
b.d = [ {
type:ni,
Do:j,
au:g,
c:[],
VB:this.Xf,
WB:this.bg
} ], b.ph = e, b.qh = [ f ], b.gb = {}, b.gb.bubbles = 1, b.wd = [];
}, Y.pt = function() {
return this.yd == Um;
}, Y.Su = function(a, b) {
for (var c = this.D, d = 0; d < c[mc](); d++) {
var e = c[J](d, this.jh), f = c[J](d, this.kh), e = a.n.jf(e), f = b.n.jf(f);
e != l && a.zg(e), f != l && b.zg(f);
}
}, Y.Ku = function(a, b, c) {
for (var d = 0; d < this.D[mc](); d++) {
var e = this.xu(a, b, d);
this.g.d[0].c[x](e);
}
if (this.yd == Um) {
if (d = this.i, b = this.Xk, a = l, (e = d.O(ij)) && 0 < e[L]) {
for (1 == e[L] && (e = [ e[0], e[0] ]), b && (e[0] == l && (e[0] = b[Q]), e[e[L] - 1] == l && (e[e[L] - 1] = b.end)), 
e[0] == l && h(u(jj)), a = 1; a < e[L]; a++) e[a] == l && h(u(jj)), e[a] < e[a - 1] && h(u("colorAxis.values must be a monotonically increasing series"));
a = e;
} else {
var e = d.Hd(hj), f = d.Hd(gj);
e != l && f != l && e > f && h(u("colorAxis.minValue (" + e + ") must be at most colorAxis.maxValue (" + f + we)), 
(b = rv(b, e, f)) && (a = [ b[Q], b.end ]);
}
b = d.O(mj), b = d.O(cj, b), d = vy(a, b), this.ll = new sy(d.Sl, d.Rl), c.yu(this.ll);
} else if (this.yd == op) for (d = 0; d < this.bg[L]; d++) c = this.bg[d], a = this.Xf[c], 
a.Fi && this.g.wd[x]({
index:d,
id:c,
text:a.Pk,
a:new vv({
fill:a[zb]
}),
v:j
});
a = this.i, b = this.Yk, c = a.R(Qo), d = a.R(Oo), c > d && h(u("sizeAxis.minSize (" + c + ") must be at most sizeAxis.maxSize (" + d + we)), 
e = a.Hd(Ro), f = a.Hd(Po), e != l && f != l && e > f && h(u("sizeAxis.minValue (" + e + ") must be at most sizeAxis.maxValue (" + f + we)), 
b = rv(b, e, f), a = ex(a, No, So), a = fx(a, 0/0, []), this.zo = new Vy(c, d, b, a);
}, Y.xu = function(a, b, c) {
var d = this.D, e = d[J](c, this.cl), f = d[kd](c, this.cl), g = d[J](c, this.jh), i = d[J](c, this.kh), k = l;
if (this.ke != l && (k = d[J](c, this.ke), k == l)) return l;
var m = l;
if (this.le != l && (m = d[J](c, this.le), m == l)) return l;
if (d = this.pa(f, this.w)[y], this.yd == Um) this.Xk = qv(this.Xk, k); else if (this.yd == op) {
var p = k, q = this.Xf[p];
if (!q) {
var q = Bo + p + Ge, t = this.i.fd(q + aj, this.Jl[this.bg[L] % this.Jl[L]]), t = Yy(t), w = this.i.$(q + Sq, j), q = this.i.ud(q + Hl, p), q = {
color:t[zb],
Fi:w,
Pk:q
};
this.Xf[p] = q, this.bg[x](p);
}
}
return this.Yk = qv(this.Yk, m), g = a.n.ha(g), i = b.n.ha(i), g === l || i === l ? l :(a.Rc(g) && b.Rc(i) && (a.V(g), 
b.V(i)), a = this.Ll(c, f), {
id:e,
text:f,
du:d,
u:this.w,
qa:a,
Fb:{
x:g,
y:i,
color:k,
size:m
}
});
}, Y.Ll = function(a, b) {
var c = this.D, d = c[kd](a, this.jh), e = c[kd](a, this.kh), d = [ {
title:this.Ho,
value:d
}, {
title:this.Io,
value:e
} ];
return this.ke != l && (e = c[kd](a, this.ke), d[x]({
title:this.Fo,
value:e
})), this.le != l && (c = c[kd](a, this.le), d[x]({
title:this.Go,
value:c
})), {
title:b,
f:d
};
}, Y.Sz = function(a, b, c) {
var d, a = a.Ka(c.x), b = b.Ka(c.y);
return d = this.yd == Um ? this.ll.Pw(c[zb]) :this.yd == op ? this.Xf[c[zb]][zb] :this.Gu, 
d = new vv({
fill:d,
Cb:this.Hu,
stroke:this.Ob
}), c = this.zo.Qw(c.size), {
x:a,
y:b,
a:d,
Pb:c,
tj:c
};
};
var $y = {
OC:og,
eD:yg,
PC:pg,
CC:eg,
tC:Zf,
nD:Eg,
RC:rg,
bD:wg,
oD:Hg
}, bz = {
VA:"yyyy",
WA:"MMM y",
pD:"MMMM yyyy",
SC:"MMM d",
TC:"MMMM dd",
VC:"M/d",
UC:"MMMM d",
uC:vj
}, cz = bz, cz = bz;
Ba(dz[M], function(a) {
return a /= this.yk, this.pd[Ac](a) + (vd + (2 > s.abs(a) ? this.xA :this.wA));
}), ez[M].Nh = function(a) {
switch (a) {
case Hg:
a = cz.VA;
break;

case wg:
a = vg;
break;

case rg:
a = cz.WA;
break;

case Zf:
a = 3;
break;

default:
a = 11;
}
this.pd = new google[Hc][Wc]({
pattern:a,
timeZone:0
});
}, Ba(ez[M], function(a) {
return this.rt[cd](a), this.pd[Ac](this.rt);
}), Y = fz[M], Y.$x = function(a) {
return this.Tn = a, this;
}, Y.Xx = function(a) {
return this.Un = a, this;
}, Y.Yx = function(a) {
return this.yi = a, this;
}, Y.Zx = function(a) {
return this.Mf = a, this;
}, Y.ay = function(a) {
return a = Aw(rr(a) ? a :3), this.Ug = [ new dz(a, s.pow(10, 15), ug, ug), new dz(a, s.pow(10, 12), Bg, Bg), new dz(a, s.pow(10, 9), Sf, Sf), new dz(a, s.pow(10, 6), ng, ng) ], 
this;
}, Y.Vx = function() {
var a;
return a = this.Tn ? new google[Hc][ac]({
pattern:this.Tn
}) :new google[Hc][ac]({
pattern:Aw(rr(this.Un) ? this.Un :16)
}), new gz(a, this.Ug, this.yi, this.Mf);
}, Ba(gz[M], function(a) {
var b = 0 > a, a = s.abs(a);
if (this.yi) {
var c = this.yi;
if (0 != a) {
var d = s[D](s.log(s.abs(a)) / nw) + 1;
d > c ? (c = s.pow(10, d - c), a = s[B](a / c) * c) :(c = s.pow(10, c - d), a = s[B](a * c) / c);
}
}
for (c = l, d = 0; d < this.Ug[L]; d++) {
var e = this.Ug[d];
if (a >= e.yk) {
c = e[Fb](a);
break;
}
}
return c == l && (c = this.cA[Ac](a)), c = this.tA(c), b ? Ae + c :c;
}), gz[M].tA = function(a) {
if (!this.Mf) return a;
var b = this.Mf.symbol, c = this.Mf.usePadding ? vd :U;
return this.Mf[pc] == bo ? a + c + b :b + c + a;
}, hz[M].nb = function() {
return s[B](this.k);
}, Ha(hz[M], function() {
return this.vz;
}), hz[M].Fz = function(a) {
this.te = a;
}, Y = kz[M], Qa(Y, function() {
return this.k++, this[J]();
}), Y.jb = function() {
return this.k--, this[J]();
}, Ha(Y, function() {
return s[B]((this.k * this.oi + this.ni) * this.vs) / this.vs;
}), va(Y, function(a) {
return this.k = s[D]((a - this.ni) / this.oi), this[J]();
}), ua(Y, function(a) {
return this.k = s[lb]((a - this.ni) / this.oi), this[J]();
}), ra(Y, function(a) {
return this.k = s[B]((a - this.ni) / this.oi), this[J]();
}), Y.sz = function(a) {
if (a >= 1) return 1;
var b = a[kc](), a = 0, c = b[yb](Qj);
return -1 != c ? a = la(b[ic](c + 1), 10) :c = b[L], b = b[yb](Ge), -1 != b && (a -= c - 1 - b), 
s.pow(10, -a);
}, Y = lz[M], Y.Dr = function(a) {
var b = a[L];
if (b > 0) for (;--b; ) if (this.Kt(a[b - 1], a[b])) return n;
return j;
}, Y.Kt = function(a, b) {
var c = this.Ks(a), d = this.Ks(b);
return s.abs(this.N.ua(a) - this.N.ua(b)) < (c + d) / 2;
}, Y.xy = function(a) {
var b = [];
if (1 >= a[L] || 0 != a[0]) return a;
b[x](a[0]);
for (var c = 1, d = a[L]; d > c; c++) this.Kt(a[0], a[c]) || b[x](a[c]);
return b;
}, Y.Ks = function(a) {
return a = this.pd[Fb](a), this.Jc.Kg(a, this.Hb);
}, Y.cs = function(a, b) {
return s.abs(this.N.hc(b) - this.N.hc(a));
}, Y.gk = function(a) {
for (var b = [], c = 0; c < a[L]; c++) {
var d = a[c];
b[x](iz(d, this.N.ua(d), this.pd[Fb](d)));
}
return b;
}, Y.dn = function(a, b, c, d) {
if (b == c) return [ b ];
for (var e = [], b = a[lb](b); c >= b; ) e[x](b), b = a[yc]();
return 1 == e[L] && (b = new kz(d / 10)[D](c), b != e[0] && e[x](b)), e;
}, mz[M].ua = function(a) {
return this.Rn(a) * this.Kf - this.xi;
}, mz[M].hc = function(a) {
return this.UA((a + this.xi) / this.Kf);
}, mz[M].Rn = function(a) {
switch (this.Vg) {
case 0:
return s.log(a);

case 1:
return a;

default:
return (s.pow(a, this.Vg) - 1) / this.Vg;
}
}, mz[M].UA = function(a) {
switch (this.Vg) {
case 0:
return s.pow(s.E, a);

case 1:
return a;

default:
return s.pow(a * this.Vg + 1, 1 / this.Vg);
}
}, Y = qz[M], Y.Ye = function() {
return this.Ef;
}, Y.Xe = function() {
return this.ai;
}, Y.$e = function() {
return this.ng;
}, Y.se = function() {
return this.mg;
}, Y.dy = function() {
return this.Ef == this.ai ? this.Ef / 2 :ga(this.Jr) ? nz(1, oz(this.ai - this.Ef)) / 1e3 :this.Jr / 2;
}, Y.Fe = function(a, b, c, d) {
return new mz(a, b, c, d, this.cy);
}, Y.hc = function(a) {
if (this.Ef == this.ai) return this.Ef;
var b = this.gg ? -1 :1;
return a * b > this.Ab * b ? this.Na.hc(a) :a * b < this.Ab * b ? -this.Na.hc(2 * this.Ab - a) :0;
}, Y.ua = function(a) {
return this.Ef == this.ai ? s.abs(this.ng - this.mg) / 2 :a > this.Cc ? this.Na.ua(a) :a < -this.Cc ? 2 * this.Ab - this.Na.ua(-a) :this.Ab;
}, Y = rz[M], Qa(Y, function() {
return this.k++, this[J]();
}), Y.jb = function() {
return this.k--, this[J]();
}, Y.Dz = function(a) {
for (var a = a[L], b = 0; a > b; b++) ;
}, Ha(Y, function() {
var a = s[D](this.k / this.li);
return nz(this.Cz[this.k - a * this.li], a);
}), va(Y, function(a) {
if (this.k = this.li * pz(a), this[J]() != a) for (;this.jb() > a; ) ;
return this[J]();
}), ua(Y, function(a) {
if (this.k = this.li * oz(a), this[J]() != a) for (;this[yc]() < a; ) ;
return this[J]();
}), ra(Y, function(a) {
if (this.k = this.li * pz(a), this[J]() != a) {
for (;this.jb() > a; ) ;
if (a - this[J]() < this[yc]() - a) return this.jb();
}
return this[J]();
}), sz[M].sj = function() {
var b, a = this.en();
this.Xd[D](a);
do b = this.Ac.dn(new kz(a), this.Na.Ye(), this.Na.Xe(), a), a = this.Xd[yc](); while (!this.Ac.Dr(b));
return this.Ac.gk(b);
}, sz[M].en = function() {
var a = this.Na.$e(), b = this.Na.se(), c = s.max(this.Ac.cs(a, a + this.wn), this.Ac.cs(b - this.wn, b)), d = this.Na.ua(0);
return d >= a && b >= d && (a = this.Na.hc(this.Na.ua(0) + this.wn), c = s.max(c, a)), 
this.Xd[lb](c);
}, Y = tz[M], Y.hc = function(a) {
return (a + this.xi) / this.Kf;
}, Y.ua = function(a) {
return a * this.Kf - this.xi;
}, Y.$e = function() {
return this.Vn;
}, Y.se = function() {
return this.dt;
}, Y.Ye = function() {
return this.Ck;
}, Y.Xe = function() {
return this.Mn;
}, Y = uz[M], Y.ls = function() {
var b, a = s[D](this.k / this.Zd);
return b = 10 * (this.k + this.di - a * this.Zd) / this.ek, 0 == b && (b = 1), nz(b, a);
}, Ha(Y, function() {
return this.k = s.abs(this.cb) + this.Ff, 0 < this.cb ? this.ls() :0 > this.cb ? -this.ls() :0;
}), Qa(Y, function() {
return this.cb++, this[J]();
}), Y.jb = function() {
return this.cb--, this[J]();
}, va(Y, function(a) {
var b = this.di, c = oz(s.abs(a));
return s.abs(a) <= s.pow(10, this.fk) ? (this.cb = 0 > a ? -1 :0, this[J]()) :(a > 0 ? this.cb = this.Zd * c - this.Ff :0 > a && (this.cb = this.Ff - this.Zd * c, 
b = -b), this[J]() != a && (c = this.ek * a / nz(1, pz(s.abs(a))), this.cb += s[D](c) - b), 
this[J]());
}), ua(Y, function(a) {
var b = this.di, c = oz(s.abs(a));
return s.abs(a) <= s.pow(10, this.fk) ? (this.cb = a > 0 ? 1 :0, this[J]()) :(a > 0 ? this.cb = this.Zd * c - this.Ff :0 > a && (this.cb = this.Ff - this.Zd * c, 
b = -b), this[J]() != a && (c = this.ek * a / nz(1, pz(s.abs(a))), this.cb += s[lb](c) - b), 
this[J]());
}), ra(Y, function(a) {
var b = oz(s.abs(a));
if (s.abs(a) <= s.pow(10, this.fk)) return this.cb = 0;
if (a > 0) {
if (this.cb = this.Zd * b - this.Ff, this[yc]() > a) return a - this[J]() >= this.jb() - a ? this[yc]() :this[J]();
this.jb();
} else if (0 > a) {
if (this.cb = this.Ff - this.Zd * b, this.jb() < a) return a - this[J]() < this[yc]() - a ? this.jb() :this[J]();
this[yc]();
}
return this[J]() != a && (b = this.ek * a / nz(1, pz(s.abs(a))), this.cb += s[B](b) - this.di), 
this[J]();
}), vz[M].sj = function() {
var a = this.en(), b = new uz(a, this.Zj), c = this.Ac.dn(b, this.N.Ye(), this.N.Xe(), a);
if (2 > c[L]) return this.Ac.gk(c);
if (a = c[0], b = c[1], 0 == a) {
if (3 > c[L]) return this.Ac.gk(c);
a = b, b = c[2];
}
c = nz(1, pz(s.abs(a))), c == a && (c *= 10), this.Xd[lb](c / s.abs(b - a));
do a = this.Xd.jb(), b = new uz(a, this.Zj), c = this.Ac.dn(b, this.N.Ye(), this.N.Xe(), a), 
c = this.Ac.xy(c); while (!this.Ac.Dr(c));
return this.Ac.gk(c);
}, vz[M].en = function() {
var b, a = this.N.ua(10 * this.Zj);
this.Xd[D](1);
do b = this.Xd[yc](), b = this.N.ua(10 * this.Zj * (b - 1) / b); while (s.abs(a - b) >= this.Rx);
return this.Xd.jb();
}, Y = wz[M], Ha(Y, function() {
return this.Ec[dc]();
}), Qa(Y, function() {
var a = this.Ec[Rc](), a = a + this.He;
return this.Ec.setUTCMonth(a), this[J]();
}), Y.jb = function() {
return this.Ec.setUTCMonth(this.Ec[Rc]() - this.He), this[J]();
}, va(Y, function(a) {
return this.Ec[cd](a), 1 < this.He && (this.Ec.setUTCMonth(this.Ec[Rc]() - (this.Ec[Rc]() + 12 - this.jA) % this.He % 12), 
12 < this.He && (a = this.kA[D](this.Ec.getUTCFullYear()), this.Ec.setUTCFullYear(a))), 
this.Ec.setUTCDate(1), this.Ec.setUTCHours(0, 0, 0, 0), this[J]();
}), ua(Y, function(a) {
return this[D](a) < a ? this[yc]() :this[J]();
}), ra(Y, function(a) {
return this[D](a) != a && a - this[J]() < this[yc]() - a ? this.jb() :this[J]();
}), Y = xz[M], Qa(Y, function() {
return this.k++, this[J]();
}), Y.jb = function() {
return this.k--, this[J]();
}, Ha(Y, function() {
return nz(1, this.k);
}), va(Y, function(a) {
return this.k = oz(a), this[J]();
}), ua(Y, function(a) {
return this.k = pz(a), this[J]();
}), ra(Y, function(a) {
var b = nz(1, pz(a)), c = b / 10;
return this.k = s[B](.4342944819032518 * s.log(b - a > a - c ? c :b)), this[J]();
}), Y = yz[M], Y.oc = function(a) {
this.Zm = 1 == a || 4 == a, 2 == a ? this.k = 0 :3 == a ? this.k = this.Xb[L] - 1 :1 == a ? this.rd = 1 :4 == a && (this.rd = this.Lg);
}, Ha(Y, function() {
return this.Zm ? this.rd * this.ab[J]() :this.Xb[this.k];
}), va(Y, function(a) {
if (a < this.$j) return this.oc(1), this.ab[D](a);
if (a >= this.Ar) return this.oc(4), this.rd * this.ab[D](a / this.rd);
for (this.oc(2); a >= this.Xb[this.k]; ) this.k++;
return this.Xb[--this.k];
}), ua(Y, function(a) {
if (a <= this.Xm) return this.oc(1), this.ab[lb](a);
if (a > this.Lg) return this.oc(4), this.rd * this.ab[lb](a / this.rd);
for (this.oc(3); a <= this.Xb[this.k]; ) this.k--;
return this.Xb[++this.k];
}), ra(Y, function(a) {
if (a < this.Bx) return this.oc(1), this.ab[B](a);
if (a >= this.Cx) return this.oc(4), this.rd * this.ab[B](a / this.rd);
for (this.oc(3); 0 < this.k && a < this.Xb[this.k]; ) this.k--;
return this.Xb[this.k + 1] - a <= a - this.Xb[this.k] && this.k++, this.Xb[this.k];
}), Qa(Y, function() {
return this.Zm ? (this.ab[yc](), 1 == this.rd && this.ab[J]() == this.$j && this.oc(2)) :(this.k++, 
this.k == this.Xb[L] && (this.oc(4), this.ab[B](1), this.ab[yc]())), this[J]();
}), Y.jb = function() {
return this.Zm ? (this.ab.jb(), this.rd == this.Lg && 1 == this.ab[J]() && this.oc(3)) :(this.k--, 
-1 == this.k && (this.oc(1), this.ab[B](this.$j), this.ab.jb())), this[J]();
}, Y = Ez[M], Y.Ix = function(a) {
return [ jz(a, s.abs(this.N.$e() - this.N.se()) / 2, this.mc[Fb](a)) ];
}, Y.TA = function() {
var a = this.N.Ye(), b = this.N.Xe();
if (this.mc.Nh(this.rx), a == b) return this.Ix(a);
var c;
c = this.mc[Fb](b), c = new hz(b, this.N.se(), j, j, n, c, 1), this.mc.Nh(this.tr);
for (var d = 1 == this.vr && this.Wj > this.qx, e = zz(this.Wj * this.vr), f = zz(this.Wj), g = [], i = 0/0, k = e[lb](a), a = f[lb](a); b >= a; a = f[yc]()) {
var m = this.N.ua(a);
if (a == k) {
if (k = e[yc](), this.Kx(i, a)) return l;
d ? (ga(i) || g[x](this.Gx(i, a)), g[x](new hz(a, m, j, j, j, l))) :(i = iz(a, m, this.mc[Fb](a)), 
g[x](i)), i = a;
} else g[x](new hz(a, m, n, j, n, l));
}
return d && a > b && this.Dx(g, f, b), this.Rm && (this.Fx(c, g, this.Jc), g[x](c)), 
2 > this.Hx(g) ? this.Ex() :this.Jx(g) ? this.Lx(g) :g;
}, Y.Dx = function(a, b, c) {
var d = this.mc[Fb](c), e = this.Jc.Kg(d, this.Hb), f = b[J](), b = b.jb(), b = this.N.ua(b), g = this.N.ua(f), f = this.N.ua(c), b = (b + g) / 2;
f - b > e / 2 && a[x](jz(c, b, d));
}, Y.Fx = function(a, b) {
var c = this.Ez(b);
if (c != l) {
var d = this.Jc.Kg(c.te, this.Hb), e = this.Jc.Kg(a.te, this.Hb);
s.abs(c.nb() - a.nb()) - (d + e) / 2 < this.Xj && c.Fz(l);
}
}, Y.Ez = function(a) {
for (var b = a[L] - 1; b >= 0; b--) if (a[b].te != l) return a[b];
return l;
}, Y.Ex = function() {
var a = this.mc[Fb](this.N.Ye()), b = this.mc[Fb](this.N.Xe()), a = a + Ae + b, b = [];
return this.lz(a, this.N) || b[x](jz(0/0, this.N.$e() + this.N.se() / 2, a)), b;
}, Y.lz = function(a) {
var b = s.abs(this.N.$e() - this.N.se());
return this.Jc.ws(a) > b + 40;
}, Y.Hx = function(a) {
for (var b = 0, c = 0; c < a[L]; c++) a[c].te != l && b++;
return b;
}, Y.Lx = function(a) {
for (var b = [], c = 0; c < a[L]; c++) {
var d = a[c];
(!d.uz || d.tz) && b[x](d);
}
return b;
}, Y.Kx = function(a, b) {
var c = this.Jc.Kg(this.mc[Fb](a), this.Hb), d = this.Jc.Kg(this.mc[Fb](b), this.Hb);
return s.abs(this.N.ua(a) - this.N.ua(b)) - (c + d) / 2 < this.Xj;
}, Y.Jx = function(a) {
if (2 > a[L]) return n;
for (var b = a[0], c = 1; c < a[L]; c++) {
var d = a[c];
if (5 > s.abs(d.nb() - b.nb()) && b[J]() != d[J]()) return j;
b = d;
}
return n;
}, Y.Gx = function(a, b) {
var c = this.N.ua(a), d = this.N.ua(b), c = (c + d) / 2;
return jz(this.N.hc(c), c, this.mc[Fb](a));
}, Fz[M].Gy = function() {
return [ this.Bb(Zf, 1), this.Bb(Zf, 7), this.Bb(rg, 1), this.Bb(rg, 2), this.Bb(rg, 3), this.Bb(wg, 1), this.Bb(rg, 6), this.Bb(Hg, 1), this.Bb(Hg, 2), this.Bb(Hg, 5), this.Bb(Hg, 10), this.Bb(Hg, 20), this.Bb(Hg, 50), this.Bb(Hg, 100), this.Bb(Hg, 1e3), this.Bb(Hg, 1e4), this.Bb(Hg, 1e7) ];
}, Fz[M].Bb = function(a, b) {
return new Ez(this.eh, a, b, this.Jc, this.mc, this.N, this.Xj, this.Hb, this.Rm);
}, Fz[M].sj = function() {
for (var a = az(this.eh), b = 0; b < this.ds[L]; b++) {
var c = this.ds[b];
if (a <= c.Wj && (c = c.TA(), c != l)) return c;
}
return [];
}, Gz[M].ws = function(a) {
return this.Ps(a, this.w)[y];
}, Gz[M].uc = function(a) {
return this.Ps(a, this.w)[S];
}, Gz[M].Kg = function(a, b) {
return b == il ? this.ws(a) :this.uc(a);
}, Y = Hz[M], Y.Yv = function(a, b, c, d, e, f) {
return b = this.Lw(a, b, c), a = this.fr({
Db:b.Db,
Mb:b.Mb,
jm:b.Zh[sc],
jq:b.Zh.duration,
kq:b.Zh.vf,
km:b.Zh.De,
bC:Mr(b.Zh.De),
hq:this.kw,
ce:e.ce,
Z:e.Z,
iq:this.jw,
im:[],
gq:0
}, d, f), this.Qq && 1 == a[Xc] && 0 < b.hm && b.cr ? (c = this.Nq[b.hm - 1], f = this.fr({
Db:b.Db,
Mb:b.Mb,
jm:c[sc],
jq:c.duration,
kq:c.wf,
km:c.xf,
hq:this.mw,
ce:e.Gi,
Z:e.ih,
iq:this.Kp,
im:a.Q,
gq:this.lw
}, d, f), f == l ? (d = this.Tj(e.Z, 2, a.Q, a.Dj), {
Q:a.Q,
Nc:d
}) :(d = this.Tj(e.Z, 1, a.Q, a.Dj), e = this.Tj(e.ih, 1, f.Q, f.Dj, d), a = Zr(f.Q, a.Q), 
f = Zr(d, e), {
Q:a,
Nc:f
})) :(f = this.Tj(e.Z, 1 == a[Xc] && b.cr ? 1 :0, a.Q, a.Dj), this.Qq && 1 < a[Xc] ? (e = this.Mw(b, a, e, d), 
a = Zr(a.Q, e)) :a = a.Q, {
Q:a,
Nc:f
});
}, Y.Lw = function(a, b, c) {
var d = s[B](.15 * (b[dc]() - a[dc]())), a = new Date(a[dc]() - d), b = new Date(b[dc]() + d), c = Ow(c, Iz, this.Sj), d = Ow((b[dc]() - a[dc]()) / this.Sx / 2, this.Xh, this.Sj), d = Rr(d, function(a) {
return a > 0 ? 1 :0;
}), e = Tw(d);
return {
Db:a,
Mb:b,
Zh:this.Nq[e],
hm:e,
cr:Pw(c) < Pw(d)
};
}, Y.fr = function(a, b, c) {
for (var d = Rr(a.kq, function(a) {
return new google[Hc][Wc]({
pattern:a
});
}), e = 0; e < a.km[L]; ++e) {
var f = a.km[e], g = 0, i = Ww(a.jq, f), i = Jw(a.Db, i, 0);
4 == a.jm && (i = Jw(i, [ 0, 0, 0, 0, 1 ], 0), i = Rw(i, [ 0, 0, 0, 0, (7 + i.getDay() - 1) % 7 ], -1));
for (var k = new Sw(i, a.Mb, a.jm, f), i = [], m = j, p = b(a.Db), q = -1; k.Am(); ) {
var t = k[yc](), w = b(t);
-1 == q && w >= p && (q = i[L]);
var A = k.Wv();
if (A != l) {
if (A = b(A), w + 1 > A) continue;
if (A - w < a.hq) {
m = n;
break;
}
}
for (A = n; g < a.im[L]; ) {
var E = a.im[g];
if (s.abs(E.l - w) < a.gq) {
A = j;
break;
}
if (E.l > w) {
g = s.max(0, g - 1);
break;
}
g++;
}
A || i[x]({
S:t,
l:w,
v:j,
a:a.ce,
length:l
});
}
if (m) {
for (q > 1 && (i = cs(i, q - 1)), g = m = l, p = 0; p < d[L]; ++p) {
for (q = d[p], t = j, w = [], k = 0; k < i[L]; ++k) {
var A = i[k], E = q[Ac](A.S), K = c(E, a.Z)[y];
if (k + 1 < i[L] && i[k + 1].l - A.l < a.iq + K) {
t = n;
break;
}
w[x]({
text:E,
ev:K
});
}
if (t) {
m = p, g = w;
break;
}
}
if (m != l) {
for (a = r, k = 0; k < i[L] - 1; ++k) a = s.min(a, i[k + 1].l - i[k].l);
return {
Q:i,
Dj:g,
multiple:f,
Jv:a
};
}
}
}
return l;
}, Y.Mw = function(a, b, c, d) {
if (b.Jv / b[Xc] < this.Hv) return [];
for (var c = c.ce, e = [], a = new Sw(b.Q[0].S, a.Mb, a.hm, 1), f = 0; a.Am(); ) {
if (0 != f % b[Xc]) {
var g = a[yc](), i = d(g);
e[x]({
S:g,
l:i,
v:j,
a:c,
length:5
});
}
f++;
}
return e;
}, Y.Tj = function(a, b, c, d, e) {
var f = [];
if (e != l) for (var g = 0; g < e[L]; ++g) {
var i = e[g].m, k = i.f[0];
f[x](Jz(k.x, k[L], i.Va, this.Kp));
}
for (var e = 1 == b ? gp :Ci, g = 0, i = [], k = 2 == b ? c[L] - 1 :c[L], m = 0; k > m; ++m) {
var p = c[m];
if (p.v && d[m]) {
for (var q = s[B](2 == b ? (c[m + 1].l + p.l) / 2 :p.l), t = d[m].ev, w = Jz(q, t, e), A = j; g < f[L]; ) {
var E = f[g];
if (s.max(w[Q], E[Q]) <= s.min(w.end, E.end)) {
A = n;
break;
}
if (E[Q] > w.end) {
g = s.max(0, g - 1);
break;
}
g++;
}
A && i[x]({
S:p.S,
v:j,
m:{
text:d[m][z],
u:a,
f:[ {
x:q,
y:0,
text:d[m][z],
length:t
} ],
Va:e,
Oa:Uj,
aC:d[m][z]
}
});
}
}
return i;
};
var Iz = [ [ 1 ], [ 50 ], [ 500 ], [ 0, 1 ], [ 0, 15 ], [ 0, 30 ], [ 0, 0, 1 ], [ 0, 0, 15 ], [ 0, 0, 30 ], [ 0, 0, 0, 1 ], [ 0, 0, 0, 6 ], [ 0, 0, 0, 12 ], [ 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 7 ], [ 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 3 ], [ 0, 0, 0, 0, 0, 6 ], [ 0, 0, 0, 0, 0, 0, 1 ] ], Kz = [ [ 1 ], [ 2 ], [ 5 ], [ 10 ], [ 20 ], [ 50 ], [ 100 ], [ 200 ], [ 500 ], [ 0, 1 ], [ 0, 2 ], [ 0, 5 ], [ 0, 10 ], [ 0, 15 ], [ 0, 30 ], [ 0, 0, 1 ], [ 0, 0, 2 ], [ 0, 0, 5 ], [ 0, 0, 10 ], [ 0, 0, 15 ], [ 0, 0, 30 ], [ 0, 0, 0, 1 ], [ 0, 0, 0, 2 ], [ 0, 0, 0, 3 ], [ 0, 0, 0, 4 ], [ 0, 0, 0, 6 ], [ 0, 0, 0, 12 ], [ 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 2 ], [ 0, 0, 0, 0, 7 ], [ 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 3 ], [ 0, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 10 ], [ 0, 0, 0, 0, 0, 0, 50 ], [ 0, 0, 0, 0, 0, 0, 100 ] ], Lz = [ {
index:0,
duration:[ 1 ],
vf:[ Zk ],
De:[ 1, 5, 10, 50, 100, 500 ],
wf:[ Zk ],
xf:[ 1, 5, 10, 50, 100 ]
}, {
index:1,
duration:[ 0, 1 ],
vf:[ Zk ],
De:[ 1, 5, 10, 15, 30 ],
wf:[ ":ss" ],
xf:[ 1, 5, 10, 15 ]
}, {
index:2,
duration:[ 0, 0, 1 ],
vf:[ "h:mm a" ],
De:[ 1, 2, 5, 15, 20, 30 ],
wf:[ ":mm" ],
xf:[ 1, 2, 5, 15 ]
}, {
index:3,
duration:[ 0, 0, 0, 1 ],
vf:[ "h a" ],
De:[ 1, 2, 6, 12 ],
wf:[ "h a" ],
xf:[ 1, 2, 6 ]
}, {
index:4,
duration:[ 0, 0, 0, 0, 1 ],
vf:[ "MMM d", vj ],
De:[ 1, 2, 7 ],
wf:[ vj ],
xf:[ 1, 7 ]
}, {
index:5,
duration:[ 0, 0, 0, 0, 0, 1 ],
vf:[ "MMM y", "MMM yy", "MMM" ],
De:[ 1, 3, 6 ],
wf:[ "MMM" ],
xf:[ 1, 3 ]
}, {
index:6,
duration:[ 0, 0, 0, 0, 0, 0, 1 ],
vf:[ Zq ],
De:[ 1, 2, 5, 10, 20, 50, 100, 200, 500, 1e3 ],
wf:[ Zq ],
xf:[ 1, 2, 5, 10, 20, 50, 100, 200, 500, 1e3 ]
} ];
Y = Mz[M], Y.s = function(a) {
return Bw(this.rh, a);
}, Y.zg = function(a) {
0 != a && (this.Hi = s.min(s.abs(a), this.Hi));
}, Y.tg = function(a) {
this.n.tg(this.Hi, a || []);
}, Y.Qj = function(a, b) {
var c = sx().gx(a), d = b.Uh(this.s(Ok));
this.qo = 1 == d, c.Kc(b, this.rh, d), this.n = c, this.Db = c.O(b, this.s(Cm)), 
this.Mb = c.O(b, this.s(wm)), this.Ji = c.O(b, this.s(Kh));
}, Y.uj = function(a) {
if (this.Sc = a.gh(this.s(Qq), Bx), this.Sc === l || this.Sc == Wj) {
if (this[I] == Jq) {
var b = this.n, c = b.ha(b.O(a, this.s(Pq))), a = b.ha(b.O(a, this.s(Oq)));
c != l && (this.B.min = c), a != l && (this.B.max = a);
} else this.B.min = a.Ke(this.s(Pq), this.B.min), this.B.max = a.Ke(this.s(Oq), this.B.max);
this.B.min != -r || this.B.max != r ? (this.Sc = Wj, this.B.min >= this.B.max && h(u("viewWindow.max must be greater than viewWindow.min"))) :(this.Sc == Wj && h(u('Option "viewWindowMode" was set to "explicit" but "viewWindow" was not specified.')), 
this.Sc = this.Ut), this[I] == Jq && this.Sc == Wj && (this.B.min != -r && (this.n.X = this.B.min), 
this.B.max != r) && (this.n.da = this.B.max);
}
}, Y.rq = function() {
return this.Sc == Wj && (this.B.min == -r || this.B.max == r);
}, Y.Wq = function() {
this[I] == Jq && !this.n && h(u("Axis type/data type mismatch for " + this.rh));
}, Y.Kr = function(a, b, c, d, e) {
this.ac = c + (1 == this[bb] ? .5 :-.5), this.Ei = b - 1, this.xb = c + b * this[bb];
var f = this.Iq(a), g = this.i.$(this.s(Xk)), g = (g = g && this.Gp()) && this.tc == cn, i = this.ej(a), a = (g = (g = g && i[Wb] == il) && !i.gg) ? this.fw(a, d, e) :this.gw(a, b, c, d, e);
return {
title:this[oc],
name:this.Kq(),
type:this[I],
Tc:this.Tc,
ac:this.ac,
xb:this.xb,
sg:{
Jb:Z(this.Fq, this),
Md:Z(this.Ed, this)
},
position:{
Jb:Z(this.lg, this),
Md:Z(this.Ep, this)
},
mj:f,
ga:a.ga,
Q:a.Q,
text:this.Nc
};
}, Y.gw = function(a, b, c, d, e) {
return this[I] == Jq ? this.qo ? this.Gp() ? this.Sv(a) :this.Tv(a) :this.Rv() :this.Uv(a, b), 
this.Nl(a, d, e, l), this.Ml(a), a = l, this[I] == Jq && this.ga && (a = {
S:this.ga.S,
l:this.ga.l,
v:j,
length:l,
a:this.Rt
}), b = l, this[I] == Jq && (b = Rr(this.A, function(a) {
return {
S:a.S,
l:a.l,
v:j,
length:l,
a:this.ce
};
}, this), c = this.Vv(b)) && (c = Rr(c, function(a) {
return {
S:this.Ep(a),
l:a,
v:j,
length:l,
a:this.Gi
};
}, this), as(b, c)), {
Q:b,
ga:a
};
}, Y.fw = function(a, b, c) {
this.dj(), es(this.oh);
for (var d = r, e = 1; e < this.oh[L]; ++e) {
var f = this.oh[e] - this.oh[e - 1];
f && (d = s.min(d, f));
}
return e = Z(this.s, this), e = new Hz(Kz, 3, Lz, this.i, e), f = {
Z:this.Z,
ce:this.ce,
ih:this.ih,
Gi:this.Gi
}, d = e.Yv(this.n.Ed(this.n.X), this.n.Ed(this.n.da), d, Z(this.lg, this), f, a.wb), 
this.Nl(a, b, c, d.Nc), this.Ml(a), {
Q:d.Q,
ga:l
};
}, Y.Uv = function(a, b) {
var c;
this.Sc == Wj ? (this.B.min == -r ? this.B.min = s.min(0, this.B.max - 1) :this.B.max == r && (this.B.max = s.max(a.r[L], this.B.min + 1)), 
c = this.B.max - this.B.min) :(this.B.min = 0, this.B.max = a.r[L], c = a.r[L]), 
this[I] == zi && (c = s.max(1, c - 1)), this.St && (c = s.min(c, s[D]((b + 1) / 2))), 
this.fh = this.hp(), this.ah = this.Ei / c, this.A = vw(a.r[L], function(b) {
var e = b - this.fh;
return {
S:a.r[b][C],
l:this.Ka(b),
text:a.r[b].Wk[0],
v:e >= 0 && c >= e
};
}, this);
}, Y.Rv = function() {
this.V(this.n.ha(this.Ji)), this.n.Gv(this.Db, this.Mb, this.Sc == In || this.rq()), 
this.rq() && (this.n.A = Qr(this.n.A, function(a) {
return a >= this.B.min && a <= this.B.max;
}, this)), this.dj(), this.A = Rr(this.n.A, function(a) {
var b = this.n.Ed(a), c = this.n.Iv(b);
return {
S:b,
l:this.Ka(a),
text:c,
v:j
};
}, this);
}, Y.Sv = function(a) {
this.dj();
var b = this.ej(a), c = new ez();
c.Nh(this.eh);
var d = b.ng, e = b.mg - 1, a = new Gz(a.wb, this.Z);
if (b.gg) var f = d, d = e, e = f;
for (b = new Fz(new tz(this.n.X, this.n.da, d, e), this.eh, a, c, 10, b[Wb], j).sj(), 
this.A = [], c = 0; c < b[L]; c++) d = b[c], d.te && this.A[x]({
S:this.n.Ed(d[J]()),
l:d.nb(),
text:d.te,
v:j
});
}, Y.Vv = function(a) {
if (!a || 1 >= a[L] || 0 == this.ml) return l;
for (var b = (a[1].l - a[0].l) / (this.ml + 1), c = [], d = a[0].l, e = s[D]((d - this.ac) / b), f = e; f > 0; f--) {
var g = s[D](d - b * f);
1 < s.abs(g - this.ac) && c[x](g);
}
for (f = 0; f < a[L] - 1; f++) for (d = a[f].l, e = 0; e < this.ml; e++) d += b, 
c[x](s[D](d));
for (d = Mr(a).l, e = s[D]((this.xb - d) / b), f = 1; e >= f; f++) g = s[D](d + b * f), 
1 < s.abs(g - this.xb) && c[x](g);
return c;
}, Y.dj = function() {
var a = oa(this.B.min) && !ga(this.B.min) ? this.B.min :this.n.X, b = oa(this.B.max) && !ga(this.B.max) ? this.B.max :this.n.da;
if (this.ah = this.Ei / (b - a), this.fh = a, this.Ji != l) a = this.n.ha(this.Ji); else var c = this.n.ha(this.n.Gm()), a = is(c, a, b);
this.ga = this.Rc(a) ? {
S:this.n.Ed(a),
l:this.Ka(a)
} :l;
}, Y.Tv = function(a) {
if (this.V(this.Db), this.V(this.Mb), this.Sc == In) {
var b;
if (b = new mv(this.n.X, this.n.da), b[Q] != b.end) {
var c = .1 * (b.end - b[Q]);
b = new mv(0 > b[Q] ? -Dz(-b[Q], c) :Az(b[Q], c), 0 > b.end ? -Az(-b.end, c) :Dz(b.end, c));
}
this.V(b[Q]), this.V(b.end);
}
this.dj();
var d = this.ej(a), e = this.n.Zl(this.n.X), f = this.n.Zl(this.n.da), g = ex(this.i, this.s(om), this.s(mo)) == zn ? 1 :0, i = d.ng, k = d.mg - 1;
b = this.Hi;
var c = d[Wb], m = new Gz(a.wb, this.Z), a = this.Zu(this.i);
if (d.gg && (d = i, i = k, k = d), e == f) b = (k - i) / 2 + i, c = a[Fb](e), b = [ jz(e, b, c) ]; else {
if (e = 1 == g ? new tz(e, f, i, k) :new qz(e, f, i, k, g, b), e.Ye() == e.Xe()) f = 1; else {
var g = s.min(e.$e(), e.se()), i = s.max(e.$e(), e.se()), k = s.abs(e.hc(g)), d = s.abs(e.hc(i)), f = s.max(k, d), p = 0, q = e.ua(0);
(g > q || q > i) && (p = s.min(k, d)), g = e.ua(p), f = e.ua(f), f = s.abs(e.hc(g + 10) - e.hc(g)) / s.abs(e.hc(f + 10) - e.hc(f));
}
b = (f > .65 ? new sz(e, a, m, c, 40) :new vz(e, a, m, c, 40, b)).sj();
}
for (this.A = [], c = 0; c < b[L]; c++) a = b[c], this.A[x]({
S:a[J](),
l:a.nb(),
text:a.te,
v:j
});
}, Y.Zu = function(a) {
var b = new fz(), c = a.Xl(this.s(ok));
return c ? b.$x(c) :(c = a.Hd(this.s(rk)), rr(c) && b.Xx(c), c = a.Hd(this.s(sk)), 
rr(c) && b.Yx(c), (c = a.O(this.s(tk))) && b.Zx({
symbol:c.symbol,
position:c[pc],
usePadding:c.usePadding
}), a.$(this.s(uk)) && b.ay(5)), b.Vx();
}, Y.V = function(a) {
this[I] == Jq && a != l && this.Rc(a) && (this.n.V(a), this.oh[x](a));
}, Y.Au = function() {
if (this[I] == Jq) {
var a = this.n, b = .01 * (a.da - a.X);
0 < a.X && this.B.min == -r && (a.X = s.max(a.X - b, 0)), 0 > a.da && this.B.max == r && (a.da = s.min(a.da + b, 0));
}
}, Y.Ka = function(a) {
return a == l ? l :this.ac + (a - this.fh) * this[bb] * this.ah;
}, Y.gB = function(a) {
return a == l ? l :(a - this.ac) * this[bb] / this.ah + this.fh;
}, Y.Fq = function(a) {
return this[I] == Jq ? this.n.ha(a) :a;
}, Y.Ed = function(a) {
return a == l ? l :this[I] == Jq ? this.n.Ed(a) :a;
}, Y.Ep = function(a) {
return a = this.gB(a), a == l ? l :this.Ed(a);
}, Y.lg = function(a) {
return this.Ka(this.Fq(a));
}, Y.hp = function() {
switch (this[I]) {
case Jq:
case zi:
return this.B.min;

case vi:
return this.B.min - .5;
}
}, Y.yv = function() {
switch (this[I]) {
case Jq:
return this.B.max;

case zi:
return this.B.max - 1;

case vi:
return this.B.max - .5;
}
}, Y.Rc = function(a) {
return this[I] == Jq ? a >= this.B.min && a <= this.B.max :a >= s[D](this.B.min) && a < s[lb](this.B.max);
}, Y.nr = function(a) {
return a * this[bb] > this.xb * this[bb];
}, Y.$w = function(a) {
return a * this[bb] < this.ac * this[bb];
}, Y.Gp = function() {
return this.n != l && this.n[Bc] == hx;
}, Y = Nz[M], Y.ex = function(a) {
return 1 >= this.Ee[L] ? this.hr :s.abs(this.Ee[1].l - this.Ee[0].l) * a - this.Fy;
}, Y.rk = function(a, b, c) {
return a = s[lb]((this.Ee[L] - a) / (b * c)), 2 > this.Ee[L] || 2 > a;
}, Y.Lz = function(a, b, c, d) {
for (var a = Oz(a, this.Ee[L], c, this.Rw), e = this.ex(c), f = []; a < this.Ee[L]; a += c) {
var g = this.Ee[a], i = g.v && !this.Ow ? s.min(e, 2 * g.l, 2 * (this.hr - g.l)) :e, k = this.ir(g[z], i, d), m = k.la;
e > i && (m = this.ir(g[z], e, d).la), f[x]({
S:g.S,
v:g.v,
l:g.l,
Eo:b,
text:g[z],
width:k.ec,
me:k,
la:m
});
}
return f;
}, Y.Cr = function(a, b, c) {
for (var d = a * b, c = a > 1 ? 1 :c, e = [], f = 0; a > f; f++) {
var g = this.Lz(this.Ey + f * b, f * c, d, c);
as(e, g);
}
return es(e, function(a, b) {
return a.l - b.l;
}), e;
}, Y.Fn = function(a, b) {
var c = this.Cr(a, b, this.wx);
return Sr(c, function(a, b) {
return {
pe:s.max(a.pe, b.me.f[L]),
la:a.la || b.la
};
}, {
pe:0,
la:n
});
}, Y.tl = function() {
for (var a = 1, b = this.lk || 1, c = this.Fn(a, b), d = a; c.la && a < this.$r && (a++, 
!this.rk(0, a, b)); ) d = a, c = this.Fn(d, b);
if (a = b, !this.lk) for (;c.la && (b++, !this.rk(0, d, b)); ) a = b, c = this.Fn(d, a);
return {
ql:d,
We:a,
pe:c.pe * d
};
}, Y.Qn = function(a, b, c, d) {
return a = this.Cr(a, b, c), d = Sr(a, function(a, b) {
var c = b.la ? 1 :0;
return delete b.la, a + c;
}, 0) <= a[L] * d, {
aj:a,
Es:d
};
}, Y.Mo = function(a, b, c, d) {
for (var e = s.min(this.$r, c), a = s.min(a, e), b = this.lk || b, f = this.Qn(a, b, c, d), g = a; !f.Es && e > a && (a++, 
!this.rk(0, a, b)); ) g = a, f = this.Qn(g, b, c, d);
if (e = b, !this.lk) for (;!f.Es && (b++, !this.rk(0, g, b)); ) e = b, f = this.Qn(g, e, c, d);
return {
ql:g,
We:e,
aj:f.aj
};
}, Ar(Pz, Mz), Y = Pz[M], Y.Kq = function() {
return bl + this[sc];
}, Y.Wl = function(a, b, c) {
return this.Kr(a, a.b[y], 1 == this[bb] ? a.b[F] :a.b[T], b, c);
}, Y.Nl = function(a, b, c, d) {
if (0 == this[sc]) {
var t, w, e = a.wb, f = this.Z[N], g = this[oc].u[N], i = b.w[N], k = a.Xg == cn ? this[oc][z] :U, m = this, p = new Nz(a[y], this.A, this.wo, this.xo, this.hl, this.Yi, this.el, this.yo, this.vo, function(a, b, c) {
return Tx(e, a, m.Z, b, c);
}), q = this.Yi || 1;
this.tc != cn || d || (this.kl != l ? this.kl ? w = this.gj(e) :t = p.tl() :this.A[L] * f / (this.hl * q) <= a[y] ? (t = p.tl(), 
(t.We > q || 0 == t.pe) && (w = this.gj(e), t = l)) :w = this.gj(e));
var A = Tx(e, k, this[oc].u, a.b[y], r), E = this.kd, K = s.max(E, s[B](f / 1.618)), V = s.max(E, s[B](f / 3.236)), G = function() {
return {
key:Mp,
min:w.minHeight + E,
max:w.maxHeight + E,
T:[ K - E ]
};
}, ka = [];
ka[x]({
key:ei,
min:E,
T:[ r ]
}), 0 < A.f[L] && ka[x]({
key:Pp,
min:g + E,
T:[ r ]
}), b.nb() == di && ka[x]({
key:Kl,
min:i + E,
T:[ r ]
}), c.nb() == di && ka[x]({
key:kj,
min:c.uc() + E,
T:[ r ]
});
var Wa = ka[L];
d || t && 0 < t.pe ? ka[x]({
key:Mp,
min:f + E,
T:[ K - E ]
}) :w && ka[x](G());
var fb = ka[L];
if (t) for (var fa = 1; fa < t.pe; fa++) ka[x]({
key:Mp,
min:f + E,
T:[ V - E ]
});
for (f = ka[L], fa = 1; fa < A.f[L]; fa++) ka[x]({
key:Pp,
min:g + E,
T:[ this.lo - E ]
});
var Hb, g = yw(ka, a[S] - a.b[R]), za = g.ticks || [];
t && (Hb = p.Mo(t.ql, t.We, za[L], 0), this.kl == l && Hb.We > q && (Hb = t = l, 
w = this.gj(e), ka[Wa] = G(), ka = zw(ka, 0, fb, f, aa), g = yw(ka, a[S] - a.b[R])));
var Ga = a.b[R], za = g.ticks || [];
if (0 < za[L]) {
for (fa = 1; fa < za[L]; fa++) za[fa] += za[fa - 1];
if (d) {
for (p = Ga + za[0], fa = 0; fa < d[L]; fa++) q = d[fa].m, Ua(q, q[Sc] || {
x:0
}), q[Sc].y = p;
this.Nc = d;
} else t ? this.Nc = Rr(Hb.aj, function(a) {
var b = Rr(a.me.f, function(b, c) {
return {
x:0,
y:za[a.Eo + c],
length:a[y],
text:b
};
}, this);
return {
S:a.S,
v:a.v,
m:{
text:a[z],
u:this.Z,
f:b,
Va:Ci,
Oa:Uj,
G:a.me.la ? a[z] :U,
anchor:{
x:a.l,
y:Ga
}
}
};
}, this) :w && (fa = za[0], d = s.min(fa - E, w.maxHeight), this.Nc = this.cu(e, Ga + fa - d, d, w.We));
Ga += Mr(za);
}
if (d = g[oc] || [], 0 < d[L]) for (p = Tx(e, k, this[oc].u, a.b[y], d[L]), this[oc].G = p.la ? k :U, 
fa = 0; fa < d[L]; fa++) Ga += d[fa], this[oc].Oa = Uj, this[oc].f[x]({
x:a.b[F] + a.b[y] / 2,
y:Ga,
length:a.b[y],
text:p.f[fa]
});
k = g.legend || [], 0 < k[L] && (Ga += k[0], b.gd(new xt(Ga - i, a.b[T], Ga, a.b[F]))), 
b = g.colorBar || [], 0 < b[L] && (Ga += b[0], a = new xt(Ga - c.uc(), a.b[T], Ga, a.b[F]), 
c.gd(a));
}
}, Y.gj = function(a) {
function b(b) {
return b = a(b[z], c)[y] * e + d * f, s[lb](b);
}
var c = this.Z, d = c[N], e = s.sin(this.qj), f = s.cos(this.qj), g = this.Yi;
g || (g = 2 > this.A[L] ? 1 :s[lb]((d + this.kd) / e / s.abs(this.A[1].l - this.A[0].l)));
for (var i = 0, k = 0; k < this.A[L]; k += g) i = s.max(b(this.A[k]), i);
return k = b({
text:He
}), {
minHeight:s.min(i, k),
maxHeight:i,
We:g
};
}, Y.cu = function(a, b, c, d) {
for (var e = Oz(0, this.A[L], d, this.el), c = (c - this.Z[N] * s.cos(this.qj)) / s.sin(this.qj), c = s[D](c), f = []; e < this.A[L]; e += d) {
var g = this.A[e], i = Tx(a, g[z], this.Z, c, 1), k = {
text:g[z],
u:this.Z,
f:[],
Dd:-this.Iu,
Va:Uj,
Oa:gp,
G:i.la ? g[z] :U,
anchor:{
x:g.l,
y:b
}
};
0 < i.f[L] && k.f[x]({
x:0,
y:0,
length:c,
text:i.f[0]
}), f[x]({
S:g.S,
v:g.v,
m:k
});
}
return f;
}, Y.Ml = function(a) {
if (0 == this[sc]) {
var e, b = a.wb, c = this.Z[N], d = new Nz(a[y], this.A, this.wo, this.xo, this.hl, this.Yi, this.el, this.yo, this.vo, Z(function(a, c, d) {
return Tx(b, a, this.Z, c, d);
}, this));
this.tc == ql && (e = d.tl());
var m, p, f = this.kd, g = s.max(this.kd, s[B](c / 3.236)), i = s.max(this.kd, s[B](c / 1.618)), i = this[I] == Jq ? g :i, k = s.max(f, s[B](c / 3.236));
if (this[I] == Jq ? this.oo == hl ? (m = gp, p = g) :(m = Uj, p = -g) :(m = Ci, 
p = 0), g = [], g[x]({
key:kq,
min:f,
T:[ r ]
}), e) for (var q = 0; q < e.pe; q++) g[x]({
key:Mp,
min:c + f,
T:[ (0 == q ? i :k) - f ]
});
var t = yw(g, s[D](a.b[S] / 2)).ticks || [];
if (0 < t[L]) {
for (q = 1; q < t[L]; q++) t[q] += t[q - 1];
c = d.Mo(e.ql, e.We, t[L], .5), this.Nc = Rr(c.aj, function(b) {
var c = b.me.f;
return c[jb](), c = Rr(c, function(a, c) {
return {
x:0,
y:-t[b.Eo + c],
length:b[y],
text:a
};
}, this), {
S:b.S,
v:b.v,
m:{
text:b[z],
u:this.Z,
f:c,
Va:m,
Oa:gp,
G:b.me.la ? b[z] :U,
anchor:{
x:p + b.l,
y:a.b[R]
}
}
};
}, this);
}
}
}, Y.ej = function(a) {
var b = {};
return b.gg = -1 == this[bb], b.ng = a.b[F], b.mg = a.b[T], Fa(b, il), b;
}, Y.Iq = function(a) {
return 0 == this[sc] ? {
l:a.b[R],
direction:-1
} :{
l:a.b.top,
direction:1
};
}, Ar(Qz, Mz), Y = Qz[M], Y.Kq = function() {
return Iq + this[sc];
}, Y.Wl = function(a, b, c) {
return this.Kr(a, a.b[S], 1 == this[bb] ? a.b.top :a.b[R], b, c);
}, Y.Nl = function(a) {
var b = a.wb, c = this.Z[N], d = this[oc].u[N], e = a.Xg == cn ? this[oc][z] :U, f = this.kd, g = Sr(this.A, function(a, c) {
return s.max(a, b(c[z], this.Z)[y]);
}, 0, this), i = b(He, this.Z)[y], i = s.min(i, g), k = Tx(b, e, this[oc].u, a.b[S], r), m = [];
for (this.tc == cn ? m[x]({
key:co,
min:f,
T:[ c - f ]
}) :m[x]({
key:co,
min:0,
T:[ r ]
}), 0 < k.f[L] && m[x]({
key:Pp,
min:d + f,
T:[ r ]
}), this.tc == cn && m[x]({
key:Mp,
min:i + f,
max:g + f,
T:[ r ]
}), c = 1; c < k.f[L]; c++) m[x]({
key:Pp,
min:d + f,
T:[ this.lo - f ]
});
var d = yw(m, 0 == this[sc] ? a.b[F] :a[y] - a.b[T]), p = 0 == this[sc] ? 0 :a[y], k = d[oc] || [];
if (0 < k[L]) for (m = Tx(b, e, this[oc].u, a.b[S], k[L]), this[oc].G = m.la ? e :U, 
c = 0; c < k[L]; c++) p += k[c] * (0 == this[sc] ? 1 :-1), this[oc].Dd = -90, this[oc].Oa = 0 == this[sc] ? Uj :gp, 
this[oc].f[x]({
x:p,
y:a.b.top + a.b[S] / 2,
length:a.b[S],
text:m.f[c]
});
if (this.tc == cn) {
var e = d.ticks[0] || 0, p = p + e * (0 == this[sc] ? 1 :-1), q = s.min(g, e - f);
this.Nc = i > q ? [] :Rr(this.A, function(b, c) {
var d = 0 == this[sc] ? Uj :gp, e = Ci;
return this.Tt == fi && (0 == c && (e = 1 == this[bb] ? gp :Uj), c == this.A[L] - 1 && (e = 1 == this[bb] ? Uj :gp)), 
this.fq(a, b, p, q, d, e, 0);
}, this);
}
}, Y.Ml = function(a) {
var f, g, b = a.wb, c = this.Z[N], d = this.kd, e = s.max(this.kd, s[B](c / 3.236)), c = s.max(this.kd, s[B](c / 1.618)), c = this[I] == Jq ? e :c;
this[I] == Jq ? this.oo == hl ? (f = Uj, g = e) :(f = gp, g = -e) :(f = Ci, g = 0);
var e = Sr(this.A, function(a, c) {
return s.max(a, b(c[z], this.Z)[y]);
}, 0, this), i = b(He, this.Z)[y], i = s.min(i, e), k = [];
k[x]({
key:co,
min:d,
T:[ r ]
}), this.tc == ql && k[x]({
key:Mp,
min:i + d,
max:e + c,
T:[]
});
var c = yw(k, a.b[y] / 2), m = 0 == this[sc] ? a.b[F] :a.b[T];
if (this.tc == ql) {
var c = c.ticks[0] || 0, p = s.min(e, c - d), m = m + (c - p) * (0 == this[sc] ? 1 :-1);
this.Nc = Rr(this.A, function(b) {
return this.fq(a, b, m, p, 0 == this[sc] ? gp :Uj, f, g);
}, this);
}
}, Y.fq = function(a, b, c, d, e, f, g) {
var a = Tx(a.wb, b[z], this.Z, d, 1), i = Rr(a.f, function(a) {
return {
x:0,
y:0,
length:d,
text:a
};
}, this);
return {
S:b.S,
v:b.v,
m:{
text:b[z],
u:this.Z,
f:i,
Va:e,
Oa:f,
G:a.la ? b[z] :U,
anchor:{
x:c,
y:b.l - g
}
}
};
}, Y.ej = function(a) {
var b = {};
return b.gg = -1 == this[bb], b.ng = a.b.top, b.mg = a.b[R], Fa(b, Mq), b;
}, Y.Iq = function(a) {
return 0 == this[sc] ? {
l:a.b[F],
direction:1
} :{
l:a.b[T],
direction:-1
};
}, Y = Rz[M], Y.uv = function() {
for (var a = this.g, b = this.D, c = a.J == no ? function() {
return no;
} :Z(function(b) {
return this.i.U(Bo + b + Se, xx, a.ko);
}, this), d = [], e = [], f = l, g = l, i = 0, k = [], m = 0; m < b[tb](); ++m) {
var p = b[Mb](m), q = b.getColumnProperty(m, fo) || (0 == m ? Nj :xj);
0 == m && q != Nj && h(u("First column must be a domain column")), q == Nj && (i > 0 && h(u("Unexpected domain column (column #" + m + we)), 
f = {
K:{},
dataType:p
}, g = {
ba:l,
Hc:e[L]
}, e[x](f)), q == xj && 0 == i && (g = d[L], i = c(g), f = {
type:i,
dataType:p,
K:{}
}, g = {
ba:g,
Hc:l
}, d[x](f), i = i == ui ? 4 :1), q == xj && (i--, p != f[Qc] && h(u("All data columns of the same series must be of the same data type"))), 
q == Xp && f.K[q] && h(u("Only one data column with role 'tooltip' per series is allowed")), 
f.K[q] = f.K[q] || [], k[x]({
ba:g.ba,
Hc:g.Hc,
Sk:q,
Ok:f.K[q][L]
}), f.K[q][x](m);
}
for (i > 0 && h(u("Last serie does not have enough data columns (missing " + i + we)), 
f = 0, c = e[0][Qc], m = 0; m < d[L]; ++m) e[L] <= f && h(u("Serie #" + m + " does not have a domain column.")), 
(p = e[f + 1]) && p.K[Cb][0] <= d[m].K[C][0] && (++f, c != e[f][Qc] && h(u("All domains must be of the same data type"))), 
d[m].Hc = f;
a.r = [], a.Me = {};
for (var t = 0; t < b[mc](); t++) m = b.getTableRowIndex(t), f = b[J](t, 0), p = Rr(e, function(a) {
return b[kd](t, a.K[Cb][0]) || U;
}), f = {
data:f,
Wk:p,
Oe:m
}, (p = e[0].K.tooltip) && (f.qa = this.Ki(p[0], t)), a.r[x](f), a.Me[m] = t;
for (a.d = [], t = 0; t < d[L]; t++) m = this.eu(t, d[t]), a.d[x](m);
for (a.Sf = k, a.be = e, a.ph = c, a.gb = {}, a.qh = {}, this.dl = new Lu(), t = 0; t < a.d[L]; ++t) d = a.d[t], 
this.dl.add(d.Ia), e = a.qh[d.Ia], e != l ? e != d[Qc] && h(u("All series on a given axis must be of the same data type")) :a.qh[d.Ia] = d[Qc], 
a.gb[d[I]] = (a.gb[d[I]] || 0) + 1;
for (a.wd = [], d = 0; d < a.d[L]; d++) e = a.d[d], a.wd[x]({
id:e.id,
text:e.Pk,
a:new vv({
fill:e[zb][zb]
}),
index:d,
v:e.Fi
});
}, Y.eu = function(a, b) {
var c = b[I], d = b.K, e = b.Hc, f = this.i, g = Bo + a + Ge, i = d[C], k = this.D.getTableColumnIndex(i[0]), m = this.D[Jb](i[0]) || U, p = c == no ? 0 :2, q = f.R([ g + Cn, Cn ], c == no ? 7 :0), t = c == hm || c == wh || c == no ? q > 0 :j;
0 == q && (q = c == no ? 7 :6), q /= 2, q > 0 && (q += 1);
var w = f.O(g + aj, this.Yf[a % this.Yf[L]]), w = Yy(w), A = l;
(c == wh || c == jp) && (A = f.Uf([ g + xh, xh ]), A = xv(w[zb], A));
var E = l;
if (c == ui) var E = new vv({
stroke:w[zb],
Aa:2,
fill:w[zb]
}), K = new vv({
stroke:w[zb],
Aa:2,
fill:ke
}), V = f.$(si), G = V ? E :K, E = {
kv:f.Ne([ g + ti, ti ], V ? K :E),
jv:f.Ne([ g + ri, ri ], G)
};
return p = f.R([ g + jm, jm ], p), K = yv(w[zb], p), V = c == jp ? A :xv(w[zb]), 
G = this.lv(d, f, g, w), {
id:this.D.getColumnId(i[0]),
title:m,
dataType:b[Qc],
v:j,
Oe:k,
K:d,
Hc:e,
Ha:G,
color:w,
Ko:V,
Pa:K,
po:A,
Yp:E,
type:c,
Mi:f.Ke(g + br, 0),
lineWidth:p,
Bu:q,
Vt:12,
Wf:f.U([ g + sj, sj ], Nx, X),
Rk:f.R([ g + Yo, Yo ], 1),
Do:t,
c:[],
ro:[],
Ia:f.R([ g + zp, zp ], 0),
Fi:f.$(g + Sq, j),
Pk:f.ud(g + Hl, m)
};
}, Y.lv = function(a, b, c, d) {
function e(a, b) {
return [ c + zl + a + Ge + b, c + Al + b, zl + a + Ge + b, Al + b ];
}
var f = a.interval;
if (!f) return l;
for (var a = {
ue:[],
bf:[],
oj:[],
c:[],
areas:[],
f:[],
mh:{}
}, g = {}, i = 0; i < f[L]; i++) {
var k = f[i], m = this.D.getColumnId(k) || this.D[Jb](k) || Gj, p = b.gh(e(m, up), yx);
switch (p) {
case Jh:
a.ue[x](k);
break;

case lp:
a.bf[x](k);
break;

case hi:
a.oj[x](k);
break;

case Dn:
a.c[x](k);
break;

case wh:
a[md][x](k);
break;

case hm:
a.f[x](k);
break;

case X:
break;

default:
h(u("Invalid interval style: " + p));
}
m in g ? g[m][x](k) :g[m] = [ k ];
}
1 < a.ue[L] && 0 == a.bf[L] && (a.bf = [ a.ue[0], a.ue[a.ue[L] - 1] ]), 0 != a.bf[L] % 2 && h(u("Stick-intervals must be defined by an even number of columns")), 
0 != a[md][L] % 2 && h(u("Area-intervals must be defined by an even number of columns"));
for (m in g) for (var p = b.R(e(m, jm)), i = b.Uf(e(m, $j)), k = b.Tk(e(m, aj), us(zx), U), k = Sz(k, d), i = new vv({
stroke:k,
fill:k,
Cb:i,
Aa:p
}), k = b.R(e(m, Ih)), f = b.R(e(m, Fo)), q = b.R(e(m, gi)), t = b.R(e(m, Cn)), p = b.gh(e(m, up), yx), w = b.$(e(m, xl)[pb]([ c + xl, xl ])), A = b.U(e(m, sj)[pb]([ c + sj, sj ]), Nx, X), E = b.R(e(m, Yo)[pb]([ c + Yo, Yo ]), 1), p = {
style:p,
a:i,
ou:k,
qu:f,
pu:q,
bu:t,
ae:w,
Wf:A,
Rk:E
}, f = g[m], i = 0; i < f[L]; ++i) k = f[i], a.mh[k] = p;
return a;
}, Y.tv = function() {
var a = this.g;
switch (a.J) {
case W:
Fa(a, this.i.U(bn, Ex, U)), a[Wb] || h(u("Unspecified orientation.")), this.Ba = {}, 
this.pb = {}, this.hb = {};
var b, c, d, e;
switch (a[Wb]) {
case il:
d = Pz, e = this.pb, b = Qz, c = this.hb;
break;

case Mq:
d = Qz, e = this.hb, b = Pz, c = this.pb;
}
for (var f = this.dl.Be(), g = 0; g < f[L]; ++g) {
var i = f[g], k = new b(a, this.i, [ xp + i, yp ], i, Jq, In);
k[I] != Jq && h(u("Target-axis must be of type value")), this.Ba[i] = k, c[i] = k;
}
this.ea = new d(a, this.i, [ Oj ], 0, this.nw(), xm), e[0] = this.ea;
break;

case no:
case ji:
this.pb = {
"0":new Pz(a, this.i, [], 0, Jq, In)
}, this.hb = {
"0":new Qz(a, this.i, [], 0, Jq, In)
};
}
this.ow();
}, Y.nw = function() {
if (this.D[Mb](0) == op) {
var a = this.Xz();
return this.Yz(a);
}
return Jq;
}, Y.Xz = function() {
var a = [ hm, wh, jp, Jh, ui ], b = {};
Pr(a, function(a, c) {
b[a] = c;
});
var c = Sr(this.g.d, function(a, c) {
return s.max(a, b[c[I]]);
}, 0);
return a[c];
}, Y.Yz = function(a) {
switch (a) {
case wh:
return 1 < this.g.r[L] ? zi :vi;

case hm:
case Jh:
case jp:
case ui:
return vi;
}
return l;
}, Y.ow = function() {
var a = this.g;
switch (a.J) {
case no:
case ji:
a.ph == op && h(u("X values column cannot be of type string"));
var b = a.qh[0];
b == op && h(u("Data column(s) cannot be of type string"));
var c = this.pb[0], d = this.hb[0];
c[I] != Jq && h(u("The x-axis must be of type value")), c.Qj(a.ph, this.i), d[I] != Jq && h(u("The y-axis must be of type value")), 
d.Qj(b, this.i);
break;

case W:
b = this.ea, b[I] == Jq && (a.ph == op && h(u("Domain column cannot be of type string, it should be the X values on a continuous domain axis")), 
b.Qj(a.ph, this.i)), rs(this.Ba, function(b, c) {
var d = a.qh[c];
d == op && h(u("Data column(s) for axis #" + c + " cannot be of type string")), 
b.Qj(d, this.i);
}, this);
}
rs(this.pb, function(a) {
a.Wq();
}), rs(this.hb, function(a) {
a.Wq();
});
}, Y.Nu = function() {
if (this.pm() === l) return [];
for (var a = (this.g.be[0].K[Cb] || [])[0], b = [], c = l, d = this.D, e = 0; e < d[mc](); e++) {
var f = d[J](e, a), g = this.jg(e);
c !== l && g != l && (0 > g && h(u("Invalid gap value (" + g + ") in data row #" + e + ". Gap value must be non-negative.")), 
b[x]({
mx:c,
kx:f,
lx:g
})), c = f;
}
return b;
}, Y.Mp = function() {
return this.hb[0] != l;
}, Y.Vl = function() {
return this.hb[1] != l;
}, Y.Em = function() {
return this.qe && this.qe.pt() ? l :this.Mp() && this.Vl() ? jq :this.Vl() ? Jl :bo;
}, Y.ew = function() {
return this.qe && this.qe.pt() ? jq :l;
}, Y.Tu = function() {
for (var a = this.g, b = this.D, c = this.ea, d = 0; d < a.r[L]; d++) {
for (var e = 0; e < a.d[L]; e++) {
var f = a.d[e], g = this.Ba[f.Ia], f = b[J](d, f.K[C][0]), f = g.n.jf(f);
f != l && g.zg(f);
}
c[I] == Jq && (e = b[J](d, 0), e = c.n.jf(e), c.zg(e));
}
}, Y.Uu = function() {
for (var a = this.g, b = this.D, c = this.pb[0], d = this.hb[0], e = 0; e < b[mc](); e++) for (var f = 0; f < a.d[L]; f++) {
var g = a.d[f], i = g.K[C][0], g = b[J](e, a.be[g.Hc].K[Cb][0]), i = b[J](e, i), g = c.n.jf(g), i = d.n.jf(i);
g != l && c.zg(g), i != l && d.zg(i);
}
}, Y.Cm = function(a, b) {
var c = this.g;
if (this.ma = a, this.cc = b, this.Ru(), c.vd && rs(this.Ba, function(a) {
a.V(0);
}), c.J == W) this.Tu(), this.ea[I] == Jq && this.ea.tg(this.Nu()), this.ea.uj(this.i), 
rs(this.Ba, function(a) {
a.tg(), a.uj(this.i);
}, this); else {
var d = this.pb[0], e = this.hb[0];
c.J == ji ? this.qe.Su(d, e) :c.J == no && this.Uu(), d.tg(), d.uj(this.i), e.tg(), 
e.uj(this.i);
}
c.gb.bars && this.Np(Jh), c.gb.steppedArea && (this.ea[I] == Jq && h(u("Stepped area series with value domain axis is not supported.")), 
this.Np(jp)), c.gb.candlesticks && this.Lu(), c.gb.line && (this.Ou(), this.Op()), 
c.gb.area && this.Ju(), c.gb.scatter && (this.Pu(), this.Op()), c.gb.bubbles && this.qe.Ku(this.pb[0], this.hb[0], b), 
c.Ja = ss(this.pb, function(d) {
return d.Wl(c, a, b);
}), c.va = ss(this.hb, function(d) {
return d.Wl(c, a, b);
}), this.Qu(), this.Mu(), this.Wu(), c.J == W && c[Wb] == il && this.Vu();
var d = this.ma.nb(), e = this.ma.w[N], f = l;
d != bo && d != Il || this.Vl() || (f = new xt(c.b.top, c[y] - e, c.b[R], c.b[T] + e)), 
d == Jl && !this.Mp() && (f = new xt(c.b.top, c.b[F] - e, c.b[R], e)), f && f[T] >= f[F] && this.ma.gd(f), 
this.Xu();
}, Y.Ru = function() {
var a = this.g, b = this.pa, c = ts(this.pb)[oc].u, d = s.max(a[oc].u[N], c[N]), e = this.ma.w[N], f = this.ma.nb(), g = this.cc.w[N], i = this.cc.nb(), k = a.Qf == ql ? a[oc][z] :U, m = U, p = U;
if (a.Xg == ql) {
var q = function(a) {
var b = vs(a);
return es(b), b = Rr(b, function(b) {
return a[b][oc][z];
}), Qr(b, function(a) {
return a != U;
})[pd](ye);
};
switch (a.J) {
case no:
case ji:
m = q(this.pb), p = q(this.hb);
break;

case W:
m = q({
"0":this.ea
}), p = q(this.Ba);
}
}
var m = m && p ? m + yd + p :m ? m :p ? p :U, p = s.max(2, s[B](d / 1.618)), t = s.max(2, s[B](e / 1.618)), w = s.max(2, s[B](g / 1.618)), A = a.b[y] - 2 * p, g = Tx(b, k, a[oc].u, A, 1), q = 0 < g.f[L] ? g.f[0] :U, E = b(q, a[oc].u)[y], K = s[B](s.max(2, 1.618 * d)), A = s.max(A - E - K, 0), b = Tx(b, m, c, A, 1), K = 0 < b.f[L] ? b.f[0] :U, V = [];
V[x]({
key:ei,
min:2,
T:[ r ]
}), (q || K) && V[x]({
key:Pp,
min:d + 2,
T:[ p - 2 ]
}), f == ql && V[x]({
key:Kl,
min:e + 2,
T:[ t - 2 ]
}), i == ql && V[x]({
key:kj,
min:this.cc.uc() + 2,
T:[ w - 2 ]
}), f = yw(V, s[D](a.b[S] / 2)), d = a.b.top, i = f[oc] || [], 0 < i[L] && (d += i[0], 
q && (a[oc].f[x]({
text:q,
x:a.b[F] + p,
y:d,
length:E
}), a[oc].G = g.la ? k :U), K) && (a.bh = {
text:m,
u:c,
f:[],
Va:Uj,
Oa:Uj,
G:b.la ? m :U
}, a.bh.f[x]({
text:K,
x:a.b[T] - p,
y:d,
length:A
})), c = f.legend || [], 0 < c[L] && (d += c[0], this.ma.gd(new xt(d - e, a.b[T], d, a.b[F]))), 
e = f.colorBar || [], 0 < e[L] && (d += e[0], a = new xt(d - this.cc.uc(), a.b[T], d, a.b[F]), 
this.cc.gd(a));
}, Y.Np = function(a) {
this.g.vd ? this.My(a) :this.Ly(a);
}, Y.My = function(a) {
for (var b = this.g, c = this.D, d = this.ea, e = 0; e < b.r[L]; e++) for (var f = 0 == this.jg(e), g = ss(this.Ba, function() {
return [ 0, 0 ];
}), i = 0; i < b.d[L]; i++) {
var k = b.d[i];
if (k[I] == a) {
var m = k.c;
if (f) m[x](l); else {
var p = k.Ia, q = this.Ba[p], t = c[J](e, k.K[C][0]), t = q.n.ha(t);
if (t === l) m[x](l); else {
var w = this.$f(e);
d.V(w);
var A = t > 0 ? 0 :1, p = g[p];
d.Rc(w) && q.V(p[A] + t), q = {
Fb:{
Ad:e,
Se:0,
th:p[A],
Zi:p[A] + t,
Uc:w,
wh:this.hj(k, e, p[A], j)
}
}, k[I] == jp && (w = m[L], q.Fb.il = 0 != w && m[w - 1] ? m[w - 1].Fb.Zi :l), this.kg(q, k, e), 
m[x](q), p[A] += t;
}
}
}
}
}, Y.Ly = function(a) {
var b = this.g, c = this.D, d = this.ea, e = Qr(b.d, function(b) {
return b[I] == a;
});
Pr(b.r, function(a, b) {
var i = 0 == this.jg(b);
Pr(e, function(a, e) {
if (i) a.c[x](l); else {
var f = this.Ba[a.Ia], q = a.K[C][0], t = c[J](b, q), w = f.n, t = w.ha(t);
if (t === l) a.c[x](l); else {
var A = this.$f(b);
d.V(A), d.Rc(A) && f.V(t), this.mp(e + 1), f = {
Fb:{
Ad:b,
Se:e,
th:l,
Zi:t,
Uc:A,
wh:this.hj(a, b, 0, j)
}
}, a[I] == jp && (f.Fb.il = 0 == b ? l :w.ha(c[J](b - 1, q))), this.kg(f, a, b), 
a.c[x](f);
}
}
}, this);
}, this), rs(this.Ba, function(a) {
a.Au();
});
}, Y.Lu = function() {
var a = this.g, b = this.D, c = this.ea, d = Qr(a.d, function(a) {
return a[I] == ui;
});
Pr(a.r, function(a, f) {
var g = 0 == this.jg(f);
Pr(d, function(a, d) {
if (g) a.c[x](l); else {
var e = a.K[C], p = this.Ba[a.Ia];
this.mp(d + 1);
var q = b[J](f, e[0]), t = b[J](f, e[1]), w = b[J](f, e[2]), e = b[J](f, e[3]), q = p.n.ha(q), t = p.n.ha(t), w = p.n.ha(w), e = p.n.ha(e);
if (q === l || e === l || t === l || w === l) a.c[x](l); else {
var A = this.$f(f);
c.V(A);
var E = t > w;
c.Rc(A) && (p.V(q), p.V(e)), p = {
no:this.dp(E, a),
Pa:xv(a[zb][zb]),
Fb:{
Ad:f,
Se:d,
gu:q,
lineTo:e,
hu:E ? w :t,
iu:E ? t :w,
fu:E,
Uc:A
}
}, this.kg(p, a, f), a.c[x](p);
}
}
}, this);
}, this);
}, Y.Ou = function() {
for (var a = this.g, b = this.D, c = this.ea, d = 0; d < a.r[L]; d++) for (var e = 0; e < a.d[L]; e++) {
var f = a.d[e];
if (f[I] == hm) {
var k, g = this.Ba[f.Ia], i = b[J](d, f.K[C][0]), i = g.n.ha(i);
if (i != l) {
var m = this.$f(d);
c.V(m), (k = c.Rc(m)) && g.V(i), g = this.hj(f, d, 0, k);
} else k = n, g = l;
g = {
Fb:{
Ad:d,
Se:0,
Uc:m,
Te:i,
wh:g
},
No:k
}, i == l && (g.Zb = j), this.kg(g, f, d), f.c[x](g);
}
}
this.jp(), this.Cl();
}, Y.jp = function() {
for (var a = this.ea, b = this.g.d, c = 0; c < b[L]; c++) {
var d = b[c];
if ((d[I] == hm || d[I] == wh) && 0 != d[qd]) {
var e = this.Ba[d.Ia], f = Rr(d.c, function(a) {
return !a || a.Zb ? l :new $(a.Fb.Uc, a.Fb.Te);
}), g = this.g.ae, d = Hw(f, a.hp(), g), f = Hw(f, a.yv(), g);
e.V(d), e.V(f);
}
}
}, Y.Ju = function() {
for (var a = this.g, b = this.D, c = this.ea, d = 0; d < a.r[L]; d++) for (var e = ss(this.Ba, function() {
return 0;
}), f = xs(e), g = xs(e), i = 0; i < a.d[L]; i++) {
var k = a.d[i];
if (k[I] == wh) {
var m = k.Ia, p = this.Ba[m], q = l, t = l, w = k.K[C][0], A = b[J](d, w), A = p.n.ha(A), E = this.$f(d);
if (A != l) {
var K, V, G;
a.vd ? (K = A + g[m], q = f[m], t = e[m], V = f[m] + A, G = e[m] + A, d != b[mc]() - 1 && kr(b[J](d + 1, w)) ? V = f[m] :f[m] += A, 
0 != d && kr(b[J](d - 1, w)) ? G = e[m] :e[m] += A) :(V = G = K = A, V = d != b[mc]() - 1 && kr(b[J](d + 1, w)) ? l :K, 
G = 0 != d && kr(b[J](d - 1, w)) ? l :K), c.V(E), (w = c.Rc(E)) && p.V(K), p = this.hj(k, d, g[m], w), 
a.vd && (g[m] = K), m = {
Uc:E,
Te:K,
Ad:d,
Se:0,
Wo:E,
zl:G,
Vo:E,
yl:V,
Uo:E,
xl:q,
To:E,
wl:t,
wh:p
};
} else a.vd && (q = f[m], t = e[m]), m = {
Uo:E,
xl:q,
To:E,
wl:t,
Wo:E,
zl:t,
Vo:E,
yl:q
}, w = n;
m = {
Fb:m,
No:w
}, this.kg(m, k, d), A == l && (m.Zb = j), k.c[x](m);
}
}
this.jp(), this.Cl();
}, Y.Pu = function() {
for (var a = this.g, b = this.D, c = this.pb[0], d = this.hb[0], e = 0; e < b[mc](); e++) for (var f = 0; f < a.d[L]; f++) {
var g = a.d[f], i = g.Hc;
if (g[I] == no) {
var k = g.K[C][0], i = b[J](e, a.be[i].K[Cb][0]), m = b[J](e, k), k = c.n.ha(i), i = d.n.ha(m);
k !== l && i !== l ? ((m = c.Rc(k) && d.Rc(i)) && (c.V(k), d.V(i)), k = {
Fb:{
x:k,
y:i
},
nu:m
}, this.kg(k, g, e), g.c[x](k)) :g.c[x](l);
}
}
this.Cl();
}, Y.Cl = function() {
function a(a) {
return !(!a || a.Zb);
}
for (var b = Z(function(a) {
var b = a.Fb != l ? a.Fb.Ad :l;
return {
Jh:a.Jh != l ? a.Jh :1,
gf:a.gf != l ? a.gf :1,
scope:a[Ec] != l ? a[Ec] :j,
Cv:b != l ? this.jg(b) :l
};
}, this), c = this.pm() === l, d = 0; d < this.g.d[L]; d++) {
var e = this.g.d[d], f = e.po, g = e.K.emphasis || [], i = e.K[Ec] || [];
if (0 != (e.K.certainty || [])[L] || 0 != g[L] || 0 != i[L] || !c) for (var g = Xr(e.c, a), k = b(g || {}), i = 0; i < e.c[L]; i++) {
var m = e.c[i];
if (m && !m.Zb) {
var p = b(m), q = e.Pa;
!p[Ec] && !k[Ec] && (e.nq = e.nq || q.Eh(), q = e.nq, m.Od = q, f && (e.mq = e.mq || f.Eh(), 
m.$t = e.mq)), (1 > p.Jh || 1 > k.Jh) && (q = this.Yl(q, n), m.Od = q), 1 != p.gf && 1 != k.gf && (k = s.min(k.gf, p.gf), 
q = this.Bv(q, k), m.Od = q), 0 == p.Cv && g && !g.Zb && (m.Od = l), k = p;
}
g = m;
}
}
}, Y.kg = function(a, b, c) {
if (this.Qi) {
var d = b.K.tooltip;
d && (a.qa = this.Ki(d[0], c)), a.qa && a.qa.Id || (d = a.qa ? a.qa.af :n, a.qa = this.Ll(b, c), 
a.qa.af = d);
}
var d = this.yw(b, c), e = this.zw(b, c), c = this.Aw(b, c), f = b.Ko, g = by(a, b);
if (c || (a.scope = c, b.br = b.br || f.Eh(), f = b.br, a.a = f), 1 != e && (a.gf = e, 
b[I] == hm || b[I] == wh || b[I] == no) && (g = s[B](10 * g * s[Pb](e)) / 10, a.Pb = g), 
1 > d) switch (a.Jh = d, b[I]) {
case hm:
case wh:
case no:
a.a = this.Yl(f, j), a.Pb = s.max(g - a.a.ar() / 2, 0);
break;

case Jh:
case jp:
a.a = this.Yl(f, n);
}
}, Y.Ki = function(a, b) {
var c = this.D, d = this.g.cg && (c.getProperty(b, a, kl) || c.getColumnProperty(a, kl)), c = c[kd](b, a);
return {
af:d,
Id:c ? j :n,
content:c
};
}, Y.Ll = function(a, b) {
switch (this.g.J) {
case no:
return this.ly(a, b);

case W:
return this.ky(a, b);
}
}, Y.ly = function(a, b) {
var c = this.D, d = a.K[C][0];
return {
Id:n,
content:c[kd](b, this.g.be[a.Hc].K[Cb][0]) + yd + c[kd](b, d),
ne:a[oc]
};
}, Y.ky = function(a, b) {
var c = this.D, d = this.g.r[b], e = a.K[C];
if (a[I] == ui) e = c[kd](b, e[0]) + xd + c[kd](b, e[3]) + ye + c[kd](b, e[1]) + xd + c[kd](b, e[2]); else {
var f = this.D[J](b, e[0]), e = this.D[kd](b, e[0]);
if (f === l && /^[\s\xa0]*$/[eb](e)) return {
Id:n,
content:l
};
f = a.K.interval || [], f[L] && (f = Rr(f, function(a) {
return c[kd](b, a);
}), e += zd + f[pd](ye) + Og);
}
return {
Id:n,
content:e,
$l:d.Wk[a.Hc],
ne:a[oc]
};
}, Y.Op = function() {
function a(a) {
return {
Uc:a.x,
Te:a.y
};
}
function b(a) {
return new ru(a.Uc, a.Te);
}
function c(a) {
return {
x:a.x,
y:a.y
};
}
function d(a) {
return new ru(a.x, a.y);
}
var k, m, p, e = this.g, f = this.ea, g = Z(function(a, b, c) {
b.nu && (this.pb[0].V(c.x), this.hb[0].V(c.y));
}, this), i = Z(function(a, b, c) {
f.V(c.Uc), b.No && this.Ba[a.Ia].V(c.Te);
}, this);
switch (e.J) {
case no:
k = d, m = c, p = g;
break;

case W:
k = b, m = a, p = i;
}
for (g = 0; g < e.d[L]; g++) if (i = e.d[g], i[I] == no || i[I] == hm) if (0 <= Or([ W, qn, Zi ], i.Wf)) {
var q = i[I] == no && i.Wf == Zi, t = i.Wf == W;
for (i.Ol = j, i.su = q, q = sw(Rr(i.c, function(a) {
return !a || a.Zb ? l :k(a.Fb);
}), i.Rk, t, q, e.ae), t = 0; t < i.c[L]; ++t) {
var w = i.c[t];
if (q[t]) {
var A = m(q[t][0]), E = m(q[t][1]);
w.kp = A, w.lp = E, p(i, w, A), p(i, w, E);
}
}
} else i.Ol = n;
}, Y.Mu = function() {
if (this.g.Gb == vi) {
for (var e, f, a = this.g.r, b = this.ea, c = b.ac, d = b.xb, g = 0; g < a[L]; g++) if (f = this.mr(g), 
f != l) {
if (b.nr(f)) return;
if (!b.$w(f)) {
e = g;
break;
}
}
if (jr(e)) for (var i, g = e; g < a[L]; g++) {
if (e = c, g == a[L] - 1) {
this.Qm(g, e, d);
break;
}
if (i = this.mr(g + 1), i != l) {
if (b.nr(i)) {
this.Qm(g, e, d);
break;
}
c = ms(f, i), this.Qm(g, e, c), f = i;
}
}
}
}, Y.mr = function(a) {
var b = this.g.r, c = this.ea;
return c[I] == Jq ? b[a][C] == l ? l :c.lg(b[a][C]) :c.Ka(a);
}, Y.Qm = function(a, b, c) {
var d = this.g.b.top, e = this.g.b[R], f = this.g.b[F], g = this.g.b[T], i = this.ea[bb];
this.g.r[a].iw = this.g[Wb] == il ? 1 == i ? new xt(d, c, e, b) :new xt(d, b, e, c) :1 == i ? new xt(b, g, c, f) :new xt(c, g, b, f);
}, Y.Xu = function() {
this.CB(), this.DB();
}, Y.CB = function() {
var a = this.g;
rs(a.va, function(b, c) {
this.Wm(this.hb[c], a.va[c], this.yx);
}, this), rs(a.Ja, function(b, c) {
this.Wm(this.pb[c], a.Ja[c], this.xx);
}, this);
}, Y.DB = function() {
var a = this.g;
rs(a.Ja, function(b, c) {
this.Wm(this.pb[c], a.Ja[c], this.ey);
}, this);
}, Y.Wm = function(a, b, c) {
b[z] && qa(b, Qr(b[z], Z(c, this, a)));
}, Y.xx = function(a, b) {
var c = this.g, d = b.m;
return d.Dd ? j :(d = Sx(d), d ? a.tc != ql || new xt(c.b.top, c.b[T], c.b[R], c.b[F])[fd](d) ? j :n :j);
}, Y.ey = function(a, b) {
var c = this.g;
if (a.tc != ql) return j;
var d = b.m;
if (d.Dd) return j;
var e = Sx(d);
if (!e) return j;
var g, d = d.u[N] / 2, f = new xt(e.top, e[T] + d, e[R], e[F] - d);
for (g in c.va) {
var i = ja(g);
if (this.hb[i].tc == ql && !(1 > (c.va[i][z] ? c.va[i][z][L] :0))) {
var k = Sx(c.va[i][z][0].m), m = Sx(Mr(c.va[i][z]).m);
if (k || m) {
if (k && yt(f, k) || m && yt(f, m)) return n;
if (k ? m ? (i = s.min(k[F], m[F]), k = s.max(k[T], m[T])) :(i = k[F], k = k[T]) :(i = m[F], 
k = m[T]), s.abs(e[F] - i) < d || s.abs(e[T] - k) < d) return n;
}
}
}
return j;
}, Y.yx = function(a, b) {
var c = this.g, d = new xt(c.b.top, c.b[T], c.b[R], c.b[F]), e = b.m, f = e.u[N] / 2, e = Sx(e);
return e ? a.tc != ql || d[fd](e) ? (d = new xt(e.top, e[T] + f, e[R], e[F] - f), 
(f = Sx(c[oc])) && yt(d, f) || (c = c.bh ? Sx(c.bh) :l) && yt(d, c) ? n :(c = this.ma.L) && yt(d, c) ? n :j) :n :j;
}, Y.Vu = function() {
var a = this.g, b = this.ea, c = this.i, d = {
eb:a.ed,
fontSize:a.Fc,
fb:a.Je
}, e = c.sc([ qh, th ], d), f = c.fd([ oh, rh ], U), g = c.U([ ph, sh ], Px, fm);
Pr(this.g.r, function(c, d) {
var i = [], k = [];
if (Pr(a.be, function(a) {
a = this.Oo(d, a.K, g), as(i, a.cj), as(k, a.Wa);
}, this), i[L] || k[L]) {
var m = this.$f(d), m = b.Ka(m), p = a.b.top + a.b[S];
i[L] && (c.xa = this.Qo(m, p, i, e, 5, f)), k[L] && (c.xa = this.Ro(m, l, k, e, f));
}
}, this);
var i = us(zx), k = c.Po([ nh, th ], i, d), m = c.Tk([ lh, rh ], i, U), p = c.U([ mh, sh ], Px, fm);
Pr(this.g.d, function(a, b) {
if (a[I] == wh || a[I] == hm) {
var d = Bo + b + Ie, e = c.Po(d + Ip, i, k);
xa(e, Sz(e[zb], a[zb]));
var f = c.Tk(d + ip, i, m), f = Sz(f, a[zb]);
for (c.U(d + up, Px, p), d = 0; d < a.c[L]; ++d) if (a.c[d] != l) {
var g = this.Oo(d, a.K, p), V = a.c[d].h;
g.cj[L] && (a.c[d].xa = this.Qo(V.x, V.y, g.cj, e, 12, f)), g.Wa[L] && (a.c[d].xa = this.Ro(V.x, V.y, g.Wa, e, f));
}
}
}, this);
}, Y.Oo = function(a, b, c) {
var d = this.D, e = b.annotation, f = {
Wa:[],
cj:[]
};
if (e == l) return f;
for (var b = b.annotationText || [], g = 0; g < e[L]; ++g) {
var i = e[g], k = i + 1, m = 0 <= Or(b, k);
d[J](a, i) && (k = {
text:d[kd](a, i),
Hp:m ? k :l,
rowIndex:a
}, this.i.U(hh + i + Pe, Px, c) == hm ? f.Wa[x](k) :f.cj[x](k));
}
return f;
}, Y.Qo = function(a, b, c, d, e, f) {
var g = b - e, i = g, k = -e, m = c[L], p = e + d[N] * m;
for (b - p < this.g.b.top && b + p < this.g.b[R] && (g = b + p, i = b + e + d[N], 
k = e), e = l, m > 1 && (e = c[0][z] + Ad, e = {
Nk:n,
label:{
text:e,
u:d,
f:[ {
x:a,
y:i,
length:this.pa(e, d)[y],
text:e
} ],
Va:Ci,
Oa:Uj
}
}, this.Qi && (e.label.G = Xf)), i = [], p = 0; m > p; p++) {
var q = c[p], t = this.pa(q[z], d), t = {
text:q[z],
u:d,
f:[ {
x:a,
y:g,
length:t[y],
text:q[z]
} ],
Va:Ci,
Oa:Uj
}, w = q.Hp;
this.Qi && w != l && (t.qa = this.Ki(w, q.rowIndex)), i[x](t), g -= d[N];
}
return {
Zo:{
x:a,
y:b,
length:k,
orientation:Mq,
color:f
},
labels:i,
hd:e
};
}, Y.Ro = function(a, b, c, d, e) {
for (var f = d[N], g = [], i = 0; i < c[L]; i++) {
var k = c[i], m = Tx(this.g.wb, k[z], d, this.g.b[S] - f);
g[x](m);
}
if (b != l) {
for (i = k = 0; i < g[L]; i++) m = g[i], k = s.max(k, m.ec);
i = k + f, b = s[B](b - i / 2), b < this.g.b.top && (b = this.g.b.top), f = b + i, 
f > this.g.b[R] && (f = this.g.b[R], b = f - i);
} else b = this.g.b.top, f = this.g.b[R];
for (var p = s[B]((b + f) / 2), q = a + 2, t = [], i = 0; i < c[L]; i++) {
var k = c[i], m = g[i], m = {
text:k,
u:d,
f:[ {
x:q,
y:p,
length:m.ec,
text:m.f[0]
} ],
Va:Ci,
Oa:gp,
Dd:270
}, w = k.Hp;
this.Qi && w != l && (m.qa = this.Ki(w, k.rowIndex)), t[x](m), q += d[N];
}
return {
Zo:{
x:a,
y:b,
length:f - b,
orientation:Mq,
color:e
},
labels:t,
hd:l
};
}, Y.Wu = function() {
Pr(this.g.d, function(a) {
var b = this.wv(a);
a.c && Pr(a.c, function(a) {
a != l && (a.h = b(a.Fb), a.kp != l && (a.Pd = b(a.kp)), a.lp != l) && (a.Qd = b(a.lp));
}), a.Ha && (0 < a.Ha.f[L] || 0 < a.Ha[md][L]) && this.xv(a);
}, this);
}, Y.xv = function(a) {
function b(b) {
var e = c[b];
if (delete c[b], e && 1 < e.Wa[L]) {
if (e[R] && e[R][jb](), d[b].Wf != X) {
var f = d[b].Wf == W, b = d[b].Rk;
e.ro = sw(e.Wa, b, f, n, n), e[R] && (e.Yu = sw(e[R], b, f, n, n));
}
a.Ha.fe[x](e);
}
}
var c = {}, d = a.Ha.mh;
a.Ha.fe = [];
for (var e = 0; e < a.c[L]; e++) {
var f = {}, g = a.c[e];
if (g && g.h && g.h.xd) for (var g = g.h.xd, i = 0; i < g[L]; ++i) {
var k = g[i].hh, m = d[k][O];
if (m == wh || m == hm) {
f[k] = j;
var m = k, p = g[i][Fc];
if (!c[m]) {
var q = m, t = d[q].a[Oc](), w = d[q][O], A = {};
A.hh = q, A.Wa = [], w == wh ? (t.Re(0), Xa(A, [])) :t.Fl(0), A.a = t, c[q] = A;
}
c[m].Wa[x](new ru(p[F], p.top)), c[m][R] && c[m][R][x](new ru(p[F] + p[y], p.top + p[S]));
}
}
for (k in c) !f[k] && !d[k].ae && b(k);
}
for (k in c) b(k);
}, Y.wv = function(a) {
switch (a[I]) {
case no:
return Z(this.QA, this, a);

case ni:
return Z(this.NA, this, a);

case hm:
return Z(this.PA, this, a);

case Jh:
return Z(this.MA, this, a);

case jp:
return Z(this.RA, this, a);

case ui:
return Z(this.OA, this, a);

case wh:
return Z(this.LA, this, a);
}
return l;
}, Y.QA = function(a, b) {
return {
x:this.pb[0].Ka(b.x),
y:this.hb[0].Ka(b.y)
};
}, Y.NA = function(a, b) {
return this.qe.Sz(this.pb[0], this.hb[0], b);
}, Y.PA = function(a, b) {
var c = this.Eg(a.Ia, b.Uc, b.Te);
return c.xd = this.wj(a, b), c;
}, Y.MA = function(a, b) {
var c = this.un(a, b, b.th, b.Zi);
return c ? {
top:c.top,
left:c[F],
width:c[y],
height:c[S],
xd:this.wj(a, b)
} :l;
}, Y.OA = function(a, b) {
var c = this.un(a, b, b.hu, b.iu), d = this.un(a, b, b.gu, b.lineTo);
pa(d, 2), Aa(d, d[F] + (c[y] - (c[y] % 2 ? 3 :2)) / 2);
var e = this.dp(b.fu, a);
return e.od() && (e = e.I / 2, $a(c, c[S] - 2 * e), pa(c, c[y] - 2 * e), Aa(c, c[F] + e), 
c.top += e), $a(c, s.max(c[S], 2)), pa(c, s.max(c[y], 1)), {
rect:c,
Wa:d
};
}, Y.dp = function(a, b) {
return a ? b.Yp.jv :b.Yp.kv;
}, Y.RA = function(a, b) {
var c = this.Ba[a.Ia];
b.th == l && (b.th = c.n.ha(c.ga.S));
var d = this.ea, e = d.A[b.Ad].l, f = d.ah, g = s[D](e - d[bb] * f / 2), f = s[D](e + d[bb] * f / 2), i = c.Ka(b.Zi), d = this.Rd(g, c.Ka(b.th)), e = this.Rd(g, i), f = this.Rd(f, i), i = [];
return this.i.$(pj, j) && b.il != l && (c = this.Rd(g, c.Ka(b.il)), i[x](c)), i[x](e), 
i[x](f), {
$g:new zt(s.min(d.x, f.x), s.min(d.y, f.y), s.abs(f.x - d.x), s.abs(f.y - d.y)),
outline:i,
xd:this.wj(a, b)
};
}, Y.tw = function(a, b, c) {
return s.min(a.Ka(b), a.Ka(c));
}, Y.sw = function(a, b, c) {
return s.max(a.Ka(b), a.Ka(c));
}, Y.un = function(a, b, c, d) {
var e = this.ea, f = this.Ba[a.Ia], a = this.Ui;
return c != l || (c = f.n.ha(f.ga.S)), b.Se >= a.ip || b.Ad >= e.A[L] && e[I] != Jq ? l :(e = this.tw(f, c, d), 
c = this.sw(f, c, d), d = s.min(1, .2 * (c - e)), s[D](e + d) < s[D](c) && s[D](e + d) > s[D](e) ? (e = s[D](e + d), 
c = s[D](c)) :e += d, b = this.wq(b), d = a.lj / 2, a = s[D](b + d), e = this.Rd(s[D](b - d), e), 
b = this.Rd(a, c), new zt(s.min(e.x, b.x), s.min(e.y, b.y), s.abs(b.x - e.x), s.abs(b.y - e.y)));
}, Y.LA = function(a, b) {
var c = this.Ba[a.Ia], d = c.n.ha(c.ga.S), c = this.Eg(a.Ia, b.Uc, b.Te), e = this.Eg(a.Ia, b.To, b.wl != l ? b.wl :d), f = this.Eg(a.Ia, b.Uo, b.xl != l ? b.xl :d), g = this.Eg(a.Ia, b.Vo, b.yl != l ? b.yl :d), d = this.Eg(a.Ia, b.Wo, b.zl != l ? b.zl :d), i = this.wj(a, b);
return {
x:c.x,
y:c.y,
lm:e.x,
mm:e.y,
nm:f.x,
om:f.y,
yj:g.x,
zj:g.y,
Aj:d.x,
Bj:d.y,
xd:i
};
}, Y.wj = function(a, b) {
if (!b.wh) return [];
var c = this.ea, d = this.Ba[a.Ia], e = this.Ui;
if (b.Se >= e.ip || b.Ad >= c.A[L] && c[I] != Jq) return [];
for (var k, f = this.wq(b), g = [], i = 0; k = b.wh[i]; i++) {
var m = d.Ka(k.$u), p = d.Ka(k.av), q = (c[I] == Jq ? c.A && 1 < c.A[L] ? c.A[1].l - c.A[0].l :0 :e.lj) * k.bv, t = s.abs(m - p), p = this.Rd(f - q / 2, s.min(p, m)), m = p.x, p = p.y, q = this.Rd(q, t);
g[x]({
rect:new zt(m, p, q.x, q.y),
hh:k.hh
});
}
return g;
}, Y.wq = function(a) {
var b = this.ea, c = this.Ui;
return (b[I] == Jq ? b.Ka(a.Uc) :b.A[a.Ad].l) - c.rv + (c.lj + 1) * a.Se + c.lj / 2;
}, Y.Rd = function(a, b) {
switch (this.g[Wb]) {
case il:
return {
x:a,
y:b
};

case Mq:
return {
x:b,
y:a
};
}
h(u("Invalid orientation."));
}, Y.Eg = function(a, b, c) {
return this.Rd(this.ea.Ka(b), this.Ba[a].Ka(c));
}, Y.Yl = function(a, b) {
var c = a[Oc]();
return c.lh() && c.Y != ne ? (c.Hm(new uv(Jn, c.Y)), !c.od() && b && (c.Gc(c.Y), 
c.Re(1))) :c.od() && c.Rq(wj), c;
}, Y.Bv = function(a, b) {
var c = a[Oc]();
return c.Re(c.I * b), c;
}, Y.yw = function(a, b) {
var c = this.D, d = a.K.certainty || [];
if (d[L]) {
var e = c[J](b, d[0]);
if (e != l) return c[Mb](d[0]) == Th ? e ? 1 :0 :e;
}
return 1;
}, Y.Aw = function(a, b) {
var c = this.D, d = a.K[Ec] || [];
return d[L] && (c = c[J](b, d[0]), c != l) ? !!c :j;
}, Y.zw = function(a, b) {
var c = this.D, d = a.K.emphasis || [];
if (d[L]) {
var e = c[J](b, d[0]);
if (e != l) return c[Mb](d[0]) == Th ? e ? 2 :1 :e;
}
return 1;
}, Y.jg = function(a) {
var b = this.pm();
return b !== l ? this.D[J](a, b) :l;
}, Y.pm = function() {
if (this.ea === l || this.ea[I] != Jq) return l;
var a = this.g.be[0].K.gap || [];
return 0 == a[L] ? l :a[0];
}, Y.hj = function(a, b, c, d) {
function e(a, e, f) {
var m = g.n.ha(i[J](b, a)), e = g.n.ha(i[J](b, e));
m != l && e != l && (m += c, e += c, d && (g.V(m), g.V(e)), k[x]({
av:m,
$u:e,
bv:f,
hh:a
}));
}
var f = a.Ha;
if (!f) return l;
for (var g = this.Ba[a.Ia], i = this.D, k = [], a = 0; a < f.bf[L]; a += 2) e(f.bf[a], f.bf[a + 1], 0);
for (var m = 0, p = f.oj[L] - 1; p >= m; m++, p--) {
var a = f.oj[m], q = f.oj[p];
e(a, q, f.mh[a].pu);
}
for (q = 0; q < f.c[L]; q++) a = f.c[q], e(a, a, 0);
for (q = 0; q < f.ue[L]; q++) a = f.ue[q], m = f.mh[a], e(a, a, 0 == q || q == f.ue[L] - 1 ? m.ou :m.qu);
for (m = 0, p = f[md][L] - 1; p >= m; m++, p--) a = f[md][m], q = f[md][p], e(a, q, 0);
for (q = 0; q < f.f[L]; q++) a = f.f[q], e(a, a, 0);
return k[L] ? k :l;
}, Y.mp = function(a) {
this.Kl = s.max(this.Kl, a);
}, Y.Qu = function() {
var a = this.g;
if (a.gb.bars || a.gb.candlesticks || !kr(Vr(a.d, function(a) {
return a.Ha != l;
}))) {
a = Qr(a.r, function(a, b) {
return 0 != this.jg(b);
}, this);
var b = this.ea;
if (0 == a[L]) a = 0; else if (b[I] == Jq) {
for (var c = b.Ei, d = l, e = 0; e < a[L]; e++) {
var f = b.lg(a[e][C]);
d != l && (c = s.min(c, s.abs(f - d))), d = f;
}
a = c;
} else a = s.abs(b.lg(1) - b.lg(0));
a = s.max(a, 1), b = this.i.Mv(Hh, a), b = s.max(b, 1), c = s.min(this.Kl, s[D]((b + 1) / 2)), 
d = (b - c + 1) / c, a > b && (d = s[D](d)), this.Ui = {
ip:c,
lj:d,
rv:((d + 1) * c - 1) / 2
};
}
}, Y.$f = function(a) {
var b = this.D, c = this.ea;
return c[I] == Jq ? (a = b[J](a, 0), c = c.n.ha(a)) :c = a, c;
}, Y = Tz[M], Y.nb = function() {
return this.k;
}, Y.uc = function() {
return 1.5 * this.w[N];
}, Y.gd = function(a) {
this.L = a;
}, Y.yu = function(a) {
this.Lj = a;
}, Y.Dm = function() {
if (!this.L || !this.Lj) return l;
var a = {
top:this.L.top,
left:this.L[F],
width:this.L[T] - this.L[F],
height:this.L[R] - this.L.top,
orientation:il,
u:this.w,
fv:Oh,
gv:this.Kv
}, b = wy(this.Lj, a, [], this.g.wb);
return {
position:this.k,
scale:this.Lj,
xh:a,
definition:b
};
}, Uz[M].Ss = function(a) {
this.Dh = a;
}, Uz[M].sB = function() {
return this.Dh + this.pg;
}, Uz[M].uc = function() {
return this.pg;
}, Y = Vz[M], Y.lu = function() {
for (var a = 0, b = 0, c = this.Lf[L]; c > b; b++) a += this.Lf[b].uc();
for (a > this.Ln && h(u("Not enough space for labels. Need: " + a + " got: " + this.Ln)), 
this.Lf.sort(function(a, b) {
var c = a.Gn, d = b.Gn;
return c == d ? a[sc] > b[sc] :c > d ? 1 :-1;
}), b = 0, c = this.Lf[L]; c > b; b++) {
var a = this.Lf[b], d = this.Qs(a.Dh, a.uc());
a.Ss(d);
}
for (b = [], a = 0, c = this.Lf[L]; c > a; a++) b[x]([ this.Lf[a] ]);
for (;this.Vz(b); ) ;
}, Y.Vz = function(a) {
for (var b = 0; b < a[L] - 1; b++) {
var c = a[b], d = a[b + 1];
if (this.BB(c, d)) return this.zB(c, d), a[od](b + 1, 1), j;
}
return n;
}, Y.BB = function(a, b) {
return a[a[L] - 1].sB() > b[0].Dh;
}, Y.zB = function(a, b) {
for (var c = 0; c < b[L]; c++) a[x](b[c]);
for (var d = 0, e = 0, c = 0; c < a[L]; c++) d += a[c].Gn, e += a[c].uc();
for (d = d / a[L] - e / 2, d = this.Qs(d, e), c = 0; c < a[L]; c++) e = a[c], e.Ss(d), 
d += e.uc();
}, Y.Qs = function(a, b) {
return is(a, 0, this.Ln - b);
}, Y = Wz[M], Y.nb = function() {
return this.k;
}, Y.gd = function(a) {
this.L = a;
}, Y.cw = function() {
this.Hh = Qr(this.g.wd, function(a) {
return a.v;
});
}, Y.Dm = function() {
if (!this.L) return l;
this.k != X && (this.Hb == Mq ? this.ux() :this.sx());
var a = this.ta && 0 < this.ta[L] ? this.ta[0] :l, b = this.Cd ? this.tx(0, n, 1 < this.ta[L]) :l;
return {
position:this.k,
Vk:this.L,
ta:this.ta,
Vc:a,
Lh:b
};
}, Y.ux = function() {
var a = s.max(this.L[T] - this.L[F] - (this.rb + this.ge), 0), b = this.L[R] - this.L.top, c = s.max(b - 2 * this.rb, 0), d = this.Hh, e = this.g;
cy(e) && d[jb]();
var f = Rr(d, function(b) {
return b = Tx(this.pa, b[z], this.w, a, r), 0 == b.f[L] && (b.f = [ U ]), b;
}, this);
if (this.k == Il && e.ko == hm) e = this.Dv(f, b, d), this.ta = [ e ]; else if (b = this.wm(f, b), 
this.Cd = this.Ev(d, b)) if (b = this.wm(f, c), jr(b[0]) && 0 != b[0][L]) {
for (this.ta = []; 0 < d[L]; ) {
for (e = this.pq(b, d), this.ta[x](e), e = 0; jr(b[e]) && 0 != b[e][L]; ) ++e;
f = cs(f, e), b = this.wm(f, c), d = cs(d, e);
}
this.Cd && (this.ol = s[B](this.L[R] - this.rb), this.Ve = this.L[F], this.Ue = this.Ve + this.rb + this.rj, 
this.pl && (c = this.sm(this.ta[L]), this.Ue += c + this.rj));
} else this.Cd = n; else e = this.pq(b, d), this.ta = [ e ];
}, Y.wm = function(a, b) {
var c = this.w[N], d = s[B](c / 1.618), e = s[B](c / 3.236), c = this.Tz(a, c + d, c + e);
return yw(c, b);
}, Y.mu = function(a) {
var b = ts(this.g.Ja), c = this.g.d[a], a = Rr(c.c, function(a) {
return !a || a.Zb ? l :new $(a.h.x, a.h.y);
}), c = Hw(a, b.xb, c.ae);
return c !== l ? c :this.Fv(a, b.xb);
}, Y.Fv = function(a, b) {
var a = Qr(a, lr), c = -(ds(a, function(a, b) {
return fs(a, b.x);
} || fs, n, b) + 1), c = cs(a, 0, c);
return (c = Xr(c, function(a) {
return a.y !== l;
})) ? c.y :l;
}, Y.Dv = function(a, b, c) {
for (var d = this.L[T] - this.L[F], e = s[B](this.L[F]), f = [], g = [], i = this.g.Rf == Mj, k = 0; k < c[L]; k++) {
var m = c[k], p = Tx(this.pa, m[z], this.w, d, a[k].f[L]), q = {};
q.id = m.id, q.a = m.a[Oc]();
var t = xs(this.w);
xa(t, q.a.Y), q.m = {
text:m[z],
u:t,
f:[],
Va:gp,
Oa:gp,
G:p.la ? m[z] :U
}, t.fb && q.a.Gc(t.fb, 1), q.v = j;
for (var w = 0; w < p.f[L]; w++) q.m.f[x]({
length:d,
text:p.f[w]
});
i && (w = this.pa(q.m.f[0][z], t)[y], q.ka = {}, q.ka.P = {
x:e + w + 5
}, q.ka.a = q.a, q.ka.v = n), Pa(q, m[sc]), w = this.mu(q[sc]) || 0, t = this.pa(q.m.f[0], t)[S], 
m = new Uz(w, q.m.f[L] * t, q), f[x](m), g[x](q);
}
for (new Vz(b, f).lu(), w = 0; w < f[L]; w++) for (m = f[w], a = m.Dh, q = m.ju, 
b = q.m.f, k = 0; k < b[L]; k++) b[k].y = s[B](k * t + a), b[k].x = e, i && (q.ka.P.y = b[k].y);
return g;
}, Y.pq = function(a, b) {
for (var c = this.rb + this.ge, d = this.L[T] - this.L[F] - c, e = this.w[N], f = s[B](e / 1.618), g = s[B](e / 3.236), i = e + f, k = e + g, e = [], g = 0, m = s[B](this.L[F]), p = 0; p < b[L]; p++) {
var q = b[p], t = a[p][L];
if (0 != t) {
var w = Tx(this.pa, q[z], this.w, d, t), t = {};
t.id = q.id, t.m = {
text:q[z],
u:this.w,
f:[],
anchor:{
x:m,
y:0
},
Va:gp,
Oa:gp,
G:w.la ? q[z] :U
}, t.M = {}, t.M.P = new zt(m, g, this.rb, this.rb), t.M.a = q.a[Oc](), this.w.fb && t.M.a.Gc(this.w.fb, 1), 
t.v = j;
for (var A = 0; A < w.f[L]; A++) A > 0 && (g += k), t.m.f[x]({
x:c,
y:g,
length:d,
text:w.f[A]
});
Pa(t, q[sc]), g += i, e[x](t);
}
}
for (c = s[B](this.L.top), this.Cd || (f = g - f, d = this.L[R] - this.L.top, this.Ti == Uj ? c += d - f :this.Ti == Ci && (c += s[D]((d - f) / 2))), 
p = 0; p < e[L]; p++) t = e[p], t.M.P.top += c, t.m[Sc].y += c;
return e;
}, Y.Tz = function(a, b, c) {
for (var d = Sr(a, function(a, b) {
return s.max(a, b.f[L]);
}, 0), e = [], f = 0; d > f; f++) {
var g = 0 == f ? b :c;
Pr(a, function(a, b) {
f < a.f[L] && e[x]({
key:b,
min:0 == f && 0 == b ? this.w[N] :g,
T:[]
});
}, this);
}
return e;
}, Y.Ev = function(a, b) {
var c = a[L] - 1;
return 1 < a[L] && 1 > b[c][L];
}, Y.mv = function(a) {
for (var b = this.Hh, c = this.hi(b, a), d = 1; (0 == this.bq || this.bq > d) && c[L] < b[L]; ) ++d, 
b = cs(b, c[L]), c = this.hi(b, a);
return d;
}, Y.sx = function() {
for (var a = [ 1, 9, 99, 0 ], b = 0; b < a[L] && !this.hy(a[b]); ++b) ;
this.Cd && (this.ol = s[B]((this.L.top + this.L[R] - this.rb) / 2), this.Ue = this.L[T] - this.rb, 
this.Ve = this.Ue - this.rj - this.rb, this.pl && (a = this.sm(this.ta[L]), this.Ve -= a + this.rj));
}, Y.hy = function(a) {
var b = this.L[T] - this.L[F], c = n;
1 != a && (b -= 2 * (this.rb + this.ge), c = j, 0 != a && (b -= this.sm(a) + this.ge));
var d = this.hi(this.Hh, b);
if (0 == d[L]) return this.Cd = n, j;
this.ta = [];
for (var e = this.Hh; 0 < e[L]; ) {
if (a > 0 && this.ta[L] == a) return n;
for (var f = [ this.Lr(d, e, c) ], g = 1; g < this.nh && e[L] != d[L]; g++) e = cs(e, d[L]), 
d = this.hi(e, b), f[x](this.Lr(d, e, c));
f = this.gy(f), this.ta[x](f), e = cs(e, d[L]), d = this.hi(e, b);
}
return this.Cd = 1 < this.ta[L], j;
}, Y.gy = function(a) {
var b = this.L[R] - this.L.top, c = this.w[N], d = b - this.nh * c, e = 1 < this.nh ? d / (this.nh - 1) :0, f = (b - ((c + e) * a[L] - e)) / 2, g = [];
return Pr(a, function(a) {
var b = s[B](f);
Pr(a, function(a) {
a.m[Sc].y += b, a.M.P.top += b;
}), f += c + e, as(g, a);
}), g;
}, Y.hi = function(a, b) {
var c = this.rb + this.ge, d = s.min(this.g[y] * (2 - 1.618) / 2, b);
return c > d ? [] :(c = this.Ay(d, a), xw(c, b));
}, Y.Lr = function(a, b, c) {
for (var d = this.L[T] - this.L[F], e = this.rb + this.ge, f = s[B](1.618 * this.w[N]), g = [], i = 0, k = s[B](this.L.top), m = 0; m < a[L]; m++) {
var p = b[m], q = Tx(this.pa, p[z], this.w, a[m] - e - (m > 0 ? f :0), 1), t = 0 < q.f[L] ? q.f[0] :U, w = this.pa(t, this.w)[y], A = [ {
x:i + e,
y:0,
length:w,
text:t
} ], E = {};
E.id = p.id, E.m = {
text:p[z],
u:this.w,
f:t ? A :[],
anchor:{
x:0,
y:k
},
Va:gp,
Oa:gp,
G:q.la ? p[z] :U
}, E.v = j, E.M = {}, E.M.a = p.a[Oc](), this.w.fb && E.M.a.Gc(this.w.fb, 1), E.M.P = new zt(i, k, this.rb, this.rb), 
Pa(E, p[sc]), g[x](E), i += w + e + f;
}
for (a = this.L[F], c || (c = i - f, this.Ti == Uj ? a += d - c :this.Ti == Ci && (a += s[D]((d - c) / 2))), 
m = 0; m < g[L]; m++) E = g[m], Aa(E.M.P, E.M.P[F] + a), E.m[Sc].x += a;
return g;
}, Y.Ay = function(a, b) {
var c = this.rb + this.ge, d = s[B](1.618 * this.w[N]);
return Rr(b, function(b, f) {
var g = this.pa(b[z], this.w)[y] + c, i = s.min(a, g), g = g - i;
return f > 0 && (i += d), {
min:i,
T:[ g ]
};
}, this);
}, Y.sm = function(a) {
for (var b = Ye; a >= 10; ) b += Ye, a /= 10;
return this.pa(b + Ue + b, this.Jo)[y];
}, Y.tx = function(a, b, c) {
var d = this.ol, e = l;
if (this.pl) var e = a + 1 + Ue + this.ta[L], a = this.Ve + this.rb, f = this.Ue - a, e = {
text:e,
u:this.Jo,
f:[ {
x:a + f / 2,
y:d,
text:e,
length:f
} ],
Va:Ci,
Oa:gp,
G:U
};
var g = this.Yt == Mq, i = this.rb, k = s[B](i / 2), m = this.Ve, p = this.Ue, f = a = l;
return g ? (a = [ {
x:m + i,
y:d + i
}, {
x:m + k,
y:d
}, {
x:m,
y:d + i
} ], f = [ {
x:p,
y:d
}, {
x:p + i,
y:d
}, {
x:p + k,
y:d + i
} ]) :(a = [ {
x:m + i,
y:d + i
}, {
x:m + i,
y:d
}, {
x:m,
y:d + k
} ], f = [ {
x:p,
y:d
}, {
x:p + i,
y:d + k
}, {
x:p,
y:d + i
} ]), d = {
Nd:this.Wt,
Cj:this.Xt
}, {
gm:{
path:a,
Nd:b,
Fd:d,
a:b ? d.Nd :d.Cj
},
em:{
path:f,
Nd:c,
Fd:d,
a:c ? d.Nd :d.Cj
},
fm:e
};
}, Y = $z[M], Y.Em = function() {
return bo;
}, Y.Cm = function(a) {
var b = this.g;
this.ma = a, this.D[Mb](0) != op && h(u("Pie chart should have a first column of type string")), 
a = this.Il(), this.pv(a.ia.$b, a.ia.ra, a.ia.wa, a.ia[S]);
var c = this.ma.nb();
a.o ? this.ma.gd(a.o) :c == di ? this.ma.gd(this.nv()) :c == Il && this.ov(b.b, a, this.ma.w, b.d);
}, Y.pp = function(a) {
var g, b = this.g, c = {}, d = this.i.fd(vn, U), e = a[zb], f = a.rg, a = a.Uj;
return b.Tf ? (b = e, g = f, d = a) :g = b = d, c.ru = new vv({
stroke:b,
Aa:1,
fill:e,
Cb:1
}), c.rg = new vv({
stroke:g,
Aa:1,
fill:f,
Cb:1
}), c.Uj = new vv({
stroke:d,
Aa:1,
fill:a,
Cb:1
}), c;
}, Y.nv = function() {
var a = this.g, b = a[S] - a.b[R], c = this.ma.w[N], d = [];
d[x]({
min:2,
T:[ r ]
});
var e = d[L];
return d[x]({
min:c + 2,
T:[ r ]
}), b = xw(d, b), b[L] > e ? (e = a.b[R] + b[e], new xt(e - c, a.b[T], e, a.b[F])) :l;
}, Y.Il = function() {
var a = this.g, b = a.b, c = this.ma.nb(), d = l, e = l, d = s[B](1.618 * a.Fc), f = s[B](b[y] * (1 - 1 / 1.618) - d);
c == Jl ? (e = new xt(b.top, b[F] + f, b[R], b[F]), d = new xt(b.top, b[T], b[R], e[T] + d)) :c == bo ? (e = new xt(b.top, b[T], b[R], b[T] - f), 
d = new xt(b.top, e[F] - d, b[R], b[F])) :d = new xt(b.top, b[T], b[R], b[F]);
var b = 0, c = s.min(d[T] - d[F], d[R] - d.top), f = c = s[D](c / 2), g = s[B]((d[T] + d[F]) / 2), d = s[B]((d[R] + d.top) / 2);
return a.Tf && (f *= .8, b = c / 5, d -= b / 2), {
ia:{
$b:new ru(g, d),
ra:c,
wa:f,
height:b
},
o:e
};
}, Y.pv = function(a, b, c, d) {
for (var e = this.g, f = this.D, g = Yy(this.i.fd(tn, U)), i = this.pp(g), k = this.i.sc(xn, {
eb:e.ed,
fontSize:e.Fc
}), m = this.i.U(wn, Jx, pn), p = this.i.U($p, Kx, ci), q = this.i.Uf(Wo, 1 / 720), t = this.i.$(Kj), w = this.i.ud(un, tg), A = this.i.Uf(sn, 0), E = 0, K = 0; K < f[mc](); K++) E += f[J](K, 1) || 0;
var V = 0, G = 0;
for (e.d = [], e.wd = [], K = 0; K < f[mc](); ++K) {
var ka = f[J](K, 1) || 0, Wa = f[kd](K, 1), fb = f[J](K, 0), fa = f[kd](K, 0), za = G / E, Hb = za + ka / E, Ga = Hb - za >= q;
Ga ? G += ka :V += ka;
var Dc = Xo + K, le = this.i.O(Dc + Je, this.Yf[K % this.Yf[L]]), le = Yy(le), kA = this.pp(le), lA = this.i.Ke(Dc + Oe, 0), mA = this.i.Uf(Dc + Me, A), nA = this.i.sc(Dc + Re, k), ka = this.op(K, za, Hb, ka, Wa, fa, Ga, a, b, c, mA, d, lA, m, nA, p, le, kA);
e.d[x](ka), Ga = this.i.$(Dc + Te, Ga || t), e.wd[x]({
id:fb,
text:fa,
a:new vv({
fill:le[zb]
}),
index:K,
v:Ga
});
}
f = l, V > 0 && (Wa = na(V), fa = w, f = this.op(-1, 1 - V / E, 1, V, Wa, fa, j, a, b, c, A, d, 0, m, k, p, g, i), 
t || e.wd[x]({
id:U,
text:fa,
a:new vv({
fill:g[zb]
}),
index:-1,
v:j
})), e.ia = {
ra:b,
wa:c,
$b:a,
Qk:d,
jl:f
};
}, Y.op = function(a, b, c, d, e, f, g, i, k, m, p, q, t, w, A, E, K, V) {
q = this.g, (q.Tf || p >= 1) && (p = 0);
var G = {}, ka = c - b;
switch (G.value = d, G.Xp = e, xa(G, K), G.Fd = V, G.a = G.Fd.ru, La(G, f), Pa(G, a), 
G.Oe = a >= 0 ? this.D.getTableRowIndex(a) :l, G.v = g, a = k * p, p *= m, G.dh = a, 
G.Zf = p, G.fa = 360 * b + this.ep, G.ca = 360 * c + this.ep, this.ku && (d = -G.fa, 
G.fa = -G.ca, G.ca = d), d = s.PI * (G.fa - 90) / 180, f = s.PI * (G.ca - 90) / 180, 
G.am = s[B](1e3 * ka) / 10 + oe, K = U, w) {
case pn:
K = G.am;
break;

case Gl:
K = G[oc];
break;

case Jq:
K = e;
}
if (qa(G, K), !g) return G;
if (G.u = A, e = this.pa(G[z], A)[y], g = A[N], G.Vi = new qs(e, g), G.zd = 1 == ka, 
G[z]) if (G.zd) G.bl = tu(i, new ru(e / 2, g / 2)), G.al = j; else {
A = k - g, ka = m - g, e = G.Vi, e = new qs(e[y] / A, e[S] / ka), g = new qs(2 / A, 2 / ka), 
w = Ky((d + f) / 2 + s.PI, 1, 1);
b:{
for (var K = My(new ru(0, 0), e), V = 1, Wa = s.min, fb = 0; fb < K[L]; ++fb) {
var fa, za = K[fb];
if (fa = w.x * za.x + w.y * za.y, za = fa * fa + 1 - za.iv(), 0 > za ? fa = l :(za = s[Pb](za), 
fa = [ fa - za, fa + za ]), fa === l || 0 > fa[1]) {
K = l;
break b;
}
V = Wa(V, fa[1]);
}
K = V;
}
if (.4 > K) e = l; else {
w = w[Oc]()[dd](-K), e = Jy(e, g, g);
b:{
for (e = My(w, e), g = js(f - d, 2 * s.PI), K = 0, V = g, Wa = 0; Wa < e[L]; ++Wa) {
if (fb = js(s[Kb](e[Wa].y, e[Wa].x) - d, 2 * s.PI), fb >= g || 0 == fb) {
e = n;
break b;
}
V = s.min(fb, V), K = s.max(fb, K);
}
e = K - V < s.PI;
}
e = e ? w :l;
}
A = e && new ru(e.x * A, e.y * ka), A !== l && (G.al = j, G.bl = Iy(i, A, new ru(-G.Vi[y] / 2, -G.Vi[S] / 2)));
} else G.al = n;
return G.offset = Ky((d + f) / 2, k, m)[dd](t), t = Ky(f, k, m), G.La = su(i, Ky(d, k, m)), 
G.bc = su(i, t), m = Ky(f, a, p), G.to = su(i, Ky(d, a, p)), G.uo = su(i, m), q.Tf && 270 >= G.fa && 90 <= G.ca && (m = {}, 
90 > G.fa ? (m.fa = 90, m.La = new ru(i.x + k, i.y)) :(m.fa = G.fa, m.La = G.La), 
270 < G.ca ? (m.ca = 270, m.bc = new ru(i.x - k, i.y)) :(m.ca = G.ca, m.bc = G.bc), 
m.a = G.Fd.rg, G.F = m), G.ee = q.Tf && b > .5, G.Qe = q.Tf && .5 > c, (G.ee || G.Qe) && (G.Ii = G.Fd.rg), 
G.qa = {
ne:G[oc],
content:aA(G, E)
}, G;
}, Y.ov = function(a, b, c) {
for (var d = this.g, e = b.ia.ra, f = b.ia.wa, g = b.ia.$b, i = this.i.U(Ml, Kx, pn), k = s.PI * (3 * (e + f) - s[Pb]((3 * e + f) * (e + 3 * f))), m = [], p = [], q = 0; q < d.wd[L]; ++q) {
var t = d.wd[q];
if (t.v) {
var w;
w = 0 <= t[sc] ? d.d[t[sc]] :d.ia.jl;
var ka, Wa, A = s.max((e + w.dh) / 2, .75 * e), E = s.max((f + w.Zf) / 2, .75 * f), K = (w.ca + w.fa) / 2, V = js(K, 360), G = 360 * (ms(e - A, f - E) / k);
2 * G < w.ca - w.fa ? (ka = w.fa + G, Wa = w.ca - G, 180 > V ? Wa = s.min(Wa, 180) :ka = s.max(ka, 180)) :Wa = ka = K;
var fb = function(a) {
return su(g, Ky(a, A, E));
}, G = function(a) {
return fb(s.asin(is((a - g.y) / E, -1, 1)));
}, fa = function(a) {
return fb(s.PI - s.asin(is((a - g.y) / E, -1, 1)));
}, t = {
Co:fb(ks(K - 90)).y,
$i:new mv(fb(ks(ka - 90)).y, fb(ks(Wa - 90)).y),
dg:t[z],
eg:aA(w, i),
Ao:w[ub],
index:w[sc]
};
180 > V ? (t.Bo = G, m[x](t)) :(t.Bo = fa, p[x](t));
}
}
b = a[y] / 2 - b.ia.ra - c[N], m = Xz(new xt(a.top, a[T], a[R], a[T] - b), this.pa, 2, c, m), 
a = Xz(new xt(a.top, a[F] + b, a[R], a[F]), this.pa, 1, c, p), c = [], as(c, m, a), 
this.g.vc = c;
}, Y = bA[M], Y.yh = function() {
return this.g;
}, Y.$k = function() {
var a = this.g;
this.bw(), this.Il();
var b = l, c = l, d = l, e = l;
a.J == rn ? (c = new $z(this.D, this.i, this.pa, a), d = c.Em()) :(b = new Rz(this.D, this.i, this.pa, a), 
d = b.Em(), e = b.ew()), this.ma = new Wz(a, this.i, d), this.cc = new Tz(a, this.i, e), 
b && b.Cm(this.ma, this.cc), c && c.Cm(this.ma), this.ma.cw(), this.dw(), a.o = this.ma.Dm(), 
a.Wc = this.cc.Dm();
}, Y.bw = function() {
var a = this.Oc, b = new google[Hc].DataView(a);
if (2 > b[tb]() && h(u("Not enough columns given to draw the requested chart.")), 
this.i.$($n)) {
for (var c = [], a = a[mc]() - 1; a >= 0; a--) c[x](a);
b.setRows(c);
}
this.D = b;
}, Y.$q = function(a, b, c, d) {
return b != l || (b = d()), b = s[B](b), a != l || (a = (c - b) / 2), a = s[B](a), 
b = s.min(a + b, c), {
start:a,
end:b
};
}, Y.Il = function() {
var a = this.g, b = this.i.Yh(Ji, a[y]), c = this.i.Yh(Gi, a[S]), d = this.i.Yh(Ii, a[S]), e = this.i.Yh(Hi, a[y]), f = Z(function() {
var b = a[y] / 1.618, c = a[y] - a[S] * (1.618 - 1);
return s[B](b > c ? b :(b + 2 * c) / 3);
}, this), e = this.$q(e, b, a[y], f), b = s.min(e[Q], e.end), e = e.end, f = e - b, g = Z(function() {
var b = a[S] / 1.618, c = a[S] - a[y] * (1.618 - 1);
return s[B](b > c ? b :(b + 2 * c) / 3);
}, this), d = this.$q(d, c, a[S], g), c = s.min(d[Q], d.end), d = d.end;
a.b = {
left:b,
right:e,
width:f,
top:c,
bottom:d,
height:d - c
};
}, Y.dw = function() {
var a = this.g, b = a[oc].u[N], c = this.ma.w[N], d = this.ma.nb(), e = this.cc.w[N], f = this.cc.nb(), g = a.Qf == cn ? a[oc][z] :U, i = Tx(this.pa, g, a[oc].u, a.b[y], r), k = s.max(2, s[B](b / 3.236)), m = s.max(2, s[B](c / 1.618)), e = s.max(2, s[B](e / 1.618)), p = s.max(2, s[B](1.618 * a.Fc)), q = [];
if (q[x]({
key:ei,
min:2,
T:[ p - 2 ]
}), q[x]({
key:kq,
min:0,
T:[ r ]
}), 0 < i.f[L] && q[x]({
key:Pp,
min:b + 2,
T:[]
}), d == jq) for (p = this.ma.mv(a.b[y]), d = 0; p > d; ++d) q[x]({
key:Kl,
min:c + 2,
T:[ m - 2 ]
});
for (f == jq && q[x]({
key:kj,
min:this.cc.uc() + 2,
T:[ e - 2 ]
}), d = 1; d < i.f[L]; d++) q[x]({
key:Pp,
min:b + 2,
T:[ k - 2 ]
});
for (f = yw(q, a.b.top), b = f[kq][0] || 0, i = f[oc] || [], k = Tx(this.pa, g, a[oc].u, a.b[y], i[L]), 
d = 0; d < k.f[L]; d++) b += i[d], a[oc].f[x]({
text:k.f[d],
x:a.b[F],
y:b,
length:a.b[y]
});
a[oc].G = k.la ? g :U, g = f.legend || [], 0 < g[L] && (this.ma.nh = g[L], c = b + g[0] - c, 
b += ls[gd](l, g), this.ma.gd(new xt(c, a.b[T], b, a.b[F]))), c = f.colorBar || [], 
0 < c[L] && (b += c[0], a = new xt(b - this.cc.uc(), a.b[T], b, a.b[F]), this.cc.gd(a));
}, Y = cA[M], Y.Cy = function() {
var a = this.Ah, b = this.Bh;
if (a.d && b.d) {
var c = Dw(a.d, b.d, function(a, b) {
return a.id == b.id;
});
this.re = Qr(a.d, function(a, b) {
return c.uh[b] != l;
}), this.og = Qr(b.d, function(a, b) {
return c.vh[b] != l;
}), a.J == W || a.J == no ? (a = a[Wb] == il ? a.Ja[0] :a.va[0], a[I] == Jq ? this.Ew(a.sg.Jb, a.sg.Md) :this.Fw()) :a.J == ji && this.Dw();
}
}, Y.Fw = function() {
var a = this.Ah.r, b = this.Bh.r;
if (a && b) {
for (var c = Dw(a, b, function(a, b) {
return a[C] == b[C];
}), d = 0, e = 0, f = [], g = []; d < a[L] || e < b[L]; ) d < a[L] && c.uh[d] == l ? (g[x]({
qf:{
sd:d,
Og:j
},
rf:{
sd:e,
Og:n
}
}), f[x]({
data:a[d][C]
}), d++) :(e < b[L] && c.vh[e] == l ? (g[x]({
qf:{
sd:d,
Og:n
},
rf:{
sd:e,
Og:j
}
}), f[x]({
data:b[e][C]
})) :(g[x]({
qf:{
sd:d,
Og:j
},
rf:{
sd:e,
Og:j
}
}), f[x]({
data:a[d][C]
}), d++), e++);
this.Rb.r = f, this.Nj(g, function(a, b) {
return b.Og ? a[b.sd] :0 == b.sd ? a[0] :b.sd >= a[L] ? Mr(a) :fA(a[b.sd - 1], a[b.sd], .5);
});
}
}, Y.Ew = function(a, b) {
var c = this.Ah.r, d = this.Bh.r;
if (c && d) if (0 == c[L] || 0 == d[L]) this.Rb.r = [], this.Nj([], function() {
return l;
}); else {
for (var e = function(b) {
return a(b[C]);
}, f = Ew(c, d, e), g = Ew(d, c, e), i = 0, k = 0, m = [], p = []; i < c[L] || k < d[L]; ) i < c[L] && (f[i] < k || k < d[L] && g[k] > i) ? (p[x]({
qf:i,
rf:f[i]
}), m[x]({
data:c[i][C]
}), i++) :(k < d[L] && (i < c[L] && f[i] > k || g[k] < i) ? (p[x]({
qf:g[k],
rf:k
}), m[x]({
data:d[k][C]
})) :(p[x]({
qf:i,
rf:k
}), m[x]({
data:b(ms(e(c[i]), e(d[k])))
}), i++), k++);
this.Rb.r = m, this.Nj(p, function(a, b) {
return a[b];
});
}
}, Y.Dw = function() {
for (var a = this.Ah.d[0].c, b = this.Bh.d[0].c, c = Dw(a, b, function(a, b) {
return a || b ? a && b ? a.id == b.id :n :j;
}), d = 0, e = 0, f = []; d < a[L] || e < b[L]; ) d < a[L] && c.uh[d] == l ? d++ :(e < b[L] && c.vh[e] == l || (f[x]({
qf:d,
rf:e
}), d++), e++);
this.Nj(f, function(a, b) {
return a[b];
});
}, Y.Nj = function(a, b) {
for (var c = 0; c < this.re[L]; c++) {
for (var d = this.re[c].c, e = this.og[c].c, f = [], g = [], i = 0; i < a[L]; i++) {
var k = a[i];
f[x](b(d, k.qf)), g[x](b(e, k.rf));
}
this.re[c] = gA(this.re[c], f), this.og[c] = gA(this.og[c], g);
}
}, Y.By = function() {
var a = this.Ah, b = this.Bh;
if (a.o && a.o.ta && b.o && b.o.ta) {
var a = a.o.ta[0], b = b.o.ta[0], c = Dw(a, b, function(a, b) {
return a.id == b.id;
});
for (this.Dl = Qr(a, function(a, b) {
return c.uh[b] != l;
}), this.ij = Qr(b, function(a, b) {
return c.vh[b] != l;
}), this.Rb.o = xs(this.Rb.o), b = this.Rb.o, b.Vc = $r(this.ij), b.ta = [ b.Vc ], 
b = b.Vc, a = 0; a < b[L]; ++a) {
b[a] = xs(b[a]);
var d = b[a];
if (d.m && (d.m = xs(d.m), d.m.f)) {
d.m.f = $r(d.m.f);
for (var e = 0; e < d.m.f[L]; e++) d.m.f[e] = xs(d.m.f[e]);
}
d.M && (d.M = xs(d.M), d.M.P && (d.M.P = d.M.P[Oc]())), d.ka && (d.ka = xs(d.ka), 
d.ka.P && (d.ka.P = xs(d.ka.P)));
}
}
}, Y.yy = function(a) {
var b = this.Rb;
if (b.Ja) {
var c = function(a, c) {
return jA(a, c, b.b, j, n);
};
rs(b.Ja, function(b, d) {
oA(this.fp[d][0], this.fp[d][1], b, c, a);
}, this);
}
if (b.va) {
var d = function(a, c) {
return jA(a, c, b.b, n, j);
};
rs(b.va, function(b, c) {
oA(this.gp[c][0], this.gp[c][1], b, d, a);
}, this);
}
if (this.re && this.og) {
b.d = [];
for (var e = 0; e < this.re[L]; ++e) {
var f = this.re[e], g = this.og[e], i = xs(g);
if (f && g && f[I] == g[I]) {
if (f.c && g.c) {
i.c = [];
for (var k = 0; k < f.c[L]; k++) i.c[k] = fA(f.c[k], g.c[k], a);
}
f.Ha && f.Ha.fe && g.Ha && g.Ha.fe && (i.Ha.fe = hA(f.Ha.fe, g.Ha.fe, a));
}
b.d[e] = i;
}
}
if (this.Dl && this.ij && b.o && b.o.Vc) for (e = 0; e < b.o.Vc[L]; e++) {
if (f = b.o.Vc[e], g = this.Dl[e], i = this.ij[e], f.m && f.m.f && g.m && g.m.f && 0 != g.m.f[L] && i.m && i.m.f) for (var m = f.m.f, p = g.m.f, q = i.m.f, t = p[L], k = 0; k < m[L]; k++) {
var w = t > k ? p[k] :p[t - 1];
m[k].x = hA(w.x, q[k].x, a), m[k].y = hA(w.y, q[k].y, a);
}
f.M && f.M.P && g.M && g.M.P && i.M && i.M.P && (k = hA(g.M.P, i.M.P, a), f.M.P = new zt(k[F], k.top, k[y], k[S])), 
f.ka && f.ka.P && g.ka && g.ka.P && i.ka && i.ka.P && (f.ka.P = hA(g.ka.P, i.ka.P, a));
}
return b;
}, pA[M].ww = function(a, b, c, d) {
var e = [], f = b.z, g = a.z;
(f.Qb != g.Qb || f.Bd != g.Bd) && (g.Qb != l && e[x](this.Vj($m, g.Qb, g.Bd, c, d)), 
f.Qb != l && e[x](this.Vj(an, f.Qb, f.Bd, c, d))), f.nd != g.nd && (g.nd != l && (g = g.nd, 
e[x]({
type:$m,
data:{
row:g,
column:l
}
})), f.nd != l) && (g = f.nd, e[x]({
type:an,
data:{
row:g,
column:l
}
})), f = b.qb.z, (g = a.qb.z) && (!f || f.ie != g.ie || f.he != g.he) && e[x]({
type:$m,
data:{
row:g.ie,
column:g.he
}
}), f && (!g || f.ie != g.ie || f.he != g.he) && e[x]({
type:an,
data:{
row:f.ie,
column:f.he
}
}), f = b.o.z, g = a.o.z, f.ob != g.ob && (g.ob != l && e[x](this.Vj($m, g.ob, l, c, d)), 
f.ob != l && e[x](this.Vj(an, f.ob, l, c, d))), b[rb].Yd(a[rb]) || e[x]({
type:po
}), Pr(e, Z(function(a) {
this[Ab](a[I], a[C]);
}, this));
}, pA[M].dispatchEvent = function(a, b) {
google[Hc][mb][cb](this.OB, a, b || l);
}, pA[M].Vj = function(a, b, c, d, e) {
return b = e[b], d == rn ? (c = b.Oe, d = l) :d = b.Oe, {
type:a,
data:{
row:c,
column:d
}
};
}, Ar(qA, Br), qA[M].Ea = function(a) {
this.Of = s.min(this.Of, a);
}, qA[M].sA = function() {
this.Of = r;
}, qA[M].On = function() {
var a = zr();
this.Of -= a - this.Sg, this.Sg = a, 0 >= this.Of && (this.lA(), this.Of = r);
}, Ar(rA, Br), Y = rA[M], Y.hA = function() {
this.Fa.sA();
}, Y.Xy = function(a) {
Ma(this.C[qc], a[C].Wb), this.Fa.Ea(50);
}, Y.Yy = function() {}, Y.Zy = function(a) {
Ma(this.C[qc], a[C].Wb), this.md[Ab](Zm, {
targetID:a[C].$h,
x:a[C].Wb.x,
y:a[C].Wb.y
});
}, Y.Wy = function(a) {
this.md[Ab](Ui, {
targetID:a[C].$h,
x:a[C].Wb.x,
y:a[C].Wb.y
});
}, Y.$y = function(a) {
this.md[Ab](eo, {
targetID:a[C].$h,
x:a[C].Wb.x,
y:a[C].Wb.y
});
}, Y.Uy = function(a) {
this.C.z.nd = a[C].Kb, this.Fa.Ea(50);
}, Y.Vy = function() {
this.Ir(), this.Fa.Ea(50);
}, Y.Ty = function(a) {
var b = this.p;
this.C[qc].Vp = this.C[qc][pc][Oc](), this.C[rb].ym(b.r[a[C].Kb].Oe, b.Oi == Mo), 
this.Fa.Ea(0);
}, Y.ps = function(a) {
this.p.J != ji && (this.C.o.z.ob = a[C].Mj, this.Fa.Ea(50));
}, Y.qs = function() {
this.p.J != ji && (this.C.o.z.ob = l, this.Fa.Ea(250));
}, Y.dz = function(a) {
this.p.J != ji && (this.ur(a[C].Mj), this.Fa.Ea(0));
}, Y.ez = function(a) {
this.C.o.vg == l && (this.C.o.vg = 0), this.C.o.vg += a[C].Tw, this.Fa.Ea(0);
}, Y.Lq = function(a) {
if (this.p.J != ji) {
var b = this.p.Rf;
(this.p.Gb == xo || b == Mj) && (this.C.z.Qb = a[C].ba, this.Fa.Ea(50));
}
}, Y.pr = function() {
if (this.p.J != ji) {
var a = this.p.Rf;
(this.p.Gb == xo || a == Mj) && (this.wr(), this.Fa.Ea(250));
}
}, Y.oq = function(a) {
this.p.J != ji && this.p.Gb == xo && (this.ur(a[C].ba), this.Fa.Ea(0));
}, Y.gz = function(a) {
this.ps(a);
}, Y.hz = function(a) {
this.qs(a);
}, Y.fz = function(a) {
this.md[Ab](Wn, {
index:a[C].Mj
});
}, Y.bz = function(a) {
this.p.Gb == xo ? this.Lq(a) :(this.C.z.Qb = a[C].ba, this.C.z.Bd = a[C].Kb, this.Fa.Ea(50));
}, Y.cz = function(a) {
this.p.Gb == xo ? this.pr(a) :(this.Jm(), this.Fa.Ea(250));
}, Y.az = function(a) {
var b = this.p;
if (b.Gb == xo) this.oq(a); else {
var c = b.Oi == Mo, d = a[C].Kb;
b.J == ji ? this.C[rb].ym(d, c) :(a = b.d[a[C].ba].Oe, this.p.Gb == xo ? this.C[rb].Gq(a, c) :this.C[rb].sq(d, a, c)), 
this.Fa.Ea(0);
}
}, Y.Hq = function(a) {
var b = a[C].of;
-1 != b && (this.C.qb.z = {
ie:a[C].Kb,
he:this.Tq(a[C].ba, b)
}, this.Jm(), this.Fa.Ea(50));
}, Y.kr = function(a) {
-1 != a[C].of && (this.C.qb.z = l, this.Fa.Ea(250));
}, Y.Sy = function(a) {
var b = this.p.Oi == Mo, c = a[C].Kb, d = a[C].ba, a = a[C].of;
-1 == a ? this.C.qb.Ni = {
ba:d,
Uk:c
} :(d = this.Tq(d, a), this.C[rb].sq(c, d, b)), this.Fa.Ea(0);
}, Y.iz = function(a) {
if (a[C].of === l) {
switch (this.p.Gb) {
case Bj:
this.C.z.Bd = a[C].Kb, this.C.z.Qb = a[C].ba;
break;

case xo:
this.C.z.Qb = a[C].ba;
break;

case vi:
this.C.z.nd = a[C].Kb;
}
this.Fa.Ea(50);
} else this.Hq(a);
}, Y.jz = function(a) {
if (a[C].of === l) {
switch (this.p.Gb) {
case Bj:
this.Jm();
break;

case xo:
this.wr();
break;

case vi:
this.Ir();
}
this.Fa.Ea(750);
} else this.kr(a);
}, Y.Qy = function(a) {
this.C.kc.z.Ph = a[C].Ph, this.Fa.Ea(50);
}, Y.Ry = function() {
this.C.kc.z.Ph = l, this.Fa.Ea(250);
}, Y.Jm = function() {
this.C.z.Qb = l, this.C.z.Bd = l;
}, Y.wr = function() {
this.C.z.Qb = l;
}, Y.Ir = function() {
Ma(this.C[qc], l), this.C.z.nd = l;
}, Y.Tq = function(a, b) {
var c = this.p, d = l;
if (a != l) d = c.d[a].K.annotation; else for (var e = 0; e < c.be[L]; ++e) d = c.be[e].K.annotation;
return d[b];
}, Y.Tx = function() {
var a = Z(function(a, c) {
eu(this.oe, a, Z(c, this));
}, this);
a(Li, this.Xy), a(Mi, this.Yy), a(Ni, this.Zy), a(Ki, this.Wy), a(Pi, this.$y), 
a(xi, this.Uy), a(yi, this.Vy), a(wi, this.Ty), a(Xl, this.ps), a(Yl, this.qs), 
a(Wl, this.dz), a(am, this.ez), a(vo, this.Lq), a(wo, this.pr), a(uo, this.oq), 
a(Un, this.gz), a(Vn, this.hz), a(Tn, this.fz), a(Dj, this.bz), a(Ej, this.cz), 
a(Cj, this.az), a(jh, this.Hq), a(kh, this.kr), a(ih, this.Sy), a(dq, this.iz), 
a(eq, this.jz), a(Yg, this.Qy), a(Zg, this.Ry);
}, Y.ur = function(a) {
var b = this.p, c = b.Oi == Mo, a = b.d[a].Oe;
b.J == rn ? this.C[rb].ym(a, c) :this.C[rb].Gq(a, c);
}, Ar(sA, Vx), Y = sA[M], Y.Dq = function(a, b) {
var c = this.e;
if (1 > a.d[L]) return n;
this.nl = b;
for (var d = 0; d < a.d[L] && 180 > a.d[d].ca; ) this.Wh(a.d[d]), d += 1;
a.ia.jl && this.Wh(a.ia.jl);
for (var e = a.d[L] - 1; e >= d; e--) this.Wh(a.d[e]);
return a.vc && (this.xj = c.aa(), this.Jq(a.vc), c[v](this.nl, this.xj)), j;
}, Y.Wh = function(a) {
if (a.v) {
var b = this.e.aa(), c = this.Pe, d = c.ia.ra, e = c.ia.wa, f = c.ia.$b, g = a[Zb];
if (a.F) {
var i = c.ia.Qk, k = a.F, m = new Bv();
m[xb](g.x + k.La.x, g.y + k.La.y), m.H(g.x + k.La.x, g.y + k.La.y + i), m.yb(g.x + f.x, g.y + f.y + i, d, e, k.fa, k.ca, j), 
m.H(g.x + k.bc.x, g.y + k.bc.y), m.yb(g.x + f.x, g.y + f.y, d, e, k.ca, k.fa, n), 
this.e.ja(m, k.a, b);
}
(a.ee || a.Qe) && (i = c.ia.Qk, c = new Bv(), c[xb](g.x + f.x, g.y + f.y), c.H(g.x + f.x, g.y + f.y + i), 
a.Qe && (c.H(g.x + a.bc.x, g.y + a.bc.y + i), c.H(g.x + a.bc.x, g.y + a.bc.y)), 
a.ee && (c.H(g.x + a.La.x, g.y + a.La.y + i), c.H(g.x + a.La.x, g.y + a.La.y)), 
this.e.ja(c, a.Ii, b)), a.zd ? 0 == a.dh && 0 == a.Zf ? this.e.So(f.x, f.y, d, e, a.a, b) :(c = new Bv(), 
c[xb](f.x, f.y - e), c.yb(f.x, f.y, d, e, 0, 180, j), c.yb(f.x, f.y, d, e, 180, 360, j), 
c[xb](f.x, f.y - a.Zf), c.yb(f.x, f.y, a.dh, a.Zf, 360, 180, n), c.yb(f.x, f.y, a.dh, a.Zf, 180, 0, n), 
c[Kc](), this.e.ja(c, a.a, b)) :(c = new Bv(), c[xb](g.x + a.to.x, g.y + a.to.y), 
c.H(g.x + a.La.x, g.y + a.La.y), c.yb(g.x + f.x, g.y + f.y, d, e, a.fa, a.ca, j), 
c.H(g.x + a.uo.x, g.y + a.uo.y), c.yb(g.x + f.x, g.y + f.y, a.dh, a.Zf, a.ca, a.fa, n), 
this.e.ja(c, a.a, b)), a.Eb && this.Xo(a.Eb, b), (d = a.Pc) && (d.F && (e = new Bv(), 
e[xb](d.F.La.x, d.F.La.y), e.H(d.F.La.x, d.F.La.y + i), e.yb(d.F.sb.x, d.F.sb.y + i, d.F.ra, d.F.wa, d.F.fa, d.F.ca, j), 
e.H(d.F.bc.x, d.F.bc.y), e.yb(d.F.sb.x, d.F.sb.y, d.F.ra, d.F.wa, d.F.ca, d.F.fa, n), 
this.e.ja(e, d.F.a, b)), (d.ee || d.Qe) && (e = new Bv(), e[xb](d.hg.x, d.hg.y), 
e.H(d.Xi.x, d.Xi.y), e.H(d.Xi.x, d.Xi.y + i), e.H(d.hg.x, d.hg.y + i), e.H(d.hg.x, d.hg.y), 
this.e.ja(e, d.Ii, b)), this.Xo(d, b)), a.al && this.e.Yg(a[z], a.bl.x + g.x, a.bl.y + g.y, a.Vi[y], gp, gp, a.u, b), 
g = kw([ Vo, a[sc] ]), b = b.t(), this.Qc(this.nl, g, b), a.G && (b = kw([ Xp, a[sc] ]), 
this.Le(a.G, b));
}
}, Y.Xo = function(a, b) {
if (a.zd) this.e.So(a.sb.x, a.sb.y, a.ra, a.wa, a.a, b); else {
var c = new Bv();
c[xb](a.La.x, a.La.y), c.yb(a.sb.x, a.sb.y, a.ra, a.wa, a.fa, a.ca, j), this.e.ja(c, a.a, b);
}
}, Y.Jq = function(a) {
for (var b = Z(this.de, this), c = Z(this.Nb, this), d = this.e, e = this.xj, f = 0; f < a[L]; ++f) {
var g = a[f], i = d.aa(), k = d.aa(), m = new Bv();
m[xb](g.fc.x + .5, g.fc.y + .5), m.H(g.xp + .5, g.fc.y + .5), m.H(g.xp + .5, g.ld.y + .5), 
m.H(g.ld.x + .5, g.ld.y + .5), d.ja(m, g.Pa, k), d.Tl(g.fc.x + .5, g.fc.y + .5, g.vp, g.zu, k), 
b(g.dg, i), b(g.eg, i), d[v](e, i), d[v](e, k), g = kw([ dm, g[sc] ]), c(i.t(), g);
}
}, Y.er = function(a, b) {
if (!Jv(b.vc, this.ve.vc)) {
this.e.Dg(this.xj);
var c = new jw(2);
c.vb(0, a.vc || {}), c.vb(1, b.vc || {}), c = c[nd](), this.Jq(c);
}
this.an(a, this.ve), this.$m(a, b);
}, Y.an = function(a, b) {
for (var c in b.d) {
if (b.d[c].G) {
var d = kw([ Xp, ja(c) ]);
this.Cg(d);
}
this.Wh(a.d[c]);
}
}, Y.$m = function(a, b) {
for (var c in b.d) {
var d = a.d[c], e = new jw(2);
e.vb(0, d), e.vb(1, b.d[c]), this.Wh(e[nd]());
}
}, Ar(tA, ly), tA[M].bi = function(a) {
return this.e.pn(a[Pc]);
}, tA[M].ys = function(a, b) {
var c = b[zc](Id);
switch (c[0]) {
case Vo:
if (c = ja(c[1]), 0 > c) break;
this[Ab](to + a, {
ba:c,
Kb:l
});
}
}, Ar(uA, Oy), Y = uA[M], Y.Cf = function(a, b, c) {
this.eo(a, b, c);
}, Y.Zq = function(a, b) {
return a.Yd(b, j);
}, Y.Sm = function(a) {
return this.fA[a];
}, Y.Ql = function(a, b) {
a.d = a.d || {};
var c = a.d;
return c[b] = c[b] || {}, c[b];
}, Y.eo = function(a, b, c) {
for (var d = this.je.Zk, e = d == qo || d == ci, d = d == dk || d == ci && 0 == b[rb][vc]()[L], f = b[rb].xm(), g = 0; g < f[L]; ++g) {
var i = f[g];
this.Sm(i) && (this.px(a, i, c), e && this.rr(a, i, c, b.kc));
}
e = b.z.Qb, e != l && this.Sm(e) && (this.sr(a, e, c), d && this.rr(a, e, c), a.vc && (c.vc = Zz(a.vc, e))), 
b = b.o.z.ob, b != l && this.Sm(b) && (this.sr(a, b, c), a.vc && (c.vc = Zz(a.vc, b)));
}, Y.sr = function(a, b, c) {
var d = a.ia, a = a.d[b], c = this.Ql(c, b);
c.Pc = {}, b = c.Pc, b.a = new vv({
stroke:a.a.Y,
Aa:6.5,
jd:.3
}), b.sb = new $(d.$b.x + a[Zb].x, d.$b.y + a[Zb].y), b.fa = a.fa, b.ca = a.ca, 
b.zd = a.zd;
var e = c.Eb;
e ? (c = e.ra + e.a.I / 2, d = e.wa + e.a.I / 2) :(c = d.ra + a.a.I / 2, d = d.wa + a.a.I / 2), 
b.ra = c + b.a.I / 2, b.wa = d + b.a.I / 2, d = ks(b.fa - 90), c = ks(b.ca - 90), 
b.La = ps(b.sb, Ky(d, b.ra, b.wa)), b.bc = ps(b.sb, Ky(c, b.ra, b.wa)), (e = a.F) && (b.F = b.F || {}, 
b.F.a = xv(e.a.Y, .3), b.F.sb = b.sb[Oc](), b.F.fa = e.fa, b.F.ca = e.ca, b.F.ra = b.ra + b.a.I / 2, 
b.F.wa = b.wa + b.a.I / 2, d = ks(b.F.fa - 90), c = ks(b.F.ca - 90), b.F.La = ps(b.F.sb, Ky(d, b.F.ra, b.F.wa)), 
b.F.bc = ps(b.F.sb, Ky(c, b.F.ra, b.F.wa))), b.ee = a.ee, b.Qe = a.Qe, (b.ee || b.Qe) && (b.Ii = xv(a.Ii.Y, .3), 
b.hv = b.ee ? d :c, a = function(a, b) {
return ps(a.sb, Ky(a.hv, a.ra + b * a.a.I / 2, a.wa + b * a.a.I / 2));
}, b.hg = a(b, -1), b.Xi = a(b, 1));
}, Y.px = function(a, b, c) {
var d = a.ia;
0 < d.Qk || (a = a.d[b], b = this.Ql(c, b), b.Eb = {}, b = b.Eb, b.a = yv(a.a.Y, 2), 
b.sb = new $(d.$b.x + a[Zb].x, d.$b.y + a[Zb].y), b.fa = a.fa, b.ca = a.ca, b.zd = a.zd, 
a = a.a.I / 2 + 2.5 + b.a.I / 2, b.ra = d.ra + a, b.wa = d.wa + a, d = ks(b.ca - 90), 
b.La = ps(b.sb, Ky(ks(b.fa - 90), b.ra, b.wa)), b.bc = ps(b.sb, Ky(d, b.ra, b.wa)));
}, Y.rr = function(a, b, c, d) {
c = this.Ql(c, b), a = this.je.mk(a, d != l, b, l, l), c.G = a, d && this.Vd.Cf(a, d, c.G);
}, Y = vA[M], Y.ok = function() {
return this.Xc;
}, Y.yh = function() {
return this.p;
}, Y.draw = function(a, b, c, d) {
this.jr();
a:{
for (var e = Yv() + We, f = ea[ec](lg), g = 0; g < f[L]; g++) if (f[g] && f[g].href && f[g].href == e) break a;
if (f = ea[Ib](mm), f.href = e, f.rel = vp, Da(f, Dp), 0 == ea[ec](cl)[L]) {
var e = ea[ec](kl)[0], g = ea[ec](Rh)[0], i = ea[Ib](cl);
e.insertBefore(i, g);
}
ea[ec](cl)[0][v](f);
}
for (c.isStacked && c.vAxis && c.vAxis.baseline && h(u("Cannot set a non-zero base-line for a stacked chart")), 
f = c.theme || [], mr(f) || (f = [ f ]), c = [ c ], e = 0; e < f[L]; ++e) {
var k;
qr(f[e]) ? (k = f[e], Xy || (g = {
colors:[ {
color:de,
dark:Wd,
light:je
}, {
color:$d,
dark:Xd,
light:he
}, {
color:ce,
dark:Vd,
light:me
}, {
color:Ud,
dark:Pd,
light:be
}, {
color:ie,
dark:ae,
light:ge
}, {
color:Rd,
dark:Od,
light:Yd
} ],
backgroundColor:{
gradient:{
color1:Qd,
color2:Ld,
x1:af,
y1:af,
x2:hf,
y2:hf
}
},
titleTextStyle:{
color:Tq
},
hAxis:{
textStyle:{
color:Tq
},
titleTextStyle:{
color:Tq
}
},
vAxis:{
textStyle:{
color:Tq
},
titleTextStyle:{
color:Tq
}
},
legend:{
textStyle:{
color:Tq
}
},
chartArea:{
backgroundColor:{
stroke:ee,
fill:X
}
},
areaOpacity:.8
}, Wy.classic = g, g = {
titlePosition:ql,
axisTitlesPosition:ql,
legend:{
position:ql
},
chartArea:{
width:hf,
height:hf
},
vAxis:{
textPosition:ql
},
hAxis:{
textPosition:ql
}
}, Wy.maximized = g, g = {
enableInteractivity:n,
legend:{
position:X
},
seriesType:wh,
lineWidth:1.6,
chartArea:{
width:hf,
height:hf
},
vAxis:{
textPosition:X,
gridlines:{
color:X
},
baselineColor:X
},
hAxis:{
textPosition:X,
gridlines:{
color:X
},
baselineColor:X,
type:zi
}
}, Wy.sparkline = g, Xy = j), k = Wy[k]) :pr(f[e]) ? k = f[e] :h(u("Theme should be a theme name or an options object.")), 
c[x](k);
}
if (c[x](Rx), this.i = new Lv(c), this.Hl = this.i.Uh(Uq) || this.na[uc] || 400, 
this.pg = this.i.Uh(dl) || this.na[Zc] || 200, k = new qs(this.Hl, this.pg), c = this.i.$(nk), 
!this.Xc || this.Xc.Rj) try {
this.Xc = new aw(this.na, k, a, c);
} catch (m) {
h(u("Your browser does not support charts"));
} else this.Xc.update(k, a);
this.C = new Py(d), this.Oc = b, this.Xc.bx(Z(this.ax, this), a);
}, Y.ax = function() {
var c, a = this.Xc.kj(), b = this.Xc.wp();
this.Ld ? (c = this.Ld.tp, this.Pl()) :c = this.p;
var d = this.i, e = new bA(this.Oc, d, Z(a.np, a), this.Hl, this.pg).yh();
this.wc = new rA(e, this.C, this.oe, this.md, Z(this.Gl, this, j));
var f = new qs(this.Hl, this.pg), g = {
eb:e.ed,
fontSize:e.Fc
}, i = e.Rf, k = e.Gb, m = e.d[L];
this.nj = e.J == rn ? new uA(d, f, g, i, k, m) :new Ry(d, f, g, i, k, m), this.qg = e.J == rn ? new sA(b, a) :new jy(b, a), 
(a = d.R(bh, 0)) ? (d = d.U(ch, fw, km), d = gw(d), d = {
duration:a,
Cu:d
}) :d = l, d && c && c.J == e.J && c[y] == e[y] && c[S] == e[S] && c.b.top == e.b.top && c.b[R] == e.b[R] && c.b[F] == e.b[F] && c.b[T] == e.b[T] ? (this.p = l, 
a = zr(), this.Ld = {
UB:c,
wu:e,
vu:new cA(c, e),
tp:c,
startTime:a,
uu:a + d.duration,
up:0,
Ul:new Ou(10),
tu:d.Cu,
qp:n
}, this.Fp(), eu(this.Ld.Ul, Kp, Z(this.Fp, this)), this.Ld.Ul[Q]()) :(this.p = e, 
this.rp(), this.sp()), this.md[Ab](On);
}, Y.jr = function() {
this.wc && !this.wc.Rj && this.wc.hA(), Dr(this.wc), ku(this.oe);
}, Y.clearChart = function() {
this.Ld && this.Pl(), this.jr(), Dr(this.Xc), ku(this);
}, Y.fx = function(a) {
var b = new hw();
b[Tb](a);
for (var a = b.jj(), b = n, c = 0; c < a[L]; c++) {
var d = a[c], e = d.row, d = this.p.Sf[d.column];
if (!d) return n;
var g, i, f = d.ba;
if (f != l ? g = this.p.d[f].c[e] :i = this.p.r[e], !g && !i) return n;
if (d.Sk == gh) {
if (b) return n;
if (b = j, !(g || i).xa) return n;
}
}
return j;
}, Y.setSelection = function(a) {
if (this.fx(a)) {
var b = l;
if (this.p.J != rn) {
var c = new hw();
c[Tb](a);
for (var c = c.jj(), d = 0; d < c[L]; d++) {
var e = c[d], f = this.p.Sf[e.column];
if (f.Sk == gh) {
b = {
ba:f.ba,
Uk:e.row
};
break;
}
}
}
this.Gl(j), this.C[rb][Tb](a), b && (this.C.qb.Ni = b), this.Gl(n);
}
}, Y.getSelection = function() {
return this.Bg[rb][vc]();
}, Y.Gl = function(a) {
var b = this.Bg;
if (!this.nj.Zq(this.C, this.Bg)) {
var c = this.nj.Xq(this.p, this.C);
this.qg.xw(this.p, c), this.Bg = this.C[Oc]();
}
a && this.md.ww(b, this.Bg, this.p.J, this.p.d);
}, Y.rp = function() {
var a = this.nj.Xq(this.p, this.C);
this.qg.drawChart(this.p, a), this.Bg = this.C[Oc]();
}, Y.sp = function() {
var a = this.Xc.kj(), b = this.Xc.wp(), a = this.p.J == rn ? new tA(this.oe, a, b) :new my(this.oe, a, b, this.p);
a.jy(), a.iy();
}, Y.Fp = function() {
var a = this.Ld;
if (a.qp) this.Pl(), this.p = a.wu, this.rp(), this.sp(), this.md[Ab](eh); else {
var b = zr(), c = (b - a.startTime) / (a.uu - a.startTime);
if (1 > c) {
if (b - a.up < 1e3 / 30) return;
} else c = 1, a.qp = j;
c = a.vu.yy(a.tu(c)), a.tp = c, a.up = b, this.qg.drawChart(c, {}), this.md[Ab](fh);
}
}, Y.Pl = function() {
Dr(this.Ld.Ul), this.Ld = l;
}, Y.getChartAreaBoundingBox = function() {
var a = this.p.b;
return {
left:a[F],
top:a.top,
width:a[y],
height:a[S]
};
}, Y.getBoundingBox = function(a) {
return this.qg == l ? l :(a = this.qg[cc](a), a ? {
left:a[F],
top:a.top,
width:a[T] - a[F],
height:a[R] - a.top
} :l);
}, Y.getChartLayoutInterface = function() {
var a = this.p;
return {
getChartAreaBoundingBox:Z(this.getChartAreaBoundingBox, this),
getBoundingBox:Z(this[cc], this),
getXLocation:Z(fy, l, a),
getYLocation:Z(gy, l, a),
getHAxisValue:Z(hy, l, a),
getVAxisValue:Z(iy, l, a)
};
}, Y = wA[M], Y.Ft = function() {
return this.zi ? (this.zi[ld] != this.na && this.na[v](this.zi), this.zi) :this.na;
}, Y.addError = function(a) {
this.MB(a, Vj);
}, Y.MB = function(a, b) {
var c = this.Ft(), d = {
removable:j,
type:b
}, c = {
id:google[Hc].errors.addError(c, a, l, d),
message:a,
detailedMessage:U,
options:d
};
google[Hc][mb][cb](this.bA, Vj, c);
}, Y.removeAll = function() {
var a = this.Ft();
google[Hc].errors[Tc](a);
}, Y.ut = function(a, b) {
try {
return a[P](b);
} catch (c) {
this.addError(c.message);
}
}, xA[M].EA = function(a, b) {
return Z(function() {
if (!this.zt) {
var c = arguments;
this.oB.ut(function() {
a[gd](b, c);
});
}
}, this);
}, xA[M].mt = function() {
this.zt = j;
}, yA[M].getContainer = function() {
return this.Zc;
}, yA[M].draw = function(a, b, c) {
this.Xs.ut(Z(function() {
this.Bn(a, b, c);
}, this));
}, yA[M].Bn = function(a, b, c) {
a || h(u("Data table is not defined.")), this.Ge && this.Ge.mt(), this.Ge = new xA(this.Xs);
var d = Z(this.Ge.EA, this.Ge);
this.DA(d, a, b, c);
}, yA[M].clearChart = function() {
this.Ge && (this.Ge.mt(), this.Ge = l), this.XA();
}, Ar(CA, yA);
var DA = 0;
Y = CA[M], Y.oz = function() {
this.oa || (this.oa = new vA(this.Zc, this));
}, Y.setChartType = function(a, b, c, d) {
this.Fg = a, b != l && (this.Js = b), c != l && (this.Hb = c), d != l && (this.os = d);
}, Y.DA = function(a, b, c, d) {
if (c = c || {}, c = AA(c, BA), c = new vu(aa).pz(c), uu(c), c = zA(c), this.oz(), 
this.qz(c), this.rz(c), Fa(c, c[Wb] || this.Hb), c.theme = c.theme || this.os, this.Fg != X) {
var e = c;
e.hAxis = e.hAxis || {}, e.vAxis = e.vAxis || {};
var f = e.hAxis, g = e.vAxis, i = l;
switch (e[I]) {
case no:
i = g;
break;

case W:
e.targetAxis = e.targetAxis || {}, i = e.targetAxis;
}
i && (EA(e, zm, i, Cm), EA(e, tm, i, wm), EA(e, om, i, om)), f && (EA(e, pm, f, om), 
EA(e, Up, f, Pp)), g && EA(e, Vp, g, Pp), e.smoothLine && !jr(e.curveType) && (e.curveType = W), 
EA(e, im, e, jm), EA(e, Zn, e, $n), e.chartArea = e.chartArea || {}, EA(e, Ch, e.chartArea, Fh);
}
e = c, FA(e, Qp, Rp, Tp), FA(e, bm, Zl, cm), GA(e.hAxis);
for (var k in e.hAxes) GA(e.hAxes[k]);
GA(e.vAxis);
for (k in e.vAxes) GA(e.vAxes[k]);
k = e.tooltip, k == l && (k = {}, e.tooltip = k), FA(e, gq, cq, hq), EA(e, hq, k, Ip), 
EA(e, fq, k, Ap), EA(e, iq, k, oq), k[cb] == jl && (k.trigger = dk), k = e.legend, 
k != l ? typeof k == op && (f = k, k = {}, e.legend = k, Ma(k, f)) :(k = {}, e.legend = k), 
EA(e, cm, k, Ip), k = e.animation, k != l ? typeof k == Um && (f = 1e3 * k, k = {}, 
e.animation = k, k.duration = f) :(k = {}, e.animation = k), EA(e, dh, k, Rj), google[Hc].errors[Tc](this.Zc), 
b || h(u("Data table is not defined")), this.nz = (k = b[Mb](0) != Um) ? 1 :0, b[mc](), 
this.Fg == rn && (k && 1 == b[tb]() ? (b = google[Hc][C].group(b, [ 0 ], [ {
column:0,
aggregation:google[Hc][C].count,
type:Um
} ]), this.Cn = j) :c.aggregate && k && (b = google[Hc][C].group(b, [ 0 ], [ {
column:this.nz,
aggregation:google[Hc][C].sum,
type:Um
} ]), this.Cn = j)), this.oa[Vc](a, b, c, d);
}, Y.getSelection = function() {
return this.Cn ? l :this.oa[vc]();
}, Y.setSelection = function(a) {
this.oa[Tb](a);
}, Y.qz = function(a) {
switch (a[I]) {
case hm:
this[tc](W, hm, il), Da(a, l);
break;

case wh:
this[tc](W, wh, il), Da(a, l);
break;

case oj:
this[tc](W, Jh, il), Da(a, l);
break;

case Jh:
this[tc](W, Jh, Mq), Da(a, l);
break;

case no:
this[tc](no), Da(a, l);
break;

case rn:
this[tc](rn), Da(a, l);
}
var b = this.Fg;
b == X && (b = l);
var c = a[I] || X;
c == X && (c = l), !b && !c && h(u("Unspecified chart type.")), b && c && b != c && h(u("Incompatible chart types.")), 
Da(a, b || c);
}, Y.rz = function(a) {
if (a[I] == W) {
var b = this.Js;
b == X && (b = l);
var c = a.seriesType || X;
c == X && (c = l), b && c && b != c && h(u("Incompatible default series types.")), 
a.seriesType = b || c;
}
}, Y.XA = function() {
this.oa[Gc]();
}, Y.NB = function() {
var a = this.oa.ok().kj();
return a.Rz ? a.Zc.innerHTML :U;
}, Y.ok = function() {
return this.oa.ok();
}, Y.yh = function() {
return this.oa.yh();
}, Y.getChartLayoutInterface = function() {
var a = this.oa.getChartLayoutInterface();
return {
getChartAreaBoundingBox:a.getChartAreaBoundingBox,
getBoundingBox:a[cc],
getXLocation:a.getXLocation,
getYLocation:a.getYLocation,
getHAxisValue:a.getHAxisValue,
getVAxisValue:a.getVAxisValue
};
}, Ar(HA, CA), Ar(IA, CA), Ar(JA, CA), Ar(KA, CA), Ar(LA, CA), Ar(MA, CA), Ar(NA, CA), 
Ar(OA, CA), Ar(PA, CA), Ar(QA, CA), Ar(RA, CA), Ar(SA, Nu);
var TA = {
ts:zm,
ss:tm,
qk:ci
}, UA = {
zp:"rangeSelectorMinHandle",
yp:"rangeSelectorMaxHandle",
Bp:"rangeSelectorMinScreen",
Ap:"rangeSelectorMaxScreen"
}, VA = {
KC:mg,
eC:Rf,
qC:Yf,
dD:zg
}, WA = {
fill:Zd,
Cb:.5
}, XA = {
chartArea:{
top:Ye,
height:hf
},
enableInteractivity:n,
legend:{
position:X
},
hAxis:{
textPosition:ql
},
vAxis:{
textPosition:X,
gridlines:{
color:X
}
}
}, YA = {
chartArea:{
left:Ye,
width:hf
},
enableInteractivity:n,
legend:{
position:X
},
vAxis:{
textPosition:ql
},
hAxis:{
textPosition:X,
gridlines:{
color:X
}
}
}, ZA = {
a:new vv({
stroke:"#000",
fill:ke
}),
ug:new qs(10, 16),
Up:3
};
Y = SA[M], Y.draw = function(a, b, c) {
this.oa && this[Gc](), this.Oc = a;
var d;
a:{
switch (a[Mb](0)) {
case Um:
d = {
Lc:Xw,
Mg:Yw
};
break a;

case zj:
case Aj:
d = {
Lc:Zw,
Mg:$w
};
break a;

case Op:
d = {
Lc:ax,
Mg:bx
};
break a;
}
d = aa;
}
this.Vb = d, this.Ra = {}, this.oy(), b = new Lv([ b || {} ]), this.sy(b), this.Sd = this.py(b), 
c = c || {}, google[Hc][mb].addListener(this.oa, On, Z(this.ry, this, c)), this.vj && this.qy(c), 
this.oa[Vc](a, this.Sd);
}, Y.qy = function(a) {
this.Hj = this.Oc[J](0, 0), this.Gj = this.Oc[J](this.Oc[mc]() - 1, 0);
var b = {};
b.min = this.Hj, b.max = this.Gj, a.range && this.gr(b, a.range), this.Sd.domainAxis = this.Sd.domainAxis || {}, 
this.Sd.domainAxis.viewWindow = b;
}, Y.oy = function() {
this.Rh == l && (this.Rh = new qA(Z(this.JA, this))), this.Qh == l && (this.Qh = new qA(Z(this.Km, this, j)));
}, Y.sy = function(a) {
this.Mh = a.R(Mn, 50), this.lq = a.R(Am, 0), this.El = a.$(ck, n), this.vj = a.$(cr, n), 
this.cm = a.$(Zo, n), this.bm = a.$(Di, n), this.sl = a.Ne(Lo, new vv(WA)), this.rl = wv[Oc](), 
this.oa = this.Nx(a), this.Ya = this.Ox(a);
}, Y.Ox = function(a) {
return a.U(bn, Ex, il) == Mq;
}, Y.Nx = function(a) {
switch (a.U(Qi, VA, Yf)) {
case Rf:
return new HA(this.na);

case Yf:
return new QA(this.na);

case zg:
return new LA(this.na);

case mg:
return new KA(this.na);

default:
return new QA(this.na);
}
}, Y.py = function(a) {
return a = Kv(a.Vh(Oi)), a.theme = this.Ya ? YA :XA, a;
}, Y.Jz = function(a, b, c) {
var d = vw(a[mc](), function(c) {
return a[J](c, b);
}), d = Qr(d, lr);
return Rr(d, c);
}, Y.Ww = function(a) {
var b = this.Za, a = this.Jz(a, 0, b[pc].Jb);
return this.Ya ? 1 == b.Tc ? a[jb]() :a :1 == b.Tc ? a :a[jb]();
}, Y.Zw = function() {
var a = this.lq;
if (0 >= a) this.Fj = 1; else {
var b = 0, b = this.Tb.jc.min, c = this.Za[pc].Md(b), d = l;
or(c) ? (d = new Date(), d[cd](c[dc]() + a)) :d = c + a, b = s[lb](s.abs(this.Za[pc].Jb(d) - b)), 
a = s.max(b, 1), this.Fj = a < this.Tb.jc.max - this.Tb.jc.min ? a :1;
}
}, Y.ry = function(a) {
google[Hc][mb].removeAllListeners(this.oa), this.dc = {
we:j
}, this.rs(a), this.Ib = this.oa.ok().kj(1), this.Bn();
}, Y.Vq = function(a) {
google[Hc][mb].removeAllListeners(this.oa), this.rs(a), this.nn(ci);
}, Y.rs = function(a) {
this.p = this.oa.yh(), this.Za = this.Yw(), this.Tb.jc = this.Vw(), this.Tb.value = this.Xw(), 
this.Zw(), (this.cm || this.bm) && (this.qm = this.Ww(this.Oc)), a && (a = a.range, 
this.Da.ya = this.Uq(pr(a) ? a[Q] :l, pr(a) ? a.end :l));
}, Y.Yw = function() {
return this.Ya ? this.p.va[0] :this.p.Ja[0];
}, Y.Vw = function() {
return {
min:s.min(this.Za.ac, this.Za.xb),
max:s.max(this.Za.ac, this.Za.xb)
};
}, Y.Xw = function() {
var a = this.Za[pc].Md(this.Za.ac), b = this.Za[pc].Md(this.Za.xb);
return {
min:s.min(a, b),
max:s.max(a, b)
};
}, Y.Bn = function() {
var a = this.Ib, b = this.p, c = a.Lo(b[y], b[S]), d = a.aa(n);
a[v](c, d), c = b.b, a.Ga(0, 0, b[y], b[S], this.rl, d);
var b = a.Ga(c[F], c.top, c[y], c[S], this.rl, d), e = this.Dp(), e = a.Ga(e[F], e.top, e[y], e[S], this.sl, d);
this.Ra[UA.Bp] = e, e = this.Cp(), e = a.Ga(e[F], e.top, e[y], e[S], this.sl, d), 
this.Ra[UA.Ap] = e, e = this.Sp(this.Da.ya.ub, c, ZA.ug, ZA.Up, a, ZA.a, d), this.Ra[UA.zp] = e, 
a = this.Sp(this.Da.ya.tb, c, ZA.ug, ZA.Up, a, ZA.a, d), this.Ra[UA.yp] = a;
var f = gt(this.na);
eu(f[Lc], Im, Z(this.cv, this, this.dc)), eu(f[Lc], Lm, Z(this.Tp, this, this.dc)), 
d = d.t(), eu(d, Im, Z(this.dv, this, this.dc)), eu(d, Jm, Z(this.Kh, this, this.dc, {
type:oo,
Ih:n
})), (this.Al = pt(d, function(a) {
return a == f[Lc];
})) || eu(d, Lm, Z(this.Tp, this, this.dc)), this.El || (this.Rp(e, zm, zm), this.Rp(a, tm, tm)), 
eu(b, Hm, Z(this.Qp, this, this.dc, {
ib:ci
})), eu(b, Km, Z(this.Kh, this, this.dc, {
type:oo,
Ih:j
})), eu(b, Jm, Z(this.Kh, this, this.dc, {
type:oo,
Ih:n
})), google[Hc][mb][cb](this, On, l);
}, Y.Rp = function(a, b, c) {
eu(a, Hm, Z(this.Qp, this, this.dc, {
ib:c
})), eu(a, Km, Z(this.Kh, this, this.dc, {
type:b,
Ih:j
})), eu(a, Jm, Z(this.Kh, this, this.dc, {
type:b,
Ih:n
}));
}, Y.Sp = function(a, b, c, d, e, f, g) {
var i = e.aa(n);
e[v](g, i);
var g = .5 * c[y], k = this.Ya ? b[F] :this.Jg(a - g), a = this.Ya ? this.Jg(a - g) :b.top;
return e.Ze(i.t(), k, a), this.Ya ? (this.Qr(0, s[B](g), b[S], b[y], e, f, i), this.El || this.Rr(.5 * (b[y] - c[S]), 0, c[S], c[y], d, e, f, i)) :(this.Qr(s[B](g), 0, b[S], b[y], e, f, i), 
this.El || this.Rr(0, .5 * (b[S] - c[S]), c[y], c[S], d, e, f, i)), i.t();
}, Y.Qr = function(a, b, c, d, e, f, g) {
a = Cv(this.Ya ? [ {
x:a,
y:b
}, {
x:a + d,
y:b
} ] :[ {
x:a,
y:b
}, {
x:a,
y:b + c
} ]), e.ja(a, f, g);
}, Y.Rr = function(a, b, c, d, e, f, g, i) {
var c = a + c, d = b + d, k = Cv([ {
x:a + e,
y:b
}, {
x:c - e,
y:b
}, {
x:c,
y:b + e
}, {
x:c,
y:d - e
}, {
x:c - e,
y:d
}, {
x:a + e,
y:d
}, {
x:a,
y:d - e
}, {
x:a,
y:b + e
} ], n);
f.ja(k, g, i), k = e + 1, this.Ya ? (e = Cv([ {
x:a + k,
y:b + k
}, {
x:c - k,
y:b + k
} ]), a = Cv([ {
x:a + k,
y:d - k
}, {
x:c - k,
y:d - k
} ])) :(e = Cv([ {
x:a + k,
y:b + k
}, {
x:a + k,
y:d - k
} ]), a = Cv([ {
x:c - k,
y:b + k
}, {
x:c - k,
y:d - k
} ])), f.ja(e, g, i), f.ja(a, g, i);
}, Y.Dp = function() {
var a = this.p.b, b = this.Da.ya.ub;
return this.Ya ? new zt(a[F], a.top, a[y], b - a.top) :new zt(a[F], a.top, b - a[F], a[S]);
}, Y.Cp = function() {
var a = this.p.b, b = this.Da.ya.tb;
return this.Ya ? new zt(a[F], b, a[y], a[R] - b) :new zt(b, a.top, a[T] - b, a[S]);
}, Y.Uq = function(a, b) {
var c = this.Tb.jc.min, d = this.Tb.jc.max, e = 1 == this.Za.Tc && !this.Ya;
if (a != l) {
var f = this.Za[pc].Jb(a);
e ? c = s.max(f, c) :d = s.min(f, d);
}
return b != l && (f = this.Za[pc].Jb(b), e ? d = s.min(f, d) :c = s.max(f, c)), 
{
ub:c,
tb:d
};
}, Y.getRange = function() {
var a = this.Da.ya, b = this.Za[pc].Md(a.ub), a = this.Za[pc].Md(a.tb), c = 1 == this.Za.Tc && !this.Ya;
return {
start:c ? b :a,
end:c ? a :b
};
}, Y.setRange = function(a, b) {
if (!this.dc.we) return n;
var c = this.Da.ya;
return c.ub == l || c.tb == l ? n :(c = this.Uq(a, b), c = this.Om(c.ub, c.tb, ci), 
this.Da.ib = l, c);
}, Y.Om = function(a, b, c) {
var d = this.Da.ya;
return d.ub == a && d.tb == b ? n :(this.Da.ya = {
ub:a,
tb:b
}, this.nn(c), j);
}, Y.nn = function(a) {
var b = this.Ya ? ZA.ug[S] :ZA.ug[y], c = this.Ya ? ZA.ug[y] :ZA.ug[S];
if (a != tm) {
var d = this.Dp(), e = this.Ra[UA.Bp], f = this.Ra[UA.zp];
if (this.Ya) {
var g = this.Jg(d.top + d[S] - .5 * c);
this.Ib.Ze(f, 0, g), this.Ib.sn(e, d.top), this.Ib.qn(e, d[S]);
} else g = this.Jg(d[F] + d[y] - .5 * b), this.Ib.Ze(f, g, 0), this.Ib.rn(e, d[F]), 
this.Ib.tn(e, d[y]);
}
a != zm && (a = this.Cp(), d = this.Ra[UA.Ap], e = this.Ra[UA.yp], this.Ya ? (g = this.Jg(a.top - .5 * c), 
this.Ib.Ze(e, 0, g), this.Ib.sn(d, a.top), this.Ib.qn(d, a[S])) :(g = this.Jg(a[F] - .5 * b), 
this.Ib.Ze(e, g, 0), this.Ib.rn(d, a[F]), this.Ib.tn(d, a[y])));
}, Y.JA = function() {
this.nn(this.Da.ib);
}, Y.xr = function() {
var a = this.Tb.jc.max - this.Tb.jc.min, b = this.Za.Tc, c = (this.Da.ya.ub - this.Tb.jc.min) / a;
return .1 > c ? {
direction:-1 * b,
dr:c / .1
} :(a = (this.Tb.jc.max - this.Da.ya.tb) / a, .1 > a ? {
direction:1 * b,
dr:a / .1
} :l);
}, Y.Lm = function() {
if (this.vj) {
var a = n;
this.Da.ib == ci && this.xr() && (a = j), a && !this.ze ? (this.ze = new Ou(this.Mh), 
eu(this.ze, Kp, Z(this.Kz, this)), this.ze[Q]()) :!a && this.ze && (Dr(this.ze), 
this.ze = l);
}
}, Y.Kz = function() {
if (this.ze) {
var a = this.xr(), b = this.Mh / (1e3 + 59e3 * a.dr), c = this.Vb.Lc(this.Hj), d = this.Vb.Lc(this.Gj), e = (d - c) * b, b = this.Sd.domainAxis.viewWindow, f = b.max, g = this.Vb.Lc(b.min), f = this.Vb.Lc(f);
0 > a[bb] ? (c = s.max(g - e, c), a = f - (g - c)) :(a = s.min(f + e, d), c = g + (a - f)), 
g = this.Vb.Mg(c), a = this.Vb.Mg(a), b.min = g, b.max = a, google[Hc][mb].addListener(this.oa, On, Z(this.Vq, this, l)), 
this.oa[Vc](this.Oc, this.Sd), this.Km(j);
}
}, Y.dv = function(a, b) {
a.we && this.Da.ib != l && (this.Al || this.Ls(b), Na(b[Pc][O], Mm));
}, Y.cv = function(a, b) {
a.we && this.Da.ib != l && this.Ls(b);
}, Y.Ls = function(a) {
var b = this.Da;
b.ya && b.ya.ub != l && b.ya.tb != l || (b.ya = {
ub:this.Tb.jc.min,
tb:this.Tb.jc.max
}), a = Ot(a), a = this.jx((this.Ya ? a.y :a.x) - b.Ej), b.Ej += a, b.ib != tm && (b.ya.ub += a), 
b.ib != zm && (b.ya.tb += a), this.Lm(), this.Rh.Ea(this.Mh), this.Qh.Ea(this.Mh);
}, Y.jx = function(a) {
var d, e, b = this.Da.ya, c = this.Tb.jc;
switch (this.Da.ib) {
case ci:
d = c.min - b.ub, e = c.max - b.tb;
break;

case zm:
d = c.min - b.ub, e = b.tb - this.Fj - b.ub;
break;

case tm:
d = b.ub + this.Fj - b.tb, e = c.max - b.tb;
}
return is(a, d, e);
}, Y.Qp = function(a, b, c) {
if (a.we && c.mz()) {
var a = Ot(c), d = this.Da;
d.Ej = this.Ya ? a.y :a.x, d.ib = b.ib, this.Lm(), c[vb]();
}
}, Y.Tp = function(a) {
if (a.we && (a = this.Da, a.ib !== l)) {
if (this.cm) {
var b = this.qm, c = a.ya.tb, d = tv(b, a.ya.ub), b = tv(b, c);
this.Om(d, b, a.ib);
} else if (this.bm) {
var e = new mv(a.ya.ub, a.ya.tb), d = e.end - e[Q], c = this.Tb.jc, b = c.max - c.min;
b > d || ov(b, d, 1e-5), b = this.qm, b = this.Uw(e, b), Va(b, s.max(b[Q], c.min)), 
b.end = b[Q] + d, b.end = s.min(b.end, c.max), Va(b, b.end - d), this.Om(b[Q], b.end, a.ib);
} else this.vj && a.ib != ci && (b = this.Sd.domainAxis.viewWindow, d = this.getRange(), 
this.gr(b, d), google[Hc][mb].addListener(this.oa, On, Z(this.Vq, this, {
range:d
})), this.oa[Vc](this.Oc, this.Sd));
this.Km(n), a.ib = l, this.Lm();
}
}, Y.Uw = function(a, b) {
var c = Z(nv, l, a), d = Vr(b, c), e = Xr(b, c);
return (d === l || e === l) && (d = tv(b, a[Q]), c = tv(b, a.end), e = d = c = s.abs(a[Q] - d) <= s.abs(a.end - c) ? d :c), 
c = a.end - a[Q], d = ms(d, e) - c / 2, e = d + c, ov(e - d, c, 1e-5), new mv(d, e);
}, Y.gr = function(a, b) {
var c = a.max, d = this.Vb.Lc(a.min), c = this.Vb.Lc(c), e = c - d, f = b.end, g = this.Vb.Lc(b[Q]), i = this.Vb.Lc(f), f = i - g, k = .1 * e, m = .6 * e;
f >= k && m >= f || (g = (g + i) / 2, e /= (k > f ? .9 * m :1.1 * k) / f, e = new mv(g - e / 2, g + e / 2), 
k > f || (d = this.Vb.Lc(this.Hj), c = this.Vb.Lc(this.Gj)), this.Rs(e, new mv(d, c)), 
d = this.Vb.Mg(e[Q]), c = this.Vb.Mg(e.end), a.min = d, a.max = c);
}, Y.Rs = function(a, b) {
a[Q] < b[Q] && (a.end += b[Q] - a[Q], Va(a, b[Q])), a.end > b.end && (Va(a, a[Q] - (a.end - b.end)), 
a.end = b.end), a[Q] < b[Q] && Va(a, b[Q]);
}, Y.Jg = function(a) {
return s[D](a) + .5;
}, Y.Kh = function(a, b, c) {
a.we && !this.Da.ib && Na(c[Pc][O], b.Ih ? b[I] == oo ? Mm :this.Ya ? io :$i :Gj);
}, Y.Km = function(a) {
var b = this.Da.ib, c = this.getRange();
if (b != l && c != l) {
var d = this.Za.Tc;
google[Hc][mb][cb](this, Nn, {
start:c[Q],
end:c.end,
startChanged:b == (1 == d ? TA.ts :TA.ss) || b == TA.qk,
endChanged:b == (1 == d ? TA.ss :TA.ts) || b == TA.qk,
inProgress:a
});
}
}, Y.xs = function(a) {
a != l && a.pi();
}, Y.clearChart = function() {
google[Hc][mb].removeAllListeners(this.oa), this.xs(this.Rh), this.Rh = l, this.xs(this.Qh), 
this.Qh = l, this.dc.we = n, Dr(this.Ib), this.Ib = l, this.oa[Gc](), this.oa = l, 
ku(this);
}, ba("google.visualization.CoreChart", CA), ha(CA[M], Pj, CA[M][Vc]), ha(CA[M], yk, CA[M][vc]), 
ha(CA[M], Eo, CA[M][Tb]), ha(CA[M], "dump", CA[M].NB), ha(CA[M], "clearChart", CA[M][Gc]), 
ha(CA[M], "getChartLayoutInterface", CA[M].getChartLayoutInterface), ha(CA[M], "getContainer", CA[M][id]), 
ba("google.visualization.AreaChart", HA), ha(HA[M], Pj, HA[M][Vc]), ha(HA[M], yk, HA[M][vc]), 
ha(HA[M], Eo, HA[M][Tb]), ba("google.visualization.BarChart", NA), ha(NA[M], Pj, NA[M][Vc]), 
ha(NA[M], yk, NA[M][vc]), ha(NA[M], Eo, NA[M][Tb]), ba("google.visualization.BubbleChart", MA), 
ha(MA[M], Pj, MA[M][Vc]), ha(MA[M], yk, MA[M][vc]), ha(MA[M], Eo, MA[M][Tb]), ba("google.visualization.CandlestickChart", OA), 
ha(OA[M], Pj, OA[M][Vc]), ha(OA[M], yk, OA[M][vc]), ha(OA[M], Eo, OA[M][Tb]), ba("google.visualization.ColumnChart", PA), 
ha(PA[M], Pj, PA[M][Vc]), ha(PA[M], yk, PA[M][vc]), ha(PA[M], Eo, PA[M][Tb]), ba("google.visualization.ComboChart", QA), 
ha(QA[M], Pj, QA[M][Vc]), ha(QA[M], yk, QA[M][vc]), ha(QA[M], Eo, QA[M][Tb]), ba("google.visualization.LineChart", KA), 
ha(KA[M], Pj, KA[M][Vc]), ha(KA[M], yk, KA[M][vc]), ha(KA[M], Eo, KA[M][Tb]), ba("google.visualization.PieChart", RA), 
ha(RA[M], Pj, RA[M][Vc]), ha(RA[M], yk, RA[M][vc]), ha(RA[M], Eo, RA[M][Tb]), ba("google.visualization.ScatterChart", LA), 
ha(LA[M], Pj, LA[M][Vc]), ha(LA[M], yk, LA[M][vc]), ha(LA[M], Eo, LA[M][Tb]), ba("google.visualization.SparklineChart", JA), 
ha(JA[M], Pj, JA[M][Vc]), ha(JA[M], yk, JA[M][vc]), ha(JA[M], Eo, JA[M][Tb]), ba("google.visualization.SteppedAreaChart", IA), 
ha(IA[M], Pj, IA[M][Vc]), ha(IA[M], yk, IA[M][vc]), ha(IA[M], Eo, IA[M][Tb]), ba("google.visualization.RangeSelector", SA), 
ha(SA[M], Pj, SA[M][Vc]), ha(SA[M], "getRange", SA[M].getRange), ha(SA[M], "setRange", SA[M].setRange);
}(), google.loader.loaded({
module:"visualization",
version:"1.0",
components:[ "corechart", "default", "format" ]
}), google.loader.eval.visualization = function() {
eval(arguments[0]);
}, google.loader.eval.scripts && google.loader.eval.scripts.visualization && (!function() {
for (var scripts = google.loader.eval.scripts.visualization, i = 0; i < scripts.length; i++) google.loader.eval.visualization(scripts[i]);
}(), google.loader.eval.scripts.visualization = null);
}(), function() {
!function() {
function w(a, b) {
return a.format = b;
}
function da(a, b) {
return a.type = b;
}
function Jc(a, b) {
for (var e, c = a[qa](M), d = b || R; e = c.shift(); ) {
if (d[e] == h) return h;
d = d[e];
}
return d;
}
function Kc(a) {
var b = typeof a;
if (b == hc) {
if (!a) return gc;
if (a instanceof q) return ub;
if (a instanceof Object) return b;
var c = Object[I][na][J](a);
if (c == pb) return hc;
if (c == nb || typeof a[H] == P && "undefined" != typeof a.splice && "undefined" != typeof a[pa] && !a[pa](qc)) return ub;
if (c == ob || "undefined" != typeof a[J] && "undefined" != typeof a[pa] && !a[pa](Ab)) return Lb;
} else if (b == Lb && "undefined" == typeof a[J]) return hc;
return b;
}
function Lc(a) {
var b = typeof a;
return (b == hc && a != h || b == Lb) && typeof a.getFullYear == Lb;
}
function Mc(a) {
return a[J][va](a.bind, arguments);
}
function Nc(a, b) {
if (!a) throw s();
if (2 < arguments[H]) {
var d = q[I][fa][J](arguments, 2);
return function() {
var c = q[I][fa][J](arguments);
return q[I].unshift[va](c, d), a[va](b, c);
};
}
return function() {
return a[va](b, arguments);
};
}
function Oc() {
return Oc = Function[I].bind && -1 != Function[I].bind[na]()[F](cc) ? Mc :Nc, Oc[va](h, arguments);
}
function Pc(a) {
var c = q[I][fa][J](arguments, 1);
return function() {
var b = q[I][fa][J](arguments);
return b.unshift[va](b, c), a[va](this, b);
};
}
function Qc(a) {
this.L = a || {};
a:{
var b = Rc() + Qa;
a = l[la](gb);
for (var c = 0; c < a[H]; c++) if (a[c] && a[c].href && a[c].href == b) break a;
if (a = l.createElement(Yb), a.href = b, a.rel = tc, da(a, vc), 0 == l[la](Ub)[H]) {
var b = l[la](Wb)[0], c = l[la](xb)[0], d = l.createElement(Ub);
b.insertBefore(d, c);
}
l[la](Ub)[0].appendChild(a);
}
}
function S(a, b, c) {
return a = c !== g ? a.toFixed(c) :v(a), c = a[F](M), -1 == c && (c = a[H]), b = n.max(0, b - c), 
q(b + 1)[K](N) + a;
}
function Sc(a, b) {
for (var c = 0, d = v(a)[B](/^[\s\xa0]+|[\s\xa0]+$/g, L)[qa](M), e = v(b)[B](/^[\s\xa0]+|[\s\xa0]+$/g, L)[qa](M), f = n.max(d[H], e[H]), p = 0; 0 == c && f > p; p++) {
var r = d[p] || L, C = e[p] || L, T = RegExp(Ha, Mb), Z = RegExp(Ha, Mb);
do {
var x = T.exec(r) || [ L, L, L ], u = Z.exec(C) || [ L, L, L ];
if (0 == x[0][H] && 0 == u[0][H]) break;
c = ((0 == x[1][H] ? 0 :t(x[1], 10)) < (0 == u[1][H] ? 0 :t(u[1], 10)) ? -1 :(0 == x[1][H] ? 0 :t(x[1], 10)) > (0 == u[1][H] ? 0 :t(u[1], 10)) ? 1 :0) || ((0 == x[2][H]) < (0 == u[2][H]) ? -1 :(0 == x[2][H]) > (0 == u[2][H]) ? 1 :0) || (x[2] < u[2] ? -1 :x[2] > u[2] ? 1 :0);
} while (0 == c);
}
return c;
}
function Wc(a) {
var b = {};
a = v(a);
var c = a[E](0) == Aa ? a :Aa + a;
if (Xc[ea](c)) return b.k = Yc(c), da(b, Vb), b;
a:{
var d = a.match(Zc);
if (d) {
var c = ca(d[1]), e = ca(d[2]), d = ca(d[3]);
if (c >= 0 && 255 >= c && e >= 0 && 255 >= e && d >= 0 && 255 >= d) {
c = [ c, e, d ];
break a;
}
}
c = [];
}
if (c[H]) return b.k = $c(c[0], c[1], c[2]), da(b, lc), b;
if (Vc && (c = Vc[a[wa]()])) return b.k = c, da(b, bc), b;
throw s(a + " is not a valid color string");
}
function Yc(a) {
if (!Xc[ea](a)) throw s(Ea + a + "' is not a valid hex color");
return 4 == a[H] && (a = a[B](ad, Ba)), a[wa]();
}
function bd(a) {
return a = Yc(a), [ t(a[ma](1, 2), 16), t(a[ma](3, 2), 16), t(a[ma](5, 2), 16) ];
}
function $c(a, b, c) {
if (a = ca(a), b = ca(b), c = ca(c), ba(a) || 0 > a || a > 255 || ba(b) || 0 > b || b > 255 || ba(c) || 0 > c || c > 255) throw s('"(' + a + Ka + b + Ka + c + '") is not a valid RGB color');
return a = cd(a[na](16)), b = cd(b[na](16)), c = cd(c[na](16)), Aa + a + b + c;
}
function cd(a) {
return 1 == a[H] ? N + a :a;
}
function hd() {
return R.navigator ? R.navigator.userAgent :h;
}
function nd() {
var a = R.document;
return a ? a.documentMode :g;
}
function yd(a) {
return a == fc || a == L || a == zc ? fc :Wc(a).k;
}
function zd(a) {
if (a = a || {}, a.fill != h && this.Qa(a.fill), a.Q != h && this.Ra(a.Q), a.stroke != h && this.Ta(a.stroke), 
a.R != h && this.Ua(a.R), this.f = h, a.f) {
var d, b = a.f, c = {};
for (d in b) c[d] = b[d];
this.f = c, this.f.Oa = yd(this.f.Oa), this.f.Pa = yd(this.f.Pa);
}
this.c = h, a.pattern && this.Sa(a.pattern);
}
function Ad(a) {
this.ga = a;
}
function Bd(a, b, c) {
a:{
b = b[qa](M), a = a || R;
for (var d = 0; d < b[H]; d++) {
var e = b[d];
if (a[e] == h) {
b = h;
break a;
}
a = a[e];
}
b = a;
}
return b != h && Kc(c) == Lb ? c(b) :b;
}
function Cd(a) {
return a == h ? h :typeof a == yb ? a :(a = v(a), a == Sa || a[wa]() == Ac ? aa :a == N || a[wa]() == Hb ? j :h);
}
function Dd(a) {
if (a == h) return h;
if (typeof a == P) return a;
a = v(a);
var b = ca(a);
return a = 0 == b && /^[\s\xa0]*$/[ea](a) ? 0/0 :b, ba(a) ? h :a;
}
function Ed(a) {
return a = Dd(a), a != h && a >= 0 ? a :h;
}
function Fd(a) {
return a == h ? h :v(a);
}
function Gd(a, b) {
var c = Fd(a);
return c ? 0 <= Uc(b || [], c) ? c :yd(c) :h;
}
function Hd(a, b) {
var d, c = Fd(b);
a:{
for (d in a) if (a[d] == c) {
d = aa;
break a;
}
d = j;
}
return d ? c :h;
}
function Rc() {
var a = Jc(Qb);
a != h || (a = Na);
var b = Jc(Rb);
return b != h || (b = Ta), a + Oa + b;
}
function Id(a) {
this.L = a || {}, Jd || (Jd = Rc() + Pa);
}
function V(a, b, c) {
b > 0 && c[z](Xa, Jd, a, Ma, b, za);
}
function Ld(a, b) {
return a = (a || L)[wa](), Kd[a] || b;
}
function Md(a, b, c, d) {
Lc(a) && (a = a[ka]()), Lc(b) && (b = b[ka]()), Kc(a) == ub && (a = Nd(a)), Kc(b) == ub && (b = Nd(b)), 
this.X = a, this.ub = b, this.qb = c, this.vb = d;
}
function Od(a, b, c, d, e) {
Md[J](this, a, b, c, L), this.I = b - a, 0 >= this.I && (this.I = 1), this.jb = bd(Wc(d).k), 
this.kb = bd(Wc(e).k);
}
function Pd() {}
function W() {
this.w = [];
}
function Nd(a) {
return 36e5 * a[0] + 6e4 * a[1] + 1e3 * a[2] + (4 == a[H] ? a[3] :0);
}
function Qd() {}
function Rd(a) {
if (typeof a == P) {
var b = new Qd();
b.$ = a;
var c;
if (c = a, 0 == c) c = $a; else {
var d = [ $a, 0 > c ? La :Ja ];
c = n.abs(c), d[z](n[D](c / 60) % 100), c %= 60, 0 != c && d[z](Ua, S(c, 2)), c = d[K](L);
}
return b.ba = c, 0 == a ? a = lb :(c = [ lb, 0 > a ? Ja :La ], a = n.abs(a), c[z](n[D](a / 60) % 100), 
a %= 60, 0 != a && c[z](Ua, a), a = c[K](L)), b.J = [ a, a ], b.v = [], b;
}
return b = new Qd(), b.ba = a.id, b.$ = -a.std_offset, b.J = a.names, b.v = a.transitions, 
b;
}
function Sd(a) {
this.u = [], typeof a == P ? this.q(a) :this.d(a);
}
function X(a) {
a = new Ad([ a || {}, {
formatType:pc,
valueType:Fb
} ]), this.c = a.e(ic), this.H = h, this.Va = a.T(Ib, Ud), this.Na = a.T(Cc, Vd), 
this.V = h, a = a.U(xc), a != h && (this.V = Rd(60 * -a));
}
function Wd() {
U.fa = g;
}
function Xd(a, b) {
switch (a) {
case Eb:
switch (b) {
case Kb:
return 0;

case Zb:
return 1;

case ac:
return 2;

case pc:
return 3;
}

case Fb:
switch (b) {
case Kb:
return 8;

case Zb:
return 9;

case ac:
return 10;

case pc:
return 11;
}

case wc:
switch (b) {
case Kb:
return 4;

case Zb:
return 5;

case ac:
return 6;

case pc:
return 7;
}
}
}
function Yd(a, b) {
var c = [ N ], d = 7 & Zd[b][0];
if (d > 0) {
c[z](M);
for (var e = 0; d > e; e++) c[z](N);
}
return a[B](/0.00/g, c[K](L));
}
function ae(a, b, c) {
this.h = b || Y.ia, this.ha = c || 0, this.p = 40, this.b = 1, this.C = 3, this.o = this.i = 0, 
this.M = j, this.A = this.z = L, this.l = La, this.m = L, this.g = 1, this.B = 3, 
this.n = this.N = j, typeof a == P ? this.q(a) :this.d(a);
}
function $(a) {
if (a = new Ad([ a || {}, {
decimalSymbol:de,
groupingSymbol:ee,
fractionDigits:2,
negativeParens:j,
prefix:L,
suffix:L,
scaleFactor:1
} ]), this.j = a.na(Jb), this.la = a.r(Gb), this.F = a.r(Sb), this.ja = a.r(jc), 
this.ka = a.r(uc), this.G = a.pa(dc), this.O = a.ma(ec), this.c = a.qa(ic), this.P = a.oa(oc), 
0 >= this.P) throw s("Scale factor must be a positive number.");
}
function ge(a) {
this.c = a || L;
}
function he(a, b, c, d, e, f, p) {
return f > 0 && p[f - 1] == qb ? d :b.getFormattedValue(a, c[t(e, 10)]);
}
var Q, g = void 0, aa = !0, h = null, j = !1, k = google_exportSymbol, l = document, ba = isNaN, m = google_exportProperty, n = Math, q = Array, ca = Number, s = Error, t = parseInt, v = String, z = "push", ea = "test", A = "round", fa = "slice", B = "replace", D = "floor", E = "charAt", F = "indexOf", G = "format", ga = "fromCharCode", ha = "getColumnType", ia = "getHours", ja = "getValue", ka = "getTime", la = "getElementsByTagName", ma = "substr", na = "toString", oa = "getNumberOfRows", H = "length", pa = "propertyIsEnumerable", I = "prototype", qa = "split", ra = "setFormattedValue", J = "call", sa = "setProperty", ua = "substring", va = "apply", K = "join", wa = "toLowerCase", xa = "getTimezoneOffset", L = "", ya = " ", za = '" />', Aa = "#", Ba = "#$1$1$2$2$3$3", Ca = "$1", Da = "%", Ea = "'", Fa = "''", Ga = "(", Ha = "(\\d*)(\\D*)", Ia = ")", Ja = "+", Ka = ",", La = "-", M = ".", Ma = '.png" height="12" width="', Na = "//ajax.googleapis.com/ajax", Oa = "/static/modules/gviz/", Pa = "/util/bar_", Qa = "/util/format.css", N = "0", Ra = "0000000000000000", Sa = "1", Ta = "1.0", Ua = ":", Va = ";", Wa = "</span>\xa0", Xa = '<img style="padding: 0" src="', Ya = '<span style="padding: 0; float: left; white-space: nowrap;">', Za = "E", $a = "Etc/GMT", ab = "G", bb = "GMT", cb = "H", db = "K", eb = "L", gb = "LINK", hb = "M", ib = "Q", jb = "S", kb = "Too many percent/permill", lb = "UTC", mb = "Z", nb = "[object Array]", ob = "[object Function]", pb = "[object Window]", qb = "\\", rb = "_bar_format_old_value", sb = "a", tb = "addGradientRange", ub = "array", vb = "b", wb = "background-color:", xb = "body", yb = "boolean", zb = "c", Ab = "call", Bb = "className", Cb = "color:", Db = "d", Eb = "date", Fb = "datetime", Gb = "decimalSymbol", Hb = "false", O = "format", Ib = "formatType", Jb = "fractionDigits", Kb = "full", Lb = "function", Mb = "g", Nb = "google-visualization-formatters-arrow-dr", Ob = "google-visualization-formatters-arrow-empty", Pb = "google-visualization-formatters-arrow-ug", Qb = "google.loader.GoogleApisBase", Rb = "google.visualization.Version", Sb = "groupingSymbol", Tb = "h", Ub = "head", Vb = "hex", Wb = "html", Xb = "k", Yb = "link", Zb = "long", $b = "m", ac = "medium", bc = "named", cc = "native code", dc = "negativeColor", ec = "negativeParens", fc = "none", gc = "null", P = "number", hc = "object", ic = "pattern", jc = "prefix", kc = "r", lc = "rgb", nc = "s", oc = "scaleFactor", pc = "short", qc = "splice", rc = "string", sc = "style", tc = "stylesheet", uc = "suffix", vc = "text/css", wc = "time", xc = "timeZone", yc = "timeofday", zc = "transparent", Ac = "true", Bc = "v", Cc = "valueType", Dc = "w", Ec = "y", Fc = "z", Gc = "\xa0", Hc = "\xa4", Ic = "\u2030", R = this;
n[D](2147483648 * n.random())[na](36), w(Qc[I], function(a, b) {
if (a[ha](b) == P) for (var c = this.L.base || 0, d = 0; d < a[oa](); d++) {
var e = a[ja](d, b), f = h, f = c > e ? Nb :e > c ? Pb :Ob;
a[sa](d, b, Bb, f);
}
});
var dd, ed, fd, gd, Tc = q[I], Uc = Tc[F] ? function(a, b, c) {
return Tc[F][J](a, b, c);
} :function(a, b, c) {
if (c = c == h ? 0 :0 > c ? n.max(0, a[H] + c) :c, typeof a == rc) return typeof b != rc || 1 != b[H] ? -1 :a[F](b, c);
for (;c < a[H]; c++) if (c in a && a[c] === b) return c;
return -1;
}, Vc = {
aliceblue:"#f0f8ff",
antiquewhite:"#faebd7",
aqua:"#00ffff",
aquamarine:"#7fffd4",
azure:"#f0ffff",
beige:"#f5f5dc",
bisque:"#ffe4c4",
black:"#000000",
blanchedalmond:"#ffebcd",
blue:"#0000ff",
blueviolet:"#8a2be2",
brown:"#a52a2a",
burlywood:"#deb887",
cadetblue:"#5f9ea0",
chartreuse:"#7fff00",
chocolate:"#d2691e",
coral:"#ff7f50",
cornflowerblue:"#6495ed",
cornsilk:"#fff8dc",
crimson:"#dc143c",
cyan:"#00ffff",
darkblue:"#00008b",
darkcyan:"#008b8b",
darkgoldenrod:"#b8860b",
darkgray:"#a9a9a9",
darkgreen:"#006400",
darkgrey:"#a9a9a9",
darkkhaki:"#bdb76b",
darkmagenta:"#8b008b",
darkolivegreen:"#556b2f",
darkorange:"#ff8c00",
darkorchid:"#9932cc",
darkred:"#8b0000",
darksalmon:"#e9967a",
darkseagreen:"#8fbc8f",
darkslateblue:"#483d8b",
darkslategray:"#2f4f4f",
darkslategrey:"#2f4f4f",
darkturquoise:"#00ced1",
darkviolet:"#9400d3",
deeppink:"#ff1493",
deepskyblue:"#00bfff",
dimgray:"#696969",
dimgrey:"#696969",
dodgerblue:"#1e90ff",
firebrick:"#b22222",
floralwhite:"#fffaf0",
forestgreen:"#228b22",
fuchsia:"#ff00ff",
gainsboro:"#dcdcdc",
ghostwhite:"#f8f8ff",
gold:"#ffd700",
goldenrod:"#daa520",
gray:"#808080",
green:"#008000",
greenyellow:"#adff2f",
grey:"#808080",
honeydew:"#f0fff0",
hotpink:"#ff69b4",
indianred:"#cd5c5c",
indigo:"#4b0082",
ivory:"#fffff0",
khaki:"#f0e68c",
lavender:"#e6e6fa",
lavenderblush:"#fff0f5",
lawngreen:"#7cfc00",
lemonchiffon:"#fffacd",
lightblue:"#add8e6",
lightcoral:"#f08080",
lightcyan:"#e0ffff",
lightgoldenrodyellow:"#fafad2",
lightgray:"#d3d3d3",
lightgreen:"#90ee90",
lightgrey:"#d3d3d3",
lightpink:"#ffb6c1",
lightsalmon:"#ffa07a",
lightseagreen:"#20b2aa",
lightskyblue:"#87cefa",
lightslategray:"#778899",
lightslategrey:"#778899",
lightsteelblue:"#b0c4de",
lightyellow:"#ffffe0",
lime:"#00ff00",
limegreen:"#32cd32",
linen:"#faf0e6",
magenta:"#ff00ff",
maroon:"#800000",
mediumaquamarine:"#66cdaa",
mediumblue:"#0000cd",
mediumorchid:"#ba55d3",
mediumpurple:"#9370d8",
mediumseagreen:"#3cb371",
mediumslateblue:"#7b68ee",
mediumspringgreen:"#00fa9a",
mediumturquoise:"#48d1cc",
mediumvioletred:"#c71585",
midnightblue:"#191970",
mintcream:"#f5fffa",
mistyrose:"#ffe4e1",
moccasin:"#ffe4b5",
navajowhite:"#ffdead",
navy:"#000080",
oldlace:"#fdf5e6",
olive:"#808000",
olivedrab:"#6b8e23",
orange:"#ffa500",
orangered:"#ff4500",
orchid:"#da70d6",
palegoldenrod:"#eee8aa",
palegreen:"#98fb98",
paleturquoise:"#afeeee",
palevioletred:"#d87093",
papayawhip:"#ffefd5",
peachpuff:"#ffdab9",
peru:"#cd853f",
pink:"#ffc0cb",
plum:"#dda0dd",
powderblue:"#b0e0e6",
purple:"#800080",
red:"#ff0000",
rosybrown:"#bc8f8f",
royalblue:"#4169e1",
saddlebrown:"#8b4513",
salmon:"#fa8072",
sandybrown:"#f4a460",
seagreen:"#2e8b57",
seashell:"#fff5ee",
sienna:"#a0522d",
silver:"#c0c0c0",
skyblue:"#87ceeb",
slateblue:"#6a5acd",
slategray:"#708090",
slategrey:"#708090",
snow:"#fffafa",
springgreen:"#00ff7f",
steelblue:"#4682b4",
tan:"#d2b48c",
teal:"#008080",
thistle:"#d8bfd8",
tomato:"#ff6347",
turquoise:"#40e0d0",
violet:"#ee82ee",
wheat:"#f5deb3",
white:"#ffffff",
whitesmoke:"#f5f5f5",
yellow:"#ffff00",
yellowgreen:"#9acd32"
}, ad = /#(.)(.)(.)/, Xc = /^#(?:[0-9a-f]{3}){1,2}$/i, Zc = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
gd = fd = ed = dd = j;
var id;
if (id = hd()) {
var jd = R.navigator;
dd = 0 == id[F]("Opera"), ed = !dd && -1 != id[F]("MSIE"), fd = !dd && -1 != id[F]("WebKit"), 
gd = !dd && !fd && "Gecko" == jd.product;
}
var od, kd = ed, ld = gd, md = fd;
a:{
var qd, pd = L;
if (dd && R.opera) var rd = R.opera.version, pd = typeof rd == Lb ? rd() :rd; else if (ld ? qd = /rv\:([^\);]+)(\)|;)/ :kd ? qd = /MSIE\s+([^\);]+)(\)|;)/ :md && (qd = /WebKit\/(\S+)/), 
qd) var sd = qd.exec(hd()), pd = sd ? sd[1] :L;
if (kd) {
var td = nd();
if (td > parseFloat(pd)) {
od = v(td);
break a;
}
}
od = pd;
}
var ud = od, vd = {}, wd = R.document, xd = wd && kd ? nd() || ("CSS1Compat" == wd.compatMode ? t(ud, 10) :5) :g;
!ld && !kd || kd && kd && xd >= 9 || ld && (vd["1.9.1"] || (vd["1.9.1"] = 0 <= Sc(ud, "1.9.1"))), 
kd && (vd["9"] || (vd["9"] = 0 <= Sc(ud, "9"))), Q = zd[I], Q.Qa = function(a) {
yd(a);
}, Q.Ra = function(a) {
n.min(n.max(a, 0), 1);
}, Q.Ta = function(a) {
yd(a);
}, Q.Ua = function(a) {
n.min(n.max(a, 0), 1);
}, Q.Sa = function(a) {
this.c = a;
}, new zd({
Q:0,
fill:"white",
R:0,
stroke:"white"
}), n.log(10);
var U = {
xb:[ "BC", "AD" ],
wb:[ "Before Christ", "Anno Domini" ],
ab:[ "J", "F", hb, "A", hb, "J", "J", "A", jb, "O", "N", "D" ],
eb:[ "J", "F", hb, "A", hb, "J", "J", "A", jb, "O", "N", "D" ],
$a:"January February March April May June July August September October November December".split(" "),
cb:"January February March April May June July August September October November December".split(" "),
bb:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
gb:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
Bb:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
ib:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
Ab:"Sun Mon Tue Wed Thu Fri Sat".split(" "),
hb:"Sun Mon Tue Wed Thu Fri Sat".split(" "),
Ob:[ jb, hb, "T", "W", "T", "F", jb ],
fb:[ jb, hb, "T", "W", "T", "F", jb ],
zb:[ "Q1", "Q2", "Q3", "Q4" ],
yb:[ "1st quarter", "2nd quarter", "3rd quarter", "4th quarter" ],
Eb:[ "AM", "PM" ],
Y:[ "EEEE, MMMM d, y", "MMMM d, y", "MMM d, y", "M/d/yy" ],
Z:[ "h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a" ],
Jb:6,
Qb:[ 5, 6 ],
Kb:5
};
Q = Ad[I], Q.e = function(a, b, c) {
for (var d = h, e = 0; e < this.ga[H]; e++) {
a:{
var d = this.ga[e], f = a, p = c;
if (typeof f == rc) d = Bd(d, f, p); else {
for (var r = 0; r < f[H]; ++r) {
var C = Bd(d, f[r], p);
if (C != h) {
d = C;
break a;
}
}
d = h;
}
}
if (d != h) return d;
}
return d = b, d !== g ? d :h;
}, Q.ma = function(a, b) {
var c = this.Fb(a);
return c != h ? c :(b !== g || (b = j), b);
}, Q.Fb = function(a) {
return this.e(a, h, Cd);
}, Q.oa = function(a, b) {
var c = this.U(a);
return c != h ? c :(b !== g || (b = 0), b);
}, Q.U = function(a) {
return this.e(a, h, Dd);
}, Q.na = function(a, b) {
var c = this.Gb(a);
return c != h ? c :(b !== g || (b = 0), b);
}, Q.Gb = function(a) {
return this.e(a, h, Ed);
}, Q.r = function(a, b) {
return b !== g || (b = L), this.e(a, b, Fd);
}, Q.qa = function(a) {
return this.e(a, h, Fd);
}, Q.pa = function(a) {
return this.e(a, h, Gd);
}, Q.T = function(a, b) {
return this.e(a, h, Oc(Hd, h, b));
};
var Jd = h, Kd = {
red:kc,
blue:vb,
green:Mb
};
w(Id[I], function(a, b) {
if (a[ha](b) == P) {
var c = this.L, d = c.min, e = c.max, f = h;
(d == h || e == h) && (f = a.getColumnRange(b), e == h && (e = f.max), d == h && (d = n.min(0, f.min))), 
d >= e && (f = f || a.getColumnRange(b), e = f.max, d = f.min), d == e && (0 == d ? e = 1 :d > 0 ? d = 0 :e = 0);
var f = e - d, p = c.base || 0, p = n.max(d, n.min(e, p)), r = c.width || 100, C = c.showValue;
C == h && (C = aa);
for (var T = n[A]((p - d) / f * r), Z = r - T, x = 0; x < a[oa](); x++) {
var u = a[ja](x, b), y = [], u = n.max(d, n.min(e, u)), ta = n.ceil((u - d) / f * r);
y[z](Ya), V(nc, 1, y);
var mc = Ld(c.colorPositive, vb), be = Ld(c.colorNegative, kc), fb = c.drawZeroLine ? 1 :0;
T > 0 ? p > u ? (V(Dc, ta, y), V(be, T - ta, y), fb > 0 && V(Fc, fb, y), V(Dc, Z, y)) :(V(Dc, T, y), 
fb > 0 && V(Fc, fb, y), V(mc, ta - T, y), V(Dc, r - ta, y)) :(V(mc, ta, y), V(Dc, r - ta, y)), 
V(nc, 1, y), u = a.getProperty(x, b, rb), u == h && (u = a.getFormattedValue(x, b), 
a[sa](x, b, rb, u)), C && (y[z](Gc), y[z](u)), y[z](Wa), a[ra](x, b, y[K](L));
}
}
}), Md[I].contains = function(a) {
var b = this.X, c = this.ub;
return a == h ? b == h && c == h :(Lc(a) ? a = a[ka]() :Kc(a) == ub && (a = Nd(a)), 
(b == h || a >= b) && (c == h || c > a));
}, Md[I].ca = function() {
return this.vb;
}, Pd.prototype = Md[I], Od.Rb = Md[I], Od.prototype = new Pd(), Od[I].ca = function(a) {
var b;
b = this.jb;
var c = this.kb;
return a = 1 - (a - this.X) / this.I, a = n.min(n.max(a, 0), 1), b = [ n[A](a * b[0] + (1 - a) * c[0]), n[A](a * b[1] + (1 - a) * c[1]), n[A](a * b[2] + (1 - a) * c[2]) ], 
$c(b[0], b[1], b[2]);
}, W[I].addRange = function(a, b, c, d) {
this.w[z](new Md(a, b, c, d));
}, W[I].addGradientRange = function(a, b, c, d, e) {
this.w[z](new Od(a, b, c, d, e));
}, w(W[I], function(a, b) {
var c = a[ha](b);
if (c == P || c == rc || c == Eb || c == Fb || c == yc) for (c = 0; c < a[oa](); c++) {
for (var d = a[ja](c, b), e = L, f = 0; f < this.w[H]; f++) {
var p = this.w[f];
if (p.contains(d)) {
f = p.qb, d = p.ca(d), f && (e += Cb + f + Va), d && (e += wb + d + Va);
break;
}
}
a[sa](c, b, sc, e);
}
}), Q = Qd[I], Q.ea = function(a) {
a = Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate(), a.getUTCHours(), a.getUTCMinutes()) / 36e5;
for (var b = 0; b < this.v[H] && a >= this.v[b]; ) b += 2;
return 0 == b ? 0 :this.v[b - 1];
}, Q.rb = function(a) {
a = this.K(a);
var b = [ bb ];
return b[z](0 >= a ? Ja :La), a = n.abs(a), b[z](S(n[D](a / 60) % 100, 2), Ua, S(a % 60, 2)), 
b[K](L);
}, Q.Cb = function(a) {
return this.J[this.da(a) ? 3 :1];
}, Q.K = function(a) {
return this.$ - this.ea(a);
}, Q.sb = function(a) {
a = -this.K(a);
var b = [ 0 > a ? La :Ja ];
return a = n.abs(a), b[z](S(n[D](a / 60) % 100, 2), S(a % 60, 2)), b[K](L);
}, Q.Db = function(a) {
return this.J[this.da(a) ? 2 :0];
}, Q.da = function(a) {
return 0 < this.ea(a);
};
var Td = [ /^\'(?:[^\']|\'\')*\'/, /^(?:G+|y+|M+|k+|S+|E+|a+|h+|K+|H+|c+|L+|Q+|d+|m+|s+|v+|z+|Z+)/, /^[^\'GyMkSEahKHcLQdmsvzZ]+/ ];
Q = Sd[I], Q.d = function(a) {
for (;a; ) for (var b = 0; b < Td[H]; ++b) {
var c = a.match(Td[b]);
if (c) {
c = c[0], a = a[ua](c[H]), 0 == b && (c == Fa ? c = Ea :(c = c[ua](1, c[H] - 1), 
c = c[B](/\'\'/, Ea))), this.u[z]({
text:c,
type:b
});
break;
}
}
}, w(Q, function(a, b) {
var c = b ? 6e4 * (a[xa]() - b.K(a)) :0, d = c ? new Date(a[ka]() + c) :a, e = d;
b && d[xa]() != a[xa]() && (e = new Date(a[ka]() + (c + (c > 0 ? -864e5 :864e5))));
for (var c = [], f = 0; f < this.u[H]; ++f) {
var p = this.u[f].text;
1 == this.u[f].type ? c[z](this.tb(p, a, d, e, b)) :c[z](p);
}
return c[K](L);
}), Q.q = function(a) {
if (4 > a) a = U.Y[a]; else if (8 > a) a = U.Z[a - 4]; else {
if (!(12 > a)) return this.q(10), void 0;
a = U.Y[a - 8] + ya + U.Z[a - 8];
}
this.d(a);
}, Q.a = function(a) {
if (U.fa === g) return a;
for (var b = [], c = 0; c < a[H]; c++) {
var d = a.charCodeAt(c);
b[z](d >= 48 && 57 >= d ? v[ga](U.fa + d - 48) :a[E](c));
}
return b[K](L);
}, Q.Ba = function(a, b) {
var c = 0 < b.getFullYear() ? 1 :0;
return a >= 4 ? U.wb[c] :U.xb[c];
}, Q.Ma = function(a, b) {
var c = b.getFullYear();
return 0 > c && (c = -c), this.a(2 == a ? S(c % 100, 2) :v(c));
}, Q.Ea = function(a, b) {
var c = b.getMonth();
switch (a) {
case 5:
return U.ab[c];

case 4:
return U.$a[c];

case 3:
return U.bb[c];

default:
return this.a(S(c + 1, a));
}
}, Q.xa = function(a, b) {
return this.a(S(b[ia]() || 24, a));
}, Q.Ca = function(a, b) {
return this.a((b[ka]() % 1e3 / 1e3).toFixed(n.min(3, a))[ma](2) + (a > 3 ? S(0, a - 3) :L));
}, Q.Aa = function(a, b) {
var c = b.getDay();
return a >= 4 ? U.Bb[c] :U.Ab[c];
}, Q.ya = function(a, b) {
var c = b[ia]();
return U.Eb[c >= 12 && 24 > c ? 1 :0];
}, Q.wa = function(a, b) {
return this.a(S(b[ia]() % 12 || 12, a));
}, Q.ua = function(a, b) {
return this.a(S(b[ia]() % 12, a));
}, Q.va = function(a, b) {
return this.a(S(b[ia](), a));
}, Q.Ha = function(a, b) {
var c = b.getDay();
switch (a) {
case 5:
return U.fb[c];

case 4:
return U.ib[c];

case 3:
return U.hb[c];

default:
return this.a(S(c, 1));
}
}, Q.Ia = function(a, b) {
var c = b.getMonth();
switch (a) {
case 5:
return U.eb[c];

case 4:
return U.cb[c];

case 3:
return U.gb[c];

default:
return this.a(S(c + 1, a));
}
}, Q.Fa = function(a, b) {
var c = n[D](b.getMonth() / 3);
return 4 > a ? U.zb[c] :U.yb[c];
}, Q.za = function(a, b) {
return this.a(S(b.getDate(), a));
}, Q.Da = function(a, b) {
return this.a(S(b.getMinutes(), a));
}, Q.Ga = function(a, b) {
return this.a(S(b.getSeconds(), a));
}, Q.Ka = function(a, b, c) {
return c = c || Rd(b[xa]()), 4 > a ? c.sb(b) :this.a(c.rb(b));
}, Q.La = function(a, b, c) {
return c = c || Rd(b[xa]()), 4 > a ? c.Db(b) :c.Cb(b);
}, Q.Ja = function(a, b) {
return b = b || Rd(a[xa]()), b.ba;
}, Q.tb = function(a, b, c, d, e) {
var f = a[H];
switch (a[E](0)) {
case ab:
return this.Ba(f, c);

case Ec:
return this.Ma(f, c);

case hb:
return this.Ea(f, c);

case Xb:
return this.xa(f, d);

case jb:
return this.Ca(f, d);

case Za:
return this.Aa(f, c);

case sb:
return this.ya(f, d);

case Tb:
return this.wa(f, d);

case db:
return this.ua(f, d);

case cb:
return this.va(f, d);

case zb:
return this.Ha(f, c);

case eb:
return this.Ia(f, c);

case ib:
return this.Fa(f, c);

case Db:
return this.za(f, c);

case $b:
return this.Da(f, d);

case nc:
return this.Ga(f, d);

case Bc:
return this.Ja(b, e);

case Fc:
return this.La(f, b, e);

case mb:
return this.Ka(f, b, e);

default:
return L;
}
};
var Ud = {
Lb:Kb,
Mb:Zb,
Nb:ac,
SHORT:pc
}, Vd = {
Hb:Eb,
Ib:Fb,
Pb:wc
};
w(X[I], function(a, b) {
var c = a[ha](b);
if (c == Eb || c == Fb) for (var c = this.aa(c), d = a[oa](), e = 0; d > e; e++) {
var f = a[ja](e, b), f = this.s(c, f);
a[ra](e, b, f);
}
}), X[I].formatValue = function(a) {
return this.H || (this.H = this.aa(this.Na)), this.s(this.H, a);
}, X[I].aa = function(a) {
var b = this.c;
return b != h || (b = Xd(a, this.Va)), new Sd(b);
}, X[I].s = function(a, b) {
if (b === h) return L;
var c = this.V;
return c == h && (c = Rd(b[xa]())), a[G](b, c);
};
var Zd = {
AED:[ 2, "dh", "\u062f.\u0625.", "DH" ],
AUD:[ 2, "$", "AU$" ],
BDT:[ 2, "\u09f3", "Tk" ],
BRL:[ 2, "R$", "R$" ],
CAD:[ 2, "$", "C$" ],
CHF:[ 2, "CHF", "CHF" ],
CLP:[ 0, "$", "CL$" ],
CNY:[ 2, "\xa5", "RMB\xa5" ],
COP:[ 0, "$", "COL$" ],
CRC:[ 0, "\u20a1", "CR\u20a1" ],
CZK:[ 2, "K\u010d", "K\u010d" ],
DKK:[ 18, "kr", "kr" ],
DOP:[ 2, "$", "RD$" ],
EGP:[ 2, "\xa3", "LE" ],
EUR:[ 18, "\u20ac", "\u20ac" ],
GBP:[ 2, "\xa3", "GB\xa3" ],
HKD:[ 2, "$", "HK$" ],
ILS:[ 2, "\u20aa", "IL\u20aa" ],
INR:[ 2, "\u20b9", "Rs" ],
ISK:[ 0, "kr", "kr" ],
JMD:[ 2, "$", "JA$" ],
JPY:[ 0, "\xa5", "JP\xa5" ],
KRW:[ 0, "\u20a9", "KR\u20a9" ],
LKR:[ 2, "Rs", "SLRs" ],
MNT:[ 0, "\u20ae", "MN\u20ae" ],
MXN:[ 2, "$", "Mex$" ],
MYR:[ 2, "RM", "RM" ],
NOK:[ 18, "kr", "NOkr" ],
PAB:[ 2, "B/.", "B/." ],
PEN:[ 2, "S/.", "S/." ],
PHP:[ 2, "\u20b1", "Php" ],
PKR:[ 0, "Rs", "PKRs." ],
RUB:[ 2, "Rup", "Rup" ],
SAR:[ 2, "Rial", "Rial" ],
SEK:[ 2, "kr", "kr" ],
SGD:[ 2, "$", "S$" ],
THB:[ 2, "\u0e3f", "THB" ],
TRY:[ 2, "TL", "YTL" ],
TWD:[ 2, "NT$", "NT$" ],
USD:[ 2, "$", "US$" ],
UYU:[ 2, "$", "UY$" ],
VND:[ 0, "\u20ab", "VN\u20ab" ],
YER:[ 0, "Rial", "Rial" ],
ZAR:[ 2, "R", "ZAR" ]
}, $d = {
DECIMAL_SEP:M,
GROUP_SEP:Ka,
nb:Da,
S:N,
pb:Ja,
mb:La,
lb:Za,
ob:Ic,
ra:"\u221e",
sa:"NaN",
DECIMAL_PATTERN:"#,##0.###",
Za:"#E0",
Ya:"#,##0%",
Xa:"\xa4#,##0.00;(\xa4#,##0.00)",
ia:"USD"
}, Y = $d, Y = $d, ce = j;
Q = ae[I], Q.d = function(a) {
this.c = a[B](/ /g, Gc);
var b = [ 0 ];
this.z = this.t(a, b);
var c = b[0];
this.Wa(a, b), c = b[0] - c, this.A = this.t(a, b), b[0] < a[H] && a[E](b[0]) == Va ? (b[0]++, 
this.l = this.t(a, b), b[0] += c, this.m = this.t(a, b)) :(this.l = this.z + this.l, 
this.m += this.A);
}, Q.q = function(a) {
switch (a) {
case 1:
this.d(Y.DECIMAL_PATTERN);
break;

case 2:
this.d(Y.Za);
break;

case 3:
this.d(Y.Ya);
break;

case 4:
this.d(Yd(Y.Xa, this.h));
break;

default:
throw s("Unsupported pattern type.");
}
}, w(Q, function(a) {
if (ba(a)) return Y.sa;
var b = [], c = 0 > a || 0 == a && 0 > 1 / a;
return b[z](c ? this.l :this.z), isFinite(a) ? (a = a * (c ? -1 :1) * this.g, this.n ? this.ta(a, b) :this.D(a, this.b, b)) :b[z](Y.ra), 
b[z](c ? this.m :this.A), b[K](L);
}), Q.D = function(a, b, c) {
var f, d = n.pow(10, this.C), e = n[A](a * d);
isFinite(e) ? (a = n[D](e / d), f = n[D](e - a * d)) :f = 0;
for (var p = 0 < this.i || f > 0, r = L, e = a; e > 1e20; ) r = N + r, e = n[A](e / 10);
var r = e + r, C = Y.DECIMAL_SEP, T = Y.GROUP_SEP, e = ce ? 48 :Y.S.charCodeAt(0), Z = r[H];
if (a > 0 || b > 0) {
for (a = Z; b > a; a++) c[z](v[ga](e));
for (a = 0; Z > a; a++) c[z](v[ga](e + 1 * r[E](a))), Z - a > 1 && 0 < this.B && 1 == (Z - a) % this.B && c[z](T);
} else p || c[z](v[ga](e));
for ((this.N || p) && c[z](C), b = L + (f + d), d = b[H]; b[E](d - 1) == N && d > this.i + 1; ) d--;
for (a = 1; d > a; a++) c[z](v[ga](e + 1 * b[E](a)));
}, Q.W = function(a, b) {
b[z](Y.lb), 0 > a ? (a = -a, b[z](Y.mb)) :this.M && b[z](Y.pb);
for (var c = L + a, d = ce ? N :Y.S, e = c[H]; e < this.o; e++) b[z](d);
b[z](c);
}, Q.ta = function(a, b) {
if (0 == a) this.D(a, this.b, b), this.W(0, b); else {
var c = n[D](n.log(a) / n.log(10));
a /= n.pow(10, c);
var d = this.b;
if (1 < this.p && this.p > this.b) {
for (;0 != c % this.p; ) a *= 10, c--;
d = 1;
} else 1 > this.b ? (c++, a /= 10) :(c -= this.b - 1, a *= n.pow(10, this.b - 1));
this.D(a, d, b), this.W(c, b);
}
}, Q.t = function(a, b) {
for (var c = L, d = j, e = a[H]; b[0] < e; b[0]++) {
var f = a[E](b[0]);
if (f == Ea) b[0] + 1 < e && a[E](b[0] + 1) == Ea ? (b[0]++, c += Ea) :d = !d; else if (d) c += f; else switch (f) {
case Aa:
case N:
case Ka:
case M:
case Va:
return c;

case Hc:
if (b[0] + 1 < e && a[E](b[0] + 1) == Hc) b[0]++, c += this.h; else switch (this.ha) {
case 0:
c += Zd[this.h][1];
break;

case 2:
var f = this.h, p = Zd[f], c = c + (f == p[1] ? f :f + ya + p[1]);
break;

case 1:
c += Zd[this.h][2];
}
break;

case Da:
if (1 != this.g) throw s(kb);
this.g = 100, c += Y.nb;
break;

case Ic:
if (1 != this.g) throw s(kb);
this.g = 1e3, c += Y.ob;
break;

default:
c += f;
}
}
return c;
}, Q.Wa = function(a, b) {
for (var c = -1, d = 0, e = 0, f = 0, p = -1, r = a[H], C = aa; b[0] < r && C; b[0]++) switch (a[E](b[0])) {
case Aa:
e > 0 ? f++ :d++, p >= 0 && 0 > c && p++;
break;

case N:
if (f > 0) throw s('Unexpected "0" in pattern "' + a + '"');
e++, p >= 0 && 0 > c && p++;
break;

case Ka:
p = 0;
break;

case M:
if (c >= 0) throw s('Multiple decimal separators in pattern "' + a + '"');
c = d + e + f;
break;

case Za:
if (this.n) throw s('Multiple exponential symbols in pattern "' + a + '"');
for (this.n = aa, this.o = 0, b[0] + 1 < r && a[E](b[0] + 1) == Ja && (b[0]++, this.M = aa); b[0] + 1 < r && a[E](b[0] + 1) == N; ) b[0]++, 
this.o++;
if (1 > d + e || 1 > this.o) throw s('Malformed exponential pattern "' + a + '"');
C = j;
break;

default:
b[0]--, C = j;
}
if (0 == e && d > 0 && c >= 0 && (e = c, 0 == e && e++, f = d - e, d = e - 1, e = 1), 
0 > c && f > 0 || c >= 0 && (d > c || c > d + e) || 0 == p) throw s('Malformed pattern "' + a + '"');
f = d + e + f, this.C = c >= 0 ? f - c :0, c >= 0 && (this.i = d + e - c, 0 > this.i && (this.i = 0)), 
this.b = (c >= 0 ? c :f) - d, this.n && (this.p = d + this.b, 0 == this.C && 0 == this.b && (this.b = 1)), 
this.B = n.max(0, p), this.N = 0 == c || c == f;
};
var de = Y.DECIMAL_SEP, ee = Y.GROUP_SEP, fe = Y.DECIMAL_PATTERN;
w($[I], function(a, b) {
if (a[ha](b) == P) for (var c = 0; c < a[oa](); c++) {
var d = a[ja](c, b);
if (d != h) {
var e = this.formatValue(d);
a[ra](c, b, e), !/^[\s\xa0]*$/[ea](this.G == h ? L :v(this.G)) && 0 > d && a[sa](c, b, sc, Cb + this.G + Va);
}
}
}), $[I].formatValue = function(a) {
var b = h, b = a / this.P;
return this.c === h ? (this.O && (b = n.abs(b)), b = this.s(b), b = this.ja + b + this.ka, 
this.O && 0 > a && (b = Ga + b + Ia)) :b = new ae(this.c)[G](b), b;
}, $[I].s = function(a) {
0 == this.j && (a = n[A](a));
var b = [];
0 > a && (a = -a, b[z](La));
var c = n.pow(10, this.j), d = n[A](a * c);
if (a = v(n[D](d / c)), c = v(d % c), 3 < a[H] && this.F) for (d = a[H] % 3, d > 0 && (b[z](a[ua](0, d), this.F), 
a = a[ua](d)); 3 < a[H]; ) b[z](a[ua](0, 3), this.F), a = a[ua](3);
return b[z](a), 0 < this.j && (b[z](this.la), c[H] < this.j && (c = Ra + c), b[z](c[ua](c[H] - this.j))), 
b[K](L);
}, w(ge[I], function(a, b, c, d) {
var e = b[0];
for (c != h && Kc(c) == P && (e = c), c = d || h, d = 0; d < a[oa](); d++) {
var f = this.c[B](/{(\d+)}/g, Pc(he, d, a, b)), f = f[B](/\\(.)/g, Ca);
c ? a[sa](d, e, c, f) :a[ra](d, e, f);
}
}), k("google.visualization.NumberFormat", $), m($[I], O, $[I][G]), m($[I], "formatValue", $[I].formatValue), 
k("google.visualization.NumberFormat.useNativeCharactersIfAvailable", function(a) {
ce = !a;
}), k("google.visualization.NumberFormat.DECIMAL_SEP", de), k("google.visualization.NumberFormat.GROUP_SEP", ee), 
k("google.visualization.NumberFormat.DECIMAL_PATTERN", fe), k("google.visualization.ColorFormat", W), 
m(W[I], O, W[I][G]), m(W[I], "addRange", W[I].addRange), m(W[I], tb, W[I].addGradientRange), 
k("google.visualization.BarFormat", Id), m(Id[I], O, Id[I][G]), k("google.visualization.ArrowFormat", Qc), 
m(Qc[I], O, Qc[I][G]), k("google.visualization.PatternFormat", ge), m(ge[I], O, ge[I][G]), 
k("google.visualization.DateFormat", X), m(Wd, "dontLocalizeDigits", Wd), m(X[I], O, X[I][G]), 
m(X[I], "formatValue", X[I].formatValue), k("google.visualization.TableNumberFormat", $), 
m($[I], O, $[I][G]), k("google.visualization.TableColorFormat", W), m(W[I], O, W[I][G]), 
m(W[I], "addRange", W[I].addRange), m(W[I], tb, W[I].addGradientRange), k("google.visualization.TableBarFormat", Id), 
m(Id[I], O, Id[I][G]), k("google.visualization.TableArrowFormat", Qc), m(Qc[I], O, Qc[I][G]), 
k("google.visualization.TablePatternFormat", ge), m(ge[I], O, ge[I][G]), k("google.visualization.TableDateFormat", X), 
m(X[I], O, X[I][G]);
}(), function() {
function d(a) {
throw a;
}
function ra(a, b) {
return a.width = b;
}
function sa(a, b) {
return a.screenX = b;
}
function ta(a, b) {
return a.screenY = b;
}
function ua(a, b) {
return a.keyCode = b;
}
function va(a, b) {
return a.handleEvent = b;
}
function xa(a, b) {
return a.depth = b;
}
function ya(a, b) {
return a.altKey = b;
}
function za(a, b) {
return a.next = b;
}
function Aa(a, b) {
return a.clone = b;
}
function Ba(a, b) {
return a.bottom = b;
}
function Ca(a, b) {
return a.display = b;
}
function Da(a, b) {
return a.height = b;
}
function Ea(a, b) {
return a.right = b;
}
function Fa(a, b) {
return a.innerHTML = b;
}
function Ga(a, b) {
return a.currentTarget = b;
}
function Ha(a, b) {
return a.left = b;
}
function Ia(a, b) {
return a.type = b;
}
function Ja(a, b) {
return a.setContent = b;
}
function Ka(a, b) {
return a.getValue = b;
}
function Ma(a, b) {
return a.clientX = b;
}
function Na(a, b) {
return a.clientY = b;
}
function Oa(a, b) {
return a.visibility = b;
}
function Pa(a, b) {
return a.setState = b;
}
function Qa(a, b) {
return a.length = b;
}
function Ra(a, b) {
return a.setValue = b;
}
function Sa(a, b) {
return a.className = b;
}
function Ta(a, b) {
return a.visualization = b;
}
function Ua(a, b) {
return a.target = b;
}
function rn(a, b) {
for (var f, c = a[Vb](bf), e = b || P; f = c.shift(); ) {
if (e[f] == l) return l;
e = e[f];
}
return e;
}
function sn() {}
function tn(a) {
a.ma = function() {
return a.th ? a.th :a.th = new a();
};
}
function un(a) {
var b = typeof a;
if (b == jl) {
if (!a) return gl;
if (a instanceof ka) return Hh;
if (a instanceof fa) return b;
var c = fa[J][Nb][L](a);
if (c == nh) return jl;
if (c == lh || typeof a[I] == hl && "undefined" != typeof a[Nd] && "undefined" != typeof a[Qb] && !a[Qb](nm)) return Hh;
if (c == mh || "undefined" != typeof a[L] && "undefined" != typeof a[Qb] && !a[Qb](bi)) return aj;
} else if (b == aj && "undefined" == typeof a[L]) return jl;
return b;
}
function vn(a) {
return a !== g;
}
function wn(a) {
return un(a) == Hh;
}
function xn(a) {
var b = un(a);
return b == Hh || b == jl && typeof a[I] == hl;
}
function yn(a) {
return zn(a) && typeof a[kc] == aj;
}
function Q(a) {
return typeof a == rm;
}
function An(a) {
return typeof a == Ph;
}
function Bn(a) {
return typeof a == hl;
}
function Cn(a) {
return un(a) == aj;
}
function zn(a) {
var b = typeof a;
return b == jl && a != l || b == aj;
}
function Dn(a) {
return a[En] || (a[En] = ++Fn);
}
function Gn(a) {
return a[L][rc](a[Ib], arguments);
}
function Hn(a, b) {
if (a || d(s()), 2 < arguments[I]) {
var e = ka[J][Dc][L](arguments, 2);
return function() {
var c = ka[J][Dc][L](arguments);
return ka[J].unshift[rc](c, e), a[rc](b, c);
};
}
return function() {
return a[rc](b, arguments);
};
}
function In() {
return In = Function[J][Ib] && -1 != Function[J][Ib][Nb]()[D](bl) ? Gn :Hn, In[rc](l, arguments);
}
function Jn(a) {
var c = ka[J][Dc][L](arguments, 1);
return function() {
var b = ka[J][Dc][L](arguments);
return b.unshift[rc](b, c), a[rc](this, b);
};
}
function Ln(a) {
if (P[yc]) P[yc](a, zg); else if (P.eval) if (Mn == l && (P.eval($m), "undefined" != typeof P._et_ ? (delete P._et_, 
Mn = j) :Mn = m), Mn) P.eval(a); else {
var b = P[nd], c = b[ub](Tl);
Ia(c, Cm), c.defer = m, c[Va](b[eb](a)), b[td][Va](c), b[td][ud](c);
} else d(s("goog.globalEval not available"));
}
function R(a, b) {
function c() {}
c.prototype = b[J], a.b = b[J], a.prototype = new c(), a[J].constructor = a;
}
function Nn(a) {
var b;
if (0 == ha[Lb](ck)[I]) {
b = ha[Lb](ik)[0];
var c = ha[Lb](Oh)[0], e = ha[ub](ck);
b[hb](e, c);
}
b = ha[Lb](ck)[0], c = ha[ub](Tl), Ia(c, Cm), c.src = a, b[Va](c);
}
function On(a) {
return function(b) {
google[K][uc][xd](a);
var c = b[Pc]();
return c && google[K][uc].addErrorFromQueryResponse(a, b), !c;
};
}
function Pn(a) {
if (a = oa(a), /^\s*$/[Cc](a) ? 0 :/^[\],:{}\s\u2028\u2029]*$/[Cc](a[v](/\\["\\\/bfnrtu]/g, Of)[v](/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, sh)[v](/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, M))) try {
return eval(se + a + ve);
} catch (b) {}
d(s("Invalid JSON string: " + a));
}
function Qn(a) {
this.Sd = a;
}
function Tn(a) {
return a = Un(a, Vn), new Qn(g).al(a);
}
function Wn(a) {
return Pn(a), Xn(a);
}
function Xn(a) {
return a = Yn(a), eval(se + a + ve);
}
function Un(a, b) {
a = b(a);
var c = un(a);
if (c == jl || c == Hh) {
var e, c = c == Hh ? [] :{};
for (e in a) {
var f = Un(a[e], b);
vn(f) && (c[e] = f);
}
} else c = a;
return c;
}
function Yn(a) {
return a[v](/"(Date\([\d,\s]*\))"/g, function(a, c) {
return cl + c;
});
}
function Vn(a) {
return yn(a) && (a = 0 !== a.getMilliseconds() ? [ a[kc](), a[gd](), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds() ] :0 !== a.getSeconds() || 0 !== a.getMinutes() || 0 !== a.getHours() ? [ a[kc](), a[gd](), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds() ] :[ a[kc](), a[gd](), a.getDate() ], 
a = hg + a[Od](ye) + ve), a;
}
function Zn(a) {
return /^[\s\xa0]*$/[Cc](a);
}
function $n(a) {
return a[v](/[\t\r\n ]+/g, Td)[v](/^[\t\r\n ]+|[\t\r\n ]+$/g, M);
}
function ao(a) {
return a[v](/^[\s\xa0]+|[\s\xa0]+$/g, M);
}
function bo(a, b) {
return b ? a[v](co, je)[v](eo, le)[v](fo, ke)[v](go, me) :ho[Cc](a) ? (-1 != a[D](ie) && (a = a[v](co, je)), 
-1 != a[D](Hf) && (a = a[v](eo, le)), -1 != a[D](Mf) && (a = a[v](fo, ke)), -1 != a[D](Zd) && (a = a[v](go, me)), 
a) :a;
}
function io(a) {
return a == l ? M :oa(a);
}
function po(a, b) {
return 0 <= ko(a, b);
}
function qo(a, b) {
var e, c = ko(a, b);
return (e = c >= 0) && jo[Nd][L](a, c, 1), e;
}
function ro() {
return jo[cb][rc](jo, arguments);
}
function so(a) {
var b = a[I];
if (b > 0) {
for (var c = ka(b), e = 0; b > e; e++) c[e] = a[e];
return c;
}
return [];
}
function to(a) {
for (var c = 1; c < arguments[I]; c++) {
var f, e = arguments[c];
if (wn(e) || (f = xn(e)) && e[cc](ci)) a[C][rc](a, e); else if (f) for (var h = a[I], k = e[I], n = 0; k > n; n++) a[h + n] = e[n]; else a[C](e);
}
}
function uo(a) {
return jo[Nd][rc](a, vo(arguments, 1));
}
function vo(a, b, c) {
return 2 >= arguments[I] ? jo[Dc][L](a, b) :jo[Dc][L](a, b, c);
}
function wo(a, b) {
for (var c = 0; c < a[I]; c++) a[c] = {
index:c,
value:a[c]
};
var e = b || xo;
for (jo.sort[L](a, function(a, b) {
return e(a[Kc], b[Kc]) || a.index - b.index;
} || xo), c = 0; c < a[I]; c++) a[c] = a[c][Kc];
}
function xo(a, b) {
return a > b ? 1 :b > a ? -1 :0;
}
function yo(a, b) {
this.x = vn(a) ? a :0, this.y = vn(b) ? b :0;
}
function zo(a, b) {
return new yo(a.x - b.x, a.y - b.y);
}
function Ao(a, b) {
ra(this, a), Da(this, b);
}
function Go() {
return P.navigator ? P.navigator.userAgent :l;
}
function Ho() {
return P.navigator;
}
function Qo() {
var a = P[nd];
return a ? a.documentMode :g;
}
function Zo(a) {
var b;
if (!(b = Yo[a])) {
b = 0;
for (var c = ao(oa(Xo))[Vb](bf), e = ao(oa(a))[Vb](bf), f = r.max(c[I], e[I]), h = 0; 0 == b && f > h; h++) {
var k = c[h] || M, n = e[h] || M, t = qa(ue, bj), y = qa(ue, bj);
do {
var A = t.exec(k) || [ M, M, M ], G = y.exec(n) || [ M, M, M ];
if (0 == A[0][I] && 0 == G[0][I]) break;
b = ((0 == A[1][I] ? 0 :ma(A[1], 10)) < (0 == G[1][I] ? 0 :ma(G[1], 10)) ? -1 :(0 == A[1][I] ? 0 :ma(A[1], 10)) > (0 == G[1][I] ? 0 :ma(G[1], 10)) ? 1 :0) || ((0 == A[2][I]) < (0 == G[2][I]) ? -1 :(0 == A[2][I]) > (0 == G[2][I]) ? 1 :0) || (A[2] < G[2] ? -1 :A[2] > G[2] ? 1 :0);
} while (0 == b);
}
b = Yo[a] = b >= 0;
}
return b;
}
function $o(a) {
return S && ap >= a;
}
function dp(a) {
if (ep) {
ep = m;
var b = P[ac];
if (b) {
var c = b[pc];
c && (c = fp(c)) && c != b.hostname && (ep = j, d(s()));
}
}
return a[ob](cp);
}
function fp(a) {
return (a = dp(a)[3] || l) && pa(a);
}
function gp(a) {
return (a = dp(a)[5] || l) && pa(a);
}
function vp(a) {
var b = fp(a), c = kp[Cc](b), e = mp[Cc](b), f = np[Cc](b), b = lp[Cc](b), h = gp(a), k = qa(up[Jb] + jp[Jb]), h = (a = qa(up[Jb] + ip[Jb] + jp[Jb])[Cc](h)) || k[Cc](h);
return b && a || (e || f || c) && h;
}
function wp(a) {
var b = fp(a), c = rp[Cc](b), e = sp[Cc](b), b = qp[Cc](b);
return a = gp(a), a = qa(up[Jb] + op[Jb] + pp[Jb])[Cc](a), (b || c || e) && a;
}
function xp(a) {
var e, b = [], c = 0;
for (e in a) b[c++] = a[e];
return b;
}
function yp(a) {
var e, b = [], c = 0;
for (e in a) b[c++] = e;
return b;
}
function zp(a, b) {
for (var c in a) if (a[c] == b) return j;
return m;
}
function Ap(a, b) {
var c;
return (c = b in a) && delete a[b], c;
}
function Bp(a) {
var c, b = {};
for (c in a) b[c] = a[c];
return b;
}
function Cp(a) {
var b = un(a);
if (b == jl || b == Hh) {
if (a[dc]) return a[dc]();
var c, b = b == Hh ? [] :{};
for (c in a) b[c] = Cp(a[c]);
return b;
}
return a;
}
function Ep(a) {
for (var c, e, f = 1; f < arguments[I]; f++) {
e = arguments[f];
for (c in e) a[c] = e[c];
for (var h = 0; h < Dp[I]; h++) c = Dp[h], fa[J][cc][L](e, c) && (a[c] = e[c]);
}
}
function Ip(a) {
return a = a.className, Q(a) && a[ob](/\S+/g) || [];
}
function Jp(a) {
for (var c = Ip(a), e = vo(arguments, 1), f = c[I] + e[I], h = c, k = 0; k < e[I]; k++) po(h, e[k]) || h[C](e[k]);
return Sa(a, c[Od](Td)), c[I] == f;
}
function Kp(a) {
var f, c = Ip(a), e = vo(arguments, 1), h = e;
return f = mo(c, function(a) {
return !po(h, a);
}), Sa(a, f[Od](Td)), f[I] == c[I] - e[I];
}
function Lp(a) {
return a ? new Mp(Np(a)) :Fp || (Fp = new Mp());
}
function Op(a) {
return Q(a) ? ha[Gc](a) :a;
}
function Pp(a, b) {
function c(b, c) {
c == tm ? a[z].cssText = b :c == ii ? Sa(a, b) :c == Zi ? a.htmlFor = b :c in Qp ? a[Ab](Qp[c], b) :0 == c[yd](Gh, 0) || 0 == c[yd](ui, 0) ? a[Ab](c, b) :a[c] = b;
}
for (var e in b) c[L](g, b[e], e, b);
}
function Rp(a) {
return a = a[nd], a = Sp(a) ? a[Mb] :a[td], new Ao(a[ld], a[Cd]);
}
function Tp(a) {
return a ? a.parentWindow || a[Xc] :ea;
}
function Up() {
return Vp(ha, arguments);
}
function Vp(a, b) {
var c = b[0], e = b[1];
if (!Gp && e && (e[Zc] || e[F])) {
if (c = [ Hf, c ], e[Zc] && c[C](Xd, bo(e[Zc]), Zd), e[F]) {
c[C](Yd, bo(e[F]), Zd);
var f = {};
Ep(f, e), delete f[F], e = f;
}
c[C](Mf), c = c[Od](M);
}
return c = a[ub](c), e && (Q(e) ? Sa(c, e) :wn(e) ? Jp[rc](l, [ c ][cb](e)) :Pp(c, e)), 
2 < b[I] && Wp(a, c, b, 2), c;
}
function Wp(a, b, c, e) {
function f(c) {
c && b[Va](Q(c) ? a[eb](c) :c);
}
for (;e < c[I]; e++) {
var h = c[e];
if (xn(h) && !Xp(h)) {
var n, k = lo;
a:{
if ((n = h) && typeof n[I] == hl) {
if (zn(n)) {
n = typeof n.item == aj || typeof n.item == rm;
break a;
}
if (Cn(n)) {
n = typeof n.item == aj;
break a;
}
}
n = m;
}
k(n ? so(h) :h, f);
} else f(h);
}
}
function Sp(a) {
return a.compatMode == ag;
}
function Yp(a) {
Wp(Np(a), a, arguments, 1);
}
function Zp(a) {
for (var b; b = a[xb]; ) a[ud](b);
}
function $p(a, b) {
b[Md] && b[Md][hb](a, b);
}
function aq(a) {
return a && a[Md] ? a[Md][ud](a) :l;
}
function Xp(a) {
return zn(a) && 0 < a[Ec];
}
function bq(a, b) {
if (a.contains && 1 == b[Ec]) return a == b || a.contains(b);
if ("undefined" != typeof a.compareDocumentPosition) return a == b || Boolean(16 & a.compareDocumentPosition(b));
for (;b && a != b; ) b = b[Md];
return b == a;
}
function Np(a) {
return 9 == a[Ec] ? a :a.ownerDocument || a[nd];
}
function cq(a) {
if (rl in a) return a.outerHTML;
var b = Np(a)[ub](Hi);
return b[Va](a.cloneNode(j)), b.innerHTML;
}
function fq(a) {
var b = a.getAttributeNode(xm);
return b && b.specified ? (a = a.tabIndex, Bn(a) && a >= 0 && 32768 > a) :m;
}
function gq(a, b) {
b ? a.tabIndex = 0 :(a.tabIndex = -1, a.removeAttribute(wm));
}
function hq(a) {
var b = [];
return iq(a, b, m), b[Od](M);
}
function iq(a, b, c) {
if (!(a[Oc] in dq)) if (3 == a[Ec]) c ? b[C](oa(a.nodeValue)[v](/(\r\n|\r|\n)/g, M)) :b[C](a.nodeValue); else if (a[Oc] in eq) b[C](eq[a[Oc]]); else for (a = a[xb]; a; ) iq(a, b, c), 
a = a[Kb];
}
function Mp(a) {
this.m = a || P[nd] || ha;
}
function kq() {}
function lq(a) {
if (typeof a.Pa == aj) return a.Pa();
if (Q(a)) return a[Vb](M);
if (xn(a)) {
for (var b = [], c = a[I], e = 0; c > e; e++) b[C](a[e]);
return b;
}
return xp(a);
}
function mq(a, b, c) {
if (typeof a[yb] == aj) a[yb](b, c); else if (xn(a) || Q(a)) lo(a, b, c); else {
var e;
if (typeof a.Lb == aj) e = a.Lb(); else if (typeof a.Pa != aj) if (xn(a) || Q(a)) {
e = [];
for (var f = a[I], h = 0; f > h; h++) e[C](h);
} else e = yp(a); else e = g;
for (var f = lq(a), h = f[I], k = 0; h > k; k++) b[L](c, f[k], e && e[k], a);
}
}
function nq(a) {
this.oa = {}, this.C = [];
var c = arguments[I];
if (c > 1) {
c % 2 && d(s("Uneven number of arguments"));
for (var e = 0; c > e; e += 2) this.set(arguments[e], arguments[e + 1]);
} else a && this.Tj(a);
}
function oq(a, b) {
return fa[J][cc][L](a, b);
}
function pq() {}
function rq(a) {
a && typeof a.V == aj && a.V();
}
function qq() {
for (var b = 0, c = arguments[I]; c > b; ++b) {
var e = arguments[b];
xn(e) ? qq[rc](l, e) :rq(e);
}
}
function sq(a) {
return sq[Td](a), a;
}
function wq(a, b) {
Ia(this, a), Ua(this, b), Ga(this, this[wd]);
}
function xq(a) {
a[gb]();
}
function yq(a, b) {
a && this.Jb(a, b);
}
function Aq() {}
function Gq(a, b, c, e, f) {
if (b) {
if (wn(b)) {
for (var h = 0; h < b[I]; h++) Gq(a, b[h], c, e, f);
return l;
}
e = !!e;
var k = Dq;
b in k || (k[b] = {
l:0,
ha:0
}), k = k[b], e in k || (k[e] = {
l:0,
ha:0
}, k.l++);
var t, k = k[e], n = Dn(a);
if (k.ha++, k[n]) {
for (t = k[n], h = 0; h < t[I]; h++) if (k = t[h], k.$b == c && k.wd == f) {
if (k.Bb) break;
return t[h].key;
}
} else t = k[n] = [], k.l++;
var y = Hq, A = uq ? function(a) {
return y[L](A.src, A.key, a);
} :function(a) {
return a = y[L](A.src, A.key, a), a ? void 0 :a;
}, h = A;
return h.src = a, k = new Aq(), k.Jb(c, h, a, b, e, f), c = k.key, h.key = c, t[C](k), 
Cq[c] = k, Eq[n] || (Eq[n] = []), Eq[n][C](k), a.addEventListener ? (a == P || !a.Gg) && a.addEventListener(b, h, e) :a.attachEvent(b in Fq ? Fq[b] :Fq[b] = kl + b, h), 
c;
}
d(s("Invalid event type"));
}
function Iq(a, b, c, e, f) {
if (wn(b)) {
for (var h = 0; h < b[I]; h++) Iq(a, b[h], c, e, f);
return l;
}
return a = Gq(a, b, c, e, f), Cq[a].mf = j, a;
}
function Jq(a, b, c, e, f) {
if (wn(b)) {
for (var h = 0; h < b[I]; h++) Jq(a, b[h], c, e, f);
return l;
}
if (e = !!e, a = Kq(a, b, e), !a) return m;
for (h = 0; h < a[I]; h++) if (a[h].$b == c && a[h][Mc] == e && a[h].wd == f) return Lq(a[h].key);
return m;
}
function Lq(a) {
if (!Cq[a]) return m;
var b = Cq[a];
if (b.Bb) return m;
var c = b.src, e = b[F], f = b.Ng, h = b[Mc];
return c.removeEventListener ? (c == P || !c.Gg) && c.removeEventListener(e, f, h) :c.detachEvent && c.detachEvent(e in Fq ? Fq[e] :Fq[e] = kl + e, f), 
c = Dn(c), Eq[c] && (f = Eq[c], qo(f, b), 0 == f[I] && delete Eq[c]), b.Bb = j, 
(b = Dq[e][h][c]) && (b.Ug = j, Mq(e, h, c, b)), delete Cq[a], j;
}
function Mq(a, b, c, e) {
if (!e.Hd && e.Ug) {
for (var f = 0, h = 0; f < e[I]; f++) e[f].Bb ? e[f].Ng.src = l :(f != h && (e[h] = e[f]), 
h++);
Qa(e, h), e.Ug = m, 0 == h && (delete Dq[a][b][c], Dq[a][b].l--, 0 == Dq[a][b].l && (delete Dq[a][b], 
Dq[a].l--), 0 == Dq[a].l && delete Dq[a]);
}
}
function Nq(a, b, c) {
var e = 0, f = b == l, h = c == l;
if (c = !!c, a == l) {
a = function(a) {
for (var k = a[I] - 1; k >= 0; k--) {
var n = a[k];
!f && b != n[F] || !h && c != n[Mc] || (Lq(n.key), e++);
}
};
for (var k in Eq) a[L](g, Eq[k], k, Eq);
} else if (k = Dn(a), Eq[k]) for (k = Eq[k], a = k[I] - 1; a >= 0; a--) {
var n = k[a];
!f && b != n[F] || !h && c != n[Mc] || (Lq(n.key), e++);
}
return e;
}
function Kq(a, b, c) {
var e = Dq;
return b in e && (e = e[b], c in e && (e = e[c], a = Dn(a), e[a])) ? e[a] :l;
}
function Oq(a, b, c, e, f) {
var h = 1;
if (b = Dn(b), a[b]) {
a.ha--, a = a[b], a.Hd ? a.Hd++ :a.Hd = 1;
try {
for (var k = a[I], n = 0; k > n; n++) {
var t = a[n];
t && !t.Bb && (h &= Pq(t, f) !== m);
}
} finally {
a.Hd--, Mq(c, e, b, a);
}
}
return Boolean(h);
}
function Pq(a, b) {
return a.mf && Lq(a.key), a[Cb](b);
}
function Qq(a, b) {
var c = b[F] || b, e = Dq;
if (!(c in e)) return j;
if (Q(b)) b = new wq(b, a); else if (b instanceof wq) Ua(b, b[wd] || a); else {
var f = b;
b = new wq(c, a), Ep(b, f);
}
var h, k, f = 1, e = e[c], c = j in e;
if (c) {
for (h = [], k = a; k; k = k.ld) h[C](k);
k = e[j], k.ha = k.l;
for (var n = h[I] - 1; !b.Kb && n >= 0 && k.ha; n--) Ga(b, h[n]), f &= Oq(k, h[n], b[F], j, b) && b.Id != m;
}
if (m in e) if (k = e[m], k.ha = k.l, c) for (n = 0; !b.Kb && n < h[I] && k.ha; n++) Ga(b, h[n]), 
f &= Oq(k, h[n], b[F], m, b) && b.Id != m; else for (e = a; !b.Kb && e && k.ha; e = e.ld) Ga(b, e), 
f &= Oq(k, e, b[F], m, b) && b.Id != m;
return Boolean(f);
}
function Hq(a, b) {
if (!Cq[a]) return j;
var c = Cq[a], e = c[F], f = Dq;
if (!(e in f)) return j;
var h, k, f = f[e];
if (!uq) {
h = b || rn(fn);
var n = j in f, t = m in f;
if (n) {
if (0 > h[x] || h.returnValue != g) return j;
a:{
var y = m;
if (0 == h[x]) try {
ua(h, -1);
break a;
} catch (A) {
y = j;
}
(y || h.returnValue == g) && (h.returnValue = j);
}
}
y = new yq(), y.Jb(h, this), h = j;
try {
if (n) {
for (var G = [], ia = y.currentTarget; ia; ia = ia[Md]) G[C](ia);
k = f[j], k.ha = k.l;
for (var da = G[I] - 1; !y.Kb && da >= 0 && k.ha; da--) Ga(y, G[da]), h &= Oq(k, G[da], e, j, y);
if (t) for (k = f[m], k.ha = k.l, da = 0; !y.Kb && da < G[I] && k.ha; da++) Ga(y, G[da]), 
h &= Oq(k, G[da], e, m, y);
} else h = Pq(c, y);
} finally {
G && Qa(G, 0);
}
return h;
}
return e = new yq(b, this), h = Pq(c, e);
}
function Rq() {}
function Sq(a, b) {
this.Jd = a || 1, this.Fc = b || Tq, this.ff = In(this.hk, this), this.gf = Kn();
}
function Uq() {}
function Wq() {}
function Xq(a) {
this.headers = new nq(), this.xd = a || l;
}
function $q(a) {
a.V(), qo(Zq, a);
}
function ar(a, b) {
var c;
a instanceof ar ? (this.da = vn(b) ? b :a.da, this.Ec(a.ab), this.ye(a.Bc), this.we(a.zc), 
this.Dc(a.$a), this.Cc(a.Ia), this.ud(a.ga[dc]()), this.xe(a.Ac)) :a && (c = dp(oa(a))) ? (this.da = !!b, 
this.Ec(c[1] || M, j), this.ye(c[2] || M, j), this.we(c[3] || M, j), this.Dc(c[4]), 
this.Cc(c[5] || M, j), this.ud(c[6] || M, j), this.xe(c[7] || M, j)) :(this.da = !!b, 
this.ga = new br(l, l, this.da));
}
function cr(a, b) {
return Q(a) ? encodeURI(a)[v](b, ir) :l;
}
function ir(a) {
return a = a[Dd](0), fe + (a >> 4 & 15)[Nb](16) + (15 & a)[Nb](16);
}
function br(a, b, c) {
this.eb = a || l, this.da = !!c;
}
function jr(a) {
var b = {};
if (un(a) != jl || yn(a)) b.v = a != l ? a :l, b.f = l; else {
b.v = "undefined" == typeof a.v ? l :a.v;
var c = typeof a.f;
"undefined" == c || c == gl ? b.f = l :c == rm ? b.f = a.f :d(s("Formatted value ('f'), if specified, must be a string.")), 
c = typeof a.p, c == jl ? b.p = a.p :c != gl && "undefined" != c && d(s("Properties ('p'), if specified, must be an Object."));
}
return {
v:b.v,
f:b.f,
p:b.p
};
}
function kr(a, b, c) {
!(typeof b == jl && li in b || !d(s(c + ' must have a property "column"'))), zi in b && typeof b.desc != Ph && d(s('Property "desc" in ' + c + " must be boolean.")), 
T(a, b.column);
}
function lr(a, b) {
if (typeof b == hl) return T(a, b), [ {
column:b
} ];
if (typeof b == jl) {
if (xn(b)) {
1 > b[I] && d(s("sortColumns is an empty array. Must have at least one element."));
var c = {};
if (typeof b[0] == jl) {
for (var e = 0; e < b[I]; e++) {
kr(a, b[e], lm + e + sh);
var f = b[e].column;
f in c && d(s(cg + f + Wd)), c[f] = j;
}
return b;
}
if (typeof b[0] == hl) {
for (var h = [], e = 0; e < b[I]; e++) T(a, b[e]), b[e] in c && d(s(cg + f + Wd)), 
c[f] = j, h[C]({
column:b[e]
});
return h;
}
d(s("sortColumns is an array, but neither of objects nor of numbers. Must be either of those."));
}
return kr(a, b, km), [ b ];
}
}
function mr(a, b) {
var c = a[id]();
c > 0 ? (r[ab](b) !== b || 0 > b || b >= c) && d(s("Invalid row index " + b + ". Should be in the range [0-" + (c - 1) + "].")) :d(s("Table has no rows."));
}
function T(a, b) {
var c = a[Jc]();
c > 0 ? (r[ab](b) !== b || 0 > b || b >= c) && d(s("Invalid column index " + b + ". Should be an integer in the range [0-" + (c - 1) + "].")) :d(s("Table has no columns."));
}
function nr(a, b, c) {
a = a[wb](b), or(c, a) || d(s(gh + c + Vd + a + " in column index " + b));
}
function or(a, b) {
if (a == l) return j;
var c = typeof a;
switch (b) {
case hl:
if (c == hl) return j;
break;

case rm:
if (c == rm) return j;
break;

case Ph:
if (c == Ph) return j;
break;

case vi:
case wi:
if (yn(a)) return j;
break;

case Fm:
if (xn(a) && 2 < a[I] && 5 > a[I]) {
for (var c = j, e = 0; e < a[I]; e++) {
var f = a[e];
if (typeof f != hl || f != r[ab](f)) {
c = m;
break;
}
}
if ((0 > a[0] || 23 < a[0] || 0 > a[1] || 59 < a[1] || 0 > a[2] || 59 < a[2]) && (c = m), 
4 == a[I] && (0 > a[3] || 999 < a[3]) && (c = m), c) return j;
}
}
return m;
}
function pr(a, b, c) {
if (b == l) return c == l ? 0 :-1;
if (c == l) return 1;
switch (a) {
case Ph:
case hl:
case rm:
case vi:
case wi:
return c > b ? -1 :b > c ? 1 :0;

case Fm:
for (a = 0; 3 > a; a++) {
if (b[a] < c[a]) return -1;
if (c[a] < b[a]) return 1;
}
return b = 4 > b[I] ? 0 :b[3], c = 4 > c[I] ? 0 :c[3], c > b ? -1 :b > c ? 1 :0;
}
}
function qr(a, b) {
T(a, b);
var h, k, c = a[wb](b), e = l, f = l, n = a[id]();
for (h = 0; n > h; h++) if (k = a[H](h, b), k != l) {
f = e = k;
break;
}
if (e == l) return {
min:l,
max:l
};
for (h++; n > h; h++) k = a[H](h, b), k != l && (0 > pr(c, k, e) ? e = k :0 > pr(c, f, k) && (f = k));
return {
min:e,
max:f
};
}
function rr(a, b) {
b = lr(a, b);
for (var c = [], e = a[id](), f = 0; e > f; f++) c[C](f);
return wo(c, function(c, e) {
for (var f = 0; f < b[I]; f++) {
var t = b[f], y = t.column, y = pr(a[wb](y), a[H](c, y), a[H](e, y));
if (0 != y) return y * (t.desc ? -1 :1);
}
return 0;
}), c;
}
function sr(a, b) {
T(a, b);
var c = a[id]();
if (0 == c) return [];
for (var e = [], f = 0; c > f; ++f) e[C](a[H](f, b));
var h = a[wb](b);
wo(e, function(a, b) {
return pr(h, a, b);
});
var c = e[0], k = [];
for (k[C](c), f = 1; f < e[I]; f++) {
var n = e[f];
0 != pr(h, n, c) && k[C](n), c = n;
}
return k;
}
function tr(a, b) {
(!xn(b) || 0 == b[I]) && d(s("columnFilters must be a non-empty array"));
for (var c = {}, e = 0; e < b[I]; e++) {
typeof b[e] == jl && li in b[e] || (Ym in b[e] || Sk in b[e] || Nk in b[e] ? Ym in b[e] && (Sk in b[e] || Nk in b[e]) && d(s(mi + e + '] must specify either "value" or range properties ("minValue" and/or "maxValue"')) :d(s(mi + e + '] must have properties "column" and "value", "minValue"or "maxValue"')));
var f = b[e].column;
f in c && d(s(cg + f + " is duplicate in columnFilters.")), T(a, f), nr(a, f, b[e][Kc]), 
c[f] = j;
}
for (c = [], e = a[id](), f = 0; e > f; f++) {
var h;
a:{
h = a;
for (var k = b, n = f, t = 0; t < k[I]; t++) {
var y = k[t], A = y.column, G = h[H](n, A), A = h[wb](A);
if (y.minValue != l || y.maxValue != l) {
if (G == l || y.minValue != l && 0 > pr(A, G, y.minValue) || y.maxValue != l && 0 < pr(A, G, y.maxValue)) {
h = m;
break a;
}
} else if (0 != pr(A, G, y[Kc])) {
h = m;
break a;
}
}
h = j;
}
h && c[C](f);
}
return c;
}
function ur(a, b) {
var c;
return b == Fm ? (c = [], c[C](a[0]), c[C]((10 > a[1] ? qf :M) + a[1]), c[C]((10 > a[2] ? qf :M) + a[2]), 
c = c[Od](Df), 3 < a[I] && 0 < a[3] && (c += bf + (10 > a[3] ? tf :100 > a[3] ? qf :M) + a[3])) :b == vi ? (c = new google[K].DateFormat({
formatType:Ok,
valueType:vi
}), c = c.formatValue(a)) :b == wi ? (c = new google[K].DateFormat({
formatType:Ok,
valueType:wi
}), c = c.formatValue(a)) :c = a != l ? oa(a) :M, c;
}
function vr(a, b, c, e) {
for (var f = l, h = a[id](); (e ? b >= 0 :h > b) && f === l; ) f = a[H](b, c), b += e ? -1 :1;
return f;
}
function U(a, b) {
if (this.zb = b ? b == rf ? rf :sf :sf, a) {
if (Q(a)) a = Wn(a); else a:for (var c = a.cols || [], e = a[qc] || [], f = c[I], h = 0; f > h; h++) {
var k = c[h][F];
if (k == vi || k == wi) for (var k = e[I], n = 0; k > n; n++) {
var t = e[n].c[h];
if (t) {
var y = t.v;
if (yn(y)) break a;
Q(y) && (t = Tn(t), t = Wn(t), e[n].c[h] = t);
}
}
}
this.z = a.cols || [], this.D = a[qc] || [], this.Qa = a.p || l;
} else this.z = [], this.D = [], this.Qa = l;
this.Aa = [];
}
function xr(a) {
var b = a.version || sf;
this.nj = zp(yr, b) ? b :sf, this.We = a.status, this.hb = [], this.ib = [], this.ib = a.warnings || [], 
this.hb = a[uc] || [], zr(this.ib), zr(this.hb), this.We != Ri && (this.Og = a.sig, 
this.g = new U(a.table, this.nj));
}
function zr(a) {
for (var b = 0; b < a[I]; b++) {
var c = a[b].detailed_message;
c && (a[b].detailed_message = c ? c[ob](Ar) && !c[ob](Br) ? c :c[v](/&/g, je)[v](/</g, le)[v](/>/g, ke)[v](/\"/g, me) :M);
}
}
function Cr(a, b) {
var c = b || {};
this.$e = c.sendMethod || Ih, this.zj = !!c.xhrWithCredentials, zp(Dr, this.$e) || d(s("Send method not supported: " + this.$e)), 
this.Hg = c.makeRequestParams_ || {}, wp(a) ? a = this.ck(a) :vp(a) && (a = this.dk(a));
var e = a, c = vp(e), e = gp(e), e = tp[Cc](e);
(c = c && e) || (e = a, c = wp(e), e = gp(e), e = tp[Cc](e), c = c && e), this.yj = c, 
this.xj = a, this.vg = Er++, Fr[C](this);
}
function Jr() {
for (var a = 0; a < Fr[I]; a++) {
var b = Fr[a];
b.lf && b.jc();
}
}
function Kr(a, b) {
var c = a[D](de);
-1 != c && (a = a[Gd](0, c));
var e = a[D](Nf), f = c = M, h = [];
for (-1 == e ? c = a :(c = a[Gd](0, e), f = a[Gd](e + 1), h = f[Vb](ie)), e = [], 
f = 0; f < h[I]; f++) {
var k = {};
k.name = h[f][Vb](Lf)[0], k.Bf = h[f], e[C](k);
}
for (var n in b) {
for (h = b[n], k = m, f = 0; f < e[I]; f++) if (e[f][Zc] == n) {
e[f].Bf = n + Lf + ca(h), k = j;
break;
}
k || (f = {}, f.name = n, f.Bf = n + Lf + ca(h), e[C](f));
}
if (n = c, 0 < e[I]) {
for (n += Nf, c = [], f = 0; f < e[I]; f++) c[C](e[f].Bf);
n += c[Od](ie);
}
return n;
}
function Lr(a) {
var b = a.reqId, c = Hr[b];
c ? (Hr[b] = l, c.lc(a)) :d(s("Missing query for request id: " + b));
}
function Mr() {
var a;
Nr || (Nr = j, P.IDIModule && P.IDIModule.registerListener(Jr, {
pollingInterval:100
}), P.gadgets && (Or(cf), this.Ah())), a = ha, a = a.querySelectorAll && a.querySelector ? a.querySelectorAll(Uf) :a[Lb](Uf), 
this.Ok = On(a[0]);
}
function Pr() {
return !!P.gadgets && !!P.gadgets.rpc;
}
function Or(a) {
if (Pr()) {
var b = P.gadgets;
try {
b.rpc.getRelayUrl(a) || b.rpc.setRelayUrl(a, mk);
} catch (c) {
Cn(b.rpc.setRelayUrl) && b.rpc.setRelayUrl(a, mk);
}
}
}
function Qr(a) {
var b = a.__eventTarget;
return b == l && (b = new Rq(), a.__eventTarget = b), a = b;
}
function Rr(a) {
this.Yk = a;
}
function Sr(a, b) {
wq[L](this, a), this.$k = b;
}
function Tr(a, b, c, e) {
this.Ga = a, this.Ig = b, this.bb = c || {}, this.xc = e, this.Lc = l, e && (this.Lc = this.jf = On(e)), 
!(b && Li in b && typeof b[zd] == aj || !d(s("Visualization must have a draw method.")));
}
function W(a) {
this.g = a;
var b = [];
a = a[Jc]();
for (var c = 0; a > c; c++) b[C](c);
this.t = b, this.Ma = j, this.La = l, this.Ke = [], this.Je = j;
}
function Vr(a, b) {
this.sd = b, this.mk = a;
}
function Xr(a) {
var b = {};
a = oa(a);
var c = a[db](0) == de ? a :de + a;
if (Yr[Cc](c)) return a = c, Yr[Cc](a) || d(s("'" + a + "' is not a valid hex color")), 
4 == a[I] && (a = a[v](Zr, ee)), b.Af = a[Pd](), Ia(b, dk), b;
a:{
var e = a[ob]($r);
if (e) {
var c = la(e[1]), f = la(e[2]), e = la(e[3]);
if (c >= 0 && 255 >= c && f >= 0 && 255 >= f && e >= 0 && 255 >= e) {
c = [ c, f, e ];
break a;
}
}
c = [];
}
return c[I] ? (f = c[0], a = c[1], c = c[2], f = la(f), a = la(a), c = la(c), (ja(f) || 0 > f || f > 255 || ja(a) || 0 > a || a > 255 || ja(c) || 0 > c || c > 255) && d(s('"(' + f + xe + a + xe + c + '") is not a valid RGB color')), 
f = as(f[Nb](16)), a = as(a[Nb](16)), c = as(c[Nb](16)), b.Af = de + f + a + c, 
Ia(b, Pl), b) :Wr && (c = Wr[a[Pd]()]) ? (b.Af = c, Ia(b, al), b) :(d(s(a + " is not a valid color string")), 
void 0);
}
function as(a) {
return 1 == a[I] ? qf + a :a;
}
function bs(a) {
return a == el || a == M || a == Pm ? el :Xr(a).Af;
}
function cs(a, b, c, e) {
this.top = a, Ea(this, b), Ba(this, c), Ha(this, e);
}
function ds(a) {
a = a || {}, this.zg = el, a.fill != l && this.gj(a.fill), this.yg = 1, a.Se != l && this.hj(a.Se), 
this.xg = el, a.stroke != l && this.jj(a.stroke), this.Fg = 1, a.Eg != l && this.Mg(a.Eg), 
this.Dg = 1, a.Te != l && this.lj(a.Te), this.Cg = jm, a.Bg != l && this.kj(a.Bg), 
this.za = l, a.za && (this.za = Bp(a.za), this.za.ej = bs(this.za.ej), this.za.fj = bs(this.za.fj)), 
this.Ag = l, a.pattern && this.ij(a.pattern);
}
function es(a) {
if (yn(a)) {
var b = new Date();
return b.setTime(a.valueOf()), b;
}
var c = un(a);
if (c == jl || c == Hh) {
if (a[dc]) return a[dc]();
c = c == Hh ? [] :{};
for (b in a) c[b] = es(a[b]);
return c;
}
return a;
}
function fs(a, b, c, e) {
Ha(this, a), this.top = b, ra(this, c), Da(this, e);
}
function gs(a, b) {
var c = Np(a);
return c[Xc] && c[Xc].getComputedStyle && (c = c[Xc].getComputedStyle(a, l)) ? c[b] || c.getPropertyValue(b) || M :M;
}
function hs(a, b) {
return gs(a, b) || (a[Fd] ? a[Fd][b] :l) || a[z] && a[z][b];
}
function is(a) {
return hs(a, Bl);
}
function js(a, b, c) {
var e, f = Lo && (Fo || Po) && Zo(xf);
b instanceof yo ? (e = b.x, b = b.y) :(e = b, b = c), Ha(a[z], ks(e, f)), a[z].top = ks(b, f);
}
function ls(a) {
var b = a[Wa]();
return S && (a = a.ownerDocument, Ha(b, b[E] - (a[Mb][zb] + a[td][zb])), b.top -= a[Mb][Bb] + a[td][Bb]), 
b;
}
function ms(a) {
if (S && !$o(8)) return a[Xb];
var b = Np(a), c = hs(a, Bl), e = c == Vi || c == xh;
for (a = a[Md]; a && a != b; a = a[Md]) if (c = hs(a, Bl), e = e && c == qm && a != b[Mb] && a != b[td], 
!e && (a[jc] > a[ld] || a[vb] > a[Cd] || c == Vi || c == xh || c == Ml)) return a;
return l;
}
function ns(a) {
for (var b = new cs(0, ga, ga, 0), c = Lp(a), e = c.m[td], f = c.m[Mb], h = c.Wj(); a = ms(a); ) if (!(S && 0 == a[ld] || Mo && 0 == a[Cd] && a == e || a == e || a == f || hs(a, sl) == bn)) {
var n, k = os(a);
if (n = a, Lo && !Zo(xf)) {
var t = na(gs(n, Vh));
if (ps(n)) var y = n[bb] - n[ld] - t - na(gs(n, Xh)), t = t + y;
n = new yo(t, na(gs(n, Zh)));
} else n = new yo(n[zb], n[Bb]);
k.x += n.x, k.y += n.y, b.top = r.max(b.top, k.y), Ea(b, r.min(b[zc], k.x + a[ld])), 
Ba(b, r.min(b[oc], k.y + a[Cd])), Ha(b, r.max(b[E], k.x));
}
return e = h[mc], h = h[ed], Ha(b, r.max(b[E], e)), b.top = r.max(b.top, h), c = c.Yj(), 
Ea(b, r.min(b[zc], e + c[u])), Ba(b, r.min(b[oc], h + c[B])), 0 <= b.top && 0 <= b[E] && b[oc] > b.top && b[zc] > b[E] ? b :l;
}
function os(a) {
var b, k, c = Np(a), e = hs(a, Bl), f = Lo && c[pb] && !a[Wa] && e == xh && (b = c[pb](a)) && (0 > b[mb] || 0 > b[nb]), h = new yo(0, 0);
if (b = c ? Np(c) :ha, k = !S || $o(9) || Lp(b).Xe() ? b[Mb] :b[td], a == k) return h;
if (a[Wa]) b = ls(a), a = Lp(c).Tb(), h.x = b[E] + a.x, h.y = b.top + a.y; else if (c[pb] && !f) b = c[pb](a), 
a = c[pb](k), h.x = b[mb] - a[mb], h.y = b[nb] - a[nb]; else {
b = a;
do {
if (h.x += b[qd], h.y += b[wc], b != a && (h.x += b[zb] || 0, h.y += b[Bb] || 0), 
Mo && is(b) == Vi) {
h.x += c[td][mc], h.y += c[td][ed];
break;
}
b = b[Xb];
} while (b && b != a);
for ((Ko || Mo && e == xh) && (h.y -= c[td][wc]), b = a; (b = ms(b)) && b != c[td] && b != k; ) h.x -= b[mc], 
Ko && b[sc] == bh || (h.y -= b[ed]);
}
return h;
}
function qs(a, b, c) {
b instanceof Ao ? (c = b[B], b = b[u]) :c == g && d(s("missing height argument")), 
ra(a[z], ks(b, j)), Da(a[z], ks(c, j));
}
function ks(a, b) {
return typeof a == hl && (a = (b ? r.round(a) :a) + Gl), a;
}
function rs(a) {
if (hs(a, Fi) != el) return ss(a);
var b = a[z], c = b.display, e = b.visibility, f = b.position;
return Oa(b, ek), b.position = xh, Ca(b, uk), a = ss(a), Ca(b, c), b.position = f, 
Oa(b, e), a;
}
function ss(a) {
var b = a[bb], c = a.offsetHeight, e = Mo && !b && !c;
return vn(b) && !e || !a[Wa] ? new Ao(b, c) :(a = ls(a), new Ao(a[zc] - a[E], a[oc] - a.top));
}
function ts(a) {
var b = os(a);
return a = rs(a), new fs(b.x, b.y, a[u], a[B]);
}
function us(a, b) {
var c = a[z];
ll in c ? c.opacity = b :Ig in c ? c.MozOpacity = b :Ui in c && (c.filter = b === M ? M :Eh + 100 * b + ve);
}
function vs(a, b) {
Ca(a[z], b ? M :el);
}
function ps(a) {
return Sl == hs(a, Ci);
}
function xs(a, b, c) {
if (c = c ? l :a[Lb](we), ws) {
if (b = b ? el :M, a[z][ws] = b, c) {
a = 0;
for (var e; e = c[a]; a++) e[z][ws] = b;
}
} else if ((S || Ko) && (b = b ? kl :M, a[Ab](Vm, b), c)) for (a = 0; e = c[a]; a++) e[Ab](Vm, b);
}
function ys(a, b, c, e) {
if (/^\d+px?$/[Cc](b)) return ma(b, 10);
var f = a[z][c], h = a.runtimeStyle[c];
return a.runtimeStyle[c] = a[Fd][c], a[z][c] = b, b = a[z][e], a[z][c] = f, a.runtimeStyle[c] = h, 
b;
}
function zs(a, b) {
return ys(a, a[Fd] ? a[Fd][b] :l, Hk, Al);
}
function Bs(a, b) {
if ((a[Fd] ? a[Fd][b + $g] :l) == el) return 0;
var c = a[Fd] ? a[Fd][b + jh] :l;
return c in As ? As[c] :ys(a, c, Hk, Al);
}
function Cs(a) {
if (S) {
var b = Bs(a, Uh), c = Bs(a, Wh), e = Bs(a, Yh);
return a = Bs(a, Sh), new cs(e, c, a, b);
}
return b = gs(a, Vh), c = gs(a, Xh), e = gs(a, Zh), a = gs(a, Th), new cs(na(e), na(c), na(a), na(b));
}
function Es() {
var a = rn(Wj);
a != l || (a = jf);
var b = rn(Zj);
return b != l || (b = wf), a + nf + b;
}
function Fs(a) {
var b = rn(a);
return Cn(b) || (b = rn(Xj + a), Cn(b) || (b = l)), b;
}
function Hs(a, b) {
var c = a.useFormatFromData;
if ((!An(c) || c) && Zn(io(a.format))) {
for (var c = b = mo(b, function(a) {
return !Zn(io(a));
}), e = {}, f = 0, h = 0; h < c[I]; ) {
var k = c[h++], n = zn(k) ? il + Dn(k) :(typeof k)[db](0) + k;
fa[J][cc][L](e, n) || (e[n] = j, c[f++] = k);
}
Qa(c, f), 1 == b[I] && (c = b[0], Zn(io(c)) || (c = c[v](/\d/g, qf), c = c[v](/#{10,}/, ka(11)[Od](de))), 
a.format = c);
}
}
function Is(a, b) {
var c = a[H](b, 0), e = a[H](b, 1);
return c == l || e == l ? l :new yo(c, e);
}
function Js(a) {
var b = a.ea, c = a[fb]();
a = a[Hc]();
var e;
a:if (e = a.useFormatFromData, An(e) && !e) e = m; else {
e = [ Xm, Am, ym, zm, Ii ];
for (var f = 0; f < e[I]; f++) if (rn(e[f] + ef, a)) {
e = m;
break a;
}
e = j;
}
if (e) if (b == Yf) 3 > c[Jc]() || (b = c[$b](1), e = a.hAxis || {}, Hs(e, [ b ]), 
a.hAxis = e, c = c[$b](2), b = a.vAxes || {}, e = b[0] || {}, Hs(e, [ c ]), b[0] = e, 
a.vAxes = b); else {
e = a.vAxes || [ {}, {} ];
for (var f = a.hAxis || {}, h = e[0] || {}, k = e[1] || {}, n = [], t = [], y = c && c[Jc]() || 0, A = 0; y > A; A++) if (c[wb](A) == hl) {
var ia, G = c[$b](A);
switch (ia = A, 0 == ia ? ia = l :(ia--, ia = ((a.series || {})[ia] || {}).targetAxisIndex || 0), 
ia) {
case 0:
n[C](G);
break;

case 1:
t[C](G);
}
}
b == Xf ? Hs(f, n) :(Hs(h, n), Hs(k, t)), y > 0 && c[wb](0) != rm && (b = b == Xf ? h :f, 
G = c[$b](0), Hs(b, [ G ])), e[0] = h, e[1] = k, a.vAxes = e, a.hAxis = f;
}
}
function Ks(a) {
if (a[ec](Bh)) {
var b = a[fb]();
if (a.ea == Wg && 2 == b[Jc]()) {
var c;
c = b[id]();
for (var e = new yo(), f = 0; c > f; f++) {
var h = Is(b, f);
h != l && (e.x += h.x, e.y += h.y);
}
for (c = new yo(e.x / c, e.y / c), h = f = e = 0; h < b[id](); h++) {
var k = Is(b, h);
k != l && (k = new yo(k.x - c.x, k.y - c.y), e += k.x * k.y, f += k.x * k.x);
}
var n, t;
n = e / f || 1, t = c.y - n * c.x, c = new google[K][Ad](b), c[xc]([ 0, 1, {
type:hl,
calc:function(a, c) {
var e = Is(b, c);
return e != l ? n * e.x + t :l;
}
} ]), a[ic](c), a[Qd](Yl, 2), a[Qd](Zl, 0), a[Qd]($l, m);
}
a[Qd](Bh, l);
}
}
function Ls(a) {
var b = a[fb](), c = a[Pb]();
if (wn(c)) for (var e = 0; e < c[I]; e++) b = google[K][Ad].fromJSON(b, c[e]); else c != l && (b = google[K][Ad].fromJSON(b, c));
a[rd](l), a[ic](b);
}
function Ms(a) {
var b = a.ea;
if ((Gs[b] || l) == ri && b != Wg) {
var b = a[fb](), c = a[ec]($j);
if (c != l) {
for (var e = [ {
calc:c ? sm :Ni,
sourceColumn:0,
type:rm
} ], f = c ? 1 :0, c = b[Jc](); c > f; f++) e[C](f);
b = new google[K][Ad](b), b[xc](e), a[Qd]($j, l), a[ic](b);
}
}
}
function Ns(a, b) {
var c = b || {};
Q(c) && (c = Wn(c)), this.dg = c.containerId || l, this.kd = a, this.ea = c[a + fh] || l, 
this.eg = c[a + Lg] || l, Ta(this, l), this.qd = l, this.sd = c.dataSourceUrl || l, 
this.g = l, this[ic](c.dataTable), this.bb = c.options || {}, this.Ha = c.state || {};
var e = c.packages;
this.fg = vn(e) ? e :l, this.Ga = c.query || l, this.vb = c.refreshInterval || l, 
this.Db = c.view || l, this.vd = l, this.$f = [ Ls, Ms, Js, Ks ];
}
function Os(a, b, c) {
return a = -1 == b[D](bf) ? a[b] :rn(b, a), c = vn(c) ? c :l, a != l ? a :c;
}
function Y(a) {
Ns[L](this, fi, a);
}
function Z(a) {
Ns[L](this, pi, a);
}
function $(a) {
Ns[L](this, ti, a), a = a || {}, Q(a) && (a = Wn(a)), this.ya = a.wrappers || l, 
this.ec = a.bindings || l, this.of(a.dashboardType || gg), this.nf();
}
function Ps(a, b) {
Qs(a)[zd](b);
}
function Qs(a) {
return a = a || {}, Q(a) && (a = Wn(a)), a.controlType ? new google[K].ControlWrapper(a) :a.dashboardType ? new google[K].DashboardWrapper(a) :new google[K].ChartWrapper(a);
}
function Rs(a) {
for (var b = 0, c = 0; c < a[I]; c++) b += a[c];
return b;
}
function Ss(a, b, c, e, f) {
this.S = !!b, a && this.hc(a, e), xa(this, f != g ? f :this.pa || 0), this.S && xa(this, -1 * this[Fb]), 
this.Gd = !c;
}
function Ts(a, b) {
Ss[L](this, a, b, j);
}
function Us(a, b, c, e, f) {
var h;
if (a && (this.H = a, this.L = b, this.A = c, this.K = e, 1 == a[Ec] && a[sc] != Vf && (a = a[Gb], 
(b = a[b]) ? (this.H = b, this.L = 0) :(a[I] && (this.H = a[a[I] - 1]), h = j)), 
1 == c[Ec] && ((this.A = c[Gb][e]) ? this.K = 0 :this.A = c)), Ss[L](this, f ? this.A :this.H, f, j), 
h) try {
this.next();
} catch (k) {
k != jq && d(k);
}
}
function Vs() {}
function Ws(a) {
this.n = a;
}
function Xs(a) {
var b = Np(a).createRange();
if (3 == a[Ec]) b[hd](a, 0), b[jb](a, a[I]); else if (Ys(a)) {
for (var c, e = a; (c = e[xb]) && Ys(c); ) e = c;
for (b[hd](e, 0), e = a; (c = e[fc]) && Ys(c); ) e = c;
b[jb](e, 1 == e[Ec] ? e[Gb][I] :e[I]);
} else c = a[Md], a = ko(c[Gb], a), b[hd](c, a), b[jb](c, a + 1);
return b;
}
function Zs(a, b, c, e) {
var f = Np(a).createRange();
return f[hd](a, b), f[jb](c, e), f;
}
function $s(a) {
this.n = a;
}
function at(a, b) {
this.n = a, this.$i = b;
}
function bt(a) {
var b = Np(a)[td].createTextRange();
if (1 == a[Ec]) b.moveToElementText(a), Ys(a) && !a[Gb][I] && b[$a](m); else {
for (var c = 0, e = a; e = e.previousSibling; ) {
var f = e[Ec];
if (3 == f) c += e[I]; else if (1 == f) {
b.moveToElementText(e);
break;
}
}
e || b.moveToElementText(a[Md]), b[$a](!e), c && b.move(ei, c), b.moveEnd(ei, a[I]);
}
return b;
}
function ct(a, b, c, e) {
var f = a, h = b, k = c, n = e, t = m;
1 == f[Ec] && (h = f[Gb][h], t = !h, f = h || f[fc] || f, h = 0);
var y = bt(f);
return h && y.move(ei, h), f == k && h == n ? y[$a](j) :(t && y[$a](m), t = m, 1 == k[Ec] && (k = (h = k[Gb][n]) || k[fc] || k, 
n = 0, t = !h), f = bt(k), f[$a](!t), n && f.moveEnd(ei, n), y.setEndPoint(kg, f)), 
n = new at(y, Np(a)), n.H = a, n.L = b, n.A = c, n.K = e, n;
}
function et(a) {
this.n = a;
}
function ft(a) {
this.n = a;
}
function dt(a) {
if (S && !$o(9)) {
var b = new at(bt(a), Np(a));
if (Ys(a)) {
for (var c, e = a; (c = e[xb]) && Ys(c); ) e = c;
for (b.H = e, b.L = 0, e = a; (c = e[fc]) && Ys(c); ) e = c;
b.A = e, b.K = 1 == e[Ec] ? e[Gb][I] :e[I], b.Ka = a;
} else b.H = b.A = b.Ka = a[Md], b.L = ko(b.Ka[Gb], a), b.K = b.L + 1;
a = b;
} else a = Mo ? new ft(Xs(a)) :Lo ? new $s(Xs(a)) :Ko ? new et(Xs(a)) :new Ws(Xs(a));
return a;
}
function Ys(a) {
var b;
a:if (1 != a[Ec]) b = m; else {
switch (a[sc]) {
case Qf:
case Rf:
case Tf:
case Vf:
case Zf:
case $f:
case ig:
case ng:
case rg:
case ug:
case vg:
case tg:
case wg:
case Bg:
case Cg:
case Jg:
case Kg:
case Dg:
case Ng:
case Og:
case Sg:
case Ug:
case Vg:
case ch:
case ih:
b = m;
break a;
}
b = j;
}
return b || 3 == a[Ec];
}
function gt(a, b, c) {
a[Ab](Gh + b, c);
}
function ht(a, b, c, e, f) {
if (!(S || Mo && Zo(yf))) return j;
if (Fo && f) return it(a);
if (f && !e || !c && (17 == b || 18 == b || Fo && 91 == b)) return m;
if (Mo && e && c) switch (a) {
case 220:
case 219:
case 221:
case 192:
case 186:
case 189:
case 187:
case 188:
case 190:
case 191:
case 192:
case 222:
return m;
}
if (S && e && b == a) return m;
switch (a) {
case 13:
return !(S && $o(9));

case 27:
return !Mo;
}
return it(a);
}
function it(a) {
if (a >= 48 && 57 >= a || a >= 96 && 106 >= a || a >= 65 && 90 >= a || Mo && 0 == a) return j;
switch (a) {
case 32:
case 63:
case 107:
case 109:
case 110:
case 111:
case 186:
case 59:
case 189:
case 187:
case 61:
case 188:
case 190:
case 191:
case 192:
case 222:
case 219:
case 220:
case 221:
return j;

default:
return m;
}
}
function jt(a) {
switch (a) {
case 61:
return 187;

case 59:
return 186;

case 224:
return 91;

case 0:
return 224;

default:
return a;
}
}
function kt(a) {
this.Sg = a, this.C = [];
}
function mt(a, b, c) {
Ua(this, a), this.handle = b || a, this.bf = c || new fs(0/0, 0/0, 0/0, 0/0), this.m = Np(a), 
this.Fa = new kt(this), Gq(this.handle, [ Lm, Vk ], this.Wf, m, this);
}
function ot(a, b, c, e, f, h, k) {
wq[L](this, a), Ma(this, c), Na(this, e), Ha(this, vn(h) ? h :b.cc), this.top = vn(k) ? k :b.dc;
}
function pt(a) {
this.i = a, a = S ? Yi :Nh, this.oi = Gq(this.i, S ? Xi :Wi, this, !S), this.pi = Gq(this.i, a, this, !S);
}
function qt() {}
function rt(a) {
this.Wa = a || Lp(), this.cb = st;
}
function tt(a, b) {
switch (a) {
case 1:
return b ? Di :Oi;

case 2:
return b ? gk :Tm;

case 4:
return b ? zh :yi;

case 8:
return b ? Vl :Um;

case 16:
return b ? gi :Sm;

case 32:
return b ? Wi :Nh;

case 64:
return b ? ml :ki;
}
d(s("Invalid component state"));
}
function ut(a, b) {
rt[L](this, b), this.qi = !!a;
}
function vt(a, b, c) {
ut[L](this, b, c), this.sa = a || Tk, this.Ta = new wt().$(xt, j).$(yt, m, j);
}
function zt(a, b) {
Ia(this, Bi), this.key = a, this.caption = b;
}
function wt(a) {
this.Wa = a || Lp(), nq[L](this);
}
function Et(a, b) {
a && this.Nf(a, b);
}
function Jt(a, b, c, e) {
e && this.Jb(e, g), Ia(this, Bk), ua(this, a), this.charCode = b, this.repeat = c;
}
function Kt() {}
function Mt(a, b) {
a || d(s("Invalid class name " + a)), Cn(b) || d(s("Invalid decorator function " + b));
}
function Ot(a, b, c) {
if (rt[L](this, c), !b) {
b = this[Yb];
for (var e; b && (e = Dn(b), !(e = Nt[e])); ) b = b.b ? b.b[Yb] :l;
b = e ? Cn(e.ma) ? e.ma() :new e() :l;
}
this.k = b, this.Sf(a);
}
function Qt() {
this.yh = [];
}
function Rt(a, b, c, e) {
Ot[L](this, a, e || Qt.ma(), c), this[kd](b);
}
function St(a, b, c, e, f, h, k, n, t) {
var y, A;
if (y = c[Xb]) {
var G = y[sc] == sg || y[sc] == Uf;
G && is(y) == qm || (A = os(y), G || (G = (G = ps(y)) && Lo ? -y[mc] :!G || S && Zo(Cf) ? y[mc] :y[jc] - y[ld] - y[mc], 
A = zo(A, new yo(G, y[ed]))));
}
y = A || new yo(), A = ts(a), (G = ns(a)) && A.qj(new fs(G[E], G.top, G[zc] - G[E], G[oc] - G.top));
var G = Lp(a), ia = Lp(c);
if (G.m != ia.m) {
var da = G.m[td], ia = ia.ad(), lb = new yo(0, 0), wa = Tp(Np(da)), Eb = da;
do {
var aa;
if (wa == ia) aa = os(Eb); else {
aa = Eb;
var ba = new yo();
if (1 == aa[Ec]) {
if (aa[Wa]) {
var V = ls(aa);
ba.x = V[E], ba.y = V.top;
} else {
var V = Lp(aa).Tb(), La = os(aa);
ba.x = La.x - V.x, ba.y = La.y - V.y;
}
Lo && !Zo(12) && (V = g, V = g, S ? V = Pe :Mo ? V = af :Ko ? V = Qe :Lo && (V = Oe), 
La = g, V && (La = hs(aa, V)), La || (La = hs(aa, Om)), La ? (aa = La[ob](Ds), V = aa ? new yo(na(aa[1]), na(aa[2])) :new yo(0, 0)) :V = new yo(0, 0), 
ba = new yo(ba.x + V.x, ba.y + V.y));
} else V = Cn(aa.pj), La = aa, aa[ib] ? La = aa[ib][0] :V && aa.U[ib] && (La = aa.U[ib][0]), 
ba.x = La[bd], ba.y = La[cd];
aa = ba;
}
lb.x += aa.x, lb.y += aa.y;
} while (wa && wa != ia && (Eb = wa.frameElement) && (wa = wa.parent));
da = zo(lb, os(da)), S && !G.Xe() && (da = zo(da, G.Tb())), Ha(A, A[E] + da.x), 
A.top += da.y;
}
a = -5 & (4 & b && ps(a) ? 2 ^ b :b), b = new yo(2 & a ? A[E] + A[u] :A[E], 1 & a ? A.top + A[B] :A.top), 
b = zo(b, y), f && (b.x += (2 & a ? -1 :1) * f.x, b.y += (1 & a ? -1 :1) * f.y);
var O;
return k && (t ? O = t :(O = ns(c)) && (O.top -= y.y, Ea(O, O[zc] - y.x), Ba(O, O[oc] - y.y), 
Ha(O, O[E] - y.x))), t = b[dc](), f = 0, a = -5 & (4 & e && ps(c) ? 2 ^ e :e), e = rs(c), 
n = n ? n[dc]() :e[dc](), (h || 0 != a) && (2 & a ? t.x -= n[u] + (h ? h[zc] :0) :h && (t.x += h[E]), 
1 & a ? t.y -= n[B] + (h ? h[oc] :0) :h && (t.y += h.top)), k && (O ? (h = t, f = 0, 
65 == (65 & k) && (h.x < O[E] || h.x >= O[zc]) && (k &= -2), 132 == (132 & k) && (h.y < O.top || h.y >= O[oc]) && (k &= -5), 
h.x < O[E] && 1 & k && (h.x = O[E], f |= 1), h.x < O[E] && h.x + n[u] > O[zc] && 16 & k && (ra(n, r.max(n[u] - (h.x + n[u] - O[zc]), 0)), 
f |= 4), h.x + n[u] > O[zc] && 1 & k && (h.x = r.max(O[zc] - n[u], O[E]), f |= 1), 
2 & k && (f |= (h.x < O[E] ? 16 :0) | (h.x + n[u] > O[zc] ? 32 :0)), h.y < O.top && 4 & k && (h.y = O.top, 
f |= 2), h.y >= O.top && h.y + n[B] > O[oc] && 32 & k && (Da(n, r.max(n[B] - (h.y + n[B] - O[oc]), 0)), 
f |= 8), h.y + n[B] > O[oc] && 4 & k && (h.y = r.max(O[oc] - n[B], O.top), f |= 2), 
8 & k && (f |= (h.y < O.top ? 64 :0) | (h.y + n[B] > O[oc] ? 128 :0)), k = f) :k = 256, 
f = k, 496 & f) ? c = f :(js(c, t), e == n || (e && n ? e[u] == n[u] && e[B] == n[B] :0) || (h = Lp(Np(c)).Xe(), 
!S || h && Zo(Cf) ? (c = c[z], Lo ? c.MozBoxSizing = Qh :Mo ? c.WebkitBoxSizing = Qh :c.boxSizing = Qh, 
ra(c, r.max(n[u], 0) + Gl), Da(c, r.max(n[B], 0) + Gl)) :(k = c[z], h ? (S ? (h = zs(c, wl), 
e = zs(c, xl), t = zs(c, yl), O = zs(c, vl), h = new cs(t, e, O, h)) :(h = gs(c, wl), 
e = gs(c, xl), t = gs(c, yl), O = gs(c, vl), h = new cs(na(t), na(e), na(O), na(h))), 
c = Cs(c), k.pixelWidth = n[u] - c[E] - h[E] - h[zc] - c[zc], k.pixelHeight = n[B] - c.top - h.top - h[oc] - c[oc]) :(k.pixelWidth = n[u], 
k.pixelHeight = n[B]))), c = f), c;
}
function Tt() {}
function Ut(a, b, c) {
this.element = a, this.dd = b, this.Dk = c;
}
function Vt(a, b, c, e) {
Ut[L](this, a, b), this.Md = c ? 5 :0, this.pf = e || g;
}
function Wt(a, b, c, e) {
Vt[L](this, a, b, c || e), (c || e) && this.dl(65 | (e ? 32 :132));
}
function bu() {}
function cu() {}
function du(a, b, c) {
Ot[L](this, a, b || cu.ma(), c);
}
function eu() {}
function fu(a, b) {
Ot[L](this, l, a || eu.ma(), b), this.ka(1, m), this.ka(2, m), this.ka(4, m), this.ka(32, m), 
this.jh(1);
}
function gu() {}
function hu(a, b, c) {
rt[L](this, c), this.k = b || gu.ma(), this.Yb = a || an;
}
function iu() {}
function ju(a, b, c) {
Ot[L](this, a, c || iu.ma(), b), this.ka(1, m), this.ka(2, m), this.ka(4, m), this.ka(32, m), 
this.jh(1);
}
function ku() {}
function lu(a, b) {
hu[L](this, an, b || ku.ma(), a), this.sb(m);
}
function mu() {}
function nu() {}
function ou(a, b, c, e) {
du[L](this, a, c || nu.ma(), e), this.ka(64, j), this.Yc = new Wt(l, 5), b && this.$c(b), 
this.ei = l, this.aa = new Sq(500), ($t || au) && !Zo(Af) && this.Ej(j);
}
function pu(a) {
this.Eb = [], this.zk(a);
}
function qu(a, b, c, e) {
ou[L](this, a, b, c, e), this.Jk(a), this.wf(Jk);
}
function ru(a, b) {
this.Wa = Lp(), this.xc = a, this.dh = [];
a:{
for (var c = Es() + pf, e = ha[Lb](Cg), f = 0; f < e[I]; f++) if (e[f] && e[f][pc] && e[f][pc] == c) break a;
if (e = ha[ub](Ik), e.href = c, e.rel = um, Ia(e, Bm), 0 == ha[Lb](ck)[I]) {
var c = ha[Lb](ik)[0], f = ha[Lb](Oh)[0], h = ha[ub](ck);
c[hb](h, f);
}
ha[Lb](ck)[0][Va](e);
}
this.ik(b);
}
function su(a, b) {
var e, f, c = Lp(), h = l;
switch (a) {
case 2:
e = new vt(Uj), h = Hl + e.Mb(), f = c.d(Hi, l, c.d(Hi, {
"class":Tj
}, fg), c.d($h, l), c.d(Dl, l, c.d(Hi, {
id:h
}, b[bc])));
break;

case 3:
e = new vt(Pj), f = c.d(Hi, l, c.d(Hi, {
"class":Tj
}, fg), c.d($h, l));
var k = c.d(Hi, l, c.d(Dl, l, b[bc]));
c[Va](f, k);
}
e[Yc](f.innerHTML), Fa(e.Zi(), pg), Fa(e.Yi(), M), e.F(j), h && (c = Op(h), (S && !$o(9) ? ct(c, 0, c, 1) :Mo ? new ft(Zs(c, 0, c, 1)) :Lo ? new $s(Zs(c, 0, c, 1)) :Ko ? new et(Zs(c, 0, c, 1)) :new Ws(Zs(c, 0, c, 1))).select());
}
function tu(a) {
if (!a) return M;
var c, b = M;
for (c in a) b += oe + c + Lf + ca(a[c]);
return b;
}
if (!window.__gvizguard__) {
var g = void 0, j = !0, l = null, m = !1, ca = encodeURIComponent, p = google_exportSymbol, ea = window, fa = Object, ga = 1/0, ha = document, ja = isNaN, q = google_exportProperty, r = Math, ka = Array, la = Number, s = Error, ma = parseInt, na = parseFloat, oa = String, pa = decodeURIComponent, qa = RegExp, Va = "appendChild", Wa = "getBoundingClientRect", Xa = "getParent", Ya = "relatedTarget", Za = "clearTimeout", u = "width", $a = "collapse", v = "replace", ab = "floor", bb = "offsetWidth", cb = "concat", db = "charAt", eb = "createTextNode", fb = "getDataTable", gb = "preventDefault", hb = "insertBefore", ib = "targetTouches", jb = "setEnd", w = "dispatchEvent", kb = "setColumnProperties", mb = "screenX", nb = "screenY", ob = "match", pb = "getBoxObjectFor", qb = "send", rb = "getName", sb = "charCode", tb = "focus", ub = "createElement", vb = "scrollHeight", x = "keyCode", wb = "getColumnType", xb = "firstChild", yb = "forEach", zb = "clientLeft", Ab = "setAttribute", Bb = "clientTop", Cb = "handleEvent", Db = "getTableProperties", Fb = "depth", Gb = "childNodes", Hb = "setCell", Ib = "bind", Jb = "source", Kb = "nextSibling", Lb = "getElementsByTagName", Mb = "documentElement", Nb = "toString", Ob = "altKey", Pb = "getView", Qb = "propertyIsEnumerable", Rb = "addError", Sb = "toJSON", Tb = "setTimeout", Ub = "setDataSourceUrl", Vb = "split", Wb = "getColumnProperty", Xb = "offsetParent", Yb = "constructor", Zb = "stopPropagation", $b = "getColumnPattern", ac = "location", bc = "message", cc = "hasOwnProperty", z = "style", dc = "clone", ec = "getOption", fc = "lastChild", gc = "isEnabled", ic = "setDataTable", jc = "scrollWidth", kc = "getFullYear", lc = "getState", mc = "scrollLeft", nc = "getContainerId", oc = "bottom", pc = "href", qc = "rows", rc = "apply", sc = "tagName", tc = "getContainer", uc = "errors", vc = "label", wc = "offsetTop", B = "height", xc = "setColumns", yc = "execScript", zc = "right", C = "push", Ac = "isCollapsed", Bc = "open", Cc = "test", Dc = "slice", Ec = "nodeType", Fc = "events", Gc = "getElementById", Hc = "getOptions", Ic = "RequestParameters", Jc = "getNumberOfColumns", Kc = "value", D = "indexOf", Lc = "metaKey", Mc = "capture", Nc = "getColumnProperties", Oc = "nodeName", E = "left", Pc = "isError", Qc = "getColumnLabel", Rc = "toDataTable", Sc = "getSortedRows", Tc = "getTableRowIndex", Uc = "play", Vc = "getRowProperties", Wc = "setRefreshInterval", F = "type", Xc = "defaultView", Yc = "setContent", Zc = "name", H = "getValue", $c = "addRows", ad = "setActive", bd = "clientX", cd = "clientY", dd = "setState", ed = "scrollTop", fd = "stop", gd = "getMonth", hd = "setStart", id = "getNumberOfRows", I = "length", jd = "getProperties", J = "prototype", kd = "setValue", ld = "clientWidth", md = "abort", nd = "document", od = "ctrlKey", K = "visualization", pd = "disabled", qd = "offsetLeft", rd = "setView", sd = "setQuery", td = "body", ud = "removeChild", vd = "getDataSourceUrl", wd = "target", L = "call", xd = "removeAll", yd = "lastIndexOf", zd = "draw", Ad = "DataView", Bd = "getRefreshInterval", Cd = "clientHeight", Dd = "charCodeAt", Ed = "getPackages", Fd = "currentStyle", Gd = "substring", Hd = "getQuery", Id = "shiftKey", Jd = "addColumn", Kd = "element", Ld = "getFormattedValue", Md = "parentNode", Nd = "splice", Od = "join", Pd = "toLowerCase", Qd = "setOption", M = "", Rd = "\n", Sd = "\n</script>", Td = " ", Ud = " [", Vd = " does not match type ", Wd = " is duplicate in sortColumns.", Xd = ' name="', Yd = ' type="', Zd = '"', $d = '" />', ae = '" src="http://www.google.com/ig/ifr?url=', be = '""', ce = '">\n', de = "#", ee = "#$1$1$2$2$3$3", fe = "%", ge = "%22", he = "%27", ie = "&", je = "&amp;", ke = "&gt;", le = "&lt;", me = "&quot;", ne = "&requireauth=1&", oe = "&up_", pe = "&up__table_query_url=", qe = "').send(\n     function(response) {\n      new ", re = "']});\n\n   function drawVisualization() {\n    new google.visualization.Query('", se = "(", te = '(\n       document.getElementById(\'visualization\')).\n        draw(response.getDataTable(), null);\n      });\n   }\n\n   google.setOnLoadCallback(drawVisualization);\n  </script>\n </head>\n <body>\n  <div id="visualization" style="width: 500px; height: 500px;"></div>\n </body>\n</html>', ue = "(\\d*)(\\D*)", ve = ")", we = "*", xe = ",", ye = ", ", ze = "-active", Ae = "-bg", Be = "-buttons", Ce = "-caption", De = "-checkbox", Ee = "-checked", Fe = "-content", Ge = "-default", He = "-disabled", Ie = "-dropdown", Je = "-focused", Ke = "-highlight", Le = "-horizontal", Me = "-hover", Ne = "-inner-box", Oe = "-moz-transform", Pe = "-ms-transform", Qe = "-o-transform", Re = "-open", Se = "-outer-box", Te = "-rtl", Ue = "-selected", Ve = "-title", We = "-title-close", Xe = "-title-draggable", Ye = "-title-text", Ze = "-vertical", af = "-webkit-transform", bf = ".", cf = "..", df = "./", ef = ".format", ff = "/", gf = "/.", hf = "//", jf = "//ajax.googleapis.com/ajax", kf = "/chart.html", lf = "/chart.js", mf = "/gviz/tq", nf = "/static/modules/gviz/", of = "/tq", pf = "/util/toolbar.css", qf = "0", rf = "0.5", sf = "0.6", tf = "00", uf = "000", vf = "1", wf = "1.0", xf = "1.9", yf = "525", zf = "528", Af = "533.17.9", Bf = "7", Cf = "8", Df = ":", Ef = ";", Ff = ";sig:", Gf = ";type:", Hf = "<", If = '<html>\n <head>\n  <title>Google Visualization API</title>\n  <script type="text/javascript" src="http://www.google.com/jsapi"></script>\n  <script type="text/javascript">\n   google.load(\'visualization\', \'1\', {packages: [\'', Jf = '<iframe style="', Kf = '<script type="text/javascript" src="', Lf = "=", Mf = ">", Nf = "?", Of = "@", Pf = "A", Qf = "APPLET", Rf = "AREA", Sf = "Add to iGoogle", Tf = "BASE", Uf = "BODY", Vf = "BR", Wf = "BUTTON", Xf = "BarChart", Yf = "BubbleChart", Zf = "COL", $f = "COMMAND", ag = "CSS1Compat", bg = "Chart options", cg = "Column index ", dg = "Component already rendered", eg = "Content-Type", fg = "Copy-Paste this code to an HTML page", gg = "Dashboard", hg = "Date(", ig = "EMBED", jg = "End", kg = "EndToEnd", lg = "Export data as CSV", mg = "Export data as HTML", ng = "FRAME", og = "GET", pg = "Google Visualization", qg = "Google_Visualization", rg = "HR", sg = "HTML", tg = "IFRAME", ug = "IMG", vg = "INPUT", wg = "ISINDEX", xg = "Invalid DataView column type.", yg = "Invalid listener argument", zg = "JavaScript", Ag = "Javascript code", Bg = "KEYGEN", Cg = "LINK", Dg = "META", Eg = "MSXML2.XMLHTTP", Fg = "MSXML2.XMLHTTP.3.0", Gg = "MSXML2.XMLHTTP.6.0", Hg = "Microsoft.XMLHTTP", Ig = "MozOpacity", Jg = "NOFRAMES", Kg = "NOSCRIPT", Lg = "Name", Mg = "Not a valid 2D array.", Ng = "OBJECT", Og = "PARAM", Pg = "POST", Qg = "Publish to web page", Rg = "Request timed out", Sg = "SCRIPT", Tg = "SELECT", Ug = "SOURCE", Vg = "STYLE", Wg = "ScatterChart", Xg = "Start", Yg = "StartToEnd", Zg = "StartToStart", $g = "Style", ah = "TEXTAREA", bh = "TR", ch = "TRACK", dh = "Timed out after ", eh = "To", fh = "Type", gh = "Type mismatch. Value ", hh = "Unable to set parent component", ih = "WBR", jh = "Width", kh = "[", lh = "[object Array]", mh = "[object Function]", nh = "[object Window]", oh = "\\\\", ph = "\\c", qh = "\\s", rh = "\\u", sh = "]", th = "_", uh = "_table_query_refresh_interval", vh = "_table_query_url", wh = "abort", xh = "absolute", yh = "action", zh = "activate", Ah = "activedescendant", Bh = "addTrendLine", Ch = "afterhide", Dh = "aftershow", Eh = "alpha(opacity=", Fh = "application/x-www-form-urlencoded;charset=utf-8", Gh = "aria-", Hh = "array", Ih = "auto", Jh = "beforedrag", Kh = "beforehide", Lh = "beforeshow", Mh = "block", Nh = "blur", Oh = "body", Ph = "boolean", Qh = "border-box", Rh = "border:0;vertical-align:bottom;", Sh = "borderBottom", Th = "borderBottomWidth", Uh = "borderLeft", Vh = "borderLeftWidth", Wh = "borderRight", Xh = "borderRightWidth", Yh = "borderTop", Zh = "borderTopWidth", $h = "br", ai = "button", bi = "call", ci = "callee", di = "change", ei = "character", fi = "chart", gi = "check", hi = "checked", ii = "class", ji = "click", ki = "close", li = "column", mi = "columnFilters[", ni = "complete", oi = "contextmenu", pi = "control", qi = "controls", ri = "corechart", si = "csv", ti = "dashboard", ui = "data-", vi = "date", wi = "datetime", xi = "dblclick", yi = "deactivate", zi = "desc", Ai = "detailed_message", Bi = "dialogselect", Ci = "direction", Di = "disable", Ei = "disabled", Fi = "display", Gi = "display: none; padding-top: 2px", Hi = "div", Ii = "domainAxis", Ji = "drag", Ki = "dragstart", Li = "draw", Mi = "earlycancel", Ni = "emptyString", Oi = "enable", Pi = "end", Qi = "enter", Ri = "error", Si = "expanded", Ti = "false", Ui = "filter", Vi = "fixed", Wi = "focus", Xi = "focusin", Yi = "focusout", Zi = "for", $i = "full", aj = "function", bj = "g", cj = "gadgets.io.makeRequest", dj = "gadgets.io.makeRequest failed", ej = "getColumnIndex", fj = "getColumnLabel", gj = "getColumnPattern", hj = "getColumnProperties", ij = "getColumnProperty", jj = "getColumnRange", kj = "getContainerId", lj = "getDataSourceUrl", mj = "getDataTable", nj = "getDistinctValues", oj = "getFilteredRows", pj = "getFormattedValue", qj = "getNumberOfColumns", rj = "getNumberOfRows", sj = "getPackages", tj = "getQuery", uj = "getRefreshInterval", vj = "getRowProperties", wj = "getRowProperty", xj = "getSnapshot", yj = "getTableProperties", zj = "getTableProperty", Aj = "goog-button", Bj = "goog-container", Cj = "goog-control", Dj = "goog-custom-button", Ej = "goog-inline-block ", Fj = "goog-menu", Gj = "goog-menu-button", Hj = "goog-menuheader", Ij = "goog-menuitem", Jj = "goog-menuitem-accel", Kj = "goog-menuitem-mnemonic-separator", Lj = "goog-menuseparator", Mj = "goog-modalpopup", Nj = "goog-option", Oj = "goog-option-selected", Pj = "google-visualization-toolbar-big-dialog", Qj = "google-visualization-toolbar-export-data", Rj = "google-visualization-toolbar-export-igoogle", Sj = "google-visualization-toolbar-html-code", Tj = "google-visualization-toolbar-html-code-explanation", Uj = "google-visualization-toolbar-small-dialog", Vj = "google-visualization-toolbar-triangle", Wj = "google.loader.GoogleApisBase", Xj = "google.visualization.", Yj = "google.visualization.Query", Zj = "google.visualization.Version", $j = "hasLabelsColumn", ak = "haspopup", ck = "head", dk = "hex", ek = "hidden", fk = "hide", gk = "highlight", hk = "horizontal", ik = "html", jk = "htmlcode", kk = "http", lk = "http%", mk = "http://dummy.com", nk = "http://www.google.com/ig/adde?moduleurl=", ok = "https", pk = "https%", qk = "identity", rk = "iframe", sk = "igoogle", tk = "img", uk = "inline", vk = "innerText", wk = "input", xk = "invalid_query", yk = 'javascript:""', zk = "jscode", Ak = "json", Bk = "key", Ck = "keydown", Dk = "keypress", Ek = "keyup", Fk = "labelledby", Gk = "leave", Hk = "left", Ik = "link", Jk = "listbox", Kk = "losecapture", Lk = "makeRequest", Mk = "make_request_failed", Nk = "maxValue", Ok = "medium", Pk = "menu", Qk = "menuitem", Rk = "message", Sk = "minValue", Tk = "modal-dialog", Uk = "modifier", Vk = "mousedown", Wk = "mousemove", Xk = "mouseout", Yk = "mouseover", Zk = "mouseup", $k = "ms, aborting", al = "named", bl = "native code", cl = "new ", dl = "nodeType", el = "none", fl = "not_modified", gl = "null", hl = "number", il = "o", jl = "object", kl = "on", ll = "opacity", ml = "open", nl = "option", ol = "options", pl = "out:csv;", ql = "out:html;", rl = "outerHTML", sl = "overflow", tl = "package", ul = "padding: 2px", vl = "paddingBottom", wl = "paddingLeft", xl = "paddingRight", yl = "paddingTop", zl = "percent", Al = "pixelLeft", Bl = "position", Cl = "position:fixed;width:0;height:0;left:0;top:0;", Dl = "pre", El = "pressed", Fl = "pub", Gl = "px", Hl = "range", Il = "ready", Jl = "readystatechange", Kl = "reason", Ll = "refresh", Ml = "relative", Nl = "reqId:", Ol = "resize", Pl = "rgb", Ql = "right", Rl = "role", Sl = "rtl", Tl = "script", Ul = "scroll", Vl = "select", Wl = "selected", Xl = "separator", Yl = "series.1.lineWidth", Zl = "series.1.pointSize", $l = "series.1.visibleInLegend", am = "setContainerId", bm = "setDataSourceUrl", cm = "setDataTable", dm = "setOptions", em = "setPackages", fm = "setQuery", gm = "setRefreshInterval", hm = "show", im = "sig:", jm = "solid", km = "sortColumns", lm = "sortColumns[", mm = "span", nm = "splice", om = "start", pm = "statechange", qm = "static", rm = "string", sm = "stringify", tm = "style", um = "stylesheet", vm = "success", wm = "tabIndex", xm = "tabindex", ym = "targetAxes.0", zm = "targetAxes.1", Am = "targetAxis", Bm = "text/css", Cm = "text/javascript", Dm = "textContent", Em = "tick", Fm = "timeofday", Gm = "timeout", Hm = "toJSON", Im = "touchcancel", Jm = "touchend", Km = "touchmove", Lm = "touchstart", Mm = "tqrt", Nm = "tqx", Om = "transform", Pm = "transparent", Qm = "true", Rm = "type", Sm = "uncheck", Tm = "unhighlight", Um = "unselect", Vm = "unselectable", Wm = "user_not_authenticated", Xm = "vAxis", Ym = "value", Zm = "var ", $m = "var _et_ = 1;", an = "vertical", bn = "visible", cn = "visualization", dn = "warning", en = "width: 700px; height: 500px;", fn = "window.event", gn = "withCredentials", hn = "xhr", jn = "xhrpost", kn = "zx", ln = "{", mn = "}", nn = "\xa0", on = "\xd7", pn = "\u25bc", N, qn = qn || {}, P = this, En = "closure_uid_" + r[ab](2147483648 * r.random())[Nb](36), Fn = 0, Kn = Date.now || function() {
return +new Date();
}, Mn = l;
Qn[J].al = function(a) {
var b = [];
return this.tf(a, b), b[Od](M);
}, Qn[J].tf = function(a, b) {
switch (typeof a) {
case rm:
this.oh(a, b);
break;

case hl:
this.xk(a, b);
break;

case Ph:
b[C](a);
break;

case "undefined":
b[C](gl);
break;

case jl:
if (a == l) {
b[C](gl);
break;
}
if (wn(a)) {
this.wk(a, b);
break;
}
this.yk(a, b);
break;

case aj:
break;

default:
d(s("Unknown type: " + typeof a));
}
};
var Rn = {
'"':'\\"',
"\\":oh,
"/":"\\/",
"\b":"\\b",
"\f":"\\f",
"\n":"\\n",
"\r":"\\r",
"	":"\\t",
"":"\\u000b"
}, Sn = /\uffff/[Cc]("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g :/[\\\"\x00-\x1f\x7f-\xff]/g;
Qn[J].oh = function(a, b) {
b[C](Zd, a[v](Sn, function(a) {
if (a in Rn) return Rn[a];
var b = a[Dd](0), f = rh;
return 16 > b ? f += uf :256 > b ? f += tf :4096 > b && (f += qf), Rn[a] = f + b[Nb](16);
}), Zd);
}, Qn[J].xk = function(a, b) {
b[C](isFinite(a) && !ja(a) ? a :gl);
}, Qn[J].wk = function(a, b) {
var c = a[I];
b[C](kh);
for (var e = M, f = 0; c > f; f++) b[C](e), e = a[f], this.tf(this.Sd ? this.Sd[L](a, oa(f), e) :e, b), 
e = xe;
b[C](sh);
}, Qn[J].yk = function(a, b) {
b[C](ln);
var e, c = M;
for (e in a) if (fa[J][cc][L](a, e)) {
var f = a[e];
typeof f != aj && (b[C](c), this.oh(e, b), b[C](Df), this.tf(this.Sd ? this.Sd[L](a, e, f) :f, b), 
c = xe);
}
b[C](mn);
};
var co = /&/g, eo = /</g, fo = />/g, go = /\"/g, ho = /[&<>\"]/, jo = ka[J], ko = jo[D] ? function(a, b, c) {
return jo[D][L](a, b, c);
} :function(a, b, c) {
if (c = c == l ? 0 :0 > c ? r.max(0, a[I] + c) :c, Q(a)) return Q(b) && 1 == b[I] ? a[D](b, c) :-1;
for (;c < a[I]; c++) if (c in a && a[c] === b) return c;
return -1;
}, lo = jo[yb] ? function(a, b, c) {
jo[yb][L](a, b, c);
} :function(a, b, c) {
for (var e = a[I], f = Q(a) ? a[Vb](M) :a, h = 0; e > h; h++) h in f && b[L](c, f[h], h, a);
}, mo = jo.filter ? function(a, b, c) {
return jo.filter[L](a, b, c);
} :function(a, b, c) {
for (var e = a[I], f = [], h = 0, k = Q(a) ? a[Vb](M) :a, n = 0; e > n; n++) if (n in k) {
var t = k[n];
b[L](c, t, n, a) && (f[h++] = t);
}
return f;
}, no = jo.map ? function(a, b, c) {
return jo.map[L](a, b, c);
} :function(a, b, c) {
for (var e = a[I], f = ka(e), h = Q(a) ? a[Vb](M) :a, k = 0; e > k; k++) k in h && (f[k] = b[L](c, h[k], k, a));
return f;
}, oo = jo.every ? function(a, b, c) {
return jo.every[L](a, b, c);
} :function(a, b, c) {
for (var e = a[I], f = Q(a) ? a[Vb](M) :a, h = 0; e > h; h++) if (h in f && !b[L](c, f[h], h, a)) return m;
return j;
};
Aa(yo[J], function() {
return new yo(this.x, this.y);
}), Aa(Ao[J], function() {
return new Ao(this[u], this[B]);
}), Ao[J].floor = function() {
return ra(this, r[ab](this[u])), Da(this, r[ab](this[B])), this;
}, Ao[J].round = function() {
return ra(this, r.round(this[u])), Da(this, r.round(this[B])), this;
};
var Bo, Co, Do, Eo, Fo;
Eo = Do = Co = Bo = m;
var Io;
if (Io = Go()) {
var Jo = Ho();
Bo = 0 == Io[D]("Opera"), Co = !Bo && -1 != Io[D]("MSIE"), (Do = !Bo && -1 != Io[D]("WebKit")) && Io[D]("Mobile"), 
Eo = !Bo && !Do && "Gecko" == Jo.product;
}
var Ko = Bo, S = Co, Lo = Eo, Mo = Do, No = Ho(), Oo = No && No.platform || M;
Fo = -1 != Oo[D]("Mac"), Oo[D]("Win"), Oo[D]("Linux");
var Po = !!Ho() && -1 != (Ho().appVersion || M)[D]("X11"), Ro;
a:{
var So = M, To;
if (Ko && P.opera) var Uo = P.opera.version, So = typeof Uo == aj ? Uo() :Uo; else if (Lo ? To = /rv\:([^\);]+)(\)|;)/ :S ? To = /MSIE\s+([^\);]+)(\)|;)/ :Mo && (To = /WebKit\/(\S+)/), 
To) var Vo = To.exec(Go()), So = Vo ? Vo[1] :M;
if (S) {
var Wo = Qo();
if (Wo > na(So)) {
Ro = oa(Wo);
break a;
}
}
Ro = So;
}
var Xo = Ro, Yo = {}, bp = P[nd], ap = bp && S ? Qo() || (bp.compatMode == ag ? ma(Xo, 10) :5) :g, cp = qa("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"), ep = Mo, hp = /#|$/, ip = /\/spreadsheet/, jp = /\/(ccc|tq|pub)$/, kp = /^spreadsheets?[0-9]?\.google\.com$/, lp = /^docs\.google\.com*$/, mp = /^(trix|spreadsheets|docs|webdrive)-[a-z]+\.corp\.google\.com/, np = /^(\w*\.){1,2}corp\.google\.com$/, op = /\/spreadsheets(\/d\/[^/]+)?/, pp = /\/(edit|gviz\/tq|)$/, qp = /^docs\.google\.com*$/, rp = /^docs\.sandbox\.google\.com*$/, sp = /^(\w*\.){1,2}corp\.google\.com$/, tp = /^\/a\/(\w+\.)+\w+/, up = /^(\/a\/(\w+\.)+\w+)?/, Dp = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), Fp, Gp = !S || $o(9);
!Lo && !S || S && $o(9) || Lo && Zo("1.9.1");
var Hp = S && !Zo("9"), Qp = {
cellpadding:"cellPadding",
cellspacing:"cellSpacing",
colspan:"colSpan",
frameborder:"frameBorder",
height:"height",
maxlength:"maxLength",
role:Rl,
rowspan:"rowSpan",
type:Rm,
usemap:"useMap",
valign:"vAlign",
width:"width"
}, dq = {
SCRIPT:1,
STYLE:1,
HEAD:1,
IFRAME:1,
OBJECT:1
}, eq = {
IMG:Td,
BR:Rd
};
N = Mp[J], N.r = Lp, N.a = function(a) {
return Q(a) ? this.m[Gc](a) :a;
}, N.setProperties = Pp, N.Yj = function(a) {
return a = a || this.ad(), Rp(a || ea);
}, N.d = function() {
return Vp(this.m, arguments);
}, N.createElement = function(a) {
return this.m[ub](a);
}, N.createTextNode = function(a) {
return this.m[eb](a);
}, N.Xe = function() {
return Sp(this.m);
}, N.ad = function() {
return this.m.parentWindow || this.m[Xc];
}, N.Wj = function() {
return !Mo && Sp(this.m) ? this.m[Mb] :this.m[td];
}, N.Tb = function() {
var a = this.m, b = !Mo && Sp(a) ? a[Mb] :a[td], a = a.parentWindow || a[Xc];
return new yo(a.pageXOffset || b[mc], a.pageYOffset || b[ed]);
}, N.appendChild = function(a, b) {
a[Va](b);
}, N.qg = Zp, N.qe = $p, N.removeNode = aq, N.contains = bq;
var jq = "StopIteration" in P ? P.StopIteration :s("StopIteration");
za(kq[J], function() {
d(jq);
}), kq[J].Jh = function() {
return this;
}, N = nq[J], N.l = 0, N.zb = 0, N.Pa = function() {
this.Dd();
for (var a = [], b = 0; b < this.C[I]; b++) a[C](this.oa[this.C[b]]);
return a;
}, N.Lb = function() {
return this.Dd(), this.C[cb]();
}, N.Xb = function(a) {
return oq(this.oa, a);
}, N.clear = function() {
this.oa = {}, Qa(this.C, 0), this.zb = this.l = 0;
}, N.remove = function(a) {
return oq(this.oa, a) ? (delete this.oa[a], this.l--, this.zb++, this.C[I] > 2 * this.l && this.Dd(), 
j) :m;
}, N.Dd = function() {
if (this.l != this.C[I]) {
for (var a = 0, b = 0; a < this.C[I]; ) {
var c = this.C[a];
oq(this.oa, c) && (this.C[b++] = c), a++;
}
Qa(this.C, b);
}
if (this.l != this.C[I]) {
for (var e = {}, b = a = 0; a < this.C[I]; ) c = this.C[a], oq(e, c) || (this.C[b++] = c, 
e[c] = 1), a++;
Qa(this.C, b);
}
}, N.get = function(a, b) {
return oq(this.oa, a) ? this.oa[a] :b;
}, N.set = function(a, b) {
oq(this.oa, a) || (this.l++, this.C[C](a), this.zb++), this.oa[a] = b;
}, N.Tj = function(a) {
var b;
a instanceof nq ? (b = a.Lb(), a = a.Pa()) :(b = yp(a), a = xp(a));
for (var c = 0; c < b[I]; c++) this.set(b[c], a[c]);
}, Aa(N, function() {
return new nq(this);
}), N.Jh = function(a) {
this.Dd();
var b = 0, c = this.C, e = this.oa, f = this.zb, h = this, k = new kq();
return za(k, function() {
for (;;) {
f != h.zb && d(s("The map has changed since the iterator was created")), b >= c[I] && d(jq);
var k = c[b++];
return a ? k :e[k];
}
}), k;
}, pq[J].nc = m, pq[J].V = function() {
this.nc || (this.nc = j, this.j());
}, pq[J].j = function() {
if (this.Lk && qq[rc](l, this.Lk), this.Ih) for (;this.Ih[I]; ) this.Ih.shift()();
}, sq[Td] = sn;
var tq = !S || $o(9), uq = !S || $o(9), vq = S && !Zo("9");
!Mo || Zo(zf), Lo && Zo("1.9b") || S && Zo(Cf) || Ko && Zo("9.5") || Mo && Zo(zf), 
Lo && !Zo(Cf) || S && Zo("9"), N = wq[J], N.j = function() {}, N.V = function() {}, 
N.Kb = m, N.defaultPrevented = m, N.Id = j, N.stopPropagation = function() {
this.Kb = j;
}, N.preventDefault = function() {
this.defaultPrevented = j, this.Id = m;
}, R(yq, wq);
var zq = [ 1, 4, 2 ];
N = yq[J], Ua(N, l), N.relatedTarget = l, N.offsetX = 0, N.offsetY = 0, Ma(N, 0), 
Na(N, 0), sa(N, 0), ta(N, 0), N.button = 0, ua(N, 0), N.charCode = 0, N.ctrlKey = m, 
ya(N, m), N.shiftKey = m, N.metaKey = m, N.Ve = m, N.U = l, N.Jb = function(a, b) {
var c = Ia(this, a[F]);
wq[L](this, c), Ua(this, a[wd] || a.srcElement), Ga(this, b);
var e = a[Ya];
if (e) {
if (Lo) {
var f;
a:{
try {
sq(e[Oc]), f = j;
break a;
} catch (h) {}
f = m;
}
f || (e = l);
}
} else c == Yk ? e = a.fromElement :c == Xk && (e = a.toElement);
this.relatedTarget = e, this.offsetX = Mo || a.offsetX !== g ? a.offsetX :a.layerX, 
this.offsetY = Mo || a.offsetY !== g ? a.offsetY :a.layerY, Ma(this, a[bd] !== g ? a[bd] :a.pageX), 
Na(this, a[cd] !== g ? a[cd] :a.pageY), sa(this, a[mb] || 0), ta(this, a[nb] || 0), 
this.button = a.button, ua(this, a[x] || 0), this.charCode = a[sb] || (c == Dk ? a[x] :0), 
this.ctrlKey = a[od], ya(this, a[Ob]), this.shiftKey = a[Id], this.metaKey = a[Lc], 
this.Ve = Fo ? a[Lc] :a[od], this.state = a.state, this.U = a, a.defaultPrevented && this[gb](), 
delete this.Kb;
}, N.Wk = function(a) {
return tq ? this.U.button == a :this[F] == ji ? 0 == a :!!(this.U.button & zq[a]);
}, N.ke = function() {
return this.Wk(0) && !(Mo && Fo && this[od]);
}, N.stopPropagation = function() {
yq.b[Zb][L](this), this.U[Zb] ? this.U[Zb]() :this.U.cancelBubble = j;
}, N.preventDefault = function() {
yq.b[gb][L](this);
var a = this.U;
if (a[gb]) a[gb](); else if (a.returnValue = m, vq) try {
(a[od] || 112 <= a[x] && 123 >= a[x]) && ua(a, -1);
} catch (b) {}
}, N.pj = function() {
return this.U;
}, N.j = function() {};
var Bq = 0;
N = Aq[J], N.key = 0, N.Bb = m, N.mf = m, N.Jb = function(a, b, c, e, f, h) {
Cn(a) ? this.gh = j :a && a[Cb] && Cn(a[Cb]) ? this.gh = m :d(s(yg)), this.$b = a, 
this.Ng = b, this.src = c, Ia(this, e), this.capture = !!f, this.wd = h, this.mf = m, 
this.key = ++Bq, this.Bb = m;
}, va(N, function(a) {
return this.gh ? this.$b[L](this.wd || this.src, a) :this.$b[Cb][L](this.$b, a);
});
var Cq = {}, Dq = {}, Eq = {}, Fq = {};
R(Rq, pq), N = Rq[J], N.Gg = j, N.ld = l, N.Pe = function(a) {
this.ld = a;
}, N.addEventListener = function(a, b, c, e) {
Gq(this, a, b, c, e);
}, N.removeEventListener = function(a, b, c, e) {
Jq(this, a, b, c, e);
}, N.dispatchEvent = function(a) {
return Qq(this, a);
}, N.j = function() {
Rq.b.j[L](this), Nq(this), this.ld = l;
}, R(Sq, Rq), Sq[J].enabled = m;
var Tq = P.window;
N = Sq[J], N.aa = l, N.hk = function() {
if (this.enabled) {
var a = Kn() - this.gf;
a > 0 && a < .8 * this.Jd ? this.aa = this.Fc[Tb](this.ff, this.Jd - a) :(this.Uj(), 
this.enabled && (this.aa = this.Fc[Tb](this.ff, this.Jd), this.gf = Kn()));
}
}, N.Uj = function() {
this[w](Em);
}, N.start = function() {
this.enabled = j, this.aa || (this.aa = this.Fc[Tb](this.ff, this.Jd), this.gf = Kn());
}, N.stop = function() {
this.enabled = m, this.aa && (this.Fc[Za](this.aa), this.aa = l);
}, N.j = function() {
Sq.b.j[L](this), this[fd](), delete this.Fc;
}, Uq[J].Hh = l, Uq[J].getOptions = function() {
return this.Hh || (this.Hh = this.Nk());
};
var Vq;
R(Wq, Uq), Wq[J].Ch = function() {
var a = this.Lh();
return a ? new ActiveXObject(a) :new XMLHttpRequest();
}, Wq[J].Nk = function() {
var a = {};
return this.Lh() && (a[0] = j, a[1] = j), a;
}, Wq[J].Lh = function() {
if (!this.Nh && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
for (var a = [ Gg, Fg, Eg, Hg ], b = 0; b < a[I]; b++) {
var c = a[b];
try {
return new ActiveXObject(c), this.Nh = c;
} catch (e) {}
}
d(s("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed"));
}
return this.Nh;
}, Vq = new Wq(), R(Xq, Rq);
var Yq = /^https?$/i, Zq = [];
N = Xq[J], N.Va = m, N.s = l, N.td = l, N.Ie = M, N.xb = M, N.He = m, N.md = m, 
N.Ce = m, N.wb = m, N.Fe = 0, N.Ib = l, N.og = M, N.pg = m, N.Mj = function(a) {
this.pg = a;
}, N.send = function(a, b, c, e) {
this.s && d(s("[goog.net.XhrIo] Object is active with another request=" + this.Ie + "; newUri=" + a)), 
b = b ? b.toUpperCase() :og, this.Ie = a, this.xb = M, this.He = m, this.Va = j, 
this.s = this.zi(), this.td = this.xd ? this.xd[Hc]() :Vq[Hc](), this.s.onreadystatechange = In(this.ag, this);
try {
this.Ce = j, this.s[Bc](b, a, j), this.Ce = m;
} catch (f) {
return this.ng(5, f), void 0;
}
a = c || M;
var h = this.headers[dc]();
e && mq(e, function(a, b) {
h.set(b, a);
}), e = P.FormData && a instanceof P.FormData, b == Pg && !h.Xb(eg) && !e && h.set(eg, Fh), 
mq(h, function(a, b) {
this.s.setRequestHeader(b, a);
}, this), this.og && (this.s.responseType = this.og), gn in this.s && (this.s.withCredentials = this.pg);
try {
this.Ib && (Tq[Za](this.Ib), this.Ib = l), 0 < this.Fe && (this.Ib = Tq[Tb](In(this.Ai, this), this.Fe)), 
this.md = j, this.s[qb](a), this.md = m;
} catch (k) {
this.ng(5, k);
}
}, N.zi = function() {
return this.xd ? this.xd.Ch() :Vq.Ch();
}, N.Ai = function() {
"undefined" != typeof qn && this.s && (this.xb = dh + this.Fe + $k, this[w](Gm), 
this[md](8));
}, N.ng = function(a, b) {
this.Va = m, this.s && (this.wb = j, this.s[md](), this.wb = m), this.xb = b, this.ug(), 
this.fd();
}, N.ug = function() {
this.He || (this.He = j, this[w](ni), this[w](Ri));
}, N.abort = function() {
this.s && this.Va && (this.Va = m, this.wb = j, this.s[md](), this.wb = m, this[w](ni), 
this[w](wh), this.fd());
}, N.j = function() {
this.s && (this.Va && (this.Va = m, this.wb = j, this.s[md](), this.wb = m), this.fd(j)), 
Xq.b.j[L](this);
}, N.ag = function() {
this.Ce || this.md || this.wb ? this.lh() :this.ek();
}, N.ek = function() {
this.lh();
}, N.lh = function() {
if (this.Va && "undefined" != typeof qn && (!this.td[1] || 4 != this.Nc() || 2 != this.Ye())) if (this.md && 4 == this.Nc()) Tq[Tb](In(this.ag, this), 0); else if (this[w](Jl), 
this.tj()) {
this.Va = m;
try {
this.Lg() ? (this[w](ni), this[w](vm)) :(this.xb = this.rj() + Ud + this.Ye() + sh, 
this.ug());
} finally {
this.fd();
}
}
}, N.fd = function(a) {
if (this.s) {
var b = this.s, c = this.td[0] ? sn :l;
this.td = this.s = l, this.Ib && (Tq[Za](this.Ib), this.Ib = l), a || this[w](Il);
try {
b.onreadystatechange = c;
} catch (e) {}
}
}, N.wa = function() {
return !!this.s;
}, N.tj = function() {
return 4 == this.Nc();
}, N.Lg = function() {
var b, a = this.Ye();
a:switch (a) {
case 200:
case 201:
case 202:
case 204:
case 206:
case 304:
case 1223:
b = j;
break a;

default:
b = m;
}
return b || 0 === a && !this.Hk();
}, N.Hk = function() {
var a = dp(oa(this.Ie))[1] || l;
return !a && self[ac] && (a = self[ac].protocol, a = a.substr(0, a[I] - 1)), Yq[Cc](a ? a[Pd]() :M);
}, N.Nc = function() {
return this.s ? this.s.readyState :0;
}, N.Ye = function() {
try {
return 2 < this.Nc() ? this.s.status :-1;
} catch (a) {
return -1;
}
}, N.rj = function() {
try {
return 2 < this.Nc() ? this.s.statusText :M;
} catch (a) {
return M;
}
}, N.jk = function() {
try {
return this.s ? this.s.responseText :M;
} catch (a) {
return M;
}
}, N.nh = function() {
return Q(this.xb) ? this.xb :oa(this.xb);
}, N = ar[J], N.ab = M, N.Bc = M, N.zc = M, N.$a = l, N.Ia = M, N.Ac = M, N.Xk = m, 
N.da = m, N.toString = function() {
var a = [], b = this.ab;
if (b && a[C](cr(b, dr), Df), b = this.zc) {
a[C](hf);
var c = this.Bc;
c && a[C](cr(c, dr), Of), a[C](ca(oa(b))), b = this.$a, b != l && a[C](Df, oa(b));
}
return (b = this.Ia) && (this.Ee() && b[db](0) != ff && a[C](ff), a[C](cr(b, b[db](0) == ff ? er :fr))), 
(b = this.Vg()) && a[C](Nf, b), (b = this.Ac) && a[C](de, cr(b, gr)), a[Od](M);
}, N.Kj = function(a) {
var b = this[dc](), c = a.Gi();
c ? b.Ec(a.ab) :c = a.Hi(), c ? b.ye(a.Bc) :c = a.Ee(), c ? b.we(a.zc) :c = a.Ei();
var e = a.Ia;
if (c) b.Dc(a.$a); else if (c = a.rg()) {
if (e[db](0) != ff) if (this.Ee() && !this.rg()) e = ff + e; else {
var f = b.Ia[yd](ff);
-1 != f && (e = b.Ia.substr(0, f + 1) + e);
}
if (f = e, f == cf || f == bf) e = M; else if (-1 == f[D](df) && -1 == f[D](gf)) e = f; else {
for (var e = 0 == f[yd](ff, 0), f = f[Vb](ff), h = [], k = 0; k < f[I]; ) {
var n = f[k++];
n == bf ? e && k == f[I] && h[C](M) :n == cf ? ((1 < h[I] || 1 == h[I] && h[0] != M) && h.pop(), 
e && k == f[I] && h[C](M)) :(h[C](n), e = j);
}
e = h[Od](ff);
}
}
return c ? b.Cc(e) :c = a.Fi(), c ? b.ud(a.Ci()) :c = a.Di(), c && b.xe(a.Ac), b;
}, Aa(N, function() {
return new ar(this);
}), N.Ec = function(a, b) {
return this.Oa(), (this.ab = b ? a ? pa(a) :M :a) && (this.ab = this.ab[v](/:$/, M)), 
this;
}, N.Gi = function() {
return !!this.ab;
}, N.ye = function(a, b) {
return this.Oa(), this.Bc = b ? a ? pa(a) :M :a, this;
}, N.Hi = function() {
return !!this.Bc;
}, N.we = function(a, b) {
return this.Oa(), this.zc = b ? a ? pa(a) :M :a, this;
}, N.Ee = function() {
return !!this.zc;
}, N.Dc = function(a) {
return this.Oa(), a ? (a = la(a), (ja(a) || 0 > a) && d(s("Bad port number " + a)), 
this.$a = a) :this.$a = l, this;
}, N.Ei = function() {
return this.$a != l;
}, N.Cc = function(a, b) {
return this.Oa(), this.Ia = b ? a ? pa(a) :M :a, this;
}, N.rg = function() {
return !!this.Ia;
}, N.Fi = function() {
return this.ga[Nb]() !== M;
}, N.ud = function(a, b) {
return this.Oa(), a instanceof br ? (this.ga = a, this.ga.kf(this.da)) :(b || (a = cr(a, hr)), 
this.ga = new br(a, l, this.da)), this;
}, N.setQuery = function(a, b) {
return this.ud(a, b);
}, N.Vg = function() {
return this.ga[Nb]();
}, N.Ci = function() {
return this.ga.uk();
}, N.getQuery = function() {
return this.Vg();
}, N.nd = function(a, b) {
return this.Oa(), this.ga.set(a, b), this;
}, N.kh = function(a) {
return this.ga.get(a);
}, N.xe = function(a, b) {
return this.Oa(), this.Ac = b ? a ? pa(a) :M :a, this;
}, N.Di = function() {
return !!this.Ac;
}, N.Pj = function() {
return this.Oa(), this.nd(kn, r[ab](2147483648 * r.random())[Nb](36) + r.abs(r[ab](2147483648 * r.random()) ^ Kn())[Nb](36)), 
this;
}, N.Oa = function() {
this.Xk && d(s("Tried to modify a read-only Uri"));
}, N.kf = function(a) {
return this.da = a, this.ga && this.ga.kf(a), this;
};
var dr = /[#\/\?@]/g, fr = /[\#\?:]/g, er = /[\#\?]/g, hr = /[\#\?@]/g, gr = /#/g;
N = br[J], N.Cb = function() {
if (!this.B && (this.B = new nq(), this.l = 0, this.eb)) for (var a = this.eb[Vb](ie), b = 0; b < a[I]; b++) {
var c = a[b][D](Lf), e = l, f = l;
c >= 0 ? (e = a[b][Gd](0, c), f = a[b][Gd](c + 1)) :e = a[b], e = pa(e[v](/\+/g, Td)), 
e = this.Hb(e), this.add(e, f ? pa(f[v](/\+/g, Td)) :M);
}
}, N.B = l, N.l = l, N.add = function(a, b) {
this.Cb(), this.fc(), a = this.Hb(a);
var c = this.B.get(a);
return c || this.B.set(a, c = []), c[C](b), this.l++, this;
}, N.remove = function(a) {
return this.Cb(), a = this.Hb(a), this.B.Xb(a) ? (this.fc(), this.l -= this.B.get(a)[I], 
this.B.remove(a)) :m;
}, N.clear = function() {
this.fc(), this.B = l, this.l = 0;
}, N.Xb = function(a) {
return this.Cb(), a = this.Hb(a), this.B.Xb(a);
}, N.Lb = function() {
this.Cb();
for (var a = this.B.Pa(), b = this.B.Lb(), c = [], e = 0; e < b[I]; e++) for (var f = a[e], h = 0; h < f[I]; h++) c[C](b[e]);
return c;
}, N.Pa = function(a) {
this.Cb();
var b = [];
if (a) this.Xb(a) && (b = ro(b, this.B.get(this.Hb(a)))); else {
a = this.B.Pa();
for (var c = 0; c < a[I]; c++) b = ro(b, a[c]);
}
return b;
}, N.set = function(a, b) {
return this.Cb(), this.fc(), a = this.Hb(a), this.Xb(a) && (this.l -= this.B.get(a)[I]), 
this.B.set(a, [ b ]), this.l++, this;
}, N.get = function(a, b) {
var c = a ? this.Pa(a) :[];
return 0 < c[I] ? oa(c[0]) :b;
}, N.Fj = function(a, b) {
this.remove(a), 0 < b[I] && (this.fc(), this.B.set(this.Hb(a), so(b)), this.l += b[I]);
}, N.toString = function() {
if (this.eb) return this.eb;
if (!this.B) return M;
for (var a = [], b = this.B.Lb(), c = 0; c < b[I]; c++) for (var e = b[c], f = ca(oa(e)), e = this.Pa(e), h = 0; h < e[I]; h++) {
var k = f;
e[h] !== M && (k += Lf + ca(oa(e[h]))), a[C](k);
}
return this.eb = a[Od](ie);
}, N.uk = function() {
return this[Nb]() ? pa(this[Nb]()) :M;
}, N.fc = function() {
this.eb = l;
}, Aa(N, function() {
var a = new br();
return a.eb = this.eb, this.B && (a.B = this.B[dc](), a.l = this.l), a;
}), N.Hb = function(a) {
return a = oa(a), this.da && (a = a[Pd]()), a;
}, N.kf = function(a) {
a && !this.da && (this.Cb(), this.fc(), mq(this.B, function(a, c) {
var e = c[Pd]();
c != e && (this.remove(c), this.Fj(e, a));
}, this)), this.da = a;
}, N.extend = function() {
for (var b = 0; b < arguments[I]; b++) mq(arguments[b], function(a, b) {
this.add(b, a);
}, this);
};
var wr = {
hl:Ph,
ll:hl,
nl:rm,
il:vi,
ol:Fm,
jl:wi
};
N = U[J], N.z = l, N.zb = l, N.D = l, N.Qa = l, N.Aa = l, N.getNumberOfRows = function() {
return this.D[I];
}, N.getNumberOfColumns = function() {
return this.z[I];
}, Aa(N, function() {
return new U(this[Sb]());
}), N.getColumnId = function(a) {
return T(this, a), this.z[a].id || M;
}, N.getColumnIndex = function(a) {
for (var b = this.z, c = 0; c < b[I]; c++) if (b[c].id == a) return c;
return -1;
}, N.getColumnLabel = function(a) {
return T(this, a), this.z[a][vc] || M;
}, N.getColumnPattern = function(a) {
return T(this, a), this.z[a].pattern;
}, N.getColumnRole = function(a) {
return a = this[Wb](a, Rl), a = Q(a) ? a :M;
}, N.getColumnType = function(a) {
return T(this, a), this.z[a][F];
}, Ka(N, function(a, b) {
mr(this, a), T(this, b);
var c = this.Na(a, b), e = l;
return c && (e = c.v, e = vn(e) ? e :l), e;
}), N.Na = function(a, b) {
return this.D[a].c[b];
}, N.qk = function(a, b) {
this.Aa[a] = this.Aa[a] || [];
var c = this.Aa[a], e = c[b] || {};
return c[b] = e;
}, N.Zj = function(a, b) {
var c = this.Aa[a];
c && c[b] && (c[b] = {});
}, N.getFormattedValue = function(a, b) {
mr(this, a), T(this, b);
var c = this.Na(a, b), e = M;
if (c) if ("undefined" != typeof c.f && c.f != l) e = c.f; else if (c = this.qk(a, b), 
vn(c.rh)) e = c.rh; else {
var f = this[H](a, b);
f === l || (e = ur(f, this[wb](b))), c.rh = e;
}
return e;
}, N.getProperty = function(a, b, c) {
return mr(this, a), T(this, b), (a = (a = this.Na(a, b)) && a.p) && c in a ? a[c] :l;
}, N.getProperties = function(a, b) {
mr(this, a), T(this, b);
var c = this.Na(a, b);
return c || (c = {
v:l,
f:l
}, this.D[a].c[b] = c), c.p || (c.p = {}), c.p;
}, N.getTableProperties = function() {
return this.Qa;
}, N.getTableProperty = function(a) {
var b = this.Qa;
return b && a in b ? b[a] :l;
}, N.setTableProperties = function(a) {
this.Qa = a;
}, N.setTableProperty = function(a, b) {
this.Qa || (this.Qa = {}), this.Qa[a] = b;
}, Ra(N, function(a, b, c) {
this[Hb](a, b, c, g, g);
}), N.setFormattedValue = function(a, b, c) {
this[Hb](a, b, g, c, g);
}, N.setProperties = function(a, b, c) {
this[Hb](a, b, g, g, c);
}, N.setProperty = function(a, b, c, e) {
this[jd](a, b)[c] = e;
}, N.setCell = function(a, b, c, e, f) {
mr(this, a), T(this, b), this.Zj(a, b);
var h = this.Na(a, b);
h || (h = {}, this.D[a].c[b] = h), "undefined" != typeof c && (nr(this, b, c), h.v = c), 
"undefined" != typeof e && (h.f = e), vn(f) && (h.p = zn(f) ? f :{});
}, N.setRowProperties = function(a, b) {
mr(this, a), this.D[a].p = b;
}, N.setRowProperty = function(a, b, c) {
this[Vc](a)[b] = c;
}, N.getRowProperty = function(a, b) {
mr(this, a);
var c = this.D[a];
return (c = c && c.p) && b in c ? c[b] :l;
}, N.getRowProperties = function(a) {
return mr(this, a), a = this.D[a], a.p || (a.p = {}), a.p;
}, N.setColumnLabel = function(a, b) {
T(this, a), this.z[a].label = b;
}, N.setColumnProperties = function(a, b) {
T(this, a), this.z[a].p = b;
}, N.setColumnProperty = function(a, b, c) {
this[Nc](a)[b] = c;
}, N.getColumnProperty = function(a, b) {
T(this, a);
var c = this.z[a];
return (c = c && c.p) && b in c ? c[b] :l;
}, N.getColumnProperties = function(a) {
return T(this, a), a = this.z[a], a.p || (a.p = {}), a.p;
}, N.insertColumn = function(a, b, c, e) {
for (a !== this.z[I] && (this.Aa = [], T(this, a)), zn(b) || (b = {
id:e || M,
label:c || M,
pattern:M,
type:b
}), c = b[F], zp(wr, c) || d(s("Invalid type: " + c + bf)), (c = b.role) && (e = b.p || {}, 
e.role = c, b.p = e), this.z[Nd](a, 0, b), b = 0; b < this.D[I]; b++) this.D[b].c[Nd](a, 0, {
v:l,
f:l
});
}, N.addColumn = function(a, b, c) {
return this.insertColumn(this.z[I], a, b, c), this.z[I] - 1;
}, N.wj = function(a, b) {
var c = jr(b);
return nr(this, a, c.v), c;
}, N.insertRows = function(a, b) {
a !== this.D[I] && (this.Aa = [], mr(this, a));
var c;
if (wn(b)) c = b; else if (typeof b == hl) {
(b != r[ab](b) || 0 > b) && d(s("Invalid value for numOrArray: " + b + ". If numOrArray is a number it should be a nonnegative integer.")), 
c = [];
for (var e = 0; b > e; e++) c[e] = l;
} else d(s("Invalid value for numOrArray. Should be a number or an array of arrays of cells."));
for (var e = [], f = 0; f < c[I]; f++) {
var h = c[f], k = [];
if (h === l) for (h = 0; h < this.z[I]; h++) k[C]({
v:l,
f:l
}); else if (wn(h)) {
h[I] != this.z[I] && d(s("Row given with size different than " + this.z[I] + " (the number of columns in the table)."));
for (var n = 0; n < h[I]; n++) k[C](this.wj(n, h[n]));
} else d(s("Every row given must be either null or an array."));
h = {}, h.c = k, e[C](h), 1e4 == e[I] && (k = e, Jn(uo, this.D, a, 0)[rc](l, k), 
a += e[I], e = []);
}
return Jn(uo, this.D, a, 0)[rc](l, e), a + e[I] - 1;
}, N.addRows = function(a) {
return typeof a == hl || wn(a) ? this.insertRows(this.D[I], a) :(d(s("Argument given to addRows must be either a number or an array")), 
void 0);
}, N.addRow = function(a) {
return wn(a) ? this[$c]([ a ]) :(a != l && d(s("If argument is given to addRow, it must be an array, or null")), 
this[$c](1));
}, N.getColumnRange = function(a) {
return qr(this, a);
}, N.getSortedRows = function(a) {
return rr(this, a);
}, N.sort = function(a) {
this.Aa = [], a = lr(this, a);
var b = this;
wo(this.D, function(c, e) {
for (var f = 0; f < a[I]; f++) {
var h = a[f], k = h.column, n = c.c[k], t = e.c[k], n = n ? n.v :l, t = t ? t.v :l, k = pr(b[wb](k), n, t);
if (0 != k) return k * (h.desc ? -1 :1);
}
return 0;
});
}, N.toJSON = function() {
return Tn({
cols:this.z,
rows:this.D,
p:this.Qa
});
}, N.getDistinctValues = function(a) {
return sr(this, a);
}, N.getFilteredRows = function(a) {
return tr(this, a);
}, N.removeRows = function(a, b) {
0 >= b || (this.Aa = [], mr(this, a), a + b > this.D[I] && (b = this.D[I] - a), 
this.D[Nd](a, b));
}, N.removeRow = function(a) {
this.removeRows(a, 1);
}, N.removeColumns = function(a, b) {
if (!(0 >= b)) {
this.Aa = [], T(this, a), a + b > this.z[I] && (b = this.z[I] - a), this.z[Nd](a, b);
for (var c = 0; c < this.D[I]; c++) this.D[c].c[Nd](a, b);
}
}, N.removeColumn = function(a) {
this.removeColumns(a, 1);
};
var Ar = /^[^<]*(<a(( )+target=('_blank')?("_blank")?)?( )+(href=('[^']*')?("[^"]*")?)>[^<]*<\/a>[^<]*)*$/, Br = /javascript((s)?( )?)*:/, yr = {
pl:rf,
ql:sf
};
N = xr[J], N.Og = l, N.g = l, N.isError = function() {
return this.We == Ri;
}, N.hasWarning = function() {
return this.We == dn;
}, N.containsReason = function(a) {
for (var b = 0; b < this.hb[I]; b++) if (this.hb[b].reason == a) return j;
for (b = 0; b < this.ib[I]; b++) if (this.ib[b].reason == a) return j;
return m;
}, N.getDataSignature = function() {
return this.Og;
}, N.getDataTable = function() {
return this.g;
}, N.yf = function(a) {
return this[Pc]() && this.hb && this.hb[0] && this.hb[0][a] ? this.hb[0][a] :this.hasWarning() && this.ib && this.ib[0] && this.ib[0][a] ? this.ib[0][a] :l;
}, N.getReasons = function() {
var a = this.yf(Kl);
return a != l && a != M ? [ a ] :[];
}, N.getMessage = function() {
return this.yf(Rk) || M;
}, N.getDetailedMessage = function() {
return this.yf(Ai) || M;
};
var Dr = {
rl:hn,
sl:jn,
ml:"scriptInjection",
kl:Lk,
gl:Ih
}, Gr = new nq({
"X-DataSource-Auth":"a"
}), Er = 0, Hr = {};
Cr[J].sh = 30;
var Fr = [], Ir = P.gadgets;
N = Cr[J], N.dk = function(a) {
var b = new ar(a);
433 == b.$a && b.Dc(l);
var c = b.Ia, c = c[v](/\/ccc$/, of);
/\/pub$/[Cc](c) && (c = c[v](/\/pub$/, of), b.nd(Fl, vf)), b.Cc(c), c = fp(a), a = (la(dp(a)[4] || l) || l) != l;
var e = mp[Cc](c), c = np[Cc](c) && !e && a;
return b.Ec(c ? kk :ok), b[Nb]();
}, N.ck = function(a) {
var b = new ar(a);
433 == b.$a && b.Dc(l);
var c = b.Ia, c = c[v](/\/edit$/, mf);
return b.Cc(c), c = fp(a), a = (la(dp(a)[4] || l) || l) !== l, a = sp[Cc](c) && a, 
b.Ec(a ? kk :ok), b[Nb]();
}, N.Nj = function(a) {
a[wd].Lg() ? (a = ao(a[wd].jk()), a[ob](/^({.*})$/) ? (a = Xn(a), Lr(a)) :Ln(Yn(a))) :this.ic ? this.qf(Yj, a[wd].nh()) :d(s("google.visualization.Query: " + a[wd].nh()));
}, N.ic = l, N.Kd = l, N.Rd = l, N.Ga = l, N.ef = l, N.kc = l, N.lf = j, N.vb = 0, 
N.Mc = l, N.wa = m, N.setRefreshInterval = function(a) {
(typeof a != hl || 0 > a) && d(s("Refresh interval must be a non-negative number")), 
this.vb = a, this.uh();
}, N.hf = function() {
this.Rd && (ea[Za](this.Rd), this.Rd = l);
}, N.rk = function() {
this.qf(Gm, Rg);
}, N.qf = function(a, b, c) {
this.lc({
version:sf,
status:Ri,
errors:[ {
reason:a,
message:b,
detailed_message:c
} ]
});
}, N.Hj = function(a) {
var b = {};
this.Ga && (b.tq = oa(this.Ga));
var c = Nl + oa(this.vg), e = this.Mc;
if (e && (c += Ff + e), this.ef && (c += Gf + this.ef), b.tqx = c, this.kc) {
var f, c = [];
for (f in this.kc) c[C](f + Df + this.kc[f]);
b.tqh = c[Od](Ef);
}
return a = Kr(a, b), this.vb && (a = new ar(a), Mo && a.Pj(), a = a[Nb]()), a;
}, N.jc = function() {
var a = this.Hj(this.xj), b = {};
Hr[oa(this.vg)] = this;
var c = this.$e, e = og;
if (c == jn && (c = hn, e = Pg), c == Ih) {
if (b = {}, /[?&]alt=gviz(&[^&]*)*$/[Cc](a)) c = Lk; else {
var f, c = a.search(hp);
b:{
for (f = 0; 0 <= (f = a[D](Mm, f)) && c > f; ) {
var h = a[Dd](f - 1);
if ((38 == h || 63 == h) && (h = a[Dd](f + 4), !h || 61 == h || 38 == h || 35 == h)) break b;
f += 5;
}
f = -1;
}
0 > f ? c = l :(h = a[D](ie, f), (0 > h || h > c) && (h = c), f += 5, c = pa(a.substr(f, h - f)[v](/\+/g, Td))), 
f = (c || Ih)[Vb](Df), c = f[0], c !== hn && c !== jn || !po(f, gn) || (b.xhrWithCredentials = j), 
zp(Dr, c) || (c = Ih);
}
b = {
sendMethod:c,
options:b
}, c = b.sendMethod, b = b.options;
}
c == Lk ? rn(cj) ? this.Lj(a, this.Hg) :d(s("gadgets.io.makeRequest is not defined.")) :((f = c == hn) || ((c = c == Ih) && (f = new ar(P[ac][pc]).Kj(new ar(a))[Nb](), 
c = dp(P[ac][pc]), f = dp(f), c = c[3] == f[3] && c[1] == f[1] && c[4] == f[4]), 
f = c), f ? (c = g, f = a, e == Pg && (a = a[Vb](Nf), 1 <= a[I] && (f = a[0]), 2 <= a[I] && (c = a[1])), 
a = f, f = In(this.Nj, this), b = this.zj || !!b.xhrWithCredentials, h = new Xq(), 
Zq[C](h), f && Gq(h, ni, f), Gq(h, Il, Jn($q, h)), b && h.Mj(b), h[qb](a, e, c, Gr)) :(e = ha[Lb](Oh)[0], 
b = this.Mc === l, this.yj && b ? (b = ha[ub](tk), this.Jj(b, a), e[Va](b)) :this.af(a)));
}, N.Jj = function(a, b) {
var c = this;
a.onerror = function() {
c.af(b);
}, a.onload = function() {
c.af(b);
}, Ca(a[z], el), a.src = b + ne + new Date().getTime();
}, N.Lj = function(a, b) {
b[Ir.io[Ic].CONTENT_TYPE] == l && (b[Ir.io[Ic].CONTENT_TYPE] = Ir.io.ContentType.TEXT), 
b[Ir.io[Ic].AUTHORIZATION] == l && (b[Ir.io[Ic].AUTHORIZATION] = Ir.io.AuthorizationType.SIGNED), 
b.OAUTH_ENABLE_PRIVATE_NETWORK == l && (b.OAUTH_ENABLE_PRIVATE_NETWORK = j), b.OAUTH_ADD_EMAIL == l && (b.OAUTH_ADD_EMAIL = j), 
Ir.io.makeRequest(a, In(this.Mk, this), b), this.Bh();
}, N.Mk = function(a) {
if (a != l && a.data) Ln(Yn(a.data)); else {
var b = M;
a && a[uc] && (b = a[uc][Od](Td)), this.qf(Mk, dj, b);
}
}, N.af = function(a) {
this.Bh(), Nn(a), this.uh();
}, N.Bh = function() {
var a = this;
this.hf(), this.Rd = ea[Tb](function() {
a.rk();
}, 1e3 * this.sh);
}, N.$g = function() {
this.Kd && (ea[Za](this.Kd), this.Kd = l);
}, N.uh = function() {
if (this.$g(), 0 != this.vb && this.lf && this.wa) {
var a = this;
this.Kd = ea[Tb](function() {
a.jc();
}, 1e3 * this.vb);
}
}, N.send = function(a) {
this.wa = j, this.ic = a, this.jc();
}, N.makeRequest = function(a, b) {
this.wa = j, this.ic = a, this.Hg = b || {}, this.jc();
}, N.abort = function() {
this.wa = m, this.hf(), this.$g();
}, N.lc = function(a) {
if (this.hf(), a = new xr(a), !a.containsReason(fl)) {
this.Mc = a[Pc]() ? l :a.getDataSignature();
var b = this.ic;
b[L](b, a);
}
}, N.setTimeout = function(a) {
(typeof a != hl || ja(a) || 0 >= a) && d(s("Timeout must be a positive number")), 
this.sh = a;
}, N.setRefreshable = function(a) {
return typeof a != Ph && d(s("Refreshable must be a boolean")), this.lf = a;
}, N.setQuery = function(a) {
typeof a != rm && d(s("queryString must be a string")), this.Ga = a;
}, N.cl = function(a) {
this.ef = a, a != l && this.Eh(Rm, a);
}, N.Eh = function(a, b) {
a = a[v](/\\/g, oh), b = b[v](/\\/g, oh), a = a[v](/:/g, ph), b = b[v](/:/g, ph), 
a = a[v](/;/g, qh), b = b[v](/;/g, qh), this.kc || (this.kc = {}), this.kc[a] = b;
};
var Nr = m;
Mr[J].Gh = 200, Mr[J].Ah = function() {
if (Pr()) {
var a = P.gadgets;
Cn(a.rpc.register) && a.rpc.register(Ll, Jr);
} else 0 < this.Gh && (this.Gh--, ea[Tb](In(this.Ah, this), 100));
}, Mr[J].createQueryFromPrefs = function(a) {
var b = a.getString(vh), c = b[Pd]();
return (0 == c[D](lk) || 0 == c[D](pk)) && (b = pa(b)), b = new Cr(b), a = a.getInt(uh), 
b[Wc](a), b;
}, Mr[J].validateResponse = function(a) {
return this.Ok(a);
}, P.gadgets && !Pr() && Nn("http://www.gmodules.com/gadgets/rpc/rpc.v.js"), Or(cf), 
Rr[J].getKey = function() {
return this.Yk;
}, R(Sr, wq), N = Tr[J], N.jf = l, N.ih = l, N.hh = l, N.g = l, N.setOptions = function(a) {
this.bb = a || {};
}, N.draw = function() {
this.g && this.Ig[zd](this.g, this.bb);
}, N.bl = function(a) {
var b = this.xc;
this.Lc = a ? a :b ? this.Lc = this.jf :l;
}, N.sendAndDraw = function() {
this.Lc || d(s("If no container was supplied, a custom error handler must be supplied instead."));
var a = this;
this.Ga[qb](function(b) {
var c = a.ih;
c && c(b), a.lc(b), (c = a.hh) && c(b);
});
}, N.lc = function(a) {
var b = this.Lc;
b(a) && (this.g = a[fb](), this.Ig[zd](this.g, this.bb));
}, N.setCustomResponseHandler = function(a) {
a != l && (typeof a != aj && d(s("Custom response handler must be a function.")), 
this.ih = a);
}, N.setCustomPostResponseHandler = function(a) {
a != l && (typeof a != aj && d(s("Custom post response handler must be a function.")), 
this.hh = a);
}, N.abort = function() {
this.Ga[md]();
}, N = W[J], N.cj = function() {
for (var a = 0; a < this.t[I]; a++) zn(this.t[a]) && (this.Ke[a] = []);
this.Je = m;
}, N.Kc = function() {
this.Je = j;
}, N.ak = function() {
for (var a = [], b = this.g[id](), c = 0; b > c; c++) a[C](c);
this.La = a, this.Kc();
}, N.setColumns = function(a) {
for (var b = this.g, c = yp(Ur), e = 0; e < a[I]; e++) {
var f = a[e];
if (Bn(f)) T(b, f); else if (zn(f)) {
var h = f.sourceColumn, f = f.calc;
Q(f) && ((!c || c && !po(c, f)) && d(s('Unknown function "' + f + Zd)), h != l && T(b, h));
} else d(s("Invalid column input, expected either a number or an object."));
}
for (this.t = Cp(a), a = this.g, b = this.t, c = 0; c < b[I]; c++) e = b[c], zn(e) && ((h = e.role) && (f = e.properties || {}, 
f.role = h, e.properties = f), h = e.sourceColumn, Bn(h) && (T(a, h), e.calc = e.calc || qk, 
Ia(e, e[F] || a[wb](h))));
this.Kc();
}, N.fh = function(a, b) {
if (wn(a)) {
vn(b) && d(s("If the first parameter is an array, no second parameter is expected"));
for (var c = 0; c < a[I]; c++) mr(this.g, a[c]);
return so(a);
}
if (un(a) == hl) {
!un(b) == hl && d(s("If first parameter is a number, second parameter must be specified and be a number.")), 
a > b && d(s("The first parameter (min) must be smaller than or equal to the second parameter (max).")), 
mr(this.g, a), mr(this.g, b);
for (var e = [], c = a; b >= c; c++) e[C](c);
return e;
}
d(s("First parameter must be a number or an array."));
}, N.setRows = function(a, b) {
this.La = this.fh(a, b), this.Ma = m, this.Kc();
}, N.getViewColumns = function() {
return Cp(this.t);
}, N.getViewRows = function() {
if (this.Ma) {
for (var a = [], b = this.g[id](), c = 0; b > c; c++) a[C](c);
return a;
}
return so(this.La);
}, N.hideColumns = function(a) {
this[xc](mo(this.t, function(b) {
return !po(a, b);
})), this.Kc();
}, N.hideRows = function(a, b) {
var c = this.fh(a, b);
this.Ma && (this.ak(), this.Ma = m), this.setRows(mo(this.La, function(a) {
return !po(c, a);
})), this.Kc();
}, N.getViewColumnIndex = function(a) {
for (var b = 0; b < this.t[I]; b++) {
var c = this.t[b];
if (c == a || zn(c) && c.sourceColumn == a) return b;
}
return -1;
}, N.getViewRowIndex = function(a) {
return this.Ma ? 0 > a || a >= this.g[id]() ? -1 :a :ko(this.La, a);
}, N.getTableColumnIndex = function(a) {
return T(this, a), a = this.t[a], Bn(a) ? a :zn(a) && Bn(a.sourceColumn) ? a.sourceColumn :-1;
}, N.getUnderlyingTableColumnIndex = function(a) {
return a = this.getTableColumnIndex(a), -1 == a ? a :(Cn(this.g.getUnderlyingTableColumnIndex) && (a = this.g.getUnderlyingTableColumnIndex(a)), 
a);
}, N.getTableRowIndex = function(a) {
return mr(this, a), this.Ma ? a :this.La[a];
}, N.getUnderlyingTableRowIndex = function(a) {
return a = this[Tc](a), Cn(this.g.getUnderlyingTableRowIndex) && (a = this.g.getUnderlyingTableRowIndex(a)), 
a;
}, N.getNumberOfRows = function() {
return this.Ma ? this.g[id]() :this.La[I];
}, N.getNumberOfColumns = function() {
return this.t[I];
}, N.getColumnId = function(a) {
return T(this, a), a = this.t[a], Bn(a) ? this.g.getColumnId(a) :a.id || M;
}, N.getColumnIndex = function(a) {
for (var b = 0; b < this.t[I]; b++) {
var c = this.t[b];
if (zn(c) && c.id == a) return b;
}
return a = this.g.getColumnIndex(a), this.getViewColumnIndex(a);
}, N.getColumnLabel = function(a) {
return T(this, a), a = this.t[a], Bn(a) ? this.g[Qc](a) :a[vc] || M;
}, N.getColumnPattern = function(a) {
return T(this, a), a = this.t[a], Bn(a) ? this.g[$b](a) :l;
}, N.getColumnRole = function(a) {
return a = this[Wb](a, Rl), a = Q(a) ? a :M;
}, N.getColumnType = function(a) {
return T(this, a), a = this.t[a], Bn(a) ? this.g[wb](a) :a[F];
}, N.oj = function(a, b) {
this.Je && this.cj();
var c = this.Ke[b][a];
if (vn(c)) return c;
var c = l, e = this.t[b], f = e.calc;
return Q(f) ? (f = Ur[f], c = f(this.g, a, e)) :Cn(f) && (c = f[L](l, this.g, a)), 
c = jr(c), this.dj(c, e[F]), this.Ke[b][a] = c;
}, N.dj = function(a, b) {
var c = a.v;
Zn(io(b)) && d(s('"type" must be specified')), or(c, b) || d(s(gh + c + Vd + b));
}, N.Na = function(a, b) {
T(this, b);
var c = this.t[b], e = l, f = this[Tc](a);
return zn(c) ? (e = this.oj(f, b), e.p = zn(e.p) ? e.p :{}) :Bn(c) ? e = {
v:this.g[H](f, c),
f:l,
p:l
} :d(s("Invalid column definition: " + e)), e;
}, Ka(N, function(a, b) {
return this.Na(a, b).v;
}), N.getFormattedValue = function(a, b) {
var c = this.Na(a, b);
if (c.f == l) {
var e = this.t[b];
if (zn(e)) e = this[wb](b), c.f = c.v != l ? ur(c.v, e) :M; else if (Bn(e)) {
var f = this[Tc](a);
c.f = this.g[Ld](f, e);
}
}
return c.f;
}, N.getProperty = function(a, b, c) {
return a = this[jd](a, b)[c], vn(a) ? a :l;
}, N.getProperties = function(a, b) {
var c = this.Na(a, b);
if (!c.p) {
var c = this[Tc](a), e = this.getTableColumnIndex(b);
return this.g[jd](c, e);
}
return c.p;
}, N.getColumnProperty = function(a, b) {
T(this, a);
var c = this.t[a];
return Bn(c) ? this.g[Wb](c, b) :this[Nc](a)[b] || l;
}, N.getColumnProperties = function(a) {
return T(this, a), a = this.t[a], Bn(a) ? this.g[Nc](a) :a.properties || {};
}, N.getTableProperty = function(a) {
return this.g.getTableProperty(a);
}, N.getTableProperties = function() {
return this.g[Db]();
}, N.getRowProperty = function(a, b) {
var c = this[Tc](a);
return this.g.getRowProperty(c, b);
}, N.getRowProperties = function(a) {
return mr(this, a), a = this[Tc](a), this.g[Vc](a);
}, N.getColumnRange = function(a) {
return qr(this, a);
}, N.getDistinctValues = function(a) {
return sr(this, a);
}, N.getSortedRows = function(a) {
return rr(this, a);
}, N.getFilteredRows = function(a) {
return tr(this, a);
}, N.toDataTable = function() {
var a = this.g;
Cn(a[Rc]) && (a = a[Rc]());
var e, f, h, a = Wn(a[Sb]()), b = this[Jc](), c = this[id](), k = [], n = [];
for (e = 0; b > e; e++) h = this.t[e], zn(h) ? (f = Bp(h), delete f.calc, delete f.sourceColumn) :Bn(h) ? f = a.cols[h] :d(s(xg)), 
k[C](f);
for (f = 0; c > f; f++) {
var t = a[qc][this.Ma ? f :this.La[f]], y = [];
for (e = 0; b > e; e++) {
h = this.t[e];
var A;
zn(h) ? A = {
v:this[H](f, e)
} :Bn(h) ? A = t.c[this.t[e]] :d(s(xg)), y[C](A);
}
t.c = y, n[C](t);
}
return a.cols = k, a.rows = n, a = new U(a);
}, N.toJSON = function() {
for (var a = {}, b = [], c = 0; c < this.t[I]; c++) {
var e = this.t[c];
(!zn(e) || Q(e.calc)) && b[C](e);
}
return 0 == b[I] || (a.columns = b), this.Ma || (a.rows = so(this.La)), Tn(a);
};
var Ur = {
emptyString:function() {
return M;
},
error:function(a, b, c) {
var e = c.sourceColumn, f = c.magnitude;
return Bn(e) && Bn(f) ? (a = a[H](b, e), Bn(a) ? c.errorType == zl ? a + a * (f / 100) :a + f :l) :l;
},
stringify:function(a, b, c) {
return c = c.sourceColumn, Bn(c) ? a[Ld](b, c) :M;
},
fillFromTop:function(a, b, c) {
return c = c.sourceColumn, Bn(c) ? vr(a, b, c, j) :l;
},
fillFromBottom:function(a, b, c) {
return c = c.sourceColumn, Bn(c) ? vr(a, b, c, m) :l;
},
identity:function(a, b, c) {
return c = c.sourceColumn, Bn(c) ? a[H](b, c) :l;
}
};
Vr[J].send = function(a) {
this.ic = a, this.jc();
}, Vr[J].pk = function(a) {
var c, b = {}, e = this.Mc;
return e && (c = im + e), c && (b.tqx = c, a = Kr(a, b)), a;
}, Vr[J].jc = function() {
var a = this.pk(this.sd);
this.mk[L](this, In(this.lc, this), a);
}, Vr[J].lc = function(a) {
if (a = new xr(a), !a.containsReason(fl)) {
this.Mc = a[Pc]() ? l :a.getDataSignature();
var b = this.ic;
b[L](b, a);
}
};
var X = {
xf:"google-visualization-errors"
};
X.tg = X.xf + "-", X.xh = X.xf + Df, X.sf = X.xf + "-all-", X.Le = X.xh + " container is null", 
X.Li = "background-color: #c00000; color: white; padding: 2px;", X.Ni = "background-color: #fff4c2; color: black; white-space: nowrap; padding: 2px; border: 1px solid black;", 
X.Oi = "font: normal 0.8em arial,sans-serif; margin-bottom: 5px;", X.Mi = "font-size: 1.1em; color: #0000cc; font-weight: bold; cursor: pointer; padding-left: 10px; color: black;text-align: right; vertical-align: top;", 
X.sg = 0, X.addError = function(a, b, c, e) {
X.Me(a) || d(s(X.Le + ". message: " + b)), c = X.Qi(b, c, e);
var f = c.errorMessage;
b = c.detailedMessage, c = c.options;
var h = c.showInTooltip != l ? !!c.showInTooltip :j, k = c[F] != dn ? X.Li :X.Ni, k = k + (c[z] ? c[z] :M), n = !!c.removable;
e = Lp();
var f = e.d(mm, {
style:k
}, e[eb](f)), k = X.tg + X.sg++, t = e.d(Hi, {
id:k,
style:X.Oi
}, f);
return b && (h ? f.title = b :(h = ha[ub](mm), Fa(h, b), e[Va](t, e.d(Hi, {
style:ul
}, h)))), n && (b = e.d(mm, {
style:X.Mi
}, e[eb](on)), b.onclick = Jn(X.Oe, t), e[Va](f, b)), X.Pi(a, t), c.removeDuplicates && X.Ri(a, t), 
k;
}, X.removeAll = function(a) {
X.Me(a) || d(s(X.Le)), (a = X.rf(a, m)) && (Ca(a[z], el), Zp(a));
}, X.addErrorFromQueryResponse = function(a, b) {
if (X.Me(a) || d(s(X.Le)), b || d(s(X.xh + " response is null")), !b[Pc]() && !b.hasWarning()) return l;
var c = b.getReasons(), e = j;
b[Pc]() && (e = !(po(c, Wm) || po(c, xk)));
var c = b.getMessage(), f = b.getDetailedMessage(), e = {
showInTooltip:e
};
return Ia(e, b[Pc]() ? Ri :dn), e.removeDuplicates = j, X[Rb](a, c, f, e);
}, X.removeError = function(a) {
return a = ha[Gc](a), X.uf(a) ? (X.Oe(a), j) :m;
}, X.getContainer = function(a) {
return a = ha[Gc](a), X.uf(a) ? a[Md][Md] :l;
}, X.createProtectedCallback = function(a, b) {
return function() {
try {
a[rc](l, arguments);
} catch (c) {
Cn(b) ? b(c) :google[K][uc][Rb](b, c[bc]);
}
};
}, X.Oe = function(a) {
var b = a[Md];
aq(a), 0 == b[Gb][I] && Ca(b[z], el);
}, X.uf = function(a) {
return Xp(a) && a.id && 0 == a.id[yd](X.tg, 0) && (a = a[Md]) && a.id && 0 == a.id[yd](X.sf, 0) && a[Md] ? j :m;
}, X.Qi = function(a, b, c) {
var e = a != l && a ? a :Ri, f = M, h = {}, k = arguments[I];
return 2 == k ? b && un(b) == jl ? h = b :f = b != l ? b :f :3 == k && (f = b != l ? b :f, 
h = c || {}), e = ao(e), f = ao(f), {
errorMessage:e,
detailedMessage:f,
options:h
};
}, X.Me = function(a) {
return a != l && Xp(a);
}, X.rf = function(a, b) {
for (var c = a[Gb], e = l, f = Lp(), h = 0; h < c[I]; h++) if (c[h].id && 0 == c[h].id[yd](X.sf, 0)) {
e = c[h], f.removeNode(e);
break;
}
return !e && b && (e = X.sf + X.sg++, e = Up(Hi, {
id:e,
style:Gi
}, l)), e && ((c = a[xb]) ? f.qe(e, c) :f[Va](a, e)), e;
}, X.Pi = function(a, b) {
var c = X.rf(a, j);
Ca(c[z], Mh), c[Va](b);
}, X.Gk = function(a, b) {
var c = X.rf(a, j);
lo(c && c[Gb], function(a) {
X.uf(a) && b(a);
});
}, X.Ri = function(a, b) {
var c = /id="?google-visualization-errors-[0-9]*"?/, e = cq(b), e = e[v](c, M), f = [];
return X.Gk(a, function(a) {
if (a != b) {
var k = cq(a), k = k[v](c, M);
k == e && f[C](a);
}
}), lo(f, X.Oe), f[I];
};
var Wr = {
aliceblue:"#f0f8ff",
antiquewhite:"#faebd7",
aqua:"#00ffff",
aquamarine:"#7fffd4",
azure:"#f0ffff",
beige:"#f5f5dc",
bisque:"#ffe4c4",
black:"#000000",
blanchedalmond:"#ffebcd",
blue:"#0000ff",
blueviolet:"#8a2be2",
brown:"#a52a2a",
burlywood:"#deb887",
cadetblue:"#5f9ea0",
chartreuse:"#7fff00",
chocolate:"#d2691e",
coral:"#ff7f50",
cornflowerblue:"#6495ed",
cornsilk:"#fff8dc",
crimson:"#dc143c",
cyan:"#00ffff",
darkblue:"#00008b",
darkcyan:"#008b8b",
darkgoldenrod:"#b8860b",
darkgray:"#a9a9a9",
darkgreen:"#006400",
darkgrey:"#a9a9a9",
darkkhaki:"#bdb76b",
darkmagenta:"#8b008b",
darkolivegreen:"#556b2f",
darkorange:"#ff8c00",
darkorchid:"#9932cc",
darkred:"#8b0000",
darksalmon:"#e9967a",
darkseagreen:"#8fbc8f",
darkslateblue:"#483d8b",
darkslategray:"#2f4f4f",
darkslategrey:"#2f4f4f",
darkturquoise:"#00ced1",
darkviolet:"#9400d3",
deeppink:"#ff1493",
deepskyblue:"#00bfff",
dimgray:"#696969",
dimgrey:"#696969",
dodgerblue:"#1e90ff",
firebrick:"#b22222",
floralwhite:"#fffaf0",
forestgreen:"#228b22",
fuchsia:"#ff00ff",
gainsboro:"#dcdcdc",
ghostwhite:"#f8f8ff",
gold:"#ffd700",
goldenrod:"#daa520",
gray:"#808080",
green:"#008000",
greenyellow:"#adff2f",
grey:"#808080",
honeydew:"#f0fff0",
hotpink:"#ff69b4",
indianred:"#cd5c5c",
indigo:"#4b0082",
ivory:"#fffff0",
khaki:"#f0e68c",
lavender:"#e6e6fa",
lavenderblush:"#fff0f5",
lawngreen:"#7cfc00",
lemonchiffon:"#fffacd",
lightblue:"#add8e6",
lightcoral:"#f08080",
lightcyan:"#e0ffff",
lightgoldenrodyellow:"#fafad2",
lightgray:"#d3d3d3",
lightgreen:"#90ee90",
lightgrey:"#d3d3d3",
lightpink:"#ffb6c1",
lightsalmon:"#ffa07a",
lightseagreen:"#20b2aa",
lightskyblue:"#87cefa",
lightslategray:"#778899",
lightslategrey:"#778899",
lightsteelblue:"#b0c4de",
lightyellow:"#ffffe0",
lime:"#00ff00",
limegreen:"#32cd32",
linen:"#faf0e6",
magenta:"#ff00ff",
maroon:"#800000",
mediumaquamarine:"#66cdaa",
mediumblue:"#0000cd",
mediumorchid:"#ba55d3",
mediumpurple:"#9370d8",
mediumseagreen:"#3cb371",
mediumslateblue:"#7b68ee",
mediumspringgreen:"#00fa9a",
mediumturquoise:"#48d1cc",
mediumvioletred:"#c71585",
midnightblue:"#191970",
mintcream:"#f5fffa",
mistyrose:"#ffe4e1",
moccasin:"#ffe4b5",
navajowhite:"#ffdead",
navy:"#000080",
oldlace:"#fdf5e6",
olive:"#808000",
olivedrab:"#6b8e23",
orange:"#ffa500",
orangered:"#ff4500",
orchid:"#da70d6",
palegoldenrod:"#eee8aa",
palegreen:"#98fb98",
paleturquoise:"#afeeee",
palevioletred:"#d87093",
papayawhip:"#ffefd5",
peachpuff:"#ffdab9",
peru:"#cd853f",
pink:"#ffc0cb",
plum:"#dda0dd",
powderblue:"#b0e0e6",
purple:"#800080",
red:"#ff0000",
rosybrown:"#bc8f8f",
royalblue:"#4169e1",
saddlebrown:"#8b4513",
salmon:"#fa8072",
sandybrown:"#f4a460",
seagreen:"#2e8b57",
seashell:"#fff5ee",
sienna:"#a0522d",
silver:"#c0c0c0",
skyblue:"#87ceeb",
slateblue:"#6a5acd",
slategray:"#708090",
slategrey:"#708090",
snow:"#fffafa",
springgreen:"#00ff7f",
steelblue:"#4682b4",
tan:"#d2b48c",
teal:"#008080",
thistle:"#d8bfd8",
tomato:"#ff6347",
turquoise:"#40e0d0",
violet:"#ee82ee",
wheat:"#f5deb3",
white:"#ffffff",
whitesmoke:"#f5f5f5",
yellow:"#ffff00",
yellowgreen:"#9acd32"
}, Zr = /#(.)(.)(.)/, Yr = /^#(?:[0-9a-f]{3}){1,2}$/i, $r = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
Aa(cs[J], function() {
return new cs(this.top, this[zc], this[oc], this[E]);
}), cs[J].contains = function(a) {
return this && a ? a instanceof cs ? a[E] >= this[E] && a[zc] <= this[zc] && a.top >= this.top && a[oc] <= this[oc] :a.x >= this[E] && a.x <= this[zc] && a.y >= this.top && a.y <= this[oc] :m;
}, N = ds[J], N.getProperties = function() {
return {
fill:this.zg,
Se:this.yg,
stroke:this.xg,
Eg:this.Fg,
Te:this.Dg,
Bg:this.Cg,
za:this.za ? Bp(this.za) :l,
pattern:this.Ag
};
}, Aa(N, function() {
return new ds(this[jd]());
}), N.gj = function(a) {
this.zg = bs(a);
}, N.hj = function(a) {
this.yg = r.min(r.max(a, 0), 1);
}, N.jj = function(a, b) {
this.xg = bs(a), b != l && this.Mg(b);
}, N.Mg = function(a) {
this.Fg = a;
}, N.lj = function(a) {
this.Dg = r.min(r.max(a, 0), 1);
}, N.kj = function(a) {
this.Cg = a;
}, N.ij = function(a) {
this.Ag = a;
}, new ds({
Se:0,
fill:"white",
Te:0,
stroke:"white"
}), r.log(10), Aa(fs[J], function() {
return new fs(this[E], this.top, this[u], this[B]);
}), fs[J].qj = function(a) {
var b = r.max(this[E], a[E]), c = r.min(this[E] + this[u], a[E] + a[u]);
if (c >= b) {
var e = r.max(this.top, a.top);
if (a = r.min(this.top + this[B], a.top + a[B]), a >= e) return Ha(this, b), this.top = e, 
ra(this, c - b), Da(this, a - e), j;
}
return m;
}, fs[J].contains = function(a) {
return a instanceof fs ? this[E] <= a[E] && this[E] + this[u] >= a[E] + a[u] && this.top <= a.top && this.top + this[B] >= a.top + a[B] :a.x >= this[E] && a.x <= this[E] + this[u] && a.y >= this.top && a.y <= this.top + this[B];
};
var ws = Lo ? "MozUserSelect" :Mo ? "WebkitUserSelect" :l, As = {
thin:2,
medium:4,
thick:6
}, Ds = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/, Gs = {
AnnotatedTimeLine:"annotatedtimeline",
AreaChart:ri,
BarChart:ri,
BubbleChart:ri,
CandlestickChart:ri,
ColumnChart:ri,
ComboChart:ri,
Gauge:"gauge",
GeoChart:"geochart",
GeoMap:"geomap",
ImageAreaChart:"imageareachart",
ImageBarChart:"imagebarchart",
ImageCandlestickChart:"imagechart",
ImageChart:"imagechart",
ImageLineChart:"imagelinechart",
ImagePieChart:"imagepiechart",
ImageSparkLine:"imagesparkline",
IntensityMap:"intensitymap",
LineChart:ri,
Map:"map",
MotionChart:"motionchart",
OrgChart:"orgchart",
PieChart:ri,
RangeSelector:ri,
ScatterChart:ri,
SparklineChart:ri,
SteppedAreaChart:ri,
Table:"table",
Timeline:"timeline",
TreeMap:"treemap",
StringFilter:qi,
NumberRangeFilter:qi,
CategoryFilter:qi,
ChartRangeFilter:qi,
Dashboard:qi
};
N = Ns[J], N.ah = l, N.Td = l, N.xc = l, Aa(N, function() {
var a = new this[Yb](this[Sb]());
return a.vd = this.vd, a;
}), N.draw = function(a) {
a = Op(a || M), Xp(a) || (a = Op(this[nc]()), Xp(a) || d(s("The container is null or not defined."))), 
this.xc = a;
try {
if (this.ea == l && d(s("The " + this.kd + " type is not defined.")), Fs(this.ea)) this.eh(a); else {
var b = In(this.eh, this, a), b = google[K][uc].createProtectedCallback(b, In(this.df, this, a));
this.Vj(b);
}
} catch (c) {
this.df(a, c);
}
}, N.toJSON = function() {
return this.Fh(this[fb]());
}, N.Fh = function(a) {
var b = this[Ed](), c = g;
return a === l || (c = Cn(a[Rc]) ? Wn(a[Rc]()[Sb]()) :Wn(a[Sb]())), a = {
containerId:this[nc]() || g,
dataSourceUrl:this[vd]() || g,
dataTable:c,
options:this[Hc]() || g,
state:this[lc]() || g,
packages:b === l ? g :b,
refreshInterval:this[Bd]() || g,
query:this[Hd]() || g,
view:this[Pb]() || g
}, a[this.kd + fh] = this.ea || g, a[this.kd + Lg] = this[rb]() || g, this.mh(a), 
Tn(a);
}, N.mh = function() {}, N.getDataSourceUrl = function() {
return this.sd;
}, N.getDataTable = function() {
return this.g;
}, N.Mh = function() {
return this.ea;
}, N.getName = function() {
return this.eg;
}, N.zf = function() {
return this[K];
}, N.getContainerId = function() {
return this.dg;
}, N.getQuery = function() {
return this.Ga;
}, N.getRefreshInterval = function() {
return this.vb;
}, N.getOption = function(a, b) {
return Os(this.bb, a, b);
}, N.getOptions = function() {
return this.bb;
}, N.getState = function() {
return this.Ha;
}, N.setDataSourceUrl = function(a) {
this.sd = a;
}, N.setCustomRequestHandler = function(a) {
this.vd = a;
}, N.getCustomRequestHandler = function() {
return this.vd;
}, N.setDataTable = function(a) {
this.g = a == l ? l :Cn(a[Db]) ? a :wn(a) ? google[K].arrayToDataTable(a) :new google[K].DataTable(a);
}, N.of = function(a) {
this.ea = a;
}, N.Cf = function(a) {
this.eg = a;
}, N.setContainerId = function(a) {
this.dg = a;
}, N.setQuery = function(a) {
this.Ga = a;
}, N.setRefreshInterval = function(a) {
this.vb = a;
}, N.setOption = function(a, b) {
var c = this.bb, e = a;
if (b == l) {
if (Os(c, e) !== l) {
var f = e[Vb](bf);
1 < f[I] && (e = f.pop(), c = Os(c, f[Od](bf))), delete c[e];
}
} else {
e = e[Vb](bf), c = c || P, !(e[0] in c) && c[yc] && c[yc](Zm + e[0]);
for (;e[I] && (f = e.shift()); ) !e[I] && vn(b) ? c[f] = b :c = c[f] ? c[f] :c[f] = {};
}
}, N.setOptions = function(a) {
this.bb = a || {};
}, Pa(N, function(a) {
this.Ha = a || {};
}), N.setPackages = function(a) {
this.fg = a;
}, N.setView = function(a) {
this.Db = a;
}, N.fl = function(a) {
a != this[K] && (this.qd = a);
}, N.getSnapshot = function() {
return new this[Yb](this.Fh(this.ah || this[fb]()));
}, N.getView = function() {
return this.Db;
}, N.getPackages = function() {
return this.fg;
}, N.df = function(a, b) {
var c = b && b[bc] || Ri, e = google[K][uc][Rb](a, c);
google[K][Fc].trigger(this, Ri, {
id:e,
message:c
});
}, N.Fk = function(a, b) {
var c = b.getMessage(), e = b.getDetailedMessage(), f = google[K][uc].addErrorFromQueryResponse(a, b);
google[K][Fc].trigger(this, Ri, {
id:f,
message:c,
detailedMessage:e
});
}, N.Tk = function() {
var a = this[Ed]();
if (a == l) {
var b = this.ea, b = b[v](Xj, M), a = Gs[b] || l;
a == l && d(s("Invalid visualization type: " + b));
}
return Q(a) && (a = [ a ]), a;
}, N.yd = function(a, b) {
var c = Fs(this.ea);
c || d(s("Invalid " + this.kd + " type: " + this.ea)), this.qd && (this.bh(), Ta(this, this.qd), 
this.qd = l), this[K] && this[K][Yb] == c && this.Rj(a, this[K]) ? c = this[K] :(this.bh(), 
c = new c(a)), this.Qj(c), this.ah = b;
for (var e = es(this[Hc]()), e = new Y({
chartType:this.ea,
dataTable:b,
options:e,
view:this[Pb]()
}), f = 0; f < this.$f[I]; f++) this.$f[f](e);
c[zd](e[fb](), e[Hc](), this[lc]());
}, N.pushView = function(a) {
wn(this.Db) ? this.Db[C](a) :this.Db = this.Db === l ? [ a ] :[ this.Db, a ];
}, N.sk = function(a, b) {
if (b[Pc]()) this.Fk(a, b); else {
var c = b[fb]();
this.yd(a, c);
}
}, N.Qj = function(a) {
var b = this;
this.Ek();
var c = [];
lo([ Il, Vl, Ri, pm ], function(e) {
var f = google[K][Fc].addListener(a, e, function(c) {
e == Il && Ta(b, a), (e == Il || e == pm) && Cn(a[lc]) && b[dd](a[lc][L](a)), google[K][Fc].trigger(b, e, c);
});
c[C](f);
}), this.Td = c;
}, N.Vj = function(a) {
a = {
packages:this.Tk(),
callback:a
};
var b = rn(Zj);
b === l && (b = wf), google.load(cn, b, a);
}, N.eh = function(a) {
var b = this[fb]();
b ? this.yd(a, b) :this.tk() ? (b = In(this.sk, this, a), b = google[K][uc].createProtectedCallback(b, In(this.df, this, a)), 
this.sendQuery(b, j)) :d(s("Cannot draw chart: no data specified."));
}, N.tk = function() {
return this[vd]() != l;
}, N.sendQuery = function(a, b) {
var c = An(b) ? b :m, e = this[vd]() || M, e = new google[K].Query(e), f = this[Bd]();
f && c && e[Wc](f), (c = this[Hd]()) && e[sd](c), e[qb](a);
}, N.bh = function() {
this[K] && Cn(this[K].clearChart) && this[K].clearChart(), Ta(this, l);
}, N.Ek = function() {
wn(this.Td) && (lo(this.Td, function(a) {
google[K][Fc].removeListener(a);
}), this.Td = l);
}, N.Rj = function(a, b) {
return b && Cn(b[tc]) ? b[tc]() == a :m;
}, R(Y, Ns), N = Y[J], N.getChart = Ns[J].zf, N.setChart = Ns[J].fl, N.setChartType = Ns[J].of, 
N.getChartType = Ns[J].Mh, N.setChartName = Ns[J].Cf, N.getChartName = Ns[J][rb], 
R(Z, Ns), N = Z[J], N.getControl = Ns[J].zf, N.setControlType = Ns[J].of, N.getControlType = Ns[J].Mh, 
N.setControlName = Ns[J].Cf, N.getControlName = Ns[J][rb], R($, Ns), N = $[J], N.yd = function(a, b) {
function c(a) {
return h[a];
}
rq(this[K]);
for (var e = new google[K].Dashboard(a), f = this.ec || [], h = this.ya, k = f[I], n = 0; k > n; n++) {
var t = no(f[n].controls, c), y = no(f[n].participants, c);
e[Ib](t, y);
}
Ta(this, e), $.b.yd[L](this, a, b);
}, N.mh = function(a) {
a.wrappers = this.ya ? no(this.ya, function(a) {
return a[Sb]();
}) :g, a.bindings = this.ec || g;
}, N.setWrappers = function(a) {
this.ya = a || l, this.nf();
}, N.getWrappers = function() {
return this.ya;
}, N.setBindings = function(a) {
this.ec = a || l, this.nf();
}, N.getBindings = function() {
return this.ec;
}, N.getDashboard = Ns[J].zf, N.setDashboardName = Ns[J].Cf, N.getDashboardName = Ns[J][rb], 
N.nf = function() {
var a = this.ya, b = this.ec;
(wn(a) ? 0 == a[I] :1) && (wn(b) ? 0 == b[I] :1) || (this.ya = no(a, this.gk, this), 
this.ec = no(b, this.fk, this));
}, N.gk = function(a) {
return this.ph(a) || (a = google[K].createWrapper(a)), a[ic](l), a[Ub](l), a;
}, N.fk = function(a) {
var b = a.controls, c = a.participants;
return ((wn(b) ? 0 == b[I] :1) || (wn(c) ? 0 == c[I] :1)) && d(s("invalid binding: " + a)), 
b = no(b, this.Kh, this), c = no(c, this.Kh, this), {
controls:b,
participants:c
};
}, N.Kh = function(a) {
if (!/[^0-9]/[Cc](a) && (a = ma(a, 10)), Bn(a)) return a;
var b = a;
return this.lk(a) ? (this.ph(b) || (b = google[K].createWrapper(b)), this.ya[C](b), 
this.ya[I] - 1) :(a = this.kk(), a = Zn(io(b)) ? -1 :ko(a, b), -1 == a && d(s("Invalid wrapper name: " + b)), 
a);
}, N.ph = function(a) {
return Cn(a[Sb]);
}, N.lk = function(a) {
var b = /${.*}^/;
return zn(a) || Q(a) && b[Cc](a);
}, N.kk = function() {
return no(this.ya, function(a) {
return a[rb]();
});
}, R(Ss, kq), N = Ss[J], N.na = l, N.pa = 0, N.Ne = m, N.hc = function(a, b, c) {
(this.na = a) && (this.pa = Bn(b) ? b :1 != this.na[Ec] ? 0 :this.S ? -1 :1), Bn(c) && xa(this, c);
}, N.se = function(a) {
this.na = a.na, this.pa = a.pa, xa(this, a[Fb]), this.S = a.S, this.Gd = a.Gd;
}, Aa(N, function() {
return new Ss(this.na, this.S, !this.Gd, this.pa, this[Fb]);
}), N.bk = function() {
var a = this.S ? 1 :-1;
this.pa == a && (this.pa = -1 * a, xa(this, this[Fb] + this.pa * (this.S ? -1 :1)));
}, za(N, function() {
var a;
if (this.Ne) {
(!this.na || this.Gd && 0 == this[Fb]) && d(jq), a = this.na;
var b = this.S ? -1 :1;
if (this.pa == b) {
var c = this.S ? a[fc] :a[xb];
c ? this.hc(c) :this.hc(a, -1 * b);
} else (c = this.S ? a.previousSibling :a[Kb]) ? this.hc(c) :this.hc(a[Md], -1 * b);
xa(this, this[Fb] + this.pa * (this.S ? -1 :1));
} else this.Ne = j;
return (a = this.na) || d(jq), a;
}), N.vj = function() {
return 1 == this.pa;
}, N.splice = function() {
var b = this.na;
this.bk(), this.S = !this.S, Ss[J].next[L](this), this.S = !this.S;
for (var c = xn(arguments[0]) ? arguments[0] :arguments, e = c[I] - 1; e >= 0; e--) b[Md] && b[Md][hb](c[e], b[Kb]);
aq(b);
}, R(Ts, Ss), R(Us, Ts), N = Us[J], N.H = l, N.A = l, N.L = 0, N.K = 0, N.la = function() {
return this.H;
}, N.Ja = function() {
return this.A;
}, N.mj = function() {
return this.Ne && this.na == this.A && (!this.K || !this.vj());
}, za(N, function() {
return this.mj() && d(jq), Us.b.next[L](this);
}), N.se = function(a) {
this.H = a.H, this.A = a.A, this.L = a.L, this.K = a.K, this.Uf = a.Uf, Us.b.se[L](this, a);
}, Aa(N, function() {
var a = new Us(this.H, this.L, this.A, this.K, this.Uf);
return a.se(this), a;
}), Vs[J].wg = function(a, b) {
var c = b && !a[Ac](), e = a.n;
try {
return c ? 0 <= this.fa(e, 0, 1) && 0 >= this.fa(e, 1, 0) :0 <= this.fa(e, 0, 0) && 0 >= this.fa(e, 1, 1);
} catch (f) {
return S || d(f), m;
}
}, Vs[J].Jh = function() {
return new Us(this.la(), this.Ya(), this.Ja(), this.yb());
}, R(Ws, Vs), N = Ws[J], Aa(N, function() {
return new this[Yb](this.n.cloneRange());
}), N.getContainer = function() {
return this.n.commonAncestorContainer;
}, N.la = function() {
return this.n.startContainer;
}, N.Ya = function() {
return this.n.startOffset;
}, N.Ja = function() {
return this.n.endContainer;
}, N.yb = function() {
return this.n.endOffset;
}, N.fa = function(a, b, c) {
return this.n.compareBoundaryPoints(1 == c ? 1 == b ? P.Range.START_TO_START :P.Range.START_TO_END :1 == b ? P.Range.END_TO_START :P.Range.END_TO_END, a);
}, N.isCollapsed = function() {
return this.n.collapsed;
}, N.select = function(a) {
var b = Tp(Np(this.la()));
this.Ic(b.getSelection(), a);
}, N.Ic = function(a) {
a.removeAllRanges(), a.addRange(this.n);
}, N.collapse = function(a) {
this.n[$a](a);
}, R($s, Ws), $s[J].Ic = function(a, b) {
!b || this[Ac]() ? $s.b.Ic[L](this, a, b) :(a[$a](this.Ja(), this.yb()), a.extend(this.la(), this.Ya()));
}, R(at, Vs), N = at[J], N.Ka = l, N.H = l, N.A = l, N.L = -1, N.K = -1, Aa(N, function() {
var a = new at(this.n.duplicate(), this.$i);
return a.Ka = this.Ka, a.H = this.H, a.A = this.A, a;
}), N.getContainer = function() {
if (!this.Ka) {
var a = this.n.text, b = this.n.duplicate(), c = a[v](/ +$/, M);
if ((c = a[I] - c[I]) && b.moveEnd(ei, -c), c = b.parentElement(), b = b.htmlText[v](/(\r\n|\r|\n)+/g, Td)[I], 
this[Ac]() && b > 0) return this.Ka = c;
for (;b > c.outerHTML[v](/(\r\n|\r|\n)+/g, Td)[I]; ) c = c[Md];
for (;1 == c[Gb][I] && c.innerText == (3 == c[xb][Ec] ? c[xb].nodeValue :c[xb].innerText) && Ys(c[xb]); ) c = c[xb];
0 == a[I] && (c = this.Tg(c)), this.Ka = c;
}
return this.Ka;
}, N.Tg = function(a) {
for (var b = a[Gb], c = 0, e = b[I]; e > c; c++) {
var f = b[c];
if (Ys(f)) {
var h = bt(f), k = h.htmlText != f.outerHTML;
if (this[Ac]() && k ? 0 <= this.fa(h, 1, 1) && 0 >= this.fa(h, 1, 0) :this.n.inRange(h)) return this.Tg(f);
}
}
return a;
}, N.la = function() {
return this.H || (this.H = this.Gc(1), this[Ac]() && (this.A = this.H)), this.H;
}, N.Ya = function() {
return 0 > this.L && (this.L = this.Wg(1), this[Ac]() && (this.K = this.L)), this.L;
}, N.Ja = function() {
return this[Ac]() ? this.la() :(this.A || (this.A = this.Gc(0)), this.A);
}, N.yb = function() {
return this[Ac]() ? this.Ya() :(0 > this.K && (this.K = this.Wg(0), this[Ac]() && (this.L = this.K)), 
this.K);
}, N.fa = function(a, b, c) {
return this.n.compareEndPoints((1 == b ? Xg :jg) + eh + (1 == c ? Xg :jg), a);
}, N.Gc = function(a, b) {
var c = b || this[tc]();
if (!c || !c[xb]) return c;
for (var e = 1 == a, f = 0, h = c[Gb][I]; h > f; f++) {
var t, k = e ? f :h - f - 1, n = c[Gb][k];
try {
t = dt(n);
} catch (y) {
continue;
}
var A = t.n;
if (this[Ac]()) {
if (Ys(n)) {
if (t.wg(this)) return this.Gc(a, n);
} else if (0 == this.fa(A, 1, 1)) {
this.L = this.K = k;
break;
}
} else {
if (this.wg(t)) {
if (!Ys(n)) {
e ? this.L = k :this.K = k + 1;
break;
}
return this.Gc(a, n);
}
if (0 > this.fa(A, 1, 0) && 0 < this.fa(A, 0, 1)) return this.Gc(a, n);
}
}
return c;
}, N.Dj = function(a, b, c) {
return this.n.compareEndPoints((1 == b ? Xg :jg) + eh + (1 == c ? Xg :jg), dt(a).n);
}, N.Wg = function(a, b) {
var c = 1 == a, e = b || (c ? this.la() :this.Ja());
if (1 == e[Ec]) {
for (var e = e[Gb], f = e[I], h = c ? 1 :-1, k = c ? 0 :f - 1; k >= 0 && f > k; k += h) {
var n = e[k];
if (!Ys(n) && 0 == this.Dj(n, a, a)) return c ? k :k + 1;
}
return -1 == k ? 0 :k;
}
return f = this.n.duplicate(), h = bt(e), f.setEndPoint(c ? kg :Zg, h), f = f.text[I], 
c ? e[I] - f :f;
}, N.isCollapsed = function() {
return 0 == this.n.compareEndPoints(Yg, this.n);
}, N.select = function() {
this.n.select();
}, N.collapse = function(a) {
this.n[$a](a), a ? (this.A = this.H, this.K = this.L) :(this.H = this.A, this.L = this.K);
}, R(et, Ws), et[J].Ic = function(a) {
a[$a](this.la(), this.Ya()), (this.Ja() != this.la() || this.yb() != this.Ya()) && a.extend(this.Ja(), this.yb()), 
0 == a.rangeCount && a.addRange(this.n);
}, R(ft, Ws), ft[J].fa = function(a, b, c) {
return Zo(zf) ? ft.b.fa[L](this, a, b, c) :this.n.compareBoundaryPoints(1 == c ? 1 == b ? P.Range.START_TO_START :P.Range.END_TO_START :1 == b ? P.Range.START_TO_END :P.Range.END_TO_END, a);
}, ft[J].Ic = function(a, b) {
a.removeAllRanges(), b ? a.setBaseAndExtent(this.Ja(), this.yb(), this.la(), this.Ya()) :a.setBaseAndExtent(this.la(), this.Ya(), this.Ja(), this.yb());
}, R(kt, pq);
var lt = [];
N = kt[J], N.h = function(a, b, c, e, f) {
wn(b) || (lt[0] = b, b = lt);
for (var h = 0; h < b[I]; h++) {
var k = Gq(a, b[h], c || this, e || m, f || this.Sg || this);
this.C[C](k);
}
return this;
}, N.W = function(a, b, c, e, f) {
if (wn(b)) for (var h = 0; h < b[I]; h++) this.W(a, b[h], c, e, f); else {
a:{
if (c = c || this, f = f || this.Sg || this, e = !!e, a = Kq(a, b, e)) for (b = 0; b < a[I]; b++) if (!a[b].Bb && a[b].$b == c && a[b][Mc] == e && a[b].wd == f) {
a = a[b];
break a;
}
a = l;
}
a && (a = a.key, Lq(a), qo(this.C, a));
}
return this;
}, N.removeAll = function() {
lo(this.C, Lq), Qa(this.C, 0);
}, N.j = function() {
kt.b.j[L](this), this[xd]();
}, va(N, function() {
d(s("EventHandler.handleEvent not implemented"));
}), R(mt, Rq);
var nt = S || Lo && Zo("1.9.3");
N = mt[J], Ma(N, 0), Na(N, 0), sa(N, 0), ta(N, 0), N.ig = 0, N.jg = 0, N.cc = 0, 
N.dc = 0, N.nb = j, N.Ab = m, N.hg = 0, N.Ti = m, N.Ae = m, N.O = function() {
return this.Fa;
}, N.bg = function(a) {
this.bf = a || new fs(0/0, 0/0, 0/0, 0/0);
}, N.j = function() {
mt.b.j[L](this), Jq(this.handle, [ Lm, Vk ], this.Wf, m, this), this.Vf(), Ua(this, l), 
this.Fa = this.handle = l;
}, N.Rg = function() {
return vn(this.cb) || (this.cb = ps(this[wd])), this.cb;
}, N.Wf = function(a) {
var b = a[F] == Vk;
if (!this.nb || this.Ab || b && !a.ke()) this[w](Mi); else {
if (this.ze(a), 0 == this.hg) {
if (!this.gg(a)) return;
this.Ab = j, a[gb]();
} else a[gb]();
if (this.Ii(), Ma(this, this.ig = a[bd]), Na(this, this.jg = a[cd]), sa(this, a[mb]), 
ta(this, a[nb]), this.Ae) {
a = this[wd];
var b = a[qd], c = a[Xb];
if (!c && is(a) == Vi && (c = Np(a)[Mb]), c) {
if (Lo) var e = Cs(c), b = b + e[E]; else $o(8) && (e = Cs(c), b -= e[E]);
a = ps(c) ? c[ld] - (b + a[bb]) :b;
} else a = b;
} else a = this[wd][qd];
this.cc = a, this.dc = this[wd][wc], this.Ge = Lp(this.m).Tb(), Kn();
}
}, N.Ii = function() {
var a = this.m, b = a[Mb], c = !nt;
this.Fa.h(a, [ Km, Wk ], this.Si, c), this.Fa.h(a, [ Jm, Zk ], this.rd, c), nt ? (b.setCapture(m), 
this.Fa.h(b, Kk, this.rd)) :this.Fa.h(Tp(a), Nh, this.rd), S && this.Ti && this.Fa.h(a, Ki, xq), 
this.Vi && this.Fa.h(this.Vi, Ul, this.Ui, c);
}, N.gg = function(a) {
return this[w](new ot(om, this, a[bd], a[cd], a));
}, N.Vf = function() {
this.Fa[xd](), nt && this.m.releaseCapture();
}, N.rd = function(a, b) {
if (this.Vf(), this.Ab) {
this.ze(a), this.Ab = m;
var c = this.Jg(this.cc), e = this.Kg(this.dc);
this[w](new ot(Pi, this, a[bd], a[cd], a, c, e, b || a[F] == Im));
} else this[w](Mi);
(a[F] == Jm || a[F] == Im) && a[gb]();
}, N.ze = function(a) {
var b = a[F];
b == Lm || b == Km ? a.Jb(a.U[ib][0], a.currentTarget) :(b == Jm || b == Im) && a.Jb(a.U.changedTouches[0], a.currentTarget);
}, N.Si = function(a) {
if (this.nb) {
this.ze(a);
var b = (this.Ae && this.Rg() ? -1 :1) * (a[bd] - this[bd]), c = a[cd] - this[cd];
if (Ma(this, a[bd]), Na(this, a[cd]), sa(this, a[mb]), ta(this, a[nb]), !this.Ab) {
var e = this.ig - this[bd], f = this.jg - this[cd];
if (e * e + f * f > this.hg) {
if (!this.gg(a)) return this.nc || this.rd(a), void 0;
this.Ab = j;
}
}
c = this.Pg(b, c), b = c.x, c = c.y, this.Ab && this[w](new ot(Jh, this, a[bd], a[cd], a, b, c)) && (this.Qg(a, b, c, m), 
a[gb]());
}
}, N.Pg = function(a, b) {
var c = Lp(this.m).Tb();
a += c.x - this.Ge.x, b += c.y - this.Ge.y, this.Ge = c, this.cc += a, this.dc += b;
var c = this.Jg(this.cc), e = this.Kg(this.dc);
return new yo(c, e);
}, N.Ui = function(a) {
var b = this.Pg(0, 0);
Ma(a, this[bd]), Na(a, this[cd]), this.Qg(a, b.x, b.y, j);
}, N.Qg = function(a, b, c) {
this.Uk(b, c), this[w](new ot(Ji, this, a[bd], a[cd], a, b, c));
}, N.Jg = function(a) {
var b = this.bf, c = ja(b[E]) ? l :b[E], b = ja(b[u]) ? 0 :b[u];
return r.min(c != l ? c + b :ga, r.max(c != l ? c :-ga, a));
}, N.Kg = function(a) {
var b = this.bf, c = ja(b.top) ? l :b.top, b = ja(b[B]) ? 0 :b[B];
return r.min(c != l ? c + b :ga, r.max(c != l ? c :-ga, a));
}, N.Uk = function(a, b) {
this.Ae && this.Rg() ? Ea(this[wd][z], a + Gl) :Ha(this[wd][z], a + Gl), this[wd][z].top = b + Gl;
}, R(ot, wq), R(pt, Rq), va(pt[J], function(a) {
var b = new yq(a.U);
Ia(b, a[F] == Xi || a[F] == Wi ? Xi :Yi), this[w](b);
}), pt[J].j = function() {
pt.b.j[L](this), Lq(this.oi), Lq(this.pi), delete this.i;
}, tn(qt), qt[J].Zk = 0, qt[J].Ak = function() {
return Df + (this.Zk++)[Nb](36);
}, qt.ma(), R(rt, Rq), rt[J].Bk = qt.ma();
var st = l;
N = rt[J], N.Bd = l, N.q = m, N.i = l, N.cb = l, N.ge = l, N.ua = l, N.P = l, N.Ca = l, 
N.di = m, N.Mb = function() {
return this.Bd || (this.Bd = this.Bk.Ak());
}, N.a = function() {
return this.i;
}, N.Xf = function(a) {
this.i = a;
}, N.O = function() {
return this.Ub || (this.Ub = new kt(this));
}, N.Xd = function(a) {
this == a && d(s(hh)), a && this.ua && this.Bd && this.ua.$d(this.Bd) && this.ua != a && d(s(hh)), 
this.ua = a, rt.b.Pe[L](this, a);
}, N.getParent = function() {
return this.ua;
}, N.Pe = function(a) {
this.ua && this.ua != a && d(s("Method not supported")), rt.b.Pe[L](this, a);
}, N.r = function() {
return this.Wa;
}, N.d = function() {
this.i = this.Wa[ub](Hi);
}, N.mb = function(a) {
this.Lf(a);
}, N.Lf = function(a, b) {
this.q && d(s(dg)), this.i || this.d(), a ? a[hb](this.i, b || l) :this.Wa.m[td][Va](this.i), 
(!this.ua || this.ua.q) && this.I();
}, N.I = function() {
this.q = j, this.jb(function(a) {
!a.q && a.a() && a.I();
});
}, N.T = function() {
this.jb(function(a) {
a.q && a.T();
}), this.Ub && this.Ub[xd](), this.q = m;
}, N.j = function() {
rt.b.j[L](this), this.q && this.T(), this.Ub && (this.Ub.V(), delete this.Ub), this.jb(function(a) {
a.V();
}), !this.di && this.i && aq(this.i), this.ua = this.ge = this.i = this.Ca = this.P = l;
}, N.el = function(a) {
this.ge = a;
}, N.Cd = function(a, b) {
this.yc(a, this.Sa(), b);
}, N.yc = function(a, b, c) {
if (a.q && (c || !this.q) && d(s(dg)), (0 > b || b > this.Sa()) && d(s("Child component index out of bounds")), 
this.Ca && this.P || (this.Ca = {}, this.P = []), a[Xa]() == this) {
var e = a.Mb();
this.Ca[e] = a, qo(this.P, a);
} else {
var e = this.Ca, f = a.Mb();
f in e && d(s('The object already contains the key "' + f + Zd)), e[f] = a;
}
a.Xd(this), uo(this.P, b, 0, a), a.q && this.q && a[Xa]() == this ? (c = this.N(), 
c[hb](a.a(), c[Gb][b] || l)) :c ? (this.i || this.d(), b = this.Ba(b + 1), a.Lf(this.N(), b ? b.i :l)) :this.q && !a.q && a.i && a.i[Md] && 1 == a.i[Md][Ec] && a.I();
}, N.N = function() {
return this.i;
}, N.ie = function() {
return this.cb == l && (this.cb = ps(this.q ? this.i :this.Wa.m[td])), this.cb;
}, N.Wb = function(a) {
this.q && d(s(dg)), this.cb = a;
}, N.Qk = function() {
return !!this.P && 0 != this.P[I];
}, N.Sa = function() {
return this.P ? this.P[I] :0;
}, N.$d = function(a) {
return this.Ca && a ? (a in this.Ca ? this.Ca[a] :g) || l :l;
}, N.Ba = function(a) {
return this.P ? this.P[a] || l :l;
}, N.jb = function(a, b) {
this.P && lo(this.P, a, b);
}, N.Vc = function(a) {
return this.P && a ? ko(this.P, a) :-1;
}, N.removeChild = function(a, b) {
if (a) {
var c = Q(a) ? a :a.Mb();
a = this.$d(c), c && a && (Ap(this.Ca, c), qo(this.P, a), b && (a.T(), a.i && aq(a.i)), 
a.Xd(l));
}
return a || d(s("Child is not in parent component")), a;
}, N.Rk = function(a, b) {
return this[ud](this.Ba(a), b);
}, N.qg = function(a) {
for (var b = []; this.Qk(); ) b[C](this.Rk(0, a));
return b;
}, R(ut, rt), N = ut[J], N.Yd = l, N.o = m, N.X = l, N.Q = l, N.ta = l, N.w = function() {
return Mj;
}, N.Zc = function() {
return this.X;
}, N.d = function() {
ut.b.d[L](this);
var a = this.a();
Jp(a, this.w()), gq(a, j), vs(a, m), this.gi(), this.fi();
}, N.gi = function() {
this.qi && !this.Q && (this.Q = this.r().d(rk, {
frameborder:0,
style:Rh,
src:yk
}), Sa(this.Q, this.w() + Ae), vs(this.Q, m), us(this.Q, 0)), this.X || (this.X = this.r().d(Hi, this.w() + Ae), 
vs(this.X, m));
}, N.fi = function() {
this.ta || (this.ta = this.r()[ub](mm), vs(this.ta, m), gq(this.ta, j), this.ta[z].position = xh);
}, N.Zh = function() {
this.Q && $p(this.Q, this.a()), $p(this.X, this.a());
}, N.I = function() {
this.Zh(), ut.b.I[L](this);
var a = this.a();
a[Md] && a[Md][hb](this.ta, a[Kb]), this.Yd = new pt(this.r().m), this.O().h(this.Yd, Xi, this.Yh);
}, N.T = function() {
this.o && this.F(m), rq(this.Yd), ut.b.T[L](this), aq(this.Q), aq(this.X), aq(this.ta);
}, N.F = function(a) {
a != this.o && (this.Sb && this.Sb[fd](), this.rc && this.rc[fd](), this.Vb && this.Vb[fd](), 
this.tc && this.tc[fd](), a ? this.uj() :this.sj());
}, N.uj = function() {
this[w](Lh) && (this.oe(), this.pc(), this.O().h(this.r().ad(), Ol, this.oe), this.cg(j), 
this[tb](), this.o = j, this.Sb && this.rc ? (Iq(this.Sb, Pi, this.ed, m, this), 
this.rc[Uc](), this.Sb[Uc]()) :this.ed());
}, N.sj = function() {
this[w](Kh) && (this.O().W(this.r().ad(), Ol, this.oe), this.o = m, this.Vb && this.tc ? (Iq(this.Vb, Pi, this.gd, m, this), 
this.tc[Uc](), this.Vb[Uc]()) :this.gd());
}, N.cg = function(a) {
this.Q && vs(this.Q, a), this.X && vs(this.X, a), vs(this.a(), a), vs(this.ta, a);
}, N.ed = function() {
this[w](hm);
}, N.gd = function() {
this.cg(m), this[w](fk);
}, N.focus = function() {
this.vh();
}, N.oe = function() {
this.Q && vs(this.Q, m), this.X && vs(this.X, m);
var a = this.r().m, b = Rp(Tp(a) || ea || ea), c = r.max(b[u], r.max(a[td][jc], a[Mb][jc])), a = r.max(b[B], r.max(a[td][vb], a[Mb][vb]));
this.Q && (vs(this.Q, j), qs(this.Q, c, a)), this.X && (vs(this.X, j), qs(this.X, c, a));
}, N.pc = function() {
var a = this.r().m, b = Tp(a) || ea;
if (is(this.a()) == Vi) var c = a = 0; else c = this.r().Tb(), a = c.x, c = c.y;
var e = rs(this.a()), b = Rp(b || ea), a = r.max(a + b[u] / 2 - e[u] / 2, 0), c = r.max(c + b[B] / 2 - e[B] / 2, 0);
js(this.a(), a, c), js(this.ta, a, c);
}, N.Yh = function(a) {
a[wd] == this.ta && (a = this.vh, Cn(a) ? this && (a = In(a, this)) :a && typeof a[Cb] == aj ? a = In(a[Cb], a) :d(s(yg)), 
Tq[Tb](a, 0));
}, N.vh = function() {
try {
S && this.r().m[td][tb](), this.a()[tb]();
} catch (a) {}
}, N.j = function() {
rq(this.Sb), this.Sb = l, rq(this.Vb), this.Vb = l, rq(this.rc), this.rc = l, rq(this.tc), 
this.tc = l, ut.b.j[L](this);
}, R(vt, ut), N = vt[J], N.ui = j, N.Ff = j, N.Gf = j, N.$h = j, N.Zd = .5, N.Xh = M, 
N.ia = M, N.Za = l, N.Ki = m, N.Qb = l, N.Qc = l, N.Jf = l, N.Pc = l, N.oc = l, 
N.Ra = l, N.Nb = "dialog", N.w = function() {
return this.sa;
}, Ja(N, function(a) {
this.ia = a, this.oc && Fa(this.oc, a);
}), N.wf = function(a) {
this.Nb = a;
}, N.Ad = function() {
this.a() || this.mb();
}, N.N = function() {
return this.Ad(), this.oc;
}, N.Zi = function() {
return this.Ad(), this.Qc;
}, N.Yi = function() {
return this.Ad(), this.Ra;
}, N.Zc = function() {
return this.Ad(), vt.b.Zc[L](this);
}, N.Wh = function(a) {
this.Zd = a, this.a() && (a = this.Zc()) && us(a, this.Zd);
}, N.ci = function(a) {
if (this.Gf = a, this.q) {
var b = this.r(), c = this.Zc(), e = this.Q;
a ? (e && b.qe(e, this.a()), b.qe(c, this.a())) :(b.removeNode(e), b.removeNode(c));
}
}, N.si = function() {
return new mt(this.a(), this.Qb);
}, N.If = function(a) {
if (this.a()) {
var b = this.Qb, c = this.sa + Xe;
a ? Jp(b, c) :Kp(b, c);
}
a && !this.Za ? (this.Za = this.si(), Jp(this.Qb, this.sa + Xe), Gq(this.Za, om, this.ti, m, this)) :!a && this.Za && (this.Za.V(), 
this.Za = l);
}, N.d = function() {
vt.b.d[L](this);
var a = this.a(), b = this.r();
this.Qb = b.d(Hi, {
className:this.sa + Ve,
id:this.Mb()
}, this.Qc = b.d(mm, this.sa + Ye, this.Xh), this.Pc = b.d(mm, this.sa + We)), Yp(a, this.Qb, this.oc = b.d(Hi, this.sa + Fe), this.Ra = b.d(Hi, this.sa + Be)), 
this.Jf = this.Qb.id, a[Ab](Rl, this.Nb), gt(a, Fk, this.Jf || M), this.ia && Fa(this.oc, this.ia), 
vs(this.Pc, this.Ff), this.Ta && this.Ta.Vh(this.Ra), vs(this.Ra, !!this.Ta), this.Wh(this.Zd);
}, N.I = function() {
vt.b.I[L](this), this.O().h(this.a(), Ck, this.Mf).h(this.a(), Dk, this.Mf), this.O().h(this.Ra, ji, this.ai), 
this.If(this.$h), this.O().h(this.Pc, ji, this.bi), this.a()[Ab](Rl, this.Nb), this.Qc.id !== M && gt(this.a(), Fk, this.Qc.id), 
this.Gf || this.ci(m);
}, N.T = function() {
this.o && this.F(m), this.If(m), vt.b.T[L](this);
}, N.F = function(a) {
a != this.o && (this.q || this.mb(), vt.b.F[L](this, a));
}, N.ed = function() {
vt.b.ed[L](this), this[w](Dh);
}, N.gd = function() {
vt.b.gd[L](this), this[w](Ch), this.Ki && this.V();
}, N.focus = function() {
if (vt.b[tb][L](this), this.Ta) {
var a = this.Ta.Sc;
if (a) for (var f, b = this.r().m, c = this.Ra[Lb](ai), e = 0; f = c[e]; e++) if (f[Zc] == a) {
try {
if (Mo || Ko) {
var h = b[ub](wk);
h[z].cssText = Cl, this.a()[Va](h), h[tb](), this.a()[ud](h);
}
f[tb]();
} catch (k) {}
break;
}
}
}, N.ti = function() {
var a = this.r().m, b = Rp(Tp(a) || ea || ea), c = r.max(a[td][jc], b[u]), a = r.max(a[td][vb], b[B]), e = rs(this.a());
is(this.a()) == Vi ? this.Za.bg(new fs(0, 0, r.max(0, b[u] - e[u]), r.max(0, b[B] - e[B]))) :this.Za.bg(new fs(0, 0, c - e[u], a - e[B]));
}, N.bi = function() {
if (this.Ff) {
var a = this.Ta, b = a && a.Be;
b ? (a = a.get(b), this[w](new zt(b, a)) && this.F(m)) :this.F(m);
}
}, N.j = function() {
this.Ra = this.Pc = l, vt.b.j[L](this);
}, N.ai = function(a) {
if ((a = this.$j(a[wd])) && !a[pd]) {
a = a[Zc];
var b = this.Ta.get(a);
this[w](new zt(a, b)) && this.F(m);
}
}, N.$j = function(a) {
for (;a != l && a != this.Ra; ) {
if (a[sc] == Wf) return a;
a = a[Md];
}
return l;
}, N.Mf = function(a) {
var b = m, c = m, e = this.Ta, f = a[wd];
if (a[F] == Ck) if (this.ui && 27 == a[x]) {
var h = e && e.Be, f = f[sc] == Tg && !f[pd];
h && !f ? (c = j, b = e.get(h), b = this[w](new zt(h, b))) :f || (b = j);
} else 9 == a[x] && a[Id] && f == this.a() && (c = j); else if (13 == a[x]) {
if (f[sc] == Wf) h = f[Zc]; else if (e) {
var k = e.Sc, n = k && e.vi(k), f = (f[sc] == ah || f[sc] == Tg || f[sc] == Pf) && !f[pd];
n && !n[pd] && !f && (h = k);
}
h && e && (c = j, b = this[w](new zt(h, oa(e.get(h)))));
}
(b || c) && (a[Zb](), a[gb]()), b && this.F(m);
}, R(zt, wq), R(wt, nq), N = wt[J], N.sa = "goog-buttonset", N.Sc = l, N.i = l, 
N.Be = l, N.set = function(a, b, c, e) {
return nq[J].set[L](this, a, b), c && (this.Sc = a), e && (this.Be = a), this;
}, N.$ = function(a, b, c) {
return this.set(a.key, a.caption, b, c);
}, N.Vh = function(a) {
this.i = a, this.mb();
}, N.mb = function() {
if (this.i) {
Fa(this.i, M);
var a = Lp(this.i);
mq(this, function(b, c) {
var e = a.d(ai, {
name:c
}, b);
c == this.Sc && Sa(e, this.sa + Ge), this.i[Va](e);
}, this);
}
}, N.a = function() {
return this.i;
}, N.r = function() {
return this.Wa;
}, N.vi = function(a) {
for (var e, b = this.Vk(), c = 0; e = b[c]; c++) if (e[Zc] == a || e.id == a) return e;
return l;
}, N.Vk = function() {
return this.i[Lb](Wf);
};
var xt = {
key:"ok",
caption:"OK"
}, yt = {
key:"cancel",
caption:"Cancel"
}, At = {
key:"yes",
caption:"Yes"
}, Bt = {
key:"no",
caption:"No"
}, Ct = {
key:"save",
caption:"Save"
}, Dt = {
key:"continue",
caption:"Continue"
};
"undefined" != typeof ha && (new wt().$(xt, j, j), new wt().$(xt, j).$(yt, m, j), 
new wt().$(At, j).$(Bt, m, j), new wt().$(At).$(Bt, j).$(yt, m, j), new wt().$(Dt).$(Ct).$(yt, j, j)), 
R(Et, Rq), N = Et[J], N.i = l, N.Ed = l, N.Ue = l, N.Fd = l, N.Z = -1, N.fb = -1, 
N.cf = m;
var Ft = {
3:13,
12:144,
63232:38,
63233:40,
63234:37,
63235:39,
63236:112,
63237:113,
63238:114,
63239:115,
63240:116,
63241:117,
63242:118,
63243:119,
63244:120,
63245:121,
63246:122,
63247:123,
63248:44,
63272:46,
63273:36,
63275:35,
63276:33,
63277:34,
63289:144,
63302:45
}, Gt = {
Up:38,
Down:40,
Left:37,
Right:39,
Enter:13,
F1:112,
F2:113,
F3:114,
F4:115,
F5:116,
F6:117,
F7:118,
F8:119,
F9:120,
F10:121,
F11:122,
F12:123,
"U+007F":46,
Home:36,
End:35,
PageUp:33,
PageDown:34,
Insert:45
}, Ht = S || Mo && Zo(yf), It = Fo && Lo;
N = Et[J], N.Aj = function(a) {
Mo && (17 == this.Z && !a[od] || 18 == this.Z && !a[Ob] || Fo && 91 == this.Z && !a[Lc]) && (this.fb = this.Z = -1), 
-1 == this.Z && (a[od] && 17 != a[x] ? this.Z = 17 :a[Ob] && 18 != a[x] ? this.Z = 18 :a[Lc] && 91 != a[x] && (this.Z = 91)), 
Ht && !ht(a[x], this.Z, a[Id], a[od], a[Ob]) ? this[Cb](a) :(this.fb = Lo ? jt(a[x]) :a[x], 
It && (this.cf = a[Ob]));
}, N.Ik = function() {
this.fb = this.Z = -1;
}, N.Bj = function(a) {
this.Ik(), this.cf = a[Ob];
}, va(N, function(a) {
var c, e, b = a.U, f = b[Ob];
S && a[F] == Dk ? (c = this.fb, e = 13 != c && 27 != c ? b[x] :0) :Mo && a[F] == Dk ? (c = this.fb, 
e = 0 <= b[sb] && 63232 > b[sb] && it(c) ? b[sb] :0) :Ko ? (c = this.fb, e = it(c) ? b[x] :0) :(c = b[x] || this.fb, 
e = b[sb] || 0, It && (f = this.cf), Fo && 63 == e && 224 == c && (c = 191));
var h = c, k = b.keyIdentifier;
c ? c >= 63232 && c in Ft ? h = Ft[c] :25 == c && a[Id] && (h = 9) :k && k in Gt && (h = Gt[k]), 
a = h == this.Z, this.Z = h, b = new Jt(h, e, a, b), ya(b, f), this[w](b);
}), N.a = function() {
return this.i;
}, N.Nf = function(a, b) {
this.Fd && this.detach(), this.i = a, this.Ed = Gq(this.i, Dk, this, b), this.Ue = Gq(this.i, Ck, this.Aj, b, this), 
this.Fd = Gq(this.i, Ek, this.Bj, b, this);
}, N.detach = function() {
this.Ed && (Lq(this.Ed), Lq(this.Ue), Lq(this.Fd), this.Fd = this.Ue = this.Ed = l), 
this.i = l, this.fb = this.Z = -1;
}, N.j = function() {
Et.b.j[L](this), this.detach();
}, R(Jt, yq);
var Lt;
tn(Kt), N = Kt[J], N.gb = function() {}, N.d = function(a) {
var b = a.r().d(Hi, this.Zb(a)[Od](Td), a.ia);
return this.mg(a, b), b;
}, N.N = function(a) {
return a;
}, N.zd = function(a, b, c) {
if (a = a.a ? a.a() :a) if (S && !Zo(Bf)) {
var e = this.lg(Ip(a), b);
e[C](b), Jn(c ? Jp :Kp, a)[rc](l, e);
} else c ? Jp(a, b) :Kp(a, b);
}, N.Yg = function(a, b, c) {
this.zd(a, b, c);
}, N.Ob = function(a) {
a.ie() && this.Wb(a.a(), j), a[gc]() && this.sb(a, a.o);
}, N.mi = function(a, b) {
var c = b || this.gb();
c && a[Ab](Rl, c);
}, N.mg = function(a, b) {
a[gc]() || this.Ea(b, 1, j), a.Sj() && this.Ea(b, 8, j), a.R(16) && this.Ea(b, 16, a.he()), 
a.R(64) && this.Ea(b, 64, a.sc());
}, N.bd = function(a, b) {
xs(a, !b, !S && !Ko);
}, N.Wb = function(a, b) {
this.zd(a, this.gc() + Te, b);
}, N.kb = function(a) {
var b;
return a.R(32) && (b = a.M()) ? fq(b) :m;
}, N.sb = function(a, b) {
var c;
if (a.R(32) && (c = a.M())) {
if (!b && a.Zg()) {
try {
c.blur();
} catch (e) {}
a.Zg() && a.rb(l);
}
fq(c) != b && gq(c, b);
}
}, N.F = function(a, b) {
vs(a, b);
}, Pa(N, function(a, b, c) {
var e = a.a();
if (e) {
var f = this.jd(b);
f && this.zd(a, f, c), this.Ea(e, b, c);
}
}), N.Ea = function(a, b, c) {
Lt || (Lt = {
1:Ei,
8:Wl,
16:hi,
64:Si
}), (b = Lt[b]) && gt(a, b, c);
}, Ja(N, function(a, b) {
var c = this.N(a);
if (c && (Zp(c), b)) if (Q(b)) if (Dm in c) c.textContent = b; else if (c[xb] && 3 == c[xb][Ec]) {
for (;c[fc] != c[xb]; ) c[ud](c[fc]);
c[xb].data = b;
} else Zp(c), c[Va](Np(c)[eb](b)); else {
var e = function(a) {
if (a) {
var b = Np(c);
c[Va](Q(a) ? b[eb](a) :a);
}
};
wn(b) ? lo(b, e) :!xn(b) || dl in b ? e(b) :lo(so(b), e);
}
}), N.M = function(a) {
return a.a();
}, N.w = function() {
return Cj;
}, N.gc = function() {
return this.w();
}, N.Zb = function(a) {
var b = this.w(), c = [ b ], e = this.gc();
return e != b && c[C](e), b = this.Ij(a[lc]()), c[C][rc](c, b), (a = a.xa) && c[C][rc](c, a), 
S && !Zo(Bf) && c[C][rc](c, this.lg(c)), c;
}, N.lg = function(a, b) {
var c = [];
return b && (a = a[cb]([ b ])), lo([], function(e) {
oo(e, Jn(po, a)) && (!b || po(e, b)) && c[C](e[Od](th));
}), c;
}, N.Ij = function(a) {
for (var b = []; a; ) {
var c = a & -a;
b[C](this.jd(c)), a &= ~c;
}
return b;
}, N.jd = function(a) {
return this.wh || this.Kk(), this.wh[a];
}, N.Kk = function() {
var a = this.gc();
this.wh = {
1:a + He,
2:a + Me,
4:a + ze,
8:a + Ue,
16:a + Ee,
32:a + Je,
64:a + Re
};
};
var Nt = {};
R(Ot, rt), N = Ot[J], N.ia = l, N.Ha = 0, N.qc = 39, N.Qd = 255, N.Ld = 0, N.o = j, 
N.xa = l, N.be = j, N.ae = m, N.Nb = l, N.ee = function(a) {
this.q && a != this.be && this.Kf(a), this.be = a;
}, N.M = function() {
return this.k.M(this);
}, N.Wc = function() {
return this.ca || (this.ca = new Et());
}, N.Pk = function(a) {
a && (this.xa ? po(this.xa, a) || this.xa[C](a) :this.xa = [ a ], this.k.Yg(this, a, j));
}, N.Sk = function(a) {
a && this.xa && (qo(this.xa, a), 0 == this.xa[I] && (this.xa = l), this.k.Yg(this, a, m));
}, N.zd = function(a, b) {
b ? this.Pk(a) :this.Sk(a);
}, N.d = function() {
var a = this.k.d(this);
this.Xf(a), this.k.mi(a, this.Nb), this.ae || this.k.bd(a, m), this.o || this.k.F(a, m);
}, N.wf = function(a) {
this.Nb = a;
}, N.N = function() {
return this.k.N(this.a());
}, N.I = function() {
if (Ot.b.I[L](this), this.k.Ob(this), -2 & this.qc && (this.be && this.Kf(j), this.R(32))) {
var a = this.M();
if (a) {
var b = this.Wc();
b.Nf(a), this.O().h(b, Bk, this.qa).h(a, Wi, this.Xc).h(a, Nh, this.rb);
}
}
}, N.Kf = function(a) {
var b = this.O(), c = this.a();
a ? (b.h(c, Yk, this.ne).h(c, Vk, this.lb).h(c, Zk, this.qb).h(c, Xk, this.me), 
this.wc != sn && b.h(c, oi, this.wc), S && b.h(c, xi, this.Tf)) :(b.W(c, Yk, this.ne).W(c, Vk, this.lb).W(c, Zk, this.qb).W(c, Xk, this.me), 
this.wc != sn && b.W(c, oi, this.wc), S && b.W(c, xi, this.Tf));
}, N.T = function() {
Ot.b.T[L](this), this.ca && this.ca.detach(), this.o && this[gc]() && this.k.sb(this, m);
}, N.j = function() {
Ot.b.j[L](this), this.ca && (this.ca.V(), delete this.ca), delete this.k, this.xa = this.ia = l;
}, Ja(N, function(a) {
this.k[Yc](this.a(), a), this.Sf(a);
}), N.Sf = function(a) {
this.ia = a;
}, N.uc = function() {
var a = this.ia;
if (!a) return M;
if (!Q(a)) if (wn(a)) a = no(a, hq)[Od](M); else {
if (Hp && vk in a) a = a.innerText[v](/(\r\n|\r|\n)/g, Rd); else {
var b = [];
iq(a, b, j), a = b[Od](M);
}
a = a[v](/ \xAD /g, Td)[v](/\xAD/g, M), a = a[v](/\u200B/g, M), Hp || (a = a[v](/ +/g, Td)), 
a != Td && (a = a[v](/^\s*/, M));
}
return $n(a);
}, N.Wb = function(a) {
Ot.b.Wb[L](this, a);
var b = this.a();
b && this.k.Wb(b, a);
}, N.bd = function(a) {
this.ae = a;
var b = this.a();
b && this.k.bd(b, a);
}, N.F = function(a, b) {
if (b || this.o != a && this[w](a ? hm :fk)) {
var c = this.a();
return c && this.k.F(c, a), this[gc]() && this.k.sb(this, a), this.o = a, j;
}
return m;
}, N.isEnabled = function() {
return !this.ja(1);
}, N.ra = function(a) {
this.mc(2, a) && this[dd](2, a);
}, N.wa = function() {
return this.ja(4);
}, N.setActive = function(a) {
this.mc(4, a) && this[dd](4, a);
}, N.Sj = function() {
return this.ja(8);
}, N.Ze = function(a) {
this.mc(8, a) && this[dd](8, a);
}, N.he = function() {
return this.ja(16);
}, N.Cj = function(a) {
this.mc(16, a) && this[dd](16, a);
}, N.Zg = function() {
return this.ja(32);
}, N.qh = function(a) {
this.mc(32, a) && this[dd](32, a);
}, N.sc = function() {
return this.ja(64);
}, N.G = function(a) {
this.mc(64, a) && this[dd](64, a);
}, N.getState = function() {
return this.Ha;
}, N.ja = function(a) {
return !!(this.Ha & a);
}, Pa(N, function(a, b) {
this.R(a) && b != this.ja(a) && (this.k[dd](this, a, b), this.Ha = b ? this.Ha | a :this.Ha & ~a);
}), N.jh = function(a) {
this.Ha = a;
}, N.R = function(a) {
return !!(this.qc & a);
}, N.ka = function(a, b) {
this.q && this.ja(a) && !b && d(s(dg)), !b && this.ja(a) && this[dd](a, m), this.qc = b ? this.qc | a :this.qc & ~a;
}, N.Y = function(a) {
return !!(this.Qd & a) && this.R(a);
}, N.nk = function(a, b) {
this.Qd = b ? this.Qd | a :this.Qd & ~a;
}, N.Zf = function(a, b) {
this.Ld = b ? this.Ld | a :this.Ld & ~a;
}, N.mc = function(a, b) {
return !(!this.R(a) || this.ja(a) == b || this.Ld & a && !this[w](tt(a, b)) || this.nc);
}, N.ne = function(a) {
(!a[Ya] || !bq(this.a(), a[Ya])) && this[w](Qi) && this[gc]() && this.Y(2) && this.ra(j);
}, N.me = function(a) {
a[Ya] && bq(this.a(), a[Ya]) || !this[w](Gk) || (this.Y(4) && this[ad](m), this.Y(2) && this.ra(m));
}, N.wc = sn, N.lb = function(a) {
this[gc]() && (this.Y(2) && this.ra(j), a.ke() && (this.Y(4) && this[ad](j), this.k.kb(this) && this.M()[tb]())), 
!this.ae && a.ke() && a[gb]();
}, N.qb = function(a) {
this[gc]() && (this.Y(2) && this.ra(j), this.wa() && this.tb(a) && this.Y(4) && this[ad](m));
}, N.Tf = function(a) {
this[gc]() && this.tb(a);
}, N.tb = function(a) {
this.Y(16) && this.Cj(!this.he()), this.Y(8) && this.Ze(j), this.Y(64) && this.G(!this.sc());
var b = new wq(yh, this);
return a && (ya(b, a[Ob]), b.ctrlKey = a[od], b.metaKey = a[Lc], b.shiftKey = a[Id], 
b.Ve = a.Ve), this[w](b);
}, N.Xc = function() {
this.Y(32) && this.qh(j);
}, N.rb = function() {
this.Y(4) && this[ad](m), this.Y(32) && this.qh(m);
}, N.qa = function(a) {
return this.o && this[gc]() && this.va(a) ? (a[gb](), a[Zb](), j) :m;
}, N.va = function(a) {
return 13 == a[x] && this.tb(a);
}, Cn(Ot) || d(s("Invalid component class " + Ot)), Cn(Kt) || d(s("Invalid renderer class " + Kt));
var Pt = Dn(Ot);
Nt[Pt] = Kt, Mt(Cj, function() {
return new Ot(l);
}), R(Qt, Kt), tn(Qt), N = Qt[J], N.hd = function(a) {
var b = this.yh[a];
if (!b) {
switch (a) {
case 0:
b = this.gc() + Ke;
break;

case 1:
b = this.gc() + De;
break;

case 2:
b = this.gc() + Fe;
}
this.yh[a] = b;
}
return b;
}, N.gb = function() {
return Qk;
}, N.d = function(a) {
var b = a.r().d(Hi, this.Zb(a)[Od](Td), this.xi(a.ia, a.r()));
return this.yi(a, b, a.R(8) || a.R(16)), b;
}, N.N = function(a) {
return a && a[xb];
}, Ja(N, function(a, b) {
var c = this.N(a), e = this.pe(a) ? c[xb] :l;
Qt.b[Yc][L](this, a, b), e && !this.pe(a) && c[hb](e, c[xb] || l);
}), N.xi = function(a, b) {
var c = this.hd(2);
return b.d(Hi, c, a);
}, N.pe = function(a) {
if (a = this.N(a)) {
a = a[xb];
var b = this.hd(1);
return !!a && po(Ip(a), b);
}
return m;
}, N.yi = function(a, b, c) {
c != this.pe(b) && (c ? Jp(b, Nj) :Kp(b, Nj), b = this.N(b), c ? (c = this.hd(1), 
b[hb](a.r().d(Hi, c), b[xb] || l)) :b[ud](b[xb]));
}, N.jd = function(a) {
switch (a) {
case 2:
return this.hd(0);

case 16:
case 8:
return Oj;

default:
return Qt.b.jd[L](this, a);
}
}, N.w = function() {
return Ij;
}, R(Rt, Ot), N = Rt[J], Ka(N, function() {
var a = this.ge;
return a != l ? a :this.uc();
}), Ra(N, function(a) {
this.el(a);
}), N.uc = function() {
var a = this.ia;
return wn(a) ? (a = no(a, function(a) {
var c = Ip(a);
return po(c, Jj) || po(c, Kj) ? M :hq(a);
})[Od](M), $n(a)) :Rt.b.uc[L](this);
}, N.qb = function(a) {
var b = this[Xa]();
if (b) {
var c = b.Yf;
if (b.Yf = l, (b = c && Bn(a[bd])) && (b = new yo(a[bd], a[cd]), b = c == b ? j :c && b ? c.x == b.x && c.y == b.y :m), 
b) return;
}
Rt.b.qb[L](this, a);
}, N.va = function(a) {
return a[x] == this.kg && this.tb(a) ? j :Rt.b.va[L](this, a);
}, N.wi = function() {
return this.kg;
}, Mt(Ij, function() {
return new Rt(l);
}), Tt[J].pc = function() {}, R(Ut, Tt), Ut[J].pc = function(a, b, c) {
St(this[Kd], this.dd, a, b, g, c, this.Dk);
}, R(Vt, Ut), Vt[J].vk = function() {
return this.Md;
}, Vt[J].dl = function(a) {
this.Md = a;
}, Vt[J].pc = function(a, b, c, e) {
var f = St(this[Kd], this.dd, a, b, l, c, 10, e, this.pf);
if (496 & f) {
var h = this.Pd(f, this.dd);
b = this.Pd(f, b), f = St(this[Kd], h, a, b, l, c, 10, e, this.pf), 496 & f && (h = this.Pd(f, h), 
b = this.Pd(f, b), St(this[Kd], h, a, b, l, c, this.Md, e, this.pf));
}
}, Vt[J].Pd = function(a, b) {
return 48 & a && (b ^= 2), 192 & a && (b ^= 1), b;
}, R(Wt, Vt);
var Xt, Yt;
Yt = Xt = m;
var Zt = Go();
Zt && (-1 != Zt[D]("Firefox") || -1 != Zt[D]("Camino") || (-1 != Zt[D]("iPhone") || -1 != Zt[D]("iPod") ? Xt = j :-1 != Zt[D]("iPad") ? Yt = j :-1 != Zt[D]("Android") || -1 != Zt[D]("Chrome") || Zt[D]("Safari")));
var $t = Xt, au = Yt;
R(bu, Kt), tn(bu), N = bu[J], N.gb = function() {
return ai;
}, N.Ea = function(a, b, c) {
16 == b ? gt(a, El, c) :bu.b.Ea[L](this, a, b, c);
}, N.d = function(a) {
var b = bu.b.d[L](this, a), c = a.cd();
return c && this.ce(b, c), (c = a[H]()) && this[kd](b, c), a.R(16) && this.Ea(b, 16, a.he()), 
b;
}, Ka(N, sn), Ra(N, sn), N.cd = function(a) {
return a.title;
}, N.ce = function(a, b) {
a && (a.title = b || M);
}, N.w = function() {
return Aj;
}, R(cu, bu), tn(cu), N = cu[J], N.gb = function() {}, N.d = function(a) {
return this.Ji(a), a.r().d(ai, {
"class":this.Zb(a)[Od](Td),
disabled:!a[gc](),
title:a.cd() || M,
value:a[H]() || M
}, a.uc() || M);
}, N.Ob = function(a) {
a.O().h(a.a(), ji, a.tb);
}, N.bd = sn, N.Wb = sn, N.kb = function(a) {
return a[gc]();
}, N.sb = sn, Pa(N, function(a, b, c) {
cu.b[dd][L](this, a, b, c), (a = a.a()) && 1 == b && (a.disabled = c);
}), Ka(N, function(a) {
return a[Kc];
}), Ra(N, function(a, b) {
a && (a.value = b);
}), N.Ea = sn, N.Ji = function(a) {
a.ee(m), a.nk(255, m), a.ka(32, m);
}, R(du, Ot), N = du[J], Ka(N, function() {
return this.Qf;
}), Ra(N, function(a) {
this.Qf = a, this.k[kd](this.a(), a);
}), N.cd = function() {
return this.Of;
}, N.ce = function(a) {
this.Of = a, this.k.ce(this.a(), a);
}, N.j = function() {
du.b.j[L](this), delete this.Qf, delete this.Of;
}, N.I = function() {
if (du.b.I[L](this), this.R(32)) {
var a = this.M();
a && this.O().h(a, Ek, this.va);
}
}, N.va = function(a) {
return 13 == a[x] && a[F] == Bk || 32 == a[x] && a[F] == Ek ? this.tb(a) :32 == a[x];
}, Mt(Aj, function() {
return new du(l);
}), R(eu, Kt), tn(eu), eu[J].d = function(a) {
return a.r().d(Hi, this.w());
}, Ja(eu[J], function() {}), eu[J].w = function() {
return Lj;
}, R(fu, Ot), fu[J].I = function() {
fu.b.I[L](this), this.a()[Ab](Rl, Xl);
}, Mt(Lj, function() {
return new fu();
}), tn(gu), N = gu[J], N.gb = function() {}, N.Rf = function(a, b) {
a && (a.tabIndex = b ? 0 :-1);
}, N.d = function(a) {
return a.r().d(Hi, this.Zb(a)[Od](Td));
}, N.N = function(a) {
return a;
}, N.Ob = function(a) {
a = a.a(), xs(a, j, Lo), S && (a.hideFocus = j);
var b = this.gb();
b && a[Ab](Rl, b);
}, N.M = function(a) {
return a.a();
}, N.w = function() {
return Bj;
}, N.Zb = function(a) {
var b = this.w(), c = [ b, a.Yb == hk ? b + Le :b + Ze ];
return a[gc]() || c[C](b + He), c;
}, R(hu, rt), N = hu[J], N.fe = l, N.ca = l, N.k = l, N.Yb = l, N.o = j, N.nb = j, 
N.De = j, N.ba = -1, N.J = l, N.de = m, N.ni = m, N.li = j, N.Da = l, N.M = function() {
return this.fe || this.k.M(this);
}, N.Wc = function() {
return this.ca || (this.ca = new Et(this.M()));
}, N.d = function() {
this.Xf(this.k.d(this));
}, N.N = function() {
return this.k.N(this.a());
}, N.I = function() {
hu.b.I[L](this), this.jb(function(a) {
a.q && this.Df(a);
}, this);
var a = this.a();
this.k.Ob(this), this.F(this.o, j), this.O().h(this, Qi, this.Ud).h(this, gk, this.Vd).h(this, Tm, this.Wd).h(this, ml, this.Rh).h(this, ki, this.Ph).h(a, Vk, this.lb).h(Np(a), Zk, this.Qh).h(a, [ Vk, Zk, Yk, Xk, oi ], this.Oh), 
this.kb() && this.Ef(j);
}, N.Ef = function(a) {
var b = this.O(), c = this.M();
a ? b.h(c, Wi, this.Xc).h(c, Nh, this.rb).h(this.Wc(), Bk, this.qa) :b.W(c, Wi, this.Xc).W(c, Nh, this.rb).W(this.Wc(), Bk, this.qa);
}, N.T = function() {
this.Ua(-1), this.J && this.J.G(m), this.de = m, hu.b.T[L](this);
}, N.j = function() {
hu.b.j[L](this), this.ca && (this.ca.V(), this.ca = l), this.k = this.J = this.Da = this.fe = l;
}, N.Ud = function() {
return j;
}, N.Vd = function(a) {
var b = this.Vc(a[wd]);
if (b > -1 && b != this.ba) {
var c = this.Rb();
c && c.ra(m), this.ba = b, c = this.Rb(), this.de && c[ad](j), this.li && this.J && c != this.J && (c.R(64) ? c.G(j) :this.J.G(m));
}
gt(this.a(), Ah, a[wd].a().id);
}, N.Wd = function(a) {
a[wd] == this.Rb() && (this.ba = -1), gt(this.a(), Ah, M);
}, N.Rh = function(a) {
(a = a[wd]) && a != this.J && a[Xa]() == this && (this.J && this.J.G(m), this.J = a);
}, N.Ph = function(a) {
a[wd] == this.J && (this.J = l);
}, N.lb = function(a) {
this.nb && this.Pb(j);
var b = this.M();
b && fq(b) ? b[tb]() :a[gb]();
}, N.Qh = function() {
this.Pb(m);
}, N.Oh = function(a) {
var b = this.Xj(a[wd]);
if (b) switch (a[F]) {
case Vk:
b.lb(a);
break;

case Zk:
b.qb(a);
break;

case Yk:
b.ne(a);
break;

case Xk:
b.me(a);
break;

case oi:
b.wc(a);
}
}, N.Xj = function(a) {
if (this.Da) for (var b = this.a(); a && a !== b; ) {
var c = a.id;
if (c in this.Da) return this.Da[c];
a = a[Md];
}
return l;
}, N.Xc = function() {}, N.rb = function() {
this.Ua(-1), this.Pb(m), this.J && this.J.G(m);
}, N.qa = function(a) {
return this[gc]() && this.o && (0 != this.Sa() || this.fe) && this.va(a) ? (a[gb](), 
a[Zb](), j) :m;
}, N.va = function(a) {
var b = this.Rb();
if (b && typeof b.qa == aj && b.qa(a) || this.J && this.J != b && typeof this.J.qa == aj && this.J.qa(a)) return j;
if (a[Id] || a[od] || a[Lc] || a[Ob]) return m;
switch (a[x]) {
case 27:
if (!this.kb()) return m;
this.M().blur();
break;

case 36:
this.Wi();
break;

case 35:
this.Xi();
break;

case 38:
if (this.Yb != an) return m;
this.Re();
break;

case 37:
if (this.Yb != hk) return m;
this.ie() ? this.Qe() :this.Re();
break;

case 40:
if (this.Yb != an) return m;
this.Qe();
break;

case 39:
if (this.Yb != hk) return m;
this.ie() ? this.Re() :this.Qe();
break;

default:
return m;
}
return j;
}, N.Df = function(a) {
var b = a.a(), b = b.id || (b.id = a.Mb());
this.Da || (this.Da = {}), this.Da[b] = a;
}, N.Cd = function(a, b) {
hu.b.Cd[L](this, a, b);
}, N.yc = function(a, b, c) {
a.Zf(2, j), a.Zf(64, j), (this.kb() || !this.ni) && a.ka(32, m), a.ee(m), hu.b.yc[L](this, a, b, c), 
a.q && this.q && this.Df(a), b <= this.ba && this.ba++;
}, N.removeChild = function(a, b) {
if (a = Q(a) ? this.$d(a) :a) {
var c = this.Vc(a);
-1 != c && (c == this.ba ? a.ra(m) :c < this.ba && this.ba--), (c = a.a()) && c.id && this.Da && Ap(this.Da, c.id);
}
return a = hu.b[ud][L](this, a, b), a.ee(j), a;
}, N.F = function(a, b) {
if (b || this.o != a && this[w](a ? hm :fk)) {
this.o = a;
var c = this.a();
return c && (vs(c, a), this.kb() && this.k.Rf(this.M(), this.nb && this.o), b || this[w](this.o ? Dh :Ch)), 
j;
}
return m;
}, N.isEnabled = function() {
return this.nb;
}, N.kb = function() {
return this.De;
}, N.sb = function(a) {
a != this.De && this.q && this.Ef(a), this.De = a, this.nb && this.o && this.k.Rf(this.M(), a);
}, N.Ua = function(a) {
(a = this.Ba(a)) ? a.ra(j) :-1 < this.ba && this.Rb().ra(m);
}, N.ra = function(a) {
this.Ua(this.Vc(a));
}, N.Rb = function() {
return this.Ba(this.ba);
}, N.Wi = function() {
this.Nd(function(a, b) {
return (a + 1) % b;
}, this.Sa() - 1);
}, N.Xi = function() {
this.Nd(function(a, b) {
return a--, 0 > a ? b - 1 :a;
}, 0);
}, N.Qe = function() {
this.Nd(function(a, b) {
return (a + 1) % b;
}, this.ba);
}, N.Re = function() {
this.Nd(function(a, b) {
return a--, 0 > a ? b - 1 :a;
}, this.ba);
}, N.Nd = function(a, b) {
for (var c = 0 > b ? this.Vc(this.J) :b, e = this.Sa(), c = a[L](this, c, e), f = 0; e >= f; ) {
var h = this.Ba(c);
if (h && this.Xg(h)) return this.Gj(c), j;
f++, c = a[L](this, c, e);
}
return m;
}, N.Xg = function(a) {
return a.o && a[gc]() && a.R(2);
}, N.Gj = function(a) {
this.Ua(a);
}, N.Pb = function(a) {
this.de = a;
}, R(iu, Kt), tn(iu), iu[J].w = function() {
return Hj;
}, R(ju, Ot), Mt(Hj, function() {
return new ju(l);
}), R(ku, gu), tn(ku), ku[J].gb = function() {
return Pk;
}, ku[J].ub = function(a, b) {
return bq(a.a(), b);
}, ku[J].w = function() {
return Fj;
}, ku[J].Ob = function(a) {
ku.b.Ob[L](this, a), gt(a.a(), ak, Qm);
}, Mt(Lj, function() {
return new fu();
}), R(lu, hu), N = lu[J], N.te = j, N.Oj = m, N.w = function() {
return this.k.w();
}, N.ub = function(a) {
if (this.k.ub(this, a)) return j;
for (var b = 0, c = this.Sa(); c > b; b++) {
var e = this.Ba(b);
if (typeof e.ub == aj && e.ub(a)) return j;
}
return m;
}, N.Xa = function(a) {
this.Cd(a, j);
}, N.bc = function(a, b) {
this.yc(a, b, j);
}, N.Oc = function(a) {
return this.Ba(a);
}, N.vf = function() {
return this.Sa();
}, N.hc = function(a, b) {
var c = this.o;
c || vs(this.a(), j);
var e = this.a(), f = a, h = b, k = os(e);
f instanceof yo && (h = f.y, f = f.x), js(e, e[qd] + (f - k.x), e[wc] + (h - k.y)), 
c || vs(this.a(), m);
}, N.ri = function(a) {
(this.te = a) && this.sb(j);
}, N.F = function(a, b, c) {
return (b = lu.b.F[L](this, a, b)) && a && this.q && this.te && this.M()[tb](), 
this.Yf = a && c && Bn(c[bd]) ? new yo(c[bd], c[cd]) :l, b;
}, N.Ud = function(a) {
return this.te && this.M()[tb](), lu.b.Ud[L](this, a);
}, N.Xg = function(a) {
return (this.Oj || a[gc]()) && a.o && a.R(2);
}, N.va = function(a) {
var b = lu.b.va[L](this, a);
return b || this.jb(function(c) {
!b && c.wi && c.kg == a[x] && (this[gc]() && this.ra(c), b = c.qa(a));
}, this), b;
}, N.Ua = function(a) {
lu.b.Ua[L](this, a);
var b = this.Ba(a);
if (b) {
a = this.a();
var b = b.a(), c = os(b), e = os(a), f = Cs(a), h = c.x - e.x - f[E], c = c.y - e.y - f.top, e = a[Cd] - b.offsetHeight, f = a[mc], k = a[ed], f = f + r.min(h, r.max(h - (a[ld] - b[bb]), 0)), k = k + r.min(c, r.max(c - e, 0)), b = new yo(f, k);
a.scrollLeft = b.x, a.scrollTop = b.y;
}
}, R(mu, bu), tn(mu), N = mu[J], N.d = function(a) {
var b = {
"class":Ej + this.Zb(a)[Od](Td),
title:a.cd() || M
}, b = a.r().d(Hi, b, this.le(a.ia, a.r()));
return this.mg(a, b), b;
}, N.gb = function() {
return ai;
}, N.N = function(a) {
return a && a[xb][xb];
}, N.le = function(a, b) {
return b.d(Hi, Ej + (this.w() + Se), b.d(Hi, Ej + (this.w() + Ne), a));
}, N.w = function() {
return Dj;
}, R(nu, mu), tn(nu), Lo && Ja(nu[J], function(a, b) {
var c = nu.b.N[L](this, a && a[xb]);
if (c) {
var e = this.createCaption(b, Lp(a)), f = c[Md];
f && f.replaceChild(e, c);
}
}), N = nu[J], N.N = function(a) {
return a = nu.b.N[L](this, a && a[xb]), Lo && a && a.__goog_wrapper_div && (a = a[xb]), 
a;
}, N.le = function(a, b) {
return nu.b.le[L](this, [ this.createCaption(a, b), this.aj(b) ], b);
}, N.createCaption = function(a, b) {
return b.d(Hi, Ej + (this.w() + Ce), a);
}, N.aj = function(a) {
return a.d(Hi, Ej + (this.w() + Ie), nn);
}, N.w = function() {
return Gj;
}, R(ou, du), N = ou[J], N.Tc = m, N.Uh = m, N.I = function() {
ou.b.I[L](this), this.e && this.Uc(this.e, j), gt(this.a(), ak, Qm);
}, N.T = function() {
if (ou.b.T[L](this), this.e) {
this.G(m), this.e.T(), this.Uc(this.e, m);
var a = this.e.a();
a && aq(a);
}
}, N.j = function() {
ou.b.j[L](this), this.e && (this.e.V(), delete this.e), delete this.Sh, this.aa.V();
}, N.lb = function(a) {
ou.b.lb[L](this, a), this.wa() && (this.G(!this.sc(), a), this.e && this.e.Pb(this.sc()));
}, N.qb = function(a) {
ou.b.qb[L](this, a), this.e && !this.wa() && this.e.Pb(m);
}, N.tb = function() {
return this[ad](m), j;
}, N.ii = function(a) {
this.e && this.e.o && !this.ub(a[wd]) && this.G(m);
}, N.ub = function(a) {
return a && bq(this.a(), a) || this.e && this.e.ub(a) || m;
}, N.va = function(a) {
if (32 == a[x]) {
if (a[gb](), a[F] != Ek) return j;
} else if (a[F] != Bk) return m;
if (this.e && this.e.o) {
var b = this.e.qa(a);
return 27 == a[x] ? (this.G(m), j) :b;
}
return 40 == a[x] || 38 == a[x] || 32 == a[x] || 13 == a[x] ? (this.G(j), j) :m;
}, N.ue = function() {
this.G(m);
}, N.ji = function() {
this.wa() || this.G(m);
}, N.rb = function(a) {
this.Tc || this.G(m), ou.b.rb[L](this, a);
}, N.vc = function() {
return this.e || this.$c(new lu(this.r())), this.e || l;
}, N.$c = function(a) {
var b = this.e;
return a != b && (b && (this.G(m), this.q && this.Uc(b, m), delete this.e), a && (this.e = a, 
a.Xd(this), a.F(m), a.ri(this.Tc), this.q && this.Uc(a, j))), b;
}, N.Xa = function(a) {
this.vc().Cd(a, j);
}, N.bc = function(a, b) {
this.vc().yc(a, b, j);
}, N.Oc = function(a) {
return this.e ? this.e.Ba(a) :l;
}, N.vf = function() {
return this.e ? this.e.Sa() :0;
}, N.F = function(a, b) {
var c = ou.b.F[L](this, a, b);
return c && !this.o && this.G(m), c;
}, N.hi = function() {
return this.Yc.vk && !!(32 & this.Yc.Md);
}, N.Ej = function(a) {
this.Tc = a;
}, N.G = function(a, b) {
if (ou.b.G[L](this, a), this.e && this.ja(64) == a) {
if (a) this.e.q || (this.Uh ? this.e.mb(this.a()[Md]) :this.e.mb()), this.pb = ns(this.a()), 
this.ob = ts(this.a()), this.Hf(), this.e.Ua(-1); else if (this[ad](m), this.e.Pb(m), 
this.a() && gt(this.a(), Ah, M), this.Rc != l) {
this.Rc = g;
var c = this.e.a();
c && qs(c, M, M);
}
this.e.F(a, m, b), this.nc || this.Th(a);
}
}, N.Hf = function() {
if (this.e.q) {
var a = this.Yc;
this.Yc.element = this.Sh || this.a();
var b = this.e.a();
this.e.o || (Oa(b[z], ek), vs(b, j)), !this.Rc && this.hi() && (this.Rc = rs(b)), 
a.pc(b, 1 ^ a.dd, this.ei, this.Rc), this.e.o || (vs(b, m), Oa(b[z], bn));
}
}, N.ki = function() {
var a = ts(this.a()), b = ns(this.a());
(this.ob != a && (this.ob && a ? this.ob[E] != a[E] || this.ob[u] != a[u] || this.ob.top != a.top || this.ob[B] != a[B] :!0) || this.pb != b && (this.pb && b ? this.pb.top != b.top || this.pb[zc] != b[zc] || this.pb[oc] != b[oc] || this.pb[E] != b[E] :!0)) && (this.ob = a, 
this.pb = b, this.Hf());
}, N.Uc = function(a, b) {
var c = this.O(), e = b ? c.h :c.W;
e[L](c, a, yh, this.ue), e[L](c, a, gk, this.Vd), e[L](c, a, Tm, this.Wd);
}, N.Vd = function(a) {
gt(this.a(), Ah, a[wd].a().id);
}, N.Wd = function() {
this.e.Rb() || gt(this.a(), Ah, M);
}, N.Th = function(a) {
var b = this.O(), c = a ? b.h :b.W;
c[L](b, this.r().m, Vk, this.ii, j), this.Tc && c[L](b, this.e, Nh, this.ji), c[L](b, this.aa, Em, this.ki), 
a ? this.aa.start() :this.aa[fd]();
}, Mt(Gj, function() {
return new ou(l);
}), R(pu, Rq), N = pu[J], N.Fb = l, N.Dh = l, N.vf = function() {
return this.Eb[I];
}, N.Ck = function(a) {
return a ? ko(this.Eb, a) :-1;
}, N.Oc = function(a) {
return this.Eb[a] || l;
}, N.zk = function(a) {
a && (lo(a, function(a) {
this.Od(a, m);
}, this), to(this.Eb, a));
}, N.Xa = function(a) {
this.bc(a, this.vf());
}, N.bc = function(a, b) {
a && (this.Od(a, m), uo(this.Eb, b, 0, a));
}, N.Hc = function() {
return this.Fb;
}, N.Gb = function(a) {
a != this.Fb && (this.Od(this.Fb, m), this.Fb = a, this.Od(a, j)), this[w](Vl);
}, N.od = function() {
return this.Ck(this.Fb);
}, N.zh = function(a) {
this.Gb(this.Oc(a));
}, N.clear = function() {
var a = this.Eb;
if (!wn(a)) for (var b = a[I] - 1; b >= 0; b--) delete a[b];
Qa(a, 0), this.Fb = l;
}, N.j = function() {
pu.b.j[L](this), delete this.Eb, this.Fb = l;
}, N.Od = function(a, b) {
a && (typeof this.Dh == aj ? this.Dh(a, b) :typeof a.Ze == aj && a.Ze(b));
}, R(qu, ou), N = qu[J], N.u = l, N.re = l, N.I = function() {
qu.b.I[L](this), this.je(), this.Pf(), gt(this.a(), ak, Ti);
}, N.j = function() {
qu.b.j[L](this), this.u && (this.u.V(), this.u = l), this.re = l;
}, N.ue = function(a) {
this.Gb(a[wd]), qu.b.ue[L](this, a), a[Zb](), this[w](yh);
}, N.bj = function() {
var a = this.Hc();
qu.b[kd][L](this, a && a[H]()), this.je();
}, N.$c = function(a) {
var b = qu.b.$c[L](this, a);
return a != b && (this.u && this.u.clear(), a && (this.u ? a.jb(function(a) {
this.pd(a), this.u.Xa(a);
}, this) :this.ve(a))), b;
}, N.Jk = function(a) {
this.re = a, this.je();
}, N.Xa = function(a) {
this.pd(a), qu.b.Xa[L](this, a), this.u ? this.u.Xa(a) :this.ve(this.vc());
}, N.bc = function(a, b) {
this.pd(a), qu.b.bc[L](this, a, b), this.u ? this.u.bc(a, b) :this.ve(this.vc());
}, N.Gb = function(a) {
if (this.u) {
var b = this.Hc();
this.u.Gb(a), a != b && this[w](di);
}
}, N.zh = function(a) {
this.u && this.Gb(this.u.Oc(a));
}, Ra(N, function(a) {
if (a != l && this.u) for (var c, b = 0; c = this.u.Oc(b); b++) if (c && typeof c[H] == aj && c[H]() == a) return this.Gb(c), 
void 0;
this.Gb(l);
}), N.Hc = function() {
return this.u ? this.u.Hc() :l;
}, N.od = function() {
return this.u ? this.u.od() :-1;
}, N.ve = function(a) {
this.u = new pu(), a && a.jb(function(a) {
this.pd(a), this.u.Xa(a);
}, this), this.Pf();
}, N.Pf = function() {
this.u && this.O().h(this.u, Vl, this.bj);
}, N.je = function() {
var a = this.Hc();
this[Yc](a ? a.uc() :this.re);
}, N.pd = function(a) {
a.wf(a instanceof Rt ? nl :Xl);
}, N.G = function(a, b) {
qu.b.G[L](this, a, b), this.sc() && this.vc().Ua(this.od());
}, Mt("goog-select", function() {
return new qu(l);
}), N = ru[J], N.ac = l, N.ik = function(a) {
a = a || [];
var b = this.xc, c = this.Wa;
c.qg(b), b || d(s("Container is not defined"));
var e = c.d(mm, l), f = [ c.d(mm, l, bg), c.d(Hi, {
"class":Vj
}, pn) ];
if (this.ac = new qu(f), a) for (f = 0; f < a[I]; f++) {
var h = l, k = a[f], n = k.datasource, t = k.gadget, y = k.userprefs, A = k[K], G = k[tl], ia = k[z] || en;
switch (k[F]) {
case si:
h = this.Jc(f, Jn(function(a) {
ea[Bc](new ar(a).nd(Nm, pl), qg);
}, n), lg, Qj);
break;

case jk:
h = this.Jc(f, Jn(function(a, b) {
su(2, {
message:Jf + ia + ae + ca(a) + pe + ca(b) + tu(y) + $d
});
}, t, n), Qg, Sj);
break;

case zk:
h = this.Jc(f, Jn(function(a, b, c) {
su(3, {
message:If + ca(b) + re + a + qe + ca(c) + te
});
}, n, G, A), Ag, Sj);
break;

case ik:
h = this.Jc(f, Jn(function(a) {
ea[Bc](new ar(a).nd(Nm, ql), qg);
}, n), mg, Qj);
break;

case sk:
h = this.Jc(f, Jn(function(a, b, c) {
ea[Bc](nk + ca(a) + pe + ca(b) + tu(c));
}, t, n, y), Sf, Rj);
break;

default:
d(s("No such toolbar component as: " + k.toSource()));
}
h && this.ac.Xa(h);
}
Gq(this.ac, yh, In(this.Bi, this)), this.ac.mb(e), c[Va](b, e);
}, N.ok = function() {
this.ac.zh(-1);
}, N.Bi = function() {
var a = this.ac.od();
this.dh[a](), this.ok();
}, N.Jc = function(a, b, c) {
return c = new Rt(c), this.dh[a] = b, c;
}, p("google.visualization.drawChart", Ps), p("google.visualization.drawFromUrl", function(a, b) {
var f, c = new ar(b || ha[ac][pc]), e = c.kh(Ak);
e != l ? f = e :(f = {}, lo(c.ga.Lb(), function(a) {
var b = c.kh(a);
try {
b != l && (b = Wn(b));
} catch (e) {}
f[a] = b;
}), f.options = Cp(f)), Ps(f, a);
}), p("google.visualization.createUrl", function(a, b) {
Q(a) && (a = Wn(a));
var e, f, c = [];
for (f in a) if (f == ol) {
var k, h = a[f];
for (k in h) e = h[k], Q(e) || (e = Tn(e)), c[C](k + Lf + ca(oa(e)));
} else e = a[f], Q(e) || (e = Cn(e[Sb]) ? e[Sb]() :Tn(e)), c[C](f + Lf + ca(oa(e)));
return e = Es() + kf, e = e[v](/^https?:/, M), c = (b || e) + Nf + c[Od](ie), c = c[v](/'/g, he), 
c = c[v](/"/g, ge);
}), p("google.visualization.createSnippet", function(a) {
var b = Es() + lf, b = b[v](/^https?:/, M), b = Kf + b + ce;
return a = Qs(a)[Sb](), a = a[v](/</g, le), a = a[v](/>/g, ke), b = b + a + Sd;
}), p("google.visualization.createWrapper", Qs), p("google.visualization.ChartWrapper", Y), 
q(Y[J], Li, Y[J][zd]), q(Y[J], Hm, Y[J][Sb]), q(Y[J], xj, Y[J].getSnapshot), q(Y[J], lj, Y[J][vd]), 
q(Y[J], mj, Y[J][fb]), q(Y[J], "getChartName", Y[J].getChartName), q(Y[J], "getChartType", Y[J].getChartType), 
q(Y[J], "getChart", Y[J].getChart), q(Y[J], kj, Y[J][nc]), q(Y[J], sj, Y[J][Ed]), 
q(Y[J], tj, Y[J][Hd]), q(Y[J], uj, Y[J][Bd]), q(Y[J], "getView", Y[J][Pb]), q(Y[J], "getOption", Y[J][ec]), 
q(Y[J], "getOptions", Y[J][Hc]), q(Y[J], "getState", Y[J][lc]), q(Y[J], "getCustomRequestHandler", Y[J].getCustomRequestHandler), 
q(Y[J], "pushView", Y[J].pushView), q(Y[J], "sendQuery", Y[J].sendQuery), q(Y[J], bm, Y[J][Ub]), 
q(Y[J], cm, Y[J][ic]), q(Y[J], "setChart", Y[J].setChart), q(Y[J], "setChartName", Y[J].setChartName), 
q(Y[J], "setChartType", Y[J].setChartType), q(Y[J], am, Y[J].setContainerId), q(Y[J], em, Y[J].setPackages), 
q(Y[J], fm, Y[J][sd]), q(Y[J], gm, Y[J][Wc]), q(Y[J], "setView", Y[J][rd]), q(Y[J], "setOption", Y[J][Qd]), 
q(Y[J], dm, Y[J].setOptions), q(Y[J], "setState", Y[J][dd]), q(Y[J], "setCustomRequestHandler", Y[J].setCustomRequestHandler), 
p("google.visualization.ControlWrapper", Z), q(Z[J], Li, Z[J][zd]), q(Z[J], Hm, Z[J][Sb]), 
q(Z[J], xj, Z[J].getSnapshot), q(Z[J], lj, Z[J][vd]), q(Z[J], mj, Z[J][fb]), q(Z[J], "getControlName", Z[J].getControlName), 
q(Z[J], "getControlType", Z[J].getControlType), q(Z[J], "getControl", Z[J].getControl), 
q(Z[J], kj, Z[J][nc]), q(Z[J], sj, Z[J][Ed]), q(Z[J], tj, Z[J][Hd]), q(Z[J], uj, Z[J][Bd]), 
q(Z[J], "getView", Z[J][Pb]), q(Z[J], "getOption", Z[J][ec]), q(Z[J], "getOptions", Z[J][Hc]), 
q(Z[J], "getState", Z[J][lc]), q(Z[J], "sendQuery", Z[J].sendQuery), q(Z[J], bm, Z[J][Ub]), 
q(Z[J], cm, Z[J][ic]), q(Z[J], "setControlName", Z[J].setControlName), q(Z[J], "setControlType", Z[J].setControlType), 
q(Z[J], am, Z[J].setContainerId), q(Z[J], em, Z[J].setPackages), q(Z[J], fm, Z[J][sd]), 
q(Z[J], gm, Z[J][Wc]), q(Z[J], "setView", Z[J][rd]), q(Z[J], "setOption", Z[J][Qd]), 
q(Z[J], dm, Z[J].setOptions), q(Z[J], "setState", Z[J][dd]), p("google.visualization.DashboardWrapper", $), 
q($[J], Li, $[J][zd]), q($[J], Hm, $[J][Sb]), q($[J], "getBindings", $[J].getBindings), 
q($[J], lj, $[J][vd]), q($[J], mj, $[J][fb]), q($[J], "getDashboard", $[J].getDashboard), 
q($[J], "getDashboardName", $[J].getDashboardName), q($[J], kj, $[J][nc]), q($[J], sj, $[J][Ed]), 
q($[J], tj, $[J][Hd]), q($[J], uj, $[J][Bd]), q($[J], "getView", $[J][Pb]), q($[J], "getWrappers", $[J].getWrappers), 
q($[J], "setBindings", $[J].setBindings), q($[J], bm, $[J][Ub]), q($[J], cm, $[J][ic]), 
q($[J], "setDashboardName", $[J].setDashboardName), q($[J], am, $[J].setContainerId), 
q($[J], em, $[J].setPackages), q($[J], fm, $[J][sd]), q($[J], gm, $[J][Wc]), q($[J], "setView", $[J][rd]), 
q($[J], xj, $[J].getSnapshot), q($[J], "setWrappers", $[J].setWrappers), p("google.visualization.drawToolbar", function(a, b) {
new ru(a, b);
}), p("google.visualization.data.avg", function(a) {
return Rs(a) / a[I];
}), p("google.visualization.data.count", function(a) {
return a[I];
}), p("google.visualization.data.group", function(a, b, c) {
function e(a, b, c, e) {
return b[L](l, c[H](e, a));
}
var f = [], h = [];
if (lo(b, function(a) {
if (Bn(a)) f[C](a); else if (un(a) == jl) {
var b = a.column;
Uk in a && h[C]([ b, {
calc:Jn(e, b, a.modifier),
type:a[F],
label:a[vc],
id:a.id
} ]), f[C](b);
}
}), 0 != h[I]) {
for (var k = new google[K][Ad](a), n = k.getViewColumns(), t = a[id](), y = 0; t > y; y++) lo(h, function(a) {
n[a[0]] = a[1];
});
k[xc](n), a = k;
}
var A = new google[K].DataTable(), G = [];
lo(f, function(c, e) {
var f = a[wb](c), h = b[e][vc] || a[Qc](c);
A[Jd](f, h, b[e].id), G[C](f);
}), c = c || [], lo(c, function(b) {
var c = b.column, c = b[vc] || a[Qc](c);
A[Jd](b[F], c, b.id);
});
var ia = [];
lo(f, function(a) {
ia[C]({
column:a
});
});
for (var da = a[Sc](ia), lb = [], wa = 0; wa < c[I]; wa++) lb[C]([]);
for (wa = 0; wa < da[I]; wa++) {
if (lo(c, function(b, c) {
lb[c][C](a[H](da[wa], b.column));
}), k = m, wa < da[I] - 1) for (k = j, t = 0; t < f[I]; t++) {
var y = a[H](da[wa], f[t]), Eb = a[H](da[wa + 1], f[t]);
if (0 != google[K].datautils.compareValues(G[t], y, Eb)) {
k = m;
break;
}
}
if (!k) {
var aa = A.addRow();
lo(f, function(b, c) {
A[kd](aa, c, a[H](da[wa], b));
});
var ba = b[I];
for (lo(c, function(a, b) {
var c = a.aggregation[L](l, lb[b]);
A[kd](aa, ba + b, c);
}), k = 0; k < c[I]; k++) lb[k] = [];
}
}
return A;
}), p("google.visualization.data.join", function(a, b, c, e, f, h) {
var k = c == Hk || c == $i, n = c == Ql || c == $i, t = new google[K].DataTable(), y = [];
lo(e, function(c) {
var e = a[wb](c[0]), f = b[wb](c[1]);
e != f && d(s("Key types do not match:" + e + ye + f)), f = t[Jd](e, a[Qc](c[0])), 
t[kb](f, a[Nc](c[0])), y[C](e);
});
var A = [], G = [];
lo(e, function(a) {
A[C]({
column:a[0]
}), G[C]({
column:a[1]
});
});
var ia = a[Sc](A), da = b[Sc](G);
lo(f, function(b) {
var c = t[Jd](a[wb](b), a[Qc](b));
t[kb](c, a[Nc](b));
}), lo(h, function(a) {
var c = t[Jd](b[wb](a), b[Qc](a));
t[kb](c, b[Nc](a));
});
for (var lb = m, wa = 0, Eb = 0, aa = 0; wa < ia[I] || Eb < da[I]; ) {
var ba = 0, V = [];
if (Eb >= da[I]) {
if (!k) break;
V[0] = ia[wa], ba = -1;
} else if (wa >= ia[I]) {
if (!n) break;
V[1] = da[Eb], ba = 1;
} else {
V[0] = ia[wa], V[1] = da[Eb];
for (var La = 0; La < e[I]; La++) {
var ba = a[H](V[0], e[La][0]), O = b[H](V[1], e[La][1]), ba = google[K].datautils.compareValues(y[La], ba, O);
if (0 != ba) break;
}
}
if (lb && 0 != ba) lb = m, Eb++; else {
if (-1 == ba && k || 1 == ba && n || 0 == ba) {
t.addRow();
var $e, hc;
if (-1 == ba && k || 0 == ba && c != Ql ? ($e = a, hc = 0) :($e = b, hc = 1), lo(e, function(a, b) {
c == $i ? t[kd](aa, b, $e[H](V[hc], a[hc])) :t[Hb](aa, b, $e[H](V[hc], a[hc]), $e[Ld](V[hc], a[hc]), $e[jd](V[hc], a[hc]));
}), -1 == ba && k || 0 == ba) {
var bk = e[I];
lo(f, function(b, c) {
t[Hb](aa, c + bk, a[H](V[0], b), a[Ld](V[0], b), a[jd](V[0], b));
});
}
(1 == ba && n || 0 == ba) && (bk = f[I] + e[I], lo(h, function(a, c) {
t[Hb](aa, c + bk, b[H](V[1], a), b[Ld](V[1], a), b[jd](V[1], a));
})), aa++;
}
1 == ba ? Eb++ :wa++, 0 == ba && (lb = j);
}
}
return t;
}), p("google.visualization.data.max", function(a) {
if (0 == a[I]) return l;
for (var b = a[0], c = 1; c < a[I]; c++) {
var e = a[c];
e != l && e > b && (b = e);
}
return b;
}), p("google.visualization.data.min", function(a) {
if (0 == a[I]) return l;
for (var b = a[0], c = 1; c < a[I]; c++) {
var e = a[c];
e != l && b > e && (b = e);
}
return b;
}), p("google.visualization.data.month", function(a) {
return a[gd]() + 1;
}), p("google.visualization.data.sum", Rs), p("__gvizguard__", j), p(Yj, Cr), q(Cr[J], Lk, Cr[J].makeRequest), 
q(Cr[J], gm, Cr[J][Wc]), q(Cr[J], fm, Cr[J][sd]), q(Cr[J], "send", Cr[J][qb]), q(Cr[J], "setRefreshable", Cr[J].setRefreshable), 
q(Cr[J], "setTimeout", Cr[J][Tb]), q(Cr[J], "setHandlerType", Cr[J].cl), q(Cr[J], "setHandlerParameter", Cr[J].Eh), 
q(Cr, "setResponse", Lr), q(Cr[J], wh, Cr[J][md]), p("google.visualization.CustomQuery", Vr), 
q(Vr[J], "send", Vr[J][qb]), p("google.visualization.QueryResponse", xr), q(xr[J], mj, xr[J][fb]), 
q(xr[J], "isError", xr[J][Pc]), q(xr[J], "hasWarning", xr[J].hasWarning), q(xr[J], "getReasons", xr[J].getReasons), 
q(xr[J], "getMessage", xr[J].getMessage), q(xr[J], "getDetailedMessage", xr[J].getDetailedMessage), 
p("google.visualization.DataTable", U), q(U[J], "addColumn", U[J][Jd]), q(U[J], "addRow", U[J].addRow), 
q(U[J], "addRows", U[J][$c]), q(U[J], "clone", U[J][dc]), q(U[J], "getColumnId", U[J].getColumnId), 
q(U[J], ej, U[J].getColumnIndex), q(U[J], fj, U[J][Qc]), q(U[J], gj, U[J][$b]), 
q(U[J], ij, U[J][Wb]), q(U[J], hj, U[J][Nc]), q(U[J], jj, U[J].getColumnRange), 
q(U[J], "getColumnRole", U[J].getColumnRole), q(U[J], "getColumnType", U[J][wb]), 
q(U[J], nj, U[J].getDistinctValues), q(U[J], oj, U[J].getFilteredRows), q(U[J], pj, U[J][Ld]), 
q(U[J], qj, U[J][Jc]), q(U[J], rj, U[J][id]), q(U[J], "getProperties", U[J][jd]), 
q(U[J], "getProperty", U[J].getProperty), q(U[J], wj, U[J].getRowProperty), q(U[J], vj, U[J][Vc]), 
q(U[J], "getSortedRows", U[J][Sc]), q(U[J], zj, U[J].getTableProperty), q(U[J], yj, U[J][Db]), 
q(U[J], "getValue", U[J][H]), q(U[J], "insertColumn", U[J].insertColumn), q(U[J], "insertRows", U[J].insertRows), 
q(U[J], "removeColumn", U[J].removeColumn), q(U[J], "removeColumns", U[J].removeColumns), 
q(U[J], "removeRow", U[J].removeRow), q(U[J], "removeRows", U[J].removeRows), q(U[J], "setCell", U[J][Hb]), 
q(U[J], "setColumnLabel", U[J].setColumnLabel), q(U[J], "setColumnProperties", U[J][kb]), 
q(U[J], "setColumnProperty", U[J].setColumnProperty), q(U[J], "setFormattedValue", U[J].setFormattedValue), 
q(U[J], "setProperties", U[J].setProperties), q(U[J], "setProperty", U[J].setProperty), 
q(U[J], "setRowProperties", U[J].setRowProperties), q(U[J], "setRowProperty", U[J].setRowProperty), 
q(U[J], "setTableProperties", U[J].setTableProperties), q(U[J], "setTableProperty", U[J].setTableProperty), 
q(U[J], "setValue", U[J][kd]), q(U[J], "sort", U[J].sort), q(U[J], Hm, U[J][Sb]), 
p("google.visualization.DataView", W), q(W, "fromJSON", function(a, b) {
Q(b) && (b = Wn(b));
var c = new W(a), e = b.columns, f = b[qc];
return e != l && c[xc](e), f != l && c.setRows(f), c;
}), q(W[J], "getColumnId", W[J].getColumnId), q(W[J], ej, W[J].getColumnIndex), 
q(W[J], fj, W[J][Qc]), q(W[J], gj, W[J][$b]), q(W[J], ij, W[J][Wb]), q(W[J], ij, W[J][Wb]), 
q(W[J], hj, W[J][Nc]), q(W[J], jj, W[J].getColumnRange), q(W[J], "getColumnRole", W[J].getColumnRole), 
q(W[J], "getColumnType", W[J][wb]), q(W[J], nj, W[J].getDistinctValues), q(W[J], oj, W[J].getFilteredRows), 
q(W[J], pj, W[J][Ld]), q(W[J], qj, W[J][Jc]), q(W[J], rj, W[J][id]), q(W[J], "getProperties", W[J][jd]), 
q(W[J], "getProperty", W[J].getProperty), q(W[J], wj, W[J].getRowProperty), q(W[J], vj, W[J][Vc]), 
q(W[J], "getSortedRows", W[J][Sc]), q(W[J], "getTableColumnIndex", W[J].getTableColumnIndex), 
q(W[J], "getUnderlyingTableColumnIndex", W[J].getUnderlyingTableColumnIndex), q(W[J], "getTableRowIndex", W[J][Tc]), 
q(W[J], "getUnderlyingTableRowIndex", W[J].getUnderlyingTableRowIndex), q(W[J], zj, W[J].getTableProperty), 
q(W[J], yj, W[J][Db]), q(W[J], "getValue", W[J][H]), q(W[J], "getViewColumnIndex", W[J].getViewColumnIndex), 
q(W[J], "getViewColumns", W[J].getViewColumns), q(W[J], "getViewRowIndex", W[J].getViewRowIndex), 
q(W[J], "getViewRows", W[J].getViewRows), q(W[J], "hideColumns", W[J].hideColumns), 
q(W[J], "hideRows", W[J].hideRows), q(W[J], "setColumns", W[J][xc]), q(W[J], "setRows", W[J].setRows), 
q(W[J], "toDataTable", W[J][Rc]), q(W[J], Hm, W[J][Sb]), p("google.visualization.errors", X), 
q(X, "addError", X[Rb]), q(X, "removeAll", X[xd]), q(X, "removeError", X.removeError), 
q(X, "addErrorFromQueryResponse", X.addErrorFromQueryResponse), q(X, "getContainer", X[tc]), 
q(X, "createProtectedCallback", X.createProtectedCallback), p("google.visualization.events.addListener", function(a, b, c) {
return a = Qr(a), b = Gq(a, b, function(a) {
c(a.$k);
}), new Rr(b);
}), p("google.visualization.events.trigger", function(a, b, c) {
a = Qr(a), Qq(a, new Sr(b, c));
}), p("google.visualization.events.removeListener", function(a) {
return a = a && Cn(a.getKey) && a.getKey(), Bn(a) ? Lq(a) :m;
}), p("google.visualization.events.removeAllListeners", function(a) {
var b = Qr(a), b = Nq(b);
return rq(a.__eventTarget), a.__eventTarget = g, b;
}), p("google.visualization.QueryWrapper", Tr), q(Tr[J], dm, Tr[J].setOptions), 
q(Tr[J], Li, Tr[J][zd]), q(Tr[J], "setCustomErrorHandler", Tr[J].bl), q(Tr[J], "sendAndDraw", Tr[J].sendAndDraw), 
q(Tr[J], "setCustomPostResponseHandler", Tr[J].setCustomPostResponseHandler), q(Tr[J], "setCustomResponseHandler", Tr[J].setCustomResponseHandler), 
q(Tr[J], wh, Tr[J][md]), p("google.visualization.arrayToDataTable", function(a, b) {
var e, f, h, c = new U();
if (wn(a) || d(s("Not an array")), 0 == a[I]) return c;
wn(a[0]) || d(s(Mg));
var k = a[0][I];
for (e = 1; e < a[I]; e++) (!wn(a[e]) || a[e][I] != k) && d(s(Mg));
var n = (e = !b) ? a[0] :[], t = e ? a[Dc](1, a[I]) :a, y = [];
for (f = 0; k > f; f++) {
var A = rm;
for (e = 0; e < t[I]; e++) if (h = t[e][f], h != l) {
Q(h) ? A = rm :Bn(h) ? A = hl :wn(h) ? A = Fm :An(h) ? A = Ph :(yn(h) && d(s("Date and datetime column types are not supported")), 
d(s("Invalid value in " + e + xe + f)));
break;
}
y[f] = A;
}
for (f = 0; k > f; f++) c[Jd](y[f], n[f]);
return c[$c](t), c;
}), p("google.visualization.datautils.compareValues", pr), p("google.visualization.dataTableToCsv", function(a) {
for (var b = M, c = 0; c < a[id](); c++) {
for (var e = 0; e < a[Jc](); e++) {
e > 0 && (b += xe);
var f = a[Ld](c, e), f = f[v](qa(Zd, bj), be), h = -1 != f[D](xe), k = -1 != f[D](Rd), n = -1 != f[D](Zd);
(h || k || n) && (f = Zd + f + Zd), b += f;
}
b += Rd;
}
return b;
}), p("google.visualization.GadgetHelper", Mr), q(Mr[J], "createQueryFromPrefs", Mr[J].createQueryFromPrefs), 
q(Mr[J], "validateResponse", Mr[J].validateResponse);
}
}(), function() {
function d(a) {
throw a;
}
function ka(a, b) {
return a.width = b;
}
function la(a, b) {
return a.value = b;
}
function ma(a, b) {
return a.currentTarget = b;
}
function na(a, b) {
return a.left = b;
}
function oa(a, b) {
return a.screenX = b;
}
function pa(a, b) {
return a.screenY = b;
}
function qa(a, b) {
return a.remove = b;
}
function ra(a, b) {
return a.keyCode = b;
}
function ta(a, b) {
return a.handleEvent = b;
}
function ua(a, b) {
return a.type = b;
}
function va(a, b) {
return a.tabIndex = b;
}
function wa(a, b) {
return a.clear = b;
}
function xa(a, b) {
return a.getValue = b;
}
function ya(a, b) {
return a.clientX = b;
}
function za(a, b) {
return a.clientY = b;
}
function Aa(a, b) {
return a.visibility = b;
}
function Ba(a, b) {
return a.stop = b;
}
function Ca(a, b) {
return a.altKey = b;
}
function Da(a, b) {
return a.length = b;
}
function Ea(a, b) {
return a.setValue = b;
}
function Fa(a, b) {
return a.className = b;
}
function Ga(a, b) {
return a.next = b;
}
function Ha(a, b) {
return a.clone = b;
}
function Ia(a, b) {
return a.target = b;
}
function Ja(a, b) {
return a.isEnabled = b;
}
function Ka(a, b) {
return a.draw = b;
}
function La(a, b) {
return a.coords = b;
}
function Ma(a, b) {
return a.getState = b;
}
function Na(a, b) {
return a.bottom = b;
}
function Oa(a, b) {
return a.contains = b;
}
function Pa(a, b) {
return a.startTime = b;
}
function Qa(a, b) {
return a.height = b;
}
function Ra(a, b) {
return a.right = b;
}
function ck(a, b) {
for (var f, c = a[oc]($d), e = b || bk; f = c.shift(); ) {
if (e[f] == k) return k;
e = e[f];
}
return e;
}
function dk() {}
function ek(a) {
a.Da = function() {
return a.Li ? a.Li :a.Li = new a();
};
}
function fk(a) {
var b = typeof a;
if (b == oi) {
if (!a) return li;
if (a instanceof ga) return vf;
if (a instanceof ca) return b;
var c = ca[J][$b][O](a);
if (c == $e) return oi;
if (c == Ye || typeof a[H] == mi && "undefined" != typeof a.splice && "undefined" != typeof a[dc] && !a[dc](hj)) return vf;
if (c == Ze || "undefined" != typeof a[O] && "undefined" != typeof a[dc] && !a[dc](Pf)) return R;
} else if (b == R && "undefined" == typeof a[O]) return oi;
return b;
}
function gk(a) {
return a !== h;
}
function hk(a) {
return fk(a) == vf;
}
function ik(a) {
var b = fk(a);
return b == vf || b == oi && typeof a[H] == mi;
}
function T(a) {
return typeof a == mj;
}
function jk(a) {
return typeof a == mi;
}
function kk(a) {
return fk(a) == R;
}
function lk(a) {
var b = typeof a;
return b == oi && a != k || b == R;
}
function mk(a) {
return a[nk] || (a[nk] = ++ok);
}
function pk(a) {
return a[O][Oc](a[Ob], arguments);
}
function qk(a, b) {
if (a || d(r()), 2 < arguments[H]) {
var e = ga[J][ab][O](arguments, 2);
return function() {
var c = ga[J][ab][O](arguments);
return ga[J].unshift[Oc](c, e), a[Oc](b, c);
};
}
return function() {
return a[Oc](b, arguments);
};
}
function rk() {
return rk = Function[J][Ob] && -1 != Function[J][Ob][$b]()[y](hi) ? pk :qk, rk[Oc](k, arguments);
}
function sk(a) {
var c = ga[J][ab][O](arguments, 1);
return function() {
var b = ga[J][ab][O](arguments);
return b.unshift[Oc](b, c), a[Oc](this, b);
};
}
function U(a, b) {
function c() {}
c.prototype = b[J], a.b = b[J], a.prototype = new c(), a[J].constructor = a;
}
function uk(a, b) {
return 0 == a.lastIndexOf(b, 0);
}
function vk(a) {
return a[w](/[\t\r\n ]+/g, dd)[w](/^[\t\r\n ]+|[\t\r\n ]+$/g, Q);
}
function wk(a) {
return a[w](/^[\s\xa0]+|[\s\xa0]+$/g, Q);
}
function xk(a, b) {
return b ? a[w](yk, pd)[w](zk, rd)[w](Ak, qd)[w](Bk, sd) :Ck[Wa](a) ? (-1 != a[y](nd) && (a = a[w](yk, pd)), 
-1 != a[y](me) && (a = a[w](zk, rd)), -1 != a[y](ne) && (a = a[w](Ak, qd)), -1 != a[y](kd) && (a = a[w](Bk, sd)), 
a) :a;
}
function Dk(a) {
var b = ha(a);
return 0 == b && /^[\s\xa0]*$/[Wa](a) ? 0/0 :b;
}
function Kk(a, b) {
return 0 <= Fk(a, b);
}
function Lk(a, b) {
var e, c = Fk(a, b);
return (e = c >= 0) && Ek.splice[O](a, c, 1), e;
}
function Mk(a) {
var b = a[H];
if (b > 0) {
for (var c = ga(b), e = 0; b > e; e++) c[e] = a[e];
return c;
}
return [];
}
function Nk(a) {
for (var c = 1; c < arguments[H]; c++) {
var f, e = arguments[c];
if (hk(e) || (f = ik(e)) && e[tc](Qf)) a[t][Oc](a, e); else if (f) for (var g = a[H], n = e[H], q = 0; n > q; q++) a[g + q] = e[q]; else a[t](e);
}
}
function Ok(a) {
return Ek.splice[Oc](a, Pk(arguments, 1));
}
function Pk(a, b, c) {
return 2 >= arguments[H] ? Ek[ab][O](a, b) :Ek[ab][O](a, b, c);
}
function Qk(a, b, c) {
return p.min(p.max(a, b), c);
}
function V(a, b) {
this.x = gk(a) ? a :0, this.y = gk(b) ? b :0;
}
function Rk(a, b) {
return new V(a.x - b.x, a.y - b.y);
}
function Sk(a, b) {
ka(this, a), Qa(this, b);
}
function Tk(a, b, c) {
for (var e in a) b[O](c, a[e], e, a);
}
function Uk(a) {
var e, b = [], c = 0;
for (e in a) b[c++] = a[e];
return b;
}
function Vk(a) {
var e, b = [], c = 0;
for (e in a) b[c++] = e;
return b;
}
function Wk(a) {
for (var b in a) return l;
return j;
}
function Xk(a, b) {
var c;
return (c = b in a) && delete a[b], c;
}
function Yk(a, b, c) {
b in a && d(r('The object already contains the key "' + b + kd)), a[b] = c;
}
function Zk(a) {
var c, b = {};
for (c in a) b[c] = a[c];
return b;
}
function al(a) {
for (var c, e, f = 1; f < arguments[H]; f++) {
e = arguments[f];
for (c in e) a[c] = e[c];
for (var g = 0; g < $k[H]; g++) c = $k[g], ca[J][tc][O](e, c) && (a[c] = e[c]);
}
}
function il() {
return bk.navigator ? bk.navigator.userAgent :k;
}
function jl() {
return bk.navigator;
}
function ql() {
var a = bk[kc];
return a ? a.documentMode :h;
}
function Z(a) {
var b;
if (!(b = zl[a])) {
b = 0;
for (var c = wk(s(yl))[oc]($d), e = wk(s(a))[oc]($d), f = p.max(c[H], e[H]), g = 0; 0 == b && f > g; g++) {
var n = c[g] || Q, q = e[g] || Q, v = RegExp(ud, Ig), D = RegExp(ud, Ig);
do {
var K = v.exec(n) || [ Q, Q, Q ], I = D.exec(q) || [ Q, Q, Q ];
if (0 == K[0][H] && 0 == I[0][H]) break;
b = ((0 == K[1][H] ? 0 :ia(K[1], 10)) < (0 == I[1][H] ? 0 :ia(I[1], 10)) ? -1 :(0 == K[1][H] ? 0 :ia(K[1], 10)) > (0 == I[1][H] ? 0 :ia(I[1], 10)) ? 1 :0) || ((0 == K[2][H]) < (0 == I[2][H]) ? -1 :(0 == K[2][H]) > (0 == I[2][H]) ? 1 :0) || (K[2] < I[2] ? -1 :K[2] > I[2] ? 1 :0);
} while (0 == b);
}
b = zl[a] = b >= 0;
}
return b;
}
function Gl(a) {
return a = a[fc], T(a) && a[vb](/\S+/g) || [];
}
function Hl(a) {
for (var c = Gl(a), e = Pk(arguments, 1), f = c[H] + e[H], g = c, n = 0; n < e[H]; n++) Kk(g, e[n]) || g[t](e[n]);
return Fa(a, c[Zc](dd)), c[H] == f;
}
function Il(a) {
var f, c = Gl(a), e = Pk(arguments, 1), g = e;
return f = Hk(c, function(a) {
return !Kk(g, a);
}), Fa(a, f[Zc](dd)), f[H] == c[H] - e[H];
}
function Jl(a, b, c) {
c ? Hl(a, b) :Il(a, b);
}
function Kl(a) {
return a ? new Ll(Ml(a)) :Cl || (Cl = new Ll());
}
function Nl(a, b, c, e) {
if (a = e || a, b = b && b != zd ? b.toUpperCase() :Q, a.querySelectorAll && a.querySelector && (b || c)) return a.querySelectorAll(b + (c ? $d + c :Q));
if (c && a.getElementsByClassName) {
if (a = a.getElementsByClassName(c), b) {
e = {};
for (var n, f = 0, g = 0; n = a[g]; g++) b == n[sb] && (e[f++] = n);
return Da(e, f), e;
}
return a;
}
if (a = a.getElementsByTagName(b || zd), c) {
for (e = {}, g = f = 0; n = a[g]; g++) b = n[fc], typeof b[oc] == R && Kk(b[oc](/\s+/), c) && (e[f++] = n);
return Da(e, f), e;
}
return a;
}
function Pl() {
return Ql(ea, arguments);
}
function Ql(a, b) {
var c = b[0], e = b[1];
if (!Dl && e && (e.name || e[E])) {
if (c = [ me, c ], e.name && c[t](id, xk(e.name), kd), e[E]) {
c[t](jd, xk(e[E]), kd);
var f = {};
al(f, e), delete f[E], e = f;
}
c[t](ne), c = c[Zc](Q);
}
var g = a[Ab](c);
if (e && (T(e) ? Fa(g, e) :hk(e) ? Hl[Oc](k, [ g ].concat(e)) :Tk(e, function(a, b) {
b == nj ? g[M].cssText = a :b == Wf ? Fa(g, a) :b == Hg ? g.htmlFor = a :b in Ol ? g[Gb](Ol[b], a) :uk(b, uf) || uk(b, bg) ? g[Gb](b, a) :g[b] = a;
})), 2 < b[H]) for (e = function(b) {
b && g[Sa](T(b) ? a[hb](b) :b);
}, c = 2; c < b[H]; c++) if (f = b[c], !ik(f) || lk(f) && 0 < f[bb]) e(f); else {
var q, n = Gk;
a:{
if ((q = f) && typeof q[H] == mi) {
if (lk(q)) {
q = typeof q[nb] == R || typeof q[nb] == mj;
break a;
}
if (kk(q)) {
q = typeof q[nb] == R;
break a;
}
}
q = l;
}
n(q ? Mk(f) :f, e);
}
return g;
}
function Rl(a) {
return a.compatMode == re;
}
function Sl(a) {
for (var b; b = a[C]; ) a[xc](b);
}
function Tl(a) {
return a && a[Uc] ? a[Uc][xc](a) :k;
}
function Ul(a) {
if (a.firstElementChild != h) a = a.firstElementChild; else for (a = a[C]; a && 1 != a[bb]; ) a = a[Rb];
return a;
}
function Vl(a, b) {
if (a[Nc] && 1 == b[bb]) return a == b || a[Nc](b);
if ("undefined" != typeof a.compareDocumentPosition) return a == b || Boolean(16 & a.compareDocumentPosition(b));
for (;b && a != b; ) b = b[Uc];
return b == a;
}
function Ml(a) {
return 9 == a[bb] ? a :a.ownerDocument || a[kc];
}
function Wl(a, b) {
if (sj in a) a.textContent = b; else if (a[C] && 3 == a[C][bb]) {
for (;a.lastChild != a[C]; ) a[xc](a.lastChild);
a[C].data = b;
} else Sl(a), a[Sa](Ml(a)[hb](b));
}
function Zl(a) {
var b = a.getAttributeNode(qj);
return b && b.specified ? (a = a.tabIndex, jk(a) && a >= 0 && 32768 > a) :l;
}
function $l(a) {
var b = [];
return am(a, b, l), b[Zc](Q);
}
function am(a, b, c) {
if (!(a[sb] in Xl)) if (3 == a[bb]) c ? b[t](s(a[$c])[w](/(\r\n|\r|\n)/g, Q)) :b[t](a[$c]); else if (a[sb] in Yl) b[t](Yl[a[sb]]); else for (a = a[C]; a; ) am(a, b, c), 
a = a[Rb];
}
function bm(a) {
try {
return a && a.activeElement;
} catch (b) {}
return k;
}
function Ll(a) {
this.r = a || bk[kc] || ea;
}
function cm(a, b, c, e) {
this.top = a, Ra(this, b), Na(this, c), na(this, e);
}
function dm(a, b, c, e) {
na(this, a), this.top = b, ka(this, c), Qa(this, e);
}
function em(a, b, c) {
var e;
a:if (e = s(c)[w](/\-([a-z])/g, function(a, b) {
return b.toUpperCase();
}), a[M][e] === h) {
var f = Y ? Ve :X ? Ie :W ? fi :ml ? Le :k, g = T(h) ? "undefined"[w](/([-()\[\]{}+?*.$\^|,:#<!\\])/g, af)[w](/\x08/g, df) :bf;
if (c = c[w](RegExp(vd + (g ? Zj + g + ff :Q) + yd, Ig), function(a, b, c) {
return b + c.toUpperCase();
}), f += c, a[M][f] !== h) {
e = f;
break a;
}
}
e && (a[M][e] = b);
}
function fm(a, b) {
var c = Ml(a);
return c[Nb] && c[Nb].getComputedStyle && (c = c[Nb].getComputedStyle(a, k)) ? c[b] || c.getPropertyValue(b) || Q :Q;
}
function gm(a, b) {
return fm(a, b) || (a[Mc] ? a[Mc][b] :k) || a[M] && a[M][b];
}
function hm(a) {
return gm(a, Ei);
}
function im(a) {
var b = a[Ua]();
return W && (a = a.ownerDocument, na(b, b[A] - (a[Vb][Eb] + a[vc][Eb])), b.top -= a[Vb][Hb] + a[vc][Hb]), 
b;
}
function jm(a) {
if (W && !(W && Bl >= 8)) return a[pc];
var b = Ml(a), c = gm(a, Ei), e = c == Fg || c == hf;
for (a = a[Uc]; a && a != b; a = a[Uc]) if (c = gm(a, Ei), e = e && c == kj && a != b[Vb] && a != b[vc], 
!e && (a.scrollWidth > a[ic] || a.scrollHeight > a[Jc] || c == Fg || c == hf || c == Oi)) return a;
return k;
}
function km(a) {
for (var b = new cm(0, da, da, 0), c = Kl(a), e = c.r[vc], f = c.r[Vb], g = c.dl(); a = jm(a); ) if (!(W && 0 == a[ic] || Y && 0 == a[Jc] && a == e || a == e || a == f || gm(a, vi) == Tj)) {
var q, n = lm(a);
if (q = a, X && !Z(ee)) {
var v = ja(fm(q, Jf));
if (mm(q)) var D = q[fb] - q[ic] - v - ja(fm(q, Lf)), v = v + D;
q = new V(v, ja(fm(q, Nf)));
} else q = new V(q[Eb], q[Hb]);
n.x += q.x, n.y += q.y, b.top = p.max(b.top, n.y), Ra(b, p.min(b[bd], n.x + a[ic])), 
Na(b, p.min(b[Lc], n.y + a[Jc])), na(b, p.max(b[A], n.x));
}
return e = g[Kc], g = g[Yb], na(b, p.max(b[A], e)), b.top = p.max(b.top, g), c = c.el(), 
Ra(b, p.min(b[bd], e + c[u])), Na(b, p.min(b[Lc], g + c[P])), 0 <= b.top && 0 <= b[A] && b[Lc] > b.top && b[bd] > b[A] ? b :k;
}
function lm(a) {
var b, n, c = Ml(a), e = gm(a, Ei), f = X && c[wb] && !a[Ua] && e == hf && (b = c[wb](a)) && (0 > b[tb] || 0 > b[ub]), g = new V(0, 0);
if (b = c ? Ml(c) :ea, n = !W || W && Bl >= 9 || Kl(b).mg() ? b[Vb] :b[vc], a == n) return g;
if (a[Ua]) b = im(a), a = Kl(c).pd(), g.x = b[A] + a.x, g.y = b.top + a.y; else if (c[wb] && !f) b = c[wb](a), 
a = c[wb](n), g.x = b[tb] - a[tb], g.y = b[ub] - a[ub]; else {
b = a;
do {
if (g.x += b[sc], g.y += b[Xc], b != a && (g.x += b[Eb] || 0, g.y += b[Hb] || 0), 
Y && hm(b) == Fg) {
g.x += c[vc][Kc], g.y += c[vc][Yb];
break;
}
b = b[pc];
} while (b && b != a);
for ((ml || Y && e == hf) && (g.y -= c[vc][Xc]), b = a; (b = jm(b)) && b != c[vc] && b != n; ) g.x -= b[Kc], 
ml && b[Qc] == Re || (g.y -= b[Yb]);
}
return g;
}
function nm(a) {
var b = new V();
if (1 == a[bb]) {
if (a[Ua]) {
var c = im(a);
b.x = c[A], b.y = c.top;
} else {
var c = Kl(a).pd(), e = lm(a);
b.x = e.x - c.x, b.y = e.y - c.y;
}
if (X && !Z(12)) {
var f;
W ? f = Sd :Y ? f = Zd :ml ? f = Td :X && (f = Rd);
var g;
f && (g = gm(a, f)), g || (g = gm(a, Aj)), g ? (a = g[vb](om), a = a ? new V(ja(a[1]), ja(a[2])) :new V(0, 0)) :a = new V(0, 0), 
b = new V(b.x + a.x, b.y + a.y);
}
} else f = kk(a.ll), g = a, a[pb] ? g = a[pb][0] :f && a.pa[pb] && (g = a.pa[pb][0]), 
b.x = g[Tb], b.y = g[Ub];
return b;
}
function pm(a, b) {
return typeof a == mi && (a = (b ? p[$a](a) :a) + Ji), a;
}
function qm(a) {
if (gm(a, lg) != ki) return rm(a);
var b = a[M], c = b.display, e = b.visibility, f = b.position;
return Aa(b, wh), b.position = hf, b.display = Bh, a = rm(a), b.display = c, b.position = f, 
Aa(b, e), a;
}
function rm(a) {
var b = a[fb], c = a[Yc], e = Y && !b && !c;
return gk(b) && !e || !a[Ua] ? new Sk(b, c) :(a = im(a), new Sk(a[bd] - a[A], a[Lc] - a.top));
}
function sm(a) {
var b = lm(a);
return a = qm(a), new dm(b.x, b.y, a[u], a[P]);
}
function tm(a, b) {
a[M].display = b ? Q :ki;
}
function mm(a) {
return Vi == gm(a, ig);
}
function vm(a, b, c) {
if (c = c ? k :a.getElementsByTagName(zd), um) {
if (b = b ? ki :Q, a[M][um] = b, c) {
a = 0;
for (var e; e = c[a]; a++) e[M][um] = b;
}
} else if ((W || ml) && (b = b ? qi :Q, a[Gb](Lj, b), c)) for (a = 0; e = c[a]; a++) e[Gb](Lj, b);
}
function wm(a, b, c, e) {
if (/^\d+px?$/[Wa](b)) return ia(b, 10);
var f = a[M][c], g = a.runtimeStyle[c];
return a.runtimeStyle[c] = a[Mc][c], a[M][c] = b, b = a[M][e], a[M][c] = f, a.runtimeStyle[c] = g, 
b;
}
function xm(a, b) {
return wm(a, a[Mc] ? a[Mc][b] :k, Lh, Ci);
}
function zm(a, b) {
if ((a[Mc] ? a[Mc][b + Pe] :k) == ki) return 0;
var c = a[Mc] ? a[Mc][b + We] :k;
return c in ym ? ym[c] :wm(a, c, Lh, Ci);
}
function Am(a) {
if (W) {
var b = zm(a, If), c = zm(a, Kf), e = zm(a, Mf);
return a = zm(a, Gf), new cm(e, c, a, b);
}
return b = fm(a, Jf), c = fm(a, Lf), e = fm(a, Nf), a = fm(a, Hf), new cm(ja(e), ja(c), ja(a), ja(b));
}
function Bm(a, b, c) {
this.hl = a, this.ta = b, a = hm(b), (a == Q || a == kj) && (T(Ei) ? em(b, Oi, Ei) :Tk(Ei, sk(em, b))), 
this.Ad = k, c && (this.Ad = Pl(ng, {
style:Fi
}));
}
function Dm() {}
function Em(a) {
if (typeof a.Q == R) return a.Q();
if (T(a)) return a[oc](Q);
if (ik(a)) {
for (var b = [], c = a[H], e = 0; c > e; e++) b[t](a[e]);
return b;
}
return Uk(a);
}
function Fm(a) {
if (typeof a.Je == R) return a.Je();
if (typeof a.Q != R) {
if (ik(a) || T(a)) {
var b = [];
a = a[H];
for (var c = 0; a > c; c++) b[t](c);
return b;
}
return Vk(a);
}
}
function Gm(a, b, c) {
if (typeof a[Db] == R) a[Db](b, c); else if (ik(a) || T(a)) Gk(a, b, c); else for (var e = Fm(a), f = Em(a), g = f[H], n = 0; g > n; n++) b[O](c, f[n], e && e[n], a);
}
function Hm(a, b, c) {
if (typeof a.map == R) return a.map(b, c);
if (ik(a) || T(a)) return Ik(a, b, c);
var e, f = Fm(a), g = Em(a), n = g[H];
if (f) {
e = {};
for (var q = 0; n > q; q++) e[f[q]] = b[O](c, g[q], f[q], a);
} else for (e = [], q = 0; n > q; q++) e[q] = b[O](c, g[q], h, a);
return e;
}
function Im(a) {
this.p = {}, this.K = [];
var c = arguments[H];
if (c > 1) {
c % 2 && d(r("Uneven number of arguments"));
for (var e = 0; c > e; e += 2) this.set(arguments[e], arguments[e + 1]);
} else a && this.jg(a);
}
function Jm(a, b) {
return ca[J][tc][O](a, b);
}
function Km(a) {
this.p = new Im(), a && this.jg(a);
}
function Lm(a) {
var b = typeof a;
return b == oi && a || b == R ? ni + mk(a) :b[Wb](0, 1) + a;
}
function Mm() {}
function Om(a) {
a && typeof a.e == R && a.e();
}
function Nm() {
for (var b = 0, c = arguments[H]; c > b; ++b) {
var e = arguments[b];
ik(e) ? Nm[Oc](k, e) :Om(e);
}
}
function Pm(a) {
return Pm[dd](a), a;
}
function Tm(a, b) {
ua(this, a), Ia(this, b), ma(this, this[N]);
}
function Um(a) {
a[mb]();
}
function Vm(a, b) {
a && this.Tb(a, b);
}
function Xm() {}
function cn(a, b, c, e, f) {
if (b) {
if (hk(b)) {
for (var g = 0; g < b[H]; g++) cn(a, b[g], c, e, f);
return k;
}
e = !!e;
var n = $m;
b in n || (n[b] = {
X:0,
Sa:0
}), n = n[b], e in n || (n[e] = {
X:0,
Sa:0
}, n.X++);
var v, n = n[e], q = mk(a);
if (n.Sa++, n[q]) {
for (v = n[q], g = 0; g < v[H]; g++) if (n = v[g], n.Oc == c && n.pe == f) {
if (n.nc) break;
return v[g].key;
}
} else v = n[q] = [], n.X++;
var D = dn, K = Rm ? function(a) {
return D[O](K.src, K.key, a);
} :function(a) {
return a = D[O](K.src, K.key, a), a ? void 0 :a;
}, g = K;
return g.src = a, n = new Xm(), n.Tb(c, g, a, b, e, f), c = n.key, g.key = c, v[t](n), 
Zm[c] = n, an[q] || (an[q] = []), an[q][t](n), a[Fb] ? (a == bk || !a.Qh) && a[Fb](b, g, e) :a.attachEvent(b in bn ? bn[b] :bn[b] = qi + b, g), 
c;
}
d(r("Invalid event type"));
}
function en(a, b, c, e, f) {
if (hk(b)) {
for (var g = 0; g < b[H]; g++) en(a, b[g], c, e, f);
return k;
}
if (e = !!e, a = fn(a, b, e), !a) return l;
for (g = 0; g < a[H]; g++) if (a[g].Oc == c && a[g][rb] == e && a[g].pe == f) return gn(a[g].key);
return l;
}
function gn(a) {
if (!Zm[a]) return l;
var b = Zm[a];
if (b.nc) return l;
var c = b.src, e = b[E], f = b.Rh, g = b[rb];
return c.removeEventListener ? (c == bk || !c.Qh) && c.removeEventListener(e, f, g) :c.detachEvent && c.detachEvent(e in bn ? bn[e] :bn[e] = qi + e, f), 
c = mk(c), an[c] && (f = an[c], Lk(f, b), 0 == f[H] && delete an[c]), b.nc = j, 
(b = $m[e][g][c]) && (b.li = j, hn(e, g, c, b)), delete Zm[a], j;
}
function hn(a, b, c, e) {
if (!e.De && e.li) {
for (var f = 0, g = 0; f < e[H]; f++) e[f].nc ? e[f].Rh.src = k :(f != g && (e[g] = e[f]), 
g++);
Da(e, g), e.li = l, 0 == g && (delete $m[a][b][c], $m[a][b].X--, 0 == $m[a][b].X && (delete $m[a][b], 
$m[a].X--), 0 == $m[a].X && delete $m[a]);
}
}
function fn(a, b, c) {
var e = $m;
return b in e && (e = e[b], c in e && (e = e[c], a = mk(a), e[a])) ? e[a] :k;
}
function jn(a, b, c, e, f) {
var g = 1;
if (b = mk(b), a[b]) {
a.Sa--, a = a[b], a.De ? a.De++ :a.De = 1;
try {
for (var n = a[H], q = 0; n > q; q++) {
var v = a[q];
v && !v.nc && (g &= kn(v, f) !== l);
}
} finally {
a.De--, hn(c, e, b, a);
}
}
return Boolean(g);
}
function kn(a, b) {
return a.zi && gn(a.key), a[Ib](b);
}
function dn(a, b) {
if (!Zm[a]) return j;
var c = Zm[a], e = c[E], f = $m;
if (!(e in f)) return j;
var g, n, f = f[e];
if (!Rm) {
g = b || ck(Vj);
var q = j in f, v = l in f;
if (q) {
if (0 > g[B] || g.returnValue != h) return j;
a:{
var D = l;
if (0 == g[B]) try {
ra(g, -1);
break a;
} catch (K) {
D = j;
}
(D || g.returnValue == h) && (g.returnValue = j);
}
}
D = new Vm(), D.Tb(g, this), g = j;
try {
if (q) {
for (var I = [], gc = D.currentTarget; gc; gc = gc[Uc]) I[t](gc);
n = f[j], n.Sa = n.X;
for (var sa = I[H] - 1; !D.rc && sa >= 0 && n.Sa; sa--) ma(D, I[sa]), g &= jn(n, I[sa], e, j, D);
if (v) for (n = f[l], n.Sa = n.X, sa = 0; !D.rc && sa < I[H] && n.Sa; sa++) ma(D, I[sa]), 
g &= jn(n, I[sa], e, l, D);
} else g = kn(c, D);
} finally {
I && Da(I, 0);
}
return g;
}
return e = new Vm(b, this), g = kn(c, e);
}
function mn() {}
function nn(a, b) {
this.Sc = a || 1, this.nd = b || on, this.kg = rk(this.jl, this), this.lg = tk();
}
function pn(a, b, c) {
return kk(a) ? c && (a = rk(a, c)) :a && typeof a[Ib] == R ? a = rk(a[Ib], a) :d(r(Ee)), 
b > 2147483647 ? -1 :on[jc](a, b || 0);
}
function qn() {
this.Ea = new Im(), this.Cb = new Im(), this.Rb = new Im();
}
function rn(a) {
this.J = new qn(), this.ud = [], this.qe = new Bm(this, a), this.Qa = k, this.ca = l;
}
function sn(a) {
return lk(a) && kk(a[Dc]) && kk(a[Ac]);
}
function un(a) {
for (var b = [], c = 0; c < a[cc](); c++) b[t](a.getUnderlyingTableRowIndex(c));
return b;
}
function vn(a) {
for (var b = [], c = 0; c < a[ib](); c++) {
var e = a.getUnderlyingTableColumnIndex(c);
-1 != e && b[t](e);
}
return b;
}
function tn(a) {
this.Sb = a, this.J = a.J[yc](), this.Be = {}, a = this.J.Q();
for (var b = 0; b < a[H]; b++) this.Qc(a[b], Li);
}
function wn(a) {
this.ta = a, this.Sb = new rn(a), this.il();
}
function xn(a, b) {
this.Ph = a || k, this.ag = !!b, this.p = new Im(), this.L = new yn(Q, h), Ga(this.L, this.L.Ra = this.L);
}
function yn(a, b) {
this.key = a, la(this, b);
}
function zn(a) {
if (a[ac] && !a[nc] || a[qb] || 112 <= a[B] && 123 >= a[B]) return l;
switch (a[B]) {
case 18:
case 20:
case 93:
case 17:
case 40:
case 35:
case 27:
case 36:
case 45:
case 37:
case 224:
case 91:
case 144:
case 12:
case 34:
case 33:
case 19:
case 255:
case 44:
case 39:
case 145:
case 16:
case 38:
case 224:
case 92:
return l;

case 0:
return !X;

default:
return 166 > a[B] || 183 < a[B];
}
}
function An(a, b, c, e, f) {
if (!(W || Y && Z(fe))) return j;
if (fl && f) return Bn(a);
if (f && !e || !c && (17 == b || 18 == b || fl && 91 == b)) return l;
if (Y && e && c) switch (a) {
case 220:
case 219:
case 221:
case 192:
case 186:
case 189:
case 187:
case 188:
case 190:
case 191:
case 192:
case 222:
return l;
}
if (W && e && b == a) return l;
switch (a) {
case 13:
return !(W && W && Bl >= 9);

case 27:
return !Y;
}
return Bn(a);
}
function Bn(a) {
if (a >= 48 && 57 >= a || a >= 96 && 106 >= a || a >= 65 && 90 >= a || Y && 0 == a) return j;
switch (a) {
case 32:
case 63:
case 107:
case 109:
case 110:
case 111:
case 186:
case 59:
case 189:
case 187:
case 61:
case 188:
case 190:
case 191:
case 192:
case 222:
case 219:
case 220:
case 221:
return j;

default:
return l;
}
}
function Cn(a) {
switch (a) {
case 61:
return 187;

case 59:
return 186;

case 224:
return 91;

case 0:
return 224;

default:
return a;
}
}
function Dn(a, b) {
a[Gb](Ui, b);
}
function En(a, b, c) {
a[Gb](uf + b, c);
}
function Fn(a) {
this.ld = a, this.K = [];
}
function Hn() {}
function $(a) {
this.zb = a || Kl(), this.fb = In;
}
function Jn(a, b) {
switch (a) {
case 1:
return b ? jg :vg;

case 2:
return b ? yh :Ij;

case 4:
return b ? kf :gg;

case 8:
return b ? Yi :Kj;

case 16:
return b ? Uf :Hj;

case 32:
return b ? Gg :Df;

case 64:
return b ? ri :Yf;
}
d(r("Invalid component state"));
}
function Kn() {}
function Mn() {}
function Nn(a, b) {
a && this.Gg(a, b);
}
function Sn(a, b, c, e) {
e && this.Tb(e, h), ua(this, Fh), ra(this, a), this.charCode = b, this.repeat = c;
}
function Tn(a, b) {
a || d(r("Invalid class name " + a)), kk(b) || d(r("Invalid decorator function " + b)), 
Un[a] = b;
}
function Wn(a, b, c) {
if ($[O](this, c), !b) {
b = this.constructor;
for (var e; b && (e = mk(b), !(e = Vn[e])); ) b = b.b ? b.b.constructor :k;
b = e ? kk(e.Da) ? e.Da() :new e() :k;
}
this.h = b, this.Nd(a);
}
function Yn() {}
function Zn(a, b, c) {
Wn[O](this, a, b || Yn.Da(), c);
}
function $n(a) {
this.j = a, a = W || Y && !Z(ge) && a[Qc] == Qe, this.H = new Fn(this), this.H.d(this.j, a ? [ Gh, Ai, ag, tg, Dh ] :Dh, this);
}
function ao(a) {
var b = a[sc], c = a[pc];
if (!c && hm(a) == Fg && (c = Ml(a)[Vb]), !c) return b;
if (X) var e = Am(c), b = b + e[A]; else W && Bl >= 8 && (e = Am(c), b -= e[A]);
return mm(c) ? c[ic] - (b + a[fb]) :b;
}
function bo(a, b, c, e, f, g, n, q, v) {
var D, K;
if (D = c[pc]) {
var I = D[Qc] == Ce || D[Qc] == pe;
I && hm(D) == kj || (K = lm(D), I || (I = (I = mm(D)) && X ? -D[Kc] :!I || W && Z(ke) ? D[Kc] :D.scrollWidth - D[ic] - D[Kc], 
K = Rk(K, new V(I, D[Yb]))));
}
D = K || new V(), K = sm(a), (I = km(a)) && K.ue(new dm(I[A], I.top, I[bd] - I[A], I[Lc] - I.top));
var I = Kl(a), gc = Kl(c);
if (I.r != gc.r) {
var sa = I.r[vc], gc = gc.ii(), Sf = new V(0, 0), Fe = Ml(sa) ? Ml(sa)[Kb] || Ml(sa)[Nb] :ba, Mi = sa;
do {
var xl = Fe == gc ? lm(Mi) :nm(Mi);
Sf.x += xl.x, Sf.y += xl.y;
} while (Fe && Fe != gc && (Mi = Fe.frameElement) && (Fe = Fe.parent));
sa = Rk(Sf, lm(sa)), W && !I.mg() && (sa = Rk(sa, I.pd())), na(K, K[A] + sa.x), 
K.top += sa.y;
}
a = -5 & (4 & b && mm(a) ? 2 ^ b :b), b = new V(2 & a ? K[A] + K[u] :K[A], 1 & a ? K.top + K[P] :K.top), 
b = Rk(b, D), f && (b.x += (2 & a ? -1 :1) * f.x, b.y += (1 & a ? -1 :1) * f.y);
var G;
return n && (v ? G = v :(G = km(c)) && (G.top -= D.y, Ra(G, G[bd] - D.x), Na(G, G[Lc] - D.y), 
na(G, G[A] - D.x))), v = b[yc](), f = 0, a = -5 & (4 & e && mm(c) ? 2 ^ e :e), e = qm(c), 
q = q ? q[yc]() :e[yc](), (g || 0 != a) && (2 & a ? v.x -= q[u] + (g ? g[bd] :0) :g && (v.x += g[A]), 
1 & a ? v.y -= q[P] + (g ? g[Lc] :0) :g && (v.y += g.top)), n && (G ? (g = v, f = 0, 
65 == (65 & n) && (g.x < G[A] || g.x >= G[bd]) && (n &= -2), 132 == (132 & n) && (g.y < G.top || g.y >= G[Lc]) && (n &= -5), 
g.x < G[A] && 1 & n && (g.x = G[A], f |= 1), g.x < G[A] && g.x + q[u] > G[bd] && 16 & n && (ka(q, p.max(q[u] - (g.x + q[u] - G[bd]), 0)), 
f |= 4), g.x + q[u] > G[bd] && 1 & n && (g.x = p.max(G[bd] - q[u], G[A]), f |= 1), 
2 & n && (f |= (g.x < G[A] ? 16 :0) | (g.x + q[u] > G[bd] ? 32 :0)), g.y < G.top && 4 & n && (g.y = G.top, 
f |= 2), g.y >= G.top && g.y + q[P] > G[Lc] && 32 & n && (Qa(q, p.max(q[P] - (g.y + q[P] - G[Lc]), 0)), 
f |= 8), g.y + q[P] > G[Lc] && 4 & n && (g.y = p.max(G[Lc] - q[P], G.top), f |= 2), 
8 & n && (f |= (g.y < G.top ? 64 :0) | (g.y + q[P] > G[Lc] ? 128 :0)), n = f) :n = 256, 
f = n, 496 & f) ? c = f :(g = X && (fl || pl) && Z(ee), v instanceof V ? (n = v.x, 
v = v.y) :(n = v, v = h), na(c[M], pm(n, g)), c[M].top = pm(v, g), e == q || (e && q ? e[u] == q[u] && e[P] == q[P] :0) || (g = Kl(Ml(c)).mg(), 
!W || g && Z(ke) ? (c = c[M], X ? c.MozBoxSizing = Ff :Y ? c.WebkitBoxSizing = Ff :c.boxSizing = Ff, 
ka(c, p.max(q[u], 0) + Ji), Qa(c, p.max(q[P], 0) + Ji)) :(n = c[M], g ? (W ? (g = xm(c, xi), 
e = xm(c, yi), v = xm(c, zi), G = xm(c, wi), g = new cm(v, e, G, g)) :(g = fm(c, xi), 
e = fm(c, yi), v = fm(c, zi), G = fm(c, wi), g = new cm(ja(v), ja(e), ja(G), ja(g))), 
c = Am(c), n.pixelWidth = q[u] - c[A] - g[A] - g[bd] - c[bd], n.pixelHeight = q[P] - c.top - g.top - g[Lc] - c[Lc]) :(n.pixelWidth = q[u], 
n.pixelHeight = q[P]))), c = f), c;
}
function co() {}
function eo(a, b, c) {
this.element = a, this.ce = b, this.Rl = c;
}
function fo(a, b, c, e) {
eo[O](this, a, b), this.Ie = c ? 5 :0, this.sg = e || h;
}
function go(a, b, c, e) {
fo[O](this, a, b, c || e), (c || e) && this.fm(65 | (e ? 32 :132));
}
function ho(a, b, c) {
Tm[O](this, a, b), this.item = c;
}
function no(a, b) {
$[O](this, b), this.ha = a || Q;
}
function po() {}
function qo(a, b) {
Wn[O](this, k, a || po.Da(), b), this.Aa(1, l), this.Aa(2, l), this.Aa(4, l), this.Aa(32, l), 
this.Uf(1);
}
function ro() {}
function so(a, b, c) {
$[O](this, c), this.h = b || ro.Da(), this.F = a || Sj;
}
function to() {}
function uo(a, b, c) {
Wn[O](this, a, c || to.Da(), b), this.Aa(1, l), this.Aa(2, l), this.Aa(4, l), this.Aa(32, l), 
this.Uf(1);
}
function vo() {
this.Qi = [];
}
function wo(a, b, c, e) {
Wn[O](this, a, e || vo.Da(), c), this[ec](b);
}
function xo() {}
function yo(a, b) {
so[O](this, Sj, b || xo.Da(), a), this.gb(l);
}
function zo(a, b) {
$[O](this, a), this.na = new no(), this.aa = j, this.c = b || new yo(this.n()), 
this.Xj();
}
function Ao(a, b, c, e) {
wo[O](this, a, b, c, e);
}
function Bo() {}
function Co() {}
function Do(a, b, c) {
wo[O](this, a, b, c), this.Hf(j);
}
function Jo() {}
function Ko(a, b) {
if (a) for (var e, c = b ? a[C] :a.lastChild; c && c[Uc] == a && (e = b ? c[Rb] :c.previousSibling, 
3 == c[bb]); ) {
var f = c[$c];
if (wk(f) != Q) {
c.nodeValue = b ? f[w](/^[\s\xa0]+/, Q) :f[w](/[\s\xa0]+$/, Q);
break;
}
a[xc](c), c = e;
}
}
function Lo() {}
function Mo(a, b, c, e) {
Zn[O](this, a, c || Lo.Da(), e), this.Aa(64, j), this.Sd = new go(k, 5), b && this.ed(b), 
this.kj = k, this.ba = new nn(500), (Ho || Io) && !Z(ie) && this.Fk(j);
}
function No(a) {
this.ic = [], this.Ol(a);
}
function Oo(a, b, c, e) {
Mo[O](this, a, b, c, e), this.th(a), this.Ti(Oh);
}
function Po(a) {
if (a = s(a), /^\s*$/[Wa](a) ? 0 :/^[\],:{}\s\u2028\u2029]*$/[Wa](a[w](/\\["\\\/bfnrtu]/g, oe)[w](/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ef)[w](/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, Q))) try {
return eval(td + a + wd);
} catch (b) {}
d(r("Invalid JSON string: " + a));
}
function Qo(a) {
this.Re = a;
}
function To(a) {
return a = a[w](/"(Date\([\d,\s]*\))"/g, function(a, c) {
return ii + c;
}), eval(td + a + wd);
}
function Uo(a, b) {
a = b(a);
var c = fk(a);
if (c == oi || c == vf) {
var e, c = c == vf ? [] :{};
for (e in a) {
var f = Uo(a[e], b);
gk(f) && (c[e] = f);
}
} else c = a;
return c;
}
function Vo(a) {
return lk(a) && typeof a[Gc] == R && (a = 0 !== a.getMilliseconds() ? [ a[Gc](), a[bc](), a[jb](), a[Qb](), a[Vc](), a[mc](), a.getMilliseconds() ] :0 !== a[mc]() || 0 !== a[Vc]() || 0 !== a[Qb]() ? [ a[Gc](), a[bc](), a[jb](), a[Qb](), a[Vc](), a[mc]() ] :[ a[Gc](), a[bc](), a[jb]() ], 
a = ze + a[Zc](Bd) + wd), a;
}
function Xo(a) {
var b = {};
a = s(a);
var c = a.charAt(0) == ld ? a :ld + a;
if (Yo[Wa](c)) return a = c, Yo[Wa](a) || d(r("'" + a + "' is not a valid hex color")), 
4 == a[H] && (a = a[w](Zo, md)), b.vg = a[ad](), ua(b, vh), b;
a:{
var e = a[vb]($o);
if (e) {
var c = ha(e[1]), f = ha(e[2]), e = ha(e[3]);
if (c >= 0 && 255 >= c && f >= 0 && 255 >= f && e >= 0 && 255 >= e) {
c = [ c, f, e ];
break a;
}
}
c = [];
}
return c[H] ? (f = c[0], a = c[1], c = c[2], f = ha(f), a = ha(a), c = ha(c), (fa(f) || 0 > f || f > 255 || fa(a) || 0 > a || a > 255 || fa(c) || 0 > c || c > 255) && d(r('"(' + f + Ad + a + Ad + c + '") is not a valid RGB color')), 
f = ap(f[$b](16)), a = ap(a[$b](16)), c = ap(c[$b](16)), b.vg = ld + f + a + c, 
ua(b, Si), b) :Wo && (c = Wo[a[ad]()]) ? (b.vg = c, ua(b, gi), b) :(d(r(a + " is not a valid color string")), 
void 0);
}
function ap(a) {
return 1 == a[H] ? ae + a :a;
}
function bp(a) {
return a == ki || a == Q || a == Bj ? ki :Xo(a).vg;
}
function cp(a) {
a = a || {}, this.Ch = ki, a.fill != k && this.uk(a.fill), this.Bh = 1, a.bg != k && this.vk(a.bg), 
this.Ah = ki, a.stroke != k && this.xk(a.stroke), this.Ih = 1, a.Hh != k && this.Oh(a.Hh), 
this.Gh = 1, a.cg != k && this.zk(a.cg), this.Fh = ej, a.Eh != k && this.yk(a.Eh), 
this.rb = k, a.rb && (this.rb = Zk(a.rb), this.rb.sk = bp(this.rb.sk), this.rb.tk = bp(this.rb.tk)), 
this.Dh = k, a.pattern && this.wk(a.pattern);
}
function dp(a) {
this.Yi = a;
}
function ep(a, b, c) {
a:{
b = b[oc]($d), a = a || bk;
for (var e = 0; e < b[H]; e++) {
var f = b[e];
if (a[f] == k) {
b = k;
break a;
}
a = a[f];
}
b = a;
}
return b != k && kk(c) ? c(b) :b;
}
function fp(a) {
return a == k ? k :typeof a == Ef ? a :(a = s(a), a == de || a[ad]() == Cj ? j :a == ae || a[ad]() == Bg ? l :k);
}
function gp(a) {
return a == k ? k :typeof a == mi ? a :(a = Dk(s(a)), fa(a) ? k :a);
}
function hp(a) {
return a == k ? k :s(a);
}
function ip(a, b) {
var e, c = hp(b);
a:{
for (e in a) if (a[e] == c) {
e = j;
break a;
}
e = l;
}
return e ? c :k;
}
function jp(a) {
lk(a) && 0 < a[bb] || d(r("Container is not defined")), this.ta = a, this.qe = new Bm(this, this.ta), 
this.ca = l;
}
function kp(a) {
jp[O](this, a);
}
function lp(a) {
jp[O](this, a);
}
function mp(a) {
this.ta = a, this.H = new Fn(this), this.ca = l;
}
function np(a, b) {
var c = b.sc(Cg);
if (c != k) return c = ia(c, 10), a[wc](c), c;
if (c = b.ie(Dg)) {
a:{
for (var e = a[ib](), f = 0; e > f; f++) if (a[Bb](f) == c) break a;
d(r("Invalid column label:" + c));
}
return f;
}
d(r("Either filterColumnIndex or filterColumnLabel must be specified."));
}
function op(a) {
jp[O](this, a), this.M = -1;
}
function pp(a, b, c, e) {
$[O](this, e), this.ha = a, this.lk = b == Sj, this.mk = c || Q;
}
function qp(a) {
if (!a[Wc]) return k;
var c, b = a.labelStacking == Sj ? Sj :zh;
return a.labelSeparator && (c = s(a.labelSeparator)), new pp(s(a[Wc]), b, c);
}
function rp(a, b) {
this.Ba = a, this.hi = b;
}
function sp(a, b) {
return a.lb().localeCompare(b.lb());
}
function tp() {}
function up(a) {
op[O](this, a);
}
function vp(a) {
mp[O](this, a), this.za = [], this.P = new xn();
}
function Bp(a) {
this.i = a, this.u = k, this.ca = l;
}
function Ap(a) {
Bp[O](this, a);
}
function zp(a) {
Bp[O](this, a), this.ya = k;
}
function Dp(a) {
this.i = a, this.s = k, this.ca = l;
}
function yp(a) {
Dp[O](this, a);
}
function xp(a) {
Dp[O](this, a), this.ya = k;
}
function Cp(a, b, c, e) {
$[O](this, e), this.Dc = a, this.gl = b, this.xf = c, this.dc = 0, this.te = [];
}
function Ep(a) {
this.Dc = a;
}
function Fp(a) {
jp[O](this, a), this.M = k;
}
function Gp(a) {
mp[O](this, a);
}
function Hp(a) {
jp[O](this, a), this.M = -1;
}
function Ip(a) {
Hp[O](this, a);
}
function Jp(a) {
mp[O](this, a), this.Fb = 0;
}
function Kp(a) {
this.j = a, a = lk(this.j) && 1 == this.j[bb] ? this.j :this.j ? this.j[vc] :k, 
this.Dk = !!a && mm(a), this.gh = cn(this.j, X ? ye :ei, this);
}
function Lp(a, b) {
return Y && (fl || hl) && 0 != a % b ? a :a / b;
}
function Mp(a, b, c, e) {
b && this.Tb(b, h), ua(this, ei), this.detail = a, this.lc = c, this.mc = e;
}
function Np() {
this.t = 0, Pa(this, k), this.qd = k;
}
function Op() {
Np[O](this), this.Ab = [];
}
function Pp() {
Op[O](this), this.fg = 0;
}
function Qp(a, b, c) {
this.Nf = a, this.Sc = b || 0, this.ld = c, this.Yk = rk(this.ol, this);
}
function Tp(a) {
a = mk(a), delete Rp[a], Wk(Rp) && Sp && Sp[Zb]();
}
function Up() {
Sp || (Sp = new Qp(function() {
var a = tk();
Tk(Rp, function(c) {
c.Ql(a);
}), Wk(Rp) || Up();
}, 20));
var a = Sp;
a.cc() || a[Cc]();
}
function Vp(a, b, c, e) {
Np[O](this), (!hk(a) || !hk(b)) && d(r("Start and end parameters must be arrays")), 
a[H] != b[H] && d(r("Start and end points must be the same length")), this.xd = a, 
this.rl = b, this.duration = c, this.Gi = e, La(this, []), this.gc = l;
}
function Wp(a, b) {
Tm[O](this, a), La(this, b[Ec]), this.x = b[Ec][0], this.y = b[Ec][1], this.duration = b.duration, 
this.Oa = b.Oa, this.state = b.t;
}
function Xp(a, b, c, e, f) {
Vp[O](this, b, c, e, f), this.element = a;
}
function Yp(a, b, c) {
(2 != b[H] || 2 != c[H]) && d(r("Start and end points must be 2D")), Xp[Oc](this, arguments);
}
function Zp(a, b, c, e, f) {
Xp[O](this, a, [ b ], [ c ], e, f);
}
function $p(a, b, c, e, f) {
Xp[O](this, a, [ b ], [ c ], e, f);
}
function aq(a, b, c) {
Ia(this, a), this.handle = b || a, this.Zh = c || new dm(0/0, 0/0, 0/0, 0/0), this.r = Ml(a), 
this.H = new Fn(this), cn(this.handle, [ zj, $h ], this.ah, l, this);
}
function cq(a, b, c, e, f, g, n) {
Tm[O](this, a), ya(this, c), za(this, e), na(this, gk(g) ? g :b.lc), this.top = gk(n) ? n :b.mc, 
this.nf = b;
}
function dq() {}
function eq(a) {
$[O](this, a), this.m = new dq(), cn(this.m, Tf, this.uh, l, this);
}
function lq(a) {
jp[O](this, a), this.M = -1;
}
function mq(a) {
lq[O](this, a);
}
function nq(a) {
mp[O](this, a), this.Fb = 0;
}
function qq(a) {
eq[O](this, a);
}
function rq(a) {
mp[O](this, a), this.t = {};
}
function sq(a, b) {
this.Ul = a, this.ug = b;
}
function tq(a, b) {
this.ea = [], this.qb = a, this.oi = b || k, this.$h = (this.oi || this.qb[lb]())[Cb](0) == dg ? Xi :cg;
}
function xq(a) {
this.ta = a;
}
function yq(a) {
jp[O](this, a);
}
function zq(a) {
mp[O](this, a);
}
var h = void 0, j = !0, k = null, l = !1, aa = google_exportSymbol, ba = window, ca = Object, da = 1/0, ea = document, fa = isNaN, m = google_exportProperty, p = Math, ga = Array, ha = Number, r = Error, ia = parseInt, ja = parseFloat, s = String, Sa = "appendChild", t = "push", Ta = "trigger", Ua = "getBoundingClientRect", Va = "getParent", Wa = "test", Xa = "relatedTarget", Ya = "clearTimeout", u = "width", Za = "classList", $a = "round", ab = "slice", w = "replace", bb = "nodeType", cb = "setRows", db = "ceil", x = "events", eb = "floor", fb = "offsetWidth", gb = "removeListener", hb = "createTextNode", ib = "getNumberOfColumns", jb = "getDate", kb = "value", lb = "getDataTable", mb = "preventDefault", nb = "item", ob = "insertBefore", pb = "targetTouches", y = "indexOf", qb = "metaKey", z = "dispatchEvent", rb = "capture", sb = "nodeName", A = "left", tb = "screenX", ub = "screenY", vb = "match", wb = "getBoxObjectFor", xb = "charCode", yb = "remove", zb = "focus", Ab = "createElement", Bb = "getColumnLabel", B = "keyCode", Cb = "getColumnType", C = "firstChild", Db = "forEach", Eb = "clientLeft", Fb = "addEventListener", Gb = "setAttribute", Hb = "clientTop", Ib = "handleEvent", Jb = "applyFilter", E = "type", Kb = "parentWindow", Lb = "clear", Mb = "childNodes", Nb = "defaultView", Ob = "bind", Pb = "offset", Qb = "getHours", F = "getValue", Rb = "nextSibling", Sb = "setActive", Tb = "clientX", Ub = "clientY", Vb = "documentElement", Wb = "substr", Xb = "setState", Yb = "scrollTop", Zb = "stop", $b = "toString", ac = "altKey", bc = "getMonth", cc = "getNumberOfRows", H = "length", dc = "propertyIsEnumerable", J = "prototype", ec = "setValue", fc = "className", hc = "size", ic = "clientWidth", jc = "setTimeout", kc = "document", lc = "next", mc = "getSeconds", nc = "ctrlKey", oc = "split", pc = "offsetParent", qc = "stopPropagation", rc = "getControl", L = "visualization", sc = "offsetLeft", tc = "hasOwnProperty", M = "style", uc = "addListener", vc = "body", wc = "getColumnId", xc = "removeChild", yc = "clone", N = "target", O = "call", zc = "isEnabled", Ac = "setDataTable", Bc = "removeAll", Cc = "start", Dc = "draw", Ec = "coords", Fc = "resetControl", Gc = "getFullYear", Hc = "DataView", Ic = "getState", Jc = "clientHeight", Kc = "scrollLeft", Lc = "bottom", Mc = "currentStyle", Nc = "contains", Oc = "apply", Pc = "shiftKey", Qc = "tagName", Rc = "element", Sc = "getContainer", Tc = "startTime", Uc = "parentNode", Vc = "getMinutes", Wc = "label", Xc = "offsetTop", P = "height", Yc = "offsetHeight", Zc = "join", $c = "nodeValue", ad = "toLowerCase", bd = "right", Q = "", cd = "\n", dd = " ", ed = " + 1", fd = " and ", gd = " does not fit either the Control or Visualization specification.", hd = " does not fit the Control specification.", id = ' name="', jd = ' type="', kd = '"', ld = "#", md = "#$1$1$2$2$3$3", nd = "&", od = "&#x25BC;", pd = "&amp;", qd = "&gt;", rd = "&lt;", sd = "&quot;", td = "(", ud = "(\\d*)(\\D*)", vd = "(^", wd = ")", xd = ") = ", yd = ")([a-z])", zd = "*", Ad = ",", Bd = ", ", Cd = ", sum(", Dd = "-", Ed = "-active", Fd = "-caption", Gd = "-checkbox", Hd = "-checked", Id = "-content", Jd = "-disabled", Kd = "-dropdown", Ld = "-focused", Md = "-highlight", Nd = "-horizontal", Od = "-hover", Pd = "-inner-box", Qd = "-input", Rd = "-moz-transform", Sd = "-ms-transform", Td = "-o-transform", Ud = "-open", Vd = "-outer-box", Wd = "-rtl", Xd = "-selected", Yd = "-vertical", Zd = "-webkit-transform", $d = ".", ae = "0", be = "00", ce = "000", de = "1", ee = "1.9", fe = "525", ge = "531", he = "532.0", ie = "533.17.9", je = "7", ke = "8", le = ":", me = "<", ne = ">", oe = "@", pe = "BODY", qe = "BUTTON", re = "CSS1Compat", se = "Cannot bind a control to itself.", te = "CategoryFilterUi", ue = "ChartRangeFilterUi", ve = "Choose a value...", we = "Component already rendered", xe = "DIV", ye = "DOMMouseScroll", ze = "Date(", Ae = "DrilldownOperatorUi", Be = "HR", Ce = "HTML", De = "INPUT", Ee = "Invalid listener argument", Ge = "Invalid state: should be an array of values.", He = "LI", Ie = "Moz", Je = "No valid DataTable received from draw()", Ke = "NumberRangeFilterUi", Le = "O", Me = "One or more participants failed to draw()", Ne = "RangeSelector", Oe = "StringFilterUi", Pe = "Style", Qe = "TEXTAREA", Re = "TR", Se = "The requested control and participant cannot be bound together, as this would introduce a dependency cycle", Te = "UL", Ue = "Unable to set parent component", Ve = "Webkit", We = "Width", Xe = "[", Ye = "[object Array]", Ze = "[object Function]", $e = "[object Window]", af = "\\$1", bf = "\\s", cf = "\\u", df = "\\x08", ef = "]", ff = "]+", gf = "_", hf = "absolute", jf = "action", kf = "activate", lf = "activedescendant", mf = "afterhide", nf = "aftershow", of = "allowMultiple", pf = "allowNone", qf = "allowTyping", rf = "animate", sf = "any", tf = "applyFilter", uf = "aria-", vf = "array", wf = "aside", xf = "b", yf = "beforedrag", zf = "begin", Af = "belowStacked", Bf = "belowWrapping", Cf = "blockIncrement", Df = "blur", Ef = "boolean", Ff = "border-box", Gf = "borderBottom", Hf = "borderBottomWidth", If = "borderLeft", Jf = "borderLeftWidth", Kf = "borderRight", Lf = "borderRightWidth", Mf = "borderTop", Nf = "borderTopWidth", Of = "button", Pf = "call", Qf = "callee", Rf = "caseSensitive", Tf = "change", Uf = "check", Vf = "checked", Wf = "class", Xf = "click", Yf = "close", Zf = "contextmenu", $f = "cssClass", ag = "cut", bg = "data-", cg = "date", dg = "datetime", eg = "day", fg = "dblclick", gg = "deactivate", hg = "destroy", ig = "direction", jg = "disable", kg = "disabled", lg = "display", mg = "dispose", ng = "div", og = "drag", pg = "dragstart", qg = "draw", rg = "drawing", sg = "drilldown", tg = "drop", ug = "earlycancel", vg = "enable", wg = "end", xg = "enter", yg = "error", zg = "exact", Ag = "expanded", Bg = "false", Cg = "filterColumnIndex", Dg = "filterColumnLabel", Eg = "finish", Fg = "fixed", Gg = "focus", Hg = "for", R = "function", Ig = "g", Jg = "getState", Kg = "goog-button", Lg = "goog-combobox", Mg = "goog-combobox-active", Ng = "goog-combobox-button", Og = "goog-combobox-disabled", Pg = "goog-container", Qg = "goog-control", Rg = "goog-custom-button", Sg = "goog-flat-button", Tg = "goog-inline-block", Ug = "goog-inline-block ", Vg = "goog-link-button", Wg = "goog-menu", Xg = "goog-menu-button", Yg = "goog-menuheader", Zg = "goog-menuitem", $g = "goog-menuitem-accel", ah = "goog-menuitem-mnemonic-separator", bh = "goog-menuseparator", ch = "goog-option", dh = "goog-option-selected", eh = "goog-slider-disabled", fh = "goog-slider-dragging", gh = "goog-slider-thumb-dragging", hh = "google-visualization-controls-categoryfilter", ih = "google-visualization-controls-categoryfilter-selected", jh = "google-visualization-controls-label", kh = "google-visualization-controls-rangefilter-thumblabel", lh = "google-visualization-controls-slider-handle", mh = "google-visualization-controls-slider-horizontal", nh = "google-visualization-controls-slider-thumb", oh = "google-visualization-controls-slider-vertical", ph = "google-visualization-controls-stringfilter", qh = "google.visualization.", rh = "group by ", sh = "hAxis", th = "hasLabelsColumn", uh = "haspopup", vh = "hex", wh = "hidden", xh = "hide", yh = "highlight", zh = "horizontal", Ah = "id", Bh = "inline", Ch = "innerText", Dh = "input", Eh = "isDisposed", Fh = "key", Gh = "keydown", Hh = "keypress", Ih = "keyup", Jh = "label", Kh = "leave", Lh = "left", Mh = "li", Nh = "limit 1", Oh = "listbox", Ph = "load", Qh = "losecapture", Rh = "matchType", Sh = "max-width", Th = "maxValue", Uh = "menu", Vh = "menuitem", Wh = "menuitemcheckbox", Xh = "menuitemradio", Yh = "minValue", Zh = "month", $h = "mousedown", ai = "mousemove", bi = "mouseout", ci = "mouseover", di = "mouseup", ei = "mousewheel", fi = "ms", gi = "named", hi = "native code", ii = "new ", ji = "nodeType", ki = "none", li = "null", mi = "number", ni = "o", oi = "object", pi = "off", qi = "on", ri = "open", si = "option", ti = "order by ", ui = "orientation", vi = "overflow", wi = "paddingBottom", xi = "paddingLeft", yi = "paddingRight", zi = "paddingTop", Ai = "paste", Bi = "pending", Ci = "pixelLeft", Di = "play", Ei = "position", Fi = "position: absolute; top: 0; left: 0; z-index: 1;", Gi = "prefix", Hi = "prefixMatch", Ii = "pressed", Ji = "px", Ki = "rangechange", Li = "ready", Ni = "realtimeTrigger", Oi = "relative", Pi = "reset", Qi = "resetControl", Ri = "resume", Si = "rgb", Ti = "right", Ui = "role", Vi = "rtl", Wi = "scroll", Xi = "second", Yi = "select", Zi = "select ", $i = "selected", aj = "separator", bj = "show", cj = "showRangeValues", dj = "slider", ej = "solid", fj = "sortValues", gj = "span", hj = "splice", ij = "start", jj = "statechange", kj = "static", lj = "stop", mj = "string", nj = "style", oj = "submit", pj = "tabIndex", qj = "tabindex", rj = "text", sj = "textContent", tj = "tick", uj = "ticks", vj = "title", wj = "touchcancel", xj = "touchend", yj = "touchmove", zj = "touchstart", Aj = "transform", Bj = "transparent", Cj = "true", Dj = "ui", Ej = "ui.type", Fj = "uichange", Gj = "ul", Hj = "uncheck", Ij = "unhighlight", Jj = "unitIncrement", Kj = "unselect", Lj = "unselectable", Mj = "useFormattedValue", Nj = "value", Oj = "valuemax", Pj = "valuemin", Qj = "valuenow", Rj = "values", Sj = "vertical", Tj = "visible", Uj = "where ", Vj = "window.event", Wj = "x", Xj = "{", Yj = "{}", Zj = "|[", $j = "}", ak = "\xa0", S, bk = this, nk = "closure_uid_" + p[eb](2147483648 * p.random())[$b](36), ok = 0, tk = Date.now || function() {
return +new Date();
}, yk = /&/g, zk = /</g, Ak = />/g, Bk = /\"/g, Ck = /[&<>\"]/, Ek = ga[J], Fk = Ek[y] ? function(a, b, c) {
return Ek[y][O](a, b, c);
} :function(a, b, c) {
if (c = c == k ? 0 :0 > c ? p.max(0, a[H] + c) :c, T(a)) return T(b) && 1 == b[H] ? a[y](b, c) :-1;
for (;c < a[H]; c++) if (c in a && a[c] === b) return c;
return -1;
}, Gk = Ek[Db] ? function(a, b, c) {
Ek[Db][O](a, b, c);
} :function(a, b, c) {
for (var e = a[H], f = T(a) ? a[oc](Q) :a, g = 0; e > g; g++) g in f && b[O](c, f[g], g, a);
}, Hk = Ek.filter ? function(a, b, c) {
return Ek.filter[O](a, b, c);
} :function(a, b, c) {
for (var e = a[H], f = [], g = 0, n = T(a) ? a[oc](Q) :a, q = 0; e > q; q++) if (q in n) {
var v = n[q];
b[O](c, v, q, a) && (f[g++] = v);
}
return f;
}, Ik = Ek.map ? function(a, b, c) {
return Ek.map[O](a, b, c);
} :function(a, b, c) {
for (var e = a[H], f = ga(e), g = T(a) ? a[oc](Q) :a, n = 0; e > n; n++) n in g && (f[n] = b[O](c, g[n], n, a));
return f;
}, Jk = Ek.every ? function(a, b, c) {
return Ek.every[O](a, b, c);
} :function(a, b, c) {
for (var e = a[H], f = T(a) ? a[oc](Q) :a, g = 0; e > g; g++) if (g in f && !b[O](c, f[g], g, a)) return l;
return j;
};
Ha(V[J], function() {
return new V(this.x, this.y);
}), S = Sk[J], Ha(S, function() {
return new Sk(this[u], this[P]);
}), S.am = function() {
return this[u] * this[P];
}, S.ga = function() {
return !this.am();
}, S.ceil = function() {
return ka(this, p[db](this[u])), Qa(this, p[db](this[P])), this;
}, S.floor = function() {
return ka(this, p[eb](this[u])), Qa(this, p[eb](this[P])), this;
}, S.round = function() {
return ka(this, p[$a](this[u])), Qa(this, p[$a](this[P])), this;
};
var $k = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), bl, cl, dl, el, fl, gl, hl;
el = dl = cl = bl = l;
var kl;
if (kl = il()) {
var ll = jl();
bl = 0 == kl[y]("Opera"), cl = !bl && -1 != kl[y]("MSIE"), dl = !bl && -1 != kl[y]("WebKit"), 
el = !bl && !dl && "Gecko" == ll.product;
}
var ml = bl, W = cl, X = el, Y = dl, nl = jl(), ol = nl && nl.platform || Q;
fl = -1 != ol[y]("Mac"), gl = -1 != ol[y]("Win"), hl = -1 != ol[y]("Linux");
var pl = !!jl() && -1 != (jl().appVersion || Q)[y]("X11"), rl;
a:{
var sl = Q, tl;
if (ml && bk.opera) var ul = bk.opera.version, sl = typeof ul == R ? ul() :ul; else if (X ? tl = /rv\:([^\);]+)(\)|;)/ :W ? tl = /MSIE\s+([^\);]+)(\)|;)/ :Y && (tl = /WebKit\/(\S+)/), 
tl) var vl = tl.exec(il()), sl = vl ? vl[1] :Q;
if (W) {
var wl = ql();
if (wl > ja(sl)) {
rl = s(wl);
break a;
}
}
rl = sl;
}
var yl = rl, zl = {}, Al = bk[kc], Bl = Al && W ? ql() || (Al.compatMode == re ? ia(yl, 10) :5) :h, Cl, Dl = !W || W && Bl >= 9, El = !X && !W || W && W && Bl >= 9 || X && Z("1.9.1"), Fl = W && !Z("9"), Ol = {
cellpadding:"cellPadding",
cellspacing:"cellSpacing",
colspan:"colSpan",
frameborder:"frameBorder",
height:"height",
maxlength:"maxLength",
role:Ui,
rowspan:"rowSpan",
type:"type",
usemap:"useMap",
valign:"vAlign",
width:"width"
}, Xl = {
SCRIPT:1,
STYLE:1,
HEAD:1,
IFRAME:1,
OBJECT:1
}, Yl = {
IMG:dd,
BR:cd
};
S = Ll[J], S.n = Kl, S.a = function(a) {
return T(a) ? this.r.getElementById(a) :a;
}, S.hk = function(a, b, c) {
return Nl(this.r, a, b, c);
}, S.el = function(a) {
return a = (a || this.ii() || ba)[kc], a = Rl(a) ? a[Vb] :a[vc], new Sk(a[ic], a[Jc]);
}, S.f = function() {
return Ql(this.r, arguments);
}, S.createElement = function(a) {
return this.r[Ab](a);
}, S.createTextNode = function(a) {
return this.r[hb](a);
}, S.mg = function() {
return Rl(this.r);
}, S.ii = function() {
return this.r[Kb] || this.r[Nb];
}, S.dl = function() {
return !Y && Rl(this.r) ? this.r[Vb] :this.r[vc];
}, S.pd = function() {
var a = this.r, b = !Y && Rl(a) ? a[Vb] :a[vc], a = a[Kb] || a[Nb];
return new V(a.pageXOffset || b[Kc], a.pageYOffset || b[Yb]);
}, S.appendChild = function(a, b) {
a[Sa](b);
}, S.ti = Sl, S.removeNode = Tl, S.og = function(a) {
return El && a.children != h ? a.children :Hk(a[Mb], function(a) {
return 1 == a[bb];
});
}, S.Uh = Ul, Oa(S, Vl), Ha(cm[J], function() {
return new cm(this.top, this[bd], this[Lc], this[A]);
}), Oa(cm[J], function(a) {
return this && a ? a instanceof cm ? a[A] >= this[A] && a[bd] <= this[bd] && a.top >= this.top && a[Lc] <= this[Lc] :a.x >= this[A] && a.x <= this[bd] && a.y >= this.top && a.y <= this[Lc] :l;
}), Ha(dm[J], function() {
return new dm(this[A], this.top, this[u], this[P]);
}), dm[J].ue = function(a) {
var b = p.max(this[A], a[A]), c = p.min(this[A] + this[u], a[A] + a[u]);
if (c >= b) {
var e = p.max(this.top, a.top);
if (a = p.min(this.top + this[P], a.top + a[P]), a >= e) return na(this, b), this.top = e, 
ka(this, c - b), Qa(this, a - e), j;
}
return l;
}, Oa(dm[J], function(a) {
return a instanceof dm ? this[A] <= a[A] && this[A] + this[u] >= a[A] + a[u] && this.top <= a.top && this.top + this[P] >= a.top + a[P] :a.x >= this[A] && a.x <= this[A] + this[u] && a.y >= this.top && a.y <= this.top + this[P];
});
var um = X ? "MozUserSelect" :Y ? "WebkitUserSelect" :k, ym = {
thin:2,
medium:4,
thick:6
}, om = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
S = Bm[J], S.Ui = function() {
return this.Ad ? (this.Ad[Uc] != this.ta && this.ta[Sa](this.Ad), this.Ad) :this.ta;
}, S.addError = function(a) {
this.$l(a, yg);
}, S.$l = function(a, b) {
var c = this.Ui(), e = {
removable:j,
type:b
}, c = {
id:google[L].errors.addError(c, a, k, e),
message:a,
detailedMessage:Q,
options:e
};
google[L][x][Ta](this.hl, yg, c);
}, S.removeAll = function() {
var a = this.Ui();
google[L].errors[Bc](a);
}, S.Ai = function(a, b) {
try {
return a[O](b);
} catch (c) {
this.addError(c.message);
}
};
var Cm = "StopIteration" in bk ? bk.StopIteration :r("StopIteration");
Ga(Dm[J], function() {
d(Cm);
}), Dm[J].qg = function() {
return this;
}, S = Im[J], S.X = 0, S.vd = 0, S.ab = function() {
return this.X;
}, S.Q = function() {
this.we();
for (var a = [], b = 0; b < this.K[H]; b++) a[t](this.p[this.K[b]]);
return a;
}, S.Je = function() {
return this.we(), this.K.concat();
}, S.Za = function(a) {
return Jm(this.p, a);
}, S.ga = function() {
return 0 == this.X;
}, wa(S, function() {
this.p = {}, Da(this.K, 0), this.vd = this.X = 0;
}), qa(S, function(a) {
return Jm(this.p, a) ? (delete this.p[a], this.X--, this.vd++, this.K[H] > 2 * this.X && this.we(), 
j) :l;
}), S.we = function() {
if (this.X != this.K[H]) {
for (var a = 0, b = 0; a < this.K[H]; ) {
var c = this.K[a];
Jm(this.p, c) && (this.K[b++] = c), a++;
}
Da(this.K, b);
}
if (this.X != this.K[H]) {
for (var e = {}, b = a = 0; a < this.K[H]; ) c = this.K[a], Jm(e, c) || (this.K[b++] = c, 
e[c] = 1), a++;
Da(this.K, b);
}
}, S.get = function(a, b) {
return Jm(this.p, a) ? this.p[a] :b;
}, S.set = function(a, b) {
Jm(this.p, a) || (this.X++, this.K[t](a), this.vd++), this.p[a] = b;
}, S.jg = function(a) {
var b;
a instanceof Im ? (b = a.Je(), a = a.Q()) :(b = Vk(a), a = Uk(a));
for (var c = 0; c < b[H]; c++) this.set(b[c], a[c]);
}, Ha(S, function() {
return new Im(this);
}), S.qg = function(a) {
this.we();
var b = 0, c = this.K, e = this.p, f = this.vd, g = this, n = new Dm();
return Ga(n, function() {
for (;;) {
f != g.vd && d(r("The map has changed since the iterator was created")), b >= c[H] && d(Cm);
var n = c[b++];
return a ? n :e[n];
}
}), n;
}, S = Km[J], S.ab = function() {
return this.p.ab();
}, S.add = function(a) {
this.p.set(Lm(a), a);
}, S.jg = function(a) {
a = Em(a);
for (var b = a[H], c = 0; b > c; c++) this.add(a[c]);
}, S.removeAll = function(a) {
a = Em(a);
for (var b = a[H], c = 0; b > c; c++) this[yb](a[c]);
}, qa(S, function(a) {
return this.p[yb](Lm(a));
}), wa(S, function() {
this.p[Lb]();
}), S.ga = function() {
return this.p.ga();
}, Oa(S, function(a) {
return this.p.Za(Lm(a));
}), S.ue = function(a) {
var b = new Km();
a = Em(a);
for (var c = 0; c < a[H]; c++) {
var e = a[c];
this[Nc](e) && b.add(e);
}
return b;
}, S.Q = function() {
return this.p.Q();
}, Ha(S, function() {
return new Km(this);
}), S.qg = function() {
return this.p.qg(l);
}, Mm[J].ca = l, Mm[J].A = function() {
return this.ca;
}, Mm[J].e = function() {
this.ca || (this.ca = j, this.g());
}, Mm[J].g = function() {
if (this.Wl && Nm[Oc](k, this.Wl), this.Wi) for (;this.Wi[H]; ) this.Wi.shift()();
}, Pm[dd] = dk;
var Qm = !W || W && Bl >= 9, Rm = !W || W && Bl >= 9, Sm = W && !Z("9");
!Y || Z("528"), X && Z("1.9b") || W && Z(ke) || ml && Z("9.5") || Y && Z("528"), 
X && !Z(ke) || W && Z("9"), S = Tm[J], S.g = function() {}, S.e = function() {}, 
S.rc = l, S.defaultPrevented = l, S.Ee = j, S.stopPropagation = function() {
this.rc = j;
}, S.preventDefault = function() {
this.defaultPrevented = j, this.Ee = l;
}, U(Vm, Tm);
var Wm = [ 1, 4, 2 ];
S = Vm[J], Ia(S, k), S.relatedTarget = k, S.offsetX = 0, S.offsetY = 0, ya(S, 0), 
za(S, 0), oa(S, 0), pa(S, 0), S.button = 0, ra(S, 0), S.charCode = 0, S.ctrlKey = l, 
Ca(S, l), S.shiftKey = l, S.metaKey = l, S.eg = l, S.pa = k, S.Tb = function(a, b) {
var c = ua(this, a[E]);
Tm[O](this, c), Ia(this, a[N] || a.srcElement), ma(this, b);
var e = a[Xa];
if (e) {
if (X) {
var f;
a:{
try {
Pm(e[sb]), f = j;
break a;
} catch (g) {}
f = l;
}
f || (e = k);
}
} else c == ci ? e = a.fromElement :c == bi && (e = a.toElement);
this.relatedTarget = e, this.offsetX = Y || a.offsetX !== h ? a.offsetX :a.layerX, 
this.offsetY = Y || a.offsetY !== h ? a.offsetY :a.layerY, ya(this, a[Tb] !== h ? a[Tb] :a.pageX), 
za(this, a[Ub] !== h ? a[Ub] :a.pageY), oa(this, a[tb] || 0), pa(this, a[ub] || 0), 
this.button = a.button, ra(this, a[B] || 0), this.charCode = a[xb] || (c == Hh ? a[B] :0), 
this.ctrlKey = a[nc], Ca(this, a[ac]), this.shiftKey = a[Pc], this.metaKey = a[qb], 
this.eg = fl ? a[qb] :a[nc], this.state = a.state, this.pa = a, a.defaultPrevented && this[mb](), 
delete this.rc;
}, S.dm = function(a) {
return Qm ? this.pa.button == a :this[E] == Xf ? 0 == a :!!(this.pa.button & Wm[a]);
}, S.Df = function() {
return this.dm(0) && !(Y && fl && this[nc]);
}, S.stopPropagation = function() {
Vm.b[qc][O](this), this.pa[qc] ? this.pa[qc]() :this.pa.cancelBubble = j;
}, S.preventDefault = function() {
Vm.b[mb][O](this);
var a = this.pa;
if (a[mb]) a[mb](); else if (a.returnValue = l, Sm) try {
(a[nc] || 112 <= a[B] && 123 >= a[B]) && ra(a, -1);
} catch (b) {}
}, S.ll = function() {
return this.pa;
}, S.g = function() {};
var Ym = 0;
S = Xm[J], S.key = 0, S.nc = l, S.zi = l, S.Tb = function(a, b, c, e, f, g) {
kk(a) ? this.vi = j :a && a[Ib] && kk(a[Ib]) ? this.vi = l :d(r(Ee)), this.Oc = a, 
this.Rh = b, this.src = c, ua(this, e), this.capture = !!f, this.pe = g, this.zi = l, 
this.key = ++Ym, this.nc = l;
}, ta(S, function(a) {
return this.vi ? this.Oc[O](this.pe || this.src, a) :this.Oc[Ib][O](this.Oc, a);
});
var Zm = {}, $m = {}, an = {}, bn = {}, ln = 0;
U(mn, Mm), S = mn[J], S.Qh = j, S.le = k, S.Tf = function(a) {
this.le = a;
}, S.addEventListener = function(a, b, c, e) {
cn(this, a, b, c, e);
}, S.removeEventListener = function(a, b, c, e) {
en(this, a, b, c, e);
}, S.dispatchEvent = function(a) {
var b = a[E] || a, c = $m;
if (b in c) {
if (T(a)) a = new Tm(a, this); else if (a instanceof Tm) Ia(a, a[N] || this); else {
var e = a;
a = new Tm(b, this), al(a, e);
}
var f, g, e = 1, c = c[b], b = j in c;
if (b) {
for (f = [], g = this; g; g = g.le) f[t](g);
g = c[j], g.Sa = g.X;
for (var n = f[H] - 1; !a.rc && n >= 0 && g.Sa; n--) ma(a, f[n]), e &= jn(g, f[n], a[E], j, a) && a.Ee != l;
}
if (l in c) if (g = c[l], g.Sa = g.X, b) for (n = 0; !a.rc && n < f[H] && g.Sa; n++) ma(a, f[n]), 
e &= jn(g, f[n], a[E], l, a) && a.Ee != l; else for (f = this; !a.rc && f && g.Sa; f = f.le) ma(a, f), 
e &= jn(g, f, a[E], l, a) && a.Ee != l;
a = Boolean(e);
} else a = j;
return a;
}, S.g = function() {
mn.b.g[O](this);
var a = h, b = 0, c = a == k, a = !!a;
if (this == k) Tk(an, function(e) {
for (var f = e[H] - 1; f >= 0; f--) {
var g = e[f];
(c || a == g[rb]) && (gn(g.key), b++);
}
}); else {
var e = mk(this);
if (an[e]) for (var e = an[e], f = e[H] - 1; f >= 0; f--) {
var g = e[f];
(c || a == g[rb]) && (gn(g.key), b++);
}
}
this.le = k;
}, U(nn, mn), nn[J].enabled = l;
var on = bk.window;
S = nn[J], S.ba = k, S.jl = function() {
if (this.enabled) {
var a = tk() - this.lg;
a > 0 && a < .8 * this.Sc ? this.ba = this.nd[jc](this.kg, this.Sc - a) :(this.Tk(), 
this.enabled && (this.ba = this.nd[jc](this.kg, this.Sc), this.lg = tk()));
}
}, S.Tk = function() {
this[z](tj);
}, S.start = function() {
this.enabled = j, this.ba || (this.ba = this.nd[jc](this.kg, this.Sc), this.lg = tk());
}, Ba(S, function() {
this.enabled = l, this.ba && (this.nd[Ya](this.ba), this.ba = k);
}), S.g = function() {
nn.b.g[O](this), this[Zb](), delete this.nd;
}, S = qn[J], S.Wh = function(a, b) {
this.ni(a, b) || (this.Ci(a), this.Ci(b), this.Bi(a, b, this.Cb), this.Bi(b, a, this.Rb));
}, S.Pk = function(a, b) {
this.ni(a, b) && (this.xi(a, b, this.Cb), this.xi(b, a, this.Rb), this.wi(a) && this.yi(a), 
this.wi(b) && this.yi(b));
}, wa(S, function() {
this.Ea[Lb](), this.Cb[Lb](), this.Rb[Lb]();
}), S.ga = function() {
return this.Ea.ga();
}, S.fl = function() {
try {
return this.hm(), j;
} catch (a) {
return l;
}
}, S.ab = function() {
return this.Ea.ab();
}, S.Q = function() {
return this.Ea.Q();
}, Oa(S, function(a) {
return this.Ea.Za(this.da(a));
}), S.ni = function(a, b) {
var c = this.da(a);
return this.Cb.Za(c) && this.Cb.get(c)[Nc](this.da(b));
}, S.Jk = function(a) {
return this[Nc](a) ? !this.Rb.Za(this.da(a)) :l;
}, S.ze = function(a) {
return this[Nc](a) ? (a = this.Rb.get(this.da(a)), a ? Hm(a, function(a) {
return this.Ea.get(a);
}, this) :k) :k;
}, S.og = function(a) {
return this[Nc](a) ? (a = this.Cb.get(this.da(a)), a ? Hm(a, function(a) {
return this.Ea.get(a);
}, this) :k) :k;
}, S.Wf = function() {
if (this.Ea.ga()) return [];
var a = [];
return Gm(this.Cb, function(b, c) {
this.Rb.Za(c) || a[t](this.Ea.get(c));
}, this), 0 == a[H] && d(r("Invalid state: DAG has not root node(s).")), a;
}, S.hm = function() {
for (var a = this.ok(this.Rb), b = [], c = Ik(this.Wf(), function(a) {
return this.da(a);
}, this); 0 < c[H]; ) {
for (var e = [], f = 0; f < c[H]; f++) {
var g = c[f];
b[t](this.Ea.get(g));
var n = this.Cb.get(g);
n && Gm(n, function(b) {
a.get(b)[yb](g), a.get(b).ga() && (a[yb](b), e[t](b));
});
}
c = e;
}
return b[H] != this.Ea.ab() && d(r("cycle detected")), b;
}, Ha(S, function() {
return this.ga() ? new qn() :qn[J].ve[Oc](this, this.Wf());
}), S.ve = function() {
var b = new qn();
if (0 == arguments[H]) return b;
for (var c = 0; c < arguments[H]; c++) this.Ri(arguments[c], b);
return b;
}, S.Ri = function(a, b) {
var c = this.og(a);
c && Gm(c, function(c) {
b.Wh(a, c), this.Ri(c, b);
}, this);
}, S.ml = function(a) {
for (var b = this.ve(a), c = b.Q(), e = 0; e < c[H]; e++) {
var f = c[e];
if (f != a && b.ze(f)[H] != this.ze(f)[H]) return l;
}
return j;
}, S.da = function(a) {
var b = typeof a;
return b == oi && a || b == R ? ni + mk(a) :b[Wb](0, 1) + a;
}, S.Ci = function(a) {
this.Ea.set(this.da(a), a);
}, S.yi = function(a) {
this.Ea[yb](this.da(a));
}, S.Bi = function(a, b, c) {
var e = c.get(this.da(a));
e || (e = new Km(), c.set(this.da(a), e)), e.add(this.da(b));
}, S.xi = function(a, b, c) {
this.da(a);
var e = c.get(this.da(a));
e[yb](this.da(b)), e.ga() && c[yb](this.da(a));
}, S.wi = function(a) {
return !this.Cb.Za(this.da(a)) && !this.Rb.Za(this.da(a));
}, S.ok = function(a) {
var b = new Im();
return Gm(a, function(a, e) {
b.set(e, a[yc]());
}), b;
}, S = rn[J], S.Tc = function(a) {
this.qe.addError(a);
}, S.bind = function(a, b) {
if (sn(a) && kk(a[rc])) if (sn(b)) {
var c = mk(a);
if (mk(b) == c) this.Tc(se); else if (c = [], this.J[Nc](a) || c[t](a), this.J[Nc](b) || c[t](b), 
this.J.Wh(a, b), this.Lk()) for (var e = 0; e < c[H]; e++) this.ud[t](google[L][x][uc](c[e], jj, rk(this.Ok, this, c[e]))), 
this.ud[t](google[L][x][uc](c[e], Li, rk(this.Nk, this, c[e]))), this.ud[t](google[L][x][uc](c[e], yg, rk(this.Mk, this, c[e]))); else this.J.Pk(a, b);
} else this.Tc(b + gd); else this.Tc(a + hd);
}, S.e = function() {
Gk(this.ud, function(a) {
google[L][x][gb](a);
}), this.ud = [], this.Qa = k, this.J[Lb](), this.ca = j;
}, S.A = function() {
return this.ca;
}, Ka(S, function(a) {
if (a && !this.J.ga()) {
this.Qa = new tn(this);
for (var b = this.J.Wf(), c = 0; c < b[H]; c++) b[c][Ac](a);
this.Qa[Cc](b);
}
}), S.Lk = function() {
return this.J.fl() ? j :(this.Tc(Se), l);
}, S.Sk = function(a) {
var b = a[rc]();
return lk(b) ? kk(b[Jb]) ? j :kk(b.applyOperator) ? this.J.ml(a) :l :l;
}, S.Ok = function(a) {
this.J[Nc](a), this.Qa = this.Qa || new tn(this), this.Qa.fi(a);
}, S.Nk = function(a) {
this.J[Nc](a), sn(a) && kk(a[rc]) && !this.Sk(a) ? this.Tc(a + hd) :(this.Qa = this.Qa || new tn(this), 
this.Qa.fi(a));
}, S.Mk = function(a) {
this.J[Nc](a), this.Qa && this.Qa.handleError(a);
}, S.Bl = function(a) {
a ? google[L][x][Ta](this, Li, k) :this.Tc(Me), this.Qa = k;
}, S = tn[J], S.start = function(a) {
tn[J].gi[Oc](this, a);
for (var b = 0; b < a[H]; b++) this.qi(a[b]);
}, S.fi = function(a) {
if (this.J[Nc](a)) {
switch (this.yd(a)) {
case Bi:
break;

case yg:
break;

case rg:
this.Qc(a, Li), this.ki(a);
break;

case Li:
this.gi(a), this.ki(a);
break;

default:
this.yd(a);
}
this.di();
}
}, S.handleError = function(a) {
if (this.J[Nc](a)) {
switch (this.yd(a)) {
case Bi:
case Li:
case yg:
break;

case rg:
this.Qc(a, yg), this.Vk(a);
break;

default:
this.yd(a);
}
this.di();
}
}, S.di = function() {
var b, a = 0;
for (b in this.Be) {
var c = this.Be[b];
if (c == yg) a++; else if (c != Li) return;
}
this.Sb.Bl(0 == a);
}, S.yd = function(a) {
return this.Be[mk(a)];
}, S.Qc = function(a, b) {
this.Be[mk(a)] = b;
}, S.gi = function() {
for (var b = qn[J].ve[Oc](this.J, arguments), c = b.Q(), e = 0; e < c[H]; e++) b.Jk(c[e]) || this.Qc(c[e], Bi);
}, S.Vk = function(a) {
a = this.J.ve(a).Q();
for (var b = 1; b < a[H]; b++) this.Qc(a[b], yg);
}, S.qi = function(a) {
this.Qc(a, rg);
var b = google[L].errors.createProtectedCallback(function() {
a[Dc]();
}, rk(this.handleError, this, a));
pn(b);
}, S.ki = function(a) {
if (a = this.J.og(a)) for (var b = 0; b < a[H]; b++) {
var c = a[b];
if (this.$k(c)) {
var e = this.al(c);
c[Ac](e), this.qi(c);
}
}
}, S.$k = function(a) {
if (a = this.J.ze(a), !a) return j;
for (var b = 0; b < a[H]; b++) if (this.yd(a[b]) != Li) return l;
return j;
}, S.al = function(a) {
if (a = Ik(this.J.ze(a), function(a) {
return a = a[rc](), kk(a[Jb]) ? a[Jb][O](a) :kk(a.applyOperator) ? a.applyOperator[O](a) :void 0;
}), 1 == a[H]) a = a[0]; else {
for (var b = a[0], c = Pk(a, 1), e = new Km(un(c[0])), f = 1; f < c[H] && (e = e.ue(un(c[f])), 
!e.ga()); f++) ;
for (var f = [], g = 0; g < b[cc](); g++) e[Nc](b.getUnderlyingTableRowIndex(g)) && f[t](g);
for (e = new Km(vn(c[0])), g = 1; g < c[H] && (e = e.ue(vn(c[g])), !e.ga()); g++) ;
for (c = [], g = 0; g < b[ib](); g++) e[Nc](b.getUnderlyingTableColumnIndex(g)) && c[t](g);
a = new google[L][Hc](a[0]), a[cb](f), a.setColumns(c);
}
return a;
}, S = wn[J], S.bind = function(a, b) {
hk(a) || (a = [ a ]), hk(b) || (b = [ b ]);
for (var c = 0; c < a[H]; c++) for (var e = 0; e < b[H]; e++) this.Sb[Ob](a[c], b[e]);
return this;
}, Ka(S, function(a) {
this.Sb[Dc](a);
}), S.e = function() {
google[L][x][gb](this.yl), google[L][x][gb](this.wl), Om(this.Sb);
}, S.A = function() {
return this.Sb.A();
}, S.getContainer = function() {
return this.ta;
}, S.il = function() {
this.yl = google[L][x][uc](this.Sb, Li, rk(this.Ji, this, Li)), this.wl = google[L][x][uc](this.Sb, yg, rk(this.Ji, this, yg));
}, S.Ji = function(a, b) {
google[L][x][Ta](this, a, b);
}, S = xn[J], S.ui = function(a) {
return (a = this.p.get(a)) && this.ag && (a[yb](), this.pi(a)), a;
}, S.get = function(a, b) {
var c = this.ui(a);
return c ? c[kb] :b;
}, S.set = function(a, b) {
var c = this.ui(a);
c ? la(c, b) :(c = new yn(a, b), this.p.set(a, c), this.pi(c));
}, S.shift = function() {
return this.ri(this.L[lc]);
}, S.pop = function() {
return this.ri(this.L.Ra);
}, qa(S, function(a) {
return (a = this.p.get(a)) ? (this.removeNode(a), j) :l;
}), S.removeNode = function(a) {
a[yb](), this.p[yb](a.key);
}, S.ab = function() {
return this.p.ab();
}, S.ga = function() {
return this.p.ga();
}, S.Je = function() {
return this.map(function(a, b) {
return b;
});
}, S.Q = function() {
return this.map(function(a) {
return a;
});
}, Oa(S, function(a) {
return this.some(function(b) {
return b == a;
});
}), S.Za = function(a) {
return this.p.Za(a);
}, wa(S, function() {
this.mi(0);
}), S.forEach = function(a, b) {
for (var c = this.L[lc]; c != this.L; c = c[lc]) a[O](b, c[kb], c.key, this);
}, S.map = function(a, b) {
for (var c = [], e = this.L[lc]; e != this.L; e = e[lc]) c[t](a[O](b, e[kb], e.key, this));
return c;
}, S.some = function(a, b) {
for (var c = this.L[lc]; c != this.L; c = c[lc]) if (a[O](b, c[kb], c.key, this)) return j;
return l;
}, S.every = function(a, b) {
for (var c = this.L[lc]; c != this.L; c = c[lc]) if (!a[O](b, c[kb], c.key, this)) return l;
return j;
}, S.pi = function(a) {
this.ag ? (Ga(a, this.L[lc]), a.Ra = this.L, Ga(this.L, a), a[lc].Ra = a) :(a.Ra = this.L.Ra, 
Ga(a, this.L), this.L.Ra = a, Ga(a.Ra, a)), this.Ph != k && this.mi(this.Ph);
}, S.mi = function(a) {
for (var b = this.p.ab(); b > a; b--) this.removeNode(this.ag ? this.L.Ra :this.L[lc]);
}, S.ri = function(a) {
return this.L != a && this.removeNode(a), a[kb];
}, qa(yn[J], function() {
Ga(this.Ra, this[lc]), this[lc].Ra = this.Ra, delete this.Ra, delete this[lc];
}), U(Fn, Mm);
var Gn = [];
S = Fn[J], S.d = function(a, b, c, e, f) {
hk(b) || (Gn[0] = b, b = Gn);
for (var g = 0; g < b[H]; g++) {
var n = cn(a, b[g], c || this, e || l, f || this.ld || this);
this.K[t](n);
}
return this;
}, S.I = function(a, b, c, e, f) {
if (hk(b)) for (var g = 0; g < b[H]; g++) this.I(a, b[g], c, e, f); else {
a:{
if (c = c || this, f = f || this.ld || this, e = !!e, a = fn(a, b, e)) for (b = 0; b < a[H]; b++) if (!a[b].nc && a[b].Oc == c && a[b][rb] == e && a[b].pe == f) {
a = a[b];
break a;
}
a = k;
}
a && (a = a.key, gn(a), Lk(this.K, a));
}
return this;
}, S.removeAll = function() {
Gk(this.K, gn), Da(this.K, 0);
}, S.g = function() {
Fn.b.g[O](this), this[Bc]();
}, ta(S, function() {
d(r("EventHandler.handleEvent not implemented"));
}), ek(Hn), Hn[J].em = 0, Hn[J].zl = function() {
return le + (this.em++)[$b](36);
}, Hn.Da(), U($, mn), $[J].Al = Hn.Da();
var In = k;
S = $[J], S.Na = k, S.q = l, S.j = k, S.fb = k, S.hb = k, S.sa = k, S.la = k, S.Ja = k, 
S.yg = l, S.S = function() {
return this.Na || (this.Na = this.Al.zl());
}, S.Qf = function(a) {
this.sa && this.sa.Ja && (Xk(this.sa.Ja, this.Na), Yk(this.sa.Ja, a, this)), this.Na = a;
}, S.a = function() {
return this.j;
}, S.tb = function(a) {
this.j = a;
}, S.R = function() {
return this.yc || (this.yc = new Fn(this));
}, S.Ve = function(a) {
this == a && d(r(Ue)), a && this.sa && this.Na && this.sa.Ze(this.Na) && this.sa != a && d(r(Ue)), 
this.sa = a, $.b.Tf[O](this, a);
}, S.getParent = function() {
return this.sa;
}, S.Tf = function(a) {
this.sa && this.sa != a && d(r("Method not supported")), $.b.Tf[O](this, a);
}, S.n = function() {
return this.zb;
}, S.f = function() {
this.j = this.zb[Ab](ng);
}, S.Ha = function(a) {
this.Cg(a);
}, S.Cg = function(a, b) {
this.q && d(r(we)), this.j || this.f(), a ? a[ob](this.j, b || k) :this.zb.r[vc][Sa](this.j), 
(!this.sa || this.sa.q) && this.C();
}, S.V = function(a) {
this.q && d(r(we)), a && this.ma(a) ? (this.yg = j, this.zb && this.zb.r == Ml(a) || (this.zb = Kl(a)), 
this.ra(a), this.C()) :d(r("Invalid element to decorate"));
}, S.ma = function() {
return j;
}, S.ra = function(a) {
this.j = a;
}, S.C = function() {
this.q = j, this.sb(function(a) {
!a.q && a.a() && a.C();
});
}, S.ka = function() {
this.sb(function(a) {
a.q && a.ka();
}), this.yc && this.yc[Bc](), this.q = l;
}, S.g = function() {
$.b.g[O](this), this.q && this.ka(), this.yc && (this.yc.e(), delete this.yc), this.sb(function(a) {
a.e();
}), !this.yg && this.j && Tl(this.j), this.sa = this.hb = this.j = this.Ja = this.la = k;
}, S.gm = function(a) {
this.hb = a;
}, S.ia = function(a, b) {
this.Fc(a, this.Ia(), b);
}, S.Fc = function(a, b, c) {
if (a.q && (c || !this.q) && d(r(we)), (0 > b || b > this.Ia()) && d(r("Child component index out of bounds")), 
this.Ja && this.la || (this.Ja = {}, this.la = []), a[Va]() == this) {
var e = a.S();
this.Ja[e] = a, Lk(this.la, a);
} else Yk(this.Ja, a.S(), a);
a.Ve(this), Ok(this.la, b, 0, a), a.q && this.q && a[Va]() == this ? (c = this.z(), 
c[ob](a.a(), c[Mb][b] || k)) :c ? (this.j || this.f(), b = this.qa(b + 1), a.Cg(this.z(), b ? b.j :k)) :this.q && !a.q && a.j && a.j[Uc] && 1 == a.j[Uc][bb] && a.C();
}, S.z = function() {
return this.j;
}, S.jb = function() {
return this.fb == k && (this.fb = mm(this.q ? this.j :this.zb.r[vc])), this.fb;
}, S.Bc = function(a) {
this.q && d(r(we)), this.fb = a;
}, S.Yl = function() {
return !!this.la && 0 != this.la[H];
}, S.Ia = function() {
return this.la ? this.la[H] :0;
}, S.Ze = function(a) {
return this.Ja && a ? (a in this.Ja ? this.Ja[a] :h) || k :k;
}, S.qa = function(a) {
return this.la ? this.la[a] || k :k;
}, S.sb = function(a, b) {
this.la && Gk(this.la, a, b);
}, S.Md = function(a) {
return this.la && a ? Fk(this.la, a) :-1;
}, S.removeChild = function(a, b) {
if (a) {
var c = T(a) ? a :a.S();
a = this.Ze(c), c && a && (Xk(this.Ja, c), Lk(this.la, a), b && (a.ka(), a.j && Tl(a.j)), 
a.Ve(k));
}
return a || d(r("Child is not in parent component")), a;
}, S.Zl = function(a, b) {
return this[xc](this.qa(a), b);
}, S.ti = function(a) {
for (var b = []; this.Yl(); ) b[t](this.Zl(0, a));
return b;
};
var Ln;
ek(Kn), S = Kn[J], S.cb = function() {}, S.f = function(a) {
var b = a.n().f(ng, this.Qb(a)[Zc](dd), a.Mb);
return this.Ef(a, b), b;
}, S.z = function(a) {
return a;
}, S.oe = function(a, b, c) {
if (a = a.a ? a.a() :a) if (W && !Z(je)) {
var e = this.zf(Gl(a), b);
e[t](b), sk(c ? Hl :Il, a)[Oc](k, e);
} else Jl(a, b, c);
}, S.Yh = function(a, b, c) {
this.oe(a, b, c);
}, S.ma = function() {
return j;
}, S.V = function(a, b) {
b.id && a.Qf(b.id);
var c = this.z(b);
c && c[C] ? a.Nd(c[C][Rb] ? Mk(c[Mb]) :c[C]) :a.Nd(k);
var e = 0, f = this.l(), g = this.oc(), n = l, q = l, c = l, v = Gl(b);
Gk(v, function(a) {
n || a != f ? q || a != g ? e |= this.Ff(a) :q = j :(n = j, g == f && (q = j));
}, this), a.Uf(e), n || (v[t](f), g == f && (q = j)), q || v[t](g);
var D = a.$a;
if (D && v[t][Oc](v, D), W && !Z(je)) {
var K = this.zf(v);
0 < K[H] && (v[t][Oc](v, K), c = j);
}
return (!n || !q || D || c) && (c = v[Zc](dd), Fa(b, c)), this.Ef(a, b), b;
}, S.wc = function(a) {
a.jb() && this.Bc(a.a(), j), a[zc]() && this.gb(a, a.k);
}, S.eh = function(a, b) {
var c = b || this.cb();
c && Dn(a, c);
}, S.Ef = function(a, b) {
a[zc]() || this.mb(b, 1, j), a.Uk() && this.mb(b, 8, j), a.ja(16) && this.mb(b, 16, a.ad()), 
a.ja(64) && this.mb(b, 64, a.gd());
}, S.fd = function(a, b) {
vm(a, !b, !W && !ml);
}, S.Bc = function(a, b) {
this.oe(a, this.oc() + Wd, b);
}, S.Hb = function(a) {
var b;
return a.ja(32) && (b = a.Z()) ? Zl(b) :l;
}, S.gb = function(a, b) {
var c;
if (a.ja(32) && (c = a.Z())) {
if (!b && a.ji()) {
try {
c.blur();
} catch (e) {}
a.ji() && a.ac(k);
}
Zl(c) != b && (b ? va(c, 0) :(va(c, -1), c.removeAttribute(pj)));
}
}, S.Y = function(a, b) {
tm(a, b);
}, S.setState = function(a, b, c) {
var e = a.a();
if (e) {
var f = this.jd(b);
f && this.oe(a, f, c), this.mb(e, b, c);
}
}, S.mb = function(a, b, c) {
Ln || (Ln = {
1:kg,
8:$i,
16:Vf,
64:Ag
}), (b = Ln[b]) && En(a, b, c);
}, S.Nb = function(a, b) {
var c = this.z(a);
if (c && (Sl(c), b)) if (T(b)) Wl(c, b); else {
var e = function(a) {
if (a) {
var b = Ml(c);
c[Sa](T(a) ? b[hb](a) :a);
}
};
hk(b) ? Gk(b, e) :!ik(b) || ji in b ? e(b) :Gk(Mk(b), e);
}
}, S.Z = function(a) {
return a.a();
}, S.l = function() {
return Qg;
}, S.oc = function() {
return this.l();
}, S.Qb = function(a) {
var b = this.l(), c = [ b ], e = this.oc();
return e != b && c[t](e), b = this.Ik(a[Ic]()), c[t][Oc](c, b), (a = a.$a) && c[t][Oc](c, a), 
W && !Z(je) && c[t][Oc](c, this.zf(c)), c;
}, S.zf = function(a, b) {
var c = [];
return b && (a = a.concat([ b ])), Gk([], function(e) {
Jk(e, sk(Kk, a)) && (!b || Kk(e, b)) && c[t](e[Zc](gf));
}), c;
}, S.Ik = function(a) {
for (var b = []; a; ) {
var c = a & -a;
b[t](this.jd(c)), a &= ~c;
}
return b;
}, S.jd = function(a) {
return this.Oe || this.Oi(), this.Oe[a];
}, S.Ff = function(a) {
return this.Mi || this.Vl(), a = ia(this.Mi[a], 10), fa(a) ? 0 :a;
}, S.Oi = function() {
var a = this.oc();
this.Oe = {
1:a + Jd,
2:a + Od,
4:a + Ed,
8:a + Xd,
16:a + Hd,
32:a + Ld,
64:a + Ud
};
}, S.Vl = function() {
this.Oe || this.Oi();
var c, a = this.Oe, b = {};
for (c in a) b[a[c]] = c;
this.Mi = b;
}, U(Mn, Kn), ek(Mn), S = Mn[J], S.cb = function() {
return Of;
}, S.mb = function(a, b, c) {
16 == b ? En(a, Ii, c) :Mn.b.mb[O](this, a, b, c);
}, S.f = function(a) {
var b = Mn.b.f[O](this, a), c = a.Ec();
return c && this.bf(b, c), (c = a[F]()) && this[ec](b, c), a.ja(16) && this.mb(b, 16, a.ad()), 
b;
}, S.V = function(a, b) {
return b = Mn.b.V[O](this, a, b), a.Rj(this[F](b)), a.Qj(this.Ec(b)), a.ja(16) && this.mb(b, 16, a.ad()), 
b;
}, xa(S, dk), Ea(S, dk), S.Ec = function(a) {
return a.title;
}, S.bf = function(a, b) {
a && (a.title = b || Q);
}, S.l = function() {
return Kg;
}, U(Nn, mn), S = Nn[J], S.j = k, S.xe = k, S.dg = k, S.ye = k, S.Ga = -1, S.Ub = -1, 
S.ng = l;
var On = {
3:13,
12:144,
63232:38,
63233:40,
63234:37,
63235:39,
63236:112,
63237:113,
63238:114,
63239:115,
63240:116,
63241:117,
63242:118,
63243:119,
63244:120,
63245:121,
63246:122,
63247:123,
63248:44,
63272:46,
63273:36,
63275:35,
63276:33,
63277:34,
63289:144,
63302:45
}, Pn = {
Up:38,
Down:40,
Left:37,
Right:39,
Enter:13,
F1:112,
F2:113,
F3:114,
F4:115,
F5:116,
F6:117,
F7:118,
F8:119,
F9:120,
F10:121,
F11:122,
F12:123,
"U+007F":46,
Home:36,
End:35,
PageUp:33,
PageDown:34,
Insert:45
}, Qn = W || Y && Z(fe), Rn = fl && X;
S = Nn[J], S.Rd = function(a) {
Y && (17 == this.Ga && !a[nc] || 18 == this.Ga && !a[ac] || fl && 91 == this.Ga && !a[qb]) && (this.Ub = this.Ga = -1), 
-1 == this.Ga && (a[nc] && 17 != a[B] ? this.Ga = 17 :a[ac] && 18 != a[B] ? this.Ga = 18 :a[qb] && 91 != a[B] && (this.Ga = 91)), 
Qn && !An(a[B], this.Ga, a[Pc], a[nc], a[ac]) ? this[Ib](a) :(this.Ub = X ? Cn(a[B]) :a[B], 
Rn && (this.ng = a[ac]));
}, S.Tl = function() {
this.Ub = this.Ga = -1;
}, S.Gk = function(a) {
this.Tl(), this.ng = a[ac];
}, ta(S, function(a) {
var c, e, b = a.pa, f = b[ac];
W && a[E] == Hh ? (c = this.Ub, e = 13 != c && 27 != c ? b[B] :0) :Y && a[E] == Hh ? (c = this.Ub, 
e = 0 <= b[xb] && 63232 > b[xb] && Bn(c) ? b[xb] :0) :ml ? (c = this.Ub, e = Bn(c) ? b[B] :0) :(c = b[B] || this.Ub, 
e = b[xb] || 0, Rn && (f = this.ng), fl && 63 == e && 224 == c && (c = 191));
var g = c, n = b.keyIdentifier;
c ? c >= 63232 && c in On ? g = On[c] :25 == c && a[Pc] && (g = 9) :n && n in Pn && (g = Pn[n]), 
a = g == this.Ga, this.Ga = g, b = new Sn(g, e, a, b), Ca(b, f), this[z](b);
}), S.a = function() {
return this.j;
}, S.Gg = function(a, b) {
this.ye && this.detach(), this.j = a, this.xe = cn(this.j, Hh, this, b), this.dg = cn(this.j, Gh, this.Rd, b, this), 
this.ye = cn(this.j, Ih, this.Gk, b, this);
}, S.detach = function() {
this.xe && (gn(this.xe), gn(this.dg), gn(this.ye), this.ye = this.dg = this.xe = k), 
this.j = k, this.Ub = this.Ga = -1;
}, S.g = function() {
Nn.b.g[O](this), this.detach();
}, U(Sn, Vm);
var Vn = {}, Un = {};
U(Wn, $), S = Wn[J], S.Mb = k, S.t = 0, S.dd = 39, S.Ne = 255, S.Ce = 0, S.k = j, 
S.$a = k, S.ef = j, S.Pd = l, S.Jf = k, S.ff = function(a) {
this.q && a != this.ef && this.Dg(a), this.ef = a;
}, S.Z = function() {
return this.h.Z(this);
}, S.Td = function() {
return this.D || (this.D = new Nn());
}, S.Ye = function(a) {
a && (this.$a ? Kk(this.$a, a) || this.$a[t](a) :this.$a = [ a ], this.h.Yh(this, a, j));
}, S.Sl = function(a) {
a && this.$a && (Lk(this.$a, a), 0 == this.$a[H] && (this.$a = k), this.h.Yh(this, a, l));
}, S.oe = function(a, b) {
b ? this.Ye(a) :this.Sl(a);
}, S.f = function() {
var a = this.h.f(this);
this.tb(a), this.h.eh(a, this.Jf), this.Pd || this.h.fd(a, l), this.k || this.h.Y(a, l);
}, S.Ti = function(a) {
this.Jf = a;
}, S.z = function() {
return this.h.z(this.a());
}, S.ma = function(a) {
return this.h.ma(a);
}, S.ra = function(a) {
a = this.h.V(this, a), this.tb(a), this.h.eh(a, this.Jf), this.Pd || this.h.fd(a, l), 
this.k = a[M].display != ki;
}, S.C = function() {
if (Wn.b.C[O](this), this.h.wc(this), -2 & this.dd && (this.ef && this.Dg(j), this.ja(32))) {
var a = this.Z();
if (a) {
var b = this.Td();
b.Gg(a), this.R().d(b, Fh, this.va).d(a, Gg, this.Ud).d(a, Df, this.ac);
}
}
}, S.Dg = function(a) {
var b = this.R(), c = this.a();
a ? (b.d(c, ci, this.vf).d(c, $h, this.Wb).d(c, di, this.$b).d(c, bi, this.uf), 
this.kd != dk && b.d(c, Zf, this.kd), W && b.d(c, fg, this.Sg)) :(b.I(c, ci, this.vf).I(c, $h, this.Wb).I(c, di, this.$b).I(c, bi, this.uf), 
this.kd != dk && b.I(c, Zf, this.kd), W && b.I(c, fg, this.Sg));
}, S.ka = function() {
Wn.b.ka[O](this), this.D && this.D.detach(), this.k && this[zc]() && this.h.gb(this, l);
}, S.g = function() {
Wn.b.g[O](this), this.D && (this.D.e(), delete this.D), delete this.h, this.$a = this.Mb = k;
}, S.Nb = function(a) {
this.h.Nb(this.a(), a), this.Nd(a);
}, S.Nd = function(a) {
this.Mb = a;
}, S.kb = function() {
var a = this.Mb;
if (!a) return Q;
if (!T(a)) if (hk(a)) a = Ik(a, $l)[Zc](Q); else {
if (Fl && Ch in a) a = a.innerText[w](/(\r\n|\r|\n)/g, cd); else {
var b = [];
am(a, b, j), a = b[Zc](Q);
}
a = a[w](/ \xAD /g, dd)[w](/\xAD/g, Q), a = a[w](/\u200B/g, Q), Fl || (a = a[w](/ +/g, dd)), 
a != dd && (a = a[w](/^\s*/, Q));
}
return vk(a);
}, S.Bc = function(a) {
Wn.b.Bc[O](this, a);
var b = this.a();
b && this.h.Bc(b, a);
}, S.fd = function(a) {
this.Pd = a;
var b = this.a();
b && this.h.fd(b, a);
}, S.Y = function(a, b) {
if (b || this.k != a && this[z](a ? bj :xh)) {
var c = this.a();
return c && this.h.Y(c, a), this[zc]() && this.h.gb(this, a), this.k = a, j;
}
return l;
}, Ja(S, function() {
return !this.Xa(1);
}), S.ik = function() {
var a = this[Va]();
return !!a && typeof a[zc] == R && !a[zc]();
}, S.w = function(a) {
!this.ik() && this.pc(1, !a) && (a || (this[Sb](l), this.Wa(l)), this.k && this.h.gb(this, a), 
this[Xb](1, !a));
}, S.Wa = function(a) {
this.pc(2, a) && this[Xb](2, a);
}, S.cc = function() {
return this.Xa(4);
}, S.setActive = function(a) {
this.pc(4, a) && this[Xb](4, a);
}, S.Uk = function() {
return this.Xa(8);
}, S.ig = function(a) {
this.pc(8, a) && this[Xb](8, a);
}, S.ad = function() {
return this.Xa(16);
}, S.Tg = function(a) {
this.pc(16, a) && this[Xb](16, a);
}, S.ji = function() {
return this.Xa(32);
}, S.Ki = function(a) {
this.pc(32, a) && this[Xb](32, a);
}, S.gd = function() {
return this.Xa(64);
}, S.O = function(a) {
this.pc(64, a) && this[Xb](64, a);
}, Ma(S, function() {
return this.t;
}), S.Xa = function(a) {
return !!(this.t & a);
}, S.setState = function(a, b) {
this.ja(a) && b != this.Xa(a) && (this.h[Xb](this, a, b), this.t = b ? this.t | a :this.t & ~a);
}, S.Uf = function(a) {
this.t = a;
}, S.ja = function(a) {
return !!(this.dd & a);
}, S.Aa = function(a, b) {
this.q && this.Xa(a) && !b && d(r(we)), !b && this.Xa(a) && this[Xb](a, l), this.dd = b ? this.dd | a :this.dd & ~a;
}, S.Ca = function(a) {
return !!(this.Ne & a) && this.ja(a);
}, S.ul = function(a, b) {
this.Ne = b ? this.Ne | a :this.Ne & ~a;
}, S.hh = function(a, b) {
this.Ce = b ? this.Ce | a :this.Ce & ~a;
}, S.pc = function(a, b) {
return !(!this.ja(a) || this.Xa(a) == b || this.Ce & a && !this[z](Jn(a, b)) || this.A());
}, S.vf = function(a) {
(!a[Xa] || !Vl(this.a(), a[Xa])) && this[z](xg) && this[zc]() && this.Ca(2) && this.Wa(j);
}, S.uf = function(a) {
a[Xa] && Vl(this.a(), a[Xa]) || !this[z](Kh) || (this.Ca(4) && this[Sb](l), this.Ca(2) && this.Wa(l));
}, S.kd = dk, S.Wb = function(a) {
this[zc]() && (this.Ca(2) && this.Wa(j), a.Df() && (this.Ca(4) && this[Sb](j), this.h.Hb(this) && this.Z()[zb]())), 
!this.Pd && a.Df() && a[mb]();
}, S.$b = function(a) {
this[zc]() && (this.Ca(2) && this.Wa(j), this.cc() && this.ub(a) && this.Ca(4) && this[Sb](l));
}, S.Sg = function(a) {
this[zc]() && this.ub(a);
}, S.ub = function(a) {
this.Ca(16) && this.Tg(!this.ad()), this.Ca(8) && this.ig(j), this.Ca(64) && this.O(!this.gd());
var b = new Tm(jf, this);
return a && (Ca(b, a[ac]), b.ctrlKey = a[nc], b.metaKey = a[qb], b.shiftKey = a[Pc], 
b.eg = a.eg), this[z](b);
}, S.Ud = function() {
this.Ca(32) && this.Ki(j);
}, S.ac = function() {
this.Ca(4) && this[Sb](l), this.Ca(32) && this.Ki(l);
}, S.va = function(a) {
return this.k && this[zc]() && this.ob(a) ? (a[mb](), a[qc](), j) :l;
}, S.ob = function(a) {
return 13 == a[B] && this.ub(a);
}, kk(Wn) || d(r("Invalid component class " + Wn)), kk(Kn) || d(r("Invalid renderer class " + Kn));
var Xn = mk(Wn);
Vn[Xn] = Kn, Tn(Qg, function() {
return new Wn(k);
}), U(Yn, Mn), ek(Yn), S = Yn[J], S.cb = function() {}, S.f = function(a) {
return this.Zg(a), a.n().f(Of, {
"class":this.Qb(a)[Zc](dd),
disabled:!a[zc](),
title:a.Ec() || Q,
value:a[F]() || Q
}, a.kb() || Q);
}, S.ma = function(a) {
return a[Qc] == qe || a[Qc] == De && (a[E] == Of || a[E] == oj || a[E] == Pi);
}, S.V = function(a, b) {
return this.Zg(a), b.disabled && Hl(b, this.jd(1)), Yn.b.V[O](this, a, b);
}, S.wc = function(a) {
a.R().d(a.a(), Xf, a.ub);
}, S.fd = dk, S.Bc = dk, S.Hb = function(a) {
return a[zc]();
}, S.gb = dk, S.setState = function(a, b, c) {
Yn.b[Xb][O](this, a, b, c), (a = a.a()) && 1 == b && (a.disabled = c);
}, xa(S, function(a) {
return a[kb];
}), Ea(S, function(a, b) {
a && la(a, b);
}), S.mb = dk, S.Zg = function(a) {
a.ff(l), a.ul(255, l), a.Aa(32, l);
}, U(Zn, Wn), S = Zn[J], xa(S, function() {
return this.Ba;
}), Ea(S, function(a) {
this.Ba = a, this.h[ec](this.a(), a);
}), S.Rj = function(a) {
this.Ba = a;
}, S.Ec = function() {
return this.kf;
}, S.bf = function(a) {
this.kf = a, this.h.bf(this.a(), a);
}, S.Qj = function(a) {
this.kf = a;
}, S.g = function() {
Zn.b.g[O](this), delete this.Ba, delete this.kf;
}, S.C = function() {
if (Zn.b.C[O](this), this.ja(32)) {
var a = this.Z();
a && this.R().d(a, Ih, this.ob);
}
}, S.ob = function(a) {
return 13 == a[B] && a[E] == Fh || 32 == a[B] && a[E] == Ih ? this.ub(a) :32 == a[B];
}, Tn(Kg, function() {
return new Zn(k);
}), U($n, mn), S = $n[J], S.ba = k, ta(S, function(a) {
if (a[E] == Dh) this.sf(), (!ml || this.j == Ml(this.j).activeElement) && this[z](this.Th(a)); else if (a[E] != Gh || zn(a)) {
var b = a[E] == Gh ? this.j[kb] :k;
W && 229 == a[B] && (b = k);
var c = this.Th(a);
this.sf(), this.ba = pn(function() {
this.ba = k, this.j[kb] != b && this[z](c);
}, 0, this);
}
}), S.sf = function() {
this.ba != k && (on[Ya](this.ba), this.ba = k);
}, S.Th = function(a) {
return a = new Vm(a.pa), ua(a, Dh), a;
}, S.g = function() {
$n.b.g[O](this), this.H.e(), this.sf(), delete this.j;
}, co[J].fe = function() {}, U(eo, co), eo[J].fe = function(a, b, c) {
bo(this[Rc], this.ce, a, b, h, c, this.Rl);
}, U(fo, eo), fo[J].Il = function() {
return this.Ie;
}, fo[J].fm = function(a) {
this.Ie = a;
}, fo[J].fe = function(a, b, c, e) {
var f = bo(this[Rc], this.ce, a, b, k, c, 10, e, this.sg);
if (496 & f) {
var g = this.Pe(f, this.ce);
b = this.Pe(f, b), f = bo(this[Rc], g, a, b, k, c, 10, e, this.sg), 496 & f && (g = this.Pe(f, g), 
b = this.Pe(f, b), bo(this[Rc], g, a, b, k, c, this.Ie, e, this.sg));
}
}, fo[J].Pe = function(a, b) {
return 48 & a && (b ^= 2), 192 & a && (b ^= 1), b;
}, U(go, fo), U(ho, Tm);
var io = !!ba.DOMTokenList, jo = io ? function(a) {
return a[Za];
} :function(a) {
return a = a[fc], T(a) && a[vb](/\S+/g) || [];
}, ko = io ? function(a, b) {
return a[Za][Nc](b);
} :function(a, b) {
return Kk(jo(a), b);
}, lo = io ? function(a, b) {
a[Za].add(b);
} :function(a, b) {
ko(a, b) || Fa(a, a[fc] + (0 < a[fc][H] ? dd + b :b));
}, mo = io ? function(a, b) {
a[Za][yb](b);
} :function(a, b) {
ko(a, b) && Fa(a, Hk(jo(a), function(a) {
return a != b;
})[Zc](dd));
};
U(no, $), no[J].pb = k;
var oo = "placeholder" in ea[Ab](Dh);
S = no[J], S.cd = l, S.f = function() {
this.tb(this.n().f(Dh, {
type:rj
}));
}, S.ra = function(a) {
no.b.ra[O](this, a), this.ha || (this.ha = a.getAttribute(Jh) || Q), bm(Ml(a)) == a && (this.cd = j, 
mo(this.a(), this.hd)), oo ? this.a().placeholder = this.ha :En(this.a(), Jh, this.ha);
}, S.C = function() {
no.b.C[O](this), this.tj(), this.Vd(), this.a().na = this;
}, S.ka = function() {
no.b.ka[O](this), this.Jg(), this.a().na = k;
}, S.tj = function() {
var a = new Fn(this);
a.d(this.a(), Gg, this.Qg), a.d(this.a(), Df, this.Aj), oo ? this.H = a :(X && a.d(this.a(), [ Hh, Gh, Ih ], this.Bj), 
a.d(Ml(this.a()) ? Ml(this.a())[Kb] || Ml(this.a())[Nb] :ba, Ph, this.Cj), this.H = a, 
this.Rg());
}, S.Rg = function() {
!this.Fj && this.H && this.a().form && (this.H.d(this.a().form, oj, this.Gj), this.Fj = j);
}, S.Jg = function() {
this.H && (this.H.e(), this.H = k);
}, S.g = function() {
no.b.g[O](this), this.Jg();
}, S.hd = "label-input-label", S.Qg = function() {
if (this.cd = j, mo(this.a(), this.hd), !oo && !this.fc() && !this.Mj) {
var a = this, b = function() {
la(a.a(), Q);
};
W ? pn(b, 10) :b();
}
}, S.Aj = function() {
oo || (this.H.I(this.a(), Xf, this.Qg), this.pb = k), this.cd = l, this.Vd();
}, S.Bj = function(a) {
27 == a[B] && (a[E] == Gh ? this.pb = this.a()[kb] :a[E] == Hh ? la(this.a(), this.pb) :a[E] == Ih && (this.pb = k), 
a[mb]());
}, S.Gj = function() {
this.fc() || (la(this.a(), Q), pn(this.Wj, 10, this));
}, S.Wj = function() {
this.fc() || la(this.a(), this.ha);
}, S.Cj = function() {
this.Vd();
}, S.fc = function() {
return !!this.a() && this.a()[kb] != Q && this.a()[kb] != this.ha;
}, wa(S, function() {
la(this.a(), Q), this.pb != k && (this.pb = Q);
}), Ea(S, function(a) {
this.pb != k && (this.pb = a), la(this.a(), a), this.Vd();
}), xa(S, function() {
return this.pb != k ? this.pb :this.fc() ? this.a()[kb] :Q;
}), S.sl = function(a) {
oo ? (this.ha = a, this.a() && (this.a().placeholder = this.ha)) :(this.a() && !this.fc() && la(this.a(), Q), 
this.ha = a, this.fh(), this.a() && En(this.a(), Jh, this.ha));
}, S.lb = function() {
return this.ha;
}, S.Vd = function() {
oo ? this.a().placeholder != this.ha && (this.a().placeholder = this.ha) :(this.Rg(), 
En(this.a(), Jh, this.ha)), this.fc() ? mo(this.a(), this.hd) :(!this.Mj && !this.cd && lo(this.a(), this.hd), 
oo || pn(this.fh, 10, this));
}, S.w = function(a) {
this.a().disabled = !a;
var b = this.a(), c = this.hd + Jd;
a ? mo(b, c) :lo(b, c);
}, Ja(S, function() {
return !this.a().disabled;
}), S.fh = function() {
this.a() && !this.fc() && !this.cd && la(this.a(), this.ha);
}, U(po, Kn), ek(po), po[J].f = function(a) {
return a.n().f(ng, this.l());
}, po[J].V = function(a, b) {
if (b.id && a.Qf(b.id), b[Qc] == Be) {
var c = b;
b = this.f(a), c[Uc] && c[Uc][ob](b, c), Tl(c);
} else Hl(b, this.l());
return b;
}, po[J].Nb = function() {}, po[J].l = function() {
return bh;
}, U(qo, Wn), qo[J].C = function() {
qo.b.C[O](this), Dn(this.a(), aj);
}, Tn(bh, function() {
return new qo();
}), ek(ro), S = ro[J], S.cb = function() {}, S.hf = function(a, b) {
a && va(a, b ? 0 :-1);
}, S.f = function(a) {
return a.n().f(ng, this.Qb(a)[Zc](dd));
}, S.z = function(a) {
return a;
}, S.ma = function(a) {
return a[Qc] == xe;
}, S.V = function(a, b) {
b.id && a.Qf(b.id);
var c = this.l(), e = l, f = Gl(b);
return f && Gk(f, function(b) {
b == c ? e = j :b && this.Ek(a, b, c);
}, this), e || Hl(b, c), this.sh(a, this.z(b)), b;
}, S.Ek = function(a, b, c) {
b == c + Jd ? a.w(l) :b == c + Nd ? a.Xd(zh) :b == c + Yd && a.Xd(Sj);
}, S.sh = function(a, b, c) {
if (b) {
c = c || b[C];
for (var e; c && c[Uc] == b; ) {
if (e = c[Rb], 1 == c[bb]) {
var f = this.Of(c);
f && (f.tb(c), a[zc]() || f.w(l), a.ia(f), f.V(c));
} else (!c[$c] || wk(c[$c]) == Q) && b[xc](c);
c = e;
}
}
}, S.Of = function(a) {
a:{
for (var b = Gl(a), c = 0, e = b[H]; e > c; c++) if (a = b[c] in Un ? Un[b[c]]() :k) break a;
a = k;
}
return a;
}, S.wc = function(a) {
a = a.a(), vm(a, j, X), W && (a.hideFocus = j);
var b = this.cb();
b && Dn(a, b);
}, S.Z = function(a) {
return a.a();
}, S.l = function() {
return Pg;
}, S.Qb = function(a) {
var b = this.l(), c = [ b, a.F == zh ? b + Nd :b + Yd ];
return a[zc]() || c[t](b + Jd), c;
}, U(so, $), S = so[J], S.df = k, S.D = k, S.h = k, S.F = k, S.k = j, S.aa = j, 
S.Sf = j, S.La = -1, S.$ = k, S.cf = l, S.Nj = l, S.zj = j, S.vb = k, S.Z = function() {
return this.df || this.h.Z(this);
}, S.Td = function() {
return this.D || (this.D = new Nn(this.Z()));
}, S.f = function() {
this.tb(this.h.f(this));
}, S.z = function() {
return this.h.z(this.a());
}, S.ma = function(a) {
return this.h.ma(a);
}, S.ra = function(a) {
this.tb(this.h.V(this, a)), a[M].display == ki && (this.k = l);
}, S.C = function() {
so.b.C[O](this), this.sb(function(a) {
a.q && this.xg(a);
}, this);
var a = this.a();
this.h.wc(this), this.Y(this.k, j), this.R().d(this, xg, this.Ue).d(this, yh, this.Se).d(this, Ij, this.Te).d(this, ri, this.gj).d(this, Yf, this.ej).d(a, $h, this.Wb).d(Ml(a), di, this.fj).d(a, [ $h, di, ci, bi, Zf ], this.dj), 
this.Hb() && this.wg(j);
}, S.wg = function(a) {
var b = this.R(), c = this.Z();
a ? b.d(c, Gg, this.Ud).d(c, Df, this.ac).d(this.Td(), Fh, this.va) :b.I(c, Gg, this.Ud).I(c, Df, this.ac).I(this.Td(), Fh, this.va);
}, S.ka = function() {
this.Va(-1), this.$ && this.$.O(l), this.cf = l, so.b.ka[O](this);
}, S.g = function() {
so.b.g[O](this), this.D && (this.D.e(), this.D = k), this.h = this.$ = this.vb = this.df = k;
}, S.Ue = function() {
return j;
}, S.Se = function(a) {
var b = this.Md(a[N]);
if (b > -1 && b != this.La) {
var c = this.Lb();
c && c.Wa(l), this.La = b, c = this.Lb(), this.cf && c[Sb](j), this.zj && this.$ && c != this.$ && (c.ja(64) ? c.O(j) :this.$.O(l));
}
En(this.a(), lf, a[N].a().id);
}, S.Te = function(a) {
a[N] == this.Lb() && (this.La = -1), En(this.a(), lf, Q);
}, S.gj = function(a) {
(a = a[N]) && a != this.$ && a[Va]() == this && (this.$ && this.$.O(l), this.$ = a);
}, S.ej = function(a) {
a[N] == this.$ && (this.$ = k);
}, S.Wb = function(a) {
this.aa && this.Ib(j);
var b = this.Z();
b && Zl(b) ? b[zb]() :a[mb]();
}, S.fj = function() {
this.Ib(l);
}, S.dj = function(a) {
var b = this.cl(a[N]);
if (b) switch (a[E]) {
case $h:
b.Wb(a);
break;

case di:
b.$b(a);
break;

case ci:
b.vf(a);
break;

case bi:
b.uf(a);
break;

case Zf:
b.kd(a);
}
}, S.cl = function(a) {
if (this.vb) for (var b = this.a(); a && a !== b; ) {
var c = a.id;
if (c in this.vb) return this.vb[c];
a = a[Uc];
}
return k;
}, S.Ud = function() {}, S.ac = function() {
this.Va(-1), this.Ib(l), this.$ && this.$.O(l);
}, S.va = function(a) {
return this[zc]() && this.k && (0 != this.Ia() || this.df) && this.ob(a) ? (a[mb](), 
a[qc](), j) :l;
}, S.ob = function(a) {
var b = this.Lb();
if (b && typeof b.va == R && b.va(a) || this.$ && this.$ != b && typeof this.$.va == R && this.$.va(a)) return j;
if (a[Pc] || a[nc] || a[qb] || a[ac]) return l;
switch (a[B]) {
case 27:
if (!this.Hb()) return l;
this.Z().blur();
break;

case 36:
this.dk();
break;

case 35:
this.ek();
break;

case 38:
if (this.F != Sj) return l;
this.Zf();
break;

case 37:
if (this.F != zh) return l;
this.jb() ? this.Yf() :this.Zf();
break;

case 40:
if (this.F != Sj) return l;
this.Yf();
break;

case 39:
if (this.F != zh) return l;
this.jb() ? this.Zf() :this.Yf();
break;

default:
return l;
}
return j;
}, S.xg = function(a) {
var b = a.a(), b = b.id || (b.id = a.S());
this.vb || (this.vb = {}), this.vb[b] = a;
}, S.ia = function(a, b) {
so.b.ia[O](this, a, b);
}, S.Fc = function(a, b, c) {
a.hh(2, j), a.hh(64, j), (this.Hb() || !this.Nj) && a.Aa(32, l), a.ff(l), so.b.Fc[O](this, a, b, c), 
a.q && this.q && this.xg(a), b <= this.La && this.La++;
}, S.removeChild = function(a, b) {
if (a = T(a) ? this.Ze(a) :a) {
var c = this.Md(a);
-1 != c && (c == this.La ? a.Wa(l) :c < this.La && this.La--), (c = a.a()) && c.id && this.vb && Xk(this.vb, c.id);
}
return a = so.b[xc][O](this, a, b), a.ff(j), a;
}, S.Xd = function(a) {
this.a() && d(r(we)), this.F = a;
}, S.Y = function(a, b) {
if (b || this.k != a && this[z](a ? bj :xh)) {
this.k = a;
var c = this.a();
return c && (tm(c, a), this.Hb() && this.h.hf(this.Z(), this.aa && this.k), b || this[z](this.k ? nf :mf)), 
j;
}
return l;
}, Ja(S, function() {
return this.aa;
}), S.w = function(a) {
this.aa != a && this[z](a ? vg :jg) && (a ? (this.aa = j, this.sb(function(a) {
a.jh ? delete a.jh :a.w(j);
})) :(this.sb(function(a) {
a[zc]() ? a.w(l) :a.jh = j;
}), this.aa = l, this.Ib(l)), this.Hb() && this.h.hf(this.Z(), a && this.k));
}, S.Hb = function() {
return this.Sf;
}, S.gb = function(a) {
a != this.Sf && this.q && this.wg(a), this.Sf = a, this.aa && this.k && this.h.hf(this.Z(), a);
}, S.Va = function(a) {
(a = this.qa(a)) ? a.Wa(j) :-1 < this.La && this.Lb().Wa(l);
}, S.Wa = function(a) {
this.Va(this.Md(a));
}, S.Lb = function() {
return this.qa(this.La);
}, S.dk = function() {
this.He(function(a, b) {
return (a + 1) % b;
}, this.Ia() - 1);
}, S.ek = function() {
this.He(function(a, b) {
return a--, 0 > a ? b - 1 :a;
}, 0);
}, S.Yf = function() {
this.He(function(a, b) {
return (a + 1) % b;
}, this.La);
}, S.Zf = function() {
this.He(function(a, b) {
return a--, 0 > a ? b - 1 :a;
}, this.La);
}, S.He = function(a, b) {
for (var c = 0 > b ? this.Md(this.$) :b, e = this.Ia(), c = a[O](this, c, e), f = 0; e >= f; ) {
var g = this.qa(c);
if (g && this.Xh(g)) return this.Kk(c), j;
f++, c = a[O](this, c, e);
}
return l;
}, S.Xh = function(a) {
return a.k && a[zc]() && a.ja(2);
}, S.Kk = function(a) {
this.Va(a);
}, S.Ib = function(a) {
this.cf = a;
}, U(to, Kn), ek(to), to[J].l = function() {
return Yg;
}, U(uo, Wn), Tn(Yg, function() {
return new uo(k);
}), U(vo, Kn), ek(vo), S = vo[J], S.Hc = function(a) {
var b = this.Qi[a];
if (!b) {
switch (a) {
case 0:
b = this.oc() + Md;
break;

case 1:
b = this.oc() + Gd;
break;

case 2:
b = this.oc() + Id;
}
this.Qi[a] = b;
}
return b;
}, S.cb = function() {
return Vh;
}, S.f = function(a) {
var b = a.n().f(ng, this.Qb(a)[Zc](dd), this.Ug(a.Mb, a.n()));
return this.Vf(a, b, a.ja(8) || a.ja(16)), b;
}, S.z = function(a) {
return a && a[C];
}, S.V = function(a, b) {
return this.Sj(b) || b[Sa](this.Ug(b[Mb], a.n())), Kk(Gl(b), ch) && (a.Wd(j), this.Wd(a, b, j)), 
vo.b.V[O](this, a, b);
}, S.Nb = function(a, b) {
var c = this.z(a), e = this.Bf(a) ? c[C] :k;
vo.b.Nb[O](this, a, b), e && !this.Bf(a) && c[ob](e, c[C] || k);
}, S.Sj = function(a) {
a = Ul(a);
var b = this.Hc(2);
return !!a && Kk(Gl(a), b);
}, S.Ug = function(a, b) {
var c = this.Hc(2);
return b.f(ng, c, a);
}, S.Hf = function(a, b, c) {
b && (Dn(b, c ? Xh :this.cb()), this.Vf(a, b, c));
}, S.Wd = function(a, b, c) {
b && (Dn(b, c ? Wh :this.cb()), this.Vf(a, b, c));
}, S.Bf = function(a) {
if (a = this.z(a)) {
a = a[C];
var b = this.Hc(1);
return !!a && Kk(Gl(a), b);
}
return l;
}, S.Vf = function(a, b, c) {
c != this.Bf(b) && (Jl(b, ch, c), b = this.z(b), c ? (c = this.Hc(1), b[ob](a.n().f(ng, c), b[C] || k)) :b[xc](b[C]));
}, S.jd = function(a) {
switch (a) {
case 2:
return this.Hc(0);

case 16:
case 8:
return dh;

default:
return vo.b.jd[O](this, a);
}
}, S.Ff = function(a) {
var b = this.Hc(0);
switch (a) {
case dh:
return 16;

case b:
return 2;

default:
return vo.b.Ff[O](this, a);
}
}, S.l = function() {
return Zg;
}, U(wo, Wn), S = wo[J], xa(S, function() {
var a = this.hb;
return a != k ? a :this.kb();
}), Ea(S, function(a) {
this.gm(a);
}), S.Hf = function(a) {
this.Aa(8, a), this.ad() && !a && this.Tg(l);
var b = this.a();
b && this.h.Hf(this, b, a);
}, S.Wd = function(a) {
this.Aa(16, a);
var b = this.a();
b && this.h.Wd(this, b, a);
}, S.kb = function() {
var a = this.Mb;
return hk(a) ? (a = Ik(a, function(a) {
var c = Gl(a);
return Kk(c, $g) || Kk(c, ah) ? Q :$l(a);
})[Zc](Q), vk(a)) :wo.b.kb[O](this);
}, S.$b = function(a) {
var b = this[Va]();
if (b) {
var c = b.ih;
if (b.ih = k, (b = c && jk(a[Tb])) && (b = new V(a[Tb], a[Ub]), b = c == b ? j :c && b ? c.x == b.x && c.y == b.y :l), 
b) return;
}
wo.b.$b[O](this, a);
}, S.ob = function(a) {
return a[B] == this.ph && this.ub(a) ? j :wo.b.ob[O](this, a);
}, S.Uj = function() {
return this.ph;
}, Tn(Zg, function() {
return new wo(k);
}), U(xo, ro), ek(xo), S = xo[J], S.cb = function() {
return Uh;
}, S.ma = function(a) {
return a[Qc] == Te || xo.b.ma[O](this, a);
}, S.Of = function(a) {
return a[Qc] == Be ? new qo() :xo.b.Of[O](this, a);
}, S.bc = function(a, b) {
return Vl(a.a(), b);
}, S.l = function() {
return Wg;
}, S.wc = function(a) {
xo.b.wc[O](this, a), En(a.a(), uh, Cj);
}, Tn(bh, function() {
return new qo();
}), U(yo, so), S = yo[J], S.Kf = j, S.ci = l, S.l = function() {
return this.h.l();
}, S.bc = function(a) {
if (this.h.bc(this, a)) return j;
for (var b = 0, c = this.Ia(); c > b; b++) {
var e = this.qa(b);
if (typeof e.bc == R && e.bc(a)) return j;
}
return l;
}, S.Ya = function(a) {
this.ia(a, j);
}, S.kc = function(a, b) {
this.Fc(a, b, j);
}, S.oa = function(a) {
return this.qa(a);
}, S.xb = function() {
return this.Ia();
}, S.kh = function(a) {
(this.Kf = a) && this.gb(j);
}, S.nk = function(a) {
this.ci = a;
}, S.Y = function(a, b, c) {
return (b = yo.b.Y[O](this, a, b)) && a && this.q && this.Kf && this.Z()[zb](), 
this.ih = a && c && jk(c[Tb]) ? new V(c[Tb], c[Ub]) :k, b;
}, S.Ue = function(a) {
return this.Kf && this.Z()[zb](), yo.b.Ue[O](this, a);
}, S.Xh = function(a) {
return (this.ci || a[zc]()) && a.k && a.ja(2);
}, S.ra = function(a) {
this.gk(a), yo.b.ra[O](this, a);
}, S.ob = function(a) {
var b = yo.b.ob[O](this, a);
return b || this.sb(function(c) {
!b && c.Uj && c.ph == a[B] && (this[zc]() && this.Wa(c), b = c.va(a));
}, this), b;
}, S.Va = function(a) {
yo.b.Va[O](this, a);
var b = this.qa(a);
if (b) {
a = this.a();
var b = b.a(), c = lm(b), e = lm(a), f = Am(a), g = c.x - e.x - f[A], c = c.y - e.y - f.top, e = a[Jc] - b[Yc], f = a[Kc], n = a[Yb], f = f + p.min(g, p.max(g - (a[ic] - b[fb]), 0)), n = n + p.min(c, p.max(c - e, 0)), b = new V(f, n);
a.scrollLeft = b.x, a.scrollTop = b.y;
}
}, S.gk = function(a) {
var b = this.h;
a = this.n().hk(ng, b.l() + Id, a);
for (var c = a[H], e = 0; c > e; e++) b.sh(this, a[e]);
}, U(zo, $), S = zo[J], S.Cd = k, S.Ng = k, S.na = k, S.c = k, S.Kc = -1, S.G = k, 
S.Gf = uk, S.uc = k, S.of = Q, S.sj = Q, S.Qe = k, S.Og = l, S.f = function() {
this.G = this.n().f(Dh, {
name:this.sj,
autocomplete:pi
}), this.uc = this.n().f(gj, Ng), this.tb(this.n().f(gj, Lg, this.G, this.uc)), 
this.Og && (this.uc.innerHTML = od, vm(this.uc, j)), this.G[Gb](Jh, this.of), this.na.V(this.G), 
this.c.gb(l), this.c.q || this.ia(this.c, j);
}, S.w = function(a) {
this.aa = a, this.na.w(a), Jl(this.a(), Og, !a);
}, S.C = function() {
zo.b.C[O](this);
var a = this.R();
a.d(this.a(), $h, this.Zi), a.d(this.n().r, $h, this.$i), a.d(this.G, Df, this.aj), 
this.D = new Nn(this.G), a.d(this.D, Fh, this.va), this.Cd = new $n(this.G), a.d(this.Cd, Dh, this.bj), 
a.d(this.c, jf, this.cj);
}, S.ka = function() {
this.D.e(), delete this.D, this.Cd.e(), this.Cd = k, zo.b.ka[O](this);
}, S.ma = function() {
return l;
}, S.g = function() {
zo.b.g[O](this), this.Od(), this.na.e(), this.c.e(), this.uc = this.G = this.c = this.na = k;
}, S.vc = function() {
this.Od(), this.qh(), this.c.Va(-1);
}, S.Ya = function(a) {
this.c.ia(a, j), this.Kc = -1;
}, S.kc = function(a, b) {
this.c.Fc(a, b, j), this.Kc = -1;
}, S.oa = function(a) {
return this.c.qa(a);
}, S.xb = function() {
return this.c.Ia();
}, S.Gc = function() {
return this.c;
}, S.Yj = function() {
if (-1 == this.Kc) {
for (var a = 0, b = 0, c = this.c.Ia(); c > b; b++) this.c.qa(b).k && a++;
this.Kc = a;
}
return this.Kc;
}, S.pj = function(a) {
this.of = a, this.na && this.na.sl(this.of);
}, S.qj = function(a) {
this.Og = !!a;
}, Ea(S, function(a) {
this.na[F]() != a && (this.na[ec](a), this.Ii());
}), xa(S, function() {
return this.na[F]();
}), S.Wg = function() {
return wk(this.na[F]()[ad]());
}, S.Xj = function() {
var a = this.c;
a.Y(l), a.kh(l), a.nk(j);
}, S.$e = function(a) {
var b = this.c.k, c = this.Yj();
b && 0 == c ? this.qh() :!b && c > 0 && (a && (this.Yg(Q), this.Xg(this.Wg())), 
pn(this.Od, 1, this), this.Zj()), this.Ed();
}, S.Ed = function() {
this.c && this.c.k && new go(this.a(), 5, j).fe(this.c.a(), 4);
}, S.Zj = function() {
this.c.Y(j), Hl(this.a(), Mg);
}, S.qh = function() {
this.c.Y(l), Il(this.a(), Mg);
}, S.Od = function() {
this.Qe && (on[Ya](this.Qe), this.Qe = k);
}, S.Zi = function(a) {
this.aa && (a[N] == this.a() || a[N] == this.G || Vl(this.uc, a[N])) && (this.c.k ? this.vc() :(this.$e(j), 
ml && this.G[zb](), this.G.select(), this.c.Ib(j), a[mb]())), a[qc]();
}, S.$i = function(a) {
Vl(this.c.a(), a[N]) || this.vc();
}, S.cj = function(a) {
var b = a[N];
this[z](new ho(jf, this, b)) && (b = b.kb(), this.na[F]() != b && (this.na[ec](b), 
this[z](Tf)), this.vc()), a[qc]();
}, S.aj = function() {
this.Od(), this.Qe = pn(this.vc, 250, this);
}, S.va = function(a) {
var b = this.c.k;
if (b && this.c.va(a)) return j;
var c = l;
switch (a[B]) {
case 27:
b && (this.vc(), c = j);
break;

case 9:
b && (b = this.c.Lb()) && (b.ub(a), c = j);
break;

case 38:
case 40:
b || (this.$e(j), c = j);
}
return c && a[mb](), c;
}, S.bj = function() {
this.Ii();
}, S.Ii = function() {
var a = this.Wg();
this.Yg(a), bm(this.n().r) == this.G && this.$e(l);
var b = this.c.Lb();
(a == Q || !b || !b.k) && this.Xg(a), this.Ng = a, this[z](Tf);
}, S.Yg = function(a) {
for (var b = 0, c = !this.Gf(a, this.Ng), e = 0, f = this.c.Ia(); f > e; e++) {
var g = this.c.qa(e);
if (g instanceof wo) {
if (!g.k && !c) continue;
var n = g.kb(), n = this.Kj(g) || n && this.Gf(n[ad](), a);
typeof g.ke == R && g.ke(a), g.Y(!!n);
}
g.k && b++;
}
this.Kc = b;
}, S.Xg = function(a) {
if (a != Q) for (var b = 0, c = this.c.Ia(); c > b; b++) {
var e = this.c.qa(b), f = e.kb();
if (f && this.Gf(f[ad](), a)) return this.c.Va(b), e.ke && e.ke(a), void 0;
}
this.c.Va(-1);
}, S.Kj = function(a) {
return typeof a.Xl == R && a.Vi;
}, U(Ao, wo), Tn("goog-combobox-item", function() {
return new Ao(k);
}), Ao[J].Vi = l, Ao[J].Xl = function() {
return this.Vi;
}, Ao[J].ke = function(a) {
if (this[zc]()) {
var b = this.kb(), c = b[ad]()[y](a);
if (c >= 0) {
var e = this.n();
this.Nb([ e[hb](b[Wb](0, c)), e.f(xf, k, b[Wb](c, a[H])), e[hb](b[Wb](c + a[H])) ]);
}
}
}, U(Bo, Mn), ek(Bo), S = Bo[J], S.f = function(a) {
var b = {
"class":Ug + this.Qb(a)[Zc](dd),
title:a.Ec() || Q
};
return a.n().f(ng, b, a.Mb);
}, S.cb = function() {
return Of;
}, S.ma = function(a) {
return a[Qc] == xe;
}, S.V = function(a, b) {
return Hl(b, Tg), Bo.b.V[O](this, a, b);
}, xa(S, function() {
return Q;
}), S.l = function() {
return Sg;
}, Tn(Sg, function() {
return new Zn(k, Bo.Da());
}), U(Co, Bo), ek(Co), Co[J].l = function() {
return Vg;
}, Tn(Vg, function() {
return new Zn(k, Co.Da());
}), U(Do, wo), Do[J].ub = function() {
return this[z](jf);
}, Tn(ch, function() {
return new Do(k);
});
var Eo, Fo;
Fo = Eo = l;
var Go = il();
Go && (-1 != Go[y]("Firefox") || -1 != Go[y]("Camino") || (-1 != Go[y]("iPhone") || -1 != Go[y]("iPod") ? Eo = j :-1 != Go[y]("iPad") && (Fo = j)));
var Ho = Eo, Io = Fo;
U(Jo, Mn), ek(Jo), S = Jo[J], S.f = function(a) {
var b = {
"class":Ug + this.Qb(a)[Zc](dd),
title:a.Ec() || Q
}, b = a.n().f(ng, b, this.ge(a.Mb, a.n()));
return this.Ef(a, b), b;
}, S.cb = function() {
return Of;
}, S.z = function(a) {
return a && a[C][C];
}, S.ge = function(a, b) {
return b.f(ng, Ug + (this.l() + Vd), b.f(ng, Ug + (this.l() + Pd), a));
}, S.ma = function(a) {
return a[Qc] == xe;
}, S.Lj = function(a, b) {
var c = a.n().Uh(b), e = this.l() + Vd;
return c && Kk(Gl(c), e) && (c = a.n().Uh(c), e = this.l() + Pd, c && Kk(Gl(c), e)) ? j :l;
}, S.V = function(a, b) {
return Ko(b, j), Ko(b, l), this.Lj(a, b) || b[Sa](this.ge(b[Mb], a.n())), Hl(b, Tg, this.l()), 
Jo.b.V[O](this, a, b);
}, S.l = function() {
return Rg;
}, U(Lo, Jo), ek(Lo), X && (Lo[J].Nb = function(a, b) {
var c = Lo.b.z[O](this, a && a[C]);
if (c) {
var e = this.createCaption(b, Kl(a)), f = c[Uc];
f && f.replaceChild(e, c);
}
}), S = Lo[J], S.z = function(a) {
return a = Lo.b.z[O](this, a && a[C]), X && a && a.__goog_wrapper_div && (a = a[C]), 
a;
}, S.V = function(a, b) {
var c = Nl(ea, zd, Wg, b)[0];
if (c) {
tm(c, l), Ml(c)[vc][Sa](c);
var e = new yo();
e.V(c), a.ed(e);
}
return Lo.b.V[O](this, a, b);
}, S.ge = function(a, b) {
return Lo.b.ge[O](this, [ this.createCaption(a, b), this.jk(b) ], b);
}, S.createCaption = function(a, b) {
return b.f(ng, Ug + (this.l() + Fd), a);
}, S.jk = function(a) {
return a.f(ng, Ug + (this.l() + Kd), ak);
}, S.l = function() {
return Xg;
}, U(Mo, Zn), S = Mo[J], S.Hd = l, S.jj = l, S.C = function() {
Mo.b.C[O](this), this.c && this.Kd(this.c, j), En(this.a(), uh, Cj);
}, S.ka = function() {
if (Mo.b.ka[O](this), this.c) {
this.O(l), this.c.ka(), this.Kd(this.c, l);
var a = this.c.a();
a && Tl(a);
}
}, S.g = function() {
Mo.b.g[O](this), this.c && (this.c.e(), delete this.c), delete this.hj, this.ba.e();
}, S.Wb = function(a) {
Mo.b.Wb[O](this, a), this.cc() && (this.O(!this.gd(), a), this.c && this.c.Ib(this.gd()));
}, S.$b = function(a) {
Mo.b.$b[O](this, a), this.c && !this.cc() && this.c.Ib(l);
}, S.ub = function() {
return this[Sb](l), j;
}, S.uj = function(a) {
this.c && this.c.k && !this.bc(a[N]) && this.O(l);
}, S.bc = function(a) {
return a && Vl(this.a(), a) || this.c && this.c.bc(a) || l;
}, S.ob = function(a) {
if (32 == a[B]) {
if (a[mb](), a[E] != Ih) return j;
} else if (a[E] != Fh) return l;
if (this.c && this.c.k) {
var b = this.c.va(a);
return 27 == a[B] ? (this.O(l), j) :b;
}
return 40 == a[B] || 38 == a[B] || 32 == a[B] || 13 == a[B] ? (this.O(j), j) :l;
}, S.Cf = function() {
this.O(l);
}, S.vj = function() {
this.cc() || this.O(l);
}, S.ac = function(a) {
this.Hd || this.O(l), Mo.b.ac[O](this, a);
}, S.Gc = function() {
return this.c || this.ed(new yo(this.n())), this.c || k;
}, S.ed = function(a) {
var b = this.c;
return a != b && (b && (this.O(l), this.q && this.Kd(b, l), delete this.c), a && (this.c = a, 
a.Ve(this), a.Y(l), a.kh(this.Hd), this.q && this.Kd(a, j))), b;
}, S.Ya = function(a) {
this.Gc().ia(a, j);
}, S.kc = function(a, b) {
this.Gc().Fc(a, b, j);
}, S.oa = function(a) {
return this.c ? this.c.qa(a) :k;
}, S.xb = function() {
return this.c ? this.c.Ia() :0;
}, S.Y = function(a, b) {
var c = Mo.b.Y[O](this, a, b);
return c && !this.k && this.O(l), c;
}, S.w = function(a) {
Mo.b.w[O](this, a), this[zc]() || this.O(l);
}, S.rj = function() {
return this.Sd.Il && !!(32 & this.Sd.Ie);
}, S.Fk = function(a) {
this.Hd = a;
}, S.O = function(a, b) {
if (Mo.b.O[O](this, a), this.c && this.Xa(64) == a) {
if (a) this.c.q || (this.jj ? this.c.Ha(this.a()[Uc]) :this.c.Ha()), this.Zb = km(this.a()), 
this.Yb = sm(this.a()), this.Ed(), this.c.Va(-1); else if (this[Sb](l), this.c.Ib(l), 
this.a() && En(this.a(), lf, Q), this.Fd != k) {
this.Fd = h;
var c = this.c.a();
if (c) {
var f, e = Q;
e instanceof Sk ? (f = e[P], e = e[u]) :f = Q, ka(c[M], pm(e, j)), Qa(c[M], pm(f, j));
}
}
this.c.Y(a, l, b), this.A() || this.ij(a);
}
}, S.Ed = function() {
if (this.c.q) {
var a = this.Sd;
this.Sd.element = this.hj || this.a();
var b = this.c.a();
this.c.k || (Aa(b[M], wh), tm(b, j)), !this.Fd && this.rj() && (this.Fd = qm(b)), 
a.fe(b, 1 ^ a.ce, this.kj, this.Fd), this.c.k || (tm(b, l), Aa(b[M], Tj));
}
}, S.wj = function() {
var a = sm(this.a()), b = km(this.a());
(this.Yb != a && (this.Yb && a ? this.Yb[A] != a[A] || this.Yb[u] != a[u] || this.Yb.top != a.top || this.Yb[P] != a[P] :!0) || this.Zb != b && (this.Zb && b ? this.Zb.top != b.top || this.Zb[bd] != b[bd] || this.Zb[Lc] != b[Lc] || this.Zb[A] != b[A] :!0)) && (this.Yb = a, 
this.Zb = b, this.Ed());
}, S.Kd = function(a, b) {
var c = this.R(), e = b ? c.d :c.I;
e[O](c, a, jf, this.Cf), e[O](c, a, yh, this.Se), e[O](c, a, Ij, this.Te);
}, S.Se = function(a) {
En(this.a(), lf, a[N].a().id);
}, S.Te = function() {
this.c.Lb() || En(this.a(), lf, Q);
}, S.ij = function(a) {
var b = this.R(), c = a ? b.d :b.I;
c[O](b, this.n().r, $h, this.uj, j), this.Hd && c[O](b, this.c, Df, this.vj), c[O](b, this.ba, tj, this.wj), 
a ? this.ba[Cc]() :this.ba[Zb]();
}, Tn(Xg, function() {
return new Mo(k);
}), U(No, mn), S = No[J], S.jc = k, S.Si = k, S.xb = function() {
return this.ic[H];
}, S.Pl = function(a) {
return a ? Fk(this.ic, a) :-1;
}, S.oa = function(a) {
return this.ic[a] || k;
}, S.Ol = function(a) {
a && (Gk(a, function(a) {
this.Me(a, l);
}, this), Nk(this.ic, a));
}, S.Ya = function(a) {
this.kc(a, this.xb());
}, S.kc = function(a, b) {
a && (this.Me(a, l), Ok(this.ic, b, 0, a));
}, S.Ob = function() {
return this.jc;
}, S.wb = function(a) {
a != this.jc && (this.Me(this.jc, l), this.jc = a, this.Me(a, j)), this[z](Yi);
}, S.Pf = function() {
return this.Pl(this.jc);
}, S.tf = function(a) {
this.wb(this.oa(a));
}, wa(S, function() {
var a = this.ic;
if (!hk(a)) for (var b = a[H] - 1; b >= 0; b--) delete a[b];
Da(a, 0), this.jc = k;
}), S.g = function() {
No.b.g[O](this), delete this.ic, this.jc = k;
}, S.Me = function(a, b) {
a && (typeof this.Si == R ? this.Si(a, b) :typeof a.ig == R && a.ig(b));
}, U(Oo, Mo), S = Oo[J], S.B = k, S.yf = k, S.C = function() {
Oo.b.C[O](this), this.rf(), this.Ig(), En(this.a(), uh, Bg);
}, S.ra = function(a) {
Oo.b.ra[O](this, a), (a = this.kb()) ? this.th(a) :this.tf(0);
}, S.g = function() {
Oo.b.g[O](this), this.B && (this.B.e(), this.B = k), this.yf = k;
}, S.Cf = function(a) {
this.wb(a[N]), Oo.b.Cf[O](this, a), a[qc](), this[z](jf);
}, S.kk = function() {
var a = this.Ob();
Oo.b[ec][O](this, a && a[F]()), this.rf();
}, S.ed = function(a) {
var b = Oo.b.ed[O](this, a);
return a != b && (this.B && this.B[Lb](), a && (this.B ? a.sb(function(a) {
this.me(a), this.B.Ya(a);
}, this) :this.Lf(a))), b;
}, S.th = function(a) {
this.yf = a, this.rf();
}, S.Ya = function(a) {
this.me(a), Oo.b.Ya[O](this, a), this.B ? this.B.Ya(a) :this.Lf(this.Gc());
}, S.kc = function(a, b) {
this.me(a), Oo.b.kc[O](this, a, b), this.B ? this.B.kc(a, b) :this.Lf(this.Gc());
}, S.wb = function(a) {
if (this.B) {
var b = this.Ob();
this.B.wb(a), a != b && this[z](Tf);
}
}, S.tf = function(a) {
this.B && this.wb(this.B.oa(a));
}, Ea(S, function(a) {
if (a != k && this.B) for (var c, b = 0; c = this.B.oa(b); b++) if (c && typeof c[F] == R && c[F]() == a) return this.wb(c), 
void 0;
this.wb(k);
}), S.Ob = function() {
return this.B ? this.B.Ob() :k;
}, S.Pf = function() {
return this.B ? this.B.Pf() :-1;
}, S.Lf = function(a) {
this.B = new No(), a && a.sb(function(a) {
this.me(a), this.B.Ya(a);
}, this), this.Ig();
}, S.Ig = function() {
this.B && this.R().d(this.B, Yi, this.kk);
}, S.rf = function() {
var a = this.Ob();
this.Nb(a ? a.kb() :this.yf);
}, S.me = function(a) {
a.Ti(a instanceof wo ? si :aj);
}, S.O = function(a, b) {
Oo.b.O[O](this, a, b), this.gd() && this.Gc().Va(this.Pf());
}, Tn("goog-select", function() {
return new Oo(k);
}), Qo[J].Di = function(a) {
var b = [];
return this.tg(a, b), b[Zc](Q);
}, Qo[J].tg = function(a, b) {
switch (typeof a) {
case mj:
this.Hi(a, b);
break;

case mi:
this.Ml(a, b);
break;

case Ef:
b[t](a);
break;

case "undefined":
b[t](li);
break;

case oi:
if (a == k) {
b[t](li);
break;
}
if (hk(a)) {
this.Ll(a, b);
break;
}
this.Nl(a, b);
break;

case R:
break;

default:
d(r("Unknown type: " + typeof a));
}
};
var Ro = {
'"':'\\"',
"\\":"\\\\",
"/":"\\/",
"\b":"\\b",
"\f":"\\f",
"\n":"\\n",
"\r":"\\r",
"	":"\\t",
"":"\\u000b"
}, So = /\uffff/[Wa]("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g :/[\\\"\x00-\x1f\x7f-\xff]/g;
Qo[J].Hi = function(a, b) {
b[t](kd, a[w](So, function(a) {
if (a in Ro) return Ro[a];
var b = a.charCodeAt(0), f = cf;
return 16 > b ? f += ce :256 > b ? f += be :4096 > b && (f += ae), Ro[a] = f + b[$b](16);
}), kd);
}, Qo[J].Ml = function(a, b) {
b[t](isFinite(a) && !fa(a) ? a :li);
}, Qo[J].Ll = function(a, b) {
var c = a[H];
b[t](Xe);
for (var e = Q, f = 0; c > f; f++) b[t](e), e = a[f], this.tg(this.Re ? this.Re[O](a, s(f), e) :e, b), 
e = Ad;
b[t](ef);
}, Qo[J].Nl = function(a, b) {
b[t](Xj);
var e, c = Q;
for (e in a) if (ca[J][tc][O](a, e)) {
var f = a[e];
typeof f != R && (b[t](c), this.Hi(e, b), b[t](le), this.tg(this.Re ? this.Re[O](a, e, f) :f, b), 
c = Ad);
}
b[t]($j);
};
var Wo = {
aliceblue:"#f0f8ff",
antiquewhite:"#faebd7",
aqua:"#00ffff",
aquamarine:"#7fffd4",
azure:"#f0ffff",
beige:"#f5f5dc",
bisque:"#ffe4c4",
black:"#000000",
blanchedalmond:"#ffebcd",
blue:"#0000ff",
blueviolet:"#8a2be2",
brown:"#a52a2a",
burlywood:"#deb887",
cadetblue:"#5f9ea0",
chartreuse:"#7fff00",
chocolate:"#d2691e",
coral:"#ff7f50",
cornflowerblue:"#6495ed",
cornsilk:"#fff8dc",
crimson:"#dc143c",
cyan:"#00ffff",
darkblue:"#00008b",
darkcyan:"#008b8b",
darkgoldenrod:"#b8860b",
darkgray:"#a9a9a9",
darkgreen:"#006400",
darkgrey:"#a9a9a9",
darkkhaki:"#bdb76b",
darkmagenta:"#8b008b",
darkolivegreen:"#556b2f",
darkorange:"#ff8c00",
darkorchid:"#9932cc",
darkred:"#8b0000",
darksalmon:"#e9967a",
darkseagreen:"#8fbc8f",
darkslateblue:"#483d8b",
darkslategray:"#2f4f4f",
darkslategrey:"#2f4f4f",
darkturquoise:"#00ced1",
darkviolet:"#9400d3",
deeppink:"#ff1493",
deepskyblue:"#00bfff",
dimgray:"#696969",
dimgrey:"#696969",
dodgerblue:"#1e90ff",
firebrick:"#b22222",
floralwhite:"#fffaf0",
forestgreen:"#228b22",
fuchsia:"#ff00ff",
gainsboro:"#dcdcdc",
ghostwhite:"#f8f8ff",
gold:"#ffd700",
goldenrod:"#daa520",
gray:"#808080",
green:"#008000",
greenyellow:"#adff2f",
grey:"#808080",
honeydew:"#f0fff0",
hotpink:"#ff69b4",
indianred:"#cd5c5c",
indigo:"#4b0082",
ivory:"#fffff0",
khaki:"#f0e68c",
lavender:"#e6e6fa",
lavenderblush:"#fff0f5",
lawngreen:"#7cfc00",
lemonchiffon:"#fffacd",
lightblue:"#add8e6",
lightcoral:"#f08080",
lightcyan:"#e0ffff",
lightgoldenrodyellow:"#fafad2",
lightgray:"#d3d3d3",
lightgreen:"#90ee90",
lightgrey:"#d3d3d3",
lightpink:"#ffb6c1",
lightsalmon:"#ffa07a",
lightseagreen:"#20b2aa",
lightskyblue:"#87cefa",
lightslategray:"#778899",
lightslategrey:"#778899",
lightsteelblue:"#b0c4de",
lightyellow:"#ffffe0",
lime:"#00ff00",
limegreen:"#32cd32",
linen:"#faf0e6",
magenta:"#ff00ff",
maroon:"#800000",
mediumaquamarine:"#66cdaa",
mediumblue:"#0000cd",
mediumorchid:"#ba55d3",
mediumpurple:"#9370d8",
mediumseagreen:"#3cb371",
mediumslateblue:"#7b68ee",
mediumspringgreen:"#00fa9a",
mediumturquoise:"#48d1cc",
mediumvioletred:"#c71585",
midnightblue:"#191970",
mintcream:"#f5fffa",
mistyrose:"#ffe4e1",
moccasin:"#ffe4b5",
navajowhite:"#ffdead",
navy:"#000080",
oldlace:"#fdf5e6",
olive:"#808000",
olivedrab:"#6b8e23",
orange:"#ffa500",
orangered:"#ff4500",
orchid:"#da70d6",
palegoldenrod:"#eee8aa",
palegreen:"#98fb98",
paleturquoise:"#afeeee",
palevioletred:"#d87093",
papayawhip:"#ffefd5",
peachpuff:"#ffdab9",
peru:"#cd853f",
pink:"#ffc0cb",
plum:"#dda0dd",
powderblue:"#b0e0e6",
purple:"#800080",
red:"#ff0000",
rosybrown:"#bc8f8f",
royalblue:"#4169e1",
saddlebrown:"#8b4513",
salmon:"#fa8072",
sandybrown:"#f4a460",
seagreen:"#2e8b57",
seashell:"#fff5ee",
sienna:"#a0522d",
silver:"#c0c0c0",
skyblue:"#87ceeb",
slateblue:"#6a5acd",
slategray:"#708090",
slategrey:"#708090",
snow:"#fffafa",
springgreen:"#00ff7f",
steelblue:"#4682b4",
tan:"#d2b48c",
teal:"#008080",
thistle:"#d8bfd8",
tomato:"#ff6347",
turquoise:"#40e0d0",
violet:"#ee82ee",
wheat:"#f5deb3",
white:"#ffffff",
whitesmoke:"#f5f5f5",
yellow:"#ffff00",
yellowgreen:"#9acd32"
}, Zo = /#(.)(.)(.)/, Yo = /^#(?:[0-9a-f]{3}){1,2}$/i, $o = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
S = cp[J], S.getProperties = function() {
return {
fill:this.Ch,
bg:this.Bh,
stroke:this.Ah,
Hh:this.Ih,
cg:this.Gh,
Eh:this.Fh,
rb:this.rb ? Zk(this.rb) :k,
pattern:this.Dh
};
}, Ha(S, function() {
return new cp(this.getProperties());
}), S.uk = function(a) {
this.Ch = bp(a);
}, S.vk = function(a) {
this.Bh = Qk(a, 0, 1);
}, S.xk = function(a, b) {
this.Ah = bp(a), b != k && this.Oh(b);
}, S.Oh = function(a) {
this.Ih = a;
}, S.zk = function(a) {
this.Gh = Qk(a, 0, 1);
}, S.yk = function(a) {
this.Fh = a;
}, S.wk = function(a) {
this.Dh = a;
}, new cp({
bg:0,
fill:"white",
cg:0,
stroke:"white"
}), p.log(10), S = dp[J], S.sc = function(a, b, c) {
for (var e = k, f = 0; f < this.Yi[H]; f++) {
a:{
var e = this.Yi[f], g = a, n = c;
if (T(g)) e = ep(e, g, n); else {
for (var q = 0; q < g[H]; ++q) {
var v = ep(e, g[q], n);
if (v != k) {
e = v;
break a;
}
}
e = k;
}
}
if (e != k) return e;
}
return e = b, gk(e) ? e :k;
}, S.xc = function(a, b) {
var c = this.bm(a);
return c != k ? c :(gk(b) || (b = l), b);
}, S.bm = function(a) {
return this.sc(a, k, fp);
}, S.Yd = function(a, b) {
var c = this.ae(a);
return c != k ? c :(gk(b) || (b = 0), b);
}, S.ae = function(a) {
return this.sc(a, k, gp);
}, S.ie = function(a, b) {
return gk(b) || (b = Q), this.sc(a, b, hp);
}, S.lj = function(a, b, c) {
return this.sc(a, c, rk(ip, k, b));
}, S.cm = function(a, b) {
return gk(b) || (b = k), this.sc(a, b);
}, S = jp[J], S.td = k, S.ei = k, S.W = k, S.Db = k, S.re = k, S.gg = k, S.t = k, 
S.Vb = k, S.getDataTable = function() {
return this.td;
}, S.getOptions = function() {
return this.W;
}, S.rg = function() {
return {};
}, S.ec = function(a, b) {
return b.cm(Dj, {});
}, S.Vc = function() {
return Q;
}, S.Uc = function() {}, Ma(S, function() {
var a;
return this.t ? (a = Uo(this.t, Vo), a = new Qo(h).Di(a), Po(a), a = To(a)) :a = k, 
a;
}), Ka(S, function(a, b, c) {
this.td = a, this.ei = b || {}, this.gg = c || {}, this.qe.Ai(this.si, this);
}), S.si = function() {
this.td && (this.Ck(), this.Bk(), this.Uc(this.td, this.W, this.t), this.Ak(), google[L][x][Ta](this, Li, k));
}, S.Bk = function() {
this.W = new dp([ this.ei, this.rg() || {} ]);
}, S.Ck = function() {
this.t = this.gg || {}, lk(this.t) || d(r("Control state must be an object.")), 
this.Vb = this.Vb || this.t;
}, S.Ak = function() {
this.qk(), (this.Db = this.pk()) || d(r("Invalid Ui instance.")), this.re = google[L][x][uc](this.Db, Fj, rk(this.rk, this)), 
this.Db[Dc](this.t, this.ec(this.td, this.W)), this.t = this.Db[Ic]();
}, S.qk = function() {
this.re && (google[L][x][gb](this.re), this.re = k), Om(this.Db), this.Db = k, Sl(this.ta);
}, S.pk = function() {
var a;
a = this.W.ie(Ej, this.Vc());
var b = ck(a);
return kk(b) || (b = ck(qh + a), kk(b) || (b = k)), (a = b) ? new a(this.ta) :k;
}, S.rk = function(a) {
this.t = this.Db[Ic](), this.Wk(this.t, a);
}, S.Wk = function(a, b) {
google[L][x][Ta](this, jj, b);
}, S.resetControl = function() {
this.qe.Ai(this.Kl, this);
}, S.Kl = function() {
this.Vb && (this.gg = this.Vb, this.si());
}, S.A = function() {
return this.ca;
}, S.e = function() {
Om(this.Db), this.ca = j;
}, U(kp, jp), kp[J].applyFilter = function() {
return this[lb]() || d(r(Je)), this.Bd(this[lb](), this.getOptions(), this[Ic]());
}, kp[J].Bd = function(a) {
return new google[L][Hc](a);
}, U(lp, jp), lp[J].zd = function() {
return this[lb]() || d(r(Je)), this.Xi(this[lb](), this.getOptions(), this[Ic]());
}, lp[J].Xi = function(a) {
return a;
}, S = mp[J], S.getContainer = function() {
return this.ta;
}, S.addEventListener = function(a, b, c, e, f) {
this.H.d(a, b, c, e, f);
}, Ka(S, function() {}), Ma(S, function() {
return {};
}), S.A = function() {
return this.ca;
}, S.e = function() {
this.H[Bc](), Sl(this.ta), this.ca = j;
}, U(op, kp), S = op[J], S.Pb = k, S.za = k, S.rg = function() {
return {
useFormattedValue:l,
values:k
};
}, S.ec = function(a, b) {
var c = op.b.ec[O](this, a, b);
return c[Wc] == k && (c.label = this.Pb), c.values = this.za, c;
}, S.Hk = function(a, b) {
for (var c = b.xc(Mj), e = new Km(), f = [], g = 0; g < a[cc](); g++) {
var n = c ? a.getFormattedValue(g, this.M) :a[F](g, this.M);
n != k && !e[Nc](n) && (e.add(n), f[t](n));
}
return f;
}, S.Uc = function(a, b, c) {
this.M = np(a, b), this.Pb = a[Bb](this.M);
var e = b.sc(Rj);
this.za = hk(e) && e[H] ? e :this.Hk(a, b), this.hg(a, b, c);
}, S.hg = function(a, b, c) {
if (a = c.selectedValues) {
hk(a) || d(r(Ge));
var e = new Km();
Gk(this.za, function(a) {
a != k && e.add(s(a));
}), c.selectedValues = Hk(a, function(a) {
return e[Nc](s(a));
});
}
}, S.Bd = function(a, b, c) {
var e = new Km();
if (c = c.selectedValues, hk(c)) for (var f = 0; f < c[H]; f++) c[f] != k && e.add(s(c[f]));
if (0 == e.ab()) return new google[L][Hc](a);
for (c = b.xc(Mj), b = [], f = 0; f < a[cc](); f++) {
var g;
c ? g = a.getFormattedValue(f, this.M) :(g = a[F](f, this.M), g != k && (g = s(g))), 
e[Nc](g) && b[t](f);
}
return a = new google[L][Hc](a), a[cb](b), a;
}, U(pp, $), S = pp[J], S.wh = k, S.se = k, S.f = function() {
var a = this.zb.f(ng);
this.tb(a), this.wh = Pl(Jh, jh, this.ha + this.mk), a[Sa](this.wh), this.se = Pl(ng), 
this.lk || Hl(this.se, Tg), a[Sa](this.se);
}, S.ma = function() {
return l;
}, S.z = function() {
return this.se;
}, rp[J].lb = function() {
return this.hi.lb(this);
}, rp[J].S = function() {
return this.hi.S(this);
}, rp[J].get = function() {
return this.Ba;
}, tp[J].lb = function(a) {
return s(a.get());
}, tp[J].S = function(a) {
return s(a.get());
}, U(up, op), up[J].Vc = function() {
return te;
}, U(vp, mp), vp[J].W = k, vp[J].Qd = k;
var wp = {
jm:wf,
km:"below",
mm:Bf,
lm:Af
};
S = vp[J], Ma(S, function() {
for (var a = {
selectedValues:[]
}, b = this.P.Q(), c = 0; c < b[H]; c++) a.selectedValues[t](b[c].get());
return a;
}), Ka(S, function(a, b) {
this.W = this.Dj(b), this.Ej(a);
var c = qp(this.W);
c || (c = new $()), c.Ha(this[Sc]()), Hl(c.a(), this.W.cssClass), this.Qd = this.W.allowTyping ? this.W.allowMultiple ? new xp(this) :new yp(this) :this.W.allowMultiple ? new zp(this) :new Ap(this), 
this.Qd.Ha(c), this.P.ga() || this.Qd.Ic();
}), S.Dj = function(a) {
a = Zk(a || {}), a.caption || (a.caption = ve), a.valuesMediator = a.valuesMediator || new tp(), 
a.cssClass = a.cssClass ? s(a.cssClass) :hh, of in a || (a.allowMultiple = j), pf in a || (a.allowNone = j), 
qf in a || (a.allowTyping = j), fj in a || (a.sortValues = j);
var c, b = l;
for (c in wp) if (a.selectedValuesLayout == wp[c]) {
b = j;
break;
}
return b || (a.selectedValuesLayout = wf), a;
}, S.Ej = function(a) {
a = a || {};
var b = this.W.valuesMediator, c = new Km();
a.selectedValues != k && (hk(a.selectedValues) || d(r(Ge)), this.W.allowMultiple ? Gk(a.selectedValues, function(a) {
c.add(new rp(a, b).S());
}) :a.selectedValues[H] && c.add(new rp(a.selectedValues[0], b).S())), a = hk(this.W.values) ? this.W.values :[];
for (var e = 0; e < a[H]; e++) {
var f = new rp(a[e], b);
this.za[t](f), c[Nc](f.S()) && this.P.set(f.S(), f);
}
this.W.sortValues && this.za.sort(sp), !this.Wc() && 0 < this.za[H] && 0 == this.P.ab() && this.P.set(this.za[0].S(), this.za[0]);
}, S.e = function() {
Om(this.Qd), vp.b.e[O](this);
}, S.yb = function() {
google[L][x][Ta](this, Fj, k);
}, S.We = function() {
return this.W.caption;
}, S.Id = function() {
return this.P.ab() == this.za[H];
}, S.Wc = function() {
return !!this.W.allowNone;
}, S.Bg = function() {
return this.W.selectedValuesLayout;
}, S.Yc = function(a, b, c, e, f) {
this[Fb](a, b, c, e, f);
}, S = Bp[J], S.Ha = function(a) {
this.u = new Oo(this.i.We()), this.wf(), a.ia(this.u, j), this.i.Yc(this.u, jf, this.Ua, l, this), 
this.u.w(0 < this.i.za[H]);
}, S.wf = function() {
for (var a = this.i.za, b = 0; b < a[H]; b++) this.u.Ya(new Do(a[b].lb(), a[b]));
}, S.Ic = function() {}, S.Ua = function() {
this.i.yb();
}, S.e = function() {
Om(this.u), this.ca = j;
}, S.A = function() {
return this.ca;
}, U(Ap, Bp), Ap[J].wf = function() {
var a = this.i;
a.Wc() && this.u.Ya(new Do(a.We())), Ap.b.wf[O](this);
}, Ap[J].Ic = function() {
for (var a = this.i.P.Q()[0], b = 0, c = this.u.xb(); c > b; b++) if (this.u.oa(b).hb == a) {
this.u.tf(b);
break;
}
}, Ap[J].Ua = function(a) {
this.i.P[Lb]();
var b = this.u.Ob().hb;
b && this.i.P.set(b.S(), b), Ap.b.Ua[O](this, a);
}, U(zp, Bp), S = zp[J], S.Ha = function(a) {
zp.b.Ha[O](this, a);
var b = this.i.Bg();
b == wf && this.u.Ye(Tg), this.ya = new Cp(b, qm(this.u.a())[u], this.i.Wc() ? 0 :1), 
a.ia(this.ya, j), this.i.Yc(this.ya, jf, this.$c, l, this);
}, S.Ic = function() {
for (var a = this.i.P, b = 0, c = this.u.xb(); c > b; b++) a.Za(this.u.oa(b).hb.S()) && this.u.oa(b).Y(l);
this.ya.Jd(a.Q()), this.u.wb(k), this.u.w(!this.i.Id());
}, S.Ua = function(a) {
var b = this.u.Ob().hb;
this.u.Ob().Y(l), this.u.wb(k), this.i.P.set(b.S(), b), this.u.w(!this.i.Id()), 
this.ya.Jd(this.i.P.Q()), zp.b.Ua[O](this, a);
}, S.$c = function(a) {
a = a[nb], this.i.P[yb](a.S()), this.u.w(j);
for (var b = 0, c = this.u.xb(); c > b; b++) if (this.u.oa(b).hb == a) {
this.u.oa(b).Y(j);
break;
}
this.i.yb();
}, S.e = function() {
Om(this.ya), zp.b.e[O](this);
}, S = Dp[J], S.Ha = function(a) {
var b = this.i.za;
this.s = new zo(), this.s.qj(j), this.s.pj(this.i.We());
for (var c = 0; c < b[H]; c++) this.s.Ya(new Ao(b[c].lb(), b[c]));
a.ia(this.s, j), this.s.w(0 < b[H]), this.i.Yc(this.s, jf, this.Ua, l, this), a = Nl(ea, Dh, k, this.s.a())[0], 
this.i.Yc(a, Df, this.mf, l, this);
}, S.Ic = function() {}, S.Ua = function() {
this.i.yb();
}, S.mf = function() {}, S.e = function() {
Om(this.s), this.ca = j;
}, S.A = function() {
return this.ca;
}, U(yp, Dp), yp[J].Ic = function() {
this.s[ec](this.i.P.Q()[0].lb());
}, yp[J].Ua = function(a) {
this.i.P[Lb]();
var b = a[nb][F]();
b && this.i.P.set(b.S(), b), yp.b.Ua[O](this, a);
}, yp[J].mf = function() {
var a = this.i.P;
if (!this.s[F]() && this.i.Wc()) {
var b = !a.ga();
a[Lb](), b && this.i.yb();
} else a.ga() ? this.s[ec](Q) :this.s[ec](a.Q()[0].lb());
}, U(xp, Dp), S = xp[J], S.Ha = function(a) {
xp.b.Ha[O](this, a);
var b = this.i.Bg();
b == wf && Hl(this.s.a(), Tg), this.ya = new Cp(b, qm(this.s.a())[u], this.i.Wc() ? 0 :1), 
a.ia(this.ya, j), this.i.Yc(this.ya, jf, this.$c, l, this);
}, S.Ic = function() {
for (var a = this.i.P, b = 0, c = this.s.xb(); c > b; b++) a.Za(this.s.oa(b).hb.S()) && this.s.oa(b).w(l);
this.ya.Jd(a.Q()), this.s[ec](Q), this.s.w(!this.i.Id());
}, S.Ua = function(a) {
var b = a[nb][F]();
a[nb].w(l), a[mb](), this.s.vc(), this.s[ec](Q), this.i.P.set(b.S(), b), this.s.w(!this.i.Id()), 
this.ya.Jd(this.i.P.Q()), xp.b.Ua[O](this, a);
}, S.$c = function(a) {
a = a[nb], this.i.P[yb](a.S()), this.s.w(j);
for (var b = 0, c = this.s.xb(); c > b; b++) if (this.s.oa(b).hb == a) {
this.s.oa(b).w(j);
break;
}
this.i.yb();
}, S.mf = function() {
this.s[ec](Q);
}, S.e = function() {
xp.b.e[O](this), Om(this.ya);
}, U(Cp, $), S = Cp[J], S.f = function() {
var a = this.zb.f(Gj);
this.tb(a), this.ra(a);
}, S.ma = function(a) {
return a[Qc] == Te;
}, S.ra = function(a) {
Hl(a, ih), this.Dc == wf ? Hl(a, Tg) :(this.Dc == Bf || this.Dc == Af) && (T(Sh) ? em(a, this.gl + Ji, Sh) :Tk(Sh, sk(em, a)));
}, S.Jd = function(a) {
this.ti(j), this.te = [], this.dc = a[H];
for (var b = 0; b < this.dc; b++) {
var c = this.Zk(a[b]);
this.te[t](c), this.ia(c, j);
}
}, S.Zk = function(a) {
var b = new so(zh, new Ep(this.Dc));
b.gb(l);
var c = new Zn(Wj, new Co());
return cn(c, jf, sk(this.$c, a, b), l, this), b.ia(c, j), c.a()[Gb](qj, 0), c.w(this.dc > this.xf), 
a = new Wn(a.lb()), a.Ye(Tg), b.ia(a, j), b;
}, S.$c = function(a, b, c) {
this.dc <= this.xf || (this[xc](c[N][Va](), j), Lk(this.te, b), this.dc--, this.dc <= this.xf && 0 < this.dc && Gk(this.te, function(a) {
a.qa(0).w(l);
}), this[z](new ho(jf, this, a)));
}, U(Ep, ro), Ep[J].f = function(a) {
var b = this.Dc == Af ? Q :Tg;
return a.n().f(Mh, this.Qb(a)[Zc](dd) + dd + b);
}, Ep[J].ma = function(a) {
return a[Qc] == He;
}, U(Fp, kp), Fp[J].Vc = function() {
return ue;
}, Fp[J].Uc = function(a, b, c) {
this.M = np(a, b), b = a[Cb](this.M), (b == mj || b == Ef) && d(r("The filter cannot operate on a column of type " + b + ". Column type must be one of: number, date, datetime or timeofday. Column role must be domain, and correlate to a continuous axis.")), 
c.__data__ = a;
}, Fp[J].Bd = function(a, b, c) {
return a = new google[L][Hc](a), b = c.range, fk(b) != oi ? a :(c = b[Cc], b = b.end, 
c == k && b == k ? a :(a[cb](a.getFilteredRows([ {
column:this.M,
minValue:c,
maxValue:b
} ])), a));
}, U(Gp, mp), S = Gp[J], S.Le = k, S.Ke = k, S.Vb = k, Ma(S, function() {
if (!this.Le) return this.Vb === k ? {} :{
range:this.Vb.range
};
var a = this.Le.getRange();
return fk(a), {
range:a
};
}), Ka(S, function(a, b) {
this.Vb = a, this.Ke = new google[L].ChartWrapper({
chartType:Ne,
dataTable:a.__data__,
options:b,
state:a,
view:b.chartView
}), google[L][x][uc](this.Ke, Li, rk(this.Cl, this)), this.Ke[Dc](this[Sc]());
}), S.Cl = function() {
this.Le = this.Ke.getChart(), google[L][x][uc](this.Le, Ki, rk(this.Jl, this));
}, S.Jl = function(a) {
google[L][x][Ta](this, Fj, {
startChanged:a.startChanged,
endChanged:a.endChanged,
inProgress:a.inProgress
});
}, U(Hp, kp), S = Hp[J], S.Pb = k, S.rg = function() {
return {
matchType:Gi,
caseSensitive:l,
useFormattedValue:l
};
}, S.ec = function(a, b) {
var c = Hp.b.ec[O](this, a, b);
return c[Wc] == k && (c.label = this.Pb), c;
}, S.Uc = function(a, b) {
this.M = np(a, b), this.Pb = a[Bb](this.M);
}, S.Bd = function(a, b, c) {
var e = b.xc(Rf), f = b.ie(Rh);
b.xc(Hi);
var g = b.xc(Mj), n = this.M;
if (b = [], c = c[kb], !c) return new google[L][Hc](a);
e || (c = c[ad]());
for (var q = 0; q < a[cc](); q++) {
var v = g ? a.getFormattedValue(q, n) :Q + a[F](q, n);
switch (e || (v = v[ad]()), f) {
case zg:
v == c && b[t](q);
break;

case sf:
-1 != v[y](c) && b[t](q);
break;

default:
0 == v[y](c) && b[t](q);
}
}
return a = new google[L][Hc](a), a[cb](b), a;
}, U(Ip, Hp), Ip[J].Vc = function() {
return Oe;
}, U(Jp, mp), S = Jp[J], S.G = k, Ma(S, function() {
return {
value:this.G ? this.G[kb] :k
};
}), Ka(S, function(a, b) {
b = b || {};
var c = qp(b);
c || (c = new $()), c.Ha(this[Sc]()), Hl(c.a(), b.cssClass ? s(b.cssClass) :ph), 
this.G = this.If(a, b), c.z()[Sa](this.G);
}), S.If = function(a, b) {
var c = Pl(Dh);
return c[Gb](Ah, mk(this[Sc]()) + Qd), Nj in a && a[kb] && la(c, s(a[kb])), Ni in b && !b.realtimeTrigger ? (this[Fb](c, Gh, this.Pi, l, this), 
this[Fb](c, Tf, this.yb, l, this)) :this[Fb](c, Ih, this.Pi), c;
}, S.Pi = function(a) {
this.Fb && on[Ya](this.Fb), 13 == a[B] ? (this.yb(), a[mb]()) :this.Fb = pn(function() {
this.Fb = k, this.yb();
}, 200, this);
}, S.yb = function() {
google[L][x][Ta](this, Fj, k);
}, U(Kp, mn), ta(Kp[J], function(a) {
var b = 0, c = 0, e = 0;
a = a.pa, a[E] == ei ? (c = 1, (W || Y && (gl || Z(he))) && (c = 40), e = Lp(-a.wheelDelta, c), 
gk(a.wheelDeltaX) ? (b = Lp(-a.wheelDeltaX, c), c = Lp(-a.wheelDeltaY, c)) :c = e) :(e = a.detail, 
e > 100 ? e = 3 :-100 > e && (e = -3), gk(a.axis) && a.axis === a.HORIZONTAL_AXIS ? b = e :c = e), 
jk(this.Ei) && (b = Qk(b, -this.Ei, this.Ei)), jk(this.Fi) && (c = Qk(c, -this.Fi, this.Fi)), 
this.Dk && (b = -b), b = new Mp(e, a, b, c), this[z](b);
}), Kp[J].g = function() {
Kp.b.g[O](this), gn(this.gh), delete this.gh;
}, U(Mp, Vm), U(Np, mn), S = Np[J], S.Lh = function() {
this.t = 1;
}, S.Ae = function() {
this.t = 0;
}, S.$f = function() {
return 1 == this.t;
}, S.wd = function() {
return -1 == this.t;
}, S.he = function() {
return 0 == this.t;
}, S.ne = function() {
this.Gb(zf);
}, S.Lc = function() {
this.Gb(wg);
}, S.Sh = function() {
this.Gb(Eg);
}, S.Jh = function() {
this.Gb(Di);
}, S.Kh = function() {
this.Gb(Ri);
}, S.ai = function() {
this.Gb(lj);
}, S.Gb = function(a) {
this[z](a);
}, U(Op, Np), Op[J].add = function(a) {
Kk(this.Ab, a) || (this.Ab[t](a), cn(a, Eg, this.Ni, l, this));
}, qa(Op[J], function(a) {
Lk(this.Ab, a) && en(a, Eg, this.Ni, l, this);
}), Op[J].g = function() {
Gk(this.Ab, function(a) {
a.e();
}), Da(this.Ab, 0), Op.b.g[O](this);
}, U(Pp, Op), Pp[J].play = function(a) {
if (0 == this.Ab[H]) return l;
if (a || this.he()) this.fg = 0, this.ne(); else if (this.$f()) return l;
this.Jh(), this.wd() && this.Kh();
var b = this.wd() && !a;
return Pa(this, tk()), this.qd = k, this.Lh(), Gk(this.Ab, function(c) {
(!b || c.wd()) && c.play(a);
}), j;
}, Ba(Pp[J], function(a) {
Gk(this.Ab, function(b) {
b.he() || b[Zb](a);
}), this.Ae(), this.qd = tk(), this.ai(), this.Lc();
}), Pp[J].Ni = function() {
this.fg++, this.fg == this.Ab[H] && (this.qd = tk(), this.Ae(), this.Sh(), this.Lc());
}, U(Qp, Mm), S = Qp[J], S.Na = 0, S.g = function() {
Qp.b.g[O](this), this[Zb](), delete this.Nf, delete this.ld;
}, S.start = function(a) {
this[Zb](), this.Na = pn(this.Yk, gk(a) ? a :this.Sc);
}, Ba(S, function() {
this.cc() && on[Ya](this.Na), this.Na = 0;
}), S.cc = function() {
return 0 != this.Na;
}, S.ol = function() {
this.Na = 0, this.Nf && this.Nf[O](this.ld);
};
var Rp = {}, Sp = k;
U(Vp, Np), S = Vp[J], S.Kb = function(a) {
this.gc = a;
}, S.Oa = 0, S.play = function(a) {
if (a || this.he()) this.Oa = 0, La(this, this.xd); else if (this.$f()) return l;
Tp(this), a = tk(), Pa(this, a), this.wd() && Pa(this, this[Tc] - this.duration * this.Oa), 
this.qd = this[Tc] + this.duration, this.Oa || this.ne(), this.Jh(), this.wd() && this.Kh(), 
this.Lh();
var b = mk(this);
return b in Rp || (Rp[b] = this), Up(), this.Vh(a), j;
}, Ba(S, function(a) {
Tp(this), this.Ae(), a && (this.Oa = 1), this.bi(this.Oa), this.ai(), this.Lc();
}), S.g = function() {
this.he() || this[Zb](l), this.Vj(), Vp.b.g[O](this);
}, S.Ql = function(a) {
this.Vh(a);
}, S.Vh = function(a) {
this.Oa = (a - this[Tc]) / (this.qd - this[Tc]), 1 <= this.Oa && (this.Oa = 1), 
this.bi(this.Oa), 1 == this.Oa ? (this.Ae(), Tp(this), this.Sh(), this.Lc()) :this.$f() && this.Rf();
}, S.bi = function(a) {
kk(this.Gi) && (a = this.Gi(a)), La(this, ga(this.xd[H]));
for (var b = 0; b < this.xd[H]; b++) this[Ec][b] = (this.rl[b] - this.xd[b]) * a + this.xd[b];
}, S.Rf = function() {
this.Gb(rf);
}, S.Vj = function() {
this.Gb(hg);
}, S.Gb = function(a) {
this[z](new Wp(a, this));
}, U(Wp, Tm), U(Xp, Vp), S = Xp[J], S.Pc = dk, S.jb = function() {
return gk(this.fb) || (this.fb = mm(this[Rc])), this.fb;
}, S.Rf = function() {
this.Pc(), Xp.b.Rf[O](this);
}, S.Lc = function() {
this.Pc(), Xp.b.Lc[O](this);
}, S.ne = function() {
this.Pc(), Xp.b.ne[O](this);
}, U(Yp, Xp), Yp[J].Pc = function() {
var a = this.gc && this.jb() ? Ti :Lh;
this[Rc][M][a] = p[$a](this[Ec][0]) + Ji, this[Rc][M].top = p[$a](this[Ec][1]) + Ji;
}, U(Zp, Xp), Zp[J].Pc = function() {
ka(this[Rc][M], p[$a](this[Ec][0]) + Ji);
}, U($p, Xp), $p[J].Pc = function() {
Qa(this[Rc][M], p[$a](this[Ec][0]) + Ji);
}, U(aq, mn);
var bq = W || X && Z("1.9.3");
S = aq[J], ya(S, 0), za(S, 0), oa(S, 0), pa(S, 0), S.nh = 0, S.oh = 0, S.lc = 0, 
S.mc = 0, S.aa = j, S.hc = l, S.mh = 0, S.ak = l, S.gc = l, S.Kb = function(a) {
this.gc = a;
}, S.R = function() {
return this.H;
}, S.w = function(a) {
this.aa = a;
}, S.g = function() {
aq.b.g[O](this), en(this.handle, [ zj, $h ], this.ah, l, this), this.$g(), Ia(this, k), 
this.H = this.handle = k;
}, S.zh = function() {
return gk(this.fb) || (this.fb = mm(this[N])), this.fb;
}, S.ah = function(a) {
var b = a[E] == $h;
if (!this.aa || this.hc || b && !a.Df()) this[z](ug); else {
if (this.Mf(a), 0 == this.mh) {
if (!this.lh(a)) return;
this.hc = j, a[mb]();
} else a[mb]();
this.fk(), ya(this, this.nh = a[Tb]), za(this, this.oh = a[Ub]), oa(this, a[tb]), 
pa(this, a[ub]), this.lc = this.gc ? ao(this[N]) :this[N][sc], this.mc = this[N][Xc], 
this.Xf = Kl(this.r).pd(), tk();
}
}, S.fk = function() {
var a = this.r, b = a[Vb], c = !bq;
this.H.d(a, [ yj, ai ], this.$j, c), this.H.d(a, [ xj, di ], this.je, c), bq ? (b.setCapture(l), 
this.H.d(b, Qh, this.je)) :this.H.d(a ? a[Kb] || a[Nb] :ba, Df, this.je), W && this.ak && this.H.d(a, pg, Um), 
this.ck && this.H.d(this.ck, Wi, this.bk, c);
}, S.lh = function(a) {
return this[z](new cq(ij, this, a[Tb], a[Ub], a));
}, S.$g = function() {
this.H[Bc](), bq && this.r.releaseCapture();
}, S.je = function(a, b) {
if (this.$g(), this.hc) {
this.Mf(a), this.hc = l;
var c = this.Mh(this.lc), e = this.Nh(this.mc);
this[z](new cq(wg, this, a[Tb], a[Ub], a, c, e, b || a[E] == wj));
} else this[z](ug);
(a[E] == xj || a[E] == wj) && a[mb]();
}, S.Mf = function(a) {
var b = a[E];
b == zj || b == yj ? a.Tb(a.pa[pb][0], a.currentTarget) :(b == xj || b == wj) && a.Tb(a.pa.changedTouches[0], a.currentTarget);
}, S.$j = function(a) {
if (this.aa) {
this.Mf(a);
var b = (this.gc && this.zh() ? -1 :1) * (a[Tb] - this[Tb]), c = a[Ub] - this[Ub];
if (ya(this, a[Tb]), za(this, a[Ub]), oa(this, a[tb]), pa(this, a[ub]), !this.hc) {
var e = this.nh - this[Tb], f = this.oh - this[Ub];
if (e * e + f * f > this.mh) {
if (!this.lh(a)) return this.A() || this.je(a), void 0;
this.hc = j;
}
}
c = this.xh(b, c), b = c.x, c = c.y, this.hc && this[z](new cq(yf, this, a[Tb], a[Ub], a, b, c)) && (this.yh(a, b, c, l), 
a[mb]());
}
}, S.xh = function(a, b) {
var c = Kl(this.r).pd();
a += c.x - this.Xf.x, b += c.y - this.Xf.y, this.Xf = c, this.lc += a, this.mc += b;
var c = this.Mh(this.lc), e = this.Nh(this.mc);
return new V(c, e);
}, S.bk = function(a) {
var b = this.xh(0, 0);
ya(a, this[Tb]), za(a, this[Ub]), this.yh(a, b.x, b.y, j);
}, S.yh = function(a, b, c) {
this.af(b, c), this[z](new cq(og, this, a[Tb], a[Ub], a, b, c));
}, S.Mh = function(a) {
var b = this.Zh, c = fa(b[A]) ? k :b[A], b = fa(b[u]) ? 0 :b[u];
return p.min(c != k ? c + b :da, p.max(c != k ? c :-da, a));
}, S.Nh = function(a) {
var b = this.Zh, c = fa(b.top) ? k :b.top, b = fa(b[P]) ? 0 :b[P];
return p.min(c != k ? c + b :da, p.max(c != k ? c :-da, a));
}, S.af = function(a, b) {
this.gc && this.zh() ? Ra(this[N][M], a + Ji) :na(this[N][M], a + Ji), this[N][M].top = b + Ji;
}, U(cq, Tm), U(dq, mn), S = dq[J], S.Ba = 0, S.eb = 0, S.Pa = 100, S.Fa = 0, S.Eb = 1, 
S.ua = l, S.Nc = l, S.vh = function(a) {
this.Nc = a;
}, Ea(S, function(a) {
a = this.Bb(a), this.Ba != a && (this.Ba = a + this.Fa > this.Pa ? this.Pa - this.Fa :a < this.eb ? this.eb :a, 
!this.ua && !this.Nc && this[z](Tf));
}), xa(S, function() {
return this.Bb(this.Ba);
}), S.md = function(a) {
a = this.Bb(a), this.Fa != a && (this.Fa = 0 > a ? 0 :this.Ba + a > this.Pa ? this.Pa - this.Ba :a, 
!this.ua && !this.Nc && this[z](Tf));
}, S.Ka = function() {
return this.Dl(this.Fa);
}, S.Ld = function(a) {
if (this.eb != a) {
var b = this.ua;
this.ua = j, this.eb = a, a + this.Fa > this.Pa && (this.Fa = this.Pa - this.eb), 
a > this.Ba && this[ec](a), a > this.Pa && (this.Fa = 0, this.bd(a), this[ec](a)), 
this.ua = b, !this.ua && !this.Nc && this[z](Tf);
}
}, S.U = function() {
return this.Bb(this.eb);
}, S.bd = function(a) {
if (a = this.Bb(a), this.Pa != a) {
var b = this.ua;
this.ua = j, this.Pa = a, a < this.Ba + this.Fa && this[ec](a - this.Fa), a < this.eb && (this.Fa = 0, 
this.Ld(a), this[ec](this.Pa)), a < this.eb + this.Fa && (this.Fa = this.Pa - this.eb), 
this.ua = b, !this.ua && !this.Nc && this[z](Tf);
}
}, S.T = function() {
return this.Bb(this.Pa);
}, S.qf = function() {
return this.Eb;
}, S.gf = function(a) {
this.Eb != a && (this.Eb = a, a = this.ua, this.ua = j, this.bd(this.T()), this.md(this.Ka()), 
this[ec](this[F]()), this.ua = a, !this.ua && !this.Nc && this[z](Tf));
}, S.Bb = function(a) {
return this.Eb == k ? a :this.eb + p[$a]((a - this.eb) / this.Eb) * this.Eb;
}, S.Dl = function(a) {
return this.Eb == k ? a :p[$a](a / this.Eb) * this.Eb;
}, U(eq, $);
var fq = "dragvaluestart_" + ln++, gq = "dragvalueend_" + ln++, hq = "dragextentstart_" + ln++, iq = "dragextentend_" + ln++, jq = "dragstart_" + ln++, kq = "dragend_" + ln++;
S = eq[J], S.F = zh, S.be = l, S.Ij = l, S.bb = 10, S.od = 0, S.Mg = j, S.aa = j, 
S.xa = l, S.f = function() {
eq.b.f[O](this);
var a = this.n().f(ng, this.l(this.F));
this.ra(a);
}, S.ra = function(a) {
eq.b.ra[O](this, a), Hl(a, this.l(this.F)), this.Oj(), this.Pj();
}, S.C = function() {
eq.b.C[O](this), this.wa = new aq(this.o), this.ib = new aq(this.fa), this.wa.Kb(this.xa), 
this.ib.Kb(this.xa), this.wa.af = this.ib.af = dk, this.D = new Nn(this.a()), this.Ag(j), 
va(this.a(), 0), this.Gd();
}, S.Ag = function(a) {
a ? (this.R().d(this.wa, yf, this.de).d(this.ib, yf, this.de).d(this.wa, [ ij, wg ], this.ee).d(this.ib, [ ij, wg ], this.ee).d(this.D, Fh, this.Rd).d(this.a(), $h, this.Lg), 
this.Mg && this.Kg(j)) :(this.R().I(this.wa, yf, this.de).I(this.ib, yf, this.de).I(this.wa, [ ij, wg ], this.ee).I(this.ib, [ ij, wg ], this.ee).I(this.D, Fh, this.Rd).I(this.a(), $h, this.Lg), 
this.Mg && this.Kg(l));
}, S.ka = function() {
eq.b.ka[O](this), Nm(this.wa, this.ib, this.D, this.Xb);
}, S.de = function(a) {
var c, b = a.nf == this.wa ? this.o :this.fa;
this.F == Sj ? (c = this.a()[Jc] - b[Yc], c = (c - a.top) / c * (this.T() - this.U()) + this.U()) :c = a[A] / (this.a()[ic] - b[fb]) * (this.T() - this.U()) + this.U(), 
c = a.nf == this.wa ? p.min(p.max(c, this.U()), this[F]() + this.Ka()) :p.min(p.max(c, this[F]()), this.T()), 
this.Xc(b, c);
}, S.ee = function(a) {
var b = a[E] == ij;
Jl(this.a(), fh, b), Jl(a[N].handle, gh, b), a = a.nf == this.wa, b ? (this[z](jq), 
this[z](a ? fq :hq)) :(this[z](kq), this[z](a ? gq :iq));
}, S.Rd = function(a) {
var b = j;
switch (a[B]) {
case 36:
this.pf(this.U());
break;

case 35:
this.pf(this.T());
break;

case 33:
this.qc(this.bb);
break;

case 34:
this.qc(-this.bb);
break;

case 37:
var c = this.xa && this.jb() ? 1 :-1;
this.qc(a[Pc] ? c * this.bb :c * this.Rc);
break;

case 40:
this.qc(a[Pc] ? -this.bb :-this.Rc);
break;

case 39:
c = this.xa && this.jb() ? -1 :1, this.qc(a[Pc] ? c * this.bb :c * this.Rc);
break;

case 38:
this.qc(a[Pc] ? this.bb :this.Rc);
break;

default:
b = l;
}
b && a[mb]();
}, S.Lg = function(a) {
this.a()[zb] && this.a()[zb]();
var b = a[N];
!Vl(this.o, b) && !Vl(this.fa, b) && (this.Ij ? this.pf(this.Eg(a)) :this.Jj(a));
}, S.Vg = function(a) {
this.qc((0 < a.detail ? -1 :1) * this.Rc), a[mb]();
}, S.Jj = function(a) {
this.lf(a), this.Ma = this.zg(this.Eg(a)), this.Hg = this.F == Sj ? this.Zd < this.Ma[Xc] :this.Zd > this.Zc(this.Ma) + this.Ma[fb], 
a = Ml(this.a()), this.R().d(a, di, this.jf, j).d(this.a(), ai, this.lf), this.Jb || (this.Jb = new nn(200), 
this.R().d(this.Jb, tj, this.Pg)), this.Pg(), this.Jb[Cc]();
}, S.Pg = function() {
var a;
if (this.F == Sj) {
var b = this.Zd, c = this.Ma[Xc];
this.Hg ? c > b && (a = this.nb(this.Ma) + this.bb) :b > c + this.Ma[Yc] && (a = this.nb(this.Ma) - this.bb);
} else b = this.Zd, c = this.Zc(this.Ma), this.Hg ? b > c + this.Ma[fb] && (a = this.nb(this.Ma) + this.bb) :c > b && (a = this.nb(this.Ma) - this.bb);
gk(a) && this.Xc(this.Ma, a);
}, S.jf = function() {
this.Jb && this.Jb[Zb]();
var a = Ml(this.a());
this.R().I(a, di, this.jf, j).I(this.a(), ai, this.lf);
}, S.Af = function(a) {
var b;
return b = this.a(), a = nm(a), b = nm(b), b = new V(a.x - b.x, a.y - b.y), this.F == Sj ? b.y :this.xa && this.jb() ? this.a()[ic] - b.x :b.x;
}, S.lf = function(a) {
this.Zd = this.Af(a);
}, S.Eg = function(a) {
var b = this.U(), c = this.T();
if (this.F == Sj) {
var e = this.o[Yc], f = this.a()[Jc] - e;
return a = this.Af(a) - e / 2, (c - b) * (f - a) / f + b;
}
return e = this.o[fb], f = this.a()[ic] - e, a = this.Af(a) - e / 2, (c - b) * a / f + b;
}, S.nb = function(a) {
return a == this.o ? this.m[F]() :a == this.fa ? this.m[F]() + this.m.Ka() :(d(r("Illegal thumb element. Neither minThumb nor maxThumb")), 
void 0);
}, S.qc = function(a) {
var b = this.nb(this.o) + a;
a = this.nb(this.fa) + a, b = Qk(b, this.U(), this.T() - this.od), a = Qk(a, this.U() + this.od, this.T()), 
this.Xe(b, a - b);
}, S.Xc = function(a, b) {
var c = k;
a == this.fa && b <= this.m.T() && b >= this.m[F]() + this.od && (c = b - this.m[F]());
var e = c || this.m.Ka();
a == this.o && b >= this.U() && b <= this.m[F]() + e - this.od && (e -= b - this.m[F](), 
this.m.Bb(b) + this.m.Bb(e) == this.m.Bb(b + e) && (this.Xe(b, e), c = k)), c != k && this.m.md(c);
}, S.Xe = function(a, b) {
this.U() <= a && a <= this.T() - b && this.od <= b && b <= this.T() - a && !(a == this[F]() && b == this.Ka()) && (this.m.vh(j), 
this.m.md(0), this.m[ec](a), this.m.md(b), this.m.vh(l), this.uh(k));
}, S.U = function() {
return this.m.U();
}, S.Ld = function(a) {
this.m.Ld(a);
}, S.T = function() {
return this.m.T();
}, S.bd = function(a) {
this.m.bd(a);
}, S.zg = function(a) {
return a <= this.m[F]() + this.m.Ka() / 2 ? this.o :this.fa;
}, S.uh = function() {
this.Gd(), this.rh(), this[z](Tf);
}, S.Gd = function() {
if (this.o && !this.be) {
var a = this.Cc(this.nb(this.o)), b = this.Cc(this.nb(this.fa));
if (this.F == Sj) this.o[M].top = a.y + Ji, this.fa[M].top = b.y + Ji, this.N && (a = this.Mc(b.y, a.y, this.o[Yc]), 
this.N[M].top = a[Pb] + Ji, Qa(this.N[M], a[hc] + Ji)); else {
var c = this.xa && this.jb() ? Ti :Lh;
this.o[M][c] = a.x + Ji, this.fa[M][c] = b.x + Ji, this.N && (a = this.Mc(a.x, b.x, this.o[fb]), 
this.N[M][c] = a[Pb] + Ji, ka(this.N[M], a[hc] + Ji));
}
}
}, S.Mc = function(a, b, c) {
var e = p[db](c / 2);
return {
offset:a + e,
size:p.max(b - a + c - 2 * e, 0)
};
}, S.Cc = function(a) {
var b = new V();
if (this.o) {
var c = this.U(), e = this.T(), c = a == c && c == e ? 0 :(a - c) / (e - c);
this.F == Sj ? (a = this.a()[Jc] - this.o[Yc], c = p[$a](c * a), b.y = a - c) :(a = p[$a](c * (this.a()[ic] - this.o[fb])), 
b.x = a);
}
return b;
}, S.pf = function(a) {
a = Qk(a, this.U(), this.T()), this.be && this.Dd[Zb](j);
var c, b = new Pp(), e = this.zg(a), f = this[F](), g = this.Ka();
c = this.nb(e);
var n = this.Cc(c), q = this.qf();
p.abs(a - c) < q && (a = Qk(c + (a > c ? q :-q), this.U(), this.T())), this.Xc(e, a), 
a = this.Cc(this.nb(e)), c = this.F == Sj ? [ this.Zc(e), a.y ] :[ a.x, e[Xc] ], 
n = new Yp(e, [ n.x, n.y ], c, 100), n.Kb(this.xa), b.add(n), this.N && this.xj(e, f, g, a, b), 
this.Dd = b, this.R().d(b, wg, this.yj), this.be = j, b.play(l);
}, S.xj = function(a, b, c, e, f) {
var g = this.Cc(b), n = this.Cc(b + c);
b = g, c = n, a == this.o ? b = e :c = e, this.F == Sj ? (a = this.Mc(n.y, g.y, this.o[Yc]), 
g = this.Mc(c.y, b.y, this.o[Yc]), e = new Yp(this.N, [ this.Zc(this.N), a[Pb] ], [ this.Zc(this.N), g[Pb] ], 100), 
a = new $p(this.N, a[hc], g[hc], 100)) :(a = this.Mc(g.x, n.x, this.o[fb]), g = this.Mc(b.x, c.x, this.o[fb]), 
e = new Yp(this.N, [ a[Pb], this.N[Xc] ], [ g[Pb], this.N[Xc] ], 100), a = new Zp(this.N, a[hc], g[hc], 100)), 
e.Kb(this.xa), a.Kb(this.xa), f.add(e), f.add(a);
}, S.yj = function() {
this.be = l;
}, S.Xd = function(a) {
if (this.F != a) {
var b = this.l(this.F), c = this.l(a);
if (this.F = a, this.a()) {
a = this.a();
for (var e = Gl(a), f = l, g = 0; g < e[H]; g++) e[g] == b && (Ok(e, g--, 1), f = j);
f && (e[t](c), Fa(a, e[Zc](dd))), b = this.xa && this.jb() ? Ti :Lh, this.o[M][b] = this.o[M].top = Q, 
this.fa[M][b] = this.fa[M].top = Q, this.N && (this.N[M][b] = this.N[M].top = Q, 
ka(this.N[M], Qa(this.N[M], Q))), this.Gd();
}
}
}, S.g = function() {
eq.b.g[O](this), this.Jb && this.Jb.e(), delete this.Jb, this.Dd && this.Dd.e(), 
delete this.Dd, delete this.o, delete this.fa, this.N && delete this.N, this.m.e(), 
delete this.m, this.D && (this.D.e(), delete this.D), this.Xb && (this.Xb.e(), delete this.Xb), 
this.wa && (this.wa.e(), delete this.wa), this.ib && (this.ib.e(), delete this.ib);
}, S.mj = function(a) {
this.bb = a;
}, S.Rc = 1, S.nj = function(a) {
this.Rc = a;
}, S.qf = function() {
return this.m.qf();
}, S.gf = function(a) {
this.m.gf(a);
}, xa(S, function() {
return this.m[F]();
}), Ea(S, function(a) {
this.Xc(this.o, a);
}), S.Ka = function() {
return this.m.Ka();
}, S.md = function(a) {
this.Xc(this.fa, this.m[F]() + a);
}, S.Y = function(a) {
tm(this.a(), a), a && this.Gd();
}, S.Pj = function() {
Dn(this.a(), dj), this.rh();
}, S.rh = function() {
var a = this.a();
a && (En(a, Pj, this.U()), En(a, Oj, this.T()), En(a, Qj, this[F]()));
}, S.Kg = function(a) {
a ? (this.Xb || (this.Xb = new Kp(this.a())), this.R().d(this.Xb, ei, this.Vg)) :this.R().I(this.Xb, ei, this.Vg);
}, S.w = function(a) {
this.aa != a && this[z](a ? vg :jg) && (this.aa = a, this.Ag(a), a || this.jf(), 
Jl(this.a(), eh, !a));
}, Ja(S, function() {
return this.aa;
}), S.Zc = function(a) {
return this.xa ? ao(a) :a[sc];
}, U(lq, kp), S = lq[J], S.Pb = k, S.sd = k, S.rd = k, S.ql = function(a) {
return p[eb](a.getColumnRange(this.M).min);
}, S.pl = function(a) {
return p[db](a.getColumnRange(this.M).max);
}, S.ec = function(a, b) {
var c = lq.b.ec[O](this, a, b);
return c.minValue = this.sd, c.maxValue = this.rd, c[Wc] == k && (c.label = this.Pb), 
c;
}, S.Uc = function(a, b, c) {
this.M = np(a, b), this.Pb = a[Bb](this.M), a[Cb](this.M) != mi && d(r("Column " + this.M + " is not numeric")), 
this.Xk(a, b), this.hg(a, b, c);
}, S.Xk = function(a, b) {
this.sd = b.Yd(Yh, this.ql(a)), this.rd = b.Yd(Th, this.pl(a));
}, S.hg = function(a, b, c) {
c.lowThumbAtMinimum ? c.lowValue = this.sd :(a = Dk(s(c.lowValue)), fa(a) && (a = ha.NEGATIVE_INFINITY), 
c.lowValue = Qk(a, this.sd, this.rd)), c.highThumbAtMaximum ? c.highValue = this.rd :(a = Dk(s(c.highValue)), 
fa(a) && (a = ha.POSITIVE_INFINITY), c.highValue = Qk(a, this.sd, this.rd));
}, S.Bd = function(a, b, c) {
return a = new google[L][Hc](a), a[cb](a.getFilteredRows([ {
column:this.M,
minValue:c.lowValue,
maxValue:c.highValue
} ])), a;
}, U(mq, lq), mq[J].Vc = function() {
return Ke;
}, U(nq, mp);
var oq = {
showRangeValues:j,
minValue:k,
maxValue:k,
ticks:k,
cssClass:"google-visualization-controls-rangefilter",
unitIncrement:1,
blockIncrement:10,
orientation:zh
};
S = nq[J], S.Ac = k, S.zc = k, S.v = k, Ma(S, function() {
return this.v ? {
lowValue:this.v[F](),
highValue:this.v[F]() + this.v.Ka(),
lowThumbAtMinimum:this.v[F]() == this.v.U(),
highThumbAtMaximum:this.v[F]() + this.v.Ka() == this.v.T()
} :{
lowValue:k,
highValue:k,
lowThumbAtMinimum:k,
highThumbAtMaxium:k
};
}), Ka(S, function(a, b) {
b = b || {};
var c = new dp([ b, oq ]), e = qp(b);
e || (e = new $()), e.Ha(this[Sc]()), Hl(e.a(), c.ie($f)), this.Tj(e, a, c);
}), S.Tj = function(a, b, c) {
var e = c.xc(cj), f = c.lj(ui, pq, oq.orientation), g = new $();
a.ia(g, j), Hl(g.a(), Tg), e && (f == zh ? (this.Ac = this.$d(), g.z()[Sa](this.Ac)) :(this.zc = this.$d(), 
g.z()[Sa](this.zc))), this.v = new qq(), a = c.ae(Yh);
var n = c.ae(Th);
(a == k || n == k) && d(r("minValue and maxValue must be specified")), this.v.Ld(a), 
this.v.bd(n), a = 1, n = c.ae(uj), n != k && (n = p.max(2, n), a = p.max((this.v.T() - this.v.U()) / n, 1)), 
this.v.gf(a), this.v.nj(c.Yd(Jj, oq.unitIncrement)), this.v.mj(c.Yd(Cf, oq.blockIncrement)), 
this.v.Xd(f), c = b.lowThumbAtMinimum ? this.v.U() :b.lowValue, b = (b.highThumbAtMaximum ? this.v.T() :b.highValue) - c, 
this.v.Xe(c, b), g.ia(this.v, j), e && (f == zh ? (this.zc = this.$d(), g.z()[Sa](this.zc)) :(this.Ac = this.$d(), 
g.z()[Sa](this.Ac)), this.Fg()), this[Fb](this.v, Tf, this.oj, l, this);
}, S.$d = function() {
return Pl(gj, {
"class":kh
}, Dd);
}, S.Fg = function() {
this.Ac && Wl(this.Ac, s(this.v[F]())), this.zc && Wl(this.zc, s(this.v[F]() + this.v.Ka()));
}, S.oj = function() {
this.Fg(), this.Fb && on[Ya](this.Fb), this.Fb = pn(function() {
this.Fb = k, google[L][x][Ta](this, Fj, k);
}, 200, this);
}, U(qq, eq), qq[J].Jc = k;
var pq = {
om:Sj,
nm:zh
};
S = qq[J], S.l = function(a) {
return a == Sj ? oh :mh;
}, S.Oj = function() {
var a = this.a();
this.Jc = this.Hj(), a[Sa](this.Jc), this.o = this.dh(), a[Sa](this.o), this.fa = this.dh(), 
a[Sa](this.fa);
}, S.C = function() {
qq.b.C[O](this), this.R().d(this, Tf, rk(this.bh, this)), this.bh();
}, S.bh = function() {
var a = new V(this.o[sc], this.o[Xc]), b = new V(this.fa[sc], this.fa[Xc]);
this.F == Sj ? (Qa(this.Jc[M], pm(p.abs(b.y - a.y), j)), this.Jc[M].top = p.min(b.y, a.y) + Ji) :(ka(this.Jc[M], pm(p.abs(b.x - a.x), j)), 
na(this.Jc[M], p.min(b.x, a.x) + Ji));
}, S.dh = function() {
var a = this.n().f(ng, nh);
return Dn(a, Of), a;
}, S.Hj = function() {
var a = this.n().f(ng, lh);
return Dn(a, Of), a;
}, U(rq, mp), Ka(rq[J], function(a) {
this.t = a;
}), Ma(rq[J], function() {
return this.t;
}), sq[J].getUrl = function() {
return this.Ul;
}, sq[J].getColumnId = function(a) {
return this.ug[a].id;
}, sq[J].getColumnType = function(a) {
return this.ug[a][E];
}, sq[J].getNumberOfColumns = function() {
return this.ug[H];
};
var uq = [ "year", Zh, eg, "hour", "minute", Xi ], vq = [ function(a) {
return a[Gc]();
}, function(a) {
return a[bc]() + 1;
}, function(a) {
return a[jb]();
}, function(a) {
return a[Qb]();
}, function(a) {
return a[Vc]();
}, function(a) {
return a[mc]();
} ], wq = "January February March April May June July August September October November December".split(" ");
S = tq[J], S.zd = function() {
var a = this.qb.toJSON(), a = new google[L].ChartWrapper(a), b = a[lb]();
return b != k ? (b = this.vl(b), a[Ac](b)) :(b = this.xl(this.oi), a.setQuery(b)), 
a;
}, S.Fe = function(a) {
var b = this.tc();
return b == this.$h ? l :(b == Zh && a--, this.ea[t](a), j);
}, S.Ge = function() {
return 0 < this.ea[H] ? (this.ea.pop(), j) :l;
}, S.tc = function() {
return uq[this.ea[H]];
}, S.tl = function(a, b) {
for (var c = this.ea, e = a[F](b, 0), f = 0; f < c[H]; f++) {
var g = c[f];
if (uq[f] == Zh && g++, vq[f](e) != g) return l;
}
return j;
}, S.vl = function(a) {
for (var b = this.ea, c = 0; c < a[cc](); c++) this.tl(a, c) || (a.removeRow(c), 
c--);
for (var c = google[L].data.sum || google[L].data.sum, b = vq[b[H]] || function(a) {
return a;
}, e = [], f = 1; f < a[ib](); f++) e[t]({
column:f,
aggregation:c,
type:a[Cb](f),
label:a[Bb](f),
id:a[wc](f)
});
return google[L].data.group(a, [ {
column:0,
modifier:b,
type:mi,
label:a[Bb](0),
id:a[wc](0)
} ], e);
}, S.xl = function(a) {
return a[Cb](0) == cg && (this.$h = eg), [ this.Gl(a), this.Hl(a), this.El(a), this.Fl(a) ][Zc](dd);
}, S.bl = function() {
var a = [];
if (0 < this.ea[H] && a[t](s(this.ea[0])), 1 < this.ea[H]) {
var b = this.ea[1], b = wq[b];
a[t](s(b));
}
if (2 < this.ea[H] && a[t](s(this.ea[2])), 3 < this.ea[H]) {
var b = this.ea[3], c = this.ea[4] || be, c = s(c);
1 == c[H] && (c = ae + c), a[t](b + le + c);
}
return a[Zc](dd);
}, S.Gl = function(a) {
var b = Zi + this.tc() + td + a[wc](0) + wd;
this.tc() == Zh && (b += ed);
for (var c = 1; c < a[ib](); c++) b += Cd + a[wc](c) + wd;
return b;
}, S.Hl = function(a) {
if (0 == this.ea[H]) return Q;
for (var b = [], c = 0; c < this.ea[H]; c++) b[t](uq[c] + td + a[wc](0) + xd + this.ea[c]);
return Uj + b[Zc](fd);
}, S.El = function(a) {
return rh + this.tc() + td + a[wc](0) + wd;
}, S.Fl = function(a) {
return a = ti + this.tc() + td + a[wc](0) + wd, this.tc() == Zh && (a += ed), a;
}, S = xq[J], S.Ta = k, S.qb = k, Ka(S, function(a) {
function b(b) {
b = new tq(a, b), c.Ta = b, c.pg();
}
var c = this;
if (a[lb]()) b(k); else {
var e = a.getDataSourceUrl();
if (e) {
var f = new google[L].Query(e);
f.setQuery(Nh), f.send(function(a) {
if (a.isError()) b(k); else {
var c = [];
a = a[lb]();
for (var f = 0; f < a[ib](); f++) c[t]({
id:a[wc](f),
type:a[Cb](f)
});
b(new sq(e, c));
}
});
} else d(r("Wrapper should hold dataTable or dataSourceUrl"));
}
}), S.Ge = function() {
this.Ta == k || this.qb == k || this.Ta.Ge() && this.pg();
}, S.Fe = function(a) {
return (a = this.Ta.Fe(a)) && this.pg(), a;
}, S.Rk = function() {
var a = this.qb.getChart().getSelection()[0].row, a = this.qb.getSnapshot()[lb]()[F](a, 0);
this.Fe(a);
}, S.Qk = function() {
var a = this.qb, b = a.getOption(sh) || {};
b.title = this.Ta.tc(), a.setOption(sh, b), a.setOption(vj, this.Ta.bl());
}, S.pg = function() {
this.qb && google[L][x].removeAllListeners(this.qb);
var a = this.qb = this.Ta.zd();
this.Qk(), a.setOption(th, j);
var b = rk(this.Rk, this);
google[L][x][uc](a, Yi, b), a[Dc](this.ta);
}, U(yq, lp), S = yq[J], S.Ta = k, S.Xi = function(a, b, c) {
return a = c.targetValue, c.action == sg ? jk(a) && this.kl(a) :this.nl(), this.Ta.zd()[lb]();
}, S.Vc = function() {
return Ae;
}, S.Uc = function(a) {
this.Ta = new tq(new google[L].ChartWrapper({
im:a
}));
}, S.kl = function(a) {
return this.Ta.Fe(a);
}, S.nl = function() {
return this.Ta.Ge();
}, U(zq, mp), zq[J].G = k, Ma(zq[J], function() {
if (!this.G) return {};
var a = this.G ? this.G[kb] :Yj;
try {
a = Po(a);
} catch (b) {}
return a = lk(a) ? a :{};
}), Ka(zq[J], function(a) {
this.G = this.If(a), this[Sc]()[Sa](this.G);
}), zq[J].If = function(a) {
var b = this, c = Pl(Dh);
return c[Gb](Ah, mk(this[Sc]()) + Qd), a && la(c, new Qo(h).Di(a)), this[Fb](c, Df, function() {
google[L][x][Ta](b, Fj, k);
}, l), c;
}, aa("google.visualization.Choreographer", rn), m(rn[J], "bind", rn[J][Ob]), m(rn[J], mg, rn[J].e), 
m(rn[J], Eh, rn[J].A), m(rn[J], qg, rn[J][Dc]), aa("google.visualization.Dashboard", wn), 
m(wn[J], "bind", wn[J][Ob]), m(wn[J], mg, wn[J].e), m(wn[J], Eh, wn[J].A), m(wn[J], qg, wn[J][Dc]), 
aa("google.visualization.Control", jp), m(jp[J], qg, jp[J][Dc]), m(jp[J], Jg, jp[J][Ic]), 
m(jp[J], Qi, jp[J][Fc]), m(jp[J], mg, jp[J].e), m(jp[J], Eh, jp[J].A), aa("google.visualization.Filter", kp), 
m(kp[J], tf, kp[J][Jb]), aa("google.visualization.Operator", lp), m(lp[J], "applyOperator", lp[J].zd), 
aa("google.visualization.ControlUi", mp), m(mp[J], qg, mp[J][Dc]), m(mp[J], Jg, mp[J][Ic]), 
m(mp[J], mg, mp[J].e), m(mp[J], Eh, mp[J].A), aa("google.visualization.StringFilter", Ip), 
m(Ip[J], qg, Ip[J][Dc]), m(Ip[J], tf, Ip[J][Jb]), m(Ip[J], Jg, Ip[J][Ic]), m(Ip[J], Qi, Ip[J][Fc]), 
m(Ip[J], mg, Ip[J].e), m(Ip[J], Eh, Ip[J].A), aa("google.visualization.StringFilterUi", Jp), 
m(Jp[J], qg, Jp[J][Dc]), m(Jp[J], Jg, Jp[J][Ic]), m(Jp[J], mg, Jp[J].e), m(Jp[J], Eh, Jp[J].A), 
aa("google.visualization.NumberRangeFilter", mq), m(mq[J], qg, mq[J][Dc]), m(mq[J], tf, mq[J][Jb]), 
m(mq[J], Jg, mq[J][Ic]), m(mq[J], Qi, mq[J][Fc]), m(mq[J], mg, mq[J].e), m(mq[J], Eh, mq[J].A), 
aa("google.visualization.NumberRangeFilterUi", nq), m(nq[J], qg, nq[J][Dc]), m(nq[J], Jg, nq[J][Ic]), 
m(nq[J], mg, nq[J].e), m(nq[J], Eh, nq[J].A), aa("google.visualization.CategoryFilter", up), 
m(up[J], qg, up[J][Dc]), m(up[J], tf, up[J][Jb]), m(up[J], Jg, up[J][Ic]), m(up[J], Qi, up[J][Fc]), 
m(up[J], mg, up[J].e), m(up[J], Eh, up[J].A), aa("google.visualization.CategoryFilterUi", vp), 
m(vp[J], qg, vp[J][Dc]), m(vp[J], Jg, vp[J][Ic]), m(vp[J], mg, vp[J].e), m(vp[J], Eh, vp[J].A), 
aa("google.visualization.ChartRangeFilter", Fp), m(Fp[J], qg, Fp[J][Dc]), m(Fp[J], tf, Fp[J][Jb]), 
m(Fp[J], Jg, Fp[J][Ic]), m(Fp[J], Qi, Fp[J][Fc]), m(Fp[J], mg, Fp[J].e), m(Fp[J], Eh, Fp[J].A), 
aa("google.visualization.ChartRangeFilterUi", Gp), m(Gp[J], qg, Gp[J][Dc]), m(Gp[J], Jg, Gp[J][Ic]), 
m(Gp[J], mg, Gp[J].e), m(Gp[J], Eh, Gp[J].A), aa("google.visualization.HeadlessUi", rq), 
m(rq[J], qg, rq[J][Dc]), m(rq[J], Jg, rq[J][Ic]), m(rq[J], mg, rq[J].e), m(rq[J], Eh, rq[J].A), 
aa("google.visualization.DrilldownOperator", yq), m(yq[J], qg, yq[J][Dc]), m(yq[J], "applyOperator", yq[J].zd), 
m(yq[J], Jg, yq[J][Ic]), m(yq[J], Qi, yq[J][Fc]), m(yq[J], mg, yq[J].e), m(yq[J], Eh, yq[J].A), 
aa("google.visualization.DrilldownOperatorUi", zq), m(zq[J], qg, zq[J][Dc]), m(zq[J], Jg, zq[J][Ic]), 
m(zq[J], mg, zq[J].e), m(zq[J], Eh, zq[J].A), aa("google.visualization.drawDrilldown", function(a, b, c) {
var e = new xq(a);
cn(c, Xf, function() {
e.Ge();
}), e[Dc](b);
}), aa("google.visualization.RemoteDataSource", sq), m(sq[J], "getUrl", sq[J].getUrl), 
m(sq[J], "getColumnId", sq[J][wc]), m(sq[J], "getColumnType", sq[J][Cb]), m(sq[J], "getNumberOfColumns", sq[J][ib]);
}(), google.loader.loaded({
module:"visualization",
version:"1.1",
components:[ "controls", "default", "format" ]
}), google.loader.eval.visualization = function() {
eval(arguments[0]);
}, google.loader.eval.scripts && google.loader.eval.scripts.visualization && (!function() {
for (var scripts = google.loader.eval.scripts.visualization, i = 0; i < scripts.length; i++) google.loader.eval.visualization(scripts[i]);
}(), google.loader.eval.scripts.visualization = null);
}();