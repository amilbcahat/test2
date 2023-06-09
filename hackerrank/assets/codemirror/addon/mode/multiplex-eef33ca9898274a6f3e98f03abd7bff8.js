// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.multiplexingMode = function(outer) {
function indexOf(string, pattern, from) {
if ("string" == typeof pattern) return string.indexOf(pattern, from);
var m = pattern.exec(from ? string.slice(from) :string);
return m ? m.index + from :-1;
}
var others = Array.prototype.slice.call(arguments, 1), n_others = others.length;
return {
startState:function() {
return {
outer:CodeMirror.startState(outer),
innerActive:null,
inner:null
};
},
copyState:function(state) {
return {
outer:CodeMirror.copyState(outer, state.outer),
innerActive:state.innerActive,
inner:state.innerActive && CodeMirror.copyState(state.innerActive.mode, state.inner)
};
},
token:function(stream, state) {
if (state.innerActive) {
var curInner = state.innerActive, oldContent = stream.string;
if (!curInner.close && stream.sol()) return state.innerActive = state.inner = null, 
this.token(stream, state);
var found = curInner.close ? indexOf(oldContent, curInner.close, stream.pos) :-1;
if (found == stream.pos) return stream.match(curInner.close), state.innerActive = state.inner = null, 
curInner.delimStyle;
found > -1 && (stream.string = oldContent.slice(0, found));
var innerToken = curInner.mode.token(stream, state.inner);
return found > -1 && (stream.string = oldContent), curInner.innerStyle && (innerToken = innerToken ? innerToken + " " + curInner.innerStyle :curInner.innerStyle), 
innerToken;
}
for (var cutOff = 1/0, oldContent = stream.string, i = 0; n_others > i; ++i) {
var other = others[i], found = indexOf(oldContent, other.open, stream.pos);
if (found == stream.pos) return stream.match(other.open), state.innerActive = other, 
state.inner = CodeMirror.startState(other.mode, outer.indent ? outer.indent(state.outer, "") :0), 
other.delimStyle;
-1 != found && cutOff > found && (cutOff = found);
}
1/0 != cutOff && (stream.string = oldContent.slice(0, cutOff));
var outerToken = outer.token(stream, state.outer);
return 1/0 != cutOff && (stream.string = oldContent), outerToken;
},
indent:function(state, textAfter) {
var mode = state.innerActive ? state.innerActive.mode :outer;
return mode.indent ? mode.indent(state.innerActive ? state.inner :state.outer, textAfter) :CodeMirror.Pass;
},
blankLine:function(state) {
var mode = state.innerActive ? state.innerActive.mode :outer;
if (mode.blankLine && mode.blankLine(state.innerActive ? state.inner :state.outer), 
state.innerActive) "\n" === state.innerActive.close && (state.innerActive = state.inner = null); else for (var i = 0; n_others > i; ++i) {
var other = others[i];
"\n" === other.open && (state.innerActive = other, state.inner = CodeMirror.startState(other.mode, mode.indent ? mode.indent(state.outer, "") :0));
}
},
electricChars:outer.electricChars,
innerMode:function(state) {
return state.inner ? {
state:state.inner,
mode:state.innerActive.mode
} :{
state:state.outer,
mode:outer
};
}
};
};
});