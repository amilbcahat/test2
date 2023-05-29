HR.appController.addTemplate("backbone/templates/x-analytics/analytics-navigation",function(obj){{var __t,__p="";Array.prototype.join}with(obj||{})__p+='<div class="hre-sidebar admin-sidebar '+(null==(__t=sideBarClass)?"":__t)+'" id="hre-sidebar">\n    <div class="sidebar-scroller bottom hidden">\n        <i class="icon-down-open-bold"></i>\n        <i class="icon-up-open-bold"></i>\n    </div>\n\n    <!-- This is the expand and collapse icon that will appear when in smaller screens -->\n    <div class="sidebar-toggle-admin" id="sidebar-menu-icon">\n        <i class="icon-menu-large sidebar-menu-icon"></i>\n    </div>\n\n    <div class="hre-sidebar-inner full-height">\n        <div class="mlA hre-sidebar-innerblock">\n            <p class="sidebar-nav-title"><span class="hre-sidebar-label">Company</span></p>\n            <ul class="hre-sidebar-list">\n                <li ',"companies_dash"==active_nav_link&&(__p+=' class="active"'),__p+='>\n                <a href="analytics/companies/dashboard" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Usage Dashboard" class="icon-doc-text js-tooltip" data-placement="right"></i>\n                    <span class="hre-sidebar-label">Usage Dashboard</span>\n                </a>\n                </li>\n                <li ',"company_dash"==active_nav_link&&(__p+=' class="active"'),__p+='>\n                <a href="analytics/companies" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Customer Dashboard" class="icon-doc js-tooltip" data-placement="right"></i>\n                    <span class="hre-sidebar-label">Customer Dashboard</span>\n                </a>\n                </li>\n                <li ',"trial_signups"==active_nav_link&&(__p+=' class="active"'),__p+='>\n                <a href="analytics/companies/trial_signups" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Trial Signups" class="icon-chart-bar js-tooltip" data-placement="right"></i>\n                    <span class="hre-sidebar-label">Trial Signups</span>\n                </a>\n                </li>\n                <li ',"company_watchlist"==active_nav_link&&(__p+=' class="active"'),__p+='>\n                <a href="analytics/companies/watchlist" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Watchlist" class="icon-list-add js-tooltip" data-placement="right"></i>\n                    <span class="hre-sidebar-label">Watchlist</span>\n                </a>\n                </li>\n            </ul>\n        </div>\n\n        <span class="dark-divider"></span>\n\n        <div class="mlA hre-sidebar-innerblock">\n            <p class="sidebar-nav-title"><span class="hre-sidebar-label">User</span></p>\n            <ul class="hre-sidebar-list">\n                <li ',"user_watchlist"==active_nav_link&&(__p+=' class="active"'),__p+='>\n                <a href="analytics/users/watchlist" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Watchlist" class="icon-list-add js-tooltip" data-placement="right"></i>\n                    <span class="hre-sidebar-label">Watchlist</span>\n                </a>\n                </li>\n                <li ',"user_signups"==active_nav_link&&(__p+=' class="active"'),__p+='>\n                <a href="analytics/users/signups" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Signups" class="icon-chart-bar js-tooltip" data-placement="right"></i>\n                    <span class="hre-sidebar-label">Signups</span>\n                </a>\n                </li>\n            </ul>\n        </div>\n\n        <span class="dark-divider"></span>\n\n        <div class="mlA hre-sidebar-innerblock">\n            <p class="sidebar-nav-title"><span class="hre-sidebar-label">Sales Force</span></p>\n            <ul class="hre-sidebar-list">\n                <li ',"revenue_health"==active_nav_link&&(__p+=' class="active"'),__p+='>\n                <a href="analytics/revenue/health" class="js-backbone hre-sidebar-link">\n                    <i data-original-title="Revenue Health" class="icon-chart-area js-tooltip" data-placement="right"></i>\n                    <span class="hre-sidebar-label">Revenue Health</span>\n                </a>\n                </li>\n            </ul>\n        </div>\n\n    </div>\n</div>\n';return __p});
//# sourceMappingURL=analytics-navigation-73095129c9cafb37675ae4fbdc08bed7.js.map