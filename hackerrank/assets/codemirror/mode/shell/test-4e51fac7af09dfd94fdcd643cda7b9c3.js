var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function() {
function MT(name) {
test.mode(name, mode, Array.prototype.slice.call(arguments, 1));
}
var mode = CodeMirror.getMode({}, "shell");
MT("var", "text [def $var] text"), MT("varBraces", "text[def ${var}]text"), MT("varVar", "text [def $a$b] text"), 
MT("varBracesVarBraces", "text[def ${a}${b}]text"), MT("singleQuotedVar", "[string 'text $var text']"), 
MT("singleQuotedVarBraces", "[string 'text ${var} text']"), MT("doubleQuotedVar", '[string "text ][def $var][string  text"]'), 
MT("doubleQuotedVarBraces", '[string "text][def ${var}][string text"]'), MT("doubleQuotedVarPunct", '[string "text ][def $@][string  text"]'), 
MT("doubleQuotedVarVar", '[string "][def $a$b][string "]'), MT("doubleQuotedVarBracesVarBraces", '[string "][def ${a}${b}][string "]'), 
MT("notAString", "text\\'text"), MT("escapes", 'outside\\\'\\"\\`\\\\[string "inside\\`\\\'\\"\\\\`\\$notAVar"]outside\\$\\(notASubShell\\)'), 
MT("subshell", "[builtin echo] [quote $(whoami)] s log, stardate [quote `date`]."), 
MT("doubleQuotedSubshell", '[builtin echo] [string "][quote $(whoami)][string \'s log, stardate `date`."]'), 
MT("hashbang", "[meta #!/bin/bash]"), MT("comment", "text [comment # Blurb]"), MT("numbers", "[number 0] [number 1] [number 2]"), 
MT("keywords", "[keyword while] [atom true]; [keyword do]", "  [builtin sleep] [number 3]", "[keyword done]"), 
MT("options", "[builtin ls] [attribute -l] [attribute --human-readable]"), MT("operator", "[def var][operator =]value");
}();
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 