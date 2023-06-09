(function() {
var __indexOf = [].indexOf || function(item) {
for (var i = 0, l = this.length; l > i; i++) if (i in this && this[i] === item) return i;
return -1;
};
!function(widgetFactory) {
"function" == typeof define && define.amd ? define("codeshell", [ "jquery", "underscore", "codemirror/lib/codemirror", "select2", "json2", "jstorage", "jstree" ], function($, _, cm) {
widgetFactory(window.jQuery, window, _, cm);
}) :widgetFactory(window.jQuery, window, window._, window.CodeMirror);
}(function($, window, _, CodeMirror) {
return $.widget("hr.codeshell", {
options:{},
_options:{
showFileTree:!1,
enableIntellisense:!1,
showSave:!1,
showCustomInput:!0,
showCompileTest:!0,
showSubmit:!1,
showUploadCode:!1,
showFullScreen:!1,
statusText:"",
showTheme:!1,
showNonEditableHeadTail:!1,
enableVersioning:!1,
versionIds:[],
versioningRestUrl:"",
foldCode:!1,
dynamicMode:!1,
languages:[ "c", "cpp", "java", "csharp", "haskell", "php", "python", "perl", "ruby", "bash", "oracle", "mysql", "sql", "clojure", "scala", "code", "text", "brainfuck", "javascript", "d", "go", "lua", "erlang", "sbcl", "ocaml", "pascal", "python3", "groovy", "text_pseudo", "objectivec", "fsharp", "visualbasic", "cobol", "tsql", "lolcode", "smalltalk", "tcl", "html", "css", "java8", "db2", "octave", "r" ],
language:"c",
showTemplate:!0,
autoSaveNamespace:null,
onSave:null,
autoSave:null,
firstLineNumber:1,
initialCode:"",
compile_button_text:"Run Code",
submit_button_text:"Submit Code",
lang_line_nos:{},
lang_head_template:{},
lang_body_template:{},
lang_tail_template:{},
lang_template:{},
lang_mime_mapping:{
c:"text/x-csrc",
cpp:"text/x-c++src",
java:"text/x-java",
csharp:"text/x-csharp",
haskell:"text/x-haskell",
php:"text/x-php",
python:"text/x-python",
perl:"text/x-perl",
ruby:"text/x-ruby",
bash:"text/x-bash",
oracle:"text/x-plsql",
mysql:"text/x-plsql",
tsql:"text/x-plsql",
sql:"text/x-plsql",
clojure:"text/x-scheme",
scala:"text/x-scala",
code:"text/plain",
text:"text/plain",
brainfuck:"text/plain",
javascript:"text/javascript",
d:"text/x-d",
go:"text/x-go",
lua:"text/x-lua",
erlang:"text/x-erlang",
sbcl:"text/x-common-lisp",
ocaml:"text/x-ocaml",
pascal:"text/x-pascal",
python3:"text/x-python",
groovy:"text/x-groovy",
text_pseudo:"text/plain",
objectivec:"text/x-csrc",
fsharp:"text/x-fsharp",
visualbasic:"text/x-vb",
cobol:"text/x-cobol",
smalltalk:"text/x-stsrc",
tcl:"text/x-tcl",
html:"text/html",
css:"text/css",
java8:"text/x-java",
db2:"text/x-plsql",
octave:"text/x-octave",
r:"text/x-rsrc"
},
lang_display_mapping:{
c:"C",
cpp:"C++",
java:"Java",
csharp:"C#",
haskell:"Haskell",
php:"PHP",
python:"Python 2",
ruby:"Ruby",
perl:"Perl",
bash:"BASH",
oracle:"Oracle",
mysql:"MySQL",
sql:"SQL",
clojure:"Clojure",
scala:"Scala",
code:"Generic",
text:"Plain Text",
brainfuck:"Brainfuck",
javascript:"Javascript",
lua:"Lua",
sbcl:"Lisp",
erlang:"Erlang",
go:"Go",
d:"D",
ocaml:"OCaml",
pascal:"Pascal",
python3:"Python 3",
groovy:"Groovy",
objectivec:"Objective C",
text_pseudo:"Plain Text",
fsharp:"F#",
visualbasic:"VB.NET",
cobol:"COBOL",
tsql:"T-SQL",
lolcode:"LOLCODE",
smalltalk:"Smalltalk",
tcl:"Tcl",
whitespace:"Whitespace",
css:"CSS",
html:"HTML",
java8:"Java 8",
db2:"DB2",
octave:"Octave",
r:"R"
},
default_head_end:{
c:"/* Head ends here */",
cpp:"/* Head ends here */",
java:"/* Head ends here */",
csharp:"/* Head ends here */",
haskell:"-- Head ends here",
php:"/* Head ends here */",
python:"# Head ends here",
perl:"# Head ends here",
ruby:"# Head ends here",
bash:"# Head ends here",
clojure:"; Head ends here",
scala:"/* Head ends here */",
sbcl:"; Head ends here",
lua:"-- Head ends here",
javascript:"/* Head ends here */",
pascal:"{ Head ends here }",
python3:"# Head ends here",
groovy:"// Head ends here",
objectivec:"// Head ends here",
fsharp:"// Head ends here",
visualbasic:"' Head ends here",
cobol:"* Head ends here",
lolcode:"BTW Head ends here",
smalltalk:'" Head ends here"',
tcl:"# Head ends here",
whitespace:"Head ends here",
html:"<!-- Head ends here -->",
css:"/* Head ends here */",
java8:"/* Head ends here */",
db2:"/* Head ends here */",
octave:"# Head ends here",
r:"# Head ends here"
},
lang_fold_mapping:{
c:"brace",
cpp:"brace",
java:"brace",
csharp:"brace",
haskell:"indent",
php:"brace",
python:"indent",
ruby:"indent",
perl:"brace",
bash:"brace",
oracle:"indent",
mysql:"indent",
sql:"indent",
clojure:"indent",
scala:"brace",
code:"brace",
text:"indent",
brainfuck:"indent",
javascript:"brace",
lua:"indent",
sbcl:"indent",
erlang:"indent",
go:"brace",
d:"brace",
ocaml:"indent",
pascal:"indent",
python3:"indent",
groovy:"brace",
objectivec:"brace",
text_pseudo:"indent",
fsharp:"indent",
visualbasic:"indent",
cobol:"indent",
lolcode:"indent",
smalltalk:"indent",
tcl:"brace",
whitespace:"indent",
html:"tag",
css:"brace",
java8:"brace",
db2:"indent",
octave:"indent",
r:"brace"
},
default_tail_start:{
c:"/* Tail starts here */",
cpp:"/* Tail starts here */",
java:"/* Tail starts here */",
csharp:"/* Tail starts here */",
haskell:"-- Tail starts here",
php:"/* Tail starts here */",
python:"# Tail starts here",
perl:"# Tail starts here",
ruby:"# Tail starts here",
bash:"# Tail starts here",
clojure:"; Tail starts here",
scala:"/* Tail starts here */",
sbcl:"; Tail starts here",
lua:"-- Tail starts here",
javascript:"/* Tail starts here */",
pascal:"{ Tail starts here }",
python3:"# Tail starts here",
groovy:"// Tail starts here",
objectivec:"// Tail starts here",
fsharp:"// Tail starts here",
visualbasic:"' Tail starts here",
cobol:"* Tail starts here",
lolcode:"BTW Tail starts here",
smalltalk:'" Tail starts here"',
tcl:"# Tail starts here",
whitespace:"Tail starts here",
html:"<!-- Tail starts here -->",
css:"/* Tails starts here */",
java8:"/* Tail starts here */",
db2:"/* Tail starts here */",
octave:"# Tail starts here ",
r:"# Tail starts here "
},
lang_default_text:{
c:"#include <stdio.h>\n#include <string.h>\n#include <math.h>\n#include <stdlib.h>\n\nint main() {\n\n    /* Enter your code here. Read input from STDIN. Print output to STDOUT */    \n    return 0;\n}\n",
cpp:"#include <cmath>\n#include <cstdio>\n#include <vector>\n#include <iostream>\n#include <algorithm>\nusing namespace std;\n\n\nint main() {\n    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   \n    return 0;\n}\n",
java:"import java.io.*;\nimport java.util.*;\nimport java.text.*;\nimport java.math.*;\nimport java.util.regex.*;\n\npublic class Solution {\n\n    public static void main(String[] args) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */\n    }\n}",
csharp:"using System;\nusing System.Collections.Generic;\nusing System.IO;\nclass Solution {\n    static void Main(String[] args) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution */\n    }\n}",
php:'<?php\n$_fp = fopen("php://stdin", "r");\n/* Enter your code here. Read input from STDIN. Print output to STDOUT */\n\n?>',
ruby:"# Enter your code here. Read input from STDIN. Print output to STDOUT",
python:"# Enter your code here. Read input from STDIN. Print output to STDOUT",
perl:"# Enter your code here. Read input from STDIN. Print output to STDOUT",
haskell:"-- Enter your code here. Read input from STDIN. Print output to STDOUT",
clojure:"; Enter your code here. Read input from STDIN. Print output to STDOUT\n;",
lua:"-- Enter your code here. Read input from STDIN. Print output to STDOUT",
sbcl:";; Enter your code here. Read input from STDIN. Print output to STDOUT",
erlang:"% Enter your code here. Read input from STDIN. Print output to STDOUT\n% Your class should be named solution\n\n-module(solution).\n-export([main/0]).\n\nmain() ->\n	.\n",
scala:"object Solution {\n\n    def main(args: Array[String]) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution\n*/\n    }\n}",
go:'package main\nimport "fmt"\n\nfunc main() {\n //Enter your code here. Read input from STDIN. Print output to STDOUT\n}',
javascript:'function processData(input) {\n    //Enter your code here\n} \n\nprocess.stdin.resume();\nprocess.stdin.setEncoding("ascii");\n_input = "";\nprocess.stdin.on("data", function (input) {\n    _input += input;\n});\n\nprocess.stdin.on("end", function () {\n   processData(_input);\n});\n',
d:"/* Enter your code here. Read input from STDIN. Print output to STDOUT */",
ocaml:"(* Enter your code here. Read input from STDIN. Print output to STDOUT *)",
pascal:"(* Enter your code here. Read input from STDIN. Print output to STDOUT *)",
groovy:"//Enter your code here. Read input from STDIN. Print output to STDOUT",
text:"",
objectivec:"//Enter your code here. Read input from STDIN. Print output to STDOUT",
fsharp:"//Enter your code here. Read input from STDIN. Print output to STDOUT",
visualbasic:"'Enter your code here. Read input from STDIN. Print output to STDOUT",
cobol:"*Enter your code here. Read input from STDIN. Print output to STDOUT",
lolcode:"BTW Enter your code here. Read input from STDIN. Print output to STDOUT",
smalltalk:'"Enter your code here. Read input from STDIN. Print output to STDOUT"',
tcl:"# Enter your code here. Read input from STDIN. Print output to STDOUT",
whitespace:"Enter your code here. Read input from STDIN. Print output to STDOUT",
html:"<!-- Enter your code here -->",
css:"/* Enter your code here*/",
java8:"import java.io.*;\nimport java.util.*;\n\npublic class Solution {\n\n    public static void main(String[] args) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */\n    }\n}",
octave:"# Enter your code here. Read input from STDIN. Print output to STDOUT",
r:"# Enter your code here. Read input from STDIN. Print output to STDOUT"
}
},
headerTemplate:'<div class="clearfix grey-header cap plL plR psT psB" style="position: relative;">\n  <% if (enableVersioning) { %>\n  <div class="fork-dialog cs-dialog hide">\n    <div class="header">Fork <span class="version-seq"></span></div>\n    <div class="body">\n      <p class="grey-msg">past buffers are marked read only, you wont be able to edit your current buffer without forking it</p>\n      <div class="m msT">\n        <button class="btn close-fork-dialog">Cancel</button>&nbsp;&nbsp;\n        <button class="btn btn-primary fork-version" data-action="fork">Fork <span class="version-seq"></span></button>&nbsp;&nbsp;\n        <button class="btn btn-primary fork-version" data-action="orphan">Create New Buffer</button>\n      </div>\n    </div>\n  </div>\n  <div class="fork-limit-reached-dialog cs-dialog hide">\n    <div class="header">Fork Limit Reached</div>\n    <div class="body">\n      <p class="grey-msg">You can&rsquo;t create more than 20 buffers, please delete one of your old bufferes to create a new buffer.</p>\n      <div class="m msT">\n        <button class="btn close-fork-limit-reached-dialog">OK</button>&nbsp;&nbsp;\n      </div>\n    </div>\n  </div>\n  <div class="delete-version-dialog cs-dialog hide">\n    <div class="header">Delete <span class="version-seq"></span></div>\n    <div class="body">\n      <p class="grey-msg">Are you sure you want to delete <strong><span class="version-seq"></span></strong>? This action can&rsquo;t be undone.</p>\n      <div class="m msT">\n        <button class="btn delete-version-button">Yes</button>&nbsp;&nbsp;\n      </div>\n    </div>\n  </div>\n  <div class="pull-left no-select">\n    <p style="padding-top: 8px;">\n      <strong class="version-name">Current Buffer</strong>\n      <span class="gray-text version-meta">(saved locally, editable)</span>\n      &nbsp;&nbsp;\n      <a class="fork-this-version"><i class="icon--grey cursor icon-flow-branch"></i></a>\n      <a class="show-version-timeline"><i class="icon--grey cursor icon-back-in-time"></i></a>\n      <a class="delete-active-version hide"><i class="icon--grey cursor icon-trash"></i></a>\n    </p>\n  </div>\n  <% } %>\n  <div class="pull-right">\n    <div class="inline large lines inverse pull-right msT msL">\n      <% if (showSave) { %>\n      <a href="javascript:;" class="cursor save-code no-select" id="save-code"><i class="icon-floppy icon--grey no-select"></i></a>\n      <% } %>\n      <% if (showFullScreen) { %>\n      <a class="restorefullscreen force-hide active-link no-select">\n          <i class="icon-resize-small-alt icon--grey no-select"></i></a>\n      <a class="fullscreen active-link no-select"\n         data-analytics="Switch to fullscreen"><i class="icon-resize-full-alt icon--grey no-select"></i></a>\n      <% } %>\n      <a class="hide" style="display:none;"></a>\n      <div style="position:relative; margin-left: 0px;">\n        <a class="cursor no-select" id="show-preferences"><i class="icon-cog icon--grey no-select"></i></a>\n        <div id="pref-pane"\n          style="position: absolute;right: -0.5em;top: 2em;z-index: 9;background: #fff;border: 1px solid #ddd;border-radius: 5px;padding: 10px;  width: 16em; display: none;">\n          <div style="position: absolute;width: 0;right: 0.8em;height: 0;border-left: 7px solid transparent;border-right: 7px solid transparent;border-bottom: 7px solid #ddd;top: -0.4em;"></div>\n          <label>Editor Mode</label>\n          <div class="btn-group msB no-select">\n            <a class="cursor emacs btn btn-white editor-mode-button no-select" data-editor="emacs">Emacs</a>\n            <a class="cursor default btn btn-white editor-mode-button no-select" data-editor="default">Normal</a>\n            <a class="cursor vim btn btn-white editor-mode-button no-select" data-editor="vim">Vim</a>\n          </div>\n          <% if (showTheme) { %>\n          <label>Editor Theme</label>\n          <select id="editor-theme">\n            <option value="light">Light</option>\n            <option value="dark">Dark</option>\n          </select>\n          <% } %>\n          <label>Tab Spaces</label>\n          <input id="tab-spaces" type="text" style="width: 4em;">\n          <% if (enableIntellisense) { %>\n            <label for="auto-complete">\n              <input id="auto-complete" type="checkbox" checked>\n              Auto Complete\n            </label>\n          <% } %>\n        </div>\n      </div>\n    </div>\n    <div class="pull-right">\n      <div class="dummy-lang-container hide"></div>\n      <select id="select-lang">\n       <% _.each(languages, function(l){ %>\n        <option value="<%=l%>"><%=lang_display_mapping[l]%></option>\n       <% }); %>\n      </select>\n    </div>\n    <div class="clearfix"></div>\n  </div>\n</div>\n<% if (enableVersioning) { %>\n<div class="version-timeline">\n  <div class="version-timeline-inner">\n    <div class="cross-line"></div>\n    <div class="start-slab pull-left"></div>\n    <% _.each (versionIds, function (version_id) { %>\n      <div class="version-ball pull-left cursor" data-version-id="<%= version_id %>"></div>\n    <% }); %>\n    <div class="current-version-ball green-bkg pull-left cursor"></div>\n  </div>\n</div>\n<% } %>',
bodyTemplate:'<div class="hr_tour-code-solution flex-row" style="display: flex;">\n  <% if (showFileTree) { %>\n  <div class="code-filetree">\n    <div id="filetree">\n    </div>\n  </div>\n  <% } %>\n  <div class="code-checker">\n    <div class="code-editors">\n      <% if (showNonEditableHeadTail){ %> <div class="code-head"> <textarea id="codeheadview" style="width:100%"/> </div> <%}%>\n      <% if (dynamicMode) { %> <div class="loading-mode" style="display:none">Loading Editor... </div> <% } %>\n      <div class="code-body"> <textarea id="codeview" style="width:100%"></textarea> </div>\n      <% if (showNonEditableHeadTail){ %> <div class="code-tail"> <textarea id="codetailview" style="width:100%"/> </div> <%}%>\n      <div class="clearfix"></div>\n    </div>\n    <div id="codeeditor-statusbar" class="clearfix psA codeeditor_statusbar">\n      <span id="statusbar-mode"></span>\n      <span><em id="status-text"><%-statusText%></em></span>\n      <div class="pull-right">\n        <span id="statusbar-line"></span>\n        <span id="statusbar-col"></span>\n        <span id="statusbar-count"></span>\n      </div>\n    </div>\n  </div>\n</div>',
footerTemplate:'<div class="clearfix mlT">\n  <div class="pull-right">\n    <% if (showCompileTest) { %>\n    <button class="btn bb-compile msR" data-analytics="Compile and Test"><%= compile_button_text %></button>\n    <% } %>\n    <% if (showSubmit) { %>\n    <button class="btn btn-primary bb-submit ans-submit" data-analytics="Submit Code"><%= submit_button_text %></button>\n    <% } %>\n  </div>\n  <div class="pull-left inline">\n      <% if(showUploadCode) { %>\n      <button class="btn btn-text upload_file" data-analytics="Upload File"><i class="icon-upload"></i>Upload Code as File</button>\n      <% } %>\n      <% if (showCustomInput) { %>\n      <div class="mlL mmT">\n          <label for="customtestcase"><input type="checkbox" id="customtestcase"><span class="lmT msL">Use a custom test case</span></label>\n          <textarea rows="5" id="custominput" style="display:none"></textarea>\n      </div>\n      <% } %>\n  </div>\n</div>',
_create:function() {
var e, that;
return this.ele_name = this.element.context.id, e = $(this.element), this.options = $.extend(this._options, this.options), 
this.current_code = e.html(), e.empty(), e.append(_.template(this.headerTemplate, this.options)), 
e.append(_.template(this.bodyTemplate, this.options)), e.append(_.template(this.footerTemplate, this.options)), 
that = this, this.codeEditor = this._initCodeEditor(e.find("textarea#codeview")[0]), 
this.options.showNonEditableHeadTail && (this.codeEditorHead = this._initCodeEditor(e.find("textarea#codeheadview")[0], !0), 
this.codeEditorTail = this._initCodeEditor(e.find("textarea#codetailview")[0], !0)), 
this.codeEditor.on("update", function() {
return that._updateStatusBar(that);
}), this.codeEditor.on("cursorActivity", function(e) {
return that._updateStatusPosition(e);
}), this.options.showNonEditableHeadTail && (this.codeEditorHead.on("cursorActivity", function(e) {
return that._updateStatusPosition(e);
}), this.codeEditorTail.on("cursorActivity", function(e) {
return that._updateStatusPosition(e);
})), this.codeEditor.on("change", function() {
return that._saveLangCode(that), that.options.showNonEditableHeadTail ? that._updateTailEditorLineNumber() :void 0;
}), this.codeEditor.on("viewportChange", function() {
return that._growEditor();
}), this.changeLanguage("cpp"), this.changeLanguage(e.find("#select-lang").select2("val")), 
this._shiftPressed = !1, this.options.enableIntellisense && this.codeEditor.on("keyup", function(cm, e) {
16 === e.keyCode && (that._shiftPressed = !1), 190 === e.keyCode && that._shiftPressed === !1 && that._enableIntellisenseFunc(cm);
}), this.options.enableIntellisense && this.codeEditor.on("keydown", function(cm, e) {
16 === e.keyCode && (that._shiftPressed = !0), that._autoCompleteReqestStatus === !0 && (that._autoCompleteReqestStatus = !1);
}), this.codeEditor.on("blur", function() {
return that._autoCompleteReqestStatus === !0 ? that._autoCompleteReqestStatus = !1 :void 0;
}), e.find("#select-lang").change(function(e) {
return that._changeLanguage(e, that);
}), e.find("#save-code").click(function(e) {
return that._saveCode(e, that);
}), e.find("#select-lang").on("select2-close", function() {
return setTimeout(function() {
return that._focusEditor(that);
}, 100);
}), e.find(".editor-mode-button").click(function(e) {
return that._setEditorMode(e, that), that._updateStatusBar(that);
}), e.find("button.bb-compile").click(function() {
var data;
return that.options.showFileTree ? (that._checkAndSave(null, null, that), data = {}) :(data = {
code:that.codeEditor.getValue(),
language:that.options.language
}, that.options.showCustomInput && $(that.element).find("#customtestcase").attr("checked") && (data.custominput = $(that.element).find("#custominput").val())), 
that._trigger("compile", {}, data);
}), e.find("button.bb-submit").click(function() {
var data;
return that.options.showFileTree ? (that._checkAndSave(null, null, that), data = {}) :(data = {
code:that.codeEditor.getValue(),
language:that.options.language
}, that.options.showCustomInput && $(that.element).find("#customtestcase").attr("checked") && (data.custominput = $(that.element).find("#custominput").val())), 
that._trigger("submit", {}, data);
}), e.find("#customtestcase").click(function() {
return $(that.element).find("#custominput").toggle(this.checked);
}), e.find("#show-preferences").click(function(_this) {
return function(ev) {
var $pref_pane;
return $pref_pane = e.find("#pref-pane"), "none" === $pref_pane.css("display") ? ($(ev.currentTarget).find("i").addClass("green-color"), 
$pref_pane.show(), _this.element.find("#tab-spaces").val(_this.codeEditor.options.tabSize)) :($(ev.currentTarget).find("i").removeClass("green-color"), 
$pref_pane.hide());
};
}(this)), e.find("#editor-theme").change(function(_this) {
return function(ev) {
return _this._changeTheme($(ev.currentTarget).val());
};
}(this)), e.find("#tab-spaces").keyup(function(_this) {
return function(ev) {
return _this._setTabSize($(ev.currentTarget).val());
};
}(this)), e.find(".fork-this-version").click(function(_this) {
return function(ev) {
var dialog_class;
return _this.options.versionIds && _this.options.versionIds.length < 20 ? (dialog_class = ".fork-dialog", 
void 0 === _this.ActiveVersionId || null === _this.ActiveVersionId ? e.find(".fork-dialog .version-seq").html("Current Buffer") :e.find(".fork-dialog .version-seq").html("Buffer #" + (_.indexOf(_this.options.versionIds, _this.ActiveVersionId) + 1))) :dialog_class = ".fork-limit-reached-dialog", 
"none" === _this.element.find(dialog_class).css("display") ? (_this.element.find(dialog_class).show(), 
$(ev.currentTarget).find("i").addClass("green-color")) :(_this.element.find(dialog_class).hide(), 
$(ev.currentTarget).find("i").removeClass("green-color"));
};
}(this)), e.find(".show-version-timeline").click(function(_this) {
return function(ev) {
return "none" === _this.element.find(".version-timeline").css("display") ? (_this.element.find(".version-timeline").show(), 
$(ev.currentTarget).find("i").addClass("green-color")) :(_this.element.find(".version-timeline").hide(), 
$(ev.currentTarget).find("i").removeClass("green-color"));
};
}(this)), this.options.enableIntellisense && this._initializeAutoComplete(), this._suggestionBoxDisplayStatus = !1, 
this._autoCompleteReqestStatus = !1, this._supportedLanguages = [ "java", "c", "cpp", "csharp", "ruby" ], 
this._bindVersionBall(), this._bindCurrentVersionBall(), e.find(".fork-version").click(function(_this) {
return function(ev) {
var forked_data;
return forked_data = "orphan" === $(ev.currentTarget).attr("data-action") ? {
code:that._getDefaultLangCode(that.options.language),
language:that.options.language
} :{
code:_this.codeEditor.getValue(),
language:_this.options.language
}, _this._forkNewBuffer(forked_data);
};
}(this)), e.find(".close-fork-dialog").click(function(_this) {
return function() {
return _this.element.find(".fork-dialog").hide(), _this.element.find(".fork-this-version").find("i").removeClass("green-color");
};
}(this)), e.find(".close-fork-limit-reached-dialog").click(function(_this) {
return function() {
return _this.element.find(".fork-limit-reached-dialog").hide(), _this.element.find(".fork-this-version").find("i").removeClass("green-color");
};
}(this)), e.find(".delete-active-version").click(function(_this) {
return function(ev) {
return $(ev.currentTarget).find("i").hasClass("green-color") ? ($(ev.currentTarget).find("i").removeClass("green-color"), 
e.find(".delete-version-dialog").hide()) :null !== _this.ActiveVersionId ? ($(ev.currentTarget).find("i").addClass("green-color"), 
e.find(".delete-version-dialog").find(".version-seq").html("Buffer #" + (_.indexOf(_this.options.versionIds, _this.ActiveVersionId) + 1)), 
e.find(".delete-version-dialog").show(), e.find(".delete-version-dialog").find(".delete-version-button").attr("data-version-id", _this.ActiveVersionId)) :void 0;
};
}(this)), e.find(".delete-version-button").click(function(_this) {
return function() {
var next_version_index, version_id;
return version_id = parseInt(e.find(".delete-version-button").attr("data-version-id")), 
next_version_index = _.indexOf(_this.options.versionIds, version_id), that = _this, 
$.ajax({
url:_this.options.versioningRestUrl,
type:"DELETE",
data:{
version_id:version_id
},
success:function() {
var $el;
return that.options.versionIds = _.reject(that.options.versionIds, function(num) {
return num === version_id;
}), that.element.find(".version-ball[data-version-id=" + version_id + "]").remove(), 
$el = next_version_index < that.options.versionIds.length ? that.element.find(".version-ball[data-version-id=" + that.options.versionIds[next_version_index] + "]") :that.element.find(".current-version-ball"), 
$el.click(), e.find(".delete-active-version").find("i").removeClass("green-color"), 
e.find(".delete-version-dialog").hide();
}
});
};
}(this)), null === e.find("#select-lang").val() && e.find("#select-lang").select2("val", this.options.languages[0]), 
e.find("#select-lang").trigger("change"), this._trigger("compile", {}, {}), this._changeTheme(), 
this._setTabSize(this.codeEditor.options.tabSize), this.options.showFileTree && (that.options.mime_lang_mapping = {}, 
_.each(that.options.lang_mime_mapping, function(i, v) {
return that.options.mime_lang_mapping[i] = v;
}), that = this, this.currentFile = null, this.fileTree = e.find("#filetree").jstree({
core:{
multiple:!1,
data:this.options.showFileTree.data,
check_callback:function(operation, node, node_parent, node_position) {
var cb;
switch (cb = function(node, node_id) {
var tree;
return null == node_id && (node_id = null), node ? (tree = $.jstree.reference("#filetree"), 
node_id && node.id !== node_id && tree.set_id(node, node_id), tree.refresh_node(node)) :void 0;
}, operation) {
case "create_node":
that.options.showFileTree.onCreate && that.options.showFileTree.onCreate(node, node_parent, cb);
break;

case "rename_node":
node.text !== node_position && that.options.showFileTree.onRename && that.options.showFileTree.onRename(node, node_parent, node_position, cb);
break;

case "delete_node":
that.options.showFileTree.onDelete && that.options.showFileTree.onDelete(node, node_parent, cb);
}
return !0;
}
},
types:{
file:{
icon:"jstree-file"
}
},
contextmenu:{
items:function(node) {
var tmp;
return tmp = $.jstree.defaults.contextmenu.items(), delete tmp.ccp, that.options.showFileTree.onRename || delete tmp.rename, 
that.options.showFileTree.onDelete || delete tmp.remove, that.options.showFileTree.onCreate ? (delete tmp.create.action, 
tmp.create.label = "New", tmp.create.submenu = {
create_folder:{
separator_after:!0,
label:"Folder",
action:function(data) {
var inst, obj;
return inst = $.jstree.reference(data.reference), obj = inst.get_node(data.reference), 
"file" === obj.type && (obj = inst.get_node(obj.parent)), inst.create_node(obj, {
id:Date.now().toString(36),
text:"New_Folder",
type:"default"
}, "last", function(new_node) {
return setTimeout(function() {
return inst.edit(new_node);
}, 0);
});
}
},
create_file:{
label:"File",
action:function(data) {
var inst, obj;
return inst = $.jstree.reference(data.reference), obj = inst.get_node(data.reference), 
"file" === obj.type && (obj = inst.get_node(obj.parent)), inst.create_node(obj, {
id:Date.now().toString(36),
text:"New_File",
type:"file"
}, "last", function(new_node) {
return setTimeout(function() {
return inst.edit(new_node);
}, 0);
});
}
}
}, this.get_type("file" === node) && delete tmp.create) :delete tmp.create, tmp;
}
},
plugins:[ "wholerow", "types", "contextmenu" ]
}).on("activate_node.jstree", function(e, treeObj) {
return that._checkAndSave(e, treeObj, that);
})), window.codeEditor = this.codeEditor;
},
_checkAndSave:function(_this) {
return function(e, treeObj, that) {
var currentValue;
return e = $(_this.element), treeObj ? "file" === treeObj.node.type ? (that._showLoading(), 
that.currentFile && !that.currentFile.original.readOnly && (currentValue = that.value(), 
that.currentFile.original.fileContents.code !== currentValue.code && (that.currentFile.original.fileContents = currentValue, 
that.options.showFileTree.onSave(that.currentFile))), treeObj.node.original.fileContents ? (that.currentFile = treeObj.node, 
that.setValue(treeObj.node.original.fileContents)) :that.options.showFileTree.fetch(treeObj, function(newTreeObj) {
var check_lang;
return check_lang = that.options.mime_lang_mapping[newTreeObj.node.original.fileContents.mime_type], 
newTreeObj.node.original.fileContents.language = check_lang ? check_lang :"text", 
newTreeObj.node.id !== $("#filetree").jstree("get_selected")[0] && that.currentFile ? void 0 :(that.currentFile = newTreeObj.node, 
that.setValue(newTreeObj.node.original.fileContents));
}), treeObj.node.original.readOnly ? that.codeEditor.setOption("readOnly", !0) :that.codeEditor.setOption("readOnly", !1)) :void 0 :(that.currentFile && !that.currentFile.original.readOnly && (currentValue = that.value(), 
that.currentFile.original.fileContents.code !== currentValue.code && (that.currentFile.original.fileContents = currentValue, 
that.options.showFileTree.onSave(that.currentFile))), void 0);
};
}(this),
_initializeAutoComplete:function() {
var e;
return e = $(this.element), "undefined" == typeof $.cookie("enableIntellisenseUserPref") ? (e.find("#auto-complete").prop("checked", !0), 
$.cookie("enableIntellisenseUserPref", "true")) :"true" === $.cookie("enableIntellisenseUserPref") ? e.find("#auto-complete").prop("checked", !0) :"false" === $.cookie("enableIntellisenseUserPref") ? e.find("#auto-complete").prop("checked", !1) :(e.find("#auto-complete").prop("checked", !0), 
$.cookie("enableIntellisenseUserPref", "true")), e.find("#auto-complete").click(function() {
return function() {
e.find("#auto-complete").is(":checked") ? $.cookie("enableIntellisenseUserPref", "true") :$.cookie("enableIntellisenseUserPref", "false");
};
}(this));
},
_copyToCurrentBuffer:function(data) {
var e, that;
return e = $(this.element), e.find(".version-ball").removeClass("green-bkg"), e.find(".version-name").html("Current Buffer"), 
e.find(".version-meta").html("(saved locally, editable)"), e.find(".current-version-ball").hasClass("green-bkg") || e.find(".current-version-ball").addClass("green-bkg"), 
this.versionGetXhr && void 0 === this.versionGetXhr.status && this.versionGetXhr.abort(), 
this._showLoading("Loading current buffer... "), this.codeEditor.setOption("readOnly", !1), 
this.setValue(data), this.ActiveVersionId = null, this.saveLangCode(), that = this, 
setTimeout(function() {
return that._hideLoading(), $(that.element).find(".dummy-lang-container").hide(), 
$(that.element).find("#select-lang").siblings(".select2-container").show(), that.element.find(".delete-active-version").hide(), 
that.ActiveVersionId = null;
}, 100);
},
_forkNewBuffer:function(forked_data) {
var data, e, that;
return null == forked_data && (forked_data = null), e = $(this.element), data = void 0 === this.ActiveVersionId || null === this.ActiveVersionId ? {
code:this.codeEditor.getValue(),
language:this.options.language
} :{
code:this._getLangCode(this.currentBufferLang),
language:this.currentBufferLang
}, this._showLoading("Saving previous buffer on cloud... "), this.element.find(".close-fork-dialog").click(), 
that = this, $.ajax({
url:this.options.versioningRestUrl,
type:"POST",
data:data,
success:function(data) {
return forked_data && that._copyToCurrentBuffer(forked_data), that._hideLoading(), 
"none" === e.find(".version-timeline").css("display") && e.find(".show-version-timeline").click(), 
e.find(".version-ball").removeClass("green-bkg"), e.find(".version-ball").hasClass("green-bkg") || e.find(".current-version-ball").addClass("green-bkg"), 
that._addNewVersion(data.id);
}
});
},
forkNewBuffer:function(data) {
var dialog_class, that;
return this.options.enableVersioning ? this.options.versionIds && this.options.versionIds.length < 20 ? (this._forkNewBuffer(data), 
that = this, setTimeout(function() {
return that.saveLangCode();
}, 0)) :(dialog_class = ".fork-limit-reached-dialog", "none" === this.element.find(dialog_class).css("display") ? (this.element.find(dialog_class).show(), 
this.element.find(".fork-this-version i").addClass("green-color")) :(this.element.find(dialog_class).hide(), 
this.element.find(".fork-this-version i").removeClass("green-color"))) :this.setValue(data);
},
_bindCurrentVersionBall:function() {
var e;
return e = $(this.element), e.find(".current-version-ball").click(function(_this) {
return function() {
var data;
return data = {
code:_this._getLangCode(_this.currentBufferLang || _this.options.language),
language:_this.currentBufferLang || _this.options.language
}, _this._copyToCurrentBuffer(data);
};
}(this));
},
_bindVersionBall:function() {
var e;
return e = $(this.element), e.find(".version-ball").unbind("click").click(function(_this) {
return function(ev) {
var that, version_id, version_seq;
return version_id = parseInt($(ev.currentTarget).attr("data-version-id")), version_seq = _.indexOf(_this.options.versionIds, version_id) + 1, 
e.find(".current-version-ball").hasClass("green-bkg") && (_this.currentBufferLang = _this.options.language, 
_this.saveLangCode()), _this.element.find(".delete-active-version").hide(), e.find(".version-name").html("Buffer #" + version_seq), 
e.find(".version-meta").html("(saved on cloud, read-only)"), e.find(".version-ball").removeClass("green-bkg"), 
e.find(".current-version-ball").removeClass("green-bkg"), $(ev.currentTarget).hasClass("green-bkg") || $(ev.currentTarget).addClass("green-bkg"), 
that = _this, _this._showLoading("Looking up cloud for buffer #" + version_seq + "... "), 
_this.versionGetXhr && void 0 === _this.versionGetXhr.status && _this.versionGetXhr.abort(), 
_this.versionGetXhr = $.ajax({
url:_this.options.versioningRestUrl,
type:"GET",
data:{
version_id:version_id
},
success:function(data) {
return that.setValue({
code:data.source,
language:data.language
}), that.codeEditor.setOption("readOnly", !0), $(that.element).find(".dummy-lang-container").html(that.options.lang_display_mapping[data.language]).show(), 
$(that.element).find("#select-lang").siblings(".select2-container").hide(), that._hideLoading(), 
that.ActiveVersionId = version_id, that.element.find(".delete-active-version").show();
}
});
};
}(this));
},
_addNewVersion:function(version_id) {
var prev;
return -1 === _.indexOf(this.options.versionIds, version_id) ? (this.options.versionIds.push(version_id), 
this.options.versionIds = _.sortBy(this.options.versionIds, function(num) {
return num;
}), prev = null, _.each(this.options.versionIds, function(version_id) {
var $el;
return 0 === this.element.find(".version-ball[data-version-id=" + version_id + "]").length && ($el = null !== prev ? this.element.find(".version-ball[data-version-id=" + prev + "]") :this.element.find(".start-slab"), 
$el.after("<div class='version-ball pull-left cursor' data-version-id='" + version_id + "'></div>"), 
this._bindVersionBall()), prev = version_id;
}, this)) :void 0;
},
_updateStatusBar:function() {
var modeText;
return modeText = function() {
switch (this.codeEditor.options.keyMap) {
case "vim":
return "--VIM--";

case "vim-insert":
return "-- INSERT --";

case "emacs":
return "EMACS";

case "emacs-Ctrl-X":
return "C-x-";

default:
return "";
}
}.call(this), $(this.element).find("#statusbar-mode").text(modeText);
},
_updateStatusPosition:function(e) {
var pos, start_line;
return pos = e.doc.getCursor(), start_line = e.getOption("firstLineNumber"), e = $(this.element), 
e.find("#statusbar-line").text("Line: " + (pos.line + start_line)), e.find("#statusbar-col").text("Col: " + (pos.ch + 1));
},
_getThemeName:function(slug) {
return "dark" === slug ? "ambiance" :"default";
},
_changeTheme:function(editor_theme) {
return null == editor_theme && (editor_theme = null), editor_theme || (editor_theme = $.cookie("hacker_editor_theme")), 
"dark" !== editor_theme && "light" !== editor_theme && (editor_theme = "light"), 
$.cookie("hacker_editor_theme", editor_theme), this.element.find("select#editor-theme option[value=" + editor_theme + "]").attr("selected", !0), 
this.codeEditor.setOption("theme", this._getThemeName(editor_theme)), this.codeEditor.refresh();
},
_setTabSize:function(size) {
return size = parseInt(size), _.isNumber(size) && !_.isNaN(size) && this.codeEditor.options.tabSize !== size ? (this._saveUserOpts({
tabSize:size,
indentUnit:size
}), this.codeEditor.setOption("tabSize", size), this.codeEditor.setOption("indentUnit", size)) :void 0;
},
_parseJson:function(data, customRendering) {
var retHintValues, that;
return retHintValues = [], that = this, $.each(data, function(index, data) {
var autoCompleteObject;
autoCompleteObject = {}, autoCompleteObject.text = data.completion, "" === data.type && (data.type = " "), 
autoCompleteObject.displayText = data.menu, autoCompleteObject.type = data.type, 
autoCompleteObject.completion = data.completion, autoCompleteObject.menu = data.menu, 
autoCompleteObject.info = data.info, customRendering === !0 && (autoCompleteObject.render = function(elt, self, data) {
var divCompletionText, divMenuText, divTypeText;
(" " === data.type || "" === data.type) && (data.type = "(" === data.completion[data.completion.length - 1] || ")" === data.completion[data.completion.length - 1] ? "f" :"v"), 
"(" === data.completion[data.completion.length - 1] && (data.completion += ")"), 
divTypeText = document.createElement("DIV"), divTypeText.className = "CodeMirror-hint-divTypeText", 
divTypeText.appendChild(document.createTextNode(data.type)), divCompletionText = document.createElement("DIV"), 
divCompletionText.className = "CodeMirror-hint-divCompletionText", divCompletionText.appendChild(document.createTextNode(" " + data.completion + " ")), 
divMenuText = document.createElement("DIV"), divMenuText.className = "CodeMirror-hint-divMenuText", 
divMenuText.appendChild(document.createTextNode(data.menu + " ")), elt.appendChild(divTypeText), 
elt.appendChild(divCompletionText), elt.appendChild(divMenuText), elt.style.display = "table-row";
}), retHintValues.push(autoCompleteObject);
}), retHintValues;
},
_updateLoadingMessage:function(cm, retHintValues) {
var noKeyPress, options;
noKeyPress = !0, options = {
completeSingle:!1,
hint:function(cm) {
var inner;
return noKeyPress === !0 ? noKeyPress = !1 :retHintValues = [], inner = {
from:cm.getCursor(),
to:cm.getCursor(),
list:[]
}, inner.list = retHintValues, inner;
}
}, CodeMirror.showHint(cm, options.hint, options);
},
_cleanToken:function(token) {
var charCode, iterateToken;
for (iterateToken = 0; iterateToken < token.length && (charCode = token.charCodeAt(iterateToken), 
!(charCode > 47 && 58 > charCode || charCode > 64 && 91 > charCode || charCode > 96 && 123 > charCode || "_" === token[iterateToken])); ) iterateToken++;
return token = token.substr(iterateToken);
},
_filterSuggestions:function(list, token) {
var found, iterateList, matched, ptrToken, ptrWord, word;
for (token = token.toLowerCase(), found = [], iterateList = 0; iterateList < list.length; ) {
for (word = list[iterateList].text.toLowerCase(), matched = 1, ptrWord = 0, ptrToken = 0; ptrToken < token.length; ) {
for (;word[ptrWord] !== token[ptrToken] && ptrWord < word.length; ) ptrWord++;
if (ptrWord === word.length) {
matched = 0;
break;
}
ptrToken++;
}
1 === matched && found.push(list[iterateList]), iterateList++;
}
return found;
},
_adjustHeightSuggestionBox:function(hints) {
var adjustTop, box, cm, ele, height, hintsTop, newTop, pos, winH, winW;
cm = this.codeEditor, pos = cm.cursorCoords(cm.getCursor()), winW = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth), 
winH = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight), 
box = hints.getBoundingClientRect(), ele = $("#CodeMirror-hint-infoDiv")[0], adjustTop = ele.offsetHeight, 
height = box.bottom + adjustTop - box.top, height > winH ? (hints.style.height = winH - 5 - adjustTop + "px", 
newTop = parseInt(hints.style.top.substr(0, hints.style.top.length - 2), 10), newTop += winH - 5 - adjustTop, 
$(ele).css("top", newTop + "px")) :(hintsTop = parseInt(hints.style.top.substr(0, hints.style.top.length - 2), 10), 
hintsTop < pos.top && hintsTop + (box.bottom - box.top) + adjustTop !== pos.top && (hints.style.top = pos.top - adjustTop - (box.bottom - box.top) + "px", 
newTop = pos.top - adjustTop, $(ele).css("top", newTop + "px")));
},
_adjustWidthSuggestionBox:function(hints) {
var box, cm, editor, editorOffset, pos;
cm = this.codeEditor, pos = cm.cursorCoords(cm.getCursor()), box = hints.getBoundingClientRect(), 
editor = $(cm.display.wrapper), editorOffset = editor.offset(), editor.width() > box.width ? editorOffset.left + editor.width() >= box.right ? hints.style.width = box.width :(hints.style.width = box.width, 
hints.style.left = pos.left - (box.right - (editorOffset.left + editor.width())) - 5 + "px") :(hints.style.left = editorOffset.left + "px", 
hints.style.width = editor.width() + "px");
},
_setMaxWidthCompletionText:function(hints) {
var curWidth, divCompletionText, iterateDivs, maxWidth, obj, startWidth;
if (divCompletionText = hints.getElementsByClassName("CodeMirror-hint-divCompletionText"), 
divCompletionText.length > 0) for (iterateDivs = divCompletionText.length - 1; iterateDivs >= 0; ) obj = divCompletionText[iterateDivs], 
maxWidth = void 0, startWidth = void 0, maxWidth = hints.style.width, maxWidth = parseInt(maxWidth.substr(0, maxWidth.length - 2)), 
curWidth = obj.offsetWidth, curWidth > maxWidth && (curWidth = maxWidth - 40, obj.style.maxWidth = curWidth + "px", 
obj.style.textOverflow = "ellipsis"), iterateDivs--;
},
_setMaxWidthMenuText:function(hints) {
var divMenuText, iterateDivs, obj, reqdWidth, startWidth;
if (divMenuText = hints.getElementsByClassName("CodeMirror-hint-divMenuText"), divMenuText.length > 0) for (iterateDivs = divMenuText.length - 1; iterateDivs >= 0; ) obj = divMenuText[iterateDivs], 
reqdWidth = hints.style.width, reqdWidth = parseInt(reqdWidth.substr(0, reqdWidth.length - 2)), 
startWidth = obj.offsetLeft, reqdWidth -= startWidth, obj.style.maxWidth = reqdWidth - 20 + "px", 
iterateDivs--;
},
_removeShowHintWidget:function(cm) {
this._updateSuggestions(cm, []);
},
_updateSuggestions:function(cm, retHintValues) {
var options, tempRetHintValues, that;
tempRetHintValues = retHintValues, that = this, options = {
completeSingle:!1,
hint:function(cm) {
var inner, token;
return retHintValues = tempRetHintValues, token = cm.getTokenAt(cm.getCursor()).string, 
token = that._cleanToken(token), token.length > 0 && (retHintValues = that._filterSuggestions(retHintValues, token)), 
inner = {
from:cm.getCursor(),
to:cm.getCursor(),
list:[]
}, inner.list = retHintValues, CodeMirror.on(inner, "shown", function() {
that._suggestionBoxDisplayStatus = !0;
}), CodeMirror.on(inner, "close", function() {
$("#CodeMirror-hint-infoDiv").remove(), that._suggestionBoxDisplayStatus = !1;
}), CodeMirror.on(inner, "select", function(completion, elt) {
var adjustTop, infoDiv, infoDivInfo, infoDivMenu;
that._adjustWidthSuggestionBox($(".CodeMirror-hints")[0]), that._setMaxWidthMenuText($(".CodeMirror-hints")[0]), 
that._setMaxWidthCompletionText($(".CodeMirror-hints")[0]), (completion.menu.length > 0 || completion.info.length > 0) && (completion.info === completion.menu && (completion.info = ""), 
$("#CodeMirror-hint-infoDiv").length > 0 ? ($("#CodeMirror-hint-infoDivMenu").text(completion.menu), 
$("#CodeMirror-hint-infoDivInfo").text(completion.info), $("#CodeMirror-hint-infoDiv").css("width", $(elt).parent().css("width")), 
$("#CodeMirror-hint-infoDiv").css("left", $(elt).parent().css("left")), adjustTop = parseInt($(elt).parent().css("top").substr(0, $(elt).parent().css("top").length - 2), 10), 
adjustTop += parseInt($(elt).parent().css("height").substr(0, $(elt).parent().css("height").length - 2), 10), 
$("#CodeMirror-hint-infoDiv").css("top", adjustTop + "px")) :(infoDiv = document.createElement("ul"), 
infoDiv.id = "CodeMirror-hint-infoDiv", $(elt.parentNode.parentNode).append($(infoDiv)), 
$(infoDiv).css("width", $(elt).parent().css("width")), $(infoDiv).css("left", $(elt).parent().css("left")), 
adjustTop = parseInt($(elt).parent().css("top").substr(0, $(elt).parent().css("top").length - 2), 10), 
adjustTop += parseInt($(elt).parent().css("height").substr(0, $(elt).parent().css("height").length - 2), 10), 
$(infoDiv).css("top", adjustTop + "px"), infoDivMenu = document.createElement("span"), 
infoDivMenu.id = "CodeMirror-hint-infoDivMenu", $(infoDivMenu).css("color", "blue"), 
$(infoDivMenu).text(completion.menu), infoDivInfo = document.createElement("span"), 
infoDivInfo.id = "CodeMirror-hint-infoDivInfo", $(infoDivInfo).css("color", "#D757FA"), 
$(infoDivInfo).css("margin-left", "10px"), $(infoDivInfo).text(completion.info), 
$(infoDiv).append($(infoDivMenu)), $(infoDiv).append($(infoDivInfo)))), that._adjustHeightSuggestionBox($(".CodeMirror-hints")[0]);
}), CodeMirror.on(inner, "pick", function() {
var startPoint, tempInnerEnd, tempInnerStart;
startPoint = inner.to.ch - token.length, tempInnerStart = {}, tempInnerStart.line = inner.from.line, 
tempInnerStart.ch = startPoint, tempInnerEnd = {}, tempInnerEnd.line = inner.to.line, 
tempInnerEnd.ch = inner.to.ch, cm.replaceRange("", tempInnerStart, tempInnerEnd);
}), inner;
}
}, CodeMirror.showHint(cm, options.hint, options);
},
_getLoadingData:function() {
var data;
return data = [], data.push({
type:"",
completion:"",
menu:"Loading hints...   ",
info:""
}), data;
},
_showAutoCompleteLoadingMsg:function(cm) {
var data, retHintValues;
data = this._getLoadingData(), retHintValues = this._parseJson(data, !1), this._updateLoadingMessage(cm, retHintValues);
},
_enableIntellisenseFunc:function(cm) {
var data, e, language, retHintValues, that;
return e = $(this.element), e.find("#auto-complete").prop("checked") !== !1 ? (language = this.options.language, 
__indexOf.call(this._supportedLanguages, language) >= 0 ? (this._autoCompleteReqestStatus = !0, 
data = this._getFullCodeOffsetLanguage(cm), retHintValues = [], that = this, $.ajax({
type:"POST",
url:"https://autocomplete.hackerrank.com/autocomplete",
data:data,
dataType:"json",
success:function(data) {
return data.msg ? (console.log("No suggestions obtained - error"), that._removeShowHintWidget(cm), 
void 0) :(that._autoCompleteReqestStatus === !0 && (retHintValues = that._parseJson(data, !0), 
that._updateSuggestions(cm, retHintValues)), void 0);
}
})) :(this._removeShowHintWidget(cm), void 0)) :void 0;
},
_getFullCodeOffsetLanguage:function(cm) {
var autoCompleteInfo, code, headCode, language, lineCh, lineNum, numHeadLines, offset, tailCode, token;
for (language = this.options.language, code = "", this.options.showNonEditableHeadTail === !0 && (headCode = this._getLangHeadCode(language), 
0 !== headCode.length && (code += headCode)), code += "\n", numHeadLines = code.split("\n").length, 
numHeadLines -= 1, offset = code.length, lineCh = cm.getCursor(), lineNum = 0; lineNum < lineCh.line; ) offset += cm.getLine(lineNum).length + 1, 
lineNum++;
return offset += lineCh.ch, code += cm.getValue(), code += "\n", this.options.showNonEditableHeadTail === !0 && (tailCode = this._getLangTailCode(language), 
0 !== tailCode.length && (code += tailCode)), code += "\n", token = cm.getTokenAt(lineCh).string, 
token = this._cleanToken(token), autoCompleteInfo = {
column:lineCh.ch + 1,
WantDocumentationForEveryCompletionResult:"false",
line:lineCh.line + 1 + numHeadLines,
wordToComplete:token,
code:code,
offset:offset,
fileType:language
};
},
_initCodeEditor:function(t, readOnly) {
var e, opts, sel, that, _ref;
return null == readOnly && (readOnly = !1), opts = this._getUserOpts(), e = $(this.element), 
e.find(".editor-mode-button[data-editor=" + opts.keyMap + "]").addClass("disabled"), 
sel = e.find("#select-lang"), sel.select2({
width:"off"
}), this._initAutoSave(), opts.userPreferredLang && (_ref = opts.userPreferredLang, 
__indexOf.call(this.options.languages, _ref) >= 0) ? (sel.select2("val", opts.userPreferredLang), 
opts.mode = this.options.lang_mime_mapping[opts.userPreferredLang]) :(sel.select2("val", this.options.language), 
opts.mode = this.options.lang_mime_mapping[this.options.language]), that = this, 
this.options.enableIntellisense && "emacs" !== opts.keyMap && (opts.extraKeys["Ctrl-Space"] = function(cm) {
that._showAutoCompleteLoadingMsg(cm), that._enableIntellisenseFunc(cm);
}), opts.readOnly = readOnly, CodeMirror.fromTextArea(t, opts);
},
_changeLanguage:function(e) {
return this.changeLanguage($(e.currentTarget).select2("val"));
},
changeLanguage:function(lang, cb) {
return null == cb && (cb = null), null !== lang ? (this.newLanguage = lang, this.options.dynamicMode ? (this._showLoading(), 
this._trigger("loadmode", {}, {
lang:lang,
callback:function(_this) {
return function() {
return _this._changeMode(cb);
};
}(this)
})) :this._changeMode(cb)) :void 0;
},
_showLoading:function(msg) {
return null == msg && (msg = "Loading Editor... "), $(this.element).find(".code-body, .code-head, .code-tail").hide(), 
$(this.element).find(".loading-mode").html(msg).show();
},
_hideLoading:function() {
return $(this.element).find(".code-body, .code-head, .code-tail").show(), $(this.element).find(".loading-mode").hide();
},
_changeMode:function(cb) {
var from, lang, sel;
return null == cb && (cb = null), this._hideLoading(), lang = this.newLanguage, 
from = this.options.language, this.options.language = lang, this.options.showFileTree || this.codeEditor.setValue(this._getLangCode(lang)), 
this._foldCode(), this.options.showNonEditableHeadTail && this._displayHeadAndTail(lang), 
this._saveUserOpts({
userPreferredLang:lang
}), this.codeEditor.setOption("mode", this.options.lang_mime_mapping[lang]), this.options.showNonEditableHeadTail === !1 && this._setMainEditorLineNumber(lang), 
sel = $(this.element).find("#select-lang"), sel.select2("val", lang), this.codeEditor.clearHistory(), 
this._trigger("languagechange", {}, {
from:from,
to:lang
}), null !== cb ? cb() :void 0;
},
_saveCode:function(e) {
return e.preventDefault(), this.options.onSave ? this.options.onSave() :void 0;
},
_initAutoSave:function() {
var callback, timeout;
return this.options.autoSave && this.options.onSave ? (timeout = parseInt(this.options.autoSave, 10), 
callback = this.options.onSave, this._autoSaveCode(timeout, callback)) :void 0;
},
_autoSaveCode:function(timeout, callback) {
return callback(), setInterval(this._autoSaveCode, timeout, timeout, callback);
},
_setEditorMode:function(e) {
var mode, that;
return mode = $(e.currentTarget).attr("data-editor"), $(e.currentTarget).parent().find(".editor-mode-button").removeClass("disabled"), 
$(e.currentTarget).addClass("disabled"), this.codeEditor.setOption("keyMap", mode), 
that = this, "emacs" === mode ? delete this.codeEditor.options.extraKeys["Ctrl-Space"] :this.codeEditor.options.extraKeys["Ctrl-Space"] = function(cm) {
that._showAutoCompleteLoadingMsg(cm), that._enableIntellisenseFunc(cm);
}, this._focusEditor(e), this._saveUserOpts({
keyMap:mode
});
},
_focusEditor:function() {
return this.codeEditor.focus();
},
_getDefaultLangCode:function(l) {
var body, head, tail, _stripTabs, _suffix_new_line;
if (this.options.showTemplate && !this.options.showNonEditableHeadTail) {
if (void 0 !== this.options.lang_head_template[l] || void 0 !== this.options.lang_body_template[l] || void 0 !== this.options.lang_tail_template[l] || void 0 !== this.options.lang_template[l]) return _stripTabs = function(string) {
var spaces, tab;
return spaces = new Array(4).join(" "), tab = "	", void 0 === string ? "" :string.split(tab).join(spaces);
}, _suffix_new_line = function(string) {
return string && -1 === string.indexOf("\n", string.length - 1) ? "" + string + "\n" :string;
}, head = _suffix_new_line(_stripTabs(this.options.lang_head_template[l] || "")), 
body = _suffix_new_line(_stripTabs(this.options.lang_template[l] || this.options.lang_body_template[l] || "")), 
tail = _suffix_new_line(_stripTabs(this.options.lang_tail_template[l] || "")), "" + head + body + tail;
} else if (this.options.lang_template[l] || this.options.lang_body_template[l] || this.options.lang_default_text[l]) return this.options.lang_template[l] || this.options.lang_body_template[l] || this.options.lang_default_text[l];
return "";
},
_getLangCode:function(l) {
var val;
return this.options.autoSaveNamespace && (val = $.jStorage.get(this.getCurrentAutosavekey(l)), 
val && !$.jStorage.get("" + this.getCurrentAutosavekey(l) + "-default_template")) ? val :this._getDefaultLangCode(l);
},
_getLangHeadCode:function(l) {
return this.options.lang_head_template[l] ? this.options.lang_head_template[l] :"";
},
_getLangTailCode:function(l) {
return this.options.lang_tail_template[l] ? this.options.lang_tail_template[l] :"";
},
_displayHeadAndTail:function(l) {
var e, head_editor_lines, head_height;
return e = $(this.element), 0 !== this._getLangHeadCode(l).length ? (this.codeEditorHead.setValue(this._getLangHeadCode(l)), 
head_editor_lines = this.codeEditorHead.getValue().split("\n").length, this.codeEditor.setOption("firstLineNumber", head_editor_lines + 1), 
this.codeEditorHead.setOption("mode", this.options.lang_mime_mapping[l])) :e.find(".code-head").hide(), 
0 !== this._getLangTailCode(l).length ? (this.codeEditorTail.setValue(this._getLangTailCode(l)), 
this._updateTailEditorLineNumber(), this.codeEditorTail.setOption("mode", this.options.lang_mime_mapping[l])) :e.find(".code-tail").hide(), 
head_height = e.find(".code-head").height(), e.find(".code-editors").scrollTop(head_height - 60);
},
_updateTailEditorLineNumber:function() {
var head_editor_lines, main_editor_lines;
return head_editor_lines = this.codeEditorHead.getValue().split("\n").length, main_editor_lines = this.codeEditor.getValue().split("\n").length, 
this.codeEditorTail.setOption("firstLineNumber", head_editor_lines + main_editor_lines + 1);
},
_setMainEditorLineNumber:function(l) {
return this.options.lang_line_nos && this.options.lang_line_nos[l] ? this.codeEditor.setOption("firstLineNumber", this.options.lang_line_nos[l]) :this.codeEditor.setOption("firstLineNumber", 1);
},
_growEditor:function() {
var main_editor_height;
return main_editor_height = this.element.find(".code-body").height(), 300 > main_editor_height && (main_editor_height = 300), 
this.element.find(".code-editors, #filetree").css("max-height", "" + (main_editor_height + 110) + "px"), 
this.options.showFileTree ? this.element.find("#filetree").css("max-height", "" + main_editor_height + "px") :void 0;
},
_saveLangCode:function() {
var d, saveObject, that;
return void 0 === this.ActiveVersionId || null === this.ActiveVersionId ? (d = new Date(), 
saveObject = "" + this.options.language + d.getHours() + d.getMinutes(), window[saveObject] && clearTimeout(window[saveObject]), 
that = this, window[saveObject] = setTimeout(function() {
return that.saveLangCode();
}, 3e3)) :void 0;
},
saveLangCode:function() {
var code, key, opts;
return void 0 !== this.ActiveVersionId && null !== this.ActiveVersionId || (opts = this.options, 
!opts.autoSaveNamespace || opts.lang_mime_mapping[opts.language] !== this.codeEditor.options.mode) ? void 0 :(key = this.getCurrentAutosavekey(), 
code = this.codeEditor.getValue(), $.jStorage.set("" + key + "-default_template", this._getDefaultLangCode(opts.language) === code || this.options.lang_default_text[opts.language] === code), 
$.jStorage.set(key, code));
},
getCurrentAutosavekey:function(l) {
var opts;
return null == l && (l = null), opts = this.options, null === l && (l = opts.language), 
opts.autoSaveNamespace && opts.language ? "" + opts.autoSaveNamespace + "-" + l :"";
},
_getUserOpts:function() {
var a, forced_opts;
return a = {
lineNumbers:!0,
lineWrapping:!0,
styleActiveLine:!0,
autoCloseBrackets:!0,
autoCloseTags:!0,
indentWithTabs:!1,
matchBrackets:!0,
keyMap:"default",
userPreferredLang:null,
indentUnit:4
}, forced_opts = {
extraKeys:{
Tab:function(cm) {
var characterAt, offset, spaces;
return characterAt = cm.coordsChar(cm.cursorCoords()).ch, offset = characterAt % cm.getOption("indentUnit"), 
spaces = Array(cm.getOption("indentUnit") + 1 - offset).join(" "), cm.replaceSelection(spaces, "end", "+input");
}
},
foldGutter:!0,
gutters:[ "CodeMirror-linenumbers", "CodeMirror-foldgutter" ]
}, $.extend($.extend(a, $.parseJSON($.jStorage.get("codeshellUserOpts"))), forced_opts);
},
_saveUserOpts:function(opts) {
var a;
return a = $.extend(this._getUserOpts(), opts), $.jStorage.set("codeshellUserOpts", JSON.stringify(a));
},
value:function(getall) {
var allCode;
return null == getall && (getall = !1), getall ? this.options.showFileTree ? (this._checkAndSave(null, null, this), 
{}) :(allCode = [], _.each(this.options.languages, function(_this) {
return function(lang) {
return lang === _this.options.language ? allCode.push(_this.value()) :allCode.push({
code:_this._getLangCode(lang),
language:lang
});
};
}(this)), allCode) :{
code:this.codeEditor.getValue(),
language:this.options.language
};
},
_foldCode:function() {
var added_head, added_tail, clbk_head, clbk_tail, code, line, line_ctr, lines, _i, _len, _results;
if (this.options.foldCode) {
for (code = this.codeEditor.getValue(), line_ctr = 0, added_head = !1, added_tail = !1, 
lines = (code || "").split("\n"), _results = [], _i = 0, _len = lines.length; _len > _i; _i++) line = lines[_i], 
line_ctr += 1, added_head || added_tail || -1 === line.indexOf("Head ends") || (clbk_head = function() {
return {
from:{
ch:0,
line:0
},
to:{
ch:0,
line:line_ctr
}
};
}, CodeMirror.newFoldFunction(clbk_head)(this.codeEditor, {}), added_head = !0), 
added_tail || -1 === line.indexOf("Tail starts") ? _results.push(void 0) :(clbk_tail = function() {
return {
from:{
ch:0,
line:line_ctr - 1
},
to:{
ch:0,
line:lines.length
}
};
}, CodeMirror.newFoldFunction(clbk_tail)(this.codeEditor, {}), _results.push(added_tail = !0));
return _results;
}
},
setValue:function(opts) {
return opts.language ? this.changeLanguage(opts.language, function(_this) {
return function() {
return opts.code ? (_this.codeEditor.setValue(opts.code), _this._foldCode()) :void 0;
};
}(this)) :void 0;
},
setValueorFork:function(opts) {
var that;
return that = this, opts.language && window.HR.forkable === !0 ? this.changeLanguage(opts.language, function() {
var _ref;
return opts.code ? ($.jStorage.get("" + that.getCurrentAutosavekey(opts.language)) && (_ref = that.value().code) !== opts.code && "" !== _ref && _ref !== that._getDefaultLangCode(opts.language) && _ref !== that.options.lang_default_text[opts.language] && window.HR.forkable === !0 && (window.HR.forkable = !1, 
that._forkNewBuffer(opts)), that.setValue(opts), that._foldCode()) :void 0;
}) :void 0;
},
refresh:function() {
return setTimeout(function(_this) {
return function() {
return _this.codeEditor.refresh();
};
}(this), 25), this.options.showNonEditableHeadTail ? (setTimeout(function(_this) {
return function() {
return _this.codeEditorHead.refresh();
};
}(this), 25), setTimeout(function(_this) {
return function() {
return _this.codeEditorTail.refresh();
};
}(this), 25)) :void 0;
},
onChange:function(callback) {
return null !== callback ? this.codeEditor.on("change", callback) :void 0;
},
setOption:function(key, value) {
return this.codeEditor.setOption(key, value);
},
getOptions:function() {
return this.options;
},
setStatusText:function(t) {
return null == t && (t = ""), this.options.statusText = t, $(this.element).find("#status-text").html(_.escape(t));
},
deleteLangCode:function() {
var key, opts;
return opts = this.options, opts.autoSaveNamespace && opts.lang_mime_mapping[opts.language] === this.codeEditor.options.mode ? (key = "" + opts.autoSaveNamespace + "-" + opts.language, 
$.jStorage.deleteKey(key)) :void 0;
},
enableCompileBtn:function() {
var $btn;
return $btn = $(this.element).find("button.bb-compile"), $btn.removeAttr("btn-disabled").removeClass("disabled");
},
getEditor:function() {
return this.codeEditor;
},
destroy:function() {
return this._saveLangCode(this), $.Widget.prototype.destroy.call(this);
}
});
});
}).call(this);