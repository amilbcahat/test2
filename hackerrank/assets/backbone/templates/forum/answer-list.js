HR.appController.addTemplate("backbone/templates/forum/answer-list", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="answer-wrap">\n  ', _.each(collection, function(answer) {
__p += '\n    <div class="answer">\n      <header>\n        <div class="clearfix">\n            <a class="cursor hacker-show pull-left" data-action="hacker-modal" data-value="' + (null == (__t = answer.hacker_username) ? "" :__t) + '" ><img src="' + (null == (__t = answer.hacker_avatar) ? "" :__t) + '"  height="50" width="50" class="avatar" onerror="this.onerror=null; this.src=\'https://d3rpyts3de3lx8.cloudfront.net/hackerrank/assets/gravatar.jpg\';"></a>\n            <div class="byline pull-left">\n              <a class="cursor hacker-show hacker-name backbone" data-action="hacker-modal" data-value="' + (null == (__t = answer.hacker_username) ? "" :__t) + '" href="/' + (null == (__t = answer.hacker_username) ? "" :__t) + '" >' + (null == (__t = answer.hacker_username) ? "" :__t) + "</a>", 
answer.hacker_is_admin && (__p += ' <span class="badge badge-info">STAFF</span>'), 
__p += '\n              <small>\n                <span class="timeago" title="' + (null == (__t = answer.created_at) ? "" :__t) + '">' + (null == (__t = answer.time_ago) ? "" :__t) + "</span>\n                <!--&bull;" + (null == (__t = answer.votes) ? "" :__t) + ' votes-->\n                <!--TODO: Load answerers by <a href="">Jessica Simpson</a>, <a href="">Monica Lewinsky</a>, <a href="">Brittany Spears</a> <span clas="expand"><a href="">+</a> more</span> -->\n              </small>\n            </div>\n        </div>\n      </header>\n      <div class="body clearfix break-word">\n          <div>' + (null == (__t = answer.description) ? "" :__t) + "</div>\n      </div>\n      <br>\n    </div>\n  ";
}), __p += "\n</div>\n";
return __p;
});