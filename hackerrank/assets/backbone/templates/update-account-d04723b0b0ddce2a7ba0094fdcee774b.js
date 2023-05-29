HR.appController.addTemplate("backbone/templates/update-account", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="container">\n  <div class="container--inner">\n    <p>Hi <a href="/' + (null == (__t = _model.username) ? "" :__t) + '">@' + (null == (__t = _model.username) ? "" :__t) + "</a>, we're creating a profile for hackers that'll\n      aggregate information from different sources to present your work to the world.\n      Here's a sample: <a href=\"" + (null == (__t = model.getProfileUrl()) ? "" :__t) + '">' + (null == (__t = model.getProfileUrl()) ? "" :__t) + '</a></p>\n\n    <p>We\'d love to have you participate on, as one of our early users.</p>\n\n    <p><strong>Your information:</strong></p>\n    <p>\n      <img id="avatar" src="' + (null == (__t = _model.avatar) ? "" :__t) + '" width="150" height="150">\n    </p>\n    <p><button class="btn" id="use-webcam">Take a Pic</button>\n      <span>or</span>\n      <button class="btn" id="upload-avatar">Upload</button></p>\n\n    ', 
_.each([ "Your School", "Your Company", "Your Blog URL", "Your Github URL" ], function(label) {
__p += '\n    <div class="formgroup horizontal">\n      <label for="username" class="span3">' + (null == (__t = label) ? "" :__t) + '</label>\n      <div class="block span8">\n        <input id="github" type="text" class="xwide with-help" value="">\n        <div class="sub-help error"></div>\n        <div class="sub-help"></div>\n      </div>\n    </div>\n    ';
}), __p += "\n\n    <br>\n    <p><strong>Set your e-mail preferences</strong><br>(we hate spam & want to ensure we communicate information effectively)</p>\n  </div>\n</div>\n";
return __p;
});