(function() {
$(document).ready(function() {
return $(".request-invite-button").click(function(e) {
var email, error, promo_code, that$, username;
return e.preventDefault(), that$ = $(".request-invite-container"), that$.find(".alert").removeClass("error").removeClass("notice").parent(".formgroup").addClass("hide"), 
username = that$.find("input#username").val(), email = that$.find("input#email").val(), 
promo_code = that$.find("input#promo_code").val(), "" === username || "" === email ? (error = "" !== email ? "Username can't be empty" :"" !== username ? "Email can't be empty" :"Email and Username can't be empty", 
that$.find(".alert").addClass("error").removeClass("notice").html(error).parent(".formgroup").removeClass("hide")) :$.ajax({
url:"/rest/request_invite",
type:"POST",
data:{
username:username,
email:email,
promo_code:promo_code
},
success:function(data) {
var add_class, i, len, remove_class, show_error, _i;
if (data.ok ? (add_class = "notice", remove_class = "error") :(add_class = "error", 
remove_class = "notice"), 0 === data.errors.length) show_error = !1; else if (1 === data.errors.length) show_error = !0, 
error = data.errors[0]; else {
for (show_error = !0, error = "<ul>", len = data.errors.length - 1, i = _i = 0; len >= 0 ? len >= _i :_i >= len; i = len >= 0 ? ++_i :--_i) error += "<li>" + data.errors[i] + "</li>";
error += "</ul>";
}
return show_error && !data.ok ? that$.find(".alert").addClass(add_class).removeClass(remove_class).html(error).parent(".formgroup").removeClass("hide") :data.ok ? (add_class = "notice", 
remove_class = "error", that$.find("input#username").val(""), that$.find("input#email").val(""), 
that$.find("input#promo_code").val(""), that$.find(".alert").addClass(add_class).removeClass(remove_class).html(error).parent(".formgroup").removeClass("hide"), 
$(".request-invite-container").hide(), $(".social-share-container").show()) :void 0;
}
});
}), $(".hackergames-invite-message .tweet").click(function(e) {
var text, url;
return e.preventDefault(), text = $(".hackergames-invite-message textarea").val(), 
url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text), window.open(url, "_blank", "height=300,width=600"), 
window.focus();
}), $(".hackergames-invite-message .facebook").click(function(e) {
var text, url;
return e.preventDefault(), text = $(".hackergames-invite-message textarea").val(), 
url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(document.location.protocol + "//" + document.location.host), 
window.open(url, "_blank", "height=300,width=600"), window.focus();
});
});
}).call(this);