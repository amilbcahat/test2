HR.appController.addTemplate("backbone/templates/recruit/compiletest-base", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="output-area-wrap">\n  <div class="output-area padded light-wrap" id="output-area">\n    <p class="status">Status: <span class="status-msg">Uploading..</span></p>\n    <span class="bb-runall hide">Running your code against all testcases...</span>\n    <div class="alert mlB hide" id="error-message">\n        <header class="compile-header"></header>\n        <p><pre class="compile-message"></pre></p>\n    </div>\n    <span class="testcases"></span>\n    <span class="bb-runall hide">Running your code against all testcases...</span>\n</div>\n</div>\n';
return __p;
});