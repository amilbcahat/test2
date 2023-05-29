HR.appController.addTemplate("backbone/templates/x-analytics/revenue-health-data", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="table-container mlT">\n    <div class="table-header bold">\n        Opportunities for\n\n        ', 
"current" == reportType ? (__p += "\n            ", __p += "current" == month ? "\n                " + (null == (__t = moment().format("MMMM, YYYY")) ? "" :__t) + "\n            " :"\n                " + (null == (__t = moment().subtract("month", 1).format("MMMM, YYYY")) ? "" :__t) + "\n            ", 
__p += "\n        ") :__p += "\n            " + (null == (__t = reportDate) ? "" :__t) + "\n        ", 
__p += "\n\n        with type " + (null == (__t = type.replace("_", " ")) ? "" :__t) + '\n    </div>\n    <table cellpadding="0" cellspacing="0" border="0" class="revenue-table table dt-sleektable">\n        <thead>\n        <tr>\n            <td>Account</td>\n            <td>Name</td>\n            <td>Type</td>\n            <td>Owner name</td>\n            <td>Stage</td>\n            <td>Close date</td>\n            <td>Amount</td>\n        </tr>\n        </thead>\n        <tbody>\n        ', 
_.each(data, function(company) {
__p += "\n        <tr>\n            <td>" + (null == (__t = company.account_name) ? "" :__t) + "</td>\n            <td>" + (null == (__t = company.name) ? "" :__t) + "</td>\n            <td>" + (null == (__t = company.type) ? "" :__t) + "</td>\n            <td>" + (null == (__t = company.sales_rep) ? "" :__t) + "</td>\n            <td>" + (null == (__t = company.stage_name) ? "" :__t) + "</td>\n            <td>" + (null == (__t = company.close_date) ? "" :__t) + "</td>\n            <td>$ " + (null == (__t = company.amount) ? "" :__t) + "</td>\n        </tr>\n        ";
}), __p += "\n        </tbody>\n    </table>\n</div>\n";
return __p;
});