HR.appController.addTemplate("backbone/templates/dashboard/conversationslist", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "", posts && 0 == posts.length && (__p += "\n    No blog posts yet.\n"), 
__p += "\n", _.each(posts, function(post) {
post = post.toJSON(), __p += '\n<div id="contest-challenges-problem" class="content--list track_content">\n    <div class="content--list_body">\n        <header class="content--list_header row">\n            <h4 class="content--list_title span10">\n                <a href="' + (null == (__t = post.url) ? "" :__t) + '">' + (null == (__t = post.title) ? "" :__t) + '</a>\n            </h4>\n            <div class="kudo-box pull-right">\n                <figure class="kudo kudoable">\n                    <a class="kudo-object hidden">\n                        <div class="kudo-opening">\n                            <div class="kudo-circle">&nbsp;</div>\n                        </div>\n                    </a>\n                    <div class="kudo-meta">\n                        <div class="kudo-meta-alpha kudo-hideonhover">\n                            <span class="kudo-count">' + (null == (__t = post.kudos_count) ? "" :__t) + "</span>\n                            <span class=\"kudo-text\">Kudos</span>\n                        </div>\n                    </div>\n                </figure>\n            </div>\n        </header>\n        <div class='msB bold'>by " + (null == (__t = post.author.slug) ? "" :__t) + ", " + (null == (__t = $.timeago(post.date)) ? "" :__t) + "</div>\n        <div class='excerpt span10 no-padding'>" + (null == (__t = post.excerpt) ? "" :__t) + "</div>\n        <footer class='clearfix'>\n            <a href=\"" + (null == (__t = post.url) ? "" :__t) + '" class="btn btn-green pull-right span3 msT">Continue Reading</a>\n        </footer>\n    </div>\n</div>\n';
}), __p += '\n<div class="pagination-wrap clearfix pagination-wrapper">\n';
return __p;
});