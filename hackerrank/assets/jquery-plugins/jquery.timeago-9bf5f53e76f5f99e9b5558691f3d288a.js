/**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 0.11.4
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2012, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
 */
(function(a){function c(){var b=d(this);return isNaN(b.datetime)||a(this).text(e(b.datetime)),this}function d(c){c=a(c);if(!c.data("timeago")){c.data("timeago",{datetime:b.datetime(c)});var d=a.trim(c.text());d.length>0&&(!b.isTime(c)||!c.attr("title"))&&c.attr("title",d)}return c.data("timeago")}function e(a){return b.inWords(f(a))}function f(a){return(new Date).getTime()-a.getTime()}a.timeago=function(b){return b instanceof Date?e(b):typeof b=="string"?e(a.timeago.parse(b)):typeof b=="number"?e(new Date(b)):e(a.timeago.datetime(b))};var b=a.timeago;a.extend(a.timeago,{settings:{refreshMillis:6e4,allowFuture:!1,strings:{prefixAgo:null,prefixFromNow:null,suffixAgo:"ago",suffixFromNow:"from now",seconds:"less than a minute",minute:"about a minute",minutes:"%d minutes",hour:"about an hour",hours:"about %d hours",day:"a day",days:"%d days",month:"about a month",months:"%d months",year:"about a year",years:"%d years",wordSeparator:" ",numbers:[]}},inWords:function(b){function k(d,e){var f=a.isFunction(d)?d(e,b):d,g=c.numbers&&c.numbers[e]||e;return f.replace(/%d/i,g)}var c=this.settings.strings,d=c.prefixAgo,e=c.suffixAgo;this.settings.allowFuture&&b<0&&(d=c.prefixFromNow,e=c.suffixFromNow);var f=Math.abs(b)/1e3,g=f/60,h=g/60,i=h/24,j=i/365,l=f<45&&k(c.seconds,Math.round(f))||f<90&&k(c.minute,1)||g<45&&k(c.minutes,Math.round(g))||g<90&&k(c.hour,1)||h<24&&k(c.hours,Math.round(h))||h<42&&k(c.day,1)||i<30&&k(c.days,Math.round(i))||i<45&&k(c.month,1)||i<365&&k(c.months,Math.round(i/30))||j<1.5&&k(c.year,1)||k(c.years,Math.round(j)),m=c.wordSeparator===undefined?" ":c.wordSeparator;return a.trim([d,l,e].join(m))},parse:function(b){var c=a.trim(b);return c=c.replace(/\.\d+/,""),c=c.replace(/-/,"/").replace(/-/,"/"),c=c.replace(/T/," ").replace(/Z/," UTC"),c=c.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"),new Date(c)},datetime:function(c){var d=b.isTime(c)?a(c).attr("datetime"):a(c).attr("title");return b.parse(d)},isTime:function(b){return a(b).get(0).tagName.toLowerCase()==="time"}}),a.fn.timeago=function(){var a=this;a.each(c);var d=b.settings;return d.refreshMillis>0&&setInterval(function(){a.each(c)},d.refreshMillis),a},document.createElement("abbr"),document.createElement("time")})(jQuery)