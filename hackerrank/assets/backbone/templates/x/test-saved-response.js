HR.appController.addTemplate("backbone/templates/x/test-saved-response", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<select name="saved_messages" id="saved-messages">\n    <option data-action="none">Select Action</option>\n    <optgroup label="Insert a Saved Response">\n        ', 
user.saved_messages && (__p += "\n        ", _.each(user.saved_messages, function(message, key) {
__p += '\n        <option data-action="insert" value = "' + (null == (__t = message) ? "" :__t) + '">' + (null == (__t = key) ? "" :__t) + "</option>\n        ";
}), __p += "\n        "), __p += '\n    </optgroup>\n    <optgroup label="Create a Saved Response" id="save">\n        <option data-action="create" value="save-message">Save Message</option>\n    </optgroup>\n    <optgroup label="Update a Saved Response">\n        ', 
user.saved_messages && (__p += "\n        ", _.each(user.saved_messages, function(message, key) {
__p += '\n        <option data-action="update" value = "' + (null == (__t = message) ? "" :__t) + '">' + (null == (__t = key) ? "" :__t) + "</option>\n        ";
}), __p += "\n        "), __p += '\n    </optgroup>\n    <optgroup label="Delete a Saved Response">\n        ', 
user.saved_messages && (__p += "\n        ", _.each(user.saved_messages, function(message, key) {
__p += '\n        <option data-action="delete" value = "' + (null == (__t = message) ? "" :__t) + '">' + (null == (__t = key) ? "" :__t) + "</option>\n        ";
}), __p += "\n        "), __p += '\n    </optgroup>\n</select>\n\n<div id="test-saved-respose-modal-container"></div>\n';
return __p;
});