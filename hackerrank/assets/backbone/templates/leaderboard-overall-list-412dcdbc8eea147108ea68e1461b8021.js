HR.appController.addTemplate("backbone/templates/leaderboard-overall-list", function(obj) {
function show_hacker(leader) {
return leader && leader.hacker ? _.escape(leader.hacker).slice(0, 16) + function(l) {
return l.length > 16 ? "..." :"";
}(leader.hacker) :"N/A";
}
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "", __p += '\n\n<div class="row padding-small top bottom ', 
is_current_hacker && (__p += "active-user"), __p += '">\n    <div class="span-flex-2 text-center">\n        <p>' + (null == (__t = leader.rank) ? "" :__t) + '</p>\n    </div>\n    <div class="span-flex-8">\n        <p>\n            <a class="backbone cursor leaderboard-hackername ', 
__p += leader.level ? "rg_" + (null == (__t = leader.level) ? "" :__t) :"table-root", 
__p += '" data-action="hacker-modal" rel="tooltip" data-value="' + (null == (__t = _.escape(leader.hacker)) ? "" :__t) + '" href="/' + (null == (__t = _.escape(leader.hacker)) ? "" :__t) + "\" target=\"_blank\">\n                <img class='avatar' width='30' height='30' src=\"" + (null == (__t = leader.avatar) ? "" :__t) + '" onerror="this.onerror=null; this.src=\'https://d3rpyts3de3lx8.cloudfront.net/hackerrank/assets/gravatar.jpg\';" />\n                ' + (null == (__t = show_hacker(leader)) ? "" :__t) + '\n            </a>\n        </p>\n    </div>\n    <div class="span-flex-3">\n        <p>' + (null == (__t = parseFloat(leader.score).toFixed(2)) ? "" :__t) + '</p>\n    </div>\n    <div class="span-flex-3 text-center">\n        <img class="flag" rel="tooltip" src="/assets/flags/' + (null == (__t = window.countries_mapping[leader.country]) ? "" :__t) + '.png"\n        title="' + (null == (__t = leader.country) ? "" :__t) + '"\n        alt="' + (null == (__t = leader.country) ? "" :__t) + '"\n        onerror="this.onerror=null; this.src=\'/assets/flags/_unknown.png\';">\n    </div>\n</div>\n';
return __p;
});