!function(e){var a=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],t=["January","February","March","April","May","June","July","August","September","October","November","December"],u=[];u.Jan="01",u.Feb="02",u.Mar="03",u.Apr="04",u.May="05",u.Jun="06",u.Jul="07",u.Aug="08",u.Sep="09",u.Oct="10",u.Nov="11",u.Dec="12",e.format=function(){function e(e){return a[parseInt(e,10)]||e}function n(e){var a=parseInt(e,10)-1;return r[a]||e}function s(e){var a=parseInt(e,10)-1;return t[a]||e}var o=function(e){return u[e]||e},c=function(e){var a=e,r="";if(-1!==a.indexOf(".")){var t=a.split(".");a=t[0],r=t[1]}var u=a.split(":");return 3===u.length?(hour=u[0],minute=u[1],second=u[2],{time:a,hour:hour,minute:minute,second:second,millis:r}):{time:"",hour:"",minute:"",second:"",millis:""}};return{date:function(a,r){try{var t=null,u=null,y=null,i=null,d=null,l=null;if("number"==typeof a)return this.date(new Date(a),r);if("function"==typeof a.getFullYear)u=a.getFullYear(),y=a.getMonth()+1,i=a.getDate(),d=a.getDay(),l=c(a.toTimeString());else if(-1!=a.search(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?\d{0,3}[-+]?\d{2}:?\d{2}/)){var h=a.split(/[T\+-]/);u=h[0],y=h[1],i=h[2],l=c(h[3].split(".")[0]),t=new Date(u,y-1,i),d=t.getDay()}else{var h=a.split(" ");switch(h.length){case 6:u=h[5],y=o(h[1]),i=h[2],l=c(h[3]),t=new Date(u,y-1,i),d=t.getDay();break;case 2:var f=h[0].split("-");u=f[0],y=f[1],i=f[2],l=c(h[1]),t=new Date(u,y-1,i),d=t.getDay();break;case 7:case 9:case 10:u=h[3],y=o(h[1]),i=h[2],l=c(h[4]),t=new Date(u,y-1,i),d=t.getDay();break;case 1:var f=h[0].split("");u=f[0]+f[1]+f[2]+f[3],y=f[5]+f[6],i=f[8]+f[9],l=c(f[13]+f[14]+f[15]+f[16]+f[17]+f[18]+f[19]+f[20]),t=new Date(u,y-1,i),d=t.getDay();break;default:return a}}for(var b="",m="",g="",k=0;k<r.length;k++){var M=r.charAt(k);switch(b+=M,g="",b){case"ddd":m+=e(d),b="";break;case"dd":if("d"==r.charAt(k+1))break;1===String(i).length&&(i="0"+i),m+=i,b="";break;case"d":if("d"==r.charAt(k+1))break;m+=parseInt(i,10),b="";break;case"MMMM":m+=s(y),b="";break;case"MMM":if("M"===r.charAt(k+1))break;m+=n(y),b="";break;case"MM":if("M"==r.charAt(k+1))break;1===String(y).length&&(y="0"+y),m+=y,b="";break;case"M":if("M"==r.charAt(k+1))break;m+=parseInt(y,10),b="";break;case"yyyy":m+=u,b="";break;case"yy":if("y"==r.charAt(k+1)&&"y"==r.charAt(k+2))break;m+=String(u).slice(-2),b="";break;case"HH":m+=l.hour,b="";break;case"hh":var j=0==l.hour?12:l.hour<13?l.hour:l.hour-12;j=1==String(j).length?"0"+j:j,m+=j,b="";break;case"h":if("h"==r.charAt(k+1))break;var j=0==l.hour?12:l.hour<13?l.hour:l.hour-12;m+=parseInt(j,10),b="";break;case"mm":m+=l.minute,b="";break;case"ss":m+=l.second.substring(0,2),b="";break;case"SSS":m+=l.millis.substring(0,3),b="";break;case"a":m+=l.hour>=12?"PM":"AM",b="";break;case" ":m+=M,b="";break;case"/":m+=M,b="";break;case":":m+=M,b="";break;default:2===b.length&&0!==b.indexOf("y")&&"SS"!=b?(m+=b.substring(0,1),b=b.substring(1,2)):3===b.length&&-1===b.indexOf("yyy")?b="":g=b}}return m+=g}catch(D){throw D}}}}()}(jQuery),jQuery.format.date.defaultShortDateFormat="dd/MM/yyyy",jQuery.format.date.defaultLongDateFormat="dd/MM/yyyy hh:mm:ss",jQuery(document).ready(function(){jQuery(".shortDateFormat").each(function(e,a){jQuery(a).is(":input")?jQuery(a).val(jQuery.format.date(jQuery(a).val(),jQuery.format.date.defaultShortDateFormat)):jQuery(a).text(jQuery.format.date(jQuery(a).text(),jQuery.format.date.defaultShortDateFormat))}),jQuery(".longDateFormat").each(function(e,a){jQuery(a).is(":input")?jQuery(a).val(jQuery.format.date(jQuery(a).val(),jQuery.format.date.defaultLongDateFormat)):jQuery(a).text(jQuery.format.date(jQuery(a).text(),jQuery.format.date.defaultLongDateFormat))})});
//# sourceMappingURL=jquery-aa2a1e1f60b1aaed6d0b2b0e9bd20666.js.map