HR.appController.addTemplate("backbone/templates/secondary-email", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += "";
var confirmed = model.get("confirmed"), primary = model.get("primary");
__p += '\n<span class="plR mlR span5 email-text">' + (null == (__t = model.get("email")) ? "" :__t) + "</span>\n\n", 
__p += confirmed ? '\n    <span class="label label-info">verified</span>\n' :'\n    <a class="btn btn-link cursor settings_email_resend_verification">Resend verification email</a>\n', 
__p += "\n\n", primary && (__p += '\n    <span class="label label-success">primary</span>\n'), 
__p += "\n\n", primary || (__p += "\n    ", __p += confirmed ? '\n        <a class="btn btn-link cursor settings_email_make_primary">Make primary</a>\n    ' :"\n    ", 
__p += '\n    <a class="btn btn-link cursor settings_email_remove">Remove</a>\n'), 
__p += "\n";
}
return __p;
});