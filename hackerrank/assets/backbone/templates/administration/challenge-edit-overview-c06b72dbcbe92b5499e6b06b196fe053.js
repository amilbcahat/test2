HR.appController.addTemplate("backbone/templates/administration/challenge-edit-overview", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<p class="aside block-margin margin-large">This is the basic information\n    that describes your challenge.</p>\n', 
"create" != action && (__p += '\n  <div class="formgroup horizontal">\n    <label for="translation_language" class="span3">Language</label>\n    <div class="block span8">\n      <input class="pull-left clear-margin" type="text" id="translation_language"  style="width:220px !important;"/>\n      </div>\n  </div>\n'), 
__p += '\n<div class="formgroup horizontal row">\n    <label for="name" class="pull-left span3">Challenge Name</label>\n    <div class="block span12 profile-input">\n        <input id="name" type="text" class="span12 auto-save"/>\n        <small class="error name span12"></small>\n    </div>\n</div>\n\n', 
"create" != action && (__p += '\n<div class="formgroup horizontal row">\n    <label for="slug" class="pull-left span3">Contest Slug</label>\n    <div class="block span12 profile-input pull-left">\n        <p class="host-name pull-left">' + (null == (__t = document.location.protocol + "//" + document.location.host + "/.../") ? "" :__t) + '</p>\n        <p class="slug pull-left">' + (null == (__t = model.get("slug")) ? "" :__t) + '</p>\n        <p class="pull-left"><input type="text" class="edit-slug" style="display: none;" value="' + (null == (__t = model.get("slug")) ? "" :__t) + '" /></p>\n        <p class="pull-left"><a class="btn btn-text update-slug" style="display: none;">update</a></p>\n        <p class="pull-left"><a class="btn btn-text cancel-update-slug" style="display: none;">cancel</a></p>\n        <p class="pull-left"><a class="btn btn-text edit-slug">edit</a></p>\n        <small class="slug error span8"></small>\n    </div>\n</div>\n'), 
__p += '\n\n<div class="formgroup horizontal row">\n    <label for="description" class="pull-left span3">Description</label>\n    <div class="block span12 profile-input pull-left">\n        <textarea rows="6" class="description span12 auto-save"></textarea>\n        <small class="description pull-left sub-help">Characters left: ' + (null == (__t = model.max_limit.description) ? "" :__t) + '</small>\n    </div>\n</div>\n\n<div class="formgroup horizontal row">\n    <label for="description" class="pull-left span3">Problem Statement</label>\n    <div class="block span12 profile-input pull-left">\n        <div class="markdown-editor-header">\n            <p class="pull-left">Markdown Editor</p>\n            <div class="pull-right">\n                <button class="btn btn-small mkd-cheat-sheet msR">Cheatsheet</button>\n            </div>\n        </div>\n        <textarea rows="7" class="problem-statement span12"></textarea>\n        <small class="problem-statement error span12"></small>\n        <div class="preview-wrap clearfix hide">\n            <div class="content-text challenge-text">\n                <h4>Preview</h4>\n                <div class="controls">\n                    <div id="problem-statement-preview" class="preview"></div>\n                </div>\n            </div>\n        <div>\n    </div>\n</div>\n\n', 
"create" != action && (__p += '\n<div class="formgroup horizontal row">\n    <label for="tags" class="pull-left span3">Tags</label>\n    <div class="block span12 profile-input pull-left">\n        <input id="tags" class="tags" type="text" class="span8"/>\n        <small class="error tags span12"></small>\n    </div>\n</div>\n'), 
__p += "\n\n", "create" != action && (__p += '\n<div class="formgroup horizontal row">\n    <label for="moderator" class="pull-left span3">Moderators</label>\n    <div class="block span12 profile-input pull-left">\n        <input id="moderator" type="text" class="span7 float-left left-half no-margin" value=""/><button class="btn moderator-save right-half">Add</button>\n        <small class="moderator pull-left sub-help">Enter moderator\'s HackerRank username. Moderators can edit this challenge.</small>\n    </div>\n</div>\n<div class="formgroup horizontal span12">\n    <div class="offset3 span6 moderators-list pull-left">\n        ', 
0 != model.get("hacker_username") && null != model.get("hacker_username") && (__p += "\n        " + (null == (__t = HR.util.genModContainer({
name:model.get("hacker_username"),
avatar:model.get("hacker_avatar"),
role:"owner"
})) ? "" :__t) + "\n        "), __p += "\n        ", _.each(model.get("moderators"), function(moderator) {
__p += "\n        " + (null == (__t = HR.util.genModContainer({
name:moderator.username,
avatar:moderator.avatar,
role:"moderator",
close:!0
})) ? "" :__t) + "\n        ";
}), __p += "\n    </div>\n</div>\n"), __p += "\n";
return __p;
});