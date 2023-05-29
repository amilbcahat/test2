HR.appController.addTemplate("backbone/templates/x-analytics/companies-dashboard", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar">\n    <h3 class="topbar-h3 mjL">Companies Dashboard</h3>\n    <a href="#" id="toggle-table-type" class="c-dash-button-resize btn ', 
"compact" == tableType && (__p += " active "), __p += '">\n        <i class="', 
__p += "compact" == tableType ? " icon-resize-full " :" icon-resize-small ", __p += '"></i>\n    </a>\n</div>\n<div class="overflow-content" id="control-overflow">\n    <div class="actions-row mjA">\n\n        <div class="msT span4 label-group">\n            <div class="label-text">View Type</div>\n            <div class="custom-select-container">\n                <select id="view-type-change">\n                    <option value="dataUsage" ', 
"dataUsage" == viewType && (__p += " selected"), __p += '>Data Usage</option>\n                    <option value="licenseUsage" ', 
"licenseUsage" == viewType && (__p += " selected "), __p += ' >License Usage</option>\n                </select>\n                <i class="icon-down-open"></i>\n            </div>\n            <div class="clearfix"></div>\n        </div>\n\n\n        <div class="msT span4 label-group">\n            <div class="label-text">Company Type</div>\n            <div class="custom-select-container">\n                <select id="payment-type-change">\n                    <option value="all"\n                            ', 
"all" == companyType && (__p += "\n                            selected\n                            "), 
__p += '\n                            >All\n                    </option>\n                    <option value="paid"\n                            ', 
"paid" == companyType && (__p += "\n                            selected\n                            "), 
__p += '\n                            >Paid\n                    </option>\n                    <option value="active_trials"\n                            ', 
"active_trials" == companyType && (__p += "\n                            selected\n                            "), 
__p += '\n                            >Active Trials\n                    </option>\n                    <option value="expired_trials"\n                            ', 
"expired_trials" == companyType && (__p += "\n                            selected\n                            "), 
__p += '\n                            >Expired Trials\n                    </option>\n                    <option value="locked"\n                            ', 
"locked" == companyType && (__p += "\n                            selected\n                            "), 
__p += '\n                            >Locked\n                    </option>\n                </select>\n                <i class="icon-down-open"></i>\n            </div>\n            <div class="clearfix"></div>\n        </div>\n\n        <div class="msT span4 label-group">\n            <div class="label-text">Duration</div>\n            <div class="custom-select-container">\n                <select id="duration-change">\n                    <option value="daily"\n                            ', 
"daily" == duration && (__p += "\n                            selected\n                            "), 
__p += '\n                            >Today\n                    </option>\n                    <option value="weekly" ', 
"weekly" == duration && (__p += " selected "), __p += ' >Last 7 days</option>\n                    <option value="monthly" ', 
"monthly" == duration && (__p += " selected "), __p += ' >Last 30 days</option>\n                    <option value="quarterly" ', 
"quarterly" == duration && (__p += " selected "), __p += ' >Last 90 days</option>\n                    <option value="custom" ', 
"custom" == duration && (__p += " selected "), __p += ' >Custom</option>\n                </select>\n                <i class="icon-down-open"></i>\n            </div>\n            <div class="clearfix"></div>\n        </div>\n        <div class="clearfix"></div>\n\n        <div class="msT date-range-container parallel ', 
"custom" != duration && (__p += " hidden "), __p += '">\n            <form class="form-horizontal msL mjT">\n                <fieldset class="plR">\n                    <div class="control-group">\n                        <label class="control-label" for="date-range-select">Select Duration:</label>\n\n                        <div class="controls">\n                            <div class="input-prepend">\n                                <span class="add-on"><i class="icon-calendar"></i></span><input type="text" name="date-range-select" id="date-range-select" value="' + (null == (__t = startDate + " - " + endDate) ? "" :__t) + '"/>\n                            </div>\n                        </div>\n                    </div>\n                </fieldset>\n            </form>\n        </div>\n    </div>\n\n    <hr>\n\n\n    <div class="main-content">\n        <table cellpadding="0" cellspacing="0" border="0" class="dash-table hidden table dt-sleektable">\n            ', 
"full" == tableType && (__p += '\n                <col class="small">\n            '), 
__p += '\n\n            <col class="large">\n\n            ', "full" == tableType && (__p += '\n                <col class="jumbo">\n                <col class="large">\n                <col class="small">\n            '), 
__p += '\n\n            <col class="small">\n            <col class="small">\n            <col class="small">\n            <col class="small">\n            <col class="small">\n            <col class="small">\n            <col class="small">\n            <col class="small">\n            ', 
"licenseUsage" == viewType && (__p += '\n                <col class="small">\n                <col class="small">\n            '), 
__p += "\n\n            ", "full" == tableType && (__p += '\n                <col class="mid">\n                <col class="mid">\n            '), 
__p += "\n            <thead>\n            <tr>\n                ", "full" == tableType && (__p += '\n                    <td rowspan="2" colspan="1">ID</td>\n                '), 
__p += '\n                <td rowspan="2" colspan="1">Name</td>\n                ', 
"full" == tableType && (__p += '\n                    <td rowspan="2" colspan="1">Email</td>\n                    <td rowspan="2" colspan="1">Plan</td>\n                    <td rowspan="2" colspan="1">Country</td>\n                '), 
__p += "\n                ", "dataUsage" == viewType && (__p += '\n                    <td rowspan="1" colspan="2" class="taC">Tests</td>\n                    <td rowspan="1" colspan="2" class="taC">Invites</td>\n                    <td rowspan="1" colspan="2" class="taC">Attempts</td>\n                    <td rowspan="1" colspan="2" class="taC">Interviews</td>\n                '), 
__p += "\n                ", "licenseUsage" == viewType && (__p += '\n                    <td rowspan="1" colspan="2" class="taC">Teams</td>\n                    <td rowspan="1" colspan="2" class="taC">Admin</td>\n                    <td rowspan="1" colspan="2" class="taC">Recruiters</td>\n                    <td rowspan="1" colspan="2" class="taC">Developers</td>\n                    <td rowspan="1" colspan="2" class="taC">Users</td>\n                '), 
__p += "\n\n                ", "full" == tableType && (__p += '\n                    <td colspan="1" rowspan="2">Creation Date</td>\n                    <td colspan="1" rowspan="2">Activity Level</td>\n                '), 
__p += '\n            </tr>\n            <tr>\n                <td rowspan="1" colspan="1">Count</td>\n                <td rowspan="1" colspan="1">Growth</td>\n                <td rowspan="1" colspan="1">Count</td>\n                <td rowspan="1" colspan="1">Growth</td>\n                <td rowspan="1" colspan="1">Count</td>\n                <td rowspan="1" colspan="1">Growth</td>\n                <td rowspan="1" colspan="1">Count</td>\n                <td rowspan="1" colspan="1">Growth</td>\n                ', 
"licenseUsage" == viewType && (__p += '\n                    <td rowspan="1" colspan="1">Count</td>\n                    <td rowspan="1" colspan="1">Growth</td>\n                '), 
__p += "\n            </tr>\n\n            </thead>\n            <tbody>\n\n            </tbody>\n        </table>\n    </div>\n</div>\n";
return __p;
});