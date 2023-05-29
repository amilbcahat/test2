HR.appController.addTemplate("backbone/templates/x/interview-feedback", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "", feedback = model.feedback || feedback || "", __p += '\n<div class="row-fluid">\n    <div class="span11 no-padding">\n        <h4 class="msB">FEEDBACK</h4>\n        <span class="js-show-feedback-section"><pre class="psA" style="word-break:normal;">', 
__p += feedback ? "" + (null == (__t = feedback) ? "" :_.escape(__t)) :"No feedback has been given so far.", 
__p += '</pre></span>\n        <span class="js-edit-feedback-section hidden">\n            <textarea id="" name="feedback" rows="3" class="txt_box fw" placeholder="Type your feedback.">' + (null == (__t = model.feedback || feedback || "") ? "" :_.escape(__t)) + '</textarea>\n        </span>\n    </div>\n    <div class="span5 pull-right">\n        <span class="js-show-feedback-buttons pull-right">\n            <div class="span5 pull-right">\n                ', 
model.interviewers && model.interviewers.length > 0 && (__p += "\n                ", 
interviewer = model.interviewers[0], __p += "\n                ", (interviewer.name || interviewer.email) && (__p += '\n                <h5 class="pull-right txt-alt-dark-grey msB">Interviewed by: ' + (null == (__t = interviewer.name || interviewer.email) ? "" :_.escape(__t)) + "</h5>\n                "), 
__p += "\n                "), __p += '\n            </div>\n            <div class="span5 pull-right">\n                <button class="btn js-edit-feedback pull-right">Edit feedback</button>\n            </div>\n        </span>\n        <span class="js-edit-feedback-buttons hidden">\n            <button style="width:100px;" class="btn js-feedback-cancel">Cancel</button><br/>\n            <button style="width:100px;" class="btn btn-primary mmT js-save-feedback">Save</button>\n        </span>\n    </div>\n</div>\n';
return __p;
});