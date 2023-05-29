HR.appController.addTemplate("backbone/templates/dashboard/rating-history", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<ul id="rating-tabs" class="unstyled nav nav-tabs">\n    ', 
_.each(model, function(item) {
__p += "\n        <li " + (null == (__t = 1 == item.id ? "class = 'active'" :"") ? "" :__t) + ' ><a href="#tab' + (null == (__t = item.id) ? "" :_.escape(__t)) + '" data-toggle="tab">' + (null == (__t = item.text) ? "" :__t) + "</a></li>\n    ";
}), __p += '\n</ul>\n<div class="tab-content">\n    ', _.each(model, function(item) {
__p += '\n        <div id="tab' + (null == (__t = item.id) ? "" :_.escape(__t)) + '" class="tab-pane' + (null == (__t = 1 == item.id ? " active" :"") ? "" :_.escape(__t)) + '" >\n            <div class="' + (null == (__t = item.id) ? "" :_.escape(__t)) + '-history-chart">\n            </div>\n            ', 
rating[item.text] && (__p += '\n                <div class="rating_info light-wrap">\n                    <p class="profile_group-title">CONTEST PERFORMANCE</p>\n                    <p class="contest_stats">\n                        <span class="alpha contest_stats-name">Participated contests:</span>\n                        <span>' + (null == (__t = item.count) ? "" :__t) + '</span>\n                    </p>\n                    <p class="contest_stats">\n                        <span class="alpha contest_stats-name">Title:</span>\n                        <span>' + (null == (__t = rating[item.text].title) ? "" :__t) + '</span>\n                    </p>\n                    <p class="contest_stats">\n                        <span class="alpha contest_stats-name">Score:</span>\n                        <span>' + (null == (__t = rating[item.text].rating.round()) ? "" :__t) + '</span>\n                    </p>\n                    <p class="contest_stats">\n                        <span class="alpha contest_stats-name">Rank:</span>\n                        <span>' + (null == (__t = rating[item.text].rank) ? "" :__t) + "</span>\n                    </p>\n                </div>\n            "), 
__p += "\n        </div>\n    ";
}), __p += "\n</div>\n";
return __p;
});