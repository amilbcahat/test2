$.extend(!0, $.fn.dataTable.defaults, {
sDom:"<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
sPaginationType:"bootstrap",
oLanguage:{
sLengthMenu:"_MENU_ records per page"
}
}), $.extend($.fn.dataTableExt.oStdClasses, {
sWrapper:"dataTables_wrapper form-inline"
}), $.fn.dataTableExt.oApi.fnPagingInfo = function(oSettings) {
return {
iStart:oSettings._iDisplayStart,
iEnd:oSettings.fnDisplayEnd(),
iLength:oSettings._iDisplayLength,
iTotal:oSettings.fnRecordsTotal(),
iFilteredTotal:oSettings.fnRecordsDisplay(),
iPage:-1 === oSettings._iDisplayLength ? 0 :Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
iTotalPages:-1 === oSettings._iDisplayLength ? 0 :Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
};
}, $.extend($.fn.dataTableExt.oPagination, {
bootstrap:{
fnInit:function(oSettings, nPaging, fnDraw) {
var fnClickHandler = (oSettings.oLanguage.oPaginate, function(e) {
e.preventDefault(), oSettings.oApi._fnPageChange(oSettings, e.data.action) && fnDraw(oSettings);
});
$(nPaging).addClass("pagination").append('<ul><li class="prev disabled"><a href="#">&larr;</a></li><li class="next disabled"><a href="#">&rarr; </a></li></ul>');
var els = $("a", nPaging);
$(els[0]).bind("click.DT", {
action:"previous"
}, fnClickHandler), $(els[1]).bind("click.DT", {
action:"next"
}, fnClickHandler);
},
fnUpdate:function(oSettings, fnDraw) {
var i, ien, j, sClass, iStart, iEnd, iListLength = 5, oPaging = oSettings.oInstance.fnPagingInfo(), an = oSettings.aanFeatures.p, iHalf = Math.floor(iListLength / 2);
for (oPaging.iTotalPages < iListLength ? (iStart = 1, iEnd = oPaging.iTotalPages) :oPaging.iPage <= iHalf ? (iStart = 1, 
iEnd = iListLength) :oPaging.iPage >= oPaging.iTotalPages - iHalf ? (iStart = oPaging.iTotalPages - iListLength + 1, 
iEnd = oPaging.iTotalPages) :(iStart = oPaging.iPage - iHalf + 1, iEnd = iStart + iListLength - 1), 
i = 0, ien = an.length; ien > i; i++) {
for ($("li:gt(0)", an[i]).filter(":not(:last)").remove(), j = iStart; iEnd >= j; j++) sClass = j == oPaging.iPage + 1 ? 'class="active"' :"", 
$("<li " + sClass + '><a href="#">' + j + "</a></li>").insertBefore($("li:last", an[i])[0]).bind("click", function(e) {
e.preventDefault(), oSettings._iDisplayStart = (parseInt($("a", this).text(), 10) - 1) * oPaging.iLength, 
fnDraw(oSettings);
});
0 === oPaging.iPage ? $("li:first", an[i]).addClass("disabled") :$("li:first", an[i]).removeClass("disabled"), 
oPaging.iPage === oPaging.iTotalPages - 1 || 0 === oPaging.iTotalPages ? $("li:last", an[i]).addClass("disabled") :$("li:last", an[i]).removeClass("disabled");
}
}
}
}), $.fn.DataTable.TableTools && ($.extend(!0, $.fn.DataTable.TableTools.classes, {
container:"DTTT btn-group",
buttons:{
normal:"btn",
disabled:"disabled"
},
collection:{
container:"DTTT_dropdown dropdown-menu",
buttons:{
normal:"",
disabled:"disabled"
}
},
print:{
info:"DTTT_print_info modal"
},
select:{
row:"active"
}
}), $.extend(!0, $.fn.DataTable.TableTools.DEFAULTS.oTags, {
collection:{
container:"ul",
button:"li",
liner:"a"
}
}));