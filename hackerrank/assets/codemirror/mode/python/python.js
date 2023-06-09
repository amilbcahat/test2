var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function wordRegexp(words) {
return new RegExp("^((" + words.join(")|(") + "))\\b");
}
function top(state) {
return state.scopes[state.scopes.length - 1];
}
var wordOperators = wordRegexp([ "and", "or", "not", "is", "in" ]), commonKeywords = [ "as", "assert", "break", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "lambda", "pass", "raise", "return", "try", "while", "with", "yield" ], commonBuiltins = [ "abs", "all", "any", "bin", "bool", "bytearray", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip", "__import__", "NotImplemented", "Ellipsis", "__debug__" ], py2 = {
builtins:[ "apply", "basestring", "buffer", "cmp", "coerce", "execfile", "file", "intern", "long", "raw_input", "reduce", "reload", "unichr", "unicode", "xrange", "False", "True", "None" ],
keywords:[ "exec", "print" ]
}, py3 = {
builtins:[ "ascii", "bytes", "exec", "print" ],
keywords:[ "nonlocal", "False", "True", "None" ]
};
CodeMirror.registerHelper("hintWords", "python", commonKeywords.concat(commonBuiltins)), 
CodeMirror.defineMode("python", function(conf, parserConf) {
function tokenBase(stream, state) {
if (stream.sol() && "py" == top(state).type) {
var scopeOffset = top(state).offset;
if (stream.eatSpace()) {
var lineOffset = stream.indentation();
return lineOffset > scopeOffset ? pushScope(stream, state, "py") :scopeOffset > lineOffset && dedent(stream, state) && (state.errorToken = !0), 
null;
}
var style = tokenBaseInner(stream, state);
return scopeOffset > 0 && dedent(stream, state) && (style += " " + ERRORCLASS), 
style;
}
return tokenBaseInner(stream, state);
}
function tokenBaseInner(stream, state) {
if (stream.eatSpace()) return null;
var ch = stream.peek();
if ("#" == ch) return stream.skipToEnd(), "comment";
if (stream.match(/^[0-9\.]/, !1)) {
var floatLiteral = !1;
if (stream.match(/^\d*\.\d+(e[\+\-]?\d+)?/i) && (floatLiteral = !0), stream.match(/^\d+\.\d*/) && (floatLiteral = !0), 
stream.match(/^\.\d+/) && (floatLiteral = !0), floatLiteral) return stream.eat(/J/i), 
"number";
var intLiteral = !1;
if (stream.match(/^0x[0-9a-f]+/i) && (intLiteral = !0), stream.match(/^0b[01]+/i) && (intLiteral = !0), 
stream.match(/^0o[0-7]+/i) && (intLiteral = !0), stream.match(/^[1-9]\d*(e[\+\-]?\d+)?/) && (stream.eat(/J/i), 
intLiteral = !0), stream.match(/^0(?![\dx])/i) && (intLiteral = !0), intLiteral) return stream.eat(/L/i), 
"number";
}
return stream.match(stringPrefixes) ? (state.tokenize = tokenStringFactory(stream.current()), 
state.tokenize(stream, state)) :stream.match(tripleDelimiters) || stream.match(doubleDelimiters) ? null :stream.match(doubleOperators) || stream.match(singleOperators) || stream.match(wordOperators) ? "operator" :stream.match(singleDelimiters) ? null :stream.match(keywords) ? "keyword" :stream.match(builtins) ? "builtin" :stream.match(/^(self|cls)\b/) ? "variable-2" :stream.match(identifiers) ? "def" == state.lastToken || "class" == state.lastToken ? "def" :"variable" :(stream.next(), 
ERRORCLASS);
}
function tokenStringFactory(delimiter) {
function tokenString(stream, state) {
for (;!stream.eol(); ) if (stream.eatWhile(/[^'"\\]/), stream.eat("\\")) {
if (stream.next(), singleline && stream.eol()) return OUTCLASS;
} else {
if (stream.match(delimiter)) return state.tokenize = tokenBase, OUTCLASS;
stream.eat(/['"]/);
}
if (singleline) {
if (parserConf.singleLineStringErrors) return ERRORCLASS;
state.tokenize = tokenBase;
}
return OUTCLASS;
}
for (;"rub".indexOf(delimiter.charAt(0).toLowerCase()) >= 0; ) delimiter = delimiter.substr(1);
var singleline = 1 == delimiter.length, OUTCLASS = "string";
return tokenString.isString = !0, tokenString;
}
function pushScope(stream, state, type) {
var offset = 0, align = null;
if ("py" == type) for (;"py" != top(state).type; ) state.scopes.pop();
offset = top(state).offset + ("py" == type ? conf.indentUnit :hangingIndent), "py" == type || stream.match(/^(\s|#.*)*$/, !1) || (align = stream.column() + 1), 
state.scopes.push({
offset:offset,
type:type,
align:align
});
}
function dedent(stream, state) {
for (var indented = stream.indentation(); top(state).offset > indented; ) {
if ("py" != top(state).type) return !0;
state.scopes.pop();
}
return top(state).offset != indented;
}
function tokenLexer(stream, state) {
var style = state.tokenize(stream, state), current = stream.current();
if ("." == current) return style = stream.match(identifiers, !1) ? null :ERRORCLASS, 
null == style && "meta" == state.lastStyle && (style = "meta"), style;
if ("@" == current) return stream.match(identifiers, !1) ? "meta" :ERRORCLASS;
"variable" != style && "builtin" != style || "meta" != state.lastStyle || (style = "meta"), 
("pass" == current || "return" == current) && (state.dedent += 1), "lambda" == current && (state.lambda = !0), 
":" != current || state.lambda || "py" != top(state).type || pushScope(stream, state, "py");
var delimiter_index = 1 == current.length ? "[({".indexOf(current) :-1;
if (-1 != delimiter_index && pushScope(stream, state, "])}".slice(delimiter_index, delimiter_index + 1)), 
delimiter_index = "])}".indexOf(current), -1 != delimiter_index) {
if (top(state).type != current) return ERRORCLASS;
state.scopes.pop();
}
return state.dedent > 0 && stream.eol() && "py" == top(state).type && (state.scopes.length > 1 && state.scopes.pop(), 
state.dedent -= 1), style;
}
var ERRORCLASS = "error", singleOperators = parserConf.singleOperators || new RegExp("^[\\+\\-\\*/%&|\\^~<>!]"), singleDelimiters = parserConf.singleDelimiters || new RegExp("^[\\(\\)\\[\\]\\{\\}@,:`=;\\.]"), doubleOperators = parserConf.doubleOperators || new RegExp("^((==)|(!=)|(<=)|(>=)|(<>)|(<<)|(>>)|(//)|(\\*\\*))"), doubleDelimiters = parserConf.doubleDelimiters || new RegExp("^((\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))"), tripleDelimiters = parserConf.tripleDelimiters || new RegExp("^((//=)|(>>=)|(<<=)|(\\*\\*=))"), identifiers = parserConf.identifiers || new RegExp("^[_A-Za-z][_A-Za-z0-9]*"), hangingIndent = parserConf.hangingIndent || conf.indentUnit, myKeywords = commonKeywords, myBuiltins = commonBuiltins;
if (void 0 != parserConf.extra_keywords && (myKeywords = myKeywords.concat(parserConf.extra_keywords)), 
void 0 != parserConf.extra_builtins && (myBuiltins = myBuiltins.concat(parserConf.extra_builtins)), 
parserConf.version && 3 == parseInt(parserConf.version, 10)) {
myKeywords = myKeywords.concat(py3.keywords), myBuiltins = myBuiltins.concat(py3.builtins);
var stringPrefixes = new RegExp("^(([rb]|(br))?('{3}|\"{3}|['\"]))", "i");
} else {
myKeywords = myKeywords.concat(py2.keywords), myBuiltins = myBuiltins.concat(py2.builtins);
var stringPrefixes = new RegExp("^(([rub]|(ur)|(br))?('{3}|\"{3}|['\"]))", "i");
}
var keywords = wordRegexp(myKeywords), builtins = wordRegexp(myBuiltins), external = {
startState:function(basecolumn) {
return {
tokenize:tokenBase,
scopes:[ {
offset:basecolumn || 0,
type:"py",
align:null
} ],
lastStyle:null,
lastToken:null,
lambda:!1,
dedent:0
};
},
token:function(stream, state) {
var addErr = state.errorToken;
addErr && (state.errorToken = !1);
var style = tokenLexer(stream, state);
state.lastStyle = style;
var current = stream.current();
return current && style && (state.lastToken = current), stream.eol() && state.lambda && (state.lambda = !1), 
addErr ? style + " " + ERRORCLASS :style;
},
indent:function(state, textAfter) {
if (state.tokenize != tokenBase) return state.tokenize.isString ? CodeMirror.Pass :0;
var scope = top(state), closing = textAfter && textAfter.charAt(0) == scope.type;
return null != scope.align ? scope.align - (closing ? 1 :0) :closing && state.scopes.length > 1 ? state.scopes[state.scopes.length - 2].offset :scope.offset;
},
lineComment:"#",
fold:"indent"
};
return external;
}), CodeMirror.defineMIME("text/x-python", "python");
var words = function(str) {
return str.split(" ");
};
CodeMirror.defineMIME("text/x-cython", {
name:"python",
extra_keywords:words("by cdef cimport cpdef ctypedef enum exceptextern gil include nogil property publicreadonly struct union DEF IF ELIF ELSE")
});
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 