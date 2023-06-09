var jstz = {};

jstz.HEMISPHERE_SOUTH = "SOUTH", jstz.HEMISPHERE_NORTH = "NORTH", jstz.HEMISPHERE_UNKNOWN = "N/A", 
jstz.olson = {}, jstz.TimeZone = function(offset, olson_tz, uses_dst) {
this.utc_offset = offset, this.olson_tz = olson_tz, this.uses_dst = uses_dst;
}, jstz.TimeZone.prototype.display = function() {
this.ambiguity_check();
var response_text = "<b>UTC-offset</b>: " + this.utc_offset + "<br/>";
return response_text += "<b>Zoneinfo key</b>: " + this.olson_tz + "<br/>", response_text += "<b>Zone uses DST</b>: " + (this.uses_dst ? "yes" :"no") + "<br/>";
}, jstz.TimeZone.prototype.ambiguity_check = function() {
var ambiguity_list, length, i, tz;
if (ambiguity_list = jstz.olson.ambiguity_list[this.olson_tz], "undefined" != typeof ambiguity_list) for (length = ambiguity_list.length, 
i = 0; length > i; i += 1) if (tz = ambiguity_list[i], jstz.date_is_dst(jstz.olson.dst_start_dates[tz])) return this.olson_tz = tz, 
void 0;
}, jstz.date_is_dst = function(date) {
var date_offset, base_offset;
return base_offset = date.getMonth() > 5 ? jstz.get_june_offset() :jstz.get_january_offset(), 
date_offset = jstz.get_date_offset(date), base_offset - date_offset !== 0;
}, jstz.get_date_offset = function(date) {
return -date.getTimezoneOffset();
}, jstz.get_timezone_info = function() {
var january_offset, june_offset, diff;
return january_offset = jstz.get_january_offset(), june_offset = jstz.get_june_offset(), 
diff = january_offset - june_offset, 0 > diff ? {
utc_offset:january_offset,
dst:1,
hemisphere:jstz.HEMISPHERE_NORTH
} :diff > 0 ? {
utc_offset:june_offset,
dst:1,
hemisphere:jstz.HEMISPHERE_SOUTH
} :{
utc_offset:january_offset,
dst:0,
hemisphere:jstz.HEMISPHERE_UNKNOWN
};
}, jstz.get_january_offset = function() {
return jstz.get_date_offset(new Date(2011, 0, 1, 0, 0, 0, 0));
}, jstz.get_june_offset = function() {
return jstz.get_date_offset(new Date(2011, 5, 1, 0, 0, 0, 0));
}, jstz.determine_timezone = function() {
var timezone_key_info, hemisphere_suffix, tz_key;
return timezone_key_info = jstz.get_timezone_info(), hemisphere_suffix = "", timezone_key_info.hemisphere === jstz.HEMISPHERE_SOUTH && (hemisphere_suffix = ",s"), 
tz_key = timezone_key_info.utc_offset + "," + timezone_key_info.dst + hemisphere_suffix, 
{
timezone:jstz.olson.timezones[tz_key],
key:tz_key
};
}, jstz.olson.timezones = {
"-720,0":new jstz.TimeZone("-12:00", "Etc/GMT+12", !1),
"-660,0":new jstz.TimeZone("-11:00", "Pacific/Pago_Pago", !1),
"-600,1":new jstz.TimeZone("-11:00", "America/Adak", !0),
"-660,1,s":new jstz.TimeZone("-11:00", "Pacific/Apia", !0),
"-600,0":new jstz.TimeZone("-10:00", "Pacific/Honolulu", !1),
"-570,0":new jstz.TimeZone("-10:30", "Pacific/Marquesas", !1),
"-540,0":new jstz.TimeZone("-09:00", "Pacific/Gambier", !1),
"-540,1":new jstz.TimeZone("-09:00", "America/Anchorage", !0),
"-480,1":new jstz.TimeZone("-08:00", "America/Los_Angeles", !0),
"-480,0":new jstz.TimeZone("-08:00", "Pacific/Pitcairn", !1),
"-420,0":new jstz.TimeZone("-07:00", "America/Phoenix", !1),
"-420,1":new jstz.TimeZone("-07:00", "America/Denver", !0),
"-360,0":new jstz.TimeZone("-06:00", "America/Guatemala", !1),
"-360,1":new jstz.TimeZone("-06:00", "America/Chicago", !0),
"-360,1,s":new jstz.TimeZone("-06:00", "Pacific/Easter", !0),
"-300,0":new jstz.TimeZone("-05:00", "America/Bogota", !1),
"-300,1":new jstz.TimeZone("-05:00", "America/New_York", !0),
"-270,0":new jstz.TimeZone("-04:30", "America/Caracas", !1),
"-240,1":new jstz.TimeZone("-04:00", "America/Halifax", !0),
"-240,0":new jstz.TimeZone("-04:00", "America/Santo_Domingo", !1),
"-240,1,s":new jstz.TimeZone("-04:00", "America/Asuncion", !0),
"-210,1":new jstz.TimeZone("-03:30", "America/St_Johns", !0),
"-180,1":new jstz.TimeZone("-03:00", "America/Godthab", !0),
"-180,0":new jstz.TimeZone("-03:00", "America/Argentina/Buenos_Aires", !1),
"-180,1,s":new jstz.TimeZone("-03:00", "America/Montevideo", !0),
"-120,0":new jstz.TimeZone("-02:00", "America/Noronha", !1),
"-120,1":new jstz.TimeZone("-02:00", "Etc/GMT+2", !0),
"-60,1":new jstz.TimeZone("-01:00", "Atlantic/Azores", !0),
"-60,0":new jstz.TimeZone("-01:00", "Atlantic/Cape_Verde", !1),
"0,0":new jstz.TimeZone("00:00", "Etc/UTC", !1),
"0,1":new jstz.TimeZone("00:00", "Europe/London", !0),
"60,1":new jstz.TimeZone("+01:00", "Europe/Berlin", !0),
"60,0":new jstz.TimeZone("+01:00", "Africa/Lagos", !1),
"60,1,s":new jstz.TimeZone("+01:00", "Africa/Windhoek", !0),
"120,1":new jstz.TimeZone("+02:00", "Asia/Beirut", !0),
"120,0":new jstz.TimeZone("+02:00", "Africa/Johannesburg", !1),
"180,1":new jstz.TimeZone("+03:00", "Europe/Moscow", !0),
"180,0":new jstz.TimeZone("+03:00", "Asia/Baghdad", !1),
"210,1":new jstz.TimeZone("+03:30", "Asia/Tehran", !0),
"240,0":new jstz.TimeZone("+04:00", "Asia/Dubai", !1),
"240,1":new jstz.TimeZone("+04:00", "Asia/Yerevan", !0),
"270,0":new jstz.TimeZone("+04:30", "Asia/Kabul", !1),
"300,1":new jstz.TimeZone("+05:00", "Asia/Yekaterinburg", !0),
"300,0":new jstz.TimeZone("+05:00", "Asia/Karachi", !1),
"330,0":new jstz.TimeZone("+05:30", "Asia/Kolkata", !1),
"345,0":new jstz.TimeZone("+05:45", "Asia/Kathmandu", !1),
"360,0":new jstz.TimeZone("+06:00", "Asia/Dhaka", !1),
"360,1":new jstz.TimeZone("+06:00", "Asia/Omsk", !0),
"390,0":new jstz.TimeZone("+06:30", "Asia/Rangoon", !1),
"420,1":new jstz.TimeZone("+07:00", "Asia/Krasnoyarsk", !0),
"420,0":new jstz.TimeZone("+07:00", "Asia/Jakarta", !1),
"480,0":new jstz.TimeZone("+08:00", "Asia/Shanghai", !1),
"480,1":new jstz.TimeZone("+08:00", "Asia/Irkutsk", !0),
"525,0":new jstz.TimeZone("+08:45", "Australia/Eucla", !0),
"525,1,s":new jstz.TimeZone("+08:45", "Australia/Eucla", !0),
"540,1":new jstz.TimeZone("+09:00", "Asia/Yakutsk", !0),
"540,0":new jstz.TimeZone("+09:00", "Asia/Tokyo", !1),
"570,0":new jstz.TimeZone("+09:30", "Australia/Darwin", !1),
"570,1,s":new jstz.TimeZone("+09:30", "Australia/Adelaide", !0),
"600,0":new jstz.TimeZone("+10:00", "Australia/Brisbane", !1),
"600,1":new jstz.TimeZone("+10:00", "Asia/Vladivostok", !0),
"600,1,s":new jstz.TimeZone("+10:00", "Australia/Sydney", !0),
"630,1,s":new jstz.TimeZone("+10:30", "Australia/Lord_Howe", !0),
"660,1":new jstz.TimeZone("+11:00", "Asia/Kamchatka", !0),
"660,0":new jstz.TimeZone("+11:00", "Pacific/Noumea", !1),
"690,0":new jstz.TimeZone("+11:30", "Pacific/Norfolk", !1),
"720,1,s":new jstz.TimeZone("+12:00", "Pacific/Auckland", !0),
"720,0":new jstz.TimeZone("+12:00", "Pacific/Tarawa", !1),
"765,1,s":new jstz.TimeZone("+12:45", "Pacific/Chatham", !0),
"780,0":new jstz.TimeZone("+13:00", "Pacific/Tongatapu", !1),
"840,0":new jstz.TimeZone("+14:00", "Pacific/Kiritimati", !1)
}, jstz.olson.dst_start_dates = {
"America/Denver":new Date(2011, 2, 13, 3, 0, 0, 0),
"America/Mazatlan":new Date(2011, 3, 3, 3, 0, 0, 0),
"America/Chicago":new Date(2011, 2, 13, 3, 0, 0, 0),
"America/Mexico_City":new Date(2011, 3, 3, 3, 0, 0, 0),
"Atlantic/Stanley":new Date(2011, 8, 4, 7, 0, 0, 0),
"America/Asuncion":new Date(2011, 9, 2, 3, 0, 0, 0),
"America/Santiago":new Date(2011, 9, 9, 3, 0, 0, 0),
"America/Campo_Grande":new Date(2011, 9, 16, 5, 0, 0, 0),
"America/Montevideo":new Date(2011, 9, 2, 3, 0, 0, 0),
"America/Sao_Paulo":new Date(2011, 9, 16, 5, 0, 0, 0),
"America/Los_Angeles":new Date(2011, 2, 13, 8, 0, 0, 0),
"America/Santa_Isabel":new Date(2011, 3, 5, 8, 0, 0, 0),
"America/Havana":new Date(2011, 2, 13, 2, 0, 0, 0),
"America/New_York":new Date(2011, 2, 13, 7, 0, 0, 0),
"Asia/Gaza":new Date(2011, 2, 26, 23, 0, 0, 0),
"Asia/Beirut":new Date(2011, 2, 27, 1, 0, 0, 0),
"Europe/Minsk":new Date(2011, 2, 27, 3, 0, 0, 0),
"Europe/Istanbul":new Date(2011, 2, 27, 7, 0, 0, 0),
"Asia/Damascus":new Date(2011, 3, 1, 2, 0, 0, 0),
"Asia/Jerusalem":new Date(2011, 3, 1, 6, 0, 0, 0),
"Africa/Cairo":new Date(2011, 3, 29, 4, 0, 0, 0),
"Asia/Yerevan":new Date(2011, 2, 27, 4, 0, 0, 0),
"Asia/Baku":new Date(2011, 2, 27, 8, 0, 0, 0),
"Pacific/Auckland":new Date(2011, 8, 26, 7, 0, 0, 0),
"Pacific/Fiji":new Date(2010, 11, 29, 23, 0, 0, 0),
"America/Halifax":new Date(2011, 2, 13, 6, 0, 0, 0),
"America/Goose_Bay":new Date(2011, 2, 13, 2, 1, 0, 0),
"America/Miquelon":new Date(2011, 2, 13, 5, 0, 0, 0),
"America/Godthab":new Date(2011, 2, 27, 1, 0, 0, 0)
}, jstz.olson.ambiguity_list = {
"America/Denver":[ "America/Denver", "America/Mazatlan" ],
"America/Chicago":[ "America/Chicago", "America/Mexico_City" ],
"America/Asuncion":[ "Atlantic/Stanley", "America/Asuncion", "America/Santiago", "America/Campo_Grande" ],
"America/Montevideo":[ "America/Montevideo", "America/Sao_Paulo" ],
"Asia/Beirut":[ "Asia/Gaza", "Asia/Beirut", "Europe/Minsk", "Europe/Istanbul", "Asia/Damascus", "Asia/Jerusalem", "Africa/Cairo" ],
"Asia/Yerevan":[ "Asia/Yerevan", "Asia/Baku" ],
"Pacific/Auckland":[ "Pacific/Auckland", "Pacific/Fiji" ],
"America/Los_Angeles":[ "America/Los_Angeles", "America/Santa_Isabel" ],
"America/New_York":[ "America/Havana", "America/New_York" ],
"America/Halifax":[ "America/Goose_Bay", "America/Halifax" ],
"America/Godthab":[ "America/Miquelon", "America/Godthab" ]
};