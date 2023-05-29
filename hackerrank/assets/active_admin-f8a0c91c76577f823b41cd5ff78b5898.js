/*!
 * jQuery JavaScript Library v1.8.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: Thu Aug 30 2012 17:17:22 GMT-0400 (Eastern Daylight Time)
 */
!function(window, undefined) {
function createOptions(options) {
var object = optionsCache[options] = {};
return jQuery.each(options.split(core_rspace), function(_, flag) {
object[flag] = !0;
}), object;
}
function dataAttr(elem, key, data) {
if (data === undefined && 1 === elem.nodeType) {
var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
if (data = elem.getAttribute(name), "string" == typeof data) {
try {
data = "true" === data ? !0 :"false" === data ? !1 :"null" === data ? null :+data + "" === data ? +data :rbrace.test(data) ? jQuery.parseJSON(data) :data;
} catch (e) {}
jQuery.data(elem, key, data);
} else data = undefined;
}
return data;
}
function isEmptyDataObject(obj) {
var name;
for (name in obj) if (("data" !== name || !jQuery.isEmptyObject(obj[name])) && "toJSON" !== name) return !1;
return !0;
}
function returnFalse() {
return !1;
}
function returnTrue() {
return !0;
}
function isDisconnected(node) {
return !node || !node.parentNode || 11 === node.parentNode.nodeType;
}
function sibling(cur, dir) {
do cur = cur[dir]; while (cur && 1 !== cur.nodeType);
return cur;
}
function winnow(elements, qualifier, keep) {
if (qualifier = qualifier || 0, jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
var retVal = !!qualifier.call(elem, i, elem);
return retVal === keep;
});
if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
return elem === qualifier === keep;
});
if ("string" == typeof qualifier) {
var filtered = jQuery.grep(elements, function(elem) {
return 1 === elem.nodeType;
});
if (isSimple.test(qualifier)) return jQuery.filter(qualifier, filtered, !keep);
qualifier = jQuery.filter(qualifier, filtered);
}
return jQuery.grep(elements, function(elem) {
return jQuery.inArray(elem, qualifier) >= 0 === keep;
});
}
function createSafeFragment(document) {
var list = nodeNames.split("|"), safeFrag = document.createDocumentFragment();
if (safeFrag.createElement) for (;list.length; ) safeFrag.createElement(list.pop());
return safeFrag;
}
function findOrAppend(elem, tag) {
return elem.getElementsByTagName(tag)[0] || elem.appendChild(elem.ownerDocument.createElement(tag));
}
function cloneCopyEvent(src, dest) {
if (1 === dest.nodeType && jQuery.hasData(src)) {
var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(dest, oldData), events = oldData.events;
if (events) {
delete curData.handle, curData.events = {};
for (type in events) for (i = 0, l = events[type].length; l > i; i++) jQuery.event.add(dest, type, events[type][i]);
}
curData.data && (curData.data = jQuery.extend({}, curData.data));
}
}
function cloneFixAttributes(src, dest) {
var nodeName;
1 === dest.nodeType && (dest.clearAttributes && dest.clearAttributes(), dest.mergeAttributes && dest.mergeAttributes(src), 
nodeName = dest.nodeName.toLowerCase(), "object" === nodeName ? (dest.parentNode && (dest.outerHTML = src.outerHTML), 
jQuery.support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML) && (dest.innerHTML = src.innerHTML)) :"input" === nodeName && rcheckableType.test(src.type) ? (dest.defaultChecked = dest.checked = src.checked, 
dest.value !== src.value && (dest.value = src.value)) :"option" === nodeName ? dest.selected = src.defaultSelected :"input" === nodeName || "textarea" === nodeName ? dest.defaultValue = src.defaultValue :"script" === nodeName && dest.text !== src.text && (dest.text = src.text), 
dest.removeAttribute(jQuery.expando));
}
function getAll(elem) {
return "undefined" != typeof elem.getElementsByTagName ? elem.getElementsByTagName("*") :"undefined" != typeof elem.querySelectorAll ? elem.querySelectorAll("*") :[];
}
function fixDefaultChecked(elem) {
rcheckableType.test(elem.type) && (elem.defaultChecked = elem.checked);
}
function vendorPropName(style, name) {
if (name in style) return name;
for (var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--; ) if (name = cssPrefixes[i] + capName, 
name in style) return name;
return origName;
}
function isHidden(elem, el) {
return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem);
}
function showHide(elements, show) {
for (var elem, display, values = [], index = 0, length = elements.length; length > index; index++) elem = elements[index], 
elem.style && (values[index] = jQuery._data(elem, "olddisplay"), show ? (values[index] || "none" !== elem.style.display || (elem.style.display = ""), 
"" === elem.style.display && isHidden(elem) && (values[index] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName)))) :(display = curCSS(elem, "display"), 
values[index] || "none" === display || jQuery._data(elem, "olddisplay", display)));
for (index = 0; length > index; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" :"none"));
return elements;
}
function setPositiveNumber(elem, value, subtract) {
var matches = rnumsplit.exec(value);
return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") :value;
}
function augmentWidthOrHeight(elem, name, extra, isBorderBox) {
for (var i = extra === (isBorderBox ? "border" :"content") ? 4 :"width" === name ? 1 :0, val = 0; 4 > i; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0)), 
isBorderBox ? ("content" === extra && (val -= parseFloat(curCSS(elem, "padding" + cssExpand[i])) || 0), 
"margin" !== extra && (val -= parseFloat(curCSS(elem, "border" + cssExpand[i] + "Width")) || 0)) :(val += parseFloat(curCSS(elem, "padding" + cssExpand[i])) || 0, 
"padding" !== extra && (val += parseFloat(curCSS(elem, "border" + cssExpand[i] + "Width")) || 0));
return val;
}
function getWidthOrHeight(elem, name, extra) {
var val = "width" === name ? elem.offsetWidth :elem.offsetHeight, valueIsBorderBox = !0, isBorderBox = jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing");
if (0 >= val || null == val) {
if (val = curCSS(elem, name), (0 > val || null == val) && (val = elem.style[name]), 
rnumnonpx.test(val)) return val;
valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]), 
val = parseFloat(val) || 0;
}
return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" :"content"), valueIsBorderBox) + "px";
}
function css_defaultDisplay(nodeName) {
if (elemdisplay[nodeName]) return elemdisplay[nodeName];
var elem = jQuery("<" + nodeName + ">").appendTo(document.body), display = elem.css("display");
return elem.remove(), ("none" === display || "" === display) && (iframe = document.body.appendChild(iframe || jQuery.extend(document.createElement("iframe"), {
frameBorder:0,
width:0,
height:0
})), iframeDoc && iframe.createElement || (iframeDoc = (iframe.contentWindow || iframe.contentDocument).document, 
iframeDoc.write("<!doctype html><html><body>"), iframeDoc.close()), elem = iframeDoc.body.appendChild(iframeDoc.createElement(nodeName)), 
display = curCSS(elem, "display"), document.body.removeChild(iframe)), elemdisplay[nodeName] = display, 
display;
}
function buildParams(prefix, obj, traditional, add) {
var name;
if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
traditional || rbracket.test(prefix) ? add(prefix, v) :buildParams(prefix + "[" + ("object" == typeof v ? i :"") + "]", v, traditional, add);
}); else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj); else for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
}
function addToPrefiltersOrTransports(structure) {
return function(dataTypeExpression, func) {
"string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
var dataType, list, placeBefore, dataTypes = dataTypeExpression.toLowerCase().split(core_rspace), i = 0, length = dataTypes.length;
if (jQuery.isFunction(func)) for (;length > i; i++) dataType = dataTypes[i], placeBefore = /^\+/.test(dataType), 
placeBefore && (dataType = dataType.substr(1) || "*"), list = structure[dataType] = structure[dataType] || [], 
list[placeBefore ? "unshift" :"push"](func);
};
}
function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, dataType, inspected) {
dataType = dataType || options.dataTypes[0], inspected = inspected || {}, inspected[dataType] = !0;
for (var selection, list = structure[dataType], i = 0, length = list ? list.length :0, executeOnly = structure === prefilters; length > i && (executeOnly || !selection); i++) selection = list[i](options, originalOptions, jqXHR), 
"string" == typeof selection && (!executeOnly || inspected[selection] ? selection = undefined :(options.dataTypes.unshift(selection), 
selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, selection, inspected)));
return !executeOnly && selection || inspected["*"] || (selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, "*", inspected)), 
selection;
}
function ajaxExtend(target, src) {
var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
for (key in src) src[key] !== undefined && ((flatOptions[key] ? target :deep || (deep = {}))[key] = src[key]);
deep && jQuery.extend(!0, target, deep);
}
function ajaxHandleResponses(s, jqXHR, responses) {
var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes, responseFields = s.responseFields;
for (type in responseFields) type in responses && (jqXHR[responseFields[type]] = responses[type]);
for (;"*" === dataTypes[0]; ) dataTypes.shift(), ct === undefined && (ct = s.mimeType || jqXHR.getResponseHeader("content-type"));
if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
dataTypes.unshift(type);
break;
}
if (dataTypes[0] in responses) finalDataType = dataTypes[0]; else {
for (type in responses) {
if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
finalDataType = type;
break;
}
firstDataType || (firstDataType = type);
}
finalDataType = finalDataType || firstDataType;
}
return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), 
responses[finalDataType]) :void 0;
}
function ajaxConvert(s, response) {
var conv, conv2, current, tmp, dataTypes = s.dataTypes.slice(), prev = dataTypes[0], converters = {}, i = 0;
if (s.dataFilter && (response = s.dataFilter(response, s.dataType)), dataTypes[1]) for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
for (;current = dataTypes[++i]; ) if ("*" !== current) {
if ("*" !== prev && prev !== current) {
if (conv = converters[prev + " " + current] || converters["* " + current], !conv) for (conv2 in converters) if (tmp = conv2.split(" "), 
tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
conv === !0 ? conv = converters[conv2] :converters[conv2] !== !0 && (current = tmp[0], 
dataTypes.splice(i--, 0, current));
break;
}
if (conv !== !0) if (conv && s["throws"]) response = conv(response); else try {
response = conv(response);
} catch (e) {
return {
state:"parsererror",
error:conv ? e :"No conversion from " + prev + " to " + current
};
}
}
prev = current;
}
return {
state:"success",
data:response
};
}
function createStandardXHR() {
try {
return new window.XMLHttpRequest();
} catch (e) {}
}
function createActiveXHR() {
try {
return new window.ActiveXObject("Microsoft.XMLHTTP");
} catch (e) {}
}
function createFxNow() {
return setTimeout(function() {
fxNow = undefined;
}, 0), fxNow = jQuery.now();
}
function createTweens(animation, props) {
jQuery.each(props, function(prop, value) {
for (var collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; length > index; index++) if (collection[index].call(animation, prop, value)) return;
});
}
function Animation(elem, properties, options) {
var result, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
delete tick.elem;
}), tick = function() {
for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), percent = 1 - (remaining / animation.duration || 0), index = 0, length = animation.tweens.length; length > index; index++) animation.tweens[index].run(percent);
return deferred.notifyWith(elem, [ animation, percent, remaining ]), 1 > percent && length ? remaining :(deferred.resolveWith(elem, [ animation ]), 
!1);
}, animation = deferred.promise({
elem:elem,
props:jQuery.extend({}, properties),
opts:jQuery.extend(!0, {
specialEasing:{}
}, options),
originalProperties:properties,
originalOptions:options,
startTime:fxNow || createFxNow(),
duration:options.duration,
tweens:[],
createTween:function(prop, end) {
var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
return animation.tweens.push(tween), tween;
},
stop:function(gotoEnd) {
for (var index = 0, length = gotoEnd ? animation.tweens.length :0; length > index; index++) animation.tweens[index].run(1);
return gotoEnd ? deferred.resolveWith(elem, [ animation, gotoEnd ]) :deferred.rejectWith(elem, [ animation, gotoEnd ]), 
this;
}
}), props = animation.props;
for (propFilter(props, animation.opts.specialEasing); length > index; index++) if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) return result;
return createTweens(animation, props), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), 
jQuery.fx.timer(jQuery.extend(tick, {
anim:animation,
queue:animation.opts.queue,
elem:elem
})), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
}
function propFilter(props, specialEasing) {
var index, name, easing, value, hooks;
for (index in props) if (name = jQuery.camelCase(index), easing = specialEasing[name], 
value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), 
index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], 
hooks && "expand" in hooks) {
value = hooks.expand(value), delete props[name];
for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing);
} else specialEasing[name] = easing;
}
function defaultPrefilter(elem, props, opts) {
var index, prop, value, length, dataShow, tween, hooks, oldfire, anim = this, style = elem.style, orig = {}, handled = [], hidden = elem.nodeType && isHidden(elem);
opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, 
oldfire = hooks.empty.fire, hooks.empty.fire = function() {
hooks.unqueued || oldfire();
}), hooks.unqueued++, anim.always(function() {
anim.always(function() {
hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire();
});
})), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [ style.overflow, style.overflowX, style.overflowY ], 
"inline" === jQuery.css(elem, "display") && "none" === jQuery.css(elem, "float") && (jQuery.support.inlineBlockNeedsLayout && "inline" !== css_defaultDisplay(elem.nodeName) ? style.zoom = 1 :style.display = "inline-block")), 
opts.overflow && (style.overflow = "hidden", jQuery.support.shrinkWrapBlocks || anim.done(function() {
style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2];
}));
for (index in props) if (value = props[index], rfxtypes.exec(value)) {
if (delete props[index], value === (hidden ? "hide" :"show")) continue;
handled.push(index);
}
if (length = handled.length) for (dataShow = jQuery._data(elem, "fxshow") || jQuery._data(elem, "fxshow", {}), 
hidden ? jQuery(elem).show() :anim.done(function() {
jQuery(elem).hide();
}), anim.done(function() {
var prop;
jQuery.removeData(elem, "fxshow", !0);
for (prop in orig) jQuery.style(elem, prop, orig[prop]);
}), index = 0; length > index; index++) prop = handled[index], tween = anim.createTween(prop, hidden ? dataShow[prop] :0), 
orig[prop] = dataShow[prop] || jQuery.style(elem, prop), prop in dataShow || (dataShow[prop] = tween.start, 
hidden && (tween.end = tween.start, tween.start = "width" === prop || "height" === prop ? 1 :0));
}
function Tween(elem, options, prop, end, easing) {
return new Tween.prototype.init(elem, options, prop, end, easing);
}
function genFx(type, includeWidth) {
var which, attrs = {
height:type
}, i = 0;
for (includeWidth = includeWidth ? 1 :0; 4 > i; i += 2 - includeWidth) which = cssExpand[i], 
attrs["margin" + which] = attrs["padding" + which] = type;
return includeWidth && (attrs.opacity = attrs.width = type), attrs;
}
function getWindow(elem) {
return jQuery.isWindow(elem) ? elem :9 === elem.nodeType ? elem.defaultView || elem.parentWindow :!1;
}
var rootjQuery, readyList, document = window.document, location = window.location, navigator = window.navigator, _jQuery = window.jQuery, _$ = window.$, core_push = Array.prototype.push, core_slice = Array.prototype.slice, core_indexOf = Array.prototype.indexOf, core_toString = Object.prototype.toString, core_hasOwn = Object.prototype.hasOwnProperty, core_trim = String.prototype.trim, jQuery = function(selector, context) {
return new jQuery.fn.init(selector, context, rootjQuery);
}, core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, core_rnotwhite = /\S/, core_rspace = /\s+/, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, rvalidchars = /^[\],:{}\s]*$/, rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g, rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function(all, letter) {
return (letter + "").toUpperCase();
}, DOMContentLoaded = function() {
document.addEventListener ? (document.removeEventListener("DOMContentLoaded", DOMContentLoaded, !1), 
jQuery.ready()) :"complete" === document.readyState && (document.detachEvent("onreadystatechange", DOMContentLoaded), 
jQuery.ready());
}, class2type = {};
jQuery.fn = jQuery.prototype = {
constructor:jQuery,
init:function(selector, context, rootjQuery) {
var match, elem, doc;
if (!selector) return this;
if (selector.nodeType) return this.context = this[0] = selector, this.length = 1, 
this;
if ("string" == typeof selector) {
if (match = "<" === selector.charAt(0) && ">" === selector.charAt(selector.length - 1) && selector.length >= 3 ? [ null, selector, null ] :rquickExpr.exec(selector), 
!match || !match[1] && context) return !context || context.jquery ? (context || rootjQuery).find(selector) :this.constructor(context).find(selector);
if (match[1]) return context = context instanceof jQuery ? context[0] :context, 
doc = context && context.nodeType ? context.ownerDocument || context :document, 
selector = jQuery.parseHTML(match[1], doc, !0), rsingleTag.test(match[1]) && jQuery.isPlainObject(context) && this.attr.call(selector, context, !0), 
jQuery.merge(this, selector);
if (elem = document.getElementById(match[2]), elem && elem.parentNode) {
if (elem.id !== match[2]) return rootjQuery.find(selector);
this.length = 1, this[0] = elem;
}
return this.context = document, this.selector = selector, this;
}
return jQuery.isFunction(selector) ? rootjQuery.ready(selector) :(selector.selector !== undefined && (this.selector = selector.selector, 
this.context = selector.context), jQuery.makeArray(selector, this));
},
selector:"",
jquery:"1.8.1",
length:0,
size:function() {
return this.length;
},
toArray:function() {
return core_slice.call(this);
},
get:function(num) {
return null == num ? this.toArray() :0 > num ? this[this.length + num] :this[num];
},
pushStack:function(elems, name, selector) {
var ret = jQuery.merge(this.constructor(), elems);
return ret.prevObject = this, ret.context = this.context, "find" === name ? ret.selector = this.selector + (this.selector ? " " :"") + selector :name && (ret.selector = this.selector + "." + name + "(" + selector + ")"), 
ret;
},
each:function(callback, args) {
return jQuery.each(this, callback, args);
},
ready:function(fn) {
return jQuery.ready.promise().done(fn), this;
},
eq:function(i) {
return i = +i, -1 === i ? this.slice(i) :this.slice(i, i + 1);
},
first:function() {
return this.eq(0);
},
last:function() {
return this.eq(-1);
},
slice:function() {
return this.pushStack(core_slice.apply(this, arguments), "slice", core_slice.call(arguments).join(","));
},
map:function(callback) {
return this.pushStack(jQuery.map(this, function(elem, i) {
return callback.call(elem, i, elem);
}));
},
end:function() {
return this.prevObject || this.constructor(null);
},
push:core_push,
sort:[].sort,
splice:[].splice
}, jQuery.fn.init.prototype = jQuery.fn, jQuery.extend = jQuery.fn.extend = function() {
var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
for ("boolean" == typeof target && (deep = target, target = arguments[1] || {}, 
i = 2), "object" == typeof target || jQuery.isFunction(target) || (target = {}), 
length === i && (target = this, --i); length > i; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, 
clone = src && jQuery.isArray(src) ? src :[]) :clone = src && jQuery.isPlainObject(src) ? src :{}, 
target[name] = jQuery.extend(deep, clone, copy)) :copy !== undefined && (target[name] = copy));
return target;
}, jQuery.extend({
noConflict:function(deep) {
return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), 
jQuery;
},
isReady:!1,
readyWait:1,
holdReady:function(hold) {
hold ? jQuery.readyWait++ :jQuery.ready(!0);
},
ready:function(wait) {
if (wait === !0 ? !--jQuery.readyWait :!jQuery.isReady) {
if (!document.body) return setTimeout(jQuery.ready, 1);
jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [ jQuery ]), 
jQuery.fn.trigger && jQuery(document).trigger("ready").off("ready"));
}
},
isFunction:function(obj) {
return "function" === jQuery.type(obj);
},
isArray:Array.isArray || function(obj) {
return "array" === jQuery.type(obj);
},
isWindow:function(obj) {
return null != obj && obj == obj.window;
},
isNumeric:function(obj) {
return !isNaN(parseFloat(obj)) && isFinite(obj);
},
type:function(obj) {
return null == obj ? String(obj) :class2type[core_toString.call(obj)] || "object";
},
isPlainObject:function(obj) {
if (!obj || "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj)) return !1;
try {
if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) return !1;
} catch (e) {
return !1;
}
var key;
for (key in obj) ;
return key === undefined || core_hasOwn.call(obj, key);
},
isEmptyObject:function(obj) {
var name;
for (name in obj) return !1;
return !0;
},
error:function(msg) {
throw new Error(msg);
},
parseHTML:function(data, context, scripts) {
var parsed;
return data && "string" == typeof data ? ("boolean" == typeof context && (scripts = context, 
context = 0), context = context || document, (parsed = rsingleTag.exec(data)) ? [ context.createElement(parsed[1]) ] :(parsed = jQuery.buildFragment([ data ], context, scripts ? null :[]), 
jQuery.merge([], (parsed.cacheable ? jQuery.clone(parsed.fragment) :parsed.fragment).childNodes))) :null;
},
parseJSON:function(data) {
return data && "string" == typeof data ? (data = jQuery.trim(data), window.JSON && window.JSON.parse ? window.JSON.parse(data) :rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, "")) ? new Function("return " + data)() :(jQuery.error("Invalid JSON: " + data), 
void 0)) :null;
},
parseXML:function(data) {
var xml, tmp;
if (!data || "string" != typeof data) return null;
try {
window.DOMParser ? (tmp = new DOMParser(), xml = tmp.parseFromString(data, "text/xml")) :(xml = new ActiveXObject("Microsoft.XMLDOM"), 
xml.async = "false", xml.loadXML(data));
} catch (e) {
xml = undefined;
}
return xml && xml.documentElement && !xml.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data), 
xml;
},
noop:function() {},
globalEval:function(data) {
data && core_rnotwhite.test(data) && (window.execScript || function(data) {
window.eval.call(window, data);
})(data);
},
camelCase:function(string) {
return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
},
nodeName:function(elem, name) {
return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
},
each:function(obj, callback, args) {
var name, i = 0, length = obj.length, isObj = length === undefined || jQuery.isFunction(obj);
if (args) if (isObj) {
for (name in obj) if (callback.apply(obj[name], args) === !1) break;
} else for (;length > i && callback.apply(obj[i++], args) !== !1; ) ; else if (isObj) {
for (name in obj) if (callback.call(obj[name], name, obj[name]) === !1) break;
} else for (;length > i && callback.call(obj[i], i, obj[i++]) !== !1; ) ;
return obj;
},
trim:core_trim && !core_trim.call("﻿ ") ? function(text) {
return null == text ? "" :core_trim.call(text);
} :function(text) {
return null == text ? "" :text.toString().replace(rtrim, "");
},
makeArray:function(arr, results) {
var type, ret = results || [];
return null != arr && (type = jQuery.type(arr), null == arr.length || "string" === type || "function" === type || "regexp" === type || jQuery.isWindow(arr) ? core_push.call(ret, arr) :jQuery.merge(ret, arr)), 
ret;
},
inArray:function(elem, arr, i) {
var len;
if (arr) {
if (core_indexOf) return core_indexOf.call(arr, elem, i);
for (len = arr.length, i = i ? 0 > i ? Math.max(0, len + i) :i :0; len > i; i++) if (i in arr && arr[i] === elem) return i;
}
return -1;
},
merge:function(first, second) {
var l = second.length, i = first.length, j = 0;
if ("number" == typeof l) for (;l > j; j++) first[i++] = second[j]; else for (;second[j] !== undefined; ) first[i++] = second[j++];
return first.length = i, first;
},
grep:function(elems, callback, inv) {
var retVal, ret = [], i = 0, length = elems.length;
for (inv = !!inv; length > i; i++) retVal = !!callback(elems[i], i), inv !== retVal && ret.push(elems[i]);
return ret;
},
map:function(elems, callback, arg) {
var value, key, ret = [], i = 0, length = elems.length, isArray = elems instanceof jQuery || length !== undefined && "number" == typeof length && (length > 0 && elems[0] && elems[length - 1] || 0 === length || jQuery.isArray(elems));
if (isArray) for (;length > i; i++) value = callback(elems[i], i, arg), null != value && (ret[ret.length] = value); else for (key in elems) value = callback(elems[key], key, arg), 
null != value && (ret[ret.length] = value);
return ret.concat.apply([], ret);
},
guid:1,
proxy:function(fn, context) {
var tmp, args, proxy;
return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), 
jQuery.isFunction(fn) ? (args = core_slice.call(arguments, 2), proxy = function() {
return fn.apply(context, args.concat(core_slice.call(arguments)));
}, proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++, proxy) :undefined;
},
access:function(elems, fn, key, value, chainable, emptyGet, pass) {
var exec, bulk = null == key, i = 0, length = elems.length;
if (key && "object" == typeof key) {
for (i in key) jQuery.access(elems, fn, i, key[i], 1, emptyGet, value);
chainable = 1;
} else if (value !== undefined) {
if (exec = pass === undefined && jQuery.isFunction(value), bulk && (exec ? (exec = fn, 
fn = function(elem, key, value) {
return exec.call(jQuery(elem), value);
}) :(fn.call(elems, value), fn = null)), fn) for (;length > i; i++) fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) :value, pass);
chainable = 1;
}
return chainable ? elems :bulk ? fn.call(elems) :length ? fn(elems[0], key) :emptyGet;
},
now:function() {
return new Date().getTime();
}
}), jQuery.ready.promise = function(obj) {
if (!readyList) if (readyList = jQuery.Deferred(), "complete" === document.readyState) setTimeout(jQuery.ready, 1); else if (document.addEventListener) document.addEventListener("DOMContentLoaded", DOMContentLoaded, !1), 
window.addEventListener("load", jQuery.ready, !1); else {
document.attachEvent("onreadystatechange", DOMContentLoaded), window.attachEvent("onload", jQuery.ready);
var top = !1;
try {
top = null == window.frameElement && document.documentElement;
} catch (e) {}
top && top.doScroll && !function doScrollCheck() {
if (!jQuery.isReady) {
try {
top.doScroll("left");
} catch (e) {
return setTimeout(doScrollCheck, 50);
}
jQuery.ready();
}
}();
}
return readyList.promise(obj);
}, jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
class2type["[object " + name + "]"] = name.toLowerCase();
}), rootjQuery = jQuery(document);
var optionsCache = {};
jQuery.Callbacks = function(options) {
options = "string" == typeof options ? optionsCache[options] || createOptions(options) :jQuery.extend({}, options);
var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [], fire = function(data) {
for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, 
firingStart = 0, firingLength = list.length, firing = !0; list && firingLength > firingIndex; firingIndex++) if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
memory = !1;
break;
}
firing = !1, list && (stack ? stack.length && fire(stack.shift()) :memory ? list = [] :self.disable());
}, self = {
add:function() {
if (list) {
var start = list.length;
!function add(args) {
jQuery.each(args, function(_, arg) {
var type = jQuery.type(arg);
"function" !== type || options.unique && self.has(arg) ? arg && arg.length && "string" !== type && add(arg) :list.push(arg);
});
}(arguments), firing ? firingLength = list.length :memory && (firingStart = start, 
fire(memory));
}
return this;
},
remove:function() {
return list && jQuery.each(arguments, function(_, arg) {
for (var index; (index = jQuery.inArray(arg, list, index)) > -1; ) list.splice(index, 1), 
firing && (firingLength >= index && firingLength--, firingIndex >= index && firingIndex--);
}), this;
},
has:function(fn) {
return jQuery.inArray(fn, list) > -1;
},
empty:function() {
return list = [], this;
},
disable:function() {
return list = stack = memory = undefined, this;
},
disabled:function() {
return !list;
},
lock:function() {
return stack = undefined, memory || self.disable(), this;
},
locked:function() {
return !stack;
},
fireWith:function(context, args) {
return args = args || [], args = [ context, args.slice ? args.slice() :args ], !list || fired && !stack || (firing ? stack.push(args) :fire(args)), 
this;
},
fire:function() {
return self.fireWith(this, arguments), this;
},
fired:function() {
return !!fired;
}
};
return self;
}, jQuery.extend({
Deferred:function(func) {
var tuples = [ [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ], [ "notify", "progress", jQuery.Callbacks("memory") ] ], state = "pending", promise = {
state:function() {
return state;
},
always:function() {
return deferred.done(arguments).fail(arguments), this;
},
then:function() {
var fns = arguments;
return jQuery.Deferred(function(newDefer) {
jQuery.each(tuples, function(i, tuple) {
var action = tuple[0], fn = fns[i];
deferred[tuple[1]](jQuery.isFunction(fn) ? function() {
var returned = fn.apply(this, arguments);
returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) :newDefer[action + "With"](this === deferred ? newDefer :this, [ returned ]);
} :newDefer[action]);
}), fns = null;
}).promise();
},
promise:function(obj) {
return "object" == typeof obj ? jQuery.extend(obj, promise) :promise;
}
}, deferred = {};
return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
var list = tuple[2], stateString = tuple[3];
promise[tuple[1]] = list.add, stateString && list.add(function() {
state = stateString;
}, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = list.fire, 
deferred[tuple[0] + "With"] = list.fireWith;
}), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
},
when:function(subordinate) {
var progressValues, progressContexts, resolveContexts, i = 0, resolveValues = core_slice.call(arguments), length = resolveValues.length, remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length :0, deferred = 1 === remaining ? subordinate :jQuery.Deferred(), updateFunc = function(i, contexts, values) {
return function(value) {
contexts[i] = this, values[i] = arguments.length > 1 ? core_slice.call(arguments) :value, 
values === progressValues ? deferred.notifyWith(contexts, values) :--remaining || deferred.resolveWith(contexts, values);
};
};
if (length > 1) for (progressValues = new Array(length), progressContexts = new Array(length), 
resolveContexts = new Array(length); length > i; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) :--remaining;
return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise();
}
}), jQuery.support = function() {
var support, all, a, select, opt, input, fragment, eventName, i, isSupported, clickFn, div = document.createElement("div");
if (div.setAttribute("className", "t"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
all = div.getElementsByTagName("*"), a = div.getElementsByTagName("a")[0], a.style.cssText = "top:1px;float:left;opacity:.5", 
!all || !all.length || !a) return {};
select = document.createElement("select"), opt = select.appendChild(document.createElement("option")), 
input = div.getElementsByTagName("input")[0], support = {
leadingWhitespace:3 === div.firstChild.nodeType,
tbody:!div.getElementsByTagName("tbody").length,
htmlSerialize:!!div.getElementsByTagName("link").length,
style:/top/.test(a.getAttribute("style")),
hrefNormalized:"/a" === a.getAttribute("href"),
opacity:/^0.5/.test(a.style.opacity),
cssFloat:!!a.style.cssFloat,
checkOn:"on" === input.value,
optSelected:opt.selected,
getSetAttribute:"t" !== div.className,
enctype:!!document.createElement("form").enctype,
html5Clone:"<:nav></:nav>" !== document.createElement("nav").cloneNode(!0).outerHTML,
boxModel:"CSS1Compat" === document.compatMode,
submitBubbles:!0,
changeBubbles:!0,
focusinBubbles:!1,
deleteExpando:!0,
noCloneEvent:!0,
inlineBlockNeedsLayout:!1,
shrinkWrapBlocks:!1,
reliableMarginRight:!0,
boxSizingReliable:!0,
pixelPosition:!1
}, input.checked = !0, support.noCloneChecked = input.cloneNode(!0).checked, select.disabled = !0, 
support.optDisabled = !opt.disabled;
try {
delete div.test;
} catch (e) {
support.deleteExpando = !1;
}
if (!div.addEventListener && div.attachEvent && div.fireEvent && (div.attachEvent("onclick", clickFn = function() {
support.noCloneEvent = !1;
}), div.cloneNode(!0).fireEvent("onclick"), div.detachEvent("onclick", clickFn)), 
input = document.createElement("input"), input.value = "t", input.setAttribute("type", "radio"), 
support.radioValue = "t" === input.value, input.setAttribute("checked", "checked"), 
input.setAttribute("name", "t"), div.appendChild(input), fragment = document.createDocumentFragment(), 
fragment.appendChild(div.lastChild), support.checkClone = fragment.cloneNode(!0).cloneNode(!0).lastChild.checked, 
support.appendChecked = input.checked, fragment.removeChild(input), fragment.appendChild(div), 
div.attachEvent) for (i in {
submit:!0,
change:!0,
focusin:!0
}) eventName = "on" + i, isSupported = eventName in div, isSupported || (div.setAttribute(eventName, "return;"), 
isSupported = "function" == typeof div[eventName]), support[i + "Bubbles"] = isSupported;
return jQuery(function() {
var container, div, tds, marginDiv, divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;", body = document.getElementsByTagName("body")[0];
body && (container = document.createElement("div"), container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", 
body.insertBefore(container, body.firstChild), div = document.createElement("div"), 
container.appendChild(div), div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", 
tds = div.getElementsByTagName("td"), tds[0].style.cssText = "padding:0;margin:0;border:0;display:none", 
isSupported = 0 === tds[0].offsetHeight, tds[0].style.display = "", tds[1].style.display = "none", 
support.reliableHiddenOffsets = isSupported && 0 === tds[0].offsetHeight, div.innerHTML = "", 
div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", 
support.boxSizing = 4 === div.offsetWidth, support.doesNotIncludeMarginInBodyOffset = 1 !== body.offsetTop, 
window.getComputedStyle && (support.pixelPosition = "1%" !== (window.getComputedStyle(div, null) || {}).top, 
support.boxSizingReliable = "4px" === (window.getComputedStyle(div, null) || {
width:"4px"
}).width, marginDiv = document.createElement("div"), marginDiv.style.cssText = div.style.cssText = divReset, 
marginDiv.style.marginRight = marginDiv.style.width = "0", div.style.width = "1px", 
div.appendChild(marginDiv), support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight)), 
"undefined" != typeof div.style.zoom && (div.innerHTML = "", div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1", 
support.inlineBlockNeedsLayout = 3 === div.offsetWidth, div.style.display = "block", 
div.style.overflow = "visible", div.innerHTML = "<div></div>", div.firstChild.style.width = "5px", 
support.shrinkWrapBlocks = 3 !== div.offsetWidth, container.style.zoom = 1), body.removeChild(container), 
container = div = tds = marginDiv = null);
}), fragment.removeChild(div), all = a = select = opt = input = fragment = div = null, 
support;
}();
var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, rmultiDash = /([A-Z])/g;
jQuery.extend({
cache:{},
deletedIds:[],
uuid:0,
expando:"jQuery" + (jQuery.fn.jquery + Math.random()).replace(/\D/g, ""),
noData:{
embed:!0,
object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
applet:!0
},
hasData:function(elem) {
return elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] :elem[jQuery.expando], 
!!elem && !isEmptyDataObject(elem);
},
data:function(elem, name, data, pvt) {
if (jQuery.acceptData(elem)) {
var thisCache, ret, internalKey = jQuery.expando, getByName = "string" == typeof name, isNode = elem.nodeType, cache = isNode ? jQuery.cache :elem, id = isNode ? elem[internalKey] :elem[internalKey] && internalKey;
if (id && cache[id] && (pvt || cache[id].data) || !getByName || data !== undefined) return id || (isNode ? elem[internalKey] = id = jQuery.deletedIds.pop() || ++jQuery.uuid :id = internalKey), 
cache[id] || (cache[id] = {}, isNode || (cache[id].toJSON = jQuery.noop)), ("object" == typeof name || "function" == typeof name) && (pvt ? cache[id] = jQuery.extend(cache[id], name) :cache[id].data = jQuery.extend(cache[id].data, name)), 
thisCache = cache[id], pvt || (thisCache.data || (thisCache.data = {}), thisCache = thisCache.data), 
data !== undefined && (thisCache[jQuery.camelCase(name)] = data), getByName ? (ret = thisCache[name], 
null == ret && (ret = thisCache[jQuery.camelCase(name)])) :ret = thisCache, ret;
}
},
removeData:function(elem, name, pvt) {
if (jQuery.acceptData(elem)) {
var thisCache, i, l, isNode = elem.nodeType, cache = isNode ? jQuery.cache :elem, id = isNode ? elem[jQuery.expando] :jQuery.expando;
if (cache[id]) {
if (name && (thisCache = pvt ? cache[id] :cache[id].data)) {
jQuery.isArray(name) || (name in thisCache ? name = [ name ] :(name = jQuery.camelCase(name), 
name = name in thisCache ? [ name ] :name.split(" ")));
for (i = 0, l = name.length; l > i; i++) delete thisCache[name[i]];
if (!(pvt ? isEmptyDataObject :jQuery.isEmptyObject)(thisCache)) return;
}
(pvt || (delete cache[id].data, isEmptyDataObject(cache[id]))) && (isNode ? jQuery.cleanData([ elem ], !0) :jQuery.support.deleteExpando || cache != cache.window ? delete cache[id] :cache[id] = null);
}
}
},
_data:function(elem, name, data) {
return jQuery.data(elem, name, data, !0);
},
acceptData:function(elem) {
var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];
return !noData || noData !== !0 && elem.getAttribute("classid") === noData;
}
}), jQuery.fn.extend({
data:function(key, value) {
var parts, part, attr, name, l, elem = this[0], i = 0, data = null;
if (key === undefined) {
if (this.length && (data = jQuery.data(elem), 1 === elem.nodeType && !jQuery._data(elem, "parsedAttrs"))) {
for (attr = elem.attributes, l = attr.length; l > i; i++) name = attr[i].name, 0 === name.indexOf("data-") && (name = jQuery.camelCase(name.substring(5)), 
dataAttr(elem, name, data[name]));
jQuery._data(elem, "parsedAttrs", !0);
}
return data;
}
return "object" == typeof key ? this.each(function() {
jQuery.data(this, key);
}) :(parts = key.split(".", 2), parts[1] = parts[1] ? "." + parts[1] :"", part = parts[1] + "!", 
jQuery.access(this, function(value) {
return value === undefined ? (data = this.triggerHandler("getData" + part, [ parts[0] ]), 
data === undefined && elem && (data = jQuery.data(elem, key), data = dataAttr(elem, key, data)), 
data === undefined && parts[1] ? this.data(parts[0]) :data) :(parts[1] = value, 
this.each(function() {
var self = jQuery(this);
self.triggerHandler("setData" + part, parts), jQuery.data(this, key, value), self.triggerHandler("changeData" + part, parts);
}), void 0);
}, null, value, arguments.length > 1, null, !1));
},
removeData:function(key) {
return this.each(function() {
jQuery.removeData(this, key);
});
}
}), jQuery.extend({
queue:function(elem, type, data) {
var queue;
return elem ? (type = (type || "fx") + "queue", queue = jQuery._data(elem, type), 
data && (!queue || jQuery.isArray(data) ? queue = jQuery._data(elem, type, jQuery.makeArray(data)) :queue.push(data)), 
queue || []) :void 0;
},
dequeue:function(elem, type) {
type = type || "fx";
var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
jQuery.dequeue(elem, type);
};
"inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), 
delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire();
},
_queueHooks:function(elem, type) {
var key = type + "queueHooks";
return jQuery._data(elem, key) || jQuery._data(elem, key, {
empty:jQuery.Callbacks("once memory").add(function() {
jQuery.removeData(elem, type + "queue", !0), jQuery.removeData(elem, key, !0);
})
});
}
}), jQuery.fn.extend({
queue:function(type, data) {
var setter = 2;
return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) :data === undefined ? this :this.each(function() {
var queue = jQuery.queue(this, type, data);
jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type);
});
},
dequeue:function(type) {
return this.each(function() {
jQuery.dequeue(this, type);
});
},
delay:function(time, type) {
return time = jQuery.fx ? jQuery.fx.speeds[time] || time :time, type = type || "fx", 
this.queue(type, function(next, hooks) {
var timeout = setTimeout(next, time);
hooks.stop = function() {
clearTimeout(timeout);
};
});
},
clearQueue:function(type) {
return this.queue(type || "fx", []);
},
promise:function(type, obj) {
var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
--count || defer.resolveWith(elements, [ elements ]);
};
for ("string" != typeof type && (obj = type, type = undefined), type = type || "fx"; i--; ) tmp = jQuery._data(elements[i], type + "queueHooks"), 
tmp && tmp.empty && (count++, tmp.empty.add(resolve));
return resolve(), defer.promise(obj);
}
});
var nodeHook, boolHook, fixSpecified, rclass = /[\t\r\n]/g, rreturn = /\r/g, rtype = /^(?:button|input)$/i, rfocusable = /^(?:button|input|object|select|textarea)$/i, rclickable = /^a(?:rea|)$/i, rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, getSetAttribute = jQuery.support.getSetAttribute;
jQuery.fn.extend({
attr:function(name, value) {
return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1);
},
removeAttr:function(name) {
return this.each(function() {
jQuery.removeAttr(this, name);
});
},
prop:function(name, value) {
return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1);
},
removeProp:function(name) {
return name = jQuery.propFix[name] || name, this.each(function() {
try {
this[name] = undefined, delete this[name];
} catch (e) {}
});
},
addClass:function(value) {
var classNames, i, l, elem, setClass, c, cl;
if (jQuery.isFunction(value)) return this.each(function(j) {
jQuery(this).addClass(value.call(this, j, this.className));
});
if (value && "string" == typeof value) for (classNames = value.split(core_rspace), 
i = 0, l = this.length; l > i; i++) if (elem = this[i], 1 === elem.nodeType) if (elem.className || 1 !== classNames.length) {
for (setClass = " " + elem.className + " ", c = 0, cl = classNames.length; cl > c; c++) ~setClass.indexOf(" " + classNames[c] + " ") || (setClass += classNames[c] + " ");
elem.className = jQuery.trim(setClass);
} else elem.className = value;
return this;
},
removeClass:function(value) {
var removes, className, elem, c, cl, i, l;
if (jQuery.isFunction(value)) return this.each(function(j) {
jQuery(this).removeClass(value.call(this, j, this.className));
});
if (value && "string" == typeof value || value === undefined) for (removes = (value || "").split(core_rspace), 
i = 0, l = this.length; l > i; i++) if (elem = this[i], 1 === elem.nodeType && elem.className) {
for (className = (" " + elem.className + " ").replace(rclass, " "), c = 0, cl = removes.length; cl > c; c++) for (;className.indexOf(" " + removes[c] + " ") > -1; ) className = className.replace(" " + removes[c] + " ", " ");
elem.className = value ? jQuery.trim(className) :"";
}
return this;
},
toggleClass:function(value, stateVal) {
var type = typeof value, isBool = "boolean" == typeof stateVal;
return jQuery.isFunction(value) ? this.each(function(i) {
jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
}) :this.each(function() {
if ("string" === type) for (var className, i = 0, self = jQuery(this), state = stateVal, classNames = value.split(core_rspace); className = classNames[i++]; ) state = isBool ? state :!self.hasClass(className), 
self[state ? "addClass" :"removeClass"](className); else ("undefined" === type || "boolean" === type) && (this.className && jQuery._data(this, "__className__", this.className), 
this.className = this.className || value === !1 ? "" :jQuery._data(this, "__className__") || "");
});
},
hasClass:function(selector) {
for (var className = " " + selector + " ", i = 0, l = this.length; l > i; i++) if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) > -1) return !0;
return !1;
},
val:function(value) {
var hooks, ret, isFunction, elem = this[0];
{
if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
var val, self = jQuery(this);
1 === this.nodeType && (val = isFunction ? value.call(this, i, self.val()) :value, 
null == val ? val = "" :"number" == typeof val ? val += "" :jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
return null == value ? "" :value + "";
})), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], 
hooks && "set" in hooks && hooks.set(this, val, "value") !== undefined || (this.value = val));
});
if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], 
hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined ? ret :(ret = elem.value, 
"string" == typeof ret ? ret.replace(rreturn, "") :null == ret ? "" :ret);
}
}
}), jQuery.extend({
valHooks:{
option:{
get:function(elem) {
var val = elem.attributes.value;
return !val || val.specified ? elem.value :elem.text;
}
},
select:{
get:function(elem) {
var value, i, max, option, index = elem.selectedIndex, values = [], options = elem.options, one = "select-one" === elem.type;
if (0 > index) return null;
for (i = one ? index :0, max = one ? index + 1 :options.length; max > i; i++) if (option = options[i], 
!(!option.selected || (jQuery.support.optDisabled ? option.disabled :null !== option.getAttribute("disabled")) || option.parentNode.disabled && jQuery.nodeName(option.parentNode, "optgroup"))) {
if (value = jQuery(option).val(), one) return value;
values.push(value);
}
return one && !values.length && options.length ? jQuery(options[index]).val() :values;
},
set:function(elem, value) {
var values = jQuery.makeArray(value);
return jQuery(elem).find("option").each(function() {
this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0;
}), values.length || (elem.selectedIndex = -1), values;
}
}
},
attrFn:{},
attr:function(elem, name, value, pass) {
var ret, hooks, notxml, nType = elem.nodeType;
if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return pass && jQuery.isFunction(jQuery.fn[name]) ? jQuery(elem)[name](value) :"undefined" == typeof elem.getAttribute ? jQuery.prop(elem, name, value) :(notxml = 1 !== nType || !jQuery.isXMLDoc(elem), 
notxml && (name = name.toLowerCase(), hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook :nodeHook)), 
value !== undefined ? null === value ? (jQuery.removeAttr(elem, name), void 0) :hooks && "set" in hooks && notxml && (ret = hooks.set(elem, value, name)) !== undefined ? ret :(elem.setAttribute(name, "" + value), 
value) :hooks && "get" in hooks && notxml && null !== (ret = hooks.get(elem, name)) ? ret :(ret = elem.getAttribute(name), 
null === ret ? undefined :ret));
},
removeAttr:function(elem, value) {
var propName, attrNames, name, isBool, i = 0;
if (value && 1 === elem.nodeType) for (attrNames = value.split(core_rspace); i < attrNames.length; i++) name = attrNames[i], 
name && (propName = jQuery.propFix[name] || name, isBool = rboolean.test(name), 
isBool || jQuery.attr(elem, name, ""), elem.removeAttribute(getSetAttribute ? name :propName), 
isBool && propName in elem && (elem[propName] = !1));
},
attrHooks:{
type:{
set:function(elem, value) {
if (rtype.test(elem.nodeName) && elem.parentNode) jQuery.error("type property can't be changed"); else if (!jQuery.support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
var val = elem.value;
return elem.setAttribute("type", value), val && (elem.value = val), value;
}
}
},
value:{
get:function(elem, name) {
return nodeHook && jQuery.nodeName(elem, "button") ? nodeHook.get(elem, name) :name in elem ? elem.value :null;
},
set:function(elem, value, name) {
return nodeHook && jQuery.nodeName(elem, "button") ? nodeHook.set(elem, value, name) :(elem.value = value, 
void 0);
}
}
},
propFix:{
tabindex:"tabIndex",
readonly:"readOnly",
"for":"htmlFor",
"class":"className",
maxlength:"maxLength",
cellspacing:"cellSpacing",
cellpadding:"cellPadding",
rowspan:"rowSpan",
colspan:"colSpan",
usemap:"useMap",
frameborder:"frameBorder",
contenteditable:"contentEditable"
},
prop:function(elem, name, value) {
var ret, hooks, notxml, nType = elem.nodeType;
if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return notxml = 1 !== nType || !jQuery.isXMLDoc(elem), 
notxml && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), 
value !== undefined ? hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret :elem[name] = value :hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret :elem[name];
},
propHooks:{
tabIndex:{
get:function(elem) {
var attributeNode = elem.getAttributeNode("tabindex");
return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) :rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 :undefined;
}
}
}
}), boolHook = {
get:function(elem, name) {
var attrNode, property = jQuery.prop(elem, name);
return property === !0 || "boolean" != typeof property && (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== !1 ? name.toLowerCase() :undefined;
},
set:function(elem, value, name) {
var propName;
return value === !1 ? jQuery.removeAttr(elem, name) :(propName = jQuery.propFix[name] || name, 
propName in elem && (elem[propName] = !0), elem.setAttribute(name, name.toLowerCase())), 
name;
}
}, getSetAttribute || (fixSpecified = {
name:!0,
id:!0,
coords:!0
}, nodeHook = jQuery.valHooks.button = {
get:function(elem, name) {
var ret;
return ret = elem.getAttributeNode(name), ret && (fixSpecified[name] ? "" !== ret.value :ret.specified) ? ret.value :undefined;
},
set:function(elem, value, name) {
var ret = elem.getAttributeNode(name);
return ret || (ret = document.createAttribute(name), elem.setAttributeNode(ret)), 
ret.value = value + "";
}
}, jQuery.each([ "width", "height" ], function(i, name) {
jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
set:function(elem, value) {
return "" === value ? (elem.setAttribute(name, "auto"), value) :void 0;
}
});
}), jQuery.attrHooks.contenteditable = {
get:nodeHook.get,
set:function(elem, value, name) {
"" === value && (value = "false"), nodeHook.set(elem, value, name);
}
}), jQuery.support.hrefNormalized || jQuery.each([ "href", "src", "width", "height" ], function(i, name) {
jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
get:function(elem) {
var ret = elem.getAttribute(name, 2);
return null === ret ? undefined :ret;
}
});
}), jQuery.support.style || (jQuery.attrHooks.style = {
get:function(elem) {
return elem.style.cssText.toLowerCase() || undefined;
},
set:function(elem, value) {
return elem.style.cssText = "" + value;
}
}), jQuery.support.optSelected || (jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
get:function(elem) {
var parent = elem.parentNode;
return parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex), 
null;
}
})), jQuery.support.enctype || (jQuery.propFix.enctype = "encoding"), jQuery.support.checkOn || jQuery.each([ "radio", "checkbox" ], function() {
jQuery.valHooks[this] = {
get:function(elem) {
return null === elem.getAttribute("value") ? "on" :elem.value;
}
};
}), jQuery.each([ "radio", "checkbox" ], function() {
jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
set:function(elem, value) {
return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 :void 0;
}
});
});
var rformElems = /^(?:textarea|input|select)$/i, rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/, rhoverHack = /(?:^|\s)hover(\.\S+|)\b/, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, hoverHack = function(events) {
return jQuery.event.special.hover ? events :events.replace(rhoverHack, "mouseenter$1 mouseleave$1");
};
jQuery.event = {
add:function(elem, types, handler, data, selector) {
var elemData, eventHandle, events, t, tns, type, namespaces, handleObj, handleObjIn, handlers, special;
if (3 !== elem.nodeType && 8 !== elem.nodeType && types && handler && (elemData = jQuery._data(elem))) {
for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, selector = handleObjIn.selector), 
handler.guid || (handler.guid = jQuery.guid++), events = elemData.events, events || (elemData.events = events = {}), 
eventHandle = elemData.handle, eventHandle || (elemData.handle = eventHandle = function(e) {
return "undefined" == typeof jQuery || e && jQuery.event.triggered === e.type ? undefined :jQuery.event.dispatch.apply(eventHandle.elem, arguments);
}, eventHandle.elem = elem), types = jQuery.trim(hoverHack(types)).split(" "), t = 0; t < types.length; t++) tns = rtypenamespace.exec(types[t]) || [], 
type = tns[1], namespaces = (tns[2] || "").split(".").sort(), special = jQuery.event.special[type] || {}, 
type = (selector ? special.delegateType :special.bindType) || type, special = jQuery.event.special[type] || {}, 
handleObj = jQuery.extend({
type:type,
origType:tns[1],
data:data,
handler:handler,
guid:handler.guid,
selector:selector,
namespace:namespaces.join(".")
}, handleObjIn), handlers = events[type], handlers || (handlers = events[type] = [], 
handlers.delegateCount = 0, special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || (elem.addEventListener ? elem.addEventListener(type, eventHandle, !1) :elem.attachEvent && elem.attachEvent("on" + type, eventHandle))), 
special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), 
selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) :handlers.push(handleObj), 
jQuery.event.global[type] = !0;
elem = null;
}
},
global:{},
remove:function(elem, types, handler, selector, mappedTypes) {
var t, tns, type, origType, namespaces, origCount, j, events, special, eventType, handleObj, elemData = jQuery.hasData(elem) && jQuery._data(elem);
if (elemData && (events = elemData.events)) {
for (types = jQuery.trim(hoverHack(types || "")).split(" "), t = 0; t < types.length; t++) if (tns = rtypenamespace.exec(types[t]) || [], 
type = origType = tns[1], namespaces = tns[2], type) {
for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType :special.bindType) || type, 
eventType = events[type] || [], origCount = eventType.length, namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") :null, 
j = 0; j < eventType.length; j++) handleObj = eventType[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || namespaces && !namespaces.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (eventType.splice(j--, 1), 
handleObj.selector && eventType.delegateCount--, special.remove && special.remove.call(elem, handleObj));
0 === eventType.length && origCount !== eventType.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), 
delete events[type]);
} else for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
jQuery.isEmptyObject(events) && (delete elemData.handle, jQuery.removeData(elem, "events", !0));
}
},
customEvent:{
getData:!0,
setData:!0,
changeData:!0
},
trigger:function(event, data, elem, onlyHandlers) {
if (!elem || 3 !== elem.nodeType && 8 !== elem.nodeType) {
var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType, type = event.type || event, namespaces = [];
if (!rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf("!") >= 0 && (type = type.slice(0, -1), 
exclusive = !0), type.indexOf(".") >= 0 && (namespaces = type.split("."), type = namespaces.shift(), 
namespaces.sort()), elem && !jQuery.event.customEvent[type] || jQuery.event.global[type])) if (event = "object" == typeof event ? event[jQuery.expando] ? event :new jQuery.Event(type, event) :new jQuery.Event(type), 
event.type = type, event.isTrigger = !0, event.exclusive = exclusive, event.namespace = namespaces.join("."), 
event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :null, 
ontype = type.indexOf(":") < 0 ? "on" + type :"", elem) {
if (event.result = undefined, event.target || (event.target = elem), data = null != data ? jQuery.makeArray(data) :[], 
data.unshift(event), special = jQuery.event.special[type] || {}, !special.trigger || special.trigger.apply(elem, data) !== !1) {
if (eventPath = [ [ elem, special.bindType || type ] ], !onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
for (bubbleType = special.delegateType || type, cur = rfocusMorph.test(bubbleType + type) ? elem :elem.parentNode, 
old = elem; cur; cur = cur.parentNode) eventPath.push([ cur, bubbleType ]), old = cur;
old === (elem.ownerDocument || document) && eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
}
for (i = 0; i < eventPath.length && !event.isPropagationStopped(); i++) cur = eventPath[i][0], 
event.type = eventPath[i][1], handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle"), 
handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && jQuery.acceptData(cur) && handle.apply(cur, data) === !1 && event.preventDefault();
return event.type = type, onlyHandlers || event.isDefaultPrevented() || special._default && special._default.apply(elem.ownerDocument, data) !== !1 || "click" === type && jQuery.nodeName(elem, "a") || !jQuery.acceptData(elem) || ontype && elem[type] && ("focus" !== type && "blur" !== type || 0 !== event.target.offsetWidth) && !jQuery.isWindow(elem) && (old = elem[ontype], 
old && (elem[ontype] = null), jQuery.event.triggered = type, elem[type](), jQuery.event.triggered = undefined, 
old && (elem[ontype] = old)), event.result;
}
} else {
cache = jQuery.cache;
for (i in cache) cache[i].events && cache[i].events[type] && jQuery.event.trigger(event, data, cache[i].handle.elem, !0);
}
}
},
dispatch:function(event) {
event = jQuery.event.fix(event || window.event);
var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, handlers = (jQuery._data(this, "events") || {})[event.type] || [], delegateCount = handlers.delegateCount, args = [].slice.call(arguments), run_all = !event.exclusive && !event.namespace, special = jQuery.event.special[event.type] || {}, handlerQueue = [];
if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
if (delegateCount && (!event.button || "click" !== event.type)) for (cur = event.target; cur != this; cur = cur.parentNode || this) if (cur.disabled !== !0 || "click" !== event.type) {
for (selMatch = {}, matches = [], i = 0; delegateCount > i; i++) handleObj = handlers[i], 
sel = handleObj.selector, selMatch[sel] === undefined && (selMatch[sel] = jQuery(sel, this).index(cur) >= 0), 
selMatch[sel] && matches.push(handleObj);
matches.length && handlerQueue.push({
elem:cur,
matches:matches
});
}
for (handlers.length > delegateCount && handlerQueue.push({
elem:this,
matches:handlers.slice(delegateCount)
}), i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++) for (matched = handlerQueue[i], 
event.currentTarget = matched.elem, j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++) handleObj = matched.matches[j], 
(run_all || !event.namespace && !handleObj.namespace || event.namespace_re && event.namespace_re.test(handleObj.namespace)) && (event.data = handleObj.data, 
event.handleObj = handleObj, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), 
ret !== undefined && (event.result = ret, ret === !1 && (event.preventDefault(), 
event.stopPropagation())));
return special.postDispatch && special.postDispatch.call(this, event), event.result;
}
},
props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
fixHooks:{},
keyHooks:{
props:"char charCode key keyCode".split(" "),
filter:function(event, original) {
return null == event.which && (event.which = null != original.charCode ? original.charCode :original.keyCode), 
event;
}
},
mouseHooks:{
props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
filter:function(event, original) {
var eventDoc, doc, body, button = original.button, fromElement = original.fromElement;
return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, 
doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), 
event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), 
!event.relatedTarget && fromElement && (event.relatedTarget = fromElement === event.target ? original.toElement :fromElement), 
event.which || button === undefined || (event.which = 1 & button ? 1 :2 & button ? 3 :4 & button ? 2 :0), 
event;
}
},
fix:function(event) {
if (event[jQuery.expando]) return event;
var i, prop, originalEvent = event, fixHook = jQuery.event.fixHooks[event.type] || {}, copy = fixHook.props ? this.props.concat(fixHook.props) :this.props;
for (event = jQuery.Event(originalEvent), i = copy.length; i; ) prop = copy[--i], 
event[prop] = originalEvent[prop];
return event.target || (event.target = originalEvent.srcElement || document), 3 === event.target.nodeType && (event.target = event.target.parentNode), 
event.metaKey = !!event.metaKey, fixHook.filter ? fixHook.filter(event, originalEvent) :event;
},
special:{
load:{
noBubble:!0
},
focus:{
delegateType:"focusin"
},
blur:{
delegateType:"focusout"
},
beforeunload:{
setup:function(data, namespaces, eventHandle) {
jQuery.isWindow(this) && (this.onbeforeunload = eventHandle);
},
teardown:function(namespaces, eventHandle) {
this.onbeforeunload === eventHandle && (this.onbeforeunload = null);
}
}
},
simulate:function(type, elem, event, bubble) {
var e = jQuery.extend(new jQuery.Event(), event, {
type:type,
isSimulated:!0,
originalEvent:{}
});
bubble ? jQuery.event.trigger(e, null, elem) :jQuery.event.dispatch.call(elem, e), 
e.isDefaultPrevented() && event.preventDefault();
}
}, jQuery.event.handle = jQuery.event.dispatch, jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
elem.removeEventListener && elem.removeEventListener(type, handle, !1);
} :function(elem, type, handle) {
var name = "on" + type;
elem.detachEvent && ("undefined" == typeof elem[name] && (elem[name] = null), elem.detachEvent(name, handle));
}, jQuery.Event = function(src, props) {
return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, 
this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || src.returnValue === !1 || src.getPreventDefault && src.getPreventDefault() ? returnTrue :returnFalse) :this.type = src, 
props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), 
this[jQuery.expando] = !0, void 0) :new jQuery.Event(src, props);
}, jQuery.Event.prototype = {
preventDefault:function() {
this.isDefaultPrevented = returnTrue;
var e = this.originalEvent;
e && (e.preventDefault ? e.preventDefault() :e.returnValue = !1);
},
stopPropagation:function() {
this.isPropagationStopped = returnTrue;
var e = this.originalEvent;
e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0);
},
stopImmediatePropagation:function() {
this.isImmediatePropagationStopped = returnTrue, this.stopPropagation();
},
isDefaultPrevented:returnFalse,
isPropagationStopped:returnFalse,
isImmediatePropagationStopped:returnFalse
}, jQuery.each({
mouseenter:"mouseover",
mouseleave:"mouseout"
}, function(orig, fix) {
jQuery.event.special[orig] = {
delegateType:fix,
bindType:fix,
handle:function(event) {
{
var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
handleObj.selector;
}
return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, 
ret = handleObj.handler.apply(this, arguments), event.type = fix), ret;
}
};
}), jQuery.support.submitBubbles || (jQuery.event.special.submit = {
setup:function() {
return jQuery.nodeName(this, "form") ? !1 :(jQuery.event.add(this, "click._submit keypress._submit", function(e) {
var elem = e.target, form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form :undefined;
form && !jQuery._data(form, "_submit_attached") && (jQuery.event.add(form, "submit._submit", function(event) {
event._submit_bubble = !0;
}), jQuery._data(form, "_submit_attached", !0));
}), void 0);
},
postDispatch:function(event) {
event._submit_bubble && (delete event._submit_bubble, this.parentNode && !event.isTrigger && jQuery.event.simulate("submit", this.parentNode, event, !0));
},
teardown:function() {
return jQuery.nodeName(this, "form") ? !1 :(jQuery.event.remove(this, "._submit"), 
void 0);
}
}), jQuery.support.changeBubbles || (jQuery.event.special.change = {
setup:function() {
return rformElems.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (jQuery.event.add(this, "propertychange._change", function(event) {
"checked" === event.originalEvent.propertyName && (this._just_changed = !0);
}), jQuery.event.add(this, "click._change", function(event) {
this._just_changed && !event.isTrigger && (this._just_changed = !1), jQuery.event.simulate("change", this, event, !0);
})), !1) :(jQuery.event.add(this, "beforeactivate._change", function(e) {
var elem = e.target;
rformElems.test(elem.nodeName) && !jQuery._data(elem, "_change_attached") && (jQuery.event.add(elem, "change._change", function(event) {
!this.parentNode || event.isSimulated || event.isTrigger || jQuery.event.simulate("change", this.parentNode, event, !0);
}), jQuery._data(elem, "_change_attached", !0));
}), void 0);
},
handle:function(event) {
var elem = event.target;
return this !== elem || event.isSimulated || event.isTrigger || "radio" !== elem.type && "checkbox" !== elem.type ? event.handleObj.handler.apply(this, arguments) :void 0;
},
teardown:function() {
return jQuery.event.remove(this, "._change"), !rformElems.test(this.nodeName);
}
}), jQuery.support.focusinBubbles || jQuery.each({
focus:"focusin",
blur:"focusout"
}, function(orig, fix) {
var attaches = 0, handler = function(event) {
jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0);
};
jQuery.event.special[fix] = {
setup:function() {
0 === attaches++ && document.addEventListener(orig, handler, !0);
},
teardown:function() {
0 === --attaches && document.removeEventListener(orig, handler, !0);
}
};
}), jQuery.fn.extend({
on:function(types, selector, data, fn, one) {
var origFn, type;
if ("object" == typeof types) {
"string" != typeof selector && (data = data || selector, selector = undefined);
for (type in types) this.on(type, selector, data, types[type], one);
return this;
}
if (null == data && null == fn ? (fn = selector, data = selector = undefined) :null == fn && ("string" == typeof selector ? (fn = data, 
data = undefined) :(fn = data, data = selector, selector = undefined)), fn === !1) fn = returnFalse; else if (!fn) return this;
return 1 === one && (origFn = fn, fn = function(event) {
return jQuery().off(event), origFn.apply(this, arguments);
}, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function() {
jQuery.event.add(this, types, fn, data, selector);
});
},
one:function(types, selector, data, fn) {
return this.on(types, selector, data, fn, 1);
},
off:function(types, selector, fn) {
var handleObj, type;
if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, 
jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace :handleObj.origType, handleObj.selector, handleObj.handler), 
this;
if ("object" == typeof types) {
for (type in types) this.off(type, selector, types[type]);
return this;
}
return (selector === !1 || "function" == typeof selector) && (fn = selector, selector = undefined), 
fn === !1 && (fn = returnFalse), this.each(function() {
jQuery.event.remove(this, types, fn, selector);
});
},
bind:function(types, data, fn) {
return this.on(types, null, data, fn);
},
unbind:function(types, fn) {
return this.off(types, null, fn);
},
live:function(types, data, fn) {
return jQuery(this.context).on(types, this.selector, data, fn), this;
},
die:function(types, fn) {
return jQuery(this.context).off(types, this.selector || "**", fn), this;
},
delegate:function(selector, types, data, fn) {
return this.on(types, selector, data, fn);
},
undelegate:function(selector, types, fn) {
return 1 == arguments.length ? this.off(selector, "**") :this.off(types, selector || "**", fn);
},
trigger:function(type, data) {
return this.each(function() {
jQuery.event.trigger(type, data, this);
});
},
triggerHandler:function(type, data) {
return this[0] ? jQuery.event.trigger(type, data, this[0], !0) :void 0;
},
toggle:function(fn) {
var args = arguments, guid = fn.guid || jQuery.guid++, i = 0, toggler = function(event) {
var lastToggle = (jQuery._data(this, "lastToggle" + fn.guid) || 0) % i;
return jQuery._data(this, "lastToggle" + fn.guid, lastToggle + 1), event.preventDefault(), 
args[lastToggle].apply(this, arguments) || !1;
};
for (toggler.guid = guid; i < args.length; ) args[i++].guid = guid;
return this.click(toggler);
},
hover:function(fnOver, fnOut) {
return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
}
}), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
jQuery.fn[name] = function(data, fn) {
return null == fn && (fn = data, data = null), arguments.length > 0 ? this.on(name, null, data, fn) :this.trigger(name);
}, rkeyEvent.test(name) && (jQuery.event.fixHooks[name] = jQuery.event.keyHooks), 
rmouseEvent.test(name) && (jQuery.event.fixHooks[name] = jQuery.event.mouseHooks);
}), /*!
 * Sizzle CSS Selector Engine
 *  Copyright 2012 jQuery Foundation and other contributors
 *  Released under the MIT license
 *  http://sizzlejs.com/
 */
function(window, undefined) {
function Sizzle(selector, context, results, seed) {
results = results || [], context = context || document;
var match, elem, xml, m, nodeType = context.nodeType;
if (1 !== nodeType && 9 !== nodeType) return [];
if (!selector || "string" != typeof selector) return results;
if (xml = isXML(context), !xml && !seed && (match = rquickExpr.exec(selector))) if (m = match[1]) {
if (9 === nodeType) {
if (elem = context.getElementById(m), !elem || !elem.parentNode) return results;
if (elem.id === m) return results.push(elem), results;
} else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), 
results;
} else {
if (match[2]) return push.apply(results, slice.call(context.getElementsByTagName(selector), 0)), 
results;
if ((m = match[3]) && assertUsableClassName && context.getElementsByClassName) return push.apply(results, slice.call(context.getElementsByClassName(m), 0)), 
results;
}
return select(selector, context, results, seed, xml);
}
function createInputPseudo(type) {
return function(elem) {
var name = elem.nodeName.toLowerCase();
return "input" === name && elem.type === type;
};
}
function createButtonPseudo(type) {
return function(elem) {
var name = elem.nodeName.toLowerCase();
return ("input" === name || "button" === name) && elem.type === type;
};
}
function siblingCheck(a, b, ret) {
if (a === b) return ret;
for (var cur = a.nextSibling; cur; ) {
if (cur === b) return -1;
cur = cur.nextSibling;
}
return 1;
}
function tokenize(selector, context, xml, parseOnly) {
var matched, match, tokens, type, soFar, groups, group, i, preFilters, filters, checkContext = !xml && context !== document, key = (checkContext ? "<s>" :"") + selector.replace(rtrim, "$1<s>"), cached = tokenCache[expando][key];
if (cached) return parseOnly ? 0 :slice.call(cached, 0);
for (soFar = selector, groups = [], i = 0, preFilters = Expr.preFilter, filters = Expr.filter; soFar; ) {
(!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length), 
tokens.selector = group), groups.push(tokens = []), group = "", checkContext && (soFar = " " + soFar)), 
matched = !1, (match = rcombinators.exec(soFar)) && (group += match[0], soFar = soFar.slice(match[0].length), 
matched = tokens.push({
part:match.pop().replace(rtrim, " "),
string:match[0],
captures:match
}));
for (type in filters) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match, context, xml)) || (group += match[0], 
soFar = soFar.slice(match[0].length), matched = tokens.push({
part:type,
string:match.shift(),
captures:match
}));
if (!matched) break;
}
return group && (tokens.selector = group), parseOnly ? soFar.length :soFar ? Sizzle.error(selector) :slice.call(tokenCache(key, groups), 0);
}
function addCombinator(matcher, combinator, context, xml) {
var dir = combinator.dir, doneName = done++;
return matcher || (matcher = function(elem) {
return elem === context;
}), combinator.first ? function(elem) {
for (;elem = elem[dir]; ) if (1 === elem.nodeType) return matcher(elem) && elem;
} :xml ? function(elem) {
for (;elem = elem[dir]; ) if (1 === elem.nodeType && matcher(elem)) return elem;
} :function(elem) {
for (var cache, dirkey = doneName + "." + dirruns, cachedkey = dirkey + "." + cachedruns; elem = elem[dir]; ) if (1 === elem.nodeType) {
if ((cache = elem[expando]) === cachedkey) return elem.sizset;
if ("string" == typeof cache && 0 === cache.indexOf(dirkey)) {
if (elem.sizset) return elem;
} else {
if (elem[expando] = cachedkey, matcher(elem)) return elem.sizset = !0, elem;
elem.sizset = !1;
}
}
};
}
function addMatcher(higher, deeper) {
return higher ? function(elem) {
var result = deeper(elem);
return result && higher(result === !0 ? elem :result);
} :deeper;
}
function matcherFromTokens(tokens, context, xml) {
for (var token, matcher, i = 0; token = tokens[i]; i++) matcher = Expr.relative[token.part] ? addCombinator(matcher, Expr.relative[token.part], context, xml) :addMatcher(matcher, Expr.filter[token.part].apply(null, token.captures.concat(context, xml)));
return matcher;
}
function matcherFromGroupMatchers(matchers) {
return function(elem) {
for (var matcher, j = 0; matcher = matchers[j]; j++) if (matcher(elem)) return !0;
return !1;
};
}
function multipleContexts(selector, contexts, results, seed) {
for (var i = 0, len = contexts.length; len > i; i++) Sizzle(selector, contexts[i], results, seed);
}
function handlePOSGroup(selector, posfilter, argument, contexts, seed, not) {
var results, fn = Expr.setFilters[posfilter.toLowerCase()];
return fn || Sizzle.error(posfilter), (selector || !(results = seed)) && multipleContexts(selector || "*", contexts, results = [], seed), 
results.length > 0 ? fn(results, argument, not) :[];
}
function handlePOS(groups, context, results, seed) {
for (var group, part, j, groupLen, token, selector, anchor, elements, match, matched, lastIndex, currentContexts, not, i = 0, len = groups.length, rpos = matchExpr.POS, rposgroups = new RegExp("^" + rpos.source + "(?!" + whitespace + ")", "i"), setUndefined = function() {
for (var i = 1, len = arguments.length - 2; len > i; i++) arguments[i] === undefined && (match[i] = undefined);
}; len > i; i++) {
for (group = groups[i], part = "", elements = seed, j = 0, groupLen = group.length; groupLen > j; j++) {
if (token = group[j], selector = token.string, "PSEUDO" === token.part) for (rpos.exec(""), 
anchor = 0; match = rpos.exec(selector); ) matched = !0, lastIndex = rpos.lastIndex = match.index + match[0].length, 
lastIndex > anchor && (part += selector.slice(anchor, match.index), anchor = lastIndex, 
currentContexts = [ context ], rcombinators.test(part) && (elements && (currentContexts = elements), 
elements = seed), (not = rendsWithNot.test(part)) && (part = part.slice(0, -5).replace(rcombinators, "$&*"), 
anchor++), match.length > 1 && match[0].replace(rposgroups, setUndefined), elements = handlePOSGroup(part, match[1], match[2], currentContexts, elements, not)), 
part = "";
matched || (part += selector), matched = !1;
}
part ? rcombinators.test(part) ? multipleContexts(part, elements || [ context ], results, seed) :Sizzle(part, context, results, seed ? seed.concat(elements) :elements) :push.apply(results, elements);
}
return 1 === len ? results :Sizzle.uniqueSort(results);
}
function select(selector, context, results, seed, xml) {
selector = selector.replace(rtrim, "$1");
var elements, matcher, elem, i, tokens, token, lastToken, findContext, type, match = tokenize(selector, context, xml), contextNodeType = context.nodeType;
if (matchExpr.POS.test(selector)) return handlePOS(match, context, results, seed);
if (seed) elements = slice.call(seed, 0); else if (1 === match.length) {
if ((tokens = slice.call(match[0], 0)).length > 2 && "ID" === (token = tokens[0]).part && 9 === contextNodeType && !xml && Expr.relative[tokens[1].part]) {
if (context = Expr.find.ID(token.captures[0].replace(rbackslash, ""), context, xml)[0], 
!context) return results;
selector = selector.slice(tokens.shift().string.length);
}
for (findContext = (match = rsibling.exec(tokens[0].string)) && !match.index && context.parentNode || context, 
lastToken = "", i = tokens.length - 1; i >= 0 && (token = tokens[i], type = token.part, 
lastToken = token.string + lastToken, !Expr.relative[type]); i--) if (Expr.order.test(type)) {
if (elements = Expr.find[type](token.captures[0].replace(rbackslash, ""), findContext, xml), 
null == elements) continue;
selector = selector.slice(0, selector.length - lastToken.length) + lastToken.replace(matchExpr[type], ""), 
selector || push.apply(results, slice.call(elements, 0));
break;
}
}
if (selector) for (matcher = compile(selector, context, xml), dirruns = matcher.dirruns++, 
null == elements && (elements = Expr.find.TAG("*", rsibling.test(selector) && context.parentNode || context)), 
i = 0; elem = elements[i]; i++) cachedruns = matcher.runs++, matcher(elem) && results.push(elem);
return results;
}
var dirruns, cachedruns, assertGetIdNotName, Expr, getText, isXML, contains, compile, sortOrder, hasDuplicate, baseHasDuplicate = !0, strundefined = "undefined", expando = ("sizcache" + Math.random()).replace(".", ""), document = window.document, docElem = document.documentElement, done = 0, slice = [].slice, push = [].push, markFunction = function(fn, value) {
return fn[expando] = value || !0, fn;
}, createCache = function() {
var cache = {}, keys = [];
return markFunction(function(key, value) {
return keys.push(key) > Expr.cacheLength && delete cache[keys.shift()], cache[key] = value;
}, cache);
}, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), operators = "([*^$|!~]?=)", attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)", pos = ":(nth|eq|gt|lt|first|last|even|odd)(?:\\(((?:-\\d)?\\d*)\\)|)(?=[^-]|$)", rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*"), rpseudo = new RegExp(pseudos), rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, rsibling = /[\x20\t\r\n\f]*[+~]/, rendsWithNot = /:not\($/, rheader = /h\d/i, rinputs = /input|select|textarea|button/i, rbackslash = /\\(?!\\)/g, matchExpr = {
ID:new RegExp("^#(" + characterEncoding + ")"),
CLASS:new RegExp("^\\.(" + characterEncoding + ")"),
NAME:new RegExp("^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"),
TAG:new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
ATTR:new RegExp("^" + attributes),
PSEUDO:new RegExp("^" + pseudos),
CHILD:new RegExp("^:(only|nth|last|first)-child(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
POS:new RegExp(pos, "ig"),
needsContext:new RegExp("^" + whitespace + "*[>+~]|" + pos, "i")
}, assert = function(fn) {
var div = document.createElement("div");
try {
return fn(div);
} catch (e) {
return !1;
} finally {
div = null;
}
}, assertTagNameNoComments = assert(function(div) {
return div.appendChild(document.createComment("")), !div.getElementsByTagName("*").length;
}), assertHrefNotNormalized = assert(function(div) {
return div.innerHTML = "<a href='#'></a>", div.firstChild && typeof div.firstChild.getAttribute !== strundefined && "#" === div.firstChild.getAttribute("href");
}), assertAttributes = assert(function(div) {
div.innerHTML = "<select></select>";
var type = typeof div.lastChild.getAttribute("multiple");
return "boolean" !== type && "string" !== type;
}), assertUsableClassName = assert(function(div) {
return div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", 
div.getElementsByClassName && div.getElementsByClassName("e").length ? (div.lastChild.className = "e", 
2 === div.getElementsByClassName("e").length) :!1;
}), assertUsableName = assert(function(div) {
div.id = expando + 0, div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>", 
docElem.insertBefore(div, docElem.firstChild);
var pass = document.getElementsByName && document.getElementsByName(expando).length === 2 + document.getElementsByName(expando + 0).length;
return assertGetIdNotName = !document.getElementById(expando), docElem.removeChild(div), 
pass;
});
try {
slice.call(docElem.childNodes, 0)[0].nodeType;
} catch (e) {
slice = function(i) {
for (var elem, results = []; elem = this[i]; i++) results.push(elem);
return results;
};
}
Sizzle.matches = function(expr, elements) {
return Sizzle(expr, null, null, elements);
}, Sizzle.matchesSelector = function(elem, expr) {
return Sizzle(expr, null, null, [ elem ]).length > 0;
}, getText = Sizzle.getText = function(elem) {
var node, ret = "", i = 0, nodeType = elem.nodeType;
if (nodeType) {
if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
if ("string" == typeof elem.textContent) return elem.textContent;
for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem);
} else if (3 === nodeType || 4 === nodeType) return elem.nodeValue;
} else for (;node = elem[i]; i++) ret += getText(node);
return ret;
}, isXML = Sizzle.isXML = function(elem) {
var documentElement = elem && (elem.ownerDocument || elem).documentElement;
return documentElement ? "HTML" !== documentElement.nodeName :!1;
}, contains = Sizzle.contains = docElem.contains ? function(a, b) {
var adown = 9 === a.nodeType ? a.documentElement :a, bup = b && b.parentNode;
return a === bup || !!(bup && 1 === bup.nodeType && adown.contains && adown.contains(bup));
} :docElem.compareDocumentPosition ? function(a, b) {
return b && !!(16 & a.compareDocumentPosition(b));
} :function(a, b) {
for (;b = b.parentNode; ) if (b === a) return !0;
return !1;
}, Sizzle.attr = function(elem, name) {
var attr, xml = isXML(elem);
return xml || (name = name.toLowerCase()), Expr.attrHandle[name] ? Expr.attrHandle[name](elem) :assertAttributes || xml ? elem.getAttribute(name) :(attr = elem.getAttributeNode(name), 
attr ? "boolean" == typeof elem[name] ? elem[name] ? name :null :attr.specified ? attr.value :null :null);
}, Expr = Sizzle.selectors = {
cacheLength:50,
createPseudo:markFunction,
match:matchExpr,
order:new RegExp("ID|TAG" + (assertUsableName ? "|NAME" :"") + (assertUsableClassName ? "|CLASS" :"")),
attrHandle:assertHrefNotNormalized ? {} :{
href:function(elem) {
return elem.getAttribute("href", 2);
},
type:function(elem) {
return elem.getAttribute("type");
}
},
find:{
ID:assertGetIdNotName ? function(id, context, xml) {
if (typeof context.getElementById !== strundefined && !xml) {
var m = context.getElementById(id);
return m && m.parentNode ? [ m ] :[];
}
} :function(id, context, xml) {
if (typeof context.getElementById !== strundefined && !xml) {
var m = context.getElementById(id);
return m ? m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ? [ m ] :undefined :[];
}
},
TAG:assertTagNameNoComments ? function(tag, context) {
return typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag) :void 0;
} :function(tag, context) {
var results = context.getElementsByTagName(tag);
if ("*" === tag) {
for (var elem, tmp = [], i = 0; elem = results[i]; i++) 1 === elem.nodeType && tmp.push(elem);
return tmp;
}
return results;
},
NAME:function(tag, context) {
return typeof context.getElementsByName !== strundefined ? context.getElementsByName(name) :void 0;
},
CLASS:function(className, context, xml) {
return typeof context.getElementsByClassName === strundefined || xml ? void 0 :context.getElementsByClassName(className);
}
},
relative:{
">":{
dir:"parentNode",
first:!0
},
" ":{
dir:"parentNode"
},
"+":{
dir:"previousSibling",
first:!0
},
"~":{
dir:"previousSibling"
}
},
preFilter:{
ATTR:function(match) {
return match[1] = match[1].replace(rbackslash, ""), match[3] = (match[4] || match[5] || "").replace(rbackslash, ""), 
"~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4);
},
CHILD:function(match) {
return match[1] = match[1].toLowerCase(), "nth" === match[1] ? (match[2] || Sizzle.error(match[0]), 
match[3] = +(match[3] ? match[4] + (match[5] || 1) :2 * ("even" === match[2] || "odd" === match[2])), 
match[4] = +(match[6] + match[7] || "odd" === match[2])) :match[2] && Sizzle.error(match[0]), 
match;
},
PSEUDO:function(match, context, xml) {
var unquoted, excess;
return matchExpr.CHILD.test(match[0]) ? null :(match[3] ? match[2] = match[3] :(unquoted = match[4]) && (rpseudo.test(unquoted) && (excess = tokenize(unquoted, context, xml, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (unquoted = unquoted.slice(0, excess), 
match[0] = match[0].slice(0, excess)), match[2] = unquoted), match.slice(0, 3));
}
},
filter:{
ID:assertGetIdNotName ? function(id) {
return id = id.replace(rbackslash, ""), function(elem) {
return elem.getAttribute("id") === id;
};
} :function(id) {
return id = id.replace(rbackslash, ""), function(elem) {
var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
return node && node.value === id;
};
},
TAG:function(nodeName) {
return "*" === nodeName ? function() {
return !0;
} :(nodeName = nodeName.replace(rbackslash, "").toLowerCase(), function(elem) {
return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
});
},
CLASS:function(className) {
var pattern = classCache[expando][className];
return pattern || (pattern = classCache(className, new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)"))), 
function(elem) {
return pattern.test(elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "");
};
},
ATTR:function(name, operator, check) {
return operator ? function(elem) {
var result = Sizzle.attr(elem, name), value = result + "";
if (null == result) return "!=" === operator;
switch (operator) {
case "=":
return value === check;

case "!=":
return value !== check;

case "^=":
return check && 0 === value.indexOf(check);

case "*=":
return check && value.indexOf(check) > -1;

case "$=":
return check && value.substr(value.length - check.length) === check;

case "~=":
return (" " + value + " ").indexOf(check) > -1;

case "|=":
return value === check || value.substr(0, check.length + 1) === check + "-";
}
} :function(elem) {
return null != Sizzle.attr(elem, name);
};
},
CHILD:function(type, argument, first, last) {
if ("nth" === type) {
var doneName = done++;
return function(elem) {
var parent, diff, count = 0, node = elem;
if (1 === first && 0 === last) return !0;
if (parent = elem.parentNode, parent && (parent[expando] !== doneName || !elem.sizset)) {
for (node = parent.firstChild; node && (1 !== node.nodeType || (node.sizset = ++count, 
node !== elem)); node = node.nextSibling) ;
parent[expando] = doneName;
}
return diff = elem.sizset - last, 0 === first ? 0 === diff :diff % first === 0 && diff / first >= 0;
};
}
return function(elem) {
var node = elem;
switch (type) {
case "only":
case "first":
for (;node = node.previousSibling; ) if (1 === node.nodeType) return !1;
if ("first" === type) return !0;
node = elem;

case "last":
for (;node = node.nextSibling; ) if (1 === node.nodeType) return !1;
return !0;
}
};
},
PSEUDO:function(pseudo, argument, context, xml) {
var args, fn = Expr.pseudos[pseudo] || Expr.pseudos[pseudo.toLowerCase()];
return fn || Sizzle.error("unsupported pseudo: " + pseudo), fn[expando] ? fn(argument, context, xml) :fn.length > 1 ? (args = [ pseudo, pseudo, "", argument ], 
function(elem) {
return fn(elem, 0, args);
}) :fn;
}
},
pseudos:{
not:markFunction(function(selector, context, xml) {
var matcher = compile(selector.replace(rtrim, "$1"), context, xml);
return function(elem) {
return !matcher(elem);
};
}),
enabled:function(elem) {
return elem.disabled === !1;
},
disabled:function(elem) {
return elem.disabled === !0;
},
checked:function(elem) {
var nodeName = elem.nodeName.toLowerCase();
return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected;
},
selected:function(elem) {
return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0;
},
parent:function(elem) {
return !Expr.pseudos.empty(elem);
},
empty:function(elem) {
var nodeType;
for (elem = elem.firstChild; elem; ) {
if (elem.nodeName > "@" || 3 === (nodeType = elem.nodeType) || 4 === nodeType) return !1;
elem = elem.nextSibling;
}
return !0;
},
contains:markFunction(function(text) {
return function(elem) {
return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
};
}),
has:markFunction(function(selector) {
return function(elem) {
return Sizzle(selector, elem).length > 0;
};
}),
header:function(elem) {
return rheader.test(elem.nodeName);
},
text:function(elem) {
var type, attr;
return "input" === elem.nodeName.toLowerCase() && "text" === (type = elem.type) && (null == (attr = elem.getAttribute("type")) || attr.toLowerCase() === type);
},
radio:createInputPseudo("radio"),
checkbox:createInputPseudo("checkbox"),
file:createInputPseudo("file"),
password:createInputPseudo("password"),
image:createInputPseudo("image"),
submit:createButtonPseudo("submit"),
reset:createButtonPseudo("reset"),
button:function(elem) {
var name = elem.nodeName.toLowerCase();
return "input" === name && "button" === elem.type || "button" === name;
},
input:function(elem) {
return rinputs.test(elem.nodeName);
},
focus:function(elem) {
var doc = elem.ownerDocument;
return !(elem !== doc.activeElement || doc.hasFocus && !doc.hasFocus() || !elem.type && !elem.href);
},
active:function(elem) {
return elem === elem.ownerDocument.activeElement;
}
},
setFilters:{
first:function(elements, argument, not) {
return not ? elements.slice(1) :[ elements[0] ];
},
last:function(elements, argument, not) {
var elem = elements.pop();
return not ? elements :[ elem ];
},
even:function(elements, argument, not) {
for (var results = [], i = not ? 1 :0, len = elements.length; len > i; i += 2) results.push(elements[i]);
return results;
},
odd:function(elements, argument, not) {
for (var results = [], i = not ? 0 :1, len = elements.length; len > i; i += 2) results.push(elements[i]);
return results;
},
lt:function(elements, argument, not) {
return not ? elements.slice(+argument) :elements.slice(0, +argument);
},
gt:function(elements, argument, not) {
return not ? elements.slice(0, +argument + 1) :elements.slice(+argument + 1);
},
eq:function(elements, argument, not) {
var elem = elements.splice(+argument, 1);
return not ? elements :elem;
}
}
}, sortOrder = docElem.compareDocumentPosition ? function(a, b) {
return a === b ? (hasDuplicate = !0, 0) :(a.compareDocumentPosition && b.compareDocumentPosition ? 4 & a.compareDocumentPosition(b) :a.compareDocumentPosition) ? -1 :1;
} :function(a, b) {
if (a === b) return hasDuplicate = !0, 0;
if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
var al, bl, ap = [], bp = [], aup = a.parentNode, bup = b.parentNode, cur = aup;
if (aup === bup) return siblingCheck(a, b);
if (!aup) return -1;
if (!bup) return 1;
for (;cur; ) ap.unshift(cur), cur = cur.parentNode;
for (cur = bup; cur; ) bp.unshift(cur), cur = cur.parentNode;
al = ap.length, bl = bp.length;
for (var i = 0; al > i && bl > i; i++) if (ap[i] !== bp[i]) return siblingCheck(ap[i], bp[i]);
return i === al ? siblingCheck(a, bp[i], -1) :siblingCheck(ap[i], b, 1);
}, [ 0, 0 ].sort(sortOrder), baseHasDuplicate = !hasDuplicate, Sizzle.uniqueSort = function(results) {
var elem, i = 1;
if (hasDuplicate = baseHasDuplicate, results.sort(sortOrder), hasDuplicate) for (;elem = results[i]; i++) elem === results[i - 1] && results.splice(i--, 1);
return results;
}, Sizzle.error = function(msg) {
throw new Error("Syntax error, unrecognized expression: " + msg);
}, compile = Sizzle.compile = function(selector, context, xml) {
var group, i, len, cached = compilerCache[expando][selector];
if (cached && cached.context === context) return cached;
for (group = tokenize(selector, context, xml), i = 0, len = group.length; len > i; i++) group[i] = matcherFromTokens(group[i], context, xml);
return cached = compilerCache(selector, matcherFromGroupMatchers(group)), cached.context = context, 
cached.runs = cached.dirruns = 0, cached;
}, document.querySelectorAll && !function() {
var disconnectedMatch, oldSelect = select, rescape = /'|\\/g, rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, rbuggyQSA = [], rbuggyMatches = [ ":active" ], matches = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector;
assert(function(div) {
div.innerHTML = "<select><option selected=''></option></select>", div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), 
div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked");
}), assert(function(div) {
div.innerHTML = "<p test=''></p>", div.querySelectorAll("[test^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')"), 
div.innerHTML = "<input type='hidden'/>", div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled");
}), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), select = function(selector, context, results, seed, xml) {
if (!(seed || xml || rbuggyQSA && rbuggyQSA.test(selector))) if (9 === context.nodeType) try {
return push.apply(results, slice.call(context.querySelectorAll(selector), 0)), results;
} catch (qsaError) {} else if (1 === context.nodeType && "object" !== context.nodeName.toLowerCase()) {
var groups, i, len, old = context.getAttribute("id"), nid = old || expando, newContext = rsibling.test(selector) && context.parentNode || context;
for (old ? nid = nid.replace(rescape, "\\$&") :context.setAttribute("id", nid), 
groups = tokenize(selector, context, xml), nid = "[id='" + nid + "']", i = 0, len = groups.length; len > i; i++) groups[i] = nid + groups[i].selector;
try {
return push.apply(results, slice.call(newContext.querySelectorAll(groups.join(",")), 0)), 
results;
} catch (qsaError) {} finally {
old || context.removeAttribute("id");
}
}
return oldSelect(selector, context, results, seed, xml);
}, matches && (assert(function(div) {
disconnectedMatch = matches.call(div, "div");
try {
matches.call(div, "[test!='']:sizzle"), rbuggyMatches.push(matchExpr.PSEUDO.source, matchExpr.POS.source, "!=");
} catch (e) {}
}), rbuggyMatches = new RegExp(rbuggyMatches.join("|")), Sizzle.matchesSelector = function(elem, expr) {
if (expr = expr.replace(rattributeQuotes, "='$1']"), !(isXML(elem) || rbuggyMatches.test(expr) || rbuggyQSA && rbuggyQSA.test(expr))) try {
var ret = matches.call(elem, expr);
if (ret || disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret;
} catch (e) {}
return Sizzle(expr, null, null, [ elem ]).length > 0;
});
}(), Expr.setFilters.nth = Expr.setFilters.eq, Expr.filters = Expr.pseudos, Sizzle.attr = jQuery.attr, 
jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, 
jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, 
jQuery.contains = Sizzle.contains;
}(window);
var runtil = /Until$/, rparentsprev = /^(?:parents|prev(?:Until|All))/, isSimple = /^.[^:#\[\.,]*$/, rneedsContext = jQuery.expr.match.needsContext, guaranteedUnique = {
children:!0,
contents:!0,
next:!0,
prev:!0
};
jQuery.fn.extend({
find:function(selector) {
var i, l, length, n, r, ret, self = this;
if ("string" != typeof selector) return jQuery(selector).filter(function() {
for (i = 0, l = self.length; l > i; i++) if (jQuery.contains(self[i], this)) return !0;
});
for (ret = this.pushStack("", "find", selector), i = 0, l = this.length; l > i; i++) if (length = ret.length, 
jQuery.find(selector, this[i], ret), i > 0) for (n = length; n < ret.length; n++) for (r = 0; length > r; r++) if (ret[r] === ret[n]) {
ret.splice(n--, 1);
break;
}
return ret;
},
has:function(target) {
var i, targets = jQuery(target, this), len = targets.length;
return this.filter(function() {
for (i = 0; len > i; i++) if (jQuery.contains(this, targets[i])) return !0;
});
},
not:function(selector) {
return this.pushStack(winnow(this, selector, !1), "not", selector);
},
filter:function(selector) {
return this.pushStack(winnow(this, selector, !0), "filter", selector);
},
is:function(selector) {
return !!selector && ("string" == typeof selector ? rneedsContext.test(selector) ? jQuery(selector, this.context).index(this[0]) >= 0 :jQuery.filter(selector, this).length > 0 :this.filter(selector).length > 0);
},
closest:function(selectors, context) {
for (var cur, i = 0, l = this.length, ret = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) :0; l > i; i++) for (cur = this[i]; cur && cur.ownerDocument && cur !== context && 11 !== cur.nodeType; ) {
if (pos ? pos.index(cur) > -1 :jQuery.find.matchesSelector(cur, selectors)) {
ret.push(cur);
break;
}
cur = cur.parentNode;
}
return ret = ret.length > 1 ? jQuery.unique(ret) :ret, this.pushStack(ret, "closest", selectors);
},
index:function(elem) {
return elem ? "string" == typeof elem ? jQuery.inArray(this[0], jQuery(elem)) :jQuery.inArray(elem.jquery ? elem[0] :elem, this) :this[0] && this[0].parentNode ? this.prevAll().length :-1;
},
add:function(selector, context) {
var set = "string" == typeof selector ? jQuery(selector, context) :jQuery.makeArray(selector && selector.nodeType ? [ selector ] :selector), all = jQuery.merge(this.get(), set);
return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ? all :jQuery.unique(all));
},
addBack:function(selector) {
return this.add(null == selector ? this.prevObject :this.prevObject.filter(selector));
}
}), jQuery.fn.andSelf = jQuery.fn.addBack, jQuery.each({
parent:function(elem) {
var parent = elem.parentNode;
return parent && 11 !== parent.nodeType ? parent :null;
},
parents:function(elem) {
return jQuery.dir(elem, "parentNode");
},
parentsUntil:function(elem, i, until) {
return jQuery.dir(elem, "parentNode", until);
},
next:function(elem) {
return sibling(elem, "nextSibling");
},
prev:function(elem) {
return sibling(elem, "previousSibling");
},
nextAll:function(elem) {
return jQuery.dir(elem, "nextSibling");
},
prevAll:function(elem) {
return jQuery.dir(elem, "previousSibling");
},
nextUntil:function(elem, i, until) {
return jQuery.dir(elem, "nextSibling", until);
},
prevUntil:function(elem, i, until) {
return jQuery.dir(elem, "previousSibling", until);
},
siblings:function(elem) {
return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
},
children:function(elem) {
return jQuery.sibling(elem.firstChild);
},
contents:function(elem) {
return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document :jQuery.merge([], elem.childNodes);
}
}, function(name, fn) {
jQuery.fn[name] = function(until, selector) {
var ret = jQuery.map(this, fn, until);
return runtil.test(name) || (selector = until), selector && "string" == typeof selector && (ret = jQuery.filter(selector, ret)), 
ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) :ret, this.length > 1 && rparentsprev.test(name) && (ret = ret.reverse()), 
this.pushStack(ret, name, core_slice.call(arguments).join(","));
};
}), jQuery.extend({
filter:function(expr, elems, not) {
return not && (expr = ":not(" + expr + ")"), 1 === elems.length ? jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] :[] :jQuery.find.matches(expr, elems);
},
dir:function(elem, dir, until) {
for (var matched = [], cur = elem[dir]; cur && 9 !== cur.nodeType && (until === undefined || 1 !== cur.nodeType || !jQuery(cur).is(until)); ) 1 === cur.nodeType && matched.push(cur), 
cur = cur[dir];
return matched;
},
sibling:function(n, elem) {
for (var r = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && r.push(n);
return r;
}
});
var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g, rleadingWhitespace = /^\s+/, rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rtbody = /<tbody/i, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, rnocache = /<(?:script|object|embed|option|style)/i, rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"), rcheckableType = /^(?:checkbox|radio)$/, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /\/(java|ecma)script/i, rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g, wrapMap = {
option:[ 1, "<select multiple='multiple'>", "</select>" ],
legend:[ 1, "<fieldset>", "</fieldset>" ],
thead:[ 1, "<table>", "</table>" ],
tr:[ 2, "<table><tbody>", "</tbody></table>" ],
td:[ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
col:[ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
area:[ 1, "<map>", "</map>" ],
_default:[ 0, "", "" ]
}, safeFragment = createSafeFragment(document), fragmentDiv = safeFragment.appendChild(document.createElement("div"));
wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, 
wrapMap.th = wrapMap.td, jQuery.support.htmlSerialize || (wrapMap._default = [ 1, "X<div>", "</div>" ]), 
jQuery.fn.extend({
text:function(value) {
return jQuery.access(this, function(value) {
return value === undefined ? jQuery.text(this) :this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
}, null, value, arguments.length);
},
wrapAll:function(html) {
if (jQuery.isFunction(html)) return this.each(function(i) {
jQuery(this).wrapAll(html.call(this, i));
});
if (this[0]) {
var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0);
this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
for (var elem = this; elem.firstChild && 1 === elem.firstChild.nodeType; ) elem = elem.firstChild;
return elem;
}).append(this);
}
return this;
},
wrapInner:function(html) {
return jQuery.isFunction(html) ? this.each(function(i) {
jQuery(this).wrapInner(html.call(this, i));
}) :this.each(function() {
var self = jQuery(this), contents = self.contents();
contents.length ? contents.wrapAll(html) :self.append(html);
});
},
wrap:function(html) {
var isFunction = jQuery.isFunction(html);
return this.each(function(i) {
jQuery(this).wrapAll(isFunction ? html.call(this, i) :html);
});
},
unwrap:function() {
return this.parent().each(function() {
jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes);
}).end();
},
append:function() {
return this.domManip(arguments, !0, function(elem) {
(1 === this.nodeType || 11 === this.nodeType) && this.appendChild(elem);
});
},
prepend:function() {
return this.domManip(arguments, !0, function(elem) {
(1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(elem, this.firstChild);
});
},
before:function() {
if (!isDisconnected(this[0])) return this.domManip(arguments, !1, function(elem) {
this.parentNode.insertBefore(elem, this);
});
if (arguments.length) {
var set = jQuery.clean(arguments);
return this.pushStack(jQuery.merge(set, this), "before", this.selector);
}
},
after:function() {
if (!isDisconnected(this[0])) return this.domManip(arguments, !1, function(elem) {
this.parentNode.insertBefore(elem, this.nextSibling);
});
if (arguments.length) {
var set = jQuery.clean(arguments);
return this.pushStack(jQuery.merge(this, set), "after", this.selector);
}
},
remove:function(selector, keepData) {
for (var elem, i = 0; null != (elem = this[i]); i++) (!selector || jQuery.filter(selector, [ elem ]).length) && (keepData || 1 !== elem.nodeType || (jQuery.cleanData(elem.getElementsByTagName("*")), 
jQuery.cleanData([ elem ])), elem.parentNode && elem.parentNode.removeChild(elem));
return this;
},
empty:function() {
for (var elem, i = 0; null != (elem = this[i]); i++) for (1 === elem.nodeType && jQuery.cleanData(elem.getElementsByTagName("*")); elem.firstChild; ) elem.removeChild(elem.firstChild);
return this;
},
clone:function(dataAndEvents, deepDataAndEvents) {
return dataAndEvents = null == dataAndEvents ? !1 :dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents :deepDataAndEvents, 
this.map(function() {
return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
});
},
html:function(value) {
return jQuery.access(this, function(value) {
var elem = this[0] || {}, i = 0, l = this.length;
if (value === undefined) return 1 === elem.nodeType ? elem.innerHTML.replace(rinlinejQuery, "") :undefined;
if (!("string" != typeof value || rnoInnerhtml.test(value) || !jQuery.support.htmlSerialize && rnoshimcache.test(value) || !jQuery.support.leadingWhitespace && rleadingWhitespace.test(value) || wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()])) {
value = value.replace(rxhtmlTag, "<$1></$2>");
try {
for (;l > i; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(elem.getElementsByTagName("*")), 
elem.innerHTML = value);
elem = 0;
} catch (e) {}
}
elem && this.empty().append(value);
}, null, value, arguments.length);
},
replaceWith:function(value) {
return isDisconnected(this[0]) ? this.length ? this.pushStack(jQuery(jQuery.isFunction(value) ? value() :value), "replaceWith", value) :this :jQuery.isFunction(value) ? this.each(function(i) {
var self = jQuery(this), old = self.html();
self.replaceWith(value.call(this, i, old));
}) :("string" != typeof value && (value = jQuery(value).detach()), this.each(function() {
var next = this.nextSibling, parent = this.parentNode;
jQuery(this).remove(), next ? jQuery(next).before(value) :jQuery(parent).append(value);
}));
},
detach:function(selector) {
return this.remove(selector, !0);
},
domManip:function(args, table, callback) {
args = [].concat.apply([], args);
var results, first, fragment, iNoClone, i = 0, value = args[0], scripts = [], l = this.length;
if (!jQuery.support.checkClone && l > 1 && "string" == typeof value && rchecked.test(value)) return this.each(function() {
jQuery(this).domManip(args, table, callback);
});
if (jQuery.isFunction(value)) return this.each(function(i) {
var self = jQuery(this);
args[0] = value.call(this, i, table ? self.html() :undefined), self.domManip(args, table, callback);
});
if (this[0]) {
if (results = jQuery.buildFragment(args, this, scripts), fragment = results.fragment, 
first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), 
first) for (table = table && jQuery.nodeName(first, "tr"), iNoClone = results.cacheable || l - 1; l > i; i++) callback.call(table && jQuery.nodeName(this[i], "table") ? findOrAppend(this[i], "tbody") :this[i], i === iNoClone ? fragment :jQuery.clone(fragment, !0, !0));
fragment = first = null, scripts.length && jQuery.each(scripts, function(i, elem) {
elem.src ? jQuery.ajax ? jQuery.ajax({
url:elem.src,
type:"GET",
dataType:"script",
async:!1,
global:!1,
"throws":!0
}) :jQuery.error("no ajax") :jQuery.globalEval((elem.text || elem.textContent || elem.innerHTML || "").replace(rcleanScript, "")), 
elem.parentNode && elem.parentNode.removeChild(elem);
});
}
return this;
}
}), jQuery.buildFragment = function(args, context, scripts) {
var fragment, cacheable, cachehit, first = args[0];
return context = context || document, context = !context.nodeType && context[0] || context, 
context = context.ownerDocument || context, !(1 === args.length && "string" == typeof first && first.length < 512 && context === document && "<" === first.charAt(0)) || rnocache.test(first) || !jQuery.support.checkClone && rchecked.test(first) || !jQuery.support.html5Clone && rnoshimcache.test(first) || (cacheable = !0, 
fragment = jQuery.fragments[first], cachehit = fragment !== undefined), fragment || (fragment = context.createDocumentFragment(), 
jQuery.clean(args, context, fragment, scripts), cacheable && (jQuery.fragments[first] = cachehit && fragment)), 
{
fragment:fragment,
cacheable:cacheable
};
}, jQuery.fragments = {}, jQuery.each({
appendTo:"append",
prependTo:"prepend",
insertBefore:"before",
insertAfter:"after",
replaceAll:"replaceWith"
}, function(name, original) {
jQuery.fn[name] = function(selector) {
var elems, i = 0, ret = [], insert = jQuery(selector), l = insert.length, parent = 1 === this.length && this[0].parentNode;
if ((null == parent || parent && 11 === parent.nodeType && 1 === parent.childNodes.length) && 1 === l) return insert[original](this[0]), 
this;
for (;l > i; i++) elems = (i > 0 ? this.clone(!0) :this).get(), jQuery(insert[i])[original](elems), 
ret = ret.concat(elems);
return this.pushStack(ret, name, insert.selector);
};
}), jQuery.extend({
clone:function(elem, dataAndEvents, deepDataAndEvents) {
var srcElements, destElements, i, clone;
if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">") ? clone = elem.cloneNode(!0) :(fragmentDiv.innerHTML = elem.outerHTML, 
fragmentDiv.removeChild(clone = fragmentDiv.firstChild)), !(jQuery.support.noCloneEvent && jQuery.support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) for (cloneFixAttributes(elem, clone), 
srcElements = getAll(elem), destElements = getAll(clone), i = 0; srcElements[i]; ++i) destElements[i] && cloneFixAttributes(srcElements[i], destElements[i]);
if (dataAndEvents && (cloneCopyEvent(elem, clone), deepDataAndEvents)) for (srcElements = getAll(elem), 
destElements = getAll(clone), i = 0; srcElements[i]; ++i) cloneCopyEvent(srcElements[i], destElements[i]);
return srcElements = destElements = null, clone;
},
clean:function(elems, context, fragment, scripts) {
var i, j, elem, tag, wrap, depth, div, hasBody, tbody, handleScript, jsTags, safe = context === document && safeFragment, ret = [];
for (context && "undefined" != typeof context.createDocumentFragment || (context = document), 
i = 0; null != (elem = elems[i]); i++) if ("number" == typeof elem && (elem += ""), 
elem) {
if ("string" == typeof elem) if (rhtml.test(elem)) {
for (safe = safe || createSafeFragment(context), div = context.createElement("div"), 
safe.appendChild(div), elem = elem.replace(rxhtmlTag, "<$1></$2>"), tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase(), 
wrap = wrapMap[tag] || wrapMap._default, depth = wrap[0], div.innerHTML = wrap[1] + elem + wrap[2]; depth--; ) div = div.lastChild;
if (!jQuery.support.tbody) for (hasBody = rtbody.test(elem), tbody = "table" !== tag || hasBody ? "<table>" !== wrap[1] || hasBody ? [] :div.childNodes :div.firstChild && div.firstChild.childNodes, 
j = tbody.length - 1; j >= 0; --j) jQuery.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length && tbody[j].parentNode.removeChild(tbody[j]);
!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem) && div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild), 
elem = div.childNodes, div.parentNode.removeChild(div);
} else elem = context.createTextNode(elem);
elem.nodeType ? ret.push(elem) :jQuery.merge(ret, elem);
}
if (div && (elem = div = safe = null), !jQuery.support.appendChecked) for (i = 0; null != (elem = ret[i]); i++) jQuery.nodeName(elem, "input") ? fixDefaultChecked(elem) :"undefined" != typeof elem.getElementsByTagName && jQuery.grep(elem.getElementsByTagName("input"), fixDefaultChecked);
if (fragment) for (handleScript = function(elem) {
return !elem.type || rscriptType.test(elem.type) ? scripts ? scripts.push(elem.parentNode ? elem.parentNode.removeChild(elem) :elem) :fragment.appendChild(elem) :void 0;
}, i = 0; null != (elem = ret[i]); i++) jQuery.nodeName(elem, "script") && handleScript(elem) || (fragment.appendChild(elem), 
"undefined" != typeof elem.getElementsByTagName && (jsTags = jQuery.grep(jQuery.merge([], elem.getElementsByTagName("script")), handleScript), 
ret.splice.apply(ret, [ i + 1, 0 ].concat(jsTags)), i += jsTags.length));
return ret;
},
cleanData:function(elems, acceptData) {
for (var data, id, elem, type, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, deleteExpando = jQuery.support.deleteExpando, special = jQuery.event.special; null != (elem = elems[i]); i++) if ((acceptData || jQuery.acceptData(elem)) && (id = elem[internalKey], 
data = id && cache[id])) {
if (data.events) for (type in data.events) special[type] ? jQuery.event.remove(elem, type) :jQuery.removeEvent(elem, type, data.handle);
cache[id] && (delete cache[id], deleteExpando ? delete elem[internalKey] :elem.removeAttribute ? elem.removeAttribute(internalKey) :elem[internalKey] = null, 
jQuery.deletedIds.push(id));
}
}
}), function() {
var matched, browser;
jQuery.uaMatch = function(ua) {
ua = ua.toLowerCase();
var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
return {
browser:match[1] || "",
version:match[2] || "0"
};
}, matched = jQuery.uaMatch(navigator.userAgent), browser = {}, matched.browser && (browser[matched.browser] = !0, 
browser.version = matched.version), browser.chrome ? browser.webkit = !0 :browser.webkit && (browser.safari = !0), 
jQuery.browser = browser, jQuery.sub = function() {
function jQuerySub(selector, context) {
return new jQuerySub.fn.init(selector, context);
}
jQuery.extend(!0, jQuerySub, this), jQuerySub.superclass = this, jQuerySub.fn = jQuerySub.prototype = this(), 
jQuerySub.fn.constructor = jQuerySub, jQuerySub.sub = this.sub, jQuerySub.fn.init = function(selector, context) {
return context && context instanceof jQuery && !(context instanceof jQuerySub) && (context = jQuerySub(context)), 
jQuery.fn.init.call(this, selector, context, rootjQuerySub);
}, jQuerySub.fn.init.prototype = jQuerySub.fn;
var rootjQuerySub = jQuerySub(document);
return jQuerySub;
};
}();
var curCSS, iframe, iframeDoc, ralpha = /alpha\([^)]*\)/i, ropacity = /opacity=([^)]*)/, rposition = /^(top|right|bottom|left)$/, rdisplayswap = /^(none|table(?!-c[ea]).+)/, rmargin = /^margin/, rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"), rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"), rrelNum = new RegExp("^([-+])=(" + core_pnum + ")", "i"), elemdisplay = {}, cssShow = {
position:"absolute",
visibility:"hidden",
display:"block"
}, cssNormalTransform = {
letterSpacing:0,
fontWeight:400
}, cssExpand = [ "Top", "Right", "Bottom", "Left" ], cssPrefixes = [ "Webkit", "O", "Moz", "ms" ], eventsToggle = jQuery.fn.toggle;
jQuery.fn.extend({
css:function(name, value) {
return jQuery.access(this, function(elem, name, value) {
return value !== undefined ? jQuery.style(elem, name, value) :jQuery.css(elem, name);
}, name, value, arguments.length > 1);
},
show:function() {
return showHide(this, !0);
},
hide:function() {
return showHide(this);
},
toggle:function(state, fn2) {
var bool = "boolean" == typeof state;
return jQuery.isFunction(state) && jQuery.isFunction(fn2) ? eventsToggle.apply(this, arguments) :this.each(function() {
(bool ? state :isHidden(this)) ? jQuery(this).show() :jQuery(this).hide();
});
}
}), jQuery.extend({
cssHooks:{
opacity:{
get:function(elem, computed) {
if (computed) {
var ret = curCSS(elem, "opacity");
return "" === ret ? "1" :ret;
}
}
}
},
cssNumber:{
fillOpacity:!0,
fontWeight:!0,
lineHeight:!0,
opacity:!0,
orphans:!0,
widows:!0,
zIndex:!0,
zoom:!0
},
cssProps:{
"float":jQuery.support.cssFloat ? "cssFloat" :"styleFloat"
},
style:function(elem, name, value, extra) {
if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
if (name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), 
hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], value === undefined) return hooks && "get" in hooks && (ret = hooks.get(elem, !1, extra)) !== undefined ? ret :style[name];
if (type = typeof value, "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), 
type = "number"), !(null == value || "number" === type && isNaN(value) || ("number" !== type || jQuery.cssNumber[origName] || (value += "px"), 
hooks && "set" in hooks && (value = hooks.set(elem, value, extra)) === undefined))) try {
style[name] = value;
} catch (e) {}
}
},
css:function(elem, name, numeric, extra) {
var val, num, hooks, origName = jQuery.camelCase(name);
return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), 
hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), 
val === undefined && (val = curCSS(elem, name)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), 
numeric || extra !== undefined ? (num = parseFloat(val), numeric || jQuery.isNumeric(num) ? num || 0 :val) :val;
},
swap:function(elem, options, callback) {
var ret, name, old = {};
for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
ret = callback.call(elem);
for (name in options) elem.style[name] = old[name];
return ret;
}
}), window.getComputedStyle ? curCSS = function(elem, name) {
var ret, width, minWidth, maxWidth, computed = window.getComputedStyle(elem, null), style = elem.style;
return computed && (ret = computed[name], "" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), 
rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, 
maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, 
ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), 
ret;
} :document.documentElement.currentStyle && (curCSS = function(elem, name) {
var left, rsLeft, ret = elem.currentStyle && elem.currentStyle[name], style = elem.style;
return null == ret && style && style[name] && (ret = style[name]), rnumnonpx.test(ret) && !rposition.test(name) && (left = style.left, 
rsLeft = elem.runtimeStyle && elem.runtimeStyle.left, rsLeft && (elem.runtimeStyle.left = elem.currentStyle.left), 
style.left = "fontSize" === name ? "1em" :ret, ret = style.pixelLeft + "px", style.left = left, 
rsLeft && (elem.runtimeStyle.left = rsLeft)), "" === ret ? "auto" :ret;
}), jQuery.each([ "height", "width" ], function(i, name) {
jQuery.cssHooks[name] = {
get:function(elem, computed, extra) {
return computed ? 0 === elem.offsetWidth && rdisplayswap.test(curCSS(elem, "display")) ? jQuery.swap(elem, cssShow, function() {
return getWidthOrHeight(elem, name, extra);
}) :getWidthOrHeight(elem, name, extra) :void 0;
},
set:function(elem, value, extra) {
return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing")) :0);
}
};
}), jQuery.support.opacity || (jQuery.cssHooks.opacity = {
get:function(elem, computed) {
return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter :elem.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" :computed ? "1" :"";
},
set:function(elem, value) {
var style = elem.style, currentStyle = elem.currentStyle, opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + 100 * value + ")" :"", filter = currentStyle && currentStyle.filter || style.filter || "";
style.zoom = 1, value >= 1 && "" === jQuery.trim(filter.replace(ralpha, "")) && style.removeAttribute && (style.removeAttribute("filter"), 
currentStyle && !currentStyle.filter) || (style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) :filter + " " + opacity);
}
}), jQuery(function() {
jQuery.support.reliableMarginRight || (jQuery.cssHooks.marginRight = {
get:function(elem, computed) {
return jQuery.swap(elem, {
display:"inline-block"
}, function() {
return computed ? curCSS(elem, "marginRight") :void 0;
});
}
}), !jQuery.support.pixelPosition && jQuery.fn.position && jQuery.each([ "top", "left" ], function(i, prop) {
jQuery.cssHooks[prop] = {
get:function(elem, computed) {
if (computed) {
var ret = curCSS(elem, prop);
return rnumnonpx.test(ret) ? jQuery(elem).position()[prop] + "px" :ret;
}
}
};
});
}), jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.hidden = function(elem) {
return 0 === elem.offsetWidth && 0 === elem.offsetHeight || !jQuery.support.reliableHiddenOffsets && "none" === (elem.style && elem.style.display || curCSS(elem, "display"));
}, jQuery.expr.filters.visible = function(elem) {
return !jQuery.expr.filters.hidden(elem);
}), jQuery.each({
margin:"",
padding:"",
border:"Width"
}, function(prefix, suffix) {
jQuery.cssHooks[prefix + suffix] = {
expand:function(value) {
var i, parts = "string" == typeof value ? value.split(" ") :[ value ], expanded = {};
for (i = 0; 4 > i; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
return expanded;
}
}, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber);
});
var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, rselectTextarea = /^(?:select|textarea)/i;
jQuery.fn.extend({
serialize:function() {
return jQuery.param(this.serializeArray());
},
serializeArray:function() {
return this.map(function() {
return this.elements ? jQuery.makeArray(this.elements) :this;
}).filter(function() {
return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type));
}).map(function(i, elem) {
var val = jQuery(this).val();
return null == val ? null :jQuery.isArray(val) ? jQuery.map(val, function(val) {
return {
name:elem.name,
value:val.replace(rCRLF, "\r\n")
};
}) :{
name:elem.name,
value:val.replace(rCRLF, "\r\n")
};
}).get();
}
}), jQuery.param = function(a, traditional) {
var prefix, s = [], add = function(key, value) {
value = jQuery.isFunction(value) ? value() :null == value ? "" :value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
};
if (traditional === undefined && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), 
jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
add(this.name, this.value);
}); else for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
return s.join("&").replace(r20, "+");
};
var ajaxLocation, ajaxLocParts, rhash = /#.*$/, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rquery = /\?/, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, rts = /([?&])_=[^&]*/, rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, _load = jQuery.fn.load, prefilters = {}, transports = {}, allTypes = [ "*/" ] + [ "*" ];
try {
ajaxLocation = location.href;
} catch (e) {
ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href;
}
ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.fn.load = function(url, params, callback) {
if ("string" != typeof url && _load) return _load.apply(this, arguments);
if (!this.length) return this;
var selector, type, response, self = this, off = url.indexOf(" ");
return off >= 0 && (selector = url.slice(off, url.length), url = url.slice(0, off)), 
jQuery.isFunction(params) ? (callback = params, params = undefined) :params && "object" == typeof params && (type = "POST"), 
jQuery.ajax({
url:url,
type:type,
dataType:"html",
data:params,
complete:function(jqXHR, status) {
callback && self.each(callback, response || [ jqXHR.responseText, status, jqXHR ]);
}
}).done(function(responseText) {
response = arguments, self.html(selector ? jQuery("<div>").append(responseText.replace(rscript, "")).find(selector) :responseText);
}), this;
}, jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(i, o) {
jQuery.fn[o] = function(f) {
return this.on(o, f);
};
}), jQuery.each([ "get", "post" ], function(i, method) {
jQuery[method] = function(url, data, callback, type) {
return jQuery.isFunction(data) && (type = type || callback, callback = data, data = undefined), 
jQuery.ajax({
type:method,
url:url,
data:data,
success:callback,
dataType:type
});
};
}), jQuery.extend({
getScript:function(url, callback) {
return jQuery.get(url, undefined, callback, "script");
},
getJSON:function(url, data, callback) {
return jQuery.get(url, data, callback, "json");
},
ajaxSetup:function(target, settings) {
return settings ? ajaxExtend(target, jQuery.ajaxSettings) :(settings = target, target = jQuery.ajaxSettings), 
ajaxExtend(target, settings), target;
},
ajaxSettings:{
url:ajaxLocation,
isLocal:rlocalProtocol.test(ajaxLocParts[1]),
global:!0,
type:"GET",
contentType:"application/x-www-form-urlencoded; charset=UTF-8",
processData:!0,
async:!0,
accepts:{
xml:"application/xml, text/xml",
html:"text/html",
text:"text/plain",
json:"application/json, text/javascript",
"*":allTypes
},
contents:{
xml:/xml/,
html:/html/,
json:/json/
},
responseFields:{
xml:"responseXML",
text:"responseText"
},
converters:{
"* text":window.String,
"text html":!0,
"text json":jQuery.parseJSON,
"text xml":jQuery.parseXML
},
flatOptions:{
context:!0,
url:!0
}
},
ajaxPrefilter:addToPrefiltersOrTransports(prefilters),
ajaxTransport:addToPrefiltersOrTransports(transports),
ajax:function(url, options) {
function done(status, nativeStatusText, responses, headers) {
var isSuccess, success, error, response, modified, statusText = nativeStatusText;
2 !== state && (state = 2, timeoutTimer && clearTimeout(timeoutTimer), transport = undefined, 
responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 :0, responses && (response = ajaxHandleResponses(s, jqXHR, responses)), 
status >= 200 && 300 > status || 304 === status ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), 
modified && (jQuery.lastModified[ifModifiedKey] = modified), modified = jqXHR.getResponseHeader("Etag"), 
modified && (jQuery.etag[ifModifiedKey] = modified)), 304 === status ? (statusText = "notmodified", 
isSuccess = !0) :(isSuccess = ajaxConvert(s, response), statusText = isSuccess.state, 
success = isSuccess.data, error = isSuccess.error, isSuccess = !error)) :(error = statusText, 
(!statusText || status) && (statusText = "error", 0 > status && (status = 0))), 
jqXHR.status = status, jqXHR.statusText = "" + (nativeStatusText || statusText), 
isSuccess ? deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]) :deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]), 
jqXHR.statusCode(statusCode), statusCode = undefined, fireGlobals && globalEventContext.trigger("ajax" + (isSuccess ? "Success" :"Error"), [ jqXHR, s, isSuccess ? success :error ]), 
completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]), 
--jQuery.active || jQuery.event.trigger("ajaxStop")));
}
"object" == typeof url && (options = url, url = undefined), options = options || {};
var ifModifiedKey, responseHeadersString, responseHeaders, transport, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = callbackContext !== s && (callbackContext.nodeType || callbackContext instanceof jQuery) ? jQuery(callbackContext) :jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
readyState:0,
setRequestHeader:function(name, value) {
if (!state) {
var lname = name.toLowerCase();
name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, requestHeaders[name] = value;
}
return this;
},
getAllResponseHeaders:function() {
return 2 === state ? responseHeadersString :null;
},
getResponseHeader:function(key) {
var match;
if (2 === state) {
if (!responseHeaders) for (responseHeaders = {}; match = rheaders.exec(responseHeadersString); ) responseHeaders[match[1].toLowerCase()] = match[2];
match = responseHeaders[key.toLowerCase()];
}
return match === undefined ? null :match;
},
overrideMimeType:function(type) {
return state || (s.mimeType = type), this;
},
abort:function(statusText) {
return statusText = statusText || strAbort, transport && transport.abort(statusText), 
done(0, statusText), this;
}
};
if (deferred.promise(jqXHR), jqXHR.success = jqXHR.done, jqXHR.error = jqXHR.fail, 
jqXHR.complete = completeDeferred.add, jqXHR.statusCode = function(map) {
if (map) {
var tmp;
if (2 > state) for (tmp in map) statusCode[tmp] = [ statusCode[tmp], map[tmp] ]; else tmp = map[jqXHR.status], 
jqXHR.always(tmp);
}
return this;
}, s.url = ((url || s.url) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), 
s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().split(core_rspace), null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), 
s.crossDomain = !(!parts || parts[1] == ajaxLocParts[1] && parts[2] == ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? 80 :443)) == (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? 80 :443)))), 
s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), 
inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
if (fireGlobals = s.global, s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), 
fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), !s.hasContent && (s.data && (s.url += (rquery.test(s.url) ? "&" :"?") + s.data, 
delete s.data), ifModifiedKey = s.url, s.cache === !1)) {
var ts = jQuery.now(), ret = s.url.replace(rts, "$1_=" + ts);
s.url = ret + (ret === s.url ? (rquery.test(s.url) ? "&" :"?") + "_=" + ts :"");
}
(s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), 
s.ifModified && (ifModifiedKey = ifModifiedKey || s.url, jQuery.lastModified[ifModifiedKey] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[ifModifiedKey]), 
jQuery.etag[ifModifiedKey] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[ifModifiedKey])), 
jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" :"") :s.accepts["*"]);
for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
strAbort = "abort";
for (i in {
success:1,
error:1,
complete:1
}) jqXHR[i](s[i]);
if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [ jqXHR, s ]), 
s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() {
jqXHR.abort("timeout");
}, s.timeout));
try {
state = 1, transport.send(requestHeaders, done);
} catch (e) {
if (!(2 > state)) throw e;
done(-1, e);
}
} else done(-1, "No Transport");
return jqXHR;
},
active:0,
lastModified:{},
etag:{}
});
var oldCallbacks = [], rquestion = /\?/, rjsonp = /(=)\?(?=&|$)|\?\?/, nonce = jQuery.now();
jQuery.ajaxSetup({
jsonp:"callback",
jsonpCallback:function() {
var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
return this[callback] = !0, callback;
}
}), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
var callbackName, overwritten, responseContainer, data = s.data, url = s.url, hasCallback = s.jsonp !== !1, replaceInUrl = hasCallback && rjsonp.test(url), replaceInData = hasCallback && !replaceInUrl && "string" == typeof data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(data);
return "jsonp" === s.dataTypes[0] || replaceInUrl || replaceInData ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() :s.jsonpCallback, 
overwritten = window[callbackName], replaceInUrl ? s.url = url.replace(rjsonp, "$1" + callbackName) :replaceInData ? s.data = data.replace(rjsonp, "$1" + callbackName) :hasCallback && (s.url += (rquestion.test(url) ? "&" :"?") + s.jsonp + "=" + callbackName), 
s.converters["script json"] = function() {
return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0];
}, s.dataTypes[0] = "json", window[callbackName] = function() {
responseContainer = arguments;
}, jqXHR.always(function() {
window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, 
oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), 
responseContainer = overwritten = undefined;
}), "script") :void 0;
}), jQuery.ajaxSetup({
accepts:{
script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
},
contents:{
script:/javascript|ecmascript/
},
converters:{
"text script":function(text) {
return jQuery.globalEval(text), text;
}
}
}), jQuery.ajaxPrefilter("script", function(s) {
s.cache === undefined && (s.cache = !1), s.crossDomain && (s.type = "GET", s.global = !1);
}), jQuery.ajaxTransport("script", function(s) {
if (s.crossDomain) {
var script, head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
return {
send:function(_, callback) {
script = document.createElement("script"), script.async = "async", s.scriptCharset && (script.charset = s.scriptCharset), 
script.src = s.url, script.onload = script.onreadystatechange = function(_, isAbort) {
(isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) && (script.onload = script.onreadystatechange = null, 
head && script.parentNode && head.removeChild(script), script = undefined, isAbort || callback(200, "success"));
}, head.insertBefore(script, head.firstChild);
},
abort:function() {
script && script.onload(0, 1);
}
};
}
});
var xhrCallbacks, xhrOnUnloadAbort = window.ActiveXObject ? function() {
for (var key in xhrCallbacks) xhrCallbacks[key](0, 1);
} :!1, xhrId = 0;
jQuery.ajaxSettings.xhr = window.ActiveXObject ? function() {
return !this.isLocal && createStandardXHR() || createActiveXHR();
} :createStandardXHR, function(xhr) {
jQuery.extend(jQuery.support, {
ajax:!!xhr,
cors:!!xhr && "withCredentials" in xhr
});
}(jQuery.ajaxSettings.xhr()), jQuery.support.ajax && jQuery.ajaxTransport(function(s) {
if (!s.crossDomain || jQuery.support.cors) {
var callback;
return {
send:function(headers, complete) {
var handle, i, xhr = s.xhr();
if (s.username ? xhr.open(s.type, s.url, s.async, s.username, s.password) :xhr.open(s.type, s.url, s.async), 
s.xhrFields) for (i in s.xhrFields) xhr[i] = s.xhrFields[i];
s.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(s.mimeType), s.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
try {
for (i in headers) xhr.setRequestHeader(i, headers[i]);
} catch (_) {}
xhr.send(s.hasContent && s.data || null), callback = function(_, isAbort) {
var status, statusText, responseHeaders, responses, xml;
try {
if (callback && (isAbort || 4 === xhr.readyState)) if (callback = undefined, handle && (xhr.onreadystatechange = jQuery.noop, 
xhrOnUnloadAbort && delete xhrCallbacks[handle]), isAbort) 4 !== xhr.readyState && xhr.abort(); else {
status = xhr.status, responseHeaders = xhr.getAllResponseHeaders(), responses = {}, 
xml = xhr.responseXML, xml && xml.documentElement && (responses.xml = xml);
try {
responses.text = xhr.responseText;
} catch (_) {}
try {
statusText = xhr.statusText;
} catch (e) {
statusText = "";
}
status || !s.isLocal || s.crossDomain ? 1223 === status && (status = 204) :status = responses.text ? 200 :404;
}
} catch (firefoxAccessException) {
isAbort || complete(-1, firefoxAccessException);
}
responses && complete(status, statusText, responses, responseHeaders);
}, s.async ? 4 === xhr.readyState ? setTimeout(callback, 0) :(handle = ++xhrId, 
xhrOnUnloadAbort && (xhrCallbacks || (xhrCallbacks = {}, jQuery(window).unload(xhrOnUnloadAbort)), 
xhrCallbacks[handle] = callback), xhr.onreadystatechange = callback) :callback();
},
abort:function() {
callback && callback(0, 1);
}
};
}
});
var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/, animationPrefilters = [ defaultPrefilter ], tweeners = {
"*":[ function(prop, value) {
var end, unit, prevScale, tween = this.createTween(prop, value), parts = rfxnum.exec(value), target = tween.cur(), start = +target || 0, scale = 1;
if (parts) {
if (end = +parts[2], unit = parts[3] || (jQuery.cssNumber[prop] ? "" :"px"), "px" !== unit && start) {
start = jQuery.css(tween.elem, prop, !0) || end || 1;
do prevScale = scale = scale || ".5", start /= scale, jQuery.style(tween.elem, prop, start + unit), 
scale = tween.cur() / target; while (1 !== scale && scale !== prevScale);
}
tween.unit = unit, tween.start = start, tween.end = parts[1] ? start + (parts[1] + 1) * end :end;
}
return tween;
} ]
};
jQuery.Animation = jQuery.extend(Animation, {
tweener:function(props, callback) {
jQuery.isFunction(props) ? (callback = props, props = [ "*" ]) :props = props.split(" ");
for (var prop, index = 0, length = props.length; length > index; index++) prop = props[index], 
tweeners[prop] = tweeners[prop] || [], tweeners[prop].unshift(callback);
},
prefilter:function(callback, prepend) {
prepend ? animationPrefilters.unshift(callback) :animationPrefilters.push(callback);
}
}), jQuery.Tween = Tween, Tween.prototype = {
constructor:Tween,
init:function(elem, options, prop, end, easing, unit) {
this.elem = elem, this.prop = prop, this.easing = easing || "swing", this.options = options, 
this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" :"px");
},
cur:function() {
var hooks = Tween.propHooks[this.prop];
return hooks && hooks.get ? hooks.get(this) :Tween.propHooks._default.get(this);
},
run:function(percent) {
var eased, hooks = Tween.propHooks[this.prop];
return this.pos = eased = this.options.duration ? jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) :percent, 
this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
hooks && hooks.set ? hooks.set(this) :Tween.propHooks._default.set(this), this;
}
}, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
_default:{
get:function(tween) {
var result;
return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, !1, ""), 
result && "auto" !== result ? result :0) :tween.elem[tween.prop];
},
set:function(tween) {
jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) :tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) :tween.elem[tween.prop] = tween.now;
}
}
}, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
set:function(tween) {
tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now);
}
}, jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
var cssFn = jQuery.fn[name];
jQuery.fn[name] = function(speed, easing, callback) {
return null == speed || "boolean" == typeof speed || !i && jQuery.isFunction(speed) && jQuery.isFunction(easing) ? cssFn.apply(this, arguments) :this.animate(genFx(name, !0), speed, easing, callback);
};
}), jQuery.fn.extend({
fadeTo:function(speed, to, easing, callback) {
return this.filter(isHidden).css("opacity", 0).show().end().animate({
opacity:to
}, speed, easing, callback);
},
animate:function(prop, speed, easing, callback) {
var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
var anim = Animation(this, jQuery.extend({}, prop), optall);
empty && anim.stop(!0);
};
return empty || optall.queue === !1 ? this.each(doAnimation) :this.queue(optall.queue, doAnimation);
},
stop:function(type, clearQueue, gotoEnd) {
var stopQueue = function(hooks) {
var stop = hooks.stop;
delete hooks.stop, stop(gotoEnd);
};
return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = undefined), 
clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
var dequeue = !0, index = null != type && type + "queueHooks", timers = jQuery.timers, data = jQuery._data(this);
if (index) data[index] && data[index].stop && stopQueue(data[index]); else for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
for (index = timers.length; index--; ) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), 
dequeue = !1, timers.splice(index, 1));
(dequeue || !gotoEnd) && jQuery.dequeue(this, type);
});
}
}), jQuery.each({
slideDown:genFx("show"),
slideUp:genFx("hide"),
slideToggle:genFx("toggle"),
fadeIn:{
opacity:"show"
},
fadeOut:{
opacity:"hide"
},
fadeToggle:{
opacity:"toggle"
}
}, function(name, props) {
jQuery.fn[name] = function(speed, easing, callback) {
return this.animate(props, speed, easing, callback);
};
}), jQuery.speed = function(speed, easing, fn) {
var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) :{
complete:fn || !fn && easing || jQuery.isFunction(speed) && speed,
duration:speed,
easing:fn && easing || easing && !jQuery.isFunction(easing) && easing
};
return opt.duration = jQuery.fx.off ? 0 :"number" == typeof opt.duration ? opt.duration :opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] :jQuery.fx.speeds._default, 
(null == opt.queue || opt.queue === !0) && (opt.queue = "fx"), opt.old = opt.complete, 
opt.complete = function() {
jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue);
}, opt;
}, jQuery.easing = {
linear:function(p) {
return p;
},
swing:function(p) {
return .5 - Math.cos(p * Math.PI) / 2;
}
}, jQuery.timers = [], jQuery.fx = Tween.prototype.init, jQuery.fx.tick = function() {
for (var timer, timers = jQuery.timers, i = 0; i < timers.length; i++) timer = timers[i], 
timer() || timers[i] !== timer || timers.splice(i--, 1);
timers.length || jQuery.fx.stop();
}, jQuery.fx.timer = function(timer) {
timer() && jQuery.timers.push(timer) && !timerId && (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval));
}, jQuery.fx.interval = 13, jQuery.fx.stop = function() {
clearInterval(timerId), timerId = null;
}, jQuery.fx.speeds = {
slow:600,
fast:200,
_default:400
}, jQuery.fx.step = {}, jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.animated = function(elem) {
return jQuery.grep(jQuery.timers, function(fn) {
return elem === fn.elem;
}).length;
});
var rroot = /^(?:body|html)$/i;
jQuery.fn.offset = function(options) {
if (arguments.length) return options === undefined ? this :this.each(function(i) {
jQuery.offset.setOffset(this, options, i);
});
var box, docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft, top, left, elem = this[0], doc = elem && elem.ownerDocument;
if (doc) return (body = doc.body) === elem ? jQuery.offset.bodyOffset(elem) :(docElem = doc.documentElement, 
jQuery.contains(docElem, elem) ? (box = elem.getBoundingClientRect(), win = getWindow(doc), 
clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0, 
scrollTop = win.pageYOffset || docElem.scrollTop, scrollLeft = win.pageXOffset || docElem.scrollLeft, 
top = box.top + scrollTop - clientTop, left = box.left + scrollLeft - clientLeft, 
{
top:top,
left:left
}) :{
top:0,
left:0
});
}, jQuery.offset = {
bodyOffset:function(body) {
var top = body.offsetTop, left = body.offsetLeft;
return jQuery.support.doesNotIncludeMarginInBodyOffset && (top += parseFloat(jQuery.css(body, "marginTop")) || 0, 
left += parseFloat(jQuery.css(body, "marginLeft")) || 0), {
top:top,
left:left
};
},
setOffset:function(elem, options, i) {
var position = jQuery.css(elem, "position");
"static" === position && (elem.style.position = "relative");
var curTop, curLeft, curElem = jQuery(elem), curOffset = curElem.offset(), curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && jQuery.inArray("auto", [ curCSSTop, curCSSLeft ]) > -1, props = {}, curPosition = {};
calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, 
curLeft = curPosition.left) :(curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), 
jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)), null != options.top && (props.top = options.top - curOffset.top + curTop), 
null != options.left && (props.left = options.left - curOffset.left + curLeft), 
"using" in options ? options.using.call(elem, props) :curElem.css(props);
}
}, jQuery.fn.extend({
position:function() {
if (this[0]) {
var elem = this[0], offsetParent = this.offsetParent(), offset = this.offset(), parentOffset = rroot.test(offsetParent[0].nodeName) ? {
top:0,
left:0
} :offsetParent.offset();
return offset.top -= parseFloat(jQuery.css(elem, "marginTop")) || 0, offset.left -= parseFloat(jQuery.css(elem, "marginLeft")) || 0, 
parentOffset.top += parseFloat(jQuery.css(offsetParent[0], "borderTopWidth")) || 0, 
parentOffset.left += parseFloat(jQuery.css(offsetParent[0], "borderLeftWidth")) || 0, 
{
top:offset.top - parentOffset.top,
left:offset.left - parentOffset.left
};
}
},
offsetParent:function() {
return this.map(function() {
for (var offsetParent = this.offsetParent || document.body; offsetParent && !rroot.test(offsetParent.nodeName) && "static" === jQuery.css(offsetParent, "position"); ) offsetParent = offsetParent.offsetParent;
return offsetParent || document.body;
});
}
}), jQuery.each({
scrollLeft:"pageXOffset",
scrollTop:"pageYOffset"
}, function(method, prop) {
var top = /Y/.test(prop);
jQuery.fn[method] = function(val) {
return jQuery.access(this, function(elem, method, val) {
var win = getWindow(elem);
return val === undefined ? win ? prop in win ? win[prop] :win.document.documentElement[method] :elem[method] :(win ? win.scrollTo(top ? jQuery(win).scrollLeft() :val, top ? val :jQuery(win).scrollTop()) :elem[method] = val, 
void 0);
}, method, val, arguments.length, null);
};
}), jQuery.each({
Height:"height",
Width:"width"
}, function(name, type) {
jQuery.each({
padding:"inner" + name,
content:type,
"":"outer" + name
}, function(defaultExtra, funcName) {
jQuery.fn[funcName] = function(margin, value) {
var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin), extra = defaultExtra || (margin === !0 || value === !0 ? "margin" :"border");
return jQuery.access(this, function(elem, type, value) {
var doc;
return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] :9 === elem.nodeType ? (doc = elem.documentElement, 
Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) :value === undefined ? jQuery.css(elem, type, value, extra) :jQuery.style(elem, type, value, extra);
}, type, chainable ? margin :undefined, chainable, null);
};
});
}), window.jQuery = window.$ = jQuery, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
return jQuery;
});
}(window), /*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.sortable.js, jquery.effects.core.js, jquery.effects.blind.js, jquery.effects.bounce.js, jquery.effects.clip.js, jquery.effects.drop.js, jquery.effects.explode.js, jquery.effects.fade.js, jquery.effects.fold.js, jquery.effects.highlight.js, jquery.effects.pulsate.js, jquery.effects.scale.js, jquery.effects.shake.js, jquery.effects.slide.js, jquery.effects.transfer.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.position.js, jquery.ui.progressbar.js, jquery.ui.slider.js, jquery.ui.tabs.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
function($, undefined) {
function focusable(element, isTabIndexNotNaN) {
var nodeName = element.nodeName.toLowerCase();
if ("area" === nodeName) {
var img, map = element.parentNode, mapName = map.name;
return element.href && mapName && "map" === map.nodeName.toLowerCase() ? (img = $("img[usemap=#" + mapName + "]")[0], 
!!img && visible(img)) :!1;
}
return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled :"a" == nodeName ? element.href || isTabIndexNotNaN :isTabIndexNotNaN) && visible(element);
}
function visible(element) {
return !$(element).parents().andSelf().filter(function() {
return "hidden" === $.curCSS(this, "visibility") || $.expr.filters.hidden(this);
}).length;
}
$.ui = $.ui || {}, $.ui.version || ($.extend($.ui, {
version:"1.8.23",
keyCode:{
ALT:18,
BACKSPACE:8,
CAPS_LOCK:20,
COMMA:188,
COMMAND:91,
COMMAND_LEFT:91,
COMMAND_RIGHT:93,
CONTROL:17,
DELETE:46,
DOWN:40,
END:35,
ENTER:13,
ESCAPE:27,
HOME:36,
INSERT:45,
LEFT:37,
MENU:93,
NUMPAD_ADD:107,
NUMPAD_DECIMAL:110,
NUMPAD_DIVIDE:111,
NUMPAD_ENTER:108,
NUMPAD_MULTIPLY:106,
NUMPAD_SUBTRACT:109,
PAGE_DOWN:34,
PAGE_UP:33,
PERIOD:190,
RIGHT:39,
SHIFT:16,
SPACE:32,
TAB:9,
UP:38,
WINDOWS:91
}
}), $.fn.extend({
propAttr:$.fn.prop || $.fn.attr,
_focus:$.fn.focus,
focus:function(delay, fn) {
return "number" == typeof delay ? this.each(function() {
var elem = this;
setTimeout(function() {
$(elem).focus(), fn && fn.call(elem);
}, delay);
}) :this._focus.apply(this, arguments);
},
scrollParent:function() {
var scrollParent;
return scrollParent = $.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
return /(relative|absolute|fixed)/.test($.curCSS(this, "position", 1)) && /(auto|scroll)/.test($.curCSS(this, "overflow", 1) + $.curCSS(this, "overflow-y", 1) + $.curCSS(this, "overflow-x", 1));
}).eq(0) :this.parents().filter(function() {
return /(auto|scroll)/.test($.curCSS(this, "overflow", 1) + $.curCSS(this, "overflow-y", 1) + $.curCSS(this, "overflow-x", 1));
}).eq(0), /fixed/.test(this.css("position")) || !scrollParent.length ? $(document) :scrollParent;
},
zIndex:function(zIndex) {
if (zIndex !== undefined) return this.css("zIndex", zIndex);
if (this.length) for (var position, value, elem = $(this[0]); elem.length && elem[0] !== document; ) {
if (position = elem.css("position"), ("absolute" === position || "relative" === position || "fixed" === position) && (value = parseInt(elem.css("zIndex"), 10), 
!isNaN(value) && 0 !== value)) return value;
elem = elem.parent();
}
return 0;
},
disableSelection:function() {
return this.bind(($.support.selectstart ? "selectstart" :"mousedown") + ".ui-disableSelection", function(event) {
event.preventDefault();
});
},
enableSelection:function() {
return this.unbind(".ui-disableSelection");
}
}), $("<a>").outerWidth(1).jquery || $.each([ "Width", "Height" ], function(i, name) {
function reduce(elem, size, border, margin) {
return $.each(side, function() {
size -= parseFloat($.curCSS(elem, "padding" + this, !0)) || 0, border && (size -= parseFloat($.curCSS(elem, "border" + this + "Width", !0)) || 0), 
margin && (size -= parseFloat($.curCSS(elem, "margin" + this, !0)) || 0);
}), size;
}
var side = "Width" === name ? [ "Left", "Right" ] :[ "Top", "Bottom" ], type = name.toLowerCase(), orig = {
innerWidth:$.fn.innerWidth,
innerHeight:$.fn.innerHeight,
outerWidth:$.fn.outerWidth,
outerHeight:$.fn.outerHeight
};
$.fn["inner" + name] = function(size) {
return size === undefined ? orig["inner" + name].call(this) :this.each(function() {
$(this).css(type, reduce(this, size) + "px");
});
}, $.fn["outer" + name] = function(size, margin) {
return "number" != typeof size ? orig["outer" + name].call(this, size) :this.each(function() {
$(this).css(type, reduce(this, size, !0, margin) + "px");
});
};
}), $.extend($.expr[":"], {
data:$.expr.createPseudo ? $.expr.createPseudo(function(dataName) {
return function(elem) {
return !!$.data(elem, dataName);
};
}) :function(elem, i, match) {
return !!$.data(elem, match[3]);
},
focusable:function(element) {
return focusable(element, !isNaN($.attr(element, "tabindex")));
},
tabbable:function(element) {
var tabIndex = $.attr(element, "tabindex"), isTabIndexNaN = isNaN(tabIndex);
return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
}
}), $(function() {
var body = document.body, div = body.appendChild(div = document.createElement("div"));
div.offsetHeight, $.extend(div.style, {
minHeight:"100px",
height:"auto",
padding:0,
borderWidth:0
}), $.support.minHeight = 100 === div.offsetHeight, $.support.selectstart = "onselectstart" in div, 
body.removeChild(div).style.display = "none";
}), $.curCSS || ($.curCSS = $.css), $.extend($.ui, {
plugin:{
add:function(module, option, set) {
var proto = $.ui[module].prototype;
for (var i in set) proto.plugins[i] = proto.plugins[i] || [], proto.plugins[i].push([ option, set[i] ]);
},
call:function(instance, name, args) {
var set = instance.plugins[name];
if (set && instance.element[0].parentNode) for (var i = 0; i < set.length; i++) instance.options[set[i][0]] && set[i][1].apply(instance.element, args);
}
},
contains:function(a, b) {
return document.compareDocumentPosition ? 16 & a.compareDocumentPosition(b) :a !== b && a.contains(b);
},
hasScroll:function(el, a) {
if ("hidden" === $(el).css("overflow")) return !1;
var scroll = a && "left" === a ? "scrollLeft" :"scrollTop", has = !1;
return el[scroll] > 0 ? !0 :(el[scroll] = 1, has = el[scroll] > 0, el[scroll] = 0, 
has);
},
isOverAxis:function(x, reference, size) {
return x > reference && reference + size > x;
},
isOver:function(y, x, top, left, height, width) {
return $.ui.isOverAxis(y, top, height) && $.ui.isOverAxis(x, left, width);
}
}));
}(jQuery), function($, undefined) {
if ($.cleanData) {
var _cleanData = $.cleanData;
$.cleanData = function(elems) {
for (var elem, i = 0; null != (elem = elems[i]); i++) try {
$(elem).triggerHandler("remove");
} catch (e) {}
_cleanData(elems);
};
} else {
var _remove = $.fn.remove;
$.fn.remove = function(selector, keepData) {
return this.each(function() {
return keepData || (!selector || $.filter(selector, [ this ]).length) && $("*", this).add([ this ]).each(function() {
try {
$(this).triggerHandler("remove");
} catch (e) {}
}), _remove.call($(this), selector, keepData);
});
};
}
$.widget = function(name, base, prototype) {
var fullName, namespace = name.split(".")[0];
name = name.split(".")[1], fullName = namespace + "-" + name, prototype || (prototype = base, 
base = $.Widget), $.expr[":"][fullName] = function(elem) {
return !!$.data(elem, name);
}, $[namespace] = $[namespace] || {}, $[namespace][name] = function(options, element) {
arguments.length && this._createWidget(options, element);
};
var basePrototype = new base();
basePrototype.options = $.extend(!0, {}, basePrototype.options), $[namespace][name].prototype = $.extend(!0, basePrototype, {
namespace:namespace,
widgetName:name,
widgetEventPrefix:$[namespace][name].prototype.widgetEventPrefix || name,
widgetBaseClass:fullName
}, prototype), $.widget.bridge(name, $[namespace][name]);
}, $.widget.bridge = function(name, object) {
$.fn[name] = function(options) {
var isMethodCall = "string" == typeof options, args = Array.prototype.slice.call(arguments, 1), returnValue = this;
return options = !isMethodCall && args.length ? $.extend.apply(null, [ !0, options ].concat(args)) :options, 
isMethodCall && "_" === options.charAt(0) ? returnValue :(isMethodCall ? this.each(function() {
var instance = $.data(this, name), methodValue = instance && $.isFunction(instance[options]) ? instance[options].apply(instance, args) :instance;
return methodValue !== instance && methodValue !== undefined ? (returnValue = methodValue, 
!1) :void 0;
}) :this.each(function() {
var instance = $.data(this, name);
instance ? instance.option(options || {})._init() :$.data(this, name, new object(options, this));
}), returnValue);
};
}, $.Widget = function(options, element) {
arguments.length && this._createWidget(options, element);
}, $.Widget.prototype = {
widgetName:"widget",
widgetEventPrefix:"",
options:{
disabled:!1
},
_createWidget:function(options, element) {
$.data(element, this.widgetName, this), this.element = $(element), this.options = $.extend(!0, {}, this.options, this._getCreateOptions(), options);
var self = this;
this.element.bind("remove." + this.widgetName, function() {
self.destroy();
}), this._create(), this._trigger("create"), this._init();
},
_getCreateOptions:function() {
return $.metadata && $.metadata.get(this.element[0])[this.widgetName];
},
_create:function() {},
_init:function() {},
destroy:function() {
this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled");
},
widget:function() {
return this.element;
},
option:function(key, value) {
var options = key;
if (0 === arguments.length) return $.extend({}, this.options);
if ("string" == typeof key) {
if (value === undefined) return this.options[key];
options = {}, options[key] = value;
}
return this._setOptions(options), this;
},
_setOptions:function(options) {
var self = this;
return $.each(options, function(key, value) {
self._setOption(key, value);
}), this;
},
_setOption:function(key, value) {
return this.options[key] = value, "disabled" === key && this.widget()[value ? "addClass" :"removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", value), 
this;
},
enable:function() {
return this._setOption("disabled", !1);
},
disable:function() {
return this._setOption("disabled", !0);
},
_trigger:function(type, event, data) {
var prop, orig, callback = this.options[type];
if (data = data || {}, event = $.Event(event), event.type = (type === this.widgetEventPrefix ? type :this.widgetEventPrefix + type).toLowerCase(), 
event.target = this.element[0], orig = event.originalEvent) for (prop in orig) prop in event || (event[prop] = orig[prop]);
return this.element.trigger(event, data), !($.isFunction(callback) && callback.call(this.element[0], event, data) === !1 || event.isDefaultPrevented());
}
};
}(jQuery), function($) {
var mouseHandled = !1;
$(document).mouseup(function() {
mouseHandled = !1;
}), $.widget("ui.mouse", {
options:{
cancel:":input,option",
distance:1,
delay:0
},
_mouseInit:function() {
var self = this;
this.element.bind("mousedown." + this.widgetName, function(event) {
return self._mouseDown(event);
}).bind("click." + this.widgetName, function(event) {
return !0 === $.data(event.target, self.widgetName + ".preventClickEvent") ? ($.removeData(event.target, self.widgetName + ".preventClickEvent"), 
event.stopImmediatePropagation(), !1) :void 0;
}), this.started = !1;
},
_mouseDestroy:function() {
this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && $(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
},
_mouseDown:function(event) {
if (!mouseHandled) {
this._mouseStarted && this._mouseUp(event), this._mouseDownEvent = event;
var self = this, btnIsLeft = 1 == event.which, elIsCancel = "string" == typeof this.options.cancel && event.target.nodeName ? $(event.target).closest(this.options.cancel).length :!1;
return btnIsLeft && !elIsCancel && this._mouseCapture(event) ? (this.mouseDelayMet = !this.options.delay, 
this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
self.mouseDelayMet = !0;
}, this.options.delay)), this._mouseDistanceMet(event) && this._mouseDelayMet(event) && (this._mouseStarted = this._mouseStart(event) !== !1, 
!this._mouseStarted) ? (event.preventDefault(), !0) :(!0 === $.data(event.target, this.widgetName + ".preventClickEvent") && $.removeData(event.target, this.widgetName + ".preventClickEvent"), 
this._mouseMoveDelegate = function(event) {
return self._mouseMove(event);
}, this._mouseUpDelegate = function(event) {
return self._mouseUp(event);
}, $(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), 
event.preventDefault(), mouseHandled = !0, !0)) :!0;
}
},
_mouseMove:function(event) {
return !$.browser.msie || document.documentMode >= 9 || event.button ? this._mouseStarted ? (this._mouseDrag(event), 
event.preventDefault()) :(this._mouseDistanceMet(event) && this._mouseDelayMet(event) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, event) !== !1, 
this._mouseStarted ? this._mouseDrag(event) :this._mouseUp(event)), !this._mouseStarted) :this._mouseUp(event);
},
_mouseUp:function(event) {
return $(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), 
this._mouseStarted && (this._mouseStarted = !1, event.target == this._mouseDownEvent.target && $.data(event.target, this.widgetName + ".preventClickEvent", !0), 
this._mouseStop(event)), !1;
},
_mouseDistanceMet:function(event) {
return Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance;
},
_mouseDelayMet:function() {
return this.mouseDelayMet;
},
_mouseStart:function() {},
_mouseDrag:function() {},
_mouseStop:function() {},
_mouseCapture:function() {
return !0;
}
});
}(jQuery), function($) {
$.widget("ui.draggable", $.ui.mouse, {
widgetEventPrefix:"drag",
options:{
addClasses:!0,
appendTo:"parent",
axis:!1,
connectToSortable:!1,
containment:!1,
cursor:"auto",
cursorAt:!1,
grid:!1,
handle:!1,
helper:"original",
iframeFix:!1,
opacity:!1,
refreshPositions:!1,
revert:!1,
revertDuration:500,
scope:"default",
scroll:!0,
scrollSensitivity:20,
scrollSpeed:20,
snap:!1,
snapMode:"both",
snapTolerance:20,
stack:!1,
zIndex:!1
},
_create:function() {
"original" != this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), 
this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), 
this._mouseInit();
},
destroy:function() {
return this.element.data("draggable") ? (this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), 
this._mouseDestroy(), this) :void 0;
},
_mouseCapture:function(event) {
var o = this.options;
return this.helper || o.disabled || $(event.target).is(".ui-resizable-handle") ? !1 :(this.handle = this._getHandle(event), 
this.handle ? (o.iframeFix && $(o.iframeFix === !0 ? "iframe" :o.iframeFix).each(function() {
$('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
width:this.offsetWidth + "px",
height:this.offsetHeight + "px",
position:"absolute",
opacity:"0.001",
zIndex:1e3
}).css($(this).offset()).appendTo("body");
}), !0) :!1);
},
_mouseStart:function(event) {
var o = this.options;
return this.helper = this._createHelper(event), this.helper.addClass("ui-draggable-dragging"), 
this._cacheHelperProportions(), $.ui.ddmanager && ($.ui.ddmanager.current = this), 
this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), 
this.offset = this.positionAbs = this.element.offset(), this.offset = {
top:this.offset.top - this.margins.top,
left:this.offset.left - this.margins.left
}, $.extend(this.offset, {
click:{
left:event.pageX - this.offset.left,
top:event.pageY - this.offset.top
},
parent:this._getParentOffset(),
relative:this._getRelativeOffset()
}), this.originalPosition = this.position = this._generatePosition(event), this.originalPageX = event.pageX, 
this.originalPageY = event.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), 
o.containment && this._setContainment(), this._trigger("start", event) === !1 ? (this._clear(), 
!1) :(this._cacheHelperProportions(), $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event), 
this._mouseDrag(event, !0), $.ui.ddmanager && $.ui.ddmanager.dragStart(this, event), 
!0);
},
_mouseDrag:function(event, noPropagation) {
if (this.position = this._generatePosition(event), this.positionAbs = this._convertPositionTo("absolute"), 
!noPropagation) {
var ui = this._uiHash();
if (this._trigger("drag", event, ui) === !1) return this._mouseUp({}), !1;
this.position = ui.position;
}
return this.options.axis && "y" == this.options.axis || (this.helper[0].style.left = this.position.left + "px"), 
this.options.axis && "x" == this.options.axis || (this.helper[0].style.top = this.position.top + "px"), 
$.ui.ddmanager && $.ui.ddmanager.drag(this, event), !1;
},
_mouseStop:function(event) {
var dropped = !1;
$.ui.ddmanager && !this.options.dropBehaviour && (dropped = $.ui.ddmanager.drop(this, event)), 
this.dropped && (dropped = this.dropped, this.dropped = !1);
for (var element = this.element[0], elementInDom = !1; element && (element = element.parentNode); ) element == document && (elementInDom = !0);
if (!elementInDom && "original" === this.options.helper) return !1;
if ("invalid" == this.options.revert && !dropped || "valid" == this.options.revert && dropped || this.options.revert === !0 || $.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped)) {
var self = this;
$(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
self._trigger("stop", event) !== !1 && self._clear();
});
} else this._trigger("stop", event) !== !1 && this._clear();
return !1;
},
_mouseUp:function(event) {
return this.options.iframeFix === !0 && $("div.ui-draggable-iframeFix").each(function() {
this.parentNode.removeChild(this);
}), $.ui.ddmanager && $.ui.ddmanager.dragStop(this, event), $.ui.mouse.prototype._mouseUp.call(this, event);
},
cancel:function() {
return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) :this._clear(), 
this;
},
_getHandle:function(event) {
var handle = this.options.handle && $(this.options.handle, this.element).length ? !1 :!0;
return $(this.options.handle, this.element).find("*").andSelf().each(function() {
this == event.target && (handle = !0);
}), handle;
},
_createHelper:function(event) {
var o = this.options, helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [ event ])) :"clone" == o.helper ? this.element.clone().removeAttr("id") :this.element;
return helper.parents("body").length || helper.appendTo("parent" == o.appendTo ? this.element[0].parentNode :o.appendTo), 
helper[0] == this.element[0] || /(fixed|absolute)/.test(helper.css("position")) || helper.css("position", "absolute"), 
helper;
},
_adjustOffsetFromHelper:function(obj) {
"string" == typeof obj && (obj = obj.split(" ")), $.isArray(obj) && (obj = {
left:+obj[0],
top:+obj[1] || 0
}), "left" in obj && (this.offset.click.left = obj.left + this.margins.left), "right" in obj && (this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left), 
"top" in obj && (this.offset.click.top = obj.top + this.margins.top), "bottom" in obj && (this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top);
},
_getParentOffset:function() {
this.offsetParent = this.helper.offsetParent();
var po = this.offsetParent.offset();
return "absolute" == this.cssPosition && this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (po.left += this.scrollParent.scrollLeft(), 
po.top += this.scrollParent.scrollTop()), (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() && $.browser.msie) && (po = {
top:0,
left:0
}), {
top:po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
left:po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
};
},
_getRelativeOffset:function() {
if ("relative" == this.cssPosition) {
var p = this.element.position();
return {
top:p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
left:p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
};
}
return {
top:0,
left:0
};
},
_cacheMargins:function() {
this.margins = {
left:parseInt(this.element.css("marginLeft"), 10) || 0,
top:parseInt(this.element.css("marginTop"), 10) || 0,
right:parseInt(this.element.css("marginRight"), 10) || 0,
bottom:parseInt(this.element.css("marginBottom"), 10) || 0
};
},
_cacheHelperProportions:function() {
this.helperProportions = {
width:this.helper.outerWidth(),
height:this.helper.outerHeight()
};
},
_setContainment:function() {
var o = this.options;
if ("parent" == o.containment && (o.containment = this.helper[0].parentNode), ("document" == o.containment || "window" == o.containment) && (this.containment = [ "document" == o.containment ? 0 :$(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, "document" == o.containment ? 0 :$(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, ("document" == o.containment ? 0 :$(window).scrollLeft()) + $("document" == o.containment ? document :window).width() - this.helperProportions.width - this.margins.left, ("document" == o.containment ? 0 :$(window).scrollTop()) + ($("document" == o.containment ? document :window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ]), 
/^(document|window|parent)$/.test(o.containment) || o.containment.constructor == Array) o.containment.constructor == Array && (this.containment = o.containment); else {
var c = $(o.containment), ce = c[0];
if (!ce) return;
var over = (c.offset(), "hidden" != $(ce).css("overflow"));
this.containment = [ (parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0), (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0), (over ? Math.max(ce.scrollWidth, ce.offsetWidth) :ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (over ? Math.max(ce.scrollHeight, ce.offsetHeight) :ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom ], 
this.relative_container = c;
}
},
_convertPositionTo:function(d, pos) {
pos || (pos = this.position);
var mod = "absolute" == d ? 1 :-1, scroll = (this.options, "absolute" != this.cssPosition || this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent :this.offsetParent), scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
return {
top:pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ($.browser.safari && $.browser.version < 526 && "fixed" == this.cssPosition ? 0 :("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() :scrollIsRootNode ? 0 :scroll.scrollTop()) * mod),
left:pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ($.browser.safari && $.browser.version < 526 && "fixed" == this.cssPosition ? 0 :("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() :scrollIsRootNode ? 0 :scroll.scrollLeft()) * mod)
};
},
_generatePosition:function(event) {
var o = this.options, scroll = "absolute" != this.cssPosition || this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent :this.offsetParent, scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName), pageX = event.pageX, pageY = event.pageY;
if (this.originalPosition) {
var containment;
if (this.containment) {
if (this.relative_container) {
var co = this.relative_container.offset();
containment = [ this.containment[0] + co.left, this.containment[1] + co.top, this.containment[2] + co.left, this.containment[3] + co.top ];
} else containment = this.containment;
event.pageX - this.offset.click.left < containment[0] && (pageX = containment[0] + this.offset.click.left), 
event.pageY - this.offset.click.top < containment[1] && (pageY = containment[1] + this.offset.click.top), 
event.pageX - this.offset.click.left > containment[2] && (pageX = containment[2] + this.offset.click.left), 
event.pageY - this.offset.click.top > containment[3] && (pageY = containment[3] + this.offset.click.top);
}
if (o.grid) {
var top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] :this.originalPageY;
pageY = containment ? top - this.offset.click.top < containment[1] || top - this.offset.click.top > containment[3] ? top - this.offset.click.top < containment[1] ? top + o.grid[1] :top - o.grid[1] :top :top;
var left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] :this.originalPageX;
pageX = containment ? left - this.offset.click.left < containment[0] || left - this.offset.click.left > containment[2] ? left - this.offset.click.left < containment[0] ? left + o.grid[0] :left - o.grid[0] :left :left;
}
}
return {
top:pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ($.browser.safari && $.browser.version < 526 && "fixed" == this.cssPosition ? 0 :"fixed" == this.cssPosition ? -this.scrollParent.scrollTop() :scrollIsRootNode ? 0 :scroll.scrollTop()),
left:pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ($.browser.safari && $.browser.version < 526 && "fixed" == this.cssPosition ? 0 :"fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() :scrollIsRootNode ? 0 :scroll.scrollLeft())
};
},
_clear:function() {
this.helper.removeClass("ui-draggable-dragging"), this.helper[0] == this.element[0] || this.cancelHelperRemoval || this.helper.remove(), 
this.helper = null, this.cancelHelperRemoval = !1;
},
_trigger:function(type, event, ui) {
return ui = ui || this._uiHash(), $.ui.plugin.call(this, type, [ event, ui ]), "drag" == type && (this.positionAbs = this._convertPositionTo("absolute")), 
$.Widget.prototype._trigger.call(this, type, event, ui);
},
plugins:{},
_uiHash:function() {
return {
helper:this.helper,
position:this.position,
originalPosition:this.originalPosition,
offset:this.positionAbs
};
}
}), $.extend($.ui.draggable, {
version:"1.8.23"
}), $.ui.plugin.add("draggable", "connectToSortable", {
start:function(event, ui) {
var inst = $(this).data("draggable"), o = inst.options, uiSortable = $.extend({}, ui, {
item:inst.element
});
inst.sortables = [], $(o.connectToSortable).each(function() {
var sortable = $.data(this, "sortable");
sortable && !sortable.options.disabled && (inst.sortables.push({
instance:sortable,
shouldRevert:sortable.options.revert
}), sortable.refreshPositions(), sortable._trigger("activate", event, uiSortable));
});
},
stop:function(event, ui) {
var inst = $(this).data("draggable"), uiSortable = $.extend({}, ui, {
item:inst.element
});
$.each(inst.sortables, function() {
this.instance.isOver ? (this.instance.isOver = 0, inst.cancelHelperRemoval = !0, 
this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), 
this.instance._mouseStop(event), this.instance.options.helper = this.instance.options._helper, 
"original" == inst.options.helper && this.instance.currentItem.css({
top:"auto",
left:"auto"
})) :(this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", event, uiSortable));
});
},
drag:function(event, ui) {
var inst = $(this).data("draggable"), self = this;
$.each(inst.sortables, function() {
this.instance.positionAbs = inst.positionAbs, this.instance.helperProportions = inst.helperProportions, 
this.instance.offset.click = inst.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, 
this.instance.currentItem = $(self).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), 
this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
return ui.helper[0];
}, event.target = this.instance.currentItem[0], this.instance._mouseCapture(event, !0), 
this.instance._mouseStart(event, !0, !0), this.instance.offset.click.top = inst.offset.click.top, 
this.instance.offset.click.left = inst.offset.click.left, this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left, 
this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top, 
inst._trigger("toSortable", event), inst.dropped = this.instance.element, inst.currentItem = inst.element, 
this.instance.fromOutside = inst), this.instance.currentItem && this.instance._mouseDrag(event)) :this.instance.isOver && (this.instance.isOver = 0, 
this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", event, this.instance._uiHash(this.instance)), 
this.instance._mouseStop(event, !0), this.instance.options.helper = this.instance.options._helper, 
this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), 
inst._trigger("fromSortable", event), inst.dropped = !1);
});
}
}), $.ui.plugin.add("draggable", "cursor", {
start:function() {
var t = $("body"), o = $(this).data("draggable").options;
t.css("cursor") && (o._cursor = t.css("cursor")), t.css("cursor", o.cursor);
},
stop:function() {
var o = $(this).data("draggable").options;
o._cursor && $("body").css("cursor", o._cursor);
}
}), $.ui.plugin.add("draggable", "opacity", {
start:function(event, ui) {
var t = $(ui.helper), o = $(this).data("draggable").options;
t.css("opacity") && (o._opacity = t.css("opacity")), t.css("opacity", o.opacity);
},
stop:function(event, ui) {
var o = $(this).data("draggable").options;
o._opacity && $(ui.helper).css("opacity", o._opacity);
}
}), $.ui.plugin.add("draggable", "scroll", {
start:function() {
var i = $(this).data("draggable");
i.scrollParent[0] != document && "HTML" != i.scrollParent[0].tagName && (i.overflowOffset = i.scrollParent.offset());
},
drag:function(event) {
var i = $(this).data("draggable"), o = i.options, scrolled = !1;
i.scrollParent[0] != document && "HTML" != i.scrollParent[0].tagName ? (o.axis && "x" == o.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - event.pageY < o.scrollSensitivity ? i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop + o.scrollSpeed :event.pageY - i.overflowOffset.top < o.scrollSensitivity && (i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop - o.scrollSpeed)), 
o.axis && "y" == o.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - event.pageX < o.scrollSensitivity ? i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft + o.scrollSpeed :event.pageX - i.overflowOffset.left < o.scrollSensitivity && (i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft - o.scrollSpeed))) :(o.axis && "x" == o.axis || (event.pageY - $(document).scrollTop() < o.scrollSensitivity ? scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed) :$(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity && (scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed))), 
o.axis && "y" == o.axis || (event.pageX - $(document).scrollLeft() < o.scrollSensitivity ? scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed) :$(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity && (scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed)))), 
scrolled !== !1 && $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(i, event);
}
}), $.ui.plugin.add("draggable", "snap", {
start:function() {
var i = $(this).data("draggable"), o = i.options;
i.snapElements = [], $(o.snap.constructor != String ? o.snap.items || ":data(draggable)" :o.snap).each(function() {
var $t = $(this), $o = $t.offset();
this != i.element[0] && i.snapElements.push({
item:this,
width:$t.outerWidth(),
height:$t.outerHeight(),
top:$o.top,
left:$o.left
});
});
},
drag:function(event, ui) {
for (var inst = $(this).data("draggable"), o = inst.options, d = o.snapTolerance, x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width, y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height, i = inst.snapElements.length - 1; i >= 0; i--) {
var l = inst.snapElements[i].left, r = l + inst.snapElements[i].width, t = inst.snapElements[i].top, b = t + inst.snapElements[i].height;
if (x1 > l - d && r + d > x1 && y1 > t - d && b + d > y1 || x1 > l - d && r + d > x1 && y2 > t - d && b + d > y2 || x2 > l - d && r + d > x2 && y1 > t - d && b + d > y1 || x2 > l - d && r + d > x2 && y2 > t - d && b + d > y2) {
if ("inner" != o.snapMode) {
var ts = Math.abs(t - y2) <= d, bs = Math.abs(b - y1) <= d, ls = Math.abs(l - x2) <= d, rs = Math.abs(r - x1) <= d;
ts && (ui.position.top = inst._convertPositionTo("relative", {
top:t - inst.helperProportions.height,
left:0
}).top - inst.margins.top), bs && (ui.position.top = inst._convertPositionTo("relative", {
top:b,
left:0
}).top - inst.margins.top), ls && (ui.position.left = inst._convertPositionTo("relative", {
top:0,
left:l - inst.helperProportions.width
}).left - inst.margins.left), rs && (ui.position.left = inst._convertPositionTo("relative", {
top:0,
left:r
}).left - inst.margins.left);
}
var first = ts || bs || ls || rs;
if ("outer" != o.snapMode) {
var ts = Math.abs(t - y1) <= d, bs = Math.abs(b - y2) <= d, ls = Math.abs(l - x1) <= d, rs = Math.abs(r - x2) <= d;
ts && (ui.position.top = inst._convertPositionTo("relative", {
top:t,
left:0
}).top - inst.margins.top), bs && (ui.position.top = inst._convertPositionTo("relative", {
top:b - inst.helperProportions.height,
left:0
}).top - inst.margins.top), ls && (ui.position.left = inst._convertPositionTo("relative", {
top:0,
left:l
}).left - inst.margins.left), rs && (ui.position.left = inst._convertPositionTo("relative", {
top:0,
left:r - inst.helperProportions.width
}).left - inst.margins.left);
}
!inst.snapElements[i].snapping && (ts || bs || ls || rs || first) && inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), {
snapItem:inst.snapElements[i].item
})), inst.snapElements[i].snapping = ts || bs || ls || rs || first;
} else inst.snapElements[i].snapping && inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), {
snapItem:inst.snapElements[i].item
})), inst.snapElements[i].snapping = !1;
}
}
}), $.ui.plugin.add("draggable", "stack", {
start:function() {
var o = $(this).data("draggable").options, group = $.makeArray($(o.stack)).sort(function(a, b) {
return (parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0);
});
if (group.length) {
var min = parseInt(group[0].style.zIndex) || 0;
$(group).each(function(i) {
this.style.zIndex = min + i;
}), this[0].style.zIndex = min + group.length;
}
}
}), $.ui.plugin.add("draggable", "zIndex", {
start:function(event, ui) {
var t = $(ui.helper), o = $(this).data("draggable").options;
t.css("zIndex") && (o._zIndex = t.css("zIndex")), t.css("zIndex", o.zIndex);
},
stop:function(event, ui) {
var o = $(this).data("draggable").options;
o._zIndex && $(ui.helper).css("zIndex", o._zIndex);
}
});
}(jQuery), function($) {
$.widget("ui.droppable", {
widgetEventPrefix:"drop",
options:{
accept:"*",
activeClass:!1,
addClasses:!0,
greedy:!1,
hoverClass:!1,
scope:"default",
tolerance:"intersect"
},
_create:function() {
var o = this.options, accept = o.accept;
this.isover = 0, this.isout = 1, this.accept = $.isFunction(accept) ? accept :function(d) {
return d.is(accept);
}, this.proportions = {
width:this.element[0].offsetWidth,
height:this.element[0].offsetHeight
}, $.ui.ddmanager.droppables[o.scope] = $.ui.ddmanager.droppables[o.scope] || [], 
$.ui.ddmanager.droppables[o.scope].push(this), o.addClasses && this.element.addClass("ui-droppable");
},
destroy:function() {
for (var drop = $.ui.ddmanager.droppables[this.options.scope], i = 0; i < drop.length; i++) drop[i] == this && drop.splice(i, 1);
return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"), 
this;
},
_setOption:function(key, value) {
"accept" == key && (this.accept = $.isFunction(value) ? value :function(d) {
return d.is(value);
}), $.Widget.prototype._setOption.apply(this, arguments);
},
_activate:function(event) {
var draggable = $.ui.ddmanager.current;
this.options.activeClass && this.element.addClass(this.options.activeClass), draggable && this._trigger("activate", event, this.ui(draggable));
},
_deactivate:function(event) {
var draggable = $.ui.ddmanager.current;
this.options.activeClass && this.element.removeClass(this.options.activeClass), 
draggable && this._trigger("deactivate", event, this.ui(draggable));
},
_over:function(event) {
var draggable = $.ui.ddmanager.current;
draggable && (draggable.currentItem || draggable.element)[0] != this.element[0] && this.accept.call(this.element[0], draggable.currentItem || draggable.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), 
this._trigger("over", event, this.ui(draggable)));
},
_out:function(event) {
var draggable = $.ui.ddmanager.current;
draggable && (draggable.currentItem || draggable.element)[0] != this.element[0] && this.accept.call(this.element[0], draggable.currentItem || draggable.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), 
this._trigger("out", event, this.ui(draggable)));
},
_drop:function(event, custom) {
var draggable = custom || $.ui.ddmanager.current;
if (!draggable || (draggable.currentItem || draggable.element)[0] == this.element[0]) return !1;
var childrenIntersection = !1;
return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
var inst = $.data(this, "droppable");
return inst.options.greedy && !inst.options.disabled && inst.options.scope == draggable.options.scope && inst.accept.call(inst.element[0], draggable.currentItem || draggable.element) && $.ui.intersect(draggable, $.extend(inst, {
offset:inst.element.offset()
}), inst.options.tolerance) ? (childrenIntersection = !0, !1) :void 0;
}), childrenIntersection ? !1 :this.accept.call(this.element[0], draggable.currentItem || draggable.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), 
this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", event, this.ui(draggable)), 
this.element) :!1;
},
ui:function(c) {
return {
draggable:c.currentItem || c.element,
helper:c.helper,
position:c.position,
offset:c.positionAbs
};
}
}), $.extend($.ui.droppable, {
version:"1.8.23"
}), $.ui.intersect = function(draggable, droppable, toleranceMode) {
if (!droppable.offset) return !1;
var x1 = (draggable.positionAbs || draggable.position.absolute).left, x2 = x1 + draggable.helperProportions.width, y1 = (draggable.positionAbs || draggable.position.absolute).top, y2 = y1 + draggable.helperProportions.height, l = droppable.offset.left, r = l + droppable.proportions.width, t = droppable.offset.top, b = t + droppable.proportions.height;
switch (toleranceMode) {
case "fit":
return x1 >= l && r >= x2 && y1 >= t && b >= y2;

case "intersect":
return l < x1 + draggable.helperProportions.width / 2 && x2 - draggable.helperProportions.width / 2 < r && t < y1 + draggable.helperProportions.height / 2 && y2 - draggable.helperProportions.height / 2 < b;

case "pointer":
var draggableLeft = (draggable.positionAbs || draggable.position.absolute).left + (draggable.clickOffset || draggable.offset.click).left, draggableTop = (draggable.positionAbs || draggable.position.absolute).top + (draggable.clickOffset || draggable.offset.click).top, isOver = $.ui.isOver(draggableTop, draggableLeft, t, l, droppable.proportions.height, droppable.proportions.width);
return isOver;

case "touch":
return (y1 >= t && b >= y1 || y2 >= t && b >= y2 || t > y1 && y2 > b) && (x1 >= l && r >= x1 || x2 >= l && r >= x2 || l > x1 && x2 > r);

default:
return !1;
}
}, $.ui.ddmanager = {
current:null,
droppables:{
"default":[]
},
prepareOffsets:function(t, event) {
var m = $.ui.ddmanager.droppables[t.options.scope] || [], type = event ? event.type :null, list = (t.currentItem || t.element).find(":data(droppable)").andSelf();
droppablesLoop:for (var i = 0; i < m.length; i++) if (!(m[i].options.disabled || t && !m[i].accept.call(m[i].element[0], t.currentItem || t.element))) {
for (var j = 0; j < list.length; j++) if (list[j] == m[i].element[0]) {
m[i].proportions.height = 0;
continue droppablesLoop;
}
m[i].visible = "none" != m[i].element.css("display"), m[i].visible && ("mousedown" == type && m[i]._activate.call(m[i], event), 
m[i].offset = m[i].element.offset(), m[i].proportions = {
width:m[i].element[0].offsetWidth,
height:m[i].element[0].offsetHeight
});
}
},
drop:function(draggable, event) {
var dropped = !1;
return $.each($.ui.ddmanager.droppables[draggable.options.scope] || [], function() {
this.options && (!this.options.disabled && this.visible && $.ui.intersect(draggable, this, this.options.tolerance) && (dropped = this._drop.call(this, event) || dropped), 
!this.options.disabled && this.visible && this.accept.call(this.element[0], draggable.currentItem || draggable.element) && (this.isout = 1, 
this.isover = 0, this._deactivate.call(this, event)));
}), dropped;
},
dragStart:function(draggable, event) {
draggable.element.parents(":not(body,html)").bind("scroll.droppable", function() {
draggable.options.refreshPositions || $.ui.ddmanager.prepareOffsets(draggable, event);
});
},
drag:function(draggable, event) {
draggable.options.refreshPositions && $.ui.ddmanager.prepareOffsets(draggable, event), 
$.each($.ui.ddmanager.droppables[draggable.options.scope] || [], function() {
if (!this.options.disabled && !this.greedyChild && this.visible) {
var intersects = $.ui.intersect(draggable, this, this.options.tolerance), c = intersects || 1 != this.isover ? intersects && 0 == this.isover ? "isover" :null :"isout";
if (c) {
var parentInstance;
if (this.options.greedy) {
var parent = this.element.parents(":data(droppable):eq(0)");
parent.length && (parentInstance = $.data(parent[0], "droppable"), parentInstance.greedyChild = "isover" == c ? 1 :0);
}
parentInstance && "isover" == c && (parentInstance.isover = 0, parentInstance.isout = 1, 
parentInstance._out.call(parentInstance, event)), this[c] = 1, this["isout" == c ? "isover" :"isout"] = 0, 
this["isover" == c ? "_over" :"_out"].call(this, event), parentInstance && "isout" == c && (parentInstance.isout = 0, 
parentInstance.isover = 1, parentInstance._over.call(parentInstance, event));
}
}
});
},
dragStop:function(draggable, event) {
draggable.element.parents(":not(body,html)").unbind("scroll.droppable"), draggable.options.refreshPositions || $.ui.ddmanager.prepareOffsets(draggable, event);
}
};
}(jQuery), function($) {
$.widget("ui.resizable", $.ui.mouse, {
widgetEventPrefix:"resize",
options:{
alsoResize:!1,
animate:!1,
animateDuration:"slow",
animateEasing:"swing",
aspectRatio:!1,
autoHide:!1,
containment:!1,
ghost:!1,
grid:!1,
handles:"e,s,se",
helper:!1,
maxHeight:null,
maxWidth:null,
minHeight:10,
minWidth:10,
zIndex:1e3
},
_create:function() {
var self = this, o = this.options;
if (this.element.addClass("ui-resizable"), $.extend(this, {
_aspectRatio:!!o.aspectRatio,
aspectRatio:o.aspectRatio,
originalElement:this.element,
_proportionallyResizeElements:[],
_helper:o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" :null
}), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap($('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
position:this.element.css("position"),
width:this.element.outerWidth(),
height:this.element.outerHeight(),
top:this.element.css("top"),
left:this.element.css("left")
})), this.element = this.element.parent().data("resizable", this.element.data("resizable")), 
this.elementIsWrapper = !0, this.element.css({
marginLeft:this.originalElement.css("marginLeft"),
marginTop:this.originalElement.css("marginTop"),
marginRight:this.originalElement.css("marginRight"),
marginBottom:this.originalElement.css("marginBottom")
}), this.originalElement.css({
marginLeft:0,
marginTop:0,
marginRight:0,
marginBottom:0
}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), 
this._proportionallyResizeElements.push(this.originalElement.css({
position:"static",
zoom:1,
display:"block"
})), this.originalElement.css({
margin:this.originalElement.css("margin")
}), this._proportionallyResize()), this.handles = o.handles || ($(".ui-resizable-handle", this.element).length ? {
n:".ui-resizable-n",
e:".ui-resizable-e",
s:".ui-resizable-s",
w:".ui-resizable-w",
se:".ui-resizable-se",
sw:".ui-resizable-sw",
ne:".ui-resizable-ne",
nw:".ui-resizable-nw"
} :"e,s,se"), this.handles.constructor == String) {
"all" == this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw");
var n = this.handles.split(",");
this.handles = {};
for (var i = 0; i < n.length; i++) {
var handle = $.trim(n[i]), hname = "ui-resizable-" + handle, axis = $('<div class="ui-resizable-handle ' + hname + '"></div>');
axis.css({
zIndex:o.zIndex
}), "se" == handle && axis.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[handle] = ".ui-resizable-" + handle, 
this.element.append(axis);
}
}
this._renderAxis = function(target) {
target = target || this.element;
for (var i in this.handles) {
if (this.handles[i].constructor == String && (this.handles[i] = $(this.handles[i], this.element).show()), 
this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
var axis = $(this.handles[i], this.element), padWrapper = 0;
padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() :axis.outerWidth();
var padPos = [ "padding", /ne|nw|n/.test(i) ? "Top" :/se|sw|s/.test(i) ? "Bottom" :/^e$/.test(i) ? "Right" :"Left" ].join("");
target.css(padPos, padWrapper), this._proportionallyResize();
}
$(this.handles[i]).length;
}
}, this._renderAxis(this.element), this._handles = $(".ui-resizable-handle", this.element).disableSelection(), 
this._handles.mouseover(function() {
if (!self.resizing) {
if (this.className) var axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
self.axis = axis && axis[1] ? axis[1] :"se";
}
}), o.autoHide && (this._handles.hide(), $(this.element).addClass("ui-resizable-autohide").hover(function() {
o.disabled || ($(this).removeClass("ui-resizable-autohide"), self._handles.show());
}, function() {
o.disabled || self.resizing || ($(this).addClass("ui-resizable-autohide"), self._handles.hide());
})), this._mouseInit();
},
destroy:function() {
this._mouseDestroy();
var _destroy = function(exp) {
$(exp).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove();
};
if (this.elementIsWrapper) {
_destroy(this.element);
var wrapper = this.element;
wrapper.after(this.originalElement.css({
position:wrapper.css("position"),
width:wrapper.outerWidth(),
height:wrapper.outerHeight(),
top:wrapper.css("top"),
left:wrapper.css("left")
})).remove();
}
return this.originalElement.css("resize", this.originalResizeStyle), _destroy(this.originalElement), 
this;
},
_mouseCapture:function(event) {
var handle = !1;
for (var i in this.handles) $(this.handles[i])[0] == event.target && (handle = !0);
return !this.options.disabled && handle;
},
_mouseStart:function(event) {
var o = this.options, iniPos = this.element.position(), el = this.element;
this.resizing = !0, this.documentScroll = {
top:$(document).scrollTop(),
left:$(document).scrollLeft()
}, (el.is(".ui-draggable") || /absolute/.test(el.css("position"))) && el.css({
position:"absolute",
top:iniPos.top,
left:iniPos.left
}), this._renderProxy();
var curleft = num(this.helper.css("left")), curtop = num(this.helper.css("top"));
o.containment && (curleft += $(o.containment).scrollLeft() || 0, curtop += $(o.containment).scrollTop() || 0), 
this.offset = this.helper.offset(), this.position = {
left:curleft,
top:curtop
}, this.size = this._helper ? {
width:el.outerWidth(),
height:el.outerHeight()
} :{
width:el.width(),
height:el.height()
}, this.originalSize = this._helper ? {
width:el.outerWidth(),
height:el.outerHeight()
} :{
width:el.width(),
height:el.height()
}, this.originalPosition = {
left:curleft,
top:curtop
}, this.sizeDiff = {
width:el.outerWidth() - el.width(),
height:el.outerHeight() - el.height()
}, this.originalMousePosition = {
left:event.pageX,
top:event.pageY
}, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio :this.originalSize.width / this.originalSize.height || 1;
var cursor = $(".ui-resizable-" + this.axis).css("cursor");
return $("body").css("cursor", "auto" == cursor ? this.axis + "-resize" :cursor), 
el.addClass("ui-resizable-resizing"), this._propagate("start", event), !0;
},
_mouseDrag:function(event) {
var el = this.helper, smp = (this.options, this.originalMousePosition), a = this.axis, dx = event.pageX - smp.left || 0, dy = event.pageY - smp.top || 0, trigger = this._change[a];
if (!trigger) return !1;
{
var data = trigger.apply(this, [ event, dx, dy ]);
$.browser.msie && $.browser.version < 7, this.sizeDiff;
}
return this._updateVirtualBoundaries(event.shiftKey), (this._aspectRatio || event.shiftKey) && (data = this._updateRatio(data, event)), 
data = this._respectSize(data, event), this._propagate("resize", event), el.css({
top:this.position.top + "px",
left:this.position.left + "px",
width:this.size.width + "px",
height:this.size.height + "px"
}), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), 
this._updateCache(data), this._trigger("resize", event, this.ui()), !1;
},
_mouseStop:function(event) {
this.resizing = !1;
var o = this.options, self = this;
if (this._helper) {
var pr = this._proportionallyResizeElements, ista = pr.length && /textarea/i.test(pr[0].nodeName), soffseth = ista && $.ui.hasScroll(pr[0], "left") ? 0 :self.sizeDiff.height, soffsetw = ista ? 0 :self.sizeDiff.width, s = {
width:self.helper.width() - soffsetw,
height:self.helper.height() - soffseth
}, left = parseInt(self.element.css("left"), 10) + (self.position.left - self.originalPosition.left) || null, top = parseInt(self.element.css("top"), 10) + (self.position.top - self.originalPosition.top) || null;
o.animate || this.element.css($.extend(s, {
top:top,
left:left
})), self.helper.height(self.size.height), self.helper.width(self.size.width), this._helper && !o.animate && this._proportionallyResize();
}
return $("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), 
this._propagate("stop", event), this._helper && this.helper.remove(), !1;
},
_updateVirtualBoundaries:function(forceAspectRatio) {
var pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b, o = this.options;
b = {
minWidth:isNumber(o.minWidth) ? o.minWidth :0,
maxWidth:isNumber(o.maxWidth) ? o.maxWidth :1/0,
minHeight:isNumber(o.minHeight) ? o.minHeight :0,
maxHeight:isNumber(o.maxHeight) ? o.maxHeight :1/0
}, (this._aspectRatio || forceAspectRatio) && (pMinWidth = b.minHeight * this.aspectRatio, 
pMinHeight = b.minWidth / this.aspectRatio, pMaxWidth = b.maxHeight * this.aspectRatio, 
pMaxHeight = b.maxWidth / this.aspectRatio, pMinWidth > b.minWidth && (b.minWidth = pMinWidth), 
pMinHeight > b.minHeight && (b.minHeight = pMinHeight), pMaxWidth < b.maxWidth && (b.maxWidth = pMaxWidth), 
pMaxHeight < b.maxHeight && (b.maxHeight = pMaxHeight)), this._vBoundaries = b;
},
_updateCache:function(data) {
this.options;
this.offset = this.helper.offset(), isNumber(data.left) && (this.position.left = data.left), 
isNumber(data.top) && (this.position.top = data.top), isNumber(data.height) && (this.size.height = data.height), 
isNumber(data.width) && (this.size.width = data.width);
},
_updateRatio:function(data) {
var cpos = (this.options, this.position), csize = this.size, a = this.axis;
return isNumber(data.height) ? data.width = data.height * this.aspectRatio :isNumber(data.width) && (data.height = data.width / this.aspectRatio), 
"sw" == a && (data.left = cpos.left + (csize.width - data.width), data.top = null), 
"nw" == a && (data.top = cpos.top + (csize.height - data.height), data.left = cpos.left + (csize.width - data.width)), 
data;
},
_respectSize:function(data, event) {
var o = (this.helper, this._vBoundaries), a = (this._aspectRatio || event.shiftKey, 
this.axis), ismaxw = isNumber(data.width) && o.maxWidth && o.maxWidth < data.width, ismaxh = isNumber(data.height) && o.maxHeight && o.maxHeight < data.height, isminw = isNumber(data.width) && o.minWidth && o.minWidth > data.width, isminh = isNumber(data.height) && o.minHeight && o.minHeight > data.height;
isminw && (data.width = o.minWidth), isminh && (data.height = o.minHeight), ismaxw && (data.width = o.maxWidth), 
ismaxh && (data.height = o.maxHeight);
var dw = this.originalPosition.left + this.originalSize.width, dh = this.position.top + this.size.height, cw = /sw|nw|w/.test(a), ch = /nw|ne|n/.test(a);
isminw && cw && (data.left = dw - o.minWidth), ismaxw && cw && (data.left = dw - o.maxWidth), 
isminh && ch && (data.top = dh - o.minHeight), ismaxh && ch && (data.top = dh - o.maxHeight);
var isNotwh = !data.width && !data.height;
return isNotwh && !data.left && data.top ? data.top = null :isNotwh && !data.top && data.left && (data.left = null), 
data;
},
_proportionallyResize:function() {
this.options;
if (this._proportionallyResizeElements.length) for (var element = this.helper || this.element, i = 0; i < this._proportionallyResizeElements.length; i++) {
var prel = this._proportionallyResizeElements[i];
if (!this.borderDif) {
var b = [ prel.css("borderTopWidth"), prel.css("borderRightWidth"), prel.css("borderBottomWidth"), prel.css("borderLeftWidth") ], p = [ prel.css("paddingTop"), prel.css("paddingRight"), prel.css("paddingBottom"), prel.css("paddingLeft") ];
this.borderDif = $.map(b, function(v, i) {
var border = parseInt(v, 10) || 0, padding = parseInt(p[i], 10) || 0;
return border + padding;
});
}
$.browser.msie && ($(element).is(":hidden") || $(element).parents(":hidden").length) || prel.css({
height:element.height() - this.borderDif[0] - this.borderDif[2] || 0,
width:element.width() - this.borderDif[1] - this.borderDif[3] || 0
});
}
},
_renderProxy:function() {
var el = this.element, o = this.options;
if (this.elementOffset = el.offset(), this._helper) {
this.helper = this.helper || $('<div style="overflow:hidden;"></div>');
var ie6 = $.browser.msie && $.browser.version < 7, ie6offset = ie6 ? 1 :0, pxyoffset = ie6 ? 2 :-1;
this.helper.addClass(this._helper).css({
width:this.element.outerWidth() + pxyoffset,
height:this.element.outerHeight() + pxyoffset,
position:"absolute",
left:this.elementOffset.left - ie6offset + "px",
top:this.elementOffset.top - ie6offset + "px",
zIndex:++o.zIndex
}), this.helper.appendTo("body").disableSelection();
} else this.helper = this.element;
},
_change:{
e:function(event, dx) {
return {
width:this.originalSize.width + dx
};
},
w:function(event, dx) {
var cs = (this.options, this.originalSize), sp = this.originalPosition;
return {
left:sp.left + dx,
width:cs.width - dx
};
},
n:function(event, dx, dy) {
var cs = (this.options, this.originalSize), sp = this.originalPosition;
return {
top:sp.top + dy,
height:cs.height - dy
};
},
s:function(event, dx, dy) {
return {
height:this.originalSize.height + dy
};
},
se:function(event, dx, dy) {
return $.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [ event, dx, dy ]));
},
sw:function(event, dx, dy) {
return $.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [ event, dx, dy ]));
},
ne:function(event, dx, dy) {
return $.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [ event, dx, dy ]));
},
nw:function(event, dx, dy) {
return $.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [ event, dx, dy ]));
}
},
_propagate:function(n, event) {
$.ui.plugin.call(this, n, [ event, this.ui() ]), "resize" != n && this._trigger(n, event, this.ui());
},
plugins:{},
ui:function() {
return {
originalElement:this.originalElement,
element:this.element,
helper:this.helper,
position:this.position,
size:this.size,
originalSize:this.originalSize,
originalPosition:this.originalPosition
};
}
}), $.extend($.ui.resizable, {
version:"1.8.23"
}), $.ui.plugin.add("resizable", "alsoResize", {
start:function() {
var self = $(this).data("resizable"), o = self.options, _store = function(exp) {
$(exp).each(function() {
var el = $(this);
el.data("resizable-alsoresize", {
width:parseInt(el.width(), 10),
height:parseInt(el.height(), 10),
left:parseInt(el.css("left"), 10),
top:parseInt(el.css("top"), 10)
});
});
};
"object" != typeof o.alsoResize || o.alsoResize.parentNode ? _store(o.alsoResize) :o.alsoResize.length ? (o.alsoResize = o.alsoResize[0], 
_store(o.alsoResize)) :$.each(o.alsoResize, function(exp) {
_store(exp);
});
},
resize:function(event, ui) {
var self = $(this).data("resizable"), o = self.options, os = self.originalSize, op = self.originalPosition, delta = {
height:self.size.height - os.height || 0,
width:self.size.width - os.width || 0,
top:self.position.top - op.top || 0,
left:self.position.left - op.left || 0
}, _alsoResize = function(exp, c) {
$(exp).each(function() {
var el = $(this), start = $(this).data("resizable-alsoresize"), style = {}, css = c && c.length ? c :el.parents(ui.originalElement[0]).length ? [ "width", "height" ] :[ "width", "height", "top", "left" ];
$.each(css, function(i, prop) {
var sum = (start[prop] || 0) + (delta[prop] || 0);
sum && sum >= 0 && (style[prop] = sum || null);
}), el.css(style);
});
};
"object" != typeof o.alsoResize || o.alsoResize.nodeType ? _alsoResize(o.alsoResize) :$.each(o.alsoResize, function(exp, c) {
_alsoResize(exp, c);
});
},
stop:function() {
$(this).removeData("resizable-alsoresize");
}
}), $.ui.plugin.add("resizable", "animate", {
stop:function(event) {
var self = $(this).data("resizable"), o = self.options, pr = self._proportionallyResizeElements, ista = pr.length && /textarea/i.test(pr[0].nodeName), soffseth = ista && $.ui.hasScroll(pr[0], "left") ? 0 :self.sizeDiff.height, soffsetw = ista ? 0 :self.sizeDiff.width, style = {
width:self.size.width - soffsetw,
height:self.size.height - soffseth
}, left = parseInt(self.element.css("left"), 10) + (self.position.left - self.originalPosition.left) || null, top = parseInt(self.element.css("top"), 10) + (self.position.top - self.originalPosition.top) || null;
self.element.animate($.extend(style, top && left ? {
top:top,
left:left
} :{}), {
duration:o.animateDuration,
easing:o.animateEasing,
step:function() {
var data = {
width:parseInt(self.element.css("width"), 10),
height:parseInt(self.element.css("height"), 10),
top:parseInt(self.element.css("top"), 10),
left:parseInt(self.element.css("left"), 10)
};
pr && pr.length && $(pr[0]).css({
width:data.width,
height:data.height
}), self._updateCache(data), self._propagate("resize", event);
}
});
}
}), $.ui.plugin.add("resizable", "containment", {
start:function() {
var self = $(this).data("resizable"), o = self.options, el = self.element, oc = o.containment, ce = oc instanceof $ ? oc.get(0) :/parent/.test(oc) ? el.parent().get(0) :oc;
if (ce) if (self.containerElement = $(ce), /document/.test(oc) || oc == document) self.containerOffset = {
left:0,
top:0
}, self.containerPosition = {
left:0,
top:0
}, self.parentData = {
element:$(document),
left:0,
top:0,
width:$(document).width(),
height:$(document).height() || document.body.parentNode.scrollHeight
}; else {
var element = $(ce), p = [];
$([ "Top", "Right", "Left", "Bottom" ]).each(function(i, name) {
p[i] = num(element.css("padding" + name));
}), self.containerOffset = element.offset(), self.containerPosition = element.position(), 
self.containerSize = {
height:element.innerHeight() - p[3],
width:element.innerWidth() - p[1]
};
var co = self.containerOffset, ch = self.containerSize.height, cw = self.containerSize.width, width = $.ui.hasScroll(ce, "left") ? ce.scrollWidth :cw, height = $.ui.hasScroll(ce) ? ce.scrollHeight :ch;
self.parentData = {
element:ce,
left:co.left,
top:co.top,
width:width,
height:height
};
}
},
resize:function(event) {
var self = $(this).data("resizable"), o = self.options, co = (self.containerSize, 
self.containerOffset), cp = (self.size, self.position), pRatio = self._aspectRatio || event.shiftKey, cop = {
top:0,
left:0
}, ce = self.containerElement;
ce[0] != document && /static/.test(ce.css("position")) && (cop = co), cp.left < (self._helper ? co.left :0) && (self.size.width = self.size.width + (self._helper ? self.position.left - co.left :self.position.left - cop.left), 
pRatio && (self.size.height = self.size.width / self.aspectRatio), self.position.left = o.helper ? co.left :0), 
cp.top < (self._helper ? co.top :0) && (self.size.height = self.size.height + (self._helper ? self.position.top - co.top :self.position.top), 
pRatio && (self.size.width = self.size.height * self.aspectRatio), self.position.top = self._helper ? co.top :0), 
self.offset.left = self.parentData.left + self.position.left, self.offset.top = self.parentData.top + self.position.top;
var woset = Math.abs((self._helper ? self.offset.left - cop.left :self.offset.left - cop.left) + self.sizeDiff.width), hoset = Math.abs((self._helper ? self.offset.top - cop.top :self.offset.top - co.top) + self.sizeDiff.height), isParent = self.containerElement.get(0) == self.element.parent().get(0), isOffsetRelative = /relative|absolute/.test(self.containerElement.css("position"));
isParent && isOffsetRelative && (woset -= self.parentData.left), woset + self.size.width >= self.parentData.width && (self.size.width = self.parentData.width - woset, 
pRatio && (self.size.height = self.size.width / self.aspectRatio)), hoset + self.size.height >= self.parentData.height && (self.size.height = self.parentData.height - hoset, 
pRatio && (self.size.width = self.size.height * self.aspectRatio));
},
stop:function() {
var self = $(this).data("resizable"), o = self.options, co = (self.position, self.containerOffset), cop = self.containerPosition, ce = self.containerElement, helper = $(self.helper), ho = helper.offset(), w = helper.outerWidth() - self.sizeDiff.width, h = helper.outerHeight() - self.sizeDiff.height;
self._helper && !o.animate && /relative/.test(ce.css("position")) && $(this).css({
left:ho.left - cop.left - co.left,
width:w,
height:h
}), self._helper && !o.animate && /static/.test(ce.css("position")) && $(this).css({
left:ho.left - cop.left - co.left,
width:w,
height:h
});
}
}), $.ui.plugin.add("resizable", "ghost", {
start:function() {
var self = $(this).data("resizable"), o = self.options, cs = self.size;
self.ghost = self.originalElement.clone(), self.ghost.css({
opacity:.25,
display:"block",
position:"relative",
height:cs.height,
width:cs.width,
margin:0,
left:0,
top:0
}).addClass("ui-resizable-ghost").addClass("string" == typeof o.ghost ? o.ghost :""), 
self.ghost.appendTo(self.helper);
},
resize:function() {
{
var self = $(this).data("resizable");
self.options;
}
self.ghost && self.ghost.css({
position:"relative",
height:self.size.height,
width:self.size.width
});
},
stop:function() {
{
var self = $(this).data("resizable");
self.options;
}
self.ghost && self.helper && self.helper.get(0).removeChild(self.ghost.get(0));
}
}), $.ui.plugin.add("resizable", "grid", {
resize:function(event) {
{
var self = $(this).data("resizable"), o = self.options, cs = self.size, os = self.originalSize, op = self.originalPosition, a = self.axis;
o._aspectRatio || event.shiftKey;
}
o.grid = "number" == typeof o.grid ? [ o.grid, o.grid ] :o.grid;
var ox = Math.round((cs.width - os.width) / (o.grid[0] || 1)) * (o.grid[0] || 1), oy = Math.round((cs.height - os.height) / (o.grid[1] || 1)) * (o.grid[1] || 1);
/^(se|s|e)$/.test(a) ? (self.size.width = os.width + ox, self.size.height = os.height + oy) :/^(ne)$/.test(a) ? (self.size.width = os.width + ox, 
self.size.height = os.height + oy, self.position.top = op.top - oy) :/^(sw)$/.test(a) ? (self.size.width = os.width + ox, 
self.size.height = os.height + oy, self.position.left = op.left - ox) :(self.size.width = os.width + ox, 
self.size.height = os.height + oy, self.position.top = op.top - oy, self.position.left = op.left - ox);
}
});
var num = function(v) {
return parseInt(v, 10) || 0;
}, isNumber = function(value) {
return !isNaN(parseInt(value, 10));
};
}(jQuery), function($) {
$.widget("ui.selectable", $.ui.mouse, {
options:{
appendTo:"body",
autoRefresh:!0,
distance:0,
filter:"*",
tolerance:"touch"
},
_create:function() {
var self = this;
this.element.addClass("ui-selectable"), this.dragged = !1;
var selectees;
this.refresh = function() {
selectees = $(self.options.filter, self.element[0]), selectees.addClass("ui-selectee"), 
selectees.each(function() {
var $this = $(this), pos = $this.offset();
$.data(this, "selectable-item", {
element:this,
$element:$this,
left:pos.left,
top:pos.top,
right:pos.left + $this.outerWidth(),
bottom:pos.top + $this.outerHeight(),
startselected:!1,
selected:$this.hasClass("ui-selected"),
selecting:$this.hasClass("ui-selecting"),
unselecting:$this.hasClass("ui-unselecting")
});
});
}, this.refresh(), this.selectees = selectees.addClass("ui-selectee"), this._mouseInit(), 
this.helper = $("<div class='ui-selectable-helper'></div>");
},
destroy:function() {
return this.selectees.removeClass("ui-selectee").removeData("selectable-item"), 
this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable"), 
this._mouseDestroy(), this;
},
_mouseStart:function(event) {
var self = this;
if (this.opos = [ event.pageX, event.pageY ], !this.options.disabled) {
var options = this.options;
this.selectees = $(options.filter, this.element[0]), this._trigger("start", event), 
$(options.appendTo).append(this.helper), this.helper.css({
left:event.clientX,
top:event.clientY,
width:0,
height:0
}), options.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
var selectee = $.data(this, "selectable-item");
selectee.startselected = !0, event.metaKey || event.ctrlKey || (selectee.$element.removeClass("ui-selected"), 
selectee.selected = !1, selectee.$element.addClass("ui-unselecting"), selectee.unselecting = !0, 
self._trigger("unselecting", event, {
unselecting:selectee.element
}));
}), $(event.target).parents().andSelf().each(function() {
var selectee = $.data(this, "selectable-item");
if (selectee) {
var doSelect = !event.metaKey && !event.ctrlKey || !selectee.$element.hasClass("ui-selected");
return selectee.$element.removeClass(doSelect ? "ui-unselecting" :"ui-selected").addClass(doSelect ? "ui-selecting" :"ui-unselecting"), 
selectee.unselecting = !doSelect, selectee.selecting = doSelect, selectee.selected = doSelect, 
doSelect ? self._trigger("selecting", event, {
selecting:selectee.element
}) :self._trigger("unselecting", event, {
unselecting:selectee.element
}), !1;
}
});
}
},
_mouseDrag:function(event) {
var self = this;
if (this.dragged = !0, !this.options.disabled) {
var options = this.options, x1 = this.opos[0], y1 = this.opos[1], x2 = event.pageX, y2 = event.pageY;
if (x1 > x2) {
var tmp = x2;
x2 = x1, x1 = tmp;
}
if (y1 > y2) {
var tmp = y2;
y2 = y1, y1 = tmp;
}
return this.helper.css({
left:x1,
top:y1,
width:x2 - x1,
height:y2 - y1
}), this.selectees.each(function() {
var selectee = $.data(this, "selectable-item");
if (selectee && selectee.element != self.element[0]) {
var hit = !1;
"touch" == options.tolerance ? hit = !(selectee.left > x2 || selectee.right < x1 || selectee.top > y2 || selectee.bottom < y1) :"fit" == options.tolerance && (hit = selectee.left > x1 && selectee.right < x2 && selectee.top > y1 && selectee.bottom < y2), 
hit ? (selectee.selected && (selectee.$element.removeClass("ui-selected"), selectee.selected = !1), 
selectee.unselecting && (selectee.$element.removeClass("ui-unselecting"), selectee.unselecting = !1), 
selectee.selecting || (selectee.$element.addClass("ui-selecting"), selectee.selecting = !0, 
self._trigger("selecting", event, {
selecting:selectee.element
}))) :(selectee.selecting && ((event.metaKey || event.ctrlKey) && selectee.startselected ? (selectee.$element.removeClass("ui-selecting"), 
selectee.selecting = !1, selectee.$element.addClass("ui-selected"), selectee.selected = !0) :(selectee.$element.removeClass("ui-selecting"), 
selectee.selecting = !1, selectee.startselected && (selectee.$element.addClass("ui-unselecting"), 
selectee.unselecting = !0), self._trigger("unselecting", event, {
unselecting:selectee.element
}))), selectee.selected && (event.metaKey || event.ctrlKey || selectee.startselected || (selectee.$element.removeClass("ui-selected"), 
selectee.selected = !1, selectee.$element.addClass("ui-unselecting"), selectee.unselecting = !0, 
self._trigger("unselecting", event, {
unselecting:selectee.element
}))));
}
}), !1;
}
},
_mouseStop:function(event) {
var self = this;
this.dragged = !1;
this.options;
return $(".ui-unselecting", this.element[0]).each(function() {
var selectee = $.data(this, "selectable-item");
selectee.$element.removeClass("ui-unselecting"), selectee.unselecting = !1, selectee.startselected = !1, 
self._trigger("unselected", event, {
unselected:selectee.element
});
}), $(".ui-selecting", this.element[0]).each(function() {
var selectee = $.data(this, "selectable-item");
selectee.$element.removeClass("ui-selecting").addClass("ui-selected"), selectee.selecting = !1, 
selectee.selected = !0, selectee.startselected = !0, self._trigger("selected", event, {
selected:selectee.element
});
}), this._trigger("stop", event), this.helper.remove(), !1;
}
}), $.extend($.ui.selectable, {
version:"1.8.23"
});
}(jQuery), function($) {
$.widget("ui.sortable", $.ui.mouse, {
widgetEventPrefix:"sort",
ready:!1,
options:{
appendTo:"parent",
axis:!1,
connectWith:!1,
containment:!1,
cursor:"auto",
cursorAt:!1,
dropOnEmpty:!0,
forcePlaceholderSize:!1,
forceHelperSize:!1,
grid:!1,
handle:!1,
helper:"original",
items:"> *",
opacity:!1,
placeholder:!1,
revert:!1,
scroll:!0,
scrollSensitivity:20,
scrollSpeed:20,
scope:"default",
tolerance:"intersect",
zIndex:1e3
},
_create:function() {
var o = this.options;
this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), 
this.floating = this.items.length ? "x" === o.axis || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) :!1, 
this.offset = this.element.offset(), this._mouseInit(), this.ready = !0;
},
destroy:function() {
$.Widget.prototype.destroy.call(this), this.element.removeClass("ui-sortable ui-sortable-disabled"), 
this._mouseDestroy();
for (var i = this.items.length - 1; i >= 0; i--) this.items[i].item.removeData(this.widgetName + "-item");
return this;
},
_setOption:function(key, value) {
"disabled" === key ? (this.options[key] = value, this.widget()[value ? "addClass" :"removeClass"]("ui-sortable-disabled")) :$.Widget.prototype._setOption.apply(this, arguments);
},
_mouseCapture:function(event, overrideHandle) {
var that = this;
if (this.reverting) return !1;
if (this.options.disabled || "static" == this.options.type) return !1;
this._refreshItems(event);
{
var currentItem = null, self = this;
$(event.target).parents().each(function() {
return $.data(this, that.widgetName + "-item") == self ? (currentItem = $(this), 
!1) :void 0;
});
}
if ($.data(event.target, that.widgetName + "-item") == self && (currentItem = $(event.target)), 
!currentItem) return !1;
if (this.options.handle && !overrideHandle) {
var validHandle = !1;
if ($(this.options.handle, currentItem).find("*").andSelf().each(function() {
this == event.target && (validHandle = !0);
}), !validHandle) return !1;
}
return this.currentItem = currentItem, this._removeCurrentsFromItems(), !0;
},
_mouseStart:function(event, overrideHandle, noActivation) {
var o = this.options, self = this;
if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(event), 
this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), 
this.offset = this.currentItem.offset(), this.offset = {
top:this.offset.top - this.margins.top,
left:this.offset.left - this.margins.left
}, $.extend(this.offset, {
click:{
left:event.pageX - this.offset.left,
top:event.pageY - this.offset.top
},
parent:this._getParentOffset(),
relative:this._getRelativeOffset()
}), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), 
this.originalPosition = this._generatePosition(event), this.originalPageX = event.pageX, 
this.originalPageY = event.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), 
this.domPosition = {
prev:this.currentItem.prev()[0],
parent:this.currentItem.parent()[0]
}, this.helper[0] != this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), 
o.containment && this._setContainment(), o.cursor && ($("body").css("cursor") && (this._storedCursor = $("body").css("cursor")), 
$("body").css("cursor", o.cursor)), o.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), 
this.helper.css("opacity", o.opacity)), o.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), 
this.helper.css("zIndex", o.zIndex)), this.scrollParent[0] != document && "HTML" != this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), 
this._trigger("start", event, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), 
!noActivation) for (var i = this.containers.length - 1; i >= 0; i--) this.containers[i]._trigger("activate", event, self._uiHash(this));
return $.ui.ddmanager && ($.ui.ddmanager.current = this), $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event), 
this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(event), 
!0;
},
_mouseDrag:function(event) {
if (this.position = this._generatePosition(event), this.positionAbs = this._convertPositionTo("absolute"), 
this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll) {
var o = this.options, scrolled = !1;
this.scrollParent[0] != document && "HTML" != this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - event.pageY < o.scrollSensitivity ? this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed :event.pageY - this.overflowOffset.top < o.scrollSensitivity && (this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed), 
this.overflowOffset.left + this.scrollParent[0].offsetWidth - event.pageX < o.scrollSensitivity ? this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed :event.pageX - this.overflowOffset.left < o.scrollSensitivity && (this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed)) :(event.pageY - $(document).scrollTop() < o.scrollSensitivity ? scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed) :$(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity && (scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed)), 
event.pageX - $(document).scrollLeft() < o.scrollSensitivity ? scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed) :$(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity && (scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed))), 
scrolled !== !1 && $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event);
}
this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" == this.options.axis || (this.helper[0].style.left = this.position.left + "px"), 
this.options.axis && "x" == this.options.axis || (this.helper[0].style.top = this.position.top + "px");
for (var i = this.items.length - 1; i >= 0; i--) {
var item = this.items[i], itemElement = item.item[0], intersection = this._intersectsWithPointer(item);
if (intersection && itemElement != this.currentItem[0] && this.placeholder[1 == intersection ? "next" :"prev"]()[0] != itemElement && !$.ui.contains(this.placeholder[0], itemElement) && ("semi-dynamic" == this.options.type ? !$.ui.contains(this.element[0], itemElement) :!0)) {
if (this.direction = 1 == intersection ? "down" :"up", "pointer" != this.options.tolerance && !this._intersectsWithSides(item)) break;
this._rearrange(event, item), this._trigger("change", event, this._uiHash());
break;
}
}
return this._contactContainers(event), $.ui.ddmanager && $.ui.ddmanager.drag(this, event), 
this._trigger("sort", event, this._uiHash()), this.lastPositionAbs = this.positionAbs, 
!1;
},
_mouseStop:function(event, noPropagation) {
if (event) {
if ($.ui.ddmanager && !this.options.dropBehaviour && $.ui.ddmanager.drop(this, event), 
this.options.revert) {
var self = this, cur = self.placeholder.offset();
self.reverting = !0, $(this.helper).animate({
left:cur.left - this.offset.parent.left - self.margins.left + (this.offsetParent[0] == document.body ? 0 :this.offsetParent[0].scrollLeft),
top:cur.top - this.offset.parent.top - self.margins.top + (this.offsetParent[0] == document.body ? 0 :this.offsetParent[0].scrollTop)
}, parseInt(this.options.revert, 10) || 500, function() {
self._clear(event);
});
} else this._clear(event, noPropagation);
return !1;
}
},
cancel:function() {
var self = this;
if (this.dragging) {
this._mouseUp({
target:null
}), "original" == this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") :this.currentItem.show();
for (var i = this.containers.length - 1; i >= 0; i--) this.containers[i]._trigger("deactivate", null, self._uiHash(this)), 
this.containers[i].containerCache.over && (this.containers[i]._trigger("out", null, self._uiHash(this)), 
this.containers[i].containerCache.over = 0);
}
return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), 
"original" != this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), 
$.extend(this, {
helper:null,
dragging:!1,
reverting:!1,
_noFinalSort:null
}), this.domPosition.prev ? $(this.domPosition.prev).after(this.currentItem) :$(this.domPosition.parent).prepend(this.currentItem)), 
this;
},
serialize:function(o) {
var items = this._getItemsAsjQuery(o && o.connected), str = [];
return o = o || {}, $(items).each(function() {
var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || /(.+)[-=_](.+)/);
res && str.push((o.key || res[1] + "[]") + "=" + (o.key && o.expression ? res[1] :res[2]));
}), !str.length && o.key && str.push(o.key + "="), str.join("&");
},
toArray:function(o) {
var items = this._getItemsAsjQuery(o && o.connected), ret = [];
return o = o || {}, items.each(function() {
ret.push($(o.item || this).attr(o.attribute || "id") || "");
}), ret;
},
_intersectsWith:function(item) {
var x1 = this.positionAbs.left, x2 = x1 + this.helperProportions.width, y1 = this.positionAbs.top, y2 = y1 + this.helperProportions.height, l = item.left, r = l + item.width, t = item.top, b = t + item.height, dyClick = this.offset.click.top, dxClick = this.offset.click.left, isOverElement = y1 + dyClick > t && b > y1 + dyClick && x1 + dxClick > l && r > x1 + dxClick;
return "pointer" == this.options.tolerance || this.options.forcePointerForContainers || "pointer" != this.options.tolerance && this.helperProportions[this.floating ? "width" :"height"] > item[this.floating ? "width" :"height"] ? isOverElement :l < x1 + this.helperProportions.width / 2 && x2 - this.helperProportions.width / 2 < r && t < y1 + this.helperProportions.height / 2 && y2 - this.helperProportions.height / 2 < b;
},
_intersectsWithPointer:function(item) {
var isOverElementHeight = "x" === this.options.axis || $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height), isOverElementWidth = "y" === this.options.axis || $.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width), isOverElement = isOverElementHeight && isOverElementWidth, verticalDirection = this._getDragVerticalDirection(), horizontalDirection = this._getDragHorizontalDirection();
return isOverElement ? this.floating ? horizontalDirection && "right" == horizontalDirection || "down" == verticalDirection ? 2 :1 :verticalDirection && ("down" == verticalDirection ? 2 :1) :!1;
},
_intersectsWithSides:function(item) {
var isOverBottomHalf = $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + item.height / 2, item.height), isOverRightHalf = $.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + item.width / 2, item.width), verticalDirection = this._getDragVerticalDirection(), horizontalDirection = this._getDragHorizontalDirection();
return this.floating && horizontalDirection ? "right" == horizontalDirection && isOverRightHalf || "left" == horizontalDirection && !isOverRightHalf :verticalDirection && ("down" == verticalDirection && isOverBottomHalf || "up" == verticalDirection && !isOverBottomHalf);
},
_getDragVerticalDirection:function() {
var delta = this.positionAbs.top - this.lastPositionAbs.top;
return 0 != delta && (delta > 0 ? "down" :"up");
},
_getDragHorizontalDirection:function() {
var delta = this.positionAbs.left - this.lastPositionAbs.left;
return 0 != delta && (delta > 0 ? "right" :"left");
},
refresh:function(event) {
return this._refreshItems(event), this.refreshPositions(), this;
},
_connectWith:function() {
var options = this.options;
return options.connectWith.constructor == String ? [ options.connectWith ] :options.connectWith;
},
_getItemsAsjQuery:function(connected) {
var items = [], queries = [], connectWith = this._connectWith();
if (connectWith && connected) for (var i = connectWith.length - 1; i >= 0; i--) for (var cur = $(connectWith[i]), j = cur.length - 1; j >= 0; j--) {
var inst = $.data(cur[j], this.widgetName);
inst && inst != this && !inst.options.disabled && queries.push([ $.isFunction(inst.options.items) ? inst.options.items.call(inst.element) :$(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst ]);
}
queries.push([ $.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
options:this.options,
item:this.currentItem
}) :$(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this ]);
for (var i = queries.length - 1; i >= 0; i--) queries[i][0].each(function() {
items.push(this);
});
return $(items);
},
_removeCurrentsFromItems:function() {
for (var list = this.currentItem.find(":data(" + this.widgetName + "-item)"), i = 0; i < this.items.length; i++) for (var j = 0; j < list.length; j++) list[j] == this.items[i].item[0] && this.items.splice(i, 1);
},
_refreshItems:function(event) {
this.items = [], this.containers = [ this ];
var items = this.items, queries = [ [ $.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, {
item:this.currentItem
}) :$(this.options.items, this.element), this ] ], connectWith = this._connectWith();
if (connectWith && this.ready) for (var i = connectWith.length - 1; i >= 0; i--) for (var cur = $(connectWith[i]), j = cur.length - 1; j >= 0; j--) {
var inst = $.data(cur[j], this.widgetName);
inst && inst != this && !inst.options.disabled && (queries.push([ $.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, {
item:this.currentItem
}) :$(inst.options.items, inst.element), inst ]), this.containers.push(inst));
}
for (var i = queries.length - 1; i >= 0; i--) for (var targetData = queries[i][1], _queries = queries[i][0], j = 0, queriesLength = _queries.length; queriesLength > j; j++) {
var item = $(_queries[j]);
item.data(this.widgetName + "-item", targetData), items.push({
item:item,
instance:targetData,
width:0,
height:0,
left:0,
top:0
});
}
},
refreshPositions:function(fast) {
this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
for (var i = this.items.length - 1; i >= 0; i--) {
var item = this.items[i];
if (item.instance == this.currentContainer || !this.currentContainer || item.item[0] == this.currentItem[0]) {
var t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) :item.item;
fast || (item.width = t.outerWidth(), item.height = t.outerHeight());
var p = t.offset();
item.left = p.left, item.top = p.top;
}
}
if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this); else for (var i = this.containers.length - 1; i >= 0; i--) {
var p = this.containers[i].element.offset();
this.containers[i].containerCache.left = p.left, this.containers[i].containerCache.top = p.top, 
this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), 
this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
}
return this;
},
_createPlaceholder:function(that) {
var self = that || this, o = self.options;
if (!o.placeholder || o.placeholder.constructor == String) {
var className = o.placeholder;
o.placeholder = {
element:function() {
var el = $(document.createElement(self.currentItem[0].nodeName)).addClass(className || self.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
return className || (el.style.visibility = "hidden"), el;
},
update:function(container, p) {
(!className || o.forcePlaceholderSize) && (p.height() || p.height(self.currentItem.innerHeight() - parseInt(self.currentItem.css("paddingTop") || 0, 10) - parseInt(self.currentItem.css("paddingBottom") || 0, 10)), 
p.width() || p.width(self.currentItem.innerWidth() - parseInt(self.currentItem.css("paddingLeft") || 0, 10) - parseInt(self.currentItem.css("paddingRight") || 0, 10)));
}
};
}
self.placeholder = $(o.placeholder.element.call(self.element, self.currentItem)), 
self.currentItem.after(self.placeholder), o.placeholder.update(self, self.placeholder);
},
_contactContainers:function(event) {
for (var innermostContainer = null, innermostIndex = null, i = this.containers.length - 1; i >= 0; i--) if (!$.ui.contains(this.currentItem[0], this.containers[i].element[0])) if (this._intersectsWith(this.containers[i].containerCache)) {
if (innermostContainer && $.ui.contains(this.containers[i].element[0], innermostContainer.element[0])) continue;
innermostContainer = this.containers[i], innermostIndex = i;
} else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", event, this._uiHash(this)), 
this.containers[i].containerCache.over = 0);
if (innermostContainer) if (1 === this.containers.length) this.containers[innermostIndex]._trigger("over", event, this._uiHash(this)), 
this.containers[innermostIndex].containerCache.over = 1; else if (this.currentContainer != this.containers[innermostIndex]) {
for (var dist = 1e4, itemWithLeastDistance = null, base = this.positionAbs[this.containers[innermostIndex].floating ? "left" :"top"], j = this.items.length - 1; j >= 0; j--) if ($.ui.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) {
var cur = this.containers[innermostIndex].floating ? this.items[j].item.offset().left :this.items[j].item.offset().top;
Math.abs(cur - base) < dist && (dist = Math.abs(cur - base), itemWithLeastDistance = this.items[j], 
this.direction = cur - base > 0 ? "down" :"up");
}
if (!itemWithLeastDistance && !this.options.dropOnEmpty) return;
this.currentContainer = this.containers[innermostIndex], itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, !0) :this._rearrange(event, null, this.containers[innermostIndex].element, !0), 
this._trigger("change", event, this._uiHash()), this.containers[innermostIndex]._trigger("change", event, this._uiHash(this)), 
this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[innermostIndex]._trigger("over", event, this._uiHash(this)), 
this.containers[innermostIndex].containerCache.over = 1;
}
},
_createHelper:function(event) {
var o = this.options, helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [ event, this.currentItem ])) :"clone" == o.helper ? this.currentItem.clone() :this.currentItem;
return helper.parents("body").length || $("parent" != o.appendTo ? o.appendTo :this.currentItem[0].parentNode)[0].appendChild(helper[0]), 
helper[0] == this.currentItem[0] && (this._storedCSS = {
width:this.currentItem[0].style.width,
height:this.currentItem[0].style.height,
position:this.currentItem.css("position"),
top:this.currentItem.css("top"),
left:this.currentItem.css("left")
}), ("" == helper[0].style.width || o.forceHelperSize) && helper.width(this.currentItem.width()), 
("" == helper[0].style.height || o.forceHelperSize) && helper.height(this.currentItem.height()), 
helper;
},
_adjustOffsetFromHelper:function(obj) {
"string" == typeof obj && (obj = obj.split(" ")), $.isArray(obj) && (obj = {
left:+obj[0],
top:+obj[1] || 0
}), "left" in obj && (this.offset.click.left = obj.left + this.margins.left), "right" in obj && (this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left), 
"top" in obj && (this.offset.click.top = obj.top + this.margins.top), "bottom" in obj && (this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top);
},
_getParentOffset:function() {
this.offsetParent = this.helper.offsetParent();
var po = this.offsetParent.offset();
return "absolute" == this.cssPosition && this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (po.left += this.scrollParent.scrollLeft(), 
po.top += this.scrollParent.scrollTop()), (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() && $.browser.msie) && (po = {
top:0,
left:0
}), {
top:po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
left:po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
};
},
_getRelativeOffset:function() {
if ("relative" == this.cssPosition) {
var p = this.currentItem.position();
return {
top:p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
left:p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
};
}
return {
top:0,
left:0
};
},
_cacheMargins:function() {
this.margins = {
left:parseInt(this.currentItem.css("marginLeft"), 10) || 0,
top:parseInt(this.currentItem.css("marginTop"), 10) || 0
};
},
_cacheHelperProportions:function() {
this.helperProportions = {
width:this.helper.outerWidth(),
height:this.helper.outerHeight()
};
},
_setContainment:function() {
var o = this.options;
if ("parent" == o.containment && (o.containment = this.helper[0].parentNode), ("document" == o.containment || "window" == o.containment) && (this.containment = [ 0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, $("document" == o.containment ? document :window).width() - this.helperProportions.width - this.margins.left, ($("document" == o.containment ? document :window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ]), 
!/^(document|window|parent)$/.test(o.containment)) {
var ce = $(o.containment)[0], co = $(o.containment).offset(), over = "hidden" != $(ce).css("overflow");
this.containment = [ co.left + (parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0) - this.margins.left, co.top + (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0) - this.margins.top, co.left + (over ? Math.max(ce.scrollWidth, ce.offsetWidth) :ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, co.top + (over ? Math.max(ce.scrollHeight, ce.offsetHeight) :ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top ];
}
},
_convertPositionTo:function(d, pos) {
pos || (pos = this.position);
var mod = "absolute" == d ? 1 :-1, scroll = (this.options, "absolute" != this.cssPosition || this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent :this.offsetParent), scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
return {
top:pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ($.browser.safari && "fixed" == this.cssPosition ? 0 :("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() :scrollIsRootNode ? 0 :scroll.scrollTop()) * mod),
left:pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ($.browser.safari && "fixed" == this.cssPosition ? 0 :("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() :scrollIsRootNode ? 0 :scroll.scrollLeft()) * mod)
};
},
_generatePosition:function(event) {
var o = this.options, scroll = "absolute" != this.cssPosition || this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent :this.offsetParent, scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
"relative" != this.cssPosition || this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset());
var pageX = event.pageX, pageY = event.pageY;
if (this.originalPosition && (this.containment && (event.pageX - this.offset.click.left < this.containment[0] && (pageX = this.containment[0] + this.offset.click.left), 
event.pageY - this.offset.click.top < this.containment[1] && (pageY = this.containment[1] + this.offset.click.top), 
event.pageX - this.offset.click.left > this.containment[2] && (pageX = this.containment[2] + this.offset.click.left), 
event.pageY - this.offset.click.top > this.containment[3] && (pageY = this.containment[3] + this.offset.click.top)), 
o.grid)) {
var top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
pageY = this.containment ? top - this.offset.click.top < this.containment[1] || top - this.offset.click.top > this.containment[3] ? top - this.offset.click.top < this.containment[1] ? top + o.grid[1] :top - o.grid[1] :top :top;
var left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
pageX = this.containment ? left - this.offset.click.left < this.containment[0] || left - this.offset.click.left > this.containment[2] ? left - this.offset.click.left < this.containment[0] ? left + o.grid[0] :left - o.grid[0] :left :left;
}
return {
top:pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ($.browser.safari && "fixed" == this.cssPosition ? 0 :"fixed" == this.cssPosition ? -this.scrollParent.scrollTop() :scrollIsRootNode ? 0 :scroll.scrollTop()),
left:pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ($.browser.safari && "fixed" == this.cssPosition ? 0 :"fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() :scrollIsRootNode ? 0 :scroll.scrollLeft())
};
},
_rearrange:function(event, i, a, hardRefresh) {
a ? a[0].appendChild(this.placeholder[0]) :i.item[0].parentNode.insertBefore(this.placeholder[0], "down" == this.direction ? i.item[0] :i.item[0].nextSibling), 
this.counter = this.counter ? ++this.counter :1;
var self = this, counter = this.counter;
window.setTimeout(function() {
counter == self.counter && self.refreshPositions(!hardRefresh);
}, 0);
},
_clear:function(event, noPropagation) {
this.reverting = !1;
var delayedTriggers = [];
if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), 
this._noFinalSort = null, this.helper[0] == this.currentItem[0]) {
for (var i in this._storedCSS) ("auto" == this._storedCSS[i] || "static" == this._storedCSS[i]) && (this._storedCSS[i] = "");
this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
} else this.currentItem.show();
if (this.fromOutside && !noPropagation && delayedTriggers.push(function(event) {
this._trigger("receive", event, this._uiHash(this.fromOutside));
}), !this.fromOutside && this.domPosition.prev == this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent == this.currentItem.parent()[0] || noPropagation || delayedTriggers.push(function(event) {
this._trigger("update", event, this._uiHash());
}), !$.ui.contains(this.element[0], this.currentItem[0])) {
noPropagation || delayedTriggers.push(function(event) {
this._trigger("remove", event, this._uiHash());
});
for (var i = this.containers.length - 1; i >= 0; i--) $.ui.contains(this.containers[i].element[0], this.currentItem[0]) && !noPropagation && (delayedTriggers.push(function(c) {
return function(event) {
c._trigger("receive", event, this._uiHash(this));
};
}.call(this, this.containers[i])), delayedTriggers.push(function(c) {
return function(event) {
c._trigger("update", event, this._uiHash(this));
};
}.call(this, this.containers[i])));
}
for (var i = this.containers.length - 1; i >= 0; i--) noPropagation || delayedTriggers.push(function(c) {
return function(event) {
c._trigger("deactivate", event, this._uiHash(this));
};
}.call(this, this.containers[i])), this.containers[i].containerCache.over && (delayedTriggers.push(function(c) {
return function(event) {
c._trigger("out", event, this._uiHash(this));
};
}.call(this, this.containers[i])), this.containers[i].containerCache.over = 0);
if (this._storedCursor && $("body").css("cursor", this._storedCursor), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), 
this._storedZIndex && this.helper.css("zIndex", "auto" == this._storedZIndex ? "" :this._storedZIndex), 
this.dragging = !1, this.cancelHelperRemoval) {
if (!noPropagation) {
this._trigger("beforeStop", event, this._uiHash());
for (var i = 0; i < delayedTriggers.length; i++) delayedTriggers[i].call(this, event);
this._trigger("stop", event, this._uiHash());
}
return this.fromOutside = !1, !1;
}
if (noPropagation || this._trigger("beforeStop", event, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), 
this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null, 
!noPropagation) {
for (var i = 0; i < delayedTriggers.length; i++) delayedTriggers[i].call(this, event);
this._trigger("stop", event, this._uiHash());
}
return this.fromOutside = !1, !0;
},
_trigger:function() {
$.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel();
},
_uiHash:function(inst) {
var self = inst || this;
return {
helper:self.helper,
placeholder:self.placeholder || $([]),
position:self.position,
originalPosition:self.originalPosition,
offset:self.positionAbs,
item:self.currentItem,
sender:inst ? inst.element :null
};
}
}), $.extend($.ui.sortable, {
version:"1.8.23"
});
}(jQuery), jQuery.effects || function($, undefined) {
function getRGB(color) {
var result;
return color && color.constructor == Array && 3 == color.length ? color :(result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color)) ? [ parseInt(result[1], 10), parseInt(result[2], 10), parseInt(result[3], 10) ] :(result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color)) ? [ 2.55 * parseFloat(result[1]), 2.55 * parseFloat(result[2]), 2.55 * parseFloat(result[3]) ] :(result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color)) ? [ parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16) ] :(result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color)) ? [ parseInt(result[1] + result[1], 16), parseInt(result[2] + result[2], 16), parseInt(result[3] + result[3], 16) ] :(result = /rgba\(0, 0, 0, 0\)/.exec(color)) ? colors.transparent :colors[$.trim(color).toLowerCase()];
}
function getColor(elem, attr) {
var color;
do {
if (color = ($.curCSS || $.css)(elem, attr), "" != color && "transparent" != color || $.nodeName(elem, "body")) break;
attr = "backgroundColor";
} while (elem = elem.parentNode);
return getRGB(color);
}
function getElementStyles() {
var key, camelCase, style = document.defaultView ? document.defaultView.getComputedStyle(this, null) :this.currentStyle, newStyle = {};
if (style && style.length && style[0] && style[style[0]]) for (var len = style.length; len--; ) key = style[len], 
"string" == typeof style[key] && (camelCase = key.replace(/\-(\w)/g, function(all, letter) {
return letter.toUpperCase();
}), newStyle[camelCase] = style[key]); else for (key in style) "string" == typeof style[key] && (newStyle[key] = style[key]);
return newStyle;
}
function filterStyles(styles) {
var name, value;
for (name in styles) value = styles[name], (null == value || $.isFunction(value) || name in shorthandStyles || /scrollbar/.test(name) || !/color/i.test(name) && isNaN(parseFloat(value))) && delete styles[name];
return styles;
}
function styleDifference(oldStyle, newStyle) {
var name, diff = {
_:0
};
for (name in newStyle) oldStyle[name] != newStyle[name] && (diff[name] = newStyle[name]);
return diff;
}
function _normalizeArguments(effect, options, speed, callback) {
return "object" == typeof effect && (callback = options, speed = null, options = effect, 
effect = options.effect), $.isFunction(options) && (callback = options, speed = null, 
options = {}), ("number" == typeof options || $.fx.speeds[options]) && (callback = speed, 
speed = options, options = {}), $.isFunction(speed) && (callback = speed, speed = null), 
options = options || {}, speed = speed || options.duration, speed = $.fx.off ? 0 :"number" == typeof speed ? speed :speed in $.fx.speeds ? $.fx.speeds[speed] :$.fx.speeds._default, 
callback = callback || options.complete, [ effect, options, speed, callback ];
}
function standardSpeed(speed) {
return !speed || "number" == typeof speed || $.fx.speeds[speed] ? !0 :"string" != typeof speed || $.effects[speed] ? !1 :!0;
}
$.effects = {}, $.each([ "backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor" ], function(i, attr) {
$.fx.step[attr] = function(fx) {
fx.colorInit || (fx.start = getColor(fx.elem, attr), fx.end = getRGB(fx.end), fx.colorInit = !0), 
fx.elem.style[attr] = "rgb(" + Math.max(Math.min(parseInt(fx.pos * (fx.end[0] - fx.start[0]) + fx.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(fx.pos * (fx.end[1] - fx.start[1]) + fx.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(fx.pos * (fx.end[2] - fx.start[2]) + fx.start[2], 10), 255), 0) + ")";
};
});
var colors = {
aqua:[ 0, 255, 255 ],
azure:[ 240, 255, 255 ],
beige:[ 245, 245, 220 ],
black:[ 0, 0, 0 ],
blue:[ 0, 0, 255 ],
brown:[ 165, 42, 42 ],
cyan:[ 0, 255, 255 ],
darkblue:[ 0, 0, 139 ],
darkcyan:[ 0, 139, 139 ],
darkgrey:[ 169, 169, 169 ],
darkgreen:[ 0, 100, 0 ],
darkkhaki:[ 189, 183, 107 ],
darkmagenta:[ 139, 0, 139 ],
darkolivegreen:[ 85, 107, 47 ],
darkorange:[ 255, 140, 0 ],
darkorchid:[ 153, 50, 204 ],
darkred:[ 139, 0, 0 ],
darksalmon:[ 233, 150, 122 ],
darkviolet:[ 148, 0, 211 ],
fuchsia:[ 255, 0, 255 ],
gold:[ 255, 215, 0 ],
green:[ 0, 128, 0 ],
indigo:[ 75, 0, 130 ],
khaki:[ 240, 230, 140 ],
lightblue:[ 173, 216, 230 ],
lightcyan:[ 224, 255, 255 ],
lightgreen:[ 144, 238, 144 ],
lightgrey:[ 211, 211, 211 ],
lightpink:[ 255, 182, 193 ],
lightyellow:[ 255, 255, 224 ],
lime:[ 0, 255, 0 ],
magenta:[ 255, 0, 255 ],
maroon:[ 128, 0, 0 ],
navy:[ 0, 0, 128 ],
olive:[ 128, 128, 0 ],
orange:[ 255, 165, 0 ],
pink:[ 255, 192, 203 ],
purple:[ 128, 0, 128 ],
violet:[ 128, 0, 128 ],
red:[ 255, 0, 0 ],
silver:[ 192, 192, 192 ],
white:[ 255, 255, 255 ],
yellow:[ 255, 255, 0 ],
transparent:[ 255, 255, 255 ]
}, classAnimationActions = [ "add", "remove", "toggle" ], shorthandStyles = {
border:1,
borderBottom:1,
borderColor:1,
borderLeft:1,
borderRight:1,
borderTop:1,
borderWidth:1,
margin:1,
padding:1
};
$.effects.animateClass = function(value, duration, easing, callback) {
return $.isFunction(easing) && (callback = easing, easing = null), this.queue(function() {
var newStyle, that = $(this), originalStyleAttr = that.attr("style") || " ", originalStyle = filterStyles(getElementStyles.call(this)), className = that.attr("class") || "";
$.each(classAnimationActions, function(i, action) {
value[action] && that[action + "Class"](value[action]);
}), newStyle = filterStyles(getElementStyles.call(this)), that.attr("class", className), 
that.animate(styleDifference(originalStyle, newStyle), {
queue:!1,
duration:duration,
easing:easing,
complete:function() {
$.each(classAnimationActions, function(i, action) {
value[action] && that[action + "Class"](value[action]);
}), "object" == typeof that.attr("style") ? (that.attr("style").cssText = "", that.attr("style").cssText = originalStyleAttr) :that.attr("style", originalStyleAttr), 
callback && callback.apply(this, arguments), $.dequeue(this);
}
});
});
}, $.fn.extend({
_addClass:$.fn.addClass,
addClass:function(classNames, speed, easing, callback) {
return speed ? $.effects.animateClass.apply(this, [ {
add:classNames
}, speed, easing, callback ]) :this._addClass(classNames);
},
_removeClass:$.fn.removeClass,
removeClass:function(classNames, speed, easing, callback) {
return speed ? $.effects.animateClass.apply(this, [ {
remove:classNames
}, speed, easing, callback ]) :this._removeClass(classNames);
},
_toggleClass:$.fn.toggleClass,
toggleClass:function(classNames, force, speed, easing, callback) {
return "boolean" == typeof force || force === undefined ? speed ? $.effects.animateClass.apply(this, [ force ? {
add:classNames
} :{
remove:classNames
}, speed, easing, callback ]) :this._toggleClass(classNames, force) :$.effects.animateClass.apply(this, [ {
toggle:classNames
}, force, speed, easing ]);
},
switchClass:function(remove, add, speed, easing, callback) {
return $.effects.animateClass.apply(this, [ {
add:add,
remove:remove
}, speed, easing, callback ]);
}
}), $.extend($.effects, {
version:"1.8.23",
save:function(element, set) {
for (var i = 0; i < set.length; i++) null !== set[i] && element.data("ec.storage." + set[i], element[0].style[set[i]]);
},
restore:function(element, set) {
for (var i = 0; i < set.length; i++) null !== set[i] && element.css(set[i], element.data("ec.storage." + set[i]));
},
setMode:function(el, mode) {
return "toggle" == mode && (mode = el.is(":hidden") ? "show" :"hide"), mode;
},
getBaseline:function(origin, original) {
var y, x;
switch (origin[0]) {
case "top":
y = 0;
break;

case "middle":
y = .5;
break;

case "bottom":
y = 1;
break;

default:
y = origin[0] / original.height;
}
switch (origin[1]) {
case "left":
x = 0;
break;

case "center":
x = .5;
break;

case "right":
x = 1;
break;

default:
x = origin[1] / original.width;
}
return {
x:x,
y:y
};
},
createWrapper:function(element) {
if (element.parent().is(".ui-effects-wrapper")) return element.parent();
var props = {
width:element.outerWidth(!0),
height:element.outerHeight(!0),
"float":element.css("float")
}, wrapper = $("<div></div>").addClass("ui-effects-wrapper").css({
fontSize:"100%",
background:"transparent",
border:"none",
margin:0,
padding:0
}), active = document.activeElement;
try {
active.id;
} catch (e) {
active = document.body;
}
return element.wrap(wrapper), (element[0] === active || $.contains(element[0], active)) && $(active).focus(), 
wrapper = element.parent(), "static" == element.css("position") ? (wrapper.css({
position:"relative"
}), element.css({
position:"relative"
})) :($.extend(props, {
position:element.css("position"),
zIndex:element.css("z-index")
}), $.each([ "top", "left", "bottom", "right" ], function(i, pos) {
props[pos] = element.css(pos), isNaN(parseInt(props[pos], 10)) && (props[pos] = "auto");
}), element.css({
position:"relative",
top:0,
left:0,
right:"auto",
bottom:"auto"
})), wrapper.css(props).show();
},
removeWrapper:function(element) {
var parent, active = document.activeElement;
return element.parent().is(".ui-effects-wrapper") ? (parent = element.parent().replaceWith(element), 
(element[0] === active || $.contains(element[0], active)) && $(active).focus(), 
parent) :element;
},
setTransition:function(element, list, factor, value) {
return value = value || {}, $.each(list, function(i, x) {
var unit = element.cssUnit(x);
unit[0] > 0 && (value[x] = unit[0] * factor + unit[1]);
}), value;
}
}), $.fn.extend({
effect:function(effect) {
var args = _normalizeArguments.apply(this, arguments), args2 = {
options:args[1],
duration:args[2],
callback:args[3]
}, mode = args2.options.mode, effectMethod = $.effects[effect];
return $.fx.off || !effectMethod ? mode ? this[mode](args2.duration, args2.callback) :this.each(function() {
args2.callback && args2.callback.call(this);
}) :effectMethod.call(this, args2);
},
_show:$.fn.show,
show:function(speed) {
if (standardSpeed(speed)) return this._show.apply(this, arguments);
var args = _normalizeArguments.apply(this, arguments);
return args[1].mode = "show", this.effect.apply(this, args);
},
_hide:$.fn.hide,
hide:function(speed) {
if (standardSpeed(speed)) return this._hide.apply(this, arguments);
var args = _normalizeArguments.apply(this, arguments);
return args[1].mode = "hide", this.effect.apply(this, args);
},
__toggle:$.fn.toggle,
toggle:function(speed) {
if (standardSpeed(speed) || "boolean" == typeof speed || $.isFunction(speed)) return this.__toggle.apply(this, arguments);
var args = _normalizeArguments.apply(this, arguments);
return args[1].mode = "toggle", this.effect.apply(this, args);
},
cssUnit:function(key) {
var style = this.css(key), val = [];
return $.each([ "em", "px", "%", "pt" ], function(i, unit) {
style.indexOf(unit) > 0 && (val = [ parseFloat(style), unit ]);
}), val;
}
});
var baseEasings = {};
$.each([ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function(i, name) {
baseEasings[name] = function(p) {
return Math.pow(p, i + 2);
};
}), $.extend(baseEasings, {
Sine:function(p) {
return 1 - Math.cos(p * Math.PI / 2);
},
Circ:function(p) {
return 1 - Math.sqrt(1 - p * p);
},
Elastic:function(p) {
return 0 === p || 1 === p ? p :-Math.pow(2, 8 * (p - 1)) * Math.sin((80 * (p - 1) - 7.5) * Math.PI / 15);
},
Back:function(p) {
return p * p * (3 * p - 2);
},
Bounce:function(p) {
for (var pow2, bounce = 4; p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11; ) ;
return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((3 * pow2 - 2) / 22 - p, 2);
}
}), $.each(baseEasings, function(name, easeIn) {
$.easing["easeIn" + name] = easeIn, $.easing["easeOut" + name] = function(p) {
return 1 - easeIn(1 - p);
}, $.easing["easeInOut" + name] = function(p) {
return .5 > p ? easeIn(2 * p) / 2 :easeIn(-2 * p + 2) / -2 + 1;
};
});
}(jQuery), function($) {
$.effects.blind = function(o) {
return this.queue(function() {
var el = $(this), props = [ "position", "top", "bottom", "left", "right" ], mode = $.effects.setMode(el, o.options.mode || "hide"), direction = o.options.direction || "vertical";
$.effects.save(el, props), el.show();
var wrapper = $.effects.createWrapper(el).css({
overflow:"hidden"
}), ref = "vertical" == direction ? "height" :"width", distance = "vertical" == direction ? wrapper.height() :wrapper.width();
"show" == mode && wrapper.css(ref, 0);
var animation = {};
animation[ref] = "show" == mode ? distance :0, wrapper.animate(animation, o.duration, o.options.easing, function() {
"hide" == mode && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), 
o.callback && o.callback.apply(el[0], arguments), el.dequeue();
});
});
};
}(jQuery), function($) {
$.effects.bounce = function(o) {
return this.queue(function() {
var el = $(this), props = [ "position", "top", "bottom", "left", "right" ], mode = $.effects.setMode(el, o.options.mode || "effect"), direction = o.options.direction || "up", distance = o.options.distance || 20, times = o.options.times || 5, speed = o.duration || 250;
/show|hide/.test(mode) && props.push("opacity"), $.effects.save(el, props), el.show(), 
$.effects.createWrapper(el);
var ref = "up" == direction || "down" == direction ? "top" :"left", motion = "up" == direction || "left" == direction ? "pos" :"neg", distance = o.options.distance || ("top" == ref ? el.outerHeight(!0) / 3 :el.outerWidth(!0) / 3);
if ("show" == mode && el.css("opacity", 0).css(ref, "pos" == motion ? -distance :distance), 
"hide" == mode && (distance /= 2 * times), "hide" != mode && times--, "show" == mode) {
var animation = {
opacity:1
};
animation[ref] = ("pos" == motion ? "+=" :"-=") + distance, el.animate(animation, speed / 2, o.options.easing), 
distance /= 2, times--;
}
for (var i = 0; times > i; i++) {
var animation1 = {}, animation2 = {};
animation1[ref] = ("pos" == motion ? "-=" :"+=") + distance, animation2[ref] = ("pos" == motion ? "+=" :"-=") + distance, 
el.animate(animation1, speed / 2, o.options.easing).animate(animation2, speed / 2, o.options.easing), 
distance = "hide" == mode ? 2 * distance :distance / 2;
}
if ("hide" == mode) {
var animation = {
opacity:0
};
animation[ref] = ("pos" == motion ? "-=" :"+=") + distance, el.animate(animation, speed / 2, o.options.easing, function() {
el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), o.callback && o.callback.apply(this, arguments);
});
} else {
var animation1 = {}, animation2 = {};
animation1[ref] = ("pos" == motion ? "-=" :"+=") + distance, animation2[ref] = ("pos" == motion ? "+=" :"-=") + distance, 
el.animate(animation1, speed / 2, o.options.easing).animate(animation2, speed / 2, o.options.easing, function() {
$.effects.restore(el, props), $.effects.removeWrapper(el), o.callback && o.callback.apply(this, arguments);
});
}
el.queue("fx", function() {
el.dequeue();
}), el.dequeue();
});
};
}(jQuery), function($) {
$.effects.clip = function(o) {
return this.queue(function() {
var el = $(this), props = [ "position", "top", "bottom", "left", "right", "height", "width" ], mode = $.effects.setMode(el, o.options.mode || "hide"), direction = o.options.direction || "vertical";
$.effects.save(el, props), el.show();
var wrapper = $.effects.createWrapper(el).css({
overflow:"hidden"
}), animate = "IMG" == el[0].tagName ? wrapper :el, ref = {
size:"vertical" == direction ? "height" :"width",
position:"vertical" == direction ? "top" :"left"
}, distance = "vertical" == direction ? animate.height() :animate.width();
"show" == mode && (animate.css(ref.size, 0), animate.css(ref.position, distance / 2));
var animation = {};
animation[ref.size] = "show" == mode ? distance :0, animation[ref.position] = "show" == mode ? 0 :distance / 2, 
animate.animate(animation, {
queue:!1,
duration:o.duration,
easing:o.options.easing,
complete:function() {
"hide" == mode && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), 
o.callback && o.callback.apply(el[0], arguments), el.dequeue();
}
});
});
};
}(jQuery), function($) {
$.effects.drop = function(o) {
return this.queue(function() {
var el = $(this), props = [ "position", "top", "bottom", "left", "right", "opacity" ], mode = $.effects.setMode(el, o.options.mode || "hide"), direction = o.options.direction || "left";
$.effects.save(el, props), el.show(), $.effects.createWrapper(el);
var ref = "up" == direction || "down" == direction ? "top" :"left", motion = "up" == direction || "left" == direction ? "pos" :"neg", distance = o.options.distance || ("top" == ref ? el.outerHeight(!0) / 2 :el.outerWidth(!0) / 2);
"show" == mode && el.css("opacity", 0).css(ref, "pos" == motion ? -distance :distance);
var animation = {
opacity:"show" == mode ? 1 :0
};
animation[ref] = ("show" == mode ? "pos" == motion ? "+=" :"-=" :"pos" == motion ? "-=" :"+=") + distance, 
el.animate(animation, {
queue:!1,
duration:o.duration,
easing:o.options.easing,
complete:function() {
"hide" == mode && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), 
o.callback && o.callback.apply(this, arguments), el.dequeue();
}
});
});
};
}(jQuery), function($) {
$.effects.explode = function(o) {
return this.queue(function() {
var rows = o.options.pieces ? Math.round(Math.sqrt(o.options.pieces)) :3, cells = o.options.pieces ? Math.round(Math.sqrt(o.options.pieces)) :3;
o.options.mode = "toggle" == o.options.mode ? $(this).is(":visible") ? "hide" :"show" :o.options.mode;
var el = $(this).show().css("visibility", "hidden"), offset = el.offset();
offset.top -= parseInt(el.css("marginTop"), 10) || 0, offset.left -= parseInt(el.css("marginLeft"), 10) || 0;
for (var width = el.outerWidth(!0), height = el.outerHeight(!0), i = 0; rows > i; i++) for (var j = 0; cells > j; j++) el.clone().appendTo("body").wrap("<div></div>").css({
position:"absolute",
visibility:"visible",
left:-j * (width / cells),
top:-i * (height / rows)
}).parent().addClass("ui-effects-explode").css({
position:"absolute",
overflow:"hidden",
width:width / cells,
height:height / rows,
left:offset.left + j * (width / cells) + ("show" == o.options.mode ? (j - Math.floor(cells / 2)) * (width / cells) :0),
top:offset.top + i * (height / rows) + ("show" == o.options.mode ? (i - Math.floor(rows / 2)) * (height / rows) :0),
opacity:"show" == o.options.mode ? 0 :1
}).animate({
left:offset.left + j * (width / cells) + ("show" == o.options.mode ? 0 :(j - Math.floor(cells / 2)) * (width / cells)),
top:offset.top + i * (height / rows) + ("show" == o.options.mode ? 0 :(i - Math.floor(rows / 2)) * (height / rows)),
opacity:"show" == o.options.mode ? 1 :0
}, o.duration || 500);
setTimeout(function() {
"show" == o.options.mode ? el.css({
visibility:"visible"
}) :el.css({
visibility:"visible"
}).hide(), o.callback && o.callback.apply(el[0]), el.dequeue(), $("div.ui-effects-explode").remove();
}, o.duration || 500);
});
};
}(jQuery), function($) {
$.effects.fade = function(o) {
return this.queue(function() {
var elem = $(this), mode = $.effects.setMode(elem, o.options.mode || "hide");
elem.animate({
opacity:mode
}, {
queue:!1,
duration:o.duration,
easing:o.options.easing,
complete:function() {
o.callback && o.callback.apply(this, arguments), elem.dequeue();
}
});
});
};
}(jQuery), function($) {
$.effects.fold = function(o) {
return this.queue(function() {
var el = $(this), props = [ "position", "top", "bottom", "left", "right" ], mode = $.effects.setMode(el, o.options.mode || "hide"), size = o.options.size || 15, horizFirst = !!o.options.horizFirst, duration = o.duration ? o.duration / 2 :$.fx.speeds._default / 2;
$.effects.save(el, props), el.show();
var wrapper = $.effects.createWrapper(el).css({
overflow:"hidden"
}), widthFirst = "show" == mode != horizFirst, ref = widthFirst ? [ "width", "height" ] :[ "height", "width" ], distance = widthFirst ? [ wrapper.width(), wrapper.height() ] :[ wrapper.height(), wrapper.width() ], percent = /([0-9]+)%/.exec(size);
percent && (size = parseInt(percent[1], 10) / 100 * distance["hide" == mode ? 0 :1]), 
"show" == mode && wrapper.css(horizFirst ? {
height:0,
width:size
} :{
height:size,
width:0
});
var animation1 = {}, animation2 = {};
animation1[ref[0]] = "show" == mode ? distance[0] :size, animation2[ref[1]] = "show" == mode ? distance[1] :0, 
wrapper.animate(animation1, duration, o.options.easing).animate(animation2, duration, o.options.easing, function() {
"hide" == mode && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), 
o.callback && o.callback.apply(el[0], arguments), el.dequeue();
});
});
};
}(jQuery), function($) {
$.effects.highlight = function(o) {
return this.queue(function() {
var elem = $(this), props = [ "backgroundImage", "backgroundColor", "opacity" ], mode = $.effects.setMode(elem, o.options.mode || "show"), animation = {
backgroundColor:elem.css("backgroundColor")
};
"hide" == mode && (animation.opacity = 0), $.effects.save(elem, props), elem.show().css({
backgroundImage:"none",
backgroundColor:o.options.color || "#ffff99"
}).animate(animation, {
queue:!1,
duration:o.duration,
easing:o.options.easing,
complete:function() {
"hide" == mode && elem.hide(), $.effects.restore(elem, props), "show" == mode && !$.support.opacity && this.style.removeAttribute("filter"), 
o.callback && o.callback.apply(this, arguments), elem.dequeue();
}
});
});
};
}(jQuery), function($) {
$.effects.pulsate = function(o) {
return this.queue(function() {
var elem = $(this), mode = $.effects.setMode(elem, o.options.mode || "show"), times = 2 * (o.options.times || 5) - 1, duration = o.duration ? o.duration / 2 :$.fx.speeds._default / 2, isVisible = elem.is(":visible"), animateTo = 0;
isVisible || (elem.css("opacity", 0).show(), animateTo = 1), ("hide" == mode && isVisible || "show" == mode && !isVisible) && times--;
for (var i = 0; times > i; i++) elem.animate({
opacity:animateTo
}, duration, o.options.easing), animateTo = (animateTo + 1) % 2;
elem.animate({
opacity:animateTo
}, duration, o.options.easing, function() {
0 == animateTo && elem.hide(), o.callback && o.callback.apply(this, arguments);
}), elem.queue("fx", function() {
elem.dequeue();
}).dequeue();
});
};
}(jQuery), function($) {
$.effects.puff = function(o) {
return this.queue(function() {
var elem = $(this), mode = $.effects.setMode(elem, o.options.mode || "hide"), percent = parseInt(o.options.percent, 10) || 150, factor = percent / 100, original = {
height:elem.height(),
width:elem.width()
};
$.extend(o.options, {
fade:!0,
mode:mode,
percent:"hide" == mode ? percent :100,
from:"hide" == mode ? original :{
height:original.height * factor,
width:original.width * factor
}
}), elem.effect("scale", o.options, o.duration, o.callback), elem.dequeue();
});
}, $.effects.scale = function(o) {
return this.queue(function() {
var el = $(this), options = $.extend(!0, {}, o.options), mode = $.effects.setMode(el, o.options.mode || "effect"), percent = parseInt(o.options.percent, 10) || (0 == parseInt(o.options.percent, 10) ? 0 :"hide" == mode ? 0 :100), direction = o.options.direction || "both", origin = o.options.origin;
"effect" != mode && (options.origin = origin || [ "middle", "center" ], options.restore = !0);
var original = {
height:el.height(),
width:el.width()
};
el.from = o.options.from || ("show" == mode ? {
height:0,
width:0
} :original);
var factor = {
y:"horizontal" != direction ? percent / 100 :1,
x:"vertical" != direction ? percent / 100 :1
};
el.to = {
height:original.height * factor.y,
width:original.width * factor.x
}, o.options.fade && ("show" == mode && (el.from.opacity = 0, el.to.opacity = 1), 
"hide" == mode && (el.from.opacity = 1, el.to.opacity = 0)), options.from = el.from, 
options.to = el.to, options.mode = mode, el.effect("size", options, o.duration, o.callback), 
el.dequeue();
});
}, $.effects.size = function(o) {
return this.queue(function() {
var el = $(this), props = [ "position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity" ], props1 = [ "position", "top", "bottom", "left", "right", "overflow", "opacity" ], props2 = [ "width", "height", "overflow" ], cProps = [ "fontSize" ], vProps = [ "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom" ], hProps = [ "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight" ], mode = $.effects.setMode(el, o.options.mode || "effect"), restore = o.options.restore || !1, scale = o.options.scale || "both", origin = o.options.origin, original = {
height:el.height(),
width:el.width()
};
if (el.from = o.options.from || original, el.to = o.options.to || original, origin) {
var baseline = $.effects.getBaseline(origin, original);
el.from.top = (original.height - el.from.height) * baseline.y, el.from.left = (original.width - el.from.width) * baseline.x, 
el.to.top = (original.height - el.to.height) * baseline.y, el.to.left = (original.width - el.to.width) * baseline.x;
}
var factor = {
from:{
y:el.from.height / original.height,
x:el.from.width / original.width
},
to:{
y:el.to.height / original.height,
x:el.to.width / original.width
}
};
("box" == scale || "both" == scale) && (factor.from.y != factor.to.y && (props = props.concat(vProps), 
el.from = $.effects.setTransition(el, vProps, factor.from.y, el.from), el.to = $.effects.setTransition(el, vProps, factor.to.y, el.to)), 
factor.from.x != factor.to.x && (props = props.concat(hProps), el.from = $.effects.setTransition(el, hProps, factor.from.x, el.from), 
el.to = $.effects.setTransition(el, hProps, factor.to.x, el.to))), ("content" == scale || "both" == scale) && factor.from.y != factor.to.y && (props = props.concat(cProps), 
el.from = $.effects.setTransition(el, cProps, factor.from.y, el.from), el.to = $.effects.setTransition(el, cProps, factor.to.y, el.to)), 
$.effects.save(el, restore ? props :props1), el.show(), $.effects.createWrapper(el), 
el.css("overflow", "hidden").css(el.from), ("content" == scale || "both" == scale) && (vProps = vProps.concat([ "marginTop", "marginBottom" ]).concat(cProps), 
hProps = hProps.concat([ "marginLeft", "marginRight" ]), props2 = props.concat(vProps).concat(hProps), 
el.find("*[width]").each(function() {
var child = $(this);
restore && $.effects.save(child, props2);
var c_original = {
height:child.height(),
width:child.width()
};
child.from = {
height:c_original.height * factor.from.y,
width:c_original.width * factor.from.x
}, child.to = {
height:c_original.height * factor.to.y,
width:c_original.width * factor.to.x
}, factor.from.y != factor.to.y && (child.from = $.effects.setTransition(child, vProps, factor.from.y, child.from), 
child.to = $.effects.setTransition(child, vProps, factor.to.y, child.to)), factor.from.x != factor.to.x && (child.from = $.effects.setTransition(child, hProps, factor.from.x, child.from), 
child.to = $.effects.setTransition(child, hProps, factor.to.x, child.to)), child.css(child.from), 
child.animate(child.to, o.duration, o.options.easing, function() {
restore && $.effects.restore(child, props2);
});
})), el.animate(el.to, {
queue:!1,
duration:o.duration,
easing:o.options.easing,
complete:function() {
0 === el.to.opacity && el.css("opacity", el.from.opacity), "hide" == mode && el.hide(), 
$.effects.restore(el, restore ? props :props1), $.effects.removeWrapper(el), o.callback && o.callback.apply(this, arguments), 
el.dequeue();
}
});
});
};
}(jQuery), function($) {
$.effects.shake = function(o) {
return this.queue(function() {
var el = $(this), props = [ "position", "top", "bottom", "left", "right" ], direction = ($.effects.setMode(el, o.options.mode || "effect"), 
o.options.direction || "left"), distance = o.options.distance || 20, times = o.options.times || 3, speed = o.duration || o.options.duration || 140;
$.effects.save(el, props), el.show(), $.effects.createWrapper(el);
var ref = "up" == direction || "down" == direction ? "top" :"left", motion = "up" == direction || "left" == direction ? "pos" :"neg", animation = {}, animation1 = {}, animation2 = {};
animation[ref] = ("pos" == motion ? "-=" :"+=") + distance, animation1[ref] = ("pos" == motion ? "+=" :"-=") + 2 * distance, 
animation2[ref] = ("pos" == motion ? "-=" :"+=") + 2 * distance, el.animate(animation, speed, o.options.easing);
for (var i = 1; times > i; i++) el.animate(animation1, speed, o.options.easing).animate(animation2, speed, o.options.easing);
el.animate(animation1, speed, o.options.easing).animate(animation, speed / 2, o.options.easing, function() {
$.effects.restore(el, props), $.effects.removeWrapper(el), o.callback && o.callback.apply(this, arguments);
}), el.queue("fx", function() {
el.dequeue();
}), el.dequeue();
});
};
}(jQuery), function($) {
$.effects.slide = function(o) {
return this.queue(function() {
var el = $(this), props = [ "position", "top", "bottom", "left", "right" ], mode = $.effects.setMode(el, o.options.mode || "show"), direction = o.options.direction || "left";
$.effects.save(el, props), el.show(), $.effects.createWrapper(el).css({
overflow:"hidden"
});
var ref = "up" == direction || "down" == direction ? "top" :"left", motion = "up" == direction || "left" == direction ? "pos" :"neg", distance = o.options.distance || ("top" == ref ? el.outerHeight(!0) :el.outerWidth(!0));
"show" == mode && el.css(ref, "pos" == motion ? isNaN(distance) ? "-" + distance :-distance :distance);
var animation = {};
animation[ref] = ("show" == mode ? "pos" == motion ? "+=" :"-=" :"pos" == motion ? "-=" :"+=") + distance, 
el.animate(animation, {
queue:!1,
duration:o.duration,
easing:o.options.easing,
complete:function() {
"hide" == mode && el.hide(), $.effects.restore(el, props), $.effects.removeWrapper(el), 
o.callback && o.callback.apply(this, arguments), el.dequeue();
}
});
});
};
}(jQuery), function($) {
$.effects.transfer = function(o) {
return this.queue(function() {
var elem = $(this), target = $(o.options.to), endPosition = target.offset(), animation = {
top:endPosition.top,
left:endPosition.left,
height:target.innerHeight(),
width:target.innerWidth()
}, startPosition = elem.offset(), transfer = $('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(o.options.className).css({
top:startPosition.top,
left:startPosition.left,
height:elem.innerHeight(),
width:elem.innerWidth(),
position:"absolute"
}).animate(animation, o.duration, o.options.easing, function() {
transfer.remove(), o.callback && o.callback.apply(elem[0], arguments), elem.dequeue();
});
});
};
}(jQuery), function($) {
$.widget("ui.accordion", {
options:{
active:0,
animated:"slide",
autoHeight:!0,
clearStyle:!1,
collapsible:!1,
event:"click",
fillSpace:!1,
header:"> li > :first-child,> :not(li):even",
icons:{
header:"ui-icon-triangle-1-e",
headerSelected:"ui-icon-triangle-1-s"
},
navigation:!1,
navigationFilter:function() {
return this.href.toLowerCase() === location.href.toLowerCase();
}
},
_create:function() {
var self = this, options = self.options;
if (self.running = 0, self.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"), 
self.headers = self.element.find(options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function() {
options.disabled || $(this).addClass("ui-state-hover");
}).bind("mouseleave.accordion", function() {
options.disabled || $(this).removeClass("ui-state-hover");
}).bind("focus.accordion", function() {
options.disabled || $(this).addClass("ui-state-focus");
}).bind("blur.accordion", function() {
options.disabled || $(this).removeClass("ui-state-focus");
}), self.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"), 
options.navigation) {
var current = self.element.find("a").filter(options.navigationFilter).eq(0);
if (current.length) {
var header = current.closest(".ui-accordion-header");
self.active = header.length ? header :current.closest(".ui-accordion-content").prev();
}
}
self.active = self._findActive(self.active || options.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"), 
self.active.next().addClass("ui-accordion-content-active"), self._createIcons(), 
self.resize(), self.element.attr("role", "tablist"), self.headers.attr("role", "tab").bind("keydown.accordion", function(event) {
return self._keydown(event);
}).next().attr("role", "tabpanel"), self.headers.not(self.active || "").attr({
"aria-expanded":"false",
"aria-selected":"false",
tabIndex:-1
}).next().hide(), self.active.length ? self.active.attr({
"aria-expanded":"true",
"aria-selected":"true",
tabIndex:0
}) :self.headers.eq(0).attr("tabIndex", 0), $.browser.safari || self.headers.find("a").attr("tabIndex", -1), 
options.event && self.headers.bind(options.event.split(" ").join(".accordion ") + ".accordion", function(event) {
self._clickHandler.call(self, event, this), event.preventDefault();
});
},
_createIcons:function() {
var options = this.options;
options.icons && ($("<span></span>").addClass("ui-icon " + options.icons.header).prependTo(this.headers), 
this.active.children(".ui-icon").toggleClass(options.icons.header).toggleClass(options.icons.headerSelected), 
this.element.addClass("ui-accordion-icons"));
},
_destroyIcons:function() {
this.headers.children(".ui-icon").remove(), this.element.removeClass("ui-accordion-icons");
},
destroy:function() {
var options = this.options;
this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), 
this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"), 
this.headers.find("a").removeAttr("tabIndex"), this._destroyIcons();
var contents = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
return (options.autoHeight || options.fillHeight) && contents.css("height", ""), 
$.Widget.prototype.destroy.call(this);
},
_setOption:function(key, value) {
$.Widget.prototype._setOption.apply(this, arguments), "active" == key && this.activate(value), 
"icons" == key && (this._destroyIcons(), value && this._createIcons()), "disabled" == key && this.headers.add(this.headers.next())[value ? "addClass" :"removeClass"]("ui-accordion-disabled ui-state-disabled");
},
_keydown:function(event) {
if (!(this.options.disabled || event.altKey || event.ctrlKey)) {
var keyCode = $.ui.keyCode, length = this.headers.length, currentIndex = this.headers.index(event.target), toFocus = !1;
switch (event.keyCode) {
case keyCode.RIGHT:
case keyCode.DOWN:
toFocus = this.headers[(currentIndex + 1) % length];
break;

case keyCode.LEFT:
case keyCode.UP:
toFocus = this.headers[(currentIndex - 1 + length) % length];
break;

case keyCode.SPACE:
case keyCode.ENTER:
this._clickHandler({
target:event.target
}, event.target), event.preventDefault();
}
return toFocus ? ($(event.target).attr("tabIndex", -1), $(toFocus).attr("tabIndex", 0), 
toFocus.focus(), !1) :!0;
}
},
resize:function() {
var maxHeight, options = this.options;
if (options.fillSpace) {
if ($.browser.msie) {
var defOverflow = this.element.parent().css("overflow");
this.element.parent().css("overflow", "hidden");
}
maxHeight = this.element.parent().height(), $.browser.msie && this.element.parent().css("overflow", defOverflow), 
this.headers.each(function() {
maxHeight -= $(this).outerHeight(!0);
}), this.headers.next().each(function() {
$(this).height(Math.max(0, maxHeight - $(this).innerHeight() + $(this).height()));
}).css("overflow", "auto");
} else options.autoHeight && (maxHeight = 0, this.headers.next().each(function() {
maxHeight = Math.max(maxHeight, $(this).height("").height());
}).height(maxHeight));
return this;
},
activate:function(index) {
this.options.active = index;
var active = this._findActive(index)[0];
return this._clickHandler({
target:active
}, active), this;
},
_findActive:function(selector) {
return selector ? "number" == typeof selector ? this.headers.filter(":eq(" + selector + ")") :this.headers.not(this.headers.not(selector)) :selector === !1 ? $([]) :this.headers.filter(":eq(0)");
},
_clickHandler:function(event, target) {
var options = this.options;
if (!options.disabled) {
if (!event.target) {
if (!options.collapsible) return;
this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(options.icons.headerSelected).addClass(options.icons.header), 
this.active.next().addClass("ui-accordion-content-active");
var toHide = this.active.next(), data = {
options:options,
newHeader:$([]),
oldHeader:options.active,
newContent:$([]),
oldContent:toHide
}, toShow = this.active = $([]);
return this._toggle(toShow, toHide, data), void 0;
}
var clicked = $(event.currentTarget || target), clickedIsActive = clicked[0] === this.active[0];
if (options.active = options.collapsible && clickedIsActive ? !1 :this.headers.index(clicked), 
!(this.running || !options.collapsible && clickedIsActive)) {
var active = this.active, toShow = clicked.next(), toHide = this.active.next(), data = {
options:options,
newHeader:clickedIsActive && options.collapsible ? $([]) :clicked,
oldHeader:this.active,
newContent:clickedIsActive && options.collapsible ? $([]) :toShow,
oldContent:toHide
}, down = this.headers.index(this.active[0]) > this.headers.index(clicked[0]);
this.active = clickedIsActive ? $([]) :clicked, this._toggle(toShow, toHide, data, clickedIsActive, down), 
active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(options.icons.headerSelected).addClass(options.icons.header), 
clickedIsActive || (clicked.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(options.icons.header).addClass(options.icons.headerSelected), 
clicked.next().addClass("ui-accordion-content-active"));
}
}
},
_toggle:function(toShow, toHide, data, clickedIsActive, down) {
var self = this, options = self.options;
self.toShow = toShow, self.toHide = toHide, self.data = data;
var complete = function() {
return self ? self._completed.apply(self, arguments) :void 0;
};
if (self._trigger("changestart", null, self.data), self.running = 0 === toHide.size() ? toShow.size() :toHide.size(), 
options.animated) {
var animOptions = {};
animOptions = options.collapsible && clickedIsActive ? {
toShow:$([]),
toHide:toHide,
complete:complete,
down:down,
autoHeight:options.autoHeight || options.fillSpace
} :{
toShow:toShow,
toHide:toHide,
complete:complete,
down:down,
autoHeight:options.autoHeight || options.fillSpace
}, options.proxied || (options.proxied = options.animated), options.proxiedDuration || (options.proxiedDuration = options.duration), 
options.animated = $.isFunction(options.proxied) ? options.proxied(animOptions) :options.proxied, 
options.duration = $.isFunction(options.proxiedDuration) ? options.proxiedDuration(animOptions) :options.proxiedDuration;
var animations = $.ui.accordion.animations, duration = options.duration, easing = options.animated;
!easing || animations[easing] || $.easing[easing] || (easing = "slide"), animations[easing] || (animations[easing] = function(options) {
this.slide(options, {
easing:easing,
duration:duration || 700
});
}), animations[easing](animOptions);
} else options.collapsible && clickedIsActive ? toShow.toggle() :(toHide.hide(), 
toShow.show()), complete(!0);
toHide.prev().attr({
"aria-expanded":"false",
"aria-selected":"false",
tabIndex:-1
}).blur(), toShow.prev().attr({
"aria-expanded":"true",
"aria-selected":"true",
tabIndex:0
}).focus();
},
_completed:function(cancel) {
this.running = cancel ? 0 :--this.running, this.running || (this.options.clearStyle && this.toShow.add(this.toHide).css({
height:"",
overflow:""
}), this.toHide.removeClass("ui-accordion-content-active"), this.toHide.length && (this.toHide.parent()[0].className = this.toHide.parent()[0].className), 
this._trigger("change", null, this.data));
}
}), $.extend($.ui.accordion, {
version:"1.8.23",
animations:{
slide:function(options, additions) {
if (options = $.extend({
easing:"swing",
duration:300
}, options, additions), !options.toHide.size()) return options.toShow.animate({
height:"show",
paddingTop:"show",
paddingBottom:"show"
}, options), void 0;
if (!options.toShow.size()) return options.toHide.animate({
height:"hide",
paddingTop:"hide",
paddingBottom:"hide"
}, options), void 0;
var originalWidth, overflow = options.toShow.css("overflow"), percentDone = 0, showProps = {}, hideProps = {}, fxAttrs = [ "height", "paddingTop", "paddingBottom" ], s = options.toShow;
originalWidth = s[0].style.width, s.width(s.parent().width() - parseFloat(s.css("paddingLeft")) - parseFloat(s.css("paddingRight")) - (parseFloat(s.css("borderLeftWidth")) || 0) - (parseFloat(s.css("borderRightWidth")) || 0)), 
$.each(fxAttrs, function(i, prop) {
hideProps[prop] = "hide";
var parts = ("" + $.css(options.toShow[0], prop)).match(/^([\d+-.]+)(.*)$/);
showProps[prop] = {
value:parts[1],
unit:parts[2] || "px"
};
}), options.toShow.css({
height:0,
overflow:"hidden"
}).show(), options.toHide.filter(":hidden").each(options.complete).end().filter(":visible").animate(hideProps, {
step:function(now, settings) {
"height" == settings.prop && (percentDone = settings.end - settings.start === 0 ? 0 :(settings.now - settings.start) / (settings.end - settings.start)), 
options.toShow[0].style[settings.prop] = percentDone * showProps[settings.prop].value + showProps[settings.prop].unit;
},
duration:options.duration,
easing:options.easing,
complete:function() {
options.autoHeight || options.toShow.css("height", ""), options.toShow.css({
width:originalWidth,
overflow:overflow
}), options.complete();
}
});
},
bounceslide:function(options) {
this.slide(options, {
easing:options.down ? "easeOutBounce" :"swing",
duration:options.down ? 1e3 :200
});
}
}
});
}(jQuery), function($) {
var requestIndex = 0;
$.widget("ui.autocomplete", {
options:{
appendTo:"body",
autoFocus:!1,
delay:300,
minLength:1,
position:{
my:"left top",
at:"left bottom",
collision:"none"
},
source:null
},
pending:0,
_create:function() {
var suppressKeyPress, self = this, doc = this.element[0].ownerDocument;
this.isMultiLine = this.element.is("textarea"), this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
role:"textbox",
"aria-autocomplete":"list",
"aria-haspopup":"true"
}).bind("keydown.autocomplete", function(event) {
if (!self.options.disabled && !self.element.propAttr("readOnly")) {
suppressKeyPress = !1;
var keyCode = $.ui.keyCode;
switch (event.keyCode) {
case keyCode.PAGE_UP:
self._move("previousPage", event);
break;

case keyCode.PAGE_DOWN:
self._move("nextPage", event);
break;

case keyCode.UP:
self._keyEvent("previous", event);
break;

case keyCode.DOWN:
self._keyEvent("next", event);
break;

case keyCode.ENTER:
case keyCode.NUMPAD_ENTER:
self.menu.active && (suppressKeyPress = !0, event.preventDefault());

case keyCode.TAB:
if (!self.menu.active) return;
self.menu.select(event);
break;

case keyCode.ESCAPE:
self.element.val(self.term), self.close(event);
break;

default:
clearTimeout(self.searching), self.searching = setTimeout(function() {
self.term != self.element.val() && (self.selectedItem = null, self.search(null, event));
}, self.options.delay);
}
}
}).bind("keypress.autocomplete", function(event) {
suppressKeyPress && (suppressKeyPress = !1, event.preventDefault());
}).bind("focus.autocomplete", function() {
self.options.disabled || (self.selectedItem = null, self.previous = self.element.val());
}).bind("blur.autocomplete", function(event) {
self.options.disabled || (clearTimeout(self.searching), self.closing = setTimeout(function() {
self.close(event), self._change(event);
}, 150));
}), this._initSource(), this.menu = $("<ul></ul>").addClass("ui-autocomplete").appendTo($(this.options.appendTo || "body", doc)[0]).mousedown(function(event) {
var menuElement = self.menu.element[0];
$(event.target).closest(".ui-menu-item").length || setTimeout(function() {
$(document).one("mousedown", function(event) {
event.target === self.element[0] || event.target === menuElement || $.ui.contains(menuElement, event.target) || self.close();
});
}, 1), setTimeout(function() {
clearTimeout(self.closing);
}, 13);
}).menu({
focus:function(event, ui) {
var item = ui.item.data("item.autocomplete");
!1 !== self._trigger("focus", event, {
item:item
}) && /^key/.test(event.originalEvent.type) && self.element.val(item.value);
},
selected:function(event, ui) {
var item = ui.item.data("item.autocomplete"), previous = self.previous;
self.element[0] !== doc.activeElement && (self.element.focus(), self.previous = previous, 
setTimeout(function() {
self.previous = previous, self.selectedItem = item;
}, 1)), !1 !== self._trigger("select", event, {
item:item
}) && self.element.val(item.value), self.term = self.element.val(), self.close(event), 
self.selectedItem = item;
},
blur:function() {
self.menu.element.is(":visible") && self.element.val() !== self.term && self.element.val(self.term);
}
}).zIndex(this.element.zIndex() + 1).css({
top:0,
left:0
}).hide().data("menu"), $.fn.bgiframe && this.menu.element.bgiframe(), self.beforeunloadHandler = function() {
self.element.removeAttr("autocomplete");
}, $(window).bind("beforeunload", self.beforeunloadHandler);
},
destroy:function() {
this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"), 
this.menu.element.remove(), $(window).unbind("beforeunload", this.beforeunloadHandler), 
$.Widget.prototype.destroy.call(this);
},
_setOption:function(key, value) {
$.Widget.prototype._setOption.apply(this, arguments), "source" === key && this._initSource(), 
"appendTo" === key && this.menu.element.appendTo($(value || "body", this.element[0].ownerDocument)[0]), 
"disabled" === key && value && this.xhr && this.xhr.abort();
},
_initSource:function() {
var array, url, self = this;
$.isArray(this.options.source) ? (array = this.options.source, this.source = function(request, response) {
response($.ui.autocomplete.filter(array, request.term));
}) :"string" == typeof this.options.source ? (url = this.options.source, this.source = function(request, response) {
self.xhr && self.xhr.abort(), self.xhr = $.ajax({
url:url,
data:request,
dataType:"json",
success:function(data) {
response(data);
},
error:function() {
response([]);
}
});
}) :this.source = this.options.source;
},
search:function(value, event) {
return value = null != value ? value :this.element.val(), this.term = this.element.val(), 
value.length < this.options.minLength ? this.close(event) :(clearTimeout(this.closing), 
this._trigger("search", event) !== !1 ? this._search(value) :void 0);
},
_search:function(value) {
this.pending++, this.element.addClass("ui-autocomplete-loading"), this.source({
term:value
}, this._response());
},
_response:function() {
var that = this, index = ++requestIndex;
return function(content) {
index === requestIndex && that.__response(content), that.pending--, that.pending || that.element.removeClass("ui-autocomplete-loading");
};
},
__response:function(content) {
!this.options.disabled && content && content.length ? (content = this._normalize(content), 
this._suggest(content), this._trigger("open")) :this.close();
},
close:function(event) {
clearTimeout(this.closing), this.menu.element.is(":visible") && (this.menu.element.hide(), 
this.menu.deactivate(), this._trigger("close", event));
},
_change:function(event) {
this.previous !== this.element.val() && this._trigger("change", event, {
item:this.selectedItem
});
},
_normalize:function(items) {
return items.length && items[0].label && items[0].value ? items :$.map(items, function(item) {
return "string" == typeof item ? {
label:item,
value:item
} :$.extend({
label:item.label || item.value,
value:item.value || item.label
}, item);
});
},
_suggest:function(items) {
var ul = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
this._renderMenu(ul, items), this.menu.deactivate(), this.menu.refresh(), ul.show(), 
this._resizeMenu(), ul.position($.extend({
of:this.element
}, this.options.position)), this.options.autoFocus && this.menu.next(new $.Event("mouseover"));
},
_resizeMenu:function() {
var ul = this.menu.element;
ul.outerWidth(Math.max(ul.width("").outerWidth() + 1, this.element.outerWidth()));
},
_renderMenu:function(ul, items) {
var self = this;
$.each(items, function(index, item) {
self._renderItem(ul, item);
});
},
_renderItem:function(ul, item) {
return $("<li></li>").data("item.autocomplete", item).append($("<a></a>").text(item.label)).appendTo(ul);
},
_move:function(direction, event) {
return this.menu.element.is(":visible") ? this.menu.first() && /^previous/.test(direction) || this.menu.last() && /^next/.test(direction) ? (this.element.val(this.term), 
this.menu.deactivate(), void 0) :(this.menu[direction](event), void 0) :(this.search(null, event), 
void 0);
},
widget:function() {
return this.menu.element;
},
_keyEvent:function(keyEvent, event) {
(!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(keyEvent, event), 
event.preventDefault());
}
}), $.extend($.ui.autocomplete, {
escapeRegex:function(value) {
return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
},
filter:function(array, term) {
var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), "i");
return $.grep(array, function(value) {
return matcher.test(value.label || value.value || value);
});
}
});
}(jQuery), /*
 * jQuery UI Menu (not officially released)
 * 
 * This widget isn't yet finished and the API is subject to change. We plan to finish
 * it for the next release. You're welcome to give it a try anyway and give us feedback,
 * as long as you're okay with migrating your code later on. We can help with that, too.
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Menu
 *
 * Depends:
 *	jquery.ui.core.js
 *  jquery.ui.widget.js
 */
function($) {
$.widget("ui.menu", {
_create:function() {
var self = this;
this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
role:"listbox",
"aria-activedescendant":"ui-active-menuitem"
}).click(function(event) {
$(event.target).closest(".ui-menu-item a").length && (event.preventDefault(), self.select(event));
}), this.refresh();
},
refresh:function() {
var self = this, items = this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem");
items.children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function(event) {
self.activate(event, $(this).parent());
}).mouseleave(function() {
self.deactivate();
});
},
activate:function(event, item) {
if (this.deactivate(), this.hasScroll()) {
var offset = item.offset().top - this.element.offset().top, scroll = this.element.scrollTop(), elementHeight = this.element.height();
0 > offset ? this.element.scrollTop(scroll + offset) :offset >= elementHeight && this.element.scrollTop(scroll + offset - elementHeight + item.height());
}
this.active = item.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end(), 
this._trigger("focus", event, {
item:item
});
},
deactivate:function() {
this.active && (this.active.children("a").removeClass("ui-state-hover").removeAttr("id"), 
this._trigger("blur"), this.active = null);
},
next:function(event) {
this.move("next", ".ui-menu-item:first", event);
},
previous:function(event) {
this.move("prev", ".ui-menu-item:last", event);
},
first:function() {
return this.active && !this.active.prevAll(".ui-menu-item").length;
},
last:function() {
return this.active && !this.active.nextAll(".ui-menu-item").length;
},
move:function(direction, edge, event) {
if (!this.active) return this.activate(event, this.element.children(edge)), void 0;
var next = this.active[direction + "All"](".ui-menu-item").eq(0);
next.length ? this.activate(event, next) :this.activate(event, this.element.children(edge));
},
nextPage:function(event) {
if (this.hasScroll()) {
if (!this.active || this.last()) return this.activate(event, this.element.children(".ui-menu-item:first")), 
void 0;
var base = this.active.offset().top, height = this.element.height(), result = this.element.children(".ui-menu-item").filter(function() {
var close = $(this).offset().top - base - height + $(this).height();
return 10 > close && close > -10;
});
result.length || (result = this.element.children(".ui-menu-item:last")), this.activate(event, result);
} else this.activate(event, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" :":last"));
},
previousPage:function(event) {
if (this.hasScroll()) {
if (!this.active || this.first()) return this.activate(event, this.element.children(".ui-menu-item:last")), 
void 0;
var base = this.active.offset().top, height = this.element.height(), result = this.element.children(".ui-menu-item").filter(function() {
var close = $(this).offset().top - base + height - $(this).height();
return 10 > close && close > -10;
});
result.length || (result = this.element.children(".ui-menu-item:first")), this.activate(event, result);
} else this.activate(event, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" :":first"));
},
hasScroll:function() {
return this.element.height() < this.element[$.fn.prop ? "prop" :"attr"]("scrollHeight");
},
select:function(event) {
this._trigger("selected", event, {
item:this.active
});
}
});
}(jQuery), function($) {
var lastActive, startXPos, startYPos, clickDragged, baseClasses = "ui-button ui-widget ui-state-default ui-corner-all", stateClasses = "ui-state-hover ui-state-active ", typeClasses = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only", formResetHandler = function() {
var buttons = $(this).find(":ui-button");
setTimeout(function() {
buttons.button("refresh");
}, 1);
}, radioGroup = function(radio) {
var name = radio.name, form = radio.form, radios = $([]);
return name && (radios = form ? $(form).find("[name='" + name + "']") :$("[name='" + name + "']", radio.ownerDocument).filter(function() {
return !this.form;
})), radios;
};
$.widget("ui.button", {
options:{
disabled:null,
text:!0,
label:null,
icons:{
primary:null,
secondary:null
}
},
_create:function() {
this.element.closest("form").unbind("reset.button").bind("reset.button", formResetHandler), 
"boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.propAttr("disabled") :this.element.propAttr("disabled", this.options.disabled), 
this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
var self = this, options = this.options, toggleButton = "checkbox" === this.type || "radio" === this.type, hoverClass = "ui-state-hover" + (toggleButton ? "" :" ui-state-active"), focusClass = "ui-state-focus";
null === options.label && (options.label = this.buttonElement.html()), this.buttonElement.addClass(baseClasses).attr("role", "button").bind("mouseenter.button", function() {
options.disabled || ($(this).addClass("ui-state-hover"), this === lastActive && $(this).addClass("ui-state-active"));
}).bind("mouseleave.button", function() {
options.disabled || $(this).removeClass(hoverClass);
}).bind("click.button", function(event) {
options.disabled && (event.preventDefault(), event.stopImmediatePropagation());
}), this.element.bind("focus.button", function() {
self.buttonElement.addClass(focusClass);
}).bind("blur.button", function() {
self.buttonElement.removeClass(focusClass);
}), toggleButton && (this.element.bind("change.button", function() {
clickDragged || self.refresh();
}), this.buttonElement.bind("mousedown.button", function(event) {
options.disabled || (clickDragged = !1, startXPos = event.pageX, startYPos = event.pageY);
}).bind("mouseup.button", function(event) {
options.disabled || (startXPos !== event.pageX || startYPos !== event.pageY) && (clickDragged = !0);
})), "checkbox" === this.type ? this.buttonElement.bind("click.button", function() {
return options.disabled || clickDragged ? !1 :($(this).toggleClass("ui-state-active"), 
self.buttonElement.attr("aria-pressed", self.element[0].checked), void 0);
}) :"radio" === this.type ? this.buttonElement.bind("click.button", function() {
if (options.disabled || clickDragged) return !1;
$(this).addClass("ui-state-active"), self.buttonElement.attr("aria-pressed", "true");
var radio = self.element[0];
radioGroup(radio).not(radio).map(function() {
return $(this).button("widget")[0];
}).removeClass("ui-state-active").attr("aria-pressed", "false");
}) :(this.buttonElement.bind("mousedown.button", function() {
return options.disabled ? !1 :($(this).addClass("ui-state-active"), lastActive = this, 
$(document).one("mouseup", function() {
lastActive = null;
}), void 0);
}).bind("mouseup.button", function() {
return options.disabled ? !1 :($(this).removeClass("ui-state-active"), void 0);
}).bind("keydown.button", function(event) {
return options.disabled ? !1 :((event.keyCode == $.ui.keyCode.SPACE || event.keyCode == $.ui.keyCode.ENTER) && $(this).addClass("ui-state-active"), 
void 0);
}).bind("keyup.button", function() {
$(this).removeClass("ui-state-active");
}), this.buttonElement.is("a") && this.buttonElement.keyup(function(event) {
event.keyCode === $.ui.keyCode.SPACE && $(this).click();
})), this._setOption("disabled", options.disabled), this._resetButton();
},
_determineButtonType:function() {
if (this.type = this.element.is(":checkbox") ? "checkbox" :this.element.is(":radio") ? "radio" :this.element.is("input") ? "input" :"button", 
"checkbox" === this.type || "radio" === this.type) {
var ancestor = this.element.parents().filter(":last"), labelSelector = "label[for='" + this.element.attr("id") + "']";
this.buttonElement = ancestor.find(labelSelector), this.buttonElement.length || (ancestor = ancestor.length ? ancestor.siblings() :this.element.siblings(), 
this.buttonElement = ancestor.filter(labelSelector), this.buttonElement.length || (this.buttonElement = ancestor.find(labelSelector))), 
this.element.addClass("ui-helper-hidden-accessible");
var checked = this.element.is(":checked");
checked && this.buttonElement.addClass("ui-state-active"), this.buttonElement.attr("aria-pressed", checked);
} else this.buttonElement = this.element;
},
widget:function() {
return this.buttonElement;
},
destroy:function() {
this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(baseClasses + " " + stateClasses + " " + typeClasses).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), 
this.hasTitle || this.buttonElement.removeAttr("title"), $.Widget.prototype.destroy.call(this);
},
_setOption:function(key, value) {
return $.Widget.prototype._setOption.apply(this, arguments), "disabled" === key ? (value ? this.element.propAttr("disabled", !0) :this.element.propAttr("disabled", !1), 
void 0) :(this._resetButton(), void 0);
},
refresh:function() {
var isDisabled = this.element.is(":disabled");
isDisabled !== this.options.disabled && this._setOption("disabled", isDisabled), 
"radio" === this.type ? radioGroup(this.element[0]).each(function() {
$(this).is(":checked") ? $(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") :$(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false");
}) :"checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") :this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"));
},
_resetButton:function() {
if ("input" === this.type) return this.options.label && this.element.val(this.options.label), 
void 0;
var buttonElement = this.buttonElement.removeClass(typeClasses), buttonText = $("<span></span>", this.element[0].ownerDocument).addClass("ui-button-text").html(this.options.label).appendTo(buttonElement.empty()).text(), icons = this.options.icons, multipleIcons = icons.primary && icons.secondary, buttonClasses = [];
icons.primary || icons.secondary ? (this.options.text && buttonClasses.push("ui-button-text-icon" + (multipleIcons ? "s" :icons.primary ? "-primary" :"-secondary")), 
icons.primary && buttonElement.prepend("<span class='ui-button-icon-primary ui-icon " + icons.primary + "'></span>"), 
icons.secondary && buttonElement.append("<span class='ui-button-icon-secondary ui-icon " + icons.secondary + "'></span>"), 
this.options.text || (buttonClasses.push(multipleIcons ? "ui-button-icons-only" :"ui-button-icon-only"), 
this.hasTitle || buttonElement.attr("title", buttonText))) :buttonClasses.push("ui-button-text-only"), 
buttonElement.addClass(buttonClasses.join(" "));
}
}), $.widget("ui.buttonset", {
options:{
items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"
},
_create:function() {
this.element.addClass("ui-buttonset");
},
_init:function() {
this.refresh();
},
_setOption:function(key, value) {
"disabled" === key && this.buttons.button("option", key, value), $.Widget.prototype._setOption.apply(this, arguments);
},
refresh:function() {
var rtl = "rtl" === this.element.css("direction");
this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
return $(this).button("widget")[0];
}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(rtl ? "ui-corner-right" :"ui-corner-left").end().filter(":last").addClass(rtl ? "ui-corner-left" :"ui-corner-right").end().end();
},
destroy:function() {
this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
return $(this).button("widget")[0];
}).removeClass("ui-corner-left ui-corner-right").end().button("destroy"), $.Widget.prototype.destroy.call(this);
}
});
}(jQuery), function($, undefined) {
function Datepicker() {
this.debug = !1, this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], 
this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", 
this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", 
this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", 
this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", 
this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", 
this.regional = [], this.regional[""] = {
closeText:"Done",
prevText:"Prev",
nextText:"Next",
currentText:"Today",
monthNames:[ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
monthNamesShort:[ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
dayNames:[ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
dayNamesShort:[ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
dayNamesMin:[ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
weekHeader:"Wk",
dateFormat:"mm/dd/yy",
firstDay:0,
isRTL:!1,
showMonthAfterYear:!1,
yearSuffix:""
}, this._defaults = {
showOn:"focus",
showAnim:"fadeIn",
showOptions:{},
defaultDate:null,
appendText:"",
buttonText:"...",
buttonImage:"",
buttonImageOnly:!1,
hideIfNoPrevNext:!1,
navigationAsDateFormat:!1,
gotoCurrent:!1,
changeMonth:!1,
changeYear:!1,
yearRange:"c-10:c+10",
showOtherMonths:!1,
selectOtherMonths:!1,
showWeek:!1,
calculateWeek:this.iso8601Week,
shortYearCutoff:"+10",
minDate:null,
maxDate:null,
duration:"fast",
beforeShowDay:null,
beforeShow:null,
onSelect:null,
onChangeMonthYear:null,
onClose:null,
numberOfMonths:1,
showCurrentAtPos:0,
stepMonths:1,
stepBigMonths:12,
altField:"",
altFormat:"",
constrainInput:!0,
showButtonPanel:!1,
autoSize:!1,
disabled:!1
}, $.extend(this._defaults, this.regional[""]), this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'));
}
function bindHover(dpDiv) {
var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
return dpDiv.bind("mouseout", function(event) {
var elem = $(event.target).closest(selector);
elem.length && elem.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover");
}).bind("mouseover", function(event) {
var elem = $(event.target).closest(selector);
!$.datepicker._isDisabledDatepicker(instActive.inline ? dpDiv.parent()[0] :instActive.input[0]) && elem.length && (elem.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), 
elem.addClass("ui-state-hover"), elem.hasClass("ui-datepicker-prev") && elem.addClass("ui-datepicker-prev-hover"), 
elem.hasClass("ui-datepicker-next") && elem.addClass("ui-datepicker-next-hover"));
});
}
function extendRemove(target, props) {
$.extend(target, props);
for (var name in props) (null == props[name] || props[name] == undefined) && (target[name] = props[name]);
return target;
}
function isArray(a) {
return a && ($.browser.safari && "object" == typeof a && a.length || a.constructor && a.constructor.toString().match(/\Array\(\)/));
}
$.extend($.ui, {
datepicker:{
version:"1.8.23"
}
});
var PROP_NAME = "datepicker", dpuuid = new Date().getTime(), instActive;
$.extend(Datepicker.prototype, {
markerClassName:"hasDatepicker",
maxRows:4,
log:function() {
this.debug && console.log.apply("", arguments);
},
_widgetDatepicker:function() {
return this.dpDiv;
},
setDefaults:function(settings) {
return extendRemove(this._defaults, settings || {}), this;
},
_attachDatepicker:function(target, settings) {
var inlineSettings = null;
for (var attrName in this._defaults) {
var attrValue = target.getAttribute("date:" + attrName);
if (attrValue) {
inlineSettings = inlineSettings || {};
try {
inlineSettings[attrName] = eval(attrValue);
} catch (err) {
inlineSettings[attrName] = attrValue;
}
}
}
var nodeName = target.nodeName.toLowerCase(), inline = "div" == nodeName || "span" == nodeName;
target.id || (this.uuid += 1, target.id = "dp" + this.uuid);
var inst = this._newInst($(target), inline);
inst.settings = $.extend({}, settings || {}, inlineSettings || {}), "input" == nodeName ? this._connectDatepicker(target, inst) :inline && this._inlineDatepicker(target, inst);
},
_newInst:function(target, inline) {
var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
return {
id:id,
input:target,
selectedDay:0,
selectedMonth:0,
selectedYear:0,
drawMonth:0,
drawYear:0,
inline:inline,
dpDiv:inline ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) :this.dpDiv
};
},
_connectDatepicker:function(target, inst) {
var input = $(target);
inst.append = $([]), inst.trigger = $([]), input.hasClass(this.markerClassName) || (this._attachments(input, inst), 
input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function(event, key, value) {
inst.settings[key] = value;
}).bind("getData.datepicker", function(event, key) {
return this._get(inst, key);
}), this._autoSize(inst), $.data(target, PROP_NAME, inst), inst.settings.disabled && this._disableDatepicker(target));
},
_attachments:function(input, inst) {
var appendText = this._get(inst, "appendText"), isRTL = this._get(inst, "isRTL");
inst.append && inst.append.remove(), appendText && (inst.append = $('<span class="' + this._appendClass + '">' + appendText + "</span>"), 
input[isRTL ? "before" :"after"](inst.append)), input.unbind("focus", this._showDatepicker), 
inst.trigger && inst.trigger.remove();
var showOn = this._get(inst, "showOn");
if (("focus" == showOn || "both" == showOn) && input.focus(this._showDatepicker), 
"button" == showOn || "both" == showOn) {
var buttonText = this._get(inst, "buttonText"), buttonImage = this._get(inst, "buttonImage");
inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
src:buttonImage,
alt:buttonText,
title:buttonText
}) :$('<button type="button"></button>').addClass(this._triggerClass).html("" == buttonImage ? buttonText :$("<img/>").attr({
src:buttonImage,
alt:buttonText,
title:buttonText
}))), input[isRTL ? "before" :"after"](inst.trigger), inst.trigger.click(function() {
return $.datepicker._datepickerShowing && $.datepicker._lastInput == input[0] ? $.datepicker._hideDatepicker() :$.datepicker._datepickerShowing && $.datepicker._lastInput != input[0] ? ($.datepicker._hideDatepicker(), 
$.datepicker._showDatepicker(input[0])) :$.datepicker._showDatepicker(input[0]), 
!1;
});
}
},
_autoSize:function(inst) {
if (this._get(inst, "autoSize") && !inst.inline) {
var date = new Date(2009, 11, 20), dateFormat = this._get(inst, "dateFormat");
if (dateFormat.match(/[DM]/)) {
var findMax = function(names) {
for (var max = 0, maxI = 0, i = 0; i < names.length; i++) names[i].length > max && (max = names[i].length, 
maxI = i);
return maxI;
};
date.setMonth(findMax(this._get(inst, dateFormat.match(/MM/) ? "monthNames" :"monthNamesShort"))), 
date.setDate(findMax(this._get(inst, dateFormat.match(/DD/) ? "dayNames" :"dayNamesShort")) + 20 - date.getDay());
}
inst.input.attr("size", this._formatDate(inst, date).length);
}
},
_inlineDatepicker:function(target, inst) {
var divSpan = $(target);
divSpan.hasClass(this.markerClassName) || (divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker", function(event, key, value) {
inst.settings[key] = value;
}).bind("getData.datepicker", function(event, key) {
return this._get(inst, key);
}), $.data(target, PROP_NAME, inst), this._setDate(inst, this._getDefaultDate(inst), !0), 
this._updateDatepicker(inst), this._updateAlternate(inst), inst.settings.disabled && this._disableDatepicker(target), 
inst.dpDiv.css("display", "block"));
},
_dialogDatepicker:function(input, date, onSelect, settings, pos) {
var inst = this._dialogInst;
if (!inst) {
this.uuid += 1;
var id = "dp" + this.uuid;
this._dialogInput = $('<input type="text" id="' + id + '" style="position: absolute; top: -100px; width: 0px;"/>'), 
this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), 
inst = this._dialogInst = this._newInst(this._dialogInput, !1), inst.settings = {}, 
$.data(this._dialogInput[0], PROP_NAME, inst);
}
if (extendRemove(inst.settings, settings || {}), date = date && date.constructor == Date ? this._formatDate(inst, date) :date, 
this._dialogInput.val(date), this._pos = pos ? pos.length ? pos :[ pos.pageX, pos.pageY ] :null, 
!this._pos) {
var browserWidth = document.documentElement.clientWidth, browserHeight = document.documentElement.clientHeight, scrollX = document.documentElement.scrollLeft || document.body.scrollLeft, scrollY = document.documentElement.scrollTop || document.body.scrollTop;
this._pos = [ browserWidth / 2 - 100 + scrollX, browserHeight / 2 - 150 + scrollY ];
}
return this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), 
inst.settings.onSelect = onSelect, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), 
this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), 
$.data(this._dialogInput[0], PROP_NAME, inst), this;
},
_destroyDatepicker:function(target) {
var $target = $(target), inst = $.data(target, PROP_NAME);
if ($target.hasClass(this.markerClassName)) {
var nodeName = target.nodeName.toLowerCase();
$.removeData(target, PROP_NAME), "input" == nodeName ? (inst.append.remove(), inst.trigger.remove(), 
$target.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) :("div" == nodeName || "span" == nodeName) && $target.removeClass(this.markerClassName).empty();
}
},
_enableDatepicker:function(target) {
var $target = $(target), inst = $.data(target, PROP_NAME);
if ($target.hasClass(this.markerClassName)) {
var nodeName = target.nodeName.toLowerCase();
if ("input" == nodeName) target.disabled = !1, inst.trigger.filter("button").each(function() {
this.disabled = !1;
}).end().filter("img").css({
opacity:"1.0",
cursor:""
}); else if ("div" == nodeName || "span" == nodeName) {
var inline = $target.children("." + this._inlineClass);
inline.children().removeClass("ui-state-disabled"), inline.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled");
}
this._disabledInputs = $.map(this._disabledInputs, function(value) {
return value == target ? null :value;
});
}
},
_disableDatepicker:function(target) {
var $target = $(target), inst = $.data(target, PROP_NAME);
if ($target.hasClass(this.markerClassName)) {
var nodeName = target.nodeName.toLowerCase();
if ("input" == nodeName) target.disabled = !0, inst.trigger.filter("button").each(function() {
this.disabled = !0;
}).end().filter("img").css({
opacity:"0.5",
cursor:"default"
}); else if ("div" == nodeName || "span" == nodeName) {
var inline = $target.children("." + this._inlineClass);
inline.children().addClass("ui-state-disabled"), inline.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled");
}
this._disabledInputs = $.map(this._disabledInputs, function(value) {
return value == target ? null :value;
}), this._disabledInputs[this._disabledInputs.length] = target;
}
},
_isDisabledDatepicker:function(target) {
if (!target) return !1;
for (var i = 0; i < this._disabledInputs.length; i++) if (this._disabledInputs[i] == target) return !0;
return !1;
},
_getInst:function(target) {
try {
return $.data(target, PROP_NAME);
} catch (err) {
throw "Missing instance data for this datepicker";
}
},
_optionDatepicker:function(target, name, value) {
var inst = this._getInst(target);
if (2 == arguments.length && "string" == typeof name) return "defaults" == name ? $.extend({}, $.datepicker._defaults) :inst ? "all" == name ? $.extend({}, inst.settings) :this._get(inst, name) :null;
var settings = name || {};
if ("string" == typeof name && (settings = {}, settings[name] = value), inst) {
this._curInst == inst && this._hideDatepicker();
var date = this._getDateDatepicker(target, !0), minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max");
extendRemove(inst.settings, settings), null !== minDate && settings.dateFormat !== undefined && settings.minDate === undefined && (inst.settings.minDate = this._formatDate(inst, minDate)), 
null !== maxDate && settings.dateFormat !== undefined && settings.maxDate === undefined && (inst.settings.maxDate = this._formatDate(inst, maxDate)), 
this._attachments($(target), inst), this._autoSize(inst), this._setDate(inst, date), 
this._updateAlternate(inst), this._updateDatepicker(inst);
}
},
_changeDatepicker:function(target, name, value) {
this._optionDatepicker(target, name, value);
},
_refreshDatepicker:function(target) {
var inst = this._getInst(target);
inst && this._updateDatepicker(inst);
},
_setDateDatepicker:function(target, date) {
var inst = this._getInst(target);
inst && (this._setDate(inst, date), this._updateDatepicker(inst), this._updateAlternate(inst));
},
_getDateDatepicker:function(target, noDefault) {
var inst = this._getInst(target);
return inst && !inst.inline && this._setDateFromField(inst, noDefault), inst ? this._getDate(inst) :null;
},
_doKeyDown:function(event) {
var inst = $.datepicker._getInst(event.target), handled = !0, isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
if (inst._keyEvent = !0, $.datepicker._datepickerShowing) switch (event.keyCode) {
case 9:
$.datepicker._hideDatepicker(), handled = !1;
break;

case 13:
var sel = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", inst.dpDiv);
sel[0] && $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
var onSelect = $.datepicker._get(inst, "onSelect");
if (onSelect) {
var dateStr = $.datepicker._formatDate(inst);
onSelect.apply(inst.input ? inst.input[0] :null, [ dateStr, inst ]);
} else $.datepicker._hideDatepicker();
return !1;

case 27:
$.datepicker._hideDatepicker();
break;

case 33:
$.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") :-$.datepicker._get(inst, "stepMonths"), "M");
break;

case 34:
$.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") :+$.datepicker._get(inst, "stepMonths"), "M");
break;

case 35:
(event.ctrlKey || event.metaKey) && $.datepicker._clearDate(event.target), handled = event.ctrlKey || event.metaKey;
break;

case 36:
(event.ctrlKey || event.metaKey) && $.datepicker._gotoToday(event.target), handled = event.ctrlKey || event.metaKey;
break;

case 37:
(event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, isRTL ? 1 :-1, "D"), 
handled = event.ctrlKey || event.metaKey, event.originalEvent.altKey && $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") :-$.datepicker._get(inst, "stepMonths"), "M");
break;

case 38:
(event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, -7, "D"), 
handled = event.ctrlKey || event.metaKey;
break;

case 39:
(event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, isRTL ? -1 :1, "D"), 
handled = event.ctrlKey || event.metaKey, event.originalEvent.altKey && $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") :+$.datepicker._get(inst, "stepMonths"), "M");
break;

case 40:
(event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, 7, "D"), 
handled = event.ctrlKey || event.metaKey;
break;

default:
handled = !1;
} else 36 == event.keyCode && event.ctrlKey ? $.datepicker._showDatepicker(this) :handled = !1;
handled && (event.preventDefault(), event.stopPropagation());
},
_doKeyPress:function(event) {
var inst = $.datepicker._getInst(event.target);
if ($.datepicker._get(inst, "constrainInput")) {
var chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat")), chr = String.fromCharCode(event.charCode == undefined ? event.keyCode :event.charCode);
return event.ctrlKey || event.metaKey || " " > chr || !chars || chars.indexOf(chr) > -1;
}
},
_doKeyUp:function(event) {
var inst = $.datepicker._getInst(event.target);
if (inst.input.val() != inst.lastVal) try {
var date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), inst.input ? inst.input.val() :null, $.datepicker._getFormatConfig(inst));
date && ($.datepicker._setDateFromField(inst), $.datepicker._updateAlternate(inst), 
$.datepicker._updateDatepicker(inst));
} catch (err) {
$.datepicker.log(err);
}
return !0;
},
_showDatepicker:function(input) {
if (input = input.target || input, "input" != input.nodeName.toLowerCase() && (input = $("input", input.parentNode)[0]), 
!$.datepicker._isDisabledDatepicker(input) && $.datepicker._lastInput != input) {
var inst = $.datepicker._getInst(input);
$.datepicker._curInst && $.datepicker._curInst != inst && ($.datepicker._curInst.dpDiv.stop(!0, !0), 
inst && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
var beforeShow = $.datepicker._get(inst, "beforeShow"), beforeShowSettings = beforeShow ? beforeShow.apply(input, [ input, inst ]) :{};
if (beforeShowSettings !== !1) {
extendRemove(inst.settings, beforeShowSettings), inst.lastVal = null, $.datepicker._lastInput = input, 
$.datepicker._setDateFromField(inst), $.datepicker._inDialog && (input.value = ""), 
$.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(input), $.datepicker._pos[1] += input.offsetHeight);
var isFixed = !1;
$(input).parents().each(function() {
return isFixed |= "fixed" == $(this).css("position"), !isFixed;
}), isFixed && $.browser.opera && ($.datepicker._pos[0] -= document.documentElement.scrollLeft, 
$.datepicker._pos[1] -= document.documentElement.scrollTop);
var offset = {
left:$.datepicker._pos[0],
top:$.datepicker._pos[1]
};
if ($.datepicker._pos = null, inst.dpDiv.empty(), inst.dpDiv.css({
position:"absolute",
display:"block",
top:"-1000px"
}), $.datepicker._updateDatepicker(inst), offset = $.datepicker._checkOffset(inst, offset, isFixed), 
inst.dpDiv.css({
position:$.datepicker._inDialog && $.blockUI ? "static" :isFixed ? "fixed" :"absolute",
display:"none",
left:offset.left + "px",
top:offset.top + "px"
}), !inst.inline) {
var showAnim = $.datepicker._get(inst, "showAnim"), duration = $.datepicker._get(inst, "duration"), postProcess = function() {
var cover = inst.dpDiv.find("iframe.ui-datepicker-cover");
if (cover.length) {
var borders = $.datepicker._getBorders(inst.dpDiv);
cover.css({
left:-borders[0],
top:-borders[1],
width:inst.dpDiv.outerWidth(),
height:inst.dpDiv.outerHeight()
});
}
};
inst.dpDiv.zIndex($(input).zIndex() + 1), $.datepicker._datepickerShowing = !0, 
$.effects && $.effects[showAnim] ? inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess) :inst.dpDiv[showAnim || "show"](showAnim ? duration :null, postProcess), 
showAnim && duration || postProcess(), inst.input.is(":visible") && !inst.input.is(":disabled") && inst.input.focus(), 
$.datepicker._curInst = inst;
}
}
}
},
_updateDatepicker:function(inst) {
var self = this;
self.maxRows = 4;
var borders = $.datepicker._getBorders(inst.dpDiv);
instActive = inst, inst.dpDiv.empty().append(this._generateHTML(inst)), this._attachHandlers(inst);
var cover = inst.dpDiv.find("iframe.ui-datepicker-cover");
cover.length && cover.css({
left:-borders[0],
top:-borders[1],
width:inst.dpDiv.outerWidth(),
height:inst.dpDiv.outerHeight()
}), inst.dpDiv.find("." + this._dayOverClass + " a").mouseover();
var numMonths = this._getNumberOfMonths(inst), cols = numMonths[1], width = 17;
if (inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), 
cols > 1 && inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", width * cols + "em"), 
inst.dpDiv[(1 != numMonths[0] || 1 != numMonths[1] ? "add" :"remove") + "Class"]("ui-datepicker-multi"), 
inst.dpDiv[(this._get(inst, "isRTL") ? "add" :"remove") + "Class"]("ui-datepicker-rtl"), 
inst == $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input && inst.input.is(":visible") && !inst.input.is(":disabled") && inst.input[0] != document.activeElement && inst.input.focus(), 
inst.yearshtml) {
var origyearshtml = inst.yearshtml;
setTimeout(function() {
origyearshtml === inst.yearshtml && inst.yearshtml && inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml), 
origyearshtml = inst.yearshtml = null;
}, 0);
}
},
_getBorders:function(elem) {
var convert = function(value) {
return {
thin:1,
medium:2,
thick:3
}[value] || value;
};
return [ parseFloat(convert(elem.css("border-left-width"))), parseFloat(convert(elem.css("border-top-width"))) ];
},
_checkOffset:function(inst, offset, isFixed) {
var dpWidth = inst.dpDiv.outerWidth(), dpHeight = inst.dpDiv.outerHeight(), inputWidth = inst.input ? inst.input.outerWidth() :0, inputHeight = inst.input ? inst.input.outerHeight() :0, viewWidth = document.documentElement.clientWidth + (isFixed ? 0 :$(document).scrollLeft()), viewHeight = document.documentElement.clientHeight + (isFixed ? 0 :$(document).scrollTop());
return offset.left -= this._get(inst, "isRTL") ? dpWidth - inputWidth :0, offset.left -= isFixed && offset.left == inst.input.offset().left ? $(document).scrollLeft() :0, 
offset.top -= isFixed && offset.top == inst.input.offset().top + inputHeight ? $(document).scrollTop() :0, 
offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offset.left + dpWidth - viewWidth) :0), 
offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight) :0), 
offset;
},
_findPos:function(obj) {
for (var inst = this._getInst(obj), isRTL = this._get(inst, "isRTL"); obj && ("hidden" == obj.type || 1 != obj.nodeType || $.expr.filters.hidden(obj)); ) obj = obj[isRTL ? "previousSibling" :"nextSibling"];
var position = $(obj).offset();
return [ position.left, position.top ];
},
_hideDatepicker:function(input) {
var inst = this._curInst;
if (inst && (!input || inst == $.data(input, PROP_NAME)) && this._datepickerShowing) {
var showAnim = this._get(inst, "showAnim"), duration = this._get(inst, "duration"), postProcess = function() {
$.datepicker._tidyDialog(inst);
};
$.effects && $.effects[showAnim] ? inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess) :inst.dpDiv["slideDown" == showAnim ? "slideUp" :"fadeIn" == showAnim ? "fadeOut" :"hide"](showAnim ? duration :null, postProcess), 
showAnim || postProcess(), this._datepickerShowing = !1;
var onClose = this._get(inst, "onClose");
onClose && onClose.apply(inst.input ? inst.input[0] :null, [ inst.input ? inst.input.val() :"", inst ]), 
this._lastInput = null, this._inDialog && (this._dialogInput.css({
position:"absolute",
left:"0",
top:"-100px"
}), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1;
}
},
_tidyDialog:function(inst) {
inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
},
_checkExternalClick:function(event) {
if ($.datepicker._curInst) {
var $target = $(event.target), inst = $.datepicker._getInst($target[0]);
($target[0].id != $.datepicker._mainDivId && 0 == $target.parents("#" + $.datepicker._mainDivId).length && !$target.hasClass($.datepicker.markerClassName) && !$target.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) || $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != inst) && $.datepicker._hideDatepicker();
}
},
_adjustDate:function(id, offset, period) {
var target = $(id), inst = this._getInst(target[0]);
this._isDisabledDatepicker(target[0]) || (this._adjustInstDate(inst, offset + ("M" == period ? this._get(inst, "showCurrentAtPos") :0), period), 
this._updateDatepicker(inst));
},
_gotoToday:function(id) {
var target = $(id), inst = this._getInst(target[0]);
if (this._get(inst, "gotoCurrent") && inst.currentDay) inst.selectedDay = inst.currentDay, 
inst.drawMonth = inst.selectedMonth = inst.currentMonth, inst.drawYear = inst.selectedYear = inst.currentYear; else {
var date = new Date();
inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), 
inst.drawYear = inst.selectedYear = date.getFullYear();
}
this._notifyChange(inst), this._adjustDate(target);
},
_selectMonthYear:function(id, select, period) {
var target = $(id), inst = this._getInst(target[0]);
inst["selected" + ("M" == period ? "Month" :"Year")] = inst["draw" + ("M" == period ? "Month" :"Year")] = parseInt(select.options[select.selectedIndex].value, 10), 
this._notifyChange(inst), this._adjustDate(target);
},
_selectDay:function(id, month, year, td) {
var target = $(id);
if (!$(td).hasClass(this._unselectableClass) && !this._isDisabledDatepicker(target[0])) {
var inst = this._getInst(target[0]);
inst.selectedDay = inst.currentDay = $("a", td).html(), inst.selectedMonth = inst.currentMonth = month, 
inst.selectedYear = inst.currentYear = year, this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
}
},
_clearDate:function(id) {
{
var target = $(id);
this._getInst(target[0]);
}
this._selectDate(target, "");
},
_selectDate:function(id, dateStr) {
var target = $(id), inst = this._getInst(target[0]);
dateStr = null != dateStr ? dateStr :this._formatDate(inst), inst.input && inst.input.val(dateStr), 
this._updateAlternate(inst);
var onSelect = this._get(inst, "onSelect");
onSelect ? onSelect.apply(inst.input ? inst.input[0] :null, [ dateStr, inst ]) :inst.input && inst.input.trigger("change"), 
inst.inline ? this._updateDatepicker(inst) :(this._hideDatepicker(), this._lastInput = inst.input[0], 
"object" != typeof inst.input[0] && inst.input.focus(), this._lastInput = null);
},
_updateAlternate:function(inst) {
var altField = this._get(inst, "altField");
if (altField) {
var altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat"), date = this._getDate(inst), dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
$(altField).each(function() {
$(this).val(dateStr);
});
}
},
noWeekends:function(date) {
var day = date.getDay();
return [ day > 0 && 6 > day, "" ];
},
iso8601Week:function(date) {
var checkDate = new Date(date.getTime());
checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
var time = checkDate.getTime();
return checkDate.setMonth(0), checkDate.setDate(1), Math.floor(Math.round((time - checkDate) / 864e5) / 7) + 1;
},
parseDate:function(format, value, settings) {
if (null == format || null == value) throw "Invalid arguments";
if (value = "object" == typeof value ? value.toString() :value + "", "" == value) return null;
var shortYearCutoff = (settings ? settings.shortYearCutoff :null) || this._defaults.shortYearCutoff;
shortYearCutoff = "string" != typeof shortYearCutoff ? shortYearCutoff :new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10);
for (var dayNamesShort = (settings ? settings.dayNamesShort :null) || this._defaults.dayNamesShort, dayNames = (settings ? settings.dayNames :null) || this._defaults.dayNames, monthNamesShort = (settings ? settings.monthNamesShort :null) || this._defaults.monthNamesShort, monthNames = (settings ? settings.monthNames :null) || this._defaults.monthNames, year = -1, month = -1, day = -1, doy = -1, literal = !1, lookAhead = function(match) {
var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) == match;
return matches && iFormat++, matches;
}, getNumber = function(match) {
var isDoubled = lookAhead(match), size = "@" == match ? 14 :"!" == match ? 20 :"y" == match && isDoubled ? 4 :"o" == match ? 3 :2, digits = new RegExp("^\\d{1," + size + "}"), num = value.substring(iValue).match(digits);
if (!num) throw "Missing number at position " + iValue;
return iValue += num[0].length, parseInt(num[0], 10);
}, getName = function(match, shortNames, longNames) {
var names = $.map(lookAhead(match) ? longNames :shortNames, function(v, k) {
return [ [ k, v ] ];
}).sort(function(a, b) {
return -(a[1].length - b[1].length);
}), index = -1;
if ($.each(names, function(i, pair) {
var name = pair[1];
return value.substr(iValue, name.length).toLowerCase() == name.toLowerCase() ? (index = pair[0], 
iValue += name.length, !1) :void 0;
}), -1 != index) return index + 1;
throw "Unknown name at position " + iValue;
}, checkLiteral = function() {
if (value.charAt(iValue) != format.charAt(iFormat)) throw "Unexpected literal at position " + iValue;
iValue++;
}, iValue = 0, iFormat = 0; iFormat < format.length; iFormat++) if (literal) "'" != format.charAt(iFormat) || lookAhead("'") ? checkLiteral() :literal = !1; else switch (format.charAt(iFormat)) {
case "d":
day = getNumber("d");
break;

case "D":
getName("D", dayNamesShort, dayNames);
break;

case "o":
doy = getNumber("o");
break;

case "m":
month = getNumber("m");
break;

case "M":
month = getName("M", monthNamesShort, monthNames);
break;

case "y":
year = getNumber("y");
break;

case "@":
var date = new Date(getNumber("@"));
year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
break;

case "!":
var date = new Date((getNumber("!") - this._ticksTo1970) / 1e4);
year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
break;

case "'":
lookAhead("'") ? checkLiteral() :literal = !0;
break;

default:
checkLiteral();
}
if (iValue < value.length) throw "Extra/unparsed characters found in date: " + value.substring(iValue);
if (-1 == year ? year = new Date().getFullYear() :100 > year && (year += new Date().getFullYear() - new Date().getFullYear() % 100 + (shortYearCutoff >= year ? 0 :-100)), 
doy > -1) for (month = 1, day = doy; ;) {
var dim = this._getDaysInMonth(year, month - 1);
if (dim >= day) break;
month++, day -= dim;
}
var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) throw "Invalid date";
return date;
},
ATOM:"yy-mm-dd",
COOKIE:"D, dd M yy",
ISO_8601:"yy-mm-dd",
RFC_822:"D, d M y",
RFC_850:"DD, dd-M-y",
RFC_1036:"D, d M y",
RFC_1123:"D, d M yy",
RFC_2822:"D, d M yy",
RSS:"D, d M y",
TICKS:"!",
TIMESTAMP:"@",
W3C:"yy-mm-dd",
_ticksTo1970:24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
formatDate:function(format, date, settings) {
if (!date) return "";
var dayNamesShort = (settings ? settings.dayNamesShort :null) || this._defaults.dayNamesShort, dayNames = (settings ? settings.dayNames :null) || this._defaults.dayNames, monthNamesShort = (settings ? settings.monthNamesShort :null) || this._defaults.monthNamesShort, monthNames = (settings ? settings.monthNames :null) || this._defaults.monthNames, lookAhead = function(match) {
var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) == match;
return matches && iFormat++, matches;
}, formatNumber = function(match, value, len) {
var num = "" + value;
if (lookAhead(match)) for (;num.length < len; ) num = "0" + num;
return num;
}, formatName = function(match, value, shortNames, longNames) {
return lookAhead(match) ? longNames[value] :shortNames[value];
}, output = "", literal = !1;
if (date) for (var iFormat = 0; iFormat < format.length; iFormat++) if (literal) "'" != format.charAt(iFormat) || lookAhead("'") ? output += format.charAt(iFormat) :literal = !1; else switch (format.charAt(iFormat)) {
case "d":
output += formatNumber("d", date.getDate(), 2);
break;

case "D":
output += formatName("D", date.getDay(), dayNamesShort, dayNames);
break;

case "o":
output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 864e5), 3);
break;

case "m":
output += formatNumber("m", date.getMonth() + 1, 2);
break;

case "M":
output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
break;

case "y":
output += lookAhead("y") ? date.getFullYear() :(date.getYear() % 100 < 10 ? "0" :"") + date.getYear() % 100;
break;

case "@":
output += date.getTime();
break;

case "!":
output += 1e4 * date.getTime() + this._ticksTo1970;
break;

case "'":
lookAhead("'") ? output += "'" :literal = !0;
break;

default:
output += format.charAt(iFormat);
}
return output;
},
_possibleChars:function(format) {
for (var chars = "", literal = !1, lookAhead = function(match) {
var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) == match;
return matches && iFormat++, matches;
}, iFormat = 0; iFormat < format.length; iFormat++) if (literal) "'" != format.charAt(iFormat) || lookAhead("'") ? chars += format.charAt(iFormat) :literal = !1; else switch (format.charAt(iFormat)) {
case "d":
case "m":
case "y":
case "@":
chars += "0123456789";
break;

case "D":
case "M":
return null;

case "'":
lookAhead("'") ? chars += "'" :literal = !0;
break;

default:
chars += format.charAt(iFormat);
}
return chars;
},
_get:function(inst, name) {
return inst.settings[name] !== undefined ? inst.settings[name] :this._defaults[name];
},
_setDateFromField:function(inst, noDefault) {
if (inst.input.val() != inst.lastVal) {
var date, defaultDate, dateFormat = this._get(inst, "dateFormat"), dates = inst.lastVal = inst.input ? inst.input.val() :null;
date = defaultDate = this._getDefaultDate(inst);
var settings = this._getFormatConfig(inst);
try {
date = this.parseDate(dateFormat, dates, settings) || defaultDate;
} catch (event) {
this.log(event), dates = noDefault ? "" :dates;
}
inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), 
inst.drawYear = inst.selectedYear = date.getFullYear(), inst.currentDay = dates ? date.getDate() :0, 
inst.currentMonth = dates ? date.getMonth() :0, inst.currentYear = dates ? date.getFullYear() :0, 
this._adjustInstDate(inst);
}
},
_getDefaultDate:function(inst) {
return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date()));
},
_determineDate:function(inst, date, defaultDate) {
var offsetNumeric = function(offset) {
var date = new Date();
return date.setDate(date.getDate() + offset), date;
}, offsetString = function(offset) {
try {
return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst));
} catch (e) {}
for (var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) :null) || new Date(), year = date.getFullYear(), month = date.getMonth(), day = date.getDate(), pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, matches = pattern.exec(offset); matches; ) {
switch (matches[2] || "d") {
case "d":
case "D":
day += parseInt(matches[1], 10);
break;

case "w":
case "W":
day += 7 * parseInt(matches[1], 10);
break;

case "m":
case "M":
month += parseInt(matches[1], 10), day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
break;

case "y":
case "Y":
year += parseInt(matches[1], 10), day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
}
matches = pattern.exec(offset);
}
return new Date(year, month, day);
}, newDate = null == date || "" === date ? defaultDate :"string" == typeof date ? offsetString(date) :"number" == typeof date ? isNaN(date) ? defaultDate :offsetNumeric(date) :new Date(date.getTime());
return newDate = newDate && "Invalid Date" == newDate.toString() ? defaultDate :newDate, 
newDate && (newDate.setHours(0), newDate.setMinutes(0), newDate.setSeconds(0), newDate.setMilliseconds(0)), 
this._daylightSavingAdjust(newDate);
},
_daylightSavingAdjust:function(date) {
return date ? (date.setHours(date.getHours() > 12 ? date.getHours() + 2 :0), date) :null;
},
_setDate:function(inst, date, noChange) {
var clear = !date, origMonth = inst.selectedMonth, origYear = inst.selectedYear, newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
inst.selectedDay = inst.currentDay = newDate.getDate(), inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth(), 
inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear(), origMonth == inst.selectedMonth && origYear == inst.selectedYear || noChange || this._notifyChange(inst), 
this._adjustInstDate(inst), inst.input && inst.input.val(clear ? "" :this._formatDate(inst));
},
_getDate:function(inst) {
var startDate = !inst.currentYear || inst.input && "" == inst.input.val() ? null :this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
return startDate;
},
_attachHandlers:function(inst) {
var stepMonths = this._get(inst, "stepMonths"), id = "#" + inst.id.replace(/\\\\/g, "\\");
inst.dpDiv.find("[data-handler]").map(function() {
var handler = {
prev:function() {
window["DP_jQuery_" + dpuuid].datepicker._adjustDate(id, -stepMonths, "M");
},
next:function() {
window["DP_jQuery_" + dpuuid].datepicker._adjustDate(id, +stepMonths, "M");
},
hide:function() {
window["DP_jQuery_" + dpuuid].datepicker._hideDatepicker();
},
today:function() {
window["DP_jQuery_" + dpuuid].datepicker._gotoToday(id);
},
selectDay:function() {
return window["DP_jQuery_" + dpuuid].datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), 
!1;
},
selectMonth:function() {
return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(id, this, "M"), 
!1;
},
selectYear:function() {
return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(id, this, "Y"), 
!1;
}
};
$(this).bind(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")]);
});
},
_generateHTML:function(inst) {
var today = new Date();
today = this._daylightSavingAdjust(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
var isRTL = this._get(inst, "isRTL"), showButtonPanel = this._get(inst, "showButtonPanel"), hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"), navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"), numMonths = this._getNumberOfMonths(inst), showCurrentAtPos = this._get(inst, "showCurrentAtPos"), stepMonths = this._get(inst, "stepMonths"), isMultiMonth = 1 != numMonths[0] || 1 != numMonths[1], currentDate = this._daylightSavingAdjust(inst.currentDay ? new Date(inst.currentYear, inst.currentMonth, inst.currentDay) :new Date(9999, 9, 9)), minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), drawMonth = inst.drawMonth - showCurrentAtPos, drawYear = inst.drawYear;
if (0 > drawMonth && (drawMonth += 12, drawYear--), maxDate) {
var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[0] * numMonths[1] + 1, maxDate.getDate()));
for (maxDraw = minDate && minDate > maxDraw ? minDate :maxDraw; this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw; ) drawMonth--, 
0 > drawMonth && (drawMonth = 11, drawYear--);
}
inst.drawMonth = drawMonth, inst.drawYear = drawYear;
var prevText = this._get(inst, "prevText");
prevText = navigationAsDateFormat ? this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)) :prevText;
var prev = this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" :"w") + '">' + prevText + "</span></a>" :hideIfNoPrevNext ? "" :'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" :"w") + '">' + prevText + "</span></a>", nextText = this._get(inst, "nextText");
nextText = navigationAsDateFormat ? this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)) :nextText;
var next = this._canAdjustMonth(inst, 1, drawYear, drawMonth) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" :"e") + '">' + nextText + "</span></a>" :hideIfNoPrevNext ? "" :'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" :"e") + '">' + nextText + "</span></a>", currentText = this._get(inst, "currentText"), gotoDate = this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate :today;
currentText = navigationAsDateFormat ? this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)) :currentText;
var controls = inst.inline ? "" :'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(inst, "closeText") + "</button>", buttonPanel = showButtonPanel ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls :"") + (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">' + currentText + "</button>" :"") + (isRTL ? "" :controls) + "</div>" :"", firstDay = parseInt(this._get(inst, "firstDay"), 10);
firstDay = isNaN(firstDay) ? 0 :firstDay;
for (var showWeek = this._get(inst, "showWeek"), dayNames = this._get(inst, "dayNames"), dayNamesMin = (this._get(inst, "dayNamesShort"), 
this._get(inst, "dayNamesMin")), monthNames = this._get(inst, "monthNames"), monthNamesShort = this._get(inst, "monthNamesShort"), beforeShowDay = this._get(inst, "beforeShowDay"), showOtherMonths = this._get(inst, "showOtherMonths"), selectOtherMonths = this._get(inst, "selectOtherMonths"), defaultDate = (this._get(inst, "calculateWeek") || this.iso8601Week, 
this._getDefaultDate(inst)), html = "", row = 0; row < numMonths[0]; row++) {
var group = "";
this.maxRows = 4;
for (var col = 0; col < numMonths[1]; col++) {
var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay)), cornerClass = " ui-corner-all", calender = "";
if (isMultiMonth) {
if (calender += '<div class="ui-datepicker-group', numMonths[1] > 1) switch (col) {
case 0:
calender += " ui-datepicker-group-first", cornerClass = " ui-corner-" + (isRTL ? "right" :"left");
break;

case numMonths[1] - 1:
calender += " ui-datepicker-group-last", cornerClass = " ui-corner-" + (isRTL ? "left" :"right");
break;

default:
calender += " ui-datepicker-group-middle", cornerClass = "";
}
calender += '">';
}
calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' + (/all|left/.test(cornerClass) && 0 == row ? isRTL ? next :prev :"") + (/all|right/.test(cornerClass) && 0 == row ? isRTL ? prev :next :"") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
for (var thead = showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, "weekHeader") + "</th>" :"", dow = 0; 7 > dow; dow++) {
var day = (dow + firstDay) % 7;
thead += "<th" + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' :"") + '><span title="' + dayNames[day] + '">' + dayNamesMin[day] + "</span></th>";
}
calender += thead + "</tr></thead><tbody>";
var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
drawYear == inst.selectedYear && drawMonth == inst.selectedMonth && (inst.selectedDay = Math.min(inst.selectedDay, daysInMonth));
var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7, curRows = Math.ceil((leadDays + daysInMonth) / 7), numRows = isMultiMonth ? this.maxRows > curRows ? this.maxRows :curRows :curRows;
this.maxRows = numRows;
for (var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays)), dRow = 0; numRows > dRow; dRow++) {
calender += "<tr>";
for (var tbody = showWeek ? '<td class="ui-datepicker-week-col">' + this._get(inst, "calculateWeek")(printDate) + "</td>" :"", dow = 0; 7 > dow; dow++) {
var daySettings = beforeShowDay ? beforeShowDay.apply(inst.input ? inst.input[0] :null, [ printDate ]) :[ !0, "" ], otherMonth = printDate.getMonth() != drawMonth, unselectable = otherMonth && !selectOtherMonths || !daySettings[0] || minDate && minDate > printDate || maxDate && printDate > maxDate;
tbody += '<td class="' + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" :"") + (otherMonth ? " ui-datepicker-other-month" :"") + (printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent || defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime() ? " " + this._dayOverClass :"") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" :"") + (otherMonth && !showOtherMonths ? "" :" " + daySettings[1] + (printDate.getTime() == currentDate.getTime() ? " " + this._currentClass :"") + (printDate.getTime() == today.getTime() ? " ui-datepicker-today" :"")) + '"' + (otherMonth && !showOtherMonths || !daySettings[2] ? "" :' title="' + daySettings[2] + '"') + (unselectable ? "" :' data-handler="selectDay" data-event="click" data-month="' + printDate.getMonth() + '" data-year="' + printDate.getFullYear() + '"') + ">" + (otherMonth && !showOtherMonths ? "&#xa0;" :unselectable ? '<span class="ui-state-default">' + printDate.getDate() + "</span>" :'<a class="ui-state-default' + (printDate.getTime() == today.getTime() ? " ui-state-highlight" :"") + (printDate.getTime() == currentDate.getTime() ? " ui-state-active" :"") + (otherMonth ? " ui-priority-secondary" :"") + '" href="#">' + printDate.getDate() + "</a>") + "</td>", 
printDate.setDate(printDate.getDate() + 1), printDate = this._daylightSavingAdjust(printDate);
}
calender += tbody + "</tr>";
}
drawMonth++, drawMonth > 11 && (drawMonth = 0, drawYear++), calender += "</tbody></table>" + (isMultiMonth ? "</div>" + (numMonths[0] > 0 && col == numMonths[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' :"") :""), 
group += calender;
}
html += group;
}
return html += buttonPanel + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' :""), 
inst._keyEvent = !1, html;
},
_generateMonthYearHeader:function(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
var changeMonth = this._get(inst, "changeMonth"), changeYear = this._get(inst, "changeYear"), showMonthAfterYear = this._get(inst, "showMonthAfterYear"), html = '<div class="ui-datepicker-title">', monthHtml = "";
if (secondary || !changeMonth) monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + "</span>"; else {
var inMinYear = minDate && minDate.getFullYear() == drawYear, inMaxYear = maxDate && maxDate.getFullYear() == drawYear;
monthHtml += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
for (var month = 0; 12 > month; month++) (!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth()) && (monthHtml += '<option value="' + month + '"' + (month == drawMonth ? ' selected="selected"' :"") + ">" + monthNamesShort[month] + "</option>");
monthHtml += "</select>";
}
if (showMonthAfterYear || (html += monthHtml + (!secondary && changeMonth && changeYear ? "" :"&#xa0;")), 
!inst.yearshtml) if (inst.yearshtml = "", secondary || !changeYear) html += '<span class="ui-datepicker-year">' + drawYear + "</span>"; else {
var years = this._get(inst, "yearRange").split(":"), thisYear = new Date().getFullYear(), determineYear = function(value) {
var year = value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) :value.match(/[+-].*/) ? thisYear + parseInt(value, 10) :parseInt(value, 10);
return isNaN(year) ? thisYear :year;
}, year = determineYear(years[0]), endYear = Math.max(year, determineYear(years[1] || ""));
for (year = minDate ? Math.max(year, minDate.getFullYear()) :year, endYear = maxDate ? Math.min(endYear, maxDate.getFullYear()) :endYear, 
inst.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">'; endYear >= year; year++) inst.yearshtml += '<option value="' + year + '"' + (year == drawYear ? ' selected="selected"' :"") + ">" + year + "</option>";
inst.yearshtml += "</select>", html += inst.yearshtml, inst.yearshtml = null;
}
return html += this._get(inst, "yearSuffix"), showMonthAfterYear && (html += (!secondary && changeMonth && changeYear ? "" :"&#xa0;") + monthHtml), 
html += "</div>";
},
_adjustInstDate:function(inst, offset, period) {
var year = inst.drawYear + ("Y" == period ? offset :0), month = inst.drawMonth + ("M" == period ? offset :0), day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + ("D" == period ? offset :0), date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), 
inst.drawYear = inst.selectedYear = date.getFullYear(), ("M" == period || "Y" == period) && this._notifyChange(inst);
},
_restrictMinMax:function(inst, date) {
var minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), newDate = minDate && minDate > date ? minDate :date;
return newDate = maxDate && newDate > maxDate ? maxDate :newDate;
},
_notifyChange:function(inst) {
var onChange = this._get(inst, "onChangeMonthYear");
onChange && onChange.apply(inst.input ? inst.input[0] :null, [ inst.selectedYear, inst.selectedMonth + 1, inst ]);
},
_getNumberOfMonths:function(inst) {
var numMonths = this._get(inst, "numberOfMonths");
return null == numMonths ? [ 1, 1 ] :"number" == typeof numMonths ? [ 1, numMonths ] :numMonths;
},
_getMinMaxDate:function(inst, minMax) {
return this._determineDate(inst, this._get(inst, minMax + "Date"), null);
},
_getDaysInMonth:function(year, month) {
return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
},
_getFirstDayOfMonth:function(year, month) {
return new Date(year, month, 1).getDay();
},
_canAdjustMonth:function(inst, offset, curYear, curMonth) {
var numMonths = this._getNumberOfMonths(inst), date = this._daylightSavingAdjust(new Date(curYear, curMonth + (0 > offset ? offset :numMonths[0] * numMonths[1]), 1));
return 0 > offset && date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth())), 
this._isInRange(inst, date);
},
_isInRange:function(inst, date) {
var minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max");
return (!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime());
},
_getFormatConfig:function(inst) {
var shortYearCutoff = this._get(inst, "shortYearCutoff");
return shortYearCutoff = "string" != typeof shortYearCutoff ? shortYearCutoff :new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10), 
{
shortYearCutoff:shortYearCutoff,
dayNamesShort:this._get(inst, "dayNamesShort"),
dayNames:this._get(inst, "dayNames"),
monthNamesShort:this._get(inst, "monthNamesShort"),
monthNames:this._get(inst, "monthNames")
};
},
_formatDate:function(inst, day, month, year) {
day || (inst.currentDay = inst.selectedDay, inst.currentMonth = inst.selectedMonth, 
inst.currentYear = inst.selectedYear);
var date = day ? "object" == typeof day ? day :this._daylightSavingAdjust(new Date(year, month, day)) :this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst));
}
}), $.fn.datepicker = function(options) {
if (!this.length) return this;
$.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv), 
$.datepicker.initialized = !0);
var otherArgs = Array.prototype.slice.call(arguments, 1);
return "string" != typeof options || "isDisabled" != options && "getDate" != options && "widget" != options ? "option" == options && 2 == arguments.length && "string" == typeof arguments[1] ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [ this[0] ].concat(otherArgs)) :this.each(function() {
"string" == typeof options ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [ this ].concat(otherArgs)) :$.datepicker._attachDatepicker(this, options);
}) :$.datepicker["_" + options + "Datepicker"].apply($.datepicker, [ this[0] ].concat(otherArgs));
}, $.datepicker = new Datepicker(), $.datepicker.initialized = !1, $.datepicker.uuid = new Date().getTime(), 
$.datepicker.version = "1.8.23", window["DP_jQuery_" + dpuuid] = $;
}(jQuery), function($, undefined) {
var uiDialogClasses = "ui-dialog ui-widget ui-widget-content ui-corner-all ", sizeRelatedOptions = {
buttons:!0,
height:!0,
maxHeight:!0,
maxWidth:!0,
minHeight:!0,
minWidth:!0,
width:!0
}, resizableRelatedOptions = {
maxHeight:!0,
maxWidth:!0,
minHeight:!0,
minWidth:!0
};
$.widget("ui.dialog", {
options:{
autoOpen:!0,
buttons:{},
closeOnEscape:!0,
closeText:"close",
dialogClass:"",
draggable:!0,
hide:null,
height:"auto",
maxHeight:!1,
maxWidth:!1,
minHeight:150,
minWidth:150,
modal:!1,
position:{
my:"center",
at:"center",
collision:"fit",
using:function(pos) {
var topOffset = $(this).css(pos).offset().top;
0 > topOffset && $(this).css("top", pos.top - topOffset);
}
},
resizable:!0,
show:null,
stack:!0,
title:"",
width:300,
zIndex:1e3
},
_create:function() {
this.originalTitle = this.element.attr("title"), "string" != typeof this.originalTitle && (this.originalTitle = ""), 
this.options.title = this.options.title || this.originalTitle;
{
var self = this, options = self.options, title = options.title || "&#160;", titleId = $.ui.dialog.getTitleId(self.element), uiDialog = (self.uiDialog = $("<div></div>")).appendTo(document.body).hide().addClass(uiDialogClasses + options.dialogClass).css({
zIndex:options.zIndex
}).attr("tabIndex", -1).css("outline", 0).keydown(function(event) {
options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode && event.keyCode === $.ui.keyCode.ESCAPE && (self.close(event), 
event.preventDefault());
}).attr({
role:"dialog",
"aria-labelledby":titleId
}).mousedown(function(event) {
self.moveToTop(!1, event);
}), uiDialogTitlebar = (self.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(uiDialog), 
(self.uiDialogTitlebar = $("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(uiDialog)), uiDialogTitlebarClose = $('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function() {
uiDialogTitlebarClose.addClass("ui-state-hover");
}, function() {
uiDialogTitlebarClose.removeClass("ui-state-hover");
}).focus(function() {
uiDialogTitlebarClose.addClass("ui-state-focus");
}).blur(function() {
uiDialogTitlebarClose.removeClass("ui-state-focus");
}).click(function(event) {
return self.close(event), !1;
}).appendTo(uiDialogTitlebar);
(self.uiDialogTitlebarCloseText = $("<span></span>")).addClass("ui-icon ui-icon-closethick").text(options.closeText).appendTo(uiDialogTitlebarClose), 
$("<span></span>").addClass("ui-dialog-title").attr("id", titleId).html(title).prependTo(uiDialogTitlebar);
}
$.isFunction(options.beforeclose) && !$.isFunction(options.beforeClose) && (options.beforeClose = options.beforeclose), 
uiDialogTitlebar.find("*").add(uiDialogTitlebar).disableSelection(), options.draggable && $.fn.draggable && self._makeDraggable(), 
options.resizable && $.fn.resizable && self._makeResizable(), self._createButtons(options.buttons), 
self._isOpen = !1, $.fn.bgiframe && uiDialog.bgiframe();
},
_init:function() {
this.options.autoOpen && this.open();
},
destroy:function() {
var self = this;
return self.overlay && self.overlay.destroy(), self.uiDialog.hide(), self.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"), 
self.uiDialog.remove(), self.originalTitle && self.element.attr("title", self.originalTitle), 
self;
},
widget:function() {
return this.uiDialog;
},
close:function(event) {
var maxZ, thisZ, self = this;
if (!1 !== self._trigger("beforeClose", event)) return self.overlay && self.overlay.destroy(), 
self.uiDialog.unbind("keypress.ui-dialog"), self._isOpen = !1, self.options.hide ? self.uiDialog.hide(self.options.hide, function() {
self._trigger("close", event);
}) :(self.uiDialog.hide(), self._trigger("close", event)), $.ui.dialog.overlay.resize(), 
self.options.modal && (maxZ = 0, $(".ui-dialog").each(function() {
this !== self.uiDialog[0] && (thisZ = $(this).css("z-index"), isNaN(thisZ) || (maxZ = Math.max(maxZ, thisZ)));
}), $.ui.dialog.maxZ = maxZ), self;
},
isOpen:function() {
return this._isOpen;
},
moveToTop:function(force, event) {
var saveScroll, self = this, options = self.options;
return options.modal && !force || !options.stack && !options.modal ? self._trigger("focus", event) :(options.zIndex > $.ui.dialog.maxZ && ($.ui.dialog.maxZ = options.zIndex), 
self.overlay && ($.ui.dialog.maxZ += 1, self.overlay.$el.css("z-index", $.ui.dialog.overlay.maxZ = $.ui.dialog.maxZ)), 
saveScroll = {
scrollTop:self.element.scrollTop(),
scrollLeft:self.element.scrollLeft()
}, $.ui.dialog.maxZ += 1, self.uiDialog.css("z-index", $.ui.dialog.maxZ), self.element.attr(saveScroll), 
self._trigger("focus", event), self);
},
open:function() {
if (!this._isOpen) {
var self = this, options = self.options, uiDialog = self.uiDialog;
return self.overlay = options.modal ? new $.ui.dialog.overlay(self) :null, self._size(), 
self._position(options.position), uiDialog.show(options.show), self.moveToTop(!0), 
options.modal && uiDialog.bind("keydown.ui-dialog", function(event) {
if (event.keyCode === $.ui.keyCode.TAB) {
var tabbables = $(":tabbable", this), first = tabbables.filter(":first"), last = tabbables.filter(":last");
return event.target !== last[0] || event.shiftKey ? event.target === first[0] && event.shiftKey ? (last.focus(1), 
!1) :void 0 :(first.focus(1), !1);
}
}), $(self.element.find(":tabbable").get().concat(uiDialog.find(".ui-dialog-buttonpane :tabbable").get().concat(uiDialog.get()))).eq(0).focus(), 
self._isOpen = !0, self._trigger("open"), self;
}
},
_createButtons:function(buttons) {
var self = this, hasButtons = !1, uiDialogButtonPane = $("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), uiButtonSet = $("<div></div>").addClass("ui-dialog-buttonset").appendTo(uiDialogButtonPane);
self.uiDialog.find(".ui-dialog-buttonpane").remove(), "object" == typeof buttons && null !== buttons && $.each(buttons, function() {
return !(hasButtons = !0);
}), hasButtons && ($.each(buttons, function(name, props) {
props = $.isFunction(props) ? {
click:props,
text:name
} :props;
var button = $('<button type="button"></button>').click(function() {
props.click.apply(self.element[0], arguments);
}).appendTo(uiButtonSet);
$.each(props, function(key, value) {
"click" !== key && (key in button ? button[key](value) :button.attr(key, value));
}), $.fn.button && button.button();
}), uiDialogButtonPane.appendTo(self.uiDialog));
},
_makeDraggable:function() {
function filteredUi(ui) {
return {
position:ui.position,
offset:ui.offset
};
}
var heightBeforeDrag, self = this, options = self.options, doc = $(document);
self.uiDialog.draggable({
cancel:".ui-dialog-content, .ui-dialog-titlebar-close",
handle:".ui-dialog-titlebar",
containment:"document",
start:function(event, ui) {
heightBeforeDrag = "auto" === options.height ? "auto" :$(this).height(), $(this).height($(this).height()).addClass("ui-dialog-dragging"), 
self._trigger("dragStart", event, filteredUi(ui));
},
drag:function(event, ui) {
self._trigger("drag", event, filteredUi(ui));
},
stop:function(event, ui) {
options.position = [ ui.position.left - doc.scrollLeft(), ui.position.top - doc.scrollTop() ], 
$(this).removeClass("ui-dialog-dragging").height(heightBeforeDrag), self._trigger("dragStop", event, filteredUi(ui)), 
$.ui.dialog.overlay.resize();
}
});
},
_makeResizable:function(handles) {
function filteredUi(ui) {
return {
originalPosition:ui.originalPosition,
originalSize:ui.originalSize,
position:ui.position,
size:ui.size
};
}
handles = handles === undefined ? this.options.resizable :handles;
var self = this, options = self.options, position = self.uiDialog.css("position"), resizeHandles = "string" == typeof handles ? handles :"n,e,s,w,se,sw,ne,nw";
self.uiDialog.resizable({
cancel:".ui-dialog-content",
containment:"document",
alsoResize:self.element,
maxWidth:options.maxWidth,
maxHeight:options.maxHeight,
minWidth:options.minWidth,
minHeight:self._minHeight(),
handles:resizeHandles,
start:function(event, ui) {
$(this).addClass("ui-dialog-resizing"), self._trigger("resizeStart", event, filteredUi(ui));
},
resize:function(event, ui) {
self._trigger("resize", event, filteredUi(ui));
},
stop:function(event, ui) {
$(this).removeClass("ui-dialog-resizing"), options.height = $(this).height(), options.width = $(this).width(), 
self._trigger("resizeStop", event, filteredUi(ui)), $.ui.dialog.overlay.resize();
}
}).css("position", position).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se");
},
_minHeight:function() {
var options = this.options;
return "auto" === options.height ? options.minHeight :Math.min(options.minHeight, options.height);
},
_position:function(position) {
var isVisible, myAt = [], offset = [ 0, 0 ];
position ? (("string" == typeof position || "object" == typeof position && "0" in position) && (myAt = position.split ? position.split(" ") :[ position[0], position[1] ], 
1 === myAt.length && (myAt[1] = myAt[0]), $.each([ "left", "top" ], function(i, offsetPosition) {
+myAt[i] === myAt[i] && (offset[i] = myAt[i], myAt[i] = offsetPosition);
}), position = {
my:myAt.join(" "),
at:myAt.join(" "),
offset:offset.join(" ")
}), position = $.extend({}, $.ui.dialog.prototype.options.position, position)) :position = $.ui.dialog.prototype.options.position, 
isVisible = this.uiDialog.is(":visible"), isVisible || this.uiDialog.show(), this.uiDialog.css({
top:0,
left:0
}).position($.extend({
of:window
}, position)), isVisible || this.uiDialog.hide();
},
_setOptions:function(options) {
var self = this, resizableOptions = {}, resize = !1;
$.each(options, function(key, value) {
self._setOption(key, value), key in sizeRelatedOptions && (resize = !0), key in resizableRelatedOptions && (resizableOptions[key] = value);
}), resize && this._size(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", resizableOptions);
},
_setOption:function(key, value) {
var self = this, uiDialog = self.uiDialog;
switch (key) {
case "beforeclose":
key = "beforeClose";
break;

case "buttons":
self._createButtons(value);
break;

case "closeText":
self.uiDialogTitlebarCloseText.text("" + value);
break;

case "dialogClass":
uiDialog.removeClass(self.options.dialogClass).addClass(uiDialogClasses + value);
break;

case "disabled":
value ? uiDialog.addClass("ui-dialog-disabled") :uiDialog.removeClass("ui-dialog-disabled");
break;

case "draggable":
var isDraggable = uiDialog.is(":data(draggable)");
isDraggable && !value && uiDialog.draggable("destroy"), !isDraggable && value && self._makeDraggable();
break;

case "position":
self._position(value);
break;

case "resizable":
var isResizable = uiDialog.is(":data(resizable)");
isResizable && !value && uiDialog.resizable("destroy"), isResizable && "string" == typeof value && uiDialog.resizable("option", "handles", value), 
isResizable || value === !1 || self._makeResizable(value);
break;

case "title":
$(".ui-dialog-title", self.uiDialogTitlebar).html("" + (value || "&#160;"));
}
$.Widget.prototype._setOption.apply(self, arguments);
},
_size:function() {
var nonContentHeight, minContentHeight, options = this.options, isVisible = this.uiDialog.is(":visible");
if (this.element.show().css({
width:"auto",
minHeight:0,
height:0
}), options.minWidth > options.width && (options.width = options.minWidth), nonContentHeight = this.uiDialog.css({
height:"auto",
width:options.width
}).height(), minContentHeight = Math.max(0, options.minHeight - nonContentHeight), 
"auto" === options.height) if ($.support.minHeight) this.element.css({
minHeight:minContentHeight,
height:"auto"
}); else {
this.uiDialog.show();
var autoHeight = this.element.css("height", "auto").height();
isVisible || this.uiDialog.hide(), this.element.height(Math.max(autoHeight, minContentHeight));
} else this.element.height(Math.max(options.height - nonContentHeight, 0));
this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight());
}
}), $.extend($.ui.dialog, {
version:"1.8.23",
uuid:0,
maxZ:0,
getTitleId:function($el) {
var id = $el.attr("id");
return id || (this.uuid += 1, id = this.uuid), "ui-dialog-title-" + id;
},
overlay:function(dialog) {
this.$el = $.ui.dialog.overlay.create(dialog);
}
}), $.extend($.ui.dialog.overlay, {
instances:[],
oldInstances:[],
maxZ:0,
events:$.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function(event) {
return event + ".dialog-overlay";
}).join(" "),
create:function(dialog) {
0 === this.instances.length && (setTimeout(function() {
$.ui.dialog.overlay.instances.length && $(document).bind($.ui.dialog.overlay.events, function(event) {
return $(event.target).zIndex() < $.ui.dialog.overlay.maxZ ? !1 :void 0;
});
}, 1), $(document).bind("keydown.dialog-overlay", function(event) {
dialog.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode && event.keyCode === $.ui.keyCode.ESCAPE && (dialog.close(event), 
event.preventDefault());
}), $(window).bind("resize.dialog-overlay", $.ui.dialog.overlay.resize));
var $el = (this.oldInstances.pop() || $("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
width:this.width(),
height:this.height()
});
return $.fn.bgiframe && $el.bgiframe(), this.instances.push($el), $el;
},
destroy:function($el) {
var indexOf = $.inArray($el, this.instances);
-1 != indexOf && this.oldInstances.push(this.instances.splice(indexOf, 1)[0]), 0 === this.instances.length && $([ document, window ]).unbind(".dialog-overlay"), 
$el.remove();
var maxZ = 0;
$.each(this.instances, function() {
maxZ = Math.max(maxZ, this.css("z-index"));
}), this.maxZ = maxZ;
},
height:function() {
var scrollHeight, offsetHeight;
return $.browser.msie && $.browser.version < 7 ? (scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), 
offsetHeight = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), 
offsetHeight > scrollHeight ? $(window).height() + "px" :scrollHeight + "px") :$(document).height() + "px";
},
width:function() {
var scrollWidth, offsetWidth;
return $.browser.msie ? (scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), 
offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), 
offsetWidth > scrollWidth ? $(window).width() + "px" :scrollWidth + "px") :$(document).width() + "px";
},
resize:function() {
var $overlays = $([]);
$.each($.ui.dialog.overlay.instances, function() {
$overlays = $overlays.add(this);
}), $overlays.css({
width:0,
height:0
}).css({
width:$.ui.dialog.overlay.width(),
height:$.ui.dialog.overlay.height()
});
}
}), $.extend($.ui.dialog.overlay.prototype, {
destroy:function() {
$.ui.dialog.overlay.destroy(this.$el);
}
});
}(jQuery), function($) {
$.ui = $.ui || {};
var horizontalPositions = /left|center|right/, verticalPositions = /top|center|bottom/, center = "center", support = {}, _position = $.fn.position, _offset = $.fn.offset;
$.fn.position = function(options) {
if (!options || !options.of) return _position.apply(this, arguments);
options = $.extend({}, options);
var targetWidth, targetHeight, basePosition, target = $(options.of), targetElem = target[0], collision = (options.collision || "flip").split(" "), offset = options.offset ? options.offset.split(" ") :[ 0, 0 ];
return 9 === targetElem.nodeType ? (targetWidth = target.width(), targetHeight = target.height(), 
basePosition = {
top:0,
left:0
}) :targetElem.setTimeout ? (targetWidth = target.width(), targetHeight = target.height(), 
basePosition = {
top:target.scrollTop(),
left:target.scrollLeft()
}) :targetElem.preventDefault ? (options.at = "left top", targetWidth = targetHeight = 0, 
basePosition = {
top:options.of.pageY,
left:options.of.pageX
}) :(targetWidth = target.outerWidth(), targetHeight = target.outerHeight(), basePosition = target.offset()), 
$.each([ "my", "at" ], function() {
var pos = (options[this] || "").split(" ");
1 === pos.length && (pos = horizontalPositions.test(pos[0]) ? pos.concat([ center ]) :verticalPositions.test(pos[0]) ? [ center ].concat(pos) :[ center, center ]), 
pos[0] = horizontalPositions.test(pos[0]) ? pos[0] :center, pos[1] = verticalPositions.test(pos[1]) ? pos[1] :center, 
options[this] = pos;
}), 1 === collision.length && (collision[1] = collision[0]), offset[0] = parseInt(offset[0], 10) || 0, 
1 === offset.length && (offset[1] = offset[0]), offset[1] = parseInt(offset[1], 10) || 0, 
"right" === options.at[0] ? basePosition.left += targetWidth :options.at[0] === center && (basePosition.left += targetWidth / 2), 
"bottom" === options.at[1] ? basePosition.top += targetHeight :options.at[1] === center && (basePosition.top += targetHeight / 2), 
basePosition.left += offset[0], basePosition.top += offset[1], this.each(function() {
var collisionPosition, elem = $(this), elemWidth = elem.outerWidth(), elemHeight = elem.outerHeight(), marginLeft = parseInt($.curCSS(this, "marginLeft", !0)) || 0, marginTop = parseInt($.curCSS(this, "marginTop", !0)) || 0, collisionWidth = elemWidth + marginLeft + (parseInt($.curCSS(this, "marginRight", !0)) || 0), collisionHeight = elemHeight + marginTop + (parseInt($.curCSS(this, "marginBottom", !0)) || 0), position = $.extend({}, basePosition);
"right" === options.my[0] ? position.left -= elemWidth :options.my[0] === center && (position.left -= elemWidth / 2), 
"bottom" === options.my[1] ? position.top -= elemHeight :options.my[1] === center && (position.top -= elemHeight / 2), 
support.fractions || (position.left = Math.round(position.left), position.top = Math.round(position.top)), 
collisionPosition = {
left:position.left - marginLeft,
top:position.top - marginTop
}, $.each([ "left", "top" ], function(i, dir) {
$.ui.position[collision[i]] && $.ui.position[collision[i]][dir](position, {
targetWidth:targetWidth,
targetHeight:targetHeight,
elemWidth:elemWidth,
elemHeight:elemHeight,
collisionPosition:collisionPosition,
collisionWidth:collisionWidth,
collisionHeight:collisionHeight,
offset:offset,
my:options.my,
at:options.at
});
}), $.fn.bgiframe && elem.bgiframe(), elem.offset($.extend(position, {
using:options.using
}));
});
}, $.ui.position = {
fit:{
left:function(position, data) {
var win = $(window), over = data.collisionPosition.left + data.collisionWidth - win.width() - win.scrollLeft();
position.left = over > 0 ? position.left - over :Math.max(position.left - data.collisionPosition.left, position.left);
},
top:function(position, data) {
var win = $(window), over = data.collisionPosition.top + data.collisionHeight - win.height() - win.scrollTop();
position.top = over > 0 ? position.top - over :Math.max(position.top - data.collisionPosition.top, position.top);
}
},
flip:{
left:function(position, data) {
if (data.at[0] !== center) {
var win = $(window), over = data.collisionPosition.left + data.collisionWidth - win.width() - win.scrollLeft(), myOffset = "left" === data.my[0] ? -data.elemWidth :"right" === data.my[0] ? data.elemWidth :0, atOffset = "left" === data.at[0] ? data.targetWidth :-data.targetWidth, offset = -2 * data.offset[0];
position.left += data.collisionPosition.left < 0 ? myOffset + atOffset + offset :over > 0 ? myOffset + atOffset + offset :0;
}
},
top:function(position, data) {
if (data.at[1] !== center) {
var win = $(window), over = data.collisionPosition.top + data.collisionHeight - win.height() - win.scrollTop(), myOffset = "top" === data.my[1] ? -data.elemHeight :"bottom" === data.my[1] ? data.elemHeight :0, atOffset = "top" === data.at[1] ? data.targetHeight :-data.targetHeight, offset = -2 * data.offset[1];
position.top += data.collisionPosition.top < 0 ? myOffset + atOffset + offset :over > 0 ? myOffset + atOffset + offset :0;
}
}
}
}, $.offset.setOffset || ($.offset.setOffset = function(elem, options) {
/static/.test($.curCSS(elem, "position")) && (elem.style.position = "relative");
var curElem = $(elem), curOffset = curElem.offset(), curTop = parseInt($.curCSS(elem, "top", !0), 10) || 0, curLeft = parseInt($.curCSS(elem, "left", !0), 10) || 0, props = {
top:options.top - curOffset.top + curTop,
left:options.left - curOffset.left + curLeft
};
"using" in options ? options.using.call(elem, props) :curElem.css(props);
}, $.fn.offset = function(options) {
var elem = this[0];
return elem && elem.ownerDocument ? options ? $.isFunction(options) ? this.each(function(i) {
$(this).offset(options.call(this, i, $(this).offset()));
}) :this.each(function() {
$.offset.setOffset(this, options);
}) :_offset.call(this) :null;
}), $.curCSS || ($.curCSS = $.css), function() {
var testElement, testElementParent, testElementStyle, offset, offsetTotal, body = document.getElementsByTagName("body")[0], div = document.createElement("div");
testElement = document.createElement(body ? "div" :"body"), testElementStyle = {
visibility:"hidden",
width:0,
height:0,
border:0,
margin:0,
background:"none"
}, body && $.extend(testElementStyle, {
position:"absolute",
left:"-1000px",
top:"-1000px"
});
for (var i in testElementStyle) testElement.style[i] = testElementStyle[i];
testElement.appendChild(div), testElementParent = body || document.documentElement, 
testElementParent.insertBefore(testElement, testElementParent.firstChild), div.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;", 
offset = $(div).offset(function(_, offset) {
return offset;
}).offset(), testElement.innerHTML = "", testElementParent.removeChild(testElement), 
offsetTotal = offset.top + offset.left + (body ? 2e3 :0), support.fractions = offsetTotal > 21 && 22 > offsetTotal;
}();
}(jQuery), function($, undefined) {
$.widget("ui.progressbar", {
options:{
value:0,
max:100
},
min:0,
_create:function() {
this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
role:"progressbar",
"aria-valuemin":this.min,
"aria-valuemax":this.options.max,
"aria-valuenow":this._value()
}), this.valueDiv = $("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), 
this.oldValue = this._value(), this._refreshValue();
},
destroy:function() {
this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), 
this.valueDiv.remove(), $.Widget.prototype.destroy.apply(this, arguments);
},
value:function(newValue) {
return newValue === undefined ? this._value() :(this._setOption("value", newValue), 
this);
},
_setOption:function(key, value) {
"value" === key && (this.options.value = value, this._refreshValue(), this._value() === this.options.max && this._trigger("complete")), 
$.Widget.prototype._setOption.apply(this, arguments);
},
_value:function() {
var val = this.options.value;
return "number" != typeof val && (val = 0), Math.min(this.options.max, Math.max(this.min, val));
},
_percentage:function() {
return 100 * this._value() / this.options.max;
},
_refreshValue:function() {
var value = this.value(), percentage = this._percentage();
this.oldValue !== value && (this.oldValue = value, this._trigger("change")), this.valueDiv.toggle(value > this.min).toggleClass("ui-corner-right", value === this.options.max).width(percentage.toFixed(0) + "%"), 
this.element.attr("aria-valuenow", value);
}
}), $.extend($.ui.progressbar, {
version:"1.8.23"
});
}(jQuery), function($) {
var numPages = 5;
$.widget("ui.slider", $.ui.mouse, {
widgetEventPrefix:"slide",
options:{
animate:!1,
distance:0,
max:100,
min:0,
orientation:"horizontal",
range:!1,
step:1,
value:0,
values:null
},
_create:function() {
var self = this, o = this.options, existingHandles = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), handle = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>", handleCount = o.values && o.values.length || 1, handles = [];
this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, 
this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all" + (o.disabled ? " ui-slider-disabled ui-disabled" :"")), 
this.range = $([]), o.range && (o.range === !0 && (o.values || (o.values = [ this._valueMin(), this._valueMin() ]), 
o.values.length && 2 !== o.values.length && (o.values = [ o.values[0], o.values[0] ])), 
this.range = $("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + ("min" === o.range || "max" === o.range ? " ui-slider-range-" + o.range :"")));
for (var i = existingHandles.length; handleCount > i; i += 1) handles.push(handle);
this.handles = existingHandles.add($(handles.join("")).appendTo(self.element)), 
this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function(event) {
event.preventDefault();
}).hover(function() {
o.disabled || $(this).addClass("ui-state-hover");
}, function() {
$(this).removeClass("ui-state-hover");
}).focus(function() {
o.disabled ? $(this).blur() :($(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), 
$(this).addClass("ui-state-focus"));
}).blur(function() {
$(this).removeClass("ui-state-focus");
}), this.handles.each(function(i) {
$(this).data("index.ui-slider-handle", i);
}), this.handles.keydown(function(event) {
var allowed, curVal, newVal, step, index = $(this).data("index.ui-slider-handle");
if (!self.options.disabled) {
switch (event.keyCode) {
case $.ui.keyCode.HOME:
case $.ui.keyCode.END:
case $.ui.keyCode.PAGE_UP:
case $.ui.keyCode.PAGE_DOWN:
case $.ui.keyCode.UP:
case $.ui.keyCode.RIGHT:
case $.ui.keyCode.DOWN:
case $.ui.keyCode.LEFT:
if (event.preventDefault(), !self._keySliding && (self._keySliding = !0, $(this).addClass("ui-state-active"), 
allowed = self._start(event, index), allowed === !1)) return;
}
switch (step = self.options.step, curVal = newVal = self.options.values && self.options.values.length ? self.values(index) :self.value(), 
event.keyCode) {
case $.ui.keyCode.HOME:
newVal = self._valueMin();
break;

case $.ui.keyCode.END:
newVal = self._valueMax();
break;

case $.ui.keyCode.PAGE_UP:
newVal = self._trimAlignValue(curVal + (self._valueMax() - self._valueMin()) / numPages);
break;

case $.ui.keyCode.PAGE_DOWN:
newVal = self._trimAlignValue(curVal - (self._valueMax() - self._valueMin()) / numPages);
break;

case $.ui.keyCode.UP:
case $.ui.keyCode.RIGHT:
if (curVal === self._valueMax()) return;
newVal = self._trimAlignValue(curVal + step);
break;

case $.ui.keyCode.DOWN:
case $.ui.keyCode.LEFT:
if (curVal === self._valueMin()) return;
newVal = self._trimAlignValue(curVal - step);
}
self._slide(event, index, newVal);
}
}).keyup(function(event) {
var index = $(this).data("index.ui-slider-handle");
self._keySliding && (self._keySliding = !1, self._stop(event, index), self._change(event, index), 
$(this).removeClass("ui-state-active"));
}), this._refreshValue(), this._animateOff = !1;
},
destroy:function() {
return this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"), 
this._mouseDestroy(), this;
},
_mouseCapture:function(event) {
var position, normValue, distance, closestHandle, self, index, allowed, offset, mouseOverHandle, o = this.options;
return o.disabled ? !1 :(this.elementSize = {
width:this.element.outerWidth(),
height:this.element.outerHeight()
}, this.elementOffset = this.element.offset(), position = {
x:event.pageX,
y:event.pageY
}, normValue = this._normValueFromMouse(position), distance = this._valueMax() - this._valueMin() + 1, 
self = this, this.handles.each(function(i) {
var thisDistance = Math.abs(normValue - self.values(i));
distance > thisDistance && (distance = thisDistance, closestHandle = $(this), index = i);
}), o.range === !0 && this.values(1) === o.min && (index += 1, closestHandle = $(this.handles[index])), 
allowed = this._start(event, index), allowed === !1 ? !1 :(this._mouseSliding = !0, 
self._handleIndex = index, closestHandle.addClass("ui-state-active").focus(), offset = closestHandle.offset(), 
mouseOverHandle = !$(event.target).parents().andSelf().is(".ui-slider-handle"), 
this._clickOffset = mouseOverHandle ? {
left:0,
top:0
} :{
left:event.pageX - offset.left - closestHandle.width() / 2,
top:event.pageY - offset.top - closestHandle.height() / 2 - (parseInt(closestHandle.css("borderTopWidth"), 10) || 0) - (parseInt(closestHandle.css("borderBottomWidth"), 10) || 0) + (parseInt(closestHandle.css("marginTop"), 10) || 0)
}, this.handles.hasClass("ui-state-hover") || this._slide(event, index, normValue), 
this._animateOff = !0, !0));
},
_mouseStart:function() {
return !0;
},
_mouseDrag:function(event) {
var position = {
x:event.pageX,
y:event.pageY
}, normValue = this._normValueFromMouse(position);
return this._slide(event, this._handleIndex, normValue), !1;
},
_mouseStop:function(event) {
return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(event, this._handleIndex), 
this._change(event, this._handleIndex), this._handleIndex = null, this._clickOffset = null, 
this._animateOff = !1, !1;
},
_detectOrientation:function() {
this.orientation = "vertical" === this.options.orientation ? "vertical" :"horizontal";
},
_normValueFromMouse:function(position) {
var pixelTotal, pixelMouse, percentMouse, valueTotal, valueMouse;
return "horizontal" === this.orientation ? (pixelTotal = this.elementSize.width, 
pixelMouse = position.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left :0)) :(pixelTotal = this.elementSize.height, 
pixelMouse = position.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top :0)), 
percentMouse = pixelMouse / pixelTotal, percentMouse > 1 && (percentMouse = 1), 
0 > percentMouse && (percentMouse = 0), "vertical" === this.orientation && (percentMouse = 1 - percentMouse), 
valueTotal = this._valueMax() - this._valueMin(), valueMouse = this._valueMin() + percentMouse * valueTotal, 
this._trimAlignValue(valueMouse);
},
_start:function(event, index) {
var uiHash = {
handle:this.handles[index],
value:this.value()
};
return this.options.values && this.options.values.length && (uiHash.value = this.values(index), 
uiHash.values = this.values()), this._trigger("start", event, uiHash);
},
_slide:function(event, index, newVal) {
var otherVal, newValues, allowed;
this.options.values && this.options.values.length ? (otherVal = this.values(index ? 0 :1), 
2 === this.options.values.length && this.options.range === !0 && (0 === index && newVal > otherVal || 1 === index && otherVal > newVal) && (newVal = otherVal), 
newVal !== this.values(index) && (newValues = this.values(), newValues[index] = newVal, 
allowed = this._trigger("slide", event, {
handle:this.handles[index],
value:newVal,
values:newValues
}), otherVal = this.values(index ? 0 :1), allowed !== !1 && this.values(index, newVal, !0))) :newVal !== this.value() && (allowed = this._trigger("slide", event, {
handle:this.handles[index],
value:newVal
}), allowed !== !1 && this.value(newVal));
},
_stop:function(event, index) {
var uiHash = {
handle:this.handles[index],
value:this.value()
};
this.options.values && this.options.values.length && (uiHash.value = this.values(index), 
uiHash.values = this.values()), this._trigger("stop", event, uiHash);
},
_change:function(event, index) {
if (!this._keySliding && !this._mouseSliding) {
var uiHash = {
handle:this.handles[index],
value:this.value()
};
this.options.values && this.options.values.length && (uiHash.value = this.values(index), 
uiHash.values = this.values()), this._trigger("change", event, uiHash);
}
},
value:function(newValue) {
return arguments.length ? (this.options.value = this._trimAlignValue(newValue), 
this._refreshValue(), this._change(null, 0), void 0) :this._value();
},
values:function(index, newValue) {
var vals, newValues, i;
if (arguments.length > 1) return this.options.values[index] = this._trimAlignValue(newValue), 
this._refreshValue(), this._change(null, index), void 0;
if (!arguments.length) return this._values();
if (!$.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(index) :this.value();
for (vals = this.options.values, newValues = arguments[0], i = 0; i < vals.length; i += 1) vals[i] = this._trimAlignValue(newValues[i]), 
this._change(null, i);
this._refreshValue();
},
_setOption:function(key, value) {
var i, valsLength = 0;
switch ($.isArray(this.options.values) && (valsLength = this.options.values.length), 
$.Widget.prototype._setOption.apply(this, arguments), key) {
case "disabled":
value ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), 
this.handles.propAttr("disabled", !0), this.element.addClass("ui-disabled")) :(this.handles.propAttr("disabled", !1), 
this.element.removeClass("ui-disabled"));
break;

case "orientation":
this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), 
this._refreshValue();
break;

case "value":
this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
break;

case "values":
for (this._animateOff = !0, this._refreshValue(), i = 0; valsLength > i; i += 1) this._change(null, i);
this._animateOff = !1;
}
},
_value:function() {
var val = this.options.value;
return val = this._trimAlignValue(val);
},
_values:function(index) {
var val, vals, i;
if (arguments.length) return val = this.options.values[index], val = this._trimAlignValue(val);
for (vals = this.options.values.slice(), i = 0; i < vals.length; i += 1) vals[i] = this._trimAlignValue(vals[i]);
return vals;
},
_trimAlignValue:function(val) {
if (val <= this._valueMin()) return this._valueMin();
if (val >= this._valueMax()) return this._valueMax();
var step = this.options.step > 0 ? this.options.step :1, valModStep = (val - this._valueMin()) % step, alignValue = val - valModStep;
return 2 * Math.abs(valModStep) >= step && (alignValue += valModStep > 0 ? step :-step), 
parseFloat(alignValue.toFixed(5));
},
_valueMin:function() {
return this.options.min;
},
_valueMax:function() {
return this.options.max;
},
_refreshValue:function() {
var valPercent, lastValPercent, value, valueMin, valueMax, oRange = this.options.range, o = this.options, self = this, animate = this._animateOff ? !1 :o.animate, _set = {};
this.options.values && this.options.values.length ? this.handles.each(function(i) {
valPercent = (self.values(i) - self._valueMin()) / (self._valueMax() - self._valueMin()) * 100, 
_set["horizontal" === self.orientation ? "left" :"bottom"] = valPercent + "%", $(this).stop(1, 1)[animate ? "animate" :"css"](_set, o.animate), 
self.options.range === !0 && ("horizontal" === self.orientation ? (0 === i && self.range.stop(1, 1)[animate ? "animate" :"css"]({
left:valPercent + "%"
}, o.animate), 1 === i && self.range[animate ? "animate" :"css"]({
width:valPercent - lastValPercent + "%"
}, {
queue:!1,
duration:o.animate
})) :(0 === i && self.range.stop(1, 1)[animate ? "animate" :"css"]({
bottom:valPercent + "%"
}, o.animate), 1 === i && self.range[animate ? "animate" :"css"]({
height:valPercent - lastValPercent + "%"
}, {
queue:!1,
duration:o.animate
}))), lastValPercent = valPercent;
}) :(value = this.value(), valueMin = this._valueMin(), valueMax = this._valueMax(), 
valPercent = valueMax !== valueMin ? (value - valueMin) / (valueMax - valueMin) * 100 :0, 
_set["horizontal" === self.orientation ? "left" :"bottom"] = valPercent + "%", this.handle.stop(1, 1)[animate ? "animate" :"css"](_set, o.animate), 
"min" === oRange && "horizontal" === this.orientation && this.range.stop(1, 1)[animate ? "animate" :"css"]({
width:valPercent + "%"
}, o.animate), "max" === oRange && "horizontal" === this.orientation && this.range[animate ? "animate" :"css"]({
width:100 - valPercent + "%"
}, {
queue:!1,
duration:o.animate
}), "min" === oRange && "vertical" === this.orientation && this.range.stop(1, 1)[animate ? "animate" :"css"]({
height:valPercent + "%"
}, o.animate), "max" === oRange && "vertical" === this.orientation && this.range[animate ? "animate" :"css"]({
height:100 - valPercent + "%"
}, {
queue:!1,
duration:o.animate
}));
}
}), $.extend($.ui.slider, {
version:"1.8.23"
});
}(jQuery), function($, undefined) {
function getNextTabId() {
return ++tabId;
}
function getNextListId() {
return ++listId;
}
var tabId = 0, listId = 0;
$.widget("ui.tabs", {
options:{
add:null,
ajaxOptions:null,
cache:!1,
cookie:null,
collapsible:!1,
disable:null,
disabled:[],
enable:null,
event:"click",
fx:null,
idPrefix:"ui-tabs-",
load:null,
panelTemplate:"<div></div>",
remove:null,
select:null,
show:null,
spinner:"<em>Loading&#8230;</em>",
tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"
},
_create:function() {
this._tabify(!0);
},
_setOption:function(key, value) {
if ("selected" == key) {
if (this.options.collapsible && value == this.options.selected) return;
this.select(value);
} else this.options[key] = value, this._tabify();
},
_tabId:function(a) {
return a.title && a.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + getNextTabId();
},
_sanitizeSelector:function(hash) {
return hash.replace(/:/g, "\\:");
},
_cookie:function() {
var cookie = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + getNextListId());
return $.cookie.apply(null, [ cookie ].concat($.makeArray(arguments)));
},
_ui:function(tab, panel) {
return {
tab:tab,
panel:panel,
index:this.anchors.index(tab)
};
},
_cleanup:function() {
this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function() {
var el = $(this);
el.html(el.data("label.tabs")).removeData("label.tabs");
});
},
_tabify:function(init) {
function resetStyle($el, fx) {
$el.css("display", ""), !$.support.opacity && fx.opacity && $el[0].style.removeAttribute("filter");
}
var self = this, o = this.options, fragmentId = /^#.+/;
this.list = this.element.find("ol,ul").eq(0), this.lis = $(" > li:has(a[href])", this.list), 
this.anchors = this.lis.map(function() {
return $("a", this)[0];
}), this.panels = $([]), this.anchors.each(function(i, a) {
var baseEl, href = $(a).attr("href"), hrefBase = href.split("#")[0];
if (hrefBase && (hrefBase === location.toString().split("#")[0] || (baseEl = $("base")[0]) && hrefBase === baseEl.href) && (href = a.hash, 
a.href = href), fragmentId.test(href)) self.panels = self.panels.add(self.element.find(self._sanitizeSelector(href))); else if (href && "#" !== href) {
$.data(a, "href.tabs", href), $.data(a, "load.tabs", href.replace(/#.*$/, ""));
var id = self._tabId(a);
a.href = "#" + id;
var $panel = self.element.find("#" + id);
$panel.length || ($panel = $(o.panelTemplate).attr("id", id).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(self.panels[i - 1] || self.list), 
$panel.data("destroy.tabs", !0)), self.panels = self.panels.add($panel);
} else o.disabled.push(i);
}), init ? (this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"), 
this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), 
this.lis.addClass("ui-state-default ui-corner-top"), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"), 
o.selected === undefined ? (location.hash && this.anchors.each(function(i, a) {
return a.hash == location.hash ? (o.selected = i, !1) :void 0;
}), "number" != typeof o.selected && o.cookie && (o.selected = parseInt(self._cookie(), 10)), 
"number" != typeof o.selected && this.lis.filter(".ui-tabs-selected").length && (o.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))), 
o.selected = o.selected || (this.lis.length ? 0 :-1)) :null === o.selected && (o.selected = -1), 
o.selected = o.selected >= 0 && this.anchors[o.selected] || o.selected < 0 ? o.selected :0, 
o.disabled = $.unique(o.disabled.concat($.map(this.lis.filter(".ui-state-disabled"), function(n) {
return self.lis.index(n);
}))).sort(), -1 != $.inArray(o.selected, o.disabled) && o.disabled.splice($.inArray(o.selected, o.disabled), 1), 
this.panels.addClass("ui-tabs-hide"), this.lis.removeClass("ui-tabs-selected ui-state-active"), 
o.selected >= 0 && this.anchors.length && (self.element.find(self._sanitizeSelector(self.anchors[o.selected].hash)).removeClass("ui-tabs-hide"), 
this.lis.eq(o.selected).addClass("ui-tabs-selected ui-state-active"), self.element.queue("tabs", function() {
self._trigger("show", null, self._ui(self.anchors[o.selected], self.element.find(self._sanitizeSelector(self.anchors[o.selected].hash))[0]));
}), this.load(o.selected)), $(window).bind("unload", function() {
self.lis.add(self.anchors).unbind(".tabs"), self.lis = self.anchors = self.panels = null;
})) :o.selected = this.lis.index(this.lis.filter(".ui-tabs-selected")), this.element[o.collapsible ? "addClass" :"removeClass"]("ui-tabs-collapsible"), 
o.cookie && this._cookie(o.selected, o.cookie);
for (var li, i = 0; li = this.lis[i]; i++) $(li)[-1 == $.inArray(i, o.disabled) || $(li).hasClass("ui-tabs-selected") ? "removeClass" :"addClass"]("ui-state-disabled");
if (o.cache === !1 && this.anchors.removeData("cache.tabs"), this.lis.add(this.anchors).unbind(".tabs"), 
"mouseover" !== o.event) {
var addState = function(state, el) {
el.is(":not(.ui-state-disabled)") && el.addClass("ui-state-" + state);
}, removeState = function(state, el) {
el.removeClass("ui-state-" + state);
};
this.lis.bind("mouseover.tabs", function() {
addState("hover", $(this));
}), this.lis.bind("mouseout.tabs", function() {
removeState("hover", $(this));
}), this.anchors.bind("focus.tabs", function() {
addState("focus", $(this).closest("li"));
}), this.anchors.bind("blur.tabs", function() {
removeState("focus", $(this).closest("li"));
});
}
var hideFx, showFx;
o.fx && ($.isArray(o.fx) ? (hideFx = o.fx[0], showFx = o.fx[1]) :hideFx = showFx = o.fx);
var showTab = showFx ? function(clicked, $show) {
$(clicked).closest("li").addClass("ui-tabs-selected ui-state-active"), $show.hide().removeClass("ui-tabs-hide").animate(showFx, showFx.duration || "normal", function() {
resetStyle($show, showFx), self._trigger("show", null, self._ui(clicked, $show[0]));
});
} :function(clicked, $show) {
$(clicked).closest("li").addClass("ui-tabs-selected ui-state-active"), $show.removeClass("ui-tabs-hide"), 
self._trigger("show", null, self._ui(clicked, $show[0]));
}, hideTab = hideFx ? function(clicked, $hide) {
$hide.animate(hideFx, hideFx.duration || "normal", function() {
self.lis.removeClass("ui-tabs-selected ui-state-active"), $hide.addClass("ui-tabs-hide"), 
resetStyle($hide, hideFx), self.element.dequeue("tabs");
});
} :function(clicked, $hide) {
self.lis.removeClass("ui-tabs-selected ui-state-active"), $hide.addClass("ui-tabs-hide"), 
self.element.dequeue("tabs");
};
this.anchors.bind(o.event + ".tabs", function() {
var el = this, $li = $(el).closest("li"), $hide = self.panels.filter(":not(.ui-tabs-hide)"), $show = self.element.find(self._sanitizeSelector(el.hash));
if ($li.hasClass("ui-tabs-selected") && !o.collapsible || $li.hasClass("ui-state-disabled") || $li.hasClass("ui-state-processing") || self.panels.filter(":animated").length || self._trigger("select", null, self._ui(this, $show[0])) === !1) return this.blur(), 
!1;
if (o.selected = self.anchors.index(this), self.abort(), o.collapsible) {
if ($li.hasClass("ui-tabs-selected")) return o.selected = -1, o.cookie && self._cookie(o.selected, o.cookie), 
self.element.queue("tabs", function() {
hideTab(el, $hide);
}).dequeue("tabs"), this.blur(), !1;
if (!$hide.length) return o.cookie && self._cookie(o.selected, o.cookie), self.element.queue("tabs", function() {
showTab(el, $show);
}), self.load(self.anchors.index(this)), this.blur(), !1;
}
if (o.cookie && self._cookie(o.selected, o.cookie), !$show.length) throw "jQuery UI Tabs: Mismatching fragment identifier.";
$hide.length && self.element.queue("tabs", function() {
hideTab(el, $hide);
}), self.element.queue("tabs", function() {
showTab(el, $show);
}), self.load(self.anchors.index(this)), $.browser.msie && this.blur();
}), this.anchors.bind("click.tabs", function() {
return !1;
});
},
_getIndex:function(index) {
return "string" == typeof index && (index = this.anchors.index(this.anchors.filter("[href$='" + index + "']"))), 
index;
},
destroy:function() {
var o = this.options;
return this.abort(), this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"), 
this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), 
this.anchors.each(function() {
var href = $.data(this, "href.tabs");
href && (this.href = href);
var $this = $(this).unbind(".tabs");
$.each([ "href", "load", "cache" ], function(i, prefix) {
$this.removeData(prefix + ".tabs");
});
}), this.lis.unbind(".tabs").add(this.panels).each(function() {
$.data(this, "destroy.tabs") ? $(this).remove() :$(this).removeClass([ "ui-state-default", "ui-corner-top", "ui-tabs-selected", "ui-state-active", "ui-state-hover", "ui-state-focus", "ui-state-disabled", "ui-tabs-panel", "ui-widget-content", "ui-corner-bottom", "ui-tabs-hide" ].join(" "));
}), o.cookie && this._cookie(null, o.cookie), this;
},
add:function(url, label, index) {
index === undefined && (index = this.anchors.length);
var self = this, o = this.options, $li = $(o.tabTemplate.replace(/#\{href\}/g, url).replace(/#\{label\}/g, label)), id = url.indexOf("#") ? this._tabId($("a", $li)[0]) :url.replace("#", "");
$li.addClass("ui-state-default ui-corner-top").data("destroy.tabs", !0);
var $panel = self.element.find("#" + id);
return $panel.length || ($panel = $(o.panelTemplate).attr("id", id).data("destroy.tabs", !0)), 
$panel.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"), 
index >= this.lis.length ? ($li.appendTo(this.list), $panel.appendTo(this.list[0].parentNode)) :($li.insertBefore(this.lis[index]), 
$panel.insertBefore(this.panels[index])), o.disabled = $.map(o.disabled, function(n) {
return n >= index ? ++n :n;
}), this._tabify(), 1 == this.anchors.length && (o.selected = 0, $li.addClass("ui-tabs-selected ui-state-active"), 
$panel.removeClass("ui-tabs-hide"), this.element.queue("tabs", function() {
self._trigger("show", null, self._ui(self.anchors[0], self.panels[0]));
}), this.load(0)), this._trigger("add", null, this._ui(this.anchors[index], this.panels[index])), 
this;
},
remove:function(index) {
index = this._getIndex(index);
var o = this.options, $li = this.lis.eq(index).remove(), $panel = this.panels.eq(index).remove();
return $li.hasClass("ui-tabs-selected") && this.anchors.length > 1 && this.select(index + (index + 1 < this.anchors.length ? 1 :-1)), 
o.disabled = $.map($.grep(o.disabled, function(n) {
return n != index;
}), function(n) {
return n >= index ? --n :n;
}), this._tabify(), this._trigger("remove", null, this._ui($li.find("a")[0], $panel[0])), 
this;
},
enable:function(index) {
index = this._getIndex(index);
var o = this.options;
if (-1 != $.inArray(index, o.disabled)) return this.lis.eq(index).removeClass("ui-state-disabled"), 
o.disabled = $.grep(o.disabled, function(n) {
return n != index;
}), this._trigger("enable", null, this._ui(this.anchors[index], this.panels[index])), 
this;
},
disable:function(index) {
index = this._getIndex(index);
var o = this.options;
return index != o.selected && (this.lis.eq(index).addClass("ui-state-disabled"), 
o.disabled.push(index), o.disabled.sort(), this._trigger("disable", null, this._ui(this.anchors[index], this.panels[index]))), 
this;
},
select:function(index) {
if (index = this._getIndex(index), -1 == index) {
if (!this.options.collapsible || -1 == this.options.selected) return this;
index = this.options.selected;
}
return this.anchors.eq(index).trigger(this.options.event + ".tabs"), this;
},
load:function(index) {
index = this._getIndex(index);
var self = this, o = this.options, a = this.anchors.eq(index)[0], url = $.data(a, "load.tabs");
if (this.abort(), !url || 0 !== this.element.queue("tabs").length && $.data(a, "cache.tabs")) return this.element.dequeue("tabs"), 
void 0;
if (this.lis.eq(index).addClass("ui-state-processing"), o.spinner) {
var span = $("span", a);
span.data("label.tabs", span.html()).html(o.spinner);
}
return this.xhr = $.ajax($.extend({}, o.ajaxOptions, {
url:url,
success:function(r, s) {
self.element.find(self._sanitizeSelector(a.hash)).html(r), self._cleanup(), o.cache && $.data(a, "cache.tabs", !0), 
self._trigger("load", null, self._ui(self.anchors[index], self.panels[index]));
try {
o.ajaxOptions.success(r, s);
} catch (e) {}
},
error:function(xhr, s) {
self._cleanup(), self._trigger("load", null, self._ui(self.anchors[index], self.panels[index]));
try {
o.ajaxOptions.error(xhr, s, index, a);
} catch (e) {}
}
})), self.element.dequeue("tabs"), this;
},
abort:function() {
return this.element.queue([]), this.panels.stop(!1, !0), this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2)), 
this.xhr && (this.xhr.abort(), delete this.xhr), this._cleanup(), this;
},
url:function(index, url) {
return this.anchors.eq(index).removeData("cache.tabs").data("load.tabs", url), this;
},
length:function() {
return this.anchors.length;
}
}), $.extend($.ui.tabs, {
version:"1.8.23"
}), $.extend($.ui.tabs.prototype, {
rotation:null,
rotate:function(ms, continuing) {
var self = this, o = this.options, rotate = self._rotate || (self._rotate = function(e) {
clearTimeout(self.rotation), self.rotation = setTimeout(function() {
var t = o.selected;
self.select(++t < self.anchors.length ? t :0);
}, ms), e && e.stopPropagation();
}), stop = self._unrotate || (self._unrotate = continuing ? function() {
rotate();
} :function(e) {
e.clientX && self.rotate(null);
});
return ms ? (this.element.bind("tabsshow", rotate), this.anchors.bind(o.event + ".tabs", stop), 
rotate()) :(clearTimeout(self.rotation), this.element.unbind("tabsshow", rotate), 
this.anchors.unbind(o.event + ".tabs", stop), delete this._rotate, delete this._unrotate), 
this;
}
});
}(jQuery), function($, undefined) {
var alreadyInitialized = function() {
var events = $._data(document, "events");
return events && events.click && $.grep(events.click, function(e) {
return "rails" === e.namespace;
}).length;
};
alreadyInitialized() && $.error("jquery-ujs has already been loaded!");
var rails;
$.rails = rails = {
linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",
formSubmitSelector:"form",
formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
fileInputSelector:"input:file",
linkDisableSelector:"a[data-disable-with]",
CSRFProtection:function(xhr) {
var token = $('meta[name="csrf-token"]').attr("content");
token && xhr.setRequestHeader("X-CSRF-Token", token);
},
fire:function(obj, name, data) {
var event = $.Event(name);
return obj.trigger(event, data), event.result !== !1;
},
confirm:function(message) {
return confirm(message);
},
ajax:function(options) {
return $.ajax(options);
},
href:function(element) {
return element.attr("href");
},
handleRemote:function(element) {
var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;
if (rails.fire(element, "ajax:before")) {
if (elCrossDomain = element.data("cross-domain"), crossDomain = elCrossDomain === undefined ? null :elCrossDomain, 
withCredentials = element.data("with-credentials") || null, dataType = element.data("type") || $.ajaxSettings && $.ajaxSettings.dataType, 
element.is("form")) {
method = element.attr("method"), url = element.attr("action"), data = element.serializeArray();
var button = element.data("ujs:submit-button");
button && (data.push(button), element.data("ujs:submit-button", null));
} else element.is(rails.inputChangeSelector) ? (method = element.data("method"), 
url = element.data("url"), data = element.serialize(), element.data("params") && (data = data + "&" + element.data("params"))) :(method = element.data("method"), 
url = rails.href(element), data = element.data("params") || null);
options = {
type:method || "GET",
data:data,
dataType:dataType,
beforeSend:function(xhr, settings) {
return settings.dataType === undefined && xhr.setRequestHeader("accept", "*/*;q=0.5, " + settings.accepts.script), 
rails.fire(element, "ajax:beforeSend", [ xhr, settings ]);
},
success:function(data, status, xhr) {
element.trigger("ajax:success", [ data, status, xhr ]);
},
complete:function(xhr, status) {
element.trigger("ajax:complete", [ xhr, status ]);
},
error:function(xhr, status, error) {
element.trigger("ajax:error", [ xhr, status, error ]);
},
xhrFields:{
withCredentials:withCredentials
},
crossDomain:crossDomain
}, url && (options.url = url);
var jqxhr = rails.ajax(options);
return element.trigger("ajax:send", jqxhr), jqxhr;
}
return !1;
},
handleMethod:function(link) {
var href = rails.href(link), method = link.data("method"), target = link.attr("target"), csrf_token = $("meta[name=csrf-token]").attr("content"), csrf_param = $("meta[name=csrf-param]").attr("content"), form = $('<form method="post" action="' + href + '"></form>'), metadata_input = '<input name="_method" value="' + method + '" type="hidden" />';
csrf_param !== undefined && csrf_token !== undefined && (metadata_input += '<input name="' + csrf_param + '" value="' + csrf_token + '" type="hidden" />'), 
target && form.attr("target", target), form.hide().append(metadata_input).appendTo("body"), 
form.submit();
},
disableFormElements:function(form) {
form.find(rails.disableSelector).each(function() {
var element = $(this), method = element.is("button") ? "html" :"val";
element.data("ujs:enable-with", element[method]()), element[method](element.data("disable-with")), 
element.prop("disabled", !0);
});
},
enableFormElements:function(form) {
form.find(rails.enableSelector).each(function() {
var element = $(this), method = element.is("button") ? "html" :"val";
element.data("ujs:enable-with") && element[method](element.data("ujs:enable-with")), 
element.prop("disabled", !1);
});
},
allowAction:function(element) {
var callback, message = element.data("confirm"), answer = !1;
return message ? (rails.fire(element, "confirm") && (answer = rails.confirm(message), 
callback = rails.fire(element, "confirm:complete", [ answer ])), answer && callback) :!0;
},
blankInputs:function(form, specifiedSelector, nonBlank) {
var input, valueToCheck, inputs = $(), selector = specifiedSelector || "input,textarea", allInputs = form.find(selector);
return allInputs.each(function() {
if (input = $(this), valueToCheck = input.is(":checkbox,:radio") ? input.is(":checked") :input.val(), 
!valueToCheck == !nonBlank) {
if (input.is(":radio") && allInputs.filter('input:radio:checked[name="' + input.attr("name") + '"]').length) return !0;
inputs = inputs.add(input);
}
}), inputs.length ? inputs :!1;
},
nonBlankInputs:function(form, specifiedSelector) {
return rails.blankInputs(form, specifiedSelector, !0);
},
stopEverything:function(e) {
return $(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), 
!1;
},
callFormSubmitBindings:function(form, event) {
var events = form.data("events"), continuePropagation = !0;
return events !== undefined && events.submit !== undefined && $.each(events.submit, function(i, obj) {
return "function" == typeof obj.handler ? continuePropagation = obj.handler(event) :void 0;
}), continuePropagation;
},
disableElement:function(element) {
element.data("ujs:enable-with", element.html()), element.html(element.data("disable-with")), 
element.bind("click.railsDisable", function(e) {
return rails.stopEverything(e);
});
},
enableElement:function(element) {
element.data("ujs:enable-with") !== undefined && (element.html(element.data("ujs:enable-with")), 
element.data("ujs:enable-with", !1)), element.unbind("click.railsDisable");
}
}, rails.fire($(document), "rails:attachBindings") && ($.ajaxPrefilter(function(options, originalOptions, xhr) {
options.crossDomain || rails.CSRFProtection(xhr);
}), $(document).delegate(rails.linkDisableSelector, "ajax:complete", function() {
rails.enableElement($(this));
}), $(document).delegate(rails.linkClickSelector, "click.rails", function(e) {
var link = $(this), method = link.data("method"), data = link.data("params");
if (!rails.allowAction(link)) return rails.stopEverything(e);
if (link.is(rails.linkDisableSelector) && rails.disableElement(link), link.data("remote") !== undefined) {
if (!(!e.metaKey && !e.ctrlKey || method && "GET" !== method || data)) return !0;
var handleRemote = rails.handleRemote(link);
return handleRemote === !1 ? rails.enableElement(link) :handleRemote.error(function() {
rails.enableElement(link);
}), !1;
}
return link.data("method") ? (rails.handleMethod(link), !1) :void 0;
}), $(document).delegate(rails.inputChangeSelector, "change.rails", function(e) {
var link = $(this);
return rails.allowAction(link) ? (rails.handleRemote(link), !1) :rails.stopEverything(e);
}), $(document).delegate(rails.formSubmitSelector, "submit.rails", function(e) {
var form = $(this), remote = form.data("remote") !== undefined, blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector), nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
if (!rails.allowAction(form)) return rails.stopEverything(e);
if (blankRequiredInputs && form.attr("novalidate") == undefined && rails.fire(form, "ajax:aborted:required", [ blankRequiredInputs ])) return rails.stopEverything(e);
if (remote) {
if (nonBlankFileInputs) {
setTimeout(function() {
rails.disableFormElements(form);
}, 13);
var aborted = rails.fire(form, "ajax:aborted:file", [ nonBlankFileInputs ]);
return aborted || setTimeout(function() {
rails.enableFormElements(form);
}, 13), aborted;
}
return !$.support.submitBubbles && $().jquery < "1.7" && rails.callFormSubmitBindings(form, e) === !1 ? rails.stopEverything(e) :(rails.handleRemote(form), 
!1);
}
setTimeout(function() {
rails.disableFormElements(form);
}, 13);
}), $(document).delegate(rails.formInputClickSelector, "click.rails", function(event) {
var button = $(this);
if (!rails.allowAction(button)) return rails.stopEverything(event);
var name = button.attr("name"), data = name ? {
name:name,
value:button.val()
} :null;
button.closest("form").data("ujs:submit-button", data);
}), $(document).delegate(rails.formSubmitSelector, "ajax:beforeSend.rails", function(event) {
this == event.target && rails.disableFormElements($(this));
}), $(document).delegate(rails.formSubmitSelector, "ajax:complete.rails", function(event) {
this == event.target && rails.enableFormElements($(this));
}), $(function() {
csrf_token = $("meta[name=csrf-token]").attr("content"), csrf_param = $("meta[name=csrf-param]").attr("content"), 
$('form input[name="' + csrf_param + '"]').val(csrf_token);
}));
}(jQuery), function() {
window.ActiveAdmin = {}, window.AA || (window.AA = window.ActiveAdmin);
}.call(this), function() {
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