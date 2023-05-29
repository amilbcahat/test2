HR.appController.addTemplate("backbone/templates/x-analytics/company-data-usage", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="data-section-title mlT mlB">\n    <h3>Data Usage</h3>\n</div>\n\n<div class="basic-info-container mlL">\n    <div class="mjT">\n        <div class="btn-group">\n            <a href="#" class="btn graph-type-change ', 
"tests_time" == graphType && (__p += " active btn-primary "), __p += '"\n               data-graph-type="tests_time">Tests vs Time</a>\n            <a href="#" class="btn graph-type-change ', 
"invites_time" == graphType && (__p += " active btn-primary "), __p += '"\n               data-graph-type="invites_time">Invites vs Time</a>\n            <a href="#" class="btn graph-type-change ', 
"attempts_time" == graphType && (__p += " active btn-primary "), __p += '"\n               data-graph-type="attempts_time">Attempts vs Time</a>\n            <a href="#" class="btn graph-type-change ', 
"interviews_time" == graphType && (__p += " active btn-primary "), __p += '"\n               data-graph-type="interviews_time">Interviews vs Time</a>\n        </div>\n    </div>\n\n    <div class="section mlT">\n        <div id="data-sub-section-container">\n\n        </div>\n    </div>\n</div>\n';
return __p;
});