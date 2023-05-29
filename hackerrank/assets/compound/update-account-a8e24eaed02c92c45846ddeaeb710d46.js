(function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var HR, UpdateAccountView, _ref;
return UpdateAccountView = function(_super) {
function UpdateAccountView() {
return UpdateAccountView.__super__.constructor.apply(this, arguments);
}
return __extends(UpdateAccountView, _super), UpdateAccountView.prototype.template = "update-account", 
UpdateAccountView.prototype.className = "update-account-view", UpdateAccountView.prototype.events = {
"click button#use-webcam":"useWebcam",
"click button#upload-avatar":"uploadAvatar"
}, UpdateAccountView.prototype.initialize = function(options) {
return null == options && (options = {}), this.hacker = HR.profile(), this.listenTo(this.hacker, "reset", this.render), 
this.listenTo(this.hacker, "change", this.render), this.listenTo(this.hacker, "sync", this.render);
}, UpdateAccountView.prototype.render = function() {
return this.model.sync_status ? ($(this.el).html(HR.appController.template(this.template, this)({
model:this.model,
_model:this.model.toJSON()
})), this) :this;
}, UpdateAccountView.prototype.useWebcam = function() {
return this.getAvatar({
services:[ "WEBCAM" ],
openTo:"WEBCAM"
});
}, UpdateAccountView.prototype.uploadAvatar = function() {
return this.getAvatar({
services:[ "COMPUTER", "URL", "FACEBOOK", "PICASA", "BOX", "GOOGLE_DRIVE", "DROPBOX" ]
});
}, UpdateAccountView.prototype.getAvatar = function(_options) {
var default_options, options, that, _onSuccess;
return null == _options && (_options = {}), that = this, _onSuccess = function(FPFile) {
var view;
return view = new HR.CropImageView({
FPFile:FPFile,
parent:that,
hacker:that.hacker
}), view.render();
}, default_options = {
mimetypes:[ "image/*" ]
}, options = $.extend(default_options, _options), filepicker.pick(options, _onSuccess);
}, UpdateAccountView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.UpdateAccountView = UpdateAccountView;
});
}).call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var CropImageView, HR, _ref;
return CropImageView = function(_super) {
function CropImageView() {
return CropImageView.__super__.constructor.apply(this, arguments);
}
return __extends(CropImageView, _super), CropImageView.prototype.template = "crop-image", 
CropImageView.prototype.className = "crop-image-body", CropImageView.prototype.events = {
"onload img":"reposition",
"click button#save-avatar":"saveAvatar",
"click button#cancel-upload":"cancelUpload"
}, CropImageView.prototype.initialize = function(options) {
var that;
return this.FPFile = options.FPFile, this.parent = options.parent, this.hacker = options.hacker, 
this.key = this.FPFile.key.split(".").join("_"), this.sel = "body div#crop-image-" + this.key, 
that = this, this.ready_to_render = !1, $.ajax({
url:"" + this.FPFile.url + "/metadata?width=true&height=true",
success:function(data) {
return that.width = data.width, that.height = data.height, that.ready_to_render = !0, 
that.preProcess();
}
});
}, CropImageView.prototype.reposition = function() {
var left_offset, that;
return left_offset = $("body").width() / 2 - $(this.sel).width() / 2, $(this.sel).css("left", left_offset), 
$(this.sel).css("opacity", 1), that = this, this.ready_to_render ? this.$("#crop-avatar").Jcrop({
aspectRatio:1,
setSelect:[ this.initial_ypadding, this.initial_xpadding, this.max_dimension, this.max_dimension ],
onSelect:function(cords) {
return that.renderPreview(cords);
},
onChange:function(cords) {
return that.renderPreview(cords);
},
onRelease:function(cords) {
return that.renderPreview(cords);
}
}) :void 0;
}, CropImageView.prototype.render = function() {
return console.log("render"), 0 === $("#crop_image_shade").length ? $("body").append("<div id='crop_image_shade' style='position: fixed; top: 0px; bottom: 0px; right: 0px; left: 0px; opacity: 0.5; z-index: 10000; background-color: rgb(0, 0, 0);'></div>") :$("#crop_image_shade").show(), 
0 === $(this.sel).length && $("body").append("<div id='crop-image-" + this.key + "' class='crop-image-wrapper'><div class='gray'>Loading...</div></div>"), 
this.reposition(), this.ready_to_render && this.resizePrompt(), this;
}, CropImageView.prototype.destroy = function() {
return CropImageView.__super__.destroy.call(this), $(this.sel).die().unbind().remove(), 
$("#crop_image_shade").hide();
}, CropImageView.prototype.preProcess = function() {
return this.scale_ratio = 1, this.width > 480 ? this.scale_ratio = this.width / 480 :this.width < 150 && (this.scale_ratio = this.width / 150), 
1 !== this.scale_ratio ? (this.fin_width = 1 * this.width / this.scale_ratio, this.fin_height = 1 * this.height / this.scale_ratio) :(this.fin_width = this.width, 
this.fin_height = this.height), this.max_dimension = this.fin_width > this.fin_height ? Math.floor(this.fin_width) :Math.floor(this.fin_height), 
this.initial_xpadding = Math.floor((this.max_dimension - this.fin_width) / 2), this.initial_ypadding = Math.floor((this.max_dimension - this.fin_height) / 2), 
this.resizePrompt();
}, CropImageView.prototype.addHPadding = function() {
var h_padding_px;
return h_padding_px = (480 - this.fin_width) / 2, this.$(".crop-avatar-wrap").css("padding-left", "" + h_padding_px + "px"), 
this.$(".crop-avatar-wrap").css("padding-right", "" + h_padding_px + "px"), this.$("#crop-avatar").attr("width", this.fin_width);
}, CropImageView.prototype.addVPadding = function() {
var v_padding_px;
return this.fin_height < 480 && (v_padding_px = (480 - this.fin_height) / 2, this.$(".crop-avatar-wrap").css("padding-top", "" + v_padding_px + "px"), 
this.$(".crop-avatar-wrap").css("padding-bottom", "" + v_padding_px + "px")), this.$("#crop-avatar").attr("height", this.fin_height);
}, CropImageView.prototype.resizePrompt = function() {
var $container;
return $container = $(this.sel), $(this.el).html(HR.appController.template(this.template, this)({
FPFile:this.FPFile
})), $container.unbind().die().html(""), $container.append(this.$el), this.delegateEvents(), 
this.addHPadding(), this.addVPadding(), this.reposition();
}, CropImageView.prototype.renderPreview = function(cords) {
return cords ? (this.previewsize = {
x:150,
y:150
}, this.orig_cords = {}, cords.w && _.each([ "w", "h", "x", "y", "x2", "y2" ], function(_this) {
return function(field) {
return _this.orig_cords[field] = cords[field] * _this.scale_ratio;
};
}(this)), this.preview_width = this.previewsize.x * this.width / (this.width / this.fin_width * cords.w), 
this.preview_height = this.previewsize.y * this.height / (this.height / this.fin_height * cords.h), 
this.preview_margin_left = this.preview_width * cords.x / this.fin_width, this.preview_margin_top = this.preview_height * cords.y / this.fin_height, 
this.$("#preview_image").css("width", "" + this.preview_width + "px"), this.$("#preview_image").css("height", "" + this.preview_height + "px"), 
this.$("#preview_image").css("margin-left", "-" + this.preview_margin_left + "px"), 
this.$("#preview_image").css("margin-top", "-" + this.preview_margin_top + "px"), 
this.$("#preview_image").show()) :void 0;
}, CropImageView.prototype.saveAvatar = function(e) {
var that;
if (e) {
if ("disabled" === $(e.currentTarget).attr("disabled")) return;
$(e.currentTarget).attr("disabled", "disabled"), $(e.currentTarget).html("Saving...");
}
return that = this, this.hacker.updateAvatar({
inkblob:this.FPFile,
metadata:{
width:this.width,
height:this.height
},
options:this.orig_cords
}, function(data) {
return data.model.status < 2 ? (this.$(".slide1").hide(), this.$(".slide2").show(), 
that.checkIfReady(data.model)) :that.destroy();
}, function(error_message) {
return filepicker.remove(that.FPFile, function() {
return that.destroy(), alert(error_message);
});
});
}, CropImageView.prototype.checkIfReady = function(model) {
var onError, onSuccess, that;
return that = this, onSuccess = function() {
return that.destroy(), that.hacker.fetch();
}, onError = function() {
return that.destroy(), alert("Opps! There was an error! :(\nWe track these errors and we will resolve it soon! Please try again in sometime!\nIf this error is persistant, please drop an email to hackers@hackerrank.com!");
}, this.hacker.checkAvatarStatus(model, onSuccess, onError);
}, CropImageView.prototype.cancelUpload = function(e) {
var that;
if (e) {
if ("disabled" === $(e.currentTarget).attr("disabled")) return;
$(e.currentTarget).attr("disabled", "disabled");
}
return that = this, filepicker.remove(this.FPFile, function() {
return that.destroy();
});
}, CropImageView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.CropImageView = CropImageView;
});
}.call(this);