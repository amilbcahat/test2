(function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.initialize=function(a,b){return a==null&&(a={}),b==null&&(b={}),b.casual&&(this.casual={},this.casual.min_fetch_timelapse=1e4,this.casual.timestamp=(new Date).getTime()),this.caching==null&&(this.caching=!0),e.__super__.initialize.call(this,a,b)},e.prototype.url=function(){return""+this.restURL()+"?"+this.queryParams()},e.prototype.queryParams=function(){return""},e.prototype.setCaching=function(a){this.caching=a},e.prototype.restPrefix=!0,e.prototype.restURL=function(){var a,b;return b=""+this.ns(a=!0)+this.baseURL(),""+c.restURL(b,this.restPrefix)},e.prototype.pageURL=function(){return""+this.ns()+this.baseURL()},e.prototype.baseURL=function(){return"/dummy"},e.prototype.ns=function(a){return a==null&&(a=!1),this.collection&&(this.contest_slug||(this.contest_slug=this.contest_slug||this.get("contest_slug")||this.collection.contest_slug)),this.contest_slug||(this.contest_slug=c.appController.get_current_contest_slug()),c.namespace(this.contest_slug,a)},e.prototype.hasChanged=function(a){return e.__super__.hasChanged.call(this,a)},e.prototype.keyPrefix=function(){return c.profile().get("key_prefix")},e.prototype.modelCrumbs=function(){var a;return a=c.collection("bread-crumbs"),this.id&&a.add({id:""+this.constructor.name+"-"+this.id,slug:this.get("slug")||this.get("id"),path:this.pageURL(),name:this.get("name")||this.get("title"),model:this}),a},e.prototype.setContestCrumb=function(){var a,b,d=this;b=this.contest_slug||this.get("contest-slug");if(b)return a=c.model("contest",{slug:this.contest_slug}).cached({success:function(a){return d.crumbs.merge(a.breadCrumbs(),{at:0})}})},e.prototype.breadCrumbs=function(){return this.crumbs||(this.crumbs=c.collection("bread-crumbs"),this.setContestCrumb()),this.crumbs.merge(this.modelCrumbs()),this.crumbs},e.prototype.save=function(a,b,c){return this.id&&this.caching&&this.cacheSet(a,b,c),this.collection&&this.collection.flush(),Backbone.Model.prototype.save.apply(this,arguments)},e.prototype.fetch=function(a){return this.disableThrobber===void 0||this.disableThrobber!==!0?c.util&&c.util.ajaxmsg&&c.util.ajaxmsg("Loading...",!1,!0,1e3):this.disableThrobber=!1,Backbone.Model.prototype.fetch.apply(this,arguments)},e.prototype.parse=function(a,b){var d,f,g,h,i,j,k;if(b!==void 0||a.model){this.sync_status=!0,this.disableThrobber===void 0||this.disableThrobber!==!0?c.util&&c.util.ajaxmsg&&c.util.ajaxmsg("",!1,!0,0):this.disableThrobber=!1,g=["total","page","activities","gamedata","status","metadata","errors"],h=this,i=function(b){if(a[b]!==void 0)return h[b]=a[b]};for(j=0,k=g.length;j<k;j++)d=g[j],i(d);f=e.__super__.parse.call(this,a.model,b)}else f=e.__super__.parse.call(this,a,b);return f},e}(Backbone.Model),c=(e=window.HR)!=null?e:{},c.GenericModel=a})}).call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b},c=function(a,b){return function(){return a.apply(b,arguments)}},d=[].indexOf||function(a){for(var b=0,c=this.length;b<c;b++)if(b in this&&this[b]===a)return b;return-1};jQuery(function(){var a,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A;return h=function(c){function d(){return p=d.__super__.constructor.apply(this,arguments),p}return b(d,c),d.prototype.template="recruit/instructions",d.prototype.className="candidate-instructions",d.prototype.initialize=function(a){return this.model=a.model},d.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)({instructions:this.model.get("instructions")})),this},d}(window.HR.GenericView),i=function(c){function d(){return q=d.__super__.constructor.apply(this,arguments),q}return b(d,c),d.prototype.template="recruit/question-list",d.prototype.className="candidate-qlist",d.prototype.events={"click .test-done":"testDone","click .next-section":"sectionNext"},d.prototype.initialize=function(b){return this.model=a.candidate.candidateAttemptModel,this.tid=a.candidate.candidateTestModel.get("unique_id"),this.aid=this.model.get("id")},d.prototype.render=function(){var b,c,d,e,f,g,h=this;return d=this.model.get("questions"),f=this.model.get("solve_mapping"),e=this.model.get("sections_mapping"),b=this.model.get("section"),$(this.el).html(a.appController.template(this.template,this)({section_count:e?e.length:1,current_section:b?b:1})),e?(c=0,_.each(e,function(a,e){var g;return g=h.getTable(d.slice(c,c+parseInt(a.questions)),c+1,f,e+1!==b),h.$("table.section"+(e+1)).html(g),c+=parseInt(a.questions)}),e.length>1&&b<e.length&&this.$("button.section-finish-"+b).removeClass("hidden")):(g=this.getTable(d,1,f),this.$("table.section1").html(g)),this},d.prototype.getTable=function(a,b,c,d){var e,f,g;return d==null&&(d=!1),g=this.tid,f=b,e="",_.each(a,function(a){var b,h;return h="",f===1?h+='<tr class="border">':h+="<tr>",h+="<td width='5%' class='grey right'><span class='mdR'>Q"+f+"</span></td>",h+='<td width="46%"><a class="backbone question-name" ',d?h+=">":h+="href='/tests/"+g+"/questions/"+a.unique_id+"'>",a.name?h+=a.name:h+="Question",h+="</a></td>",h+="<td width='12%' class='fnt-sz-mid'>"+window.istreet.cfg.hrqn[a.type]+"</td>",d?b="":b="href='/tests/"+g+"/questions/"+a.unique_id+"'",_.has(c,a.unique_id)?h+="<td width='12%' class='fnt-sz-mid'><span class='green'>submitted</span></td><td width='18%' class='right'><a "+b+" class='normal-underline display-inline-block margin-right-15 fnt-sz-mid backbone' style='margin: 9px 11px 9px 0;''>Modify Submission</a></td>":h+="<td width='12%' class='fnt-sz-mid'>not answered</td><td width='18%' class='right'><a "+b+" class='btn btn-line margin-right-15 fnt-sz-mid backbone'>Solve Question</a></td>",h+="</tr>",f++,e+=h}),e},d.prototype.testDone=function(b){return bootbox.dialog({message:"Once closed, you can no longer view or modify this test.\n\nAre you sure you are done, and want to close the test?",title:"Confirm test close.",buttons:{closeTest:{label:"Yes, close this test.",callback:function(){var b=this;return a.candidate.candidateTestModel.setAction("logout"),a.candidate.candidateTestModel.save(null,{success:function(b){return a.router.navigate("tests/"+b.get("unique_id")+"/feedback",{trigger:!0,replace:!0})}})}},goBack:{label:"No, go back.",className:"btn",callback:function(){}}}})},d.prototype.sectionNext=function(b){var c=this;return a.candidate.candidateAttemptModel.set("section_close",this.$(b.currentTarget).attr("data-section")),a.candidate.candidateAttemptModel.save(null,{success:function(b){return a.candidate.candidateAttemptModel=b,a.router.navigate("tests/"+c.aid,{trigger:!0,replace:!0})},error:function(a){return console.log("Could not close and move to next section.")}})},d}(window.HR.GenericView),k=function(c){function d(){return t=d.__super__.constructor.apply(this,arguments),t}return b(d,c),d.prototype.template="recruit/question-base",d.prototype.className="question-base",d.prototype.initialize=function(b){return this.model=b.model,this.tid=a.candidate.candidateTestModel.get("unique_id")},d.prototype.events={"click .ans-submit":"submitAnswer"},d.prototype.submitAnswer=function(b){var c,d,e,f=this;return b.preventDefault(),c={type:this.model.attributes.type,answer:this.view.answer()},c.answer?(d={qid:this.model.get("unique_id"),answer:c},e=new a.CandidateSolveModel,e.setAttempt(a.candidate.candidateAttemptModel.get("id")),e.save(d,{success:function(b){var c;return c=f.model.get("nextqid")?"/tests/"+f.tid+"/questions/"+f.model.get("nextqid"):"/tests/"+f.tid+"/questions",a.router.navigate(c,{trigger:!0,replace:!0})},error:function(){return bootbox.alert("Unable to submit.")}})):bootbox.alert("Please answer the question before submitting.")},d.prototype.render=function(){var b,c,d;this.question=this.model.attributes,$(this.el).html(a.appController.template(this.template,this)({tid:this.tid,question:this.question})),d=!0;switch(this.question.type){case"code":case"approx":this.view=new a.RecruitCandidateCodingView({question:this.question});break;case"mcq":case"multiple_mcq":this.view=new a.RecruitCandidateMcqView({question:this.question});break;case"textAns":this.view=new a.RecruitCandidateSubjectiveView({question:this.question});break;case"complete":c=this.question.complete_string,b=0;while(c.search("{blank}")!==-1)c=c.replace("{blank}","<input type='text' class='complete-question' name='blank"+b+"'/>"),b=b+1;this.question.question=c,this.view=new a.RecruitCandidateCompleteView({question:this.question});break;default:d=!1}return this.question.name?this.$(".qtitle").html(this.question.name):this.$(".qtitle").html(window.istreet.cfg.hrqn[this.question.type]),this.$(".challenge-text").html(this.question.question),d?this.$(".qcontent").html(this.view.render().el):(this.$(".qcontent").html("<center>This question type is not available.</center>"),this.$(".ans-submit").addClass("disabled")),this},d}(window.HR.GenericView),e=function(c){function d(){return u=d.__super__.constructor.apply(this,arguments),u}return b(d,c),d.prototype.template="recruit/question-coding",d.prototype.className="question-coding",d.prototype.initialize=function(b){return this.question=b.question,this.codeshell=null,a.candidate&&a.candidate.candidateAttemptModel?this.aid=a.candidate.candidateAttemptModel.get("id"):this.aid="testing",b.disableLocalStorage&&b.disableLocalStorage===!0?this.autoSaveNamespace=null:this.autoSaveNamespace=""+this.aid+"-"+this.question.unique_id,this.compilingLock=!1,this},d.prototype.events={"codeshellcompile #editor":"compileAnswer"},d.prototype.render=function(){var b;return $(this.el).html(a.appController.template(this.template,this)({question:this.question})),b={languages:this.question.languages,language:"c",autoSaveNamespace:this.autoSaveNamespace,lang_default_text:this.getLangDefaults(),showSubmit:!0},this.aid==="testing"&&(b.showSubmit=!1,b.showCompileTest=!1),this.$("#editor").codeshell(b),this.$("#editor").codeshell("refresh"),this.set_answer(),this},d.prototype.getLangDefaults=function(){var a,b,c,d,e;b={},e=this.question.languages;for(c=0,d=e.length;c<d;c++)a=e[c],this.question[a+"_template"]&&(b[a]=this.question[a+"_template"]);return b},d.prototype.compileAnswer=function(b,c){var d=this;if(!c.code)return;if($(".bb-compile").hasClass("disabled"))return;return $(".bb-compile").addClass("disabled"),a.candidate.ctmodel=new a.CandidateCompileTestModel,a.candidate.ctmodel.setAid(this.aid),a.candidate.ctmodel.setQid(this.question.unique_id),b==="runalltestcases"&&a.candidate.ctmodel.setAllCases(!0),a.candidate.ctview=new a.RecruitCandidateCompileTestView,this.$("#runstatus").html(a.candidate.ctview.render().el),a.util.scrollToBottom(1e3),a.candidate.ctmodel.save(c,{success:function(e){return a.candidate.ctview.setStatus("Uploaded. Waiting for results.."),a.candidate.ctloop=setTimeout(function(){return d.checkForResult(d,c,b)},2e3)},error:function(){return a.candidate.ctmodel=null,a.candidate.ctview.setStatus("There was an issue with compiling this code.")}})},d.prototype.checkForResult=function(b,c,d){var e=this;if(!a.candidate.ctloop)return;return a.candidate.ctview.setStatus("Processing.."),a.candidate.ctmodel.fetch({success:function(f){var g,h,i,j,k,l,m,n,o,p;if(f.get("status")===0){a.candidate.ctloop=setTimeout(function(){return b.checkForResult(b,c,d)},2e3);return}if(f.get("status")!==0){$(".bb-compile").removeClass("disabled"),clearTimeout(a.candidate.ctloop),a.candidate.ctloop=null;if(f.get("result")>0)a.candidate.ctview.setStatus("Error.","red"),a.candidate.ctview.setCompileStatus("Compilation failed.",f.get("compilemessage"));else{l=0,p=f.get("testcase_status");for(h=n=0,o=p.length;n<o;h=++n)i=p[h],k=f.get("stdout")[h],g=f.get("expected_output")[h],j=f.get("testcase_message")[h],f.get("testcase_status")[h]===1?(m="green",l++):m="red",a.candidate.ctview.addTestCase(h+1,i,k,g,j,m);l===0?a.candidate.ctview.setStatus("No test cases passed.","red"):l<h?a.candidate.ctview.setStatus("Compiled successfully. "+l+"/"+h+" sample test cases passed.","orange"):(a.candidate.ctview.setStatus("Compiled successfully. All sample test cases passed!","green"),d!=="runalltestcases"&&(e.$(".bb-runall").show(),b.compileAnswer("runalltestcases",c)))}}return a.util.scrollToBottom(1e3)},error:function(b){return a.candidate.ctmodel=null,a.candidate.ctview=null,a.candidate.ctview.setStatus("Unable to fetch compile information from server.")}})},d.prototype.answer=function(){return this.$("#editor").codeshell("value")},d.prototype.set_answer=function(){if(this.question.solve)return this.$("#editor").codeshell("setValue",this.question.solve.answer)},d}(window.HR.GenericView),j=function(c){function d(){return v=d.__super__.constructor.apply(this,arguments),v}return b(d,c),d.prototype.template="recruit/question-mcq",d.prototype.className="question-mcq",d.prototype.events={"click .clearall":"clearAll"},d.prototype.initialize=function(a){return this.question=a.question},d.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)({question:this.question})),this.set_answer(),this},d.prototype.clearAll=function(a){return a.preventDefault(),this.$('input[name="mcqopts"]').attr("checked",!1)},d.prototype.answer=function(){var a,b=this;return this.question.type==="mcq"?(a=this.$("input[name=mcqopts]:checked").val(),a?a:-1):(a=[],_.each(this.$("input[name=mcqopts]:checked"),function(c){return a.push(b.$(c).val())}),a.length?a:-1)},d.prototype.set_answer=function(){var a,b,c,d,e;if(!this.question.solve)return;if(this.question.type==="mcq")return this.$("input#mcqopts"+this.question.solve.answer.answer).prop("checked",!0);d=this.question.solve.answer.answer,e=[];for(b=0,c=d.length;b<c;b++)a=d[b],e.push(this.$("input#mcqopts"+a).prop("checked",!0));return e},d}(window.HR.GenericView),m=function(c){function d(){return w=d.__super__.constructor.apply(this,arguments),w}return b(d,c),d.prototype.template="recruit/question-subjective",d.prototype.className="question-subjective",d.prototype.initialize=function(a){return this.question=a.question},d.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)({question:this.question})),this.set_answer(),this},d.prototype.answer=function(){return this.$(".sub-answer").val()},d.prototype.set_answer=function(){if(this.question.solve)return this.$(".sub-answer").val(this.question.solve.answer.answer)},d}(window.HR.GenericView),g=function(c){function d(){return x=d.__super__.constructor.apply(this,arguments),x}return b(d,c),d.prototype.template="recruit/question-completesentence",d.prototype.className="question-complete",d.prototype.initialize=function(a){return this.question=a.question},d.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)({question:this.question})),this.set_answer(),this},d.prototype.answer=function(){return _.map($('input[name^="blank"]'),function(a){return $(a).val()})},d.prototype.set_answer=function(){var a;if(this.question.solve)return a=0,_.each(this.question.solve.answer,function(b){return $('input[name="blank'+a+'"]').val(b),a=a+1})},d}(window.HR.GenericView),o=function(d){function e(){return this.updateTimer=c(this.updateTimer,this),y=e.__super__.constructor.apply(this,arguments),y}return b(e,d),e.prototype.template="recruit/topbar",e.prototype.className="topbar",e.prototype.initialize=function(a){return Offline.options={reconnect:{initialDelay:3},requests:!1,game:!1}},e.prototype.updateTimer=function(){return $("#countdown-timer").countdown("destroy").countdown({until:a.candidate.candidateAttemptModel.get("time_left"),layout:"{d<}{dn}{dl} {d>} {hnn}:{mnn}:{snn}",compact:!0})},e.prototype.render=function(){var b,c,d=this;return $(this.el).html(a.appController.template(this.template,this)({test:a.candidate.candidateTestModel,attempt:a.candidate.candidateAttemptModel})),a.candidate.pingTimer&&clearInterval(a.candidate.pingTimer),a.candidate.candidateAttemptModel.get("attempt_done")?a.appView.setTopbarView():(c=_.keys(a.candidate.candidateAttemptModel.get("solve_mapping")||{}).length,b=a.candidate.candidateAttemptModel.get("questions").length,this.$(".qdone").html(c),this.$(".qcount").html(b),this.$(".progress-done").css({width:Math.floor(c*100/b)}),this.updateTimer(),a.candidate.pingTimer=setInterval(function(){return a.candidate.candidateAttemptModel.fetch({success:function(a){return d.updateTimer()}})},3e4)),this},e.prototype.testTimeUp=function(b){return bootbox.dialog({message:"You have exceeded the time limit set for this test. All answers you submitted before the time limit have been saved. You cannot attempt any more questions now. Thank you for taking this test.",title:"Test finished.",buttons:{giveFeedback:{label:"Give Feedback",className:"btn",callback:function(){var b=this;a.candidate.candidateTestModel.setAction("logout"),a.candidate.candidateTestModel.save(null,{success:function(b){return a.router.navigate("tests/"+b.get("unique_id")+"/feedback",{trigger:!0,replace:!0})}})}}}})},e}(window.HR.GenericView),l=function(c){function e(){return z=e.__super__.constructor.apply(this,arguments),z}return b(e,c),e.prototype.template="recruit/sidebar",e.prototype.className="sbar",e.prototype.icon_types={QUESTION_ANSWERED:"nav",QUESTION_UNANSWERED:1,QUESTION_LIST:2},e.prototype.render=function(){var b;return b=Backbone.history.fragment,$(this.el).html(a.appController.template(this.template,this)),this.$(".fixed-nav").html(this.getTopIcons()),!b.endsWith("questions")&&!b.endsWith("questions/")&&this.$(".questions-nav").html(this.getQuestionIcons()),this},e.prototype.getTopIcons=function(){var b,c,d;c="",d=Backbone.history.fragment,b="";if(d.endsWith("questions")||d.endsWith("questions/"))b="active";c+='<li class="'+b+'"><a href="/tests/'+a.candidate.candidateTestModel.get("unique_id")+'/questions" class="backbone"><i class="nav-icon icon-list-bullet-large"></i></a></li>',b="";if(d.endsWith("instructions")||d.endsWith("instructions/"))b="active";return c+='<li class="'+b+'"><a href="/tests/'+a.candidate.candidateTestModel.get("unique_id")+'/instructions" class="backbone"><i class="nav-icon icon-help-circled"></i></a></li>',c},e.prototype.getQuestionIcons=function(){var b,c,e,f,g,h,i,j,k,l,m;f="",h=function(a,b,c,d,e){var f,g,h;return g=a?"answered":"not-answered",h=b?"disabled":"",f=c?"active":"",'<li class="'+g+" "+h+" "+f+'">\n  <a href="'+d+'" class="backbone">\n      <span class="quest-number">'+e+"</span>\n  </a>\n</li>"},j=a.candidate.candidateAttemptModel.get("questions"),e=_.keys(a.candidate.candidateAttemptModel.get("solve_mapping")),g=1;for(k=0,l=j.length;k<l;k++)i=j[k],c=(m=i.unique_id.toString(),d.call(e,m)>=0),b=i.unique_id===a.candidate.currentQuestion,i.disabled?f+=h(c,!0,b,"javascript:void(0)",g):f+=h(c,!1,b,"/tests/"+a.candidate.candidateTestModel.get("unique_id")+"/questions/"+i.unique_id,g),g=g+1;return f},e}(window.HR.GenericView),f=function(c){function d(){return A=d.__super__.constructor.apply(this,arguments),A}return b(d,c),d.prototype.template="recruit/compiletest-base",d.prototype.className="ct-base",d.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)),this},d.prototype.setStatus=function(a,b){b==null&&(b=""),this.$(".status-msg").html(a);if(b!=="")return this.$(".status-msg").addClass(b)},d.prototype.setCompileStatus=function(a,b){return this.$(".compile-header").html(a),this.$(".compile-message").html(b),this.$("#error-message").removeClass("hide")},d.prototype.addTestCase=function(b,c,d,e,f,g){return this.$(".testcases").append((new a.RecruitCandidateTestCaseView({tno:b,input:c,output:d,exp_output:e,st_class:g,compiler_msg:f})).render().el)},d}(window.HR.GenericView),n=function(c){function d(){return r=d.__super__.constructor.apply(this,arguments),r}return b(d,c),d.prototype.template="recruit/compiletest-testcase",d.prototype.classname="test-case-wrap",d.prototype.initialize=function(a){return this.tno=a.tno,this.input=a.input,this.output=a.output,this.exp_output=a.exp_output,this.compiler_msg=a.compiler_msg,this.st_class=a.st_class},d.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)({tno:this.tno,input:this.input,output:this.output,exp_output:this.exp_output,compiler_msg:this.compiler_msg,st_class:this.st_class})),this},d}(window.HR.GenericView),a=(s=window.HR)!=null?s:{},a.RecruitCandidateListView=i,a.RecruitCandidateQuestionView=k,a.RecruitCandidateCodingView=e,a.RecruitCandidateMcqView=j,a.RecruitCandidateSubjectiveView=m,a.RecruitCandidateCompleteView=g,a.RecruitCandidateTopBarView=new o,a.RecruitCandidateSideBarView=new l,a.RecruitCandidateCompileTestView=f,a.RecruitCandidateTestCaseView=n,a.RecruitCandidateInstructionsView=h})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return c=function(c){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,c),e.prototype.template="recruit/login",e.prototype.className="candidate-login",e.prototype.events={"click .test-submit":"loginAction","click .test-submit-feedback":"submitFeedback","click .test-logout":"logoutTest"},e.prototype.initialize=function(a){},e.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)({test:this.model.attributes})),this},e.prototype.resetError=function(){var a;return a=this.$("#error-message"),a.find("header").html(""),a.find("p").html(""),a.hide()},e.prototype.setError=function(a,b){var c;return c=this.$("#error-message"),c.find("header").html(a),c.find("p").html(b),c.show()},e.prototype.loginAction=function(b){var c,d,e,f,g,h,i,j=this;h=this,b.preventDefault(),this.resetError(),c=this.$("input[name=username]").val(),e=this.$("input[name=password]").val();if(!this.$("#acknowledge").is(":checked")){bootbox.alert("You cannot take this test without agreeing to the specified conditions.");return}return d=$("#test-login-form").serializeArray(),f={},_.each(d,function(a){return f[a.name]=a.value}),f.auth_key=this.model.auth,$("#acknowledge").is(":checked")&&(f.acknowledge="on"),i=this.model.get("unique_id"),g={url:"/recruit/tests/"+i+"/login",data:f,type:"POST",success:function(b){var c;return c=typeof b=="string"?$.parseJSON($(b).text()):b,c.status?a.router.navigate("tests/"+i+"/questions",{trigger:!0,replace:!0}):h.setError(c.message.title,c.message.body)},error:function(a){var b;return b=typeof a.responseText=="string"?$.parseJSON($(a.responseText).text()):a.responseText,h.setError(b.message.title,b.message.body)}},$(":file").length>0&&(g.iframe=!0,g.processData=!1,g.data=f,g.files=$(":file")),$.ajax(g),this},e.prototype.submitFeedback=function(b){var c=this;return a.candidate.candidateAttemptModel.set("feedback_text",this.$(".feedback-text").val()),a.candidate.candidateAttemptModel.save(null,{success:function(a){return $.removeCookie("email",{path:"/"}),$.removeCookie("tid",{path:"/"}),c.logoutTest()},error:function(a){return console.log("Could not submit feedback.")}})},e.prototype.logoutTest=function(a){return $.removeCookie("email",{path:"/"}),$.removeCookie("tid",{path:"/"}),window.candidate={},this.$(".main-content").html("<h3>Thank you!</h3><br/><br/><p>The test is done. You may close this window, or head on to  <a href='//www.hackerrank.com'>hackerrank.com</a> and solve challenges.</p>")},e}(window.HR.GenericView),a=(e=window.HR)!=null?e:{},a.RecruitCandidateLoginView=c})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e,f,g,h,i,j,k,l,m;return f=function(a){function c(){return h=c.__super__.constructor.apply(this,arguments),h}return b(c,a),c.prototype.idAttribute="unique_id",c.prototype.initialize=function(a,b){return a==null&&(a={}),b==null&&(b={}),this.setCaching(!1),c.__super__.initialize.call(this,a,b)},c.prototype.setTidAuth=function(a,b){this.tid=a,this.auth=b},c.prototype.setAction=function(a){this.action=a!=null?a:"show"},c.prototype.url=function(){switch(this.action){case"login":return"/recruit/tests/"+this.tid+"/login?auth_key="+this.auth;case"show":return"/recruit/tests/"+this.tid+"?auth_key="+this.auth;case"logout":return"/recruit/tests/logout"}},c}(window.HR.GenericModel),a=function(a){function c(){return i=c.__super__.constructor.apply(this,arguments),i}return b(c,a),c.prototype.initialize=function(a,b){return a==null&&(a={}),b==null&&(b={}),this.setCaching(!1),c.__super__.initialize.call(this,a,b)},c.prototype.setAid=function(a){this.aid=a},c.prototype.url=function(){return"/recruit/attempts/"+this.aid},c}(window.HR.GenericModel),d=function(a){function c(){return j=c.__super__.constructor.apply(this,arguments),j}return b(c,a),c.prototype.idAttribute="unique_id",c.prototype.initialize=function(a,b){return a==null&&(a={}),b==null&&(b={}),this.setCaching(!1),c.__super__.initialize.call(this,a,b)},c.prototype.setAid=function(a){this.aid=a},c.prototype.setQid=function(a){this.qid=a},c.prototype.url=function(){return"/recruit/attempts/"+this.aid+"/questions/"+this.qid},c}(window.HR.GenericModel),e=function(a){function c(){return k=c.__super__.constructor.apply(this,arguments),k}return b(c,a),c.prototype.initialize=function(a,b){return a==null&&(a={}),b==null&&(b={}),this.setCaching(!1),c.__super__.initialize.call(this,a,b)},c.prototype.setAttempt=function(a){this.aid=a},c.prototype.url=function(){return"/recruit/attempts/"+this.aid+"/solves/"},c}(window.HR.GenericModel),c=function(a){function c(){return l=c.__super__.constructor.apply(this,arguments),l}return b(c,a),c.prototype.initialize=function(a,b){return a==null&&(a={}),b==null&&(b={}),this.setCaching(!1),c.__super__.initialize.call(this,a,b)},c.prototype.setAid=function(a){this.aid=a},c.prototype.setQid=function(a){this.qid=a},c.prototype.setAllCases=function(a){this.allcases=a},c.prototype.url=function(){return this.id?"/recruit/attempts/"+this.aid+"/questions/"+this.qid+"/compile_tests/"+this.id:this.allcases?"/recruit/attempts/"+this.aid+"/questions/"+this.qid+"/compile_tests?allcases="+this.allcases:"/recruit/attempts/"+this.aid+"/questions/"+this.qid+"/compile_tests"},c}(window.HR.GenericModel),g=(m=window.HR)!=null?m:{},g.CandidateTestModel=f,g.CandidateAttemptModel=a,g.CandidateSolveModel=e,g.CandidateQuestionModel=d,g.CandidateCompileTestModel=c})}.call(this)