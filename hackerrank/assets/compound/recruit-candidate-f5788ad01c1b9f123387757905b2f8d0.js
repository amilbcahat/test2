(function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.initialize=function(a,b){return a==null&&(a={}),b==null&&(b={}),b.casual&&(this.casual={},this.casual.min_fetch_timelapse=1e4,this.casual.timestamp=(new Date).getTime()),this.caching==null&&(this.caching=!0),e.__super__.initialize.call(this,a,b)},e.prototype.url=function(){return""+this.restURL()+"?"+this.queryParams()},e.prototype.queryParams=function(){return""},e.prototype.setCaching=function(a){this.caching=a},e.prototype.restPrefix=!0,e.prototype.restURL=function(){var a,b;return b=""+this.ns(a=!0)+this.baseURL(),""+c.restURL(b,this.restPrefix)},e.prototype.pageURL=function(){return""+this.ns()+this.baseURL()},e.prototype.baseURL=function(){return"/dummy"},e.prototype.ns=function(a){return a==null&&(a=!1),this.collection&&(this.contest_slug||(this.contest_slug=this.contest_slug||this.get("contest_slug")||this.collection.contest_slug)),this.contest_slug||(this.contest_slug=c.appController.get_current_contest_slug()),c.namespace(this.contest_slug,a)},e.prototype.hasChanged=function(a){return e.__super__.hasChanged.call(this,a)},e.prototype.keyPrefix=function(){return c.profile().get("key_prefix")},e.prototype.modelCrumbs=function(){var a;return a=c.collection("bread-crumbs"),this.id&&a.add({id:""+this.constructor.name+"-"+this.id,slug:this.get("slug")||this.get("id"),path:this.pageURL(),name:this.get("name")||this.get("title"),model:this}),a},e.prototype.setContestCrumb=function(){var a,b,d=this;b=this.contest_slug||this.get("contest-slug");if(b)return a=c.model("contest",{slug:this.contest_slug}).cached({success:function(a){return d.crumbs.merge(a.breadCrumbs(),{at:0})}})},e.prototype.breadCrumbs=function(){return this.crumbs||(this.crumbs=c.collection("bread-crumbs"),this.setContestCrumb()),this.crumbs.merge(this.modelCrumbs()),this.crumbs},e.prototype.save=function(a,b,c){return this.id&&this.caching&&this.cacheSet(a,b,c),this.collection&&this.collection.flush(),Backbone.Model.prototype.save.apply(this,arguments)},e.prototype.parse=function(a,b){var c,d,f,g,h,i,j;if(b!==void 0||a.model){this.sync_status=!0,f=["total","page","activities","gamedata","status","metadata","errors"],g=this,h=function(b){if(a[b]!==void 0)return g[b]=a[b]};for(i=0,j=f.length;i<j;i++)c=f[i],h(c);d=e.__super__.parse.call(this,a.model,b)}else d=e.__super__.parse.call(this,a,b);return d},e}(Backbone.Model),c=(e=window.HR)!=null?e:{},c.GenericModel=a})}).call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b},c=[].indexOf||function(a){for(var b=0,c=this.length;b<c;b++)if(b in this&&this[b]===a)return b;return-1};jQuery(function(){var a,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v;return f=function(c){function d(){return m=d.__super__.constructor.apply(this,arguments),m}return b(d,c),d.prototype.template="recruit/question-list",d.prototype.className="candidate-qlist",d.prototype.events={"click .test-done":"testDone","click .next-section":"sectionNext"},d.prototype.initialize=function(b){return this.model=a.candidate.candidateAttemptModel,this.tid=a.candidate.candidateTestModel.get("unique_id"),this.aid=this.model.get("id")},d.prototype.render=function(){var b,c,d,e,f,g,h=this;return d=this.model.get("questions"),f=this.model.get("solve_mapping"),e=this.model.get("sections_mapping"),b=this.model.get("section"),$(this.el).html(a.appController.template(this.template,this)({section_count:e?e.length:1,current_section:b?b:1})),e?(c=0,_.each(e,function(a,e){var g;return g=h.getTable(d.slice(c,c+parseInt(a.questions)),c+1,f,e+1!==b),h.$("table.section"+(e+1)).html(g),c+=parseInt(a.questions)}),e.length>1&&b<e.length&&this.$("button.section-finish-"+b).removeClass("hidden")):(g=this.getTable(d,1,f),this.$("table.section1").html(g)),this},d.prototype.getTable=function(a,b,c,d){var e,f,g;return d==null&&(d=!1),g=this.tid,f=b,e="",_.each(a,function(a){var b,h;return h="",f===1?h+='<tr class="border">':h+="<tr>",h+="<td width='5%' class='grey right'>Q"+f+" &nbsp;&nbsp;</td>",h+='<td width="35%"><a class="backbone question-name" ',d?h+=">":h+="href='/tests/"+g+"/questions/"+a.id+"'>",a.name?h+=a.name:h+="Question",h+="</a></td>",h+="<td width='14%'>"+window.istreet.cfg.hrqn[a.type]+"</td>",a.points===0?h+="<td width='12%'>-</td>":h+="<td width='12%'>"+a.points+"</td>",d?b="":b="href='/tests/"+g+"/questions/"+a.id+"'",_.has(c,a.id)?h+="<td width='17%'><span class='green'>attempted</span></td><td width='17%' class='right'><a "+b+" class='margin-right-15 backbone' style='margin: 9px 11px 9px 0; display: block;''>Modify Submission</a></td>":h+="<td width='17%' >not answered</td><td width='17%' class='right'><a "+b+" class='btn btn-line margin-right-15 backbone'>View</a></td>",h+="</tr>",f++,e+=h}),e},d.prototype.testDone=function(b){return bootbox.dialog({message:"Once closed, you can no longer view or modify this test.\n\nAre you sure you are done, and want to close the test?",title:"Confirm test close.",buttons:{closeTest:{label:"Yes, close this test.",className:"btn-dark",callback:function(){var b=this;return a.candidate.candidateTestModel.setAction("logout"),a.candidate.candidateTestModel.save(null,{success:function(b){return a.router.navigate("tests/"+b.get("unique_id")+"/feedback",{trigger:!0,replace:!0})}})}},goBack:{label:"No, go back.",className:"btn",callback:function(){}}}})},d.prototype.sectionNext=function(b){var c=this;return a.candidate.candidateAttemptModel.set("section_close",this.$(b.currentTarget).attr("data-section")),a.candidate.candidateAttemptModel.save(null,{success:function(b){return a.candidate.candidateAttemptModel=b,a.router.navigate("tests/"+c.aid,{trigger:!0,replace:!0})},error:function(a){return console.log("Could not close and move to next section.")}})},d}(window.HR.GenericView),h=function(c){function d(){return n=d.__super__.constructor.apply(this,arguments),n}return b(d,c),d.prototype.template="recruit/question-base",d.prototype.className="question-base",d.prototype.initialize=function(b){return this.model=b.model,this.tid=a.candidate.candidateTestModel.get("unique_id")},d.prototype.events={"click .ans-submit":"submitAnswer"},d.prototype.submitAnswer=function(b){var c,d,e,f=this;return b.preventDefault(),c={type:this.model.attributes.type,answer:this.view.answer()},c.answer?(d={qid:this.model.get("id"),answer:c},e=new a.CandidateSolveModel,e.setAttempt(a.candidate.candidateAttemptModel.get("id")),e.save(d,{success:function(a){return f.$(".link-next").click()},error:function(){return bootbox.alert("Unable to submit.")}})):bootbox.alert("Please answer the question before submitting.")},d.prototype.render=function(){var b;this.question=this.model.attributes,$(this.el).html(a.appController.template(this.template,this)({tid:this.tid,question:this.question})),b=!0;switch(this.question.type){case"code":case"approx":this.view=new a.RecruitCandidateCodingView({question:this.question});break;case"mcq":case"multiple_mcq":this.view=new a.RecruitCandidateMcqView({question:this.question});break;case"textAns":this.view=new a.RecruitCandidateSubjectiveView({question:this.question});break;default:b=!1}return this.question.name?this.$(".qtitle").html(this.question.name):this.$(".qtitle").html(window.istreet.cfg.hrqn[this.question.type]),this.question.nextqid?(this.$(".link-next").attr("href","/tests/"+this.tid+"/questions/"+this.question.nextqid),this.$(".link-next").html('Next&nbsp;&nbsp;<i class="icon--single icon-right-open-mini"></i>')):(this.$(".link-next").attr("href","/tests/"+this.tid+"/questions"),this.$(".link-next").html("List")),this.question.prevqid?(this.$(".link-prev").attr("href","/tests/"+this.tid+"/questions/"+this.question.prevqid),this.$(".link-prev").html('<i class="icon--single icon-left-open-mini"></i>&nbsp;&nbsp;Prev')):(this.$(".link-prev").attr("href","/tests/"+this.tid+"/questions"),this.$(".link-prev").html("List")),this.$(".challenge-text").html(this.question.question),b?this.$(".qcontent").html(this.view.render().el):(this.$(".qcontent").html("<center>This question type is not available.</center>"),this.$(".ans-submit").addClass("disabled")),this},d}(window.HR.GenericView),d=function(c){function d(){return o=d.__super__.constructor.apply(this,arguments),o}return b(d,c),d.prototype.template="recruit/question-coding",d.prototype.className="question-coding",d.prototype.initialize=function(b){return this.question=b.question,this.codeshell=null,this.aid=a.candidate.candidateAttemptModel.get("id"),this.compilingLock=!1,this},d.prototype.events={"codeshellcompile #editor":"compileAnswer"},d.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)({question:this.question})),this.$("#editor").codeshell({languages:this.question.allowedLanguages.split(","),language:"c",autoSaveNamespace:""+this.aid+"-"+this.question.id,lang_default_text:this.getLangDefaults(),showSubmit:!0}),this.$("#editor").codeshell("refresh"),this.set_answer(),this},d.prototype.getLangDefaults=function(){var a,b,c,d,e;b={},e=this.question.allowedLanguages.split(",");for(c=0,d=e.length;c<d;c++)a=e[c],this.question[a+"_template"]&&(b[a]=this.question[a+"_template"]);return b},d.prototype.compileAnswer=function(b,c){var d=this;if(!c.code)return;return a.candidate.ctmodel=new a.CandidateCompileTestModel,a.candidate.ctmodel.setAid(this.aid),a.candidate.ctmodel.setQid(this.question.id),a.candidate.ctview=new a.RecruitCandidateCompileTestView,this.$("#runstatus").html(a.candidate.ctview.render().el),a.util.scrollToBottom(1e3),a.candidate.ctmodel.save(c,{success:function(b){return a.candidate.ctview.setStatus("Uploaded. Waiting for results.."),a.candidate.ctloop=setTimeout(d.checkForResult,2e3)},error:function(){return a.candidate.ctmodel=null,a.candidate.ctview.setStatus("There was an issue with compiling this code.")}})},d.prototype.checkForResult=function(){var b=this;if(!a.candidate.ctloop)return;return a.candidate.ctview.setStatus("Processing.."),a.candidate.ctmodel.fetch({success:function(c){var d,e,f,g,h,i,j,k,l,m;if(c.get("status")===0){a.candidate.ctloop=setTimeout(b.checkForResult,2e3);return}if(c.get("status")!==0){clearTimeout(a.candidate.ctloop),a.candidate.ctloop=null;if(c.get("result")>0)a.candidate.ctview.setStatus("Error.","red"),a.candidate.ctview.setCompileStatus("Compilation failed.",c.get("compilemessage"));else{i=0,m=c.get("stdin");for(e=k=0,l=m.length;k<l;e=++k)f=m[e],h=c.get("stdout")[e],d=c.get("expected_output")[e],g=c.get("testcase_message")[e],c.get("testcase_status")[e]===1?(j="green",i++):j="red",a.candidate.ctview.addTestCase(e+1,f,h,d,g,j);i===0?a.candidate.ctview.setStatus("No test cases passed.","red"):i<e?a.candidate.ctview.setStatus("Compiled successfully. "+i+"/"+e+" test cases passed.","orange"):a.candidate.ctview.setStatus("Compiled successfully. All test cases passed!","green")}}return a.util.scrollToBottom(1e3)},error:function(b){return a.candidate.ctmodel=null,a.candidate.ctview=null,a.candidate.ctview.setStatus("Unable to fetch compile information from server.")}})},d.prototype.answer=function(){return this.$("#editor").codeshell("value")},d.prototype.set_answer=function(){if(this.question.solve)return this.$("#editor").codeshell("setValue",this.question.solve.answer)},d}(window.HR.GenericView),g=function(c){function d(){return p=d.__super__.constructor.apply(this,arguments),p}return b(d,c),d.prototype.template="recruit/question-mcq",d.prototype.className="question-mcq",d.prototype.events={"click .clearall":"clearAll"},d.prototype.initialize=function(a){return this.question=a.question},d.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)({question:this.question})),this.set_answer(),this},d.prototype.clearAll=function(a){return a.preventDefault(),this.$('input[name="mcqopts"]').attr("checked",!1)},d.prototype.answer=function(){var a,b=this;return this.question.type==="mcq"?(a=this.$("input[name=mcqopts]:checked").val(),a?a:-1):(a=[],_.each(this.$("input[name=mcqopts]:checked"),function(c){return a.push(b.$(c).val())}),a.length?a:-1)},d.prototype.set_answer=function(){var a,b,c,d,e;if(!this.question.solve)return;if(this.question.type==="mcq")return this.$("input#mcqopts"+this.question.solve.answer.answer).prop("checked",!0);d=this.question.solve.answer.answer,e=[];for(b=0,c=d.length;b<c;b++)a=d[b],e.push(this.$("input#mcqopts"+a).prop("checked",!0));return e},d}(window.HR.GenericView),j=function(c){function d(){return q=d.__super__.constructor.apply(this,arguments),q}return b(d,c),d.prototype.template="recruit/question-subjective",d.prototype.className="question-subjective",d.prototype.initialize=function(a){return this.question=a.question},d.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)({question:this.question})),this.set_answer(),this},d.prototype.answer=function(){return this.$(".sub-answer").val()},d.prototype.set_answer=function(){if(this.question.solve)return this.$(".sub-answer").val(this.question.solve.answer.answer)},d}(window.HR.GenericView),l=function(c){function d(){return r=d.__super__.constructor.apply(this,arguments),r}return b(d,c),d.prototype.template="recruit/topbar",d.prototype.className="topbar",d.prototype.render=function(){var b,c,d,e=this;return $(this.el).html(a.appController.template(this.template,this)),d=_.keys(a.candidate.candidateAttemptModel.get("solve_mapping")).length,c=a.candidate.candidateAttemptModel.get("questions").length,this.$(".qdone").html(d),this.$(".qcount").html(c),this.$(".progress-done").css({width:Math.floor(d*100/c)}),b=new Date,b.setTime(b.getTime()+a.candidate.candidateAttemptModel.get("time_left")*1e3),a.candidate.end_time=b,a.candidate.timerInterval&&clearInterval(a.candidate.timerInterval),a.candidate.timerInterval=setInterval(function(){var b,c,d,f,g,h;return f=Math.floor((a.candidate.end_time.getTime()-(new Date).getTime())/1e3),d=("0"+Math.floor(f/60)).slice(-2),g=("0"+f%60).slice(-2),b=""+d+":"+g,f>610?(h=Math.floor(f/60)+"m remaining",c=""):f>180?(h=b,c="time-short"):f>0?(e.$("#countdown-timer").removeClass("time-short"),h=b,c="time-critical"):(e.$("#countdown-timer").removeClass("time-critical"),h="<strong>Test done!</strong>",c=""),e.$("#countdown-timer").html(h),e.$("#countdown-timer").addClass(c),a.candidate.timertxt=h,a.candidate.timercls=c},1e3),a.candidate.timertxt&&(this.$("#countdown-timer").html(a.candidate.timertxt),this.$("#countdown-timer").addClass(a.candidate.timercls)),this},d}(window.HR.GenericView),i=function(d){function e(){return s=e.__super__.constructor.apply(this,arguments),s}return b(e,d),e.prototype.template="recruit/sidebar",e.prototype.className="sbar",e.prototype.icon_types={QUESTION_ANSWERED:"nav",QUESTION_UNANSWERED:1,QUESTION_LIST:2},e.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)),this.$(".fixed-nav").html(this.getTopIcons()),this.$(".questions-nav").html(this.getQuestionIcons()),this},e.prototype.getTopIcons=function(){var b;return a.candidate.currentQuestion?b="":b="active",'<li class="'+b+'"><a href="/tests/'+a.candidate.candidateTestModel.get("unique_id")+'/questions" class="backbone"><i class="nav-icon icon-list-bullet-large"></i><span class="nav-text">Question List</span></a></li>'},e.prototype.getQuestionIcons=function(){var b,d,e,f,g,h,i,j,k,l,m;f="",h=function(a,b,c,d,e){var f,g,h;return g=a?"answered":"not-answered",h=b?"disabled":"",f=c?"active":"",'<li class="'+g+" "+h+" "+f+'">\n  <a href="'+d+'" class="backbone">\n      <span class="quest-number">'+e+"</span>\n  </a>\n</li>"},j=a.candidate.candidateAttemptModel.get("questions"),e=_.keys(a.candidate.candidateAttemptModel.get("solve_mapping")),g=1;for(k=0,l=j.length;k<l;k++)i=j[k],d=(m=i.id.toString(),c.call(e,m)>=0),b=i.id===a.candidate.currentQuestion,i.disabled?f+=h(d,!0,b,"javascript:void(0)",g):f+=h(d,!1,b,"/tests/"+a.candidate.candidateTestModel.get("unique_id")+"/questions/"+i.id,g),g=g+1;return f},e}(window.HR.GenericView),e=function(c){function d(){return t=d.__super__.constructor.apply(this,arguments),t}return b(d,c),d.prototype.template="recruit/compiletest-base",d.prototype.className="ct-base",d.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)),this},d.prototype.setStatus=function(a,b){b==null&&(b=""),this.$(".status-msg").html(a);if(b!=="")return this.$(".status-msg").addClass(b)},d.prototype.setCompileStatus=function(a,b){return this.$(".compile-header").html(a),this.$(".compile-message").html(b),this.$("#error-message").removeClass("hide")},d.prototype.addTestCase=function(b,c,d,e,f,g){return this.$(".testcases").append((new a.RecruitCandidateTestCaseView({tno:b,input:c,output:d,exp_output:e,st_class:g,compiler_msg:f})).render().el)},d}(window.HR.GenericView),k=function(c){function d(){return u=d.__super__.constructor.apply(this,arguments),u}return b(d,c),d.prototype.template="recruit/compiletest-testcase",d.prototype.classname="test-case-wrap",d.prototype.initialize=function(a){return this.tno=a.tno,this.input=a.input,this.output=a.output,this.exp_output=a.exp_output,this.compiler_msg=a.compiler_msg,this.st_class=a.st_class},d.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)({tno:this.tno,input:this.input,output:this.output,exp_output:this.exp_output,compiler_msg:this.compiler_msg,st_class:this.st_class})),this},d}(window.HR.GenericView),a=(v=window.HR)!=null?v:{},a.RecruitCandidateListView=f,a.RecruitCandidateQuestionView=h,a.RecruitCandidateCodingView=d,a.RecruitCandidateMcqView=g,a.RecruitCandidateSubjectiveView=j,a.RecruitCandidateTopBarView=new l,a.RecruitCandidateSideBarView=new i,a.RecruitCandidateCompileTestView=e,a.RecruitCandidateTestCaseView=k})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return c=function(c){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,c),e.prototype.template="recruit/login",e.prototype.className="candidate-login",e.prototype.events={"click .test-submit":"loginAction","click .test-submit-feedback":"submitFeedback","click .test-logout":"logoutTest"},e.prototype.initialize=function(a){},e.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)({test:this.model.attributes})),this},e.prototype.resetError=function(){var a;return a=this.$("#error-message"),a.find("header").html(""),a.find("p").html(""),a.hide()},e.prototype.setError=function(a,b){var c;return c=this.$("#error-message"),c.find("header").html(a),c.find("p").html(b),c.show()},e.prototype.loginAction=function(b){var c,d,e,f,g,h,i,j=this;h=this,b.preventDefault(),this.resetError(),c=this.$("input[name=username]").val(),e=this.$("input[name=password]").val();if(!this.$("#acknowledge").is(":checked")){bootbox.alert("You cannot take this test without agreeing to the specified conditions.");return}return d=$("#test-login-form").serializeArray(),f={},_.each(d,function(a){return f[a.name]=a.value}),f.auth_key=this.model.auth,$("#acknowledge").is(":checked")&&(f.acknowledge="on"),i=this.model.get("unique_id"),g={url:"/recruit/tests/"+i+"/login",data:f,type:"POST",success:function(b){var c;return c=typeof b=="string"?$.parseJSON($(b).text()):b,c.status?a.router.navigate("tests/"+i+"/questions",{trigger:!0,replace:!0}):h.setError(c.message.title,c.message.body)},error:function(a){var b;return b=typeof a.responseText=="string"?$.parseJSON($(a.responseText).text()):a.responseText,h.setError(b.message.title,b.message.body)}},$(":file").length>0&&(g.iframe=!0,g.processData=!1,g.data=f,g.files=$(":file")),$.ajax(g),this},e.prototype.submitFeedback=function(b){var c=this;return a.candidate.candidateAttemptModel.set("feedback_text",this.$(".feedback-text").val()),a.candidate.candidateAttemptModel.save(null,{success:function(a){return $.removeCookie("email",{path:"/"}),$.removeCookie("tid",{path:"/"}),c.logoutTest()},error:function(a){return console.log("Could not submit feedback.")}})},e.prototype.logoutTest=function(a){return $.removeCookie("email",{path:"/"}),$.removeCookie("tid",{path:"/"}),window.candidate={},this.$(".main-content").html("<h3>Thank you!</h3><br/><br/><p>The test is done. You may close this window, or head on to  <a href='//www.hackerrank.com'>hackerrank.com</a> and solve challenges.</p>")},e}(window.HR.GenericView),a=(e=window.HR)!=null?e:{},a.RecruitCandidateLoginView=c})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e,f,g,h,i,j,k,l,m;return f=function(a){function c(){return h=c.__super__.constructor.apply(this,arguments),h}return b(c,a),c.prototype.idAttribute="unique_id",c.prototype.initialize=function(a,b){return a==null&&(a={}),b==null&&(b={}),this.setCaching(!1),c.__super__.initialize.call(this,a,b)},c.prototype.setTidAuth=function(a,b){this.tid=a,this.auth=b},c.prototype.setAction=function(a){this.action=a!=null?a:"show"},c.prototype.url=function(){switch(this.action){case"login":return"/recruit/tests/"+this.tid+"/login?auth_key="+this.auth;case"show":return"/recruit/tests/"+this.tid+"?auth_key="+this.auth;case"logout":return"/recruit/tests/logout"}},c}(window.HR.GenericModel),a=function(a){function c(){return i=c.__super__.constructor.apply(this,arguments),i}return b(c,a),c.prototype.initialize=function(a,b){return a==null&&(a={}),b==null&&(b={}),this.setCaching(!1),c.__super__.initialize.call(this,a,b)},c.prototype.setAid=function(a){this.aid=a},c.prototype.url=function(){return"/recruit/attempts/"+this.aid},c}(window.HR.GenericModel),d=function(a){function c(){return j=c.__super__.constructor.apply(this,arguments),j}return b(c,a),c.prototype.initialize=function(a,b){return a==null&&(a={}),b==null&&(b={}),this.setCaching(!1),c.__super__.initialize.call(this,a,b)},c.prototype.setAid=function(a){this.aid=a},c.prototype.setQid=function(a){this.qid=a},c.prototype.url=function(){return"/recruit/attempts/"+this.aid+"/questions/"+this.qid},c}(window.HR.GenericModel),e=function(a){function c(){return k=c.__super__.constructor.apply(this,arguments),k}return b(c,a),c.prototype.initialize=function(a,b){return a==null&&(a={}),b==null&&(b={}),this.setCaching(!1),c.__super__.initialize.call(this,a,b)},c.prototype.setAttempt=function(a){this.aid=a},c.prototype.url=function(){return"/recruit/attempts/"+this.aid+"/solves/"},c}(window.HR.GenericModel),c=function(a){function c(){return l=c.__super__.constructor.apply(this,arguments),l}return b(c,a),c.prototype.initialize=function(a,b){return a==null&&(a={}),b==null&&(b={}),this.setCaching(!1),c.__super__.initialize.call(this,a,b)},c.prototype.setAid=function(a){this.aid=a},c.prototype.setQid=function(a){this.qid=a},c.prototype.url=function(){return this.id?"/recruit/attempts/"+this.aid+"/questions/"+this.qid+"/compile_tests/"+this.id:"/recruit/attempts/"+this.aid+"/questions/"+this.qid+"/compile_tests"},c}(window.HR.GenericModel),g=(m=window.HR)!=null?m:{},g.CandidateTestModel=f,g.CandidateAttemptModel=a,g.CandidateSolveModel=e,g.CandidateQuestionModel=d,g.CandidateCompileTestModel=c})}.call(this)