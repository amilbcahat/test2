// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
function charsAround(cm, pos) {
var str = cm.getRange(Pos(pos.line, pos.ch - 1), Pos(pos.line, pos.ch + 1));
return 2 == str.length ? str :null;
}
function enteringString(cm, pos, ch) {
var line = cm.getLine(pos.line), token = cm.getTokenAt(pos);
if (/\bstring2?\b/.test(token.type)) return !1;
var stream = new CodeMirror.StringStream(line.slice(0, pos.ch) + ch + line.slice(pos.ch), 4);
for (stream.pos = stream.start = token.start; ;) {
var type1 = cm.getMode().token(stream, token.state);
if (stream.pos >= pos.ch + 1) return /\bstring2?\b/.test(type1);
stream.start = stream.pos;
}
}
function buildKeymap(pairs) {
for (var map = {
name:"autoCloseBrackets",
Backspace:function(cm) {
if (cm.getOption("disableInput")) return CodeMirror.Pass;
for (var ranges = cm.listSelections(), i = 0; i < ranges.length; i++) {
if (!ranges[i].empty()) return CodeMirror.Pass;
var around = charsAround(cm, ranges[i].head);
if (!around || pairs.indexOf(around) % 2 != 0) return CodeMirror.Pass;
}
for (var i = ranges.length - 1; i >= 0; i--) {
var cur = ranges[i].head;
cm.replaceRange("", Pos(cur.line, cur.ch - 1), Pos(cur.line, cur.ch + 1));
}
}
}, closingBrackets = "", i = 0; i < pairs.length; i += 2) (function(left, right) {
left != right && (closingBrackets += right), map["'" + left + "'"] = function(cm) {
if (cm.getOption("disableInput")) return CodeMirror.Pass;
for (var type, next, ranges = cm.listSelections(), i = 0; i < ranges.length; i++) {
var curType, range = ranges[i], cur = range.head, next = cm.getRange(cur, Pos(cur.line, cur.ch + 1));
if (range.empty()) if (left == right && next == right) curType = cm.getRange(cur, Pos(cur.line, cur.ch + 3)) == left + left + left ? "skipThree" :"skip"; else if (left == right && cur.ch > 1 && cm.getRange(Pos(cur.line, cur.ch - 2), cur) == left + left && (cur.ch <= 2 || cm.getRange(Pos(cur.line, cur.ch - 3), Pos(cur.line, cur.ch - 2)) != left)) curType = "addFour"; else if ('"' == left || "'" == left) {
if (CodeMirror.isWordChar(next) || !enteringString(cm, cur, left)) return CodeMirror.Pass;
curType = "both";
} else {
if (!(cm.getLine(cur.line).length == cur.ch || closingBrackets.indexOf(next) >= 0 || SPACE_CHAR_REGEX.test(next))) return CodeMirror.Pass;
curType = "both";
} else curType = "surround";
if (type) {
if (type != curType) return CodeMirror.Pass;
} else type = curType;
}
cm.operation(function() {
if ("skip" == type) cm.execCommand("goCharRight"); else if ("skipThree" == type) for (var i = 0; 3 > i; i++) cm.execCommand("goCharRight"); else if ("surround" == type) {
for (var sels = cm.getSelections(), i = 0; i < sels.length; i++) sels[i] = left + sels[i] + right;
cm.replaceSelections(sels, "around");
} else "both" == type ? (cm.replaceSelection(left + right, null), cm.execCommand("goCharLeft")) :"addFour" == type && (cm.replaceSelection(left + left + left + left, "before"), 
cm.execCommand("goCharRight"));
});
}, left != right && (map["'" + right + "'"] = function(cm) {
for (var ranges = cm.listSelections(), i = 0; i < ranges.length; i++) {
var range = ranges[i];
if (!range.empty() || cm.getRange(range.head, Pos(range.head.line, range.head.ch + 1)) != right) return CodeMirror.Pass;
}
cm.execCommand("goCharRight");
});
})(pairs.charAt(i), pairs.charAt(i + 1));
return map;
}
function buildExplodeHandler(pairs) {
return function(cm) {
if (cm.getOption("disableInput")) return CodeMirror.Pass;
for (var ranges = cm.listSelections(), i = 0; i < ranges.length; i++) {
if (!ranges[i].empty()) return CodeMirror.Pass;
var around = charsAround(cm, ranges[i].head);
if (!around || pairs.indexOf(around) % 2 != 0) return CodeMirror.Pass;
}
cm.operation(function() {
cm.replaceSelection("\n\n", null), cm.execCommand("goCharLeft"), ranges = cm.listSelections();
for (var i = 0; i < ranges.length; i++) {
var line = ranges[i].head.line;
cm.indentLine(line, null, !0), cm.indentLine(line + 1, null, !0);
}
});
};
}
var DEFAULT_BRACKETS = "()[]{}''\"\"", DEFAULT_EXPLODE_ON_ENTER = "[]{}", SPACE_CHAR_REGEX = /\s/, Pos = CodeMirror.Pos;
CodeMirror.defineOption("autoCloseBrackets", !1, function(cm, val, old) {
if (old != CodeMirror.Init && old && cm.removeKeyMap("autoCloseBrackets"), val) {
var pairs = DEFAULT_BRACKETS, explode = DEFAULT_EXPLODE_ON_ENTER;
"string" == typeof val ? pairs = val :"object" == typeof val && (null != val.pairs && (pairs = val.pairs), 
null != val.explode && (explode = val.explode));
var map = buildKeymap(pairs);
explode && (map.Enter = buildExplodeHandler(explode)), cm.addKeyMap(map);
}
});
});