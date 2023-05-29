/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. *
 */
/*
 * Copyright (c) 2007-2009 unscriptable.com and John M. Hann
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the “Software”), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * Except as contained in this notice, the name(s) of the above
 * copyright holders (unscriptable.com and John M. Hann) shall not be
 * used in advertising or otherwise to promote the sale, use or other
 * dealings in this Software without prior written authorization.
 *
 * http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
 *
 */
!function($, sr) {
"use strict";
var debounce = function(func, threshold, execAsap) {
var timeout;
return function() {
function delayed() {
execAsap || func.apply(obj, args), timeout = null;
}
var obj = this, args = arguments;
timeout ? clearTimeout(timeout) :execAsap && func.apply(obj, args), timeout = setTimeout(delayed, threshold || 100);
};
};
jQuery.fn[sr] = function(fn) {
return fn ? this.bind("resize", debounce(fn)) :this.trigger(sr);
};
}(jQuery, "smartresize"), function($) {
"use strict";
function NextWS_params() {
this.reset();
}
function applyBalanceText() {
$(".balance-text").balanceText();
}
var style = document.documentElement.style, hasTextWrap = style.textWrap || style.WebkitTextWrap || style.MozTextWrap || style.MsTextWrap || style.OTextWrap;
NextWS_params.prototype.reset = function() {
this.index = 0, this.width = 0;
};
var isWS = function(c) {
return Boolean(c.match(/^\s$/));
}, removeTags = function($el) {
$el.find('br[data-owner="balance-text"]').replaceWith(" ");
var $span = $el.find('span[data-owner="balance-text"]');
if ($span.length > 0) {
var txt = "";
$span.each(function() {
txt += $(this).text(), $(this).remove();
}), $el.html(txt);
}
}, isJustified = function($el) {
return style = $el.get(0).currentStyle || window.getComputedStyle($el.get(0), null), 
"justify" === style.textAlign;
}, justify = function($el, txt, conWidth) {
txt = $.trim(txt);
var words = txt.split(" ").length;
if (txt += " ", 2 > words) return txt;
var tmp = $("<span></span>").html(txt);
$el.append(tmp);
var size = tmp.width();
tmp.remove();
var wordSpacing = Math.floor((conWidth - size) / (words - 1));
return tmp.css("word-spacing", wordSpacing + "px").attr("data-owner", "balance-text"), 
$("<div></div>").append(tmp).html();
}, isBreakOpportunity = function(txt, index) {
return 0 === index || index === txt.length || isWS(txt.charAt(index - 1)) && !isWS(txt.charAt(index));
}, findBreakOpportunity = function($el, txt, conWidth, desWidth, dir, c, ret) {
for (var w; ;) {
for (;!isBreakOpportunity(txt, c); ) c += dir;
if ($el.text(txt.substr(0, c)), w = $el.width(), 0 > dir ? desWidth >= w || 0 >= w || 0 === c :w >= desWidth || w >= conWidth || c === txt.length) break;
c += dir;
}
ret.index = c, ret.width = w;
};
$.fn.balanceText = function() {
return hasTextWrap ? this :this.each(function() {
var $this = $(this), maxTextWidth = 5e3;
removeTags($this);
var oldLH = "";
$this.attr("style") && $this.attr("style").indexOf("line-height") >= 0 && (oldLH = $this.css("line-height")), 
$this.css("line-height", "normal");
var containerWidth = $this.width(), containerHeight = $this.height(), oldWS = $this.css("white-space"), oldFloat = $this.css("float"), oldDisplay = $this.css("display"), oldPosition = $this.css("position");
$this.css({
"white-space":"nowrap",
"float":"none",
display:"inline",
position:"static"
});
var nowrapWidth = $this.width(), nowrapHeight = $this.height(), guessSpaceWidth = "pre-wrap" === oldWS ? 0 :nowrapHeight / 4;
if (containerWidth > 0 && nowrapWidth > containerWidth && maxTextWidth > nowrapWidth) {
for (var remainingText = $this.text(), newText = "", lineText = "", shouldJustify = isJustified($this), totLines = Math.round(containerHeight / nowrapHeight), remLines = totLines; remLines > 1; ) {
var desiredWidth = Math.round((nowrapWidth + guessSpaceWidth) / remLines - guessSpaceWidth), guessIndex = Math.round((remainingText.length + 1) / remLines) - 1, le = new NextWS_params();
findBreakOpportunity($this, remainingText, containerWidth, desiredWidth, -1, guessIndex, le);
var ge = new NextWS_params();
guessIndex = le.index, findBreakOpportunity($this, remainingText, containerWidth, desiredWidth, 1, guessIndex, ge), 
le.reset(), guessIndex = ge.index, findBreakOpportunity($this, remainingText, containerWidth, desiredWidth, -1, guessIndex, le);
var splitIndex;
splitIndex = 0 === le.index ? ge.index :containerWidth < ge.width || le.index === ge.index ? le.index :Math.abs(desiredWidth - le.width) < Math.abs(ge.width - desiredWidth) ? le.index :ge.index, 
lineText = remainingText.substr(0, splitIndex), shouldJustify ? newText += justify($this, lineText, containerWidth) :(newText += lineText.replace(/\s+$/, ""), 
newText += '<br data-owner="balance-text" />'), remainingText = remainingText.substr(splitIndex), 
remLines--, $this.text(remainingText), nowrapWidth = $this.width();
}
shouldJustify ? $this.html(newText + justify($this, remainingText, containerWidth)) :$this.html(newText + remainingText);
}
$this.css({
position:oldPosition,
display:oldDisplay,
"float":oldFloat,
"white-space":oldWS,
"line-height":oldLH
});
});
}, $(window).ready(applyBalanceText), $(window).smartresize(applyBalanceText);
}(jQuery);