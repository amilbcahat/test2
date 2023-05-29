CodeMirror.defineMode("jade", function() {
var symbol_regex1 = /^(?:~|!|%|\^|\*|\+|=|\\|:|;|,|\/|\?|&|<|>|\|)/, open_paren_regex = /^(\(|\[)/, close_paren_regex = /^(\)|\])/, keyword_regex1 = /^(if|else|return|var|function|include|doctype|each)/, keyword_regex2 = /^(#|{|}|\.)/, keyword_regex3 = /^(in)/, html_regex1 = /^(html|head|title|meta|link|script|body|br|div|input|span|a|img)/, html_regex2 = /^(h1|h2|h3|h4|h5|p|strong|em)/;
return {
startState:function() {
return {
inString:!1,
stringType:"",
beforeTag:!0,
justMatchedKeyword:!1,
afterParen:!1
};
},
token:function(stream, state) {
if (state.inString || '"' != stream.peek() && "'" != stream.peek() || (state.stringType = stream.peek(), 
stream.next(), state.inString = !0), state.inString) return stream.skipTo(state.stringType) ? (stream.next(), 
state.inString = !1) :stream.skipToEnd(), state.justMatchedKeyword = !1, "string";
if (stream.sol() && stream.eatSpace()) {
if (stream.match(keyword_regex1)) return state.justMatchedKeyword = !0, stream.eatSpace(), 
"keyword";
if (stream.match(html_regex1) || stream.match(html_regex2)) return state.justMatchedKeyword = !0, 
"variable";
} else {
if (stream.sol() && stream.match(keyword_regex1)) return state.justMatchedKeyword = !0, 
stream.eatSpace(), "keyword";
if (stream.sol() && (stream.match(html_regex1) || stream.match(html_regex2))) return state.justMatchedKeyword = !0, 
"variable";
if (stream.eatSpace()) {
if (state.justMatchedKeyword = !1, stream.match(keyword_regex3) && stream.eatSpace()) return state.justMatchedKeyword = !0, 
"keyword";
} else {
if (stream.match(symbol_regex1)) return state.justMatchedKeyword = !1, "atom";
if (stream.match(open_paren_regex)) return state.afterParen = !0, state.justMatchedKeyword = !0, 
"def";
if (stream.match(close_paren_regex)) return state.afterParen = !1, state.justMatchedKeyword = !0, 
"def";
if (stream.match(keyword_regex2)) return state.justMatchedKeyword = !0, "keyword";
if (stream.eatSpace()) state.justMatchedKeyword = !1; else {
if (stream.next(), state.justMatchedKeyword) return "property";
if (state.afterParen) return "property";
}
}
}
return null;
}
};
}), CodeMirror.defineMIME("text/x-jade", "jade");