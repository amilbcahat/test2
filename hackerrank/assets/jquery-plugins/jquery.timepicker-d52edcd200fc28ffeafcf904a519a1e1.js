!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){function i(e){if(e.minTime&&(e.minTime=v(e.minTime)),e.maxTime&&(e.maxTime=v(e.maxTime)),e.durationTime&&"function"!=typeof e.durationTime&&(e.durationTime=v(e.durationTime)),e.disableTimeRanges.length>0){for(var i in e.disableTimeRanges)e.disableTimeRanges[i]=[v(e.disableTimeRanges[i][0]),v(e.disableTimeRanges[i][1])];e.disableTimeRanges=e.disableTimeRanges.sort(function(e,i){return e[0]-i[0]})}return e}function t(i){var t=i.data("timepicker-settings"),r=i.data("timepicker-list");r&&r.length&&(r.remove(),i.data("timepicker-list",!1)),r=e("<ul />",{"class":"ui-timepicker-list"});var a=e("<div />",{"class":"ui-timepicker-wrapper",tabindex:-1});a.css({display:"none",position:"absolute"}).append(r),t.className&&a.addClass(t.className),null===t.minTime&&null===t.durationTime||!t.showDuration||a.addClass("ui-timepicker-with-duration");var n=t.minTime;"function"==typeof t.durationTime?n=v(t.durationTime()):null!==t.durationTime&&(n=t.durationTime);var o=null!==t.minTime?t.minTime:0,l=null!==t.maxTime?t.maxTime:o+y-1;o>=l&&(l+=y);for(var u=t.disableTimeRanges,m=0,p=u.length,d=o;l>=d;d+=60*t.step){var f=d%y,T=e("<li />");if(T.data("time",f),T.text(k(f,t.timeFormat)),(null!==t.minTime||null!==t.durationTime)&&t.showDuration){var b=e("<span />");b.addClass("ui-timepicker-duration"),b.text(" ("+g(d-n)+")"),T.append(b)}p>m&&(f>=u[m][1]&&(m+=1),u[m]&&f>=u[m][0]&&f<u[m][1]&&T.addClass("ui-timepicker-disabled")),r.append(T)}a.data("timepicker-input",i),i.data("timepicker-list",a);var w=t.appendTo;"string"==typeof w?w=e(w):"function"==typeof w&&(w=w(i)),w.append(a),c(i,r),r.on("click","li",function(){i.off("focus.timepicker"),i.on("focus.timepicker-ie-hack",function(){i.off("focus.timepicker-ie-hack"),i.on("focus.timepicker",C.show)}),s(i)||i[0].focus(),r.find("li").removeClass("ui-timepicker-selected"),e(this).addClass("ui-timepicker-selected"),h(i)&&(i.trigger("hideTimepicker"),a.hide())})}function r(){return new Date(1970,1,1,0,0,0)}function a(i){"ontouchstart"in document?e("body").on("touchstart.ui-timepicker",n):(e("body").on("mousedown.ui-timepicker",n),i.closeOnWindowScroll&&e(window).on("scroll.ui-timepicker",n))}function n(i){var t=e(i.target),r=t.closest(".ui-timepicker-input");0===r.length&&0===t.closest(".ui-timepicker-wrapper").length&&(C.hide(),e("body").unbind(".ui-timepicker"),e(window).unbind(".ui-timepicker"))}function s(e){var i=e.data("timepicker-settings");return(window.navigator.msMaxTouchPoints||"ontouchstart"in document)&&i.disableTouchKeyboard}function o(i,t,r){if(!r&&0!==r)return!1;var a=i.data("timepicker-settings"),n=!1,s=30*a.step;return t.find("li").each(function(i,t){var a=e(t),o=a.data("time")-r;return Math.abs(o)<s||o==s?(n=a,!1):void 0}),n}function c(e,i){i.find("li").removeClass("ui-timepicker-selected");var t=v(u(e));if(null!==t){var r=o(e,i,t);if(r){var a=r.offset().top-i.offset().top;(a+r.outerHeight()>i.outerHeight()||0>a)&&i.scrollTop(i.scrollTop()+r.position().top-r.outerHeight()),r.addClass("ui-timepicker-selected")}}}function l(){if(""!==this.value){var i=e(this),t=i.data("timepicker-list");if(!t||!t.is(":visible")){var r=v(this.value);if(null===r)return i.trigger("timeFormatError"),void 0;var a=i.data("timepicker-settings"),n=!1;if(null!==a.minTime&&r<a.minTime?n=!0:null!==a.maxTime&&r>a.maxTime&&(n=!0),e.each(a.disableTimeRanges,function(){return r>=this[0]&&r<this[1]?(n=!0,!1):void 0}),a.forceRoundTime){var s=r%(60*a.step);s>=30*a.step?r+=60*a.step-s:r-=s}var o=k(r,a.timeFormat);n?m(i,o,"error")&&i.trigger("timeRangeError"):m(i,o)}}}function u(e){return e.is("input")?e.val():e.data("ui-timepicker-value")}function m(e,i,t){return e.data("ui-timepicker-value",i),e.is("input")&&e.val(i),e.data("ui-timepicker-value")!=i?("select"==t?e.trigger("selectTime").trigger("changeTime").trigger("change"):"error"!=t&&e.trigger("changeTime"),!0):(e.trigger("selectTime"),!1)}function p(i){var t=e(this),r=t.data("timepicker-list");if(!r||!r.is(":visible")){if(40!=i.keyCode)return d(i,t);s(t)||t.focus()}switch(i.keyCode){case 13:return h(t)&&C.hide.apply(this),i.preventDefault(),!1;case 38:var a=r.find(".ui-timepicker-selected");return a.length?a.is(":first-child")||(a.removeClass("ui-timepicker-selected"),a.prev().addClass("ui-timepicker-selected"),a.prev().position().top<a.outerHeight()&&r.scrollTop(r.scrollTop()-a.outerHeight())):(r.find("li").each(function(i,t){return e(t).position().top>0?(a=e(t),!1):void 0}),a.addClass("ui-timepicker-selected")),!1;case 40:return a=r.find(".ui-timepicker-selected"),0===a.length?(r.find("li").each(function(i,t){return e(t).position().top>0?(a=e(t),!1):void 0}),a.addClass("ui-timepicker-selected")):a.is(":last-child")||(a.removeClass("ui-timepicker-selected"),a.next().addClass("ui-timepicker-selected"),a.next().position().top+2*a.outerHeight()>r.outerHeight()&&r.scrollTop(r.scrollTop()+a.outerHeight())),!1;case 27:r.find("li").removeClass("ui-timepicker-selected"),C.hide();break;case 9:C.hide();break;default:return d(i,t)}}function d(e,i){return!i.data("timepicker-settings").disableTextInput||e.ctrlKey||e.altKey||e.metaKey||2!=e.keyCode&&e.keyCode<46}function f(i){var t=e(this),r=t.data("timepicker-list");if(!r||!r.is(":visible"))return!0;switch(i.keyCode){case 96:case 97:case 98:case 99:case 100:case 101:case 102:case 103:case 104:case 105:case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 65:case 77:case 80:case 186:case 8:case 46:c(t,r);break;default:return}}function h(e){var i=e.data("timepicker-settings"),t=e.data("timepicker-list"),r=null,a=t.find(".ui-timepicker-selected");if(a.hasClass("ui-timepicker-disabled"))return!1;if(a.length?r=a.data("time"):u(e)&&(r=v(u(e)),c(e,t)),null!==r){var n=k(r,i.timeFormat);m(e,n,"select")}return!0}function g(e){var i,t=Math.round(e/60);if(Math.abs(t)<60)i=[t,x.mins];else if(60==t)i=["1",x.hr];else{var r=(t/60).toFixed(1);"."!=x.decimal&&(r=r.replace(".",x.decimal)),i=[r,x.hrs]}return i.join(" ")}function k(e,i){if(null!==e){for(var t,r,a=new Date(b.valueOf()+1e3*e),n="",s=0;s<i.length;s++)switch(r=i.charAt(s)){case"a":n+=a.getHours()>11?"pm":"am";break;case"A":n+=a.getHours()>11?"PM":"AM";break;case"g":t=a.getHours()%12,n+=0===t?"12":t;break;case"G":n+=a.getHours();break;case"h":t=a.getHours()%12,0!==t&&10>t&&(t="0"+t),n+=0===t?"12":t;break;case"H":t=a.getHours(),n+=t>9?t:"0"+t;break;case"i":var o=a.getMinutes();n+=o>9?o:"0"+o;break;case"s":e=a.getSeconds(),n+=e>9?e:"0"+e;break;default:n+=r}return n}}function v(e){if(""===e)return null;if(!e||e+0==e)return e;"object"==typeof e&&(e=e.getHours()+":"+T(e.getMinutes())+":"+T(e.getSeconds())),e=e.toLowerCase();{var i;new Date(0)}if(-1===e.indexOf(":")?(i=e.match(/^([0-9]):?([0-5][0-9])?:?([0-5][0-9])?\s*([pa]?)m?$/),i||(i=e.match(/^([0-2][0-9]):?([0-5][0-9])?:?([0-5][0-9])?\s*([pa]?)m?$/))):i=e.match(/^(\d{1,2})(?::([0-5][0-9]))?(?::([0-5][0-9]))?\s*([pa]?)m?$/),!i)return null;var t,r=parseInt(1*i[1],10);t=i[4]?12==r?"p"==i[4]?12:0:r+("p"==i[4]?12:0):r;var a=1*i[2]||0,n=1*i[3]||0;return 3600*t+60*a+n}function T(e){return("0"+e).slice(-2)}var b=r(),y=86400,w={className:null,minTime:null,maxTime:null,durationTime:null,step:30,showDuration:!1,timeFormat:"g:ia",scrollDefaultNow:!1,scrollDefaultTime:!1,selectOnBlur:!1,disableTouchKeyboard:!0,forceRoundTime:!1,appendTo:"body",disableTimeRanges:[],closeOnWindowScroll:!1,disableTextInput:!1},x={decimal:".",mins:"mins",hr:"hr",hrs:"hrs"},C={init:function(t){return this.each(function(){var r=e(this);if("SELECT"==r[0].tagName){for(var a={type:"text",value:r.val()},n=r[0].attributes,s=0;s<n.length;s++)a[n[s].nodeName]=n[s].nodeValue;var o=e("<input />",a);r.replaceWith(o),r=o}var c=e.extend({},w);t&&(c=e.extend(c,t)),c.lang&&(x=e.extend(x,c.lang)),c=i(c),r.data("timepicker-settings",c),r.prop("autocomplete","off"),r.on("click.timepicker focus.timepicker",C.show),r.on("change.timepicker",l),r.on("keydown.timepicker",p),r.on("keyup.timepicker",f),r.addClass("ui-timepicker-input"),l.call(r.get(0))})},show:function(){var i=e(this),r=i.data("timepicker-settings");s(i)&&i.blur();var n=i.data("timepicker-list");if(!i.prop("readonly")&&(n&&0!==n.length&&"function"!=typeof r.durationTime||(t(i),n=i.data("timepicker-list")),!n.is(":visible"))){C.hide(),n.show(),i.offset().top+i.outerHeight(!0)+n.outerHeight()>e(window).height()+e(window).scrollTop()?n.offset({left:i.offset().left+parseInt(n.css("marginLeft").replace("px",""),10),top:i.offset().top-n.outerHeight()+parseInt(n.css("marginTop").replace("px",""),10)}):n.offset({left:i.offset().left+parseInt(n.css("marginLeft").replace("px",""),10),top:i.offset().top+i.outerHeight()+parseInt(n.css("marginTop").replace("px",""),10)});var c=n.find(".ui-timepicker-selected");if(c.length||(u(i)?c=o(i,n,v(u(i))):r.scrollDefaultNow?c=o(i,n,v(new Date)):r.scrollDefaultTime!==!1&&(c=o(i,n,v(r.scrollDefaultTime)))),c&&c.length){var l=n.scrollTop()+c.position().top-c.outerHeight();n.scrollTop(l)}else n.scrollTop(0);a(r),i.trigger("showTimepicker")}},hide:function(){e(".ui-timepicker-wrapper:visible").each(function(){var i=e(this),t=i.data("timepicker-input"),r=t.data("timepicker-settings");r&&r.selectOnBlur&&h(t),i.hide(),t.trigger("hideTimepicker")})},option:function(t,r){var a=this,n=a.data("timepicker-settings"),s=a.data("timepicker-list");if("object"==typeof t)n=e.extend(n,t);else if("string"==typeof t&&"undefined"!=typeof r)n[t]=r;else if("string"==typeof t)return n[t];return n=i(n),a.data("timepicker-settings",n),s&&(s.remove(),a.data("timepicker-list",!1)),a},getSecondsFromMidnight:function(){return v(u(this))},getTime:function(e){var i=this;return e||(e=new Date),e.setHours(0,0,0,0),new Date(e.valueOf()+1e3*v(u(i)))},setTime:function(e){var i=this,t=k(v(e),i.data("timepicker-settings").timeFormat);m(i,t),i.data("timepicker-list")&&c(i,i.data("timepicker-list"))},remove:function(){var e=this;e.hasClass("ui-timepicker-input")&&(e.removeAttr("autocomplete","off"),e.removeClass("ui-timepicker-input"),e.removeData("timepicker-settings"),e.off(".timepicker"),e.data("timepicker-list")&&e.data("timepicker-list").remove(),e.removeData("timepicker-list"))}};e.fn.timepicker=function(i){return C[i]?C[i].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof i&&i?(e.error("Method "+i+" does not exist on jQuery.timepicker"),void 0):C.init.apply(this,arguments)}});
//# sourceMappingURL=jquery-f57aba8f6ca99a3bdcf53973157923c9.js.map