(function() {
var handler, options;
$("#selfie-upload").click(function() {
var that, _onSuccess;
return that = this, _onSuccess = function(FPFile) {
return $.ajax({
type:"POST",
url:"/selfie/upload",
data:{
url:FPFile.url
},
success:function() {
var dialog;
return dialog = HR.util.ShowDialog({
title:"Selfie uploaded",
body:"Thanks for uploading your HackerRank selfie. We will review and upload it soon."
}), dialog.render();
}
});
}, filepicker.pick({
mimetypes:[ "image/*" ],
services:[ "COMPUTER", "URL", "WEBCAM", "FACEBOOK", "PICASA", "BOX", "GOOGLE_DRIVE", "DROPBOX" ]
}, _onSuccess);
}), handler = $("#tiles li"), options = {
align:"right",
autoResize:!0,
container:$("#main"),
offset:2
}, $(window).load(function() {
handler = $("#tiles li"), handler.wookmark(options);
}), handler.click(function(e) {
var dialog, tshirt_id, tshirt_li;
tshirt_id = e.currentTarget.id, tshirt_li = $("li#" + tshirt_id), dialog = HR.util.ShowDialog({
title:$(".tagline." + tshirt_id).html(),
body:tshirt_li.data("image")
}), dialog.render();
}), $("img").on("load", function() {
handler.wookmark(options);
});
}).call(this);