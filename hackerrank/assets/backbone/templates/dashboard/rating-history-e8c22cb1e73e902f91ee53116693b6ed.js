HR.appController.addTemplate("backbone/templates/dashboard/rating-history", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += ' <header class="profile_GraphHead clearfix">\n\n    <select id="track-selector">\n        ', 
_.each(model, function(item) {
__p += '\n            <option value="' + (null == (__t = item.id) ? "" :_.escape(__t)) + '"> ' + (null == (__t = item.text) ? "" :__t) + "</option>\n        ";
}), __p += '\n    </select>\n    <ul class="small bold inline lines btn-group btn-group--links pull-right">\n        <li><a class="btn btn-link">Year</a></li>\n        <li><a class="btn btn-link">Month</a></li>\n        <li><a class="btn btn-link"><i class="icon-calendar mmR"></i>Range<i class="icon-down-open icon--right msL"></i></a></li>\n    </ul>\n</header>\n<div class="msB row">\n    <div class="chart span12">\n        <div id="rating-graph-tab">\n\n        </div>\n    </div>\n\n\n    <div class="rank-content span4">\n        <header class="profile_rankHeader"><h4 class="strong mlB msT">Rank Details</h4></header>\n        <div class="mlB">\n            <span class=" color-alt-grey">Level</span><br>\n            <span id="hacker-title" class="color-blue">O(logN)</span>\n        </div>\n        <div class="mlB">\n            <span class=" color-alt-grey">Rank</span><br>\n            <span id="hacker-rank" class="">832</span>\n        </div>\n        <div class="">\n            <span class=" color-alt-grey">Level</span><br>\n            <span id="hacker-rating" class="">12,928</span>\n        </div>\n    </div>\n</div>\n';
return __p;
});