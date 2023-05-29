// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.overlayMode = function(base, overlay, combine) {
return {
startState:function() {
return {
base:CodeMirror.startState(base),
overlay:CodeMirror.startState(overlay),
basePos:0,
baseCur:null,
overlayPos:0,
overlayCur:null,
lineSeen:null
};
},
copyState:function(state) {
return {
base:CodeMirror.copyState(base, state.base),
overlay:CodeMirror.copyState(overlay, state.overlay),
basePos:state.basePos,
baseCur:null,
overlayPos:state.overlayPos,
overlayCur:null
};
},
token:function(stream, state) {
return (stream.sol() || stream.string != state.lineSeen || Math.min(state.basePos, state.overlayPos) < stream.start) && (state.lineSeen = stream.string, 
state.basePos = state.overlayPos = stream.start), stream.start == state.basePos && (state.baseCur = base.token(stream, state.base), 
state.basePos = stream.pos), stream.start == state.overlayPos && (stream.pos = stream.start, 
state.overlayCur = overlay.token(stream, state.overlay), state.overlayPos = stream.pos), 
stream.pos = Math.min(state.basePos, state.overlayPos), null == state.overlayCur ? state.baseCur :null != state.baseCur && state.overlay.combineTokens || combine && null == state.overlay.combineTokens ? state.baseCur + " " + state.overlayCur :state.overlayCur;
},
indent:base.indent && function(state, textAfter) {
return base.indent(state.base, textAfter);
},
electricChars:base.electricChars,
innerMode:function(state) {
return {
state:state.base,
mode:base
};
},
blankLine:function(state) {
base.blankLine && base.blankLine(state.base), overlay.blankLine && overlay.blankLine(state.overlay);
}
};
};
});