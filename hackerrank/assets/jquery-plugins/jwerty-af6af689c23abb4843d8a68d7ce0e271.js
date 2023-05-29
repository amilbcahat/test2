/*
 * jwerty - Awesome handling of keyboard events
 *
 * jwerty is a JS lib which allows you to bind, fire and assert key combination
 * strings against elements and events. It normalises the poor std api into
 * something easy to use and clear.
 *
 * This code is licensed under the MIT
 * For the full license see: http://keithamus.mit-license.org/
 * For more information see: http://keithamus.github.com/jwerty
 *
 * @author Keith Cirkel ('keithamus') <jwerty@keithcirkel.co.uk>
 * @license http://keithamus.mit-license.org/
 * @copyright Copyright © 2011, Keith Cirkel
 *
 */
!function(global, exports) {
function realTypeOf(v, s) {
return null === v ? "null" === s :void 0 === v ? "undefined" === s :v.is && v instanceof $ ? "element" === s :Object.prototype.toString.call(v).toLowerCase().indexOf(s) > 7;
}
function JwertyCode(jwertyCode) {
var i, c, n, z, keyCombo, optionals, jwertyCodeFragment, rangeMatches, rangeI;
if (jwertyCode instanceof JwertyCode) return jwertyCode;
for (realTypeOf(jwertyCode, "array") || (jwertyCode = String(jwertyCode).replace(/\s/g, "").toLowerCase().match(/(?:\+,|[^,])+/g)), 
i = 0, c = jwertyCode.length; c > i; ++i) {
for (realTypeOf(jwertyCode[i], "array") || (jwertyCode[i] = String(jwertyCode[i]).match(/(?:\+\/|[^\/])+/g)), 
optionals = [], n = jwertyCode[i].length; n--; ) {
var jwertyCodeFragment = jwertyCode[i][n];
for (keyCombo = {
jwertyCombo:String(jwertyCodeFragment),
shiftKey:!1,
ctrlKey:!1,
altKey:!1,
metaKey:!1
}, realTypeOf(jwertyCodeFragment, "array") || (jwertyCodeFragment = String(jwertyCodeFragment).toLowerCase().match(/(?:(?:[^\+])+|\+\+|^\+$)/g)), 
z = jwertyCodeFragment.length; z--; ) "++" === jwertyCodeFragment[z] && (jwertyCodeFragment[z] = "+"), 
jwertyCodeFragment[z] in _keys.mods ? keyCombo[_modProps[_keys.mods[jwertyCodeFragment[z]]]] = !0 :jwertyCodeFragment[z] in _keys.keys ? keyCombo.keyCode = _keys.keys[jwertyCodeFragment[z]] :rangeMatches = jwertyCodeFragment[z].match(/^\[([^-]+\-?[^-]*)-([^-]+\-?[^-]*)\]$/);
if (realTypeOf(keyCombo.keyCode, "undefined")) if (rangeMatches && rangeMatches[1] in _keys.keys && rangeMatches[2] in _keys.keys) {
for (rangeMatches[2] = _keys.keys[rangeMatches[2]], rangeMatches[1] = _keys.keys[rangeMatches[1]], 
rangeI = rangeMatches[1]; rangeI < rangeMatches[2]; ++rangeI) optionals.push({
altKey:keyCombo.altKey,
shiftKey:keyCombo.shiftKey,
metaKey:keyCombo.metaKey,
ctrlKey:keyCombo.ctrlKey,
keyCode:rangeI,
jwertyCombo:String(jwertyCodeFragment)
});
keyCombo.keyCode = rangeI;
} else keyCombo.keyCode = 0;
optionals.push(keyCombo);
}
this[i] = optionals;
}
return this.length = i, this;
}
var $$, $b, $d = global.document, $ = global.jQuery || global.Zepto || global.ender || $d, ke = "keydown";
$ === $d ? ($$ = function(selector, context) {
return selector ? $.querySelector(selector, context || $) :$;
}, $b = function(e, fn) {
e.addEventListener(ke, fn, !1);
}, $f = function(e, jwertyEv) {
var i, ret = document.createEvent("Event");
ret.initEvent(ke, !0, !0);
for (i in jwertyEv) ret[i] = jwertyEv[i];
return (e || $).dispatchEvent(ret);
}) :($$ = function(selector, context) {
return $(selector || $d, context);
}, $b = function(e, fn) {
$(e).bind(ke + ".jwerty", fn);
}, $f = function(e, ob) {
$(e || $d).trigger($.Event(ke, ob));
});
var _modProps = {
16:"shiftKey",
17:"ctrlKey",
18:"altKey",
91:"metaKey"
}, _keys = {
mods:{
"⇧":16,
shift:16,
"⌃":17,
ctrl:17,
"⌥":18,
alt:18,
option:18,
"⌘":91,
meta:91,
cmd:91,
"super":91,
win:91
},
keys:{
"⌫":8,
backspace:8,
"⇥":9,
"⇆":9,
tab:9,
"↩":13,
"return":13,
enter:13,
"⌅":13,
pause:19,
"pause-break":19,
"⇪":20,
caps:20,
"caps-lock":20,
"⎋":27,
escape:27,
esc:27,
space:32,
"↖":33,
pgup:33,
"page-up":33,
"↘":34,
pgdown:34,
"page-down":34,
"⇟":35,
end:35,
"⇞":36,
home:36,
ins:45,
insert:45,
del:46,
"delete":46,
"←":37,
left:37,
"arrow-left":37,
"↑":38,
up:38,
"arrow-up":38,
"→":39,
right:39,
"arrow-right":39,
"↓":40,
down:40,
"arrow-down":40,
"*":106,
star:106,
asterisk:106,
multiply:106,
"+":107,
plus:107,
"-":109,
subtract:109,
";":186,
semicolon:186,
"=":187,
equals:187,
",":188,
comma:188,
".":190,
period:190,
"full-stop":190,
"/":191,
slash:191,
"forward-slash":191,
"`":192,
tick:192,
"back-quote":192,
"[":219,
"open-bracket":219,
"\\":220,
"back-slash":220,
"]":221,
"close-bracket":221,
"'":222,
quote:222,
apostraphe:222
}
};
for (i = 95, n = 0; ++i < 106; ) _keys.keys["num-" + n] = i, ++n;
for (i = 47, n = 0; ++i < 58; ) _keys.keys[n] = i, ++n;
for (i = 111, n = 1; ++i < 136; ) _keys.keys["f" + n] = i, ++n;
for (var i = 64; ++i < 91; ) _keys.keys[String.fromCharCode(i).toLowerCase()] = i;
var jwerty = exports.jwerty = {
event:function(jwertyCode, callbackFunction, callbackContext) {
if (realTypeOf(callbackFunction, "boolean")) {
var bool = callbackFunction;
callbackFunction = function() {
return bool;
};
}
jwertyCode = new JwertyCode(jwertyCode);
var returnValue, jwertyCodeIs, i = 0, c = jwertyCode.length - 1;
return function(event) {
return (jwertyCodeIs = jwerty.is(jwertyCode, event, i)) ? c > i ? (++i, void 0) :(returnValue = callbackFunction.call(callbackContext || this, event, jwertyCodeIs), 
returnValue === !1 && event.preventDefault(), i = 0, void 0) :(i = jwerty.is(jwertyCode, event) ? 1 :0, 
void 0);
};
},
is:function(jwertyCode, event, i) {
jwertyCode = new JwertyCode(jwertyCode), i = i || 0, jwertyCode = jwertyCode[i], 
event = event.originalEvent || event;
for (var n = jwertyCode.length, returnValue = !1; n--; ) {
returnValue = jwertyCode[n].jwertyCombo;
for (var p in jwertyCode[n]) "jwertyCombo" !== p && event[p] != jwertyCode[n][p] && (returnValue = !1);
if (returnValue !== !1) return returnValue;
}
return returnValue;
},
key:function(jwertyCode, callbackFunction, callbackContext, selector, selectorContext) {
var realSelector = realTypeOf(callbackContext, "element") || realTypeOf(callbackContext, "string") ? callbackContext :selector, realcallbackContext = realSelector === callbackContext ? global :callbackContext, realSelectorContext = realSelector === callbackContext ? selector :selectorContext;
$b(realTypeOf(realSelector, "element") ? realSelector :$$(realSelector, realSelectorContext), jwerty.event(jwertyCode, callbackFunction, realcallbackContext));
},
fire:function(jwertyCode, selector, selectorContext, i) {
jwertyCode = new JwertyCode(jwertyCode);
var realI = realTypeOf(selectorContext, "number") ? selectorContext :i;
$f(realTypeOf(selector, "element") ? selector :$$(selector, selectorContext), jwertyCode[realI || 0][0]);
},
KEYS:_keys
};
}(this, "undefined" != typeof module && module.exports ? module.exports :this);