/**
 * @summary     DataTables
 * @description Paginate, search and sort HTML tables
 * @version     1.9.4
 * @file        jquery.dataTables.js
 * @author      Allan Jardine (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 *
 * @copyright Copyright 2008-2012 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 * 
 * This source file is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 * 
 * For details please refer to: http://www.datatables.net
 */
!function(window, document, undefined) {
!function(factory) {
"use strict";
"function" == typeof define && define.amd ? define([ "jquery" ], factory) :jQuery && !jQuery.fn.dataTable && factory(jQuery);
}(function($) {
"use strict";
var DataTable = function(oInit) {
function _fnAddColumn(oSettings, nTh) {
var oDefaults = DataTable.defaults.columns, iCol = oSettings.aoColumns.length, oCol = $.extend({}, DataTable.models.oColumn, oDefaults, {
sSortingClass:oSettings.oClasses.sSortable,
sSortingClassJUI:oSettings.oClasses.sSortJUI,
nTh:nTh ? nTh :document.createElement("th"),
sTitle:oDefaults.sTitle ? oDefaults.sTitle :nTh ? nTh.innerHTML :"",
aDataSort:oDefaults.aDataSort ? oDefaults.aDataSort :[ iCol ],
mData:oDefaults.mData ? oDefaults.oDefaults :iCol
});
if (oSettings.aoColumns.push(oCol), oSettings.aoPreSearchCols[iCol] === undefined || null === oSettings.aoPreSearchCols[iCol]) oSettings.aoPreSearchCols[iCol] = $.extend({}, DataTable.models.oSearch); else {
var oPre = oSettings.aoPreSearchCols[iCol];
oPre.bRegex === undefined && (oPre.bRegex = !0), oPre.bSmart === undefined && (oPre.bSmart = !0), 
oPre.bCaseInsensitive === undefined && (oPre.bCaseInsensitive = !0);
}
_fnColumnOptions(oSettings, iCol, null);
}
function _fnColumnOptions(oSettings, iCol, oOptions) {
var oCol = oSettings.aoColumns[iCol];
oOptions !== undefined && null !== oOptions && (oOptions.mDataProp && !oOptions.mData && (oOptions.mData = oOptions.mDataProp), 
oOptions.sType !== undefined && (oCol.sType = oOptions.sType, oCol._bAutoType = !1), 
$.extend(oCol, oOptions), _fnMap(oCol, oOptions, "sWidth", "sWidthOrig"), oOptions.iDataSort !== undefined && (oCol.aDataSort = [ oOptions.iDataSort ]), 
_fnMap(oCol, oOptions, "aDataSort"));
var mRender = oCol.mRender ? _fnGetObjectDataFn(oCol.mRender) :null, mData = _fnGetObjectDataFn(oCol.mData);
oCol.fnGetData = function(oData, sSpecific) {
var innerData = mData(oData, sSpecific);
return oCol.mRender && sSpecific && "" !== sSpecific ? mRender(innerData, sSpecific, oData) :innerData;
}, oCol.fnSetData = _fnSetObjectDataFn(oCol.mData), oSettings.oFeatures.bSort || (oCol.bSortable = !1), 
!oCol.bSortable || -1 == $.inArray("asc", oCol.asSorting) && -1 == $.inArray("desc", oCol.asSorting) ? (oCol.sSortingClass = oSettings.oClasses.sSortableNone, 
oCol.sSortingClassJUI = "") :-1 == $.inArray("asc", oCol.asSorting) && -1 == $.inArray("desc", oCol.asSorting) ? (oCol.sSortingClass = oSettings.oClasses.sSortable, 
oCol.sSortingClassJUI = oSettings.oClasses.sSortJUI) :-1 != $.inArray("asc", oCol.asSorting) && -1 == $.inArray("desc", oCol.asSorting) ? (oCol.sSortingClass = oSettings.oClasses.sSortableAsc, 
oCol.sSortingClassJUI = oSettings.oClasses.sSortJUIAscAllowed) :-1 == $.inArray("asc", oCol.asSorting) && -1 != $.inArray("desc", oCol.asSorting) && (oCol.sSortingClass = oSettings.oClasses.sSortableDesc, 
oCol.sSortingClassJUI = oSettings.oClasses.sSortJUIDescAllowed);
}
function _fnAdjustColumnSizing(oSettings) {
if (oSettings.oFeatures.bAutoWidth === !1) return !1;
_fnCalculateColumnWidths(oSettings);
for (var i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) oSettings.aoColumns[i].nTh.style.width = oSettings.aoColumns[i].sWidth;
}
function _fnVisibleToColumnIndex(oSettings, iMatch) {
var aiVis = _fnGetColumns(oSettings, "bVisible");
return "number" == typeof aiVis[iMatch] ? aiVis[iMatch] :null;
}
function _fnColumnIndexToVisible(oSettings, iMatch) {
var aiVis = _fnGetColumns(oSettings, "bVisible"), iPos = $.inArray(iMatch, aiVis);
return -1 !== iPos ? iPos :null;
}
function _fnVisbleColumns(oSettings) {
return _fnGetColumns(oSettings, "bVisible").length;
}
function _fnGetColumns(oSettings, sParam) {
var a = [];
return $.map(oSettings.aoColumns, function(val, i) {
val[sParam] && a.push(i);
}), a;
}
function _fnDetectType(sData) {
for (var aTypes = DataTable.ext.aTypes, iLen = aTypes.length, i = 0; iLen > i; i++) {
var sType = aTypes[i](sData);
if (null !== sType) return sType;
}
return "string";
}
function _fnReOrderIndex(oSettings, sColumns) {
for (var aColumns = sColumns.split(","), aiReturn = [], i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) for (var j = 0; iLen > j; j++) if (oSettings.aoColumns[i].sName == aColumns[j]) {
aiReturn.push(j);
break;
}
return aiReturn;
}
function _fnColumnOrdering(oSettings) {
for (var sNames = "", i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) sNames += oSettings.aoColumns[i].sName + ",";
return sNames.length == iLen ? "" :sNames.slice(0, -1);
}
function _fnApplyColumnDefs(oSettings, aoColDefs, aoCols, fn) {
var i, iLen, j, jLen, k, kLen;
if (aoColDefs) for (i = aoColDefs.length - 1; i >= 0; i--) {
var aTargets = aoColDefs[i].aTargets;
for ($.isArray(aTargets) || _fnLog(oSettings, 1, "aTargets must be an array of targets, not a " + typeof aTargets), 
j = 0, jLen = aTargets.length; jLen > j; j++) if ("number" == typeof aTargets[j] && aTargets[j] >= 0) {
for (;oSettings.aoColumns.length <= aTargets[j]; ) _fnAddColumn(oSettings);
fn(aTargets[j], aoColDefs[i]);
} else if ("number" == typeof aTargets[j] && aTargets[j] < 0) fn(oSettings.aoColumns.length + aTargets[j], aoColDefs[i]); else if ("string" == typeof aTargets[j]) for (k = 0, 
kLen = oSettings.aoColumns.length; kLen > k; k++) ("_all" == aTargets[j] || $(oSettings.aoColumns[k].nTh).hasClass(aTargets[j])) && fn(k, aoColDefs[i]);
}
if (aoCols) for (i = 0, iLen = aoCols.length; iLen > i; i++) fn(i, aoCols[i]);
}
function _fnAddData(oSettings, aDataSupplied) {
var oCol, aDataIn = $.isArray(aDataSupplied) ? aDataSupplied.slice() :$.extend(!0, {}, aDataSupplied), iRow = oSettings.aoData.length, oData = $.extend(!0, {}, DataTable.models.oRow);
oData._aData = aDataIn, oSettings.aoData.push(oData);
for (var sThisType, i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) if (oCol = oSettings.aoColumns[i], 
"function" == typeof oCol.fnRender && oCol.bUseRendered && null !== oCol.mData ? _fnSetCellData(oSettings, iRow, i, _fnRender(oSettings, iRow, i)) :_fnSetCellData(oSettings, iRow, i, _fnGetCellData(oSettings, iRow, i)), 
oCol._bAutoType && "string" != oCol.sType) {
var sVarType = _fnGetCellData(oSettings, iRow, i, "type");
null !== sVarType && "" !== sVarType && (sThisType = _fnDetectType(sVarType), null === oCol.sType ? oCol.sType = sThisType :oCol.sType != sThisType && "html" != oCol.sType && (oCol.sType = "string"));
}
return oSettings.aiDisplayMaster.push(iRow), oSettings.oFeatures.bDeferRender || _fnCreateTr(oSettings, iRow), 
iRow;
}
function _fnGatherData(oSettings) {
var i, iLen, jInner, nTds, nTrs, nTd, nTr, iThisIndex, iRow, iRows, iColumn, iColumns, sNodeName, oCol, oData;
if (oSettings.bDeferLoading || null === oSettings.sAjaxSource) for (nTr = oSettings.nTBody.firstChild; nTr; ) {
if ("TR" == nTr.nodeName.toUpperCase()) for (iThisIndex = oSettings.aoData.length, 
nTr._DT_RowIndex = iThisIndex, oSettings.aoData.push($.extend(!0, {}, DataTable.models.oRow, {
nTr:nTr
})), oSettings.aiDisplayMaster.push(iThisIndex), nTd = nTr.firstChild, jInner = 0; nTd; ) sNodeName = nTd.nodeName.toUpperCase(), 
("TD" == sNodeName || "TH" == sNodeName) && (_fnSetCellData(oSettings, iThisIndex, jInner, $.trim(nTd.innerHTML)), 
jInner++), nTd = nTd.nextSibling;
nTr = nTr.nextSibling;
}
for (nTrs = _fnGetTrNodes(oSettings), nTds = [], i = 0, iLen = nTrs.length; iLen > i; i++) for (nTd = nTrs[i].firstChild; nTd; ) sNodeName = nTd.nodeName.toUpperCase(), 
("TD" == sNodeName || "TH" == sNodeName) && nTds.push(nTd), nTd = nTd.nextSibling;
for (iColumn = 0, iColumns = oSettings.aoColumns.length; iColumns > iColumn; iColumn++) {
oCol = oSettings.aoColumns[iColumn], null === oCol.sTitle && (oCol.sTitle = oCol.nTh.innerHTML);
var nCell, sThisType, sRendered, sValType, bAutoType = oCol._bAutoType, bRender = "function" == typeof oCol.fnRender, bClass = null !== oCol.sClass, bVisible = oCol.bVisible;
if (bAutoType || bRender || bClass || !bVisible) for (iRow = 0, iRows = oSettings.aoData.length; iRows > iRow; iRow++) oData = oSettings.aoData[iRow], 
nCell = nTds[iRow * iColumns + iColumn], bAutoType && "string" != oCol.sType && (sValType = _fnGetCellData(oSettings, iRow, iColumn, "type"), 
"" !== sValType && (sThisType = _fnDetectType(sValType), null === oCol.sType ? oCol.sType = sThisType :oCol.sType != sThisType && "html" != oCol.sType && (oCol.sType = "string"))), 
oCol.mRender ? nCell.innerHTML = _fnGetCellData(oSettings, iRow, iColumn, "display") :oCol.mData !== iColumn && (nCell.innerHTML = _fnGetCellData(oSettings, iRow, iColumn, "display")), 
bRender && (sRendered = _fnRender(oSettings, iRow, iColumn), nCell.innerHTML = sRendered, 
oCol.bUseRendered && _fnSetCellData(oSettings, iRow, iColumn, sRendered)), bClass && (nCell.className += " " + oCol.sClass), 
bVisible ? oData._anHidden[iColumn] = null :(oData._anHidden[iColumn] = nCell, nCell.parentNode.removeChild(nCell)), 
oCol.fnCreatedCell && oCol.fnCreatedCell.call(oSettings.oInstance, nCell, _fnGetCellData(oSettings, iRow, iColumn, "display"), oData._aData, iRow, iColumn);
}
if (0 !== oSettings.aoRowCreatedCallback.length) for (i = 0, iLen = oSettings.aoData.length; iLen > i; i++) oData = oSettings.aoData[i], 
_fnCallbackFire(oSettings, "aoRowCreatedCallback", null, [ oData.nTr, oData._aData, i ]);
}
function _fnNodeToDataIndex(oSettings, n) {
return n._DT_RowIndex !== undefined ? n._DT_RowIndex :null;
}
function _fnNodeToColumnIndex(oSettings, iRow, n) {
for (var anCells = _fnGetTdNodes(oSettings, iRow), i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) if (anCells[i] === n) return i;
return -1;
}
function _fnGetRowData(oSettings, iRow, sSpecific, aiColumns) {
for (var out = [], i = 0, iLen = aiColumns.length; iLen > i; i++) out.push(_fnGetCellData(oSettings, iRow, aiColumns[i], sSpecific));
return out;
}
function _fnGetCellData(oSettings, iRow, iCol, sSpecific) {
var sData, oCol = oSettings.aoColumns[iCol], oData = oSettings.aoData[iRow]._aData;
if ((sData = oCol.fnGetData(oData, sSpecific)) === undefined) return oSettings.iDrawError != oSettings.iDraw && null === oCol.sDefaultContent && (_fnLog(oSettings, 0, "Requested unknown parameter " + ("function" == typeof oCol.mData ? "{mData function}" :"'" + oCol.mData + "'") + " from the data source for row " + iRow), 
oSettings.iDrawError = oSettings.iDraw), oCol.sDefaultContent;
if (null === sData && null !== oCol.sDefaultContent) sData = oCol.sDefaultContent; else if ("function" == typeof sData) return sData();
return "display" == sSpecific && null === sData ? "" :sData;
}
function _fnSetCellData(oSettings, iRow, iCol, val) {
var oCol = oSettings.aoColumns[iCol], oData = oSettings.aoData[iRow]._aData;
oCol.fnSetData(oData, val);
}
function _fnGetObjectDataFn(mSource) {
if (null === mSource) return function() {
return null;
};
if ("function" == typeof mSource) return function(data, type, extra) {
return mSource(data, type, extra);
};
if ("string" != typeof mSource || -1 === mSource.indexOf(".") && -1 === mSource.indexOf("[")) return function(data) {
return data[mSource];
};
var fetchData = function(data, type, src) {
var arrayNotation, out, innerSrc, a = src.split(".");
if ("" !== src) for (var i = 0, iLen = a.length; iLen > i; i++) {
if (arrayNotation = a[i].match(__reArray)) {
a[i] = a[i].replace(__reArray, ""), "" !== a[i] && (data = data[a[i]]), out = [], 
a.splice(0, i + 1), innerSrc = a.join(".");
for (var j = 0, jLen = data.length; jLen > j; j++) out.push(fetchData(data[j], type, innerSrc));
var join = arrayNotation[0].substring(1, arrayNotation[0].length - 1);
data = "" === join ? out :out.join(join);
break;
}
if (null === data || data[a[i]] === undefined) return undefined;
data = data[a[i]];
}
return data;
};
return function(data, type) {
return fetchData(data, type, mSource);
};
}
function _fnSetObjectDataFn(mSource) {
if (null === mSource) return function() {};
if ("function" == typeof mSource) return function(data, val) {
mSource(data, "set", val);
};
if ("string" != typeof mSource || -1 === mSource.indexOf(".") && -1 === mSource.indexOf("[")) return function(data, val) {
data[mSource] = val;
};
var setData = function(data, val, src) {
for (var b, arrayNotation, o, innerSrc, a = src.split("."), i = 0, iLen = a.length - 1; iLen > i; i++) {
if (arrayNotation = a[i].match(__reArray)) {
a[i] = a[i].replace(__reArray, ""), data[a[i]] = [], b = a.slice(), b.splice(0, i + 1), 
innerSrc = b.join(".");
for (var j = 0, jLen = val.length; jLen > j; j++) o = {}, setData(o, val[j], innerSrc), 
data[a[i]].push(o);
return;
}
(null === data[a[i]] || data[a[i]] === undefined) && (data[a[i]] = {}), data = data[a[i]];
}
data[a[a.length - 1].replace(__reArray, "")] = val;
};
return function(data, val) {
return setData(data, val, mSource);
};
}
function _fnGetDataMaster(oSettings) {
for (var aData = [], iLen = oSettings.aoData.length, i = 0; iLen > i; i++) aData.push(oSettings.aoData[i]._aData);
return aData;
}
function _fnClearTable(oSettings) {
oSettings.aoData.splice(0, oSettings.aoData.length), oSettings.aiDisplayMaster.splice(0, oSettings.aiDisplayMaster.length), 
oSettings.aiDisplay.splice(0, oSettings.aiDisplay.length), _fnCalculateEnd(oSettings);
}
function _fnDeleteIndex(a, iTarget) {
for (var iTargetIndex = -1, i = 0, iLen = a.length; iLen > i; i++) a[i] == iTarget ? iTargetIndex = i :a[i] > iTarget && a[i]--;
-1 != iTargetIndex && a.splice(iTargetIndex, 1);
}
function _fnRender(oSettings, iRow, iCol) {
var oCol = oSettings.aoColumns[iCol];
return oCol.fnRender({
iDataRow:iRow,
iDataColumn:iCol,
oSettings:oSettings,
aData:oSettings.aoData[iRow]._aData,
mDataProp:oCol.mData
}, _fnGetCellData(oSettings, iRow, iCol, "display"));
}
function _fnCreateTr(oSettings, iRow) {
var nTd, oData = oSettings.aoData[iRow];
if (null === oData.nTr) {
oData.nTr = document.createElement("tr"), oData.nTr._DT_RowIndex = iRow, oData._aData.DT_RowId && (oData.nTr.id = oData._aData.DT_RowId), 
oData._aData.DT_RowClass && (oData.nTr.className = oData._aData.DT_RowClass);
for (var i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) {
var oCol = oSettings.aoColumns[i];
nTd = document.createElement(oCol.sCellType), nTd.innerHTML = "function" != typeof oCol.fnRender || oCol.bUseRendered && null !== oCol.mData ? _fnGetCellData(oSettings, iRow, i, "display") :_fnRender(oSettings, iRow, i), 
null !== oCol.sClass && (nTd.className = oCol.sClass), oCol.bVisible ? (oData.nTr.appendChild(nTd), 
oData._anHidden[i] = null) :oData._anHidden[i] = nTd, oCol.fnCreatedCell && oCol.fnCreatedCell.call(oSettings.oInstance, nTd, _fnGetCellData(oSettings, iRow, i, "display"), oData._aData, iRow, i);
}
_fnCallbackFire(oSettings, "aoRowCreatedCallback", null, [ oData.nTr, oData._aData, iRow ]);
}
}
function _fnBuildHead(oSettings) {
var i, nTh, iLen, iThs = $("th, td", oSettings.nTHead).length;
if (0 !== iThs) for (i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) nTh = oSettings.aoColumns[i].nTh, 
nTh.setAttribute("role", "columnheader"), oSettings.aoColumns[i].bSortable && (nTh.setAttribute("tabindex", oSettings.iTabIndex), 
nTh.setAttribute("aria-controls", oSettings.sTableId)), null !== oSettings.aoColumns[i].sClass && $(nTh).addClass(oSettings.aoColumns[i].sClass), 
oSettings.aoColumns[i].sTitle != nTh.innerHTML && (nTh.innerHTML = oSettings.aoColumns[i].sTitle); else {
var nTr = document.createElement("tr");
for (i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) nTh = oSettings.aoColumns[i].nTh, 
nTh.innerHTML = oSettings.aoColumns[i].sTitle, nTh.setAttribute("tabindex", "0"), 
null !== oSettings.aoColumns[i].sClass && $(nTh).addClass(oSettings.aoColumns[i].sClass), 
nTr.appendChild(nTh);
$(oSettings.nTHead).html("")[0].appendChild(nTr), _fnDetectHeader(oSettings.aoHeader, oSettings.nTHead);
}
if ($(oSettings.nTHead).children("tr").attr("role", "row"), oSettings.bJUI) for (i = 0, 
iLen = oSettings.aoColumns.length; iLen > i; i++) {
nTh = oSettings.aoColumns[i].nTh;
var nDiv = document.createElement("div");
nDiv.className = oSettings.oClasses.sSortJUIWrapper, $(nTh).contents().appendTo(nDiv);
var nSpan = document.createElement("span");
nSpan.className = oSettings.oClasses.sSortIcon, nDiv.appendChild(nSpan), nTh.appendChild(nDiv);
}
if (oSettings.oFeatures.bSort) for (i = 0; i < oSettings.aoColumns.length; i++) oSettings.aoColumns[i].bSortable !== !1 ? _fnSortAttachListener(oSettings, oSettings.aoColumns[i].nTh, i) :$(oSettings.aoColumns[i].nTh).addClass(oSettings.oClasses.sSortableNone);
if ("" !== oSettings.oClasses.sFooterTH && $(oSettings.nTFoot).children("tr").children("th").addClass(oSettings.oClasses.sFooterTH), 
null !== oSettings.nTFoot) {
var anCells = _fnGetUniqueThs(oSettings, null, oSettings.aoFooter);
for (i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) anCells[i] && (oSettings.aoColumns[i].nTf = anCells[i], 
oSettings.aoColumns[i].sClass && $(anCells[i]).addClass(oSettings.aoColumns[i].sClass));
}
}
function _fnDrawHead(oSettings, aoSource, bIncludeHidden) {
var i, iLen, j, jLen, k, n, nLocalTr, iRowspan, iColspan, aoLocal = [], aApplied = [], iColumns = oSettings.aoColumns.length;
for (bIncludeHidden === undefined && (bIncludeHidden = !1), i = 0, iLen = aoSource.length; iLen > i; i++) {
for (aoLocal[i] = aoSource[i].slice(), aoLocal[i].nTr = aoSource[i].nTr, j = iColumns - 1; j >= 0; j--) oSettings.aoColumns[j].bVisible || bIncludeHidden || aoLocal[i].splice(j, 1);
aApplied.push([]);
}
for (i = 0, iLen = aoLocal.length; iLen > i; i++) {
if (nLocalTr = aoLocal[i].nTr) for (;n = nLocalTr.firstChild; ) nLocalTr.removeChild(n);
for (j = 0, jLen = aoLocal[i].length; jLen > j; j++) if (iRowspan = 1, iColspan = 1, 
aApplied[i][j] === undefined) {
for (nLocalTr.appendChild(aoLocal[i][j].cell), aApplied[i][j] = 1; aoLocal[i + iRowspan] !== undefined && aoLocal[i][j].cell == aoLocal[i + iRowspan][j].cell; ) aApplied[i + iRowspan][j] = 1, 
iRowspan++;
for (;aoLocal[i][j + iColspan] !== undefined && aoLocal[i][j].cell == aoLocal[i][j + iColspan].cell; ) {
for (k = 0; iRowspan > k; k++) aApplied[i + k][j + iColspan] = 1;
iColspan++;
}
aoLocal[i][j].cell.rowSpan = iRowspan, aoLocal[i][j].cell.colSpan = iColspan;
}
}
}
function _fnDraw(oSettings) {
var aPreDraw = _fnCallbackFire(oSettings, "aoPreDrawCallback", "preDraw", [ oSettings ]);
if (-1 !== $.inArray(!1, aPreDraw)) return _fnProcessingDisplay(oSettings, !1), 
void 0;
var i, iLen, n, anRows = [], iRowCount = 0, iStripes = oSettings.asStripeClasses.length, iOpenRows = oSettings.aoOpenRows.length;
if (oSettings.bDrawing = !0, oSettings.iInitDisplayStart !== undefined && -1 != oSettings.iInitDisplayStart && (oSettings._iDisplayStart = oSettings.oFeatures.bServerSide ? oSettings.iInitDisplayStart :oSettings.iInitDisplayStart >= oSettings.fnRecordsDisplay() ? 0 :oSettings.iInitDisplayStart, 
oSettings.iInitDisplayStart = -1, _fnCalculateEnd(oSettings)), oSettings.bDeferLoading) oSettings.bDeferLoading = !1, 
oSettings.iDraw++; else if (oSettings.oFeatures.bServerSide) {
if (!oSettings.bDestroying && !_fnAjaxUpdate(oSettings)) return;
} else oSettings.iDraw++;
if (0 !== oSettings.aiDisplay.length) {
var iStart = oSettings._iDisplayStart, iEnd = oSettings._iDisplayEnd;
oSettings.oFeatures.bServerSide && (iStart = 0, iEnd = oSettings.aoData.length);
for (var j = iStart; iEnd > j; j++) {
var aoData = oSettings.aoData[oSettings.aiDisplay[j]];
null === aoData.nTr && _fnCreateTr(oSettings, oSettings.aiDisplay[j]);
var nRow = aoData.nTr;
if (0 !== iStripes) {
var sStripe = oSettings.asStripeClasses[iRowCount % iStripes];
aoData._sRowStripe != sStripe && ($(nRow).removeClass(aoData._sRowStripe).addClass(sStripe), 
aoData._sRowStripe = sStripe);
}
if (_fnCallbackFire(oSettings, "aoRowCallback", null, [ nRow, oSettings.aoData[oSettings.aiDisplay[j]]._aData, iRowCount, j ]), 
anRows.push(nRow), iRowCount++, 0 !== iOpenRows) for (var k = 0; iOpenRows > k; k++) if (nRow == oSettings.aoOpenRows[k].nParent) {
anRows.push(oSettings.aoOpenRows[k].nTr);
break;
}
}
} else {
anRows[0] = document.createElement("tr"), oSettings.asStripeClasses[0] && (anRows[0].className = oSettings.asStripeClasses[0]);
var oLang = oSettings.oLanguage, sZero = oLang.sZeroRecords;
1 != oSettings.iDraw || null === oSettings.sAjaxSource || oSettings.oFeatures.bServerSide ? oLang.sEmptyTable && 0 === oSettings.fnRecordsTotal() && (sZero = oLang.sEmptyTable) :sZero = oLang.sLoadingRecords;
var nTd = document.createElement("td");
nTd.setAttribute("valign", "top"), nTd.colSpan = _fnVisbleColumns(oSettings), nTd.className = oSettings.oClasses.sRowEmpty, 
nTd.innerHTML = _fnInfoMacros(oSettings, sZero), anRows[iRowCount].appendChild(nTd);
}
_fnCallbackFire(oSettings, "aoHeaderCallback", "header", [ $(oSettings.nTHead).children("tr")[0], _fnGetDataMaster(oSettings), oSettings._iDisplayStart, oSettings.fnDisplayEnd(), oSettings.aiDisplay ]), 
_fnCallbackFire(oSettings, "aoFooterCallback", "footer", [ $(oSettings.nTFoot).children("tr")[0], _fnGetDataMaster(oSettings), oSettings._iDisplayStart, oSettings.fnDisplayEnd(), oSettings.aiDisplay ]);
var nBodyPar, nAddFrag = document.createDocumentFragment(), nRemoveFrag = document.createDocumentFragment();
if (oSettings.nTBody) {
if (nBodyPar = oSettings.nTBody.parentNode, nRemoveFrag.appendChild(oSettings.nTBody), 
!oSettings.oScroll.bInfinite || !oSettings._bInitComplete || oSettings.bSorted || oSettings.bFiltered) for (;n = oSettings.nTBody.firstChild; ) oSettings.nTBody.removeChild(n);
for (i = 0, iLen = anRows.length; iLen > i; i++) nAddFrag.appendChild(anRows[i]);
oSettings.nTBody.appendChild(nAddFrag), null !== nBodyPar && nBodyPar.appendChild(oSettings.nTBody);
}
_fnCallbackFire(oSettings, "aoDrawCallback", "draw", [ oSettings ]), oSettings.bSorted = !1, 
oSettings.bFiltered = !1, oSettings.bDrawing = !1, oSettings.oFeatures.bServerSide && (_fnProcessingDisplay(oSettings, !1), 
oSettings._bInitComplete || _fnInitComplete(oSettings));
}
function _fnReDraw(oSettings) {
oSettings.oFeatures.bSort ? _fnSort(oSettings, oSettings.oPreviousSearch) :oSettings.oFeatures.bFilter ? _fnFilterComplete(oSettings, oSettings.oPreviousSearch) :(_fnCalculateEnd(oSettings), 
_fnDraw(oSettings));
}
function _fnAddOptionsHtml(oSettings) {
var nHolding = $("<div></div>")[0];
oSettings.nTable.parentNode.insertBefore(nHolding, oSettings.nTable), oSettings.nTableWrapper = $('<div id="' + oSettings.sTableId + '_wrapper" class="' + oSettings.oClasses.sWrapper + '" role="grid"></div>')[0], 
oSettings.nTableReinsertBefore = oSettings.nTable.nextSibling;
for (var nTmp, iPushFeature, cOption, nNewNode, cNext, sAttr, j, nInsertNode = oSettings.nTableWrapper, aDom = oSettings.sDom.split(""), i = 0; i < aDom.length; i++) {
if (iPushFeature = 0, cOption = aDom[i], "<" == cOption) {
if (nNewNode = $("<div></div>")[0], cNext = aDom[i + 1], "'" == cNext || '"' == cNext) {
for (sAttr = "", j = 2; aDom[i + j] != cNext; ) sAttr += aDom[i + j], j++;
if ("H" == sAttr ? sAttr = oSettings.oClasses.sJUIHeader :"F" == sAttr && (sAttr = oSettings.oClasses.sJUIFooter), 
-1 != sAttr.indexOf(".")) {
var aSplit = sAttr.split(".");
nNewNode.id = aSplit[0].substr(1, aSplit[0].length - 1), nNewNode.className = aSplit[1];
} else "#" == sAttr.charAt(0) ? nNewNode.id = sAttr.substr(1, sAttr.length - 1) :nNewNode.className = sAttr;
i += j;
}
nInsertNode.appendChild(nNewNode), nInsertNode = nNewNode;
} else if (">" == cOption) nInsertNode = nInsertNode.parentNode; else if ("l" == cOption && oSettings.oFeatures.bPaginate && oSettings.oFeatures.bLengthChange) nTmp = _fnFeatureHtmlLength(oSettings), 
iPushFeature = 1; else if ("f" == cOption && oSettings.oFeatures.bFilter) nTmp = _fnFeatureHtmlFilter(oSettings), 
iPushFeature = 1; else if ("r" == cOption && oSettings.oFeatures.bProcessing) nTmp = _fnFeatureHtmlProcessing(oSettings), 
iPushFeature = 1; else if ("t" == cOption) nTmp = _fnFeatureHtmlTable(oSettings), 
iPushFeature = 1; else if ("i" == cOption && oSettings.oFeatures.bInfo) nTmp = _fnFeatureHtmlInfo(oSettings), 
iPushFeature = 1; else if ("p" == cOption && oSettings.oFeatures.bPaginate) nTmp = _fnFeatureHtmlPaginate(oSettings), 
iPushFeature = 1; else if (0 !== DataTable.ext.aoFeatures.length) for (var aoFeatures = DataTable.ext.aoFeatures, k = 0, kLen = aoFeatures.length; kLen > k; k++) if (cOption == aoFeatures[k].cFeature) {
nTmp = aoFeatures[k].fnInit(oSettings), nTmp && (iPushFeature = 1);
break;
}
1 == iPushFeature && null !== nTmp && ("object" != typeof oSettings.aanFeatures[cOption] && (oSettings.aanFeatures[cOption] = []), 
oSettings.aanFeatures[cOption].push(nTmp), nInsertNode.appendChild(nTmp));
}
nHolding.parentNode.replaceChild(oSettings.nTableWrapper, nHolding);
}
function _fnDetectHeader(aLayout, nThead) {
var nTr, nCell, i, k, l, iLen, iColShifted, iColumn, iColspan, iRowspan, bUnique, nTrs = $(nThead).children("tr"), fnShiftCol = function(a, i, j) {
for (var k = a[i]; k[j]; ) j++;
return j;
};
for (aLayout.splice(0, aLayout.length), i = 0, iLen = nTrs.length; iLen > i; i++) aLayout.push([]);
for (i = 0, iLen = nTrs.length; iLen > i; i++) for (nTr = nTrs[i], iColumn = 0, 
nCell = nTr.firstChild; nCell; ) {
if ("TD" == nCell.nodeName.toUpperCase() || "TH" == nCell.nodeName.toUpperCase()) for (iColspan = 1 * nCell.getAttribute("colspan"), 
iRowspan = 1 * nCell.getAttribute("rowspan"), iColspan = iColspan && 0 !== iColspan && 1 !== iColspan ? iColspan :1, 
iRowspan = iRowspan && 0 !== iRowspan && 1 !== iRowspan ? iRowspan :1, iColShifted = fnShiftCol(aLayout, i, iColumn), 
bUnique = 1 === iColspan ? !0 :!1, l = 0; iColspan > l; l++) for (k = 0; iRowspan > k; k++) aLayout[i + k][iColShifted + l] = {
cell:nCell,
unique:bUnique
}, aLayout[i + k].nTr = nTr;
nCell = nCell.nextSibling;
}
}
function _fnGetUniqueThs(oSettings, nHeader, aLayout) {
var aReturn = [];
aLayout || (aLayout = oSettings.aoHeader, nHeader && (aLayout = [], _fnDetectHeader(aLayout, nHeader)));
for (var i = 0, iLen = aLayout.length; iLen > i; i++) for (var j = 0, jLen = aLayout[i].length; jLen > j; j++) !aLayout[i][j].unique || aReturn[j] && oSettings.bSortCellsTop || (aReturn[j] = aLayout[i][j].cell);
return aReturn;
}
function _fnAjaxUpdate(oSettings) {
if (oSettings.bAjaxDataGet) {
oSettings.iDraw++, _fnProcessingDisplay(oSettings, !0);
var aoData = (oSettings.aoColumns.length, _fnAjaxParameters(oSettings));
return _fnServerParams(oSettings, aoData), oSettings.fnServerData.call(oSettings.oInstance, oSettings.sAjaxSource, aoData, function(json) {
_fnAjaxUpdateDraw(oSettings, json);
}, oSettings), !1;
}
return !0;
}
function _fnAjaxParameters(oSettings) {
var mDataProp, aaSort, aDataSort, i, j, iColumns = oSettings.aoColumns.length, aoData = [];
for (aoData.push({
name:"sEcho",
value:oSettings.iDraw
}), aoData.push({
name:"iColumns",
value:iColumns
}), aoData.push({
name:"sColumns",
value:_fnColumnOrdering(oSettings)
}), aoData.push({
name:"iDisplayStart",
value:oSettings._iDisplayStart
}), aoData.push({
name:"iDisplayLength",
value:oSettings.oFeatures.bPaginate !== !1 ? oSettings._iDisplayLength :-1
}), i = 0; iColumns > i; i++) mDataProp = oSettings.aoColumns[i].mData, aoData.push({
name:"mDataProp_" + i,
value:"function" == typeof mDataProp ? "function" :mDataProp
});
if (oSettings.oFeatures.bFilter !== !1) for (aoData.push({
name:"sSearch",
value:oSettings.oPreviousSearch.sSearch
}), aoData.push({
name:"bRegex",
value:oSettings.oPreviousSearch.bRegex
}), i = 0; iColumns > i; i++) aoData.push({
name:"sSearch_" + i,
value:oSettings.aoPreSearchCols[i].sSearch
}), aoData.push({
name:"bRegex_" + i,
value:oSettings.aoPreSearchCols[i].bRegex
}), aoData.push({
name:"bSearchable_" + i,
value:oSettings.aoColumns[i].bSearchable
});
if (oSettings.oFeatures.bSort !== !1) {
var iCounter = 0;
for (aaSort = null !== oSettings.aaSortingFixed ? oSettings.aaSortingFixed.concat(oSettings.aaSorting) :oSettings.aaSorting.slice(), 
i = 0; i < aaSort.length; i++) for (aDataSort = oSettings.aoColumns[aaSort[i][0]].aDataSort, 
j = 0; j < aDataSort.length; j++) aoData.push({
name:"iSortCol_" + iCounter,
value:aDataSort[j]
}), aoData.push({
name:"sSortDir_" + iCounter,
value:aaSort[i][1]
}), iCounter++;
for (aoData.push({
name:"iSortingCols",
value:iCounter
}), i = 0; iColumns > i; i++) aoData.push({
name:"bSortable_" + i,
value:oSettings.aoColumns[i].bSortable
});
}
return aoData;
}
function _fnServerParams(oSettings, aoData) {
_fnCallbackFire(oSettings, "aoServerParams", "serverParams", [ aoData ]);
}
function _fnAjaxUpdateDraw(oSettings, json) {
if (json.sEcho !== undefined) {
if (1 * json.sEcho < oSettings.iDraw) return;
oSettings.iDraw = 1 * json.sEcho;
}
(!oSettings.oScroll.bInfinite || oSettings.oScroll.bInfinite && (oSettings.bSorted || oSettings.bFiltered)) && _fnClearTable(oSettings), 
oSettings._iRecordsTotal = parseInt(json.iTotalRecords, 10), oSettings._iRecordsDisplay = parseInt(json.iTotalDisplayRecords, 10);
var aiIndex, sOrdering = _fnColumnOrdering(oSettings), bReOrder = json.sColumns !== undefined && "" !== sOrdering && json.sColumns != sOrdering;
bReOrder && (aiIndex = _fnReOrderIndex(oSettings, json.sColumns));
for (var aData = _fnGetObjectDataFn(oSettings.sAjaxDataProp)(json), i = 0, iLen = aData.length; iLen > i; i++) if (bReOrder) {
for (var aDataSorted = [], j = 0, jLen = oSettings.aoColumns.length; jLen > j; j++) aDataSorted.push(aData[i][aiIndex[j]]);
_fnAddData(oSettings, aDataSorted);
} else _fnAddData(oSettings, aData[i]);
oSettings.aiDisplay = oSettings.aiDisplayMaster.slice(), oSettings.bAjaxDataGet = !1, 
_fnDraw(oSettings), oSettings.bAjaxDataGet = !0, _fnProcessingDisplay(oSettings, !1);
}
function _fnFeatureHtmlFilter(oSettings) {
var oPreviousSearch = oSettings.oPreviousSearch, sSearchStr = oSettings.oLanguage.sSearch;
sSearchStr = -1 !== sSearchStr.indexOf("_INPUT_") ? sSearchStr.replace("_INPUT_", '<input type="text" />') :"" === sSearchStr ? '<input type="text" />' :sSearchStr + ' <input type="text" />';
var nFilter = document.createElement("div");
nFilter.className = oSettings.oClasses.sFilter, nFilter.innerHTML = "<label>" + sSearchStr + "</label>", 
oSettings.aanFeatures.f || (nFilter.id = oSettings.sTableId + "_filter");
var jqFilter = $('input[type="text"]', nFilter);
return nFilter._DT_Input = jqFilter[0], jqFilter.val(oPreviousSearch.sSearch.replace('"', "&quot;")), 
jqFilter.bind("keyup.DT", function() {
for (var n = oSettings.aanFeatures.f, val = "" === this.value ? "" :this.value, i = 0, iLen = n.length; iLen > i; i++) n[i] != $(this).parents("div.dataTables_filter")[0] && $(n[i]._DT_Input).val(val);
val != oPreviousSearch.sSearch && _fnFilterComplete(oSettings, {
sSearch:val,
bRegex:oPreviousSearch.bRegex,
bSmart:oPreviousSearch.bSmart,
bCaseInsensitive:oPreviousSearch.bCaseInsensitive
});
}), jqFilter.attr("aria-controls", oSettings.sTableId).bind("keypress.DT", function(e) {
return 13 == e.keyCode ? !1 :void 0;
}), nFilter;
}
function _fnFilterComplete(oSettings, oInput, iForce) {
var oPrevSearch = oSettings.oPreviousSearch, aoPrevSearch = oSettings.aoPreSearchCols, fnSaveFilter = function(oFilter) {
oPrevSearch.sSearch = oFilter.sSearch, oPrevSearch.bRegex = oFilter.bRegex, oPrevSearch.bSmart = oFilter.bSmart, 
oPrevSearch.bCaseInsensitive = oFilter.bCaseInsensitive;
};
if (oSettings.oFeatures.bServerSide) fnSaveFilter(oInput); else {
_fnFilter(oSettings, oInput.sSearch, iForce, oInput.bRegex, oInput.bSmart, oInput.bCaseInsensitive), 
fnSaveFilter(oInput);
for (var i = 0; i < oSettings.aoPreSearchCols.length; i++) _fnFilterColumn(oSettings, aoPrevSearch[i].sSearch, i, aoPrevSearch[i].bRegex, aoPrevSearch[i].bSmart, aoPrevSearch[i].bCaseInsensitive);
_fnFilterCustom(oSettings);
}
oSettings.bFiltered = !0, $(oSettings.oInstance).trigger("filter", oSettings), oSettings._iDisplayStart = 0, 
_fnCalculateEnd(oSettings), _fnDraw(oSettings), _fnBuildSearchArray(oSettings, 0);
}
function _fnFilterCustom(oSettings) {
for (var afnFilters = DataTable.ext.afnFiltering, aiFilterColumns = _fnGetColumns(oSettings, "bSearchable"), i = 0, iLen = afnFilters.length; iLen > i; i++) for (var iCorrector = 0, j = 0, jLen = oSettings.aiDisplay.length; jLen > j; j++) {
var iDisIndex = oSettings.aiDisplay[j - iCorrector], bTest = afnFilters[i](oSettings, _fnGetRowData(oSettings, iDisIndex, "filter", aiFilterColumns), iDisIndex);
bTest || (oSettings.aiDisplay.splice(j - iCorrector, 1), iCorrector++);
}
}
function _fnFilterColumn(oSettings, sInput, iColumn, bRegex, bSmart, bCaseInsensitive) {
if ("" !== sInput) for (var iIndexCorrector = 0, rpSearch = _fnFilterCreateSearch(sInput, bRegex, bSmart, bCaseInsensitive), i = oSettings.aiDisplay.length - 1; i >= 0; i--) {
var sData = _fnDataToSearch(_fnGetCellData(oSettings, oSettings.aiDisplay[i], iColumn, "filter"), oSettings.aoColumns[iColumn].sType);
rpSearch.test(sData) || (oSettings.aiDisplay.splice(i, 1), iIndexCorrector++);
}
}
function _fnFilter(oSettings, sInput, iForce, bRegex, bSmart, bCaseInsensitive) {
var i, rpSearch = _fnFilterCreateSearch(sInput, bRegex, bSmart, bCaseInsensitive), oPrevSearch = oSettings.oPreviousSearch;
if (iForce || (iForce = 0), 0 !== DataTable.ext.afnFiltering.length && (iForce = 1), 
sInput.length <= 0) oSettings.aiDisplay.splice(0, oSettings.aiDisplay.length), oSettings.aiDisplay = oSettings.aiDisplayMaster.slice(); else if (oSettings.aiDisplay.length == oSettings.aiDisplayMaster.length || oPrevSearch.sSearch.length > sInput.length || 1 == iForce || 0 !== sInput.indexOf(oPrevSearch.sSearch)) for (oSettings.aiDisplay.splice(0, oSettings.aiDisplay.length), 
_fnBuildSearchArray(oSettings, 1), i = 0; i < oSettings.aiDisplayMaster.length; i++) rpSearch.test(oSettings.asDataSearch[i]) && oSettings.aiDisplay.push(oSettings.aiDisplayMaster[i]); else {
var iIndexCorrector = 0;
for (i = 0; i < oSettings.asDataSearch.length; i++) rpSearch.test(oSettings.asDataSearch[i]) || (oSettings.aiDisplay.splice(i - iIndexCorrector, 1), 
iIndexCorrector++);
}
}
function _fnBuildSearchArray(oSettings, iMaster) {
if (!oSettings.oFeatures.bServerSide) {
oSettings.asDataSearch = [];
for (var aiFilterColumns = _fnGetColumns(oSettings, "bSearchable"), aiIndex = 1 === iMaster ? oSettings.aiDisplayMaster :oSettings.aiDisplay, i = 0, iLen = aiIndex.length; iLen > i; i++) oSettings.asDataSearch[i] = _fnBuildSearchRow(oSettings, _fnGetRowData(oSettings, aiIndex[i], "filter", aiFilterColumns));
}
}
function _fnBuildSearchRow(oSettings, aData) {
var sSearch = aData.join("  ");
return -1 !== sSearch.indexOf("&") && (sSearch = $("<div>").html(sSearch).text()), 
sSearch.replace(/[\n\r]/g, " ");
}
function _fnFilterCreateSearch(sSearch, bRegex, bSmart, bCaseInsensitive) {
var asSearch, sRegExpString;
return bSmart ? (asSearch = bRegex ? sSearch.split(" ") :_fnEscapeRegex(sSearch).split(" "), 
sRegExpString = "^(?=.*?" + asSearch.join(")(?=.*?") + ").*$", new RegExp(sRegExpString, bCaseInsensitive ? "i" :"")) :(sSearch = bRegex ? sSearch :_fnEscapeRegex(sSearch), 
new RegExp(sSearch, bCaseInsensitive ? "i" :""));
}
function _fnDataToSearch(sData, sType) {
return "function" == typeof DataTable.ext.ofnSearch[sType] ? DataTable.ext.ofnSearch[sType](sData) :null === sData ? "" :"html" == sType ? sData.replace(/[\r\n]/g, " ").replace(/<.*?>/g, "") :"string" == typeof sData ? sData.replace(/[\r\n]/g, " ") :sData;
}
function _fnEscapeRegex(sVal) {
var acEscape = [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^", "-" ], reReplace = new RegExp("(\\" + acEscape.join("|\\") + ")", "g");
return sVal.replace(reReplace, "\\$1");
}
function _fnFeatureHtmlInfo(oSettings) {
var nInfo = document.createElement("div");
return nInfo.className = oSettings.oClasses.sInfo, oSettings.aanFeatures.i || (oSettings.aoDrawCallback.push({
fn:_fnUpdateInfo,
sName:"information"
}), nInfo.id = oSettings.sTableId + "_info"), oSettings.nTable.setAttribute("aria-describedby", oSettings.sTableId + "_info"), 
nInfo;
}
function _fnUpdateInfo(oSettings) {
if (oSettings.oFeatures.bInfo && 0 !== oSettings.aanFeatures.i.length) {
var sOut, oLang = oSettings.oLanguage, iStart = oSettings._iDisplayStart + 1, iEnd = oSettings.fnDisplayEnd(), iMax = oSettings.fnRecordsTotal(), iTotal = oSettings.fnRecordsDisplay();
sOut = 0 === iTotal ? oLang.sInfoEmpty :oLang.sInfo, iTotal != iMax && (sOut += " " + oLang.sInfoFiltered), 
sOut += oLang.sInfoPostFix, sOut = _fnInfoMacros(oSettings, sOut), null !== oLang.fnInfoCallback && (sOut = oLang.fnInfoCallback.call(oSettings.oInstance, oSettings, iStart, iEnd, iMax, iTotal, sOut));
for (var n = oSettings.aanFeatures.i, i = 0, iLen = n.length; iLen > i; i++) $(n[i]).html(sOut);
}
}
function _fnInfoMacros(oSettings, str) {
var iStart = oSettings._iDisplayStart + 1, sStart = oSettings.fnFormatNumber(iStart), iEnd = oSettings.fnDisplayEnd(), sEnd = oSettings.fnFormatNumber(iEnd), iTotal = oSettings.fnRecordsDisplay(), sTotal = oSettings.fnFormatNumber(iTotal), iMax = oSettings.fnRecordsTotal(), sMax = oSettings.fnFormatNumber(iMax);
return oSettings.oScroll.bInfinite && (sStart = oSettings.fnFormatNumber(1)), str.replace(/_START_/g, sStart).replace(/_END_/g, sEnd).replace(/_TOTAL_/g, sTotal).replace(/_MAX_/g, sMax);
}
function _fnInitialise(oSettings) {
var i, iLen, iAjaxStart = oSettings.iInitDisplayStart;
if (oSettings.bInitialised === !1) return setTimeout(function() {
_fnInitialise(oSettings);
}, 200), void 0;
for (_fnAddOptionsHtml(oSettings), _fnBuildHead(oSettings), _fnDrawHead(oSettings, oSettings.aoHeader), 
oSettings.nTFoot && _fnDrawHead(oSettings, oSettings.aoFooter), _fnProcessingDisplay(oSettings, !0), 
oSettings.oFeatures.bAutoWidth && _fnCalculateColumnWidths(oSettings), i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) null !== oSettings.aoColumns[i].sWidth && (oSettings.aoColumns[i].nTh.style.width = _fnStringToCss(oSettings.aoColumns[i].sWidth));
if (oSettings.oFeatures.bSort ? _fnSort(oSettings) :oSettings.oFeatures.bFilter ? _fnFilterComplete(oSettings, oSettings.oPreviousSearch) :(oSettings.aiDisplay = oSettings.aiDisplayMaster.slice(), 
_fnCalculateEnd(oSettings), _fnDraw(oSettings)), null !== oSettings.sAjaxSource && !oSettings.oFeatures.bServerSide) {
var aoData = [];
return _fnServerParams(oSettings, aoData), oSettings.fnServerData.call(oSettings.oInstance, oSettings.sAjaxSource, aoData, function(json) {
var aData = "" !== oSettings.sAjaxDataProp ? _fnGetObjectDataFn(oSettings.sAjaxDataProp)(json) :json;
for (i = 0; i < aData.length; i++) _fnAddData(oSettings, aData[i]);
oSettings.iInitDisplayStart = iAjaxStart, oSettings.oFeatures.bSort ? _fnSort(oSettings) :(oSettings.aiDisplay = oSettings.aiDisplayMaster.slice(), 
_fnCalculateEnd(oSettings), _fnDraw(oSettings)), _fnProcessingDisplay(oSettings, !1), 
_fnInitComplete(oSettings, json);
}, oSettings), void 0;
}
oSettings.oFeatures.bServerSide || (_fnProcessingDisplay(oSettings, !1), _fnInitComplete(oSettings));
}
function _fnInitComplete(oSettings, json) {
oSettings._bInitComplete = !0, _fnCallbackFire(oSettings, "aoInitComplete", "init", [ oSettings, json ]);
}
function _fnLanguageCompat(oLanguage) {
var oDefaults = DataTable.defaults.oLanguage;
!oLanguage.sEmptyTable && oLanguage.sZeroRecords && "No data available in table" === oDefaults.sEmptyTable && _fnMap(oLanguage, oLanguage, "sZeroRecords", "sEmptyTable"), 
!oLanguage.sLoadingRecords && oLanguage.sZeroRecords && "Loading..." === oDefaults.sLoadingRecords && _fnMap(oLanguage, oLanguage, "sZeroRecords", "sLoadingRecords");
}
function _fnFeatureHtmlLength(oSettings) {
if (oSettings.oScroll.bInfinite) return null;
var i, iLen, sName = 'name="' + oSettings.sTableId + '_length"', sStdMenu = '<select size="1" ' + sName + ">", aLengthMenu = oSettings.aLengthMenu;
if (2 == aLengthMenu.length && "object" == typeof aLengthMenu[0] && "object" == typeof aLengthMenu[1]) for (i = 0, 
iLen = aLengthMenu[0].length; iLen > i; i++) sStdMenu += '<option value="' + aLengthMenu[0][i] + '">' + aLengthMenu[1][i] + "</option>"; else for (i = 0, 
iLen = aLengthMenu.length; iLen > i; i++) sStdMenu += '<option value="' + aLengthMenu[i] + '">' + aLengthMenu[i] + "</option>";
sStdMenu += "</select>";
var nLength = document.createElement("div");
return oSettings.aanFeatures.l || (nLength.id = oSettings.sTableId + "_length"), 
nLength.className = oSettings.oClasses.sLength, nLength.innerHTML = "<label>" + oSettings.oLanguage.sLengthMenu.replace("_MENU_", sStdMenu) + "</label>", 
$('select option[value="' + oSettings._iDisplayLength + '"]', nLength).attr("selected", !0), 
$("select", nLength).bind("change.DT", function() {
var iVal = $(this).val(), n = oSettings.aanFeatures.l;
for (i = 0, iLen = n.length; iLen > i; i++) n[i] != this.parentNode && $("select", n[i]).val(iVal);
oSettings._iDisplayLength = parseInt(iVal, 10), _fnCalculateEnd(oSettings), oSettings.fnDisplayEnd() == oSettings.fnRecordsDisplay() && (oSettings._iDisplayStart = oSettings.fnDisplayEnd() - oSettings._iDisplayLength, 
oSettings._iDisplayStart < 0 && (oSettings._iDisplayStart = 0)), -1 == oSettings._iDisplayLength && (oSettings._iDisplayStart = 0), 
_fnDraw(oSettings);
}), $("select", nLength).attr("aria-controls", oSettings.sTableId), nLength;
}
function _fnCalculateEnd(oSettings) {
oSettings._iDisplayEnd = oSettings.oFeatures.bPaginate === !1 ? oSettings.aiDisplay.length :oSettings._iDisplayStart + oSettings._iDisplayLength > oSettings.aiDisplay.length || -1 == oSettings._iDisplayLength ? oSettings.aiDisplay.length :oSettings._iDisplayStart + oSettings._iDisplayLength;
}
function _fnFeatureHtmlPaginate(oSettings) {
if (oSettings.oScroll.bInfinite) return null;
var nPaginate = document.createElement("div");
return nPaginate.className = oSettings.oClasses.sPaging + oSettings.sPaginationType, 
DataTable.ext.oPagination[oSettings.sPaginationType].fnInit(oSettings, nPaginate, function(oSettings) {
_fnCalculateEnd(oSettings), _fnDraw(oSettings);
}), oSettings.aanFeatures.p || oSettings.aoDrawCallback.push({
fn:function(oSettings) {
DataTable.ext.oPagination[oSettings.sPaginationType].fnUpdate(oSettings, function(oSettings) {
_fnCalculateEnd(oSettings), _fnDraw(oSettings);
});
},
sName:"pagination"
}), nPaginate;
}
function _fnPageChange(oSettings, mAction) {
var iOldStart = oSettings._iDisplayStart;
if ("number" == typeof mAction) oSettings._iDisplayStart = mAction * oSettings._iDisplayLength, 
oSettings._iDisplayStart > oSettings.fnRecordsDisplay() && (oSettings._iDisplayStart = 0); else if ("first" == mAction) oSettings._iDisplayStart = 0; else if ("previous" == mAction) oSettings._iDisplayStart = oSettings._iDisplayLength >= 0 ? oSettings._iDisplayStart - oSettings._iDisplayLength :0, 
oSettings._iDisplayStart < 0 && (oSettings._iDisplayStart = 0); else if ("next" == mAction) oSettings._iDisplayLength >= 0 ? oSettings._iDisplayStart + oSettings._iDisplayLength < oSettings.fnRecordsDisplay() && (oSettings._iDisplayStart += oSettings._iDisplayLength) :oSettings._iDisplayStart = 0; else if ("last" == mAction) if (oSettings._iDisplayLength >= 0) {
var iPages = parseInt((oSettings.fnRecordsDisplay() - 1) / oSettings._iDisplayLength, 10) + 1;
oSettings._iDisplayStart = (iPages - 1) * oSettings._iDisplayLength;
} else oSettings._iDisplayStart = 0; else _fnLog(oSettings, 0, "Unknown paging action: " + mAction);
return $(oSettings.oInstance).trigger("page", oSettings), iOldStart != oSettings._iDisplayStart;
}
function _fnFeatureHtmlProcessing(oSettings) {
var nProcessing = document.createElement("div");
return oSettings.aanFeatures.r || (nProcessing.id = oSettings.sTableId + "_processing"), 
nProcessing.innerHTML = oSettings.oLanguage.sProcessing, nProcessing.className = oSettings.oClasses.sProcessing, 
oSettings.nTable.parentNode.insertBefore(nProcessing, oSettings.nTable), nProcessing;
}
function _fnProcessingDisplay(oSettings, bShow) {
if (oSettings.oFeatures.bProcessing) for (var an = oSettings.aanFeatures.r, i = 0, iLen = an.length; iLen > i; i++) an[i].style.visibility = bShow ? "visible" :"hidden";
$(oSettings.oInstance).trigger("processing", [ oSettings, bShow ]);
}
function _fnFeatureHtmlTable(oSettings) {
if ("" === oSettings.oScroll.sX && "" === oSettings.oScroll.sY) return oSettings.nTable;
var nScroller = document.createElement("div"), nScrollHead = document.createElement("div"), nScrollHeadInner = document.createElement("div"), nScrollBody = document.createElement("div"), nScrollFoot = document.createElement("div"), nScrollFootInner = document.createElement("div"), nScrollHeadTable = oSettings.nTable.cloneNode(!1), nScrollFootTable = oSettings.nTable.cloneNode(!1), nThead = oSettings.nTable.getElementsByTagName("thead")[0], nTfoot = 0 === oSettings.nTable.getElementsByTagName("tfoot").length ? null :oSettings.nTable.getElementsByTagName("tfoot")[0], oClasses = oSettings.oClasses;
nScrollHead.appendChild(nScrollHeadInner), nScrollFoot.appendChild(nScrollFootInner), 
nScrollBody.appendChild(oSettings.nTable), nScroller.appendChild(nScrollHead), nScroller.appendChild(nScrollBody), 
nScrollHeadInner.appendChild(nScrollHeadTable), nScrollHeadTable.appendChild(nThead), 
null !== nTfoot && (nScroller.appendChild(nScrollFoot), nScrollFootInner.appendChild(nScrollFootTable), 
nScrollFootTable.appendChild(nTfoot)), nScroller.className = oClasses.sScrollWrapper, 
nScrollHead.className = oClasses.sScrollHead, nScrollHeadInner.className = oClasses.sScrollHeadInner, 
nScrollBody.className = oClasses.sScrollBody, nScrollFoot.className = oClasses.sScrollFoot, 
nScrollFootInner.className = oClasses.sScrollFootInner, oSettings.oScroll.bAutoCss && (nScrollHead.style.overflow = "hidden", 
nScrollHead.style.position = "relative", nScrollFoot.style.overflow = "hidden", 
nScrollBody.style.overflow = "auto"), nScrollHead.style.border = "0", nScrollHead.style.width = "100%", 
nScrollFoot.style.border = "0", nScrollHeadInner.style.width = "" !== oSettings.oScroll.sXInner ? oSettings.oScroll.sXInner :"100%", 
nScrollHeadTable.removeAttribute("id"), nScrollHeadTable.style.marginLeft = "0", 
oSettings.nTable.style.marginLeft = "0", null !== nTfoot && (nScrollFootTable.removeAttribute("id"), 
nScrollFootTable.style.marginLeft = "0");
var nCaption = $(oSettings.nTable).children("caption");
return nCaption.length > 0 && (nCaption = nCaption[0], "top" === nCaption._captionSide ? nScrollHeadTable.appendChild(nCaption) :"bottom" === nCaption._captionSide && nTfoot && nScrollFootTable.appendChild(nCaption)), 
"" !== oSettings.oScroll.sX && (nScrollHead.style.width = _fnStringToCss(oSettings.oScroll.sX), 
nScrollBody.style.width = _fnStringToCss(oSettings.oScroll.sX), null !== nTfoot && (nScrollFoot.style.width = _fnStringToCss(oSettings.oScroll.sX)), 
$(nScrollBody).scroll(function() {
nScrollHead.scrollLeft = this.scrollLeft, null !== nTfoot && (nScrollFoot.scrollLeft = this.scrollLeft);
})), "" !== oSettings.oScroll.sY && (nScrollBody.style.height = _fnStringToCss(oSettings.oScroll.sY)), 
oSettings.aoDrawCallback.push({
fn:_fnScrollDraw,
sName:"scrolling"
}), oSettings.oScroll.bInfinite && $(nScrollBody).scroll(function() {
oSettings.bDrawing || 0 === $(this).scrollTop() || $(this).scrollTop() + $(this).height() > $(oSettings.nTable).height() - oSettings.oScroll.iLoadGap && oSettings.fnDisplayEnd() < oSettings.fnRecordsDisplay() && (_fnPageChange(oSettings, "next"), 
_fnCalculateEnd(oSettings), _fnDraw(oSettings));
}), oSettings.nScrollHead = nScrollHead, oSettings.nScrollFoot = nScrollFoot, nScroller;
}
function _fnScrollDraw(o) {
var i, iLen, anHeadToSize, anHeadSizers, anFootSizers, anFootToSize, oStyle, iVis, nTheadSize, nTfootSize, iSanityWidth, nScrollHeadInner = o.nScrollHead.getElementsByTagName("div")[0], nScrollHeadTable = nScrollHeadInner.getElementsByTagName("table")[0], nScrollBody = o.nTable.parentNode, aApplied = [], aAppliedFooter = [], nScrollFootInner = null !== o.nTFoot ? o.nScrollFoot.getElementsByTagName("div")[0] :null, nScrollFootTable = null !== o.nTFoot ? nScrollFootInner.getElementsByTagName("table")[0] :null, ie67 = o.oBrowser.bScrollOversize, zeroOut = function(nSizer) {
oStyle = nSizer.style, oStyle.paddingTop = "0", oStyle.paddingBottom = "0", oStyle.borderTopWidth = "0", 
oStyle.borderBottomWidth = "0", oStyle.height = 0;
};
$(o.nTable).children("thead, tfoot").remove(), nTheadSize = $(o.nTHead).clone()[0], 
o.nTable.insertBefore(nTheadSize, o.nTable.childNodes[0]), anHeadToSize = o.nTHead.getElementsByTagName("tr"), 
anHeadSizers = nTheadSize.getElementsByTagName("tr"), null !== o.nTFoot && (nTfootSize = $(o.nTFoot).clone()[0], 
o.nTable.insertBefore(nTfootSize, o.nTable.childNodes[1]), anFootToSize = o.nTFoot.getElementsByTagName("tr"), 
anFootSizers = nTfootSize.getElementsByTagName("tr")), "" === o.oScroll.sX && (nScrollBody.style.width = "100%", 
nScrollHeadInner.parentNode.style.width = "100%");
var nThs = _fnGetUniqueThs(o, nTheadSize);
for (i = 0, iLen = nThs.length; iLen > i; i++) iVis = _fnVisibleToColumnIndex(o, i), 
nThs[i].style.width = o.aoColumns[iVis].sWidth;
if (null !== o.nTFoot && _fnApplyToChildren(function(n) {
n.style.width = "";
}, anFootSizers), o.oScroll.bCollapse && "" !== o.oScroll.sY && (nScrollBody.style.height = nScrollBody.offsetHeight + o.nTHead.offsetHeight + "px"), 
iSanityWidth = $(o.nTable).outerWidth(), "" === o.oScroll.sX ? (o.nTable.style.width = "100%", 
ie67 && ($("tbody", nScrollBody).height() > nScrollBody.offsetHeight || "scroll" == $(nScrollBody).css("overflow-y")) && (o.nTable.style.width = _fnStringToCss($(o.nTable).outerWidth() - o.oScroll.iBarWidth))) :"" !== o.oScroll.sXInner ? o.nTable.style.width = _fnStringToCss(o.oScroll.sXInner) :iSanityWidth == $(nScrollBody).width() && $(nScrollBody).height() < $(o.nTable).height() ? (o.nTable.style.width = _fnStringToCss(iSanityWidth - o.oScroll.iBarWidth), 
$(o.nTable).outerWidth() > iSanityWidth - o.oScroll.iBarWidth && (o.nTable.style.width = _fnStringToCss(iSanityWidth))) :o.nTable.style.width = _fnStringToCss(iSanityWidth), 
iSanityWidth = $(o.nTable).outerWidth(), _fnApplyToChildren(zeroOut, anHeadSizers), 
_fnApplyToChildren(function(nSizer) {
aApplied.push(_fnStringToCss($(nSizer).width()));
}, anHeadSizers), _fnApplyToChildren(function(nToSize, i) {
nToSize.style.width = aApplied[i];
}, anHeadToSize), $(anHeadSizers).height(0), null !== o.nTFoot && (_fnApplyToChildren(zeroOut, anFootSizers), 
_fnApplyToChildren(function(nSizer) {
aAppliedFooter.push(_fnStringToCss($(nSizer).width()));
}, anFootSizers), _fnApplyToChildren(function(nToSize, i) {
nToSize.style.width = aAppliedFooter[i];
}, anFootToSize), $(anFootSizers).height(0)), _fnApplyToChildren(function(nSizer, i) {
nSizer.innerHTML = "", nSizer.style.width = aApplied[i];
}, anHeadSizers), null !== o.nTFoot && _fnApplyToChildren(function(nSizer, i) {
nSizer.innerHTML = "", nSizer.style.width = aAppliedFooter[i];
}, anFootSizers), $(o.nTable).outerWidth() < iSanityWidth) {
var iCorrection = nScrollBody.scrollHeight > nScrollBody.offsetHeight || "scroll" == $(nScrollBody).css("overflow-y") ? iSanityWidth + o.oScroll.iBarWidth :iSanityWidth;
ie67 && (nScrollBody.scrollHeight > nScrollBody.offsetHeight || "scroll" == $(nScrollBody).css("overflow-y")) && (o.nTable.style.width = _fnStringToCss(iCorrection - o.oScroll.iBarWidth)), 
nScrollBody.style.width = _fnStringToCss(iCorrection), o.nScrollHead.style.width = _fnStringToCss(iCorrection), 
null !== o.nTFoot && (o.nScrollFoot.style.width = _fnStringToCss(iCorrection)), 
"" === o.oScroll.sX ? _fnLog(o, 1, "The table cannot fit into the current element which will cause column misalignment. The table has been drawn at its minimum possible width.") :"" !== o.oScroll.sXInner && _fnLog(o, 1, "The table cannot fit into the current element which will cause column misalignment. Increase the sScrollXInner value or remove it to allow automatic calculation");
} else nScrollBody.style.width = _fnStringToCss("100%"), o.nScrollHead.style.width = _fnStringToCss("100%"), 
null !== o.nTFoot && (o.nScrollFoot.style.width = _fnStringToCss("100%"));
if ("" === o.oScroll.sY && ie67 && (nScrollBody.style.height = _fnStringToCss(o.nTable.offsetHeight + o.oScroll.iBarWidth)), 
"" !== o.oScroll.sY && o.oScroll.bCollapse) {
nScrollBody.style.height = _fnStringToCss(o.oScroll.sY);
var iExtra = "" !== o.oScroll.sX && o.nTable.offsetWidth > nScrollBody.offsetWidth ? o.oScroll.iBarWidth :0;
o.nTable.offsetHeight < nScrollBody.offsetHeight && (nScrollBody.style.height = _fnStringToCss(o.nTable.offsetHeight + iExtra));
}
var iOuterWidth = $(o.nTable).outerWidth();
nScrollHeadTable.style.width = _fnStringToCss(iOuterWidth), nScrollHeadInner.style.width = _fnStringToCss(iOuterWidth);
var bScrolling = $(o.nTable).height() > nScrollBody.clientHeight || "scroll" == $(nScrollBody).css("overflow-y");
nScrollHeadInner.style.paddingRight = bScrolling ? o.oScroll.iBarWidth + "px" :"0px", 
null !== o.nTFoot && (nScrollFootTable.style.width = _fnStringToCss(iOuterWidth), 
nScrollFootInner.style.width = _fnStringToCss(iOuterWidth), nScrollFootInner.style.paddingRight = bScrolling ? o.oScroll.iBarWidth + "px" :"0px"), 
$(nScrollBody).scroll(), (o.bSorted || o.bFiltered) && (nScrollBody.scrollTop = 0);
}
function _fnApplyToChildren(fn, an1, an2) {
for (var nNode1, nNode2, index = 0, i = 0, iLen = an1.length; iLen > i; ) {
for (nNode1 = an1[i].firstChild, nNode2 = an2 ? an2[i].firstChild :null; nNode1; ) 1 === nNode1.nodeType && (an2 ? fn(nNode1, nNode2, index) :fn(nNode1, index), 
index++), nNode1 = nNode1.nextSibling, nNode2 = an2 ? nNode2.nextSibling :null;
i++;
}
}
function _fnConvertToWidth(sWidth, nParent) {
if (!sWidth || null === sWidth || "" === sWidth) return 0;
nParent || (nParent = document.body);
var iWidth, nTmp = document.createElement("div");
return nTmp.style.width = _fnStringToCss(sWidth), nParent.appendChild(nTmp), iWidth = nTmp.offsetWidth, 
nParent.removeChild(nTmp), iWidth;
}
function _fnCalculateColumnWidths(oSettings) {
var iTmpWidth, i, iCorrector, iWidth, iUserInputs = (oSettings.nTable.offsetWidth, 
0), iVisibleColumns = 0, iColums = oSettings.aoColumns.length, oHeaders = $("th", oSettings.nTHead), widthAttr = oSettings.nTable.getAttribute("width"), nWrapper = oSettings.nTable.parentNode;
for (i = 0; iColums > i; i++) oSettings.aoColumns[i].bVisible && (iVisibleColumns++, 
null !== oSettings.aoColumns[i].sWidth && (iTmpWidth = _fnConvertToWidth(oSettings.aoColumns[i].sWidthOrig, nWrapper), 
null !== iTmpWidth && (oSettings.aoColumns[i].sWidth = _fnStringToCss(iTmpWidth)), 
iUserInputs++));
if (iColums == oHeaders.length && 0 === iUserInputs && iVisibleColumns == iColums && "" === oSettings.oScroll.sX && "" === oSettings.oScroll.sY) for (i = 0; i < oSettings.aoColumns.length; i++) iTmpWidth = $(oHeaders[i]).width(), 
null !== iTmpWidth && (oSettings.aoColumns[i].sWidth = _fnStringToCss(iTmpWidth)); else {
var nCalcTmp = oSettings.nTable.cloneNode(!1), nTheadClone = oSettings.nTHead.cloneNode(!0), nBody = document.createElement("tbody"), nTr = document.createElement("tr");
nCalcTmp.removeAttribute("id"), nCalcTmp.appendChild(nTheadClone), null !== oSettings.nTFoot && (nCalcTmp.appendChild(oSettings.nTFoot.cloneNode(!0)), 
_fnApplyToChildren(function(n) {
n.style.width = "";
}, nCalcTmp.getElementsByTagName("tr"))), nCalcTmp.appendChild(nBody), nBody.appendChild(nTr);
var jqColSizing = $("thead th", nCalcTmp);
0 === jqColSizing.length && (jqColSizing = $("tbody tr:eq(0)>td", nCalcTmp));
var nThs = _fnGetUniqueThs(oSettings, nTheadClone);
for (iCorrector = 0, i = 0; iColums > i; i++) {
var oColumn = oSettings.aoColumns[i];
oColumn.bVisible && null !== oColumn.sWidthOrig && "" !== oColumn.sWidthOrig ? nThs[i - iCorrector].style.width = _fnStringToCss(oColumn.sWidthOrig) :oColumn.bVisible ? nThs[i - iCorrector].style.width = "" :iCorrector++;
}
for (i = 0; iColums > i; i++) if (oSettings.aoColumns[i].bVisible) {
var nTd = _fnGetWidestNode(oSettings, i);
null !== nTd && (nTd = nTd.cloneNode(!0), "" !== oSettings.aoColumns[i].sContentPadding && (nTd.innerHTML += oSettings.aoColumns[i].sContentPadding), 
nTr.appendChild(nTd));
}
nWrapper.appendChild(nCalcTmp), "" !== oSettings.oScroll.sX && "" !== oSettings.oScroll.sXInner ? nCalcTmp.style.width = _fnStringToCss(oSettings.oScroll.sXInner) :"" !== oSettings.oScroll.sX ? (nCalcTmp.style.width = "", 
$(nCalcTmp).width() < nWrapper.offsetWidth && (nCalcTmp.style.width = _fnStringToCss(nWrapper.offsetWidth))) :"" !== oSettings.oScroll.sY ? nCalcTmp.style.width = _fnStringToCss(nWrapper.offsetWidth) :widthAttr && (nCalcTmp.style.width = _fnStringToCss(widthAttr)), 
nCalcTmp.style.visibility = "hidden", _fnScrollingWidthAdjust(oSettings, nCalcTmp);
var oNodes = $("tbody tr:eq(0)", nCalcTmp).children();
if (0 === oNodes.length && (oNodes = _fnGetUniqueThs(oSettings, $("thead", nCalcTmp)[0])), 
"" !== oSettings.oScroll.sX) {
var iTotal = 0;
for (iCorrector = 0, i = 0; i < oSettings.aoColumns.length; i++) oSettings.aoColumns[i].bVisible && (iTotal += null === oSettings.aoColumns[i].sWidthOrig ? $(oNodes[iCorrector]).outerWidth() :parseInt(oSettings.aoColumns[i].sWidth.replace("px", ""), 10) + ($(oNodes[iCorrector]).outerWidth() - $(oNodes[iCorrector]).width()), 
iCorrector++);
nCalcTmp.style.width = _fnStringToCss(iTotal), oSettings.nTable.style.width = _fnStringToCss(iTotal);
}
for (iCorrector = 0, i = 0; i < oSettings.aoColumns.length; i++) oSettings.aoColumns[i].bVisible && (iWidth = $(oNodes[iCorrector]).width(), 
null !== iWidth && iWidth > 0 && (oSettings.aoColumns[i].sWidth = _fnStringToCss(iWidth)), 
iCorrector++);
var cssWidth = $(nCalcTmp).css("width");
oSettings.nTable.style.width = -1 !== cssWidth.indexOf("%") ? cssWidth :_fnStringToCss($(nCalcTmp).outerWidth()), 
nCalcTmp.parentNode.removeChild(nCalcTmp);
}
widthAttr && (oSettings.nTable.style.width = _fnStringToCss(widthAttr));
}
function _fnScrollingWidthAdjust(oSettings, n) {
if ("" === oSettings.oScroll.sX && "" !== oSettings.oScroll.sY) {
{
$(n).width();
}
n.style.width = _fnStringToCss($(n).outerWidth() - oSettings.oScroll.iBarWidth);
} else "" !== oSettings.oScroll.sX && (n.style.width = _fnStringToCss($(n).outerWidth()));
}
function _fnGetWidestNode(oSettings, iCol) {
var iMaxIndex = _fnGetMaxLenString(oSettings, iCol);
if (0 > iMaxIndex) return null;
if (null === oSettings.aoData[iMaxIndex].nTr) {
var n = document.createElement("td");
return n.innerHTML = _fnGetCellData(oSettings, iMaxIndex, iCol, ""), n;
}
return _fnGetTdNodes(oSettings, iMaxIndex)[iCol];
}
function _fnGetMaxLenString(oSettings, iCol) {
for (var iMax = -1, iMaxIndex = -1, i = 0; i < oSettings.aoData.length; i++) {
var s = _fnGetCellData(oSettings, i, iCol, "display") + "";
s = s.replace(/<.*?>/g, ""), s.length > iMax && (iMax = s.length, iMaxIndex = i);
}
return iMaxIndex;
}
function _fnStringToCss(s) {
if (null === s) return "0px";
if ("number" == typeof s) return 0 > s ? "0px" :s + "px";
var c = s.charCodeAt(s.length - 1);
return 48 > c || c > 57 ? s :s + "px";
}
function _fnScrollBarWidth() {
var inner = document.createElement("p"), style = inner.style;
style.width = "100%", style.height = "200px", style.padding = "0px";
var outer = document.createElement("div");
style = outer.style, style.position = "absolute", style.top = "0px", style.left = "0px", 
style.visibility = "hidden", style.width = "200px", style.height = "150px", style.padding = "0px", 
style.overflow = "hidden", outer.appendChild(inner), document.body.appendChild(outer);
var w1 = inner.offsetWidth;
outer.style.overflow = "scroll";
var w2 = inner.offsetWidth;
return w1 == w2 && (w2 = outer.clientWidth), document.body.removeChild(outer), w1 - w2;
}
function _fnSort(oSettings, bApplyClasses) {
var i, iLen, j, jLen, k, kLen, sDataType, nTh, aaSort = [], aiOrig = [], oSort = DataTable.ext.oSort, aoData = oSettings.aoData, aoColumns = oSettings.aoColumns, oAria = oSettings.oLanguage.oAria;
if (!oSettings.oFeatures.bServerSide && (0 !== oSettings.aaSorting.length || null !== oSettings.aaSortingFixed)) {
for (aaSort = null !== oSettings.aaSortingFixed ? oSettings.aaSortingFixed.concat(oSettings.aaSorting) :oSettings.aaSorting.slice(), 
i = 0; i < aaSort.length; i++) {
var iColumn = aaSort[i][0], iVisColumn = _fnColumnIndexToVisible(oSettings, iColumn);
if (sDataType = oSettings.aoColumns[iColumn].sSortDataType, DataTable.ext.afnSortData[sDataType]) {
var aData = DataTable.ext.afnSortData[sDataType].call(oSettings.oInstance, oSettings, iColumn, iVisColumn);
if (aData.length === aoData.length) for (j = 0, jLen = aoData.length; jLen > j; j++) _fnSetCellData(oSettings, j, iColumn, aData[j]); else _fnLog(oSettings, 0, "Returned data sort array (col " + iColumn + ") is the wrong length");
}
}
for (i = 0, iLen = oSettings.aiDisplayMaster.length; iLen > i; i++) aiOrig[oSettings.aiDisplayMaster[i]] = i;
var fnSortFormat, aDataSort, iSortLen = aaSort.length;
for (i = 0, iLen = aoData.length; iLen > i; i++) for (j = 0; iSortLen > j; j++) for (aDataSort = aoColumns[aaSort[j][0]].aDataSort, 
k = 0, kLen = aDataSort.length; kLen > k; k++) sDataType = aoColumns[aDataSort[k]].sType, 
fnSortFormat = oSort[(sDataType ? sDataType :"string") + "-pre"], aoData[i]._aSortData[aDataSort[k]] = fnSortFormat ? fnSortFormat(_fnGetCellData(oSettings, i, aDataSort[k], "sort")) :_fnGetCellData(oSettings, i, aDataSort[k], "sort");
oSettings.aiDisplayMaster.sort(function(a, b) {
var k, l, lLen, iTest, aDataSort, sDataType;
for (k = 0; iSortLen > k; k++) for (aDataSort = aoColumns[aaSort[k][0]].aDataSort, 
l = 0, lLen = aDataSort.length; lLen > l; l++) if (sDataType = aoColumns[aDataSort[l]].sType, 
iTest = oSort[(sDataType ? sDataType :"string") + "-" + aaSort[k][1]](aoData[a]._aSortData[aDataSort[l]], aoData[b]._aSortData[aDataSort[l]]), 
0 !== iTest) return iTest;
return oSort["numeric-asc"](aiOrig[a], aiOrig[b]);
});
}
for (bApplyClasses !== undefined && !bApplyClasses || oSettings.oFeatures.bDeferRender || _fnSortingClasses(oSettings), 
i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) {
var sTitle = aoColumns[i].sTitle.replace(/<.*?>/g, "");
if (nTh = aoColumns[i].nTh, nTh.removeAttribute("aria-sort"), nTh.removeAttribute("aria-label"), 
aoColumns[i].bSortable) if (aaSort.length > 0 && aaSort[0][0] == i) {
nTh.setAttribute("aria-sort", "asc" == aaSort[0][1] ? "ascending" :"descending");
var nextSort = aoColumns[i].asSorting[aaSort[0][2] + 1] ? aoColumns[i].asSorting[aaSort[0][2] + 1] :aoColumns[i].asSorting[0];
nTh.setAttribute("aria-label", sTitle + ("asc" == nextSort ? oAria.sSortAscending :oAria.sSortDescending));
} else nTh.setAttribute("aria-label", sTitle + ("asc" == aoColumns[i].asSorting[0] ? oAria.sSortAscending :oAria.sSortDescending)); else nTh.setAttribute("aria-label", sTitle);
}
oSettings.bSorted = !0, $(oSettings.oInstance).trigger("sort", oSettings), oSettings.oFeatures.bFilter ? _fnFilterComplete(oSettings, oSettings.oPreviousSearch, 1) :(oSettings.aiDisplay = oSettings.aiDisplayMaster.slice(), 
oSettings._iDisplayStart = 0, _fnCalculateEnd(oSettings), _fnDraw(oSettings));
}
function _fnSortAttachListener(oSettings, nNode, iDataIndex, fnCallback) {
_fnBindAction(nNode, {}, function(e) {
if (oSettings.aoColumns[iDataIndex].bSortable !== !1) {
var fnInnerSorting = function() {
var iColumn, iNextSort;
if (e.shiftKey) {
for (var bFound = !1, i = 0; i < oSettings.aaSorting.length; i++) if (oSettings.aaSorting[i][0] == iDataIndex) {
bFound = !0, iColumn = oSettings.aaSorting[i][0], iNextSort = oSettings.aaSorting[i][2] + 1, 
oSettings.aoColumns[iColumn].asSorting[iNextSort] ? (oSettings.aaSorting[i][1] = oSettings.aoColumns[iColumn].asSorting[iNextSort], 
oSettings.aaSorting[i][2] = iNextSort) :oSettings.aaSorting.splice(i, 1);
break;
}
bFound === !1 && oSettings.aaSorting.push([ iDataIndex, oSettings.aoColumns[iDataIndex].asSorting[0], 0 ]);
} else 1 == oSettings.aaSorting.length && oSettings.aaSorting[0][0] == iDataIndex ? (iColumn = oSettings.aaSorting[0][0], 
iNextSort = oSettings.aaSorting[0][2] + 1, oSettings.aoColumns[iColumn].asSorting[iNextSort] || (iNextSort = 0), 
oSettings.aaSorting[0][1] = oSettings.aoColumns[iColumn].asSorting[iNextSort], oSettings.aaSorting[0][2] = iNextSort) :(oSettings.aaSorting.splice(0, oSettings.aaSorting.length), 
oSettings.aaSorting.push([ iDataIndex, oSettings.aoColumns[iDataIndex].asSorting[0], 0 ]));
_fnSort(oSettings);
};
oSettings.oFeatures.bProcessing ? (_fnProcessingDisplay(oSettings, !0), setTimeout(function() {
fnInnerSorting(), oSettings.oFeatures.bServerSide || _fnProcessingDisplay(oSettings, !1);
}, 0)) :fnInnerSorting(), "function" == typeof fnCallback && fnCallback(oSettings);
}
});
}
function _fnSortingClasses(oSettings) {
var i, iLen, j, iFound, aaSort, sClass, iColumns = oSettings.aoColumns.length, oClasses = oSettings.oClasses;
for (i = 0; iColumns > i; i++) oSettings.aoColumns[i].bSortable && $(oSettings.aoColumns[i].nTh).removeClass(oClasses.sSortAsc + " " + oClasses.sSortDesc + " " + oSettings.aoColumns[i].sSortingClass);
for (aaSort = null !== oSettings.aaSortingFixed ? oSettings.aaSortingFixed.concat(oSettings.aaSorting) :oSettings.aaSorting.slice(), 
i = 0; i < oSettings.aoColumns.length; i++) if (oSettings.aoColumns[i].bSortable) {
for (sClass = oSettings.aoColumns[i].sSortingClass, iFound = -1, j = 0; j < aaSort.length; j++) if (aaSort[j][0] == i) {
sClass = "asc" == aaSort[j][1] ? oClasses.sSortAsc :oClasses.sSortDesc, iFound = j;
break;
}
if ($(oSettings.aoColumns[i].nTh).addClass(sClass), oSettings.bJUI) {
var jqSpan = $("span." + oClasses.sSortIcon, oSettings.aoColumns[i].nTh);
jqSpan.removeClass(oClasses.sSortJUIAsc + " " + oClasses.sSortJUIDesc + " " + oClasses.sSortJUI + " " + oClasses.sSortJUIAscAllowed + " " + oClasses.sSortJUIDescAllowed);
var sSpanClass;
sSpanClass = -1 == iFound ? oSettings.aoColumns[i].sSortingClassJUI :"asc" == aaSort[iFound][1] ? oClasses.sSortJUIAsc :oClasses.sSortJUIDesc, 
jqSpan.addClass(sSpanClass);
}
} else $(oSettings.aoColumns[i].nTh).addClass(oSettings.aoColumns[i].sSortingClass);
if (sClass = oClasses.sSortColumn, oSettings.oFeatures.bSort && oSettings.oFeatures.bSortClasses) {
var iClass, iTargetCol, nTds = _fnGetTdNodes(oSettings), asClasses = [];
for (i = 0; iColumns > i; i++) asClasses.push("");
for (i = 0, iClass = 1; i < aaSort.length; i++) iTargetCol = parseInt(aaSort[i][0], 10), 
asClasses[iTargetCol] = sClass + iClass, 3 > iClass && iClass++;
var sTmpClass, sCurrentClass, sNewClass, reClass = new RegExp(sClass + "[123]");
for (i = 0, iLen = nTds.length; iLen > i; i++) iTargetCol = i % iColumns, sCurrentClass = nTds[i].className, 
sNewClass = asClasses[iTargetCol], sTmpClass = sCurrentClass.replace(reClass, sNewClass), 
sTmpClass != sCurrentClass ? nTds[i].className = $.trim(sTmpClass) :sNewClass.length > 0 && -1 == sCurrentClass.indexOf(sNewClass) && (nTds[i].className = sCurrentClass + " " + sNewClass);
}
}
function _fnSaveState(oSettings) {
if (oSettings.oFeatures.bStateSave && !oSettings.bDestroying) {
var i, iLen, bInfinite = oSettings.oScroll.bInfinite, oState = {
iCreate:new Date().getTime(),
iStart:bInfinite ? 0 :oSettings._iDisplayStart,
iEnd:bInfinite ? oSettings._iDisplayLength :oSettings._iDisplayEnd,
iLength:oSettings._iDisplayLength,
aaSorting:$.extend(!0, [], oSettings.aaSorting),
oSearch:$.extend(!0, {}, oSettings.oPreviousSearch),
aoSearchCols:$.extend(!0, [], oSettings.aoPreSearchCols),
abVisCols:[]
};
for (i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) oState.abVisCols.push(oSettings.aoColumns[i].bVisible);
_fnCallbackFire(oSettings, "aoStateSaveParams", "stateSaveParams", [ oSettings, oState ]), 
oSettings.fnStateSave.call(oSettings.oInstance, oSettings, oState);
}
}
function _fnLoadState(oSettings, oInit) {
if (oSettings.oFeatures.bStateSave) {
var oData = oSettings.fnStateLoad.call(oSettings.oInstance, oSettings);
if (oData) {
var abStateLoad = _fnCallbackFire(oSettings, "aoStateLoadParams", "stateLoadParams", [ oSettings, oData ]);
if (-1 === $.inArray(!1, abStateLoad)) {
oSettings.oLoadedState = $.extend(!0, {}, oData), oSettings._iDisplayStart = oData.iStart, 
oSettings.iInitDisplayStart = oData.iStart, oSettings._iDisplayEnd = oData.iEnd, 
oSettings._iDisplayLength = oData.iLength, oSettings.aaSorting = oData.aaSorting.slice(), 
oSettings.saved_aaSorting = oData.aaSorting.slice(), $.extend(oSettings.oPreviousSearch, oData.oSearch), 
$.extend(!0, oSettings.aoPreSearchCols, oData.aoSearchCols), oInit.saved_aoColumns = [];
for (var i = 0; i < oData.abVisCols.length; i++) oInit.saved_aoColumns[i] = {}, 
oInit.saved_aoColumns[i].bVisible = oData.abVisCols[i];
_fnCallbackFire(oSettings, "aoStateLoaded", "stateLoaded", [ oSettings, oData ]);
}
}
}
}
function _fnCreateCookie(sName, sValue, iSecs, sBaseName, fnCallback) {
var date = new Date();
date.setTime(date.getTime() + 1e3 * iSecs);
var aParts = window.location.pathname.split("/"), sNameFile = sName + "_" + aParts.pop().replace(/[\/:]/g, "").toLowerCase(), sFullCookie, oData;
null !== fnCallback ? (oData = "function" == typeof $.parseJSON ? $.parseJSON(sValue) :eval("(" + sValue + ")"), 
sFullCookie = fnCallback(sNameFile, oData, date.toGMTString(), aParts.join("/") + "/")) :sFullCookie = sNameFile + "=" + encodeURIComponent(sValue) + "; expires=" + date.toGMTString() + "; path=" + aParts.join("/") + "/";
var aCookies = document.cookie.split(";"), iNewCookieLen = sFullCookie.split(";")[0].length, aOldCookies = [];
if (iNewCookieLen + document.cookie.length + 10 > 4096) {
for (var i = 0, iLen = aCookies.length; iLen > i; i++) if (-1 != aCookies[i].indexOf(sBaseName)) {
var aSplitCookie = aCookies[i].split("=");
try {
oData = eval("(" + decodeURIComponent(aSplitCookie[1]) + ")"), oData && oData.iCreate && aOldCookies.push({
name:aSplitCookie[0],
time:oData.iCreate
});
} catch (e) {}
}
for (aOldCookies.sort(function(a, b) {
return b.time - a.time;
}); iNewCookieLen + document.cookie.length + 10 > 4096; ) {
if (0 === aOldCookies.length) return;
var old = aOldCookies.pop();
document.cookie = old.name + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=" + aParts.join("/") + "/";
}
}
document.cookie = sFullCookie;
}
function _fnReadCookie(sName) {
for (var aParts = window.location.pathname.split("/"), sNameEQ = sName + "_" + aParts[aParts.length - 1].replace(/[\/:]/g, "").toLowerCase() + "=", sCookieContents = document.cookie.split(";"), i = 0; i < sCookieContents.length; i++) {
for (var c = sCookieContents[i]; " " == c.charAt(0); ) c = c.substring(1, c.length);
if (0 === c.indexOf(sNameEQ)) return decodeURIComponent(c.substring(sNameEQ.length, c.length));
}
return null;
}
function _fnSettingsFromNode(nTable) {
for (var i = 0; i < DataTable.settings.length; i++) if (DataTable.settings[i].nTable === nTable) return DataTable.settings[i];
return null;
}
function _fnGetTrNodes(oSettings) {
for (var aNodes = [], aoData = oSettings.aoData, i = 0, iLen = aoData.length; iLen > i; i++) null !== aoData[i].nTr && aNodes.push(aoData[i].nTr);
return aNodes;
}
function _fnGetTdNodes(oSettings, iIndividualRow) {
var iCorrector, anTds, nTd, iRow, iColumn, iColumns, oData, sNodeName, anReturn = [], iRows = oSettings.aoData.length, iStart = 0, iEnd = iRows;
for (iIndividualRow !== undefined && (iStart = iIndividualRow, iEnd = iIndividualRow + 1), 
iRow = iStart; iEnd > iRow; iRow++) if (oData = oSettings.aoData[iRow], null !== oData.nTr) {
for (anTds = [], nTd = oData.nTr.firstChild; nTd; ) sNodeName = nTd.nodeName.toLowerCase(), 
("td" == sNodeName || "th" == sNodeName) && anTds.push(nTd), nTd = nTd.nextSibling;
for (iCorrector = 0, iColumn = 0, iColumns = oSettings.aoColumns.length; iColumns > iColumn; iColumn++) oSettings.aoColumns[iColumn].bVisible ? anReturn.push(anTds[iColumn - iCorrector]) :(anReturn.push(oData._anHidden[iColumn]), 
iCorrector++);
}
return anReturn;
}
function _fnLog(oSettings, iLevel, sMesg) {
var sAlert = null === oSettings ? "DataTables warning: " + sMesg :"DataTables warning (table id = '" + oSettings.sTableId + "'): " + sMesg;
if (0 === iLevel) {
if ("alert" != DataTable.ext.sErrMode) throw new Error(sAlert);
return alert(sAlert), void 0;
}
window.console && console.log && console.log(sAlert);
}
function _fnMap(oRet, oSrc, sName, sMappedName) {
sMappedName === undefined && (sMappedName = sName), oSrc[sName] !== undefined && (oRet[sMappedName] = oSrc[sName]);
}
function _fnExtend(oOut, oExtender) {
var val;
for (var prop in oExtender) oExtender.hasOwnProperty(prop) && (val = oExtender[prop], 
"object" == typeof oInit[prop] && null !== val && $.isArray(val) === !1 ? $.extend(!0, oOut[prop], val) :oOut[prop] = val);
return oOut;
}
function _fnBindAction(n, oData, fn) {
$(n).bind("click.DT", oData, function(e) {
n.blur(), fn(e);
}).bind("keypress.DT", oData, function(e) {
13 === e.which && fn(e);
}).bind("selectstart.DT", function() {
return !1;
});
}
function _fnCallbackReg(oSettings, sStore, fn, sName) {
fn && oSettings[sStore].push({
fn:fn,
sName:sName
});
}
function _fnCallbackFire(oSettings, sStore, sTrigger, aArgs) {
for (var aoStore = oSettings[sStore], aRet = [], i = aoStore.length - 1; i >= 0; i--) aRet.push(aoStore[i].fn.apply(oSettings.oInstance, aArgs));
return null !== sTrigger && $(oSettings.oInstance).trigger(sTrigger, aArgs), aRet;
}
function _fnBrowserDetect(oSettings) {
var n = $('<div style="position:absolute; top:0; left:0; height:1px; width:1px; overflow:hidden"><div style="position:absolute; top:1px; left:1px; width:100px; overflow:scroll;"><div id="DT_BrowserTest" style="width:100%; height:10px;"></div></div></div>')[0];
document.body.appendChild(n), oSettings.oBrowser.bScrollOversize = 100 === $("#DT_BrowserTest", n)[0].offsetWidth ? !0 :!1, 
document.body.removeChild(n);
}
function _fnExternApiFunc(sFunc) {
return function() {
var aArgs = [ _fnSettingsFromNode(this[DataTable.ext.iApiIndex]) ].concat(Array.prototype.slice.call(arguments));
return DataTable.ext.oApi[sFunc].apply(this, aArgs);
};
}
var __reArray = /\[.*?\]$/, _fnJsonString = window.JSON ? JSON.stringify :function(o) {
var sType = typeof o;
if ("object" !== sType || null === o) return "string" === sType && (o = '"' + o + '"'), 
o + "";
var sProp, mValue, json = [], bArr = $.isArray(o);
for (sProp in o) mValue = o[sProp], sType = typeof mValue, "string" === sType ? mValue = '"' + mValue + '"' :"object" === sType && null !== mValue && (mValue = _fnJsonString(mValue)), 
json.push((bArr ? "" :'"' + sProp + '":') + mValue);
return (bArr ? "[" :"{") + json + (bArr ? "]" :"}");
};
this.$ = function(sSelector, oOpts) {
var i, iLen, tr, a = [], oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]), aoData = oSettings.aoData, aiDisplay = oSettings.aiDisplay, aiDisplayMaster = oSettings.aiDisplayMaster;
if (oOpts || (oOpts = {}), oOpts = $.extend({}, {
filter:"none",
order:"current",
page:"all"
}, oOpts), "current" == oOpts.page) for (i = oSettings._iDisplayStart, iLen = oSettings.fnDisplayEnd(); iLen > i; i++) tr = aoData[aiDisplay[i]].nTr, 
tr && a.push(tr); else if ("current" == oOpts.order && "none" == oOpts.filter) for (i = 0, 
iLen = aiDisplayMaster.length; iLen > i; i++) tr = aoData[aiDisplayMaster[i]].nTr, 
tr && a.push(tr); else if ("current" == oOpts.order && "applied" == oOpts.filter) for (i = 0, 
iLen = aiDisplay.length; iLen > i; i++) tr = aoData[aiDisplay[i]].nTr, tr && a.push(tr); else if ("original" == oOpts.order && "none" == oOpts.filter) for (i = 0, 
iLen = aoData.length; iLen > i; i++) tr = aoData[i].nTr, tr && a.push(tr); else if ("original" == oOpts.order && "applied" == oOpts.filter) for (i = 0, 
iLen = aoData.length; iLen > i; i++) tr = aoData[i].nTr, -1 !== $.inArray(i, aiDisplay) && tr && a.push(tr); else _fnLog(oSettings, 1, "Unknown selection options");
var jqA = $(a), jqTRs = jqA.filter(sSelector), jqDescendants = jqA.find(sSelector);
return $([].concat($.makeArray(jqTRs), $.makeArray(jqDescendants)));
}, this._ = function(sSelector, oOpts) {
var i, iLen, aOut = [], aTrs = this.$(sSelector, oOpts);
for (i = 0, iLen = aTrs.length; iLen > i; i++) aOut.push(this.fnGetData(aTrs[i]));
return aOut;
}, this.fnAddData = function(mData, bRedraw) {
if (0 === mData.length) return [];
var iTest, aiReturn = [], oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
if ("object" == typeof mData[0] && null !== mData[0]) for (var i = 0; i < mData.length; i++) {
if (iTest = _fnAddData(oSettings, mData[i]), -1 == iTest) return aiReturn;
aiReturn.push(iTest);
} else {
if (iTest = _fnAddData(oSettings, mData), -1 == iTest) return aiReturn;
aiReturn.push(iTest);
}
return oSettings.aiDisplay = oSettings.aiDisplayMaster.slice(), (bRedraw === undefined || bRedraw) && _fnReDraw(oSettings), 
aiReturn;
}, this.fnAdjustColumnSizing = function(bRedraw) {
var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
_fnAdjustColumnSizing(oSettings), bRedraw === undefined || bRedraw ? this.fnDraw(!1) :("" !== oSettings.oScroll.sX || "" !== oSettings.oScroll.sY) && this.oApi._fnScrollDraw(oSettings);
}, this.fnClearTable = function(bRedraw) {
var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
_fnClearTable(oSettings), (bRedraw === undefined || bRedraw) && _fnDraw(oSettings);
}, this.fnClose = function(nTr) {
for (var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]), i = 0; i < oSettings.aoOpenRows.length; i++) if (oSettings.aoOpenRows[i].nParent == nTr) {
var nTrParent = oSettings.aoOpenRows[i].nTr.parentNode;
return nTrParent && nTrParent.removeChild(oSettings.aoOpenRows[i].nTr), oSettings.aoOpenRows.splice(i, 1), 
0;
}
return 1;
}, this.fnDeleteRow = function(mTarget, fnCallBack, bRedraw) {
var i, iLen, iAODataIndex, oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
iAODataIndex = "object" == typeof mTarget ? _fnNodeToDataIndex(oSettings, mTarget) :mTarget;
var oData = oSettings.aoData.splice(iAODataIndex, 1);
for (i = 0, iLen = oSettings.aoData.length; iLen > i; i++) null !== oSettings.aoData[i].nTr && (oSettings.aoData[i].nTr._DT_RowIndex = i);
var iDisplayIndex = $.inArray(iAODataIndex, oSettings.aiDisplay);
return oSettings.asDataSearch.splice(iDisplayIndex, 1), _fnDeleteIndex(oSettings.aiDisplayMaster, iAODataIndex), 
_fnDeleteIndex(oSettings.aiDisplay, iAODataIndex), "function" == typeof fnCallBack && fnCallBack.call(this, oSettings, oData), 
oSettings._iDisplayStart >= oSettings.fnRecordsDisplay() && (oSettings._iDisplayStart -= oSettings._iDisplayLength, 
oSettings._iDisplayStart < 0 && (oSettings._iDisplayStart = 0)), (bRedraw === undefined || bRedraw) && (_fnCalculateEnd(oSettings), 
_fnDraw(oSettings)), oData;
}, this.fnDestroy = function(bRemove) {
var i, iLen, oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]), nOrig = oSettings.nTableWrapper.parentNode, nBody = oSettings.nTBody;
if (bRemove = bRemove === undefined ? !1 :bRemove, oSettings.bDestroying = !0, _fnCallbackFire(oSettings, "aoDestroyCallback", "destroy", [ oSettings ]), 
!bRemove) for (i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) oSettings.aoColumns[i].bVisible === !1 && this.fnSetColumnVis(i, !0);
for ($(oSettings.nTableWrapper).find("*").andSelf().unbind(".DT"), $("tbody>tr>td." + oSettings.oClasses.sRowEmpty, oSettings.nTable).parent().remove(), 
oSettings.nTable != oSettings.nTHead.parentNode && ($(oSettings.nTable).children("thead").remove(), 
oSettings.nTable.appendChild(oSettings.nTHead)), oSettings.nTFoot && oSettings.nTable != oSettings.nTFoot.parentNode && ($(oSettings.nTable).children("tfoot").remove(), 
oSettings.nTable.appendChild(oSettings.nTFoot)), oSettings.nTable.parentNode.removeChild(oSettings.nTable), 
$(oSettings.nTableWrapper).remove(), oSettings.aaSorting = [], oSettings.aaSortingFixed = [], 
_fnSortingClasses(oSettings), $(_fnGetTrNodes(oSettings)).removeClass(oSettings.asStripeClasses.join(" ")), 
$("th, td", oSettings.nTHead).removeClass([ oSettings.oClasses.sSortable, oSettings.oClasses.sSortableAsc, oSettings.oClasses.sSortableDesc, oSettings.oClasses.sSortableNone ].join(" ")), 
oSettings.bJUI && ($("th span." + oSettings.oClasses.sSortIcon + ", td span." + oSettings.oClasses.sSortIcon, oSettings.nTHead).remove(), 
$("th, td", oSettings.nTHead).each(function() {
var jqWrapper = $("div." + oSettings.oClasses.sSortJUIWrapper, this), kids = jqWrapper.contents();
$(this).append(kids), jqWrapper.remove();
})), !bRemove && oSettings.nTableReinsertBefore ? nOrig.insertBefore(oSettings.nTable, oSettings.nTableReinsertBefore) :bRemove || nOrig.appendChild(oSettings.nTable), 
i = 0, iLen = oSettings.aoData.length; iLen > i; i++) null !== oSettings.aoData[i].nTr && nBody.appendChild(oSettings.aoData[i].nTr);
if (oSettings.oFeatures.bAutoWidth === !0 && (oSettings.nTable.style.width = _fnStringToCss(oSettings.sDestroyWidth)), 
iLen = oSettings.asDestroyStripes.length) {
var anRows = $(nBody).children("tr");
for (i = 0; iLen > i; i++) anRows.filter(":nth-child(" + iLen + "n + " + i + ")").addClass(oSettings.asDestroyStripes[i]);
}
for (i = 0, iLen = DataTable.settings.length; iLen > i; i++) DataTable.settings[i] == oSettings && DataTable.settings.splice(i, 1);
oSettings = null, oInit = null;
}, this.fnDraw = function(bComplete) {
var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
bComplete === !1 ? (_fnCalculateEnd(oSettings), _fnDraw(oSettings)) :_fnReDraw(oSettings);
}, this.fnFilter = function(sInput, iColumn, bRegex, bSmart, bShowGlobal, bCaseInsensitive) {
var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
if (oSettings.oFeatures.bFilter) if ((bRegex === undefined || null === bRegex) && (bRegex = !1), 
(bSmart === undefined || null === bSmart) && (bSmart = !0), (bShowGlobal === undefined || null === bShowGlobal) && (bShowGlobal = !0), 
(bCaseInsensitive === undefined || null === bCaseInsensitive) && (bCaseInsensitive = !0), 
iColumn === undefined || null === iColumn) {
if (_fnFilterComplete(oSettings, {
sSearch:sInput + "",
bRegex:bRegex,
bSmart:bSmart,
bCaseInsensitive:bCaseInsensitive
}, 1), bShowGlobal && oSettings.aanFeatures.f) for (var n = oSettings.aanFeatures.f, i = 0, iLen = n.length; iLen > i; i++) try {
n[i]._DT_Input != document.activeElement && $(n[i]._DT_Input).val(sInput);
} catch (e) {
$(n[i]._DT_Input).val(sInput);
}
} else $.extend(oSettings.aoPreSearchCols[iColumn], {
sSearch:sInput + "",
bRegex:bRegex,
bSmart:bSmart,
bCaseInsensitive:bCaseInsensitive
}), _fnFilterComplete(oSettings, oSettings.oPreviousSearch, 1);
}, this.fnGetData = function(mRow, iCol) {
var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
if (mRow !== undefined) {
var iRow = mRow;
if ("object" == typeof mRow) {
var sNode = mRow.nodeName.toLowerCase();
"tr" === sNode ? iRow = _fnNodeToDataIndex(oSettings, mRow) :"td" === sNode && (iRow = _fnNodeToDataIndex(oSettings, mRow.parentNode), 
iCol = _fnNodeToColumnIndex(oSettings, iRow, mRow));
}
return iCol !== undefined ? _fnGetCellData(oSettings, iRow, iCol, "") :oSettings.aoData[iRow] !== undefined ? oSettings.aoData[iRow]._aData :null;
}
return _fnGetDataMaster(oSettings);
}, this.fnGetNodes = function(iRow) {
var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
return iRow !== undefined ? oSettings.aoData[iRow] !== undefined ? oSettings.aoData[iRow].nTr :null :_fnGetTrNodes(oSettings);
}, this.fnGetPosition = function(nNode) {
var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]), sNodeName = nNode.nodeName.toUpperCase();
if ("TR" == sNodeName) return _fnNodeToDataIndex(oSettings, nNode);
if ("TD" == sNodeName || "TH" == sNodeName) {
var iDataIndex = _fnNodeToDataIndex(oSettings, nNode.parentNode), iColumnIndex = _fnNodeToColumnIndex(oSettings, iDataIndex, nNode);
return [ iDataIndex, _fnColumnIndexToVisible(oSettings, iColumnIndex), iColumnIndex ];
}
return null;
}, this.fnIsOpen = function(nTr) {
for (var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]), i = (oSettings.aoOpenRows, 
0); i < oSettings.aoOpenRows.length; i++) if (oSettings.aoOpenRows[i].nParent == nTr) return !0;
return !1;
}, this.fnOpen = function(nTr, mHtml, sClass) {
var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]), nTableRows = _fnGetTrNodes(oSettings);
if (-1 !== $.inArray(nTr, nTableRows)) {
this.fnClose(nTr);
var nNewRow = document.createElement("tr"), nNewCell = document.createElement("td");
nNewRow.appendChild(nNewCell), nNewCell.className = sClass, nNewCell.colSpan = _fnVisbleColumns(oSettings), 
"string" == typeof mHtml ? nNewCell.innerHTML = mHtml :$(nNewCell).html(mHtml);
var nTrs = $("tr", oSettings.nTBody);
return -1 != $.inArray(nTr, nTrs) && $(nNewRow).insertAfter(nTr), oSettings.aoOpenRows.push({
nTr:nNewRow,
nParent:nTr
}), nNewRow;
}
}, this.fnPageChange = function(mAction, bRedraw) {
var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
_fnPageChange(oSettings, mAction), _fnCalculateEnd(oSettings), (bRedraw === undefined || bRedraw) && _fnDraw(oSettings);
}, this.fnSetColumnVis = function(iCol, bShow, bRedraw) {
var i, iLen, nTd, bAppend, iBefore, oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]), aoColumns = oSettings.aoColumns, aoData = oSettings.aoData;
if (aoColumns[iCol].bVisible != bShow) {
if (bShow) {
var iInsert = 0;
for (i = 0; iCol > i; i++) aoColumns[i].bVisible && iInsert++;
if (bAppend = iInsert >= _fnVisbleColumns(oSettings), !bAppend) for (i = iCol; i < aoColumns.length; i++) if (aoColumns[i].bVisible) {
iBefore = i;
break;
}
for (i = 0, iLen = aoData.length; iLen > i; i++) null !== aoData[i].nTr && (bAppend ? aoData[i].nTr.appendChild(aoData[i]._anHidden[iCol]) :aoData[i].nTr.insertBefore(aoData[i]._anHidden[iCol], _fnGetTdNodes(oSettings, i)[iBefore]));
} else for (i = 0, iLen = aoData.length; iLen > i; i++) null !== aoData[i].nTr && (nTd = _fnGetTdNodes(oSettings, i)[iCol], 
aoData[i]._anHidden[iCol] = nTd, nTd.parentNode.removeChild(nTd));
for (aoColumns[iCol].bVisible = bShow, _fnDrawHead(oSettings, oSettings.aoHeader), 
oSettings.nTFoot && _fnDrawHead(oSettings, oSettings.aoFooter), i = 0, iLen = oSettings.aoOpenRows.length; iLen > i; i++) oSettings.aoOpenRows[i].nTr.colSpan = _fnVisbleColumns(oSettings);
(bRedraw === undefined || bRedraw) && (_fnAdjustColumnSizing(oSettings), _fnDraw(oSettings)), 
_fnSaveState(oSettings);
}
}, this.fnSettings = function() {
return _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
}, this.fnSort = function(aaSort) {
var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
oSettings.aaSorting = aaSort, _fnSort(oSettings);
}, this.fnSortListener = function(nNode, iColumn, fnCallback) {
_fnSortAttachListener(_fnSettingsFromNode(this[DataTable.ext.iApiIndex]), nNode, iColumn, fnCallback);
}, this.fnUpdate = function(mData, mRow, iColumn, bRedraw, bAction) {
var i, sDisplay, oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]), iRow = "object" == typeof mRow ? _fnNodeToDataIndex(oSettings, mRow) :mRow;
if ($.isArray(mData) && iColumn === undefined) for (oSettings.aoData[iRow]._aData = mData.slice(), 
i = 0; i < oSettings.aoColumns.length; i++) this.fnUpdate(_fnGetCellData(oSettings, iRow, i), iRow, i, !1, !1); else if ($.isPlainObject(mData) && iColumn === undefined) for (oSettings.aoData[iRow]._aData = $.extend(!0, {}, mData), 
i = 0; i < oSettings.aoColumns.length; i++) this.fnUpdate(_fnGetCellData(oSettings, iRow, i), iRow, i, !1, !1); else {
_fnSetCellData(oSettings, iRow, iColumn, mData), sDisplay = _fnGetCellData(oSettings, iRow, iColumn, "display");
var oCol = oSettings.aoColumns[iColumn];
null !== oCol.fnRender && (sDisplay = _fnRender(oSettings, iRow, iColumn), oCol.bUseRendered && _fnSetCellData(oSettings, iRow, iColumn, sDisplay)), 
null !== oSettings.aoData[iRow].nTr && (_fnGetTdNodes(oSettings, iRow)[iColumn].innerHTML = sDisplay);
}
var iDisplayIndex = $.inArray(iRow, oSettings.aiDisplay);
return oSettings.asDataSearch[iDisplayIndex] = _fnBuildSearchRow(oSettings, _fnGetRowData(oSettings, iRow, "filter", _fnGetColumns(oSettings, "bSearchable"))), 
(bAction === undefined || bAction) && _fnAdjustColumnSizing(oSettings), (bRedraw === undefined || bRedraw) && _fnReDraw(oSettings), 
0;
}, this.fnVersionCheck = DataTable.ext.fnVersionCheck, this.oApi = {
_fnExternApiFunc:_fnExternApiFunc,
_fnInitialise:_fnInitialise,
_fnInitComplete:_fnInitComplete,
_fnLanguageCompat:_fnLanguageCompat,
_fnAddColumn:_fnAddColumn,
_fnColumnOptions:_fnColumnOptions,
_fnAddData:_fnAddData,
_fnCreateTr:_fnCreateTr,
_fnGatherData:_fnGatherData,
_fnBuildHead:_fnBuildHead,
_fnDrawHead:_fnDrawHead,
_fnDraw:_fnDraw,
_fnReDraw:_fnReDraw,
_fnAjaxUpdate:_fnAjaxUpdate,
_fnAjaxParameters:_fnAjaxParameters,
_fnAjaxUpdateDraw:_fnAjaxUpdateDraw,
_fnServerParams:_fnServerParams,
_fnAddOptionsHtml:_fnAddOptionsHtml,
_fnFeatureHtmlTable:_fnFeatureHtmlTable,
_fnScrollDraw:_fnScrollDraw,
_fnAdjustColumnSizing:_fnAdjustColumnSizing,
_fnFeatureHtmlFilter:_fnFeatureHtmlFilter,
_fnFilterComplete:_fnFilterComplete,
_fnFilterCustom:_fnFilterCustom,
_fnFilterColumn:_fnFilterColumn,
_fnFilter:_fnFilter,
_fnBuildSearchArray:_fnBuildSearchArray,
_fnBuildSearchRow:_fnBuildSearchRow,
_fnFilterCreateSearch:_fnFilterCreateSearch,
_fnDataToSearch:_fnDataToSearch,
_fnSort:_fnSort,
_fnSortAttachListener:_fnSortAttachListener,
_fnSortingClasses:_fnSortingClasses,
_fnFeatureHtmlPaginate:_fnFeatureHtmlPaginate,
_fnPageChange:_fnPageChange,
_fnFeatureHtmlInfo:_fnFeatureHtmlInfo,
_fnUpdateInfo:_fnUpdateInfo,
_fnFeatureHtmlLength:_fnFeatureHtmlLength,
_fnFeatureHtmlProcessing:_fnFeatureHtmlProcessing,
_fnProcessingDisplay:_fnProcessingDisplay,
_fnVisibleToColumnIndex:_fnVisibleToColumnIndex,
_fnColumnIndexToVisible:_fnColumnIndexToVisible,
_fnNodeToDataIndex:_fnNodeToDataIndex,
_fnVisbleColumns:_fnVisbleColumns,
_fnCalculateEnd:_fnCalculateEnd,
_fnConvertToWidth:_fnConvertToWidth,
_fnCalculateColumnWidths:_fnCalculateColumnWidths,
_fnScrollingWidthAdjust:_fnScrollingWidthAdjust,
_fnGetWidestNode:_fnGetWidestNode,
_fnGetMaxLenString:_fnGetMaxLenString,
_fnStringToCss:_fnStringToCss,
_fnDetectType:_fnDetectType,
_fnSettingsFromNode:_fnSettingsFromNode,
_fnGetDataMaster:_fnGetDataMaster,
_fnGetTrNodes:_fnGetTrNodes,
_fnGetTdNodes:_fnGetTdNodes,
_fnEscapeRegex:_fnEscapeRegex,
_fnDeleteIndex:_fnDeleteIndex,
_fnReOrderIndex:_fnReOrderIndex,
_fnColumnOrdering:_fnColumnOrdering,
_fnLog:_fnLog,
_fnClearTable:_fnClearTable,
_fnSaveState:_fnSaveState,
_fnLoadState:_fnLoadState,
_fnCreateCookie:_fnCreateCookie,
_fnReadCookie:_fnReadCookie,
_fnDetectHeader:_fnDetectHeader,
_fnGetUniqueThs:_fnGetUniqueThs,
_fnScrollBarWidth:_fnScrollBarWidth,
_fnApplyToChildren:_fnApplyToChildren,
_fnMap:_fnMap,
_fnGetRowData:_fnGetRowData,
_fnGetCellData:_fnGetCellData,
_fnSetCellData:_fnSetCellData,
_fnGetObjectDataFn:_fnGetObjectDataFn,
_fnSetObjectDataFn:_fnSetObjectDataFn,
_fnApplyColumnDefs:_fnApplyColumnDefs,
_fnBindAction:_fnBindAction,
_fnExtend:_fnExtend,
_fnCallbackReg:_fnCallbackReg,
_fnCallbackFire:_fnCallbackFire,
_fnJsonString:_fnJsonString,
_fnRender:_fnRender,
_fnNodeToColumnIndex:_fnNodeToColumnIndex,
_fnInfoMacros:_fnInfoMacros,
_fnBrowserDetect:_fnBrowserDetect,
_fnGetColumns:_fnGetColumns
}, $.extend(DataTable.ext.oApi, this.oApi);
for (var sFunc in DataTable.ext.oApi) sFunc && (this[sFunc] = _fnExternApiFunc(sFunc));
var _that = this;
return this.each(function() {
var iLen, j, jLen, i = 0, sId = this.getAttribute("id"), bInitHandedOff = !1, bUsePassedData = !1;
if ("table" != this.nodeName.toLowerCase()) return _fnLog(null, 0, "Attempted to initialise DataTables on a node which is not a table: " + this.nodeName), 
void 0;
for (i = 0, iLen = DataTable.settings.length; iLen > i; i++) {
if (DataTable.settings[i].nTable == this) {
if (oInit === undefined || oInit.bRetrieve) return DataTable.settings[i].oInstance;
if (oInit.bDestroy) {
DataTable.settings[i].oInstance.fnDestroy();
break;
}
return _fnLog(DataTable.settings[i], 0, "Cannot reinitialise DataTable.\n\nTo retrieve the DataTables object for this table, pass no arguments or see the docs for bRetrieve and bDestroy"), 
void 0;
}
if (DataTable.settings[i].sTableId == this.id) {
DataTable.settings.splice(i, 1);
break;
}
}
(null === sId || "" === sId) && (sId = "DataTables_Table_" + DataTable.ext._oExternConfig.iNextUnique++, 
this.id = sId);
var oSettings = $.extend(!0, {}, DataTable.models.oSettings, {
nTable:this,
oApi:_that.oApi,
oInit:oInit,
sDestroyWidth:$(this).width(),
sInstance:sId,
sTableId:sId
});
if (DataTable.settings.push(oSettings), oSettings.oInstance = 1 === _that.length ? _that :$(this).dataTable(), 
oInit || (oInit = {}), oInit.oLanguage && _fnLanguageCompat(oInit.oLanguage), oInit = _fnExtend($.extend(!0, {}, DataTable.defaults), oInit), 
_fnMap(oSettings.oFeatures, oInit, "bPaginate"), _fnMap(oSettings.oFeatures, oInit, "bLengthChange"), 
_fnMap(oSettings.oFeatures, oInit, "bFilter"), _fnMap(oSettings.oFeatures, oInit, "bSort"), 
_fnMap(oSettings.oFeatures, oInit, "bInfo"), _fnMap(oSettings.oFeatures, oInit, "bProcessing"), 
_fnMap(oSettings.oFeatures, oInit, "bAutoWidth"), _fnMap(oSettings.oFeatures, oInit, "bSortClasses"), 
_fnMap(oSettings.oFeatures, oInit, "bServerSide"), _fnMap(oSettings.oFeatures, oInit, "bDeferRender"), 
_fnMap(oSettings.oScroll, oInit, "sScrollX", "sX"), _fnMap(oSettings.oScroll, oInit, "sScrollXInner", "sXInner"), 
_fnMap(oSettings.oScroll, oInit, "sScrollY", "sY"), _fnMap(oSettings.oScroll, oInit, "bScrollCollapse", "bCollapse"), 
_fnMap(oSettings.oScroll, oInit, "bScrollInfinite", "bInfinite"), _fnMap(oSettings.oScroll, oInit, "iScrollLoadGap", "iLoadGap"), 
_fnMap(oSettings.oScroll, oInit, "bScrollAutoCss", "bAutoCss"), _fnMap(oSettings, oInit, "asStripeClasses"), 
_fnMap(oSettings, oInit, "asStripClasses", "asStripeClasses"), _fnMap(oSettings, oInit, "fnServerData"), 
_fnMap(oSettings, oInit, "fnFormatNumber"), _fnMap(oSettings, oInit, "sServerMethod"), 
_fnMap(oSettings, oInit, "aaSorting"), _fnMap(oSettings, oInit, "aaSortingFixed"), 
_fnMap(oSettings, oInit, "aLengthMenu"), _fnMap(oSettings, oInit, "sPaginationType"), 
_fnMap(oSettings, oInit, "sAjaxSource"), _fnMap(oSettings, oInit, "sAjaxDataProp"), 
_fnMap(oSettings, oInit, "iCookieDuration"), _fnMap(oSettings, oInit, "sCookiePrefix"), 
_fnMap(oSettings, oInit, "sDom"), _fnMap(oSettings, oInit, "bSortCellsTop"), _fnMap(oSettings, oInit, "iTabIndex"), 
_fnMap(oSettings, oInit, "oSearch", "oPreviousSearch"), _fnMap(oSettings, oInit, "aoSearchCols", "aoPreSearchCols"), 
_fnMap(oSettings, oInit, "iDisplayLength", "_iDisplayLength"), _fnMap(oSettings, oInit, "bJQueryUI", "bJUI"), 
_fnMap(oSettings, oInit, "fnCookieCallback"), _fnMap(oSettings, oInit, "fnStateLoad"), 
_fnMap(oSettings, oInit, "fnStateSave"), _fnMap(oSettings.oLanguage, oInit, "fnInfoCallback"), 
_fnCallbackReg(oSettings, "aoDrawCallback", oInit.fnDrawCallback, "user"), _fnCallbackReg(oSettings, "aoServerParams", oInit.fnServerParams, "user"), 
_fnCallbackReg(oSettings, "aoStateSaveParams", oInit.fnStateSaveParams, "user"), 
_fnCallbackReg(oSettings, "aoStateLoadParams", oInit.fnStateLoadParams, "user"), 
_fnCallbackReg(oSettings, "aoStateLoaded", oInit.fnStateLoaded, "user"), _fnCallbackReg(oSettings, "aoRowCallback", oInit.fnRowCallback, "user"), 
_fnCallbackReg(oSettings, "aoRowCreatedCallback", oInit.fnCreatedRow, "user"), _fnCallbackReg(oSettings, "aoHeaderCallback", oInit.fnHeaderCallback, "user"), 
_fnCallbackReg(oSettings, "aoFooterCallback", oInit.fnFooterCallback, "user"), _fnCallbackReg(oSettings, "aoInitComplete", oInit.fnInitComplete, "user"), 
_fnCallbackReg(oSettings, "aoPreDrawCallback", oInit.fnPreDrawCallback, "user"), 
oSettings.oFeatures.bServerSide && oSettings.oFeatures.bSort && oSettings.oFeatures.bSortClasses ? _fnCallbackReg(oSettings, "aoDrawCallback", _fnSortingClasses, "server_side_sort_classes") :oSettings.oFeatures.bDeferRender && _fnCallbackReg(oSettings, "aoDrawCallback", _fnSortingClasses, "defer_sort_classes"), 
oInit.bJQueryUI ? ($.extend(oSettings.oClasses, DataTable.ext.oJUIClasses), oInit.sDom === DataTable.defaults.sDom && "lfrtip" === DataTable.defaults.sDom && (oSettings.sDom = '<"H"lfr>t<"F"ip>')) :$.extend(oSettings.oClasses, DataTable.ext.oStdClasses), 
$(this).addClass(oSettings.oClasses.sTable), ("" !== oSettings.oScroll.sX || "" !== oSettings.oScroll.sY) && (oSettings.oScroll.iBarWidth = _fnScrollBarWidth()), 
oSettings.iInitDisplayStart === undefined && (oSettings.iInitDisplayStart = oInit.iDisplayStart, 
oSettings._iDisplayStart = oInit.iDisplayStart), oInit.bStateSave && (oSettings.oFeatures.bStateSave = !0, 
_fnLoadState(oSettings, oInit), _fnCallbackReg(oSettings, "aoDrawCallback", _fnSaveState, "state_save")), 
null !== oInit.iDeferLoading) {
oSettings.bDeferLoading = !0;
var tmp = $.isArray(oInit.iDeferLoading);
oSettings._iRecordsDisplay = tmp ? oInit.iDeferLoading[0] :oInit.iDeferLoading, 
oSettings._iRecordsTotal = tmp ? oInit.iDeferLoading[1] :oInit.iDeferLoading;
}
if (null !== oInit.aaData && (bUsePassedData = !0), "" !== oInit.oLanguage.sUrl ? (oSettings.oLanguage.sUrl = oInit.oLanguage.sUrl, 
$.getJSON(oSettings.oLanguage.sUrl, null, function(json) {
_fnLanguageCompat(json), $.extend(!0, oSettings.oLanguage, oInit.oLanguage, json), 
_fnInitialise(oSettings);
}), bInitHandedOff = !0) :$.extend(!0, oSettings.oLanguage, oInit.oLanguage), null === oInit.asStripeClasses && (oSettings.asStripeClasses = [ oSettings.oClasses.sStripeOdd, oSettings.oClasses.sStripeEven ]), 
iLen = oSettings.asStripeClasses.length, oSettings.asDestroyStripes = [], iLen) {
var bStripeRemove = !1, anRows = $(this).children("tbody").children("tr:lt(" + iLen + ")");
for (i = 0; iLen > i; i++) anRows.hasClass(oSettings.asStripeClasses[i]) && (bStripeRemove = !0, 
oSettings.asDestroyStripes.push(oSettings.asStripeClasses[i]));
bStripeRemove && anRows.removeClass(oSettings.asStripeClasses.join(" "));
}
var aoColumnsInit, anThs = [], nThead = this.getElementsByTagName("thead");
if (0 !== nThead.length && (_fnDetectHeader(oSettings.aoHeader, nThead[0]), anThs = _fnGetUniqueThs(oSettings)), 
null === oInit.aoColumns) for (aoColumnsInit = [], i = 0, iLen = anThs.length; iLen > i; i++) aoColumnsInit.push(null); else aoColumnsInit = oInit.aoColumns;
for (i = 0, iLen = aoColumnsInit.length; iLen > i; i++) oInit.saved_aoColumns !== undefined && oInit.saved_aoColumns.length == iLen && (null === aoColumnsInit[i] && (aoColumnsInit[i] = {}), 
aoColumnsInit[i].bVisible = oInit.saved_aoColumns[i].bVisible), _fnAddColumn(oSettings, anThs ? anThs[i] :null);
for (_fnApplyColumnDefs(oSettings, oInit.aoColumnDefs, aoColumnsInit, function(iCol, oDef) {
_fnColumnOptions(oSettings, iCol, oDef);
}), i = 0, iLen = oSettings.aaSorting.length; iLen > i; i++) {
oSettings.aaSorting[i][0] >= oSettings.aoColumns.length && (oSettings.aaSorting[i][0] = 0);
var oColumn = oSettings.aoColumns[oSettings.aaSorting[i][0]];
for (oSettings.aaSorting[i][2] === undefined && (oSettings.aaSorting[i][2] = 0), 
oInit.aaSorting === undefined && oSettings.saved_aaSorting === undefined && (oSettings.aaSorting[i][1] = oColumn.asSorting[0]), 
j = 0, jLen = oColumn.asSorting.length; jLen > j; j++) if (oSettings.aaSorting[i][1] == oColumn.asSorting[j]) {
oSettings.aaSorting[i][2] = j;
break;
}
}
_fnSortingClasses(oSettings), _fnBrowserDetect(oSettings);
var captions = $(this).children("caption").each(function() {
this._captionSide = $(this).css("caption-side");
}), thead = $(this).children("thead");
0 === thead.length && (thead = [ document.createElement("thead") ], this.appendChild(thead[0])), 
oSettings.nTHead = thead[0];
var tbody = $(this).children("tbody");
0 === tbody.length && (tbody = [ document.createElement("tbody") ], this.appendChild(tbody[0])), 
oSettings.nTBody = tbody[0], oSettings.nTBody.setAttribute("role", "alert"), oSettings.nTBody.setAttribute("aria-live", "polite"), 
oSettings.nTBody.setAttribute("aria-relevant", "all");
var tfoot = $(this).children("tfoot");
if (0 === tfoot.length && captions.length > 0 && ("" !== oSettings.oScroll.sX || "" !== oSettings.oScroll.sY) && (tfoot = [ document.createElement("tfoot") ], 
this.appendChild(tfoot[0])), tfoot.length > 0 && (oSettings.nTFoot = tfoot[0], _fnDetectHeader(oSettings.aoFooter, oSettings.nTFoot)), 
bUsePassedData) for (i = 0; i < oInit.aaData.length; i++) _fnAddData(oSettings, oInit.aaData[i]); else _fnGatherData(oSettings);
oSettings.aiDisplay = oSettings.aiDisplayMaster.slice(), oSettings.bInitialised = !0, 
bInitHandedOff === !1 && _fnInitialise(oSettings);
}), _that = null, this;
};
DataTable.fnVersionCheck = function(sVersion) {
for (var fnZPad = function(Zpad, count) {
for (;Zpad.length < count; ) Zpad += "0";
return Zpad;
}, aThis = DataTable.ext.sVersion.split("."), aThat = sVersion.split("."), sThis = "", sThat = "", i = 0, iLen = aThat.length; iLen > i; i++) sThis += fnZPad(aThis[i], 3), 
sThat += fnZPad(aThat[i], 3);
return parseInt(sThis, 10) >= parseInt(sThat, 10);
}, DataTable.fnIsDataTable = function(nTable) {
for (var o = DataTable.settings, i = 0; i < o.length; i++) if (o[i].nTable === nTable || o[i].nScrollHead === nTable || o[i].nScrollFoot === nTable) return !0;
return !1;
}, DataTable.fnTables = function(bVisible) {
var out = [];
return jQuery.each(DataTable.settings, function(i, o) {
(!bVisible || bVisible === !0 && $(o.nTable).is(":visible")) && out.push(o.nTable);
}), out;
}, DataTable.version = "1.9.4", DataTable.settings = [], DataTable.models = {}, 
DataTable.models.ext = {
afnFiltering:[],
afnSortData:[],
aoFeatures:[],
aTypes:[],
fnVersionCheck:DataTable.fnVersionCheck,
iApiIndex:0,
ofnSearch:{},
oApi:{},
oStdClasses:{},
oJUIClasses:{},
oPagination:{},
oSort:{},
sVersion:DataTable.version,
sErrMode:"alert",
_oExternConfig:{
iNextUnique:0
}
}, DataTable.models.oSearch = {
bCaseInsensitive:!0,
sSearch:"",
bRegex:!1,
bSmart:!0
}, DataTable.models.oRow = {
nTr:null,
_aData:[],
_aSortData:[],
_anHidden:[],
_sRowStripe:""
}, DataTable.models.oColumn = {
aDataSort:null,
asSorting:null,
bSearchable:null,
bSortable:null,
bUseRendered:null,
bVisible:null,
_bAutoType:!0,
fnCreatedCell:null,
fnGetData:null,
fnRender:null,
fnSetData:null,
mData:null,
mRender:null,
nTh:null,
nTf:null,
sClass:null,
sContentPadding:null,
sDefaultContent:null,
sName:null,
sSortDataType:"std",
sSortingClass:null,
sSortingClassJUI:null,
sTitle:null,
sType:null,
sWidth:null,
sWidthOrig:null
}, DataTable.defaults = {
aaData:null,
aaSorting:[ [ 0, "asc" ] ],
aaSortingFixed:null,
aLengthMenu:[ 10, 25, 50, 100 ],
aoColumns:null,
aoColumnDefs:null,
aoSearchCols:[],
asStripeClasses:null,
bAutoWidth:!0,
bDeferRender:!1,
bDestroy:!1,
bFilter:!0,
bInfo:!0,
bJQueryUI:!1,
bLengthChange:!0,
bPaginate:!0,
bProcessing:!1,
bRetrieve:!1,
bScrollAutoCss:!0,
bScrollCollapse:!1,
bScrollInfinite:!1,
bServerSide:!1,
bSort:!0,
bSortCellsTop:!1,
bSortClasses:!0,
bStateSave:!1,
fnCookieCallback:null,
fnCreatedRow:null,
fnDrawCallback:null,
fnFooterCallback:null,
fnFormatNumber:function(iIn) {
if (1e3 > iIn) return iIn;
for (var s = iIn + "", a = s.split(""), out = "", iLen = s.length, i = 0; iLen > i; i++) i % 3 === 0 && 0 !== i && (out = this.oLanguage.sInfoThousands + out), 
out = a[iLen - i - 1] + out;
return out;
},
fnHeaderCallback:null,
fnInfoCallback:null,
fnInitComplete:null,
fnPreDrawCallback:null,
fnRowCallback:null,
fnServerData:function(sUrl, aoData, fnCallback, oSettings) {
oSettings.jqXHR = $.ajax({
url:sUrl,
data:aoData,
success:function(json) {
json.sError && oSettings.oApi._fnLog(oSettings, 0, json.sError), $(oSettings.oInstance).trigger("xhr", [ oSettings, json ]), 
fnCallback(json);
},
dataType:"json",
cache:!1,
type:oSettings.sServerMethod,
error:function(xhr, error) {
"parsererror" == error && oSettings.oApi._fnLog(oSettings, 0, "DataTables warning: JSON data from server could not be parsed. This is caused by a JSON formatting error.");
}
});
},
fnServerParams:null,
fnStateLoad:function(oSettings) {
var sData = this.oApi._fnReadCookie(oSettings.sCookiePrefix + oSettings.sInstance), oData;
try {
oData = "function" == typeof $.parseJSON ? $.parseJSON(sData) :eval("(" + sData + ")");
} catch (e) {
oData = null;
}
return oData;
},
fnStateLoadParams:null,
fnStateLoaded:null,
fnStateSave:function(oSettings, oData) {
this.oApi._fnCreateCookie(oSettings.sCookiePrefix + oSettings.sInstance, this.oApi._fnJsonString(oData), oSettings.iCookieDuration, oSettings.sCookiePrefix, oSettings.fnCookieCallback);
},
fnStateSaveParams:null,
iCookieDuration:7200,
iDeferLoading:null,
iDisplayLength:10,
iDisplayStart:0,
iScrollLoadGap:100,
iTabIndex:0,
oLanguage:{
oAria:{
sSortAscending:": activate to sort column ascending",
sSortDescending:": activate to sort column descending"
},
oPaginate:{
sFirst:"First",
sLast:"Last",
sNext:"Next",
sPrevious:"Previous"
},
sEmptyTable:"No data available in table",
sInfo:"Showing _START_ to _END_ of _TOTAL_ entries",
sInfoEmpty:"Showing 0 to 0 of 0 entries",
sInfoFiltered:"(filtered from _MAX_ total entries)",
sInfoPostFix:"",
sInfoThousands:",",
sLengthMenu:"Show _MENU_ entries",
sLoadingRecords:"Loading...",
sProcessing:"Processing...",
sSearch:"Search:",
sUrl:"",
sZeroRecords:"No matching records found"
},
oSearch:$.extend({}, DataTable.models.oSearch),
sAjaxDataProp:"aaData",
sAjaxSource:null,
sCookiePrefix:"SpryMedia_DataTables_",
sDom:"lfrtip",
sPaginationType:"two_button",
sScrollX:"",
sScrollXInner:"",
sScrollY:"",
sServerMethod:"GET"
}, DataTable.defaults.columns = {
aDataSort:null,
asSorting:[ "asc", "desc" ],
bSearchable:!0,
bSortable:!0,
bUseRendered:!0,
bVisible:!0,
fnCreatedCell:null,
fnRender:null,
iDataSort:-1,
mData:null,
mRender:null,
sCellType:"td",
sClass:"",
sContentPadding:"",
sDefaultContent:null,
sName:"",
sSortDataType:"std",
sTitle:null,
sType:null,
sWidth:null
}, DataTable.models.oSettings = {
oFeatures:{
bAutoWidth:null,
bDeferRender:null,
bFilter:null,
bInfo:null,
bLengthChange:null,
bPaginate:null,
bProcessing:null,
bServerSide:null,
bSort:null,
bSortClasses:null,
bStateSave:null
},
oScroll:{
bAutoCss:null,
bCollapse:null,
bInfinite:null,
iBarWidth:0,
iLoadGap:null,
sX:null,
sXInner:null,
sY:null
},
oLanguage:{
fnInfoCallback:null
},
oBrowser:{
bScrollOversize:!1
},
aanFeatures:[],
aoData:[],
aiDisplay:[],
aiDisplayMaster:[],
aoColumns:[],
aoHeader:[],
aoFooter:[],
asDataSearch:[],
oPreviousSearch:{},
aoPreSearchCols:[],
aaSorting:null,
aaSortingFixed:null,
asStripeClasses:null,
asDestroyStripes:[],
sDestroyWidth:0,
aoRowCallback:[],
aoHeaderCallback:[],
aoFooterCallback:[],
aoDrawCallback:[],
aoRowCreatedCallback:[],
aoPreDrawCallback:[],
aoInitComplete:[],
aoStateSaveParams:[],
aoStateLoadParams:[],
aoStateLoaded:[],
sTableId:"",
nTable:null,
nTHead:null,
nTFoot:null,
nTBody:null,
nTableWrapper:null,
bDeferLoading:!1,
bInitialised:!1,
aoOpenRows:[],
sDom:null,
sPaginationType:"two_button",
iCookieDuration:0,
sCookiePrefix:"",
fnCookieCallback:null,
aoStateSave:[],
aoStateLoad:[],
oLoadedState:null,
sAjaxSource:null,
sAjaxDataProp:null,
bAjaxDataGet:!0,
jqXHR:null,
fnServerData:null,
aoServerParams:[],
sServerMethod:null,
fnFormatNumber:null,
aLengthMenu:null,
iDraw:0,
bDrawing:!1,
iDrawError:-1,
_iDisplayLength:10,
_iDisplayStart:0,
_iDisplayEnd:10,
_iRecordsTotal:0,
_iRecordsDisplay:0,
bJUI:null,
oClasses:{},
bFiltered:!1,
bSorted:!1,
bSortCellsTop:null,
oInit:null,
aoDestroyCallback:[],
fnRecordsTotal:function() {
return this.oFeatures.bServerSide ? parseInt(this._iRecordsTotal, 10) :this.aiDisplayMaster.length;
},
fnRecordsDisplay:function() {
return this.oFeatures.bServerSide ? parseInt(this._iRecordsDisplay, 10) :this.aiDisplay.length;
},
fnDisplayEnd:function() {
return this.oFeatures.bServerSide ? this.oFeatures.bPaginate === !1 || -1 == this._iDisplayLength ? this._iDisplayStart + this.aiDisplay.length :Math.min(this._iDisplayStart + this._iDisplayLength, this._iRecordsDisplay) :this._iDisplayEnd;
},
oInstance:null,
sInstance:null,
iTabIndex:0,
nScrollHead:null,
nScrollFoot:null
}, DataTable.ext = $.extend(!0, {}, DataTable.models.ext), $.extend(DataTable.ext.oStdClasses, {
sTable:"dataTable",
sPagePrevEnabled:"paginate_enabled_previous",
sPagePrevDisabled:"paginate_disabled_previous",
sPageNextEnabled:"paginate_enabled_next",
sPageNextDisabled:"paginate_disabled_next",
sPageJUINext:"",
sPageJUIPrev:"",
sPageButton:"paginate_button",
sPageButtonActive:"paginate_active",
sPageButtonStaticDisabled:"paginate_button paginate_button_disabled",
sPageFirst:"first",
sPagePrevious:"previous",
sPageNext:"next",
sPageLast:"last",
sStripeOdd:"odd",
sStripeEven:"even",
sRowEmpty:"dataTables_empty",
sWrapper:"dataTables_wrapper",
sFilter:"dataTables_filter",
sInfo:"dataTables_info",
sPaging:"dataTables_paginate paging_",
sLength:"dataTables_length",
sProcessing:"dataTables_processing",
sSortAsc:"sorting_asc",
sSortDesc:"sorting_desc",
sSortable:"sorting",
sSortableAsc:"sorting_asc_disabled",
sSortableDesc:"sorting_desc_disabled",
sSortableNone:"sorting_disabled",
sSortColumn:"sorting_",
sSortJUIAsc:"",
sSortJUIDesc:"",
sSortJUI:"",
sSortJUIAscAllowed:"",
sSortJUIDescAllowed:"",
sSortJUIWrapper:"",
sSortIcon:"",
sScrollWrapper:"dataTables_scroll",
sScrollHead:"dataTables_scrollHead",
sScrollHeadInner:"dataTables_scrollHeadInner",
sScrollBody:"dataTables_scrollBody",
sScrollFoot:"dataTables_scrollFoot",
sScrollFootInner:"dataTables_scrollFootInner",
sFooterTH:"",
sJUIHeader:"",
sJUIFooter:""
}), $.extend(DataTable.ext.oJUIClasses, DataTable.ext.oStdClasses, {
sPagePrevEnabled:"fg-button ui-button ui-state-default ui-corner-left",
sPagePrevDisabled:"fg-button ui-button ui-state-default ui-corner-left ui-state-disabled",
sPageNextEnabled:"fg-button ui-button ui-state-default ui-corner-right",
sPageNextDisabled:"fg-button ui-button ui-state-default ui-corner-right ui-state-disabled",
sPageJUINext:"ui-icon ui-icon-circle-arrow-e",
sPageJUIPrev:"ui-icon ui-icon-circle-arrow-w",
sPageButton:"fg-button ui-button ui-state-default",
sPageButtonActive:"fg-button ui-button ui-state-default ui-state-disabled",
sPageButtonStaticDisabled:"fg-button ui-button ui-state-default ui-state-disabled",
sPageFirst:"first ui-corner-tl ui-corner-bl",
sPageLast:"last ui-corner-tr ui-corner-br",
sPaging:"dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
sSortAsc:"ui-state-default",
sSortDesc:"ui-state-default",
sSortable:"ui-state-default",
sSortableAsc:"ui-state-default",
sSortableDesc:"ui-state-default",
sSortableNone:"ui-state-default",
sSortJUIAsc:"css_right ui-icon ui-icon-triangle-1-n",
sSortJUIDesc:"css_right ui-icon ui-icon-triangle-1-s",
sSortJUI:"css_right ui-icon ui-icon-carat-2-n-s",
sSortJUIAscAllowed:"css_right ui-icon ui-icon-carat-1-n",
sSortJUIDescAllowed:"css_right ui-icon ui-icon-carat-1-s",
sSortJUIWrapper:"DataTables_sort_wrapper",
sSortIcon:"DataTables_sort_icon",
sScrollHead:"dataTables_scrollHead ui-state-default",
sScrollFoot:"dataTables_scrollFoot ui-state-default",
sFooterTH:"ui-state-default",
sJUIHeader:"fg-toolbar ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix",
sJUIFooter:"fg-toolbar ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix"
}), $.extend(DataTable.ext.oPagination, {
two_button:{
fnInit:function(oSettings, nPaging, fnCallbackDraw) {
var oLang = oSettings.oLanguage.oPaginate, fnClickHandler = (oSettings.oClasses, 
function(e) {
oSettings.oApi._fnPageChange(oSettings, e.data.action) && fnCallbackDraw(oSettings);
}), sAppend = oSettings.bJUI ? '<a class="' + oSettings.oClasses.sPagePrevDisabled + '" tabindex="' + oSettings.iTabIndex + '" role="button"><span class="' + oSettings.oClasses.sPageJUIPrev + '"></span></a><a class="' + oSettings.oClasses.sPageNextDisabled + '" tabindex="' + oSettings.iTabIndex + '" role="button"><span class="' + oSettings.oClasses.sPageJUINext + '"></span></a>' :'<a class="' + oSettings.oClasses.sPagePrevDisabled + '" tabindex="' + oSettings.iTabIndex + '" role="button">' + oLang.sPrevious + '</a><a class="' + oSettings.oClasses.sPageNextDisabled + '" tabindex="' + oSettings.iTabIndex + '" role="button">' + oLang.sNext + "</a>";
$(nPaging).append(sAppend);
var els = $("a", nPaging), nPrevious = els[0], nNext = els[1];
oSettings.oApi._fnBindAction(nPrevious, {
action:"previous"
}, fnClickHandler), oSettings.oApi._fnBindAction(nNext, {
action:"next"
}, fnClickHandler), oSettings.aanFeatures.p || (nPaging.id = oSettings.sTableId + "_paginate", 
nPrevious.id = oSettings.sTableId + "_previous", nNext.id = oSettings.sTableId + "_next", 
nPrevious.setAttribute("aria-controls", oSettings.sTableId), nNext.setAttribute("aria-controls", oSettings.sTableId));
},
fnUpdate:function(oSettings) {
if (oSettings.aanFeatures.p) for (var nNode, oClasses = oSettings.oClasses, an = oSettings.aanFeatures.p, i = 0, iLen = an.length; iLen > i; i++) nNode = an[i].firstChild, 
nNode && (nNode.className = 0 === oSettings._iDisplayStart ? oClasses.sPagePrevDisabled :oClasses.sPagePrevEnabled, 
nNode = nNode.nextSibling, nNode.className = oSettings.fnDisplayEnd() == oSettings.fnRecordsDisplay() ? oClasses.sPageNextDisabled :oClasses.sPageNextEnabled);
}
},
iFullNumbersShowPages:5,
full_numbers:{
fnInit:function(oSettings, nPaging, fnCallbackDraw) {
var oLang = oSettings.oLanguage.oPaginate, oClasses = oSettings.oClasses, fnClickHandler = function(e) {
oSettings.oApi._fnPageChange(oSettings, e.data.action) && fnCallbackDraw(oSettings);
};
$(nPaging).append('<a  tabindex="' + oSettings.iTabIndex + '" class="' + oClasses.sPageButton + " " + oClasses.sPageFirst + '">' + oLang.sFirst + '</a><a  tabindex="' + oSettings.iTabIndex + '" class="' + oClasses.sPageButton + " " + oClasses.sPagePrevious + '">' + oLang.sPrevious + '</a><span></span><a tabindex="' + oSettings.iTabIndex + '" class="' + oClasses.sPageButton + " " + oClasses.sPageNext + '">' + oLang.sNext + '</a><a tabindex="' + oSettings.iTabIndex + '" class="' + oClasses.sPageButton + " " + oClasses.sPageLast + '">' + oLang.sLast + "</a>");
var els = $("a", nPaging), nFirst = els[0], nPrev = els[1], nNext = els[2], nLast = els[3];
oSettings.oApi._fnBindAction(nFirst, {
action:"first"
}, fnClickHandler), oSettings.oApi._fnBindAction(nPrev, {
action:"previous"
}, fnClickHandler), oSettings.oApi._fnBindAction(nNext, {
action:"next"
}, fnClickHandler), oSettings.oApi._fnBindAction(nLast, {
action:"last"
}, fnClickHandler), oSettings.aanFeatures.p || (nPaging.id = oSettings.sTableId + "_paginate", 
nFirst.id = oSettings.sTableId + "_first", nPrev.id = oSettings.sTableId + "_previous", 
nNext.id = oSettings.sTableId + "_next", nLast.id = oSettings.sTableId + "_last");
},
fnUpdate:function(oSettings, fnCallbackDraw) {
if (oSettings.aanFeatures.p) {
var iStartButton, iEndButton, i, iLen, anButtons, anStatic, nNode, iPageCount = DataTable.ext.oPagination.iFullNumbersShowPages, iPageCountHalf = Math.floor(iPageCount / 2), iPages = Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength), iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1, sList = "", oClasses = oSettings.oClasses, an = oSettings.aanFeatures.p, fnBind = function(j) {
oSettings.oApi._fnBindAction(this, {
page:j + iStartButton - 1
}, function(e) {
oSettings.oApi._fnPageChange(oSettings, e.data.page), fnCallbackDraw(oSettings), 
e.preventDefault();
});
};
for (-1 === oSettings._iDisplayLength ? (iStartButton = 1, iEndButton = 1, iCurrentPage = 1) :iPageCount > iPages ? (iStartButton = 1, 
iEndButton = iPages) :iPageCountHalf >= iCurrentPage ? (iStartButton = 1, iEndButton = iPageCount) :iCurrentPage >= iPages - iPageCountHalf ? (iStartButton = iPages - iPageCount + 1, 
iEndButton = iPages) :(iStartButton = iCurrentPage - Math.ceil(iPageCount / 2) + 1, 
iEndButton = iStartButton + iPageCount - 1), i = iStartButton; iEndButton >= i; i++) sList += iCurrentPage !== i ? '<a tabindex="' + oSettings.iTabIndex + '" class="' + oClasses.sPageButton + '">' + oSettings.fnFormatNumber(i) + "</a>" :'<a tabindex="' + oSettings.iTabIndex + '" class="' + oClasses.sPageButtonActive + '">' + oSettings.fnFormatNumber(i) + "</a>";
for (i = 0, iLen = an.length; iLen > i; i++) nNode = an[i], nNode.hasChildNodes() && ($("span:eq(0)", nNode).html(sList).children("a").each(fnBind), 
anButtons = nNode.getElementsByTagName("a"), anStatic = [ anButtons[0], anButtons[1], anButtons[anButtons.length - 2], anButtons[anButtons.length - 1] ], 
$(anStatic).removeClass(oClasses.sPageButton + " " + oClasses.sPageButtonActive + " " + oClasses.sPageButtonStaticDisabled), 
$([ anStatic[0], anStatic[1] ]).addClass(1 == iCurrentPage ? oClasses.sPageButtonStaticDisabled :oClasses.sPageButton), 
$([ anStatic[2], anStatic[3] ]).addClass(0 === iPages || iCurrentPage === iPages || -1 === oSettings._iDisplayLength ? oClasses.sPageButtonStaticDisabled :oClasses.sPageButton));
}
}
}
}), $.extend(DataTable.ext.oSort, {
"string-pre":function(a) {
return "string" != typeof a && (a = null !== a && a.toString ? a.toString() :""), 
a.toLowerCase();
},
"string-asc":function(x, y) {
return y > x ? -1 :x > y ? 1 :0;
},
"string-desc":function(x, y) {
return y > x ? 1 :x > y ? -1 :0;
},
"html-pre":function(a) {
return a.replace(/<.*?>/g, "").toLowerCase();
},
"html-asc":function(x, y) {
return y > x ? -1 :x > y ? 1 :0;
},
"html-desc":function(x, y) {
return y > x ? 1 :x > y ? -1 :0;
},
"date-pre":function(a) {
var x = Date.parse(a);
return (isNaN(x) || "" === x) && (x = Date.parse("01/01/1970 00:00:00")), x;
},
"date-asc":function(x, y) {
return x - y;
},
"date-desc":function(x, y) {
return y - x;
},
"numeric-pre":function(a) {
return "-" == a || "" === a ? 0 :1 * a;
},
"numeric-asc":function(x, y) {
return x - y;
},
"numeric-desc":function(x, y) {
return y - x;
}
}), $.extend(DataTable.ext.aTypes, [ function(sData) {
if ("number" == typeof sData) return "numeric";
if ("string" != typeof sData) return null;
var Char, sValidFirstChars = "0123456789-", sValidChars = "0123456789.", bDecimal = !1;
if (Char = sData.charAt(0), -1 == sValidFirstChars.indexOf(Char)) return null;
for (var i = 1; i < sData.length; i++) {
if (Char = sData.charAt(i), -1 == sValidChars.indexOf(Char)) return null;
if ("." == Char) {
if (bDecimal) return null;
bDecimal = !0;
}
}
return "numeric";
}, function(sData) {
var iParse = Date.parse(sData);
return null !== iParse && !isNaN(iParse) || "string" == typeof sData && 0 === sData.length ? "date" :null;
}, function(sData) {
return "string" == typeof sData && -1 != sData.indexOf("<") && -1 != sData.indexOf(">") ? "html" :null;
} ]), $.fn.DataTable = DataTable, $.fn.dataTable = DataTable, $.fn.dataTableSettings = DataTable.settings, 
$.fn.dataTableExt = DataTable.ext;
});
}(window, document);