HR.appController.addTemplate("backbone/templates/x-analytics/user-signups-data", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div id="detailed-results" class="mjT">\n    ', fromTime && toTime && (__p += "\n    <h2>Users data(" + (null == (__t = fromTime) ? "" :__t) + " - " + (null == (__t = toTime) ? "" :__t) + ')</h2>\n\n    <div class="table-container">\n        <table cellpadding="0" cellspacing="0" border="0" class="trial-data-table table dt-sleektable">\n            <thead>\n            <tr>\n                <td>ID</td>\n                <td>Name</td>\n                <td>Company Name</td>\n                <td>Email</td>\n                <td>Phone</td>\n                <td>Country</td>\n                <td>Creation Time</td>\n            </tr>\n            </thead>\n            <tbody>\n            ', 
_.each(data, function(user) {
__p += '\n            <tr data-company-id="' + (null == (__t = user.id) ? "" :__t) + '">\n                <td>' + (null == (__t = user.id) ? "" :__t) + "</td>\n                <td>" + (null == (__t = user.name) ? "" :__t) + "</td>\n                <td>" + (null == (__t = user.company_name) ? "" :__t) + "</td>\n                <td>" + (null == (__t = user.email) ? "" :__t) + "</td>\n                <td>" + (null == (__t = user.phone) ? "" :__t) + "</td>\n                <td>" + (null == (__t = user.country) ? "" :__t) + "</td>\n                <td>" + (null == (__t = user.created_at) ? "" :__t) + "</td>\n            </tr>\n            ";
}), __p += "\n            </tbody>\n        </table>\n    </div>\n    "), __p += "\n</div>\n";
return __p;
});