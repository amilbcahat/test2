!function() {
function MT(name) {
test.mode(name, mode, Array.prototype.slice.call(arguments, 1));
}
var mode = CodeMirror.getMode({
indentUnit:2
}, "ruby");
MT("divide_equal_operator", "[variable bar] [operator /=] [variable foo]"), MT("divide_equal_operator_no_spacing", "[variable foo][operator /=][number 42]");
}();