(function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.initialize=function(a,b){return a==null&&(a={}),b==null&&(b={}),b.casual&&(this.casual={},this.casual.min_fetch_timelapse=1e4,this.casual.timestamp=(new Date).getTime()),this.caching==null&&(this.caching=!0),e.__super__.initialize.call(this,a,b)},e.prototype.url=function(){return""+this.restURL()+"?"+this.queryParams()},e.prototype.queryParams=function(){return""},e.prototype.setCaching=function(a){this.caching=a},e.prototype.restPrefix=!0,e.prototype.restURL=function(){var a,b;return b=""+this.ns(a=!0)+this.baseURL(),""+c.restURL(b,this.restPrefix)},e.prototype.pageURL=function(){return""+this.ns()+this.baseURL()},e.prototype.baseURL=function(){return"/dummy"},e.prototype.ns=function(a){return a==null&&(a=!1),this.collection&&(this.contest_slug||(this.contest_slug=this.contest_slug||this.get("contest_slug")||this.collection.contest_slug)),this.contest_slug||(this.contest_slug=c.appController.get_current_contest_slug()),c.namespace(this.contest_slug,a)},e.prototype.hasChanged=function(a){return e.__super__.hasChanged.call(this,a)},e.prototype.keyPrefix=function(){return c.profile().get("key_prefix")},e.prototype.modelCrumbs=function(){var a;return a=c.collection("bread-crumbs"),this.id&&a.add({id:""+this.constructor.name+"-"+this.id,slug:this.get("slug")||this.get("id"),path:this.pageURL(),name:this.get("name")||this.get("title"),model:this}),a},e.prototype.setContestCrumb=function(){var a,b,d=this;b=this.contest_slug||this.get("contest-slug");if(b)return a=c.model("contest",{slug:this.contest_slug}).cached({success:function(a){return d.crumbs.merge(a.breadCrumbs(),{at:0})}})},e.prototype.breadCrumbs=function(){return this.crumbs||(this.crumbs=c.collection("bread-crumbs"),this.setContestCrumb()),this.crumbs.merge(this.modelCrumbs()),this.crumbs},e.prototype.save=function(a,b,c){return this.id&&this.caching&&this.cacheSet(a,b,c),this.collection&&this.collection.flush(),Backbone.Model.prototype.save.apply(this,arguments)},e.prototype.parse=function(a,b){var c,d,f,g,h,i,j;if(b!==void 0||a.model){this.sync_status=!0,f=["total","page","activities","gamedata","status","metadata","errors"],g=this,h=function(b){if(a[b]!==void 0)return g[b]=a[b]};for(i=0,j=f.length;i<j;i++)c=f[i],h(c);d=e.__super__.parse.call(this,a.model,b)}else d=e.__super__.parse.call(this,a,b);return d},e}(Backbone.Model),c=(e=window.HR)!=null?e:{},c.GenericModel=a})}).call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;return e=function(c){function d(){return l=d.__super__.constructor.apply(this,arguments),l}return b(d,c),d.prototype.template="recruit/question-list",d.prototype.className="candidate-qlist",d.prototype.events={"click .test-done":"testDone"},d.prototype.initialize=function(b){return this.model=a.candidate.candidateAttemptModel,console.log(this.model),this.tid=a.candidate.candidateTestModel.get("unique_id"),this.aid=this.model.get("id")},d.prototype.render=function(){return console.log(this.model.get("questions"),this.model.get("solve_mapping")),$(this.el).html(a.appController.template(this.template,this)({questions:this.model.get("questions"),solves:this.model.get("solve_mapping"),tid:this.tid})),this},d.prototype.testDone=function(b){var c=this;if(confirm("Once closed, you can no longer view or modify this test.\n\nAre you sure you are done, and want to close the test?","Confirm logout"))return a.candidate.candidateTestModel.setAction("logout"),a.candidate.candidateTestModel.save(null,{success:function(b){return console.log("logged out",b,a.candidate.candidateTestModel),a.router.navigate("tests/"+b.get("unique_id"),{trigger:!0,replace:!0})}})},d}(window.HR.GenericView),g=function(c){function d(){return m=d.__super__.constructor.apply(this,arguments),m}return b(d,c),d.prototype.template="recruit/question-base",d.prototype.className="question-base",d.prototype.initialize=function(b){return this.model=b.model,this.tid=a.candidate.candidateTestModel.get("unique_id"),console.log("question model",this.model)},d.prototype.events={"click .ans-submit":"submitAnswer"},d.prototype.submitAnswer=function(b){var c,d,e,f=this;return b.preventDefault(),c={type:this.model.attributes.type,answer:this.view.answer()},console.log(c),c?(d={qid:this.model.get("id"),answer:c},e=new a.CandidateSolveModel,e.setAttempt(a.candidate.candidateAttemptModel.get("id")),e.save(d,{success:function(a){return console.log("trying to click",f.$(".link-next")),f.$(".link-next").click()},error:function(){return alert("Unable to submit.")}})):alert("Please answer before submitting.")},d.prototype.render=function(){var b;this.question=this.model.attributes,$(this.el).html(a.appController.template(this.template,this)({tid:this.tid})),b=!0;switch(this.question.type){case"code":case"approx":this.view=new a.RecruitCandidateCodingView({question:this.question});break;case"mcq":case"multiple_mcq":this.view=new a.RecruitCandidateMcqView({question:this.question});break;case"textAns":this.view=new a.RecruitCandidateSubjectiveView({question:this.question});break;default:b=!1}return this.question.name?this.$(".qtitle").html(this.question.name):this.$(".qtitle").html(window.istreet.cfg.hrqn[this.question.type]),this.question.nextqid?this.$(".link-next").attr("href","/tests/"+this.tid+"/questions/"+this.question.nextqid):(this.$(".link-next").attr("href","/tests/"+this.tid+"/questions"),this.$(".link-next").addClass("disabled")),this.question.qno>1?this.$(".link-prev").attr("href","/tests/"+this.tid+"/questions/"+this.question.prevqid):(this.$(".link-prev").attr("href","/tests/"+this.tid+"/questions"),this.$(".link-prev").addClass("disabled")),this.$(".challenge-text").html(this.question.question),b?this.$(".qcontent").html(this.view.render().el):(this.$(".qcontent").html("<center>This question type is not available.</center>"),this.$(".ans-submit").addClass("disabled")),this},d}(window.HR.GenericView),c=function(c){function d(){return n=d.__super__.constructor.apply(this,arguments),n}return b(d,c),d.prototype.template="recruit/question-coding",d.prototype.className="question-coding",d.prototype.initialize=function(b){return this.question=b.question,this.codeshell=null,this.aid=a.candidate.candidateAttemptModel.get("id"),this.compilingLock=!1,this},d.prototype.events={"codeshellcompile #editor":"compileAnswer"},d.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)({question:this.question})),this.$("#editor").codeshell({languages:this.question.allowedLanguages.split(","),language:"c",autoSaveNamespace:""+this.aid+"-"+this.question.id,lang_default_text:this.getLangDefaults()}),this.$("#editor").codeshell("refresh"),this.set_answer(),this},d.prototype.getLangDefaults=function(){var a,b,c,d,e;b={},e=this.question.allowedLanguages.split(",");for(c=0,d=e.length;c<d;c++)a=e[c],this.question[a+"_template"]&&(b[a]=this.question[a+"_template"]);return b},d.prototype.compileAnswer=function(b,c){var d=this;if(!c.code)return;return a.candidate.ctmodel=new a.CandidateCompileTestModel,a.candidate.ctmodel.setAid(this.aid),a.candidate.ctmodel.setQid(this.question.id),a.candidate.ctview=new a.RecruitCandidateCompileTestView,this.$("#runstatus").html(a.candidate.ctview.render().el),a.candidate.ctmodel.save(c,{success:function(b){return a.candidate.ctview.setStatus("Uploaded. Waiting for results.."),a.candidate.ctloop=setInterval(d.checkForResult,4e3)},error:function(){return a.candidate.ctmodel=null,a.candidate.ctview.setStatus("There was an issue with compiling this code.")}})},d.prototype.checkForResult=function(){var b=this;if(!a.candidate.ctloop)return;return a.candidate.ctview.setStatus("Processing.."),a.candidate.ctmodel.fetch({success:function(b){var c,d,e,f,g,h,i,j,k,l;if(b.get("status")!==0){clearInterval(a.candidate.ctloop),a.candidate.ctloop=null;if(b.get("result")>0)a.candidate.ctview.setStatus("Error.","red"),a.candidate.ctview.setCompileStatus("Compilation failed.",b.get("compilemessage"));else{h=0,l=b.get("stdin");for(d=j=0,k=l.length;j<k;d=++j)e=l[d],g=b.get("stdout")[d],c=b.get("expected_output")[d],f=b.get("testcase_message")[d],b.get("testcase_status")[d]===1?(i="green",h++):i="red",a.candidate.ctview.addTestCase(d+1,e,g,c,f,i);h===0?a.candidate.ctview.setStatus("No test cases passed.","red"):h<d?a.candidate.ctview.setStatus("Compiled successfully. "+h+"/"+d+" test cases passed.","orange"):a.candidate.ctview.setStatus("Compiled successfully. All test cases passed!","green")}return console.log(b.attributes)}},error:function(b){return a.candidate.ctmodel=null,a.candidate.ctview=null,a.candidate.ctview.setStatus("Unable to fetch compile information from server.")}})},d.prototype.answer=function(){return this.$("#editor").codeshell("value")},d.prototype.set_answer=function(){if(this.question.solve){console.log("should set",this.question.solve.answer);return}},d}(window.HR.GenericView),f=function(c){function d(){return o=d.__super__.constructor.apply(this,arguments),o}return b(d,c),d.prototype.template="recruit/question-mcq",d.prototype.className="question-mcq",d.prototype.initialize=function(a){return this.question=a.question},d.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)({question:this.question})),this.set_answer(),this},d.prototype.answer=function(){var a,b=this;return this.question.type==="mcq"?(a=this.$("input[name=mcqopts]:checked").val(),a?a:null):(a=[],_.each(this.$("input[name=mcqopts]:checked"),function(c){return a.push(b.$(c).val())}),a.length?a:null)},d.prototype.set_answer=function(){var a,b,c,d,e;if(!this.question.solve)return;if(this.question.type==="mcq")return this.$("input#mcqopts"+this.question.solve.answer.answer).prop("checked",!0);d=this.question.solve.answer.answer,e=[];for(b=0,c=d.length;b<c;b++)a=d[b],e.push(this.$("input#mcqopts"+a).prop("checked",!0));return e},d}(window.HR.GenericView),i=function(c){function d(){return p=d.__super__.constructor.apply(this,arguments),p}return b(d,c),d.prototype.template="recruit/question-subjective",d.prototype.className="question-subjective",d.prototype.initialize=function(a){return this.question=a.question},d.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)({question:this.question})),this.set_answer(),this},d.prototype.answer=function(){return this.$(".sub-answer").val()},d.prototype.set_answer=function(){if(this.question.solve)return this.$(".sub-answer").val(this.question.solve.answer.answer)},d}(window.HR.GenericView),k=function(c){function d(){return q=d.__super__.constructor.apply(this,arguments),q}return b(d,c),d.prototype.template="recruit/topbar",d.prototype.className="topbar",d.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)),this.update(),this},d.prototype.update=function(){var b,c;return b=new Date,c=b.getTime()/1e3+a.candidate.candidateTestModel.get("time_left"),a.util.countdownTimer($("#countdown-timer"),c)},d}(window.HR.GenericView),h=function(c){function d(){return r=d.__super__.constructor.apply(this,arguments),r}return b(d,c),d.prototype.template="recruit/sidebar",d.prototype.className="sbar",d.prototype.icon_types={QUESTION_ANSWERED:"nav",QUESTION_UNANSWERED:1,QUESTION_LIST:2},d.prototype.render=function(){return console.log(a.candidate),$(this.el).html(a.appController.template(this.template,this)),this.update(),this},d.prototype.update=function(){return this.$(".fixed-nav").html(this.getTopIcons()),this.$(".questions-nav").html(this.getQuestionIcons())},d.prototype.getTopIcons=function(){return'<li><a href="#" class="backbone"><i class="nav-icon icon-help-circled"></i><span class="nav-text">FAQ</span></a></li>\n<li><a href="#" class="backbone"><i class="nav-icon icon-list-bullet-large"></i><span class="nav-text">Question List</span></a></li>'},d.prototype.getQuestionIcons=function(){var a;return a="",a},d}(window.HR.GenericView),d=function(c){function d(){return s=d.__super__.constructor.apply(this,arguments),s}return b(d,c),d.prototype.template="recruit/compiletest-base",d.prototype.className="ct-base",d.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)),this},d.prototype.setStatus=function(a,b){b==null&&(b=""),this.$(".status-msg").html(a);if(b!=="")return this.$(".status-msg").addClass(b)},d.prototype.setCompileStatus=function(a,b){return this.$(".compile-header").html(a),this.$(".compile-message").html(b),this.$("#error-message").removeClass("hide")},d.prototype.addTestCase=function(b,c,d,e,f,g){return this.$(".testcases").append((new a.RecruitCandidateTestCaseView({tno:b,input:c,output:d,exp_output:e,st_class:g,compiler_msg:f})).render().el)},d}(window.HR.GenericView),j=function(c){function d(){return t=d.__super__.constructor.apply(this,arguments),t}return b(d,c),d.prototype.template="recruit/compiletest-testcase",d.prototype.classname="test-case-wrap",d.prototype.initialize=function(a){return this.tno=a.tno,this.input=a.input,this.output=a.output,this.exp_output=a.exp_output,this.compiler_msg=a.compiler_msg,this.st_class=a.st_class},d.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)({tno:this.tno,input:this.input,output:this.output,exp_output:this.exp_output,compiler_msg:this.compiler_msg,st_class:this.st_class})),this},d}(window.HR.GenericView),a=(u=window.HR)!=null?u:{},a.RecruitCandidateListView=e,a.RecruitCandidateQuestionView=g,a.RecruitCandidateCodingView=c,a.RecruitCandidateMcqView=f,a.RecruitCandidateSubjectiveView=i,a.RecruitCandidateTopBarView=new k,a.RecruitCandidateSideBarView=new h,a.RecruitCandidateCompileTestView=d,a.RecruitCandidateTestCaseView=j})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return c=function(c){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,c),e.prototype.template="recruit/login",e.prototype.className="candidate-login",e.prototype.events={"click .test-submit":"loginAction"},e.prototype.initialize=function(a){},e.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)({test:this.model.attributes})),this},e.prototype.resetError=function(){var a;return a=this.$("#error-message"),a.find("header").html(""),a.find("p").html(""),a.hide()},e.prototype.setError=function(a,b){var c;return c=this.$("#error-message"),c.find("header").html(a),c.find("p").html(b),c.show()},e.prototype.loginAction=function(b){var c,d,e,f,g,h,i=this;h=this,b.preventDefault(),this.resetError(),c=this.$("input[name=username]").val(),e=this.$("input[name=password]").val();if(!this.$("#acknowledge").is(":checked")){alert("You cannot take this test without agreeing to the specified conditions.");return}return d=$("#test-login-form").serializeArray(),f={},_.each(d,function(a){return f[a.name]=a.value}),f.auth_key=this.model.auth,$("#acknowledge").is(":checked")&&(f.acknowledge="on"),g={url:"/recruit/tests/"+this.model.get("unique_id")+"/login",data:f,type:"POST",success:function(b){var c;return c=$.parseJSON($(b).text()),c.status?a.candidate.candidateTestModel.fetch({success:function(){return a.router.navigate("tests/"+a.candidate.candidateTestModel.get("unique_id")+"/questions",{trigger:!0,replace:!0})}}):h.setError(c.message.title,c.message.body)},error:function(a){var b;return b=$.parseJSON($(a.responseText).text()),h.setError(b.message.title,b.message.body)}},$(":file").length>0&&(g.iframe=!0,g.processData=!1,{files:$(":file")}),$.ajax(g),this},e}(window.HR.GenericView),a=(e=window.HR)!=null?e:{},a.RecruitCandidateLoginView=c})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e,f,g,h,i,j,k,l,m;return f=function(a){function c(){return h=c.__super__.constructor.apply(this,arguments),h}return b(c,a),c.prototype.idAttribute="unique_id",c.prototype.initialize=function(a,b){return a==null&&(a={}),b==null&&(b={}),this.setCaching(!1),c.__super__.initialize.call(this,a,b)},c.prototype.setTidAuth=function(a,b){this.tid=a,this.auth=b},c.prototype.setAction=function(a){this.action=a!=null?a:"show"},c.prototype.url=function(){switch(this.action){case"login":return"/recruit/tests/"+this.tid+"/login?auth_key="+this.auth;case"show":return"/recruit/tests/"+this.tid+"?auth_key="+this.auth;case"logout":return"/recruit/tests/logout"}},c}(window.HR.GenericModel),a=function(a){function c(){return i=c.__super__.constructor.apply(this,arguments),i}return b(c,a),c.prototype.initialize=function(a,b){return a==null&&(a={}),b==null&&(b={}),this.setCaching(!1),c.__super__.initialize.call(this,a,b)},c.prototype.setAid=function(a){this.aid=a},c.prototype.url=function(){return"/recruit/attempts/"+this.aid},c}(window.HR.GenericModel),d=function(a){function c(){return j=c.__super__.constructor.apply(this,arguments),j}return b(c,a),c.prototype.initialize=function(a,b){return a==null&&(a={}),b==null&&(b={}),this.setCaching(!1),c.__super__.initialize.call(this,a,b)},c.prototype.setAid=function(a){this.aid=a},c.prototype.setQid=function(a){this.qid=a},c.prototype.url=function(){return"/recruit/attempts/"+this.aid+"/questions/"+this.qid},c}(window.HR.GenericModel),e=function(a){function c(){return k=c.__super__.constructor.apply(this,arguments),k}return b(c,a),c.prototype.initialize=function(a,b){return a==null&&(a={}),b==null&&(b={}),this.setCaching(!1),c.__super__.initialize.call(this,a,b)},c.prototype.setAttempt=function(a){this.aid=a},c.prototype.url=function(){return"/recruit/attempts/"+this.aid+"/solves/"},c}(window.HR.GenericModel),c=function(a){function c(){return l=c.__super__.constructor.apply(this,arguments),l}return b(c,a),c.prototype.initialize=function(a,b){return a==null&&(a={}),b==null&&(b={}),this.setCaching(!1),c.__super__.initialize.call(this,a,b)},c.prototype.setAid=function(a){this.aid=a},c.prototype.setQid=function(a){this.qid=a},c.prototype.url=function(){return this.id?"/recruit/attempts/"+this.aid+"/questions/"+this.qid+"/compile_tests/"+this.id:"/recruit/attempts/"+this.aid+"/questions/"+this.qid+"/compile_tests"},c}(window.HR.GenericModel),g=(m=window.HR)!=null?m:{},g.CandidateTestModel=f,g.CandidateAttemptModel=a,g.CandidateSolveModel=e,g.CandidateQuestionModel=d,g.CandidateCompileTestModel=c})}.call(this)