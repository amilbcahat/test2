var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("livescript", function() {
var tokenBase = function(stream, state) {
var next_rule = state.next || "start";
if (next_rule) {
state.next = state.next;
var nr = Rules[next_rule];
if (nr.splice) {
for (var i$ = 0; i$ < nr.length; ++i$) {
var m, r = nr[i$];
if (r.regex && (m = stream.match(r.regex))) return state.next = r.next || state.next, 
r.token;
}
return stream.next(), "error";
}
if (stream.match(r = Rules[next_rule])) return r.regex && stream.match(r.regex) ? (state.next = r.next, 
r.token) :(stream.next(), "error");
}
return stream.next(), "error";
}, external = {
startState:function() {
return {
next:"start",
lastToken:null
};
},
token:function(stream, state) {
for (;stream.pos == stream.start; ) var style = tokenBase(stream, state);
return state.lastToken = {
style:style,
indent:stream.indentation(),
content:stream.current()
}, style.replace(/\./g, " ");
},
indent:function(state) {
var indentation = state.lastToken.indent;
return state.lastToken.content.match(indenter) && (indentation += 2), indentation;
}
};
return external;
});
var identifier = "(?![\\d\\s])[$\\w\\xAA-\\uFFDC](?:(?!\\s)[$\\w\\xAA-\\uFFDC]|-[A-Za-z])*", indenter = RegExp("(?:[({[=:]|[-~]>|\\b(?:e(?:lse|xport)|d(?:o|efault)|t(?:ry|hen)|finally|import(?:\\s*all)?|const|var|let|new|catch(?:\\s*" + identifier + ")?))\\s*$"), keywordend = "(?![$\\w]|-[A-Za-z]|\\s*:(?![:=]))", stringfill = {
token:"string",
regex:".+"
}, Rules = {
start:[ {
token:"comment.doc",
regex:"/\\*",
next:"comment"
}, {
token:"comment",
regex:"#.*"
}, {
token:"keyword",
regex:"(?:t(?:h(?:is|row|en)|ry|ypeof!?)|c(?:on(?:tinue|st)|a(?:se|tch)|lass)|i(?:n(?:stanceof)?|mp(?:ort(?:\\s+all)?|lements)|[fs])|d(?:e(?:fault|lete|bugger)|o)|f(?:or(?:\\s+own)?|inally|unction)|s(?:uper|witch)|e(?:lse|x(?:tends|port)|val)|a(?:nd|rguments)|n(?:ew|ot)|un(?:less|til)|w(?:hile|ith)|o[fr]|return|break|let|var|loop)" + keywordend
}, {
token:"constant.language",
regex:"(?:true|false|yes|no|on|off|null|void|undefined)" + keywordend
}, {
token:"invalid.illegal",
regex:"(?:p(?:ackage|r(?:ivate|otected)|ublic)|i(?:mplements|nterface)|enum|static|yield)" + keywordend
}, {
token:"language.support.class",
regex:"(?:R(?:e(?:gExp|ferenceError)|angeError)|S(?:tring|yntaxError)|E(?:rror|valError)|Array|Boolean|Date|Function|Number|Object|TypeError|URIError)" + keywordend
}, {
token:"language.support.function",
regex:"(?:is(?:NaN|Finite)|parse(?:Int|Float)|Math|JSON|(?:en|de)codeURI(?:Component)?)" + keywordend
}, {
token:"variable.language",
regex:"(?:t(?:hat|il|o)|f(?:rom|allthrough)|it|by|e)" + keywordend
}, {
token:"identifier",
regex:identifier + "\\s*:(?![:=])"
}, {
token:"variable",
regex:identifier
}, {
token:"keyword.operator",
regex:"(?:\\.{3}|\\s+\\?)"
}, {
token:"keyword.variable",
regex:"(?:@+|::|\\.\\.)",
next:"key"
}, {
token:"keyword.operator",
regex:"\\.\\s*",
next:"key"
}, {
token:"string",
regex:"\\\\\\S[^\\s,;)}\\]]*"
}, {
token:"string.doc",
regex:"'''",
next:"qdoc"
}, {
token:"string.doc",
regex:'"""',
next:"qqdoc"
}, {
token:"string",
regex:"'",
next:"qstring"
}, {
token:"string",
regex:'"',
next:"qqstring"
}, {
token:"string",
regex:"`",
next:"js"
}, {
token:"string",
regex:"<\\[",
next:"words"
}, {
token:"string.regex",
regex:"//",
next:"heregex"
}, {
token:"string.regex",
regex:"\\/(?:[^[\\/\\n\\\\]*(?:(?:\\\\.|\\[[^\\]\\n\\\\]*(?:\\\\.[^\\]\\n\\\\]*)*\\])[^[\\/\\n\\\\]*)*)\\/[gimy$]{0,4}",
next:"key"
}, {
token:"constant.numeric",
regex:"(?:0x[\\da-fA-F][\\da-fA-F_]*|(?:[2-9]|[12]\\d|3[0-6])r[\\da-zA-Z][\\da-zA-Z_]*|(?:\\d[\\d_]*(?:\\.\\d[\\d_]*)?|\\.\\d[\\d_]*)(?:e[+-]?\\d[\\d_]*)?[\\w$]*)"
}, {
token:"lparen",
regex:"[({[]"
}, {
token:"rparen",
regex:"[)}\\]]",
next:"key"
}, {
token:"keyword.operator",
regex:"\\S+"
}, {
token:"text",
regex:"\\s+"
} ],
heregex:[ {
token:"string.regex",
regex:".*?//[gimy$?]{0,4}",
next:"start"
}, {
token:"string.regex",
regex:"\\s*#{"
}, {
token:"comment.regex",
regex:"\\s+(?:#.*)?"
}, {
token:"string.regex",
regex:"\\S+"
} ],
key:[ {
token:"keyword.operator",
regex:"[.?@!]+"
}, {
token:"identifier",
regex:identifier,
next:"start"
}, {
token:"text",
regex:"",
next:"start"
} ],
comment:[ {
token:"comment.doc",
regex:".*?\\*/",
next:"start"
}, {
token:"comment.doc",
regex:".+"
} ],
qdoc:[ {
token:"string",
regex:".*?'''",
next:"key"
}, stringfill ],
qqdoc:[ {
token:"string",
regex:'.*?"""',
next:"key"
}, stringfill ],
qstring:[ {
token:"string",
regex:"[^\\\\']*(?:\\\\.[^\\\\']*)*'",
next:"key"
}, stringfill ],
qqstring:[ {
token:"string",
regex:'[^\\\\"]*(?:\\\\.[^\\\\"]*)*"',
next:"key"
}, stringfill ],
js:[ {
token:"string",
regex:"[^\\\\`]*(?:\\\\.[^\\\\`]*)*`",
next:"key"
}, stringfill ],
words:[ {
token:"string",
regex:".*?\\]>",
next:"key"
}, stringfill ]
};
for (var idx in Rules) {
var r = Rules[idx];
if (r.splice) for (var i = 0, len = r.length; len > i; ++i) {
var rr = r[i];
"string" == typeof rr.regex && (Rules[idx][i].regex = new RegExp("^" + rr.regex));
} else "string" == typeof rr.regex && (Rules[idx].regex = new RegExp("^" + r.regex));
}
CodeMirror.defineMIME("text/x-livescript", "livescript");
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 