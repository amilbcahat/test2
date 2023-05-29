HR.appController.addTemplate("backbone/templates/x/language-change-alert-modal", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="modal" id="language-change-alert-modal">\n    <div class="modal-header">\n        <button type="button" class="close hidden" data-dismiss="modal" aria-hidden="true">&times;</button>\n        <div class="underline_title">New Languages Added</div>\n    </div>\n    <div class="modal-body">\n    <p>\n        You have enabled new languages (' + (null == (__t = languages.join(", ")) ? "" :__t) + ') but have not regenerated the function stubs.\n        <br/>Please fix this by either deselecting those languages, or generating stubs by clicking on the \n        <br/>\'Generate Code\' link.\n    </p>\n        </div>\n\n    <div class="modal-footer">\n\n        <div class="pull-right">\n            <a href="javascript:void(0)" class="modal-button btn btn-primary" data-dismiss="modal" aria-hidden="true">Okay, I\'ll Fix This</a>\n        </div>\n    </div>\n\n</div>\n';
return __p;
});