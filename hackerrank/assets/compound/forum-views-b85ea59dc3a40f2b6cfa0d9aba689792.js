(function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="forum/answer-list",e.prototype.className="answer-list-view",e.prototype.initialize=function(a){return this.challenge_slug=this.collection.getChallengeSlug(),this.question_id=this.collection.getQuestionId(),this.listenTo(this.collection,"reset",this.render),this.listenTo(this.collection,"change",this.render),this.listenTo(this.collection,"add",this.render)},e.prototype.render=function(){return $(this.el).html(c.appController.template(this.template,this)({challenge_slug:this.challenge_slug,question_id:this.question_id,collection:this.collection.toJSON()})),this.delegateEvents(),this},e.prototype.events={"click a.upvote-answer":"upvoteAnswer","click a.downvote-answer":"downvoteAnswer"},e.prototype.subscription=function(a){return a.preventDefault()},e.prototype.addAnswer=function(a){return this.collection.push(a)},e.prototype.upvoteAnswer=function(a){var b,c,d,e;a.preventDefault(),e=$(a.currentTarget);if(e.hasClass("disabled"))return;return c=this,d=e.attr("href"),b=e.closest(".answer"),$.ajax({type:"PUT",url:d,success:function(){return c.highlightUpvote(b),c.collection.fetch()}})},e.prototype.downvoteAnswer=function(a){var b,c,d,e;a.preventDefault(),e=$(a.currentTarget);if(e.hasClass("disabled"))return;return c=this,d=e.attr("href"),b=e.closest(".answer"),$.ajax({type:"PUT",url:d,success:function(){return c.highlightDownvote(b),c.collection.fetch()}})},e.prototype.highlightUpvote=function(a){return this.resetVotes(a),$(a).find(".upvote-answer").addClass("hide")},e.prototype.highlightDownvote=function(a){return this.resetVotes(a),$(a).find(".downvote-answer").addClass("hide")},e.prototype.resetVotes=function(a){return $(a).find(".upvote-answer,.downvote-answer").removeClass("hide")},e}(window.HR.GenericView),c=(e=window.HR)!=null?e:{},c.AnswerListView=a})}).call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="forum/challenge-ask-question",e.prototype.className="challenge-ask-question-view",e.prototype.initialize=function(a){var b,d;return d=this,this.question=new c.QuestionModel,this.question.set({title:"",description:"",tags:[]}),a.question_id&&(b=a.challenge.get("slug"),this.question.set({id:a.question_id,challenge_slug:b}),this.question.fetch(),this.listenTo(this.question,"reset",this.render)),this.challenge=a.challenge,this.listenTo(this.challenge,"reset",this.render),this.listenTo(this.challenge,"change",this.render),this.converter=new Showdown.converter,this.challenge.fetch(),this.hacker=c.profile(),this.render},e.prototype.events={"click a.ask-question":"askQuestion"},e.prototype.askQuestion=function(a){var b,d,e,f,g,h;a.preventDefault(),b=$(a.currentTarget),e=b.html(),b.html("Posting..."),d=this.$("#question-error");if(!b.hasClass("disabled"))return b.addClass("disabled"),f=_.filter(this.$("#question-tags").val().split(", "),function(a){return a.trim().length>0}),g=this,this.question.set({challenge_slug:this.challenge.get("slug"),title:this.$("#question-title").val(),description:this.editor.getValue(),tags:f}),h=function(a,f){var h,i,j,k=this;return f.status===200||f.model?(h=document.location.protocol+"//"+document.location.host,j=""+c.appController.get_current_contest_namespace()+"/challenges/"+g.challenge.get("slug")+"/forum/questions/"+a.id,i=h+j,g.hacker.get("facebook_allow_opengraph")===1&&window.HR.appController.facebook_graph_activity("ask","question",i),c.router.navigate(j,!0)):(d.fadeIn(),setTimeout(function(){return d.fadeOut()},2e3)),b.removeClass("disabled"),b.html(e)},this.question.save(null,{error:h,success:h})},e.prototype.updatePreview=function(){var a,b;return b=this.editor.getValue(),a=this.converter.makeHtml(b),b===""?this.$(".preview-wrap").hide():this.$(".preview-wrap").show(),this.$("#question-preview").html(a)},e.prototype.render=function(){var a,b,d;return $(this.el).html(c.appController.viewLoader(64)),this.challenge.id?($(this.el).html(c.appController.template(this.template,this)({challenge:this.challenge,question:this.question})),d=this,b={lineNumbers:!1,lineWrapping:!0,matchBrackets:!0,mode:"text/x-markdown",indentUnit:4,onChange:function(a){return d.updatePreview(),this}},a=this.$("#question-description").get(0),a&&(this.editor=CodeMirror.fromTextArea(a,b),this.question.get("description")&&this.editor.setValue(this.question.get("description"))),this):this},e}(window.HR.GenericView),c=(e=window.HR)!=null?e:{},c.ChallengeAskQuestionView=a})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="forum/challenge-questions-sidebar-header",e.prototype.className="challenge-questions-sidebar-header-view",e.prototype.initialize=function(a){return this.challenge=a.challenge,this.listenTo(c.profile(),"reset",this.render),this.render()},e.prototype.render=function(){return $(this.el).html(c.appController.template(this.template,this)({challenge:this.challenge,profile:c.profile()})),this},e}(window.HR.GenericView),c=(e=window.HR)!=null?e:{},c.ChallengeQuestionsSidebarHeaderView=a})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="forum/challenge-questions-sidebar",e.prototype.className="challenge-questions-sidebar-view",e.prototype.initialize=function(a){return this.challenge=a.challenge,this.render()},e.prototype.render=function(){var a;return $(this.el).html(c.appController.template(this.template,this)()),a=this,this.$(".header").length>0&&(this.header=new c.ChallengeQuestionsSidebarHeaderView({el:this.$(".header"),challenge:this.challenge})),this},e}(window.HR.GenericView),c=(e=window.HR)!=null?e:{},c.ChallengeQuestionsSidebarView=a})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="forum/challenge-questions",e.prototype.className="challenge-questions-view",e.prototype.initialize=function(a){return this.challenge=a.challenge,this.listenTo(this.challenge,"reset",this.render)},e.prototype.render=function(){var a;return this.challenge.sync_status?($(this.el).html(c.appController.template(this.template,this)({challenge:this.challenge})),this.$("div#question-list-view").length>0&&(this.questions=new c.QuestionListView({el:this.$("div#question-list-view"),challenge:this.challenge,collection:this.collection}),this.questions.render()),this.$("div.sidebar").length>0&&(this.sidebar=new c.ChallengeQuestionsSidebarView({el:this.$("div.sidebar"),challenge:this.challenge}),this.sidebar.render()),a=c.util.renderBreadCrumbs(this.$("div.breadcrumbs"),this.challenge.breadCrumbs()),this.add_subview(a),this):this},e}(window.HR.GenericView),c=(e=window.HR)!=null?e:{},c.ChallengeQuestionsView=a})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return a=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,a),e.prototype.template="forum/follow-question",e.prototype.className="follow-question-view",e.prototype.initialize=function(a){return this.model=a.model,this.challenge=a.challenge,this.listenTo(this.model,"change",this.render),this.listenTo(this.model,"reset",this.render),this.render()},e.prototype.events={"click a#follow-button":"toggleSubscription"},e.prototype.toggleSubscription=function(a){var b,d,e;return a.preventDefault(),d=this,b=$(a.currentTarget),e="/rest/contests/"+c.appController.get_current_contest_slug()+"/challenges/"+this.challenge.get("slug")+"/questions/"+this.model.get("id")+"/",e+=this.model.get("subscribed")?"unsubscribe":"subscribe",$.ajax({type:"PUT",url:e,success:function(){return d.model.fetch()}})},e.prototype.render=function(){var a;return a="Checkout question, '"+this.model.get("title")+"' on '"+this.challenge.get("name")+"'",$(this.el).html(c.appController.template(this.template,this)({model:this.model.toJSON(),shareText:a,profile:c.profile()})),this},e}(window.HR.GenericView),c=(e=window.HR)!=null?e:{},c.FollowQuestionView=a})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return c=function(c){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,c),e.prototype.template="forum/question-content",e.prototype.className="question-content-view",e.prototype.initialize=function(b){return this.challenge=b.challenge,this.answer_collection=b.answer_collection,this.hacker=a.profile(),this.listenTo(this.hacker,"reset",this.render),this.converter=new Showdown.converter,this.render()},e.prototype.render=function(){var b,c,d;return $(this.el).html(a.appController.template(this.template,this)({challenge:this.challenge,question:this.model.toJSON(),_question:this.model,profile:this.hacker,_profile:this.hacker.toJSON()})),d=this,c={lineNumbers:!1,lineWrapping:!0,matchBrackets:!0,mode:"text/x-markdown",indentUnit:4},b=this.$("#answer-description").get(0),b&&(this.editor=CodeMirror.fromTextArea(b,c),this.editor.on("change",function(){return d.updatePreview(),this})),this.$("div#answer-list-view").length>0&&this.loadAnswers(),$(".timeago").timeago(),this.delegateEvents(),this},e.prototype.loadAnswers=function(){return this.answers=new a.AnswerListView({el:this.$("div#answer-list-view"),collection:this.answer_collection}),this.answers.render()},e.prototype.events={"click a.answer-question":"answerQuestion","click a.upvote-question":"upvoteQuestion","click a.downvote-question":"downvoteQuestion","click a.delete-question":"deleteQuestion"},e.prototype.answerQuestion=function(b){var c,d,e,f,g;b.preventDefault(),d=$(b.currentTarget),e=this.editor.getValue();if(!(d.hasClass("disabled")&&e.length>0))return d.addClass("disabled"),f=d.html(),d.html("Posting..."),g=this,c=new a.AnswerModel,c.set({challenge_slug:this.challenge.get("slug"),question_id:this.model.get("id"),answer:{description:e}}),c.save({},{success:function(a,b){return g.answers.addAnswer(c),g.editor.setValue(""),d.removeClass("disabled"),d.html(f),g.hacker.get("facebook_allow_opengraph")===1&&g.graphAnsweredQuestion(g.model),$("html, body").animate({scrollTop:$(document).height()},1e3)},error:function(a,b){var c=this;return this.$("#answer-error").fadeIn(),d.removeClass("disabled"),setTimeout(function(){return $("#answer-error").fadeOut()},3e3)}})},e.prototype.graphAnsweredQuestion=function(a){var b,c;return b=document.location.protocol+"//"+document.location.host,c=a.pageURL(),window.HR.appController.facebook_graph_activity("answer","question",b+c)},e.prototype.updatePreview=function(){var a,b;return b=this.editor.getValue(),a=this.converter.makeHtml(b),b===""?this.$(".preview-wrap").hide():this.$(".preview-wrap").show(),this.$("#answer-preview").html(a)},e.prototype.upvoteQuestion=function(a){var b,c,d;a.preventDefault(),d=$(a.currentTarget);if(d.hasClass("disabled"))return;return b=this,c=d.attr("href"),$.ajax({type:"PUT",url:c,success:function(){return b.highlightUpvote()}})},e.prototype.downvoteQuestion=function(a){var b,c,d;a.preventDefault(),d=$(a.currentTarget);if(d.hasClass("disabled"))return;return b=this,c=d.attr("href"),$.ajax({type:"PUT",url:c,success:function(){return b.highlightDownvote()}})},e.prototype.deleteQuestion=function(b){return this.model.destroy(),a.router.navigate("/challenges/"+this.challenge.get("slug")+"/forum/questions",!0)},e.prototype.highlightUpvote=function(){return this.resetVotes(),this.$(".upvote-question").addClass("highlight").addClass("disabled")},e.prototype.highlightDownvote=function(){return this.resetVotes(),this.$(".downvote-question").addClass("highlight").addClass("disabled")},e.prototype.resetVotes=function(){return this.$(".upvote-question,.downvote-question").removeClass("highlight").removeClass("disabled")},e}(window.HR.GenericView),a=(e=window.HR)!=null?e:{},a.QuestionContentView=c})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return c=function(c){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,c),e.prototype.template="forum/question-list",e.prototype.className="question-list-view",e.prototype.initialize=function(a){return this.challenge=a.challenge,this.listenTo(this.collection,"reset",this.render),this.listenTo(this.collection,"change",this.render),this.listenTo(this.collection,"add",this.render),this.listenTo(this.collection,"set",this.render),this.listenTo(this.collection,"sync",this.render),this.collection.fetch()},e.prototype.render=function(){return $(this.el).html(a.appController.template(this.template,this)({challenge:this.challenge,collection:this.collection.toJSON(),_collection:this.collection})),this.delegateEvents(),a.util.pagination(this.$(".pagination-wrapper"),this.collection.getTotal(),""+a.appController.get_current_contest_namespace()+this.collection.pageURL()+"/page/",this.collection.getCurrentPage(),null,this.collection.limit),$(".timeago").timeago(),this},e.prototype.events={"click a.ask-question":"askQuestion"},e.prototype.askQuestion=function(b){var c,d,e;return b.preventDefault(),e=this,d=new a.QuestionModel,c={title:this.$("#question-title").val(),description:this.$("#question-description").val()},d.set({challenge_slug:this.challenge.get("slug"),question:c}),d.save(null,{success:function(a,b){return e.collection.add(d)}})},e}(window.HR.GenericView),a=(e=window.HR)!=null?e:{},a.QuestionListView=c})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return c=function(c){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,c),e.prototype.template="forum/question-sidebar",e.prototype.className="question-sidebar-view",e.prototype.initialize=function(a){return this.activites_collection=a.activities_collection,this.challenge=a.challenge,this.render()},e.prototype.render=function(){var b;return $(this.el).html(a.appController.template(this.template,this)({challenge:this.challenge})),b=this,this.$(".follow-question").length>0&&(this.header=new a.FollowQuestionView({el:this.$(".follow-question"),model:this.model,challenge:this.challenge})),this},e}(window.HR.GenericView),a=(e=window.HR)!=null?e:{},a.QuestionSidebarView=c})}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b};jQuery(function(){var a,c,d,e;return c=function(c){function e(){return d=e.__super__.constructor.apply(this,arguments),d}return b(e,c),e.prototype.template="forum/question",e.prototype.className="questions",e.prototype.initialize=function(b){var c;return c=this,this.answer_collection=new a.AnswerCollection,this.answer_collection.setChallengeSlug(this.model.get("challenge_slug")),this.answer_collection.setQuestionId(this.model.id),this.listenTo(this.answer_collection,"reset",this.render),this.listenTo(this.answer_collection,"change",this.render),this.answer_collection.cached(),this.challenge=b.challenge,this.listenTo(this.challenge,"reset",this.render),this.listenTo(this.challenge,"change",this.render),this.model.setChallenge(this.challenge),this.challenge.cached(),this.listenTo(this.model,"reset",this.render),this.listenTo(this.model,"change",this.render),this.model.cached(),this.profile=a.profile()},e.prototype.render=function(){var b;return $(this.el).html(a.appController.viewLoader(64)),!this.model.sync_status||!this.challenge.sync_status?this:($(this.el).html(a.appController.template(this.template,this)({challenge:this.challenge})),this.$("div#question-content-view").length>0&&(this.questions=new a.QuestionContentView({el:this.$("div#question-content-view"),challenge:this.challenge,model:this.model,answer_collection:this.answer_collection})),this.$("div.sidebar").length>0&&(this.sidebar=new a.QuestionSidebarView({el:this.$("div.sidebar"),challenge:this.challenge,model:this.model})),b=a.util.renderBreadCrumbs(this.$("div.breadcrumbs"),this.model.breadCrumbs()),this.add_subview(b),this)},e}(window.HR.GenericView),a=(e=window.HR)!=null?e:{},a.QuestionView=c})}.call(this);var Showdown={extensions:{}},forEach=Showdown.forEach=function(a,b){if(typeof a.forEach=="function")a.forEach(b);else{var c,d=a.length;for(c=0;c<d;c++)b(a[c],c,a)}},stdExtName=function(a){return a.replace(/[_-]||\s/g,"").toLowerCase()};Showdown.converter=function(a){var b,c,d,e=0,f=[],g=[];if(typeof module!="undefind"&&typeof exports!="undefined"&&typeof require!="undefind"){var h=require("fs");if(h){var i=h.readdirSync((__dirname||".")+"/extensions").filter(function(a){return~a.indexOf(".js")}).map(function(a){return a.replace(/\.js$/,"")});Showdown.forEach(i,function(a){var b=stdExtName(a);Showdown.extensions[b]=require("./extensions/"+a)})}}this.makeHtml=function(a){return b={},c={},d=[],a=a.replace(/~/g,"~T"),a=a.replace(/\$/g,"~D"),a=a.replace(/\r\n/g,"\n"),a=a.replace(/\r/g,"\n"),a="\n\n"+a+"\n\n",a=M(a),a=a.replace(/^[ \t]+$/mg,""),Showdown.forEach(f,function(b){a=k(b,a)}),a=z(a),a=m(a),a=l(a),a=o(a),a=K(a),a=a.replace(/~D/g,"$$"),a=a.replace(/~T/g,"~"),Showdown.forEach(g,function(b){a=k(b,a)}),a};if(a&&a.extensions){var j=this;Showdown.forEach(a.extensions,function(a){typeof a=="string"&&(a=Showdown.extensions[stdExtName(a)]);if(typeof a=="function")Showdown.forEach(a(j),function(a){a.type?a.type==="language"||a.type==="lang"?f.push(a):(a.type==="output"||a.type==="html")&&g.push(a):g.push(a)});else throw"Extension '"+a+"' could not be loaded.  It was either not found or is not a valid extension."})}var k=function(a,b){if(a.regex){var c=new RegExp(a.regex,"g");return b.replace(c,a.replace)}if(a.filter)return a.filter(b)},l=function(a){return a+="~0",a=a.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|(?=~0))/gm,function(a,d,e,f,g){return d=d.toLowerCase(),b[d]=G(e),f?f+g:(g&&(c[d]=g.replace(/"/g,"&quot;")),"")}),a=a.replace(/~0/,""),a},m=function(a){a=a.replace(/\n/g,"\n\n");var b="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del|style|section|header|footer|nav|article|aside",c="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|style|section|header|footer|nav|article|aside";return a=a.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,n),a=a.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|style|section|header|footer|nav|article|aside)\b[^\r]*?<\/\2>[ \t]*(?=\n+)\n)/gm,n),a=a.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,n),a=a.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g,n),a=a.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,n),a=a.replace(/\n\n/g,"\n"),a},n=function(a,b){var c=b;return c=c.replace(/\n\n/g,"\n"),c=c.replace(/^\n/,""),c=c.replace(/\n+$/g,""),c="\n\n~K"+(d.push(c)-1)+"K\n\n",c},o=function(a){a=v(a);var b=A("<hr />");return a=a.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,b),a=a.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm,b),a=a.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm,b),a=x(a),a=y(a),a=E(a),a=m(a),a=F(a),a},p=function(a){return a=B(a),a=q(a),a=H(a),a=t(a),a=r(a),a=I(a),a=G(a),a=D(a),a=a.replace(/  +\n/g," <br />\n"),a},q=function(a){var b=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;return a=a.replace(b,function(a){var b=a.replace(/(.)<\/?code>(?=.)/g,"$1`");return b=N(b,"\\`*_"),b}),a},r=function(a){return a=a.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,s),a=a.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,s),a=a.replace(/(\[([^\[\]]+)\])()()()()()/g,s),a},s=function(a,d,e,f,g,h,i,j){j==undefined&&(j="");var k=d,l=e,m=f.toLowerCase(),n=g,o=j;if(n==""){m==""&&(m=l.toLowerCase().replace(/ ?\n/g," ")),n="#"+m;if(b[m]!=undefined)n=b[m],c[m]!=undefined&&(o=c[m]);else if(k.search(/\(\s*\)$/m)>-1)n="";else return k}n=N(n,"*_");var p='<a href="'+n+'"';return o!=""&&(o=o.replace(/"/g,"&quot;"),o=N(o,"*_"),p+=' title="'+o+'"'),p+=">"+l+"</a>",p},t=function(a){return a=a.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,u),a=a.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,u),a},u=function(a,d,e,f,g,h,i,j){var k=d,l=e,m=f.toLowerCase(),n=g,o=j;o||(o="");if(n==""){m==""&&(m=l.toLowerCase().replace(/ ?\n/g," ")),n="#"+m;if(b[m]!=undefined)n=b[m],c[m]!=undefined&&(o=c[m]);else return k}l=l.replace(/"/g,"&quot;"),n=N(n,"*_");var p='<img src="'+n+'" alt="'+l+'"';return o=o.replace(/"/g,"&quot;"),o=N(o,"*_"),p+=' title="'+o+'"',p+=" />",p},v=function(a){function b(a){return a.replace(/[^\w]/g,"").toLowerCase()}return a=a.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,function(a,c){return A('<h1 id="'+b(c)+'">'+p(c)+"</h1>")}),a=a.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,function(a,c){return A('<h2 id="'+b(c)+'">'+p(c)+"</h2>")}),a=a.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,function(a,c,d){var e=c.length;return A("<h"+e+' id="'+b(d)+'">'+p(d)+"</h"+e+">")}),a},w,x=function(a){a+="~0";var b=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;return e?a=a.replace(b,function(a,b,c){var d=b,e=c.search(/[*+-]/g)>-1?"ul":"ol";d=d.replace(/\n{2,}/g,"\n\n\n");var f=w(d);return f=f.replace(/\s+$/,""),f="<"+e+">"+f+"</"+e+">\n",f}):(b=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g,a=a.replace(b,function(a,b,c,d){var e=b,f=c,g=d.search(/[*+-]/g)>-1?"ul":"ol",f=f.replace(/\n{2,}/g,"\n\n\n"),h=w(f);return h=e+"<"+g+">\n"+h+"</"+g+">\n",h})),a=a.replace(/~0/,""),a};w=function(a){return e++,a=a.replace(/\n{2,}$/,"\n"),a+="~0",a=a.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,function(a,b,c,d,e){var f=e,g=b,h=c;return g||f.search(/\n{2,}/)>-1?f=o(L(f)):(f=x(L(f)),f=f.replace(/\n$/,""),f=p(f)),"<li>"+f+"</li>\n"}),a=a.replace(/~0/g,""),e--,a};var y=function(a){return a+="~0",a=a.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,function(a,b,c){var d=b,e=c;return d=C(L(d)),d=M(d),d=d.replace(/^\n+/g,""),d=d.replace(/\n+$/g,""),d="<pre><code>"+d+"\n</code></pre>",A(d)+e}),a=a.replace(/~0/,""),a},z=function(a){return a+="~0",a=a.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g,function(a,b,c){var d=b,e=c;return e=C(e),e=M(e),e=e.replace(/^\n+/g,""),e=e.replace(/\n+$/g,""),e="<pre><code"+(d?' class="'+d+'"':"")+">"+e+"\n</code></pre>",A(e)}),a=a.replace(/~0/,""),a},A=function(a){return a=a.replace(/(^\n+|\n+$)/g,""),"\n\n~K"+(d.push(a)-1)+"K\n\n"},B=function(a){return a=a.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(a,b,c,d,e){var f=d;return f=f.replace(/^([ \t]*)/g,""),f=f.replace(/[ \t]*$/g,""),f=C(f),b+"<code>"+f+"</code>"}),a},C=function(a){return a=a.replace(/&/g,"&amp;"),a=a.replace(/</g,"&lt;"),a=a.replace(/>/g,"&gt;"),a=N(a,"*_{}[]\\",!1),a},D=function(a){return a=a.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,"<strong>$2</strong>"),a=a.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>"),a},E=function(a){return a=a.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(a,b){var c=b;return c=c.replace(/^[ \t]*>[ \t]?/gm,"~0"),c=c.replace(/~0/g,""),c=c.replace(/^[ \t]+$/gm,""),c=o(c),c=c.replace(/(^|\n)/g,"$1  "),c=c.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(a,b){var c=b;return c=c.replace(/^  /mg,"~0"),c=c.replace(/~0/g,""),c}),A("<blockquote>\n"+c+"\n</blockquote>")}),a},F=function(a){a=a.replace(/^\n+/g,""),a=a.replace(/\n+$/g,"");var b=a.split(/\n{2,}/g),c=[],e=b.length;for(var f=0;f<e;f++){var g=b[f];g.search(/~K(\d+)K/g)>=0?c.push(g):g.search(/\S/)>=0&&(g=p(g),g=g.replace(/^([ \t]*)/g,"<p>"),g+="</p>",c.push(g))}e=c.length;for(var f=0;f<e;f++)while(c[f].search(/~K(\d+)K/)>=0){var h=d[RegExp.$1];h=h.replace(/\$/g,"$$$$"),c[f]=c[f].replace(/~K\d+K/,h)}return c.join("\n\n")},G=function(a){return a=a.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;"),a=a.replace(/<(?![a-z\/?\$!])/gi,"&lt;"),a},H=function(a){return a=a.replace(/\\(\\)/g,O),a=a.replace(/\\([`*_{}\[\]()>#+-.!])/g,O),a},I=function(a){return a=a.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi,'<a href="$1">$1</a>'),a=a.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,function(a,b){return J(K(b))}),a},J=function(a){var b=[function(a){return"&#"+a.charCodeAt(0)+";"},function(a){return"&#x"+a.charCodeAt(0).toString(16)+";"},function(a){return a}];return a="mailto:"+a,a=a.replace(/./g,function(a){if(a=="@")a=b[Math.floor(Math.random()*2)](a);else if(a!=":"){var c=Math.random();a=c>.9?b[2](a):c>.45?b[1](a):b[0](a)}return a}),a='<a href="'+a+'">'+a+"</a>",a=a.replace(/">.+:/g,'">'),a},K=function(a){return a=a.replace(/~E(\d+)E/g,function(a,b){var c=parseInt(b);return String.fromCharCode(c)}),a},L=function(a){return a=a.replace(/^(\t|[ ]{1,4})/gm,"~0"),a=a.replace(/~0/g,""),a},M=function(a){return a=a.replace(/\t(?=\t)/g,"    "),a=a.replace(/\t/g,"~A~B"),a=a.replace(/~B(.+?)~A/g,function(a,b,c){var d=b,e=4-d.length%4;for(var f=0;f<e;f++)d+=" ";return d}),a=a.replace(/~A/g,"    "),a=a.replace(/~B/g,""),a},N=function(a,b,c){var d="(["+b.replace(/([\[\]\\])/g,"\\$1")+"])";c&&(d="\\\\"+d);var e=new RegExp(d,"g");return a=a.replace(e,O),a},O=function(a,b){var c=b.charCodeAt(0);return"~E"+c+"E"}},typeof module!="undefined"&&(module.exports=Showdown),typeof define=="function"&&define.amd&&define("showdown",function(){return Showdown})