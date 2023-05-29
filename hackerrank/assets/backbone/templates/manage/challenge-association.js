HR.appController.addTemplate("backbone/templates/manage/challenge-association", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "", collection.length > 0 && (__p += '\n<p><strong>Please save changes to each challenge separately.</strong></p>\n<p class="small">All times are in UTC and follow the format YYYY-MM-DD HH:mm (ex: "2014-03-22 18:30")</p>\n'), 
__p += '\n\n<div class="formgroup horizontal padding-large bottom">\n    <label class="span3" for="addnewca">Challenge</label>\n    <div class="span8">\n        <input id="addnewca" class="span4" placeholder="Challenge"></input>\n        <button class="margin-small left btn add-ca-btn">Add</button>\n    </div>\n</div>\n\n', 
collection.length > 0 && (__p += '\n<div class="row">\n    <div class="ca-table table-wrap text-center margin-large bottom">\n        <header class="row-clear">\n            <div class="span3">Name</div>\n            <div class="span2">Weight</div>\n            <div class="span2 margin-large right">Priority</div>\n            <div class="span1">Binary</div>\n            <div class="span2">Dynamic</div>\n            <div class="span2 margin-large right">Timebound</div>\n        </header>\n        <div class="table-body challenges-list-wrapper">\n        </div>\n    </div>\n</div>\n'), 
__p += "\n";
return __p;
});