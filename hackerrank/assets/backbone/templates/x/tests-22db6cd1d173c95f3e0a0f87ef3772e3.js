HR.appController.addTemplate("backbone/templates/x/tests", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="top-fixed-bar" style="text-align:center;">\n    <h3 class="topbar-h3 mjL pull-left" style="min-width:220px; text-align:left;" id="tests-title">All Tests</h3>\n    <a href="javascript:;" id="new-test-popup-link" style="margin: 9px 25px;" class="btn btn-primary pull-right">\n        <i class="icon2-createtest"></i>Create new test</a>\n    <div  style="margin:12px 0px; display:inline-block; ">\n        <div id="search-loading" class="psT" style=" ' + (null == (__t = HR.search.tests.length > 0 ? "display:none" :"") ? "" :__t) + ' ">\n            Loading....\n        </div>\n        <div id="basic-search" style=" ' + (null == (__t = advanced_search_open || 0 == HR.search.tests.length ? "display:none" :"") ? "" :__t) + ' ">\n            <form name="search" class="pull-left">\n                <div class="input-icon">\n                    <input id="test-search-input" name="test-search" type="text" placeholder="Search Test Title" value="' + (null == (__t = search_test_name || "") ? "" :__t) + '" style="margin-top:0px;"/>\n                    <i class="icon-search" style="top:9px;"></i>\n                    <a href="#" class="js-clear-title"><i class="icon2-status_wrong right" style="top:9px;"></i></a>\n                </div>\n            </form>\n            <a href="#" class="showAdvanceSearch pull-left psT psL"><small>&plus; more filters</small></a>\n        </div>\n        <a href="#" class="hideAdvanceSearch pull-left psT" style=" ' + (null == (__t = advanced_search_open ? "" :"display:none") ? "" :__t) + ' "><small>&minus; hide filters</small></a>\n    </div>\n    <div id="new-test-popup" class="new-test-popup hidden" style="text-align:left">\n        <form name="new-test-form" class="no-margin">\n            <div class="mlA">\n                <label>TEST NAME</label>\n                <input id="new-test-name" name="test-name" type="text" class="fw" placeholder="Test Name">\n                <label>TEST DURATION</label>\n                <input id="new-test-duration" data-validation="number" name="test-duration" type="text" placeholder="(min)" style="width:80px;"><span class="mdL" style="position:relative; top:-4px;">minutes</span>\n            </div>\n            <div class="test-popup-footer">\n                <a id="new-test-popup-cancel" class="btn btn-line">Cancel</a>\n                <button type="submit" class="btn btn-primary msL">Create Test</button>\n            </div>\n            <div class="response-message hidden"></div>\n        </form>\n    </div><!-- end new-test-popup -->\n    ', 
collection.length || searchOn || (__p += '\n    <!-- you will need to add .hidden class for hiding when the first test is created -->\n    <img id="create-new-test-pointer" class="create-first-test-pointer" src="/assets/test_placeholder.png"/>\n    '), 
__p += '\n</div>\n<div class="account-locked hidden">\n    <div class="account-locked-wrapper" style="text-align: center">\n        <h4>Your account is currently locked.</h4>\n        <p class="font16 text_center">Please subscribe to any of our plans to continue.</p>\n        <center>\n            <a href="payments/plans" style="position:relative; top:20px;" class="btn btn-primary js-backbone">CHOOSE PLAN</a>\n        </center>\n    </div>\n</div>\n<div class="overflow-content" id="control-overflow">\n    <div id="advanced-search" class="fill-light" style="border-bottom: 1px solid #e0e0e0; ' + (null == (__t = advanced_search_open ? "" :"display:none") ? "" :__t) + ' "></div>\n    <!-- any contents add here -->\n    <ul class="alltests-table" style="margin-bottom:30px;" id="tests-container">\n        <li style="border-bottom:0px;">\n            <div class="pjA">\n                <center><Strong class="0-tests-message">No matching test found</Strong></center>\n            </div>\n        </li>\n    </ul>\n    ', 
pagination && (__p += "\n        " + (null == (__t = pagination.html()) ? "" :__t) + "\n    "), 
__p += '\n    <br/>\n</div><!-- end .overflow-content -->\n\n<div id="responsive-bottom-placeholder" class="responsive-bottom-holder text-center"></div>\n<div class="hre-footer fnt-sz-small">\n  <center class="mmT mmB">\n    <a class="mdR mdL" href="/aboutus" target="_blank">About</a>\n    <a class="mdR" href="privacy" target="_blank">Privacy policy</a>\n    <a class="mdR" href="tos" target="_blank">Terms of service</a>\n    <a class="mdR" href="http://blog.interviewstreet.com/" target="_blank">Blog</a>\n    <a class="mdR" href="contact" target="_blank">Contact us</a>\n    <a class="btn btn-small btn-line " href="http://support.hackerrank.com" target="_blank">Support</a>\n  <center>\n</div>\n';
return __p;
});