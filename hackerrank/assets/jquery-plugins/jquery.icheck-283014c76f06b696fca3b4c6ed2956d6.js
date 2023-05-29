!function($) {
function operate(input, direct, method) {
var node = input[0];
if (state = /er/.test(method) ? _indeterminate :/bl/.test(method) ? _disabled :_checked, 
active = method == _update ? {
checked:node[_checked],
disabled:node[_disabled],
indeterminate:"true" == input.attr(_indeterminate) || "false" == input.attr(_determinate)
} :node[state], /^(ch|di|in)/.test(method) && !active) on(input, state); else if (/^(un|en|de)/.test(method) && active) off(input, state); else if (method == _update) for (var state in active) active[state] ? on(input, state, !0) :off(input, state, !0); else direct && "toggle" != method || (direct || input[_callback]("ifClicked"), 
active ? node[_type] !== _radio && off(input, state) :on(input, state));
}
function on(input, state, keep) {
var node = input[0], parent = input.parent(), checked = state == _checked, indeterminate = state == _indeterminate, callback = indeterminate ? _determinate :checked ? _unchecked :"enabled", regular = option(node, callback + capitalize(node[_type])), specific = option(node, state + capitalize(node[_type]));
if (node[state] !== !0) {
if (!keep && state == _checked && node[_type] == _radio && node.name) {
var form = input.closest("form"), inputs = 'input[name="' + node.name + '"]';
inputs = form.length ? form.find(inputs) :$(inputs), inputs.each(function() {
this !== node && $.data(this, _iCheck) && off($(this), state);
});
}
indeterminate ? (node[state] = !0, node[_checked] && off(input, _checked, "force")) :(keep || (node[state] = !0), 
checked && node[_indeterminate] && off(input, _indeterminate, !1)), callbacks(input, checked, state, keep);
}
node[_disabled] && option(node, _cursor, !0) && parent.find("." + _iCheckHelper).css(_cursor, "default"), 
parent[_add](specific || option(node, state)), parent[_remove](regular || option(node, callback) || "");
}
function off(input, state, keep) {
var node = input[0], parent = input.parent(), checked = state == _checked, indeterminate = state == _indeterminate, callback = indeterminate ? _determinate :checked ? _unchecked :"enabled", regular = option(node, callback + capitalize(node[_type])), specific = option(node, state + capitalize(node[_type]));
node[state] !== !1 && ((indeterminate || !keep || "force" == keep) && (node[state] = !1), 
callbacks(input, checked, callback, keep)), !node[_disabled] && option(node, _cursor, !0) && parent.find("." + _iCheckHelper).css(_cursor, "pointer"), 
parent[_remove](specific || option(node, state) || ""), parent[_add](regular || option(node, callback));
}
function tidy(node, callback) {
if ($.data(node, _iCheck)) {
var input = $(node);
input.parent().html(input.attr("style", $.data(node, _iCheck).s || "")[_callback](callback || "")), 
input.off(".i").unwrap(), $(_label + '[for="' + node.id + '"]').add(input.closest(_label)).off(".i");
}
}
function option(node, state, regular) {
return $.data(node, _iCheck) ? $.data(node, _iCheck).o[state + (regular ? "" :"Class")] :void 0;
}
function capitalize(string) {
return string.charAt(0).toUpperCase() + string.slice(1);
}
function callbacks(input, checked, callback, keep) {
keep || (checked && input[_callback]("ifToggled"), input[_callback]("ifChanged")[_callback]("if" + capitalize(callback)));
}
var _iCheck = "iCheck", _iCheckHelper = _iCheck + "-helper", _checkbox = "checkbox", _radio = "radio", _checked = "checked", _unchecked = "un" + _checked, _disabled = "disabled", _determinate = "determinate", _indeterminate = "in" + _determinate, _update = "update", _type = "type", _click = "click", _touch = "touchbegin.i touchend.i", _add = "addClass", _remove = "removeClass", _callback = "trigger", _label = "label", _cursor = "cursor", _mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);
$.fn[_iCheck] = function(options, fire) {
var handle = ":" + _checkbox + ", :" + _radio, stack = $(), walker = function(object) {
object.each(function() {
var self = $(this);
stack = self.is(handle) ? stack.add(self) :stack.add(self.find(handle));
});
};
if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(options)) return options = options.toLowerCase(), 
walker(this), stack.each(function() {
"destroy" == options ? tidy(this, "ifDestroyed") :operate($(this), !0, options), 
$.isFunction(fire) && fire();
});
if ("object" != typeof options && options) return this;
var settings = $.extend({
checkedClass:_checked,
disabledClass:_disabled,
indeterminateClass:_indeterminate,
labelHover:!0
}, options), selector = settings.handle, hoverClass = settings.hoverClass || "hover", focusClass = settings.focusClass || "focus", activeClass = settings.activeClass || "active", labelHover = !!settings.labelHover, labelHoverClass = settings.labelHoverClass || "hover", area = 0 | ("" + settings.increaseArea).replace("%", "");
return (selector == _checkbox || selector == _radio) && (handle = ":" + selector), 
-50 > area && (area = -50), walker(this), stack.each(function() {
tidy(this);
var self = $(this), node = this, id = node.id, offset = -area + "%", size = 100 + 2 * area + "%", layer = {
position:"absolute",
top:offset,
left:offset,
display:"block",
width:size,
height:size,
margin:0,
padding:0,
background:"#fff",
border:0,
opacity:0
}, hide = _mobile ? {
position:"absolute",
visibility:"hidden"
} :area ? layer :{
position:"absolute",
opacity:0
}, className = node[_type] == _checkbox ? settings.checkboxClass || "i" + _checkbox :settings.radioClass || "i" + _radio, label = $(_label + '[for="' + id + '"]').add(self.closest(_label)), parent = self.wrap('<div class="' + className + '"/>')[_callback]("ifCreated").parent().append(settings.insert), helper = $('<ins class="' + _iCheckHelper + '"/>').css(layer).appendTo(parent);
self.data(_iCheck, {
o:settings,
s:self.attr("style")
}).css(hide), !!settings.inheritClass && parent[_add](node.className), !!settings.inheritID && id && parent.attr("id", _iCheck + "-" + id), 
"static" == parent.css("position") && parent.css("position", "relative"), operate(self, !0, _update), 
label.length && label.on(_click + ".i mouseenter.i mouseleave.i " + _touch, function(event) {
var type = event[_type], item = $(this);
if (!node[_disabled]) {
if (type == _click ? operate(self, !1, !0) :labelHover && (/ve|nd/.test(type) ? (parent[_remove](hoverClass), 
item[_remove](labelHoverClass)) :(parent[_add](hoverClass), item[_add](labelHoverClass))), 
!_mobile) return !1;
event.stopPropagation();
}
}), self.on(_click + ".i focus.i blur.i keyup.i keydown.i keypress.i", function(event) {
var type = event[_type], key = event.keyCode;
return type == _click ? !1 :"keydown" == type && 32 == key ? (node[_type] == _radio && node[_checked] || (node[_checked] ? off(self, _checked) :on(self, _checked)), 
!1) :("keyup" == type && node[_type] == _radio ? !node[_checked] && on(self, _checked) :/us|ur/.test(type) && parent["blur" == type ? _remove :_add](focusClass), 
void 0);
}), helper.on(_click + " mousedown mouseup mouseover mouseout " + _touch, function(event) {
var type = event[_type], toggle = /wn|up/.test(type) ? activeClass :hoverClass;
if (!node[_disabled]) {
if (type == _click ? operate(self, !1, !0) :(/wn|er|in/.test(type) ? parent[_add](toggle) :parent[_remove](toggle + " " + activeClass), 
label.length && labelHover && toggle == hoverClass && label[/ut|nd/.test(type) ? _remove :_add](labelHoverClass)), 
!_mobile) return !1;
event.stopPropagation();
}
});
});
};
}(jQuery);