HR.appController.addTemplate("backbone/templates/administration/challenge-edit-custom-checker", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="msL">\n  <p class="aside block-margin margin-large">Add custom checker program\n    for approximation problems\n  </p>\n\n  <!-- Support Custom Checker -->\n  <div class="formgroup horizontal row">\n    <div class="pull-left span3">\n      <label for="custom">Support Custom Checker</label>\n      <div class="left gray-text">Add custom checker for approximation challenges and codegolf.</div>\n    </div>\n    <div class="block span8 profile-input pull-left">\n      <div class="checkbox-container">\n        <input id="custom" class="hidden-checkbox" type="checkbox"\n               ', 
_model.custom && (__p += 'checked="checked"'), __p += ' />\n      </div>\n      <div class="left gray-text state hide custom"></div>\n      <small class="error name span12"></small>\n    </div>\n  </div>\n\n  <div class="formgroup horizontal row">\n    <div id="codeeditor"></div>\n  </div>\n</div>\n';
return __p;
});