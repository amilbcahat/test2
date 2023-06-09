CodeMirror.defineMode("gas", function(_config, parserConfig) {
"use strict";
function x86() {
lineCommentStartSymbol = "#", registers.ax = "variable", registers.eax = "variable-2", 
registers.rax = "variable-3", registers.bx = "variable", registers.ebx = "variable-2", 
registers.rbx = "variable-3", registers.cx = "variable", registers.ecx = "variable-2", 
registers.rcx = "variable-3", registers.dx = "variable", registers.edx = "variable-2", 
registers.rdx = "variable-3", registers.si = "variable", registers.esi = "variable-2", 
registers.rsi = "variable-3", registers.di = "variable", registers.edi = "variable-2", 
registers.rdi = "variable-3", registers.sp = "variable", registers.esp = "variable-2", 
registers.rsp = "variable-3", registers.bp = "variable", registers.ebp = "variable-2", 
registers.rbp = "variable-3", registers.ip = "variable", registers.eip = "variable-2", 
registers.rip = "variable-3", registers.cs = "keyword", registers.ds = "keyword", 
registers.ss = "keyword", registers.es = "keyword", registers.fs = "keyword", registers.gs = "keyword";
}
function armv6() {
lineCommentStartSymbol = "@", directives.syntax = "builtin", registers.r0 = "variable", 
registers.r1 = "variable", registers.r2 = "variable", registers.r3 = "variable", 
registers.r4 = "variable", registers.r5 = "variable", registers.r6 = "variable", 
registers.r7 = "variable", registers.r8 = "variable", registers.r9 = "variable", 
registers.r10 = "variable", registers.r11 = "variable", registers.r12 = "variable", 
registers.sp = "variable-2", registers.lr = "variable-2", registers.pc = "variable-2", 
registers.r13 = registers.sp, registers.r14 = registers.lr, registers.r15 = registers.pc, 
custom.push(function(ch, stream) {
return "#" === ch ? (stream.eatWhile(/\w/), "number") :void 0;
});
}
function nextUntilUnescaped(stream, end) {
for (var next, escaped = !1; null != (next = stream.next()); ) {
if (next === end && !escaped) return !1;
escaped = !escaped && "\\" === next;
}
return escaped;
}
function clikeComment(stream, state) {
for (var ch, maybeEnd = !1; null != (ch = stream.next()); ) {
if ("/" === ch && maybeEnd) {
state.tokenize = null;
break;
}
maybeEnd = "*" === ch;
}
return "comment";
}
var custom = [], lineCommentStartSymbol = "", directives = {
".abort":"builtin",
".align":"builtin",
".altmacro":"builtin",
".ascii":"builtin",
".asciz":"builtin",
".balign":"builtin",
".balignw":"builtin",
".balignl":"builtin",
".bundle_align_mode":"builtin",
".bundle_lock":"builtin",
".bundle_unlock":"builtin",
".byte":"builtin",
".cfi_startproc":"builtin",
".comm":"builtin",
".data":"builtin",
".def":"builtin",
".desc":"builtin",
".dim":"builtin",
".double":"builtin",
".eject":"builtin",
".else":"builtin",
".elseif":"builtin",
".end":"builtin",
".endef":"builtin",
".endfunc":"builtin",
".endif":"builtin",
".equ":"builtin",
".equiv":"builtin",
".eqv":"builtin",
".err":"builtin",
".error":"builtin",
".exitm":"builtin",
".extern":"builtin",
".fail":"builtin",
".file":"builtin",
".fill":"builtin",
".float":"builtin",
".func":"builtin",
".global":"builtin",
".gnu_attribute":"builtin",
".hidden":"builtin",
".hword":"builtin",
".ident":"builtin",
".if":"builtin",
".incbin":"builtin",
".include":"builtin",
".int":"builtin",
".internal":"builtin",
".irp":"builtin",
".irpc":"builtin",
".lcomm":"builtin",
".lflags":"builtin",
".line":"builtin",
".linkonce":"builtin",
".list":"builtin",
".ln":"builtin",
".loc":"builtin",
".loc_mark_labels":"builtin",
".local":"builtin",
".long":"builtin",
".macro":"builtin",
".mri":"builtin",
".noaltmacro":"builtin",
".nolist":"builtin",
".octa":"builtin",
".offset":"builtin",
".org":"builtin",
".p2align":"builtin",
".popsection":"builtin",
".previous":"builtin",
".print":"builtin",
".protected":"builtin",
".psize":"builtin",
".purgem":"builtin",
".pushsection":"builtin",
".quad":"builtin",
".reloc":"builtin",
".rept":"builtin",
".sbttl":"builtin",
".scl":"builtin",
".section":"builtin",
".set":"builtin",
".short":"builtin",
".single":"builtin",
".size":"builtin",
".skip":"builtin",
".sleb128":"builtin",
".space":"builtin",
".stab":"builtin",
".string":"builtin",
".struct":"builtin",
".subsection":"builtin",
".symver":"builtin",
".tag":"builtin",
".text":"builtin",
".title":"builtin",
".type":"builtin",
".uleb128":"builtin",
".val":"builtin",
".version":"builtin",
".vtable_entry":"builtin",
".vtable_inherit":"builtin",
".warning":"builtin",
".weak":"builtin",
".weakref":"builtin",
".word":"builtin"
}, registers = {}, arch = (parserConfig.architecture || "x86").toLowerCase();
return "x86" === arch ? x86(parserConfig) :("arm" === arch || "armv6" === arch) && armv6(parserConfig), 
{
startState:function() {
return {
tokenize:null
};
},
token:function(stream, state) {
if (state.tokenize) return state.tokenize(stream, state);
if (stream.eatSpace()) return null;
var style, cur, ch = stream.next();
if ("/" === ch && stream.eat("*")) return state.tokenize = clikeComment, clikeComment(stream, state);
if (ch === lineCommentStartSymbol) return stream.skipToEnd(), "comment";
if ('"' === ch) return nextUntilUnescaped(stream, '"'), "string";
if ("." === ch) return stream.eatWhile(/\w/), cur = stream.current().toLowerCase(), 
style = directives[cur], style || null;
if ("=" === ch) return stream.eatWhile(/\w/), "tag";
if ("{" === ch) return "braket";
if ("}" === ch) return "braket";
if (/\d/.test(ch)) return "0" === ch && stream.eat("x") ? (stream.eatWhile(/[0-9a-fA-F]/), 
"number") :(stream.eatWhile(/\d/), "number");
if (/\w/.test(ch)) return stream.eatWhile(/\w/), stream.eat(":") ? "tag" :(cur = stream.current().toLowerCase(), 
style = registers[cur], style || null);
for (var i = 0; i < custom.length; i++) if (style = custom[i](ch, stream, state)) return style;
},
lineComment:lineCommentStartSymbol,
blockCommentStart:"/*",
blockCommentEnd:"*/"
};
});