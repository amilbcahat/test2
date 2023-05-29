HR.appController.addTemplate("backbone/templates/x/testcase-edit-modal", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="modal" id="edit-testcase-modal">\n    <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n        <div class="underline_title">ADD TEST CASE</div>\n    </div>\n    <form class="testcase-form" name="edit-testcase-form">\n        <div class="modal-body">\n            <div class="row-fluid">\n                <div class="span4">\n                    <div class="txtbox_holder">\n                        <div class="txtbox_text">Test case name</div>\n                        <input placeholder="enter test case name" type="text" name="name" class=" txt_box input-large " value="', 
__p += model.name ? "" + (null == (__t = model.name) ? "" :_.escape(__t)) :"Testcase " + (null == (__t = index) ? "" :_.escape(__t)), 
__p += '">\n                    </div>\n                </div>\n\n                <div class="span4">\n                    <div class="txtbox_holder">\n                        <div class="txtbox_text">Test case difficulty</div>\n                        <select name="type">\n                            <option value="Easy" ', 
model.type && "Easy" != model.type || (__p += "selected"), __p += '>Easy</option>\n                            <option value="Medium" ', 
"Medium" == model.type && (__p += "selected"), __p += '>Medium</option>\n                            <option value="Hard" ', 
"Hard" == model.type && (__p += "selected"), __p += '>Hard</option>\n                        </select>\n                    </div>\n                </div>\n\n                <div class="span4">\n                    <div class="txtbox_holder">\n                        <div class="txtbox_text">Test case score</div>\n                        <input placeholder="enter test case name" type="text" class=" txt_box input-large " name="score" value="', 
__p += model.score ? "" + (null == (__t = model.score) ? "" :_.escape(__t)) :"10", 
__p += '">\n                    </div>\n                </div>\n            </div><!-- end .row-fluid -->\n\n            <br/>\n            <center>\n            <!-- <ul class="nav nav-pills pill-tabs-hrstyled display-inline-block mdT">\n                <li class="active"><a href="#" data-toggle="tab">Paste test case</a></li>\n                <li><a href="#pane2" data-toggle="tab">Upload test case</a></li>\n            </ul> -->\n            </center>\n\n            <div class="display-inline-block mlT">\n                <div class="span6 input-testcase">\n                    <div class="show-text">\n                    <div class="msB">Input:</div>\n                    <textarea placeholder="paste input" class="input-xlarge input" style="height: 135px; width:97%;" name="input">', 
model.input && (__p += "" + (null == (__t = model.input) ? "" :_.escape(__t))), 
__p += '</textarea>\n                    </div>\n                    <div style="height: 113px; width:93%; display: none" class="testcase-upload-wrapper show-upload">\n                        <center>\n                            Upload Input Test case\n                            <input style="line-height: 0px !important; margin-left: 90px; margin-top: 10px;" type="file" class="input" name="input">\n                            <input class="pretty-checkbox" name="input-trim" id="checkbox-01" value="1" type="checkbox" checked data-label="Remove leading/trailing whitespaces from the testcase" />\n                        </center>\n                    </div>\n                </div>\n                <div class="span6 output-testcase">\n                    <div class="show-text">\n                    <div class="msB">Output:</div>\n                    <textarea placeholder="paste output" class="input-xlarge output" style="height: 135px; width:97%;" name="output">', 
model.output && (__p += "" + (null == (__t = model.output) ? "" :_.escape(__t))), 
__p += '</textarea>\n                    </div>\n                    <div style="height: 113px; width:100%; display: none;" class="testcase-upload-wrapper show-upload">\n                        <center>\n                        Upload Output Test case\n                        <input style="line-height: 0px !important; margin-left: 90px; margin-top: 10px;" type="file" class="output" name="output">\n                        <input class="pretty-checkbox" name="output-trim" id="checkbox-02" value="1" type="checkbox" checked data-label="Remove leading/trailing whitespaces from the testcase" />\n                    </center>\n                    </div>\n                </div>\n            </div>\n\n            <div class="clear_float"></div>\n\n        </div><!-- end .modal-body -->\n        <div class="modal-footer">\n\n\n            <div class="pull-left msA">\n                <input class="hr-sleek-input" type="checkbox" name="sample" value="sample" id="testcase-sample" ', 
model.sample && (__p += "checked "), __p += ' />\n                <label for="testcase-sample">\n                    <span></span>\n                    Mark as sample testcase\n                </label>\n            </div>\n\n            <div class="pull-right">\n                <a href="javascript:void(0)" class="btn" data-dismiss="modal" aria-hidden="true">Close</a>\n                <button type="submit" class="modal-button btn btn-primary" data-loading-text="Saving...">Save changes</a>\n            </div>\n        </div>\n    </form>\n</div>\n';
return __p;
});