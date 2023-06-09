CodeMirror.defineMode("smartymixed", function(config) {
var settings, regs, helpers, parsers, htmlMixedMode = CodeMirror.getMode(config, "htmlmixed"), smartyMode = CodeMirror.getMode(config, "smarty"), settings = {
rightDelimiter:"}",
leftDelimiter:"{"
};
return config.hasOwnProperty("leftDelimiter") && (settings.leftDelimiter = config.leftDelimiter), 
config.hasOwnProperty("rightDelimiter") && (settings.rightDelimiter = config.rightDelimiter), 
regs = {
smartyComment:new RegExp("^" + settings.leftDelimiter + "\\*"),
literalOpen:new RegExp(settings.leftDelimiter + "literal" + settings.rightDelimiter),
literalClose:new RegExp(settings.leftDelimiter + "/literal" + settings.rightDelimiter),
hasLeftDelimeter:new RegExp(".*" + settings.leftDelimiter),
htmlHasLeftDelimeter:new RegExp("[^<>]*" + settings.leftDelimiter)
}, helpers = {
chain:function(stream, state, parser) {
return state.tokenize = parser, parser(stream, state);
},
cleanChain:function(stream, state, parser) {
return state.tokenize = null, state.localState = null, state.localMode = null, "string" == typeof parser ? parser ? parser :null :parser(stream, state);
},
maybeBackup:function(stream, pat, style) {
var m, cur = stream.current(), close = cur.search(pat);
return close > -1 ? stream.backUp(cur.length - close) :(m = cur.match(/<\/?$/)) && (stream.backUp(cur.length), 
stream.match(pat, !1) || stream.match(cur[0])), style;
}
}, parsers = {
html:function(stream, state) {
return !state.inLiteral && stream.match(regs.htmlHasLeftDelimeter, !1) && null === state.htmlMixedState.htmlState.tagName ? (state.tokenize = parsers.smarty, 
state.localMode = smartyMode, state.localState = smartyMode.startState(htmlMixedMode.indent(state.htmlMixedState, "")), 
helpers.maybeBackup(stream, settings.leftDelimiter, smartyMode.token(stream, state.localState))) :!state.inLiteral && stream.match(settings.leftDelimiter, !1) ? (state.tokenize = parsers.smarty, 
state.localMode = smartyMode, state.localState = smartyMode.startState(htmlMixedMode.indent(state.htmlMixedState, "")), 
helpers.maybeBackup(stream, settings.leftDelimiter, smartyMode.token(stream, state.localState))) :htmlMixedMode.token(stream, state.htmlMixedState);
},
smarty:function(stream, state) {
if (stream.match(settings.leftDelimiter, !1)) {
if (stream.match(regs.smartyComment, !1)) return helpers.chain(stream, state, parsers.inBlock("comment", "*" + settings.rightDelimiter));
} else if (stream.match(settings.rightDelimiter, !1)) return stream.eat(settings.rightDelimiter), 
state.tokenize = parsers.html, state.localMode = htmlMixedMode, state.localState = state.htmlMixedState, 
"tag";
return helpers.maybeBackup(stream, settings.rightDelimiter, smartyMode.token(stream, state.localState));
},
inBlock:function(style, terminator) {
return function(stream, state) {
for (;!stream.eol(); ) {
if (stream.match(terminator)) {
helpers.cleanChain(stream, state, "");
break;
}
stream.next();
}
return style;
};
}
}, {
startState:function() {
var state = htmlMixedMode.startState();
return {
token:parsers.html,
localMode:null,
localState:null,
htmlMixedState:state,
tokenize:null,
inLiteral:!1
};
},
copyState:function(state) {
var local = null, tok = state.tokenize || state.token;
return state.localState && (local = CodeMirror.copyState(tok != parsers.html ? smartyMode :htmlMixedMode, state.localState)), 
{
token:state.token,
tokenize:state.tokenize,
localMode:state.localMode,
localState:local,
htmlMixedState:CodeMirror.copyState(htmlMixedMode, state.htmlMixedState),
inLiteral:state.inLiteral
};
},
token:function(stream, state) {
if (stream.match(settings.leftDelimiter, !1)) {
if (!state.inLiteral && stream.match(regs.literalOpen, !0)) return state.inLiteral = !0, 
"keyword";
if (state.inLiteral && stream.match(regs.literalClose, !0)) return state.inLiteral = !1, 
"keyword";
}
state.inLiteral && state.localState != state.htmlMixedState && (state.tokenize = parsers.html, 
state.localMode = htmlMixedMode, state.localState = state.htmlMixedState);
var style = (state.tokenize || state.token)(stream, state);
return style;
},
indent:function(state, textAfter) {
return state.localMode == smartyMode || state.inLiteral && !state.localMode || regs.hasLeftDelimeter.test(textAfter) ? CodeMirror.Pass :htmlMixedMode.indent(state.htmlMixedState, textAfter);
},
innerMode:function(state) {
return {
state:state.localState || state.htmlMixedState,
mode:state.localMode || htmlMixedMode
};
}
};
}, "htmlmixed"), CodeMirror.defineMIME("text/x-smarty", "smartymixed");