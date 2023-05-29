// Copyright (C) 2006 Google Inc.
function html_sanitize(htmlText, opt_urlPolicy, opt_nmTokenPolicy) {
var out = [];
return html.makeHtmlSanitizer(function(tagName, attribs) {
for (var i = 0; i < attribs.length; i += 2) {
var attribName = attribs[i], value = attribs[i + 1];
if (html4.ATTRIBS.hasOwnProperty(attribName)) switch (html4.ATTRIBS[attribName]) {
case html4.atype.SCRIPT:
case html4.atype.STYLE:
value = null;

case html4.atype.IDREF:
case html4.atype.NAME:
case html4.atype.NMTOKENS:
value = opt_nmTokenPolicy ? opt_nmTokenPolicy(value) :value;
break;

case html4.atype.URI:
value = opt_urlPolicy && opt_urlPolicy(value);
} else value = null;
attribs[i + 1] = value;
}
return attribs;
})(htmlText, out), out.join("");
}

var html = function() {
function lookupEntity(name) {
if (name = name.toUpperCase(), ENTITIES.hasOwnProperty(name)) return ENTITIES[name];
var m = name.match(decimalEscapeRe);
return m ? String.fromCharCode(parseInt(m[1], 10)) :(m = name.match(hexEscapeRe)) ? String.fromCharCode(parseInt(m[1], 16)) :"";
}
function decodeOneEntity(_, name) {
return lookupEntity(name);
}
function unescapeEntities(s) {
return s.replace(entityRe, decodeOneEntity);
}
function escapeAttrib(s) {
return s.replace(ampRe, "&amp;").replace(ltRe, "&lt;").replace(gtRe, "&gt;").replace(quotRe, "&quot;");
}
function normalizeRCData(rcdata) {
return rcdata.replace(looseAmpRe, "&amp;$1").replace(ltRe, "&lt;").replace(gtRe, "&gt;");
}
function makeSaxParser(handler) {
return function(htmlText, param) {
htmlText = String(htmlText);
var tagName, eflags, openTag, htmlUpper = null, inTag = !1, attribs = [];
for (handler.startDoc && handler.startDoc(param); htmlText; ) {
var m = htmlText.match(inTag ? INSIDE_TAG_TOKEN :OUTSIDE_TAG_TOKEN);
if (htmlText = htmlText.substring(m[0].length), inTag) {
if (m[1]) {
var decodedValue, attribName = m[1].toLowerCase(), encodedValue = m[2] || m[3] || m[4];
decodedValue = null != encodedValue ? unescapeEntities(encodedValue) :attribName, 
attribs.push(attribName, decodedValue);
} else if (m[5]) {
if (void 0 !== eflags && (openTag ? handler.startTag && handler.startTag(tagName, attribs, param) :handler.endTag && handler.endTag(tagName, param)), 
openTag && eflags & (html4.eflags.CDATA | html4.eflags.RCDATA)) {
htmlUpper = null === htmlUpper ? htmlText.toLowerCase() :htmlUpper.substring(htmlUpper.length - htmlText.length);
var dataEnd = htmlUpper.indexOf("</" + tagName);
0 > dataEnd && (dataEnd = htmlText.length), eflags & html4.eflags.CDATA ? handler.cdata && handler.cdata(htmlText.substring(0, dataEnd), param) :handler.rcdata && handler.rcdata(normalizeRCData(htmlText.substring(0, dataEnd)), param), 
htmlText = htmlText.substring(dataEnd);
}
tagName = eflags = openTag = void 0, attribs.length = 0, inTag = !1;
}
} else m[1] ? handler.pcdata && handler.pcdata(m[0], param) :m[3] ? (openTag = !m[2], 
inTag = !0, tagName = m[3].toLowerCase(), eflags = html4.ELEMENTS.hasOwnProperty(tagName) ? html4.ELEMENTS[tagName] :void 0) :m[4] ? handler.pcdata && handler.pcdata(m[4], param) :m[5] && handler.pcdata && handler.pcdata("&" === m[5] ? "&amp;" :"&lt;", param);
}
handler.endDoc && handler.endDoc(param);
};
}
var ENTITIES = {
LT:"<",
GT:">",
AMP:"&",
NBSP:"\xa0",
QUOT:'"',
APOS:"'"
}, decimalEscapeRe = /^#(\d+)$/, hexEscapeRe = /^#x([0-9A-F]+)$/, entityRe = /&(#\d+|#x[\da-f]+|\w+);/g, ampRe = /&/g, looseAmpRe = /&([^a-z#]|#(?:[^0-9x]|x(?:[^0-9a-f]|$)|$)|$)/gi, ltRe = /</g, gtRe = />/g, quotRe = /\"/g, INSIDE_TAG_TOKEN = new RegExp("^\\s*(?:(?:([a-z][a-z-]*)(?:\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)'|([^>\"'\\s]*)))?)|(/?>)|[^\\w\\s>]+)", "i"), OUTSIDE_TAG_TOKEN = new RegExp("^(?:&(\\#[0-9]+|\\#[x][0-9a-f]+|\\w+);|<!--[\\s\\S]*?-->|<!w[^>]*>|<\\?[^>*]*>|<(/)?([a-z][a-z0-9]*)|([^<&]+)|([<&]))", "i");
return {
normalizeRCData:normalizeRCData,
escapeAttrib:escapeAttrib,
unescapeEntities:unescapeEntities,
makeSaxParser:makeSaxParser
};
}();

html.makeHtmlSanitizer = function(sanitizeAttributes) {
var stack = [], ignoring = !1;
return html.makeSaxParser({
startDoc:function() {
stack = [], ignoring = !1;
},
startTag:function(tagName, attribs, out) {
if (!ignoring && html4.ELEMENTS.hasOwnProperty(tagName)) {
var eflags = html4.ELEMENTS[tagName];
if (eflags & html4.eflags.UNSAFE) return ignoring = !(eflags & html4.eflags.EMPTY), 
void 0;
if (attribs = sanitizeAttributes(tagName, attribs)) {
eflags & html4.eflags.EMPTY || stack.push(tagName), out.push("<", tagName);
for (var i = 0, n = attribs.length; n > i; i += 2) {
var attribName = attribs[i], value = attribs[i + 1];
null != value && out.push(" ", attribName, '="', html.escapeAttrib(value), '"');
}
out.push(">");
}
}
},
endTag:function(tagName, out) {
if (ignoring) return ignoring = !1, void 0;
if (html4.ELEMENTS.hasOwnProperty(tagName)) {
var eflags = html4.ELEMENTS[tagName];
if (!(eflags & (html4.eflags.UNSAFE | html4.eflags.EMPTY))) {
var index;
if (eflags & html4.eflags.OPTIONAL_ENDTAG) for (index = stack.length; --index >= 0; ) {
var stackEl = stack[index];
if (stackEl === tagName) break;
if (!(html4.ELEMENTS[stackEl] & html4.eflags.OPTIONAL_ENDTAG)) return;
} else for (index = stack.length; --index >= 0 && stack[index] !== tagName; ) ;
if (0 > index) return;
for (var i = stack.length; --i > index; ) {
var stackEl = stack[i];
html4.ELEMENTS[stackEl] & html4.eflags.OPTIONAL_ENDTAG || out.push("</", stackEl, ">");
}
stack.length = index, out.push("</", tagName, ">");
}
}
},
pcdata:function(text, out) {
ignoring || out.push(text);
},
rcdata:function(text, out) {
ignoring || out.push(text);
},
cdata:function(text, out) {
ignoring || out.push(text);
},
endDoc:function(out) {
for (var i = stack.length; --i >= 0; ) out.push("</", stack[i], ">");
stack.length = 0;
}
});
};