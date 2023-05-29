!function(jQuery) {
var daysInWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ], shortMonthsInYear = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ], longMonthsInYear = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ], shortMonthsToNumber = [];
shortMonthsToNumber.Jan = "01", shortMonthsToNumber.Feb = "02", shortMonthsToNumber.Mar = "03", 
shortMonthsToNumber.Apr = "04", shortMonthsToNumber.May = "05", shortMonthsToNumber.Jun = "06", 
shortMonthsToNumber.Jul = "07", shortMonthsToNumber.Aug = "08", shortMonthsToNumber.Sep = "09", 
shortMonthsToNumber.Oct = "10", shortMonthsToNumber.Nov = "11", shortMonthsToNumber.Dec = "12", 
jQuery.format = function() {
function strDay(value) {
return daysInWeek[parseInt(value, 10)] || value;
}
function strMonth(value) {
var monthArrayIndex = parseInt(value, 10) - 1;
return shortMonthsInYear[monthArrayIndex] || value;
}
function strLongMonth(value) {
var monthArrayIndex = parseInt(value, 10) - 1;
return longMonthsInYear[monthArrayIndex] || value;
}
var parseMonth = function(value) {
return shortMonthsToNumber[value] || value;
}, parseTime = function(value) {
var retValue = value, millis = "";
if (-1 !== retValue.indexOf(".")) {
var delimited = retValue.split(".");
retValue = delimited[0], millis = delimited[1];
}
var values3 = retValue.split(":");
return 3 === values3.length ? (hour = values3[0], minute = values3[1], second = values3[2], 
{
time:retValue,
hour:hour,
minute:minute,
second:second,
millis:millis
}) :{
time:"",
hour:"",
minute:"",
second:"",
millis:""
};
};
return {
date:function(value, format) {
try {
var date = null, year = null, month = null, dayOfMonth = null, dayOfWeek = null, time = null;
if ("number" == typeof value) return this.date(new Date(value), format);
if ("function" == typeof value.getFullYear) year = value.getFullYear(), month = value.getMonth() + 1, 
dayOfMonth = value.getDate(), dayOfWeek = value.getDay(), time = parseTime(value.toTimeString()); else if (-1 != value.search(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?\d{0,3}[-+]?\d{2}:?\d{2}/)) {
var values = value.split(/[T\+-]/);
year = values[0], month = values[1], dayOfMonth = values[2], time = parseTime(values[3].split(".")[0]), 
date = new Date(year, month - 1, dayOfMonth), dayOfWeek = date.getDay();
} else {
var values = value.split(" ");
switch (values.length) {
case 6:
year = values[5], month = parseMonth(values[1]), dayOfMonth = values[2], time = parseTime(values[3]), 
date = new Date(year, month - 1, dayOfMonth), dayOfWeek = date.getDay();
break;

case 2:
var values2 = values[0].split("-");
year = values2[0], month = values2[1], dayOfMonth = values2[2], time = parseTime(values[1]), 
date = new Date(year, month - 1, dayOfMonth), dayOfWeek = date.getDay();
break;

case 7:
case 9:
case 10:
year = values[3], month = parseMonth(values[1]), dayOfMonth = values[2], time = parseTime(values[4]), 
date = new Date(year, month - 1, dayOfMonth), dayOfWeek = date.getDay();
break;

case 1:
var values2 = values[0].split("");
year = values2[0] + values2[1] + values2[2] + values2[3], month = values2[5] + values2[6], 
dayOfMonth = values2[8] + values2[9], time = parseTime(values2[13] + values2[14] + values2[15] + values2[16] + values2[17] + values2[18] + values2[19] + values2[20]), 
date = new Date(year, month - 1, dayOfMonth), dayOfWeek = date.getDay();
break;

default:
return value;
}
}
for (var pattern = "", retValue = "", unparsedRest = "", i = 0; i < format.length; i++) {
var currentPattern = format.charAt(i);
switch (pattern += currentPattern, unparsedRest = "", pattern) {
case "ddd":
retValue += strDay(dayOfWeek), pattern = "";
break;

case "dd":
if ("d" == format.charAt(i + 1)) break;
1 === String(dayOfMonth).length && (dayOfMonth = "0" + dayOfMonth), retValue += dayOfMonth, 
pattern = "";
break;

case "d":
if ("d" == format.charAt(i + 1)) break;
retValue += parseInt(dayOfMonth, 10), pattern = "";
break;

case "MMMM":
retValue += strLongMonth(month), pattern = "";
break;

case "MMM":
if ("M" === format.charAt(i + 1)) break;
retValue += strMonth(month), pattern = "";
break;

case "MM":
if ("M" == format.charAt(i + 1)) break;
1 === String(month).length && (month = "0" + month), retValue += month, pattern = "";
break;

case "M":
if ("M" == format.charAt(i + 1)) break;
retValue += parseInt(month, 10), pattern = "";
break;

case "yyyy":
retValue += year, pattern = "";
break;

case "yy":
if ("y" == format.charAt(i + 1) && "y" == format.charAt(i + 2)) break;
retValue += String(year).slice(-2), pattern = "";
break;

case "HH":
retValue += time.hour, pattern = "";
break;

case "hh":
var hour = 0 == time.hour ? 12 :time.hour < 13 ? time.hour :time.hour - 12;
hour = 1 == String(hour).length ? "0" + hour :hour, retValue += hour, pattern = "";
break;

case "h":
if ("h" == format.charAt(i + 1)) break;
var hour = 0 == time.hour ? 12 :time.hour < 13 ? time.hour :time.hour - 12;
retValue += parseInt(hour, 10), pattern = "";
break;

case "mm":
retValue += time.minute, pattern = "";
break;

case "ss":
retValue += time.second.substring(0, 2), pattern = "";
break;

case "SSS":
retValue += time.millis.substring(0, 3), pattern = "";
break;

case "a":
retValue += time.hour >= 12 ? "PM" :"AM", pattern = "";
break;

case " ":
retValue += currentPattern, pattern = "";
break;

case "/":
retValue += currentPattern, pattern = "";
break;

case ":":
retValue += currentPattern, pattern = "";
break;

default:
2 === pattern.length && 0 !== pattern.indexOf("y") && "SS" != pattern ? (retValue += pattern.substring(0, 1), 
pattern = pattern.substring(1, 2)) :3 === pattern.length && -1 === pattern.indexOf("yyy") ? pattern = "" :unparsedRest = pattern;
}
}
return retValue += unparsedRest;
} catch (e) {
throw e;
}
}
};
}();
}(jQuery), jQuery.format.date.defaultShortDateFormat = "dd/MM/yyyy", jQuery.format.date.defaultLongDateFormat = "dd/MM/yyyy hh:mm:ss", 
jQuery(document).ready(function() {
jQuery(".shortDateFormat").each(function(idx, elem) {
jQuery(elem).is(":input") ? jQuery(elem).val(jQuery.format.date(jQuery(elem).val(), jQuery.format.date.defaultShortDateFormat)) :jQuery(elem).text(jQuery.format.date(jQuery(elem).text(), jQuery.format.date.defaultShortDateFormat));
}), jQuery(".longDateFormat").each(function(idx, elem) {
jQuery(elem).is(":input") ? jQuery(elem).val(jQuery.format.date(jQuery(elem).val(), jQuery.format.date.defaultLongDateFormat)) :jQuery(elem).text(jQuery.format.date(jQuery(elem).text(), jQuery.format.date.defaultLongDateFormat));
});
});