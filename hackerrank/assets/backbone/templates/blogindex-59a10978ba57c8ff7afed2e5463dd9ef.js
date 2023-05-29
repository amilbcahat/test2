HR.appController.addTemplate("backbone/templates/blogindex", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="blogindex container">\n    <div class="content_wrap narrow">\n        <div class="sidebar--inline padded">\n            <div class="sidebar_group">\n                <h1><strong>The Array</strong></h1>\n                <p class="secondary margin-large bottom top">This blog is maintained by the HackerRank team, and is intended to be a source of programming guidance and inspiration. If you have an idea for a post, please <a href="mailto:hackers@hackerrank.com">contact us</a>. Happy hacking!</p>\n                ', 
__p += current_hacker.is_admin ? '\n                <p class=\'btn-wrap\'><a href="/oldblog/new/edit" class="backbone btn btn-green"><i class="icon-plus"></i>New post</a></p>\n                ' :'\n                <p class="btn-wrap"><a href="/rest/blogs.rss" class="btn"><i class="icon-rss"></i>Subscribe</a></p>\n                ', 
__p += '\n            </div>\n        </div>\n        <div class="content--inline">\n            ', 
_.isEmpty(collection) && (__p += "\n              There are no articles to share.\n            "), 
__p += "\n\n            ", _.each(collection, function(blog) {
__p += '\n                <div class="padded blogindex_post ' + (null == (__t = blog.template_class) ? "" :__t) + '">\n                    ', 
__p += "blog-standard" === blog.template_class ? '\n                        <h2 class="post_title"><a class="backbone" href="/oldblog/' + (null == (__t = blog.slug) ? "" :__t) + '">' + (null == (__t = blog.title) ? "" :__t) + '</a></h2>\n                        <div class="meta margin-large bottom">\n                            <p><span class="blog_post-date">' + (null == (__t = $.format.date(new Date(blog.date), "MMM dd yyyy")) ? "" :__t) + '</span> by <span class="blog_post-byline"><a href="/' + (null == (__t = blog.owner_username) ? "" :__t) + '"> ' + (null == (__t = blog.owner_name) ? "" :__t) + "</a></span></p>\n                        </div>\n                    " :'\n                        <div class="meta margin-large bottom">\n                            <p class="blog_post-date">' + (null == (__t = $.format.date(new Date(blog.date), "MMM dd yyyy")) ? "" :__t) + "</p>\n                        </div>\n                    ", 
__p += "\n                    " + (null == (__t = blog.preview) ? "" :__t) + "\n                </div>\n            ";
}), __p += '\n\n            <div class="blog_pagination-wrapper pagination-wrapper"></div>\n        </div>\n    </div>\n</div>\n';
return __p;
});