HR.appController.addTemplate("backbone/templates/hacker-modal", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "<p>Rank: " + (null == (__t = data.rank) ? "" :__t) + "</p>\n", 
hacker.country && (__p += "\n<p>From " + (null == (__t = data.country) ? "" :__t) + "</p>\n"), 
__p += "\n", data.languages && (__p += "\n<p>Codes in " + (null == (__t = data.languages) ? "" :__t) + "</p>\n"), 
__p += "\n", data.hack && (__p += '\n<div class="hack-wrap">\n    <p>' + (null == (__t = data.hack) ? "" :__t) + "</p>\n</div>\n"), 
__p += "\n";
return __p;
});