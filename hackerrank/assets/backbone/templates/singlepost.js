HR.appController.addTemplate("backbone/templates/singlepost", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="content_wrap mid">\n    <div class="blog-sidebar sidebar--inline padded">\n\n        <div class="sidebar_group text-center">\n            <p class="profile_hackerhandle"><a href="/' + (null == (__t = model.owner_username) ? "" :__t) + '"><strong>' + (null == (__t = model.owner_name || model.owner_username) ? "" :__t) + '</strong></a></p>\n            <img src="' + (null == (__t = model.owner_avatar) ? "" :__t) + '" height="100" width="100" class="block-center avatar profile_image margin-large top bottom">\n\n            <p class="blog_share">\n                <strong>Share post:</strong>\n                    <a class="js-blog-tweet twitter" style="cursor:pointer;"><i class="icon-twitter"></i></a>\n                    <a class="js-blog-fb-share facebook" style="cursor:pointer;"><i class="icon-facebook"></i></a>\n            </p>\n            ', 
(current_hacker.is_admin || current_hacker.id == model.owner) && (__p += '\n                <p class="button-wrap mlT mlB"><a class="js-edit-blog backbone btn" href="/oldblog/' + (null == (__t = model.id) ? "" :__t) + '/edit">Edit Post</a></p>\n            '), 
__p += '\n        </div>\n\n        <div class="sidebar_group">\n            <p class="secondary margin-large bottom">This blog is maintained by the HackerRank team, and is intended to be a source of programming guidance and inspiration. If you have an idea for a post, please <a href="mailto:hackers@hackerrank.com">contact us</a>. Happy hacking!</p>\n            <p class="margin-small bottom"><a href="/oldblog" class="btn-link green backbone"><i class="icon-left-open"></i> Blog Index</a></p>\n            <p class="margin-small bottom"><strong>Latest Posts</strong></p>\n            <ul class="unstyled">\n                ', 
_.each(model.recent_posts, function(post) {
__p += '\n                    <li><a href="/oldblog/' + (null == (__t = post.slug) ? "" :__t) + '" class="backbone">' + (null == (__t = post.title) ? "" :__t) + "</a></li>\n                ";
}), __p += '\n            </ul>\n        </div>\n    </div>\n\n    <div class="content--inline padded">\n    ', 
model.draft && (__p += ' <h2 class="text-center">THIS POST IS STILL A DRAFT.</h2> '), 
__p += '\n\n        <h1 class="span13 block-center text-center margin-large bottom"><strong>' + (null == (__t = model.title) ? "" :__t) + '</strong></h1>\n        <p class="text-center meta margin-large bottom">' + (null == (__t = $.format.date(new Date(model.date), "MMM dd yyyy")) ? "" :__t) + '</p>\n        <div class="post-content content-text span13 block-center ">\n            <!--CONTENT FOR STANDARD POST -->\n\n            ' + (null == (__t = model.html_content) ? "" :__t) + '\n\n            <!-- END -->\n\n            <!-- CONTENT FOR QUOTE POST\n\n            <blockquote>\n                <p class="quote-body"><q>Someone who can make a computer do what he wants\u2014whether the computer wants to or not.</q></p>\n                <footer><p class="quote-attribution">Paul Graham</p></footer>\n            </blockquote>\n            <p>"I think I remember some such story as you were telling," said Flask, when at last the two boats were slowly advancing with their burden towards the ship, "but I can\'t remember where."</p>\n\n            END -->\n\n        </div>\n    </div>\n\n    <p class="blog_share blog_share-bottom text-center">\n        <span class="light-wrap meta padded">\n            <strong>Share post:</strong>\n            <a class="js-blog-tweet twitter" style="cursor:pointer;"><i class="icon-twitter"></i></a>\n            <a class="js-blog-fb-share facebook" style="cursor:pointer;"><i class="icon-facebook"></i></a>\n        </span>\n    </p>\n\n</div>\n';
return __p;
});