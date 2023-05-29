HR.appController.addTemplate("backbone/templates/x/candidate-search", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar">\n    <h3 class="topbar-h3 mjL">Candidates Search</h3>\n</div>\n<div class="overflow-content" id="control-overflow">\n\n    <!-- any contents add here -->\n\n\n    <table class="sleektable full-width question-table-fix" width="100%" border="0" cellpadding="0" cellspacing="0">\n        <tr class="head">\n            <td width="30%">TEST NAME</td>\n            <td width="15%">CANDIDATE NAME</td>\n            <td width="20%">EMAIL ID</td>\n            <td width="8%">SCORE</td>\n            <td width="12%">STATUS</td>\n            <td width="15%" colspan="1"></td>\n        </tr>\n        ', 
h = window.istreet.cfg.ats, collection.models.length > 0 && _.each(collection.models, function(model) {
__p += "\n        ", model = model.toJSON(), __p += "\n        <tr>\n            <td>" + (null == (__t = model.test_name) ? "" :__t) + '</td>\n            <td class="fnt-wt-600">', 
__p += model.name ? " " + (null == (__t = model.name) ? "" :__t) + " " :" N/A ", 
__p += '</td>\n            <td>\n                <a href="tests/' + (null == (__t = model.tid) ? "" :__t) + "/attempts/" + (null == (__t = model.id) ? "" :__t) + '/report" target="_blank">\n                    ' + (null == (__t = model.email) ? "" :__t) + "\n                </a>\n            </td>\n            <td>" + (null == (__t = model.score) ? "" :__t) + "</td>\n            <td>" + (null == (__t = h[model.ats_state]) ? "" :__t) + '</td>\n            <td>\n                <a href="tests/' + (null == (__t = model.tid) ? "" :__t) + "/attempts/" + (null == (__t = model.id) ? "" :__t) + '/report" target="_blank" class="btn">Open Report</a>\n            </td>\n        </tr>\n        ';
}), __p += "\n\n    </table>\n    ", collection.models.length > 0 || (__p += '\n    <div class="mjA">\n        Your search did not find any candidates. Note that you can only search for candidates you invited to take tests.\n    </div>\n    '), 
__p += "\n\n</div><!-- end .overflow-content -->\n";
return __p;
});