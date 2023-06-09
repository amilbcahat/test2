HR.appController.addTemplate("backbone/templates/recruit/fbresume", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '    <div>\n        <center>\n            <h2 class="headline">' + (null == (__t = test.name) ? "" :_.escape(__t)) + '</h2>\n            <h3 class="msT">' + (null == (__t = data.name) ? "" :_.escape(__t)) + '</h3>\n            <div class="sub-headline">\n                <span class="icon-mail"></span><span class="grey">' + (null == (__t = data.email) ? "" :_.escape(__t)) + "</span>\n                ", 
data.location && (__p += '\n                <span class="mdL icon-location"></span><span class="grey">' + (null == (__t = data.location.name) ? "" :_.escape(__t)) + "</span>\n                "), 
__p += '\n            </div> <!-- .sub-headline -->\n\n        </center>\n        <div class="white-grid-block main-content">\n            <h3 class="msB">PROFILE</h3>\n            <textarea class="fw tall resizex userprofile" placeholder="Enter a brief description about you here."></textarea>\n            <h3 class="mlT msB">PROFESSIONAL EXPERIENCE</h3>\n            ', 
data.work ? (__p += '\n            <div class="table-wrap">\n            <header class="row">\n                <div class="span8">Position</div>\n                <div class="span2">Year</div>\n            </header>\n            <div class="table-body">\n              ', 
_.each(data.work, function(w) {
__p += '\n              <div class="row">\n                <div class="span8">', 
w.position && (__p += "" + (null == (__t = w.position.name) ? "" :_.escape(__t))), 
__p += '\n                <span class="grey">\n                ', w.employer && (__p += " " + (null == (__t = w.employer.name) ? "" :_.escape(__t))), 
__p += "\n                ", w.location && (__p += " (<em>" + (null == (__t = w.location.name) ? "" :_.escape(__t)) + "</em>)"), 
__p += '\n                </span>\n                </div>\n                <div class="span2">', 
w.start_date && (__p += "" + (null == (__t = w.start_date) ? "" :_.escape(__t))), 
__p += "\n                ", w.end_date && (__p += "&mdash;" + (null == (__t = w.end_date) ? "" :_.escape(__t))), 
__p += "\n                </div>\n              </div>\n              ";
}), __p += "\n            </div></div>\n            ") :__p += '\n              <span class="grey"><em>None found.</em></span>\n            ', 
__p += '\n            <div class="soft-divider mjB"></div>\n            <h3 class="mlT msB">EDUCATION</h3>\n            ', 
data.education ? (__p += '\n            <div class="table-wrap">\n            <header class="row">\n                <div class="span8">Class</div>\n                <div class="span2">Year</div>\n            </header>\n            <div class="table-body">\n              ', 
_.each(data.education, function(e) {
__p += '\n              <div class="row">\n                <div class="span8">', 
e.school && (__p += "" + (null == (__t = e.school.name) ? "" :_.escape(__t))), __p += '\n                <span class="grey">\n                ', 
e.type && (__p += " (<em>" + (null == (__t = e.type) ? "" :_.escape(__t)) + "</em>)"), 
__p += '\n                </span>\n                </div>\n                <div class="span2">', 
__p += e.year ? "" + (null == (__t = e.year.name) ? "" :_.escape(__t)) :'<span class="grey">&mdash;</span>', 
__p += "\n                </div>\n              </div>\n              ";
}), __p += "\n            </div></div>\n            ") :__p += '\n              <span class="grey"><em>None found.</em></span>\n            ', 
__p += '\n            <div class="soft-divider mjB"></div>\n            <center>\n            <button class="btn mdB btn-primary btn-large btn-blue starttest"><i class="mdR icon--single icon-facebook"></i>Confirm resume &amp; start test</button>\n            </center>\n        </div>\n\n        <center>\n            <div class="block">\n            <img class="mlT" src="/assets/brand/powered_by_transparent.png" />\n            ', 
test.logged_in && test.attempt_done && (__p += '\n                <p class="text-center txt-alt-grey">\n                    Love Programming challenges? </br>\n                    Find more problems and contests at <strong><a href="https://www.hackerrank.com/" class="txt-alt-grey">www.hackerrank.com</a></strong>\n                </p>\n\n            '), 
__p += '\n            </div>\n        </center>\n\n    </div><!-- end .row -->\n    <div id="fb-root"></div>\n';
return __p;
});