(function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_ChallengeEditAddTestCaseDialog, HR, _ref;
return Administration_ChallengeEditAddTestCaseDialog = function(_super) {
function Administration_ChallengeEditAddTestCaseDialog() {
return Administration_ChallengeEditAddTestCaseDialog.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_ChallengeEditAddTestCaseDialog, _super), Administration_ChallengeEditAddTestCaseDialog.prototype.template = "administration/challenge-edit-add-testcase-dialog", 
Administration_ChallengeEditAddTestCaseDialog.prototype.className = "administration-challenge-edit-add-testcase-dialog", 
Administration_ChallengeEditAddTestCaseDialog.prototype.ten_kb = 10240, Administration_ChallengeEditAddTestCaseDialog.prototype.initialize = function(options) {
return null == options && (options = {}), this.e = options.e, this.parent = options.parent, 
this.test_case_id = options.test_case_id, this.test_case_index = options.test_case_index, 
this.el = "#" + this.className + "-" + this.cid, HR.util.scrollToTop();
}, Administration_ChallengeEditAddTestCaseDialog.prototype.render = function() {
var tc_hash, title, _ref, _ref1;
return $(this.e.currentTarget).removeAttr("disabled"), 0 === $(this.el).length && (this.test_case_index ? (tc_hash = (this.test_case_index / 100).toFixed(2).split(".")[1], 
title = "Update Testcase: (input" + tc_hash + ".txt | output" + tc_hash + ".txt)") :title = "Add Testcase", 
$("body").append("<div class='on-the-fly-dialog-container'></div> <div class='" + this.className + " on-the-fly-dialog position-absolute' id='" + this.className + "-" + this.cid + "'> <div class='dlg-header'> <p class='pull-left'><b>" + title + "</b></p> <a class='pull-right close-button'>&#215;</a> <div class='clearfix'></div> </div> <div class='dlg-content'> " + HR.appController.viewLoader(64) + "</div> </div> </div>"), 
this.$el = $(this.el)), this.test_case_index && !this.test_case && (this.test_case = HR.model("administration-test_case"), 
this.test_case.set("id", this.test_case_id), this.test_case.set("challenge_id", this.model.get("id")), 
this.listenTo(this.test_case, "sync", this.render), this.test_case.fetch()), (!this.test_case_index || this.test_case.sync_status) && ($(this.el).find(".dlg-content").html(HR.appController.template(this.template, this)({
model:this.model,
_model:this.model.toJSON(),
test_case_index:this.test_case_index
})), this.editorOptions = {
lineNumbers:!0,
lineWrapping:!0,
mode:"text/plain"
}, this.render_input_editor(), this.render_output_editor(), this.test_case && (void 0 !== (_ref = this.test_case.get("tag")) && null !== _ref && $("input#tag").val(this.test_case.get("tag")), 
void 0 !== (_ref1 = this.test_case.get("score")) && null !== _ref1 && $("input#strength").val(this.test_case.get("score")), 
this.test_case.get("sample") === !0 ? $("input#sample").prop("checked", !0) :$("input#sample").prop("checked", !1)), 
$("input#strength").val() || $("input#strength").val(10), this.$("p.sample .help-prompt .help-text").css("right", "8px"), 
this.$("p.sample .help-prompt .help-text").css("bottom", "16px"), this.$("p.sample .help-prompt .help-text").css("top", "initial"), 
this.$("p.sample .help-prompt .help-text").css("left", "initial"), this.delegateEvents()), 
this;
}, Administration_ChallengeEditAddTestCaseDialog.prototype.events = {
"click a.close-button":"closeDialog",
"click input.change-value-method":"changeValueMethod",
"click button.save-testcase":"saveTestcase",
"click button.cancel-update":"closeDialog",
"click button.update-testcase":"saveTestcase"
}, Administration_ChallengeEditAddTestCaseDialog.prototype.render_input_editor = function(auto_switch) {
var $input_textarea, that;
if (null == auto_switch && (auto_switch = !0), !this.test_case_index || this.test_case.get("input_size") <= this.ten_kb) {
if ($input_textarea = this.$("#input_textarea").get(0), $input_textarea && (this.input_editor = CodeMirror.fromTextArea($input_textarea, this.editorOptions), 
this.input_editor.on("beforeChange", this.editorBeforeChange), this.input_editor.on("change", this.editorAfterChange), 
this.test_case && this.test_case.get("input_size") <= this.ten_kb)) return this.input_editor.setValue(this.test_case.get("input_data"));
} else if ($input_textarea = this.$("#input_textarea").hide(), this.$(".input-testcase-row").append("<div class='gray no-edit'>you can't edit testcases larger than 10 KiB<div>"), 
this.$(".input-testcase-row").find(".editor_status_bar").remove(), auto_switch) return that = this, 
setTimeout(function() {
return that.$("#input_radio-upload").click();
}, 100);
}, Administration_ChallengeEditAddTestCaseDialog.prototype.render_output_editor = function(auto_switch) {
var $output_textarea, that;
if (null == auto_switch && (auto_switch = !0), !this.test_case_index || this.test_case.get("output_size") <= this.ten_kb) {
if ($output_textarea = this.$("#output_textarea").get(0), $output_textarea && (this.output_editor = CodeMirror.fromTextArea($output_textarea, this.editorOptions), 
this.output_editor.on("beforeChange", this.editorBeforeChange), this.output_editor.on("change", this.editorAfterChange), 
this.test_case && this.test_case.get("output_size") <= this.ten_kb)) return this.output_editor.setValue(this.test_case.get("output_data"));
} else if ($output_textarea = this.$("#output_textarea").hide(), this.$(".output-testcase-row").append("<div class='gray no-edit'>you can't edit testcases larger than 10 KiB<div>"), 
this.$(".output-testcase-row").find(".editor_status_bar").remove(), auto_switch) return that = this, 
setTimeout(function() {
return that.$("#output_radio-upload").click();
}, 100);
}, Administration_ChallengeEditAddTestCaseDialog.prototype.editorBeforeChange = function(cm, change) {
var change_length, current_length, ten_kb;
return ten_kb = 10240, change_length = _.reduce(change.text, function(act, text) {
return act + text.length;
}, 0), current_length = cm.getValue().length, (change_length + current_length > 2 * ten_kb || change_length > ten_kb || current_length > ten_kb) && "+delete" !== change.origin ? (change.cancel(), 
alert("You can't edit a testcase in the editor which is greater than 10 KiB! Please use 'upload' option.")) :void 0;
}, Administration_ChallengeEditAddTestCaseDialog.prototype.editorAfterChange = function(cm) {
var h_std_size, std_size;
return std_size = cm.getValue().length, h_std_size = std_size > 1023 ? "" + (std_size / 1024).toFixed(3) + " KiB" :"" + std_size + " B", 
this.$("#" + cm.display.wrapper.nextElementSibling.id).html(h_std_size);
}, Administration_ChallengeEditAddTestCaseDialog.prototype.closeDialog = function(e) {
return e && e.preventDefault(), $(".on-the-fly-dialog-container").remove(), this.destroy(), 
$(this.el).remove();
}, Administration_ChallengeEditAddTestCaseDialog.prototype.changeValueMethod = function(e) {
var field, method;
if (field = $(e.currentTarget).attr("data-field"), method = $(e.currentTarget).val(), 
"editor" === method) {
if (!this.$("#" + field + "_textarea").length > 0) return this.$("." + field + "-testcase-row").append("<textarea id='" + field + "_textarea'></textarea><div class='editor_status_bar' id='" + field + "_editor_status_bar'>Size: 0 B</div>"), 
this["render_" + field + "_editor"](!1), this.$("#" + field + "_testcase_upload_container").remove();
} else if ("upload" === method && !this.$("#" + field + "_testcase_upload").length > 0) return this.$("." + field + "-testcase-row").append("<div id='" + field + "_testcase_upload_container'><input id='" + field + "_testcase_upload' type='file'/></div>"), 
this.$("." + field + "-testcase-row").find("#" + field + "_textarea").remove(), 
this.$("." + field + "-testcase-row").find(".no-edit").remove(), this.$("." + field + "-testcase-row").find(".CodeMirror").unbind().die().remove(), 
this.$("." + field + "-testcase-row").find(".editor_status_bar").remove();
}, Administration_ChallengeEditAddTestCaseDialog.prototype.saveTestcase = function(e) {
var cont, data, errors, errr, form_data, highs, http_method, input_type, input_value, lows, output_type, output_value, sample, strength, tag, that, url_suffix;
return e.preventDefault(), "disabled" !== $(e.currentTarget).attr("disabled") ? ($(e.currentTarget).attr("disabled", "disabled"), 
this.test_case_index ? $(e.currentTarget).html("Updating...") :$(e.currentTarget).html("Saving..."), 
errors = [], data = {}, tag = $("input#tag").val(), tag && tag.length > 18 ? errors.push({
message:"Length of tag can't be more than 18 characters long",
priority:"high"
}) :this.test_case_index && this.test_case.get("tag") === tag || (data.tag = tag), 
strength = $("input#strength").val(), _.isNaN(parseInt(strength)) || parseInt(strength) < 0 ? errors.push({
message:"Strength should be a positive integer",
priority:"high"
}) :this.test_case_index && this.test_case.get("score") === parseInt(strength) || (data.strength = parseInt(strength)), 
sample = $("input#sample").is(":checked"), this.test_case_index && this.test_case.get("sample") === sample || (data.sample = sample), 
this.$("#input_radio-editor").is(":checked") ? this.input_editor && (input_value = this.input_editor.getValue(), 
input_type = "editor", this.test_case_index && this.test_case.get("input_data") === input_value || (input_value || errors.push({
message:"input testcase is empty",
priority:"low"
}), data.input_value = input_value, data.input_type = input_type)) :this.$("#input_radio-upload").is(":checked") && (input_value = this.$("input#input_testcase_upload").get(0).files[0], 
input_type = "upload", input_value || this.test_case_index ? input_value && (data.input_value = input_value, 
data.input_type = input_type) :errors.push({
message:"file not selected for input testcase",
priority:"high"
})), this.$("#output_radio-editor").is(":checked") ? this.output_editor && (output_value = this.output_editor.getValue(), 
output_type = "editor", this.test_case_index && this.test_case.get("output_data") === output_value || (output_value || errors.push({
message:"output testcase is empty",
priority:"low"
}), data.output_value = output_value, data.output_type = output_type)) :this.$("#output_radio-upload").is(":checked") && (output_value = this.$("input#output_testcase_upload").get(0).files[0], 
output_type = "upload", output_value || this.test_case_index ? output_value && (data.output_value = output_value, 
data.output_type = output_type) :errors.push({
message:"file not selected for output testcase",
priority:"high"
})), errors.length > 0 ? (highs = _.filter(errors, function(error) {
return "high" === error.priority;
}), lows = _.filter(errors, function(error) {
return "low" === error.priority;
}), 0 === highs.length && lows.length > 0 ? (errr = "Following erros happened:\n", 
_.each(lows, function(low) {
return errr += "	\u2022 " + low.message + "\n";
}), errr += "Would you like to continue?", cont = confirm(errr)) :0 === highs.length && 0 === lows.length ? cont = !0 :highs.length > 0 && (cont = !1, 
errr = "Following errors happened:\n", _.each(errors, function(error) {
return errr += "	\u2022 " + error.message + "\n";
}), alert(errr))) :cont = !0, cont ? (that = this, this.test_case_index && 0 === _.size(data) ? ($(e.currentTarget).removeAttr("disabled"), 
$(e.currentTarget).html("Updated"), setTimeout(function() {
return that.closeDialog();
}, 150), void 0) :(this.test_case_index ? (http_method = "PUT", url_suffix = "/" + this.test_case_id) :(http_method = "POST", 
url_suffix = ""), form_data = new FormData(), _.each(data, function(v, k) {
return form_data.append(k, v);
}), $.ajax("/rest/administration/challenges/" + this.model.get("id") + "/test_cases" + url_suffix, {
data:form_data,
type:http_method,
processData:!1,
contentType:!1,
success:function(data) {
var test_case;
return $(e.currentTarget).removeAttr("disabled"), data.status ? (that.test_case_index ? ($(e.currentTarget).html("Updated"), 
test_case = that.parent.collection.get(data.model.id), test_case.set(data.model)) :($(e.currentTarget).html("Saved"), 
test_case = HR.model("administration-test_case", data.model), that.parent.collection.add(test_case)), 
setTimeout(function() {
return that.closeDialog();
}, 300)) :(errr = "Following errors happened:\n", _.each(data.errors, function(error) {
return errr += "	\u2022 " + error + "\n";
}), alert(errr), that.test_case_index ? $(e.currentTarget).html("Upload") :$(e.currentTarget).html("Save"));
},
error:function(resp) {
return $(e.currentTarget).removeAttr("disabled"), that.test_case_index ? $(e.currentTarget).html("Upload") :$(e.currentTarget).html("Save"), 
413 === resp.status ? alert("You exceeded the maximum allowed filesize limit for the zip file. Please either try individual testcase upload or contact hackers@hackerrank.com.") :alert("There was a error. Please try again.");
}
}))) :($(e.currentTarget).removeAttr("disabled"), this.test_case_index ? $(e.currentTarget).html("Upload") :$(e.currentTarget).html("Save"))) :void 0;
}, Administration_ChallengeEditAddTestCaseDialog;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_ChallengeEditAddTestCaseDialog = Administration_ChallengeEditAddTestCaseDialog;
});
}).call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_ChallengeEditTestcasesView, HR, _ref;
return Administration_ChallengeEditTestcasesView = function(_super) {
function Administration_ChallengeEditTestcasesView() {
return Administration_ChallengeEditTestcasesView.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_ChallengeEditTestcasesView, _super), Administration_ChallengeEditTestcasesView.prototype.template = "administration/challenge-edit-testcases", 
Administration_ChallengeEditTestcasesView.prototype.className = "administration-challenge-edit-testcases", 
Administration_ChallengeEditTestcasesView.prototype.initialize = function(options) {
return null == options && (options = {}), this.collection = HR.collection("administration-test_cases"), 
this.collection.challenge_id = this.model.get("id"), this.collection.cached(), this.listenTo(this.model, "reset", this.render), 
this.listenTo(this.collection, "reset", this.render), this.listenTo(this.collection, "change", this.render), 
this.listenTo(this.collection, "add", this.render), this.listenTo(this.collection, "remove", this.render), 
this.listenTo(this.collection, "destroy", this.render), this.listenTo(this.collection, "sync", this.render);
}, Administration_ChallengeEditTestcasesView.prototype.events = {
"click button.add-testcase":"showAddTestCaseDialog",
"click a.remove-test-case":"deleteTestCase",
"click button.upload-zip":"uploadAsZip",
"click a.edit-test-case":"editTestCase"
}, Administration_ChallengeEditTestcasesView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model,
_model:this.model.toJSON(),
collection:this.collection,
_collection:this.collection.toJSON()
})), this;
}, Administration_ChallengeEditTestcasesView.prototype.showAddTestCaseDialog = function(e) {
return e.preventDefault(), "disabled" !== $(e.currentTarget).attr("disabled") ? ($(e.currentTarget).attr("disabled", "disabled"), 
this.add_testcase_dialog && ($(".on-the-fly-dialog-container").remove(), this.add_testcase_dialog.destroy(), 
$(this.add_testcase_dialog.el).remove()), this.add_testcase_dialog = new HR.Administration_ChallengeEditAddTestCaseDialog({
model:this.model,
parent:this,
e:e
}), this.add_testcase_dialog.render()) :void 0;
}, Administration_ChallengeEditTestcasesView.prototype.editTestCase = function(e) {
var test_case_id, test_case_index;
return e.preventDefault(), "disabled" !== $(e.currentTarget).attr("disabled") ? ($(e.currentTarget).attr("disabled", "disabled"), 
test_case_id = $(e.currentTarget).attr("data-id"), test_case_index = $(e.currentTarget).attr("data-index"), 
this.edit_testcase_dialogs || (this.edit_testcase_dialogs = {}), this.edit_testcase_dialogs[test_case_id] && ($(".on-the-fly-dialog-container").remove(), 
this.edit_testcase_dialogs[test_case_id].destroy(), $(this.edit_testcase_dialogs[test_case_id].el).remove()), 
this.edit_testcase_dialogs[test_case_id] = new HR.Administration_ChallengeEditAddTestCaseDialog({
model:this.model,
test_case_id:test_case_id,
test_case_index:test_case_index,
parent:this,
e:e
}), this.edit_testcase_dialogs[test_case_id].render()) :void 0;
}, Administration_ChallengeEditTestcasesView.prototype.deleteTestCase = function(e) {
var test_case, test_case_id, test_case_index;
return e.preventDefault(), "disabled" !== $(e.currentTarget).attr("disabled") ? ($(e.currentTarget).attr("disabled", "disabled"), 
test_case_id = $(e.currentTarget).attr("data-id"), test_case = this.collection.get(test_case_id), 
test_case_index = $(e.currentTarget).attr("data-index"), this.delete_testcase_dialogs || (this.delete_testcase_dialogs = {}), 
this.delete_testcase_dialogs[test_case_id] && ($(".on-the-fly-dialog-container").remove(), 
this.delete_testcase_dialogs[test_case_id].destroy(), $(this.delete_testcase_dialogs[test_case_id].el).remove()), 
this.delete_testcase_dialogs[test_case_id] = new HR.Administration_ChallengeEditRemoveTestCaseDialog({
model:this.model,
test_case:test_case,
test_case_index:test_case_index,
parent:this,
e:e
}), this.delete_testcase_dialogs[test_case_id].render()) :void 0;
}, Administration_ChallengeEditTestcasesView.prototype.uploadAsZip = function(e) {
return e.preventDefault(), "disabled" !== $(e.currentTarget).attr("disabled") ? ($(e.currentTarget).attr("disabled", "disabled"), 
this.upload_zip_dialog && ($(".on-the-fly-dialog-container").remove(), this.upload_zip_dialog.destroy(), 
$(this.upload_zip_dialog.el).remove()), this.upload_zip_dialog = new HR.Administration_ChallengeEditUploadZipDialog({
model:this.model,
collection:this.collection,
parent:this,
e:e
}), this.upload_zip_dialog.render()) :void 0;
}, Administration_ChallengeEditTestcasesView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_ChallengeEditTestcasesView = Administration_ChallengeEditTestcasesView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_ChallengeEditLanguagesListDropdownView, HR, _ref;
return Administration_ChallengeEditLanguagesListDropdownView = function(_super) {
function Administration_ChallengeEditLanguagesListDropdownView() {
return Administration_ChallengeEditLanguagesListDropdownView.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_ChallengeEditLanguagesListDropdownView, _super), 
Administration_ChallengeEditLanguagesListDropdownView.prototype.template = "administration/challenge-edit-languages-list-dropdown", 
Administration_ChallengeEditLanguagesListDropdownView.prototype.className = "administration-challenge-edit-languages-list-dropdown", 
Administration_ChallengeEditLanguagesListDropdownView.prototype.initialize = function(options) {
return null == options && (options = {}), this.parent = options.parent, this.language_key = options.language_key, 
this.language_data = options.language_data, this.time_final_value = this.model.get_checker_limit("time", this.language_key) || this.language_data.def_time, 
this.mem_final_value = this.model.get_checker_limit("mem", this.language_key) || this.language_data.def_mem;
}, Administration_ChallengeEditLanguagesListDropdownView.prototype.render = function() {
var $tbody_textarea, $thead_textarea, $ttail_textarea, that;
return $(this.el).html(HR.appController.template(this.template, this)({
language_key:this.language_key,
language_data:this.language_data,
time_period:this.language_data.max_time - this.language_data.min_time + 1,
mem_period:this.language_data.max_mem - this.language_data.min_mem + 1
})), that = this, this.$(".timelimit-slider").slider({
min:this.language_data.min_time,
max:this.language_data.max_time,
value:this.time_final_value,
slide:function(event, ui) {
return that.parent.$("span.time-value").html(ui.value);
},
change:function(event, ui) {
return that.time_final_value = ui.value;
}
}), this.$(".memlimit-slider").slider({
min:this.language_data.min_mem,
max:this.language_data.max_mem,
value:this.mem_final_value,
slide:function(event, ui) {
return that.parent.$("span.mem-value").html(ui.value);
},
change:function(event, ui) {
return that.mem_final_value = ui.value;
}
}), this.editorOptions = {
lineNumbers:!1,
lineWrapping:!0,
mode:lang_mime_mapping[this.language_key] || "text/plain"
}, $thead_textarea = this.$("textarea.template_head").get(0), $thead_textarea && (this.thead_editor = CodeMirror.fromTextArea($thead_textarea, this.editorOptions), 
this.thead_editor.setValue(this.model.get("" + this.language_key + "_template_head") || lang_default_text[this.language_key] || ""), 
this.thead_editor.focus()), $tbody_textarea = this.$("textarea.template_body").get(0), 
$tbody_textarea && (this.tbody_editor = CodeMirror.fromTextArea($tbody_textarea, this.editorOptions), 
this.tbody_editor.setValue(this.model.get("" + this.language_key + "_template") || this.model.get("" + this.language_key + "_template_body") || "")), 
$ttail_textarea = this.$("textarea.template_tail").get(0), $ttail_textarea && (this.ttail_editor = CodeMirror.fromTextArea($ttail_textarea, this.editorOptions), 
this.ttail_editor.setValue(this.model.get("" + this.language_key + "_template_tail") || "")), 
that = this, setTimeout(function() {
return that.thead_editor.refresh(), that.tbody_editor.refresh(), that.ttail_editor.refresh();
}, 300), this;
}, Administration_ChallengeEditLanguagesListDropdownView.prototype.getFinalValues = function() {
var resp, template_body, _data, _fil_data;
return _data = this.getData(), _fil_data = {}, _.each(_data, function(value, key) {
return null !== value && void 0 !== value ? _fil_data[key] = value :void 0;
}), resp = {}, void 0 !== _fil_data.time_limit && _fil_data.time_limit !== this.model.get_checker_limit("time", this.language_key) && (_fil_data.time_limit === this.language_data.def_time ? this.model.get_checker_limit("time", this.language_key) && (resp.time_limit = _fil_data.time_limit) :resp.time_limit = _fil_data.time_limit), 
void 0 !== _fil_data.mem_limit && _fil_data.mem_limit !== this.model.get_checker_limit("mem", this.language_key) && (_fil_data.mem_limit === this.language_data.def_mem ? this.model.get_checker_limit("mem", this.language_key) && (resp.mem_limit = _fil_data.mem_limit) :resp.mem_limit = _fil_data.mem_limit), 
void 0 !== _fil_data.template_head && (lang_default_text[this.language_key] === _fil_data.template_head ? this.model.get("" + this.language_key + "_template_head") && (resp.template_head = null) :"" === _fil_data.template_head ? this.model.get("" + this.language_key + "_template_head") && (resp.template_head = _fil_data.template_head) :_fil_data.template_head !== this.model.get("" + this.language_key + "_template_head") && (resp.template_head = _fil_data.template_head)), 
void 0 !== _fil_data.template_body && (template_body = this.model.get("" + this.language_key + "_template") || this.model.get("" + this.language_key + "_template_body"), 
_fil_data.template_body !== template_body && ("" === _fil_data.template_body ? template_body && (resp.template_body = _fil_data.template_body) :resp.template_body = _fil_data.template_body)), 
void 0 !== _fil_data.template_tail && _fil_data.template_tail !== this.model.get("" + this.language_key + "_template_tail") && ("" === _fil_data.template_tail ? this.model.get("" + this.language_key + "_template_tail") && (resp.template_tail = _fil_data.template_tail) :resp.template_tail = _fil_data.template_tail), 
resp;
}, Administration_ChallengeEditLanguagesListDropdownView.prototype.getData = function() {
return {
time_limit:this.time_final_value,
mem_limit:this.mem_final_value,
template_head:this.thead_editor ? this.thead_editor.getValue() :null,
template_body:this.tbody_editor ? this.tbody_editor.getValue() :null,
template_tail:this.ttail_editor ? this.ttail_editor.getValue() :null
};
}, Administration_ChallengeEditLanguagesListDropdownView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_ChallengeEditLanguagesListDropdownView = Administration_ChallengeEditLanguagesListDropdownView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_ChallengeEditLanguagesListView, HR, _ref;
return Administration_ChallengeEditLanguagesListView = function(_super) {
function Administration_ChallengeEditLanguagesListView() {
return Administration_ChallengeEditLanguagesListView.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_ChallengeEditLanguagesListView, _super), Administration_ChallengeEditLanguagesListView.prototype.template = "administration/challenge-edit-languages-list", 
Administration_ChallengeEditLanguagesListView.prototype.className = "administration-challenge-edit-languages-list", 
Administration_ChallengeEditLanguagesListView.prototype.initialize = function(options) {
return null == options && (options = {}), this.language_key = options.language_key, 
this.language_data = options.language_data;
}, Administration_ChallengeEditLanguagesListView.prototype.events = {
"click .edit-lang":"openIt",
"click .cancel":"closeIt",
"click .save-lang":"saveIt"
}, Administration_ChallengeEditLanguagesListView.prototype.render = function() {
var that;
return $(this.el).html(HR.appController.template(this.template, this)({
language_data:this.language_data,
model:this.model,
language_key:this.language_key,
has_languages:_.indexOf(this.model.get("languages"), this.language_key) > -1
})), this.$("input[type=checkbox]").iCheck({
checkboxClass:"icheckbox_square-green",
radioClass:"iradio_square-green",
increaseArea:"20%"
}), that = this, this.$("input[type=checkbox]").on("ifChecked", function() {
return that.model.toggleLanguage({
language_key:that.language_key,
state:"enable"
});
}), this.$("input[type=checkbox]").on("ifUnchecked", function() {
return that.model.toggleLanguage({
language_key:that.language_key,
state:"disable"
});
}), this.delegateEvents(), this;
}, Administration_ChallengeEditLanguagesListView.prototype.openDropdown = function() {
return this.closeDropdown(), this.$(".language-card-dropdown").html("<div class='language-card-dropdown-inner'></div>"), 
this.dropdown_view = new HR.Administration_ChallengeEditLanguagesListDropdownView({
language_key:this.language_key,
language_data:this.language_data,
parent:this,
model:this.model
}), this.dropdown_view.setElement(this.$(".language-card-dropdown-inner")).render();
}, Administration_ChallengeEditLanguagesListView.prototype.closeDropdown = function() {
return this.dropdown_view ? this.dropdown_view.unbind().remove() :void 0;
}, Administration_ChallengeEditLanguagesListView.prototype.openIt = function(e) {
return $(e.currentTarget).removeClass("edit-lang").addClass("save-lang"), $(e.currentTarget).find("i").removeClass("icon-pencil").addClass("icon-floppy"), 
this.$(".language-card .cancel").removeClass("hide"), this.$(".language-card").addClass("language-card-expand"), 
this.openDropdown();
}, Administration_ChallengeEditLanguagesListView.prototype.closeIt = function() {
return this.$(".save-lang").removeClass("save-lang").addClass("edit-lang"), this.$(".edit-lang").find("i").removeClass("icon-floppy").addClass("icon-pencil"), 
this.$(".language-card .cancel").addClass("hide"), this.$(".language-card span.time-value").html(this.model.get_checker_limit("time", this.language_key) || this.language_data.def_time), 
this.$(".language-card span.mem-value").html(this.model.get_checker_limit("mem", this.language_key) || this.language_data.def_mem), 
this.$(".language-card").removeClass("language-card-expand"), this.closeDropdown();
}, Administration_ChallengeEditLanguagesListView.prototype.saveIt = function(e) {
var diff;
return this.$(e.currentTarget).removeClass("save-lang").addClass("edit-lang"), this.$(e.currentTarget).find("i").removeClass("icon-floppy").addClass("icon-pencil"), 
this.$(".language-card .cancel").addClass("hide"), this.$(".language-card").removeClass("language-card-expand"), 
diff = this.dropdown_view.getFinalValues(), _.size(diff) > 0 && (this.model.update_language_data(diff, this.language_key), 
diff.challenge_id = this.model.get("id"), diff.language_key = this.language_key, 
new HR.Administration_ChallengeLanguageModel(diff).save()), this.closeDropdown();
}, Administration_ChallengeEditLanguagesListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_ChallengeEditLanguagesListView = Administration_ChallengeEditLanguagesListView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_ChallengeEditLanguagesView, HR, _ref;
return Administration_ChallengeEditLanguagesView = function(_super) {
function Administration_ChallengeEditLanguagesView() {
return Administration_ChallengeEditLanguagesView.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_ChallengeEditLanguagesView, _super), Administration_ChallengeEditLanguagesView.prototype.template = "administration/challenge-edit-languages", 
Administration_ChallengeEditLanguagesView.prototype.className = "administration-challenge-edit-languages", 
Administration_ChallengeEditLanguagesView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model,
_model:this.model.toJSON()
})), this.renderLanguages(), this;
}, Administration_ChallengeEditLanguagesView.prototype.renderLanguages = function() {
return this.$(".language-cards-list-container").length > 0 && !this.$(".language-cards-list-container").html() ? (this._subviews && 0 !== this._subviews.length || _.each(codechecker_resource_limits, function(v, k) {
var _view;
return _view = new HR.Administration_ChallengeEditLanguagesListView({
language_key:k,
language_data:v,
parent:this,
model:this.model
}), this.add_subview(_view);
}, this), _.each(this._subviews, function(_subview) {
return this.$(".language-cards-list-container").append(_subview.render().el);
}, this)) :void 0;
}, Administration_ChallengeEditLanguagesView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_ChallengeEditLanguagesView = Administration_ChallengeEditLanguagesView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_ChallengeEditOverviewView, HR, _ref;
return Administration_ChallengeEditOverviewView = function(_super) {
function Administration_ChallengeEditOverviewView() {
return Administration_ChallengeEditOverviewView.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_ChallengeEditOverviewView, _super), Administration_ChallengeEditOverviewView.prototype.template = "administration/challenge-edit-overview", 
Administration_ChallengeEditOverviewView.prototype.className = "administration-challenge-edit-overview", 
Administration_ChallengeEditOverviewView.prototype.initialize = function(options) {
return this.action = options.action, this.parent = options.parent, this.listenTo(this.model, "reset", this.render), 
this.saveChallenge = function(_this) {
return function() {
return _this.data_rendered && _this.changed() ? _this.parent.$("button.save-challenge").click() :void 0;
};
}(this), this.throttledSave = _.throttle(this.saveChallenge, 1e3);
}, Administration_ChallengeEditOverviewView.prototype.events = {
"focusout input.auto-save":"autoSave",
"focusout textarea.auto-save":"autoSave",
"click a.edit-slug":"editSlug",
"click a.cancel-update-slug":"cancelUpdateSlug",
"click a.update-slug":"updateSlug",
"keypress input.edit-slug":"editSlugEnterKeyBinding",
"keyup textarea.description":"updateDescriptionMessage",
"keypress input#moderator":"addModEnterKeyBinding",
"click button.moderator-save":"addMod",
"click a.remove-moderator":"removeMod"
}, Administration_ChallengeEditOverviewView.prototype.render = function() {
var editorOptions, that;
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model,
_model:this.model.toJSON(),
action:this.action
})), editorOptions = {
lineNumbers:!0,
lineWrapping:!0,
matchBrackets:!0,
autoCloseBrackets:!0,
cursorScrollMargin:2,
mode:"text/x-markdown",
indentUnit:4,
tabSize:4,
lineWrapping:!0
}, this.$("textarea.problem-statement").get(0) && (this.problem_statement_editor = CodeMirror.fromTextArea(this.$("textarea.problem-statement").get(0), editorOptions), 
this.problem_statement_editor.on("change", this.throttledSave)), that = this, this.$("input.tags").length > 0 && this.$("input.tags").tagsInput({
width:"98%",
autocomplete_url:"/rest/tags/autocomplete?f=autocomplete",
onChange:function() {
return that.autoSave();
}
}), "create" !== this.action && this.$("#moderator").length > 0 && (that = this, 
this.$("#moderator").autocomplete({
minLength:2,
source:function(request, response) {
return $.ajax({
url:"/rest/hackers/autocomplete?limit=4",
data:{
q:request.term
},
success:function(data) {
return response(data);
}
});
},
select:function(event, ui) {
return that.$("input#moderator").val(ui.item.value), that.$("button.moderator-save").click(), 
setTimeout(function() {
return that.$("input#moderator").val("");
}, 100);
}
}).data("autocomplete")._renderItem = function(ul, item) {
return $("<li></li>").data("item.autocomplete", item).append($("<a></a>").append($("<div class='hacker-container'> <div class='hacker-avatar'> <img height='50' width='50' onerror=\"this.src='https://d3rpyts3de3lx8.cloudfront.net/hackerrank/assets/gravatar.jpg';\" class='pull-left avatar profile_avatar' src='/rest/hackers/" + HR.util.trim(item.value) + "/avatar'> </div> <div class='hacker-details'> <p class='hacker-username'>" + item.value + "</p> </div> </div>"))).appendTo(ul);
}), this.setData(this.model.toJSON()), this;
}, Administration_ChallengeEditOverviewView.prototype.setData = function(data) {
return "create" !== this.action ? (data.name && this.$("input#name").val(data.name), 
data.preview && (this.$("textarea.description").val(data.preview), data.preview.length > this.model.max_limit.description ? this.$("small.description").html("Characters left: -" + (data.preview.length - this.model.max_limit.description)).addClass("error").removeClass("hint") :this.$("small.description").html("Characters left: " + (this.model.max_limit.description - data.preview.length)).addClass("hint").removeClass("error")), 
data.body && this.problem_statement_editor && this.problem_statement_editor.setValue(data.body), 
data.tags && data.tags.length > 0 && this.$("input.tags").silentImportTags(data.tags.join()), 
this.checkRenderedData()) :void 0;
}, Administration_ChallengeEditOverviewView.prototype.checkRenderedData = function() {
return this.rendered() && !this.changed() ? this.data_rendered = !0 :void 0;
}, Administration_ChallengeEditOverviewView.prototype.rendered = function() {
return this.$("input#name").length > 0 && this.$("textarea.description").length > 0 && this.problem_statement_editor ? !0 :!1;
}, Administration_ChallengeEditOverviewView.prototype.changed = function() {
return this.model.get("name") !== this.$("input#name").val() ? !0 :this.model.get("preview") !== this.$("textarea.description").val() ? !0 :this.model.get("body") !== this.problem_statement_editor.getValue() ? !0 :_.difference(this.model.getTags(), this.getTags()).length > 0 || _.difference(this.getTags(), this.model.getTags()).length > 0 ? !0 :!1;
}, Administration_ChallengeEditOverviewView.prototype.validate = function() {
return this.$(".error").html("").hide(), "" !== this.$("input#name").val() && this.$("textarea.description").val().length <= this.model.max_limit.description && this.problem_statement_editor.getValue().length > 0 ? !0 :("" === this.$("input#name").val() && this.$(".error.name").html(HR.util.getErrorList([ "Challenge name can't be empty" ])).show(), 
0 === this.problem_statement_editor.getValue().length && this.$(".error.problem-statement").html(HR.util.getErrorList([ "Problem statement can't be empty" ])).show(), 
!1);
}, Administration_ChallengeEditOverviewView.prototype.getData = function() {
var data;
return data = {}, data.name = this.$("input#name").val(), data.preview = this.$("textarea.description").val(), 
"" === data.preview && (data.preview = null), data.body = this.problem_statement_editor ? this.problem_statement_editor.getValue() :null, 
data.tags = this.getTags(), "" === data.body && (data.body = null), data;
}, Administration_ChallengeEditOverviewView.prototype.getTags = function() {
return _.reject(_.uniq((this.$("input.tags").val() || "").split(",")), function(x) {
return "" === x;
});
}, Administration_ChallengeEditOverviewView.prototype.autoSave = function() {
return "create" !== this.action ? this.saveChallenge() :void 0;
}, Administration_ChallengeEditOverviewView.prototype.editSlug = function(e) {
return e.preventDefault(), $(e.currentTarget).hide(), this.$("p.slug").hide(), this.$("a.update-slug").show(), 
this.$("a.cancel-update-slug").show(), this.$("input.edit-slug").show().focus().val(this.$("input.edit-slug").val());
}, Administration_ChallengeEditOverviewView.prototype.cancelUpdateSlug = function(e) {
return e.preventDefault(), $(e.currentTarget).hide(), this.$("p.slug").show(), this.$("a.update-slug").hide(), 
this.$("input.edit-slug").hide(), this.$("a.edit-slug").show();
}, Administration_ChallengeEditOverviewView.prototype.updateSlug = function(e) {
var new_slug;
return e.preventDefault(), this.$(".slug.error").html("").hide(), new_slug = this.$("input.edit-slug").val(), 
new_slug !== this.model.get("slug") ? _.isEmpty(new_slug) ? this.$(".slug.error").html("slug can't be empty").show() :(this.model.set("slug", new_slug), 
this.model.save(null, {
silent:!0,
success:function(data) {
return data.status ? (this.$("p.slug").html(new_slug), this.$("a.cancel-update-slug").click()) :void 0;
}
})) :this.$("a.cancel-update-slug").click();
}, Administration_ChallengeEditOverviewView.prototype.editSlugEnterKeyBinding = function(e) {
return 13 === e.which ? this.$("a.update-slug").click() :void 0;
}, Administration_ChallengeEditOverviewView.prototype.updateDescriptionMessage = function(e) {
var new_description;
return e.preventDefault(), new_description = this.$(e.currentTarget).val(), new_description.length > this.model.max_limit.description ? this.$("small.description").html("Characters left: -" + (new_description.length - this.model.max_limit.description)).addClass("error").removeClass("hint") :this.$("small.description").html("Characters left: " + (this.model.max_limit.description - new_description.length)).addClass("hint").removeClass("error");
}, Administration_ChallengeEditOverviewView.prototype.addModEnterKeyBinding = function(e) {
return 13 === e.which ? this.$("button.moderator-save").click() :void 0;
}, Administration_ChallengeEditOverviewView.prototype.addMod = function() {
var username;
return username = $("input#moderator").val(), this.addModContainer(username) && this.addUserAsMod(username), 
this.$("input#moderator").val("");
}, Administration_ChallengeEditOverviewView.prototype.addModContainer = function(username) {
return 0 === this.$(".moderator-container[data-username=" + username + "]").length ? (this.$(".moderators-list").append(HR.util.genModContainer({
name:$("input#moderator").val(),
avatar:"/rest/hackers/" + username + "/avatar",
role:"moderator",
close:!0
})), this.$(".moderators-list remove-moderator[data-username=" + username + "]").bind("click", this.removeMod), 
!0) :!1;
}, Administration_ChallengeEditOverviewView.prototype.removeMod = function(e) {
var username;
return username = $(e.currentTarget).attr("data-username"), this.$(".moderator-container[data-username=" + username + "]").remove(), 
this.removeUserAsMod(username);
}, Administration_ChallengeEditOverviewView.prototype.addUserAsMod = function(username) {
var that;
return that = this, $.ajax({
url:this.model.mod_url(username),
type:"POST",
success:function(data) {
return data.status ? void 0 :that.$(".moderator-container[data-username=" + username + "]").remove();
}
});
}, Administration_ChallengeEditOverviewView.prototype.removeUserAsMod = function(username) {
var that;
return that = this, $.ajax({
url:this.model.mod_url(username),
type:"DELETE",
success:function(data) {
return data.status ? void 0 :that.addModContainer(username);
}
});
}, Administration_ChallengeEditOverviewView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_ChallengeEditOverviewView = Administration_ChallengeEditOverviewView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_ChallengeEditRemoveTestCaseDialog, HR, _ref;
return Administration_ChallengeEditRemoveTestCaseDialog = function(_super) {
function Administration_ChallengeEditRemoveTestCaseDialog() {
return Administration_ChallengeEditRemoveTestCaseDialog.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_ChallengeEditRemoveTestCaseDialog, _super), Administration_ChallengeEditRemoveTestCaseDialog.prototype.template = "administration/challenge-edit-delete-testcase-dialog", 
Administration_ChallengeEditRemoveTestCaseDialog.prototype.className = "administration-challenge-edit-delete-testcase-dialog", 
Administration_ChallengeEditRemoveTestCaseDialog.prototype.initialize = function(options) {
return null == options && (options = {}), this.e = options.e, this.parent = options.parent, 
this.test_case = options.test_case, this.test_case_index = options.test_case_index, 
this.el = "#" + this.className + "-" + this.cid;
}, Administration_ChallengeEditRemoveTestCaseDialog.prototype.render = function() {
return $(this.e.currentTarget).removeAttr("disabled"), 0 === $(this.el).length && ($("body").append("<div class='on-the-fly-dialog-container'></div> <div class='" + this.className + " on-the-fly-dialog position-fixed' id='" + this.className + "-" + this.cid + "'> <div class='dlg-header'> <p class='pull-left'><b>Remove Testcase</b></p> <a class='pull-right close-button'><b>&#215;</b></a> <div class='clearfix'></div> </div> <div class='dlg-content'> " + HR.appController.viewLoader(64) + "</div> </div> </div>"), 
this.$el = $(this.el)), $(this.el).find(".dlg-content").html(HR.appController.template(this.template, this)({
model:this.model,
_model:this.model.toJSON(),
test_case:this.test_case,
_test_case:this.test_case.toJSON(),
test_case_index:this.test_case_index
})), this.delegateEvents();
}, Administration_ChallengeEditRemoveTestCaseDialog.prototype.events = {
"click a.close-button":"closeDialog",
"click button.dont-delete":"closeDialog",
"click .delete-testcase":"deleteTestcase"
}, Administration_ChallengeEditRemoveTestCaseDialog.prototype.closeDialog = function() {
return $(".on-the-fly-dialog-container").remove(), this.destroy(), $(this.el).remove();
}, Administration_ChallengeEditRemoveTestCaseDialog.prototype.deleteTestcase = function(e) {
var that;
return e.preventDefault(), "disabled" !== $(e.currentTarget).attr("disabled") ? ($(e.currentTarget).attr("disabled", "disabled"), 
$(e.currentTarget).html("Deleting"), this.$("span.nb-spacing").remove(), this.$("button.dont-delete").remove(), 
this.$("a.close-button").remove(), that = this, this.test_case.destroy({
success:function() {
return that.parent.collection.remove(this.test_case), that.closeDialog();
}
})) :void 0;
}, Administration_ChallengeEditRemoveTestCaseDialog;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_ChallengeEditRemoveTestCaseDialog = Administration_ChallengeEditRemoveTestCaseDialog;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_ChallengeEditUploadZipDialog, HR, _ref;
return Administration_ChallengeEditUploadZipDialog = function(_super) {
function Administration_ChallengeEditUploadZipDialog() {
return Administration_ChallengeEditUploadZipDialog.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_ChallengeEditUploadZipDialog, _super), Administration_ChallengeEditUploadZipDialog.prototype.template = "administration/challenge-edit-upload-zip-dialog", 
Administration_ChallengeEditUploadZipDialog.prototype.className = "administration-challenge-edit-upload-zip-dialog", 
Administration_ChallengeEditUploadZipDialog.prototype.initialize = function(options) {
return null == options && (options = {}), this.e = options.e, this.parent = options.parent, 
this.el = "#" + this.className + "-" + this.cid;
}, Administration_ChallengeEditUploadZipDialog.prototype.render = function() {
return $(this.e.currentTarget).removeAttr("disabled"), 0 === $(this.el).length && ($("body").append("<div class='on-the-fly-dialog-container'></div> <div class='" + this.className + " on-the-fly-dialog position-fixed' id='" + this.className + "-" + this.cid + "'> <div class='dlg-header'> <p class='pull-left'><b>Upload Zip</b></p> <a class='pull-right close-button'><b>&#215;</b></a> <div class='clearfix'></div> </div> <div class='dlg-content'> " + HR.appController.viewLoader(64) + "</div> </div> </div>"), 
this.$el = $(this.el)), $(this.el).find(".dlg-content").html(HR.appController.template(this.template, this)({
model:this.model,
_model:this.model.toJSON(),
collection:this.collection,
_collection:this.collection.toJSON()
})), this.delegateEvents();
}, Administration_ChallengeEditUploadZipDialog.prototype.events = {
"click a.close-button":"closeDialog",
"click button.dont-delete":"closeDialog",
"click button.continue-delete-and-upload":"showUploadZipForm",
"click button.upload-zip-button":"uploadZip"
}, Administration_ChallengeEditUploadZipDialog.prototype.closeDialog = function() {
return $(".on-the-fly-dialog-container").remove(), this.destroy(), $(this.el).remove();
}, Administration_ChallengeEditUploadZipDialog.prototype.showUploadZipForm = function() {
var that;
return that = this, this.$(".warning-dialog").fadeOut(300, function() {
return that.$(".upload-zip-form").show();
});
}, Administration_ChallengeEditUploadZipDialog.prototype.uploadZip = function(e) {
var form_data, that, zip_file, _ref;
return that = this, zip_file = $("input.upload-zip").get(0).files[0], !zip_file || "application/zip" !== (_ref = zip_file.type) && "application/x-zip" !== _ref && "application/octet-stream" !== _ref && "application/x-zip-compressed" !== _ref ? zip_file ? alert("Invalid file type. Please select a zip file to upload.") :alert("Please select a zip file to upload.") :(form_data = new FormData(), 
form_data.append("zip_file", zip_file), $(e.currentTarget).attr("disabled", "disabled"), 
$(e.currentTarget).html("Uploading..."), $.ajax("/rest/administration/challenges/" + this.model.get("id") + "/test_cases/upload_zip", {
data:form_data,
type:"POST",
processData:!1,
contentType:!1,
success:function(data) {
return $(e.currentTarget).removeAttr("disabled"), data.status ? (that.parent.collection.reset(data.models), 
$(e.currentTarget).html("Uploaded"), setTimeout(function() {
return that.closeDialog();
}, 300)) :(alert(data.errors[0]), $(e.currentTarget).html("Upload"));
},
error:function(resp) {
return $(e.currentTarget).removeAttr("disabled"), $(e.currentTarget).html("Upload"), 
413 === resp.status ? alert("You exceeded the maximum allowed filesize limit for the zip file. Please either try individual testcase upload or contact hackers@hackerrank.com.") :alert("There was a error. Please try again.");
}
}));
}, Administration_ChallengeEditUploadZipDialog;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_ChallengeEditUploadZipDialog = Administration_ChallengeEditUploadZipDialog;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_ChallengeEditView, HR, _ref;
return Administration_ChallengeEditView = function(_super) {
function Administration_ChallengeEditView() {
return Administration_ChallengeEditView.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_ChallengeEditView, _super), Administration_ChallengeEditView.prototype.template = "administration/challenge-edit", 
Administration_ChallengeEditView.prototype.className = "administration-challenge-edit", 
Administration_ChallengeEditView.prototype.initialize = function(options) {
return this.action = options.action, this.tab = options.tab, this.challenge_id = options.challenge_id, 
this.contest_id = options.contest_id, this.contest = HR.model("contest", {
id:options.contest_id
}), this.contest.cached(), this.listenTo(this.model, "reset", this.render);
}, Administration_ChallengeEditView.prototype.events = {
"click a.change-tab":"changeTab",
"click button.save-challenge":"saveChallenge"
}, Administration_ChallengeEditView.prototype.render = function() {
return "create" === this.action || this.model.sync_status ? ($(this.el).html(HR.appController.template(this.template, this)({
model:this.model,
_model:this.model.toJSON(),
action:this.action,
tab:this.tab,
contest_id:this.contest_id,
contest:this.contest.toJSON()
})), "create" === this.action ? this.$("li[data-tab=overview]").addClass("active") :this.$("li[data-tab=" + this.tab + "]").addClass("active"), 
this.prev_tab && this.tab === this.prev_tab || (this.prev_tab && (this.tab_view.destroy(), 
this._subviews = [], this.$(".tab-body").html("<div class='tabs-body-inner'></div>")), 
"languages" === this.tab ? (this.tab_view = new HR.Administration_ChallengeEditLanguagesView({
model:this.model
}), this.add_subview(this.tab_view)) :"testcases" === this.tab ? (this.tab_view = new HR.Administration_ChallengeEditTestcasesView({
model:this.model
}), this.add_subview(this.tab_view)) :(this.tab_view = new HR.Administration_ChallengeEditOverviewView({
model:this.model,
action:this.action,
parent:this
}), this.add_subview(this.tab_view))), this.prev_tab = this.tab, this.tab_view.setElement(this.$(".tabs-body-inner")).render(), 
this) :this;
}, Administration_ChallengeEditView.prototype.changeTab = function(e) {
var tab, url;
return e.preventDefault(), $(e.currentTarget).parent().hasClass("active") ? void 0 :(tab = $(e.currentTarget).parent().attr("data-tab"), 
url = "/administration/", this.contest_id && (url += "contests/edit/" + this.contest_id + "/"), 
url += "challenges/" + this.action, this.challenge_id && (url += "/" + this.challenge_id), 
tab && (url += "/" + tab), HR.router.navigate(url, !1), this.tab = tab, this.render());
}, Administration_ChallengeEditView.prototype.saveChallenge = function(e) {
var challenge, that;
return e.preventDefault(), $(e.currentTarget).is(":disabled") ? void 0 :($(e.currentTarget).html("Saving..."), 
$(e.currentTarget).attr("disabled", "disabled"), "create" === this.action ? this.tab_view.validate && this.tab_view.validate() ? (challenge = new HR.Administration_ChallengeModel(this.tab_view.getData()), 
this.contest_id && challenge.set("contest_id", this.contest_id), that = this, challenge.save(null, {
success:function(model) {
var url;
return url = that.contest_id ? "/administration/contests/edit/" + that.contest_id + "/challenges/edit/" + model.get("id") :"/administration/challenges/edit/" + model.get("id"), 
HR.router.navigate(url, {
trigger:!0,
replace:!0
}), $(e.currentTarget).removeAttr("disabled"), $(e.currentTarget).html("Save Challenge");
}
})) :($(e.currentTarget).removeAttr("disabled"), $(e.currentTarget).html("Save Challenge")) :this.tab_view ? this.tab_view.validate && this.tab_view.validate() ? (that = this, 
this.model.save(this.tab_view.getData(), {
silent:!0,
success:function() {
return that.$("button.save-challenge").removeAttr("disabled"), that.$("button.save-challenge").html("Save Challenge");
}
})) :($(e.currentTarget).removeAttr("disabled"), $(e.currentTarget).html("Save Challenge")) :($(e.currentTarget).removeAttr("disabled"), 
$(e.currentTarget).html("Save Challenge")));
}, Administration_ChallengeEditView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_ChallengeEditView = Administration_ChallengeEditView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_CompanyEditApplicantsView;
return Administration_CompanyEditApplicantsView = function(_super) {
function Administration_CompanyEditApplicantsView() {
return Administration_CompanyEditApplicantsView.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_CompanyEditApplicantsView, _super), Administration_CompanyEditApplicantsView.prototype.template = "administration/company-edit-applicants", 
Administration_CompanyEditApplicantsView.prototype.className = "administration-company-edit-applicants", 
Administration_CompanyEditApplicantsView.prototype.initialize = function(options) {
var clbk, that;
return null == options && (options = {}), that = this, clbk = function(collection) {
return collection.company_id = that.model.get("id");
}, this.company_contests = HR.appController.getCollection("administration-company-contests", "company-id-" + that.model.get("id"), clbk), 
this.listenTo(this.company_contests, "reset", this.render), this.listenTo(this.company_contests, "change", this.render);
}, Administration_CompanyEditApplicantsView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model,
_model:this.model.toJSON(),
collection:this.company_contests,
_collection:this.company_contests.toJSON()
})), this;
}, Administration_CompanyEditApplicantsView;
}(window.HR.GenericView), HR.Administration_CompanyEditApplicantsView = Administration_CompanyEditApplicantsView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_CompanyEditHackerboardSubmissionsView, HR, _ref;
return Administration_CompanyEditHackerboardSubmissionsView = function(_super) {
function Administration_CompanyEditHackerboardSubmissionsView() {
return Administration_CompanyEditHackerboardSubmissionsView.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_CompanyEditHackerboardSubmissionsView, _super), 
Administration_CompanyEditHackerboardSubmissionsView.prototype.template = "administration/company-edit-hackerboard-submissions", 
Administration_CompanyEditHackerboardSubmissionsView.prototype.className = "administration-company-edit-hackerboard-submissions", 
Administration_CompanyEditHackerboardSubmissionsView.prototype.initialize = function(options) {
var clbk, that;
return this.leader = options.leader, this.company = options.company, this.contest_id = options.contest_id, 
that = this, clbk = function(collection) {
return collection.company_id = that.company.get("id"), collection.contest_id = that.contest_id, 
collection.hacker_id = that.leader.hacker_id;
}, this.collection = HR.appController.getCollection("administration-hackerboard-submissions", "company-id-" + this.company.get("id") + "_contest-id" + this.contest_id + "_hacker-id" + this.leader.hacker_id, clbk), 
this.listenTo(this.collection, "reset", this.render), this.listenTo(this.collection, "change", this.render);
}, Administration_CompanyEditHackerboardSubmissionsView.prototype.render = function() {
var editorOptions;
return $(this.el).html(HR.appController.template(this.template, this)({
collection:this.collection,
_collection:this.collection.toJSON()
})), editorOptions = {
lineNumbers:!0,
lineWrapping:!0,
matchBrackets:!0,
indentUnit:4,
readOnly:!0
}, $(this.el).find("textarea").each(function(index, textarea) {
var language;
return language = $(textarea).attr("data-language"), editorOptions.mode = lang_mime_mapping[language], 
CodeMirror.fromTextArea(textarea, editorOptions);
});
}, Administration_CompanyEditHackerboardSubmissionsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_CompanyEditHackerboardSubmissionsView = Administration_CompanyEditHackerboardSubmissionsView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_CompanyEditHackerboardView, HR, _ref;
return Administration_CompanyEditHackerboardView = function(_super) {
function Administration_CompanyEditHackerboardView() {
return Administration_CompanyEditHackerboardView.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_CompanyEditHackerboardView, _super), Administration_CompanyEditHackerboardView.prototype.template = "administration/company-edit-hackerboard", 
Administration_CompanyEditHackerboardView.prototype.className = "administration-company-edit-hackerboard", 
Administration_CompanyEditHackerboardView.prototype.initialize = function(options) {
var that, _clbk;
return this.tab_id = options.tab_id, this.page = options.page, this.contest_id = options.tab_id, 
this.hacker_id = options.hacker_id, this.listenTo(this.model, "reset", this.render), 
this.listenTo(this.model, "change", this.render), that = this, _clbk = function(collection) {
return collection.company_id = that.model.get("id"), collection.contest_id = that.contest_id, 
collection.page = that.page;
}, this.hackerboard = HR.appController.getCollection("administration-hackerboard", "company-id-" + this.model.get("id") + "-contest-id-" + this.contest_id + "-page-" + this.page, _clbk), 
this.listenTo(this.hackerboard, "reset", this.render), this.listenTo(this.hackerboard, "change", this.render);
}, Administration_CompanyEditHackerboardView.prototype.events = {
"click .hacker-list-item":"changeDetails",
"click button.action-shortlist":"shortlistHacker",
"click button.action-undo":"unShortlistHacker"
}, Administration_CompanyEditHackerboardView.prototype.render = function() {
var leader;
return _.each(this.hackerboard.models, function(model) {
var _model;
return HR.HackerboardStarredList || (HR.HackerboardStarredList = {}), HR.HackerboardStarredList[model.get("hacker_id")] === !0 ? (_model = this.hackerboard.get(model.get("id")), 
_model.set("shortlisted", !0), this.hackerboard.set(_model, {
add:!1,
remove:!1,
merge:!0
})) :HR.HackerboardStarredList[model.get("hacker_id")] === !1 ? (_model = this.hackerboard.get(model.get("id")), 
_model.set("shortlisted", !1), this.hackerboard.set(_model, {
add:!1,
remove:!1,
merge:!0
})) :void 0;
}, this), leader = this.hacker_id ? this.getLeader() :null, $(this.el).html(HR.appController.template(this.template, this)({
model:this.model,
_model:this.model.toJSON(),
hackerboard:this.hackerboard,
_hackerboard:this.hackerboard.toJSON(),
hacker_id:this.hacker_id,
leader:leader
})), HR.util.pagination(this.$(".pagination-wrapper"), this.hackerboard.getTotal(), this.hackerboard.pageURL(), this.hackerboard.getCurrentPage(), null, null, 3), 
leader && $(this.el).find(".submissions-inner").length > 0 ? (this.submission_view = new HR.Administration_CompanyEditHackerboardSubmissionsView({
leader:leader,
company:this.model,
contest_id:this.contest_id
}), this.add_subview(this.submission_view), this.submission_view.setElement($(this.el).find(".submissions-inner")).render()) :void 0;
}, Administration_CompanyEditHackerboardView.prototype.changeDetails = function(e) {
var hacker_id;
return hacker_id = $(e.currentTarget).attr("data-id"), HR.router.navigate("/administration/companies/edit/" + ("" + this.model.get("id") + "/applicants/" + this.contest_id) + ("/page/" + this.hackerboard.getCurrentPage() + "/hackers/" + hacker_id), !0);
}, Administration_CompanyEditHackerboardView.prototype.shortlistHacker = function(e) {
var hacker_id, model, that;
if (!$(e.currentTarget).is(":disabled")) return $(e.currentTarget).attr("disabled", "disabled"), 
$(e.currentTarget).html("Shortlisting..."), hacker_id = $(e.currentTarget).attr("data-id"), 
that = this, model = new HR.Administration_CompanyHackerShortlistModel(), model.set("hacker_id", hacker_id), 
model.set("contest_id", this.contest_id), model.set("company_id", this.model.get("id")), 
model.save(null, {
success:function() {
return $(e.currentTarget).html("Shortlisted"), $(e.currentTarget).next().show(), 
that.updateStar(hacker_id, "add");
}
});
}, Administration_CompanyEditHackerboardView.prototype.unShortlistHacker = function(e) {
var hacker_id, model, that;
return hacker_id = $(e.currentTarget).attr("data-id"), $(e.currentTarget).is(":disabled") ? void 0 :($(e.currentTarget).attr("disabled", "disabled"), 
$(e.currentTarget).html("undoing..."), model = new HR.Administration_CompanyHackerShortlistModel(), 
model.set("hacker_id", hacker_id), model.set("contest_id", this.contest_id), model.set("company_id", this.model.get("id")), 
that = this, $.ajax({
url:model.url(),
type:"DELETE",
success:function() {
return $(e.currentTarget).hide(), $(e.currentTarget).html("undo"), $(e.currentTarget).prev().removeAttr("disabled"), 
$(e.currentTarget).prev().html("Shortlist"), that.updateStar(hacker_id, "remove");
}
}));
}, Administration_CompanyEditHackerboardView.prototype.updateStar = function(hacker_id, action) {
return _.each(this.hackerboard.models, function(model) {
var _model;
return parseInt(model.get("hacker_id")) === parseInt(hacker_id) ? (_model = this.hackerboard.get(model.get("id")), 
HR.HackerboardStarredList || (HR.HackerboardStarredList = {}), "add" === action ? (HR.HackerboardStarredList[hacker_id] = !0, 
_model.set("shortlisted", !0)) :"remove" === action && (HR.HackerboardStarredList[hacker_id] = !1, 
_model.set("shortlisted", !1)), this.hackerboard.set(_model, {
add:!1,
remove:!1,
merge:!0
})) :void 0;
}, this), _.each(this.$("display-starred"), function(el) {
var _hacker_id;
if (_hacker_id = $(el).attr("data-id"), parseInt(hacker_id) === parseInt(_hacker_id)) {
if ("add" === action) return $(el).removeClass("hide");
if ("remove" === action) return $(el).addClass("hide");
}
}, this);
}, Administration_CompanyEditHackerboardView.prototype.getLeader = function() {
var that;
return that = this, _.first(_.filter(this.hackerboard.toJSON(), function(leader) {
return leader.hacker_id === parseInt(that.hacker_id);
}));
}, Administration_CompanyEditHackerboardView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_CompanyEditHackerboardView = Administration_CompanyEditHackerboardView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_CompanyEditOfficesAddOfficeView;
return Administration_CompanyEditOfficesAddOfficeView = function(_super) {
function Administration_CompanyEditOfficesAddOfficeView() {
return Administration_CompanyEditOfficesAddOfficeView.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_CompanyEditOfficesAddOfficeView, _super), Administration_CompanyEditOfficesAddOfficeView.prototype.template = "administration/company-edit-offices-add-office", 
Administration_CompanyEditOfficesAddOfficeView.prototype.className = "administration-company-edit-offices-add-office", 
Administration_CompanyEditOfficesAddOfficeView.prototype.initialize = function(options) {
return null == options && (options = {}), this.company = options.company;
}, Administration_CompanyEditOfficesAddOfficeView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model,
_model:this.model.toJSON()
})), this.setData(this.model.toJSON()), this;
}, Administration_CompanyEditOfficesAddOfficeView.prototype.setData = function() {
var city;
return this.setUpCountrySelector(), city = this.model.get("city"), city ? this.$("input#city").val(city.name) :void 0;
}, Administration_CompanyEditOfficesAddOfficeView.prototype.setUpCountrySelector = function() {
var countries, country, data;
return countries = window.countries_mapping, data = [], _.each(countries, function() {
return function(iso, name) {
return data.push({
id:name,
text:name
});
};
}(this)), $(this.el).find("#country").select2({
data:data,
width:"copy"
}), country = this.model.get("country"), country ? this.setCountry(country.name) :this.model.get("id") ? void 0 :this.setCountry("United States");
}, Administration_CompanyEditOfficesAddOfficeView.prototype.setCountry = function(country) {
return $(this.el).find("#country").val(country), $(this.el).find("#s2id_country .select2-choice span").text(country);
}, Administration_CompanyEditOfficesAddOfficeView.prototype.getCountry = function() {
return $(this.el).find("#country").val();
}, Administration_CompanyEditOfficesAddOfficeView.prototype.persist = function(btn, dialog) {
var that;
return btn.setInactive(), that = this, this.model.save({
city_name:this.$("input#city").val(),
country_name:this.getCountry()
}, {
success:function(data) {
return data.status ? (that.company.fetch(), dialog.destroy(), btn.setActive()) :void 0;
}
});
}, Administration_CompanyEditOfficesAddOfficeView;
}(window.HR.GenericView), HR.Administration_CompanyEditOfficesAddOfficeView = Administration_CompanyEditOfficesAddOfficeView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_CompanyEditOfficesView, HR, _ref;
return Administration_CompanyEditOfficesView = function(_super) {
function Administration_CompanyEditOfficesView() {
return Administration_CompanyEditOfficesView.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_CompanyEditOfficesView, _super), Administration_CompanyEditOfficesView.prototype.template = "administration/company-edit-offices", 
Administration_CompanyEditOfficesView.prototype.className = "administration-company-edit-offices", 
Administration_CompanyEditOfficesView.prototype.initialize = function(options) {
return this.model = options.model, this.listenTo(this.model, "reset", this.render), 
this.listenTo(this.model, "change", this.render);
}, Administration_CompanyEditOfficesView.prototype.events = {
"click .add-office":"addOffice",
"click .edit-office":"addOffice",
"click .remove-office":"removeOffice"
}, Administration_CompanyEditOfficesView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model,
_model:this.model.toJSON()
})), this;
}, Administration_CompanyEditOfficesView.prototype.addOffice = function(e) {
var action, action_btn, add_office_view, office, office_id, _office;
return office_id = $(e.currentTarget).attr("data-id"), office_id ? (_office = _.first(_.filter(this.model.get("company_offices"), function(office) {
return office.id === parseInt(office_id);
})), office = new HR.Administration_CompanyOfficeModel(_office), action = "Edit", 
action_btn = "Save") :(office = new HR.Administration_CompanyOfficeModel(), office.set("company_id", this.model.get("id")), 
action = "New", action_btn = "Create"), add_office_view = new HR.Administration_CompanyEditOfficesAddOfficeView({
model:office,
company:this.model
}), new HR.util.ShowDialog({
title:"" + action + " Office",
body_view:add_office_view,
width:500,
buttons:[ {
name:action_btn,
"class":"btn-primary",
callback:function(dialog) {
return add_office_view.persist(this, dialog);
}
}, {
name:"Cancel",
callback:function(dialog) {
return dialog.destroy();
}
} ]
}).render();
}, Administration_CompanyEditOfficesView.prototype.removeOffice = function(e) {
var office, office_id, that, _office;
return office_id = $(e.currentTarget).attr("data-id"), _office = _.first(_.filter(this.model.get("company_offices"), function(office) {
return office.id === parseInt(office_id);
})), office = new HR.Administration_CompanyOfficeModel(_office), that = this, new HR.util.ShowConfirmationDialog({
title:"Delete Office",
body:"Are you sure you want to delete this location?",
buttons:[ {
name:"Yes! Delete it!",
"class":"btn-primary",
callback:function(dialog) {
return this.setInactive(), office.destroy({
success:function() {
return that.model.fetch(), dialog.destroy();
}
});
}
}, {
name:"Cancel",
callback:function(dialog) {
return dialog.destroy();
}
} ]
}).render();
}, Administration_CompanyEditOfficesView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_CompanyEditOfficesView = Administration_CompanyEditOfficesView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_CompanyEditOverviewView, HR, _ref;
return Administration_CompanyEditOverviewView = function(_super) {
function Administration_CompanyEditOverviewView() {
return Administration_CompanyEditOverviewView.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_CompanyEditOverviewView, _super), Administration_CompanyEditOverviewView.prototype.template = "administration/company-edit-overview", 
Administration_CompanyEditOverviewView.prototype.className = "administration-company-edit-overview", 
Administration_CompanyEditOverviewView.prototype.initialize = function(options) {
return this.action = options.action, this.parent = options.parent, this.listenTo(this.model, "reset", this.render), 
this.saveCompany = function(_this) {
return function() {
return _this.data_rendered && _this.changed() ? _this.parent.$("button.save-company").click() :void 0;
};
}(this), this.throttledSave = _.throttle(this.saveCompany, 1e3);
}, Administration_CompanyEditOverviewView.prototype.events = {
"focusout input.auto-save":"autoSave",
"focusout textarea.auto-save":"autoSave",
"keyup textarea.pitch":"updatePitchMessage"
}, Administration_CompanyEditOverviewView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model,
_model:this.model.toJSON(),
action:this.action
})), this.setData(this.model.toJSON()), this;
}, Administration_CompanyEditOverviewView.prototype.setData = function(data) {
return "create" !== this.action ? (data.name && this.$("input#name").val(data.name), 
data.website && this.$("input#website").val(data.website), data.pitch && (this.$("textarea#pitch").val(data.pitch), 
data.pitch.length > this.model.max_limit.pitch ? this.$("small.pitch").html("Characters left: -" + (data.pitch.length - this.model.max_limit.pitch)).addClass("error").removeClass("hint") :this.$("small.pitch").html("Characters left: " + (this.model.max_limit.pitch - data.pitch.length)).addClass("hint").removeClass("error")), 
this.checkRenderedData()) :void 0;
}, Administration_CompanyEditOverviewView.prototype.getData = function() {
return {
name:this.$("input#name").val(),
website:this.$("input#website").val(),
pitch:this.$("textarea#pitch").val()
};
}, Administration_CompanyEditOverviewView.prototype.checkRenderedData = function() {
return this.rendered() && !this.changed() ? this.data_rendered = !0 :void 0;
}, Administration_CompanyEditOverviewView.prototype.rendered = function() {
return this.$("input#name").length > 0 && this.$("textarea.pitch").length > 0 ? !0 :!1;
}, Administration_CompanyEditOverviewView.prototype.changed = function() {
return this.model.get("name") !== this.$("input#name").val() ? !0 :this.model.get("website") !== this.$("input#website").val() ? !0 :this.model.get("pitch") !== this.$("input#pitch").val() ? !0 :!1;
}, Administration_CompanyEditOverviewView.prototype.validate = function() {
return this.$(".error").html("").hide(), "" !== this.$("input#name").val() && this.$("textarea.pitch").val().length <= this.model.max_limit.pitch ? !0 :("" === this.$("input#name").val() && this.$(".error.name").html(HR.util.getErrorList([ "Company name can't be empty" ])).show(), 
"" === this.$("input#website").val() && this.$(".error.website").html(HR.util.getErrorList([ "Company website can't be empty" ])).show(), 
"" === this.$("textarea#pitch").val() && this.$(".error.pitch").html(HR.util.getErrorList([ "Company pitch can't be empty" ])).show(), 
!1);
}, Administration_CompanyEditOverviewView.prototype.autoSave = function() {
return "create" !== this.action ? this.saveCompany() :void 0;
}, Administration_CompanyEditOverviewView.prototype.updatePitchMessage = function(e) {
var new_pitch;
return e.preventDefault(), new_pitch = this.$(e.currentTarget).val(), new_pitch.length > this.model.max_limit.pitch ? this.$("small.pitch").html("Characters left: -" + (new_pitch.length - this.model.max_limit.pitch)).addClass("error").removeClass("hint") :this.$("small.pitch").html("Characters left: " + (this.model.max_limit.pitch - new_pitch.length)).addClass("hint").removeClass("error");
}, Administration_CompanyEditOverviewView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_CompanyEditOverviewView = Administration_CompanyEditOverviewView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_CompanyEditPositionsAddPositionView;
return Administration_CompanyEditPositionsAddPositionView = function(_super) {
function Administration_CompanyEditPositionsAddPositionView() {
return Administration_CompanyEditPositionsAddPositionView.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_CompanyEditPositionsAddPositionView, _super), Administration_CompanyEditPositionsAddPositionView.prototype.template = "administration/company-edit-positions-add-position", 
Administration_CompanyEditPositionsAddPositionView.prototype.className = "administration-company-edit-positions-add-position", 
Administration_CompanyEditPositionsAddPositionView.prototype.initialize = function(options) {
return null == options && (options = {}), this.company = options.company;
}, Administration_CompanyEditPositionsAddPositionView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model,
_model:this.model.toJSON()
})), this.setData(this.model.toJSON()), this;
}, Administration_CompanyEditPositionsAddPositionView.prototype.setData = function() {
return this.model.get("name") && this.$("input#name").val(this.model.get("name")), 
this.model.get("description") ? this.$("textarea#description").val(this.model.get("description")) :void 0;
}, Administration_CompanyEditPositionsAddPositionView.prototype.getData = function() {
return {
name:this.$("input#name").val(),
description:this.$("textarea#description").val()
};
}, Administration_CompanyEditPositionsAddPositionView.prototype.persist = function(btn, dialog) {
var that;
return btn.setInactive(), that = this, this.model.save(this.getData(), {
success:function(data) {
return data.status ? (that.company.fetch(), dialog.destroy(), btn.setActive()) :void 0;
}
});
}, Administration_CompanyEditPositionsAddPositionView;
}(window.HR.GenericView), HR.Administration_CompanyEditPositionsAddPositionView = Administration_CompanyEditPositionsAddPositionView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_CompanyEditPositionsView, HR, _ref;
return Administration_CompanyEditPositionsView = function(_super) {
function Administration_CompanyEditPositionsView() {
return Administration_CompanyEditPositionsView.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_CompanyEditPositionsView, _super), Administration_CompanyEditPositionsView.prototype.template = "administration/company-edit-positions", 
Administration_CompanyEditPositionsView.prototype.className = "administration-company-edit-positions", 
Administration_CompanyEditPositionsView.prototype.initialize = function(options) {
return this.model = options.model;
}, Administration_CompanyEditPositionsView.prototype.events = {
"click .add-position":"addPosition",
"click .edit-position":"addPosition",
"click .remove-position":"removePosition"
}, Administration_CompanyEditPositionsView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model,
_model:this.model.toJSON()
})), this;
}, Administration_CompanyEditPositionsView.prototype.addPosition = function(e) {
var action, action_btn, add_position_view, position, position_id, _position;
return position_id = $(e.currentTarget).attr("data-id"), position_id ? (_position = _.first(_.filter(this.model.get("company_positions"), function(position) {
return position.id === parseInt(position_id);
})), position = new HR.Administration_CompanyPositionModel(_position), action = "Edit", 
action_btn = "Save") :(position = new HR.Administration_CompanyPositionModel(), 
position.set("company_id", this.model.get("id")), action = "New", action_btn = "Create"), 
add_position_view = new HR.Administration_CompanyEditPositionsAddPositionView({
model:position,
company:this.model
}), new HR.util.ShowDialog({
title:"" + action + " Position",
body_view:add_position_view,
width:500,
buttons:[ {
name:action_btn,
"class":"btn-primary",
callback:function(dialog) {
return add_position_view.persist(this, dialog);
}
}, {
name:"Cancel",
callback:function(dialog) {
return dialog.destroy();
}
} ]
}).render();
}, Administration_CompanyEditPositionsView.prototype.removePosition = function(e) {
var position, position_id, that, _position;
return position_id = $(e.currentTarget).attr("data-id"), _position = _.first(_.filter(this.model.get("company_positions"), function(position) {
return position.id === parseInt(position_id);
})), position = new HR.Administration_CompanyPositionModel(_position), that = this, 
new HR.util.ShowConfirmationDialog({
title:"Delete Position",
body:"Are you sure you want to delete this location?",
buttons:[ {
name:"Yes! Delete it!",
"class":"btn-primary",
callback:function(dialog) {
return this.setInactive(), position.destroy({
success:function() {
return that.model.fetch(), dialog.destroy();
}
});
}
}, {
name:"Cancel",
callback:function(dialog) {
return dialog.destroy();
}
} ]
}).render();
}, Administration_CompanyEditPositionsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_CompanyEditPositionsView = Administration_CompanyEditPositionsView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_CompanyEditView, HR, _ref;
return Administration_CompanyEditView = function(_super) {
function Administration_CompanyEditView() {
return Administration_CompanyEditView.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_CompanyEditView, _super), Administration_CompanyEditView.prototype.template = "administration/company-edit", 
Administration_CompanyEditView.prototype.className = "administration-company-edit", 
Administration_CompanyEditView.prototype.initialize = function(options) {
return this.action = options.action, this.tab = options.tab, this.company_id = options.company_id, 
this.tab_id = options.tab_id, this.page = options.page, this.hacker_id = options.hacker_id, 
this.listenTo(this.model, "reset", this.render), this.listenTo(this.model, "change", this.render);
}, Administration_CompanyEditView.prototype.events = {
"click a.change-tab":"changeTab",
"click button.save-company":"saveCompany"
}, Administration_CompanyEditView.prototype.render = function() {
return "create" === this.action || this.model.sync_status ? ($(this.el).html(HR.appController.template(this.template, this)({
model:this.model,
_model:this.model.toJSON(),
action:this.action,
tab:this.tab
})), "create" === this.action ? this.$("li[data-tab=overview]").addClass("active") :this.$("li[data-tab=" + this.tab + "]").addClass("active"), 
(!this.prev_tab || this.tab !== this.prev_tab || "applicants" === this.tab && this.page !== this.prev_page && this.hacker_id !== this.prev_hacker_id) && (this.prev_tab && (this.tab_view.destroy(), 
this._subviews = [], this.$(".tab-body").html("<div class='tabs-body-inner'></div>")), 
"offices" === this.tab ? (this.tab_view = new HR.Administration_CompanyEditOfficesView({
model:this.model
}), this.add_subview(this.tab_view)) :"positions" === this.tab ? (this.tab_view = new HR.Administration_CompanyEditPositionsView({
model:this.model
}), this.add_subview(this.tab_view)) :"applicants" === this.tab ? this.tab_id ? (this.tab_view = new HR.Administration_CompanyEditHackerboardView({
model:this.model,
tab_id:this.tab_id,
page:this.page,
hacker_id:this.hacker_id
}), this.add_subview(this.tab_view)) :(this.tab_view = new HR.Administration_CompanyEditApplicantsView({
model:this.model
}), this.add_subview(this.tab_view)) :(this.tab_view = new HR.Administration_CompanyEditOverviewView({
model:this.model,
action:this.action,
parent:this
}), this.add_subview(this.tab_view))), this.prev_tab = this.tab, this.prev_tab_id = this.tab_id, 
this.prev_page = this.page, this.prev_hacker_id = this.hacker_id, this.tab_view.setElement(this.$(".tabs-body-inner")).render(), 
this) :this;
}, Administration_CompanyEditView.prototype.changeTab = function(e) {
var tab, url;
return e.preventDefault(), $(e.currentTarget).parent().hasClass("active") ? void 0 :(tab = $(e.currentTarget).parent().attr("data-tab"), 
url = "/administration/", url += "companies/" + this.action, this.company_id && (url += "/" + this.company_id), 
tab && (url += "/" + tab), HR.router.navigate(url, !1), this.tab = tab, this.tab_id = null, 
this.page = null, this.hacker_id = null, this.render());
}, Administration_CompanyEditView.prototype.saveCompany = function(e) {
var company, that;
return e.preventDefault(), $(e.currentTarget).is(":disabled") ? void 0 :($(e.currentTarget).html("Saving..."), 
$(e.currentTarget).attr("disabled", "disabled"), "create" === this.action ? this.tab_view.validate && this.tab_view.validate() ? (company = new HR.Administration_CompanyModel(this.tab_view.getData()), 
that = this, company.save(null, {
success:function(model) {
var url;
return url = "/administration/companies/edit/" + model.get("id"), HR.router.navigate(url, {
trigger:!0,
replace:!0
}), $(e.currentTarget).removeAttr("disabled"), $(e.currentTarget).html("Save Company");
}
})) :($(e.currentTarget).removeAttr("disabled"), $(e.currentTarget).html("Save Company")) :this.tab_view ? this.tab_view.validate && this.tab_view.validate() ? (that = this, 
this.model.save(this.tab_view.getData(), {
silent:!0,
success:function() {
return that.$("button.save-company").removeAttr("disabled"), that.$("button.save-company").html("Save Company");
}
})) :($(e.currentTarget).removeAttr("disabled"), $(e.currentTarget).html("Save Company")) :($(e.currentTarget).removeAttr("disabled"), 
$(e.currentTarget).html("Save Company")));
}, Administration_CompanyEditView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_CompanyEditView = Administration_CompanyEditView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_ContestEditChallengesView, HR, _ref;
return Administration_ContestEditChallengesView = function(_super) {
function Administration_ContestEditChallengesView() {
return Administration_ContestEditChallengesView.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_ContestEditChallengesView, _super), Administration_ContestEditChallengesView.prototype.template = "administration/contest-edit-challenges", 
Administration_ContestEditChallengesView.prototype.className = "administration-contest-edit-challenges", 
Administration_ContestEditChallengesView.prototype.events = {
"click button.add-challenge":"showAddChallengeDialog",
"dragstart div.js-challenge-record":"challengeDragStart",
"dragend div.js-challenge-record":"challengeDragEnd",
"dragover div.js-challenge-record":"challengeDragOver",
"dragleave div.js-challenge-record":"challengeDragLeave",
"drop div.js-challenge-record":"challengeDrop",
"click .change-weights":"changeWeight",
"keypress input.weight":"keypressInputWeight",
"click input.binary":"changeBinaryScoring",
"click input.dynamic":"changeDynamic",
"click .remove-challenge":"removeChallenge"
}, Administration_ContestEditChallengesView.prototype.initialize = function(options) {
var that, _clbk;
return this.contest_id = options.contest_id, this.page = options.page, this.listenTo(this.model, "reset", this.render), 
that = this, _clbk = function(collection) {
return collection.page = that.page, collection.setContestId(that.model.get("id"));
}, this.collection = HR.appController.getCollection("administration-challenges", "page-" + this.page, _clbk), 
this.listenTo(this.collection, "reset", this.render);
}, Administration_ContestEditChallengesView.prototype.render = function() {
return this.collection.sync_status ? ($(this.el).html(HR.appController.template(this.template, this)({
collection:this.collection,
_collection:this.collection.toJSON(),
contest_id:this.contest_id
})), this.$(".help-me").length > 0 && this.$(".help-me").popover({
placement:"top"
}), this) :this;
}, Administration_ContestEditChallengesView.prototype.showAddChallengeDialog = function() {
var dialog, that;
return that = this, dialog = HR.util.ShowDialog({
title:"Add Challenge",
body:"<div class='add-challenge-modal'> <input type='text' class='add-challenge-input left-half'><button class='btn add-challenge-button right-half'>Add</button> </div>",
events:{
"click button.add-challenge-button":function(e) {
var slug;
return dialog = e.data.that, slug = dialog.$el().find("input.add-challenge-input").val(), 
dialog.destroy(), $.ajax({
url:that.model.challenge_url(slug),
type:"POST",
success:function(data) {
return data.status ? that.collection.fetch({
success:function() {
return that.render();
}
}) :void 0;
}
});
},
"keypress input.add-challenge-input":function(e) {
return 13 === e.which ? (dialog = e.data.that, dialog.$el().find("button.add-challenge-button").click()) :void 0;
}
}
}), dialog.render(), dialog.$el().find("input.add-challenge-input").autocomplete({
minLength:2,
source:function(request, response) {
return $.ajax({
url:"/rest/administration/challenges/autocomplete?limit=4",
data:{
term:request.term
},
success:function(data) {
return response(data);
}
});
},
select:function(event, ui) {
return dialog.$el().find("input.add-challenge-input").val(ui.item.value), dialog.$el().find("button.add-challenge-button").click(), 
setTimeout(function() {
return dialog.$el().find("input.add-challenge-input").val("");
}, 100);
}
}).data("autocomplete")._renderItem = function(ul, item) {
return $("<li></li>").data("item.autocomplete", item).append($("<a></a>").append($("<div class='challenge-autocomplete-container'> <p class='challenge-autocomplete-name'>" + item.label + "</p> <p class='challenge-autocomplete-slug'>" + item.value + "</p> </div>"))).appendTo(ul);
}, dialog.$el().find("input.add-challenge-input").focus();
}, Administration_ContestEditChallengesView.prototype.challengeDragStart = function(e) {
return $(e.currentTarget).css("opacity", "0.5");
}, Administration_ContestEditChallengesView.prototype.challengeDragEnd = function(e) {
var changed, destination_dom, destination_index, source_dom, source_index;
return $(e.currentTarget).css("opacity", "1"), source_index = parseInt($(e.currentTarget).attr("data-index")), 
destination_index = parseInt($(".js-challenge-record[selected=selected]").attr("data-index")), 
changed = !1, source_index !== destination_index && (destination_dom = $(".js-challenge-record[selected=selected]"), 
1 === destination_dom.length && (source_dom = $(e.currentTarget).detach(), destination_dom.before(source_dom), 
changed = !0)), $(".js-challenge-record[selected=selected]").css("border-top", "1px solid #e1e1e1"), 
$(".js-challenge-record[selected=selected]").removeAttr("selected"), this.updateIndexes(changed);
}, Administration_ContestEditChallengesView.prototype.updateIndexes = function(changed) {
var order;
return _.each(this.$(".js-challenge-record"), function(val, index) {
return $(val).attr("data-index", index), $(val).find(".challenge-serial").html(index + 1);
}), changed ? (order = _.map(_.reject(this.$(".js-challenge-record"), function(val) {
return $(val).hasClass("dummy");
}), function(val) {
return parseInt($(val).attr("data-id"));
}), $.ajax({
url:this.model.update_challenges_order_url(),
data:{
order:order
},
type:"PUT"
})) :void 0;
}, Administration_ContestEditChallengesView.prototype.challengeDragOver = function(e) {
return e.preventDefault(), $(e.currentTarget).css("border-top", "1px solid #999"), 
$(e.currentTarget).attr("selected", "selected"), !1;
}, Administration_ContestEditChallengesView.prototype.challengeDragLeave = function(e) {
return $(e.currentTarget).css("border-top", "1px solid #e1e1e1"), $(e.currentTarget).removeAttr("selected");
}, Administration_ContestEditChallengesView.prototype.changeWeight = function(e) {
var weights;
return $(e.currentTarget).find("i").hasClass("icon-pencil") ? ($(e.currentTarget).find("i").removeClass("icon-pencil").addClass("icon-floppy"), 
this.$("span.weight").hide(), this.$("input.weight").show()) :(weights = {}, _.each(_.reject(this.$(".js-challenge-record"), function(val) {
return $(val).hasClass("dummy");
}), function(val) {
return weights[parseInt($(val).attr("data-id"))] = parseInt($(val).find("input.weight").val()) || 0, 
$(val).find("span.weight").html(parseInt($(val).find("input.weight").val()) || 0);
}), $.ajax({
url:this.model.update_challenge_weights_url(),
data:{
weights:weights
},
type:"PUT"
}), $(e.currentTarget).find("i").addClass("icon-pencil").removeClass("icon-floppy"), 
this.$("span.weight").show(), this.$("input.weight").hide());
}, Administration_ContestEditChallengesView.prototype.keypressInputWeight = function(e) {
return 13 === e.which ? $(".change-weights").click() :void 0;
}, Administration_ContestEditChallengesView.prototype.changeBinaryScoring = function(e) {
var binary_scoring, ca_id;
return binary_scoring = $(e.currentTarget).is(":checked"), ca_id = $(e.currentTarget).attr("data-id"), 
$.ajax({
url:this.model.update_flags_url(ca_id),
data:{
binary_scoring:binary_scoring
},
type:"PUT"
});
}, Administration_ContestEditChallengesView.prototype.changeDynamic = function(e) {
var ca_id, dynamic;
return dynamic = $(e.currentTarget).is(":checked"), ca_id = $(e.currentTarget).attr("data-id"), 
$.ajax({
url:this.model.update_flags_url(ca_id),
data:{
dynamic:dynamic
},
type:"PUT"
});
}, Administration_ContestEditChallengesView.prototype.removeChallenge = function(e) {
var ca_id;
return ca_id = $(e.currentTarget).attr("data-id"), this.$(".js-challenge-record[data-id=" + ca_id + "]").remove(), 
this.updateIndexes(!1), $.ajax({
url:this.model.association_url(ca_id),
type:"DELETE"
});
}, Administration_ContestEditChallengesView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_ContestEditChallengesView = Administration_ContestEditChallengesView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_ContestEditOptionsView, HR, _ref;
return Administration_ContestEditOptionsView = function(_super) {
function Administration_ContestEditOptionsView() {
return Administration_ContestEditOptionsView.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_ContestEditOptionsView, _super), Administration_ContestEditOptionsView.prototype.template = "administration/contest-edit-options", 
Administration_ContestEditOptionsView.prototype.className = "administration-contest-edit-options", 
Administration_ContestEditOptionsView.prototype.initialize = function() {
return this.listenTo(this.model, "reset", this.render);
}, Administration_ContestEditOptionsView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model,
_model:this.model.toJSON()
}));
}, Administration_ContestEditOptionsView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_ContestEditOptionsView = Administration_ContestEditOptionsView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_ContestEditOverviewView, HR, _ref;
return Administration_ContestEditOverviewView = function(_super) {
function Administration_ContestEditOverviewView() {
return Administration_ContestEditOverviewView.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_ContestEditOverviewView, _super), Administration_ContestEditOverviewView.prototype.template = "administration/contest-edit-overview", 
Administration_ContestEditOverviewView.prototype.className = "administration-contest-edit-overview", 
Administration_ContestEditOverviewView.prototype.initialize = function(options) {
return this.action = options.action, this.parent = options.parent, this.listenTo(this.model, "reset", this.render), 
this.saveContest = function(_this) {
return function() {
return _this.data_rendered && _this.changed() ? _this.parent.$("button.save-contest").click() :void 0;
};
}(this), this.throttledSave = _.throttle(this.saveContest, 1e3);
}, Administration_ContestEditOverviewView.prototype.events = {
"focusout input.auto-save":"autoSave",
"focusout textarea.auto-save":"autoSave",
"keyup input#name":"updateSlug",
"click input#noendtime":"disableEndtime",
"click a.edit-slug":"editSlug",
"click a.cancel-update-slug":"cancelUpdateSlug",
"click a.update-slug":"updateSlug",
"keyup textarea.tagline":"updateTaglineMessage",
"keypress input.edit-slug":"editSlugEnterKeyBinding",
"keypress input#moderator":"addModEnterKeyBinding",
"click button.moderator-save":"addMod",
"click a.remove-moderator":"removeMod"
}, Administration_ContestEditOverviewView.prototype.render = function() {
var editorOptions, that;
return $(this.el).html(HR.appController.template(this.template, this)({
model:this.model,
_model:this.model.toJSON(),
action:this.action
})), editorOptions = {
lineNumbers:!0,
lineWrapping:!0,
matchBrackets:!0,
autoCloseBrackets:!0,
cursorScrollMargin:2,
mode:"text/x-markdown",
indentUnit:4,
tabSize:4,
lineWrapping:!0
}, this.$("textarea.description").get(0) && (this.description_editor = CodeMirror.fromTextArea(this.$("textarea.description").get(0), editorOptions), 
this.description_editor.on("change", this.throttledSave)), "create" !== this.action && this.$("#moderator").length > 0 && (that = this, 
this.$("#moderator").autocomplete({
minLength:2,
source:function(request, response) {
return $.ajax({
url:"/rest/hackers/autocomplete?limit=4",
data:{
q:request.term
},
success:function(data) {
return response(data);
}
});
},
select:function(event, ui) {
return that.$("input#moderator").val(ui.item.value), that.$("button.moderator-save").click(), 
setTimeout(function() {
return that.$("input#moderator").val("");
}, 100);
}
}).data("autocomplete")._renderItem = function(ul, item) {
return $("<li></li>").data("item.autocomplete", item).append($("<a></a>").append($("<div class='hacker-container'> <div class='hacker-avatar'> <img height='50' width='50' class='pull-left avatar profile_avatar' onerror=\"this.src='https://d3rpyts3de3lx8.cloudfront.net/hackerrank/assets/gravatar.jpg';\" src='/rest/hackers/" + HR.util.trim(item.value) + "/avatar'> </div> <div class='hacker-details'> <p class='hacker-username'>" + item.value + "</p> </div> </div>"))).appendTo(ul);
}), this.setData(this.model.toJSON()), this.setUpEvents();
}, Administration_ContestEditOverviewView.prototype.autoSave = function() {
return "create" !== this.action ? this.saveContest() :void 0;
}, Administration_ContestEditOverviewView.prototype.setUpEvents = function() {
return this.$("input#startdate").datepicker(), this.$("input#enddate").datepicker(), 
this.$("input#starttime").timepicker({
step:15,
timeFormat:"H:i"
}), this.$("input#endtime").timepicker({
step:15,
timeFormat:"H:i"
});
}, Administration_ContestEditOverviewView.prototype.disableEndtime = function(e) {
return $(e.currentTarget).is(":checked") ? (this.cache_disabled_enddate = this.$("input#enddate").val(), 
this.cache_disabled_endtime = this.$("input#endtime").val(), this.$("input#enddate").val(""), 
this.$("input#endtime").val(""), this.$("input#enddate").attr("disabled", "disabled"), 
this.$("input#endtime").attr("disabled", "disabled"), this.$("input#enddate").addClass("disabled"), 
this.$("input#endtime").addClass("disabled")) :(this.$("input#enddate").removeAttr("disabled"), 
this.$("input#endtime").removeAttr("disabled"), this.$("input#enddate").removeClass("disabled"), 
this.$("input#endtime").removeClass("disabled"), this.cache_disabled_enddate && this.$("input#enddate").val(this.cache_disabled_enddate), 
this.cache_disabled_endtime && this.$("input#endtime").val(this.cache_disabled_endtime)), 
this.autoSave();
}, Administration_ContestEditOverviewView.prototype.getTimeStamps = function() {
var current_timestamp, effective_endtime, enddate, endtime, noendtime, response, startdate, starttime;
return response = {}, response.errors = {}, noendtime = $("input#noendtime").is(":checked"), 
noendtime ? (effective_endtime = null, response.valid_endtime = !0, response.valid_enddate = !0, 
response._endtime = null) :(enddate = this.$("input#enddate").val(), endtime = this.$("input#endtime").val(), 
response.valid_endtime = HR.util.validate_time(endtime), response.valid_enddate = HR.util.validate_date(enddate), 
response._endtime = response.valid_enddate && response.valid_endtime ? HR.util.getEpochTimeStampFromDateTime(enddate, endtime) :!1), 
startdate = this.$("input#startdate").val(), starttime = this.$("input#starttime").val(), 
response.valid_starttime = HR.util.validate_time(starttime), response.valid_startdate = HR.util.validate_date(startdate), 
response._starttime = response.valid_startdate && response.valid_starttime ? HR.util.getEpochTimeStampFromDateTime(startdate, starttime) :!1, 
response.valid_timestamps = response.valid_starttime && response.valid_enddate && response.valid_endtime && response.valid_enddate ? !0 :!1, 
response.valid_values = !1, response.valid_timestamps && (response.valid_values = !0, 
current_timestamp = Math.floor(new Date().getTime() / 1e3), "create" === this.action && response._starttime + 3600 < current_timestamp && (response.valid_values = !1, 
response.errors.values = "Value of Start Date and Time should lie in future"), noendtime || ("create" === this.action && response._endtime < current_timestamp && response._endtime > response._starttime ? (response.valid_values = !1, 
response.errors.values = "Value of End Date and Time should lie in future") :response._endtime < response._starttime && (response.valid_values = !1, 
response.errors.values = "End Date & Time cannot be before Start Date & Time"))), 
response.valid_starttime || (response.errors.starttime = "Start time is not valid"), 
response.valid_startdate || (response.errors.startdate = "Start date is not valid"), 
response.valid_endtime || (response.errors.endtime = "End time is not valid"), response.valid_enddate || (response.errors.enddate = "End date is not valid"), 
response;
}, Administration_ContestEditOverviewView.prototype.validate = function() {
var timestamps, _enderrors, _starterrors;
return this.$(".error").html("").hide(), timestamps = this.getTimeStamps(), 0 === _.size(timestamps.errors) && "" !== this.$("input#name").val() && this.$("textarea.tagline").val().length <= this.model.max_limit.tagline ? !0 :((timestamps.errors.starttime || timestamps.errors.startdate) && (_starterrors = [], 
timestamps.errors.starttime && _starterrors.push(timestamps.errors.starttime), timestamps.errors.startdate && _starterrors.push(timestamps.errors.startdate), 
this.$(".error.starttime").html(HR.util.getErrorList(_starterrors)).show()), timestamps.errors.values && this.$(".error.starttime").html(HR.util.getErrorList([ timestamps.errors.values ])).show(), 
(timestamps.errors.endtime || timestamps.errors.enddate) && (_enderrors = [], timestamps.errors.endtime && _enderrors.push(timestamps.errors.endtime), 
timestamps.errors.enddate && _enderrors.push(timestamps.errors.enddate), this.$(".error.endtime").html(HR.util.getErrorList(_enderrors)).show()), 
"" === this.$("input#name").val() && this.$(".error.name").html(HR.util.getErrorList([ "Name can't be empty" ])).show(), 
!1);
}, Administration_ContestEditOverviewView.prototype.changed = function() {
var timestamps;
return timestamps = this.getTimeStamps(), this.model.get("starttime") !== timestamps._starttime ? !0 :this.model.get("endtime") !== timestamps._endtime ? !0 :this.$("input#name").val() !== this.model.get("name") ? !0 :this.$("textarea.tagline").val() !== this.model.get("tagline") ? !0 :this.description_editor.getValue() !== this.model.get("description") ? !0 :!1;
}, Administration_ContestEditOverviewView.prototype.getData = function() {
var data, timestamps;
return data = {}, data.name = this.$("input#name").val(), timestamps = this.getTimeStamps(), 
data.starttime = timestamps._starttime, data.endtime = timestamps._endtime, data.tagline = this.$("textarea.tagline").val(), 
"" === data.tagline && (data.tagline = null), data.description = this.description_editor ? this.description_editor.getValue() :null, 
"" === data.description && (data.description = null), data;
}, Administration_ContestEditOverviewView.prototype.setData = function(data) {
var date;
if ("create" !== this.action) return data.name && this.$("input#name").val(data.name), 
data.slug && this.$("span.slug").html(data.slug), data.starttime && (date = HR.util.splitDate(HR.util.getDateFromEpoch(data.starttime)), 
this.$("input#startdate").val("" + date.MM + "/" + date.dd + "/" + date.yyyy), this.$("input#starttime").val("" + date.hh + ":" + date.mm)), 
data.endtime ? (date = HR.util.splitDate(HR.util.getDateFromEpoch(data.endtime)), 
this.$("input#enddate").val("" + date.MM + "/" + date.dd + "/" + date.yyyy), this.$("input#endtime").val("" + date.hh + ":" + date.mm)) :(this.$("input#noendtime").prop("checked", !0), 
this.$("input#enddate").attr("disabled", "disabled"), this.$("input#endtime").attr("disabled", "disabled")), 
data.description && this.description_editor && this.description_editor.setValue(data.description), 
data.tagline && (this.$("textarea.tagline").val(data.tagline), this.$("small.tagline").html("" + (this.model.max_limit.tagline - data.tagline.length) + " characters left")), 
this.checkRenderedData();
}, Administration_ContestEditOverviewView.prototype.checkRenderedData = function() {
return this.rendered() && !this.changed() ? this.data_rendered = !0 :void 0;
}, Administration_ContestEditOverviewView.prototype.rendered = function() {
return this.$("input#name").length > 0 && this.$("input#endtime").length > 0 && this.$("input#enddate").length > 0 && this.$("input#starttime").length > 0 && this.$("input#startdate").length > 0 && this.$("textarea.tagline").length > 0 && this.description_editor ? !0 :!1;
}, Administration_ContestEditOverviewView.prototype.editSlug = function(e) {
return e.preventDefault(), $(e.currentTarget).hide(), this.$("p.slug").hide(), this.$("a.update-slug").show(), 
this.$("a.cancel-update-slug").show(), this.$("input.edit-slug").show().focus().val(this.$("input.edit-slug").val());
}, Administration_ContestEditOverviewView.prototype.cancelUpdateSlug = function(e) {
return e.preventDefault(), $(e.currentTarget).hide(), this.$("p.slug").show(), this.$("a.update-slug").hide(), 
this.$("input.edit-slug").hide(), this.$("a.edit-slug").show();
}, Administration_ContestEditOverviewView.prototype.updateSlug = function(e) {
var new_slug;
return e.preventDefault(), this.$(".slug.error").html("").hide(), new_slug = this.$("input.edit-slug").val(), 
new_slug !== this.model.get("slug") ? _.isEmpty(new_slug) ? this.$(".slug.error").html("slug can't be empty").show() :(this.model.set("slug", new_slug), 
this.model.save(null, {
silent:!0,
success:function(data) {
return data.status ? (this.$("p.slug").html(new_slug), this.$("a.cancel-update-slug").click()) :void 0;
}
})) :this.$("a.cancel-update-slug").click();
}, Administration_ContestEditOverviewView.prototype.editSlugEnterKeyBinding = function(e) {
return 13 === e.which ? this.$("a.update-slug").click() :void 0;
}, Administration_ContestEditOverviewView.prototype.updateTaglineMessage = function(e) {
var new_tagline;
return e.preventDefault(), new_tagline = this.$(e.currentTarget).val(), new_tagline.length > this.model.max_limit.tagline ? this.$("small.tagline").html("Characters left: -" + (new_tagline.length - this.model.max_limit.tagline)).addClass("error").removeClass("hint") :this.$("small.tagline").html("Characters left: " + (this.model.max_limit.tagline - new_tagline.length)).addClass("hint").removeClass("error");
}, Administration_ContestEditOverviewView.prototype.addModEnterKeyBinding = function(e) {
return 13 === e.which ? this.$("button.moderator-save").click() :void 0;
}, Administration_ContestEditOverviewView.prototype.addMod = function() {
var username;
return username = $("input#moderator").val(), this.addModContainer(username) && this.addUserAsMod(username), 
this.$("input#moderator").val("");
}, Administration_ContestEditOverviewView.prototype.addModContainer = function(username) {
return 0 === this.$(".moderator-container[data-username=" + username + "]").length ? (this.$(".moderators-list").append(HR.util.genModContainer({
name:$("input#moderator").val(),
avatar:"/rest/hackers/" + username + "/avatar",
role:"moderator",
close:!0
})), this.$(".moderators-list remove-moderator[data-username=" + username + "]").bind("click", this.removeMod), 
!0) :!1;
}, Administration_ContestEditOverviewView.prototype.removeMod = function(e) {
var username;
return username = $(e.currentTarget).attr("data-username"), this.$(".moderator-container[data-username=" + username + "]").remove(), 
this.removeUserAsMod(username);
}, Administration_ContestEditOverviewView.prototype.addUserAsMod = function(username) {
var that;
return that = this, $.ajax({
url:this.model.mod_url(username),
type:"POST",
success:function(data) {
return data.status ? void 0 :that.$(".moderator-container[data-username=" + username + "]").remove();
}
});
}, Administration_ContestEditOverviewView.prototype.removeUserAsMod = function(username) {
var that;
return that = this, $.ajax({
url:this.model.mod_url(username),
type:"DELETE",
success:function(data) {
return data.status ? void 0 :that.addModContainer(username);
}
});
}, Administration_ContestEditOverviewView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_ContestEditOverviewView = Administration_ContestEditOverviewView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_ContestEditView, HR, _ref;
return Administration_ContestEditView = function(_super) {
function Administration_ContestEditView() {
return Administration_ContestEditView.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_ContestEditView, _super), Administration_ContestEditView.prototype.template = "administration/contest-edit", 
Administration_ContestEditView.prototype.className = "administration-contest-edit", 
Administration_ContestEditView.prototype.initialize = function(options) {
return this.action = options.action, this.tab = options.tab, this.contest_id = options.contest_id, 
this.page = options.page, this.listenTo(this.model, "reset", this.render);
}, Administration_ContestEditView.prototype.events = {
"click a.change-tab":"changeTab",
"click button.save-contest":"saveContest"
}, Administration_ContestEditView.prototype.render = function() {
return this.model.sync_status ? ($(this.el).html(HR.appController.template(this.template, this)({
model:this.model,
_model:this.model.toJSON(),
action:this.action,
tab:this.tab
})), "create" === this.action ? this.$("li[data-tab=overview]").addClass("active") :this.$("li[data-tab=" + this.tab + "]").addClass("active"), 
this.prev_tab && this.tab === this.prev_tab || (this.prev_tab && (this.tab_view.destroy(), 
this._subviews = [], this.$(".tab-body").html("<div class='tabs-body-inner'></div>")), 
"options" === this.tab ? (this.tab_view = new HR.Administration_ContestEditOptionsView({
model:this.model,
parent:this
}), this.add_subview(this.tab_view)) :"challenges" === this.tab ? (this.tab_view = new HR.Administration_ContestEditChallengesView({
model:this.model,
contest_id:this.contest_id,
page:this.page,
parent:this
}), this.add_subview(this.tab_view)) :(this.tab_view = new HR.Administration_ContestEditOverviewView({
model:this.model,
action:this.action,
parent:this
}), this.add_subview(this.tab_view))), this.prev_tab = this.tab, this.tab_view.setElement(this.$(".tabs-body-inner")).render(), 
this) :this;
}, Administration_ContestEditView.prototype.changeTab = function(e) {
var tab, url;
return e.preventDefault(), $(e.currentTarget).parent().hasClass("active") ? void 0 :(tab = $(e.currentTarget).parent().attr("data-tab"), 
url = "/administration/contests/" + this.action, this.contest_id && (url += "/" + this.contest_id), 
tab && (url += "/" + tab), HR.router.navigate(url, !1), this.tab = tab, this.render());
}, Administration_ContestEditView.prototype.saveContest = function(e) {
var contest, that;
return e.preventDefault(), $(e.currentTarget).is(":disabled") ? void 0 :($(e.currentTarget).html("Saving..."), 
$(e.currentTarget).attr("disabled", "disabled"), "create" === this.action ? this.tab_view.validate && this.tab_view.validate() ? (contest = new HR.Administration_ContestModel(this.tab_view.getData()), 
contest.save(null, {
success:function(model, resp) {
var err;
return 0 === _.size(resp.errors) ? HR.router.navigate("/administration/contests/edit/" + model.get("id"), {
trigger:!0,
replace:!0
}) :(err = "Error Occured:\n", _.each(resp.errors, function(v, k) {
return err += "	" + k + ": " + v + "\n";
}), alert(err)), $(e.currentTarget).removeAttr("disabled"), $(e.currentTarget).html("Save Contest");
}
})) :($(e.currentTarget).removeAttr("disabled"), $(e.currentTarget).html("Save Contest")) :this.tab_view ? this.tab_view.validate && this.tab_view.validate() ? (that = this, 
this.model.save(this.tab_view.getData(), {
silent:!0,
success:function() {
return that.$("button.save-contest").removeAttr("disabled"), that.$("button.save-contest").html("Save Contest");
}
})) :($(e.currentTarget).removeAttr("disabled"), $(e.currentTarget).html("Save Contest")) :($(e.currentTarget).removeAttr("disabled"), 
$(e.currentTarget).html("Save Contest")));
}, Administration_ContestEditView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_ContestEditView = Administration_ContestEditView;
});
}.call(this), function() {
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
function ctor() {
this.constructor = child;
}
for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
return ctor.prototype = parent.prototype, child.prototype = new ctor(), child.__super__ = parent.prototype, 
child;
};
jQuery(function() {
var Administration_ResourceListView, HR, _ref;
return Administration_ResourceListView = function(_super) {
function Administration_ResourceListView() {
return Administration_ResourceListView.__super__.constructor.apply(this, arguments);
}
return __extends(Administration_ResourceListView, _super), Administration_ResourceListView.prototype.template = "administration/resource-list", 
Administration_ResourceListView.prototype.className = "administration-resource-list", 
Administration_ResourceListView.prototype.initialize = function(options) {
return this.page = options.page, this.query = options.query, this.resource = options.resource, 
this.listenTo(this.collection, "reset", this.render), this.listenTo(this.collection, "sync", this.render);
}, Administration_ResourceListView.prototype.events = {
"keyup #search-text":"searchResource",
"keypress #search-text":"searchResource"
}, Administration_ResourceListView.prototype.render = function() {
return $(this.el).html(HR.appController.template(this.template, this)({
collection:this.collection,
_collection:this.collection.toJSON(),
resource:this.resource,
hacker:HR.profile()
})), this.collection.query && this.$("#search-text").val(this.collection.query), 
HR.util.pagination(this.$(".pagination-wrapper"), this.collection.getTotal(), this.collection.pageURL(), this.collection.getCurrentPage()), 
this;
}, Administration_ResourceListView.prototype.searchResource = function(e) {
var code, query, _query;
return code = e.keyCode || e.which, 13 === code ? (e.preventDefault(), "keypress" === e.type && (query = HR.util.trim($(e.currentTarget).val()), 
_query = query ? "/query/" + encodeURIComponent(query) :"", HR.router.navigate("/administration/" + this.resource + _query, !0)), 
!1) :void 0;
}, Administration_ResourceListView;
}(window.HR.GenericView), HR = null != (_ref = window.HR) ? _ref :{}, HR.Administration_ResourceListView = Administration_ResourceListView;
});
}.call(this);