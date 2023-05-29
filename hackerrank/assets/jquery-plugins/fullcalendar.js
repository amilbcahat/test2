/**
 * @preserve
 * FullCalendar v1.5.4
 * http://arshaw.com/fullcalendar/
 *
 * Use fullcalendar.css for basic styling.
 * For event drag & drop, requires jQuery UI draggable.
 * For event resizing, requires jQuery UI resizable.
 *
 * Copyright (c) 2011 Adam Shaw
 * Dual licensed under the MIT and GPL licenses, located in
 * MIT-LICENSE.txt and GPL-LICENSE.txt respectively.
 *
 * Date: Tue Sep 4 23:38:33 2012 -0700
 *
 */
!function($, undefined) {
function setDefaults(d) {
$.extend(!0, defaults, d);
}
function Calendar(element, options, eventSources) {
function render(inc) {
content ? (calcSize(), markSizesDirty(), markEventsDirty(), renderView(inc)) :initialRender();
}
function initialRender() {
tm = options.theme ? "ui" :"fc", element.addClass("fc"), options.isRTL && element.addClass("fc-rtl"), 
options.theme && element.addClass("ui-widget"), content = $("<div class='fc-content' style='position:relative'/>").prependTo(element), 
header = new Header(t, options), headerElement = header.render(), headerElement && element.prepend(headerElement), 
changeView(options.defaultView), $(window).resize(windowResize), bodyVisible() || lateRender();
}
function lateRender() {
setTimeout(function() {
!currentView.start && bodyVisible() && renderView();
}, 0);
}
function destroy() {
$(window).unbind("resize", windowResize), header.destroy(), content.remove(), element.removeClass("fc fc-rtl ui-widget");
}
function elementVisible() {
return 0 !== _element.offsetWidth;
}
function bodyVisible() {
return 0 !== $("body")[0].offsetWidth;
}
function changeView(newViewName) {
if (!currentView || newViewName != currentView.name) {
ignoreWindowResize++, unselect();
var newViewElement, oldView = currentView;
oldView ? ((oldView.beforeHide || noop)(), setMinHeight(content, content.height()), 
oldView.element.hide()) :setMinHeight(content, 1), content.css("overflow", "hidden"), 
currentView = viewInstances[newViewName], currentView ? currentView.element.show() :currentView = viewInstances[newViewName] = new fcViews[newViewName](newViewElement = absoluteViewElement = $("<div class='fc-view fc-view-" + newViewName + "' style='position:absolute'/>").appendTo(content), t), 
oldView && header.deactivateButton(oldView.name), header.activateButton(newViewName), 
renderView(), content.css("overflow", ""), oldView && setMinHeight(content, 1), 
newViewElement || (currentView.afterShow || noop)(), ignoreWindowResize--;
}
}
function renderView(inc) {
if (elementVisible()) {
ignoreWindowResize++, unselect(), suggestedViewHeight === undefined && calcSize();
var forceEventRender = !1;
!currentView.start || inc || date < currentView.start || date >= currentView.end ? (currentView.render(date, inc || 0), 
setSize(!0), forceEventRender = !0) :currentView.sizeDirty ? (currentView.clearEvents(), 
setSize(), forceEventRender = !0) :currentView.eventsDirty && (currentView.clearEvents(), 
forceEventRender = !0), currentView.sizeDirty = !1, currentView.eventsDirty = !1, 
updateEvents(forceEventRender), elementOuterWidth = element.outerWidth(), header.updateTitle(currentView.title);
var today = new Date();
today >= currentView.start && today < currentView.end ? header.disableButton("today") :header.enableButton("today"), 
ignoreWindowResize--, currentView.trigger("viewDisplay", _element);
}
}
function updateSize() {
markSizesDirty(), elementVisible() && (calcSize(), setSize(), unselect(), currentView.clearEvents(), 
currentView.renderEvents(events), currentView.sizeDirty = !1);
}
function markSizesDirty() {
$.each(viewInstances, function(i, inst) {
inst.sizeDirty = !0;
});
}
function calcSize() {
suggestedViewHeight = options.contentHeight ? options.contentHeight :options.height ? options.height - (headerElement ? headerElement.height() :0) - vsides(content) :Math.round(content.width() / Math.max(options.aspectRatio, .5));
}
function setSize(dateChanged) {
ignoreWindowResize++, currentView.setHeight(suggestedViewHeight, dateChanged), absoluteViewElement && (absoluteViewElement.css("position", "relative"), 
absoluteViewElement = null), currentView.setWidth(content.width(), dateChanged), 
ignoreWindowResize--;
}
function windowResize() {
if (!ignoreWindowResize) if (currentView.start) {
var uid = ++resizeUID;
setTimeout(function() {
uid == resizeUID && !ignoreWindowResize && elementVisible() && elementOuterWidth != (elementOuterWidth = element.outerWidth()) && (ignoreWindowResize++, 
updateSize(), currentView.trigger("windowResize", _element), ignoreWindowResize--);
}, 200);
} else lateRender();
}
function updateEvents(forceRender) {
!options.lazyFetching || isFetchNeeded(currentView.visStart, currentView.visEnd) ? refetchEvents() :forceRender && rerenderEvents();
}
function refetchEvents() {
fetchEvents(currentView.visStart, currentView.visEnd);
}
function reportEvents(_events) {
events = _events, rerenderEvents();
}
function reportEventChange(eventID) {
rerenderEvents(eventID);
}
function rerenderEvents(modifiedEventID) {
markEventsDirty(), elementVisible() && (currentView.clearEvents(), currentView.renderEvents(events, modifiedEventID), 
currentView.eventsDirty = !1);
}
function markEventsDirty() {
$.each(viewInstances, function(i, inst) {
inst.eventsDirty = !0;
});
}
function select(start, end, allDay) {
currentView.select(start, end, allDay === undefined ? !0 :allDay);
}
function unselect() {
currentView && currentView.unselect();
}
function prev() {
renderView(-1);
}
function next() {
renderView(1);
}
function prevYear() {
addYears(date, -1), renderView();
}
function nextYear() {
addYears(date, 1), renderView();
}
function today() {
date = new Date(), renderView();
}
function gotoDate(year, month, dateOfMonth) {
year instanceof Date ? date = cloneDate(year) :setYMD(date, year, month, dateOfMonth), 
renderView();
}
function incrementDate(years, months, days) {
years !== undefined && addYears(date, years), months !== undefined && addMonths(date, months), 
days !== undefined && addDays(date, days), renderView();
}
function getDate() {
return cloneDate(date);
}
function getView() {
return currentView;
}
function option(name, value) {
return value === undefined ? options[name] :(("height" == name || "contentHeight" == name || "aspectRatio" == name) && (options[name] = value, 
updateSize()), void 0);
}
function trigger(name, thisObj) {
return options[name] ? options[name].apply(thisObj || _element, Array.prototype.slice.call(arguments, 2)) :void 0;
}
var t = this;
t.options = options, t.render = render, t.destroy = destroy, t.refetchEvents = refetchEvents, 
t.reportEvents = reportEvents, t.reportEventChange = reportEventChange, t.rerenderEvents = rerenderEvents, 
t.changeView = changeView, t.select = select, t.unselect = unselect, t.prev = prev, 
t.next = next, t.prevYear = prevYear, t.nextYear = nextYear, t.today = today, t.gotoDate = gotoDate, 
t.incrementDate = incrementDate, t.formatDate = function(format, date) {
return formatDate(format, date, options);
}, t.formatDates = function(format, date1, date2) {
return formatDates(format, date1, date2, options);
}, t.getDate = getDate, t.getView = getView, t.option = option, t.trigger = trigger, 
EventManager.call(t, options, eventSources);
var header, headerElement, content, tm, currentView, elementOuterWidth, suggestedViewHeight, absoluteViewElement, _dragElement, isFetchNeeded = t.isFetchNeeded, fetchEvents = t.fetchEvents, _element = element[0], viewInstances = {}, resizeUID = 0, ignoreWindowResize = 0, date = new Date(), events = [];
setYMD(date, options.year, options.month, options.date), options.droppable && $(document).bind("dragstart", function(ev, ui) {
var _e = ev.target, e = $(_e);
if (!e.parents(".fc").length) {
var accept = options.dropAccept;
($.isFunction(accept) ? accept.call(_e, e) :e.is(accept)) && (_dragElement = _e, 
currentView.dragStart(_dragElement, ev, ui));
}
}).bind("dragstop", function(ev, ui) {
_dragElement && (currentView.dragStop(_dragElement, ev, ui), _dragElement = null);
});
}
function Header(calendar, options) {
function render() {
tm = options.theme ? "ui" :"fc";
var sections = options.header;
return sections ? element = $("<table class='fc-header' style='width:100%'/>").append($("<tr/>").append(renderSection("left")).append(renderSection("center")).append(renderSection("right"))) :void 0;
}
function destroy() {
element.remove();
}
function renderSection(position) {
var e = $("<td class='fc-header-" + position + "'/>"), buttonStr = options.header[position];
return buttonStr && $.each(buttonStr.split(" "), function(i) {
i > 0 && e.append("<span class='fc-header-space'/>");
var prevButton;
$.each(this.split(","), function(j, buttonName) {
if ("title" == buttonName) e.append("<span class='fc-header-title'><h2>&nbsp;</h2></span>"), 
prevButton && prevButton.addClass(tm + "-corner-right"), prevButton = null; else {
var buttonClick;
if (calendar[buttonName] ? buttonClick = calendar[buttonName] :fcViews[buttonName] && (buttonClick = function() {
button.removeClass(tm + "-state-hover"), calendar.changeView(buttonName);
}), buttonClick) {
var icon = options.theme ? smartProperty(options.buttonIcons, buttonName) :null, text = smartProperty(options.buttonText, buttonName), button = $("<span class='fc-button fc-button-" + buttonName + " " + tm + "-state-default'><span class='fc-button-inner'><span class='fc-button-content'>" + (icon ? "<span class='fc-icon-wrap'><span class='ui-icon ui-icon-" + icon + "'/></span>" :text) + "</span><span class='fc-button-effect'><span></span></span></span></span>");
button && (button.click(function() {
button.hasClass(tm + "-state-disabled") || buttonClick();
}).mousedown(function() {
button.not("." + tm + "-state-active").not("." + tm + "-state-disabled").addClass(tm + "-state-down");
}).mouseup(function() {
button.removeClass(tm + "-state-down");
}).hover(function() {
button.not("." + tm + "-state-active").not("." + tm + "-state-disabled").addClass(tm + "-state-hover");
}, function() {
button.removeClass(tm + "-state-hover").removeClass(tm + "-state-down");
}).appendTo(e), prevButton || button.addClass(tm + "-corner-left"), prevButton = button);
}
}
}), prevButton && prevButton.addClass(tm + "-corner-right");
}), e;
}
function updateTitle(html) {
element.find("h2").html(html);
}
function activateButton(buttonName) {
element.find("span.fc-button-" + buttonName).addClass(tm + "-state-active");
}
function deactivateButton(buttonName) {
element.find("span.fc-button-" + buttonName).removeClass(tm + "-state-active");
}
function disableButton(buttonName) {
element.find("span.fc-button-" + buttonName).addClass(tm + "-state-disabled");
}
function enableButton(buttonName) {
element.find("span.fc-button-" + buttonName).removeClass(tm + "-state-disabled");
}
var t = this;
t.render = render, t.destroy = destroy, t.updateTitle = updateTitle, t.activateButton = activateButton, 
t.deactivateButton = deactivateButton, t.disableButton = disableButton, t.enableButton = enableButton;
var tm, element = $([]);
}
function EventManager(options, _sources) {
function isFetchNeeded(start, end) {
return !rangeStart || rangeStart > start || end > rangeEnd;
}
function fetchEvents(start, end) {
rangeStart = start, rangeEnd = end, cache = [];
var fetchID = ++currentFetchID, len = sources.length;
pendingSourceCnt = len;
for (var i = 0; len > i; i++) fetchEventSource(sources[i], fetchID);
}
function fetchEventSource(source, fetchID) {
_fetchEventSource(source, function(events) {
if (fetchID == currentFetchID) {
if (events) {
for (var i = 0; i < events.length; i++) events[i].source = source, normalizeEvent(events[i]);
cache = cache.concat(events);
}
pendingSourceCnt--, pendingSourceCnt || reportEvents(cache);
}
});
}
function _fetchEventSource(source, callback) {
var i, res, fetchers = fc.sourceFetchers;
for (i = 0; i < fetchers.length; i++) {
if (res = fetchers[i](source, rangeStart, rangeEnd, callback), res === !0) return;
if ("object" == typeof res) return _fetchEventSource(res, callback), void 0;
}
var events = source.events;
if (events) $.isFunction(events) ? (pushLoading(), events(cloneDate(rangeStart), cloneDate(rangeEnd), function(events) {
callback(events), popLoading();
})) :$.isArray(events) ? callback(events) :callback(); else {
var url = source.url;
if (url) {
var success = source.success, error = source.error, complete = source.complete, data = $.extend({}, source.data || {}), startParam = firstDefined(source.startParam, options.startParam), endParam = firstDefined(source.endParam, options.endParam);
startParam && (data[startParam] = Math.round(+rangeStart / 1e3)), endParam && (data[endParam] = Math.round(+rangeEnd / 1e3)), 
pushLoading(), $.ajax($.extend({}, ajaxDefaults, source, {
data:data,
success:function(events) {
events = events || [];
var res = applyAll(success, this, arguments);
$.isArray(res) && (events = res), callback(events);
},
error:function() {
applyAll(error, this, arguments), callback();
},
complete:function() {
applyAll(complete, this, arguments), popLoading();
}
}));
} else callback();
}
}
function addEventSource(source) {
source = _addEventSource(source), source && (pendingSourceCnt++, fetchEventSource(source, currentFetchID));
}
function _addEventSource(source) {
return $.isFunction(source) || $.isArray(source) ? source = {
events:source
} :"string" == typeof source && (source = {
url:source
}), "object" == typeof source ? (normalizeSource(source), sources.push(source), 
source) :void 0;
}
function removeEventSource(source) {
sources = $.grep(sources, function(src) {
return !isSourcesEqual(src, source);
}), cache = $.grep(cache, function(e) {
return !isSourcesEqual(e.source, source);
}), reportEvents(cache);
}
function updateEvent(event) {
var i, e, len = cache.length, defaultEventEnd = getView().defaultEventEnd, startDelta = event.start - event._start, endDelta = event.end ? event.end - (event._end || defaultEventEnd(event)) :0;
for (i = 0; len > i; i++) e = cache[i], e._id == event._id && e != event && (e.start = new Date(+e.start + startDelta), 
e.end = event.end ? e.end ? new Date(+e.end + endDelta) :new Date(+defaultEventEnd(e) + endDelta) :null, 
e.title = event.title, e.url = event.url, e.allDay = event.allDay, e.className = event.className, 
e.editable = event.editable, e.color = event.color, e.backgroudColor = event.backgroudColor, 
e.borderColor = event.borderColor, e.textColor = event.textColor, normalizeEvent(e));
normalizeEvent(event), reportEvents(cache);
}
function renderEvent(event, stick) {
normalizeEvent(event), event.source || (stick && (stickySource.events.push(event), 
event.source = stickySource), cache.push(event)), reportEvents(cache);
}
function removeEvents(filter) {
if (filter) {
if (!$.isFunction(filter)) {
var id = filter + "";
filter = function(e) {
return e._id == id;
};
}
cache = $.grep(cache, filter, !0);
for (var i = 0; i < sources.length; i++) $.isArray(sources[i].events) && (sources[i].events = $.grep(sources[i].events, filter, !0));
} else {
cache = [];
for (var i = 0; i < sources.length; i++) $.isArray(sources[i].events) && (sources[i].events = []);
}
reportEvents(cache);
}
function clientEvents(filter) {
return $.isFunction(filter) ? $.grep(cache, filter) :filter ? (filter += "", $.grep(cache, function(e) {
return e._id == filter;
})) :cache;
}
function pushLoading() {
loadingLevel++ || trigger("loading", null, !0);
}
function popLoading() {
--loadingLevel || trigger("loading", null, !1);
}
function normalizeEvent(event) {
var source = event.source || {}, ignoreTimezone = firstDefined(source.ignoreTimezone, options.ignoreTimezone);
event._id = event._id || (event.id === undefined ? "_fc" + eventGUID++ :event.id + ""), 
event.date && (event.start || (event.start = event.date), delete event.date), event._start = cloneDate(event.start = parseDate(event.start, ignoreTimezone)), 
event.end = parseDate(event.end, ignoreTimezone), event.end && event.end <= event.start && (event.end = null), 
event._end = event.end ? cloneDate(event.end) :null, event.allDay === undefined && (event.allDay = firstDefined(source.allDayDefault, options.allDayDefault)), 
event.className ? "string" == typeof event.className && (event.className = event.className.split(/\s+/)) :event.className = [];
}
function normalizeSource(source) {
source.className ? "string" == typeof source.className && (source.className = source.className.split(/\s+/)) :source.className = [];
for (var normalizers = fc.sourceNormalizers, i = 0; i < normalizers.length; i++) normalizers[i](source);
}
function isSourcesEqual(source1, source2) {
return source1 && source2 && getSourcePrimitive(source1) == getSourcePrimitive(source2);
}
function getSourcePrimitive(source) {
return ("object" == typeof source ? source.events || source.url :"") || source;
}
var t = this;
t.isFetchNeeded = isFetchNeeded, t.fetchEvents = fetchEvents, t.addEventSource = addEventSource, 
t.removeEventSource = removeEventSource, t.updateEvent = updateEvent, t.renderEvent = renderEvent, 
t.removeEvents = removeEvents, t.clientEvents = clientEvents, t.normalizeEvent = normalizeEvent;
for (var rangeStart, rangeEnd, trigger = t.trigger, getView = t.getView, reportEvents = t.reportEvents, stickySource = {
events:[]
}, sources = [ stickySource ], currentFetchID = 0, pendingSourceCnt = 0, loadingLevel = 0, cache = [], i = 0; i < _sources.length; i++) _addEventSource(_sources[i]);
}
function addYears(d, n, keepTime) {
return d.setFullYear(d.getFullYear() + n), keepTime || clearTime(d), d;
}
function addMonths(d, n, keepTime) {
if (+d) {
var m = d.getMonth() + n, check = cloneDate(d);
for (check.setDate(1), check.setMonth(m), d.setMonth(m), keepTime || clearTime(d); d.getMonth() != check.getMonth(); ) d.setDate(d.getDate() + (check > d ? 1 :-1));
}
return d;
}
function addDays(d, n, keepTime) {
if (+d) {
var dd = d.getDate() + n, check = cloneDate(d);
check.setHours(9), check.setDate(dd), d.setDate(dd), keepTime || clearTime(d), fixDate(d, check);
}
return d;
}
function fixDate(d, check) {
if (+d) for (;d.getDate() != check.getDate(); ) d.setTime(+d + (check > d ? 1 :-1) * HOUR_MS);
}
function addMinutes(d, n) {
return d.setMinutes(d.getMinutes() + n), d;
}
function clearTime(d) {
return d.setHours(0), d.setMinutes(0), d.setSeconds(0), d.setMilliseconds(0), d;
}
function cloneDate(d, dontKeepTime) {
return dontKeepTime ? clearTime(new Date(+d)) :new Date(+d);
}
function zeroDate() {
var d, i = 0;
do d = new Date(1970, i++, 1); while (d.getHours());
return d;
}
function skipWeekend(date, inc, excl) {
for (inc = inc || 1; !date.getDay() || excl && 1 == date.getDay() || !excl && 6 == date.getDay(); ) addDays(date, inc);
return date;
}
function dayDiff(d1, d2) {
return Math.round((cloneDate(d1, !0) - cloneDate(d2, !0)) / DAY_MS);
}
function setYMD(date, y, m, d) {
y !== undefined && y != date.getFullYear() && (date.setDate(1), date.setMonth(0), 
date.setFullYear(y)), m !== undefined && m != date.getMonth() && (date.setDate(1), 
date.setMonth(m)), d !== undefined && date.setDate(d);
}
function parseDate(s, ignoreTimezone) {
return "object" == typeof s ? s :"number" == typeof s ? new Date(1e3 * s) :"string" == typeof s ? s.match(/^\d+(\.\d+)?$/) ? new Date(1e3 * parseFloat(s)) :(ignoreTimezone === undefined && (ignoreTimezone = !0), 
parseISO8601(s, ignoreTimezone) || (s ? new Date(s) :null)) :null;
}
function parseISO8601(s, ignoreTimezone) {
var m = s.match(/^([0-9]{4})(-([0-9]{2})(-([0-9]{2})([T ]([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2})(:?([0-9]{2}))?))?)?)?)?$/);
if (!m) return null;
var date = new Date(m[1], 0, 1);
if (ignoreTimezone || !m[13]) {
var check = new Date(m[1], 0, 1, 9, 0);
m[3] && (date.setMonth(m[3] - 1), check.setMonth(m[3] - 1)), m[5] && (date.setDate(m[5]), 
check.setDate(m[5])), fixDate(date, check), m[7] && date.setHours(m[7]), m[8] && date.setMinutes(m[8]), 
m[10] && date.setSeconds(m[10]), m[12] && date.setMilliseconds(1e3 * Number("0." + m[12])), 
fixDate(date, check);
} else if (date.setUTCFullYear(m[1], m[3] ? m[3] - 1 :0, m[5] || 1), date.setUTCHours(m[7] || 0, m[8] || 0, m[10] || 0, m[12] ? 1e3 * Number("0." + m[12]) :0), 
m[14]) {
var offset = 60 * Number(m[16]) + (m[18] ? Number(m[18]) :0);
offset *= "-" == m[15] ? 1 :-1, date = new Date(+date + 60 * offset * 1e3);
}
return date;
}
function parseTime(s) {
if ("number" == typeof s) return 60 * s;
if ("object" == typeof s) return 60 * s.getHours() + s.getMinutes();
var m = s.match(/(\d+)(?::(\d+))?\s*(\w+)?/);
if (m) {
var h = parseInt(m[1], 10);
return m[3] && (h %= 12, "p" == m[3].toLowerCase().charAt(0) && (h += 12)), 60 * h + (m[2] ? parseInt(m[2], 10) :0);
}
}
function formatDate(date, format, options) {
return formatDates(date, null, format, options);
}
function formatDates(date1, date2, format, options) {
options = options || defaults;
var i, c, i2, formatter, date = date1, otherDate = date2, len = format.length, res = "";
for (i = 0; len > i; i++) if (c = format.charAt(i), "'" == c) {
for (i2 = i + 1; len > i2; i2++) if ("'" == format.charAt(i2)) {
date && (res += i2 == i + 1 ? "'" :format.substring(i + 1, i2), i = i2);
break;
}
} else if ("(" == c) {
for (i2 = i + 1; len > i2; i2++) if (")" == format.charAt(i2)) {
var subres = formatDate(date, format.substring(i + 1, i2), options);
parseInt(subres.replace(/\D/, ""), 10) && (res += subres), i = i2;
break;
}
} else if ("[" == c) {
for (i2 = i + 1; len > i2; i2++) if ("]" == format.charAt(i2)) {
var subformat = format.substring(i + 1, i2), subres = formatDate(date, subformat, options);
subres != formatDate(otherDate, subformat, options) && (res += subres), i = i2;
break;
}
} else if ("{" == c) date = date2, otherDate = date1; else if ("}" == c) date = date1, 
otherDate = date2; else {
for (i2 = len; i2 > i; i2--) if (formatter = dateFormatters[format.substring(i, i2)]) {
date && (res += formatter(date, options)), i = i2 - 1;
break;
}
i2 == i && date && (res += c);
}
return res;
}
function exclEndDay(event) {
return event.end ? _exclEndDay(event.end, event.allDay) :addDays(cloneDate(event.start), 1);
}
function _exclEndDay(end, allDay) {
return end = cloneDate(end), allDay || end.getHours() || end.getMinutes() ? addDays(end, 1) :clearTime(end);
}
function segCmp(a, b) {
return 100 * (b.msLength - a.msLength) + (a.event.start - b.event.start);
}
function segsCollide(seg1, seg2) {
return seg1.end > seg2.start && seg1.start < seg2.end;
}
function sliceSegs(events, visEventEnds, start, end) {
var i, event, eventStart, eventEnd, segStart, segEnd, isStart, isEnd, segs = [], len = events.length;
for (i = 0; len > i; i++) event = events[i], eventStart = event.start, eventEnd = visEventEnds[i], 
eventEnd > start && end > eventStart && (start > eventStart ? (segStart = cloneDate(start), 
isStart = !1) :(segStart = eventStart, isStart = !0), eventEnd > end ? (segEnd = cloneDate(end), 
isEnd = !1) :(segEnd = eventEnd, isEnd = !0), segs.push({
event:event,
start:segStart,
end:segEnd,
isStart:isStart,
isEnd:isEnd,
msLength:segEnd - segStart
}));
return segs.sort(segCmp);
}
function stackSegs(segs) {
var i, seg, j, collide, k, levels = [], len = segs.length;
for (i = 0; len > i; i++) {
for (seg = segs[i], j = 0; ;) {
if (collide = !1, levels[j]) for (k = 0; k < levels[j].length; k++) if (segsCollide(levels[j][k], seg)) {
collide = !0;
break;
}
if (!collide) break;
j++;
}
levels[j] ? levels[j].push(seg) :levels[j] = [ seg ];
}
return levels;
}
function lazySegBind(container, segs, bindHandlers) {
container.unbind("mouseover").mouseover(function(ev) {
for (var e, i, seg, parent = ev.target; parent != this; ) e = parent, parent = parent.parentNode;
(i = e._fci) !== undefined && (e._fci = undefined, seg = segs[i], bindHandlers(seg.event, seg.element, seg), 
$(ev.target).trigger(ev)), ev.stopPropagation();
});
}
function setOuterWidth(element, width, includeMargins) {
for (var e, i = 0; i < element.length; i++) e = $(element[i]), e.width(Math.max(0, width - hsides(e, includeMargins)));
}
function setOuterHeight(element, height, includeMargins) {
for (var e, i = 0; i < element.length; i++) e = $(element[i]), e.height(Math.max(0, height - vsides(e, includeMargins)));
}
function hsides(element, includeMargins) {
return hpadding(element) + hborders(element) + (includeMargins ? hmargins(element) :0);
}
function hpadding(element) {
return (parseFloat($.css(element[0], "paddingLeft", !0)) || 0) + (parseFloat($.css(element[0], "paddingRight", !0)) || 0);
}
function hmargins(element) {
return (parseFloat($.css(element[0], "marginLeft", !0)) || 0) + (parseFloat($.css(element[0], "marginRight", !0)) || 0);
}
function hborders(element) {
return (parseFloat($.css(element[0], "borderLeftWidth", !0)) || 0) + (parseFloat($.css(element[0], "borderRightWidth", !0)) || 0);
}
function vsides(element, includeMargins) {
return vpadding(element) + vborders(element) + (includeMargins ? vmargins(element) :0);
}
function vpadding(element) {
return (parseFloat($.css(element[0], "paddingTop", !0)) || 0) + (parseFloat($.css(element[0], "paddingBottom", !0)) || 0);
}
function vmargins(element) {
return (parseFloat($.css(element[0], "marginTop", !0)) || 0) + (parseFloat($.css(element[0], "marginBottom", !0)) || 0);
}
function vborders(element) {
return (parseFloat($.css(element[0], "borderTopWidth", !0)) || 0) + (parseFloat($.css(element[0], "borderBottomWidth", !0)) || 0);
}
function setMinHeight(element, height) {
height = "number" == typeof height ? height + "px" :height, element.each(function(i, _element) {
_element.style.cssText += ";min-height:" + height + ";_height:" + height;
});
}
function noop() {}
function cmp(a, b) {
return a - b;
}
function arrayMax(a) {
return Math.max.apply(Math, a);
}
function zeroPad(n) {
return (10 > n ? "0" :"") + n;
}
function smartProperty(obj, name) {
if (obj[name] !== undefined) return obj[name];
for (var res, parts = name.split(/(?=[A-Z])/), i = parts.length - 1; i >= 0; i--) if (res = obj[parts[i].toLowerCase()], 
res !== undefined) return res;
return obj[""];
}
function htmlEscape(s) {
return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;").replace(/\n/g, "<br />");
}
function cssKey(_element) {
return _element.id + "/" + _element.className + "/" + _element.style.cssText.replace(/(^|;)\s*(top|left|width|height)\s*:[^;]*/gi, "");
}
function disableTextSelection(element) {
element.attr("unselectable", "on").css("MozUserSelect", "none").bind("selectstart.ui", function() {
return !1;
});
}
function markFirstLast(e) {
e.children().removeClass("fc-first fc-last").filter(":first-child").addClass("fc-first").end().filter(":last-child").addClass("fc-last");
}
function setDayID(cell, date) {
cell.each(function(i, _cell) {
_cell.className = _cell.className.replace(/^fc-\w*/, "fc-" + dayIDs[date.getDay()]);
});
}
function getSkinCss(event, opt) {
var source = event.source || {}, eventColor = event.color, sourceColor = source.color, optionColor = opt("eventColor"), backgroundColor = event.backgroundColor || eventColor || source.backgroundColor || sourceColor || opt("eventBackgroundColor") || optionColor, borderColor = event.borderColor || eventColor || source.borderColor || sourceColor || opt("eventBorderColor") || optionColor, textColor = event.textColor || source.textColor || opt("eventTextColor"), statements = [];
return backgroundColor && statements.push("background-color:" + backgroundColor), 
borderColor && statements.push("border-color:" + borderColor), textColor && statements.push("color:" + textColor), 
statements.join(";");
}
function applyAll(functions, thisObj, args) {
if ($.isFunction(functions) && (functions = [ functions ]), functions) {
var i, ret;
for (i = 0; i < functions.length; i++) ret = functions[i].apply(thisObj, args) || ret;
return ret;
}
}
function firstDefined() {
for (var i = 0; i < arguments.length; i++) if (arguments[i] !== undefined) return arguments[i];
}
function MonthView(element, calendar) {
function render(date, delta) {
delta && (addMonths(date, delta), date.setDate(1));
var start = cloneDate(date, !0);
start.setDate(1);
var end = addMonths(cloneDate(start), 1), visStart = cloneDate(start), visEnd = cloneDate(end), firstDay = opt("firstDay"), nwe = opt("weekends") ? 0 :1;
nwe && (skipWeekend(visStart), skipWeekend(visEnd, -1, !0)), addDays(visStart, -((visStart.getDay() - Math.max(firstDay, nwe) + 7) % 7)), 
addDays(visEnd, (7 - visEnd.getDay() + Math.max(firstDay, nwe)) % 7);
var rowCnt = Math.round((visEnd - visStart) / (7 * DAY_MS));
"fixed" == opt("weekMode") && (addDays(visEnd, 7 * (6 - rowCnt)), rowCnt = 6), t.title = formatDate(start, opt("titleFormat")), 
t.start = start, t.end = end, t.visStart = visStart, t.visEnd = visEnd, renderBasic(6, rowCnt, nwe ? 5 :7, !0);
}
var t = this;
t.render = render, BasicView.call(t, element, calendar, "month");
var opt = t.opt, renderBasic = t.renderBasic, formatDate = calendar.formatDate;
}
function BasicWeekView(element, calendar) {
function render(date, delta) {
delta && addDays(date, 7 * delta);
var start = addDays(cloneDate(date), -((date.getDay() - opt("firstDay") + 7) % 7)), end = addDays(cloneDate(start), 7), visStart = cloneDate(start), visEnd = cloneDate(end), weekends = opt("weekends");
weekends || (skipWeekend(visStart), skipWeekend(visEnd, -1, !0)), t.title = formatDates(visStart, addDays(cloneDate(visEnd), -1), opt("titleFormat")), 
t.start = start, t.end = end, t.visStart = visStart, t.visEnd = visEnd, renderBasic(1, 1, weekends ? 7 :5, !1);
}
var t = this;
t.render = render, BasicView.call(t, element, calendar, "basicWeek");
var opt = t.opt, renderBasic = t.renderBasic, formatDates = calendar.formatDates;
}
function BasicDayView(element, calendar) {
function render(date, delta) {
delta && (addDays(date, delta), opt("weekends") || skipWeekend(date, 0 > delta ? -1 :1)), 
t.title = formatDate(date, opt("titleFormat")), t.start = t.visStart = cloneDate(date, !0), 
t.end = t.visEnd = addDays(cloneDate(t.start), 1), renderBasic(1, 1, 1, !1);
}
var t = this;
t.render = render, BasicView.call(t, element, calendar, "basicDay");
var opt = t.opt, renderBasic = t.renderBasic, formatDate = calendar.formatDate;
}
function BasicView(element, calendar, viewName) {
function renderBasic(maxr, r, c, showNumbers) {
rowCnt = r, colCnt = c, updateOptions();
var firstTime = !body;
firstTime ? buildSkeleton(maxr, showNumbers) :clearEvents(), updateCells(firstTime);
}
function updateOptions() {
rtl = opt("isRTL"), rtl ? (dis = -1, dit = colCnt - 1) :(dis = 1, dit = 0), firstDay = opt("firstDay"), 
nwe = opt("weekends") ? 0 :1, tm = opt("theme") ? "ui" :"fc", colFormat = opt("columnFormat");
}
function buildSkeleton(maxRowCnt, showNumbers) {
var s, i, j, table, headerClass = tm + "-widget-header", contentClass = tm + "-widget-content";
for (s = "<table class='fc-border-separate' style='width:100%' cellspacing='0'><thead><tr>", 
i = 0; colCnt > i; i++) s += "<th class='fc- " + headerClass + "'/>";
for (s += "</tr></thead><tbody>", i = 0; maxRowCnt > i; i++) {
for (s += "<tr class='fc-week" + i + "'>", j = 0; colCnt > j; j++) s += "<td class='fc- " + contentClass + " fc-day" + (i * colCnt + j) + "'><div>" + (showNumbers ? "<div class='fc-day-number'/>" :"") + "<div class='fc-day-content'><div style='position:relative'>&nbsp;</div></div></div></td>";
s += "</tr>";
}
s += "</tbody></table>", table = $(s).appendTo(element), head = table.find("thead"), 
headCells = head.find("th"), body = table.find("tbody"), bodyRows = body.find("tr"), 
bodyCells = body.find("td"), bodyFirstCells = bodyCells.filter(":first-child"), 
bodyCellTopInners = bodyRows.eq(0).find("div.fc-day-content div"), markFirstLast(head.add(head.find("tr"))), 
markFirstLast(bodyRows), bodyRows.eq(0).addClass("fc-first"), dayBind(bodyCells), 
daySegmentContainer = $("<div style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(element);
}
function updateCells(firstTime) {
var cell, date, row, dowDirty = firstTime || 1 == rowCnt, month = t.start.getMonth(), today = clearTime(new Date());
dowDirty && headCells.each(function(i, _cell) {
cell = $(_cell), date = indexDate(i), cell.html(formatDate(date, colFormat)), setDayID(cell, date);
}), bodyCells.each(function(i, _cell) {
cell = $(_cell), date = indexDate(i), date.getMonth() == month ? cell.removeClass("fc-other-month") :cell.addClass("fc-other-month"), 
+date == +today ? cell.addClass(tm + "-state-highlight fc-today") :cell.removeClass(tm + "-state-highlight fc-today"), 
cell.find("div.fc-day-number").text(date.getDate()), dowDirty && setDayID(cell, date);
}), bodyRows.each(function(i, _row) {
row = $(_row), rowCnt > i ? (row.show(), i == rowCnt - 1 ? row.addClass("fc-last") :row.removeClass("fc-last")) :row.hide();
});
}
function setHeight(height) {
viewHeight = height;
var rowHeight, rowHeightLast, cell, bodyHeight = viewHeight - head.height();
"variable" == opt("weekMode") ? rowHeight = rowHeightLast = Math.floor(bodyHeight / (1 == rowCnt ? 2 :6)) :(rowHeight = Math.floor(bodyHeight / rowCnt), 
rowHeightLast = bodyHeight - rowHeight * (rowCnt - 1)), bodyFirstCells.each(function(i, _cell) {
rowCnt > i && (cell = $(_cell), setMinHeight(cell.find("> div"), (i == rowCnt - 1 ? rowHeightLast :rowHeight) - vsides(cell)));
});
}
function setWidth(width) {
viewWidth = width, colContentPositions.clear(), colWidth = Math.floor(viewWidth / colCnt), 
setOuterWidth(headCells.slice(0, -1), colWidth);
}
function dayBind(days) {
days.click(dayClick).mousedown(daySelectionMousedown);
}
function dayClick(ev) {
if (!opt("selectable")) {
var index = parseInt(this.className.match(/fc\-day(\d+)/)[1]), date = indexDate(index);
trigger("dayClick", this, date, !0, ev);
}
}
function renderDayOverlay(overlayStart, overlayEnd, refreshCoordinateGrid) {
refreshCoordinateGrid && coordinateGrid.build();
for (var rowStart = cloneDate(t.visStart), rowEnd = addDays(cloneDate(rowStart), colCnt), i = 0; rowCnt > i; i++) {
var stretchStart = new Date(Math.max(rowStart, overlayStart)), stretchEnd = new Date(Math.min(rowEnd, overlayEnd));
if (stretchEnd > stretchStart) {
var colStart, colEnd;
rtl ? (colStart = dayDiff(stretchEnd, rowStart) * dis + dit + 1, colEnd = dayDiff(stretchStart, rowStart) * dis + dit + 1) :(colStart = dayDiff(stretchStart, rowStart), 
colEnd = dayDiff(stretchEnd, rowStart)), dayBind(renderCellOverlay(i, colStart, i, colEnd - 1));
}
addDays(rowStart, 7), addDays(rowEnd, 7);
}
}
function renderCellOverlay(row0, col0, row1, col1) {
var rect = coordinateGrid.rect(row0, col0, row1, col1, element);
return renderOverlay(rect, element);
}
function defaultSelectionEnd(startDate) {
return cloneDate(startDate);
}
function renderSelection(startDate, endDate) {
renderDayOverlay(startDate, addDays(cloneDate(endDate), 1), !0);
}
function clearSelection() {
clearOverlays();
}
function reportDayClick(date, allDay, ev) {
var cell = dateCell(date), _element = bodyCells[cell.row * colCnt + cell.col];
trigger("dayClick", _element, date, allDay, ev);
}
function dragStart(_dragElement, ev) {
hoverListener.start(function(cell) {
clearOverlays(), cell && renderCellOverlay(cell.row, cell.col, cell.row, cell.col);
}, ev);
}
function dragStop(_dragElement, ev, ui) {
var cell = hoverListener.stop();
if (clearOverlays(), cell) {
var d = cellDate(cell);
trigger("drop", _dragElement, d, !0, ev, ui);
}
}
function defaultEventEnd(event) {
return cloneDate(event.start);
}
function colContentLeft(col) {
return colContentPositions.left(col);
}
function colContentRight(col) {
return colContentPositions.right(col);
}
function dateCell(date) {
return {
row:Math.floor(dayDiff(date, t.visStart) / 7),
col:dayOfWeekCol(date.getDay())
};
}
function cellDate(cell) {
return _cellDate(cell.row, cell.col);
}
function _cellDate(row, col) {
return addDays(cloneDate(t.visStart), 7 * row + col * dis + dit);
}
function indexDate(index) {
return _cellDate(Math.floor(index / colCnt), index % colCnt);
}
function dayOfWeekCol(dayOfWeek) {
return (dayOfWeek - Math.max(firstDay, nwe) + colCnt) % colCnt * dis + dit;
}
function allDayRow(i) {
return bodyRows.eq(i);
}
function allDayBounds() {
return {
left:0,
right:viewWidth
};
}
var t = this;
t.renderBasic = renderBasic, t.setHeight = setHeight, t.setWidth = setWidth, t.renderDayOverlay = renderDayOverlay, 
t.defaultSelectionEnd = defaultSelectionEnd, t.renderSelection = renderSelection, 
t.clearSelection = clearSelection, t.reportDayClick = reportDayClick, t.dragStart = dragStart, 
t.dragStop = dragStop, t.defaultEventEnd = defaultEventEnd, t.getHoverListener = function() {
return hoverListener;
}, t.colContentLeft = colContentLeft, t.colContentRight = colContentRight, t.dayOfWeekCol = dayOfWeekCol, 
t.dateCell = dateCell, t.cellDate = cellDate, t.cellIsAllDay = function() {
return !0;
}, t.allDayRow = allDayRow, t.allDayBounds = allDayBounds, t.getRowCnt = function() {
return rowCnt;
}, t.getColCnt = function() {
return colCnt;
}, t.getColWidth = function() {
return colWidth;
}, t.getDaySegmentContainer = function() {
return daySegmentContainer;
}, View.call(t, element, calendar, viewName), OverlayManager.call(t), SelectionManager.call(t), 
BasicEventRenderer.call(t);
var head, headCells, body, bodyRows, bodyCells, bodyFirstCells, bodyCellTopInners, daySegmentContainer, viewWidth, viewHeight, colWidth, rowCnt, colCnt, coordinateGrid, hoverListener, colContentPositions, rtl, dis, dit, firstDay, nwe, tm, colFormat, opt = t.opt, trigger = t.trigger, clearEvents = t.clearEvents, renderOverlay = t.renderOverlay, clearOverlays = t.clearOverlays, daySelectionMousedown = t.daySelectionMousedown, formatDate = calendar.formatDate;
disableTextSelection(element.addClass("fc-grid")), coordinateGrid = new CoordinateGrid(function(rows, cols) {
var e, n, p;
headCells.each(function(i, _e) {
e = $(_e), n = e.offset().left, i && (p[1] = n), p = [ n ], cols[i] = p;
}), p[1] = n + e.outerWidth(), bodyRows.each(function(i, _e) {
rowCnt > i && (e = $(_e), n = e.offset().top, i && (p[1] = n), p = [ n ], rows[i] = p);
}), p[1] = n + e.outerHeight();
}), hoverListener = new HoverListener(coordinateGrid), colContentPositions = new HorizontalPositionCache(function(col) {
return bodyCellTopInners.eq(col);
});
}
function BasicEventRenderer() {
function renderEvents(events, modifiedEventId) {
reportEvents(events), renderDaySegs(compileSegs(events), modifiedEventId);
}
function clearEvents() {
reportEventClear(), getDaySegmentContainer().empty();
}
function compileSegs(events) {
var i, row, j, level, k, seg, rowCnt = getRowCnt(), colCnt = getColCnt(), d1 = cloneDate(t.visStart), d2 = addDays(cloneDate(d1), colCnt), visEventsEnds = $.map(events, exclEndDay), segs = [];
for (i = 0; rowCnt > i; i++) {
for (row = stackSegs(sliceSegs(events, visEventsEnds, d1, d2)), j = 0; j < row.length; j++) for (level = row[j], 
k = 0; k < level.length; k++) seg = level[k], seg.row = i, seg.level = j, segs.push(seg);
addDays(d1, 7), addDays(d2, 7);
}
return segs;
}
function bindDaySeg(event, eventElement, seg) {
isEventDraggable(event) && draggableDayEvent(event, eventElement), seg.isEnd && isEventResizable(event) && resizableDayEvent(event, eventElement, seg), 
eventElementHandlers(event, eventElement);
}
function draggableDayEvent(event, eventElement) {
var dayDelta, hoverListener = getHoverListener();
eventElement.draggable({
zIndex:9,
delay:50,
opacity:opt("dragOpacity"),
revertDuration:opt("dragRevertDuration"),
start:function(ev, ui) {
trigger("eventDragStart", eventElement, event, ev, ui), hideEvents(event, eventElement), 
hoverListener.start(function(cell, origCell, rowDelta, colDelta) {
eventElement.draggable("option", "revert", !cell || !rowDelta && !colDelta), clearOverlays(), 
cell ? (dayDelta = 7 * rowDelta + colDelta * (opt("isRTL") ? -1 :1), renderDayOverlay(addDays(cloneDate(event.start), dayDelta), addDays(exclEndDay(event), dayDelta))) :dayDelta = 0;
}, ev, "drag");
},
stop:function(ev, ui) {
hoverListener.stop(), clearOverlays(), trigger("eventDragStop", eventElement, event, ev, ui), 
dayDelta ? eventDrop(this, event, dayDelta, 0, event.allDay, ev, ui) :(eventElement.css("filter", ""), 
showEvents(event, eventElement));
}
});
}
var t = this;
t.renderEvents = renderEvents, t.compileDaySegs = compileSegs, t.clearEvents = clearEvents, 
t.bindDaySeg = bindDaySeg, DayEventRenderer.call(t);
var opt = t.opt, trigger = t.trigger, isEventDraggable = t.isEventDraggable, isEventResizable = t.isEventResizable, reportEvents = t.reportEvents, reportEventClear = t.reportEventClear, eventElementHandlers = t.eventElementHandlers, showEvents = t.showEvents, hideEvents = t.hideEvents, eventDrop = t.eventDrop, getDaySegmentContainer = t.getDaySegmentContainer, getHoverListener = t.getHoverListener, renderDayOverlay = t.renderDayOverlay, clearOverlays = t.clearOverlays, getRowCnt = t.getRowCnt, getColCnt = t.getColCnt, renderDaySegs = t.renderDaySegs, resizableDayEvent = t.resizableDayEvent;
}
function AgendaWeekView(element, calendar) {
function render(date, delta) {
delta && addDays(date, 7 * delta);
var start = addDays(cloneDate(date), -((date.getDay() - opt("firstDay") + 7) % 7)), end = addDays(cloneDate(start), 7), visStart = cloneDate(start), visEnd = cloneDate(end), weekends = opt("weekends");
weekends || (skipWeekend(visStart), skipWeekend(visEnd, -1, !0)), t.title = formatDates(visStart, addDays(cloneDate(visEnd), -1), opt("titleFormat")), 
t.start = start, t.end = end, t.visStart = visStart, t.visEnd = visEnd, renderAgenda(weekends ? 7 :5);
}
var t = this;
t.render = render, AgendaView.call(t, element, calendar, "agendaWeek");
var opt = t.opt, renderAgenda = t.renderAgenda, formatDates = calendar.formatDates;
}
function AgendaDayView(element, calendar) {
function render(date, delta) {
delta && (addDays(date, delta), opt("weekends") || skipWeekend(date, 0 > delta ? -1 :1));
var start = cloneDate(date, !0), end = addDays(cloneDate(start), 1);
t.title = formatDate(date, opt("titleFormat")), t.start = t.visStart = start, t.end = t.visEnd = end, 
renderAgenda(1);
}
var t = this;
t.render = render, AgendaView.call(t, element, calendar, "agendaDay");
var opt = t.opt, renderAgenda = t.renderAgenda, formatDate = calendar.formatDate;
}
function AgendaView(element, calendar, viewName) {
function renderAgenda(c) {
colCnt = c, updateOptions(), dayTable ? clearEvents() :buildSkeleton(), updateCells();
}
function updateOptions() {
tm = opt("theme") ? "ui" :"fc", nwe = opt("weekends") ? 0 :1, firstDay = opt("firstDay"), 
(rtl = opt("isRTL")) ? (dis = -1, dit = colCnt - 1) :(dis = 1, dit = 0), minMinute = parseTime(opt("minTime")), 
maxMinute = parseTime(opt("maxTime")), colFormat = opt("columnFormat");
}
function buildSkeleton() {
var s, i, d, maxd, minutes, headerClass = tm + "-widget-header", contentClass = tm + "-widget-content", slotNormal = opt("slotMinutes") % 15 == 0;
for (s = "<table style='width:100%' class='fc-agenda-days fc-border-separate' cellspacing='0'><thead><tr><th class='fc-agenda-axis " + headerClass + "'>&nbsp;</th>", 
i = 0; colCnt > i; i++) s += "<th class='fc- fc-col" + i + " " + headerClass + "'/>";
for (s += "<th class='fc-agenda-gutter " + headerClass + "'>&nbsp;</th></tr></thead><tbody><tr><th class='fc-agenda-axis " + headerClass + "'>&nbsp;</th>", 
i = 0; colCnt > i; i++) s += "<td class='fc- fc-col" + i + " " + contentClass + "'><div><div class='fc-day-content'><div style='position:relative'>&nbsp;</div></div></div></td>";
for (s += "<td class='fc-agenda-gutter " + contentClass + "'>&nbsp;</td></tr></tbody></table>", 
dayTable = $(s).appendTo(element), dayHead = dayTable.find("thead"), dayHeadCells = dayHead.find("th").slice(1, -1), 
dayBody = dayTable.find("tbody"), dayBodyCells = dayBody.find("td").slice(0, -1), 
dayBodyCellInners = dayBodyCells.find("div.fc-day-content div"), dayBodyFirstCell = dayBodyCells.eq(0), 
dayBodyFirstCellStretcher = dayBodyFirstCell.find("> div"), markFirstLast(dayHead.add(dayHead.find("tr"))), 
markFirstLast(dayBody.add(dayBody.find("tr"))), axisFirstCells = dayHead.find("th:first"), 
gutterCells = dayTable.find(".fc-agenda-gutter"), slotLayer = $("<div style='position:absolute;z-index:2;left:0;width:100%'/>").appendTo(element), 
opt("allDaySlot") ? (daySegmentContainer = $("<div style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(slotLayer), 
s = "<table style='width:100%' class='fc-agenda-allday' cellspacing='0'><tr><th class='" + headerClass + " fc-agenda-axis'>" + opt("allDayText") + "</th><td><div class='fc-day-content'><div style='position:relative'/></div></td><th class='" + headerClass + " fc-agenda-gutter'>&nbsp;</th></tr></table>", 
allDayTable = $(s).appendTo(slotLayer), allDayRow = allDayTable.find("tr"), dayBind(allDayRow.find("td")), 
axisFirstCells = axisFirstCells.add(allDayTable.find("th:first")), gutterCells = gutterCells.add(allDayTable.find("th.fc-agenda-gutter")), 
slotLayer.append("<div class='fc-agenda-divider " + headerClass + "'><div class='fc-agenda-divider-inner'/></div>")) :daySegmentContainer = $([]), 
slotScroller = $("<div style='position:absolute;width:100%;overflow-x:hidden;overflow-y:auto'/>").appendTo(slotLayer), 
slotContent = $("<div style='position:relative;width:100%;overflow:hidden'/>").appendTo(slotScroller), 
slotSegmentContainer = $("<div style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(slotContent), 
s = "<table class='fc-agenda-slots' style='width:100%' cellspacing='0'><tbody>", 
d = zeroDate(), maxd = addMinutes(cloneDate(d), maxMinute), addMinutes(d, minMinute), 
slotCnt = 0, i = 0; maxd > d; i++) minutes = d.getMinutes(), s += "<tr class='fc-slot" + i + " " + (minutes ? "fc-minor" :"") + "'><th class='fc-agenda-axis " + headerClass + "'>" + (slotNormal && minutes ? "&nbsp;" :formatDate(d, opt("axisFormat"))) + "</th><td class='" + contentClass + "'><div style='position:relative'>&nbsp;</div></td></tr>", 
addMinutes(d, opt("slotMinutes")), slotCnt++;
s += "</tbody></table>", slotTable = $(s).appendTo(slotContent), slotTableFirstInner = slotTable.find("div:first"), 
slotBind(slotTable.find("td")), axisFirstCells = axisFirstCells.add(slotTable.find("th:first"));
}
function updateCells() {
var i, headCell, bodyCell, date, today = clearTime(new Date());
for (i = 0; colCnt > i; i++) date = colDate(i), headCell = dayHeadCells.eq(i), headCell.html(formatDate(date, colFormat)), 
bodyCell = dayBodyCells.eq(i), +date == +today ? bodyCell.addClass(tm + "-state-highlight fc-today") :bodyCell.removeClass(tm + "-state-highlight fc-today"), 
setDayID(headCell.add(bodyCell), date);
}
function setHeight(height, dateChanged) {
height === undefined && (height = viewHeight), viewHeight = height, slotTopCache = {};
var headHeight = dayBody.position().top, allDayHeight = slotScroller.position().top, bodyHeight = Math.min(height - headHeight, slotTable.height() + allDayHeight + 1);
dayBodyFirstCellStretcher.height(bodyHeight - vsides(dayBodyFirstCell)), slotLayer.css("top", headHeight), 
slotScroller.height(bodyHeight - allDayHeight - 1), slotHeight = slotTableFirstInner.height() + 1, 
dateChanged && resetScroll();
}
function setWidth(width) {
viewWidth = width, colContentPositions.clear(), axisWidth = 0, setOuterWidth(axisFirstCells.width("").each(function(i, _cell) {
axisWidth = Math.max(axisWidth, $(_cell).outerWidth());
}), axisWidth);
var slotTableWidth = slotScroller[0].clientWidth;
gutterWidth = slotScroller.width() - slotTableWidth, gutterWidth ? (setOuterWidth(gutterCells, gutterWidth), 
gutterCells.show().prev().removeClass("fc-last")) :gutterCells.hide().prev().addClass("fc-last"), 
colWidth = Math.floor((slotTableWidth - axisWidth) / colCnt), setOuterWidth(dayHeadCells.slice(0, -1), colWidth);
}
function resetScroll() {
function scroll() {
slotScroller.scrollTop(top);
}
var d0 = zeroDate(), scrollDate = cloneDate(d0);
scrollDate.setHours(opt("firstHour"));
var top = timePosition(d0, scrollDate) + 1;
scroll(), setTimeout(scroll, 0);
}
function beforeHide() {
savedScrollTop = slotScroller.scrollTop();
}
function afterShow() {
slotScroller.scrollTop(savedScrollTop);
}
function dayBind(cells) {
cells.click(slotClick).mousedown(daySelectionMousedown);
}
function slotBind(cells) {
cells.click(slotClick).mousedown(slotSelectionMousedown);
}
function slotClick(ev) {
if (!opt("selectable")) {
var col = Math.min(colCnt - 1, Math.floor((ev.pageX - dayTable.offset().left - axisWidth) / colWidth)), date = colDate(col), rowMatch = this.parentNode.className.match(/fc-slot(\d+)/);
if (rowMatch) {
var mins = parseInt(rowMatch[1]) * opt("slotMinutes"), hours = Math.floor(mins / 60);
date.setHours(hours), date.setMinutes(mins % 60 + minMinute), trigger("dayClick", dayBodyCells[col], date, !1, ev);
} else trigger("dayClick", dayBodyCells[col], date, !0, ev);
}
}
function renderDayOverlay(startDate, endDate, refreshCoordinateGrid) {
refreshCoordinateGrid && coordinateGrid.build();
var startCol, endCol, visStart = cloneDate(t.visStart);
rtl ? (startCol = dayDiff(endDate, visStart) * dis + dit + 1, endCol = dayDiff(startDate, visStart) * dis + dit + 1) :(startCol = dayDiff(startDate, visStart), 
endCol = dayDiff(endDate, visStart)), startCol = Math.max(0, startCol), endCol = Math.min(colCnt, endCol), 
endCol > startCol && dayBind(renderCellOverlay(0, startCol, 0, endCol - 1));
}
function renderCellOverlay(row0, col0, row1, col1) {
var rect = coordinateGrid.rect(row0, col0, row1, col1, slotLayer);
return renderOverlay(rect, slotLayer);
}
function renderSlotOverlay(overlayStart, overlayEnd) {
for (var dayStart = cloneDate(t.visStart), dayEnd = addDays(cloneDate(dayStart), 1), i = 0; colCnt > i; i++) {
var stretchStart = new Date(Math.max(dayStart, overlayStart)), stretchEnd = new Date(Math.min(dayEnd, overlayEnd));
if (stretchEnd > stretchStart) {
var col = i * dis + dit, rect = coordinateGrid.rect(0, col, 0, col, slotContent), top = timePosition(dayStart, stretchStart), bottom = timePosition(dayStart, stretchEnd);
rect.top = top, rect.height = bottom - top, slotBind(renderOverlay(rect, slotContent));
}
addDays(dayStart, 1), addDays(dayEnd, 1);
}
}
function colContentLeft(col) {
return colContentPositions.left(col);
}
function colContentRight(col) {
return colContentPositions.right(col);
}
function dateCell(date) {
return {
row:Math.floor(dayDiff(date, t.visStart) / 7),
col:dayOfWeekCol(date.getDay())
};
}
function cellDate(cell) {
var d = colDate(cell.col), slotIndex = cell.row;
return opt("allDaySlot") && slotIndex--, slotIndex >= 0 && addMinutes(d, minMinute + slotIndex * opt("slotMinutes")), 
d;
}
function colDate(col) {
return addDays(cloneDate(t.visStart), col * dis + dit);
}
function cellIsAllDay(cell) {
return opt("allDaySlot") && !cell.row;
}
function dayOfWeekCol(dayOfWeek) {
return (dayOfWeek - Math.max(firstDay, nwe) + colCnt) % colCnt * dis + dit;
}
function timePosition(day, time) {
if (day = cloneDate(day, !0), time < addMinutes(cloneDate(day), minMinute)) return 0;
if (time >= addMinutes(cloneDate(day), maxMinute)) return slotTable.height();
var slotMinutes = opt("slotMinutes"), minutes = 60 * time.getHours() + time.getMinutes() - minMinute, slotI = Math.floor(minutes / slotMinutes), slotTop = slotTopCache[slotI];
return slotTop === undefined && (slotTop = slotTopCache[slotI] = slotTable.find("tr:eq(" + slotI + ") td div")[0].offsetTop), 
Math.max(0, Math.round(slotTop - 1 + slotHeight * (minutes % slotMinutes / slotMinutes)));
}
function allDayBounds() {
return {
left:axisWidth,
right:viewWidth - gutterWidth
};
}
function getAllDayRow() {
return allDayRow;
}
function defaultEventEnd(event) {
var start = cloneDate(event.start);
return event.allDay ? start :addMinutes(start, opt("defaultEventMinutes"));
}
function defaultSelectionEnd(startDate, allDay) {
return allDay ? cloneDate(startDate) :addMinutes(cloneDate(startDate), opt("slotMinutes"));
}
function renderSelection(startDate, endDate, allDay) {
allDay ? opt("allDaySlot") && renderDayOverlay(startDate, addDays(cloneDate(endDate), 1), !0) :renderSlotSelection(startDate, endDate);
}
function renderSlotSelection(startDate, endDate) {
var helperOption = opt("selectHelper");
if (coordinateGrid.build(), helperOption) {
var col = dayDiff(startDate, t.visStart) * dis + dit;
if (col >= 0 && colCnt > col) {
var rect = coordinateGrid.rect(0, col, 0, col, slotContent), top = timePosition(startDate, startDate), bottom = timePosition(startDate, endDate);
if (bottom > top) {
if (rect.top = top, rect.height = bottom - top, rect.left += 2, rect.width -= 5, 
$.isFunction(helperOption)) {
var helperRes = helperOption(startDate, endDate);
helperRes && (rect.position = "absolute", rect.zIndex = 8, selectionHelper = $(helperRes).css(rect).appendTo(slotContent));
} else rect.isStart = !0, rect.isEnd = !0, selectionHelper = $(slotSegHtml({
title:"",
start:startDate,
end:endDate,
className:[ "fc-select-helper" ],
editable:!1
}, rect)), selectionHelper.css("opacity", opt("dragOpacity"));
selectionHelper && (slotBind(selectionHelper), slotContent.append(selectionHelper), 
setOuterWidth(selectionHelper, rect.width, !0), setOuterHeight(selectionHelper, rect.height, !0));
}
}
} else renderSlotOverlay(startDate, endDate);
}
function clearSelection() {
clearOverlays(), selectionHelper && (selectionHelper.remove(), selectionHelper = null);
}
function slotSelectionMousedown(ev) {
if (1 == ev.which && opt("selectable")) {
unselect(ev);
var dates;
hoverListener.start(function(cell, origCell) {
if (clearSelection(), cell && cell.col == origCell.col && !cellIsAllDay(cell)) {
var d1 = cellDate(origCell), d2 = cellDate(cell);
dates = [ d1, addMinutes(cloneDate(d1), opt("slotMinutes")), d2, addMinutes(cloneDate(d2), opt("slotMinutes")) ].sort(cmp), 
renderSlotSelection(dates[0], dates[3]);
} else dates = null;
}, ev), $(document).one("mouseup", function(ev) {
hoverListener.stop(), dates && (+dates[0] == +dates[1] && reportDayClick(dates[0], !1, ev), 
reportSelection(dates[0], dates[3], !1, ev));
});
}
}
function reportDayClick(date, allDay, ev) {
trigger("dayClick", dayBodyCells[dayOfWeekCol(date.getDay())], date, allDay, ev);
}
function dragStart(_dragElement, ev) {
hoverListener.start(function(cell) {
if (clearOverlays(), cell) if (cellIsAllDay(cell)) renderCellOverlay(cell.row, cell.col, cell.row, cell.col); else {
var d1 = cellDate(cell), d2 = addMinutes(cloneDate(d1), opt("defaultEventMinutes"));
renderSlotOverlay(d1, d2);
}
}, ev);
}
function dragStop(_dragElement, ev, ui) {
var cell = hoverListener.stop();
clearOverlays(), cell && trigger("drop", _dragElement, cellDate(cell), cellIsAllDay(cell), ev, ui);
}
var t = this;
t.renderAgenda = renderAgenda, t.setWidth = setWidth, t.setHeight = setHeight, t.beforeHide = beforeHide, 
t.afterShow = afterShow, t.defaultEventEnd = defaultEventEnd, t.timePosition = timePosition, 
t.dayOfWeekCol = dayOfWeekCol, t.dateCell = dateCell, t.cellDate = cellDate, t.cellIsAllDay = cellIsAllDay, 
t.allDayRow = getAllDayRow, t.allDayBounds = allDayBounds, t.getHoverListener = function() {
return hoverListener;
}, t.colContentLeft = colContentLeft, t.colContentRight = colContentRight, t.getDaySegmentContainer = function() {
return daySegmentContainer;
}, t.getSlotSegmentContainer = function() {
return slotSegmentContainer;
}, t.getMinMinute = function() {
return minMinute;
}, t.getMaxMinute = function() {
return maxMinute;
}, t.getBodyContent = function() {
return slotContent;
}, t.getRowCnt = function() {
return 1;
}, t.getColCnt = function() {
return colCnt;
}, t.getColWidth = function() {
return colWidth;
}, t.getSlotHeight = function() {
return slotHeight;
}, t.defaultSelectionEnd = defaultSelectionEnd, t.renderDayOverlay = renderDayOverlay, 
t.renderSelection = renderSelection, t.clearSelection = clearSelection, t.reportDayClick = reportDayClick, 
t.dragStart = dragStart, t.dragStop = dragStop, View.call(t, element, calendar, viewName), 
OverlayManager.call(t), SelectionManager.call(t), AgendaEventRenderer.call(t);
var dayTable, dayHead, dayHeadCells, dayBody, dayBodyCells, dayBodyCellInners, dayBodyFirstCell, dayBodyFirstCellStretcher, slotLayer, daySegmentContainer, allDayTable, allDayRow, slotScroller, slotContent, slotSegmentContainer, slotTable, slotTableFirstInner, axisFirstCells, gutterCells, selectionHelper, viewWidth, viewHeight, axisWidth, colWidth, gutterWidth, slotHeight, savedScrollTop, colCnt, slotCnt, coordinateGrid, hoverListener, colContentPositions, tm, firstDay, nwe, rtl, dis, dit, minMinute, maxMinute, colFormat, opt = t.opt, trigger = t.trigger, clearEvents = t.clearEvents, renderOverlay = t.renderOverlay, clearOverlays = t.clearOverlays, reportSelection = t.reportSelection, unselect = t.unselect, daySelectionMousedown = t.daySelectionMousedown, slotSegHtml = t.slotSegHtml, formatDate = calendar.formatDate, slotTopCache = {};
disableTextSelection(element.addClass("fc-agenda")), coordinateGrid = new CoordinateGrid(function(rows, cols) {
function constrain(n) {
return Math.max(slotScrollerTop, Math.min(slotScrollerBottom, n));
}
var e, n, p;
dayHeadCells.each(function(i, _e) {
e = $(_e), n = e.offset().left, i && (p[1] = n), p = [ n ], cols[i] = p;
}), p[1] = n + e.outerWidth(), opt("allDaySlot") && (e = allDayRow, n = e.offset().top, 
rows[0] = [ n, n + e.outerHeight() ]);
for (var slotTableTop = slotContent.offset().top, slotScrollerTop = slotScroller.offset().top, slotScrollerBottom = slotScrollerTop + slotScroller.outerHeight(), i = 0; slotCnt > i; i++) rows.push([ constrain(slotTableTop + slotHeight * i), constrain(slotTableTop + slotHeight * (i + 1)) ]);
}), hoverListener = new HoverListener(coordinateGrid), colContentPositions = new HorizontalPositionCache(function(col) {
return dayBodyCellInners.eq(col);
});
}
function AgendaEventRenderer() {
function renderEvents(events, modifiedEventId) {
reportEvents(events);
var i, len = events.length, dayEvents = [], slotEvents = [];
for (i = 0; len > i; i++) events[i].allDay ? dayEvents.push(events[i]) :slotEvents.push(events[i]);
opt("allDaySlot") && (renderDaySegs(compileDaySegs(dayEvents), modifiedEventId), 
setHeight()), renderSlotSegs(compileSlotSegs(slotEvents), modifiedEventId);
}
function clearEvents() {
reportEventClear(), getDaySegmentContainer().empty(), getSlotSegmentContainer().empty();
}
function compileDaySegs(events) {
var i, level, j, seg, levels = stackSegs(sliceSegs(events, $.map(events, exclEndDay), t.visStart, t.visEnd)), levelCnt = levels.length, segs = [];
for (i = 0; levelCnt > i; i++) for (level = levels[i], j = 0; j < level.length; j++) seg = level[j], 
seg.row = 0, seg.level = i, segs.push(seg);
return segs;
}
function compileSlotSegs(events) {
var i, col, j, level, k, seg, colCnt = getColCnt(), minMinute = getMinMinute(), maxMinute = getMaxMinute(), d = addMinutes(cloneDate(t.visStart), minMinute), visEventEnds = $.map(events, slotEventEnd), segs = [];
for (i = 0; colCnt > i; i++) {
for (col = stackSegs(sliceSegs(events, visEventEnds, d, addMinutes(cloneDate(d), maxMinute - minMinute))), 
countForwardSegs(col), j = 0; j < col.length; j++) for (level = col[j], k = 0; k < level.length; k++) seg = level[k], 
seg.col = i, seg.level = j, segs.push(seg);
addDays(d, 1, !0);
}
return segs;
}
function slotEventEnd(event) {
return event.end ? cloneDate(event.end) :addMinutes(cloneDate(event.start), opt("defaultEventMinutes"));
}
function renderSlotSegs(segs, modifiedEventId) {
var i, seg, event, top, bottom, colI, levelI, forward, leftmost, availWidth, outerWidth, left, eventElements, eventElement, triggerRes, key, val, contentElement, height, rtl, dis, dit, segCnt = segs.length, html = "", vsideCache = {}, hsideCache = {}, slotSegmentContainer = getSlotSegmentContainer(), colCnt = getColCnt();
for ((rtl = opt("isRTL")) ? (dis = -1, dit = colCnt - 1) :(dis = 1, dit = 0), i = 0; segCnt > i; i++) seg = segs[i], 
event = seg.event, top = timePosition(seg.start, seg.start), bottom = timePosition(seg.start, seg.end), 
colI = seg.col, levelI = seg.level, forward = seg.forward || 0, leftmost = colContentLeft(colI * dis + dit), 
availWidth = colContentRight(colI * dis + dit) - leftmost, availWidth = Math.min(availWidth - 6, .95 * availWidth), 
outerWidth = levelI ? availWidth / (levelI + forward + 1) :forward ? 2 * (availWidth / (forward + 1) - 6) :availWidth, 
left = leftmost + availWidth / (levelI + forward + 1) * levelI * dis + (rtl ? availWidth - outerWidth :0), 
seg.top = top, seg.left = left, seg.outerWidth = outerWidth, seg.outerHeight = bottom - top, 
html += slotSegHtml(event, seg);
for (slotSegmentContainer[0].innerHTML = html, eventElements = slotSegmentContainer.children(), 
i = 0; segCnt > i; i++) seg = segs[i], event = seg.event, eventElement = $(eventElements[i]), 
triggerRes = trigger("eventRender", event, event, eventElement), triggerRes === !1 ? eventElement.remove() :(triggerRes && triggerRes !== !0 && (eventElement.remove(), 
eventElement = $(triggerRes).css({
position:"absolute",
top:seg.top,
left:seg.left
}).appendTo(slotSegmentContainer)), seg.element = eventElement, event._id === modifiedEventId ? bindSlotSeg(event, eventElement, seg) :eventElement[0]._fci = i, 
reportEventElement(event, eventElement));
for (lazySegBind(slotSegmentContainer, segs, bindSlotSeg), i = 0; segCnt > i; i++) seg = segs[i], 
(eventElement = seg.element) && (val = vsideCache[key = seg.key = cssKey(eventElement[0])], 
seg.vsides = val === undefined ? vsideCache[key] = vsides(eventElement, !0) :val, 
val = hsideCache[key], seg.hsides = val === undefined ? hsideCache[key] = hsides(eventElement, !0) :val, 
contentElement = eventElement.find("div.fc-event-content"), contentElement.length && (seg.contentTop = contentElement[0].offsetTop));
for (i = 0; segCnt > i; i++) seg = segs[i], (eventElement = seg.element) && (eventElement[0].style.width = Math.max(0, seg.outerWidth - seg.hsides) + "px", 
height = Math.max(0, seg.outerHeight - seg.vsides), eventElement[0].style.height = height + "px", 
event = seg.event, seg.contentTop !== undefined && height - seg.contentTop < 10 && (eventElement.find("div.fc-event-time").text(formatDate(event.start, opt("timeFormat")) + " - " + event.title), 
eventElement.find("div.fc-event-title").remove()), trigger("eventAfterRender", event, event, eventElement));
}
function slotSegHtml(event, seg) {
var html = "<", url = event.url, skinCss = getSkinCss(event, opt), skinCssAttr = skinCss ? " style='" + skinCss + "'" :"", classes = [ "fc-event", "fc-event-skin", "fc-event-vert" ];
return isEventDraggable(event) && classes.push("fc-event-draggable"), seg.isStart && classes.push("fc-corner-top"), 
seg.isEnd && classes.push("fc-corner-bottom"), classes = classes.concat(event.className), 
event.source && (classes = classes.concat(event.source.className || [])), html += url ? "a href='" + htmlEscape(event.url) + "'" :"div", 
html += " class='" + classes.join(" ") + "' style='position:absolute;z-index:8;top:" + seg.top + "px;left:" + seg.left + "px;" + skinCss + "'><div class='fc-event-inner fc-event-skin'" + skinCssAttr + "><div class='fc-event-head fc-event-skin'" + skinCssAttr + "><div class='fc-event-time'>" + htmlEscape(formatDates(event.start, event.end, opt("timeFormat"))) + "</div></div><div class='fc-event-content'><div class='fc-event-title'>" + htmlEscape(event.title) + "</div></div><div class='fc-event-bg'></div></div>", 
seg.isEnd && isEventResizable(event) && (html += "<div class='ui-resizable-handle ui-resizable-s'>=</div>"), 
html += "</" + (url ? "a" :"div") + ">";
}
function bindDaySeg(event, eventElement, seg) {
isEventDraggable(event) && draggableDayEvent(event, eventElement, seg.isStart), 
seg.isEnd && isEventResizable(event) && resizableDayEvent(event, eventElement, seg), 
eventElementHandlers(event, eventElement);
}
function bindSlotSeg(event, eventElement, seg) {
var timeElement = eventElement.find("div.fc-event-time");
isEventDraggable(event) && draggableSlotEvent(event, eventElement, timeElement), 
seg.isEnd && isEventResizable(event) && resizableSlotEvent(event, eventElement, timeElement), 
eventElementHandlers(event, eventElement);
}
function draggableDayEvent(event, eventElement, isStart) {
function resetElement() {
allDay || (eventElement.width(origWidth).height("").draggable("option", "grid", null), 
allDay = !0);
}
var origWidth, revert, dayDelta, allDay = !0, dis = opt("isRTL") ? -1 :1, hoverListener = getHoverListener(), colWidth = getColWidth(), slotHeight = getSlotHeight(), minMinute = getMinMinute();
eventElement.draggable({
zIndex:9,
opacity:opt("dragOpacity", "month"),
revertDuration:opt("dragRevertDuration"),
start:function(ev, ui) {
trigger("eventDragStart", eventElement, event, ev, ui), hideEvents(event, eventElement), 
origWidth = eventElement.width(), hoverListener.start(function(cell, origCell, rowDelta, colDelta) {
clearOverlays(), cell ? (revert = !1, dayDelta = colDelta * dis, cell.row ? isStart ? allDay && (eventElement.width(colWidth - 10), 
setOuterHeight(eventElement, slotHeight * Math.round((event.end ? (event.end - event.start) / MINUTE_MS :opt("defaultEventMinutes")) / opt("slotMinutes"))), 
eventElement.draggable("option", "grid", [ colWidth, 1 ]), allDay = !1) :revert = !0 :(renderDayOverlay(addDays(cloneDate(event.start), dayDelta), addDays(exclEndDay(event), dayDelta)), 
resetElement()), revert = revert || allDay && !dayDelta) :(resetElement(), revert = !0), 
eventElement.draggable("option", "revert", revert);
}, ev, "drag");
},
stop:function(ev, ui) {
if (hoverListener.stop(), clearOverlays(), trigger("eventDragStop", eventElement, event, ev, ui), 
revert) resetElement(), eventElement.css("filter", ""), showEvents(event, eventElement); else {
var minuteDelta = 0;
allDay || (minuteDelta = Math.round((eventElement.offset().top - getBodyContent().offset().top) / slotHeight) * opt("slotMinutes") + minMinute - (60 * event.start.getHours() + event.start.getMinutes())), 
eventDrop(this, event, dayDelta, minuteDelta, allDay, ev, ui);
}
}
});
}
function draggableSlotEvent(event, eventElement, timeElement) {
function updateTimeText(minuteDelta) {
var newEnd, newStart = addMinutes(cloneDate(event.start), minuteDelta);
event.end && (newEnd = addMinutes(cloneDate(event.end), minuteDelta)), timeElement.text(formatDates(newStart, newEnd, opt("timeFormat")));
}
function resetElement() {
allDay && (timeElement.css("display", ""), eventElement.draggable("option", "grid", [ colWidth, slotHeight ]), 
allDay = !1);
}
var origPosition, dayDelta, minuteDelta, prevMinuteDelta, allDay = !1, dis = opt("isRTL") ? -1 :1, hoverListener = getHoverListener(), colCnt = getColCnt(), colWidth = getColWidth(), slotHeight = getSlotHeight();
eventElement.draggable({
zIndex:9,
scroll:!1,
grid:[ colWidth, slotHeight ],
axis:1 == colCnt ? "y" :!1,
opacity:opt("dragOpacity"),
revertDuration:opt("dragRevertDuration"),
start:function(ev, ui) {
trigger("eventDragStart", eventElement, event, ev, ui), hideEvents(event, eventElement), 
origPosition = eventElement.position(), minuteDelta = prevMinuteDelta = 0, hoverListener.start(function(cell, origCell, rowDelta, colDelta) {
eventElement.draggable("option", "revert", !cell), clearOverlays(), cell && (dayDelta = colDelta * dis, 
opt("allDaySlot") && !cell.row ? (allDay || (allDay = !0, timeElement.hide(), eventElement.draggable("option", "grid", null)), 
renderDayOverlay(addDays(cloneDate(event.start), dayDelta), addDays(exclEndDay(event), dayDelta))) :resetElement());
}, ev, "drag");
},
drag:function(ev, ui) {
minuteDelta = Math.round((ui.position.top - origPosition.top) / slotHeight) * opt("slotMinutes"), 
minuteDelta != prevMinuteDelta && (allDay || updateTimeText(minuteDelta), prevMinuteDelta = minuteDelta);
},
stop:function(ev, ui) {
var cell = hoverListener.stop();
clearOverlays(), trigger("eventDragStop", eventElement, event, ev, ui), cell && (dayDelta || minuteDelta || allDay) ? eventDrop(this, event, dayDelta, allDay ? 0 :minuteDelta, allDay, ev, ui) :(resetElement(), 
eventElement.css("filter", ""), eventElement.css(origPosition), updateTimeText(0), 
showEvents(event, eventElement));
}
});
}
function resizableSlotEvent(event, eventElement, timeElement) {
var slotDelta, prevSlotDelta, slotHeight = getSlotHeight();
eventElement.resizable({
handles:{
s:"div.ui-resizable-s"
},
grid:slotHeight,
start:function(ev, ui) {
slotDelta = prevSlotDelta = 0, hideEvents(event, eventElement), eventElement.css("z-index", 9), 
trigger("eventResizeStart", this, event, ev, ui);
},
resize:function(ev, ui) {
slotDelta = Math.round((Math.max(slotHeight, eventElement.height()) - ui.originalSize.height) / slotHeight), 
slotDelta != prevSlotDelta && (timeElement.text(formatDates(event.start, slotDelta || event.end ? addMinutes(eventEnd(event), opt("slotMinutes") * slotDelta) :null, opt("timeFormat"))), 
prevSlotDelta = slotDelta);
},
stop:function(ev, ui) {
trigger("eventResizeStop", this, event, ev, ui), slotDelta ? eventResize(this, event, 0, opt("slotMinutes") * slotDelta, ev, ui) :(eventElement.css("z-index", 8), 
showEvents(event, eventElement));
}
});
}
var t = this;
t.renderEvents = renderEvents, t.compileDaySegs = compileDaySegs, t.clearEvents = clearEvents, 
t.slotSegHtml = slotSegHtml, t.bindDaySeg = bindDaySeg, DayEventRenderer.call(t);
var opt = t.opt, trigger = t.trigger, isEventDraggable = t.isEventDraggable, isEventResizable = t.isEventResizable, eventEnd = t.eventEnd, reportEvents = t.reportEvents, reportEventClear = t.reportEventClear, eventElementHandlers = t.eventElementHandlers, setHeight = t.setHeight, getDaySegmentContainer = t.getDaySegmentContainer, getSlotSegmentContainer = t.getSlotSegmentContainer, getHoverListener = t.getHoverListener, getMaxMinute = t.getMaxMinute, getMinMinute = t.getMinMinute, timePosition = t.timePosition, colContentLeft = t.colContentLeft, colContentRight = t.colContentRight, renderDaySegs = t.renderDaySegs, resizableDayEvent = t.resizableDayEvent, getColCnt = t.getColCnt, getColWidth = t.getColWidth, getSlotHeight = t.getSlotHeight, getBodyContent = t.getBodyContent, reportEventElement = t.reportEventElement, showEvents = t.showEvents, hideEvents = t.hideEvents, eventDrop = t.eventDrop, eventResize = t.eventResize, renderDayOverlay = t.renderDayOverlay, clearOverlays = t.clearOverlays, calendar = t.calendar, formatDate = calendar.formatDate, formatDates = calendar.formatDates;
}
function countForwardSegs(levels) {
var i, j, k, level, segForward, segBack;
for (i = levels.length - 1; i > 0; i--) for (level = levels[i], j = 0; j < level.length; j++) for (segForward = level[j], 
k = 0; k < levels[i - 1].length; k++) segBack = levels[i - 1][k], segsCollide(segForward, segBack) && (segBack.forward = Math.max(segBack.forward || 0, (segForward.forward || 0) + 1));
}
function View(element, calendar, viewName) {
function opt(name, viewNameOverride) {
var v = options[name];
return "object" == typeof v ? smartProperty(v, viewNameOverride || viewName) :v;
}
function trigger(name, thisObj) {
return calendar.trigger.apply(calendar, [ name, thisObj || t ].concat(Array.prototype.slice.call(arguments, 2), [ t ]));
}
function isEventDraggable(event) {
return isEventEditable(event) && !opt("disableDragging");
}
function isEventResizable(event) {
return isEventEditable(event) && !opt("disableResizing");
}
function isEventEditable(event) {
return firstDefined(event.editable, (event.source || {}).editable, opt("editable"));
}
function reportEvents(events) {
eventsByID = {};
var i, event, len = events.length;
for (i = 0; len > i; i++) event = events[i], eventsByID[event._id] ? eventsByID[event._id].push(event) :eventsByID[event._id] = [ event ];
}
function eventEnd(event) {
return event.end ? cloneDate(event.end) :defaultEventEnd(event);
}
function reportEventElement(event, element) {
eventElements.push(element), eventElementsByID[event._id] ? eventElementsByID[event._id].push(element) :eventElementsByID[event._id] = [ element ];
}
function reportEventClear() {
eventElements = [], eventElementsByID = {};
}
function eventElementHandlers(event, eventElement) {
eventElement.click(function(ev) {
return eventElement.hasClass("ui-draggable-dragging") || eventElement.hasClass("ui-resizable-resizing") ? void 0 :trigger("eventClick", this, event, ev);
}).hover(function(ev) {
trigger("eventMouseover", this, event, ev);
}, function(ev) {
trigger("eventMouseout", this, event, ev);
});
}
function showEvents(event, exceptElement) {
eachEventElement(event, exceptElement, "show");
}
function hideEvents(event, exceptElement) {
eachEventElement(event, exceptElement, "hide");
}
function eachEventElement(event, exceptElement, funcName) {
var i, elements = eventElementsByID[event._id], len = elements.length;
for (i = 0; len > i; i++) exceptElement && elements[i][0] == exceptElement[0] || elements[i][funcName]();
}
function eventDrop(e, event, dayDelta, minuteDelta, allDay, ev, ui) {
var oldAllDay = event.allDay, eventId = event._id;
moveEvents(eventsByID[eventId], dayDelta, minuteDelta, allDay), trigger("eventDrop", e, event, dayDelta, minuteDelta, allDay, function() {
moveEvents(eventsByID[eventId], -dayDelta, -minuteDelta, oldAllDay), reportEventChange(eventId);
}, ev, ui), reportEventChange(eventId);
}
function eventResize(e, event, dayDelta, minuteDelta, ev, ui) {
var eventId = event._id;
elongateEvents(eventsByID[eventId], dayDelta, minuteDelta), trigger("eventResize", e, event, dayDelta, minuteDelta, function() {
elongateEvents(eventsByID[eventId], -dayDelta, -minuteDelta), reportEventChange(eventId);
}, ev, ui), reportEventChange(eventId);
}
function moveEvents(events, dayDelta, minuteDelta, allDay) {
minuteDelta = minuteDelta || 0;
for (var e, len = events.length, i = 0; len > i; i++) e = events[i], allDay !== undefined && (e.allDay = allDay), 
addMinutes(addDays(e.start, dayDelta, !0), minuteDelta), e.end && (e.end = addMinutes(addDays(e.end, dayDelta, !0), minuteDelta)), 
normalizeEvent(e, options);
}
function elongateEvents(events, dayDelta, minuteDelta) {
minuteDelta = minuteDelta || 0;
for (var e, len = events.length, i = 0; len > i; i++) e = events[i], e.end = addMinutes(addDays(eventEnd(e), dayDelta, !0), minuteDelta), 
normalizeEvent(e, options);
}
var t = this;
t.element = element, t.calendar = calendar, t.name = viewName, t.opt = opt, t.trigger = trigger, 
t.isEventDraggable = isEventDraggable, t.isEventResizable = isEventResizable, t.reportEvents = reportEvents, 
t.eventEnd = eventEnd, t.reportEventElement = reportEventElement, t.reportEventClear = reportEventClear, 
t.eventElementHandlers = eventElementHandlers, t.showEvents = showEvents, t.hideEvents = hideEvents, 
t.eventDrop = eventDrop, t.eventResize = eventResize;
var defaultEventEnd = t.defaultEventEnd, normalizeEvent = calendar.normalizeEvent, reportEventChange = calendar.reportEventChange, eventsByID = {}, eventElements = [], eventElementsByID = {}, options = calendar.options;
}
function DayEventRenderer() {
function renderDaySegs(segs, modifiedEventId) {
var rowDivs, rowI, levelI, colHeights, j, seg, top, k, segmentContainer = getDaySegmentContainer(), rowCnt = getRowCnt(), colCnt = getColCnt(), i = 0, segCnt = segs.length;
for (segmentContainer[0].innerHTML = daySegHTML(segs), daySegElementResolve(segs, segmentContainer.children()), 
daySegElementReport(segs), daySegHandlers(segs, segmentContainer, modifiedEventId), 
daySegCalcHSides(segs), daySegSetWidths(segs), daySegCalcHeights(segs), rowDivs = getRowDivs(), 
rowI = 0; rowCnt > rowI; rowI++) {
for (levelI = 0, colHeights = [], j = 0; colCnt > j; j++) colHeights[j] = 0;
for (;segCnt > i && (seg = segs[i]).row == rowI; ) {
for (top = arrayMax(colHeights.slice(seg.startCol, seg.endCol)), seg.top = top, 
top += seg.outerHeight, k = seg.startCol; k < seg.endCol; k++) colHeights[k] = top;
i++;
}
rowDivs[rowI].height(arrayMax(colHeights));
}
daySegSetTops(segs, getRowTops(rowDivs));
}
function renderTempDaySegs(segs, adjustRow, adjustTop) {
var elements, i, element, tempContainer = $("<div/>"), segmentContainer = getDaySegmentContainer(), segCnt = segs.length;
for (tempContainer[0].innerHTML = daySegHTML(segs), elements = tempContainer.children(), 
segmentContainer.append(elements), daySegElementResolve(segs, elements), daySegCalcHSides(segs), 
daySegSetWidths(segs), daySegCalcHeights(segs), daySegSetTops(segs, getRowTops(getRowDivs())), 
elements = [], i = 0; segCnt > i; i++) element = segs[i].element, element && (segs[i].row === adjustRow && element.css("top", adjustTop), 
elements.push(element[0]));
return $(elements);
}
function daySegHTML(segs) {
var i, seg, event, url, classes, leftCol, rightCol, left, right, skinCss, rtl = opt("isRTL"), segCnt = segs.length, bounds = allDayBounds(), minLeft = bounds.left, maxLeft = bounds.right, html = "";
for (i = 0; segCnt > i; i++) seg = segs[i], event = seg.event, classes = [ "fc-event", "fc-event-skin", "fc-event-hori" ], 
isEventDraggable(event) && classes.push("fc-event-draggable"), rtl ? (seg.isStart && classes.push("fc-corner-right"), 
seg.isEnd && classes.push("fc-corner-left"), leftCol = dayOfWeekCol(seg.end.getDay() - 1), 
rightCol = dayOfWeekCol(seg.start.getDay()), left = seg.isEnd ? colContentLeft(leftCol) :minLeft, 
right = seg.isStart ? colContentRight(rightCol) :maxLeft) :(seg.isStart && classes.push("fc-corner-left"), 
seg.isEnd && classes.push("fc-corner-right"), leftCol = dayOfWeekCol(seg.start.getDay()), 
rightCol = dayOfWeekCol(seg.end.getDay() - 1), left = seg.isStart ? colContentLeft(leftCol) :minLeft, 
right = seg.isEnd ? colContentRight(rightCol) :maxLeft), classes = classes.concat(event.className), 
event.source && (classes = classes.concat(event.source.className || [])), url = event.url, 
skinCss = getSkinCss(event, opt), html += url ? "<a href='" + htmlEscape(url) + "'" :"<div", 
html += " class='" + classes.join(" ") + "' style='position:absolute;z-index:8;left:" + left + "px;" + skinCss + "'><div class='fc-event-inner fc-event-skin'" + (skinCss ? " style='" + skinCss + "'" :"") + ">", 
!event.allDay && seg.isStart && (html += "<span class='fc-event-time'>" + htmlEscape(formatDates(event.start, event.end, opt("timeFormat"))) + "</span>"), 
html += "<span class='fc-event-title'>" + htmlEscape(event.title) + "</span></div>", 
seg.isEnd && isEventResizable(event) && (html += "<div class='ui-resizable-handle ui-resizable-" + (rtl ? "w" :"e") + "'>&nbsp;&nbsp;&nbsp;</div>"), 
html += "</" + (url ? "a" :"div") + ">", seg.left = left, seg.outerWidth = right - left, 
seg.startCol = leftCol, seg.endCol = rightCol + 1;
return html;
}
function daySegElementResolve(segs, elements) {
var i, seg, event, element, triggerRes, segCnt = segs.length;
for (i = 0; segCnt > i; i++) seg = segs[i], event = seg.event, element = $(elements[i]), 
triggerRes = trigger("eventRender", event, event, element), triggerRes === !1 ? element.remove() :(triggerRes && triggerRes !== !0 && (triggerRes = $(triggerRes).css({
position:"absolute",
left:seg.left
}), element.replaceWith(triggerRes), element = triggerRes), seg.element = element);
}
function daySegElementReport(segs) {
var i, seg, element, segCnt = segs.length;
for (i = 0; segCnt > i; i++) seg = segs[i], element = seg.element, element && reportEventElement(seg.event, element);
}
function daySegHandlers(segs, segmentContainer, modifiedEventId) {
var i, seg, element, event, segCnt = segs.length;
for (i = 0; segCnt > i; i++) seg = segs[i], element = seg.element, element && (event = seg.event, 
event._id === modifiedEventId ? bindDaySeg(event, element, seg) :element[0]._fci = i);
lazySegBind(segmentContainer, segs, bindDaySeg);
}
function daySegCalcHSides(segs) {
var i, seg, element, key, val, segCnt = segs.length, hsideCache = {};
for (i = 0; segCnt > i; i++) seg = segs[i], element = seg.element, element && (key = seg.key = cssKey(element[0]), 
val = hsideCache[key], val === undefined && (val = hsideCache[key] = hsides(element, !0)), 
seg.hsides = val);
}
function daySegSetWidths(segs) {
var i, seg, element, segCnt = segs.length;
for (i = 0; segCnt > i; i++) seg = segs[i], element = seg.element, element && (element[0].style.width = Math.max(0, seg.outerWidth - seg.hsides) + "px");
}
function daySegCalcHeights(segs) {
var i, seg, element, key, val, segCnt = segs.length, vmarginCache = {};
for (i = 0; segCnt > i; i++) seg = segs[i], element = seg.element, element && (key = seg.key, 
val = vmarginCache[key], val === undefined && (val = vmarginCache[key] = vmargins(element)), 
seg.outerHeight = element[0].offsetHeight + val);
}
function getRowDivs() {
var i, rowCnt = getRowCnt(), rowDivs = [];
for (i = 0; rowCnt > i; i++) rowDivs[i] = allDayRow(i).find("td:first div.fc-day-content > div");
return rowDivs;
}
function getRowTops(rowDivs) {
var i, rowCnt = rowDivs.length, tops = [];
for (i = 0; rowCnt > i; i++) tops[i] = rowDivs[i][0].offsetTop;
return tops;
}
function daySegSetTops(segs, rowTops) {
var i, seg, element, event, segCnt = segs.length;
for (i = 0; segCnt > i; i++) seg = segs[i], element = seg.element, element && (element[0].style.top = rowTops[seg.row] + (seg.top || 0) + "px", 
event = seg.event, trigger("eventAfterRender", event, event, element));
}
function resizableDayEvent(event, element, seg) {
var rtl = opt("isRTL"), direction = rtl ? "w" :"e", handle = element.find("div.ui-resizable-" + direction), isResizing = !1;
disableTextSelection(element), element.mousedown(function(ev) {
ev.preventDefault();
}).click(function(ev) {
isResizing && (ev.preventDefault(), ev.stopImmediatePropagation());
}), handle.mousedown(function(ev) {
function mouseup(ev) {
trigger("eventResizeStop", this, event, ev), $("body").css("cursor", ""), hoverListener.stop(), 
clearOverlays(), dayDelta && eventResize(this, event, dayDelta, 0, ev), setTimeout(function() {
isResizing = !1;
}, 0);
}
if (1 == ev.which) {
isResizing = !0;
var dayDelta, helpers, hoverListener = t.getHoverListener(), rowCnt = getRowCnt(), colCnt = getColCnt(), dis = rtl ? -1 :1, dit = rtl ? colCnt - 1 :0, elementTop = element.css("top"), eventCopy = $.extend({}, event), minCell = dateCell(event.start);
clearSelection(), $("body").css("cursor", direction + "-resize").one("mouseup", mouseup), 
trigger("eventResizeStart", this, event, ev), hoverListener.start(function(cell, origCell) {
if (cell) {
var r = Math.max(minCell.row, cell.row), c = cell.col;
1 == rowCnt && (r = 0), r == minCell.row && (c = rtl ? Math.min(minCell.col, c) :Math.max(minCell.col, c)), 
dayDelta = 7 * r + c * dis + dit - (7 * origCell.row + origCell.col * dis + dit);
var newEnd = addDays(eventEnd(event), dayDelta, !0);
if (dayDelta) {
eventCopy.end = newEnd;
var oldHelpers = helpers;
helpers = renderTempDaySegs(compileDaySegs([ eventCopy ]), seg.row, elementTop), 
helpers.find("*").css("cursor", direction + "-resize"), oldHelpers && oldHelpers.remove(), 
hideEvents(event);
} else helpers && (showEvents(event), helpers.remove(), helpers = null);
clearOverlays(), renderDayOverlay(event.start, addDays(cloneDate(newEnd), 1));
}
}, ev);
}
});
}
var t = this;
t.renderDaySegs = renderDaySegs, t.resizableDayEvent = resizableDayEvent;
var opt = t.opt, trigger = t.trigger, isEventDraggable = t.isEventDraggable, isEventResizable = t.isEventResizable, eventEnd = t.eventEnd, reportEventElement = t.reportEventElement, showEvents = t.showEvents, hideEvents = t.hideEvents, eventResize = t.eventResize, getRowCnt = t.getRowCnt, getColCnt = t.getColCnt, allDayRow = (t.getColWidth, 
t.allDayRow), allDayBounds = t.allDayBounds, colContentLeft = t.colContentLeft, colContentRight = t.colContentRight, dayOfWeekCol = t.dayOfWeekCol, dateCell = t.dateCell, compileDaySegs = t.compileDaySegs, getDaySegmentContainer = t.getDaySegmentContainer, bindDaySeg = t.bindDaySeg, formatDates = t.calendar.formatDates, renderDayOverlay = t.renderDayOverlay, clearOverlays = t.clearOverlays, clearSelection = t.clearSelection;
}
function SelectionManager() {
function select(startDate, endDate, allDay) {
unselect(), endDate || (endDate = defaultSelectionEnd(startDate, allDay)), renderSelection(startDate, endDate, allDay), 
reportSelection(startDate, endDate, allDay);
}
function unselect(ev) {
selected && (selected = !1, clearSelection(), trigger("unselect", null, ev));
}
function reportSelection(startDate, endDate, allDay, ev) {
selected = !0, trigger("select", null, startDate, endDate, allDay, ev);
}
function daySelectionMousedown(ev) {
var cellDate = t.cellDate, cellIsAllDay = t.cellIsAllDay, hoverListener = t.getHoverListener(), reportDayClick = t.reportDayClick;
if (1 == ev.which && opt("selectable")) {
unselect(ev);
var dates;
hoverListener.start(function(cell, origCell) {
clearSelection(), cell && cellIsAllDay(cell) ? (dates = [ cellDate(origCell), cellDate(cell) ].sort(cmp), 
renderSelection(dates[0], dates[1], !0)) :dates = null;
}, ev), $(document).one("mouseup", function(ev) {
hoverListener.stop(), dates && (+dates[0] == +dates[1] && reportDayClick(dates[0], !0, ev), 
reportSelection(dates[0], dates[1], !0, ev));
});
}
}
var t = this;
t.select = select, t.unselect = unselect, t.reportSelection = reportSelection, t.daySelectionMousedown = daySelectionMousedown;
var opt = t.opt, trigger = t.trigger, defaultSelectionEnd = t.defaultSelectionEnd, renderSelection = t.renderSelection, clearSelection = t.clearSelection, selected = !1;
opt("selectable") && opt("unselectAuto") && $(document).mousedown(function(ev) {
var ignore = opt("unselectCancel");
ignore && $(ev.target).parents(ignore).length || unselect(ev);
});
}
function OverlayManager() {
function renderOverlay(rect, parent) {
var e = unusedOverlays.shift();
return e || (e = $("<div class='fc-cell-overlay' style='position:absolute;z-index:3'/>")), 
e[0].parentNode != parent[0] && e.appendTo(parent), usedOverlays.push(e.css(rect).show()), 
e;
}
function clearOverlays() {
for (var e; e = usedOverlays.shift(); ) unusedOverlays.push(e.hide().unbind());
}
var t = this;
t.renderOverlay = renderOverlay, t.clearOverlays = clearOverlays;
var usedOverlays = [], unusedOverlays = [];
}
function CoordinateGrid(buildFunc) {
var rows, cols, t = this;
t.build = function() {
rows = [], cols = [], buildFunc(rows, cols);
}, t.cell = function(x, y) {
var i, rowCnt = rows.length, colCnt = cols.length, r = -1, c = -1;
for (i = 0; rowCnt > i; i++) if (y >= rows[i][0] && y < rows[i][1]) {
r = i;
break;
}
for (i = 0; colCnt > i; i++) if (x >= cols[i][0] && x < cols[i][1]) {
c = i;
break;
}
return r >= 0 && c >= 0 ? {
row:r,
col:c
} :null;
}, t.rect = function(row0, col0, row1, col1, originElement) {
var origin = originElement.offset();
return {
top:rows[row0][0] - origin.top,
left:cols[col0][0] - origin.left,
width:cols[col1][1] - cols[col0][0],
height:rows[row1][1] - rows[row0][0]
};
};
}
function HoverListener(coordinateGrid) {
function mouse(ev) {
_fixUIEvent(ev);
var newCell = coordinateGrid.cell(ev.pageX, ev.pageY);
(!newCell != !cell || newCell && (newCell.row != cell.row || newCell.col != cell.col)) && (newCell ? (firstCell || (firstCell = newCell), 
change(newCell, firstCell, newCell.row - firstCell.row, newCell.col - firstCell.col)) :change(newCell, firstCell), 
cell = newCell);
}
var bindType, change, firstCell, cell, t = this;
t.start = function(_change, ev, _bindType) {
change = _change, firstCell = cell = null, coordinateGrid.build(), mouse(ev), bindType = _bindType || "mousemove", 
$(document).bind(bindType, mouse);
}, t.stop = function() {
return $(document).unbind(bindType, mouse), cell;
};
}
function _fixUIEvent(event) {
event.pageX === undefined && (event.pageX = event.originalEvent.pageX, event.pageY = event.originalEvent.pageY);
}
function HorizontalPositionCache(getElement) {
function e(i) {
return elements[i] = elements[i] || getElement(i);
}
var t = this, elements = {}, lefts = {}, rights = {};
t.left = function(i) {
return lefts[i] = lefts[i] === undefined ? e(i).position().left :lefts[i];
}, t.right = function(i) {
return rights[i] = rights[i] === undefined ? t.left(i) + e(i).width() :rights[i];
}, t.clear = function() {
elements = {}, lefts = {}, rights = {};
};
}
var defaults = {
defaultView:"month",
aspectRatio:1.35,
header:{
left:"title",
center:"",
right:"today prev,next"
},
weekends:!0,
allDayDefault:!0,
ignoreTimezone:!0,
lazyFetching:!0,
startParam:"start",
endParam:"end",
titleFormat:{
month:"MMMM yyyy",
week:"MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}",
day:"dddd, MMM d, yyyy"
},
columnFormat:{
month:"ddd",
week:"ddd M/d",
day:"dddd M/d"
},
timeFormat:{
"":"h(:mm)t"
},
isRTL:!1,
firstDay:0,
monthNames:[ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
monthNamesShort:[ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
dayNames:[ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
dayNamesShort:[ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
buttonText:{
prev:"&nbsp;&#9668;&nbsp;",
next:"&nbsp;&#9658;&nbsp;",
prevYear:"&nbsp;&lt;&lt;&nbsp;",
nextYear:"&nbsp;&gt;&gt;&nbsp;",
today:"today",
month:"month",
week:"week",
day:"day"
},
theme:!1,
buttonIcons:{
prev:"circle-triangle-w",
next:"circle-triangle-e"
},
unselectAuto:!0,
dropAccept:"*"
}, rtlDefaults = {
header:{
left:"next,prev today",
center:"",
right:"title"
},
buttonText:{
prev:"&nbsp;&#9658;&nbsp;",
next:"&nbsp;&#9668;&nbsp;",
prevYear:"&nbsp;&gt;&gt;&nbsp;",
nextYear:"&nbsp;&lt;&lt;&nbsp;"
},
buttonIcons:{
prev:"circle-triangle-e",
next:"circle-triangle-w"
}
}, fc = $.fullCalendar = {
version:"1.5.4"
}, fcViews = fc.views = {};
$.fn.fullCalendar = function(options) {
if ("string" == typeof options) {
var res, args = Array.prototype.slice.call(arguments, 1);
return this.each(function() {
var calendar = $.data(this, "fullCalendar");
if (calendar && $.isFunction(calendar[options])) {
var r = calendar[options].apply(calendar, args);
res === undefined && (res = r), "destroy" == options && $.removeData(this, "fullCalendar");
}
}), res !== undefined ? res :this;
}
var eventSources = options.eventSources || [];
return delete options.eventSources, options.events && (eventSources.push(options.events), 
delete options.events), options = $.extend(!0, {}, defaults, options.isRTL || options.isRTL === undefined && defaults.isRTL ? rtlDefaults :{}, options), 
this.each(function(i, _element) {
var element = $(_element), calendar = new Calendar(element, options, eventSources);
element.data("fullCalendar", calendar), calendar.render();
}), this;
}, fc.sourceNormalizers = [], fc.sourceFetchers = [];
var ajaxDefaults = {
dataType:"json",
cache:!1
}, eventGUID = 1;
fc.addDays = addDays, fc.cloneDate = cloneDate, fc.parseDate = parseDate, fc.parseISO8601 = parseISO8601, 
fc.parseTime = parseTime, fc.formatDate = formatDate, fc.formatDates = formatDates;
var dayIDs = [ "sun", "mon", "tue", "wed", "thu", "fri", "sat" ], DAY_MS = 864e5, HOUR_MS = 36e5, MINUTE_MS = 6e4, dateFormatters = {
s:function(d) {
return d.getSeconds();
},
ss:function(d) {
return zeroPad(d.getSeconds());
},
m:function(d) {
return d.getMinutes();
},
mm:function(d) {
return zeroPad(d.getMinutes());
},
h:function(d) {
return d.getHours() % 12 || 12;
},
hh:function(d) {
return zeroPad(d.getHours() % 12 || 12);
},
H:function(d) {
return d.getHours();
},
HH:function(d) {
return zeroPad(d.getHours());
},
d:function(d) {
return d.getDate();
},
dd:function(d) {
return zeroPad(d.getDate());
},
ddd:function(d, o) {
return o.dayNamesShort[d.getDay()];
},
dddd:function(d, o) {
return o.dayNames[d.getDay()];
},
M:function(d) {
return d.getMonth() + 1;
},
MM:function(d) {
return zeroPad(d.getMonth() + 1);
},
MMM:function(d, o) {
return o.monthNamesShort[d.getMonth()];
},
MMMM:function(d, o) {
return o.monthNames[d.getMonth()];
},
yy:function(d) {
return (d.getFullYear() + "").substring(2);
},
yyyy:function(d) {
return d.getFullYear();
},
t:function(d) {
return d.getHours() < 12 ? "a" :"p";
},
tt:function(d) {
return d.getHours() < 12 ? "am" :"pm";
},
T:function(d) {
return d.getHours() < 12 ? "A" :"P";
},
TT:function(d) {
return d.getHours() < 12 ? "AM" :"PM";
},
u:function(d) {
return formatDate(d, "yyyy-MM-dd'T'HH:mm:ss'Z'");
},
S:function(d) {
var date = d.getDate();
return date > 10 && 20 > date ? "th" :[ "st", "nd", "rd" ][date % 10 - 1] || "th";
}
};
fc.applyAll = applyAll, fcViews.month = MonthView, fcViews.basicWeek = BasicWeekView, 
fcViews.basicDay = BasicDayView, setDefaults({
weekMode:"fixed"
}), fcViews.agendaWeek = AgendaWeekView, fcViews.agendaDay = AgendaDayView, setDefaults({
allDaySlot:!0,
allDayText:"all-day",
firstHour:6,
slotMinutes:30,
defaultEventMinutes:120,
axisFormat:"h(:mm)tt",
timeFormat:{
agenda:"h:mm{ - h:mm}"
},
dragOpacity:{
agenda:.5
},
minTime:0,
maxTime:24
});
}(jQuery);