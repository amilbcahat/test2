HR.appController.addTemplate("backbone/templates/submissions", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "", challenge || (__p += '\n<div class="container--inner">\n'), 
__p += "\n    ", collection.challenge && collection.challenge.get("name") || (__p += '\n    <header class="page-title">\n        <h1>Submissions</h1>\n    </header>\n    '), 
__p += '\n    <section class="submissions">\n        <div class="submissions_list text-center">\n        ', 
__p += 0 != collection.total ? '\n            <div class="table-wrap">\n                <header class="row-clear list-header submissions_list-header">\n                    <div class="span4">\n                      <p class="submissions-title">Problem</p>\n                    </div>\n                    <div class="span2 submissions-language">\n                      <p>Language</p>\n                    </div>\n                    <div class="span2 submissions-time">\n                      <p>Time</p>\n                    </div>\n                    <div class="span3">\n                      <p>Result</p>\n                    </div>\n                    <div class="span1">\n                      <p>Score</p>\n                    </div>\n                    <div class="span2">\n                      <p></p>\n                    </div>\n                </header>\n\n                <div class="table-body submissions-list-wrapper table--striped"></div>\n\n                <div class="pagination-wrap clearfix pagination-wrapper"></div>\n            </div>\n            ' :'\n            <div class="light-wrap padded">\n                <p>You have not made any submissions for ' + (null == (__t = collection.challenge.get("name")) ? "" :_.escape(__t)) + ' yet.</p>\n                <p class="text-center block-margin"><a href="' + (null == (__t = HR.appController.get_current_contest_namespace()) ? "" :__t) + "/challenges/" + (null == (__t = collection.challenge.get("slug")) ? "" :__t) + '" class="btn btn-green btn-large backbone">Solve ' + (null == (__t = collection.challenge.get("name")) ? "" :_.escape(__t)) + "</a></p>\n            </div>\n            ", 
__p += "\n          </div>\n        </div>\n    </section>\n", challenge || (__p += "\n</div>\n"), 
__p += "\n";
return __p;
});