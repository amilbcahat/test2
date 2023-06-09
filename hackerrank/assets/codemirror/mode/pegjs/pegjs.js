var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror"), require("../javascript/javascript")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror", "../javascript/javascript" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("pegjs", function(config) {
function identifier(stream) {
return stream.match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
}
var jsMode = CodeMirror.getMode(config, "javascript");
return {
startState:function() {
return {
inString:!1,
stringType:null,
inComment:!1,
inChracterClass:!1,
braced:0,
lhs:!0,
localState:null
};
},
token:function(stream, state) {
if (stream && (state.inString || state.inComment || '"' != stream.peek() && "'" != stream.peek() || (state.stringType = stream.peek(), 
stream.next(), state.inString = !0)), state.inString || state.inComment || !stream.match(/^\/\*/) || (state.inComment = !0), 
state.inString) {
for (;state.inString && !stream.eol(); ) stream.peek() === state.stringType ? (stream.next(), 
state.inString = !1) :"\\" === stream.peek() ? (stream.next(), stream.next()) :stream.match(/^.[^\\\"\']*/);
return state.lhs ? "property string" :"string";
}
if (state.inComment) {
for (;state.inComment && !stream.eol(); ) stream.match(/\*\//) ? state.inComment = !1 :stream.match(/^.[^\*]*/);
return "comment";
}
if (state.inChracterClass) for (;state.inChracterClass && !stream.eol(); ) stream.match(/^[^\]\\]+/) || stream.match(/^\\./) || (state.inChracterClass = !1); else {
if ("[" === stream.peek()) return stream.next(), state.inChracterClass = !0, "bracket";
if (stream.match(/^\/\//)) return stream.skipToEnd(), "comment";
if (state.braced || "{" === stream.peek()) {
null === state.localState && (state.localState = jsMode.startState());
var token = jsMode.token(stream, state.localState), text = stream.current();
if (!token) for (var i = 0; i < text.length; i++) "{" === text[i] ? state.braced++ :"}" === text[i] && state.braced--;
return token;
}
if (identifier(stream)) return ":" === stream.peek() ? "variable" :"variable-2";
if (-1 != [ "[", "]", "(", ")" ].indexOf(stream.peek())) return stream.next(), "bracket";
stream.eatSpace() || stream.next();
}
return null;
}
};
}, "javascript");
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 