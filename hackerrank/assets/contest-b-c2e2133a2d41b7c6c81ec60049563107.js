(function(){var a=[].indexOf||function(a){for(var b=0,c=this.length;b<c;b++)if(b in this&&this[b]===a)return b;return-1};jQuery(function(){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W;return L=function(a,b){return b==null&&(b="-"),a.replace(/[ \t\n_]+/g,b).toLowerCase()},b=["type","value","placeholder","disabled","name"],J=function(a){var b,c,e,f,g,h;d.tab=a,c=$(".page-nav").find(".nav").find("li"),a!=="profile"?e="tab-"+a:e="profile-menu",h=[];for(f=0,g=c.length;f<g;f++)b=c[f],$(b).attr("id")!==e?h.push($(b).removeClass("active")):h.push($(b).addClass("active"));return h},D=function(a,b,c,d,e,f,g,h,i){var j,k,l,m,n,o,p,q,r;d==null&&(d=1),e==null&&(e=null),f==null&&(f=10),g==null&&(g=10),h==null&&(h="backbone"),i==null&&(i=!0);if(!a)return;d=parseInt(d),o='<div class="pagination"><ul>',Math.floor(g/2)>=d&&d>=1?p=1:p=d-Math.floor(g/2),l=Math.ceil(b/f),l===0&&(l=1),l>=p+(g-1)?k=p+(g-1):k=l,k-p<g-1&&(p=k-(g-1),p<1&&(p=1));if(k===p||_.isNaN(k))return"";d===1?m=!0:m=!1,d===l?n=!0:n=!1,m?(o+='<li class="disabled"><a><span class="double-caret left"></span><span class="double-caret left"></span></a></li>',o+='<li class="disabled"><a><span class="caret left"></span></a></li>'):(o+='<li><a class="'+h+'" data-page="1" href="'+c+'1"><span class="double-caret left"></span><span class="double-caret left"></span></a></li>',o+='<li><a class="'+h+'" data-page="'+(d-1)+'" href="'+c+(d-1)+'"><span class="caret left"></span></a></li>'),q=function(a){return a!==d?o+='<li><a class="'+h+'" data-page="'+a+'" href="'+c+a+'">'+a+"</a></li>":o+='<li class="active"><a class="'+h+'" data-page="'+a+'" href="'+c+a+'">'+a+"</a></li>"};for(j=r=p;p<=k?r<=k:r>=k;j=p<=k?++r:--r)q(j);return n?(o+='<li class="disabled"><a><span class="caret right"></span></a></li>',o+='<li class="disabled"><a><span class="double-caret right"></span><span class="double-caret right"></span></a></li>'):(o+='<li><a class="'+h+'" data-page="'+(d+1)+'" href="'+c+(d+1)+'"><span class="caret right"></span></a></li>',o+='<li><a class="'+h+'" data-page="'+l+'" href="'+c+l+'"><span class="double-caret right"></span><span class="double-caret right"></span></a></li>'),o+="</ul></div>",i&&(o+="<div class='pagination-sub block-center clearfix' style='width: 140px;'>",e!==null&&(o+="<div class='select-wrap' id='pagination-length'> <a href='' class='dropdown-toggle clearfix select-wrap' data-toggle='dropdown'> <span class='select'><span class='page-number'>"+f+"</span> per page</span><span class='indent'><b class='caret'></b></span> </a> <ul class='dropdown-menu unstyled' id='pagination-length-select'> <li><a href='#'>10</a></li> <li><a href='#'>20</a></li> <li><a href='#'>50</a></li> <li><a href='#'>100</a></li> </ul> </div>"),o+="</div>"),a.html(o),a.find("#pagination-length ul li a").bind("click",function(b){var c;b.preventDefault();if(e!==null){c=parseInt($(b.currentTarget).html());if(c&&!_.isNaN(c))return a.find(".page-number").html($(b.currentTarget).html()),$.cookie("pagination_per_page_limit",c,{expires:365}),e.setLimit(c),e.cached(),$("html body").animate({scrollTop:0},300)}}),a},Q=function(a){return a.replace(/^\s\s*/,"").replace(/\s\s*$/,"")},e=function(a,b,c,d){var e;b==null&&(b=!0),c==null&&(c=!1),d==null&&(d=.5),e=$("div#ajax-msg-wrap #ajax-msg"),e.length===0?($("div#ajax-msg-wrap").append('<div id="ajax-msg"><span class="ajax-loader"></span><span class="ajax-msg"></span></div>'),e=$("div#ajax-msg-wrap #ajax-msg")):e.show(),$(".track-nav-wrap").length>0?$("div#ajax-msg-wrap #ajax-msg").css("margin-top","102px"):$("div#ajax-msg-wrap #ajax-msg").css("margin-top","0px"),b?e.find(".ajax-loader").addClass("ajax-loading"):e.find(".ajax-loader").removeClass("ajax-loading"),e.find(".ajax-msg").html(a),e.css("margin-left",-1*(e.width()/2));if(c)return setTimeout("$('#ajax-msg').hide()",d*1e3)},x=function(a){var b,c,d,e,f,g;e=$(".countdowntimer"),g=[];for(c=0,d=e.length;c<d;c++)b=e[c],((f=$(b).attr("data-start-time"))!=null?f:"0000-00-00 00:00:00")&&$(b).attr("data-start-time")!==" "&&$(b).attr("data-start-time")!=="0000-00-00 00:00:00"&&g.push(function(a){var b;return b=$(a).attr("data-start-time").split(/[- :]/),$(a).countdown({until:new Date(b[0],b[1]-1,b[2],b[3],b[4],b[5]),layout:$(a).attr("data-text")+"{dn} {dl} {hnn}:{mnn}:{snn}",timezone:0,alwaysExpire:!0,onExpiry:function(){return $(this).html($(this).attr("data-done-text")),this}})}(b));return g},I=function(a,b){return $(window).scroll(function(){var c,d;if($(b).length>0){c=$(b).offset().top-40,d=$(a);if(document.documentElement.scrollTop>=c||window.pageYOffset>=c)return $.browser.msie&&$.browser.version==="6.0"?d.css("top",document.documentElement.scrollTop+15+"px"):d.css({top:"40px"});if(document.documentElement.scrollTop<c||window.pageYOffset<c)return d.css({position:"absolute",top:"0"})}})},R=function(a){var b,c,d,e,f;if(!a||!a.upload_url)return;return this.options=a,this.$upload_dialog=$("#upload-dialog"),this.$upload_dialog.length===0?($("body").append('<div id="upload-dialog"><div>'),this.$upload_dialog=$("#upload-dialog")):this.$upload_dialog.empty(),e=_.template($("#upload-dialog-template").html()),d=a.header_message?a.header_message:"File upload dialog",b=a.body_message?a.body_message:"",c=a.disable_weburl===!0?!0:!1,this.$upload_dialog.html(e({header_message:d,body_message:b,disable_weburl:c})),this.$upload_dialog.find("#fileupload-modal").modal(),f=this,this.$upload_dialog.find("a[data-toggle='tab']").bind("click",function(a){var b;return b=$(a.currentTarget).parent().siblings().find("a").attr("href"),$(f.$upload_dialog).find(b).find("input").val("")}),this.$upload_dialog.find("input.uploadurl").unbind(),this.$upload_dialog.find("input.uploadurl").bind("keypress",function(a){var b;b=a.keyCode?a.keyCode:a.which;if(b===13)return a.preventDefault(),f.$upload_dialog.find("a.upload").click()}),this.$upload_dialog.find("a.upload").bind("click",function(a){var b;if($(a.currentTarget).hasClass("disabled"))return;return f.$upload_dialog.find(".errorp").hide(),f.$upload_dialog.find(".successp").hide(),$(a.currentTarget).addClass("disabled"),$(a.currentTarget).button("loading"),b=f.options.data?f.options.data:{},$.ajax(f.options.upload_url,{data:b,files:$(":file",f.$upload_dialog),iframe:!0,processData:!0}).complete(function(b){var c;c=$.parseJSON(b.responseText),$(a.currentTarget).removeClass("disabled"),$(a.currentTarget).button("reset");if(!c.status)return f.$upload_dialog.find(".errorp").html(c.message),f.$upload_dialog.find(".errorp").show();f.options.success_message!==void 0?(f.$upload_dialog.find(".successp").html(f.options.success_message),f.$upload_dialog.find(".successp").show(),f.$upload_dialog.find("form").hide(),$(a.currentTarget).hide()):f.$upload_dialog.find("#fileupload-modal").modal("hide");if(f.options.parent_model&&f.options.parent_view)return f.options.parent_model.render_once=!1,f.options.parent_model.fetch({success:function(){var a;a=f.options.parent_view.activeTab;if(a)return f.options.parent_view.activeTab=3,f.options.parent_view.render(),f.options.parent_view.activeTab=a,f.options.parent_view.renderResume(!0)}})})})},C=function(a,b){var c;return c="0000000000"+a,c.substr(c.length-b)},A=function(){var a;d.mp_ping_interval!==void 0?d.mp_ping_interval+=2:d.mp_ping_interval=0,d.loggedin||(d.loggedin=!1),a={interval:d.mp_ping_interval,loggedin:d.loggedin};if(mpq!==void 0&&mpq.track!==void 0&&d.mp_ping_interval%10===0)return mpq.track("Ping",a)},c={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(a){var b,d,e,f,g,h,i,j,k;k="",b=void 0,d=void 0,e=void 0,f=void 0,g=void 0,h=void 0,i=void 0,j=0,a=c._utf8_encode(a);while(j<a.length)b=a.charCodeAt(j++),d=a.charCodeAt(j++),e=a.charCodeAt(j++),f=b>>2,g=(b&3)<<4|d>>4,h=(d&15)<<2|e>>6,i=e&63,isNaN(d)?h=i=64:isNaN(e)&&(i=64),k=k+this._keyStr.charAt(f)+this._keyStr.charAt(g)+this._keyStr.charAt(h)+this._keyStr.charAt(i);return k},decode:function(a){var b,d,e,f,g,h,i,j,k;k="",b=void 0,d=void 0,e=void 0,f=void 0,g=void 0,h=void 0,i=void 0,j=0,a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(j<a.length)f=this._keyStr.indexOf(a.charAt(j++)),g=this._keyStr.indexOf(a.charAt(j++)),h=this._keyStr.indexOf(a.charAt(j++)),i=this._keyStr.indexOf(a.charAt(j++)),b=f<<2|g>>4,d=(g&15)<<4|h>>2,e=(h&3)<<6|i,k=k+String.fromCharCode(b),h!==64&&(k=k+String.fromCharCode(d)),i!==64&&(k=k+String.fromCharCode(e));return k=c._utf8_decode(k),k},_utf8_encode:function(a){var b,c,d;a=a.replace(/\r\n/g,"\n"),d="",c=0;while(c<a.length)b=a.charCodeAt(c),b<128?d+=String.fromCharCode(b):b>127&&b<2048?(d+=String.fromCharCode(b>>6|192),d+=String.fromCharCode(b&63|128)):(d+=String.fromCharCode(b>>12|224),d+=String.fromCharCode(b>>6&63|128),d+=String.fromCharCode(b&63|128)),c++;return d},_utf8_decode:function(a){var b,c,d,e,f,g;g="",f=0,b=c=d=0;while(f<a.length)b=a.charCodeAt(f),b<128?(g+=String.fromCharCode(b),f++):b>191&&b<224?(d=a.charCodeAt(f+1),g+=String.fromCharCode((b&31)<<6|d&63),f+=2):(d=a.charCodeAt(f+1),e=a.charCodeAt(f+2),g+=String.fromCharCode((b&15)<<12|(d&63)<<6|e&63),f+=3);return g}},B=function(a){var b;return a>0?(b=a%10,b===1&&a!==11?a+"st":b===2&&a!==12?a+"nd":b===3&&a!==13?a+"rd":a+"th"):a},K=function(a){if(_.clone(a)!=="phackerprofile"||_.clone(a)!=="phackerboard")return $("body").append('<div style="position: absolute; top: 30%; left: 40%; background-color: #fff; border-radius: 15px; padding: 20px; border: 3px #ccc solid;"><p>You must <a href="user/login">login</a> before you can view this page</p></div>')},O=function(){var a,b,c;return this.$success_status=$("#success-status-wrap"),this.$success_status.length===0?($("body").append('<div id="success-status-wrap"><div>'),this.$success_status=$("#success-status-wrap")):this.$success_status.empty(),a=50,b={position:"fixed",top:"0px",left:"0px",height:a+"px","text-align":"center",width:"100%","z-index":"9999",background:"#333 url('public/images/success-bar-bg.jpg')"},c=this,_.each(b,function(a,b){return c.$success_status.css(b,a)}),$("body").addClass("home-status-padding"),$("body div.navbar.navbar-fixed-top").addClass("navbar-status-padding"),this.$success_status.hide(),this.$success_status.html("<div style='width: 960px; margin: 0px auto; position: relative;'>\n  <p style='margin-top:10px; font-size: 20px; color: white; padding-top: 3px;'>Congratulations! You have solved this problem!</p>\n</div>"),this.$success_status.fadeIn(),this.$success_status.find("a.closeit").die(),this},g=function(){var a;return a=$("#success-status-wrap"),a.length!==0&&(a.fadeOut(),$("body").removeClass("home-status-padding"),$("body div.navbar.navbar-fixed-top").removeClass("navbar-status-padding"),a.html("")),this},u=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o;o=new Date(0),o.setUTCSeconds(a),b=new Date,m=Math.floor((o-b)/1e3);if(m>0){d=Math.floor(m/86400),j=m%86400,f=Math.floor(j/3600),k=j%3600,h=Math.floor(k/60),l=k%60,c="",d>0&&(d===1?e="Day":e="Days",c+=""+d+" "+e+" ");if(d>0||f>0)f===1?g="Hour":g="Hours",c+=""+f+" "+g+" ";if(d>0||f>0||h>0)h===1?i="Minute":i="Minutes",c+=""+h+" "+i+" ";if(d>0||f>0||h>0||l>0)l===1?n="Second":n="Seconds",c+=""+l+" "+n}return c},h=function(a,b,c,d){var e,f;c==null&&(c=null),d==null&&(d=!1);if(!d&&a.data("timer_running"))return;window.el=a;if(b)return f=u(b),a.html(f),e=function(){return h(a,b,c,!0)},setTimeout(e,1e3),a.data("timer_running",!0);a.html("0 Seconds (Loading...)");if(c)return c()},U=function(c){var d;return d="",_.each(c,function(c,e){if(a.call(b,e)>=0)return d+=""+e+"='"+c+"' "},this),d},V=function(a){var b;return b=!1,_.each(a,function(a,c){if(a.type==="file")return b=!0}),b!=null?b:{"multipart/form-data":"application/x-www-form-urlencoded"}},f=function(a,b,c,d){var e;d==null&&(d={}),_.each(c,function(c,d){var e,f,g,h;return(g=c.type)==="color"||g==="date"||g==="datetime"||g==="datetime-local"||g==="email"||g==="month"||g==="number"||g==="password"||g==="range"||g==="search"||g==="tel"||g==="text"||g==="time"||g==="url"||g==="week"||g==="file"||g==="image"?(e="input",f="input[name="+d+"]"):c.type==="file"?(e="change",f="input[name="+d+"]"):c.type==="checkbox"?(e="change",f="input[name="+d+"]"):c.type==="image"?(e="click",f="input[name="+d+"]"):c.type==="textarea"?(e="input",f="textarea[name="+d+"]"):((h=c.type)==="radio"||h==="select")&&"",a.find("form "+f).bind(e,function(a){var e;return e={},c.type==="checkbox"?e[d]=$(a.currentTarget).is(":checked"):e[d]=$(a.currentTarget).val(),b.set(e,{silent:!0}),b.trigger("modified")})},this),b.bind("modified",function(){return d.submit&&d.submit.enable&&d.submit.enable.that&&d.submit.enable.callback&&d.submit.enable.callback.call(d.submit.that),a.find("form input[type=submit]").removeAttr("disabled"),a.find("form input[type=reset]").removeAttr("disabled")}),b.bind("reset",function(){return a.find("form input[type=submit]").attr("disabled","disabled"),a.find("form input[type=reset]").attr("disabled","disabled")}),a.find("form input[type=reset]").click(function(b){return a.find("form input[type=submit]").attr("disabled","disabled"),a.find("form input[type=reset]").attr("disabled","disabled"),a.find("form").get(0).reset()}),e=function(c){return c==null&&(c=null),c!==null&&c.preventDefault(),b.save(null,{success:function(b){return a.find("form input[type=submit]").attr("disabled","disabled"),a.find("form input[type=reset]").attr("disabled","disabled")}})},a.find("form input[type=submit]").click(e);if(d.submit&&d.submit.action&&d.submit.action.that&&d.submit.action.callback)return d.submit.action.that[d.submit.action.callback]=e},p=function(a,b){var c,d;return c=V(a),d="<form enctype='"+c+"'>",_.each(a,function(a,c){var e,f,g,h,i,j,k,l,m,n,o;j=c,a.name=j,a.value=b.get(c),a.type||(a.type="text");if((k=a.type)==="color"||k==="date"||k==="datetime"||k==="datetime-local"||k==="email"||k==="month"||k==="number"||k==="password"||k==="range"||k==="search"||k==="tel"||k==="text"||k==="time"||k==="url"||k==="week"||k==="file"||k==="image"||k==="radio"||k==="checkbox"||k==="textarea"||k==="select")return a.type==="checkbox"?(i="5",g="4"):(i="3",g="6"),d+="<div class='formgroup horizontal'>",h=a.label||j,d+="<label for='"+j+"' class='pull-left span"+i+"' style='text-align: left; padding-left: 10px;' >"+h+"</label>",d+="<div class='block span"+(g+1)+"'>",(l=a.type)==="color"||l==="date"||l==="datetime"||l==="datetime-local"||l==="email"||l==="month"||l==="number"||l==="password"||l==="range"||l==="search"||l==="tel"||l==="text"||l==="time"||l==="url"||l==="week"||l==="file"||l==="image"?(d+="<input class='span"+g+"' ",d+=U(a),d+="/>"):(m=a.type)!=="radio"&&m!=="select"&&((n=a.type)==="textarea"?(d+="<textarea",d+=U(a),d+=">",a.value&&(d+=a.value),d+="</textarea>"):a.type==="checkbox"&&(d+="<div class='switch' data-on='success' data-off='info'><input name='"+j+"' type='"+a.type+"'",a.value&&(d+="checked='checked'"),d+="></div>")),f=a.hint||"",e=a.error||"",d+="<small class='sub-help'>"+f+"</small><br>",d+="<small class='error'>"+e+"</small>",d+="</div>",d+="</div>";if((o=a.type)!=="button"&&o!=="submit"&&o!=="reset"&&a.type==="hidden")return d+="<input ",d+=U(a),d+=">"},this),d+="</form>"},M=function(a,b){return a-b},F=function(a,b){var c;return c=new d.BreadCrumbsView({collection:b}),$(a).html(c.render().el),c},w=function(a){return a===""||a===void 0?"":String(a).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},v=function(a){return String(a).replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")},n=function(a,b){var c;return c={},_.each(b,function(b){return function(b){var d;return d=a.find("#"+b),d.length>0?d.attr("type")==="checkbox"?c[b]=d.is(":checked"):c[b]=d.val():console.warn("HR::Util::FormData:: Cannot Find field #"+b)}}(this)),c},H=function(a){return a==null&&(a=0),$("html body").animate({scrollTop:0},a)},G=function(a){return a==null&&(a=0),$("html, body").animate({scrollTop:$(document).height()},a)},P=function(a){var b,c,d;return b=a||new Date,c=b+"",d=c.match(/\(([^\)]+)\)$/)||c.match(/([A-Z]+) [\d]{4}$/),d&&(d=d[1].match(/[A-Z]/g).join("")),!d&&/(GMT\W*\d{4})/.test(c)?RegExp.$1:d},k=function(a){return["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][a.getMonth()]},l=function(a){return["January","February","March","April","May","June","July","August","September","October","November","December"][a.getMonth()]},i=function(a){return a.getHours()%12},j=function(a){return a.getHours()<12?"AM":"PM"},T=function(a){var b,c,d;return d=a.split(":"),d.length===2?(b=parseInt(d[0]),c=parseInt(d[1]),!_.isNaN(b)&&!_.isNaN(c)?b<24&&b>=0&&c<60&&c>=0?!0:!1:!1):!1},S=function(a){var b,c,d,e,f;return b=a.split("/"),b.length===3?(e=parseInt(b[0]),d=parseInt(b[1]),f=parseInt(b[2]),!_.isNaN(e)&&!_.isNaN(d)&&!_.isNaN(f)?e>0&&e<=12&&d>0&&d<=31&&f>=1970&&f<2038?(c=31,e===1||e===3||e===5||e===7||e===8||e===10||e===12?c=31:e===4||e===6||e===9||e===11?c=30:f%4===0?c=29:c=28,e<=c?!0:!1):!1:!1):!1},s=function(a,b){var c,d,e,f,g,h,i,j;return S(a)&&T(b)?(d=a.split("/"),h=b.split(":"),c=d[0],e=d[1],i=d[2],f=h[0],g=h[1],j=new Date(i,c-1,e,f,g,0),j.getTime()/1e3):null},t=function(a){var b,c,d,e;a==null&&(a=[]),c="<ul>";for(d=0,e=a.length;d<e;d++)b=a[d],c+="<li>"+b+"</li>";return c+="</ul>",c},r=function(a){var b;return b=new Date(0),b.setUTCSeconds(a),b},N=function(a){var b;return b={},b.dd=a.getDate(),b.MM=a.getMonth()+1,b.yyyy=a.getFullYear(),b.hh=a.getHours(),b.mm=a.getMinutes(),b.dd<10?b.dd="0"+b.dd:b.dd=""+b.dd,b.MM<10?b.MM="0"+b.MM:b.MM=""+b.MM,b.hh<10?b.hh="0"+b.hh:b.hh=""+b.hh,b.mm<10?b.mm="0"+b.mm:b.mm=""+b.mm,b},o=function(a,b){var c,d,e;b==null&&(b=!1),d="<div class='difficulty-indicator'>";if(a>0&&a<6){c=a,e=5-a;if(!b)while(e>0)d+="<div class='d0 pull-right'></div>",e-=1;while(c>0)d+="<div class='d"+(6-c)+" pull-right'></div>",c-=1}else console.error("difficulty should be < 6 and > 0");return d+="</div>",d},m=function(a){if(_.isString(a))return a;if(_.isNaN(a)||_.isNull(a))return"";if(_.isObject(a))return"<ul>"+_.map(a,function(a,b){return"<li><strong>"+_.capitalize(b)+":</strong> "+a+"</li>"})+"<ul>";if(_.isArray(a))return"<ul>"+_.map(a,function(a){return"<li>"+a+"</li>"})+"<ul>"},q=function(a){var b;return a.close===!0?b="":b="hide","<div class='moderator-container' data-username='"+a.name+"'> <div class='moderator-close'> <a class='btn btn-text small msR cursor "+b+" remove-moderator' data-username='"+a.name+"'><i class='icon-cancel-small'></i></a> </div> <div class='moderator-avatar'> <img height='50' width='50' class='pull-left msR avatar profile_avatar' src='"+a.avatar+"' > </div> <div class='moderator-details'> <p class='moderator-name'>"+a.name+"</p> <p class='moderator-role'>"+a.role+"</p> </div> </div>"},z=function(a){var b;return b='<span class="inline-throbber loading"> <i class="icon2-status_correct txt-green throbber-success"></i> </span>',d.loadingButton=a,d.util.removeAllInlineThrobbers(!1),$(b).insertAfter(a).fadeIn("normal")},y=function(a){var b;if(!d.loadingButton)return;return a.message==="Success"?(b='<span class="inline-throbber success"> <i class="icon2-status_correct txt-green throbber-success"></i> </span>',setTimeout(function(a){return function(){return d.util.removeAllInlineThrobbers(!1),$(b).insertAfter(d.loadingButton).fadeIn("normal")}}(this),500),setTimeout(function(a){return function(){return d.util.removeAllInlineThrobbers(!0),d.loadingButton=""}}(this),3e3)):(d.util.removeAllInlineThrobbers(!0),setTimeout(function(b){return function(){return d.util.ajaxmsg(a.message,!1,!1,5e3,300)}}(this)))},E=function(a){return a?$(d.loadingButton).siblings(".inline-throbber").fadeOut("fast",function(){return this.remove()}):$(d.loadingButton).siblings(".inline-throbber").remove()},d=(W=window.HR)!=null?W:{},d.util||(d.util={}),d.util.log=Backbone.log,d.util.pagination=D,d.util.trim=Q,d.util.ajaxmsg=e,d.util.initializeTimers=x,d.util.semiFix=I,d.util.uploadDialog=R,d.util.padZeros=C,d.util.mp_ping=A,d.util.Base64=c,d.util.numberSuffix=B,d.util.showLoginError=K,d.util.successStatus=O,d.util.closeSuccessStatus=g,d.util.htmlEncode=w,d.util.htmlDecode=v,d.util.setTab=J,d.util.countdownTimer=h,d.util.genFormHTML=p,d.util.bindFormEvents=f,d.util.sortNumbers=M,d.util.formData=n,d.util.scrollToTop=H,d.util.scrollToBottom=G,d.util.renderBreadCrumbs=F,d.util.slugify=L,d.util.getRemainingTime=u,d.util.timezone_abbr=P,d.util.date_getMon=k,d.util.date_getMonth=l,d.util.date_get12hour_hour=i,d.util.date_get12hour_offset=j,d.util.validate_time=T,d.util.validate_date=S,d.util.getEpochTimeStampFromDateTime=s,d.util.getErrorList=t,d.util.getDateFromEpoch=r,d.util.splitDate=N,d.util.genDifficultyIndicators=o,d.util.genModContainer=q,d.util.error_html=m,d.util.inlineLoadingStart=z,d.util.inlineLoadingEnd=y,d.util.removeAllInlineThrobbers=E,window.HR||(window.HR=d)}),String.prototype.endsWith=function(a){return this.indexOf(a,this.length-a.length)!==-1},String.prototype.startsWith=function(a){return this.indexOf(a)===0}}).call(this)