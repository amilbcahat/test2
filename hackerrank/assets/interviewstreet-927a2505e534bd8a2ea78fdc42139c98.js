(function() {
$(document).ready(function() {
var take_me_home;
return take_me_home = function() {
return document.location.href = document.location.protocol + "//" + document.location.host + "/algorithm";
}, $("a.bttn-facebook").click(function(e) {
var data, h, left, top, w;
return e.preventDefault(), data = e.data, w = 600, h = 350, left = screen.width / 2 - w / 2, 
top = screen.height / 2 - h / 2, window.login_callback = function() {
return take_me_home();
}, window.open("/hackers/auth/facebook?display=popup", "facebook_login", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);
}), $("a.bttn-google").click(function(e) {
var data, h, left, top, w;
return e.preventDefault(), data = e.data, w = 600, h = 500, left = screen.width / 2 - w / 2, 
top = screen.height / 2 - h / 2, window.login_callback = function() {
return take_me_home();
}, window.open("/hackers/auth/google_oauth2?display=popup", "google_login", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);
}), $("input.login").click(function(e) {
var form_data;
return e.preventDefault(), $(".alert.error").hide(), form_data = {
login:$("input.username").val(),
password:$("input.password").val(),
remember:$("input.remember_me").is(":checked")
}, $.ajax({
url:"/auth/login",
type:"POST",
data:form_data,
success:function(data) {
var error, i, len, _i;
if (data.status) return take_me_home();
if (0 === data.errors.length) error = "Unknown Error"; else if (1 === data.errors.length) error = data.errors[0]; else {
for (error = "<ul style='text-align: left;'>", len = data.errors.length - 1, i = _i = 0; len >= 0 ? len >= _i :_i >= len; i = len >= 0 ? ++_i :--_i) error += "<li>" + data.errors[i] + "</li>";
error += "</ul>";
}
return $(".alert.error").show().html(error);
}
});
});
});
}).call(this);