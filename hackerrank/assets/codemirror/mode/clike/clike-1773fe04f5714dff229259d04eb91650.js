// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function words(str) {
for (var obj = {}, words = str.split(" "), i = 0; i < words.length; ++i) obj[words[i]] = !0;
return obj;
}
function cppHook(stream, state) {
if (!state.startOfLine) return !1;
for (;;) {
if (!stream.skipTo("\\")) {
stream.skipToEnd(), state.tokenize = null;
break;
}
if (stream.next(), stream.eol()) {
state.tokenize = cppHook;
break;
}
}
return "meta";
}
function cpp11StringHook(stream, state) {
if (stream.backUp(1), stream.match(/(R|u8R|uR|UR|LR)/)) {
var match = stream.match(/"([^\s\\()]{0,16})\(/);
return match ? (state.cpp11RawStringDelim = match[1], state.tokenize = tokenRawString, 
tokenRawString(stream, state)) :!1;
}
return stream.match(/(u8|u|U|L)/) ? stream.match(/["']/, !1) ? "string" :!1 :(stream.next(), 
!1);
}
function tokenAtString(stream, state) {
for (var next; null != (next = stream.next()); ) if ('"' == next && !stream.eat('"')) {
state.tokenize = null;
break;
}
return "string";
}
function tokenRawString(stream, state) {
var delim = state.cpp11RawStringDelim.replace(/[^\w\s]/g, "\\$&"), match = stream.match(new RegExp(".*?\\)" + delim + '"'));
return match ? state.tokenize = null :stream.skipToEnd(), "string";
}
function def(mimes, mode) {
function add(obj) {
if (obj) for (var prop in obj) obj.hasOwnProperty(prop) && words.push(prop);
}
"string" == typeof mimes && (mimes = [ mimes ]);
var words = [];
add(mode.keywords), add(mode.builtin), add(mode.atoms), words.length && (mode.helperType = mimes[0], 
CodeMirror.registerHelper("hintWords", mimes[0], words));
for (var i = 0; i < mimes.length; ++i) CodeMirror.defineMIME(mimes[i], mode);
}
CodeMirror.defineMode("clike", function(config, parserConfig) {
function tokenBase(stream, state) {
var ch = stream.next();
if (hooks[ch]) {
var result = hooks[ch](stream, state);
if (result !== !1) return result;
}
if ('"' == ch || "'" == ch) return state.tokenize = tokenString(ch), state.tokenize(stream, state);
if (/[\[\]{}\(\),;\:\.]/.test(ch)) return curPunc = ch, null;
if (/\d/.test(ch)) return stream.eatWhile(/[\w\.]/), "number";
if ("/" == ch) {
if (stream.eat("*")) return state.tokenize = tokenComment, tokenComment(stream, state);
if (stream.eat("/")) return stream.skipToEnd(), "comment";
}
if (isOperatorChar.test(ch)) return stream.eatWhile(isOperatorChar), "operator";
stream.eatWhile(/[\w\$_]/);
var cur = stream.current();
return keywords.propertyIsEnumerable(cur) ? (blockKeywords.propertyIsEnumerable(cur) && (curPunc = "newstatement"), 
"keyword") :builtin.propertyIsEnumerable(cur) ? (blockKeywords.propertyIsEnumerable(cur) && (curPunc = "newstatement"), 
"builtin") :atoms.propertyIsEnumerable(cur) ? "atom" :"variable";
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
return (end || !escaped && !multiLineStrings) && (state.tokenize = null), "string";
};
}
function tokenComment(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("/" == ch && maybeEnd) {
state.tokenize = null;
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
var indent = state.indented;
return state.context && "statement" == state.context.type && (indent = state.context.indented), 
state.context = new Context(indent, col, type, null, state.context);
}
function popContext(state) {
var t = state.context.type;
return (")" == t || "]" == t || "}" == t) && (state.indented = state.context.indented), 
state.context = state.context.prev;
}
var curPunc, indentUnit = config.indentUnit, statementIndentUnit = parserConfig.statementIndentUnit || indentUnit, dontAlignCalls = parserConfig.dontAlignCalls, keywords = parserConfig.keywords || {}, builtin = parserConfig.builtin || {}, blockKeywords = parserConfig.blockKeywords || {}, atoms = parserConfig.atoms || {}, hooks = parserConfig.hooks || {}, multiLineStrings = parserConfig.multiLineStrings, isOperatorChar = /[+\-*&%=<>!?|\/]/;
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
if (null == ctx.align && (ctx.align = !0), ";" != curPunc && ":" != curPunc && "," != curPunc || "statement" != ctx.type) if ("{" == curPunc) pushContext(state, stream.column(), "}"); else if ("[" == curPunc) pushContext(state, stream.column(), "]"); else if ("(" == curPunc) pushContext(state, stream.column(), ")"); else if ("}" == curPunc) {
for (;"statement" == ctx.type; ) ctx = popContext(state);
for ("}" == ctx.type && (ctx = popContext(state)); "statement" == ctx.type; ) ctx = popContext(state);
} else curPunc == ctx.type ? popContext(state) :(("}" == ctx.type || "top" == ctx.type) && ";" != curPunc || "statement" == ctx.type && "newstatement" == curPunc) && pushContext(state, stream.column(), "statement"); else popContext(state);
return state.startOfLine = !1, style;
},
indent:function(state, textAfter) {
if (state.tokenize != tokenBase && null != state.tokenize) return CodeMirror.Pass;
var ctx = state.context, firstChar = textAfter && textAfter.charAt(0);
"statement" == ctx.type && "}" == firstChar && (ctx = ctx.prev);
var closing = firstChar == ctx.type;
return "statement" == ctx.type ? ctx.indented + ("{" == firstChar ? 0 :statementIndentUnit) :!ctx.align || dontAlignCalls && ")" == ctx.type ? ")" != ctx.type || closing ? ctx.indented + (closing ? 0 :indentUnit) :ctx.indented + statementIndentUnit :ctx.column + (closing ? 0 :1);
},
electricChars:"{}",
blockCommentStart:"/*",
blockCommentEnd:"*/",
lineComment:"//",
fold:"brace"
};
});
var cKeywords = "auto if break int case long char register continue return default short do sizeof double static else struct entry switch extern typedef float union for unsigned goto while enum void const signed volatile";
def([ "text/x-csrc", "text/x-c", "text/x-chdr" ], {
name:"clike",
keywords:words(cKeywords),
blockKeywords:words("case do else for if switch while struct"),
atoms:words("null"),
hooks:{
"#":cppHook
},
modeProps:{
fold:[ "brace", "include" ]
}
}), def([ "text/x-c++src", "text/x-c++hdr" ], {
name:"clike",
keywords:words(cKeywords + " asm dynamic_cast namespace reinterpret_cast try bool explicit new static_cast typeid catch operator template typename class friend private this using const_cast inline public throw virtual delete mutable protected wchar_t alignas alignof constexpr decltype nullptr noexcept thread_local final static_assert override"),
blockKeywords:words("catch class do else finally for if struct switch try while"),
atoms:words("true false null"),
hooks:{
"#":cppHook,
u:cpp11StringHook,
U:cpp11StringHook,
L:cpp11StringHook,
R:cpp11StringHook
},
modeProps:{
fold:[ "brace", "include" ]
}
}), def("text/x-java", {
name:"clike",
keywords:words("abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while"),
blockKeywords:words("catch class do else finally for if switch try while"),
atoms:words("true false null"),
hooks:{
"@":function(stream) {
return stream.eatWhile(/[\w\$_]/), "meta";
}
},
modeProps:{
fold:[ "brace", "import" ]
}
}), def("text/x-csharp", {
name:"clike",
keywords:words("abstract as base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),
blockKeywords:words("catch class do else finally for foreach if struct switch try while"),
builtin:words("Boolean Byte Char DateTime DateTimeOffset Decimal Double Guid Int16 Int32 Int64 Object SByte Single String TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong"),
atoms:words("true false null"),
hooks:{
"@":function(stream, state) {
return stream.eat('"') ? (state.tokenize = tokenAtString, tokenAtString(stream, state)) :(stream.eatWhile(/[\w\$_]/), 
"meta");
}
}
}), def("text/x-scala", {
name:"clike",
keywords:words("abstract case catch class def do else extends false final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try trye type val var while with yield _ : = => <- <: <% >: # @ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector :: #:: Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),
blockKeywords:words("catch class do else finally for forSome if match switch try while"),
atoms:words("true false null"),
hooks:{
"@":function(stream) {
return stream.eatWhile(/[\w\$_]/), "meta";
}
}
}), def([ "x-shader/x-vertex", "x-shader/x-fragment" ], {
name:"clike",
keywords:words("float int bool void vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 mat2 mat3 mat4 sampler1D sampler2D sampler3D samplerCube sampler1DShadow sampler2DShadowconst attribute uniform varying break continue discard return for while do if else struct in out inout"),
blockKeywords:words("for while do if else struct"),
builtin:words("radians degrees sin cos tan asin acos atan pow exp log exp2 sqrt inversesqrt abs sign floor ceil fract mod min max clamp mix step smootstep length distance dot cross normalize ftransform faceforward reflect refract matrixCompMult lessThan lessThanEqual greaterThan greaterThanEqual equal notEqual any all not texture1D texture1DProj texture1DLod texture1DProjLod texture2D texture2DProj texture2DLod texture2DProjLod texture3D texture3DProj texture3DLod texture3DProjLod textureCube textureCubeLod shadow1D shadow2D shadow1DProj shadow2DProj shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod dFdx dFdy fwidth noise1 noise2 noise3 noise4"),
atoms:words("true false gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_FogCoord gl_Position gl_PointSize gl_ClipVertex gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor gl_TexCoord gl_FogFragCoord gl_FragCoord gl_FrontFacing gl_FragColor gl_FragData gl_FragDepth gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse gl_TexureMatrixTranspose gl_ModelViewMatrixInverseTranspose gl_ProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixInverseTranspose gl_TextureMatrixInverseTranspose gl_NormalScale gl_DepthRange gl_ClipPlane gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel gl_FrontLightModelProduct gl_BackLightModelProduct gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ gl_FogParameters gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits gl_MaxDrawBuffers"),
hooks:{
"#":cppHook
},
modeProps:{
fold:[ "brace", "include" ]
}
});
});