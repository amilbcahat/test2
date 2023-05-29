CodeMirror.defineMode("jinja2", function() {
function tokenBase(stream, state) {
var ch = stream.next();
return "{" == ch && (ch = stream.eat(/\{|%|#/)) ? (stream.eat("-"), state.tokenize = inTag(ch), 
"tag") :void 0;
}
function inTag(close) {
return "{" == close && (close = "}"), function(stream, state) {
var ch = stream.next();
return (ch == close || "-" == ch && stream.eat(close)) && stream.eat("}") ? (state.tokenize = tokenBase, 
"tag") :stream.match(keywords) ? "keyword" :"#" == close ? "comment" :"string";
};
}
var keywords = [ "and", "as", "block", "endblock", "by", "cycle", "debug", "else", "elif", "extends", "filter", "endfilter", "firstof", "for", "endfor", "if", "endif", "ifchanged", "endifchanged", "ifequal", "endifequal", "ifnotequal", "endifnotequal", "in", "include", "load", "not", "now", "or", "parsed", "regroup", "reversed", "spaceless", "endspaceless", "ssi", "templatetag", "openblock", "closeblock", "openvariable", "closevariable", "openbrace", "closebrace", "opencomment", "closecomment", "widthratio", "url", "with", "endwith", "get_current_language", "trans", "noop", "blocktrans", "endblocktrans", "get_available_languages", "get_current_language_bidi", "plural" ];
return keywords = new RegExp("^((" + keywords.join(")|(") + "))\\b"), {
startState:function() {
return {
tokenize:tokenBase
};
},
token:function(stream, state) {
return state.tokenize(stream, state);
}
};
});