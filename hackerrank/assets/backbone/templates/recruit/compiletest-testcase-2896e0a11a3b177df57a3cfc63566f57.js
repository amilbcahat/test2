HR.appController.addTemplate("backbone/templates/recruit/compiletest-testcase", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<hr>\n<div class="run-time full-width">\n    <p class="title ' + (null == (__t = st_class) ? "" :__t) + '">Testcase <span class="testcase-no">' + (null == (__t = tno) ? "" :__t) + "</span>: <em>" + (null == (__t = compiler_msg) ? "" :__t) + "</em></p>\n\n    ", 
__p += _.isUndefined(output) || _.isNull(output) ? '\n        <!-- <p class="field-label">Your Output</p> -->\n        <pre class="error-output"><xmp class="testcase-output">Output hidden</xmp></pre>\n    ' :'\n        <p class="field-label">Your Output</p>\n        <pre class="error-output"><xmp class="testcase-output">' + (null == (__t = output) ? "" :__t) + "</xmp></pre>\n    ", 
__p += "\n\n    ", exp_output && (__p += '\n        <p class="field-label">Expected Output</p>\n        <pre class="error-output"><xmp class="testcase-expected-output">' + (null == (__t = exp_output) ? "" :__t) + "</xmp></pre>\n    "), 
__p += "\n\n    ", output_debug && (__p += '\n        <p class="field-label">Debug Output</p>\n        <pre class="error-output"><xmp class="testcase-output">' + (null == (__t = output_debug) ? "" :__t) + "</xmp></pre>\n    "), 
__p += "\n\n    ", _.isNumber(score) && (__p += '\n        <p class="field-label">Score</p>\n        <pre class="error-output"><xmp class="testcase-expected-output">' + (null == (__t = score) ? "" :__t) + "</xmp></pre>\n    "), 
__p += "\n</div>\n";
return __p;
});