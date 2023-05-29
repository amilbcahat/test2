HR.appController.addTemplate("backbone/templates/manage/hacker-challenges", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) {
for (__p += '\n  <div class="row block-center">\n    <div class="span11" style="min-height:120px;">\n        <p>\n          <h3>' + (null == (__t = model.name) ? "" :_.escape(__t)) + "</h3>\n          <hr/>\n          " + (null == (__t = model.preview) ? "" :__t) + '\n        </p>\n    </div>\n    <div class="span3 pull-right light-wrap text-center">\n        <h6>Challenge Rank</h3>\n        <h1>' + (null == (__t = model.rank) ? "" :__t) + "</h1>\n        <h5><strong>Score: </strong>" + (null == (__t = Math.round(100 * model.score) / 100) ? "" :__t) + '</h5>\n    </div>\n  </div>\n  <div class="span14 block-center">\n    <ul class="nav nav-tabs">\n      ', 
index = model.submissions.length - 1; index >= 0; index--) __p += "\n        ", 
submission = model.submissions[index], __p += "\n        ", index > model.submissions.length - 11 && (__p += '\n          <li class="' + (null == (__t = 0 == index ? "active" :"") ? "" :__t) + '">\n            <a href="#submission-' + (null == (__t = submission.id) ? "" :__t) + '" data-index="' + (null == (__t = index) ? "" :__t) + '" data-toggle="tab">#' + (null == (__t = index + 1) ? "" :__t) + "</a>\n          </li>\n        "), 
__p += "\n      ";
if (__p += "\n      ", model.submissions.length > 10) {
for (__p += '\n        <li class="dropdown">\n          <a class="dropdown-toggle"\n             data-toggle="dropdown"\n             href="#">\n              More\n              <b class="caret"></b>\n            </a>\n            <ul class="dropdown-menu" style="margin:0px; max-height:200px; overflow:auto; min-width:75px;">\n              ', 
index = model.submissions.length - 1; index >= 0; index--) submission = model.submissions[index], 
__p += "\n                ", index <= model.submissions.length - 11 && (__p += '\n                  <li>\n                    <a href="#submission-' + (null == (__t = submission.id) ? "" :__t) + '" data-index="' + (null == (__t = index) ? "" :__t) + '" data-toggle="tab">#' + (null == (__t = index + 1) ? "" :__t) + "</a>\n                  </li>\n                "), 
__p += "\n              ";
__p += "\n          </ul>\n        </li>\n      ";
}
__p += '\n    </ul>\n    <div class="span14 block-center tab-content" style="border-left: 1px solid #EEE; border-right: 1px solid #DDD; border-bottom: 1px solid #DDD; ">\n      <div class="row block-center" style="background-color:#DDD">\n        <div class="span3" id="language">\n          <strong><h5>PHP</h5></strong>\n        </div>\n        <div class="span4 pull-right" id="time_ago">\n          <h5>    </h5>\n        </div>\n      </div>\n      <textarea id="hacker_code"></textarea>\n    </div>\n  </div>\n';
}
return __p;
});