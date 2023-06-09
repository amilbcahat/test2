// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("verilog", function(config, parserConfig) {
function words(str) {
for (var obj = {}, words = str.split(" "), i = 0; i < words.length; ++i) obj[words[i]] = !0;
return obj;
}
function tokenBase(stream, state) {
var ch = stream.peek();
if (/[,;:\.]/.test(ch)) return curPunc = stream.next(), null;
if (isBracketChar.test(ch)) return curPunc = stream.next(), "bracket";
if ("`" == ch) return stream.next(), stream.eatWhile(/[\w\$_]/) ? "def" :null;
if ("$" == ch) return stream.next(), stream.eatWhile(/[\w\$_]/) ? "meta" :null;
if ("#" == ch) return stream.next(), stream.eatWhile(/[\d_.]/), "def";
if ('"' == ch) return stream.next(), state.tokenize = tokenString(ch), state.tokenize(stream, state);
if ("/" == ch) {
if (stream.next(), stream.eat("*")) return state.tokenize = tokenComment, tokenComment(stream, state);
if (stream.eat("/")) return stream.skipToEnd(), "comment";
stream.backUp(1);
}
if (stream.match(realLiteral) || stream.match(decimalLiteral) || stream.match(binaryLiteral) || stream.match(octLiteral) || stream.match(hexLiteral) || stream.match(unsignedNumber) || stream.match(realLiteral)) return "number";
if (stream.eatWhile(isOperatorChar)) return "meta";
if (stream.eatWhile(/[\w\$_]/)) {
var cur = stream.current();
return keywords[cur] ? (openClose[cur] && (curPunc = "newblock"), statementKeywords[cur] && (curPunc = "newstatement"), 
curKeyword = cur, "keyword") :"variable";
}
return stream.next(), null;
}
function tokenString(quote) {
return function(stream, state) {
for (var next, escaped = !1, end = !1; null != (next = stream.next()); ) {
if (next == quote && !escaped) {
end = !0;
break;
}
escaped = !escaped && "\\" == next;
}
return (end || !escaped && !multiLineStrings) && (state.tokenize = tokenBase), "string";
};
}
function tokenComment(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("/" == ch && maybeEnd) {
state.tokenize = tokenBase;
break;
}
maybeEnd = "*" == ch;
}
return "comment";
}
function Context(indented, column, type, align, prev) {
this.indented = indented, this.column = column, this.type = type, this.align = align, 
this.prev = prev;
}
function pushContext(state, col, type) {
var indent = state.indented, c = new Context(indent, col, type, null, state.context);
return state.context = c;
}
function popContext(state) {
var t = state.context.type;
return (")" == t || "]" == t || "}" == t) && (state.indented = state.context.indented), 
state.context = state.context.prev;
}
function isClosing(text, contextClosing) {
if (text == contextClosing) return !0;
var closingKeywords = contextClosing.split(";");
for (var i in closingKeywords) if (text == closingKeywords[i]) return !0;
return !1;
}
function buildElectricInputRegEx() {
var allClosings = [];
for (var i in openClose) if (openClose[i]) {
var closings = openClose[i].split(";");
for (var j in closings) allClosings.push(closings[j]);
}
var re = new RegExp("[{}()\\[\\]]|(" + allClosings.join("|") + ")$");
return re;
}
var curPunc, curKeyword, indentUnit = config.indentUnit, statementIndentUnit = parserConfig.statementIndentUnit || indentUnit, dontAlignCalls = parserConfig.dontAlignCalls, noIndentKeywords = parserConfig.noIndentKeywords || [], multiLineStrings = parserConfig.multiLineStrings, keywords = words("accept_on alias always always_comb always_ff always_latch and assert assign assume automatic before begin bind bins binsof bit break buf bufif0 bufif1 byte case casex casez cell chandle checker class clocking cmos config const constraint context continue cover covergroup coverpoint cross deassign default defparam design disable dist do edge else end endcase endchecker endclass endclocking endconfig endfunction endgenerate endgroup endinterface endmodule endpackage endprimitive endprogram endproperty endspecify endsequence endtable endtask enum event eventually expect export extends extern final first_match for force foreach forever fork forkjoin function generate genvar global highz0 highz1 if iff ifnone ignore_bins illegal_bins implements implies import incdir include initial inout input inside instance int integer interconnect interface intersect join join_any join_none large let liblist library local localparam logic longint macromodule matches medium modport module nand negedge nettype new nexttime nmos nor noshowcancelled not notif0 notif1 null or output package packed parameter pmos posedge primitive priority program property protected pull0 pull1 pulldown pullup pulsestyle_ondetect pulsestyle_onevent pure rand randc randcase randsequence rcmos real realtime ref reg reject_on release repeat restrict return rnmos rpmos rtran rtranif0 rtranif1 s_always s_eventually s_nexttime s_until s_until_with scalared sequence shortint shortreal showcancelled signed small soft solve specify specparam static string strong strong0 strong1 struct super supply0 supply1 sync_accept_on sync_reject_on table tagged task this throughout time timeprecision timeunit tran tranif0 tranif1 tri tri0 tri1 triand trior trireg type typedef union unique unique0 unsigned until until_with untyped use uwire var vectored virtual void wait wait_order wand weak weak0 weak1 while wildcard wire with within wor xnor xor"), isOperatorChar = /[\+\-\*\/!~&|^%=?:]/, isBracketChar = /[\[\]{}()]/, unsignedNumber = /\d[0-9_]*/, decimalLiteral = /\d*\s*'s?d\s*\d[0-9_]*/i, binaryLiteral = /\d*\s*'s?b\s*[xz01][xz01_]*/i, octLiteral = /\d*\s*'s?o\s*[xz0-7][xz0-7_]*/i, hexLiteral = /\d*\s*'s?h\s*[0-9a-fxz?][0-9a-fxz?_]*/i, realLiteral = /(\d[\d_]*(\.\d[\d_]*)?E-?[\d_]+)|(\d[\d_]*\.\d[\d_]*)/i, closingBracketOrWord = /^((\w+)|[)}\]])/, closingBracket = /[)}\]]/, blockKeywords = words("case checker class clocking config function generate group interface module packageprimitive program property specify sequence table task"), openClose = {};
for (var keyword in blockKeywords) openClose[keyword] = "end" + keyword;
openClose.begin = "end", openClose.casex = "endcase", openClose.casez = "endcase", 
openClose["do"] = "while", openClose.fork = "join;join_any;join_none";
for (var i in noIndentKeywords) {
var keyword = noIndentKeywords[i];
openClose[keyword] && (openClose[keyword] = void 0);
}
var statementKeywords = words("always always_comb always_ff always_latch assert assign assume else for foreach forever if initial repeat while");
return {
electricInput:buildElectricInputRegEx(),
startState:function(basecolumn) {
return {
tokenize:null,
context:new Context((basecolumn || 0) - indentUnit, 0, "top", !1),
indented:0,
startOfLine:!0
};
},
token:function(stream, state) {
var ctx = state.context;
if (stream.sol() && (null == ctx.align && (ctx.align = !1), state.indented = stream.indentation(), 
state.startOfLine = !0), stream.eatSpace()) return null;
curPunc = null, curKeyword = null;
var style = (state.tokenize || tokenBase)(stream, state);
if ("comment" == style || "meta" == style || "variable" == style) return style;
if (null == ctx.align && (ctx.align = !0), curPunc == ctx.type) popContext(state); else if (";" == curPunc && "statement" == ctx.type || ctx.type && isClosing(curKeyword, ctx.type)) for (ctx = popContext(state); ctx && "statement" == ctx.type; ) ctx = popContext(state); else if ("{" == curPunc) pushContext(state, stream.column(), "}"); else if ("[" == curPunc) pushContext(state, stream.column(), "]"); else if ("(" == curPunc) pushContext(state, stream.column(), ")"); else if (ctx && "endcase" == ctx.type && ":" == curPunc) pushContext(state, stream.column(), "statement"); else if ("newstatement" == curPunc) pushContext(state, stream.column(), "statement"); else if ("newblock" == curPunc) {
var close = openClose[curKeyword];
pushContext(state, stream.column(), close);
}
return state.startOfLine = !1, style;
},
indent:function(state, textAfter) {
if (state.tokenize != tokenBase && null != state.tokenize) return CodeMirror.Pass;
var ctx = state.context, firstChar = textAfter && textAfter.charAt(0);
"statement" == ctx.type && "}" == firstChar && (ctx = ctx.prev);
var closing = !1, possibleClosing = textAfter.match(closingBracketOrWord);
return possibleClosing && (closing = isClosing(possibleClosing[0], ctx.type)), "statement" == ctx.type ? ctx.indented + ("{" == firstChar ? 0 :statementIndentUnit) :closingBracket.test(ctx.type) && ctx.align && !dontAlignCalls ? ctx.column + (closing ? 0 :1) :")" != ctx.type || closing ? ctx.indented + (closing ? 0 :indentUnit) :ctx.indented + statementIndentUnit;
},
blockCommentStart:"/*",
blockCommentEnd:"*/",
lineComment:"//"
};
}), CodeMirror.defineMIME("text/x-verilog", {
name:"verilog"
}), CodeMirror.defineMIME("text/x-systemverilog", {
name:"systemverilog"
});
});