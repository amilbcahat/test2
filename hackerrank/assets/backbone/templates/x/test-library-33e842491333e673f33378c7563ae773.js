HR.appController.addTemplate("backbone/templates/x/test-library", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar support-sub-bar">\n    <h3 class="topbar-h3 mjL">' + (null == (__t = test.name) ? "" :_.escape(__t)) + '</h3>\n    <h3 class="topbar-h3"><i class="icon-right-open breadcrumb-chevron"></i>Questions</h3>\n    <h3 class="topbar-h3"><i class="icon-right-open breadcrumb-chevron"></i>Choose from library</h3>\n    <div class="lib-added-indicator pull-right hidden js-minitest">\n        <strong class="txt-alt-grey-dark"><span class="js-qcount">-</span></strong> questions / <strong class="txt-alt-grey-dark"><span class="js-points">-</span></strong> points &nbsp;<i class="icon-menu-large"></i>\n    </div>\n    <div class="added-questions-container hidden js-minisidebar">\n    </div><!--added-questions-container-->\n    <div class="clear"></div>\n    <div class="sub-top-bar">\n        <ul class="sub-topbar-tabs pull-left mjL">\n            ', 
library_names = {
personal:"My Questions",
shared:"Shared with Me",
hackerrank:"HackerRankX"
}, __p += "\n            ", _.each({
personal:"personal_mine",
shared:"personal_shared",
hackerrank:"hackerrank"
}, function(filter, lib) {
__p += '\n              <li class="', filter == library && (__p += "active"), __p += '" >\n                <a class="js-backbone" href="tests/' + (null == (__t = test.id) ? "" :__t) + "/library/" + (null == (__t = lib) ? "" :__t) + '" data-lib="' + (null == (__t = lib) ? "" :__t) + '" >' + (null == (__t = library_names[lib]) ? "" :__t) + "</a>\n              </li>\n            ";
}), __p += '\n        </ul>\n\n        <div class="btn-group pull-left display-inline-block pdL" style="margin:8px;">\n            ', 
_.each([ "coding", "multiple", "others" ], function(fil) {
__p += '\n                <a href="tests/' + (null == (__t = test.id) ? "" :__t) + "/library/" + (null == (__t = library) ? "" :__t) + "/" + (null == (__t = fil) ? "" :__t) + '" data-filter="' + (null == (__t = fil) ? "" :__t) + '" class="btn js-backbone ', 
fil == filter && (__p += "active"), __p += '">' + (null == (__t = fil[0].toUpperCase() + fil.slice(1)) ? "" :__t) + "</a>\n            ";
}), __p += '\n        </div>\n\n        <a class="js-searchclear hide pull-right" style="cursor:pointer;">clear</a>\n        <div class="input-icon pull-right" style="margin-top: 3px; margin-right: 25px;">\n            <input type="text" placeholder="search questions" class="js-search">\n            <i class="icon-search"></i>\n        </div>\n    </div><!-- end .sub-top-bar -->\n</div><!-- end .top-fixed-bar -->\n<div class="overflow-content adjust-two-fixed-bar" id="control-overflow">\n    <!-- filters section -->\n    <div class="question-filter-wrapper">\n        <input type=\'hidden\' class="hide js-tags pull-left">\n        <span class="pull-right txt-alt-grey js-count"></span>\n        <div class="clear"></div>\n        <!-- this is for question sets\n        <div class="formgroup radio inline">\n            <legend>Show question sets</legend>\n            <label><input type="radio">Yes</label>\n            <label><input type="radio">No</label>\n        </div>-->\n    </div>\n    <div class="row no-margin libcontent">\n        <!-- sets and questions go here-->\n        <p style="margin:8px;"><em>Loading..</em></p>\n    </div>\n    <div class="alert info js-nothingfound hide" style="margin: 10px 30px;">\n        <header>No questions matched these filters.</header>\n        <p>Would you like to create a new question?</p>\n        <p><a class="btn btn-green js-backbone" href="tests/' + (null == (__t = test.id) ? "" :__t) + '/questions/new">Create new question</a></p>\n    </div>\n    <div class="alert info buy-custom-questions" style="margin: 10px 30px 40px">\n        <header>Looking to Buy Custom Questions?</header>\n        <p>Our world champion problem setters will help create the perfect questions for your test.</p>\n        <p><a href="mailto:support@hackerrank.com?subject=Custom questions&amp;body=We are looking for custom questions with the following needs:" target="_blank" class="common_margin inline_block button-green big_button_padding rcorners_mid">Submit question inquiry</a></p>\n    </div>\n</div>\n';
return __p;
});