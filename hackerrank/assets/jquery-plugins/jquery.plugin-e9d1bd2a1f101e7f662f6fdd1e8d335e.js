!function() {
var initializing = !1;
window.JQClass = function() {}, JQClass.classes = {}, JQClass.extend = function extender(prop) {
function JQClass() {
!initializing && this._init && this._init.apply(this, arguments);
}
var base = this.prototype;
initializing = !0;
var prototype = new this();
initializing = !1;
for (var name in prop) prototype[name] = "function" == typeof prop[name] && "function" == typeof base[name] ? function(name, fn) {
return function() {
var __super = this._super;
this._super = function(args) {
return base[name].apply(this, args);
};
var ret = fn.apply(this, arguments);
return this._super = __super, ret;
};
}(name, prop[name]) :prop[name];
return JQClass.prototype = prototype, JQClass.prototype.constructor = JQClass, JQClass.extend = extender, 
JQClass;
};
}(), function($) {
function camelCase(name) {
return name.replace(/-([a-z])/g, function(match, group) {
return group.toUpperCase();
});
}
JQClass.classes.JQPlugin = JQClass.extend({
name:"plugin",
defaultOptions:{},
regionalOptions:{},
_getters:[],
_getMarker:function() {
return "is-" + this.name;
},
_init:function() {
$.extend(this.defaultOptions, this.regionalOptions && this.regionalOptions[""] || {});
var jqName = camelCase(this.name);
$[jqName] = this, $.fn[jqName] = function(options) {
var otherArgs = Array.prototype.slice.call(arguments, 1);
return $[jqName]._isNotChained(options, otherArgs) ? $[jqName][options].apply($[jqName], [ this[0] ].concat(otherArgs)) :this.each(function() {
if ("string" == typeof options) {
if ("_" === options[0] || !$[jqName][options]) throw "Unknown method: " + options;
$[jqName][options].apply($[jqName], [ this ].concat(otherArgs));
} else $[jqName]._attach(this, options);
});
};
},
setDefaults:function(options) {
$.extend(this.defaultOptions, options || {});
},
_isNotChained:function(name, otherArgs) {
return "option" === name && (0 === otherArgs.length || 1 === otherArgs.length && "string" == typeof otherArgs[0]) ? !0 :$.inArray(name, this._getters) > -1;
},
_attach:function(elem, options) {
if (elem = $(elem), !elem.hasClass(this._getMarker())) {
elem.addClass(this._getMarker()), options = $.extend({}, this.defaultOptions, this._getMetadata(elem), options || {});
var inst = $.extend({
name:this.name,
elem:elem,
options:options
}, this._instSettings(elem, options));
elem.data(this.name, inst), this._postAttach(elem, inst), this.option(elem, options);
}
},
_instSettings:function() {
return {};
},
_postAttach:function() {},
_getMetadata:function(elem) {
try {
var data = elem.data(this.name.toLowerCase()) || "";
data = data.replace(/'/g, '"'), data = data.replace(/([a-zA-Z0-9]+):/g, function(match, group, i) {
var count = data.substring(0, i).match(/"/g);
return count && count.length % 2 !== 0 ? group + ":" :'"' + group + '":';
}), data = $.parseJSON("{" + data + "}");
for (var name in data) {
var value = data[name];
"string" == typeof value && value.match(/^new Date\((.*)\)$/) && (data[name] = eval(value));
}
return data;
} catch (e) {
return {};
}
},
_getInst:function(elem) {
return $(elem).data(this.name) || {};
},
option:function(elem, name, value) {
elem = $(elem);
var inst = elem.data(this.name);
if (!name || "string" == typeof name && null == value) {
var options = (inst || {}).options;
return options && name ? options[name] :options;
}
if (elem.hasClass(this._getMarker())) {
var options = name || {};
"string" == typeof name && (options = {}, options[name] = value), this._optionsChanged(elem, inst, options), 
$.extend(inst.options, options);
}
},
_optionsChanged:function() {},
destroy:function(elem) {
elem = $(elem), elem.hasClass(this._getMarker()) && (this._preDestroy(elem, this._getInst(elem)), 
elem.removeData(this.name).removeClass(this._getMarker()));
},
_preDestroy:function() {}
}), $.JQPlugin = {
createPlugin:function(superClass, overrides) {
"object" == typeof superClass && (overrides = superClass, superClass = "JQPlugin"), 
superClass = camelCase(superClass);
var className = camelCase(overrides.name);
JQClass.classes[className] = JQClass.classes[superClass].extend(overrides), new JQClass.classes[className]();
}
};
}(jQuery);