HR.appController.addTemplate("backbone/templates/x/test-cutoff-score", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="mjA">\n    <label class="label-title-underline">\n        SET CUTOFF SCORE\n    </label>\n    <div class="clear"></div>\n    <p class="txt-alt-grey span10 no-padding">Using this you can set a cutoff score for your test. All candidates with score greater than that will automatically be qualified for interview.</p>\n    <div class="clear"></div>\n    <form name="test-cutoff-score-form">\n        <div class="inline-block mdT">\n            <input type="text" class="no-margin wide" placeholder="Enter Cutoff Score (number)" name="cutoff-score">\n            <button type="submit" data-throbber="show" class="btn btn-primary margin-large right mdL">Set Cutoff</button>\n        </div>\n    </form>\n\n    ', 
model.cutoff_score && (__p += '\n    <div class="clear"></div>\n    <div class="mdT test-custom-link-wrap">\n        <div class="cust_link_bg">\n            Current Cutoff: &nbsp;&nbsp; <span>' + (null == (__t = model.cutoff_score) ? "" :_.escape(__t)) + "</span>\n        </div>\n    </div>\n    "), 
__p += "\n</div>\n";
return __p;
});