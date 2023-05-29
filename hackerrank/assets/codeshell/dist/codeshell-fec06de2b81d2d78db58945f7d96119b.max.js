(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  (function(widgetFactory) {
    if (typeof define === "function" && define.amd) {
      define("codeshell", ["jquery", "underscore", "codemirror/lib/codemirror", "select2", "json2", "jstorage", "jstree"], function($, _, cm) {
        widgetFactory(window.jQuery, window, _, cm);
      });
    } else {
      widgetFactory(window.jQuery, window, window._, window.CodeMirror);
    }
  })(function($, window, _, CodeMirror) {
    return $.widget("hr.codeshell", {
      options: {},
      _options: {
        showFileTree: false,
        enableIntellisense: false,
        showSave: false,
        showCustomInput: true,
        showCompileTest: true,
        showSubmit: false,
        showUploadCode: false,
        showFullScreen: false,
        statusText: "",
        showTheme: false,
        showNonEditableHeadTail: false,
        enableVersioning: false,
        versionIds: [],
        versioningRestUrl: "",
        foldCode: false,
        dynamicMode: false,
        languages: ["c", "cpp", "java", "csharp", "haskell", "php", "python", "perl", "ruby", "bash", "oracle", "mysql", "sql", "clojure", "scala", "code", "text", "brainfuck", "javascript", "d", "go", "lua", "erlang", "sbcl", "ocaml", "pascal", "python3", "groovy", "text_pseudo", "objectivec", "fsharp", "visualbasic", "cobol", "tsql", "lolcode", "smalltalk", "tcl", "html", "css", "java8", "db2", "octave", "r"],
        language: "c",
        showTemplate: true,
        autoSaveNamespace: null,
        onSave: null,
        autoSave: null,
        firstLineNumber: 1,
        initialCode: "",
        compile_button_text: "Run Code",
        submit_button_text: "Submit Code",
        lang_line_nos: {},
        lang_head_template: {},
        lang_body_template: {},
        lang_tail_template: {},
        lang_template: {},
        lang_mime_mapping: {
          c: "text/x-csrc",
          cpp: "text/x-c++src",
          java: "text/x-java",
          csharp: "text/x-csharp",
          haskell: "text/x-haskell",
          php: "text/x-php",
          python: "text/x-python",
          perl: "text/x-perl",
          ruby: "text/x-ruby",
          bash: "text/x-bash",
          oracle: "text/x-plsql",
          mysql: "text/x-plsql",
          tsql: "text/x-plsql",
          sql: "text/x-plsql",
          clojure: "text/x-scheme",
          scala: "text/x-scala",
          code: "text/plain",
          text: "text/plain",
          brainfuck: "text/plain",
          javascript: "text/javascript",
          d: "text/x-d",
          go: "text/x-go",
          lua: "text/x-lua",
          erlang: "text/x-erlang",
          sbcl: "text/x-common-lisp",
          ocaml: "text/x-ocaml",
          pascal: "text/x-pascal",
          python3: "text/x-python",
          groovy: "text/x-groovy",
          text_pseudo: "text/plain",
          objectivec: "text/x-csrc",
          fsharp: "text/x-fsharp",
          visualbasic: "text/x-vb",
          cobol: "text/x-cobol",
          smalltalk: "text/x-stsrc",
          tcl: "text/x-tcl",
          html: "text/html",
          css: "text/css",
          java8: "text/x-java",
          db2: "text/x-plsql",
          octave: "text/x-octave",
          r: "text/x-rsrc"
        },
        lang_display_mapping: {
          c: "C",
          cpp: "C++",
          java: "Java",
          csharp: "C#",
          haskell: "Haskell",
          php: "PHP",
          python: "Python 2",
          ruby: "Ruby",
          perl: "Perl",
          bash: "BASH",
          oracle: "Oracle",
          mysql: "MySQL",
          sql: "SQL",
          clojure: "Clojure",
          scala: "Scala",
          code: "Generic",
          text: "Plain Text",
          brainfuck: "Brainfuck",
          javascript: "Javascript",
          lua: "Lua",
          sbcl: "Lisp",
          erlang: "Erlang",
          go: "Go",
          d: "D",
          ocaml: "OCaml",
          pascal: "Pascal",
          python3: "Python 3",
          groovy: "Groovy",
          objectivec: "Objective C",
          text_pseudo: "Plain Text",
          fsharp: "F#",
          visualbasic: "VB.NET",
          cobol: "COBOL",
          tsql: "T-SQL",
          lolcode: "LOLCODE",
          smalltalk: "Smalltalk",
          tcl: "Tcl",
          whitespace: "Whitespace",
          css: "CSS",
          html: "HTML",
          java8: "Java 8",
          db2: "DB2",
          octave: "Octave",
          r: "R"
        },
        default_head_end: {
          c: "/* Head ends here */",
          cpp: "/* Head ends here */",
          java: "/* Head ends here */",
          csharp: "/* Head ends here */",
          haskell: "-- Head ends here",
          php: "/* Head ends here */",
          python: "# Head ends here",
          perl: "# Head ends here",
          ruby: "# Head ends here",
          bash: "# Head ends here",
          clojure: "; Head ends here",
          scala: "/* Head ends here */",
          sbcl: "; Head ends here",
          lua: "-- Head ends here",
          javascript: "/* Head ends here */",
          pascal: "{ Head ends here }",
          python3: "# Head ends here",
          groovy: "// Head ends here",
          objectivec: "// Head ends here",
          fsharp: "// Head ends here",
          visualbasic: "' Head ends here",
          cobol: "* Head ends here",
          lolcode: "BTW Head ends here",
          smalltalk: "\" Head ends here\"",
          tcl: "# Head ends here",
          whitespace: "Head ends here",
          html: "<!-- Head ends here -->",
          css: "/* Head ends here */",
          java8: "/* Head ends here */",
          db2: "/* Head ends here */",
          octave: "# Head ends here",
          r: "# Head ends here"
        },
        lang_fold_mapping: {
          c: "brace",
          cpp: "brace",
          java: "brace",
          csharp: "brace",
          haskell: "indent",
          php: "brace",
          python: "indent",
          ruby: "indent",
          perl: "brace",
          bash: "brace",
          oracle: "indent",
          mysql: "indent",
          sql: "indent",
          clojure: "indent",
          scala: "brace",
          code: "brace",
          text: "indent",
          brainfuck: "indent",
          javascript: "brace",
          lua: "indent",
          sbcl: "indent",
          erlang: "indent",
          go: "brace",
          d: "brace",
          ocaml: "indent",
          pascal: "indent",
          python3: "indent",
          groovy: "brace",
          objectivec: "brace",
          text_pseudo: "indent",
          fsharp: "indent",
          visualbasic: "indent",
          cobol: "indent",
          lolcode: "indent",
          smalltalk: "indent",
          tcl: "brace",
          whitespace: "indent",
          html: "tag",
          css: "brace",
          java8: "brace",
          db2: "indent",
          octave: "indent",
          r: "brace"
        },
        default_tail_start: {
          c: "/* Tail starts here */",
          cpp: "/* Tail starts here */",
          java: "/* Tail starts here */",
          csharp: "/* Tail starts here */",
          haskell: "-- Tail starts here",
          php: "/* Tail starts here */",
          python: "# Tail starts here",
          perl: "# Tail starts here",
          ruby: "# Tail starts here",
          bash: "# Tail starts here",
          clojure: "; Tail starts here",
          scala: "/* Tail starts here */",
          sbcl: "; Tail starts here",
          lua: "-- Tail starts here",
          javascript: "/* Tail starts here */",
          pascal: "{ Tail starts here }",
          python3: "# Tail starts here",
          groovy: "// Tail starts here",
          objectivec: "// Tail starts here",
          fsharp: "// Tail starts here",
          visualbasic: "' Tail starts here",
          cobol: "* Tail starts here",
          lolcode: "BTW Tail starts here",
          smalltalk: "\" Tail starts here\"",
          tcl: "# Tail starts here",
          whitespace: "Tail starts here",
          html: "<!-- Tail starts here -->",
          css: "/* Tails starts here */",
          java8: "/* Tail starts here */",
          db2: "/* Tail starts here */",
          octave: "# Tail starts here ",
          r: "# Tail starts here "
        },
        lang_default_text: {
          c: "#include <stdio.h>\n#include <string.h>\n#include <math.h>\n#include <stdlib.h>\n\nint main() {\n\n    /* Enter your code here. Read input from STDIN. Print output to STDOUT */    \n    return 0;\n}\n",
          cpp: "#include <cmath>\n#include <cstdio>\n#include <vector>\n#include <iostream>\n#include <algorithm>\nusing namespace std;\n\n\nint main() {\n    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   \n    return 0;\n}\n",
          java: "import java.io.*;\nimport java.util.*;\nimport java.text.*;\nimport java.math.*;\nimport java.util.regex.*;\n\npublic class Solution {\n\n    public static void main(String[] args) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */\n    }\n}",
          csharp: "using System;\nusing System.Collections.Generic;\nusing System.IO;\nclass Solution {\n    static void Main(String[] args) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution */\n    }\n}",
          php: "<?php\n$_fp = fopen(\"php://stdin\", \"r\");\n/* Enter your code here. Read input from STDIN. Print output to STDOUT */\n\n?>",
          ruby: "# Enter your code here. Read input from STDIN. Print output to STDOUT",
          python: "# Enter your code here. Read input from STDIN. Print output to STDOUT",
          perl: "# Enter your code here. Read input from STDIN. Print output to STDOUT",
          haskell: "-- Enter your code here. Read input from STDIN. Print output to STDOUT",
          clojure: "; Enter your code here. Read input from STDIN. Print output to STDOUT\n;",
          lua: "-- Enter your code here. Read input from STDIN. Print output to STDOUT",
          sbcl: ";; Enter your code here. Read input from STDIN. Print output to STDOUT",
          erlang: "% Enter your code here. Read input from STDIN. Print output to STDOUT\n% Your class should be named solution\n\n-module(solution).\n-export([main/0]).\n\nmain() ->\n\t.\n",
          scala: "object Solution {\n\n    def main(args: Array[String]) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution\n*/\n    }\n}",
          go: "package main\nimport \"fmt\"\n\nfunc main() {\n //Enter your code here. Read input from STDIN. Print output to STDOUT\n}",
          javascript: "function processData(input) {\n    //Enter your code here\n} \n\nprocess.stdin.resume();\nprocess.stdin.setEncoding(\"ascii\");\n_input = \"\";\nprocess.stdin.on(\"data\", function (input) {\n    _input += input;\n});\n\nprocess.stdin.on(\"end\", function () {\n   processData(_input);\n});\n",
          d: "/* Enter your code here. Read input from STDIN. Print output to STDOUT */",
          ocaml: "(* Enter your code here. Read input from STDIN. Print output to STDOUT *)",
          pascal: "(* Enter your code here. Read input from STDIN. Print output to STDOUT *)",
          groovy: "//Enter your code here. Read input from STDIN. Print output to STDOUT",
          text: "",
          objectivec: "//Enter your code here. Read input from STDIN. Print output to STDOUT",
          fsharp: "//Enter your code here. Read input from STDIN. Print output to STDOUT",
          visualbasic: "'Enter your code here. Read input from STDIN. Print output to STDOUT",
          cobol: "*Enter your code here. Read input from STDIN. Print output to STDOUT",
          lolcode: "BTW Enter your code here. Read input from STDIN. Print output to STDOUT",
          smalltalk: "\"Enter your code here. Read input from STDIN. Print output to STDOUT\"",
          tcl: "# Enter your code here. Read input from STDIN. Print output to STDOUT",
          whitespace: "Enter your code here. Read input from STDIN. Print output to STDOUT",
          html: "<!-- Enter your code here -->",
          css: "/* Enter your code here*/",
          java8: "import java.io.*;\nimport java.util.*;\n\npublic class Solution {\n\n    public static void main(String[] args) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */\n    }\n}",
          octave: "# Enter your code here. Read input from STDIN. Print output to STDOUT",
          r: "# Enter your code here. Read input from STDIN. Print output to STDOUT"
        }
      },
      headerTemplate: '<div class="clearfix grey-header cap plL plR psT psB" style="position: relative;">\n  <% if (enableVersioning) { %>\n  <div class="fork-dialog cs-dialog hide">\n    <div class="header">Fork <span class="version-seq"></span></div>\n    <div class="body">\n      <p class="grey-msg">past buffers are marked read only, you wont be able to edit your current buffer without forking it</p>\n      <div class="m msT">\n        <button class="btn close-fork-dialog">Cancel</button>&nbsp;&nbsp;\n        <button class="btn btn-primary fork-version" data-action="fork">Fork <span class="version-seq"></span></button>&nbsp;&nbsp;\n        <button class="btn btn-primary fork-version" data-action="orphan">Create New Buffer</button>\n      </div>\n    </div>\n  </div>\n  <div class="fork-limit-reached-dialog cs-dialog hide">\n    <div class="header">Fork Limit Reached</div>\n    <div class="body">\n      <p class="grey-msg">You can&rsquo;t create more than 20 buffers, please delete one of your old bufferes to create a new buffer.</p>\n      <div class="m msT">\n        <button class="btn close-fork-limit-reached-dialog">OK</button>&nbsp;&nbsp;\n      </div>\n    </div>\n  </div>\n  <div class="delete-version-dialog cs-dialog hide">\n    <div class="header">Delete <span class="version-seq"></span></div>\n    <div class="body">\n      <p class="grey-msg">Are you sure you want to delete <strong><span class="version-seq"></span></strong>? This action can&rsquo;t be undone.</p>\n      <div class="m msT">\n        <button class="btn delete-version-button">Yes</button>&nbsp;&nbsp;\n      </div>\n    </div>\n  </div>\n  <div class="pull-left no-select">\n    <p style="padding-top: 8px;">\n      <strong class="version-name">Current Buffer</strong>\n      <span class="gray-text version-meta">(saved locally, editable)</span>\n      &nbsp;&nbsp;\n      <a class="fork-this-version"><i class="icon--grey cursor icon-flow-branch"></i></a>\n      <a class="show-version-timeline"><i class="icon--grey cursor icon-back-in-time"></i></a>\n      <a class="delete-active-version hide"><i class="icon--grey cursor icon-trash"></i></a>\n    </p>\n  </div>\n  <% } %>\n  <div class="pull-right">\n    <div class="inline large lines inverse pull-right msT msL">\n      <% if (showSave) { %>\n      <a href="javascript:;" class="cursor save-code no-select" id="save-code"><i class="icon-floppy icon--grey no-select"></i></a>\n      <% } %>\n      <% if (showFullScreen) { %>\n      <a class="restorefullscreen force-hide active-link no-select">\n          <i class="icon-resize-small-alt icon--grey no-select"></i></a>\n      <a class="fullscreen active-link no-select"\n         data-analytics="Switch to fullscreen"><i class="icon-resize-full-alt icon--grey no-select"></i></a>\n      <% } %>\n      <a class="hide" style="display:none;"></a>\n      <div style="position:relative; margin-left: 0px;">\n        <a class="cursor no-select" id="show-preferences"><i class="icon-cog icon--grey no-select"></i></a>\n        <div id="pref-pane"\n          style="position: absolute;right: -0.5em;top: 2em;z-index: 9;background: #fff;border: 1px solid #ddd;border-radius: 5px;padding: 10px;  width: 16em; display: none;">\n          <div style="position: absolute;width: 0;right: 0.8em;height: 0;border-left: 7px solid transparent;border-right: 7px solid transparent;border-bottom: 7px solid #ddd;top: -0.4em;"></div>\n          <label>Editor Mode</label>\n          <div class="btn-group msB no-select">\n            <a class="cursor emacs btn btn-white editor-mode-button no-select" data-editor="emacs">Emacs</a>\n            <a class="cursor default btn btn-white editor-mode-button no-select" data-editor="default">Normal</a>\n            <a class="cursor vim btn btn-white editor-mode-button no-select" data-editor="vim">Vim</a>\n          </div>\n          <% if (showTheme) { %>\n          <label>Editor Theme</label>\n          <select id="editor-theme">\n            <option value="light">Light</option>\n            <option value="dark">Dark</option>\n          </select>\n          <% } %>\n          <label>Tab Spaces</label>\n          <input id="tab-spaces" type="text" style="width: 4em;">\n          <% if (enableIntellisense) { %>\n            <label for="auto-complete">\n              <input id="auto-complete" type="checkbox" checked>\n              Auto Complete\n            </label>\n          <% } %>\n        </div>\n      </div>\n    </div>\n    <div class="pull-right">\n      <div class="dummy-lang-container hide"></div>\n      <select id="select-lang">\n       <% _.each(languages, function(l){ %>\n        <option value="<%=l%>"><%=lang_display_mapping[l]%></option>\n       <% }); %>\n      </select>\n    </div>\n    <div class="clearfix"></div>\n  </div>\n</div>\n<% if (enableVersioning) { %>\n<div class="version-timeline">\n  <div class="version-timeline-inner">\n    <div class="cross-line"></div>\n    <div class="start-slab pull-left"></div>\n    <% _.each (versionIds, function (version_id) { %>\n      <div class="version-ball pull-left cursor" data-version-id="<%= version_id %>"></div>\n    <% }); %>\n    <div class="current-version-ball green-bkg pull-left cursor"></div>\n  </div>\n</div>\n<% } %>',
      bodyTemplate: '<div class="hr_tour-code-solution flex-row" style="display: flex;">\n  <% if (showFileTree) { %>\n  <div class="code-filetree">\n    <div id="filetree">\n    </div>\n  </div>\n  <% } %>\n  <div class="code-checker">\n    <div class="code-editors">\n      <% if (showNonEditableHeadTail){ %> <div class="code-head"> <textarea id="codeheadview" style="width:100%"/> </div> <%}%>\n      <% if (dynamicMode) { %> <div class="loading-mode" style="display:none">Loading Editor... </div> <% } %>\n      <div class="code-body"> <textarea id="codeview" style="width:100%"></textarea> </div>\n      <% if (showNonEditableHeadTail){ %> <div class="code-tail"> <textarea id="codetailview" style="width:100%"/> </div> <%}%>\n      <div class="clearfix"></div>\n    </div>\n    <div id="codeeditor-statusbar" class="clearfix psA codeeditor_statusbar">\n      <span id="statusbar-mode"></span>\n      <span><em id="status-text"><%-statusText%></em></span>\n      <div class="pull-right">\n        <span id="statusbar-line"></span>\n        <span id="statusbar-col"></span>\n        <span id="statusbar-count"></span>\n      </div>\n    </div>\n  </div>\n</div>',
      footerTemplate: '<div class="clearfix mlT">\n  <div class="pull-right">\n    <% if (showCompileTest) { %>\n    <button class="btn bb-compile msR" data-analytics="Compile and Test"><%= compile_button_text %></button>\n    <% } %>\n    <% if (showSubmit) { %>\n    <button class="btn btn-primary bb-submit ans-submit" data-analytics="Submit Code"><%= submit_button_text %></button>\n    <% } %>\n  </div>\n  <div class="pull-left inline">\n      <% if(showUploadCode) { %>\n      <button class="btn btn-text upload_file" data-analytics="Upload File"><i class="icon-upload"></i>Upload Code as File</button>\n      <% } %>\n      <% if (showCustomInput) { %>\n      <div class="mlL mmT">\n          <label for="customtestcase"><input type="checkbox" id="customtestcase"><span class="lmT msL">Use a custom test case</span></label>\n          <textarea rows="5" id="custominput" style="display:none"></textarea>\n      </div>\n      <% } %>\n  </div>\n</div>',
      _create: function() {
        var e, that;
        this.ele_name = this.element.context.id;
        e = $(this.element);
        this.options = $.extend(this._options, this.options);
        this.current_code = e.html();
        e.empty();
        e.append(_.template(this.headerTemplate, this.options));
        e.append(_.template(this.bodyTemplate, this.options));
        e.append(_.template(this.footerTemplate, this.options));
        that = this;
        this.codeEditor = this._initCodeEditor(e.find("textarea#codeview")[0]);
        if (this.options.showNonEditableHeadTail) {
          this.codeEditorHead = this._initCodeEditor(e.find("textarea#codeheadview")[0], true);
          this.codeEditorTail = this._initCodeEditor(e.find("textarea#codetailview")[0], true);
        }
        this.codeEditor.on("update", function(e) {
          return that._updateStatusBar(that);
        });
        this.codeEditor.on("cursorActivity", function(e) {
          return that._updateStatusPosition(e);
        });
        if (this.options.showNonEditableHeadTail) {
          this.codeEditorHead.on("cursorActivity", function(e) {
            return that._updateStatusPosition(e);
          });
          this.codeEditorTail.on("cursorActivity", function(e) {
            return that._updateStatusPosition(e);
          });
        }
        this.codeEditor.on("change", function(e) {
          that._saveLangCode(that);
          if (that.options.showNonEditableHeadTail) {
            return that._updateTailEditorLineNumber();
          }
        });
        this.codeEditor.on("viewportChange", function(e) {
          return that._growEditor();
        });
        this.changeLanguage("cpp");
        this.changeLanguage(e.find("#select-lang").select2("val"));
        this._shiftPressed = false;
        if (this.options.enableIntellisense) {
          this.codeEditor.on("keyup", function(cm, e) {
            if (e.keyCode === 16) {
              that._shiftPressed = false;
            }
            if (e.keyCode === 190 && that._shiftPressed === false) {
              that._enableIntellisenseFunc(cm);
            }
          });
        }
        if (this.options.enableIntellisense) {
          this.codeEditor.on("keydown", function(cm, e) {
            if (e.keyCode === 16) {
              that._shiftPressed = true;
            }
            if (that._autoCompleteReqestStatus === true) {
              that._autoCompleteReqestStatus = false;
            }
          });
        }
        this.codeEditor.on("blur", function() {
          if (that._autoCompleteReqestStatus === true) {
            return that._autoCompleteReqestStatus = false;
          }
        });
        e.find("#select-lang").change(function(e) {
          return that._changeLanguage(e, that);
        });
        e.find("#save-code").click(function(e) {
          return that._saveCode(e, that);
        });
        e.find("#select-lang").on("select2-close", function(e) {
          return setTimeout(function() {
            return that._focusEditor(that);
          }, 100);
        });
        e.find(".editor-mode-button").click(function(e) {
          that._setEditorMode(e, that);
          return that._updateStatusBar(that);
        });
        e.find("button.bb-compile").click(function(e) {
          var data;
          if (that.options.showFileTree) {
            that._checkAndSave(null, null, that);
            data = {};
          } else {
            data = {
              code: that.codeEditor.getValue(),
              language: that.options.language
            };
            if (that.options.showCustomInput && $(that.element).find("#customtestcase").attr("checked")) {
              data["custominput"] = $(that.element).find("#custominput").val();
            }
          }
          return that._trigger("compile", {}, data);
        });
        e.find("button.bb-submit").click(function(e) {
          var data;
          if (that.options.showFileTree) {
            that._checkAndSave(null, null, that);
            data = {};
          } else {
            data = {
              code: that.codeEditor.getValue(),
              language: that.options.language
            };
            if (that.options.showCustomInput && $(that.element).find("#customtestcase").attr("checked")) {
              data["custominput"] = $(that.element).find("#custominput").val();
            }
          }
          return that._trigger("submit", {}, data);
        });
        e.find("#customtestcase").click(function(e) {
          return $(that.element).find("#custominput").toggle(this.checked);
        });
        e.find("#show-preferences").click((function(_this) {
          return function(ev) {
            var $pref_pane;
            $pref_pane = e.find("#pref-pane");
            if ($pref_pane.css("display") === "none") {
              $(ev.currentTarget).find("i").addClass("green-color");
              $pref_pane.show();
              return _this.element.find("#tab-spaces").val(_this.codeEditor.options.tabSize);
            } else {
              $(ev.currentTarget).find("i").removeClass("green-color");
              return $pref_pane.hide();
            }
          };
        })(this));
        e.find("#editor-theme").change((function(_this) {
          return function(ev) {
            return _this._changeTheme($(ev.currentTarget).val());
          };
        })(this));
        e.find("#tab-spaces").keyup((function(_this) {
          return function(ev) {
            return _this._setTabSize($(ev.currentTarget).val());
          };
        })(this));
        e.find(".fork-this-version").click((function(_this) {
          return function(ev) {
            var dialog_class;
            if (_this.options.versionIds && _this.options.versionIds.length < 20) {
              dialog_class = ".fork-dialog";
              if (_this.ActiveVersionId === void 0 || _this.ActiveVersionId === null) {
                e.find(".fork-dialog .version-seq").html("Current Buffer");
              } else {
                e.find(".fork-dialog .version-seq").html("Buffer #" + (_.indexOf(_this.options.versionIds, _this.ActiveVersionId) + 1));
              }
            } else {
              dialog_class = ".fork-limit-reached-dialog";
            }
            if (_this.element.find(dialog_class).css("display") === "none") {
              _this.element.find(dialog_class).show();
              return $(ev.currentTarget).find("i").addClass("green-color");
            } else {
              _this.element.find(dialog_class).hide();
              return $(ev.currentTarget).find("i").removeClass("green-color");
            }
          };
        })(this));
        e.find(".show-version-timeline").click((function(_this) {
          return function(ev) {
            if (_this.element.find(".version-timeline").css("display") === "none") {
              _this.element.find(".version-timeline").show();
              return $(ev.currentTarget).find("i").addClass("green-color");
            } else {
              _this.element.find(".version-timeline").hide();
              return $(ev.currentTarget).find("i").removeClass("green-color");
            }
          };
        })(this));
        if (this.options.enableIntellisense) {
          this._initializeAutoComplete();
        }
        this._suggestionBoxDisplayStatus = false;
        this._autoCompleteReqestStatus = false;
        this._supportedLanguages = ["java", "c", "cpp", "csharp", "ruby"];
        this._bindVersionBall();
        this._bindCurrentVersionBall();
        e.find(".fork-version").click((function(_this) {
          return function(ev) {
            var forked_data;
            if ($(ev.currentTarget).attr("data-action") === "orphan") {
              forked_data = {
                code: that._getDefaultLangCode(that.options.language),
                language: that.options.language
              };
            } else {
              forked_data = {
                code: _this.codeEditor.getValue(),
                language: _this.options.language
              };
            }
            return _this._forkNewBuffer(forked_data);
          };
        })(this));
        e.find(".close-fork-dialog").click((function(_this) {
          return function(ev) {
            _this.element.find(".fork-dialog").hide();
            return _this.element.find(".fork-this-version").find("i").removeClass("green-color");
          };
        })(this));
        e.find(".close-fork-limit-reached-dialog").click((function(_this) {
          return function(ev) {
            _this.element.find(".fork-limit-reached-dialog").hide();
            return _this.element.find(".fork-this-version").find("i").removeClass("green-color");
          };
        })(this));
        e.find(".delete-active-version").click((function(_this) {
          return function(ev) {
            if (!$(ev.currentTarget).find("i").hasClass("green-color")) {
              if (_this.ActiveVersionId !== null) {
                $(ev.currentTarget).find("i").addClass("green-color");
                e.find(".delete-version-dialog").find(".version-seq").html("Buffer #" + (_.indexOf(_this.options.versionIds, _this.ActiveVersionId) + 1));
                e.find(".delete-version-dialog").show();
                return e.find(".delete-version-dialog").find(".delete-version-button").attr("data-version-id", _this.ActiveVersionId);
              }
            } else {
              $(ev.currentTarget).find("i").removeClass("green-color");
              return e.find(".delete-version-dialog").hide();
            }
          };
        })(this));
        e.find(".delete-version-button").click((function(_this) {
          return function(ev) {
            var next_version_index, version_id;
            version_id = parseInt(e.find(".delete-version-button").attr("data-version-id"));
            next_version_index = _.indexOf(_this.options.versionIds, version_id);
            that = _this;
            return $.ajax({
              url: _this.options.versioningRestUrl,
              type: "DELETE",
              data: {
                version_id: version_id
              },
              success: function(data) {
                var $el;
                that.options.versionIds = _.reject(that.options.versionIds, function(num) {
                  return num === version_id;
                });
                that.element.find(".version-ball[data-version-id=" + version_id + "]").remove();
                if (next_version_index < that.options.versionIds.length) {
                  $el = that.element.find(".version-ball[data-version-id=" + that.options.versionIds[next_version_index] + "]");
                } else {
                  $el = that.element.find(".current-version-ball");
                }
                $el.click();
                e.find(".delete-active-version").find("i").removeClass("green-color");
                return e.find(".delete-version-dialog").hide();
              }
            });
          };
        })(this));
        if (e.find("#select-lang").val() === null) {
          e.find("#select-lang").select2("val", this.options.languages[0]);
        }
        e.find("#select-lang").trigger("change");
        this._trigger("compile", {}, {});
        this._changeTheme();
        this._setTabSize(this.codeEditor.options.tabSize);
        if (this.options.showFileTree) {
          that.options.mime_lang_mapping = {};
          _.each(that.options.lang_mime_mapping, function(i, v) {
            return that.options.mime_lang_mapping[i] = v;
          });
          that = this;
          this.currentFile = null;
          this.fileTree = e.find('#filetree').jstree({
            core: {
              multiple: false,
              data: this.options.showFileTree.data,
              check_callback: function(operation, node, node_parent, node_position, more) {
                var cb;
                cb = function(node, node_id) {
                  var tree;
                  if (node_id == null) {
                    node_id = null;
                  }
                  if (node) {
                    tree = $.jstree.reference("#filetree");
                    if (node_id && !(node.id === node_id)) {
                      tree.set_id(node, node_id);
                    }
                    return tree.refresh_node(node);
                  }
                };
                switch (operation) {
                  case "create_node":
                    if (that.options.showFileTree.onCreate) {
                      that.options.showFileTree.onCreate(node, node_parent, cb);
                    }
                    break;
                  case "rename_node":
                    if (node.text !== node_position) {
                      if (that.options.showFileTree.onRename) {
                        that.options.showFileTree.onRename(node, node_parent, node_position, cb);
                      }
                    }
                    break;
                  case "delete_node":
                    if (that.options.showFileTree.onDelete) {
                      that.options.showFileTree.onDelete(node, node_parent, cb);
                    }
                }
                return true;
              }
            },
            types: {
              file: {
                icon: 'jstree-file'
              }
            },
            contextmenu: {
              items: function(node) {
                var tmp;
                tmp = $.jstree.defaults.contextmenu.items();
                delete tmp.ccp;
                if (!that.options.showFileTree.onRename) {
                  delete tmp.rename;
                }
                if (!that.options.showFileTree.onDelete) {
                  delete tmp.remove;
                }
                if (that.options.showFileTree.onCreate) {
                  delete tmp.create.action;
                  tmp.create.label = "New";
                  tmp.create.submenu = {
                    create_folder: {
                      separator_after: true,
                      label: "Folder",
                      action: function(data) {
                        var inst, obj;
                        inst = $.jstree.reference(data.reference);
                        obj = inst.get_node(data.reference);
                        if (obj.type === 'file') {
                          obj = inst.get_node(obj.parent);
                        }
                        return inst.create_node(obj, {
                          id: Date.now().toString(36),
                          text: "New_Folder",
                          type: "default"
                        }, "last", function(new_node) {
                          return setTimeout(function() {
                            return inst.edit(new_node);
                          }, 0);
                        });
                      }
                    },
                    create_file: {
                      label: "File",
                      action: function(data) {
                        var inst, obj;
                        inst = $.jstree.reference(data.reference);
                        obj = inst.get_node(data.reference);
                        if (obj.type === 'file') {
                          obj = inst.get_node(obj.parent);
                        }
                        return inst.create_node(obj, {
                          id: Date.now().toString(36),
                          text: "New_File",
                          type: "file"
                        }, "last", function(new_node) {
                          return setTimeout(function() {
                            return inst.edit(new_node);
                          }, 0);
                        });
                      }
                    }
                  };
                  if (this.get_type(node === 'file')) {
                    delete tmp.create;
                  }
                } else {
                  delete tmp.create;
                }
                return tmp;
              }
            },
            plugins: ["wholerow", "types", "contextmenu"]
          }).on('activate_node.jstree', function(e, treeObj) {
            return that._checkAndSave(e, treeObj, that);
          });
        }
        return window.codeEditor = this.codeEditor;
      },
      _checkAndSave: (function(_this) {
        return function(e, treeObj, that) {
          var currentValue;
          e = $(_this.element);
          if (!treeObj) {
            if (that.currentFile && !that.currentFile.original.readOnly) {
              currentValue = that.value();
              if (that.currentFile.original.fileContents.code !== currentValue.code) {
                that.currentFile.original.fileContents = currentValue;
                that.options.showFileTree.onSave(that.currentFile);
              }
            }
            return;
          }
          if (treeObj.node.type === 'file') {
            that._showLoading();
            if (that.currentFile && !that.currentFile.original.readOnly) {
              currentValue = that.value();
              if (that.currentFile.original.fileContents.code !== currentValue.code) {
                that.currentFile.original.fileContents = currentValue;
                that.options.showFileTree.onSave(that.currentFile);
              }
            }
            if (!treeObj.node.original.fileContents) {
              that.options.showFileTree.fetch(treeObj, function(newTreeObj) {
                var check_lang;
                check_lang = that.options.mime_lang_mapping[newTreeObj.node.original.fileContents.mime_type];
                newTreeObj.node.original.fileContents.language = check_lang ? check_lang : "text";
                if ((newTreeObj.node.id === $('#filetree').jstree('get_selected')[0]) || !that.currentFile) {
                  that.currentFile = newTreeObj.node;
                  return that.setValue(newTreeObj.node.original.fileContents);
                }
              });
            } else {
              that.currentFile = treeObj.node;
              that.setValue(treeObj.node.original.fileContents);
            }
            if (treeObj.node.original.readOnly) {
              return that.codeEditor.setOption('readOnly', true);
            } else {
              return that.codeEditor.setOption('readOnly', false);
            }
          }
        };
      })(this),
      _initializeAutoComplete: function() {
        var e;
        e = $(this.element);
        if (typeof $.cookie('enableIntellisenseUserPref') === "undefined") {
          e.find("#auto-complete").prop("checked", true);
          $.cookie('enableIntellisenseUserPref', "true");
        } else {
          if ($.cookie('enableIntellisenseUserPref') === "true") {
            e.find("#auto-complete").prop("checked", true);
          } else if ($.cookie('enableIntellisenseUserPref') === "false") {
            e.find("#auto-complete").prop("checked", false);
          } else {
            e.find("#auto-complete").prop("checked", true);
            $.cookie('enableIntellisenseUserPref', "true");
          }
        }
        return e.find("#auto-complete").click((function(_this) {
          return function(ev) {
            if (e.find("#auto-complete").is(':checked')) {
              $.cookie('enableIntellisenseUserPref', "true");
            } else {
              $.cookie('enableIntellisenseUserPref', "false");
            }
          };
        })(this));
      },
      _copyToCurrentBuffer: function(data) {
        var e, that;
        e = $(this.element);
        e.find(".version-ball").removeClass("green-bkg");
        e.find(".version-name").html("Current Buffer");
        e.find(".version-meta").html("(saved locally, editable)");
        if (!e.find(".current-version-ball").hasClass("green-bkg")) {
          e.find(".current-version-ball").addClass("green-bkg");
        }
        if (this.versionGetXhr && this.versionGetXhr.status === void 0) {
          this.versionGetXhr.abort();
        }
        this._showLoading("Loading current buffer... ");
        this.codeEditor.setOption("readOnly", false);
        this.setValue(data);
        this.ActiveVersionId = null;
        this.saveLangCode();
        that = this;
        return setTimeout(function() {
          that._hideLoading();
          $(that.element).find(".dummy-lang-container").hide();
          $(that.element).find("#select-lang").siblings(".select2-container").show();
          that.element.find(".delete-active-version").hide();
          return that.ActiveVersionId = null;
        }, 100);
      },
      _forkNewBuffer: function(forked_data) {
        var data, e, that;
        if (forked_data == null) {
          forked_data = null;
        }
        e = $(this.element);
        if (this.ActiveVersionId === void 0 || this.ActiveVersionId === null) {
          data = {
            code: this.codeEditor.getValue(),
            language: this.options.language
          };
        } else {
          data = {
            code: this._getLangCode(this.currentBufferLang),
            language: this.currentBufferLang
          };
        }
        this._showLoading("Saving previous buffer on cloud... ");
        this.element.find(".close-fork-dialog").click();
        that = this;
        return $.ajax({
          url: this.options.versioningRestUrl,
          type: "POST",
          data: data,
          success: function(data) {
            if (forked_data) {
              that._copyToCurrentBuffer(forked_data);
            }
            that._hideLoading();
            if (e.find(".version-timeline").css("display") === "none") {
              e.find(".show-version-timeline").click();
            }
            e.find(".version-ball").removeClass("green-bkg");
            if (!e.find(".version-ball").hasClass("green-bkg")) {
              e.find(".current-version-ball").addClass("green-bkg");
            }
            return that._addNewVersion(data.id);
          }
        });
      },
      forkNewBuffer: function(data) {
        var dialog_class, that;
        if (this.options.enableVersioning) {
          if (!(this.options.versionIds && this.options.versionIds.length < 20)) {
            dialog_class = ".fork-limit-reached-dialog";
            if (this.element.find(dialog_class).css("display") === "none") {
              this.element.find(dialog_class).show();
              return this.element.find(".fork-this-version i").addClass("green-color");
            } else {
              this.element.find(dialog_class).hide();
              return this.element.find(".fork-this-version i").removeClass("green-color");
            }
          } else {
            this._forkNewBuffer(data);
            that = this;
            return setTimeout(function() {
              return that.saveLangCode();
            }, 0);
          }
        } else {
          return this.setValue(data);
        }
      },
      _bindCurrentVersionBall: function() {
        var e;
        e = $(this.element);
        return e.find(".current-version-ball").click((function(_this) {
          return function(ev) {
            var data;
            data = {
              code: _this._getLangCode(_this.currentBufferLang || _this.options.language),
              language: _this.currentBufferLang || _this.options.language
            };
            return _this._copyToCurrentBuffer(data);
          };
        })(this));
      },
      _bindVersionBall: function() {
        var e;
        e = $(this.element);
        return e.find(".version-ball").unbind("click").click((function(_this) {
          return function(ev) {
            var that, version_id, version_seq;
            version_id = parseInt($(ev.currentTarget).attr("data-version-id"));
            version_seq = _.indexOf(_this.options.versionIds, version_id) + 1;
            if (e.find(".current-version-ball").hasClass("green-bkg")) {
              _this.currentBufferLang = _this.options.language;
              _this.saveLangCode();
            }
            _this.element.find(".delete-active-version").hide();
            e.find(".version-name").html("Buffer #" + version_seq);
            e.find(".version-meta").html("(saved on cloud, read-only)");
            e.find(".version-ball").removeClass("green-bkg");
            e.find(".current-version-ball").removeClass("green-bkg");
            if (!$(ev.currentTarget).hasClass("green-bkg")) {
              $(ev.currentTarget).addClass("green-bkg");
            }
            that = _this;
            _this._showLoading("Looking up cloud for buffer #" + version_seq + "... ");
            if (_this.versionGetXhr && _this.versionGetXhr.status === void 0) {
              _this.versionGetXhr.abort();
            }
            return _this.versionGetXhr = $.ajax({
              url: _this.options.versioningRestUrl,
              type: "GET",
              data: {
                version_id: version_id
              },
              success: function(data) {
                that.setValue({
                  code: data.source,
                  language: data.language
                });
                that.codeEditor.setOption("readOnly", true);
                $(that.element).find(".dummy-lang-container").html(that.options.lang_display_mapping[data.language]).show();
                $(that.element).find("#select-lang").siblings(".select2-container").hide();
                that._hideLoading();
                that.ActiveVersionId = version_id;
                return that.element.find(".delete-active-version").show();
              }
            });
          };
        })(this));
      },
      _addNewVersion: function(version_id) {
        var prev;
        if (_.indexOf(this.options.versionIds, version_id) === -1) {
          this.options.versionIds.push(version_id);
          this.options.versionIds = _.sortBy(this.options.versionIds, function(num) {
            return num;
          });
          prev = null;
          return _.each(this.options.versionIds, function(version_id) {
            var $el;
            if (this.element.find(".version-ball[data-version-id=" + version_id + "]").length === 0) {
              if (prev !== null) {
                $el = this.element.find(".version-ball[data-version-id=" + prev + "]");
              } else {
                $el = this.element.find(".start-slab");
              }
              $el.after("<div class='version-ball pull-left cursor' data-version-id='" + version_id + "'></div>");
              this._bindVersionBall();
            }
            return prev = version_id;
          }, this);
        }
      },
      _updateStatusBar: function() {
        var modeText;
        modeText = (function() {
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
        }).call(this);
        return $(this.element).find("#statusbar-mode").text(modeText);
      },
      _updateStatusPosition: function(e) {
        var pos, start_line;
        pos = e.doc.getCursor();
        start_line = e.getOption("firstLineNumber");
        e = $(this.element);
        e.find("#statusbar-line").text("Line: " + (pos.line + start_line));
        return e.find("#statusbar-col").text("Col: " + (pos.ch + 1));
      },
      _getThemeName: function(slug) {
        if (slug === "dark") {
          return "ambiance";
        } else {
          return "default";
        }
      },
      _changeTheme: function(editor_theme) {
        if (editor_theme == null) {
          editor_theme = null;
        }
        editor_theme || (editor_theme = $.cookie('hacker_editor_theme'));
        if (editor_theme !== "dark" && editor_theme !== "light") {
          editor_theme = "light";
        }
        $.cookie('hacker_editor_theme', editor_theme);
        this.element.find("select#editor-theme option[value=" + editor_theme + "]").attr("selected", true);
        this.codeEditor.setOption("theme", this._getThemeName(editor_theme));
        return this.codeEditor.refresh();
      },
      _setTabSize: function(size) {
        size = parseInt(size);
        if (_.isNumber(size) && (!_.isNaN(size)) && this.codeEditor.options.tabSize !== size) {
          this._saveUserOpts({
            "tabSize": size,
            "indentUnit": size
          });
          this.codeEditor.setOption("tabSize", size);
          return this.codeEditor.setOption("indentUnit", size);
        }
      },
      _parseJson: function(data, customRendering) {
        var retHintValues, that;
        retHintValues = [];
        that = this;
        $.each(data, function(index, data) {
          var autoCompleteObject;
          autoCompleteObject = {};
          autoCompleteObject.text = data.completion;
          if (data.type === "") {
            data.type = " ";
          }
          autoCompleteObject.displayText = data.menu;
          autoCompleteObject.type = data.type;
          autoCompleteObject.completion = data.completion;
          autoCompleteObject.menu = data.menu;
          autoCompleteObject.info = data.info;
          if (customRendering === true) {
            autoCompleteObject.render = function(elt, self, data) {
              var divCompletionText, divMenuText, divTypeText;
              if (data.type === " " || data.type === "") {
                if (data.completion[data.completion.length - 1] === "(" || data.completion[data.completion.length - 1] === ")") {
                  data.type = "f";
                } else {
                  data.type = "v";
                }
              }
              if (data.completion[data.completion.length - 1] === "(") {
                data.completion += ")";
              }
              divTypeText = document.createElement("DIV");
              divTypeText.className = "CodeMirror-hint-divTypeText";
              divTypeText.appendChild(document.createTextNode(data.type));
              divCompletionText = document.createElement("DIV");
              divCompletionText.className = "CodeMirror-hint-divCompletionText";
              divCompletionText.appendChild(document.createTextNode(" " + data.completion + " "));
              divMenuText = document.createElement("DIV");
              divMenuText.className = "CodeMirror-hint-divMenuText";
              divMenuText.appendChild(document.createTextNode(data.menu + " "));
              elt.appendChild(divTypeText);
              elt.appendChild(divCompletionText);
              elt.appendChild(divMenuText);
              elt.style.display = "table-row";
            };
          }
          retHintValues.push(autoCompleteObject);
        });
        return retHintValues;
      },
      _updateLoadingMessage: function(cm, retHintValues) {
        var noKeyPress, options;
        noKeyPress = true;
        options = {
          completeSingle: false,
          hint: function(cm) {
            var inner;
            if (noKeyPress === true) {
              noKeyPress = false;
            } else {
              retHintValues = [];
            }
            inner = {
              from: cm.getCursor(),
              to: cm.getCursor(),
              list: []
            };
            inner.list = retHintValues;
            return inner;
          }
        };
        CodeMirror.showHint(cm, options.hint, options);
      },
      _cleanToken: function(token) {
        var charCode, iterateToken;
        iterateToken = 0;
        while (iterateToken < token.length) {
          charCode = token.charCodeAt(iterateToken);
          if ((charCode > 47 && charCode < 58) || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || token[iterateToken] === '_') {
            break;
          }
          iterateToken++;
        }
        token = token.substr(iterateToken);
        return token;
      },
      _filterSuggestions: function(list, token) {
        var found, iterateList, matched, ptrToken, ptrWord, word;
        token = token.toLowerCase();
        found = [];
        iterateList = 0;
        while (iterateList < list.length) {
          word = list[iterateList].text.toLowerCase();
          matched = 1;
          ptrWord = 0;
          ptrToken = 0;
          while (ptrToken < token.length) {
            while ((word[ptrWord] !== token[ptrToken]) && (ptrWord < word.length)) {
              ptrWord++;
            }
            if (ptrWord === word.length) {
              matched = 0;
              break;
            }
            ptrToken++;
          }
          if (matched === 1) {
            found.push(list[iterateList]);
          }
          iterateList++;
        }
        return found;
      },
      _adjustHeightSuggestionBox: function(hints) {
        var adjustTop, box, cm, ele, height, hintsTop, newTop, pos, winH, winW;
        cm = this.codeEditor;
        pos = cm.cursorCoords(cm.getCursor());
        winW = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth);
        winH = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
        box = hints.getBoundingClientRect();
        ele = $("#CodeMirror-hint-infoDiv")[0];
        adjustTop = ele.offsetHeight;
        height = box.bottom + adjustTop - box.top;
        if (height > winH) {
          hints.style.height = (winH - 5 - adjustTop) + "px";
          newTop = parseInt(hints.style.top.substr(0, hints.style.top.length - 2), 10);
          newTop += winH - 5 - adjustTop;
          $(ele).css("top", newTop + "px");
        } else {
          hintsTop = parseInt(hints.style.top.substr(0, hints.style.top.length - 2), 10);
          if (hintsTop < pos.top && hintsTop + (box.bottom - box.top) + adjustTop !== pos.top) {
            hints.style.top = (pos.top - adjustTop - (box.bottom - box.top)) + "px";
            newTop = pos.top - adjustTop;
            $(ele).css("top", newTop + "px");
          }
        }
      },
      _adjustWidthSuggestionBox: function(hints) {
        var box, cm, editor, editorOffset, pos;
        cm = this.codeEditor;
        pos = cm.cursorCoords(cm.getCursor());
        box = hints.getBoundingClientRect();
        editor = $(cm.display.wrapper);
        editorOffset = editor.offset();
        if (editor.width() > box.width) {
          if ((editorOffset.left + editor.width()) >= box.right) {
            hints.style.width = box.width;
          } else {
            hints.style.width = box.width;
            hints.style.left = (pos.left - (box.right - (editorOffset.left + editor.width())) - 5) + "px";
          }
        } else {
          hints.style.left = editorOffset.left + "px";
          hints.style.width = editor.width() + "px";
        }
      },
      _setMaxWidthCompletionText: function(hints) {
        var curWidth, divCompletionText, iterateDivs, maxWidth, obj, startWidth;
        divCompletionText = hints.getElementsByClassName("CodeMirror-hint-divCompletionText");
        if (divCompletionText.length > 0) {

        } else {
          return;
        }
        iterateDivs = divCompletionText.length - 1;
        while (iterateDivs >= 0) {
          obj = divCompletionText[iterateDivs];
          maxWidth = void 0;
          startWidth = void 0;
          maxWidth = hints.style.width;
          maxWidth = parseInt(maxWidth.substr(0, maxWidth.length - 2));
          curWidth = obj.offsetWidth;
          if (curWidth > maxWidth) {
            curWidth = maxWidth - 40;
            obj.style.maxWidth = curWidth + "px";
            obj.style.textOverflow = "ellipsis";
          }
          iterateDivs--;
        }
      },
      _setMaxWidthMenuText: function(hints) {
        var divMenuText, iterateDivs, obj, reqdWidth, startWidth;
        divMenuText = hints.getElementsByClassName("CodeMirror-hint-divMenuText");
        if (divMenuText.length > 0) {

        } else {
          return;
        }
        iterateDivs = divMenuText.length - 1;
        while (iterateDivs >= 0) {
          obj = divMenuText[iterateDivs];
          reqdWidth = hints.style.width;
          reqdWidth = parseInt(reqdWidth.substr(0, reqdWidth.length - 2));
          startWidth = obj.offsetLeft;
          reqdWidth -= startWidth;
          obj.style.maxWidth = (reqdWidth - 20) + "px";
          iterateDivs--;
        }
      },
      _removeShowHintWidget: function(cm) {
        this._updateSuggestions(cm, []);
      },
      _updateSuggestions: function(cm, retHintValues) {
        var options, tempRetHintValues, that;
        tempRetHintValues = retHintValues;
        that = this;
        options = {
          completeSingle: false,
          hint: function(cm) {
            var inner, token;
            retHintValues = tempRetHintValues;
            token = cm.getTokenAt(cm.getCursor()).string;
            token = that._cleanToken(token);
            if (token.length > 0) {
              retHintValues = that._filterSuggestions(retHintValues, token);
            }
            inner = {
              from: cm.getCursor(),
              to: cm.getCursor(),
              list: []
            };
            inner.list = retHintValues;
            CodeMirror.on(inner, "shown", function() {
              that._suggestionBoxDisplayStatus = true;
            });
            CodeMirror.on(inner, "close", function() {
              $("#CodeMirror-hint-infoDiv").remove();
              that._suggestionBoxDisplayStatus = false;
            });
            CodeMirror.on(inner, "select", function(completion, elt) {
              var adjustTop, infoDiv, infoDivInfo, infoDivMenu;
              that._adjustWidthSuggestionBox($(".CodeMirror-hints")[0]);
              that._setMaxWidthMenuText($(".CodeMirror-hints")[0]);
              that._setMaxWidthCompletionText($(".CodeMirror-hints")[0]);
              if (completion.menu.length > 0 || completion.info.length > 0) {
                if (completion.info === completion.menu) {
                  completion.info = "";
                }
                if ($('#CodeMirror-hint-infoDiv').length > 0) {
                  $("#CodeMirror-hint-infoDivMenu").text(completion.menu);
                  $("#CodeMirror-hint-infoDivInfo").text(completion.info);
                  $("#CodeMirror-hint-infoDiv").css("width", $(elt).parent().css("width"));
                  $("#CodeMirror-hint-infoDiv").css("left", $(elt).parent().css("left"));
                  adjustTop = parseInt($(elt).parent().css("top").substr(0, $(elt).parent().css("top").length - 2), 10);
                  adjustTop += parseInt($(elt).parent().css("height").substr(0, $(elt).parent().css("height").length - 2), 10);
                  $("#CodeMirror-hint-infoDiv").css("top", adjustTop + "px");
                } else {
                  infoDiv = document.createElement("ul");
                  infoDiv.id = "CodeMirror-hint-infoDiv";
                  $(elt.parentNode.parentNode).append($(infoDiv));
                  $(infoDiv).css("width", $(elt).parent().css("width"));
                  $(infoDiv).css("left", $(elt).parent().css("left"));
                  adjustTop = parseInt($(elt).parent().css("top").substr(0, $(elt).parent().css("top").length - 2), 10);
                  adjustTop += parseInt($(elt).parent().css("height").substr(0, $(elt).parent().css("height").length - 2), 10);
                  $(infoDiv).css("top", adjustTop + "px");
                  infoDivMenu = document.createElement("span");
                  infoDivMenu.id = "CodeMirror-hint-infoDivMenu";
                  $(infoDivMenu).css("color", "blue");
                  $(infoDivMenu).text(completion.menu);
                  infoDivInfo = document.createElement("span");
                  infoDivInfo.id = "CodeMirror-hint-infoDivInfo";
                  $(infoDivInfo).css("color", "#D757FA");
                  $(infoDivInfo).css("margin-left", "10px");
                  $(infoDivInfo).text(completion.info);
                  $(infoDiv).append($(infoDivMenu));
                  $(infoDiv).append($(infoDivInfo));
                }
              }
              that._adjustHeightSuggestionBox($(".CodeMirror-hints")[0]);
            });
            CodeMirror.on(inner, "pick", function(completion) {
              var startPoint, tempInnerEnd, tempInnerStart;
              startPoint = inner.to.ch - token.length;
              tempInnerStart = {};
              tempInnerStart.line = inner.from.line;
              tempInnerStart.ch = startPoint;
              tempInnerEnd = {};
              tempInnerEnd.line = inner.to.line;
              tempInnerEnd.ch = inner.to.ch;
              cm.replaceRange("", tempInnerStart, tempInnerEnd);
            });
            return inner;
          }
        };
        CodeMirror.showHint(cm, options.hint, options);
      },
      _getLoadingData: function() {
        var data;
        data = [];
        data.push({
          type: "",
          completion: "",
          menu: "Loading hints...   ",
          info: ""
        });
        return data;
      },
      _showAutoCompleteLoadingMsg: function(cm) {
        var data, retHintValues;
        data = this._getLoadingData();
        retHintValues = this._parseJson(data, false);
        this._updateLoadingMessage(cm, retHintValues);
      },
      _enableIntellisenseFunc: function(cm) {
        var data, e, language, retHintValues, that;
        e = $(this.element);
        if (e.find("#auto-complete").prop("checked") === false) {
          return;
        }
        language = this.options.language;
        if (__indexOf.call(this._supportedLanguages, language) >= 0) {

        } else {
          this._removeShowHintWidget(cm);
          return;
        }
        this._autoCompleteReqestStatus = true;
        data = this._getFullCodeOffsetLanguage(cm);
        retHintValues = [];
        that = this;
        return $.ajax({
          type: "POST",
          url: "https://autocomplete.hackerrank.com/autocomplete",
          data: data,
          dataType: "json",
          success: function(data) {
            if (data.msg) {
              console.log("No suggestions obtained - error");
              that._removeShowHintWidget(cm);
              return;
            }
            if (that._autoCompleteReqestStatus === true) {
              retHintValues = that._parseJson(data, true);
              that._updateSuggestions(cm, retHintValues);
            }
          }
        });
      },
      _getFullCodeOffsetLanguage: function(cm) {
        var autoCompleteInfo, code, headCode, language, lineCh, lineNum, numHeadLines, offset, tailCode, token;
        language = this.options.language;
        code = "";
        if (this.options.showNonEditableHeadTail === true) {
          headCode = this._getLangHeadCode(language);
          if (headCode.length !== 0) {
            code += headCode;
          }
        }
        code += "\n";
        numHeadLines = code.split("\n").length;
        numHeadLines -= 1;
        offset = code.length;
        lineCh = cm.getCursor();
        lineNum = 0;
        while (lineNum < lineCh["line"]) {
          offset += cm.getLine(lineNum).length + 1;
          lineNum++;
        }
        offset += lineCh["ch"];
        code += cm.getValue();
        code += "\n";
        if (this.options.showNonEditableHeadTail === true) {
          tailCode = this._getLangTailCode(language);
          if (tailCode.length !== 0) {
            code += tailCode;
          }
        }
        code += "\n";
        token = cm.getTokenAt(lineCh).string;
        token = this._cleanToken(token);
        autoCompleteInfo = {
          column: lineCh["ch"] + 1,
          WantDocumentationForEveryCompletionResult: "false",
          line: lineCh["line"] + 1 + numHeadLines,
          wordToComplete: token,
          code: code,
          offset: offset,
          fileType: language
        };
        return autoCompleteInfo;
      },
      _initCodeEditor: function(t, readOnly) {
        var e, opts, sel, that, _ref;
        if (readOnly == null) {
          readOnly = false;
        }
        opts = this._getUserOpts();
        e = $(this.element);
        e.find(".editor-mode-button[data-editor=" + opts.keyMap + "]").addClass("disabled");
        sel = e.find("#select-lang");
        sel.select2({
          width: "off"
        });
        this._initAutoSave();
        if (opts.userPreferredLang && (_ref = opts.userPreferredLang, __indexOf.call(this.options.languages, _ref) >= 0)) {
          sel.select2("val", opts.userPreferredLang);
          opts.mode = this.options.lang_mime_mapping[opts.userPreferredLang];
        } else {
          sel.select2("val", this.options.language);
          opts.mode = this.options.lang_mime_mapping[this.options.language];
        }
        that = this;
        if (this.options.enableIntellisense && opts.keyMap !== "emacs") {
          opts.extraKeys["Ctrl-Space"] = function(cm) {
            that._showAutoCompleteLoadingMsg(cm);
            that._enableIntellisenseFunc(cm);
          };
        }
        opts.readOnly = readOnly;
        return CodeMirror.fromTextArea(t, opts);
      },
      _changeLanguage: function(e) {
        return this.changeLanguage($(e.currentTarget).select2("val"));
      },
      changeLanguage: function(lang, cb) {
        if (cb == null) {
          cb = null;
        }
        if (lang === null) {
          return;
        }
        this.newLanguage = lang;
        if (this.options.dynamicMode) {
          this._showLoading();
          return this._trigger("loadmode", {}, {
            lang: lang,
            callback: (function(_this) {
              return function() {
                return _this._changeMode(cb);
              };
            })(this)
          });
        } else {
          return this._changeMode(cb);
        }
      },
      _showLoading: function(msg) {
        if (msg == null) {
          msg = "Loading Editor... ";
        }
        $(this.element).find(".code-body, .code-head, .code-tail").hide();
        return $(this.element).find(".loading-mode").html(msg).show();
      },
      _hideLoading: function() {
        $(this.element).find(".code-body, .code-head, .code-tail").show();
        return $(this.element).find(".loading-mode").hide();
      },
      _changeMode: function(cb) {
        var from, lang, sel;
        if (cb == null) {
          cb = null;
        }
        this._hideLoading();
        lang = this.newLanguage;
        from = this.options.language;
        this.options.language = lang;
        if (!this.options.showFileTree) {
          this.codeEditor.setValue(this._getLangCode(lang));
        }
        this._foldCode();
        if (this.options.showNonEditableHeadTail) {
          this._displayHeadAndTail(lang);
        }
        this._saveUserOpts({
          "userPreferredLang": lang
        });
        this.codeEditor.setOption("mode", this.options.lang_mime_mapping[lang]);
        if (this.options.showNonEditableHeadTail === false) {
          this._setMainEditorLineNumber(lang);
        }
        sel = $(this.element).find("#select-lang");
        sel.select2("val", lang);
        this.codeEditor.clearHistory();
        this._trigger("languagechange", {}, {
          from: from,
          to: lang
        });
        if (cb !== null) {
          return cb();
        }
      },
      _saveCode: function(e) {
        e.preventDefault();
        if (this.options.onSave) {
          return this.options.onSave();
        }
      },
      _initAutoSave: function() {
        var callback, timeout;
        if (this.options.autoSave && this.options.onSave) {
          timeout = parseInt(this.options.autoSave, 10);
          callback = this.options.onSave;
          return this._autoSaveCode(timeout, callback);
        }
      },
      _autoSaveCode: function(timeout, callback) {
        callback();
        return setInterval(this._autoSaveCode, timeout, timeout, callback);
      },
      _setEditorMode: function(e) {
        var mode, that;
        mode = $(e.currentTarget).attr("data-editor");
        $(e.currentTarget).parent().find(".editor-mode-button").removeClass("disabled");
        $(e.currentTarget).addClass("disabled");
        this.codeEditor.setOption("keyMap", mode);
        that = this;
        if (mode === "emacs") {
          delete this.codeEditor.options.extraKeys["Ctrl-Space"];
        } else {
          this.codeEditor.options.extraKeys["Ctrl-Space"] = function(cm) {
            that._showAutoCompleteLoadingMsg(cm);
            that._enableIntellisenseFunc(cm);
          };
        }
        this._focusEditor(e);
        return this._saveUserOpts({
          keyMap: mode
        });
      },
      _focusEditor: function(e) {
        return this.codeEditor.focus();
      },
      _getDefaultLangCode: function(l) {
        var body, head, tail, _stripTabs, _suffix_new_line;
        if (this.options.showTemplate && !this.options.showNonEditableHeadTail) {
          if (this.options.lang_head_template[l] !== void 0 || this.options.lang_body_template[l] !== void 0 || this.options.lang_tail_template[l] !== void 0 || this.options.lang_template[l] !== void 0) {
            _stripTabs = function(string) {
              var spaces, tab;
              spaces = (new Array(4)).join(" ");
              tab = "\t";
              if (string === void 0) {
                return "";
              }
              return string.split(tab).join(spaces);
            };
            _suffix_new_line = function(string) {
              if (string && string.indexOf("\n", string.length - 1) === -1) {
                return "" + string + "\n";
              } else {
                return string;
              }
            };
            head = _suffix_new_line(_stripTabs(this.options.lang_head_template[l] || ""));
            body = _suffix_new_line(_stripTabs(this.options.lang_template[l] || this.options.lang_body_template[l] || ""));
            tail = _suffix_new_line(_stripTabs(this.options.lang_tail_template[l] || ""));
            return "" + head + body + tail;
          }
        } else if (this.options.lang_template[l] || this.options.lang_body_template[l] || this.options.lang_default_text[l]) {
          return this.options.lang_template[l] || this.options.lang_body_template[l] || this.options.lang_default_text[l];
        }
        return "";
      },
      _getLangCode: function(l) {
        var val;
        if (this.options.autoSaveNamespace) {
          val = $.jStorage.get(this.getCurrentAutosavekey(l));
          if (val && !$.jStorage.get("" + (this.getCurrentAutosavekey(l)) + "-default_template")) {
            return val;
          }
        }
        return this._getDefaultLangCode(l);
      },
      _getLangHeadCode: function(l) {
        if (this.options.lang_head_template[l]) {
          return this.options.lang_head_template[l];
        }
        return "";
      },
      _getLangTailCode: function(l) {
        if (this.options.lang_tail_template[l]) {
          return this.options.lang_tail_template[l];
        }
        return "";
      },
      _displayHeadAndTail: function(l) {
        var e, head_editor_lines, head_height;
        e = $(this.element);
        if (this._getLangHeadCode(l).length !== 0) {
          this.codeEditorHead.setValue(this._getLangHeadCode(l));
          head_editor_lines = this.codeEditorHead.getValue().split("\n").length;
          this.codeEditor.setOption("firstLineNumber", head_editor_lines + 1);
          this.codeEditorHead.setOption("mode", this.options.lang_mime_mapping[l]);
        } else {
          e.find(".code-head").hide();
        }
        if (this._getLangTailCode(l).length !== 0) {
          this.codeEditorTail.setValue(this._getLangTailCode(l));
          this._updateTailEditorLineNumber();
          this.codeEditorTail.setOption("mode", this.options.lang_mime_mapping[l]);
        } else {
          e.find(".code-tail").hide();
        }
        head_height = e.find(".code-head").height();
        return e.find(".code-editors").scrollTop(head_height - 60);
      },
      _updateTailEditorLineNumber: function() {
        var head_editor_lines, main_editor_lines;
        head_editor_lines = this.codeEditorHead.getValue().split("\n").length;
        main_editor_lines = this.codeEditor.getValue().split("\n").length;
        return this.codeEditorTail.setOption("firstLineNumber", head_editor_lines + main_editor_lines + 1);
      },
      _setMainEditorLineNumber: function(l) {
        if (this.options.lang_line_nos && this.options.lang_line_nos[l]) {
          return this.codeEditor.setOption("firstLineNumber", this.options.lang_line_nos[l]);
        } else {
          return this.codeEditor.setOption("firstLineNumber", 1);
        }
      },
      _growEditor: function() {
        var main_editor_height;
        main_editor_height = this.element.find(".code-body").height();
        if (main_editor_height < 300) {
          main_editor_height = 300;
        }
        this.element.find(".code-editors, #filetree").css("max-height", "" + (main_editor_height + 110) + "px");
        if (this.options.showFileTree) {
          return this.element.find("#filetree").css("max-height", "" + main_editor_height + "px");
        }
      },
      _saveLangCode: function() {
        var d, saveObject, that;
        if (this.ActiveVersionId === void 0 || this.ActiveVersionId === null) {
          d = new Date();
          saveObject = "" + this.options.language + (d.getHours()) + (d.getMinutes());
          if (window[saveObject]) {
            clearTimeout(window[saveObject]);
          }
          that = this;
          return window[saveObject] = setTimeout(function() {
            return that.saveLangCode();
          }, 3000);
        }
      },
      saveLangCode: function() {
        var code, key, opts;
        if (this.ActiveVersionId === void 0 || this.ActiveVersionId === null) {
          opts = this.options;
          if (opts.autoSaveNamespace && (opts.lang_mime_mapping[opts.language] === this.codeEditor.options.mode)) {
            key = this.getCurrentAutosavekey();
            code = this.codeEditor.getValue();
            $.jStorage.set("" + key + "-default_template", (this._getDefaultLangCode(opts.language) === code) || (this.options.lang_default_text[opts.language] === code));
            return $.jStorage.set(key, code);
          }
        }
      },
      getCurrentAutosavekey: function(l) {
        var opts;
        if (l == null) {
          l = null;
        }
        opts = this.options;
        if (l === null) {
          l = opts.language;
        }
        if (opts.autoSaveNamespace && opts.language) {
          return "" + opts.autoSaveNamespace + "-" + l;
        } else {
          return "";
        }
      },
      _getUserOpts: function() {
        var a, forced_opts;
        a = {
          lineNumbers: true,
          lineWrapping: true,
          styleActiveLine: true,
          autoCloseBrackets: true,
          autoCloseTags: true,
          indentWithTabs: false,
          matchBrackets: true,
          keyMap: "default",
          userPreferredLang: null,
          indentUnit: 4
        };
        forced_opts = {
          extraKeys: {
            Tab: function(cm) {
              var characterAt, offset, spaces;
              characterAt = cm.coordsChar(cm.cursorCoords()).ch;
              offset = characterAt % cm.getOption("indentUnit");
              spaces = Array(cm.getOption("indentUnit") + 1 - offset).join(" ");
              return cm.replaceSelection(spaces, "end", "+input");
            }
          },
          foldGutter: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        };
        return $.extend($.extend(a, $.parseJSON($.jStorage.get("codeshellUserOpts"))), forced_opts);
      },
      _saveUserOpts: function(opts) {
        var a;
        a = $.extend(this._getUserOpts(), opts);
        return $.jStorage.set("codeshellUserOpts", JSON.stringify(a));
      },
      value: function(getall) {
        var allCode;
        if (getall == null) {
          getall = false;
        }
        if (getall) {
          if (this.options.showFileTree) {
            this._checkAndSave(null, null, this);
            return {};
          }
          allCode = [];
          _.each(this.options.languages, (function(_this) {
            return function(lang) {
              if (lang === _this.options.language) {
                return allCode.push(_this.value());
              } else {
                return allCode.push({
                  code: _this._getLangCode(lang),
                  language: lang
                });
              }
            };
          })(this));
          return allCode;
        } else {
          return {
            code: this.codeEditor.getValue(),
            language: this.options.language
          };
        }
      },
      _foldCode: function() {
        var added_head, added_tail, clbk_head, clbk_tail, code, line, line_ctr, lines, _i, _len, _results;
        if (this.options.foldCode) {
          code = this.codeEditor.getValue();
          line_ctr = 0;
          added_head = false;
          added_tail = false;
          lines = (code || "").split("\n");
          _results = [];
          for (_i = 0, _len = lines.length; _i < _len; _i++) {
            line = lines[_i];
            line_ctr += 1;
            if (!added_head && !added_tail && line.indexOf('Head ends') !== -1) {
              clbk_head = function() {
                return {
                  from: {
                    ch: 0,
                    line: 0
                  },
                  to: {
                    ch: 0,
                    line: line_ctr
                  }
                };
              };
              CodeMirror.newFoldFunction(clbk_head)(this.codeEditor, {});
              added_head = true;
            }
            if (!added_tail && line.indexOf('Tail starts') !== -1) {
              clbk_tail = function() {
                return {
                  from: {
                    ch: 0,
                    line: line_ctr - 1
                  },
                  to: {
                    ch: 0,
                    line: lines.length
                  }
                };
              };
              CodeMirror.newFoldFunction(clbk_tail)(this.codeEditor, {});
              _results.push(added_tail = true);
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        }
      },
      setValue: function(opts) {
        if (opts.language) {
          return this.changeLanguage(opts.language, (function(_this) {
            return function() {
              if (opts.code) {
                _this.codeEditor.setValue(opts.code);
                return _this._foldCode();
              }
            };
          })(this));
        }
      },
      setValueorFork: function(opts) {
        var that;
        that = this;
        if (opts.language && (window.HR.forkable === true)) {
          return this.changeLanguage(opts.language, function() {
            var _ref;
            if (opts.code) {
              if ($.jStorage.get("" + (that.getCurrentAutosavekey(opts.language)))) {
                if (((_ref = that.value().code) !== opts.code && _ref !== "" && _ref !== that._getDefaultLangCode(opts.language) && _ref !== that.options.lang_default_text[opts.language]) && (window.HR.forkable === true)) {
                  window.HR.forkable = false;
                  that._forkNewBuffer(opts);
                }
              }
              that.setValue(opts);
              return that._foldCode();
            }
          });
        }
      },
      refresh: function() {
        setTimeout((function(_this) {
          return function() {
            return _this.codeEditor.refresh();
          };
        })(this), 25);
        if (this.options.showNonEditableHeadTail) {
          setTimeout((function(_this) {
            return function() {
              return _this.codeEditorHead.refresh();
            };
          })(this), 25);
          return setTimeout((function(_this) {
            return function() {
              return _this.codeEditorTail.refresh();
            };
          })(this), 25);
        }
      },
      onChange: function(callback) {
        if (callback === null) {
          return;
        }
        return this.codeEditor.on("change", callback);
      },
      setOption: function(key, value) {
        return this.codeEditor.setOption(key, value);
      },
      getOptions: function() {
        return this.options;
      },
      setStatusText: function(t) {
        if (t == null) {
          t = "";
        }
        this.options.statusText = t;
        return $(this.element).find('#status-text').html(_.escape(t));
      },
      deleteLangCode: function() {
        var key, opts;
        opts = this.options;
        if (opts.autoSaveNamespace && (opts.lang_mime_mapping[opts.language] === this.codeEditor.options.mode)) {
          key = "" + opts.autoSaveNamespace + "-" + opts.language;
          return $.jStorage.deleteKey(key);
        }
      },
      enableCompileBtn: function() {
        var $btn;
        $btn = $(this.element).find("button.bb-compile");
        return $btn.removeAttr('btn-disabled').removeClass('disabled');
      },
      getEditor: function() {
        return this.codeEditor;
      },
      destroy: function() {
        this._saveLangCode(this);
        return $.Widget.prototype.destroy.call(this);
      }
    });
  });

}).call(this);
