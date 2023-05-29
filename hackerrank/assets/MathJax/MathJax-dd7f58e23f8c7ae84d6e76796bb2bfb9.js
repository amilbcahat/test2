/*
 *  /MathJax.js
 *
 *  Copyright (c) 2009-2014 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
document.getElementById && document.childNodes && document.createElement && (window.MathJax && MathJax.Hub || (window.MathJax = window.MathJax ? {
AuthorConfig:window.MathJax
} :{}, MathJax.isPacked = !0, MathJax.version = "2.4.0", MathJax.fileversion = "2.4.0", 
MathJax.cdnVersion = "2.4-beta-2", MathJax.cdnFileVersions = {}, function(d) {
var b = window[d];
b || (b = window[d] = {});
var e = [], c = function(f) {
var g = f.constructor;
g || (g = function() {});
for (var h in f) "constructor" !== h && f.hasOwnProperty(h) && (g[h] = f[h]);
return g;
}, a = function() {
return function() {
return arguments.callee.Init.call(this, arguments);
};
};
b.Object = c({
constructor:a(),
Subclass:function(f, h) {
var g = a();
return g.SUPER = this, g.Init = this.Init, g.Subclass = this.Subclass, g.Augment = this.Augment, 
g.protoFunction = this.protoFunction, g.can = this.can, g.has = this.has, g.isa = this.isa, 
g.prototype = new this(e), g.prototype.constructor = g, g.Augment(f, h), g;
},
Init:function(f) {
var g = this;
return 1 === f.length && f[0] === e ? g :(g instanceof f.callee || (g = new f.callee(e)), 
g.Init.apply(g, f) || g);
},
Augment:function(f, g) {
var h;
if (null != f) {
for (h in f) f.hasOwnProperty(h) && this.protoFunction(h, f[h]);
f.toString !== this.prototype.toString && f.toString !== {}.toString && this.protoFunction("toString", f.toString);
}
if (null != g) for (h in g) g.hasOwnProperty(h) && (this[h] = g[h]);
return this;
},
protoFunction:function(g, f) {
this.prototype[g] = f, "function" == typeof f && (f.SUPER = this.SUPER.prototype);
},
prototype:{
Init:function() {},
SUPER:function(f) {
return f.callee.SUPER;
},
can:function(f) {
return "function" == typeof this[f];
},
has:function(f) {
return "undefined" != typeof this[f];
},
isa:function(f) {
return f instanceof Object && this instanceof f;
}
},
can:function(f) {
return this.prototype.can.call(this, f);
},
has:function(f) {
return this.prototype.has.call(this, f);
},
isa:function(g) {
for (var f = this; f; ) {
if (f === g) return !0;
f = f.SUPER;
}
return !1;
},
SimpleSUPER:c({
constructor:function(f) {
return this.SimpleSUPER.define(f);
},
define:function(f) {
var h = {};
if (null != f) {
for (var g in f) f.hasOwnProperty(g) && (h[g] = this.wrap(g, f[g]));
f.toString !== this.prototype.toString && f.toString !== {}.toString && (h.toString = this.wrap("toString", f.toString));
}
return h;
},
wrap:function(i, h) {
if ("function" != typeof h || !h.toString().match(/\.\s*SUPER\s*\(/)) return h;
var g = function() {
this.SUPER = g.SUPER[i];
try {
var f = h.apply(this, arguments);
} catch (j) {
throw delete this.SUPER, j;
}
return delete this.SUPER, f;
};
return g.toString = function() {
return h.toString.apply(h, arguments);
}, g;
}
})
});
}("MathJax"), function(BASENAME) {
var BASE = window[BASENAME];
BASE || (BASE = window[BASENAME] = {});
var CALLBACK = function(data) {
var cb = function() {
return arguments.callee.execute.apply(arguments.callee, arguments);
};
for (var id in CALLBACK.prototype) CALLBACK.prototype.hasOwnProperty(id) && (cb[id] = "undefined" != typeof data[id] ? data[id] :CALLBACK.prototype[id]);
return cb.toString = CALLBACK.prototype.toString, cb;
};
CALLBACK.prototype = {
isCallback:!0,
hook:function() {},
data:[],
object:window,
execute:function() {
return !this.called || this.autoReset ? (this.called = !this.autoReset, this.hook.apply(this.object, this.data.concat([].slice.call(arguments, 0)))) :void 0;
},
reset:function() {
delete this.called;
},
toString:function() {
return this.hook.toString.apply(this.hook, arguments);
}
};
var ISCALLBACK = function(f) {
return "function" == typeof f && f.isCallback;
}, EVAL = function(code) {
return eval.call(window, code);
}, TESTEVAL = function() {
if (EVAL("var __TeSt_VaR__ = 1"), window.__TeSt_VaR__) try {
delete window.__TeSt_VaR__;
} catch (error) {
window.__TeSt_VaR__ = null;
} else EVAL = window.execScript ? function(code) {
BASE.__code = code, code = "try {" + BASENAME + ".__result = eval(" + BASENAME + ".__code)} catch(err) {" + BASENAME + ".__result = err}", 
window.execScript(code);
var result = BASE.__result;
if (delete BASE.__result, delete BASE.__code, result instanceof Error) throw result;
return result;
} :function(code) {
BASE.__code = code, code = "try {" + BASENAME + ".__result = eval(" + BASENAME + ".__code)} catch(err) {" + BASENAME + ".__result = err}";
var head = document.getElementsByTagName("head")[0];
head || (head = document.body);
var script = document.createElement("script");
script.appendChild(document.createTextNode(code)), head.appendChild(script), head.removeChild(script);
var result = BASE.__result;
if (delete BASE.__result, delete BASE.__code, result instanceof Error) throw result;
return result;
};
TESTEVAL = null;
}, USING = function(args, i) {
if (arguments.length > 1 && (args = 2 === arguments.length && "function" != typeof arguments[0] && arguments[0] instanceof Object && "number" == typeof arguments[1] ? [].slice.call(args, i) :[].slice.call(arguments, 0)), 
args instanceof Array && 1 === args.length && (args = args[0]), "function" == typeof args) return args.execute === CALLBACK.prototype.execute ? args :CALLBACK({
hook:args
});
if (args instanceof Array) {
if ("string" == typeof args[0] && args[1] instanceof Object && "function" == typeof args[1][args[0]]) return CALLBACK({
hook:args[1][args[0]],
object:args[1],
data:args.slice(2)
});
if ("function" == typeof args[0]) return CALLBACK({
hook:args[0],
data:args.slice(1)
});
if ("function" == typeof args[1]) return CALLBACK({
hook:args[1],
object:args[0],
data:args.slice(2)
});
} else {
if ("string" == typeof args) return TESTEVAL && TESTEVAL(), CALLBACK({
hook:EVAL,
data:[ args ]
});
if (args instanceof Object) return CALLBACK(args);
if ("undefined" == typeof args) return CALLBACK({});
}
throw Error("Can't make callback from given data");
}, DELAY = function(time, callback) {
return callback = USING(callback), callback.timeout = setTimeout(callback, time), 
callback;
}, WAITFOR = function(callback, signal) {
callback = USING(callback), callback.called || (WAITSIGNAL(callback, signal), signal.pending++);
}, WAITEXECUTE = function() {
var signals = this.signal;
delete this.signal, this.execute = this.oldExecute, delete this.oldExecute;
var result = this.execute.apply(this, arguments);
if (ISCALLBACK(result) && !result.called) WAITSIGNAL(result, signals); else for (var i = 0, m = signals.length; m > i; i++) signals[i].pending--, 
signals[i].pending <= 0 && signals[i].call();
}, WAITSIGNAL = function(callback, signals) {
signals instanceof Array || (signals = [ signals ]), callback.signal ? 1 === signals.length ? callback.signal.push(signals[0]) :callback.signal = callback.signal.concat(signals) :(callback.oldExecute = callback.execute, 
callback.execute = WAITEXECUTE, callback.signal = signals);
}, AFTER = function(callback) {
callback = USING(callback), callback.pending = 0;
for (var i = 1, m = arguments.length; m > i; i++) arguments[i] && WAITFOR(arguments[i], callback);
if (0 === callback.pending) {
var result = callback();
ISCALLBACK(result) && (callback = result);
}
return callback;
}, HOOKS = MathJax.Object.Subclass({
Init:function(reset) {
this.hooks = [], this.reset = reset;
},
Add:function(hook, priority) {
null == priority && (priority = 10), ISCALLBACK(hook) || (hook = USING(hook)), hook.priority = priority;
for (var i = this.hooks.length; i > 0 && priority < this.hooks[i - 1].priority; ) i--;
return this.hooks.splice(i, 0, hook), hook;
},
Remove:function(hook) {
for (var i = 0, m = this.hooks.length; m > i; i++) if (this.hooks[i] === hook) return this.hooks.splice(i, 1), 
void 0;
},
Execute:function() {
for (var callbacks = [ {} ], i = 0, m = this.hooks.length; m > i; i++) {
this.reset && this.hooks[i].reset();
var result = this.hooks[i].apply(window, arguments);
ISCALLBACK(result) && !result.called && callbacks.push(result);
}
return 1 === callbacks.length ? null :2 === callbacks.length ? callbacks[1] :AFTER.apply({}, callbacks);
}
}), EXECUTEHOOKS = function(hooks, data, reset) {
if (!hooks) return null;
hooks instanceof Array || (hooks = [ hooks ]), data instanceof Array || (data = null == data ? [] :[ data ]);
for (var handler = HOOKS(reset), i = 0, m = hooks.length; m > i; i++) handler.Add(hooks[i]);
return handler.Execute.apply(handler, data);
}, QUEUE = BASE.Object.Subclass({
Init:function() {
this.pending = 0, this.running = 0, this.queue = [], this.Push.apply(this, arguments);
},
Push:function() {
for (var callback, i = 0, m = arguments.length; m > i; i++) callback = USING(arguments[i]), 
callback !== arguments[i] || callback.called || (callback = USING([ "wait", this, callback ])), 
this.queue.push(callback);
return this.running || this.pending || this.Process(), callback;
},
Process:function(queue) {
for (;!this.running && !this.pending && this.queue.length; ) {
var callback = this.queue[0];
queue = this.queue.slice(1), this.queue = [], this.Suspend();
var result = callback();
this.Resume(), queue.length && (this.queue = queue.concat(this.queue)), ISCALLBACK(result) && !result.called && WAITFOR(result, this);
}
},
Suspend:function() {
this.running++;
},
Resume:function() {
this.running && this.running--;
},
call:function() {
this.Process.apply(this, arguments);
},
wait:function(callback) {
return callback;
}
}), SIGNAL = QUEUE.Subclass({
Init:function(name) {
QUEUE.prototype.Init.call(this), this.name = name, this.posted = [], this.listeners = HOOKS(!0);
},
Post:function(message, callback, forget) {
if (callback = USING(callback), this.posting || this.pending) this.Push([ "Post", this, message, callback, forget ]); else {
this.callback = callback, callback.reset(), forget || this.posted.push(message), 
this.Suspend(), this.posting = !0;
var result = this.listeners.Execute(message);
ISCALLBACK(result) && !result.called && WAITFOR(result, this), this.Resume(), delete this.posting, 
this.pending || this.call();
}
return callback;
},
Clear:function(callback) {
return callback = USING(callback), this.posting || this.pending ? callback = this.Push([ "Clear", this, callback ]) :(this.posted = [], 
callback()), callback;
},
call:function() {
this.callback(this), this.Process();
},
Interest:function(callback, ignorePast, priority) {
if (callback = USING(callback), this.listeners.Add(callback, priority), !ignorePast) for (var i = 0, m = this.posted.length; m > i; i++) {
callback.reset();
var result = callback(this.posted[i]);
ISCALLBACK(result) && i === this.posted.length - 1 && WAITFOR(result, this);
}
return callback;
},
NoInterest:function(callback) {
this.listeners.Remove(callback);
},
MessageHook:function(msg, callback, priority) {
callback = USING(callback), this.hooks || (this.hooks = {}, this.Interest([ "ExecuteHooks", this ])), 
this.hooks[msg] || (this.hooks[msg] = HOOKS(!0)), this.hooks[msg].Add(callback, priority);
for (var i = 0, m = this.posted.length; m > i; i++) this.posted[i] == msg && (callback.reset(), 
callback(this.posted[i]));
return callback;
},
ExecuteHooks:function(msg) {
var type = msg instanceof Array ? msg[0] :msg;
return this.hooks[type] ? this.hooks[type].Execute(msg) :null;
}
}, {
signals:{},
find:function(name) {
return SIGNAL.signals[name] || (SIGNAL.signals[name] = new SIGNAL(name)), SIGNAL.signals[name];
}
});
BASE.Callback = BASE.CallBack = USING, BASE.Callback.Delay = DELAY, BASE.Callback.After = AFTER, 
BASE.Callback.Queue = QUEUE, BASE.Callback.Signal = SIGNAL.find, BASE.Callback.Hooks = HOOKS, 
BASE.Callback.ExecuteHooks = EXECUTEHOOKS;
}("MathJax"), function(e) {
var a = window[e];
a || (a = window[e] = {});
var d = "Apple Computer, Inc." === navigator.vendor && "undefined" == typeof navigator.vendorSub, g = 0, h = function(i) {
return document.styleSheets && document.styleSheets.length > g && (g = document.styleSheets.length), 
i || (i = document.getElementsByTagName("head")[0], i || (i = document.body)), i;
}, f = [], c = function() {
for (var k = 0, j = f.length; j > k; k++) a.Ajax.head.removeChild(f[k]);
f = [];
}, b = {};
b[e] = "", a.Ajax = {
loaded:{},
loading:{},
loadHooks:{},
timeout:15e3,
styleDelay:1,
config:{
root:"",
path:b
},
STATUS:{
OK:1,
ERROR:-1
},
fileURL:function(j) {
var i = j.match(/^\[([-._a-z0-9]+)\]/i);
return i && i[1] in b && (j = (b[i[1]] || this.config.root) + j.substr(i[1].length + 2)), 
j;
},
fileName:function(j) {
var i = this.config.root;
if (j.substr(0, i.length) === i) j = "[" + e + "]" + j.substr(i.length); else for (var k in b) if (b.hasOwnProperty(k) && b[k] && j.substr(0, b[k].length) === b[k]) {
j = "[" + k + "]" + j.substr(b[k].length);
break;
}
return j;
},
fileRev:function() {
var i = a.cdnFileVersions[name] || a.cdnVersion;
return i && (i = "?rev=" + i), i;
},
urlRev:function(i) {
return this.fileURL(i) + this.fileRev(i);
},
Require:function(k, n) {
n = a.Callback(n);
var l;
if (k instanceof Object) for (var j in k) k.hasOwnProperty(j) && (l = j.toUpperCase(), 
k = k[j]); else l = k.split(/\./).pop().toUpperCase();
if (k = this.fileURL(k), this.loaded[k]) n(this.loaded[k]); else {
var m = {};
m[l] = k, this.Load(m, n);
}
return n;
},
Load:function(k, m) {
m = a.Callback(m);
var l;
if (k instanceof Object) for (var j in k) k.hasOwnProperty(j) && (l = j.toUpperCase(), 
k = k[j]); else l = k.split(/\./).pop().toUpperCase();
if (k = this.fileURL(k), this.loading[k]) this.addHook(k, m); else {
if (this.head = h(this.head), !this.loader[l]) throw Error("Can't load files of type " + l);
this.loader[l].call(this, k, m);
}
return m;
},
LoadHook:function(l, m, k) {
if (m = a.Callback(m), l instanceof Object) for (var j in l) l.hasOwnProperty(j) && (l = l[j]);
return l = this.fileURL(l), this.loaded[l] ? m(this.loaded[l]) :this.addHook(l, m, k), 
m;
},
addHook:function(j, k, i) {
this.loadHooks[j] || (this.loadHooks[j] = MathJax.Callback.Hooks()), this.loadHooks[j].Add(k, i);
},
Preloading:function() {
for (var l = 0, j = arguments.length; j > l; l++) {
var k = this.fileURL(arguments[l]);
this.loading[k] || (this.loading[k] = {
preloaded:!0
});
}
},
loader:{
JS:function(k, m) {
var j = this.fileName(k), i = document.createElement("script"), l = a.Callback([ "loadTimeout", this, k ]);
this.loading[k] = {
callback:m,
timeout:setTimeout(l, this.timeout),
status:this.STATUS.OK,
script:i
}, this.loading[k].message = a.Message.File(j), i.onerror = l, i.type = "text/javascript", 
i.src = k + this.fileRev(j), this.head.appendChild(i);
},
CSS:function(j, l) {
var i = this.fileName(j), k = document.createElement("link");
k.rel = "stylesheet", k.type = "text/css", k.href = j + this.fileRev(i), this.loading[j] = {
callback:l,
message:a.Message.File(i),
status:this.STATUS.OK
}, this.head.appendChild(k), this.timer.create.call(this, [ this.timer.file, j ], k);
}
},
timer:{
create:function(j, i) {
return j = a.Callback(j), "STYLE" === i.nodeName && i.styleSheet && "undefined" != typeof i.styleSheet.cssText ? j(this.STATUS.OK) :window.chrome && "LINK" === i.nodeName ? j(this.STATUS.OK) :d ? this.timer.start(this, [ this.timer.checkSafari2, g++, j ], this.styleDelay) :this.timer.start(this, [ this.timer.checkLength, i, j ], this.styleDelay), 
j;
},
start:function(j, i, k, l) {
i = a.Callback(i), i.execute = this.execute, i.time = this.time, i.STATUS = j.STATUS, 
i.timeout = l || j.timeout, i.delay = i.total = k || 0, k ? setTimeout(i, k) :i();
},
time:function(i) {
return this.total += this.delay, this.delay = Math.floor(1.05 * this.delay + 5), 
this.total >= this.timeout ? (i(this.STATUS.ERROR), 1) :0;
},
file:function(j, i) {
0 > i ? a.Ajax.loadTimeout(j) :a.Ajax.loadComplete(j);
},
execute:function() {
this.hook.call(this.object, this, this.data[0], this.data[1]);
},
checkSafari2:function(i, j, k) {
i.time(k) || (document.styleSheets.length > j && document.styleSheets[j].cssRules && document.styleSheets[j].cssRules.length ? k(i.STATUS.OK) :setTimeout(i, i.delay));
},
checkLength:function(i, l, n) {
if (!i.time(n)) {
var m = 0, j = l.sheet || l.styleSheet;
try {
(j.cssRules || j.rules || []).length > 0 && (m = 1);
} catch (k) {
k.message.match(/protected variable|restricted URI/) ? m = 1 :k.message.match(/Security error/) && (m = 1);
}
m ? setTimeout(a.Callback([ n, i.STATUS.OK ]), 0) :setTimeout(i, i.delay);
}
}
},
loadComplete:function(i) {
i = this.fileURL(i);
var j = this.loading[i];
return j && !j.preloaded ? (a.Message.Clear(j.message), clearTimeout(j.timeout), 
j.script && (0 === f.length && setTimeout(c, 0), f.push(j.script)), this.loaded[i] = j.status, 
delete this.loading[i], this.addHook(i, j.callback)) :(j && delete this.loading[i], 
this.loaded[i] = this.STATUS.OK, j = {
status:this.STATUS.OK
}), this.loadHooks[i] ? this.loadHooks[i].Execute(j.status) :null;
},
loadTimeout:function(i) {
this.loading[i].timeout && clearTimeout(this.loading[i].timeout), this.loading[i].status = this.STATUS.ERROR, 
this.loadError(i), this.loadComplete(i);
},
loadError:function(i) {
a.Message.Set([ "LoadFailed", "File failed to load: %1", i ], null, 2e3), a.Hub.signal.Post([ "file load error", i ]);
},
Styles:function(k, l) {
var i = this.StyleString(k);
if ("" === i) (l = a.Callback(l))(); else {
var j = document.createElement("style");
j.type = "text/css", this.head = h(this.head), this.head.appendChild(j), j.styleSheet && "undefined" != typeof j.styleSheet.cssText ? j.styleSheet.cssText = i :j.appendChild(document.createTextNode(i)), 
l = this.timer.create.call(this, l, j);
}
return l;
},
StyleString:function(n) {
if ("string" == typeof n) return n;
var o, m, k = "";
for (o in n) if (n.hasOwnProperty(o)) if ("string" == typeof n[o]) k += o + " {" + n[o] + "}\n"; else if (n[o] instanceof Array) for (var l = 0; l < n[o].length; l++) m = {}, 
m[o] = n[o][l], k += this.StyleString(m); else if ("@media" === o.substr(0, 6)) k += o + " {" + this.StyleString(n[o]) + "}\n"; else if (null != n[o]) {
m = [];
for (var j in n[o]) n[o].hasOwnProperty(j) && null != n[o][j] && (m[m.length] = j + ": " + n[o][j]);
k += o + " {" + m.join("; ") + "}\n";
}
return k;
}
};
}("MathJax"), MathJax.HTML = {
Element:function(c, e, d) {
var f = document.createElement(c);
if (e) {
if (e.style) {
var b = e.style;
e.style = {};
for (var g in b) b.hasOwnProperty(g) && (e.style[g.replace(/-([a-z])/g, this.ucMatch)] = b[g]);
}
MathJax.Hub.Insert(f, e);
}
if (d) {
d instanceof Array || (d = [ d ]);
for (var a = 0; a < d.length; a++) d[a] instanceof Array ? f.appendChild(this.Element(d[a][0], d[a][1], d[a][2])) :"script" === c ? this.setScript(f, d[a]) :f.appendChild(document.createTextNode(d[a]));
}
return f;
},
ucMatch:function(a, b) {
return b.toUpperCase();
},
addElement:function(b, a, d, c) {
return b.appendChild(this.Element(a, d, c));
},
TextNode:function(a) {
return document.createTextNode(a);
},
addText:function(a, b) {
return a.appendChild(this.TextNode(b));
},
setScript:function(a, b) {
if (this.setScriptBug) a.text = b; else {
for (;a.firstChild; ) a.removeChild(a.firstChild);
this.addText(a, b);
}
},
getScript:function(a) {
var b = "" === a.text ? a.innerHTML :a.text;
return b.replace(/^\s+/, "").replace(/\s+$/, "");
},
Cookie:{
prefix:"mjx",
expires:365,
Set:function(a, e) {
var d = [];
if (e) for (var g in e) e.hasOwnProperty(g) && d.push(g + ":" + e[g].toString().replace(/&/g, "&&"));
var b = this.prefix + "." + a + "=" + escape(d.join("&;"));
if (this.expires) {
var f = new Date();
f.setDate(f.getDate() + this.expires), b += "; expires=" + f.toGMTString();
}
try {
document.cookie = b + "; path=/";
} catch (c) {}
},
Get:function(a, d) {
d || (d = {});
var f, g = new RegExp("(?:^|;\\s*)" + this.prefix + "\\." + a + "=([^;]*)(?:;|$)");
try {
f = g.exec(document.cookie);
} catch (c) {}
if (f && "" !== f[1]) for (var j = unescape(f[1]).split("&;"), e = 0, b = j.length; b > e; e++) {
f = j[e].match(/([^:]+):(.*)/);
var h = f[2].replace(/&&/g, "&");
"true" === h ? h = !0 :"false" === h ? h = !1 :h.match(/^-?(\d+(\.\d+)?|\.\d+)$/) && (h = parseFloat(h)), 
d[f[1]] = h;
}
return d;
}
}
}, MathJax.Localization = {
locale:"en",
directory:"[MathJax]/localization",
strings:{
ast:{
menuTitle:"asturianu"
},
br:{
menuTitle:"brezhoneg"
},
ca:{
menuTitle:"catal\xe0"
},
cdo:{
menuTitle:"M\xecng-d\u0115\u0324ng-ng\u1e73\u0304"
},
cs:{
menuTitle:"\u010de\u0161tina"
},
da:{
menuTitle:"dansk"
},
de:{
menuTitle:"Deutsch"
},
en:{
menuTitle:"English",
isLoaded:!0
},
eo:{
menuTitle:"Esperanto"
},
es:{
menuTitle:"espa\xf1ol"
},
fa:{
menuTitle:"\u0641\u0627\u0631\u0633\u06cc"
},
fi:{
menuTitle:"suomi"
},
fr:{
menuTitle:"fran\xe7ais"
},
gl:{
menuTitle:"galego"
},
he:{
menuTitle:"\u05e2\u05d1\u05e8\u05d9\u05ea"
},
ia:{
menuTitle:"interlingua"
},
it:{
menuTitle:"italiano"
},
ja:{
menuTitle:"\u65e5\u672c\u8a9e"
},
kn:{
menuTitle:"\u0c95\u0ca8\u0ccd\u0ca8\u0ca1"
},
ko:{
menuTitle:"\ud55c\uad6d\uc5b4"
},
lb:{
menuTitle:"L\xebtzebuergesch"
},
mk:{
menuTitle:"\u043c\u0430\u043a\u0435\u0434\u043e\u043d\u0441\u043a\u0438"
},
nl:{
menuTitle:"Nederlands"
},
oc:{
menuTitle:"occitan"
},
pl:{
menuTitle:"polski"
},
pt:{
menuTitle:"portugus\xea"
},
"pt-br":{
menuTitle:"portugu\xeas do Brasil"
},
ru:{
menuTitle:"\u0440\u0443\u0441\u0441\u043a\u0438\u0439"
},
sl:{
menuTitle:"sloven\u0161\u010dina"
},
sv:{
menuTitle:"svenska"
},
tr:{
menuTitle:"T\xfcrk\xe7e"
},
uk:{
menuTitle:"\u0443\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430"
},
vi:{
menuTitle:"Ti\u1ebfng Vi\u1ec7t"
},
"zh-hans":{
menuTitle:"\u4e2d\u6587\uff08\u7b80\u4f53\uff09"
}
},
pattern:/%(\d+|\{\d+\}|\{[a-z]+:\%\d+(?:\|(?:%\{\d+\}|%.|[^\}])*)+\}|.)/g,
SPLIT:3 === "axb".split(/(x)/).length ? function(a, b) {
return a.split(b);
} :function(c, e) {
var b, a = [], d = 0;
for (e.lastIndex = 0; b = e.exec(c); ) a.push(c.substr(d, b.index - d)), a.push.apply(a, b.slice(1)), 
d = b.index + b[0].length;
return a.push(c.substr(d)), a;
},
_:function(b, a) {
return a instanceof Array ? this.processSnippet(b, a) :this.processString(this.lookupPhrase(b, a), [].slice.call(arguments, 2));
},
processString:function(l, o, g) {
var j, e;
for (j = 0, e = o.length; e > j; j++) g && o[j] instanceof Array && (o[j] = this.processSnippet(g, o[j]));
var f = this.SPLIT(l, this.pattern);
for (j = 1, e = f.length; e > j; j += 2) {
var p = f[j].charAt(0);
if (p >= "0" && "9" >= p) f[j] = o[f[j] - 1], "number" == typeof f[j] && (f[j] = this.number(f[j])); else if ("{" === p) if (p = f[j].substr(1), 
p >= "0" && "9" >= p) f[j] = o[f[j].substr(1, f[j].length - 2) - 1], "number" == typeof f[j] && (f[j] = this.number(f[j])); else {
var k = f[j].match(/^\{([a-z]+):%(\d+)\|(.*)\}$/);
if (k) if ("plural" === k[1]) {
var d = o[k[2] - 1];
if ("undefined" == typeof d) f[j] = "???"; else {
d = this.plural(d) - 1;
var h = k[3].replace(/(^|[^%])(%%)*%\|/g, "$1$2%\uefef").split(/\|/);
f[j] = d >= 0 && d < h.length ? this.processString(h[d].replace(/\uEFEF/g, "|"), o, g) :"???";
}
} else f[j] = "%" + f[j];
}
null == f[j] && (f[j] = "???");
}
if (!g) return f.join("");
var a = [], b = "";
for (j = 0; e > j; j++) b += f[j], j++, e > j && (f[j] instanceof Array ? (a.push(b), 
a = a.concat(f[j]), b = "") :b += f[j]);
return "" !== b && a.push(b), a;
},
processSnippet:function(g, e) {
for (var c = [], d = 0, b = e.length; b > d; d++) if (e[d] instanceof Array) {
var f = e[d];
if ("string" == typeof f[1]) {
var h = f[0];
h instanceof Array || (h = [ g, h ]);
var a = this.lookupPhrase(h, f[1]);
c = c.concat(this.processMarkdown(a, f.slice(2), g));
} else f[1] instanceof Array ? c = c.concat(this.processSnippet.apply(this, f)) :f.length >= 3 ? c.push([ f[0], f[1], this.processSnippet(g, f[2]) ]) :c.push(e[d]);
} else c.push(e[d]);
return c;
},
markdownPattern:/(%.)|(\*{1,3})((?:%.|.)+?)\2|(`+)((?:%.|.)+?)\4|\[((?:%.|.)+?)\]\(([^\s\)]+)\)/,
processMarkdown:function(b, h, d) {
for (var e, j = [], c = b.split(this.markdownPattern), g = c[0], f = 1, a = c.length; a > f; f += 8) c[f + 1] ? (e = this.processString(c[f + 2], h, d), 
e instanceof Array || (e = [ e ]), e = [ [ "b", "i", "i" ][c[f + 1].length - 1], {}, e ], 
3 === c[f + 1].length && (e = [ "b", {}, e ])) :c[f + 3] ? (e = this.processString(c[f + 4].replace(/^\s/, "").replace(/\s$/, ""), h, d), 
e instanceof Array || (e = [ e ]), e = [ "code", {}, e ]) :c[f + 5] ? (e = this.processString(c[f + 5], h, d), 
e instanceof Array || (e = [ e ]), e = [ "a", {
href:this.processString(c[f + 6], h),
target:"_blank"
}, e ]) :(g += c[f], e = null), e && (j = this.concatString(j, g, h, d), j.push(e), 
g = ""), "" !== c[f + 7] && (g += c[f + 7]);
return j = this.concatString(j, g, h, d);
},
concatString:function(a, c, b, d) {
return "" != c && (c = this.processString(c, b, d), c instanceof Array || (c = [ c ]), 
a = a.concat(c)), a;
},
lookupPhrase:function(f, a, d) {
d || (d = "_"), f instanceof Array && (d = f[0] || "_", f = f[1] || "");
var c = this.loadDomain(d);
c && MathJax.Hub.RestartAfter(c);
var b = this.strings[this.locale];
if (b && b.domains && d in b.domains) {
var e = b.domains[d];
e.strings && f in e.strings && (a = e.strings[f]);
}
return a;
},
loadFile:function(b, d, e) {
if (e = MathJax.Callback(e), b = d.file || b, b.match(/\.js$/) || (b += ".js"), 
!b.match(/^([a-z]+:|\[MathJax\])/)) {
var a = this.strings[this.locale].directory || this.directory + "/" + this.locale || "[MathJax]/localization/" + this.locale;
b = a + "/" + b;
}
var c = MathJax.Ajax.Require(b, function() {
return d.isLoaded = !0, e();
});
return c.called ? null :c;
},
loadDomain:function(c, e) {
var b, a = this.strings[this.locale];
if (a) {
if (!a.isLoaded && (b = this.loadFile(this.locale, a))) return MathJax.Callback.Queue(b, [ "loadDomain", this, c ]).Push(e || {});
if (a.domains && c in a.domains) {
var d = a.domains[c];
if (!d.isLoaded && (b = this.loadFile(c, d))) return MathJax.Callback.Queue(b).Push(e);
}
}
return MathJax.Callback(e)();
},
Try:function(a) {
a = MathJax.Callback(a), a.autoReset = !0;
try {
a();
} catch (b) {
if (!b.restart) throw b;
MathJax.Callback.After([ "Try", this, a ], b.restart);
}
},
resetLocale:function(a) {
if (a) {
for (a = a.toLowerCase(); !this.strings[a]; ) {
var c = a.lastIndexOf("-");
if (-1 === c) return;
a = a.substring(0, c);
}
var b = this.strings[a].remap;
this.locale = b ? b :a;
}
},
setLocale:function(a) {
this.resetLocale(a), MathJax.Menu && this.loadDomain("MathMenu");
},
addTranslation:function(b, e, c) {
var d = this.strings[b], a = !1;
d || (d = this.strings[b] = {}, a = !0), d.domains || (d.domains = {}), e && (d.domains[e] || (d.domains[e] = {}), 
d = d.domains[e]), MathJax.Hub.Insert(d, c), a && MathJax.Menu.menu && MathJax.Menu.CreateLocaleMenu();
},
setCSS:function(b) {
var a = this.strings[this.locale];
return a && (a.fontFamily && (b.style.fontFamily = a.fontFamily), a.fontDirection && (b.style.direction = a.fontDirection, 
"rtl" === a.fontDirection && (b.style.textAlign = "right"))), b;
},
fontFamily:function() {
var a = this.strings[this.locale];
return a ? a.fontFamily :null;
},
fontDirection:function() {
var a = this.strings[this.locale];
return a ? a.fontDirection :null;
},
plural:function(b) {
var a = this.strings[this.locale];
return a && a.plural ? a.plural(b) :1 == b ? 1 :2;
},
number:function(b) {
var a = this.strings[this.locale];
return a && a.number ? a.number(b) :b;
}
}, MathJax.Message = {
ready:!1,
log:[ {} ],
current:null,
textNodeBug:"Apple Computer, Inc." === navigator.vendor && "undefined" == typeof navigator.vendorSub || window.hasOwnProperty && window.hasOwnProperty("konqueror"),
styles:{
"#MathJax_Message":{
position:"fixed",
left:"1px",
bottom:"2px",
"background-color":"#E6E6E6",
border:"1px solid #959595",
margin:"0px",
padding:"2px 8px",
"z-index":"102",
color:"black",
"font-size":"80%",
width:"auto",
"white-space":"nowrap"
},
"#MathJax_MSIE_Frame":{
position:"absolute",
top:0,
left:0,
width:"0px",
"z-index":101,
border:"0px",
margin:"0px",
padding:"0px"
}
},
browsers:{
MSIE:function() {
MathJax.Message.msieFixedPositionBug = (document.documentMode || 0) < 7, MathJax.Message.msieFixedPositionBug && (MathJax.Hub.config.styles["#MathJax_Message"].position = "absolute"), 
MathJax.Message.quirks = "BackCompat" === document.compatMode;
},
Chrome:function() {
MathJax.Hub.config.styles["#MathJax_Message"].bottom = "1.5em", MathJax.Hub.config.styles["#MathJax_Message"].left = "1em";
}
},
Init:function(a) {
if (a && (this.ready = !0), !document.body || !this.ready) return !1;
if (this.div && null == this.div.parentNode && (this.div = document.getElementById("MathJax_Message"), 
this.div && (this.text = this.div.firstChild)), !this.div) {
var b = document.body;
this.msieFixedPositionBug && window.attachEvent && (b = this.frame = this.addDiv(document.body), 
b.removeAttribute("id"), b.style.position = "absolute", b.style.border = b.style.margin = b.style.padding = "0px", 
b.style.zIndex = "101", b.style.height = "0px", b = this.addDiv(b), b.id = "MathJax_MSIE_Frame", 
window.attachEvent("onscroll", this.MoveFrame), window.attachEvent("onresize", this.MoveFrame), 
this.MoveFrame()), this.div = this.addDiv(b), this.div.style.display = "none", this.text = this.div.appendChild(document.createTextNode(""));
}
return !0;
},
addDiv:function(a) {
var b = document.createElement("div");
return b.id = "MathJax_Message", a.firstChild ? a.insertBefore(b, a.firstChild) :a.appendChild(b), 
b;
},
MoveFrame:function() {
var a = MathJax.Message.quirks ? document.body :document.documentElement, b = MathJax.Message.frame;
b.style.left = a.scrollLeft + "px", b.style.top = a.scrollTop + "px", b.style.width = a.clientWidth + "px", 
b = b.firstChild, b.style.height = a.clientHeight + "px";
},
localize:function(a) {
return MathJax.Localization._(a, a);
},
filterText:function(a, c, b) {
return "simple" === MathJax.Hub.config.messageStyle && ("LoadFile" === b ? (this.loading || (this.loading = this.localize("Loading") + " "), 
a = this.loading, this.loading += ".") :"ProcessMath" === b ? (this.processing || (this.processing = this.localize("Processing") + " "), 
a = this.processing, this.processing += ".") :"TypesetMath" === b && (this.typesetting || (this.typesetting = this.localize("Typesetting") + " "), 
a = this.typesetting, this.typesetting += ".")), a;
},
Set:function(c, e, b) {
null == e && (e = this.log.length, this.log[e] = {});
var d = "";
if (c instanceof Array) {
d = c[0], d instanceof Array && (d = d[1]);
try {
c = MathJax.Localization._.apply(MathJax.Localization, c);
} catch (a) {
if (!a.restart) throw a;
if (!a.restart.called) return null == this.log[e].restarted && (this.log[e].restarted = 0), 
this.log[e].restarted++, delete this.log[e].cleared, MathJax.Callback.After([ "Set", this, c, e, b ], a.restart), 
e;
}
}
return this.timer && (clearTimeout(this.timer), delete this.timer), this.log[e].text = c, 
this.log[e].filteredText = c = this.filterText(c, e, d), "undefined" == typeof this.log[e].next && (this.log[e].next = this.current, 
null != this.current && (this.log[this.current].prev = e), this.current = e), this.current === e && "none" !== MathJax.Hub.config.messageStyle && (this.Init() ? (this.textNodeBug ? this.div.innerHTML = c :this.text.nodeValue = c, 
this.div.style.display = "", this.status && (window.status = "", delete this.status)) :(window.status = c, 
this.status = !0)), this.log[e].restarted && (this.log[e].cleared && (b = 0), 0 === --this.log[e].restarted && delete this.log[e].cleared), 
b ? setTimeout(MathJax.Callback([ "Clear", this, e ]), b) :0 == b && this.Clear(e, 0), 
e;
},
Clear:function(b, a) {
null != this.log[b].prev && (this.log[this.log[b].prev].next = this.log[b].next), 
null != this.log[b].next && (this.log[this.log[b].next].prev = this.log[b].prev), 
this.current === b && (this.current = this.log[b].next, this.text ? (null == this.div.parentNode && this.Init(), 
null == this.current ? (this.timer && (clearTimeout(this.timer), delete this.timer), 
null == a && (a = 600), 0 === a ? this.Remove() :this.timer = setTimeout(MathJax.Callback([ "Remove", this ]), a)) :"none" !== MathJax.Hub.config.messageStyle && (this.textNodeBug ? this.div.innerHTML = this.log[this.current].filteredText :this.text.nodeValue = this.log[this.current].filteredText), 
this.status && (window.status = "", delete this.status)) :this.status && (window.status = null == this.current ? "" :this.log[this.current].text)), 
delete this.log[b].next, delete this.log[b].prev, delete this.log[b].filteredText, 
this.log[b].restarted && (this.log[b].cleared = !0);
},
Remove:function() {
this.text.nodeValue = "", this.div.style.display = "none";
},
File:function(a) {
return this.Set([ "LoadFile", "Loading %1", a ], null, null);
},
Log:function() {
for (var b = [], c = 1, a = this.log.length; a > c; c++) b[c] = this.log[c].text;
return b.join("\n");
}
}, MathJax.Hub = {
config:{
root:"",
config:[],
styleSheets:[],
styles:{
".MathJax_Preview":{
color:"#888"
}
},
jax:[],
extensions:[],
preJax:null,
postJax:null,
displayAlign:"center",
displayIndent:"0",
preRemoveClass:"MathJax_Preview",
showProcessingMessages:!0,
messageStyle:"normal",
delayStartupUntil:"none",
skipStartupTypeset:!1,
elements:[],
positionToHash:!0,
showMathMenu:!0,
showMathMenuMSIE:!0,
menuSettings:{
zoom:"None",
CTRL:!1,
ALT:!1,
CMD:!1,
Shift:!1,
discoverable:!1,
zscale:"200%",
renderer:"",
font:"Auto",
context:"MathJax",
locale:"en",
mpContext:!1,
mpMouse:!1,
texHints:!0,
semantics:!1
},
errorSettings:{
message:[ "[", [ "MathProcessingError", "Math Processing Error" ], "]" ],
style:{
color:"#CC0000",
"font-style":"italic"
}
}
},
preProcessors:MathJax.Callback.Hooks(!0),
inputJax:{},
outputJax:{
order:{}
},
processUpdateTime:250,
processUpdateDelay:10,
signal:MathJax.Callback.Signal("Hub"),
Config:function(a) {
this.Insert(this.config, a), this.config.Augment && this.Augment(this.config.Augment);
},
CombineConfig:function(c, f) {
var g, e, b = this.config;
c = c.split(/\./);
for (var d = 0, a = c.length; a > d; d++) g = c[d], b[g] || (b[g] = {}), e = b, 
b = b[g];
return e[g] = b = this.Insert(f, b), b;
},
Register:{
PreProcessor:function() {
MathJax.Hub.preProcessors.Add.apply(MathJax.Hub.preProcessors, arguments);
},
MessageHook:function() {
return MathJax.Hub.signal.MessageHook.apply(MathJax.Hub.signal, arguments);
},
StartupHook:function() {
return MathJax.Hub.Startup.signal.MessageHook.apply(MathJax.Hub.Startup.signal, arguments);
},
LoadHook:function() {
return MathJax.Ajax.LoadHook.apply(MathJax.Ajax, arguments);
}
},
getAllJax:function(e) {
for (var c = [], b = this.elementScripts(e), d = 0, a = b.length; a > d; d++) b[d].MathJax && b[d].MathJax.elementJax && c.push(b[d].MathJax.elementJax);
return c;
},
getJaxByType:function(f, e) {
for (var c = [], b = this.elementScripts(e), d = 0, a = b.length; a > d; d++) b[d].MathJax && b[d].MathJax.elementJax && b[d].MathJax.elementJax.mimeType === f && c.push(b[d].MathJax.elementJax);
return c;
},
getJaxByInputType:function(f, e) {
for (var c = [], b = this.elementScripts(e), d = 0, a = b.length; a > d; d++) b[d].MathJax && b[d].MathJax.elementJax && b[d].type && b[d].type.replace(/ *;(.|\s)*/, "") === f && c.push(b[d].MathJax.elementJax);
return c;
},
getJaxFor:function(a) {
if ("string" == typeof a && (a = document.getElementById(a)), a && a.MathJax) return a.MathJax.elementJax;
if (a && a.isMathJax) {
for (;a && !a.jaxID; ) a = a.parentNode;
if (a) return MathJax.OutputJax[a.jaxID].getJaxFromMath(a);
}
return null;
},
isJax:function(a) {
if ("string" == typeof a && (a = document.getElementById(a)), a && a.isMathJax) return 1;
if (a && null != a.tagName && "script" === a.tagName.toLowerCase()) {
if (a.MathJax) return a.MathJax.state === MathJax.ElementJax.STATE.PROCESSED ? 1 :-1;
if (a.type && this.inputJax[a.type.replace(/ *;(.|\s)*/, "")]) return -1;
}
return 0;
},
setRenderer:function(d, c) {
if (d) {
if (MathJax.OutputJax[d]) {
this.config.menuSettings.renderer = d, null == c && (c = "jax/mml");
var a = this.outputJax;
return a[c] && a[c].length && d !== a[c][0].id ? (a[c].unshift(MathJax.OutputJax[d]), 
this.signal.Post([ "Renderer Selected", d ])) :null;
}
this.config.menuSettings.renderer = "";
var b = "[MathJax]/jax/output/" + d + "/config.js";
return MathJax.Ajax.Require(b, [ "setRenderer", this, d, c ]);
}
},
Queue:function() {
return this.queue.Push.apply(this.queue, arguments);
},
Typeset:function(e, f) {
if (!MathJax.isReady) return null;
for (var c = this.elementCallback(e, f), b = MathJax.Callback.Queue(), d = 0, a = c.elements.length; a > d; d++) c.elements[d] && b.Push([ "PreProcess", this, c.elements[d] ], [ "Process", this, c.elements[d] ]);
return b.Push(c.callback);
},
PreProcess:function(e, f) {
for (var c = this.elementCallback(e, f), b = MathJax.Callback.Queue(), d = 0, a = c.elements.length; a > d; d++) c.elements[d] && b.Push([ "Post", this.signal, [ "Begin PreProcess", c.elements[d] ] ], arguments.callee.disabled ? {} :[ "Execute", this.preProcessors, c.elements[d] ], [ "Post", this.signal, [ "End PreProcess", c.elements[d] ] ]);
return b.Push(c.callback);
},
Process:function(a, b) {
return this.takeAction("Process", a, b);
},
Update:function(a, b) {
return this.takeAction("Update", a, b);
},
Reprocess:function(a, b) {
return this.takeAction("Reprocess", a, b);
},
Rerender:function(a, b) {
return this.takeAction("Rerender", a, b);
},
takeAction:function(g, e, h) {
for (var c = this.elementCallback(e, h), b = MathJax.Callback.Queue([ "Clear", this.signal ]), d = 0, a = c.elements.length; a > d; d++) if (c.elements[d]) {
var f = {
scripts:[],
start:new Date().getTime(),
i:0,
j:0,
jax:{},
jaxIDs:[]
};
b.Push([ "Post", this.signal, [ "Begin " + g, c.elements[d] ] ], [ "Post", this.signal, [ "Begin Math", c.elements[d], g ] ], [ "prepareScripts", this, g, c.elements[d], f ], [ "Post", this.signal, [ "Begin Math Input", c.elements[d], g ] ], [ "processInput", this, f ], [ "Post", this.signal, [ "End Math Input", c.elements[d], g ] ], [ "prepareOutput", this, f, "preProcess" ], [ "Post", this.signal, [ "Begin Math Output", c.elements[d], g ] ], [ "processOutput", this, f ], [ "Post", this.signal, [ "End Math Output", c.elements[d], g ] ], [ "prepareOutput", this, f, "postProcess" ], [ "Post", this.signal, [ "End Math", c.elements[d], g ] ], [ "Post", this.signal, [ "End " + g, c.elements[d] ] ]);
}
return b.Push(c.callback);
},
scriptAction:{
Process:function() {},
Update:function(b) {
var a = b.MathJax.elementJax;
a && a.needsUpdate() ? (a.Remove(!0), b.MathJax.state = a.STATE.UPDATE) :b.MathJax.state = a.STATE.PROCESSED;
},
Reprocess:function(b) {
var a = b.MathJax.elementJax;
a && (a.Remove(!0), b.MathJax.state = a.STATE.UPDATE);
},
Rerender:function(b) {
var a = b.MathJax.elementJax;
a && (a.Remove(!0), b.MathJax.state = a.STATE.OUTPUT);
}
},
prepareScripts:function(h, e, g) {
if (!arguments.callee.disabled) for (var b = this.elementScripts(e), f = MathJax.ElementJax.STATE, d = 0, a = b.length; a > d; d++) {
var c = b[d];
c.type && this.inputJax[c.type.replace(/ *;(.|\n)*/, "")] && (c.MathJax && (c.MathJax.elementJax && c.MathJax.elementJax.hover && MathJax.Extension.MathEvents.Hover.ClearHover(c.MathJax.elementJax), 
c.MathJax.state !== f.PENDING && this.scriptAction[h](c)), c.MathJax || (c.MathJax = {
state:f.PENDING
}), c.MathJax.state !== f.PROCESSED && g.scripts.push(c));
}
},
checkScriptSiblings:function(a) {
if (!a.MathJax.checked) {
var b = this.config, f = a.previousSibling;
if (f && "#text" === f.nodeName) {
var d, e, c = a.nextSibling;
c && "#text" !== c.nodeName && (c = null), b.preJax && ("string" == typeof b.preJax && (b.preJax = new RegExp(b.preJax + "$")), 
d = f.nodeValue.match(b.preJax)), b.postJax && c && ("string" == typeof b.postJax && (b.postJax = new RegExp("^" + b.postJax)), 
e = c.nodeValue.match(b.postJax)), !d || b.postJax && !e || (f.nodeValue = f.nodeValue.replace(b.preJax, d.length > 1 ? d[1] :""), 
f = null), !e || b.preJax && !d || (c.nodeValue = c.nodeValue.replace(b.postJax, e.length > 1 ? e[1] :"")), 
f && !f.nodeValue.match(/\S/) && (f = f.previousSibling);
}
b.preRemoveClass && f && f.className === b.preRemoveClass && (a.MathJax.preview = f), 
a.MathJax.checked = 1;
}
},
processInput:function(a) {
var b, h, e, i = MathJax.ElementJax.STATE, d = a.scripts.length;
try {
for (;a.i < d; ) if (h = a.scripts[a.i]) if (e = h.previousSibling, e && "MathJax_Error" === e.className && e.parentNode.removeChild(e), 
h.MathJax && h.MathJax.state !== i.PROCESSED) {
if (h.MathJax.elementJax && h.MathJax.state !== i.UPDATE) h.MathJax.state === i.OUTPUT && this.saveScript(h.MathJax.elementJax, a, h, i); else {
this.checkScriptSiblings(h);
var g = h.type.replace(/ *;(.|\s)*/, "");
if (b = this.inputJax[g].Process(h, a), "function" == typeof b) {
if (b.called) continue;
this.RestartAfter(b);
}
b.Attach(h, this.inputJax[g].id), this.saveScript(b, a, h, i);
}
a.i++;
var c = new Date().getTime();
c - a.start > this.processUpdateTime && a.i < a.scripts.length && (a.start = c, 
this.RestartAfter(MathJax.Callback.Delay(1)));
} else a.i++; else a.i++;
} catch (f) {
return this.processError(f, a, "Input");
}
return a.scripts.length && this.config.showProcessingMessages && MathJax.Message.Set([ "ProcessMath", "Processing math: %1%%", 100 ], 0), 
a.start = new Date().getTime(), a.i = a.j = 0, null;
},
saveScript:function(a, d, b, c) {
if (!this.outputJax[a.mimeType]) throw b.MathJax.state = c.UPDATE, Error("No output jax registered for " + a.mimeType);
a.outputJax = this.outputJax[a.mimeType][0].id, d.jax[a.outputJax] || (0 === d.jaxIDs.length ? d.jax[a.outputJax] = d.scripts :(1 === d.jaxIDs.length && (d.jax[d.jaxIDs[0]] = d.scripts.slice(0, d.i)), 
d.jax[a.outputJax] = []), d.jaxIDs.push(a.outputJax)), d.jaxIDs.length > 1 && d.jax[a.outputJax].push(b), 
b.MathJax.state = c.OUTPUT;
},
prepareOutput:function(c, f) {
for (;c.j < c.jaxIDs.length; ) {
var e = c.jaxIDs[c.j], d = MathJax.OutputJax[e];
if (d[f]) try {
var a = d[f](c);
if ("function" == typeof a) {
if (a.called) continue;
this.RestartAfter(a);
}
} catch (b) {
return b.restart || (MathJax.Message.Set([ "PrepError", "Error preparing %1 output (%2)", e, f ], null, 600), 
MathJax.Hub.lastPrepError = b, c.j++), MathJax.Callback.After([ "prepareOutput", this, c, f ], b.restart);
}
c.j++;
}
return null;
},
processOutput:function(h) {
var b, d, g = MathJax.ElementJax.STATE, a = h.scripts.length;
try {
for (;h.i < a; ) if (d = h.scripts[h.i], d && d.MathJax && !d.MathJax.error) {
var c = d.MathJax.elementJax;
if (c) {
b = MathJax.OutputJax[c.outputJax].Process(d, h), d.MathJax.state = g.PROCESSED, 
h.i++, d.MathJax.preview && (d.MathJax.preview.innerHTML = ""), this.signal.Post([ "New Math", c.inputID ]);
var e = new Date().getTime();
e - h.start > this.processUpdateTime && h.i < h.scripts.length && (h.start = e, 
this.RestartAfter(MathJax.Callback.Delay(this.processUpdateDelay)));
} else h.i++;
} else h.i++;
} catch (f) {
return this.processError(f, h, "Output");
}
return h.scripts.length && this.config.showProcessingMessages && (MathJax.Message.Set([ "TypesetMath", "Typesetting math: %1%%", 100 ], 0), 
MathJax.Message.Clear(0)), h.i = h.j = 0, null;
},
processMessage:function(d, b) {
var a = Math.floor(d.i / d.scripts.length * 100), c = "Output" === b ? [ "TypesetMath", "Typesetting math: %1%%" ] :[ "ProcessMath", "Processing math: %1%%" ];
this.config.showProcessingMessages && MathJax.Message.Set(c.concat(a), 0);
},
processError:function(b, c, a) {
if (!b.restart) {
if (!this.config.errorSettings.message) throw b;
this.formatError(c.scripts[c.i], b), c.i++;
}
return this.processMessage(c, a), MathJax.Callback.After([ "process" + a, this, c ], b.restart);
},
formatError:function(b, e) {
var d = "Error: " + e.message + "\n";
e.sourceURL && (d += "\nfile: " + e.sourceURL), e.line && (d += "\nline: " + e.line), 
b.MathJax.error = MathJax.OutputJax.Error.Jax(d, b);
var f = this.config.errorSettings, a = MathJax.Localization._(f.messageId, f.message), c = MathJax.HTML.Element("span", {
className:"MathJax_Error",
jaxID:"Error",
isMathJax:!0
}, a);
MathJax.Extension.MathEvents ? (c.oncontextmenu = MathJax.Extension.MathEvents.Event.Menu, 
c.onmousedown = MathJax.Extension.MathEvents.Event.Mousedown) :MathJax.Ajax.Require("[MathJax]/extensions/MathEvents.js", function() {
c.oncontextmenu = MathJax.Extension.MathEvents.Event.Menu, c.onmousedown = MathJax.Extension.MathEvents.Event.Mousedown;
}), b.parentNode.insertBefore(c, b), b.MathJax.preview && (b.MathJax.preview.innerHTML = ""), 
this.lastError = e, this.signal.Post([ "Math Processing Error", b, e ]);
},
RestartAfter:function(a) {
throw this.Insert(Error("restart"), {
restart:MathJax.Callback(a)
});
},
elementCallback:function(c, f) {
if (null == f && (c instanceof Array || "function" == typeof c)) try {
MathJax.Callback(c), f = c, c = null;
} catch (d) {}
null == c && (c = this.config.elements || []), c instanceof Array || (c = [ c ]), 
c = [].concat(c);
for (var b = 0, a = c.length; a > b; b++) "string" == typeof c[b] && (c[b] = document.getElementById(c[b]));
return document.body || (document.body = document.getElementsByTagName("body")[0]), 
0 == c.length && c.push(document.body), f || (f = {}), {
elements:c,
callback:f
};
},
elementScripts:function(d) {
if (d instanceof Array) {
for (var b = [], c = 0, a = d.length; a > c; c++) b.push.apply(b, this.elementScripts(d[c]));
return b;
}
return "string" == typeof d && (d = document.getElementById(d)), document.body || (document.body = document.getElementsByTagName("body")[0]), 
null == d && (d = document.body), null != d.tagName && "script" === d.tagName.toLowerCase() ? [ d ] :d.getElementsByTagName("script");
},
Insert:function(c, a) {
for (var b in a) a.hasOwnProperty(b) && ("object" != typeof a[b] || a[b] instanceof Array || "object" != typeof c[b] && "function" != typeof c[b] ? c[b] = a[b] :this.Insert(c[b], a[b]));
return c;
},
SplitList:"trim" in String.prototype ? function(a) {
return a.trim().split(/\s+/);
} :function(a) {
return a.replace(/^\s+/, "").replace(/\s+$/, "").split(/\s+/);
}
}, MathJax.Hub.Insert(MathJax.Hub.config.styles, MathJax.Message.styles), MathJax.Hub.Insert(MathJax.Hub.config.styles, {
".MathJax_Error":MathJax.Hub.config.errorSettings.style
}), MathJax.Extension = {}, MathJax.Hub.Configured = MathJax.Callback({}), MathJax.Hub.Startup = {
script:"",
queue:MathJax.Callback.Queue(),
signal:MathJax.Callback.Signal("Startup"),
params:{},
Config:function() {
if (this.queue.Push([ "Post", this.signal, "Begin Config" ]), this.params.locale && (MathJax.Localization.resetLocale(this.params.locale), 
MathJax.Hub.config.menuSettings.locale = this.params.locale), this.params.config) for (var c = this.params.config.split(/,/), b = 0, a = c.length; a > b; b++) c[b].match(/\.js$/) || (c[b] += ".js"), 
this.queue.Push([ "Require", MathJax.Ajax, this.URL("config", c[b]) ]);
this.queue.Push([ "Config", MathJax.Hub, MathJax.AuthorConfig ]), this.script.match(/\S/) && this.queue.Push(this.script + ";\n1;"), 
this.queue.Push([ "ConfigDelay", this ], [ "ConfigBlocks", this ], [ function(d) {
return d.loadArray(MathJax.Hub.config.config, "config", null, !0);
}, this ], [ "Post", this.signal, "End Config" ]);
},
ConfigDelay:function() {
var a = this.params.delayStartupUntil || MathJax.Hub.config.delayStartupUntil;
return "onload" === a ? this.onload :"configured" === a ? MathJax.Hub.Configured :a;
},
ConfigBlocks:function() {
for (var c = document.getElementsByTagName("script"), f = null, b = MathJax.Callback.Queue(), d = 0, a = c.length; a > d; d++) {
var e = String(c[d].type).replace(/ /g, "");
e.match(/^text\/x-mathjax-config(;.*)?$/) && !e.match(/;executed=true/) && (c[d].type += ";executed=true", 
f = b.Push(c[d].innerHTML + ";\n1;"));
}
return f;
},
Cookie:function() {
return this.queue.Push([ "Post", this.signal, "Begin Cookie" ], [ "Get", MathJax.HTML.Cookie, "menu", MathJax.Hub.config.menuSettings ], [ function(d) {
d.menuSettings.locale && MathJax.Localization.resetLocale(d.menuSettings.locale);
var f = d.menuSettings.renderer, b = d.jax;
if (f) {
var c = "output/" + f;
b.sort();
for (var e = 0, a = b.length; a > e && "output/" !== b[e].substr(0, 7); e++) ;
if (e == a - 1) b.pop(); else for (;a > e; ) {
if (b[e] === c) {
b.splice(e, 1);
break;
}
e++;
}
b.unshift(c);
}
}, MathJax.Hub.config ], [ "Post", this.signal, "End Cookie" ]);
},
Styles:function() {
return this.queue.Push([ "Post", this.signal, "Begin Styles" ], [ "loadArray", this, MathJax.Hub.config.styleSheets, "config" ], [ "Styles", MathJax.Ajax, MathJax.Hub.config.styles ], [ "Post", this.signal, "End Styles" ]);
},
Jax:function() {
for (var f = MathJax.Hub.config, c = MathJax.Hub.outputJax, g = 0, b = f.jax.length, d = 0; b > g; g++) {
var e = f.jax[g].substr(7);
"output/" === f.jax[g].substr(0, 7) && null == c.order[e] && (c.order[e] = d, d++);
}
var a = MathJax.Callback.Queue();
return a.Push([ "Post", this.signal, "Begin Jax" ], [ "loadArray", this, f.jax, "jax", "config.js" ], [ "Post", this.signal, "End Jax" ]);
},
Extensions:function() {
var a = MathJax.Callback.Queue();
return a.Push([ "Post", this.signal, "Begin Extensions" ], [ "loadArray", this, MathJax.Hub.config.extensions, "extensions" ], [ "Post", this.signal, "End Extensions" ]);
},
Message:function() {
MathJax.Message.Init(!0);
},
Menu:function() {
var d, b = MathJax.Hub.config.menuSettings, a = MathJax.Hub.outputJax;
for (var c in a) if (a.hasOwnProperty(c) && a[c].length) {
d = a[c];
break;
}
d && d.length && (b.renderer && b.renderer !== d[0].id && d.unshift(MathJax.OutputJax[b.renderer]), 
b.renderer = d[0].id);
},
Hash:function() {
if (MathJax.Hub.config.positionToHash && document.location.hash && document.body && document.body.scrollIntoView) {
var d = document.location.hash.substr(1), f = document.getElementById(d);
if (!f) for (var c = document.getElementsByTagName("a"), e = 0, b = c.length; b > e; e++) if (c[e].name === d) {
f = c[e];
break;
}
if (f) {
for (;!f.scrollIntoView; ) f = f.parentNode;
f = this.HashCheck(f), f && f.scrollIntoView && setTimeout(function() {
f.scrollIntoView(!0);
}, 1);
}
}
},
HashCheck:function(b) {
if (b.isMathJax) {
var a = MathJax.Hub.getJaxFor(b);
a && MathJax.OutputJax[a.outputJax].hashCheck && (b = MathJax.OutputJax[a.outputJax].hashCheck(b));
}
return b;
},
MenuZoom:function() {
MathJax.Hub.config.showMathMenu && (MathJax.Extension.MathMenu ? setTimeout(MathJax.Callback([ "loadDomain", MathJax.Localization, "MathMenu" ]), 1e3) :setTimeout(function() {
MathJax.Callback.Queue([ "Require", MathJax.Ajax, "[MathJax]/extensions/MathMenu.js", {} ], [ "loadDomain", MathJax.Localization, "MathMenu" ]);
}, 1e3), MathJax.Extension.MathZoom || setTimeout(MathJax.Callback([ "Require", MathJax.Ajax, "[MathJax]/extensions/MathZoom.js", {} ]), 2e3));
},
onLoad:function() {
var a = this.onload = MathJax.Callback(function() {
MathJax.Hub.Startup.signal.Post("onLoad");
});
if (document.body && document.readyState) if (MathJax.Hub.Browser.isMSIE) {
if ("complete" === document.readyState) return [ a ];
} else if ("loading" !== document.readyState) return [ a ];
return window.addEventListener ? (window.addEventListener("load", a, !1), this.params.noDOMContentEvent || window.addEventListener("DOMContentLoaded", a, !1)) :window.attachEvent ? window.attachEvent("onload", a) :window.onload = a, 
a;
},
Typeset:function(a, b) {
return MathJax.Hub.config.skipStartupTypeset ? function() {} :this.queue.Push([ "Post", this.signal, "Begin Typeset" ], [ "Typeset", MathJax.Hub, a, b ], [ "Post", this.signal, "End Typeset" ]);
},
URL:function(b, a) {
return a.match(/^([a-z]+:\/\/|\[|\/)/) || (a = "[MathJax]/" + b + "/" + a), a;
},
loadArray:function(b, f, c, a) {
if (b && (b instanceof Array || (b = [ b ]), b.length)) {
for (var e, h = MathJax.Callback.Queue(), j = {}, g = 0, d = b.length; d > g; g++) e = this.URL(f, b[g]), 
c && (e += "/" + c), a ? h.Push([ "Require", MathJax.Ajax, e, j ]) :h.Push(MathJax.Ajax.Require(e, j));
return h.Push({});
}
return null;
}
}, function(d) {
var b = window[d], e = "[" + d + "]", c = b.Hub, a = b.Ajax, f = b.Callback, g = MathJax.Object.Subclass({
JAXFILE:"jax.js",
require:null,
config:{},
Init:function(i, h) {
return 0 === arguments.length ? this :this.constructor.Subclass(i, h)();
},
Augment:function(k, j) {
var i = this.constructor, h = {};
if (null != k) {
for (var l in k) k.hasOwnProperty(l) && ("function" == typeof k[l] ? i.protoFunction(l, k[l]) :h[l] = k[l]);
k.toString !== i.prototype.toString && k.toString !== {}.toString && i.protoFunction("toString", k.toString);
}
return c.Insert(i.prototype, h), i.Augment(null, j), this;
},
Translate:function() {
throw Error(this.directory + "/" + this.JAXFILE + " failed to define the Translate() method");
},
Register:function() {},
Config:function() {
this.config = c.CombineConfig(this.id, this.config), this.config.Augment && this.Augment(this.config.Augment);
},
Startup:function() {},
loadComplete:function(i) {
if ("config.js" === i) return a.loadComplete(this.directory + "/" + i);
var h = f.Queue();
return h.Push(c.Register.StartupHook("End Config", {}), [ "Post", c.Startup.signal, this.id + " Jax Config" ], [ "Config", this ], [ "Post", c.Startup.signal, this.id + " Jax Require" ], [ function(j) {
return MathJax.Hub.Startup.loadArray(j.require, this.directory);
}, this ], [ function(j, k) {
return MathJax.Hub.Startup.loadArray(j.extensions, "extensions/" + k);
}, this.config || {}, this.id ], [ "Post", c.Startup.signal, this.id + " Jax Startup" ], [ "Startup", this ], [ "Post", c.Startup.signal, this.id + " Jax Ready" ]), 
this.copyTranslate && h.Push([ function(j) {
j.preProcess = j.preTranslate, j.Process = j.Translate, j.postProcess = j.postTranslate;
}, this.constructor.prototype ]), h.Push([ "loadComplete", a, this.directory + "/" + i ]);
}
}, {
id:"Jax",
version:"2.4.0",
directory:e + "/jax",
extensionDir:e + "/extensions"
});
b.InputJax = g.Subclass({
elementJax:"mml",
sourceMenuTitle:[ "Original", "Original Form" ],
copyTranslate:!0,
Process:function() {
var o, j = f.Queue(), k = this.elementJax;
k instanceof Array || (k = [ k ]);
for (var n = 0, h = k.length; h > n; n++) o = b.ElementJax.directory + "/" + k[n] + "/" + this.JAXFILE, 
this.require ? this.require instanceof Array || (this.require = [ this.require ]) :this.require = [], 
this.require.push(o), j.Push(a.Require(o));
o = this.directory + "/" + this.JAXFILE;
var p = j.Push(a.Require(o));
return p.called || (this.constructor.prototype.Process = function() {
if (!p.called) return p;
throw Error(o + " failed to load properly");
}), k = c.outputJax["jax/" + k[0]], k && j.Push(a.Require(k[0].directory + "/" + this.JAXFILE)), 
j.Push({});
},
needsUpdate:function(h) {
var i = h.SourceElement();
return h.originalText !== b.HTML.getScript(i);
},
Register:function(h) {
c.inputJax || (c.inputJax = {}), c.inputJax[h] = this;
}
}, {
id:"InputJax",
version:"2.4.0",
directory:g.directory + "/input",
extensionDir:g.extensionDir
}), b.OutputJax = g.Subclass({
copyTranslate:!0,
preProcess:function() {
var i, h = this.directory + "/" + this.JAXFILE;
return this.constructor.prototype.preProcess = function() {
if (!i.called) return i;
throw Error(h + " failed to load properly");
}, i = a.Require(h);
},
Register:function(i) {
var h = c.outputJax;
h[i] || (h[i] = []), h[i].length && (this.id === c.config.menuSettings.renderer || (h.order[this.id] || 0) < (h.order[h[i][0].id] || 0)) ? h[i].unshift(this) :h[i].push(this), 
this.require ? this.require instanceof Array || (this.require = [ this.require ]) :this.require = [], 
this.require.push(b.ElementJax.directory + "/" + i.split(/\//)[1] + "/" + this.JAXFILE);
},
Remove:function() {}
}, {
id:"OutputJax",
version:"2.4.0",
directory:g.directory + "/output",
extensionDir:g.extensionDir,
fontDir:e + (b.isPacked ? "" :"/..") + "/fonts",
imageDir:e + (b.isPacked ? "" :"/..") + "/images"
}), b.ElementJax = g.Subclass({
Init:function(i, h) {
return this.constructor.Subclass(i, h);
},
inputJax:null,
outputJax:null,
inputID:null,
originalText:"",
mimeType:"",
sourceMenuTitle:[ "MathMLcode", "MathML Code" ],
Text:function(i, j) {
var h = this.SourceElement();
return b.HTML.setScript(h, i), h.MathJax.state = this.STATE.UPDATE, c.Update(h, j);
},
Reprocess:function(i) {
var h = this.SourceElement();
return h.MathJax.state = this.STATE.UPDATE, c.Reprocess(h, i);
},
Update:function(h) {
return this.Rerender(h);
},
Rerender:function(i) {
var h = this.SourceElement();
return h.MathJax.state = this.STATE.OUTPUT, c.Process(h, i);
},
Remove:function(h) {
this.hover && this.hover.clear(this), b.OutputJax[this.outputJax].Remove(this), 
h || (c.signal.Post([ "Remove Math", this.inputID ]), this.Detach());
},
needsUpdate:function() {
return b.InputJax[this.inputJax].needsUpdate(this);
},
SourceElement:function() {
return document.getElementById(this.inputID);
},
Attach:function(i, j) {
var h = i.MathJax.elementJax;
return i.MathJax.state === this.STATE.UPDATE ? h.Clone(this) :(h = i.MathJax.elementJax = this, 
i.id ? this.inputID = i.id :(i.id = this.inputID = b.ElementJax.GetID(), this.newID = 1)), 
h.originalText = b.HTML.getScript(i), h.inputJax = j, h.root && (h.root.inputID = h.inputID), 
h;
},
Detach:function() {
var h = this.SourceElement();
if (h) {
try {
delete h.MathJax;
} catch (i) {
h.MathJax = null;
}
this.newID && (h.id = "");
}
},
Clone:function(h) {
var i;
for (i in this) this.hasOwnProperty(i) && "undefined" == typeof h[i] && "newID" !== i && delete this[i];
for (i in h) h.hasOwnProperty(i) && ("undefined" == typeof this[i] || this[i] !== h[i] && "inputID" !== i) && (this[i] = h[i]);
}
}, {
id:"ElementJax",
version:"2.4.0",
directory:g.directory + "/element",
extensionDir:g.extensionDir,
ID:0,
STATE:{
PENDING:1,
PROCESSED:2,
UPDATE:3,
OUTPUT:4
},
GetID:function() {
return this.ID++, "MathJax-Element-" + this.ID;
},
Subclass:function() {
var h = g.Subclass.apply(this, arguments);
return h.loadComplete = this.prototype.loadComplete, h;
}
}), b.ElementJax.prototype.STATE = b.ElementJax.STATE, b.OutputJax.Error = {
id:"Error",
version:"2.4.0",
config:{},
ContextMenu:function() {
return b.Extension.MathEvents.Event.ContextMenu.apply(b.Extension.MathEvents.Event, arguments);
},
Mousedown:function() {
return b.Extension.MathEvents.Event.AltContextMenu.apply(b.Extension.MathEvents.Event, arguments);
},
getJaxFromMath:function(h) {
return (h.nextSibling.MathJax || {}).error;
},
Jax:function(j, i) {
var h = MathJax.Hub.inputJax[i.type.replace(/ *;(.|\s)*/, "")];
return {
inputJax:(h || {
id:"Error"
}).id,
outputJax:"Error",
sourceMenuTitle:[ "ErrorMessage", "Error Message" ],
sourceMenuFormat:"Error",
originalText:MathJax.HTML.getScript(i),
errorText:j
};
}
}, b.InputJax.Error = {
id:"Error",
version:"2.4.0",
config:{},
sourceMenuTitle:[ "Original", "Original Form" ]
};
}("MathJax"), function(n) {
var g = window[n];
g || (g = window[n] = {});
var c = g.Hub, r = c.Startup, v = c.config, f = document.getElementsByTagName("head")[0];
f || (f = document.childNodes[0]);
for (var b = (document.documentElement || document).getElementsByTagName("script"), e = new RegExp("(^|/)" + n + "\\.js(\\?.*)?$"), p = b.length - 1; p >= 0; p--) if ((b[p].src || "").match(e)) {
if (r.script = b[p].innerHTML, RegExp.$2) for (var s = RegExp.$2.substr(1).split(/\&/), o = 0, k = s.length; k > o; o++) {
var l = s[o].match(/(.*)=(.*)/);
l && (r.params[unescape(l[1])] = unescape(l[2]));
}
v.root = b[p].src.replace(/(^|\/)[^\/]*(\?.*)?$/, "").replace(/^(https?:)\/\/[0-9a-f]+(-[0-9a-f]+)?.ssl.cf1.rackcdn.com\//, "$1//cdn.mathjax.org/"), 
g.Ajax.config.root = v.root;
break;
}
var h = navigator.userAgent, a = {
isMac:"Mac" === navigator.platform.substr(0, 3),
isPC:"Win" === navigator.platform.substr(0, 3),
isMSIE:"ActiveXObject" in window && "clipboardData" in window,
isFirefox:h.match(/Gecko\//) && !h.match(/like Gecko/),
isSafari:null != h.match(/ (Apple)?WebKit\//) && (!window.chrome || null == window.chrome.loadTimes),
isChrome:null != window.chrome && null != window.chrome.loadTimes,
isOpera:null != window.opera && null != window.opera.version,
isKonqueror:"konqueror" in window && "KDE" == navigator.vendor,
versionAtLeast:function(x) {
var w = this.version.split(".");
x = new String(x).split(".");
for (var y = 0, j = x.length; j > y; y++) if (w[y] != x[y]) return parseInt(w[y] || "0") >= parseInt(x[y]);
return !0;
},
Select:function(j) {
var i = j[c.Browser];
return i ? i(c.Browser) :null;
}
}, d = h.replace(/^Mozilla\/(\d+\.)+\d+ /, "").replace(/[a-z][-a-z0-9._: ]+\/\d+[^ ]*-[^ ]*\.([a-z][a-z])?\d+ /i, "").replace(/Gentoo |Ubuntu\/(\d+\.)*\d+ (\([^)]*\) )?/, "");
c.Browser = c.Insert(c.Insert(new String("Unknown"), {
version:"0.0"
}), a);
for (var u in a) if (a.hasOwnProperty(u) && a[u] && "is" === u.substr(0, 2)) {
if (u = u.slice(2), "Mac" === u || "PC" === u) continue;
c.Browser = c.Insert(new String(u), a);
var q = new RegExp(".*(Version/| Trident/.*; rv:)((?:\\d+\\.)+\\d+)|.*(" + u + ")" + ("MSIE" == u ? " " :"/") + "((?:\\d+\\.)*\\d+)|(?:^|\\(| )([a-z][-a-z0-9._: ]+|(?:Apple)?WebKit)/((?:\\d+\\.)+\\d+)"), t = q.exec(d) || [ "", "", "", "unknown", "0.0" ];
c.Browser.name = "" != t[1] ? u :t[3] || t[5], c.Browser.version = t[2] || t[4] || t[6];
break;
}
c.Browser.Select({
Safari:function(j) {
var i = parseInt(String(j.version).split(".")[0]);
i > 85 && (j.webkit = j.version), i >= 534 ? j.version = "5.1" :i >= 533 ? j.version = "5.0" :i >= 526 ? j.version = "4.0" :i >= 525 ? j.version = "3.1" :i > 500 ? j.version = "3.0" :i > 400 ? j.version = "2.0" :i > 85 && (j.version = "1.0"), 
j.isMobile = null != navigator.appVersion.match(/Mobile/i), j.noContextMenu = j.isMobile;
},
Firefox:function(j) {
if (("0.0" === j.version || null == h.match(/Firefox/)) && "Gecko" === navigator.product) {
var m = h.match(/[\/ ]rv:(\d+\.\d.*?)[\) ]/);
if (m) j.version = m[1]; else {
var i = (navigator.buildID || navigator.productSub || "0").substr(0, 8);
i >= "20111220" ? j.version = "9.0" :i >= "20111120" ? j.version = "8.0" :i >= "20110927" ? j.version = "7.0" :i >= "20110816" ? j.version = "6.0" :i >= "20110621" ? j.version = "5.0" :i >= "20110320" ? j.version = "4.0" :i >= "20100121" ? j.version = "3.6" :i >= "20090630" ? j.version = "3.5" :i >= "20080617" ? j.version = "3.0" :i >= "20061024" && (j.version = "2.0");
}
}
j.isMobile = null != navigator.appVersion.match(/Android/i) || null != h.match(/ Fennec\//) || null != h.match(/Mobile/);
},
Opera:function(i) {
i.version = opera.version();
},
MSIE:function(j) {
j.isIE9 = !(!document.documentMode || !window.performance && !window.msPerformance), 
MathJax.HTML.setScriptBug = !j.isIE9 || document.documentMode < 9;
var w = !1;
try {
new ActiveXObject("MathPlayer.Factory.1"), j.hasMathPlayer = w = !0;
} catch (m) {}
try {
if (w && !r.params.NoMathPlayer) {
var i = document.createElement("object");
i.id = "mathplayer", i.classid = "clsid:32F66A20-7614-11D4-BD11-00104BD3F987", document.getElementsByTagName("head")[0].appendChild(i), 
document.namespaces.add("m", "http://www.w3.org/1998/Math/MathML"), j.mpNamespace = !0, 
!document.readyState || "loading" !== document.readyState && "interactive" !== document.readyState || (document.write('<?import namespace="m" implementation="#MathPlayer">'), 
j.mpImported = !0);
} else document.namespaces.add("mjx_IE_fix", "http://www.w3.org/1999/xlink");
} catch (m) {}
}
}), c.Browser.Select(MathJax.Message.browsers), g.AuthorConfig && "function" == typeof g.AuthorConfig.AuthorInit && g.AuthorConfig.AuthorInit(), 
c.queue = g.Callback.Queue(), c.queue.Push([ "Post", r.signal, "Begin" ], [ "Config", r ], [ "Cookie", r ], [ "Styles", r ], [ "Message", r ], function() {
var i = g.Callback.Queue(r.Jax(), r.Extensions());
return i.Push({});
}, [ "Menu", r ], r.onLoad(), function() {
MathJax.isReady = !0;
}, [ "Typeset", r ], [ "Hash", r ], [ "MenuZoom", r ], [ "Post", r.signal, "End" ]);
}("MathJax")));