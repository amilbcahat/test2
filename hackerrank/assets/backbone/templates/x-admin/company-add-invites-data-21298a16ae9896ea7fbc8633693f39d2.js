HR.appController.addTemplate("backbone/templates/x-admin/company-add-invites-data", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="company-data-container">\n    <div class="msL">\n        <div class="container-header mlB bold">\n            Summary\n        </div>\n        <div class="row">\n            <div class="span2 bold">\n                ID\n            </div>\n            <div class="span12 value">\n                ' + (null == (__t = model.id) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        <div class="row">\n            <div class="span2 bold">\n                Name\n            </div>\n            <div class="span12 value">\n                ' + (null == (__t = model.name) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        <div class="row">\n            <div class="span2 bold">\n                Owner\n            </div>\n            <div class="span12 value">\n                ' + (null == (__t = model.owner.firstname) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        <div class="row">\n            <div class="span2 bold">\n                Plan\n            </div>\n            <div class="span12 value">\n                ' + (null == (__t = model.plan_name) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        <div class="row">\n            <div class="span2 bold">\n                Temporary Invites\n            </div>\n            <div class="span12 value">\n                ' + (null == (__t = model.subscription_invites) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        <div class="row">\n            <div class="span2 bold">\n                Permanent invites\n            </div>\n            <div class="span12 value">\n                ' + (null == (__t = model.invites) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n    </div>\n\n    <div class="msT msB">\n        <div class="span2 msT">No. of Invites</div>\n        <input type="text" class="wide" id="invites-count">\n    </div>\n\n    <div class="msT msB">\n        <div class="span2 msT">Type</div>\n        <select class="wide" id="invites-type">\n            <option value="temporary">Temporary Invites</option>\n            <option value="permanent">Permanent Invites</option>\n        </select>\n    </div>\n\n    <div class="row no-margin plT">\n        <div class="span-xs-16 span-md-16">\n            <button type="submit" id="extend-trial" class="btn btn-primary btn-mid">Apply\n            </button>\n        </div>\n    </div>\n</div>\n';
return __p;
});