/*
 *
 * Copyright (c) 2010 C. F., Wong (<a href="http://cloudgen.w0ng.hk">Cloudgen Examplet Store</a>)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
!function(e,t,r,a){e.fn.caret=function(n,s){var i,o,l=this[0],c=e.browser.msie;if("object"==typeof n&&"number"==typeof n.start&&"number"==typeof n.end)i=n.start,o=n.end;else if("number"==typeof n&&"number"==typeof s)i=n,o=s;else if("string"==typeof n)(i=l.value.indexOf(n))>-1?o=i+n[t]:i=null;else if("[object RegExp]"===Object.prototype.toString.call(n)){var u=n.exec(l.value);null!=u&&(i=u.index,o=i+u[0][t])}if("undefined"!=typeof i){if(c){var f=this[0].createTextRange();f.collapse(!0),f.moveStart("character",i),f.moveEnd("character",o-i),f.select()}else this[0].selectionStart=i,this[0].selectionEnd=o;return this[0].focus(),this}if(c){var v=document.selection;if("textarea"!=this[0].tagName.toLowerCase()){var d=this.val(),x=v[r]()[a]();x.moveEnd("character",d[t]);var h=""==x.text?d[t]:d.lastIndexOf(x.text);x=v[r]()[a](),x.moveStart("character",-d[t]);var m=x.text[t]}else{var x=v[r](),p=x[a]();p.moveToElementText(this[0]),p.setEndPoint("EndToEnd",x);var h=p.text[t]-x.text[t],m=h+x.text[t]}}else var h=l.selectionStart,m=l.selectionEnd;var b=l.value.substring(h,m);return{start:h,end:m,text:b,replace:function(e){return l.value.substring(0,h)+e+l.value.substring(m,l.value[t])}}}}(jQuery,"length","createRange","duplicate");
//# sourceMappingURL=jquery-672ff90f9f5066ae7fd60b362f097e2a.js.map