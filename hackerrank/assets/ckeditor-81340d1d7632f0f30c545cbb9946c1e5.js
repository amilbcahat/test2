/*
Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
!function() {
window.CKEDITOR && window.CKEDITOR.dom || (window.CKEDITOR || (window.CKEDITOR = function() {
var d = {
timestamp:"E0OL",
version:"4.3 DEV",
revision:"0",
rnd:Math.floor(900 * Math.random()) + 100,
_:{
pending:[]
},
status:"unloaded",
basePath:function() {
var a = window.CKEDITOR_BASEPATH || "";
if (!a) for (var b = document.getElementsByTagName("script"), c = 0; c < b.length; c++) {
var d = b[c].src.match(/(^|.*[\\\/])ckeditor(?:_basic)?(?:_source)?.js(?:\?.*)?$/i);
if (d) {
a = d[1];
break;
}
}
if (-1 == a.indexOf(":/") && "//" != a.slice(0, 2) && (a = 0 === a.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + a :location.href.match(/^[^\?]*\/(?:)/)[0] + a), 
!a) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
return a;
}(),
getUrl:function(a) {
return -1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a), 
this.timestamp && "/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a) && (a += (0 <= a.indexOf("?") ? "&" :"?") + "t=" + this.timestamp), 
a;
},
domReady:function() {
function a() {
try {
document.addEventListener ? (document.removeEventListener("DOMContentLoaded", a, !1), 
b()) :document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), 
b());
} catch (c) {}
}
function b() {
for (var b; b = c.shift(); ) b();
}
var c = [];
return function(b) {
if (c.push(b), "complete" === document.readyState && setTimeout(a, 1), 1 == c.length) if (document.addEventListener) document.addEventListener("DOMContentLoaded", a, !1), 
window.addEventListener("load", a, !1); else if (document.attachEvent) {
document.attachEvent("onreadystatechange", a), window.attachEvent("onload", a), 
b = !1;
try {
b = !window.frameElement;
} catch (d) {}
if (document.documentElement.doScroll && b) {
var f = function() {
try {
document.documentElement.doScroll("left");
} catch (b) {
return setTimeout(f, 1), void 0;
}
a();
};
f();
}
}
};
}()
}, e = window.CKEDITOR_GETURL;
if (e) {
var c = d.getUrl;
d.getUrl = function(a) {
return e.call(d, a) || c.call(d, a);
};
}
return d;
}()), CKEDITOR.event || (CKEDITOR.event = function() {}, CKEDITOR.event.implementOn = function(d) {
var c, e = CKEDITOR.event.prototype;
for (c in e) void 0 == d[c] && (d[c] = e[c]);
}, CKEDITOR.event.prototype = function() {
function d(a) {
var b = e(this);
return b[a] || (b[a] = new c(a));
}
var e = function(a) {
return a = a.getPrivate && a.getPrivate() || a._ || (a._ = {}), a.events || (a.events = {});
}, c = function(a) {
this.name = a, this.listeners = [];
};
return c.prototype = {
getListenerIndex:function(a) {
for (var b = 0, c = this.listeners; b < c.length; b++) if (c[b].fn == a) return b;
return -1;
}
}, {
define:function(a, b) {
var c = d.call(this, a);
CKEDITOR.tools.extend(c, b, !0);
},
on:function(a, b, c, g, e) {
function f(d, l, k, f) {
return d = {
name:a,
sender:this,
editor:d,
data:l,
listenerData:g,
stop:k,
cancel:f,
removeListener:i
}, b.call(c, d) === !1 ? !1 :d.data;
}
function i() {
n.removeListener(a, b);
}
var k = d.call(this, a);
if (k.getListenerIndex(b) < 0) {
k = k.listeners, c || (c = this), isNaN(e) && (e = 10);
var n = this;
f.fn = b, f.priority = e;
for (var o = k.length - 1; o >= 0; o--) if (k[o].priority <= e) return k.splice(o + 1, 0, f), 
{
removeListener:i
};
k.unshift(f);
}
return {
removeListener:i
};
},
once:function() {
var a = arguments[1];
return arguments[1] = function(b) {
return b.removeListener(), a.apply(this, arguments);
}, this.on.apply(this, arguments);
},
capture:function() {
CKEDITOR.event.useCapture = 1;
var a = this.on.apply(this, arguments);
return CKEDITOR.event.useCapture = 0, a;
},
fire:function() {
var a = 0, b = function() {
a = 1;
}, c = 0, d = function() {
c = 1;
};
return function(h, f, i) {
var k = e(this)[h], h = a, n = c;
if (a = c = 0, k) {
var o = k.listeners;
if (o.length) for (var q, o = o.slice(0), l = 0; l < o.length; l++) {
if (k.errorProof) try {
q = o[l].call(this, i, f, b, d);
} catch (m) {} else q = o[l].call(this, i, f, b, d);
if (q === !1 ? c = 1 :"undefined" != typeof q && (f = q), a || c) break;
}
}
return f = c ? !1 :"undefined" == typeof f ? !0 :f, a = h, c = n, f;
};
}(),
fireOnce:function(a, b, c) {
return b = this.fire(a, b, c), delete e(this)[a], b;
},
removeListener:function(a, b) {
var c = e(this)[a];
if (c) {
var d = c.getListenerIndex(b);
d >= 0 && c.listeners.splice(d, 1);
}
},
removeAllListeners:function() {
var b, a = e(this);
for (b in a) delete a[b];
},
hasListeners:function(a) {
return (a = e(this)[a]) && a.listeners.length > 0;
}
};
}()), CKEDITOR.editor || (CKEDITOR.editor = function() {
CKEDITOR._.pending.push([ this, arguments ]), CKEDITOR.event.call(this);
}, CKEDITOR.editor.prototype.fire = function(d, e) {
return d in {
instanceReady:1,
loaded:1
} && (this[d] = !0), CKEDITOR.event.prototype.fire.call(this, d, e, this);
}, CKEDITOR.editor.prototype.fireOnce = function(d, e) {
return d in {
instanceReady:1,
loaded:1
} && (this[d] = !0), CKEDITOR.event.prototype.fireOnce.call(this, d, e, this);
}, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)), CKEDITOR.env || (CKEDITOR.env = function() {
var d = navigator.userAgent.toLowerCase(), e = window.opera, c = {
ie:d.indexOf("trident/") > -1,
opera:!!e && e.version,
webkit:d.indexOf(" applewebkit/") > -1,
air:d.indexOf(" adobeair/") > -1,
mac:d.indexOf("macintosh") > -1,
quirks:"BackCompat" == document.compatMode && (!document.documentMode || document.documentMode < 10),
mobile:d.indexOf("mobile") > -1,
iOS:/(ipad|iphone|ipod)/.test(d),
isCustomDomain:function() {
if (!this.ie) return !1;
var b = document.domain, a = window.location.hostname;
return b != a && b != "[" + a + "]";
},
secure:"https:" == location.protocol
};
c.gecko = "Gecko" == navigator.product && !c.webkit && !c.opera && !c.ie, c.webkit && (d.indexOf("chrome") > -1 ? c.chrome = !0 :c.safari = !0);
var a = 0;
if (c.ie && (a = c.quirks || !document.documentMode ? parseFloat(d.match(/msie (\d+)/)[1]) :document.documentMode, 
c.ie9Compat = 9 == a, c.ie8Compat = 8 == a, c.ie7Compat = 7 == a, c.ie6Compat = 7 > a || c.quirks), 
c.gecko) {
var b = d.match(/rv:([\d\.]+)/);
b && (b = b[1].split("."), a = 1e4 * b[0] + 100 * (b[1] || 0) + 1 * (b[2] || 0));
}
return c.opera && (a = parseFloat(e.version())), c.air && (a = parseFloat(d.match(/ adobeair\/(\d+)/)[1])), 
c.webkit && (a = parseFloat(d.match(/ applewebkit\/(\d+)/)[1])), c.version = a, 
c.isCompatible = c.iOS && a >= 534 || !c.mobile && (c.ie && a > 6 || c.gecko && a >= 10801 || c.opera && a >= 9.5 || c.air && a >= 1 || c.webkit && a >= 522 || !1), 
c.hidpi = window.devicePixelRatio >= 2, c.needsBrFiller = c.gecko || c.webkit || c.ie && a > 10, 
c.needsNbspFiller = c.ie && 11 > a, c.cssClass = "cke_browser_" + (c.ie ? "ie" :c.gecko ? "gecko" :c.opera ? "opera" :c.webkit ? "webkit" :"unknown"), 
c.quirks && (c.cssClass = c.cssClass + " cke_browser_quirks"), c.ie && (c.cssClass = c.cssClass + (" cke_browser_ie" + (c.quirks || c.version < 7 ? "6" :c.version)), 
c.quirks && (c.cssClass = c.cssClass + " cke_browser_iequirks")), c.gecko && (10900 > a ? c.cssClass = c.cssClass + " cke_browser_gecko18" :11e3 >= a && (c.cssClass = c.cssClass + " cke_browser_gecko19")), 
c.air && (c.cssClass = c.cssClass + " cke_browser_air"), c.iOS && (c.cssClass = c.cssClass + " cke_browser_ios"), 
c.hidpi && (c.cssClass = c.cssClass + " cke_hidpi"), c;
}()), "unloaded" == CKEDITOR.status && function() {
CKEDITOR.event.implementOn(CKEDITOR), CKEDITOR.loadFullCore = function() {
if ("basic_ready" != CKEDITOR.status) CKEDITOR.loadFullCore._load = 1; else {
delete CKEDITOR.loadFullCore;
var d = document.createElement("script");
d.type = "text/javascript", d.src = CKEDITOR.basePath + "ckeditor.js", document.getElementsByTagName("head")[0].appendChild(d);
}
}, CKEDITOR.loadFullCoreTimeout = 0, CKEDITOR.add = function(d) {
(this._.pending || (this._.pending = [])).push(d);
}, function() {
CKEDITOR.domReady(function() {
var d = CKEDITOR.loadFullCore, e = CKEDITOR.loadFullCoreTimeout;
d && (CKEDITOR.status = "basic_ready", d && d._load ? d() :e && setTimeout(function() {
CKEDITOR.loadFullCore && CKEDITOR.loadFullCore();
}, 1e3 * e));
});
}(), CKEDITOR.status = "basic_loaded";
}(), CKEDITOR.dom = {}, function() {
var d = [], e = CKEDITOR.env.gecko ? "-moz-" :CKEDITOR.env.webkit ? "-webkit-" :CKEDITOR.env.opera ? "-o-" :CKEDITOR.env.ie ? "-ms-" :"";
CKEDITOR.on("reset", function() {
d = [];
}), CKEDITOR.tools = {
arrayCompare:function(c, a) {
if (!c && !a) return !0;
if (!c || !a || c.length != a.length) return !1;
for (var b = 0; b < c.length; b++) if (c[b] != a[b]) return !1;
return !0;
},
clone:function(c) {
var a;
if (c && c instanceof Array) {
a = [];
for (var b = 0; b < c.length; b++) a[b] = CKEDITOR.tools.clone(c[b]);
return a;
}
if (null === c || "object" != typeof c || c instanceof String || c instanceof Number || c instanceof Boolean || c instanceof Date || c instanceof RegExp) return c;
a = new c.constructor();
for (b in c) a[b] = CKEDITOR.tools.clone(c[b]);
return a;
},
capitalize:function(c, a) {
return c.charAt(0).toUpperCase() + (a ? c.slice(1) :c.slice(1).toLowerCase());
},
extend:function(c) {
var b, d, a = arguments.length;
"boolean" == typeof (b = arguments[a - 1]) ? a-- :"boolean" == typeof (b = arguments[a - 2]) && (d = arguments[a - 1], 
a -= 2);
for (var g = 1; a > g; g++) {
var f, e = arguments[g];
for (f in e) (b === !0 || void 0 == c[f]) && (!d || f in d) && (c[f] = e[f]);
}
return c;
},
prototypedCopy:function(c) {
var a = function() {};
return a.prototype = c, new a();
},
copy:function(c) {
var b, a = {};
for (b in c) a[b] = c[b];
return a;
},
isArray:function(c) {
return "[object Array]" == Object.prototype.toString.call(c);
},
isEmpty:function(c) {
for (var a in c) if (c.hasOwnProperty(a)) return !1;
return !0;
},
cssVendorPrefix:function(c, a, b) {
return b ? e + c + ":" + a + ";" + c + ":" + a :(b = {}, b[c] = a, b[e + c] = a, 
b);
},
cssStyleToDomStyle:function() {
var c = document.createElement("div").style, a = "undefined" != typeof c.cssFloat ? "cssFloat" :"undefined" != typeof c.styleFloat ? "styleFloat" :"float";
return function(b) {
return "float" == b ? a :b.replace(/-./g, function(b) {
return b.substr(1).toUpperCase();
});
};
}(),
buildStyleHtml:function(c) {
for (var a, c = [].concat(c), b = [], d = 0; d < c.length; d++) (a = c[d]) && (/@import|[{}]/.test(a) ? b.push("<style>" + a + "</style>") :b.push('<link type="text/css" rel=stylesheet href="' + a + '">'));
return b.join("");
},
htmlEncode:function(c) {
return ("" + c).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
},
htmlEncodeAttr:function(c) {
return c.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
},
htmlDecodeAttr:function(c) {
return c.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
},
getNextNumber:function() {
var c = 0;
return function() {
return ++c;
};
}(),
getNextId:function() {
return "cke_" + this.getNextNumber();
},
override:function(c, a) {
var b = a(c);
return b.prototype = c.prototype, b;
},
setTimeout:function(c, a, b, d, g) {
return g || (g = window), b || (b = g), g.setTimeout(function() {
d ? c.apply(b, [].concat(d)) :c.apply(b);
}, a || 0);
},
trim:function() {
var c = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
return function(a) {
return a.replace(c, "");
};
}(),
ltrim:function() {
var c = /^[ \t\n\r]+/g;
return function(a) {
return a.replace(c, "");
};
}(),
rtrim:function() {
var c = /[ \t\n\r]+$/g;
return function(a) {
return a.replace(c, "");
};
}(),
indexOf:function(c, a) {
if ("function" == typeof a) {
for (var b = 0, d = c.length; d > b; b++) if (a(c[b])) return b;
} else {
if (c.indexOf) return c.indexOf(a);
for (b = 0, d = c.length; d > b; b++) if (c[b] === a) return b;
}
return -1;
},
search:function(c, a) {
var b = CKEDITOR.tools.indexOf(c, a);
return b >= 0 ? c[b] :null;
},
bind:function(c, a) {
return function() {
return c.apply(a, arguments);
};
},
createClass:function(c) {
var a = c.$, b = c.base, d = c.privates || c._, g = c.proto, c = c.statics;
if (!a && (a = function() {
b && this.base.apply(this, arguments);
}), d) var e = a, a = function() {
var a, b = this._ || (this._ = {});
for (a in d) {
var c = d[a];
b[a] = "function" == typeof c ? CKEDITOR.tools.bind(c, this) :c;
}
e.apply(this, arguments);
};
return b && (a.prototype = this.prototypedCopy(b.prototype), a.prototype.constructor = a, 
a.base = b, a.baseProto = b.prototype, a.prototype.base = function() {
this.base = b.prototype.base, b.apply(this, arguments), this.base = arguments.callee;
}), g && this.extend(a.prototype, g, !0), c && this.extend(a, c, !0), a;
},
addFunction:function(c, a) {
return d.push(function() {
return c.apply(a || this, arguments);
}) - 1;
},
removeFunction:function(c) {
d[c] = null;
},
callFunction:function(c) {
var a = d[c];
return a && a.apply(window, Array.prototype.slice.call(arguments, 1));
},
cssLength:function() {
var a, c = /^-?\d+\.?\d*px$/;
return function(b) {
return a = CKEDITOR.tools.trim(b + "") + "px", c.test(a) ? a :b || "";
};
}(),
convertToPx:function() {
var c;
return function(a) {
return c || (c = CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"></div>', CKEDITOR.document), 
CKEDITOR.document.getBody().append(c)), /%$/.test(a) ? a :(c.setStyle("width", a), 
c.$.clientWidth);
};
}(),
repeat:function(c, a) {
return Array(a + 1).join(c);
},
tryThese:function() {
for (var c, a = 0, b = arguments.length; b > a; a++) {
var d = arguments[a];
try {
c = d();
break;
} catch (g) {}
}
return c;
},
genKey:function() {
return Array.prototype.slice.call(arguments).join("-");
},
defer:function(c) {
return function() {
var a = arguments, b = this;
window.setTimeout(function() {
c.apply(b, a);
}, 0);
};
},
normalizeCssText:function(c, a) {
var d, b = [], g = CKEDITOR.tools.parseCssText(c, !0, a);
for (d in g) b.push(d + ":" + g[d]);
return b.sort(), b.length ? b.join(";") + ";" :"";
},
convertRgbToHex:function(c) {
return c.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function(a, b, c, d) {
for (a = [ b, c, d ], b = 0; 3 > b; b++) a[b] = ("0" + parseInt(a[b], 10).toString(16)).slice(-2);
return "#" + a.join("");
});
},
parseCssText:function(c, a, b) {
var d = {};
return b && (b = new CKEDITOR.dom.element("span"), b.setAttribute("style", c), c = CKEDITOR.tools.convertRgbToHex(b.getAttribute("style") || "")), 
c && ";" != c ? (c.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(b, c, f) {
a && (c = c.toLowerCase(), "font-family" == c && (f = f.toLowerCase().replace(/["']/g, "").replace(/\s*,\s*/g, ",")), 
f = CKEDITOR.tools.trim(f)), d[c] = f;
}), d) :d;
},
writeCssText:function(c, a) {
var b, d = [];
for (b in c) d.push(b + ":" + c[b]);
return a && d.sort(), d.join("; ");
},
objectCompare:function(c, a, b) {
var d;
if (!c && !a) return !0;
if (!c || !a) return !1;
for (d in c) if (c[d] != a[d]) return !1;
if (!b) for (d in a) if (c[d] != a[d]) return !1;
return !0;
},
objectKeys:function(c) {
var b, a = [];
for (b in c) a.push(b);
return a;
},
convertArrayToObject:function(c, a) {
var b = {};
1 == arguments.length && (a = !0);
for (var d = 0, g = c.length; g > d; ++d) b[c[d]] = a;
return b;
},
fixDomain:function() {
for (var c; ;) try {
c = window.parent.document.domain;
break;
} catch (a) {
if (c = c ? c.replace(/.+?(?:\.|$)/, "") :document.domain, !c) break;
document.domain = c;
}
return !!c;
},
eventsBuffer:function(c, a) {
function b() {
g = new Date().getTime(), d = !1, a();
}
var d, g = 0;
return {
input:function() {
if (!d) {
var a = new Date().getTime() - g;
c > a ? d = setTimeout(b, c - a) :b();
}
},
reset:function() {
d && clearTimeout(d), d = g = 0;
}
};
},
enableHtml5Elements:function(c, a) {
for (var g, b = [ "abbr", "article", "aside", "audio", "bdi", "canvas", "data", "datalist", "details", "figcaption", "figure", "footer", "header", "hgroup", "mark", "meter", "nav", "output", "progress", "section", "summary", "time", "video" ], d = b.length; d--; ) g = c.createElement(b[d]), 
a && c.appendChild(g);
}
};
}(), CKEDITOR.dtd = function() {
var d = CKEDITOR.tools.extend, e = function(b, a) {
for (var c = CKEDITOR.tools.clone(b), d = 1; d < arguments.length; d++) {
var j, a = arguments[d];
for (j in a) delete c[j];
}
return c;
}, c = {}, a = {}, b = {
address:1,
article:1,
aside:1,
blockquote:1,
details:1,
div:1,
dl:1,
fieldset:1,
figure:1,
footer:1,
form:1,
h1:1,
h2:1,
h3:1,
h4:1,
h5:1,
h6:1,
header:1,
hgroup:1,
hr:1,
menu:1,
nav:1,
ol:1,
p:1,
pre:1,
section:1,
table:1,
ul:1
}, j = {
command:1,
link:1,
meta:1,
noscript:1,
script:1,
style:1
}, g = {}, h = {
"#":1
}, f = {
center:1,
dir:1,
noframes:1
};
return d(c, {
a:1,
abbr:1,
area:1,
audio:1,
b:1,
bdi:1,
bdo:1,
br:1,
button:1,
canvas:1,
cite:1,
code:1,
command:1,
datalist:1,
del:1,
dfn:1,
em:1,
embed:1,
i:1,
iframe:1,
img:1,
input:1,
ins:1,
kbd:1,
keygen:1,
label:1,
map:1,
mark:1,
meter:1,
noscript:1,
object:1,
output:1,
progress:1,
q:1,
ruby:1,
s:1,
samp:1,
script:1,
select:1,
small:1,
span:1,
strong:1,
sub:1,
sup:1,
textarea:1,
time:1,
u:1,
"var":1,
video:1,
wbr:1
}, h, {
acronym:1,
applet:1,
basefont:1,
big:1,
font:1,
isindex:1,
strike:1,
style:1,
tt:1
}), d(a, b, c, f), e = {
a:e(c, {
a:1,
button:1
}),
abbr:c,
address:a,
area:g,
article:d({
style:1
}, a),
aside:d({
style:1
}, a),
audio:d({
source:1,
track:1
}, a),
b:c,
base:g,
bdi:c,
bdo:c,
blockquote:a,
body:a,
br:g,
button:e(c, {
a:1,
button:1
}),
canvas:c,
caption:a,
cite:c,
code:c,
col:g,
colgroup:{
col:1
},
command:g,
datalist:d({
option:1
}, c),
dd:a,
del:c,
details:d({
summary:1
}, a),
dfn:c,
div:d({
style:1
}, a),
dl:{
dt:1,
dd:1
},
dt:a,
em:c,
embed:g,
fieldset:d({
legend:1
}, a),
figcaption:a,
figure:d({
figcaption:1
}, a),
footer:a,
form:a,
h1:c,
h2:c,
h3:c,
h4:c,
h5:c,
h6:c,
head:d({
title:1,
base:1
}, j),
header:a,
hgroup:{
h1:1,
h2:1,
h3:1,
h4:1,
h5:1,
h6:1
},
hr:g,
html:d({
head:1,
body:1
}, a, j),
i:c,
iframe:h,
img:g,
input:g,
ins:c,
kbd:c,
keygen:g,
label:c,
legend:c,
li:a,
link:g,
map:a,
mark:c,
menu:d({
li:1
}, a),
meta:g,
meter:e(c, {
meter:1
}),
nav:a,
noscript:d({
link:1,
meta:1,
style:1
}, c),
object:d({
param:1
}, c),
ol:{
li:1
},
optgroup:{
option:1
},
option:h,
output:c,
p:c,
param:g,
pre:c,
progress:e(c, {
progress:1
}),
q:c,
rp:c,
rt:c,
ruby:d({
rp:1,
rt:1
}, c),
s:c,
samp:c,
script:h,
section:d({
style:1
}, a),
select:{
optgroup:1,
option:1
},
small:c,
source:g,
span:c,
strong:c,
style:h,
sub:c,
summary:c,
sup:c,
table:{
caption:1,
colgroup:1,
thead:1,
tfoot:1,
tbody:1,
tr:1
},
tbody:{
tr:1
},
td:a,
textarea:h,
tfoot:{
tr:1
},
th:a,
thead:{
tr:1
},
time:e(c, {
time:1
}),
title:h,
tr:{
th:1,
td:1
},
track:g,
u:c,
ul:{
li:1
},
"var":c,
video:d({
source:1,
track:1
}, a),
wbr:g,
acronym:c,
applet:d({
param:1
}, a),
basefont:g,
big:c,
center:a,
dialog:g,
dir:{
li:1
},
font:c,
isindex:g,
noframes:a,
strike:c,
tt:c
}, d(e, {
$block:d({
audio:1,
dd:1,
dt:1,
figcaption:1,
li:1,
video:1
}, b, f),
$blockLimit:{
article:1,
aside:1,
audio:1,
body:1,
caption:1,
details:1,
dir:1,
div:1,
dl:1,
fieldset:1,
figcaption:1,
figure:1,
footer:1,
form:1,
header:1,
hgroup:1,
menu:1,
nav:1,
ol:1,
section:1,
table:1,
td:1,
th:1,
tr:1,
ul:1,
video:1
},
$cdata:{
script:1,
style:1
},
$editable:{
address:1,
article:1,
aside:1,
blockquote:1,
body:1,
details:1,
div:1,
fieldset:1,
figcaption:1,
footer:1,
form:1,
h1:1,
h2:1,
h3:1,
h4:1,
h5:1,
h6:1,
header:1,
hgroup:1,
nav:1,
p:1,
pre:1,
section:1
},
$empty:{
area:1,
base:1,
basefont:1,
br:1,
col:1,
command:1,
dialog:1,
embed:1,
hr:1,
img:1,
input:1,
isindex:1,
keygen:1,
link:1,
meta:1,
param:1,
source:1,
track:1,
wbr:1
},
$inline:c,
$list:{
dl:1,
ol:1,
ul:1
},
$listItem:{
dd:1,
dt:1,
li:1
},
$nonBodyContent:d({
body:1,
head:1,
html:1
}, e.head),
$nonEditable:{
applet:1,
audio:1,
button:1,
embed:1,
iframe:1,
map:1,
object:1,
option:1,
param:1,
script:1,
textarea:1,
video:1
},
$object:{
applet:1,
audio:1,
button:1,
hr:1,
iframe:1,
img:1,
input:1,
object:1,
select:1,
table:1,
textarea:1,
video:1
},
$removeEmpty:{
abbr:1,
acronym:1,
b:1,
bdi:1,
bdo:1,
big:1,
cite:1,
code:1,
del:1,
dfn:1,
em:1,
font:1,
i:1,
ins:1,
label:1,
kbd:1,
mark:1,
meter:1,
output:1,
q:1,
ruby:1,
s:1,
samp:1,
small:1,
span:1,
strike:1,
strong:1,
sub:1,
sup:1,
time:1,
tt:1,
u:1,
"var":1
},
$tabIndex:{
a:1,
area:1,
button:1,
input:1,
object:1,
select:1,
textarea:1
},
$tableContent:{
caption:1,
col:1,
colgroup:1,
tbody:1,
td:1,
tfoot:1,
th:1,
thead:1,
tr:1
},
$transparent:{
a:1,
audio:1,
canvas:1,
del:1,
ins:1,
map:1,
noscript:1,
object:1,
video:1
},
$intermediate:{
caption:1,
colgroup:1,
dd:1,
dt:1,
figcaption:1,
legend:1,
li:1,
optgroup:1,
option:1,
rp:1,
rt:1,
summary:1,
tbody:1,
td:1,
tfoot:1,
th:1,
thead:1,
tr:1
}
}), e;
}(), CKEDITOR.dom.event = function(d) {
this.$ = d;
}, CKEDITOR.dom.event.prototype = {
getKey:function() {
return this.$.keyCode || this.$.which;
},
getKeystroke:function() {
var d = this.getKey();
return (this.$.ctrlKey || this.$.metaKey) && (d += CKEDITOR.CTRL), this.$.shiftKey && (d += CKEDITOR.SHIFT), 
this.$.altKey && (d += CKEDITOR.ALT), d;
},
preventDefault:function(d) {
var e = this.$;
e.preventDefault ? e.preventDefault() :e.returnValue = !1, d && this.stopPropagation();
},
stopPropagation:function() {
var d = this.$;
d.stopPropagation ? d.stopPropagation() :d.cancelBubble = !0;
},
getTarget:function() {
var d = this.$.target || this.$.srcElement;
return d ? new CKEDITOR.dom.node(d) :null;
},
getPhase:function() {
return this.$.eventPhase || 2;
},
getPageOffset:function() {
var d = this.getTarget().getDocument().$;
return {
x:this.$.pageX || this.$.clientX + (d.documentElement.scrollLeft || d.body.scrollLeft),
y:this.$.pageY || this.$.clientY + (d.documentElement.scrollTop || d.body.scrollTop)
};
}
}, CKEDITOR.CTRL = 1114112, CKEDITOR.SHIFT = 2228224, CKEDITOR.ALT = 4456448, CKEDITOR.EVENT_PHASE_CAPTURING = 1, 
CKEDITOR.EVENT_PHASE_AT_TARGET = 2, CKEDITOR.EVENT_PHASE_BUBBLING = 3, CKEDITOR.dom.domObject = function(d) {
d && (this.$ = d);
}, CKEDITOR.dom.domObject.prototype = function() {
var d = function(d, c) {
return function(a) {
"undefined" != typeof CKEDITOR && d.fire(c, new CKEDITOR.dom.event(a));
};
};
return {
getPrivate:function() {
var d;
return (d = this.getCustomData("_")) || this.setCustomData("_", d = {}), d;
},
on:function(e) {
var c = this.getCustomData("_cke_nativeListeners");
return c || (c = {}, this.setCustomData("_cke_nativeListeners", c)), c[e] || (c = c[e] = d(this, e), 
this.$.addEventListener ? this.$.addEventListener(e, c, !!CKEDITOR.event.useCapture) :this.$.attachEvent && this.$.attachEvent("on" + e, c)), 
CKEDITOR.event.prototype.on.apply(this, arguments);
},
removeListener:function(d) {
if (CKEDITOR.event.prototype.removeListener.apply(this, arguments), !this.hasListeners(d)) {
var c = this.getCustomData("_cke_nativeListeners"), a = c && c[d];
a && (this.$.removeEventListener ? this.$.removeEventListener(d, a, !1) :this.$.detachEvent && this.$.detachEvent("on" + d, a), 
delete c[d]);
}
},
removeAllListeners:function() {
var c, d = this.getCustomData("_cke_nativeListeners");
for (c in d) {
var a = d[c];
this.$.detachEvent ? this.$.detachEvent("on" + c, a) :this.$.removeEventListener && this.$.removeEventListener(c, a, !1), 
delete d[c];
}
}
};
}(), function(d) {
var e = {};
CKEDITOR.on("reset", function() {
e = {};
}), d.equals = function(c) {
try {
return c && c.$ === this.$;
} catch (a) {
return !1;
}
}, d.setCustomData = function(c, a) {
var b = this.getUniqueId();
return (e[b] || (e[b] = {}))[c] = a, this;
}, d.getCustomData = function(c) {
var a = this.$["data-cke-expando"];
return (a = a && e[a]) && c in a ? a[c] :null;
}, d.removeCustomData = function(c) {
var b, d, a = this.$["data-cke-expando"], a = a && e[a];
return a && (b = a[c], d = c in a, delete a[c]), d ? b :null;
}, d.clearCustomData = function() {
this.removeAllListeners();
var c = this.$["data-cke-expando"];
c && delete e[c];
}, d.getUniqueId = function() {
return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber());
}, CKEDITOR.event.implementOn(d);
}(CKEDITOR.dom.domObject.prototype), CKEDITOR.dom.node = function(d) {
return d ? new CKEDITOR.dom[d.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" :d.nodeType == CKEDITOR.NODE_ELEMENT ? "element" :d.nodeType == CKEDITOR.NODE_TEXT ? "text" :d.nodeType == CKEDITOR.NODE_COMMENT ? "comment" :d.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" :"domObject"](d) :this;
}, CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject(), CKEDITOR.NODE_ELEMENT = 1, 
CKEDITOR.NODE_DOCUMENT = 9, CKEDITOR.NODE_TEXT = 3, CKEDITOR.NODE_COMMENT = 8, CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11, 
CKEDITOR.POSITION_IDENTICAL = 0, CKEDITOR.POSITION_DISCONNECTED = 1, CKEDITOR.POSITION_FOLLOWING = 2, 
CKEDITOR.POSITION_PRECEDING = 4, CKEDITOR.POSITION_IS_CONTAINED = 8, CKEDITOR.POSITION_CONTAINS = 16, 
CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
appendTo:function(d, e) {
return d.append(this, e), d;
},
clone:function(d, e) {
var c = this.$.cloneNode(d), a = function(b) {
if (b["data-cke-expando"] && (b["data-cke-expando"] = !1), b.nodeType == CKEDITOR.NODE_ELEMENT && (e || b.removeAttribute("id", !1), 
d)) for (var b = b.childNodes, c = 0; c < b.length; c++) a(b[c]);
};
return a(c), new CKEDITOR.dom.node(c);
},
hasPrevious:function() {
return !!this.$.previousSibling;
},
hasNext:function() {
return !!this.$.nextSibling;
},
insertAfter:function(d) {
return d.$.parentNode.insertBefore(this.$, d.$.nextSibling), d;
},
insertBefore:function(d) {
return d.$.parentNode.insertBefore(this.$, d.$), d;
},
insertBeforeMe:function(d) {
return this.$.parentNode.insertBefore(d.$, this.$), d;
},
getAddress:function(d) {
for (var e = [], c = this.getDocument().$.documentElement, a = this.$; a && a != c; ) {
var b = a.parentNode;
b && e.unshift(this.getIndex.call({
$:a
}, d)), a = b;
}
return e;
},
getDocument:function() {
return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument);
},
getIndex:function(d) {
var a, e = this.$, c = -1;
if (!this.$.parentNode) return c;
do (!d || e == this.$ || e.nodeType != CKEDITOR.NODE_TEXT || !a && e.nodeValue) && (c++, 
a = e.nodeType == CKEDITOR.NODE_TEXT); while (e = e.previousSibling);
return c;
},
getNextSourceNode:function(d, e, c) {
if (c && !c.call) var a = c, c = function(b) {
return !b.equals(a);
};
var b, d = !d && this.getFirst && this.getFirst();
if (!d) {
if (this.type == CKEDITOR.NODE_ELEMENT && c && c(this, !0) === !1) return null;
d = this.getNext();
}
for (;!d && (b = (b || this).getParent()); ) {
if (c && c(b, !0) === !1) return null;
d = b.getNext();
}
return !d || c && c(d) === !1 ? null :e && e != d.type ? d.getNextSourceNode(!1, e, c) :d;
},
getPreviousSourceNode:function(d, e, c) {
if (c && !c.call) var a = c, c = function(b) {
return !b.equals(a);
};
var b, d = !d && this.getLast && this.getLast();
if (!d) {
if (this.type == CKEDITOR.NODE_ELEMENT && c && c(this, !0) === !1) return null;
d = this.getPrevious();
}
for (;!d && (b = (b || this).getParent()); ) {
if (c && c(b, !0) === !1) return null;
d = b.getPrevious();
}
return !d || c && c(d) === !1 ? null :e && d.type != e ? d.getPreviousSourceNode(!1, e, c) :d;
},
getPrevious:function(d) {
var c, e = this.$;
do c = (e = e.previousSibling) && 10 != e.nodeType && new CKEDITOR.dom.node(e); while (c && d && !d(c));
return c;
},
getNext:function(d) {
var c, e = this.$;
do c = (e = e.nextSibling) && new CKEDITOR.dom.node(e); while (c && d && !d(c));
return c;
},
getParent:function(d) {
var e = this.$.parentNode;
return e && (e.nodeType == CKEDITOR.NODE_ELEMENT || d && e.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(e) :null;
},
getParents:function(d) {
var e = this, c = [];
do c[d ? "push" :"unshift"](e); while (e = e.getParent());
return c;
},
getCommonAncestor:function(d) {
if (d.equals(this)) return this;
if (d.contains && d.contains(this)) return d;
var e = this.contains ? this :this.getParent();
do if (e.contains(d)) return e; while (e = e.getParent());
return null;
},
getPosition:function(d) {
var e = this.$, c = d.$;
if (e.compareDocumentPosition) return e.compareDocumentPosition(c);
if (e == c) return CKEDITOR.POSITION_IDENTICAL;
if (this.type == CKEDITOR.NODE_ELEMENT && d.type == CKEDITOR.NODE_ELEMENT) {
if (e.contains) {
if (e.contains(c)) return CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING;
if (c.contains(e)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING;
}
if ("sourceIndex" in e) return e.sourceIndex < 0 || c.sourceIndex < 0 ? CKEDITOR.POSITION_DISCONNECTED :e.sourceIndex < c.sourceIndex ? CKEDITOR.POSITION_PRECEDING :CKEDITOR.POSITION_FOLLOWING;
}
for (var e = this.getAddress(), d = d.getAddress(), c = Math.min(e.length, d.length), a = 0; c - 1 >= a; a++) if (e[a] != d[a]) {
if (c > a) return e[a] < d[a] ? CKEDITOR.POSITION_PRECEDING :CKEDITOR.POSITION_FOLLOWING;
break;
}
return e.length < d.length ? CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING :CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING;
},
getAscendant:function(d, e) {
var a, c = this.$;
for (e || (c = c.parentNode); c; ) {
if (c.nodeName && (a = c.nodeName.toLowerCase(), "string" == typeof d ? a == d :a in d)) return new CKEDITOR.dom.node(c);
try {
c = c.parentNode;
} catch (b) {
c = null;
}
}
return null;
},
hasAscendant:function(d, e) {
var c = this.$;
for (e || (c = c.parentNode); c; ) {
if (c.nodeName && c.nodeName.toLowerCase() == d) return !0;
c = c.parentNode;
}
return !1;
},
move:function(d, e) {
d.append(this.remove(), e);
},
remove:function(d) {
var e = this.$, c = e.parentNode;
if (c) {
if (d) for (;d = e.firstChild; ) c.insertBefore(e.removeChild(d), e);
c.removeChild(e);
}
return this;
},
replace:function(d) {
this.insertBefore(d), d.remove();
},
trim:function() {
this.ltrim(), this.rtrim();
},
ltrim:function() {
for (var d; this.getFirst && (d = this.getFirst()); ) {
if (d.type == CKEDITOR.NODE_TEXT) {
var e = CKEDITOR.tools.ltrim(d.getText()), c = d.getLength();
if (!e) {
d.remove();
continue;
}
e.length < c && (d.split(c - e.length), this.$.removeChild(this.$.firstChild));
}
break;
}
},
rtrim:function() {
for (var d; this.getLast && (d = this.getLast()); ) {
if (d.type == CKEDITOR.NODE_TEXT) {
var e = CKEDITOR.tools.rtrim(d.getText()), c = d.getLength();
if (!e) {
d.remove();
continue;
}
e.length < c && (d.split(e.length), this.$.lastChild.parentNode.removeChild(this.$.lastChild));
}
break;
}
CKEDITOR.env.needsBrFiller && (d = this.$.lastChild) && 1 == d.type && "br" == d.nodeName.toLowerCase() && d.parentNode.removeChild(d);
},
isReadOnly:function() {
var d = this;
if (this.type != CKEDITOR.NODE_ELEMENT && (d = this.getParent()), d && "undefined" != typeof d.$.isContentEditable) return !(d.$.isContentEditable || d.data("cke-editable"));
for (;d && !d.data("cke-editable"); ) {
if ("false" == d.getAttribute("contentEditable")) return !0;
if ("true" == d.getAttribute("contentEditable")) break;
d = d.getParent();
}
return !d;
}
}), CKEDITOR.dom.window = function(d) {
CKEDITOR.dom.domObject.call(this, d);
}, CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject(), CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
focus:function() {
this.$.focus();
},
getViewPaneSize:function() {
var d = this.$.document, e = "CSS1Compat" == d.compatMode;
return {
width:(e ? d.documentElement.clientWidth :d.body.clientWidth) || 0,
height:(e ? d.documentElement.clientHeight :d.body.clientHeight) || 0
};
},
getScrollPosition:function() {
var d = this.$;
return "pageXOffset" in d ? {
x:d.pageXOffset || 0,
y:d.pageYOffset || 0
} :(d = d.document, {
x:d.documentElement.scrollLeft || d.body.scrollLeft || 0,
y:d.documentElement.scrollTop || d.body.scrollTop || 0
});
},
getFrame:function() {
var d = this.$.frameElement;
return d ? new CKEDITOR.dom.element.get(d) :null;
}
}), CKEDITOR.dom.document = function(d) {
CKEDITOR.dom.domObject.call(this, d);
}, CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject(), CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
type:CKEDITOR.NODE_DOCUMENT,
appendStyleSheet:function(d) {
if (this.$.createStyleSheet) this.$.createStyleSheet(d); else {
var e = new CKEDITOR.dom.element("link");
e.setAttributes({
rel:"stylesheet",
type:"text/css",
href:d
}), this.getHead().append(e);
}
},
appendStyleText:function(d) {
if (this.$.createStyleSheet) {
var e = this.$.createStyleSheet("");
e.cssText = d;
} else {
var c = new CKEDITOR.dom.element("style", this);
c.append(new CKEDITOR.dom.text(d, this)), this.getHead().append(c);
}
return e || c.$.sheet;
},
createElement:function(d, e) {
var c = new CKEDITOR.dom.element(d, this);
return e && (e.attributes && c.setAttributes(e.attributes), e.styles && c.setStyles(e.styles)), 
c;
},
createText:function(d) {
return new CKEDITOR.dom.text(d, this);
},
focus:function() {
this.getWindow().focus();
},
getActive:function() {
return new CKEDITOR.dom.element(this.$.activeElement);
},
getById:function(d) {
return (d = this.$.getElementById(d)) ? new CKEDITOR.dom.element(d) :null;
},
getByAddress:function(d, e) {
for (var c = this.$.documentElement, a = 0; c && a < d.length; a++) {
var b = d[a];
if (e) for (var j = -1, g = 0; g < c.childNodes.length; g++) {
var h = c.childNodes[g];
if ((e !== !0 || 3 != h.nodeType || !h.previousSibling || 3 != h.previousSibling.nodeType) && (j++, 
j == b)) {
c = h;
break;
}
} else c = c.childNodes[b];
}
return c ? new CKEDITOR.dom.node(c) :null;
},
getElementsByTag:function(d, e) {
return (!CKEDITOR.env.ie || document.documentMode > 8) && e && (d = e + ":" + d), 
new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(d));
},
getHead:function() {
var d = this.$.getElementsByTagName("head")[0];
return d = d ? new CKEDITOR.dom.element(d) :this.getDocumentElement().append(new CKEDITOR.dom.element("head"), !0);
},
getBody:function() {
return new CKEDITOR.dom.element(this.$.body);
},
getDocumentElement:function() {
return new CKEDITOR.dom.element(this.$.documentElement);
},
getWindow:function() {
return new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView);
},
write:function(d) {
this.$.open("text/html", "replace"), CKEDITOR.env.ie && (d = d.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$&\n<script data-cke-temp="1">(' + CKEDITOR.tools.fixDomain + ")();</script>")), 
this.$.write(d), this.$.close();
},
find:function(d) {
return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(d));
},
findOne:function(d) {
return (d = this.$.querySelector(d)) ? new CKEDITOR.dom.element(d) :null;
},
_getHtml5ShivFrag:function() {
var d = this.getCustomData("html5ShivFrag");
return d || (d = this.$.createDocumentFragment(), CKEDITOR.tools.enableHtml5Elements(d, !0), 
this.setCustomData("html5ShivFrag", d)), d;
}
}), CKEDITOR.dom.nodeList = function(d) {
this.$ = d;
}, CKEDITOR.dom.nodeList.prototype = {
count:function() {
return this.$.length;
},
getItem:function(d) {
return 0 > d || d >= this.$.length ? null :(d = this.$[d]) ? new CKEDITOR.dom.node(d) :null;
}
}, CKEDITOR.dom.element = function(d, e) {
"string" == typeof d && (d = (e ? e.$ :document).createElement(d)), CKEDITOR.dom.domObject.call(this, d);
}, CKEDITOR.dom.element.get = function(d) {
return (d = "string" == typeof d ? document.getElementById(d) || document.getElementsByName(d)[0] :d) && (d.$ ? d :new CKEDITOR.dom.element(d));
}, CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node(), CKEDITOR.dom.element.createFromHtml = function(d, e) {
var c = new CKEDITOR.dom.element("div", e);
return c.setHtml(d), c.getFirst().remove();
}, CKEDITOR.dom.element.setMarker = function(d, e, c, a) {
var b = e.getCustomData("list_marker_id") || e.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"), j = e.getCustomData("list_marker_names") || e.setCustomData("list_marker_names", {}).getCustomData("list_marker_names");
return d[b] = e, j[c] = 1, e.setCustomData(c, a);
}, CKEDITOR.dom.element.clearAllMarkers = function(d) {
for (var e in d) CKEDITOR.dom.element.clearMarkers(d, d[e], 1);
}, CKEDITOR.dom.element.clearMarkers = function(d, e, c) {
var j, a = e.getCustomData("list_marker_names"), b = e.getCustomData("list_marker_id");
for (j in a) e.removeCustomData(j);
e.removeCustomData("list_marker_names"), c && (e.removeCustomData("list_marker_id"), 
delete d[b]);
}, function() {
function d(b) {
var a = !0;
return b.$.id || (b.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber(), a = !1), 
function() {
a || b.removeAttribute("id");
};
}
function e(b, a) {
return "#" + b.$.id + " " + a.split(/,\s*/).join(", #" + b.$.id + " ");
}
function c(b) {
for (var c = 0, d = 0, e = a[b].length; e > d; d++) c += parseInt(this.getComputedStyle(a[b][d]) || 0, 10) || 0;
return c;
}
CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
type:CKEDITOR.NODE_ELEMENT,
addClass:function(b) {
var a = this.$.className;
a && (RegExp("(?:^|\\s)" + b + "(?:\\s|$)", "").test(a) || (a += " " + b)), this.$.className = a || b;
},
removeClass:function(b) {
var a = this.getAttribute("class");
return a && (b = RegExp("(?:^|\\s+)" + b + "(?=\\s|$)", "i"), b.test(a) && ((a = a.replace(b, "").replace(/^\s+/, "")) ? this.setAttribute("class", a) :this.removeAttribute("class"))), 
this;
},
hasClass:function(b) {
return RegExp("(?:^|\\s+)" + b + "(?=\\s|$)", "").test(this.getAttribute("class"));
},
append:function(b, a) {
return "string" == typeof b && (b = this.getDocument().createElement(b)), a ? this.$.insertBefore(b.$, this.$.firstChild) :this.$.appendChild(b.$), 
b;
},
appendHtml:function(b) {
if (this.$.childNodes.length) {
var a = new CKEDITOR.dom.element("div", this.getDocument());
a.setHtml(b), a.moveChildren(this);
} else this.setHtml(b);
},
appendText:function(b) {
void 0 != this.$.text ? this.$.text = this.$.text + b :this.append(new CKEDITOR.dom.text(b));
},
appendBogus:function(b) {
if (b || CKEDITOR.env.needsBrFiller || CKEDITOR.env.opera) {
for (b = this.getLast(); b && b.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(b.getText()); ) b = b.getPrevious();
b && b.is && b.is("br") || (b = CKEDITOR.env.opera ? this.getDocument().createText("") :this.getDocument().createElement("br"), 
CKEDITOR.env.gecko && b.setAttribute("type", "_moz"), this.append(b));
}
},
breakParent:function(b) {
var a = new CKEDITOR.dom.range(this.getDocument());
a.setStartAfter(this), a.setEndAfter(b), b = a.extractContents(), a.insertNode(this.remove()), 
b.insertAfterNode(this);
},
contains:CKEDITOR.env.ie || CKEDITOR.env.webkit ? function(b) {
var a = this.$;
return b.type != CKEDITOR.NODE_ELEMENT ? a.contains(b.getParent().$) :a != b.$ && a.contains(b.$);
} :function(b) {
return !!(16 & this.$.compareDocumentPosition(b.$));
},
focus:function() {
function b() {
try {
this.$.focus();
} catch (b) {}
}
return function(a) {
a ? CKEDITOR.tools.setTimeout(b, 100, this) :b.call(this);
};
}(),
getHtml:function() {
var b = this.$.innerHTML;
return CKEDITOR.env.ie ? b.replace(/<\?[^>]*>/g, "") :b;
},
getOuterHtml:function() {
if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/, "");
var b = this.$.ownerDocument.createElement("div");
return b.appendChild(this.$.cloneNode(!0)), b.innerHTML;
},
getClientRect:function() {
var b = CKEDITOR.tools.extend({}, this.$.getBoundingClientRect());
return !b.width && (b.width = b.right - b.left), !b.height && (b.height = b.bottom - b.top), 
b;
},
setHtml:CKEDITOR.env.ie && CKEDITOR.env.version < 9 ? function(b) {
try {
var a = this.$;
if (this.getParent()) return a.innerHTML = b;
var c = this.getDocument()._getHtml5ShivFrag();
return c.appendChild(a), a.innerHTML = b, c.removeChild(a), b;
} catch (d) {
for (this.$.innerHTML = "", a = new CKEDITOR.dom.element("body", this.getDocument()), 
a.$.innerHTML = b, a = a.getChildren(); a.count(); ) this.append(a.getItem(0));
return b;
}
} :function(b) {
return this.$.innerHTML = b;
},
setText:function(b) {
return CKEDITOR.dom.element.prototype.setText = void 0 != this.$.innerText ? function(b) {
return this.$.innerText = b;
} :function(b) {
return this.$.textContent = b;
}, this.setText(b);
},
getAttribute:function() {
var b = function(b) {
return this.$.getAttribute(b, 2);
};
return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function(b) {
switch (b) {
case "class":
b = "className";
break;

case "http-equiv":
b = "httpEquiv";
break;

case "name":
return this.$.name;

case "tabindex":
return b = this.$.getAttribute(b, 2), 0 !== b && 0 === this.$.tabIndex && (b = null), 
b;

case "checked":
return b = this.$.attributes.getNamedItem(b), (b.specified ? b.nodeValue :this.$.checked) ? "checked" :null;

case "hspace":
case "value":
return this.$[b];

case "style":
return this.$.style.cssText;

case "contenteditable":
case "contentEditable":
return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") :null;
}
return this.$.getAttribute(b, 2);
} :b;
}(),
getChildren:function() {
return new CKEDITOR.dom.nodeList(this.$.childNodes);
},
getComputedStyle:CKEDITOR.env.ie ? function(b) {
return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(b)];
} :function(b) {
var a = this.getWindow().$.getComputedStyle(this.$, null);
return a ? a.getPropertyValue(b) :"";
},
getDtd:function() {
var b = CKEDITOR.dtd[this.getName()];
return this.getDtd = function() {
return b;
}, b;
},
getElementsByTag:CKEDITOR.dom.document.prototype.getElementsByTag,
getTabIndex:CKEDITOR.env.ie ? function() {
var b = this.$.tabIndex;
return 0 === b && !CKEDITOR.dtd.$tabIndex[this.getName()] && 0 !== parseInt(this.getAttribute("tabindex"), 10) && (b = -1), 
b;
} :CKEDITOR.env.webkit ? function() {
var b = this.$.tabIndex;
return void 0 == b && (b = parseInt(this.getAttribute("tabindex"), 10), isNaN(b) && (b = -1)), 
b;
} :function() {
return this.$.tabIndex;
},
getText:function() {
return this.$.textContent || this.$.innerText || "";
},
getWindow:function() {
return this.getDocument().getWindow();
},
getId:function() {
return this.$.id || null;
},
getNameAtt:function() {
return this.$.name || null;
},
getName:function() {
var b = this.$.nodeName.toLowerCase();
if (CKEDITOR.env.ie && !(document.documentMode > 8)) {
var a = this.$.scopeName;
"HTML" != a && (b = a.toLowerCase() + ":" + b);
}
return (this.getName = function() {
return b;
})();
},
getValue:function() {
return this.$.value;
},
getFirst:function(b) {
var a = this.$.firstChild;
return (a = a && new CKEDITOR.dom.node(a)) && b && !b(a) && (a = a.getNext(b)), 
a;
},
getLast:function(b) {
var a = this.$.lastChild;
return (a = a && new CKEDITOR.dom.node(a)) && b && !b(a) && (a = a.getPrevious(b)), 
a;
},
getStyle:function(b) {
return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(b)];
},
is:function() {
var b = this.getName();
if ("object" == typeof arguments[0]) return !!arguments[0][b];
for (var a = 0; a < arguments.length; a++) if (arguments[a] == b) return !0;
return !1;
},
isEditable:function(b) {
var a = this.getName();
return this.isReadOnly() || "none" == this.getComputedStyle("display") || "hidden" == this.getComputedStyle("visibility") || CKEDITOR.dtd.$nonEditable[a] || CKEDITOR.dtd.$empty[a] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount() ? !1 :b !== !1 ? (b = CKEDITOR.dtd[a] || CKEDITOR.dtd.span, 
!(!b || !b["#"])) :!0;
},
isIdentical:function(b) {
var a = this.clone(0, 1), b = b.clone(0, 1);
if (a.removeAttributes([ "_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name" ]), 
b.removeAttributes([ "_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name" ]), 
a.$.isEqualNode) return a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText), 
b.$.style.cssText = CKEDITOR.tools.normalizeCssText(b.$.style.cssText), a.$.isEqualNode(b.$);
if (a = a.getOuterHtml(), b = b.getOuterHtml(), CKEDITOR.env.ie && CKEDITOR.env.version < 9 && this.is("a")) {
var c = this.getParent();
c.type == CKEDITOR.NODE_ELEMENT && (c = c.clone(), c.setHtml(a), a = c.getHtml(), 
c.setHtml(b), b = c.getHtml());
}
return a == b;
},
isVisible:function() {
var a, c, b = (this.$.offsetHeight || this.$.offsetWidth) && "hidden" != this.getComputedStyle("visibility");
return b && (CKEDITOR.env.webkit || CKEDITOR.env.opera) && (a = this.getWindow(), 
!a.equals(CKEDITOR.document.getWindow()) && (c = a.$.frameElement) && (b = new CKEDITOR.dom.element(c).isVisible())), 
!!b;
},
isEmptyInlineRemoveable:function() {
if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return !1;
for (var b = this.getChildren(), a = 0, c = b.count(); c > a; a++) {
var d = b.getItem(a);
if ((d.type != CKEDITOR.NODE_ELEMENT || !d.data("cke-bookmark")) && (d.type == CKEDITOR.NODE_ELEMENT && !d.isEmptyInlineRemoveable() || d.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(d.getText()))) return !1;
}
return !0;
},
hasAttributes:CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function() {
for (var b = this.$.attributes, a = 0; a < b.length; a++) {
var c = b[a];
switch (c.nodeName) {
case "class":
if (this.getAttribute("class")) return !0;

case "data-cke-expando":
continue;

default:
if (c.specified) return !0;
}
}
return !1;
} :function() {
var b = this.$.attributes, a = b.length, c = {
"data-cke-expando":1,
_moz_dirty:1
};
return a > 0 && (a > 2 || !c[b[0].nodeName] || 2 == a && !c[b[1].nodeName]);
},
hasAttribute:function() {
function b(b) {
return b = this.$.attributes.getNamedItem(b), !(!b || !b.specified);
}
return CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? function(a) {
return "name" == a ? !!this.$.name :b.call(this, a);
} :b;
}(),
hide:function() {
this.setStyle("display", "none");
},
moveChildren:function(b, a) {
var c = this.$, b = b.$;
if (c != b) {
var d;
if (a) for (;d = c.lastChild; ) b.insertBefore(c.removeChild(d), b.firstChild); else for (;d = c.firstChild; ) b.appendChild(c.removeChild(d));
}
},
mergeSiblings:function() {
function b(b, a, c) {
if (a && a.type == CKEDITOR.NODE_ELEMENT) {
for (var d = []; a.data("cke-bookmark") || a.isEmptyInlineRemoveable(); ) if (d.push(a), 
a = c ? a.getNext() :a.getPrevious(), !a || a.type != CKEDITOR.NODE_ELEMENT) return;
if (b.isIdentical(a)) {
for (var e = c ? b.getLast() :b.getFirst(); d.length; ) d.shift().move(b, !c);
a.moveChildren(b, !c), a.remove(), e && e.type == CKEDITOR.NODE_ELEMENT && e.mergeSiblings();
}
}
}
return function(a) {
(a === !1 || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) && (b(this, this.getNext(), !0), 
b(this, this.getPrevious()));
};
}(),
show:function() {
this.setStyles({
display:"",
visibility:""
});
},
setAttribute:function() {
var b = function(b, a) {
return this.$.setAttribute(b, a), this;
};
return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function(a, c) {
return "class" == a ? this.$.className = c :"style" == a ? this.$.style.cssText = c :"tabindex" == a ? this.$.tabIndex = c :"checked" == a ? this.$.checked = c :"contenteditable" == a ? b.call(this, "contentEditable", c) :b.apply(this, arguments), 
this;
} :CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function(a, c) {
if ("src" == a && c.match(/^http:\/\//)) try {
b.apply(this, arguments);
} catch (d) {} else b.apply(this, arguments);
return this;
} :b;
}(),
setAttributes:function(b) {
for (var a in b) this.setAttribute(a, b[a]);
return this;
},
setValue:function(b) {
return this.$.value = b, this;
},
removeAttribute:function() {
var b = function(b) {
this.$.removeAttribute(b);
};
return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function(b) {
"class" == b ? b = "className" :"tabindex" == b ? b = "tabIndex" :"contenteditable" == b && (b = "contentEditable"), 
this.$.removeAttribute(b);
} :b;
}(),
removeAttributes:function(b) {
if (CKEDITOR.tools.isArray(b)) for (var a = 0; a < b.length; a++) this.removeAttribute(b[a]); else for (a in b) b.hasOwnProperty(a) && this.removeAttribute(a);
},
removeStyle:function(b) {
var a = this.$.style;
if (a.removeProperty || "border" != b && "margin" != b && "padding" != b) a.removeProperty ? a.removeProperty(b) :a.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(b)), 
this.$.style.cssText || this.removeAttribute("style"); else {
var d, c = [ "top", "left", "right", "bottom" ];
"border" == b && (d = [ "color", "style", "width" ]);
for (var a = [], f = 0; f < c.length; f++) if (d) for (var e = 0; e < d.length; e++) a.push([ b, c[f], d[e] ].join("-")); else a.push([ b, c[f] ].join("-"));
for (b = 0; b < a.length; b++) this.removeStyle(a[b]);
}
},
setStyle:function(b, a) {
return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(b)] = a, this;
},
setStyles:function(b) {
for (var a in b) this.setStyle(a, b[a]);
return this;
},
setOpacity:function(b) {
CKEDITOR.env.ie && CKEDITOR.env.version < 9 ? (b = Math.round(100 * b), this.setStyle("filter", b >= 100 ? "" :"progid:DXImageTransform.Microsoft.Alpha(opacity=" + b + ")")) :this.setStyle("opacity", b);
},
unselectable:function() {
if (this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "none")), CKEDITOR.env.ie || CKEDITOR.env.opera) {
this.setAttribute("unselectable", "on");
for (var b, a = this.getElementsByTag("*"), c = 0, d = a.count(); d > c; c++) b = a.getItem(c), 
b.setAttribute("unselectable", "on");
}
},
getPositionedAncestor:function() {
for (var b = this; "html" != b.getName(); ) {
if ("static" != b.getComputedStyle("position")) return b;
b = b.getParent();
}
return null;
},
getDocumentPosition:function(b) {
var a = 0, c = 0, d = this.getDocument(), f = d.getBody(), e = "BackCompat" == d.$.compatMode;
if (document.documentElement.getBoundingClientRect) {
var k = this.$.getBoundingClientRect(), n = d.$.documentElement, o = n.clientTop || f.$.clientTop || 0, q = n.clientLeft || f.$.clientLeft || 0, l = !0;
CKEDITOR.env.ie && (l = d.getDocumentElement().contains(this), d = d.getBody().contains(this), 
l = e && d || !e && l), l && (a = k.left + (!e && n.scrollLeft || f.$.scrollLeft), 
a -= q, c = k.top + (!e && n.scrollTop || f.$.scrollTop), c -= o);
} else for (f = this, d = null; f && "body" != f.getName() && "html" != f.getName(); ) {
for (a += f.$.offsetLeft - f.$.scrollLeft, c += f.$.offsetTop - f.$.scrollTop, f.equals(this) || (a += f.$.clientLeft || 0, 
c += f.$.clientTop || 0); d && !d.equals(f); ) a -= d.$.scrollLeft, c -= d.$.scrollTop, 
d = d.getParent();
d = f, f = (k = f.$.offsetParent) ? new CKEDITOR.dom.element(k) :null;
}
return b && (f = this.getWindow(), d = b.getWindow(), !f.equals(d) && f.$.frameElement && (b = new CKEDITOR.dom.element(f.$.frameElement).getDocumentPosition(b), 
a += b.x, c += b.y)), document.documentElement.getBoundingClientRect || !CKEDITOR.env.gecko || e || (a += this.$.clientLeft ? 1 :0, 
c += this.$.clientTop ? 1 :0), {
x:a,
y:c
};
},
scrollIntoView:function(b) {
var a = this.getParent();
if (a) do if ((a.$.clientWidth && a.$.clientWidth < a.$.scrollWidth || a.$.clientHeight && a.$.clientHeight < a.$.scrollHeight) && !a.is("body") && this.scrollIntoParent(a, b, 1), 
a.is("html")) {
var c = a.getWindow();
try {
var d = c.$.frameElement;
d && (a = new CKEDITOR.dom.element(d));
} catch (f) {}
} while (a = a.getParent());
},
scrollIntoParent:function(b, a, c) {
function n(a, c) {
/body|html/.test(b.getName()) ? b.getWindow().$.scrollBy(a, c) :(b.$.scrollLeft = b.$.scrollLeft + a, 
b.$.scrollTop = b.$.scrollTop + c);
}
function o(b, a) {
var c = {
x:0,
y:0
};
if (!b.is(l ? "body" :"html")) {
var d = b.$.getBoundingClientRect();
c.x = d.left, c.y = d.top;
}
return d = b.getWindow(), d.equals(a) || (d = o(CKEDITOR.dom.element.get(d.$.frameElement), a), 
c.x = c.x + d.x, c.y = c.y + d.y), c;
}
function q(b, a) {
return parseInt(b.getComputedStyle("margin-" + a) || 0, 10) || 0;
}
var d, f, e, k;
!b && (b = this.getWindow()), e = b.getDocument();
var l = "BackCompat" == e.$.compatMode;
b instanceof CKEDITOR.dom.window && (b = l ? e.getBody() :e.getDocumentElement()), 
e = b.getWindow(), f = o(this, e);
var m = o(b, e), r = this.$.offsetHeight;
d = this.$.offsetWidth;
var p = b.$.clientHeight, u = b.$.clientWidth;
e = f.x - q(this, "left") - m.x || 0, k = f.y - q(this, "top") - m.y || 0, d = f.x + d + q(this, "right") - (m.x + u) || 0, 
f = f.y + r + q(this, "bottom") - (m.y + p) || 0, (0 > k || f > 0) && n(0, a === !0 ? k :a === !1 ? f :0 > k ? k :f), 
c && (0 > e || d > 0) && n(0 > e ? e :d, 0);
},
setState:function(b, a, c) {
switch (a = a || "cke", b) {
case CKEDITOR.TRISTATE_ON:
this.addClass(a + "_on"), this.removeClass(a + "_off"), this.removeClass(a + "_disabled"), 
c && this.setAttribute("aria-pressed", !0), c && this.removeAttribute("aria-disabled");
break;

case CKEDITOR.TRISTATE_DISABLED:
this.addClass(a + "_disabled"), this.removeClass(a + "_off"), this.removeClass(a + "_on"), 
c && this.setAttribute("aria-disabled", !0), c && this.removeAttribute("aria-pressed");
break;

default:
this.addClass(a + "_off"), this.removeClass(a + "_on"), this.removeClass(a + "_disabled"), 
c && this.removeAttribute("aria-pressed"), c && this.removeAttribute("aria-disabled");
}
},
getFrameDocument:function() {
var a = this.$;
try {
a.contentWindow.document;
} catch (c) {
a.src = a.src;
}
return a && new CKEDITOR.dom.document(a.contentWindow.document);
},
copyAttributes:function(a, c) {
for (var d = this.$.attributes, c = c || {}, e = 0; e < d.length; e++) {
var k, f = d[e], i = f.nodeName.toLowerCase();
i in c || ("checked" == i && (k = this.getAttribute(i)) ? a.setAttribute(i, k) :(f.specified || CKEDITOR.env.ie && f.nodeValue && "value" == i) && (k = this.getAttribute(i), 
null === k && (k = f.nodeValue), a.setAttribute(i, k)));
}
"" !== this.$.style.cssText && (a.$.style.cssText = this.$.style.cssText);
},
renameNode:function(a) {
if (this.getName() != a) {
var c = this.getDocument(), a = new CKEDITOR.dom.element(a, c);
this.copyAttributes(a), this.moveChildren(a), this.getParent() && this.$.parentNode.replaceChild(a.$, this.$), 
a.$["data-cke-expando"] = this.$["data-cke-expando"], this.$ = a.$;
}
},
getChild:function() {
function a(b, c) {
var d = b.childNodes;
return c >= 0 && c < d.length ? d[c] :void 0;
}
return function(c) {
var d = this.$;
if (c.slice) for (;c.length > 0 && d; ) d = a(d, c.shift()); else d = a(d, c);
return d ? new CKEDITOR.dom.node(d) :null;
};
}(),
getChildCount:function() {
return this.$.childNodes.length;
},
disableContextMenu:function() {
this.on("contextmenu", function(a) {
a.data.getTarget().hasClass("cke_enable_context_menu") || a.data.preventDefault();
});
},
getDirection:function(a) {
return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir || "ltr" :this.getStyle("direction") || this.getAttribute("dir");
},
data:function(a, c) {
return a = "data-" + a, void 0 === c ? this.getAttribute(a) :(c === !1 ? this.removeAttribute(a) :this.setAttribute(a, c), 
null);
},
getEditor:function() {
var c, d, a = CKEDITOR.instances;
for (c in a) if (d = a[c], d.element.equals(this) && d.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) return d;
return null;
},
find:function(a) {
var c = d(this), a = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(e(this, a)));
return c(), a;
},
findOne:function(a) {
var c = d(this), a = this.$.querySelector(e(this, a));
return c(), a ? new CKEDITOR.dom.element(a) :null;
},
forEach:function(a, c, d) {
if (!(d || c && this.type != c)) var e = a(this);
if (e !== !1) for (var d = this.getChildren(), f = 0; f < d.count(); f++) e = d.getItem(f), 
e.type == CKEDITOR.NODE_ELEMENT ? e.forEach(a, c) :(!c || e.type == c) && a(e);
}
});
var a = {
width:[ "border-left-width", "border-right-width", "padding-left", "padding-right" ],
height:[ "border-top-width", "border-bottom-width", "padding-top", "padding-bottom" ]
};
CKEDITOR.dom.element.prototype.setSize = function(a, d, e) {
"number" == typeof d && (!e || CKEDITOR.env.ie && CKEDITOR.env.quirks || (d -= c.call(this, a)), 
this.setStyle(a, d + "px"));
}, CKEDITOR.dom.element.prototype.getSize = function(a, d) {
var e = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(a)], this.$["client" + CKEDITOR.tools.capitalize(a)]) || 0;
return d && (e -= c.call(this, a)), e;
};
}(), CKEDITOR.dom.documentFragment = function(d) {
d = d || CKEDITOR.document, this.$ = d.type == CKEDITOR.NODE_DOCUMENT ? d.$.createDocumentFragment() :d;
}, CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, {
type:CKEDITOR.NODE_DOCUMENT_FRAGMENT,
insertAfterNode:function(d) {
d = d.$, d.parentNode.insertBefore(this.$, d.nextSibling);
}
}, !0, {
append:1,
appendBogus:1,
getFirst:1,
getLast:1,
getParent:1,
getNext:1,
getPrevious:1,
appendTo:1,
moveChildren:1,
insertBefore:1,
insertAfterNode:1,
replace:1,
trim:1,
type:1,
ltrim:1,
rtrim:1,
getDocument:1,
getChildCount:1,
getChild:1,
getChildren:1
}), function() {
function d(a, b) {
var c = this.range;
if (this._.end) return null;
if (!this._.start) {
if (this._.start = 1, c.collapsed) return this.end(), null;
c.optimize();
}
var d, k = c.startContainer;
d = c.endContainer;
var g, e = c.startOffset, f = c.endOffset, j = this.guard, h = this.type, i = a ? "getPreviousSourceNode" :"getNextSourceNode";
if (!a && !this._.guardLTR) {
var t = d.type == CKEDITOR.NODE_ELEMENT ? d :d.getParent(), s = d.type == CKEDITOR.NODE_ELEMENT ? d.getChild(f) :d.getNext();
this._.guardLTR = function(a, b) {
return !(b && t.equals(a) || s && a.equals(s) || a.type == CKEDITOR.NODE_ELEMENT && b && a.equals(c.root));
};
}
if (a && !this._.guardRTL) {
var x = k.type == CKEDITOR.NODE_ELEMENT ? k :k.getParent(), y = k.type == CKEDITOR.NODE_ELEMENT ? e ? k.getChild(e - 1) :null :k.getPrevious();
this._.guardRTL = function(a, b) {
return !(b && x.equals(a) || y && a.equals(y) || a.type == CKEDITOR.NODE_ELEMENT && b && a.equals(c.root));
};
}
var z = a ? this._.guardRTL :this._.guardLTR;
for (g = j ? function(a, b) {
return z(a, b) === !1 ? !1 :j(a, b);
} :z, this.current ? d = this.current[i](!1, h, g) :(a ? d.type == CKEDITOR.NODE_ELEMENT && (d = f > 0 ? d.getChild(f - 1) :g(d, !0) === !1 ? null :d.getPreviousSourceNode(!0, h, g)) :(d = k, 
d.type != CKEDITOR.NODE_ELEMENT || (d = d.getChild(e)) || (d = g(k, !0) === !1 ? null :k.getNextSourceNode(!0, h, g))), 
d && g(d) === !1 && (d = null)); d && !this._.end; ) {
if (this.current = d, this.evaluator && this.evaluator(d) === !1) {
if (b && this.evaluator) return !1;
} else if (!b) return d;
d = d[i](!1, h, g);
}
return this.end(), this.current = null;
}
function e(a) {
for (var b, c = null; b = d.call(this, a); ) c = b;
return c;
}
function c(a) {
if (i(a)) return !1;
if (a.type == CKEDITOR.NODE_TEXT) return !0;
if (a.type == CKEDITOR.NODE_ELEMENT) {
if (a.is(CKEDITOR.dtd.$inline) || "false" == a.getAttribute("contenteditable")) return !0;
var b;
if ((b = !CKEDITOR.env.needsBrFiller) && (b = a.is(k))) a:{
b = 0;
for (var c = a.getChildCount(); c > b; ++b) if (!i(a.getChild(b))) {
b = !1;
break a;
}
b = !0;
}
if (b) return !0;
}
return !1;
}
CKEDITOR.dom.walker = CKEDITOR.tools.createClass({
$:function(a) {
this.range = a, this._ = {};
},
proto:{
end:function() {
this._.end = 1;
},
next:function() {
return d.call(this);
},
previous:function() {
return d.call(this, 1);
},
checkForward:function() {
return d.call(this, 0, 1) !== !1;
},
checkBackward:function() {
return d.call(this, 1, 1) !== !1;
},
lastForward:function() {
return e.call(this);
},
lastBackward:function() {
return e.call(this, 1);
},
reset:function() {
delete this.current, this._ = {};
}
}
});
var a = {
block:1,
"list-item":1,
table:1,
"table-row-group":1,
"table-header-group":1,
"table-footer-group":1,
"table-row":1,
"table-column-group":1,
"table-column":1,
"table-cell":1,
"table-caption":1
}, b = {
absolute:1,
fixed:1
};
CKEDITOR.dom.element.prototype.isBlockBoundary = function(c) {
return "none" != this.getComputedStyle("float") || this.getComputedStyle("position") in b || !a[this.getComputedStyle("display")] ? !!(this.is(CKEDITOR.dtd.$block) || c && this.is(c)) :!0;
}, CKEDITOR.dom.walker.blockBoundary = function(a) {
return function(b) {
return !(b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a));
};
}, CKEDITOR.dom.walker.listItemBoundary = function() {
return this.blockBoundary({
br:1
});
}, CKEDITOR.dom.walker.bookmark = function(a, b) {
function c(a) {
return a && a.getName && "span" == a.getName() && a.data("cke-bookmark");
}
return function(d) {
var k, e;
return k = d && d.type != CKEDITOR.NODE_ELEMENT && (e = d.getParent()) && c(e), 
k = a ? k :k || c(d), !!(b ^ k);
};
}, CKEDITOR.dom.walker.whitespaces = function(a) {
return function(b) {
var c;
return b && b.type == CKEDITOR.NODE_TEXT && (c = !CKEDITOR.tools.trim(b.getText()) || CKEDITOR.env.webkit && "\u200b" == b.getText()), 
!!(a ^ c);
};
}, CKEDITOR.dom.walker.invisible = function(a) {
var b = CKEDITOR.dom.walker.whitespaces();
return function(c) {
return b(c) ? c = 1 :(c.type == CKEDITOR.NODE_TEXT && (c = c.getParent()), c = !c.$.offsetHeight), 
!!(a ^ c);
};
}, CKEDITOR.dom.walker.nodeType = function(a, b) {
return function(c) {
return !!(b ^ c.type == a);
};
}, CKEDITOR.dom.walker.bogus = function(a) {
function b(a) {
return !g(a) && !h(a);
}
return function(c) {
var d = CKEDITOR.env.needsBrFiller ? c.is && c.is("br") :c.getText && j.test(c.getText());
return d && (d = c.getParent(), c = c.getNext(b), d = d.isBlockBoundary() && (!c || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary())), 
!!(a ^ d);
};
}, CKEDITOR.dom.walker.temp = function(a) {
return function(b) {
return b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()), b = b && b.hasAttribute("data-cke-temp"), 
!!(a ^ b);
};
};
var j = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, g = CKEDITOR.dom.walker.whitespaces(), h = CKEDITOR.dom.walker.bookmark(), f = CKEDITOR.dom.walker.temp();
CKEDITOR.dom.walker.ignored = function(a) {
return function(b) {
return b = g(b) || h(b) || f(b), !!(a ^ b);
};
};
var i = CKEDITOR.dom.walker.ignored(), k = function(a) {
var c, b = {};
for (c in a) CKEDITOR.dtd[c]["#"] && (b[c] = 1);
return b;
}(CKEDITOR.dtd.$block);
CKEDITOR.dom.walker.editable = function(a) {
return function(b) {
return !!(a ^ c(b));
};
}, CKEDITOR.dom.element.prototype.getBogus = function() {
var a = this;
do a = a.getPreviousSourceNode(); while (h(a) || g(a) || a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$inline) && !a.is(CKEDITOR.dtd.$empty));
return a && (CKEDITOR.env.needsBrFiller ? a.is && a.is("br") :a.getText && j.test(a.getText())) ? a :!1;
};
}(), CKEDITOR.dom.range = function(d) {
this.endOffset = this.endContainer = this.startOffset = this.startContainer = null, 
this.collapsed = !0;
var e = d instanceof CKEDITOR.dom.document;
this.document = e ? d :d.getDocument(), this.root = e ? d.getBody() :d;
}, function() {
function d() {
var a = !1, b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(!0), d = CKEDITOR.dom.walker.bogus();
return function(l) {
return c(l) || b(l) ? !0 :d(l) && !a ? a = !0 :l.type == CKEDITOR.NODE_TEXT && (l.hasAscendant("pre") || CKEDITOR.tools.trim(l.getText()).length) || l.type == CKEDITOR.NODE_ELEMENT && !l.is(j) ? !1 :!0;
};
}
function e(a) {
var b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(1);
return function(d) {
return c(d) || b(d) ? !0 :!a && g(d) || d.type == CKEDITOR.NODE_ELEMENT && d.is(CKEDITOR.dtd.$removeEmpty);
};
}
function c(a) {
return function() {
var b;
return this[a ? "getPreviousNode" :"getNextNode"](function(a) {
return !b && i(a) && (b = a), f(a) && !(g(a) && a.equals(b));
});
};
}
var a = function(a) {
a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset;
}, b = function(a, b, c, d) {
a.optimizeBookmark();
var j, h, l = a.startContainer, e = a.endContainer, f = a.startOffset, g = a.endOffset;
e.type == CKEDITOR.NODE_TEXT ? e = e.split(g) :e.getChildCount() > 0 && (g >= e.getChildCount() ? (e = e.append(a.document.createText("")), 
h = !0) :e = e.getChild(g)), l.type == CKEDITOR.NODE_TEXT ? (l.split(f), l.equals(e) && (e = l.getNext())) :f ? f >= l.getChildCount() ? (l = l.append(a.document.createText("")), 
j = !0) :l = l.getChild(f).getPrevious() :(l = l.append(a.document.createText(""), 1), 
j = !0);
var i, w, t, f = l.getParents(), g = e.getParents();
for (i = 0; i < f.length && (w = f[i], t = g[i], w.equals(t)); i++) ;
for (var x, y, z, s = c, B = i; B < f.length; B++) {
for (x = f[B], s && !x.equals(l) && (y = s.append(x.clone())), x = x.getNext(); x && (!x.equals(g[B]) && !x.equals(e)); ) z = x.getNext(), 
2 == b ? s.append(x.clone(!0)) :(x.remove(), 1 == b && s.append(x)), x = z;
s && (s = y);
}
for (s = c, c = i; c < g.length; c++) {
if (x = g[c], b > 0 && !x.equals(e) && (y = s.append(x.clone())), !f[c] || x.$.parentNode != f[c].$.parentNode) for (x = x.getPrevious(); x && (!x.equals(f[c]) && !x.equals(l)); ) z = x.getPrevious(), 
2 == b ? s.$.insertBefore(x.$.cloneNode(!0), s.$.firstChild) :(x.remove(), 1 == b && s.$.insertBefore(x.$, s.$.firstChild)), 
x = z;
s && (s = y);
}
2 == b ? (w = a.startContainer, w.type == CKEDITOR.NODE_TEXT && (w.$.data = w.$.data + w.$.nextSibling.data, 
w.$.parentNode.removeChild(w.$.nextSibling)), a = a.endContainer, a.type == CKEDITOR.NODE_TEXT && a.$.nextSibling && (a.$.data = a.$.data + a.$.nextSibling.data, 
a.$.parentNode.removeChild(a.$.nextSibling))) :(w && t && (l.$.parentNode != w.$.parentNode || e.$.parentNode != t.$.parentNode) && (b = t.getIndex(), 
j && t.$.parentNode == l.$.parentNode && b--, d && w.type == CKEDITOR.NODE_ELEMENT ? (d = CKEDITOR.dom.element.createFromHtml('<span data-cke-bookmark="1" style="display:none">&nbsp;</span>', a.document), 
d.insertAfter(w), w.mergeSiblings(!1), a.moveToBookmark({
startNode:d
})) :a.setStart(t.getParent(), b)), a.collapse(!0)), j && l.remove(), h && e.$.parentNode && e.remove();
}, j = {
abbr:1,
acronym:1,
b:1,
bdo:1,
big:1,
cite:1,
code:1,
del:1,
dfn:1,
em:1,
font:1,
i:1,
ins:1,
label:1,
kbd:1,
q:1,
samp:1,
small:1,
span:1,
strike:1,
strong:1,
sub:1,
sup:1,
tt:1,
u:1,
"var":1
}, g = CKEDITOR.dom.walker.bogus(), h = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, f = CKEDITOR.dom.walker.editable(), i = CKEDITOR.dom.walker.ignored(!0);
CKEDITOR.dom.range.prototype = {
clone:function() {
var a = new CKEDITOR.dom.range(this.root);
return a.startContainer = this.startContainer, a.startOffset = this.startOffset, 
a.endContainer = this.endContainer, a.endOffset = this.endOffset, a.collapsed = this.collapsed, 
a;
},
collapse:function(a) {
a ? (this.endContainer = this.startContainer, this.endOffset = this.startOffset) :(this.startContainer = this.endContainer, 
this.startOffset = this.endOffset), this.collapsed = !0;
},
cloneContents:function() {
var a = new CKEDITOR.dom.documentFragment(this.document);
return this.collapsed || b(this, 2, a), a;
},
deleteContents:function(a) {
this.collapsed || b(this, 0, null, a);
},
extractContents:function(a) {
var c = new CKEDITOR.dom.documentFragment(this.document);
return this.collapsed || b(this, 1, c, a), c;
},
createBookmark:function(a) {
var b, c, d, l, e = this.collapsed;
return b = this.document.createElement("span"), b.data("cke-bookmark", 1), b.setStyle("display", "none"), 
b.setHtml("&nbsp;"), a && (d = "cke_bm_" + CKEDITOR.tools.getNextNumber(), b.setAttribute("id", d + (e ? "C" :"S"))), 
e || (c = b.clone(), c.setHtml("&nbsp;"), a && c.setAttribute("id", d + "E"), l = this.clone(), 
l.collapse(), l.insertNode(c)), l = this.clone(), l.collapse(!0), l.insertNode(b), 
c ? (this.setStartAfter(b), this.setEndBefore(c)) :this.moveToPosition(b, CKEDITOR.POSITION_AFTER_END), 
{
startNode:a ? d + (e ? "C" :"S") :b,
endNode:a ? d + "E" :c,
serializable:a,
collapsed:e
};
},
createBookmark2:function() {
function a(b) {
var l, c = b.container, d = b.offset;
l = c;
var e = d;
if (l = l.type != CKEDITOR.NODE_ELEMENT || 0 === e || e == l.getChildCount() ? 0 :l.getChild(e - 1).type == CKEDITOR.NODE_TEXT && l.getChild(e).type == CKEDITOR.NODE_TEXT, 
l && (c = c.getChild(d - 1), d = c.getLength()), c.type == CKEDITOR.NODE_ELEMENT && d > 1 && (d = c.getChild(d - 1).getIndex(!0) + 1), 
c.type == CKEDITOR.NODE_TEXT) {
for (l = c, e = 0; (l = l.getPrevious()) && l.type == CKEDITOR.NODE_TEXT; ) e += l.getLength();
d += e;
}
b.container = c, b.offset = d;
}
return function(b) {
var c = this.collapsed, d = {
container:this.startContainer,
offset:this.startOffset
}, l = {
container:this.endContainer,
offset:this.endOffset
};
return b && (a(d), c || a(l)), {
start:d.container.getAddress(b),
end:c ? null :l.container.getAddress(b),
startOffset:d.offset,
endOffset:l.offset,
normalized:b,
collapsed:c,
is2:!0
};
};
}(),
moveToBookmark:function(a) {
if (a.is2) {
var b = this.document.getByAddress(a.start, a.normalized), c = a.startOffset, d = a.end && this.document.getByAddress(a.end, a.normalized), a = a.endOffset;
this.setStart(b, c), d ? this.setEnd(d, a) :this.collapse(!0);
} else b = (c = a.serializable) ? this.document.getById(a.startNode) :a.startNode, 
a = c ? this.document.getById(a.endNode) :a.endNode, this.setStartBefore(b), b.remove(), 
a ? (this.setEndBefore(a), a.remove()) :this.collapse(!0);
},
getBoundaryNodes:function() {
var l, a = this.startContainer, b = this.endContainer, c = this.startOffset, d = this.endOffset;
if (a.type == CKEDITOR.NODE_ELEMENT) if (l = a.getChildCount(), l > c) a = a.getChild(c); else if (1 > l) a = a.getPreviousSourceNode(); else {
for (a = a.$; a.lastChild; ) a = a.lastChild;
a = new CKEDITOR.dom.node(a), a = a.getNextSourceNode() || a;
}
if (b.type == CKEDITOR.NODE_ELEMENT) if (l = b.getChildCount(), l > d) b = b.getChild(d).getPreviousSourceNode(!0); else if (1 > l) b = b.getPreviousSourceNode(); else {
for (b = b.$; b.lastChild; ) b = b.lastChild;
b = new CKEDITOR.dom.node(b);
}
return a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b), {
startNode:a,
endNode:b
};
},
getCommonAncestor:function(a, b) {
var c = this.startContainer, d = this.endContainer, c = c.equals(d) ? a && c.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? c.getChild(this.startOffset) :c :c.getCommonAncestor(d);
return b && !c.is ? c.getParent() :c;
},
optimize:function() {
var a = this.startContainer, b = this.startOffset;
a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) :this.setStartBefore(a)), 
a = this.endContainer, b = this.endOffset, a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) :this.setEndBefore(a));
},
optimizeBookmark:function() {
var a = this.startContainer, b = this.endContainer;
a.is && a.is("span") && a.data("cke-bookmark") && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START), 
b && b.is && b.is("span") && b.data("cke-bookmark") && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END);
},
trim:function(a, b) {
var c = this.startContainer, d = this.startOffset, l = this.collapsed;
if ((!a || l) && c && c.type == CKEDITOR.NODE_TEXT) {
if (d) if (d >= c.getLength()) d = c.getIndex() + 1, c = c.getParent(); else {
var e = c.split(d), d = c.getIndex() + 1, c = c.getParent();
this.startContainer.equals(this.endContainer) ? this.setEnd(e, this.endOffset - this.startOffset) :c.equals(this.endContainer) && (this.endOffset = this.endOffset + 1);
} else d = c.getIndex(), c = c.getParent();
if (this.setStart(c, d), l) return this.collapse(!0), void 0;
}
c = this.endContainer, d = this.endOffset, b || l || !c || c.type != CKEDITOR.NODE_TEXT || (d ? (d >= c.getLength() || c.split(d), 
d = c.getIndex() + 1) :d = c.getIndex(), c = c.getParent(), this.setEnd(c, d));
},
enlarge:function(a, b) {
function c(a) {
return a && a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") ? null :a;
}
var d = RegExp(/[^\s\ufeff]/);
switch (a) {
case CKEDITOR.ENLARGE_INLINE:
var l = 1;

case CKEDITOR.ENLARGE_ELEMENT:
if (this.collapsed) break;
var g, j, h, i, w, s, x, e = this.getCommonAncestor(), f = this.root, t = !1;
s = this.startContainer;
var y = this.startOffset;
for (s.type == CKEDITOR.NODE_TEXT ? (y && (s = !CKEDITOR.tools.trim(s.substring(0, y)).length && s, 
t = !!s), s && !(i = s.getPrevious()) && (h = s.getParent())) :(y && (i = s.getChild(y - 1) || s.getLast()), 
i || (h = s)), h = c(h); h || i; ) {
if (h && !i) {
if (!w && h.equals(e) && (w = !0), l ? h.isBlockBoundary() :!f.contains(h)) break;
t && "inline" == h.getComputedStyle("display") || (t = !1, w ? g = h :this.setStartBefore(h)), 
i = h.getPrevious();
}
for (;i; ) if (s = !1, i.type == CKEDITOR.NODE_COMMENT) i = i.getPrevious(); else {
if (i.type == CKEDITOR.NODE_TEXT) x = i.getText(), d.test(x) && (i = null), s = /[\s\ufeff]$/.test(x); else if ((i.$.offsetWidth > 0 || b && i.is("br")) && !i.data("cke-bookmark")) if (t && CKEDITOR.dtd.$removeEmpty[i.getName()]) {
if (x = i.getText(), d.test(x)) i = null; else for (var B, y = i.$.getElementsByTagName("*"), z = 0; B = y[z++]; ) if (!CKEDITOR.dtd.$removeEmpty[B.nodeName.toLowerCase()]) {
i = null;
break;
}
i && (s = !!x.length);
} else i = null;
if (s && (t ? w ? g = h :h && this.setStartBefore(h) :t = !0), i) {
if (s = i.getPrevious(), !h && !s) {
h = i, i = null;
break;
}
i = s;
} else h = null;
}
h && (h = c(h.getParent()));
}
s = this.endContainer, y = this.endOffset, h = i = null, w = t = !1;
var F = function(a, b) {
var c = new CKEDITOR.dom.range(f);
c.setStart(a, b), c.setEndAt(f, CKEDITOR.POSITION_BEFORE_END);
var l, c = new CKEDITOR.dom.walker(c);
for (c.guard = function(a) {
return !(a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary());
}; l = c.next(); ) {
if (l.type != CKEDITOR.NODE_TEXT) return !1;
if (x = l != a ? l.getText() :l.substring(b), d.test(x)) return !1;
}
return !0;
};
for (s.type == CKEDITOR.NODE_TEXT ? CKEDITOR.tools.trim(s.substring(y)).length ? t = !0 :(t = !s.getLength(), 
y == s.getLength() ? (i = s.getNext()) || (h = s.getParent()) :F(s, y) && (h = s.getParent())) :(i = s.getChild(y)) || (h = s); h || i; ) {
if (h && !i) {
if (!w && h.equals(e) && (w = !0), l ? h.isBlockBoundary() :!f.contains(h)) break;
t && "inline" == h.getComputedStyle("display") || (t = !1, w ? j = h :h && this.setEndAfter(h)), 
i = h.getNext();
}
for (;i; ) {
if (s = !1, i.type == CKEDITOR.NODE_TEXT) x = i.getText(), F(i, 0) || (i = null), 
s = /^[\s\ufeff]/.test(x); else if (i.type == CKEDITOR.NODE_ELEMENT) {
if ((i.$.offsetWidth > 0 || b && i.is("br")) && !i.data("cke-bookmark")) if (t && CKEDITOR.dtd.$removeEmpty[i.getName()]) {
if (x = i.getText(), d.test(x)) i = null; else for (y = i.$.getElementsByTagName("*"), 
z = 0; B = y[z++]; ) if (!CKEDITOR.dtd.$removeEmpty[B.nodeName.toLowerCase()]) {
i = null;
break;
}
i && (s = !!x.length);
} else i = null;
} else s = 1;
if (s && t && (w ? j = h :this.setEndAfter(h)), i) {
if (s = i.getNext(), !h && !s) {
h = i, i = null;
break;
}
i = s;
} else h = null;
}
h && (h = c(h.getParent()));
}
g && j && (e = g.contains(j) ? j :g, this.setStartBefore(e), this.setEndAfter(e));
break;

case CKEDITOR.ENLARGE_BLOCK_CONTENTS:
case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:
h = new CKEDITOR.dom.range(this.root), f = this.root, h.setStartAt(f, CKEDITOR.POSITION_AFTER_START), 
h.setEnd(this.startContainer, this.startOffset), h = new CKEDITOR.dom.walker(h);
var C, D, E = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? {
br:1
} :null), I = null, J = function(a) {
if (a.type == CKEDITOR.NODE_ELEMENT && "false" == a.getAttribute("contenteditable")) if (I) {
if (I.equals(a)) return I = null, void 0;
} else I = a; else if (I) return;
var b = E(a);
return b || (C = a), b;
}, l = function(a) {
var b = J(a);
return !b && a.is && a.is("br") && (D = a), b;
};
if (h.guard = J, h = h.lastBackward(), C = C || f, this.setStartAt(C, !C.is("br") && (!h && this.checkStartOfBlock() || h && C.contains(h)) ? CKEDITOR.POSITION_AFTER_START :CKEDITOR.POSITION_AFTER_END), 
a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) {
h = this.clone(), h = new CKEDITOR.dom.walker(h);
var G = CKEDITOR.dom.walker.whitespaces(), P = CKEDITOR.dom.walker.bookmark();
if (h.evaluator = function(a) {
return !G(a) && !P(a);
}, (h = h.previous()) && h.type == CKEDITOR.NODE_ELEMENT && h.is("br")) break;
}
h = this.clone(), h.collapse(), h.setEndAt(f, CKEDITOR.POSITION_BEFORE_END), h = new CKEDITOR.dom.walker(h), 
h.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? l :J, C = null, h = h.lastForward(), 
C = C || f, this.setEndAt(C, !h && this.checkEndOfBlock() || h && C.contains(h) ? CKEDITOR.POSITION_BEFORE_END :CKEDITOR.POSITION_BEFORE_START), 
D && this.setEndAfter(D);
}
},
shrink:function(a, b, c) {
if (!this.collapsed) {
var a = a || CKEDITOR.SHRINK_TEXT, d = this.clone(), l = this.startContainer, e = this.endContainer, f = this.startOffset, h = this.endOffset, g = 1, j = 1;
l && l.type == CKEDITOR.NODE_TEXT && (f ? f >= l.getLength() ? d.setStartAfter(l) :(d.setStartBefore(l), 
g = 0) :d.setStartBefore(l)), e && e.type == CKEDITOR.NODE_TEXT && (h ? h >= e.getLength() ? d.setEndAfter(e) :(d.setEndAfter(e), 
j = 0) :d.setEndBefore(e));
var d = new CKEDITOR.dom.walker(d), i = CKEDITOR.dom.walker.bookmark();
d.evaluator = function(b) {
return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT :CKEDITOR.NODE_TEXT);
};
var w;
return d.guard = function(b, d) {
return i(b) ? !0 :a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || d && b.equals(w) || c === !1 && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary() || b.type == CKEDITOR.NODE_ELEMENT && b.hasAttribute("contenteditable") ? !1 :(!d && b.type == CKEDITOR.NODE_ELEMENT && (w = b), 
!0);
}, g && (l = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" :"next"]()) && this.setStartAt(l, b ? CKEDITOR.POSITION_AFTER_START :CKEDITOR.POSITION_BEFORE_START), 
j && (d.reset(), (d = d[a == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" :"previous"]()) && this.setEndAt(d, b ? CKEDITOR.POSITION_BEFORE_END :CKEDITOR.POSITION_AFTER_END)), 
!(!g && !j);
}
},
insertNode:function(a) {
this.optimizeBookmark(), this.trim(!1, !0);
var b = this.startContainer, c = b.getChild(this.startOffset);
c ? a.insertBefore(c) :b.append(a), a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++, 
this.setStartBefore(a);
},
moveToPosition:function(a, b) {
this.setStartAt(a, b), this.collapse(!0);
},
moveToRange:function(a) {
this.setStart(a.startContainer, a.startOffset), this.setEnd(a.endContainer, a.endOffset);
},
selectNodeContents:function(a) {
this.setStart(a, 0), this.setEnd(a, a.type == CKEDITOR.NODE_TEXT ? a.getLength() :a.getChildCount());
},
setStart:function(b, c) {
b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex(), 
b = b.getParent()), this.startContainer = b, this.startOffset = c, this.endContainer || (this.endContainer = b, 
this.endOffset = c), a(this);
},
setEnd:function(b, c) {
b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex() + 1, 
b = b.getParent()), this.endContainer = b, this.endOffset = c, this.startContainer || (this.startContainer = b, 
this.startOffset = c), a(this);
},
setStartAfter:function(a) {
this.setStart(a.getParent(), a.getIndex() + 1);
},
setStartBefore:function(a) {
this.setStart(a.getParent(), a.getIndex());
},
setEndAfter:function(a) {
this.setEnd(a.getParent(), a.getIndex() + 1);
},
setEndBefore:function(a) {
this.setEnd(a.getParent(), a.getIndex());
},
setStartAt:function(b, c) {
switch (c) {
case CKEDITOR.POSITION_AFTER_START:
this.setStart(b, 0);
break;

case CKEDITOR.POSITION_BEFORE_END:
b.type == CKEDITOR.NODE_TEXT ? this.setStart(b, b.getLength()) :this.setStart(b, b.getChildCount());
break;

case CKEDITOR.POSITION_BEFORE_START:
this.setStartBefore(b);
break;

case CKEDITOR.POSITION_AFTER_END:
this.setStartAfter(b);
}
a(this);
},
setEndAt:function(b, c) {
switch (c) {
case CKEDITOR.POSITION_AFTER_START:
this.setEnd(b, 0);
break;

case CKEDITOR.POSITION_BEFORE_END:
b.type == CKEDITOR.NODE_TEXT ? this.setEnd(b, b.getLength()) :this.setEnd(b, b.getChildCount());
break;

case CKEDITOR.POSITION_BEFORE_START:
this.setEndBefore(b);
break;

case CKEDITOR.POSITION_AFTER_END:
this.setEndAfter(b);
}
a(this);
},
fixBlock:function(a, b) {
var c = this.createBookmark(), d = this.document.createElement(b);
return this.collapse(a), this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), this.extractContents().appendTo(d), 
d.trim(), d.appendBogus(), this.insertNode(d), this.moveToBookmark(c), d;
},
splitBlock:function(a) {
var b = new CKEDITOR.dom.elementPath(this.startContainer, this.root), c = new CKEDITOR.dom.elementPath(this.endContainer, this.root), d = b.block, l = c.block, e = null;
return b.blockLimit.equals(c.blockLimit) ? ("br" != a && (d || (d = this.fixBlock(!0, a), 
l = new CKEDITOR.dom.elementPath(this.endContainer, this.root).block), l || (l = this.fixBlock(!1, a))), 
a = d && this.checkStartOfBlock(), b = l && this.checkEndOfBlock(), this.deleteContents(), 
d && d.equals(l) && (b ? (e = new CKEDITOR.dom.elementPath(this.startContainer, this.root), 
this.moveToPosition(l, CKEDITOR.POSITION_AFTER_END), l = null) :a ? (e = new CKEDITOR.dom.elementPath(this.startContainer, this.root), 
this.moveToPosition(d, CKEDITOR.POSITION_BEFORE_START), d = null) :(l = this.splitElement(d), 
d.is("ul", "ol") || d.appendBogus())), {
previousBlock:d,
nextBlock:l,
wasStartOfBlock:a,
wasEndOfBlock:b,
elementPath:e
}) :null;
},
splitElement:function(a) {
if (!this.collapsed) return null;
this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END);
var b = this.extractContents(), c = a.clone(!1);
return b.appendTo(c), c.insertAfter(a), this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END), 
c;
},
removeEmptyBlocksAtEnd:function() {
function a(d) {
return function(a) {
return b(a) || c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable() || d.is("table") && a.is("caption") ? !1 :!0;
};
}
var b = CKEDITOR.dom.walker.whitespaces(), c = CKEDITOR.dom.walker.bookmark(!1);
return function(b) {
for (var f, c = this.createBookmark(), d = this[b ? "endPath" :"startPath"](), e = d.block || d.blockLimit; e && !e.equals(d.root) && !e.getFirst(a(e)); ) f = e.getParent(), 
this[b ? "setEndAt" :"setStartAt"](e, CKEDITOR.POSITION_AFTER_END), e.remove(1), 
e = f;
this.moveToBookmark(c);
};
}(),
startPath:function() {
return new CKEDITOR.dom.elementPath(this.startContainer, this.root);
},
endPath:function() {
return new CKEDITOR.dom.elementPath(this.endContainer, this.root);
},
checkBoundaryOfElement:function(a, b) {
var c = b == CKEDITOR.START, d = this.clone();
return d.collapse(c), d[c ? "setStartAt" :"setEndAt"](a, c ? CKEDITOR.POSITION_AFTER_START :CKEDITOR.POSITION_BEFORE_END), 
d = new CKEDITOR.dom.walker(d), d.evaluator = e(c), d[c ? "checkBackward" :"checkForward"]();
},
checkStartOfBlock:function() {
var a = this.startContainer, b = this.startOffset;
return CKEDITOR.env.ie && b && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.ltrim(a.substring(0, b)), 
h.test(a) && this.trim(0, 1)), this.trim(), a = new CKEDITOR.dom.elementPath(this.startContainer, this.root), 
b = this.clone(), b.collapse(!0), b.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START), 
a = new CKEDITOR.dom.walker(b), a.evaluator = d(), a.checkBackward();
},
checkEndOfBlock:function() {
var a = this.endContainer, b = this.endOffset;
return CKEDITOR.env.ie && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.rtrim(a.substring(b)), 
h.test(a) && this.trim(1, 0)), this.trim(), a = new CKEDITOR.dom.elementPath(this.endContainer, this.root), 
b = this.clone(), b.collapse(!1), b.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END), 
a = new CKEDITOR.dom.walker(b), a.evaluator = d(), a.checkForward();
},
getPreviousNode:function(a, b, c) {
var d = this.clone();
return d.collapse(1), d.setStartAt(c || this.root, CKEDITOR.POSITION_AFTER_START), 
c = new CKEDITOR.dom.walker(d), c.evaluator = a, c.guard = b, c.previous();
},
getNextNode:function(a, b, c) {
var d = this.clone();
return d.collapse(), d.setEndAt(c || this.root, CKEDITOR.POSITION_BEFORE_END), c = new CKEDITOR.dom.walker(d), 
c.evaluator = a, c.guard = b, c.next();
},
checkReadOnly:function() {
function a(b, c) {
for (;b; ) {
if (b.type == CKEDITOR.NODE_ELEMENT) {
if ("false" == b.getAttribute("contentEditable") && !b.data("cke-editable")) return 0;
if (b.is("html") || "true" == b.getAttribute("contentEditable") && (b.contains(c) || b.equals(c))) break;
}
b = b.getParent();
}
return 1;
}
return function() {
var b = this.startContainer, c = this.endContainer;
return !(a(b, c) && a(c, b));
};
}(),
moveToElementEditablePosition:function(a, b) {
if (a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(!1)) return this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END :CKEDITOR.POSITION_BEFORE_START), 
!0;
for (var c = 0; a; ) {
if (a.type == CKEDITOR.NODE_TEXT) {
b && this.endContainer && this.checkEndOfBlock() && h.test(a.getText()) ? this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START) :this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END :CKEDITOR.POSITION_BEFORE_START), 
c = 1;
break;
}
if (a.type == CKEDITOR.NODE_ELEMENT) if (a.isEditable()) this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END :CKEDITOR.POSITION_AFTER_START), 
c = 1; else if (b && a.is("br") && this.endContainer && this.checkEndOfBlock()) this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START); else if ("false" == a.getAttribute("contenteditable") && a.is(CKEDITOR.dtd.$block)) return this.setStartBefore(a), 
this.setEndAfter(a), !0;
var d = a, e = c, f = void 0;
d.type == CKEDITOR.NODE_ELEMENT && d.isEditable(!1) && (f = d[b ? "getLast" :"getFirst"](i)), 
!e && !f && (f = d[b ? "getPrevious" :"getNext"](i)), a = f;
}
return !!c;
},
moveToClosestEditablePosition:function(a, b) {
var e, c = new CKEDITOR.dom.range(this.root), d = 0, f = [ CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START ];
return c.moveToPosition(a, f[b ? 0 :1]), a.is(CKEDITOR.dtd.$block) ? (e = c[b ? "getNextEditableNode" :"getPreviousEditableNode"]()) && (d = 1, 
e.type == CKEDITOR.NODE_ELEMENT && e.is(CKEDITOR.dtd.$block) && "false" == e.getAttribute("contenteditable") ? (c.setStartAt(e, CKEDITOR.POSITION_BEFORE_START), 
c.setEndAt(e, CKEDITOR.POSITION_AFTER_END)) :c.moveToPosition(e, f[b ? 1 :0])) :d = 1, 
d && this.moveToRange(c), !!d;
},
moveToElementEditStart:function(a) {
return this.moveToElementEditablePosition(a);
},
moveToElementEditEnd:function(a) {
return this.moveToElementEditablePosition(a, !0);
},
getEnclosedNode:function() {
var a = this.clone();
if (a.optimize(), a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT) return null;
var a = new CKEDITOR.dom.walker(a), b = CKEDITOR.dom.walker.bookmark(!1, !0), c = CKEDITOR.dom.walker.whitespaces(!0);
a.evaluator = function(a) {
return c(a) && b(a);
};
var d = a.next();
return a.reset(), d && d.equals(a.previous()) ? d :null;
},
getTouchedStartNode:function() {
var a = this.startContainer;
return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a :a.getChild(this.startOffset) || a;
},
getTouchedEndNode:function() {
var a = this.endContainer;
return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a :a.getChild(this.endOffset - 1) || a;
},
getNextEditableNode:c(),
getPreviousEditableNode:c(1),
scrollIntoView:function() {
var b, c, d, a = new CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", this.document), e = this.clone();
e.optimize(), (d = e.startContainer.type == CKEDITOR.NODE_TEXT) ? (c = e.startContainer.getText(), 
b = e.startContainer.split(e.startOffset), a.insertAfter(e.startContainer)) :e.insertNode(a), 
a.scrollIntoView(), d && (e.startContainer.setText(c), b.remove()), a.remove();
}
};
}(), CKEDITOR.POSITION_AFTER_START = 1, CKEDITOR.POSITION_BEFORE_END = 2, CKEDITOR.POSITION_BEFORE_START = 3, 
CKEDITOR.POSITION_AFTER_END = 4, CKEDITOR.ENLARGE_ELEMENT = 1, CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2, 
CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3, CKEDITOR.ENLARGE_INLINE = 4, CKEDITOR.START = 1, 
CKEDITOR.END = 2, CKEDITOR.SHRINK_ELEMENT = 1, CKEDITOR.SHRINK_TEXT = 2, function() {
function d(a) {
arguments.length < 1 || (this.range = a, this.forceBrBreak = 0, this.enlargeBr = 1, 
this.enforceRealBlocks = 0, this._ || (this._ = {}));
}
function e(a, b, c) {
for (a = a.getNextSourceNode(b, null, c); !j(a); ) a = a.getNextSourceNode(b, null, c);
return a;
}
function c(a) {
var b = [];
return a.forEach(function(a) {
return "true" == a.getAttribute("contenteditable") ? (b.push(a), !1) :void 0;
}, CKEDITOR.NODE_ELEMENT, !0), b;
}
function a(b, d, e, g) {
a:{
void 0 == g && (g = c(e));
for (var h; h = g.shift(); ) if (h.getDtd().p) {
g = {
element:h,
remaining:g
};
break a;
}
g = null;
}
return g ? (h = CKEDITOR.filter.instances[g.element.data("cke-filter")]) && !h.check(d) ? a(b, d, e, g.remaining) :(d = new CKEDITOR.dom.range(g.element), 
d.selectNodeContents(g.element), d = d.createIterator(), d.enlargeBr = b.enlargeBr, 
d.enforceRealBlocks = b.enforceRealBlocks, d.activeFilter = d.filter = h, b._.nestedEditable = {
element:g.element,
container:e,
remaining:g.remaining,
iterator:d
}, 1) :0;
}
var b = /^[\r\n\t ]+$/, j = CKEDITOR.dom.walker.bookmark(!1, !0), g = CKEDITOR.dom.walker.whitespaces(!0), h = function(a) {
return j(a) && g(a);
};
d.prototype = {
getNextParagraph:function(c) {
var d, g, n, o, q, c = c || "p";
if (this._.nestedEditable) {
if (d = this._.nestedEditable.iterator.getNextParagraph(c)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, 
d;
if (this.activeFilter = this.filter, a(this, c, this._.nestedEditable.container, this._.nestedEditable.remaining)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, 
this._.nestedEditable.iterator.getNextParagraph(c);
this._.nestedEditable = null;
}
if (!this.range.root.getDtd()[c]) return null;
if (!this._.started) {
var l = this.range.clone();
if (l.shrink(CKEDITOR.SHRINK_ELEMENT, !0), g = l.endContainer.hasAscendant("pre", !0) || l.startContainer.hasAscendant("pre", !0), 
l.enlarge(this.forceBrBreak && !g || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS :CKEDITOR.ENLARGE_BLOCK_CONTENTS), 
!l.collapsed) {
g = new CKEDITOR.dom.walker(l.clone());
var m = CKEDITOR.dom.walker.bookmark(!0, !0);
g.evaluator = m, this._.nextNode = g.next(), g = new CKEDITOR.dom.walker(l.clone()), 
g.evaluator = m, g = g.previous(), this._.lastNode = g.getNextSourceNode(!0), this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary() && (m = this.range.clone(), 
m.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END), m.checkEndOfBlock() && (m = new CKEDITOR.dom.elementPath(m.endContainer, m.root), 
this._.lastNode = (m.block || m.blockLimit).getNextSourceNode(!0))), this._.lastNode && l.root.contains(this._.lastNode) || (this._.lastNode = this._.docEndMarker = l.document.createText(""), 
this._.lastNode.insertAfter(g)), l = null;
}
this._.started = 1, g = l;
}
for (m = this._.nextNode, l = this._.lastNode, this._.nextNode = null; m; ) {
var r = 0, p = m.hasAscendant("pre"), u = m.type != CKEDITOR.NODE_ELEMENT, v = 0;
if (u) m.type == CKEDITOR.NODE_TEXT && b.test(m.getText()) && (u = 0); else {
var A = m.getName();
if (CKEDITOR.dtd.$block[A] && "false" == m.getAttribute("contenteditable")) {
d = m, a(this, c, d);
break;
}
if (m.isBlockBoundary(this.forceBrBreak && !p && {
br:1
})) {
if ("br" == A) u = 1; else if (!g && !m.getChildCount() && "hr" != A) {
d = m, n = m.equals(l);
break;
}
g && (g.setEndAt(m, CKEDITOR.POSITION_BEFORE_START), "br" != A && (this._.nextNode = m)), 
r = 1;
} else {
if (m.getFirst()) {
g || (g = this.range.clone(), g.setStartAt(m, CKEDITOR.POSITION_BEFORE_START)), 
m = m.getFirst();
continue;
}
u = 1;
}
}
if (u && !g && (g = this.range.clone(), g.setStartAt(m, CKEDITOR.POSITION_BEFORE_START)), 
n = (!r || u) && m.equals(l), g && !r) for (;!m.getNext(h) && !n; ) {
if (A = m.getParent(), A.isBlockBoundary(this.forceBrBreak && !p && {
br:1
})) {
r = 1, u = 0, n || A.equals(l), g.setEndAt(A, CKEDITOR.POSITION_BEFORE_END);
break;
}
m = A, u = 1, n = m.equals(l), v = 1;
}
if (u && g.setEndAt(m, CKEDITOR.POSITION_AFTER_END), m = e(m, v, l), (n = !m) || r && g) break;
}
if (!d) {
if (!g) return this._.docEndMarker && this._.docEndMarker.remove(), this._.nextNode = null;
d = new CKEDITOR.dom.elementPath(g.startContainer, g.root), m = d.blockLimit, r = {
div:1,
th:1,
td:1
}, d = d.block, !d && m && !this.enforceRealBlocks && r[m.getName()] && g.checkStartOfBlock() && g.checkEndOfBlock() && !m.equals(g.root) ? d = m :!d || this.enforceRealBlocks && "li" == d.getName() ? (d = this.range.document.createElement(c), 
g.extractContents().appendTo(d), d.trim(), g.insertNode(d), o = q = !0) :"li" != d.getName() ? g.checkStartOfBlock() && g.checkEndOfBlock() || (d = d.clone(!1), 
g.extractContents().appendTo(d), d.trim(), q = g.splitBlock(), o = !q.wasStartOfBlock, 
q = !q.wasEndOfBlock, g.insertNode(d)) :n || (this._.nextNode = d.equals(l) ? null :e(g.getBoundaryNodes().endNode, 1, l));
}
return o && (o = d.getPrevious()) && o.type == CKEDITOR.NODE_ELEMENT && ("br" == o.getName() ? o.remove() :o.getLast() && "br" == o.getLast().$.nodeName.toLowerCase() && o.getLast().remove()), 
q && (o = d.getLast()) && o.type == CKEDITOR.NODE_ELEMENT && "br" == o.getName() && (!CKEDITOR.env.needsBrFiller || o.getPrevious(j) || o.getNext(j)) && o.remove(), 
this._.nextNode || (this._.nextNode = n || d.equals(l) || !l ? null :e(d, 1, l)), 
d;
}
}, CKEDITOR.dom.range.prototype.createIterator = function() {
return new d(this);
};
}(), CKEDITOR.command = function(d, e) {
this.uiItems = [], this.exec = function(a) {
return this.state != CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() ? (this.editorFocus && d.focus(), 
this.fire("exec") === !1 ? !0 :e.exec.call(this, d, a) !== !1) :!1;
}, this.refresh = function(a, b) {
return !this.readOnly && a.readOnly ? !0 :this.context && !b.isContextFor(this.context) ? (this.disable(), 
!0) :this.checkAllowed(!0) ? (this.startDisabled || this.enable(), this.modes && !this.modes[a.mode] && this.disable(), 
this.fire("refresh", {
editor:a,
path:b
}) === !1 ? !0 :e.refresh && e.refresh.apply(this, arguments) !== !1) :(this.disable(), 
!0);
};
var c;
this.checkAllowed = function(a) {
return a || "boolean" != typeof c ? c = d.activeFilter.checkFeature(this) :c;
}, CKEDITOR.tools.extend(this, e, {
modes:{
wysiwyg:1
},
editorFocus:1,
contextSensitive:!!e.context,
state:CKEDITOR.TRISTATE_DISABLED
}), CKEDITOR.event.call(this);
}, CKEDITOR.command.prototype = {
enable:function() {
this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(this.preserveState && "undefined" != typeof this.previousState ? this.previousState :CKEDITOR.TRISTATE_OFF);
},
disable:function() {
this.setState(CKEDITOR.TRISTATE_DISABLED);
},
setState:function(d) {
return this.state == d || d != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed() ? !1 :(this.previousState = this.state, 
this.state = d, this.fire("state"), !0);
},
toggleState:function() {
this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) :this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF);
}
}, CKEDITOR.event.implementOn(CKEDITOR.command.prototype), CKEDITOR.ENTER_P = 1, 
CKEDITOR.ENTER_BR = 2, CKEDITOR.ENTER_DIV = 3, CKEDITOR.config = {
customConfig:"config.js",
autoUpdateElement:!0,
language:"",
defaultLanguage:"en",
contentsLangDirection:"",
enterMode:CKEDITOR.ENTER_P,
forceEnterMode:!1,
shiftEnterMode:CKEDITOR.ENTER_BR,
docType:"<!DOCTYPE html>",
bodyId:"",
bodyClass:"",
fullPage:!1,
height:200,
extraPlugins:"",
removePlugins:"",
protectedSource:[],
tabIndex:0,
width:"",
baseFloatZIndex:1e4,
blockedKeystrokes:[ CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85, CKEDITOR.CTRL + 89, CKEDITOR.CTRL + 90, CKEDITOR.CTRL + CKEDITOR.SHIFT + 90 ]
}, function() {
function d(a, c, d, l, f) {
var g = c.name;
if ((l || "function" != typeof a.elements || a.elements(g)) && (!a.match || a.match(c))) {
if (l = !f) {
a:if (a.nothingRequired) l = !0; else {
if (f = a.requiredClasses) for (g = c.classes, l = 0; l < f.length; ++l) if (-1 == CKEDITOR.tools.indexOf(g, f[l])) {
l = !1;
break a;
}
l = b(c.styles, a.requiredStyles) && b(c.attributes, a.requiredAttributes);
}
l = !l;
}
if (!l && (a.propertiesOnly || (d.valid = !0), d.allAttributes || (d.allAttributes = e(a.attributes, c.attributes, d.validAttributes)), 
d.allStyles || (d.allStyles = e(a.styles, c.styles, d.validStyles)), !d.allClasses)) {
if (a = a.classes, c = c.classes, l = d.validClasses, a) if (a === !0) c = !0; else {
for (var h, f = 0, g = c.length; g > f; ++f) h = c[f], l[h] || (l[h] = a(h));
c = !1;
} else c = !1;
d.allClasses = c;
}
}
}
function e(a, b, c) {
if (!a) return !1;
if (a === !0) return !0;
for (var d in b) c[d] || (c[d] = a(d, b[d]));
return !1;
}
function c(a, b) {
if (!a) return !1;
if (a === !0) return a;
if ("string" == typeof a) return a = t(a), "*" == a ? !0 :CKEDITOR.tools.convertArrayToObject(a.split(b));
if (CKEDITOR.tools.isArray(a)) return a.length ? CKEDITOR.tools.convertArrayToObject(a) :!1;
var e, c = {}, d = 0;
for (e in a) c[e] = a[e], d++;
return d ? c :!1;
}
function a(a) {
if (a._.filterFunction) return a._.filterFunction;
var b = /^cke:(object|embed|param)$/, c = /^(object|embed|param)$/;
return a._.filterFunction = function(e, l, g, h, j, p, v) {
var r, u = e.name, n = !1;
if (j && (e.name = u = u.replace(b, "$1")), g = g && g[u]) {
for (f(e), u = 0; u < g.length; ++u) m(a, e, g[u]);
i(e);
}
if (l) {
var u = e.name, g = l.elements[u], A = l.generic, l = {
valid:!1,
validAttributes:{},
validClasses:{},
validStyles:{},
allAttributes:!1,
allClasses:!1,
allStyles:!1
};
if (!g && !A) return h.push(e), !0;
if (f(e), g) for (u = 0, r = g.length; r > u; ++u) d(g[u], e, l, !0, p);
if (A) for (u = 0, r = A.length; r > u; ++u) d(A[u], e, l, !1, p);
if (!l.valid) return h.push(e), !0;
p = l.validAttributes, u = l.validStyles, g = l.validClasses, r = e.attributes;
var o, q, A = e.styles, t = r["class"], w = r.style, s = [], y = [], x = /^data-cke-/, z = !1;
if (delete r.style, delete r["class"], !l.allAttributes) for (o in r) p[o] || (x.test(o) ? o == (q = o.replace(/^data-cke-saved-/, "")) || p[q] || (delete r[o], 
z = !0) :(delete r[o], z = !0));
if (l.allStyles) w && (r.style = w); else {
for (o in A) u[o] ? s.push(o + ":" + A[o]) :z = !0;
s.length && (r.style = s.sort().join("; "));
}
if (l.allClasses) t && (r["class"] = t); else {
for (o in g) g[o] && y.push(o);
y.length && (r["class"] = y.sort().join(" ")), t && y.length < t.split(/\s+/).length && (z = !0);
}
if (z && (n = !0), !v && !k(e)) return h.push(e), !0;
}
return j && (e.name = e.name.replace(c, "cke:$1")), n;
};
}
function b(a, b) {
if (!b) return !0;
for (var c = 0; c < b.length; ++c) if (!(b[c] in a)) return !1;
return !0;
}
function j(a) {
if (!a) return {};
for (var a = a.split(/\s*,\s*/).sort(), b = {}; a.length; ) b[a.shift()] = s;
return b;
}
function g(a) {
for (var b, c, d, e, l = {}, g = 1, a = t(a); b = a.match(B); ) (c = b[2]) ? (d = h(c, "styles"), 
e = h(c, "attrs"), c = h(c, "classes")) :d = e = c = null, l["$" + g++] = {
elements:b[1],
classes:c,
styles:d,
attributes:e
}, a = a.slice(b[0].length);
return l;
}
function h(a, b) {
var c = a.match(F[b]);
return c ? t(c[1]) :null;
}
function f(a) {
a.styles || (a.styles = CKEDITOR.tools.parseCssText(a.attributes.style || "", 1)), 
a.classes || (a.classes = a.attributes["class"] ? a.attributes["class"].split(/\s+/) :[]);
}
function i(a) {
var c, b = a.attributes;
delete b.style, delete b["class"], (c = CKEDITOR.tools.writeCssText(a.styles, !0)) && (b.style = c), 
a.classes.length && (b["class"] = a.classes.sort().join(" "));
}
function k(a) {
switch (a.name) {
case "a":
if (!a.children.length && !a.attributes.name) return !1;
break;

case "img":
if (!a.attributes.src) return !1;
}
return !0;
}
function n(a) {
return a ? a === !0 ? !0 :function(b) {
return b in a;
} :!1;
}
function o() {
return new CKEDITOR.htmlParser.element("br");
}
function q(a) {
return a.type == CKEDITOR.NODE_ELEMENT && ("br" == a.name || A.$block[a.name]);
}
function l(a, b, c) {
var d = a.name;
if (A.$empty[d] || !a.children.length) "hr" == d && "br" == b ? a.replaceWith(o()) :(a.parent && c.push({
check:"it",
el:a.parent
}), a.remove()); else if (A.$block[d] || "tr" == d) if ("br" == b) a.previous && !q(a.previous) && (b = o(), 
b.insertBefore(a)), a.next && !q(a.next) && (b = o(), b.insertAfter(a)), a.replaceWithChildren(); else {
var e, d = a.children;
b:{
e = A[b];
for (var f, l = 0, g = d.length; g > l; ++l) if (f = d[l], f.type == CKEDITOR.NODE_ELEMENT && !e[f.name]) {
e = !1;
break b;
}
e = !0;
}
if (e) a.name = b, a.attributes = {}, c.push({
check:"parent-down",
el:a
}); else {
e = a.parent;
for (var h, l = e.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || "body" == e.name, g = d.length; g > 0; ) f = d[--g], 
l && (f.type == CKEDITOR.NODE_TEXT || f.type == CKEDITOR.NODE_ELEMENT && A.$inline[f.name]) ? (h || (h = new CKEDITOR.htmlParser.element(b), 
h.insertAfter(a), c.push({
check:"parent-down",
el:h
})), h.add(f, 0)) :(h = null, f.insertAfter(a), e.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && f.type == CKEDITOR.NODE_ELEMENT && !A[e.name][f.name] && c.push({
check:"el-up",
el:f
}));
a.remove();
}
} else "style" == d ? a.remove() :(a.parent && c.push({
check:"it",
el:a.parent
}), a.replaceWithChildren());
}
function m(a, b, c) {
var d, e;
for (d = 0; d < c.length; ++d) if (e = c[d], !(e.check && !a.check(e.check, !1) || e.left && !e.left(b))) {
e.right(b, C);
break;
}
}
function r(a, b) {
var l, f, g, h, c = b.getDefinition(), d = c.attributes, e = c.styles;
if (a.name != c.element) return !1;
for (l in d) if ("class" == l) {
for (c = d[l].split(/\s+/), g = a.classes.join("|"); h = c.pop(); ) if (-1 == g.indexOf(h)) return !1;
} else if (a.attributes[l] != d[l]) return !1;
for (f in e) if (a.styles[f] != e[f]) return !1;
return !0;
}
function p(a, b) {
var c, d;
return "string" == typeof a ? c = a :a instanceof CKEDITOR.style ? d = a :(c = a[0], 
d = a[1]), [ {
element:c,
left:d,
right:function(a, c) {
c.transform(a, b);
}
} ];
}
function u(a) {
return function(b) {
return r(b, a);
};
}
function v(a) {
return function(b, c) {
c[a](b);
};
}
var A = CKEDITOR.dtd, w = CKEDITOR.tools.copy, t = CKEDITOR.tools.trim, s = "cke-test", x = [ "", "p", "br", "div" ];
CKEDITOR.filter = function(a) {
if (this.allowedContent = [], this.disabled = !1, this.editor = null, this.id = CKEDITOR.tools.getNextNumber(), 
this._ = {
rules:{},
transformations:{},
cachedTests:{}
}, CKEDITOR.filter.instances[this.id] = this, a instanceof CKEDITOR.editor) {
a = this.editor = a, this.customConfig = !0;
var b = a.config.allowedContent;
b === !0 ? this.disabled = !0 :(b || (this.customConfig = !1), this.allow(b, "config", 1), 
this.allow(a.config.extraAllowedContent, "extra", 1), this.allow(x[a.enterMode] + " " + x[a.shiftEnterMode], "default", 1));
} else this.customConfig = !1, this.allow(a, "default", 1);
}, CKEDITOR.filter.instances = {}, CKEDITOR.filter.prototype = {
allow:function(a, b, d) {
if (this.disabled || this.customConfig && !d || !a) return !1;
this._.cachedChecks = {};
var e, l;
if ("string" == typeof a) a = g(a); else if (a instanceof CKEDITOR.style) l = a.getDefinition(), 
d = {}, a = l.attributes, d[l.element] = l = {
styles:l.styles,
requiredStyles:l.styles && CKEDITOR.tools.objectKeys(l.styles)
}, a && (a = w(a), l.classes = a["class"] ? a["class"].split(/\s+/) :null, l.requiredClasses = l.classes, 
delete a["class"], l.attributes = a, l.requiredAttributes = a && CKEDITOR.tools.objectKeys(a)), 
a = d; else if (CKEDITOR.tools.isArray(a)) {
for (e = 0; e < a.length; ++e) l = this.allow(a[e], b, d);
return l;
}
var f, d = [];
for (f in a) {
l = a[f], l = "boolean" == typeof l ? {} :"function" == typeof l ? {
match:l
} :w(l), "$" != f.charAt(0) && (l.elements = f), b && (l.featureName = b.toLowerCase());
var h = l;
h.elements = c(h.elements, /\s+/) || null, h.propertiesOnly = h.propertiesOnly || h.elements === !0;
var j = /\s*,\s*/, i = void 0;
for (i in y) {
h[i] = c(h[i], j) || null;
var p = h, m = z[i], k = c(h[z[i]], j), u = h[i], v = [], r = !0, A = void 0;
k ? r = !1 :k = {};
for (A in u) "!" == A.charAt(0) && (A = A.slice(1), v.push(A), k[A] = !0, r = !1);
for (;A = v.pop(); ) u[A] = u["!" + A], delete u["!" + A];
p[m] = (r ? !1 :k) || null;
}
h.match = h.match || null, this.allowedContent.push(l), d.push(l);
}
for (b = this._.rules, f = b.elements || {}, a = b.generic || [], l = 0, h = d.length; h > l; ++l) {
j = w(d[l]), i = j.classes === !0 || j.styles === !0 || j.attributes === !0, p = j, 
m = void 0;
for (m in y) p[m] = n(p[m]);
k = !0;
for (m in z) m = z[m], p[m] = CKEDITOR.tools.objectKeys(p[m]), p[m] && (k = !1);
if (p.nothingRequired = k, j.elements === !0 || null === j.elements) j.elements = n(j.elements), 
a[i ? "unshift" :"push"](j); else {
p = j.elements, delete j.elements;
for (e in p) f[e] ? f[e][i ? "unshift" :"push"](j) :f[e] = [ j ];
}
}
return b.elements = f, b.generic = a.length ? a :null, !0;
},
applyTo:function(b, c, d, e) {
if (this.disabled) return !1;
var f = [], g = !d && this._.rules, h = this._.transformations, j = a(this), i = this.editor && this.editor.config.protectedSource, p = !1;
b.forEach(function(a) {
if (a.type == CKEDITOR.NODE_ELEMENT) {
if ("off" == a.attributes["data-cke-filter"]) return !1;
c && "span" == a.name && ~CKEDITOR.tools.objectKeys(a.attributes).join("|").indexOf("data-cke-") || j(a, g, h, f, c) && (p = !0);
} else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
var b;
a:{
var d = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, ""));
b = [];
var e, l, m;
if (i) for (l = 0; l < i.length; ++l) if ((m = d.match(i[l])) && m[0].length == d.length) {
b = !0;
break a;
}
d = CKEDITOR.htmlParser.fragment.fromHtml(d), 1 == d.children.length && (e = d.children[0]).type == CKEDITOR.NODE_ELEMENT && j(e, g, h, b, c), 
b = !b.length;
}
b || f.push(a);
}
}, null, !0), f.length && (p = !0);
for (var m, b = [], e = x[e || (this.editor ? this.editor.enterMode :CKEDITOR.ENTER_P)]; d = f.pop(); ) d.type == CKEDITOR.NODE_ELEMENT ? l(d, e, b) :d.remove();
for (;m = b.pop(); ) if (d = m.el, d.parent) switch (m.check) {
case "it":
A.$removeEmpty[d.name] && !d.children.length ? l(d, e, b) :k(d) || l(d, e, b);
break;

case "el-up":
d.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && !A[d.parent.name][d.name] && l(d, e, b);
break;

case "parent-down":
d.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && !A[d.parent.name][d.name] && l(d.parent, e, b);
}
return p;
},
checkFeature:function(a) {
return this.disabled || !a ? !0 :(a.toFeature && (a = a.toFeature(this.editor)), 
!a.requiredContent || this.check(a.requiredContent));
},
disable:function() {
this.disabled = !0;
},
addContentForms:function(a) {
if (!this.disabled && a) {
var b, c, e, d = [];
for (b = 0; b < a.length && !e; ++b) c = a[b], ("string" == typeof c || c instanceof CKEDITOR.style) && this.check(c) && (e = c);
if (e) {
for (b = 0; b < a.length; ++b) d.push(p(a[b], e));
this.addTransformations(d);
}
}
},
addFeature:function(a) {
return this.disabled || !a ? !0 :(a.toFeature && (a = a.toFeature(this.editor)), 
this.allow(a.allowedContent, a.name), this.addTransformations(a.contentTransformations), 
this.addContentForms(a.contentForms), this.customConfig && a.requiredContent ? this.check(a.requiredContent) :!0);
},
addTransformations:function(a) {
var b, c;
if (!this.disabled && a) {
var e, d = this._.transformations;
for (e = 0; e < a.length; ++e) {
b = a[e];
var l = void 0, f = void 0, g = void 0, h = void 0, j = void 0, i = void 0;
for (c = [], f = 0; f < b.length; ++f) g = b[f], "string" == typeof g ? (g = g.split(/\s*:\s*/), 
h = g[0], j = null, i = g[1]) :(h = g.check, j = g.left, i = g.right), l || (l = g, 
l = l.element ? l.element :h ? h.match(/^([a-z0-9]+)/i)[0] :l.left.getDefinition().element), 
j instanceof CKEDITOR.style && (j = u(j)), c.push({
check:h == l ? null :h,
left:j,
right:"string" == typeof i ? v(i) :i
});
b = l, d[b] || (d[b] = []), d[b].push(c);
}
}
},
check:function(b, c, d) {
if (this.disabled) return !0;
if (CKEDITOR.tools.isArray(b)) {
for (var e = b.length; e--; ) if (this.check(b[e], c, d)) return !0;
return !1;
}
var l, f;
if ("string" == typeof b) {
if (f = b + "<" + (c === !1 ? "0" :"1") + (d ? "1" :"0") + ">", f in this._.cachedChecks) return this._.cachedChecks[f];
e = g(b).$1, l = e.styles;
var h = e.classes;
e.name = e.elements, e.classes = h = h ? h.split(/\s*,\s*/) :[], e.styles = j(l), 
e.attributes = j(e.attributes), e.children = [], h.length && (e.attributes["class"] = h.join(" ")), 
l && (e.attributes.style = CKEDITOR.tools.writeCssText(e.styles)), l = e;
} else e = b.getDefinition(), l = e.styles, h = e.attributes || {}, l ? (l = w(l), 
h.style = CKEDITOR.tools.writeCssText(l, !0)) :l = {}, l = {
name:e.element,
attributes:h,
classes:h["class"] ? h["class"].split(/\s+/) :[],
styles:l,
children:[]
};
var k, h = CKEDITOR.tools.clone(l), p = [];
if (c !== !1 && (k = this._.transformations[l.name])) {
for (e = 0; e < k.length; ++e) m(this, l, k[e]);
i(l);
}
return a(this)(h, this._.rules, c === !1 ? !1 :this._.transformations, p, !1, !d, !d), 
c = p.length > 0 ? !1 :CKEDITOR.tools.objectCompare(l.attributes, h.attributes, !0) ? !0 :!1, 
"string" == typeof b && (this._.cachedChecks[f] = c), c;
},
getAllowedEnterMode:function() {
var a = [ "p", "div", "br" ], b = {
p:CKEDITOR.ENTER_P,
div:CKEDITOR.ENTER_DIV,
br:CKEDITOR.ENTER_BR
};
return function(c, d) {
var l, e = a.slice();
if (this.check(x[c])) return c;
for (d || (e = e.reverse()); l = e.pop(); ) if (this.check(l)) return b[l];
return CKEDITOR.ENTER_BR;
};
}()
};
var y = {
styles:1,
attributes:1,
classes:1
}, z = {
styles:"requiredStyles",
attributes:"requiredAttributes",
classes:"requiredClasses"
}, B = /^([a-z0-9*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i, F = {
styles:/{([^}]+)}/,
attrs:/\[([^\]]+)\]/,
classes:/\(([^\)]+)\)/
}, C = CKEDITOR.filter.transformationsTools = {
sizeToStyle:function(a) {
this.lengthToStyle(a, "width"), this.lengthToStyle(a, "height");
},
sizeToAttribute:function(a) {
this.lengthToAttribute(a, "width"), this.lengthToAttribute(a, "height");
},
lengthToStyle:function(a, b, c) {
if (c = c || b, !(c in a.styles)) {
var d = a.attributes[b];
d && (/^\d+$/.test(d) && (d += "px"), a.styles[c] = d);
}
delete a.attributes[b];
},
lengthToAttribute:function(a, b, c) {
if (c = c || b, !(c in a.attributes)) {
var d = a.styles[b], e = d && d.match(/^(\d+)(?:\.\d*)?px$/);
e ? a.attributes[c] = e[1] :d == s && (a.attributes[c] = s);
}
delete a.styles[b];
},
alignmentToStyle:function(a) {
if (!("float" in a.styles)) {
var b = a.attributes.align;
("left" == b || "right" == b) && (a.styles["float"] = b);
}
delete a.attributes.align;
},
alignmentToAttribute:function(a) {
if (!("align" in a.attributes)) {
var b = a.styles["float"];
("left" == b || "right" == b) && (a.attributes.align = b);
}
delete a.styles["float"];
},
matchesStyle:r,
transform:function(a, b) {
if ("string" == typeof b) a.name = b; else {
var l, f, g, h, c = b.getDefinition(), d = c.styles, e = c.attributes;
a.name = c.element;
for (l in e) if ("class" == l) for (c = a.classes.join("|"), g = e[l].split(/\s+/); h = g.pop(); ) -1 == c.indexOf(h) && a.classes.push(h); else a.attributes[l] = e[l];
for (f in d) a.styles[f] = d[f];
}
}
};
}(), function() {
CKEDITOR.focusManager = function(d) {
return d.focusManager ? d.focusManager :(this.hasFocus = !1, this.currentActive = null, 
this._ = {
editor:d
}, this);
}, CKEDITOR.focusManager._ = {
blurDelay:200
}, CKEDITOR.focusManager.prototype = {
focus:function(d) {
this._.timer && clearTimeout(this._.timer), d && (this.currentActive = d), this.hasFocus || this._.locked || ((d = CKEDITOR.currentInstance) && d.focusManager.blur(1), 
this.hasFocus = !0, (d = this._.editor.container) && d.addClass("cke_focus"), this._.editor.fire("focus"));
},
lock:function() {
this._.locked = 1;
},
unlock:function() {
delete this._.locked;
},
blur:function(d) {
function e() {
if (this.hasFocus) {
this.hasFocus = !1;
var a = this._.editor.container;
a && a.removeClass("cke_focus"), this._.editor.fire("blur");
}
}
if (!this._.locked) {
this._.timer && clearTimeout(this._.timer);
var c = CKEDITOR.focusManager._.blurDelay;
d || !c ? e.call(this) :this._.timer = CKEDITOR.tools.setTimeout(function() {
delete this._.timer, e.call(this);
}, c, this);
}
},
add:function(d, e) {
var c = d.getCustomData("focusmanager");
if (!c || c != this) {
c && c.remove(d);
var c = "focus", a = "blur";
e && (CKEDITOR.env.ie ? (c = "focusin", a = "focusout") :CKEDITOR.event.useCapture = 1);
var b = {
blur:function() {
d.equals(this.currentActive) && this.blur();
},
focus:function() {
this.focus(d);
}
};
d.on(c, b.focus, this), d.on(a, b.blur, this), e && (CKEDITOR.event.useCapture = 0), 
d.setCustomData("focusmanager", this), d.setCustomData("focusmanager_handlers", b);
}
},
remove:function(d) {
d.removeCustomData("focusmanager");
var e = d.removeCustomData("focusmanager_handlers");
d.removeListener("blur", e.blur), d.removeListener("focus", e.focus);
}
};
}(), CKEDITOR.keystrokeHandler = function(d) {
return d.keystrokeHandler ? d.keystrokeHandler :(this.keystrokes = {}, this.blockedKeystrokes = {}, 
this._ = {
editor:d
}, this);
}, function() {
var d, e = function(a) {
var a = a.data, b = a.getKeystroke(), c = this.keystrokes[b], e = this._.editor;
return d = e.fire("key", {
keyCode:b
}) === !1, d || (c && (d = e.execCommand(c, {
from:"keystrokeHandler"
}) !== !1), d || (d = !!this.blockedKeystrokes[b])), d && a.preventDefault(!0), 
!d;
}, c = function(a) {
d && (d = !1, a.data.preventDefault(!0));
};
CKEDITOR.keystrokeHandler.prototype = {
attach:function(a) {
a.on("keydown", e, this), (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) && a.on("keypress", c, this);
}
};
}(), function() {
CKEDITOR.lang = {
languages:{
af:1,
ar:1,
bg:1,
bn:1,
bs:1,
ca:1,
cs:1,
cy:1,
da:1,
de:1,
el:1,
"en-au":1,
"en-ca":1,
"en-gb":1,
en:1,
eo:1,
es:1,
et:1,
eu:1,
fa:1,
fi:1,
fo:1,
"fr-ca":1,
fr:1,
gl:1,
gu:1,
he:1,
hi:1,
hr:1,
hu:1,
id:1,
is:1,
it:1,
ja:1,
ka:1,
km:1,
ko:1,
ku:1,
lt:1,
lv:1,
mk:1,
mn:1,
ms:1,
nb:1,
nl:1,
no:1,
pl:1,
"pt-br":1,
pt:1,
ro:1,
ru:1,
si:1,
sk:1,
sl:1,
sq:1,
"sr-latn":1,
sr:1,
sv:1,
th:1,
tr:1,
ug:1,
uk:1,
vi:1,
"zh-cn":1,
zh:1
},
rtl:{
ar:1,
fa:1,
he:1,
ku:1,
ug:1
},
load:function(d, e, c) {
d && CKEDITOR.lang.languages[d] || (d = this.detect(e, d)), this[d] ? c(d, this[d]) :CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + d + ".js"), function() {
this[d].dir = this.rtl[d] ? "rtl" :"ltr", c(d, this[d]);
}, this);
},
detect:function(d, e) {
var c = this.languages, e = e || navigator.userLanguage || navigator.language || d, a = e.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/), b = a[1], a = a[2];
return c[b + "-" + a] ? b = b + "-" + a :c[b] || (b = null), CKEDITOR.lang.detect = b ? function() {
return b;
} :function(a) {
return a;
}, b || d;
}
};
}(), CKEDITOR.scriptLoader = function() {
var d = {}, e = {};
return {
load:function(c, a, b, j) {
var g = "string" == typeof c;
g && (c = [ c ]), b || (b = CKEDITOR);
var h = c.length, f = [], i = [], k = function(c) {
a && (g ? a.call(b, c) :a.call(b, f, i));
};
if (0 === h) k(!0); else {
var n = function(a, b) {
(b ? f :i).push(a), --h <= 0 && (j && CKEDITOR.document.getDocumentElement().removeStyle("cursor"), 
k(b));
}, o = function(a, b) {
d[a] = 1;
var c = e[a];
delete e[a];
for (var l = 0; l < c.length; l++) c[l](a, b);
}, q = function(b) {
if (d[b]) n(b, !0); else {
var c = e[b] || (e[b] = []);
if (c.push(n), !(c.length > 1)) {
var l = new CKEDITOR.dom.element("script");
l.setAttributes({
type:"text/javascript",
src:b
}), a && (CKEDITOR.env.ie && CKEDITOR.env.version < 11 ? l.$.onreadystatechange = function() {
("loaded" == l.$.readyState || "complete" == l.$.readyState) && (l.$.onreadystatechange = null, 
o(b, !0));
} :(l.$.onload = function() {
setTimeout(function() {
o(b, !0);
}, 0);
}, l.$.onerror = function() {
o(b, !1);
})), l.appendTo(CKEDITOR.document.getHead());
}
}
};
j && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait");
for (var l = 0; h > l; l++) q(c[l]);
}
},
queue:function() {
function c() {
var b;
(b = a[0]) && this.load(b.scriptUrl, b.callback, CKEDITOR, 0);
}
var a = [];
return function(b, d) {
var e = this;
a.push({
scriptUrl:b,
callback:function() {
d && d.apply(this, arguments), a.shift(), c.call(e);
}
}), 1 == a.length && c.call(this);
};
}()
};
}(), CKEDITOR.resourceManager = function(d, e) {
this.basePath = d, this.fileName = e, this.registered = {}, this.loaded = {}, this.externals = {}, 
this._ = {
waitingList:{}
};
}, CKEDITOR.resourceManager.prototype = {
add:function(d, e) {
if (this.registered[d]) throw '[CKEDITOR.resourceManager.add] The resource name "' + d + '" is already registered.';
var c = this.registered[d] = e || {};
return c.name = d, c.path = this.getPath(d), CKEDITOR.fire(d + CKEDITOR.tools.capitalize(this.fileName) + "Ready", c), 
this.get(d);
},
get:function(d) {
return this.registered[d] || null;
},
getPath:function(d) {
var e = this.externals[d];
return CKEDITOR.getUrl(e && e.dir || this.basePath + d + "/");
},
getFilePath:function(d) {
var e = this.externals[d];
return CKEDITOR.getUrl(this.getPath(d) + (e ? e.file :this.fileName + ".js"));
},
addExternal:function(d, e, c) {
for (var d = d.split(","), a = 0; a < d.length; a++) {
var b = d[a];
c || (e = e.replace(/[^\/]+$/, function(a) {
return c = a, "";
})), this.externals[b] = {
dir:e,
file:c || this.fileName + ".js"
};
}
},
load:function(d, e, c) {
CKEDITOR.tools.isArray(d) || (d = d ? [ d ] :[]);
for (var a = this.loaded, b = this.registered, j = [], g = {}, h = {}, f = 0; f < d.length; f++) {
var i = d[f];
if (i) if (a[i] || b[i]) h[i] = this.get(i); else {
var k = this.getFilePath(i);
j.push(k), k in g || (g[k] = []), g[k].push(i);
}
}
CKEDITOR.scriptLoader.load(j, function(b, d) {
if (d.length) throw '[CKEDITOR.resourceManager.load] Resource name "' + g[d[0]].join(",") + '" was not found at "' + d[0] + '".';
for (var f = 0; f < b.length; f++) for (var l = g[b[f]], j = 0; j < l.length; j++) {
var i = l[j];
h[i] = this.get(i), a[i] = 1;
}
e.call(c, h);
}, this);
}
}, CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin"), CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function(d) {
var e = {};
return function(c, a, b) {
var j = {}, g = function(c) {
d.call(this, c, function(c) {
CKEDITOR.tools.extend(j, c);
var h, d = [];
for (h in c) {
var n = c[h], o = n && n.requires;
if (!e[h]) {
if (n.icons) for (var q = n.icons.split(","), l = q.length; l--; ) CKEDITOR.skin.addIcon(q[l], n.path + "icons/" + (CKEDITOR.env.hidpi && n.hidpi ? "hidpi/" :"") + q[l] + ".png");
e[h] = 1;
}
if (o) for (o.split && (o = o.split(",")), n = 0; n < o.length; n++) j[o[n]] || d.push(o[n]);
}
if (d.length) g.call(this, d); else {
for (h in j) n = j[h], n.onLoad && !n.onLoad._called && (n.onLoad() === !1 && delete j[h], 
n.onLoad._called = 1);
a && a.call(b || window, j);
}
}, this);
};
g.call(this, c);
};
}), CKEDITOR.plugins.setLang = function(d, e, c) {
var a = this.get(d), d = a.langEntries || (a.langEntries = {}), a = a.lang || (a.lang = []);
a.split && (a = a.split(",")), -1 == CKEDITOR.tools.indexOf(a, e) && a.push(e), 
d[e] = c;
}, CKEDITOR.ui = function(d) {
return d.ui ? d.ui :(this.items = {}, this.instances = {}, this.editor = d, this._ = {
handlers:{}
}, this);
}, CKEDITOR.ui.prototype = {
add:function(d, e, c) {
c.name = d.toLowerCase();
var a = this.items[d] = {
type:e,
command:c.command || null,
args:Array.prototype.slice.call(arguments, 2)
};
CKEDITOR.tools.extend(a, c);
},
get:function(d) {
return this.instances[d];
},
create:function(d) {
var e = this.items[d], c = e && this._.handlers[e.type], a = e && e.command && this.editor.getCommand(e.command), c = c && c.create.apply(this, e.args);
return this.instances[d] = c, a && a.uiItems.push(c), c && !c.type && (c.type = e.type), 
c;
},
addHandler:function(d, e) {
this._.handlers[d] = e;
},
space:function(d) {
return CKEDITOR.document.getById(this.spaceId(d));
},
spaceId:function(d) {
return this.editor.id + "_" + d;
}
}, CKEDITOR.event.implementOn(CKEDITOR.ui), function() {
function d(a, d, f) {
if (CKEDITOR.event.call(this), a = a && CKEDITOR.tools.clone(a), void 0 !== d) {
if (!(d instanceof CKEDITOR.dom.element)) throw Error("Expect element of type CKEDITOR.dom.element.");
if (!f) throw Error("One of the element modes must be specified.");
if (CKEDITOR.env.ie && CKEDITOR.env.quirks && f == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks.");
if (!(f == CKEDITOR.ELEMENT_MODE_INLINE ? d.is(CKEDITOR.dtd.$editable) || d.is("textarea") :f == CKEDITOR.ELEMENT_MODE_REPLACE ? !d.is(CKEDITOR.dtd.$nonBodyContent) :1)) throw Error('The specified element mode is not supported on element: "' + d.getName() + '".');
this.element = d, this.elementMode = f, this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (d.getId() || d.getNameAtt());
} else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE;
this._ = {}, this.commands = {}, this.templates = {}, this.name = this.name || e(), 
this.id = CKEDITOR.tools.getNextId(), this.status = "unloaded", this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config), 
this.ui = new CKEDITOR.ui(this), this.focusManager = new CKEDITOR.focusManager(this), 
this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this), this.on("readOnly", c), 
this.on("selectionChange", function(a) {
b(this, a.data.path);
}), this.on("activeFilterChange", function() {
b(this, this.elementPath(), !0);
}), this.on("mode", c), this.on("instanceReady", function() {
this.config.startupFocus && this.focus();
}), CKEDITOR.fire("instanceCreated", null, this), CKEDITOR.add(this), CKEDITOR.tools.setTimeout(function() {
g(this, a);
}, 0, this);
}
function e() {
do var a = "editor" + ++o; while (CKEDITOR.instances[a]);
return a;
}
function c() {
var c, b = this.commands;
for (c in b) a(this, b[c]);
}
function a(a, b) {
b[b.startDisabled ? "disable" :a.readOnly && !b.readOnly ? "disable" :b.modes[a.mode] ? "enable" :"disable"]();
}
function b(a, b, c) {
if (b) {
var d, e, f = a.commands;
for (e in f) d = f[e], (c || d.contextSensitive) && d.refresh(a, b);
}
}
function j(a) {
var b = a.config.customConfig;
if (!b) return !1;
var b = CKEDITOR.getUrl(b), c = q[b] || (q[b] = {});
return c.fn ? (c.fn.call(a, a.config), (CKEDITOR.getUrl(a.config.customConfig) == b || !j(a)) && a.fireOnce("customConfigLoaded")) :CKEDITOR.scriptLoader.queue(b, function() {
c.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig :function() {}, j(a);
}), !0;
}
function g(a, b) {
a.on("customConfigLoaded", function() {
if (b) {
if (b.on) for (var c in b.on) a.on(c, b.on[c]);
CKEDITOR.tools.extend(a.config, b, !0), delete a.config.on;
}
c = a.config, a.readOnly = !(!c.readOnly && !(a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.is("textarea") ? a.element.hasAttribute("disabled") :a.element.isReadOnly() :a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && a.element.hasAttribute("disabled"))), 
a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? !(a.element.is("textarea") || CKEDITOR.dtd[a.element.getName()].p) :!1, 
a.tabIndex = c.tabIndex || a.element && a.element.getAttribute("tabindex") || 0, 
a.activeEnterMode = a.enterMode = a.blockless ? CKEDITOR.ENTER_BR :c.enterMode, 
a.activeShiftEnterMode = a.shiftEnterMode = a.blockless ? CKEDITOR.ENTER_BR :c.shiftEnterMode, 
c.skin && (CKEDITOR.skinName = c.skin), a.fireOnce("configLoaded"), a.dataProcessor = new CKEDITOR.htmlDataProcessor(a), 
a.filter = a.activeFilter = new CKEDITOR.filter(a), h(a);
}), b && void 0 != b.customConfig && (a.config.customConfig = b.customConfig), j(a) || a.fireOnce("customConfigLoaded");
}
function h(a) {
CKEDITOR.skin.loadPart("editor", function() {
f(a);
});
}
function f(a) {
CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function(b, c) {
var d = a.config.title;
a.langCode = b, a.lang = CKEDITOR.tools.prototypedCopy(c), a.title = "string" == typeof d || d === !1 ? d :[ a.lang.editor, a.name ].join(", "), 
CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 && "rtl" == a.lang.dir && (a.lang.dir = "ltr"), 
a.config.contentsLangDirection || (a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) :a.lang.dir), 
a.fire("langLoaded"), i(a);
});
}
function i(a) {
a.getStylesSet(function(b) {
a.once("loaded", function() {
a.fire("stylesSet", {
styles:b
});
}, null, null, 1), k(a);
});
}
function k(a) {
var b = a.config, c = b.plugins, d = b.extraPlugins, e = b.removePlugins;
if (d) var f = RegExp("(?:^|,)(?:" + d.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"), c = c.replace(f, ""), c = c + ("," + d);
if (e) var g = RegExp("(?:^|,)(?:" + e.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"), c = c.replace(g, "");
CKEDITOR.env.air && (c += ",adobeair"), CKEDITOR.plugins.load(c.split(","), function(c) {
var d = [], e = [], f = [];
a.plugins = c;
for (var h in c) {
var u, j = c[h], i = j.lang, p = null, k = j.requires;
if (CKEDITOR.tools.isArray(k) && (k = k.join(",")), k && (u = k.match(g))) for (;k = u.pop(); ) CKEDITOR.tools.setTimeout(function(a, b) {
throw Error('Plugin "' + a.replace(",", "") + '" cannot be removed from the plugins list, because it\'s required by "' + b + '" plugin.');
}, 0, null, [ k, h ]);
i && !a.lang[h] && (i.split && (i = i.split(",")), CKEDITOR.tools.indexOf(i, a.langCode) >= 0 ? p = a.langCode :(p = a.langCode.replace(/-.*/, ""), 
p = p != a.langCode && CKEDITOR.tools.indexOf(i, p) >= 0 ? p :CKEDITOR.tools.indexOf(i, "en") >= 0 ? "en" :i[0]), 
j.langEntries && j.langEntries[p] ? (a.lang[h] = j.langEntries[p], p = null) :f.push(CKEDITOR.getUrl(j.path + "lang/" + p + ".js"))), 
e.push(p), d.push(j);
}
CKEDITOR.scriptLoader.load(f, function() {
for (var c = [ "beforeInit", "init", "afterInit" ], f = 0; f < c.length; f++) for (var g = 0; g < d.length; g++) {
var h = d[g];
0 === f && e[g] && h.lang && h.langEntries && (a.lang[h.name] = h.langEntries[e[g]]), 
h[c[f]] && h[c[f]](a);
}
for (a.fireOnce("pluginsLoaded"), b.keystrokes && a.setKeystroke(a.config.keystrokes), 
g = 0; g < a.config.blockedKeystrokes.length; g++) a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[g]] = 1;
a.status = "loaded", a.fireOnce("loaded"), CKEDITOR.fire("instanceLoaded", null, a);
});
});
}
function n() {
var a = this.element;
if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) {
var b = this.getData();
return this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b)), a.is("textarea") ? a.setValue(b) :a.setHtml(b), 
!0;
}
return !1;
}
d.prototype = CKEDITOR.editor.prototype, CKEDITOR.editor = d;
var o = 0, q = {};
CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
addCommand:function(b, c) {
c.name = b.toLowerCase();
var d = new CKEDITOR.command(this, c);
return this.mode && a(this, d), this.commands[b] = d;
},
_attachToForm:function() {
var a = this, b = a.element, c = new CKEDITOR.dom.element(b.$.form);
if (b.is("textarea") && c) {
var d = function(c) {
a.updateElement(), a._.required && !b.getValue() && a.fire("required") === !1 && c.data.preventDefault();
};
c.on("submit", d), c.$.submit && c.$.submit.call && c.$.submit.apply && (c.$.submit = CKEDITOR.tools.override(c.$.submit, function(a) {
return function() {
d(), a.apply ? a.apply(this) :a();
};
})), a.on("destroy", function() {
c.removeListener("submit", d);
});
}
},
destroy:function(a) {
this.fire("beforeDestroy"), !a && n.call(this), this.editable(null), this.status = "destroyed", 
this.fire("destroy"), this.removeAllListeners(), CKEDITOR.remove(this), CKEDITOR.fire("instanceDestroyed", null, this);
},
elementPath:function(a) {
return (a = a || this.getSelection().getStartElement()) ? new CKEDITOR.dom.elementPath(a, this.editable()) :null;
},
createRange:function() {
var a = this.editable();
return a ? new CKEDITOR.dom.range(a) :null;
},
execCommand:function(a, b) {
var c = this.getCommand(a), d = {
name:a,
commandData:b,
command:c
};
return c && c.state != CKEDITOR.TRISTATE_DISABLED && this.fire("beforeCommandExec", d) !== !0 && (d.returnValue = c.exec(d.commandData), 
!c.async && this.fire("afterCommandExec", d) !== !0) ? d.returnValue :!1;
},
getCommand:function(a) {
return this.commands[a];
},
getData:function(a) {
!a && this.fire("beforeGetData");
var b = this._.data;
return "string" != typeof b && (b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() :b.getHtml() :""), 
b = {
dataValue:b
}, !a && this.fire("getData", b), b.dataValue;
},
getSnapshot:function() {
var a = this.fire("getSnapshot");
if ("string" != typeof a) {
var b = this.element;
b && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (a = b.is("textarea") ? b.getValue() :b.getHtml());
}
return a;
},
loadSnapshot:function(a) {
this.fire("loadSnapshot", a);
},
setData:function(a, b, c) {
b && this.on("dataReady", function(a) {
a.removeListener(), b.call(a.editor);
}), a = {
dataValue:a
}, !c && this.fire("setData", a), this._.data = a.dataValue, !c && this.fire("afterSetData", a);
},
setReadOnly:function(a) {
a = void 0 == a || a, this.readOnly != a && (this.readOnly = a, this.keystrokeHandler.blockedKeystrokes[8] = +a, 
this.editable().setReadOnly(a), this.fire("readOnly"));
},
insertHtml:function(a, b) {
this.fire("insertHtml", {
dataValue:a,
mode:b
});
},
insertText:function(a) {
this.fire("insertText", a);
},
insertElement:function(a) {
this.fire("insertElement", a);
},
focus:function() {
this.fire("beforeFocus");
},
checkDirty:function() {
return "ready" == this.status && this._.previousValue !== this.getSnapshot();
},
resetDirty:function() {
this._.previousValue = this.getSnapshot();
},
updateElement:function() {
return n.call(this);
},
setKeystroke:function() {
for (var c, d, a = this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] :[ [].slice.call(arguments, 0) ], e = b.length; e--; ) c = b[e], 
d = 0, CKEDITOR.tools.isArray(c) && (d = c[1], c = c[0]), d ? a[c] = d :delete a[c];
},
addFeature:function(a) {
return this.filter.addFeature(a);
},
setActiveFilter:function(a) {
a || (a = this.filter), this.activeFilter !== a && (this.activeFilter = a, this.fire("activeFilterChange"), 
a === this.filter ? this.setActiveEnterMode(null, null) :this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode), a.getAllowedEnterMode(this.shiftEnterMode, !0)));
},
setActiveEnterMode:function(a, b) {
a = a ? this.blockless ? CKEDITOR.ENTER_BR :a :this.enterMode, b = b ? this.blockless ? CKEDITOR.ENTER_BR :b :this.shiftEnterMode, 
(this.activeEnterMode != a || this.activeShiftEnterMode != b) && (this.activeEnterMode = a, 
this.activeShiftEnterMode = b, this.fire("activeEnterModeChange"));
}
});
}(), CKEDITOR.ELEMENT_MODE_NONE = 0, CKEDITOR.ELEMENT_MODE_REPLACE = 1, CKEDITOR.ELEMENT_MODE_APPENDTO = 2, 
CKEDITOR.ELEMENT_MODE_INLINE = 3, CKEDITOR.htmlParser = function() {
this._ = {
htmlPartsRegex:RegExp("<(?:(?:\\/([^>]+)>)|(?:!--([\\S|\\s]*?)-->)|(?:([^\\s>]+)\\s*((?:(?:\"[^\"]*\")|(?:'[^']*')|[^\"'>])*)\\/?>))", "g")
};
}, function() {
var d = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g, e = {
checked:1,
compact:1,
declare:1,
defer:1,
disabled:1,
ismap:1,
multiple:1,
nohref:1,
noresize:1,
noshade:1,
nowrap:1,
readonly:1,
selected:1
};
CKEDITOR.htmlParser.prototype = {
onTagOpen:function() {},
onTagClose:function() {},
onText:function() {},
onCDATA:function() {},
onComment:function() {},
parse:function(c) {
for (var a, b, g, j = 0; a = this._.htmlPartsRegex.exec(c); ) if (b = a.index, b > j && (j = c.substring(j, b), 
g ? g.push(j) :this.onText(j)), j = this._.htmlPartsRegex.lastIndex, !(b = a[1]) || (b = b.toLowerCase(), 
g && CKEDITOR.dtd.$cdata[b] && (this.onCDATA(g.join("")), g = null), g)) if (g) g.push(a[0]); else if (b = a[3]) {
if (b = b.toLowerCase(), !/="/.test(b)) {
var f, h = {};
a = a[4];
var i = !(!a || "/" != a.charAt(a.length - 1));
if (a) for (;f = d.exec(a); ) {
var k = f[1].toLowerCase();
f = f[2] || f[3] || f[4] || "", h[k] = !f && e[k] ? k :CKEDITOR.tools.htmlDecodeAttr(f);
}
this.onTagOpen(b, h, i), !g && CKEDITOR.dtd.$cdata[b] && (g = []);
}
} else (b = a[2]) && this.onComment(b); else this.onTagClose(b);
c.length > j && this.onText(c.substring(j, c.length));
}
};
}(), CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
$:function() {
this._ = {
output:[]
};
},
proto:{
openTag:function(d) {
this._.output.push("<", d);
},
openTagClose:function(d, e) {
e ? this._.output.push(" />") :this._.output.push(">");
},
attribute:function(d, e) {
"string" == typeof e && (e = CKEDITOR.tools.htmlEncodeAttr(e)), this._.output.push(" ", d, '="', e, '"');
},
closeTag:function(d) {
this._.output.push("</", d, ">");
},
text:function(d) {
this._.output.push(d);
},
comment:function(d) {
this._.output.push("<!--", d, "-->");
},
write:function(d) {
this._.output.push(d);
},
reset:function() {
this._.output = [], this._.indent = !1;
},
getHtml:function(d) {
var e = this._.output.join("");
return d && this.reset(), e;
}
}
}), function() {
CKEDITOR.htmlParser.node = function() {}, CKEDITOR.htmlParser.node.prototype = {
remove:function() {
var d = this.parent.children, e = CKEDITOR.tools.indexOf(d, this), c = this.previous, a = this.next;
c && (c.next = a), a && (a.previous = c), d.splice(e, 1), this.parent = null;
},
replaceWith:function(d) {
var e = this.parent.children, c = CKEDITOR.tools.indexOf(e, this), a = d.previous = this.previous, b = d.next = this.next;
a && (a.next = d), b && (b.previous = d), e[c] = d, d.parent = this.parent, this.parent = null;
},
insertAfter:function(d) {
var e = d.parent.children, c = CKEDITOR.tools.indexOf(e, d), a = d.next;
e.splice(c + 1, 0, this), this.next = d.next, this.previous = d, d.next = this, 
a && (a.previous = this), this.parent = d.parent;
},
insertBefore:function(d) {
var e = d.parent.children, c = CKEDITOR.tools.indexOf(e, d);
e.splice(c, 0, this), this.next = d, (this.previous = d.previous) && (d.previous.next = this), 
d.previous = this, this.parent = d.parent;
},
getAscendant:function(d) {
for (var e = ("function" == typeof d ? d :"string" == typeof d ? function(a) {
return a.name == d;
} :function(a) {
return a.name in d;
}), c = this.parent; c && c.type == CKEDITOR.NODE_ELEMENT; ) {
if (e(c)) return c;
c = c.parent;
}
return null;
},
wrapWith:function(d) {
return this.replaceWith(d), d.add(this), d;
},
getIndex:function() {
return CKEDITOR.tools.indexOf(this.parent.children, this);
},
getFilterContext:function(d) {
return d || {};
}
};
}(), CKEDITOR.htmlParser.comment = function(d) {
this.value = d, this._ = {
isBlockLike:!1
};
}, CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node(), {
type:CKEDITOR.NODE_COMMENT,
filter:function(d, e) {
var c = this.value;
return (c = d.onComment(e, c, this)) ? "string" != typeof c ? (this.replaceWith(c), 
!1) :(this.value = c, !0) :(this.remove(), !1);
},
writeHtml:function(d, e) {
e && this.filter(e), d.comment(this.value);
}
}), function() {
CKEDITOR.htmlParser.text = function(d) {
this.value = d, this._ = {
isBlockLike:!1
};
}, CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node(), {
type:CKEDITOR.NODE_TEXT,
filter:function(d, e) {
return (this.value = d.onText(e, this.value, this)) ? void 0 :(this.remove(), !1);
},
writeHtml:function(d, e) {
e && this.filter(e), d.text(this.value);
}
});
}(), function() {
CKEDITOR.htmlParser.cdata = function(d) {
this.value = d;
}, CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node(), {
type:CKEDITOR.NODE_TEXT,
filter:function() {},
writeHtml:function(d) {
d.write(this.value);
}
});
}(), CKEDITOR.htmlParser.fragment = function() {
this.children = [], this.parent = null, this._ = {
isBlockLike:!0,
hasInlineStarted:!1
};
}, function() {
function d(a) {
return a.attributes["data-cke-survive"] ? !1 :"a" == a.name && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name];
}
var e = CKEDITOR.tools.extend({
table:1,
ul:1,
ol:1,
dl:1
}, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl), c = {
ol:1,
ul:1
}, a = CKEDITOR.tools.extend({}, {
html:1
}, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, {
style:1,
script:1
});
CKEDITOR.htmlParser.fragment.fromHtml = function(b, j, g) {
function h(a) {
var b;
if (m.length > 0) for (var c = 0; c < m.length; c++) {
var d = m[c], e = d.name, g = CKEDITOR.dtd[e], h = p.name && CKEDITOR.dtd[p.name];
h && !h[e] || a && g && !g[a] && CKEDITOR.dtd[a] ? e == p.name && (k(p, p.parent, 1), 
c--) :(b || (f(), b = 1), d = d.clone(), d.parent = p, p = d, m.splice(c, 1), c--);
}
}
function f() {
for (;r.length; ) k(r.shift(), p);
}
function i(a) {
if (a._.isBlockLike && "pre" != a.name && "textarea" != a.name) {
var d, b = a.children.length, c = a.children[b - 1];
c && c.type == CKEDITOR.NODE_TEXT && ((d = CKEDITOR.tools.rtrim(c.value)) ? c.value = d :a.children.length = b - 1);
}
}
function k(a, b, c) {
var b = b || p || l, e = p;
void 0 === a.previous && (n(b, a) && (p = b, q.onTagOpen(g, {}), a.returnPoint = b = p), 
i(a), (!d(a) || a.children.length) && b.add(a), "pre" == a.name && (v = !1), "textarea" == a.name && (u = !1)), 
a.returnPoint ? (p = a.returnPoint, delete a.returnPoint) :p = c ? b :e;
}
function n(a, b) {
if ((a == l || "body" == a.name) && g && (!a.name || CKEDITOR.dtd[a.name][g])) {
var c, d;
return (c = b.attributes && (d = b.attributes["data-cke-real-element-type"]) ? d :b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) && !b.isOrphan || b.type == CKEDITOR.NODE_TEXT;
}
}
function o(a, b) {
return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || "dt" == a && "dd" == b || "dd" == a && "dt" == b :!1;
}
var q = new CKEDITOR.htmlParser(), l = j instanceof CKEDITOR.htmlParser.element ? j :"string" == typeof j ? new CKEDITOR.htmlParser.element(j) :new CKEDITOR.htmlParser.fragment(), m = [], r = [], p = l, u = "textarea" == l.name, v = "pre" == l.name;
q.onTagOpen = function(b, g, l, j) {
if (g = new CKEDITOR.htmlParser.element(b, g), g.isUnknown && l && (g.isEmpty = !0), 
g.isOptionalClose = j, d(g)) m.push(g); else {
if ("pre" == b) v = !0; else {
if ("br" == b && v) return p.add(new CKEDITOR.htmlParser.text("\n")), void 0;
"textarea" == b && (u = !0);
}
if ("br" == b) r.push(g); else {
for (;j = (l = p.name) ? CKEDITOR.dtd[l] || (p._.isBlockLike ? CKEDITOR.dtd.div :CKEDITOR.dtd.span) :a, 
!(g.isUnknown || p.isUnknown || j[b]); ) if (p.isOptionalClose) q.onTagClose(l); else if (b in c && l in c) l = p.children, 
(l = l[l.length - 1]) && "li" == l.name || k(l = new CKEDITOR.htmlParser.element("li"), p), 
!g.returnPoint && (g.returnPoint = p), p = l; else if (b in CKEDITOR.dtd.$listItem && !o(b, l)) q.onTagOpen("li" == b ? "ul" :"dl", {}, 0, 1); else if (l in e && !o(b, l)) !g.returnPoint && (g.returnPoint = p), 
p = p.parent; else {
if (l in CKEDITOR.dtd.$inline && m.unshift(p), !p.parent) {
g.isOrphan = 1;
break;
}
k(p, p.parent, 1);
}
h(b), f(), g.parent = p, g.isEmpty ? k(g) :p = g;
}
}
}, q.onTagClose = function(a) {
for (var b = m.length - 1; b >= 0; b--) if (a == m[b].name) return m.splice(b, 1), 
void 0;
for (var c = [], d = [], e = p; e != l && e.name != a; ) e._.isBlockLike || d.unshift(e), 
c.push(e), e = e.returnPoint || e.parent;
if (e != l) {
for (b = 0; b < c.length; b++) {
var h = c[b];
k(h, h.parent);
}
p = e, e._.isBlockLike && f(), k(e, e.parent), e == p && (p = p.parent), m = m.concat(d);
}
"body" == a && (g = !1);
}, q.onText = function(b) {
if (p._.hasInlineStarted && !r.length || v || u || (b = CKEDITOR.tools.ltrim(b), 
0 !== b.length)) {
var d = p.name, l = d ? CKEDITOR.dtd[d] || (p._.isBlockLike ? CKEDITOR.dtd.div :CKEDITOR.dtd.span) :a;
!u && !l["#"] && d in e ? (q.onTagOpen(d in c ? "li" :"dl" == d ? "dd" :"table" == d ? "tr" :"tr" == d ? "td" :""), 
q.onText(b)) :(f(), h(), !v && !u && (b = b.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " ")), 
b = new CKEDITOR.htmlParser.text(b), n(p, b) && this.onTagOpen(g, {}, 0, 1), p.add(b));
}
}, q.onCDATA = function(a) {
p.add(new CKEDITOR.htmlParser.cdata(a));
}, q.onComment = function(a) {
f(), h(), p.add(new CKEDITOR.htmlParser.comment(a));
}, q.parse(b);
for (f(); p != l; ) k(p, p.parent, 1);
return i(l), l;
}, CKEDITOR.htmlParser.fragment.prototype = {
type:CKEDITOR.NODE_DOCUMENT_FRAGMENT,
add:function(a, c) {
isNaN(c) && (c = this.children.length);
var d = c > 0 ? this.children[c - 1] :null;
if (d) {
if (a._.isBlockLike && d.type == CKEDITOR.NODE_TEXT && (d.value = CKEDITOR.tools.rtrim(d.value), 
0 === d.value.length)) return this.children.pop(), this.add(a), void 0;
d.next = a;
}
a.previous = d, a.parent = this, this.children.splice(c, 0, a), this._.hasInlineStarted || (this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike);
},
filter:function(a, c) {
c = this.getFilterContext(c), a.onRoot(c, this), this.filterChildren(a, !1, c);
},
filterChildren:function(a, c, d) {
if (this.childrenFilteredBy != a.id) for (d = this.getFilterContext(d), c && !this.parent && a.onRoot(d, this), 
this.childrenFilteredBy = a.id, c = 0; c < this.children.length; c++) this.children[c].filter(a, d) === !1 && c--;
},
writeHtml:function(a, c) {
c && this.filter(c), this.writeChildrenHtml(a);
},
writeChildrenHtml:function(a, c, d) {
var e = this.getFilterContext();
for (d && !this.parent && c && c.onRoot(e, this), c && this.filterChildren(c, !1, e), 
c = 0, d = this.children, e = d.length; e > c; c++) d[c].writeHtml(a);
},
forEach:function(a, c, d) {
if (!(d || c && this.type != c)) var e = a(this);
if (e !== !1) for (var d = this.children, f = 0; f < d.length; f++) e = d[f], e.type == CKEDITOR.NODE_ELEMENT ? e.forEach(a, c) :(!c || e.type == c) && a(e);
},
getFilterContext:function(a) {
return a || {};
}
};
}(), function() {
function d() {
this.rules = [];
}
function e(c, a, b, e) {
var g, h;
for (g in a) (h = c[g]) || (h = c[g] = new d()), h.add(a[g], b, e);
}
CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
$:function(c) {
this.id = CKEDITOR.tools.getNextNumber(), this.elementNameRules = new d(), this.attributeNameRules = new d(), 
this.elementsRules = {}, this.attributesRules = {}, this.textRules = new d(), this.commentRules = new d(), 
this.rootRules = new d(), c && this.addRules(c, 10);
},
proto:{
addRules:function(c, a) {
var b;
"number" == typeof a ? b = a :a && "priority" in a && (b = a.priority), "number" != typeof b && (b = 10), 
"object" != typeof a && (a = {}), c.elementNames && this.elementNameRules.addMany(c.elementNames, b, a), 
c.attributeNames && this.attributeNameRules.addMany(c.attributeNames, b, a), c.elements && e(this.elementsRules, c.elements, b, a), 
c.attributes && e(this.attributesRules, c.attributes, b, a), c.text && this.textRules.add(c.text, b, a), 
c.comment && this.commentRules.add(c.comment, b, a), c.root && this.rootRules.add(c.root, b, a);
},
applyTo:function(c) {
c.filter(this);
},
onElementName:function(c, a) {
return this.elementNameRules.execOnName(c, a);
},
onAttributeName:function(c, a) {
return this.attributeNameRules.execOnName(c, a);
},
onText:function(c, a) {
return this.textRules.exec(c, a);
},
onComment:function(c, a, b) {
return this.commentRules.exec(c, a, b);
},
onRoot:function(c, a) {
return this.rootRules.exec(c, a);
},
onElement:function(c, a) {
for (var d, b = [ this.elementsRules["^"], this.elementsRules[a.name], this.elementsRules.$ ], e = 0; 3 > e; e++) if (d = b[e]) {
if (d = d.exec(c, a, this), d === !1) return null;
if (d && d != a) return this.onNode(c, d);
if (a.parent && !a.name) break;
}
return a;
},
onNode:function(c, a) {
var b = a.type;
return b == CKEDITOR.NODE_ELEMENT ? this.onElement(c, a) :b == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(c, a.value)) :b == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(c, a.value)) :null;
},
onAttribute:function(c, a, b, d) {
return (b = this.attributesRules[b]) ? b.exec(c, d, a, this) :d;
}
}
}), CKEDITOR.htmlParser.filterRulesGroup = d, d.prototype = {
add:function(c, a, b) {
this.rules.splice(this.findIndex(a), 0, {
value:c,
priority:a,
options:b
});
},
addMany:function(c, a, b) {
for (var d = [ this.findIndex(a), 0 ], e = 0, h = c.length; h > e; e++) d.push({
value:c[e],
priority:a,
options:b
});
this.rules.splice.apply(this.rules, d);
},
findIndex:function(c) {
for (var a = this.rules, b = a.length - 1; b >= 0 && c < a[b].priority; ) b--;
return b + 1;
},
exec:function(c, a) {
var f, i, k, n, b = a instanceof CKEDITOR.htmlParser.node || a instanceof CKEDITOR.htmlParser.fragment, d = Array.prototype.slice.call(arguments, 1), e = this.rules, h = e.length;
for (n = 0; h > n; n++) if (b && (f = a.type, i = a.name), k = e[n], !(c.nonEditable && !k.options.applyToAll || c.nestedEditable && k.options.excludeNestedEditable)) {
if (k = k.value.apply(null, d), k === !1 || b && k && (k.name != i || k.type != f)) return k;
void 0 != k && (d[0] = a = k);
}
return a;
},
execOnName:function(c, a) {
for (var h, b = 0, d = this.rules, e = d.length; a && e > b; b++) h = d[b], !(c.nonEditable && !h.options.applyToAll || c.nestedEditable && h.options.excludeNestedEditable) && (a = a.replace(h.value[0], h.value[1]));
return a;
}
};
}(), function() {
function d(d, e) {
function f(a) {
return a || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text("\xa0") :new CKEDITOR.htmlParser.element("br", {
"data-cke-bogus":1
});
}
function h(b, d) {
return function(e) {
if (e.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
var i, k, g = [], h = c(e);
if (h) for (l(h, 1) && g.push(h); h; ) j(h) && (i = a(h)) && l(i) && ((k = a(i)) && !j(k) ? g.push(i) :(f(p).insertAfter(i), 
i.remove())), h = h.previous;
for (h = 0; h < g.length; h++) g[h].remove();
(g = CKEDITOR.env.opera && !b || ("function" == typeof d ? d(e) !== !1 :d)) && (p || CKEDITOR.env.needsBrFiller || e.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT ? p || CKEDITOR.env.needsBrFiller || !(document.documentMode > 7 || e.name in CKEDITOR.dtd.tr || e.name in CKEDITOR.dtd.$listItem) ? (g = c(e), 
g = !g || "form" == e.name && "input" == g.name) :g = !1 :g = !1), g && e.add(f(b));
}
};
}
function l(a, b) {
if ((!p || CKEDITOR.env.needsBrFiller) && a.type == CKEDITOR.NODE_ELEMENT && "br" == a.name && !a.attributes["data-cke-eol"]) return !0;
var c;
if (a.type == CKEDITOR.NODE_TEXT && (c = a.value.match(r))) {
if (c.index && (new CKEDITOR.htmlParser.text(a.value.substring(0, c.index)).insertBefore(a), 
a.value = c[0]), !CKEDITOR.env.needsBrFiller && p && (!b || a.parent.name in k)) return !0;
if (!p && ((c = a.previous) && "br" == c.name || !c || j(c))) return !0;
}
return !1;
}
var m, i = {
elements:{}
}, p = "html" == e, k = CKEDITOR.tools.extend({}, A);
for (m in k) "#" in u[m] || delete k[m];
for (m in k) i.elements[m] = h(p, d.config.fillEmptyBlocks !== !1);
return i.root = h(p), i.elements.br = function(c) {
return function(d) {
if (d.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
var e = d.attributes;
if ("data-cke-bogus" in e || "data-cke-eol" in e) delete e["data-cke-bogus"]; else {
for (e = d.next; e && b(e); ) e = e.next;
var h = a(d);
!e && j(d.parent) ? g(d.parent, f(c)) :j(e) && h && !j(h) && f(c).insertBefore(e);
}
}
};
}(p), i;
}
function e(a, b) {
return a != CKEDITOR.ENTER_BR && b !== !1 ? a == CKEDITOR.ENTER_DIV ? "div" :"p" :!1;
}
function c(a) {
for (a = a.children[a.children.length - 1]; a && b(a); ) a = a.previous;
return a;
}
function a(a) {
for (a = a.previous; a && b(a); ) a = a.previous;
return a;
}
function b(a) {
return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"];
}
function j(a) {
return a && (a.type == CKEDITOR.NODE_ELEMENT && a.name in A || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT);
}
function g(a, b) {
var c = a.children[a.children.length - 1];
a.children.push(b), b.parent = a, c && (c.next = b, b.previous = c);
}
function h(a) {
a = a.attributes, "false" != a.contenteditable && (a["data-cke-editable"] = a.contenteditable ? "true" :1), 
a.contenteditable = "false";
}
function f(a) {
switch (a = a.attributes, a["data-cke-editable"]) {
case "true":
a.contenteditable = "true";
break;

case "1":
delete a.contenteditable;
}
}
function i(a) {
return a.replace(y, function(a, b, c) {
return "<" + b + c.replace(z, function(a, b) {
return /^on/.test(b) || -1 != c.indexOf("data-cke-saved-" + b) ? a :(a = a.slice(1), 
" data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a);
}) + ">";
});
}
function k(a, b) {
return a.replace(b, function(a, b, c) {
return 0 === a.indexOf("<textarea") && (a = b + q(c).replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</textarea>"), 
"<cke:encoded>" + encodeURIComponent(a) + "</cke:encoded>";
});
}
function n(a) {
return a.replace(C, function(a, b) {
return decodeURIComponent(b);
});
}
function o(a) {
return a.replace(/<\!--(?!{cke_protected})[\s\S]+?--\>/g, function(a) {
return "<!--" + p + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "-->";
});
}
function q(a) {
return a.replace(/<\!--\{cke_protected\}\{C\}([\s\S]+?)--\>/g, function(a, b) {
return decodeURIComponent(b);
});
}
function l(a, b) {
var c = b._.dataStore;
return a.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g, function(a, b) {
return decodeURIComponent(b);
}).replace(/\{cke_protected_(\d+)\}/g, function(a, b) {
return c && c[b] || "";
});
}
function m(a, b) {
for (var c = [], d = b.config.protectedSource, e = b._.dataStore || (b._.dataStore = {
id:1
}), f = /<\!--\{cke_temp(comment)?\}(\d*?)--\>/g, d = [ /<script[\s\S]*?<\/script>/gi, /<noscript[\s\S]*?<\/noscript>/gi ].concat(d), a = a.replace(/<\!--[\s\S]*?--\>/g, function(a) {
return "<!--{cke_tempcomment}" + (c.push(a) - 1) + "-->";
}), g = 0; g < d.length; g++) a = a.replace(d[g], function(a) {
return a = a.replace(f, function(a, b, d) {
return c[d];
}), /cke_temp(comment)?/.test(a) ? a :"<!--{cke_temp}" + (c.push(a) - 1) + "-->";
});
return a = a.replace(f, function(a, b, d) {
return "<!--" + p + (b ? "{C}" :"") + encodeURIComponent(c[d]).replace(/--/g, "%2D%2D") + "-->";
}), a.replace(/(['"]).*?\1/g, function(a) {
return a.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g, function(a, b) {
return e[e.id] = decodeURIComponent(b), "{cke_protected_" + e.id++ + "}";
});
});
}
CKEDITOR.htmlDataProcessor = function(a) {
var b, c, f = this;
this.editor = a, this.dataFilter = b = new CKEDITOR.htmlParser.filter(), this.htmlFilter = c = new CKEDITOR.htmlParser.filter(), 
this.writer = new CKEDITOR.htmlParser.basicWriter(), b.addRules(w), b.addRules(t, {
applyToAll:!0
}), b.addRules(d(a, "data"), {
applyToAll:!0
}), c.addRules(s), c.addRules(x, {
applyToAll:!0
}), c.addRules(d(a, "html"), {
applyToAll:!0
}), a.on("toHtml", function(b) {
var f, b = b.data, c = b.dataValue, c = m(c, a), c = k(c, F), c = i(c), c = k(c, B), c = c.replace(D, "$1cke:$2"), c = c.replace(I, "<cke:$1$2></cke:$1>"), c = CKEDITOR.env.opera ? c :c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"), d = b.context || a.editable().getName();
CKEDITOR.env.ie && CKEDITOR.env.version < 9 && "pre" == d && (d = "div", c = "<pre>" + c + "</pre>", 
f = 1), d = a.document.createElement(d), d.setHtml("a" + c), c = d.getHtml().substr(1), 
c = c.replace(RegExp(" data-cke-" + CKEDITOR.rnd + "-", "ig"), " "), f && (c = c.replace(/^<pre>|<\/pre>$/gi, "")), 
c = c.replace(E, "$1$2"), c = n(c), c = q(c), b.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c, b.context, b.fixForBody === !1 ? !1 :e(b.enterMode, a.config.autoParagraph));
}, null, null, 5), a.on("toHtml", function(b) {
b.data.filter.applyTo(b.data.dataValue, !0, b.data.dontFilter, b.data.enterMode) && a.fire("dataFiltered");
}, null, null, 6), a.on("toHtml", function(a) {
a.data.dataValue.filterChildren(f.dataFilter, !0);
}, null, null, 10), a.on("toHtml", function(a) {
var a = a.data, b = a.dataValue, c = new CKEDITOR.htmlParser.basicWriter();
b.writeChildrenHtml(c), b = c.getHtml(!0), a.dataValue = o(b);
}, null, null, 15), a.on("toDataFormat", function(b) {
var c = b.data.dataValue;
b.data.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/^<br *\/?>/i, "")), b.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c, b.data.context, e(b.data.enterMode, a.config.autoParagraph));
}, null, null, 5), a.on("toDataFormat", function(a) {
a.data.dataValue.filterChildren(f.htmlFilter, !0);
}, null, null, 10), a.on("toDataFormat", function(a) {
a.data.filter.applyTo(a.data.dataValue, !1, !0);
}, null, null, 11), a.on("toDataFormat", function(b) {
var c = b.data.dataValue, d = f.writer;
d.reset(), c.writeChildrenHtml(d), c = d.getHtml(!0), c = q(c), c = l(c, a), b.data.dataValue = c;
}, null, null, 15);
}, CKEDITOR.htmlDataProcessor.prototype = {
toHtml:function(a, b, c, d) {
var f, g, h, e = this.editor;
return b && "object" == typeof b ? (f = b.context, c = b.fixForBody, d = b.dontFilter, 
g = b.filter, h = b.enterMode) :f = b, !f && null !== f && (f = e.editable().getName()), 
e.fire("toHtml", {
dataValue:a,
context:f,
fixForBody:c,
dontFilter:d,
filter:g || e.filter,
enterMode:h || e.enterMode
}).dataValue;
},
toDataFormat:function(a, b) {
var c, d, e;
return b && (c = b.context, d = b.filter, e = b.enterMode), !c && null !== c && (c = this.editor.editable().getName()), 
this.editor.fire("toDataFormat", {
dataValue:a,
filter:d || this.editor.filter,
context:c,
enterMode:e || this.editor.enterMode
}).dataValue;
}
};
var r = /(?:&nbsp;|\xa0)$/, p = "{cke_protected}", u = CKEDITOR.dtd, v = [ "caption", "colgroup", "col", "thead", "tfoot", "tbody" ], A = CKEDITOR.tools.extend({}, u.$blockLimit, u.$block), w = {
elements:{
input:h,
textarea:h
}
}, t = {
attributeNames:[ [ /^on/, "data-cke-pa-on" ], [ /^data-cke-expando$/, "" ] ]
}, s = {
elements:{
embed:function(a) {
var b = a.parent;
if (b && "object" == b.name) {
var c = b.attributes.width, b = b.attributes.height;
c && (a.attributes.width = c), b && (a.attributes.height = b);
}
},
a:function(a) {
return a.children.length || a.attributes.name || a.attributes["data-cke-saved-name"] ? void 0 :!1;
}
}
}, x = {
elementNames:[ [ /^cke:/, "" ], [ /^\?xml:namespace$/, "" ] ],
attributeNames:[ [ /^data-cke-(saved|pa)-/, "" ], [ /^data-cke-.*/, "" ], [ "hidefocus", "" ] ],
elements:{
$:function(a) {
var b = a.attributes;
if (b) {
if (b["data-cke-temp"]) return !1;
for (var d, c = [ "name", "href", "src" ], e = 0; e < c.length; e++) d = "data-cke-saved-" + c[e], 
d in b && delete b[c[e]];
}
return a;
},
table:function(a) {
a.children.slice(0).sort(function(a, b) {
var c, d;
return a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type && (c = CKEDITOR.tools.indexOf(v, a.name), 
d = CKEDITOR.tools.indexOf(v, b.name)), c > -1 && d > -1 && c != d || (c = a.parent ? a.getIndex() :-1, 
d = b.parent ? b.getIndex() :-1), c > d ? 1 :-1;
});
},
param:function(a) {
return a.children = [], a.isEmpty = !0, a;
},
span:function(a) {
"Apple-style-span" == a.attributes["class"] && delete a.name;
},
html:function(a) {
delete a.attributes.contenteditable, delete a.attributes["class"];
},
body:function(a) {
delete a.attributes.spellcheck, delete a.attributes.contenteditable;
},
style:function(a) {
var b = a.children[0];
b && b.value && (b.value = CKEDITOR.tools.trim(b.value)), a.attributes.type || (a.attributes.type = "text/css");
},
title:function(a) {
var b = a.children[0];
!b && g(a, b = new CKEDITOR.htmlParser.text()), b.value = a.attributes["data-cke-title"] || "";
},
input:f,
textarea:f
},
attributes:{
"class":function(a) {
return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || !1;
}
}
};
CKEDITOR.env.ie && (x.attributes.style = function(a) {
return a.replace(/(^|;)([^\:]+)/g, function(a) {
return a.toLowerCase();
});
});
var y = /<(a|area|img|input|source)\b([^>]*)>/gi, z = /\s(on\w+|href|src|name)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi, B = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi, F = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi, C = /<cke:encoded>([^<]*)<\/cke:encoded>/gi, D = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi, E = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi, I = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi;
}(), CKEDITOR.htmlParser.element = function(d, e) {
this.name = d, this.attributes = e || {}, this.children = [];
var c = d || "", a = c.match(/^cke:(.*)/);
a && (c = a[1]), c = !!(CKEDITOR.dtd.$nonBodyContent[c] || CKEDITOR.dtd.$block[c] || CKEDITOR.dtd.$listItem[c] || CKEDITOR.dtd.$tableContent[c] || CKEDITOR.dtd.$nonEditable[c] || "br" == c), 
this.isEmpty = !!CKEDITOR.dtd.$empty[d], this.isUnknown = !CKEDITOR.dtd[d], this._ = {
isBlockLike:c,
hasInlineStarted:this.isEmpty || !c
};
}, CKEDITOR.htmlParser.cssStyle = function(d) {
var e = {};
return ((d instanceof CKEDITOR.htmlParser.element ? d.attributes.style :d) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(c, a, b) {
"font-family" == a && (b = b.replace(/["']/g, "")), e[a.toLowerCase()] = b;
}), {
rules:e,
populate:function(c) {
var a = this.toString();
a && (c instanceof CKEDITOR.dom.element ? c.setAttribute("style", a) :c instanceof CKEDITOR.htmlParser.element ? c.attributes.style = a :c.style = a);
},
toString:function() {
var a, c = [];
for (a in e) e[a] && c.push(a, ":", e[a], ";");
return c.join("");
}
};
}, function() {
function d(a) {
return function(b) {
return b.type == CKEDITOR.NODE_ELEMENT && ("string" == typeof a ? b.name == a :b.name in a);
};
}
var e = function(a, b) {
return a = a[0], b = b[0], b > a ? -1 :a > b ? 1 :0;
}, c = CKEDITOR.htmlParser.fragment.prototype;
CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node(), {
type:CKEDITOR.NODE_ELEMENT,
add:c.add,
clone:function() {
return new CKEDITOR.htmlParser.element(this.name, this.attributes);
},
filter:function(a, b) {
var d, e, c = this, b = c.getFilterContext(b);
if (b.off) return !0;
for (c.parent || a.onRoot(b, c); ;) {
if (d = c.name, !(e = a.onElementName(b, d))) return this.remove(), !1;
if (c.name = e, !(c = a.onElement(b, c))) return this.remove(), !1;
if (c !== this) return this.replaceWith(c), !1;
if (c.name == d) break;
if (c.type != CKEDITOR.NODE_ELEMENT) return this.replaceWith(c), !1;
if (!c.name) return this.replaceWithChildren(), !1;
}
d = c.attributes;
var f, i;
for (f in d) {
for (i = f, e = d[f]; ;) {
if (!(i = a.onAttributeName(b, f))) {
delete d[f];
break;
}
if (i == f) break;
delete d[f], f = i;
}
i && ((e = a.onAttribute(b, c, i, e)) === !1 ? delete d[i] :d[i] = e);
}
return c.isEmpty || this.filterChildren(a, !1, b), !0;
},
filterChildren:c.filterChildren,
writeHtml:function(a, b) {
b && this.filter(b);
var f, i, c = this.name, d = [], h = this.attributes;
a.openTag(c, h);
for (f in h) d.push([ f, h[f] ]);
for (a.sortAttributes && d.sort(e), f = 0, i = d.length; i > f; f++) h = d[f], a.attribute(h[0], h[1]);
a.openTagClose(c, this.isEmpty), this.writeChildrenHtml(a), this.isEmpty || a.closeTag(c);
},
writeChildrenHtml:c.writeChildrenHtml,
replaceWithChildren:function() {
for (var a = this.children, b = a.length; b; ) a[--b].insertAfter(this);
this.remove();
},
forEach:c.forEach,
getFirst:function(a) {
if (!a) return this.children.length ? this.children[0] :null;
"function" != typeof a && (a = d(a));
for (var b = 0, c = this.children.length; c > b; ++b) if (a(this.children[b])) return this.children[b];
return null;
},
getHtml:function() {
var a = new CKEDITOR.htmlParser.basicWriter();
return this.writeChildrenHtml(a), a.getHtml();
},
setHtml:function(a) {
for (var a = this.children = CKEDITOR.htmlParser.fragment.fromHtml(a).children, b = 0, c = a.length; c > b; ++b) a[b].parent = this;
},
getOuterHtml:function() {
var a = new CKEDITOR.htmlParser.basicWriter();
return this.writeHtml(a), a.getHtml();
},
split:function(a) {
for (var b = this.children.splice(a, this.children.length - a), c = this.clone(), d = 0; d < b.length; ++d) b[d].parent = c;
return c.children = b, b[0] && (b[0].previous = null), a > 0 && (this.children[a - 1].next = null), 
this.parent.add(c, this.getIndex() + 1), c;
},
removeClass:function(a) {
var b = this.attributes["class"];
b && ((b = CKEDITOR.tools.trim(b.replace(RegExp("(?:\\s+|^)" + a + "(?:\\s+|$)"), " "))) ? this.attributes["class"] = b :delete this.attributes["class"]);
},
hasClass:function(a) {
var b = this.attributes["class"];
return b ? RegExp("(?:^|\\s)" + a + "(?=\\s|$)").test(b) :!1;
},
getFilterContext:function(a) {
var b = [];
if (a || (a = {
off:!1,
nonEditable:!1,
nestedEditable:!1
}), !a.off && "off" == this.attributes["data-cke-processor"] && b.push("off", !0), 
a.nonEditable || "false" != this.attributes.contenteditable ? !a.nestedEditable && "true" == this.attributes.contenteditable && b.push("nestedEditable", !0) :b.push("nonEditable", !0), 
b.length) for (var a = CKEDITOR.tools.copy(a), c = 0; c < b.length; c += 2) a[b[c]] = b[c + 1];
return a;
}
}, !0);
}(), function() {
var d = {}, e = /{([^}]+)}/g, c = /([\\'])/g, a = /\n/g, b = /\r/g;
CKEDITOR.template = function(j) {
if (d[j]) this.output = d[j]; else {
var g = j.replace(c, "\\$1").replace(a, "\\n").replace(b, "\\r").replace(e, function(a, b) {
return "',data['" + b + "']==undefined?'{" + b + "}':data['" + b + "'],'";
});
this.output = d[j] = Function("data", "buffer", "return buffer?buffer.push('" + g + "'):['" + g + "'].join('');");
}
};
}(), delete CKEDITOR.loadFullCore, CKEDITOR.instances = {}, CKEDITOR.document = new CKEDITOR.dom.document(document), 
CKEDITOR.add = function(d) {
CKEDITOR.instances[d.name] = d, d.on("focus", function() {
CKEDITOR.currentInstance != d && (CKEDITOR.currentInstance = d, CKEDITOR.fire("currentInstance"));
}), d.on("blur", function() {
CKEDITOR.currentInstance == d && (CKEDITOR.currentInstance = null, CKEDITOR.fire("currentInstance"));
}), CKEDITOR.fire("instance", null, d);
}, CKEDITOR.remove = function(d) {
delete CKEDITOR.instances[d.name];
}, function() {
var d = {};
CKEDITOR.addTemplate = function(e, c) {
var a = d[e];
return a ? a :(a = {
name:e,
source:c
}, CKEDITOR.fire("template", a), d[e] = new CKEDITOR.template(a.source));
}, CKEDITOR.getTemplate = function(e) {
return d[e];
};
}(), function() {
var d = [];
CKEDITOR.addCss = function(e) {
d.push(e);
}, CKEDITOR.getCss = function() {
return d.join("\n");
};
}(), CKEDITOR.on("instanceDestroyed", function() {
CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset");
}), CKEDITOR.TRISTATE_ON = 1, CKEDITOR.TRISTATE_OFF = 2, CKEDITOR.TRISTATE_DISABLED = 0, 
function() {
CKEDITOR.inline = function(d, e) {
if (!CKEDITOR.env.isCompatible) return null;
if (d = CKEDITOR.dom.element.get(d), d.getEditor()) throw 'The editor instance "' + d.getEditor().name + '" is already attached to the provided element.';
var c = new CKEDITOR.editor(e, d, CKEDITOR.ELEMENT_MODE_INLINE), a = d.is("textarea") ? d :null;
return a ? (c.setData(a.getValue(), null, !0), d = CKEDITOR.dom.element.createFromHtml('<div contenteditable="' + !!c.readOnly + '" class="cke_textarea_inline">' + a.getValue() + "</div>", CKEDITOR.document), 
d.insertAfter(a), a.hide(), a.$.form && c._attachToForm()) :c.setData(d.getHtml(), null, !0), 
c.on("loaded", function() {
c.fire("uiReady"), c.editable(d), c.container = d, c.setData(c.getData(1)), c.resetDirty(), 
c.fire("contentDom"), c.mode = "wysiwyg", c.fire("mode"), c.status = "ready", c.fireOnce("instanceReady"), 
CKEDITOR.fire("instanceReady", null, c);
}, null, null, 1e4), c.on("destroy", function() {
a && (c.container.clearCustomData(), c.container.remove(), a.show()), c.element.clearCustomData(), 
delete c.element;
}), c;
}, CKEDITOR.inlineAll = function() {
var d, e, c;
for (c in CKEDITOR.dtd.$editable) for (var a = CKEDITOR.document.getElementsByTag(c), b = 0, j = a.count(); j > b; b++) d = a.getItem(b), 
"true" == d.getAttribute("contenteditable") && (e = {
element:d,
config:{}
}, CKEDITOR.fire("inline", e) !== !1 && CKEDITOR.inline(d, e.config));
}, CKEDITOR.domReady(function() {
!CKEDITOR.disableAutoInline && CKEDITOR.inlineAll();
});
}(), CKEDITOR.replaceClass = "ckeditor", function() {
function d(a, d, g, h) {
if (!CKEDITOR.env.isCompatible) return null;
if (a = CKEDITOR.dom.element.get(a), a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
var f = new CKEDITOR.editor(d, a, h);
return h == CKEDITOR.ELEMENT_MODE_REPLACE && (a.setStyle("visibility", "hidden"), 
f._.required = a.hasAttribute("required"), a.removeAttribute("required")), g && f.setData(g, null, !0), 
f.on("loaded", function() {
c(f), h == CKEDITOR.ELEMENT_MODE_REPLACE && f.config.autoUpdateElement && a.$.form && f._attachToForm(), 
f.setMode(f.config.startupMode, function() {
f.resetDirty(), f.status = "ready", f.fireOnce("instanceReady"), CKEDITOR.fire("instanceReady", null, f);
});
}), f.on("destroy", e), f;
}
function e() {
var a = this.container, c = this.element;
a && (a.clearCustomData(), a.remove()), c && (c.clearCustomData(), this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (c.show(), 
this._.required && c.setAttribute("required", "required")), delete this.element);
}
function c(b) {
var c = b.name, d = b.element, e = b.elementMode, f = b.fire("uiSpace", {
space:"top",
html:""
}).html, i = b.fire("uiSpace", {
space:"bottom",
html:""
}).html;
a || (a = CKEDITOR.addTemplate("maincontainer", '<{outerEl} id="cke_{name}" class="{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '"  dir="{langDir}" lang="{langCode}" role="application" aria-labelledby="cke_{name}_arialbl"><span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span><{outerEl} class="cke_inner cke_reset" role="presentation">{topHtml}<{outerEl} id="{contentId}" class="cke_contents cke_reset" role="presentation"></{outerEl}>{bottomHtml}</{outerEl}></{outerEl}>')), 
c = CKEDITOR.dom.element.createFromHtml(a.output({
id:b.id,
name:c,
langDir:b.lang.dir,
langCode:b.langCode,
voiceLabel:[ b.lang.editor, b.name ].join(", "),
topHtml:f ? '<span id="' + b.ui.spaceId("top") + '" class="cke_top cke_reset_all" role="presentation" style="height:auto">' + f + "</span>" :"",
contentId:b.ui.spaceId("contents"),
bottomHtml:i ? '<span id="' + b.ui.spaceId("bottom") + '" class="cke_bottom cke_reset_all" role="presentation">' + i + "</span>" :"",
outerEl:CKEDITOR.env.ie ? "span" :"div"
})), e == CKEDITOR.ELEMENT_MODE_REPLACE ? (d.hide(), c.insertAfter(d)) :d.append(c), 
b.container = c, f && b.ui.space("top").unselectable(), i && b.ui.space("bottom").unselectable(), 
d = b.config.width, e = b.config.height, d && c.setStyle("width", CKEDITOR.tools.cssLength(d)), 
e && b.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(e)), c.disableContextMenu(), 
CKEDITOR.env.webkit && c.on("focus", function() {
b.focus();
}), b.fireOnce("uiReady");
}
CKEDITOR.replace = function(a, c) {
return d(a, c, null, CKEDITOR.ELEMENT_MODE_REPLACE);
}, CKEDITOR.appendTo = function(a, c, e) {
return d(a, c, e, CKEDITOR.ELEMENT_MODE_APPENDTO);
}, CKEDITOR.replaceAll = function() {
for (var a = document.getElementsByTagName("textarea"), c = 0; c < a.length; c++) {
var d = null, e = a[c];
if (e.name || e.id) {
if ("string" == typeof arguments[0]) {
if (!RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)").test(e.className)) continue;
} else if ("function" == typeof arguments[0] && (d = {}, arguments[0](e, d) === !1)) continue;
this.replace(e, d);
}
}
}, CKEDITOR.editor.prototype.addMode = function(a, c) {
(this._.modes || (this._.modes = {}))[a] = c;
}, CKEDITOR.editor.prototype.setMode = function(a, c) {
var d = this, e = this._.modes;
if (a != d.mode && e && e[a]) {
if (d.fire("beforeSetMode", a), d.mode) {
var f = d.checkDirty();
d._.previousMode = d.mode, d.fire("beforeModeUnload"), d.editable(0), d.ui.space("contents").setHtml(""), 
d.mode = "";
}
this._.modes[a](function() {
d.mode = a, void 0 !== f && !f && d.resetDirty(), setTimeout(function() {
d.fire("mode"), c && c.call(d);
}, 0);
});
}
}, CKEDITOR.editor.prototype.resize = function(a, c, d, e) {
var f = this.container, i = this.ui.space("contents"), k = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement, e = e ? f.getChild(1) :f;
e.setSize("width", a, !0), k && (k.style.width = "1%"), i.setStyle("height", Math.max(c - (d ? 0 :(e.$.offsetHeight || 0) - (i.$.clientHeight || 0)), 0) + "px"), 
k && (k.style.width = "100%"), this.fire("resize");
}, CKEDITOR.editor.prototype.getResizable = function(a) {
return a ? this.ui.space("contents") :this.container;
};
var a;
CKEDITOR.domReady(function() {
CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass);
});
}(), CKEDITOR.config.startupMode = "wysiwyg", function() {
function d(b) {
var i, c = b.editor, d = b.data.path, f = d.blockLimit, h = b.data.selection, g = h.getRanges()[0];
(CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller) && (h = e(h, d)) && (h.appendBogus(), 
i = CKEDITOR.env.ie), c.config.autoParagraph !== !1 && c.activeEnterMode != CKEDITOR.ENTER_BR && c.editable().equals(f) && !d.block && g.collapsed && !g.getCommonAncestor().isReadOnly() && (d = g.clone(), 
d.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), f = new CKEDITOR.dom.walker(d), f.guard = function(b) {
return !a(b) || b.type == CKEDITOR.NODE_COMMENT || b.isReadOnly();
}, (!f.checkForward() || d.checkStartOfBlock() && d.checkEndOfBlock()) && (c = g.fixBlock(!0, c.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" :"p"), 
CKEDITOR.env.needsBrFiller || (c = c.getFirst(a)) && c.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(c.getText()).match(/^(?:&nbsp;|\xa0)$/) && c.remove(), 
i = 1, b.cancel())), i && g.select();
}
function e(b, c) {
if (b.isFake) return 0;
var d = c.block || c.blockLimit, e = d && d.getLast(a);
return !d || !d.isBlockBoundary() || e && e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary() || d.is("pre") || d.getBogus() ? void 0 :d;
}
function c(a) {
var b = a.data.getTarget();
b.is("input") && (b = b.getAttribute("type"), ("submit" == b || "reset" == b) && a.data.preventDefault());
}
function a(a) {
return k(a) && n(a);
}
function b(a, b) {
return function(c) {
var d = CKEDITOR.dom.element.get(c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget);
(!d || !b.equals(d) && !b.contains(d)) && a.call(this, c);
};
}
function j(b) {
var c, d = b.getRanges()[0], e = b.root, h = {
table:1,
ul:1,
ol:1,
dl:1
};
if (d.startPath().contains(h)) {
var b = function(b) {
return function(d, e) {
return e && d.type == CKEDITOR.NODE_ELEMENT && d.is(h) && (c = d), e || !a(d) || b && f(d) ? void 0 :!1;
};
}, g = d.clone();
if (g.collapse(1), g.setStartAt(e, CKEDITOR.POSITION_AFTER_START), e = new CKEDITOR.dom.walker(g), 
e.guard = b(), e.checkBackward(), c) return g = d.clone(), g.collapse(), g.setEndAt(c, CKEDITOR.POSITION_AFTER_END), 
e = new CKEDITOR.dom.walker(g), e.guard = b(!0), c = !1, e.checkForward(), c;
}
return null;
}
function g(a) {
a.editor.focus(), a.editor.fire("saveSnapshot");
}
function h(a, b) {
var c = a.editor;
!b && c.getSelection().scrollIntoView(), setTimeout(function() {
c.fire("saveSnapshot");
}, 0);
}
CKEDITOR.editable = CKEDITOR.tools.createClass({
base:CKEDITOR.dom.element,
$:function(a, b) {
this.base(b.$ || b), this.editor = a, this.hasFocus = !1, this.setup();
},
proto:{
focus:function() {
var a;
if (CKEDITOR.env.webkit && !this.hasFocus && (a = this.editor._.previousActive || this.getDocument().getActive(), 
this.contains(a))) return a.focus(), void 0;
try {
this.$[CKEDITOR.env.ie && this.getDocument().equals(CKEDITOR.document) ? "setActive" :"focus"]();
} catch (b) {
if (!CKEDITOR.env.ie) throw b;
}
CKEDITOR.env.safari && !this.isInline() && (a = CKEDITOR.document.getActive(), a.equals(this.getWindow().getFrame()) || this.getWindow().focus());
},
on:function(a, c) {
var d = Array.prototype.slice.call(arguments, 0);
return CKEDITOR.env.ie && /^focus|blur$/.exec(a) && (a = "focus" == a ? "focusin" :"focusout", 
c = b(c, this), d[0] = a, d[1] = c), CKEDITOR.dom.element.prototype.on.apply(this, d);
},
attachListener:function(a) {
!this._.listeners && (this._.listeners = []);
var h = Array.prototype.slice.call(arguments, 1), h = a.on.apply(a, h);
return this._.listeners.push(h), h;
},
clearListeners:function() {
var a = this._.listeners;
try {
for (;a.length; ) a.pop().removeListener();
} catch (b) {}
},
restoreAttrs:function() {
var b, c, a = this._.attrChanges;
for (c in a) a.hasOwnProperty(c) && (b = a[c], null !== b ? this.setAttribute(c, b) :this.removeAttribute(c));
},
attachClass:function(a) {
var b = this.getCustomData("classes");
this.hasClass(a) || (!b && (b = []), b.push(a), this.setCustomData("classes", b), 
this.addClass(a));
},
changeAttr:function(a, b) {
var c = this.getAttribute(a);
b !== c && (!this._.attrChanges && (this._.attrChanges = {}), a in this._.attrChanges || (this._.attrChanges[a] = c), 
this.setAttribute(a, b));
},
insertHtml:function(a, b) {
g(this), o(this, b || "html", a);
},
insertText:function(a) {
g(this);
var b = this.editor, c = b.getSelection().getStartElement().hasAscendant("pre", !0) ? CKEDITOR.ENTER_BR :b.activeEnterMode, b = c == CKEDITOR.ENTER_BR, d = CKEDITOR.tools, a = d.htmlEncode(a.replace(/\r\n/g, "\n")), a = a.replace(/\t/g, "&nbsp;&nbsp; &nbsp;"), c = c == CKEDITOR.ENTER_P ? "p" :"div";
if (!b) {
var e = /\n{2}/g;
if (e.test(a)) var f = "<" + c + ">", h = "</" + c + ">", a = f + a.replace(e, function() {
return h + f;
}) + h;
}
a = a.replace(/\n/g, "<br>"), b || (a = a.replace(RegExp("<br>(?=</" + c + ">)"), function(a) {
return d.repeat(a, 2);
})), a = a.replace(/^ | $/g, "&nbsp;"), a = a.replace(/(>|\s) /g, function(a, b) {
return b + "&nbsp;";
}).replace(/ (?=<)/g, "&nbsp;"), o(this, "text", a);
},
insertElement:function(a, b) {
b ? this.insertElementIntoRange(a, b) :this.insertElementIntoSelection(a);
},
insertElementIntoRange:function(a, b) {
var c = this.editor, d = c.config.enterMode, e = a.getName(), f = CKEDITOR.dtd.$block[e];
if (b.checkReadOnly()) return !1;
b.deleteContents(1), b.startContainer.type == CKEDITOR.NODE_ELEMENT && b.startContainer.is({
tr:1,
table:1,
tbody:1,
thead:1,
tfoot:1
}) && q(b);
var h, g;
if (f) for (;(h = b.getCommonAncestor(0, 1)) && (g = CKEDITOR.dtd[h.getName()]) && (!g || !g[e]); ) h.getName() in CKEDITOR.dtd.span ? b.splitElement(h) :b.checkStartOfBlock() && b.checkEndOfBlock() ? (b.setStartBefore(h), 
b.collapse(!0), h.remove()) :b.splitBlock(d == CKEDITOR.ENTER_DIV ? "div" :"p", c.editable());
return b.insertNode(a), !0;
},
insertElementIntoSelection:function(b) {
var c = this.editor, d = c.activeEnterMode, c = c.getSelection(), e = c.getRanges()[0], i = b.getName(), i = CKEDITOR.dtd.$block[i];
g(this), this.insertElementIntoRange(b, e) && (e.moveToPosition(b, CKEDITOR.POSITION_AFTER_END), 
i && ((i = b.getNext(function(b) {
return a(b) && !f(b);
})) && i.type == CKEDITOR.NODE_ELEMENT && i.is(CKEDITOR.dtd.$block) ? i.getDtd()["#"] ? e.moveToElementEditStart(i) :e.moveToElementEditEnd(b) :i || d == CKEDITOR.ENTER_BR || (i = e.fixBlock(!0, d == CKEDITOR.ENTER_DIV ? "div" :"p"), 
e.moveToElementEditStart(i)))), c.selectRanges([ e ]), h(this, CKEDITOR.env.opera);
},
setData:function(a, b) {
b || (a = this.editor.dataProcessor.toHtml(a)), this.setHtml(a), this.editor.fire("dataReady");
},
getData:function(a) {
var b = this.getHtml();
return a || (b = this.editor.dataProcessor.toDataFormat(b)), b;
},
setReadOnly:function(a) {
this.setAttribute("contenteditable", !a);
},
detach:function() {
this.removeClass("cke_editable");
var a = this.editor;
this._.detach(), delete a.document, delete a.window;
},
isInline:function() {
return this.getDocument().equals(CKEDITOR.document);
},
setup:function() {
var b = this.editor;
if (this.attachListener(b, "beforeGetData", function() {
var a = this.getData();
this.is("textarea") || b.config.ignoreEmptyParagraph !== !1 && (a = a.replace(i, function(a, b) {
return b;
})), b.setData(a, null, 1);
}, this), this.attachListener(b, "getSnapshot", function(a) {
a.data = this.getData(1);
}, this), this.attachListener(b, "afterSetData", function() {
this.setData(b.getData(1));
}, this), this.attachListener(b, "loadSnapshot", function(a) {
this.setData(a.data, 1);
}, this), this.attachListener(b, "beforeFocus", function() {
var a = b.getSelection();
(a = a && a.getNative()) && "Control" == a.type || this.focus();
}, this), this.attachListener(b, "insertHtml", function(a) {
this.insertHtml(a.data.dataValue, a.data.mode);
}, this), this.attachListener(b, "insertElement", function(a) {
this.insertElement(a.data);
}, this), this.attachListener(b, "insertText", function(a) {
this.insertText(a.data);
}, this), this.setReadOnly(b.readOnly), this.attachClass("cke_editable"), this.attachClass(b.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "cke_editable_inline" :b.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE || b.elementMode == CKEDITOR.ELEMENT_MODE_APPENDTO ? "cke_editable_themed" :""), 
this.attachClass("cke_contents_" + b.config.contentsLangDirection), b.keystrokeHandler.blockedKeystrokes[8] = +b.readOnly, 
b.keystrokeHandler.attach(this), this.on("blur", function(a) {
CKEDITOR.env.opera && CKEDITOR.document.getActive().equals(this.isInline() ? this :this.getWindow().getFrame()) ? a.cancel() :this.hasFocus = !1;
}, null, null, -1), this.on("focus", function() {
this.hasFocus = !0;
}, null, null, -1), b.focusManager.add(this), this.equals(CKEDITOR.document.getActive()) && (this.hasFocus = !0, 
b.once("contentDom", function() {
b.focusManager.focus();
})), this.isInline() && this.changeAttr("tabindex", b.tabIndex), !this.is("textarea")) {
b.document = this.getDocument(), b.window = this.getWindow();
var d = b.document;
this.changeAttr("spellcheck", !b.config.disableNativeSpellChecker);
var e = b.config.contentsLangDirection;
this.getDirection(1) != e && this.changeAttr("dir", e);
var f = CKEDITOR.getCss();
f && (e = d.getHead(), e.getCustomData("stylesheet") || (f = d.appendStyleText(f), 
f = new CKEDITOR.dom.element(f.ownerNode || f.owningElement), e.setCustomData("stylesheet", f), 
f.data("cke-temp", 1))), e = d.getCustomData("stylesheet_ref") || 0, d.setCustomData("stylesheet_ref", e + 1), 
this.setCustomData("cke_includeReadonly", !b.config.disableReadonlyStyling), this.attachListener(this, "click", function(a) {
var a = a.data, b = new CKEDITOR.dom.elementPath(a.getTarget(), this).contains("a");
b && 2 != a.$.button && b.isReadOnly() && a.preventDefault();
});
var h = {
8:1,
46:1
};
this.attachListener(b, "key", function(a) {
if (b.readOnly) return !0;
var d, c = a.data.keyCode;
if (c in h) {
var e, i, p, m, a = b.getSelection(), f = a.getRanges()[0], g = f.startPath(), c = 8 == c;
CKEDITOR.env.ie && CKEDITOR.env.version < 11 && (e = a.getSelectedElement()) || (e = j(a)) ? (b.fire("saveSnapshot"), 
f.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START), e.remove(), f.select(), b.fire("saveSnapshot"), 
d = 1) :f.collapsed && ((i = g.block) && (m = i[c ? "getPrevious" :"getNext"](k)) && m.type == CKEDITOR.NODE_ELEMENT && m.is("table") && f[c ? "checkStartOfBlock" :"checkEndOfBlock"]() ? (b.fire("saveSnapshot"), 
f[c ? "checkEndOfBlock" :"checkStartOfBlock"]() && i.remove(), f["moveToElementEdit" + (c ? "End" :"Start")](m), 
f.select(), b.fire("saveSnapshot"), d = 1) :g.blockLimit && g.blockLimit.is("td") && (p = g.blockLimit.getAscendant("table")) && f.checkBoundaryOfElement(p, c ? CKEDITOR.START :CKEDITOR.END) && (m = p[c ? "getPrevious" :"getNext"](k)) ? (b.fire("saveSnapshot"), 
f["moveToElementEdit" + (c ? "End" :"Start")](m), f.checkStartOfBlock() && f.checkEndOfBlock() ? m.remove() :f.select(), 
b.fire("saveSnapshot"), d = 1) :(p = g.contains([ "td", "th", "caption" ])) && f.checkBoundaryOfElement(p, c ? CKEDITOR.START :CKEDITOR.END) && (d = 1));
}
return !d;
}), b.blockless && CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller && this.attachListener(this, "keyup", function(c) {
c.data.getKeystroke() in h && !this.getFirst(a) && (this.appendBogus(), c = b.createRange(), 
c.moveToPosition(this, CKEDITOR.POSITION_AFTER_START), c.select());
}), this.attachListener(this, "dblclick", function(a) {
return b.readOnly ? !1 :(a = {
element:a.data.getTarget()
}, b.fire("doubleclick", a), void 0);
}), CKEDITOR.env.ie && this.attachListener(this, "click", c), !CKEDITOR.env.ie && !CKEDITOR.env.opera && this.attachListener(this, "mousedown", function(a) {
var c = a.data.getTarget();
c.is("img", "hr", "input", "textarea", "select") && (b.getSelection().selectElement(c), 
c.is("input", "textarea", "select") && a.data.preventDefault());
}), CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function(a) {
if (2 == a.data.$.button && (a = a.data.getTarget(), !a.getOuterHtml().replace(i, ""))) {
var c = b.createRange();
c.moveToElementEditStart(a), c.select(!0);
}
}), CKEDITOR.env.webkit && (this.attachListener(this, "click", function(a) {
a.data.getTarget().is("input", "select") && a.data.preventDefault();
}), this.attachListener(this, "mouseup", function(a) {
a.data.getTarget().is("input", "textarea") && a.data.preventDefault();
}));
}
}
},
_:{
detach:function() {
this.editor.setData(this.editor.getData(), 0, 1), this.clearListeners(), this.restoreAttrs();
var a;
if (a = this.removeCustomData("classes")) for (;a.length; ) this.removeClass(a.pop());
a = this.getDocument();
var b = a.getHead();
if (b.getCustomData("stylesheet")) {
var c = a.getCustomData("stylesheet_ref");
--c ? a.setCustomData("stylesheet_ref", c) :(a.removeCustomData("stylesheet_ref"), 
b.removeCustomData("stylesheet").remove());
}
this.editor.fire("contentDomUnload"), delete this.editor;
}
}
}), CKEDITOR.editor.prototype.editable = function(a) {
var b = this._.editable;
return b && a ? 0 :(arguments.length && (b = this._.editable = a ? a instanceof CKEDITOR.editable ? a :new CKEDITOR.editable(this, a) :(b && b.detach(), 
null)), b);
};
var f = CKEDITOR.dom.walker.bogus(), i = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi, k = CKEDITOR.dom.walker.whitespaces(!0), n = CKEDITOR.dom.walker.bookmark(!1, !0);
CKEDITOR.on("instanceLoaded", function(a) {
var b = a.editor;
b.on("insertElement", function(a) {
a = a.data, a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") || a.is("textarea")) && ("false" != a.getAttribute("contentEditable") && a.data("cke-editable", a.hasAttribute("contenteditable") ? "true" :"1"), 
a.setAttribute("contentEditable", !1));
}), b.on("selectionChange", function(a) {
if (!b.readOnly) {
var c = b.getSelection();
c && !c.isLocked && (c = b.checkDirty(), b.fire("lockSnapshot"), d(a), b.fire("unlockSnapshot"), 
!c && b.resetDirty());
}
});
}), CKEDITOR.on("instanceCreated", function(a) {
var b = a.editor;
b.on("mode", function() {
var a = b.editable();
if (a && a.isInline()) {
var c = b.title;
if (a.changeAttr("role", "textbox"), a.changeAttr("aria-label", c), c && a.changeAttr("title", c), 
c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" :"contents")) {
var d = CKEDITOR.tools.getNextId(), e = CKEDITOR.dom.element.createFromHtml('<span id="' + d + '" class="cke_voice_label">' + this.lang.common.editorHelp + "</span>");
c.append(e), a.changeAttr("aria-describedby", d);
}
}
});
}), CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");
var o = function() {
function b(a) {
return a.type == CKEDITOR.NODE_ELEMENT;
}
function c(a, d) {
var e, f, h, g, j = [], p = d.range.startContainer;
e = d.range.startPath();
for (var p = i[p.getName()], k = 0, u = a.getChildren(), v = u.count(), n = -1, t = -1, r = 0, o = e.contains(i.$list); v > k; ++k) e = u.getItem(k), 
b(e) ? (h = e.getName(), o && h in CKEDITOR.dtd.$list ? j = j.concat(c(e, d)) :(g = !!p[h], 
"br" != h || !e.data("cke-eol") || k && k != v - 1 || (r = (f = k ? j[k - 1].node :u.getItem(k + 1)) && (!b(f) || !f.is("br")), 
f = f && b(f) && i.$block[f.getName()]), -1 == n && !g && (n = k), g || (t = k), 
j.push({
isElement:1,
isLineBreak:r,
isBlock:e.isBlockBoundary(),
hasBlockSibling:f,
node:e,
name:h,
allowed:g
}), f = r = 0)) :j.push({
isElement:0,
node:e,
allowed:1
});
return n > -1 && (j[n].firstNotAllowed = 1), t > -1 && (j[t].lastNotAllowed = 1), 
j;
}
function d(a, c) {
var g, e = [], f = a.getChildren(), h = f.count(), j = 0, k = i[c], p = !a.is(i.$inline) || a.is("br");
for (p && e.push(" "); h > j; j++) g = f.getItem(j), b(g) && !g.is(k) ? e = e.concat(d(g, c)) :e.push(g);
return p && e.push(" "), e;
}
function e(a) {
return a && b(a) && (a.is(i.$removeEmpty) || a.is("a") && !a.isBlockBoundary());
}
function f(a, c, d, e) {
var g, i, h = a.clone();
h.setEndAt(c, CKEDITOR.POSITION_BEFORE_END), (g = new CKEDITOR.dom.walker(h).next()) && b(g) && j[g.getName()] && (i = g.getPrevious()) && b(i) && !i.getParent().equals(a.startContainer) && d.contains(i) && e.contains(g) && g.isIdentical(i) && (g.moveChildren(i), 
g.remove(), f(a, c, d, e));
}
function g(a, c) {
function d(a, c) {
return c.isBlock && c.isElement && !c.node.is("br") && b(a) && a.is("br") ? (a.remove(), 
1) :void 0;
}
var e = c.endContainer.getChild(c.endOffset), f = c.endContainer.getChild(c.endOffset - 1);
e && d(e, a[a.length - 1]), f && d(f, a[0]) && (c.setEnd(c.endContainer, c.endOffset - 1), 
c.collapse());
}
var i = CKEDITOR.dtd, j = {
p:1,
div:1,
h1:1,
h2:1,
h3:1,
h4:1,
h5:1,
h6:1,
ul:1,
ol:1,
li:1,
pre:1,
dl:1,
blockquote:1
}, k = {
p:1,
div:1,
h1:1,
h2:1,
h3:1,
h4:1,
h5:1,
h6:1
}, n = CKEDITOR.tools.extend({}, i.$inline);
return delete n.br, function(j, o, q) {
var w = j.editor;
j.getDocument();
var F = w.getSelection().getRanges()[0], C = !1;
if ("unfiltered_html" == o && (o = "html", C = !0), !F.checkReadOnly()) {
var E, I, J, G, D = new CKEDITOR.dom.elementPath(F.startContainer, F.root).blockLimit || F.root, o = {
type:o,
dontFilter:C,
editable:j,
editor:w,
range:F,
blockLimit:D,
mergeCandidates:[],
zombies:[]
}, w = o.range, C = o.mergeCandidates;
if ("text" == o.type && w.shrink(CKEDITOR.SHRINK_ELEMENT, !0, !1) && (E = CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", w.document), 
w.insertNode(E), w.setStartAfter(E)), I = new CKEDITOR.dom.elementPath(w.startContainer), 
o.endPath = J = new CKEDITOR.dom.elementPath(w.endContainer), !w.collapsed) {
var D = J.block || J.blockLimit, P = w.getCommonAncestor();
D && !D.equals(P) && !D.contains(P) && w.checkEndOfBlock() && o.zombies.push(D), 
w.deleteContents();
}
for (;(G = b(w.startContainer) && w.startContainer.getChild(w.startOffset - 1)) && b(G) && G.isBlockBoundary() && I.contains(G); ) w.moveToPosition(G, CKEDITOR.POSITION_BEFORE_END);
for (f(w, o.blockLimit, I, J), E && (w.setEndBefore(E), w.collapse(), E.remove()), 
E = w.startPath(), (D = E.contains(e, !1, 1)) && (w.splitElement(D), o.inlineStylesRoot = D, 
o.inlineStylesPeak = E.lastElement), E = w.createBookmark(), (D = E.startNode.getPrevious(a)) && b(D) && e(D) && C.push(D), 
(D = E.startNode.getNext(a)) && b(D) && e(D) && C.push(D), D = E.startNode; (D = D.getParent()) && e(D); ) C.push(D);
if (w.moveToBookmark(E), E = q) {
if (E = o.range, "text" == o.type && o.inlineStylesRoot) {
for (G = o.inlineStylesPeak, w = G.getDocument().createText("{cke-peak}"), C = o.inlineStylesRoot.getParent(); !G.equals(C); ) w = w.appendTo(G.clone()), 
G = G.getParent();
q = w.getOuterHtml().split("{cke-peak}").join(q);
}
if (G = o.blockLimit.getName(), /^\s+|\s+$/.test(q) && "span" in CKEDITOR.dtd[G]) var L = '<span data-cke-marker="1">&nbsp;</span>', q = L + q + L;
if (q = o.editor.dataProcessor.toHtml(q, {
context:null,
fixForBody:!1,
dontFilter:o.dontFilter,
filter:o.editor.activeFilter,
enterMode:o.editor.activeEnterMode
}), G = E.document.createElement("body"), G.setHtml(q), L && (G.getFirst().remove(), 
G.getLast().remove()), (L = E.startPath().block) && (1 != L.getChildCount() || !L.getBogus())) a:{
var K;
if (1 == G.getChildCount() && b(K = G.getFirst()) && K.is(k)) {
for (L = K.getElementsByTag("*"), E = 0, C = L.count(); C > E; E++) if (w = L.getItem(E), 
!w.is(n)) break a;
K.moveChildren(K.getParent(1)), K.remove();
}
}
o.dataWrapper = G, E = q;
}
if (E) {
K = o.range;
var H, L = K.document, q = o.blockLimit;
E = 0;
var N;
G = [];
var M, S, O, U, C = w = 0;
I = K.startContainer;
var T, D = o.endPath.elements[0];
for (J = D.getPosition(I), P = !(!D.getCommonAncestor(I) || J == CKEDITOR.POSITION_IDENTICAL || J & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED), 
I = c(o.dataWrapper, o), g(I, K); E < I.length; E++) {
if (J = I[E], H = J.isLineBreak) {
H = K, O = q;
var Q = void 0, W = void 0;
J.hasBlockSibling ? H = 1 :(Q = H.startContainer.getAscendant(i.$block, 1), Q && Q.is({
div:1,
p:1
}) ? (W = Q.getPosition(O), W == CKEDITOR.POSITION_IDENTICAL || W == CKEDITOR.POSITION_CONTAINS ? H = 0 :(O = H.splitElement(Q), 
H.moveToPosition(O, CKEDITOR.POSITION_AFTER_START), H = 1)) :H = 0);
}
if (H) C = E > 0; else {
if (H = K.startPath(), !J.isBlock && o.editor.config.autoParagraph !== !1 && o.editor.activeEnterMode != CKEDITOR.ENTER_BR && o.editor.editable().equals(H.blockLimit) && !H.block && (S = o.editor.activeEnterMode != CKEDITOR.ENTER_BR && o.editor.config.autoParagraph !== !1 ? o.editor.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" :"p" :!1) && (S = L.createElement(S), 
S.appendBogus(), K.insertNode(S), CKEDITOR.env.needsBrFiller && (N = S.getBogus()) && N.remove(), 
K.moveToPosition(S, CKEDITOR.POSITION_BEFORE_END)), (H = K.startPath().block) && !H.equals(M) && ((N = H.getBogus()) && (N.remove(), 
G.push(H)), M = H), J.firstNotAllowed && (w = 1), w && J.isElement) {
for (H = K.startContainer, O = null; H && !i[H.getName()][J.name]; ) {
if (H.equals(q)) {
H = null;
break;
}
O = H, H = H.getParent();
}
if (H) O && (U = K.splitElement(O), o.zombies.push(U), o.zombies.push(O)); else {
O = q.getName(), T = !E, H = E == I.length - 1, O = d(J.node, O);
for (var Q = [], W = O.length, Z = 0, X = void 0, Y = 0, aa = -1; W > Z; Z++) X = O[Z], 
" " == X ? (Y || T && !Z || (Q.push(new CKEDITOR.dom.text(" ")), aa = Q.length), 
Y = 1) :(Q.push(X), Y = 0);
H && aa == Q.length && Q.pop(), T = Q;
}
}
if (T) {
for (;H = T.pop(); ) K.insertNode(H);
T = 0;
} else K.insertNode(J.node);
J.lastNotAllowed && E < I.length - 1 && ((U = P ? D :U) && K.setEndAt(U, CKEDITOR.POSITION_AFTER_START), 
w = 0), K.collapse();
}
}
o.dontMoveCaret = C, o.bogusNeededBlocks = G;
}
N = o.range;
var R;
for (U = o.bogusNeededBlocks, T = N.createBookmark(); M = o.zombies.pop(); ) M.getParent() && (S = N.clone(), 
S.moveToElementEditStart(M), S.removeEmptyBlocksAtEnd());
if (U) for (;M = U.pop(); ) CKEDITOR.env.needsBrFiller ? M.appendBogus() :M.append(N.document.createText("\xa0"));
for (;M = o.mergeCandidates.pop(); ) M.mergeSiblings();
if (N.moveToBookmark(T), !o.dontMoveCaret) {
for (M = b(N.startContainer) && N.startContainer.getChild(N.startOffset - 1); M && b(M) && !M.is(i.$empty); ) {
if (M.isBlockBoundary()) N.moveToPosition(M, CKEDITOR.POSITION_BEFORE_END); else {
if (e(M) && M.getHtml().match(/(\s|&nbsp;)$/g)) {
R = null;
break;
}
R = N.clone(), R.moveToPosition(M, CKEDITOR.POSITION_BEFORE_END);
}
M = M.getLast(a);
}
R && N.moveToRange(R);
}
F.select(), h(j);
}
};
}(), q = function() {
function a(b) {
return b = new CKEDITOR.dom.walker(b), b.guard = function(a, b) {
return b ? !1 :a.type == CKEDITOR.NODE_ELEMENT ? a.is(CKEDITOR.dtd.$tableContent) :void 0;
}, b.evaluator = function(a) {
return a.type == CKEDITOR.NODE_ELEMENT;
}, b;
}
function b(a, c, d) {
return c = a.getDocument().createElement(c), a.append(c, d), c;
}
function c(a) {
var d, b = a.count();
for (b; b-- > 0; ) d = a.getItem(b), CKEDITOR.tools.trim(d.getHtml()) || (d.appendBogus(), 
CKEDITOR.env.ie && CKEDITOR.env.version < 9 && d.getChildCount() && d.getFirst().remove());
}
return function(d) {
var e = d.startContainer, f = e.getAscendant("table", 1), h = !1;
c(f.getElementsByTag("td")), c(f.getElementsByTag("th")), f = d.clone(), f.setStart(e, 0), 
f = a(f).lastBackward(), f || (f = d.clone(), f.setEndAt(e, CKEDITOR.POSITION_BEFORE_END), 
f = a(f).lastForward(), h = !0), f || (f = e), f.is("table") ? (d.setStartAt(f, CKEDITOR.POSITION_BEFORE_START), 
d.collapse(!0), f.remove()) :(f.is({
tbody:1,
thead:1,
tfoot:1
}) && (f = b(f, "tr", h)), f.is("tr") && (f = b(f, f.getParent().is("thead") ? "th" :"td", h)), 
(e = f.getBogus()) && e.remove(), d.moveToPosition(f, h ? CKEDITOR.POSITION_AFTER_START :CKEDITOR.POSITION_BEFORE_END));
};
}();
}(), function() {
function d() {
var b, a = this._.fakeSelection;
a && (b = this.getSelection(1), b && b.isHidden() || (a.reset(), a = 0)), (a || (a = b || this.getSelection(1), 
a && a.getType() != CKEDITOR.SELECTION_NONE)) && (this.fire("selectionCheck", a), 
b = this.elementPath(), b.compare(this._.selectionPreviousPath) || (CKEDITOR.env.webkit && (this._.previousActive = this.document.getActive()), 
this._.selectionPreviousPath = b, this.fire("selectionChange", {
selection:a,
path:b
})));
}
function e() {
n = !0, k || (c.call(this), k = CKEDITOR.tools.setTimeout(c, 200, this));
}
function c() {
k = null, n && (CKEDITOR.tools.setTimeout(d, 0, this), n = !1);
}
function a(a) {
function b(c, d) {
return c && c.type != CKEDITOR.NODE_TEXT ? a.clone()["moveToElementEdit" + (d ? "End" :"Start")](c) :!1;
}
if (!(a.root instanceof CKEDITOR.editable)) return !1;
var c = a.startContainer, d = a.getPreviousNode(o, null, c), e = a.getNextNode(o, null, c);
return !b(d) && !b(e, 1) && (d || e || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary() && c.getBogus()) ? !1 :!0;
}
function b(a) {
return a.getCustomData("cke-fillingChar");
}
function j(a, b) {
var c = a && a.removeCustomData("cke-fillingChar");
if (c) {
if (b !== !1) {
var d, e = a.getDocument().getSelection().getNative(), f = e && "None" != e.type && e.getRangeAt(0);
if (c.getLength() > 1 && f && f.intersectsNode(c.$)) {
d = [ e.anchorOffset, e.focusOffset ], f = e.focusNode == c.$ && e.focusOffset > 0, 
e.anchorNode == c.$ && e.anchorOffset > 0 && d[0]--, f && d[1]--;
var h;
f = e, f.isCollapsed || (h = f.getRangeAt(0), h.setStart(f.anchorNode, f.anchorOffset), 
h.setEnd(f.focusNode, f.focusOffset), h = h.collapsed), h && d.unshift(d.pop());
}
}
c.setText(g(c.getText())), d && (c = e.getRangeAt(0), c.setStart(c.startContainer, d[0]), 
c.setEnd(c.startContainer, d[1]), e.removeAllRanges(), e.addRange(c));
}
}
function g(a) {
return a.replace(/\u200B( )?/g, function(a) {
return a[1] ? "\xa0" :"";
});
}
function h(a, b, c) {
var d = a.on("focus", function(a) {
a.cancel();
}, null, null, -100);
if (CKEDITOR.env.ie) var e = a.getDocument().on("selectionchange", function(a) {
a.cancel();
}, null, null, -100); else {
var f = new CKEDITOR.dom.range(a);
f.moveToElementEditStart(a);
var h = a.getDocument().$.createRange();
h.setStart(f.startContainer.$, f.startOffset), h.collapse(1), b.removeAllRanges(), 
b.addRange(h);
}
c && a.focus(), d.removeListener(), e && e.removeListener();
}
function f(a) {
var b = CKEDITOR.dom.element.createFromHtml('<div data-cke-hidden-sel="1" data-cke-temp="1" style="' + (CKEDITOR.env.ie ? "display:none" :"position:fixed;top:0;left:-1000px") + '">&nbsp;</div>', a.document);
a.fire("lockSnapshot"), a.editable().append(b);
var c = a.getSelection(), d = a.createRange(), e = c.root.on("selectionchange", function(a) {
a.cancel();
}, null, null, 0);
d.setStartAt(b, CKEDITOR.POSITION_AFTER_START), d.setEndAt(b, CKEDITOR.POSITION_BEFORE_END), 
c.selectRanges([ d ]), e.removeListener(), a.fire("unlockSnapshot"), a._.hiddenSelectionContainer = b;
}
function i(a) {
var b = {
37:1,
39:1,
8:1,
46:1
};
return function(c) {
var d = c.data.getKeystroke();
if (b[d]) {
var e = a.getSelection().getRanges(), f = e[0];
1 == e.length && f.collapsed && (d = f[38 > d ? "getPreviousEditableNode" :"getNextEditableNode"]()) && d.type == CKEDITOR.NODE_ELEMENT && "false" == d.getAttribute("contenteditable") && (a.getSelection().fake(d), 
c.data.preventDefault(), c.cancel());
}
};
}
var k, n, o = CKEDITOR.dom.walker.invisible(1), q = function() {
function a(b) {
return function(a) {
var c = a.editor.createRange();
return c.moveToClosestEditablePosition(a.selected, b) && a.editor.getSelection().selectRanges([ c ]), 
!1;
};
}
function b(a) {
return function(b) {
var e, c = b.editor, d = c.createRange();
return (e = d.moveToClosestEditablePosition(b.selected, a)) || (e = d.moveToClosestEditablePosition(b.selected, !a)), 
e && c.getSelection().selectRanges([ d ]), c.fire("saveSnapshot"), b.selected.remove(), 
e || (d.moveToElementEditablePosition(c.editable()), c.getSelection().selectRanges([ d ])), 
c.fire("saveSnapshot"), !1;
};
}
var c = a(), d = a(1);
return {
37:c,
38:c,
39:d,
40:d,
8:b(),
46:b(1)
};
}();
CKEDITOR.on("instanceCreated", function(a) {
function b() {
var a = c.getSelection();
a && a.removeAllRanges();
}
var c = a.editor;
c.on("contentDom", function() {
var p, m, a = c.document, b = CKEDITOR.document, f = c.editable(), h = a.getBody(), g = a.getDocumentElement(), k = f.isInline();
if (CKEDITOR.env.gecko && f.attachListener(f, "focus", function(a) {
a.removeListener(), 0 !== p && (a = c.getSelection().getNative()) && a.isCollapsed && a.anchorNode == f.$ && (a = c.createRange(), 
a.moveToElementEditStart(f), a.select());
}, null, null, -2), f.attachListener(f, CKEDITOR.env.webkit ? "DOMFocusIn" :"focus", function() {
p && CKEDITOR.env.webkit && (p = c._.previousActive && c._.previousActive.equals(a.getActive())), 
c.unlockSelection(p), p = 0;
}, null, null, -1), f.attachListener(f, "mousedown", function() {
p = 0;
}), CKEDITOR.env.ie || CKEDITOR.env.opera || k) {
var u = function() {
m = new CKEDITOR.dom.selection(c.getSelection()), m.lock();
};
l ? f.attachListener(f, "beforedeactivate", u, null, null, -1) :f.attachListener(c, "selectionCheck", u, null, null, -1), 
f.attachListener(f, CKEDITOR.env.webkit ? "DOMFocusOut" :"blur", function() {
c.lockSelection(m), p = 1;
}, null, null, -1), f.attachListener(f, "mousedown", function() {
p = 0;
});
}
if (CKEDITOR.env.ie && !k) {
var n;
if (f.attachListener(f, "mousedown", function(a) {
2 == a.data.$.button && (a = c.document.getSelection(), a && a.getType() != CKEDITOR.SELECTION_NONE || (n = c.window.getScrollPosition()));
}), f.attachListener(f, "mouseup", function(a) {
2 == a.data.$.button && n && (c.document.$.documentElement.scrollLeft = n.x, c.document.$.documentElement.scrollTop = n.y), 
n = null;
}), "BackCompat" != a.$.compatMode && ((CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && g.on("mousedown", function(a) {
function c(a) {
if (a = a.data.$, e) {
var b = h.$.createTextRange();
try {
b.moveToPoint(a.x, a.y);
} catch (d) {}
e.setEndPoint(i.compareEndPoints("StartToStart", b) < 0 ? "EndToEnd" :"StartToStart", b), 
e.select();
}
}
function d() {
g.removeListener("mousemove", c), b.removeListener("mouseup", d), g.removeListener("mouseup", d), 
e.select();
}
if (a = a.data, a.getTarget().is("html") && a.$.y < g.$.clientHeight && a.$.x < g.$.clientWidth) {
var e = h.$.createTextRange();
try {
e.moveToPoint(a.$.x, a.$.y);
} catch (f) {}
var i = e.duplicate();
g.on("mousemove", c), b.on("mouseup", d), g.on("mouseup", d);
}
}), CKEDITOR.env.version > 7 && CKEDITOR.env.version < 11)) {
g.on("mousedown", function(a) {
a.data.getTarget().is("html") && (b.on("mouseup", o), g.on("mouseup", o));
});
var o = function() {
b.removeListener("mouseup", o), g.removeListener("mouseup", o);
var c = CKEDITOR.document.$.selection, d = c.createRange();
"None" != c.type && d.parentElement().ownerDocument == a.$ && d.select();
};
}
}
if (f.attachListener(f, "selectionchange", d, c), f.attachListener(f, "keyup", e, c), 
f.attachListener(f, CKEDITOR.env.webkit ? "DOMFocusIn" :"focus", function() {
c.forceNextSelectionCheck(), c.selectionChange(1);
}), k ? CKEDITOR.env.webkit || CKEDITOR.env.gecko :CKEDITOR.env.opera) {
var E;
f.attachListener(f, "mousedown", function() {
E = 1;
}), f.attachListener(a.getDocumentElement(), "mouseup", function() {
E && e.call(c), E = 0;
});
} else f.attachListener(CKEDITOR.env.ie ? f :a.getDocumentElement(), "mouseup", e, c);
CKEDITOR.env.webkit && f.attachListener(a, "keydown", function(a) {
switch (a.data.getKey()) {
case 13:
case 33:
case 34:
case 35:
case 36:
case 37:
case 39:
case 8:
case 45:
case 46:
j(f);
}
}, null, null, -1), f.attachListener(f, "keydown", i(c), null, null, -1);
}), c.on("contentDomUnload", c.forceNextSelectionCheck, c), c.on("dataReady", function() {
delete c._.fakeSelection, delete c._.hiddenSelectionContainer, c.selectionChange(1);
}), c.on("loadSnapshot", function() {
var a = c.editable().getLast(function(a) {
return a.type == CKEDITOR.NODE_ELEMENT;
});
a && a.hasAttribute("data-cke-hidden-sel") && a.remove();
}, null, null, 100), CKEDITOR.env.ie9Compat && c.on("beforeDestroy", b, null, null, 9), 
CKEDITOR.env.webkit && c.on("setData", b), c.on("contentDomUnload", function() {
c.unlockSelection();
}), c.on("key", function(a) {
if ("wysiwyg" == c.mode) {
var b = c.getSelection();
if (b.isFake) {
var d = q[a.data.keyCode];
if (d) return d({
editor:c,
selected:b.getSelectedElement(),
selection:b,
keyEvent:a
});
}
}
});
}), CKEDITOR.on("instanceReady", function(a) {
var c = a.editor;
if (CKEDITOR.env.webkit) {
c.on("selectionChange", function() {
var a = c.editable(), d = b(a);
d && (d.getCustomData("ready") ? j(a) :d.setCustomData("ready", 1));
}, null, null, -1), c.on("beforeSetMode", function() {
j(c.editable());
}, null, null, -1);
var d, e, a = function() {
var a = c.editable();
if (a && (a = b(a))) {
var f = c.document.$.defaultView.getSelection();
"Caret" == f.type && f.anchorNode == a.$ && (e = 1), d = a.getText(), a.setText(g(d));
}
}, f = function() {
var a = c.editable();
a && (a = b(a)) && (a.setText(d), e && (c.document.$.defaultView.getSelection().setPosition(a.$, a.getLength()), 
e = 0));
};
c.on("beforeUndoImage", a), c.on("afterUndoImage", f), c.on("beforeGetData", a, null, null, 0), 
c.on("getData", f);
}
}), CKEDITOR.editor.prototype.selectionChange = function(a) {
(a ? d :e).call(this);
}, CKEDITOR.editor.prototype.getSelection = function(a) {
return !this._.savedSelection && !this._.fakeSelection || a ? (a = this.editable()) && "wysiwyg" == this.mode ? new CKEDITOR.dom.selection(a) :null :this._.savedSelection || this._.fakeSelection;
}, CKEDITOR.editor.prototype.lockSelection = function(a) {
return a = a || this.getSelection(1), a.getType() != CKEDITOR.SELECTION_NONE ? (!a.isLocked && a.lock(), 
this._.savedSelection = a, !0) :!1;
}, CKEDITOR.editor.prototype.unlockSelection = function(a) {
var b = this._.savedSelection;
return b ? (b.unlock(a), delete this._.savedSelection, !0) :!1;
}, CKEDITOR.editor.prototype.forceNextSelectionCheck = function() {
delete this._.selectionPreviousPath;
}, CKEDITOR.dom.document.prototype.getSelection = function() {
return new CKEDITOR.dom.selection(this);
}, CKEDITOR.dom.range.prototype.select = function() {
var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() :new CKEDITOR.dom.selection(this.root);
return a.selectRanges([ this ]), a;
}, CKEDITOR.SELECTION_NONE = 1, CKEDITOR.SELECTION_TEXT = 2, CKEDITOR.SELECTION_ELEMENT = 3;
var l = "function" != typeof window.getSelection, m = 1;
CKEDITOR.dom.selection = function(a) {
if (a instanceof CKEDITOR.dom.selection) var b = a, a = a.root;
var c = a instanceof CKEDITOR.dom.element;
if (this.rev = b ? b.rev :m++, this.document = a instanceof CKEDITOR.dom.document ? a :a.getDocument(), 
this.root = a = c ? a :this.document.getBody(), this.isLocked = 0, this._ = {
cache:{}
}, b) return CKEDITOR.tools.extend(this._.cache, b._.cache), this.isFake = b.isFake, 
this.isLocked = b.isLocked, this;
if (b = l ? this.document.$.selection :this.document.getWindow().$.getSelection(), 
CKEDITOR.env.webkit) ("None" == b.type && this.document.getActive().equals(a) || "Caret" == b.type && b.anchorNode.nodeType == CKEDITOR.NODE_DOCUMENT) && h(a, b); else if (CKEDITOR.env.gecko) b && this.document.getActive().equals(a) && b.anchorNode && b.anchorNode.nodeType == CKEDITOR.NODE_DOCUMENT && h(a, b, !0); else if (CKEDITOR.env.ie) {
var d;
try {
d = this.document.getActive();
} catch (e) {}
l ? "None" == b.type && d && d.equals(this.document.getDocumentElement()) && h(a, null, !0) :((b = b && b.anchorNode) && (b = new CKEDITOR.dom.node(b)), 
d && d.equals(this.document.getDocumentElement()) && b && (a.equals(b) || a.contains(b)) && h(a, null, !0));
}
d = this.getNative();
var f, g;
if (d) if (d.getRangeAt) f = (g = d.rangeCount && d.getRangeAt(0)) && new CKEDITOR.dom.node(g.commonAncestorContainer); else {
try {
g = d.createRange();
} catch (i) {}
f = g && CKEDITOR.dom.element.get(g.item && g.item(0) || g.parentElement());
}
return (!f || f.type != CKEDITOR.NODE_ELEMENT && f.type != CKEDITOR.NODE_TEXT || !this.root.equals(f) && !this.root.contains(f)) && (this._.cache.type = CKEDITOR.SELECTION_NONE, 
this._.cache.startElement = null, this._.cache.selectedElement = null, this._.cache.selectedText = "", 
this._.cache.ranges = new CKEDITOR.dom.rangeList()), this;
};
var r = {
img:1,
hr:1,
li:1,
table:1,
tr:1,
td:1,
th:1,
embed:1,
object:1,
ol:1,
ul:1,
a:1,
input:1,
form:1,
select:1,
textarea:1,
button:1,
fieldset:1,
thead:1,
tfoot:1
};
CKEDITOR.dom.selection.prototype = {
getNative:function() {
return void 0 !== this._.cache.nativeSel ? this._.cache.nativeSel :this._.cache.nativeSel = l ? this.document.$.selection :this.document.getWindow().$.getSelection();
},
getType:l ? function() {
var a = this._.cache;
if (a.type) return a.type;
var b = CKEDITOR.SELECTION_NONE;
try {
var c = this.getNative(), d = c.type;
"Text" == d && (b = CKEDITOR.SELECTION_TEXT), "Control" == d && (b = CKEDITOR.SELECTION_ELEMENT), 
c.createRange().parentElement() && (b = CKEDITOR.SELECTION_TEXT);
} catch (e) {}
return a.type = b;
} :function() {
var a = this._.cache;
if (a.type) return a.type;
var b = CKEDITOR.SELECTION_TEXT, c = this.getNative();
if (c && c.rangeCount) {
if (1 == c.rangeCount) {
var c = c.getRangeAt(0), d = c.startContainer;
d == c.endContainer && 1 == d.nodeType && c.endOffset - c.startOffset == 1 && r[d.childNodes[c.startOffset].nodeName.toLowerCase()] && (b = CKEDITOR.SELECTION_ELEMENT);
}
} else b = CKEDITOR.SELECTION_NONE;
return a.type = b;
},
getRanges:function() {
var a = l ? function() {
function a(b) {
return new CKEDITOR.dom.node(b).getIndex();
}
var b = function(b, c) {
b = b.duplicate(), b.collapse(c);
var d = b.parentElement();
if (!d.hasChildNodes()) return {
container:d,
offset:0
};
for (var f, h, k, p, e = d.children, g = b.duplicate(), i = 0, j = e.length - 1, l = -1; j >= i; ) if (l = Math.floor((i + j) / 2), 
f = e[l], g.moveToElementText(f), k = g.compareEndPoints("StartToStart", b), k > 0) j = l - 1; else {
if (!(0 > k)) return {
container:d,
offset:a(f)
};
i = l + 1;
}
if (-1 == l || l == e.length - 1 && 0 > k) {
if (g.moveToElementText(d), g.setEndPoint("StartToStart", b), g = g.text.replace(/(\r\n|\r)/g, "\n").length, 
e = d.childNodes, !g) return f = e[e.length - 1], f.nodeType != CKEDITOR.NODE_TEXT ? {
container:d,
offset:e.length
} :{
container:f,
offset:f.nodeValue.length
};
for (d = e.length; g > 0 && d > 0; ) h = e[--d], h.nodeType == CKEDITOR.NODE_TEXT && (p = h, 
g -= h.nodeValue.length);
return {
container:p,
offset:-g
};
}
if (g.collapse(k > 0 ? !0 :!1), g.setEndPoint(k > 0 ? "StartToStart" :"EndToStart", b), 
g = g.text.replace(/(\r\n|\r)/g, "\n").length, !g) return {
container:d,
offset:a(f) + (k > 0 ? 0 :1)
};
for (;g > 0; ) try {
h = f[k > 0 ? "previousSibling" :"nextSibling"], h.nodeType == CKEDITOR.NODE_TEXT && (g -= h.nodeValue.length, 
p = h), f = h;
} catch (m) {
return {
container:d,
offset:a(f)
};
}
return {
container:p,
offset:k > 0 ? -g :p.nodeValue.length + g
};
};
return function() {
var a = this.getNative(), c = a && a.createRange(), d = this.getType();
if (!a) return [];
if (d == CKEDITOR.SELECTION_TEXT) return a = new CKEDITOR.dom.range(this.root), 
d = b(c, !0), a.setStart(new CKEDITOR.dom.node(d.container), d.offset), d = b(c), 
a.setEnd(new CKEDITOR.dom.node(d.container), d.offset), a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() && a.collapse(), 
[ a ];
if (d == CKEDITOR.SELECTION_ELEMENT) {
for (var d = [], e = 0; e < c.length; e++) {
for (var f = c.item(e), g = f.parentNode, h = 0, a = new CKEDITOR.dom.range(this.root); h < g.childNodes.length && g.childNodes[h] != f; h++) ;
a.setStart(new CKEDITOR.dom.node(g), h), a.setEnd(new CKEDITOR.dom.node(g), h + 1), 
d.push(a);
}
return d;
}
return [];
};
}() :function() {
var b, a = [], c = this.getNative();
if (!c) return a;
for (var d = 0; d < c.rangeCount; d++) {
var e = c.getRangeAt(d);
b = new CKEDITOR.dom.range(this.root), b.setStart(new CKEDITOR.dom.node(e.startContainer), e.startOffset), 
b.setEnd(new CKEDITOR.dom.node(e.endContainer), e.endOffset), a.push(b);
}
return a;
};
return function(b) {
var c = this._.cache;
if (c.ranges && !b) return c.ranges;
if (c.ranges || (c.ranges = new CKEDITOR.dom.rangeList(a.call(this))), b) for (var d = c.ranges, e = 0; e < d.length; e++) {
var f = d[e];
if (f.getCommonAncestor().isReadOnly() && d.splice(e, 1), !f.collapsed) {
if (f.startContainer.isReadOnly()) for (var g, b = f.startContainer; b && !((g = b.type == CKEDITOR.NODE_ELEMENT) && b.is("body") || !b.isReadOnly()); ) g && "false" == b.getAttribute("contentEditable") && f.setStartAfter(b), 
b = b.getParent();
b = f.startContainer, g = f.endContainer;
var h = f.startOffset, i = f.endOffset, j = f.clone();
b && b.type == CKEDITOR.NODE_TEXT && (h >= b.getLength() ? j.setStartAfter(b) :j.setStartBefore(b)), 
g && g.type == CKEDITOR.NODE_TEXT && (i ? j.setEndAfter(g) :j.setEndBefore(g)), 
b = new CKEDITOR.dom.walker(j), b.evaluator = function(a) {
if (a.type == CKEDITOR.NODE_ELEMENT && a.isReadOnly()) {
var b = f.clone();
return f.setEndBefore(a), f.collapsed && d.splice(e--, 1), a.getPosition(j.endContainer) & CKEDITOR.POSITION_CONTAINS || (b.setStartAfter(a), 
b.collapsed || d.splice(e + 1, 0, b)), !0;
}
return !1;
}, b.next();
}
}
return c.ranges;
};
}(),
getStartElement:function() {
var a = this._.cache;
if (void 0 !== a.startElement) return a.startElement;
var b;
switch (this.getType()) {
case CKEDITOR.SELECTION_ELEMENT:
return this.getSelectedElement();

case CKEDITOR.SELECTION_TEXT:
var c = this.getRanges()[0];
if (c) {
if (c.collapsed) b = c.startContainer, b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()); else {
for (c.optimize(); b = c.startContainer, c.startOffset == (b.getChildCount ? b.getChildCount() :b.getLength()) && !b.isBlockBoundary(); ) c.setStartAfter(b);
if (b = c.startContainer, b.type != CKEDITOR.NODE_ELEMENT) return b.getParent();
if (b = b.getChild(c.startOffset), b && b.type == CKEDITOR.NODE_ELEMENT) for (c = b.getFirst(); c && c.type == CKEDITOR.NODE_ELEMENT; ) b = c, 
c = c.getFirst(); else b = c.startContainer;
}
b = b.$;
}
}
return a.startElement = b ? new CKEDITOR.dom.element(b) :null;
},
getSelectedElement:function() {
var a = this._.cache;
if (void 0 !== a.selectedElement) return a.selectedElement;
var b = this, c = CKEDITOR.tools.tryThese(function() {
return b.getNative().createRange().item(0);
}, function() {
for (var c, d, a = b.getRanges()[0].clone(), e = 2; !(!e || (c = a.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT && r[c.getName()] && (d = c)); e--) a.shrink(CKEDITOR.SHRINK_ELEMENT);
return d && d.$;
});
return a.selectedElement = c ? new CKEDITOR.dom.element(c) :null;
},
getSelectedText:function() {
var a = this._.cache;
if (void 0 !== a.selectedText) return a.selectedText;
var b = this.getNative(), b = l ? "Control" == b.type ? "" :b.createRange().text :b.toString();
return a.selectedText = b;
},
lock:function() {
this.getRanges(), this.getStartElement(), this.getSelectedElement(), this.getSelectedText(), 
this._.cache.nativeSel = null, this.isLocked = 1;
},
unlock:function(a) {
if (this.isLocked) {
if (a) var b = this.getSelectedElement(), c = !b && this.getRanges(), d = this.isFake;
this.isLocked = 0, this.reset(), a && (a = b || c[0] && c[0].getCommonAncestor()) && a.getAscendant("body", 1) && (d ? this.fake(b) :b ? this.selectElement(b) :this.selectRanges(c));
}
},
reset:function() {
this._.cache = {}, this.isFake = 0;
var a = this.root.editor;
if (a && a._.fakeSelection && this.rev == a._.fakeSelection.rev) {
delete a._.fakeSelection;
var b = a._.hiddenSelectionContainer;
b && (a.fire("lockSnapshot"), b.remove(), a.fire("unlockSnapshot")), delete a._.hiddenSelectionContainer;
}
this.rev = m++;
},
selectElement:function(a) {
var b = new CKEDITOR.dom.range(this.root);
b.setStartBefore(a), b.setEndAfter(a), this.selectRanges([ b ]);
},
selectRanges:function(b) {
var c = this.root.editor, c = c && c._.hiddenSelectionContainer;
if (this.reset(), c) for (var d, c = this.root, e = 0; e < b.length; ++e) d = b[e], 
d.endContainer.equals(c) && (d.endOffset = Math.min(d.endOffset, c.getChildCount()));
if (b.length) if (this.isLocked) {
var f = CKEDITOR.document.getActive();
this.unlock(), this.selectRanges(b), this.lock(), !f.equals(this.root) && f.focus();
} else {
var g, h, i;
if ((1 != b.length || (i = b[0]).collapsed || !(g = i.getEnclosedNode()) || g.type != CKEDITOR.NODE_ELEMENT || (i = i.clone(), 
i.shrink(CKEDITOR.SHRINK_ELEMENT, !0), (h = i.getEnclosedNode()) && h.type == CKEDITOR.NODE_ELEMENT && (g = h), 
"false" != g.getAttribute("contenteditable"))) && (g = void 0), g) this.fake(g); else {
if (l) {
i = CKEDITOR.dom.walker.whitespaces(!0), h = /\ufeff|\u00a0/, c = {
table:1,
tbody:1,
tr:1
}, b.length > 1 && (g = b[b.length - 1], b[0].setEnd(g.endContainer, g.endOffset)), 
g = b[0];
var k, m, n, b = g.collapsed;
if ((d = g.getEnclosedNode()) && d.type == CKEDITOR.NODE_ELEMENT && d.getName() in r && (!d.is("a") || !d.getText())) try {
return n = d.$.createControlRange(), n.addElement(d.$), n.select(), void 0;
} catch (o) {}
(g.startContainer.type == CKEDITOR.NODE_ELEMENT && g.startContainer.getName() in c || g.endContainer.type == CKEDITOR.NODE_ELEMENT && g.endContainer.getName() in c) && g.shrink(CKEDITOR.NODE_ELEMENT, !0), 
n = g.createBookmark(), c = n.startNode, b || (f = n.endNode), n = g.document.$.body.createTextRange(), 
n.moveToElementText(c.$), n.moveStart("character", 1), f ? (h = g.document.$.body.createTextRange(), 
h.moveToElementText(f.$), n.setEndPoint("EndToEnd", h), n.moveEnd("character", -1)) :(k = c.getNext(i), 
m = c.hasAscendant("pre"), k = !(k && k.getText && k.getText().match(h)) && (m || !c.hasPrevious() || c.getPrevious().is && c.getPrevious().is("br")), 
m = g.document.createElement("span"), m.setHtml("&#65279;"), m.insertBefore(c), 
k && g.document.createText("").insertBefore(c)), g.setStartBefore(c), c.remove(), 
b ? (k ? (n.moveStart("character", -1), n.select(), g.document.$.selection.clear()) :n.select(), 
g.moveToPosition(m, CKEDITOR.POSITION_BEFORE_START), m.remove()) :(g.setEndBefore(f), 
f.remove(), n.select());
} else {
if (f = this.getNative(), !f) return;
for (CKEDITOR.env.opera && (n = this.document.$.createRange(), n.selectNodeContents(this.root.$), 
f.addRange(n)), this.removeAllRanges(), n = 0; n < b.length; n++) if (n < b.length - 1 && (g = b[n], 
k = b[n + 1], h = g.clone(), h.setStart(g.endContainer, g.endOffset), h.setEnd(k.startContainer, k.startOffset), 
!h.collapsed && (h.shrink(CKEDITOR.NODE_ELEMENT, !0), m = h.getCommonAncestor(), 
h = h.getEnclosedNode(), m.isReadOnly() || h && h.isReadOnly()))) k.setStart(g.startContainer, g.startOffset), 
b.splice(n--, 1); else {
g = b[n], m = this.document.$.createRange(), k = g.startContainer, CKEDITOR.env.opera && g.collapsed && k.type == CKEDITOR.NODE_ELEMENT && (h = k.getChild(g.startOffset - 1), 
i = k.getChild(g.startOffset), (!h && !i && k.is(CKEDITOR.dtd.$removeEmpty) || h && h.type == CKEDITOR.NODE_ELEMENT || i && i.type == CKEDITOR.NODE_ELEMENT) && (g.insertNode(this.document.createText("")), 
g.collapse(1))), g.collapsed && CKEDITOR.env.webkit && a(g) && (k = this.root, j(k, !1), 
h = k.getDocument().createText("\u200b"), k.setCustomData("cke-fillingChar", h), 
g.insertNode(h), (k = h.getNext()) && !h.getPrevious() && k.type == CKEDITOR.NODE_ELEMENT && "br" == k.getName() ? (j(this.root), 
g.moveToPosition(k, CKEDITOR.POSITION_BEFORE_START)) :g.moveToPosition(h, CKEDITOR.POSITION_AFTER_END)), 
m.setStart(g.startContainer.$, g.startOffset);
try {
m.setEnd(g.endContainer.$, g.endOffset);
} catch (q) {
if (!(q.toString().indexOf("NS_ERROR_ILLEGAL_VALUE") >= 0)) throw q;
g.collapse(1), m.setEnd(g.endContainer.$, g.endOffset);
}
f.addRange(m);
}
}
this.reset(), this.root.fire("selectionchange");
}
}
},
fake:function(a) {
var b = this.root.editor;
this.reset(), f(b);
var c = this._.cache, d = new CKEDITOR.dom.range(this.root);
d.setStartBefore(a), d.setEndAfter(a), c.ranges = new CKEDITOR.dom.rangeList(d), 
c.selectedElement = c.startElement = a, c.type = CKEDITOR.SELECTION_ELEMENT, c.selectedText = c.nativeSel = null, 
this.isFake = 1, this.rev = m++, b._.fakeSelection = this, this.root.fire("selectionchange");
},
isHidden:function() {
var a = this.getCommonAncestor();
return a && a.type == CKEDITOR.NODE_TEXT && (a = a.getParent()), !(!a || !a.data("cke-hidden-sel"));
},
createBookmarks:function(a) {
return a = this.getRanges().createBookmarks(a), this.isFake && (a.isFake = 1), a;
},
createBookmarks2:function(a) {
return a = this.getRanges().createBookmarks2(a), this.isFake && (a.isFake = 1), 
a;
},
selectBookmarks:function(a) {
for (var b = [], c = 0; c < a.length; c++) {
var d = new CKEDITOR.dom.range(this.root);
d.moveToBookmark(a[c]), b.push(d);
}
return a.isFake ? this.fake(b[0].getEnclosedNode()) :this.selectRanges(b), this;
},
getCommonAncestor:function() {
var a = this.getRanges();
return a.length ? a[0].startContainer.getCommonAncestor(a[a.length - 1].endContainer) :null;
},
scrollIntoView:function() {
this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView();
},
removeAllRanges:function() {
var a = this.getNative();
try {
a && a[l ? "empty" :"removeAllRanges"]();
} catch (b) {}
this.reset();
}
};
}(), CKEDITOR.editor.prototype.attachStyleStateChange = function(d, e) {
var c = this._.styleStateChangeCallbacks;
c || (c = this._.styleStateChangeCallbacks = [], this.on("selectionChange", function(a) {
for (var b = 0; b < c.length; b++) {
var d = c[b], e = d.style.checkActive(a.data.path) ? CKEDITOR.TRISTATE_ON :CKEDITOR.TRISTATE_OFF;
d.fn.call(this, e);
}
})), c.push({
style:d,
fn:e
});
}, CKEDITOR.STYLE_BLOCK = 1, CKEDITOR.STYLE_INLINE = 2, CKEDITOR.STYLE_OBJECT = 3, 
function() {
function d(a, b) {
for (var c, d; (a = a.getParent()) && !a.equals(b); ) if (a.getAttribute("data-nostyle")) c = a; else if (!d) {
var e = a.getAttribute("contentEditable");
"false" == e ? c = a :"true" == e && (d = 1);
}
return c;
}
function e(b) {
var c = b.document;
if (b.collapsed) c = r(this, c), b.insertNode(c), b.moveToPosition(c, CKEDITOR.POSITION_BEFORE_END); else {
var h, f = this.element, g = this._.definition, i = g.ignoreReadonly, j = i || g.includeReadonly;
void 0 == j && (j = b.root.getCustomData("cke_includeReadonly"));
var l = CKEDITOR.dtd[f];
l || (h = !0, l = CKEDITOR.dtd.span), b.enlarge(CKEDITOR.ENLARGE_INLINE, 1), b.trim();
var o, k = b.createBookmark(), m = k.startNode, n = k.endNode, p = m;
if (!i) {
var u = b.getCommonAncestor(), i = d(m, u), u = d(n, u);
i && (p = i.getNextSourceNode(!0)), u && (n = u);
}
for (p.getPosition(n) == CKEDITOR.POSITION_FOLLOWING && (p = 0); p; ) {
if (i = !1, p.equals(n)) p = null, i = !0; else {
var v = p.type == CKEDITOR.NODE_ELEMENT ? p.getName() :null, u = v && "false" == p.getAttribute("contentEditable"), w = v && p.getAttribute("data-nostyle");
if (v && p.data("cke-bookmark")) {
p = p.getNextSourceNode(!0);
continue;
}
if (u && j && CKEDITOR.dtd.$block[v]) for (var A = p, s = a(A), t = void 0, y = s.length, x = 0, A = y && new CKEDITOR.dom.range(A.getDocument()); y > x; ++x) {
var t = s[x], B = CKEDITOR.filter.instances[t.data("cke-filter")];
(B ? B.check(this) :1) && (A.selectNodeContents(t), e.call(this, A));
}
if (s = v ? !l[v] || w ? 0 :u && !j ? 0 :(p.getPosition(n) | F) == F && (!g.childRule || g.childRule(p)) :1) {
if (!(s = p.getParent()) || !(s.getDtd() || CKEDITOR.dtd.span)[f] && !h || g.parentRule && !g.parentRule(s)) i = !0; else if (o || v && CKEDITOR.dtd.$removeEmpty[v] && (p.getPosition(n) | F) != F || (o = b.clone(), 
o.setStartBefore(p)), v = p.type, v == CKEDITOR.NODE_TEXT || u || v == CKEDITOR.NODE_ELEMENT && !p.getChildCount()) {
for (var ba, v = p; (i = !v.getNext(z)) && (ba = v.getParent(), l[ba.getName()]) && (ba.getPosition(m) | C) == C && (!g.childRule || g.childRule(ba)); ) v = ba;
o.setEndAfter(v);
}
} else i = !0;
p = p.getNextSourceNode(w || u);
}
if (i && o && !o.collapsed) {
for (var $, V, ca, i = r(this, c), u = i.hasAttributes(), w = o.getCommonAncestor(), v = {}, s = {}, t = {}, y = {}; i && w; ) {
if (w.getName() == f) {
for ($ in g.attributes) !y[$] && (ca = w.getAttribute(V)) && (i.getAttribute($) == ca ? s[$] = 1 :y[$] = 1);
for (V in g.styles) !t[V] && (ca = w.getStyle(V)) && (i.getStyle(V) == ca ? v[V] = 1 :t[V] = 1);
}
w = w.getParent();
}
for ($ in s) i.removeAttribute($);
for (V in v) i.removeStyle(V);
u && !i.hasAttributes() && (i = null), i ? (o.extractContents().appendTo(i), o.insertNode(i), 
q.call(this, i), i.mergeSiblings(), CKEDITOR.env.ie || i.$.normalize()) :(i = new CKEDITOR.dom.element("span"), 
o.extractContents().appendTo(i), o.insertNode(i), q.call(this, i), i.remove(!0)), 
o = null;
}
}
b.moveToBookmark(k), b.shrink(CKEDITOR.SHRINK_TEXT), b.shrink(CKEDITOR.NODE_ELEMENT, !0);
}
}
function c(a) {
function b() {
for (var a = new CKEDITOR.dom.elementPath(d.getParent()), c = new CKEDITOR.dom.elementPath(j.getParent()), e = null, f = null, g = 0; g < a.elements.length; g++) {
var h = a.elements[g];
if (h == a.block || h == a.blockLimit) break;
k.checkElementRemovable(h) && (e = h);
}
for (g = 0; g < c.elements.length && (h = c.elements[g], h != c.block && h != c.blockLimit); g++) k.checkElementRemovable(h) && (f = h);
f && j.breakParent(f), e && d.breakParent(e);
}
a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
var c = a.createBookmark(), d = c.startNode;
if (a.collapsed) {
for (var f, h, e = new CKEDITOR.dom.elementPath(d.getParent(), a.root), g = 0; g < e.elements.length && (h = e.elements[g]) && (h != e.block && h != e.blockLimit); g++) if (this.checkElementRemovable(h)) {
var i;
a.collapsed && (a.checkBoundaryOfElement(h, CKEDITOR.END) || (i = a.checkBoundaryOfElement(h, CKEDITOR.START))) ? (f = h, 
f.match = i ? "start" :"end") :(h.mergeSiblings(), h.is(this.element) ? o.call(this, h) :l(h, v(this)[h.getName()]));
}
if (f) {
for (h = d, g = 0; i = e.elements[g], !i.equals(f); g++) i.match || (i = i.clone(), 
i.append(h), h = i);
h["start" == f.match ? "insertBefore" :"insertAfter"](f);
}
} else {
var j = c.endNode, k = this;
for (b(), e = d; !e.equals(j); ) f = e.getNextSourceNode(), e.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(e) && (e.getName() == this.element ? o.call(this, e) :l(e, v(this)[e.getName()]), 
f.type == CKEDITOR.NODE_ELEMENT && f.contains(d) && (b(), f = d.getNext())), e = f;
}
a.moveToBookmark(c), a.shrink(CKEDITOR.NODE_ELEMENT, !0);
}
function a(a) {
var b = [];
return a.forEach(function(a) {
return "true" == a.getAttribute("contenteditable") ? (b.push(a), !1) :void 0;
}, CKEDITOR.NODE_ELEMENT, !0), b;
}
function b(a) {
var b = a.getEnclosedNode() || a.getCommonAncestor(!1, !0);
(a = new CKEDITOR.dom.elementPath(b, a.root).contains(this.element, 1)) && !a.isReadOnly() && p(a, this);
}
function j(a) {
var b = a.getCommonAncestor(!0, !0);
if (a = new CKEDITOR.dom.elementPath(b, a.root).contains(this.element, 1)) {
var b = this._.definition, c = b.attributes;
if (c) for (var d in c) a.removeAttribute(d, c[d]);
if (b.styles) for (var e in b.styles) b.styles.hasOwnProperty(e) && a.removeStyle(e);
}
}
function g(a) {
var b = a.createBookmark(!0), c = a.createIterator();
c.enforceRealBlocks = !0, this._.enterMode && (c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR);
for (var d, g, e = a.document; d = c.getNextParagraph(); ) !d.isReadOnly() && (c.activeFilter ? c.activeFilter.check(this) :1) && (g = r(this, e, d), 
f(d, g));
a.moveToBookmark(b);
}
function h(a) {
var b = a.createBookmark(1), c = a.createIterator();
c.enforceRealBlocks = !0, c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
for (var d, e; d = c.getNextParagraph(); ) this.checkElementRemovable(d) && (d.is("pre") ? ((e = this._.enterMode == CKEDITOR.ENTER_BR ? null :a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" :"div")) && d.copyAttributes(e), 
f(d, e)) :o.call(this, d));
a.moveToBookmark(b);
}
function f(a, b) {
var c = !b;
c && (b = a.getDocument().createElement("div"), a.copyAttributes(b));
var d = b && b.is("pre"), e = a.is("pre"), f = !d && e;
if (d && !e) {
if (e = b, (f = a.getBogus()) && f.remove(), f = a.getHtml(), f = k(f, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, ""), 
f = f.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1"), f = f.replace(/([ \t\n\r]+|&nbsp;)/g, " "), 
f = f.replace(/<br\b[^>]*>/gi, "\n"), CKEDITOR.env.ie) {
var g = a.getDocument().createElement("div");
g.append(e), e.$.outerHTML = "<pre>" + f + "</pre>", e.copyAttributes(g.getFirst()), 
e = g.getFirst().remove();
} else e.setHtml(f);
b = e;
} else f ? b = n(c ? [ a.getHtml() ] :i(a), b) :a.moveChildren(b);
if (b.replace(a), d) {
var h, c = b;
(h = c.getPrevious(B)) && h.type == CKEDITOR.NODE_ELEMENT && h.is("pre") && (d = k(h.getHtml(), /\n$/, "") + "\n\n" + k(c.getHtml(), /^\n/, ""), 
CKEDITOR.env.ie ? c.$.outerHTML = "<pre>" + d + "</pre>" :c.setHtml(d), h.remove());
} else c && m(b);
}
function i(a) {
a.getName();
var b = [];
return k(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function(a, b, c) {
return b + "</pre>" + c + "<pre>";
}).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function(a, c) {
b.push(c);
}), b;
}
function k(a, b, c) {
var d = "", e = "", a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function(a, b, c) {
return b && (d = b), c && (e = c), "";
});
return d + a.replace(b, c) + e;
}
function n(a, b) {
var c;
a.length > 1 && (c = new CKEDITOR.dom.documentFragment(b.getDocument()));
for (var d = 0; d < a.length; d++) {
var e = a[d], e = e.replace(/(\r\n|\r)/g, "\n"), e = k(e, /^[ \t]*\n/, ""), e = k(e, /\n$/, ""), e = k(e, /^[ \t]+|[ \t]+$/g, function(a, b) {
return 1 == a.length ? "&nbsp;" :b ? " " + CKEDITOR.tools.repeat("&nbsp;", a.length - 1) :CKEDITOR.tools.repeat("&nbsp;", a.length - 1) + " ";
}), e = e.replace(/\n/g, "<br>"), e = e.replace(/[ \t]{2,}/g, function(a) {
return CKEDITOR.tools.repeat("&nbsp;", a.length - 1) + " ";
});
if (c) {
var f = b.clone();
f.setHtml(e), c.append(f);
} else b.setHtml(e);
}
return c || b;
}
function o(a, b) {
var g, c = this._.definition, d = c.attributes, c = c.styles, e = v(this)[a.getName()], f = CKEDITOR.tools.isEmpty(d) && CKEDITOR.tools.isEmpty(c);
for (g in d) ("class" == g || this._.definition.fullMatch) && a.getAttribute(g) != A(g, d[g]) || b && "data-" == g.slice(0, 5) || (f = a.hasAttribute(g), 
a.removeAttribute(g));
for (var h in c) this._.definition.fullMatch && a.getStyle(h) != A(h, c[h], !0) || (f = f || !!a.getStyle(h), 
a.removeStyle(h));
l(a, e, t[a.getName()]), f && (this._.definition.alwaysRemoveElement ? m(a, 1) :!CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? m(a) :a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" :"div"));
}
function q(a) {
for (var d, b = v(this), c = a.getElementsByTag(this.element), e = c.count(); --e >= 0; ) d = c.getItem(e), 
d.isReadOnly() || o.call(this, d, !0);
for (var f in b) if (f != this.element) for (c = a.getElementsByTag(f), e = c.count() - 1; e >= 0; e--) d = c.getItem(e), 
d.isReadOnly() || l(d, b[f]);
}
function l(a, b, c) {
if (b = b && b.attributes) for (var d = 0; d < b.length; d++) {
var f, e = b[d][0];
if (f = a.getAttribute(e)) {
var g = b[d][1];
(null === g || g.test && g.test(f) || "string" == typeof g && f == g) && a.removeAttribute(e);
}
}
c || m(a);
}
function m(a, b) {
if (!a.hasAttributes() || b) if (CKEDITOR.dtd.$block[a.getName()]) {
var c = a.getPrevious(B), d = a.getNext(B);
c && (c.type == CKEDITOR.NODE_TEXT || !c.isBlockBoundary({
br:1
})) && a.append("br", 1), d && (d.type == CKEDITOR.NODE_TEXT || !d.isBlockBoundary({
br:1
})) && a.append("br"), a.remove(!0);
} else c = a.getFirst(), d = a.getLast(), a.remove(!0), c && (c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings(), 
d && !c.equals(d) && d.type == CKEDITOR.NODE_ELEMENT && d.mergeSiblings());
}
function r(a, b, c) {
var d;
return d = a.element, "*" == d && (d = "span"), d = new CKEDITOR.dom.element(d, b), 
c && c.copyAttributes(d), d = p(d, a), b.getCustomData("doc_processing_style") && d.hasAttribute("id") ? d.removeAttribute("id") :b.setCustomData("doc_processing_style", 1), 
d;
}
function p(a, b) {
var c = b._.definition, d = c.attributes, c = CKEDITOR.style.getStyleText(c);
if (d) for (var e in d) a.setAttribute(e, d[e]);
return c && a.setAttribute("style", c), a;
}
function u(a, b) {
for (var c in a) a[c] = a[c].replace(y, function(a, c) {
return b[c];
});
}
function v(a) {
if (a._.overrides) return a._.overrides;
var b = a._.overrides = {}, c = a._.definition.overrides;
if (c) {
CKEDITOR.tools.isArray(c) || (c = [ c ]);
for (var d = 0; d < c.length; d++) {
var f, g, e = c[d];
if ("string" == typeof e ? f = e.toLowerCase() :(f = e.element ? e.element.toLowerCase() :a.element, 
g = e.attributes), e = b[f] || (b[f] = {}), g) {
var h, e = e.attributes = e.attributes || [];
for (h in g) e.push([ h.toLowerCase(), g[h] ]);
}
}
}
return b;
}
function A(a, b, c) {
var d = new CKEDITOR.dom.element("span");
return d[c ? "setStyle" :"setAttribute"](a, b), d[c ? "getStyle" :"getAttribute"](a);
}
function w(a, b) {
for (var f, c = a.document, d = a.getRanges(), e = b ? this.removeFromRange :this.applyToRange, g = d.createIterator(); f = g.getNextRange(); ) e.call(this, f);
a.selectRanges(d), c.removeCustomData("doc_processing_style");
}
var t = {
address:1,
div:1,
h1:1,
h2:1,
h3:1,
h4:1,
h5:1,
h6:1,
p:1,
pre:1,
section:1,
header:1,
footer:1,
nav:1,
article:1,
aside:1,
figure:1,
dialog:1,
hgroup:1,
time:1,
meter:1,
menu:1,
command:1,
keygen:1,
output:1,
progress:1,
details:1,
datagrid:1,
datalist:1
}, s = {
a:1,
embed:1,
hr:1,
img:1,
li:1,
object:1,
ol:1,
table:1,
td:1,
tr:1,
th:1,
ul:1,
dl:1,
dt:1,
dd:1,
form:1,
audio:1,
video:1
}, x = /\s*(?:;\s*|$)/, y = /#\((.+?)\)/g, z = CKEDITOR.dom.walker.bookmark(0, 1), B = CKEDITOR.dom.walker.whitespaces(1);
CKEDITOR.style = function(a, b) {
var c = a.attributes;
c && c.style && (a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style)), 
delete c.style), b && (a = CKEDITOR.tools.clone(a), u(a.attributes, b), u(a.styles, b)), 
c = this.element = a.element ? "string" == typeof a.element ? a.element.toLowerCase() :a.element :"*", 
this.type = a.type || (t[c] ? CKEDITOR.STYLE_BLOCK :s[c] ? CKEDITOR.STYLE_OBJECT :CKEDITOR.STYLE_INLINE), 
"object" == typeof this.element && (this.type = CKEDITOR.STYLE_OBJECT), this._ = {
definition:a
};
}, CKEDITOR.editor.prototype.applyStyle = function(a) {
a.checkApplicable(this.elementPath()) && w.call(a, this.getSelection());
}, CKEDITOR.editor.prototype.removeStyle = function(a) {
a.checkApplicable(this.elementPath()) && w.call(a, this.getSelection(), 1);
}, CKEDITOR.style.prototype = {
apply:function(a) {
w.call(this, a.getSelection());
},
remove:function(a) {
w.call(this, a.getSelection(), 1);
},
applyToRange:function(a) {
return (this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? e :this.type == CKEDITOR.STYLE_BLOCK ? g :this.type == CKEDITOR.STYLE_OBJECT ? b :null).call(this, a);
},
removeFromRange:function(a) {
return (this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? c :this.type == CKEDITOR.STYLE_BLOCK ? h :this.type == CKEDITOR.STYLE_OBJECT ? j :null).call(this, a);
},
applyToObject:function(a) {
p(a, this);
},
checkActive:function(a) {
switch (this.type) {
case CKEDITOR.STYLE_BLOCK:
return this.checkElementRemovable(a.block || a.blockLimit, !0);

case CKEDITOR.STYLE_OBJECT:
case CKEDITOR.STYLE_INLINE:
for (var d, b = a.elements, c = 0; c < b.length; c++) if (d = b[c], this.type != CKEDITOR.STYLE_INLINE || d != a.block && d != a.blockLimit) {
if (this.type == CKEDITOR.STYLE_OBJECT) {
var e = d.getName();
if (!("string" == typeof this.element ? e == this.element :e in this.element)) continue;
}
if (this.checkElementRemovable(d, !0)) return !0;
}
}
return !1;
},
checkApplicable:function(a, b) {
if (b && !b.check(this)) return !1;
switch (this.type) {
case CKEDITOR.STYLE_OBJECT:
return !!a.contains(this.element);

case CKEDITOR.STYLE_BLOCK:
return !!a.blockLimit.getDtd()[this.element];
}
return !0;
},
checkElementMatch:function(a, b) {
var c = this._.definition;
if (!a || !c.ignoreReadonly && a.isReadOnly()) return !1;
var d = a.getName();
if ("string" == typeof this.element ? d == this.element :d in this.element) {
if (!b && !a.hasAttributes()) return !0;
if (d = c._AC) c = d; else {
var d = {}, e = 0, f = c.attributes;
if (f) for (var g in f) e++, d[g] = f[g];
(g = CKEDITOR.style.getStyleText(c)) && (d.style || e++, d.style = g), d._length = e, 
c = c._AC = d;
}
if (!c._length) return !0;
for (var h in c) if ("_length" != h) {
if (e = a.getAttribute(h) || "", "style" == h) a:{
d = c[h], "string" == typeof d && (d = CKEDITOR.tools.parseCssText(d)), "string" == typeof e && (e = CKEDITOR.tools.parseCssText(e, !0)), 
g = void 0;
for (g in d) if (!(g in e) || e[g] != d[g] && "inherit" != d[g] && "inherit" != e[g]) {
d = !1;
break a;
}
d = !0;
} else d = c[h] == e;
if (d) {
if (!b) return !0;
} else if (b) return !1;
}
if (b) return !0;
}
return !1;
},
checkElementRemovable:function(a, b) {
if (this.checkElementMatch(a, b)) return !0;
var c = v(this)[a.getName()];
if (c) {
var d;
if (!(c = c.attributes)) return !0;
for (var e = 0; e < c.length; e++) if (d = c[e][0], d = a.getAttribute(d)) {
var f = c[e][1];
if (null === f || "string" == typeof f && d == f || f.test(d)) return !0;
}
}
return !1;
},
buildPreview:function(a) {
var b = this._.definition, c = [], d = b.element;
"bdo" == d && (d = "span");
var c = [ "<", d ], e = b.attributes;
if (e) for (var f in e) c.push(" ", f, '="', e[f], '"');
return (e = CKEDITOR.style.getStyleText(b)) && c.push(' style="', e, '"'), c.push(">", a || b.name, "</", d, ">"), 
c.join("");
},
getDefinition:function() {
return this._.definition;
}
}, CKEDITOR.style.getStyleText = function(a) {
var b = a._ST;
if (b) return b;
var b = a.styles, c = a.attributes && a.attributes.style || "", d = "";
c.length && (c = c.replace(x, ";"));
for (var e in b) {
var f = b[e], g = (e + ":" + f).replace(x, ";");
"inherit" == f ? d += g :c += g;
}
return c.length && (c = CKEDITOR.tools.normalizeCssText(c, !0)), a._ST = c + d;
};
var F = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED, C = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED;
}(), CKEDITOR.styleCommand = function(d, e) {
this.requiredContent = this.allowedContent = this.style = d, CKEDITOR.tools.extend(this, e, !0);
}, CKEDITOR.styleCommand.prototype.exec = function(d) {
d.focus(), this.state == CKEDITOR.TRISTATE_OFF ? d.applyStyle(this.style) :this.state == CKEDITOR.TRISTATE_ON && d.removeStyle(this.style);
}, CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet"), CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet), 
CKEDITOR.loadStylesSet = function(d, e, c) {
CKEDITOR.stylesSet.addExternal(d, e, ""), CKEDITOR.stylesSet.load(d, c);
}, CKEDITOR.editor.prototype.getStylesSet = function(d) {
if (this._.stylesDefinitions) d(this._.stylesDefinitions); else {
var e = this, c = e.config.stylesCombo_stylesSet || e.config.stylesSet;
if (c === !1) d(null); else if (c instanceof Array) e._.stylesDefinitions = c, d(c); else {
c || (c = "default");
var c = c.split(":"), a = c[0];
CKEDITOR.stylesSet.addExternal(a, c[1] ? c.slice(1).join(":") :CKEDITOR.getUrl("styles.js"), ""), 
CKEDITOR.stylesSet.load(a, function(b) {
e._.stylesDefinitions = b[a], d(e._.stylesDefinitions);
});
}
}
}, CKEDITOR.dom.comment = function(d, e) {
"string" == typeof d && (d = (e ? e.$ :document).createComment(d)), CKEDITOR.dom.domObject.call(this, d);
}, CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node(), CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, {
type:CKEDITOR.NODE_COMMENT,
getOuterHtml:function() {
return "<!--" + this.$.nodeValue + "-->";
}
}), function() {
var c, d = {}, e = {};
for (c in CKEDITOR.dtd.$blockLimit) c in CKEDITOR.dtd.$list || (d[c] = 1);
for (c in CKEDITOR.dtd.$block) c in CKEDITOR.dtd.$blockLimit || c in CKEDITOR.dtd.$empty || (e[c] = 1);
CKEDITOR.dom.elementPath = function(a, b) {
var i, c = null, g = null, h = [], f = a, b = b || a.getDocument().getBody();
do if (f.type == CKEDITOR.NODE_ELEMENT) {
if (h.push(f), !this.lastElement && (this.lastElement = f, f.is(CKEDITOR.dtd.$object) || "false" == f.getAttribute("contenteditable"))) continue;
if (f.equals(b)) break;
if (!g && (i = f.getName(), "true" == f.getAttribute("contenteditable") ? g = f :!c && e[i] && (c = f), 
d[i])) {
var k;
if (k = !c) {
if (i = "div" == i) {
a:{
i = f.getChildren(), k = 0;
for (var n = i.count(); n > k; k++) {
var o = i.getItem(k);
if (o.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[o.getName()]) {
i = !0;
break a;
}
}
i = !1;
}
i = !i;
}
k = i;
}
k ? c = f :g = f;
}
} while (f = f.getParent());
g || (g = b), this.block = c, this.blockLimit = g, this.root = b, this.elements = h;
};
}(), CKEDITOR.dom.elementPath.prototype = {
compare:function(d) {
var e = this.elements, d = d && d.elements;
if (!d || e.length != d.length) return !1;
for (var c = 0; c < e.length; c++) if (!e[c].equals(d[c])) return !1;
return !0;
},
contains:function(d, e, c) {
var a;
"string" == typeof d && (a = function(a) {
return a.getName() == d;
}), d instanceof CKEDITOR.dom.element ? a = function(a) {
return a.equals(d);
} :CKEDITOR.tools.isArray(d) ? a = function(a) {
return CKEDITOR.tools.indexOf(d, a.getName()) > -1;
} :"function" == typeof d ? a = d :"object" == typeof d && (a = function(a) {
return a.getName() in d;
});
var b = this.elements, j = b.length;
for (e && j--, c && (b = Array.prototype.slice.call(b, 0), b.reverse()), e = 0; j > e; e++) if (a(b[e])) return b[e];
return null;
},
isContextFor:function(d) {
var e;
return d in CKEDITOR.dtd.$block ? (e = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit, 
!!e.getDtd()[d]) :!0;
},
direction:function() {
return (this.block || this.blockLimit || this.root).getDirection(1);
}
}, CKEDITOR.dom.text = function(d, e) {
"string" == typeof d && (d = (e ? e.$ :document).createTextNode(d)), this.$ = d;
}, CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node(), CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
type:CKEDITOR.NODE_TEXT,
getLength:function() {
return this.$.nodeValue.length;
},
getText:function() {
return this.$.nodeValue;
},
setText:function(d) {
this.$.nodeValue = d;
},
split:function(d) {
var e = this.$.parentNode, c = e.childNodes.length, a = this.getLength(), b = this.getDocument(), j = new CKEDITOR.dom.text(this.$.splitText(d), b);
return e.childNodes.length == c && (d >= a ? (j = b.createText(""), j.insertAfter(this)) :(d = b.createText(""), 
d.insertAfter(j), d.remove())), j;
},
substring:function(d, e) {
return "number" != typeof e ? this.$.nodeValue.substr(d) :this.$.nodeValue.substring(d, e);
}
}), function() {
function d(c, a, b) {
var d = c.serializable, e = a[b ? "endContainer" :"startContainer"], h = b ? "endOffset" :"startOffset", f = d ? a.document.getById(c.startNode) :c.startNode, c = d ? a.document.getById(c.endNode) :c.endNode;
return e.equals(f.getPrevious()) ? (a.startOffset = a.startOffset - e.getLength() - c.getPrevious().getLength(), 
e = c.getNext()) :e.equals(c.getPrevious()) && (a.startOffset = a.startOffset - e.getLength(), 
e = c.getNext()), e.equals(f.getParent()) && a[h]++, e.equals(c.getParent()) && a[h]++, 
a[b ? "endContainer" :"startContainer"] = e, a;
}
CKEDITOR.dom.rangeList = function(c) {
return c instanceof CKEDITOR.dom.rangeList ? c :(c ? c instanceof CKEDITOR.dom.range && (c = [ c ]) :c = [], 
CKEDITOR.tools.extend(c, e));
};
var e = {
createIterator:function() {
var d, c = this, a = CKEDITOR.dom.walker.bookmark(), b = [];
return {
getNextRange:function(e) {
d = void 0 == d ? 0 :d + 1;
var h = c[d];
if (h && c.length > 1) {
if (!d) for (var f = c.length - 1; f >= 0; f--) b.unshift(c[f].createBookmark(!0));
if (e) for (var i = 0; c[d + i + 1]; ) {
for (var k = h.document, e = 0, f = k.getById(b[i].endNode), k = k.getById(b[i + 1].startNode); ;) {
if (f = f.getNextSourceNode(!1), k.equals(f)) e = 1; else if (a(f) || f.type == CKEDITOR.NODE_ELEMENT && f.isBlockBoundary()) continue;
break;
}
if (!e) break;
i++;
}
for (h.moveToBookmark(b.shift()); i--; ) f = c[++d], f.moveToBookmark(b.shift()), 
h.setEnd(f.endContainer, f.endOffset);
}
return h;
}
};
},
createBookmarks:function(c) {
for (var b, a = [], e = 0; e < this.length; e++) {
a.push(b = this[e].createBookmark(c, !0));
for (var g = e + 1; g < this.length; g++) this[g] = d(b, this[g]), this[g] = d(b, this[g], !0);
}
return a;
},
createBookmarks2:function(c) {
for (var a = [], b = 0; b < this.length; b++) a.push(this[b].createBookmark2(c));
return a;
},
moveToBookmarks:function(c) {
for (var a = 0; a < this.length; a++) this[a].moveToBookmark(c[a]);
}
};
}(), function() {
function d() {
return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/");
}
function e(a) {
var b = CKEDITOR.skin["ua_" + a], c = CKEDITOR.env;
if (b) for (var f, b = b.split(",").sort(function(a, b) {
return a > b ? -1 :1;
}), e = 0; e < b.length; e++) if (f = b[e], c.ie && (f.replace(/^ie/, "") == c.version || c.quirks && "iequirks" == f) && (f = "ie"), 
c[f]) {
a += "_" + b[e];
break;
}
return CKEDITOR.getUrl(d() + a + ".css");
}
function c(a, b) {
j[a] || (CKEDITOR.document.appendStyleSheet(e(a)), j[a] = 1), b && b();
}
function a(a) {
var b = a.getById(g);
return b || (b = a.getHead().append("style"), b.setAttribute("id", g), b.setAttribute("type", "text/css")), 
b;
}
function b(a, b, c) {
var d, e, f;
if (CKEDITOR.env.webkit) for (b = b.split("}").slice(0, -1), e = 0; e < b.length; e++) b[e] = b[e].split("{");
for (var g = 0; g < a.length; g++) if (CKEDITOR.env.webkit) for (e = 0; e < b.length; e++) {
for (f = b[e][1], d = 0; d < c.length; d++) f = f.replace(c[d][0], c[d][1]);
a[g].$.sheet.addRule(b[e][0], f);
} else {
for (f = b, d = 0; d < c.length; d++) f = f.replace(c[d][0], c[d][1]);
CKEDITOR.env.ie && CKEDITOR.env.version < 11 ? a[g].$.styleSheet.cssText = a[g].$.styleSheet.cssText + f :a[g].$.innerHTML = a[g].$.innerHTML + f;
}
}
var j = {};
CKEDITOR.skin = {
path:d,
loadPart:function(a, b) {
CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d() + "skin.js"), function() {
c(a, b);
}) :c(a, b);
},
getPath:function(a) {
return CKEDITOR.getUrl(e(a));
},
icons:{},
addIcon:function(a, b, c, d) {
a = a.toLowerCase(), this.icons[a] || (this.icons[a] = {
path:b,
offset:c || 0,
bgsize:d || "16px"
});
},
getIconStyle:function(a, b, c, d, e) {
var f;
return a && (a = a.toLowerCase(), b && (f = this.icons[a + "-rtl"]), f || (f = this.icons[a])), 
a = c || f && f.path || "", d = d || f && f.offset, e = e || f && f.bgsize || "16px", 
a && "background-image:url(" + CKEDITOR.getUrl(a) + ");background-position:0 " + d + "px;background-size:" + e + ";";
}
}, CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
getUiColor:function() {
return this.uiColor;
},
setUiColor:function(c) {
var d = a(CKEDITOR.document);
return (this.setUiColor = function(a) {
var c = CKEDITOR.skin.chameleon, e = [ [ f, a ] ];
this.uiColor = a, b([ d ], c(this, "editor"), e), b(h, c(this, "panel"), e);
}).call(this, c);
}
});
var g = "cke_ui_color", h = [], f = /\$color/g;
CKEDITOR.on("instanceLoaded", function(c) {
if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
var d = c.editor, c = function(c) {
if (c = (c.data[0] || c.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument(), 
!c.getById("cke_ui_color")) {
c = a(c), h.push(c);
var e = d.getUiColor();
e && b([ c ], CKEDITOR.skin.chameleon(d, "panel"), [ [ f, e ] ]);
}
};
d.on("panelShow", c), d.on("menuShow", c), d.config.uiColor && d.setUiColor(d.config.uiColor);
}
});
}(), function() {
if (CKEDITOR.env.webkit) CKEDITOR.env.hc = !1; else {
var d = CKEDITOR.dom.element.createFromHtml('<div style="width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"></div>', CKEDITOR.document);
d.appendTo(CKEDITOR.document.getHead());
try {
var e = d.getComputedStyle("border-top-color"), c = d.getComputedStyle("border-right-color");
CKEDITOR.env.hc = !(!e || e != c);
} catch (a) {
CKEDITOR.env.hc = !1;
}
d.remove();
}
if (CKEDITOR.env.hc && (CKEDITOR.env.cssClass = CKEDITOR.env.cssClass + " cke_hc"), 
CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}"), CKEDITOR.status = "loaded", 
CKEDITOR.fireOnce("loaded"), d = CKEDITOR._.pending) for (delete CKEDITOR._.pending, 
e = 0; e < d.length; e++) CKEDITOR.editor.prototype.constructor.apply(d[e][0], d[e][1]), 
CKEDITOR.add(d[e][0]);
}(), CKEDITOR.skin.name = "moono", CKEDITOR.skin.ua_editor = "ie,iequirks,ie7,ie8,gecko", 
CKEDITOR.skin.ua_dialog = "ie,iequirks,ie7,ie8,opera", CKEDITOR.skin.chameleon = function() {
var d = function() {
return function(a, b) {
for (var c = a.match(/[^#]./g), d = 0; 3 > d; d++) {
var i, e = c, f = d;
i = parseInt(c[d], 16), i = ("0" + (0 > b ? 0 | i * (1 + b) :0 | i + (255 - i) * b).toString(16)).slice(-2), 
e[f] = i;
}
return "#" + c.join("");
};
}(), e = function() {
var a = new CKEDITOR.template("background:#{to};background-image:-webkit-gradient(linear,lefttop,leftbottom,from({from}),to({to}));background-image:-moz-linear-gradient(top,{from},{to});background-image:-webkit-linear-gradient(top,{from},{to});background-image:-o-linear-gradient(top,{from},{to});background-image:-ms-linear-gradient(top,{from},{to});background-image:linear-gradient(top,{from},{to});filter:progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr='{from}',endColorstr='{to}');");
return function(b, c) {
return a.output({
from:b,
to:c
});
};
}(), c = {
editor:new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ {defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_bottom [{defaultGradient}border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [{defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [{defaultGradient}outline-color:{defaultBorder};border-top-color:{defaultBorder};] {id} .cke_dialog_tab [{lightGradient}border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [{mediumGradient}] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} .cke_toolgroup [{lightGradient}border-color:{defaultBorder};] {id} a.cke_button_off:hover, {id} a.cke_button_off:focus, {id} a.cke_button_off:active [{mediumGradient}] {id} .cke_button_on [{ckeButtonOn}] {id} .cke_toolbar_separator [background-color: {ckeToolbarSeparator};] {id} .cke_combo_button [border-color:{defaultBorder};{lightGradient}] {id} a.cke_combo_button:hover, {id} a.cke_combo_button:focus, {id} .cke_combo_on a.cke_combo_button [border-color:{defaultBorder};{mediumGradient}] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover, {id} a.cke_path_item:focus, {id} a.cke_path_item:active [background-color:{elementsPathBg};] {id}.cke_panel [border-color:{defaultBorder};] "),
panel:new CKEDITOR.template(".cke_panel_grouptitle [{lightGradient}border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:focus.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:focus.cke_colorauto, a:focus.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")
};
return function(a, b) {
var j = a.uiColor, j = {
id:"." + a.id,
defaultBorder:d(j, -.1),
defaultGradient:e(d(j, .9), j),
lightGradient:e(d(j, 1), d(j, .7)),
mediumGradient:e(d(j, .8), d(j, .5)),
ckeButtonOn:e(d(j, .6), d(j, .7)),
ckeResizer:d(j, -.4),
ckeToolbarSeparator:d(j, .5),
ckeColorauto:d(j, .8),
dialogBody:d(j, .7),
dialogTabSelected:e("#FFFFFF", "#FFFFFF"),
dialogTabSelectedBorder:"#FFF",
elementsPathColor:d(j, -.6),
elementsPathBg:j,
menubuttonIcon:d(j, .5),
menubuttonIconHover:d(j, .3)
};
return c[b].output(j).replace(/\[/g, "{").replace(/\]/g, "}");
};
}(), CKEDITOR.plugins.add("dialogui", {
onLoad:function() {
var d = function(a) {
this._ || (this._ = {}), this._["default"] = this._.initValue = a["default"] || "", 
this._.required = a.required || !1;
for (var b = [ this._ ], c = 1; c < arguments.length; c++) b.push(arguments[c]);
return b.push(!0), CKEDITOR.tools.extend.apply(CKEDITOR.tools, b), this._;
}, e = {
build:function(a, b, c) {
return new CKEDITOR.ui.dialog.textInput(a, b, c);
}
}, c = {
build:function(a, b, c) {
return new CKEDITOR.ui.dialog[b.type](a, b, c);
}
}, a = {
isChanged:function() {
return this.getValue() != this.getInitValue();
},
reset:function(a) {
this.setValue(this.getInitValue(), a);
},
setInitValue:function() {
this._.initValue = this.getValue();
},
resetInitValue:function() {
this._.initValue = this._["default"];
},
getInitValue:function() {
return this._.initValue;
}
}, b = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
onChange:function(a, b) {
this._.domOnChangeRegistered || (a.on("load", function() {
this.getInputElement().on("change", function() {
a.parts.dialog.isVisible() && this.fire("change", {
value:this.getValue()
});
}, this);
}, this), this._.domOnChangeRegistered = !0), this.on("change", b);
}
}, !0), j = /^on([A-Z]\w+)/, g = function(a) {
for (var b in a) (j.test(b) || "title" == b || "type" == b) && delete a[b];
return a;
};
CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
labeledElement:function(a, b, c, e) {
if (!(arguments.length < 4)) {
var g = d.call(this, b);
g.labelId = CKEDITOR.tools.getNextId() + "_label", this._.children = [], CKEDITOR.ui.dialog.uiElement.call(this, a, b, c, "div", null, {
role:"presentation"
}, function() {
var c = [], d = b.required ? " cke_required" :"";
return "horizontal" != b.labelLayout ? c.push('<label class="cke_dialog_ui_labeled_label' + d + '" ', ' id="' + g.labelId + '"', g.inputId ? ' for="' + g.inputId + '"' :"", (b.labelStyle ? ' style="' + b.labelStyle + '"' :"") + ">", b.label, "</label>", '<div class="cke_dialog_ui_labeled_content"', b.controlStyle ? ' style="' + b.controlStyle + '"' :"", ' role="radiogroup" aria-labelledby="' + g.labelId + '">', e.call(this, a, b), "</div>") :(d = {
type:"hbox",
widths:b.widths,
padding:0,
children:[ {
type:"html",
html:'<label class="cke_dialog_ui_labeled_label' + d + '" id="' + g.labelId + '" for="' + g.inputId + '"' + (b.labelStyle ? ' style="' + b.labelStyle + '"' :"") + ">" + CKEDITOR.tools.htmlEncode(b.label) + "</span>"
}, {
type:"html",
html:'<span class="cke_dialog_ui_labeled_content"' + (b.controlStyle ? ' style="' + b.controlStyle + '"' :"") + ">" + e.call(this, a, b) + "</span>"
} ]
}, CKEDITOR.dialog._.uiElementBuilders.hbox.build(a, d, c)), c.join("");
});
}
},
textInput:function(a, b, c) {
if (!(arguments.length < 3)) {
d.call(this, b);
var e = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput", g = {
"class":"cke_dialog_ui_input_" + b.type,
id:e,
type:b.type
};
b.validate && (this.validate = b.validate), b.maxLength && (g.maxlength = b.maxLength), 
b.size && (g.size = b.size), b.inputStyle && (g.style = b.inputStyle);
var j = this, q = !1;
a.on("load", function() {
j.getInputElement().on("keydown", function(a) {
13 == a.data.getKeystroke() && (q = !0);
}), j.getInputElement().on("keyup", function(b) {
13 == b.data.getKeystroke() && q && (a.getButton("ok") && setTimeout(function() {
a.getButton("ok").click();
}, 0), q = !1);
}, null, null, 1e3);
}), CKEDITOR.ui.dialog.labeledElement.call(this, a, b, c, function() {
var a = [ '<div class="cke_dialog_ui_input_', b.type, '" role="presentation"' ];
b.width && a.push('style="width:' + b.width + '" '), a.push("><input "), g["aria-labelledby"] = this._.labelId, 
this._.required && (g["aria-required"] = this._.required);
for (var c in g) a.push(c + '="' + g[c] + '" ');
return a.push(" /></div>"), a.join("");
});
}
},
textarea:function(a, b, c) {
if (!(arguments.length < 3)) {
d.call(this, b);
var e = this, g = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea", j = {};
b.validate && (this.validate = b.validate), j.rows = b.rows || 5, j.cols = b.cols || 20, 
j["class"] = "cke_dialog_ui_input_textarea " + (b["class"] || ""), "undefined" != typeof b.inputStyle && (j.style = b.inputStyle), 
b.dir && (j.dir = b.dir), CKEDITOR.ui.dialog.labeledElement.call(this, a, b, c, function() {
j["aria-labelledby"] = this._.labelId, this._.required && (j["aria-required"] = this._.required);
var b, a = [ '<div class="cke_dialog_ui_input_textarea" role="presentation"><textarea id="', g, '" ' ];
for (b in j) a.push(b + '="' + CKEDITOR.tools.htmlEncode(j[b]) + '" ');
return a.push(">", CKEDITOR.tools.htmlEncode(e._["default"]), "</textarea></div>"), 
a.join("");
});
}
},
checkbox:function(a, b, c) {
if (!(arguments.length < 3)) {
var e = d.call(this, b, {
"default":!!b["default"]
});
b.validate && (this.validate = b.validate), CKEDITOR.ui.dialog.uiElement.call(this, a, b, c, "span", null, null, function() {
var c = CKEDITOR.tools.extend({}, b, {
id:b.id ? b.id + "_checkbox" :CKEDITOR.tools.getNextId() + "_checkbox"
}, !0), d = [], i = CKEDITOR.tools.getNextId() + "_label", j = {
"class":"cke_dialog_ui_checkbox_input",
type:"checkbox",
"aria-labelledby":i
};
return g(c), b["default"] && (j.checked = "checked"), "undefined" != typeof c.inputStyle && (c.style = c.inputStyle), 
e.checkbox = new CKEDITOR.ui.dialog.uiElement(a, c, d, "input", null, j), d.push(' <label id="', i, '" for="', j.id, '"' + (b.labelStyle ? ' style="' + b.labelStyle + '"' :"") + ">", CKEDITOR.tools.htmlEncode(b.label), "</label>"), 
d.join("");
});
}
},
radio:function(a, b, c) {
if (!(arguments.length < 3)) {
d.call(this, b), this._["default"] || (this._["default"] = this._.initValue = b.items[0][1]), 
b.validate && (this.validate = b.valdiate);
var e = [], j = this;
CKEDITOR.ui.dialog.labeledElement.call(this, a, b, c, function() {
for (var c = [], d = [], i = (b.id ? b.id :CKEDITOR.tools.getNextId()) + "_radio", m = 0; m < b.items.length; m++) {
var r = b.items[m], p = void 0 !== r[2] ? r[2] :r[0], u = void 0 !== r[1] ? r[1] :r[0], v = CKEDITOR.tools.getNextId() + "_radio_input", A = v + "_label", v = CKEDITOR.tools.extend({}, b, {
id:v,
title:null,
type:null
}, !0), p = CKEDITOR.tools.extend({}, v, {
title:p
}, !0), w = {
type:"radio",
"class":"cke_dialog_ui_radio_input",
name:i,
value:u,
"aria-labelledby":A
}, t = [];
j._["default"] == u && (w.checked = "checked"), g(v), g(p), "undefined" != typeof v.inputStyle && (v.style = v.inputStyle), 
v.keyboardFocusable = !0, e.push(new CKEDITOR.ui.dialog.uiElement(a, v, t, "input", null, w)), 
t.push(" "), new CKEDITOR.ui.dialog.uiElement(a, p, t, "label", null, {
id:A,
"for":w.id
}, r[0]), c.push(t.join(""));
}
return new CKEDITOR.ui.dialog.hbox(a, e, c, d), d.join("");
}), this._.children = e;
}
},
button:function(a, b, c) {
if (arguments.length) {
"function" == typeof b && (b = b(a.getParentEditor())), d.call(this, b, {
disabled:b.disabled || !1
}), CKEDITOR.event.implementOn(this);
var e = this;
a.on("load", function() {
var a = this.getElement();
!function() {
a.on("click", function(a) {
e.click(), a.data.preventDefault();
}), a.on("keydown", function(a) {
a.data.getKeystroke() in {
32:1
} && (e.click(), a.data.preventDefault());
});
}(), a.unselectable();
}, this);
var g = CKEDITOR.tools.extend({}, b);
delete g.style;
var j = CKEDITOR.tools.getNextId() + "_label";
CKEDITOR.ui.dialog.uiElement.call(this, a, g, c, "a", null, {
style:b.style,
href:"javascript:void(0)",
title:b.label,
hidefocus:"true",
"class":b["class"],
role:"button",
"aria-labelledby":j
}, '<span id="' + j + '" class="cke_dialog_ui_button">' + CKEDITOR.tools.htmlEncode(b.label) + "</span>");
}
},
select:function(a, b, c) {
if (!(arguments.length < 3)) {
var e = d.call(this, b);
b.validate && (this.validate = b.validate), e.inputId = CKEDITOR.tools.getNextId() + "_select", 
CKEDITOR.ui.dialog.labeledElement.call(this, a, b, c, function() {
var c = CKEDITOR.tools.extend({}, b, {
id:b.id ? b.id + "_select" :CKEDITOR.tools.getNextId() + "_select"
}, !0), d = [], i = [], j = {
id:e.inputId,
"class":"cke_dialog_ui_input_select",
"aria-labelledby":this._.labelId
};
d.push('<div class="cke_dialog_ui_input_', b.type, '" role="presentation"'), b.width && d.push('style="width:' + b.width + '" '), 
d.push(">"), void 0 != b.size && (j.size = b.size), void 0 != b.multiple && (j.multiple = b.multiple), 
g(c);
for (var r, m = 0; m < b.items.length && (r = b.items[m]); m++) i.push('<option value="', CKEDITOR.tools.htmlEncode(void 0 !== r[1] ? r[1] :r[0]).replace(/"/g, "&quot;"), '" /> ', CKEDITOR.tools.htmlEncode(r[0]));
return "undefined" != typeof c.inputStyle && (c.style = c.inputStyle), e.select = new CKEDITOR.ui.dialog.uiElement(a, c, d, "select", null, j, i.join("")), 
d.push("</div>"), d.join("");
});
}
},
file:function(a, b, c) {
if (!(arguments.length < 3)) {
void 0 === b["default"] && (b["default"] = "");
var e = CKEDITOR.tools.extend(d.call(this, b), {
definition:b,
buttons:[]
});
b.validate && (this.validate = b.validate), a.on("load", function() {
CKEDITOR.document.getById(e.frameId).getParent().addClass("cke_dialog_ui_input_file");
}), CKEDITOR.ui.dialog.labeledElement.call(this, a, b, c, function() {
e.frameId = CKEDITOR.tools.getNextId() + "_fileInput";
var a = [ '<iframe frameborder="0" allowtransparency="0" class="cke_dialog_ui_input_file" role="presentation" id="', e.frameId, '" title="', b.label, '" src="javascript:void(' ];
return a.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" :"0"), 
a.push(')"></iframe>'), a.join("");
});
}
},
fileButton:function(a, b, c) {
if (!(arguments.length < 3)) {
d.call(this, b);
var e = this;
b.validate && (this.validate = b.validate);
var g = CKEDITOR.tools.extend({}, b), j = g.onClick;
g.className = (g.className ? g.className + " " :"") + "cke_dialog_ui_button", g.onClick = function(c) {
var d = b["for"];
j && j.call(this, c) === !1 || (a.getContentElement(d[0], d[1]).submit(), this.disable());
}, a.on("load", function() {
a.getContentElement(b["for"][0], b["for"][1])._.buttons.push(e);
}), CKEDITOR.ui.dialog.button.call(this, a, g, c);
}
},
html:function() {
var a = /^\s*<[\w:]+\s+([^>]*)?>/, b = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/, c = /\/$/;
return function(d, e, g) {
if (!(arguments.length < 3)) {
var j = [], l = e.html;
"<" != l.charAt(0) && (l = "<span>" + l + "</span>");
var m = e.focus;
if (m) {
var r = this.focus;
this.focus = function() {
("function" == typeof m ? m :r).call(this), this.fire("focus");
}, e.isFocusable && (this.isFocusable = this.isFocusable), this.keyboardFocusable = !0;
}
CKEDITOR.ui.dialog.uiElement.call(this, d, e, j, "span", null, null, ""), j = j.join("").match(a), 
l = l.match(b) || [ "", "", "" ], c.test(l[1]) && (l[1] = l[1].slice(0, -1), l[2] = "/" + l[2]), 
g.push([ l[1], " ", j[1] || "", l[2] ].join(""));
}
};
}(),
fieldset:function(a, b, c, d, e) {
var g = e.label;
this._ = {
children:b
}, CKEDITOR.ui.dialog.uiElement.call(this, a, e, d, "fieldset", null, null, function() {
var a = [];
g && a.push("<legend" + (e.labelStyle ? ' style="' + e.labelStyle + '"' :"") + ">" + g + "</legend>");
for (var b = 0; b < c.length; b++) a.push(c[b]);
return a.join("");
});
}
}, !0), CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement(), 
CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(), {
setLabel:function(a) {
var b = CKEDITOR.document.getById(this._.labelId);
return b.getChildCount() < 1 ? new CKEDITOR.dom.text(a, CKEDITOR.document).appendTo(b) :b.getChild(0).$.nodeValue = a, 
this;
},
getLabel:function() {
var a = CKEDITOR.document.getById(this._.labelId);
return !a || a.getChildCount() < 1 ? "" :a.getChild(0).getText();
},
eventProcessors:b
}, !0), CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(), {
click:function() {
return this._.disabled ? !1 :this.fire("click", {
dialog:this._.dialog
});
},
enable:function() {
this._.disabled = !1;
var a = this.getElement();
a && a.removeClass("cke_disabled");
},
disable:function() {
this._.disabled = !0, this.getElement().addClass("cke_disabled");
},
isVisible:function() {
return this.getElement().getFirst().isVisible();
},
isEnabled:function() {
return !this._.disabled;
},
eventProcessors:CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
onClick:function(a, b) {
this.on("click", function() {
b.apply(this, arguments);
});
}
}, !0),
accessKeyUp:function() {
this.click();
},
accessKeyDown:function() {
this.focus();
},
keyboardFocusable:!0
}, !0), CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement(), {
getInputElement:function() {
return CKEDITOR.document.getById(this._.inputId);
},
focus:function() {
var a = this.selectParentTab();
setTimeout(function() {
var b = a.getInputElement();
b && b.$.focus();
}, 0);
},
select:function() {
var a = this.selectParentTab();
setTimeout(function() {
var b = a.getInputElement();
b && (b.$.focus(), b.$.select());
}, 0);
},
accessKeyUp:function() {
this.select();
},
setValue:function(a) {
return !a && (a = ""), CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments);
},
keyboardFocusable:!0
}, a, !0), CKEDITOR.ui.dialog.textarea.prototype = new CKEDITOR.ui.dialog.textInput(), 
CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement(), {
getInputElement:function() {
return this._.select.getElement();
},
add:function(a, b, c) {
var d = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document), e = this.getInputElement().$;
return d.$.text = a, d.$.value = void 0 === b || null === b ? a :b, void 0 === c || null === c ? CKEDITOR.env.ie ? e.add(d.$) :e.add(d.$, null) :e.add(d.$, c), 
this;
},
remove:function(a) {
return this.getInputElement().$.remove(a), this;
},
clear:function() {
for (var a = this.getInputElement().$; a.length > 0; ) a.remove(0);
return this;
},
keyboardFocusable:!0
}, a, !0), CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(), {
getInputElement:function() {
return this._.checkbox.getElement();
},
setValue:function(a, b) {
this.getInputElement().$.checked = a, !b && this.fire("change", {
value:a
});
},
getValue:function() {
return this.getInputElement().$.checked;
},
accessKeyUp:function() {
this.setValue(!this.getValue());
},
eventProcessors:{
onChange:function(a, c) {
return !CKEDITOR.env.ie || CKEDITOR.env.version > 8 ? b.onChange.apply(this, arguments) :(a.on("load", function() {
var a = this._.checkbox.getElement();
a.on("propertychange", function(b) {
b = b.data.$, "checked" == b.propertyName && this.fire("change", {
value:a.$.checked
});
}, this);
}, this), this.on("change", c), null);
}
},
keyboardFocusable:!0
}, a, !0), CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(), {
setValue:function(a, b) {
for (var d, c = this._.children, e = 0; e < c.length && (d = c[e]); e++) d.getElement().$.checked = d.getValue() == a;
!b && this.fire("change", {
value:a
});
},
getValue:function() {
for (var a = this._.children, b = 0; b < a.length; b++) if (a[b].getElement().$.checked) return a[b].getValue();
return null;
},
accessKeyUp:function() {
var b, a = this._.children;
for (b = 0; b < a.length; b++) if (a[b].getElement().$.checked) return a[b].getElement().focus(), 
void 0;
a[0].getElement().focus();
},
eventProcessors:{
onChange:function(a, c) {
return CKEDITOR.env.ie ? (a.on("load", function() {
for (var a = this._.children, b = this, c = 0; c < a.length; c++) a[c].getElement().on("propertychange", function(a) {
a = a.data.$, "checked" == a.propertyName && this.$.checked && b.fire("change", {
value:this.getAttribute("value")
});
});
}, this), this.on("change", c), null) :b.onChange.apply(this, arguments);
}
}
}, a, !0), CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement(), a, {
getInputElement:function() {
var a = CKEDITOR.document.getById(this._.frameId).getFrameDocument();
return a.$.forms.length > 0 ? new CKEDITOR.dom.element(a.$.forms[0].elements[0]) :this.getElement();
},
submit:function() {
return this.getInputElement().getParent().$.submit(), this;
},
getAction:function() {
return this.getInputElement().getParent().$.action;
},
registerEvents:function(a) {
var c, e, b = /^on([A-Z]\w+)/, d = function(a, b, c, d) {
a.on("formLoaded", function() {
a.getInputElement().on(c, d, a);
});
};
for (e in a) (c = e.match(b)) && (this.eventProcessors[e] ? this.eventProcessors[e].call(this, this._.dialog, a[e]) :d(this, this._.dialog, c[1].toLowerCase(), a[e]));
return this;
},
reset:function() {
function a() {
c.$.open();
var h = "";
d.size && (h = d.size - (CKEDITOR.env.ie ? 7 :0));
var p = b.frameId + "_input";
for (c.$.write([ '<html dir="' + l + '" lang="' + m + '"><head><title></title></head><body style="margin: 0; overflow: hidden; background: transparent;">', '<form enctype="multipart/form-data" method="POST" dir="' + l + '" lang="' + m + '" action="', CKEDITOR.tools.htmlEncode(d.action), '"><label id="', b.labelId, '" for="', p, '" style="display:none">', CKEDITOR.tools.htmlEncode(d.label), '</label><input id="', p, '" aria-labelledby="', b.labelId, '" type="file" name="', CKEDITOR.tools.htmlEncode(d.id || "cke_upload"), '" size="', CKEDITOR.tools.htmlEncode(h > 0 ? h :""), '" /></form></body></html><script>', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" :"", "window.parent.CKEDITOR.tools.callFunction(" + g + ");", "window.onbeforeunload = function() {window.parent.CKEDITOR.tools.callFunction(" + j + ")}", "</script>" ].join("")), 
c.$.close(), h = 0; h < e.length; h++) e[h].enable();
}
var b = this._, c = CKEDITOR.document.getById(b.frameId).getFrameDocument(), d = b.definition, e = b.buttons, g = this.formLoadedNumber, j = this.formUnloadNumber, l = b.dialog._.editor.lang.dir, m = b.dialog._.editor.langCode;
g || (g = this.formLoadedNumber = CKEDITOR.tools.addFunction(function() {
this.fire("formLoaded");
}, this), j = this.formUnloadNumber = CKEDITOR.tools.addFunction(function() {
this.getInputElement().clearCustomData();
}, this), this.getDialog()._.editor.on("destroy", function() {
CKEDITOR.tools.removeFunction(g), CKEDITOR.tools.removeFunction(j);
})), CKEDITOR.env.gecko ? setTimeout(a, 500) :a();
},
getValue:function() {
return this.getInputElement().$.value || "";
},
setInitValue:function() {
this._.initValue = "";
},
eventProcessors:{
onChange:function(a, b) {
this._.domOnChangeRegistered || (this.on("formLoaded", function() {
this.getInputElement().on("change", function() {
this.fire("change", {
value:this.getValue()
});
}, this);
}, this), this._.domOnChangeRegistered = !0), this.on("change", b);
}
},
keyboardFocusable:!0
}, !0), CKEDITOR.ui.dialog.fileButton.prototype = new CKEDITOR.ui.dialog.button(), 
CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype), 
CKEDITOR.dialog.addUIElement("text", e), CKEDITOR.dialog.addUIElement("password", e), 
CKEDITOR.dialog.addUIElement("textarea", c), CKEDITOR.dialog.addUIElement("checkbox", c), 
CKEDITOR.dialog.addUIElement("radio", c), CKEDITOR.dialog.addUIElement("button", c), 
CKEDITOR.dialog.addUIElement("select", c), CKEDITOR.dialog.addUIElement("file", c), 
CKEDITOR.dialog.addUIElement("fileButton", c), CKEDITOR.dialog.addUIElement("html", c), 
CKEDITOR.dialog.addUIElement("fieldset", {
build:function(a, b, c) {
for (var e, d = b.children, g = [], j = [], l = 0; l < d.length && (e = d[l]); l++) {
var m = [];
g.push(m), j.push(CKEDITOR.dialog._.uiElementBuilders[e.type].build(a, e, m));
}
return new CKEDITOR.ui.dialog[b.type](a, j, g, c, b);
}
});
}
}), CKEDITOR.DIALOG_RESIZE_NONE = 0, CKEDITOR.DIALOG_RESIZE_WIDTH = 1, CKEDITOR.DIALOG_RESIZE_HEIGHT = 2, 
CKEDITOR.DIALOG_RESIZE_BOTH = 3, function() {
function d() {
for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--) if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
return null;
}
function e() {
for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; b + a > c; c++) if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
return null;
}
function c(a, b) {
for (var c = a.$.getElementsByTagName("input"), d = 0, e = c.length; e > d; d++) {
var g = new CKEDITOR.dom.element(c[d]);
"text" == g.getAttribute("type").toLowerCase() && (b ? (g.setAttribute("value", g.getCustomData("fake_value") || ""), 
g.removeCustomData("fake_value")) :(g.setCustomData("fake_value", g.getAttribute("value")), 
g.setAttribute("value", "")));
}
}
function a(a, b) {
var c = this.getInputElement();
c && (a ? c.removeAttribute("aria-invalid") :c.setAttribute("aria-invalid", !0)), 
a || (this.select ? this.select() :this.focus()), b && alert(b), this.fire("validated", {
valid:a,
msg:b
});
}
function b() {
var a = this.getInputElement();
a && a.removeAttribute("aria-invalid");
}
function j(a) {
var a = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", m).output({
id:CKEDITOR.tools.getNextNumber(),
editorId:a.id,
langDir:a.lang.dir,
langCode:a.langCode,
editorDialogClass:"cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog",
closeTitle:a.lang.common.close,
hidpi:CKEDITOR.env.hidpi ? "cke_hidpi" :""
})), b = a.getChild([ 0, 0, 0, 0, 0 ]), c = b.getChild(0), d = b.getChild(1);
if (CKEDITOR.env.ie && !CKEDITOR.env.ie6Compat) {
var e = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())";
CKEDITOR.dom.element.createFromHtml('<iframe frameBorder="0" class="cke_iframe_shim" src="' + e + '" tabIndex="-1"></iframe>').appendTo(b.getParent());
}
return c.unselectable(), d.unselectable(), {
element:a,
parts:{
dialog:a.getChild(0),
title:c,
close:d,
tabs:b.getChild(2),
contents:b.getChild([ 3, 0, 0, 0 ]),
footer:b.getChild([ 3, 0, 1, 0 ])
}
};
}
function g(a, b, c) {
this.element = b, this.focusIndex = c, this.tabIndex = 0, this.isFocusable = function() {
return !b.getAttribute("disabled") && b.isVisible();
}, this.focus = function() {
a._.currentFocusIndex = this.focusIndex, this.element.focus();
}, b.on("keydown", function(a) {
a.data.getKeystroke() in {
32:1,
13:1
} && this.fire("click");
}), b.on("focus", function() {
this.fire("mouseover");
}), b.on("blur", function() {
this.fire("mouseout");
});
}
function h(a) {
function b() {
a.layout();
}
var c = CKEDITOR.document.getWindow();
c.on("resize", b), a.on("hide", function() {
c.removeListener("resize", b);
});
}
function f(a, b) {
this._ = {
dialog:a
}, CKEDITOR.tools.extend(this, b);
}
function i(a) {
function b(c) {
var j = a.getSize(), i = CKEDITOR.document.getWindow().getViewPaneSize(), l = c.data.$.screenX, k = c.data.$.screenY, m = l - d.x, p = k - d.y;
d = {
x:l,
y:k
}, e.x = e.x + m, e.y = e.y + p, a.move(e.x + h[3] < f ? -h[3] :e.x - h[1] > i.width - j.width - f ? i.width - j.width + ("rtl" == g.lang.dir ? 0 :h[1]) :e.x, e.y + h[0] < f ? -h[0] :e.y - h[2] > i.height - j.height - f ? i.height - j.height + h[2] :e.y, 1), 
c.data.preventDefault();
}
function c() {
if (CKEDITOR.document.removeListener("mousemove", b), CKEDITOR.document.removeListener("mouseup", c), 
CKEDITOR.env.ie6Compat) {
var a = s.getChild(0).getFrameDocument();
a.removeListener("mousemove", b), a.removeListener("mouseup", c);
}
}
var d = null, e = null;
a.getElement().getFirst();
var g = a.getParentEditor(), f = g.config.dialog_magnetDistance, h = CKEDITOR.skin.margins || [ 0, 0, 0, 0 ];
"undefined" == typeof f && (f = 20), a.parts.title.on("mousedown", function(g) {
if (d = {
x:g.data.$.screenX,
y:g.data.$.screenY
}, CKEDITOR.document.on("mousemove", b), CKEDITOR.document.on("mouseup", c), e = a.getPosition(), 
CKEDITOR.env.ie6Compat) {
var f = s.getChild(0).getFrameDocument();
f.on("mousemove", b), f.on("mouseup", c);
}
g.data.preventDefault();
}, a);
}
function k(a) {
function d(e) {
var m = "rtl" == h.lang.dir, p = k.width, n = k.height, r = p + (e.data.$.screenX - b) * (m ? -1 :1) * (a._.moved ? 1 :2), o = n + (e.data.$.screenY - c) * (a._.moved ? 1 :2), u = a._.element.getFirst(), u = m && u.getComputedStyle("right"), v = a.getPosition();
v.y + o > l.height && (o = l.height - v.y), (m ? u :v.x) + r > l.width && (r = l.width - (m ? u :v.x)), 
(f == CKEDITOR.DIALOG_RESIZE_WIDTH || f == CKEDITOR.DIALOG_RESIZE_BOTH) && (p = Math.max(g.minWidth || 0, r - j)), 
(f == CKEDITOR.DIALOG_RESIZE_HEIGHT || f == CKEDITOR.DIALOG_RESIZE_BOTH) && (n = Math.max(g.minHeight || 0, o - i)), 
a.resize(p, n), a._.moved || a.layout(), e.data.preventDefault();
}
function e() {
if (CKEDITOR.document.removeListener("mouseup", e), CKEDITOR.document.removeListener("mousemove", d), 
m && (m.remove(), m = null), CKEDITOR.env.ie6Compat) {
var a = s.getChild(0).getFrameDocument();
a.removeListener("mouseup", e), a.removeListener("mousemove", d);
}
}
var b, c, g = a.definition, f = g.resizable;
if (f != CKEDITOR.DIALOG_RESIZE_NONE) {
var j, i, l, k, m, h = a.getParentEditor(), p = CKEDITOR.tools.addFunction(function(g) {
k = a.getSize();
var f = a.parts.contents;
f.$.getElementsByTagName("iframe").length && (m = CKEDITOR.dom.element.createFromHtml('<div class="cke_dialog_resize_cover" style="height: 100%; position: absolute; width: 100%;"></div>'), 
f.append(m)), i = k.height - a.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.opera || CKEDITOR.env.ie && CKEDITOR.env.quirks)), 
j = k.width - a.parts.contents.getSize("width", 1), b = g.screenX, c = g.screenY, 
l = CKEDITOR.document.getWindow().getViewPaneSize(), CKEDITOR.document.on("mousemove", d), 
CKEDITOR.document.on("mouseup", e), CKEDITOR.env.ie6Compat && (f = s.getChild(0).getFrameDocument(), 
f.on("mousemove", d), f.on("mouseup", e)), g.preventDefault && g.preventDefault();
});
a.on("load", function() {
var b = "";
f == CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" :f == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical"), 
b = CKEDITOR.dom.element.createFromHtml('<div class="cke_resizer' + b + " cke_resizer_" + h.lang.dir + '" title="' + CKEDITOR.tools.htmlEncode(h.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' + p + ', event )">' + ("ltr" == h.lang.dir ? "\u25e2" :"\u25e3") + "</div>"), 
a.parts.footer.append(b, 1);
}), h.on("destroy", function() {
CKEDITOR.tools.removeFunction(p);
});
}
}
function n(a) {
a.data.preventDefault(1);
}
function o(a) {
var b = CKEDITOR.document.getWindow(), c = a.config, d = c.dialog_backgroundCoverColor || "white", e = c.dialog_backgroundCoverOpacity, g = c.baseFloatZIndex, c = CKEDITOR.tools.genKey(d, e, g), f = t[c];
f ? f.show() :(g = [ '<div tabIndex="-1" style="position: ', CKEDITOR.env.ie6Compat ? "absolute" :"fixed", "; z-index: ", g, "; top: 0px; left: 0px; ", CKEDITOR.env.ie6Compat ? "" :"background-color: " + d, '" class="cke_dialog_background_cover">' ], 
CKEDITOR.env.ie6Compat && (d = "<html><body style=\\'background-color:" + d + ";\\'></body></html>", 
g.push('<iframe hidefocus="true" frameborder="0" id="cke_dialog_background_iframe" src="javascript:'), 
g.push("void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" + d + "' );document.close();") + "})())"), 
g.push('" style="position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0)"></iframe>')), 
g.push("</div>"), f = CKEDITOR.dom.element.createFromHtml(g.join("")), f.setOpacity(void 0 != e ? e :.5), 
f.on("keydown", n), f.on("keypress", n), f.on("keyup", n), f.appendTo(CKEDITOR.document.getBody()), 
t[c] = f), a.focusManager.add(f), s = f;
var a = function() {
var a = b.getViewPaneSize();
f.setStyles({
width:a.width + "px",
height:a.height + "px"
});
}, h = function() {
var a = b.getScrollPosition(), c = CKEDITOR.dialog._.currentTop;
if (f.setStyles({
left:a.x + "px",
top:a.y + "px"
}), c) do a = c.getPosition(), c.move(a.x, a.y); while (c = c._.parentDialog);
};
if (w = a, b.on("resize", a), a(), (!CKEDITOR.env.mac || !CKEDITOR.env.webkit) && f.focus(), 
CKEDITOR.env.ie6Compat) {
var j = function() {
h(), arguments.callee.prevScrollHandler.apply(this, arguments);
};
b.$.setTimeout(function() {
j.prevScrollHandler = window.onscroll || function() {}, window.onscroll = j;
}, 0), h();
}
}
function q(a) {
s && (a.focusManager.remove(s), a = CKEDITOR.document.getWindow(), s.hide(), a.removeListener("resize", w), 
CKEDITOR.env.ie6Compat && a.$.setTimeout(function() {
window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null;
}, 0), w = null);
}
var l = CKEDITOR.tools.cssLength, m = '<div class="cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir="{langDir}" lang="{langCode}" role="dialog" aria-labelledby="cke_dialog_title_{id}"><table class="cke_dialog ' + CKEDITOR.env.cssClass + ' cke_{langDir}" style="position:absolute" role="presentation"><tr><td role="presentation"><div class="cke_dialog_body" role="presentation"><div id="cke_dialog_title_{id}" class="cke_dialog_title" role="presentation"></div><a id="cke_dialog_close_button_{id}" class="cke_dialog_close_button" href="javascript:void(0)" title="{closeTitle}" role="button"><span class="cke_label">X</span></a><div id="cke_dialog_tabs_{id}" class="cke_dialog_tabs" role="tablist"></div><table class="cke_dialog_contents" role="presentation"><tr><td id="cke_dialog_contents_{id}" class="cke_dialog_contents_body" role="presentation"></td></tr><tr><td id="cke_dialog_footer_{id}" class="cke_dialog_footer" role="presentation"></td></tr></table></div></td></tr></table></div>';
CKEDITOR.dialog = function(c, g) {
function f() {
var a = t._.focusList;
a.sort(function(a, b) {
return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex :a.focusIndex - b.focusIndex;
});
for (var b = a.length, c = 0; b > c; c++) a[c].focusIndex = c;
}
function h(a) {
var b = t._.focusList, a = a || 0;
if (!(b.length < 1)) {
var c = t._.currentFocusIndex;
try {
b[c].getInputElement().$.blur();
} catch (d) {}
for (var e = c = (c + a + b.length) % b.length; a && !b[e].isFocusable() && (e = (e + a + b.length) % b.length, 
e != c); ) ;
b[e].focus(), "text" == b[e].type && b[e].select();
}
}
function l(a) {
if (t == CKEDITOR.dialog._.currentTop) {
var b = a.data.getKeystroke(), g = "rtl" == c.lang.dir;
if (q = w = 0, 9 == b || b == CKEDITOR.SHIFT + 9) b = b == CKEDITOR.SHIFT + 9, t._.tabBarMode ? (b = b ? d.call(t) :e.call(t), 
t.selectPage(b), t._.tabs[b][0].focus()) :h(b ? -1 :1), q = 1; else if (b == CKEDITOR.ALT + 121 && !t._.tabBarMode && t.getPageCount() > 1) t._.tabBarMode = !0, 
t._.tabs[t._.currentTabId][0].focus(), q = 1; else if (37 != b && 39 != b || !t._.tabBarMode) if (13 != b && 32 != b || !t._.tabBarMode) if (13 == b) b = a.data.getTarget(), 
b.is("a", "button", "select", "textarea") || b.is("input") && "button" == b.$.type || ((b = this.getButton("ok")) && CKEDITOR.tools.setTimeout(b.click, 0, b), 
q = 1), w = 1; else {
if (27 != b) return;
(b = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(b.click, 0, b) :this.fire("cancel", {
hide:!0
}).hide !== !1 && this.hide(), w = 1;
} else this.selectPage(this._.currentTabId), this._.tabBarMode = !1, this._.currentFocusIndex = -1, 
h(1), q = 1; else b = b == (g ? 39 :37) ? d.call(t) :e.call(t), t.selectPage(b), 
t._.tabs[b][0].focus(), q = 1;
m(a);
}
}
function m(a) {
q ? a.data.preventDefault(1) :w && a.data.stopPropagation();
}
var q, w, p = CKEDITOR.dialog._.dialogDefinitions[g], n = CKEDITOR.tools.clone(r), o = c.config.dialog_buttonsOrder || "OS", u = c.lang.dir, v = {};
if (("OS" == o && CKEDITOR.env.mac || "rtl" == o && "ltr" == u || "ltr" == o && "rtl" == u) && n.buttons.reverse(), 
p = CKEDITOR.tools.extend(p(c), n), p = CKEDITOR.tools.clone(p), p = new A(this, p), 
n = j(c), this._ = {
editor:c,
element:n.element,
name:g,
contentSize:{
width:0,
height:0
},
size:{
width:0,
height:0
},
contents:{},
buttons:{},
accessKeyMap:{},
tabs:{},
tabIdList:[],
currentTabId:null,
currentTabIndex:null,
pageCount:0,
lastTab:null,
tabBarMode:!1,
focusList:[],
currentFocusIndex:0,
hasFocus:!1
}, this.parts = n.parts, CKEDITOR.tools.setTimeout(function() {
c.fire("ariaWidget", this.parts.contents);
}, 0, this), n = {
position:CKEDITOR.env.ie6Compat ? "absolute" :"fixed",
top:0,
visibility:"hidden"
}, n["rtl" == u ? "right" :"left"] = 0, this.parts.dialog.setStyles(n), CKEDITOR.event.call(this), 
this.definition = p = CKEDITOR.fire("dialogDefinition", {
name:g,
definition:p
}, c).definition, !("removeDialogTabs" in c._) && c.config.removeDialogTabs) {
for (n = c.config.removeDialogTabs.split(";"), u = 0; u < n.length; u++) if (o = n[u].split(":"), 
2 == o.length) {
var s = o[0];
v[s] || (v[s] = []), v[s].push(o[1]);
}
c._.removeDialogTabs = v;
}
if (c._.removeDialogTabs && (v = c._.removeDialogTabs[g])) for (u = 0; u < v.length; u++) p.removeContents(v[u]);
p.onLoad && this.on("load", p.onLoad), p.onShow && this.on("show", p.onShow), p.onHide && this.on("hide", p.onHide), 
p.onOk && this.on("ok", function(a) {
c.fire("saveSnapshot"), setTimeout(function() {
c.fire("saveSnapshot");
}, 0), p.onOk.call(this, a) === !1 && (a.data.hide = !1);
}), p.onCancel && this.on("cancel", function(a) {
p.onCancel.call(this, a) === !1 && (a.data.hide = !1);
});
var t = this, y = function(a) {
var d, b = t._.contents, c = !1;
for (d in b) for (var e in b[d]) if (c = a.call(this, b[d][e])) return;
};
this.on("ok", function(b) {
y(function(c) {
if (c.validate) {
var d = c.validate(this), e = "string" == typeof d || d === !1;
return e && (b.data.hide = !1, b.stop()), a.call(c, !e, "string" == typeof d ? d :void 0), 
e;
}
});
}, this, null, 0), this.on("cancel", function(a) {
y(function(b) {
return b.isChanged() ? (c.config.dialog_noConfirmCancel || confirm(c.lang.common.confirmCancel) || (a.data.hide = !1), 
!0) :void 0;
});
}, this, null, 0), this.parts.close.on("click", function(a) {
this.fire("cancel", {
hide:!0
}).hide !== !1 && this.hide(), a.data.preventDefault();
}, this), this.changeFocus = h;
var x = this._.element;
for (c.focusManager.add(x, 1), this.on("show", function() {
x.on("keydown", l, this), (CKEDITOR.env.opera || CKEDITOR.env.gecko) && x.on("keypress", m, this);
}), this.on("hide", function() {
x.removeListener("keydown", l), (CKEDITOR.env.opera || CKEDITOR.env.gecko) && x.removeListener("keypress", m), 
y(function(a) {
b.apply(a);
});
}), this.on("iframeAdded", function(a) {
new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document).on("keydown", l, this, null, 0);
}), this.on("show", function() {
if (f(), c.config.dialog_startupFocusTab && t._.pageCount > 1) t._.tabBarMode = !0, 
t._.tabs[t._.currentTabId][0].focus(); else if (!this._.hasFocus) if (this._.currentFocusIndex = -1, 
p.onFocus) {
var a = p.onFocus.call(this);
a && a.focus();
} else h(1);
}, this, null, 4294967295), CKEDITOR.env.ie6Compat && this.on("load", function() {
var a = this.getElement(), b = a.getFirst();
b.remove(), b.appendTo(a);
}, this), i(this), k(this), new CKEDITOR.dom.text(p.title, CKEDITOR.document).appendTo(this.parts.title), 
u = 0; u < p.contents.length; u++) (v = p.contents[u]) && this.addPage(v);
for (this.parts.tabs.on("click", function(a) {
var b = a.data.getTarget();
b.hasClass("cke_dialog_tab") && (b = b.$.id, this.selectPage(b.substring(4, b.lastIndexOf("_"))), 
this._.tabBarMode && (this._.tabBarMode = !1, this._.currentFocusIndex = -1, h(1)), 
a.data.preventDefault());
}, this), u = [], v = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, {
type:"hbox",
className:"cke_dialog_footer_buttons",
widths:[],
children:p.buttons
}, u).getChild(), this.parts.footer.setHtml(u.join("")), u = 0; u < v.length; u++) this._.buttons[v[u].id] = v[u];
}, CKEDITOR.dialog.prototype = {
destroy:function() {
this.hide(), this._.element.remove();
},
resize:function() {
return function(a, b) {
this._.contentSize && this._.contentSize.width == a && this._.contentSize.height == b || (CKEDITOR.dialog.fire("resize", {
dialog:this,
width:a,
height:b
}, this._.editor), this.fire("resize", {
width:a,
height:b
}, this._.editor), this.parts.contents.setStyles({
width:a + "px",
height:b + "px"
}), "rtl" == this._.editor.lang.dir && this._.position && (this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10)), 
this._.contentSize = {
width:a,
height:b
});
};
}(),
getSize:function() {
var a = this._.element.getFirst();
return {
width:a.$.offsetWidth || 0,
height:a.$.offsetHeight || 0
};
},
move:function(a, b, c) {
var d = this._.element.getFirst(), e = "rtl" == this._.editor.lang.dir, g = "fixed" == d.getComputedStyle("position");
CKEDITOR.env.ie && d.setStyle("zoom", "100%"), g && this._.position && this._.position.x == a && this._.position.y == b || (this._.position = {
x:a,
y:b
}, g || (g = CKEDITOR.document.getWindow().getScrollPosition(), a += g.x, b += g.y), 
e && (g = this.getSize(), a = CKEDITOR.document.getWindow().getViewPaneSize().width - g.width - a), 
b = {
top:(b > 0 ? b :0) + "px"
}, b[e ? "right" :"left"] = (a > 0 ? a :0) + "px", d.setStyles(b), c && (this._.moved = 1));
},
getPosition:function() {
return CKEDITOR.tools.extend({}, this._.position);
},
show:function() {
var a = this._.element, b = this.definition;
if (a.getParent() && a.getParent().equals(CKEDITOR.document.getBody()) ? a.setStyle("display", "block") :a.appendTo(CKEDITOR.document.getBody()), 
CKEDITOR.env.gecko && CKEDITOR.env.version < 10900) {
var c = this.parts.dialog;
c.setStyle("position", "absolute"), setTimeout(function() {
c.setStyle("position", "fixed");
}, 0);
}
this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight), 
this.reset(), this.selectPage(this.definition.contents[0].id), null === CKEDITOR.dialog._.currentZIndex && (CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex), 
this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex = CKEDITOR.dialog._.currentZIndex + 10), 
null === CKEDITOR.dialog._.currentTop ? (CKEDITOR.dialog._.currentTop = this, this._.parentDialog = null, 
o(this._.editor)) :(this._.parentDialog = CKEDITOR.dialog._.currentTop, this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex / 2), 
CKEDITOR.dialog._.currentTop = this), a.on("keydown", y), a.on(CKEDITOR.env.opera ? "keypress" :"keyup", z), 
this._.hasFocus = !1;
for (var d in b.contents) if (b.contents[d]) {
var a = b.contents[d], e = this._.tabs[a.id], g = a.requiredContent, f = 0;
if (e) {
for (var j in this._.contents[a.id]) {
var i = this._.contents[a.id][j];
"hbox" != i.type && "vbox" != i.type && i.getInputElement() && (i.requiredContent && !this._.editor.activeFilter.check(i.requiredContent) ? i.disable() :(i.enable(), 
f++));
}
!f || g && !this._.editor.activeFilter.check(g) ? e[0].addClass("cke_dialog_tab_disabled") :e[0].removeClass("cke_dialog_tab_disabled");
}
}
CKEDITOR.tools.setTimeout(function() {
this.layout(), h(this), this.parts.dialog.setStyle("visibility", ""), this.fireOnce("load", {}), 
CKEDITOR.ui.fire("ready", this), this.fire("show", {}), this._.editor.fire("dialogShow", this), 
this._.parentDialog || this._.editor.focusManager.lock(), this.foreach(function(a) {
a.setInitValue && a.setInitValue();
});
}, 100, this);
},
layout:function() {
var a = this.parts.dialog, b = this.getSize(), c = CKEDITOR.document.getWindow().getViewPaneSize(), d = (c.width - b.width) / 2, e = (c.height - b.height) / 2;
CKEDITOR.env.ie6Compat || (b.height + (e > 0 ? e :0) > c.height || b.width + (d > 0 ? d :0) > c.width ? a.setStyle("position", "absolute") :a.setStyle("position", "fixed")), 
this.move(this._.moved ? this._.position.x :d, this._.moved ? this._.position.y :e);
},
foreach:function(a) {
for (var b in this._.contents) for (var c in this._.contents[b]) a.call(this, this._.contents[b][c]);
return this;
},
reset:function() {
var a = function(a) {
a.reset && a.reset(1);
};
return function() {
return this.foreach(a), this;
};
}(),
setupContent:function() {
var a = arguments;
this.foreach(function(b) {
b.setup && b.setup.apply(b, a);
});
},
commitContent:function() {
var a = arguments;
this.foreach(function(b) {
CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur(), 
b.commit && b.commit.apply(b, a);
});
},
hide:function() {
if (this.parts.dialog.isVisible()) {
this.fire("hide", {}), this._.editor.fire("dialogHide", this), this.selectPage(this._.tabIdList[0]);
var a = this._.element;
for (a.setStyle("display", "none"), this.parts.dialog.setStyle("visibility", "hidden"), 
F(this); CKEDITOR.dialog._.currentTop != this; ) CKEDITOR.dialog._.currentTop.hide();
if (this._.parentDialog) {
var b = this._.parentDialog.getElement().getFirst();
b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2));
} else q(this._.editor);
if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex = CKEDITOR.dialog._.currentZIndex - 10; else {
CKEDITOR.dialog._.currentZIndex = null, a.removeListener("keydown", y), a.removeListener(CKEDITOR.env.opera ? "keypress" :"keyup", z);
var c = this._.editor;
c.focus(), setTimeout(function() {
c.focusManager.unlock();
}, 0);
}
delete this._.parentDialog, this.foreach(function(a) {
a.resetInitValue && a.resetInitValue();
});
}
},
addPage:function(a) {
if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
for (var b = [], c = a.label ? ' title="' + CKEDITOR.tools.htmlEncode(a.label) + '"' :"", d = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, {
type:"vbox",
className:"cke_dialog_page_contents",
children:a.elements,
expand:!!a.expand,
padding:a.padding,
style:a.style || "width: 100%;"
}, b), e = this._.contents[a.id] = {}, g = d.getChild(), f = 0; d = g.shift(); ) !d.notAllowed && "hbox" != d.type && "vbox" != d.type && f++, 
e[d.id] = d, "function" == typeof d.getChild && g.push.apply(g, d.getChild());
f || (a.hidden = !0), b = CKEDITOR.dom.element.createFromHtml(b.join("")), b.setAttribute("role", "tabpanel"), 
d = CKEDITOR.env, e = "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber(), c = CKEDITOR.dom.element.createFromHtml([ '<a class="cke_dialog_tab"', this._.pageCount > 0 ? " cke_last" :"cke_first", c, a.hidden ? ' style="display:none"' :"", ' id="', e, '"', d.gecko && d.version >= 10900 && !d.hc ? "" :' href="javascript:void(0)"', ' tabIndex="-1" hidefocus="true" role="tab">', a.label, "</a>" ].join("")), 
b.setAttribute("aria-labelledby", e), this._.tabs[a.id] = [ c, b ], this._.tabIdList.push(a.id), 
!a.hidden && this._.pageCount++, this._.lastTab = c, this.updateStyle(), b.setAttribute("name", a.id), 
b.appendTo(this.parts.contents), c.unselectable(), this.parts.tabs.append(c), a.accessKey && (B(this, this, "CTRL+" + a.accessKey, D, C), 
this._.accessKeyMap["CTRL+" + a.accessKey] = a.id);
}
},
selectPage:function(a) {
if (this._.currentTabId != a && !this._.tabs[a][0].hasClass("cke_dialog_tab_disabled") && this.fire("selectPage", {
page:a,
currentPage:this._.currentTabId
}) !== !0) {
for (var b in this._.tabs) {
var d = this._.tabs[b][0], e = this._.tabs[b][1];
b != a && (d.removeClass("cke_dialog_tab_selected"), e.hide()), e.setAttribute("aria-hidden", b != a);
}
var g = this._.tabs[a];
g[0].addClass("cke_dialog_tab_selected"), CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat ? (c(g[1]), 
g[1].show(), setTimeout(function() {
c(g[1], 1);
}, 0)) :g[1].show(), this._.currentTabId = a, this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a);
}
},
updateStyle:function() {
this.parts.dialog[(1 === this._.pageCount ? "add" :"remove") + "Class"]("cke_single_page");
},
hidePage:function(a) {
var b = this._.tabs[a] && this._.tabs[a][0];
b && 1 != this._.pageCount && b.isVisible() && (a == this._.currentTabId && this.selectPage(d.call(this)), 
b.hide(), this._.pageCount--, this.updateStyle());
},
showPage:function(a) {
(a = this._.tabs[a] && this._.tabs[a][0]) && (a.show(), this._.pageCount++, this.updateStyle());
},
getElement:function() {
return this._.element;
},
getName:function() {
return this._.name;
},
getContentElement:function(a, b) {
var c = this._.contents[a];
return c && c[b];
},
getValueOf:function(a, b) {
return this.getContentElement(a, b).getValue();
},
setValueOf:function(a, b, c) {
return this.getContentElement(a, b).setValue(c);
},
getButton:function(a) {
return this._.buttons[a];
},
click:function(a) {
return this._.buttons[a].click();
},
disableButton:function(a) {
return this._.buttons[a].disable();
},
enableButton:function(a) {
return this._.buttons[a].enable();
},
getPageCount:function() {
return this._.pageCount;
},
getParentEditor:function() {
return this._.editor;
},
getSelectedElement:function() {
return this.getParentEditor().getSelection().getSelectedElement();
},
addFocusable:function(a, b) {
if ("undefined" == typeof b) b = this._.focusList.length, this._.focusList.push(new g(this, a, b)); else {
this._.focusList.splice(b, 0, new g(this, a, b));
for (var c = b + 1; c < this._.focusList.length; c++) this._.focusList[c].focusIndex++;
}
}
}, CKEDITOR.tools.extend(CKEDITOR.dialog, {
add:function(a, b) {
this._.dialogDefinitions[a] && "function" != typeof b || (this._.dialogDefinitions[a] = b);
},
exists:function(a) {
return !!this._.dialogDefinitions[a];
},
getCurrent:function() {
return CKEDITOR.dialog._.currentTop;
},
isTabEnabled:function(a, b, c) {
return a = a.config.removeDialogTabs, !(a && a.match(RegExp("(?:^|;)" + b + ":" + c + "(?:$|;)", "i")));
},
okButton:function() {
var a = function(a, b) {
return b = b || {}, CKEDITOR.tools.extend({
id:"ok",
type:"button",
label:a.lang.common.ok,
"class":"cke_dialog_ui_button_ok",
onClick:function(a) {
a = a.data.dialog, a.fire("ok", {
hide:!0
}).hide !== !1 && a.hide();
}
}, b, !0);
};
return a.type = "button", a.override = function(b) {
return CKEDITOR.tools.extend(function(c) {
return a(c, b);
}, {
type:"button"
}, !0);
}, a;
}(),
cancelButton:function() {
var a = function(a, b) {
return b = b || {}, CKEDITOR.tools.extend({
id:"cancel",
type:"button",
label:a.lang.common.cancel,
"class":"cke_dialog_ui_button_cancel",
onClick:function(a) {
a = a.data.dialog, a.fire("cancel", {
hide:!0
}).hide !== !1 && a.hide();
}
}, b, !0);
};
return a.type = "button", a.override = function(b) {
return CKEDITOR.tools.extend(function(c) {
return a(c, b);
}, {
type:"button"
}, !0);
}, a;
}(),
addUIElement:function(a, b) {
this._.uiElementBuilders[a] = b;
}
}), CKEDITOR.dialog._ = {
uiElementBuilders:{},
dialogDefinitions:{},
currentTop:null,
currentZIndex:null
}, CKEDITOR.event.implementOn(CKEDITOR.dialog), CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
var r = {
resizable:CKEDITOR.DIALOG_RESIZE_BOTH,
minWidth:600,
minHeight:400,
buttons:[ CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton ]
}, p = function(a, b, c) {
for (var e, d = 0; e = a[d]; d++) {
if (e.id == b) return e;
if (c && e[c] && (e = p(e[c], b, c))) return e;
}
return null;
}, u = function(a, b, c, d, e) {
if (c) {
for (var f, g = 0; f = a[g]; g++) {
if (f.id == c) return a.splice(g, 0, b), b;
if (d && f[d] && (f = u(f[d], b, c, d, !0))) return f;
}
if (e) return null;
}
return a.push(b), b;
}, v = function(a, b, c) {
for (var e, d = 0; e = a[d]; d++) {
if (e.id == b) return a.splice(d, 1);
if (c && e[c] && (e = v(e[c], b, c))) return e;
}
return null;
}, A = function(a, b) {
this.dialog = a;
for (var e, c = b.contents, d = 0; e = c[d]; d++) c[d] = e && new f(a, e);
CKEDITOR.tools.extend(this, b);
};
A.prototype = {
getContents:function(a) {
return p(this.contents, a);
},
getButton:function(a) {
return p(this.buttons, a);
},
addContents:function(a, b) {
return u(this.contents, a, b);
},
addButton:function(a, b) {
return u(this.buttons, a, b);
},
removeContents:function(a) {
v(this.contents, a);
},
removeButton:function(a) {
v(this.buttons, a);
}
}, f.prototype = {
get:function(a) {
return p(this.elements, a, "children");
},
add:function(a, b) {
return u(this.elements, a, b, "children");
},
remove:function(a) {
v(this.elements, a, "children");
}
};
var w, s, t = {}, x = {}, y = function(a) {
var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, d = a.data.$.shiftKey, e = String.fromCharCode(a.data.$.keyCode);
(b = x[(b ? "CTRL+" :"") + (c ? "ALT+" :"") + (d ? "SHIFT+" :"") + e]) && b.length && (b = b[b.length - 1], 
b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key), a.data.preventDefault());
}, z = function(a) {
var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, d = a.data.$.shiftKey, e = String.fromCharCode(a.data.$.keyCode);
(b = x[(b ? "CTRL+" :"") + (c ? "ALT+" :"") + (d ? "SHIFT+" :"") + e]) && b.length && (b = b[b.length - 1], 
b.keyup && (b.keyup.call(b.uiElement, b.dialog, b.key), a.data.preventDefault()));
}, B = function(a, b, c, d, e) {
(x[c] || (x[c] = [])).push({
uiElement:a,
dialog:b,
key:c,
keyup:e || a.accessKeyUp,
keydown:d || a.accessKeyDown
});
}, F = function(a) {
for (var b in x) {
for (var c = x[b], d = c.length - 1; d >= 0; d--) (c[d].dialog == a || c[d].uiElement == a) && c.splice(d, 1);
0 === c.length && delete x[b];
}
}, C = function(a, b) {
a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b]);
}, D = function() {};
!function() {
CKEDITOR.ui.dialog = {
uiElement:function(a, b, c, d, e, g, f) {
if (!(arguments.length < 4)) {
var h = (d.call ? d(b) :d) || "div", j = [ "<", h, " " ], i = (e && e.call ? e(b) :e) || {}, l = (g && g.call ? g(b) :g) || {}, k = (f && f.call ? f.call(this, a, b) :f) || "", p = this.domId = l.id || CKEDITOR.tools.getNextId() + "_uiElement";
this.id = b.id, b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent) && (i.display = "none", 
this.notAllowed = !0), l.id = p;
var m = {};
b.type && (m["cke_dialog_ui_" + b.type] = 1), b.className && (m[b.className] = 1), 
b.disabled && (m.cke_disabled = 1);
for (var n = l["class"] && l["class"].split ? l["class"].split(" ") :[], p = 0; p < n.length; p++) n[p] && (m[n[p]] = 1);
n = [];
for (p in m) n.push(p);
l["class"] = n.join(" "), b.title && (l.title = b.title), m = (b.style || "").split(";"), 
b.align && (n = b.align, i["margin-left"] = "left" == n ? 0 :"auto", i["margin-right"] = "right" == n ? 0 :"auto");
for (p in i) m.push(p + ":" + i[p]);
for (b.hidden && m.push("display:none"), p = m.length - 1; p >= 0; p--) "" === m[p] && m.splice(p, 1);
m.length > 0 && (l.style = (l.style ? l.style + "; " :"") + m.join("; "));
for (p in l) j.push(p + '="' + CKEDITOR.tools.htmlEncode(l[p]) + '" ');
j.push(">", k, "</", h, ">"), c.push(j.join("")), (this._ || (this._ = {})).dialog = a, 
"boolean" == typeof b.isChanged && (this.isChanged = function() {
return b.isChanged;
}), "function" == typeof b.isChanged && (this.isChanged = b.isChanged), "function" == typeof b.setValue && (this.setValue = CKEDITOR.tools.override(this.setValue, function(a) {
return function(c) {
a.call(this, b.setValue.call(this, c));
};
})), "function" == typeof b.getValue && (this.getValue = CKEDITOR.tools.override(this.getValue, function(a) {
return function() {
return b.getValue.call(this, a.call(this));
};
})), CKEDITOR.event.implementOn(this), this.registerEvents(b), this.accessKeyUp && this.accessKeyDown && b.accessKey && B(this, a, "CTRL+" + b.accessKey);
var r = this;
a.on("load", function() {
var b = r.getInputElement();
if (b) {
var c = r.type in {
checkbox:1,
ratio:1
} && CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? "cke_dialog_ui_focused" :"";
b.on("focus", function() {
a._.tabBarMode = !1, a._.hasFocus = !0, r.fire("focus"), c && this.addClass(c);
}), b.on("blur", function() {
r.fire("blur"), c && this.removeClass(c);
});
}
}), CKEDITOR.tools.extend(this, b), this.keyboardFocusable && (this.tabIndex = b.tabIndex || 0, 
this.focusIndex = a._.focusList.push(this) - 1, this.on("focus", function() {
a._.currentFocusIndex = r.focusIndex;
}));
}
},
hbox:function(a, b, c, d, e) {
if (!(arguments.length < 4)) {
this._ || (this._ = {});
var j, g = this._.children = b, f = e && e.widths || null, h = e && e.height || null, i = {
role:"presentation"
};
e && e.align && (i.align = e.align), CKEDITOR.ui.dialog.uiElement.call(this, a, e || {
type:"hbox"
}, d, "table", {}, i, function() {
var a = [ '<tbody><tr class="cke_dialog_ui_hbox">' ];
for (j = 0; j < c.length; j++) {
var b = "cke_dialog_ui_hbox_child", d = [];
0 === j && (b = "cke_dialog_ui_hbox_first"), j == c.length - 1 && (b = "cke_dialog_ui_hbox_last"), 
a.push('<td class="', b, '" role="presentation" '), f ? f[j] && d.push("width:" + l(f[j])) :d.push("width:" + Math.floor(100 / c.length) + "%"), 
h && d.push("height:" + l(h)), e && void 0 != e.padding && d.push("padding:" + l(e.padding)), 
CKEDITOR.env.ie && CKEDITOR.env.quirks && g[j].align && d.push("text-align:" + g[j].align), 
d.length > 0 && a.push('style="' + d.join("; ") + '" '), a.push(">", c[j], "</td>");
}
return a.push("</tr></tbody>"), a.join("");
});
}
},
vbox:function(a, b, c, d, e) {
if (!(arguments.length < 3)) {
this._ || (this._ = {});
var g = this._.children = b, f = e && e.width || null, h = e && e.heights || null;
CKEDITOR.ui.dialog.uiElement.call(this, a, e || {
type:"vbox"
}, d, "div", null, {
role:"presentation"
}, function() {
var b = [ '<table role="presentation" cellspacing="0" border="0" ' ];
b.push('style="'), e && e.expand && b.push("height:100%;"), b.push("width:" + l(f || "100%"), ";"), 
CKEDITOR.env.webkit && b.push("float:none;"), b.push('"'), b.push('align="', CKEDITOR.tools.htmlEncode(e && e.align || ("ltr" == a.getParentEditor().lang.dir ? "left" :"right")), '" '), 
b.push("><tbody>");
for (var d = 0; d < c.length; d++) {
var j = [];
b.push('<tr><td role="presentation" '), f && j.push("width:" + l(f || "100%")), 
h ? j.push("height:" + l(h[d])) :e && e.expand && j.push("height:" + Math.floor(100 / c.length) + "%"), 
e && void 0 != e.padding && j.push("padding:" + l(e.padding)), CKEDITOR.env.ie && CKEDITOR.env.quirks && g[d].align && j.push("text-align:" + g[d].align), 
j.length > 0 && b.push('style="', j.join("; "), '" '), b.push(' class="cke_dialog_ui_vbox_child">', c[d], "</td></tr>");
}
return b.push("</tbody></table>"), b.join("");
});
}
}
};
}(), CKEDITOR.ui.dialog.uiElement.prototype = {
getElement:function() {
return CKEDITOR.document.getById(this.domId);
},
getInputElement:function() {
return this.getElement();
},
getDialog:function() {
return this._.dialog;
},
setValue:function(a, b) {
return this.getInputElement().setValue(a), !b && this.fire("change", {
value:a
}), this;
},
getValue:function() {
return this.getInputElement().getValue();
},
isChanged:function() {
return !1;
},
selectParentTab:function() {
for (var a = this.getInputElement(); (a = a.getParent()) && -1 == a.$.className.search("cke_dialog_page_contents"); ) ;
return a ? (a = a.getAttribute("name"), this._.dialog._.currentTabId != a && this._.dialog.selectPage(a), 
this) :this;
},
focus:function() {
return this.selectParentTab().getInputElement().focus(), this;
},
registerEvents:function(a) {
var c, e, b = /^on([A-Z]\w+)/, d = function(a, b, c, d) {
b.on("load", function() {
a.getInputElement().on(c, d, a);
});
};
for (e in a) (c = e.match(b)) && (this.eventProcessors[e] ? this.eventProcessors[e].call(this, this._.dialog, a[e]) :d(this, this._.dialog, c[1].toLowerCase(), a[e]));
return this;
},
eventProcessors:{
onLoad:function(a, b) {
a.on("load", b, this);
},
onShow:function(a, b) {
a.on("show", b, this);
},
onHide:function(a, b) {
a.on("hide", b, this);
}
},
accessKeyDown:function() {
this.focus();
},
accessKeyUp:function() {},
disable:function() {
var a = this.getElement();
this.getInputElement().setAttribute("disabled", "true"), a.addClass("cke_disabled");
},
enable:function() {
var a = this.getElement();
this.getInputElement().removeAttribute("disabled"), a.removeClass("cke_disabled");
},
isEnabled:function() {
return !this.getElement().hasClass("cke_disabled");
},
isVisible:function() {
return this.getInputElement().isVisible();
},
isFocusable:function() {
return this.isEnabled() && this.isVisible() ? !0 :!1;
}
}, CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(), {
getChild:function(a) {
return arguments.length < 1 ? this._.children.concat() :(a.splice || (a = [ a ]), 
a.length < 2 ? this._.children[a[0]] :this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) :null);
}
}, !0), CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox(), function() {
var a = {
build:function(a, b, c) {
for (var e, d = b.children, g = [], f = [], h = 0; h < d.length && (e = d[h]); h++) {
var j = [];
g.push(j), f.push(CKEDITOR.dialog._.uiElementBuilders[e.type].build(a, e, j));
}
return new CKEDITOR.ui.dialog[b.type](a, f, g, c, b);
}
};
CKEDITOR.dialog.addUIElement("hbox", a), CKEDITOR.dialog.addUIElement("vbox", a);
}(), CKEDITOR.dialogCommand = function(a, b) {
this.dialogName = a, CKEDITOR.tools.extend(this, b, !0);
}, CKEDITOR.dialogCommand.prototype = {
exec:function(a) {
CKEDITOR.env.opera ? CKEDITOR.tools.setTimeout(function() {
a.openDialog(this.dialogName);
}, 0, this) :a.openDialog(this.dialogName);
},
canUndo:!1,
editorFocus:1
}, function() {
var a = /^([a]|[^a])+$/, b = /^\d*$/, c = /^\d*(?:\.\d+)?$/, d = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/, e = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i, g = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;
CKEDITOR.VALIDATE_OR = 1, CKEDITOR.VALIDATE_AND = 2, CKEDITOR.dialog.validate = {
functions:function() {
var a = arguments;
return function() {
var g, b = this && this.getValue ? this.getValue() :a[0], c = void 0, d = CKEDITOR.VALIDATE_AND, e = [];
for (g = 0; g < a.length && "function" == typeof a[g]; g++) e.push(a[g]);
g < a.length && "string" == typeof a[g] && (c = a[g], g++), g < a.length && "number" == typeof a[g] && (d = a[g]);
var f = d == CKEDITOR.VALIDATE_AND ? !0 :!1;
for (g = 0; g < e.length; g++) f = d == CKEDITOR.VALIDATE_AND ? f && e[g](b) :f || e[g](b);
return f ? !0 :c;
};
},
regex:function(a, b) {
return function(c) {
return c = this && this.getValue ? this.getValue() :c, a.test(c) ? !0 :b;
};
},
notEmpty:function(b) {
return this.regex(a, b);
},
integer:function(a) {
return this.regex(b, a);
},
number:function(a) {
return this.regex(c, a);
},
cssLength:function(a) {
return this.functions(function(a) {
return e.test(CKEDITOR.tools.trim(a));
}, a);
},
htmlLength:function(a) {
return this.functions(function(a) {
return d.test(CKEDITOR.tools.trim(a));
}, a);
},
inlineStyle:function(a) {
return this.functions(function(a) {
return g.test(CKEDITOR.tools.trim(a));
}, a);
},
equals:function(a, b) {
return this.functions(function(b) {
return b == a;
}, b);
},
notEqual:function(a, b) {
return this.functions(function(b) {
return b != a;
}, b);
}
}, CKEDITOR.on("instanceDestroyed", function(a) {
if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) {
for (var b; b = CKEDITOR.dialog._.currentTop; ) b.hide();
for (var c in t) t[c].remove();
t = {};
}
var d, a = a.editor._.storedDialogs;
for (d in a) a[d].destroy();
});
}(), CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
openDialog:function(a, b) {
var c = null, d = CKEDITOR.dialog._.dialogDefinitions[a];
if (null === CKEDITOR.dialog._.currentTop && o(this), "function" == typeof d) c = this._.storedDialogs || (this._.storedDialogs = {}), 
c = c[a] || (c[a] = new CKEDITOR.dialog(this, a)), b && b.call(c, c), c.show(); else {
if ("failed" == d) throw q(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.');
"string" == typeof d && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d), function() {
"function" != typeof CKEDITOR.dialog._.dialogDefinitions[a] && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed"), 
this.openDialog(a, b);
}, this, 0, 1);
}
return CKEDITOR.skin.loadPart("dialog"), c;
}
});
}(), CKEDITOR.plugins.add("dialog", {
requires:"dialogui",
init:function(d) {
d.on("doubleclick", function(e) {
e.data.dialog && d.openDialog(e.data.dialog);
}, null, null, 999);
}
}), function() {
CKEDITOR.plugins.add("a11yhelp", {
requires:"dialog",
availableLangs:{
ar:1,
bg:1,
ca:1,
cs:1,
cy:1,
da:1,
de:1,
el:1,
en:1,
eo:1,
es:1,
et:1,
fa:1,
fi:1,
fr:1,
"fr-ca":1,
gl:1,
gu:1,
he:1,
hi:1,
hr:1,
hu:1,
id:1,
it:1,
ja:1,
km:1,
ko:1,
ku:1,
lt:1,
lv:1,
mk:1,
mn:1,
nb:1,
nl:1,
no:1,
pl:1,
pt:1,
"pt-br":1,
ro:1,
ru:1,
si:1,
sk:1,
sl:1,
sq:1,
sr:1,
"sr-latn":1,
sv:1,
th:1,
tr:1,
ug:1,
uk:1,
vi:1,
zh:1,
"zh-cn":1
},
init:function(d) {
var e = this;
d.addCommand("a11yHelp", {
exec:function() {
var c = d.langCode, c = e.availableLangs[c] ? c :e.availableLangs[c.replace(/-.*/, "")] ? c.replace(/-.*/, "") :"en";
CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e.path + "dialogs/lang/" + c + ".js"), function() {
d.lang.a11yhelp = e.langEntries[c], d.openDialog("a11yHelp");
});
},
modes:{
wysiwyg:1,
source:1
},
readOnly:1,
canUndo:!1
}), d.setKeystroke(CKEDITOR.ALT + 48, "a11yHelp"), CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js");
}
});
}(), CKEDITOR.plugins.add("about", {
requires:"dialog",
init:function(d) {
var e = d.addCommand("about", new CKEDITOR.dialogCommand("about"));
e.modes = {
wysiwyg:1,
source:1
}, e.canUndo = !1, e.readOnly = 1, d.ui.addButton && d.ui.addButton("About", {
label:d.lang.about.title,
command:"about",
toolbar:"about"
}), CKEDITOR.dialog.add("about", this.path + "dialogs/about.js");
}
}), CKEDITOR.plugins.add("basicstyles", {
init:function(d) {
var e = 0, c = function(b, c, f, j) {
if (j) {
var j = new CKEDITOR.style(j), k = a[f];
k.unshift(j), d.attachStyleStateChange(j, function(a) {
!d.readOnly && d.getCommand(f).setState(a);
}), d.addCommand(f, new CKEDITOR.styleCommand(j, {
contentForms:k
})), d.ui.addButton && d.ui.addButton(b, {
label:c,
command:f,
toolbar:"basicstyles," + (e += 10)
});
}
}, a = {
bold:[ "strong", "b", [ "span", function(a) {
return a = a.styles["font-weight"], "bold" == a || +a >= 700;
} ] ],
italic:[ "em", "i", [ "span", function(a) {
return "italic" == a.styles["font-style"];
} ] ],
underline:[ "u", [ "span", function(a) {
return "underline" == a.styles["text-decoration"];
} ] ],
strike:[ "s", "strike", [ "span", function(a) {
return "line-through" == a.styles["text-decoration"];
} ] ],
subscript:[ "sub" ],
superscript:[ "sup" ]
}, b = d.config, j = d.lang.basicstyles;
c("Bold", j.bold, "bold", b.coreStyles_bold), c("Italic", j.italic, "italic", b.coreStyles_italic), 
c("Underline", j.underline, "underline", b.coreStyles_underline), c("Strike", j.strike, "strike", b.coreStyles_strike), 
c("Subscript", j.subscript, "subscript", b.coreStyles_subscript), c("Superscript", j.superscript, "superscript", b.coreStyles_superscript), 
d.setKeystroke([ [ CKEDITOR.CTRL + 66, "bold" ], [ CKEDITOR.CTRL + 73, "italic" ], [ CKEDITOR.CTRL + 85, "underline" ] ]);
}
}), CKEDITOR.config.coreStyles_bold = {
element:"strong",
overrides:"b"
}, CKEDITOR.config.coreStyles_italic = {
element:"em",
overrides:"i"
}, CKEDITOR.config.coreStyles_underline = {
element:"u"
}, CKEDITOR.config.coreStyles_strike = {
element:"s",
overrides:"strike"
}, CKEDITOR.config.coreStyles_subscript = {
element:"sub"
}, CKEDITOR.config.coreStyles_superscript = {
element:"sup"
}, function() {
var d = {
exec:function(d) {
var c = d.getCommand("blockquote").state, a = d.getSelection(), b = a && a.getRanges()[0];
if (b) {
var j = a.createBookmarks();
if (CKEDITOR.env.ie) {
var f, g = j[0].startNode, h = j[0].endNode;
if (g && "blockquote" == g.getParent().getName()) for (f = g; f = f.getNext(); ) if (f.type == CKEDITOR.NODE_ELEMENT && f.isBlockBoundary()) {
g.move(f, !0);
break;
}
if (h && "blockquote" == h.getParent().getName()) for (f = h; f = f.getPrevious(); ) if (f.type == CKEDITOR.NODE_ELEMENT && f.isBlockBoundary()) {
h.move(f);
break;
}
}
var i = b.createIterator();
if (i.enlargeBr = d.config.enterMode != CKEDITOR.ENTER_BR, c == CKEDITOR.TRISTATE_OFF) {
for (g = []; c = i.getNextParagraph(); ) g.push(c);
for (g.length < 1 && (c = d.document.createElement(d.config.enterMode == CKEDITOR.ENTER_P ? "p" :"div"), 
h = j.shift(), b.insertNode(c), c.append(new CKEDITOR.dom.text("", d.document)), 
b.moveToBookmark(h), b.selectNodeContents(c), b.collapse(!0), h = b.createBookmark(), 
g.push(c), j.unshift(h)), f = g[0].getParent(), b = [], h = 0; h < g.length; h++) c = g[h], 
f = f.getCommonAncestor(c.getParent());
for (c = {
table:1,
tbody:1,
tr:1,
ol:1,
ul:1
}; c[f.getName()]; ) f = f.getParent();
for (h = null; g.length > 0; ) {
for (c = g.shift(); !c.getParent().equals(f); ) c = c.getParent();
c.equals(h) || b.push(c), h = c;
}
for (;b.length > 0; ) if (c = b.shift(), "blockquote" == c.getName()) {
for (h = new CKEDITOR.dom.documentFragment(d.document); c.getFirst(); ) h.append(c.getFirst().remove()), 
g.push(h.getLast());
h.replace(c);
} else g.push(c);
for (b = d.document.createElement("blockquote"), b.insertBefore(g[0]); g.length > 0; ) c = g.shift(), 
b.append(c);
} else if (c == CKEDITOR.TRISTATE_ON) {
for (h = [], f = {}; c = i.getNextParagraph(); ) {
for (g = b = null; c.getParent(); ) {
if ("blockquote" == c.getParent().getName()) {
b = c.getParent(), g = c;
break;
}
c = c.getParent();
}
b && g && !g.getCustomData("blockquote_moveout") && (h.push(g), CKEDITOR.dom.element.setMarker(f, g, "blockquote_moveout", !0));
}
for (CKEDITOR.dom.element.clearAllMarkers(f), c = [], g = [], f = {}; h.length > 0; ) i = h.shift(), 
b = i.getParent(), i.getPrevious() ? i.getNext() ? (i.breakParent(i.getParent()), 
g.push(i.getNext())) :i.remove().insertAfter(b) :i.remove().insertBefore(b), b.getCustomData("blockquote_processed") || (g.push(b), 
CKEDITOR.dom.element.setMarker(f, b, "blockquote_processed", !0)), c.push(i);
for (CKEDITOR.dom.element.clearAllMarkers(f), h = g.length - 1; h >= 0; h--) {
b = g[h];
a:{
f = b;
for (var i = 0, k = f.getChildCount(), n = void 0; k > i && (n = f.getChild(i)); i++) if (n.type == CKEDITOR.NODE_ELEMENT && n.isBlockBoundary()) {
f = !1;
break a;
}
f = !0;
}
f && b.remove();
}
if (d.config.enterMode == CKEDITOR.ENTER_BR) for (b = !0; c.length; ) if (i = c.shift(), 
"div" == i.getName()) {
for (h = new CKEDITOR.dom.documentFragment(d.document), b && i.getPrevious() && !(i.getPrevious().type == CKEDITOR.NODE_ELEMENT && i.getPrevious().isBlockBoundary()) && h.append(d.document.createElement("br")), 
b = i.getNext() && !(i.getNext().type == CKEDITOR.NODE_ELEMENT && i.getNext().isBlockBoundary()); i.getFirst(); ) i.getFirst().remove().appendTo(h);
b && h.append(d.document.createElement("br")), h.replace(i), b = !1;
}
}
a.selectBookmarks(j), d.focus();
}
},
refresh:function(d, c) {
this.setState(d.elementPath(c.block || c.blockLimit).contains("blockquote", 1) ? CKEDITOR.TRISTATE_ON :CKEDITOR.TRISTATE_OFF);
},
context:"blockquote",
allowedContent:"blockquote",
requiredContent:"blockquote"
};
CKEDITOR.plugins.add("blockquote", {
init:function(e) {
e.blockless || (e.addCommand("blockquote", d), e.ui.addButton && e.ui.addButton("Blockquote", {
label:e.lang.blockquote.toolbar,
command:"blockquote",
toolbar:"blocks,10"
}));
}
});
}(), function() {
function d(a) {
function b() {
var c = a.editable();
c.on(x, function(a) {
(!CKEDITOR.env.ie || !w) && u(a);
}), CKEDITOR.env.ie && c.on("paste", function(b) {
t || (e(), b.data.preventDefault(), u(b), o("paste") || a.openDialog("paste"));
}), CKEDITOR.env.ie && (c.on("contextmenu", j, null, null, 0), c.on("beforepaste", function(a) {
a.data && !a.data.$.ctrlKey && j();
}, null, null, 0)), c.on("beforecut", function() {
!w && l(a);
});
var d;
c.attachListener(CKEDITOR.env.ie ? c :a.document.getDocumentElement(), "mouseup", function() {
d = setTimeout(function() {
v();
}, 0);
}), a.on("destroy", function() {
clearTimeout(d);
}), c.on("keyup", v);
}
function c(b) {
return {
type:b,
canUndo:"cut" == b,
startDisabled:!0,
exec:function() {
"cut" == this.type && l();
var b, c = this.type;
if (CKEDITOR.env.ie) b = o(c); else try {
b = a.document.$.execCommand(c, !1, null);
} catch (d) {
b = !1;
}
return b || alert(a.lang.clipboard[this.type + "Error"]), b;
}
};
}
function d() {
return {
canUndo:!1,
async:!0,
exec:function(a, b) {
var c = function(b, c) {
b && q(b.type, b.dataValue, !!c), a.fire("afterCommandExec", {
name:"paste",
command:d,
returnValue:!!b
});
}, d = this;
"string" == typeof b ? c({
type:"auto",
dataValue:b
}, 1) :a.getClipboardData(c);
}
};
}
function e() {
t = 1, setTimeout(function() {
t = 0;
}, 100);
}
function j() {
w = 1, setTimeout(function() {
w = 0;
}, 10);
}
function o(b) {
var c = a.document, d = c.getBody(), e = !1, f = function() {
e = !0;
};
return d.on(b, f), (CKEDITOR.env.version > 7 ? c.$ :c.$.selection.createRange()).execCommand(b), 
d.removeListener(b, f), e;
}
function q(b, c, d) {
return b = {
type:b
}, d && !a.fire("beforePaste", b) || !c ? !1 :(b.dataValue = c, a.fire("paste", b));
}
function l() {
if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
var c, d, e, b = a.getSelection();
b.getType() == CKEDITOR.SELECTION_ELEMENT && (c = b.getSelectedElement()) && (d = b.getRanges()[0], 
e = a.document.createText(""), e.insertBefore(c), d.setStartBefore(e), d.setEndAfter(c), 
b.selectRanges([ d ]), setTimeout(function() {
c.getParent() && (e.remove(), b.selectElement(c));
}, 0));
}
}
function m(b, c) {
var j, d = a.document, e = a.editable(), f = function(a) {
a.cancel();
}, h = CKEDITOR.env.gecko && CKEDITOR.env.version <= 10902;
if (!d.getById("cke_pastebin")) {
var i = a.getSelection(), l = i.createBookmarks(), k = new CKEDITOR.dom.element(!CKEDITOR.env.webkit && !e.is("body") || CKEDITOR.env.ie || CKEDITOR.env.opera ? "div" :"body", d);
k.setAttributes({
id:"cke_pastebin",
"data-cke-temp":"1"
}), CKEDITOR.env.opera && k.appendBogus();
var p = 0, d = d.getWindow();
h ? (k.insertAfter(l[0].startNode), k.setStyle("display", "inline")) :(CKEDITOR.env.webkit ? (e.append(k), 
k.addClass("cke_editable"), e.is("body") || (h = "static" != e.getComputedStyle("position") ? e :CKEDITOR.dom.element.get(e.$.offsetParent), 
p = h.getDocumentPosition().y)) :e.getAscendant(CKEDITOR.env.ie || CKEDITOR.env.opera ? "body" :"html", 1).append(k), 
k.setStyles({
position:"absolute",
top:d.getScrollPosition().y - p + 10 + "px",
width:"1px",
height:Math.max(1, d.getViewPaneSize().height - 20) + "px",
overflow:"hidden",
margin:0,
padding:0
})), (h = k.getParent().isReadOnly()) ? (k.setOpacity(0), k.setAttribute("contenteditable", !0)) :k.setStyle("ltr" == a.config.contentsLangDirection ? "left" :"right", "-1000px"), 
a.on("selectionChange", f, null, null, 0), (CKEDITOR.env.webkit || CKEDITOR.env.gecko) && (j = e.once("blur", f, null, null, -100)), 
h && k.focus(), h = new CKEDITOR.dom.range(k), h.selectNodeContents(k);
var m = h.select();
CKEDITOR.env.ie && (j = e.once("blur", function() {
a.lockSelection(m);
}));
var n = CKEDITOR.document.getWindow().getScrollPosition().y;
setTimeout(function() {
(CKEDITOR.env.webkit || CKEDITOR.env.opera) && (CKEDITOR.document[CKEDITOR.env.webkit ? "getBody" :"getDocumentElement"]().$.scrollTop = n), 
j && j.removeListener(), CKEDITOR.env.ie && e.focus(), i.selectBookmarks(l), k.remove();
var b;
CKEDITOR.env.webkit && (b = k.getFirst()) && b.is && b.hasClass("Apple-style-span") && (k = b), 
a.removeListener("selectionChange", f), c(k.getHtml());
}, 0);
}
}
function r() {
if (CKEDITOR.env.ie) {
a.focus(), e();
var b = a.focusManager;
if (b.lock(), a.editable().fire(x) && !o("paste")) return b.unlock(), !1;
b.unlock();
} else try {
if (a.editable().fire(x) && !a.document.$.execCommand("Paste", !1, null)) throw 0;
} catch (c) {
return !1;
}
return !0;
}
function p(b) {
if ("wysiwyg" == a.mode) switch (b.data.keyCode) {
case CKEDITOR.CTRL + 86:
case CKEDITOR.SHIFT + 45:
b = a.editable(), e(), !CKEDITOR.env.ie && b.fire("beforepaste"), (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.version < 10900) && b.fire("paste");
break;

case CKEDITOR.CTRL + 88:
case CKEDITOR.SHIFT + 46:
a.fire("saveSnapshot"), setTimeout(function() {
a.fire("saveSnapshot");
}, 50);
}
}
function u(b) {
var c = {
type:"auto"
}, d = a.fire("beforePaste", c);
m(b, function(a) {
a = a.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/gi, ""), d && q(c.type, a, 0, 1);
});
}
function v() {
if ("wysiwyg" == a.mode) {
var b = A("paste");
a.getCommand("cut").setState(A("cut")), a.getCommand("copy").setState(A("copy")), 
a.getCommand("paste").setState(b), a.fire("pasteState", b);
}
}
function A(b) {
if (s && b in {
paste:1,
cut:1
}) return CKEDITOR.TRISTATE_DISABLED;
if ("paste" == b) return CKEDITOR.TRISTATE_OFF;
var b = a.getSelection(), c = b.getRanges();
return b.getType() == CKEDITOR.SELECTION_NONE || 1 == c.length && c[0].collapsed ? CKEDITOR.TRISTATE_DISABLED :CKEDITOR.TRISTATE_OFF;
}
var w = 0, t = 0, s = 0, x = CKEDITOR.env.ie ? "beforepaste" :"paste";
!function() {
a.on("key", p), a.on("contentDom", b), a.on("selectionChange", function(a) {
s = a.data.selection.getRanges()[0].checkReadOnly(), v();
}), a.contextMenu && a.contextMenu.addListener(function(a, b) {
return s = b.getRanges()[0].checkReadOnly(), {
cut:A("cut"),
copy:A("copy"),
paste:A("paste")
};
});
}(), function() {
function b(c, d, e, f, h) {
var j = a.lang.clipboard[d];
a.addCommand(d, e), a.ui.addButton && a.ui.addButton(c, {
label:j,
command:d,
toolbar:"clipboard," + f
}), a.addMenuItems && a.addMenuItem(d, {
label:j,
command:d,
group:"clipboard",
order:h
});
}
b("Cut", "cut", c("cut"), 10, 1), b("Copy", "copy", c("copy"), 20, 4), b("Paste", "paste", d(), 30, 8);
}(), a.getClipboardData = function(b, c) {
function d(a) {
a.removeListener(), a.cancel(), c(a.data);
}
function e(a) {
a.removeListener(), a.cancel(), i = !0, c({
type:j,
dataValue:a.data
});
}
function f() {
this.customTitle = b && b.title;
}
var h = !1, j = "auto", i = !1;
c || (c = b, b = null), a.on("paste", d, null, null, 0), a.on("beforePaste", function(a) {
a.removeListener(), h = !0, j = a.data.type;
}, null, null, 1e3), r() === !1 && (a.removeListener("paste", d), h && a.fire("pasteDialog", f) ? (a.on("pasteDialogCommit", e), 
a.on("dialogHide", function(a) {
a.removeListener(), a.data.removeListener("pasteDialogCommit", e), setTimeout(function() {
i || c(null);
}, 10);
})) :c(null));
};
}
function e(a) {
if (CKEDITOR.env.webkit) {
if (!a.match(/^[^<]*$/g) && !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html";
} else if (CKEDITOR.env.ie) {
if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi) && !a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html";
} else {
if (!CKEDITOR.env.gecko && !CKEDITOR.env.opera) return "html";
if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html";
}
return "htmlifiedtext";
}
function c(a, b) {
function c(a) {
return CKEDITOR.tools.repeat("</p><p>", ~~(a / 2)) + (a % 2 == 1 ? "<br>" :"");
}
return b = b.replace(/\s+/g, " ").replace(/> +</g, "><").replace(/<br ?\/>/gi, "<br>"), 
b = b.replace(/<\/?[A-Z]+>/g, function(a) {
return a.toLowerCase();
}), b.match(/^[^<]$/) ? b :(CKEDITOR.env.webkit && b.indexOf("<div>") > -1 && (b = b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "<br>").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "<div></div>"), 
b.match(/<div>(<br>|)<\/div>/) && (b = "<p>" + b.replace(/(<div>(<br>|)<\/div>)+/g, function(a) {
return c(a.split("</div><div>").length + 1);
}) + "</p>"), b = b.replace(/<\/div><div>/g, "<br>"), b = b.replace(/<\/?div>/g, "")), 
(CKEDITOR.env.gecko || CKEDITOR.env.opera) && a.enterMode != CKEDITOR.ENTER_BR && (CKEDITOR.env.gecko && (b = b.replace(/^<br><br>$/, "<br>")), 
b.indexOf("<br><br>") > -1 && (b = "<p>" + b.replace(/(<br>){2,}/g, function(a) {
return c(a.length / 4);
}) + "</p>")), j(a, b));
}
function a() {
var a = new CKEDITOR.htmlParser.filter(), b = {
blockquote:1,
dl:1,
fieldset:1,
h1:1,
h2:1,
h3:1,
h4:1,
h5:1,
h6:1,
ol:1,
p:1,
table:1,
ul:1
}, c = CKEDITOR.tools.extend({
br:0
}, CKEDITOR.dtd.$inline), d = {
p:1,
br:1,
"cke:br":1
}, e = CKEDITOR.dtd, j = CKEDITOR.tools.extend({
area:1,
basefont:1,
embed:1,
iframe:1,
map:1,
object:1,
param:1
}, CKEDITOR.dtd.$nonBodyContent, CKEDITOR.dtd.$cdata), o = function(a) {
delete a.name, a.add(new CKEDITOR.htmlParser.text(" "));
}, q = function(a) {
for (var c, b = a; (b = b.next) && b.name && b.name.match(/^h\d$/); ) for (c = new CKEDITOR.htmlParser.element("cke:br"), 
c.isEmpty = !0, a.add(c); c = b.children.shift(); ) a.add(c);
};
return a.addRules({
elements:{
h1:q,
h2:q,
h3:q,
h4:q,
h5:q,
h6:q,
img:function(a) {
var a = CKEDITOR.tools.trim(a.attributes.alt || ""), b = " ";
return a && !a.match(/(^http|\.(jpe?g|gif|png))/i) && (b = " [" + a + "] "), new CKEDITOR.htmlParser.text(b);
},
td:o,
th:o,
$:function(a) {
var r, g = a.name;
if (j[g]) return !1;
if (a.attributes = {}, "br" == g) return a;
if (b[g]) a.name = "p"; else if (c[g]) delete a.name; else if (e[g]) {
if (r = new CKEDITOR.htmlParser.element("cke:br"), r.isEmpty = !0, CKEDITOR.dtd.$empty[g]) return r;
a.add(r, 0), r = r.clone(), r.isEmpty = !0, a.add(r), delete a.name;
}
return d[a.name] || delete a.name, a;
}
}
}, {
applyToAll:!0
}), a;
}
function b(a, b, c) {
var b = new CKEDITOR.htmlParser.fragment.fromHtml(b), d = new CKEDITOR.htmlParser.basicWriter();
b.writeHtml(d, c);
var b = d.getHtml(), b = b.replace(/\s*(<\/?[a-z:]+ ?\/?>)\s*/g, "$1").replace(/(<cke:br \/>){2,}/g, "<cke:br />").replace(/(<cke:br \/>)(<\/?p>|<br \/>)/g, "$2").replace(/(<\/?p>|<br \/>)(<cke:br \/>)/g, "$1").replace(/<(cke:)?br( \/)?>/g, "<br>").replace(/<p><\/p>/g, ""), e = 0, b = b.replace(/<\/?p>/g, function(a) {
if ("<p>" == a) {
if (++e > 1) return "</p><p>";
} else if (--e > 0) return "</p><p>";
return a;
}).replace(/<p><\/p>/g, "");
return j(a, b);
}
function j(a, b) {
return a.enterMode == CKEDITOR.ENTER_BR ? b = b.replace(/(<\/p><p>)+/g, function(a) {
return CKEDITOR.tools.repeat("<br>", a.length / 7 * 2);
}).replace(/<\/?p>/g, "") :a.enterMode == CKEDITOR.ENTER_DIV && (b = b.replace(/<(\/)?p>/g, "<$1div>")), 
b;
}
CKEDITOR.plugins.add("clipboard", {
requires:"dialog",
init:function(g) {
var h;
d(g), CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path + "dialogs/paste.js")), 
g.on("paste", function(a) {
var b = a.data.dataValue, c = CKEDITOR.dtd.$block;
if (b.indexOf("Apple-") > -1 && (b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " "), 
"html" != a.data.type && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function(a, b) {
return b.replace(/\t/g, "&nbsp;&nbsp; &nbsp;");
})), b.indexOf('<br class="Apple-interchange-newline">') > -1 && (a.data.startsWithEOL = 1, 
a.data.preSniffing = "html", b = b.replace(/<br class="Apple-interchange-newline">/, "")), 
b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1")), b.match(/^<[^<]+cke_(editable|contents)/i)) {
var d, e, g = new CKEDITOR.dom.element("div");
for (g.setHtml(b); 1 == g.getChildCount() && (d = g.getFirst()) && d.type == CKEDITOR.NODE_ELEMENT && (d.hasClass("cke_editable") || d.hasClass("cke_contents")); ) g = e = d;
e && (b = e.getHtml().replace(/<br>$/i, ""));
}
CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function(b, d) {
return d.toLowerCase() in c ? (a.data.preSniffing = "html", "<" + d) :b;
}) :CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function(b, d) {
return d in c ? (a.data.endsWithEOL = 1, "</" + d + ">") :b;
}) :CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1")), a.data.dataValue = b;
}, null, null, 3), g.on("paste", function(d) {
var n, d = d.data, j = d.type, k = d.dataValue, o = g.config.clipboard_defaultContentType || "html";
n = "html" == j || "html" == d.preSniffing ? "html" :e(k), "htmlifiedtext" == n ? k = c(g.config, k) :"text" == j && "html" == n && (k = b(g.config, k, h || (h = a(g)))), 
d.startsWithEOL && (k = '<br data-cke-eol="1">' + k), d.endsWithEOL && (k += '<br data-cke-eol="1">'), 
"auto" == j && (j = "html" == n || "html" == o ? "html" :"text"), d.type = j, d.dataValue = k, 
delete d.preSniffing, delete d.startsWithEOL, delete d.endsWithEOL;
}, null, null, 6), g.on("paste", function(a) {
a = a.data, g.insertHtml(a.dataValue, a.type), setTimeout(function() {
g.fire("afterPaste");
}, 0);
}, null, null, 1e3), g.on("pasteDialog", function(a) {
setTimeout(function() {
g.openDialog("paste", a.data);
}, 0);
});
}
});
}(), function() {
CKEDITOR.plugins.add("panel", {
beforeInit:function(a) {
a.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler);
}
}), CKEDITOR.UI_PANEL = "panel", CKEDITOR.ui.panel = function(a, b) {
b && CKEDITOR.tools.extend(this, b), CKEDITOR.tools.extend(this, {
className:"",
css:[]
}), this.id = CKEDITOR.tools.getNextId(), this.document = a, this.isFramed = this.forceIFrame || this.css.length, 
this._ = {
blocks:{}
};
}, CKEDITOR.ui.panel.handler = {
create:function(a) {
return new CKEDITOR.ui.panel(a);
}
};
var d = CKEDITOR.addTemplate("panel", '<div lang="{langCode}" id="{id}" dir={dir} class="cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style="z-index:{z-index}" role="presentation">{frame}</div>'), e = CKEDITOR.addTemplate("panel-frame", '<iframe id="{id}" class="cke_panel_frame" role="presentation" frameborder="0" src="{src}"></iframe>'), c = CKEDITOR.addTemplate("panel-frame-inner", '<!DOCTYPE html><html class="cke_panel_container {env}" dir="{dir}" lang="{langCode}"><head>{css}</head><body class="cke_{dir}" style="margin:0;padding:0" onload="{onload}"></body></html>');
CKEDITOR.ui.panel.prototype = {
render:function(a, b) {
this.getHolderElement = function() {
var a = this._.holder;
if (!a) {
if (this.isFramed) {
var a = this.document.getById(this.id + "_frame"), b = a.getParent(), a = a.getFrameDocument();
CKEDITOR.env.iOS && b.setStyles({
overflow:"scroll",
"-webkit-overflow-scrolling":"touch"
}), b = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function() {
this.isLoaded = !0, this.onLoad && this.onLoad();
}, this)), a.write(c.output(CKEDITOR.tools.extend({
css:CKEDITOR.tools.buildStyleHtml(this.css),
onload:"window.parent.CKEDITOR.tools.callFunction(" + b + ");"
}, j))), a.getWindow().$.CKEDITOR = CKEDITOR, a.on("key" + (CKEDITOR.env.opera ? "press" :"down"), function(a) {
var b = a.data.getKeystroke(), c = this.document.getById(this.id).getAttribute("dir");
this._.onKeyDown && this._.onKeyDown(b) === !1 ? a.data.preventDefault() :(27 == b || b == ("rtl" == c ? 39 :37)) && this.onEscape && this.onEscape(b) === !1 && a.data.preventDefault();
}, this), a = a.getBody(), a.unselectable(), CKEDITOR.env.air && CKEDITOR.tools.callFunction(b);
} else a = this.document.getById(this.id);
this._.holder = a;
}
return a;
};
var j = {
editorId:a.id,
id:this.id,
langCode:a.langCode,
dir:a.lang.dir,
cls:this.className,
frame:"",
env:CKEDITOR.env.cssClass,
"z-index":a.config.baseFloatZIndex + 1
};
if (this.isFramed) {
var g = CKEDITOR.env.air ? "javascript:void(0)" :CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())" :"";
j.frame = e.output({
id:this.id + "_frame",
src:g
});
}
return g = d.output(j), b && b.push(g), g;
},
addBlock:function(a, b) {
return b = this._.blocks[a] = b instanceof CKEDITOR.ui.panel.block ? b :new CKEDITOR.ui.panel.block(this.getHolderElement(), b), 
this._.currentBlock || this.showBlock(a), b;
},
getBlock:function(a) {
return this._.blocks[a];
},
showBlock:function(a) {
var a = this._.blocks[a], b = this._.currentBlock, c = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder :this.document.getById(this.id + "_frame");
return b && b.hide(), this._.currentBlock = a, CKEDITOR.fire("ariaWidget", c), a._.focusIndex = -1, 
this._.onKeyDown = a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown, a), a.show(), 
a;
},
destroy:function() {
this.element && this.element.remove();
}
}, CKEDITOR.ui.panel.block = CKEDITOR.tools.createClass({
$:function(a, b) {
this.element = a.append(a.getDocument().createElement("div", {
attributes:{
tabindex:-1,
"class":"cke_panel_block"
},
styles:{
display:"none"
}
})), b && CKEDITOR.tools.extend(this, b), this.element.setAttributes({
role:this.attributes.role || "presentation",
"aria-label":this.attributes["aria-label"],
title:this.attributes.title || this.attributes["aria-label"]
}), this.keys = {}, this._.focusIndex = -1, this.element.disableContextMenu();
},
_:{
markItem:function(a) {
-1 != a && (a = this.element.getElementsByTag("a").getItem(this._.focusIndex = a), 
(CKEDITOR.env.webkit || CKEDITOR.env.opera) && a.getDocument().getWindow().focus(), 
a.focus(), this.onMark && this.onMark(a));
}
},
proto:{
show:function() {
this.element.setStyle("display", "");
},
hide:function() {
(!this.onHide || this.onHide.call(this) !== !0) && this.element.setStyle("display", "none");
},
onKeyDown:function(a, b) {
var c = this.keys[a];
switch (c) {
case "next":
for (var e, d = this._.focusIndex, c = this.element.getElementsByTag("a"); e = c.getItem(++d); ) if (e.getAttribute("_cke_focus") && e.$.offsetWidth) {
this._.focusIndex = d, e.focus();
break;
}
return e || b ? !1 :(this._.focusIndex = -1, this.onKeyDown(a, 1));

case "prev":
for (d = this._.focusIndex, c = this.element.getElementsByTag("a"); d > 0 && (e = c.getItem(--d)); ) {
if (e.getAttribute("_cke_focus") && e.$.offsetWidth) {
this._.focusIndex = d, e.focus();
break;
}
e = null;
}
return e || b ? !1 :(this._.focusIndex = c.count(), this.onKeyDown(a, 1));

case "click":
case "mouseup":
return d = this._.focusIndex, (e = d >= 0 && this.element.getElementsByTag("a").getItem(d)) && (e.$[c] ? e.$[c]() :e.$["on" + c]()), 
!1;
}
return !0;
}
}
});
}(), CKEDITOR.plugins.add("floatpanel", {
requires:"panel"
}), function() {
function d(c, a, b, d, g) {
var g = CKEDITOR.tools.genKey(a.getUniqueId(), b.getUniqueId(), c.lang.dir, c.uiColor || "", d.css || "", g || ""), h = e[g];
return h || (h = e[g] = new CKEDITOR.ui.panel(a, d), h.element = b.append(CKEDITOR.dom.element.createFromHtml(h.render(c), a)), 
h.element.setStyles({
display:"none",
position:"absolute"
})), h;
}
var e = {};
CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
$:function(c, a, b, e) {
function g() {
k.hide();
}
b.forceIFrame = 1, b.toolbarRelated && c.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (a = CKEDITOR.document.getById("cke_" + c.name));
var h = a.getDocument(), e = d(c, h, a, b, e || 0), f = e.element, i = f.getFirst(), k = this;
f.disableContextMenu(), this.element = f, this._ = {
editor:c,
panel:e,
parentElement:a,
definition:b,
document:h,
iframe:i,
children:[],
dir:c.lang.dir
}, c.on("mode", g), c.on("resize", g), h.getWindow().on("resize", g);
},
proto:{
addBlock:function(c, a) {
return this._.panel.addBlock(c, a);
},
addListBlock:function(c, a) {
return this._.panel.addListBlock(c, a);
},
getBlock:function(c) {
return this._.panel.getBlock(c);
},
showBlock:function(c, a, b, d, e, h) {
var f = this._.panel, i = f.showBlock(c);
this.allowBlur(!1), c = this._.editor.editable(), this._.returnFocus = c.hasFocus ? c :new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement);
var k = this.element, c = this._.iframe, c = CKEDITOR.env.ie ? c :new CKEDITOR.dom.window(c.$.contentWindow), n = k.getDocument(), o = this._.parentElement.getPositionedAncestor(), q = a.getDocumentPosition(n), n = o ? o.getDocumentPosition(n) :{
x:0,
y:0
}, l = "rtl" == this._.dir, m = q.x + (d || 0) - n.x, r = q.y + (e || 0) - n.y;
!l || 1 != b && 4 != b ? l || 2 != b && 3 != b || (m += a.$.offsetWidth - 1) :m += a.$.offsetWidth, 
(3 == b || 4 == b) && (r += a.$.offsetHeight - 1), this._.panel._.offsetParentId = a.getId(), 
k.setStyles({
top:r + "px",
left:0,
display:""
}), k.setOpacity(0), k.getFirst().removeStyle("width"), this._.editor.focusManager.add(c), 
this._.blurSet || (CKEDITOR.event.useCapture = !0, c.on("blur", function(a) {
this.allowBlur() && a.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET && this.visible && !this._.activeChild && (delete this._.returnFocus, 
this.hide());
}, this), c.on("focus", function() {
this._.focused = !0, this.hideChild(), this.allowBlur(!0);
}, this), CKEDITOR.event.useCapture = !1, this._.blurSet = 1), f.onEscape = CKEDITOR.tools.bind(function(a) {
return this.onEscape && this.onEscape(a) === !1 ? !1 :void 0;
}, this), CKEDITOR.tools.setTimeout(function() {
var a = CKEDITOR.tools.bind(function() {
if (k.removeStyle("width"), i.autoSize) {
var a = i.element.getDocument(), a = (CKEDITOR.env.webkit ? i.element :a.getBody()).$.scrollWidth;
CKEDITOR.env.ie && CKEDITOR.env.quirks && a > 0 && (a += (k.$.offsetWidth || 0) - (k.$.clientWidth || 0) + 3), 
k.setStyle("width", a + 10 + "px"), a = i.element.$.scrollHeight, CKEDITOR.env.ie && CKEDITOR.env.quirks && a > 0 && (a += (k.$.offsetHeight || 0) - (k.$.clientHeight || 0) + 3), 
k.setStyle("height", a + "px"), f._.currentBlock.element.setStyle("display", "none").removeStyle("display");
} else k.removeStyle("height");
l && (m -= k.$.offsetWidth), k.setStyle("left", m + "px");
var b = f.element.getWindow(), a = k.$.getBoundingClientRect(), b = b.getViewPaneSize(), c = a.width || a.right - a.left, d = a.height || a.bottom - a.top, e = l ? a.right :b.width - a.left, g = l ? b.width - a.right :a.left;
l ? c > e && (m = g > c ? m + c :b.width > c ? m - a.left :m - a.right + b.width) :c > e && (m = g > c ? m - c :b.width > c ? m - a.right + b.width :m - a.left), 
c = a.top, b.height - a.top < d && (r = c > d ? r - d :b.height > d ? r - a.bottom + b.height :r - a.top), 
CKEDITOR.env.ie && (b = a = new CKEDITOR.dom.element(k.$.offsetParent), "html" == b.getName() && (b = b.getDocument().getBody()), 
"rtl" == b.getComputedStyle("direction") && (m = CKEDITOR.env.ie8Compat ? m - 2 * k.getDocument().getDocumentElement().$.scrollLeft :m - (a.$.scrollWidth - a.$.clientWidth)));
var j, a = k.getFirst();
(j = a.getCustomData("activePanel")) && j.onHide && j.onHide.call(this, 1), a.setCustomData("activePanel", this), 
k.setStyles({
top:r + "px",
left:m + "px"
}), k.setOpacity(1), h && h();
}, this);
f.isLoaded ? a() :f.onLoad = a, CKEDITOR.tools.setTimeout(function() {
var a = CKEDITOR.env.webkit && CKEDITOR.document.getWindow().getScrollPosition().y;
this.focus(), i.element.focus(), CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = a), 
this.allowBlur(!0), this._.editor.fire("panelShow", this);
}, 0, this);
}, CKEDITOR.env.air ? 200 :0, this), this.visible = 1, this.onShow && this.onShow.call(this);
},
focus:function() {
if (CKEDITOR.env.webkit) {
var c = CKEDITOR.document.getActive();
!c.equals(this._.iframe) && c.$.blur();
}
(this._.lastFocused || this._.iframe.getFrameDocument().getWindow()).focus();
},
blur:function() {
var c = this._.iframe.getFrameDocument().getActive();
c.is("a") && (this._.lastFocused = c);
},
hide:function(c) {
!this.visible || this.onHide && this.onHide.call(this) === !0 || (this.hideChild(), 
CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur(), this.element.setStyle("display", "none"), 
this.visible = 0, this.element.getFirst().removeCustomData("activePanel"), (c = c && this._.returnFocus) && (CKEDITOR.env.webkit && c.type && c.getWindow().$.focus(), 
c.focus()), delete this._.lastFocused, this._.editor.fire("panelHide", this));
},
allowBlur:function(c) {
var a = this._.panel;
return void 0 != c && (a.allowBlur = c), a.allowBlur;
},
showAsChild:function(c, a, b, d, e, h) {
(this._.activeChild != c || c._.panel._.offsetParentId != b.getId()) && (this.hideChild(), 
c.onHide = CKEDITOR.tools.bind(function() {
CKEDITOR.tools.setTimeout(function() {
this._.focused || this.hide();
}, 0, this);
}, this), this._.activeChild = c, this._.focused = !1, c.showBlock(a, b, d, e, h), 
this.blur(), (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function() {
c.element.getChild(0).$.style.cssText += "";
}, 100));
},
hideChild:function(c) {
var a = this._.activeChild;
a && (delete a.onHide, delete this._.activeChild, a.hide(), c && this.focus());
}
}
}), CKEDITOR.on("instanceDestroyed", function() {
var a, c = CKEDITOR.tools.isEmpty(CKEDITOR.instances);
for (a in e) {
var b = e[a];
c ? b.destroy() :b.element.hide();
}
c && (e = {});
});
}(), CKEDITOR.plugins.add("menu", {
requires:"floatpanel",
beforeInit:function(d) {
for (var e = d.config.menu_groups.split(","), c = d._.menuGroups = {}, a = d._.menuItems = {}, b = 0; b < e.length; b++) c[e[b]] = b + 1;
d.addMenuGroup = function(a, b) {
c[a] = b || 100;
}, d.addMenuItem = function(b, d) {
c[d.group] && (a[b] = new CKEDITOR.menuItem(this, b, d));
}, d.addMenuItems = function(a) {
for (var b in a) this.addMenuItem(b, a[b]);
}, d.getMenuItem = function(b) {
return a[b];
}, d.removeMenuItem = function(b) {
delete a[b];
};
}
}), function() {
function d(a) {
a.sort(function(a, b) {
return a.group < b.group ? -1 :a.group > b.group ? 1 :a.order < b.order ? -1 :a.order > b.order ? 1 :0;
});
}
var e = '<span class="cke_menuitem"><a id="{id}" class="cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href="{href}" title="{title}" tabindex="-1"_cke_focus=1 hidefocus="true" role="{role}" aria-haspopup="{hasPopup}" aria-disabled="{disabled}" {ariaChecked}';
(CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) && (e += ' onkeypress="return false;"'), 
CKEDITOR.env.gecko && (e += ' onblur="this.style.cssText = this.style.cssText;"');
var e = e + (' onmouseover="CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout="CKEDITOR.tools.callFunction({moveOutFn},{index});" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' :"onclick") + '="CKEDITOR.tools.callFunction({clickFn},{index}); return false;">'), c = CKEDITOR.addTemplate("menuItem", e + '<span class="cke_menubutton_inner"><span class="cke_menubutton_icon"><span class="cke_button_icon cke_button__{iconName}_icon" style="{iconStyle}"></span></span><span class="cke_menubutton_label">{label}</span>{arrowHtml}</span></a></span>'), a = CKEDITOR.addTemplate("menuArrow", '<span class="cke_menuarrow"><span>{label}</span></span>');
CKEDITOR.menu = CKEDITOR.tools.createClass({
$:function(a, c) {
c = this._.definition = c || {}, this.id = CKEDITOR.tools.getNextId(), this.editor = a, 
this.items = [], this._.listeners = [], this._.level = c.level || 1;
var d = CKEDITOR.tools.extend({}, c.panel, {
css:[ CKEDITOR.skin.getPath("editor") ],
level:this._.level - 1,
block:{}
}), e = d.block.attributes = d.attributes || {};
!e.role && (e.role = "menu"), this._.panelDefinition = d;
},
_:{
onShow:function() {
var a = this.editor.getSelection(), c = a && a.getStartElement(), d = this.editor.elementPath(), e = this._.listeners;
this.removeAll();
for (var f = 0; f < e.length; f++) {
var i = e[f](c, a, d);
if (i) for (var k in i) {
var n = this.editor.getMenuItem(k);
!n || n.command && !this.editor.getCommand(n.command).state || (n.state = i[k], 
this.add(n));
}
}
},
onClick:function(a) {
this.hide(), a.onClick ? a.onClick() :a.command && this.editor.execCommand(a.command);
},
onEscape:function(a) {
var c = this.parent;
return c ? c._.panel.hideChild(1) :27 == a && this.hide(1), !1;
},
onHide:function() {
this.onHide && this.onHide();
},
showSubMenu:function(a) {
var c = this._.subMenu, d = this.items[a];
if (d = d.getItems && d.getItems()) {
c ? c.removeAll() :(c = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, {
level:this._.level + 1
}, !0)), c.parent = this, c._.onClick = CKEDITOR.tools.bind(this._.onClick, this));
for (var e in d) {
var f = this.editor.getMenuItem(e);
f && (f.state = d[e], c.add(f));
}
var i = this._.panel.getBlock(this.id).element.getDocument().getById(this.id + ("" + a));
setTimeout(function() {
c.show(i, 2);
}, 0);
} else this._.panel.hideChild(1);
}
},
proto:{
add:function(a) {
a.order || (a.order = this.items.length), this.items.push(a);
},
removeAll:function() {
this.items = [];
},
show:function(a, c, e, h) {
if (this.parent || (this._.onShow(), this.items.length)) {
var c = c || ("rtl" == this.editor.lang.dir ? 2 :1), f = this.items, i = this.editor, k = this._.panel, n = this._.element;
if (!k) {
k = this._.panel = new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level), 
k.onEscape = CKEDITOR.tools.bind(function(a) {
return this._.onEscape(a) === !1 ? !1 :void 0;
}, this), k.onShow = function() {
k._.panel.getHolderElement().getParent().addClass("cke cke_reset_all");
}, k.onHide = CKEDITOR.tools.bind(function() {
this._.onHide && this._.onHide();
}, this), n = k.addBlock(this.id, this._.panelDefinition.block), n.autoSize = !0;
var o = n.keys;
o[40] = "next", o[9] = "next", o[38] = "prev", o[CKEDITOR.SHIFT + 9] = "prev", o["rtl" == i.lang.dir ? 37 :39] = CKEDITOR.env.ie ? "mouseup" :"click", 
o[32] = CKEDITOR.env.ie ? "mouseup" :"click", CKEDITOR.env.ie && (o[13] = "mouseup"), 
n = this._.element = n.element, o = n.getDocument(), o.getBody().setStyle("overflow", "hidden"), 
o.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden"), this._.itemOverFn = CKEDITOR.tools.addFunction(function(a) {
clearTimeout(this._.showSubTimeout), this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, i.config.menu_subMenuDelay || 400, this, [ a ]);
}, this), this._.itemOutFn = CKEDITOR.tools.addFunction(function() {
clearTimeout(this._.showSubTimeout);
}, this), this._.itemClickFn = CKEDITOR.tools.addFunction(function(a) {
var b = this.items[a];
b.state == CKEDITOR.TRISTATE_DISABLED ? this.hide(1) :b.getItems ? this._.showSubMenu(a) :this._.onClick(b);
}, this);
}
d(f);
for (var o = i.elementPath(), o = [ '<div class="cke_menu' + (o && o.direction() != i.lang.dir ? " cke_mixed_dir_content" :"") + '" role="presentation">' ], q = f.length, l = q && f[0].group, m = 0; q > m; m++) {
var r = f[m];
l != r.group && (o.push('<div class="cke_menuseparator" role="separator"></div>'), 
l = r.group), r.render(this, m, o);
}
o.push("</div>"), n.setHtml(o.join("")), CKEDITOR.ui.fire("ready", this), this.parent ? this.parent._.panel.showAsChild(k, this.id, a, c, e, h) :k.showBlock(this.id, a, c, e, h), 
i.fire("menuShow", [ k ]);
}
},
addListener:function(a) {
this._.listeners.push(a);
},
hide:function(a) {
this._.onHide && this._.onHide(), this._.panel && this._.panel.hide(a);
}
}
}), CKEDITOR.menuItem = CKEDITOR.tools.createClass({
$:function(a, c, d) {
CKEDITOR.tools.extend(this, d, {
order:0,
className:"cke_menubutton__" + c
}), this.group = a._.menuGroups[this.group], this.editor = a, this.name = c;
},
proto:{
render:function(b, d, e) {
var h = b.id + ("" + d), f = "undefined" == typeof this.state ? CKEDITOR.TRISTATE_OFF :this.state, i = "", k = f == CKEDITOR.TRISTATE_ON ? "on" :f == CKEDITOR.TRISTATE_DISABLED ? "disabled" :"off";
this.role in {
menuitemcheckbox:1,
menuitemradio:1
} && (i = ' aria-checked="' + (f == CKEDITOR.TRISTATE_ON ? "true" :"false") + '"');
var n = this.getItems, o = "&#" + ("rtl" == this.editor.lang.dir ? "9668" :"9658") + ";", q = this.name;
this.icon && !/\./.test(this.icon) && (q = this.icon), b = {
id:h,
name:this.name,
iconName:q,
label:this.label,
cls:this.className || "",
state:k,
hasPopup:n ? "true" :"false",
disabled:f == CKEDITOR.TRISTATE_DISABLED,
title:this.label,
href:"javascript:void('" + (this.label || "").replace("'") + "')",
hoverFn:b._.itemOverFn,
moveOutFn:b._.itemOutFn,
clickFn:b._.itemClickFn,
index:d,
iconStyle:CKEDITOR.skin.getIconStyle(q, "rtl" == this.editor.lang.dir, q == this.icon ? null :this.icon, this.iconOffset),
arrowHtml:n ? a.output({
label:o
}) :"",
role:this.role ? this.role :"menuitem",
ariaChecked:i
}, c.output(b, e);
}
}
});
}(), CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div", 
CKEDITOR.plugins.add("contextmenu", {
requires:"menu",
onLoad:function() {
CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
base:CKEDITOR.menu,
$:function(d) {
this.base.call(this, d, {
panel:{
className:"cke_menu_panel",
attributes:{
"aria-label":d.lang.contextmenu.options
}
}
});
},
proto:{
addTarget:function(d, e) {
if (d.on("contextmenu", function(a) {
var a = a.data, d = CKEDITOR.env.webkit ? c :CKEDITOR.env.mac ? a.$.metaKey :a.$.ctrlKey;
if (!e || !d) {
a.preventDefault();
var g = a.getTarget().getDocument(), h = a.getTarget().getDocument().getDocumentElement(), d = !g.equals(CKEDITOR.document), g = g.getWindow().getScrollPosition(), f = d ? a.$.clientX :a.$.pageX || g.x + a.$.clientX, i = d ? a.$.clientY :a.$.pageY || g.y + a.$.clientY;
CKEDITOR.tools.setTimeout(function() {
this.open(h, null, f, i);
}, CKEDITOR.env.ie ? 200 :0, this);
}
}, this), CKEDITOR.env.webkit) {
var c, a = function() {
c = 0;
};
d.on("keydown", function(a) {
c = CKEDITOR.env.mac ? a.data.$.metaKey :a.data.$.ctrlKey;
}), d.on("keyup", a), d.on("contextmenu", a);
}
},
open:function(d, e, c, a) {
this.editor.focus(), d = d || CKEDITOR.document.getDocumentElement(), this.editor.selectionChange(1), 
this.show(d, e, c, a);
}
}
});
},
beforeInit:function(d) {
var e = d.contextMenu = new CKEDITOR.plugins.contextMenu(d);
d.on("contentDom", function() {
e.addTarget(d.editable(), d.config.browserContextMenuOnCtrl !== !1);
}), d.addCommand("contextMenu", {
exec:function() {
d.contextMenu.open(d.document.getBody());
}
}), d.setKeystroke(CKEDITOR.SHIFT + 121, "contextMenu"), d.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu");
}
}), function() {
function d(a) {
var b = this.att, a = a && a.hasAttribute(b) && a.getAttribute(b) || "";
void 0 !== a && this.setValue(a);
}
function e() {
for (var a, b = 0; b < arguments.length; b++) if (arguments[b] instanceof CKEDITOR.dom.element) {
a = arguments[b];
break;
}
if (a) {
var b = this.att, c = this.getValue();
c ? a.setAttribute(b, c) :a.removeAttribute(b, c);
}
}
var c = {
id:1,
dir:1,
classes:1,
styles:1
};
CKEDITOR.plugins.add("dialogadvtab", {
requires:"dialog",
allowedContent:function(a) {
a || (a = c);
var b = [];
a.id && b.push("id"), a.dir && b.push("dir");
var d = "";
return b.length && (d += "[" + b.join(",") + "]"), a.classes && (d += "(*)"), a.styles && (d += "{*}"), 
d;
},
createAdvancedTab:function(a, b, j) {
b || (b = c);
var g = a.lang.common, h = {
id:"advanced",
label:g.advancedTab,
title:g.advancedTab,
elements:[ {
type:"vbox",
padding:1,
children:[]
} ]
}, f = [];
return (b.id || b.dir) && (b.id && f.push({
id:"advId",
att:"id",
type:"text",
requiredContent:j ? j + "[id]" :null,
label:g.id,
setup:d,
commit:e
}), b.dir && f.push({
id:"advLangDir",
att:"dir",
type:"select",
requiredContent:j ? j + "[dir]" :null,
label:g.langDir,
"default":"",
style:"width:100%",
items:[ [ g.notSet, "" ], [ g.langDirLTR, "ltr" ], [ g.langDirRTL, "rtl" ] ],
setup:d,
commit:e
}), h.elements[0].children.push({
type:"hbox",
widths:[ "50%", "50%" ],
children:[].concat(f)
})), (b.styles || b.classes) && (f = [], b.styles && f.push({
id:"advStyles",
att:"style",
type:"text",
requiredContent:j ? j + "{cke-xyz}" :null,
label:g.styles,
"default":"",
validate:CKEDITOR.dialog.validate.inlineStyle(g.invalidInlineStyle),
onChange:function() {},
getStyle:function(a, b) {
var c = this.getValue().match(RegExp("(?:^|;)\\s*" + a + "\\s*:\\s*([^;]*)", "i"));
return c ? c[1] :b;
},
updateStyle:function(b, c) {
var d = this.getValue(), e = a.document.createElement("span");
e.setAttribute("style", d), e.setStyle(b, c), d = CKEDITOR.tools.normalizeCssText(e.getAttribute("style")), 
this.setValue(d, 1);
},
setup:d,
commit:e
}), b.classes && f.push({
type:"hbox",
widths:[ "45%", "55%" ],
children:[ {
id:"advCSSClasses",
att:"class",
type:"text",
requiredContent:j ? j + "(cke-xyz)" :null,
label:g.cssClasses,
"default":"",
setup:d,
commit:e
} ]
}), h.elements[0].children.push({
type:"hbox",
widths:[ "50%", "50%" ],
children:[].concat(f)
})), h;
}
});
}(), function() {
CKEDITOR.plugins.add("div", {
requires:"dialog",
init:function(d) {
if (!d.blockless) {
var e = d.lang.div, c = "div(*)";
CKEDITOR.dialog.isTabEnabled(d, "editdiv", "advanced") && (c += ";div[dir,id,lang,title]{*}"), 
d.addCommand("creatediv", new CKEDITOR.dialogCommand("creatediv", {
allowedContent:c,
requiredContent:"div",
contextSensitive:!0,
refresh:function(a, b) {
this.setState("div" in (a.config.div_wrapTable ? b.root :b.blockLimit).getDtd() ? CKEDITOR.TRISTATE_OFF :CKEDITOR.TRISTATE_DISABLED);
}
})), d.addCommand("editdiv", new CKEDITOR.dialogCommand("editdiv", {
requiredContent:"div"
})), d.addCommand("removediv", {
requiredContent:"div",
exec:function(a) {
function b(b) {
(b = CKEDITOR.plugins.div.getSurroundDiv(a, b)) && !b.data("cke-div-added") && (i.push(b), 
b.data("cke-div-added"));
}
for (var e, c = a.getSelection(), d = c && c.getRanges(), f = c.createBookmarks(), i = [], k = 0; k < d.length; k++) e = d[k], 
e.collapsed ? b(c.getStartElement()) :(e = new CKEDITOR.dom.walker(e), e.evaluator = b, 
e.lastForward());
for (k = 0; k < i.length; k++) i[k].remove(!0);
c.selectBookmarks(f);
}
}), d.ui.addButton && d.ui.addButton("CreateDiv", {
label:e.toolbar,
command:"creatediv",
toolbar:"blocks,50"
}), d.addMenuItems && (d.addMenuItems({
editdiv:{
label:e.edit,
command:"editdiv",
group:"div",
order:1
},
removediv:{
label:e.remove,
command:"removediv",
group:"div",
order:5
}
}), d.contextMenu && d.contextMenu.addListener(function(a) {
return !a || a.isReadOnly() ? null :CKEDITOR.plugins.div.getSurroundDiv(d) ? {
editdiv:CKEDITOR.TRISTATE_OFF,
removediv:CKEDITOR.TRISTATE_OFF
} :null;
})), CKEDITOR.dialog.add("creatediv", this.path + "dialogs/div.js"), CKEDITOR.dialog.add("editdiv", this.path + "dialogs/div.js");
}
}
}), CKEDITOR.plugins.div = {
getSurroundDiv:function(d, e) {
var c = d.elementPath(e);
return d.elementPath(c.blockLimit).contains(function(a) {
return a.is("div") && !a.isReadOnly();
}, 1);
}
};
}(), function() {
function e(a, e) {
function h(b) {
if (b = n.list[b], b.equals(a.editable()) || "true" == b.getAttribute("contenteditable")) {
var c = a.createRange();
c.selectNodeContents(b), c.select();
} else a.getSelection().selectElement(b);
a.focus();
}
function f() {
k && k.setHtml(c), delete n.list;
}
var k, i = a.ui.spaceId("path"), n = a._.elementsPath, o = n.idBase;
e.html = e.html + ('<span id="' + i + '_label" class="cke_voice_label">' + a.lang.elementspath.eleLabel + '</span><span id="' + i + '" class="cke_path" role="group" aria-labelledby="' + i + '_label">' + c + "</span>"), 
a.on("uiReady", function() {
var b = a.ui.space("path");
b && a.focusManager.add(b, 1);
}), n.onClick = h;
var q = CKEDITOR.tools.addFunction(h), l = CKEDITOR.tools.addFunction(function(b, c) {
var e, d = n.idBase, c = new CKEDITOR.dom.event(c);
switch (e = "rtl" == a.lang.dir, c.getKeystroke()) {
case e ? 39 :37:
case 9:
return (e = CKEDITOR.document.getById(d + (b + 1))) || (e = CKEDITOR.document.getById(d + "0")), 
e.focus(), !1;

case e ? 37 :39:
case CKEDITOR.SHIFT + 9:
return (e = CKEDITOR.document.getById(d + (b - 1))) || (e = CKEDITOR.document.getById(d + (n.list.length - 1))), 
e.focus(), !1;

case 27:
return a.focus(), !1;

case 13:
case 32:
return h(b), !1;
}
return !0;
});
a.on("selectionChange", function() {
a.editable();
for (var w, d = [], e = n.list = [], f = [], g = n.filters, h = !0, A = a.elementPath().elements, t = A.length; t--; ) {
var s = A[t], x = 0;
w = s.data("cke-display-name") ? s.data("cke-display-name") :s.data("cke-real-element-type") ? s.data("cke-real-element-type") :s.getName(), 
h = s.hasAttribute("contenteditable") ? "true" == s.getAttribute("contenteditable") :h, 
!h && !s.hasAttribute("contenteditable") && (x = 1);
for (var y = 0; y < g.length; y++) {
var z = g[y](s, w);
if (z === !1) {
x = 1;
break;
}
w = z || w;
}
x || (e.unshift(s), f.unshift(w));
}
for (e = e.length, g = 0; e > g; g++) w = f[g], h = a.lang.elementspath.eleTitle.replace(/%1/, w), 
w = b.output({
id:o + g,
label:h,
text:w,
jsTitle:"javascript:void('" + w + "')",
index:g,
keyDownFn:l,
clickFn:q
}), d.unshift(w);
k || (k = CKEDITOR.document.getById(i)), f = k, f.setHtml(d.join("") + c), a.fire("elementsPathUpdate", {
space:f
});
}), a.on("readOnly", f), a.on("contentDomUnload", f), a.addCommand("elementsPathFocus", d), 
a.setKeystroke(CKEDITOR.ALT + 122, "elementsPathFocus");
}
var d;
d = {
editorFocus:!1,
readOnly:1,
exec:function(a) {
(a = CKEDITOR.document.getById(a._.elementsPath.idBase + "0")) && a.focus(CKEDITOR.env.ie || CKEDITOR.env.air);
}
};
var c = '<span class="cke_path_empty">&nbsp;</span>', a = "";
(CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) && (a += ' onkeypress="return false;"'), 
CKEDITOR.env.gecko && (a += ' onblur="this.style.cssText = this.style.cssText;"');
var b = CKEDITOR.addTemplate("pathItem", '<a id="{id}" href="{jsTitle}" tabindex="-1" class="cke_path_item" title="{label}"' + (CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 ? ' onfocus="event.preventBubble();"' :"") + a + ' hidefocus="true"  onkeydown="return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick="CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role="button" aria-label="{label}">{text}</a>');
CKEDITOR.plugins.add("elementspath", {
init:function(a) {
a._.elementsPath = {
idBase:"cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_",
filters:[]
}, a.on("uiSpace", function(b) {
"bottom" == b.data.space && e(a, b.data);
});
}
});
}(), function() {
function d(a, b, c) {
c = a.config.forceEnterMode || c, "wysiwyg" == a.mode && (b || (b = a.activeEnterMode), 
a.elementPath().isContextFor("p") || (b = CKEDITOR.ENTER_BR, c = 1), a.fire("saveSnapshot"), 
b == CKEDITOR.ENTER_BR ? j(a, b, null, c) :g(a, b, null, c), a.fire("saveSnapshot"));
}
function e(a) {
for (var a = a.getSelection().getRanges(!0), b = a.length - 1; b > 0; b--) a[b].deleteContents();
return a[0];
}
CKEDITOR.plugins.add("enterkey", {
init:function(a) {
a.addCommand("enter", {
modes:{
wysiwyg:1
},
editorFocus:!1,
exec:function(a) {
d(a);
}
}), a.addCommand("shiftEnter", {
modes:{
wysiwyg:1
},
editorFocus:!1,
exec:function(a) {
d(a, a.activeShiftEnterMode, 1);
}
}), a.setKeystroke([ [ 13, "enter" ], [ CKEDITOR.SHIFT + 13, "shiftEnter" ] ]);
}
});
var c = CKEDITOR.dom.walker.whitespaces(), a = CKEDITOR.dom.walker.bookmark();
CKEDITOR.plugins.enterkey = {
enterBlock:function(b, d, g, n) {
if (g = g || e(b)) {
var p, o = g.document, q = g.checkStartOfBlock(), l = g.checkEndOfBlock(), m = b.elementPath(g.startContainer).block, r = d == CKEDITOR.ENTER_DIV ? "div" :"p";
if (q && l) {
if (m && (m.is("li") || m.getParent().is("li"))) {
g = m.getParent(), p = g.getParent();
var n = !m.hasPrevious(), u = !m.hasNext(), r = b.getSelection(), v = r.createBookmarks(), q = m.getDirection(1), l = m.getAttribute("class"), A = m.getAttribute("style"), w = p.getDirection(1) != q, b = b.enterMode != CKEDITOR.ENTER_BR || w || A || l;
if (p.is("li")) n || u ? m[n ? "insertBefore" :"insertAfter"](p) :m.breakParent(p); else {
if (b) p = o.createElement(d == CKEDITOR.ENTER_P ? "p" :"div"), w && p.setAttribute("dir", q), 
A && p.setAttribute("style", A), l && p.setAttribute("class", l), m.moveChildren(p), 
n || u ? p[n ? "insertBefore" :"insertAfter"](g) :(m.breakParent(g), p.insertAfter(g)); else if (m.appendBogus(!0), 
n || u) for (;o = m[n ? "getFirst" :"getLast"](); ) o[n ? "insertBefore" :"insertAfter"](g); else for (m.breakParent(g); o = m.getLast(); ) o.insertAfter(g);
m.remove();
}
return r.selectBookmarks(v), void 0;
}
if (m && m.getParent().is("blockquote")) return m.breakParent(m.getParent()), m.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || m.getPrevious().remove(), 
m.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || m.getNext().remove(), 
g.moveToElementEditStart(m), g.select(), void 0;
} else if (m && m.is("pre") && !l) return j(b, d, g, n), void 0;
if (l = g.splitBlock(r)) {
if (d = l.previousBlock, m = l.nextBlock, b = l.wasStartOfBlock, q = l.wasEndOfBlock, 
m ? (v = m.getParent(), v.is("li") && (m.breakParent(v), m.move(m.getNext(), 1))) :d && (v = d.getParent()) && v.is("li") && (d.breakParent(v), 
v = d.getNext(), g.moveToElementEditStart(v), d.move(d.getPrevious())), b || q) {
if (d ? (d.is("li") || !h.test(d.getName()) && !d.is("pre")) && (p = d.clone()) :m && (p = m.clone()), 
p ? n && !p.is("li") && p.renameNode(r) :v && v.is("li") ? p = v :(p = o.createElement(r), 
d && (u = d.getDirection()) && p.setAttribute("dir", u)), o = l.elementPath) for (n = 0, 
r = o.elements.length; r > n && (v = o.elements[n], !v.equals(o.block) && !v.equals(o.blockLimit)); n++) CKEDITOR.dtd.$removeEmpty[v.getName()] && (v = v.clone(), 
p.moveChildren(v), p.append(v));
p.appendBogus(), p.getParent() || g.insertNode(p), p.is("li") && p.removeAttribute("value"), 
!CKEDITOR.env.ie || !b || q && d.getChildCount() || (g.moveToElementEditStart(q ? d :p), 
g.select()), g.moveToElementEditStart(b && !q ? m :p);
} else m.is("li") && (p = g.clone(), p.selectNodeContents(m), p = new CKEDITOR.dom.walker(p), 
p.evaluator = function(b) {
return !(a(b) || c(b) || b.type == CKEDITOR.NODE_ELEMENT && b.getName() in CKEDITOR.dtd.$inline && !(b.getName() in CKEDITOR.dtd.$empty));
}, (v = p.next()) && v.type == CKEDITOR.NODE_ELEMENT && v.is("ul", "ol") && (CKEDITOR.env.needsBrFiller ? o.createElement("br") :o.createText("\xa0")).insertBefore(v)), 
m && g.moveToElementEditStart(m);
g.select(), g.scrollIntoView();
}
}
},
enterBr:function(a, b, c, d) {
if (c = c || e(a)) {
var j = c.document, q = c.checkEndOfBlock(), l = new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()), m = l.block, l = m && l.block.getName();
d || "li" != l ? (!d && q && h.test(l) ? (q = m.getDirection()) ? (j = j.createElement("div"), 
j.setAttribute("dir", q), j.insertAfter(m), c.setStart(j, 0)) :(j.createElement("br").insertAfter(m), 
CKEDITOR.env.gecko && j.createText("").insertAfter(m), c.setStartAt(m.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START :CKEDITOR.POSITION_AFTER_START)) :(m = "pre" == l && CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? j.createText("\r") :j.createElement("br"), 
c.deleteContents(), c.insertNode(m), CKEDITOR.env.needsBrFiller ? (j.createText("").insertAfter(m), 
q && m.getParent().appendBogus(), m.getNext().$.nodeValue = "", c.setStartAt(m.getNext(), CKEDITOR.POSITION_AFTER_START)) :c.setStartAt(m, CKEDITOR.POSITION_AFTER_END)), 
c.collapse(!0), c.select(), c.scrollIntoView()) :g(a, b, c, d);
}
}
};
var b = CKEDITOR.plugins.enterkey, j = b.enterBr, g = b.enterBlock, h = /^h[1-6]$/;
}(), function() {
function d(d, c) {
var a = {}, b = [], j = {
nbsp:"\xa0",
shy:"\xad",
gt:">",
lt:"<",
amp:"&",
apos:"'",
quot:'"'
}, d = d.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function(d, e) {
var g = c ? "&" + e + ";" :j[e];
return a[g] = c ? j[e] :"&" + e + ";", b.push(g), "";
});
if (!c && d) {
var h, d = d.split(","), g = document.createElement("div");
for (g.innerHTML = "&" + d.join(";&") + ";", h = g.innerHTML, g = null, g = 0; g < h.length; g++) {
var f = h.charAt(g);
a[f] = "&" + d[g] + ";", b.push(f);
}
}
return a.regex = b.join(c ? "|" :""), a;
}
CKEDITOR.plugins.add("entities", {
afterInit:function(e) {
var c = e.config;
if (e = (e = e.dataProcessor) && e.htmlFilter) {
var a = [];
c.basicEntities !== !1 && a.push("nbsp,gt,lt,amp"), c.entities && (a.length && a.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"), 
c.entities_latin && a.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"), 
c.entities_greek && a.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"), 
c.entities_additional && a.push(c.entities_additional));
var b = d(a.join(",")), j = b.regex ? "[" + b.regex + "]" :"a^";
delete b.regex, c.entities && c.entities_processNumerical && (j = "[^ -~]|" + j);
var j = RegExp(j, "g"), g = function(a) {
return "force" != c.entities_processNumerical && b[a] ? b[a] :"&#" + a.charCodeAt(0) + ";";
}, h = d("nbsp,gt,lt,amp,shy", !0), f = RegExp(h.regex, "g"), i = function(a) {
return h[a];
};
e.addRules({
text:function(a) {
return a.replace(f, i).replace(j, g);
}
}, {
applyToAll:!0,
excludeNestedEditable:!0
});
}
}
});
}(), CKEDITOR.config.basicEntities = !0, CKEDITOR.config.entities = !0, CKEDITOR.config.entities_latin = !0, 
CKEDITOR.config.entities_greek = !0, CKEDITOR.config.entities_additional = "#39", 
CKEDITOR.plugins.add("popup"), CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
popup:function(d, e, c, a) {
e = e || "80%", c = c || "70%", "string" == typeof e && e.length > 1 && "%" == e.substr(e.length - 1, 1) && (e = parseInt(window.screen.width * parseInt(e, 10) / 100, 10)), 
"string" == typeof c && c.length > 1 && "%" == c.substr(c.length - 1, 1) && (c = parseInt(window.screen.height * parseInt(c, 10) / 100, 10)), 
640 > e && (e = 640), 420 > c && (c = 420);
var b = parseInt((window.screen.height - c) / 2, 10), j = parseInt((window.screen.width - e) / 2, 10), a = (a || "location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,scrollbars=yes") + ",width=" + e + ",height=" + c + ",top=" + b + ",left=" + j, g = window.open("", null, a, !0);
if (!g) return !1;
try {
-1 == navigator.userAgent.toLowerCase().indexOf(" chrome/") && (g.moveTo(j, b), 
g.resizeTo(e, c)), g.focus(), g.location.href = d;
} catch (h) {
window.open(d, null, a, !0);
}
return !0;
}
}), function() {
function d(a, b) {
var c = [];
if (!b) return a;
for (var d in b) c.push(d + "=" + encodeURIComponent(b[d]));
return a + (-1 != a.indexOf("?") ? "&" :"?") + c.join("&");
}
function e(a) {
return a += "", a.charAt(0).toUpperCase() + a.substr(1);
}
function c() {
var a = this.getDialog(), b = a.getParentEditor();
b._.filebrowserSe = this;
var c = b.config["filebrowser" + e(a.getName()) + "WindowWidth"] || b.config.filebrowserWindowWidth || "80%", a = b.config["filebrowser" + e(a.getName()) + "WindowHeight"] || b.config.filebrowserWindowHeight || "70%", g = this.filebrowser.params || {};
g.CKEditor = b.name, g.CKEditorFuncNum = b._.filebrowserFn, g.langCode || (g.langCode = b.langCode), 
g = d(this.filebrowser.url, g), b.popup(g, c, a, b.config.filebrowserWindowFeatures || b.config.fileBrowserWindowFeatures);
}
function a() {
var a = this.getDialog();
return a.getParentEditor()._.filebrowserSe = this, a.getContentElement(this["for"][0], this["for"][1]).getInputElement().$.value && a.getContentElement(this["for"][0], this["for"][1]).getAction() ? !0 :!1;
}
function b(a, b, c) {
var e = c.params || {};
e.CKEditor = a.name, e.CKEditorFuncNum = a._.filebrowserFn, e.langCode || (e.langCode = a.langCode), 
b.action = d(c.url, e), b.filebrowser = c;
}
function j(d, g, h, n) {
if (n && n.length) for (var o, q = n.length; q--; ) if (o = n[q], ("hbox" == o.type || "vbox" == o.type || "fieldset" == o.type) && j(d, g, h, o.children), 
o.filebrowser) if ("string" == typeof o.filebrowser && (o.filebrowser = {
action:"fileButton" == o.type ? "QuickUpload" :"Browse",
target:o.filebrowser
}), "Browse" == o.filebrowser.action) {
var l = o.filebrowser.url;
void 0 === l && (l = d.config["filebrowser" + e(g) + "BrowseUrl"], void 0 === l && (l = d.config.filebrowserBrowseUrl)), 
l && (o.onClick = c, o.filebrowser.url = l, o.hidden = !1);
} else if ("QuickUpload" == o.filebrowser.action && o["for"] && (l = o.filebrowser.url, 
void 0 === l && (l = d.config["filebrowser" + e(g) + "UploadUrl"], void 0 === l && (l = d.config.filebrowserUploadUrl)), 
l)) {
var m = o.onClick;
o.onClick = function(b) {
var c = b.sender;
return m && m.call(c, b) === !1 ? !1 :a.call(c, b);
}, o.filebrowser.url = l, o.hidden = !1, b(d, h.getContents(o["for"][0]).get(o["for"][1]), o.filebrowser);
}
}
function g(a, b, c) {
if (-1 !== c.indexOf(";")) {
for (var c = c.split(";"), d = 0; d < c.length; d++) if (g(a, b, c[d])) return !0;
return !1;
}
return (a = a.getContents(b).get(c).filebrowser) && a.url;
}
function h(a, b) {
var c = this._.filebrowserSe.getDialog(), d = this._.filebrowserSe["for"], e = this._.filebrowserSe.filebrowser.onSelect;
d && c.getContentElement(d[0], d[1]).reset(), "function" == typeof b && b.call(this._.filebrowserSe) === !1 || e && e.call(this._.filebrowserSe, a, b) === !1 || ("string" == typeof b && b && alert(b), 
a && (d = this._.filebrowserSe, c = d.getDialog(), (d = d.filebrowser.target || null) && (d = d.split(":"), 
(e = c.getContentElement(d[0], d[1])) && (e.setValue(a), c.selectPage(d[0])))));
}
CKEDITOR.plugins.add("filebrowser", {
requires:"popup",
init:function(a) {
a._.filebrowserFn = CKEDITOR.tools.addFunction(h, a), a.on("destroy", function() {
CKEDITOR.tools.removeFunction(this._.filebrowserFn);
});
}
}), CKEDITOR.on("dialogDefinition", function(a) {
if (a.editor.plugins.filebrowser) for (var c, b = a.data.definition, d = 0; d < b.contents.length; ++d) (c = b.contents[d]) && (j(a.editor, a.data.name, b, c.elements), 
c.hidden && c.filebrowser && (c.hidden = !g(b, c.id, c.filebrowser)));
});
}(), CKEDITOR.plugins.add("find", {
requires:"dialog",
init:function(d) {
var e = d.addCommand("find", new CKEDITOR.dialogCommand("find"));
e.canUndo = !1, e.readOnly = 1, d.addCommand("replace", new CKEDITOR.dialogCommand("replace")).canUndo = !1, 
d.ui.addButton && (d.ui.addButton("Find", {
label:d.lang.find.find,
command:"find",
toolbar:"find,10"
}), d.ui.addButton("Replace", {
label:d.lang.find.replace,
command:"replace",
toolbar:"find,20"
})), CKEDITOR.dialog.add("find", this.path + "dialogs/find.js"), CKEDITOR.dialog.add("replace", this.path + "dialogs/find.js");
}
}), CKEDITOR.config.find_highlight = {
element:"span",
styles:{
"background-color":"#004",
color:"#fff"
}
}, function() {
function d(b, c) {
var d = a.exec(b), e = a.exec(c);
if (d) {
if (!d[2] && "px" == e[2]) return e[1];
if ("px" == d[2] && !e[2]) return e[1] + "px";
}
return c;
}
var e = CKEDITOR.htmlParser.cssStyle, c = CKEDITOR.tools.cssLength, a = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i, b = {
elements:{
$:function(a) {
var b = a.attributes;
if ((b = (b = (b = b && b["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(b))) && b.children[0]) && a.attributes["data-cke-resizable"]) {
var c = new e(a).rules, a = b.attributes, j = c.width, c = c.height;
j && (a.width = d(a.width, j)), c && (a.height = d(a.height, c));
}
return b;
}
}
}, j = CKEDITOR.plugins.add("fakeobjects", {
init:function(a) {
a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}", "fakeobjects");
},
afterInit:function(a) {
(a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(b);
}
});
CKEDITOR.editor.prototype.createFakeElement = function(a, b, d, i) {
var k = this.lang.fakeobjects, k = k[d] || k.unknown, b = {
"class":b,
"data-cke-realelement":encodeURIComponent(a.getOuterHtml()),
"data-cke-real-node-type":a.type,
alt:k,
title:k,
align:a.getAttribute("align") || ""
};
return CKEDITOR.env.hc || (b.src = CKEDITOR.getUrl(j.path + "images/spacer.gif")), 
d && (b["data-cke-real-element-type"] = d), i && (b["data-cke-resizable"] = i, d = new e(), 
i = a.getAttribute("width"), a = a.getAttribute("height"), i && (d.rules.width = c(i)), 
a && (d.rules.height = c(a)), d.populate(b)), this.document.createElement("img", {
attributes:b
});
}, CKEDITOR.editor.prototype.createFakeParserElement = function(a, b, d, i) {
var n, k = this.lang.fakeobjects, k = k[d] || k.unknown;
return n = new CKEDITOR.htmlParser.basicWriter(), a.writeHtml(n), n = n.getHtml(), 
b = {
"class":b,
"data-cke-realelement":encodeURIComponent(n),
"data-cke-real-node-type":a.type,
alt:k,
title:k,
align:a.attributes.align || ""
}, CKEDITOR.env.hc || (b.src = CKEDITOR.getUrl(j.path + "images/spacer.gif")), d && (b["data-cke-real-element-type"] = d), 
i && (b["data-cke-resizable"] = i, i = a.attributes, a = new e(), d = i.width, i = i.height, 
void 0 != d && (a.rules.width = c(d)), void 0 != i && (a.rules.height = c(i)), a.populate(b)), 
new CKEDITOR.htmlParser.element("img", b);
}, CKEDITOR.editor.prototype.restoreRealElement = function(a) {
if (a.data("cke-real-node-type") != CKEDITOR.NODE_ELEMENT) return null;
var b = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(a.data("cke-realelement")), this.document);
if (a.data("cke-resizable")) {
var c = a.getStyle("width"), a = a.getStyle("height");
c && b.setAttribute("width", d(b.getAttribute("width"), c)), a && b.setAttribute("height", d(b.getAttribute("height"), a));
}
return b;
};
}(), function() {
function d(a) {
return a = a.attributes, "application/x-shockwave-flash" == a.type || c.test(a.src || "");
}
function e(a, b) {
return a.createFakeParserElement(b, "cke_flash", "flash", !0);
}
var c = /\.swf(?:$|\?)/i;
CKEDITOR.plugins.add("flash", {
requires:"dialog,fakeobjects",
onLoad:function() {
CKEDITOR.addCss("img.cke_flash{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}");
},
init:function(a) {
var b = "object[classid,codebase,height,hspace,vspace,width];param[name,value];embed[height,hspace,pluginspage,src,type,vspace,width]";
CKEDITOR.dialog.isTabEnabled(a, "flash", "properties") && (b += ";object[align]; embed[allowscriptaccess,quality,scale,wmode]"), 
CKEDITOR.dialog.isTabEnabled(a, "flash", "advanced") && (b += ";object[id]{*}; embed[bgcolor]{*}(*)"), 
a.addCommand("flash", new CKEDITOR.dialogCommand("flash", {
allowedContent:b,
requiredContent:"embed"
})), a.ui.addButton && a.ui.addButton("Flash", {
label:a.lang.common.flash,
command:"flash",
toolbar:"insert,20"
}), CKEDITOR.dialog.add("flash", this.path + "dialogs/flash.js"), a.addMenuItems && a.addMenuItems({
flash:{
label:a.lang.flash.properties,
command:"flash",
group:"flash"
}
}), a.on("doubleclick", function(a) {
var b = a.data.element;
b.is("img") && "flash" == b.data("cke-real-element-type") && (a.data.dialog = "flash");
}), a.contextMenu && a.contextMenu.addListener(function(a) {
return a && a.is("img") && !a.isReadOnly() && "flash" == a.data("cke-real-element-type") ? {
flash:CKEDITOR.TRISTATE_OFF
} :void 0;
});
},
afterInit:function(a) {
var b = a.dataProcessor;
(b = b && b.dataFilter) && b.addRules({
elements:{
"cke:object":function(b) {
var c = b.attributes;
if (!(c.classid && ("" + c.classid).toLowerCase() || d(b))) {
for (c = 0; c < b.children.length; c++) if ("cke:embed" == b.children[c].name) {
if (!d(b.children[c])) break;
return e(a, b);
}
return null;
}
return e(a, b);
},
"cke:embed":function(b) {
return d(b) ? e(a, b) :null;
}
}
}, 5);
}
});
}(), CKEDITOR.tools.extend(CKEDITOR.config, {
flashEmbedTagOnly:!1,
flashAddEmbedTag:!0,
flashConvertOnEdit:!1
}), function() {
function d(b) {
var d = b.config, g = b.fire("uiSpace", {
space:"top",
html:""
}).html, h = function() {
function e(b, c, d) {
f.setStyle(c, a(d)), f.setStyle("position", b);
}
function g(a) {
var b = l.getDocumentPosition();
switch (a) {
case "top":
e("absolute", "top", b.y - u - w);
break;

case "pin":
e("fixed", "top", s);
break;

case "bottom":
e("absolute", "top", b.y + (r.height || r.bottom - r.top) + w);
}
i = a;
}
var i, l, k, r, p, u, v, A = d.floatSpaceDockedOffsetX || 0, w = d.floatSpaceDockedOffsetY || 0, t = d.floatSpacePinnedOffsetX || 0, s = d.floatSpacePinnedOffsetY || 0;
return function(d) {
if (l = b.editable()) if (d && "focus" == d.name && f.show(), f.removeStyle("left"), 
f.removeStyle("right"), k = f.getClientRect(), r = l.getClientRect(), p = c.getViewPaneSize(), 
u = k.height, v = "pageXOffset" in c.$ ? c.$.pageXOffset :CKEDITOR.document.$.documentElement.scrollLeft, 
i) {
u + w <= r.top ? g("top") :u + w > p.height - r.bottom ? g("pin") :g("bottom");
var e, d = p.width / 2, d = r.left > 0 && r.right < p.width && r.width > k.width ? "rtl" == b.config.contentsLangDirection ? "right" :"left" :d - r.left > r.right - d ? "left" :"right";
k.width > p.width ? (d = "left", e = 0) :(e = "left" == d ? r.left > 0 ? r.left :0 :r.right < p.width ? p.width - r.right :0, 
e + k.width > p.width && (d = "left" == d ? "right" :"left", e = 0)), f.setStyle(d, a(("pin" == i ? t :A) + e + ("pin" == i ? 0 :"left" == d ? v :-v)));
} else i = "pin", g("pin"), h(d);
};
}();
if (g) {
var f = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(e.output({
content:g,
id:b.id,
langDir:b.lang.dir,
langCode:b.langCode,
name:b.name,
style:"display:none;z-index:" + (d.baseFloatZIndex - 1),
topId:b.ui.spaceId("top"),
voiceLabel:b.lang.editorPanel + ", " + b.name
}))), i = CKEDITOR.tools.eventsBuffer(500, h), k = CKEDITOR.tools.eventsBuffer(100, h);
f.unselectable(), f.on("mousedown", function(a) {
a = a.data, a.getTarget().hasAscendant("a", 1) || a.preventDefault();
}), b.on("focus", function(a) {
h(a), b.on("change", i.input), c.on("scroll", k.input), c.on("resize", k.input);
}), b.on("blur", function() {
f.hide(), b.removeListener("change", i.input), c.removeListener("scroll", k.input), 
c.removeListener("resize", k.input);
}), b.on("destroy", function() {
c.removeListener("scroll", k.input), c.removeListener("resize", k.input), f.clearCustomData(), 
f.remove();
}), b.focusManager.hasFocus && f.show(), b.focusManager.add(f, 1);
}
}
var e = CKEDITOR.addTemplate("floatcontainer", '<div id="cke_{name}" class="cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir="{langDir}" title="' + (CKEDITOR.env.gecko ? " " :"") + '" lang="{langCode}" role="application" style="{style}" aria-labelledby="cke_{name}_arialbl"><span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span><div class="cke_inner"><div id="{topId}" class="cke_top" role="presentation">{content}</div></div></div>'), c = CKEDITOR.document.getWindow(), a = CKEDITOR.tools.cssLength;
CKEDITOR.plugins.add("floatingspace", {
init:function(a) {
a.on("loaded", function() {
d(this);
}, null, null, 20);
}
});
}(), CKEDITOR.plugins.add("listblock", {
requires:"panel",
onLoad:function() {
var d = CKEDITOR.addTemplate("panel-list", '<ul role="presentation" class="cke_panel_list">{items}</ul>'), e = CKEDITOR.addTemplate("panel-list-item", '<li id="{id}" class="cke_panel_listItem" role=presentation><a id="{id}_option" _cke_focus=1 hidefocus=true title="{title}" href="javascript:void(\'{val}\')"  {onclick}="CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role="option">{text}</a></li>'), c = CKEDITOR.addTemplate("panel-list-group", '<h1 id="{id}" class="cke_panel_grouptitle" role="presentation" >{label}</h1>'), a = /\'/g;
CKEDITOR.ui.panel.prototype.addListBlock = function(a, c) {
return this.addBlock(a, new CKEDITOR.ui.listBlock(this.getHolderElement(), c));
}, CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
base:CKEDITOR.ui.panel.block,
$:function(a, c) {
var c = c || {}, d = c.attributes || (c.attributes = {});
(this.multiSelect = !!c.multiSelect) && (d["aria-multiselectable"] = !0), !d.role && (d.role = "listbox"), 
this.base.apply(this, arguments), this.element.setAttribute("role", d.role), d = this.keys, 
d[40] = "next", d[9] = "next", d[38] = "prev", d[CKEDITOR.SHIFT + 9] = "prev", d[32] = CKEDITOR.env.ie ? "mouseup" :"click", 
CKEDITOR.env.ie && (d[13] = "mouseup"), this._.pendingHtml = [], this._.pendingList = [], 
this._.items = {}, this._.groups = {};
},
_:{
close:function() {
if (this._.started) {
var a = d.output({
items:this._.pendingList.join("")
});
this._.pendingList = [], this._.pendingHtml.push(a), delete this._.started;
}
},
getClick:function() {
return this._.click || (this._.click = CKEDITOR.tools.addFunction(function(a) {
var c = this.toggle(a);
this.onClick && this.onClick(a, c);
}, this)), this._.click;
}
},
proto:{
add:function(b, c, d) {
var h = CKEDITOR.tools.getNextId();
this._.started || (this._.started = 1, this._.size = this._.size || 0), this._.items[b] = h;
var f;
f = CKEDITOR.tools.htmlEncodeAttr(b).replace(a, "\\'"), b = {
id:h,
val:f,
onclick:CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' :"onclick",
clickFn:this._.getClick(),
title:CKEDITOR.tools.htmlEncodeAttr(d || b),
text:c || b
}, this._.pendingList.push(e.output(b));
},
startGroup:function(a) {
this._.close();
var d = CKEDITOR.tools.getNextId();
this._.groups[a] = d, this._.pendingHtml.push(c.output({
id:d,
label:a
}));
},
commit:function() {
this._.close(), this.element.appendHtml(this._.pendingHtml.join("")), delete this._.size, 
this._.pendingHtml = [];
},
toggle:function(a) {
var c = this.isMarked(a);
return c ? this.unmark(a) :this.mark(a), !c;
},
hideGroup:function(a) {
var c = (a = this.element.getDocument().getById(this._.groups[a])) && a.getNext();
a && (a.setStyle("display", "none"), c && "ul" == c.getName() && c.setStyle("display", "none"));
},
hideItem:function(a) {
this.element.getDocument().getById(this._.items[a]).setStyle("display", "none");
},
showAll:function() {
var e, a = this._.items, c = this._.groups, d = this.element.getDocument();
for (e in a) d.getById(a[e]).setStyle("display", "");
for (var f in c) a = d.getById(c[f]), e = a.getNext(), a.setStyle("display", ""), 
e && "ul" == e.getName() && e.setStyle("display", "");
},
mark:function(a) {
this.multiSelect || this.unmarkAll();
var a = this._.items[a], c = this.element.getDocument().getById(a);
c.addClass("cke_selected"), this.element.getDocument().getById(a + "_option").setAttribute("aria-selected", !0), 
this.onMark && this.onMark(c);
},
unmark:function(a) {
var c = this.element.getDocument(), a = this._.items[a], d = c.getById(a);
d.removeClass("cke_selected"), c.getById(a + "_option").removeAttribute("aria-selected"), 
this.onUnmark && this.onUnmark(d);
},
unmarkAll:function() {
var d, a = this._.items, c = this.element.getDocument();
for (d in a) {
var e = a[d];
c.getById(e).removeClass("cke_selected"), c.getById(e + "_option").removeAttribute("aria-selected");
}
this.onUnmark && this.onUnmark();
},
isMarked:function(a) {
return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected");
},
focus:function(a) {
this._.focusIndex = -1;
var d, c = this.element.getElementsByTag("a"), e = -1;
if (a) {
for (d = this.element.getDocument().getById(this._.items[a]).getFirst(); a = c.getItem(++e); ) if (a.equals(d)) {
this._.focusIndex = e;
break;
}
} else this.element.focus();
d && setTimeout(function() {
d.focus();
}, 0);
}
}
});
}
}), function() {
var d = '<a id="{id}" class="cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && CKEDITOR.env.version >= 10900 && !CKEDITOR.env.hc ? "" :" href=\"javascript:void('{titleJs}')\"") + ' title="{title}" tabindex="-1" hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="{hasArrow}" aria-disabled="{ariaDisabled}"';
(CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) && (d += ' onkeypress="return false;"'), 
CKEDITOR.env.gecko && (d += ' onblur="this.style.cssText = this.style.cssText;"');
var d = d + (' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus="return CKEDITOR.tools.callFunction({focusFn},event);"  onmousedown="return CKEDITOR.tools.callFunction({mousedownFn},event);" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' :"onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span class="cke_button_icon cke_button__{iconName}_icon" style="{style}"'), d = d + '>&nbsp;</span><span id="{id}_label" class="cke_button_label cke_button__{name}_label" aria-hidden="false">{label}</span>{arrowHtml}</a>', e = CKEDITOR.addTemplate("buttonArrow", '<span class="cke_button_arrow">' + (CKEDITOR.env.hc ? "&#9660;" :"") + "</span>"), c = CKEDITOR.addTemplate("button", d);
CKEDITOR.plugins.add("button", {
beforeInit:function(a) {
a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler);
}
}), CKEDITOR.UI_BUTTON = "button", CKEDITOR.ui.button = function(a) {
CKEDITOR.tools.extend(this, a, {
title:a.label,
click:a.click || function(b) {
b.execCommand(a.command);
}
}), this._ = {};
}, CKEDITOR.ui.button.handler = {
create:function(a) {
return new CKEDITOR.ui.button(a);
}
}, CKEDITOR.ui.button.prototype = {
render:function(a, b) {
var i, d = CKEDITOR.env, g = this._.id = CKEDITOR.tools.getNextId(), h = "", f = this.command;
this._.editor = a;
var k = {
id:g,
button:this,
editor:a,
focus:function() {
CKEDITOR.document.getById(g).focus();
},
execute:function() {
this.button.click(a);
},
attach:function(a) {
this.button.attach(a);
}
}, n = CKEDITOR.tools.addFunction(function(a) {
return k.onkey ? (a = new CKEDITOR.dom.event(a), k.onkey(k, a.getKeystroke()) !== !1) :void 0;
}), o = CKEDITOR.tools.addFunction(function(a) {
var b;
return k.onfocus && (b = k.onfocus(k, new CKEDITOR.dom.event(a)) !== !1), CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 && a.preventBubble(), 
b;
}), q = 0, l = CKEDITOR.tools.addFunction(function() {
if (CKEDITOR.env.opera) {
var b = a.editable();
b.isInline() && b.hasFocus && (a.lockSelection(), q = 1);
}
});
if (k.clickFn = i = CKEDITOR.tools.addFunction(function() {
q && (a.unlockSelection(1), q = 0), k.execute();
}), this.modes) {
var m = {}, r = function() {
var b = a.mode;
b && (b = this.modes[b] ? void 0 != m[b] ? m[b] :CKEDITOR.TRISTATE_OFF :CKEDITOR.TRISTATE_DISABLED, 
b = a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED :b, this.setState(b), 
this.refresh && this.refresh());
};
a.on("beforeModeUnload", function() {
a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (m[a.mode] = this._.state);
}, this), a.on("activeFilterChange", r, this), a.on("mode", r, this), !this.readOnly && a.on("readOnly", r, this);
} else f && (f = a.getCommand(f)) && (f.on("state", function() {
this.setState(f.state);
}, this), h += f.state == CKEDITOR.TRISTATE_ON ? "on" :f.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" :"off");
this.directional && a.on("contentDirChanged", function(b) {
var c = CKEDITOR.document.getById(this._.id), d = c.getFirst(), b = b.data;
b != a.lang.dir ? c.addClass("cke_" + b) :c.removeClass("cke_ltr").removeClass("cke_rtl"), 
d.setAttribute("style", CKEDITOR.skin.getIconStyle(p, "rtl" == b, this.icon, this.iconOffset));
}, this), f || (h += "off");
var p = r = this.name || this.command;
return this.icon && !/\./.test(this.icon) && (p = this.icon, this.icon = null), 
d = {
id:g,
name:r,
iconName:p,
label:this.label,
cls:this.className || "",
state:h,
ariaDisabled:"disabled" == h ? "true" :"false",
title:this.title,
titleJs:d.gecko && d.version >= 10900 && !d.hc ? "" :(this.title || "").replace("'", ""),
hasArrow:this.hasArrow ? "true" :"false",
keydownFn:n,
mousedownFn:l,
focusFn:o,
clickFn:i,
style:CKEDITOR.skin.getIconStyle(p, "rtl" == a.lang.dir, this.icon, this.iconOffset),
arrowHtml:this.hasArrow ? e.output() :""
}, c.output(d, b), this.onRender && this.onRender(), k;
},
setState:function(a) {
if (this._.state == a) return !1;
this._.state = a;
var b = CKEDITOR.document.getById(this._.id);
return b ? (b.setState(a, "cke_button"), a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", !0) :b.removeAttribute("aria-disabled"), 
this.hasArrow ? (a = a == CKEDITOR.TRISTATE_ON ? this._.editor.lang.button.selectedLabel.replace(/%1/g, this.label) :this.label, 
CKEDITOR.document.getById(this._.id + "_label").setText(a)) :a == CKEDITOR.TRISTATE_ON ? b.setAttribute("aria-pressed", !0) :b.removeAttribute("aria-pressed"), 
!0) :!1;
},
getState:function() {
return this._.state;
},
toFeature:function(a) {
if (this._.feature) return this._.feature;
var b = this;
return !this.allowedContent && !this.requiredContent && this.command && (b = a.getCommand(this.command) || b), 
this._.feature = b;
}
}, CKEDITOR.ui.prototype.addButton = function(a, b) {
this.add(a, CKEDITOR.UI_BUTTON, b);
};
}(), CKEDITOR.plugins.add("richcombo", {
requires:"floatpanel,listblock,button",
beforeInit:function(d) {
d.ui.addHandler(CKEDITOR.UI_RICHCOMBO, CKEDITOR.ui.richCombo.handler);
}
}), function() {
var d = '<span id="{id}" class="cke_combo cke_combo__{name} {cls}" role="presentation"><span id="{id}_label" class="cke_combo_label">{label}</span><a class="cke_combo_button" hidefocus=true title="{title}" tabindex="-1"' + (CKEDITOR.env.gecko && CKEDITOR.env.version >= 10900 && !CKEDITOR.env.hc ? "" :'" href="javascript:void(\'{titleJs}\')"') + ' hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="true"';
(CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac) && (d += ' onkeypress="return false;"'), 
CKEDITOR.env.gecko && (d += ' onblur="this.style.cssText = this.style.cssText;"');
var d = d + (' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event,this);" onmousedown="return CKEDITOR.tools.callFunction({mousedownFn},event);"  onfocus="return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' :"onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span id="{id}_text" class="cke_combo_text cke_combo_inlinelabel">{label}</span><span class="cke_combo_open"><span class="cke_combo_arrow">' + (CKEDITOR.env.hc ? "&#9660;" :CKEDITOR.env.air ? "&nbsp;" :"") + "</span></span></a></span>"), e = CKEDITOR.addTemplate("combo", d);
CKEDITOR.UI_RICHCOMBO = "richcombo", CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
$:function(c) {
CKEDITOR.tools.extend(this, c, {
canGroup:!1,
title:c.label,
modes:{
wysiwyg:1
},
editorFocus:1
}), c = this.panel || {}, delete this.panel, this.id = CKEDITOR.tools.getNextNumber(), 
this.document = c.parent && c.parent.getDocument() || CKEDITOR.document, c.className = "cke_combopanel", 
c.block = {
multiSelect:c.multiSelect,
attributes:c.attributes
}, c.toolbarRelated = !0, this._ = {
panelDefinition:c,
items:{}
};
},
proto:{
renderHtml:function(c) {
var a = [];
return this.render(c, a), a.join("");
},
render:function(c, a) {
function b() {
var a = this.modes[c.mode] ? CKEDITOR.TRISTATE_OFF :CKEDITOR.TRISTATE_DISABLED;
c.readOnly && !this.readOnly && (a = CKEDITOR.TRISTATE_DISABLED), this.setState(a), 
this.setValue(""), a != CKEDITOR.TRISTATE_DISABLED && this.refresh && this.refresh();
}
var d = CKEDITOR.env, g = "cke_" + this.id, h = CKEDITOR.tools.addFunction(function(a) {
o && (c.unlockSelection(1), o = 0), i.execute(a);
}, this), f = this, i = {
id:g,
combo:this,
focus:function() {
CKEDITOR.document.getById(g).getChild(1).focus();
},
execute:function(a) {
var b = f._;
if (b.state != CKEDITOR.TRISTATE_DISABLED) if (f.createPanel(c), b.on) b.panel.hide(); else {
f.commit();
var d = f.getValue();
d ? b.list.mark(d) :b.list.unmarkAll(), b.panel.showBlock(f.id, new CKEDITOR.dom.element(a), 4);
}
},
clickFn:h
};
c.on("activeFilterChange", b, this), c.on("mode", b, this), !this.readOnly && c.on("readOnly", b, this);
var k = CKEDITOR.tools.addFunction(function(a, b) {
var a = new CKEDITOR.dom.event(a), d = a.getKeystroke();
switch (40 == d && c.once("panelShow", function(a) {
a.data._.panel._.currentBlock.onKeyDown(40);
}), d) {
case 13:
case 32:
case 40:
CKEDITOR.tools.callFunction(h, b);
break;

default:
i.onkey(i, d);
}
a.preventDefault();
}), n = CKEDITOR.tools.addFunction(function() {
i.onfocus && i.onfocus();
}), o = 0, q = CKEDITOR.tools.addFunction(function() {
if (CKEDITOR.env.opera) {
var a = c.editable();
a.isInline() && a.hasFocus && (c.lockSelection(), o = 1);
}
});
return i.keyDownFn = k, d = {
id:g,
name:this.name || this.command,
label:this.label,
title:this.title,
cls:this.className || "",
titleJs:d.gecko && d.version >= 10900 && !d.hc ? "" :(this.title || "").replace("'", ""),
keydownFn:k,
mousedownFn:q,
focusFn:n,
clickFn:h
}, e.output(d, a), this.onRender && this.onRender(), i;
},
createPanel:function(c) {
if (!this._.panel) {
var a = this._.panelDefinition, b = this._.panelDefinition.block, d = a.parent || CKEDITOR.document.getBody(), e = "cke_combopanel__" + this.name, h = new CKEDITOR.ui.floatPanel(c, d, a), f = h.addListBlock(this.id, b), i = this;
h.onShow = function() {
this.element.addClass(e), i.setState(CKEDITOR.TRISTATE_ON), i._.on = 1, i.editorFocus && !c.focusManager.hasFocus && c.focus(), 
i.onOpen && i.onOpen(), c.once("panelShow", function() {
f.focus(!f.multiSelect && i.getValue());
});
}, h.onHide = function(a) {
this.element.removeClass(e), i.setState(i.modes && i.modes[c.mode] ? CKEDITOR.TRISTATE_OFF :CKEDITOR.TRISTATE_DISABLED), 
i._.on = 0, !a && i.onClose && i.onClose();
}, h.onEscape = function() {
h.hide(1);
}, f.onClick = function(a, b) {
i.onClick && i.onClick.call(i, a, b), h.hide();
}, this._.panel = h, this._.list = f, h.getBlock(this.id).onHide = function() {
i._.on = 0, i.setState(CKEDITOR.TRISTATE_OFF);
}, this.init && this.init();
}
},
setValue:function(c, a) {
this._.value = c;
var b = this.document.getById("cke_" + this.id + "_text");
b && (c || a ? b.removeClass("cke_combo_inlinelabel") :(a = this.label, b.addClass("cke_combo_inlinelabel")), 
b.setText("undefined" != typeof a ? a :c));
},
getValue:function() {
return this._.value || "";
},
unmarkAll:function() {
this._.list.unmarkAll();
},
mark:function(c) {
this._.list.mark(c);
},
hideItem:function(c) {
this._.list.hideItem(c);
},
hideGroup:function(c) {
this._.list.hideGroup(c);
},
showAll:function() {
this._.list.showAll();
},
add:function(c, a, b) {
this._.items[c] = b || c, this._.list.add(c, a, b);
},
startGroup:function(c) {
this._.list.startGroup(c);
},
commit:function() {
this._.committed || (this._.list.commit(), this._.committed = 1, CKEDITOR.ui.fire("ready", this)), 
this._.committed = 1;
},
setState:function(c) {
if (this._.state != c) {
var a = this.document.getById("cke_" + this.id);
a.setState(c, "cke_combo"), c == CKEDITOR.TRISTATE_DISABLED ? a.setAttribute("aria-disabled", !0) :a.removeAttribute("aria-disabled"), 
this._.state = c;
}
},
getState:function() {
return this._.state;
},
enable:function() {
this._.state == CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState);
},
disable:function() {
this._.state != CKEDITOR.TRISTATE_DISABLED && (this._.lastState = this._.state, 
this.setState(CKEDITOR.TRISTATE_DISABLED));
}
},
statics:{
handler:{
create:function(c) {
return new CKEDITOR.ui.richCombo(c);
}
}
}
}), CKEDITOR.ui.prototype.addRichCombo = function(c, a) {
this.add(c, CKEDITOR.UI_RICHCOMBO, a);
};
}(), function() {
function d(d, c, a, b, j, g, h, f) {
for (var i = d.config, k = new CKEDITOR.style(h), n = j.split(";"), j = [], o = {}, q = 0; q < n.length; q++) {
var l = n[q];
if (l) {
var l = l.split("/"), m = {}, r = n[q] = l[0];
m[a] = j[q] = l[1] || r, o[r] = new CKEDITOR.style(h, m), o[r]._.definition.name = r;
} else n.splice(q--, 1);
}
d.ui.addRichCombo(c, {
label:b.label,
title:b.panelTitle,
toolbar:"styles," + f,
allowedContent:k,
requiredContent:k,
panel:{
css:[ CKEDITOR.skin.getPath("editor") ].concat(i.contentsCss),
multiSelect:!1,
attributes:{
"aria-label":b.panelTitle
}
},
init:function() {
this.startGroup(b.panelTitle);
for (var a = 0; a < n.length; a++) {
var c = n[a];
this.add(c, o[c].buildPreview(), c);
}
},
onClick:function(a) {
d.focus(), d.fire("saveSnapshot");
var b = o[a];
d[this.getValue() == a ? "removeStyle" :"applyStyle"](b), d.fire("saveSnapshot");
},
onRender:function() {
d.on("selectionChange", function(a) {
for (var d, b = this.getValue(), a = a.data.path.elements, c = 0; c < a.length; c++) {
d = a[c];
for (var e in o) if (o[e].checkElementMatch(d, !0)) return e != b && this.setValue(e), 
void 0;
}
this.setValue("", g);
}, this);
},
refresh:function() {
d.activeFilter.check(k) || this.setState(CKEDITOR.TRISTATE_DISABLED);
}
});
}
CKEDITOR.plugins.add("font", {
requires:"richcombo",
init:function(e) {
var c = e.config;
d(e, "Font", "family", e.lang.font, c.font_names, c.font_defaultLabel, c.font_style, 30), 
d(e, "FontSize", "size", e.lang.font.fontSize, c.fontSize_sizes, c.fontSize_defaultLabel, c.fontSize_style, 40);
}
});
}(), CKEDITOR.config.font_names = "Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif", 
CKEDITOR.config.font_defaultLabel = "", CKEDITOR.config.font_style = {
element:"span",
styles:{
"font-family":"#(family)"
},
overrides:[ {
element:"font",
attributes:{
face:null
}
} ]
}, CKEDITOR.config.fontSize_sizes = "8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px", 
CKEDITOR.config.fontSize_defaultLabel = "", CKEDITOR.config.fontSize_style = {
element:"span",
styles:{
"font-size":"#(size)"
},
overrides:[ {
element:"font",
attributes:{
size:null
}
} ]
}, CKEDITOR.plugins.add("format", {
requires:"richcombo",
init:function(d) {
if (!d.blockless) {
for (var e = d.config, c = d.lang.format, a = e.format_tags.split(";"), b = {}, j = 0, g = [], h = 0; h < a.length; h++) {
var f = a[h], i = new CKEDITOR.style(e["format_" + f]);
(!d.filter.customConfig || d.filter.check(i)) && (j++, b[f] = i, b[f]._.enterMode = d.config.enterMode, 
g.push(i));
}
0 !== j && d.ui.addRichCombo("Format", {
label:c.label,
title:c.panelTitle,
toolbar:"styles,20",
allowedContent:g,
panel:{
css:[ CKEDITOR.skin.getPath("editor") ].concat(e.contentsCss),
multiSelect:!1,
attributes:{
"aria-label":c.panelTitle
}
},
init:function() {
this.startGroup(c.panelTitle);
for (var a in b) {
var d = c["tag_" + a];
this.add(a, b[a].buildPreview(d), d);
}
},
onClick:function(a) {
d.focus(), d.fire("saveSnapshot");
var a = b[a], c = d.elementPath();
d[a.checkActive(c) ? "removeStyle" :"applyStyle"](a), setTimeout(function() {
d.fire("saveSnapshot");
}, 0);
},
onRender:function() {
d.on("selectionChange", function(a) {
var c = this.getValue(), a = a.data.path;
this.refresh();
for (var e in b) if (b[e].checkActive(a)) return e != c && this.setValue(e, d.lang.format["tag_" + e]), 
void 0;
this.setValue("");
}, this);
},
onOpen:function() {
this.showAll();
for (var a in b) d.activeFilter.check(b[a]) || this.hideItem(a);
},
refresh:function() {
var a = d.elementPath();
if (a) {
if (a.isContextFor("p")) for (var c in b) if (d.activeFilter.check(b[c])) return;
this.setState(CKEDITOR.TRISTATE_DISABLED);
}
}
});
}
}
}), CKEDITOR.config.format_tags = "p;h1;h2;h3;h4;h5;h6;pre;address;div", CKEDITOR.config.format_p = {
element:"p"
}, CKEDITOR.config.format_div = {
element:"div"
}, CKEDITOR.config.format_pre = {
element:"pre"
}, CKEDITOR.config.format_address = {
element:"address"
}, CKEDITOR.config.format_h1 = {
element:"h1"
}, CKEDITOR.config.format_h2 = {
element:"h2"
}, CKEDITOR.config.format_h3 = {
element:"h3"
}, CKEDITOR.config.format_h4 = {
element:"h4"
}, CKEDITOR.config.format_h5 = {
element:"h5"
}, CKEDITOR.config.format_h6 = {
element:"h6"
}, CKEDITOR.plugins.add("forms", {
requires:"dialog,fakeobjects",
onLoad:function() {
CKEDITOR.addCss(".cke_editable form{border: 1px dotted #FF0000;padding: 2px;}\n"), 
CKEDITOR.addCss("img.cke_hidden{background-image: url(" + CKEDITOR.getUrl(this.path + "images/hiddenfield.gif") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 16px !important;height: 16px !important;}");
},
init:function(d) {
var e = d.lang, c = 0, a = {
email:1,
password:1,
search:1,
tel:1,
text:1,
url:1
}, b = {
checkbox:"input[type,name,checked]",
radio:"input[type,name,checked]",
textfield:"input[type,name,value,size,maxlength]",
textarea:"textarea[cols,rows,name]",
select:"select[name,size,multiple]; option[value,selected]",
button:"input[type,name,value]",
form:"form[action,name,id,enctype,target,method]",
hiddenfield:"input[type,name,value]",
imagebutton:"input[type,alt,src]{width,height,border,border-width,border-style,margin,float}"
}, j = {
checkbox:"input",
radio:"input",
textfield:"input",
textarea:"textarea",
select:"select",
button:"input",
form:"form",
hiddenfield:"input",
imagebutton:"input"
}, g = function(a, g, f) {
var h = {
allowedContent:b[g],
requiredContent:j[g]
};
"form" == g && (h.context = "form"), d.addCommand(g, new CKEDITOR.dialogCommand(g, h)), 
d.ui.addButton && d.ui.addButton(a, {
label:e.common[a.charAt(0).toLowerCase() + a.slice(1)],
command:g,
toolbar:"forms," + (c += 10)
}), CKEDITOR.dialog.add(g, f);
}, h = this.path + "dialogs/";
!d.blockless && g("Form", "form", h + "form.js"), g("Checkbox", "checkbox", h + "checkbox.js"), 
g("Radio", "radio", h + "radio.js"), g("TextField", "textfield", h + "textfield.js"), 
g("Textarea", "textarea", h + "textarea.js"), g("Select", "select", h + "select.js"), 
g("Button", "button", h + "button.js");
var f = d.plugins.image;
f && !d.plugins.image2 && g("ImageButton", "imagebutton", CKEDITOR.plugins.getPath("image") + "dialogs/image.js"), 
g("HiddenField", "hiddenfield", h + "hiddenfield.js"), d.addMenuItems && (g = {
checkbox:{
label:e.forms.checkboxAndRadio.checkboxTitle,
command:"checkbox",
group:"checkbox"
},
radio:{
label:e.forms.checkboxAndRadio.radioTitle,
command:"radio",
group:"radio"
},
textfield:{
label:e.forms.textfield.title,
command:"textfield",
group:"textfield"
},
hiddenfield:{
label:e.forms.hidden.title,
command:"hiddenfield",
group:"hiddenfield"
},
button:{
label:e.forms.button.title,
command:"button",
group:"button"
},
select:{
label:e.forms.select.title,
command:"select",
group:"select"
},
textarea:{
label:e.forms.textarea.title,
command:"textarea",
group:"textarea"
}
}, f && (g.imagebutton = {
label:e.image.titleButton,
command:"imagebutton",
group:"imagebutton"
}), !d.blockless && (g.form = {
label:e.forms.form.menu,
command:"form",
group:"form"
}), d.addMenuItems(g)), d.contextMenu && (!d.blockless && d.contextMenu.addListener(function(a, b, c) {
return (a = c.contains("form", 1)) && !a.isReadOnly() ? {
form:CKEDITOR.TRISTATE_OFF
} :void 0;
}), d.contextMenu.addListener(function(b) {
if (b && !b.isReadOnly()) {
var c = b.getName();
if ("select" == c) return {
select:CKEDITOR.TRISTATE_OFF
};
if ("textarea" == c) return {
textarea:CKEDITOR.TRISTATE_OFF
};
if ("input" == c) {
var d = b.getAttribute("type") || "text";
switch (d) {
case "button":
case "submit":
case "reset":
return {
button:CKEDITOR.TRISTATE_OFF
};

case "checkbox":
return {
checkbox:CKEDITOR.TRISTATE_OFF
};

case "radio":
return {
radio:CKEDITOR.TRISTATE_OFF
};

case "image":
return f ? {
imagebutton:CKEDITOR.TRISTATE_OFF
} :null;
}
if (a[d]) return {
textfield:CKEDITOR.TRISTATE_OFF
};
}
if ("img" == c && "hiddenfield" == b.data("cke-real-element-type")) return {
hiddenfield:CKEDITOR.TRISTATE_OFF
};
}
})), d.on("doubleclick", function(b) {
var c = b.data.element;
if (!d.blockless && c.is("form")) b.data.dialog = "form"; else if (c.is("select")) b.data.dialog = "select"; else if (c.is("textarea")) b.data.dialog = "textarea"; else if (c.is("img") && "hiddenfield" == c.data("cke-real-element-type")) b.data.dialog = "hiddenfield"; else if (c.is("input")) {
switch (c = c.getAttribute("type") || "text") {
case "button":
case "submit":
case "reset":
b.data.dialog = "button";
break;

case "checkbox":
b.data.dialog = "checkbox";
break;

case "radio":
b.data.dialog = "radio";
break;

case "image":
b.data.dialog = "imagebutton";
}
a[c] && (b.data.dialog = "textfield");
}
});
},
afterInit:function(d) {
var e = d.dataProcessor, c = e && e.htmlFilter, e = e && e.dataFilter;
CKEDITOR.env.ie && c && c.addRules({
elements:{
input:function(a) {
var a = a.attributes, b = a.type;
b || (a.type = "text"), ("checkbox" == b || "radio" == b) && "on" == a.value && delete a.value;
}
}
}, {
applyToAll:!0
}), e && e.addRules({
elements:{
input:function(a) {
return "hidden" == a.attributes.type ? d.createFakeParserElement(a, "cke_hidden", "hiddenfield") :void 0;
}
}
}, {
applyToAll:!0
});
}
}), CKEDITOR.env.ie && (CKEDITOR.dom.element.prototype.hasAttribute = CKEDITOR.tools.override(CKEDITOR.dom.element.prototype.hasAttribute, function(d) {
return function(e) {
if (this.$.attributes.getNamedItem(e), "input" == this.getName()) switch (e) {
case "class":
return this.$.className.length > 0;

case "checked":
return !!this.$.checked;

case "value":
var c = this.getAttribute("type");
return "checkbox" == c || "radio" == c ? "on" != this.$.value :this.$.value;
}
return d.apply(this, arguments);
};
})), function() {
var d = {
canUndo:!1,
exec:function(d) {
var c = d.document.createElement("hr");
d.insertElement(c);
},
allowedContent:"hr",
requiredContent:"hr"
};
CKEDITOR.plugins.add("horizontalrule", {
init:function(e) {
e.blockless || (e.addCommand("horizontalrule", d), e.ui.addButton && e.ui.addButton("HorizontalRule", {
label:e.lang.horizontalrule.toolbar,
command:"horizontalrule",
toolbar:"insert,40"
}));
}
});
}(), CKEDITOR.plugins.add("htmlwriter", {
init:function(d) {
var e = new CKEDITOR.htmlWriter();
e.forceSimpleAmpersand = d.config.forceSimpleAmpersand, e.indentationChars = d.config.dataIndentationChars || "	", 
d.dataProcessor.writer = e;
}
}), CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
base:CKEDITOR.htmlParser.basicWriter,
$:function() {
this.base(), this.indentationChars = "	", this.selfClosingEnd = " />", this.lineBreakChars = "\n", 
this.sortAttributes = 1, this._.indent = 0, this._.indentation = "", this._.inPre = 0, 
this._.rules = {};
var e, d = CKEDITOR.dtd;
for (e in CKEDITOR.tools.extend({}, d.$nonBodyContent, d.$block, d.$listItem, d.$tableContent)) this.setRules(e, {
indent:!d[e]["#"],
breakBeforeOpen:1,
breakBeforeClose:!d[e]["#"],
breakAfterClose:1,
needsSpace:e in d.$block && !(e in {
li:1,
dt:1,
dd:1
})
});
this.setRules("br", {
breakAfterOpen:1
}), this.setRules("title", {
indent:0,
breakAfterOpen:0
}), this.setRules("style", {
indent:0,
breakBeforeClose:1
}), this.setRules("pre", {
breakAfterOpen:1,
indent:0
});
},
proto:{
openTag:function(d) {
var e = this._.rules[d];
this._.afterCloser && e && e.needsSpace && this._.needsSpace && this._.output.push("\n"), 
this._.indent ? this.indentation() :e && e.breakBeforeOpen && (this.lineBreak(), 
this.indentation()), this._.output.push("<", d), this._.afterCloser = 0;
},
openTagClose:function(d, e) {
var c = this._.rules[d];
e ? (this._.output.push(this.selfClosingEnd), c && c.breakAfterClose && (this._.needsSpace = c.needsSpace)) :(this._.output.push(">"), 
c && c.indent && (this._.indentation = this._.indentation + this.indentationChars)), 
c && c.breakAfterOpen && this.lineBreak(), "pre" == d && (this._.inPre = 1);
},
attribute:function(d, e) {
"string" == typeof e && (this.forceSimpleAmpersand && (e = e.replace(/&amp;/g, "&")), 
e = CKEDITOR.tools.htmlEncodeAttr(e)), this._.output.push(" ", d, '="', e, '"');
},
closeTag:function(d) {
var e = this._.rules[d];
e && e.indent && (this._.indentation = this._.indentation.substr(this.indentationChars.length)), 
this._.indent ? this.indentation() :e && e.breakBeforeClose && (this.lineBreak(), 
this.indentation()), this._.output.push("</", d, ">"), "pre" == d && (this._.inPre = 0), 
e && e.breakAfterClose && (this.lineBreak(), this._.needsSpace = e.needsSpace), 
this._.afterCloser = 1;
},
text:function(d) {
this._.indent && (this.indentation(), !this._.inPre && (d = CKEDITOR.tools.ltrim(d))), 
this._.output.push(d);
},
comment:function(d) {
this._.indent && this.indentation(), this._.output.push("<!--", d, "-->");
},
lineBreak:function() {
!this._.inPre && this._.output.length > 0 && this._.output.push(this.lineBreakChars), 
this._.indent = 1;
},
indentation:function() {
!this._.inPre && this._.indentation && this._.output.push(this._.indentation), this._.indent = 0;
},
reset:function() {
this._.output = [], this._.indent = 0, this._.indentation = "", this._.afterCloser = 0, 
this._.inPre = 0;
},
setRules:function(d, e) {
var c = this._.rules[d];
c ? CKEDITOR.tools.extend(c, e, !0) :this._.rules[d] = e;
}
}
}), function() {
CKEDITOR.plugins.add("iframe", {
requires:"dialog,fakeobjects",
onLoad:function() {
CKEDITOR.addCss("img.cke_iframe{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}");
},
init:function(d) {
var e = d.lang.iframe, c = "iframe[align,longdesc,frameborder,height,name,scrolling,src,title,width]";
d.plugins.dialogadvtab && (c += ";iframe" + d.plugins.dialogadvtab.allowedContent({
id:1,
classes:1,
styles:1
})), CKEDITOR.dialog.add("iframe", this.path + "dialogs/iframe.js"), d.addCommand("iframe", new CKEDITOR.dialogCommand("iframe", {
allowedContent:c,
requiredContent:"iframe"
})), d.ui.addButton && d.ui.addButton("Iframe", {
label:e.toolbar,
command:"iframe",
toolbar:"insert,80"
}), d.on("doubleclick", function(a) {
var b = a.data.element;
b.is("img") && "iframe" == b.data("cke-real-element-type") && (a.data.dialog = "iframe");
}), d.addMenuItems && d.addMenuItems({
iframe:{
label:e.title,
command:"iframe",
group:"image"
}
}), d.contextMenu && d.contextMenu.addListener(function(a) {
return a && a.is("img") && "iframe" == a.data("cke-real-element-type") ? {
iframe:CKEDITOR.TRISTATE_OFF
} :void 0;
});
},
afterInit:function(d) {
var e = d.dataProcessor;
(e = e && e.dataFilter) && e.addRules({
elements:{
iframe:function(c) {
return d.createFakeParserElement(c, "cke_iframe", "iframe", !0);
}
}
});
}
});
}(), function() {
function d(c, a) {
return a || (a = c.getSelection().getSelectedElement()), a && a.is("img") && !a.data("cke-realelement") && !a.isReadOnly() ? a :void 0;
}
function e(c) {
var a = c.getStyle("float");
return ("inherit" == a || "none" == a) && (a = 0), a || (a = c.getAttribute("align")), 
a;
}
CKEDITOR.plugins.add("image", {
requires:"dialog",
init:function(c) {
if (!c.plugins.image2) {
CKEDITOR.dialog.add("image", this.path + "dialogs/image.js");
var a = "img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}";
CKEDITOR.dialog.isTabEnabled(c, "image", "advanced") && (a = "img[alt,dir,id,lang,longdesc,!src,title]{*}(*)"), 
c.addCommand("image", new CKEDITOR.dialogCommand("image", {
allowedContent:a,
requiredContent:"img[alt,src]",
contentTransformations:[ [ "img{width}: sizeToStyle", "img[width]: sizeToAttribute" ], [ "img{float}: alignmentToStyle", "img[align]: alignmentToAttribute" ] ]
})), c.ui.addButton && c.ui.addButton("Image", {
label:c.lang.common.image,
command:"image",
toolbar:"insert,10"
}), c.on("doubleclick", function(a) {
var c = a.data.element;
!c.is("img") || c.data("cke-realelement") || c.isReadOnly() || (a.data.dialog = "image");
}), c.addMenuItems && c.addMenuItems({
image:{
label:c.lang.image.menu,
command:"image",
group:"image"
}
}), c.contextMenu && c.contextMenu.addListener(function(a) {
return d(c, a) ? {
image:CKEDITOR.TRISTATE_OFF
} :void 0;
});
}
},
afterInit:function(c) {
function a(a) {
var j = c.getCommand("justify" + a);
j && (("left" == a || "right" == a) && j.on("exec", function(g) {
var f, h = d(c);
h && (f = e(h), f == a ? (h.removeStyle("float"), a == e(h) && h.removeAttribute("align")) :h.setStyle("float", a), 
g.cancel());
}), j.on("refresh", function(g) {
var h = d(c);
h && (h = e(h), this.setState(h == a ? CKEDITOR.TRISTATE_ON :"right" == a || "left" == a ? CKEDITOR.TRISTATE_OFF :CKEDITOR.TRISTATE_DISABLED), 
g.cancel());
}));
}
c.plugins.image2 || (a("left"), a("right"), a("center"), a("block"));
}
});
}(), CKEDITOR.config.image_removeLinkByEmptyURL = !0, function() {
function d(a, b) {
var d, g;
b.on("refresh", function(a) {
var d, b = [ e ];
for (d in a.data.states) b.push(a.data.states[d]);
this.setState(CKEDITOR.tools.search(b, c) ? c :e);
}, b, null, 100), b.on("exec", function(b) {
d = a.getSelection(), g = d.createBookmarks(1), b.data || (b.data = {}), b.data.done = !1;
}, b, null, 0), b.on("exec", function() {
a.forceNextSelectionCheck(), d.selectBookmarks(g);
}, b, null, 100);
}
var e = CKEDITOR.TRISTATE_DISABLED, c = CKEDITOR.TRISTATE_OFF;
CKEDITOR.plugins.add("indent", {
init:function(a) {
var b = CKEDITOR.plugins.indent.genericDefinition;
d(a, a.addCommand("indent", new b(!0))), d(a, a.addCommand("outdent", new b())), 
a.ui.addButton && (a.ui.addButton("Indent", {
label:a.lang.indent.indent,
command:"indent",
directional:!0,
toolbar:"indent,20"
}), a.ui.addButton("Outdent", {
label:a.lang.indent.outdent,
command:"outdent",
directional:!0,
toolbar:"indent,10"
})), a.on("dirChanged", function(b) {
var c = a.createRange(), d = b.data.node;
c.setStartBefore(d), c.setEndAfter(d);
for (var i, e = new CKEDITOR.dom.walker(c); i = e.next(); ) if (i.type == CKEDITOR.NODE_ELEMENT) if (!i.equals(d) && i.getDirection()) c.setStartAfter(i), 
e = new CKEDITOR.dom.walker(c); else {
var k = a.config.indentClasses;
if (k) for (var n = "ltr" == b.data.dir ? [ "_rtl", "" ] :[ "", "_rtl" ], o = 0; o < k.length; o++) i.hasClass(k[o] + n[0]) && (i.removeClass(k[o] + n[0]), 
i.addClass(k[o] + n[1]));
k = i.getStyle("margin-right"), n = i.getStyle("margin-left"), k ? i.setStyle("margin-left", k) :i.removeStyle("margin-left"), 
n ? i.setStyle("margin-right", n) :i.removeStyle("margin-right");
}
});
}
}), CKEDITOR.plugins.indent = {
genericDefinition:function(a) {
this.isIndent = !!a, this.startDisabled = !this.isIndent;
},
specificDefinition:function(a, b, c) {
this.name = b, this.editor = a, this.jobs = {}, this.enterBr = a.config.enterMode == CKEDITOR.ENTER_BR, 
this.isIndent = !!c, this.relatedGlobal = c ? "indent" :"outdent", this.indentKey = c ? 9 :CKEDITOR.SHIFT + 9, 
this.database = {};
},
registerCommands:function(a, b) {
a.on("pluginsLoaded", function() {
for (var a in b) (function(a, b) {
var d, c = a.getCommand(b.relatedGlobal);
for (d in b.jobs) c.on("exec", function(c) {
c.data.done || (a.fire("lockSnapshot"), b.execJob(a, d) && (c.data.done = !0), a.fire("unlockSnapshot"), 
CKEDITOR.dom.element.clearAllMarkers(b.database));
}, this, null, d), c.on("refresh", function(c) {
c.data.states || (c.data.states = {}), c.data.states[b.name + "@" + d] = b.refreshJob(a, d, c.data.path);
}, this, null, d);
a.addFeature(b);
})(this, b[a]);
});
}
}, CKEDITOR.plugins.indent.genericDefinition.prototype = {
context:"p",
exec:function() {}
}, CKEDITOR.plugins.indent.specificDefinition.prototype = {
execJob:function(a, b) {
var c = this.jobs[b];
return c.state != e ? c.exec.call(this, a) :void 0;
},
refreshJob:function(a, b, c) {
return b = this.jobs[b], b.state = a.activeFilter.checkFeature(this) ? b.refresh.call(this, a, c) :e, 
b.state;
},
getContext:function(a) {
return a.contains(this.context);
}
};
}(), function() {
function d(b) {
function d(c) {
for (var j = l.startContainer, i = l.endContainer; j && !j.getParent().equals(c); ) j = j.getParent();
for (;i && !i.getParent().equals(c); ) i = i.getParent();
if (!j || !i) return !1;
for (var m = j, j = [], r = !1; !r; ) m.equals(i) && (r = !0), j.push(m), m = m.getNext();
if (j.length < 1) return !1;
for (m = c.getParents(!0), i = 0; i < m.length; i++) if (m[i].getName && h[m[i].getName()]) {
c = m[i];
break;
}
for (var m = e.isIndent ? 1 :-1, i = j[0], j = j[j.length - 1], r = CKEDITOR.plugins.list.listToArray(c, g), q = r[j.getCustomData("listarray_index")].indent, i = i.getCustomData("listarray_index"); i <= j.getCustomData("listarray_index"); i++) if (r[i].indent = r[i].indent + m, 
m > 0) {
var s = r[i].parent;
r[i].parent = new CKEDITOR.dom.element(s.getName(), s.getDocument());
}
for (i = j.getCustomData("listarray_index") + 1; i < r.length && r[i].indent > q; i++) r[i].indent = r[i].indent + m;
if (j = CKEDITOR.plugins.list.arrayToList(r, g, null, b.config.enterMode, c.getDirection()), 
!e.isIndent) {
var x;
if ((x = c.getParent()) && x.is("li")) for (var z, m = j.listNode.getChildren(), y = [], i = m.count() - 1; i >= 0; i--) (z = m.getItem(i)) && z.is && z.is("li") && y.push(z);
}
if (j && j.listNode.replace(c), y && y.length) for (i = 0; i < y.length; i++) {
for (z = c = y[i]; (z = z.getNext()) && z.is && z.getName() in h; ) CKEDITOR.env.needsNbspFiller && !c.getFirst(a) && c.append(l.document.createText("\xa0")), 
c.append(z);
c.insertAfter(x);
}
return j && b.fire("contentDomInvalidated"), !0;
}
for (var l, e = this, g = this.database, h = this.context, j = b.getSelection(), j = (j && j.getRanges()).createIterator(); l = j.getNextRange(); ) {
for (var m = l.getCommonAncestor(); m && (m.type != CKEDITOR.NODE_ELEMENT || !h[m.getName()]); ) m = m.getParent();
if (m || (m = l.startPath().contains(h)) && l.setEndAt(m, CKEDITOR.POSITION_BEFORE_END), 
!m) {
var r = l.getEnclosedNode();
r && r.type == CKEDITOR.NODE_ELEMENT && r.getName() in h && (l.setStartAt(r, CKEDITOR.POSITION_AFTER_START), 
l.setEndAt(r, CKEDITOR.POSITION_BEFORE_END), m = r);
}
if (m && l.startContainer.type == CKEDITOR.NODE_ELEMENT && l.startContainer.getName() in h && (r = new CKEDITOR.dom.walker(l), 
r.evaluator = c, l.startContainer = r.next()), m && l.endContainer.type == CKEDITOR.NODE_ELEMENT && l.endContainer.getName() in h && (r = new CKEDITOR.dom.walker(l), 
r.evaluator = c, l.endContainer = r.previous()), m) return d(m);
}
return 0;
}
function e(a, b) {
return b || (b = a.contains(this.context)), b && a.block && a.block.equals(b.getFirst(c));
}
function c(a) {
return a.type == CKEDITOR.NODE_ELEMENT && a.is("li");
}
function a(a) {
return b(a) && j(a);
}
var b = CKEDITOR.dom.walker.whitespaces(!0), j = CKEDITOR.dom.walker.bookmark(!1, !0), g = CKEDITOR.TRISTATE_DISABLED, h = CKEDITOR.TRISTATE_OFF;
CKEDITOR.plugins.add("indentlist", {
requires:"indent",
init:function(a) {
function b(a) {
c.specificDefinition.apply(this, arguments), this.requiredContent = [ "ul", "ol" ], 
a.on("key", function(b) {
if ("wysiwyg" == a.mode && b.data.keyCode == this.indentKey) {
var c = this.getContext(a.elementPath());
!c || this.isIndent && e.call(this, a.elementPath(), c) || (a.execCommand(this.relatedGlobal), 
b.cancel());
}
}, this), this.jobs[this.isIndent ? 10 :30] = {
refresh:this.isIndent ? function(a, b) {
var c = this.getContext(b), d = e.call(this, b, c);
return c && this.isIndent && !d ? h :g;
} :function(a, b) {
return !this.getContext(b) || this.isIndent ? g :h;
},
exec:CKEDITOR.tools.bind(d, this)
};
}
var c = CKEDITOR.plugins.indent;
c.registerCommands(a, {
indentlist:new b(a, "indentlist", !0),
outdentlist:new b(a, "outdentlist")
}), CKEDITOR.tools.extend(b.prototype, c.specificDefinition.prototype, {
context:{
ol:1,
ul:1
}
});
}
});
}(), function() {
function d(a, b, c) {
if (!a.getCustomData("indent_processed")) {
var d = this.editor, j = this.isIndent;
if (b) {
if (d = a.$.className.match(this.classNameRegex), c = 0, d && (d = d[1], c = CKEDITOR.tools.indexOf(b, d) + 1), 
(c += j ? 1 :-1) < 0) return;
c = Math.min(c, b.length), c = Math.max(c, 0), a.$.className = CKEDITOR.tools.ltrim(a.$.className.replace(this.classNameRegex, "")), 
c > 0 && a.addClass(b[c - 1]);
} else {
var b = e(a, c), c = parseInt(a.getStyle(b), 10), n = d.config.indentOffset || 40;
if (isNaN(c) && (c = 0), c += (j ? 1 :-1) * n, 0 > c) return;
c = Math.max(c, 0), c = Math.ceil(c / n) * n, a.setStyle(b, c ? c + (d.config.indentUnit || "px") :""), 
"" === a.getAttribute("style") && a.removeAttribute("style");
}
CKEDITOR.dom.element.setMarker(this.database, a, "indent_processed", 1);
}
}
function e(a, b) {
return "ltr" == (b || a.getComputedStyle("direction")) ? "margin-left" :"margin-right";
}
var c = CKEDITOR.dtd.$listItem, a = CKEDITOR.dtd.$list, b = CKEDITOR.TRISTATE_DISABLED, j = CKEDITOR.TRISTATE_OFF;
CKEDITOR.plugins.add("indentblock", {
requires:"indent",
init:function(g) {
function h() {
f.specificDefinition.apply(this, arguments), this.allowedContent = {
"div h1 h2 h3 h4 h5 h6 ol p pre ul":{
propertiesOnly:!0,
styles:i ? null :"margin-left,margin-right",
classes:i || null
}
}, this.enterBr && (this.allowedContent.div = !0), this.requiredContent = (this.enterBr ? "div" :"p") + (i ? "(" + i.join(",") + ")" :"{margin-left}"), 
this.jobs = {
20:{
refresh:function(a, d) {
var g = d.block || d.blockLimit;
if (g.is(c)) g = g.getParent(); else if (g.getAscendant(c)) return b;
if (!this.enterBr && !this.getContext(d)) return b;
if (i) {
var f;
f = i;
var g = g.$.className.match(this.classNameRegex), h = this.isIndent;
return f = g ? h ? g[1] != f.slice(-1) :!0 :h, f ? j :b;
}
return this.isIndent ? j :g ? CKEDITOR[(parseInt(g.getStyle(e(g)), 10) || 0) <= 0 ? "TRISTATE_DISABLED" :"TRISTATE_OFF"] :b;
},
exec:function(b) {
var e, c = b.getSelection(), c = c && c.getRanges()[0];
if (e = b.elementPath().contains(a)) d.call(this, e, i); else for (c = c.createIterator(), 
b = b.config.enterMode, c.enforceRealBlocks = !0, c.enlargeBr = b != CKEDITOR.ENTER_BR; e = c.getNextParagraph(b == CKEDITOR.ENTER_P ? "p" :"div"); ) e.isReadOnly() || d.call(this, e, i);
return !0;
}
}
};
}
var f = CKEDITOR.plugins.indent, i = g.config.indentClasses;
f.registerCommands(g, {
indentblock:new h(g, "indentblock", !0),
outdentblock:new h(g, "outdentblock")
}), CKEDITOR.tools.extend(h.prototype, f.specificDefinition.prototype, {
context:{
div:1,
dl:1,
h1:1,
h2:1,
h3:1,
h4:1,
h5:1,
h6:1,
ul:1,
ol:1,
p:1,
pre:1,
table:1
},
classNameRegex:i ? RegExp("(?:^|\\s+)(" + i.join("|") + ")(?=$|\\s)") :null
});
}
});
}(), function() {
function d(a, b) {
var c, b = void 0 === b || b;
if (b) c = a.getComputedStyle("text-align"); else {
for (;(!a.hasAttribute || !a.hasAttribute("align") && !a.getStyle("text-align")) && (c = a.getParent(), 
c); ) a = c;
c = a.getStyle("text-align") || a.getAttribute("align") || "";
}
return c && (c = c.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i, "")), !c && b && (c = "rtl" == a.getComputedStyle("direction") ? "right" :"left"), 
c;
}
function e(a, b, c) {
this.editor = a, this.name = b, this.value = c, this.context = "p";
var b = a.config.justifyClasses, d = a.config.enterMode == CKEDITOR.ENTER_P ? "p" :"div";
if (b) {
switch (c) {
case "left":
this.cssClassName = b[0];
break;

case "center":
this.cssClassName = b[1];
break;

case "right":
this.cssClassName = b[2];
break;

case "justify":
this.cssClassName = b[3];
}
this.cssClassRegex = RegExp("(?:^|\\s+)(?:" + b.join("|") + ")(?=$|\\s)"), this.requiredContent = d + "(" + this.cssClassName + ")";
} else this.requiredContent = d + "{text-align}";
this.allowedContent = {
"caption div h1 h2 h3 h4 h5 h6 p pre td th li":{
propertiesOnly:!0,
styles:this.cssClassName ? null :"text-align",
classes:this.cssClassName || null
}
}, a.config.enterMode == CKEDITOR.ENTER_BR && (this.allowedContent.div = !0);
}
function c(a) {
var b = a.editor, c = b.createRange();
c.setStartBefore(a.data.node), c.setEndAfter(a.data.node);
for (var e, d = new CKEDITOR.dom.walker(c); e = d.next(); ) if (e.type == CKEDITOR.NODE_ELEMENT) if (!e.equals(a.data.node) && e.getDirection()) c.setStartAfter(e), 
d = new CKEDITOR.dom.walker(c); else {
var f = b.config.justifyClasses;
f && (e.hasClass(f[0]) ? (e.removeClass(f[0]), e.addClass(f[2])) :e.hasClass(f[2]) && (e.removeClass(f[2]), 
e.addClass(f[0]))), f = e.getStyle("text-align"), "left" == f ? e.setStyle("text-align", "right") :"right" == f && e.setStyle("text-align", "left");
}
}
e.prototype = {
exec:function(a) {
var b = a.getSelection(), c = a.config.enterMode;
if (b) {
for (var i, k, e = b.createBookmarks(), h = b.getRanges(), f = this.cssClassName, n = a.config.useComputedState, n = void 0 === n || n, o = h.length - 1; o >= 0; o--) for (i = h[o].createIterator(), 
i.enlargeBr = c != CKEDITOR.ENTER_BR; k = i.getNextParagraph(c == CKEDITOR.ENTER_P ? "p" :"div"); ) if (!k.isReadOnly()) {
k.removeAttribute("align"), k.removeStyle("text-align");
var q = f && (k.$.className = CKEDITOR.tools.ltrim(k.$.className.replace(this.cssClassRegex, ""))), l = this.state == CKEDITOR.TRISTATE_OFF && (!n || d(k, !0) != this.value);
f ? l ? k.addClass(f) :q || k.removeAttribute("class") :l && k.setStyle("text-align", this.value);
}
a.focus(), a.forceNextSelectionCheck(), b.selectBookmarks(e);
}
},
refresh:function(a, b) {
var c = b.block || b.blockLimit;
this.setState("body" != c.getName() && d(c, this.editor.config.useComputedState) == this.value ? CKEDITOR.TRISTATE_ON :CKEDITOR.TRISTATE_OFF);
}
}, CKEDITOR.plugins.add("justify", {
init:function(a) {
if (!a.blockless) {
var b = new e(a, "justifyleft", "left"), d = new e(a, "justifycenter", "center"), g = new e(a, "justifyright", "right"), h = new e(a, "justifyblock", "justify");
a.addCommand("justifyleft", b), a.addCommand("justifycenter", d), a.addCommand("justifyright", g), 
a.addCommand("justifyblock", h), a.ui.addButton && (a.ui.addButton("JustifyLeft", {
label:a.lang.justify.left,
command:"justifyleft",
toolbar:"align,10"
}), a.ui.addButton("JustifyCenter", {
label:a.lang.justify.center,
command:"justifycenter",
toolbar:"align,20"
}), a.ui.addButton("JustifyRight", {
label:a.lang.justify.right,
command:"justifyright",
toolbar:"align,30"
}), a.ui.addButton("JustifyBlock", {
label:a.lang.justify.block,
command:"justifyblock",
toolbar:"align,40"
})), a.on("dirChanged", c);
}
}
});
}(), CKEDITOR.plugins.add("link", {
requires:"dialog,fakeobjects",
onLoad:function() {
function d(a) {
return c.replace(/%1/g, "rtl" == a ? "right" :"left").replace(/%2/g, "cke_contents_" + a);
}
var e = "background:url(" + CKEDITOR.getUrl(this.path + "images" + (CKEDITOR.env.hidpi ? "/hidpi" :"") + "/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;background-size:16px;", c = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + e + "padding-%1:18px;cursor:auto;}" + (CKEDITOR.plugins.link.synAnchorSelector ? "a.cke_anchor_empty{display:inline-block;" + (CKEDITOR.env.ie && CKEDITOR.env.version > 10 ? "min-height:16px;vertical-align:middle" :"") + "}" :"") + ".%2 img.cke_anchor{" + e + "width:16px;min-height:15px;height:1.15em;vertical-align:" + (CKEDITOR.env.opera ? "middle" :"text-bottom") + ";}";
CKEDITOR.addCss(d("ltr") + d("rtl"));
},
init:function(d) {
var e = "a[!href]";
CKEDITOR.dialog.isTabEnabled(d, "link", "advanced") && (e = e.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type]{*}(*)")), 
CKEDITOR.dialog.isTabEnabled(d, "link", "target") && (e = e.replace("]", ",target,onclick]")), 
d.addCommand("link", new CKEDITOR.dialogCommand("link", {
allowedContent:e,
requiredContent:"a[href]"
})), d.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", {
allowedContent:"a[!name,id]",
requiredContent:"a[name]"
})), d.addCommand("unlink", new CKEDITOR.unlinkCommand()), d.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand()), 
d.setKeystroke(CKEDITOR.CTRL + 76, "link"), d.ui.addButton && (d.ui.addButton("Link", {
label:d.lang.link.toolbar,
command:"link",
toolbar:"links,10"
}), d.ui.addButton("Unlink", {
label:d.lang.link.unlink,
command:"unlink",
toolbar:"links,20"
}), d.ui.addButton("Anchor", {
label:d.lang.link.anchor.toolbar,
command:"anchor",
toolbar:"links,30"
})), CKEDITOR.dialog.add("link", this.path + "dialogs/link.js"), CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js"), 
d.on("doubleclick", function(c) {
var a = CKEDITOR.plugins.link.getSelectedLink(d) || c.data.element;
a.isReadOnly() || (a.is("a") ? (c.data.dialog = !a.getAttribute("name") || a.getAttribute("href") && a.getChildCount() ? "link" :"anchor", 
d.getSelection().selectElement(a)) :CKEDITOR.plugins.link.tryRestoreFakeAnchor(d, a) && (c.data.dialog = "anchor"));
}), d.addMenuItems && d.addMenuItems({
anchor:{
label:d.lang.link.anchor.menu,
command:"anchor",
group:"anchor",
order:1
},
removeAnchor:{
label:d.lang.link.anchor.remove,
command:"removeAnchor",
group:"anchor",
order:5
},
link:{
label:d.lang.link.menu,
command:"link",
group:"link",
order:1
},
unlink:{
label:d.lang.link.unlink,
command:"unlink",
group:"link",
order:5
}
}), d.contextMenu && d.contextMenu.addListener(function(c) {
if (!c || c.isReadOnly()) return null;
if (c = CKEDITOR.plugins.link.tryRestoreFakeAnchor(d, c), !c && !(c = CKEDITOR.plugins.link.getSelectedLink(d))) return null;
var a = {};
return c.getAttribute("href") && c.getChildCount() && (a = {
link:CKEDITOR.TRISTATE_OFF,
unlink:CKEDITOR.TRISTATE_OFF
}), c && c.hasAttribute("name") && (a.anchor = a.removeAnchor = CKEDITOR.TRISTATE_OFF), 
a;
});
},
afterInit:function(d) {
var e = d.dataProcessor, c = e && e.dataFilter, e = e && e.htmlFilter, a = d._.elementsPath && d._.elementsPath.filters;
c && c.addRules({
elements:{
a:function(a) {
var c = a.attributes;
if (!c.name) return null;
var e = !a.children.length;
if (CKEDITOR.plugins.link.synAnchorSelector) {
var a = e ? "cke_anchor_empty" :"cke_anchor", h = c["class"];
c.name && (!h || h.indexOf(a) < 0) && (c["class"] = (h || "") + " " + a), e && CKEDITOR.plugins.link.emptyAnchorFix && (c.contenteditable = "false", 
c["data-cke-editable"] = 1);
} else if (CKEDITOR.plugins.link.fakeAnchor && e) return d.createFakeParserElement(a, "cke_anchor", "anchor");
return null;
}
}
}), CKEDITOR.plugins.link.emptyAnchorFix && e && e.addRules({
elements:{
a:function(a) {
delete a.attributes.contenteditable;
}
}
}), a && a.push(function(a, c) {
return "a" != c || !CKEDITOR.plugins.link.tryRestoreFakeAnchor(d, a) && (!a.getAttribute("name") || a.getAttribute("href") && a.getChildCount()) ? void 0 :"anchor";
});
}
}), CKEDITOR.plugins.link = {
getSelectedLink:function(d) {
var e = d.getSelection(), c = e.getSelectedElement();
return c && c.is("a") ? c :(e = e.getRanges()[0]) ? (e.shrink(CKEDITOR.SHRINK_TEXT), 
d.elementPath(e.getCommonAncestor()).contains("a", 1)) :null;
},
fakeAnchor:CKEDITOR.env.opera || CKEDITOR.env.webkit,
synAnchorSelector:CKEDITOR.env.ie,
emptyAnchorFix:CKEDITOR.env.ie && 8 > CKEDITOR.env.version,
tryRestoreFakeAnchor:function(d, e) {
if (e && e.data("cke-real-element-type") && "anchor" == e.data("cke-real-element-type")) {
var c = d.restoreRealElement(e);
if (c.data("cke-saved-name")) return c;
}
}
}, CKEDITOR.unlinkCommand = function() {}, CKEDITOR.unlinkCommand.prototype = {
exec:function(d) {
var e = new CKEDITOR.style({
element:"a",
type:CKEDITOR.STYLE_INLINE,
alwaysRemoveElement:1
});
d.removeStyle(e);
},
refresh:function(d, e) {
var c = e.lastElement && e.lastElement.getAscendant("a", !0);
c && "a" == c.getName() && c.getAttribute("href") && c.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) :this.setState(CKEDITOR.TRISTATE_DISABLED);
},
contextSensitive:1,
startDisabled:1,
requiredContent:"a[href]"
}, CKEDITOR.removeAnchorCommand = function() {}, CKEDITOR.removeAnchorCommand.prototype = {
exec:function(d) {
var a, e = d.getSelection(), c = e.createBookmarks();
e && (a = e.getSelectedElement()) && (CKEDITOR.plugins.link.fakeAnchor && !a.getChildCount() ? CKEDITOR.plugins.link.tryRestoreFakeAnchor(d, a) :a.is("a")) ? a.remove(1) :(a = CKEDITOR.plugins.link.getSelectedLink(d)) && (a.hasAttribute("href") ? (a.removeAttributes({
name:1,
"data-cke-saved-name":1
}), a.removeClass("cke_anchor")) :a.remove(1)), e.selectBookmarks(c);
},
requiredContent:"a[name]"
}, CKEDITOR.tools.extend(CKEDITOR.config, {
linkShowAdvancedTab:!0,
linkShowTargetTab:!0
}), function() {
function d(a, b, c) {
function d(c) {
!(j = i[c ? "getFirst" :"getLast"]()) || j.is && j.isBlockBoundary() || !(k = b.root[c ? "getPrevious" :"getNext"](CKEDITOR.dom.walker.invisible(!0))) || k.is && k.isBlockBoundary({
br:1
}) || a.document.createElement("br")[c ? "insertBefore" :"insertAfter"](j);
}
for (var e = CKEDITOR.plugins.list.listToArray(b.root, c), g = [], f = 0; f < b.contents.length; f++) {
var h = b.contents[f];
(h = h.getAscendant("li", !0)) && !h.getCustomData("list_item_processed") && (g.push(h), 
CKEDITOR.dom.element.setMarker(c, h, "list_item_processed", !0));
}
for (h = null, f = 0; f < g.length; f++) h = g[f].getCustomData("listarray_index"), 
e[h].indent = -1;
for (f = h + 1; f < e.length; f++) if (e[f].indent > e[f - 1].indent + 1) {
for (g = e[f - 1].indent + 1 - e[f].indent, h = e[f].indent; e[f] && e[f].indent >= h; ) e[f].indent = e[f].indent + g, 
f++;
f--;
}
var j, k, i = CKEDITOR.plugins.list.arrayToList(e, c, null, a.config.enterMode, b.root.getAttribute("dir")).listNode;
d(!0), d(), i.replace(b.root), a.fire("contentDomInvalidated");
}
function e(a, b) {
this.name = a, this.context = this.type = b, this.allowedContent = b + " li", this.requiredContent = b;
}
function c(a, b, c, d) {
for (var e, g; e = a[d ? "getLast" :"getFirst"](q); ) (g = e.getDirection(1)) !== b.getDirection(1) && e.setAttribute("dir", g), 
e.remove(), c ? e[d ? "insertBefore" :"insertAfter"](c) :b.append(e, d);
}
function a(a) {
var b;
(b = function(b) {
var d = a[b ? "getPrevious" :"getNext"](k);
d && d.type == CKEDITOR.NODE_ELEMENT && d.is(a.getName()) && (c(a, d, null, !b), 
a.remove(), a = d);
})(), b(1);
}
function b(a) {
return a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in CKEDITOR.dtd.$block || a.getName() in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[a.getName()]["#"];
}
function j(b, d, e) {
b.fire("saveSnapshot"), e.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);
var f = e.extractContents();
d.trim(!1, !0);
var h = d.createBookmark(), i = new CKEDITOR.dom.elementPath(d.startContainer), j = i.block, i = i.lastElement.getAscendant("li", 1) || j, o = new CKEDITOR.dom.elementPath(e.startContainer), q = o.contains(CKEDITOR.dtd.$listItem), o = o.contains(CKEDITOR.dtd.$list);
for (j ? (j = j.getBogus()) && j.remove() :o && (j = o.getPrevious(k)) && n(j) && j.remove(), 
(j = f.getLast()) && j.type == CKEDITOR.NODE_ELEMENT && j.is("br") && j.remove(), 
(j = d.startContainer.getChild(d.startOffset)) ? f.insertBefore(j) :d.startContainer.append(f), 
q && (f = g(q)) && (i.contains(q) ? (c(f, q.getParent(), q), f.remove()) :i.append(f)); e.checkStartOfBlock() && e.checkEndOfBlock() && (o = e.startPath(), 
f = o.block, f); ) f.is("li") && (i = f.getParent(), f.equals(i.getLast(k)) && f.equals(i.getFirst(k)) && (f = i)), 
e.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START), f.remove();
e = e.clone(), f = b.editable(), e.setEndAt(f, CKEDITOR.POSITION_BEFORE_END), e = new CKEDITOR.dom.walker(e), 
e.evaluator = function(a) {
return k(a) && !n(a);
}, (e = e.next()) && e.type == CKEDITOR.NODE_ELEMENT && e.getName() in CKEDITOR.dtd.$list && a(e), 
d.moveToBookmark(h), d.select(), b.fire("saveSnapshot");
}
function g(a) {
return (a = a.getLast(k)) && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in h ? a :null;
}
var h = {
ol:1,
ul:1
}, f = CKEDITOR.dom.walker.whitespaces(), i = CKEDITOR.dom.walker.bookmark(), k = function(a) {
return !(f(a) || i(a));
}, n = CKEDITOR.dom.walker.bogus();
CKEDITOR.plugins.list = {
listToArray:function(a, b, c, d, e) {
if (!h[a.getName()]) return [];
d || (d = 0), c || (c = []);
for (var g = 0, f = a.getChildCount(); f > g; g++) {
var i = a.getChild(g);
if (i.type == CKEDITOR.NODE_ELEMENT && i.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(i, b, c, d + 1), 
"li" == i.$.nodeName.toLowerCase()) {
var j = {
parent:a,
indent:d,
element:i,
contents:[]
};
e ? j.grandparent = e :(j.grandparent = a.getParent(), j.grandparent && "li" == j.grandparent.$.nodeName.toLowerCase() && (j.grandparent = j.grandparent.getParent())), 
b && CKEDITOR.dom.element.setMarker(b, i, "listarray_index", c.length), c.push(j);
for (var n, k = 0, o = i.getChildCount(); o > k; k++) n = i.getChild(k), n.type == CKEDITOR.NODE_ELEMENT && h[n.getName()] ? CKEDITOR.plugins.list.listToArray(n, b, c, d + 1, j.grandparent) :j.contents.push(n);
}
}
return c;
},
arrayToList:function(a, b, c, d, e) {
if (c || (c = 0), !a || a.length < c + 1) return null;
for (var g, z, B, f = a[c].parent.getDocument(), j = new CKEDITOR.dom.documentFragment(f), o = null, n = c, q = Math.max(a[c].indent, 0), y = null, F = d == CKEDITOR.ENTER_P ? "p" :"div"; ;) {
var C = a[n];
if (g = C.grandparent, z = C.element.getDirection(1), C.indent == q) {
for (o && a[n].parent.getName() == o.getName() || (o = a[n].parent.clone(!1, 1), 
e && o.setAttribute("dir", e), j.append(o)), y = o.append(C.element.clone(0, 1)), 
z != o.getDirection(1) && y.setAttribute("dir", z), g = 0; g < C.contents.length; g++) y.append(C.contents[g].clone(1, 1));
n++;
} else if (C.indent == Math.max(q, 0) + 1) C = a[n - 1].element.getDirection(1), 
n = CKEDITOR.plugins.list.arrayToList(a, null, n, d, C != z ? z :null), !y.getChildCount() && CKEDITOR.env.needsNbspFiller && !(f.$.documentMode > 7) && y.append(f.createText("\xa0")), 
y.append(n.listNode), n = n.nextIndex; else {
if (-1 != C.indent || c || !g) return null;
h[g.getName()] ? (y = C.element.clone(!1, !0), z != g.getDirection(1) && y.setAttribute("dir", z)) :y = new CKEDITOR.dom.documentFragment(f);
var G, L, o = g.getDirection(1) != z, D = C.element, E = D.getAttribute("class"), I = D.getAttribute("style"), J = y.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (d != CKEDITOR.ENTER_BR || o || I || E), P = C.contents.length;
for (g = 0; P > g; g++) if (G = C.contents[g], i(G) && P > 1) J ? L = G.clone(1, 1) :y.append(G.clone(1, 1)); else if (G.type == CKEDITOR.NODE_ELEMENT && G.isBlockBoundary()) {
o && !G.getDirection() && G.setAttribute("dir", z), B = G;
var K = D.getAttribute("style");
K && B.setAttribute("style", K.replace(/([^;])$/, "$1;") + (B.getAttribute("style") || "")), 
E && G.addClass(E), B = null, L && (y.append(L), L = null), y.append(G.clone(1, 1));
} else J ? (B || (B = f.createElement(F), y.append(B), o && B.setAttribute("dir", z)), 
I && B.setAttribute("style", I), E && B.setAttribute("class", E), L && (B.append(L), 
L = null), B.append(G.clone(1, 1))) :y.append(G.clone(1, 1));
L && ((B || y).append(L), L = null), y.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && n != a.length - 1 && (CKEDITOR.env.needsBrFiller && (z = y.getLast()) && z.type == CKEDITOR.NODE_ELEMENT && z.is("br") && z.remove(), 
z = y.getLast(k), (!z || !(z.type == CKEDITOR.NODE_ELEMENT && z.is(CKEDITOR.dtd.$block))) && y.append(f.createElement("br"))), 
z = y.$.nodeName.toLowerCase(), ("div" == z || "p" == z) && y.appendBogus(), j.append(y), 
o = null, n++;
}
if (B = null, a.length <= n || Math.max(a[n].indent, 0) < q) break;
}
if (b) for (a = j.getFirst(); a; ) {
if (a.type == CKEDITOR.NODE_ELEMENT && (CKEDITOR.dom.element.clearMarkers(b, a), 
a.getName() in CKEDITOR.dtd.$listItem && (c = a, f = e = d = void 0, d = c.getDirection()))) {
for (e = c.getParent(); e && !(f = e.getDirection()); ) e = e.getParent();
d == f && c.removeAttribute("dir");
}
a = a.getNextSourceNode();
}
return {
listNode:j,
nextIndex:n
};
}
};
var o = /^h[1-6]$/, q = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);
e.prototype = {
exec:function(b) {
this.refresh(b, b.elementPath());
var c = b.config, e = b.getSelection(), g = e && e.getRanges();
if (this.state == CKEDITOR.TRISTATE_OFF) {
var f = b.editable();
if (f.getFirst(k)) {
var j = 1 == g.length && g[0];
(c = j && j.getEnclosedNode()) && c.is && this.type == c.getName() && this.setState(CKEDITOR.TRISTATE_ON);
} else c.enterMode == CKEDITOR.ENTER_BR ? f.appendBogus() :g[0].fixBlock(1, c.enterMode == CKEDITOR.ENTER_P ? "p" :"div"), 
e.selectRanges(g);
}
for (var c = e.createBookmarks(!0), f = [], i = {}, g = g.createIterator(), n = 0; (j = g.getNextRange()) && ++n; ) {
var q = j.getBoundaryNodes(), s = q.startNode, x = q.endNode;
for (s.type == CKEDITOR.NODE_ELEMENT && "td" == s.getName() && j.setStartAt(q.startNode, CKEDITOR.POSITION_AFTER_START), 
x.type == CKEDITOR.NODE_ELEMENT && "td" == x.getName() && j.setEndAt(q.endNode, CKEDITOR.POSITION_BEFORE_END), 
j = j.createIterator(), j.forceBrBreak = this.state == CKEDITOR.TRISTATE_OFF; q = j.getNextParagraph(); ) if (!q.getCustomData("list_block")) {
CKEDITOR.dom.element.setMarker(i, q, "list_block", 1);
for (var z, y = b.elementPath(q), s = y.elements, x = 0, y = y.blockLimit, B = s.length - 1; B >= 0 && (z = s[B]); B--) if (h[z.getName()] && y.contains(z)) {
y.removeCustomData("list_group_object_" + n), (s = z.getCustomData("list_group_object")) ? s.contents.push(q) :(s = {
root:z,
contents:[ q ]
}, f.push(s), CKEDITOR.dom.element.setMarker(i, z, "list_group_object", s)), x = 1;
break;
}
x || (x = y, x.getCustomData("list_group_object_" + n) ? x.getCustomData("list_group_object_" + n).contents.push(q) :(s = {
root:x,
contents:[ q ]
}, CKEDITOR.dom.element.setMarker(i, x, "list_group_object_" + n, s), f.push(s)));
}
}
for (z = []; f.length > 0; ) if (s = f.shift(), this.state == CKEDITOR.TRISTATE_OFF) if (h[s.root.getName()]) {
for (g = b, n = s, s = i, j = z, x = CKEDITOR.plugins.list.listToArray(n.root, s), 
y = [], q = 0; q < n.contents.length; q++) B = n.contents[q], (B = B.getAscendant("li", !0)) && !B.getCustomData("list_item_processed") && (y.push(B), 
CKEDITOR.dom.element.setMarker(s, B, "list_item_processed", !0));
for (var B = n.root.getDocument(), F = void 0, C = void 0, q = 0; q < y.length; q++) {
var D = y[q].getCustomData("listarray_index"), F = x[D].parent;
F.is(this.type) || (C = B.createElement(this.type), F.copyAttributes(C, {
start:1,
type:1
}), C.removeStyle("list-style-type"), x[D].parent = C);
}
for (s = CKEDITOR.plugins.list.arrayToList(x, s, null, g.config.enterMode), x = void 0, 
y = s.listNode.getChildCount(), q = 0; y > q && (x = s.listNode.getChild(q)); q++) x.getName() == this.type && j.push(x);
s.listNode.replace(n.root), g.fire("contentDomInvalidated");
} else {
for (x = b, q = s, j = z, y = q.contents, g = q.root.getDocument(), n = [], 1 == y.length && y[0].equals(q.root) && (s = g.createElement("div"), 
y[0].moveChildren && y[0].moveChildren(s), y[0].append(s), y[0] = s), q = q.contents[0].getParent(), 
B = 0; B < y.length; B++) q = q.getCommonAncestor(y[B].getParent());
for (F = x.config.useComputedState, x = s = void 0, F = void 0 === F || F, B = 0; B < y.length; B++) for (C = y[B]; D = C.getParent(); ) {
if (D.equals(q)) {
n.push(C), !x && C.getDirection() && (x = 1), C = C.getDirection(F), null !== s && (s = s && s != C ? null :C);
break;
}
C = D;
}
if (!(n.length < 1)) {
for (y = n[n.length - 1].getNext(), B = g.createElement(this.type), j.push(B), F = j = void 0; n.length; ) j = n.shift(), 
F = g.createElement("li"), j.is("pre") || o.test(j.getName()) || "false" == j.getAttribute("contenteditable") ? j.appendTo(F) :(j.copyAttributes(F), 
s && j.getDirection() && (F.removeStyle("direction"), F.removeAttribute("dir")), 
j.moveChildren(F), j.remove()), F.appendTo(B);
s && x && B.setAttribute("dir", s), y ? B.insertBefore(y) :B.appendTo(q);
}
} else this.state == CKEDITOR.TRISTATE_ON && h[s.root.getName()] && d.call(this, b, s, i);
for (B = 0; B < z.length; B++) a(z[B]);
CKEDITOR.dom.element.clearAllMarkers(i), e.selectBookmarks(c), b.focus();
},
refresh:function(a, b) {
var c = b.contains(h, 1), d = b.blockLimit || b.root;
c && d.contains(c) ? this.setState(c.is(this.type) ? CKEDITOR.TRISTATE_ON :CKEDITOR.TRISTATE_OFF) :this.setState(CKEDITOR.TRISTATE_OFF);
}
}, CKEDITOR.plugins.add("list", {
requires:"indentlist",
init:function(a) {
a.blockless || (a.addCommand("numberedlist", new e("numberedlist", "ol")), a.addCommand("bulletedlist", new e("bulletedlist", "ul")), 
a.ui.addButton && (a.ui.addButton("NumberedList", {
label:a.lang.list.numberedlist,
command:"numberedlist",
directional:!0,
toolbar:"list,10"
}), a.ui.addButton("BulletedList", {
label:a.lang.list.bulletedlist,
command:"bulletedlist",
directional:!0,
toolbar:"list,20"
})), a.on("key", function(c) {
var d = c.data.keyCode;
if ("wysiwyg" == a.mode && d in {
8:1,
46:1
}) {
var e = a.getSelection().getRanges()[0], f = e && e.startPath();
if (e && e.collapsed) {
var f = new CKEDITOR.dom.elementPath(e.startContainer), i = 8 == d, o = a.editable(), q = new CKEDITOR.dom.walker(e.clone());
if (q.evaluator = function(a) {
return k(a) && !n(a);
}, q.guard = function(a, b) {
return !(b && a.type == CKEDITOR.NODE_ELEMENT && a.is("table"));
}, d = e.clone(), i) {
var t, s;
(t = f.contains(h)) && e.checkBoundaryOfElement(t, CKEDITOR.START) && (t = t.getParent()) && t.is("li") && (t = g(t)) ? (s = t, 
t = t.getPrevious(k), d.moveToPosition(t && n(t) ? t :s, CKEDITOR.POSITION_BEFORE_START)) :(q.range.setStartAt(o, CKEDITOR.POSITION_AFTER_START), 
q.range.setEnd(e.startContainer, e.startOffset), (t = q.previous()) && t.type == CKEDITOR.NODE_ELEMENT && (t.getName() in h || t.is("li")) && (t.is("li") || (q.range.selectNodeContents(t), 
q.reset(), q.evaluator = b, t = q.previous()), s = t, d.moveToElementEditEnd(s))), 
s ? (j(a, d, e), c.cancel()) :(d = f.contains(h)) && e.checkBoundaryOfElement(d, CKEDITOR.START) && (s = d.getFirst(k), 
e.checkBoundaryOfElement(s, CKEDITOR.START) && (t = d.getPrevious(k), g(s) ? t && (e.moveToElementEditEnd(t), 
e.select()) :a.execCommand("outdent"), c.cancel()));
} else (s = f.contains("li")) ? (q.range.setEndAt(o, CKEDITOR.POSITION_BEFORE_END), 
o = (f = s.getLast(k)) && b(f) ? f :s, s = 0, (t = q.next()) && t.type == CKEDITOR.NODE_ELEMENT && t.getName() in h && t.equals(f) ? (s = 1, 
t = q.next()) :e.checkBoundaryOfElement(o, CKEDITOR.END) && (s = 1), s && t && (e = e.clone(), 
e.moveToElementEditStart(t), j(a, d, e), c.cancel())) :(q.range.setEndAt(o, CKEDITOR.POSITION_BEFORE_END), 
(t = q.next()) && t.type == CKEDITOR.NODE_ELEMENT && t.is(h) && (t = t.getFirst(k), 
f.block && e.checkStartOfBlock() && e.checkEndOfBlock() ? (f.block.remove(), e.moveToElementEditStart(t), 
e.select()) :g(t) ? (e.moveToElementEditStart(t), e.select()) :(e = e.clone(), e.moveToElementEditStart(t), 
j(a, d, e)), c.cancel()));
setTimeout(function() {
a.selectionChange(1);
});
}
}
}));
}
});
}(), function() {
CKEDITOR.plugins.liststyle = {
requires:"dialog,contextmenu",
init:function(d) {
if (!d.blockless) {
var e;
e = new CKEDITOR.dialogCommand("numberedListStyle", {
requiredContent:"ol",
allowedContent:"ol{list-style-type}[start]"
}), e = d.addCommand("numberedListStyle", e), d.addFeature(e), CKEDITOR.dialog.add("numberedListStyle", this.path + "dialogs/liststyle.js"), 
e = new CKEDITOR.dialogCommand("bulletedListStyle", {
requiredContent:"ul",
allowedContent:"ul{list-style-type}"
}), e = d.addCommand("bulletedListStyle", e), d.addFeature(e), CKEDITOR.dialog.add("bulletedListStyle", this.path + "dialogs/liststyle.js"), 
d.addMenuGroup("list", 108), d.addMenuItems({
numberedlist:{
label:d.lang.liststyle.numberedTitle,
group:"list",
command:"numberedListStyle"
},
bulletedlist:{
label:d.lang.liststyle.bulletedTitle,
group:"list",
command:"bulletedListStyle"
}
}), d.contextMenu.addListener(function(c) {
if (!c || c.isReadOnly()) return null;
for (;c; ) {
var a = c.getName();
if ("ol" == a) return {
numberedlist:CKEDITOR.TRISTATE_OFF
};
if ("ul" == a) return {
bulletedlist:CKEDITOR.TRISTATE_OFF
};
c = c.getParent();
}
return null;
});
}
}
}, CKEDITOR.plugins.add("liststyle", CKEDITOR.plugins.liststyle);
}(), function() {
function d(a, b, c) {
return k(b) && k(c) && c.equals(b.getNext(function(a) {
return !(X(a) || Y(a) || n(a));
}));
}
function e(a) {
this.upper = a[0], this.lower = a[1], this.set.apply(this, a.slice(2));
}
function c(a) {
var b = a.element;
if (b && k(b) && (b = b.getAscendant(a.triggers, !0)) && a.editable.contains(b)) {
var c = j(b, !0);
if ("true" == c.getAttribute("contenteditable")) return b;
if (c.is(a.triggers)) return c;
}
return null;
}
function a(a, b, c) {
return v(a, b), v(a, c), a = b.size.bottom, c = c.size.top, a && c ? 0 | (a + c) / 2 :a || c;
}
function b(a, b, c) {
return b = b[c ? "getPrevious" :"getNext"](function(b) {
return b && b.type == CKEDITOR.NODE_TEXT && !X(b) || k(b) && !n(b) && !i(a, b);
});
}
function j(a, b) {
if (a.data("cke-editable")) return null;
for (b || (a = a.getParent()); a && !a.data("cke-editable"); ) {
if (a.hasAttribute("contenteditable")) return a;
a = a.getParent();
}
return null;
}
function g(a) {
var b = a.doc, c = y('<span contenteditable="false" style="' + T + "position:absolute;border-top:1px dashed " + a.boxColor + '"></span>', b), d = this.path + "images/" + (z.hidpi ? "hidpi/" :"") + "icon.png";
for (s(c, {
attach:function() {
return this.wrap.getParent() || this.wrap.appendTo(a.editable, !0), this;
},
lineChildren:[ s(y('<span title="' + a.editor.lang.magicline.title + '" contenteditable="false">&#8629;</span>', b), {
base:T + "height:17px;width:17px;" + (a.rtl ? "left" :"right") + ":17px;background:url(" + d + ") center no-repeat " + a.boxColor + ";cursor:pointer;" + (z.hc ? "font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;" :"") + (z.hidpi ? "background-size: 9px 10px;" :""),
looks:[ "top:-8px;" + CKEDITOR.tools.cssVendorPrefix("border-radius", "2px", 1), "top:-17px;" + CKEDITOR.tools.cssVendorPrefix("border-radius", "2px 2px 0px 0px", 1), "top:-1px;" + CKEDITOR.tools.cssVendorPrefix("border-radius", "0px 0px 2px 2px", 1) ]
}), s(y(W, b), {
base:Q + "left:0px;border-left-color:" + a.boxColor + ";",
looks:[ "border-width:8px 0 8px 8px;top:-8px", "border-width:8px 0 0 8px;top:-8px", "border-width:0 0 8px 8px;top:0px" ]
}), s(y(W, b), {
base:Q + "right:0px;border-right-color:" + a.boxColor + ";",
looks:[ "border-width:8px 8px 8px 0;top:-8px", "border-width:8px 8px 0 0;top:-8px", "border-width:0 8px 8px 0;top:0px" ]
}) ],
detach:function() {
return this.wrap.getParent() && this.wrap.remove(), this;
},
mouseNear:function() {
v(a, this);
var b = a.holdDistance, c = this.size;
return c && a.mouse.y > c.top - b && a.mouse.y < c.bottom + b && a.mouse.x > c.left - b && a.mouse.x < c.right + b ? !0 :!1;
},
place:function() {
var b = a.view, c = a.editable, d = a.trigger, e = d.upper, g = d.lower, f = e || g, h = f.getParent(), j = {};
this.trigger = d, e && v(a, e, !0), g && v(a, g, !0), v(a, h, !0), a.inInlineMode && A(a, !0), 
h.equals(c) ? (j.left = b.scroll.x, j.right = -b.scroll.x, j.width = "") :(j.left = f.size.left - f.size.margin.left + b.scroll.x - (a.inInlineMode ? b.editable.left + b.editable.border.left :0), 
j.width = f.size.outerWidth + f.size.margin.left + f.size.margin.right + b.scroll.x, 
j.right = ""), e && g ? j.top = e.size.margin.bottom === g.size.margin.top ? 0 | e.size.bottom + e.size.margin.bottom / 2 :e.size.margin.bottom < g.size.margin.top ? e.size.bottom + e.size.margin.bottom :e.size.bottom + e.size.margin.bottom - g.size.margin.top :e ? g || (j.top = e.size.bottom + e.size.margin.bottom) :j.top = g.size.top - g.size.margin.top, 
d.is(P) || j.top > b.scroll.y - 15 && j.top < b.scroll.y + 5 ? (j.top = a.inInlineMode ? 0 :b.scroll.y, 
this.look(P)) :d.is(L) || j.top > b.pane.bottom - 5 && j.top < b.pane.bottom + 15 ? (j.top = a.inInlineMode ? b.editable.height + b.editable.padding.top + b.editable.padding.bottom :b.pane.bottom - 1, 
this.look(L)) :(a.inInlineMode && (j.top = j.top - (b.editable.top + b.editable.border.top)), 
this.look(K)), a.inInlineMode && (j.top--, j.top = j.top + b.editable.scroll.top, 
j.left = j.left + b.editable.scroll.left);
for (var i in j) j[i] = CKEDITOR.tools.cssLength(j[i]);
this.setStyles(j);
},
look:function(a) {
if (this.oldLook != a) {
for (var c, b = this.lineChildren.length; b--; ) (c = this.lineChildren[b]).setAttribute("style", c.base + c.looks[0 | a / 2]);
this.oldLook = a;
}
},
wrap:new x("span", a.doc)
}), b = c.lineChildren.length; b--; ) c.lineChildren[b].appendTo(c);
c.look(K), c.appendTo(c.wrap), c.unselectable(), c.lineChildren[0].on("mouseup", function(b) {
c.detach(), h(a, function(b) {
var c = a.line.trigger;
b[c.is(D) ? "insertBefore" :"insertAfter"](c.is(D) ? c.lower :c.upper);
}, !0), a.editor.focus(), !z.ie && a.enterMode != CKEDITOR.ENTER_BR && a.hotNode.scrollIntoView(), 
b.data.preventDefault(!0);
}), c.on("mousedown", function(a) {
a.data.preventDefault(!0);
}), a.line = c;
}
function h(a, b, c) {
var g, d = new CKEDITOR.dom.range(a.doc), e = a.editor;
z.ie && a.enterMode == CKEDITOR.ENTER_BR ? g = a.doc.createText(H) :(g = (g = j(a.element, !0)) && g.data("cke-enter-mode") || a.enterMode, 
g = new x(C[g], a.doc), g.is("br") || a.doc.createText(H).appendTo(g)), c && e.fire("saveSnapshot"), 
b(g), d.moveToPosition(g, CKEDITOR.POSITION_AFTER_START), e.getSelection().selectRanges([ d ]), 
a.hotNode = g, c && e.fire("saveSnapshot");
}
function f(a, d) {
return {
canUndo:!0,
modes:{
wysiwyg:1
},
exec:function() {
function e(b) {
var c = z.ie && z.version < 9 ? " " :H, g = a.hotNode && a.hotNode.getText() == c && a.element.equals(a.hotNode) && a.lastCmdDirection === !!d;
h(a, function(c) {
g && a.hotNode && a.hotNode.remove(), c[d ? "insertAfter" :"insertBefore"](b), c.setAttributes({
"data-cke-magicline-hot":1,
"data-cke-magicline-dir":!!d
}), a.lastCmdDirection = !!d;
}), !z.ie && a.enterMode != CKEDITOR.ENTER_BR && a.hotNode.scrollIntoView(), a.line.detach();
}
return function(g) {
var f, g = g.getSelection().getStartElement(), g = g.getAscendant(O, 1);
if (!l(a, g) && g && !g.equals(a.editable) && !g.contains(a.editable)) {
(f = j(g)) && "false" == f.getAttribute("contenteditable") && (g = f), a.element = g, 
f = b(a, g, !d);
var h;
k(f) && f.is(a.triggers) && f.is(S) && (!b(a, f, !d) || (h = b(a, f, !d)) && k(h) && h.is(a.triggers)) ? e(f) :(h = c(a, g), 
k(h) && (b(a, h, !d) ? (g = b(a, h, !d)) && k(g) && g.is(a.triggers) && e(h) :e(h)));
}
};
}()
};
}
function i(a, b) {
if (!b || b.type != CKEDITOR.NODE_ELEMENT || !b.$) return !1;
var c = a.line;
return c.wrap.equals(b) || c.wrap.contains(b);
}
function k(a) {
return a && a.type == CKEDITOR.NODE_ELEMENT && a.$;
}
function n(a) {
if (!k(a)) return !1;
var b;
return (b = o(a)) || (k(a) ? (b = {
left:1,
right:1,
center:1
}, b = !(!b[a.getComputedStyle("float")] && !b[a.getAttribute("align")])) :b = !1), 
b;
}
function o(a) {
return !!{
absolute:1,
fixed:1
}[a.getComputedStyle("position")];
}
function q(a, b) {
return k(b) ? b.is(a.triggers) :null;
}
function l(a, b) {
if (!b) return !1;
for (var c = b.getParents(1), d = c.length; d--; ) for (var e = a.tabuList.length; e--; ) if (c[d].hasAttribute(a.tabuList[e])) return !0;
return !1;
}
function m(a, b, c) {
return (b = b[c ? "getLast" :"getFirst"](function(b) {
return a.isRelevant(b) && !b.is(M);
})) ? (v(a, b), c ? b.size.top > a.mouse.y :b.size.bottom < a.mouse.y) :!1;
}
function r(a) {
var b = a.editable, c = a.mouse, d = a.view, g = a.triggerOffset;
A(a);
var f = c.y > (a.inInlineMode ? d.editable.top + d.editable.height / 2 :Math.min(d.editable.height, d.pane.height) / 2), b = b[f ? "getLast" :"getFirst"](function(a) {
return !(X(a) || Y(a));
});
return b ? (i(a, b) && (b = a.line.wrap[f ? "getPrevious" :"getNext"](function(a) {
return !(X(a) || Y(a));
})), k(b) && !n(b) && q(a, b) ? (v(a, b), !f && b.size.top >= 0 && c.y > 0 && c.y < b.size.top + g ? (a = a.inInlineMode || 0 === d.scroll.y ? P :K, 
new e([ null, b, D, J, a ])) :f && b.size.bottom <= d.pane.height && c.y > b.size.bottom - g && c.y < d.pane.height ? (a = a.inInlineMode || b.size.bottom > d.pane.height - g && b.size.bottom < d.pane.height ? L :K, 
new e([ b, null, E, J, a ])) :null) :null) :null;
}
function p(a) {
var d = a.mouse, g = a.view, f = a.triggerOffset, h = c(a);
if (!h) return null;
v(a, h);
var i, l, f = Math.min(f, 0 | h.size.outerHeight / 2), j = [];
if (d.y > h.size.top - 1 && d.y < h.size.top + f) l = !1; else {
if (!(d.y > h.size.bottom - f && d.y < h.size.bottom + 1)) return null;
l = !0;
}
if (n(h) || m(a, h, l) || h.getParent().is(N)) return null;
var p = b(a, h, !l);
if (p) {
if (p && p.type == CKEDITOR.NODE_TEXT) return null;
if (k(p)) {
if (n(p) || !q(a, p) || p.getParent().is(N)) return null;
j = [ p, h ][l ? "reverse" :"concat"]().concat([ I, J ]);
}
} else h.equals(a.editable[l ? "getLast" :"getFirst"](a.isRelevant)) ? (A(a), l && d.y > h.size.bottom - f && d.y < g.pane.height && h.size.bottom > g.pane.height - f && h.size.bottom < g.pane.height ? i = L :d.y > 0 && d.y < h.size.top + f && (i = P)) :i = K, 
j = [ null, h ][l ? "reverse" :"concat"]().concat([ l ? E :D, J, i, h.equals(a.editable[l ? "getLast" :"getFirst"](a.isRelevant)) ? l ? L :P :K ]);
return 0 in j ? new e(j) :null;
}
function u(a, b, c, d) {
for (var e = function() {
var c = z.ie ? b.$.currentStyle :a.win.$.getComputedStyle(b.$, "");
return z.ie ? function(a) {
return c[CKEDITOR.tools.cssStyleToDomStyle(a)];
} :function(a) {
return c.getPropertyValue(a);
};
}(), g = b.getDocumentPosition(), f = {}, h = {}, j = {}, i = {}, l = R.length; l--; ) f[R[l]] = parseInt(e("border-" + R[l] + "-width"), 10) || 0, 
j[R[l]] = parseInt(e("padding-" + R[l]), 10) || 0, h[R[l]] = parseInt(e("margin-" + R[l]), 10) || 0;
return (!c || d) && w(a, d), i.top = g.y - (c ? 0 :a.view.scroll.y), i.left = g.x - (c ? 0 :a.view.scroll.x), 
i.outerWidth = b.$.offsetWidth, i.outerHeight = b.$.offsetHeight, i.height = i.outerHeight - (j.top + j.bottom + f.top + f.bottom), 
i.width = i.outerWidth - (j.left + j.right + f.left + f.right), i.bottom = i.top + i.outerHeight, 
i.right = i.left + i.outerWidth, a.inInlineMode && (i.scroll = {
top:b.$.scrollTop,
left:b.$.scrollLeft
}), s({
border:f,
padding:j,
margin:h,
ignoreScroll:c
}, i, !0);
}
function v(a, b, c) {
if (!k(b)) return b.size = null;
if (b.size) {
if (b.size.ignoreScroll == c && b.size.date > new Date() - U) return null;
} else b.size = {};
return s(b.size, u(a, b, c), {
date:+new Date()
}, !0);
}
function A(a, b) {
a.view.editable = u(a, a.editable, b, !0);
}
function w(a, b) {
a.view || (a.view = {});
var c = a.view;
if (b || !(c && c.date > new Date() - U)) {
var d = a.win, c = d.getScrollPosition(), d = d.getViewPaneSize();
s(a.view, {
scroll:{
x:c.x,
y:c.y,
width:a.doc.$.documentElement.scrollWidth - d.width,
height:a.doc.$.documentElement.scrollHeight - d.height
},
pane:{
width:d.width,
height:d.height,
bottom:d.height + c.y
},
date:+new Date()
}, !0);
}
}
function t(a, b, c, d) {
for (var g = d, f = d, h = 0, j = !1, i = !1, l = a.view.pane.height, k = a.mouse; k.y + h < l && k.y - h > 0 && (j || (j = b(g, d)), 
i || (i = b(f, d)), !j && k.y - h > 0 && (g = c(a, {
x:k.x,
y:k.y - h
})), !i && k.y + h < l && (f = c(a, {
x:k.x,
y:k.y + h
})), !j || !i); ) h += 2;
return new e([ g, f, null, null ]);
}
CKEDITOR.plugins.add("magicline", {
init:function(a) {
var q, v, t, d = a.config, j = d.magicline_triggerOffset || 30, m = {
editor:a,
enterMode:d.enterMode,
triggerOffset:j,
holdDistance:0 | j * (d.magicline_holdDistance || .5),
boxColor:d.magicline_color || "#ff0000",
rtl:"rtl" == d.contentsLangDirection,
tabuList:[ "data-cke-hidden-sel" ].concat(d.magicline_tabuList || []),
triggers:d.magicline_everywhere ? O :{
table:1,
hr:1,
div:1,
ul:1,
ol:1,
dl:1,
form:1,
blockquote:1
}
};
m.isRelevant = function(a) {
return k(a) && !i(m, a) && !n(a);
}, a.on("contentDom", function() {
var j = a.editable(), k = a.document, n = a.window;
s(m, {
editable:j,
inInlineMode:j.isInline(),
doc:k,
win:n,
hotNode:null
}, !0), m.boundary = m.inInlineMode ? m.editable :m.doc.getDocumentElement(), j.is(F.$inline) || (m.inInlineMode && !o(j) && j.setStyles({
position:"relative",
top:null,
left:null
}), g.call(this, m), w(m), j.attachListener(a, "beforeUndoImage", function() {
m.line.detach();
}), j.attachListener(a, "beforeGetData", function() {
m.line.wrap.getParent() && (m.line.detach(), a.once("getData", function() {
m.line.attach();
}, null, null, 1e3));
}, null, null, 0), j.attachListener(m.inInlineMode ? k :k.getWindow().getFrame(), "mouseout", function(b) {
if ("wysiwyg" == a.mode) if (m.inInlineMode) {
var c = b.data.$.clientX, b = b.data.$.clientY;
w(m), A(m, !0);
var d = m.view.editable, e = m.view.scroll;
c > d.left - e.x && c < d.right - e.x && b > d.top - e.y && b < d.bottom - e.y || (clearTimeout(t), 
t = null, m.line.detach());
} else clearTimeout(t), t = null, m.line.detach();
}), j.attachListener(j, "keyup", function() {
m.hiddenMode = 0;
}), j.attachListener(j, "keydown", function(b) {
if ("wysiwyg" == a.mode) switch (b = b.data.getKeystroke(), a.getSelection().getStartElement(), 
b) {
case 2228240:
case 16:
m.hiddenMode = 1, m.line.detach();
}
}), j.attachListener(m.inInlineMode ? j :k, "mousemove", function(b) {
if (v = !0, "wysiwyg" == a.mode && !a.readOnly && !t) {
var c = {
x:b.data.$.clientX,
y:b.data.$.clientY
};
t = setTimeout(function() {
m.mouse = c, t = m.trigger = null, w(m), v && !m.hiddenMode && a.focusManager.hasFocus && !m.line.mouseNear() && (m.element = Z(m, !0)) && ((m.trigger = r(m) || p(m) || aa(m)) && !l(m, m.trigger.upper || m.trigger.lower) ? m.line.attach().place() :(m.trigger = null, 
m.line.detach()), v = !1);
}, 30);
}
}), j.attachListener(n, "scroll", function() {
"wysiwyg" == a.mode && (m.line.detach(), z.webkit && (m.hiddenMode = 1, clearTimeout(q), 
q = setTimeout(function() {
m.mouseDown || (m.hiddenMode = 0);
}, 50)));
}), j.attachListener(B ? k :n, "mousedown", function() {
"wysiwyg" == a.mode && (m.line.detach(), m.hiddenMode = 1, m.mouseDown = 1);
}), j.attachListener(B ? k :n, "mouseup", function() {
m.hiddenMode = 0, m.mouseDown = 0;
}), a.addCommand("accessPreviousSpace", f(m)), a.addCommand("accessNextSpace", f(m, !0)), 
a.setKeystroke([ [ d.magicline_keystrokePrevious, "accessPreviousSpace" ], [ d.magicline_keystrokeNext, "accessNextSpace" ] ]), 
a.on("loadSnapshot", function() {
var b, c, d, e;
for (e in {
p:1,
br:1,
div:1
}) for (b = a.document.getElementsByTag(e), d = b.count(); d--; ) if ((c = b.getItem(d)).data("cke-magicline-hot")) return m.hotNode = c, 
m.lastCmdDirection = "true" === c.data("cke-magicline-dir") ? !0 :!1, void 0;
}), this.backdoor = {
accessFocusSpace:h,
boxTrigger:e,
isLine:i,
getAscendantTrigger:c,
getNonEmptyNeighbour:b,
getSize:u,
that:m,
triggerEdge:p,
triggerEditable:r,
triggerExpand:aa
});
}, this);
}
});
var s = CKEDITOR.tools.extend, x = CKEDITOR.dom.element, y = x.createFromHtml, z = CKEDITOR.env, B = CKEDITOR.env.ie && CKEDITOR.env.version < 9, F = CKEDITOR.dtd, C = {}, D = 128, E = 64, I = 32, J = 16, G = 8, P = 4, L = 2, K = 1, H = "\xa0", N = F.$listItem, M = F.$tableContent, S = s({}, F.$nonEditable, F.$empty), O = F.$block, U = 100, T = "width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;", Q = T + "border-color:transparent;display:block;border-style:solid;", W = "<span>" + H + "</span>";
C[CKEDITOR.ENTER_BR] = "br", C[CKEDITOR.ENTER_P] = "p", C[CKEDITOR.ENTER_DIV] = "div", 
e.prototype = {
set:function(a, b, c) {
return this.properties = a + b + (c || K), this;
},
is:function(a) {
return (this.properties & a) == a;
}
};
var Z = function() {
return function(a, b, c) {
if (!a.mouse) return null;
var d = a.doc, e = a.line.wrap, c = c || a.mouse, g = new CKEDITOR.dom.element(d.$.elementFromPoint(c.x, c.y));
return b && i(a, g) && (e.hide(), g = new CKEDITOR.dom.element(d.$.elementFromPoint(c.x, c.y)), 
e.show()), !g || g.type != CKEDITOR.NODE_ELEMENT || !g.$ || z.ie && z.version < 9 && !a.boundary.equals(g) && !a.boundary.contains(g) ? null :g;
};
}(), X = CKEDITOR.dom.walker.whitespaces(), Y = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT), aa = function() {
function b(e) {
var f, h, j, g = e.element;
if (!k(g) || g.contains(e.editable) || g.isReadOnly()) return null;
if (j = t(e, function(a, b) {
return !b.equals(a);
}, function(a, b) {
return Z(a, !0, b);
}, g), f = j.upper, h = j.lower, d(e, f, h)) return j.set(I, G);
if (f && g.contains(f)) for (;!f.getParent().equals(g); ) f = f.getParent(); else f = g.getFirst(function(a) {
return c(e, a);
});
if (h && g.contains(h)) for (;!h.getParent().equals(g); ) h = h.getParent(); else h = g.getLast(function(a) {
return c(e, a);
});
if (!f || !h) return null;
if (v(e, f), v(e, h), !(e.mouse.y > f.size.top && e.mouse.y < h.size.bottom)) return null;
for (var i, l, m, p, g = Number.MAX_VALUE; h && !h.equals(f) && (l = f.getNext(e.isRelevant)); ) i = Math.abs(a(e, f, l) - e.mouse.y), 
g > i && (g = i, m = f, p = l), f = l, v(e, f);
return m && p && e.mouse.y > m.size.top && e.mouse.y < p.size.bottom ? (j.upper = m, 
j.lower = p, j.set(I, G)) :null;
}
function c(a, b) {
return !(b && b.type == CKEDITOR.NODE_TEXT || Y(b) || n(b) || i(a, b) || b.type == CKEDITOR.NODE_ELEMENT && b.$ && b.is("br"));
}
return function(a) {
var e, c = b(a);
if (e = c) {
e = c.upper;
var g = c.lower;
e = !e || !g || n(g) || n(e) || g.equals(e) || e.equals(g) || g.contains(e) || e.contains(g) ? !1 :q(a, e) && q(a, g) && d(a, e, g) ? !0 :!1;
}
return e ? c :null;
};
}(), R = [ "top", "left", "right", "bottom" ];
}(), CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + CKEDITOR.SHIFT + 51, 
CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + CKEDITOR.SHIFT + 52, function() {
function d(a) {
if (!a || a.type != CKEDITOR.NODE_ELEMENT || "form" != a.getName()) return [];
for (var b = [], c = [ "style", "className" ], d = 0; d < c.length; d++) {
var e = a.$.elements.namedItem(c[d]);
e && (e = new CKEDITOR.dom.element(e), b.push([ e, e.nextSibling ]), e.remove());
}
return b;
}
function e(a, b) {
if (a && a.type == CKEDITOR.NODE_ELEMENT && "form" == a.getName() && b.length > 0) for (var c = b.length - 1; c >= 0; c--) {
var d = b[c][0], e = b[c][1];
e ? d.insertBefore(e) :d.appendTo(a);
}
}
function c(a, b) {
var c = d(a), f = {}, i = a.$;
return b || (f["class"] = i.className || "", i.className = ""), f.inline = i.style.cssText || "", 
b || (i.style.cssText = "position: static; overflow: visible"), e(c), f;
}
function a(a, b) {
var c = d(a), f = a.$;
"class" in b && (f.className = b["class"]), "inline" in b && (f.style.cssText = b.inline), 
e(c);
}
function b(a) {
if (!a.editable().isInline()) {
var c, b = CKEDITOR.instances;
for (c in b) {
var d = b[c];
"wysiwyg" != d.mode || d.readOnly || (d = d.document.getBody(), d.setAttribute("contentEditable", !1), 
d.setAttribute("contentEditable", !0));
}
a.editable().hasFocus && (a.toolbox.focus(), a.focus());
}
}
CKEDITOR.plugins.add("maximize", {
init:function(d) {
function e() {
var a = i.getViewPaneSize();
d.resize(a.width, a.height, null, !0);
}
if (d.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
var k, n, o, h = d.lang, f = CKEDITOR.document, i = f.getWindow(), q = CKEDITOR.TRISTATE_OFF;
d.addCommand("maximize", {
modes:{
wysiwyg:!CKEDITOR.env.iOS,
source:!CKEDITOR.env.iOS
},
readOnly:1,
editorFocus:!1,
exec:function() {
var l = d.container.getChild(1), m = d.ui.space("contents");
if ("wysiwyg" == d.mode) {
var r = d.getSelection();
k = r && r.getRanges(), n = i.getScrollPosition();
} else {
var p = d.editable().$;
k = !CKEDITOR.env.ie && [ p.selectionStart, p.selectionEnd ], n = [ p.scrollLeft, p.scrollTop ];
}
if (this.state == CKEDITOR.TRISTATE_OFF) {
for (i.on("resize", e), o = i.getScrollPosition(), r = d.container; r = r.getParent(); ) r.setCustomData("maximize_saved_styles", c(r)), 
r.setStyle("z-index", d.config.baseFloatZIndex - 5);
m.setCustomData("maximize_saved_styles", c(m, !0)), l.setCustomData("maximize_saved_styles", c(l, !0)), 
m = {
overflow:CKEDITOR.env.webkit ? "" :"hidden",
width:0,
height:0
}, f.getDocumentElement().setStyles(m), !CKEDITOR.env.gecko && f.getDocumentElement().setStyle("position", "fixed"), 
(!CKEDITOR.env.gecko || !CKEDITOR.env.quirks) && f.getBody().setStyles(m), CKEDITOR.env.ie ? setTimeout(function() {
i.$.scrollTo(0, 0);
}, 0) :i.$.scrollTo(0, 0), l.setStyle("position", CKEDITOR.env.gecko && CKEDITOR.env.quirks ? "fixed" :"absolute"), 
l.$.offsetLeft, l.setStyles({
"z-index":d.config.baseFloatZIndex - 5,
left:"0px",
top:"0px"
}), l.addClass("cke_maximized"), e(), m = l.getDocumentPosition(), l.setStyles({
left:-1 * m.x + "px",
top:-1 * m.y + "px"
}), CKEDITOR.env.gecko && b(d);
} else if (this.state == CKEDITOR.TRISTATE_ON) {
for (i.removeListener("resize", e), m = [ m, l ], r = 0; r < m.length; r++) a(m[r], m[r].getCustomData("maximize_saved_styles")), 
m[r].removeCustomData("maximize_saved_styles");
for (r = d.container; r = r.getParent(); ) a(r, r.getCustomData("maximize_saved_styles")), 
r.removeCustomData("maximize_saved_styles");
CKEDITOR.env.ie ? setTimeout(function() {
i.$.scrollTo(o.x, o.y);
}, 0) :i.$.scrollTo(o.x, o.y), l.removeClass("cke_maximized"), CKEDITOR.env.webkit && (l.setStyle("display", "inline"), 
setTimeout(function() {
l.setStyle("display", "block");
}, 0)), d.fire("resize");
}
this.toggleState(), (r = this.uiItems[0]) && (m = this.state == CKEDITOR.TRISTATE_OFF ? h.maximize.maximize :h.maximize.minimize, 
r = CKEDITOR.document.getById(r._.id), r.getChild(1).setHtml(m), r.setAttribute("title", m), 
r.setAttribute("href", 'javascript:void("' + m + '");')), "wysiwyg" == d.mode ? k ? (CKEDITOR.env.gecko && b(d), 
d.getSelection().selectRanges(k), (p = d.getSelection().getStartElement()) && p.scrollIntoView(!0)) :i.$.scrollTo(n.x, n.y) :(k && (p.selectionStart = k[0], 
p.selectionEnd = k[1]), p.scrollLeft = n[0], p.scrollTop = n[1]), k = n = null, 
q = this.state, d.fire("maximize", this.state);
},
canUndo:!1
}), d.ui.addButton && d.ui.addButton("Maximize", {
label:h.maximize.maximize,
command:"maximize",
toolbar:"tools,10"
}), d.on("mode", function() {
var a = d.getCommand("maximize");
a.setState(a.state == CKEDITOR.TRISTATE_DISABLED ? CKEDITOR.TRISTATE_DISABLED :q);
}, null, null, 100);
}
}
});
}(), CKEDITOR.plugins.add("newpage", {
init:function(d) {
d.addCommand("newpage", {
modes:{
wysiwyg:1,
source:1
},
exec:function(d) {
var c = this;
d.setData(d.config.newpage_html || "", function() {
d.focus(), setTimeout(function() {
d.fire("afterCommandExec", {
name:"newpage",
command:c
}), d.selectionChange();
}, 200);
});
},
async:!0
}), d.ui.addButton && d.ui.addButton("NewPage", {
label:d.lang.newpage.toolbar,
command:"newpage",
toolbar:"document,20"
});
}
}), function() {
function d(d) {
return {
"aria-label":d,
"class":"cke_pagebreak",
contenteditable:"false",
"data-cke-display-name":"pagebreak",
"data-cke-pagebreak":1,
style:"page-break-after: always",
title:d
};
}
CKEDITOR.plugins.add("pagebreak", {
requires:"fakeobjects",
onLoad:function() {
var d = ("background:url(" + CKEDITOR.getUrl(this.path + "images/pagebreak.gif") + ") no-repeat center center;clear:both;width:100%;border-top:#999 1px dotted;border-bottom:#999 1px dotted;padding:0;height:5px;cursor:default;").replace(/;/g, " !important;");
CKEDITOR.addCss("div.cke_pagebreak{" + d + "}");
},
init:function(d) {
d.blockless || (d.addCommand("pagebreak", CKEDITOR.plugins.pagebreakCmd), d.ui.addButton && d.ui.addButton("PageBreak", {
label:d.lang.pagebreak.toolbar,
command:"pagebreak",
toolbar:"insert,70"
}), CKEDITOR.env.opera && d.on("contentDom", function() {
d.document.on("click", function(c) {
c = c.data.getTarget(), c.is("div") && c.hasClass("cke_pagebreak") && d.getSelection().selectElement(c);
});
}));
},
afterInit:function(e) {
function c(a) {
CKEDITOR.tools.extend(a.attributes, d(e.lang.pagebreak.alt), !0), a.children.length = 0;
}
var a = e.dataProcessor, b = a && a.dataFilter, a = a && a.htmlFilter, j = /page-break-after\s*:\s*always/i, g = /display\s*:\s*none/i;
a && a.addRules({
attributes:{
"class":function(a, b) {
var c = a.replace("cke_pagebreak", "");
if (c != a) {
var d = CKEDITOR.htmlParser.fragment.fromHtml('<span style="display: none;">&nbsp;</span>').children[0];
b.children.length = 0, b.add(d), d = b.attributes, delete d["aria-label"], delete d.contenteditable, 
delete d.title;
}
return c;
}
}
}, {
applyToAll:!0,
priority:5
}), b && b.addRules({
elements:{
div:function(a) {
if (a.attributes["data-cke-pagebreak"]) c(a); else if (j.test(a.attributes.style)) {
var b = a.children[0];
b && "span" == b.name && g.test(b.attributes.style) && c(a);
}
}
}
});
}
}), CKEDITOR.plugins.pagebreakCmd = {
exec:function(e) {
var c = e.document.createElement("div", {
attributes:d(e.lang.pagebreak.alt)
});
e.insertElement(c);
},
context:"div",
allowedContent:{
div:{
styles:"!page-break-after"
},
span:{
match:function(d) {
return (d = d.parent) && "div" == d.name && d.styles["page-break-after"];
},
styles:"display"
}
},
requiredContent:"div{page-break-after}"
};
}(), function() {
function d(c, a, b) {
var d = CKEDITOR.cleanWord;
return d ? b() :(c = CKEDITOR.getUrl(c.config.pasteFromWordCleanupFile || a + "filter/default.js"), 
CKEDITOR.scriptLoader.load(c, b, null, !0)), !d;
}
function e(c) {
c.data.type = "html";
}
CKEDITOR.plugins.add("pastefromword", {
requires:"clipboard",
init:function(c) {
var a = 0, b = this.path;
c.addCommand("pastefromword", {
canUndo:!1,
async:!0,
exec:function(b) {
var c = this;
a = 1, b.once("beforePaste", e), b.getClipboardData({
title:b.lang.pastefromword.title
}, function(a) {
a && b.fire("paste", {
type:"html",
dataValue:a.dataValue
}), b.fire("afterCommandExec", {
name:"pastefromword",
command:c,
returnValue:!!a
});
});
}
}), c.ui.addButton && c.ui.addButton("PasteFromWord", {
label:c.lang.pastefromword.toolbar,
command:"pastefromword",
toolbar:"clipboard,50"
}), c.on("pasteState", function(a) {
c.getCommand("pastefromword").setState(a.data);
}), c.on("paste", function(e) {
var g = e.data, h = g.dataValue;
if (h && (a || /(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/.test(h))) {
var f = d(c, b, function() {
f ? c.fire("paste", g) :(!c.config.pasteFromWordPromptCleanup || a || confirm(c.lang.pastefromword.confirmCleanup)) && (g.dataValue = CKEDITOR.cleanWord(h, c));
});
f && e.cancel();
}
}, null, null, 3);
}
});
}(), function() {
var d = {
canUndo:!1,
async:!0,
exec:function(e) {
e.getClipboardData({
title:e.lang.pastetext.title
}, function(c) {
c && e.fire("paste", {
type:"text",
dataValue:c.dataValue
}), e.fire("afterCommandExec", {
name:"pastetext",
command:d,
returnValue:!!c
});
});
}
};
CKEDITOR.plugins.add("pastetext", {
requires:"clipboard",
init:function(e) {
e.addCommand("pastetext", d), e.ui.addButton && e.ui.addButton("PasteText", {
label:e.lang.pastetext.button,
command:"pastetext",
toolbar:"clipboard,40"
}), e.config.forcePasteAsPlainText && e.on("beforePaste", function(c) {
"html" != c.data.type && (c.data.type = "text");
}), e.on("pasteState", function(c) {
e.getCommand("pastetext").setState(c.data);
});
}
});
}(), function() {
var d, e = {
modes:{
wysiwyg:1,
source:1
},
canUndo:!1,
readOnly:1,
exec:function(c) {
var a, b = c.config, e = b.baseHref ? '<base href="' + b.baseHref + '"/>' :"";
if (b.fullPage) a = c.getData().replace(/<head>/, "$&" + e).replace(/[^>]*(?=<\/title>)/, "$& &mdash; " + c.lang.preview.preview); else {
var b = "<body ", g = c.document && c.document.getBody();
g && (g.getAttribute("id") && (b += 'id="' + g.getAttribute("id") + '" '), g.getAttribute("class") && (b += 'class="' + g.getAttribute("class") + '" ')), 
a = c.config.docType + '<html dir="' + c.config.contentsLangDirection + '"><head>' + e + "<title>" + c.lang.preview.preview + "</title>" + CKEDITOR.tools.buildStyleHtml(c.config.contentsCss) + "</head>" + (b + ">") + c.getData() + "</body></html>";
}
e = 640, b = 420, g = 80;
try {
var h = window.screen, e = Math.round(.8 * h.width), b = Math.round(.7 * h.height), g = Math.round(.1 * h.width);
} catch (f) {}
if (!c.fire("contentPreview", c = {
dataValue:a
})) return !1;
var i, h = "";
return CKEDITOR.env.ie && (window._cke_htmlToLoad = c.dataValue, i = "javascript:void( (function(){document.open();" + ("(" + CKEDITOR.tools.fixDomain + ")();").replace(/\/\/.*?\n/g, "").replace(/parent\./g, "window.opener.") + "document.write( window.opener._cke_htmlToLoad );document.close();window.opener._cke_htmlToLoad = null;})() )", 
h = ""), CKEDITOR.env.gecko && (window._cke_htmlToLoad = c.dataValue, h = d + "preview.html"), 
h = window.open(h, null, "toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=" + e + ",height=" + b + ",left=" + g), 
CKEDITOR.env.ie && (h.location = i), CKEDITOR.env.ie || CKEDITOR.env.gecko || (i = h.document, 
i.open(), i.write(c.dataValue), i.close()), !0;
}
};
CKEDITOR.plugins.add("preview", {
init:function(c) {
c.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && (d = this.path, c.addCommand("preview", e), 
c.ui.addButton && c.ui.addButton("Preview", {
label:c.lang.preview.preview,
command:"preview",
toolbar:"document,40"
}));
}
});
}(), CKEDITOR.plugins.add("print", {
init:function(d) {
d.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && (d.addCommand("print", CKEDITOR.plugins.print), 
d.ui.addButton && d.ui.addButton("Print", {
label:d.lang.print.toolbar,
command:"print",
toolbar:"document,50"
}));
}
}), CKEDITOR.plugins.print = {
exec:function(d) {
CKEDITOR.env.opera || (CKEDITOR.env.gecko ? d.window.$.print() :d.document.$.execCommand("Print"));
},
canUndo:!1,
readOnly:1,
modes:{
wysiwyg:!CKEDITOR.env.opera
}
}, CKEDITOR.plugins.add("removeformat", {
init:function(d) {
d.addCommand("removeFormat", CKEDITOR.plugins.removeformat.commands.removeformat), 
d.ui.addButton && d.ui.addButton("RemoveFormat", {
label:d.lang.removeformat.toolbar,
command:"removeFormat",
toolbar:"cleanup,10"
});
}
}), CKEDITOR.plugins.removeformat = {
commands:{
removeformat:{
exec:function(d) {
for (var g, e = d._.removeFormatRegex || (d._.removeFormatRegex = RegExp("^(?:" + d.config.removeFormatTags.replace(/,/g, "|") + ")$", "i")), c = d._.removeAttributes || (d._.removeAttributes = d.config.removeFormatAttributes.split(",")), a = CKEDITOR.plugins.removeformat.filter, b = d.getSelection().getRanges(1), j = b.createIterator(); g = j.getNextRange(); ) {
g.collapsed || g.enlarge(CKEDITOR.ENLARGE_ELEMENT);
var h = g.createBookmark(), f = h.startNode, i = h.endNode, k = function(b) {
for (var h, c = d.elementPath(b), g = c.elements, f = 1; (h = g[f]) && (!h.equals(c.block) && !h.equals(c.blockLimit)); f++) e.test(h.getName()) && a(d, h) && b.breakParent(h);
};
if (k(f), i) for (k(i), f = f.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT); f && !f.equals(i); ) k = f.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT), 
"img" == f.getName() && f.data("cke-realelement") || !a(d, f) || (e.test(f.getName()) ? f.remove(1) :(f.removeAttributes(c), 
d.fire("removeFormatCleanup", f))), f = k;
g.moveToBookmark(h);
}
d.forceNextSelectionCheck(), d.getSelection().selectRanges(b);
}
}
},
filter:function(d, e) {
for (var c = d._.removeFormatFilters || [], a = 0; a < c.length; a++) if (c[a](e) === !1) return !1;
return !0;
}
}, CKEDITOR.editor.prototype.addRemoveFormatFilter = function(d) {
this._.removeFormatFilters || (this._.removeFormatFilters = []), this._.removeFormatFilters.push(d);
}, CKEDITOR.config.removeFormatTags = "b,big,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var", 
CKEDITOR.config.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign", 
CKEDITOR.plugins.add("resize", {
init:function(d) {
var e, c, a, b, j = d.config, g = d.ui.spaceId("resizer"), h = d.element ? d.element.getDirection(1) :"ltr";
if (!j.resize_dir && (j.resize_dir = "vertical"), void 0 == j.resize_maxWidth && (j.resize_maxWidth = 3e3), 
void 0 == j.resize_maxHeight && (j.resize_maxHeight = 3e3), void 0 == j.resize_minWidth && (j.resize_minWidth = 750), 
void 0 == j.resize_minHeight && (j.resize_minHeight = 250), j.resize_enabled !== !1) {
var f = null, i = ("both" == j.resize_dir || "horizontal" == j.resize_dir) && j.resize_minWidth != j.resize_maxWidth, k = ("both" == j.resize_dir || "vertical" == j.resize_dir) && j.resize_minHeight != j.resize_maxHeight, n = function(g) {
var f = e, n = c, p = f + (g.data.$.screenX - a) * ("rtl" == h ? -1 :1), g = n + (g.data.$.screenY - b);
i && (f = Math.max(j.resize_minWidth, Math.min(p, j.resize_maxWidth))), k && (n = Math.max(j.resize_minHeight, Math.min(g, j.resize_maxHeight))), 
d.resize(i ? f :null, n);
}, o = function() {
CKEDITOR.document.removeListener("mousemove", n), CKEDITOR.document.removeListener("mouseup", o), 
d.document && (d.document.removeListener("mousemove", n), d.document.removeListener("mouseup", o));
}, q = CKEDITOR.tools.addFunction(function(g) {
f || (f = d.getResizable()), e = f.$.offsetWidth || 0, c = f.$.offsetHeight || 0, 
a = g.screenX, b = g.screenY, j.resize_minWidth > e && (j.resize_minWidth = e), 
j.resize_minHeight > c && (j.resize_minHeight = c), CKEDITOR.document.on("mousemove", n), 
CKEDITOR.document.on("mouseup", o), d.document && (d.document.on("mousemove", n), 
d.document.on("mouseup", o)), g.preventDefault && g.preventDefault();
});
d.on("destroy", function() {
CKEDITOR.tools.removeFunction(q);
}), d.on("uiSpace", function(a) {
if ("bottom" == a.data.space) {
var b = "";
i && !k && (b = " cke_resizer_horizontal"), !i && k && (b = " cke_resizer_vertical");
var c = '<span id="' + g + '" class="cke_resizer' + b + " cke_resizer_" + h + '" title="' + CKEDITOR.tools.htmlEncode(d.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' + q + ', event)">' + ("ltr" == h ? "\u25e2" :"\u25e3") + "</span>";
a.data.html = "ltr" == h && "ltr" == b ? a.data.html + c :c + a.data.html;
}
}, d, null, 100), d.on("maximize", function(a) {
d.ui.space("resizer")[a.data == CKEDITOR.TRISTATE_ON ? "hide" :"show"]();
});
}
}
}), function() {
var d = {
readOnly:1,
exec:function(d) {
if (d.fire("save") && (d = d.element.$.form)) try {
d.submit();
} catch (c) {
d.submit.click && d.submit.click();
}
}
};
CKEDITOR.plugins.add("save", {
init:function(e) {
e.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (e.addCommand("save", d).modes = {
wysiwyg:!!e.element.$.form
}, e.ui.addButton && e.ui.addButton("Save", {
label:e.lang.save.toolbar,
command:"save",
toolbar:"document,10"
}));
}
});
}(), function() {
CKEDITOR.plugins.add("selectall", {
init:function(d) {
d.addCommand("selectAll", {
modes:{
wysiwyg:1,
source:1
},
exec:function(d) {
var c = d.editable();
if (c.is("textarea")) d = c.$, CKEDITOR.env.ie ? d.createTextRange().execCommand("SelectAll") :(d.selectionStart = 0, 
d.selectionEnd = d.value.length), d.focus(); else {
if (c.is("body")) d.document.$.execCommand("SelectAll", !1, null); else {
var a = d.createRange();
a.selectNodeContents(c), a.select();
}
d.forceNextSelectionCheck(), d.selectionChange();
}
},
canUndo:!1
}), d.ui.addButton && d.ui.addButton("SelectAll", {
label:d.lang.selectall.toolbar,
command:"selectAll",
toolbar:"selection,10"
});
}
});
}(), function() {
var d = {
readOnly:1,
preserveState:!0,
editorFocus:!1,
exec:function(d) {
this.toggleState(), this.refresh(d);
},
refresh:function(d) {
if (d.document) {
var c = this.state != CKEDITOR.TRISTATE_ON || d.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && !d.focusManager.hasFocus ? "removeClass" :"attachClass";
d.editable()[c]("cke_show_blocks");
}
}
};
CKEDITOR.plugins.add("showblocks", {
onLoad:function() {
var c, a, b, j, i, k, d = [ "p", "div", "pre", "address", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6" ], g = CKEDITOR.getUrl(this.path), h = !(CKEDITOR.env.ie && CKEDITOR.env.version < 9), f = h ? ":not([contenteditable=false]):not(.cke_show_blocks_off)" :"";
for (c = a = b = j = ""; i = d.pop(); ) k = d.length ? "," :"", c += ".cke_show_blocks " + i + f + k, 
b += ".cke_show_blocks.cke_contents_ltr " + i + f + k, j += ".cke_show_blocks.cke_contents_rtl " + i + f + k, 
a += ".cke_show_blocks " + i + f + "{background-image:url(" + g + "images/block_" + i + ".png)}";
CKEDITOR.addCss((c + "{background-repeat:no-repeat;border:1px dotted gray;padding-top:8px}").concat(a, b + "{background-position:top left;padding-left:8px}", j + "{background-position:top right;padding-right:8px}")), 
h || CKEDITOR.addCss(".cke_show_blocks [contenteditable=false],.cke_show_blocks .cke_show_blocks_off{border:none;padding-top:0;background-image:none}.cke_show_blocks.cke_contents_rtl [contenteditable=false],.cke_show_blocks.cke_contents_rtl .cke_show_blocks_off{padding-right:0}.cke_show_blocks.cke_contents_ltr [contenteditable=false],.cke_show_blocks.cke_contents_ltr .cke_show_blocks_off{padding-left:0}");
},
init:function(e) {
function c() {
a.refresh(e);
}
if (!e.blockless) {
var a = e.addCommand("showblocks", d);
a.canUndo = !1, e.config.startupOutlineBlocks && a.setState(CKEDITOR.TRISTATE_ON), 
e.ui.addButton && e.ui.addButton("ShowBlocks", {
label:e.lang.showblocks.toolbar,
command:"showblocks",
toolbar:"tools,20"
}), e.on("mode", function() {
a.state != CKEDITOR.TRISTATE_DISABLED && a.refresh(e);
}), e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (e.on("focus", c), e.on("blur", c)), 
e.on("contentDom", function() {
a.state != CKEDITOR.TRISTATE_DISABLED && a.refresh(e);
});
}
}
});
}(), function() {
var d = {
preserveState:!0,
editorFocus:!1,
readOnly:1,
exec:function(d) {
this.toggleState(), this.refresh(d);
},
refresh:function(d) {
if (d.document) {
var c = this.state == CKEDITOR.TRISTATE_ON ? "attachClass" :"removeClass";
d.editable()[c]("cke_show_borders");
}
}
};
CKEDITOR.plugins.add("showborders", {
modes:{
wysiwyg:1
},
onLoad:function() {
var d;
d = (CKEDITOR.env.ie6Compat ? [ ".%1 table.%2,", ".%1 table.%2 td, .%1 table.%2 th", "{", "border : #d3d3d3 1px dotted", "}" ] :[ ".%1 table.%2,", ".%1 table.%2 > tr > td, .%1 table.%2 > tr > th,", ".%1 table.%2 > tbody > tr > td, .%1 table.%2 > tbody > tr > th,", ".%1 table.%2 > thead > tr > td, .%1 table.%2 > thead > tr > th,", ".%1 table.%2 > tfoot > tr > td, .%1 table.%2 > tfoot > tr > th", "{", "border : #d3d3d3 1px dotted", "}" ]).join("").replace(/%2/g, "cke_show_border").replace(/%1/g, "cke_show_borders "), 
CKEDITOR.addCss(d);
},
init:function(e) {
var c = e.addCommand("showborders", d);
c.canUndo = !1, e.config.startupShowBorders !== !1 && c.setState(CKEDITOR.TRISTATE_ON), 
e.on("mode", function() {
c.state != CKEDITOR.TRISTATE_DISABLED && c.refresh(e);
}, null, null, 100), e.on("contentDom", function() {
c.state != CKEDITOR.TRISTATE_DISABLED && c.refresh(e);
}), e.on("removeFormatCleanup", function(a) {
a = a.data, e.getCommand("showborders").state == CKEDITOR.TRISTATE_ON && a.is("table") && (!a.hasAttribute("border") || parseInt(a.getAttribute("border"), 10) <= 0) && a.addClass("cke_show_border");
});
},
afterInit:function(d) {
var c = d.dataProcessor, d = c && c.dataFilter, c = c && c.htmlFilter;
d && d.addRules({
elements:{
table:function(a) {
var a = a.attributes, b = a["class"], c = parseInt(a.border, 10);
c && !(0 >= c) || b && -1 != b.indexOf("cke_show_border") || (a["class"] = (b || "") + " cke_show_border");
}
}
}), c && c.addRules({
elements:{
table:function(a) {
var a = a.attributes, b = a["class"];
b && (a["class"] = b.replace("cke_show_border", "").replace(/\s{2}/, " ").replace(/^\s+|\s+$/, ""));
}
}
});
}
}), CKEDITOR.on("dialogDefinition", function(d) {
var c = d.data.name;
("table" == c || "tableProperties" == c) && (d = d.data.definition, c = d.getContents("info").get("txtBorder"), 
c.commit = CKEDITOR.tools.override(c.commit, function(a) {
return function(b, c) {
a.apply(this, arguments);
var d = parseInt(this.getValue(), 10);
c[!d || 0 >= d ? "addClass" :"removeClass"]("cke_show_border");
};
}), (d = (d = d.getContents("advanced")) && d.get("advCSSClasses")) && (d.setup = CKEDITOR.tools.override(d.setup, function(a) {
return function() {
a.apply(this, arguments), this.setValue(this.getValue().replace(/cke_show_border/, ""));
};
}), d.commit = CKEDITOR.tools.override(d.commit, function(a) {
return function(b, c) {
a.apply(this, arguments), parseInt(c.getAttribute("border"), 10) || c.addClass("cke_show_border");
};
})));
});
}(), CKEDITOR.plugins.add("smiley", {
requires:"dialog",
init:function(d) {
d.config.smiley_path = d.config.smiley_path || this.path + "images/", d.addCommand("smiley", new CKEDITOR.dialogCommand("smiley", {
allowedContent:"img[alt,height,!src,title,width]",
requiredContent:"img"
})), d.ui.addButton && d.ui.addButton("Smiley", {
label:d.lang.smiley.toolbar,
command:"smiley",
toolbar:"insert,50"
}), CKEDITOR.dialog.add("smiley", this.path + "dialogs/smiley.js");
}
}), CKEDITOR.config.smiley_images = "regular_smile.png sad_smile.png wink_smile.png teeth_smile.png confused_smile.png tongue_smile.png embarrassed_smile.png omg_smile.png whatchutalkingabout_smile.png angry_smile.png angel_smile.png shades_smile.png devil_smile.png cry_smile.png lightbulb.png thumbs_down.png thumbs_up.png heart.png broken_heart.png kiss.png envelope.png".split(" "), 
CKEDITOR.config.smiley_descriptions = "smiley;sad;wink;laugh;frown;cheeky;blush;surprise;indecision;angry;angel;cool;devil;crying;enlightened;no;yes;heart;broken heart;kiss;mail".split(";"), 
function() {
CKEDITOR.plugins.add("sourcearea", {
init:function(e) {
function c() {
this.hide(), this.setStyle("height", this.getParent().$.clientHeight + "px"), this.setStyle("width", this.getParent().$.clientWidth + "px"), 
this.show();
}
if (e.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
var a = CKEDITOR.plugins.sourcearea;
e.addMode("source", function(a) {
var j = e.ui.space("contents").getDocument().createElement("textarea");
j.setStyles(CKEDITOR.tools.extend({
width:CKEDITOR.env.ie7Compat ? "99%" :"100%",
height:"100%",
resize:"none",
outline:"none",
"text-align":"left"
}, CKEDITOR.tools.cssVendorPrefix("tab-size", e.config.sourceAreaTabSize || 4))), 
j.setAttribute("dir", "ltr"), j.addClass("cke_source cke_reset cke_enable_context_menu"), 
e.ui.space("contents").append(j), j = e.editable(new d(e, j)), j.setData(e.getData(1)), 
CKEDITOR.env.ie && (j.attachListener(e, "resize", c, j), j.attachListener(CKEDITOR.document.getWindow(), "resize", c, j), 
CKEDITOR.tools.setTimeout(c, 0, j)), e.fire("ariaWidget", this), a();
}), e.addCommand("source", a.commands.source), e.ui.addButton && e.ui.addButton("Source", {
label:e.lang.sourcearea.toolbar,
command:"source",
toolbar:"mode,10"
}), e.on("mode", function() {
e.getCommand("source").setState("source" == e.mode ? CKEDITOR.TRISTATE_ON :CKEDITOR.TRISTATE_OFF);
});
}
}
});
var d = CKEDITOR.tools.createClass({
base:CKEDITOR.editable,
proto:{
setData:function(d) {
this.setValue(d), this.editor.fire("dataReady");
},
getData:function() {
return this.getValue();
},
insertHtml:function() {},
insertElement:function() {},
insertText:function() {},
setReadOnly:function(d) {
this[(d ? "set" :"remove") + "Attribute"]("readOnly", "readonly");
},
detach:function() {
d.baseProto.detach.call(this), this.clearCustomData(), this.remove();
}
}
});
}(), CKEDITOR.plugins.sourcearea = {
commands:{
source:{
modes:{
wysiwyg:1,
source:1
},
editorFocus:!1,
readOnly:1,
exec:function(d) {
"wysiwyg" == d.mode && d.fire("saveSnapshot"), d.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED), 
d.setMode("source" == d.mode ? "wysiwyg" :"source");
},
canUndo:!1
}
}
}, CKEDITOR.plugins.add("specialchar", {
availableLangs:{
ar:1,
bg:1,
ca:1,
cs:1,
cy:1,
de:1,
el:1,
en:1,
eo:1,
es:1,
et:1,
fa:1,
fi:1,
fr:1,
"fr-ca":1,
gl:1,
he:1,
hr:1,
hu:1,
id:1,
it:1,
ja:1,
km:1,
ku:1,
lv:1,
nb:1,
nl:1,
no:1,
pl:1,
pt:1,
"pt-br":1,
ru:1,
si:1,
sk:1,
sl:1,
sq:1,
sv:1,
th:1,
tr:1,
ug:1,
uk:1,
vi:1,
zh:1,
"zh-cn":1
},
requires:"dialog",
init:function(d) {
var e = this;
CKEDITOR.dialog.add("specialchar", this.path + "dialogs/specialchar.js"), d.addCommand("specialchar", {
exec:function() {
var c = d.langCode, c = e.availableLangs[c] ? c :e.availableLangs[c.replace(/-.*/, "")] ? c.replace(/-.*/, "") :"en";
CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e.path + "dialogs/lang/" + c + ".js"), function() {
CKEDITOR.tools.extend(d.lang.specialchar, e.langEntries[c]), d.openDialog("specialchar");
});
},
modes:{
wysiwyg:1
},
canUndo:!1
}), d.ui.addButton && d.ui.addButton("SpecialChar", {
label:d.lang.specialchar.toolbar,
command:"specialchar",
toolbar:"insert,50"
});
}
}), CKEDITOR.config.specialChars = "! &quot; # $ % &amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ &euro; &lsquo; &rsquo; &ldquo; &rdquo; &ndash; &mdash; &iexcl; &cent; &pound; &curren; &yen; &brvbar; &sect; &uml; &copy; &ordf; &laquo; &not; &reg; &macr; &deg; &sup2; &sup3; &acute; &micro; &para; &middot; &cedil; &sup1; &ordm; &raquo; &frac14; &frac12; &frac34; &iquest; &Agrave; &Aacute; &Acirc; &Atilde; &Auml; &Aring; &AElig; &Ccedil; &Egrave; &Eacute; &Ecirc; &Euml; &Igrave; &Iacute; &Icirc; &Iuml; &ETH; &Ntilde; &Ograve; &Oacute; &Ocirc; &Otilde; &Ouml; &times; &Oslash; &Ugrave; &Uacute; &Ucirc; &Uuml; &Yacute; &THORN; &szlig; &agrave; &aacute; &acirc; &atilde; &auml; &aring; &aelig; &ccedil; &egrave; &eacute; &ecirc; &euml; &igrave; &iacute; &icirc; &iuml; &eth; &ntilde; &ograve; &oacute; &ocirc; &otilde; &ouml; &divide; &oslash; &ugrave; &uacute; &ucirc; &uuml; &yacute; &thorn; &yuml; &OElig; &oelig; &#372; &#374 &#373 &#375; &sbquo; &#8219; &bdquo; &hellip; &trade; &#9658; &bull; &rarr; &rArr; &hArr; &diams; &asymp;".split(" "), 
function() {
CKEDITOR.plugins.add("stylescombo", {
requires:"richcombo",
init:function(d) {
var e = d.config, c = d.lang.stylescombo, a = {}, b = [], j = [];
d.on("stylesSet", function(c) {
if (c = c.data.styles) {
for (var h, f, i = 0, k = c.length; k > i; i++) h = c[i], d.blockless && h.element in CKEDITOR.dtd.$block || (f = h.name, 
h = new CKEDITOR.style(h), (!d.filter.customConfig || d.filter.check(h)) && (h._name = f, 
h._.enterMode = e.enterMode, h._.weight = i + 1e3 * (h.type == CKEDITOR.STYLE_OBJECT ? 1 :h.type == CKEDITOR.STYLE_BLOCK ? 2 :3), 
a[f] = h, b.push(h), j.push(h)));
b.sort(function(a, b) {
return a._.weight - b._.weight;
});
}
}), d.ui.addRichCombo("Styles", {
label:c.label,
title:c.panelTitle,
toolbar:"styles,10",
allowedContent:j,
panel:{
css:[ CKEDITOR.skin.getPath("editor") ].concat(e.contentsCss),
multiSelect:!0,
attributes:{
"aria-label":c.panelTitle
}
},
init:function() {
var a, d, e, i, j, n;
for (j = 0, n = b.length; n > j; j++) a = b[j], d = a._name, i = a.type, i != e && (this.startGroup(c["panelTitle" + i]), 
e = i), this.add(d, a.type == CKEDITOR.STYLE_OBJECT ? d :a.buildPreview(), d);
this.commit();
},
onClick:function(b) {
d.focus(), d.fire("saveSnapshot");
var b = a[b], c = d.elementPath();
d[b.checkActive(c) ? "removeStyle" :"applyStyle"](b), d.fire("saveSnapshot");
},
onRender:function() {
d.on("selectionChange", function(b) {
for (var j, c = this.getValue(), b = b.data.path.elements, d = 0, e = b.length; e > d; d++) {
j = b[d];
for (var n in a) if (a[n].checkElementRemovable(j, !0)) return n != c && this.setValue(n), 
void 0;
}
this.setValue("");
}, this);
},
onOpen:function() {
var b = d.getSelection().getSelectedElement(), b = d.elementPath(b), e = [ 0, 0, 0, 0 ];
this.showAll(), this.unmarkAll();
for (var f in a) {
var j = a[f], k = j.type;
j.checkApplicable(b, d.activeFilter) ? e[k]++ :this.hideItem(f), j.checkActive(b) && this.mark(f);
}
e[CKEDITOR.STYLE_BLOCK] || this.hideGroup(c["panelTitle" + CKEDITOR.STYLE_BLOCK]), 
e[CKEDITOR.STYLE_INLINE] || this.hideGroup(c["panelTitle" + CKEDITOR.STYLE_INLINE]), 
e[CKEDITOR.STYLE_OBJECT] || this.hideGroup(c["panelTitle" + CKEDITOR.STYLE_OBJECT]);
},
refresh:function() {
var b = d.elementPath();
if (b) {
for (var c in a) if (a[c].checkApplicable(b, d.activeFilter)) return;
this.setState(CKEDITOR.TRISTATE_DISABLED);
}
},
reset:function() {
a = {}, b = [];
}
});
}
});
}(), function() {
function d(a) {
return {
editorFocus:!1,
canUndo:!1,
modes:{
wysiwyg:1
},
exec:function(c) {
if (c.editable().hasFocus) {
var e, d = c.getSelection();
if (e = new CKEDITOR.dom.elementPath(d.getCommonAncestor(), d.root).contains({
td:1,
th:1
}, 1)) {
var d = c.createRange(), f = CKEDITOR.tools.tryThese(function() {
var c = e.getParent().$.cells[e.$.cellIndex + (a ? -1 :1)];
return c.parentNode.parentNode, c;
}, function() {
var c = e.getParent(), c = c.getAscendant("table").$.rows[c.$.rowIndex + (a ? -1 :1)];
return c.cells[a ? c.cells.length - 1 :0];
});
if (f || a) {
if (!f) return !0;
f = new CKEDITOR.dom.element(f), d.moveToElementEditStart(f), (!d.checkStartOfBlock() || !d.checkEndOfBlock()) && d.selectNodeContents(f);
} else {
for (var i = e.getAscendant("table").$, f = e.getParent().$.cells, i = new CKEDITOR.dom.element(i.insertRow(-1), c.document), k = 0, n = f.length; n > k; k++) i.append(new CKEDITOR.dom.element(f[k], c.document).clone(!1, !1)).appendBogus();
d.moveToElementEditStart(i);
}
return d.select(!0), !0;
}
}
return !1;
}
};
}
var e = {
editorFocus:!1,
modes:{
wysiwyg:1,
source:1
}
}, c = {
exec:function(a) {
a.container.focusNext(!0, a.tabIndex);
}
}, a = {
exec:function(a) {
a.container.focusPrevious(!0, a.tabIndex);
}
};
CKEDITOR.plugins.add("tab", {
init:function(b) {
for (var j = b.config.enableTabKeyTools !== !1, g = b.config.tabSpaces || 0, h = ""; g--; ) h += "\xa0";
h && b.on("key", function(a) {
9 == a.data.keyCode && (b.insertHtml(h), a.cancel());
}), j && b.on("key", function(a) {
(9 == a.data.keyCode && b.execCommand("selectNextCell") || a.data.keyCode == CKEDITOR.SHIFT + 9 && b.execCommand("selectPreviousCell")) && a.cancel();
}), b.addCommand("blur", CKEDITOR.tools.extend(c, e)), b.addCommand("blurBack", CKEDITOR.tools.extend(a, e)), 
b.addCommand("selectNextCell", d()), b.addCommand("selectPreviousCell", d(!0));
}
});
}(), CKEDITOR.dom.element.prototype.focusNext = function(d, e) {
var a, b, j, g, h, f, c = void 0 === e ? this.getTabIndex() :e;
if (0 >= c) for (h = this.getNextSourceNode(d, CKEDITOR.NODE_ELEMENT); h; ) {
if (h.isVisible() && 0 === h.getTabIndex()) {
j = h;
break;
}
h = h.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT);
} else for (h = this.getDocument().getBody().getFirst(); h = h.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT); ) {
if (!a) if (!b && h.equals(this)) {
if (b = !0, d) {
if (!(h = h.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break;
a = 1;
}
} else b && !this.contains(h) && (a = 1);
if (h.isVisible() && !((f = h.getTabIndex()) < 0)) {
if (a && f == c) {
j = h;
break;
}
f > c && (!j || !g || g > f) ? (j = h, g = f) :j || 0 !== f || (j = h, g = f);
}
}
j && j.focus();
}, CKEDITOR.dom.element.prototype.focusPrevious = function(d, e) {
for (var a, b, j, h, c = void 0 === e ? this.getTabIndex() :e, g = 0, f = this.getDocument().getBody().getLast(); f = f.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT); ) {
if (!a) if (!b && f.equals(this)) {
if (b = !0, d) {
if (!(f = f.getPreviousSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break;
a = 1;
}
} else b && !this.contains(f) && (a = 1);
if (f.isVisible() && !((h = f.getTabIndex()) < 0)) if (0 >= c) {
if (a && 0 === h) {
j = f;
break;
}
h > g && (j = f, g = h);
} else {
if (a && h == c) {
j = f;
break;
}
c > h && (!j || h > g) && (j = f, g = h);
}
}
j && j.focus();
}, CKEDITOR.plugins.add("table", {
requires:"dialog",
init:function(d) {
function e(a) {
return CKEDITOR.tools.extend(a || {}, {
contextSensitive:1,
refresh:function(a, c) {
this.setState(c.contains("table", 1) ? CKEDITOR.TRISTATE_OFF :CKEDITOR.TRISTATE_DISABLED);
}
});
}
if (!d.blockless) {
var c = d.lang.table;
d.addCommand("table", new CKEDITOR.dialogCommand("table", {
context:"table",
allowedContent:"table{width,height}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];" + (d.plugins.dialogadvtab ? "table" + d.plugins.dialogadvtab.allowedContent() :""),
requiredContent:"table",
contentTransformations:[ [ "table{width}: sizeToStyle", "table[width]: sizeToAttribute" ] ]
})), d.addCommand("tableProperties", new CKEDITOR.dialogCommand("tableProperties", e())), 
d.addCommand("tableDelete", e({
exec:function(a) {
var b = a.elementPath().contains("table", 1);
if (b) {
var c = b.getParent();
1 == c.getChildCount() && !c.is("body", "td", "th") && (b = c), a = a.createRange(), 
a.moveToPosition(b, CKEDITOR.POSITION_BEFORE_START), b.remove(), a.select();
}
}
})), d.ui.addButton && d.ui.addButton("Table", {
label:c.toolbar,
command:"table",
toolbar:"insert,30"
}), CKEDITOR.dialog.add("table", this.path + "dialogs/table.js"), CKEDITOR.dialog.add("tableProperties", this.path + "dialogs/table.js"), 
d.addMenuItems && d.addMenuItems({
table:{
label:c.menu,
command:"tableProperties",
group:"table",
order:5
},
tabledelete:{
label:c.deleteTable,
command:"tableDelete",
group:"table",
order:1
}
}), d.on("doubleclick", function(a) {
a.data.element.is("table") && (a.data.dialog = "tableProperties");
}), d.contextMenu && d.contextMenu.addListener(function() {
return {
tabledelete:CKEDITOR.TRISTATE_OFF,
table:CKEDITOR.TRISTATE_OFF
};
});
}
}
}), function() {
function d(a) {
function b(a) {
c.length > 0 || a.type != CKEDITOR.NODE_ELEMENT || !o.test(a.getName()) || a.getCustomData("selected_cell") || (CKEDITOR.dom.element.setMarker(d, a, "selected_cell", !0), 
c.push(a));
}
for (var a = a.getRanges(), c = [], d = {}, e = 0; e < a.length; e++) {
var g = a[e];
if (g.collapsed) g = g.getCommonAncestor(), (g = g.getAscendant("td", !0) || g.getAscendant("th", !0)) && c.push(g); else {
var f, g = new CKEDITOR.dom.walker(g);
for (g.guard = b; f = g.next(); ) f.type == CKEDITOR.NODE_ELEMENT && f.is(CKEDITOR.dtd.table) || (f = f.getAscendant("td", !0) || f.getAscendant("th", !0)) && !f.getCustomData("selected_cell") && (CKEDITOR.dom.element.setMarker(d, f, "selected_cell", !0), 
c.push(f));
}
}
return CKEDITOR.dom.element.clearAllMarkers(d), c;
}
function e(a, b) {
for (var c = d(a), e = c[0], g = e.getAscendant("table"), e = e.getDocument(), f = c[0].getParent(), h = f.$.rowIndex, c = c[c.length - 1], j = c.getParent().$.rowIndex + c.$.rowSpan - 1, c = new CKEDITOR.dom.element(g.$.rows[j]), h = b ? h :j, f = b ? f :c, c = CKEDITOR.tools.buildTableMap(g), g = c[h], h = b ? c[h - 1] :c[h + 1], c = c[0].length, e = e.createElement("tr"), j = 0; g[j] && c > j; j++) {
var i;
g[j].rowSpan > 1 && h && g[j] == h[j] ? (i = g[j], i.rowSpan = i.rowSpan + 1) :(i = new CKEDITOR.dom.element(g[j]).clone(), 
i.removeAttribute("rowSpan"), i.appendBogus(), e.append(i), i = i.$), j += i.colSpan - 1;
}
b ? e.insertBefore(f) :e.insertAfter(f);
}
function c(a) {
if (a instanceof CKEDITOR.dom.selection) {
for (var b = d(a), e = b[0].getAscendant("table"), g = CKEDITOR.tools.buildTableMap(e), a = b[0].getParent().$.rowIndex, b = b[b.length - 1], f = b.getParent().$.rowIndex + b.$.rowSpan - 1, b = [], h = a; f >= h; h++) {
for (var j = g[h], i = new CKEDITOR.dom.element(e.$.rows[h]), k = 0; k < j.length; k++) {
var n = new CKEDITOR.dom.element(j[k]), o = n.getParent().$.rowIndex;
1 == n.$.rowSpan ? n.remove() :(n.$.rowSpan = n.$.rowSpan - 1, o == h && (o = g[h + 1], 
o[k - 1] ? n.insertAfter(new CKEDITOR.dom.element(o[k - 1])) :new CKEDITOR.dom.element(e.$.rows[h + 1]).append(n, 1))), 
k += n.$.colSpan - 1;
}
b.push(i);
}
for (g = e.$.rows, e = new CKEDITOR.dom.element(g[f + 1] || (a > 0 ? g[a - 1] :null) || e.$.parentNode), 
h = b.length; h >= 0; h--) c(b[h]);
return e;
}
return a instanceof CKEDITOR.dom.element && (e = a.getAscendant("table"), 1 == e.$.rows.length ? e.remove() :a.remove()), 
null;
}
function a(a, b) {
for (var c = b ? 1/0 :0, d = 0; d < a.length; d++) {
var e;
e = a[d];
for (var g = b, f = e.getParent().$.cells, h = 0, j = 0; j < f.length; j++) {
var i = f[j], h = h + (g ? 1 :i.colSpan);
if (i == e.$) break;
}
e = h - 1, (b ? c > e :e > c) && (c = e);
}
return c;
}
function b(b, c) {
for (var e = d(b), g = e[0].getAscendant("table"), f = a(e, 1), e = a(e), f = c ? f :e, h = CKEDITOR.tools.buildTableMap(g), g = [], e = [], j = h.length, i = 0; j > i; i++) g.push(h[i][f]), 
e.push(c ? h[i][f - 1] :h[i][f + 1]);
for (i = 0; j > i; i++) g[i] && (g[i].colSpan > 1 && e[i] == g[i] ? (f = g[i], f.colSpan = f.colSpan + 1) :(f = new CKEDITOR.dom.element(g[i]).clone(), 
f.removeAttribute("colSpan"), f.appendBogus(), f[c ? "insertBefore" :"insertAfter"].call(f, new CKEDITOR.dom.element(g[i])), 
f = f.$), i += f.rowSpan - 1);
}
function j(a, b) {
var c = a.getStartElement();
if (c = c.getAscendant("td", 1) || c.getAscendant("th", 1)) {
var d = c.clone();
d.appendBogus(), b ? d.insertBefore(c) :d.insertAfter(c);
}
}
function g(a) {
if (a instanceof CKEDITOR.dom.selection) {
var c, a = d(a), b = a[0] && a[0].getAscendant("table");
a:{
var e = 0;
c = a.length - 1;
for (var i, j, f = {}; i = a[e++]; ) CKEDITOR.dom.element.setMarker(f, i, "delete_cell", !0);
for (e = 0; i = a[e++]; ) if ((j = i.getPrevious()) && !j.getCustomData("delete_cell") || (j = i.getNext()) && !j.getCustomData("delete_cell")) {
CKEDITOR.dom.element.clearAllMarkers(f), c = j;
break a;
}
CKEDITOR.dom.element.clearAllMarkers(f), j = a[0].getParent(), (j = j.getPrevious()) ? c = j.getLast() :(j = a[c].getParent(), 
c = (j = j.getNext()) ? j.getChild(0) :null);
}
for (j = a.length - 1; j >= 0; j--) g(a[j]);
c ? h(c, !0) :b && b.remove();
} else a instanceof CKEDITOR.dom.element && (b = a.getParent(), 1 == b.getChildCount() ? b.remove() :a.remove());
}
function h(a, b) {
var c = a.getDocument(), d = CKEDITOR.document;
CKEDITOR.env.ie && CKEDITOR.env.version < 11 && (d.focus(), c.focus()), c = new CKEDITOR.dom.range(c), 
c["moveToElementEdit" + (b ? "End" :"Start")](a) || (c.selectNodeContents(a), c.collapse(b ? !1 :!0)), 
c.select(!0);
}
function f(a, b, c) {
if (a = a[b], "undefined" == typeof c) return a;
for (b = 0; a && b < a.length; b++) {
if (c.is && a[b] == c.$) return b;
if (b == c) return new CKEDITOR.dom.element(a[b]);
}
return c.is ? -1 :null;
}
function i(a, b, c) {
var g, e = d(a);
if ((b ? 1 != e.length :e.length < 2) || (g = a.getCommonAncestor()) && g.type == CKEDITOR.NODE_ELEMENT && g.is("table")) return !1;
var h, a = e[0];
g = a.getAscendant("table");
var j = CKEDITOR.tools.buildTableMap(g), i = j.length, k = j[0].length, n = a.getParent().$.rowIndex, o = f(j, n, a);
if (b) {
var x;
try {
var y = parseInt(a.getAttribute("rowspan"), 10) || 1;
h = parseInt(a.getAttribute("colspan"), 10) || 1, x = j["up" == b ? n - y :"down" == b ? n + y :n]["left" == b ? o - h :"right" == b ? o + h :o];
} catch (z) {
return !1;
}
if (!x || a.$ == x) return !1;
e["up" == b || "left" == b ? "unshift" :"push"](new CKEDITOR.dom.element(x));
}
for (var b = a.getDocument(), B = n, y = x = 0, F = !c && new CKEDITOR.dom.documentFragment(b), C = 0, b = 0; b < e.length; b++) {
h = e[b];
var D = h.getParent(), E = h.getFirst(), I = h.$.colSpan, J = h.$.rowSpan, D = D.$.rowIndex, G = f(j, D, h), C = C + I * J, y = Math.max(y, G - o + I);
x = Math.max(x, D - n + J), c || (I = h, (J = I.getBogus()) && J.remove(), I.trim(), 
h.getChildren().count() && (D == B || !E || E.isBlockBoundary && E.isBlockBoundary({
br:1
}) || (B = F.getLast(CKEDITOR.dom.walker.whitespaces(!0))) && (!B.is || !B.is("br")) && F.append("br"), 
h.moveChildren(F)), b ? h.remove() :h.setHtml("")), B = D;
}
if (c) return x * y == C;
for (F.moveChildren(a), a.appendBogus(), y >= k ? a.removeAttribute("rowSpan") :a.$.rowSpan = x, 
x >= i ? a.removeAttribute("colSpan") :a.$.colSpan = y, c = new CKEDITOR.dom.nodeList(g.$.rows), 
e = c.count(), b = e - 1; b >= 0; b--) g = c.getItem(b), g.$.cells.length || (g.remove(), 
e++);
return a;
}
function k(a, b) {
var c = d(a);
if (c.length > 1) return !1;
if (b) return !0;
var n, c = c[0], e = c.getParent(), g = e.getAscendant("table"), h = CKEDITOR.tools.buildTableMap(g), j = e.$.rowIndex, i = f(h, j, c), k = c.$.rowSpan;
if (k > 1) {
n = Math.ceil(k / 2);
for (var o, k = Math.floor(k / 2), e = j + n, g = new CKEDITOR.dom.element(g.$.rows[e]), h = f(h, e), e = c.clone(), j = 0; j < h.length; j++) {
if (o = h[j], o.parentNode == g.$ && j > i) {
e.insertBefore(new CKEDITOR.dom.element(o));
break;
}
o = null;
}
o || g.append(e, !0);
} else for (k = n = 1, g = e.clone(), g.insertAfter(e), g.append(e = c.clone()), 
o = f(h, j), i = 0; i < o.length; i++) o[i].rowSpan++;
return e.appendBogus(), c.$.rowSpan = n, e.$.rowSpan = k, 1 == n && c.removeAttribute("rowSpan"), 
1 == k && e.removeAttribute("rowSpan"), e;
}
function n(a, b) {
var c = d(a);
if (c.length > 1) return !1;
if (b) return !0;
var c = c[0], e = c.getParent(), g = e.getAscendant("table"), g = CKEDITOR.tools.buildTableMap(g), h = f(g, e.$.rowIndex, c), j = c.$.colSpan;
if (j > 1) e = Math.ceil(j / 2), j = Math.floor(j / 2); else {
for (var j = e = 1, i = [], k = 0; k < g.length; k++) {
var n = g[k];
i.push(n[h]), n[h].rowSpan > 1 && (k += n[h].rowSpan - 1);
}
for (g = 0; g < i.length; g++) i[g].colSpan++;
}
return g = c.clone(), g.insertAfter(c), g.appendBogus(), c.$.colSpan = e, g.$.colSpan = j, 
1 == e && c.removeAttribute("colSpan"), 1 == j && g.removeAttribute("colSpan"), 
g;
}
var o = /^(?:td|th)$/;
CKEDITOR.plugins.tabletools = {
requires:"table,dialog,contextmenu",
init:function(a) {
function f(a) {
return CKEDITOR.tools.extend(a || {}, {
contextSensitive:1,
refresh:function(a, b) {
this.setState(b.contains({
td:1,
th:1
}, 1) ? CKEDITOR.TRISTATE_OFF :CKEDITOR.TRISTATE_DISABLED);
}
});
}
function m(b, c) {
var d = a.addCommand(b, c);
a.addFeature(d);
}
var o = a.lang.table;
m("cellProperties", new CKEDITOR.dialogCommand("cellProperties", f({
allowedContent:"td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]",
requiredContent:"table"
}))), CKEDITOR.dialog.add("cellProperties", this.path + "dialogs/tableCell.js"), 
m("rowDelete", f({
requiredContent:"table",
exec:function(a) {
a = a.getSelection(), h(c(a));
}
})), m("rowInsertBefore", f({
requiredContent:"table",
exec:function(a) {
a = a.getSelection(), e(a, !0);
}
})), m("rowInsertAfter", f({
requiredContent:"table",
exec:function(a) {
a = a.getSelection(), e(a);
}
})), m("columnDelete", f({
requiredContent:"table",
exec:function(a) {
for (var g, f, a = a.getSelection(), a = d(a), b = a[0], c = a[a.length - 1], a = b.getAscendant("table"), e = CKEDITOR.tools.buildTableMap(a), j = [], i = 0, l = e.length; l > i; i++) for (var k = 0, m = e[i].length; m > k; k++) e[i][k] == b.$ && (g = k), 
e[i][k] == c.$ && (f = k);
for (i = g; f >= i; i++) for (k = 0; k < e.length; k++) c = e[k], b = new CKEDITOR.dom.element(a.$.rows[k]), 
c = new CKEDITOR.dom.element(c[i]), c.$ && (1 == c.$.colSpan ? c.remove() :c.$.colSpan = c.$.colSpan - 1, 
k += c.$.rowSpan - 1, b.$.cells.length || j.push(b));
f = a.$.rows[0] && a.$.rows[0].cells, g = new CKEDITOR.dom.element(f[g] || (g ? f[g - 1] :a.$.parentNode)), 
j.length == l && a.remove(), g && h(g, !0);
}
})), m("columnInsertBefore", f({
requiredContent:"table",
exec:function(a) {
a = a.getSelection(), b(a, !0);
}
})), m("columnInsertAfter", f({
requiredContent:"table",
exec:function(a) {
a = a.getSelection(), b(a);
}
})), m("cellDelete", f({
requiredContent:"table",
exec:function(a) {
a = a.getSelection(), g(a);
}
})), m("cellMerge", f({
allowedContent:"td[colspan,rowspan]",
requiredContent:"td[colspan,rowspan]",
exec:function(a) {
h(i(a.getSelection()), !0);
}
})), m("cellMergeRight", f({
allowedContent:"td[colspan]",
requiredContent:"td[colspan]",
exec:function(a) {
h(i(a.getSelection(), "right"), !0);
}
})), m("cellMergeDown", f({
allowedContent:"td[rowspan]",
requiredContent:"td[rowspan]",
exec:function(a) {
h(i(a.getSelection(), "down"), !0);
}
})), m("cellVerticalSplit", f({
allowedContent:"td[rowspan]",
requiredContent:"td[rowspan]",
exec:function(a) {
h(k(a.getSelection()));
}
})), m("cellHorizontalSplit", f({
allowedContent:"td[colspan]",
requiredContent:"td[colspan]",
exec:function(a) {
h(n(a.getSelection()));
}
})), m("cellInsertBefore", f({
requiredContent:"table",
exec:function(a) {
a = a.getSelection(), j(a, !0);
}
})), m("cellInsertAfter", f({
requiredContent:"table",
exec:function(a) {
a = a.getSelection(), j(a);
}
})), a.addMenuItems && a.addMenuItems({
tablecell:{
label:o.cell.menu,
group:"tablecell",
order:1,
getItems:function() {
var b = a.getSelection(), c = d(b);
return {
tablecell_insertBefore:CKEDITOR.TRISTATE_OFF,
tablecell_insertAfter:CKEDITOR.TRISTATE_OFF,
tablecell_delete:CKEDITOR.TRISTATE_OFF,
tablecell_merge:i(b, null, !0) ? CKEDITOR.TRISTATE_OFF :CKEDITOR.TRISTATE_DISABLED,
tablecell_merge_right:i(b, "right", !0) ? CKEDITOR.TRISTATE_OFF :CKEDITOR.TRISTATE_DISABLED,
tablecell_merge_down:i(b, "down", !0) ? CKEDITOR.TRISTATE_OFF :CKEDITOR.TRISTATE_DISABLED,
tablecell_split_vertical:k(b, !0) ? CKEDITOR.TRISTATE_OFF :CKEDITOR.TRISTATE_DISABLED,
tablecell_split_horizontal:n(b, !0) ? CKEDITOR.TRISTATE_OFF :CKEDITOR.TRISTATE_DISABLED,
tablecell_properties:c.length > 0 ? CKEDITOR.TRISTATE_OFF :CKEDITOR.TRISTATE_DISABLED
};
}
},
tablecell_insertBefore:{
label:o.cell.insertBefore,
group:"tablecell",
command:"cellInsertBefore",
order:5
},
tablecell_insertAfter:{
label:o.cell.insertAfter,
group:"tablecell",
command:"cellInsertAfter",
order:10
},
tablecell_delete:{
label:o.cell.deleteCell,
group:"tablecell",
command:"cellDelete",
order:15
},
tablecell_merge:{
label:o.cell.merge,
group:"tablecell",
command:"cellMerge",
order:16
},
tablecell_merge_right:{
label:o.cell.mergeRight,
group:"tablecell",
command:"cellMergeRight",
order:17
},
tablecell_merge_down:{
label:o.cell.mergeDown,
group:"tablecell",
command:"cellMergeDown",
order:18
},
tablecell_split_horizontal:{
label:o.cell.splitHorizontal,
group:"tablecell",
command:"cellHorizontalSplit",
order:19
},
tablecell_split_vertical:{
label:o.cell.splitVertical,
group:"tablecell",
command:"cellVerticalSplit",
order:20
},
tablecell_properties:{
label:o.cell.title,
group:"tablecellproperties",
command:"cellProperties",
order:21
},
tablerow:{
label:o.row.menu,
group:"tablerow",
order:1,
getItems:function() {
return {
tablerow_insertBefore:CKEDITOR.TRISTATE_OFF,
tablerow_insertAfter:CKEDITOR.TRISTATE_OFF,
tablerow_delete:CKEDITOR.TRISTATE_OFF
};
}
},
tablerow_insertBefore:{
label:o.row.insertBefore,
group:"tablerow",
command:"rowInsertBefore",
order:5
},
tablerow_insertAfter:{
label:o.row.insertAfter,
group:"tablerow",
command:"rowInsertAfter",
order:10
},
tablerow_delete:{
label:o.row.deleteRow,
group:"tablerow",
command:"rowDelete",
order:15
},
tablecolumn:{
label:o.column.menu,
group:"tablecolumn",
order:1,
getItems:function() {
return {
tablecolumn_insertBefore:CKEDITOR.TRISTATE_OFF,
tablecolumn_insertAfter:CKEDITOR.TRISTATE_OFF,
tablecolumn_delete:CKEDITOR.TRISTATE_OFF
};
}
},
tablecolumn_insertBefore:{
label:o.column.insertBefore,
group:"tablecolumn",
command:"columnInsertBefore",
order:5
},
tablecolumn_insertAfter:{
label:o.column.insertAfter,
group:"tablecolumn",
command:"columnInsertAfter",
order:10
},
tablecolumn_delete:{
label:o.column.deleteColumn,
group:"tablecolumn",
command:"columnDelete",
order:15
}
}), a.contextMenu && a.contextMenu.addListener(function(a, b, c) {
return (a = c.contains({
td:1,
th:1
}, 1)) && !a.isReadOnly() ? {
tablecell:CKEDITOR.TRISTATE_OFF,
tablerow:CKEDITOR.TRISTATE_OFF,
tablecolumn:CKEDITOR.TRISTATE_OFF
} :null;
});
},
getSelectedCells:d
}, CKEDITOR.plugins.add("tabletools", CKEDITOR.plugins.tabletools);
}(), CKEDITOR.tools.buildTableMap = function(d) {
for (var d = d.$.rows, e = -1, c = [], a = 0; a < d.length; a++) {
e++, !c[e] && (c[e] = []);
for (var b = -1, j = 0; j < d[a].cells.length; j++) {
var g = d[a].cells[j];
for (b++; c[e][b]; ) b++;
for (var h = isNaN(g.colSpan) ? 1 :g.colSpan, g = isNaN(g.rowSpan) ? 1 :g.rowSpan, f = 0; g > f; f++) {
c[e + f] || (c[e + f] = []);
for (var i = 0; h > i; i++) c[e + f][b + i] = d[a].cells[j];
}
b += h - 1;
}
}
return c;
}, function() {
CKEDITOR.plugins.add("templates", {
requires:"dialog",
init:function(c) {
CKEDITOR.dialog.add("templates", CKEDITOR.getUrl(this.path + "dialogs/templates.js")), 
c.addCommand("templates", new CKEDITOR.dialogCommand("templates")), c.ui.addButton && c.ui.addButton("Templates", {
label:c.lang.templates.button,
command:"templates",
toolbar:"doctools,10"
});
}
});
var d = {}, e = {};
CKEDITOR.addTemplates = function(c, a) {
d[c] = a;
}, CKEDITOR.getTemplates = function(c) {
return d[c];
}, CKEDITOR.loadTemplates = function(c, a) {
for (var b = [], d = 0, g = c.length; g > d; d++) e[c[d]] || (b.push(c[d]), e[c[d]] = 1);
b.length ? CKEDITOR.scriptLoader.load(b, a) :setTimeout(a, 0);
};
}(), CKEDITOR.config.templates_files = [ CKEDITOR.getUrl("plugins/templates/templates/default.js") ], 
CKEDITOR.config.templates_replaceContent = !0, function() {
function d(a) {
function c() {
for (var f = d(), j = CKEDITOR.tools.clone(a.config.toolbarGroups) || e(a), i = 0; i < j.length; i++) {
var k = j[i];
if ("/" != k) {
"string" == typeof k && (k = j[i] = {
name:k
});
var m, r = k.groups;
if (r) for (var p = 0; p < r.length; p++) m = r[p], (m = f[m]) && h(k, m);
(m = f[k.name]) && h(k, m);
}
}
return j;
}
function d() {
var e, g, f, c = {};
for (e in a.ui.items) g = a.ui.items[e], f = g.toolbar || "others", f = f.split(","), 
g = f[0], f = parseInt(f[1] || -1, 10), c[g] || (c[g] = []), c[g].push({
name:e,
order:f
});
for (g in c) c[g] = c[g].sort(function(a, b) {
return a.order == b.order ? 0 :b.order < 0 ? -1 :a.order < 0 ? 1 :a.order < b.order ? -1 :1;
});
return c;
}
function h(c, d) {
if (d.length) {
c.items ? c.items.push(a.ui.create("-")) :c.items = [];
for (var e; e = d.shift(); ) e = "string" == typeof e ? e :e.name, i && -1 != CKEDITOR.tools.indexOf(i, e) || (e = a.ui.create(e)) && a.addFeature(e) && c.items.push(e);
}
}
function f(a) {
var c, d, e, b = [];
for (c = 0; c < a.length; ++c) d = a[c], e = {}, "/" == d ? b.push(d) :CKEDITOR.tools.isArray(d) ? (h(e, CKEDITOR.tools.clone(d)), 
b.push(e)) :d.items && (h(e, CKEDITOR.tools.clone(d.items)), e.name = d.name, b.push(e));
return b;
}
var i = a.config.removeButtons, i = i && i.split(","), k = a.config.toolbar;
return "string" == typeof k && (k = a.config["toolbar_" + k]), a.toolbar = k ? f(k) :c();
}
function e(a) {
return a._.toolbarGroups || (a._.toolbarGroups = [ {
name:"document",
groups:[ "mode", "document", "doctools" ]
}, {
name:"clipboard",
groups:[ "clipboard", "undo" ]
}, {
name:"editing",
groups:[ "find", "selection", "spellchecker" ]
}, {
name:"forms"
}, "/", {
name:"basicstyles",
groups:[ "basicstyles", "cleanup" ]
}, {
name:"paragraph",
groups:[ "list", "indent", "blocks", "align", "bidi" ]
}, {
name:"links"
}, {
name:"insert"
}, "/", {
name:"styles"
}, {
name:"colors"
}, {
name:"tools"
}, {
name:"others"
}, {
name:"about"
} ]);
}
var c = function() {
this.toolbars = [], this.focusCommandExecuted = !1;
};
c.prototype.focus = function() {
for (var c, a = 0; c = this.toolbars[a++]; ) for (var e, d = 0; e = c.items[d++]; ) if (e.focus) return e.focus(), 
void 0;
};
var a = {
modes:{
wysiwyg:1,
source:1
},
readOnly:1,
exec:function(a) {
a.toolbox && (a.toolbox.focusCommandExecuted = !0, CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function() {
a.toolbox.focus();
}, 100) :a.toolbox.focus());
}
};
CKEDITOR.plugins.add("toolbar", {
requires:"button",
init:function(b) {
var e, g = function(a, c) {
var d, k = "rtl" == b.lang.dir, n = b.config.toolbarGroupCycling, o = k ? 37 :39, k = k ? 39 :37, n = void 0 === n || n;
switch (c) {
case 9:
case CKEDITOR.SHIFT + 9:
for (;!d || !d.items.length; ) if (d = 9 == c ? (d ? d.next :a.toolbar.next) || b.toolbox.toolbars[0] :(d ? d.previous :a.toolbar.previous) || b.toolbox.toolbars[b.toolbox.toolbars.length - 1], 
d.items.length) for (a = d.items[e ? d.items.length - 1 :0]; a && !a.focus; ) (a = e ? a.previous :a.next) || (d = 0);
return a && a.focus(), !1;

case o:
d = a;
do d = d.next, !d && n && (d = a.toolbar.items[0]); while (d && !d.focus);
return d ? d.focus() :g(a, 9), !1;

case 40:
return a.button && a.button.hasArrow ? (b.once("panelShow", function(a) {
a.data._.panel._.currentBlock.onKeyDown(40);
}), a.execute()) :g(a, 40 == c ? o :k), !1;

case k:
case 38:
d = a;
do d = d.previous, !d && n && (d = a.toolbar.items[a.toolbar.items.length - 1]); while (d && !d.focus);
return d ? d.focus() :(e = 1, g(a, CKEDITOR.SHIFT + 9), e = 0), !1;

case 27:
return b.focus(), !1;

case 13:
case 32:
return a.execute(), !1;
}
return !0;
};
b.on("uiSpace", function(a) {
if (a.data.space == b.config.toolbarLocation) {
a.removeListener(), b.toolbox = new c();
var k, n, e = CKEDITOR.tools.getNextId(), j = [ '<span id="', e, '" class="cke_voice_label">', b.lang.toolbar.toolbars, "</span>", '<span id="' + b.ui.spaceId("toolbox") + '" class="cke_toolbox" role="group" aria-labelledby="', e, '" onmousedown="return false;">' ], e = b.config.toolbarStartupExpanded !== !1;
b.config.toolbarCanCollapse && b.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && j.push('<span class="cke_toolbox_main"' + (e ? ">" :' style="display:none">'));
for (var o = b.toolbox.toolbars, q = d(b), l = 0; l < q.length; l++) {
var m, p, v, r = 0, u = q[l];
if (u) if (k && (j.push("</span>"), n = k = 0), "/" === u) j.push('<span class="cke_toolbar_break"></span>'); else {
v = u.items || u;
for (var A = 0; A < v.length; A++) {
var t, w = v[A];
if (w) if (w.type == CKEDITOR.UI_SEPARATOR) n = k && w; else {
if (t = w.canGroup !== !1, !r) {
m = CKEDITOR.tools.getNextId(), r = {
id:m,
items:[]
}, p = u.name && (b.lang.toolbar.toolbarGroups[u.name] || u.name), j.push('<span id="', m, '" class="cke_toolbar"', p ? ' aria-labelledby="' + m + '_label"' :"", ' role="toolbar">'), 
p && j.push('<span id="', m, '_label" class="cke_voice_label">', p, "</span>"), 
j.push('<span class="cke_toolbar_start"></span>');
var s = o.push(r) - 1;
s > 0 && (r.previous = o[s - 1], r.previous.next = r);
}
t ? k || (j.push('<span class="cke_toolgroup" role="presentation">'), k = 1) :k && (j.push("</span>"), 
k = 0), m = function(a) {
a = a.render(b, j), s = r.items.push(a) - 1, s > 0 && (a.previous = r.items[s - 1], 
a.previous.next = a), a.toolbar = r, a.onkey = g, a.onfocus = function() {
b.toolbox.focusCommandExecuted || b.focus();
};
}, n && (m(n), n = 0), m(w);
}
}
k && (j.push("</span>"), n = k = 0), r && j.push('<span class="cke_toolbar_end"></span></span>');
}
}
if (b.config.toolbarCanCollapse && j.push("</span>"), b.config.toolbarCanCollapse && b.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
var x = CKEDITOR.tools.addFunction(function() {
b.execCommand("toolbarCollapse");
});
b.on("destroy", function() {
CKEDITOR.tools.removeFunction(x);
}), b.addCommand("toolbarCollapse", {
readOnly:1,
exec:function(a) {
var b = a.ui.space("toolbar_collapser"), c = b.getPrevious(), d = a.ui.space("contents"), e = c.getParent(), g = parseInt(d.$.style.height, 10), f = e.$.offsetHeight, h = b.hasClass("cke_toolbox_collapser_min");
h ? (c.show(), b.removeClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarCollapse)) :(c.hide(), 
b.addClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarExpand)), 
b.getFirst().setText(h ? "\u25b2" :"\u25c0"), d.setStyle("height", g - (e.$.offsetHeight - f) + "px"), 
a.fire("resize");
},
modes:{
wysiwyg:1,
source:1
}
}), b.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 :109), "toolbarCollapse"), 
j.push('<a title="' + (e ? b.lang.toolbar.toolbarCollapse :b.lang.toolbar.toolbarExpand) + '" id="' + b.ui.spaceId("toolbar_collapser") + '" tabIndex="-1" class="cke_toolbox_collapser'), 
e || j.push(" cke_toolbox_collapser_min"), j.push('" onclick="CKEDITOR.tools.callFunction(' + x + ')">', '<span class="cke_arrow">&#9650;</span>', "</a>");
}
j.push("</span>"), a.data.html = a.data.html + j.join("");
}
}), b.on("destroy", function() {
if (this.toolbox) {
var a, c, d, e, b = 0;
for (a = this.toolbox.toolbars; b < a.length; b++) for (d = a[b].items, c = 0; c < d.length; c++) e = d[c], 
e.clickFn && CKEDITOR.tools.removeFunction(e.clickFn), e.keyDownFn && CKEDITOR.tools.removeFunction(e.keyDownFn);
}
}), b.on("uiReady", function() {
var a = b.ui.space("toolbox");
a && b.focusManager.add(a, 1);
}), b.addCommand("toolbarFocus", a), b.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus"), 
b.ui.add("-", CKEDITOR.UI_SEPARATOR, {}), b.ui.addHandler(CKEDITOR.UI_SEPARATOR, {
create:function() {
return {
render:function(a, b) {
return b.push('<span class="cke_toolbar_separator" role="separator"></span>'), {};
}
};
}
});
}
}), CKEDITOR.ui.prototype.addToolbarGroup = function(a, c, d) {
var h = e(this.editor), f = 0 === c, i = {
name:a
};
if (d) {
if (d = CKEDITOR.tools.search(h, function(a) {
return a.name == d;
})) return !d.groups && (d.groups = []), c && (c = CKEDITOR.tools.indexOf(d.groups, c), 
c >= 0) ? (d.groups.splice(c + 1, 0, a), void 0) :(f ? d.groups.splice(0, 0, a) :d.groups.push(a), 
void 0);
c = null;
}
c && (c = CKEDITOR.tools.indexOf(h, function(a) {
return a.name == c;
})), f ? h.splice(0, 0, a) :"number" == typeof c ? h.splice(c + 1, 0, i) :h.push(a);
};
}(), CKEDITOR.UI_SEPARATOR = "separator", CKEDITOR.config.toolbarLocation = "top", 
function() {
function d(a) {
this.editor = a, this.reset();
}
CKEDITOR.plugins.add("undo", {
init:function(a) {
function b(a) {
e.enabled && a.data.command.canUndo !== !1 && e.save();
}
function c() {
e.enabled = a.readOnly ? !1 :"wysiwyg" == a.mode, e.onChange();
}
var e = a.undoManager = new d(a), h = a.addCommand("undo", {
exec:function() {
e.undo() && (a.selectionChange(), this.fire("afterUndo"));
},
startDisabled:!0,
canUndo:!1
}), f = a.addCommand("redo", {
exec:function() {
e.redo() && (a.selectionChange(), this.fire("afterRedo"));
},
startDisabled:!0,
canUndo:!1
});
a.setKeystroke([ [ CKEDITOR.CTRL + 90, "undo" ], [ CKEDITOR.CTRL + 89, "redo" ], [ CKEDITOR.CTRL + CKEDITOR.SHIFT + 90, "redo" ] ]), 
e.onChange = function() {
h.setState(e.undoable() ? CKEDITOR.TRISTATE_OFF :CKEDITOR.TRISTATE_DISABLED), f.setState(e.redoable() ? CKEDITOR.TRISTATE_OFF :CKEDITOR.TRISTATE_DISABLED);
}, a.on("beforeCommandExec", b), a.on("afterCommandExec", b), a.on("saveSnapshot", function(a) {
e.save(a.data && a.data.contentOnly);
}), a.on("contentDom", function() {
a.editable().on("keydown", function(a) {
a = a.data.getKey(), (8 == a || 46 == a) && e.type(a, 0);
}), a.editable().on("keypress", function(a) {
e.type(a.data.getKey(), 1);
});
}), a.on("beforeModeUnload", function() {
"wysiwyg" == a.mode && e.save(!0);
}), a.on("mode", c), a.on("readOnly", c), a.ui.addButton && (a.ui.addButton("Undo", {
label:a.lang.undo.undo,
command:"undo",
toolbar:"undo,10"
}), a.ui.addButton("Redo", {
label:a.lang.undo.redo,
command:"redo",
toolbar:"undo,20"
})), a.resetUndo = function() {
e.reset(), a.fire("saveSnapshot");
}, a.on("updateSnapshot", function() {
e.currentImage && e.update();
}), a.on("lockSnapshot", function(a) {
e.lock(a.data && a.data.dontUpdate);
}), a.on("unlockSnapshot", e.unlock, e);
}
}), CKEDITOR.plugins.undo = {};
var e = CKEDITOR.plugins.undo.Image = function(a, b) {
this.editor = a, a.fire("beforeUndoImage");
var c = a.getSnapshot();
CKEDITOR.env.ie && c && (c = c.replace(/\s+data-cke-expando=".*?"/g, "")), this.contents = c, 
b || (this.bookmarks = (c = c && a.getSelection()) && c.createBookmarks2(!0)), a.fire("afterUndoImage");
}, c = /\b(?:href|src|name)="[^"]*?"/gi;
e.prototype = {
equalsContent:function(a) {
var b = this.contents, a = a.contents;
return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && (b = b.replace(c, ""), 
a = a.replace(c, "")), b != a ? !1 :!0;
},
equalsSelection:function(a) {
var b = this.bookmarks, a = a.bookmarks;
if (b || a) {
if (!b || !a || b.length != a.length) return !1;
for (var c = 0; c < b.length; c++) {
var d = b[c], e = a[c];
if (d.startOffset != e.startOffset || d.endOffset != e.endOffset || !CKEDITOR.tools.arrayCompare(d.start, e.start) || !CKEDITOR.tools.arrayCompare(d.end, e.end)) return !1;
}
}
return !0;
}
}, d.prototype = {
type:function(a, b) {
var c = !b && a != this.lastKeystroke, d = this.editor;
if (!this.typing || b && !this.wasCharacter || c) {
var h = new e(d), f = this.snapshots.length;
CKEDITOR.tools.setTimeout(function() {
var a = d.getSnapshot();
CKEDITOR.env.ie && (a = a.replace(/\s+data-cke-expando=".*?"/g, "")), h.contents != a && f == this.snapshots.length && (this.typing = !0, 
this.save(!1, h, !1) || this.snapshots.splice(this.index + 1, this.snapshots.length - this.index - 1), 
this.hasUndo = !0, this.hasRedo = !1, this.modifiersCount = this.typesCount = 1, 
this.onChange());
}, 0, this);
}
this.lastKeystroke = a, (this.wasCharacter = b) ? (this.modifiersCount = 0, this.typesCount++, 
this.typesCount > 25 ? (this.save(!1, null, !1), this.typesCount = 1) :setTimeout(function() {
d.fire("change");
}, 0)) :(this.typesCount = 0, this.modifiersCount++, this.modifiersCount > 25 ? (this.save(!1, null, !1), 
this.modifiersCount = 1) :setTimeout(function() {
d.fire("change");
}, 0));
},
reset:function() {
this.lastKeystroke = 0, this.snapshots = [], this.index = -1, this.limit = this.editor.config.undoStackSize || 20, 
this.currentImage = null, this.hasRedo = this.hasUndo = !1, this.locked = null, 
this.resetType();
},
resetType:function() {
this.typing = !1, delete this.lastKeystroke, this.modifiersCount = this.typesCount = 0;
},
fireChange:function() {
this.hasUndo = !!this.getNextImage(!0), this.hasRedo = !!this.getNextImage(!1), 
this.resetType(), this.onChange();
},
save:function(a, b, c) {
if (this.locked) return !1;
var d = this.snapshots;
if (b || (b = new e(this.editor)), b.contents === !1) return !1;
if (this.currentImage) if (b.equalsContent(this.currentImage)) {
if (a || b.equalsSelection(this.currentImage)) return !1;
} else this.editor.fire("change");
return d.splice(this.index + 1, d.length - this.index - 1), d.length == this.limit && d.shift(), 
this.index = d.push(b) - 1, this.currentImage = b, c !== !1 && this.fireChange(), 
!0;
},
restoreImage:function(a) {
var c, b = this.editor;
a.bookmarks && (b.focus(), c = b.getSelection()), this.locked = 1, this.editor.loadSnapshot(a.contents), 
a.bookmarks ? c.selectBookmarks(a.bookmarks) :CKEDITOR.env.ie && (c = this.editor.document.getBody().$.createTextRange(), 
c.collapse(!0), c.select()), this.locked = 0, this.index = a.index, this.currentImage = this.snapshots[this.index], 
this.update(), this.fireChange(), b.fire("change");
},
getNextImage:function(a) {
var d, b = this.snapshots, c = this.currentImage;
if (c) if (a) {
for (d = this.index - 1; d >= 0; d--) if (a = b[d], !c.equalsContent(a)) return a.index = d, 
a;
} else for (d = this.index + 1; d < b.length; d++) if (a = b[d], !c.equalsContent(a)) return a.index = d, 
a;
return null;
},
redoable:function() {
return this.enabled && this.hasRedo;
},
undoable:function() {
return this.enabled && this.hasUndo;
},
undo:function() {
if (this.undoable()) {
this.save(!0);
var a = this.getNextImage(!0);
if (a) return this.restoreImage(a), !0;
}
return !1;
},
redo:function() {
if (this.redoable() && (this.save(!0), this.redoable())) {
var a = this.getNextImage(!1);
if (a) return this.restoreImage(a), !0;
}
return !1;
},
update:function(a) {
if (!this.locked) {
a || (a = new e(this.editor));
for (var b = this.index, c = this.snapshots; b > 0 && this.currentImage.equalsContent(c[b - 1]); ) b -= 1;
c.splice(b, this.index - b + 1, a), this.index = b, this.currentImage = a;
}
},
lock:function(a) {
this.locked ? this.locked.level++ :a ? this.locked = {
level:1
} :(a = new e(this.editor, !0), this.locked = {
update:this.currentImage && this.currentImage.equalsContent(a) ? a :null,
level:1
});
},
unlock:function() {
if (this.locked && !--this.locked.level) {
var a = this.locked.update, b = a && new e(this.editor, !0);
this.locked = null, a && !a.equalsContent(b) && this.update();
}
}
};
}(), function() {
function d(a) {
var b = this.editor, c = a.document, d = c.body;
(a = c.getElementById("cke_actscrpt")) && a.parentNode.removeChild(a), (a = c.getElementById("cke_shimscrpt")) && a.parentNode.removeChild(a), 
CKEDITOR.env.gecko && (d.contentEditable = !1, CKEDITOR.env.version < 2e4 && (d.innerHTML = d.innerHTML.replace(/^.*<\!-- cke-content-start --\>/, ""), 
setTimeout(function() {
var a = new CKEDITOR.dom.range(new CKEDITOR.dom.document(c));
a.setStart(new CKEDITOR.dom.node(d), 0), b.getSelection().selectRanges([ a ]);
}, 0))), d.contentEditable = !0, CKEDITOR.env.ie && (d.hideFocus = !0, d.disabled = !0, 
d.removeAttribute("disabled")), delete this._.isLoadingData, this.$ = d, c = new CKEDITOR.dom.document(c), 
this.setup(), CKEDITOR.env.ie && (c.getDocumentElement().addClass(c.$.compatMode), 
b.config.enterMode != CKEDITOR.ENTER_P && this.attachListener(c, "selectionchange", function() {
var a = c.getBody(), d = b.getSelection(), e = d && d.getRanges()[0];
e && a.getHtml().match(/^<p>(?:&nbsp;|<br>)<\/p>$/i) && e.startContainer.equals(a) && setTimeout(function() {
e = b.getSelection().getRanges()[0], e.startContainer.equals("body") || (a.getFirst().remove(1), 
e.moveToElementEditEnd(a), e.select());
}, 0);
})), (CKEDITOR.env.webkit || CKEDITOR.env.ie && CKEDITOR.env.version > 10) && c.getDocumentElement().on("mousedown", function(a) {
a.data.getTarget().is("html") && setTimeout(function() {
b.editable().focus();
});
});
try {
b.document.$.execCommand("2D-position", !1, !0);
} catch (e) {}
try {
b.document.$.execCommand("enableInlineTableEditing", !1, !b.config.disableNativeTableHandles);
} catch (f) {}
if (b.config.disableObjectResizing) try {
this.getDocument().$.execCommand("enableObjectResizing", !1, !1);
} catch (i) {
this.attachListener(this, CKEDITOR.env.ie ? "resizestart" :"resize", function(a) {
a.data.preventDefault();
});
}
(CKEDITOR.env.gecko || CKEDITOR.env.ie && "CSS1Compat" == b.document.$.compatMode) && this.attachListener(this, "keydown", function(a) {
var c = a.data.getKeystroke();
if (33 == c || 34 == c) if (CKEDITOR.env.ie) setTimeout(function() {
b.getSelection().scrollIntoView();
}, 0); else if (b.window.$.innerHeight > this.$.offsetHeight) {
var d = b.createRange();
d[33 == c ? "moveToElementEditStart" :"moveToElementEditEnd"](this), d.select(), 
a.data.preventDefault();
}
}), CKEDITOR.env.ie && this.attachListener(c, "blur", function() {
try {
c.$.selection.empty();
} catch (a) {}
}), b.document.getElementsByTag("title").getItem(0).data("cke-title", b.document.$.title), 
CKEDITOR.env.ie && (b.document.$.title = this._.docTitle), CKEDITOR.tools.setTimeout(function() {
b.fire("contentDom"), this._.isPendingFocus && (b.focus(), this._.isPendingFocus = !1), 
setTimeout(function() {
b.fire("dataReady");
}, 0), CKEDITOR.env.ie && setTimeout(function() {
if (b.document) {
var a = b.document.$.body;
a.runtimeStyle.marginBottom = "0px", a.runtimeStyle.marginBottom = "";
}
}, 1e3);
}, 0, this);
}
function e() {
var a = [];
if (CKEDITOR.document.$.documentMode >= 8) {
a.push("html.CSS1Compat [contenteditable=false]{min-height:0 !important}");
var c, b = [];
for (c in CKEDITOR.dtd.$removeEmpty) b.push("html.CSS1Compat " + c + "[contenteditable=false]");
a.push(b.join(",") + "{display:inline-block}");
} else CKEDITOR.env.gecko && (a.push("html{height:100% !important}"), a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}"));
return a.push("html{cursor:text;*cursor:auto}"), a.push("img,input,textarea{cursor:default}"), 
a.join("\n");
}
CKEDITOR.plugins.add("wysiwygarea", {
init:function(a) {
a.config.fullPage && a.addFeature({
allowedContent:"html head title; style [media,type]; body (*)[id]; meta link [*]",
requiredContent:"body"
}), a.addMode("wysiwyg", function(b) {
function d(e) {
e && e.removeListener(), a.editable(new c(a, h.$.contentWindow.document.body)), 
a.setData(a.getData(1), b);
}
var e = "document.open();" + (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" :"") + "document.close();", e = CKEDITOR.env.air ? "javascript:void(0)" :CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent(e) + "}())" :"", h = CKEDITOR.dom.element.createFromHtml('<iframe src="' + e + '" frameBorder="0"></iframe>');
h.setStyles({
width:"100%",
height:"100%"
}), h.addClass("cke_wysiwyg_frame cke_reset");
var f = a.ui.space("contents");
f.append(h), (e = CKEDITOR.env.ie || CKEDITOR.env.gecko) && h.on("load", d);
var i = a.title, k = a.lang.common.editorHelp;
i && (CKEDITOR.env.ie && (i += ", " + k), h.setAttribute("title", i));
var i = CKEDITOR.tools.getNextId(), n = CKEDITOR.dom.element.createFromHtml('<span id="' + i + '" class="cke_voice_label">' + k + "</span>");
f.append(n, 1), a.on("beforeModeUnload", function(a) {
a.removeListener(), n.remove();
}), h.setAttributes({
"aria-describedby":i,
tabIndex:a.tabIndex,
allowTransparency:"true"
}), !e && d(), CKEDITOR.env.webkit && (e = function() {
f.setStyle("width", "100%"), h.hide(), h.setSize("width", f.getSize("width")), f.removeStyle("width"), 
h.show();
}, h.setCustomData("onResize", e), CKEDITOR.document.getWindow().on("resize", e)), 
a.fire("ariaWidget", h);
});
}
});
var c = CKEDITOR.tools.createClass({
$:function() {
this.base.apply(this, arguments), this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function(a) {
CKEDITOR.tools.setTimeout(d, 0, this, a);
}, this), this._.docTitle = this.getWindow().getFrame().getAttribute("title");
},
base:CKEDITOR.editable,
proto:{
setData:function(a, b) {
var c = this.editor;
if (b) this.setHtml(a), c.fire("dataReady"); else {
this._.isLoadingData = !0, c._.dataStore = {
id:1
};
var d = c.config, h = d.fullPage, f = d.docType, i = CKEDITOR.tools.buildStyleHtml(e()).replace(/<style>/, '<style data-cke-temp="1">');
h || (i += CKEDITOR.tools.buildStyleHtml(c.config.contentsCss));
var k = d.baseHref ? '<base href="' + d.baseHref + '" data-cke-temp="1" />' :"";
h && (a = a.replace(/<!DOCTYPE[^>]*>/i, function(a) {
return c.docType = f = a, "";
}).replace(/<\?xml\s[^\?]*\?>/i, function(a) {
return c.xmlDeclaration = a, "";
})), a = c.dataProcessor.toHtml(a), h ? (/<body[\s|>]/.test(a) || (a = "<body>" + a), 
/<html[\s|>]/.test(a) || (a = "<html>" + a + "</html>"), /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$&<title></title>")) :a = a.replace(/<html[^>]*>/, "$&<head><title></title></head>"), 
k && (a = a.replace(/<head>/, "$&" + k)), a = a.replace(/<\/head\s*>/, i + "$&"), 
a = f + a) :a = d.docType + '<html dir="' + d.contentsLangDirection + '" lang="' + (d.contentsLanguage || c.langCode) + '"><head><title>' + this._.docTitle + "</title>" + k + i + "</head><body" + (d.bodyId ? ' id="' + d.bodyId + '"' :"") + (d.bodyClass ? ' class="' + d.bodyClass + '"' :"") + ">" + a + "</body></html>", 
CKEDITOR.env.gecko && (a = a.replace(/<body/, '<body contenteditable="true" '), 
CKEDITOR.env.version < 2e4 && (a = a.replace(/<body[^>]*>/, "$&<!-- cke-content-start -->"))), 
d = '<script id="cke_actscrpt" type="text/javascript"' + (CKEDITOR.env.ie ? ' defer="defer" ' :"") + ">var wasLoaded=0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded=1;}" + (CKEDITOR.env.ie ? "onload();" :'document.addEventListener("DOMContentLoaded", onload, false );') + "</script>", 
CKEDITOR.env.ie && CKEDITOR.env.version < 9 && (d += '<script id="cke_shimscrpt">window.parent.CKEDITOR.tools.enableHtml5Elements(document)</script>'), 
a = a.replace(/(?=\s*<\/(:?head)>)/, d), this.clearCustomData(), this.clearListeners(), 
c.fire("contentDomUnload");
var n = this.getDocument();
try {
n.write(a);
} catch (o) {
setTimeout(function() {
n.write(a);
}, 0);
}
}
},
getData:function(a) {
if (a) return this.getHtml();
var a = this.editor, b = a.config, c = b.fullPage, d = c && a.docType, e = c && a.xmlDeclaration, f = this.getDocument(), c = c ? f.getDocumentElement().getOuterHtml() :f.getBody().getHtml();
return CKEDITOR.env.gecko && b.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/<br>(?=\s*(:?$|<\/body>))/, "")), 
c = a.dataProcessor.toDataFormat(c), e && (c = e + "\n" + c), d && (c = d + "\n" + c), 
c;
},
focus:function() {
this._.isLoadingData ? this._.isPendingFocus = !0 :c.baseProto.focus.call(this);
},
detach:function() {
var a = this.editor, b = a.document, a = a.window.getFrame();
c.baseProto.detach.call(this), this.clearCustomData(), b.getDocumentElement().clearCustomData(), 
a.clearCustomData(), CKEDITOR.tools.removeFunction(this._.frameLoadedHandler), (b = a.removeCustomData("onResize")) && b.removeListener(), 
a.remove();
}
}
});
}(), CKEDITOR.config.disableObjectResizing = !1, CKEDITOR.config.disableNativeTableHandles = !0, 
CKEDITOR.config.disableNativeSpellChecker = !0, CKEDITOR.config.contentsCss = CKEDITOR.getUrl("contents.css"), 
CKEDITOR.config.plugins = "dialogui,dialog,a11yhelp,about,basicstyles,blockquote,clipboard,panel,floatpanel,menu,contextmenu,dialogadvtab,div,elementspath,enterkey,entities,popup,filebrowser,find,fakeobjects,flash,floatingspace,listblock,button,richcombo,font,format,forms,horizontalrule,htmlwriter,iframe,image,indent,indentlist,indentblock,justify,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastefromword,pastetext,preview,print,removeformat,resize,save,selectall,showblocks,showborders,smiley,sourcearea,specialchar,stylescombo,tab,table,tabletools,templates,toolbar,undo,wysiwygarea", 
CKEDITOR.config.skin = "moono", function() {
var d = function(d, c) {
for (var a = CKEDITOR.getUrl("plugins/" + c), d = d.split(","), b = 0; b < d.length; b++) CKEDITOR.skin.icons[d[b]] = {
path:a,
offset:-d[++b],
bgsize:d[++b]
};
};
CKEDITOR.env.hidpi ? d("about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,bidiltr,168,,bidirtl,192,,blockquote,216,,copy-rtl,240,,copy,264,,cut-rtl,288,,cut,312,,paste-rtl,336,,paste,360,,bgcolor,384,,textcolor,408,,creatediv,432,,docprops-rtl,456,,docprops,480,,find-rtl,504,,find,528,,replace,552,,flash,576,,button,600,,checkbox,624,,form,648,,hiddenfield,672,,imagebutton,696,,radio,720,,select-rtl,744,,select,768,,textarea-rtl,792,,textarea,816,,textfield-rtl,840,,textfield,864,,horizontalrule,888,,iframe,912,,image,936,,indent-rtl,960,,indent,984,,outdent-rtl,1008,,outdent,1032,,justifyblock,1056,,justifycenter,1080,,justifyleft,1104,,justifyright,1128,,language,1152,,anchor-rtl,1176,,anchor,1200,,link,1224,,unlink,1248,,bulletedlist-rtl,1272,,bulletedlist,1296,,numberedlist-rtl,1320,,numberedlist,1344,,mathjax,1368,,maximize,1392,,newpage-rtl,1416,,newpage,1440,,pagebreak-rtl,1464,,pagebreak,1488,,pastefromword-rtl,1512,,pastefromword,1536,,pastetext-rtl,1560,,pastetext,1584,,placeholder,1608,,preview-rtl,1632,,preview,1656,,print,1680,,removeformat,1704,,save,1728,,selectall,1752,,showblocks-rtl,1776,,showblocks,1800,,smiley,1824,,source-rtl,1848,,source,1872,,sourcedialog-rtl,1896,,sourcedialog,1920,,specialchar,1944,,table,1968,,templates-rtl,1992,,templates,2016,,uicolor,2040,,redo-rtl,2064,,redo,2088,,undo-rtl,2112,,undo,2136,", "icons_hidpi.png") :d("about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,bidiltr,168,auto,bidirtl,192,auto,blockquote,216,auto,copy-rtl,240,auto,copy,264,auto,cut-rtl,288,auto,cut,312,auto,paste-rtl,336,auto,paste,360,auto,bgcolor,384,auto,textcolor,408,auto,creatediv,432,auto,docprops-rtl,456,auto,docprops,480,auto,find-rtl,504,auto,find,528,auto,replace,552,auto,flash,576,auto,button,600,auto,checkbox,624,auto,form,648,auto,hiddenfield,672,auto,imagebutton,696,auto,radio,720,auto,select-rtl,744,auto,select,768,auto,textarea-rtl,792,auto,textarea,816,auto,textfield-rtl,840,auto,textfield,864,auto,horizontalrule,888,auto,iframe,912,auto,image,936,auto,indent-rtl,960,auto,indent,984,auto,outdent-rtl,1008,auto,outdent,1032,auto,justifyblock,1056,auto,justifycenter,1080,auto,justifyleft,1104,auto,justifyright,1128,auto,language,1152,auto,anchor-rtl,1176,auto,anchor,1200,auto,link,1224,auto,unlink,1248,auto,bulletedlist-rtl,1272,auto,bulletedlist,1296,auto,numberedlist-rtl,1320,auto,numberedlist,1344,auto,mathjax,1368,auto,maximize,1392,auto,newpage-rtl,1416,auto,newpage,1440,auto,pagebreak-rtl,1464,auto,pagebreak,1488,auto,pastefromword-rtl,1512,auto,pastefromword,1536,auto,pastetext-rtl,1560,auto,pastetext,1584,auto,placeholder,1608,auto,preview-rtl,1632,auto,preview,1656,auto,print,1680,auto,removeformat,1704,auto,save,1728,auto,selectall,1752,auto,showblocks-rtl,1776,auto,showblocks,1800,auto,smiley,1824,auto,source-rtl,1848,auto,source,1872,auto,sourcedialog-rtl,1896,auto,sourcedialog,1920,auto,specialchar,1944,auto,table,1968,auto,templates-rtl,1992,auto,templates,2016,auto,uicolor,2040,auto,redo-rtl,2064,auto,redo,2088,auto,undo-rtl,2112,auto,undo,2136,auto", "icons.png");
}());
}(), /*
 Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
function(a) {
CKEDITOR.config.jqueryOverrideVal = "undefined" == typeof CKEDITOR.config.jqueryOverrideVal ? !0 :CKEDITOR.config.jqueryOverrideVal, 
"undefined" != typeof a && (a.extend(a.fn, {
ckeditorGet:function() {
var a = this.eq(0).data("ckeditorInstance");
if (!a) throw "CKEditor is not initialized yet, use ckeditor() with a callback.";
return a;
},
ckeditor:function(g, d) {
if (!CKEDITOR.env.isCompatible) throw Error("The environment is incompatible.");
if (!a.isFunction(g)) var k = d, d = g, g = k;
var i = [], d = d || {};
this.each(function() {
var b = a(this), c = b.data("ckeditorInstance"), f = b.data("_ckeditorInstanceLock"), h = this, j = new a.Deferred();
i.push(j.promise()), c && !f ? (g && g.apply(c, [ this ]), j.resolve()) :f ? c.once("instanceReady", function() {
setTimeout(function() {
c.element ? (c.element.$ == h && g && g.apply(c, [ h ]), j.resolve()) :setTimeout(arguments.callee, 100);
}, 0);
}, null, null, 9999) :((d.autoUpdateElement || "undefined" == typeof d.autoUpdateElement && CKEDITOR.config.autoUpdateElement) && (d.autoUpdateElementJquery = !0), 
d.autoUpdateElement = !1, b.data("_ckeditorInstanceLock", !0), c = a(this).is("textarea") ? CKEDITOR.replace(h, d) :CKEDITOR.inline(h, d), 
b.data("ckeditorInstance", c), c.on("instanceReady", function(d) {
var e = d.editor;
setTimeout(function() {
if (e.element) {
if (d.removeListener(), e.on("dataReady", function() {
b.trigger("dataReady.ckeditor", [ e ]);
}), e.on("setData", function(a) {
b.trigger("setData.ckeditor", [ e, a.data ]);
}), e.on("getData", function(a) {
b.trigger("getData.ckeditor", [ e, a.data ]);
}, 999), e.on("destroy", function() {
b.trigger("destroy.ckeditor", [ e ]);
}), e.on("save", function() {
return a(h.form).submit(), !1;
}, null, null, 20), e.config.autoUpdateElementJquery && b.is("textarea") && a(h.form).length) {
var c = function() {
b.ckeditor(function() {
e.updateElement();
});
};
a(h.form).submit(c), a(h.form).bind("form-pre-serialize", c), b.bind("destroy.ckeditor", function() {
a(h.form).unbind("submit", c), a(h.form).unbind("form-pre-serialize", c);
});
}
e.on("destroy", function() {
b.removeData("ckeditorInstance");
}), b.removeData("_ckeditorInstanceLock"), b.trigger("instanceReady.ckeditor", [ e ]), 
g && g.apply(e, [ h ]), j.resolve();
} else setTimeout(arguments.callee, 100);
}, 0);
}, null, null, 9999));
});
var f = new a.Deferred();
return this.promise = f.promise(), a.when.apply(this, i).then(function() {
f.resolve();
}), this.editor = this.eq(0).data("ckeditorInstance"), this;
}
}), CKEDITOR.config.jqueryOverrideVal && (a.fn.val = CKEDITOR.tools.override(a.fn.val, function(g) {
return function(d) {
if (arguments.length) {
var k = this, i = [], f = this.each(function() {
var b = a(this), c = b.data("ckeditorInstance");
if (b.is("textarea") && c) {
var f = new a.Deferred();
return c.setData(d, function() {
f.resolve();
}), i.push(f.promise()), !0;
}
return g.call(b, d);
});
if (i.length) {
var b = new a.Deferred();
return a.when.apply(this, i).done(function() {
b.resolveWith(k);
}), b.promise();
}
return f;
}
var f = a(this).eq(0), c = f.data("ckeditorInstance");
return f.is("textarea") && c ? c.getData() :g.call(f);
};
})));
}(window.jQuery);