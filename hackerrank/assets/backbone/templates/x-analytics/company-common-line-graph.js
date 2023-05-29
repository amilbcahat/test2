HR.appController.addTemplate("backbone/templates/x-analytics/company-common-line-graph", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="section mlT mlB">\n    <div class="section-header">\n        Tests Vs Created On Graph\n    </div>\n\n    <form class="form-horizontal pull-left mlL mlT">\n        <fieldset class="plR">\n            <div class="control-group">\n                <label class="control-label" for="date-range-select">Select Duration:</label>\n\n                <div class="controls">\n                    <div class="input-prepend">\n                        <span class="add-on"><i class="icon-calendar"></i></span><input type="text" name="date-range-select" id="date-range-select" value="' + (null == (__t = startDate + " - " + endDate) ? "" :__t) + '"/>\n                    </div>\n                </div>\n            </div>\n        </fieldset>\n    </form>\n\n    <form class="form-horizontal pull-left mlL mjT">\n        <fieldset class="plL mlT">\n            <div class="control-group mmT">\n                <div class="controls">\n                    <div class="input-prepend">\n                        <span class="add-on"></span>\n                        <select id="aggregation-select">\n                            <option value="hour" ', 
"hour" == aggregation_frame && (__p += " selected "), __p += '>Hour</option>\n                            <option value="day"', 
"day" == aggregation_frame && (__p += " selected "), __p += '>Day</option>\n                            <option value="week"', 
"week" == aggregation_frame && (__p += " selected "), __p += '>Week</option>\n                            <option value="month"', 
"month" == aggregation_frame && (__p += " selected "), __p += '>Month</option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n        </fieldset>\n    </form>\n\n    <div class="graph-container">\n\n    </div>\n\n    <div class="graph-data-view-container">\n\n    </div>\n</div>\n';
return __p;
});