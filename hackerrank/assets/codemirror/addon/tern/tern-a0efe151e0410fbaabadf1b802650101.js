// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function getFile(ts, name, c) {
var buf = ts.docs[name];
buf ? c(docValue(ts, buf)) :ts.options.getFile ? ts.options.getFile(name, c) :c(null);
}
function findDoc(ts, doc, name) {
for (var n in ts.docs) {
var cur = ts.docs[n];
if (cur.doc == doc) return cur;
}
if (!name) for (var i = 0; ;++i) if (n = "[doc" + (i || "") + "]", !ts.docs[n]) {
name = n;
break;
}
return ts.addDoc(name, doc);
}
function resolveDoc(ts, id) {
return "string" == typeof id ? ts.docs[id] :(id instanceof CodeMirror && (id = id.getDoc()), 
id instanceof CodeMirror.Doc ? findDoc(ts, id) :void 0);
}
function trackChange(ts, doc, change) {
var data = findDoc(ts, doc), argHints = ts.cachedArgHints;
argHints && argHints.doc == doc && cmpPos(argHints.start, change.to) <= 0 && (ts.cachedArgHints = null);
var changed = data.changed;
null == changed && (data.changed = changed = {
from:change.from.line,
to:change.from.line
});
var end = change.from.line + (change.text.length - 1);
change.from.line < changed.to && (changed.to = changed.to - (change.to.line - end)), 
end >= changed.to && (changed.to = end + 1), changed.from > change.from.line && (changed.from = change.from.line), 
doc.lineCount() > bigDoc && change.to - changed.from > 100 && setTimeout(function() {
data.changed && data.changed.to - data.changed.from > 100 && sendDoc(ts, data);
}, 200);
}
function sendDoc(ts, doc) {
ts.server.request({
files:[ {
type:"full",
name:doc.name,
text:docValue(ts, doc)
} ]
}, function(error) {
error ? window.console.error(error) :doc.changed = null;
});
}
function hint(ts, cm, c) {
ts.request(cm, {
type:"completions",
types:!0,
docs:!0,
urls:!0
}, function(error, data) {
if (error) return showError(ts, cm, error);
var completions = [], after = "", from = data.start, to = data.end;
'["' == cm.getRange(Pos(from.line, from.ch - 2), from) && '"]' != cm.getRange(to, Pos(to.line, to.ch + 2)) && (after = '"]');
for (var i = 0; i < data.completions.length; ++i) {
var completion = data.completions[i], className = typeToIcon(completion.type);
data.guess && (className += " " + cls + "guess"), completions.push({
text:completion.name + after,
displayText:completion.name,
className:className,
data:completion
});
}
var obj = {
from:from,
to:to,
list:completions
}, tooltip = null;
CodeMirror.on(obj, "close", function() {
remove(tooltip);
}), CodeMirror.on(obj, "update", function() {
remove(tooltip);
}), CodeMirror.on(obj, "select", function(cur, node) {
remove(tooltip);
var content = ts.options.completionTip ? ts.options.completionTip(cur.data) :cur.data.doc;
content && (tooltip = makeTooltip(node.parentNode.getBoundingClientRect().right + window.pageXOffset, node.getBoundingClientRect().top + window.pageYOffset, content), 
tooltip.className += " " + cls + "hint-doc");
}), c(obj);
});
}
function typeToIcon(type) {
var suffix;
return suffix = "?" == type ? "unknown" :"number" == type || "string" == type || "bool" == type ? type :/^fn\(/.test(type) ? "fn" :/^\[/.test(type) ? "array" :"object", 
cls + "completion " + cls + "completion-" + suffix;
}
function showType(ts, cm, pos, c) {
ts.request(cm, "type", function(error, data) {
if (error) return showError(ts, cm, error);
if (ts.options.typeTip) var tip = ts.options.typeTip(data); else {
var tip = elt("span", null, elt("strong", null, data.type || "not found"));
data.doc && tip.appendChild(document.createTextNode(" \u2014 " + data.doc)), data.url && (tip.appendChild(document.createTextNode(" ")), 
tip.appendChild(elt("a", null, "[docs]")).href = data.url);
}
tempTooltip(cm, tip), c && c();
}, pos);
}
function updateArgHints(ts, cm) {
if (closeArgHints(ts), !cm.somethingSelected()) {
var state = cm.getTokenAt(cm.getCursor()).state, inner = CodeMirror.innerMode(cm.getMode(), state);
if ("javascript" == inner.mode.name) {
var lex = inner.state.lexical;
if ("call" == lex.info) {
for (var ch, argPos = lex.pos || 0, tabSize = cm.getOption("tabSize"), line = cm.getCursor().line, e = Math.max(0, line - 9), found = !1; line >= e; --line) {
for (var str = cm.getLine(line), extra = 0, pos = 0; ;) {
var tab = str.indexOf("	", pos);
if (-1 == tab) break;
extra += tabSize - (tab + extra) % tabSize - 1, pos = tab + 1;
}
if (ch = lex.column - extra, "(" == str.charAt(ch)) {
found = !0;
break;
}
}
if (found) {
var start = Pos(line, ch), cache = ts.cachedArgHints;
return cache && cache.doc == cm.getDoc() && 0 == cmpPos(start, cache.start) ? showArgHints(ts, cm, argPos) :(ts.request(cm, {
type:"type",
preferFunction:!0,
end:start
}, function(error, data) {
!error && data.type && /^fn\(/.test(data.type) && (ts.cachedArgHints = {
start:pos,
type:parseFnType(data.type),
name:data.exprName || data.name || "fn",
guess:data.guess,
doc:cm.getDoc()
}, showArgHints(ts, cm, argPos));
}), void 0);
}
}
}
}
}
function showArgHints(ts, cm, pos) {
closeArgHints(ts);
for (var cache = ts.cachedArgHints, tp = cache.type, tip = elt("span", cache.guess ? cls + "fhint-guess" :null, elt("span", cls + "fname", cache.name), "("), i = 0; i < tp.args.length; ++i) {
i && tip.appendChild(document.createTextNode(", "));
var arg = tp.args[i];
tip.appendChild(elt("span", cls + "farg" + (i == pos ? " " + cls + "farg-current" :""), arg.name || "?")), 
"?" != arg.type && (tip.appendChild(document.createTextNode(":\xa0")), tip.appendChild(elt("span", cls + "type", arg.type)));
}
tip.appendChild(document.createTextNode(tp.rettype ? ") ->\xa0" :")")), tp.rettype && tip.appendChild(elt("span", cls + "type", tp.rettype));
var place = cm.cursorCoords(null, "page");
ts.activeArgHints = makeTooltip(place.right + 1, place.bottom, tip);
}
function parseFnType(text) {
function skipMatching(upto) {
for (var depth = 0, start = pos; ;) {
var next = text.charAt(pos);
if (upto.test(next) && !depth) return text.slice(start, pos);
/[{\[\(]/.test(next) ? ++depth :/[}\]\)]/.test(next) && --depth, ++pos;
}
}
var args = [], pos = 3;
if (")" != text.charAt(pos)) for (;;) {
var name = text.slice(pos).match(/^([^, \(\[\{]+): /);
if (name && (pos += name[0].length, name = name[1]), args.push({
name:name,
type:skipMatching(/[\),]/)
}), ")" == text.charAt(pos)) break;
pos += 2;
}
var rettype = text.slice(pos).match(/^\) -> (.*)$/);
return {
args:args,
rettype:rettype && rettype[1]
};
}
function jumpToDef(ts, cm) {
function inner(varName) {
var req = {
type:"definition",
variable:varName || null
}, doc = findDoc(ts, cm.getDoc());
ts.server.request(buildRequest(ts, doc, req), function(error, data) {
if (error) return showError(ts, cm, error);
if (!data.file && data.url) return window.open(data.url), void 0;
if (data.file) {
var found, localDoc = ts.docs[data.file];
if (localDoc && (found = findContext(localDoc.doc, data))) return ts.jumpStack.push({
file:doc.name,
start:cm.getCursor("from"),
end:cm.getCursor("to")
}), moveTo(ts, doc, localDoc, found.start, found.end), void 0;
}
showError(ts, cm, "Could not find a definition.");
});
}
atInterestingExpression(cm) ? inner() :dialog(cm, "Jump to variable", function(name) {
name && inner(name);
});
}
function jumpBack(ts, cm) {
var pos = ts.jumpStack.pop(), doc = pos && ts.docs[pos.file];
doc && moveTo(ts, findDoc(ts, cm.getDoc()), doc, pos.start, pos.end);
}
function moveTo(ts, curDoc, doc, start, end) {
doc.doc.setSelection(start, end), curDoc != doc && ts.options.switchToDoc && (closeArgHints(ts), 
ts.options.switchToDoc(doc.name, doc.doc));
}
function findContext(doc, data) {
for (var before = data.context.slice(0, data.contextOffset).split("\n"), startLine = data.start.line - (before.length - 1), start = Pos(startLine, (1 == before.length ? data.start.ch :doc.getLine(startLine).length) - before[0].length), text = doc.getLine(startLine).slice(start.ch), cur = startLine + 1; cur < doc.lineCount() && text.length < data.context.length; ++cur) text += "\n" + doc.getLine(cur);
if (text.slice(0, data.context.length) == data.context) return data;
for (var nearest, cursor = doc.getSearchCursor(data.context, 0, !1), nearestDist = 1/0; cursor.findNext(); ) {
var from = cursor.from(), dist = 1e4 * Math.abs(from.line - start.line);
dist || (dist = Math.abs(from.ch - start.ch)), nearestDist > dist && (nearest = from, 
nearestDist = dist);
}
if (!nearest) return null;
if (1 == before.length ? nearest.ch += before[0].length :nearest = Pos(nearest.line + (before.length - 1), before[before.length - 1].length), 
data.start.line == data.end.line) var end = Pos(nearest.line, nearest.ch + (data.end.ch - data.start.ch)); else var end = Pos(nearest.line + (data.end.line - data.start.line), data.end.ch);
return {
start:nearest,
end:end
};
}
function atInterestingExpression(cm) {
var pos = cm.getCursor("end"), tok = cm.getTokenAt(pos);
return tok.start < pos.ch && ("comment" == tok.type || "string" == tok.type) ? !1 :/\w/.test(cm.getLine(pos.line).slice(Math.max(pos.ch - 1, 0), pos.ch + 1));
}
function rename(ts, cm) {
var token = cm.getTokenAt(cm.getCursor());
return /\w/.test(token.string) ? (dialog(cm, "New name for " + token.string, function(newName) {
ts.request(cm, {
type:"rename",
newName:newName,
fullDocs:!0
}, function(error, data) {
return error ? showError(ts, cm, error) :(applyChanges(ts, data.changes), void 0);
});
}), void 0) :showError(ts, cm, "Not at a variable");
}
function selectName(ts, cm) {
var name = findDoc(ts, cm.doc).name;
ts.request(cm, {
type:"refs"
}, function(error, data) {
if (error) return showError(ts, cm, error);
for (var ranges = [], cur = 0, i = 0; i < data.refs.length; i++) {
var ref = data.refs[i];
ref.file == name && (ranges.push({
anchor:ref.start,
head:ref.end
}), cmpPos(cur, ref.start) >= 0 && cmpPos(cur, ref.end) <= 0 && (cur = ranges.length - 1));
}
cm.setSelections(ranges, cur);
});
}
function applyChanges(ts, changes) {
for (var perFile = Object.create(null), i = 0; i < changes.length; ++i) {
var ch = changes[i];
(perFile[ch.file] || (perFile[ch.file] = [])).push(ch);
}
for (var file in perFile) {
var known = ts.docs[file], chs = perFile[file];
if (known) {
chs.sort(function(a, b) {
return cmpPos(b.start, a.start);
});
for (var origin = "*rename" + ++nextChangeOrig, i = 0; i < chs.length; ++i) {
var ch = chs[i];
known.doc.replaceRange(ch.text, ch.start, ch.end, origin);
}
}
}
}
function buildRequest(ts, doc, query, pos) {
var files = [], offsetLines = 0, allowFragments = !query.fullDocs;
allowFragments || delete query.fullDocs, "string" == typeof query && (query = {
type:query
}), query.lineCharPositions = !0, null == query.end && (query.end = pos || doc.doc.getCursor("end"), 
doc.doc.somethingSelected() && (query.start = doc.doc.getCursor("start")));
var startPos = query.start || query.end;
if (doc.changed) if (doc.doc.lineCount() > bigDoc && allowFragments !== !1 && doc.changed.to - doc.changed.from < 100 && doc.changed.from <= startPos.line && doc.changed.to > query.end.line) {
files.push(getFragmentAround(doc, startPos, query.end)), query.file = "#0";
var offsetLines = files[0].offsetLines;
null != query.start && (query.start = Pos(query.start.line - -offsetLines, query.start.ch)), 
query.end = Pos(query.end.line - offsetLines, query.end.ch);
} else files.push({
type:"full",
name:doc.name,
text:docValue(ts, doc)
}), query.file = doc.name, doc.changed = null; else query.file = doc.name;
for (var name in ts.docs) {
var cur = ts.docs[name];
cur.changed && cur != doc && (files.push({
type:"full",
name:cur.name,
text:docValue(ts, cur)
}), cur.changed = null);
}
return {
query:query,
files:files
};
}
function getFragmentAround(data, start, end) {
for (var endLine, doc = data.doc, minIndent = null, minLine = null, tabSize = 4, p = start.line - 1, min = Math.max(0, p - 50); p >= min; --p) {
var line = doc.getLine(p), fn = line.search(/\bfunction\b/);
if (!(0 > fn)) {
var indent = CodeMirror.countColumn(line, null, tabSize);
null != minIndent && indent >= minIndent || (minIndent = indent, minLine = p);
}
}
null == minLine && (minLine = min);
var max = Math.min(doc.lastLine(), end.line + 20);
if (null == minIndent || minIndent == CodeMirror.countColumn(doc.getLine(start.line), null, tabSize)) endLine = max; else for (endLine = end.line + 1; max > endLine; ++endLine) {
var indent = CodeMirror.countColumn(doc.getLine(endLine), null, tabSize);
if (minIndent >= indent) break;
}
var from = Pos(minLine, 0);
return {
type:"part",
name:data.name,
offsetLines:from.line,
text:doc.getRange(from, Pos(endLine, 0))
};
}
function elt(tagname, cls) {
var e = document.createElement(tagname);
cls && (e.className = cls);
for (var i = 2; i < arguments.length; ++i) {
var elt = arguments[i];
"string" == typeof elt && (elt = document.createTextNode(elt)), e.appendChild(elt);
}
return e;
}
function dialog(cm, text, f) {
cm.openDialog ? cm.openDialog(text + ": <input type=text>", f) :f(prompt(text, ""));
}
function tempTooltip(cm, content) {
function clear() {
tip.parentNode && (cm.off("cursorActivity", clear), fadeOut(tip));
}
var where = cm.cursorCoords(), tip = makeTooltip(where.right + 1, where.bottom, content);
setTimeout(clear, 1700), cm.on("cursorActivity", clear);
}
function makeTooltip(x, y, content) {
var node = elt("div", cls + "tooltip", content);
return node.style.left = x + "px", node.style.top = y + "px", document.body.appendChild(node), 
node;
}
function remove(node) {
var p = node && node.parentNode;
p && p.removeChild(node);
}
function fadeOut(tooltip) {
tooltip.style.opacity = "0", setTimeout(function() {
remove(tooltip);
}, 1100);
}
function showError(ts, cm, msg) {
ts.options.showError ? ts.options.showError(cm, msg) :tempTooltip(cm, String(msg));
}
function closeArgHints(ts) {
ts.activeArgHints && (remove(ts.activeArgHints), ts.activeArgHints = null);
}
function docValue(ts, doc) {
var val = doc.doc.getValue();
return ts.options.fileFilter && (val = ts.options.fileFilter(val, doc.name, doc.doc)), 
val;
}
function WorkerServer(ts) {
function send(data, c) {
c && (data.id = ++msgId, pending[msgId] = c), worker.postMessage(data);
}
var worker = new Worker(ts.options.workerScript);
worker.postMessage({
type:"init",
defs:ts.options.defs,
plugins:ts.options.plugins,
scripts:ts.options.workerDeps
});
var msgId = 0, pending = {};
worker.onmessage = function(e) {
var data = e.data;
"getFile" == data.type ? getFile(ts, data.name, function(err, text) {
send({
type:"getFile",
err:String(err),
text:text,
id:data.id
});
}) :"debug" == data.type ? window.console.log(data.message) :data.id && pending[data.id] && (pending[data.id](data.err, data.body), 
delete pending[data.id]);
}, worker.onerror = function(e) {
for (var id in pending) pending[id](e);
pending = {};
}, this.addFile = function(name, text) {
send({
type:"add",
name:name,
text:text
});
}, this.delFile = function(name) {
send({
type:"del",
name:name
});
}, this.request = function(body, c) {
send({
type:"req",
body:body
}, c);
};
}
CodeMirror.TernServer = function(options) {
var self = this;
this.options = options || {};
var plugins = this.options.plugins || (this.options.plugins = {});
plugins.doc_comment || (plugins.doc_comment = !0), this.server = this.options.useWorker ? new WorkerServer(this) :new tern.Server({
getFile:function(name, c) {
return getFile(self, name, c);
},
async:!0,
defs:this.options.defs || [],
plugins:plugins
}), this.docs = Object.create(null), this.trackChange = function(doc, change) {
trackChange(self, doc, change);
}, this.cachedArgHints = null, this.activeArgHints = null, this.jumpStack = [], 
this.getHint = function(cm, c) {
return hint(self, cm, c);
}, this.getHint.async = !0;
}, CodeMirror.TernServer.prototype = {
addDoc:function(name, doc) {
var data = {
doc:doc,
name:name,
changed:null
};
return this.server.addFile(name, docValue(this, data)), CodeMirror.on(doc, "change", this.trackChange), 
this.docs[name] = data;
},
delDoc:function(id) {
var found = resolveDoc(this, id);
found && (CodeMirror.off(found.doc, "change", this.trackChange), delete this.docs[found.name], 
this.server.delFile(found.name));
},
hideDoc:function(id) {
closeArgHints(this);
var found = resolveDoc(this, id);
found && found.changed && sendDoc(this, found);
},
complete:function(cm) {
cm.showHint({
hint:this.getHint
});
},
showType:function(cm, pos, c) {
showType(this, cm, pos, c);
},
updateArgHints:function(cm) {
updateArgHints(this, cm);
},
jumpToDef:function(cm) {
jumpToDef(this, cm);
},
jumpBack:function(cm) {
jumpBack(this, cm);
},
rename:function(cm) {
rename(this, cm);
},
selectName:function(cm) {
selectName(this, cm);
},
request:function(cm, query, c, pos) {
var self = this, doc = findDoc(this, cm.getDoc()), request = buildRequest(this, doc, query, pos);
this.server.request(request, function(error, data) {
!error && self.options.responseFilter && (data = self.options.responseFilter(doc, query, request, error, data)), 
c(error, data);
});
}
};
var Pos = CodeMirror.Pos, cls = "CodeMirror-Tern-", bigDoc = 250, nextChangeOrig = 0, cmpPos = CodeMirror.cmpPos;
});