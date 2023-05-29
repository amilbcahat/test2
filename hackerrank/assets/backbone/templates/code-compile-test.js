HR.appController.addTemplate("backbone/templates/code-compile-test", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "", model.status > 0 && (__p += "\n    ", 0 == model.result ? (__p += "\n    <ul class='nav-tabs ungroup'>\n        ", 
model.customtestcase ? (__p += "\n            ", 0 == model.signal[0] ? __p += "\n                <li class='active'><a href='#testcase1' data-toggle='tab'>Custom Testcase<i class='icon--right icon-ok success'></i></a></li>\n            " :model.signal[0] > 0 && (__p += "\n                <li class='active'><a href='#testcase1' data-toggle='tab'>Custom Testcase<i class='icon--right icon-cancel-large error'></i></a></li>\n            "), 
__p += "\n        ") :(_.each(model.testcase_status, function(status, index) {
__p += 1 == status ? '\n                    <li class="' + (null == (__t = 0 == index ? "active" :"") ? "" :__t) + "\" ><a href='#testcase" + (null == (__t = index + 1) ? "" :__t) + "' data-toggle='tab'>Testcase " + (null == (__t = index) ? "" :__t) + "<i class='icon--right icon-ok success'></i></a></li>\n                " :'\n                    <li class="' + (null == (__t = 0 == index ? "active" :"") ? "" :__t) + "\"><a href='#testcase" + (null == (__t = index + 1) ? "" :__t) + "' data-toggle='tab'>Testcase " + (null == (__t = index) ? "" :__t) + "<i class='icon--right icon-cancel-large error'></i></a></li>\n                ", 
__p += "\n            ";
}), __p += "\n        "), __p += "\n    </ul>\n    ") :__p += '\n        <p class="status"><span class="red">Compile time error</span></p>\n    ', 
__p += "\n\n    ", model.result > 0 && (__p += '\n        <div class="compile-time">\n            <div class="rotate">Compile Time</div>\n            <p class="field-label">Compile Message</p>\n            ', 
__p += _.isEmpty(model.compilemessage) ? '\n                <p class="no-response">~ no response on stderr ~</p>\n            ' :'\n                <pre class="error-output"><xmp>' + (null == (__t = model.compilemessage) ? "" :__t) + "</xmp></pre>\n            ", 
__p += "\n            ", model.result > 0 && (__p += '\n                <p class="field-label">Exit Status</p>\n                <pre class="error-output"><xmp>' + (null == (__t = model.result) ? "" :__t) + "</xmp></pre>\n            "), 
__p += "\n        </div>\n    "), __p += "\n\n    ", 0 == model.result && (__p += "\n    <div class='tab-content light-wrap'>\n        ", 
model.customtestcase ? (__p += "\n            <div class='tab-pane plA active' id='testcase1'>\n                ", 
0 == model.signal[0] ? __p += "\n                    <p class='large bold'>Compilation Successful</p>\n                " :model.signal[0] > 0 && (__p += "\n                    <p class='large bold'>Runtime error</p>\n                "), 
__p += "\n\n                ", _.isEmpty(model.compilemessage) || (__p += '\n                    <div class="compile-time">\n                        <div class="rotate">Compile Time</div>\n                        <p class="field-label">Compile Message</p>\n                        ', 
__p += _.isEmpty(model.compilemessage) ? '\n                            <p class="no-response">~ no response on stderr ~</p>\n                        ' :'\n                            <pre class="error-output"><xmp>' + (null == (__t = model.compilemessage) ? "" :__t) + "</xmp></pre>\n                        ", 
__p += "\n                        ", model.result > 0 && (__p += '\n                            <p class="field-label">Exit Status</p>\n                            <pre class="error-output"><xmp>' + (null == (__t = model.result) ? "" :__t) + "</xmp></pre>\n                        "), 
__p += "\n                    </div>\n                "), __p += '\n\n                <div class="run-time">\n                    <div class="rotate">Run Time</div>\n                    ', 
model.hide_stdstream || (__p += '\n                        <p class="field-label">Input (stdin)</p>\n                        <pre class="error-output"><xmp>' + (null == (__t = model.stdin[0]) ? "" :__t) + "</xmp></pre>\n                    "), 
__p += "\n                    ", model.hide_stdstream || (__p += '\n                        <p class="field-label">Your Output</p>\n                        ', 
__p += _.isEmpty(model.stdout[0]) ? '\n                            <p class="no-response">~ no response on stdout ~</p>\n                        ' :'\n                            <pre class="error-output"><xmp>' + (null == (__t = model.stdout[0]) ? "" :__t) + "</xmp></pre>\n                        ", 
__p += "\n                    "), __p += "\n                    ", model.hide_stdstream || (__p += "\n                        ", 
_.isEmpty(model.stdout_debug) || _.isEmpty(model.stdout_debug[0]) || (__p += '\n                            <p class="field-label">Debug output</p>\n                            <pre class="error-output"><xmp>' + (null == (__t = model.stdout_debug[0]) ? "" :__t) + "</xmp></pre>\n                        "), 
__p += "\n                    "), __p += "\n                    ", model.hide_stdstream || (__p += "\n                        ", 
_.isEmpty(model.stderr[0]) || (__p += '\n                           <p class="field-label">Error</p>\n                           <pre class="error-output"><xmp>' + (null == (__t = model.stderr[0]) ? "" :__t) + "</xmp></pre>\n                        "), 
__p += "\n                    "), __p += "\n                </div>\n            </div>\n        ") :model.signal && model.signal.length > 0 && (__p += "\n            ", 
_.each(model.testcase_status, function(status, index) {
__p += "\n            <div class='tab-pane plA " + (null == (__t = 0 == index ? "active" :"") ? "" :__t) + "' id='testcase" + (null == (__t = index + 1) ? "" :__t) + "'>\n                ", 
1 == status ? (__p += "\n                    ", __p += model.lexical_penalty ? "\n                        <p class='large bold'>Congratulations, you passed this test case, but you had a penalty of " + (null == (__t = 100 * model.lexical_penalty) ? "" :__t) + " %</p>\n                    " :"\n                        <p class='large bold'>Congratulations, you passed this test case!</p>\n                    ", 
__p += "\n                ") :__p += "\n                    <p class='large bold'>Nice try, but you did not pass this test case.</p>\n                ", 
__p += "\n\n                ", _.isNumber(model.score) && (__p += '\n                    <p class="title">Score: ' + (null == (__t = model.score) ? "" :__t) + "</p>\n                "), 
__p += "\n\n                ", model.hide_stdstream || (__p += "\n                    ", 
_.isEmpty(model.compilemessage) || (__p += '\n                        <div class="compile-time">\n                            <div class="rotate">Compile Time</div>\n                            <p class="field-label">Compile Message</p>\n                            ', 
__p += _.isEmpty(model.compilemessage) ? '\n                                <p class="no-response">~ no response on stderr ~</p>\n                            ' :'\n                                <pre class="error-output"><xmp>' + (null == (__t = model.compilemessage) ? "" :__t) + "</xmp></pre>\n                            ", 
__p += "\n                            ", model.result > 0 && (__p += '\n                                <p class="field-label">Exit Status</p>\n                                <pre class="error-output"><xmp>' + (null == (__t = model.result) ? "" :__t) + "</xmp></pre>\n                            "), 
__p += "\n                        </div>\n                    "), __p += "\n                "), 
__p += "\n\n                <div class='run-time'>\n                    <div class=\"rotate\">Run Time</div>\n                    ", 
model.hide_stdstream || (__p += "\n                        <p class='field-label'>Input (stdin)</p>\n                        <pre class='error-output'><xmp>" + (null == (__t = model.stdin[index]) ? "" :__t) + "</xmp></pre>\n                    "), 
__p += "\n\n                    ", model.hide_stdstream || (__p += '\n                        <p class="field-label">Your Output (stdout)</p>\n                        ', 
__p += _.isEmpty(model.stdout[index]) ? '\n                            <h5 class="no-response msB">~ no response on stdout ~</h5>\n                        ' :'\n                            <pre class="error-output"><xmp>' + (null == (__t = model.stdout[index]) ? "" :__t) + "</xmp></pre>\n                        ", 
__p += "\n                    "), __p += "\n\n                    ", model.hide_stdstream || (__p += '\n                        <p class="field-label">Expected Output</p>\n                        ', 
__p += _.isEmpty(model.expected_output[index]) ? '\n                            <p class="no-response">~ no response on stdout ~</p>\n                        ' :'\n                            <pre class="error-output"><xmp>' + (null == (__t = model.expected_output[index]) ? "" :__t) + "</xmp></pre>\n                        ", 
__p += "\n                    "), __p += "\n\n                    ", _.isEmpty(model.testcase_message[index]) || "Success" === model.testcase_message[index] || _.isNumber(model.score) || (__p += '\n                        <p class="field-label">Compiler Message</p>\n                        <pre class="error-output"><xmp>' + (null == (__t = model.testcase_message[index]) ? "" :__t) + "</xmp></pre>\n                    "), 
__p += "\n\n                    ", model.hide_stdstream || (__p += "\n                        ", 
_.isEmpty(model.stdout_debug) || _.isEmpty(model.stdout_debug[index]) || (__p += '\n                            <p class="field-label">Debug output</p>\n                            <pre class="error-output"><xmp>' + (null == (__t = model.stdout_debug[index]) ? "" :__t) + "</xmp></pre>\n                        "), 
__p += "\n                    "), __p += "\n\n                    ", model.hide_stdstream || (__p += "\n                        ", 
_.isEmpty(model.stderr[index]) || (__p += '\n                           <p class="field-label">Error (stderr)</p>\n                           <pre class="error-output"><xmp>' + (null == (__t = model.stderr[index]) ? "" :__t) + "</xmp></pre>\n                        "), 
__p += "\n                    "), __p += "\n\n                    ", model.lexical_penalty && (__p += '\n                       <p class="field-label">Restricted Keywords Used</p>\n                       <pre class="error-output"><xmp>' + (null == (__t = model.lexical_penalty_keywords.join(",")) ? "" :__t) + "</xmp></pre>\n                    "), 
__p += "\n                </div>\n            </div>\n            ";
}), __p += "\n        "), __p += "\n    </div>\n    "), __p += "\n"), __p += "\n";
return __p;
});