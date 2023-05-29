// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../lib/codemirror"), require("../addon/search/searchcursor"), require("../addon/dialog/dialog"), require("../addon/edit/matchbrackets.js")) :"function" == typeof define && define.amd ? define([ "../lib/codemirror", "../addon/search/searchcursor", "../addon/dialog/dialog", "../addon/edit/matchbrackets" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
var defaultKeymap = [ {
keys:[ "<Left>" ],
type:"keyToKey",
toKeys:[ "h" ]
}, {
keys:[ "<Right>" ],
type:"keyToKey",
toKeys:[ "l" ]
}, {
keys:[ "<Up>" ],
type:"keyToKey",
toKeys:[ "k" ]
}, {
keys:[ "<Down>" ],
type:"keyToKey",
toKeys:[ "j" ]
}, {
keys:[ "<Space>" ],
type:"keyToKey",
toKeys:[ "l" ]
}, {
keys:[ "<BS>" ],
type:"keyToKey",
toKeys:[ "h" ]
}, {
keys:[ "<C-Space>" ],
type:"keyToKey",
toKeys:[ "W" ]
}, {
keys:[ "<C-BS>" ],
type:"keyToKey",
toKeys:[ "B" ]
}, {
keys:[ "<S-Space>" ],
type:"keyToKey",
toKeys:[ "w" ]
}, {
keys:[ "<S-BS>" ],
type:"keyToKey",
toKeys:[ "b" ]
}, {
keys:[ "<C-n>" ],
type:"keyToKey",
toKeys:[ "j" ]
}, {
keys:[ "<C-p>" ],
type:"keyToKey",
toKeys:[ "k" ]
}, {
keys:[ "<C-[>" ],
type:"keyToKey",
toKeys:[ "<Esc>" ]
}, {
keys:[ "<C-c>" ],
type:"keyToKey",
toKeys:[ "<Esc>" ]
}, {
keys:[ "s" ],
type:"keyToKey",
toKeys:[ "c", "l" ],
context:"normal"
}, {
keys:[ "s" ],
type:"keyToKey",
toKeys:[ "x", "i" ],
context:"visual"
}, {
keys:[ "S" ],
type:"keyToKey",
toKeys:[ "c", "c" ],
context:"normal"
}, {
keys:[ "S" ],
type:"keyToKey",
toKeys:[ "d", "c", "c" ],
context:"visual"
}, {
keys:[ "<Home>" ],
type:"keyToKey",
toKeys:[ "0" ]
}, {
keys:[ "<End>" ],
type:"keyToKey",
toKeys:[ "$" ]
}, {
keys:[ "<PageUp>" ],
type:"keyToKey",
toKeys:[ "<C-b>" ]
}, {
keys:[ "<PageDown>" ],
type:"keyToKey",
toKeys:[ "<C-f>" ]
}, {
keys:[ "<CR>" ],
type:"keyToKey",
toKeys:[ "j", "^" ],
context:"normal"
}, {
keys:[ "H" ],
type:"motion",
motion:"moveToTopLine",
motionArgs:{
linewise:!0,
toJumplist:!0
}
}, {
keys:[ "M" ],
type:"motion",
motion:"moveToMiddleLine",
motionArgs:{
linewise:!0,
toJumplist:!0
}
}, {
keys:[ "L" ],
type:"motion",
motion:"moveToBottomLine",
motionArgs:{
linewise:!0,
toJumplist:!0
}
}, {
keys:[ "h" ],
type:"motion",
motion:"moveByCharacters",
motionArgs:{
forward:!1
}
}, {
keys:[ "l" ],
type:"motion",
motion:"moveByCharacters",
motionArgs:{
forward:!0
}
}, {
keys:[ "j" ],
type:"motion",
motion:"moveByLines",
motionArgs:{
forward:!0,
linewise:!0
}
}, {
keys:[ "k" ],
type:"motion",
motion:"moveByLines",
motionArgs:{
forward:!1,
linewise:!0
}
}, {
keys:[ "g", "j" ],
type:"motion",
motion:"moveByDisplayLines",
motionArgs:{
forward:!0
}
}, {
keys:[ "g", "k" ],
type:"motion",
motion:"moveByDisplayLines",
motionArgs:{
forward:!1
}
}, {
keys:[ "w" ],
type:"motion",
motion:"moveByWords",
motionArgs:{
forward:!0,
wordEnd:!1
}
}, {
keys:[ "W" ],
type:"motion",
motion:"moveByWords",
motionArgs:{
forward:!0,
wordEnd:!1,
bigWord:!0
}
}, {
keys:[ "e" ],
type:"motion",
motion:"moveByWords",
motionArgs:{
forward:!0,
wordEnd:!0,
inclusive:!0
}
}, {
keys:[ "E" ],
type:"motion",
motion:"moveByWords",
motionArgs:{
forward:!0,
wordEnd:!0,
bigWord:!0,
inclusive:!0
}
}, {
keys:[ "b" ],
type:"motion",
motion:"moveByWords",
motionArgs:{
forward:!1,
wordEnd:!1
}
}, {
keys:[ "B" ],
type:"motion",
motion:"moveByWords",
motionArgs:{
forward:!1,
wordEnd:!1,
bigWord:!0
}
}, {
keys:[ "g", "e" ],
type:"motion",
motion:"moveByWords",
motionArgs:{
forward:!1,
wordEnd:!0,
inclusive:!0
}
}, {
keys:[ "g", "E" ],
type:"motion",
motion:"moveByWords",
motionArgs:{
forward:!1,
wordEnd:!0,
bigWord:!0,
inclusive:!0
}
}, {
keys:[ "{" ],
type:"motion",
motion:"moveByParagraph",
motionArgs:{
forward:!1,
toJumplist:!0
}
}, {
keys:[ "}" ],
type:"motion",
motion:"moveByParagraph",
motionArgs:{
forward:!0,
toJumplist:!0
}
}, {
keys:[ "<C-f>" ],
type:"motion",
motion:"moveByPage",
motionArgs:{
forward:!0
}
}, {
keys:[ "<C-b>" ],
type:"motion",
motion:"moveByPage",
motionArgs:{
forward:!1
}
}, {
keys:[ "<C-d>" ],
type:"motion",
motion:"moveByScroll",
motionArgs:{
forward:!0,
explicitRepeat:!0
}
}, {
keys:[ "<C-u>" ],
type:"motion",
motion:"moveByScroll",
motionArgs:{
forward:!1,
explicitRepeat:!0
}
}, {
keys:[ "g", "g" ],
type:"motion",
motion:"moveToLineOrEdgeOfDocument",
motionArgs:{
forward:!1,
explicitRepeat:!0,
linewise:!0,
toJumplist:!0
}
}, {
keys:[ "G" ],
type:"motion",
motion:"moveToLineOrEdgeOfDocument",
motionArgs:{
forward:!0,
explicitRepeat:!0,
linewise:!0,
toJumplist:!0
}
}, {
keys:[ "0" ],
type:"motion",
motion:"moveToStartOfLine"
}, {
keys:[ "^" ],
type:"motion",
motion:"moveToFirstNonWhiteSpaceCharacter"
}, {
keys:[ "+" ],
type:"motion",
motion:"moveByLines",
motionArgs:{
forward:!0,
toFirstChar:!0
}
}, {
keys:[ "-" ],
type:"motion",
motion:"moveByLines",
motionArgs:{
forward:!1,
toFirstChar:!0
}
}, {
keys:[ "_" ],
type:"motion",
motion:"moveByLines",
motionArgs:{
forward:!0,
toFirstChar:!0,
repeatOffset:-1
}
}, {
keys:[ "$" ],
type:"motion",
motion:"moveToEol",
motionArgs:{
inclusive:!0
}
}, {
keys:[ "%" ],
type:"motion",
motion:"moveToMatchedSymbol",
motionArgs:{
inclusive:!0,
toJumplist:!0
}
}, {
keys:[ "f", "character" ],
type:"motion",
motion:"moveToCharacter",
motionArgs:{
forward:!0,
inclusive:!0
}
}, {
keys:[ "F", "character" ],
type:"motion",
motion:"moveToCharacter",
motionArgs:{
forward:!1
}
}, {
keys:[ "t", "character" ],
type:"motion",
motion:"moveTillCharacter",
motionArgs:{
forward:!0,
inclusive:!0
}
}, {
keys:[ "T", "character" ],
type:"motion",
motion:"moveTillCharacter",
motionArgs:{
forward:!1
}
}, {
keys:[ ";" ],
type:"motion",
motion:"repeatLastCharacterSearch",
motionArgs:{
forward:!0
}
}, {
keys:[ "," ],
type:"motion",
motion:"repeatLastCharacterSearch",
motionArgs:{
forward:!1
}
}, {
keys:[ "'", "character" ],
type:"motion",
motion:"goToMark",
motionArgs:{
toJumplist:!0,
linewise:!0
}
}, {
keys:[ "`", "character" ],
type:"motion",
motion:"goToMark",
motionArgs:{
toJumplist:!0
}
}, {
keys:[ "]", "`" ],
type:"motion",
motion:"jumpToMark",
motionArgs:{
forward:!0
}
}, {
keys:[ "[", "`" ],
type:"motion",
motion:"jumpToMark",
motionArgs:{
forward:!1
}
}, {
keys:[ "]", "'" ],
type:"motion",
motion:"jumpToMark",
motionArgs:{
forward:!0,
linewise:!0
}
}, {
keys:[ "[", "'" ],
type:"motion",
motion:"jumpToMark",
motionArgs:{
forward:!1,
linewise:!0
}
}, {
keys:[ "]", "p" ],
type:"action",
action:"paste",
isEdit:!0,
actionArgs:{
after:!0,
isEdit:!0,
matchIndent:!0
}
}, {
keys:[ "[", "p" ],
type:"action",
action:"paste",
isEdit:!0,
actionArgs:{
after:!1,
isEdit:!0,
matchIndent:!0
}
}, {
keys:[ "]", "character" ],
type:"motion",
motion:"moveToSymbol",
motionArgs:{
forward:!0,
toJumplist:!0
}
}, {
keys:[ "[", "character" ],
type:"motion",
motion:"moveToSymbol",
motionArgs:{
forward:!1,
toJumplist:!0
}
}, {
keys:[ "|" ],
type:"motion",
motion:"moveToColumn",
motionArgs:{}
}, {
keys:[ "o" ],
type:"motion",
motion:"moveToOtherHighlightedEnd",
motionArgs:{},
context:"visual"
}, {
keys:[ "O" ],
type:"motion",
motion:"moveToOtherHighlightedEnd",
motionArgs:{
sameLine:!0
},
context:"visual"
}, {
keys:[ "d" ],
type:"operator",
operator:"delete"
}, {
keys:[ "y" ],
type:"operator",
operator:"yank"
}, {
keys:[ "c" ],
type:"operator",
operator:"change"
}, {
keys:[ ">" ],
type:"operator",
operator:"indent",
operatorArgs:{
indentRight:!0
}
}, {
keys:[ "<" ],
type:"operator",
operator:"indent",
operatorArgs:{
indentRight:!1
}
}, {
keys:[ "g", "~" ],
type:"operator",
operator:"swapcase"
}, {
keys:[ "n" ],
type:"motion",
motion:"findNext",
motionArgs:{
forward:!0,
toJumplist:!0
}
}, {
keys:[ "N" ],
type:"motion",
motion:"findNext",
motionArgs:{
forward:!1,
toJumplist:!0
}
}, {
keys:[ "x" ],
type:"operatorMotion",
operator:"delete",
motion:"moveByCharacters",
motionArgs:{
forward:!0
},
operatorMotionArgs:{
visualLine:!1
}
}, {
keys:[ "X" ],
type:"operatorMotion",
operator:"delete",
motion:"moveByCharacters",
motionArgs:{
forward:!1
},
operatorMotionArgs:{
visualLine:!0
}
}, {
keys:[ "D" ],
type:"operatorMotion",
operator:"delete",
motion:"moveToEol",
motionArgs:{
inclusive:!0
},
operatorMotionArgs:{
visualLine:!0
}
}, {
keys:[ "Y" ],
type:"operatorMotion",
operator:"yank",
motion:"moveToEol",
motionArgs:{
inclusive:!0
},
operatorMotionArgs:{
visualLine:!0
}
}, {
keys:[ "C" ],
type:"operatorMotion",
operator:"change",
motion:"moveToEol",
motionArgs:{
inclusive:!0
},
operatorMotionArgs:{
visualLine:!0
}
}, {
keys:[ "~" ],
type:"operatorMotion",
operator:"swapcase",
operatorArgs:{
shouldMoveCursor:!0
},
motion:"moveByCharacters",
motionArgs:{
forward:!0
}
}, {
keys:[ "<C-i>" ],
type:"action",
action:"jumpListWalk",
actionArgs:{
forward:!0
}
}, {
keys:[ "<C-o>" ],
type:"action",
action:"jumpListWalk",
actionArgs:{
forward:!1
}
}, {
keys:[ "<C-e>" ],
type:"action",
action:"scroll",
actionArgs:{
forward:!0,
linewise:!0
}
}, {
keys:[ "<C-y>" ],
type:"action",
action:"scroll",
actionArgs:{
forward:!1,
linewise:!0
}
}, {
keys:[ "a" ],
type:"action",
action:"enterInsertMode",
isEdit:!0,
actionArgs:{
insertAt:"charAfter"
}
}, {
keys:[ "A" ],
type:"action",
action:"enterInsertMode",
isEdit:!0,
actionArgs:{
insertAt:"eol"
}
}, {
keys:[ "A" ],
type:"action",
action:"enterInsertMode",
isEdit:!0,
actionArgs:{
insertAt:"endOfSelectedArea"
},
context:"visual"
}, {
keys:[ "i" ],
type:"action",
action:"enterInsertMode",
isEdit:!0,
actionArgs:{
insertAt:"inplace"
}
}, {
keys:[ "I" ],
type:"action",
action:"enterInsertMode",
isEdit:!0,
actionArgs:{
insertAt:"firstNonBlank"
}
}, {
keys:[ "o" ],
type:"action",
action:"newLineAndEnterInsertMode",
isEdit:!0,
interlaceInsertRepeat:!0,
actionArgs:{
after:!0
}
}, {
keys:[ "O" ],
type:"action",
action:"newLineAndEnterInsertMode",
isEdit:!0,
interlaceInsertRepeat:!0,
actionArgs:{
after:!1
}
}, {
keys:[ "v" ],
type:"action",
action:"toggleVisualMode"
}, {
keys:[ "V" ],
type:"action",
action:"toggleVisualMode",
actionArgs:{
linewise:!0
}
}, {
keys:[ "<C-v>" ],
type:"action",
action:"toggleVisualMode",
actionArgs:{
blockwise:!0
}
}, {
keys:[ "g", "v" ],
type:"action",
action:"reselectLastSelection"
}, {
keys:[ "J" ],
type:"action",
action:"joinLines",
isEdit:!0
}, {
keys:[ "p" ],
type:"action",
action:"paste",
isEdit:!0,
actionArgs:{
after:!0,
isEdit:!0
}
}, {
keys:[ "P" ],
type:"action",
action:"paste",
isEdit:!0,
actionArgs:{
after:!1,
isEdit:!0
}
}, {
keys:[ "r", "character" ],
type:"action",
action:"replace",
isEdit:!0
}, {
keys:[ "@", "character" ],
type:"action",
action:"replayMacro"
}, {
keys:[ "q", "character" ],
type:"action",
action:"enterMacroRecordMode"
}, {
keys:[ "R" ],
type:"action",
action:"enterInsertMode",
isEdit:!0,
actionArgs:{
replace:!0
}
}, {
keys:[ "u" ],
type:"action",
action:"undo"
}, {
keys:[ "u" ],
type:"action",
action:"changeCase",
actionArgs:{
toLower:!0
},
context:"visual",
isEdit:!0
}, {
keys:[ "U" ],
type:"action",
action:"changeCase",
actionArgs:{
toLower:!1
},
context:"visual",
isEdit:!0
}, {
keys:[ "<C-r>" ],
type:"action",
action:"redo"
}, {
keys:[ "m", "character" ],
type:"action",
action:"setMark"
}, {
keys:[ '"', "character" ],
type:"action",
action:"setRegister"
}, {
keys:[ "z", "z" ],
type:"action",
action:"scrollToCursor",
actionArgs:{
position:"center"
}
}, {
keys:[ "z", "." ],
type:"action",
action:"scrollToCursor",
actionArgs:{
position:"center"
},
motion:"moveToFirstNonWhiteSpaceCharacter"
}, {
keys:[ "z", "t" ],
type:"action",
action:"scrollToCursor",
actionArgs:{
position:"top"
}
}, {
keys:[ "z", "<CR>" ],
type:"action",
action:"scrollToCursor",
actionArgs:{
position:"top"
},
motion:"moveToFirstNonWhiteSpaceCharacter"
}, {
keys:[ "z", "-" ],
type:"action",
action:"scrollToCursor",
actionArgs:{
position:"bottom"
}
}, {
keys:[ "z", "b" ],
type:"action",
action:"scrollToCursor",
actionArgs:{
position:"bottom"
},
motion:"moveToFirstNonWhiteSpaceCharacter"
}, {
keys:[ "." ],
type:"action",
action:"repeatLastEdit"
}, {
keys:[ "<C-a>" ],
type:"action",
action:"incrementNumberToken",
isEdit:!0,
actionArgs:{
increase:!0,
backtrack:!1
}
}, {
keys:[ "<C-x>" ],
type:"action",
action:"incrementNumberToken",
isEdit:!0,
actionArgs:{
increase:!1,
backtrack:!1
}
}, {
keys:[ "a", "character" ],
type:"motion",
motion:"textObjectManipulation"
}, {
keys:[ "i", "character" ],
type:"motion",
motion:"textObjectManipulation",
motionArgs:{
textObjectInner:!0
}
}, {
keys:[ "/" ],
type:"search",
searchArgs:{
forward:!0,
querySrc:"prompt",
toJumplist:!0
}
}, {
keys:[ "?" ],
type:"search",
searchArgs:{
forward:!1,
querySrc:"prompt",
toJumplist:!0
}
}, {
keys:[ "*" ],
type:"search",
searchArgs:{
forward:!0,
querySrc:"wordUnderCursor",
wholeWordOnly:!0,
toJumplist:!0
}
}, {
keys:[ "#" ],
type:"search",
searchArgs:{
forward:!1,
querySrc:"wordUnderCursor",
wholeWordOnly:!0,
toJumplist:!0
}
}, {
keys:[ "g", "*" ],
type:"search",
searchArgs:{
forward:!0,
querySrc:"wordUnderCursor",
toJumplist:!0
}
}, {
keys:[ "g", "#" ],
type:"search",
searchArgs:{
forward:!1,
querySrc:"wordUnderCursor",
toJumplist:!0
}
}, {
keys:[ ":" ],
type:"ex"
} ], Pos = CodeMirror.Pos, Vim = function() {
function getOnPasteFn(cm) {
var vim = cm.state.vim;
return vim.onPasteFn || (vim.onPasteFn = function() {
vim.insertMode || (cm.setCursor(offsetCursor(cm.getCursor(), 0, 1)), actions.enterInsertMode(cm, {}, vim));
}), vim.onPasteFn;
}
function makeKeyRange(start, size) {
for (var keys = [], i = start; start + size > i; i++) keys.push(String.fromCharCode(i));
return keys;
}
function isLine(cm, line) {
return line >= cm.firstLine() && line <= cm.lastLine();
}
function isLowerCase(k) {
return /^[a-z]$/.test(k);
}
function isMatchableSymbol(k) {
return -1 != "()[]{}".indexOf(k);
}
function isNumber(k) {
return numberRegex.test(k);
}
function isUpperCase(k) {
return /^[A-Z]$/.test(k);
}
function isWhiteSpaceString(k) {
return /^\s*$/.test(k);
}
function inArray(val, arr) {
for (var i = 0; i < arr.length; i++) if (arr[i] == val) return !0;
return !1;
}
function defineOption(name, defaultValue, type) {
if (void 0 === defaultValue) throw Error("defaultValue is required");
type || (type = "string"), options[name] = {
type:type,
defaultValue:defaultValue
}, setOption(name, defaultValue);
}
function setOption(name, value) {
var option = options[name];
if (!option) throw Error("Unknown option: " + name);
if ("boolean" == option.type) {
if (value && value !== !0) throw Error("Invalid argument: " + name + "=" + value);
value !== !1 && (value = !0);
}
option.value = "boolean" == option.type ? !!value :value;
}
function getOption(name) {
var option = options[name];
if (!option) throw Error("Unknown option: " + name);
return option.value;
}
function MacroModeState() {
this.latestRegister = void 0, this.isPlaying = !1, this.isRecording = !1, this.replaySearchQueries = [], 
this.onRecordingDone = void 0, this.lastInsertModeChanges = createInsertModeChanges();
}
function maybeInitVimState(cm) {
return cm.state.vim || (cm.state.vim = {
inputState:new InputState(),
lastEditInputState:void 0,
lastEditActionCommand:void 0,
lastHPos:-1,
lastHSPos:-1,
lastMotion:null,
marks:{},
fakeCursor:null,
insertMode:!1,
insertModeRepeat:void 0,
visualMode:!1,
visualLine:!1,
visualBlock:!1,
lastSelection:null,
lastPastedText:null
}), cm.state.vim;
}
function resetVimGlobalState() {
vimGlobalState = {
searchQuery:null,
searchIsReversed:!1,
lastSubstituteReplacePart:void 0,
jumpList:createCircularJumpList(),
macroModeState:new MacroModeState(),
lastChararacterSearch:{
increment:0,
forward:!0,
selectedCharacter:""
},
registerController:new RegisterController({}),
searchHistoryController:new HistoryController({}),
exCommandHistoryController:new HistoryController({})
};
for (var optionName in options) {
var option = options[optionName];
option.value = option.defaultValue;
}
}
function InputState() {
this.prefixRepeat = [], this.motionRepeat = [], this.operator = null, this.operatorArgs = null, 
this.motion = null, this.motionArgs = null, this.keyBuffer = [], this.registerName = null;
}
function clearInputState(cm, reason) {
cm.state.vim.inputState = new InputState(), CodeMirror.signal(cm, "vim-command-done", reason);
}
function Register(text, linewise) {
this.clear(), this.keyBuffer = [ text || "" ], this.insertModeChanges = [], this.searchQueries = [], 
this.linewise = !!linewise;
}
function RegisterController(registers) {
this.registers = registers, this.unnamedRegister = registers['"'] = new Register(), 
registers["."] = new Register(), registers[":"] = new Register(), registers["/"] = new Register();
}
function HistoryController() {
this.historyBuffer = [], this.iterator, this.initialPrefix = null;
}
function clipCursorToContent(cm, cur, includeLineBreak) {
var line = Math.min(Math.max(cm.firstLine(), cur.line), cm.lastLine()), maxCh = lineLength(cm, line) - 1;
maxCh = includeLineBreak ? maxCh + 1 :maxCh;
var ch = Math.min(Math.max(0, cur.ch), maxCh);
return Pos(line, ch);
}
function copyArgs(args) {
var ret = {};
for (var prop in args) args.hasOwnProperty(prop) && (ret[prop] = args[prop]);
return ret;
}
function offsetCursor(cur, offsetLine, offsetCh) {
return Pos(cur.line + offsetLine, cur.ch + offsetCh);
}
function matchKeysPartial(pressed, mapped) {
for (var i = 0; i < pressed.length; i++) if (pressed[i] != mapped[i] && "character" != mapped[i]) return !1;
return !0;
}
function repeatFn(cm, fn, repeat) {
return function() {
for (var i = 0; repeat > i; i++) fn(cm);
};
}
function copyCursor(cur) {
return Pos(cur.line, cur.ch);
}
function cursorEqual(cur1, cur2) {
return cur1.ch == cur2.ch && cur1.line == cur2.line;
}
function cursorIsBefore(cur1, cur2) {
return cur1.line < cur2.line ? !0 :cur1.line == cur2.line && cur1.ch < cur2.ch ? !0 :!1;
}
function cusrorIsBetween(cur1, cur2, cur3) {
var cur1before2 = cursorIsBefore(cur1, cur2), cur2before3 = cursorIsBefore(cur2, cur3);
return cur1before2 && cur2before3;
}
function lineLength(cm, lineNum) {
return cm.getLine(lineNum).length;
}
function reverse(s) {
return s.split("").reverse().join("");
}
function trim(s) {
return s.trim ? s.trim() :s.replace(/^\s+|\s+$/g, "");
}
function escapeRegex(s) {
return s.replace(/([.?*+$\[\]\/\\(){}|\-])/g, "\\$1");
}
function selectBlock(cm, selectionEnd) {
var start, end, selectionStart, selections = [], ranges = cm.listSelections(), firstRange = ranges[0].anchor, lastRange = ranges[ranges.length - 1].anchor, curEnd = cm.getCursor("head"), primIndex = getIndex(ranges, curEnd), contains = getIndex(ranges, selectionEnd) < 0 ? !1 :!0;
selectionEnd = cm.clipPos(selectionEnd);
var near = Math.abs(firstRange.line - selectionEnd.line) - Math.abs(lastRange.line - selectionEnd.line);
if (near > 0 ? (end = selectionEnd.line, start = firstRange.line, lastRange.line == selectionEnd.line && contains && (start = end)) :0 > near ? (start = selectionEnd.line, 
end = lastRange.line, firstRange.line == selectionEnd.line && contains && (end = start)) :0 == primIndex ? (start = selectionEnd.line, 
end = lastRange.line) :(start = firstRange.line, end = selectionEnd.line), start > end) {
var tmp = start;
start = end, end = tmp;
}
for (selectionStart = near > 0 ? firstRange :lastRange; end >= start; ) {
var anchor = {
line:start,
ch:selectionStart.ch
}, head = {
line:start,
ch:selectionEnd.ch
};
anchor.ch < curEnd.ch && (head.ch == anchor.ch || anchor.ch - head.ch == 1) ? (anchor.ch++, 
head.ch--) :anchor.ch > curEnd.ch && (head.ch == anchor.ch || anchor.ch - head.ch == -1) && (anchor.ch--, 
head.ch++);
var range = {
anchor:anchor,
head:head
};
selections.push(range), cursorEqual(head, selectionEnd) && (primIndex = selections.indexOf(range)), 
start++;
}
return selectionEnd.ch = selections[0].head.ch, selectionStart.ch = selections[0].anchor.ch, 
cm.setSelections(selections, primIndex), selectionStart;
}
function getIndex(ranges, head) {
for (var i = 0; i < ranges.length; i++) if (cursorEqual(ranges[i].head, head)) return i;
return -1;
}
function getSelectedAreaRange(cm, vim) {
var selectionStart = cm.getCursor("anchor"), selectionEnd = cm.getCursor("head"), lastSelection = vim.lastSelection;
if (vim.visualMode) {
if (cursorIsBefore(selectionEnd, selectionStart)) {
var tmp = selectionStart;
selectionStart = selectionEnd, selectionEnd = tmp;
}
exitVisualMode(cm);
} else {
var lastSelectionCurStart = vim.lastSelection.curStartMark.find(), lastSelectionCurEnd = vim.lastSelection.curEndMark.find(), line = lastSelectionCurEnd.line - lastSelectionCurStart.line, ch = line ? lastSelectionCurEnd.ch :lastSelectionCurEnd.ch - lastSelectionCurStart.ch;
if (selectionEnd = {
line:selectionEnd.line + line,
ch:line ? selectionEnd.ch :ch + selectionEnd.ch
}, lastSelection.visualLine) return [ {
line:selectionStart.line,
ch:0
}, {
line:selectionEnd.line,
ch:lineLength(cm, selectionEnd.line)
} ];
}
return [ selectionStart, selectionEnd ];
}
function updateLastSelection(cm, vim, selectionStart, selectionEnd) {
selectionStart && selectionEnd || (selectionStart = vim.marks["<"].find() || cm.getCursor("anchor"), 
selectionEnd = vim.marks[">"].find() || cm.getCursor("head")), vim.lastPastedText && (selectionEnd = cm.posFromIndex(cm.indexFromPos(selectionStart) + vim.lastPastedText.length), 
vim.lastPastedText = null);
var ranges = cm.listSelections(), swap = getIndex(ranges, selectionStart) > -1;
vim.lastSelection = {
curStartMark:cm.setBookmark(swap ? selectionEnd :selectionStart),
curEndMark:cm.setBookmark(swap ? selectionStart :selectionEnd),
visualMode:vim.visualMode,
visualLine:vim.visualLine,
visualBlock:vim.visualBlock
};
}
function exitVisualMode(cm) {
cm.off("mousedown", exitVisualMode);
var vim = cm.state.vim, selectionStart = cm.getCursor("anchor"), selectionEnd = cm.getCursor("head");
updateLastSelection(cm, vim), vim.visualMode = !1, vim.visualLine = !1, vim.visualBlock = !1, 
cursorEqual(selectionStart, selectionEnd) || cm.setCursor(clipCursorToContent(cm, selectionEnd)), 
CodeMirror.signal(cm, "vim-mode-change", {
mode:"normal"
}), vim.fakeCursor && vim.fakeCursor.clear();
}
function clipToLine(cm, curStart, curEnd) {
var selection = cm.getRange(curStart, curEnd);
if (/\n\s*$/.test(selection)) {
var lines = selection.split("\n");
lines.pop();
for (var line, line = lines.pop(); lines.length > 0 && line && isWhiteSpaceString(line); line = lines.pop()) curEnd.line--, 
curEnd.ch = 0;
line ? (curEnd.line--, curEnd.ch = lineLength(cm, curEnd.line)) :curEnd.ch = 0;
}
}
function expandSelectionToLine(_cm, curStart, curEnd) {
curStart.ch = 0, curEnd.ch = 0, curEnd.line++;
}
function findFirstNonWhiteSpaceCharacter(text) {
if (!text) return 0;
var firstNonWS = text.search(/\S/);
return -1 == firstNonWS ? text.length :firstNonWS;
}
function expandWordUnderCursor(cm, inclusive, _forward, bigWord, noSymbol) {
var firstMatchedChar, cur = cm.getCursor(), line = cm.getLine(cur.line), idx = cur.ch, textAfterIdx = line.substring(idx);
if (firstMatchedChar = noSymbol ? textAfterIdx.search(/\w/) :textAfterIdx.search(/\S/), 
-1 == firstMatchedChar) return null;
idx += firstMatchedChar, textAfterIdx = line.substring(idx);
var matchRegex, textBeforeIdx = line.substring(0, idx);
matchRegex = bigWord ? /^\S+/ :/\w/.test(line.charAt(idx)) ? /^\w+/ :/^[^\w\s]+/;
var wordAfterRegex = matchRegex.exec(textAfterIdx), wordStart = idx, wordEnd = idx + wordAfterRegex[0].length, revTextBeforeIdx = reverse(textBeforeIdx), wordBeforeRegex = matchRegex.exec(revTextBeforeIdx);
if (wordBeforeRegex && (wordStart -= wordBeforeRegex[0].length), inclusive) {
var textAfterWordEnd = line.substring(wordEnd), whitespacesAfterWord = textAfterWordEnd.match(/^\s*/)[0].length;
if (whitespacesAfterWord > 0) wordEnd += whitespacesAfterWord; else {
var revTrim = revTextBeforeIdx.length - wordStart, textBeforeWordStart = revTextBeforeIdx.substring(revTrim), whitespacesBeforeWord = textBeforeWordStart.match(/^\s*/)[0].length;
wordStart -= whitespacesBeforeWord;
}
}
return {
start:Pos(cur.line, wordStart),
end:Pos(cur.line, wordEnd)
};
}
function recordJumpPosition(cm, oldCur, newCur) {
cursorEqual(oldCur, newCur) || vimGlobalState.jumpList.add(cm, oldCur, newCur);
}
function recordLastCharacterSearch(increment, args) {
vimGlobalState.lastChararacterSearch.increment = increment, vimGlobalState.lastChararacterSearch.forward = args.forward, 
vimGlobalState.lastChararacterSearch.selectedCharacter = args.selectedCharacter;
}
function findSymbol(cm, repeat, forward, symb) {
var cur = copyCursor(cm.getCursor()), increment = forward ? 1 :-1, endLine = forward ? cm.lineCount() :-1, curCh = cur.ch, line = cur.line, lineText = cm.getLine(line), state = {
lineText:lineText,
nextCh:lineText.charAt(curCh),
lastCh:null,
index:curCh,
symb:symb,
reverseSymb:(forward ? {
")":"(",
"}":"{"
} :{
"(":")",
"{":"}"
})[symb],
forward:forward,
depth:0,
curMoveThrough:!1
}, mode = symbolToMode[symb];
if (!mode) return cur;
var init = findSymbolModes[mode].init, isComplete = findSymbolModes[mode].isComplete;
for (init && init(state); line !== endLine && repeat; ) {
if (state.index += increment, state.nextCh = state.lineText.charAt(state.index), 
!state.nextCh) {
if (line += increment, state.lineText = cm.getLine(line) || "", increment > 0) state.index = 0; else {
var lineLen = state.lineText.length;
state.index = lineLen > 0 ? lineLen - 1 :0;
}
state.nextCh = state.lineText.charAt(state.index);
}
isComplete(state) && (cur.line = line, cur.ch = state.index, repeat--);
}
return state.nextCh || state.curMoveThrough ? Pos(line, state.index) :cur;
}
function findWord(cm, cur, forward, bigWord, emptyLineIsWord) {
var lineNum = cur.line, pos = cur.ch, line = cm.getLine(lineNum), dir = forward ? 1 :-1, regexps = bigWord ? bigWordRegexp :wordRegexp;
if (emptyLineIsWord && "" == line) {
if (lineNum += dir, line = cm.getLine(lineNum), !isLine(cm, lineNum)) return null;
pos = forward ? 0 :line.length;
}
for (;;) {
if (emptyLineIsWord && "" == line) return {
from:0,
to:0,
line:lineNum
};
for (var stop = dir > 0 ? line.length :-1, wordStart = stop, wordEnd = stop; pos != stop; ) {
for (var foundWord = !1, i = 0; i < regexps.length && !foundWord; ++i) if (regexps[i].test(line.charAt(pos))) {
for (wordStart = pos; pos != stop && regexps[i].test(line.charAt(pos)); ) pos += dir;
if (wordEnd = pos, foundWord = wordStart != wordEnd, wordStart == cur.ch && lineNum == cur.line && wordEnd == wordStart + dir) continue;
return {
from:Math.min(wordStart, wordEnd + 1),
to:Math.max(wordStart, wordEnd),
line:lineNum
};
}
foundWord || (pos += dir);
}
if (lineNum += dir, !isLine(cm, lineNum)) return null;
line = cm.getLine(lineNum), pos = dir > 0 ? 0 :line.length;
}
throw new Error("The impossible happened.");
}
function moveToWord(cm, repeat, forward, wordEnd, bigWord) {
var cur = cm.getCursor(), curStart = copyCursor(cur), words = [];
(forward && !wordEnd || !forward && wordEnd) && repeat++;
for (var emptyLineIsWord = !(forward && wordEnd), i = 0; repeat > i; i++) {
var word = findWord(cm, cur, forward, bigWord, emptyLineIsWord);
if (!word) {
var eodCh = lineLength(cm, cm.lastLine());
words.push(forward ? {
line:cm.lastLine(),
from:eodCh,
to:eodCh
} :{
line:0,
from:0,
to:0
});
break;
}
words.push(word), cur = Pos(word.line, forward ? word.to - 1 :word.from);
}
var shortCircuit = words.length != repeat, firstWord = words[0], lastWord = words.pop();
return forward && !wordEnd ? (shortCircuit || firstWord.from == curStart.ch && firstWord.line == curStart.line || (lastWord = words.pop()), 
Pos(lastWord.line, lastWord.from)) :forward && wordEnd ? Pos(lastWord.line, lastWord.to - 1) :!forward && wordEnd ? (shortCircuit || firstWord.to == curStart.ch && firstWord.line == curStart.line || (lastWord = words.pop()), 
Pos(lastWord.line, lastWord.to)) :Pos(lastWord.line, lastWord.from);
}
function moveToCharacter(cm, repeat, forward, character) {
for (var idx, cur = cm.getCursor(), start = cur.ch, i = 0; repeat > i; i++) {
var line = cm.getLine(cur.line);
if (idx = charIdxInLine(start, line, character, forward, !0), -1 == idx) return null;
start = idx;
}
return Pos(cm.getCursor().line, idx);
}
function moveToColumn(cm, repeat) {
var line = cm.getCursor().line;
return clipCursorToContent(cm, Pos(line, repeat - 1));
}
function updateMark(cm, vim, markName, pos) {
inArray(markName, validMarks) && (vim.marks[markName] && vim.marks[markName].clear(), 
vim.marks[markName] = cm.setBookmark(pos));
}
function charIdxInLine(start, line, character, forward, includeChar) {
var idx;
return forward ? (idx = line.indexOf(character, start + 1), -1 == idx || includeChar || (idx -= 1)) :(idx = line.lastIndexOf(character, start - 1), 
-1 == idx || includeChar || (idx += 1)), idx;
}
function selectCompanionObject(cm, symb, inclusive) {
var start, end, cur = cm.getCursor(), bracketRegexp = {
"(":/[()]/,
")":/[()]/,
"[":/[[\]]/,
"]":/[[\]]/,
"{":/[{}]/,
"}":/[{}]/
}[symb], openSym = {
"(":"(",
")":"(",
"[":"[",
"]":"[",
"{":"{",
"}":"{"
}[symb], curChar = cm.getLine(cur.line).charAt(cur.ch), offset = curChar === openSym ? 1 :0;
if (start = cm.scanForBracket(Pos(cur.line, cur.ch + offset), -1, null, {
bracketRegex:bracketRegexp
}), end = cm.scanForBracket(Pos(cur.line, cur.ch + offset), 1, null, {
bracketRegex:bracketRegexp
}), !start || !end) return {
start:cur,
end:cur
};
if (start = start.pos, end = end.pos, start.line == end.line && start.ch > end.ch || start.line > end.line) {
var tmp = start;
start = end, end = tmp;
}
return inclusive ? end.ch += 1 :start.ch += 1, {
start:start,
end:end
};
}
function findBeginningAndEnd(cm, symb, inclusive) {
var start, end, i, len, cur = copyCursor(cm.getCursor()), line = cm.getLine(cur.line), chars = line.split(""), firstIndex = chars.indexOf(symb);
if (cur.ch < firstIndex ? cur.ch = firstIndex :firstIndex < cur.ch && chars[cur.ch] == symb && (end = cur.ch, 
--cur.ch), chars[cur.ch] != symb || end) for (i = cur.ch; i > -1 && !start; i--) chars[i] == symb && (start = i + 1); else start = cur.ch + 1;
if (start && !end) for (i = start, len = chars.length; len > i && !end; i++) chars[i] == symb && (end = i);
return start && end ? (inclusive && (--start, ++end), {
start:Pos(cur.line, start),
end:Pos(cur.line, end)
}) :{
start:cur,
end:cur
};
}
function SearchState() {}
function getSearchState(cm) {
var vim = cm.state.vim;
return vim.searchState_ || (vim.searchState_ = new SearchState());
}
function dialog(cm, template, shortText, onClose, options) {
cm.openDialog ? cm.openDialog(template, onClose, {
bottom:!0,
value:options.value,
onKeyDown:options.onKeyDown,
onKeyUp:options.onKeyUp
}) :onClose(prompt(shortText, ""));
}
function splitBySlash(argString) {
var slashes = findUnescapedSlashes(argString) || [];
if (!slashes.length) return [];
var tokens = [];
if (0 === slashes[0]) {
for (var i = 0; i < slashes.length; i++) "number" == typeof slashes[i] && tokens.push(argString.substring(slashes[i] + 1, slashes[i + 1]));
return tokens;
}
}
function findUnescapedSlashes(str) {
for (var escapeNextChar = !1, slashes = [], i = 0; i < str.length; i++) {
var c = str.charAt(i);
escapeNextChar || "/" != c || slashes.push(i), escapeNextChar = !escapeNextChar && "\\" == c;
}
return slashes;
}
function translateRegex(str) {
for (var specials = "|(){", unescape = "}", escapeNextChar = !1, out = [], i = -1; i < str.length; i++) {
var c = str.charAt(i) || "", n = str.charAt(i + 1) || "", specialComesNext = n && -1 != specials.indexOf(n);
escapeNextChar ? ("\\" === c && specialComesNext || out.push(c), escapeNextChar = !1) :"\\" === c ? (escapeNextChar = !0, 
n && -1 != unescape.indexOf(n) && (specialComesNext = !0), specialComesNext && "\\" !== n || out.push(c)) :(out.push(c), 
specialComesNext && "\\" !== n && out.push("\\"));
}
return out.join("");
}
function translateRegexReplace(str) {
for (var escapeNextChar = !1, out = [], i = -1; i < str.length; i++) {
var c = str.charAt(i) || "", n = str.charAt(i + 1) || "";
escapeNextChar ? (out.push(c), escapeNextChar = !1) :"\\" === c ? (escapeNextChar = !0, 
isNumber(n) || "$" === n ? out.push("$") :"/" !== n && "\\" !== n && out.push("\\")) :("$" === c && out.push("$"), 
out.push(c), "/" === n && out.push("\\"));
}
return out.join("");
}
function unescapeRegexReplace(str) {
for (var stream = new CodeMirror.StringStream(str), output = []; !stream.eol(); ) {
for (;stream.peek() && "\\" != stream.peek(); ) output.push(stream.next());
stream.match("\\/", !0) ? output.push("/") :stream.match("\\\\", !0) ? output.push("\\") :output.push(stream.next());
}
return output.join("");
}
function parseQuery(query, ignoreCase, smartCase) {
var lastSearchRegister = vimGlobalState.registerController.getRegister("/");
if (lastSearchRegister.setText(query), query instanceof RegExp) return query;
var regexPart, forceIgnoreCase, slashes = findUnescapedSlashes(query);
if (slashes.length) {
regexPart = query.substring(0, slashes[0]);
var flagsPart = query.substring(slashes[0]);
forceIgnoreCase = -1 != flagsPart.indexOf("i");
} else regexPart = query;
if (!regexPart) return null;
getOption("pcre") || (regexPart = translateRegex(regexPart)), smartCase && (ignoreCase = /^[^A-Z]*$/.test(regexPart));
var regexp = new RegExp(regexPart, ignoreCase || forceIgnoreCase ? "i" :void 0);
return regexp;
}
function showConfirm(cm, text) {
cm.openNotification ? cm.openNotification('<span style="color: red">' + text + "</span>", {
bottom:!0,
duration:5e3
}) :alert(text);
}
function makePrompt(prefix, desc) {
var raw = "";
return prefix && (raw += '<span style="font-family: monospace">' + prefix + "</span>"), 
raw += '<input type="text"/> <span style="color: #888">', desc && (raw += '<span style="color: #888">', 
raw += desc, raw += "</span>"), raw;
}
function showPrompt(cm, options) {
var shortText = (options.prefix || "") + " " + (options.desc || ""), prompt = makePrompt(options.prefix, options.desc);
dialog(cm, prompt, shortText, options.onClose, options);
}
function regexEqual(r1, r2) {
if (r1 instanceof RegExp && r2 instanceof RegExp) {
for (var props = [ "global", "multiline", "ignoreCase", "source" ], i = 0; i < props.length; i++) {
var prop = props[i];
if (r1[prop] !== r2[prop]) return !1;
}
return !0;
}
return !1;
}
function updateSearchQuery(cm, rawQuery, ignoreCase, smartCase) {
if (rawQuery) {
var state = getSearchState(cm), query = parseQuery(rawQuery, !!ignoreCase, !!smartCase);
if (query) return highlightSearchMatches(cm, query), regexEqual(query, state.getQuery()) ? query :(state.setQuery(query), 
query);
}
}
function searchOverlay(query) {
if ("^" == query.source.charAt(0)) var matchSol = !0;
return {
token:function(stream) {
if (matchSol && !stream.sol()) return stream.skipToEnd(), void 0;
var match = stream.match(query, !1);
if (match) return 0 == match[0].length ? (stream.next(), "searching") :stream.sol() || (stream.backUp(1), 
query.exec(stream.next() + match[0])) ? (stream.match(query), "searching") :(stream.next(), 
null);
for (;!stream.eol() && (stream.next(), !stream.match(query, !1)); ) ;
},
query:query
};
}
function highlightSearchMatches(cm, query) {
var overlay = getSearchState(cm).getOverlay();
overlay && query == overlay.query || (overlay && cm.removeOverlay(overlay), overlay = searchOverlay(query), 
cm.addOverlay(overlay), getSearchState(cm).setOverlay(overlay));
}
function findNext(cm, prev, query, repeat) {
return void 0 === repeat && (repeat = 1), cm.operation(function() {
for (var pos = cm.getCursor(), cursor = cm.getSearchCursor(query, pos), i = 0; repeat > i; i++) {
var found = cursor.find(prev);
if (0 == i && found && cursorEqual(cursor.from(), pos) && (found = cursor.find(prev)), 
!found && (cursor = cm.getSearchCursor(query, prev ? Pos(cm.lastLine()) :Pos(cm.firstLine(), 0)), 
!cursor.find(prev))) return;
}
return cursor.from();
});
}
function clearSearchHighlight(cm) {
cm.removeOverlay(getSearchState(cm).getOverlay()), getSearchState(cm).setOverlay(null);
}
function isInRange(pos, start, end) {
return "number" != typeof pos && (pos = pos.line), start instanceof Array ? inArray(pos, start) :end ? pos >= start && end >= pos :pos == start;
}
function getUserVisibleLines(cm) {
var scrollInfo = cm.getScrollInfo(), occludeToleranceTop = 6, occludeToleranceBottom = 10, from = cm.coordsChar({
left:0,
top:occludeToleranceTop + scrollInfo.top
}, "local"), bottomY = scrollInfo.clientHeight - occludeToleranceBottom + scrollInfo.top, to = cm.coordsChar({
left:0,
top:bottomY
}, "local");
return {
top:from.line,
bottom:to.line
};
}
function parseKeyString(str) {
for (var key, match, keys = []; str && (match = /<\w+-.+?>|<\w+>|./.exec(str), null !== match); ) key = match[0], 
str = str.substring(match.index + key.length), keys.push(key);
return keys;
}
function doReplace(cm, confirm, global, lineStart, lineEnd, searchCursor, query, replaceWith, callback) {
function replaceAll() {
cm.operation(function() {
for (;!done; ) replace(), next();
stop();
});
}
function replace() {
var text = cm.getRange(searchCursor.from(), searchCursor.to()), newText = text.replace(query, replaceWith);
searchCursor.replace(newText);
}
function next() {
for (var found; found = searchCursor.findNext() && isInRange(searchCursor.from(), lineStart, lineEnd); ) if (global || !lastPos || searchCursor.from().line != lastPos.line) return cm.scrollIntoView(searchCursor.from(), 30), 
cm.setSelection(searchCursor.from(), searchCursor.to()), lastPos = searchCursor.from(), 
done = !1, void 0;
done = !0;
}
function stop(close) {
if (close && close(), cm.focus(), lastPos) {
cm.setCursor(lastPos);
var vim = cm.state.vim;
vim.exMode = !1, vim.lastHPos = vim.lastHSPos = lastPos.ch;
}
callback && callback();
}
function onPromptKeyDown(e, _value, close) {
CodeMirror.e_stop(e);
var keyName = CodeMirror.keyName(e);
switch (keyName) {
case "Y":
replace(), next();
break;

case "N":
next();
break;

case "A":
var savedCallback = callback;
callback = void 0, cm.operation(replaceAll), callback = savedCallback;
break;

case "L":
replace();

case "Q":
case "Esc":
case "Ctrl-C":
case "Ctrl-[":
stop(close);
}
done && stop(close);
}
cm.state.vim.exMode = !0;
var done = !1, lastPos = searchCursor.from();
return next(), done ? (showConfirm(cm, "No matches for " + query.source), void 0) :confirm ? (showPrompt(cm, {
prefix:"replace with <strong>" + replaceWith + "</strong> (y/n/a/q/l)",
onKeyDown:onPromptKeyDown
}), void 0) :(replaceAll(), callback && callback(), void 0);
}
function buildVimKeyMap() {
function cmKeyToVimKey(key, modifier) {
var vimKey = key;
isUpperCase(vimKey) && "Ctrl" == modifier && (vimKey = vimKey.toLowerCase()), modifier && (vimKey = modifier.charAt(0) + "-" + vimKey);
var specialKey = {
Enter:"CR",
Backspace:"BS",
Delete:"Del"
}[vimKey];
return vimKey = specialKey ? specialKey :vimKey, vimKey = vimKey.length > 1 ? "<" + vimKey + ">" :vimKey;
}
function keyMapper(vimKey) {
return function(cm) {
CodeMirror.signal(cm, "vim-keypress", vimKey), CodeMirror.Vim.handleKey(cm, vimKey);
};
}
function bindKeys(keys, modifier) {
for (var i = 0; i < keys.length; i++) {
var key = keys[i];
modifier || 1 != key.length || (key = "'" + key + "'");
var vimKey = cmKeyToVimKey(keys[i], modifier), cmKey = modifier ? modifier + "-" + key :key;
cmToVimKeymap[cmKey] = keyMapper(vimKey);
}
}
var cmToVimKeymap = {
nofallthrough:!0,
style:"fat-cursor"
};
return bindKeys(upperCaseAlphabet), bindKeys(lowerCaseAlphabet), bindKeys(upperCaseAlphabet, "Ctrl"), 
bindKeys(specialSymbols), bindKeys(specialSymbols, "Ctrl"), bindKeys(numbers), bindKeys(numbers, "Ctrl"), 
bindKeys(specialKeys), bindKeys(specialKeys, "Ctrl"), cmToVimKeymap;
}
function exitInsertMode(cm) {
var vim = cm.state.vim, macroModeState = vimGlobalState.macroModeState, insertModeChangeRegister = vimGlobalState.registerController.getRegister("."), isPlaying = macroModeState.isPlaying;
isPlaying || (cm.off("change", onChange), CodeMirror.off(cm.getInputField(), "keydown", onKeyEventTargetKeyDown)), 
!isPlaying && vim.insertModeRepeat > 1 && (repeatLastEdit(cm, vim, vim.insertModeRepeat - 1, !0), 
vim.lastEditInputState.repeatOverride = vim.insertModeRepeat), delete vim.insertModeRepeat, 
vim.insertMode = !1, cm.setCursor(cm.getCursor().line, cm.getCursor().ch - 1), cm.setOption("keyMap", "vim"), 
cm.setOption("disableInput", !0), cm.toggleOverwrite(!1), insertModeChangeRegister.setText(macroModeState.lastInsertModeChanges.changes.join("")), 
CodeMirror.signal(cm, "vim-mode-change", {
mode:"normal"
}), macroModeState.isRecording && logInsertModeChange(macroModeState);
}
function executeMacroRegister(cm, vim, macroModeState, registerName) {
var register = vimGlobalState.registerController.getRegister(registerName), keyBuffer = register.keyBuffer, imc = 0;
macroModeState.isPlaying = !0, macroModeState.replaySearchQueries = register.searchQueries.slice(0);
for (var i = 0; i < keyBuffer.length; i++) for (var match, key, text = keyBuffer[i]; text; ) if (match = /<\w+-.+?>|<\w+>|./.exec(text), 
key = match[0], text = text.substring(match.index + key.length), CodeMirror.Vim.handleKey(cm, key), 
vim.insertMode) {
var changes = register.insertModeChanges[imc++].changes;
vimGlobalState.macroModeState.lastInsertModeChanges.changes = changes, repeatInsertModeChanges(cm, changes, 1), 
exitInsertMode(cm);
}
macroModeState.isPlaying = !1;
}
function logKey(macroModeState, key) {
if (!macroModeState.isPlaying) {
var registerName = macroModeState.latestRegister, register = vimGlobalState.registerController.getRegister(registerName);
register && register.pushText(key);
}
}
function logInsertModeChange(macroModeState) {
if (!macroModeState.isPlaying) {
var registerName = macroModeState.latestRegister, register = vimGlobalState.registerController.getRegister(registerName);
register && register.pushInsertModeChanges(macroModeState.lastInsertModeChanges);
}
}
function logSearchQuery(macroModeState, query) {
if (!macroModeState.isPlaying) {
var registerName = macroModeState.latestRegister, register = vimGlobalState.registerController.getRegister(registerName);
register && register.pushSearchQuery(query);
}
}
function onChange(_cm, changeObj) {
var macroModeState = vimGlobalState.macroModeState, lastChange = macroModeState.lastInsertModeChanges;
if (!macroModeState.isPlaying) for (;changeObj; ) {
if (lastChange.expectCursorActivityForChange = !0, "+input" == changeObj.origin || "paste" == changeObj.origin || void 0 === changeObj.origin) {
var text = changeObj.text.join("\n");
lastChange.changes.push(text);
}
changeObj = changeObj.next;
}
}
function onCursorActivity(cm) {
var vim = cm.state.vim;
if (vim.insertMode) {
var macroModeState = vimGlobalState.macroModeState;
if (macroModeState.isPlaying) return;
var lastChange = macroModeState.lastInsertModeChanges;
lastChange.expectCursorActivityForChange ? lastChange.expectCursorActivityForChange = !1 :lastChange.changes = [];
} else "*mouse" == cm.doc.history.lastSelOrigin && (vim.lastHPos = cm.doc.getCursor().ch, 
cm.somethingSelected() && (vim.visualMode = !0));
if (vim.visualMode) {
var from, head;
from = head = cm.getCursor("head");
var anchor = cm.getCursor("anchor"), to = Pos(head.line, from.ch + (cursorIsBefore(anchor, head) ? -1 :1));
if (cursorIsBefore(to, from)) {
var temp = from;
from = to, to = temp;
}
vim.fakeCursor && vim.fakeCursor.clear(), vim.fakeCursor = cm.markText(from, to, {
className:"cm-animate-fat-cursor"
});
}
}
function InsertModeKey(keyName) {
this.keyName = keyName;
}
function onKeyEventTargetKeyDown(e) {
function onKeyFound() {
return lastChange.changes.push(new InsertModeKey(keyName)), !0;
}
var macroModeState = vimGlobalState.macroModeState, lastChange = macroModeState.lastInsertModeChanges, keyName = CodeMirror.keyName(e);
(-1 != keyName.indexOf("Delete") || -1 != keyName.indexOf("Backspace")) && CodeMirror.lookupKey(keyName, [ "vim-insert" ], onKeyFound);
}
function repeatLastEdit(cm, vim, repeat, repeatForInsert) {
function repeatCommand() {
isAction ? commandDispatcher.processAction(cm, vim, vim.lastEditActionCommand) :commandDispatcher.evalInput(cm, vim);
}
function repeatInsert(repeat) {
if (macroModeState.lastInsertModeChanges.changes.length > 0) {
repeat = vim.lastEditActionCommand ? repeat :1;
var changeObject = macroModeState.lastInsertModeChanges;
macroModeState.lastInsertModeChanges = {}, repeatInsertModeChanges(cm, changeObject.changes, repeat), 
macroModeState.lastInsertModeChanges = changeObject;
}
}
var macroModeState = vimGlobalState.macroModeState;
macroModeState.isPlaying = !0;
var isAction = !!vim.lastEditActionCommand, cachedInputState = vim.inputState;
if (vim.inputState = vim.lastEditInputState, isAction && vim.lastEditActionCommand.interlaceInsertRepeat) for (var i = 0; repeat > i; i++) repeatCommand(), 
repeatInsert(1); else repeatForInsert || repeatCommand(), repeatInsert(repeat);
vim.inputState = cachedInputState, vim.insertMode && !repeatForInsert && exitInsertMode(cm), 
macroModeState.isPlaying = !1;
}
function repeatInsertModeChanges(cm, changes, repeat) {
function keyHandler(binding) {
return "string" == typeof binding ? CodeMirror.commands[binding](cm) :binding(cm), 
!0;
}
for (var i = 0; repeat > i; i++) for (var j = 0; j < changes.length; j++) {
var change = changes[j];
if (change instanceof InsertModeKey) CodeMirror.lookupKey(change.keyName, [ "vim-insert" ], keyHandler); else {
var cur = cm.getCursor();
cm.replaceRange(change, cur, cur);
}
}
}
CodeMirror.defineOption("vimMode", !1, function(cm, val) {
val ? (cm.setOption("keyMap", "vim"), cm.setOption("disableInput", !0), cm.setOption("showCursorWhenSelecting", !1), 
CodeMirror.signal(cm, "vim-mode-change", {
mode:"normal"
}), cm.on("cursorActivity", onCursorActivity), maybeInitVimState(cm), CodeMirror.on(cm.getInputField(), "paste", getOnPasteFn(cm))) :cm.state.vim && (cm.setOption("keyMap", "default"), 
cm.setOption("disableInput", !1), cm.off("cursorActivity", onCursorActivity), CodeMirror.off(cm.getInputField(), "paste", getOnPasteFn(cm)), 
cm.state.vim = null);
});
var numberRegex = /[\d]/, wordRegexp = [ /\w/, /[^\w\s]/ ], bigWordRegexp = [ /\S/ ], upperCaseAlphabet = makeKeyRange(65, 26), lowerCaseAlphabet = makeKeyRange(97, 26), numbers = makeKeyRange(48, 10), specialSymbols = "~`!@#$%^&*()_-+=[{}]\\|/?.,<>:;\"'".split(""), specialKeys = [ "Left", "Right", "Up", "Down", "Space", "Backspace", "Esc", "Home", "End", "PageUp", "PageDown", "Enter" ], validMarks = [].concat(upperCaseAlphabet, lowerCaseAlphabet, numbers, [ "<", ">" ]), validRegisters = [].concat(upperCaseAlphabet, lowerCaseAlphabet, numbers, [ "-", '"', ".", ":", "/" ]), options = {}, createCircularJumpList = function() {
function add(cm, oldCur, newCur) {
function useNextSlot(cursor) {
var next = ++pointer % size, trashMark = buffer[next];
trashMark && trashMark.clear(), buffer[next] = cm.setBookmark(cursor);
}
var current = pointer % size, curMark = buffer[current];
if (curMark) {
var markPos = curMark.find();
markPos && !cursorEqual(markPos, oldCur) && useNextSlot(oldCur);
} else useNextSlot(oldCur);
useNextSlot(newCur), head = pointer, tail = pointer - size + 1, 0 > tail && (tail = 0);
}
function move(cm, offset) {
pointer += offset, pointer > head ? pointer = head :tail > pointer && (pointer = tail);
var mark = buffer[(size + pointer) % size];
if (mark && !mark.find()) {
var newCur, inc = offset > 0 ? 1 :-1, oldCur = cm.getCursor();
do if (pointer += inc, mark = buffer[(size + pointer) % size], mark && (newCur = mark.find()) && !cursorEqual(oldCur, newCur)) break; while (head > pointer && pointer > tail);
}
return mark;
}
var size = 100, pointer = -1, head = 0, tail = 0, buffer = new Array(size);
return {
cachedCursor:void 0,
add:add,
move:move
};
}, createInsertModeChanges = function(c) {
return c ? {
changes:c.changes,
expectCursorActivityForChange:c.expectCursorActivityForChange
} :{
changes:[],
expectCursorActivityForChange:!1
};
};
MacroModeState.prototype = {
exitMacroRecordMode:function() {
var macroModeState = vimGlobalState.macroModeState;
macroModeState.onRecordingDone(), macroModeState.onRecordingDone = void 0, macroModeState.isRecording = !1;
},
enterMacroRecordMode:function(cm, registerName) {
var register = vimGlobalState.registerController.getRegister(registerName);
register && (register.clear(), this.latestRegister = registerName, this.onRecordingDone = cm.openDialog("(recording)[" + registerName + "]", null, {
bottom:!0
}), this.isRecording = !0);
}
};
var vimGlobalState, vimApi = {
buildKeyMap:function() {},
getRegisterController:function() {
return vimGlobalState.registerController;
},
resetVimGlobalState_:resetVimGlobalState,
getVimGlobalState_:function() {
return vimGlobalState;
},
maybeInitVimState_:maybeInitVimState,
InsertModeKey:InsertModeKey,
map:function(lhs, rhs, ctx) {
exCommandDispatcher.map(lhs, rhs, ctx);
},
setOption:setOption,
getOption:getOption,
defineOption:defineOption,
defineEx:function(name, prefix, func) {
if (0 !== name.indexOf(prefix)) throw new Error('(Vim.defineEx) "' + prefix + '" is not a prefix of "' + name + '", command not registered');
exCommands[name] = func, exCommandDispatcher.commandMap_[prefix] = {
name:name,
shortName:prefix,
type:"api"
};
},
handleKey:function(cm, key) {
var command, vim = maybeInitVimState(cm), macroModeState = vimGlobalState.macroModeState;
if (macroModeState.isRecording && "q" == key) return macroModeState.exitMacroRecordMode(), 
clearInputState(cm), void 0;
if ("<Esc>" == key) return clearInputState(cm), vim.visualMode && exitVisualMode(cm), 
void 0;
if (vim.visualMode || cursorEqual(cm.getCursor("head"), cm.getCursor("anchor")) || (vim.visualMode = !0, 
vim.visualLine = !1, CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual"
}), cm.on("mousedown", exitVisualMode)), ("0" != key || "0" == key && 0 === vim.inputState.getRepeat()) && (command = commandDispatcher.matchCommand(key, defaultKeymap, vim)), 
!command) return isNumber(key) && vim.inputState.pushRepeatDigit(key), macroModeState.isRecording && logKey(macroModeState, key), 
void 0;
if ("keyToKey" == command.type) for (var i = 0; i < command.toKeys.length; i++) this.handleKey(cm, command.toKeys[i]); else macroModeState.isRecording && logKey(macroModeState, key), 
commandDispatcher.processCommand(cm, vim, command);
},
handleEx:function(cm, input) {
exCommandDispatcher.processCommand(cm, input);
}
};
InputState.prototype.pushRepeatDigit = function(n) {
this.operator ? this.motionRepeat = this.motionRepeat.concat(n) :this.prefixRepeat = this.prefixRepeat.concat(n);
}, InputState.prototype.getRepeat = function() {
var repeat = 0;
return (this.prefixRepeat.length > 0 || this.motionRepeat.length > 0) && (repeat = 1, 
this.prefixRepeat.length > 0 && (repeat *= parseInt(this.prefixRepeat.join(""), 10)), 
this.motionRepeat.length > 0 && (repeat *= parseInt(this.motionRepeat.join(""), 10))), 
repeat;
}, Register.prototype = {
setText:function(text, linewise) {
this.keyBuffer = [ text || "" ], this.linewise = !!linewise;
},
pushText:function(text, linewise) {
linewise && (this.linewise || this.keyBuffer.push("\n"), this.linewise = !0), this.keyBuffer.push(text);
},
pushInsertModeChanges:function(changes) {
this.insertModeChanges.push(createInsertModeChanges(changes));
},
pushSearchQuery:function(query) {
this.searchQueries.push(query);
},
clear:function() {
this.keyBuffer = [], this.insertModeChanges = [], this.searchQueries = [], this.linewise = !1;
},
toString:function() {
return this.keyBuffer.join("");
}
}, RegisterController.prototype = {
pushText:function(registerName, operator, text, linewise) {
linewise && "\n" == text.charAt(0) && (text = text.slice(1) + "\n"), linewise && "\n" !== text.charAt(text.length - 1) && (text += "\n");
var register = this.isValidRegister(registerName) ? this.getRegister(registerName) :null;
if (!register) {
switch (operator) {
case "yank":
this.registers["0"] = new Register(text, linewise);
break;

case "delete":
case "change":
-1 == text.indexOf("\n") ? this.registers["-"] = new Register(text, linewise) :(this.shiftNumericRegisters_(), 
this.registers["1"] = new Register(text, linewise));
}
return this.unnamedRegister.setText(text, linewise), void 0;
}
var append = isUpperCase(registerName);
append ? register.pushText(text, linewise) :register.setText(text, linewise), this.unnamedRegister.setText(register.toString(), linewise);
},
getRegister:function(name) {
return this.isValidRegister(name) ? (name = name.toLowerCase(), this.registers[name] || (this.registers[name] = new Register()), 
this.registers[name]) :this.unnamedRegister;
},
isValidRegister:function(name) {
return name && inArray(name, validRegisters);
},
shiftNumericRegisters_:function() {
for (var i = 9; i >= 2; i--) this.registers[i] = this.getRegister("" + (i - 1));
}
}, HistoryController.prototype = {
nextMatch:function(input, up) {
var historyBuffer = this.historyBuffer, dir = up ? -1 :1;
null === this.initialPrefix && (this.initialPrefix = input);
for (var i = this.iterator + dir; up ? i >= 0 :i < historyBuffer.length; i += dir) for (var element = historyBuffer[i], j = 0; j <= element.length; j++) if (this.initialPrefix == element.substring(0, j)) return this.iterator = i, 
element;
return i >= historyBuffer.length ? (this.iterator = historyBuffer.length, this.initialPrefix) :0 > i ? input :void 0;
},
pushInput:function(input) {
var index = this.historyBuffer.indexOf(input);
index > -1 && this.historyBuffer.splice(index, 1), input.length && this.historyBuffer.push(input);
},
reset:function() {
this.initialPrefix = null, this.iterator = this.historyBuffer.length;
}
};
var commandDispatcher = {
matchCommand:function(key, keyMap, vim) {
function getFullyMatchedCommandOrNull(command) {
return keys.length < command.keys.length ? (inputState.keyBuffer.push(key), null) :("character" == command.keys[keys.length - 1] && (inputState.selectedCharacter = selectedCharacter), 
inputState.keyBuffer = [], command);
}
for (var selectedCharacter, inputState = vim.inputState, keys = inputState.keyBuffer.concat(key), matchedCommands = [], i = 0; i < keyMap.length; i++) {
var command = keyMap[i];
if (matchKeysPartial(keys, command.keys)) {
if (inputState.operator && "action" == command.type) continue;
if ("character" == command.keys[keys.length - 1] && (selectedCharacter = keys[keys.length - 1], 
selectedCharacter.length > 1)) switch (selectedCharacter) {
case "<CR>":
selectedCharacter = "\n";
break;

case "<Space>":
selectedCharacter = " ";
break;

default:
continue;
}
matchedCommands.push(command);
}
}
if (matchedCommands.length) {
if (1 == matchedCommands.length) return getFullyMatchedCommandOrNull(matchedCommands[0]);
for (var bestMatch, context = vim.visualMode ? "visual" :"normal", i = 0; i < matchedCommands.length; i++) {
var current = matchedCommands[i];
if (current.context == context) {
bestMatch = current;
break;
}
bestMatch || current.context || (bestMatch = current);
}
return getFullyMatchedCommandOrNull(bestMatch);
}
return inputState.keyBuffer = [], null;
},
processCommand:function(cm, vim, command) {
switch (vim.inputState.repeatOverride = command.repeatOverride, command.type) {
case "motion":
this.processMotion(cm, vim, command);
break;

case "operator":
this.processOperator(cm, vim, command);
break;

case "operatorMotion":
this.processOperatorMotion(cm, vim, command);
break;

case "action":
this.processAction(cm, vim, command);
break;

case "search":
this.processSearch(cm, vim, command);
break;

case "ex":
case "keyToEx":
this.processEx(cm, vim, command);
}
},
processMotion:function(cm, vim, command) {
vim.inputState.motion = command.motion, vim.inputState.motionArgs = copyArgs(command.motionArgs), 
this.evalInput(cm, vim);
},
processOperator:function(cm, vim, command) {
var inputState = vim.inputState;
if (inputState.operator) {
if (inputState.operator == command.operator) return inputState.motion = "expandToLine", 
inputState.motionArgs = {
linewise:!0
}, this.evalInput(cm, vim), void 0;
clearInputState(cm);
}
inputState.operator = command.operator, inputState.operatorArgs = copyArgs(command.operatorArgs), 
vim.visualMode && this.evalInput(cm, vim);
},
processOperatorMotion:function(cm, vim, command) {
var visualMode = vim.visualMode, operatorMotionArgs = copyArgs(command.operatorMotionArgs);
operatorMotionArgs && visualMode && operatorMotionArgs.visualLine && (vim.visualLine = !0), 
this.processOperator(cm, vim, command), visualMode || this.processMotion(cm, vim, command);
},
processAction:function(cm, vim, command) {
var inputState = vim.inputState, repeat = inputState.getRepeat(), repeatIsExplicit = !!repeat, actionArgs = copyArgs(command.actionArgs) || {};
inputState.selectedCharacter && (actionArgs.selectedCharacter = inputState.selectedCharacter), 
command.operator && this.processOperator(cm, vim, command), command.motion && this.processMotion(cm, vim, command), 
(command.motion || command.operator) && this.evalInput(cm, vim), actionArgs.repeat = repeat || 1, 
actionArgs.repeatIsExplicit = repeatIsExplicit, actionArgs.registerName = inputState.registerName, 
clearInputState(cm), vim.lastMotion = null, command.isEdit && this.recordLastEdit(vim, inputState, command), 
actions[command.action](cm, actionArgs, vim);
},
processSearch:function(cm, vim, command) {
function handleQuery(query, ignoreCase, smartCase) {
vimGlobalState.searchHistoryController.pushInput(query), vimGlobalState.searchHistoryController.reset();
try {
updateSearchQuery(cm, query, ignoreCase, smartCase);
} catch (e) {
return showConfirm(cm, "Invalid regex: " + query), void 0;
}
commandDispatcher.processMotion(cm, vim, {
type:"motion",
motion:"findNext",
motionArgs:{
forward:!0,
toJumplist:command.searchArgs.toJumplist
}
});
}
function onPromptClose(query) {
cm.scrollTo(originalScrollPos.left, originalScrollPos.top), handleQuery(query, !0, !0);
var macroModeState = vimGlobalState.macroModeState;
macroModeState.isRecording && logSearchQuery(macroModeState, query);
}
function onPromptKeyUp(e, query, close) {
var up, keyName = CodeMirror.keyName(e);
"Up" == keyName || "Down" == keyName ? (up = "Up" == keyName ? !0 :!1, query = vimGlobalState.searchHistoryController.nextMatch(query, up) || "", 
close(query)) :"Left" != keyName && "Right" != keyName && "Ctrl" != keyName && "Alt" != keyName && "Shift" != keyName && vimGlobalState.searchHistoryController.reset();
var parsedQuery;
try {
parsedQuery = updateSearchQuery(cm, query, !0, !0);
} catch (e) {}
parsedQuery ? cm.scrollIntoView(findNext(cm, !forward, parsedQuery), 30) :(clearSearchHighlight(cm), 
cm.scrollTo(originalScrollPos.left, originalScrollPos.top));
}
function onPromptKeyDown(e, query, close) {
var keyName = CodeMirror.keyName(e);
("Esc" == keyName || "Ctrl-C" == keyName || "Ctrl-[" == keyName) && (vimGlobalState.searchHistoryController.pushInput(query), 
vimGlobalState.searchHistoryController.reset(), updateSearchQuery(cm, originalQuery), 
clearSearchHighlight(cm), cm.scrollTo(originalScrollPos.left, originalScrollPos.top), 
CodeMirror.e_stop(e), close(), cm.focus());
}
if (cm.getSearchCursor) {
var forward = command.searchArgs.forward, wholeWordOnly = command.searchArgs.wholeWordOnly;
getSearchState(cm).setReversed(!forward);
var promptPrefix = forward ? "/" :"?", originalQuery = getSearchState(cm).getQuery(), originalScrollPos = cm.getScrollInfo();
switch (command.searchArgs.querySrc) {
case "prompt":
var macroModeState = vimGlobalState.macroModeState;
if (macroModeState.isPlaying) {
var query = macroModeState.replaySearchQueries.shift();
handleQuery(query, !0, !1);
} else showPrompt(cm, {
onClose:onPromptClose,
prefix:promptPrefix,
desc:searchPromptDesc,
onKeyUp:onPromptKeyUp,
onKeyDown:onPromptKeyDown
});
break;

case "wordUnderCursor":
var word = expandWordUnderCursor(cm, !1, !0, !1, !0), isKeyword = !0;
if (word || (word = expandWordUnderCursor(cm, !1, !0, !1, !1), isKeyword = !1), 
!word) return;
var query = cm.getLine(word.start.line).substring(word.start.ch, word.end.ch);
query = isKeyword && wholeWordOnly ? "\\b" + query + "\\b" :escapeRegex(query), 
vimGlobalState.jumpList.cachedCursor = cm.getCursor(), cm.setCursor(word.start), 
handleQuery(query, !0, !1);
}
}
},
processEx:function(cm, vim, command) {
function onPromptClose(input) {
vimGlobalState.exCommandHistoryController.pushInput(input), vimGlobalState.exCommandHistoryController.reset(), 
exCommandDispatcher.processCommand(cm, input);
}
function onPromptKeyDown(e, input, close) {
var up, keyName = CodeMirror.keyName(e);
("Esc" == keyName || "Ctrl-C" == keyName || "Ctrl-[" == keyName) && (vimGlobalState.exCommandHistoryController.pushInput(input), 
vimGlobalState.exCommandHistoryController.reset(), CodeMirror.e_stop(e), close(), 
cm.focus()), "Up" == keyName || "Down" == keyName ? (up = "Up" == keyName ? !0 :!1, 
input = vimGlobalState.exCommandHistoryController.nextMatch(input, up) || "", close(input)) :"Left" != keyName && "Right" != keyName && "Ctrl" != keyName && "Alt" != keyName && "Shift" != keyName && vimGlobalState.exCommandHistoryController.reset();
}
"keyToEx" == command.type ? exCommandDispatcher.processCommand(cm, command.exArgs.input) :vim.visualMode ? showPrompt(cm, {
onClose:onPromptClose,
prefix:":",
value:"'<,'>",
onKeyDown:onPromptKeyDown
}) :showPrompt(cm, {
onClose:onPromptClose,
prefix:":",
onKeyDown:onPromptKeyDown
});
},
evalInput:function(cm, vim) {
var curEnd, repeat, inputState = vim.inputState, motion = inputState.motion, motionArgs = inputState.motionArgs || {}, operator = inputState.operator, operatorArgs = inputState.operatorArgs || {}, registerName = inputState.registerName, selectionEnd = copyCursor(cm.getCursor("head")), selectionStart = copyCursor(cm.getCursor("anchor")), curStart = copyCursor(selectionEnd), curOriginal = copyCursor(curStart);
if (operator && this.recordLastEdit(vim, inputState), repeat = void 0 !== inputState.repeatOverride ? inputState.repeatOverride :inputState.getRepeat(), 
repeat > 0 && motionArgs.explicitRepeat ? motionArgs.repeatIsExplicit = !0 :(motionArgs.noRepeat || !motionArgs.explicitRepeat && 0 === repeat) && (repeat = 1, 
motionArgs.repeatIsExplicit = !1), inputState.selectedCharacter && (motionArgs.selectedCharacter = operatorArgs.selectedCharacter = inputState.selectedCharacter), 
motionArgs.repeat = repeat, clearInputState(cm), motion) {
var motionResult = motions[motion](cm, motionArgs, vim);
if (vim.lastMotion = motions[motion], !motionResult) return;
if (motionArgs.toJumplist) {
var jumpList = vimGlobalState.jumpList, cachedCursor = jumpList.cachedCursor;
cachedCursor ? (recordJumpPosition(cm, cachedCursor, motionResult), delete jumpList.cachedCursor) :recordJumpPosition(cm, curOriginal, motionResult);
}
if (motionResult instanceof Array ? (curStart = motionResult[0], curEnd = motionResult[1]) :curEnd = motionResult, 
curEnd || (curEnd = Pos(curStart.line, curStart.ch)), vim.visualMode) {
var offset = 0;
if (cursorIsBefore(selectionStart, selectionEnd) && (cursorEqual(selectionStart, curEnd) || cursorIsBefore(curEnd, selectionStart)) ? (selectionStart.ch += 1, 
offset = -1) :cursorIsBefore(selectionEnd, selectionStart) && (cursorEqual(selectionStart, curEnd) || cursorIsBefore(selectionStart, curEnd)) && (selectionStart.ch -= 1, 
offset = 1), vim.visualBlock || motionResult instanceof Array || (curEnd.ch += offset), 
1/0 != vim.lastHPos && (vim.lastHPos = curEnd.ch), selectionEnd = curEnd, selectionStart = motionResult instanceof Array ? curStart :selectionStart, 
vim.visualLine) if (cursorIsBefore(selectionStart, selectionEnd)) {
selectionStart.ch = 0;
var lastLine = cm.lastLine();
selectionEnd.line > lastLine && (selectionEnd.line = lastLine), selectionEnd.ch = lineLength(cm, selectionEnd.line);
} else selectionEnd.ch = 0, selectionStart.ch = lineLength(cm, selectionStart.line); else vim.visualBlock && (selectionStart = selectBlock(cm, selectionEnd));
vim.visualBlock || cm.setSelection(selectionStart, selectionEnd), updateMark(cm, vim, "<", cursorIsBefore(selectionStart, selectionEnd) ? selectionStart :selectionEnd), 
updateMark(cm, vim, ">", cursorIsBefore(selectionStart, selectionEnd) ? selectionEnd :selectionStart);
} else operator || (curEnd = clipCursorToContent(cm, curEnd), cm.setCursor(curEnd.line, curEnd.ch));
}
if (operator) {
var inverted = !1;
if (vim.lastMotion = null, operatorArgs.repeat = repeat, vim.visualMode && (curStart = selectionStart, 
curEnd = selectionEnd, motionArgs.inclusive = !0, operatorArgs.shouldMoveCursor = !1), 
curEnd && cursorIsBefore(curEnd, curStart)) {
var tmp = curStart;
curStart = curEnd, curEnd = tmp, inverted = !0;
} else curEnd || (curEnd = copyCursor(curStart));
if (motionArgs.inclusive && !vim.visualMode && curEnd.ch++, operatorArgs.selOffset) curEnd.line = curStart.line + operatorArgs.selOffset.line, 
curEnd.ch = operatorArgs.selOffset.line ? operatorArgs.selOffset.ch :curStart.ch + operatorArgs.selOffset.ch; else if (vim.visualMode) {
var selOffset = Pos();
selOffset.line = curEnd.line - curStart.line, selOffset.ch = selOffset.line ? curEnd.ch :curEnd.ch - curStart.ch, 
operatorArgs.selOffset = selOffset;
}
var linewise = motionArgs.linewise || vim.visualMode && vim.visualLine || operatorArgs.linewise;
linewise ? expandSelectionToLine(cm, curStart, curEnd) :motionArgs.forward && clipToLine(cm, curStart, curEnd), 
operatorArgs.registerName = registerName, operatorArgs.linewise = linewise, vim.visualBlock || cm.extendSelection(curStart, curEnd), 
operators[operator](cm, operatorArgs, vim, curStart, curEnd, curOriginal), vim.visualMode && exitVisualMode(cm);
}
},
recordLastEdit:function(vim, inputState, actionCommand) {
var macroModeState = vimGlobalState.macroModeState;
macroModeState.isPlaying || (vim.lastEditInputState = inputState, vim.lastEditActionCommand = actionCommand, 
macroModeState.lastInsertModeChanges.changes = [], macroModeState.lastInsertModeChanges.expectCursorActivityForChange = !1);
}
}, motions = {
moveToTopLine:function(cm, motionArgs) {
var line = getUserVisibleLines(cm).top + motionArgs.repeat - 1;
return Pos(line, findFirstNonWhiteSpaceCharacter(cm.getLine(line)));
},
moveToMiddleLine:function(cm) {
var range = getUserVisibleLines(cm), line = Math.floor(.5 * (range.top + range.bottom));
return Pos(line, findFirstNonWhiteSpaceCharacter(cm.getLine(line)));
},
moveToBottomLine:function(cm, motionArgs) {
var line = getUserVisibleLines(cm).bottom - motionArgs.repeat + 1;
return Pos(line, findFirstNonWhiteSpaceCharacter(cm.getLine(line)));
},
expandToLine:function(cm, motionArgs) {
var cur = cm.getCursor();
return Pos(cur.line + motionArgs.repeat - 1, 1/0);
},
findNext:function(cm, motionArgs) {
var state = getSearchState(cm), query = state.getQuery();
if (query) {
var prev = !motionArgs.forward;
return prev = state.isReversed() ? !prev :prev, highlightSearchMatches(cm, query), 
findNext(cm, prev, query, motionArgs.repeat);
}
},
goToMark:function(cm, motionArgs, vim) {
var mark = vim.marks[motionArgs.selectedCharacter];
if (mark) {
var pos = mark.find();
return motionArgs.linewise ? {
line:pos.line,
ch:findFirstNonWhiteSpaceCharacter(cm.getLine(pos.line))
} :pos;
}
return null;
},
moveToOtherHighlightedEnd:function(cm, motionArgs, vim) {
var ranges = cm.listSelections(), curEnd = cm.getCursor("head"), curStart = ranges[0].anchor, curIndex = cursorEqual(ranges[0].head, curEnd) ? ranges.length - 1 :0;
return motionArgs.sameLine && vim.visualBlock ? (curStart = Pos(curEnd.line, ranges[curIndex].anchor.ch), 
curEnd = Pos(ranges[curIndex].head.line, curEnd.ch)) :curStart = ranges[curIndex].anchor, 
cm.setCursor(curEnd), [ curEnd, curStart ];
},
jumpToMark:function(cm, motionArgs, vim) {
for (var best = cm.getCursor(), i = 0; i < motionArgs.repeat; i++) {
var cursor = best;
for (var key in vim.marks) if (isLowerCase(key)) {
var mark = vim.marks[key].find(), isWrongDirection = motionArgs.forward ? cursorIsBefore(mark, cursor) :cursorIsBefore(cursor, mark);
if (!(isWrongDirection || motionArgs.linewise && mark.line == cursor.line)) {
var equal = cursorEqual(cursor, best), between = motionArgs.forward ? cusrorIsBetween(cursor, mark, best) :cusrorIsBetween(best, mark, cursor);
(equal || between) && (best = mark);
}
}
}
return motionArgs.linewise && (best = Pos(best.line, findFirstNonWhiteSpaceCharacter(cm.getLine(best.line)))), 
best;
},
moveByCharacters:function(cm, motionArgs) {
var cur = cm.getCursor(), repeat = motionArgs.repeat, ch = motionArgs.forward ? cur.ch + repeat :cur.ch - repeat;
return Pos(cur.line, ch);
},
moveByLines:function(cm, motionArgs, vim) {
var cur = cm.getCursor(), endCh = cur.ch;
switch (vim.lastMotion) {
case this.moveByLines:
case this.moveByDisplayLines:
case this.moveByScroll:
case this.moveToColumn:
case this.moveToEol:
endCh = vim.lastHPos;
break;

default:
vim.lastHPos = endCh;
}
var repeat = motionArgs.repeat + (motionArgs.repeatOffset || 0), line = motionArgs.forward ? cur.line + repeat :cur.line - repeat, first = cm.firstLine(), last = cm.lastLine();
return first > line && cur.line == first || line > last && cur.line == last ? void 0 :(motionArgs.toFirstChar && (endCh = findFirstNonWhiteSpaceCharacter(cm.getLine(line)), 
vim.lastHPos = endCh), vim.lastHSPos = cm.charCoords(Pos(line, endCh), "div").left, 
Pos(line, endCh));
},
moveByDisplayLines:function(cm, motionArgs, vim) {
var cur = cm.getCursor();
switch (vim.lastMotion) {
case this.moveByDisplayLines:
case this.moveByScroll:
case this.moveByLines:
case this.moveToColumn:
case this.moveToEol:
break;

default:
vim.lastHSPos = cm.charCoords(cur, "div").left;
}
var repeat = motionArgs.repeat, res = cm.findPosV(cur, motionArgs.forward ? repeat :-repeat, "line", vim.lastHSPos);
if (res.hitSide) if (motionArgs.forward) var lastCharCoords = cm.charCoords(res, "div"), goalCoords = {
top:lastCharCoords.top + 8,
left:vim.lastHSPos
}, res = cm.coordsChar(goalCoords, "div"); else {
var resCoords = cm.charCoords(Pos(cm.firstLine(), 0), "div");
resCoords.left = vim.lastHSPos, res = cm.coordsChar(resCoords, "div");
}
return vim.lastHPos = res.ch, res;
},
moveByPage:function(cm, motionArgs) {
var curStart = cm.getCursor(), repeat = motionArgs.repeat;
return cm.findPosV(curStart, motionArgs.forward ? repeat :-repeat, "page");
},
moveByParagraph:function(cm, motionArgs) {
for (var line = cm.getCursor().line, repeat = motionArgs.repeat, inc = motionArgs.forward ? 1 :-1, i = 0; repeat > i && !(!motionArgs.forward && line === cm.firstLine() || motionArgs.forward && line == cm.lastLine()); i++) for (line += inc; line !== cm.firstLine() && line != cm.lastLine() && cm.getLine(line); ) line += inc;
return Pos(line, 0);
},
moveByScroll:function(cm, motionArgs, vim) {
var scrollbox = cm.getScrollInfo(), curEnd = null, repeat = motionArgs.repeat;
repeat || (repeat = scrollbox.clientHeight / (2 * cm.defaultTextHeight()));
var orig = cm.charCoords(cm.getCursor(), "local");
motionArgs.repeat = repeat;
var curEnd = motions.moveByDisplayLines(cm, motionArgs, vim);
if (!curEnd) return null;
var dest = cm.charCoords(curEnd, "local");
return cm.scrollTo(null, scrollbox.top + dest.top - orig.top), curEnd;
},
moveByWords:function(cm, motionArgs) {
return moveToWord(cm, motionArgs.repeat, !!motionArgs.forward, !!motionArgs.wordEnd, !!motionArgs.bigWord);
},
moveTillCharacter:function(cm, motionArgs) {
var repeat = motionArgs.repeat, curEnd = moveToCharacter(cm, repeat, motionArgs.forward, motionArgs.selectedCharacter), increment = motionArgs.forward ? -1 :1;
return recordLastCharacterSearch(increment, motionArgs), curEnd ? (curEnd.ch += increment, 
curEnd) :null;
},
moveToCharacter:function(cm, motionArgs) {
var repeat = motionArgs.repeat;
return recordLastCharacterSearch(0, motionArgs), moveToCharacter(cm, repeat, motionArgs.forward, motionArgs.selectedCharacter) || cm.getCursor();
},
moveToSymbol:function(cm, motionArgs) {
var repeat = motionArgs.repeat;
return findSymbol(cm, repeat, motionArgs.forward, motionArgs.selectedCharacter) || cm.getCursor();
},
moveToColumn:function(cm, motionArgs, vim) {
var repeat = motionArgs.repeat;
return vim.lastHPos = repeat - 1, vim.lastHSPos = cm.charCoords(cm.getCursor(), "div").left, 
moveToColumn(cm, repeat);
},
moveToEol:function(cm, motionArgs, vim) {
var cur = cm.getCursor();
vim.lastHPos = 1/0;
var retval = Pos(cur.line + motionArgs.repeat - 1, 1/0), end = cm.clipPos(retval);
return end.ch--, vim.lastHSPos = cm.charCoords(end, "div").left, retval;
},
moveToFirstNonWhiteSpaceCharacter:function(cm) {
var cursor = cm.getCursor();
return Pos(cursor.line, findFirstNonWhiteSpaceCharacter(cm.getLine(cursor.line)));
},
moveToMatchedSymbol:function(cm) {
var symbol, cursor = cm.getCursor(), line = cursor.line, ch = cursor.ch, lineText = cm.getLine(line);
do if (symbol = lineText.charAt(ch++), symbol && isMatchableSymbol(symbol)) {
var style = cm.getTokenTypeAt(Pos(line, ch));
if ("string" !== style && "comment" !== style) break;
} while (symbol);
if (symbol) {
var matched = cm.findMatchingBracket(Pos(line, ch));
return matched.to;
}
return cursor;
},
moveToStartOfLine:function(cm) {
var cursor = cm.getCursor();
return Pos(cursor.line, 0);
},
moveToLineOrEdgeOfDocument:function(cm, motionArgs) {
var lineNum = motionArgs.forward ? cm.lastLine() :cm.firstLine();
return motionArgs.repeatIsExplicit && (lineNum = motionArgs.repeat - cm.getOption("firstLineNumber")), 
Pos(lineNum, findFirstNonWhiteSpaceCharacter(cm.getLine(lineNum)));
},
textObjectManipulation:function(cm, motionArgs) {
var mirroredPairs = {
"(":")",
")":"(",
"{":"}",
"}":"{",
"[":"]",
"]":"["
}, selfPaired = {
"'":!0,
'"':!0
}, character = motionArgs.selectedCharacter;
"b" == character ? character = "(" :"B" == character && (character = "{");
var tmp, inclusive = !motionArgs.textObjectInner;
if (mirroredPairs[character]) tmp = selectCompanionObject(cm, character, inclusive); else if (selfPaired[character]) tmp = findBeginningAndEnd(cm, character, inclusive); else if ("W" === character) tmp = expandWordUnderCursor(cm, inclusive, !0, !0); else {
if ("w" !== character) return null;
tmp = expandWordUnderCursor(cm, inclusive, !0, !1);
}
return [ tmp.start, tmp.end ];
},
repeatLastCharacterSearch:function(cm, motionArgs) {
var lastSearch = vimGlobalState.lastChararacterSearch, repeat = motionArgs.repeat, forward = motionArgs.forward === lastSearch.forward, increment = (lastSearch.increment ? 1 :0) * (forward ? -1 :1);
cm.moveH(-increment, "char"), motionArgs.inclusive = forward ? !0 :!1;
var curEnd = moveToCharacter(cm, repeat, forward, lastSearch.selectedCharacter);
return curEnd ? (curEnd.ch += increment, curEnd) :(cm.moveH(increment, "char"), 
cm.getCursor());
}
}, operators = {
change:function(cm, operatorArgs, _vim, curStart, curEnd) {
if (vimGlobalState.registerController.pushText(operatorArgs.registerName, "change", cm.getRange(curStart, curEnd), operatorArgs.linewise), 
operatorArgs.linewise) {
var replacement = curEnd.line > cm.lastLine() ? "" :"\n";
cm.replaceRange(replacement, curStart, curEnd), cm.indentLine(curStart.line, "smart"), 
curStart.ch = null;
} else {
var text = cm.getRange(curStart, curEnd);
if (!isWhiteSpaceString(text)) {
var match = /\s+$/.exec(text);
match && (curEnd = offsetCursor(curEnd, 0, -match[0].length));
}
cm.replaceRange("", curStart, curEnd);
}
actions.enterInsertMode(cm, {}, cm.state.vim), cm.setCursor(curStart);
},
"delete":function(cm, operatorArgs, vim, curStart, curEnd) {
var selectionEnd = vim.visualMode ? vim.marks[">"].find() :null;
if (operatorArgs.linewise && curEnd.line > cm.lastLine() && curStart.line > cm.firstLine() && (curStart.line--, 
curStart.ch = lineLength(cm, curStart.line)), vimGlobalState.registerController.pushText(operatorArgs.registerName, "delete", cm.getRange(curStart, curEnd), operatorArgs.linewise), 
vim.visualBlock) {
var selections = cm.listSelections();
curStart = selections[0].anchor;
var replacement = new Array(selections.length).join("1").split("1");
cm.replaceSelections(replacement);
} else cm.replaceRange("", curStart, curEnd);
selectionEnd && (vim.marks[">"] = cm.setBookmark(selectionEnd)), operatorArgs.linewise ? cm.setCursor(motions.moveToFirstNonWhiteSpaceCharacter(cm)) :cm.setCursor(curStart);
},
indent:function(cm, operatorArgs, vim, curStart, curEnd) {
var startLine = curStart.line, endLine = curEnd.line, repeat = vim.visualMode ? operatorArgs.repeat :1;
operatorArgs.linewise && endLine--;
for (var i = startLine; endLine >= i; i++) for (var j = 0; repeat > j; j++) cm.indentLine(i, operatorArgs.indentRight);
cm.setCursor(curStart), cm.setCursor(motions.moveToFirstNonWhiteSpaceCharacter(cm));
},
swapcase:function(cm, operatorArgs) {
for (var selections = cm.getSelections(), ranges = cm.listSelections(), swapped = [], j = 0; j < selections.length; j++) {
for (var toSwap = selections[j], text = "", i = 0; i < toSwap.length; i++) {
var character = toSwap.charAt(i);
text += isUpperCase(character) ? character.toLowerCase() :character.toUpperCase();
}
swapped.push(text);
}
cm.replaceSelections(swapped);
var curStart = ranges[0].anchor, curEnd = ranges[0].head;
operatorArgs.shouldMoveCursor || cm.setCursor(cursorIsBefore(curStart, curEnd) ? curStart :curEnd);
},
yank:function(cm, operatorArgs, _vim, _curStart, _curEnd, curOriginal) {
var text = cm.getSelection();
vimGlobalState.registerController.pushText(operatorArgs.registerName, "yank", text, operatorArgs.linewise), 
cm.setCursor(curOriginal);
}
}, actions = {
jumpListWalk:function(cm, actionArgs, vim) {
if (!vim.visualMode) {
var repeat = actionArgs.repeat, forward = actionArgs.forward, jumpList = vimGlobalState.jumpList, mark = jumpList.move(cm, forward ? repeat :-repeat), markPos = mark ? mark.find() :void 0;
markPos = markPos ? markPos :cm.getCursor(), cm.setCursor(markPos);
}
},
scroll:function(cm, actionArgs, vim) {
if (!vim.visualMode) {
var repeat = actionArgs.repeat || 1, lineHeight = cm.defaultTextHeight(), top = cm.getScrollInfo().top, delta = lineHeight * repeat, newPos = actionArgs.forward ? top + delta :top - delta, cursor = copyCursor(cm.getCursor()), cursorCoords = cm.charCoords(cursor, "local");
if (actionArgs.forward) newPos > cursorCoords.top ? (cursor.line += (newPos - cursorCoords.top) / lineHeight, 
cursor.line = Math.ceil(cursor.line), cm.setCursor(cursor), cursorCoords = cm.charCoords(cursor, "local"), 
cm.scrollTo(null, cursorCoords.top)) :cm.scrollTo(null, newPos); else {
var newBottom = newPos + cm.getScrollInfo().clientHeight;
newBottom < cursorCoords.bottom ? (cursor.line -= (cursorCoords.bottom - newBottom) / lineHeight, 
cursor.line = Math.floor(cursor.line), cm.setCursor(cursor), cursorCoords = cm.charCoords(cursor, "local"), 
cm.scrollTo(null, cursorCoords.bottom - cm.getScrollInfo().clientHeight)) :cm.scrollTo(null, newPos);
}
}
},
scrollToCursor:function(cm, actionArgs) {
var lineNum = cm.getCursor().line, charCoords = cm.charCoords(Pos(lineNum, 0), "local"), height = cm.getScrollInfo().clientHeight, y = charCoords.top, lineHeight = charCoords.bottom - y;
switch (actionArgs.position) {
case "center":
y = y - height / 2 + lineHeight;
break;

case "bottom":
y = y - height + 1.4 * lineHeight;
break;

case "top":
y += .4 * lineHeight;
}
cm.scrollTo(null, y);
},
replayMacro:function(cm, actionArgs, vim) {
var registerName = actionArgs.selectedCharacter, repeat = actionArgs.repeat, macroModeState = vimGlobalState.macroModeState;
for ("@" == registerName && (registerName = macroModeState.latestRegister); repeat--; ) executeMacroRegister(cm, vim, macroModeState, registerName);
},
enterMacroRecordMode:function(cm, actionArgs) {
var macroModeState = vimGlobalState.macroModeState, registerName = actionArgs.selectedCharacter;
macroModeState.enterMacroRecordMode(cm, registerName);
},
enterInsertMode:function(cm, actionArgs, vim) {
if (!cm.getOption("readOnly")) {
vim.insertMode = !0, vim.insertModeRepeat = actionArgs && actionArgs.repeat || 1;
var insertAt = actionArgs ? actionArgs.insertAt :null;
if ("eol" == insertAt) {
var cursor = cm.getCursor();
cursor = Pos(cursor.line, lineLength(cm, cursor.line)), cm.setCursor(cursor);
} else if ("charAfter" == insertAt) cm.setCursor(offsetCursor(cm.getCursor(), 0, 1)); else if ("firstNonBlank" == insertAt) cm.setCursor(motions.moveToFirstNonWhiteSpaceCharacter(cm)); else if ("endOfSelectedArea" == insertAt) {
var selectionEnd = cm.getCursor("head"), selectionStart = cm.getCursor("anchor");
selectionEnd.line < selectionStart.line && (selectionEnd = Pos(selectionStart.line, 0)), 
cm.setCursor(selectionEnd), exitVisualMode(cm);
}
cm.setOption("keyMap", "vim-insert"), cm.setOption("disableInput", !1), actionArgs && actionArgs.replace ? (cm.toggleOverwrite(!0), 
cm.setOption("keyMap", "vim-replace"), CodeMirror.signal(cm, "vim-mode-change", {
mode:"replace"
})) :(cm.setOption("keyMap", "vim-insert"), CodeMirror.signal(cm, "vim-mode-change", {
mode:"insert"
})), vimGlobalState.macroModeState.isPlaying || (cm.on("change", onChange), CodeMirror.on(cm.getInputField(), "keydown", onKeyEventTargetKeyDown));
}
},
toggleVisualMode:function(cm, actionArgs, vim) {
var curEnd, repeat = actionArgs.repeat, curStart = cm.getCursor(), selections = cm.listSelections();
vim.visualMode ? (curStart = cm.getCursor("anchor"), curEnd = cm.getCursor("head"), 
vim.visualLine ? (actionArgs.blockwise ? (vim.visualBlock = !0, selectBlock(cm, curEnd), 
CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual",
subMode:"blockwise"
})) :actionArgs.linewise ? exitVisualMode(cm) :CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual"
}), vim.visualLine = !1) :vim.visualBlock ? (actionArgs.linewise ? (vim.visualLine = !0, 
curStart = Pos(selections[0].anchor.line, 0), curEnd = Pos(selections[selections.length - 1].anchor.line, lineLength(cm, selections[selections.length - 1].anchor.line)), 
cm.setSelection(curStart, curEnd), CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual",
subMode:"linewise"
})) :actionArgs.blockwise ? exitVisualMode(cm) :(curStart = curEnd != selections[0].head ? selections[0].anchor :selections[selections.length - 1].anchor, 
cm.setSelection(curStart, curEnd), CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual"
})), vim.visualBlock = !1) :actionArgs.linewise ? (vim.visualLine = !0, curStart.ch = cursorIsBefore(curStart, curEnd) ? 0 :lineLength(cm, curStart.line), 
curEnd.ch = cursorIsBefore(curStart, curEnd) ? lineLength(cm, curEnd.line) :0, cm.setSelection(curStart, curEnd), 
CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual",
subMode:"linewise"
})) :actionArgs.blockwise ? (vim.visualBlock = !0, selectBlock(cm, curEnd), CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual",
subMode:"blockwise"
})) :exitVisualMode(cm)) :(cm.on("mousedown", exitVisualMode), vim.visualMode = !0, 
vim.visualLine = !!actionArgs.linewise, vim.visualBlock = !!actionArgs.blockwise, 
vim.visualLine ? (curStart.ch = 0, curEnd = clipCursorToContent(cm, Pos(curStart.line + repeat - 1, lineLength(cm, curStart.line)), !0)) :curEnd = clipCursorToContent(cm, Pos(curStart.line, curStart.ch + repeat), !0), 
cm.setSelection(curStart, curEnd), CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual",
subMode:vim.visualLine ? "linewise" :""
})), updateMark(cm, vim, "<", cursorIsBefore(curStart, curEnd) ? curStart :curEnd), 
updateMark(cm, vim, ">", cursorIsBefore(curStart, curEnd) ? curEnd :curStart);
},
reselectLastSelection:function(cm, _actionArgs, vim) {
var curStart = vim.marks["<"].find(), curEnd = vim.marks[">"].find(), lastSelection = vim.lastSelection;
if (lastSelection) {
var selectionStart = lastSelection.curStartMark.find(), selectionEnd = lastSelection.curEndMark.find(), blockwise = lastSelection.visualBlock;
updateLastSelection(cm, vim, curStart, curEnd), blockwise ? (cm.setCursor(selectionStart), 
selectionStart = selectBlock(cm, selectionEnd)) :(cm.setSelection(selectionStart, selectionEnd), 
selectionStart = cm.getCursor("anchor"), selectionEnd = cm.getCursor("head")), vim.visualMode && (updateMark(cm, vim, "<", cursorIsBefore(selectionStart, selectionEnd) ? selectionStart :selectionEnd), 
updateMark(cm, vim, ">", cursorIsBefore(selectionStart, selectionEnd) ? selectionEnd :selectionStart)), 
vim.visualMode = !0, lastSelection.visualLine ? (vim.visualLine = !0, vim.visualBlock = !1) :lastSelection.visualBlock ? (vim.visualLine = !1, 
vim.visualBlock = !0) :vim.visualBlock = vim.visualLine = !1, CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual",
subMode:vim.visualLine ? "linewise" :""
});
}
},
joinLines:function(cm, actionArgs, vim) {
var curStart, curEnd;
if (vim.visualMode) curStart = cm.getCursor("anchor"), curEnd = cm.getCursor("head"), 
curEnd.ch = lineLength(cm, curEnd.line) - 1; else {
var repeat = Math.max(actionArgs.repeat, 2);
curStart = cm.getCursor(), curEnd = clipCursorToContent(cm, Pos(curStart.line + repeat - 1, 1/0));
}
var finalCh = 0;
cm.operation(function() {
for (var i = curStart.line; i < curEnd.line; i++) {
finalCh = lineLength(cm, curStart.line);
var tmp = Pos(curStart.line + 1, lineLength(cm, curStart.line + 1)), text = cm.getRange(curStart, tmp);
text = text.replace(/\n\s*/g, " "), cm.replaceRange(text, curStart, tmp);
}
var curFinalPos = Pos(curStart.line, finalCh);
cm.setCursor(curFinalPos);
});
},
newLineAndEnterInsertMode:function(cm, actionArgs, vim) {
vim.insertMode = !0;
var insertAt = copyCursor(cm.getCursor());
if (insertAt.line !== cm.firstLine() || actionArgs.after) {
insertAt.line = actionArgs.after ? insertAt.line :insertAt.line - 1, insertAt.ch = lineLength(cm, insertAt.line), 
cm.setCursor(insertAt);
var newlineFn = CodeMirror.commands.newlineAndIndentContinueComment || CodeMirror.commands.newlineAndIndent;
newlineFn(cm);
} else cm.replaceRange("\n", Pos(cm.firstLine(), 0)), cm.setCursor(cm.firstLine(), 0);
this.enterInsertMode(cm, {
repeat:actionArgs.repeat
}, vim);
},
paste:function(cm, actionArgs, vim) {
var cur = copyCursor(cm.getCursor()), register = vimGlobalState.registerController.getRegister(actionArgs.registerName), text = register.toString();
if (text) {
if (actionArgs.matchIndent) {
var whitespaceLength = function(str) {
var tabs = str.split("	").length - 1, spaces = str.split(" ").length - 1;
return tabs * cm.options.tabSize + 1 * spaces;
}, currentLine = cm.getLine(cm.getCursor().line), indent = whitespaceLength(currentLine.match(/^\s*/)[0]), chompedText = text.replace(/\n$/, ""), wasChomped = text !== chompedText, firstIndent = whitespaceLength(text.match(/^\s*/)[0]), text = chompedText.replace(/^\s*/gm, function(wspace) {
var newIndent = indent + (whitespaceLength(wspace) - firstIndent);
if (0 > newIndent) return "";
if (cm.options.indentWithTabs) {
var quotient = Math.floor(newIndent / cm.options.tabSize);
return Array(quotient + 1).join("	");
}
return Array(newIndent + 1).join(" ");
});
text += wasChomped ? "\n" :"";
}
if (actionArgs.repeat > 1) var text = Array(actionArgs.repeat + 1).join(text);
var linewise = register.linewise;
linewise ? vim.visualMode ? text = vim.visualLine ? text.slice(0, -1) :"\n" + text.slice(0, text.length - 1) + "\n" :actionArgs.after ? (text = "\n" + text.slice(0, text.length - 1), 
cur.ch = lineLength(cm, cur.line)) :cur.ch = 0 :cur.ch += actionArgs.after ? 1 :0;
var curPosFinal, idx;
if (vim.visualMode) {
vim.lastPastedText = text;
var lastSelectionCurEnd, selectedArea = getSelectedAreaRange(cm, vim), selectionStart = selectedArea[0], selectionEnd = selectedArea[1];
vim.lastSelection && (lastSelectionCurEnd = vim.lastSelection.curEndMark.find()), 
vimGlobalState.registerController.unnamedRegister.setText(cm.getRange(selectionStart, selectionEnd)), 
cm.replaceRange(text, selectionStart, selectionEnd), lastSelectionCurEnd && (vim.lastSelection.curEndMark = cm.setBookmark(lastSelectionCurEnd)), 
curPosFinal = cm.posFromIndex(cm.indexFromPos(selectionStart) + text.length - 1), 
linewise && (curPosFinal.ch = 0);
} else cm.replaceRange(text, cur), linewise && actionArgs.after ? curPosFinal = Pos(cur.line + 1, findFirstNonWhiteSpaceCharacter(cm.getLine(cur.line + 1))) :linewise && !actionArgs.after ? curPosFinal = Pos(cur.line, findFirstNonWhiteSpaceCharacter(cm.getLine(cur.line))) :!linewise && actionArgs.after ? (idx = cm.indexFromPos(cur), 
curPosFinal = cm.posFromIndex(idx + text.length - 1)) :(idx = cm.indexFromPos(cur), 
curPosFinal = cm.posFromIndex(idx + text.length));
cm.setCursor(curPosFinal);
}
},
undo:function(cm, actionArgs) {
cm.operation(function() {
repeatFn(cm, CodeMirror.commands.undo, actionArgs.repeat)(), cm.setCursor(cm.getCursor("anchor"));
});
},
redo:function(cm, actionArgs) {
repeatFn(cm, CodeMirror.commands.redo, actionArgs.repeat)();
},
setRegister:function(_cm, actionArgs, vim) {
vim.inputState.registerName = actionArgs.selectedCharacter;
},
setMark:function(cm, actionArgs, vim) {
var markName = actionArgs.selectedCharacter;
updateMark(cm, vim, markName, cm.getCursor());
},
replace:function(cm, actionArgs, vim) {
var replaceTo, curEnd, replaceWith = actionArgs.selectedCharacter, curStart = cm.getCursor();
if (vim.visualMode) curStart = cm.getCursor("start"), curEnd = cm.getCursor("end"); else {
var line = cm.getLine(curStart.line);
replaceTo = curStart.ch + actionArgs.repeat, replaceTo > line.length && (replaceTo = line.length), 
curEnd = Pos(curStart.line, replaceTo);
}
if ("\n" == replaceWith) vim.visualMode || cm.replaceRange("", curStart, curEnd), 
(CodeMirror.commands.newlineAndIndentContinueComment || CodeMirror.commands.newlineAndIndent)(cm); else {
var replaceWithStr = cm.getRange(curStart, curEnd);
replaceWithStr = replaceWithStr.replace(/[^\n]/g, replaceWith), cm.replaceRange(replaceWithStr, curStart, curEnd), 
vim.visualMode ? (cm.setCursor(curStart), exitVisualMode(cm)) :cm.setCursor(offsetCursor(curEnd, 0, -1));
}
},
incrementNumberToken:function(cm, actionArgs) {
for (var match, start, end, numberStr, token, cur = cm.getCursor(), lineStr = cm.getLine(cur.line), re = /-?\d+/g; null !== (match = re.exec(lineStr)) && (token = match[0], 
start = match.index, end = start + token.length, !(cur.ch < end)); ) ;
if ((actionArgs.backtrack || !(end <= cur.ch)) && token) {
var increment = actionArgs.increase ? 1 :-1, number = parseInt(token) + increment * actionArgs.repeat, from = Pos(cur.line, start), to = Pos(cur.line, end);
numberStr = number.toString(), cm.replaceRange(numberStr, from, to), cm.setCursor(Pos(cur.line, start + numberStr.length - 1));
}
},
repeatLastEdit:function(cm, actionArgs, vim) {
var lastEditInputState = vim.lastEditInputState;
if (lastEditInputState) {
var repeat = actionArgs.repeat;
repeat && actionArgs.repeatIsExplicit ? vim.lastEditInputState.repeatOverride = repeat :repeat = vim.lastEditInputState.repeatOverride || repeat, 
repeatLastEdit(cm, vim, repeat, !1);
}
},
changeCase:function(cm, actionArgs, vim) {
var selectedAreaRange = getSelectedAreaRange(cm, vim), selectionStart = selectedAreaRange[0], selectionEnd = selectedAreaRange[1], lastSelectionCurEnd = vim.lastSelection.curEndMark.find(), toLower = actionArgs.toLower, text = cm.getRange(selectionStart, selectionEnd);
cm.replaceRange(toLower ? text.toLowerCase() :text.toUpperCase(), selectionStart, selectionEnd), 
vim.lastSelection.curEndMark = cm.setBookmark(lastSelectionCurEnd), cm.setCursor(selectionStart);
}
}, symbolToMode = {
"(":"bracket",
")":"bracket",
"{":"bracket",
"}":"bracket",
"[":"section",
"]":"section",
"*":"comment",
"/":"comment",
m:"method",
M:"method",
"#":"preprocess"
}, findSymbolModes = {
bracket:{
isComplete:function(state) {
if (state.nextCh === state.symb) {
if (state.depth++, state.depth >= 1) return !0;
} else state.nextCh === state.reverseSymb && state.depth--;
return !1;
}
},
section:{
init:function(state) {
state.curMoveThrough = !0, state.symb = (state.forward ? "]" :"[") === state.symb ? "{" :"}";
},
isComplete:function(state) {
return 0 === state.index && state.nextCh === state.symb;
}
},
comment:{
isComplete:function(state) {
var found = "*" === state.lastCh && "/" === state.nextCh;
return state.lastCh = state.nextCh, found;
}
},
method:{
init:function(state) {
state.symb = "m" === state.symb ? "{" :"}", state.reverseSymb = "{" === state.symb ? "}" :"{";
},
isComplete:function(state) {
return state.nextCh === state.symb ? !0 :!1;
}
},
preprocess:{
init:function(state) {
state.index = 0;
},
isComplete:function(state) {
if ("#" === state.nextCh) {
var token = state.lineText.match(/#(\w+)/)[1];
if ("endif" === token) {
if (state.forward && 0 === state.depth) return !0;
state.depth++;
} else if ("if" === token) {
if (!state.forward && 0 === state.depth) return !0;
state.depth--;
}
if ("else" === token && 0 === state.depth) return !0;
}
return !1;
}
}
};
defineOption("pcre", !0, "boolean"), SearchState.prototype = {
getQuery:function() {
return vimGlobalState.query;
},
setQuery:function(query) {
vimGlobalState.query = query;
},
getOverlay:function() {
return this.searchOverlay;
},
setOverlay:function(overlay) {
this.searchOverlay = overlay;
},
isReversed:function() {
return vimGlobalState.isReversed;
},
setReversed:function(reversed) {
vimGlobalState.isReversed = reversed;
}
};
var searchPromptDesc = "(Javascript regexp)", defaultExCommandMap = [ {
name:"map"
}, {
name:"nmap",
shortName:"nm"
}, {
name:"vmap",
shortName:"vm"
}, {
name:"unmap"
}, {
name:"write",
shortName:"w"
}, {
name:"undo",
shortName:"u"
}, {
name:"redo",
shortName:"red"
}, {
name:"set",
shortName:"set"
}, {
name:"sort",
shortName:"sor"
}, {
name:"substitute",
shortName:"s",
possiblyAsync:!0
}, {
name:"nohlsearch",
shortName:"noh"
}, {
name:"delmarks",
shortName:"delm"
}, {
name:"registers",
shortName:"reg",
excludeFromCommandHistory:!0
}, {
name:"global",
shortName:"g"
} ];
Vim.ExCommandDispatcher = function() {
this.buildCommandMap_();
}, Vim.ExCommandDispatcher.prototype = {
processCommand:function(cm, input, opt_params) {
var vim = cm.state.vim, commandHistoryRegister = vimGlobalState.registerController.getRegister(":"), previousCommand = commandHistoryRegister.toString();
vim.visualMode && exitVisualMode(cm);
var inputStream = new CodeMirror.StringStream(input);
commandHistoryRegister.setText(input);
var params = opt_params || {};
params.input = input;
try {
this.parseInput_(cm, inputStream, params);
} catch (e) {
throw showConfirm(cm, e), e;
}
var command, commandName;
if (params.commandName) {
if (command = this.matchCommand_(params.commandName)) {
if (commandName = command.name, command.excludeFromCommandHistory && commandHistoryRegister.setText(previousCommand), 
this.parseCommandArgs_(inputStream, params, command), "exToKey" == command.type) {
for (var i = 0; i < command.toKeys.length; i++) CodeMirror.Vim.handleKey(cm, command.toKeys[i]);
return;
}
if ("exToEx" == command.type) return this.processCommand(cm, command.toInput), void 0;
}
} else void 0 !== params.line && (commandName = "move");
if (!commandName) return showConfirm(cm, 'Not an editor command ":' + input + '"'), 
void 0;
try {
exCommands[commandName](cm, params), command && command.possiblyAsync || !params.callback || params.callback();
} catch (e) {
throw showConfirm(cm, e), e;
}
},
parseInput_:function(cm, inputStream, result) {
inputStream.eatWhile(":"), inputStream.eat("%") ? (result.line = cm.firstLine(), 
result.lineEnd = cm.lastLine()) :(result.line = this.parseLineSpec_(cm, inputStream), 
void 0 !== result.line && inputStream.eat(",") && (result.lineEnd = this.parseLineSpec_(cm, inputStream)));
var commandMatch = inputStream.match(/^(\w+)/);
return result.commandName = commandMatch ? commandMatch[1] :inputStream.match(/.*/)[0], 
result;
},
parseLineSpec_:function(cm, inputStream) {
var numberMatch = inputStream.match(/^(\d+)/);
if (numberMatch) return parseInt(numberMatch[1], 10) - 1;
switch (inputStream.next()) {
case ".":
return cm.getCursor().line;

case "$":
return cm.lastLine();

case "'":
var mark = cm.state.vim.marks[inputStream.next()];
if (mark && mark.find()) return mark.find().line;
throw new Error("Mark not set");

default:
return inputStream.backUp(1), void 0;
}
},
parseCommandArgs_:function(inputStream, params, command) {
if (!inputStream.eol()) {
params.argString = inputStream.match(/.*/)[0];
var delim = command.argDelimiter || /\s+/, args = trim(params.argString).split(delim);
args.length && args[0] && (params.args = args);
}
},
matchCommand_:function(commandName) {
for (var i = commandName.length; i > 0; i--) {
var prefix = commandName.substring(0, i);
if (this.commandMap_[prefix]) {
var command = this.commandMap_[prefix];
if (0 === command.name.indexOf(commandName)) return command;
}
}
return null;
},
buildCommandMap_:function() {
this.commandMap_ = {};
for (var i = 0; i < defaultExCommandMap.length; i++) {
var command = defaultExCommandMap[i], key = command.shortName || command.name;
this.commandMap_[key] = command;
}
},
map:function(lhs, rhs, ctx) {
if (":" != lhs && ":" == lhs.charAt(0)) {
if (ctx) throw Error("Mode not supported for ex mappings");
var commandName = lhs.substring(1);
this.commandMap_[commandName] = ":" != rhs && ":" == rhs.charAt(0) ? {
name:commandName,
type:"exToEx",
toInput:rhs.substring(1),
user:!0
} :{
name:commandName,
type:"exToKey",
toKeys:parseKeyString(rhs),
user:!0
};
} else if (":" != rhs && ":" == rhs.charAt(0)) {
var mapping = {
keys:parseKeyString(lhs),
type:"keyToEx",
exArgs:{
input:rhs.substring(1)
},
user:!0
};
ctx && (mapping.context = ctx), defaultKeymap.unshift(mapping);
} else {
var mapping = {
keys:parseKeyString(lhs),
type:"keyToKey",
toKeys:parseKeyString(rhs),
user:!0
};
ctx && (mapping.context = ctx), defaultKeymap.unshift(mapping);
}
},
unmap:function(lhs, ctx) {
var arrayEquals = function(a, b) {
if (a === b) return !0;
if (null == a || null == b) return !0;
if (a.length != b.length) return !1;
for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return !1;
return !0;
};
if (":" != lhs && ":" == lhs.charAt(0)) {
if (ctx) throw Error("Mode not supported for ex mappings");
var commandName = lhs.substring(1);
if (this.commandMap_[commandName] && this.commandMap_[commandName].user) return delete this.commandMap_[commandName], 
void 0;
} else for (var keys = parseKeyString(lhs), i = 0; i < defaultKeymap.length; i++) if (arrayEquals(keys, defaultKeymap[i].keys) && defaultKeymap[i].context === ctx && defaultKeymap[i].user) return defaultKeymap.splice(i, 1), 
void 0;
throw Error("No such mapping.");
}
};
var exCommands = {
map:function(cm, params, ctx) {
var mapArgs = params.args;
return !mapArgs || mapArgs.length < 2 ? (cm && showConfirm(cm, "Invalid mapping: " + params.input), 
void 0) :(exCommandDispatcher.map(mapArgs[0], mapArgs[1], ctx), void 0);
},
nmap:function(cm, params) {
this.map(cm, params, "normal");
},
vmap:function(cm, params) {
this.map(cm, params, "visual");
},
unmap:function(cm, params, ctx) {
var mapArgs = params.args;
return !mapArgs || mapArgs.length < 1 ? (cm && showConfirm(cm, "No such mapping: " + params.input), 
void 0) :(exCommandDispatcher.unmap(mapArgs[0], ctx), void 0);
},
move:function(cm, params) {
commandDispatcher.processCommand(cm, cm.state.vim, {
type:"motion",
motion:"moveToLineOrEdgeOfDocument",
motionArgs:{
forward:!1,
explicitRepeat:!0,
linewise:!0
},
repeatOverride:params.line + 1
});
},
set:function(cm, params) {
var setArgs = params.args;
if (!setArgs || setArgs.length < 1) return cm && showConfirm(cm, "Invalid mapping: " + params.input), 
void 0;
var expr = setArgs[0].split("="), optionName = expr[0], value = expr[1], forceGet = !1;
if ("?" == optionName.charAt(optionName.length - 1)) {
if (value) throw Error("Trailing characters: " + params.argString);
optionName = optionName.substring(0, optionName.length - 1), forceGet = !0;
}
void 0 === value && "no" == optionName.substring(0, 2) && (optionName = optionName.substring(2), 
value = !1);
var optionIsBoolean = options[optionName] && "boolean" == options[optionName].type;
if (optionIsBoolean && void 0 == value && (value = !0), !optionIsBoolean && !value || forceGet) {
var oldValue = getOption(optionName);
oldValue === !0 || oldValue === !1 ? showConfirm(cm, " " + (oldValue ? "" :"no") + optionName) :showConfirm(cm, "  " + optionName + "=" + oldValue);
} else setOption(optionName, value);
},
registers:function(cm, params) {
var regArgs = params.args, registers = vimGlobalState.registerController.registers, regInfo = "----------Registers----------<br><br>";
if (regArgs) {
var registerName;
regArgs = regArgs.join("");
for (var i = 0; i < regArgs.length; i++) if (registerName = regArgs.charAt(i), vimGlobalState.registerController.isValidRegister(registerName)) {
var register = registers[registerName] || new Register();
regInfo += '"' + registerName + "    " + register.toString() + "<br>";
}
} else for (var registerName in registers) {
var text = registers[registerName].toString();
text.length && (regInfo += '"' + registerName + "    " + text + "<br>");
}
showConfirm(cm, regInfo);
},
sort:function(cm, params) {
function parseArgs() {
if (params.argString) {
var args = new CodeMirror.StringStream(params.argString);
if (args.eat("!") && (reverse = !0), args.eol()) return;
if (!args.eatSpace()) return "Invalid arguments";
var opts = args.match(/[a-z]+/);
if (opts) {
opts = opts[0], ignoreCase = -1 != opts.indexOf("i"), unique = -1 != opts.indexOf("u");
var decimal = -1 != opts.indexOf("d") && 1, hex = -1 != opts.indexOf("x") && 1, octal = -1 != opts.indexOf("o") && 1;
if (decimal + hex + octal > 1) return "Invalid arguments";
number = decimal && "decimal" || hex && "hex" || octal && "octal";
}
args.eatSpace() && args.match(/\/.*\//);
}
}
function compareFn(a, b) {
if (reverse) {
var tmp;
tmp = a, a = b, b = tmp;
}
ignoreCase && (a = a.toLowerCase(), b = b.toLowerCase());
var anum = number && numberRegex.exec(a), bnum = number && numberRegex.exec(b);
return anum ? (anum = parseInt((anum[1] + anum[2]).toLowerCase(), radix), bnum = parseInt((bnum[1] + bnum[2]).toLowerCase(), radix), 
anum - bnum) :b > a ? -1 :1;
}
var reverse, ignoreCase, unique, number, err = parseArgs();
if (err) return showConfirm(cm, err + ": " + params.argString), void 0;
var lineStart = params.line || cm.firstLine(), lineEnd = params.lineEnd || params.line || cm.lastLine();
if (lineStart != lineEnd) {
var curStart = Pos(lineStart, 0), curEnd = Pos(lineEnd, lineLength(cm, lineEnd)), text = cm.getRange(curStart, curEnd).split("\n"), numberRegex = "decimal" == number ? /(-?)([\d]+)/ :"hex" == number ? /(-?)(?:0x)?([0-9a-f]+)/i :"octal" == number ? /([0-7]+)/ :null, radix = "decimal" == number ? 10 :"hex" == number ? 16 :"octal" == number ? 8 :null, numPart = [], textPart = [];
if (number) for (var i = 0; i < text.length; i++) numberRegex.exec(text[i]) ? numPart.push(text[i]) :textPart.push(text[i]); else textPart = text;
if (numPart.sort(compareFn), textPart.sort(compareFn), text = reverse ? numPart.concat(textPart) :textPart.concat(numPart), 
unique) {
var lastLine, textOld = text;
text = [];
for (var i = 0; i < textOld.length; i++) textOld[i] != lastLine && text.push(textOld[i]), 
lastLine = textOld[i];
}
cm.replaceRange(text.join("\n"), curStart, curEnd);
}
},
global:function(cm, params) {
var argString = params.argString;
if (!argString) return showConfirm(cm, "Regular Expression missing from global"), 
void 0;
var cmd, lineStart = void 0 !== params.line ? params.line :cm.firstLine(), lineEnd = params.lineEnd || params.line || cm.lastLine(), tokens = splitBySlash(argString), regexPart = argString;
if (tokens.length && (regexPart = tokens[0], cmd = tokens.slice(1, tokens.length).join("/")), 
regexPart) try {
updateSearchQuery(cm, regexPart, !0, !0);
} catch (e) {
return showConfirm(cm, "Invalid regex: " + regexPart), void 0;
}
for (var query = getSearchState(cm).getQuery(), matchedLines = [], content = "", i = lineStart; lineEnd >= i; i++) {
var matched = query.test(cm.getLine(i));
matched && (matchedLines.push(i + 1), content += cm.getLine(i) + "<br>");
}
if (!cmd) return showConfirm(cm, content), void 0;
var index = 0, nextCommand = function() {
if (index < matchedLines.length) {
var command = matchedLines[index] + cmd;
exCommandDispatcher.processCommand(cm, command, {
callback:nextCommand
});
}
index++;
};
nextCommand();
},
substitute:function(cm, params) {
if (!cm.getSearchCursor) throw new Error("Search feature not available. Requires searchcursor.js or any other getSearchCursor implementation.");
var regexPart, trailing, flagsPart, count, argString = params.argString, tokens = argString ? splitBySlash(argString) :[], replacePart = "", confirm = !1, global = !1;
if (tokens.length) regexPart = tokens[0], replacePart = tokens[1], void 0 !== replacePart && (replacePart = getOption("pcre") ? unescapeRegexReplace(replacePart) :translateRegexReplace(replacePart), 
vimGlobalState.lastSubstituteReplacePart = replacePart), trailing = tokens[2] ? tokens[2].split(" ") :[]; else if (argString && argString.length) return showConfirm(cm, "Substitutions should be of the form :s/pattern/replace/"), 
void 0;
if (trailing && (flagsPart = trailing[0], count = parseInt(trailing[1]), flagsPart && (-1 != flagsPart.indexOf("c") && (confirm = !0, 
flagsPart.replace("c", "")), -1 != flagsPart.indexOf("g") && (global = !0, flagsPart.replace("g", "")), 
regexPart = regexPart + "/" + flagsPart)), regexPart) try {
updateSearchQuery(cm, regexPart, !0, !0);
} catch (e) {
return showConfirm(cm, "Invalid regex: " + regexPart), void 0;
}
if (replacePart = replacePart || vimGlobalState.lastSubstituteReplacePart, void 0 === replacePart) return showConfirm(cm, "No previous substitute regular expression"), 
void 0;
var state = getSearchState(cm), query = state.getQuery(), lineStart = void 0 !== params.line ? params.line :cm.getCursor().line, lineEnd = params.lineEnd || lineStart;
count && (lineStart = lineEnd, lineEnd = lineStart + count - 1);
var startPos = clipCursorToContent(cm, Pos(lineStart, 0)), cursor = cm.getSearchCursor(query, startPos);
doReplace(cm, confirm, global, lineStart, lineEnd, cursor, query, replacePart, params.callback);
},
redo:CodeMirror.commands.redo,
undo:CodeMirror.commands.undo,
write:function(cm) {
CodeMirror.commands.save ? CodeMirror.commands.save(cm) :cm.save();
},
nohlsearch:function(cm) {
clearSearchHighlight(cm);
},
delmarks:function(cm, params) {
if (!params.argString || !trim(params.argString)) return showConfirm(cm, "Argument required"), 
void 0;
for (var state = cm.state.vim, stream = new CodeMirror.StringStream(trim(params.argString)); !stream.eol(); ) {
stream.eatSpace();
var count = stream.pos;
if (!stream.match(/[a-zA-Z]/, !1)) return showConfirm(cm, "Invalid argument: " + params.argString.substring(count)), 
void 0;
var sym = stream.next();
if (stream.match("-", !0)) {
if (!stream.match(/[a-zA-Z]/, !1)) return showConfirm(cm, "Invalid argument: " + params.argString.substring(count)), 
void 0;
var startMark = sym, finishMark = stream.next();
if (!(isLowerCase(startMark) && isLowerCase(finishMark) || isUpperCase(startMark) && isUpperCase(finishMark))) return showConfirm(cm, "Invalid argument: " + startMark + "-"), 
void 0;
var start = startMark.charCodeAt(0), finish = finishMark.charCodeAt(0);
if (start >= finish) return showConfirm(cm, "Invalid argument: " + params.argString.substring(count)), 
void 0;
for (var j = 0; finish - start >= j; j++) {
var mark = String.fromCharCode(start + j);
delete state.marks[mark];
}
} else delete state.marks[sym];
}
}
}, exCommandDispatcher = new Vim.ExCommandDispatcher();
return CodeMirror.keyMap.vim = buildVimKeyMap(), CodeMirror.keyMap["vim-insert"] = {
Esc:exitInsertMode,
"Ctrl-[":exitInsertMode,
"Ctrl-C":exitInsertMode,
"Ctrl-N":"autocomplete",
"Ctrl-P":"autocomplete",
Enter:function(cm) {
var fn = CodeMirror.commands.newlineAndIndentContinueComment || CodeMirror.commands.newlineAndIndent;
fn(cm);
},
fallthrough:[ "default" ]
}, CodeMirror.keyMap["vim-replace"] = {
Backspace:"goCharLeft",
fallthrough:[ "vim-insert" ]
}, resetVimGlobalState(), vimApi;
};
CodeMirror.Vim = Vim();
});