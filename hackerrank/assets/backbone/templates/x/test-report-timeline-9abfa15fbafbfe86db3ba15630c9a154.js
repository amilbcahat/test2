HR.appController.addTemplate("backbone/templates/x/test-report-timeline", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="row no-margin pjA">\n <p class="font12"><span class="font-clr-ltgrey font-w-600">&nbsp;&nbsp;TEST STARTED AT:</span><span class="font-w-500">&nbsp;' + (null == (__t = moment(model.starttime).format("D MMM, YYYY - HH:mm Z")) ? "" :__t) + '</span></p>\n <p class="font12"><span class="font-clr-ltgrey font-w-600">&nbsp;&nbsp;TIME TAKEN:</span><span class="font-w-500">&nbsp;' + (null == (__t = total_time_taken) ? "" :__t) + "</span></span></p>\n ", 
hasDisconnect && (__p += '\n <p class="font12"><span class="font-red font-w-600">&nbsp;&nbsp;OFFLINE FOR:</span><span class="font-red font-w-500">&nbsp;' + (null == (__t = offlineTime) ? "" :__t) + "</span></span></p>\n "), 
__p += "\n ", tllen > 1 ? (__p += '\n <p class="font12"><span class="font-clr-ltgrey font-w-600">&nbsp;&nbsp;TEST ATTEMPT TIMELINE:</span></p>\n <iframe id="tl-frame" src="/x/timeline.html" frameBorder="0" scrolling="no" style="min-width:720px;"></iframe>\n <ul class="tnc hide">\n   <li>This chart is an estimate of the timeline, based on our logged events.</li>\n   <li>Only attempted/viewed questions are listed.</li>\n   <li class="old-tl hide">This report was created before our connection tracking facility was enabled.</li>\n   <li class="new-tl hide">The <strong>Offline</strong> bar is only indicative. It marks regions where there was no activity between the candidate\'s computer and our servers. <em>The "time taken" also includes possible disconnections.</em></li>\n </ul>\n <br>\n <button class="showEvents button-white big_button_padding common_margin_bottom">+ Show complete event list</button>\n <div class="mdA js-full-details hide">\n    <div class="table-wrap">\n    <header class="row">\n    <div class="span6">Time</div>\n    <div class="span6">Event</div>\n    </header>\n    <div class="table-body">\n    ', 
_.each(timeline, function(e) {
__p += '\n      <div class="row">\n        <div class="span6">' + (null == (__t = new Date(1e3 * e.inserttime)) ? "" :__t) + '</div>\n        <div class="span6"> ' + (null == (__t = e.message) ? "" :__t) + "</div>\n      </div>\n    ";
}), __p += "\n    </div>\n    </div>\n </div>\n") :__p += '\n  <p class="font12"><span class="font-clr-ltgrey font-w-600">&nbsp;&nbsp;NO EVENTS CAPTURED IN THIS ATTEMPT.</span></p>\n', 
__p += "\n</div>\n";
return __p;
});