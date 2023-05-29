/*
* jQuery File Download Plugin v1.4.2 
*
* http://www.johnculviner.com
*
* Copyright (c) 2013 - John Culviner
*
* Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*
* !!!!NOTE!!!!
* You must also write a cookie in conjunction with using this plugin as mentioned in the orignal post:
* http://johnculviner.com/jquery-file-download-plugin-for-ajax-like-feature-rich-file-downloads/
* !!!!NOTE!!!!
*/
!function($, window) {
var htmlSpecialCharsRegEx = /[<>&\r\n"']/gm, htmlSpecialCharsPlaceHolders = {
"<":"lt;",
">":"gt;",
"&":"amp;",
"\r":"#13;",
"\n":"#10;",
'"':"quot;",
"'":"apos;"
};
$.extend({
fileDownload:function(fileUrl, options) {
function checkFileDownloadComplete() {
if (-1 != document.cookie.indexOf(settings.cookieName + "=" + settings.cookieValue)) return internalCallbacks.onSuccess(fileUrl), 
document.cookie = settings.cookieName + "=; expires=" + new Date(1e3).toUTCString() + "; path=" + settings.cookiePath, 
cleanUp(!1), void 0;
if (downloadWindow || $iframe) try {
var formDoc = downloadWindow ? downloadWindow.document :getiframeDocument($iframe);
if (formDoc && null != formDoc.body && formDoc.body.innerHTML.length) {
var isFailure = !0;
if ($form && $form.length) {
var $contents = $(formDoc.body).contents().first();
$contents.length && $contents[0] === $form[0] && (isFailure = !1);
}
if (isFailure) return internalCallbacks.onFail(formDoc.body.innerHTML, fileUrl), 
cleanUp(!0), void 0;
}
} catch (err) {
return internalCallbacks.onFail("", fileUrl), cleanUp(!0), void 0;
}
return timePassed += settings.checkInterval, null == settings.timeout || timePassed < settings.timeout ? (setTimeout(checkFileDownloadComplete, settings.checkInterval), 
void 0) :(internalCallbacks.onFail("", fileUrl), cleanUp(!0), void 0);
}
function getiframeDocument($iframe) {
var iframeDoc = $iframe[0].contentWindow || $iframe[0].contentDocument;
return iframeDoc.document && (iframeDoc = iframeDoc.document), iframeDoc;
}
function cleanUp(isFailure) {
setTimeout(function() {
downloadWindow && (isAndroid && downloadWindow.close(), isIos && (downloadWindow.focus(), 
isFailure && downloadWindow.close()));
}, 0);
}
function htmlSpecialCharsEntityEncode(str) {
return str.replace(htmlSpecialCharsRegEx, function(match) {
return "&" + htmlSpecialCharsPlaceHolders[match];
});
}
var isIos, isAndroid, isOtherMobileBrowser, settings = $.extend({
preparingMessageHtml:null,
failMessageHtml:null,
androidPostUnsupportedMessageHtml:"Unfortunately your Android browser doesn't support this type of file download. Please try again with a different browser.",
dialogOptions:{
modal:!0
},
prepareCallback:function() {},
successCallback:function() {},
failCallback:function() {},
httpMethod:"GET",
data:null,
checkInterval:100,
cookieName:"fileDownload",
cookieValue:"true",
cookiePath:"/",
popupWindowTitle:"Initiating file download...",
encodeHTMLEntities:!0,
timeout:null
}, options), deferred = new $.Deferred(), userAgent = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase(), timePassed = 0;
/ip(ad|hone|od)/.test(userAgent) ? isIos = !0 :-1 !== userAgent.indexOf("android") ? isAndroid = !0 :isOtherMobileBrowser = /avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|playbook|silk|iemobile|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0, 4));
var httpMethodUpper = settings.httpMethod.toUpperCase();
if (isAndroid && "GET" !== httpMethodUpper) return $().dialog ? $("<div>").html(settings.androidPostUnsupportedMessageHtml).dialog(settings.dialogOptions) :alert(settings.androidPostUnsupportedMessageHtml), 
deferred.reject();
var $preparingDialog = null, internalCallbacks = {
onPrepare:function(url) {
settings.preparingMessageHtml ? $preparingDialog = $("<div>").html(settings.preparingMessageHtml).dialog(settings.dialogOptions) :settings.prepareCallback && settings.prepareCallback(url);
},
onSuccess:function(url) {
$preparingDialog && $preparingDialog.dialog("close"), settings.successCallback(url), 
deferred.resolve(url);
},
onFail:function(responseHtml, url) {
$preparingDialog && $preparingDialog.dialog("close"), settings.failMessageHtml && $("<div>").html(settings.failMessageHtml).dialog(settings.dialogOptions), 
settings.failCallback(responseHtml, url), deferred.reject(responseHtml, url);
}
};
internalCallbacks.onPrepare(fileUrl), null !== settings.data && "string" != typeof settings.data && (settings.data = $.param(settings.data));
var $iframe, downloadWindow, formDoc, $form;
if ("GET" === httpMethodUpper) {
if (null !== settings.data) {
var qsStart = fileUrl.indexOf("?");
-1 !== qsStart ? "&" !== fileUrl.substring(fileUrl.length - 1) && (fileUrl += "&") :fileUrl += "?", 
fileUrl += settings.data;
}
isIos || isAndroid ? (downloadWindow = window.open(fileUrl), downloadWindow.document.title = settings.popupWindowTitle, 
window.focus()) :isOtherMobileBrowser ? window.location(fileUrl) :$iframe = $("<iframe>").hide().prop("src", fileUrl).appendTo("body");
} else {
var formInnerHtml = "";
null !== settings.data && $.each(settings.data.replace(/\+/g, " ").split("&"), function() {
var kvp = this.split("="), key = settings.encodeHTMLEntities ? htmlSpecialCharsEntityEncode(decodeURIComponent(kvp[0])) :decodeURIComponent(kvp[0]);
if (key) {
var value = settings.encodeHTMLEntities ? htmlSpecialCharsEntityEncode(decodeURIComponent(kvp[1])) :decodeURIComponent(kvp[1]);
formInnerHtml += '<input type="hidden" name="' + key + '" value="' + value + '" />';
}
}), isOtherMobileBrowser ? ($form = $("<form>").appendTo("body"), $form.hide().prop("method", settings.httpMethod).prop("action", fileUrl).html(formInnerHtml)) :(isIos ? (downloadWindow = window.open("about:blank"), 
downloadWindow.document.title = settings.popupWindowTitle, formDoc = downloadWindow.document, 
window.focus()) :($iframe = $("<iframe style='display: none' src='about:blank'></iframe>").appendTo("body"), 
formDoc = getiframeDocument($iframe)), formDoc.write("<html><head></head><body><form method='" + settings.httpMethod + "' action='" + fileUrl + "'>" + formInnerHtml + "</form>" + settings.popupWindowTitle + "</body></html>"), 
$form = $(formDoc).find("form")), $form.submit();
}
return setTimeout(checkFileDownloadComplete, settings.checkInterval), deferred.promise();
}
});
}(jQuery, this);