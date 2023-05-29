HR.appController.addTemplate("backbone/templates/crop-image", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="slide1">\n  <div class="left_sidebar" style="float: left; width: 485px;">\n    <div class="crop-avatar-wrap">\n      <img src="' + (null == (__t = FPFile.url) ? "" :__t) + '" id="crop-avatar" style="float:left;"/>\n    </div>\n  </div>\n  <div class="right_sidebar" style="float: right; width: 315px;">\n    <div style="width: 170px;margin: auto;padding-bottom: 20px;background: #eee;border: 1px dashed #ddd;margin-top: 10px;">\n      <p style="text-align: center;font-weight: bold;">preview</p>\n      <div style="height: 150px; width: 150px; background: #eee; overflow: hidden; margin: auto;"\n           id="preview_wrap">\n        <img id="preview_image" src="' + (null == (__t = FPFile.url) ? "" :__t) + '" class="hide">\n      </div>\n    </div>\n\n    <div style="text-align: center;margin-top: 10px;" class="mlB">\n      <button id="save-avatar" class="btn btn-primary" style="margin-right: 5px;">Save</button>\n      <button id="cancel-upload" class="btn" style="margin-left: 5px;">Cancel</button>\n    </div>\n  </div>\n  <div class="clearfix"></div>\n</div>\n<div class="slide2 hide">\n  <div class="gray">optimising your avatar for web...</div>\n</div>\n';
return __p;
});