CodeMirror.defineMode("diff", function() {
var TOKEN_NAMES = {
"+":"positive",
"-":"negative",
"@":"meta"
};
return {
token:function(stream) {
var tw_pos = stream.string.search(/[\t ]+?$/);
if (!stream.sol() || 0 === tw_pos) return stream.skipToEnd(), ("error " + (TOKEN_NAMES[stream.string.charAt(0)] || "")).replace(/ $/, "");
var token_name = TOKEN_NAMES[stream.peek()] || stream.skipToEnd();
return -1 === tw_pos ? stream.skipToEnd() :stream.pos = tw_pos, token_name;
}
};
}), CodeMirror.defineMIME("text/x-diff", "diff");