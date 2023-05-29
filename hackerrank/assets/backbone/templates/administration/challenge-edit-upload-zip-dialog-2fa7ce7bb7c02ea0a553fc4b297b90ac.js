HR.appController.addTemplate("backbone/templates/administration/challenge-edit-upload-zip-dialog", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "<div>\n    <br>\n    ", collection.models.length > 0 && (__p += '\n    <div class="warning-dialog">\n        <p class="m">Uploading testcases as Zip will delete all existing testcases and replace them with new testcases.</p>\n        <p class="m">Are you sure you want to delete <b>' + (null == (__t = collection.models.length) ? "" :__t) + '</b> existing testcase?</p>\n        <p class="m">This operation can\'t be undone.</p>\n        <br>\n        <p class="text-center">\n            <button class="btn btn-large continue-delete-and-upload">Continue</button>\n            <span class="nb-spacing">&nbsp;&nbsp;&nbsp;&nbsp;</span>\n            <button class="btn btn-large dont-delete">Cancel</button>\n        </p>\n    </div>\n    '), 
__p += '\n    <div class="upload-zip-form" ', collection.models.length > 0 && (__p += 'style="display: none;"'), 
__p += '>\n        <p class="m"><a href="http://static.hackerrank.com/helloworld_testcases.zip">Download</a> a set of sample testcases for a\n            <a href="https://www.hackerrank.com/helloworldsample/challenges/hello-bob" target="_blank">Hello World challenge</a> to\n            understand the .zip format.</p>\n\n        <p class="m">\n            <input type="file" class="upload-zip">\n        </p>\n\n        <p class="m">\n            <button class="btn btn-large upload-zip-button">Upload</button>\n        </p>\n\n        <br>\n    </div>\n</div>\n';
return __p;
});