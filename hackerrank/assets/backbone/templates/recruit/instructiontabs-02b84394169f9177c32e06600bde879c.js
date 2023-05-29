HR.appController.addTemplate("backbone/templates/recruit/instructiontabs", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "\n", __p += public_url ? '\n<div style="" id="wrapper">\n  <center>\n  <h2 class="headline">HackerRankX test-taking information</h2>\n\n  <div class="sub-headline">\n      <span class="ico-questions"></span>\n      <span class="grey">Tips to help you take your best test on the HackerRankX test-taking platform.\n      </span>\n  </div> <!-- .sub-headline -->\n\n\n  </center>\n\n  <div class="white-grid-block main-content">\n' :'\n<div class="container" style="margin-top:63px;padding-left:120px">\n', 
__p += '\n\n    <header class="page-title">\n        <ul class="nav-tabs nav">\n            ', 
baselink = "info", public_url || (__p += '\n            <li id="tabinstruction" ', 
"instructions" == subpage && (__p += 'class="active" '), __p += ' ><a id="tabinstruction" class="js-tablink mRsmall" href="' + (null == (__t = baselink) ? "" :__t) + '/instruction"><i class="icon-bolt"></i> Instructions</a></li>\n            '), 
__p += '\n            <li id="tabui" ', "interface" == subpage && (__p += 'class="active" '), 
__p += ' ><a id="tabui" class="js-tablink mRsmall" href="' + (null == (__t = baselink) ? "" :__t) + '/interface"><i class="icon-bolt"></i> Interface</a></li>\n            <li id="tabenv" ', 
"environment" == subpage && (__p += 'class="active" '), __p += ' ><a id="tabenv" class="js-tablink mRsmall" href="' + (null == (__t = baselink) ? "" :__t) + '/environment"><i class="icon-list-bullet-small"></i> Environment</a></li>\n            <li id="tabfaq" ', 
"faq" == subpage && (__p += 'class="active" '), __p += ' ><a id="tabfaq" class="js-tablink mRsmall" href="' + (null == (__t = baselink) ? "" :__t) + '/faq"><i class="icon-trophy"></i> F.A.Q.</a></li>\n        </ul>\n    </header>\n    ', 
public_url || (__p += '\n    <div class="js-content-tabinstruction js-content ', 
"instructions" != subpage && (__p += "hidden"), __p += '">\n        <span class="green-title">Instructions</span>\n        <div>' + (null == (__t = test.get("instructions")) ? "" :__t) + "</div>\n    </div>\n    "), 
__p += '\n    <div class="js-content-tabui js-content ', "interface" != subpage && (__p += "hidden"), 
__p += '">\n        <span class="green-title">User interface</span>\n        <div>tab1 content</div>\n    </div>\n    <div class="js-content-tabenv js-content ', 
"environment" != subpage && (__p += "hidden"), __p += '">\n        <span class="green-title">Env</span>\n        <div>tab2 content</div>\n    </div>\n    <div class="js-content-tabfaq js-content ', 
"faq" != subpage && (__p += "hidden"), __p += '">\n        <span class="green-title">FAQ</span>\n        <div>tab3 content</div>\n    </div>\n', 
public_url && (__p += "\n  </div>\n"), __p += "\n</div>\n";
return __p;
});