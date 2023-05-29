HR.appController.addTemplate("backbone/templates/x-analytics/common-company-line-data-view", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div id="detailed-results" class="mjT">\n    ', data.from_time && data.to_time && (__p += "\n    <h2>" + (null == (__t = tableHeader) ? "" :__t) + " (" + (null == (__t = data.from_time) ? "" :__t) + " - " + (null == (__t = data.to_time) ? "" :__t) + ') </h2>\n\n    <div class="table-container">\n        <table cellpadding="0" cellspacing="0" border="0" class="line-graph-data-table table dt-sleektable">\n            <thead>\n            <tr>\n                ', 
_.each(data.keys, function(key) {
__p += "\n                    <td>" + (null == (__t = key) ? "" :__t) + "</td>\n                ";
}), __p += "\n            </tr>\n            </thead>\n            <tbody>\n            ", 
_.each(data.table_data, function(entity) {
__p += "\n            <tr>\n                ", _.each(entity, function(value) {
__p += "\n                <td>" + (null == (__t = value) ? "" :__t) + "</td>\n                ";
}), __p += "\n            </tr>\n            ";
}), __p += "\n            </tbody>\n        </table>\n    </div>\n    "), __p += "\n</div>\n";
return __p;
});