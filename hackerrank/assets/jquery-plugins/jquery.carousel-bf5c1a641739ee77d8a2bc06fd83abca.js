/*global window, jQuery */
(function(a){var b={vertical:!1,rtl:!1,start:1,offset:1,size:null,scroll:1,visible:null,animation:"normal",easing:"swing",auto:0,wrap:null,initCallback:null,setupCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null,itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,animationStepCallback:null,buttonNextHTML:"<div></div>",buttonPrevHTML:"<div></div>",buttonNextEvent:"click",buttonPrevEvent:"click",buttonNextCallback:null,buttonPrevCallback:null,itemFallbackDimension:null},c=!1;a(window).bind("load.jcarousel",function(){c=!0}),a.jcarousel=function(d,e){this.options=a.extend({},b,e||{}),this.locked=!1,this.autoStopped=!1,this.container=null,this.clip=null,this.list=null,this.buttonNext=null,this.buttonPrev=null,this.buttonNextState=null,this.buttonPrevState=null;if(!e||e.rtl===undefined)this.options.rtl=(a(d).attr("dir")||a("html").attr("dir")||"").toLowerCase()=="rtl";this.wh=this.options.vertical?"height":"width",this.lt=this.options.vertical?"top":this.options.rtl?"right":"left";var f="",g=d.className.split(" ");for(var h=0;h<g.length;h++)if(g[h].indexOf("jcarousel-skin")!=-1){a(d).removeClass(g[h]),f=g[h];break}d.nodeName.toUpperCase()=="UL"||d.nodeName.toUpperCase()=="OL"?(this.list=a(d),this.clip=this.list.parents(".jcarousel-clip"),this.container=this.list.parents(".jcarousel-container")):(this.container=a(d),this.list=this.container.find("ul,ol").eq(0),this.clip=this.container.find(".jcarousel-clip")),this.clip.size()===0&&(this.clip=this.list.wrap("<div></div>").parent()),this.container.size()===0&&(this.container=this.clip.wrap("<div></div>").parent()),f!==""&&this.container.parent()[0].className.indexOf("jcarousel-skin")==-1&&this.container.wrap('<div class=" '+f+'"></div>'),this.buttonPrev=a(".jcarousel-prev",this.container),this.buttonPrev.size()===0&&this.options.buttonPrevHTML!==null&&(this.buttonPrev=a(this.options.buttonPrevHTML).appendTo(this.container)),this.buttonPrev.addClass(this.className("jcarousel-prev")),this.buttonNext=a(".jcarousel-next",this.container),this.buttonNext.size()===0&&this.options.buttonNextHTML!==null&&(this.buttonNext=a(this.options.buttonNextHTML).appendTo(this.container)),this.buttonNext.addClass(this.className("jcarousel-next")),this.clip.addClass(this.className("jcarousel-clip")).css({position:"relative"}),this.list.addClass(this.className("jcarousel-list")).css({overflow:"hidden",position:"relative",top:0,margin:0,padding:0}).css(this.options.rtl?"right":"left",0),this.container.addClass(this.className("jcarousel-container")).css({position:"relative"}),!this.options.vertical&&this.options.rtl&&this.container.addClass("jcarousel-direction-rtl").attr("dir","rtl");var i=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null,j=this.list.children("li"),k=this;if(j.size()>0){var l=0,m=this.options.offset;j.each(function(){k.format(this,m++),l+=k.dimension(this,i)}),this.list.css(this.wh,l+200+"px");if(!e||e.size===undefined)this.options.size=j.size()}this.container.css("display","block"),this.buttonNext.css("display","block"),this.buttonPrev.css("display","block"),this.funcNext=function(){k.next()},this.funcPrev=function(){k.prev()},this.funcResize=function(){k.resizeTimer&&clearTimeout(k.resizeTimer),k.resizeTimer=setTimeout(function(){k.reload()},100)},this.options.initCallback!==null&&this.options.initCallback(this,"init"),!c&&a.browser.safari?(this.buttons(!1,!1),a(window).bind("load.jcarousel",function(){k.setup()})):this.setup()};var d=a.jcarousel;d.fn=d.prototype={jcarousel:"0.2.8"},d.fn.extend=d.extend=a.extend,d.fn.extend({setup:function(){this.first=null,this.last=null,this.prevFirst=null,this.prevLast=null,this.animating=!1,this.timer=null,this.resizeTimer=null,this.tail=null,this.inTail=!1;if(this.locked)return;this.list.css(this.lt,this.pos(this.options.offset)+"px");var b=this.pos(this.options.start,!0);this.prevFirst=this.prevLast=null,this.animate(b,!1),a(window).unbind("resize.jcarousel",this.funcResize).bind("resize.jcarousel",this.funcResize),this.options.setupCallback!==null&&this.options.setupCallback(this)},reset:function(){this.list.empty(),this.list.css(this.lt,"0px"),this.list.css(this.wh,"10px"),this.options.initCallback!==null&&this.options.initCallback(this,"reset"),this.setup()},reload:function(){this.tail!==null&&this.inTail&&this.list.css(this.lt,d.intval(this.list.css(this.lt))+this.tail),this.tail=null,this.inTail=!1,this.options.reloadCallback!==null&&this.options.reloadCallback(this);if(this.options.visible!==null){var a=this,b=Math.ceil(this.clipping()/this.options.visible),c=0,e=0;this.list.children("li").each(function(d){c+=a.dimension(this,b),d+1<a.first&&(e=c)}),this.list.css(this.wh,c+"px"),this.list.css(this.lt,-e+"px")}this.scroll(this.first,!1)},lock:function(){this.locked=!0,this.buttons()},unlock:function(){this.locked=!1,this.buttons()},size:function(a){return a!==undefined&&(this.options.size=a,this.locked||this.buttons()),this.options.size},has:function(a,b){if(b===undefined||!b)b=a;this.options.size!==null&&b>this.options.size&&(b=this.options.size);for(var c=a;c<=b;c++){var d=this.get(c);if(!d.length||d.hasClass("jcarousel-item-placeholder"))return!1}return!0},get:function(b){return a(">.jcarousel-item-"+b,this.list)},add:function(b,c){var e=this.get(b),f=0,g=a(c);if(e.length===0){var h,i=d.intval(b);e=this.create(b);for(;;){h=this.get(--i);if(i<=0||h.length){i<=0?this.list.prepend(e):h.after(e);break}}}else f=this.dimension(e);g.get(0).nodeName.toUpperCase()=="LI"?(e.replaceWith(g),e=g):e.empty().append(c),this.format(e.removeClass(this.className("jcarousel-item-placeholder")),b);var j=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null,k=this.dimension(e,j)-f;return b>0&&b<this.first&&this.list.css(this.lt,d.intval(this.list.css(this.lt))-k+"px"),this.list.css(this.wh,d.intval(this.list.css(this.wh))+k+"px"),e},remove:function(a){var b=this.get(a);if(!b.length||a>=this.first&&a<=this.last)return;var c=this.dimension(b);a<this.first&&this.list.css(this.lt,d.intval(this.list.css(this.lt))+c+"px"),b.remove(),this.list.css(this.wh,d.intval(this.list.css(this.wh))-c+"px")},next:function(){this.tail!==null&&!this.inTail?this.scrollTail(!1):this.scroll((this.options.wrap=="both"||this.options.wrap=="last")&&this.options.size!==null&&this.last==this.options.size?1:this.first+this.options.scroll)},prev:function(){this.tail!==null&&this.inTail?this.scrollTail(!0):this.scroll((this.options.wrap=="both"||this.options.wrap=="first")&&this.options.size!==null&&this.first==1?this.options.size:this.first-this.options.scroll)},scrollTail:function(a){if(this.locked||this.animating||!this.tail)return;this.pauseAuto();var b=d.intval(this.list.css(this.lt));b=a?b+this.tail:b-this.tail,this.inTail=!a,this.prevFirst=this.first,this.prevLast=this.last,this.animate(b)},scroll:function(a,b){if(this.locked||this.animating)return;this.pauseAuto(),this.animate(this.pos(a),b)},pos:function(a,b){var c=d.intval(this.list.css(this.lt));if(this.locked||this.animating)return c;this.options.wrap!="circular"&&(a=a<1?1:this.options.size&&a>this.options.size?this.options.size:a);var e=this.first>a,f=this.options.wrap!="circular"&&this.first<=1?1:this.first,g=e?this.get(f):this.get(this.last),h=e?f:f-1,i=null,j=0,k=!1,l=0,m;while(e?--h>=a:++h<a)i=this.get(h),k=!i.length,i.length===0&&(i=this.create(h).addClass(this.className("jcarousel-item-placeholder")),g[e?"before":"after"](i),this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(h<=0||h>this.options.size)&&(m=this.get(this.index(h)),m.length&&(i=this.add(h,m.clone(!0))))),g=i,l=this.dimension(i),k&&(j+=l),this.first!==null&&(this.options.wrap=="circular"||h>=1&&(this.options.size===null||h<=this.options.size))&&(c=e?c+l:c-l);var n=this.clipping(),o=[],p=0,q=0;g=this.get(a-1),h=a;while(++p){i=this.get(h),k=!i.length,i.length===0&&(i=this.create(h).addClass(this.className("jcarousel-item-placeholder")),g.length===0?this.list.prepend(i):g[e?"before":"after"](i),this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(h<=0||h>this.options.size)&&(m=this.get(this.index(h)),m.length&&(i=this.add(h,m.clone(!0))))),g=i,l=this.dimension(i);if(l===0)throw new Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...");this.options.wrap!="circular"&&this.options.size!==null&&h>this.options.size?o.push(i):k&&(j+=l),q+=l;if(q>=n)break;h++}for(var r=0;r<o.length;r++)o[r].remove();j>0&&(this.list.css(this.wh,this.dimension(this.list)+j+"px"),e&&(c-=j,this.list.css(this.lt,d.intval(this.list.css(this.lt))-j+"px")));var s=a+p-1;this.options.wrap!="circular"&&this.options.size&&s>this.options.size&&(s=this.options.size);if(h>s){p=0,h=s,q=0;while(++p){i=this.get(h--);if(!i.length)break;q+=this.dimension(i);if(q>=n)break}}var t=s-p+1;this.options.wrap!="circular"&&t<1&&(t=1),this.inTail&&e&&(c+=this.tail,this.inTail=!1),this.tail=null;if(this.options.wrap!="circular"&&s==this.options.size&&s-p+1>=1){var u=d.intval(this.get(s).css(this.options.vertical?"marginBottom":"marginRight"));q-u>n&&(this.tail=q-n-u)}b&&a===this.options.size&&this.tail&&(c-=this.tail,this.inTail=!0);while(a-->t)c+=this.dimension(this.get(a));return this.prevFirst=this.first,this.prevLast=this.last,this.first=t,this.last=s,c},animate:function(b,c){if(this.locked||this.animating)return;this.animating=!0;var d=this,e=function(){d.animating=!1,b===0&&d.list.css(d.lt,0),!d.autoStopped&&(d.options.wrap=="circular"||d.options.wrap=="both"||d.options.wrap=="last"||d.options.size===null||d.last<d.options.size||d.last==d.options.size&&d.tail!==null&&!d.inTail)&&d.startAuto(),d.buttons(),d.notify("onAfterAnimation");if(d.options.wrap=="circular"&&d.options.size!==null)for(var a=d.prevFirst;a<=d.prevLast;a++)a!==null&&!(a>=d.first&&a<=d.last)&&(a<1||a>d.options.size)&&d.remove(a)};this.notify("onBeforeAnimation");if(!this.options.animation||c===!1)this.list.css(this.lt,b+"px"),e();else{var f=this.options.vertical?{top:b}:this.options.rtl?{right:b}:{left:b},g={duration:this.options.animation,easing:this.options.easing,complete:e};a.isFunction(this.options.animationStepCallback)&&(g.step=this.options.animationStepCallback),this.list.animate(f,g)}},startAuto:function(a){a!==undefined&&(this.options.auto=a);if(this.options.auto===0)return this.stopAuto();if(this.timer!==null)return;this.autoStopped=!1;var b=this;this.timer=window.setTimeout(function(){b.next()},this.options.auto*1e3)},stopAuto:function(){this.pauseAuto(),this.autoStopped=!0},pauseAuto:function(){if(this.timer===null)return;window.clearTimeout(this.timer),this.timer=null},buttons:function(a,b){a==null&&(a=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="first"||this.options.size===null||this.last<this.options.size),!this.locked&&(!this.options.wrap||this.options.wrap=="first")&&this.options.size!==null&&this.last>=this.options.size&&(a=this.tail!==null&&!this.inTail)),b==null&&(b=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="last"||this.first>1),!this.locked&&(!this.options.wrap||this.options.wrap=="last")&&this.options.size!==null&&this.first==1&&(b=this.tail!==null&&this.inTail));var c=this;this.buttonNext.size()>0?(this.buttonNext.unbind(this.options.buttonNextEvent+".jcarousel",this.funcNext),a&&this.buttonNext.bind(this.options.buttonNextEvent+".jcarousel",this.funcNext),this.buttonNext[a?"removeClass":"addClass"](this.className("jcarousel-next-disabled")).attr("disabled",a?!1:!0),this.options.buttonNextCallback!==null&&this.buttonNext.data("jcarouselstate")!=a&&this.buttonNext.each(function(){c.options.buttonNextCallback(c,this,a)}).data("jcarouselstate",a)):this.options.buttonNextCallback!==null&&this.buttonNextState!=a&&this.options.buttonNextCallback(c,null,a),this.buttonPrev.size()>0?(this.buttonPrev.unbind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev),b&&this.buttonPrev.bind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev),this.buttonPrev[b?"removeClass":"addClass"](this.className("jcarousel-prev-disabled")).attr("disabled",b?!1:!0),this.options.buttonPrevCallback!==null&&this.buttonPrev.data("jcarouselstate")!=b&&this.buttonPrev.each(function(){c.options.buttonPrevCallback(c,this,b)}).data("jcarouselstate",b)):this.options.buttonPrevCallback!==null&&this.buttonPrevState!=b&&this.options.buttonPrevCallback(c,null,b),this.buttonNextState=a,this.buttonPrevState=b},notify:function(a){var b=this.prevFirst===null?"init":this.prevFirst<this.first?"next":"prev";this.callback("itemLoadCallback",a,b),this.prevFirst!==this.first&&(this.callback("itemFirstInCallback",a,b,this.first),this.callback("itemFirstOutCallback",a,b,this.prevFirst)),this.prevLast!==this.last&&(this.callback("itemLastInCallback",a,b,this.last),this.callback("itemLastOutCallback",a,b,this.prevLast)),this.callback("itemVisibleInCallback",a,b,this.first,this.last,this.prevFirst,this.prevLast),this.callback("itemVisibleOutCallback",a,b,this.prevFirst,this.prevLast,this.first,this.last)},callback:function(b,c,d,e,f,g,h){if(this.options[b]==null||typeof this.options[b]!="object"&&c!="onAfterAnimation")return;var i=typeof this.options[b]=="object"?this.options[b][c]:this.options[b];if(!a.isFunction(i))return;var j=this;if(e===undefined)i(j,d,c);else if(f===undefined)this.get(e).each(function(){i(j,this,e,d,c)});else{var k=function(a){j.get(a).each(function(){i(j,this,a,d,c)})};for(var l=e;l<=f;l++)l!==null&&!(l>=g&&l<=h)&&k(l)}},create:function(a){return this.format("<li></li>",a)},format:function(b,c){b=a(b);var d=b.get(0).className.split(" ");for(var e=0;e<d.length;e++)d[e].indexOf("jcarousel-")!=-1&&b.removeClass(d[e]);return b.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-"+c)).css({"list-style":"none"}).attr("jcarouselindex",c),b},className:function(a){return a+" "+a+(this.options.vertical?"-vertical":"-horizontal")},dimension:function(b,c){var e=a(b);if(c==null)return this.options.vertical?e.outerHeight(!0)||d.intval(this.options.itemFallbackDimension):e.outerWidth(!0)||d.intval(this.options.itemFallbackDimension);var f=this.options.vertical?c-d.intval(e.css("marginTop"))-d.intval(e.css("marginBottom")):c-d.intval(e.css("marginLeft"))-d.intval(e.css("marginRight"));return a(e).css(this.wh,f+"px"),this.dimension(e)},clipping:function(){return this.options.vertical?this.clip[0].offsetHeight-d.intval(this.clip.css("borderTopWidth"))-d.intval(this.clip.css("borderBottomWidth")):this.clip[0].offsetWidth-d.intval(this.clip.css("borderLeftWidth"))-d.intval(this.clip.css("borderRightWidth"))},index:function(a,b){return b==null&&(b=this.options.size),Math.round(((a-1)/b-Math.floor((a-1)/b))*b)+1}}),d.extend({defaults:function(c){return a.extend(b,c||{})},intval:function(a){return a=parseInt(a,10),isNaN(a)?0:a},windowLoaded:function(){c=!0}}),a.fn.jcarousel=function(b){if(typeof b=="string"){var c=a(this).data("jcarousel"),e=Array.prototype.slice.call(arguments,1);return c[b].apply(c,e)}return this.each(function(){var c=a(this).data("jcarousel");c?(b&&a.extend(c.options,b),c.reload()):a(this).data("jcarousel",new d(this,b))})}})(jQuery)