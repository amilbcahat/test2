(function() {
jQuery(function() {
var Btn, HR, ShowConfirmationDialog, ShowDialog, ShowFeatureRequestDialog, ShowFormDialog, ShowLoginDialog, ShowMessageDialog, ShowSubmitDisabledDialog, btn_properties, dialog_properties, _ref;
return btn_properties = {
setActive:function() {
return this.unSetFailedMsg(), this.active = !0, this.$el.removeClass("disabled"), 
this.dialog.$footer().find(".hr-dialog-loader").removeClass("active");
},
setInactive:function() {
return this.active = !1, this.$el.addClass("disabled"), this.dialog.$footer().find(".hr-dialog-loader").addClass("active");
},
isActive:function() {
return !this.$el.hasClass("disabled");
},
success:function(message) {
return null == message && (message = ""), this.setSuccessMsg(message), this.setInactive();
},
done:function() {
return this.setInactive(), this.fadeOut();
},
failed:function(message) {
return null == message && (message = ""), this.setFailedMsg(message), this.setInactive();
},
fadeOut:function() {
return this.dialog.$el().fadeOut("slow"), this.dialog.destroy();
},
setFailedMsg:function(message) {
return this.getMsgWidth(), this.dialog.$footer().find(".hr-dialog-failed-message").html(message);
},
unSetFailedMsg:function() {
return this.dialog.$footer().find(".hr-dialog-failed-message").html("");
},
setSuccessMsg:function(message) {
return this.dialog.$footer().find(".hr-dialog-success-message").html(message).width(this.getMsgWidth());
},
unSetSuccessMsg:function() {
return this.dialog.$footer().find(".hr-dialog-success-message").html("");
},
getMsgWidth:function() {
var btn_width;
return btn_width = 0, this.dialog.$footer().find(".hr-dialog-button").each(function(index, btn) {
return btn_width += $(btn).width() + 40;
}), this.dialog.$footer().find(".hr-dialog-buttons").width() - (btn_width + 15);
}
}, Btn = function(options) {
var default_options, return_value, _error, _prototype;
if (default_options = {}, !_.isObject(options)) throw _error = new Error(), _error.name = "Argument Error", 
_error.message = "Argument to `Btn` can only be an object", _error;
if (options = $.extend(default_options, options), !options.dialog || !options.id) throw _error = new Error(), 
_error.name = "Argument Error", _error.message = options.dialog || options.id ? options.id ? "reference to the `ShowDialog` object is missing" :"id of the button is missing" :"reference to the `ShowDialog` object is missing as well as the id of the button is missing", 
_error;
return options.$el || (options.$el = options.dialog.$el().find("#" + options.id)), 
return_value = {
dialog:options.dialog,
id:options.id,
$el:options.$el
}, _prototype = btn_properties, return_value.prototype || (return_value.prototype = {}), 
$.each(_prototype, function(key, value) {
return return_value[key] = value;
}), return_value;
}, dialog_properties = {
render:function() {
var $dialog, $footer, $footer_buttons, dialog_bg_style, dialog_body, html_title, that;
return this.is_rendered || (that = this, html_title = "<div class='hr-dialog-header'>", 
null !== this.options.title && (html_title += this.options.title), this.options.closebutton === !0 && (html_title += "<a href='' class='close' data-analytics='" + this.options.analytics + "'><i class='icon-cancel-small'></i></a>"), 
html_title += "</div>", dialog_bg_style = this.options.background ? "style='background: " + this.options.background + " !important; position: relative;'" :"", 
dialog_body = "<div id='" + this.id + "' class='hr-dialog'  style='display: none;'> <div class='hr-dialog-border' style='width:" + this.options.width + ("px'> <div class='hr-dialog-main-window' " + dialog_bg_style + ">") + html_title + "<div class='hr-dialog-body'>" + this.options.body + "</div> <div class='hr-dialog-footer'> <div class='hr-dialog-loader'></div> <div class='hr-dialog-success-message'></div><div class='hr-dialog-failed-message'></div> <div class='hr-dialog-buttons'></div><div class='clearfix'></div> </div> </div> </div> </div>", 
$("body").append(dialog_body), $dialog = this.$el(), this.options.body_view && ($dialog.find(".hr-dialog-body").html(""), 
this.options.body_view.setElement($dialog.find(".hr-dialog-body")).render(), this.options.body_view.set_dialog && this.options.body_view.set_dialog(this)), 
this.options.height && ($dialog.find(".hr-dialog-body").css("height", "" + this.options.height + "px"), 
$dialog.find(".hr-dialog-body").css("overflow-y", "scroll"), $dialog.find(".hr-dialog-body").addClass("scroll-box")), 
this.options.error_message && $dialog.find(".glob-error").html(this.options.error_message).show(), 
$dialog.show(), this.renderPosition(), $dialog.find("a.close, .dialog-close").bind("click", function(e) {
return e.preventDefault(), "undefined" != typeof _gag && _gaq.push([ "_trackEvent", "Events", "buttonClick", $(e.srcElement).attr("data-analytics") ]), 
that.destroy();
}), $(document).keyup(function(e) {
return 27 === e.keyCode && this.options.keyboard === !0 ? that.destroy() :void 0;
}), this.options.events && _.isObject(this.options.events) && (that = this, _.each(this.options.events, function(callback, index) {
var ev, eventData, sl, sp;
return sp = index.indexOf(" "), ev = index.substr(0, sp), sl = index.substr(sp + 1), 
eventData = {
$dialog:$dialog,
that:that
}, $dialog.find(sl).bind(ev, eventData, callback);
})), $footer = that.$footer(), $footer_buttons = $footer.find(".hr-dialog-buttons"), 
_.each(this.options.buttons, function(button, index) {
var $btn, analytics_attr, btn, btn_id;
return btn_id = that.id + "-fbtn-" + index, analytics_attr = "", button.analytics && (analytics_attr = "data-analytics='" + button.analytics + "'"), 
$footer_buttons.append("<button " + analytics_attr + " class='btn " + (button["class"] || "hr-dialog-button") + "' id='" + btn_id + "'>" + button.name + "</button>"), 
$btn = $footer_buttons.find("#" + btn_id), btn = Btn({
dialog:that,
id:btn_id,
$el:$btn
}), $btn.bind("click", function(e) {
return e.preventDefault(), btn.setActive(), button.callback.call(btn, that);
});
}), this.options.hide_footer && this.$footer().css("border-top", "none").css("background", "none"), 
this.is_rendered = !0, that.onRender && that.onRender.call()), this;
},
renderPosition:function(dialog) {
var $dialog, options, _dialog_body_height, _dialog_horizontal_padding, _dialog_vertical_padding;
return null == dialog && (dialog = null), dialog || (dialog = this), $dialog = dialog.$el(), 
options = dialog.options, _dialog_horizontal_padding = ($(document).width() - options.width - 10) / 2, 
_dialog_body_height = $dialog.find(".hr-dialog-border").height(), _dialog_vertical_padding = ($dialog.height() - _dialog_body_height - 10) / 2, 
$dialog.css("padding-top", _dialog_vertical_padding + "px"), $dialog.css("padding-bottom", _dialog_vertical_padding + "px"), 
$dialog.css("padding-right", _dialog_horizontal_padding + "px"), $dialog.css("padding-left", _dialog_horizontal_padding + "px");
},
destroy:function() {
var that;
return that = this, $("#" + this.id).animate({
opacity:0
}, 250, function() {
return $(this).remove(), that.options.onDestroy ? that.options.onDestroy.call() :void 0;
}), this;
},
$el:function() {
return $("#" + this.id);
},
$header:function() {
return this.$el().find(".hr-dialog-header");
},
$body:function() {
return this.$el().find(".hr-dialog-body");
},
$footer:function() {
return this.$el().find(".hr-dialog-footer");
},
$main_window:function() {
return this.$el().find(".hr-dialog-main-window");
}
}, ShowDialog = function(options, custom_properties) {
var default_options, generated, hr_dialog_id, return_value, _error, _prototype;
if (null == custom_properties && (custom_properties = {}), hr_dialog_id = "", generated = !1, 
default_options = {
width:450,
title:"",
body:"",
analytics:"Dialog Analytics",
buttons:[],
closebutton:!0,
keyboard:!0
}, _.isObject(options)) options = $.extend(default_options, options); else {
if (void 0 !== options) throw _error = new Error(), _error.name = "Argument Error", 
_error.message = "Argument to `ShowDialog` can only be an object", _error;
options = default_options;
}
for (;!generated; ) hr_dialog_id = "hr-dialog-" + Math.round(1e10 * Math.random()), 
0 === $("#" + hr_dialog_id).length && (generated = !0);
return return_value = {
id:hr_dialog_id,
options:options
}, _prototype = $.extend(dialog_properties, custom_properties), return_value.prototype || (return_value.prototype = {}), 
$.each(_prototype, function(key, value) {
return return_value[key] = value;
}), return_value;
}, ShowFormDialog = function(options) {
var body, default_options, events, field, form_properties, _error, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
if (form_properties = {
$form:function() {
return this.$body().find("form");
},
form_set_notice:function(text) {
var body;
return body = this.$body(), body.find(".alert .error").hide(), body.find(".alert .success").html(text).show();
},
form_set_error:function(text) {
var body;
return body = this.$body(), body.find(".alert .success").hide(), body.find(".alert .error").html(text).show();
},
form_unset_alert:function() {
var body;
return body = this.$body(), body.find(".alert .error").hide(), body.find(".alert .success").hide();
}
}, default_options = {
enctype:"application/x-www-form-urlencoded",
fields:[]
}, _.isObject(options)) options = $.extend(default_options, options); else {
if (void 0 !== options) throw _error = new Error(), _error.name = "Argument Error", 
_error.message = "Argument to `ShowFormDialog` can only be an object", _error;
options = default_options;
}
for (body = options.body ? options.body :"", body += "<p class='alert hide'> <span class='success' style='display: none; color: green;'></span> <span class='error' style='display:none; color: red;'></span> </p> <form enctype='" + options.enctype + "'>", 
_ref = options.fields, _i = 0, _len = _ref.length; _len > _i; _i++) field = _ref[_i], 
"hidden" !== field.type && (body += "<div class='formgroup horizontal'>"), field.title && (body += "<label for='name' class='pull-left span3'>" + field.title + "</label>"), 
body += "<div class='block span7 profile-input'>", "email" === (_ref1 = field.type) || "text" === _ref1 || "hidden" === _ref1 ? body += "<input class='span6' " :"file" === (_ref2 = field.type) ? body += "<div class='wrap_file span6'><input class='orig_file' " :"textarea" === field.type ? body += "<textarea class='span6' style='resize:vertical;' rows='4'" :"select" === (_ref3 = field.type) && (body += "<select "), 
field.name && (body += "name='" + field.name + "' "), field.type && (body += "type='" + field.type + "' "), 
field.value && (body += "value='" + field.value + "' "), field.disabled && (body += "disabled='disabled' "), 
"email" === (_ref4 = field.type) || "text" === _ref4 || "hidden" === _ref4 ? body += " />" :"file" === (_ref5 = field.type) ? body += ' /><div class="fake_file"><div class="fake_file_text span4"></div><div class="fake_file_button btn btn-small">Select File</div></div></div>' :"textarea" === field.type ? (body += ">", 
field.value && (body += value), body += "</textarea>") :"select" === (_ref6 = field.type) && (body += ">", 
field.options && _.each(field.options, function(v, k) {
return body += "<option value='" + k + "'>" + v + "</option>";
}), body += "</select>"), field.hint && (body += "<small class='sub-help'>" + field.hint + "</small><br>"), 
field.error && (body += "<small class='error'></small>"), body += "</div>", "hidden" !== field.type && (body += "</div>");
return body += "</form>", events = {
"click .fake_file_button":function(e) {
var src;
return src = $(e.target), src.parent().parent().find(".orig_file").trigger("click");
},
"change .orig_file":function(e) {
var src;
return src = $(e.target), src.parent().parent().find(".fake_file_text").html(src.val().split("\\").pop());
}
}, options.body = body, options.events = events, new ShowDialog(options, form_properties);
}, ShowLoginDialog = function(options) {
var body, default_options, events, forgot_password_url, form_properties, login_active, login_hide, signup_active, signup_hide, success_callback, _error;
if (form_properties = {}, default_options = {
purpose:"login",
hide_footer:!0,
contest:"",
redirect:!0,
background:"transparent",
title:null
}, _.isObject(options)) options = $.extend(default_options, options); else {
if (void 0 !== options) throw _error = new Error(), _error.name = "Argument Error", 
_error.message = "Argument to `ShowLoginDialog` can only be an object", _error;
options = default_options;
}
return "login" === options.purpose ? (login_active = "active", signup_active = "", 
login_hide = "", signup_hide = "hide") :(signup_active = "active", login_active = "", 
login_hide = "hide", signup_hide = ""), forgot_password_url = HR.CONTEST_SLUG ? "" + document.location.protocol + "//" + document.location.host + "/auth/forgot_password/" + HR.CONTEST_SLUG :"" + document.location.protocol + "//" + document.location.host + "/auth/forgot_password", 
body = "<div class='login-group homepage_admin'> <ul class='login_tab unstyled horizontal clearfix'> <li class='signup-toggle toggle " + signup_active + "'><a href='/signup' data-toggle='tab'>Sign Up</a></li> <li class='login-toggle toggle " + login_active + "'><a href='/login' data-toggle='tab'>Log In</a></li> </ul> <div class='homepage_signup signup " + signup_hide + "' id='signup'> <form id='legacy-signup' class='legacy-form'> <div class='homepage_signupgroup--legacy'> <div class='text-center alert error glob-error' style='display:none;'></div> <div class='formgroup'> <i class='icon-mail'></i> <input id='email' class='fw' type='email' name='email' value='' placeholder='Your Email Address' data-content='' data-toggle='tooltip' data-placement='right'/> </div> <div class='formgroup'> <i class='icon-user'></i> <input id='username' class='fw' type='text' name='username' value='' placeholder='Pick a username' data-content='' data-toggle='tooltip' data-placement='right'/> </div> <div class='formgroup'> <i class='icon-lock'></i> <input id='password' class='fw' type='password' name='password' placeholder='Choose a password' data-content='' data-toggle='tooltip' data-placement='right'/> </div> <button class='btn btn-primary span4 block-center signup-button' name='commit' type='submit' value='request' data-analytics='SignupPassword' type='submit'>Create An Account</button> </div> <div class='homepage_signupgroup--social'> <p class='text-center small msB mlT psT boundT'>Or connect with</p> <div class='unstyled clearfix socialbuttons row text-center' id='social-signup'> <div class='social-btn-wrap span-xs-third'> <a class='btn btn-facebook btn-social' data-analytics='SignupFacebook'><i class='icon-facebook'></i>Facebook</a> </div> <div class='social-btn-wrap span-xs-third'> <a class='btn btn-google btn-social' data-analytics='SignupGoogle'><i class='icon-gplus'></i> Google</a> </div> <div class='social-btn-wrap span-xs-third'> <a class='btn btn-github btn-social' data-analytics='SignupGithub'><i class='icon-github'></i> GitHub</a> </div> </div> </div> </form> </div> <div class='login " + login_hide + "' id='login'> <form id='legacy-login' class='legacy-form'> <div class='homepage_signupgroup--legacy'> <div class='text-center alert error glob-error' style='display:none;'></div> <div class='formgroup'> <i class='icon-user'></i> <input id='login' class='fw' type='text' name='login' value='' placeholder='Your username or email'/> </div> <div class='formgroup'> <i class='icon-lock'></i> <input id='password' class='fw' type='password' name='password' placeholder='Your password' /> </div> <div class='clearfix msB'> <label class='remember pull-left msT'><input type='checkbox' id='remember_me'> Remember me</label> <a target='_blank' href='" + forgot_password_url + "' class='cursor pull-right password-retrieve btn btn-link'>Forgot your password?</a> </div> <button class='btn btn-primary span4 block-center login-button auth' name='commit' type='submit' value='request' data-analytics='LoginPassword' type='submit'>Log In</button> </div> <div class='homepage_signupgroup--social'> <p class='text-center small msB mlT psT boundT'>Or connect with</p> <div class='unstyled clearfix socialbuttons row text-center' id='social-signup'> <div class='social-btn-wrap span-xs-third'> <a class='btn btn-facebook btn-social' data-analytics='SignupFacebook'><i class='icon-facebook'></i>Facebook</a> </div> <div class='social-btn-wrap span-xs-third'> <a class='btn btn-google btn-social' data-analytics='SignupGoogle'><i class='icon-gplus'></i> Google</a> </div> <div class='social-btn-wrap span-xs-third'> <a class='btn btn-github btn-social' data-analytics='SignupGithub'><i class='icon-github'></i> GitHub</a> </div> </div> </div> </form> </div> </div>", 
success_callback = options.success_callback ? options.success_callback :function() {}, 
events = {
"click .login_tab li a":function(e) {
var data, dialog;
return e.preventDefault(), $(e.currentTarget).parent().hasClass("active") ? void 0 :(data = e.data, 
dialog = data.that, dialog.$el().find(".login_tab li a").each(function(index, el) {
return $(el).parent().hasClass("active") ? $(el).parent().removeClass("active") :$(el).parent().addClass("active");
}), dialog.$el().find(".login-group div#signup, .login-group div#login").each(function(index, el) {
return $(el).hasClass("hide") ? $(el).removeClass("hide") :$(el).addClass("hide");
}));
},
"click a.btn-facebook":function(e) {
var data, h, left, top, w;
return e.preventDefault(), data = e.data, w = 600, h = 350, left = screen.width / 2 - w / 2, 
top = screen.height / 2 - h / 2, window.login_callback = function(csrf_token) {
var href;
return $("meta[name=csrf-token]").attr("content", csrf_token), HR.appController ? HR.profile({
fetch:!0
}) :options.redirect && (href = HR.CONTEST_SLUG ? "" + document.location.protocol + "//" + document.location.host + "/auth/login/" + HR.CONTEST_SLUG :"" + document.location.protocol + "//" + document.location.host + "/auth/login", 
document.location.href = href), data.that.destroy(), success_callback();
}, window.open("/hackers/auth/facebook?display=popup", "facebook_login", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);
},
"click a.btn-github":function(e) {
var data, h, left, top, w;
return e.preventDefault(), data = e.data, w = 960, h = 500, left = screen.width / 2 - w / 2, 
top = screen.height / 2 - h / 2, window.login_callback = function(csrf_token) {
var href;
return $("meta[name=csrf-token]").attr("content", csrf_token), HR.appController ? HR.profile({
fetch:!0
}) :options.redirect && (href = HR.CONTEST_SLUG ? "" + document.location.protocol + "//" + document.location.host + "/auth/login/" + HR.CONTEST_SLUG :"" + document.location.protocol + "//" + document.location.host + "/auth/login", 
document.location.href = href), data.that.destroy(), success_callback();
}, window.open("/hackers/auth/github?display=popup", "facebook_login", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);
},
"click a.btn-google":function(e) {
var data, h, left, top, w;
return e.preventDefault(), data = e.data, w = 600, h = 500, left = screen.width / 2 - w / 2, 
top = screen.height / 2 - h / 2, window.login_callback = function(csrf_token) {
var href;
return $("meta[name=csrf-token]").attr("content", csrf_token), HR.appController ? HR.profile({
fetch:!0
}) :options.redirect && (href = HR.CONTEST_SLUG ? "" + document.location.protocol + "//" + document.location.host + "/auth/login/" + HR.CONTEST_SLUG :"" + document.location.protocol + "//" + document.location.host + "/auth/login", 
document.location.href = href), data.that.destroy(), success_callback();
}, window.open("/hackers/auth/google_oauth2?display=popup", "google_login", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);
},
"click button.signup-button":function(e) {
var $form, callback_url, data, dialog;
return e.preventDefault(), "disabled" !== $(e.currentTarget).attr("disabled") ? ($(e.currentTarget).attr("disabled", "disabled"), 
$(e.currentTarget).html("Signing up.."), data = e.data, dialog = data.that, dialog.$body(), 
$form = $(dialog.$body().find(".login-group div#signup")), callback_url = HR.CONTEST_SLUG ? "" + document.location.protocol + "//" + document.location.host + "/auth/signup/" + HR.CONTEST_SLUG :"" + document.location.protocol + "//" + document.location.host + "/auth/signup", 
data = {
username:$form.find("input#username").val(),
email:$form.find("input#email").val(),
password:$form.find("input#password").val()
}, $form.find(".error").html("").hide(), $.ajax({
type:"POST",
url:callback_url,
data:data,
success:function(data) {
var error_html, href;
return $(e.currentTarget).removeAttr("disabled", "disabled"), data.status ? (data.csrf_token && $("meta[name=csrf-token]").attr("content", data.csrf_token), 
$(e.currentTarget).html("Logging you in..."), HR.appController ? (HR.profile({
fetch:!0
}), dialog.destroy()) :options.redirect ? (href = HR.CONTEST_SLUG ? "" + document.location.protocol + "//" + document.location.host + "/auth/login/" + HR.CONTEST_SLUG :"" + document.location.protocol + "//" + document.location.host + "/login", 
document.location.href = href) :dialog.destroy(), success_callback()) :($(e.currentTarget).html("Create An Account"), 
$form.find(".error").html("").show(), data.errors.length > 1 ? (error_html = "<ul>", 
_.each(data.errors, function(error) {
return error_html += "<li>" + error + "</li>";
}, this), error_html += "</ul>", $form.find(".error").html(error_html)) :$form.find(".error").html(data.errors[0]));
}
})) :void 0;
},
"click button.login-button":function(e) {
var $form, callback_url, data, dialog;
return e.preventDefault(), "disabled" !== $(e.currentTarget).attr("disabled") ? ($(e.currentTarget).attr("disabled", "disabled"), 
$(e.currentTarget).html("Logging in.."), data = e.data, dialog = data.that, dialog.$body(), 
$form = $(dialog.$body().find(".login-group div#login")), callback_url = HR.CONTEST_SLUG ? "" + document.location.protocol + "//" + document.location.host + "/auth/login/" + HR.CONTEST_SLUG :"" + document.location.protocol + "//" + document.location.host + "/auth/login", 
data = {
login:$form.find("input#login").val(),
password:$form.find("input#password").val(),
remember_me:$form.find("input#remember_me").is(":checked")
}, $form.find(".error").html("").hide(), $.ajax({
type:"POST",
url:callback_url,
data:data,
success:function(data) {
var error_html, href;
return $(e.currentTarget).removeAttr("disabled", "disabled"), data.status ? (data.csrf_token && $("meta[name=csrf-token]").attr("content", data.csrf_token), 
$(e.currentTarget).html("Logging you in..."), HR.appController ? (HR.profile({
fetch:!0
}), dialog.destroy()) :options.redirect ? (href = HR.CONTEST_SLUG ? "" + document.location.protocol + "//" + document.location.host + "/auth/login/" + HR.CONTEST_SLUG :"" + document.location.protocol + "//" + document.location.host + "/login", 
document.location.href = href) :dialog.destroy(), success_callback()) :($(e.currentTarget).html("Log In"), 
$form.find(".error").html("").show(), data.errors.length > 1 ? (error_html = "<ul>", 
_.each(data.errors, function(error) {
return error_html += "<li>" + error + "</li>";
}, this), error_html += "</ul>", $form.find(".error").html(error_html)) :$form.find(".error").html(data.errors[0]));
}
})) :void 0;
}
}, options.body = body, options.analytics = "Cancel Login", options.events = events, 
options.width = 550, new ShowDialog(options, form_properties);
}, ShowConfirmationDialog = function(options) {
var body, default_options, form_properties, _error;
if (form_properties = {
showError:function(text) {
return this.$body().find(".alert").removeClass("success").addClass("error").html(text).show();
},
clearAlert:function() {
return this.$body().find(".alert").removeClass("success").removeClass("error").html("").hide();
},
showSuccess:function(text) {
return this.$body().find(".alert").addClass("success").removeClass("error").html(text).show();
}
}, default_options = {}, _.isObject(options)) options = $.extend(default_options, options); else {
if (void 0 !== options) throw _error = new Error(), _error.name = "Argument Error", 
_error.message = "Argument to `ShowLoginDialog` can only be an object", _error;
options = default_options;
}
return body = "<p class='alert hide'></p>", options.body = body + options.body, 
new ShowDialog(options, form_properties);
}, ShowFeatureRequestDialog = function() {
var body, default_options, events, form_properties, options;
return form_properties = {}, default_options = {
title:"Request a feature"
}, options = _.isObject(options) ? $.extend(default_options, options) :default_options, 
body = '<form id="legacy-feature" class="show" style="display:block" onsubmit="return(false);"> <div class="formgroup clearfix m"> <div class="alert error" style="display: none;"></div> </div> <div class="formgroup horizontal clearfix"> <label for="name" class="pull-left span2">Name</label> <div class="pull-left span4"> <input id="name" type="text" name="name" value="" placeholder="Name"/> </div> </div> <div class="formgroup horizontal clearfix"> <label for="name" class="pull-left span2">Email</label> <div class="pull-left span4"> <input id="email" type="text" name="email" value="" placeholder="Email"/> </div> </div> <div class="formgroup horizontal clearfix"> <label for="name" class="pull-left span2">Feature</label> <div class="pull-left span4"> <textarea id="feature" type="text" name="feature" value="" placeholder="Feature"></textarea> </div> </div> <div class="text-center"> <button class="featureRequest-button btn btn-green btn-large block-center" style="width:340px;" name="submit" type="submit" data-analytics="FeatureRequest" value="sendrequest">Submit</button> </div> <div style="margin-bottom: 20px;"></div> </form>', 
events = {
"click button.featureRequest-button":function(e) {
var $form, $submit, dialog, form_data;
return e.preventDefault(), dialog = e.data.that, $form = $(dialog.$body().find("form#legacy-feature")), 
$submit = $(e.currentTarget), "disabled" !== $submit.attr("disabled") ? ($submit.attr("disabled", "disabled").html("Sending Your Request"), 
$form.find(".alert.error").hide(), form_data = {
name:$form.find("input#name").val(),
email:$form.find("input#email").val(),
feature:$form.find("textarea#feature").val()
}, $.ajax({
url:"/rest/feature_request",
type:"POST",
data:form_data,
success:function(data) {
var error, i, len, _i;
if ($submit.removeAttr("disabled").html("Submit"), data.status) return dialog.destroy();
if (0 === data.errors.length) error = "Unknown Error"; else if (1 === data.errors.length) error = data.errors[0]; else {
for (error = "<ul style='text-align: left;'>", len = data.errors.length - 1, i = _i = 0; len >= 0 ? len >= _i :_i >= len; i = len >= 0 ? ++_i :--_i) error += "<li>" + data.errors[i] + "</li>";
error += "</ul>";
}
return $form.find(".alert.error").show().html(error);
}
})) :void 0;
}
}, options.body = body, options.analytics = "Cancel Feature Request", options.events = events, 
options.width = 400, new ShowDialog(options, form_properties);
}, ShowSubmitDisabledDialog = function(options) {
var body, default_options, form_properties;
return form_properties = {}, default_options = {
title:"Submission Disabled"
}, options = _.isObject(options) ? $.extend(default_options, options) :default_options, 
body = '<div class="block-center text-center"> This challenge is disabled now.<br/>Please try this challenge after some time. </div>', 
options.body = body, options.width = 400, new ShowDialog(options, form_properties);
}, ShowMessageDialog = function(options) {
var body, default_options, dialog, form_properties;
return form_properties = {}, default_options = {
title:"Message",
username:null,
width:350
}, options = _.isObject(options) ? $.extend(default_options, options) :default_options, 
body = "", null !== options.username ? (options.body = "<div> <p>Send message to <a class='backbone' href='/" + options.username + "'>" + options.username + "</a></p> <textarea id='message' rows='5' cols='28'></textarea> </div>", 
options.getReceiver = function() {
return "username-" + options.username;
}) :(options.body = "<div> <p>Send message to <input type='text' style='width: 170px; margin-left: 20px;' id='receiver_id' /> <textarea id='message' rows='5' cols='28'></textarea> </div>", 
options.getReceiver = function() {
return "username-" + $("#receiver_id").val();
}), options.buttons = [ {
name:"Close",
callback:function(dialog) {
return this.setInactive(), dialog.destroy();
}
}, {
name:"Send",
"class":"hr_primary-btn, btn-green",
callback:function(dialog) {
var btn, username;
return btn = this, btn.unSetFailedMsg(), "" === $("#message").val().trim() ? (btn.failed("Message can not be blank."), 
btn.$el.removeClass("disabled"), void 0) :(btn.setInactive(), btn.$el.text("Sending"), 
username = options.getReceiver(), $.ajax({
url:"/rest/messages",
type:"POST",
data:{
sender_id:HR.profile().id,
receiver_id:"" + options.getReceiver(),
message:$("#message").val()
},
success:function(resp) {
return btn.$el.text("Send"), btn.setActive(), resp.status ? (dialog.destroy(), HR.appView.sidebarView.update(parseInt(resp.model.message_thread_id)), 
HR.router.navigate("/inbox/thread/" + resp.model.message_thread_id, !0)) :(btn.failed(resp.error), 
btn.$el.removeClass("disabled"));
},
error:function() {
return btn.$el.text("Send"), btn.failed("There was a problem sending a message"), 
btn.$el.removeClass("disabled");
}
}));
}
} ], dialog = new ShowFormDialog(options, form_properties), dialog.onRender = function() {
return $("#receiver_id").focus(), $("#receiver_id").unbind(), $("#receiver_id").typeahead({
minLength:3,
menu:'<ul class="typeahead dropdown-menu margin-0" "margin:0px;"></ul>',
source:function() {
return function(process, query) {
return $.ajax({
url:"/rest/hackers/autocomplete?q=" + query + "&without=",
type:"GET",
success:function(resp) {
return process.process(resp);
}
});
};
}(this)
});
}, dialog;
}, HR = null != (_ref = window.HR) ? _ref :{}, HR.util || (HR.util = {}), HR.util.ShowDialog = ShowDialog, 
HR.util.ShowFormDialog = ShowFormDialog, HR.util.ShowLoginDialog = ShowLoginDialog, 
HR.util.ShowConfirmationDialog = ShowConfirmationDialog, HR.util.ShowFeatureRequestDialog = ShowFeatureRequestDialog, 
HR.util.ShowSubmitDisabledDialog = ShowSubmitDisabledDialog, HR.util.ShowMessageDialog = ShowMessageDialog, 
window.HR || (window.HR = HR);
});
}).call(this);