HR.appController.addTemplate("backbone/templates/x/test-library-sidebar", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += '<div class="stats-head">\n     <strong>Test questions</strong>\n    <a class="pull-right js-closesidebar"><i class="icon2-close txt-navy"></i></a>\n</div>\n\n<ul class="added-quest-list">\n';
var h = window.istreet.cfg.hrqn;
_.each(questions, function(question) {
__p += '\n  <li id="q' + (null == (__t = question.id) ? "" :__t) + '">\n    <strong class="lib-sidebar-questitle">', 
__p += question.name ? "" + (null == (__t = question.name) ? "" :__t) :"" + (null == (__t = h[question.type]) ? "" :__t), 
__p += '</strong>\n    <a class="pull-right btn btn-alert quest-remove-btn js-remove-question" data-qid="' + (null == (__t = question.id) ? "" :__t) + '" data-quid="' + (null == (__t = question.unique_id) ? "" :__t) + '" ><i class="icon2-delete"></i></a>\n    <div class="clear"></div>\n    <span class="txt-navy">' + (null == (__t = question.points) ? "" :__t) + ' points</span>\n    <p class="txt-alt-grey">\n        ' + (null == (__t = question.preview) ? "" :__t) + "\n    </p>\n  </li>\n";
}), __p += "\n</ul>\n";
}
return __p;
});