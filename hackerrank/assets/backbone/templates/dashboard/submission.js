HR.appController.addTemplate("backbone/templates/dashboard/submission", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="dashboard_submissions-item">\n    <p>\n        <a class="challenge-slug backbone" href="' + (null == (__t = HR.appController.get_current_contest_namespace()) ? "" :__t) + "/challenges/" + (null == (__t = model.challenge.slug) ? "" :__t) + '">\n        ' + (null == (__t = model.challenge.name) ? "" :__t) + '\n        </a>\n    </p>\n    <div class="clearfix dashboard_submissions-meta">\n        <p class="small pull-left">' + (null == (__t = model.time_ago) ? "" :__t) + " ago<!--Submitted in " + (null == (__t = lang_display_mapping[model.language] || model.language) ? "" :__t) + '--></p>\n    <a href="' + (null == (__t = HR.appController.get_current_contest_namespace()) ? "" :__t) + "/submissions/" + (null == (__t = model.kind) ? "" :__t) + "/" + (null == (__t = model.id) ? "" :__t) + '" class="pull-right backbone btn btn-mini">\n        View\n    </a>\n    </div>\n</div>\n\n';
return __p;
});