var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
CodeMirror.defineMode("changes", function() {
var headerSeperator = /^-+$/, headerLine = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)  ?\d{1,2} \d{2}:\d{2}(:\d{2})? [A-Z]{3,4} \d{4} - /, simpleEmail = /^[\w+.-]+@[\w.-]+/;
return {
token:function(stream) {
if (stream.sol()) {
if (stream.match(headerSeperator)) return "tag";
if (stream.match(headerLine)) return "tag";
}
return stream.match(simpleEmail) ? "string" :(stream.next(), null);
}
};
}), CodeMirror.defineMIME("text/x-rpm-changes", "changes");
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 