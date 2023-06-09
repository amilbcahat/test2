CodeMirror.defineMode("sass", function(config) {
var tokenRegexp = function(words) {
return new RegExp("^" + words.join("|"));
}, keywords = [ "true", "false", "null", "auto" ], keywordsRegexp = new RegExp("^" + keywords.join("|")), operators = [ "\\(", "\\)", "=", ">", "<", "==", ">=", "<=", "\\+", "-", "\\!=", "/", "\\*", "%", "and", "or", "not" ], opRegexp = tokenRegexp(operators), pseudoElementsRegexp = /^::?[\w\-]+/, urlTokens = function(stream, state) {
var ch = stream.peek();
return ")" === ch ? (stream.next(), state.tokenizer = tokenBase, "operator") :"(" === ch ? (stream.next(), 
stream.eatSpace(), "operator") :"'" === ch || '"' === ch ? (state.tokenizer = buildStringTokenizer(stream.next()), 
"string") :(state.tokenizer = buildStringTokenizer(")", !1), "string");
}, multilineComment = function(stream, state) {
return stream.skipTo("*/") ? (stream.next(), stream.next(), state.tokenizer = tokenBase) :stream.next(), 
"comment";
}, buildStringTokenizer = function(quote, greedy) {
function stringTokenizer(stream, state) {
var nextChar = stream.next(), peekChar = stream.peek(), previousChar = stream.string.charAt(stream.pos - 2), endingString = "\\" !== nextChar && peekChar === quote || nextChar === quote && "\\" !== previousChar;
return endingString ? (nextChar !== quote && greedy && stream.next(), state.tokenizer = tokenBase, 
"string") :"#" === nextChar && "{" === peekChar ? (state.tokenizer = buildInterpolationTokenizer(stringTokenizer), 
stream.next(), "operator") :"string";
}
return null == greedy && (greedy = !0), stringTokenizer;
}, buildInterpolationTokenizer = function(currentTokenizer) {
return function(stream, state) {
return "}" === stream.peek() ? (stream.next(), state.tokenizer = currentTokenizer, 
"operator") :tokenBase(stream, state);
};
}, indent = function(state) {
if (0 == state.indentCount) {
state.indentCount++;
var lastScopeOffset = state.scopes[0].offset, currentOffset = lastScopeOffset + config.indentUnit;
state.scopes.unshift({
offset:currentOffset
});
}
}, dedent = function(state) {
1 != state.scopes.length && state.scopes.shift();
}, tokenBase = function(stream, state) {
var ch = stream.peek();
if (stream.match("//")) return stream.skipToEnd(), "comment";
if (stream.match("/*")) return state.tokenizer = multilineComment, state.tokenizer(stream, state);
if (stream.match("#{")) return state.tokenizer = buildInterpolationTokenizer(tokenBase), 
"operator";
if ("." === ch) return stream.next(), stream.match(/^[\w-]+/) ? (indent(state), 
"atom") :"#" === stream.peek() ? (indent(state), "atom") :"operator";
if ("#" === ch) {
if (stream.next(), stream.match(/[0-9a-fA-F]{6}|[0-9a-fA-F]{3}/)) return "number";
if (stream.match(/^[\w-]+/)) return indent(state), "atom";
if ("#" === stream.peek()) return indent(state), "atom";
}
return stream.match(/^-?[0-9\.]+/) ? "number" :stream.match(/^(px|em|in)\b/) ? "unit" :stream.match(keywordsRegexp) ? "keyword" :stream.match(/^url/) && "(" === stream.peek() ? (state.tokenizer = urlTokens, 
"atom") :"$" === ch ? (stream.next(), stream.eatWhile(/[\w-]/), ":" === stream.peek() ? (stream.next(), 
"variable-2") :"variable-3") :"!" === ch ? (stream.next(), stream.match(/^[\w]+/) ? "keyword" :"operator") :"=" === ch ? (stream.next(), 
stream.match(/^[\w-]+/) ? (indent(state), "meta") :"operator") :"+" === ch ? (stream.next(), 
stream.match(/^[\w-]+/) ? "variable-3" :"operator") :stream.match(/^@(else if|if|media|else|for|each|while|mixin|function)/) ? (indent(state), 
"meta") :"@" === ch ? (stream.next(), stream.eatWhile(/[\w-]/), "meta") :'"' === ch || "'" === ch ? (stream.next(), 
state.tokenizer = buildStringTokenizer(ch), "string") :":" == ch && stream.match(pseudoElementsRegexp) ? "keyword" :stream.eatWhile(/[\w-&]/) ? ":" !== stream.peek() || stream.match(pseudoElementsRegexp, !1) ? "atom" :"property" :stream.match(opRegexp) ? "operator" :(stream.next(), 
null);
}, tokenLexer = function(stream, state) {
stream.sol() && (state.indentCount = 0);
var style = state.tokenizer(stream, state), current = stream.current();
if ("@return" === current && dedent(state), "atom" === style && indent(state), null !== style) {
for (var startOfToken = stream.pos - current.length, withCurrentIndent = startOfToken + config.indentUnit * state.indentCount, newScopes = [], i = 0; i < state.scopes.length; i++) {
var scope = state.scopes[i];
scope.offset <= withCurrentIndent && newScopes.push(scope);
}
state.scopes = newScopes;
}
return style;
};
return {
startState:function() {
return {
tokenizer:tokenBase,
scopes:[ {
offset:0,
type:"sass"
} ],
definedVars:[],
definedMixins:[]
};
},
token:function(stream, state) {
var style = tokenLexer(stream, state);
return state.lastToken = {
style:style,
content:stream.current()
}, style;
},
indent:function(state) {
return state.scopes[0].offset;
}
};
}), CodeMirror.defineMIME("text/x-sass", "sass");