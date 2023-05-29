HR.appController.addTemplate("backbone/templates/x/settings-api", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar">\n    <h3 class="topbar-h3 mjL">Settings</h3>\n    <h3 class="topbar-h3"><i class="icon-right-open breadcrumb-chevron"></i>API Access</h3>\n</div>\n<div class="overflow-content" id="control-overflow">\n\n    <form id="settings-api-form" class="mjA">\n        \n        <h3>Registered Clients</h3>\n\n    <table class="sleektable" width="100%" border="0" cellpadding="0" cellspacing="0">\n        <thead>\n        <tr class="prominent txt-alt-grey">\n        <th colspan="5" style="width:100%;" class="font18 font-w-600 font-clr-black">\n                    \n                <a href="#" class="pull-right btn btn-small add-client mdR" >\n                    <i class="icon-plus"></i>&nbsp;Add Client\n                </a>\n            \n            </th>\n        </tr>\n        </thead>\n        \n        <tr class = "head">\n               \n                <td width="15%">\n\n                        Client Name\n\n                </td>\n                <td width="15%">\n\n                        Redirect URI\n\n                </td>\n                <td width="25%">\n\n                        Client ID\n\n                </td>\n                <td width="25%">\n\n                        Client Secret\n\n                </td>\n        </tr>\n\n        ', 
_.each(collection.models, function(model) {
__p += "\n        ", model = model.toJSON(), __p += '\n            <tr>\n               \n                <td width="15%">\n                <div class="text-ellipsis-200px">\n                    ' + (null == (__t = model.name) ? "" :__t) + '\n                </div>    \n                </td>\n\n                <td width="15%">\n                <div class="text-ellipsis-200px">\n                    ' + (null == (__t = model.redirect_uri) ? "" :__t) + '\n                </div>\n                </td>\n\n                <td width="25%">\n                <div class="text-ellipsis-200px">\n                    ' + (null == (__t = model.uid) ? "" :__t) + '\n                    </div>\n                </td>\n\n                <td width="25%">\n                <div class="text-ellipsis-200px">\n                    ' + (null == (__t = model.secret) ? "" :__t) + '\n                </div>        \n                </td>\n\n                <td width="20%" >\n\n                        <a href="#"\n                           data-client-id=\'' + (null == (__t = model.id) ? "" :__t) + '\'\n                           class="btn btn-small pull-right edit-client">Edit Client</a>\n                        <a href="#"\n                           data-client-id=\'' + (null == (__t = model.id) ? "" :__t) + '\'\n                           class="btn btn-alert btn-small pull-right remove-client">Remove Client</a>\n                </td>\n               \n            </tr>\n        ';
}), __p += '\n\n        </table>\n\n    </form>\n    <div class="dialog-wrapper"></div>\n</div>\n';
return __p;
});