/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */
!function(tinymce) {
function isAtStart(rng, par) {
var elm, doc = par.ownerDocument, rng2 = doc.createRange();
return rng2.setStartBefore(par), rng2.setEnd(rng.endContainer, rng.endOffset), elm = doc.createElement("body"), 
elm.appendChild(rng2.cloneContents()), 0 == elm.innerHTML.replace(/<(br|img|object|embed|input|textarea)[^>]*>/gi, "-").replace(/<[^>]+>/g, "").length;
}
function getSpanVal(td, name) {
return parseInt(td.getAttribute(name) || 1);
}
function TableGrid(table, dom, selection) {
function cloneNode(node, children) {
return node = node.cloneNode(children), node.removeAttribute("id"), node;
}
function buildGrid() {
var startY = 0;
grid = [], each([ "thead", "tbody", "tfoot" ], function(part) {
var rows = dom.select("> " + part + " tr", table);
each(rows, function(tr, y) {
y += startY, each(dom.select("> td, > th", tr), function(td, x) {
var x2, y2, rowspan, colspan;
if (grid[y]) for (;grid[y][x]; ) x++;
for (rowspan = getSpanVal(td, "rowspan"), colspan = getSpanVal(td, "colspan"), y2 = y; y + rowspan > y2; y2++) for (grid[y2] || (grid[y2] = []), 
x2 = x; x + colspan > x2; x2++) grid[y2][x2] = {
part:part,
real:y2 == y && x2 == x,
elm:td,
rowspan:rowspan,
colspan:colspan
};
});
}), startY += rows.length;
});
}
function getCell(x, y) {
var row;
return row = grid[y], row ? row[x] :void 0;
}
function setSpanVal(td, name, val) {
td && (val = parseInt(val), 1 === val ? td.removeAttribute(name, 1) :td.setAttribute(name, val, 1));
}
function isCellSelected(cell) {
return cell && (dom.hasClass(cell.elm, "mceSelected") || cell == selectedCell);
}
function getSelectedRows() {
var rows = [];
return each(table.rows, function(row) {
each(row.cells, function(cell) {
return dom.hasClass(cell, "mceSelected") || cell == selectedCell.elm ? (rows.push(row), 
!1) :void 0;
});
}), rows;
}
function deleteTable() {
var rng = dom.createRng();
rng.setStartAfter(table), rng.setEndAfter(table), selection.setRng(rng), dom.remove(table);
}
function cloneCell(cell) {
var formatNode;
return tinymce.walk(cell, function(node) {
var curNode;
return 3 == node.nodeType ? (each(dom.getParents(node.parentNode, null, cell).reverse(), function(node) {
node = cloneNode(node, !1), formatNode ? curNode && curNode.appendChild(node) :formatNode = curNode = node, 
curNode = node;
}), curNode && (curNode.innerHTML = tinymce.isIE ? "&nbsp;" :'<br data-mce-bogus="1" />'), 
!1) :void 0;
}, "childNodes"), cell = cloneNode(cell, !1), setSpanVal(cell, "rowSpan", 1), setSpanVal(cell, "colSpan", 1), 
formatNode ? cell.appendChild(formatNode) :tinymce.isIE || (cell.innerHTML = '<br data-mce-bogus="1" />'), 
cell;
}
function cleanup() {
var rng = dom.createRng();
return each(dom.select("tr", table), function(tr) {
0 == tr.cells.length && dom.remove(tr);
}), 0 == dom.select("tr", table).length ? (rng.setStartAfter(table), rng.setEndAfter(table), 
selection.setRng(rng), dom.remove(table), void 0) :(each(dom.select("thead,tbody,tfoot", table), function(part) {
0 == part.rows.length && dom.remove(part);
}), buildGrid(), row = grid[Math.min(grid.length - 1, startPos.y)], row && (selection.select(row[Math.min(row.length - 1, startPos.x)].elm, !0), 
selection.collapse(!0)), void 0);
}
function fillLeftDown(x, y, rows, cols) {
var tr, x2, r, c, cell;
for (tr = grid[y][x].elm.parentNode, r = 1; rows >= r; r++) if (tr = dom.getNext(tr, "tr")) {
for (x2 = x; x2 >= 0; x2--) if (cell = grid[y + r][x2].elm, cell.parentNode == tr) {
for (c = 1; cols >= c; c++) dom.insertAfter(cloneCell(cell), cell);
break;
}
if (-1 == x2) for (c = 1; cols >= c; c++) tr.insertBefore(cloneCell(tr.cells[0]), tr.cells[0]);
}
}
function split() {
each(grid, function(row, y) {
each(row, function(cell, x) {
var colSpan, rowSpan, i;
if (isCellSelected(cell) && (cell = cell.elm, colSpan = getSpanVal(cell, "colspan"), 
rowSpan = getSpanVal(cell, "rowspan"), colSpan > 1 || rowSpan > 1)) {
for (setSpanVal(cell, "rowSpan", 1), setSpanVal(cell, "colSpan", 1), i = 0; colSpan - 1 > i; i++) dom.insertAfter(cloneCell(cell), cell);
fillLeftDown(x, y, rowSpan - 1, colSpan);
}
});
});
}
function merge(cell, cols, rows) {
var startX, startY, endX, endY, x, y, startCell, endCell, cell, children, count;
if (cell ? (pos = getPos(cell), startX = pos.x, startY = pos.y, endX = startX + (cols - 1), 
endY = startY + (rows - 1)) :(startX = startPos.x, startY = startPos.y, endX = endPos.x, 
endY = endPos.y), startCell = getCell(startX, startY), endCell = getCell(endX, endY), 
startCell && endCell && startCell.part == endCell.part) {
for (split(), buildGrid(), startCell = getCell(startX, startY).elm, setSpanVal(startCell, "colSpan", endX - startX + 1), 
setSpanVal(startCell, "rowSpan", endY - startY + 1), y = startY; endY >= y; y++) for (x = startX; endX >= x; x++) grid[y] && grid[y][x] && (cell = grid[y][x].elm, 
cell != startCell && (children = tinymce.grep(cell.childNodes), each(children, function(node) {
startCell.appendChild(node);
}), children.length && (children = tinymce.grep(startCell.childNodes), count = 0, 
each(children, function(node) {
"BR" == node.nodeName && dom.getAttrib(node, "data-mce-bogus") && count++ < children.length - 1 && startCell.removeChild(node);
})), dom.remove(cell)));
cleanup();
}
}
function insertRow(before) {
var posY, cell, lastCell, x, rowElm, newRow, newCell, otherCell, rowSpan;
for (each(grid, function(row, y) {
return each(row, function(cell) {
return isCellSelected(cell) && (cell = cell.elm, rowElm = cell.parentNode, newRow = cloneNode(rowElm, !1), 
posY = y, before) ? !1 :void 0;
}), before ? !posY :void 0;
}), x = 0; x < grid[0].length; x++) if (grid[posY][x] && (cell = grid[posY][x].elm, 
cell != lastCell)) {
if (before) {
if (posY > 0 && grid[posY - 1][x] && (otherCell = grid[posY - 1][x].elm, rowSpan = getSpanVal(otherCell, "rowSpan"), 
rowSpan > 1)) {
setSpanVal(otherCell, "rowSpan", rowSpan + 1);
continue;
}
} else if (rowSpan = getSpanVal(cell, "rowspan"), rowSpan > 1) {
setSpanVal(cell, "rowSpan", rowSpan + 1);
continue;
}
newCell = cloneCell(cell), setSpanVal(newCell, "colSpan", cell.colSpan), newRow.appendChild(newCell), 
lastCell = cell;
}
newRow.hasChildNodes() && (before ? rowElm.parentNode.insertBefore(newRow, rowElm) :dom.insertAfter(newRow, rowElm));
}
function insertCol(before) {
var posX, lastCell;
each(grid, function(row) {
return each(row, function(cell, x) {
return isCellSelected(cell) && (posX = x, before) ? !1 :void 0;
}), before ? !posX :void 0;
}), each(grid, function(row, y) {
var cell, rowSpan, colSpan;
row[posX] && (cell = row[posX].elm, cell != lastCell && (colSpan = getSpanVal(cell, "colspan"), 
rowSpan = getSpanVal(cell, "rowspan"), 1 == colSpan ? before ? (cell.parentNode.insertBefore(cloneCell(cell), cell), 
fillLeftDown(posX, y, rowSpan - 1, colSpan)) :(dom.insertAfter(cloneCell(cell), cell), 
fillLeftDown(posX, y, rowSpan - 1, colSpan)) :setSpanVal(cell, "colSpan", cell.colSpan + 1), 
lastCell = cell));
});
}
function deleteCols() {
var cols = [];
each(grid, function(row) {
each(row, function(cell, x) {
isCellSelected(cell) && -1 === tinymce.inArray(cols, x) && (each(grid, function(row) {
var colSpan, cell = row[x].elm;
colSpan = getSpanVal(cell, "colSpan"), colSpan > 1 ? setSpanVal(cell, "colSpan", colSpan - 1) :dom.remove(cell);
}), cols.push(x));
});
}), cleanup();
}
function deleteRows() {
function deleteRow(tr) {
var nextTr, pos, lastCell;
nextTr = dom.getNext(tr, "tr"), each(tr.cells, function(cell) {
var rowSpan = getSpanVal(cell, "rowSpan");
rowSpan > 1 && (setSpanVal(cell, "rowSpan", rowSpan - 1), pos = getPos(cell), fillLeftDown(pos.x, pos.y, 1, 1));
}), pos = getPos(tr.cells[0]), each(grid[pos.y], function(cell) {
var rowSpan;
cell = cell.elm, cell != lastCell && (rowSpan = getSpanVal(cell, "rowSpan"), 1 >= rowSpan ? dom.remove(cell) :setSpanVal(cell, "rowSpan", rowSpan - 1), 
lastCell = cell);
});
}
var rows;
rows = getSelectedRows(), each(rows.reverse(), function(tr) {
deleteRow(tr);
}), cleanup();
}
function cutRows() {
var rows = getSelectedRows();
return dom.remove(rows), cleanup(), rows;
}
function copyRows() {
var rows = getSelectedRows();
return each(rows, function(row, i) {
rows[i] = cloneNode(row, !0);
}), rows;
}
function pasteRows(rows, before) {
var selectedRows = getSelectedRows(), targetRow = selectedRows[before ? 0 :selectedRows.length - 1], targetCellCount = targetRow.cells.length;
each(grid, function(row) {
var match;
return targetCellCount = 0, each(row, function(cell) {
cell.real && (targetCellCount += cell.colspan), cell.elm.parentNode == targetRow && (match = 1);
}), match ? !1 :void 0;
}), before || rows.reverse(), each(rows, function(row) {
var cell, cellCount = row.cells.length;
for (i = 0; cellCount > i; i++) cell = row.cells[i], setSpanVal(cell, "colSpan", 1), 
setSpanVal(cell, "rowSpan", 1);
for (i = cellCount; targetCellCount > i; i++) row.appendChild(cloneCell(row.cells[cellCount - 1]));
for (i = targetCellCount; cellCount > i; i++) dom.remove(row.cells[i]);
before ? targetRow.parentNode.insertBefore(row, targetRow) :dom.insertAfter(row, targetRow);
});
}
function getPos(target) {
var pos;
return each(grid, function(row, y) {
return each(row, function(cell, x) {
return cell.elm == target ? (pos = {
x:x,
y:y
}, !1) :void 0;
}), !pos;
}), pos;
}
function setStartCell(cell) {
startPos = getPos(cell);
}
function findEndPos() {
var maxX, maxY;
return maxX = maxY = 0, each(grid, function(row, y) {
each(row, function(cell, x) {
var colSpan, rowSpan;
isCellSelected(cell) && (cell = grid[y][x], x > maxX && (maxX = x), y > maxY && (maxY = y), 
cell.real && (colSpan = cell.colspan - 1, rowSpan = cell.rowspan - 1, colSpan && x + colSpan > maxX && (maxX = x + colSpan), 
rowSpan && y + rowSpan > maxY && (maxY = y + rowSpan)));
});
}), {
x:maxX,
y:maxY
};
}
function setEndCell(cell) {
var startX, startY, endX, endY, maxX, maxY, colSpan, rowSpan;
if (endPos = getPos(cell), startPos && endPos) {
for (startX = Math.min(startPos.x, endPos.x), startY = Math.min(startPos.y, endPos.y), 
endX = Math.max(startPos.x, endPos.x), endY = Math.max(startPos.y, endPos.y), maxX = endX, 
maxY = endY, y = startY; maxY >= y; y++) cell = grid[y][startX], cell.real || startX - (cell.colspan - 1) < startX && (startX -= cell.colspan - 1);
for (x = startX; maxX >= x; x++) cell = grid[startY][x], cell.real || startY - (cell.rowspan - 1) < startY && (startY -= cell.rowspan - 1);
for (y = startY; endY >= y; y++) for (x = startX; endX >= x; x++) cell = grid[y][x], 
cell.real && (colSpan = cell.colspan - 1, rowSpan = cell.rowspan - 1, colSpan && x + colSpan > maxX && (maxX = x + colSpan), 
rowSpan && y + rowSpan > maxY && (maxY = y + rowSpan));
for (dom.removeClass(dom.select("td.mceSelected,th.mceSelected"), "mceSelected"), 
y = startY; maxY >= y; y++) for (x = startX; maxX >= x; x++) grid[y][x] && dom.addClass(grid[y][x].elm, "mceSelected");
}
}
var grid, startPos, endPos, selectedCell;
buildGrid(), selectedCell = dom.getParent(selection.getStart(), "th,td"), selectedCell && (startPos = getPos(selectedCell), 
endPos = findEndPos(), selectedCell = getCell(startPos.x, startPos.y)), tinymce.extend(this, {
deleteTable:deleteTable,
split:split,
merge:merge,
insertRow:insertRow,
insertCol:insertCol,
deleteCols:deleteCols,
deleteRows:deleteRows,
cutRows:cutRows,
copyRows:copyRows,
pasteRows:pasteRows,
getPos:getPos,
setStartCell:setStartCell,
setEndCell:setEndCell
});
}
var each = tinymce.each;
tinymce.create("tinymce.plugins.TablePlugin", {
init:function(ed, url) {
function createTableGrid(node) {
var selection = ed.selection, tblElm = ed.dom.getParent(node || selection.getNode(), "table");
return tblElm ? new TableGrid(tblElm, ed.dom, selection) :void 0;
}
function cleanup() {
ed.getBody().style.webkitUserSelect = "", hasCellSelection && (ed.dom.removeClass(ed.dom.select("td.mceSelected,th.mceSelected"), "mceSelected"), 
hasCellSelection = !1);
}
var winMan, clipboardRows, hasCellSelection = !0;
each([ [ "table", "table.desc", "mceInsertTable", !0 ], [ "delete_table", "table.del", "mceTableDelete" ], [ "delete_col", "table.delete_col_desc", "mceTableDeleteCol" ], [ "delete_row", "table.delete_row_desc", "mceTableDeleteRow" ], [ "col_after", "table.col_after_desc", "mceTableInsertColAfter" ], [ "col_before", "table.col_before_desc", "mceTableInsertColBefore" ], [ "row_after", "table.row_after_desc", "mceTableInsertRowAfter" ], [ "row_before", "table.row_before_desc", "mceTableInsertRowBefore" ], [ "row_props", "table.row_desc", "mceTableRowProps", !0 ], [ "cell_props", "table.cell_desc", "mceTableCellProps", !0 ], [ "split_cells", "table.split_cells_desc", "mceTableSplitCells", !0 ], [ "merge_cells", "table.merge_cells_desc", "mceTableMergeCells", !0 ] ], function(c) {
ed.addButton(c[0], {
title:c[1],
cmd:c[2],
ui:c[3]
});
}), tinymce.isIE || ed.onClick.add(function(ed, e) {
e = e.target, "TABLE" === e.nodeName && (ed.selection.select(e), ed.nodeChanged());
}), ed.onPreProcess.add(function(ed, args) {
var nodes, i, node, value, dom = ed.dom;
for (nodes = dom.select("table", args.node), i = nodes.length; i--; ) node = nodes[i], 
dom.setAttrib(node, "data-mce-style", ""), (value = dom.getAttrib(node, "width")) && (dom.setStyle(node, "width", value), 
dom.setAttrib(node, "width", "")), (value = dom.getAttrib(node, "height")) && (dom.setStyle(node, "height", value), 
dom.setAttrib(node, "height", ""));
}), ed.onNodeChange.add(function(ed, cm, n) {
var p;
n = ed.selection.getStart(), p = ed.dom.getParent(n, "td,th,caption"), cm.setActive("table", "TABLE" === n.nodeName || !!p), 
p && "CAPTION" === p.nodeName && (p = 0), cm.setDisabled("delete_table", !p), cm.setDisabled("delete_col", !p), 
cm.setDisabled("delete_table", !p), cm.setDisabled("delete_row", !p), cm.setDisabled("col_after", !p), 
cm.setDisabled("col_before", !p), cm.setDisabled("row_after", !p), cm.setDisabled("row_before", !p), 
cm.setDisabled("row_props", !p), cm.setDisabled("cell_props", !p), cm.setDisabled("split_cells", !p), 
cm.setDisabled("merge_cells", !p);
}), ed.onInit.add(function(ed) {
function tableCellSelected(ed, rng, n, currentCell) {
var tableParent, allOfCellSelected, tableCellSelection, TEXT_NODE = 3, table = ed.dom.getParent(rng.startContainer, "TABLE");
return table && (tableParent = table.parentNode), allOfCellSelected = rng.startContainer.nodeType == TEXT_NODE && 0 == rng.startOffset && 0 == rng.endOffset && currentCell && ("TR" == n.nodeName || n == tableParent), 
tableCellSelection = ("TD" == n.nodeName || "TH" == n.nodeName) && !currentCell, 
allOfCellSelected || tableCellSelection;
}
function fixTableCellSelection(ed) {
if (tinymce.isWebKit) {
var rng = ed.selection.getRng(), n = ed.selection.getNode(), currentCell = ed.dom.getParent(rng.startContainer, "TD");
if (tableCellSelected(ed, rng, n, currentCell)) {
currentCell || (currentCell = n);
for (var end = currentCell.lastChild; end.lastChild; ) end = end.lastChild;
rng.setEnd(end, end.nodeValue.length), ed.selection.setRng(rng);
}
}
}
function moveSelection(ed, e) {
function moveCursorToStartOfElement(n) {
ed.selection.setCursorLocation(n, 0);
}
function getSibling(event, element) {
return event.keyCode == UP_ARROW ? element.previousSibling :element.nextSibling;
}
function getNextRow(e, row) {
var sibling = getSibling(e, row);
return null !== sibling && "TR" === sibling.tagName ? sibling :null;
}
function getTable(ed, currentRow) {
return ed.dom.getParent(currentRow, "table");
}
function getTableSibling(currentRow) {
var table = getTable(ed, currentRow);
return getSibling(e, table);
}
function isVerticalMovement(event) {
return event.keyCode == UP_ARROW || event.keyCode == DOWN_ARROW;
}
function isInTable(ed) {
var node = ed.selection.getNode(), currentRow = ed.dom.getParent(node, "tr");
return null !== currentRow;
}
function columnIndex(column) {
for (var colIndex = 0, c = column; c.previousSibling; ) c = c.previousSibling, colIndex += getSpanVal(c, "colspan");
return colIndex;
}
function findColumn(rowElement, columnIndex) {
var c = 0, r = 0;
return each(rowElement.children, function(cell, i) {
return c += getSpanVal(cell, "colspan"), r = i, c > columnIndex ? !1 :void 0;
}), r;
}
function moveCursorToRow(ed, node, row) {
var srcColumnIndex = columnIndex(ed.dom.getParent(node, "td")), tgtColumnIndex = findColumn(row, srcColumnIndex), tgtNode = row.childNodes[tgtColumnIndex];
moveCursorToStartOfElement(tgtNode);
}
function escapeTable(currentRow, e) {
var tableSiblingElement = getTableSibling(currentRow);
if (null !== tableSiblingElement) return moveCursorToStartOfElement(tableSiblingElement), 
tinymce.dom.Event.cancel(e);
var element = e.keyCode == UP_ARROW ? currentRow.firstChild :currentRow.lastChild;
return moveCursorToStartOfElement(element), !0;
}
var UP_ARROW = 38, DOWN_ARROW = 40;
if (isVerticalMovement(e) && isInTable(ed)) {
var node = ed.selection.getNode(), currentRow = ed.dom.getParent(node, "tr"), nextRow = getNextRow(e, currentRow);
return null == nextRow ? escapeTable(currentRow, e) :(moveCursorToRow(ed, node, nextRow), 
tinymce.dom.Event.cancel(e), !0);
}
}
function fixTableCaretPos() {
var last;
for (last = ed.getBody().lastChild; last && 3 == last.nodeType && !last.nodeValue.length; last = last.previousSibling) ;
last && "TABLE" == last.nodeName && ed.dom.add(ed.getBody(), "p", null, '<br mce_bogus="1" />');
}
var startTable, startCell, tableGrid, dom = ed.dom;
winMan = ed.windowManager, ed.onMouseDown.add(function(ed, e) {
2 != e.button && (cleanup(), startCell = dom.getParent(e.target, "td,th"), startTable = dom.getParent(startCell, "table"));
}), dom.bind(ed.getDoc(), "mouseover", function(e) {
var sel, table, target = e.target;
if (startCell && (tableGrid || target != startCell) && ("TD" == target.nodeName || "TH" == target.nodeName)) {
table = dom.getParent(target, "table"), table == startTable && (tableGrid || (tableGrid = createTableGrid(table), 
tableGrid.setStartCell(startCell), ed.getBody().style.webkitUserSelect = "none"), 
tableGrid.setEndCell(target), hasCellSelection = !0), sel = ed.selection.getSel();
try {
sel.removeAllRanges ? sel.removeAllRanges() :sel.empty();
} catch (ex) {}
e.preventDefault();
}
}), ed.onMouseUp.add(function(ed) {
function setPoint(node, start) {
var walker = new tinymce.dom.TreeWalker(node, node);
do {
if (3 == node.nodeType && 0 != tinymce.trim(node.nodeValue).length) return start ? rng.setStart(node, 0) :rng.setEnd(node, node.nodeValue.length), 
void 0;
if ("BR" == node.nodeName) return start ? rng.setStartBefore(node) :rng.setEndBefore(node), 
void 0;
} while (node = start ? walker.next() :walker.prev());
}
{
var rng, selectedCells, walker, node, lastNode, endNode, sel = ed.selection;
sel.getSel();
}
if (startCell) {
if (tableGrid && (ed.getBody().style.webkitUserSelect = ""), selectedCells = dom.select("td.mceSelected,th.mceSelected"), 
selectedCells.length > 0) {
rng = dom.createRng(), node = selectedCells[0], endNode = selectedCells[selectedCells.length - 1], 
rng.setStartBefore(node), rng.setEndAfter(node), setPoint(node, 1), walker = new tinymce.dom.TreeWalker(node, dom.getParent(selectedCells[0], "table"));
do if ("TD" == node.nodeName || "TH" == node.nodeName) {
if (!dom.hasClass(node, "mceSelected")) break;
lastNode = node;
} while (node = walker.next());
setPoint(lastNode), sel.setRng(rng);
}
ed.nodeChanged(), startCell = tableGrid = startTable = null;
}
}), ed.onKeyUp.add(function() {
cleanup();
}), ed.onKeyDown.add(function(ed) {
fixTableCellSelection(ed);
}), ed.onMouseDown.add(function(ed, e) {
2 != e.button && fixTableCellSelection(ed);
}), ed.plugins.table.fixTableCellSelection = fixTableCellSelection, ed && ed.plugins.contextmenu && ed.plugins.contextmenu.onContextMenu.add(function(th, m, e) {
var sm, se = ed.selection, el = se.getNode() || ed.getBody();
ed.dom.getParent(e, "td") || ed.dom.getParent(e, "th") || ed.dom.select("td.mceSelected,th.mceSelected").length ? (m.removeAll(), 
"A" != el.nodeName || ed.dom.getAttrib(el, "name") || (m.add({
title:"advanced.link_desc",
icon:"link",
cmd:ed.plugins.advlink ? "mceAdvLink" :"mceLink",
ui:!0
}), m.add({
title:"advanced.unlink_desc",
icon:"unlink",
cmd:"UnLink"
}), m.addSeparator()), "IMG" == el.nodeName && -1 == el.className.indexOf("mceItem") && (m.add({
title:"advanced.image_desc",
icon:"image",
cmd:ed.plugins.advimage ? "mceAdvImage" :"mceImage",
ui:!0
}), m.addSeparator()), m.add({
title:"table.desc",
icon:"table",
cmd:"mceInsertTable",
value:{
action:"insert"
}
}), m.add({
title:"table.props_desc",
icon:"table_props",
cmd:"mceInsertTable"
}), m.add({
title:"table.del",
icon:"delete_table",
cmd:"mceTableDelete"
}), m.addSeparator(), sm = m.addMenu({
title:"table.cell"
}), sm.add({
title:"table.cell_desc",
icon:"cell_props",
cmd:"mceTableCellProps"
}), sm.add({
title:"table.split_cells_desc",
icon:"split_cells",
cmd:"mceTableSplitCells"
}), sm.add({
title:"table.merge_cells_desc",
icon:"merge_cells",
cmd:"mceTableMergeCells"
}), sm = m.addMenu({
title:"table.row"
}), sm.add({
title:"table.row_desc",
icon:"row_props",
cmd:"mceTableRowProps"
}), sm.add({
title:"table.row_before_desc",
icon:"row_before",
cmd:"mceTableInsertRowBefore"
}), sm.add({
title:"table.row_after_desc",
icon:"row_after",
cmd:"mceTableInsertRowAfter"
}), sm.add({
title:"table.delete_row_desc",
icon:"delete_row",
cmd:"mceTableDeleteRow"
}), sm.addSeparator(), sm.add({
title:"table.cut_row_desc",
icon:"cut",
cmd:"mceTableCutRow"
}), sm.add({
title:"table.copy_row_desc",
icon:"copy",
cmd:"mceTableCopyRow"
}), sm.add({
title:"table.paste_row_before_desc",
icon:"paste",
cmd:"mceTablePasteRowBefore"
}).setDisabled(!clipboardRows), sm.add({
title:"table.paste_row_after_desc",
icon:"paste",
cmd:"mceTablePasteRowAfter"
}).setDisabled(!clipboardRows), sm = m.addMenu({
title:"table.col"
}), sm.add({
title:"table.col_before_desc",
icon:"col_before",
cmd:"mceTableInsertColBefore"
}), sm.add({
title:"table.col_after_desc",
icon:"col_after",
cmd:"mceTableInsertColAfter"
}), sm.add({
title:"table.delete_col_desc",
icon:"delete_col",
cmd:"mceTableDeleteCol"
})) :m.add({
title:"table.desc",
icon:"table",
cmd:"mceInsertTable"
});
}), tinymce.isWebKit && ed.onKeyDown.add(moveSelection), tinymce.isIE || (tinymce.isGecko && ed.onKeyDown.add(function(ed, e) {
var rng, table, dom = ed.dom;
(37 == e.keyCode || 38 == e.keyCode) && (rng = ed.selection.getRng(), table = dom.getParent(rng.startContainer, "table"), 
table && ed.getBody().firstChild == table && isAtStart(rng, table) && (rng = dom.createRng(), 
rng.setStartBefore(table), rng.setEndBefore(table), ed.selection.setRng(rng), e.preventDefault()));
}), ed.onKeyUp.add(fixTableCaretPos), ed.onSetContent.add(fixTableCaretPos), ed.onVisualAid.add(fixTableCaretPos), 
ed.onPreProcess.add(function(ed, o) {
var last = o.node.lastChild;
last && 1 == last.childNodes.length && "BR" == last.firstChild.nodeName && ed.dom.remove(last);
}), fixTableCaretPos());
}), each({
mceTableSplitCells:function(grid) {
grid.split();
},
mceTableMergeCells:function(grid) {
var rowSpan, colSpan, cell;
cell = ed.dom.getParent(ed.selection.getNode(), "th,td"), cell && (rowSpan = cell.rowSpan, 
colSpan = cell.colSpan), ed.dom.select("td.mceSelected,th.mceSelected").length ? grid.merge() :winMan.open({
url:url + "/merge_cells.htm",
width:240 + parseInt(ed.getLang("table.merge_cells_delta_width", 0)),
height:110 + parseInt(ed.getLang("table.merge_cells_delta_height", 0)),
inline:1
}, {
rows:rowSpan,
cols:colSpan,
onaction:function(data) {
grid.merge(cell, data.cols, data.rows);
},
plugin_url:url
});
},
mceTableInsertRowBefore:function(grid) {
grid.insertRow(!0);
},
mceTableInsertRowAfter:function(grid) {
grid.insertRow();
},
mceTableInsertColBefore:function(grid) {
grid.insertCol(!0);
},
mceTableInsertColAfter:function(grid) {
grid.insertCol();
},
mceTableDeleteCol:function(grid) {
grid.deleteCols();
},
mceTableDeleteRow:function(grid) {
grid.deleteRows();
},
mceTableCutRow:function(grid) {
clipboardRows = grid.cutRows();
},
mceTableCopyRow:function(grid) {
clipboardRows = grid.copyRows();
},
mceTablePasteRowBefore:function(grid) {
grid.pasteRows(clipboardRows, !0);
},
mceTablePasteRowAfter:function(grid) {
grid.pasteRows(clipboardRows);
},
mceTableDelete:function(grid) {
grid.deleteTable();
}
}, function(func, name) {
ed.addCommand(name, function() {
var grid = createTableGrid();
grid && (func(grid), ed.execCommand("mceRepaint"), cleanup());
});
}), each({
mceInsertTable:function(val) {
winMan.open({
url:url + "/table.htm",
width:400 + parseInt(ed.getLang("table.table_delta_width", 0)),
height:320 + parseInt(ed.getLang("table.table_delta_height", 0)),
inline:1
}, {
plugin_url:url,
action:val ? val.action :0
});
},
mceTableRowProps:function() {
winMan.open({
url:url + "/row.htm",
width:400 + parseInt(ed.getLang("table.rowprops_delta_width", 0)),
height:295 + parseInt(ed.getLang("table.rowprops_delta_height", 0)),
inline:1
}, {
plugin_url:url
});
},
mceTableCellProps:function() {
winMan.open({
url:url + "/cell.htm",
width:400 + parseInt(ed.getLang("table.cellprops_delta_width", 0)),
height:295 + parseInt(ed.getLang("table.cellprops_delta_height", 0)),
inline:1
}, {
plugin_url:url
});
}
}, function(func, name) {
ed.addCommand(name, function(ui, val) {
func(val);
});
});
}
}), tinymce.PluginManager.add("table", tinymce.plugins.TablePlugin);
}(tinymce);