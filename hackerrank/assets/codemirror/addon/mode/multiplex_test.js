// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function() {
function MT(name) {
test.mode(name, mode, Array.prototype.slice.call(arguments, 1), "multiplexing");
}
CodeMirror.defineMode("markdown_with_stex", function() {
var inner = CodeMirror.getMode({}, "stex"), outer = CodeMirror.getMode({}, "markdown"), innerOptions = {
open:"$",
close:"$",
mode:inner,
delimStyle:"delim",
innerStyle:"inner"
};
return CodeMirror.multiplexingMode(outer, innerOptions);
});
var mode = CodeMirror.getMode({}, "markdown_with_stex");
MT("stexInsideMarkdown", "[strong **Equation:**] [delim $][inner&tag \\pi][delim $]");
}();