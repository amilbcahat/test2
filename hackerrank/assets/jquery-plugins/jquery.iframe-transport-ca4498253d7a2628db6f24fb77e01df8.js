// This [jQuery](http://jquery.com/) plugin implements an `<iframe>`
// [transport](http://api.jquery.com/extending-ajax/#Transports) so that
// `$.ajax()` calls support the uploading of files using standard HTML file
// input fields. This is done by switching the exchange from `XMLHttpRequest`
// to a hidden `iframe` element containing a form that is submitted.
// The [source for the plugin](http://github.com/cmlenz/jquery-iframe-transport)
// is available on [Github](http://github.com/) and dual licensed under the MIT
// or GPL Version 2 licenses.
// ## Usage
// To use this plugin, you simply add an `iframe` option with the value `true`
// to the Ajax settings an `$.ajax()` call, and specify the file fields to
// include in the submssion using the `files` option, which can be a selector,
// jQuery object, or a list of DOM elements containing one or more
// `<input type="file">` elements:
//     $("#myform").submit(function() {
//         $.ajax(this.action, {
//             files: $(":file", this),
//             iframe: true
//         }).complete(function(data) {
//             console.log(data);
//         });
//     });
// The plugin will construct hidden `<iframe>` and `<form>` elements, add the
// file field(s) to that form, submit the form, and process the response.
// If you want to include other form fields in the form submission, include
// them in the `data` option, and set the `processData` option to `false`:
//     $("#myform").submit(function() {
//         $.ajax(this.action, {
//             data: $(":text", this).serializeArray(),
//             files: $(":file", this),
//             iframe: true,
//             processData: false
//         }).complete(function(data) {
//             console.log(data);
//         });
//     });
// ### Response Data Types
// As the transport does not have access to the HTTP headers of the server
// response, it is not as simple to make use of the automatic content type
// detection provided by jQuery as with regular XHR. If you can't set the
// expected response data type (for example because it may vary depending on
// the outcome of processing by the server), you will need to employ a
// workaround on the server side: Send back an HTML document containing just a
// `<textarea>` element with a `data-type` attribute that specifies the MIME
// type, and put the actual payload in the textarea:
//     <textarea data-type="application/json">
//       {"ok": true, "message": "Thanks so much"}
//     </textarea>
// The iframe transport plugin will detect this and pass the value of the
// `data-type` attribute on to jQuery as if it was the "Content-Type" response
// header, thereby enabling the same kind of conversions that jQuery applies
// to regular responses. For the example above you should get a Javascript
// object as the `data` parameter of the `complete` callback, with the
// properties `ok: true` and `message: "Thanks so much"`.
// ### Handling Server Errors
// Another problem with using an `iframe` for file uploads is that it is
// impossible for the javascript code to determine the HTTP status code of the
// servers response. Effectively, all of the calls you make will look like they
// are getting successful responses, and thus invoke the `done()` or
// `complete()` callbacks. You can only determine communicate problems using
// the content of the response payload. For example, consider using a JSON
// response such as the following to indicate a problem with an uploaded file:
//     <textarea data-type="application/json">
//       {"ok": false, "message": "Please only upload reasonably sized files."}
//     </textarea>
// ### Compatibility
// This plugin has primarily been tested on Safari 5 (or later), Firefox 4 (or
// later), and Internet Explorer (all the way back to version 6). While I
// haven't found any issues with it so far, I'm fairly sure it still doesn't
// work around all the quirks in all different browsers. But the code is still
// pretty simple overall, so you should be able to fix it and contribute a
// patch :)
// ## Annotated Source
(function(a,b){"use strict",a.ajaxPrefilter(function(a,b,c){if(a.iframe)return a.originalURL=a.url,"iframe"}),a.ajaxTransport("iframe",function(b,c,d){function k(){i.prop("disabled",!1),e.remove(),f.one("load",function(){f.remove()}),f.attr("src","javascript:false;")}var e=null,f=null,g="iframe-"+a.now(),h=a(b.files).filter(":file:enabled"),i=null,j=null;b.dataTypes.shift(),b.data=c.data;if(h.length)return e=a("<form enctype='multipart/form-data' method='post'></form>").hide().attr({action:b.originalURL,target:g}),typeof b.data=="string"&&b.data.length>0&&a.error("data must not be serialized"),a.each(b.data||{},function(b,c){a.isPlainObject(c)&&(b=c.name,c=c.value),a("<input type='hidden' />").attr({name:b,value:c}).appendTo(e)}),a("<input type='hidden' value='IFrame' name='X-Requested-With' />").appendTo(e),b.dataTypes[0]&&b.accepts[b.dataTypes[0]]?j=b.accepts[b.dataTypes[0]]+(b.dataTypes[0]!=="*"?", */*; q=0.01":""):j=b.accepts["*"],a("<input type='hidden' name='X-HTTP-Accept'>").attr("value",j).appendTo(e),i=h.after(function(b){return a(this).clone().prop("disabled",!0)}).next(),h.appendTo(e),{send:function(b,c){f=a("<iframe src='javascript:false;' name='"+g+"' id='"+g+"' style='display:none'></iframe>"),f.one("load",function(){f.one("load",function(){var a=this.contentWindow?this.contentWindow.document:this.contentDocument?this.contentDocument:this.document,b=a.documentElement?a.documentElement:a.body,d=b.getElementsByTagName("textarea")[0],e=d&&d.getAttribute("data-type")||null,f=d&&d.getAttribute("data-status")||200,g=d&&d.getAttribute("data-statusText")||"OK",h={html:b.innerHTML,text:e?d.value:b?b.textContent||b.innerText:null};k(),c(f,g,h,e?"Content-Type: "+e:null)}),e[0].submit()}),a("body").append(e,f)},abort:function(){f!==null&&(f.unbind("load").attr("src","javascript:false;"),k())}}})})(jQuery)