HR.appController.addTemplate("backbone/templates/recruit/candidatemessage", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '    <div>\n        <center>\n            <h2 class="headline">' + (null == (__t = test.name || "Unknown test") ? "" :_.escape(__t)) + '</h2>\n        </center>\n        <div class="white-grid-block main-content">\n            <h3 class="msB">MESSAGE</h3>\n            <div class="alert info mlB">\n                <p>' + (null == (__t = message) ? "" :__t) + "</p>\n            </div>\n            <br>\n            ", 
test.unique_id && (__p += '\n            <a href="' + (null == (__t = test.unique_id) ? "" :__t) + '">Back to main page.</a>\n            '), 
__p += '\n        </div>\n\n        <center>\n            <div class="block">\n            <img class="mlT" src="/assets/brand/powered_by_transparent.png" />\n            ', 
test.logged_in && test.attempt_done && (__p += '\n                <p class="text-center txt-alt-grey">\n                    Love Programming challenges? </br>\n                    Find more problems and contests at <strong><a href="https://www.hackerrank.com/" class="txt-alt-grey">www.hackerrank.com</a></strong>\n                </p>\n\n            '), 
__p += "\n            </div>\n        </center>\n\n    </div><!-- end .row -->\n";
return __p;
});