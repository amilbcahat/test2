(function() {
window.ActiveAdmin = {}, window.AA || (window.AA = window.ActiveAdmin);
}).call(this), function() {
window.ActiveAdmin.CheckboxToggler = ActiveAdmin.CheckboxToggler = function() {
function CheckboxToggler(options, container) {
var defaults;
this.options = options, this.container = container, defaults = {}, this.options = $.extend({}, defaults, options), 
this._init(), this._bind();
}
return CheckboxToggler.prototype._init = function() {
if (!this.container) throw new Error("Container element not found");
if (this.$container = $(this.container), !this.$container.find(".toggle_all").length) throw new Error('"toggle all" checkbox not found');
return this.toggle_all_checkbox = this.$container.find(".toggle_all"), this.checkboxes = this.$container.find(":checkbox").not(this.toggle_all_checkbox);
}, CheckboxToggler.prototype._bind = function() {
return this.checkboxes.change(function(_this) {
return function(e) {
return _this._didChangeCheckbox(e.target);
};
}(this)), this.toggle_all_checkbox.change(function(_this) {
return function() {
return _this._didChangeToggleAllCheckbox();
};
}(this));
}, CheckboxToggler.prototype._didChangeCheckbox = function() {
switch (this.checkboxes.filter(":checked").length) {
case this.checkboxes.length - 1:
return this.toggle_all_checkbox.prop({
checked:null
});

case this.checkboxes.length:
return this.toggle_all_checkbox.prop({
checked:!0
});
}
}, CheckboxToggler.prototype._didChangeToggleAllCheckbox = function() {
var setting;
return setting = this.toggle_all_checkbox.prop("checked") ? !0 :null, this.checkboxes.each(function(_this) {
return function(index, el) {
return $(el).prop({
checked:setting
}), _this._didChangeCheckbox(el);
};
}(this));
}, CheckboxToggler;
}(), jQuery(function($) {
return $.widget.bridge("checkboxToggler", ActiveAdmin.CheckboxToggler);
});
}.call(this), function() {
window.ActiveAdmin.DropdownMenu = ActiveAdmin.DropdownMenu = function() {
function DropdownMenu(options, element) {
var defaults;
this.options = options, this.element = element, this.$element = $(this.element), 
defaults = {
fadeInDuration:20,
fadeOutDuration:100,
onClickActionItemCallback:null
}, this.options = $.extend({}, defaults, options), this.$menuButton = this.$element.find(".dropdown_menu_button"), 
this.$menuList = this.$element.find(".dropdown_menu_list_wrapper"), this.isOpen = !1, 
this._buildMenuList(), this._bind();
}
return DropdownMenu.prototype.open = function() {
return this.isOpen = !0, this.$menuList.fadeIn(this.options.fadeInDuration), this._positionMenuList(), 
this._positionNipple(), this;
}, DropdownMenu.prototype.close = function() {
return this.isOpen = !1, this.$menuList.fadeOut(this.options.fadeOutDuration), this;
}, DropdownMenu.prototype.destroy = function() {
return this.$element.unbind(), this.$element = null, this;
}, DropdownMenu.prototype.isDisabled = function() {
return this.$menuButton.hasClass("disabled");
}, DropdownMenu.prototype.disable = function() {
return this.$menuButton.addClass("disabled");
}, DropdownMenu.prototype.enable = function() {
return this.$menuButton.removeClass("disabled");
}, DropdownMenu.prototype.option = function(key, value) {
return $.isPlainObject(key) ? this.options = $.extend(!0, this.options, key) :null != key ? this.options[key] :this.options[key] = value;
}, DropdownMenu.prototype._buildMenuList = function() {
return this.$menuList.prepend('<div class="dropdown_menu_nipple"></div>'), this.$menuList.hide();
}, DropdownMenu.prototype._bind = function() {
return $("body").bind("click", function(_this) {
return function() {
return _this.isOpen === !0 ? _this.close() :void 0;
};
}(this)), this.$menuButton.bind("click", function(_this) {
return function() {
return _this.isDisabled() || (_this.isOpen === !0 ? _this.close() :_this.open()), 
!1;
};
}(this));
}, DropdownMenu.prototype._positionMenuList = function() {
var centerOfButtonFromLeft, centerOfmenuListFromLeft, menuListLeftPos;
return centerOfButtonFromLeft = this.$menuButton.position().left + this.$menuButton.outerWidth() / 2, 
centerOfmenuListFromLeft = this.$menuList.outerWidth() / 2, menuListLeftPos = centerOfButtonFromLeft - centerOfmenuListFromLeft, 
this.$menuList.css("left", menuListLeftPos);
}, DropdownMenu.prototype._positionNipple = function() {
var $nipple, bottomOfButtonFromTop, centerOfmenuListFromLeft, centerOfnippleFromLeft, nippleLeftPos;
return centerOfmenuListFromLeft = this.$menuList.outerWidth() / 2, bottomOfButtonFromTop = this.$menuButton.position().top + this.$menuButton.outerHeight() + 10, 
this.$menuList.css("top", bottomOfButtonFromTop), $nipple = this.$menuList.find(".dropdown_menu_nipple"), 
centerOfnippleFromLeft = $nipple.outerWidth() / 2, nippleLeftPos = centerOfmenuListFromLeft - centerOfnippleFromLeft, 
$nipple.css("left", nippleLeftPos);
}, DropdownMenu;
}(), function($) {
return $.widget.bridge("aaDropdownMenu", ActiveAdmin.DropdownMenu), $(function() {
return $(".dropdown_menu").aaDropdownMenu();
});
}(jQuery);
}.call(this), function() {
window.ActiveAdmin.Popover = ActiveAdmin.Popover = function() {
function Popover(options, element) {
var defaults;
this.options = options, this.element = element, this.$element = $(this.element), 
defaults = {
fadeInDuration:20,
fadeOutDuration:100,
autoOpen:!0,
pageWrapperElement:"#wrapper",
onClickActionItemCallback:null
}, this.options = $.extend({}, defaults, options), this.$popover = null, this.isOpen = !1, 
this.$popover = $(this.$element.attr("href")).length > 0 ? $(this.$element.attr("href")) :this.$element.next(".popover"), 
this._buildPopover(), this._bind();
}
return Popover.prototype.open = function() {
return this.isOpen = !0, this.$popover.fadeIn(this.options.fadeInDuration), this._positionPopover(), 
this._positionNipple(), this;
}, Popover.prototype.close = function() {
return this.isOpen = !1, this.$popover.fadeOut(this.options.fadeOutDuration), this;
}, Popover.prototype.destroy = function() {
return this.$element.removeData("popover"), this.$element.unbind(), this.$element = null, 
this;
}, Popover.prototype.option = function() {}, Popover.prototype._buildPopover = function() {
return this.$popover.prepend('<div class="popover_nipple"></div>'), this.$popover.hide(), 
this.$popover.addClass("popover");
}, Popover.prototype._bind = function() {
return $(this.options.pageWrapperElement).bind("click", function(_this) {
return function() {
return _this.isOpen === !0 ? _this.close() :void 0;
};
}(this)), this.options.autoOpen === !0 ? this.$element.bind("click", function(_this) {
return function() {
return _this.isOpen === !0 ? _this.close() :_this.open(), !1;
};
}(this)) :void 0;
}, Popover.prototype._positionPopover = function() {
var centerOfButtonFromLeft, centerOfPopoverFromLeft, popoverLeftPos;
return centerOfButtonFromLeft = this.$element.offset().left + this.$element.outerWidth() / 2, 
centerOfPopoverFromLeft = this.$popover.outerWidth() / 2, popoverLeftPos = centerOfButtonFromLeft - centerOfPopoverFromLeft, 
this.$popover.css("left", popoverLeftPos);
}, Popover.prototype._positionNipple = function() {
var $nipple, bottomOfButtonFromTop, centerOfPopoverFromLeft, centerOfnippleFromLeft, nippleLeftPos;
return centerOfPopoverFromLeft = this.$popover.outerWidth() / 2, bottomOfButtonFromTop = this.$element.offset().top + this.$element.outerHeight() + 10, 
this.$popover.css("top", bottomOfButtonFromTop), $nipple = this.$popover.find(".popover_nipple"), 
centerOfnippleFromLeft = $nipple.outerWidth() / 2, nippleLeftPos = centerOfPopoverFromLeft - centerOfnippleFromLeft, 
$nipple.css("left", nippleLeftPos);
}, Popover;
}(), function($) {
return $.widget.bridge("popover", ActiveAdmin.Popover);
}(jQuery);
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
window.ActiveAdmin.TableCheckboxToggler = ActiveAdmin.TableCheckboxToggler = function(_super) {
function TableCheckboxToggler() {
return TableCheckboxToggler.__super__.constructor.apply(this, arguments);
}
return __extends(TableCheckboxToggler, _super), TableCheckboxToggler.prototype._init = function() {
return TableCheckboxToggler.__super__._init.apply(this, arguments);
}, TableCheckboxToggler.prototype._bind = function() {
return TableCheckboxToggler.__super__._bind.apply(this, arguments), this.$container.find("tbody td").click(function(_this) {
return function(e) {
return "checkbox" !== e.target.type ? _this._didClickCell(e.target) :void 0;
};
}(this));
}, TableCheckboxToggler.prototype._didChangeCheckbox = function(checkbox) {
var $row;
return TableCheckboxToggler.__super__._didChangeCheckbox.apply(this, arguments), 
$row = $(checkbox).parents("tr"), checkbox.checked ? $row.addClass("selected") :$row.removeClass("selected");
}, TableCheckboxToggler.prototype._didClickCell = function(cell) {
return $(cell).parent("tr").find(":checkbox").click();
}, TableCheckboxToggler;
}(ActiveAdmin.CheckboxToggler), jQuery(function($) {
return $.widget.bridge("tableCheckboxToggler", ActiveAdmin.TableCheckboxToggler);
});
}.call(this), function() {
$(function() {
return $(document).on("focus", ".datepicker:not(.hasDatepicker)", function() {
return $(this).datepicker({
dateFormat:"yy-mm-dd"
});
}), $(".clear_filters_btn").click(function() {
return window.location.search = "";
}), $(".dropdown_button").popover(), $(".filter_form").submit(function() {
return $(this).find(":input").filter(function() {
return "" === this.value;
}).prop("disabled", !0);
}), $(".filter_form_field.select_and_search select").change(function() {
return $(this).siblings("input").prop({
name:"q[" + this.value + "]"
});
});
});
}.call(this), function() {
jQuery(function($) {
return $(document).delegate("#batch_actions_selector li a", "click.rails", function() {
return $("#batch_action").val($(this).attr("data-action")), $("#collection_selection").submit();
}), $("#batch_actions_selector").length && $(":checkbox.toggle_all").length ? ($(".paginated_collection table.index_table").length ? $(".paginated_collection table.index_table").tableCheckboxToggler() :$(".paginated_collection").checkboxToggler(), 
$(".paginated_collection").find(":checkbox").bind("change", function() {
return $(".paginated_collection").find(":checkbox").filter(":checked").length > 0 ? $("#batch_actions_selector").aaDropdownMenu("enable") :$("#batch_actions_selector").aaDropdownMenu("disable");
})) :void 0;
});
}.call(this);