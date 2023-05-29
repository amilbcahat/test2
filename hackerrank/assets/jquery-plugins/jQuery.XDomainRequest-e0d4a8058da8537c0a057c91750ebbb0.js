!function($) {
if (!$.support.cors && $.ajaxTransport && window.XDomainRequest) {
var httpRegEx = /^https?:\/\//i, getOrPostRegEx = /^get|post$/i, sameSchemeRegEx = new RegExp("^" + location.protocol, "i"), htmlRegEx = /text\/html/i, jsonRegEx = /\/json/i, xmlRegEx = /\/xml/i;
$.ajaxTransport("* text html xml json", function(options, userOptions) {
if (options.crossDomain && options.async && getOrPostRegEx.test(options.type) && httpRegEx.test(options.url) && sameSchemeRegEx.test(options.url)) {
var xdr = null, userType = (userOptions.dataType || "").toLowerCase();
return {
send:function(headers, complete) {
xdr = new XDomainRequest(), /^\d+$/.test(userOptions.timeout) && (xdr.timeout = userOptions.timeout), 
xdr.ontimeout = function() {
complete(500, "timeout");
}, xdr.onload = function() {
var allResponseHeaders = "Content-Length: " + xdr.responseText.length + "\r\nContent-Type: " + xdr.contentType, status = {
code:200,
message:"success"
}, responses = {
text:xdr.responseText
};
try {
if ("html" === userType || htmlRegEx.test(xdr.contentType)) responses.html = xdr.responseText; else if ("json" === userType || "text" !== userType && jsonRegEx.test(xdr.contentType)) try {
responses.json = $.parseJSON(xdr.responseText);
} catch (e) {
status.code = 500, status.message = "parseerror";
} else if ("xml" === userType || "text" !== userType && xmlRegEx.test(xdr.contentType)) {
var doc = new ActiveXObject("Microsoft.XMLDOM");
doc.async = !1;
try {
doc.loadXML(xdr.responseText);
} catch (e) {
doc = void 0;
}
if (!doc || !doc.documentElement || doc.getElementsByTagName("parsererror").length) throw status.code = 500, 
status.message = "parseerror", "Invalid XML: " + xdr.responseText;
responses.xml = doc;
}
} catch (parseMessage) {
throw parseMessage;
} finally {
complete(status.code, status.message, responses, allResponseHeaders);
}
}, xdr.onprogress = function() {}, xdr.onerror = function() {
complete(500, "error", {
text:xdr.responseText
});
};
var postData = "";
userOptions.data && (postData = "string" === $.type(userOptions.data) ? userOptions.data :$.param(userOptions.data)), 
xdr.open(options.type, options.url), xdr.send(postData);
},
abort:function() {
xdr && xdr.abort();
}
};
}
});
}
}(jQuery);