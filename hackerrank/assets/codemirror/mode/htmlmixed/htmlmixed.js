var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror"), require("../xml/xml"), require("../javascript/javascript"), require("../css/css")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror", "../xml/xml", "../javascript/javascript", "../css/css" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("htmlmixed", function(config, parserConfig) {
function html(stream, state) {
var tagName = state.htmlState.tagName, style = htmlMode.token(stream, state.htmlState);
if ("script" == tagName && /\btag\b/.test(style) && ">" == stream.current()) {
var scriptType = stream.string.slice(Math.max(0, stream.pos - 100), stream.pos).match(/\btype\s*=\s*("[^"]+"|'[^']+'|\S+)[^<]*$/i);
scriptType = scriptType ? scriptType[1] :"", scriptType && /[\"\']/.test(scriptType.charAt(0)) && (scriptType = scriptType.slice(1, scriptType.length - 1));
for (var i = 0; i < scriptTypes.length; ++i) {
var tp = scriptTypes[i];
if ("string" == typeof tp.matches ? scriptType == tp.matches :tp.matches.test(scriptType)) {
tp.mode && (state.token = script, state.localMode = tp.mode, state.localState = tp.mode.startState && tp.mode.startState(htmlMode.indent(state.htmlState, "")));
break;
}
}
} else "style" == tagName && /\btag\b/.test(style) && ">" == stream.current() && (state.token = css, 
state.localMode = cssMode, state.localState = cssMode.startState(htmlMode.indent(state.htmlState, "")));
return style;
}
function maybeBackup(stream, pat, style) {
var m, cur = stream.current(), close = cur.search(pat);
return close > -1 ? stream.backUp(cur.length - close) :(m = cur.match(/<\/?$/)) && (stream.backUp(cur.length), 
stream.match(pat, !1) || stream.match(cur)), style;
}
function script(stream, state) {
return stream.match(/^<\/\s*script\s*>/i, !1) ? (state.token = html, state.localState = state.localMode = null, 
html(stream, state)) :maybeBackup(stream, /<\/\s*script\s*>/, state.localMode.token(stream, state.localState));
}
function css(stream, state) {
return stream.match(/^<\/\s*style\s*>/i, !1) ? (state.token = html, state.localState = state.localMode = null, 
html(stream, state)) :maybeBackup(stream, /<\/\s*style\s*>/, cssMode.token(stream, state.localState));
}
var htmlMode = CodeMirror.getMode(config, {
name:"xml",
htmlMode:!0,
multilineTagIndentFactor:parserConfig.multilineTagIndentFactor,
multilineTagIndentPastTag:parserConfig.multilineTagIndentPastTag
}), cssMode = CodeMirror.getMode(config, "css"), scriptTypes = [], scriptTypesConf = parserConfig && parserConfig.scriptTypes;
if (scriptTypes.push({
matches:/^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^$/i,
mode:CodeMirror.getMode(config, "javascript")
}), scriptTypesConf) for (var i = 0; i < scriptTypesConf.length; ++i) {
var conf = scriptTypesConf[i];
scriptTypes.push({
matches:conf.matches,
mode:conf.mode && CodeMirror.getMode(config, conf.mode)
});
}
return scriptTypes.push({
matches:/./,
mode:CodeMirror.getMode(config, "text/plain")
}), {
startState:function() {
var state = htmlMode.startState();
return {
token:html,
localMode:null,
localState:null,
htmlState:state
};
},
copyState:function(state) {
if (state.localState) var local = CodeMirror.copyState(state.localMode, state.localState);
return {
token:state.token,
localMode:state.localMode,
localState:local,
htmlState:CodeMirror.copyState(htmlMode, state.htmlState)
};
},
token:function(stream, state) {
return state.token(stream, state);
},
indent:function(state, textAfter) {
return !state.localMode || /^\s*<\//.test(textAfter) ? htmlMode.indent(state.htmlState, textAfter) :state.localMode.indent ? state.localMode.indent(state.localState, textAfter) :CodeMirror.Pass;
},
innerMode:function(state) {
return {
state:state.localState || state.htmlState,
mode:state.localMode || htmlMode
};
}
};
}, "xml", "javascript", "css"), CodeMirror.defineMIME("text/html", "htmlmixed");
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 