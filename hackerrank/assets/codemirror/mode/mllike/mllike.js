var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("mllike", function(_config, parserConfig) {
function tokenBase(stream, state) {
var ch = stream.next();
if ('"' === ch) return state.tokenize = tokenString, state.tokenize(stream, state);
if ("(" === ch && stream.eat("*")) return state.commentLevel++, state.tokenize = tokenComment, 
state.tokenize(stream, state);
if ("~" === ch) return stream.eatWhile(/\w/), "variable-2";
if ("`" === ch) return stream.eatWhile(/\w/), "quote";
if ("/" === ch && parserConfig.slashComments && stream.eat("/")) return stream.skipToEnd(), 
"comment";
if (/\d/.test(ch)) return stream.eatWhile(/[\d]/), stream.eat(".") && stream.eatWhile(/[\d]/), 
"number";
if (/[+\-*&%=<>!?|]/.test(ch)) return "operator";
stream.eatWhile(/\w/);
var cur = stream.current();
return words[cur] || "variable";
}
function tokenString(stream, state) {
for (var next, end = !1, escaped = !1; null != (next = stream.next()); ) {
if ('"' === next && !escaped) {
end = !0;
break;
}
escaped = !escaped && "\\" === next;
}
return end && !escaped && (state.tokenize = tokenBase), "string";
}
function tokenComment(stream, state) {
for (var prev, next; state.commentLevel > 0 && null != (next = stream.next()); ) "(" === prev && "*" === next && state.commentLevel++, 
"*" === prev && ")" === next && state.commentLevel--, prev = next;
return state.commentLevel <= 0 && (state.tokenize = tokenBase), "comment";
}
var words = {
let:"keyword",
rec:"keyword",
"in":"keyword",
of:"keyword",
and:"keyword",
"if":"keyword",
then:"keyword",
"else":"keyword",
"for":"keyword",
to:"keyword",
"while":"keyword",
"do":"keyword",
done:"keyword",
fun:"keyword",
"function":"keyword",
val:"keyword",
type:"keyword",
mutable:"keyword",
match:"keyword",
"with":"keyword",
"try":"keyword",
open:"builtin",
ignore:"builtin",
begin:"keyword",
end:"keyword"
}, extraWords = parserConfig.extraWords || {};
for (var prop in extraWords) extraWords.hasOwnProperty(prop) && (words[prop] = parserConfig.extraWords[prop]);
return {
startState:function() {
return {
tokenize:tokenBase,
commentLevel:0
};
},
token:function(stream, state) {
return stream.eatSpace() ? null :state.tokenize(stream, state);
},
blockCommentStart:"(*",
blockCommentEnd:"*)",
lineComment:parserConfig.slashComments ? "//" :null
};
}), CodeMirror.defineMIME("text/x-ocaml", {
name:"mllike",
extraWords:{
succ:"keyword",
trace:"builtin",
exit:"builtin",
print_string:"builtin",
print_endline:"builtin",
"true":"atom",
"false":"atom",
raise:"keyword"
}
}), CodeMirror.defineMIME("text/x-fsharp", {
name:"mllike",
extraWords:{
"abstract":"keyword",
as:"keyword",
assert:"keyword",
base:"keyword",
"class":"keyword",
"default":"keyword",
delegate:"keyword",
downcast:"keyword",
downto:"keyword",
elif:"keyword",
exception:"keyword",
extern:"keyword",
"finally":"keyword",
global:"keyword",
inherit:"keyword",
inline:"keyword",
"interface":"keyword",
internal:"keyword",
lazy:"keyword",
"let!":"keyword",
member:"keyword",
module:"keyword",
namespace:"keyword",
"new":"keyword",
"null":"keyword",
override:"keyword",
"private":"keyword",
"public":"keyword",
"return":"keyword",
"return!":"keyword",
select:"keyword",
"static":"keyword",
struct:"keyword",
upcast:"keyword",
use:"keyword",
"use!":"keyword",
val:"keyword",
when:"keyword",
yield:"keyword",
"yield!":"keyword",
List:"builtin",
Seq:"builtin",
Map:"builtin",
Set:"builtin",
"int":"builtin",
string:"builtin",
raise:"builtin",
failwith:"builtin",
not:"builtin",
"true":"builtin",
"false":"builtin"
},
slashComments:!0
});
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 