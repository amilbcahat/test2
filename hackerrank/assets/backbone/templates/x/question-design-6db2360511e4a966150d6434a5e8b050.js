HR.appController.addTemplate("backbone/templates/x/question-design", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += '<div class="top-fixed-bar support-sub-bar">\n    ';
var url_prefix = "";
test ? (__p += '\n    <h3 class="topbar-h3 mjL">' + (null == (__t = test.name) ? "" :_.escape(__t)) + "</h3>\n    ", 
url_prefix = "tests/" + test.id) :url_prefix = "library", __p += '\n    <h3 class="topbar-h3"><i class="icon-right-open breadcrumb-chevron"></i>Questions</h3>\n    <h3 class="topbar-h3"><i class="icon-right-open breadcrumb-chevron"></i>', 
__p += edit ? "Edit" :"Create", __p += ' design question</h3>\n\n\n    <div class="clear"></div>\n    <div class="sub-top-bar">\n        ', 
edit ? (__p += '\n        <ul class="nav-tabs nav">\n            <li ', "step1" == step && (__p += 'class="active"'), 
__p += '><a class="js-backbone" href="' + (null == (__t = url_prefix) ? "" :_.escape(__t)) + "/questions/" + (null == (__t = model.id) ? "" :_.escape(__t)) + '/edit/step1"><i class="icon-bolt"></i> Problem Statement</a></li>\n            <li ', 
"step2" == step && (__p += 'class="active"'), __p += '><a class="js-backbone" href="' + (null == (__t = url_prefix) ? "" :_.escape(__t)) + "/questions/" + (null == (__t = model.id) ? "" :_.escape(__t)) + '/edit/step2"><i class="icon-checkbox-empty"></i> Design Stubs</a></li>\n        </ul>\n        <!-- @akshay add .make-clickable class to the UL below after they cross step 1 -->\n        ') :__p += '\n        <ul class="wizard-steps">\n            <li class="active">\n                <span class="wizard-numb">1</span> PROBLEM STATEMENT\n                <span class="chevron"></span>\n            </li>\n            <li>\n                <span class="wizard-numb">2</span> DESIGN STUBS\n                <span class="chevron"></span>\n            </li>\n        </ul>\n        ', 
__p += '\n\n    </div><!-- end .sub-top-bar -->\n\n</div><!-- end .top-fixed-bar -->\n<div class="overflow-content adjust-two-fixed-bar" id="control-overflow">\n</div>\n<div id="responsive-bottom-placeholder" class="responsive-bottom-holder"></div>\n';
}
return __p;
});