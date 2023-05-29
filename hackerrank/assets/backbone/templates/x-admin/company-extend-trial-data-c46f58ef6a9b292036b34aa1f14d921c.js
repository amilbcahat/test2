HR.appController.addTemplate("backbone/templates/x-admin/company-extend-trial-data", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="company-data-container">\n    <div class="msL">\n        <div class="container-header mlB bold">\n            Summary\n        </div>\n        <div class="row">\n            <div class="span2 bold">\n                ID\n            </div>\n            <div class="span12 value">\n                ' + (null == (__t = model.id) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        <div class="row">\n            <div class="span2 bold">\n                Name\n            </div>\n            <div class="span12 value">\n                ' + (null == (__t = model.name) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        <div class="row">\n            <div class="span2 bold">\n                Owner\n            </div>\n            <div class="span12 value">\n                ' + (null == (__t = model.owner.firstname) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        <div class="row">\n            <div class="span2 bold">\n                Plan\n            </div>\n            <div class="span12 value">\n                ' + (null == (__t = model.plan_name) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        <div class="row">\n            <div class="span2 bold">\n                Locked ?\n            </div>\n            <div class="span12 value">\n                ' + (null == (__t = model.locked) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        ', 
"Trial" == model.plan_name && (__p += '\n        <div class="row">\n            <div class="span2 bold">\n                Trial Expires On\n            </div>\n            <div class="span12 value">\n                ' + (null == (__t = moment(model.payment_date).format("DD/MM/YYYY")) ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        '), 
__p += '\n        <div class="row">\n            <div class="span2 bold">\n                Days left in trial\n            </div>\n            <div class="span12 value">\n                ' + (null == (__t = "Trial" == model.plan_name ? model.days_left :"-") ? "" :__t) + '\n            </div>\n            <div class="clearfix"></div>\n        </div>\n    </div>\n\n    <div class="msT msB">\n        <div class="span2 msT">Set New Expiry Date: </div>\n        <input type="text" class="wide" id="new-payment-date">\n    </div>\n\n    <div class="row no-margin plT">\n        <div class="span-xs-16 span-md-16">\n            <button type="submit" id="extend-trial" class="btn btn-primary btn-mid ', 
"Trial" != model.plan_name && "Free" != model.plan_name && (__p += " disabled "), 
__p += '">Apply\n            </button>\n        </div>\n    </div>\n</div>\n';
return __p;
});