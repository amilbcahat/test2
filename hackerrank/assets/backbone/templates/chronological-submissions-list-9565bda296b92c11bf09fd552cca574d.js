HR.appController.addTemplate("backbone/templates/chronological-submissions-list", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="clearfix row row-btn row-clear submissions_item">\n    <div class="span4 submissions-title">\n        <p><a class="challenge-slug backbone root" href="' + (null == (__t = ns) ? "" :__t) + "challenges/" + (null == (__t = challenge.slug) ? "" :__t) + '">' + (null == (__t = challenge.name) ? "" :__t) + '</a></p>\n    </div>\n    <div class="span2 submissions-language">\n        <p class="small">' + (null == (__t = lang_display_mapping[model.get("language")] || model.get("language")) ? "" :__t) + '</p>\n    </div>\n    <div class="span2 submissions-time">\n        <p class="small">' + (null == (__t = model.get("time_ago")) ? "" :__t) + ' ago</p>\n    </div>\n    <div class="span3">\n        ', 
__p += model.get("status").startsWith("Accepted") ? '\n            <p class="small accepted">\n                ' + (null == (__t = model.get("status")) ? "" :__t) + '\n                <i class="icon-ok"></i>\n            </p>\n        ' :"Compilation error" == model.get("status") ? '\n            <p class="small error"> ' + (null == (__t = model.get("status")) ? "" :__t) + " </p>\n        " :"Queued" == model.get("status") ? '\n            <p class="small queued">\n                ' + (null == (__t = model.get("status")) ? "" :__t) + '\n                <img src="/assets/queued.gif" />\n            </p>\n        ' :"Processed" == model.get("status") || "Processing" == model.get("status") ? '\n            <p class="small"> ' + (null == (__t = model.get("status")) ? "" :__t) + " </p>\n        " :'\n            <p class="small declined">\n                ' + (null == (__t = model.get("status")) ? "" :__t) + '\n                <i class="icon-cancel-large"></i>\n            </p>\n        ', 
__p += '\n    </div>\n    <div class="span1">\n        <p class="small">\n            ', 
__p += "engulf" == model.get("challenge").slug ? "\n                Total score will be revealed after the end of the contest.\n            " :"\n                " + (null == (__t = model.get("score")) ? "" :__t) + "\n            ", 
__p += '\n        </p>\n    </div>\n    <div class="span3 pull-right btn-wrap">\n        <p class="btn-wrap"><a href="' + (null == (__t = model.pageURL()) ? "" :__t) + '" class="btn btn-inverse view-results backbone">View Results</a></p>\n    </div>\n</div>\n';
return __p;
});