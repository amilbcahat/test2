var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("rust",function(){function e(e,t){return J=e,t}function t(t,o){var a=t.next();if('"'==a)return o.tokenize=n,o.tokenize(t,o);if("'"==a)return J="atom",t.eat("\\")?t.skipTo("'")?(t.next(),"string"):"error":(t.next(),t.eat("'")?"string":"error");if("/"==a){if(t.eat("/"))return t.skipToEnd(),"comment";if(t.eat("*"))return o.tokenize=r(1),o.tokenize(t,o)}if("#"==a)return t.eat("[")?(J="open-attr",null):(t.eatWhile(/\w/),e("macro","meta"));if(":"==a&&t.match(":<"))return e("op",null);if(a.match(/\d/)||"."==a&&t.eat(/\d/)){var i=!1;return t.match(/^x[\da-f]+/i)||t.match(/^b[01]+/)||(t.eatWhile(/\d/),t.eat(".")&&(i=!0,t.eatWhile(/\d/)),t.match(/^e[+\-]?\d+/i)&&(i=!0)),i?t.match(/^f(?:32|64)/):t.match(/^[ui](?:8|16|32|64)/),e("atom","number")}return a.match(/[()\[\]{}:;,]/)?e(a,null):"-"==a&&t.eat(">")?e("->",null):a.match(V)?(t.eatWhile(V),e("op",null)):(t.eatWhile(/\w/),K=t.current(),t.match(/^::\w/)?(t.backUp(1),e("prefix","variable-2")):o.keywords.propertyIsEnumerable(K)?e(o.keywords[K],K.match(/true|false/)?"atom":"keyword"):e("name","variable"))}function n(n,r){for(var o,a=!1;o=n.next();){if('"'==o&&!a)return r.tokenize=t,e("atom","string");a=!a&&"\\"==o}return e("op","string")}function r(e){return function(n,o){for(var a,i=null;a=n.next();){if("/"==a&&"*"==i){if(1==e){o.tokenize=t;break}return o.tokenize=r(e-1),o.tokenize(n,o)}if("*"==a&&"/"==i)return o.tokenize=r(e+1),o.tokenize(n,o);i=a}return"comment"}}function o(){for(var e=arguments.length-1;e>=0;e--)X.cc.push(arguments[e])}function a(){return o.apply(null,arguments),!0}function i(e,t){var n=function(){var n=X.state;n.lexical={indented:n.indented,column:X.stream.column(),type:e,prev:n.lexical,info:t}};return n.lex=!0,n}function u(){var e=X.state;e.lexical.prev&&(")"==e.lexical.type&&(e.indented=e.lexical.indented),e.lexical=e.lexical.prev)}function l(){X.state.keywords=R}function c(){X.state.keywords=Q}function f(e,t){function n(r){return","==r?a(e,n):r==t?a():a(n)}return function(r){return r==t?a():o(e,n)}}function m(e,t){return a(i("stat",t),e,u,d)}function d(e){return"}"==e?a():"let"==e?m(w,"let"):"fn"==e?m(j):"type"==e?a(i("stat"),C,s,u,d):"enum"==e?m(W):"mod"==e?m(M):"iface"==e?m($):"impl"==e?m(S):"open-attr"==e?a(i("]"),f(k,"]"),u):"ignore"==e||e.match(/[\]\);,]/)?a(d):o(i("stat"),k,u,s,d)}function s(e){return";"==e?a():o()}function k(e){return"atom"==e||"name"==e?a(p):"{"==e?a(i("}"),y,u):e.match(/[\[\(]/)?G(e,k):e.match(/[\]\)\};,]/)?o():"if-style"==e?a(k,k):"else-style"==e||"op"==e?a(k):"for"==e?a(A,v,z,k,k):"alt"==e?a(k,_):"fn"==e?a(j):"macro"==e?a(F):a()}function p(e){return"."==K?a(h):"::<"==K?a(I,p):"op"==e||":"==K?a(k):"("==e||"["==e?G(e,k):o()}function h(){return K.match(/^\w+$/)?(X.marked="variable",a(p)):o(k)}function y(e){if("op"==e){if("|"==K)return a(b,u,i("}","block"),d);if("||"==K)return a(u,i("}","block"),d)}return"mutable"==K||K.match(/^\w+$/)&&":"==X.stream.peek()&&!X.stream.match("::",!1)?o(x(k)):o(d)}function x(e){function t(n){return"mutable"==K||"with"==K?(X.marked="keyword",a(t)):K.match(/^\w*$/)?(X.marked="variable",a(t)):":"==n?a(e,t):"}"==n?a():a(t)}return t}function b(e){return"name"==e?(X.marked="def",a(b)):"op"==e&&"|"==K?a():a(b)}function w(e){return e.match(/[\]\)\};]/)?a():"="==K?a(k,g):","==e?a(w):o(A,v,w)}function g(e){return e.match(/[\]\)\};,]/)?o(w):o(k,g)}function v(e){return":"==e?a(l,P,c):o()}function z(e){return"name"==e&&"in"==K?(X.marked="keyword",a()):o()}function j(e){return"@"==K||"~"==K?(X.marked="keyword",a(j)):"name"==e?(X.marked="def",a(j)):"<"==K?a(I,j):"{"==e?o(k):"("==e?a(i(")"),f(O,")"),u,j):"->"==e?a(l,P,c,j):";"==e?a():a(j)}function C(e){return"name"==e?(X.marked="def",a(C)):"<"==K?a(I,C):"="==K?a(l,P,c):a(C)}function W(e){return"name"==e?(X.marked="def",a(W)):"<"==K?a(I,W):"="==K?a(l,P,c,s):"{"==e?a(i("}"),l,E,c,u):a(W)}function E(e){return"}"==e?a():"("==e?a(i(")"),f(P,")"),u,E):(K.match(/^\w+$/)&&(X.marked="def"),a(E))}function M(e){return"name"==e?(X.marked="def",a(M)):"{"==e?a(i("}"),d,u):o()}function $(e){return"name"==e?(X.marked="def",a($)):"<"==K?a(I,$):"{"==e?a(i("}"),d,u):o()}function S(e){return"<"==K?a(I,S):"of"==K||"for"==K?(X.marked="keyword",a(P,S)):"name"==e?(X.marked="def",a(S)):"{"==e?a(i("}"),d,u):o()}function I(){return">"==K?a():","==K?a(I):":"==K?a(P,I):o(P,I)}function O(e){return"name"==e?(X.marked="def",a(O)):":"==e?a(l,P,c):o()}function P(e){return"name"==e?(X.marked="variable-3",a(T)):"mutable"==K?(X.marked="keyword",a(P)):"atom"==e?a(T):"op"==e||"obj"==e?a(P):"fn"==e?a(q):"{"==e?a(i("{"),x(P),u):G(e,P)}function T(){return"<"==K?a(I):o()}function q(e){return"("==e?a(i("("),f(P,")"),u,q):"->"==e?a(P):o()}function A(e){return"name"==e?(X.marked="def",a(U)):"atom"==e?a(U):"op"==e?a(A):e.match(/[\]\)\};,]/)?o():G(e,A)}function U(e){return"op"==e&&"."==K?a():"to"==K?(X.marked="keyword",a(A)):o()}function _(e){return"{"==e?a(i("}","alt"),B,u):o()}function B(e){return"}"==e?a():"|"==e?a(B):"when"==K?(X.marked="keyword",a(k,D)):e.match(/[\]\);,]/)?a(B):o(A,D)}function D(e){return"{"==e?a(i("}","alt"),d,u,B):o(B)}function F(e){return e.match(/[\[\(\{]/)?G(e,k):o()}function G(e,t){return"["==e?a(i("]"),f(t,"]"),u):"("==e?a(i(")"),f(t,")"),u):"{"==e?a(i("}"),f(t,"}"),u):a()}function H(e,t,n){var r=e.cc;for(X.state=e,X.stream=t,X.marked=null,X.cc=r;;){var o=r.length?r.pop():d;if(o(J)){for(;r.length&&r[r.length-1].lex;)r.pop()();return X.marked||n}}}var J,K,L=4,N=2,Q={"if":"if-style","while":"if-style","else":"else-style","do":"else-style",ret:"else-style",fail:"else-style","break":"atom",cont:"atom","const":"let",resource:"fn",let:"let",fn:"fn","for":"for",alt:"alt",iface:"iface",impl:"impl",type:"type","enum":"enum",mod:"mod",as:"op","true":"atom","false":"atom",assert:"op",check:"op",claim:"op","native":"ignore",unsafe:"ignore","import":"else-style","export":"else-style",copy:"op",log:"op",log_err:"op",use:"op",bind:"op",self:"atom"},R=function(){for(var e={fn:"fn",block:"fn",obj:"obj"},t="bool uint int i8 i16 i32 i64 u8 u16 u32 u64 float f32 f64 str char".split(" "),n=0,r=t.length;r>n;++n)e[t[n]]="atom";return e}(),V=/[+\-*&%=<>!?|\.@]/,X={state:null,stream:null,marked:null,cc:null};return u.lex=l.lex=c.lex=!0,{startState:function(){return{tokenize:t,cc:[],lexical:{indented:-L,column:0,type:"top",align:!1},keywords:Q,indented:0}},token:function(e,t){if(e.sol()&&(t.lexical.hasOwnProperty("align")||(t.lexical.align=!1),t.indented=e.indentation()),e.eatSpace())return null;J=K=null;var n=t.tokenize(e,t);return"comment"==n?n:(t.lexical.hasOwnProperty("align")||(t.lexical.align=!0),"prefix"==J?n:(K||(K=e.current()),H(t,e,n)))},indent:function(e,n){if(e.tokenize!=t)return 0;var r=n&&n.charAt(0),o=e.lexical,a=o.type,i=r==a;return"stat"==a?o.indented+L:o.align?o.column+(i?0:1):o.indented+(i?0:"alt"==o.info?N:L)},electricChars:"{}",blockCommentStart:"/*",blockCommentEnd:"*/",lineComment:"//",fold:"brace"}}),e.defineMIME("text/x-rustsrc","rust")});
//# sourceMappingURL=rust-7a25c8f7cfcadd5458f392313a012748.js.map
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 