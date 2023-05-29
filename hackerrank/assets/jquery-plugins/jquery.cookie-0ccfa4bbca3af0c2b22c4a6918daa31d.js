/*!
 * jQuery Cookie Plugin v1.3
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function(a,b,c){function e(a){return a}function f(a){return decodeURIComponent(a.replace(d," "))}var d=/\+/g,g=a.cookie=function(d,h,i){if(h!==c){i=a.extend({},g.defaults,i),h===null&&(i.expires=-1);if(typeof i.expires=="number"){var j=i.expires,k=i.expires=new Date;k.setDate(k.getDate()+j)}return h=g.json?JSON.stringify(h):String(h),b.cookie=[encodeURIComponent(d),"=",g.raw?h:encodeURIComponent(h),i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}var l=g.raw?e:f,m=b.cookie.split("; ");for(var n=0,o=m.length;n<o;n++){var p=m[n].split("=");if(l(p.shift())===d){var q=l(p.join("="));return g.json?JSON.parse(q):q}}return null};g.defaults={},a.removeCookie=function(b,c){return a.cookie(b)!==null?(a.cookie(b,null,c),!0):!1}})(jQuery,document)