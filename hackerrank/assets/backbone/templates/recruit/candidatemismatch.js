HR.appController.addTemplate("backbone/templates/recruit/candidatemismatch", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '    <div>\n        <center>\n            <h2 class="headline">Login alert!</h2>\n        </center>\n        <div class="white-grid-block main-content">\n            <h3 class="mlB">Logged into another test</h3>\n            <p>It looks like you\'re still not finished taking the test <code>' + (null == (__t = test.name) ? "" :__t) + "</code> and you're now trying to login to: <code>" + (null == (__t = test.other.name) ? "" :__t) + '</code></p>\n            <h4 class="mlT">What would you like to do?</h4>\n            <center>\n                <a class="btn margin-20 backbone" href="' + (null == (__t = test.unique_id) ? "" :__t) + "/questions\">Continue with '" + (null == (__t = test.name) ? "" :__t) + '\'</a><br>\n                <a class="btn margin-10 js-gotoother" href="' + (null == (__t = test.other.unique_id) ? "" :__t) + "/" + (null == (__t = test.other.auth_key) ? "" :__t) + "\">Logout and go to '" + (null == (__t = test.other.name) ? "" :__t) + '\'</a>\n            </center>\n        </div>\n\n        <center>\n            <div class="block">\n            <img class="mlT" src="/assets/brand/powered_by_transparent.png" />\n            ', 
test.logged_in && test.attempt_done && (__p += '\n                <p class="text-center txt-alt-grey">\n                    Love Programming challenges? </br>\n                    Find more problems and contests at <strong><a href="https://www.hackerrank.com/" class="txt-alt-grey">www.hackerrank.com</a></strong>\n                </p>\n\n            '), 
__p += "\n            </div>\n        </center>\n\n    </div><!-- end .row -->\n";
return __p;
});