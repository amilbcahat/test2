var Markdown;

if (Markdown = "object" == typeof exports && "function" == typeof require ? exports :{}, 
function() {
function identity(x) {
return x;
}
function returnFalse() {
return !1;
}
function HookCollection() {}
function SaveHash() {}
HookCollection.prototype = {
chain:function(hookname, func) {
var original = this[hookname];
if (!original) throw new Error("unknown hook " + hookname);
this[hookname] = original === identity ? func :function() {
var args = Array.prototype.slice.call(arguments, 0);
return args[0] = original.apply(null, args), func.apply(null, args);
};
},
set:function(hookname, func) {
if (!this[hookname]) throw new Error("unknown hook " + hookname);
this[hookname] = func;
},
addNoop:function(hookname) {
this[hookname] = identity;
},
addFalse:function(hookname) {
this[hookname] = returnFalse;
}
}, Markdown.HookCollection = HookCollection, SaveHash.prototype = {
set:function(key, value) {
this["s_" + key] = value;
},
get:function(key) {
return this["s_" + key];
}
}, Markdown.Converter = function() {
function _StripLinkDefinitions(text) {
return text = text.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm, function(wholeMatch, m1, m2, m3, m4, m5) {
return m1 = m1.toLowerCase(), g_urls.set(m1, _EncodeAmpsAndAngles(m2)), m4 ? m3 :(m5 && g_titles.set(m1, m5.replace(/"/g, "&quot;")), 
"");
});
}
function _HashHTMLBlocks(text) {
return text = text.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm, hashElement), 
text = text.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm, hashElement), 
text = text.replace(/\n[ ]{0,3}((<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, hashElement), 
text = text.replace(/\n\n[ ]{0,3}(<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>[ \t]*(?=\n{2,}))/g, hashElement), 
text = text.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, hashElement);
}
function hashElement(wholeMatch, m1) {
var blockText = m1;
return blockText = blockText.replace(/^\n+/, ""), blockText = blockText.replace(/\n+$/g, ""), 
blockText = "\n\n~K" + (g_html_blocks.push(blockText) - 1) + "K\n\n";
}
function _RunBlockGamut(text, doNotUnhash) {
text = pluginHooks.preBlockGamut(text, blockGamutHookCallback), text = _DoHeaders(text);
var replacement = "<hr />\n";
return text = text.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, replacement), text = text.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm, replacement), 
text = text.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, replacement), text = _DoLists(text), 
text = _DoCodeBlocks(text), text = _DoBlockQuotes(text), text = pluginHooks.postBlockGamut(text, blockGamutHookCallback), 
text = _HashHTMLBlocks(text), text = _FormParagraphs(text, doNotUnhash);
}
function _RunSpanGamut(text) {
return text = pluginHooks.preSpanGamut(text), text = _DoCodeSpans(text), text = _EscapeSpecialCharsWithinTagAttributes(text), 
text = _EncodeBackslashEscapes(text), text = _DoImages(text), text = _DoAnchors(text), 
text = _DoAutoLinks(text), text = text.replace(/~P/g, "://"), text = _EncodeAmpsAndAngles(text), 
text = _DoItalicsAndBold(text), text = text.replace(/  +\n/g, " <br>\n"), text = pluginHooks.postSpanGamut(text);
}
function _EscapeSpecialCharsWithinTagAttributes(text) {
var regex = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>)/gi;
return text = text.replace(regex, function(wholeMatch) {
var tag = wholeMatch.replace(/(.)<\/?code>(?=.)/g, "$1`");
return tag = escapeCharacters(tag, "!" == wholeMatch.charAt(1) ? "\\`*_/" :"\\`*_");
});
}
function _DoAnchors(text) {
return text = text.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, writeAnchorTag), 
text = text.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, writeAnchorTag), 
text = text.replace(/(\[([^\[\]]+)\])()()()()()/g, writeAnchorTag);
}
function writeAnchorTag(wholeMatch, m1, m2, m3, m4, m5, m6, m7) {
void 0 == m7 && (m7 = "");
var whole_match = m1, link_text = m2.replace(/:\/\//g, "~P"), link_id = m3.toLowerCase(), url = m4, title = m7;
if ("" == url) if ("" == link_id && (link_id = link_text.toLowerCase().replace(/ ?\n/g, " ")), 
url = "#" + link_id, void 0 != g_urls.get(link_id)) url = g_urls.get(link_id), void 0 != g_titles.get(link_id) && (title = g_titles.get(link_id)); else {
if (!(whole_match.search(/\(\s*\)$/m) > -1)) return whole_match;
url = "";
}
url = encodeProblemUrlChars(url), url = escapeCharacters(url, "*_");
var result = '<a href="' + url + '"';
return "" != title && (title = attributeEncode(title), title = escapeCharacters(title, "*_"), 
result += ' title="' + title + '"'), result += ">" + link_text + "</a>";
}
function _DoImages(text) {
return text = text.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, writeImageTag), 
text = text.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, writeImageTag);
}
function attributeEncode(text) {
return text.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}
function writeImageTag(wholeMatch, m1, m2, m3, m4, m5, m6, m7) {
var whole_match = m1, alt_text = m2, link_id = m3.toLowerCase(), url = m4, title = m7;
if (title || (title = ""), "" == url) {
if ("" == link_id && (link_id = alt_text.toLowerCase().replace(/ ?\n/g, " ")), url = "#" + link_id, 
void 0 == g_urls.get(link_id)) return whole_match;
url = g_urls.get(link_id), void 0 != g_titles.get(link_id) && (title = g_titles.get(link_id));
}
alt_text = escapeCharacters(attributeEncode(alt_text), "*_[]()"), url = escapeCharacters(url, "*_");
var result = '<img src="' + url + '" alt="' + alt_text + '"';
return title = attributeEncode(title), title = escapeCharacters(title, "*_"), result += ' title="' + title + '"', 
result += " />";
}
function _DoHeaders(text) {
return text = text.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm, function(wholeMatch, m1) {
return "<h1>" + _RunSpanGamut(m1) + "</h1>\n\n";
}), text = text.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm, function(matchFound, m1) {
return "<h2>" + _RunSpanGamut(m1) + "</h2>\n\n";
}), text = text.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm, function(wholeMatch, m1, m2) {
var h_level = m1.length;
return "<h" + h_level + ">" + _RunSpanGamut(m2) + "</h" + h_level + ">\n\n";
});
}
function _DoLists(text, isInsideParagraphlessListItem) {
text += "~0";
var whole_list = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
return g_list_level ? text = text.replace(whole_list, function(wholeMatch, m1, m2) {
var list = m1, list_type = m2.search(/[*+-]/g) > -1 ? "ul" :"ol", result = _ProcessListItems(list, list_type, isInsideParagraphlessListItem);
return result = result.replace(/\s+$/, ""), result = "<" + list_type + ">" + result + "</" + list_type + ">\n";
}) :(whole_list = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g, 
text = text.replace(whole_list, function(wholeMatch, m1, m2, m3) {
var runup = m1, list = m2, list_type = m3.search(/[*+-]/g) > -1 ? "ul" :"ol", result = _ProcessListItems(list, list_type);
return result = runup + "<" + list_type + ">\n" + result + "</" + list_type + ">\n";
})), text = text.replace(/~0/, "");
}
function _ProcessListItems(list_str, list_type, isInsideParagraphlessListItem) {
g_list_level++, list_str = list_str.replace(/\n{2,}$/, "\n"), list_str += "~0";
var marker = _listItemMarkers[list_type], re = new RegExp("(^[ \\t]*)(" + marker + ")[ \\t]+([^\\r]+?(\\n+))(?=(~0|\\1(" + marker + ")[ \\t]+))", "gm"), last_item_had_a_double_newline = !1;
return list_str = list_str.replace(re, function(wholeMatch, m1, m2, m3) {
var item = m3, ends_with_double_newline = /\n\n$/.test(item), contains_double_newline = ends_with_double_newline || item.search(/\n{2,}/) > -1;
return contains_double_newline || last_item_had_a_double_newline ? item = _RunBlockGamut(_Outdent(item), !0) :(item = _DoLists(_Outdent(item), !0), 
item = item.replace(/\n$/, ""), isInsideParagraphlessListItem || (item = _RunSpanGamut(item))), 
last_item_had_a_double_newline = ends_with_double_newline, "<li>" + item + "</li>\n";
}), list_str = list_str.replace(/~0/g, ""), g_list_level--, list_str;
}
function _DoCodeBlocks(text) {
return text += "~0", text = text.replace(/(?:\n\n|^\n?)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function(wholeMatch, m1, m2) {
var codeblock = m1, nextChar = m2;
return codeblock = _EncodeCode(_Outdent(codeblock)), codeblock = _Detab(codeblock), 
codeblock = codeblock.replace(/^\n+/g, ""), codeblock = codeblock.replace(/\n+$/g, ""), 
codeblock = "<pre><code>" + codeblock + "\n</code></pre>", "\n\n" + codeblock + "\n\n" + nextChar;
}), text = text.replace(/~0/, "");
}
function hashBlock(text) {
return text = text.replace(/(^\n+|\n+$)/g, ""), "\n\n~K" + (g_html_blocks.push(text) - 1) + "K\n\n";
}
function _DoCodeSpans(text) {
return text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(wholeMatch, m1, m2, m3) {
var c = m3;
return c = c.replace(/^([ \t]*)/g, ""), c = c.replace(/[ \t]*$/g, ""), c = _EncodeCode(c), 
c = c.replace(/:\/\//g, "~P"), m1 + "<code>" + c + "</code>";
});
}
function _EncodeCode(text) {
return text = text.replace(/&/g, "&amp;"), text = text.replace(/</g, "&lt;"), text = text.replace(/>/g, "&gt;"), 
text = escapeCharacters(text, "*_{}[]\\", !1);
}
function _DoItalicsAndBold(text) {
return text = text.replace(/([\W_]|^)(\*\*|__)(?=\S)([^\r]*?\S[\*_]*)\2([\W_]|$)/g, "$1<strong>$3</strong>$4"), 
text = text.replace(/([\W_]|^)(\*|_)(?=\S)([^\r\*_]*?\S)\2([\W_]|$)/g, "$1<em>$3</em>$4");
}
function _DoBlockQuotes(text) {
return text = text.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(wholeMatch, m1) {
var bq = m1;
return bq = bq.replace(/^[ \t]*>[ \t]?/gm, "~0"), bq = bq.replace(/~0/g, ""), bq = bq.replace(/^[ \t]+$/gm, ""), 
bq = _RunBlockGamut(bq), bq = bq.replace(/(^|\n)/g, "$1  "), bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(wholeMatch, m1) {
var pre = m1;
return pre = pre.replace(/^  /gm, "~0"), pre = pre.replace(/~0/g, "");
}), hashBlock("<blockquote>\n" + bq + "\n</blockquote>");
});
}
function _FormParagraphs(text, doNotUnhash) {
text = text.replace(/^\n+/g, ""), text = text.replace(/\n+$/g, "");
for (var grafs = text.split(/\n{2,}/g), grafsOut = [], markerRe = /~K(\d+)K/, end = grafs.length, i = 0; end > i; i++) {
var str = grafs[i];
markerRe.test(str) ? grafsOut.push(str) :/\S/.test(str) && (str = _RunSpanGamut(str), 
str = str.replace(/^([ \t]*)/g, "<p>"), str += "</p>", grafsOut.push(str));
}
if (!doNotUnhash) {
end = grafsOut.length;
for (var i = 0; end > i; i++) for (var foundAny = !0; foundAny; ) foundAny = !1, 
grafsOut[i] = grafsOut[i].replace(/~K(\d+)K/g, function(wholeMatch, id) {
return foundAny = !0, g_html_blocks[id];
});
}
return grafsOut.join("\n\n");
}
function _EncodeAmpsAndAngles(text) {
return text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), text = text.replace(/<(?![a-z\/?!]|~D)/gi, "&lt;");
}
function _EncodeBackslashEscapes(text) {
return text = text.replace(/\\(\\)/g, escapeCharacters_callback), text = text.replace(/\\([`*_{}\[\]()>#+-.!])/g, escapeCharacters_callback);
}
function handleTrailingParens(wholeMatch, lookbehind, protocol, link) {
if (lookbehind) return wholeMatch;
if (")" !== link.charAt(link.length - 1)) return "<" + protocol + link + ">";
for (var parens = link.match(/[()]/g), level = 0, i = 0; i < parens.length; i++) "(" === parens[i] ? 0 >= level ? level = 1 :level++ :level--;
var tail = "";
if (0 > level) {
var re = new RegExp("\\){1," + -level + "}$");
link = link.replace(re, function(trailingParens) {
return tail = trailingParens, "";
});
}
if (tail) {
var lastChar = link.charAt(link.length - 1);
endCharRegex.test(lastChar) || (tail = lastChar + tail, link = link.substr(0, link.length - 1));
}
return "<" + protocol + link + ">" + tail;
}
function _DoAutoLinks(text) {
text = text.replace(autoLinkRegex, handleTrailingParens);
var replacer = function(wholematch, m1) {
return '<a href="' + m1 + '">' + pluginHooks.plainLinkText(m1) + "</a>";
};
return text = text.replace(/<((https?|ftp):[^'">\s]+)>/gi, replacer);
}
function _UnescapeSpecialChars(text) {
return text = text.replace(/~E(\d+)E/g, function(wholeMatch, m1) {
var charCodeToReplace = parseInt(m1);
return String.fromCharCode(charCodeToReplace);
});
}
function _Outdent(text) {
return text = text.replace(/^(\t|[ ]{1,4})/gm, "~0"), text = text.replace(/~0/g, "");
}
function _Detab(text) {
if (!/\t/.test(text)) return text;
var v, spaces = [ "    ", "   ", "  ", " " ], skew = 0;
return text.replace(/[\n\t]/g, function(match, offset) {
return "\n" === match ? (skew = offset + 1, match) :(v = (offset - skew) % 4, skew = offset + 1, 
spaces[v]);
});
}
function encodeProblemUrlChars(url) {
if (!url) return "";
var len = url.length;
return url.replace(_problemUrlChars, function(match, offset) {
return "~D" == match ? "%24" :":" != match || offset != len - 1 && !/[0-9\/]/.test(url.charAt(offset + 1)) ? "%" + match.charCodeAt(0).toString(16) :":";
});
}
function escapeCharacters(text, charsToEscape, afterBackslash) {
var regexString = "([" + charsToEscape.replace(/([\[\]\\])/g, "\\$1") + "])";
afterBackslash && (regexString = "\\\\" + regexString);
var regex = new RegExp(regexString, "g");
return text = text.replace(regex, escapeCharacters_callback);
}
function escapeCharacters_callback(wholeMatch, m1) {
var charCodeToEscape = m1.charCodeAt(0);
return "~E" + charCodeToEscape + "E";
}
var pluginHooks = this.hooks = new HookCollection();
pluginHooks.addNoop("plainLinkText"), pluginHooks.addNoop("preConversion"), pluginHooks.addNoop("postNormalization"), 
pluginHooks.addNoop("preBlockGamut"), pluginHooks.addNoop("postBlockGamut"), pluginHooks.addNoop("preSpanGamut"), 
pluginHooks.addNoop("postSpanGamut"), pluginHooks.addNoop("postConversion");
var g_urls, g_titles, g_html_blocks, g_list_level;
this.makeHtml = function(text) {
if (g_urls) throw new Error("Recursive call to converter.makeHtml");
return g_urls = new SaveHash(), g_titles = new SaveHash(), g_html_blocks = [], g_list_level = 0, 
text = pluginHooks.preConversion(text), text = text.replace(/~/g, "~T"), text = text.replace(/\$/g, "~D"), 
text = text.replace(/\r\n/g, "\n"), text = text.replace(/\r/g, "\n"), text = "\n\n" + text + "\n\n", 
text = _Detab(text), text = text.replace(/^[ \t]+$/gm, ""), text = pluginHooks.postNormalization(text), 
text = _HashHTMLBlocks(text), text = _StripLinkDefinitions(text), text = _RunBlockGamut(text), 
text = _UnescapeSpecialChars(text), text = text.replace(/~D/g, "$$"), text = text.replace(/~T/g, "~"), 
text = pluginHooks.postConversion(text), g_html_blocks = g_titles = g_urls = null, 
text;
};
var blockGamutHookCallback = function(t) {
return _RunBlockGamut(t);
}, _listItemMarkers = {
ol:"\\d+[.]",
ul:"[*+-]"
}, charInsideUrl = "[-A-Z0-9+&@#/%?=~_|[\\]()!:,.;]", charEndingUrl = "[-A-Z0-9+&@#/%=~_|[\\])]", autoLinkRegex = new RegExp('(="|<)?\\b(https?|ftp)(://' + charInsideUrl + "*" + charEndingUrl + ")(?=$|\\W)", "gi"), endCharRegex = new RegExp(charEndingUrl, "i"), _problemUrlChars = /(?:["'*()[\]:]|~D)/g;
};
}(), function() {
function sanitizeHtml(html) {
return html.replace(/<[^>]*>?/gi, sanitizeTag);
}
function sanitizeTag(tag) {
return tag.match(basic_tag_whitelist) || tag.match(a_white) || tag.match(img_white) ? tag :"";
}
function balanceTags(html) {
if ("" == html) return "";
var re = /<\/?\w+[^>]*(\s|$|>)/g, tags = html.toLowerCase().match(re), tagcount = (tags || []).length;
if (0 == tagcount) return html;
for (var tagname, tag, match, ignoredtags = "<p><img><br><li><hr>", tagpaired = [], tagremove = [], needsRemoval = !1, ctag = 0; tagcount > ctag; ctag++) if (tagname = tags[ctag].replace(/<\/?(\w+).*/, "$1"), 
!(tagpaired[ctag] || ignoredtags.search("<" + tagname + ">") > -1)) {
if (tag = tags[ctag], match = -1, !/^<\//.test(tag)) for (var ntag = ctag + 1; tagcount > ntag; ntag++) if (!tagpaired[ntag] && tags[ntag] == "</" + tagname + ">") {
match = ntag;
break;
}
-1 == match ? needsRemoval = tagremove[ctag] = !0 :tagpaired[match] = !0;
}
if (!needsRemoval) return html;
var ctag = 0;
return html = html.replace(re, function(match) {
var res = tagremove[ctag] ? "" :match;
return ctag++, res;
});
}
var output, Converter;
"object" == typeof exports && "function" == typeof require ? (output = exports, 
Converter = require("./Markdown.Converter").Converter) :(output = window.Markdown, 
Converter = output.Converter), output.getSanitizingConverter = function() {
var converter = new Converter();
return converter.hooks.chain("postConversion", sanitizeHtml), converter.hooks.chain("postConversion", balanceTags), 
converter;
};
var basic_tag_whitelist = /^(<\/?(b|blockquote|code|del|dd|dl|dt|em|h1|h2|h3|i|kbd|li|ol|p|pre|s|sup|sub|strong|strike|ul)>|<(br|hr)\s?\/?>)$/i, a_white = /^(<a\shref="((https?|ftp):\/\/|\/)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+"(\stitle="[^"<>]+")?\s?>|<\/a>)$/i, img_white = /^(<img\ssrc="(https?:\/\/|\/)[-A-Za-z0-9+&@#\/%?=~_|!:,.;\(\)]+"(\swidth="\d{1,3}")?(\sheight="\d{1,3}")?(\salt="[^"<>]*")?(\stitle="[^"<>]*")?\s?\/?>)$/i;
}(), NODEJS = "undefined" != typeof module && module.exports) {
var pagedown = require("pagedown");
process.stdin.resume(), process.stdin.setEncoding("utf8"), _input = "", process.stdin.on("data", function(input) {
_input += input;
}), process.stdin.on("end", function() {
console.log(module.HackDown.processData(_input));
});
} else var pagedown = Markdown;

!function(module) {
function processData(input) {
var safeConverter = pagedown.getSanitizingConverter();
safeConverter.hooks.chain("preConversion", function(text) {
var result = text, block = /([\$]{1,2}.*?[\$]{1,2})/g;
return result = result.replace(block, "`$1`");
}), safeConverter.hooks.chain("postConversion", function(text) {
var result = text, block = /<code>([\$]{1,2}.*?[\$]{1,2})<\/code>/g;
return result = result.replace(block, "$1");
});
var sanitized_data = safeConverter.makeHtml(input);
return sanitized_data;
}
module.HackDown = module.HackDown || {}, module.HackDown.processData = processData, 
"undefined" != typeof define && define([], function() {
return module.HackDown;
});
}(NODEJS ? module :window);