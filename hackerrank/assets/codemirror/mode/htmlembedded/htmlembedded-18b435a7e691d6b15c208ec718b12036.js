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