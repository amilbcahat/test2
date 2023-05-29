HR.appController.addTemplate("backbone/templates/x-admin/admin-navigation", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="hre-sidebar ' + (null == (__t = sideBarClass) ? "" :__t) + ' admin-sidebar" id="hre-sidebar">\n    <div class="sidebar-scroller bottom hidden">\n        <i class="icon-down-open-bold"></i>\n        <i class="icon-up-open-bold"></i>\n    </div>\n\n    <!-- This is the expand and collapse icon that will appear when in smaller screens -->\n    <div class="sidebar-toggle-admin" id="sidebar-menu-icon">\n        <i class="icon-menu-large sidebar-menu-icon"></i>\n    </div>\n\n    <div class="hre-sidebar-inner full-height">\n        <div class="mlA hre-sidebar-innerblock">\n            <p class="sidebar-nav-title"><span class="hre-sidebar-label">Important Stuff</span></p>\n            <ul class="hre-sidebar-list">\n                <li ', 
"switch_user" == active_nav_link && (__p += 'class="active"'), __p += '>\n                <a href="admin/su" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Switch User" class="icon-users js-tooltip" data-placement="right"></i>\n                    <span class="hre-sidebar-label">Switch User</span>\n                </a>\n                </li>\n                <li ', 
"attempts_dashboard" == active_nav_link && (__p += 'class="active"'), __p += '>\n                    <a href="admin/attempts" class="js-backbone hre-sidebar-link">\n                        <i data-original-title="Attempts Dashboard" class="icon-users js-tooltip" data-placement="right"></i>\n                        <span class="hre-sidebar-label">Attempts Dashboard</span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n\n        <span class="dark-divider"></span>\n\n        <div class="mlA hre-sidebar-innerblock">\n            <p class="sidebar-nav-title"><span class="hre-sidebar-label">Companies</span></p>\n            <ul class="hre-sidebar-list">\n                <li ', 
"extend_trial" == active_nav_link && (__p += ' class="active" '), __p += '>\n                <a href="admin/company/extend_trial" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Extend Trial" class="icon-back-in-time js-tooltip" data-placement="right"></i>\n                    <span class="hre-sidebar-label">Extend Trial</span>\n                </a>\n                </li>\n            </ul>\n            <ul class="hre-sidebar-list">\n                <li ', 
"add_invites" == active_nav_link && (__p += ' class="active" '), __p += '>\n                <a href="admin/company/add_invites" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Add Invites" class="icon-plus js-tooltip" data-placement="right"></i>\n                    <span class="hre-sidebar-label">Add Invites</span>\n                </a>\n                </li>\n            </ul>\n        </div>\n\n        <span class="dark-divider"></span>\n\n        <div class="mlA hre-sidebar-innerblock">\n            <p class="sidebar-nav-title"><span class="hre-sidebar-label">Users</span></p>\n            <ul class="hre-sidebar-list">\n                <li\n                ', 
"user_change_email" == active_nav_link && (__p += 'class="active"'), __p += '>\n                <a href="admin/user/change_email" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Change Email Address" class="icon-user js-tooltip"\n                       data-placement="right"></i>\n                    <span class="hre-sidebar-label">Change Email Address</span>\n                </a>\n                </li>\n            </ul>\n        </div>\n\n        <span class="dark-divider"></span>\n\n        <div class="mlA hre-sidebar-innerblock">\n            <p class="sidebar-nav-title"><span class="hre-sidebar-label">Tests</span></p>\n            <ul class="hre-sidebar-list">\n                <li ', 
"change_test_owner" == active_nav_link && (__p += 'class="active"'), __p += '>\n                <a href="admin/test/change_owner" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Change Owner" class="icon-user js-tooltip" data-placement="right"></i>\n                    <span class="hre-sidebar-label">Change Owner</span>\n                </a>\n                </li>\n\n                <li ', 
"duplicate_test" == active_nav_link && (__p += 'class="active"'), __p += '>\n                <a href="admin/test/duplicate" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Duplicate" class="icon-docs js-tooltip" data-placement="right"></i>\n                    <span class="hre-sidebar-label">Duplicate</span>\n                </a>\n                </li>\n\n                <li ', 
"add_sections" == active_nav_link && (__p += 'class="active"'), __p += '>\n                <a href="admin/test/add_sections" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Add Sections" class="icon-list-add js-tooltip" style="top:1px;" data-placement="right"></i>\n                    <span class="hre-sidebar-label">Add Sections</span>\n                </a>\n                </li>\n\n                <li ', 
"invite_candidates" == active_nav_link && (__p += 'class="active"'), __p += '>\n                <a href="admin/test/invite_candidates" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Invite Candidates" class="icon2-invitecandidates" style="top:1px;" data-placement="right"></i>\n                    <span class="hre-sidebar-label">Invite Candidates</span>\n                </a>\n                </li>\n            </ul>\n        </div><!-- end .mlA -->\n\n        <span class="dark-divider"></span>\n\n        <div class="mlA hre-sidebar-innerblock">\n            <p class="sidebar-nav-title"><span class="hre-sidebar-label">Questions</span></p>\n            <ul class="hre-sidebar-list">\n                <li ', 
"change_question_owner" == active_nav_link && (__p += 'class="active"'), __p += '>\n                <a href="admin/question/change_owner" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Change Owner" class="icon-user js-tooltip" data-placement="right"></i>\n                    <span class="hre-sidebar-label">Change Owner</span>\n                </a>\n                </li>\n                <li ', 
"duplicate_question" == active_nav_link && (__p += 'class="active"'), __p += '>\n                <a href="admin/question/duplicate" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Duplicate" class="icon-docs js-tooltip" data-placement="right"></i>\n                    <span class="hre-sidebar-label">Duplicate</span>\n                </a>\n                <li ', 
"duplicate_q_from_hr" == active_nav_link && (__p += ' class="active" '), __p += '>\n                <a href="admin/question/duplicate_from_hr" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Duplicate From HR" class="icon-docs js-tooltip" data-placement="right"></i>\n                    <span class="hre-sidebar-label">Duplicate From HR</span>\n                </a>\n            </ul>\n        </div><!-- end .mlA -->\n\n        <span class="dark-divider"></span>\n\n        <div class="mlA hre-sidebar-innerblock">\n            <p class="sidebar-nav-title"><span class="hre-sidebar-label">Reports</span></p>\n            <ul class="hre-sidebar-list">\n                <li ', 
"invite_reports" == active_nav_link && (__p += 'class="active"'), __p += '>\n                <a href="admin/reports/invites" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Invites" class="icon2-testlist_reports js-tooltip" data-placement="right"></i>\n                    <span class="hre-sidebar-label">Invites</span>\n                </a>\n                </li>\n                <li ', 
"attempt_reports" == active_nav_link && (__p += 'class="active"'), __p += '>\n                <a href="admin/reports/attempts" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Attempts" class="icon2-testlist_reports js-tooltip" data-placement="right"></i>\n                    <span class="hre-sidebar-label">Attempts</span>\n                </a>\n                </li>\n                <li ', 
"periodic_reports" == active_nav_link && (__p += 'class="active"'), __p += '>\n                <a href="admin/reports/periodic" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Periodic" class="icon2-testlist_reports js-tooltip" data-placement="right"></i>\n                    <span class="hre-sidebar-label">Periodic</span>\n                </a>\n                </li>\n            </ul>\n        </div><!-- end .mlA -->\n    </div>\n</div>\n';
return __p;
});