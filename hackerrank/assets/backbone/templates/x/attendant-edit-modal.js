HR.appController.addTemplate("backbone/templates/x/attendant-edit-modal", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="modal" id="attendant-edit-modal">\n    <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n        <div class="underline_title">\n            ', 
__p += "interviewer" == role && _.isEmpty(attendant) ? "\n            ADD INTERVIEWER\n            " :"interviewer" == role ? "\n            EDIT INTERVIEWER\n            " :"\n            EDIT CANDIDATE\n            ", 
__p += '\n        </div>\n    </div>\n    <form class="attendant-form" name="edit-attendant-form">\n        <div class="modal-body">\n            <div class="row-fluid">\n                <div class="span12">\n                    <div class="txtbox_holder">\n                        <div class="txtbox_text">Name</div>\n                        <input placeholder="enter ' + (null == (__t = role) ? "" :_.escape(__t)) + ' name" type="text" name="name" class=" txt_box input-large " value="', 
attendant.name && (__p += "" + (null == (__t = attendant.name) ? "" :_.escape(__t))), 
__p += '">\n                    </div>\n                </div>\n            </div>\n            <div class="row-fluid">\n                <div class="span12">\n                    <div class="txtbox_holder">\n                        <div class="txtbox_text">Email</div>\n                        <input placeholder="enter ' + (null == (__t = role) ? "" :_.escape(__t)) + ' email" type="text" name="email" class=" txt_box input-large " ', 
attendant.email && (__p += 'value="' + (null == (__t = attendant.email) ? "" :_.escape(__t)) + '" disabled '), 
__p += '>\n                    </div>\n                </div>\n            </div>\n\n            <div class="row-fluid">\n                <div class="span12">\n                    <div class="txtbox_holder">\n                        <div class="txtbox_text">Phone Number</div>\n                        <input placeholder="enter ' + (null == (__t = role) ? "" :_.escape(__t)) + ' phone" type="text" name="phone" class=" txt_box input-large " value="', 
attendant.phone && (__p += "" + (null == (__t = attendant.phone) ? "" :_.escape(__t))), 
__p += '">\n                    </div>\n                </div>\n            </div><!-- end .row-fluid -->\n\n            <div class="clear_float"></div>\n\n        </div><!-- end .modal-body -->\n        <div class="modal-footer">\n            <a href="javascript:void(0)" class="btn" data-dismiss="modal" aria-hidden="true">Close</a>\n            <button type="submit" class="modal-button btn btn-primary" data-loading-text="Saving...">Save changes</a>\n        </div>\n    </form>\n</div>\n';
return __p;
});