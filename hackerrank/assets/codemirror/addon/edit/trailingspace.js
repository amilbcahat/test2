// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
CodeMirror.defineOption("showTrailingSpace", !1, function(cm, val, prev) {
prev == CodeMirror.Init && (prev = !1), prev && !val ? cm.removeOverlay("trailingspace") :!prev && val && cm.addOverlay({
token:function(stream) {
for (var l = stream.string.length, i = l; i && /\s/.test(stream.string.charAt(i - 1)); --i) ;
return i > stream.pos ? (stream.pos = i, null) :(stream.pos = l, "trailingspace");
},
name:"trailingspace"
});
});
});