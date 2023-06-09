// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror"), require("../python/python"), require("../stex/stex"), require("../../addon/mode/overlay")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror", "../python/python", "../stex/stex", "../../addon/mode/overlay" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("rst", function(config, options) {
var rx_strong = /^\*\*[^\*\s](?:[^\*]*[^\*\s])?\*\*/, rx_emphasis = /^\*[^\*\s](?:[^\*]*[^\*\s])?\*/, rx_literal = /^``[^`\s](?:[^`]*[^`\s])``/, rx_number = /^(?:[\d]+(?:[\.,]\d+)*)/, rx_positive = /^(?:\s\+[\d]+(?:[\.,]\d+)*)/, rx_negative = /^(?:\s\-[\d]+(?:[\.,]\d+)*)/, rx_uri_protocol = "[Hh][Tt][Tt][Pp][Ss]?://", rx_uri_domain = "(?:[\\d\\w.-]+)\\.(?:\\w{2,6})", rx_uri_path = "(?:/[\\d\\w\\#\\%\\&\\-\\.\\,\\/\\:\\=\\?\\~]+)*", rx_uri = new RegExp("^" + rx_uri_protocol + rx_uri_domain + rx_uri_path), overlay = {
token:function(stream) {
if (stream.match(rx_strong) && stream.match(/\W+|$/, !1)) return "strong";
if (stream.match(rx_emphasis) && stream.match(/\W+|$/, !1)) return "em";
if (stream.match(rx_literal) && stream.match(/\W+|$/, !1)) return "string-2";
if (stream.match(rx_number)) return "number";
if (stream.match(rx_positive)) return "positive";
if (stream.match(rx_negative)) return "negative";
if (stream.match(rx_uri)) return "link";
for (;!(null == stream.next() || stream.match(rx_strong, !1) || stream.match(rx_emphasis, !1) || stream.match(rx_literal, !1) || stream.match(rx_number, !1) || stream.match(rx_positive, !1) || stream.match(rx_negative, !1) || stream.match(rx_uri, !1)); ) ;
return null;
}
}, mode = CodeMirror.getMode(config, options.backdrop || "rst-base");
return CodeMirror.overlayMode(mode, overlay, !0);
}, "python", "stex"), CodeMirror.defineMode("rst-base", function(config) {
function format(string) {
var args = Array.prototype.slice.call(arguments, 1);
return string.replace(/{(\d+)}/g, function(match, n) {
return "undefined" != typeof args[n] ? args[n] :match;
});
}
function AssertException(message) {
this.message = message;
}
function assert(expression, message) {
if (!expression) throw new AssertException(message);
return expression;
}
function to_normal(stream, state) {
var token = null;
if (stream.sol() && stream.match(rx_examples, !1)) change(state, to_mode, {
mode:mode_python,
local:CodeMirror.startState(mode_python)
}); else if (stream.sol() && stream.match(rx_explicit)) change(state, to_explicit), 
token = "meta"; else if (stream.sol() && stream.match(rx_section)) change(state, to_normal), 
token = "header"; else if (phase(state) == rx_role_pre || stream.match(rx_role_pre, !1)) switch (stage(state)) {
case 0:
change(state, to_normal, context(rx_role_pre, 1)), assert(stream.match(/^:/)), token = "meta";
break;

case 1:
change(state, to_normal, context(rx_role_pre, 2)), assert(stream.match(rx_NAME)), 
token = "keyword", stream.current().match(/^(?:math|latex)/) && (state.tmp_stex = !0);
break;

case 2:
change(state, to_normal, context(rx_role_pre, 3)), assert(stream.match(/^:`/)), 
token = "meta";
break;

case 3:
if (state.tmp_stex && (state.tmp_stex = void 0, state.tmp = {
mode:mode_stex,
local:CodeMirror.startState(mode_stex)
}), state.tmp) {
if ("`" == stream.peek()) {
change(state, to_normal, context(rx_role_pre, 4)), state.tmp = void 0;
break;
}
token = state.tmp.mode.token(stream, state.tmp.local);
break;
}
change(state, to_normal, context(rx_role_pre, 4)), assert(stream.match(rx_TEXT2)), 
token = "string";
break;

case 4:
change(state, to_normal, context(rx_role_pre, 5)), assert(stream.match(/^`/)), token = "meta";
break;

case 5:
change(state, to_normal, context(rx_role_pre, 6)), assert(stream.match(rx_TAIL));
break;

default:
change(state, to_normal), assert("" == stream.current());
} else if (phase(state) == rx_role_suf || stream.match(rx_role_suf, !1)) switch (stage(state)) {
case 0:
change(state, to_normal, context(rx_role_suf, 1)), assert(stream.match(/^`/)), token = "meta";
break;

case 1:
change(state, to_normal, context(rx_role_suf, 2)), assert(stream.match(rx_TEXT2)), 
token = "string";
break;

case 2:
change(state, to_normal, context(rx_role_suf, 3)), assert(stream.match(/^`:/)), 
token = "meta";
break;

case 3:
change(state, to_normal, context(rx_role_suf, 4)), assert(stream.match(rx_NAME)), 
token = "keyword";
break;

case 4:
change(state, to_normal, context(rx_role_suf, 5)), assert(stream.match(/^:/)), token = "meta";
break;

case 5:
change(state, to_normal, context(rx_role_suf, 6)), assert(stream.match(rx_TAIL));
break;

default:
change(state, to_normal), assert("" == stream.current());
} else if (phase(state) == rx_role || stream.match(rx_role, !1)) switch (stage(state)) {
case 0:
change(state, to_normal, context(rx_role, 1)), assert(stream.match(/^:/)), token = "meta";
break;

case 1:
change(state, to_normal, context(rx_role, 2)), assert(stream.match(rx_NAME)), token = "keyword";
break;

case 2:
change(state, to_normal, context(rx_role, 3)), assert(stream.match(/^:/)), token = "meta";
break;

case 3:
change(state, to_normal, context(rx_role, 4)), assert(stream.match(rx_TAIL));
break;

default:
change(state, to_normal), assert("" == stream.current());
} else if (phase(state) == rx_substitution_ref || stream.match(rx_substitution_ref, !1)) switch (stage(state)) {
case 0:
change(state, to_normal, context(rx_substitution_ref, 1)), assert(stream.match(rx_substitution_text)), 
token = "variable-2";
break;

case 1:
change(state, to_normal, context(rx_substitution_ref, 2)), stream.match(/^_?_?/) && (token = "link");
break;

default:
change(state, to_normal), assert("" == stream.current());
} else if (stream.match(rx_footnote_ref)) change(state, to_normal), token = "quote"; else if (stream.match(rx_citation_ref)) change(state, to_normal), 
token = "quote"; else if (stream.match(rx_link_ref1)) change(state, to_normal), 
(!stream.peek() || stream.peek().match(/^\W$/)) && (token = "link"); else if (phase(state) == rx_link_ref2 || stream.match(rx_link_ref2, !1)) switch (stage(state)) {
case 0:
!stream.peek() || stream.peek().match(/^\W$/) ? change(state, to_normal, context(rx_link_ref2, 1)) :stream.match(rx_link_ref2);
break;

case 1:
change(state, to_normal, context(rx_link_ref2, 2)), assert(stream.match(/^`/)), 
token = "link";
break;

case 2:
change(state, to_normal, context(rx_link_ref2, 3)), assert(stream.match(rx_TEXT2));
break;

case 3:
change(state, to_normal, context(rx_link_ref2, 4)), assert(stream.match(/^`_/)), 
token = "link";
break;

default:
change(state, to_normal), assert("" == stream.current());
} else stream.match(rx_verbatim) ? change(state, to_verbatim) :stream.next() && change(state, to_normal);
return token;
}
function to_explicit(stream, state) {
var token = null;
if (phase(state) == rx_substitution || stream.match(rx_substitution, !1)) switch (stage(state)) {
case 0:
change(state, to_explicit, context(rx_substitution, 1)), assert(stream.match(rx_substitution_text)), 
token = "variable-2";
break;

case 1:
change(state, to_explicit, context(rx_substitution, 2)), assert(stream.match(rx_substitution_sepa));
break;

case 2:
change(state, to_explicit, context(rx_substitution, 3)), assert(stream.match(rx_substitution_name)), 
token = "keyword";
break;

case 3:
change(state, to_explicit, context(rx_substitution, 4)), assert(stream.match(rx_substitution_tail)), 
token = "meta";
break;

default:
change(state, to_normal), assert("" == stream.current());
} else if (phase(state) == rx_directive || stream.match(rx_directive, !1)) switch (stage(state)) {
case 0:
change(state, to_explicit, context(rx_directive, 1)), assert(stream.match(rx_directive_name)), 
token = "keyword", stream.current().match(/^(?:math|latex)/) ? state.tmp_stex = !0 :stream.current().match(/^python/) && (state.tmp_py = !0);
break;

case 1:
change(state, to_explicit, context(rx_directive, 2)), assert(stream.match(rx_directive_tail)), 
token = "meta", (stream.match(/^latex\s*$/) || state.tmp_stex) && (state.tmp_stex = void 0, 
change(state, to_mode, {
mode:mode_stex,
local:CodeMirror.startState(mode_stex)
}));
break;

case 2:
change(state, to_explicit, context(rx_directive, 3)), (stream.match(/^python\s*$/) || state.tmp_py) && (state.tmp_py = void 0, 
change(state, to_mode, {
mode:mode_python,
local:CodeMirror.startState(mode_python)
}));
break;

default:
change(state, to_normal), assert("" == stream.current());
} else if (phase(state) == rx_link || stream.match(rx_link, !1)) switch (stage(state)) {
case 0:
change(state, to_explicit, context(rx_link, 1)), assert(stream.match(rx_link_head)), 
assert(stream.match(rx_link_name)), token = "link";
break;

case 1:
change(state, to_explicit, context(rx_link, 2)), assert(stream.match(rx_link_tail)), 
token = "meta";
break;

default:
change(state, to_normal), assert("" == stream.current());
} else stream.match(rx_footnote) ? (change(state, to_normal), token = "quote") :stream.match(rx_citation) ? (change(state, to_normal), 
token = "quote") :(stream.eatSpace(), stream.eol() ? change(state, to_normal) :(stream.skipToEnd(), 
change(state, to_comment), token = "comment"));
return token;
}
function to_comment(stream, state) {
return as_block(stream, state, "comment");
}
function to_verbatim(stream, state) {
return as_block(stream, state, "meta");
}
function as_block(stream, state, token) {
return stream.eol() || stream.eatSpace() ? (stream.skipToEnd(), token) :(change(state, to_normal), 
null);
}
function to_mode(stream, state) {
return state.ctx.mode && state.ctx.local ? stream.sol() ? (stream.eatSpace() || change(state, to_normal), 
null) :state.ctx.mode.token(stream, state.ctx.local) :(change(state, to_normal), 
null);
}
function context(phase, stage, mode, local) {
return {
phase:phase,
stage:stage,
mode:mode,
local:local
};
}
function change(state, tok, ctx) {
state.tok = tok, state.ctx = ctx || {};
}
function stage(state) {
return state.ctx.stage || 0;
}
function phase(state) {
return state.ctx.phase;
}
AssertException.prototype.toString = function() {
return "AssertException: " + this.message;
};
var mode_python = CodeMirror.getMode(config, "python"), mode_stex = CodeMirror.getMode(config, "stex"), SEPA = "\\s+", TAIL = "(?:\\s*|\\W|$)", rx_TAIL = new RegExp(format("^{0}", TAIL)), NAME = "(?:[^\\W\\d_](?:[\\w!\"#$%&'()\\*\\+,\\-\\./:;<=>\\?]*[^\\W_])?)", rx_NAME = new RegExp(format("^{0}", NAME)), NAME_WWS = "(?:[^\\W\\d_](?:[\\w\\s!\"#$%&'()\\*\\+,\\-\\./:;<=>\\?]*[^\\W_])?)", REF_NAME = format("(?:{0}|`{1}`)", NAME, NAME_WWS), TEXT1 = "(?:[^\\s\\|](?:[^\\|]*[^\\s\\|])?)", TEXT2 = "(?:[^\\`]+)", rx_TEXT2 = new RegExp(format("^{0}", TEXT2)), rx_section = new RegExp("^([!'#$%&\"()*+,-./:;<=>?@\\[\\\\\\]^_`{|}~])\\1{3,}\\s*$"), rx_explicit = new RegExp(format("^\\.\\.{0}", SEPA)), rx_link = new RegExp(format("^_{0}:{1}|^__:{1}", REF_NAME, TAIL)), rx_directive = new RegExp(format("^{0}::{1}", REF_NAME, TAIL)), rx_substitution = new RegExp(format("^\\|{0}\\|{1}{2}::{3}", TEXT1, SEPA, REF_NAME, TAIL)), rx_footnote = new RegExp(format("^\\[(?:\\d+|#{0}?|\\*)]{1}", REF_NAME, TAIL)), rx_citation = new RegExp(format("^\\[{0}\\]{1}", REF_NAME, TAIL)), rx_substitution_ref = new RegExp(format("^\\|{0}\\|", TEXT1)), rx_footnote_ref = new RegExp(format("^\\[(?:\\d+|#{0}?|\\*)]_", REF_NAME)), rx_citation_ref = new RegExp(format("^\\[{0}\\]_", REF_NAME)), rx_link_ref1 = new RegExp(format("^{0}__?", REF_NAME)), rx_link_ref2 = new RegExp(format("^`{0}`_", TEXT2)), rx_role_pre = new RegExp(format("^:{0}:`{1}`{2}", NAME, TEXT2, TAIL)), rx_role_suf = new RegExp(format("^`{1}`:{0}:{2}", NAME, TEXT2, TAIL)), rx_role = new RegExp(format("^:{0}:{1}", NAME, TAIL)), rx_directive_name = new RegExp(format("^{0}", REF_NAME)), rx_directive_tail = new RegExp(format("^::{0}", TAIL)), rx_substitution_text = new RegExp(format("^\\|{0}\\|", TEXT1)), rx_substitution_sepa = new RegExp(format("^{0}", SEPA)), rx_substitution_name = new RegExp(format("^{0}", REF_NAME)), rx_substitution_tail = new RegExp(format("^::{0}", TAIL)), rx_link_head = new RegExp("^_"), rx_link_name = new RegExp(format("^{0}|_", REF_NAME)), rx_link_tail = new RegExp(format("^:{0}", TAIL)), rx_verbatim = new RegExp("^::\\s*$"), rx_examples = new RegExp("^\\s+(?:>>>|In \\[\\d+\\]:)\\s");
return {
startState:function() {
return {
tok:to_normal,
ctx:context(void 0, 0)
};
},
copyState:function(state) {
var ctx = state.ctx, tmp = state.tmp;
return ctx.local && (ctx = {
mode:ctx.mode,
local:CodeMirror.copyState(ctx.mode, ctx.local)
}), tmp && (tmp = {
mode:tmp.mode,
local:CodeMirror.copyState(tmp.mode, tmp.local)
}), {
tok:state.tok,
ctx:ctx,
tmp:tmp
};
},
innerMode:function(state) {
return state.tmp ? {
state:state.tmp.local,
mode:state.tmp.mode
} :state.ctx.mode ? {
state:state.ctx.local,
mode:state.ctx.mode
} :null;
},
token:function(stream, state) {
return state.tok(stream, state);
}
};
}, "python", "stex"), CodeMirror.defineMIME("text/x-rst", "rst");
});