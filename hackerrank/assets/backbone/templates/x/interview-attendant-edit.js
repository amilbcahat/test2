HR.appController.addTemplate("backbone/templates/x/interview-attendant-edit", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<input type="text" placeholder="email address" name="email" ', 
attendant.email && (__p += 'value="' + (null == (__t = attendant.email) ? "" :_.escape(__t)) + '"'), 
__p += '>\n<input type="text" class="msL" placeholder="name" name="name" ', attendant.name && (__p += 'value="' + (null == (__t = attendant.name) ? "" :_.escape(__t)) + '"'), 
__p += '>\n<input type="text" class="msL" placeholder="phone number" name="phone_number" ', 
attendant.phone_number && (__p += 'value="' + (null == (__t = attendant.phone_number) ? "" :_.escape(__t)) + '"'), 
__p += ">\n", "interviewer" == role && add && (__p += '\n<a href="#" class="btn msL js-add-interviewer" style="top: -4px; position: relative;"><i class="icon-plus"></i>&nbsp;Add another</a>\n'), 
__p += "\n";
return __p;
});