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
trim:core_trim && !core_trim.call("\ufeff\xa0") ? function(text) {
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
}(window);