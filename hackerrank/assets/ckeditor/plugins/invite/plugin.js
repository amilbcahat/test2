CKEDITOR.plugins.add("invite", {
init:function(editor) {
editor.addCommand("invitePreview", {
exec:function() {
$("#preview").trigger("click");
}
}), editor.ui.addButton("Invite", {
label:"Preview Invite",
command:"invitePreview",
icon:this.path + "images/preview.png"
});
}
});