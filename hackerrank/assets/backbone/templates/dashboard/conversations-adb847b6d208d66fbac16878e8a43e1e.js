HR.appController.addTemplate("backbone/templates/dashboard/conversations", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="row">\n    <div class="span10 conversation-list pjR">\n        <div class="blog_pagination-wrapper pagination-wrapper"></div>\n    </div>\n    <div class="span6">\n        ', 
hacker.can_write_blog && (__p += '\n            <h6 class="bold msB">Pending for review</h6>\n            <ul class="lg-block mjB pending-review"></ul>\n            <div class=\'new-post\'>\n                <a class="btn btn-green backbone" href="/blog/new">Write a Post!</a>\n            </div>\n        '), 
__p += "\n        <div class='sub-help msT mlR'>\n            This feature is currently open only for <small class='rg_1'>O(1)</small> and <small class='rg_2'>O(logN)</small> hackers. But, we will soon be launching it public.\n        </div>\n    </div>\n</div>\n";
return __p;
});