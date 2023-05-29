HR.appController.addTemplate("backbone/templates/dashboard/rating-history", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
__p += "<style>\n.highcharts-yaxis-title {\n    font-weight: 700;\n    font-size: larger;\n}\n.highcharts-yaxis-labels {\n    font-weight: 800;\n    font-size: 6em;\n    color: #0f0f0f;\n}\n\n.highcharts-tooltip text {\n    background: #333;\n    color: 'white';\n    border-radius: 10px;\n}\n</style>\n";
var popover_data = "<div class='formgroup horizontal'><label>Start Date</label><div id='startDatePicker' class='input-append date'><input id='startDateInput' data-format='MM/dd/yyyy' type='text'></input> <span class='add-on'><i data-time-icon='icon-time' data-date-icon='icon-calendar'>   </i>  </span> </div><label>End Date</label><div id='endDatePicker' class='input-append date'><input id='endDateInput' data-format='MM/dd/yyyy' type='text'></input> <span class='add-on'><i data-time-icon='icon-time' data-date-icon='icon-calendar'>   </i>  </span> </div></div><a class='btn btn-line range-set'> Show </a>";
__p += '\n\n<div class=\'msB row\'>\n    <header><h4 class="strong mlB msT">Rank Details</h4></header>\n    <div class="chart span13">\n        <header class="profile_GraphHead clearfix">\n            <select id="track-selector">\n                ', 
_.each(model, function(item) {
__p += '\n                    <option value="' + (null == (__t = item.id) ? "" :_.escape(__t)) + '"> ' + (null == (__t = item.text) ? "" :__t) + "</option>\n                ";
}), __p += '\n            </select>\n            <ul class="small bold inline lines btn-group btn-group--links pull-right">\n                <li><a class="btn btn-link overall-chart">Overall</a></li>\n                <li><a class="btn btn-link last-year-chart">Year</a></li>\n                <!-- <li class="range-popover-container"><a class="btn btn-link range-popover" data-content="' + (null == (__t = popover_data) ? "" :__t) + '" data-placement="bottom"><i class="icon-calendar mmR" ></i>Range<i class="icon-down-open msL"></i></a></li> -->\n            </ul>\n        </header>\n        <div id="rating-graph-tab" class="mlB">\n\n        </div>\n    </div>\n\n\n    <div class="rank-content pull-left bold plL">\n        <div class="mlB">\n            <span class=" color-alt-grey">Rating</span><br>\n            <span id="hacker-title">N/A</span>\n        </div>\n        <div class="mlB">\n            <span class=" color-alt-grey">Rank</span><br>\n            <span id="hacker-rank" class="">N/A</span>\n        </div>\n        <div class="">\n            <span class=" color-alt-grey">Score</span><br>\n            <span id="hacker-rating" class="">N/A</span>\n        </div>\n    </div>\n</div>\n';
}
return __p;
});