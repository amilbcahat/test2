!function() {
function $(expr, con) {
return [].slice.call((con || document).querySelectorAll(expr));
}
if (window.addEventListener) {
var self = window.StyleFix = {
link:function(link) {
try {
if ("stylesheet" !== link.rel || link.hasAttribute("data-noprefix")) return;
} catch (e) {
return;
}
var process, url = link.href || link.getAttribute("data-href"), base = url.replace(/[^\/]+$/, ""), base_scheme = (/^[a-z]{3,10}:/.exec(base) || [ "" ])[0], base_domain = (/^[a-z]{3,10}:\/\/[^\/]+/.exec(base) || [ "" ])[0], base_query = /^([^?]*)\??/.exec(url)[1], parent = link.parentNode, xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
4 === xhr.readyState && process();
}, process = function() {
var css = xhr.responseText;
if (css && link.parentNode && (!xhr.status || xhr.status < 400 || xhr.status > 600)) {
if (css = self.fix(css, !0, link), base) {
css = css.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi, function($0, quote, url) {
return /^([a-z]{3,10}:|#)/i.test(url) ? $0 :/^\/\//.test(url) ? 'url("' + base_scheme + url + '")' :/^\//.test(url) ? 'url("' + base_domain + url + '")' :/^\?/.test(url) ? 'url("' + base_query + url + '")' :'url("' + base + url + '")';
});
var escaped_base = base.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g, "\\$1");
css = css.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)" + escaped_base, "gi"), "$1");
}
var style = document.createElement("style");
style.textContent = css, style.media = link.media, style.disabled = link.disabled, 
style.setAttribute("data-href", link.getAttribute("href")), parent.insertBefore(style, link), 
parent.removeChild(link), style.media = link.media;
}
};
try {
xhr.open("GET", url), xhr.send(null);
} catch (e) {
"undefined" != typeof XDomainRequest && (xhr = new XDomainRequest(), xhr.onerror = xhr.onprogress = function() {}, 
xhr.onload = process, xhr.open("GET", url), xhr.send(null));
}
link.setAttribute("data-inprogress", "");
},
styleElement:function(style) {
if (!style.hasAttribute("data-noprefix")) {
var disabled = style.disabled;
style.textContent = self.fix(style.textContent, !0, style), style.disabled = disabled;
}
},
styleAttribute:function(element) {
var css = element.getAttribute("style");
css = self.fix(css, !1, element), element.setAttribute("style", css);
},
process:function() {
$('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link), $("style").forEach(StyleFix.styleElement), 
$("[style]").forEach(StyleFix.styleAttribute);
},
register:function(fixer, index) {
(self.fixers = self.fixers || []).splice(void 0 === index ? self.fixers.length :index, 0, fixer);
},
fix:function(css, raw, element) {
for (var i = 0; i < self.fixers.length; i++) css = self.fixers[i](css, raw, element) || css;
return css;
},
camelCase:function(str) {
return str.replace(/-([a-z])/g, function($0, $1) {
return $1.toUpperCase();
}).replace("-", "");
},
deCamelCase:function(str) {
return str.replace(/[A-Z]/g, function($0) {
return "-" + $0.toLowerCase();
});
}
};
!function() {
setTimeout(function() {
$('link[rel="stylesheet"]').forEach(StyleFix.link);
}, 10), document.addEventListener("DOMContentLoaded", StyleFix.process, !1);
}();
}
}(), function(root) {
function fix(what, before, after, replacement, css) {
if (what = self[what], what.length) {
var regex = RegExp(before + "(" + what.join("|") + ")" + after, "gi");
css = css.replace(regex, replacement);
}
return css;
}
if (window.StyleFix && window.getComputedStyle) {
var self = window.PrefixFree = {
prefixCSS:function(css, raw) {
var prefix = self.prefix;
if (self.functions.indexOf("linear-gradient") > -1 && (css = css.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/gi, function($0, delim, repeating, deg) {
return delim + (repeating || "") + "linear-gradient(" + (90 - deg) + "deg";
})), css = fix("functions", "(\\s|:|,)", "\\s*\\(", "$1" + prefix + "$2(", css), 
css = fix("keywords", "(\\s|:)", "(\\s|;|\\}|$)", "$1" + prefix + "$2$3", css), 
css = fix("properties", "(^|\\{|\\s|;)", "\\s*:", "$1" + prefix + "$2:", css), self.properties.length) {
var regex = RegExp("\\b(" + self.properties.join("|") + ")(?!:)", "gi");
css = fix("valueProperties", "\\b", ":(.+?);", function($0) {
return $0.replace(regex, prefix + "$1");
}, css);
}
return raw && (css = fix("selectors", "", "\\b", self.prefixSelector, css), css = fix("atrules", "@", "\\b", "@" + prefix + "$1", css)), 
css = css.replace(RegExp("-" + prefix, "g"), "-"), css = css.replace(/-\*-(?=[a-z]+)/gi, self.prefix);
},
property:function(property) {
return (self.properties.indexOf(property) >= 0 ? self.prefix :"") + property;
},
value:function(value, property) {
return value = fix("functions", "(^|\\s|,)", "\\s*\\(", "$1" + self.prefix + "$2(", value), 
value = fix("keywords", "(^|\\s)", "(\\s|$)", "$1" + self.prefix + "$2$3", value), 
self.valueProperties.indexOf(property) >= 0 && (value = fix("properties", "(^|\\s|,)", "($|\\s|,)", "$1" + self.prefix + "$2$3", value)), 
value;
},
prefixSelector:function(selector) {
return selector.replace(/^:{1,2}/, function($0) {
return $0 + self.prefix;
});
},
prefixProperty:function(property, camelCase) {
var prefixed = self.prefix + property;
return camelCase ? StyleFix.camelCase(prefixed) :prefixed;
}
};
!function() {
var prefixes = {}, properties = [], style = getComputedStyle(document.documentElement, null), dummy = document.createElement("div").style, iterate = function(property) {
if ("-" === property.charAt(0)) {
properties.push(property);
var parts = property.split("-"), prefix = parts[1];
for (prefixes[prefix] = ++prefixes[prefix] || 1; parts.length > 3; ) {
parts.pop();
var shorthand = parts.join("-");
supported(shorthand) && -1 === properties.indexOf(shorthand) && properties.push(shorthand);
}
}
}, supported = function(property) {
return StyleFix.camelCase(property) in dummy;
};
if (style.length > 0) for (var i = 0; i < style.length; i++) iterate(style[i]); else for (var property in style) iterate(StyleFix.deCamelCase(property));
var highest = {
uses:0
};
for (var prefix in prefixes) {
var uses = prefixes[prefix];
highest.uses < uses && (highest = {
prefix:prefix,
uses:uses
});
}
self.prefix = "-" + highest.prefix + "-", self.Prefix = StyleFix.camelCase(self.prefix), 
self.properties = [];
for (var i = 0; i < properties.length; i++) {
var property = properties[i];
if (0 === property.indexOf(self.prefix)) {
var unprefixed = property.slice(self.prefix.length);
supported(unprefixed) || self.properties.push(unprefixed);
}
}
"Ms" != self.Prefix || "transform" in dummy || "MsTransform" in dummy || !("msTransform" in dummy) || self.properties.push("transform", "transform-origin"), 
self.properties.sort();
}(), function() {
function supported(value, property) {
return style[property] = "", style[property] = value, !!style[property];
}
var functions = {
"linear-gradient":{
property:"backgroundImage",
params:"red, teal"
},
calc:{
property:"width",
params:"1px + 5%"
},
element:{
property:"backgroundImage",
params:"#foo"
},
"cross-fade":{
property:"backgroundImage",
params:"url(a.png), url(b.png), 50%"
}
};
functions["repeating-linear-gradient"] = functions["repeating-radial-gradient"] = functions["radial-gradient"] = functions["linear-gradient"];
var keywords = {
initial:"color",
"zoom-in":"cursor",
"zoom-out":"cursor",
box:"display",
flexbox:"display",
"inline-flexbox":"display",
flex:"display",
"inline-flex":"display",
grid:"display",
"inline-grid":"display",
"min-content":"width"
};
self.functions = [], self.keywords = [];
var style = document.createElement("div").style;
for (var func in functions) {
var test = functions[func], property = test.property, value = func + "(" + test.params + ")";
!supported(value, property) && supported(self.prefix + value, property) && self.functions.push(func);
}
for (var keyword in keywords) {
var property = keywords[keyword];
!supported(keyword, property) && supported(self.prefix + keyword, property) && self.keywords.push(keyword);
}
}(), function() {
function supported(selector) {
return style.textContent = selector + "{}", !!style.sheet.cssRules.length;
}
var selectors = {
":read-only":null,
":read-write":null,
":any-link":null,
"::selection":null
}, atrules = {
keyframes:"name",
viewport:null,
document:'regexp(".")'
};
self.selectors = [], self.atrules = [];
var style = root.appendChild(document.createElement("style"));
for (var selector in selectors) {
var test = selector + (selectors[selector] ? "(" + selectors[selector] + ")" :"");
!supported(test) && supported(self.prefixSelector(test)) && self.selectors.push(selector);
}
for (var atrule in atrules) {
var test = atrule + " " + (atrules[atrule] || "");
!supported("@" + test) && supported("@" + self.prefix + test) && self.atrules.push(atrule);
}
root.removeChild(style);
}(), self.valueProperties = [ "transition", "transition-property" ], root.className += " " + self.prefix, 
StyleFix.register(self.prefixCSS);
}
}(document.documentElement);