!function(d) {
function c(g, h) {
var k, j = h.ownerDocument, f = j.createRange();
return f.setStartBefore(h), f.setEnd(g.endContainer, g.endOffset), k = j.createElement("body"), 
k.appendChild(f.cloneContents()), 0 == k.innerHTML.replace(/<(br|img|object|embed|input|textarea)[^>]*>/gi, "-").replace(/<[^>]+>/g, "").length;
}
function a(g, f) {
return parseInt(g.getAttribute(f) || 1);
}
function b(H, G, K) {
function A(N, M) {
return N = N.cloneNode(M), N.removeAttribute("id"), N;
}
function t() {
var M = 0;
g = [], e([ "thead", "tbody", "tfoot" ], function(N) {
var O = G.select("> " + N + " tr", H);
e(O, function(P, Q) {
Q += M, e(G.select("> td, > th", P), function(W, R) {
var S, T, U, V;
if (g[Q]) for (;g[Q][R]; ) R++;
for (U = a(W, "rowspan"), V = a(W, "colspan"), T = Q; Q + U > T; T++) for (g[T] || (g[T] = []), 
S = R; R + V > S; S++) g[T][S] = {
part:N,
real:T == Q && S == R,
elm:W,
rowspan:U,
colspan:V
};
});
}), M += O.length;
});
}
function z(M, O) {
var N;
return N = g[O], N ? N[M] :void 0;
}
function s(O, M, N) {
O && (N = parseInt(N), 1 === N ? O.removeAttribute(M, 1) :O.setAttribute(M, N, 1));
}
function j(M) {
return M && (G.hasClass(M.elm, "mceSelected") || M == o);
}
function k() {
var M = [];
return e(H.rows, function(N) {
e(N.cells, function(O) {
return G.hasClass(O, "mceSelected") || O == o.elm ? (M.push(N), !1) :void 0;
});
}), M;
}
function r() {
var M = G.createRng();
M.setStartAfter(H), M.setEndAfter(H), K.setRng(M), G.remove(H);
}
function f(M) {
var N;
return d.walk(M, function(P) {
var O;
return 3 == P.nodeType ? (e(G.getParents(P.parentNode, null, M).reverse(), function(Q) {
Q = A(Q, !1), N ? O && O.appendChild(Q) :N = O = Q, O = Q;
}), O && (O.innerHTML = d.isIE ? "&nbsp;" :'<br data-mce-bogus="1" />'), !1) :void 0;
}, "childNodes"), M = A(M, !1), s(M, "rowSpan", 1), s(M, "colSpan", 1), N ? M.appendChild(N) :d.isIE || (M.innerHTML = '<br data-mce-bogus="1" />'), 
M;
}
function q() {
var M = G.createRng();
return e(G.select("tr", H), function(N) {
0 == N.cells.length && G.remove(N);
}), 0 == G.select("tr", H).length ? (M.setStartAfter(H), M.setEndAfter(H), K.setRng(M), 
G.remove(H), void 0) :(e(G.select("thead,tbody,tfoot", H), function(N) {
0 == N.rows.length && G.remove(N);
}), t(), row = g[Math.min(g.length - 1, L.y)], row && (K.select(row[Math.min(row.length - 1, L.x)].elm, !0), 
K.collapse(!0)), void 0);
}
function u(S, Q, U, R) {
var P, N, M, O, T;
for (P = g[Q][S].elm.parentNode, M = 1; U >= M; M++) if (P = G.getNext(P, "tr")) {
for (N = S; N >= 0; N--) if (T = g[Q + M][N].elm, T.parentNode == P) {
for (O = 1; R >= O; O++) G.insertAfter(f(T), T);
break;
}
if (-1 == N) for (O = 1; R >= O; O++) P.insertBefore(f(P.cells[0]), P.cells[0]);
}
}
function C() {
e(g, function(M, N) {
e(M, function(P, O) {
var S, R, Q;
if (j(P) && (P = P.elm, S = a(P, "colspan"), R = a(P, "rowspan"), S > 1 || R > 1)) {
for (s(P, "rowSpan", 1), s(P, "colSpan", 1), Q = 0; S - 1 > Q; Q++) G.insertAfter(f(P), P);
u(O, N, R - 1, S);
}
});
});
}
function p(V, S, Y) {
var P, O, X, W, U, R, T, M, V, N, Q;
if (V ? (pos = F(V), P = pos.x, O = pos.y, X = P + (S - 1), W = O + (Y - 1)) :(P = L.x, 
O = L.y, X = D.x, W = D.y), T = z(P, O), M = z(X, W), T && M && T.part == M.part) {
for (C(), t(), T = z(P, O).elm, s(T, "colSpan", X - P + 1), s(T, "rowSpan", W - O + 1), 
R = O; W >= R; R++) for (U = P; X >= U; U++) g[R] && g[R][U] && (V = g[R][U].elm, 
V != T && (N = d.grep(V.childNodes), e(N, function(Z) {
T.appendChild(Z);
}), N.length && (N = d.grep(T.childNodes), Q = 0, e(N, function(Z) {
"BR" == Z.nodeName && G.getAttrib(Z, "data-mce-bogus") && Q++ < N.length - 1 && T.removeChild(Z);
})), G.remove(V)));
q();
}
}
function l(Q) {
var M, S, P, R, T, U, N, V, O;
for (e(g, function(W, X) {
return e(W, function(Z) {
return j(Z) && (Z = Z.elm, T = Z.parentNode, U = A(T, !1), M = X, Q) ? !1 :void 0;
}), Q ? !M :void 0;
}), R = 0; R < g[0].length; R++) if (g[M][R] && (S = g[M][R].elm, S != P)) {
if (Q) {
if (M > 0 && g[M - 1][R] && (V = g[M - 1][R].elm, O = a(V, "rowSpan"), O > 1)) {
s(V, "rowSpan", O + 1);
continue;
}
} else if (O = a(S, "rowspan"), O > 1) {
s(S, "rowSpan", O + 1);
continue;
}
N = f(S), s(N, "colSpan", S.colSpan), U.appendChild(N), P = S;
}
U.hasChildNodes() && (Q ? T.parentNode.insertBefore(U, T) :G.insertAfter(U, T));
}
function h(N) {
var O, M;
e(g, function(P) {
return e(P, function(S, R) {
return j(S) && (O = R, N) ? !1 :void 0;
}), N ? !O :void 0;
}), e(g, function(S, T) {
var P, Q, R;
S[O] && (P = S[O].elm, P != M && (R = a(P, "colspan"), Q = a(P, "rowspan"), 1 == R ? N ? (P.parentNode.insertBefore(f(P), P), 
u(O, T, Q - 1, R)) :(G.insertAfter(f(P), P), u(O, T, Q - 1, R)) :s(P, "colSpan", P.colSpan + 1), 
M = P));
});
}
function n() {
var M = [];
e(g, function(N) {
e(N, function(Q, P) {
j(Q) && -1 === d.inArray(M, P) && (e(g, function(T) {
var S, R = T[P].elm;
S = a(R, "colSpan"), S > 1 ? s(R, "colSpan", S - 1) :G.remove(R);
}), M.push(P));
});
}), q();
}
function m() {
function M(Q) {
var P, R, O;
P = G.getNext(Q, "tr"), e(Q.cells, function(S) {
var T = a(S, "rowSpan");
T > 1 && (s(S, "rowSpan", T - 1), R = F(S), u(R.x, R.y, 1, 1));
}), R = F(Q.cells[0]), e(g[R.y], function(S) {
var T;
S = S.elm, S != O && (T = a(S, "rowSpan"), 1 >= T ? G.remove(S) :s(S, "rowSpan", T - 1), 
O = S);
});
}
var N;
N = k(), e(N.reverse(), function(O) {
M(O);
}), q();
}
function E() {
var M = k();
return G.remove(M), q(), M;
}
function J() {
var M = k();
return e(M, function(O, N) {
M[N] = A(O, !0);
}), M;
}
function B(O, N) {
var P = k(), M = P[N ? 0 :P.length - 1], Q = M.cells.length;
e(g, function(S) {
var R;
return Q = 0, e(S, function(U) {
U.real && (Q += U.colspan), U.elm.parentNode == M && (R = 1);
}), R ? !1 :void 0;
}), N || O.reverse(), e(O, function(T) {
var R, S = T.cells.length;
for (i = 0; S > i; i++) R = T.cells[i], s(R, "colSpan", 1), s(R, "rowSpan", 1);
for (i = S; Q > i; i++) T.appendChild(f(T.cells[S - 1]));
for (i = Q; S > i; i++) G.remove(T.cells[i]);
N ? M.parentNode.insertBefore(T, M) :G.insertAfter(T, M);
});
}
function F(M) {
var N;
return e(g, function(O, P) {
return e(O, function(R, Q) {
return R.elm == M ? (N = {
x:Q,
y:P
}, !1) :void 0;
}), !N;
}), N;
}
function w(M) {
L = F(M);
}
function I() {
var N, M;
return N = M = 0, e(g, function(P, Q) {
e(P, function(S, R) {
var U, T;
j(S) && (S = g[Q][R], R > N && (N = R), Q > M && (M = Q), S.real && (U = S.colspan - 1, 
T = S.rowspan - 1, U && R + U > N && (N = R + U), T && Q + T > M && (M = Q + T)));
});
}), {
x:N,
y:M
};
}
function v(S) {
var P, O, U, T, N, M, Q, R;
if (D = F(S), L && D) {
for (P = Math.min(L.x, D.x), O = Math.min(L.y, D.y), U = Math.max(L.x, D.x), T = Math.max(L.y, D.y), 
N = U, M = T, y = O; M >= y; y++) S = g[y][P], S.real || P - (S.colspan - 1) < P && (P -= S.colspan - 1);
for (x = P; N >= x; x++) S = g[O][x], S.real || O - (S.rowspan - 1) < O && (O -= S.rowspan - 1);
for (y = O; T >= y; y++) for (x = P; U >= x; x++) S = g[y][x], S.real && (Q = S.colspan - 1, 
R = S.rowspan - 1, Q && x + Q > N && (N = x + Q), R && y + R > M && (M = y + R));
for (G.removeClass(G.select("td.mceSelected,th.mceSelected"), "mceSelected"), y = O; M >= y; y++) for (x = P; N >= x; x++) g[y][x] && G.addClass(g[y][x].elm, "mceSelected");
}
}
var g, L, D, o;
t(), o = G.getParent(K.getStart(), "th,td"), o && (L = F(o), D = I(), o = z(L.x, L.y)), 
d.extend(this, {
deleteTable:r,
split:C,
merge:p,
insertRow:l,
insertCol:h,
deleteCols:n,
deleteRows:m,
cutRows:E,
copyRows:J,
pasteRows:B,
getPos:F,
setStartCell:w,
setEndCell:v
});
}
var e = d.each;
d.create("tinymce.plugins.TablePlugin", {
init:function(g, h) {
function l(p) {
var o = g.selection, n = g.dom.getParent(p || o.getNode(), "table");
return n ? new b(n, g.dom, o) :void 0;
}
function k() {
g.getBody().style.webkitUserSelect = "", j && (g.dom.removeClass(g.dom.select("td.mceSelected,th.mceSelected"), "mceSelected"), 
j = !1);
}
var f, m, j = !0;
e([ [ "table", "table.desc", "mceInsertTable", !0 ], [ "delete_table", "table.del", "mceTableDelete" ], [ "delete_col", "table.delete_col_desc", "mceTableDeleteCol" ], [ "delete_row", "table.delete_row_desc", "mceTableDeleteRow" ], [ "col_after", "table.col_after_desc", "mceTableInsertColAfter" ], [ "col_before", "table.col_before_desc", "mceTableInsertColBefore" ], [ "row_after", "table.row_after_desc", "mceTableInsertRowAfter" ], [ "row_before", "table.row_before_desc", "mceTableInsertRowBefore" ], [ "row_props", "table.row_desc", "mceTableRowProps", !0 ], [ "cell_props", "table.cell_desc", "mceTableCellProps", !0 ], [ "split_cells", "table.split_cells_desc", "mceTableSplitCells", !0 ], [ "merge_cells", "table.merge_cells_desc", "mceTableMergeCells", !0 ] ], function(n) {
g.addButton(n[0], {
title:n[1],
cmd:n[2],
ui:n[3]
});
}), d.isIE || g.onClick.add(function(n, o) {
o = o.target, "TABLE" === o.nodeName && (n.selection.select(o), n.nodeChanged());
}), g.onPreProcess.add(function(o, p) {
var n, q, r, s, t = o.dom;
for (n = t.select("table", p.node), q = n.length; q--; ) r = n[q], t.setAttrib(r, "data-mce-style", ""), 
(s = t.getAttrib(r, "width")) && (t.setStyle(r, "width", s), t.setAttrib(r, "width", "")), 
(s = t.getAttrib(r, "height")) && (t.setStyle(r, "height", s), t.setAttrib(r, "height", ""));
}), g.onNodeChange.add(function(q, o, s) {
var r;
s = q.selection.getStart(), r = q.dom.getParent(s, "td,th,caption"), o.setActive("table", "TABLE" === s.nodeName || !!r), 
r && "CAPTION" === r.nodeName && (r = 0), o.setDisabled("delete_table", !r), o.setDisabled("delete_col", !r), 
o.setDisabled("delete_table", !r), o.setDisabled("delete_row", !r), o.setDisabled("col_after", !r), 
o.setDisabled("col_before", !r), o.setDisabled("row_after", !r), o.setDisabled("row_before", !r), 
o.setDisabled("row_props", !r), o.setDisabled("cell_props", !r), o.setDisabled("split_cells", !r), 
o.setDisabled("merge_cells", !r);
}), g.onInit.add(function(r) {
function o(D, z, A, F) {
var C, w, E, B = 3, G = D.dom.getParent(z.startContainer, "TABLE");
return G && (C = G.parentNode), w = z.startContainer.nodeType == B && 0 == z.startOffset && 0 == z.endOffset && F && ("TR" == A.nodeName || A == C), 
E = ("TD" == A.nodeName || "TH" == A.nodeName) && !F, w || E;
}
function n(A) {
if (d.isWebKit) {
var z = A.selection.getRng(), C = A.selection.getNode(), B = A.dom.getParent(z.startContainer, "TD");
if (o(A, z, C, B)) {
B || (B = C);
for (var w = B.lastChild; w.lastChild; ) w = w.lastChild;
z.setEnd(w, w.nodeValue.length), A.selection.setRng(z);
}
}
}
function v(B, M) {
function F(Q) {
B.selection.setCursorLocation(Q, 0);
}
function H(R, Q) {
return R.keyCode == z ? Q.previousSibling :Q.nextSibling;
}
function G(R, S) {
var Q = H(R, S);
return null !== Q && "TR" === Q.tagName ? Q :null;
}
function C(Q, R) {
return Q.dom.getParent(R, "table");
}
function O(Q) {
var R = C(B, Q);
return H(M, R);
}
function A(Q) {
return Q.keyCode == z || Q.keyCode == I;
}
function D(Q) {
var S = Q.selection.getNode(), R = Q.dom.getParent(S, "tr");
return null !== R;
}
function N(R) {
for (var Q = 0, S = R; S.previousSibling; ) S = S.previousSibling, Q += a(S, "colspan");
return Q;
}
function E(S, Q) {
var T = 0, R = 0;
return e(S.children, function(U, V) {
return T += a(U, "colspan"), R = V, T > Q ? !1 :void 0;
}), R;
}
function w(S, T, V) {
var U = N(S.dom.getParent(T, "td")), R = E(V, U), Q = V.childNodes[R];
F(Q);
}
function L(R, T) {
var Q = O(R);
if (null !== Q) return F(Q), d.dom.Event.cancel(T);
var S = T.keyCode == z ? R.firstChild :R.lastChild;
return F(S), !0;
}
var z = 38, I = 40;
if (A(M) && D(B)) {
var J = B.selection.getNode(), P = B.dom.getParent(J, "tr"), K = G(M, P);
return null == K ? L(P, M) :(w(B, J, K), d.dom.Event.cancel(M), !0);
}
}
function s() {
var w;
for (w = r.getBody().lastChild; w && 3 == w.nodeType && !w.nodeValue.length; w = w.previousSibling) ;
w && "TABLE" == w.nodeName && r.dom.add(r.getBody(), "p", null, '<br mce_bogus="1" />');
}
var p, t, u, q = r.dom;
f = r.windowManager, r.onMouseDown.add(function(w, z) {
2 != z.button && (k(), t = q.getParent(z.target, "td,th"), p = q.getParent(t, "table"));
}), q.bind(r.getDoc(), "mouseover", function(C) {
var A, z, B = C.target;
if (t && (u || B != t) && ("TD" == B.nodeName || "TH" == B.nodeName)) {
z = q.getParent(B, "table"), z == p && (u || (u = l(z), u.setStartCell(t), r.getBody().style.webkitUserSelect = "none"), 
u.setEndCell(B), j = !0), A = r.selection.getSel();
try {
A.removeAllRanges ? A.removeAllRanges() :A.empty();
} catch (w) {}
C.preventDefault();
}
}), r.onMouseUp.add(function(F) {
function D(J, L) {
var K = new d.dom.TreeWalker(J, J);
do {
if (3 == J.nodeType && 0 != d.trim(J.nodeValue).length) return L ? z.setStart(J, 0) :z.setEnd(J, J.nodeValue.length), 
void 0;
if ("BR" == J.nodeName) return L ? z.setStartBefore(J) :z.setEndBefore(J), void 0;
} while (J = L ? K.next() :K.prev());
}
{
var z, H, w, C, A, E, B = F.selection;
B.getSel();
}
if (t) {
if (u && (F.getBody().style.webkitUserSelect = ""), H = q.select("td.mceSelected,th.mceSelected"), 
H.length > 0) {
z = q.createRng(), C = H[0], E = H[H.length - 1], z.setStartBefore(C), z.setEndAfter(C), 
D(C, 1), w = new d.dom.TreeWalker(C, q.getParent(H[0], "table"));
do if ("TD" == C.nodeName || "TH" == C.nodeName) {
if (!q.hasClass(C, "mceSelected")) break;
A = C;
} while (C = w.next());
D(A), B.setRng(z);
}
F.nodeChanged(), t = u = p = null;
}
}), r.onKeyUp.add(function() {
k();
}), r.onKeyDown.add(function(w) {
n(w);
}), r.onMouseDown.add(function(w, z) {
2 != z.button && n(w);
}), r.plugins.table.fixTableCellSelection = n, r && r.plugins.contextmenu && r.plugins.contextmenu.onContextMenu.add(function(A, w, C) {
var D, B = r.selection, z = B.getNode() || r.getBody();
r.dom.getParent(C, "td") || r.dom.getParent(C, "th") || r.dom.select("td.mceSelected,th.mceSelected").length ? (w.removeAll(), 
"A" != z.nodeName || r.dom.getAttrib(z, "name") || (w.add({
title:"advanced.link_desc",
icon:"link",
cmd:r.plugins.advlink ? "mceAdvLink" :"mceLink",
ui:!0
}), w.add({
title:"advanced.unlink_desc",
icon:"unlink",
cmd:"UnLink"
}), w.addSeparator()), "IMG" == z.nodeName && -1 == z.className.indexOf("mceItem") && (w.add({
title:"advanced.image_desc",
icon:"image",
cmd:r.plugins.advimage ? "mceAdvImage" :"mceImage",
ui:!0
}), w.addSeparator()), w.add({
title:"table.desc",
icon:"table",
cmd:"mceInsertTable",
value:{
action:"insert"
}
}), w.add({
title:"table.props_desc",
icon:"table_props",
cmd:"mceInsertTable"
}), w.add({
title:"table.del",
icon:"delete_table",
cmd:"mceTableDelete"
}), w.addSeparator(), D = w.addMenu({
title:"table.cell"
}), D.add({
title:"table.cell_desc",
icon:"cell_props",
cmd:"mceTableCellProps"
}), D.add({
title:"table.split_cells_desc",
icon:"split_cells",
cmd:"mceTableSplitCells"
}), D.add({
title:"table.merge_cells_desc",
icon:"merge_cells",
cmd:"mceTableMergeCells"
}), D = w.addMenu({
title:"table.row"
}), D.add({
title:"table.row_desc",
icon:"row_props",
cmd:"mceTableRowProps"
}), D.add({
title:"table.row_before_desc",
icon:"row_before",
cmd:"mceTableInsertRowBefore"
}), D.add({
title:"table.row_after_desc",
icon:"row_after",
cmd:"mceTableInsertRowAfter"
}), D.add({
title:"table.delete_row_desc",
icon:"delete_row",
cmd:"mceTableDeleteRow"
}), D.addSeparator(), D.add({
title:"table.cut_row_desc",
icon:"cut",
cmd:"mceTableCutRow"
}), D.add({
title:"table.copy_row_desc",
icon:"copy",
cmd:"mceTableCopyRow"
}), D.add({
title:"table.paste_row_before_desc",
icon:"paste",
cmd:"mceTablePasteRowBefore"
}).setDisabled(!m), D.add({
title:"table.paste_row_after_desc",
icon:"paste",
cmd:"mceTablePasteRowAfter"
}).setDisabled(!m), D = w.addMenu({
title:"table.col"
}), D.add({
title:"table.col_before_desc",
icon:"col_before",
cmd:"mceTableInsertColBefore"
}), D.add({
title:"table.col_after_desc",
icon:"col_after",
cmd:"mceTableInsertColAfter"
}), D.add({
title:"table.delete_col_desc",
icon:"delete_col",
cmd:"mceTableDeleteCol"
})) :w.add({
title:"table.desc",
icon:"table",
cmd:"mceInsertTable"
});
}), d.isWebKit && r.onKeyDown.add(v), d.isIE || (d.isGecko && r.onKeyDown.add(function(z, B) {
var w, A, C = z.dom;
(37 == B.keyCode || 38 == B.keyCode) && (w = z.selection.getRng(), A = C.getParent(w.startContainer, "table"), 
A && z.getBody().firstChild == A && c(w, A) && (w = C.createRng(), w.setStartBefore(A), 
w.setEndBefore(A), z.selection.setRng(w), B.preventDefault()));
}), r.onKeyUp.add(s), r.onSetContent.add(s), r.onVisualAid.add(s), r.onPreProcess.add(function(w, A) {
var z = A.node.lastChild;
z && 1 == z.childNodes.length && "BR" == z.firstChild.nodeName && w.dom.remove(z);
}), s());
}), e({
mceTableSplitCells:function(n) {
n.split();
},
mceTableMergeCells:function(o) {
var p, q, n;
n = g.dom.getParent(g.selection.getNode(), "th,td"), n && (p = n.rowSpan, q = n.colSpan), 
g.dom.select("td.mceSelected,th.mceSelected").length ? o.merge() :f.open({
url:h + "/merge_cells.htm",
width:240 + parseInt(g.getLang("table.merge_cells_delta_width", 0)),
height:110 + parseInt(g.getLang("table.merge_cells_delta_height", 0)),
inline:1
}, {
rows:p,
cols:q,
onaction:function(r) {
o.merge(n, r.cols, r.rows);
},
plugin_url:h
});
},
mceTableInsertRowBefore:function(n) {
n.insertRow(!0);
},
mceTableInsertRowAfter:function(n) {
n.insertRow();
},
mceTableInsertColBefore:function(n) {
n.insertCol(!0);
},
mceTableInsertColAfter:function(n) {
n.insertCol();
},
mceTableDeleteCol:function(n) {
n.deleteCols();
},
mceTableDeleteRow:function(n) {
n.deleteRows();
},
mceTableCutRow:function(n) {
m = n.cutRows();
},
mceTableCopyRow:function(n) {
m = n.copyRows();
},
mceTablePasteRowBefore:function(n) {
n.pasteRows(m, !0);
},
mceTablePasteRowAfter:function(n) {
n.pasteRows(m);
},
mceTableDelete:function(n) {
n.deleteTable();
}
}, function(o, n) {
g.addCommand(n, function() {
var p = l();
p && (o(p), g.execCommand("mceRepaint"), k());
});
}), e({
mceInsertTable:function(n) {
f.open({
url:h + "/table.htm",
width:400 + parseInt(g.getLang("table.table_delta_width", 0)),
height:320 + parseInt(g.getLang("table.table_delta_height", 0)),
inline:1
}, {
plugin_url:h,
action:n ? n.action :0
});
},
mceTableRowProps:function() {
f.open({
url:h + "/row.htm",
width:400 + parseInt(g.getLang("table.rowprops_delta_width", 0)),
height:295 + parseInt(g.getLang("table.rowprops_delta_height", 0)),
inline:1
}, {
plugin_url:h
});
},
mceTableCellProps:function() {
f.open({
url:h + "/cell.htm",
width:400 + parseInt(g.getLang("table.cellprops_delta_width", 0)),
height:295 + parseInt(g.getLang("table.cellprops_delta_height", 0)),
inline:1
}, {
plugin_url:h
});
}
}, function(o, n) {
g.addCommand(n, function(p, q) {
o(q);
});
});
}
}), d.PluginManager.add("table", d.plugins.TablePlugin);
}(tinymce);