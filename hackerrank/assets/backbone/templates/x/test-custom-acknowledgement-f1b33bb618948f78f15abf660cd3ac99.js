HR.appController.addTemplate("backbone/templates/x/test-custom-acknowledgement", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="mjA">\n    <form name="test-ack-form">\n        <label class="label-title-underline">\n            SET CUSTOM CANDIDATE DECLARATION TEXT\n        </label>\n        <div class="clear"></div>\n        <p class="txt-alt-grey span10 no-padding">When enabled, this declaration will appear on the test login page along with a checkbox. Candidates will not be able to commence this test unless they check the box, expressing assent.</p>\n        <br/>\n\n        <div class="clear"></div>\n        <div class="span9 no-padding">\n            <label class="pull-left mlR">Do you want to enable candidate declaration? </label>\n            <div class="switch pull-left">\n                <input type="checkbox" name="enable-acknowledgement" id="ack_switch" ', 
"False" !== model.enable_acknowledgement && (__p += "checked"), __p += ' />\n            </div>\n        </div>\n        <div class="clear"></div>\n        <div class="clearfix inline-block mdT js-ack-text" ', 
"False" === model.enable_acknowledgement && (__p += ' style="display:none;"\n        '), 
__p += '>\n            <textarea class="span-md-8" rows="4" placeholder="Enter Acknowledgement Text" name="test-acknowledgement">', 
__p += model.custom_acknowledge_text ? "" + (null == (__t = model.custom_acknowledge_text) ? "" :_.escape(__t)) :"I will not consult/copy code from any source including a website, book, or friend/colleague to complete these tests, though may reference language documentation or use an IDE that has code completion features.", 
__p += '</textarea>\n        </div>\n\n        <div class="validation-error hidden">\n            <div class="clear"></div>\n            <div class="error"></div>\n        </div>\n        <div class="span-md-8 no-padding">\n            <button type="submit" data-throbber="show" class="btn btn-primary mdB pull-left">Save</button>\n        </div>\n    </form>\n</div>\n';
return __p;
});