// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function forEach(arr, f) {
for (var i = 0, e = arr.length; e > i; ++i) f(arr[i]);
}
function arrayContains(arr, item) {
if (!Array.prototype.indexOf) {
for (var i = arr.length; i--; ) if (arr[i] === item) return !0;
return !1;
}
return -1 != arr.indexOf(item);
}
function scriptHint(editor, _keywords, getToken) {
var cur = editor.getCursor(), token = getToken(editor, cur), tprop = token;
if (/^[\w$_]*$/.test(token.string) || (token = tprop = {
start:cur.ch,
end:cur.ch,
string:"",
state:token.state,
className:":" == token.string ? "python-type" :null
}), !context) var context = [];
context.push(tprop);
var completionList = getCompletions(token, context);
return completionList = completionList.sort(), {
list:completionList,
from:CodeMirror.Pos(cur.line, token.start),
to:CodeMirror.Pos(cur.line, token.end)
};
}
function pythonHint(editor) {
return scriptHint(editor, pythonKeywordsU, function(e, cur) {
return e.getTokenAt(cur);
});
}
function getCompletions(token, context) {
function maybeAdd(str) {
0 != str.lastIndexOf(start, 0) || arrayContains(found, str) || found.push(str);
}
function gatherCompletions() {
forEach(pythonBuiltinsL, maybeAdd), forEach(pythonBuiltinsU, maybeAdd), forEach(pythonKeywordsL, maybeAdd), 
forEach(pythonKeywordsU, maybeAdd);
}
var found = [], start = token.string;
if (context) {
var base, obj = context.pop();
for ("variable" == obj.type ? base = obj.string :"variable-3" == obj.type && (base = ":" + obj.string); null != base && context.length; ) base = base[context.pop().string];
null != base && gatherCompletions(base);
}
return found;
}
CodeMirror.registerHelper("hint", "python", pythonHint);
var pythonKeywords = "and del from not while as elif global or with assert else if pass yieldbreak except import print class exec in raise continue finally is return def for lambda try", pythonKeywordsL = pythonKeywords.split(" "), pythonKeywordsU = pythonKeywords.toUpperCase().split(" "), pythonBuiltins = "abs divmod input open staticmethod all enumerate int ord str any eval isinstance pow sum basestring execfile issubclass print superbin file iter property tuple bool filter len range typebytearray float list raw_input unichr callable format locals reduce unicodechr frozenset long reload vars classmethod getattr map repr xrangecmp globals max reversed zip compile hasattr memoryview round __import__complex hash min set apply delattr help next setattr bufferdict hex object slice coerce dir id oct sorted intern ", pythonBuiltinsL = pythonBuiltins.split(" ").join("() ").split(" "), pythonBuiltinsU = pythonBuiltins.toUpperCase().split(" ").join("() ").split(" ");
});