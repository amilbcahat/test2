HR.appController.addTemplate("backbone/templates/x/test-tryquestion", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar">\n    <h3 class="topbar-h3 mjL">' + (null == (__t = test.name) ? "" :_.escape(__t)) + '</h3>\n    <h3 class="topbar-h3"><i class="icon-right-open breadcrumb-chevron"></i>Questions</h3>\n    <h3 class="topbar-h3"><i class="icon-right-open breadcrumb-chevron"></i>Try Question</h3>\n</div><!-- end .top-fixed-bar -->\n<div class="overflow-content" id="control-overflow">\n    <div class="alert info js-tryalert hide" style="margin: 10px 30px;">\n        <p class="js-trymsg"></p>\n    </div>\n    <div class="js-questiontext ck_table-wrap" style="margin: 10px 30px;"></div>\n    <div class="js-tryview" style="margin: 10px 30px;"></div>\n    <button class="btn btn-primary margin-20 js-ans-submit bb-compile">Submit</button>\n    <div id="runstatus"></div>\n</div>\n';
return __p;
});