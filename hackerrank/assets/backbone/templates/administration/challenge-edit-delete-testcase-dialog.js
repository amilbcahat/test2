HR.appController.addTemplate("backbone/templates/administration/challenge-edit-delete-testcase-dialog", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div>\n    <br>\n    <p class="m">Are you sure you want to delete this testcase?</p>\n    <p class="m">\n        <b>input' + (null == (__t = (test_case_index / 100).toFixed(2).split(".")[1]) ? "" :__t) + ".txt (" + (null == (__t = _test_case.h_input_size || "N/A") ? "" :__t) + ") |\n        output" + (null == (__t = (test_case_index / 100).toFixed(2).split(".")[1]) ? "" :__t) + ".txt (" + (null == (__t = _test_case.h_output_size || "N/A") ? "" :__t) + ')</b>\n    </p>\n    <p class="m">This operation can\'t be undone.</p>\n    <br>\n    <p class="text-center">\n        <button class="btn btn-large delete-testcase">Delete</button>\n        <span class="nb-spacing">&nbsp;&nbsp;&nbsp;&nbsp;</span>\n        <button class="btn btn-large dont-delete">Cancel</button>\n    </p>\n</div>\n';
return __p;
});