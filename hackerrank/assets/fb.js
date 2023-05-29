window.fbAsyncInit = function() {
FB.init({
appId:"1417409718517464",
status:!0,
xfbml:!0
});
}, function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
d.getElementById(id) || (js = d.createElement(s), js.id = id, js.src = "//connect.facebook.net/en_US/all.js", 
fjs.parentNode.insertBefore(js, fjs));
}(document, "script", "facebook-jssdk");