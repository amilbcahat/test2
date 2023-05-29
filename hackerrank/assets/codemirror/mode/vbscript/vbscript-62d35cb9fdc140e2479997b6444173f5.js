// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("vbscript", function(conf, parserConf) {
function wordRegexp(words) {
return new RegExp("^((" + words.join(")|(") + "))\\b", "i");
}
function indent(_stream, state) {
state.currentIndent++;
}
function dedent(_stream, state) {
state.currentIndent--;
}
function tokenBase(stream, state) {
if (stream.eatSpace()) return "space";
var ch = stream.peek();
if ("'" === ch) return stream.skipToEnd(), "comment";
if (stream.match(comment)) return stream.skipToEnd(), "comment";
if (stream.match(/^((&H)|(&O))?[0-9\.]/i, !1) && !stream.match(/^((&H)|(&O))?[0-9\.]+[a-z_]/i, !1)) {
var floatLiteral = !1;
if (stream.match(/^\d*\.\d+/i) ? floatLiteral = !0 :stream.match(/^\d+\.\d*/) ? floatLiteral = !0 :stream.match(/^\.\d+/) && (floatLiteral = !0), 
floatLiteral) return stream.eat(/J/i), "number";
var intLiteral = !1;
if (stream.match(/^&H[0-9a-f]+/i) ? intLiteral = !0 :stream.match(/^&O[0-7]+/i) ? intLiteral = !0 :stream.match(/^[1-9]\d*F?/) ? (stream.eat(/J/i), 
intLiteral = !0) :stream.match(/^0(?![\dx])/i) && (intLiteral = !0), intLiteral) return stream.eat(/L/i), 
"number";
}
return stream.match(stringPrefixes) ? (state.tokenize = tokenStringFactory(stream.current()), 
state.tokenize(stream, state)) :stream.match(doubleOperators) || stream.match(singleOperators) || stream.match(wordOperators) ? "operator" :stream.match(singleDelimiters) ? null :stream.match(brakets) ? "bracket" :stream.match(noIndentWords) ? (state.doInCurrentLine = !0, 
"keyword") :stream.match(doOpening) ? (indent(stream, state), state.doInCurrentLine = !0, 
"keyword") :stream.match(opening) ? (state.doInCurrentLine ? state.doInCurrentLine = !1 :indent(stream, state), 
"keyword") :stream.match(middle) ? "keyword" :stream.match(doubleClosing) ? (dedent(stream, state), 
dedent(stream, state), "keyword") :stream.match(closing) ? (state.doInCurrentLine ? state.doInCurrentLine = !1 :dedent(stream, state), 
"keyword") :stream.match(keywords) ? "keyword" :stream.match(atoms) ? "atom" :stream.match(known) ? "variable-2" :stream.match(builtinFuncs) ? "builtin" :stream.match(builtinObjs) ? "variable-2" :stream.match(identifiers) ? "variable" :(stream.next(), 
ERRORCLASS);
}
function tokenStringFactory(delimiter) {
var singleline = 1 == delimiter.length, OUTCLASS = "string";
return function(stream, state) {
for (;!stream.eol(); ) {
if (stream.eatWhile(/[^'"]/), stream.match(delimiter)) return state.tokenize = tokenBase, 
OUTCLASS;
stream.eat(/['"]/);
}
if (singleline) {
if (parserConf.singleLineStringErrors) return ERRORCLASS;
state.tokenize = tokenBase;
}
return OUTCLASS;
};
}
function tokenLexer(stream, state) {
var style = state.tokenize(stream, state), current = stream.current();
return "." === current ? (style = state.tokenize(stream, state), current = stream.current(), 
!style || "variable" !== style.substr(0, 8) && "builtin" !== style && "keyword" !== style ? ERRORCLASS :(("builtin" === style || "keyword" === style) && (style = "variable"), 
knownWords.indexOf(current.substr(1)) > -1 && (style = "variable-2"), style)) :style;
}
var ERRORCLASS = "error", singleOperators = new RegExp("^[\\+\\-\\*/&\\\\\\^<>=]"), doubleOperators = new RegExp("^((<>)|(<=)|(>=))"), singleDelimiters = new RegExp("^[\\.,]"), brakets = new RegExp("^[\\(\\)]"), identifiers = new RegExp("^[A-Za-z][_A-Za-z0-9]*"), openingKeywords = [ "class", "sub", "select", "while", "if", "function", "property", "with", "for" ], middleKeywords = [ "else", "elseif", "case" ], endKeywords = [ "next", "loop", "wend" ], wordOperators = wordRegexp([ "and", "or", "not", "xor", "is", "mod", "eqv", "imp" ]), commonkeywords = [ "dim", "redim", "then", "until", "randomize", "byval", "byref", "new", "property", "exit", "in", "const", "private", "public", "get", "set", "let", "stop", "on error resume next", "on error goto 0", "option explicit", "call", "me" ], atomWords = [ "true", "false", "nothing", "empty", "null" ], builtinFuncsWords = [ "abs", "array", "asc", "atn", "cbool", "cbyte", "ccur", "cdate", "cdbl", "chr", "cint", "clng", "cos", "csng", "cstr", "date", "dateadd", "datediff", "datepart", "dateserial", "datevalue", "day", "escape", "eval", "execute", "exp", "filter", "formatcurrency", "formatdatetime", "formatnumber", "formatpercent", "getlocale", "getobject", "getref", "hex", "hour", "inputbox", "instr", "instrrev", "int", "fix", "isarray", "isdate", "isempty", "isnull", "isnumeric", "isobject", "join", "lbound", "lcase", "left", "len", "loadpicture", "log", "ltrim", "rtrim", "trim", "maths", "mid", "minute", "month", "monthname", "msgbox", "now", "oct", "replace", "rgb", "right", "rnd", "round", "scriptengine", "scriptenginebuildversion", "scriptenginemajorversion", "scriptengineminorversion", "second", "setlocale", "sgn", "sin", "space", "split", "sqr", "strcomp", "string", "strreverse", "tan", "time", "timer", "timeserial", "timevalue", "typename", "ubound", "ucase", "unescape", "vartype", "weekday", "weekdayname", "year" ], builtinConsts = [ "vbBlack", "vbRed", "vbGreen", "vbYellow", "vbBlue", "vbMagenta", "vbCyan", "vbWhite", "vbBinaryCompare", "vbTextCompare", "vbSunday", "vbMonday", "vbTuesday", "vbWednesday", "vbThursday", "vbFriday", "vbSaturday", "vbUseSystemDayOfWeek", "vbFirstJan1", "vbFirstFourDays", "vbFirstFullWeek", "vbGeneralDate", "vbLongDate", "vbShortDate", "vbLongTime", "vbShortTime", "vbObjectError", "vbOKOnly", "vbOKCancel", "vbAbortRetryIgnore", "vbYesNoCancel", "vbYesNo", "vbRetryCancel", "vbCritical", "vbQuestion", "vbExclamation", "vbInformation", "vbDefaultButton1", "vbDefaultButton2", "vbDefaultButton3", "vbDefaultButton4", "vbApplicationModal", "vbSystemModal", "vbOK", "vbCancel", "vbAbort", "vbRetry", "vbIgnore", "vbYes", "vbNo", "vbCr", "VbCrLf", "vbFormFeed", "vbLf", "vbNewLine", "vbNullChar", "vbNullString", "vbTab", "vbVerticalTab", "vbUseDefault", "vbTrue", "vbFalse", "vbEmpty", "vbNull", "vbInteger", "vbLong", "vbSingle", "vbDouble", "vbCurrency", "vbDate", "vbString", "vbObject", "vbError", "vbBoolean", "vbVariant", "vbDataObject", "vbDecimal", "vbByte", "vbArray" ], builtinObjsWords = [ "WScript", "err", "debug", "RegExp" ], knownProperties = [ "description", "firstindex", "global", "helpcontext", "helpfile", "ignorecase", "length", "number", "pattern", "source", "value", "count" ], knownMethods = [ "clear", "execute", "raise", "replace", "test", "write", "writeline", "close", "open", "state", "eof", "update", "addnew", "end", "createobject", "quit" ], aspBuiltinObjsWords = [ "server", "response", "request", "session", "application" ], aspKnownProperties = [ "buffer", "cachecontrol", "charset", "contenttype", "expires", "expiresabsolute", "isclientconnected", "pics", "status", "clientcertificate", "cookies", "form", "querystring", "servervariables", "totalbytes", "contents", "staticobjects", "codepage", "lcid", "sessionid", "timeout", "scripttimeout" ], aspKnownMethods = [ "addheader", "appendtolog", "binarywrite", "end", "flush", "redirect", "binaryread", "remove", "removeall", "lock", "unlock", "abandon", "getlasterror", "htmlencode", "mappath", "transfer", "urlencode" ], knownWords = knownMethods.concat(knownProperties);
builtinObjsWords = builtinObjsWords.concat(builtinConsts), conf.isASP && (builtinObjsWords = builtinObjsWords.concat(aspBuiltinObjsWords), 
knownWords = knownWords.concat(aspKnownMethods, aspKnownProperties));
var keywords = wordRegexp(commonkeywords), atoms = wordRegexp(atomWords), builtinFuncs = wordRegexp(builtinFuncsWords), builtinObjs = wordRegexp(builtinObjsWords), known = wordRegexp(knownWords), stringPrefixes = '"', opening = wordRegexp(openingKeywords), middle = wordRegexp(middleKeywords), closing = wordRegexp(endKeywords), doubleClosing = wordRegexp([ "end" ]), doOpening = wordRegexp([ "do" ]), noIndentWords = wordRegexp([ "on error resume next", "exit" ]), comment = wordRegexp([ "rem" ]), external = {
electricChars:"dDpPtTfFeE ",
startState:function() {
return {
tokenize:tokenBase,
lastToken:null,
currentIndent:0,
nextLineIndent:0,
doInCurrentLine:!1,
ignoreKeyword:!1
};
},
token:function(stream, state) {
stream.sol() && (state.currentIndent += state.nextLineIndent, state.nextLineIndent = 0, 
state.doInCurrentLine = 0);
var style = tokenLexer(stream, state);
return state.lastToken = {
style:style,
content:stream.current()
}, "space" === style && (style = null), style;
},
indent:function(state, textAfter) {
var trueText = textAfter.replace(/^\s+|\s+$/g, "");
return trueText.match(closing) || trueText.match(doubleClosing) || trueText.match(middle) ? conf.indentUnit * (state.currentIndent - 1) :state.currentIndent < 0 ? 0 :state.currentIndent * conf.indentUnit;
}
};
return external;
}), CodeMirror.defineMIME("text/vbscript", "vbscript");
});