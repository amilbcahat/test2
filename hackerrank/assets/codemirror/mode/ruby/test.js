var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function() {
function MT(name) {
test.mode(name, mode, Array.prototype.slice.call(arguments, 1));
}
var mode = CodeMirror.getMode({
indentUnit:2
}, "ruby");
MT("divide_equal_operator", "[variable bar] [operator /=] [variable foo]"), MT("divide_equal_operator_no_spacing", "[variable foo][operator /=][number 42]");
}();
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 