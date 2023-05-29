HR.appController.addTemplate("backbone/templates/recruit/login",function(obj){{var __t,__p="";Array.prototype.join}with(obj||{})__p+='    <div>\n        <center>\n            <h2 class="headline">\n                ',test.logo&&(__p+='\n                <img src="'+(null==(__t=test.logo)?"":__t)+'" /><br/>\n                '),__p+="\n                <span class='test-name'>\n                    "+(null==(__t=test.name)?"":_.escape(__t))+"\n                </span>\n            </h2>\n            ",test.logged_in&&test.attempt_done?(__p+='\n            <p class="bold">YOU HAVE COMPLETED THE TEST.</p>\n            <br/>\n            <p class="text-center customer-test-completed"><img src="/assets/icons/test-completed.png" /></p>\n            <p class="mdT mlB text-center">',__p+=test.feedback_message?" "+(null==(__t=test.feedback_message)?"":__t)+" ":" Thank you for taking the test. We will contact you soon.",__p+="</p>\n\n            "):(__p+='\n\n            <div class="sub-headline">\n                <span class="ico-questions"></span>\n                <span class="grey">'+(null==(__t=test.questions_count)?"":_.escape(__t))+" QUESTIONS\n                    ",test.sectional&&(__p+=" (with sections)"),__p+='\n                </span>\n                <span class="ico-time"></span>\n                <span class="grey test-duration">'+(null==(__t=test.duration)?"":_.escape(__t))+' MINUTES</span>\n                <a href="info/interface" class="mdL" target="_blank"><span class="icon-help-circled"></span><span class="grey test-duration">PLATFORM HELP</span><span class="icon-right-open-mini"></span></a>\n            </div> <!-- .sub-headline -->\n\n            '),__p+='\n        </center>\n\n        <div class="white-grid-block main-content">\n            ',test.logged_in?test.logged_in&&!test.attempt_done?__p+='\n\n            <div class="alert info">\n                <header>Already logged in.</header>\n                <p>You are already logged into this test. <a href="'+(null==(__t=test.unique_id)?"":__t)+'" class="backbone">Go there.</a></p>\n            </div>\n\n            ':test.logged_in&&test.attempt_done&&(__p+="\n\n              ",test.no_feedback&&"True"==test.no_feedback?__p+='\n                <p class="text-center msT">\n                  <button class="btn btn-primary test-submit-feedback">Logout</button>\n                </p>\n              ':(__p+="\n                ",__p+=test.feedback_text_question?'\n                <p class="mdB"><label>'+(null==(__t=test.feedback_text_question)?"":__t)+"</label></p>\n                ":'\n                <p class="mdB"><label>Please let us know any additional comments/feedback.</label></p>\n                ',__p+='\n                <textarea name="candidate-comment" rows="6" style="width:100%;" class="feedback-text"></textarea>\n                <br/>\n                <p class="text-center msT">\n                    <button class="btn btn-primary test-submit-feedback">Submit feedback & logout</button>\n                </p>\n              '),__p+="\n            "):(__p+='\n            <div class="js-tabview"></div>\n\n            <span class="challengeslist_challenge-title green-title customer-title-font-color">INSTRUCTIONS</span>\n            '+(null==(__t=test.instructions)?"":__t)+"\n            ",test.sectional&&(__p+="\n\n            <br/>\n            <p>\n                <strong>Note: </strong>\n                <ul>\n                    <li>This test has sections, each with some alotted time.</li>\n                    <li>Closing a section manually will carry-over the remaining time into the next section.</li>\n                </ul>\n            </p>\n\n            "),__p+='\n\n            <div class="soft-divider mjB"></div>\n            <!-- The following section will be auto populated when there is any error in the login page -->\n            <div class="alert mlB hide" id="error-message">\n                <header></header>\n                <p></p>\n            </div>\n\n            ',test.facebook_login?__p+='\n                <center>\n                    <button class="btn mdB btn-primary btn-large btn-blue fblogin"><i class="mdR icon--single icon-facebook"></i>Login using facebook..</button>\n                    <div class="clear"></div>\n                    <em><small class="grey">We\'ll build a profile using your facebook account.<br>You may then start the test.</small></em>\n                </center>\n            ':(__p+='\n            <form id="test-login-form" class="no-margin">\n                <div class="formgroup">\n                    <p class="text-center msB"><strong>Please fill all the details mentioned below</strong></p>\n                </div>\n\n                <div class="formgroup horizontal">\n                    <label class="span3 support-long-text">Email address/Login</label>\n                    <div class="block pull-left">\n                        <input type="text" class="with-help wide" name="email" value="'+(null==(__t=HR&&HR.username?HR.username:"")?"":_.escape(__t))+'">\n                    </div>\n                </div>\n\n                <div class="clear"></div>\n\n                ',test.auth_valid||(__p+='\n\n                <div class="formgroup horizontal">\n                    <label class="span3 support-long-text">Password</label>\n                    <div class="block pull-left">\n                        <input type="password" class="with-help wide" name="password" value="'+(null==(__t=HR&&HR.password?HR.password:"")?"":_.escape(__t))+'">\n                    </div>\n                </div>\n                '),__p+='\n\n                <div class="clear"></div>\n\n                ',_.each(test.collect_info,function(e){if(__p+='\n\n                <div class="formgroup horizontal" >\n                    <label class="span3 support-long-text">'+(null==(__t=e.title)?"":__t)+'</label>\n                    <div class="block pull-left">\n                        ',"resume"==e.field_name)__p+='\n                        <input type="file" class="with-help wide" name="'+(null==(__t=e.field_name)?"":_.escape(__t))+'">\n                        ';else if("gender"==e.field_name)__p+='\n                        <label class="widget"><input type="radio" id="gender-m" name="'+(null==(__t=e.field_name)?"":_.escape(__t))+'"> Male</label>\n                        <label class="widget"><input type="radio" id="gender-f" name="'+(null==(__t=e.field_name)?"":_.escape(__t))+'"> Female</label>\n                        ';else if("degree"==e.field_name)__p+='\n                        <select name="degree" class="with-help wide">\n                            <option value="" selected="selected">Choose your degree</option>\n                            <option value="B.E">B.E</option>\n                            <option value="B.Tech">B.Tech</option>\n                            <option value="M.Tech">M.Tech</option>\n                            <option value="Dual Degree">Dual Degree</option>\n                            <option value="B.C.A.">B.C.A.</option>\n                            <option value="M.C.A.">M.C.A.</option>\n                            <option value="B.B.A.">B.B.A.</option>\n                            <option value="M.B.A.">M.B.A.</option>\n                            <option value="B.Com">B.Com</option>\n                            <option value="M.Com">M.Com</option>\n                            <option value="B.Cs">B.Cs</option>\n                            <option value="B.Arch">B.Arch</option>\n                            <option value="B.Pharm">B.Pharm</option>\n                            <option value="B.Sc">B.Sc</option>\n                            <option value="M.Sc">M.Sc</option>\n                            <option value="B.A.">B.A.</option>\n                            <option value="M.A.">M.A.</option>\n                        </select>\n                        ';else if("role"==e.field_name&&test.job_roles){__p+="\n                        ";var n=JSON.parse(test.job_roles);__p+='\n                        <select name="role" class="with-help wide">\n                            ',_.each(n,function(e){__p+='\n                            <option value="'+(null==(__t=e)?"":__t)+'">'+(null==(__t=e)?"":__t)+"</option>\n                            "}),__p+="\n                        </select>\n                        "}else __p+='\n                        <input type="text" class="with-help wide" name="'+(null==(__t=e.field_name)?"":_.escape(__t))+'">\n                        ';__p+='\n                    </div>\n                    <div class="clear"></div>\n                </div>\n\n                '}),__p+="\n\n                ",test.enable_acknowledgement&&"True"!==test.enable_acknowledgement||(__p+='\n                <div class="formgroup" id="login-form">\n                    <div class="span2">\n                        <input type="checkbox" name="acknowledge" id="acknowledge" class="pull-right" style="margin-top:10px;"/>\n                    </div>\n\n                    <div class="span8"><label class="acknowledge-text" for="acknowledge">\n                            ',__p+=test.custom_acknowledge_text?"\n                                "+(null==(__t=test.custom_acknowledge_text)?"":_.escape(__t))+"\n                            ":"\n                                I will not consult/copy code from any source including a website, book, or friend/colleague to complete these tests, though may reference language documentation or use an IDE that has code completion features.</label></div>\n                            ",__p+="\n                </div>\n                "),__p+='\n\n                <div class="clear"></div>\n\n                <div class="formgroup horizontal no-margin">\n                    <br/>\n                    <center>\n                        <button class="btn mdB btn-primary btn-large test-submit">Start test</button>\n                    </center>\n                </div>\n            </form>\n            '),__p+="\n\n            "),__p+='\n        </div> <!-- .white-grid-block main-content -->\n\n        <center>\n            <div class="block">\n            <img class="mlT" src="/assets/brand/powered_by_transparent.png" />\n            ',test.logged_in&&test.attempt_done&&(__p+='\n                <p class="text-center txt-alt-grey">\n                    Love Programming challenges? </br>\n                    Find more problems and contests at <strong><a href="https://www.hackerrank.com/" class="txt-alt-grey">www.hackerrank.com</a></strong>\n                </p>\n\n            '),__p+='\n            </div>\n        </center>\n\n    </div><!-- end .row -->\n    <div id="fb-root"></div>\n';return __p});
//# sourceMappingURL=login-ac34edd396ffcd9d73bf761154573ef8.js.map