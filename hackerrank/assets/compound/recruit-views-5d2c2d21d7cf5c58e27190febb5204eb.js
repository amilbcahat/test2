(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},b={}.hasOwnProperty,c=function(a,c){function e(){this.constructor=a}for(var d in c)b.call(c,d)&&(a[d]=c[d]);return e.prototype=c.prototype,a.prototype=new e,a.__super__=c.prototype,a};jQuery(function(){var b,d,e,f,g,h,i,j,k,l,m,n;return e=function(d){function e(){return this.loadList=a(this.loadList,this),i=e.__super__.constructor.apply(this,arguments),i}return c(e,d),e.prototype.template="recruit/question-list",e.prototype.className="candidate-qlist",e.prototype.events={"click .test-done":"testDone"},e.prototype.initialize=function(a){return this.aid=a.aid,this.page=a.page},e.prototype.render=function(){return $(this.el).html("<center><p>Loading</p></center>"),setTimeout(this.loadList,200),this},e.prototype.loadList=function(){var a=this;return $.ajax({url:"/recruit/attempts/"+this.aid,type:"get",success:function(c){return $(a.el).html(b.appController.template(a.template,a)({questions:c.questions,solves:c.solve_mapping,aid:a.aid}))},error:function(b){return console.log(b),$(a.el).html("<center><p>This test is completed.</p></center>")}})},e.prototype.testDone=function(a){if(confirm("Once closed, you can no longer view or modify this test.\n\nAre you sure you are done, and want to close the test?","Confirm logout"))return $.ajax({type:"put",url:"/recruit/tests/logout",success:function(a){return b.router.navigate("/",{trigger:!0})},error:function(a){return console.log("Unable to perform operation.")}})},e}(window.HR.GenericView),g=function(d){function e(){return this.loadQuestion=a(this.loadQuestion,this),j=e.__super__.constructor.apply(this,arguments),j}return c(e,d),e.prototype.template="recruit/question-base",e.prototype.className="question-base",e.prototype.initialize=function(a){return this.qid=a.qid,this.aid=a.aid,this.page=a.page,this.question=null},e.prototype.events={"click .ans-submit":"submitAnswer"},e.prototype.submitAnswer=function(a){var b,c=this;return a.preventDefault(),b=this.view.answer(),b?(console.log(b),$.ajax({url:"/recruit/attempts/"+this.aid+"/solves/",type:"post",data:{qid:this.qid,answer:b},success:function(a){return console.log(a),c.$(".link-next").click()},error:function(a){return alert("Unable to submit answer.")}})):alert("Please answer before submitting.")},e.prototype.render=function(){return $(this.el).html(b.appController.template(this.template,this)({aid:this.aid,page:this.page})),setTimeout(this.loadQuestion,200),this},e.prototype.loadQuestion=function(){var a=this;return $.ajax({url:"/recruit/attempts/"+this.aid+"/questions/"+this.qid,type:"get",success:function(c){var d;console.log(c),a.question=c.model,d=!0;switch(a.question.type){case"code":case"approx":a.view=new b.RecruitCandidateCodingView({question:a.question,solve:c.solve});break;case"mcq":case"multiple_mcq":a.view=new b.RecruitCandidateMcqView({question:a.question,solve:c.solve});break;case"textAns":a.view=new b.RecruitCandidateSubjectiveView({question:a.question,solve:c.solve});break;default:d=!1}return a.question.name?a.$(".qtitle").html(a.question.name):a.$(".qtitle").html(window.istreet.cfg.hrqn[a.question.type]),c.nextqid?a.$(".link-next").attr("href","/tests/"+a.aid+"/page/"+(c.qno+1)+"/"+c.nextqid):(a.$(".link-next").attr("href","/tests/"+a.aid+"/page/list"),a.$(".link-next").addClass("disabled")),c.qno>1?a.$(".link-prev").attr("href","/tests/"+a.aid+"/page/"+(c.qno-1)+"/"+c.prevqid):(a.$(".link-prev").attr("href","/tests/"+a.aid+"/page/list"),a.$(".link-prev").addClass("disabled")),a.$(".challenge-text").html(a.question.question),d?a.$(".qcontent").html(a.view.render().el):(a.$(".qcontent").html("<center>This question type is not available.</center>"),a.$(".ans-submit").addClass("disabled"))},error:function(b){return console.log(b),a.$(".qcontent").html("<center>Unable to get question.</center>")}})},e}(window.HR.GenericView),d=function(a){function d(){return k=d.__super__.constructor.apply(this,arguments),k}return c(d,a),d.prototype.template="recruit/question-coding",d.prototype.className="question-coding",d.prototype.initialize=function(a){return this.question=a.question,this.solve=a.solve},d.prototype.render=function(){return $(this.el).html(b.appController.template(this.template,this)({question:this.question})),this.challengemodel=new b.ChallengeModel,this.challengemodel.set("compile_and_test",!0),this.challengemodel.set("recruit_test_mode",!0),this.challengemodel.set("custom_case",!0),this.challengemodel.set("languages",this.question.allowedLanguages.split(",")),this.header||(this.header=new b.CodeEditorHeaderView({model:this.challengemodel,parent:this})),this.body||(this.body=new b.CodeEditorBodyView({model:this.challengemodel,parent:this})),this.footer||(this.footer=new b.CodeEditorFooterView({model:this.challengemodel,parent:this})),this.assign({".codeeditor-header-wrapper":this.header,".codeeditor-body-wrapper":this.body,".codeeditor-footer-wrapper":this.footer}),this.set_answer(),this},d.prototype.answer=function(){return this.$(".code-answer").val()},d.prototype.set_answer=function(){return},d}(window.HR.GenericView),f=function(a){function d(){return l=d.__super__.constructor.apply(this,arguments),l}return c(d,a),d.prototype.template="recruit/question-mcq",d.prototype.className="question-mcq",d.prototype.initialize=function(a){return this.question=a.question,this.solve=a.solve},d.prototype.render=function(){return $(this.el).html(b.appController.template(this.template,this)({question:this.question})),this.set_answer(),this},d.prototype.answer=function(){var a,b=this;return this.question.type==="mcq"?(a=this.$("input[name=mcqopts]:checked").val(),a?a:null):(a=[],_.each(this.$("input[name=mcqopts]:checked"),function(c){return a.push(b.$(c).val())}),a.length?a:null)},d.prototype.set_answer=function(){var a,b,c,d,e;if(!this.solve)return;if(this.question.type==="mcq")return this.$("input#mcqopts"+this.solve.answer).prop("checked",!0);d=this.solve.answer,e=[];for(b=0,c=d.length;b<c;b++)a=d[b],e.push(this.$("input#mcqopts"+a).prop("checked",!0));return e},d}(window.HR.GenericView),h=function(a){function d(){return m=d.__super__.constructor.apply(this,arguments),m}return c(d,a),d.prototype.template="recruit/question-subjective",d.prototype.className="question-subjective",d.prototype.initialize=function(a){return this.question=a.question,this.solve=a.solve},d.prototype.render=function(){return $(this.el).html(b.appController.template(this.template,this)({question:this.question})),this.set_answer(),this},d.prototype.answer=function(){return this.$(".sub-answer").val()},d.prototype.set_answer=function(){if(this.solve)return this.$(".sub-answer").val(this.solve.answer)},d}(window.HR.GenericView),b=(n=window.HR)!=null?n:{},b.RecruitCandidateListView=e,b.RecruitCandidateQuestionView=g,b.RecruitCandidateCodingView=d,b.RecruitCandidateMcqView=f,b.RecruitCandidateSubjectiveView=h})}).call(this),function(){var a=function(a,b){return function(){return a.apply(b,arguments)}},b={}.hasOwnProperty,c=function(a,c){function e(){this.constructor=a}for(var d in c)b.call(c,d)&&(a[d]=c[d]);return e.prototype=c.prototype,a.prototype=new e,a.__super__=c.prototype,a};jQuery(function(){var b,d,e,f;return d=function(d){function f(){return this.loadTest=a(this.loadTest,this),e=f.__super__.constructor.apply(this,arguments),e}return c(f,d),f.prototype.template="recruit/login",f.prototype.className="candidate-login",f.prototype.events={"click .test-submit":"loginAction"},f.prototype.initialize=function(a){return this.unique_id=a.unique_id,this.authkey=a.authkey},f.prototype.render=function(){return $(this.el).html("<center><p>Loading</p></center>"),setTimeout(this.loadTest,200),this},f.prototype.loadTest=function(){var a,c=this;return a={},this.authkey&&(a[auth_key]=this.authkey),$.ajax({url:"/recruit/tests/"+this.unique_id,data:a,type:"get",success:function(a){return console.log("success",c.template),console.log(a),$(c.el).empty(),$(c.el).html(b.appController.template(c.template,c)({test:a.model,auth_valid:a.auth_valid})),c.$("input[type=checkbox]").iCheck({checkboxClass:"icheckbox_square-green",radioClass:"iradio_square-green"})},error:function(a){return console.log("error",a),b.router.navigate("",{trigger:!0,replace:!0})}})},f.prototype.loginAction=function(a){var c,d,e,f=this;d=this.$("input[name=username]").val(),e=this.$("input[name=password]").val(),c=this.$(".iagree").attr("checked")?!0:!1;if(!c){alert("You cannot take this test without agreeing to the specified conditions.");return}return $.ajax({url:"/recruit/tests/"+this.unique_id+"/login",data:{auth_key:this.authkey,email:d,password:e},type:"put",success:function(a){return console.log(a),b.router.navigate("tests/"+a.attempt+"/page/list",{trigger:!0})},error:function(a){return alert("Incorrect login information")}})},f}(window.HR.GenericView),b=(f=window.HR)!=null?f:{},b.RecruitCandidateLoginView=d})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="dashboard/base",e.prototype.className="dashboard-view",e.prototype.initialize=function(a){return this.hacker=c.profile(),this.dashboard=c.model("dashboard").cached(),this.listenTo(this.hacker,"reset",this.render),this.listenTo(this.dashboard,"reset",this.render),c.requires("compound/highcharts",function(){})},e.prototype.render=function(){return!this.hacker.sync_status||!this.dashboard.sync_status?($(this.el).html(c.appController.viewLoader(64)),this):($(this.el).html(c.appController.template(this.template,this)({model:this.dashboard.toJSON()})),this.historyView||(this.historyView=new c.DashboardHistoryView({model:c.profile().toJSON(),username:c.profile().get("username")})),this.trackView||(this.trackView=new c.DashboardTrackView({dashboard:this.dashboard})),this.submissionsView||(this.submissionsView=new c.DashboardSubmissionsView),this.assign({".dashboard_submissions":this.submissionsView,".dashboard_tracks":this.trackView,".dashboard_history":this.historyView}),this)},e}(window.HR.GenericView),c=(e=window.HR)!=null?e:{},c.DashboardView=a})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="dashboard/history",e.prototype.className="dashboard-history",e.prototype.initialize=function(a){return a==null&&(a={}),this.history=c.collection("dashboard-history"),this.history.setHacker(this.model.username),this.history.cached(),this.listenTo(this.history,"reset",this.render),this.listenTo(this.history,"change",this.render)},e.prototype.setupChange=function(){var a,b=this;return a=0,this.maxRank=0,this.lowestRank=null,this.history.each(function(c){var d,e;return e=c.get("rank"),d=e-a,e>b.maxRank&&(b.maxRank=e),b.lowestRank&&e<b.lowestRank&&(b.lowestRank=e),c.set({increase:d>=0,change:d,logged_at:new Date(c.get("logged_at"))},{silent:!0}),a=e})},e.prototype.renderChart=function(a){var b,d,e=this;return a==null&&(a={}),d=this,b={chart:{type:"line",zoomType:"x",backgroundColor:null,height:250},colors:["#00beff","#9bc0e3"],title:{text:null},legend:{enabled:!1},xAxis:{title:{text:null},categories:this.history.map(function(a){return a.get("logged_at")}),labels:{enabled:!1}},yAxis:{title:{text:null},labels:{enabled:!1},gridLineWidth:0,tickInterval:100},credits:{enabled:!1},series:[{data:this.history.map(function(a){return{y:d.maxRank-a.get("rank"),event:a}}),name:"Rank"}],tooltip:{formatter:function(){var a,b,c,d,e,f,g;return d=this.point.event,g=d.get("rank"),a=d.get("change"),f=d.get("logged_at"),e="<b>"+d.get("rank")+"</b>",g!==a&&(d.get("change")>=0?(b="red",c="+"):(b="green",c="-"),e+=' (<span style="color:'+b+'">'+c+" "+Math.abs(a)+"</span>)"),e+="<br/><i>"+f.toDateString()+"</i>",e}}},a=_.extend(b,a),c.requires("compound/highcharts",function(){return e.$(".history-chart").highcharts(a)})},e.prototype.render=function(){return $(this.el).html(c.appController.template(this.template,this)({history:this.history,model:this.model})),this.history.sync_status?(this.setupChange(),this.history.length>1&&this.renderChart(),this):($(this.el).html(c.appController.viewLoader()),this)},e}(window.HR.GenericView),c=(e=window.HR)!=null?e:{},c.DashboardHistoryView=a})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return c=function(c){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,c),e.prototype.template="dashboard/rating-history",e.prototype.className="dashboard-rating-history",e.prototype.initialize=function(a){var b;return a==null&&(a={}),this.rendered=!1,b=this,this.listenTo(this.model,"reset",this.render),this.listenTo(this.model,"change",this.render),$.ajax({async:!1,url:"rest/hackers/"+this.model.get("username")+"/rating_histories",success:function(a,c){return b.data=a}})},e.prototype.renderChart=function(b,c){var d,e,f,g,h,i,j,k=this;c==null&&(c={}),f=1500,j=b.events;for(h=0,i=j.length;h<i;h++)e=j[h],e.rating=Math.floor(e.rating),e.change=e.rating-f,f=e.rating;return g=this,d={chart:{type:"line",zoomType:"x",backgroundColor:null,height:250},colors:["#00beff","#9bc0e3"],title:{text:null},legend:{enabled:!1},xAxis:{title:{text:null},labels:{enabled:!1}},yAxis:{title:{text:null},labels:{format:"{value}"},gridLineWidth:0},credits:{enabled:!1},series:[{data:b.events.map(function(a){return{x:(new Date(a.date)).getTime(),y:a.rating,event:a}}),name:"Rank"}],tooltip:{formatter:function(){var a,b,c,d;return e=this.point.event,c=new Date(e.date),d="<a href='www.hackerrank.com/contests/"+e.contest_slug+"/leaderboard'>"+e.contest_name+"</a><br/>",d+="<b>"+e.rating+"</b>",e.change>=0?(a="green",b="+"):(a="red",b="-"),d+=' (<span style="color:'+a+'">'+b+Math.abs(e.change)+"</span>)<br/>",d+="<i>"+c.toDateString()+"</i>"}}},c=_.extend(d,c),a.requires("compound/highcharts",function(){return k.$("."+b.index+"-history-chart").highcharts(c)})},e.prototype.render=function(){var b,c,d,e,f,g,h,i,j,k;if(this.data&&this.model.sync_status){e=[{id:0,text:"Main"}],j=this.data.models;for(c=f=0,h=j.length;f<h;c=++f)b=j[c],e.push({id:c+1,text:b.category,count:b.events.length});d=this.model.toJSON().current_rating.track,$(this.el).html(a.appController.template(this.template,this)({model:e,track_rating:d})),k=this.data.models;for(c=g=0,i=k.length;g<i;c=++g)b=k[c],b.index=c+1,this.renderChart(b);this.historyView||(this.historyView=new a.DashboardHistoryView({model:this.model.toJSON()})),this.historyView.setElement(this.$(".0-history-chart")),this.historyView.render()}return this},e}(window.HR.GenericView),a=(e=window.HR)!=null?e:{},a.RatingHistoryView=c})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="dashboard/submission",e.prototype.className="dashboard-submission-view",e.prototype.initialize=function(a){return this.model=a.model,this.listenTo(this.model,"reset",this.render)},e.prototype.render=function(){return $(this.el).html(c.appController.template(this.template,this)({model:this.model.toJSON()})),this},e}(window.HR.GenericView),c=(e=window.HR)!=null?e:{},c.DashboardSubmissionView=a})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="dashboard/submissions",e.prototype.className="dashboard-submissions-view",e.prototype.initialize=function(a){return this.submissions=c.collection("submissions").cached(),this.listenTo(this.submissions,"reset",this.render)},e.prototype.render=function(){var a,b=this;return $(this.el).html("<p class='block-margin'>You have not submitted a solution to any challenges yet.</p>"),a=$("<div>"),this.submissions.length&&(_.each(this.submissions.slice(0,5),function(b){var d;return d=new c.DashboardSubmissionView({model:b}),a.append(d.render().el)}),$(this.el).html(a)),this},e}(window.HR.GenericView),c=(e=window.HR)!=null?e:{},c.DashboardSubmissionsView=a})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="dashboard/track",e.prototype.className="dashboard-track-view",e.prototype.initialize=function(a){return this.dashboard=a.dashboard,this.progress=c.model("dashboard-progress").cached(),this.listenTo(this.progress,"reset",this.render)},e.prototype.events={"click .track-select":"trackSelect"},e.prototype.currentName=function(){return this.track?this.track.get("name"):"All Tracks"},e.prototype.trackSelect=function(a){var b;return b=$(a.currentTarget),this.track_id=b.attr("data-track-id")||null,this.track=this.progress.tracks().get(this.track_id),this.render()},e.prototype.stats=function(){var a;return a=this.progress.stats(this.track_id),a.languages&&(a.languages[0]="<strong>"+a.languages[0]+"</strong>"),a},e.prototype.renderChart=function(a){var b,d,e=this;return a==null&&(a={}),d=this.stats(),b={chart:{plotBackgroundColor:null,plotBorderWidth:null,plotShadow:!1,backgroundColor:null,height:250},colors:["#2674c6","#ddd9d9"],title:{text:null},tooltip:{pointFormat:"{series.name}: <b>{point.percentage}%</b>",percentageDecimals:1},plotOptions:{pie:{allowPointSelect:!0,cursor:"pointer",dataLabels:{enabled:!1},innerSize:"30%",startAngle:-90}},series:[{type:"pie",name:"Challenges share",data:[{name:"Completed",y:d.completion,sliced:!0,selected:!0},{name:"Remaining",y:100-d.completion}]}]},a=_.extend(b,a),c.requires("compound/highcharts",function(){return $(".track-chart").highcharts(a)})},e.prototype.render=function(){return $(this.el).html(c.appController.template(this.template,this)({model:this.progress.toJSON(),stats:this.stats(),currentName:this.currentName()})),this.progress.sync_status?(this.renderChart(),this.delegateEvents(),this):($(this.el).html(c.appController.viewLoader()),this)},e}(window.HR.GenericView),c=(e=window.HR)!=null?e:{},c.DashboardTrackView=a})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="codeeditor-header",e.prototype.className="codeeditor-header-view",e.prototype.initialize=function(a){return console.log(this.model),this.MIME=window.lang_mime_mapping,this.default_head_end=window.default_head_end,this.default_tail_start=window.default_tail_start,this.parent=a.parent,this.profile=c.profile()||{},this.isFullscreened=!1},e.prototype.events={"change #language-select":"setLanguageFromSelect","click .fullscreen":"popFullscreen","click .restorefullscreen":"restorefullscreen","click .revert":"revertCode","click .editor-mode-button":"setEditorModeClick","click .save-code":"saveCode","click .toggle-theme":"toggleTheme"},e.prototype.render=function(){var a,b,d;return $(this.el).html(c.appController.template(this.template,this)({profile:this.profile})),this.setUpLanguageSelect(),this.renderLangCode(),d=this,a=function(){return c.appView.contentView.body.request_view.codeeditor.body.$(".CodeMirror").offset()?c.appView.contentView.body.request_view.codeeditor.header.renderLangCode():setTimeout(a,200)},a(),b=function(){return d.parent.body.editor?d.setEditorModeFromCookie():setTimeout(b,200)},b(),this},e.prototype.renderLangCode=function(){var a;return a=$.cookie("hacker_language_pref"),this.set_lang_from_submission?this.setLanguage(this.set_lang_from_submission_data.lang,this.set_lang_from_submission_data.code):this.isAllowedLanguage(a)?this.setLanguage(a,$.jStorage.get(this.getLocalStorageKey({language:a}))):this.setLanguage(this.model.get("languages")[0])},e.prototype.setLangFromSubmission=function(a,b){return this.set_lang_from_submission=!0,this.set_lang_from_submission_data={lang:a,code:b},$.cookie("hacker_language_pref",a,{expires:365}),this.setLanguage(this.set_lang_from_submission_data.lang,this.set_lang_from_submission_data.code)},e.prototype.setUpLanguageSelect=function(){var a,b,c=this;return b=this.model.get("languages"),a=[],_.each(b.sort(),function(b){return a.push({id:b,text:window.lang_display_mapping[b]})}),$(this.el).find("#language-select").select2({data:a,width:"copy"})},e.prototype.getLocalStorageKey=function(a){var b,c,d;return a==null&&(a={}),b=this.profile.get("id")?this.profile.get("id"):"Guest",c=a.language||this.parent.header.getLanguage(),d=a.slug||this.model.get("slug"),"HR-local-"+b+"-"+c+"-"+d},e.prototype.revertCode=function(a){var b,c=this;return a.preventDefault(),b=$.cookie("hacker_language_pref"),this.set_lang_from_submission=!1,this.model.cached({fetch:!0,showLoader:!0,success:function(){return $.jStorage.deleteKey(c.getLocalStorageKey({language:b})),c.setLanguage(c.getLanguage()),$(document).scrollTop($(c.el).offset().top)}})},e.prototype.getLanguage=function(){return $(this.el).find("#language-select").val()},e.prototype.setLanguageFromSelect=function(a){var b;a.preventDefault(),b=$(this.el).find("#language-select").val();if(this.isAllowedLanguage(b))return $.cookie("hacker_language_pref",b,{expires:365}),this.setLanguage(b)},e.prototype.isAllowedLanguage=function(a){var b;return a?(b=this.model.get("languages"),_.indexOf(b,a)===-1?!1:!0):!1},e.prototype._stripTabs=function(a){var b,c;return b=Array(4).join(" "),c="\t",a===void 0?"":a.split(c).join(b)},e.prototype.setLanguage=function(a,b){return b==null&&(b=null),this.isAllowedLanguage(a)?($(this.el).find("#language-select").val(a),$(this.el).find(".select2-choice span").text(window.lang_display_mapping[a]),this.setCodeEditor(a,b)):!1},e.prototype.setEditorModeFromCookie=function(){var a;return a=$.cookie("hacker_editor_pref"),a!=="vim"&&a!=="emacs"&&a!=="default"&&(a="default"),this.setEditorMode(a)},e.prototype.setEditorModeClick=function(a){var b;return a.preventDefault(),b=this.$(a.target).data("editor"),this.setEditorMode(b),this.parent.body.editor.focus()},e.prototype.setEditorMode=function(a){return this.currentEditorMode=a,$(this.el).find(".editor-mode-button").removeClass("disabled"),$(this.el).find("."+a).addClass("disabled"),this.parent.body.editor&&(this.parent.body.editor.setOption("keyMap",a),this.parent.body.updateStatusBar(this.parent.body.editor)),$.cookie("hacker_editor_pref",a,{expires:365})},e.prototype.setCodeEditor=function(a,b){var c,d,e,f;return b==null&&(b=null),this.isAllowedLanguage(a)?(d=a+"_template",f=this.model.get("_data"),this.parent.body.editor&&(this.parent.body.editor.setOption("mode",this.MIME[a]),e=$.jStorage.get(this.getLocalStorageKey()),b!==null?this.parent.body.editor.setValue(b):!_.isEmpty(e)&&a!=="javascript"?this.parent.body.editor.setValue(e):this.model.get("saved_code")&&this.model.get("saved_language")&&this.model.get("saved_language")===a?this.setCodeEditor(this.model.get("saved_language"),this.model.get("saved_code")):f[d]?(f[d+"_head"]&&f[d+"_tail"]?c=this._stripTabs(f[d+"_head"])+"\n"+this.default_head_end[a]+"\n"+this._stripTabs(f[d])+"\n"+this.default_tail_start[a]+"\n"+this._stripTabs(f[d+"_tail"]):f[d+"_head"]?c=this._stripTabs(f[d+"_head"])+"\n"+this.default_head_end[a]+"\n"+this._stripTabs(f[d]):f[d+"_tail"]?c=this._stripTabs(f[d])+"\n"+this.default_tail_start[a]+"\n"+this._stripTabs(f[d+"_tail"]):c=this._stripTabs(f[d]),this.parent.body.editor.setValue(c)):lang_default_text[a]?this.parent.body.editor.setValue(lang_default_text[a]):this.parent.body.editor.setValue("")),this.foldEditorCode(),this):!1},e.prototype.foldEditorCode=function(){var a,b,c,d,e;if(this.parent.body.foldFunc&&this.parent.body.editor){a=this.parent.body.editor.getValue(),a.indexOf("Head ends")!==-1&&this.parent.body.foldFunc(this.parent.body.editor,0);if(a.indexOf("Tail starts")!==-1){c=a.indexOf("Tail starts"),e=a.substr(0,c),b=0;while(e.indexOf("\n")!==-1)b++,e=e.substr(e.indexOf("\n")+1);return d=b,this.parent.body.foldFunc(this.parent.body.editor,d)}}},e.prototype.popFullscreen=function(a){return a.preventDefault(),this.parent.body.updateLocalStorage(),this.fullscreen||(this.fullscreen=new c.FullScreenView({model:this.model,parent:this})),this.fullscreen.render(),this.isFullscreened=!0,this.$(".fullscreen").addClass("force-hide"),this.$(".restorefullscreen").removeClass("force-hide")},e.prototype.restorefullscreen=function(a){return a.preventDefault(),this.parent.body.updateLocalStorage(),this.fullscreen.unRender(),this.isFullscreened=!1,this.$(".fullscreen").removeClass("force-hide"),this.$(".restorefullscreen").addClass("force-hide")},e.prototype.saveCode=function(a){return a.preventDefault(),$(a.currentTarget).html("saving..."),this.updateDatabaseVersion(a)},e.prototype.updateDatabaseVersion=function(a){var b,d,e,f,g;a==null&&(a=null),d=c.appView.contentView.body.request_view.codeeditor.header,b=c.appView.contentView.body.request_view.codeeditor.body.editor;if(d===void 0||b===void 0)return;return e=d.getLanguage(),g=b.getValue(),f=function(b){if(a)return $(a.currentTarget).html("saved")},this.model.save_code(e,g,f)},e.prototype.toggleTheme=function(a){var b,d,e;d=$.cookie("hacker_editor_theme"),d&&d==="light"?(b="dark",e="ambiance"):(b="light",e="default");try{return $.cookie("hacker_editor_theme",b),c.appView.contentView.body.request_view.codeeditor.body.editor.setOption("theme",e)}catch(f){}},e}(window.HR.GenericView),c=window.HR||{},c.CodeEditorHeaderView=a})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="codeeditor-body",e.prototype.className="codeeditor-body-view",e.prototype.initialize=function(a){return this.parent=a.parent,this.profile=c.profile(),this.model.bind("reset",this.render,this),this.model.bind("change",this.render,this),this.throttledSaveCode=_.throttle(this.updateLocalStorage,1e3)},e.prototype.updateLocalStorage=function(){var a,b,d,e,f;try{c.appView.contentView.body.request_view.codeeditor.header}catch(g){b=g;return}d=c.appView.contentView.body.request_view.codeeditor.header,a=c.appView.contentView.body.request_view.codeeditor.body.editor;if(d===void 0||a===void 0)return;e=d.getLocalStorageKey(),f=a.getValue(),f===""?$.jStorage.deleteKey(e):$.jStorage.set(e,f);if(d.$(".save-code").html()==="saved")return d.$(".save-code").html("save code")},e.prototype.updateStatusBar=function(a,b){var c,d;return c=$(this.el).find("#codeeditor-statusbar"),d=function(){switch(a.options.keyMap){case"vim":return"-- VIM --";case"vim-insert":return"-- INSERT --";case"emacs":return"EMACS";case"emacs-Ctrl-X":return"C-x-";default:return""}}(),$("#statusbar-mode").text(d)},e.prototype.updatePosition=function(a,b){var c;return c=a.doc.getCursor(),$("#statusbar-line").text("Line: "+(c.line+1)),$("#statusbar-col").text("Col: "+(c.ch+1))},e.prototype.updateCharCount=function(a,b){var c;return c=a.doc.getValue().length,$("#statusbar-count").text("Count: "+c)},e.prototype.render=function(){var a,b,d,e,f;return $(this.el).html(c.appController.template(this.template,this)()),a=this.$("#codeeditor").get(0),this.$("#codeeditor").siblings(".CodeMirror").length===0&&a!==void 0&&(this.foldFunc=CodeMirror.newFoldFunction(CodeMirror.autoFold),e=this,b={lineNumbers:!0,lineWrapping:!0,matchBrackets:!0,autoCloseBrackets:!0,cursorScrollMargin:2,extraKeys:{"Ctrl-Q":function(a){return e.foldFunc(a,a.getCursor().line)},Tab:function(a){return CodeMirror.commands.blockIndent(a,"add")},"Shift-Tab":function(a){return CodeMirror.commands.blockIndent(a,"subtract")},"Ctrl-/":function(a){return CodeMirror.commands.toggleComment(a)}},mode:"text/x-csrc",indentUnit:4,tabSize:4},this.editor=CodeMirror.fromTextArea(a,b),d=$.cookie("hacker_editor_theme"),d&&d==="light"?f="default":f="ambiance",this.editor.setOption("theme",f),this.editor.on("gutterClick",this.foldFunc),this.editor.on("change",this.throttledSaveCode),this.editor.on("update",this.updateStatusBar),this.editor.on("cursorActivity",this.updatePosition),this.editor.on("change",this.updateCharCount)),this.parent.header.setCodeEditor(this.parent.header.getLanguage()),this},e}(window.HR.GenericView),c=(e=window.HR)!=null?e:{},c.CodeEditorBodyView=a})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="codeeditor-footer",e.prototype.className="codeeditor-footer-view",e.prototype.initialize=function(a){return a==null&&(a={}),this.profile=c.profile(),this.parent=a.parent,this.profile.bind("change",this.updateSubmitButton,this),this.profile.bind("reset",this.updateSubmitButton,this)},e.prototype.events={"click .access-buttons button.compile":"compileAndTest","click .access-buttons button.submit":"submitPopup","change #customtestcase":"customTestcase","click .upload_file":"uploadFileDialog"},e.prototype.render=function(){return $(this.el).html(c.appController.template(this.template,this)({model:this.model.toJSON(),profile:this.profile})),this.updateSubmitButton(),this},e.prototype.uploadFileDialog=function(a){var b,d,e,f;return a.preventDefault(),f=this,e=[{name:"source_file",title:"Source File",type:"file"},{name:"challenge_id",value:f.model.get("id"),type:"hidden"},{name:"contest_id",value:f.model.get("contest_id"),type:"hidden"},{name:"language",value:f.parent.header.getLanguage(),type:"hidden"},{name:"is_file_upload",value:"1",type:"hidden"}],b=[{name:"Upload",callback:function(a){var b,c,d;return c=this,b=a.$form(),d=new FormData(b[0]),c.unSetFailedMsg(),$.ajax({url:"/rest/upload_respawn",type:"POST",data:d,cache:!1,contentType:!1,processData:!1,success:function(b){return c.setInactive(),b.ok?f.parent.header.setLanguage(b.data.language,b.data.source)?a.destroy():c.failed("Language not supported for this challenge"):c.failed(b.message)}})}}],d=new c.util.ShowFormDialog({title:"Upload Dialog",width:650,enctype:"multipart/form-data",fields:e,buttons:b}),d.render()},e.prototype.updateSubmitButton=function(){var a;return this.profile.isLoggedIn()?(this.model.get("compile_and_test")?a="Submit Code":a="Submit",$(this.el).find("button.submit").html(a)):$(this.el).find("button.submit").html("Login to Submit")},e.prototype.submitPopup=function(a){var b,d,e,f;a.preventDefault(),e=this;if($(a.currentTarget).attr("btn-disabled")==="disabled")return;$(a.currentTarget).attr("btn-disabled","disabled"),$(a.currentTarget).addClass("disabled");if($.inArray(this.model.get("id"),c.CHALLENGES_DISABLED)>=0||c.CONTEST_DISABLED){d=new c.util.ShowSubmitDisabledDialog,d.render();return}if(!this.profile.isLoggedIn()){$(a.currentTarget).html("Logging in"),f=function(){return e.profile.isLoggedIn()?($(a.currentTarget).removeAttr("btn-disabled"),$(a.currentTarget).removeClass("disabled"),$(a.currentTarget).click()):setTimeout(f,100)},b=new c.util.ShowLoginDialog({body_text:"Please login in order to submit",onDestroy:function(){return e.updateSubmitButton(),$(a.currentTarget).removeAttr("btn-disabled"),$(a.currentTarget).removeClass("disabled")},success_callback:function(){return setTimeout(f,100)},show_sign_up_link:!0}),b.render();return}return $(a.currentTarget).html
("Submitting"),b=new c.util.ShowConfirmationDialog({title:"Confirm Submission",body:"Are you sure you want to submit this code?",onDestroy:function(){return e.updateSubmitButton(),$(a.currentTarget).removeAttr("btn-disabled"),$(a.currentTarget).removeClass("disabled")},buttons:[{name:"No, do not submit","class":"hr_secondary-btn hr-dialog-button",callback:function(a){return e.model&&e.model.get&&e.parent&&e.parent.header&&c.profile()&&mixpanel.track("Submit Code",{challenge:e.model.get("slug"),contest:e.model.get("contest_slug"),kind:e.model.get("kind"),language:e.parent.header.getLanguage(),fullscreen:e.parent.header.isFullscreened,editor:e.parent.header.currentEditorMode,username:c.profile().username}),this.setInactive(),a.destroy()}},{name:"Yes, submit my code","class":"hr_primary-btn hr-dialog-button",callback:function(a){var b,d;e.model&&e.model.get&&e.parent&&e.parent.header&&c.profile()&&mixpanel.track("Submit Code",{challenge:e.model.get("slug"),contest:e.model.get("contest_slug"),kind:e.model.get("kind"),language:e.parent.header.getLanguage(),fullscreen:e.parent.header.isFullscreened,editor:e.parent.header.currentEditorMode,username:c.profile().username}),b=this;if(e.submitLock&&e.submitLock===!0)return;return e.parent.header.getLanguage()!==""?(this.setInactive(),e.submitLock=!0,$.jStorage.deleteKey(e.parent.header.getLocalStorageKey()),d=c.model("submission",{code:e.parent.body.editor.getValue(),language:e.parent.header.getLanguage(),contest_slug:e.model.contest_slug||e.model.get("contest_slug")}),d.setChallenge(e.model),d.save(null,{success:function(b,d){return _gaq.push(["_trackPageview","/submitcode/"+(e.model.get("contest_slug")||e.model.contest_slug)+"/"+e.model.slug+"/"]),c.QUEUED_SUBMISSIONS||(c.QUEUED_SUBMISSIONS={}),c.QUEUED_SUBMISSIONS[b.get("id")]=!0,e.submitLock=!1,d.status?(a.destroy(),e.parent.parent.unrenderFullScreenView(),b.set("kind",e.model.get("kind"),{silent:!0}),c.router.navigate(b.pageURL(),!0),$("html body").animate({scrollTop:0},300)):a.showError(d.message)}})):(this.setInactive(),a.showError("Select a language!"))}}]}),b.render()},e.prototype.customTestcase=function(a){var b;return b=$(a.currentTarget).attr("checked"),b?this.$("#custominput").slideDown():this.$("#custominput").slideUp()},e.prototype.compileAndTest=function(a){var b,d;a.preventDefault(),d=this.parent.parent.parent.response_view;if($(a.currentTarget).attr("btn-disabled")==="disabled")return;if(_.isEmpty(this.parent.header.getLanguage()))return;return $(a.currentTarget).attr("btn-disabled","disabled"),$(a.currentTarget).addClass("disabled"),b=new c.CompileTestModel({code:this.parent.body.editor.getValue(),language:this.parent.header.getLanguage()}),b.setChallenge(this.model),this.$("#customtestcase").attr("checked")?(b.set("customtestcase",!0),b.set("custominput",this.$("#custominput").val())):b.set("customtestcase",!1),b.save(),b.bind("change:status",this.enableCompileTest,this),d.setCompileTest(b)},e.prototype.enableCompileTest=function(a,b){var c;if(b>0){this.$("button.compile").removeAttr("btn-disabled"),this.$("button.compile").removeClass("disabled");if(c=a.get("error"))return this.parent.parent.parent.response_view.showError()}},e}(window.HR.GenericView),c=window.HR||{},c.CodeEditorFooterView=a})}.call(this)