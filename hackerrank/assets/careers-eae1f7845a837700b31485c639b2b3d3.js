(function(){jQuery(function(){var a,b,c,d,e,f,g,h,i,j,k,l;return j={setActive:function(){return this.unSetFailedMsg(),this.active=!0,this.$el.removeClass("disabled"),this.dialog.$footer().find(".hr-dialog-loader").addClass("active")},setInactive:function(){return this.active=!1,this.$el.addClass("disabled"),this.dialog.$footer().find(".hr-dialog-loader").removeClass("active")},isActive:function(){return!this.$el.hasClass("disabled")},success:function(a){return a==null&&(a=""),this.setSuccessMsg(a),this.setInactive()},done:function(){return this.setInactive(),this.fadeOut()},failed:function(a){return a==null&&(a=""),this.setFailedMsg(a),this.setInactive()},fadeOut:function(){return this.dialog.$el().fadeOut("slow"),this.dialog.destroy()},setFailedMsg:function(a){return this.getMsgWidth(),this.dialog.$footer().find(".hr-dialog-failed-message").html(a)},unSetFailedMsg:function(){return this.dialog.$footer().find(".hr-dialog-failed-message").html("")},setSuccessMsg:function(a){return this.dialog.$footer().find(".hr-dialog-success-message").html(a).width(this.getMsgWidth())},unSetSuccessMsg:function(){return this.dialog.$footer().find(".hr-dialog-success-message").html("")},getMsgWidth:function(){var a;return a=0,this.dialog.$footer().find(".hr-dialog-button").each(function(b,c){return a+=$(c).width()+40}),this.dialog.$footer().find(".hr-dialog-buttons").width()-(a+15)}},a=function(a){var b,c,d,e;b={};if(!_.isObject(a))throw d=new Error,d.name="Argument Error",d.message="Argument to `Btn` can only be an object",d;a=$.extend(b,a);if(!a.dialog||!a.id)throw d=new Error,d.name="Argument Error",!a.dialog&&!a.id?d.message="reference to the `ShowDialog` object is missing as well as the id of the button is missing":a.id?d.message="reference to the `ShowDialog` object is missing":d.message="id of the button is missing",d;return a.$el||(a.$el=a.dialog.$el().find("#"+a.id)),c={dialog:a.dialog,id:a.id,$el:a.$el},e=j,c.prototype||(c.prototype={}),$.each(e,function(a,b){return c[a]=b}),c},k={render:function(){var b,c,d,e,f,g,h;return this.is_rendered||(h=this,g=this.options.title!==null?"<div class='hr-dialog-header'>"+this.options.title+"<a href='' class='close' data-analytics='"+this.options.analytics+"'><i class='icon-cancel-small'></i></a></div>":"",this.options.background?e="style='background: "+this.options.background+"' !important":e="",f="<div id='"+this.id+"' class='hr-dialog'  style='display: none;'>            <div class='hr-dialog-border' style='width:"+this.options.width+("px'>              <div class='hr-dialog-main-window' "+e+">                ")+g+"                <div class='hr-dialog-body'>"+this.options.body+"</div>                <div class='hr-dialog-footer'>                  <div class='hr-dialog-loader'></div>                  <div class='hr-dialog-success-message'></div><div class='hr-dialog-failed-message'></div>                  <div class='hr-dialog-buttons'></div><div class='clearfix'></div>                </div>              </div>            </div>          </div>",$("body").append(f),b=this.$el(),b.show(),this.renderPosition(),b.find("a.close").bind("click",function(a){return a.preventDefault(),typeof _gag!="undefined"&&_gaq.push(["_trackEvent","Events","buttonClick",$(a.srcElement).attr("data-analytics")]),h.destroy()}),$(document).keyup(function(a){if(a.keyCode===27)return h.destroy()}),this.options.events&&_.isObject(this.options.events)&&(h=this,_.each(this.options.events,function(a,c){var d,e,f,g;return g=c.indexOf(" "),d=c.substr(0,g),f=c.substr(g+1),e={$dialog:b,that:h},b.find(f).bind(d,e,a)})),c=h.$footer(),d=c.find(".hr-dialog-buttons"),_.each(this.options.buttons,function(b,c){var e,f,g,i;return i=h.id+"-fbtn-"+c,f="",b.analytics&&(f="data-analytics='"+b.analytics+"'"),d.append("<button "+f+" class='btn "+(b["class"]||"hr-dialog-button")+"' id='"+i+"'>"+b.name+"</button>"),e=d.find("#"+i),g=a({dialog:h,id:i,$el:e}),e.bind("click",function(a){return a.preventDefault(),g.setActive(),b.callback.call(g,h)})}),this.options.hide_footer&&this.$footer().css("border-top","none").css("background","none"),this.is_rendered=!0,h.onRender&&h.onRender.call()),this},renderPosition:function(a){var b,c,d,e,f;return a==null&&(a=null),a||(a=this),b=a.$el(),c=a.options,e=($(document).width()-c.width-10)/2,d=b.find(".hr-dialog-border").height(),f=(b.height()-d-10)/2,b.css("padding-top",f+"px"),b.css("padding-bottom",f+"px"),b.css("padding-right",e+"px"),b.css("padding-left",e+"px")},destroy:function(){var a;return a=this,$("#"+this.id).animate({opacity:0},250,function(){$(this).remove();if(a.options.onDestroy)return a.options.onDestroy.call()}),this},$el:function(){return $("#"+this.id)},$header:function(){return this.$el().find(".hr-dialog-header")},$body:function(){return this.$el().find(".hr-dialog-body")},$footer:function(){return this.$el().find(".hr-dialog-footer")},$main_window:function(){return this.$el().find(".hr-dialog-main-window")}},d=function(a,b){var c,d,e,f,g,h;b==null&&(b={}),e="",d=!1,c={width:450,title:"Dialog Window",body:"Dialog Body",analytics:"Dialog Analytics",buttons:[]};if(_.isObject(a))a=$.extend(c,a);else{if(a!==undefined)throw g=new Error,g.name="Argument Error",g.message="Argument to `ShowDialog` can only be an object",g;a=c}while(!d)e="hr-dialog-"+Math.round(Math.random()*1e10),$("#"+e).length===0&&(d=!0);return f={id:e,options:a},h=$.extend(k,b),f.prototype||(f.prototype={}),$.each(h,function(a,b){return f[a]=b}),f},f=function(a){var b,c,e,f,g,h,i,j,k,l,m,n,o;g={$form:function(){return this.$body().find("form")},form_set_notice:function(a){var b;return b=this.$body(),b.find(".alert .error").hide(),b.find(".alert .success").html(a).show()},form_set_error:function(a){var b;return b=this.$body(),b.find(".alert .success").hide(),b.find(".alert .error").html(a).show()},form_unset_alert:function(){var a;return a=this.$body(),a.find(".alert .error").hide(),a.find(".alert .success").hide()}},c={enctype:"application/x-www-form-urlencoded",fields:[]};if(_.isObject(a))a=$.extend(c,a);else{if(a!==undefined)throw h=new Error,h.name="Argument Error",h.message="Argument to `ShowFormDialog` can only be an object",h;a=c}a.body?b=a.body:b="",b+="<p class='alert hide'>          <span class='success' style='display: none; color: green;'></span>          <span class='error' style='display:none; color: red;'></span>        </p>        <form enctype='"+a.enctype+"'>",k=a.fields;for(i=0,j=k.length;i<j;i++)f=k[i],f.type!=="hidden"&&(b+="<div class='formgroup horizontal'>"),f.title&&(b+="<label for='name' class='pull-left span3'>"+f.title+"</label>"),b+="<div class='block span7 profile-input'>",(l=f.type)==="email"||l==="text"||l==="hidden"?b+="<input class='span6' ":(m=f.type)==="file"?b+="<div class='wrap_file span6'><input class='orig_file' ":f.type==="textarea"&&(b+="<textarea class='span6' style='resize:vertical;' rows='4'"),f.name&&(b+="name='"+f.name+"' "),f.type&&(b+="type='"+f.type+"' "),f.value&&(b+="value='"+f.value+"' "),f.disabled&&(b+="disabled='disabled' "),(n=f.type)==="email"||n==="text"||n==="hidden"?b+=" />":(o=f.type)==="file"?b+=' /><div class="fake_file"><div class="fake_file_text span4"></div><div class="fake_file_button btn btn-small">Select File</div></div></div>':f.type&&(b+=">",f.value&&(b+=value),b+="</textarea>"),f.hint&&(b+="<small class='sub-help'>"+f.hint+"</small><br>"),f.error&&(b+="<small class='error'></small>"),b+="</div>",f.type!=="hidden"&&(b+="</div>");return b+="</form>",e={"click .fake_file_button":function(a){var b;return b=$(a.target),b.parent().parent().find(".orig_file").trigger("click")},"change .orig_file":function(a){var b;return b=$(a.target),b.parent().parent().find(".fake_file_text").html(b.val().split("\\").pop())}},a.body=b,a.events=e,new d(a,g)},g=function(a){var c,e,f,g,h,i,j,k,l,m,n;h={},e={purpose:"login",hide_footer:!0,contest:"",redirect:!0,background:"transparent",title:null};if(_.isObject(a))a=$.extend(e,a);else{if(a!==undefined)throw n=new Error,n.name="Argument Error",n.message="Argument to `ShowLoginDialog` can only be an object",n;a=e}return a.purpose==="login"?(i="active",k="",j="",l="hide"):(k="active",i="",j="hide",l=""),b.CONTEST_SLUG?g=""+document.location.protocol+"//"+document.location.host+"/auth/forgot_password/"+b.CONTEST_SLUG:g=""+document.location.protocol+"//"+document.location.host+"/auth/forgot_password",c="<div class='login-group homepage_admin light-wrap'>        <ul class='login_tab unstyled horizontal clearfix'>            <li class='signup-toggle toggle "+k+"'><a href='/signup' data-toggle='tab'>Sign Up</a></li>            <li class='login-toggle toggle "+i+"'><a href='/login' data-toggle='tab'>Log In</a></li>        </ul>        <style>            .legacy-form input {                width: 390px;            }        </style>        <div class='homepage_signup signup "+l+"' id='signup'>            <form id='legacy-signup' class='legacy-form'>                <div class='homepage_signupgroup--legacy'>                    <div class='text-center alert error' style='display:none;'></div>                    <div class='formgroup'>                        <i class='icon-mail'></i>                        <input id='email' type='text' name='email' value=''                          placeholder='Your Email Address' data-content='' data-toggle='tooltip' data-placement='right'/>                    </div>                    <div class='formgroup'>                        <i class='icon-user'></i>                        <input id='username' type='text' name='username' value=''                          placeholder='Pick a username' data-content='' data-toggle='tooltip' data-placement='right'/>                    </div>                    <div class='formgroup'>                        <i class='icon-lock'></i>                        <input id='password' type='password' name='password'                          placeholder='Choose a password' data-content='' data-toggle='tooltip' data-placement='right'/>                    </div>                    <button class='btn btn-primary span4 block-center signup-button' name='commit' type='submit'                      value='request' data-analytics='SignupPassword' type='submit'>Create An Account</button>                </div>                <div class='homepage_signupgroup--social'>                    <p class='text-center block-margin small'>Or you can sign up with one of the following</p>                    <ul class='unstyled clearfix socialconnect_list homepage_socialconnect_list socialbuttons' id='social-signup'>                        <li class='facebook social_button'>                            <a class='btn btn-facebook btn-social' data-analytics='SignupFacebook'><i class='icon-facebook'></i> Facebook</a>                        </li>                        <li class='google social_button'>                            <a class='btn btn-google btn-social' data-analytics='SignupGoogle'><i class='icon-gplus'></i> Google</a>                        </li>                        <li class='github social_button'>                            <a class='btn btn-github btn-social' data-analytics='SignupGithub'><i class='icon-github'></i> GitHub</a>                        </li>                    </ul>                </div>            </form>        </div>        <div class='login "+j+"' id='login'>            <form id='legacy-login' class='legacy-form'>                <div class='homepage_signupgroup--legacy'>                    <div class='text-center alert error' style='display:none;'></div>                    <div class='formgroup'>                        <i class='icon-user'></i>                        <input id='login' type='text' name='login' value='' placeholder='Your username or email'/>                    </div>                    <div class='formgroup'>                        <i class='icon-lock'></i>                        <input id='password' type='password' name='password' placeholder='Your password' />                    </div>                    <div class='clearfix'>                        <label class='remember pull-left'><input type='checkbox' id='remember_me'> Remember me</label>                        <a target='_blank' href='"+g+"' class='cursor pull-right password-retrieve'>Forgot your password?</a>                    </div>                    <button class='btn btn-primary span4 block-center login-button auth' name='commit' type='submit'                      value='request' data-analytics='LoginPassword' type='submit'>Log In</button>                </div>                <div class='homepage_signupgroup--social'>                    <p class='text-center block-margin small'>Or you can log in with one of the following</p>                    <ul class='unstyled clearfix inline socialconnect_list homepage_socialconnect_list socialbuttons' id='social-signup'>                        <li class='facebook social_button'>                            <a class='btn btn-facebook btn-social' data-analytics='SignupFacebook'><i class='icon-facebook'></i> Facebook</a>                        </li>                        <li class='google social_button'>                            <a class='btn btn-google btn-social' data-analytics='SignupGoogle'><i class='icon-gplus'></i> Google</a>                        </li>                        <li class='github social_button'>                            <a class='btn btn-github btn-social' data-analytics='SignupGithub'><i class='icon-github'></i> GitHub</a>                        </li>                    </ul>                </div>            </form>        </div>    </div>",a.success_callback?m=a.success_callback:m=function(){},f={"click .login_tab li a":function(a){var b,c;a.preventDefault();if(!$(a.currentTarget).parent().hasClass("active"))return b=a.data,c=b.that,c.$el().find(".login_tab li a").each(function(a,b){return $(b).parent().hasClass("active")?$(b).parent().removeClass("active"):$(b).parent().addClass("active")}),c.$el().find(".login-group div#signup, .login-group div#login").each(function(a,b){return $(b).hasClass("hide")?$(b).removeClass("hide"):$(b).addClass("hide")})},"click a.btn-facebook":function(c){var d,e,f,g,h;return c.preventDefault(),d=c.data,h=600,e=350,f=screen.width/2-h/2,g=screen.height/2-e/2,window.login_callback=function(c){var e;return $("meta[name=csrf-token]").attr("content",c),b.appController?b.profile({fetch:!0}):a.redirect&&(b.CONTEST_SLUG?e=""+document.location.protocol+"//"+document.location.host+"/auth/login/"+b.CONTEST_SLUG:e=""+document.location.protocol+"//"+document.location.host+"/auth/login",document.location.href=e),d.that.destroy(),m()},window.open("/hackers/auth/facebook?display=popup","facebook_login","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+h+", height="+e+", top="+g+", left="+f)},"click a.btn-github":function(c){var d,e,f,g,h;return c.preventDefault(),d=c.data,h=960,e=500,f=screen.width/2-h/2,g=screen.height/2-e/2,window.login_callback=function(c){var e;return console.log(c),$("meta[name=csrf-token]").attr("content",c),b.appController?b.profile({fetch:!0}):a.redirect&&(b.CONTEST_SLUG?e=""+document.location.protocol+"//"+document.location.host+"/auth/login/"+b.CONTEST_SLUG:e=""+document.location.protocol+"//"+document.location.host+"/auth/login",document.location.href=e),d.that.destroy(),m()},window.open("/hackers/auth/github?display=popup","facebook_login","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+h+", height="+e+", top="+g+", left="+f)},"click a.btn-google":function(c){var d,e,f,g,h;return c.preventDefault(),d=c.data,h=600,e=500,f=screen.width/2-h/2,g=screen.height/2-e/2,window.login_callback=function(c){var e;return $("meta[name=csrf-token]").attr("content",c),b.appController?b.profile({fetch:!0}):a.redirect&&(b.CONTEST_SLUG?e=""+document.location.protocol+"//"+document.location.host+"/auth/login/"+b.CONTEST_SLUG:e=""+document.location.protocol+"//"+document.location.host+"/auth/login",document.location.href=e),d.that.destroy(),m()},window.open("/hackers/auth/google_oauth2?display=popup","google_login","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+h+", height="+e+", top="+g+", left="+f)},"click button.signup-button":function(c){var d,e,f,g;c.preventDefault();if($(c.currentTarget).attr("disabled")==="disabled")return;return $(c.currentTarget).attr("disabled","disabled"),$(c.currentTarget).html("Signing up.."),f=c.data,g=f.that,g.$body(),d=$(g.$body().find(".login-group div#signup")),b.CONTEST_SLUG?e=""+document.location.protocol+"//"+document.location.host+"/auth/signup/"+b.CONTEST_SLUG:e=""+document.location.protocol+"//"+document.location.host+"/auth/signup",f={username:d.find("input#username").val(),email:d.find("input#email").val(),password:d.find("input#password").val()},d.find(".error").html("").hide(),$.ajax({type:"POST",url:e,data:f,success:function(e){var f,h;return $(c.currentTarget).removeAttr("disabled","disabled"),e.status?($(c.currentTarget).html("Logging you in..."),b.appController?(b.profile({fetch:!0}),g.destroy()):a.redirect?(b.CONTEST_SLUG?h=""+document.location.protocol+"//"+document.location.host+"/auth/login/"+b.CONTEST_SLUG:h=""+document.location.protocol+"//"+document.location.host+"/login",document.location.href=h):g.destroy(),m()):($(c.currentTarget).html("Create An Account"),d.find(".error").html("").show(),e.errors.length>1?(f="<ul>",_.each(e.errors,function(a){return f+="<li>"+a+"</li>"},this),f+="</ul>",d.find(".error").html(f)):d.find(".error").html(e.errors[0]))}})},"click button.login-button":function(c){var d,e,f,g;c.preventDefault();if($(c.currentTarget).attr("disabled")==="disabled")return;return $(c.currentTarget).attr("disabled","disabled"),$(c.currentTarget).html("Logging in.."),f=c.data,g=f.that,g.$body(),d=$(g.$body().find(".login-group div#login")),b.CONTEST_SLUG?e=""+document.location.protocol+"//"+document.location.host+"/auth/login/"+b.CONTEST_SLUG:e=""+document.location.protocol+"//"+document.location.host+"/auth/login",f={login:d.find("input#login").val(),password:d.find("input#password").val(),remember_me:d.find("input#remember_me").is(":checked")},d.find(".error").html("").hide(),$.ajax({type:"POST",url:e,data:f,success:function(e){var f,h;return $(c.currentTarget).removeAttr("disabled","disabled"),e.status?($(c.currentTarget).html("Logging you in..."),b.appController?(b.profile({fetch:!0}),g.destroy()):a.redirect?(b.CONTEST_SLUG?h=""+document.location.protocol+"//"+document.location.host+"/auth/login/"+b.CONTEST_SLUG:h=""+document.location.protocol+"//"+document.location.host+"/login",document.location.href=h):g.destroy(),m()):($(c.currentTarget).html("Log In"),d.find(".error").html("").show(),e.errors.length>1?(f="<ul>",_.each(e.errors,function(a){return f+="<li>"+a+"</li>"},this),f+="</ul>",d.find(".error").html(f)):d.find(".error").html(e.errors[0]))}})}},a.body=c,a.analytics="Cancel Login",a.events=f,a.width=550,new d(a,h)},c=function(a){var b,c,e,f;e={showError:function(a){return this.$body().find(".alert").removeClass("success").addClass("error").html(a).show()},clearAlert:function(a){return this.$body().find(".alert").removeClass("success").removeClass("error").html("").hide()},showSuccess:function(a){return this.$body().find(".alert").addClass("success").removeClass("error").html(a).show()}},c={};if(_.isObject(a))a=$.extend(c,a);else{if(a!==undefined)throw f=new Error,f.name="Argument Error",f.message="Argument to `ShowLoginDialog` can only be an object",f;a=c}return b="      <p class='alert hide'></p>      ",a.body=b+a.body,new d(a,e)},e=function(a){var b,c,e,f,g;return f={},c={title:"Request a feature"},_.isObject(g)?g=$.extend(c,g):g=c,b='<form id="legacy-feature" class="show" style="display:block" onsubmit="return(false);">        <div class="formgroup clearfix m">            <div class="alert error" style="display: none;"></div>        </div>        <div class="formgroup horizontal clearfix">            <label for="name" class="pull-left span2">Name</label>            <div class="pull-left span4">                <input id="name" type="text" name="name" value="" placeholder="Name"/>            </div>        </div>        <div class="formgroup horizontal clearfix">            <label for="name" class="pull-left span2">Email</label>            <div class="pull-left span4">                <input id="email" type="text" name="email" value="" placeholder="Email"/>            </div>        </div>        <div class="formgroup horizontal clearfix">            <label for="name" class="pull-left span2">Feature</label>            <div class="pull-left span4">                <textarea id="feature" type="text" name="feature" value="" placeholder="Feature"></textarea>            </div>        </div>        <div class="text-center">          <button class="featureRequest-button btn btn-green btn-large block-center" style="width:340px;" name="submit" type="submit" data-analytics="FeatureRequest" value="sendrequest">Submit</button>        </div>        <div style="margin-bottom: 20px;"></div>      </form>',e={"click button.featureRequest-button":function(a){var b,c,d,e;a.preventDefault(),d=a.data.that,b=$(d.$body().find("form#legacy-feature")),c=$(a.currentTarget);if(c.attr("disabled")==="disabled")return;return c.attr("disabled","disabled").html("Sending Your Request"),b.find(".alert.error").hide(),e={name:b.find("input#name").val(),email:b.find("input#email").val(),feature:b.find("textarea#feature").val()},$.ajax({url:"/rest/feature_request",type:"POST",data:e,success:function(a){var e,f,g,h;c.removeAttr("disabled").html("Submit");if(a.status)return d.destroy();if(a.errors.length===0)e="Unknown Error";else if(a.errors.length===1)e=a.errors[0];else{e="<ul style='text-align: left;'>",g=a.errors.length-1;for(f=h=0;0<=g?h<=g:h>=g;f=0<=g?++h:--h)e+="<li>"+a.errors[f]+"</li>";e+="</ul>"}return b.find(".alert.error").show().html(e)}})}},g.body=b,g.analytics="Cancel Feature Request",g.events=e,g.width=400,new d(g,f)},i=function(a){var b,c,e;return e={},c={title:"Submission Disabled"},_.isObject(a)?a=$.extend(c,a):a=c,b='<div class="block-center text-center">        This challenge is disabled now.<br/>Please try this challenge after some time.      </div>',a.body=b,a.width=400,new d(a,e)},h=function(a){var c,d,e,g;return g={},d={title:"Message",username:null,width:350},_.isObject(a)?a=$.extend(d,a):a=d,c="",a.username!==null?(a.body="        <div>          <p>Send message to <a class='backbone' href='/"+a.username+"'>"+a.username+"</a></p>          <textarea id='message' rows='5' cols='28'></textarea>        </div>      ",a.getReceiver=function(){return"username-"+a.username}):(a.body="        <div>          <p>Send message to <input type='text' style='width: 170px; margin-left: 20px;' id='receiver_id' />          <textarea id='message' rows='5' cols='28'></textarea>        </div>      ",a.getReceiver=function(){return"username-"+$("#receiver_id").val()}),a.buttons=[{name:"Close",callback:function(a){return this.setInactive(),a.destroy()}},{name:"Send","class":"hr_primary-btn, btn-green",callback:function(c){var d,e;d=this,d.unSetFailedMsg();if($("#message").val().trim()===""){d.failed("Message can not be blank."),d.$el.removeClass("disabled");return}return d.setInactive(),d.$el.text("Sending"),e=a.getReceiver(),$.ajax({url:"/rest/messages",type:"POST",data:{sender_id:b.profile().id,receiver_id:""+a.getReceiver(),message:$("#message").val()},success:function(a){return d.$el.text("Send"),d.setActive(),a.status?(c.destroy(),b.appView.sidebarView.update(parseInt(a.model.message_thread_id)),b.router.navigate("/inbox/thread/"+a.model.message_thread_id,!0)):(d.failed(a.error),d.$el.removeClass("disabled"))},error:function(){return d.$el.text("Send"),d.failed("There was a problem sending a message"),d.$el.removeClass("disabled")}})}}],e=new f(a,g),e.onRender=function(){var a=this;return $("#receiver_id").focus(),$("#receiver_id").unbind(),$("#receiver_id").typeahead({minLength:3,menu:'<ul class="typeahead dropdown-menu margin-0" "margin:0px;"></ul>',source:function(a,b){return $.ajax({url:"/rest/hackers/autocomplete?q="+b+"&without=",type:"GET",success:function(b,c){return a.process(b)}})}})},e},b=(l=window.HR)!=null?l:{},b.util||(b.util={}),b.util.ShowDialog=d,b.util.ShowFormDialog=f,b.util.ShowLoginDialog=g,b.util.ShowConfirmationDialog=c,b.util.ShowFeatureRequestDialog=e,b.util.ShowSubmitDisabledDialog=i,b.util.ShowMessageDialog=h,window.HR||(window.HR=b)})}).call(this)