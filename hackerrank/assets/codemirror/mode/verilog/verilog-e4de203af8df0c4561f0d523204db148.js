CodeMirror.defineMode("verilog", function(config, parserConfig) {
function tokenBase(stream, state) {
var ch = stream.next();
if (hooks[ch]) {
var result = hooks[ch](stream, state);
if (result !== !1) return result;
}
if ('"' == ch) return state.tokenize = tokenString(ch), state.tokenize(stream, state);
if (/[\[\]{}\(\),;\:\.]/.test(ch)) return curPunc = ch, null;
if (/[\d']/.test(ch)) return stream.eatWhile(/[\w\.']/), "number";
if ("/" == ch) {
if (stream.eat("*")) return state.tokenize = tokenComment, tokenComment(stream, state);
if (stream.eat("/")) return stream.skipToEnd(), "comment";
}
if (isOperatorChar.test(ch)) return stream.eatWhile(isOperatorChar), "operator";
stream.eatWhile(/[\w\$_]/);
var cur = stream.current();
return keywords.propertyIsEnumerable(cur) ? (blockKeywords.propertyIsEnumerable(cur) && (curPunc = "newstatement"), 
"keyword") :atoms.propertyIsEnumerable(cur) ? "atom" :"variable";
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
return state.context = new Context(state.indented, col, type, null, state.context);
}
function popContext(state) {
var t = state.context.type;
return (")" == t || "]" == t || "}" == t) && (state.indented = state.context.indented), 
state.context = state.context.prev;
}
var curPunc, indentUnit = config.indentUnit, keywords = parserConfig.keywords || {}, blockKeywords = parserConfig.blockKeywords || {}, atoms = parserConfig.atoms || {}, hooks = parserConfig.hooks || {}, multiLineStrings = parserConfig.multiLineStrings, isOperatorChar = /[&|~><!\)\(*#%@+\/=?\:;}{,\.\^\-\[\]]/;
return {
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
curPunc = null;
var style = (state.tokenize || tokenBase)(stream, state);
if ("comment" == style || "meta" == style) return style;
if (null == ctx.align && (ctx.align = !0), ";" != curPunc && ":" != curPunc || "statement" != ctx.type) if ("{" == curPunc) pushContext(state, stream.column(), "}"); else if ("[" == curPunc) pushContext(state, stream.column(), "]"); else if ("(" == curPunc) pushContext(state, stream.column(), ")"); else if ("}" == curPunc) {
for (;"statement" == ctx.type; ) ctx = popContext(state);
for ("}" == ctx.type && (ctx = popContext(state)); "statement" == ctx.type; ) ctx = popContext(state);
} else curPunc == ctx.type ? popContext(state) :("}" == ctx.type || "top" == ctx.type || "statement" == ctx.type && "newstatement" == curPunc) && pushContext(state, stream.column(), "statement"); else popContext(state);
return state.startOfLine = !1, style;
},
indent:function(state, textAfter) {
if (state.tokenize != tokenBase && null != state.tokenize) return 0;
var firstChar = textAfter && textAfter.charAt(0), ctx = state.context, closing = firstChar == ctx.type;
return "statement" == ctx.type ? ctx.indented + ("{" == firstChar ? 0 :indentUnit) :ctx.align ? ctx.column + (closing ? 0 :1) :ctx.indented + (closing ? 0 :indentUnit);
},
electricChars:"{}"
};
}), function() {
function words(str) {
for (var obj = {}, words = str.split(" "), i = 0; i < words.length; ++i) obj[words[i]] = !0;
return obj;
}
function metaHook(stream) {
return stream.eatWhile(/[\w\$_]/), "meta";
}
var verilogKeywords = "always and assign automatic begin buf bufif0 bufif1 case casex casez cell cmos config deassign default defparam design disable edge else end endcase endconfig endfunction endgenerate endmodule endprimitive endspecify endtable endtask event for force forever fork function generate genvar highz0 highz1 if ifnone incdir include initial inout input instance integer join large liblist library localparam macromodule medium module nand negedge nmos nor noshowcancelled not notif0 notif1 or output parameter pmos posedge primitive pull0 pull1 pulldown pullup pulsestyle_onevent pulsestyle_ondetect rcmos real realtime reg release repeat rnmos rpmos rtran rtranif0 rtranif1 scalared showcancelled signed small specify specparam strong0 strong1 supply0 supply1 table task time tran tranif0 tranif1 tri tri0 tri1 triand trior trireg unsigned use vectored wait wand weak0 weak1 while wire wor xnor xor", verilogBlockKeywords = "begin bufif0 bufif1 case casex casez config else end endcase endconfig endfunction endgenerate endmodule endprimitive endspecify endtable endtask for forever function generate if ifnone macromodule module primitive repeat specify table task while";
CodeMirror.defineMIME("text/x-verilog", {
name:"verilog",
keywords:words(verilogKeywords),
blockKeywords:words(verilogBlockKeywords),
atoms:words("null"),
hooks:{
"`":metaHook,
$:metaHook
}
});
}();