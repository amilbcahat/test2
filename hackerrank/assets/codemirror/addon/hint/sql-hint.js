// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror"), require("../../mode/sql/sql")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror", "../../mode/sql/sql" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function getKeywords(editor) {
var mode = editor.doc.modeOption;
return "sql" === mode && (mode = "text/x-sql"), CodeMirror.resolveMode(mode).keywords;
}
function match(string, word) {
var len = string.length, sub = word.substr(0, len);
return string.toUpperCase() === sub.toUpperCase();
}
function addMatches(result, search, wordlist, formatter) {
for (var word in wordlist) wordlist.hasOwnProperty(word) && (Array.isArray(wordlist) && (word = wordlist[word]), 
match(search, word) && result.push(formatter(word)));
}
function columnCompletion(result, editor) {
var cur = editor.getCursor(), token = editor.getTokenAt(cur), string = token.string.substr(1), prevCur = Pos(cur.line, token.start), table = editor.getTokenAt(prevCur).string;
tables.hasOwnProperty(table) || (table = findTableByAlias(table, editor));
var columns = tables[table];
columns && addMatches(result, string, columns, function(w) {
return "." + w;
});
}
function eachWord(lineText, f) {
if (lineText) for (var excepted = /[,;]/g, words = lineText.split(" "), i = 0; i < words.length; i++) f(words[i] ? words[i].replace(excepted, "") :"");
}
function convertCurToNumber(cur) {
return cur.line + cur.ch / Math.pow(10, 6);
}
function convertNumberToCur(num) {
return Pos(Math.floor(num), +num.toString().split(".").pop());
}
function findTableByAlias(alias, editor) {
for (var doc = editor.doc, fullQuery = doc.getValue(), aliasUpperCase = alias.toUpperCase(), previousWord = "", table = "", separator = [], validRange = {
start:Pos(0, 0),
end:Pos(editor.lastLine(), editor.getLineHandle(editor.lastLine()).length)
}, indexOfSeparator = fullQuery.indexOf(CONS.QUERY_DIV); -1 != indexOfSeparator; ) separator.push(doc.posFromIndex(indexOfSeparator)), 
indexOfSeparator = fullQuery.indexOf(CONS.QUERY_DIV, indexOfSeparator + 1);
separator.unshift(Pos(0, 0)), separator.push(Pos(editor.lastLine(), editor.getLineHandle(editor.lastLine()).text.length));
for (var prevItem = 0, current = convertCurToNumber(editor.getCursor()), i = 0; i < separator.length; i++) {
var _v = convertCurToNumber(separator[i]);
if (current > prevItem && _v >= current) {
validRange = {
start:convertNumberToCur(prevItem),
end:convertNumberToCur(_v)
};
break;
}
prevItem = _v;
}
for (var query = doc.getRange(validRange.start, validRange.end, !1), i = 0; i < query.length; i++) {
var lineText = query[i];
if (eachWord(lineText, function(word) {
var wordUpperCase = word.toUpperCase();
wordUpperCase === aliasUpperCase && tables.hasOwnProperty(previousWord) && (table = previousWord), 
wordUpperCase !== CONS.ALIAS_KEYWORD && (previousWord = word);
}), table) break;
}
return table;
}
function sqlHint(editor, options) {
tables = options && options.tables || {}, keywords = keywords || getKeywords(editor);
var cur = editor.getCursor(), token = editor.getTokenAt(cur), end = token.end, result = [], search = token.string.trim();
if ("." == search.charAt(0)) {
if (columnCompletion(result, editor), !result.length) {
for (;token.start && "." == search.charAt(0); ) token = editor.getTokenAt(Pos(cur.line, token.start - 1)), 
search = token.string + search;
addMatches(result, search, tables, function(w) {
return w;
});
}
} else addMatches(result, search, keywords, function(w) {
return w.toUpperCase();
}), addMatches(result, search, tables, function(w) {
return w;
});
return {
list:result,
from:Pos(cur.line, token.start),
to:Pos(cur.line, end)
};
}
var tables, keywords, CONS = {
QUERY_DIV:";",
ALIAS_KEYWORD:"AS"
}, Pos = CodeMirror.Pos;
CodeMirror.registerHelper("hint", "sql", sqlHint);
});