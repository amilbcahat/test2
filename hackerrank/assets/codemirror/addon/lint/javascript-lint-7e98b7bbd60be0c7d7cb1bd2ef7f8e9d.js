// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function validator(text, options) {
if (!window.JSHINT) return [];
JSHINT(text, options);
var errors = JSHINT.data().errors, result = [];
return errors && parseErrors(errors, result), result;
}
function cleanup(error) {
return fixWith(error, warnings, "warning", !0), fixWith(error, errors, "error"), 
isBogus(error) ? null :error;
}
function fixWith(error, fixes, severity, force) {
var description, fix, find, replace, found;
description = error.description;
for (var i = 0; i < fixes.length; i++) fix = fixes[i], find = "string" == typeof fix ? fix :fix[0], 
replace = "string" == typeof fix ? null :fix[1], found = -1 !== description.indexOf(find), 
(force || found) && (error.severity = severity), found && replace && (error.description = replace);
}
function isBogus(error) {
for (var description = error.description, i = 0; i < bogus.length; i++) if (-1 !== description.indexOf(bogus[i])) return !0;
return !1;
}
function parseErrors(errors, output) {
for (var i = 0; i < errors.length; i++) {
var error = errors[i];
if (error) {
var linetabpositions, index;
if (linetabpositions = [], error.evidence) {
var tabpositions = linetabpositions[error.line];
if (!tabpositions) {
var evidence = error.evidence;
tabpositions = [], Array.prototype.forEach.call(evidence, function(item, index) {
"	" === item && tabpositions.push(index + 1);
}), linetabpositions[error.line] = tabpositions;
}
if (tabpositions.length > 0) {
var pos = error.character;
tabpositions.forEach(function(tabposition) {
pos > tabposition && (pos -= 1);
}), error.character = pos;
}
}
var start = error.character - 1, end = start + 1;
error.evidence && (index = error.evidence.substring(start).search(/.\b/), index > -1 && (end += index)), 
error.description = error.reason, error.start = error.character, error.end = end, 
error = cleanup(error), error && output.push({
message:error.description,
severity:error.severity,
from:CodeMirror.Pos(error.line - 1, start),
to:CodeMirror.Pos(error.line - 1, end)
});
}
}
}
var bogus = [ "Dangerous comment" ], warnings = [ [ "Expected '{'", "Statement body should be inside '{ }' braces." ] ], errors = [ "Missing semicolon", "Extra comma", "Missing property name", "Unmatched ", " and instead saw", " is not defined", "Unclosed string", "Stopping, unable to continue" ];
CodeMirror.registerHelper("lint", "javascript", validator);
});