HR.appController.addTemplate("backbone/templates/nvn-leaderboard", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<section class="leaderboard container">\n  <header class="page-title container">\n    <div class="row">\n      <h1 class="span16"><div class="title-img"></div> ', 
__p += kind ? " " + (null == (__t = kind.toProperCase()) ? "" :__t) :"Networks v/s Networks ", 
__p += ' Leaderboard</h1>\n    </div>\n  </header>\n  <div class="light-wrap table-wrap text-center span16">\n    <div class="table-head row">\n      <div class="span3">\n        <p>Rank <span class="board-filter hide"><a href="" class="top caret-up caret"></a><a href="" class="bottom caret"></a></span> </p>\n      </div>\n      <div class="span6">\n        <p>Name<span class="board-filter hide"><a href="" class="top caret-up caret"></a><a href="" class="bottom caret"></a></span> </p>\n      </div>\n      <div class="span3">\n        <p>Score<span class="board-filter hide"><a href="" class="top caret-up caret"></a><a href="" class="bottom caret"></a></span> </p>\n      </div>\n      <div class="span3">\n        <p>Members<span class="board-filter hide"><a href="" class="top caret-up caret"></a><a href="" class="bottom caret"></a></span> </p>\n      </div>\n    </div>\n    ', 
_.each(leaderboard, function(leader, index) {
__p += '\n    <div class="row', index % 2 == 0 && (__p += " row-alt"), __p += '">\n      <div class="span3">\n        <p>' + (null == (__t = leader.rank) ? "" :__t) + '</p>\n      </div>\n      <div class="span6">\n        <p>' + (null == (__t = leader.name) ? "" :__t) + '</p>\n      </div>\n      <div class="span3">\n        <p>' + (null == (__t = leader.score) ? "" :__t) + '</p>\n      </div>\n      <div class="span3">\n        <p>\n          ' + (null == (__t = leader.members) ? "" :__t) + "\n        </p>\n      </div>\n    </div>\n    ";
}), __p += '\n  </div>\n\n  <div class="pagination-wrap clearfix pagination-wrapper">\n  </div><!--pagination-wrap-->\n</section><!--.leaderboard-->\n';
return __p;
});