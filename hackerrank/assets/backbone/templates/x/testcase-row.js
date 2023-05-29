HR.appController.addTemplate("backbone/templates/x/testcase-row", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<td width="30%" class="fnt-wt-600">\n    <span class="txt-alt-grey mdR"> <input class="js-select-tc" value="' + (null == (__t = testcase.id) ? "" :_.escape(__t)) + '" type="checkbox"/> </span>\n    <span class="display-inline-block">' + (null == (__t = testcase.name) ? "" :_.escape(__t)), 
testcase.sample && (__p += '&nbsp;<i class="icon-right-open-mini"></i><span class="green">Sample</span>'), 
__p += '</span>\n</td>\n<td width="10%">' + (null == (__t = testcase.type) ? "" :_.escape(__t)) + '</td>\n<td width="10%">' + (null == (__t = testcase.score) ? "" :_.escape(__t)) + '</td>\n<td width="12%">' + (null == (__t = testcase.input_size) ? "" :_.escape(__t)) + '</td>\n<td width="13%">' + (null == (__t = testcase.output_size) ? "" :_.escape(__t)) + '</td>\n<td class="js-testcase-row-operation" width="25%">\n    <a href="#" class="inline-block mdA js-edit-testcase" data-tcid="' + (null == (__t = index) ? "" :_.escape(__t)) + '"><i class="txt-alt-grey icon2-edit"></i></a>\n    <a href="#" class="inline-block mdA js-download-testcase"><i class="txt-alt-grey icon2-download"></i></a>\n    <a href="#" class="inline-block mdA js-remove-testcase"><i class="txt-alt-grey icon2-delete"></i></a>\n</td>\n';
return __p;
});