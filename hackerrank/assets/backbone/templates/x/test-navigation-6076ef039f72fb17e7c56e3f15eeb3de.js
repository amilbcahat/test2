HR.appController.addTemplate("backbone/templates/x/test-navigation", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += '<div class="hre-sidebar closed" id="hre-sidebar">\n    <div class="sidebar-scroller bottom hidden">\n        <i class="icon-down-open-bold"></i>\n        <i class="icon-up-open-bold"></i>\n    </div>\n\n    <!-- This is the expand and collapse icon that will appear when in smaller screens -->\n    <div class="sidebar-toggle" id="sidebar-menu-icon">\n        <i class="icon-menu-large sidebar-menu-icon"></i>\n    </div>\n\n    <div class="hre-sidebar-inner">\n        <div class="mlA hre-sidebar-innerblock">\n            <p class="sidebar-nav-title"><span class="hre-sidebar-label">EDIT TEST</span></p>\n            <ul class="hre-sidebar-list">\n                <li ', 
active_nav_link && "questions" != active_nav_link || (__p += 'class="active"'), 
__p += '>\n                    <a href="tests/' + (null == (__t = model.id) ? "" :_.escape(__t)) + '/questions" class="js-backbone hre-sidebar-link ', 
model.permission < 1 && (__p += " disabled "), __p += '">\n                    <i data-original-title="Questions" class="icon2-questions js-tooltip" data-placement="right"></i>\n                        <span class="hre-sidebar-label">Questions</span>\n                    </a>\n                </li>\n                <li ', 
"general-settings" == active_nav_link && (__p += 'class="active"'), __p += '>\n                    <a href="tests/' + (null == (__t = model.id) ? "" :_.escape(__t)) + '/general-settings" class="js-backbone hre-sidebar-link ', 
model.permission < 1 && (__p += " disabled "), __p += '">\n                        <i data-original-title="General Settings" class="icon2-generalsettings js-tooltip" data-placement="right"></i>\n                        <span class="hre-sidebar-label">General Settings</span>\n                    </a>\n                </li>\n                <li ', 
"share" == active_nav_link && (__p += 'class="active"'), __p += '>\n                    <a href="tests/' + (null == (__t = model.id) ? "" :_.escape(__t)) + '/share" class="js-backbone hre-sidebar-link ', 
model.permission < 1 && (__p += " disabled "), __p += '">\n                        <i data-original-title="Share Test With Team" class="icon2-sharetest js-tooltip" data-placement="right"></i>\n                        <span class="hre-sidebar-label">Share Test</span>\n                    </a>\n                </li>\n                <li ', 
"candidate-settings" == active_nav_link && (__p += 'class="active"'), __p += '>\n                    <a href="tests/' + (null == (__t = model.id) ? "" :_.escape(__t)) + '/candidate-settings" class="js-backbone hre-sidebar-link ', 
model.permission < 1 && (__p += " disabled "), __p += '">\n                        <i data-original-title="Candidate Settings" class="icon-user js-tooltip" data-placement="right" style="top:1px;"></i>\n                        <span class="hre-sidebar-label">Candidate Settings</span>\n                    </a>\n                </li>\n                <li ', 
"advanced-settings" == active_nav_link && (__p += 'class="active"'), __p += '>\n                    <a href="tests/' + (null == (__t = model.id) ? "" :_.escape(__t)) + '/advanced-settings" class="js-backbone hre-sidebar-link ', 
model.permission < 1 && (__p += " disabled "), __p += '">\n                        <i data-original-title="Advanced Settings" class="icon-cog js-tooltip" data-placement="right" style="top:1px;"></i>\n                        <span class="hre-sidebar-label">Advanced Settings</span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n\n        <span class="dark-divider"></span>\n\n        <div class="mlA hre-sidebar-innerblock">\n            <p class="sidebar-nav-title"><span class="hre-sidebar-label">REPORTS</span></p>\n            <ul class="hre-sidebar-list">\n                <li ', 
"invited" == active_nav_link && (__p += 'class="active"'), __p += '>\n                    <a href="tests/' + (null == (__t = model.id) ? "" :_.escape(__t)) + '/candidates/invited" class="js-backbone hre-sidebar-link">\n                        <i data-original-title="Invited" class="icon-dot-circled js-tooltip" data-placement="right"></i>\n                        <span class="hre-sidebar-label">Invited <span class="fnt-wt-600 indicator">' + (null == (__t = model.invited) ? "" :__t) + "</span></span>\n                    </a>\n                </li>\n                <li ", 
"all" == active_nav_link && (__p += 'class="active"'), __p += '>\n                    <a href="tests/' + (null == (__t = model.id) ? "" :_.escape(__t)) + '/candidates/all" class="js-backbone hre-sidebar-link">\n                        <i data-original-title="All Reports" class="icon2-allreports js-tooltip" data-placement="right"></i>\n                        <span class="hre-sidebar-label">All Attempts</span>\n                    </a>\n                </li>\n                <li ', 
"in-progress" == active_nav_link && (__p += 'class="active"'), __p += '>\n                    <a href="tests/' + (null == (__t = model.id) ? "" :_.escape(__t)) + '/candidates/in-progress" class="js-backbone hre-sidebar-link">\n                        <i data-original-title="In Progress" class="icon-adjust js-tooltip" style="top:1px;" data-placement="right"></i>\n                        <span class="hre-sidebar-label">In Progress <span class="fnt-wt-600 indicator">' + (null == (__t = model.inprogress) ? "" :__t) + "</span></span>\n                    </a>\n                </li>\n                <li ", 
"completed" == active_nav_link && (__p += 'class="active"'), __p += '>\n                    <a href="tests/' + (null == (__t = model.id) ? "" :_.escape(__t)) + '/candidates/completed" class="js-backbone hre-sidebar-link">\n                        <i data-original-title="Completed" class="icon-circle js-tooltip" style="top:1px;" data-placement="right"></i>\n                        <span class="hre-sidebar-label">Completed <span class="fnt-wt-600 indicator">' + (null == (__t = model.completed) ? "" :__t) + "</span></span>\n                    </a>\n                </li>\n                <li ", 
"completed1" == active_nav_link && (__p += 'class="active"'), __p += '>\n                    <a href="tests/' + (null == (__t = model.id) ? "" :_.escape(__t)) + '/candidates/completed/1" class="mdL js-backbone hre-sidebar-link">\n                        <i data-original-title="To evaluate" class="icon-circle js-tooltip" data-placement="right"></i>\n                        <span class="hre-sidebar-label">To evaluate <span class="fnt-wt-600 indicator">' + (null == (__t = model.to_evaluate) ? "" :__t) + "</span></span>\n                    </a>\n                </li>\n                <li ", 
"completed2" == active_nav_link && (__p += 'class="active"'), __p += '>\n                    <a href="tests/' + (null == (__t = model.id) ? "" :_.escape(__t)) + '/candidates/completed/2" class="mdL js-backbone hre-sidebar-link">\n                        <i data-original-title="Qualified" class="icon2-thumbsup js-tooltip" data-placement="right"></i>\n                        <span class="hre-sidebar-label">Qualified <span class="fnt-wt-600 indicator">' + (null == (__t = model.qualified) ? "" :__t) + "</span></span>\n                    </a>\n                </li>\n                <li ", 
"completed3" == active_nav_link && (__p += 'class="active"'), __p += '>\n                    <a href="tests/' + (null == (__t = model.id) ? "" :_.escape(__t)) + '/candidates/completed/3" class="mdL js-backbone hre-sidebar-link">\n                        <i data-original-title="Failed" class="icon2-thumbsdown js-tooltip" data-placement="right"></i>\n                        <span class="hre-sidebar-label">Failed <span class="fnt-wt-600 indicator">' + (null == (__t = model.failed) ? "" :__t) + '</span></span>\n                    </a>\n                </li>\n            </ul>\n        </div><!-- end .mlA -->\n    </div>\n    <div class="hre-sidebar-bottom">\n        ', 
HR.currentUser && "developer" !== HR.currentUser.get("role") && (__p += '\n        <div class="sidebar-button-margins">\n            <a href="tests/' + (null == (__t = model.id) ? "" :_.escape(__t)) + '/invite" class="btn btn-primary primary-dark btn-mid sidebar-full-btn js-backbone"><span class="hre-sidebar-label">Invite Candidates</span><i class="icon2-invitecandidates icon--single"></i></a>\n        </div>\n        '), 
__p += '\n        <div class="sidebar-button-margins">\n            <a href="', 
__p += model.short_url ? "" + (null == (__t = model.short_url) ? "" :__t) :"" + (null == (__t = model.public_url) ? "" :__t), 
__p += '" class="btn btn-dark btn-mid sidebar-full-btn js-try-test-btn" target="_blank"><span class="hre-sidebar-label">Try Test</span><i class="icon2-tryquestion icon--single"></i></a>\n        </div>\n    </div>\n</div>\n';
return __p;
});