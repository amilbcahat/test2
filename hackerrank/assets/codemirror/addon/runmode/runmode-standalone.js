// CodeMirror, copyright (c) by Marijn Haverbeke and others
window.CodeMirror = {}, function() {
"use strict";
function splitLines(string) {
return string.split(/\r?\n|\r/);
}
function StringStream(string) {
this.pos = this.start = 0, this.string = string, this.lineStart = 0;
}
StringStream.prototype = {
eol:function() {
return this.pos >= this.string.length;
},
sol:function() {
return 0 == this.pos;
},
peek:function() {
return this.string.charAt(this.pos) || null;
},
next:function() {
return this.pos < this.string.length ? this.string.charAt(this.pos++) :void 0;
},
eat:function(match) {
var ch = this.string.charAt(this.pos);
if ("string" == typeof match) var ok = ch == match; else var ok = ch && (match.test ? match.test(ch) :match(ch));
return ok ? (++this.pos, ch) :void 0;
},
eatWhile:function(match) {
for (var start = this.pos; this.eat(match); ) ;
return this.pos > start;
},
eatSpace:function() {
for (var start = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); ) ++this.pos;
return this.pos > start;
},
skipToEnd:function() {
this.pos = this.string.length;
},
skipTo:function(ch) {
var found = this.string.indexOf(ch, this.pos);
return found > -1 ? (this.pos = found, !0) :void 0;
},
backUp:function(n) {
this.pos -= n;
},
column:function() {
return this.start - this.lineStart;
},
indentation:function() {
return 0;
},
match:function(pattern, consume, caseInsensitive) {
if ("string" != typeof pattern) {
var match = this.string.slice(this.pos).match(pattern);
return match && match.index > 0 ? null :(match && consume !== !1 && (this.pos += match[0].length), 
match);
}
var cased = function(str) {
return caseInsensitive ? str.toLowerCase() :str;
}, substr = this.string.substr(this.pos, pattern.length);
return cased(substr) == cased(pattern) ? (consume !== !1 && (this.pos += pattern.length), 
!0) :void 0;
},
current:function() {
return this.string.slice(this.start, this.pos);
},
hideFirstChars:function(n, inner) {
this.lineStart += n;
try {
return inner();
} finally {
this.lineStart -= n;
}
}
}, CodeMirror.StringStream = StringStream, CodeMirror.startState = function(mode, a1, a2) {
return mode.startState ? mode.startState(a1, a2) :!0;
};
var modes = CodeMirror.modes = {}, mimeModes = CodeMirror.mimeModes = {};
CodeMirror.defineMode = function(name, mode) {
modes[name] = mode;
}, CodeMirror.defineMIME = function(mime, spec) {
mimeModes[mime] = spec;
}, CodeMirror.resolveMode = function(spec) {
return "string" == typeof spec && mimeModes.hasOwnProperty(spec) ? spec = mimeModes[spec] :spec && "string" == typeof spec.name && mimeModes.hasOwnProperty(spec.name) && (spec = mimeModes[spec.name]), 
"string" == typeof spec ? {
name:spec
} :spec || {
name:"null"
};
}, CodeMirror.getMode = function(options, spec) {
spec = CodeMirror.resolveMode(spec);
var mfactory = modes[spec.name];
if (!mfactory) throw new Error("Unknown mode: " + spec);
return mfactory(options, spec);
}, CodeMirror.registerHelper = CodeMirror.registerGlobalHelper = Math.min, CodeMirror.defineMode("null", function() {
return {
token:function(stream) {
stream.skipToEnd();
}
};
}), CodeMirror.defineMIME("text/plain", "null"), CodeMirror.runMode = function(string, modespec, callback, options) {
var mode = CodeMirror.getMode({
indentUnit:2
}, modespec);
if (1 == callback.nodeType) {
var tabSize = options && options.tabSize || 4, node = callback, col = 0;
node.innerHTML = "", callback = function(text, style) {
if ("\n" == text) return node.appendChild(document.createElement("br")), col = 0, 
void 0;
for (var content = "", pos = 0; ;) {
var idx = text.indexOf("	", pos);
if (-1 == idx) {
content += text.slice(pos), col += text.length - pos;
break;
}
col += idx - pos, content += text.slice(pos, idx);
var size = tabSize - col % tabSize;
col += size;
for (var i = 0; size > i; ++i) content += " ";
pos = idx + 1;
}
if (style) {
var sp = node.appendChild(document.createElement("span"));
sp.className = "cm-" + style.replace(/ +/g, " cm-"), sp.appendChild(document.createTextNode(content));
} else node.appendChild(document.createTextNode(content));
};
}
for (var lines = splitLines(string), state = options && options.state || CodeMirror.startState(mode), i = 0, e = lines.length; e > i; ++i) {
i && callback("\n");
var stream = new CodeMirror.StringStream(lines[i]);
for (!stream.string && mode.blankLine && mode.blankLine(state); !stream.eol(); ) {
var style = mode.token(stream, state);
callback(stream.current(), style, i, stream.start, state), stream.start = stream.pos;
}
}
};
}();