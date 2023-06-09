var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror"), require("../htmlmixed/htmlmixed")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror", "../htmlmixed/htmlmixed" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("htmlembedded", function(config, parserConfig) {
function htmlDispatch(stream, state) {
return stream.match(scriptStartRegex, !1) ? (state.token = scriptingDispatch, scriptingMode.token(stream, state.scriptState)) :htmlMixedMode.token(stream, state.htmlState);
}
function scriptingDispatch(stream, state) {
return stream.match(scriptEndRegex, !1) ? (state.token = htmlDispatch, htmlMixedMode.token(stream, state.htmlState)) :scriptingMode.token(stream, state.scriptState);
}
var scriptingMode, htmlMixedMode, scriptStartRegex = parserConfig.scriptStartRegex || /^<%/i, scriptEndRegex = parserConfig.scriptEndRegex || /^%>/i;
return {
startState:function() {
return scriptingMode = scriptingMode || CodeMirror.getMode(config, parserConfig.scriptingModeSpec), 
htmlMixedMode = htmlMixedMode || CodeMirror.getMode(config, "htmlmixed"), {
token:parserConfig.startOpen ? scriptingDispatch :htmlDispatch,
htmlState:CodeMirror.startState(htmlMixedMode),
scriptState:CodeMirror.startState(scriptingMode)
};
},
token:function(stream, state) {
return state.token(stream, state);
},
indent:function(state, textAfter) {
return state.token == htmlDispatch ? htmlMixedMode.indent(state.htmlState, textAfter) :scriptingMode.indent ? scriptingMode.indent(state.scriptState, textAfter) :void 0;
},
copyState:function(state) {
return {
token:state.token,
htmlState:CodeMirror.copyState(htmlMixedMode, state.htmlState),
scriptState:CodeMirror.copyState(scriptingMode, state.scriptState)
};
},
innerMode:function(state) {
return state.token == scriptingDispatch ? {
state:state.scriptState,
mode:scriptingMode
} :{
state:state.htmlState,
mode:htmlMixedMode
};
}
};
}, "htmlmixed"), CodeMirror.defineMIME("application/x-ejs", {
name:"htmlembedded",
scriptingModeSpec:"javascript"
}), CodeMirror.defineMIME("application/x-aspx", {
name:"htmlembedded",
scriptingModeSpec:"text/x-csharp"
}), CodeMirror.defineMIME("application/x-jsp", {
name:"htmlembedded",
scriptingModeSpec:"text/x-java"
}), CodeMirror.defineMIME("application/x-erb", {
name:"htmlembedded",
scriptingModeSpec:"ruby"
});
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 