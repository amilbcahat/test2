HR.appController.addTemplate("backbone/templates/x/test-pdfdownload", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="modal js-pdfdlview modal-mid">\n    <div class="modal-header" style="min-height:20px;">\n        <div class="underline_title set_title pull-left">PDFs Download</div>\n        <button type="button" class="close setmodalclose pull-right" data-dismiss="modal" aria-hidden="true"><small>Close</small> &times;</button>\n    </div>\n    <div class="js-batchview mjA">\n      ', 
_.each(_.keys(batch), function(title) {
__p += '\n        <div class="mdT">\n        <strong class="pull-left">' + (null == (__t = title) ? "" :_.escape(__t)) + '</strong><a class="btn btn-small pull-right js-downloadbtn" data-key="' + (null == (__t = title) ? "" :__t) + '">Download ' + (null == (__t = batch[title].length) ? "" :__t) + ' reports..</a>\n        </div>\n        <div class="clear"></div>\n      ';
}), __p += "\n      ", _.keys(batch).length > 1 && (__p += '\n        <hr><div class="mdT">\n        <strong class="pull-left">All reports</strong><a class="btn btn-small pull-right js-downloadbtn" data-key="_all">Download all reports..</a>\n        </div>\n        <div class="clear"></div>\n      '), 
__p += '\n    </div>\n    <div class="clear"></div>\n    <div class="js-singlebatch mjA hide">\n       <div class="mdT"><strong class="js-dltitle"></strong></div>\n       <div class="clear"></div>\n       <div class="mdT js-pdfprogress"></div>\n    </div>\n</div>\n';
return __p;
});