CodeMirror.defineMode("ecl", function(config) {
function words(str) {
for (var obj = {}, words = str.split(" "), i = 0; i < words.length; ++i) obj[words[i]] = !0;
return obj;
}
function metaHook(stream, state) {
return state.startOfLine ? (stream.skipToEnd(), "meta") :!1;
}
function tokenBase(stream, state) {
var ch = stream.next();
if (hooks[ch]) {
var result = hooks[ch](stream, state);
if (result !== !1) return result;
}
if ('"' == ch || "'" == ch) return state.tokenize = tokenString(ch), state.tokenize(stream, state);
if (/[\[\]{}\(\),;\:\.]/.test(ch)) return curPunc = ch, null;
if (/\d/.test(ch)) return stream.eatWhile(/[\w\.]/), "number";
if ("/" == ch) {
if (stream.eat("*")) return state.tokenize = tokenComment, tokenComment(stream, state);
if (stream.eat("/")) return stream.skipToEnd(), "comment";
}
if (isOperatorChar.test(ch)) return stream.eatWhile(isOperatorChar), "operator";
stream.eatWhile(/[\w\$_]/);
var cur = stream.current().toLowerCase();
if (keyword.propertyIsEnumerable(cur)) return blockKeywords.propertyIsEnumerable(cur) && (curPunc = "newstatement"), 
"keyword";
if (variable.propertyIsEnumerable(cur)) return blockKeywords.propertyIsEnumerable(cur) && (curPunc = "newstatement"), 
"variable";
if (variable_2.propertyIsEnumerable(cur)) return blockKeywords.propertyIsEnumerable(cur) && (curPunc = "newstatement"), 
"variable-2";
if (variable_3.propertyIsEnumerable(cur)) return blockKeywords.propertyIsEnumerable(cur) && (curPunc = "newstatement"), 
"variable-3";
if (builtin.propertyIsEnumerable(cur)) return blockKeywords.propertyIsEnumerable(cur) && (curPunc = "newstatement"), 
"builtin";
for (var i = cur.length - 1; i >= 0 && (!isNaN(cur[i]) || "_" == cur[i]); ) --i;
if (i > 0) {
var cur2 = cur.substr(0, i + 1);
if (variable_3.propertyIsEnumerable(cur2)) return blockKeywords.propertyIsEnumerable(cur2) && (curPunc = "newstatement"), 
"variable-3";
}
return atoms.propertyIsEnumerable(cur) ? "atom" :null;
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
return (end || !escaped && !multiLineStrings) && (state.tokenize = tokenBase), "string";
};
}
function tokenComment(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("/" == ch && maybeEnd) {
state.tokenize = tokenBase;
break;
}
maybeEnd = "*" == ch;
}
return "comment";
}
function Context(indented, column, type, align, prev) {
this.indented = indented, this.column = column, this.type = type, this.align = align, 
this.prev = prev;
}
function pushContext(state, col, type) {
return state.context = new Context(state.indented, col, type, null, state.context);
}
function popContext(state) {
var t = state.context.type;
return (")" == t || "]" == t || "}" == t) && (state.indented = state.context.indented), 
state.context = state.context.prev;
}
var multiLineStrings, curPunc, indentUnit = config.indentUnit, keyword = words("abs acos allnodes ascii asin asstring atan atan2 ave case choose choosen choosesets clustersize combine correlation cos cosh count covariance cron dataset dedup define denormalize distribute distributed distribution ebcdic enth error evaluate event eventextra eventname exists exp failcode failmessage fetch fromunicode getisvalid global graph group hash hash32 hash64 hashcrc hashmd5 having if index intformat isvalid iterate join keyunicode length library limit ln local log loop map matched matchlength matchposition matchtext matchunicode max merge mergejoin min nolocal nonempty normalize parse pipe power preload process project pull random range rank ranked realformat recordof regexfind regexreplace regroup rejected rollup round roundup row rowdiff sample set sin sinh sizeof soapcall sort sorted sqrt stepped stored sum table tan tanh thisnode topn tounicode transfer trim truncate typeof ungroup unicodeorder variance which workunit xmldecode xmlencode xmltext xmlunicode"), variable = words("apply assert build buildindex evaluate fail keydiff keypatch loadxml nothor notify output parallel sequential soapcall wait"), variable_2 = words("__compressed__ all and any as atmost before beginc++ best between case const counter csv descend encrypt end endc++ endmacro except exclusive expire export extend false few first flat from full function group header heading hole ifblock import in interface joined keep keyed last left limit load local locale lookup macro many maxcount maxlength min skew module named nocase noroot noscan nosort not of only opt or outer overwrite packed partition penalty physicallength pipe quote record relationship repeat return right scan self separator service shared skew skip sql store terminator thor threshold token transform trim true type unicodeorder unsorted validate virtual whole wild within xml xpath"), variable_3 = words("ascii big_endian boolean data decimal ebcdic integer pattern qstring real record rule set of string token udecimal unicode unsigned varstring varunicode"), builtin = words("checkpoint deprecated failcode failmessage failure global independent onwarning persist priority recovery stored success wait when"), blockKeywords = words("catch class do else finally for if switch try while"), atoms = words("true false null"), hooks = {
"#":metaHook
}, isOperatorChar = /[+\-*&%=<>!?|\/]/;
return {
startState:function(basecolumn) {
return {
tokenize:null,
context:new Context((basecolumn || 0) - indentUnit, 0, "top", !1),
indented:0,
startOfLine:!0
};
},
token:function(stream, state) {
var ctx = state.context;
if (stream.sol() && (null == ctx.align && (ctx.align = !1), state.indented = stream.indentation(), 
state.startOfLine = !0), stream.eatSpace()) return null;
curPunc = null;
var style = (state.tokenize || tokenBase)(stream, state);
if ("comment" == style || "meta" == style) return style;
if (null == ctx.align && (ctx.align = !0), ";" != curPunc && ":" != curPunc || "statement" != ctx.type) if ("{" == curPunc) pushContext(state, stream.column(), "}"); else if ("[" == curPunc) pushContext(state, stream.column(), "]"); else if ("(" == curPunc) pushContext(state, stream.column(), ")"); else if ("}" == curPunc) {
for (;"statement" == ctx.type; ) ctx = popContext(state);
for ("}" == ctx.type && (ctx = popContext(state)); "statement" == ctx.type; ) ctx = popContext(state);
} else curPunc == ctx.type ? popContext(state) :("}" == ctx.type || "top" == ctx.type || "statement" == ctx.type && "newstatement" == curPunc) && pushContext(state, stream.column(), "statement"); else popContext(state);
return state.startOfLine = !1, style;
},
indent:function(state, textAfter) {
if (state.tokenize != tokenBase && null != state.tokenize) return 0;
var ctx = state.context, firstChar = textAfter && textAfter.charAt(0);
"statement" == ctx.type && "}" == firstChar && (ctx = ctx.prev);
var closing = firstChar == ctx.type;
return "statement" == ctx.type ? ctx.indented + ("{" == firstChar ? 0 :indentUnit) :ctx.align ? ctx.column + (closing ? 0 :1) :ctx.indented + (closing ? 0 :indentUnit);
},
electricChars:"{}"
};
}), CodeMirror.defineMIME("text/x-ecl", "ecl");