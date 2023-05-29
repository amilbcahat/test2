HR.appController.addTemplate("backbone/templates/settings", function(obj) {
{
var __t, __p = "";
Array.prototype.join;
}
with (obj || {}) __p += "", model && model.id ? (__p += '\n<section class="container">\n    <div class="container--inner">\n        <div id="profile-settings-sidebar" class="layout_sidebar">\n            <section class="plA clearfix settings_sidebar-top">\n                <img src="' + (null == (__t = model.avatar) ? "" :__t) + '" class="avatar block-center" alt="' + (null == (__t = model.username) ? "" :__t) + '" title="' + (null == (__t = model.username) ? "" :__t) + '" height="75" width="75" onerror="this.onerror=null; this.src=\'https://d3rpyts3de3lx8.cloudfront.net/hackerrank/assets/gravatar.jpg\';">\n		        <button class="btn btn-small block-center mlT" id="upload-avatar">Change Avatar</button>\n            </section>\n            <div class="sidebar_list" id="profileTabs">\n                <a class="sidebar_list-heading active backbone"\n                 id="profile" href="/settings/profile">Profile</a>\n                <a class="sidebar_list-heading backbone"\n                   id="account" href="/settings/account">Account</a>\n                <a class="sidebar_list-heading backbone"\n                   id="teams" href="/settings/teams">Teams</a>\n                <a class="sidebar_list-heading backbone"\n                   id="change-password" href="/settings/change-password">Change Password</a>\n                <a class="sidebar_list-heading backbone"\n                   id="email-preferences" href="/settings/email-preferences">Email Preferences</a>\n                ', 
model && model.is_campus_rep && (__p += '\n                <a class="sidebar_list-heading backbone" id="campus-rep-program"\n                   href="/settings/campus-rep-program">University Partner Stats</a>\n                '), 
__p += '\n            </div>\n            <p class="text-center"><button class="msT btn btn-green settings_save" id="save-btn">Save Changes</button></p>\n            <div class="text-center"><p id="save-success" class="psT hide"><small>Changes saved</small></p></div>\n        </div>\n        <div class="layout_content settings_group">\n            <article id="settings-subview" class="profile"></article>\n        </div>\n    </div>\n</section>\n') :__p += '\n<section class=\'user-profile-edit container\'>\n    <div class="light-wrap padded span8 block-center">\n        <h4 class="text-center">Please login to manage your settings.</h4>\n    </div>\n</section>\n', 
__p += "\n";
return __p;
});