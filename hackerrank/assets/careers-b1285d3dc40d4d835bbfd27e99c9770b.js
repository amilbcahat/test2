(function(){jQuery(function(){var e,t,o,i,n,a,r,s,l,d,c,u;return d={setActive:function(){return this.unSetFailedMsg(),this.active=!0,this.$el.removeClass("disabled"),this.dialog.$footer().find(".hr-dialog-loader").removeClass("active")},setInactive:function(){return this.active=!1,this.$el.addClass("disabled"),this.dialog.$footer().find(".hr-dialog-loader").addClass("active")},isActive:function(){return!this.$el.hasClass("disabled")},success:function(e){return null==e&&(e=""),this.setSuccessMsg(e),this.setInactive()},done:function(){return this.setInactive(),this.fadeOut()},failed:function(e){return null==e&&(e=""),this.setFailedMsg(e),this.setInactive()},fadeOut:function(){return this.dialog.$el().fadeOut("slow"),this.dialog.destroy()},setFailedMsg:function(e){return this.getMsgWidth(),this.dialog.$footer().find(".hr-dialog-failed-message").html(e)},unSetFailedMsg:function(){return this.dialog.$footer().find(".hr-dialog-failed-message").html("")},setSuccessMsg:function(e){return this.dialog.$footer().find(".hr-dialog-success-message").html(e).width(this.getMsgWidth())},unSetSuccessMsg:function(){return this.dialog.$footer().find(".hr-dialog-success-message").html("")},getMsgWidth:function(){var e;return e=0,this.dialog.$footer().find(".hr-dialog-button").each(function(t,o){return e+=$(o).width()+40}),this.dialog.$footer().find(".hr-dialog-buttons").width()-(e+15)}},e=function(e){var t,o,i,n;if(t={},!_.isObject(e))throw i=new Error,i.name="Argument Error",i.message="Argument to `Btn` can only be an object",i;if(e=$.extend(t,e),!e.dialog||!e.id)throw i=new Error,i.name="Argument Error",i.message=e.dialog||e.id?e.id?"reference to the `ShowDialog` object is missing":"id of the button is missing":"reference to the `ShowDialog` object is missing as well as the id of the button is missing",i;return e.$el||(e.$el=e.dialog.$el().find("#"+e.id)),o={dialog:e.dialog,id:e.id,$el:e.$el},n=d,o.prototype||(o.prototype={}),$.each(n,function(e,t){return o[e]=t}),o},c={render:function(){var t,o,i,n,a,r,s,l;return this.is_rendered||(l=this,s="<div class='hr-dialog-header'>",null!==this.options.title&&(s+=this.options.title),this.options.closebutton===!0&&(s+="<a href='' class='close' data-analytics='"+this.options.analytics+"'><i class='icon-cancel-small'></i></a>"),s+="</div>",a=this.options.background?"style='background: "+this.options.background+" !important; position: relative;'":"",r="<div id='"+this.id+"' class='hr-dialog'  style='display: none;'> <div class='hr-dialog-border' style='width:"+this.options.width+("px'> <div class='hr-dialog-main-window' "+a+">")+s+"<div class='hr-dialog-body'>"+this.options.body+"</div> <div class='hr-dialog-footer'> <div class='hr-dialog-loader'></div> <div class='hr-dialog-success-message'></div><div class='hr-dialog-failed-message'></div> <div class='hr-dialog-buttons'></div><div class='clearfix'></div> </div> </div> </div> </div>",$("body").append(r),t=this.$el(),this.options.body_view&&(t.find(".hr-dialog-body").html(""),this.options.body_view.setElement(t.find(".hr-dialog-body")).render(),this.options.body_view.set_dialog&&this.options.body_view.set_dialog(this)),this.options.height&&(t.find(".hr-dialog-body").css("height",""+this.options.height+"px"),t.find(".hr-dialog-body").css("overflow-y","scroll"),t.find(".hr-dialog-body").addClass("scroll-box")),this.options.error_message&&t.find(".glob-error").html(this.options.error_message).show(),t.show(),this.renderPosition(),t.find("a.close, .dialog-close").bind("click",function(e){return e.preventDefault(),"undefined"!=typeof _gag&&_gaq.push(["_trackEvent","Events","buttonClick",$(e.srcElement).attr("data-analytics")]),l.destroy()}),$(document).keyup(function(e){return 27===e.keyCode&&l.options.keyboard===!0?l.destroy():void 0}),this.options.events&&_.isObject(this.options.events)&&(l=this,_.each(this.options.events,function(e,o){var i,n,a,r;return r=o.indexOf(" "),i=o.substr(0,r),a=o.substr(r+1),n={$dialog:t,that:l},t.find(a).bind(i,n,e)})),o=l.$footer(),i=o.find(".hr-dialog-buttons"),n=null,_.each(this.options.buttons,function(t,o){var a,r,s,d;return d=l.id+"-fbtn-"+o,r="",t.analytics&&(r="data-analytics='"+t.analytics+"'"),i.append("<button "+r+" class='btn "+(t["class"]||"hr-dialog-button")+"' id='"+d+"'>"+t.name+"</button>"),a=i.find("#"+d),s=e({dialog:l,id:d,$el:a}),o===l.options.timeoutButton&&l.options.timeout>0&&(n=setTimeout(function(){return t.callback.call(s,l)},1e3*l.options.timeout)),a.bind("click",function(e){return n&&clearTimeout(n),e.preventDefault(),s.setActive(),t.callback.call(s,l)})}),this.options.hide_footer&&this.$footer().css("border-top","none").css("background","none"),this.is_rendered=!0,l.onRender&&l.onRender.call()),this},renderPosition:function(e){var t,o,i,n,a;return null==e&&(e=null),e||(e=this),t=e.$el(),o=e.options,n=($(document).width()-o.width-10)/2,i=t.find(".hr-dialog-border").height(),a=(t.height()-i-10)/2,t.css("padding-top",a+"px"),t.css("padding-bottom",a+"px"),t.css("padding-right",n+"px"),t.css("padding-left",n+"px")},destroy:function(){var e;return e=this,$("#"+this.id).animate({opacity:0},250,function(){return $(this).remove(),e.options.onDestroy?e.options.onDestroy.call():void 0}),this},$el:function(){return $("#"+this.id)},$header:function(){return this.$el().find(".hr-dialog-header")},$body:function(){return this.$el().find(".hr-dialog-body")},$footer:function(){return this.$el().find(".hr-dialog-footer")},$main_window:function(){return this.$el().find(".hr-dialog-main-window")}},i=function(e,t){var o,i,n,a,r,s;if(null==t&&(t={}),n="",i=!1,o={width:450,title:"",body:"",analytics:"Dialog Analytics",buttons:[],closebutton:!0,keyboard:!0,timeoutButton:null,timeout:null},_.isObject(e))e=$.extend(o,e);else{if(void 0!==e)throw r=new Error,r.name="Argument Error",r.message="Argument to `ShowDialog` can only be an object",r;e=o}for(;!i;)n="hr-dialog-"+Math.round(1e10*Math.random()),0===$("#"+n).length&&(i=!0);return a={id:n,options:e},s=$.extend(c,t),a.prototype||(a.prototype={}),$.each(s,function(e,t){return a[e]=t}),a},a=function(e){var t,o,n,a,r,s,l,d,c,u,h,g,p,f,m;if(r={$form:function(){return this.$body().find("form")},form_set_notice:function(e){var t;return t=this.$body(),t.find(".alert .error").hide(),t.find(".alert .success").html(e).show()},form_set_error:function(e){var t;return t=this.$body(),t.find(".alert .success").hide(),t.find(".alert .error").html(e).show()},form_unset_alert:function(){var e;return e=this.$body(),e.find(".alert .error").hide(),e.find(".alert .success").hide()}},o={enctype:"application/x-www-form-urlencoded",fields:[]},_.isObject(e))e=$.extend(o,e);else{if(void 0!==e)throw s=new Error,s.name="Argument Error",s.message="Argument to `ShowFormDialog` can only be an object",s;e=o}for(t=e.body?e.body:"",t+="<p class='alert hide'> <span class='success' style='display: none; color: green;'></span> <span class='error' style='display:none; color: red;'></span> </p> <form enctype='"+e.enctype+"'>",c=e.fields,l=0,d=c.length;d>l;l++)a=c[l],"hidden"!==a.type&&(t+="<div class='formgroup horizontal'>"),a.title&&(t+="<label for='name' class='pull-left span3'>"+a.title+"</label>"),t+="<div class='block span7 profile-input'>","email"===(u=a.type)||"text"===u||"hidden"===u?t+="<input class='span6' ":"file"===(h=a.type)?t+="<div class='wrap_file span6'><input class='orig_file' ":"textarea"===a.type?t+="<textarea class='span6' style='resize:vertical;' rows='4'":"select"===(g=a.type)&&(t+="<select "),a.name&&(t+="name='"+a.name+"' "),a.type&&(t+="type='"+a.type+"' "),a.value&&(t+="value='"+a.value+"' "),a.disabled&&(t+="disabled='disabled' "),"email"===(p=a.type)||"text"===p||"hidden"===p?t+=" />":"file"===(f=a.type)?t+=' /><div class="fake_file"><div class="fake_file_text span4"></div><div class="fake_file_button btn">Select File</div></div></div>':"textarea"===a.type?(t+=">",a.value&&(t+=value),t+="</textarea>"):"select"===(m=a.type)&&(t+=">",a.options&&_.each(a.options,function(e,o){return t+="<option value='"+o+"'>"+e+"</option>"}),t+="</select>"),a.hint&&(t+="<small class='sub-help'>"+a.hint+"</small><br>"),a.error&&(t+="<small class='error'></small>"),t+="</div>","hidden"!==a.type&&(t+="</div>");return t+="</form>",n={"click .fake_file_button":function(e){var t;return t=$(e.target),t.parent().parent().find(".orig_file").trigger("click")},"change .orig_file":function(e){var t;return t=$(e.target),t.parent().parent().find(".fake_file_text").html(t.val().split("\\").pop())}},e.body=t,e.events=n,new i(e,r)},r=function(e){var o,n,a,r,s,l,d,c,u,h,g;if(s={},n={purpose:"login",hide_footer:!0,contest:"",redirect:!0,background:"transparent",title:null},_.isObject(e))e=$.extend(n,e);else{if(void 0!==e)throw g=new Error,g.name="Argument Error",g.message="Argument to `ShowLoginDialog` can only be an object",g;e=n}return"login"===e.purpose?(l="active",c="",d="",u="hide"):(c="active",l="",d="hide",u=""),r=t.CONTEST_SLUG?""+document.location.protocol+"//"+document.location.host+"/auth/forgot_password/"+t.CONTEST_SLUG:""+document.location.protocol+"//"+document.location.host+"/auth/forgot_password",e.body_text?e.body_text_style="":(e.body_text="",e.body_text_style="display:none;"),o="<div class='login-group homepage_admin'> <ul class='login_tab unstyled horizontal clearfix'> <li class='signup-toggle toggle "+c+"'><a href='/signup' data-toggle='tab'>Sign Up</a></li> <li class='login-toggle toggle "+l+"'><a href='/login' data-toggle='tab'>Log In</a></li> </ul> <div class='homepage_signup signup "+u+"' id='signup'> <form id='legacy-signup' class='legacy-form'> <div class='homepage_signupgroup--legacy'> <div class='text-center alert error glob-error' style='display:none;'></div> <div class='formgroup'> <i class='icon-mail'></i> <input id='email' class='fw' type='email' name='email' value='' placeholder='Your Email Address' data-content='' data-toggle='tooltip' data-placement='right'/> </div> <div class='formgroup'> <i class='icon-user'></i> <input id='username' class='fw' type='text' name='username' value='' placeholder='Pick a username' data-content='' data-toggle='tooltip' data-placement='right'/> </div> <div class='formgroup'> <i class='icon-lock'></i> <input id='password' class='fw' type='password' name='password' placeholder='Choose a password' data-content='' data-toggle='tooltip' data-placement='right'/> </div> <button class='btn btn-primary span4 block-center signup-button' name='commit' type='submit' value='request' data-analytics='SignupPassword' type='submit'>Create An Account</button> </div> <div class='homepage_signupgroup--social'> <p class='text-center small msB mlT psT boundT'>Or connect with</p> <div class='unstyled clearfix socialbuttons row text-center' id='social-signup'> <div class='social-btn-wrap span-xs-third'> <a class='btn btn-facebook btn-social' data-analytics='SignupFacebook'><i class='icon-facebook'></i>Facebook</a> </div> <div class='social-btn-wrap span-xs-third'> <a class='btn btn-google btn-social' data-analytics='SignupGoogle'><i class='icon-gplus'></i> Google</a> </div> <div class='social-btn-wrap span-xs-third'> <a class='btn btn-github btn-social' data-analytics='SignupGithub'><i class='icon-github'></i> GitHub</a> </div> </div> </div> </form> </div> <div class='login "+d+"' id='login'> <form id='legacy-login' class='legacy-form'> <div class='homepage_signupgroup--legacy'> <div class='text-center alert error glob-error' style='"+e.body_text_style+"'>"+e.body_text+"</div> <div class='formgroup'> <i class='icon-user'></i> <input id='login' class='fw' type='text' name='login' value='' placeholder='Your username or email'/> </div> <div class='formgroup'> <i class='icon-lock'></i> <input id='password' class='fw' type='password' name='password' placeholder='Your password' /> </div> <div class='clearfix msB'> <label class='remember pull-left msT'><input type='checkbox' id='remember_me'> Remember me</label> <a target='_blank' href='"+r+"' class='cursor pull-right password-retrieve btn btn-link'>Forgot your password?</a> </div> <button class='btn btn-primary span4 block-center login-button auth' name='commit' type='submit' value='request' data-analytics='LoginPassword' type='submit'>Log In</button> </div> <div class='homepage_signupgroup--social'> <p class='text-center small msB mlT psT boundT'>Or connect with</p> <div class='unstyled clearfix socialbuttons row text-center' id='social-signup'> <div class='social-btn-wrap span-xs-third'> <a class='btn btn-facebook btn-social' data-analytics='SignupFacebook'><i class='icon-facebook'></i>Facebook</a> </div> <div class='social-btn-wrap span-xs-third'> <a class='btn btn-google btn-social' data-analytics='SignupGoogle'><i class='icon-gplus'></i> Google</a> </div> <div class='social-btn-wrap span-xs-third'> <a class='btn btn-github btn-social' data-analytics='SignupGithub'><i class='icon-github'></i> GitHub</a> </div> </div> </div> </form> </div> </div>",h=e.success_callback?e.success_callback:function(){},a={"click .login_tab li a":function(e){var t,o;return e.preventDefault(),$(e.currentTarget).parent().hasClass("active")?void 0:(t=e.data,o=t.that,o.$el().find(".login_tab li a").each(function(e,t){return $(t).parent().hasClass("active")?$(t).parent().removeClass("active"):$(t).parent().addClass("active")}),o.$el().find(".login-group div#signup, .login-group div#login").each(function(e,t){return $(t).hasClass("hide")?$(t).removeClass("hide"):$(t).addClass("hide")}))},"click a.btn-facebook":function(o){var i,n,a,r,s;return o.preventDefault(),i=o.data,s=600,n=350,a=screen.width/2-s/2,r=screen.height/2-n/2,window.login_callback=function(o){var n;return $("meta[name=csrf-token]").attr("content",o),t.appController?t.profile({fetch:!0}):e.redirect&&(n=t.CONTEST_SLUG?""+document.location.protocol+"//"+document.location.host+"/auth/login/"+t.CONTEST_SLUG:""+document.location.protocol+"//"+document.location.host+"/auth/login",document.location.href=n),i.that.destroy(),h()},window.open("/hackers/auth/facebook?display=popup","facebook_login","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+s+", height="+n+", top="+r+", left="+a)},"click a.btn-github":function(o){var i,n,a,r,s;return o.preventDefault(),i=o.data,s=960,n=500,a=screen.width/2-s/2,r=screen.height/2-n/2,window.login_callback=function(o){var n;return $("meta[name=csrf-token]").attr("content",o),t.appController?t.profile({fetch:!0}):e.redirect&&(n=t.CONTEST_SLUG?""+document.location.protocol+"//"+document.location.host+"/auth/login/"+t.CONTEST_SLUG:""+document.location.protocol+"//"+document.location.host+"/auth/login",document.location.href=n),i.that.destroy(),h()},window.open("/hackers/auth/github?display=popup","facebook_login","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+s+", height="+n+", top="+r+", left="+a)},"click a.btn-google":function(o){var i,n,a,r,s;return o.preventDefault(),i=o.data,s=600,n=500,a=screen.width/2-s/2,r=screen.height/2-n/2,window.login_callback=function(o){var n;return $("meta[name=csrf-token]").attr("content",o),t.appController?t.profile({fetch:!0}):e.redirect&&(n=t.CONTEST_SLUG?""+document.location.protocol+"//"+document.location.host+"/auth/login/"+t.CONTEST_SLUG:""+document.location.protocol+"//"+document.location.host+"/auth/login",document.location.href=n),i.that.destroy(),h()},window.open("/hackers/auth/google_oauth2?display=popup","google_login","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+s+", height="+n+", top="+r+", left="+a)},"click button.signup-button":function(o){var i,n,a,r;return o.preventDefault(),"disabled"!==$(o.currentTarget).attr("disabled")?($(o.currentTarget).attr("disabled","disabled"),$(o.currentTarget).html("Signing up.."),a=o.data,r=a.that,r.$body(),i=$(r.$body().find(".login-group div#signup")),n=t.CONTEST_SLUG?""+document.location.protocol+"//"+document.location.host+"/auth/signup/"+t.CONTEST_SLUG:""+document.location.protocol+"//"+document.location.host+"/auth/signup",a={username:i.find("input#username").val(),email:i.find("input#email").val(),password:i.find("input#password").val()},i.find(".error").html("").hide(),$.ajax({type:"POST",url:n,data:a,success:function(n){var a,s;return $(o.currentTarget).removeAttr("disabled","disabled"),n.status?(n.csrf_token&&$("meta[name=csrf-token]").attr("content",n.csrf_token),$(o.currentTarget).html("Logging you in..."),t.appController?(t.profile({fetch:!0}),r.destroy()):e.redirect?(s=t.CONTEST_SLUG?""+document.location.protocol+"//"+document.location.host+"/auth/login/"+t.CONTEST_SLUG:""+document.location.protocol+"//"+document.location.host+"/login",document.location.href=s):r.destroy(),h()):($(o.currentTarget).html("Create An Account"),i.find(".error").html("").show(),n.errors.length>1?(a="<ul>",_.each(n.errors,function(e){return a+="<li>"+e+"</li>"},this),a+="</ul>",i.find(".error").html(a)):i.find(".error").html(n.errors[0]))}})):void 0},"click button.login-button":function(o){var i,n,a,r;return o.preventDefault(),"disabled"!==$(o.currentTarget).attr("disabled")?($(o.currentTarget).attr("disabled","disabled"),$(o.currentTarget).html("Logging in.."),a=o.data,r=a.that,r.$body(),i=$(r.$body().find(".login-group div#login")),n=t.CONTEST_SLUG?""+document.location.protocol+"//"+document.location.host+"/auth/login/"+t.CONTEST_SLUG:""+document.location.protocol+"//"+document.location.host+"/auth/login",a={login:i.find("input#login").val(),password:i.find("input#password").val(),remember_me:i.find("input#remember_me").is(":checked")},i.find(".error").html("").hide(),$.ajax({type:"POST",url:n,data:a,success:function(n){var a,s;return $(o.currentTarget).removeAttr("disabled","disabled"),n.status?(n.csrf_token&&$("meta[name=csrf-token]").attr("content",n.csrf_token),$(o.currentTarget).html("Logging you in..."),t.appController?(t.profile({fetch:!0}),r.destroy()):e.redirect?(s=t.CONTEST_SLUG?""+document.location.protocol+"//"+document.location.host+"/auth/login/"+t.CONTEST_SLUG:""+document.location.protocol+"//"+document.location.host+"/login",document.location.href=s):r.destroy(),h()):($(o.currentTarget).html("Log In"),i.find(".error").html("").show(),n.errors.length>1?(a="<ul>",_.each(n.errors,function(e){return a+="<li>"+e+"</li>"},this),a+="</ul>",i.find(".error").html(a)):i.find(".error").html(n.errors[0]))}})):void 0}},e.body=o,e.analytics="Cancel Login",e.events=a,e.width=550,new i(e,s)},o=function(e){var t,o,n,a;if(n={showError:function(e){return this.$body().find(".alert").removeClass("success").addClass("error").html(e).show()},clearAlert:function(){return this.$body().find(".alert").removeClass("success").removeClass("error").html("").hide()},showSuccess:function(e){return this.$body().find(".alert").addClass("success").removeClass("error").html(e).show()}},o={},_.isObject(e))e=$.extend(o,e);else{if(void 0!==e)throw a=new Error,a.name="Argument Error",a.message="Argument to `ShowLoginDialog` can only be an object",a;e=o}return t="<p class='alert hide'></p>",e.body=t+e.body,new i(e,n)},n=function(){var e,o,n,a,r,s,l;return a={},o={title:"Request a feature"},l=_.isObject(l)?$.extend(o,l):o,s="",r="",t.profile()&&t.profile().isLoggedIn()&&(s=t.profile().get("name")||t.profile().get("username"),r=t.profile().get("email")),e='<form id="legacy-feature" class="show" style="display:block" onsubmit="return(false);"> <div class="formgroup clearfix m"> <div class="alert error" style="display: none;"></div> </div> <div class="formgroup horizontal clearfix"> <label for="name" class="pull-left span2">Name</label> <div class="pull-left span4"> <input id="name" type="text" name="name" value="'+s+'" placeholder="Name"/> </div> </div> <div class="formgroup horizontal clearfix"> <label for="name" class="pull-left span2">Email</label> <div class="pull-left span4"> <input id="email" type="text" name="email" value="'+r+'" placeholder="Email"/> </div> </div> <div class="formgroup horizontal clearfix"> <label for="name" class="pull-left span2">Feature</label> <div class="pull-left span4"> <textarea id="feature" type="text" name="feature" value="" placeholder="Feature"></textarea> </div> </div> <div class="text-center"> <button class="featureRequest-button btn btn-green btn-large block-center" style="width:340px;" name="submit" type="submit" data-analytics="FeatureRequest" value="sendrequest">Submit</button> </div> <div style="margin-bottom: 20px;"></div> </form>',n={"click button.featureRequest-button":function(e){var t,o,i,n;return e.preventDefault(),i=e.data.that,t=$(i.$body().find("form#legacy-feature")),o=$(e.currentTarget),"disabled"!==o.attr("disabled")?(o.attr("disabled","disabled").html("Sending Your Request"),t.find(".alert.error").hide(),n={name:t.find("input#name").val(),email:t.find("input#email").val(),feature:t.find("textarea#feature").val()},$.ajax({url:"/rest/feature_request",type:"POST",data:n,success:function(e){var n,a,r,s;if(o.removeAttr("disabled").html("Submit"),e.status)return i.destroy();if(0===e.errors.length)n="Unknown Error";else if(1===e.errors.length)n=e.errors[0];else{for(n="<ul style='text-align: left;'>",r=e.errors.length-1,a=s=0;r>=0?r>=s:s>=r;a=r>=0?++s:--s)n+="<li>"+e.errors[a]+"</li>";n+="</ul>"}return t.find(".alert.error").show().html(n)}})):void 0}},l.body=e,l.analytics="Cancel Feature Request",l.events=n,l.width=400,new i(l,a)},l=function(e){var t,o,n;return n={},o={title:"Submission Disabled"},e=_.isObject(e)?$.extend(o,e):o,t='<div class="block-center text-center"> This challenge is disabled now.<br/>Please try this challenge after some time. </div>',e.body=t,e.width=400,new i(e,n)},s=function(e){var o,i,n,r;return r={},i={title:"Message",username:null,width:350},e=_.isObject(e)?$.extend(i,e):i,o="",null!==e.username?(e.body="<div> <p>Send message to <a class='backbone' href='/"+e.username+"'>"+e.username+"</a></p> <textarea id='message' rows='5' cols='28'></textarea> </div>",e.getReceiver=function(){return"username-"+e.username}):(e.body="<div> <p>Send message to <input type='text' style='width: 170px; margin-left: 20px;' id='receiver_id' /> <textarea id='message' rows='5' cols='28'></textarea> </div>",e.getReceiver=function(){return"username-"+$("#receiver_id").val()}),e.buttons=[{name:"Close",callback:function(e){return this.setInactive(),e.destroy()}},{name:"Send","class":"hr_primary-btn, btn-green",callback:function(o){var i,n;return i=this,i.unSetFailedMsg(),""===$("#message").val().trim()?(i.failed("Message can not be blank."),i.$el.removeClass("disabled"),void 0):(i.setInactive(),i.$el.text("Sending"),n=e.getReceiver(),$.ajax({url:"/rest/messages",type:"POST",data:{sender_id:t.profile().id,receiver_id:""+e.getReceiver(),message:$("#message").val()},success:function(e){return i.$el.text("Send"),i.setActive(),e.status?(o.destroy(),t.appView.sidebarView.update(parseInt(e.model.message_thread_id)),t.router.navigate("/inbox/thread/"+e.model.message_thread_id,!0)):(i.failed(e.error),i.$el.removeClass("disabled"))},error:function(){return i.$el.text("Send"),i.failed("There was a problem sending a message"),i.$el.removeClass("disabled")}}))}}],n=new a(e,r),n.onRender=function(){return $("#receiver_id").focus(),$("#receiver_id").unbind(),$("#receiver_id").typeahead({minLength:3,menu:'<ul class="typeahead dropdown-menu margin-0" "margin:0px;"></ul>',source:function(){return function(e,t){return $.ajax({url:"/rest/hackers/autocomplete?q="+t+"&without=",type:"GET",success:function(t){return e.process(t)}})}}(this)})},n},t=null!=(u=window.HR)?u:{},t.util||(t.util={}),t.util.ShowDialog=i,t.util.ShowFormDialog=a,t.util.ShowLoginDialog=r,t.util.ShowConfirmationDialog=o,t.util.ShowFeatureRequestDialog=n,t.util.ShowSubmitDisabledDialog=l,t.util.ShowMessageDialog=s,window.HR||(window.HR=t)})}).call(this);
//# sourceMappingURL=careers-2c37e127848bdcd559ef9da94a8489be.js.map