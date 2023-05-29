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
var GameDetailView, HR, _ref;
return GameDetailView = function(_super) {
function GameDetailView() {
return GameDetailView.__super__.constructor.apply(this, arguments);
}
return __extends(GameDetailView, _super), GameDetailView.prototype.template = "gamedetail", 
GameDetailView.prototype.className = "gamedetail-view container", GameDetailView.prototype.initialize = function(options) {
return this.id = options.id, this.model = options.model, this.render();
}, GameDetailView.prototype.render = function() {
return this.set_entities(), $(this.el).html(HR.appController.template(this.template, this)({
id:this.id,
model:this.model,
score_process_flag:this.score_process_flag,
process_flag:this.process_flag
})), this;
}, GameDetailView.prototype.set_entities = function() {
var process_codes, score_codes;
return score_codes = [ "Queued", "Processing", "Processed" ], process_codes = [ "Queued", "Processed" ], 
this.score_process_flag = score_codes[parseInt(this.model.get("status"))], this.process_flag = process_codes[parseInt(this.model.get("process_flag"))];
}, GameDetailView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.GameDetailView = GameDetailView;
});
}).call(this);