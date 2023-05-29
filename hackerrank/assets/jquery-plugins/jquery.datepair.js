function parseDate(a,b){if(a=="")return new Date("");b=b||"yyyy-mm-dd";var c=a.match(/(\d+)/g),d=0,e={};return b.replace(/(yyyy|dd?|mm?)/g,function(a){e[a]=d++}),new Date(c[e.yyyy],c[e.mm==undefined?e.m:e.mm]-1,c[e.dd==undefined?e.d:e.dd])}$.fn.extend({datepair:function(a,b,c){function h(){var a=$(this),b=a.find("input.start.date"),c=a.find("input.end.date"),d=0;if(b.length&&c.length){var f=parseDate(b.val(),e),g=parseDate(c.val(),e);d=g.getTime()-f.getTime(),a.data("dateDelta",d)}var h=a.find("input.start.time"),i=a.find("input.end.time");if(h.length&&i.length){var j=h.timepicker("getSecondsFromMidnight"),k=i.timepicker("getSecondsFromMidnight");a.data("timeDelta",k-j),d<864e5&&i.timepicker("option","minTime",j)}}function i(){var a=$(this);if(a.val()=="")return;a.hasClass("date")?j(a,d):a.hasClass("time")&&k(a,d)}function j(a,b){var c=b.find("input.start.date"),d=b.find("input.end.date");if(!c.length||!d.length)return;var f=parseDate(c.val(),e),h=parseDate(d.val(),e),i=b.data("dateDelta");if(!isNaN(i)&&i!==null&&a.hasClass("start")){var j=new Date(f.getTime()+i);d.val(j.format(g)),d.datepicker("update");return}var k=h.getTime()-f.getTime();k<0&&(k=0,a.hasClass("start")?(d.val(c.val()),d.datepicker("update")):a.hasClass("end")&&(c.val(d.val()),c.datepicker("update")));if(k<864e5){var l=b.find("input.start.time").val();l&&b.find("input.end.time").timepicker("option",{minTime:l})}else b.find("input.end.time").timepicker("option",{minTime:null});b.data("dateDelta",k)}function k(a,b){var c=b.find("input.start.time"),d=b.find("input.end.time");if(!c.length)return;var f=c.timepicker("getSecondsFromMidnight"),h=b.data("dateDelta");a.hasClass("start")&&(!h||h<864e5)&&d.timepicker("option","minTime",f);if(!d.length)return;var i=d.timepicker("getSecondsFromMidnight"),j=b.data("timeDelta"),k=0,l;if(j&&a.hasClass("start")){var m=(f+j)%86400;m<0&&(m+=86400),d.timepicker("setTime",m),l=m-f}else if(f!==null&&i!==null)l=i-f;else return;b.data("timeDelta",l),l<0&&(!j||j>0)?k=864e5:l>0&&j<0&&(k=-864e5);var n=b.find(".start.date"),o=b.find(".end.date");n.val()&&!o.val()&&(o.val(n.val()),o.datepicker("update"),h=0,b.data("dateDelta",0));if(k!=0)if(h||h===0){var p=parseDate(o.val(),e),m=new Date(p.getTime()+k);o.val(m.format(g)),o.datepicker("update"),b.data("dateDelta",h+k)}}var d=this,e="yyyy-m-d",f="H:i",g="Y-n-j";typeof c!="undefined"&&typeof c.format!="undefined"&&c.format=="m-d-yyyy"&&(e="m-d-yyyy",f="H:i",g="n-j-Y"),this.find("input.date").each(function(){var a=$(this);a.datepicker({format:e,autoclose:!0}),(a.hasClass("start")||a.hasClass("end"))&&a.on("changeDate change",i)}),this.find("input.time").each(function(){var a=$(this);a.timepicker({showDuration:!0,timeFormat:f,scrollDefaultNow:!0}),(a.hasClass("start")||a.hasClass("end"))&&a.on("changeTime change",i),a.hasClass("end")&&a.on("focus",function(){$(".ui-timepicker-with-duration").scrollTop(0)})}),this.each(h)}}),Date.prototype.format=function(a){var b="",c=Date.replaceChars;for(var d=0;d<a.length;d++){var e=a.charAt(d);c[e]?b+=c[e].call(this):b+=e}return b},Date.replaceChars={shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],longMonths:["January","February","March","April","May","June","July","August","September","October","November","December"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],longDays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],d:function(){return(this.getDate()<10?"0":"")+this.getDate()},D:function(){return Date.replaceChars.shortDays[this.getDay()]},j:function(){return this.getDate()},l:function(){return Date.replaceChars.longDays[this.getDay()]},N:function(){return this.getDay()+1},S:function(){return this.getDate()%10==1&&this.getDate()!=11?"st":this.getDate()%10==2&&this.getDate()!=12?"nd":this.getDate()%10==3&&this.getDate()!=13?"rd":"th"},w:function(){return this.getDay()},z:function(){return"Not Yet Supported"},W:function(){return"Not Yet Supported"},F:function(){return Date.replaceChars.longMonths[this.getMonth()]},m:function(){return(this.getMonth()<9?"0":"")+(this.getMonth()+1)},M:function(){return Date.replaceChars.shortMonths[this.getMonth()]},n:function(){return this.getMonth()+1},t:function(){return"Not Yet Supported"},L:function(){return this.getFullYear()%4==0&&this.getFullYear()%100!=0||this.getFullYear()%400==0?"1":"0"},o:function(){return"Not Supported"},Y:function(){return this.getFullYear()},y:function(){return(""+this.getFullYear()).substr(2)},a:function(){return this.getHours()<12?"am":"pm"},A:function(){return this.getHours()<12?"AM":"PM"},B:function(){return"Not Yet Supported"},g:function(){return this.getHours()%12||12},G:function(){return this.getHours()},h:function(){return((this.getHours()%12||12)<10?"0":"")+(this.getHours()%12||12)},H:function(){return(this.getHours()<10?"0":"")+this.getHours()},i:function(){return(this.getMinutes()<10?"0":"")+this.getMinutes()},s:function(){return(this.getSeconds()<10?"0":"")+this.getSeconds()},e:function(){return"Not Yet Supported"},I:function(){return"Not Supported"},O:function(){return(-this.getTimezoneOffset()<0?"-":"+")+(Math.abs(this.getTimezoneOffset()/60)<10?"0":"")+Math.abs(this.getTimezoneOffset()/60)+"00"},P:function(){return(-this.getTimezoneOffset()<0?"-":"+")+(Math.abs(this.getTimezoneOffset()/60)<10?"0":"")+Math.abs(this.getTimezoneOffset()/60)+":"+(Math.abs(this.getTimezoneOffset()%60)<10?"0":"")+Math.abs(this.getTimezoneOffset()%60)},T:function(){var a=this.getMonth();this.setMonth(0);var b=this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/,"$1");return this.setMonth(a),b},Z:function(){return-this.getTimezoneOffset()*60},c:function(){return this.format("Y-m-d")+"T"+this.format("H:i:sP")},r:function(){return this.toString()},U:function(){return this.getTime()/1e3}}