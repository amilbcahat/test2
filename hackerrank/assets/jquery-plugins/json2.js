var JSON;

JSON || (JSON = {}), function() {
"use strict";
function f(n) {
return 10 > n ? "0" + n :n;
}
function quote(string) {
return escapable.lastIndex = 0, escapable.test(string) ? '"' + string.replace(escapable, function(a) {
var c = meta[a];
return "string" == typeof c ? c :"\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
}) + '"' :'"' + string + '"';
}
function str(key, holder) {
var i, k, v, length, partial, mind = gap, value = holder[key];
switch (value && "object" == typeof value && "function" == typeof value.toJSON && (value = value.toJSON(key)), 
"function" == typeof rep && (value = rep.call(holder, key, value)), typeof value) {
case "string":
return quote(value);

case "number":
return isFinite(value) ? String(value) :"null";

case "boolean":
case "null":
return String(value);

case "object":
if (!value) return "null";
if (gap += indent, partial = [], "[object Array]" === Object.prototype.toString.apply(value)) {
for (length = value.length, i = 0; length > i; i += 1) partial[i] = str(i, value) || "null";
return v = 0 === partial.length ? "[]" :gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" :"[" + partial.join(",") + "]", 
gap = mind, v;
}
if (rep && "object" == typeof rep) for (length = rep.length, i = 0; length > i; i += 1) "string" == typeof rep[i] && (k = rep[i], 
v = str(k, value), v && partial.push(quote(k) + (gap ? ": " :":") + v)); else for (k in value) Object.prototype.hasOwnProperty.call(value, k) && (v = str(k, value), 
v && partial.push(quote(k) + (gap ? ": " :":") + v));
return v = 0 === partial.length ? "{}" :gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" :"{" + partial.join(",") + "}", 
gap = mind, v;
}
}
"function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" :null;
}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
return this.valueOf();
});
var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
"\b":"\\b",
"	":"\\t",
"\n":"\\n",
"\f":"\\f",
"\r":"\\r",
'"':'\\"',
"\\":"\\\\"
}, rep;
"function" != typeof JSON.stringify && (JSON.stringify = function(value, replacer, space) {
var i;
if (gap = "", indent = "", "number" == typeof space) for (i = 0; space > i; i += 1) indent += " "; else "string" == typeof space && (indent = space);
if (rep = replacer, replacer && "function" != typeof replacer && ("object" != typeof replacer || "number" != typeof replacer.length)) throw new Error("JSON.stringify");
return str("", {
"":value
});
}), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
function walk(holder, key) {
var k, v, value = holder[key];
if (value && "object" == typeof value) for (k in value) Object.prototype.hasOwnProperty.call(value, k) && (v = walk(value, k), 
void 0 !== v ? value[k] = v :delete value[k]);
return reviver.call(holder, key, value);
}
var j;
if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(a) {
return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
})), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), 
"function" == typeof reviver ? walk({
"":j
}, "") :j;
throw new SyntaxError("JSON.parse");
});
}();