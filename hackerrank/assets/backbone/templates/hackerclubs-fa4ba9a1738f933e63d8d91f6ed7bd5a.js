HR.appController.addTemplate("backbone/templates/hackerclubs", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<section class="hackerclubs container">\n    <header class="page-title container">\n        <div class="row">\n            <h1 class="span16"><!--<div class="title-img"></div> -->Hacker Clubs ', 
collection.slug_title && (__p += "in " + (null == (__t = collection.slug_title) ? "" :__t)), 
__p += '</h1>\n        </div>\n    </header>\n    <div class="row light-wrap wrap">\n        <ul id="tiles">\n            ', 
_.each(_collection, function(model) {
__p += '\n            <li>\n                <div class="front"><img src="' + (null == (__t = model.tile_image) ? "" :__t) + '" width="300" class="pin"/><p>' + (null == (__t = model.school_name) ? "" :__t) + '</p></div>\n                <div class="back">Number of hackers : ' + (null == (__t = model.hackers_count) ? "" :__t) + "<br/>Campus Ambassador", 
model.ambassadors.length > 1 && (__p += "s"), __p += ": " + (null == (__t = model.ambassadors.join(", ")) ? "" :__t) + "<br/></div>\n            </li>\n            ";
}), __p += "\n        </ul>\n    </div>\n</section>\n";
return __p;
});