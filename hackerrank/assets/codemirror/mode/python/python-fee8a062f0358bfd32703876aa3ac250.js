CodeMirror.defineMode("python", function(conf, parserConf) {
function wordRegexp(words) {
return new RegExp("^((" + words.join(")|(") + "))\\b");
}
function tokenBase(stream, state) {
if (stream.sol()) {
var scopeOffset = state.scopes[0].offset;
if (stream.eatSpace()) {
var lineOffset = stream.indentation();
return lineOffset > scopeOffset ? indentInfo = "indent" :scopeOffset > lineOffset && (indentInfo = "dedent"), 
null;
}
scopeOffset > 0 && dedent(stream, state);
}
if (stream.eatSpace()) return null;
var ch = stream.peek();
if ("#" === ch) return stream.skipToEnd(), "comment";
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
function indent(stream, state, type) {
type = type || "py";
var indentUnit = 0;
if ("py" === type) {
if ("py" !== state.scopes[0].type) return state.scopes[0].offset = stream.indentation(), 
void 0;
for (var i = 0; i < state.scopes.length; ++i) if ("py" === state.scopes[i].type) {
indentUnit = state.scopes[i].offset + conf.indentUnit;
break;
}
} else indentUnit = stream.match(/\s*($|#)/, !1) ? stream.indentation() + hangingIndent :stream.column() + stream.current().length;
state.scopes.unshift({
offset:indentUnit,
type:type
});
}
function dedent(stream, state, type) {
if (type = type || "py", 1 != state.scopes.length) {
if ("py" === state.scopes[0].type) {
for (var _indent = stream.indentation(), _indent_index = -1, i = 0; i < state.scopes.length; ++i) if (_indent === state.scopes[i].offset) {
_indent_index = i;
break;
}
if (-1 === _indent_index) return !0;
for (;state.scopes[0].offset !== _indent; ) state.scopes.shift();
return !1;
}
return "py" === type ? (state.scopes[0].offset = stream.indentation(), !1) :state.scopes[0].type != type ? !0 :(state.scopes.shift(), 
!1);
}
}
function tokenLexer(stream, state) {
indentInfo = null;
var style = state.tokenize(stream, state), current = stream.current();
if ("." === current) return style = stream.match(identifiers, !1) ? null :ERRORCLASS, 
null === style && "meta" === state.lastStyle && (style = "meta"), style;
if ("@" === current) return stream.match(identifiers, !1) ? "meta" :ERRORCLASS;
"variable" !== style && "builtin" !== style || "meta" !== state.lastStyle || (style = "meta"), 
("pass" === current || "return" === current) && (state.dedent += 1), "lambda" === current && (state.lambda = !0), 
(":" === current && !state.lambda && "py" == state.scopes[0].type || "indent" === indentInfo) && indent(stream, state);
var delimiter_index = "[({".indexOf(current);
return -1 !== delimiter_index && indent(stream, state, "])}".slice(delimiter_index, delimiter_index + 1)), 
"dedent" === indentInfo && dedent(stream, state) ? ERRORCLASS :(delimiter_index = "])}".indexOf(current), 
-1 !== delimiter_index && dedent(stream, state, current) ? ERRORCLASS :(state.dedent > 0 && stream.eol() && "py" == state.scopes[0].type && (state.scopes.length > 1 && state.scopes.shift(), 
state.dedent -= 1), style));
}
var ERRORCLASS = "error", singleOperators = parserConf.singleOperators || new RegExp("^[\\+\\-\\*/%&|\\^~<>!]"), singleDelimiters = parserConf.singleDelimiters || new RegExp("^[\\(\\)\\[\\]\\{\\}@,:`=;\\.]"), doubleOperators = parserConf.doubleOperators || new RegExp("^((==)|(!=)|(<=)|(>=)|(<>)|(<<)|(>>)|(//)|(\\*\\*))"), doubleDelimiters = parserConf.doubleDelimiters || new RegExp("^((\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))"), tripleDelimiters = parserConf.tripleDelimiters || new RegExp("^((//=)|(>>=)|(<<=)|(\\*\\*=))"), identifiers = parserConf.identifiers || new RegExp("^[_A-Za-z][_A-Za-z0-9]*"), hangingIndent = parserConf.hangingIndent || parserConf.indentUnit, wordOperators = wordRegexp([ "and", "or", "not", "is", "in" ]), commonkeywords = [ "as", "assert", "break", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "lambda", "pass", "raise", "return", "try", "while", "with", "yield" ], commonBuiltins = [ "abs", "all", "any", "bin", "bool", "bytearray", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip", "__import__", "NotImplemented", "Ellipsis", "__debug__" ], py2 = {
builtins:[ "apply", "basestring", "buffer", "cmp", "coerce", "execfile", "file", "intern", "long", "raw_input", "reduce", "reload", "unichr", "unicode", "xrange", "False", "True", "None" ],
keywords:[ "exec", "print" ]
}, py3 = {
builtins:[ "ascii", "bytes", "exec", "print" ],
keywords:[ "nonlocal", "False", "True", "None" ]
};
if (void 0 != parserConf.extra_keywords && (commonkeywords = commonkeywords.concat(parserConf.extra_keywords)), 
void 0 != parserConf.extra_builtins && (commonBuiltins = commonBuiltins.concat(parserConf.extra_builtins)), 
parserConf.version && 3 === parseInt(parserConf.version, 10)) {
commonkeywords = commonkeywords.concat(py3.keywords), commonBuiltins = commonBuiltins.concat(py3.builtins);
var stringPrefixes = new RegExp("^(([rb]|(br))?('{3}|\"{3}|['\"]))", "i");
} else {
commonkeywords = commonkeywords.concat(py2.keywords), commonBuiltins = commonBuiltins.concat(py2.builtins);
var stringPrefixes = new RegExp("^(([rub]|(ur)|(br))?('{3}|\"{3}|['\"]))", "i");
}
var keywords = wordRegexp(commonkeywords), builtins = wordRegexp(commonBuiltins), indentInfo = null, external = {
startState:function(basecolumn) {
return {
tokenize:tokenBase,
scopes:[ {
offset:basecolumn || 0,
type:"py"
} ],
lastStyle:null,
lastToken:null,
lambda:!1,
dedent:0
};
},
token:function(stream, state) {
var style = tokenLexer(stream, state);
state.lastStyle = style;
var current = stream.current();
return current && style && (state.lastToken = current), stream.eol() && state.lambda && (state.lambda = !1), 
style;
},
indent:function(state) {
return state.tokenize != tokenBase ? state.tokenize.isString ? CodeMirror.Pass :0 :state.scopes[0].offset;
},
lineComment:"#",
fold:"indent"
};
return external;
}), CodeMirror.defineMIME("text/x-python", "python"), function() {
"use strict";
var words = function(str) {
return str.split(" ");
};
CodeMirror.defineMIME("text/x-cython", {
name:"python",
extra_keywords:words("by cdef cimport cpdef ctypedef enum exceptextern gil include nogil property publicreadonly struct union DEF IF ELIF ELSE")
});
}();