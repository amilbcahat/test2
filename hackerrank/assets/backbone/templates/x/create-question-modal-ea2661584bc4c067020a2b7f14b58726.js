HR.appController.addTemplate("backbone/templates/x/create-question-modal", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += '<div class="modal modal-mid" id="create-question-modal">\n    <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n        <div class="underline_title">\n            Select a question type\n        </div>\n    </div>\n    ';
var url_prefix = "";
url_prefix = model instanceof HR.LibraryModel.constructor ? "library" :"tests/" + model.get("id"), 
__p += '\n    <form class="attendant-form" name="edit-attendant-form">\n        <div class="modal-body">\n            <center>\n            <ul class="nav nav-pills pill-tabs-hrstyled display-inline-block mdA">\n                <li class="active"><a href="#" data-tab="programming-questions-tab" class="js-create-question-tabs-select">Programming</a></li>\n                <li><a href="#" data-tab="general-questions-tab" class="js-create-question-tabs-select">General</a></li>\n            </ul>\n            </center>\n\n            <table width="100%" class="js-general-questions-tab hidden js-create-question-tabs">\n                <tr>\n                    <td width="50%"><a href="' + (null == (__t = url_prefix) ? "" :__t) + '/questions/new/textAns" data-category="general" class="question-type-blocks js-question-tab">Subjective Answer</a></td>\n                    <td width="50%"><a href="' + (null == (__t = url_prefix) ? "" :__t) + '/questions/new/mcq" data-category="general" class="question-type-blocks js-question-tab">Multiple Choice</a></td>\n                </tr>\n                <tr>\n                    <td width="50%"><a href="' + (null == (__t = url_prefix) ? "" :__t) + '/questions/new/complete" data-category="general" data-type="multiple_mcq" class="question-type-blocks new-question-type js-question-tab">Complete Sentence</a></td>\n                </tr>\n            </table>\n\n            <table width="100%" class="js-programming-questions-tab js-create-question-tabs">\n                <tr>\n                    <td width="50%"><a href="' + (null == (__t = url_prefix) ? "" :__t) + '/questions/new/code" data-category="general" class="question-type-blocks js-question-tab">Programming</a></td>\n                    <td width="50%"><a href="' + (null == (__t = url_prefix) ? "" :__t) + '/questions/new/approx" data-category="general" class="question-type-blocks js-question-tab">Approximate Solution</a></td>\n                </tr>\n            </table>\n        </div><!-- end .modal-body -->\n    </form>\n</div>\n';
}
return __p;
});