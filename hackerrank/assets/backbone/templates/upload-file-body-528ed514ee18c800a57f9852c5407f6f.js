HR.appController.addTemplate("backbone/templates/upload-file-body", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div style="width: 500px;">\n    <p class="message"></p>\n    Upload file as your submissions\n    <br>\n    <form enctype="multipart/form-data">\n        <input type="file" name="source_file" />\n        <input type="hidden" name="challenge_id" value="' + (null == (__t = data.challenge_id) ? "" :__t) + '" />\n        <input type="hidden" name="level" value="' + (null == (__t = data.level) ? "" :__t) + '" />\n        <input type="hidden" name="contest_id" value="' + (null == (__t = data.contest_id) ? "" :__t) + '" />\n        <input type="hidden" name="language" value="' + (null == (__t = data.parent.header.getLanguage()) ? "" :__t) + '" />\n        <input type="hidden" name="is_file_upload" value="1" />\n    </form>\n</div>\n';
return __p;
});