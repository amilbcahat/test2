HR.appController.addTemplate("backbone/templates/x/settings-navigation", function(obj) {
{
var __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="hre-sidebar closed" id="hre-sidebar">\n\n    <div class="sidebar-scroller bottom hidden">\n        <i class="icon-down-open-bold"></i>\n        <i class="icon-up-open-bold"></i>\n    </div>\n\n    <!-- This is the expand and collapse icon that will appear when in smaller screens -->\n    <div class="showfor1024 sidebar-toggle" id="sidebar-menu-icon">\n        <i class="icon-menu-large sidebar-menu-icon"></i>\n    </div>\n    <div class="hre-sidebar-inner">\n        <div class="mlA hre-sidebar-innerblock">\n            <p class="sidebar-nav-title"><span class="hidefor1024">SETTINGS</span></p>\n            <ul class="hre-sidebar-list">\n                <li class="', 
active_nav_link && "basic" != active_nav_link || (__p += " active  "), __p += '" >\n                    <a href="settings/basic" class="js-backbone hre-sidebar-link">\n                        <i data-original-title="Basic Info" class="icon-cog js-tooltip" data-placement="right" data-toggle="tooltip"></i>\n                        <span class="hidefor1024 hre-sidebar-label">Basic Info</span>\n                    </a>\n                </li>\n                ', 
model.company.pricing_model && "user" == model.company.pricing_model && (__p += '\n                <li class="', 
"team" == active_nav_link && (__p += " active "), __p += '">\n                    <a href="settings/team" class="js-backbone hre-sidebar-link">\n                        <i data-original-title="Teams Management" class="icon-users js-tooltip" style="top:-1px;" data-placement="right"></i>\n                        <span class="hidefor1024 hre-sidebar-label">Teams Management</span>\n                    </a>\n                </li>\n                '), 
__p += '\n                <li class="', "report" == active_nav_link && (__p += " active "), 
__p += '">\n                    <a href="settings/reports" class="js-backbone hre-sidebar-link">\n                        <i data-original-title="Report Preferences" class="icon2-allreports js-tooltip" data-placement="right"></i>\n                        <span class="hidefor1024 hre-sidebar-label">Report Preferences</span>\n                    </a>\n                </li>\n                <li class="', 
"email" == active_nav_link && (__p += " active "), __p += '">\n                    <a href="settings/email" class="js-backbone hre-sidebar-link">\n                        <i data-original-title="E-mail Notifications" class="icon2-notifications js-tooltip" data-placement="right"></i>\n                        <span class="hidefor1024 hre-sidebar-label">E-mail Notifications</span>\n                    </a>\n                </li>\n                <li class="', 
"password" == active_nav_link && (__p += " active "), __p += '">\n                    <a href="settings/password" class="js-backbone hre-sidebar-link">\n                        <i data-original-title="Change Password" class="icon2-password js-tooltip" data-placement="right"></i>\n                        <span class="hidefor1024 hre-sidebar-label">Change Password</span>\n                    </a>\n                </li>\n            </ul>\n            <div class="clear"></div>\n        </div>\n\n        <span class="dark-divider"></span>\n\n        <div class="mlA">\n            <p class="sidebar-nav-title"><span class="hidefor1024">PAYMENT</span></p>\n            <ul class="hre-sidebar-list">\n                <li class="', 
"pricing" == active_nav_link && (__p += " active "), __p += '">\n                    <a href="payments/plans" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Plans" class="icon2-plans js-tooltip" data-placement="right"></i>\n                    <span class="hidefor1024 hre-sidebar-label">Plans</span>\n                </a>\n                </li>\n                <li class="', 
"cc_details" == active_nav_link && (__p += " active "), __p += '">\n                    <a href="payments/card_details" class="js-backbone hre-sidebar-link">\n                        <i data-original-title="Credit Card Details" class="icon2-creditcarddetails js-tooltip" data-placement="right"></i>\n                        <span class="hidefor1024 hre-sidebar-label">Credit Card Details</span>\n                    </a>\n                </li>\n            </ul>\n            <div class="clear"></div>\n        </div>\n    </div>\n</div>\n';
return __p;
});