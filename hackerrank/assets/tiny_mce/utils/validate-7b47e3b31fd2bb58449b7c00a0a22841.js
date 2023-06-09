/**
 * validate.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */
var Validator = {
isEmail:function(s) {
return this.test(s, "^[-!#$%&'*+\\./0-9=?A-Z^_`a-z{|}~]+@[-!#$%&'*+\\/0-9=?A-Z^_`a-z{|}~]+.[-!#$%&'*+\\./0-9=?A-Z^_`a-z{|}~]+$");
},
isAbsUrl:function(s) {
return this.test(s, "^(news|telnet|nttp|file|http|ftp|https)://[-A-Za-z0-9\\.]+\\/?.*$");
},
isSize:function(s) {
return this.test(s, "^[0-9.]+(%|in|cm|mm|em|ex|pt|pc|px)?$");
},
isId:function(s) {
return this.test(s, "^[A-Za-z_]([A-Za-z0-9_])*$");
},
isEmpty:function(s) {
var nl, i;
if ("SELECT" == s.nodeName && s.selectedIndex < 1) return !0;
if ("checkbox" == s.type && !s.checked) return !0;
if ("radio" == s.type) {
for (i = 0, nl = s.form.elements; i < nl.length; i++) if ("radio" == nl[i].type && nl[i].name == s.name && nl[i].checked) return !1;
return !0;
}
return new RegExp("^\\s*$").test(1 == s.nodeType ? s.value :s);
},
isNumber:function(s, d) {
return !(isNaN(1 == s.nodeType ? s.value :s) || d && this.test(s, "^-?[0-9]*\\.[0-9]*$"));
},
test:function(s, p) {
return s = 1 == s.nodeType ? s.value :s, "" == s || new RegExp(p).test(s);
}
}, AutoValidator = {
settings:{
id_cls:"id",
int_cls:"int",
url_cls:"url",
number_cls:"number",
email_cls:"email",
size_cls:"size",
required_cls:"required",
invalid_cls:"invalid",
min_cls:"min",
max_cls:"max"
},
init:function(s) {
var n;
for (n in s) this.settings[n] = s[n];
},
validate:function(f) {
var i, nl, s = this.settings, c = 0;
for (nl = this.tags(f, "label"), i = 0; i < nl.length; i++) this.removeClass(nl[i], s.invalid_cls), 
nl[i].setAttribute("aria-invalid", !1);
return c += this.validateElms(f, "input"), c += this.validateElms(f, "select"), 
c += this.validateElms(f, "textarea"), 3 == c;
},
invalidate:function(n) {
this.mark(n.form, n);
},
getErrorMessages:function(f) {
var nl, i, field, values, s = this.settings, messages = [], ed = tinyMCEPopup.editor;
for (nl = this.tags(f, "label"), i = 0; i < nl.length; i++) this.hasClass(nl[i], s.invalid_cls) && (field = document.getElementById(nl[i].getAttribute("for")), 
values = {
field:nl[i].textContent
}, this.hasClass(field, s.min_cls, !0) ? (message = ed.getLang("invalid_data_min"), 
values.min = this.getNum(field, s.min_cls)) :message = this.hasClass(field, s.number_cls) ? ed.getLang("invalid_data_number") :this.hasClass(field, s.size_cls) ? ed.getLang("invalid_data_size") :ed.getLang("invalid_data"), 
message = message.replace(/{\#([^}]+)\}/g, function(a, b) {
return values[b] || "{#" + b + "}";
}), messages.push(message));
return messages;
},
reset:function(e) {
var i, j, nl, t = [ "label", "input", "select", "textarea" ], s = this.settings;
if (null != e) for (i = 0; i < t.length; i++) for (nl = this.tags(e.form ? e.form :e, t[i]), 
j = 0; j < nl.length; j++) this.removeClass(nl[j], s.invalid_cls), nl[j].setAttribute("aria-invalid", !1);
},
validateElms:function(f, e) {
var nl, i, n, v, s = this.settings, st = !0, va = Validator;
for (nl = this.tags(f, e), i = 0; i < nl.length; i++) n = nl[i], this.removeClass(n, s.invalid_cls), 
this.hasClass(n, s.required_cls) && va.isEmpty(n) && (st = this.mark(f, n)), this.hasClass(n, s.number_cls) && !va.isNumber(n) && (st = this.mark(f, n)), 
this.hasClass(n, s.int_cls) && !va.isNumber(n, !0) && (st = this.mark(f, n)), this.hasClass(n, s.url_cls) && !va.isAbsUrl(n) && (st = this.mark(f, n)), 
this.hasClass(n, s.email_cls) && !va.isEmail(n) && (st = this.mark(f, n)), this.hasClass(n, s.size_cls) && !va.isSize(n) && (st = this.mark(f, n)), 
this.hasClass(n, s.id_cls) && !va.isId(n) && (st = this.mark(f, n)), this.hasClass(n, s.min_cls, !0) && (v = this.getNum(n, s.min_cls), 
(isNaN(v) || parseInt(n.value) < parseInt(v)) && (st = this.mark(f, n))), this.hasClass(n, s.max_cls, !0) && (v = this.getNum(n, s.max_cls), 
(isNaN(v) || parseInt(n.value) > parseInt(v)) && (st = this.mark(f, n)));
return st;
},
hasClass:function(n, c, d) {
return new RegExp("\\b" + c + (d ? "[0-9]+" :"") + "\\b", "g").test(n.className);
},
getNum:function(n, c) {
return c = n.className.match(new RegExp("\\b" + c + "([0-9]+)\\b", "g"))[0], c = c.replace(/[^0-9]/g, "");
},
addClass:function(n, c, b) {
var o = this.removeClass(n, c);
n.className = b ? c + ("" != o ? " " + o :"") :("" != o ? o + " " :"") + c;
},
removeClass:function(n, c) {
return c = n.className.replace(new RegExp("(^|\\s+)" + c + "(\\s+|$)"), " "), n.className = " " != c ? c :"";
},
tags:function(f, s) {
return f.getElementsByTagName(s);
},
mark:function(f, n) {
var s = this.settings;
return this.addClass(n, s.invalid_cls), n.setAttribute("aria-invalid", "true"), 
this.markLabels(f, n, s.invalid_cls), !1;
},
markLabels:function(f, n, ic) {
var nl, i;
for (nl = this.tags(f, "label"), i = 0; i < nl.length; i++) (nl[i].getAttribute("for") == n.id || nl[i].htmlFor == n.id) && this.addClass(nl[i], ic);
return null;
}
};