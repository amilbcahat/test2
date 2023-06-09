// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("puppet", function() {
function define(style, string) {
for (var split = string.split(" "), i = 0; i < split.length; i++) words[split[i]] = style;
}
function tokenString(stream, state) {
for (var current, prev, found_var = !1; !stream.eol() && (current = stream.next()) != state.pending; ) {
if ("$" === current && "\\" != prev && '"' == state.pending) {
found_var = !0;
break;
}
prev = current;
}
return found_var && stream.backUp(1), state.continueString = current == state.pending ? !1 :!0, 
"string";
}
function tokenize(stream, state) {
var word = stream.match(/[\w]+/, !1), attribute = stream.match(/(\s+)?\w+\s+=>.*/, !1), resource = stream.match(/(\s+)?[\w:_]+(\s+)?{/, !1), special_resource = stream.match(/(\s+)?[@]{1,2}[\w:_]+(\s+)?{/, !1), ch = stream.next();
if ("$" === ch) return stream.match(variable_regex) ? state.continueString ? "variable-2" :"variable" :"error";
if (state.continueString) return stream.backUp(1), tokenString(stream, state);
if (state.inDefinition) {
if (stream.match(/(\s+)?[\w:_]+(\s+)?/)) return "def";
stream.match(/\s+{/), state.inDefinition = !1;
}
return state.inInclude ? (stream.match(/(\s+)?\S+(\s+)?/), state.inInclude = !1, 
"def") :stream.match(/(\s+)?\w+\(/) ? (stream.backUp(1), "def") :attribute ? (stream.match(/(\s+)?\w+/), 
"tag") :word && words.hasOwnProperty(word) ? (stream.backUp(1), stream.match(/[\w]+/), 
stream.match(/\s+\S+\s+{/, !1) && (state.inDefinition = !0), "include" == word && (state.inInclude = !0), 
words[word]) :/(\s+)?[A-Z]/.test(word) ? (stream.backUp(1), stream.match(/(\s+)?[A-Z][\w:_]+/), 
"def") :resource ? (stream.match(/(\s+)?[\w:_]+/), "def") :special_resource ? (stream.match(/(\s+)?[@]{1,2}/), 
"special") :"#" == ch ? (stream.skipToEnd(), "comment") :"'" == ch || '"' == ch ? (state.pending = ch, 
tokenString(stream, state)) :"{" == ch || "}" == ch ? "bracket" :"/" == ch ? (stream.match(/.*\//), 
"variable-3") :ch.match(/[0-9]/) ? (stream.eatWhile(/[0-9]+/), "number") :"=" == ch ? (">" == stream.peek() && stream.next(), 
"operator") :(stream.eatWhile(/[\w-]/), null);
}
var words = {}, variable_regex = /({)?([a-z][a-z0-9_]*)?((::[a-z][a-z0-9_]*)*::)?[a-zA-Z0-9_]+(})?/;
return define("keyword", "class define site node include import inherits"), define("keyword", "case if else in and elsif default or"), 
define("atom", "false true running present absent file directory undef"), define("builtin", "action augeas burst chain computer cron destination dport exec file filebucket group host icmp iniface interface jump k5login limit log_level log_prefix macauthorization mailalias maillist mcx mount nagios_command nagios_contact nagios_contactgroup nagios_host nagios_hostdependency nagios_hostescalation nagios_hostextinfo nagios_hostgroup nagios_service nagios_servicedependency nagios_serviceescalation nagios_serviceextinfo nagios_servicegroup nagios_timeperiod name notify outiface package proto reject resources router schedule scheduled_task selboolean selmodule service source sport ssh_authorized_key sshkey stage state table tidy todest toports tosource user vlan yumrepo zfs zone zpool"), 
{
startState:function() {
var state = {};
return state.inDefinition = !1, state.inInclude = !1, state.continueString = !1, 
state.pending = !1, state;
},
token:function(stream, state) {
return stream.eatSpace() ? null :tokenize(stream, state);
}
};
}), CodeMirror.defineMIME("text/x-puppet", "puppet");
});