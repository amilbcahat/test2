/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */
"use strict";

!function() {
function registerWidget(editor) {
function getNonEmptyChildren(parentElement) {
for (var curNode, ret = [], preChildrenList = parentElement.children, i = preChildrenList.length - 1; i >= 0; i--) curNode = preChildrenList[i], 
curNode.type == CKEDITOR.NODE_TEXT && curNode.value.match(whitespaceOnlyRegex) || ret.push(curNode);
return ret;
}
var codeClass = "someClass", textarea = new CKEDITOR.dom.element("textarea");
editor.widgets.add("insertCode", {
allowedContent:"pre; code(language-*)",
requiredContent:"pre",
styleableElements:"pre",
template:'<pre><code class="' + codeClass + '"></code></pre>',
dialog:"insertCode",
mask:!0,
parts:{
pre:"pre",
code:"code"
},
data:function() {
{
var newData = this.data;
this.oldData;
}
if (newData.code) {
var that = this;
setTimeout(function() {
that.editor.setData("<pre>" + CKEDITOR.tools.htmlEncode(newData.code) + "</pre>");
}, 300);
}
this.oldData = CKEDITOR.tools.copy(newData);
},
upcast:function(el, data) {
if ("pre" == el.name) {
var code, childrenArray = getNonEmptyChildren(el);
if (1 == childrenArray.length && "code" == (code = childrenArray[0]).name && 1 == code.children.length && code.children[0].type == CKEDITOR.NODE_TEXT) {
var matchResult = editor._.codesnippet.langsRegex.exec(code.attributes["class"]);
return matchResult && (data.lang = matchResult[1]), textarea.setHtml(code.getHtml()), 
data.code = textarea.getValue(), code.addClass(codeClass), el;
}
}
},
downcast:function(el) {
var code = el.getFirst("code");
return code.children.length = 0, code.removeClass(codeClass), code.add(new CKEDITOR.htmlParser.text(CKEDITOR.tools.htmlEncode(this.data.code))), 
el;
}
});
var whitespaceOnlyRegex = /^[\s\n\r]*$/;
}
!CKEDITOR.env.ie || CKEDITOR.env.version > 8;
CKEDITOR.plugins.add("insertcode", {
requires:"widget,dialog",
icons:"insertcode",
hidpi:!0,
beforeInit:function(editor) {
editor._.insertcode = {};
},
onLoad:function() {
CKEDITOR.dialog.add("insertCode", this.path + "dialogs/insertcode.js");
},
init:function(editor) {
editor.ui.addButton && editor.ui.addButton("InsertCode", {
label:"Insert Code",
command:"insertCode",
toolbar:"insert,10"
});
},
afterInit:function(editor) {
this.path;
registerWidget(editor);
}
}), CKEDITOR.plugins.insertcode = {};
}(), CKEDITOR.config.codeSnippet_codeClass = "hljs", CKEDITOR.config.codeSnippet_theme = "default";