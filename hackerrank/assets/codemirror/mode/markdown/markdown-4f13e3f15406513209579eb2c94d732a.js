CodeMirror.defineMode("markdown", function(cmCfg, modeCfg) {
function switchInline(stream, state, f) {
return state.f = state.inline = f, f(stream, state);
}
function switchBlock(stream, state, f) {
return state.f = state.block = f, f(stream, state);
}
function blankLine(state) {
return state.linkTitle = !1, state.em = !1, state.strong = !1, state.quote = 0, 
htmlFound || state.f != htmlBlock || (state.f = inlineNormal, state.block = blockNormal), 
state.trailingSpace = 0, state.trailingSpaceNewLine = !1, state.thisLineHasContent = !1, 
null;
}
function blockNormal(stream, state) {
var sol = stream.sol(), prevLineIsList = state.list !== !1;
state.list !== !1 && state.indentationDiff >= 0 ? (state.indentationDiff < 4 && (state.indentation -= state.indentationDiff), 
state.list = null) :state.list !== !1 && state.indentation > 0 ? (state.list = null, 
state.listDepth = Math.floor(state.indentation / 4)) :state.list !== !1 && (state.list = !1, 
state.listDepth = 0);
var match = null;
if (state.indentationDiff >= 4) return state.indentation -= 4, stream.skipToEnd(), 
code;
if (stream.eatSpace()) return null;
if (match = stream.match(atxHeaderRE)) return state.header = match[0].length <= 6 ? match[0].length :6, 
modeCfg.highlightFormatting && (state.formatting = "header"), state.f = state.inline, 
getType(state);
if (state.prevLineHasContent && (match = stream.match(setextHeaderRE))) return state.header = "=" == match[0].charAt(0) ? 1 :2, 
modeCfg.highlightFormatting && (state.formatting = "header"), state.f = state.inline, 
getType(state);
if (stream.eat(">")) return state.indentation++, state.quote = sol ? 1 :state.quote + 1, 
modeCfg.highlightFormatting && (state.formatting = "quote"), stream.eatSpace(), 
getType(state);
if ("[" === stream.peek()) return switchInline(stream, state, footnoteLink);
if (stream.match(hrRE, !0)) return hr;
if ((!state.prevLineHasContent || prevLineIsList) && (stream.match(ulRE, !1) || stream.match(olRE, !1))) {
var listType = null;
return stream.match(ulRE, !0) ? listType = "ul" :(stream.match(olRE, !0), listType = "ol"), 
state.indentation += 4, state.list = !0, state.listDepth++, modeCfg.taskLists && stream.match(taskListRE, !1) && (state.taskList = !0), 
state.f = state.inline, modeCfg.highlightFormatting && (state.formatting = [ "list", "list-" + listType ]), 
getType(state);
}
return modeCfg.fencedCodeBlocks && stream.match(/^```([\w+#]*)/, !0) ? (state.localMode = getMode(RegExp.$1), 
state.localMode && (state.localState = state.localMode.startState()), switchBlock(stream, state, local), 
modeCfg.highlightFormatting && (state.formatting = "code-block"), state.code = !0, 
getType(state)) :switchInline(stream, state, state.inline);
}
function htmlBlock(stream, state) {
var style = htmlMode.token(stream, state.htmlState);
return (htmlFound && !state.htmlState.tagName && !state.htmlState.context || state.md_inside && stream.current().indexOf(">") > -1) && (state.f = inlineNormal, 
state.block = blockNormal, state.htmlState = null), style;
}
function local(stream, state) {
if (stream.sol() && stream.match(/^```/, !0)) {
state.localMode = state.localState = null, state.f = inlineNormal, state.block = blockNormal, 
modeCfg.highlightFormatting && (state.formatting = "code-block"), state.code = !0;
var returnType = getType(state);
return state.code = !1, returnType;
}
return state.localMode ? state.localMode.token(stream, state.localState) :(stream.skipToEnd(), 
code);
}
function getType(state) {
var styles = [];
if (state.formatting) {
styles.push(formatting), "string" == typeof state.formatting && (state.formatting = [ state.formatting ]);
for (var i = 0; i < state.formatting.length; i++) styles.push(formatting + "-" + state.formatting[i]), 
"header" === state.formatting[i] && styles.push(formatting + "-" + state.formatting[i] + "-" + state.header), 
"quote" === state.formatting[i] && (!modeCfg.maxBlockquoteDepth || modeCfg.maxBlockquoteDepth >= state.quote ? styles.push(formatting + "-" + state.formatting[i] + "-" + state.quote) :styles.push("error"));
}
if (state.taskOpen) return styles.push("meta"), styles.length ? styles.join(" ") :null;
if (state.taskClosed) return styles.push("property"), styles.length ? styles.join(" ") :null;
if (state.linkHref) return styles.push(linkhref), styles.length ? styles.join(" ") :null;
if (state.strong && styles.push(strong), state.em && styles.push(em), state.linkText && styles.push(linktext), 
state.code && styles.push(code), state.header && (styles.push(header), styles.push(header + "-" + state.header)), 
state.quote && (styles.push(quote), !modeCfg.maxBlockquoteDepth || modeCfg.maxBlockquoteDepth >= state.quote ? styles.push(quote + "-" + state.quote) :styles.push(quote + "-" + modeCfg.maxBlockquoteDepth)), 
state.list !== !1) {
var listMod = (state.listDepth - 1) % 3;
listMod ? 1 === listMod ? styles.push(list2) :styles.push(list3) :styles.push(list1);
}
return state.trailingSpaceNewLine ? styles.push("trailing-space-new-line") :state.trailingSpace && styles.push("trailing-space-" + (state.trailingSpace % 2 ? "a" :"b")), 
styles.length ? styles.join(" ") :null;
}
function handleText(stream, state) {
return stream.match(textRE, !0) ? getType(state) :void 0;
}
function inlineNormal(stream, state) {
var style = state.text(stream, state);
if ("undefined" != typeof style) return style;
if (state.list) return state.list = null, getType(state);
if (state.taskList) {
var taskOpen = "x" !== stream.match(taskListRE, !0)[1];
return taskOpen ? state.taskOpen = !0 :state.taskClosed = !0, modeCfg.highlightFormatting && (state.formatting = "task"), 
state.taskList = !1, getType(state);
}
if (state.taskOpen = !1, state.taskClosed = !1, state.header && stream.match(/^#+$/, !0)) return modeCfg.highlightFormatting && (state.formatting = "header"), 
getType(state);
var sol = stream.sol(), ch = stream.next();
if (state.escape) return state.escape = !1, getType(state);
if ("\\" === ch) return modeCfg.highlightFormatting && (state.formatting = "escape"), 
state.escape = !0, getType(state);
if (state.linkTitle) {
state.linkTitle = !1;
var matchCh = ch;
"(" === ch && (matchCh = ")"), matchCh = (matchCh + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
var regex = "^\\s*(?:[^" + matchCh + "\\\\]+|\\\\\\\\|\\\\.)" + matchCh;
if (stream.match(new RegExp(regex), !0)) return linkhref;
}
if ("`" === ch) {
var previousFormatting = state.formatting;
modeCfg.highlightFormatting && (state.formatting = "code");
var t = getType(state), before = stream.pos;
stream.eatWhile("`");
var difference = 1 + stream.pos - before;
return state.code ? difference === codeDepth ? (state.code = !1, t) :(state.formatting = previousFormatting, 
getType(state)) :(codeDepth = difference, state.code = !0, getType(state));
}
if (state.code) return getType(state);
if ("!" === ch && stream.match(/\[[^\]]*\] ?(?:\(|\[)/, !1)) return stream.match(/\[[^\]]*\]/), 
state.inline = state.f = linkHref, image;
if ("[" === ch && stream.match(/.*\](\(| ?\[)/, !1)) return state.linkText = !0, 
modeCfg.highlightFormatting && (state.formatting = "link"), getType(state);
if ("]" === ch && state.linkText) {
modeCfg.highlightFormatting && (state.formatting = "link");
var type = getType(state);
return state.linkText = !1, state.inline = state.f = linkHref, type;
}
if ("<" === ch && stream.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !1)) {
state.f = state.inline = linkInline, modeCfg.highlightFormatting && (state.formatting = "link");
var type = getType(state);
return type ? type += " " :type = "", type + linkinline;
}
if ("<" === ch && stream.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !1)) {
state.f = state.inline = linkInline, modeCfg.highlightFormatting && (state.formatting = "link");
var type = getType(state);
return type ? type += " " :type = "", type + linkemail;
}
if ("<" === ch && stream.match(/^\w/, !1)) {
if (-1 != stream.string.indexOf(">")) {
var atts = stream.string.substring(1, stream.string.indexOf(">"));
/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(atts) && (state.md_inside = !0);
}
return stream.backUp(1), state.htmlState = CodeMirror.startState(htmlMode), switchBlock(stream, state, htmlBlock);
}
if ("<" === ch && stream.match(/^\/\w*?>/)) return state.md_inside = !1, "tag";
var ignoreUnderscore = !1;
if (!modeCfg.underscoresBreakWords && "_" === ch && "_" !== stream.peek() && stream.match(/(\w)/, !1)) {
var prevPos = stream.pos - 2;
if (prevPos >= 0) {
var prevCh = stream.string.charAt(prevPos);
"_" !== prevCh && prevCh.match(/(\w)/, !1) && (ignoreUnderscore = !0);
}
}
if ("*" === ch || "_" === ch && !ignoreUnderscore) if (sol && " " === stream.peek()) ; else {
if (state.strong === ch && stream.eat(ch)) {
modeCfg.highlightFormatting && (state.formatting = "strong");
var t = getType(state);
return state.strong = !1, t;
}
if (!state.strong && stream.eat(ch)) return state.strong = ch, modeCfg.highlightFormatting && (state.formatting = "strong"), 
getType(state);
if (state.em === ch) {
modeCfg.highlightFormatting && (state.formatting = "em");
var t = getType(state);
return state.em = !1, t;
}
if (!state.em) return state.em = ch, modeCfg.highlightFormatting && (state.formatting = "em"), 
getType(state);
} else if (" " === ch && (stream.eat("*") || stream.eat("_"))) {
if (" " === stream.peek()) return getType(state);
stream.backUp(1);
}
return " " === ch && (stream.match(/ +$/, !1) ? state.trailingSpace++ :state.trailingSpace && (state.trailingSpaceNewLine = !0)), 
getType(state);
}
function linkInline(stream, state) {
var ch = stream.next();
if (">" === ch) {
state.f = state.inline = inlineNormal, modeCfg.highlightFormatting && (state.formatting = "link");
var type = getType(state);
return type ? type += " " :type = "", type + linkinline;
}
return stream.match(/^[^>]+/, !0), linkinline;
}
function linkHref(stream, state) {
if (stream.eatSpace()) return null;
var ch = stream.next();
return "(" === ch || "[" === ch ? (state.f = state.inline = getLinkHrefInside("(" === ch ? ")" :"]"), 
modeCfg.highlightFormatting && (state.formatting = "link-string"), state.linkHref = !0, 
getType(state)) :"error";
}
function getLinkHrefInside(endChar) {
return function(stream, state) {
var ch = stream.next();
if (ch === endChar) {
state.f = state.inline = inlineNormal, modeCfg.highlightFormatting && (state.formatting = "link-string");
var returnState = getType(state);
return state.linkHref = !1, returnState;
}
return stream.match(inlineRE(endChar), !0) && stream.backUp(1), state.linkHref = !0, 
getType(state);
};
}
function footnoteLink(stream, state) {
return stream.match(/^[^\]]*\]:/, !1) ? (state.f = footnoteLinkInside, stream.next(), 
modeCfg.highlightFormatting && (state.formatting = "link"), state.linkText = !0, 
getType(state)) :switchInline(stream, state, inlineNormal);
}
function footnoteLinkInside(stream, state) {
if (stream.match(/^\]:/, !0)) {
state.f = state.inline = footnoteUrl, modeCfg.highlightFormatting && (state.formatting = "link");
var returnType = getType(state);
return state.linkText = !1, returnType;
}
return stream.match(/^[^\]]+/, !0), linktext;
}
function footnoteUrl(stream, state) {
return stream.eatSpace() ? null :(stream.match(/^[^\s]+/, !0), void 0 === stream.peek() ? state.linkTitle = !0 :stream.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/, !0), 
state.f = state.inline = inlineNormal, linkhref);
}
function inlineRE(endChar) {
return savedInlineRE[endChar] || (endChar = (endChar + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), 
savedInlineRE[endChar] = new RegExp("^(?:[^\\\\]|\\\\.)*?(" + endChar + ")")), savedInlineRE[endChar];
}
var htmlFound = CodeMirror.modes.hasOwnProperty("xml"), htmlMode = CodeMirror.getMode(cmCfg, htmlFound ? {
name:"xml",
htmlMode:!0
} :"text/plain"), aliases = {
html:"htmlmixed",
js:"javascript",
json:"application/json",
c:"text/x-csrc",
"c++":"text/x-c++src",
java:"text/x-java",
csharp:"text/x-csharp",
"c#":"text/x-csharp",
scala:"text/x-scala"
}, getMode = function() {
var i, mime, modes = {}, mimes = {}, list = [];
for (var m in CodeMirror.modes) CodeMirror.modes.propertyIsEnumerable(m) && list.push(m);
for (i = 0; i < list.length; i++) modes[list[i]] = list[i];
var mimesList = [];
for (var m in CodeMirror.mimeModes) CodeMirror.mimeModes.propertyIsEnumerable(m) && mimesList.push({
mime:m,
mode:CodeMirror.mimeModes[m]
});
for (i = 0; i < mimesList.length; i++) mime = mimesList[i].mime, mimes[mime] = mimesList[i].mime;
for (var a in aliases) (aliases[a] in modes || aliases[a] in mimes) && (modes[a] = aliases[a]);
return function(lang) {
return modes[lang] ? CodeMirror.getMode(cmCfg, modes[lang]) :null;
};
}();
void 0 === modeCfg.highlightFormatting && (modeCfg.highlightFormatting = !1), void 0 === modeCfg.maxBlockquoteDepth && (modeCfg.maxBlockquoteDepth = 0), 
void 0 === modeCfg.underscoresBreakWords && (modeCfg.underscoresBreakWords = !0), 
void 0 === modeCfg.fencedCodeBlocks && (modeCfg.fencedCodeBlocks = !1), void 0 === modeCfg.taskLists && (modeCfg.taskLists = !1);
var codeDepth = 0, header = "header", code = "comment", quote = "quote", list1 = "variable-2", list2 = "variable-3", list3 = "keyword", hr = "hr", image = "tag", formatting = "formatting", linkinline = "link", linkemail = "link", linktext = "link", linkhref = "string", em = "em", strong = "strong", hrRE = /^([*\-=_])(?:\s*\1){2,}\s*$/, ulRE = /^[*\-+]\s+/, olRE = /^[0-9]+\.\s+/, taskListRE = /^\[(x| )\](?=\s)/, atxHeaderRE = /^#+/, setextHeaderRE = /^(?:\={1,}|-{1,})$/, textRE = /^[^#!\[\]*_\\<>` "'(]+/, savedInlineRE = [], mode = {
startState:function() {
return {
f:blockNormal,
prevLineHasContent:!1,
thisLineHasContent:!1,
block:blockNormal,
htmlState:null,
indentation:0,
inline:inlineNormal,
text:handleText,
escape:!1,
formatting:!1,
linkText:!1,
linkHref:!1,
linkTitle:!1,
em:!1,
strong:!1,
header:0,
taskList:!1,
list:!1,
listDepth:0,
quote:0,
trailingSpace:0,
trailingSpaceNewLine:!1
};
},
copyState:function(s) {
return {
f:s.f,
prevLineHasContent:s.prevLineHasContent,
thisLineHasContent:s.thisLineHasContent,
block:s.block,
htmlState:s.htmlState && CodeMirror.copyState(htmlMode, s.htmlState),
indentation:s.indentation,
localMode:s.localMode,
localState:s.localMode ? CodeMirror.copyState(s.localMode, s.localState) :null,
inline:s.inline,
text:s.text,
escape:!1,
formatting:!1,
linkTitle:s.linkTitle,
em:s.em,
strong:s.strong,
header:s.header,
taskList:s.taskList,
list:s.list,
listDepth:s.listDepth,
quote:s.quote,
trailingSpace:s.trailingSpace,
trailingSpaceNewLine:s.trailingSpaceNewLine,
md_inside:s.md_inside
};
},
token:function(stream, state) {
if (state.formatting = !1, stream.sol()) {
var forceBlankLine = stream.match(/^\s*$/, !0) || state.header;
if (state.header = 0, forceBlankLine) return state.prevLineHasContent = !1, blankLine(state);
state.prevLineHasContent = state.thisLineHasContent, state.thisLineHasContent = !0, 
state.escape = !1, state.taskList = !1, state.code = !1, state.trailingSpace = 0, 
state.trailingSpaceNewLine = !1, state.f = state.block;
var indentation = stream.match(/^\s*/, !0)[0].replace(/\t/g, "    ").length, difference = 4 * Math.floor((indentation - state.indentation) / 4);
difference > 4 && (difference = 4);
var adjustedIndentation = state.indentation + difference;
if (state.indentationDiff = adjustedIndentation - state.indentation, state.indentation = adjustedIndentation, 
indentation > 0) return null;
}
return state.f(stream, state);
},
innerMode:function(state) {
return state.block == htmlBlock ? {
state:state.htmlState,
mode:htmlMode
} :state.localState ? {
state:state.localState,
mode:state.localMode
} :{
state:state,
mode:mode
};
},
blankLine:blankLine,
getType:getType,
fold:"markdown"
};
return mode;
}, "xml"), CodeMirror.defineMIME("text/x-markdown", "markdown");