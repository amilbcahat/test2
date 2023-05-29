/*!
  jQuery Wookmark plugin 1.0.0
  @name jquery.wookmark.js
  @author Christoph Ono (chri@sto.ph or @gbks)
  @version 1.0.0
  @date 1/17/2013
  @category jQuery plugin
  @copyright (c) 2009-2012 Christoph Ono (www.wookmark.com)
  @license Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*/
$.fn.wookmark = function(options) {
this.wookmarkOptions ? options && (this.wookmarkOptions = $.extend(this.wookmarkOptions, options)) :this.wookmarkOptions = $.extend({
container:$("body"),
offset:2,
autoResize:!1,
itemWidth:$(this[0]).outerWidth(),
resizeDelay:50
}, options), this.wookmarkColumns || (this.wookmarkColumns = null, this.wookmarkContainerWidth = null), 
this.wookmarkLayout = function() {
var columnWidth = this.wookmarkOptions.itemWidth + this.wookmarkOptions.offset, containerWidth = this.wookmarkOptions.container.width(), columns = Math.floor((containerWidth + this.wookmarkOptions.offset) / columnWidth), offset = Math.round((containerWidth - (columns * columnWidth - this.wookmarkOptions.offset)) / 2), bottom = 0;
bottom = null != this.wookmarkColumns && this.wookmarkColumns.length == columns ? this.wookmarkLayoutColumns(columnWidth, offset) :this.wookmarkLayoutFull(columnWidth, columns, offset), 
this.wookmarkOptions.container.css("height", bottom + "px");
}, this.wookmarkLayoutFull = function(columnWidth, columns, offset) {
for (var heights = []; heights.length < columns; ) heights.push(0);
for (this.wookmarkColumns = []; this.wookmarkColumns.length < columns; ) this.wookmarkColumns.push([]);
for (var item, i = 0, k = 0, length = this.length, shortest = null, shortestIndex = null, bottom = 0; length > i; i++) {
for (item = $(this[i]), shortest = null, shortestIndex = 0, k = 0; columns > k; k++) (null == shortest || heights[k] < shortest) && (shortest = heights[k], 
shortestIndex = k);
item.css({
position:"absolute",
top:shortest + "px",
left:shortestIndex * columnWidth + offset + "px"
}), heights[shortestIndex] = shortest + item.outerHeight() + this.wookmarkOptions.offset, 
bottom = Math.max(bottom, heights[shortestIndex]), this.wookmarkColumns[shortestIndex].push(item);
}
return bottom;
}, this.wookmarkLayoutColumns = function(columnWidth, offset) {
for (var heights = []; heights.length < this.wookmarkColumns.length; ) heights.push(0);
for (var column, kLength, item, i = 0, length = this.wookmarkColumns.length, k = 0, bottom = 0; length > i; i++) for (column = this.wookmarkColumns[i], 
kLength = column.length, k = 0; kLength > k; k++) item = column[k], item.css({
left:i * columnWidth + offset + "px",
top:heights[i] + "px"
}), heights[i] += item.outerHeight() + this.wookmarkOptions.offset, bottom = Math.max(bottom, heights[i]);
return bottom;
}, this.wookmarkResizeTimer = null, this.wookmarkResizeMethod || (this.wookmarkResizeMethod = null), 
this.wookmarkOptions.autoResize && (this.wookmarkOnResize = function() {
this.wookmarkResizeTimer && clearTimeout(this.wookmarkResizeTimer), this.wookmarkResizeTimer = setTimeout($.proxy(this.wookmarkLayout, this), this.wookmarkOptions.resizeDelay);
}, this.wookmarkResizeMethod || (this.wookmarkResizeMethod = $.proxy(this.wookmarkOnResize, this)), 
$(window).resize(this.wookmarkResizeMethod)), this.wookmarkClear = function() {
this.wookmarkResizeTimer && (clearTimeout(this.wookmarkResizeTimer), this.wookmarkResizeTimer = null), 
this.wookmarkResizeMethod && $(window).unbind("resize", this.wookmarkResizeMethod);
}, this.wookmarkLayout(), this.show();
};