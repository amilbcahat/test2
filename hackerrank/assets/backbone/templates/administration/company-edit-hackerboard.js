HR.appController.addTemplate("backbone/templates/administration/company-edit-hackerboard", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div id="Administration_hackerboard">\n  <div class="row">\n    <div class="span5 hacker-list">\n      ', 
_.each(_hackerboard, function(leader) {
__p += '\n      <div class="hacker-list-item', hacker_id == leader.hacker_id && (__p += " active"), 
__p += '"\n           data-id="' + (null == (__t = leader.hacker_id) ? "" :__t) + '">\n        ', 
leader.hacker ? (__p += '\n        <img src="' + (null == (__t = leader.hacker.avatar) ? "" :__t) + '" height="40" class="pull-left"\n             onerror="this.onerror=null; this.src=\'https://d3rpyts3de3lx8.cloudfront.net/hackerrank/assets/gravatar.jpg\';">\n        <div class="pull-left hacker-info">\n          <p><strong>\n              ' + (null == (__t = leader.hacker.username) ? "" :__t) + '</strong></p>\n          <small class="gray-text">\n            Rank: ' + (null == (__t = leader.rank) ? "" :__t) + "\n            | Score: " + (null == (__t = leader.score) ? "" :__t) + '\n          </small>\n        </div>\n        <div data-id="' + (null == (__t = leader.hacker_id) ? "" :__t) + '" class="pull-right display-starred ', 
leader.shortlisted || (__p += "hide"), __p += '">\n          <i class="icon-star"></i>\n        </div>\n        <div class="clearfix"></div>\n        ') :__p += "\n        ", 
__p += "\n      </div>\n      ";
}), __p += '\n      <div class="pagination-wrapper"></div>\n    </div>\n    <div class="span11 hacker-details padded">\n      ', 
leader && leader.hacker ? (__p += "\n      <div>\n        <button ", leader.shortlisted && (__p += 'disabled="disabled"'), 
__p += '\n                class="btn btn-primary action-shortlist"\n                data-id="' + (null == (__t = leader.hacker_id) ? "" :__t) + '">Shortlist', 
leader.shortlisted && (__p += "ed"), __p += '</button>\n        <button class="', 
leader.shortlisted || (__p += "hide"), __p += ' btn btn-text action-undo"\n                data-id="' + (null == (__t = leader.hacker_id) ? "" :__t) + '">undo</button>\n      </div>\n      <br>\n      <div class="row">\n        <div class="span2">\n          <img src="' + (null == (__t = leader.hacker.avatar) ? "" :__t) + '" height="75"\n             onerror="this.onerror=null; this.src=\'https://d3rpyts3de3lx8.cloudfront.net/hackerrank/assets/gravatar.jpg\';">\n        </div>\n        <div class="span8">\n          <h4><strong>\n              ', 
__p += leader.hacker.name ? "\n              " + (null == (__t = leader.hacker.name) ? "" :__t) + " (" + (null == (__t = leader.hacker.username) ? "" :__t) + ")\n              " :"\n              " + (null == (__t = leader.hacker.username) ? "" :__t) + "\n              ", 
__p += "\n          </strong></h4>\n          ", leader.hacker.school && (__p += "\n          <p><strong>School:</strong> " + (null == (__t = leader.hacker.school) ? "" :__t) + "</p>\n          "), 
__p += "\n          ", leader.hacker.country && (__p += "\n          <p><strong>Country:</strong> " + (null == (__t = leader.hacker.country) ? "" :__t) + "</p>\n          "), 
__p += "\n        </div>\n      </div>\n        ", leader.hacker.hack && (__p += '\n        <div class="row">\n          <div class="span10">\n            <p><strong>Hack:</strong> ' + (null == (__t = leader.hacker.hack) ? "" :__t) + "</p>\n          </div>\n        </div>\n        "), 
__p += "\n\n        ", leader.hacker.resume_url && (__p += '\n        <div class="row">\n          <div class="span10 right" style="margin-left: 32px; margin-bottom: -14px;">\n            <a target="_blank" href="' + (null == (__t = leader.hacker.resume_url.split("?")[0]) ? "" :__t) + '" style="font-size: 14px;">download here</a>\n          </div>\n        </div>\n        <div class="row">\n          <div class="span10">\n            <div class="resume-iframe">\n              ', 
leader.hacker.resume_url && (__p += '\n              <iframe src="https://docs.google.com/viewer?url=' + (null == (__t = leader.hacker.resume_url) ? "" :__t) + '&embedded=true"\n                      width="600" height="780" style="border: none; margin-left: 1em; margin-top: 20px;"></iframe>\n              '), 
__p += "\n            </div>\n          </div>\n        </div>\n        "), __p += '\n\n        <br>\n        <div class="row">\n          <div class="span10">\n            <h3>Submissions</h3>\n          </div>\n        </div>\n        <div class="row">\n          <div class="span10 submissions-inner"></div>\n        </div>\n      ') :__p += '\n        <div class="gray"><-- please select a profile</div>\n      ', 
__p += "\n    </div>\n  </div>\n</div>\n";
return __p;
});