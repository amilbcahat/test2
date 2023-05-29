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
var HR, HackerHackosView, _ref;
return HackerHackosView = function(_super) {
function HackerHackosView() {
return HackerHackosView.__super__.constructor.apply(this, arguments);
}
return __extends(HackerHackosView, _super), HackerHackosView.prototype.template = "hacker-hackos", 
HackerHackosView.prototype.className = "hacker-hackos-view container", HackerHackosView.prototype.initialize = function(options) {
return this.hacker = options.hacker, this.collection = options.collection, this.listenTo(this.collection, "reset", this.render), 
this.render(), this;
}, HackerHackosView.prototype.render = function() {
var models;
return $(this.el).html(HR.appController.template(this.template, this)({
collection:this.collection,
hacker:this.hacker
})), HR.util.pagination(this.$(".pagination-wrapper"), this.collection.getTotal(), this.collection.pageURL() + "/page/", this.collection.getCurrentPage()), 
this.$(".transaction-list-wrapper").length > 0 && (this.collection.sync_status ? (this.$(".transaction-list-wrapper").html(""), 
models = _.sortBy(this.collection.models, function(model) {
return -1 * model.get("created_at");
}), _.each(models, function(model, i) {
var sl, _view;
return sl = 0, sl = this.collection.page ? (this.collection.page - 1) * this.collection.limit + i :i, 
_view = new HR.HackoTransactionView({
sl:sl,
model:model
}), this.$(".transaction-list-wrapper").append(_view.render().el), this.add_subview(_view);
}, this)) :this.$(".transaction-list-wrapper").append(HR.appController.viewLoader(64))), 
this;
}, HackerHackosView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.HackerHackosView = HackerHackosView;
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
var HR, HackoTransactionView, _ref;
return HackoTransactionView = function(_super) {
function HackoTransactionView() {
return HackoTransactionView.__super__.constructor.apply(this, arguments);
}
return __extends(HackoTransactionView, _super), HackoTransactionView.prototype.template = "hacko-transaction", 
HackoTransactionView.prototype.className = "hacko-transaction-list-view", HackoTransactionView.prototype.initialize = function(options) {
return this.listenTo(this.model, "change", this.render), this.listenTo(this.model, "reset", this.render), 
this.sl = options.sl;
}, HackoTransactionView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model,
sl:this.sl
})), this;
}, HackoTransactionView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.HackoTransactionView = HackoTransactionView;
});
}.call(this);