(function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="challenge",e.prototype.className="challenge-view container",e.prototype.events={"click a.hr-problem-link":"clickProblem","click a.hr-submissions-link":"clickSubmissions","click a.hr-leaderboard-link":"clickLeaderboard","click a.hr-forum-link":"clickForum","change #showPractice":"toggleLeaderboard","click .pagination a":"changePagination"},e.prototype.initialize=function(a){return this.activeTab=a.activeTab,this.paramPage=a.paramPage,this.customView=a.customView,this.includePractice=!0,this.leaderboardFilter=a.leaderboardFilter,this.contest=new c.model("contest"),this.contest.set("slug",this.model.get("contest_slug")),this.contest.cached(),this.listenTo(this.model,"reset",this.render),this.listenTo(this.contest,"reset",this.render)},e.prototype.setTab=function(a){return this.$("ul.nav-tabs li").removeClass("active"),this.$(a).addClass("active")},e.prototype.setProblem=function(){var a,b,d=this;return a=this.model.get("contest_slug"),this.setTab("#problemTab"),this.body=new c.ChallengeTemplateView({model:this.model}),this.assign({".challenge-body":this.body}),window.touring&&!window.tour_up&&(window.tour_up=!0,b=function(){var a;return a=[".hr_tour-challenge-name",".hr_tour-problem-statement",".hr_tour-select-language",".hr_tour-code-solution",".hr_tour-compile-test",".hr_tour-submit-code"],_.every(_.map(a,function(a){return $(a).length>0}),_.identity)?$("#hr_tour-intro-tour").joyride({modal:!0,expose:!0,autoStart:!0,tipAnimation:"fade",preStepCallback:function(a,b){if(a===3)return setTimeout(function(){return d.body.request_view.codeeditor.body.editor.focus()},350)},postStepCallback:function(a,b){var e;e=null,window.tourABTest&&(e=window.tourABTest.get("variant"),window.tourABTest.updateStatus(100+a)),mixpanel.track("tour-intro",{step:a,hacker:c.profile().get("username"),challenge:d.model.get("slug"),variant:e});if(a===4)return $(".hr_tour-submit-code").on("click",function(){return $(".joyride-tip-guide[data-index=5] .joyride-close-tip").click()})}}):setTimeout(function(){return b()},300)},b()),a===null&&(a="master"),c.appController.set_contest_namespace(a),window.mixpanel_data={landing:!1,contest:a,page_type:"challengepage",challenge:this.model.get("slug")}},e.prototype.clickProblem=function(a){a.preventDefault();if("/"+Backbone.history.fragment==""+this.model.pageURL())return;return c.router.navigate(this.model.pageURL(),!1),this.setProblem()},e.prototype.setSubmissions=function(a){var b,d,e;return a==null&&(a=1),this.activeTab="submissions",b=this.model.get("slug"),d=this.model.get("contest_slug"),this.submissions||(this.submissions=c.collection("submissions")),this.submissions.setPage(a),this.submissions.setContest(d),this.submissions.setChallenge(b),this.submissions.cached(),e=this,c.requires("compound/submission-views",function(){return e.body=new c.SubmissionsView({collection:e.submissions}),e.assign({".challenge-body":e.body}),e.setTab("#submissionsTab"),d===null&&(d="master"),c.appController.set_contest_namespace(d),window.mixpanel_data={landing:!1,contest:d,page_type:"submissions",challenge:b}})},e.prototype.clickSubmissions=function(a){a.preventDefault();if("/"+Backbone.history.fragment==""+this.model.pageURL()+"/submissions")return;return c.router.navigate(this.model.pageURL()+"/submissions",!1),this.setSubmissions()},e.prototype.setForum=function(a){var b,d,e,f;return a==null&&(a=1),this.activeTab="forum",f=this,b=this.model.get("slug"),d=this.model.get("contest_slug"),e=new c.QuestionCollection,e.page=a,e.setChallengeSlug(b),c.requires("compound/forum-views",function(){return f.body=new c.ChallengeQuestionsView({challenge:f.model,collection:e}),f.assign({".challenge-body":f.body},f.setTab("#forumTab")),c.appController.set_contest_namespace(d),window.mixpanel_data={landing:!1,contest:d,challenge:b}})},e.prototype.clickForum=function(a){a.preventDefault();if("/"+Backbone.history.fragment==""+this.model.pageURL()+"/forum/questions")return;return c.router.navigate(this.model.pageURL()+"/forum/questions",!1),this.setForum()},e.prototype.setLeaderboard=function(a){var b,d;return a==null&&(a=1),b=this.model.get("contest_slug"),this.activeTab="leaderboard",this.leaderboard_collection||(this.leaderboard_collection=c.collection("leaderboard"),this.leaderboard_collection.setPage(a),this.leaderboard_collection.setContestSlug(b),this.leaderboard_collection.setChallenge(this.model.get("slug")),this.leaderboard_collection.setChallengeLeaderboard(),this.leaderboard_collection.setIncludePractice(this.includePractice),this.leaderboardFilter&&this.leaderboard_collection.setFiltersFromString(this.leaderboardFilter),this.leaderboard_collection.cached()),d=new c.LeaderboardView({collection:this.leaderboard_collection,profile:c.profile(),contest:this.contest,challenge:this.model}),this.setTab("#leaderboardTab"),c.appController.setTitle("Leaderboard"),this.body=d,this.assign({".challenge-body":this.body}),b===null&&(b="master"),c.appController.set_contest_namespace(this.model.get("contest_slug")),window.mixpanel_data={landing:!1,contest:b}},e.prototype.clickLeaderboard=function(a){a.preventDefault();if("/"+Backbone.history.fragment==""+this.model.pageURL()+"/leaderboard")return;return c.router.navigate(this.model.pageURL()+"/leaderboard",!1),this.setLeaderboard()},e.prototype.toggleLeaderboard=function(a){return this.leaderboard_collection.setIncludePractice(a.currentTarget.checked),this.leaderboard_collection.cached({fetch:!0})},e.prototype.changePagination=function(a){var b,d;if(this.activeTab==="leaderboard")return d=$(a.currentTarget).attr("data-page"),b=$(a.currentTarget).attr("href"),c.router.navigate(b,!1),this.leaderboard_collection.setPage(d),this.leaderboard_collection.cached({fetch:!0}),!1},e.prototype.render=function(){return!this.model.sync_status||!this.contest.sync_status?($(this.el).html(c.appController.viewLoader(64)),this):($(this.el).html(c.appController.template(this.template,this)({model:this.model})),this.header||(this.header=new c.ChallengeHeaderView({model:this.model,contest:this.contest,activeTab:this.activeTab})),this.assign({".challenge-header":this.header}),this.renderBody(),this)},e.prototype.renderBody=function(){return this.customView?(this.body=this.customView,this.assign({".challenge-body":this.body})):this.activeTab==="leaderboard"?this.setLeaderboard(this.paramPage||1):this.activeTab==="submissions"?this.setSubmissions(this.paramPage||1):this.activeTab==="forum"?this.setForum(this.paramPage||1):this.setProblem()},e}(window.HR.GenericView),c=(e=window.HR)!=null?e:{},c.ChallengeView=a})}).call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="challenge-header",e.prototype.className="challenge-header-view",e.prototype.initialize=function(a){return this.activeTab=a.activeTab,this.contest=a.contest,this.model.bind("change",this.render,this),this.model.bind("reset",this.render,this)},e.prototype.render=function(){var a,b;return $(this.el).html(c.appController.template(this.template,this)({model:this.model.toJSON(),contest:this.contest,baseURL:this.model.pageURL(),activeTab:this.activeTab})),this.$(".apply-blob")&&(this.apply_blob_view?this.apply_blob_view.setElement(this.$(".apply-blob")):(this.apply_blob_view=new c.ViewShiv({view:"apply-blob",model:this.model,el:this.$(".apply-blob")}),this.add_subview(this.apply_blob_view)),this.apply_blob_view.render()),a=this.model.breadCrumbs(),a.remove(a.last()),b=c.util.renderBreadCrumbs(this.$("div.breadcrumbs"),a),this.add_subview(b),this},e}(window.HR.GenericView),c=window.HR||{},c.ChallengeHeaderView=a})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="challenge-template",e.prototype.className="challenge-template-view",e.prototype.render=function(){return $(this.el).html('<div class="challenge-content"></div><div class="challenge-request"></div><div class="challenge-response"></div>'),this.content_view||(this.content_view=new c.ChallengeContentView({parent:this,model:this.model})),this.request_view||(this.request_view=new c.ChallengeRequestView({parent:this,model:this.model})),this.response_view||(this.response_view=new c.ChallengeResponseView({parent:this,model:this.model})),this.assign({".challenge-content":this.content_view,".challenge-request":this.request_view,".challenge-response":this.response_view}),this},e}(window.HR.GenericView),c=window.HR||{},c.ChallengeTemplateView=a})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="challenge-content",e.prototype.className="challenge-content-view",e.prototype.events=function(){return{"click .js-suggest-edits":"showSuggestionDiv","click .js-suggestion-save":"makeSuggestion","click .js-suggestion-cancel":"hideSuggestionDiv"}},e.prototype.initialize=function(){return this.model.bind("change",this.render,this),this.model.bind("reset",this.render,this)},e.prototype.render=function(){return $(this.el).html(c.appController.template(this.template,this)({model:this.model.toJSON(),baseURL:this.model.pageURL()})),this},e.prototype.hideSuggestionDiv=function(a){return a.preventDefault(),$("#suggestion-form").slideToggle(),$(".js-suggest-edits").addClass("in")},e.prototype.showSuggestionDiv=function(a){return a.preventDefault(),$("#suggestion-form").slideToggle(),$(".js-suggest-edits").removeClass("in")},e.prototype.makeSuggestion=function(a){var b;return $(a.currentTarget).html("Processing Request...").attr("disabled","disabled"),a.preventDefault(),b={suggestion:$("#suggestion").val(),challenge_id:this.model.get("id"),challenge_url:"www.hackerrank.com/"+Backbone.history.fragment,contest_slug:c.appController.get_current_contest_slug()},$.ajax({url:"/rest/challenge_edit_suggestion",type:"POST",data:b,success:function(b){var c,d,e,f;$(a.currentTarget).removeAttr("disabled").html("Submit");if(b.status)return $(".alert.error").hide(),$("#suggestion-form").slideToggle();if(b.errors.length===0)c="Unknown Error";else if(b.errors.length===1)c=b.errors[0];else{c="<ul style='text-align: left;'>",e=b.errors.length-1;for(d=f=0;0<=e?f<=e:f>=e;d=0<=e?++f:--f)c+="<li>"+b.errors[d]+"</li>";c+="</ul>"}return $(".alert.error").show().html(c)},error:function(a,b,c){return c===403?$(".alert.error").show().html("Please log in to suggest an edit."):$(".alert.error").show().html("Unknown Error")}}),this.dialog=new c.util.ShowDialog(dialog_options),this.dialog.render()},e}(window.HR.GenericView),c=window.HR||{},c.ChallengeContentView=a})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="challenge-request",e.prototype.className="challenge-request-view",e.prototype.initialize=function(a){return this.model.bind("change",this.render,this),this.model.bind("reset",this.render,this),this.parent=a.parent},e.prototype.render=function(){return $(this.el).html(c.appController.template(this.template,this)()),$.inArray(this.model.get("kind"),["code","game"])!==-1&&(this.codeeditor||(this.codeeditor=new c.CodeEditorView({model:this.model,parent:this})),this.assign({"div.codeeditor-wrapper":this.codeeditor})),this},e.prototype.unSetFullScreenView=function(){return this.fullscreen_view=void 0},e.prototype.setFullScreenView=function(a){return this.fullscreen_view=a},e.prototype.unrenderFullScreenView=function(){if(this.fullscreen_view)return this.fullscreen_view.unRender()},e}(window.HR.GenericView),c=window.HR||{},c.ChallengeRequestView=a})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="challenge-response",e.prototype.className="challenge-response-view",e.prototype.initialize=function(){return this.model.bind("change",this.render,this),this.model.bind("reset",this.render,this)},e.prototype.render=function(){return $(this.el).html("<div class='output-progress padded hide light-wrap'></div>\n<div class='output-area-wrap hide'>\n  <div class='output-area padded light-wrap' id='output-area'></div>\n</div>"),this.renderSubView(),this},e.prototype.renderSubView=function(){return this.compile_test?(this.model.get("kind")==="game"?this.subview||(this.subview=new c.GameCompileTestView({model:this.compile_test,parent:this})):this.model.get("kind")==="code"&&(this.subview||(this.subview=new c.CodeCompileTestView({model:this.compile_test,parent:this}))),this.assign({"#output-area":this.subview}),this.showHideViews()):this.clear()},e.prototype.setCompileTest=function(a){return this.compile_test&&(this.stopListening(this.compile_test),this.clear()),this.compile_test=a,this.listenTo(this.compile_test,"reset",this.showHideViews),this.listenTo(this.compile_test,"change:id",this.showHideViews),this.render()},e.prototype.showHideViews=function(){return this.compile_test.get("status")>0||_.isArray(this.compile_test.get("games"))&&this.compile_test.get("games").length>0?(this.$(".output-progress").addClass("hide"),this.$(".output-area-wrap").removeClass("hide")):(this.$(".output-progress").removeClass("hide"),_.isNumber(this.compile_test.get("id"))?this.$(".output-progress").html("Processing"):this.$(".output-progress").html("Uploading"))},e.prototype.showError=function(){return this.$(".output-progress").html("<p class='error'>"+this.compile_test.get("error")+"</p>")},e.prototype.clear=function(){return this.subview&&(this.subview.destroy(),this.subview=void 0),this.$(".output-area").addClass("hide")},e}(window.HR.GenericView),c=window.HR||{},c.ChallengeResponseView=a})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.el="body",e.prototype.template="fullscreen",e.prototype.initialize=function(a){return this.profile=c.profile(),this.parent=a.parent,this.template_view=this.parent.parent.parent.parent},e.prototype.render=function(){var a,b,c=this;return b=this,$(this.el).find("#fullscreen-wrapper").length===0&&$(this.el).append("<div id='fullscreen-wrapper'></div>"),$(this.el).css("overflow-y","hidden"),$(this.el).find("#fullscreen-wrapper").show(),$(this.el).find("#fullscreen-wrapper").height($(window).height()).html(_.template('<div class="left-sidebar">          <div class="challenge-content"></div>        </div>        <div class="separator"></div>        <div class="right-sidebar">          <div class="challenge-request"></div>          <div class="challenge-response"></div>        </div>        <div class="clearfix"></div>')({model:this.model.toJSON()})),this.$left_sidebar=$(this.el).find("#fullscreen-wrapper .left-sidebar"),this.$right_sidebar=$(this.el).find("#fullscreen-wrapper .right-sidebar"),this.$separator=$(this.el).find("#fullscreen-wrapper .separator"),a=function(){return c.$left_sidebar.height($(window).height()),c.$right_sidebar.height($(window).height()),c.$separator.height($(window).height())},a(),$(window).resize(a),this.template_view.request_view.setFullScreenView(this),this.assign({".left-sidebar .challenge-content":this.template_view.content_view,".right-sidebar .challenge-request":this.template_view.request_view,".right-sidebar .challenge-response":this.template_view.response_view}),$("div.separator").dragResize({activeColor:"#AAA",inactiveColor:"#DDD",resize:function(a,c){var d,e,f,g,h,i;return i=7,d=$(window).width(),f=a-3,h=d-(f+10),e=100*(f/d)+"%",g=100*(h/d)+"%",b.$left_sidebar.css("width",e),b.$right_sidebar.css("width",g)}}),this},e.prototype.unRender=function(){return $(this.el).css("overflow-y","visible"),$(this.el).find("#fullscreen-wrapper").length>0&&$(this.el).find("#fullscreen-wrapper").unbind().remove(),this.template_view.request_view.unSetFullScreenView(this),this.template_view.render()},e}(window.HR.GenericView),c=window.HR||{},c.FullScreenView=a})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="codeeditor-header",e.prototype.className="codeeditor-header-view",e.prototype.initialize=function(a){return this.MIME=window.lang_mime_mapping,this.default_head_end=window.default_head_end,this.default_tail_start=window.default_tail_start,this.parent=a.parent,this.profile=c.profile()||{},this.isFullscreened=!1},e.prototype.events={"change #language-select":"setLanguageFromSelect","click .fullscreen":"popFullscreen","click .restorefullscreen":"restorefullscreen","click .revert":"revertCode","click .editor-mode-button":"setEditorModeClick","click .save-code":"saveCode","click .toggle-theme":"toggleTheme"},e.prototype.render=function(){var a,b,d;return $(this.el).html(c.appController.template(this.template,this)({profile:this.profile})),this.setUpLanguageSelect(),this.renderLangCode(),d=this,a=function(){return c.appView.contentView.body.request_view.codeeditor.body.$(".CodeMirror").offset()?c.appView.contentView.body.request_view.codeeditor.header.renderLangCode():setTimeout(a,200)},a(),b=function(){return d.parent.body.editor?d.setEditorModeFromCookie():setTimeout(b,200)},b(),this},e.prototype.renderLangCode=function(){var a;return a=$.cookie("hacker_language_pref"),this.set_lang_from_submission?this.setLanguage(this.set_lang_from_submission_data.lang,this.set_lang_from_submission_data.code):this.isAllowedLanguage(a)?this.setLanguage(a,$.jStorage.get(this.getLocalStorageKey({language:a}))):this.setLanguage(this.model.get("languages")[0])},e.prototype.setLangFromSubmission=function(a,b){return this.set_lang_from_submission=!0,this.set_lang_from_submission_data={lang:a,code:b},$.cookie("hacker_language_pref",a,{expires:365}),this.setLanguage(this.set_lang_from_submission_data.lang,this.set_lang_from_submission_data.code)},e.prototype.setUpLanguageSelect=function(){var a,b,c=this;return b=this.model.get("languages"),a=[],_.each(b.sort(),function(b){return a.push({id:b,text:window.lang_display_mapping[b]})}),$(this.el).find("#language-select").select2({data:a,width:"copy"})},e.prototype.getLocalStorageKey=function(a){var b,c,d;return a==null&&(a={}),b=this.profile.get("id")?this.profile.get("id"):"Guest",c=a.language||this.parent.header.getLanguage(),d=a.slug||this.model.get("slug"),"HR-local-"+b+"-"+c+"-"+d},e.prototype.revertCode=function(a){var b,c=this;return a.preventDefault(),b=$.cookie("hacker_language_pref"),this.set_lang_from_submission=!1,this.model.cached({fetch:!0,showLoader:!0,success:function(){return $.jStorage.deleteKey(c.getLocalStorageKey({language:b})),c.setLanguage(c.getLanguage()),$(document).scrollTop($(c.el).offset().top)}})},e.prototype.getLanguage=function(){return $(this.el).find("#language-select").val()},e.prototype.setLanguageFromSelect=function(a){var b;a.preventDefault(),b=$(this.el).find("#language-select").val();if(this.isAllowedLanguage(b))return $.cookie("hacker_language_pref",b,{expires:365}),this.setLanguage(b)},e.prototype.isAllowedLanguage=function(a){var b;return a?(b=this.model.get("languages"),_.indexOf(b,a)===-1?!1:!0):!1},e.prototype._stripTabs=function(a){var b,c;return b=Array(4).join(" "),c="\t",a===void 0?"":a.split(c).join(b)},e.prototype.setLanguage=function(a,b){return b==null&&(b=null),this.isAllowedLanguage(a)?($(this.el).find("#language-select").val(a),$(this.el).find(".select2-choice span").text(window.lang_display_mapping[a]),this.setCodeEditor(a,b)):!1},e.prototype.setEditorModeFromCookie=function(){var a;return a=$.cookie("hacker_editor_pref"),a!=="vim"&&a!=="emacs"&&a!=="default"&&(a="default"),this.setEditorMode(a)},e.prototype.setEditorModeClick=function(a){var b;return a.preventDefault(),b=this.$(a.target).data("editor"),this.setEditorMode(b),this.parent.body.editor.focus()},e.prototype.setEditorMode=function(a){return this.currentEditorMode=a,$(this.el).find(".editor-mode-button").removeClass("disabled"),$(this.el).find("."+a).addClass("disabled"),this.parent.body.editor&&(this.parent.body.editor.setOption("keyMap",a),this.parent.body.updateStatusBar(this.parent.body.editor)),$.cookie("hacker_editor_pref",a,{expires:365})},e.prototype.setCodeEditor=function(a,b){var c,d,e,f;return b==null&&(b=null),this.isAllowedLanguage(a)?(d=a+"_template",f=this.model.get("_data"),this.parent.body.editor&&(this.parent.body.editor.setOption("mode",this.MIME[a]),e=$.jStorage.get(this.getLocalStorageKey()),b!==null?this.parent.body.editor.setValue(b):!_.isEmpty(e)&&a!=="javascript"?this.parent.body.editor.setValue(e):this.model.get("saved_code")&&this.model.get("saved_language")&&this.model.get("saved_language")===a?this.setCodeEditor(this.model.get("saved_language"),this.model.get("saved_code")):f[d]?(f[d+"_head"]&&f[d+"_tail"]?c=this._stripTabs(f[d+"_head"])+"\n"+this.default_head_end[a]+"\n"+this._stripTabs(f[d])+"\n"+this.default_tail_start[a]+"\n"+this._stripTabs(f[d+"_tail"]):f[d+"_head"]?c=this._stripTabs(f[d+"_head"])+"\n"+this.default_head_end[a]+"\n"+this._stripTabs(f[d]):f[d+"_tail"]?c=this._stripTabs(f[d])+"\n"+this.default_tail_start[a]+"\n"+this._stripTabs(f[d+"_tail"]):c=this._stripTabs(f[d]),this.parent.body.editor.setValue(c)):lang_default_text[a]?this.parent.body.editor.setValue(lang_default_text[a]):this.parent.body.editor.setValue("")),this.foldEditorCode(),this):!1},e.prototype.foldEditorCode=function(){var a,b,c,d,e;if(this.parent.body.foldFunc&&this.parent.body.editor){a=this.parent.body.editor.getValue(),a.indexOf("Head ends")!==-1&&this.parent.body.foldFunc(this.parent.body.editor,0);if(a.indexOf("Tail starts")!==-1){c=a.indexOf("Tail starts"),e=a.substr(0,c),b=0;while(e.indexOf("\n")!==-1)b++,e=e.substr(e.indexOf("\n")+1);return d=b,this.parent.body.foldFunc(this.parent.body.editor,d)}}},e.prototype.popFullscreen=function(a){return a.preventDefault(),this.parent.body.updateLocalStorage(),this.fullscreen||(this.fullscreen=new c.FullScreenView({model:this.model,parent:this})),this.fullscreen.render(),this.isFullscreened=!0,this.$(".fullscreen").addClass("force-hide"),this.$(".restorefullscreen").removeClass("force-hide")},e.prototype.restorefullscreen=function(a){return a.preventDefault(),this.parent.body.updateLocalStorage(),this.fullscreen.unRender(),this.isFullscreened=!1,this.$(".fullscreen").removeClass("force-hide"),this.$(".restorefullscreen").addClass("force-hide")},e.prototype.saveCode=function(a){return a.preventDefault(),$(a.currentTarget).html("saving..."),this.updateDatabaseVersion(a)},e.prototype.updateDatabaseVersion=function(a){var b,d,e,f,g;a==null&&(a=null),d=c.appView.contentView.body.request_view.codeeditor.header,b=c.appView.contentView.body.request_view.codeeditor.body.editor;if(d===void 0||b===void 0)return;return e=d.getLanguage(),g=b.getValue(),f=function(b){if(a)return $(a.currentTarget).html("saved")},this.model.save_code(e,g,f)},e.prototype.toggleTheme=function(a){var b,d,e;d=$.cookie("hacker_editor_theme"),d&&d==="light"?(b="dark",e="ambiance"):(b="light",e="default");try{return $.cookie("hacker_editor_theme",b),c.appView.contentView.body.request_view.codeeditor.body.editor.setOption("theme",e)}catch(f){}},e}(window.HR.GenericView),c=window.HR||{},c.CodeEditorHeaderView=a})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="codeeditor-body",e.prototype.className="codeeditor-body-view",e.prototype.initialize=function(a){return this.parent=a.parent,this.profile=c.profile(),this.model.bind("reset",this.render,this),this.model.bind("change",this.render,this),window.error_marker_widgets=[],this.throttledSaveCode=_.throttle(this.updateLocalStorage,1e3)},e.prototype.setCompileTest=function(a){return this.compile_test=a,this.listenTo(this.compile_test,"change:error_markers",this.addMarkersOnSource)},e.prototype.addMarkersOnSource=function(){var a,b,d,e,f,g,h;a=c.appView.contentView.body.request_view.codeeditor.body.editor,b=this.compile_test.get("error_markers"),h=[];for(e in b)d=b[e].message,f=b[e].line_number,g=$("<div class='error-marker'><span class='error-marker-icon'>X</span>"+d+"</div>"),h.push(window.error_marker_widgets.push(a.addLineWidget(f-1,g[0],{above:!0})));return h},e.prototype.deleteMarkersOnSource=function(){var a,b;if(window.error_marker_widgets.length===0)return;a=c.appView.contentView.body.request_view.codeeditor.body.editor;for(b in window.error_marker_widgets)a.removeLineWidget(window.error_marker_widgets[b]);return window.error_marker_widgets=[]},e.prototype.updateLocalStorage=function(){var a,b,d,e,f;try{c.appView.contentView.body.request_view.codeeditor.header}catch(g){b=g;return}d=c.appView.contentView.body.request_view.codeeditor.header,a=c.appView.contentView.body.request_view.codeeditor.body.editor;if(d===void 0||a===void 0)return;e=d.getLocalStorageKey(),f=a.getValue(),f===""?$.jStorage.deleteKey(e):$.jStorage.set(e,f);if(d.$(".save-code").html()==="saved")return d.$(".save-code").html("save code")},e.prototype.updateStatusBar=function(a,b){var c,d;return c=$(this.el).find("#codeeditor-statusbar"),d=function(){switch(a.options.keyMap){case"vim":return"-- VIM --";case"vim-insert":return"-- INSERT --";case"emacs":return"EMACS";case"emacs-Ctrl-X":return"C-x-";default:return""}}(),$("#statusbar-mode").text(d)},e.prototype.updatePosition=function(a,b){var c;return c=a.doc.getCursor(),$("#statusbar-line").text("Line: "+(c.line+1)),$("#statusbar-col").text("Col: "+(c.ch+1))},e.prototype.updateCharCount=function(a,b){var c;return c=a.doc.getValue().length,$("#statusbar-count").text("Count: "+c)},e.prototype.render=function(){var a,b,d,e,f;return $(this.el).html(c.appController.template(this.template,this)()),a=this.$("#codeeditor").get(0),this.$("#codeeditor").siblings(".CodeMirror").length===0&&a!==void 0&&(this.foldFunc=CodeMirror.newFoldFunction(CodeMirror.autoFold),e=this,b={lineNumbers:!0,lineWrapping:!0,matchBrackets:!0,autoCloseBrackets:!0,cursorScrollMargin:2,extraKeys:{"Ctrl-Q":function(a){return e.foldFunc(a,a.getCursor().line)},Tab:function(a){return CodeMirror.commands.blockIndent(a,"add")},"Shift-Tab":function(a){return CodeMirror.commands.blockIndent(a,"subtract")},"Ctrl-/":function(a){return CodeMirror.commands.toggleComment(a)}},mode:"text/x-csrc",indentUnit:4,tabSize:4},this.editor=CodeMirror.fromTextArea(a,b),d=$.cookie("hacker_editor_theme"),d&&d==="light"?f="default":f="ambiance",this.editor.setOption("theme",f),this.editor.on("gutterClick",this.foldFunc),this.editor.on("change",this.throttledSaveCode),this.editor.on("update",this.updateStatusBar),this.editor.on("cursorActivity",this.updatePosition),this.editor.on("change",this.updateCharCount),this.editor.on("change",this.deleteMarkersOnSource)),this.parent.header.setCodeEditor(this.parent.header.getLanguage()),this},e}(window.HR.GenericView),c=(e=window.HR)!=null?e:{},c.CodeEditorBodyView=a})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="codeeditor-footer",e.prototype.className="codeeditor-footer-view",e.prototype.initialize=function(a){return a==null&&(a={}),this.profile=c.profile(),this.parent=a.parent,this.profile.bind("change",this.updateSubmitButton,this),this.profile.bind("reset",this.updateSubmitButton,this)},e.prototype.events={"click .access-buttons button.compile":"compileAndTest","click .access-buttons button.submit":"submitPopup","change #customtestcase":"customTestcase","click .upload_file":"uploadFileDialog"},e.prototype.render=function(){return $(this.el).html(c.appController.template(this.template,this)({model:this.model.toJSON(),profile:this.profile})),this.updateSubmitButton(),this},e.prototype.uploadFileDialog=function(a){var b,d,e,f;return a.preventDefault(),f=this,e=[{name:"source_file",title:"Source File",type:"file"},{name:"challenge_id",value:f.model.get("id"),type:"hidden"},{name:"contest_id",value:f.model.get("contest_id"),type:"hidden"},{name:"language",value:f.parent.header.getLanguage(),type:"hidden"},{name:"is_file_upload",value:"1",type:"hidden"}],b=[{name:"Upload",callback:function(a){var b,c,d;return c=this,b=a.$form(),d=new FormData(b[0]),c.unSetFailedMsg(),$.ajax({url:"/rest/upload_respawn",type:"POST",data:d,cache:!1,contentType:!1,processData:!1,success:function(b){return c.setInactive(),b.ok?f.parent.header.setLanguage(b.data.language,b.data.source)?a.destroy():c.failed("Language not supported for this challenge"):c.failed(b.message)}})}}],d=new c.util.ShowFormDialog({title:"Upload Dialog",width:650,enctype:"multipart/form-data",fields:e,buttons:b}),d.render()},e.prototype.updateSubmitButton=function(){var a;return this.profile.isLoggedIn()?(this.model.get("compile_and_test")?a="Submit Code":a="Submit",$(this.el).find("button.submit").html(a)):$(this.el).find("button.submit").html("Login to Submit")},e.prototype.submitPopup=function(a){var b,d,e,f;a.preventDefault(),e=this;if($(a.currentTarget).attr("btn-disabled")==="disabled")return;$(a.currentTarget).attr("btn-disabled","disabled"),$(a.currentTarget).addClass("disabled");if($.inArray(this.model.get("id"),c.CHALLENGES_DISABLED)>=0||c.CONTEST_DISABLED){d=new c.util.ShowSubmitDisabledDialog,d.render();return}if(!this.profile.isLoggedIn()){$(a.currentTarget).html("Logging in"),f=function(){return e.profile.isLoggedIn()?($(a.currentTarget).removeAttr("btn-disabled"),$(a.currentTarget).removeClass("disabled"),$(a.currentTarget).click()):setTimeout(f,100)},b=new c.util.ShowLoginDialog({body_text:"Please login in order to submit",onDestroy:function(){return e.updateSubmitButton(),$(a.currentTarget).removeAttr("btn-disabled"),$(a.currentTarget).removeClass("disabled")},success_callback:function(){return setTimeout(f,100)},show_sign_up_link:!0}),b.render();return}return $(a.currentTarget).html("Submitting"),b=new c.util.ShowConfirmationDialog({title:"Confirm Submission",body:"Are you sure you want to submit this code?",onDestroy:function(){return e.updateSubmitButton(),$(a.currentTarget).removeAttr("btn-disabled"),$(a.currentTarget).removeClass("disabled")},buttons:[{name:"No, do not submit","class":"hr_secondary-btn hr-dialog-button",callback:function(a){return e.model&&e.model.get&&e.parent&&e.parent.header&&c.profile()&&mixpanel.track("Submit Code",{challenge:e.model.get("slug"),contest:e.model.get("contest_slug"),kind:e.model.get("kind"),language:e.parent.header.getLanguage(),fullscreen:e.parent.header.isFullscreened,editor:e.parent.header.currentEditorMode,username:c
.profile().username}),this.setInactive(),a.destroy()}},{name:"Yes, submit my code","class":"hr_primary-btn hr-dialog-button",callback:function(a){var b,d;e.model&&e.model.get&&e.parent&&e.parent.header&&c.profile()&&mixpanel.track("Submit Code",{challenge:e.model.get("slug"),contest:e.model.get("contest_slug"),kind:e.model.get("kind"),language:e.parent.header.getLanguage(),fullscreen:e.parent.header.isFullscreened,editor:e.parent.header.currentEditorMode,username:c.profile().username}),b=this;if(e.submitLock&&e.submitLock===!0)return;return e.parent.header.getLanguage()!==""?(this.setInactive(),e.submitLock=!0,$.jStorage.deleteKey(e.parent.header.getLocalStorageKey()),d=c.model("submission",{code:e.parent.body.editor.getValue(),language:e.parent.header.getLanguage(),contest_slug:e.model.contest_slug||e.model.get("contest_slug")}),d.setChallenge(e.model),d.save(null,{success:function(b,d){return _gaq.push(["_trackPageview","/submitcode/"+(e.model.get("contest_slug")||e.model.contest_slug)+"/"+e.model.slug+"/"]),c.QUEUED_SUBMISSIONS||(c.QUEUED_SUBMISSIONS={}),c.QUEUED_SUBMISSIONS[b.get("id")]=!0,e.submitLock=!1,d.status?(a.destroy(),e.parent.parent.unrenderFullScreenView(),b.set("kind",e.model.get("kind"),{silent:!0}),c.router.navigate(b.pageURL(),!0),$("html body").animate({scrollTop:0},300)):a.showError(d.message)}})):(this.setInactive(),a.showError("Select a language!"))}}]}),b.render()},e.prototype.customTestcase=function(a){var b;return b=$(a.currentTarget).attr("checked"),b?this.$("#custominput").slideDown():this.$("#custominput").slideUp()},e.prototype.compileAndTest=function(a){var b,d,e;a.preventDefault(),e=this.parent.parent.parent.response_view,b=this.parent.body,b.deleteMarkersOnSource();if($(a.currentTarget).attr("btn-disabled")==="disabled")return;if(_.isEmpty(this.parent.header.getLanguage()))return;return $(a.currentTarget).attr("btn-disabled","disabled"),$(a.currentTarget).addClass("disabled"),d=new c.CompileTestModel({code:this.parent.body.editor.getValue(),language:this.parent.header.getLanguage()}),d.setChallenge(this.model),this.$("#customtestcase").attr("checked")?(d.set("customtestcase",!0),d.set("custominput",this.$("#custominput").val())):d.set("customtestcase",!1),d.save(),d.bind("change:status",this.enableCompileTest,this),e.setCompileTest(d),b.setCompileTest(d)},e.prototype.enableCompileTest=function(a,b){var c;if(b>0){this.$("button.compile").removeAttr("btn-disabled"),this.$("button.compile").removeClass("disabled");if(c=a.get("error"))return this.parent.parent.parent.response_view.showError()}},e}(window.HR.GenericView),c=window.HR||{},c.CodeEditorFooterView=a})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="codeeditor",e.prototype.className="codeeditor-view",e.prototype.initialize=function(a){return this.model=a.model,this.parent=a.parent},e.prototype.render=function(){return $(this.el).html('        <div class="codeeditor-header-wrapper"></div>        <div class="codeeditor-body-wrapper"></div>        <div class="codeeditor-footer-wrapper"></div>'),this.header||(this.header=new c.CodeEditorHeaderView({model:this.model,parent:this})),this.body||(this.body=new c.CodeEditorBodyView({model:this.model,parent:this})),this.footer||(this.footer=new c.CodeEditorFooterView({model:this.model,parent:this})),this.assign({".codeeditor-header-wrapper":this.header,".codeeditor-body-wrapper":this.body,".codeeditor-footer-wrapper":this.footer}),this},e}(window.HR.GenericView),c=(e=window.HR)!=null?e:{},c.CodeEditorView=a})}.call(this)