CodeMirror.defineMode("shell", function() {
function define(style, string) {
for (var split = string.split(" "), i = 0; i < split.length; i++) words[split[i]] = style;
}
function tokenBase(stream, state) {
var sol = stream.sol(), ch = stream.next();
if ("'" === ch || '"' === ch || "`" === ch) return state.tokens.unshift(tokenString(ch)), 
tokenize(stream, state);
if ("#" === ch) return sol && stream.eat("!") ? (stream.skipToEnd(), "meta") :(stream.skipToEnd(), 
"comment");
if ("$" === ch) return state.tokens.unshift(tokenDollar), tokenize(stream, state);
if ("+" === ch || "=" === ch) return "operator";
if ("-" === ch) return stream.eat("-"), stream.eatWhile(/\w/), "attribute";
if (/\d/.test(ch) && (stream.eatWhile(/\d/), !/\w/.test(stream.peek()))) return "number";
stream.eatWhile(/[\w-]/);
var cur = stream.current();
return "=" === stream.peek() && /\w+/.test(cur) ? "def" :words.hasOwnProperty(cur) ? words[cur] :null;
}
function tokenString(quote) {
return function(stream, state) {
for (var next, end = !1, escaped = !1; null != (next = stream.next()); ) {
if (next === quote && !escaped) {
end = !0;
break;
}
if ("$" === next && !escaped && "'" !== quote) {
escaped = !0, stream.backUp(1), state.tokens.unshift(tokenDollar);
break;
}
escaped = !escaped && "\\" === next;
}
return (end || !escaped) && state.tokens.shift(), "`" === quote || ")" === quote ? "quote" :"string";
};
}
function tokenize(stream, state) {
return (state.tokens[0] || tokenBase)(stream, state);
}
var words = {};
define("atom", "true false"), define("keyword", "if then do else elif while until for in esac fi fin fil done exit set unset export function"), 
define("builtin", "ab awk bash beep cat cc cd chown chmod chroot clear cp curl cut diff echo find gawk gcc get git grep kill killall ln ls make mkdir openssl mv nc node npm ping ps restart rm rmdir sed service sh shopt shred source sort sleep ssh start stop su sudo tee telnet top touch vi vim wall wc wget who write yes zsh");
var tokenDollar = function(stream, state) {
state.tokens.length > 1 && stream.eat("$");
var ch = stream.next(), hungry = /\w/;
return "{" === ch && (hungry = /[^}]/), "(" === ch ? (state.tokens[0] = tokenString(")"), 
tokenize(stream, state)) :(/\d/.test(ch) || (stream.eatWhile(hungry), stream.eat("}")), 
state.tokens.shift(), "def");
};
return {
startState:function() {
return {
tokens:[]
};
},
token:function(stream, state) {
return stream.eatSpace() ? null :tokenize(stream, state);
}
};
}), CodeMirror.defineMIME("text/x-sh", "shell");