// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("rpm-changes", function() {
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
}), CodeMirror.defineMIME("text/x-rpm-changes", "rpm-changes"), CodeMirror.defineMode("rpm-spec", function() {
var arch = /^(i386|i586|i686|x86_64|ppc64|ppc|ia64|s390x|s390|sparc64|sparcv9|sparc|noarch|alphaev6|alpha|hppa|mipsel)/, preamble = /^(Name|Version|Release|License|Summary|Url|Group|Source|BuildArch|BuildRequires|BuildRoot|AutoReqProv|Provides|Requires(\(\w+\))?|Obsoletes|Conflicts|Recommends|Source\d*|Patch\d*|ExclusiveArch|NoSource|Supplements):/, section = /^%(debug_package|package|description|prep|build|install|files|clean|changelog|preinstall|preun|postinstall|postun|pre|post|triggerin|triggerun|pretrans|posttrans|verifyscript|check|triggerpostun|triggerprein|trigger)/, control_flow_complex = /^%(ifnarch|ifarch|if)/, control_flow_simple = /^%(else|endif)/, operators = /^(\!|\?|\<\=|\<|\>\=|\>|\=\=|\&\&|\|\|)/;
return {
startState:function() {
return {
controlFlow:!1,
macroParameters:!1,
section:!1
};
},
token:function(stream, state) {
var ch = stream.peek();
if ("#" == ch) return stream.skipToEnd(), "comment";
if (stream.sol()) {
if (stream.match(preamble)) return "preamble";
if (stream.match(section)) return "section";
}
if (stream.match(/^\$\w+/)) return "def";
if (stream.match(/^\$\{\w+\}/)) return "def";
if (stream.match(control_flow_simple)) return "keyword";
if (stream.match(control_flow_complex)) return state.controlFlow = !0, "keyword";
if (state.controlFlow) {
if (stream.match(operators)) return "operator";
if (stream.match(/^(\d+)/)) return "number";
stream.eol() && (state.controlFlow = !1);
}
if (stream.match(arch)) return "number";
if (stream.match(/^%[\w]+/)) return stream.match(/^\(/) && (state.macroParameters = !0), 
"macro";
if (state.macroParameters) {
if (stream.match(/^\d+/)) return "number";
if (stream.match(/^\)/)) return state.macroParameters = !1, "macro";
}
return stream.match(/^%\{\??[\w \-]+\}/) ? "macro" :(stream.next(), null);
}
};
}), CodeMirror.defineMIME("text/x-rpm-spec", "rpm-spec");
});