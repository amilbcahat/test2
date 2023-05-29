!function() {
var a = tinymce.util.JSONRequest, c = tinymce.each, b = tinymce.DOM;
tinymce.create("tinymce.plugins.SpellcheckerPlugin", {
getInfo:function() {
return {
longname:"Spellchecker",
author:"Moxiecode Systems AB",
authorurl:"http://tinymce.moxiecode.com",
infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/spellchecker",
version:tinymce.majorVersion + "." + tinymce.minorVersion
};
},
init:function(e, f) {
var g = this;
if (g.url = f, g.editor = e, g.rpcUrl = e.getParam("spellchecker_rpc_url", "{backend}"), 
"{backend}" == g.rpcUrl) {
if (tinymce.isIE) return;
g.hasSupport = !0, e.onContextMenu.addToTop(function() {
return g.active ? !1 :void 0;
});
}
e.addCommand("mceSpellCheck", function() {
return "{backend}" == g.rpcUrl ? (g.editor.getBody().spellcheck = g.active = !g.active, 
void 0) :(g.active ? g._done() :(e.setProgressState(1), g._sendRPC("checkWords", [ g.selectedLang, g._getWords() ], function(h) {
h.length > 0 ? (g.active = 1, g._markWords(h), e.setProgressState(0), e.nodeChanged()) :(e.setProgressState(0), 
e.getParam("spellchecker_report_no_misspellings", !0) && e.windowManager.alert("spellchecker.no_mpell"));
})), void 0);
}), e.settings.content_css !== !1 && e.contentCSS.push(f + "/css/content.css"), 
e.onClick.add(g._showMenu, g), e.onContextMenu.add(g._showMenu, g), e.onBeforeGetContent.add(function() {
g.active && g._removeWords();
}), e.onNodeChange.add(function(i, h) {
h.setActive("spellchecker", g.active);
}), e.onSetContent.add(function() {
g._done();
}), e.onBeforeGetContent.add(function() {
g._done();
}), e.onBeforeExecCommand.add(function(h, i) {
"mceFullScreen" == i && g._done();
}), g.languages = {}, c(e.getParam("spellchecker_languages", "+English=en,Danish=da,Dutch=nl,Finnish=fi,French=fr,German=de,Italian=it,Polish=pl,Portuguese=pt,Spanish=es,Swedish=sv", "hash"), function(i, h) {
0 === h.indexOf("+") && (h = h.substring(1), g.selectedLang = i), g.languages[h] = i;
});
},
createControl:function(h, d) {
{
var g, f = this;
f.editor;
}
return "spellchecker" == h ? "{backend}" == f.rpcUrl ? (f.hasSupport && (g = d.createButton(h, {
title:"spellchecker.desc",
cmd:"mceSpellCheck",
scope:f
})), g) :(g = d.createSplitButton(h, {
title:"spellchecker.desc",
cmd:"mceSpellCheck",
scope:f
}), g.onRenderMenu.add(function(j, i) {
i.add({
title:"spellchecker.langs",
"class":"mceMenuItemTitle"
}).setDisabled(1), c(f.languages, function(n, m) {
var l, p = {
icon:1
};
p.onclick = function() {
n != f.selectedLang && (l.setSelected(1), f.selectedItem.setSelected(0), f.selectedItem = l, 
f.selectedLang = n);
}, p.title = m, l = i.add(p), l.setSelected(n == f.selectedLang), n == f.selectedLang && (f.selectedItem = l);
});
}), g) :void 0;
},
_walk:function(i, g) {
var e, h = this.editor.getDoc();
if (h.createTreeWalker) for (e = h.createTreeWalker(i, NodeFilter.SHOW_TEXT, null, !1); null != (i = e.nextNode()); ) g.call(this, i); else tinymce.walk(i, g, "childNodes");
},
_getSeparators:function() {
var d, e = "", f = this.editor.getParam("spellchecker_word_separator_chars", '\\s!"#$%&()*+,-./:;<=>?@[]^_{|}\xa7\xa9\xab\xae\xb1\xb6\xb7\xb8\xbb\xbc\xbd\xbe\xbf\xd7\xf7\xa4\u201d\u201c');
for (d = 0; d < f.length; d++) e += "\\" + f.charAt(d);
return e;
},
_getWords:function() {
var e = this.editor, g = [], d = "", f = {}, h = [];
return this._walk(e.getBody(), function(i) {
3 == i.nodeType && (d += i.nodeValue + " ");
}), e.getParam("spellchecker_word_pattern") ? h = d.match("(" + e.getParam("spellchecker_word_pattern") + ")", "gi") :(d = d.replace(new RegExp("([0-9]|[" + this._getSeparators() + "])", "g"), " "), 
d = tinymce.trim(d.replace(/(\s+)/g, " ")), h = d.split(" ")), c(h, function(i) {
f[i] || (g.push(i), f[i] = 1);
}), g;
},
_removeWords:function(e) {
var f = this.editor, h = f.dom, g = f.selection, d = g.getBookmark();
c(h.select("span").reverse(), function(i) {
i && (h.hasClass(i, "mceItemHiddenSpellWord") || h.hasClass(i, "mceItemHidden")) && (e && h.decode(i.innerHTML) != e || h.remove(i, 1));
}), g.moveToBookmark(d);
},
_markWords:function(l) {
var g = this.editor, f = g.dom, j = g.getDoc(), h = g.selection, i = h.getBookmark(), d = [], k = l.join("|"), m = this._getSeparators(), e = new RegExp("(^|[" + m + "])(" + k + ")(?=[" + m + "]|$)", "g");
this._walk(g.getBody(), function(o) {
3 == o.nodeType && d.push(o);
}), c(d, function(t) {
var r, q, o, s, p = t.nodeValue;
if (e.test(p)) {
if (p = f.encode(p), q = f.create("span", {
"class":"mceItemHidden"
}), tinymce.isIE) {
for (p = p.replace(e, "$1<mcespell>$2</mcespell>"); -1 != (s = p.indexOf("<mcespell>")); ) o = p.substring(0, s), 
o.length && (r = j.createTextNode(f.decode(o)), q.appendChild(r)), p = p.substring(s + 10), 
s = p.indexOf("</mcespell>"), o = p.substring(0, s), p = p.substring(s + 11), q.appendChild(f.create("span", {
"class":"mceItemHiddenSpellWord"
}, o));
p.length && (r = j.createTextNode(f.decode(p)), q.appendChild(r));
} else q.innerHTML = p.replace(e, '$1<span class="mceItemHiddenSpellWord">$2</span>');
f.replace(q, t);
}
}), h.moveToBookmark(i);
},
_showMenu:function(h, j) {
var l, i = this, h = i.editor, d = i._menu, k = h.dom, g = k.getViewPort(h.getWin()), f = j.target;
return j = 0, d || (d = h.controlManager.createDropMenu("spellcheckermenu", {
"class":"mceNoIcons"
}), i._menu = d), k.hasClass(f, "mceItemHiddenSpellWord") ? (d.removeAll(), d.add({
title:"spellchecker.wait",
"class":"mceMenuItemTitle"
}).setDisabled(1), i._sendRPC("getSuggestions", [ i.selectedLang, k.decode(f.innerHTML) ], function(m) {
var e;
d.removeAll(), m.length > 0 ? (d.add({
title:"spellchecker.sug",
"class":"mceMenuItemTitle"
}).setDisabled(1), c(m, function(n) {
d.add({
title:n,
onclick:function() {
k.replace(h.getDoc().createTextNode(n), f), i._checkDone();
}
});
}), d.addSeparator()) :d.add({
title:"spellchecker.no_sug",
"class":"mceMenuItemTitle"
}).setDisabled(1), e = i.editor.getParam("spellchecker_enable_ignore_rpc", ""), 
d.add({
title:"spellchecker.ignore_word",
onclick:function() {
var n = f.innerHTML;
k.remove(f, 1), i._checkDone(), e && (h.setProgressState(1), i._sendRPC("ignoreWord", [ i.selectedLang, n ], function() {
h.setProgressState(0);
}));
}
}), d.add({
title:"spellchecker.ignore_words",
onclick:function() {
var n = f.innerHTML;
i._removeWords(k.decode(n)), i._checkDone(), e && (h.setProgressState(1), i._sendRPC("ignoreWords", [ i.selectedLang, n ], function() {
h.setProgressState(0);
}));
}
}), i.editor.getParam("spellchecker_enable_learn_rpc") && d.add({
title:"spellchecker.learn_word",
onclick:function() {
var n = f.innerHTML;
k.remove(f, 1), i._checkDone(), h.setProgressState(1), i._sendRPC("learnWord", [ i.selectedLang, n ], function() {
h.setProgressState(0);
});
}
}), d.update();
}), l = b.getPos(h.getContentAreaContainer()), d.settings.offset_x = l.x, d.settings.offset_y = l.y, 
h.selection.select(f), l = k.getPos(f), d.showMenu(l.x, l.y + f.offsetHeight - g.y), 
tinymce.dom.Event.cancel(j)) :(d.hideMenu(), void 0);
},
_checkDone:function() {
var f, e = this, d = e.editor, g = d.dom;
c(g.select("span"), function(h) {
return h && g.hasClass(h, "mceItemHiddenSpellWord") ? (f = !0, !1) :void 0;
}), f || e._done();
},
_done:function() {
var d = this, e = d.active;
d.active && (d.active = 0, d._removeWords(), d._menu && d._menu.hideMenu(), e && d.editor.nodeChanged());
},
_sendRPC:function(e, g, d) {
var f = this;
a.sendRPC({
url:f.rpcUrl,
method:e,
params:g,
success:d,
error:function(i, h) {
f.editor.setProgressState(0), f.editor.windowManager.alert(i.errstr || "Error response: " + h.responseText);
}
});
}
}), tinymce.PluginManager.add("spellchecker", tinymce.plugins.SpellcheckerPlugin);
}();