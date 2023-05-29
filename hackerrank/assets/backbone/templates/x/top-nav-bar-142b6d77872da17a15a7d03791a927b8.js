HR.appController.addTemplate("backbone/templates/x/top-nav-bar", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<span class="nav-logo">\n                <a href="tests" class="HackerRankLogo backbone page_header-logo none js-nav-link">\n                    <!--?xml version=\'1.0\' encoding=\'utf-8\'?-->\n                    <!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n                    <svg width="156" height="45" ><image xlink:href="/assets/brand/HRX_IS_logo_wordmark.svg" src="/assets/brand/HRX_IS_logo_wordmark.png" width="156" height="45" ></image ></svg>\n                </a>\n            </span><!-- end .nav-logo -->\n', 
!model.authkey && model.company && (__p += '\n<span class="nav-login-patch">\n\n                <div class="admin-dropdown page_header_dropdown-toggle pull-right" id="profile-menu">\n                    <a class="backbone dropdown-toggle page_header-userbtn" href="" data-toggle="dropdown">\n                        <div class="hre-username pull-left">\n                            ', 
__p += model.firstname ? "\n                                " + (null == (__t = _.escape(model.firstname)) ? "" :__t) + "\n                            " :"\n                                " + (null == (__t = _.escape(model.email)) ? "" :__t) + "\n                            ", 
__p += '\n                        </div>\n                        <i class="icon-down-open-mini"></i>\n\n                        <div class="clear"></div>\n                    </a>\n                    <ul class="unstyled dropdown-menu page_header_dropdown">\n                        <li class="navigation_hackos">\n                            <span class="navigation_hackos-heading">Invites Left:</span>\n                            <span class="navigation_hackos-count">\n                                ' + (null == (__t = _model.invites_count()) ? "" :__t) + '\n                            </span>\n                        </li>\n                        <li><a href="settings" class="js-nav-link">Settings</a></li>\n                        <li><a href="payments" class="js-nav-link">Payment</a></li>\n                        <li><a href="/xrest/users/logout" class="logout-button">Logout</a></li>\n                    </ul>\n                </div>\n\n            </span>\n\n\n<input type="text" id="candidate-search-box-gl" class="nav-input pull-right" placeholder="Search Candidates" ', 
term && (__p += ' value="' + (null == (__t = term) ? "" :__t) + '" '), __p += '/>\n\n<ul class="selector-nav-tabs hre-margin">\n    <li class="js-tests-section js-nav-sections"><a href="tests" id="navigate-to-tests" class="js-nav-link">TESTS</a></li>\n    ', 
model.company && model.company.codepair && 1 == model.company.codepair && (__p += '\n    <li class="js-codepair-section js-nav-sections"><a href="interviews" id="navigate-to-interviews" class="js-nav-link">CODEPAIR</a></li>\n    '), 
__p += '\n    <li class="js-library-section js-nav-sections"><a href="library" id="navigate-to-library" class="js-nav-link">LIBRARY</a></li>\n\n    ', 
trial_expires_in = model.company.trial_expires_in, __p += "\n    ", trial_expires_in && 31 >= trial_expires_in && (__p += "\n        ", 
14 >= trial_expires_in ? (__p += "\n            ", width = parseInt(trial_expires_in / 14 * 100, 10) + "%", 
__p += "\n        ") :(__p += "\n            ", width = parseInt(trial_expires_in / 31 * 100, 10) + "%", 
__p += "\n        "), __p += '\n    <div class="pull-left mlL">\n        <div class="mlT txt-white fnt-sz-mid">\n            <div class="dark-theme-progress small">\n                <div class="base">\n                    <div class="cover progress-done" style="width: ' + (null == (__t = width) ? "" :__t) + '"></div>\n                </div>\n            </div>\n            <span class="msL" style="position:relative; top:-2px"><a href="payments" class="txt-white white-underline js-nav-link">' + (null == (__t = trial_expires_in) ? "" :__t) + " days left</a></span>\n        </div>\n    </div>\n    "), 
__p += "\n</ul>\n"), __p += "\n";
return __p;
});