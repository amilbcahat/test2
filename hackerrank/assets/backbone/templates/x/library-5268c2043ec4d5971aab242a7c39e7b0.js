HR.appController.addTemplate("backbone/templates/x/library", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar">\n    <ul class="sub-topbar-tabs pull-left mjL mmT">\n    ', 
access_type = "mine" == access ? "my" :access, __p += '\n        <li class="active" style="text-transform:capitalize;">\n            <a class="js-backbone" href="library/' + (null == (__t = library) ? "" :__t) + '" data-lib="' + (null == (__t = library) ? "" :__t) + '" > ', 
__p += access ? "" + (null == (__t = access_type) ? "" :__t) :"All", __p += ' Questions</a>\n        </li>\n    </ul>\n    <div class="btn-group pull-left display-inline-block pdL" style="margin:8px;">\n        ', 
_.each([ "coding", "multiple", "others" ], function(fil) {
__p += '\n            <a href="library/' + (null == (__t = library) ? "" :__t), 
access && (__p += "/" + (null == (__t = access) ? "" :__t)), __p += "/" + (null == (__t = fil) ? "" :__t) + '" data-filter="' + (null == (__t = fil) ? "" :__t) + '" class="btn js-backbone ', 
fil == filter && (__p += "active"), __p += '">' + (null == (__t = fil[0].toUpperCase() + fil.slice(1)) ? "" :__t) + "</a>\n        ";
}), __p += '\n    </div>\n\n    <a class="js-searchclear hide pull-right msR plT plB" style="cursor:pointer;">clear</a>\n    <div class="input-icon pull-right" style="margin-top: 3px; margin-right: 25px;">\n        <input type="text" placeholder="search questions" class="js-search">\n        <i class="icon-search"></i>\n    </div>\n</div><!-- end .top-fixed-bar -->\n<div class="overflow-content" id="control-overflow">\n    <!-- filters section -->\n    <div class="question-filter-wrapper">\n        <input type=\'hidden\' class="hide js-tags pull-left">\n        <span class="pull-right txt-alt-grey js-count"></span>\n        <div class="clear"></div>\n        <!-- this is for question sets\n        <div class="formgroup radio inline">\n            <legend>Show question sets</legend>\n            <label><input type="radio">Yes</label>\n            <label><input type="radio">No</label>\n        </div>-->\n    </div>\n    <div class="row no-margin libcontent">\n        <!-- sets and questions go here-->\n        <p style="margin:8px;"><em>Loading..</em></p>\n    </div>\n    <div class="alert info js-nothingfound hide" style="margin: 10px 30px;">\n        <header>No questions matched these filters.</header>\n        <!-- <p>Would you like to create a new question?</p>\n        <p><a class="btn btn-green js-backbone js-create-question" href="#">Create new question</a></p> -->\n    </div>\n    <div class="alert info buy-custom-questions" style="margin: 10px 30px 40px">\n        <header>Looking to Buy Custom Questions?</header>\n        <p>Our world champion problem setters will help create the perfect questions for your library.</p>\n        <p><a href="mailto:support@hackerrank.com?subject=Custom questions&amp;body=We are looking for custom questions with the following needs:" target="_blank" class="common_margin inline_block button-green big_button_padding rcorners_mid">Submit question inquiry</a></p>\n    </div>\n</div>\n';
return __p;
});