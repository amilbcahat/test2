/* =========================================================
 * bootstrap-datepicker.js
 * Repo: https://github.com/eternicode/bootstrap-datepicker/
 * Demo: http://eternicode.github.io/bootstrap-datepicker/
 * Docs: http://bootstrap-datepicker.readthedocs.org/
 * Forked from http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Started by Stefan Petre; improvements by Andrew Rowls + contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
(function(a,b){function d(){return new Date(Date.UTC.apply(Date,arguments))}function e(){var a=new Date;return d(a.getFullYear(),a.getMonth(),a.getDate())}function f(a){return function(){return this[a].apply(this,arguments)}}function j(b,c){function h(a,b){return b.toLowerCase()}var d=a(b).data(),e={},f,g=new RegExp("^"+c.toLowerCase()+"([A-Z])");c=new RegExp("^"+c.toLowerCase());for(var i in d)c.test(i)&&(f=i.replace(g,h),e[f]=d[i]);return e}function k(b){var c={};if(!o[b]){b=b.split("-")[0];if(!o[b])return}var d=o[b];return a.each(n,function(a,b){b in d&&(c[b]=d[b])}),c}var c=a(window),g=function(){var b={get:function(a){return this.slice(a)[0]},contains:function(a){var b=a&&a.valueOf();for(var c=0,d=this.length;c<d;c++)if(this[c].valueOf()===b)return c;return-1},remove:function(a){this.splice(a,1)},replace:function(b){if(!b)return;a.isArray(b)||(b=[b]),this.clear(),this.push.apply(this,b)},clear:function(){this.length=0},copy:function(){var a=new g;return a.replace(this),a}};return function(){var c=[];return c.push.apply(c,arguments),a.extend(c,b),c}}(),h=function(b,c){this.dates=new g,this.viewDate=e(),this.focusDate=null,this._process_options(c),this.element=a(b),this.isInline=!1,this.isInput=this.element.is("input"),this.component=this.element.is(".date")?this.element.find(".add-on, .input-group-addon, .btn"):!1,this.hasInput=this.component&&this.element.find("input").length,this.component&&this.component.length===0&&(this.component=!1),this.picker=a(p.template),this._buildEvents(),this._attachEvents(),this.isInline?this.picker.addClass("datepicker-inline").appendTo(this.element):this.picker.addClass("datepicker-dropdown dropdown-menu"),this.o.rtl&&this.picker.addClass("datepicker-rtl"),this.viewMode=this.o.startView,this.o.calendarWeeks&&this.picker.find("tfoot th.today").attr("colspan",function(a,b){return parseInt(b)+1}),this._allow_update=!1,this.setStartDate(this._o.startDate),this.setEndDate(this._o.endDate),this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled),this.fillDow(),this.fillMonths(),this._allow_update=!0,this.update(),this.showMode(),this.isInline&&this.show()};h.prototype={constructor:h,_process_options:function(b){this._o=a.extend({},this._o,b);var c=this.o=a.extend({},this._o),d=c.language;o[d]||(d=d.split("-")[0],o[d]||(d=m.language)),c.language=d;switch(c.startView){case 2:case"decade":c.startView=2;break;case 1:case"year":c.startView=1;break;default:c.startView=0}switch(c.minViewMode){case 1:case"months":c.minViewMode=1;break;case 2:case"years":c.minViewMode=2;break;default:c.minViewMode=0}c.startView=Math.max(c.startView,c.minViewMode),c.multidate!==!0&&(c.multidate=Number(c.multidate)||!1,c.multidate!==!1?c.multidate=Math.max(0,c.multidate):c.multidate=1),c.multidateSeparator=String(c.multidateSeparator),c.weekStart%=7,c.weekEnd=(c.weekStart+6)%7;var e=p.parseFormat(c.format);c.startDate!==-Infinity&&(c.startDate?c.startDate instanceof Date?c.startDate=this._local_to_utc(this._zero_time(c.startDate)):c.startDate=p.parseDate(c.startDate,e,c.language):c.startDate=-Infinity),c.endDate!==Infinity&&(c.endDate?c.endDate instanceof Date?c.endDate=this._local_to_utc(this._zero_time(c.endDate)):c.endDate=p.parseDate(c.endDate,e,c.language):c.endDate=Infinity),c.daysOfWeekDisabled=c.daysOfWeekDisabled||[],a.isArray(c.daysOfWeekDisabled)||(c.daysOfWeekDisabled=c.daysOfWeekDisabled.split(/[,\s]*/)),c.daysOfWeekDisabled=a.map(c.daysOfWeekDisabled,function(a){return parseInt(a,10)});var f=String(c.orientation).toLowerCase().split(/\s+/g),g=c.orientation.toLowerCase();f=a.grep(f,function(a){return/^auto|left|right|top|bottom$/.test(a)}),c.orientation={x:"auto",y:"auto"};if(!!g&&g!=="auto")if(f.length===1)switch(f[0]){case"top":case"bottom":c.orientation.y=f[0];break;case"left":case"right":c.orientation.x=f[0]}else g=a.grep(f,function(a){return/^left|right$/.test(a)}),c.orientation.x=g[0]||"auto",g=a.grep(f,function(a){return/^top|bottom$/.test(a)}),c.orientation.y=g[0]||"auto"},_events:[],_secondaryEvents:[],_applyEvents:function(a){for(var c=0,d,e,f;c<a.length;c++)d=a[c][0],a[c].length===2?(e=b,f=a[c][1]):a[c].length===3&&(e=a[c][1],f=a[c][2]),d.on(f,e)},_unapplyEvents:function(a){for(var c=0,d,e,f;c<a.length;c++)d=a[c][0],a[c].length===2?(f=b,e=a[c][1]):a[c].length===3&&(f=a[c][1],e=a[c][2]),d.off(e,f)},_buildEvents:function(){this.isInput?this._events=[[this.element,{focus:a.proxy(this.show,this),keyup:a.proxy(function(b){a.inArray(b.keyCode,[27,37,39,38,40,32,13,9])===-1&&this.update()},this),keydown:a.proxy(this.keydown,this)}]]:this.component&&this.hasInput?this._events=[[this.element.find("input"),{focus:a.proxy(this.show,this),keyup:a.proxy(function(b){a.inArray(b.keyCode,[27,37,39,38,40,32,13,9])===-1&&this.update()},this),keydown:a.proxy(this.keydown,this)}],[this.component,{click:a.proxy(this.show,this)}]]:this.element.is("div")?this.isInline=!0:this._events=[[this.element,{click:a.proxy(this.show,this)}]],this._events.push([this.element,"*",{blur:a.proxy(function(a){this._focused_from=a.target},this)}],[this.element,{blur:a.proxy(function(a){this._focused_from=a.target},this)}]),this._secondaryEvents=[[this.picker,{click:a.proxy(this.click,this)}],[a(window),{resize:a.proxy(this.place,this)}],[a(document),{"mousedown touchstart":a.proxy(function(a){this.element.is(a.target)||this.element.find(a.target).length||this.picker.is(a.target)||this.picker.find(a.target).length||this.hide()},this)}]]},_attachEvents:function(){this._detachEvents(),this._applyEvents(this._events)},_detachEvents:function(){this._unapplyEvents(this._events)},_attachSecondaryEvents:function(){this._detachSecondaryEvents(),this._applyEvents(this._secondaryEvents)},_detachSecondaryEvents:function(){this._unapplyEvents(this._secondaryEvents)},_trigger:function(b,c){var d=c||this.dates.get(-1),e=this._utc_to_local(d);this.element.trigger({type:b,date:e,dates:a.map(this.dates,this._utc_to_local),format:a.proxy(function(a,b){arguments.length===0?(a=this.dates.length-1,b=this.o.format):typeof a=="string"&&(b=a,a=this.dates.length-1),b=b||this.o.format;var c=this.dates.get(a);return p.formatDate(c,b,this.o.language)},this)})},show:function(){this.isInline||this.picker.appendTo("body"),this.picker.show(),this.place(),this._attachSecondaryEvents(),this._trigger("show")},hide:function(){if(this.isInline)return;if(!this.picker.is(":visible"))return;this.focusDate=null,this.picker.hide().detach(),this._detachSecondaryEvents(),this.viewMode=this.o.startView,this.showMode(),this.o.forceParse&&(this.isInput&&this.element.val()||this.hasInput&&this.element.find("input").val())&&this.setValue(),this._trigger("hide")},remove:function(){this.hide(),this._detachEvents(),this._detachSecondaryEvents(),this.picker.remove(),delete this.element.data().datepicker,this.isInput||delete this.element.data().date},_utc_to_local:function(a){return a&&new Date(a.getTime()+a.getTimezoneOffset()*6e4)},_local_to_utc:function(a){return a&&new Date(a.getTime()-a.getTimezoneOffset()*6e4)},_zero_time:function(a){return a&&new Date(a.getFullYear(),a.getMonth(),a.getDate())},_zero_utc_time:function(a){return a&&new Date(Date.UTC(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate()))},getDates:function(){return a.map(this.dates,this._utc_to_local)},getUTCDates:function(){return a.map(this.dates,function(a){return new Date(a)})},getDate:function(){return this._utc_to_local(this.getUTCDate())},getUTCDate:function(){return new Date(this.dates.get(-1))},setDates:function(){var b=a.isArray(arguments[0])?arguments[0]:arguments;this.update.apply(this,b),this._trigger("changeDate"),this.setValue()},setUTCDates:function(){var b=a.isArray(arguments[0])?arguments[0]:arguments;this.update.apply(this,a.map(b,this._utc_to_local)),this._trigger("changeDate"),this.setValue()},setDate:f("setDates"),setUTCDate:f("setUTCDates"),setValue:function(){var a=this.getFormattedDate();this.isInput?this.element.val(a).change():this.component&&this.element.find("input").val(a).change()},getFormattedDate:function(c){c===b&&(c=this.o.format);var d=this.o.language;return a.map(this.dates,function(a){return p.formatDate(a,c,d)}).join(this.o.multidateSeparator)},setStartDate:function(a){this._process_options({startDate:a}),this.update(),this.updateNavArrows()},setEndDate:function(a){this._process_options({endDate:a}),this.update(),this.updateNavArrows()},setDaysOfWeekDisabled:function(a){this._process_options({daysOfWeekDisabled:a}),this.update(),this.updateNavArrows()},place:function(){if(this.isInline)return;var b=this.picker.outerWidth(),d=this.picker.outerHeight(),e=10,f=c.width(),g=c.height(),h=c.scrollTop(),i=parseInt(this.element.parents().filter(function(){return a(this).css("z-index")!=="auto"}).first().css("z-index"))+10,j=this.component?this.component.parent().offset():this.element.offset(),k=this.component?this.component.outerHeight(!0):this.element.outerHeight(!1),l=this.component?this.component.outerWidth(!0):this.element.outerWidth(!1),m=j.left,n=j.top;this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"),this.o.orientation.x!=="auto"?(this.picker.addClass("datepicker-orient-"+this.o.orientation.x),this.o.orientation.x==="right"&&(m-=b-l)):(this.picker.addClass("datepicker-orient-left"),j.left<0?m-=j.left-e:j.left+b>f&&(m=f-b-e));var o=this.o.orientation.y,p,q;o==="auto"&&(p=-h+j.top-d,q=h+g-(j.top+k+d),Math.max(p,q)===q?o="top":o="bottom"),this.picker.addClass("datepicker-orient-"+o),o==="top"?n+=k:n-=d+parseInt(this.picker.css("padding-top")),this.picker.css({top:n,left:m,zIndex:i})},_allow_update:!0,update:function(){if(!this._allow_update)return;var b=this.dates.copy(),c=[],d=!1;arguments.length?(a.each(arguments,a.proxy(function(a,b){b instanceof Date&&(b=this._local_to_utc(b)),c.push(b)},this)),d=!0):(c=this.isInput?this.element.val():this.element.data("date")||this.element.find("input").val(),c&&this.o.multidate?c=c.split(this.o.multidateSeparator):c=[c],delete this.element.data().date),c=a.map(c,a.proxy(function(a){return p.parseDate(a,this.o.format,this.o.language)},this)),c=a.grep(c,a.proxy(function(a){return a<this.o.startDate||a>this.o.endDate||!a},this),!0),this.dates.replace(c),this.dates.length?this.viewDate=new Date(this.dates.get(-1)):this.viewDate<this.o.startDate?this.viewDate=new Date(this.o.startDate):this.viewDate>this.o.endDate&&(this.viewDate=new Date(this.o.endDate)),d?this.setValue():c.length&&String(b)!==String(this.dates)&&this._trigger("changeDate"),!this.dates.length&&b.length&&this._trigger("clearDate"),this.fill()},fillDow:function(){var a=this.o.weekStart,b="<tr>";if(this.o.calendarWeeks){var c='<th class="cw">&nbsp;</th>';b+=c,this.picker.find(".datepicker-days thead tr:first-child").prepend(c)}while(a<this.o.weekStart+7)b+='<th class="dow">'+o[this.o.language].daysMin[a++%7]+"</th>";b+="</tr>",this.picker.find(".datepicker-days thead").append(b)},fillMonths:function(){var a="",b=0;while(b<12)a+='<span class="month">'+o[this.o.language].monthsShort[b++]+"</span>";this.picker.find(".datepicker-months td").html(a)},setRange:function(b){!b||!b.length?delete this.range:this.range=a.map(b,function(a){return a.valueOf()}),this.fill()},getClassNames:function(b){var c=[],d=this.viewDate.getUTCFullYear(),e=this.viewDate.getUTCMonth(),f=new Date;return b.getUTCFullYear()<d||b.getUTCFullYear()===d&&b.getUTCMonth()<e?c.push("old"):(b.getUTCFullYear()>d||b.getUTCFullYear()===d&&b.getUTCMonth()>e)&&c.push("new"),this.focusDate&&b.valueOf()===this.focusDate.valueOf()&&c.push("focused"),this.o.todayHighlight&&b.getUTCFullYear()===f.getFullYear()&&b.getUTCMonth()===f.getMonth()&&b.getUTCDate()===f.getDate()&&c.push("today"),this.dates.contains(b)!==-1&&c.push("active"),(b.valueOf()<this.o.startDate||b.valueOf()>this.o.endDate||a.inArray(b.getUTCDay(),this.o.daysOfWeekDisabled)!==-1)&&c.push("disabled"),this.range&&(b>this.range[0]&&b<this.range[this.range.length-1]&&c.push("range"),a.inArray(b.valueOf(),this.range)!==-1&&c.push("selected")),c},fill:function(){var c=new Date(this.viewDate),e=c.getUTCFullYear(),f=c.getUTCMonth(),g=this.o.startDate!==-Infinity?this.o.startDate.getUTCFullYear():-Infinity,h=this.o.startDate!==-Infinity?this.o.startDate.getUTCMonth():-Infinity,i=this.o.endDate!==Infinity?this.o.endDate.getUTCFullYear():Infinity,j=this.o.endDate!==Infinity?this.o.endDate.getUTCMonth():Infinity,k=o[this.o.language].today||o.en.today||"",l=o[this.o.language].clear||o.en.clear||"",m;this.picker.find(".datepicker-days thead th.datepicker-switch").text(o[this.o.language].months[f]+" "+e),this.picker.find("tfoot th.today").text(k).toggle(this.o.todayBtn!==!1),this.picker.find("tfoot th.clear").text(l).toggle(this.o.clearBtn!==!1),this.updateNavArrows(),this.fillMonths();var n=d(e,f-1,28),q=p.getDaysInMonth(n.getUTCFullYear(),n.getUTCMonth());n.setUTCDate(q),n.setUTCDate(q-(n.getUTCDay()-this.o.weekStart+7)%7);var r=new Date(n);r.setUTCDate(r.getUTCDate()+42),r=r.valueOf();var s=[],t;while(n.valueOf()<r){if(n.getUTCDay()===this.o.weekStart){s.push("<tr>");if(this.o.calendarWeeks){var u=new Date(+n+(this.o.weekStart-n.getUTCDay()-7)%7*864e5),v=new Date(Number(u)+(11-u.getUTCDay())%7*864e5),w=new Date(Number(w=d(v.getUTCFullYear(),0,1))+(11-w.getUTCDay())%7*864e5),x=(v-w)/864e5/7+1;s.push('<td class="cw">'+x+"</td>")}}t=this.getClassNames(n),t.push("day");if(this.o.beforeShowDay!==a.noop){var y=this.o.beforeShowDay(this._utc_to_local(n));y===b?y={}:typeof y=="boolean"?y={enabled:y}:typeof y=="string"&&(y={classes:y}),y.enabled===!1&&t.push("disabled"),y.classes&&(t=t.concat(y.classes.split(/\s+/))),y.tooltip&&(m=y.tooltip)}t=a.unique(t),s.push('<td class="'+t.join(" ")+'"'+(m?' title="'+m+'"':"")+">"+n.getUTCDate()+"</td>"),n.getUTCDay()===this.o.weekEnd&&s.push("</tr>"),n.setUTCDate(n.getUTCDate()+1)}this.picker.find(".datepicker-days tbody").empty().append(s.join(""));var z=this.picker.find(".datepicker-months").find("th:eq(1)").text(e).end().find("span").removeClass("active");a.each(this.dates,function(a,b){b.getUTCFullYear()===e&&z.eq(b.getUTCMonth()).addClass("active")}),(e<g||e>i)&&z.addClass("disabled"),e===g&&z.slice(0,h).addClass("disabled"),e===i&&z.slice(j+1).addClass("disabled"),s="",e=parseInt(e/10,10)*10;var A=this.picker.find(".datepicker-years").find("th:eq(1)").text(e+"-"+(e+9)).end().find("td");e-=1;var B=a.map(this.dates,function(a){return a.getUTCFullYear()}),C;for(var D=-1;D<11;D++)C=["year"],D===-1?C.push("old"):D===10&&C.push("new"),a.inArray(e,B)!==-1&&C.push("active"),(e<g||e>i)&&C.push("disabled"),s+='<span class="'+C.join(" ")+'">'+e+"</span>",e+=1;A.html(s)},updateNavArrows:function(){if(!this._allow_update)return;var a=new Date(this.viewDate),b=a.getUTCFullYear(),c=a.getUTCMonth();switch(this.viewMode){case 0:this.o.startDate!==-Infinity&&b<=this.o.startDate.getUTCFullYear()&&c<=this.o.startDate.getUTCMonth()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.o.endDate!==Infinity&&b>=this.o.endDate.getUTCFullYear()&&c>=this.o.endDate.getUTCMonth()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"});break;case 1:case 2:this.o.startDate!==-Infinity&&b<=this.o.startDate.getUTCFullYear()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.o.endDate!==Infinity&&b>=this.o.endDate.getUTCFullYear()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"})}},click:function(b){b.preventDefault();var c=a(b.target).closest("span, td, th"),e,f,g;if(c.length===1)switch(c[0].nodeName.toLowerCase()){case"th":switch(c[0].className){case"datepicker-switch":this.showMode(1);break;case"prev":case"next":var h=p.modes[this.viewMode].navStep*(c[0].className==="prev"?-1:1);switch(this.viewMode){case 0:this.viewDate=this.moveMonth(this.viewDate,h),this._trigger("changeMonth",this.viewDate);break;case 1:case 2:this.viewDate=this.moveYear(this.viewDate,h),this.viewMode===1&&this._trigger("changeYear",this.viewDate)}this.fill();break;case"today":var i=new Date;i=d(i.getFullYear(),i.getMonth(),i.getDate(),0,0,0),this.showMode(-2);var j=this.o.todayBtn==="linked"?null:"view";this._setDate(i,j);break;case"clear":var k;this.isInput?k=this.element:this.component&&(k=this.element.find("input")),k&&k.val("").change(),this.update(),this._trigger("changeDate"),this.o.autoclose&&this.hide()}break;case"span":c.is(".disabled")||(this.viewDate.setUTCDate(1),c.is(".month")?(g=1,f=c.parent().find("span").index(c),e=this.viewDate.getUTCFullYear(),this.viewDate.setUTCMonth(f),this._trigger("changeMonth",this.viewDate),this.o.minViewMode===1&&this._setDate(d(e,f,g))):(g=1,f=0,e=parseInt(c.text(),10)||0,this.viewDate.setUTCFullYear(e),this._trigger("changeYear",this.viewDate),this.o.minViewMode===2&&this._setDate(d(e,f,g))),this.showMode(-1),this.fill());break;case"td":c.is(".day")&&!c.is(".disabled")&&(g=parseInt(c.text(),10)||1,e=this.viewDate.getUTCFullYear(),f=this.viewDate.getUTCMonth(),c.is(".old")?f===0?(f=11,e-=1):f-=1:c.is(".new")&&(f===11?(f=0,e+=1):f+=1),this._setDate(d(e,f,g)))}this.picker.is(":visible")&&this._focused_from&&a(this._focused_from).focus(),delete this._focused_from},_toggle_multidate:function(a){var b=this.dates.contains(a);a?b!==-1?this.dates.remove(b):this.dates.push(a):this.dates.clear();if(typeof this.o.multidate=="number")while(this.dates.length>this.o.multidate)this.dates.remove(0)},_setDate:function(a,b){(!b||b==="date")&&this._toggle_multidate(a&&new Date(a));if(!b||b==="view")this.viewDate=a&&new Date(a);this.fill(),this.setValue(),this._trigger("changeDate");var c;this.isInput?c=this.element:this.component&&(c=this.element.find("input")),c&&c.change(),this.o.autoclose&&(!b||b==="date")&&this.hide()},moveMonth:function(a,c){if(!a)return b;if(!c)return a;var d=new Date(a.valueOf()),e=d.getUTCDate(),f=d.getUTCMonth(),g=Math.abs(c),h,i;c=c>0?1:-1;if(g===1){i=c===-1?function(){return d.getUTCMonth()===f}:function(){return d.getUTCMonth()!==h},h=f+c,d.setUTCMonth(h);if(h<0||h>11)h=(h+12)%12}else{for(var j=0;j<g;j++)d=this.moveMonth(d,c);h=d.getUTCMonth(),d.setUTCDate(e),i=function(){return h!==d.getUTCMonth()}}while(i())d.setUTCDate(--e),d.setUTCMonth(h);return d},moveYear:function(a,b){return this.moveMonth(a,b*12)},dateWithinRange:function(a){return a>=this.o.startDate&&a<=this.o.endDate},keydown:function(a){if(this.picker.is(":not(:visible)")){a.keyCode===27&&this.show();return}var b=!1,c,d,f,g=this.focusDate||this.viewDate;switch(a.keyCode){case 27:this.focusDate?(this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.fill()):this.hide(),a.preventDefault();break;case 37:case 39:if(!this.o.keyboardNavigation)break;c=a.keyCode===37?-1:1,a.ctrlKey?(d=this.moveYear(this.dates.get(-1)||e(),c),f=this.moveYear(g,c),this._trigger("changeYear",this.viewDate)):a.shiftKey?(d=this.moveMonth(this.dates.get(-1)||e(),c),f=this.moveMonth(g,c),this._trigger("changeMonth",this.viewDate)):(d=new Date(this.dates.get(-1)||e()),d.setUTCDate(d.getUTCDate()+c),f=new Date(g),f.setUTCDate(g.getUTCDate()+c)),this.dateWithinRange(d)&&(this.focusDate=this.viewDate=f,this.setValue(),this.fill(),a.preventDefault());break;case 38:case 40:if(!this.o.keyboardNavigation)break;c=a.keyCode===38?-1:1,a.ctrlKey?(d=this.moveYear(this.dates.get(-1)||e(),c),f=this.moveYear(g,c),this._trigger("changeYear",this.viewDate)):a.shiftKey?(d=this.moveMonth(this.dates.get(-1)||e(),c),f=this.moveMonth(g,c),this._trigger("changeMonth",this.viewDate)):(d=new Date(this.dates.get(-1)||e()),d.setUTCDate(d.getUTCDate()+c*7),f=new Date(g),f.setUTCDate(g.getUTCDate()+c*7)),this.dateWithinRange(d)&&(this.focusDate=this.viewDate=f,this.setValue(),this.fill(),a.preventDefault());break;case 32:break;case 13:g=this.focusDate||this.dates.get(-1)||this.viewDate,this._toggle_multidate(g),b=!0,this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.setValue(),this.fill(),this.picker.is(":visible")&&(a.preventDefault(),this.o.autoclose&&this.hide());break;case 9:this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.fill(),this.hide()}if(b){this.dates.length?this._trigger("changeDate"):this._trigger("clearDate");var h;this.isInput?h=this.element:this.component&&(h=this.element.find("input")),h&&h.change()}},showMode:function(a){a&&(this.viewMode=Math.max(this.o.minViewMode,Math.min(2,this.viewMode+a))),this.picker.find(">div").hide().filter(".datepicker-"+p.modes[this.viewMode].clsName).css("display","block"),this.updateNavArrows()}};var i=function(b,c){this.element=a(b),this.inputs=a.map(c.inputs,function(a){return a.jquery?a[0]:a}),delete c.inputs,a(this.inputs).datepicker(c).bind("changeDate",a.proxy(this.dateUpdated,this)),this.pickers=a.map(this.inputs,function(b){return a(b).data("datepicker")}),this.updateDates()};i.prototype={updateDates:function(){this.dates=a.map(this.pickers,function(a){return a.getUTCDate()}),this.updateRanges()},updateRanges:function(){var b=a.map(this.dates,function(a){return a.valueOf()});a.each(this.pickers,function(a,c){c.setRange(b)})},dateUpdated:function(b){if(this.updating)return;this.updating=!0;var c=a(b.target).data("datepicker"),d=c.getUTCDate(),e=a.inArray(b.target,this.inputs),f=this.inputs.length;if(e===-1)return;a.each(this.pickers,function(a,b){b.getUTCDate()||b.setUTCDate(d)});if(d<this.dates[e])while(e>=0&&d<this.dates[e])this.pickers[e--].setUTCDate(d);else if(d>this.dates[e])while(e<f&&d>this.dates[e])this.pickers[e++].setUTCDate(d);this.updateDates(),delete this.updating},remove:function(){a.map(this.pickers,function(a){a.remove()}),delete this.element.data().datepicker}};var l=a.fn.datepicker;a.fn.datepicker=function(c){var d=Array.apply(null,arguments);d.shift();var e;return this.each(function(){var f=a(this),g=f.data("datepicker"),l=typeof c=="object"&&c;if(!g){var n=j(this,"date"),o=a.extend({},m,n,l),p=k(o.language),q=a.extend({},m,p,n,l);if(f.is(".input-daterange")||q.inputs){var r={inputs:q.inputs||f.find("input").toArray()};f.data("datepicker",g=new i(this,a.extend(q,r)))}else f.data("datepicker",g=new h(this,q))}if(typeof c=="string"&&typeof g[c]=="function"){e=g[c].apply(g,d);if(e!==b)return!1}}),e!==b?e:this};var m=a.fn.datepicker.defaults={autoclose:!1,beforeShowDay:a.noop,calendarWeeks:!1,clearBtn:!1,daysOfWeekDisabled:[],endDate:Infinity,forceParse:!0,format:"mm/dd/yyyy",keyboardNavigation:!0,language:"en",minViewMode:0,multidate:!1,multidateSeparator:",",orientation:"auto",rtl:!1,startDate:-Infinity,startView:0,todayBtn:!1,todayHighlight:!1,weekStart:0},n=a.fn.datepicker.locale_opts=["format","rtl","weekStart"];a.fn.datepicker.Constructor=h;var o=a.fn.datepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",clear:"Clear"}},p={modes:[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10}],isLeapYear:function(a){return a%4===0&&a%100!==0||a%400===0},getDaysInMonth:function(a,b){return[31,p.isLeapYear(a)?29:28,31,30,31,30,31,31,30,31,30,31][b]},validParts:/dd?|DD?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,parseFormat:function(a){var b=a.replace(this.validParts,"\0").split("\0"),c=a.match(this.validParts);if(!b||!b.length||!c||c.length===0)throw new Error("Invalid date format.");return{separators:b,parts:c}},parseDate:function(c,e,f){function u(){var a=this.slice(0,i[l].length),b=i[l].slice(0,a.length);return a===b}if(!c)return b;if(c instanceof Date)return c;typeof e=="string"&&(e=p.parseFormat(e));var g=/([\-+]\d+)([dmwy])/,i=c.match(/([\-+]\d+)([dmwy])/g),j,k,l;if(/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(c)){c=new Date;for(l=0;l<i.length;l++){j=g.exec(i[l]),k=parseInt(j[1]);switch(j[2]){case"d":c.setUTCDate(c.getUTCDate()+k);break;case"m":c=h.prototype.moveMonth.call(h.prototype,c,k);break;case"w":c.setUTCDate(c.getUTCDate()+k*7);break;case"y":c=h.prototype.moveYear.call(h.prototype,c,k)}}return d(c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate(),0,0,0)}i=c&&c.match(this.nonpunctuation)||[],c=new Date;var m={},n=["yyyy","yy","M","MM","m","mm","d","dd"],q={yyyy:function(a,b){return a.setUTCFullYear(b)},yy:function(a,b){return a.setUTCFullYear(2e3+b)},m:function(a,b){if(isNaN(a))return a;b-=1;while(b<0)b+=12;b%=12,a.setUTCMonth(b);while(a.getUTCMonth()!==b)a.setUTCDate(a.getUTCDate()-1);return a},d:function(a,b){return a.setUTCDate(b)}},r,s;q.M=q.MM=q.mm=q.m,q.dd=q.d,c=d(c.getFullYear(),c.getMonth(),c.getDate(),0,0,0);var t=e.parts.slice();i.length!==t.length&&(t=a(t).filter(function(b,c){return a.inArray(c,n)!==-1}).toArray());if(i.length===t.length){var v;for(l=0,v=t.length;l<v;l++){r=parseInt(i[l],10),j=t[l];if(isNaN(r))switch(j){case"MM":s=a(o[f].months).filter(u),r=a.inArray(s[0],o[f].months)+1;break;case"M":s=a(o[f].monthsShort).filter(u),r=a.inArray(s[0],o[f].monthsShort)+1}m[j]=r}var w,x;for(l=0;l<n.length;l++)x=n[l],x in m&&!isNaN(m[x])&&(w=new Date(c),q[x](w,m[x]),isNaN(w)||(c=w))}return c},formatDate:function(b,c,d){if(!b)return"";typeof c=="string"&&(c=p.parseFormat(c));var e={d:b.getUTCDate(),D:o[d].daysShort[b.getUTCDay()],DD:o[d].days[b.getUTCDay()],m:b.getUTCMonth()+1,M:o[d].monthsShort[b.getUTCMonth()],MM:o[d].months[b.getUTCMonth()],yy:b.getUTCFullYear().toString().substring(2),yyyy:b.getUTCFullYear()};e.dd=(e.d<10?"0":"")+e.d,e.mm=(e.m<10?"0":"")+e.m,b=[];var f=a.extend([],c.separators);for(var g=0,h=c.parts.length;g<=h;g++)f.length&&b.push(f.shift()),b.push(e[c.parts[g]]);return b.join("")},headTemplate:'<thead><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',footTemplate:'<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'};p.template='<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">'+p.headTemplate+"<tbody></tbody>"+p.footTemplate+"</table>"+"</div>"+'<div class="datepicker-months">'+'<table class="table-condensed">'+p.headTemplate+p.contTemplate+p.footTemplate+"</table>"+"</div>"+'<div class="datepicker-years">'+'<table class="table-condensed">'+p.headTemplate+p.contTemplate+p.footTemplate+"</table>"+"</div>"+"</div>",a.fn.datepicker.DPGlobal=p,a.fn.datepicker.noConflict=function(){return a.fn.datepicker=l,this},a(document).on("focus.datepicker.data-api click.datepicker.data-api",'[data-provide="datepicker"]',function(b){var c=a(this);if(c.data("datepicker"))return;b.preventDefault(),c.datepicker("show")}),a(function(){a('[data-provide="datepicker-inline"]').datepicker()})})(window.jQuery)