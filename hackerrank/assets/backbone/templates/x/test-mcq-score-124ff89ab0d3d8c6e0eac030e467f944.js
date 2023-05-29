HR.appController.addTemplate("backbone/templates/x/test-mcq-score", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="mjA">\n    <label class="label-title-underline">\n        SET SCORE FOR MULTIPLE CHOICE QUESTIONS\n    </label>\n    <div class="clear"></div>\n    <p class="txt-alt-grey span10 no-padding">For wrong answer, enter a negative number to reduce marking. Ex: -1</p>\n    <div class="clear"></div>\n    <form name="test-mcq-score-form">\n        <div class="inline-block mdT">\n            <div class="span4">\n                <label class="fnt-sz-small">CORRECT ANSWER SCORE</label>\n                <input type="text" class="no-margin span1" name="correct-answer-score" value="', 
__p += model.mcq_score ? "" + (null == (__t = model.mcq_score) ? "" :_.escape(__t)) :"5", 
__p += '">\n            </div>\n            <div class="span4">\n                <label class="fnt-sz-small">WRONG ANSWER SCORE</label>\n                <input type="text" class="no-margin span1" name="wrong-answer-score" value="', 
__p += model.mcq_negative_score ? "" + (null == (__t = model.mcq_negative_score) ? "" :_.escape(__t)) :"0", 
__p += '">\n            </div>\n            <div class="span4"><button type="submit" data-throbber="show" style="margin-top:35px;" ', 
__p += model.permission < 2 ? 'class="btn btn-primary margin-large right mdL js-tooltip disabled" title="You don\'t have permission to edit this test"' :'class="btn btn-primary margin-large right mdL"', 
__p += '>Change Score</button></div>\n            <div class="clear"></div>\n        </div>\n    </form>\n</div>\n';
return __p;
});