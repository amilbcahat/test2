HR.appController.addTemplate("backbone/templates/dashboard/verify-account", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "\n  ", _model.confirmed === !1 && (__p += '\n  <div class="gradient">\n    <div class="message text-center">\n      <p>The email address you signed up with has not been verified. You won\'t be ranked on the leaderboard until you verify your account.</p>\n      ', 
__p += 2 == verification_sent_status ? '\n      <p style="font-size: 13px;" class="action-message">Verification Sent! Check your inbox. (<a class="send-verification cursor">re-send?</a>)</p>\n      ' :1 == verification_sent_status ? '\n      <p style="font-size: 13px;" class="action-message">Sending Verification...</p>\n      ' :'\n      <p style="font-size: 13px;" class="action-message"><a class="send-verification btn btn-white">Re-send the verification email</a></p>\n      ', 
__p += '\n    </div>\n    <div class="close">&times</div>\n  </div>\n  '), __p += "\n";
return __p;
});