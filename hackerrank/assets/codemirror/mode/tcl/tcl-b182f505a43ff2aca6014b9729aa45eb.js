CodeMirror.defineMode("tcl", function() {
function parseWords(str) {
for (var obj = {}, words = str.split(" "), i = 0; i < words.length; ++i) obj[words[i]] = !0;
return obj;
}
function chain(stream, state, f) {
return state.tokenize = f, f(stream, state);
}
function tokenBase(stream, state) {
var beforeParams = state.beforeParams;
state.beforeParams = !1;
var ch = stream.next();
if ('"' != ch && "'" != ch || !state.inParams) {
if (/[\[\]{}\(\),;\.]/.test(ch)) return "(" == ch && beforeParams ? state.inParams = !0 :")" == ch && (state.inParams = !1), 
null;
if (/\d/.test(ch)) return stream.eatWhile(/[\w\.]/), "number";
if ("#" == ch && stream.eat("*")) return chain(stream, state, tokenComment);
if ("#" == ch && stream.match(/ *\[ *\[/)) return chain(stream, state, tokenUnparsed);
if ("#" == ch && stream.eat("#")) return stream.skipToEnd(), "comment";
if ('"' == ch) return stream.skipTo(/"/), "comment";
if ("$" == ch) return stream.eatWhile(/[$_a-z0-9A-Z\.{:]/), stream.eatWhile(/}/), 
state.beforeParams = !0, "builtin";
if (isOperatorChar.test(ch)) return stream.eatWhile(isOperatorChar), "comment";
stream.eatWhile(/[\w\$_{}]/);
var word = stream.current().toLowerCase();
return keywords && keywords.propertyIsEnumerable(word) ? "keyword" :functions && functions.propertyIsEnumerable(word) ? (state.beforeParams = !0, 
"keyword") :null;
}
return chain(stream, state, tokenString(ch));
}
function tokenString(quote) {
return function(stream, state) {
for (var next, escaped = !1, end = !1; null != (next = stream.next()); ) {
if (next == quote && !escaped) {
end = !0;
break;
}
escaped = !escaped && "\\" == next;
}
return end && (state.tokenize = tokenBase), "string";
};
}
function tokenComment(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("#" == ch && maybeEnd) {
state.tokenize = tokenBase;
break;
}
maybeEnd = "*" == ch;
}
return "comment";
}
function tokenUnparsed(stream, state) {
for (var ch, maybeEnd = 0; ch = stream.next(); ) {
if ("#" == ch && 2 == maybeEnd) {
state.tokenize = tokenBase;
break;
}
"]" == ch ? maybeEnd++ :" " != ch && (maybeEnd = 0);
}
return "meta";
}
var keywords = parseWords("Tcl safe after append array auto_execok auto_import auto_load auto_mkindex auto_mkindex_old auto_qualify auto_reset bgerror binary break catch cd close concat continue dde eof encoding error eval exec exit expr fblocked fconfigure fcopy file fileevent filename filename flush for foreach format gets glob global history http if incr info interp join lappend lindex linsert list llength load lrange lreplace lsearch lset lsort memory msgcat namespace open package parray pid pkg::create pkg_mkIndex proc puts pwd re_syntax read regex regexp registry regsub rename resource return scan seek set socket source split string subst switch tcl_endOfWord tcl_findLibrary tcl_startOfNextWord tcl_wordBreakAfter tcl_startOfPreviousWord tcl_wordBreakBefore tcltest tclvars tell time trace unknown unset update uplevel upvar variable vwait"), functions = parseWords("if elseif else and not or eq ne in ni for foreach while switch"), isOperatorChar = /[+\-*&%=<>!?^\/\|]/;
return {
startState:function() {
return {
tokenize:tokenBase,
beforeParams:!1,
inParams:!1
};
},
token:function(stream, state) {
return stream.eatSpace() ? null :state.tokenize(stream, state);
}
};
}), CodeMirror.defineMIME("text/x-tcl", "tcl");