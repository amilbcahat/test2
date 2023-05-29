var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("lua", function(config, parserConfig) {
function prefixRE(words) {
return new RegExp("^(?:" + words.join("|") + ")", "i");
}
function wordRE(words) {
return new RegExp("^(?:" + words.join("|") + ")$", "i");
}
function readBracket(stream) {
for (var level = 0; stream.eat("="); ) ++level;
return stream.eat("["), level;
}
function normal(stream, state) {
var ch = stream.next();
return "-" == ch && stream.eat("-") ? stream.eat("[") && stream.eat("[") ? (state.cur = bracketed(readBracket(stream), "comment"))(stream, state) :(stream.skipToEnd(), 
"comment") :'"' == ch || "'" == ch ? (state.cur = string(ch))(stream, state) :"[" == ch && /[\[=]/.test(stream.peek()) ? (state.cur = bracketed(readBracket(stream), "string"))(stream, state) :/\d/.test(ch) ? (stream.eatWhile(/[\w.%]/), 
"number") :/[\w_]/.test(ch) ? (stream.eatWhile(/[\w\\\-_.]/), "variable") :null;
}
function bracketed(level, style) {
return function(stream, state) {
for (var ch, curlev = null; null != (ch = stream.next()); ) if (null == curlev) "]" == ch && (curlev = 0); else if ("=" == ch) ++curlev; else {
if ("]" == ch && curlev == level) {
state.cur = normal;
break;
}
curlev = null;
}
return style;
};
}
function string(quote) {
return function(stream, state) {
for (var ch, escaped = !1; null != (ch = stream.next()) && (ch != quote || escaped); ) escaped = !escaped && "\\" == ch;
return escaped || (state.cur = normal), "string";
};
}
var indentUnit = config.indentUnit, specials = wordRE(parserConfig.specials || []), builtins = wordRE([ "_G", "_VERSION", "assert", "collectgarbage", "dofile", "error", "getfenv", "getmetatable", "ipairs", "load", "loadfile", "loadstring", "module", "next", "pairs", "pcall", "print", "rawequal", "rawget", "rawset", "require", "select", "setfenv", "setmetatable", "tonumber", "tostring", "type", "unpack", "xpcall", "coroutine.create", "coroutine.resume", "coroutine.running", "coroutine.status", "coroutine.wrap", "coroutine.yield", "debug.debug", "debug.getfenv", "debug.gethook", "debug.getinfo", "debug.getlocal", "debug.getmetatable", "debug.getregistry", "debug.getupvalue", "debug.setfenv", "debug.sethook", "debug.setlocal", "debug.setmetatable", "debug.setupvalue", "debug.traceback", "close", "flush", "lines", "read", "seek", "setvbuf", "write", "io.close", "io.flush", "io.input", "io.lines", "io.open", "io.output", "io.popen", "io.read", "io.stderr", "io.stdin", "io.stdout", "io.tmpfile", "io.type", "io.write", "math.abs", "math.acos", "math.asin", "math.atan", "math.atan2", "math.ceil", "math.cos", "math.cosh", "math.deg", "math.exp", "math.floor", "math.fmod", "math.frexp", "math.huge", "math.ldexp", "math.log", "math.log10", "math.max", "math.min", "math.modf", "math.pi", "math.pow", "math.rad", "math.random", "math.randomseed", "math.sin", "math.sinh", "math.sqrt", "math.tan", "math.tanh", "os.clock", "os.date", "os.difftime", "os.execute", "os.exit", "os.getenv", "os.remove", "os.rename", "os.setlocale", "os.time", "os.tmpname", "package.cpath", "package.loaded", "package.loaders", "package.loadlib", "package.path", "package.preload", "package.seeall", "string.byte", "string.char", "string.dump", "string.find", "string.format", "string.gmatch", "string.gsub", "string.len", "string.lower", "string.match", "string.rep", "string.reverse", "string.sub", "string.upper", "table.concat", "table.insert", "table.maxn", "table.remove", "table.sort" ]), keywords = wordRE([ "and", "break", "elseif", "false", "nil", "not", "or", "return", "true", "function", "end", "if", "then", "else", "do", "while", "repeat", "until", "for", "in", "local" ]), indentTokens = wordRE([ "function", "if", "repeat", "do", "\\(", "{" ]), dedentTokens = wordRE([ "end", "until", "\\)", "}" ]), dedentPartial = prefixRE([ "end", "until", "\\)", "}", "else", "elseif" ]);
return {
startState:function(basecol) {
return {
basecol:basecol || 0,
indentDepth:0,
cur:normal
};
},
token:function(stream, state) {
if (stream.eatSpace()) return null;
var style = state.cur(stream, state), word = stream.current();
return "variable" == style && (keywords.test(word) ? style = "keyword" :builtins.test(word) ? style = "builtin" :specials.test(word) && (style = "variable-2")), 
"comment" != style && "string" != style && (indentTokens.test(word) ? ++state.indentDepth :dedentTokens.test(word) && --state.indentDepth), 
style;
},
indent:function(state, textAfter) {
var closing = dedentPartial.test(textAfter);
return state.basecol + indentUnit * (state.indentDepth - (closing ? 1 :0));
},
lineComment:"--",
blockCommentStart:"--[[",
blockCommentEnd:"]]"
};
}), CodeMirror.defineMIME("text/x-lua", "lua");
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 