HR.appController.addTemplate("backbone/templates/x/test-report", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar ', "pdf" != tab && (__p += "support-sub-bar"), 
__p += '">\n    ', "pdf" == tab ? __p += '\n    <h3 class="topbar-h3 mjL">' + (null == (__t = test.name) ? "" :_.escape(__t)) + '</h3>\n    <h3 class="topbar-h3"><i class="icon-right-open breadcrumb-chevron"></i>Candidate Report (' + (null == (__t = model.email) ? "" :__t) + ")</h3>\n    " :(__p += '\n    <h3 class="topbar-h3 mjL text-ellipsis display-inline-block pull-left smaller-topbar" style="max-width:215px;">\n        ' + (null == (__t = test.name) ? "" :_.escape(__t)) + '\n    </h3>\n    <h3 class="topbar-h3 smaller-topbar"><i class="icon-right-open breadcrumb-chevron"></i>Candidate Report</h3>\n\n    ', 
HR.currentUser.canViewCandidateDetails() === !0 && (__p += '\n    <a class="btn btn-line pull-right msA js-pdf js-tooltip" data-placement="bottom" data-original-title="Download" style="padding: 8px 10px 10px 14px;"><i class="icon2-download"></i></a>\n    <a class="btn btn-line pull-right msA js-share js-tooltip" data-placement="bottom" data-original-title="Share" style="padding: 8px 10px 10px 14px;"><i class="icon2-sharetest"></i></a>\n    '), 
__p += "\n\n    ", h = window.istreet.cfg.ats, !user.authkey && _.keys(user).length > 0 && (__p += '\n    <div class="dropdown pull-right msA">\n        &nbsp;\n        <a class="btn" data-toggle="dropdown" href="#">\n            <span class="js-dropdowntxt">', 
__p += model.ats_state ? "Status: " + (null == (__t = h[model.ats_state]) ? "" :__t) :" Set candidate status ", 
__p += '</span>\n            <i class="icon-down-open-mini msL"></i>\n        </a>\n        <ul class="dropdown-menu" id="menu1">\n            ', 
_.each(_.keys(h), function(ats) {
__p += '\n                <li><a href="javascript:void(0)" class="js-set-ats" data-attribute-ats="' + (null == (__t = ats) ? "" :__t) + '">', 
__p += model.ats_state != parseInt(ats) ? '<div class="msL" style="display:inline">&nbsp;</div>' :'<img src="/assets/tick.png"><img>', 
__p += " " + (null == (__t = h[ats]) ? "" :__t) + "</a></li>\n             ", -1 != [ "3", "6", "10" ].indexOf(ats) && (__p += '\n                <li class="divider"></li>\n             '), 
__p += "\n            ";
}), __p += "\n        </ul>\n  </div>\n   "), __p += '\n\n    <div class="clear"></div>\n    <div class="sub-top-bar">\n        <ul class="sub-topbar-tabs pull-left mjL">\n            <li ', 
"summary" == tab && (__p += 'class="js-backbone active"'), __p += '><a href="tests/' + (null == (__t = test.id) ? "" :__t) + "/candidates/" + (null == (__t = model.id) ? "" :__t) + '/summary" class="js-report-tab" data-tab="summary">Summary</a></li>\n            <li ', 
"detailed" == tab && (__p += 'class="js-backbone active"'), __p += '><a href="tests/' + (null == (__t = test.id) ? "" :__t) + "/candidates/" + (null == (__t = model.id) ? "" :__t) + '/detailed" class="js-report-tab" data-tab="detailed">Detailed</a></li>\n            <li ', 
"timeline" == tab && (__p += 'class="js-backbone active"'), __p += '><a href="tests/' + (null == (__t = test.id) ? "" :__t) + "/candidates/" + (null == (__t = model.id) ? "" :__t) + '/timeline" class="js-report-tab" data-tab="timeline">Timeline</a></li>\n        </ul>\n\n        ', 
HR.currentUser.canViewCandidateDetails() === !1 ? __p += '\n        <h4 class="pull-right txt-alt-dark-grey mdA mjR">Report of candidate</h4>\n        ' :model.candidate_details && model.candidate_details.full_name ? __p += '\n        <h4 class="pull-right txt-alt-dark-grey mdA mjR">Report of ' + (null == (__t = model.candidate_details.full_name) ? "" :_.escape(__t)) + "</h4>\n        " :model.email && (__p += '\n        <h4 class="pull-right txt-alt-dark-grey mdA mjR">Report of ' + (null == (__t = model.email) ? "" :_.escape(__t)) + "</h4>\n        "), 
__p += "\n    </div><!-- end .sub-top-bar -->\n    "), __p += '\n</div><!-- end .top-fixed-bar -->\n\n<div class="overflow-content adjust-two-fixed-bar" id="report-tab">\n    <div id="report-tab-content-container">\n     <div class="loading-view">\n         <div class=\'gray\'>\n         <div style=\'background: url(https://d3rpyts3de3lx8.cloudfront.net/hackerrank/hackerrank_spinner_32x32.gif); height: 32px; width: 32px; display: inline-block;\'></div>\n      </div>\n     </div>\n    </div>\n</div><!-- end .overflow-content -->\n<div class="modal sharereport-modal" style="width: 600px;">\n    <div class="modal-header" style="height: 13px;">\n        <div class="underline_title set_title pull-left">Share link</div>\n        <button type="button" class="close js-sharelinkclose pull-right" data-dismiss="modal" aria-hidden="true"><span style="font-size: 70%; position: relative; top: -2px;">Close</span> &times;</button>\n    </div>\n    <div class="modal-body plA">\n        <div class="input-btn-group">\n          <input class="wide js-reportlink" id="report-link-inp" type="text" value="" />\n          <a id="copy-share-link-report" class="btn copy-report">Copy</a>\n        </div>\n        <div class="alert info mlT mlB">\n            <p class="mlB">Due to security concerns we are deprecating this feature of using authenticated public URLs to share reports. The above link will only work for a few more days.</p>\n            <p>Once the public URL feature is removed, you will still be able to share the unauthenticated report URL from your browser to a colleague with a HackerRankX account. Or you can download the report as PDF to share with anyone.</p>\n        </div>\n    </div>\n</div>\n<div class="js-pdfwrapper"></div>\n';
return __p;
});