// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
function splitCallback(cont, n) {
var countDown = n;
return function() {
0 == --countDown && cont();
};
}
function ensureDeps(mode, cont) {
var deps = CodeMirror.modes[mode].dependencies;
if (!deps) return cont();
for (var missing = [], i = 0; i < deps.length; ++i) CodeMirror.modes.hasOwnProperty(deps[i]) || missing.push(deps[i]);
if (!missing.length) return cont();
for (var split = splitCallback(cont, missing.length), i = 0; i < missing.length; ++i) CodeMirror.requireMode(missing[i], split);
}
CodeMirror.modeURL || (CodeMirror.modeURL = "../mode/%N/%N.js");
var loading = {};
CodeMirror.requireMode = function(mode, cont) {
if ("string" != typeof mode && (mode = mode.name), CodeMirror.modes.hasOwnProperty(mode)) return ensureDeps(mode, cont);
if (loading.hasOwnProperty(mode)) return loading[mode].push(cont);
var script = document.createElement("script");
script.src = CodeMirror.modeURL.replace(/%N/g, mode);
var others = document.getElementsByTagName("script")[0];
others.parentNode.insertBefore(script, others);
var list = loading[mode] = [ cont ], count = 0, poll = setInterval(function() {
return ++count > 100 ? clearInterval(poll) :(CodeMirror.modes.hasOwnProperty(mode) && (clearInterval(poll), 
loading[mode] = null, ensureDeps(mode, function() {
for (var i = 0; i < list.length; ++i) list[i]();
})), void 0);
}, 200);
}, CodeMirror.autoLoadMode = function(instance, mode) {
CodeMirror.modes.hasOwnProperty(mode) || CodeMirror.requireMode(mode, function() {
instance.setOption("mode", instance.getOption("mode"));
});
};
});