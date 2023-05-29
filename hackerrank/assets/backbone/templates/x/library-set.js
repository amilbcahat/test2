HR.appController.addTemplate("backbone/templates/x/library-set", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="span-xl-16">\n    <div class="question-item-container question-set-style position-relative">\n        <div class="question-set-badge"></div>\n        <table width="100%">\n            <tr>\n                <td width="50%"><strong>' + (null == (__t = set.title) ? "" :_.escape(__t)) + '</strong></td>\n                <td width="25%" class="fnt-sz-small">\n                <span class="fnt-wt-600 txt-alt-grey">QUESTIONS: </span>\n                ', 
_.each(set.typescount, function(count, typ) {
__p += "\n                    <strong>" + (null == (__t = count) ? "" :__t) + " " + (null == (__t = hrqn[typ]) ? "" :__t) + "</strong>\n                ";
}), __p += '\n                </td>\n                <td width="25%" class="fnt-sz-small text-right">\n                    ', 
_.each(set.roles, function(role) {
__p += '\n                    <span class="block-highlight">' + (null == (__t = role) ? "" :__t) + "</span>\n                    ";
}), __p += '\n                </td>\n            </tr>\n        </table>\n        <div class="row no-margin">\n            <div class="span12 no-padding msT">\n                <div class="text-ellipsis mdB">\n                    ' + (null == (__t = set.desc) ? "" :__t) + '\n                </div>\n            </div>\n            <a href="#" class="btn btn-line mlT pull-right js-showset" style="width:140px;" data-set="' + (null == (__t = set.id) ? "" :__t) + '" >View set &nbsp;<i class="icon-right-open"></i></a>\n        </div>\n    </div>\n</div>\n<div class="js-setdetails-wrapper"></div>\n';
return __p;
});