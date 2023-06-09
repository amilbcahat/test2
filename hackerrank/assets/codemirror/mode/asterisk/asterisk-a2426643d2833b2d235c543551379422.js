var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("asterisk", function() {
function basicToken(stream, state) {
var cur = "", ch = "";
if (ch = stream.next(), ";" == ch) return stream.skipToEnd(), "comment";
if ("[" == ch) return stream.skipTo("]"), stream.eat("]"), "header";
if ('"' == ch) return stream.skipTo('"'), "string";
if ("'" == ch) return stream.skipTo("'"), "string-2";
if ("#" == ch && (stream.eatWhile(/\w/), cur = stream.current(), -1 !== dpcmd.indexOf(cur))) return stream.skipToEnd(), 
"strong";
if ("$" == ch) {
var ch1 = stream.peek();
if ("{" == ch1) return stream.skipTo("}"), stream.eat("}"), "variable-3";
}
if (stream.eatWhile(/\w/), cur = stream.current(), -1 !== atoms.indexOf(cur)) {
switch (state.extenStart = !0, cur) {
case "same":
state.extenSame = !0;
break;

case "include":
case "switch":
case "ignorepat":
state.extenInclude = !0;
}
return "atom";
}
}
var atoms = [ "exten", "same", "include", "ignorepat", "switch" ], dpcmd = [ "#include", "#exec" ], apps = [ "addqueuemember", "adsiprog", "aelsub", "agentlogin", "agentmonitoroutgoing", "agi", "alarmreceiver", "amd", "answer", "authenticate", "background", "backgrounddetect", "bridge", "busy", "callcompletioncancel", "callcompletionrequest", "celgenuserevent", "changemonitor", "chanisavail", "channelredirect", "chanspy", "clearhash", "confbridge", "congestion", "continuewhile", "controlplayback", "dahdiacceptr2call", "dahdibarge", "dahdiras", "dahdiscan", "dahdisendcallreroutingfacility", "dahdisendkeypadfacility", "datetime", "dbdel", "dbdeltree", "deadagi", "dial", "dictate", "directory", "disa", "dumpchan", "eagi", "echo", "endwhile", "exec", "execif", "execiftime", "exitwhile", "extenspy", "externalivr", "festival", "flash", "followme", "forkcdr", "getcpeid", "gosub", "gosubif", "goto", "gotoif", "gotoiftime", "hangup", "iax2provision", "ices", "importvar", "incomplete", "ivrdemo", "jabberjoin", "jabberleave", "jabbersend", "jabbersendgroup", "jabberstatus", "jack", "log", "macro", "macroexclusive", "macroexit", "macroif", "mailboxexists", "meetme", "meetmeadmin", "meetmechanneladmin", "meetmecount", "milliwatt", "minivmaccmess", "minivmdelete", "minivmgreet", "minivmmwi", "minivmnotify", "minivmrecord", "mixmonitor", "monitor", "morsecode", "mp3player", "mset", "musiconhold", "nbscat", "nocdr", "noop", "odbc", "odbc", "odbcfinish", "originate", "ospauth", "ospfinish", "osplookup", "ospnext", "page", "park", "parkandannounce", "parkedcall", "pausemonitor", "pausequeuemember", "pickup", "pickupchan", "playback", "playtones", "privacymanager", "proceeding", "progress", "queue", "queuelog", "raiseexception", "read", "readexten", "readfile", "receivefax", "receivefax", "receivefax", "record", "removequeuemember", "resetcdr", "retrydial", "return", "ringing", "sayalpha", "saycountedadj", "saycountednoun", "saycountpl", "saydigits", "saynumber", "sayphonetic", "sayunixtime", "senddtmf", "sendfax", "sendfax", "sendfax", "sendimage", "sendtext", "sendurl", "set", "setamaflags", "setcallerpres", "setmusiconhold", "sipaddheader", "sipdtmfmode", "sipremoveheader", "skel", "slastation", "slatrunk", "sms", "softhangup", "speechactivategrammar", "speechbackground", "speechcreate", "speechdeactivategrammar", "speechdestroy", "speechloadgrammar", "speechprocessingsound", "speechstart", "speechunloadgrammar", "stackpop", "startmusiconhold", "stopmixmonitor", "stopmonitor", "stopmusiconhold", "stopplaytones", "system", "testclient", "testserver", "transfer", "tryexec", "trysystem", "unpausemonitor", "unpausequeuemember", "userevent", "verbose", "vmauthenticate", "vmsayname", "voicemail", "voicemailmain", "wait", "waitexten", "waitfornoise", "waitforring", "waitforsilence", "waitmusiconhold", "waituntil", "while", "zapateller" ];
return {
startState:function() {
return {
extenStart:!1,
extenSame:!1,
extenInclude:!1,
extenExten:!1,
extenPriority:!1,
extenApplication:!1
};
},
token:function(stream, state) {
var cur = "", ch = "";
return stream.eatSpace() ? null :state.extenStart ? (stream.eatWhile(/[^\s]/), cur = stream.current(), 
/^=>?$/.test(cur) ? (state.extenExten = !0, state.extenStart = !1, "strong") :(state.extenStart = !1, 
stream.skipToEnd(), "error")) :state.extenExten ? (state.extenExten = !1, state.extenPriority = !0, 
stream.eatWhile(/[^,]/), state.extenInclude && (stream.skipToEnd(), state.extenPriority = !1, 
state.extenInclude = !1), state.extenSame && (state.extenPriority = !1, state.extenSame = !1, 
state.extenApplication = !0), "tag") :state.extenPriority ? (state.extenPriority = !1, 
state.extenApplication = !0, ch = stream.next(), state.extenSame ? null :(stream.eatWhile(/[^,]/), 
"number")) :state.extenApplication ? (stream.eatWhile(/,/), cur = stream.current(), 
"," === cur ? null :(stream.eatWhile(/\w/), cur = stream.current().toLowerCase(), 
state.extenApplication = !1, -1 !== apps.indexOf(cur) ? "def strong" :null)) :basicToken(stream, state);
}
};
}), CodeMirror.defineMIME("text/x-asterisk", "asterisk");
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 