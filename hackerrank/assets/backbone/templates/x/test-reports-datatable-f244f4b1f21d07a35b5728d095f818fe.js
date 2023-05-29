HR.appController.addTemplate("backbone/templates/x/test-reports-datatable", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "", invite_mode ? __p += '\n<div class="js-reports-actions pdA" style="display:none;background-color:#f9f9f9;border-top: 1px solid #dadada">Action (on<span class="js-acount"></span>): <a href="javascript:void(0)" class="btn btn-small js-invaction" data-action="cancelmany">Cancel invite</a> <a href="javascript:void(0)" class="btn btn-small js-invaction" data-action="reinvitemany">Reinvite</a></div>\n' :(__p += '\n<div class="js-reports-actions pdA" style="display:none;background-color:#f9f9f9;border-top: 1px solid #dadada">Mark<span class="js-acount"></span>selected as: \n    <a href="javascript:void(0)" class="btn btn-small js-action" data-action="qualify" data-loading="Marking as qualified">Qualified</a> \n    <a href="javascript:void(0)" class="btn btn-small js-action" data-loading="Marking as failed" data-action="fail">Failed</a>\n    <a href="javascript:void(0)" class="btn btn-small js-delete" data-loading="Delete" data-action="delete">Delete</a>\n    <span class="js-section-timeleft pmL" style="display:none">or set sectional test state: <input placeholder=\'Minutes left\' class=\'js-mins-left tinytext\' type=\'text\'> <input placeholder=\'Section\' class=\'tinytext js-candidate-section\' type=\'text\'>\n      <a href="javascript:void(0)" class="btn btn-small js-section-timeleft-action">Set state</a></div>\n    </span>\n', 
hideElements || (__p += '\n    <div class="dropdown" style="display:inline;">\n        &nbsp;\n        <a class="btn btn-small" data-toggle="dropdown" href="#">\n            <span class="js-dropdowntxt">Other status..</span>\n            <i class="icon-down-open-mini msL"></i>\n        </a>\n        <ul class="dropdown-menu" id="menu1">\n            ', 
h = window.istreet.cfg.ats, _.each(_.keys(h), function(ats) {
__p += '\n            <li><a href="javascript:void(0)" class="js-setats" data-action="other" data-attribute-ats="' + (null == (__t = ats) ? "" :__t) + '">' + (null == (__t = h[ats]) ? "" :__t) + "</a></li>\n            ", 
-1 != [ "3", "6", "10", "17" ].indexOf(ats) && (__p += '\n            <li class="divider"></li>\n            '), 
__p += "\n            ";
}), __p += "\n        </ul>\n    </div><!-- end dropdown -->\n"), __p += "\n</div>\n"), 
__p += '\n<table class="table dt-sleektable" id="reports-datatable" cellpadding="0" cellspacing="0" border="0">\n    <thead>\n        <tr>\n            <th>\n                <input class="hr-sleek-input" name="all_checkbox" type="checkbox" id="all_checkbox">\n                <label for="all_checkbox">\n                    <span></span>\n                </label>\n            </th>\n            ', 
invite_mode ? (__p += "\n                <th></th>\n                <th>E-Mail address</th>\n                <th></th>\n                <th>Invite time</th>\n                <th></th>\n                <th></th>\n                <th>Actions</th>\n                ", 
i = 0, showQuesTypes && (i += test.questions_types.length), showTags && (i += test.questions_tags.length), 
_.times(i, function() {
__p += "\n                <th></th>\n                ";
}), __p += "\n            ") :(__p += '\n                <th style="min-width:145px;">Name</th> <!-- <- this is intentional, the word full name is breaking the table -->\n                <th style="min-width:145px;">E-Mail address</th>\n                <th style="min-width:60px;">Score</th>\n                <th style="min-width:145px;">End time</th>\n                <th style="min-width:95px;">Category</th>\n                <th style="min-width:145px;">Time remaining</th>\n                <th>Report</th>\n                ', 
showQuesTypes && _.each(test.questions_types, function(typ) {
__p += "\n                <th>" + (null == (__t = window.istreet.cfg.hrqn[typ] ? window.istreet.cfg.hrqn[typ] :typ) ? "" :__t) + " score</th>\n                ";
}), __p += "\n                ", showTags && _.each(test.questions_tags, function(tag) {
__p += "\n                <th>" + (null == (__t = HR.util.capitalize(tag)) ? "" :__t) + " score</th>\n                ";
}), __p += "\n            "), __p += '\n            <th style="min-width:160px;">Invited by</th>\n        </tr>\n    </thead>\n    <tbody>\n    </tbody>\n</table>\n';
return __p;
});