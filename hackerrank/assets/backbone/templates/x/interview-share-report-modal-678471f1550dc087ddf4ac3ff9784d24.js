HR.appController.addTemplate("backbone/templates/x/interview-share-report-modal", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="modal interview-share-report-modal modal-mid" id="interview-share-report-modal">\n    <div class="modal-header" style="height: 13px;">\n        <div class="underline_title set_title pull-left">Share report</div>\n        <button type="button" class="close js-sharelinkclose pull-right" data-dismiss="modal" aria-hidden="true"><span style="font-size: 70%; position: relative; top: -2px;">Close</span> &times;</button>\n    </div>\n    <p class="plA">\n        <div class="input-btn-group msA">\n          <input class="xwide js-reportlink" id="report-link-inp" type="text" value="' + (null == (__t = link) ? "" :__t) + '" />\n          <a id="copy-share-link-report" class="btn copy-report js-copy-url">Copy</a>\n        </div>\n        <div class="alert alert-info mlT mlB">\n            <p>Due to security concerns we are deprecating this feature of using authenticated public URLs to share reports. The above link will only work for a few more days.</p>\n            <br />\n            <p>Once the public URL feature is removed, you will still be able to share the unauthenticated report URL from your browser to a colleague with a HackerRankX account. Or you can download the report as PDF to share with anyone.</p>\n        </div>\n    </p>\n</div>\n';
return __p;
});