// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
function dialogDiv(cm, template, bottom) {
var dialog, wrap = cm.getWrapperElement();
return dialog = wrap.appendChild(document.createElement("div")), dialog.className = bottom ? "CodeMirror-dialog CodeMirror-dialog-bottom" :"CodeMirror-dialog CodeMirror-dialog-top", 
"string" == typeof template ? dialog.innerHTML = template :dialog.appendChild(template), 
dialog;
}
function closeNotification(cm, newVal) {
cm.state.currentNotificationClose && cm.state.currentNotificationClose(), cm.state.currentNotificationClose = newVal;
}
CodeMirror.defineExtension("openDialog", function(template, callback, options) {
function close(newVal) {
if ("string" == typeof newVal) inp.value = newVal; else {
if (closed) return;
closed = !0, dialog.parentNode.removeChild(dialog);
}
}
closeNotification(this, null);
var button, dialog = dialogDiv(this, template, options && options.bottom), closed = !1, me = this, inp = dialog.getElementsByTagName("input")[0];
return inp ? (options && options.value && (inp.value = options.value), CodeMirror.on(inp, "keydown", function(e) {
options && options.onKeyDown && options.onKeyDown(e, inp.value, close) || (13 == e.keyCode || 27 == e.keyCode) && (inp.blur(), 
CodeMirror.e_stop(e), close(), me.focus(), 13 == e.keyCode && callback(inp.value));
}), options && options.onKeyUp && CodeMirror.on(inp, "keyup", function(e) {
options.onKeyUp(e, inp.value, close);
}), options && options.value && (inp.value = options.value), inp.focus(), CodeMirror.on(inp, "blur", close)) :(button = dialog.getElementsByTagName("button")[0]) && (CodeMirror.on(button, "click", function() {
close(), me.focus();
}), button.focus(), CodeMirror.on(button, "blur", close)), close;
}), CodeMirror.defineExtension("openConfirm", function(template, callbacks, options) {
function close() {
closed || (closed = !0, dialog.parentNode.removeChild(dialog), me.focus());
}
closeNotification(this, null);
var dialog = dialogDiv(this, template, options && options.bottom), buttons = dialog.getElementsByTagName("button"), closed = !1, me = this, blurring = 1;
buttons[0].focus();
for (var i = 0; i < buttons.length; ++i) {
var b = buttons[i];
!function(callback) {
CodeMirror.on(b, "click", function(e) {
CodeMirror.e_preventDefault(e), close(), callback && callback(me);
});
}(callbacks[i]), CodeMirror.on(b, "blur", function() {
--blurring, setTimeout(function() {
0 >= blurring && close();
}, 200);
}), CodeMirror.on(b, "focus", function() {
++blurring;
});
}
}), CodeMirror.defineExtension("openNotification", function(template, options) {
function close() {
closed || (closed = !0, clearTimeout(doneTimer), dialog.parentNode.removeChild(dialog));
}
closeNotification(this, close);
var doneTimer, dialog = dialogDiv(this, template, options && options.bottom), duration = options && (void 0 === options.duration ? 5e3 :options.duration), closed = !1;
CodeMirror.on(dialog, "click", function(e) {
CodeMirror.e_preventDefault(e), close();
}), duration && (doneTimer = setTimeout(close, options.duration));
});
});