HR.appController.addTemplate("backbone/templates/x/pricing-plans",function(obj){{var __t,__p="";Array.prototype.join}with(obj||{}){__p+='<div class="top-fixed-bar">\n    <h3 class="topbar-h3 mjL">Payments</h3>\n\n    <h3 class="topbar-h3"><i class="icon-right-open breadcrumb-chevron"></i>Plans</h3>\n</div>\n<div class="overflow-content" id="control-overflow">\n    ';var old_plan=!1;__p+="\n    ",current_plans=["user-startup","user-professional","user-enterprise","free","trial"],__p+="\n    ",model.plan&&model.plans&&-1==$.inArray(model.plan,current_plans)&&(__p+="\n        ",old_plan=!0,__p+="\n            <div><center><h4>You are currently in the "+(null==(__t=model.plans[model.plan].name)?"":__t)+" Plan</h4>These are our new plans:</center></div>\n        "),__p+='\n\n    <div class="fixed980 display-table">\n\n        <div style="margin-left: 259px;" class="pricing-head">\n            <div class="text-center pdA" style="position: relative; left: 10px;">\n                <div class="txt-alt-grey plan-names">\n                    STARTUP\n                </div>\n                <div class="pricing-price">$199</div>\n                <div class="fnt-sz-small txt-alt-grey" style="margin-top:7px;">\n                    per USER/MONTH\n                </div>\n            </div>\n        </div>\n\n        <!-- <div class="pricing-head">\n            <div class="text-center pdA" style="position: relative; left: 10px;">\n                <div class="txt-alt-grey plan-names">\n                    PROFESSIONAL\n                </div>\n                <div class="pricing-price txt-green">$299</div>\n                <div class="fnt-sz-small txt-alt-grey" style="margin-top:7px;">\n                    per USER/MONTH\n                </div>\n            </div>\n        </div> -->\n\n        <div style="border-right: 1px solid #eee; padding:0 8px;" class="pricing-head">\n            <div class="text-center pdA">\n                <div class="txt-alt-grey plan-names">\n                    ENTERPRISE\n                </div>\n                <div class="pricing-number">1.415.900.4023</div>\n                <div class="fnt-sz-small txt-alt-grey">\n                    CALL US\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- end .fixed 980 -->\n\n    <div class="mjB">\n        <div class="fixed980 display-table">\n            <div class="pricing-body-desc">\n                <ul class="hov-green striped-list">\n                    <!--<li class="no-padding">-->\n                        <!--<a href="javascript:void(0)" class="no-cursor display-block psA tooltipsrc">Minimum Billing-->\n                            <!--frequency</a>-->\n                    <!--</li>-->\n                    <li class="no-padding">\n                        <a href="javascript:void(0)" class="no-cursor display-block psA tooltipsrc"\n                           data-placement="right" data-trigger="hover" data-toggle="tooltip"\n                           data-original-title="The number of separate login credentials per account.">Number of\n                            users</a>\n                    </li>\n                    <li class="no-padding">\n                        <a href="javascript:void(0)" class="no-cursor display-block psA tooltipsrc"\n                           data-placement="right" data-trigger="hover" data-toggle="tooltip"\n                           data-original-title="The number of email invites to challenges available per account.">Number\n                            of invites</a>\n                    </li>\n                    <li class="no-padding">\n                        <a href="javascript:void(0)" class="no-cursor display-block psA tooltipsrc"\n                           data-placement="right" data-trigger="hover" data-toggle="tooltip"\n                           data-original-title="Unparalleled support provides uncompromising availability.">Support</a>\n                    </li>\n                    <li class="no-padding">\n                        <a href="javascript:void(0)" class="no-cursor display-block psA tooltipsrc"\n                           data-placement="right" data-trigger="hover" data-toggle="tooltip"\n                           data-original-title="The real-time collaborative coding tool for phone interviews and white-boarding.">CodePair\n                            <small style="font-size: 70%">(Beta)</small>\n                        </a>\n                    </li>\n                    <li class="no-padding">\n                        <a href="javascript:void(0)" class="no-cursor display-block psA tooltipsrc"\n                           data-placement="right" data-trigger="hover" data-toggle="tooltip"\n                           data-original-title="Access to our candidate interface inserted directly into your webpage.">Embed\n                            Challenges</a>\n                    </li>\n                    <li class="no-padding">\n                        <a href="javascript:void(0)" class="no-cursor display-block psA tooltipsrc"\n                           data-placement="right" data-trigger="hover" data-toggle="tooltip"\n                           data-original-title="Our API is available, plus support to integrate with customers\' ATS tools">API</a>\n                    </li>\n                    <li class="no-padding">\n                        <a href="javascript:void(0)" class="no-cursor display-block psA tooltipsrc"\n                           data-placement="right" data-trigger="hover" data-toggle="tooltip"\n                           data-original-title="Compares candidates individually or by group criteria, as well as interviewer success and productivity.">Recruiting\n                            analytics\n                            <small style="font-size: 70%">(Beta)</small>\n                        </a>\n                    </li>\n                    <li class="no-padding">\n                        <a href="javascript:void(0)" class="no-cursor display-block psA tooltipsrc"\n                           data-placement="right" data-trigger="hover" data-toggle="tooltip"\n                           data-original-title="Advanced customization pulls client branding into the candidate interface.">White\n                            labeled page</a>\n                    </li>\n                    <li class="no-padding">\n                        <a href="javascript:void(0)" class="no-cursor display-block psA tooltipsrc"\n                           data-placement="right" data-trigger="hover" data-toggle="tooltip"\n                           data-original-title="Highly similar and Identical sections in code submissions are analyzed and flagged.">Plagiarism\n                            detection</a>\n                    </li>\n                    <li class="no-padding">\n                        <a href="javascript:void(0)" class="no-cursor display-block psA tooltipsrc"\n                           data-placement="right" data-trigger="hover" data-toggle="tooltip"\n                           data-original-title="A dedicated Customer Success Manager ensures maximum return in utilization and productivity.">Account\n                            manager</a>\n                    </li>\n                    <li class="no-padding">\n                        <a href="javascript:void(0)" class="no-cursor display-block psA tooltipsrc"\n                           data-placement="right" data-trigger="hover" data-toggle="tooltip"\n                           data-original-title="Challenges can be posted to our problem-solving community on HackerRank.com.">Submit\n                            to HackerRank</a>\n                    </li>\n                    <li class="no-padding">\n                        <a href="javascript:void(0)" class="no-cursor display-block psA tooltipsrc"\n                           data-placement="right" data-trigger="hover" data-toggle="tooltip"\n                           data-original-title="Integration with existing ATS tools is available to lower adoption and support costs.">Integration\n                            with existing ATS</a>\n                    </li>\n                </ul>\n            </div>\n            <!-- end .pricing-body-desc -->\n            <div class="pricing-body">\n                <ul class="striped-list text-center">\n                    <!--<li>Monthly</li>-->\n                    <li>1</li>\n                    <li>50/month</li>\n                    <li>e-mail</li>\n                    <li><i class="icon2-close txt-alt-grey"></i></li>\n                    <li><i class="icon2-close txt-alt-grey"></i></li>\n                    <li><i class="icon2-close txt-alt-grey"></i></li>\n                    <li><i class="icon2-close txt-alt-grey"></i></li>\n                    <li><i class="icon2-close txt-alt-grey"></i></li>\n                    <li><i class="icon2-close txt-alt-grey"></i></li>\n                    <li><i class="icon2-close txt-alt-grey"></i></li>\n                    <li><i class="icon2-close txt-alt-grey"></i></li>\n                    <li><i class="icon2-close txt-alt-grey"></i></li>\n                    <li class="no-padding"></li>\n                    ',model.plan&&"user-startup"===model.plan?__p+='\n                        <h3 style="color:#8db32c;">Current Plan</h3>\n                        <div style="height:14px"></div>\n                    ':model.plans&&model.plans["user-startup"]&&!model.plans["user-startup"].subscribe?__p+='\n                        <div style="height:14px"></div>\n                        Can\'t subscribe to this plan\n                        <i class="icon-question-sign tip" data-original-title="'+(null==(__t=model.plans["user-startup"].message)?"":__t)+'"></i>\n                        <div style="height:14px"></div>\n                    ':old_plan?__p+='\n                        <a href="/contact_us" class="common_margin block button-green big_button_padding rcorners_mid">\n                            Contact Us&nbsp;\n                            <i class="icon-question-sign tip" data-original-title="Please contact us to migrate to this plan"></i>\n                        </a>\n                    ':model.permission&&(__p+='\n                    <li>\n                        <a href="javascript:;" class="btn btn-primary payment-button" data-plan=\'user-startup\' data-cost="199" data-invites="unlimited">\n                            Proceed To Checkout\n                        </a>\n                    </li>\n\n                    '),__p+='\n                </ul>\n            </div>\n            <!-- end .pricing-body -->\n            <div class="pricing-body margin-left-15">\n                <ul class="striped-list text-center">\n                    <!--<li>Monthly</li>-->\n                    <li>More than 1</li>\n                    <li>300</li>\n                    <li>e-mail + phone</li>\n                    <li><i class="icon-ok txt-green"></i></li>\n                    <li><i class="icon-ok txt-green"></i></li>\n                    <li><i class="icon-ok txt-green"></i></li>\n                    <li><i class="icon-ok txt-green"></i></li>\n                    <li><i class="icon-ok txt-green"></i></li>\n                    <li><i class="icon-ok txt-green"></i></li>\n                    <li><i class="icon-ok txt-green"></i></li>\n                    <li><i class="icon-ok txt-green"></i></li>\n                    <li><i class="icon-ok txt-green"></i></li>\n                    <li class="no-padding"></li>\n                    <li><a href="/x/contact" style="width:191px;" class="btn">Contact Us</a></li>\n                </ul>\n            </div>\n            <!-- end .pricing-body -->\n        </div>\n        <!-- end .fixed 980 -->\n    </div>\n    <!-- end .mjB -->\n</div> <!-- end .overflow-content -->\n'}return __p});
//# sourceMappingURL=pricing-plans-7119d5aa64b84189189b55062342d4bf.js.map