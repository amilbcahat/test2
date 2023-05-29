HR.appController.addTemplate("backbone/templates/network-setup", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<h5 class="text-center">Adding networks lets you track your progress against your friends, coworkers, and peers.</h5>\n', 
networks.fb_uid || guest || (__p += '\n<div class="clearfix">\n  <div class="facebook wrap">\n    <a href="/hackers/auth/facebook" class="connect"></a>\n  </div>\n</div>\n<hr>\n'), 
__p += '\n<form action="">\n  <div class="formgroup horizontal clearfix">\n    <label for="input_school" class="pull-left span2">School</label>\n    <div class="block">\n      <input id="input_school" rel="tooltip" data-original-title="Which school did/do you attend?" name="school" type="text" class="span6" value="' + (null == (__t = networks.school) ? "" :__t) + '"/>\n    </div>\n  </div>\n  <div class="formgroup horizontal clearfix">\n    <label for="input_company" class="pull-left span2">Company</label>\n    <div class="block">\n      <input id="input_company" rel="tooltip" data-original-title="Which company do you work for?" name="company" type="text" class="span6" value="' + (null == (__t = networks.company) ? "" :__t) + '"/>\n    </div>\n  </div>\n  <div class="formgroup horizontal clearfix">\n    <label for="input_country" class="pull-left span2">Country</label>\n    <div class="block">\n      <input id="input_country" rel="tooltip" data-original-title="What country do you live in?" name="country" type="text" class="span6" value="' + (null == (__t = networks.country) ? "" :__t) + '"/>\n    </div>\n  </div>\n  <div class="formgroup horizontal clearfix">\n    <!--<button id="networks_show_slide" class = "btn" style="display:none">Perfect! See who\'s here?</button>-->\n    <p id="network-update-error-msg"></p>\n    <div class="block">\n      <button id="networks_update" class = "btn btn-primary">Update</button>\n    </div>\n  </div>\n</form>\n';
return __p;
});