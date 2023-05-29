/* ===================================================
 * bootstrap-transition.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
function require__(path, parent, orig) {
var resolved = require__.resolve(path);
if (null == resolved) {
orig = orig || path, parent = parent || "root";
var err = new Error('Failed to require__ "' + orig + '" from "' + parent + '"');
throw err.path = orig, err.parent = parent, err.require__ = !0, err;
}
var module = require__.modules[resolved];
if (!module._resolving && !module.exports) {
var mod = {};
mod.exports = {}, mod.client = mod.component = !0, module._resolving = !0, module.call(this, mod.exports, require__.relative(resolved), mod), 
delete module._resolving, module.exports = mod.exports;
}
return module.exports;
}

!function($) {
$(function() {
"use strict";
$.support.transition = function() {
var transitionEnd = function() {
var name, el = document.createElement("bootstrap"), transEndEventNames = {
WebkitTransition:"webkitTransitionEnd",
MozTransition:"transitionend",
OTransition:"oTransitionEnd",
msTransition:"MSTransitionEnd",
transition:"transitionend"
};
for (name in transEndEventNames) if (void 0 !== el.style[name]) return transEndEventNames[name];
}();
return transitionEnd && {
end:transitionEnd
};
}();
});
}(window.jQuery), /* =========================================================
 * bootstrap-modal.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
!function($) {
"use strict";
function hideWithTransition() {
var that = this, timeout = setTimeout(function() {
that.$element.off($.support.transition.end), hideModal.call(that);
}, 500);
this.$element.one($.support.transition.end, function() {
clearTimeout(timeout), hideModal.call(that);
});
}
function hideModal() {
this.$element.hide().trigger("hidden"), backdrop.call(this);
}
function backdrop(callback) {
var animate = this.$element.hasClass("fade") ? "fade" :"";
if (this.isShown && this.options.backdrop) {
var doAnimate = $.support.transition && animate;
this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(document.body), 
"static" != this.options.backdrop && this.$backdrop.click($.proxy(this.hide, this)), 
doAnimate && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), doAnimate ? this.$backdrop.one($.support.transition.end, callback) :callback();
} else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one($.support.transition.end, $.proxy(removeBackdrop, this)) :removeBackdrop.call(this)) :callback && callback();
}
function removeBackdrop() {
this.$backdrop.remove(), this.$backdrop = null;
}
function escape() {
var that = this;
this.isShown && this.options.keyboard ? $(document).on("keyup.dismiss.modal", function(e) {
27 == e.which && that.hide();
}) :this.isShown || $(document).off("keyup.dismiss.modal");
}
var Modal = function(content, options) {
this.options = options, this.$element = $(content).delegate('[data-dismiss="modal"]', "click.dismiss.modal", $.proxy(this.hide, this));
};
Modal.prototype = {
constructor:Modal,
toggle:function() {
return this[this.isShown ? "hide" :"show"]();
},
show:function() {
var that = this, e = $.Event("show");
this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || ($("body").addClass("modal-open"), 
this.isShown = !0, escape.call(this), backdrop.call(this, function() {
var transition = $.support.transition && that.$element.hasClass("fade");
that.$element.parent().length || that.$element.appendTo(document.body), that.$element.show(), 
transition && that.$element[0].offsetWidth, that.$element.addClass("in"), transition ? that.$element.one($.support.transition.end, function() {
that.$element.trigger("shown");
}) :that.$element.trigger("shown");
}));
},
hide:function(e) {
e && e.preventDefault();
e = $.Event("hide"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, 
$("body").removeClass("modal-open"), escape.call(this), this.$element.removeClass("in"), 
$.support.transition && this.$element.hasClass("fade") ? hideWithTransition.call(this) :hideModal.call(this));
}
}, $.fn.modal = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("modal"), options = $.extend({}, $.fn.modal.defaults, $this.data(), "object" == typeof option && option);
data || $this.data("modal", data = new Modal(this, options)), "string" == typeof option ? data[option]() :options.show && data.show();
});
}, $.fn.modal.defaults = {
backdrop:!0,
keyboard:!0,
show:!0
}, $.fn.modal.Constructor = Modal, $(function() {
$("body").on("click.modal.data-api", '[data-toggle="modal"]', function(e) {
var href, $this = $(this), $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "")), option = $target.data("modal") ? "toggle" :$.extend({}, $target.data(), $this.data());
e.preventDefault(), $target.modal(option);
});
});
}(window.jQuery), /* ============================================================
 * bootstrap-dropdown.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
!function($) {
"use strict";
function clearMenus() {
$(toggle).parent().removeClass("open");
}
var toggle = '[data-toggle="dropdown"]', Dropdown = function(element) {
var $el = $(element).on("click.dropdown.data-api", this.toggle);
$("html").on("click.dropdown.data-api", function() {
$el.parent().removeClass("open");
});
};
Dropdown.prototype = {
constructor:Dropdown,
toggle:function() {
var $parent, selector, isActive, $this = $(this);
if (!$this.is(".disabled, :disabled")) return selector = $this.attr("data-target"), 
selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")), 
$parent = $(selector), $parent.length || ($parent = $this.parent()), isActive = $parent.hasClass("open"), 
clearMenus(), isActive || $parent.toggleClass("open"), !1;
}
}, $.fn.dropdown = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("dropdown");
data || $this.data("dropdown", data = new Dropdown(this)), "string" == typeof option && data[option].call($this);
});
}, $.fn.dropdown.Constructor = Dropdown, $(function() {
$("html").on("click.dropdown.data-api", clearMenus), $("body").on("click.dropdown", ".dropdown form", function(e) {
e.stopPropagation();
}).on("click.dropdown.data-api", toggle, Dropdown.prototype.toggle);
});
}(window.jQuery), /* =============================================================
 * bootstrap-scrollspy.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */
!function($) {
"use strict";
function ScrollSpy(element, options) {
var href, process = $.proxy(this.process, this), $element = $(element).is("body") ? $(window) :$(element);
this.options = $.extend({}, $.fn.scrollspy.defaults, options), this.$scrollElement = $element.on("scroll.scroll.data-api", process), 
this.selector = (this.options.target || (href = $(element).attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", 
this.$body = $("body"), this.refresh(), this.process();
}
ScrollSpy.prototype = {
constructor:ScrollSpy,
refresh:function() {
var $targets, self = this;
this.offsets = $([]), this.targets = $([]), $targets = this.$body.find(this.selector).map(function() {
var $el = $(this), href = $el.data("target") || $el.attr("href"), $href = /^#\w/.test(href) && $(href);
return $href && href.length && [ [ $href.position().top, href ] ] || null;
}).sort(function(a, b) {
return a[0] - b[0];
}).each(function() {
self.offsets.push(this[0]), self.targets.push(this[1]);
});
},
process:function() {
var i, scrollTop = this.$scrollElement.scrollTop() + this.options.offset, scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, maxScroll = scrollHeight - this.$scrollElement.height(), offsets = this.offsets, targets = this.targets, activeTarget = this.activeTarget;
if (scrollTop >= maxScroll) return activeTarget != (i = targets.last()[0]) && this.activate(i);
for (i = offsets.length; i--; ) activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i]);
},
activate:function(target) {
var active, selector;
this.activeTarget = target, $(this.selector).parent(".active").removeClass("active"), 
selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]', 
active = $(selector).parent("li").addClass("active"), active.parent(".dropdown-menu") && (active = active.closest("li.dropdown").addClass("active")), 
active.trigger("activate");
}
}, $.fn.scrollspy = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("scrollspy"), options = "object" == typeof option && option;
data || $this.data("scrollspy", data = new ScrollSpy(this, options)), "string" == typeof option && data[option]();
});
}, $.fn.scrollspy.Constructor = ScrollSpy, $.fn.scrollspy.defaults = {
offset:10
}, $(function() {
$('[data-spy="scroll"]').each(function() {
var $spy = $(this);
$spy.scrollspy($spy.data());
});
});
}(window.jQuery), /* ========================================================
 * bootstrap-tab.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */
!function($) {
"use strict";
var Tab = function(element) {
this.element = $(element);
};
Tab.prototype = {
constructor:Tab,
show:function() {
var previous, $target, e, $this = this.element, $ul = $this.closest("ul:not(.dropdown-menu)"), selector = $this.attr("data-target");
selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")), 
$this.parent("li").hasClass("active") || (previous = $ul.find(".active a").last()[0], 
e = $.Event("show", {
relatedTarget:previous
}), $this.trigger(e), e.isDefaultPrevented() || ($target = $(selector), this.activate($this.parent("li"), $ul), 
this.activate($target, $target.parent(), function() {
$this.trigger({
type:"shown",
relatedTarget:previous
});
})));
},
activate:function(element, container, callback) {
function next() {
$active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), 
element.addClass("active"), transition ? (element[0].offsetWidth, element.addClass("in")) :element.removeClass("fade"), 
element.parent(".dropdown-menu") && element.closest("li.dropdown").addClass("active"), 
callback && callback();
}
var $active = container.find("> .active"), transition = callback && $.support.transition && $active.hasClass("fade");
transition ? $active.one($.support.transition.end, next) :next(), $active.removeClass("in");
}
}, $.fn.tab = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("tab");
data || $this.data("tab", data = new Tab(this)), "string" == typeof option && data[option]();
});
}, $.fn.tab.Constructor = Tab, $(function() {
$("body").on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
e.preventDefault(), $(this).tab("show");
});
});
}(window.jQuery), /* ===========================================================
 * bootstrap-tooltip.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
!function($) {
"use strict";
var Tooltip = function(element, options) {
this.init("tooltip", element, options);
};
Tooltip.prototype = {
constructor:Tooltip,
init:function(type, element, options) {
var eventIn, eventOut;
this.type = type, this.$element = $(element), this.options = this.getOptions(options), 
this.enabled = !0, "manual" != this.options.trigger && (eventIn = "hover" == this.options.trigger ? "mouseenter" :"focus", 
eventOut = "hover" == this.options.trigger ? "mouseleave" :"blur", this.$element.on(eventIn, this.options.selector, $.proxy(this.enter, this)), 
this.$element.on(eventOut, this.options.selector, $.proxy(this.leave, this))), this.options.selector ? this._options = $.extend({}, this.options, {
trigger:"manual",
selector:""
}) :this.fixTitle();
},
getOptions:function(options) {
return options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data()), 
options.delay && "number" == typeof options.delay && (options.delay = {
show:options.delay,
hide:options.delay
}), options;
},
enter:function(e) {
var self = $(e.currentTarget)[this.type](this._options).data(this.type);
return self.options.delay && self.options.delay.show ? (clearTimeout(this.timeout), 
self.hoverState = "in", this.timeout = setTimeout(function() {
"in" == self.hoverState && self.show();
}, self.options.delay.show), void 0) :self.show();
},
leave:function(e) {
var self = $(e.currentTarget)[this.type](this._options).data(this.type);
return this.timeout && clearTimeout(this.timeout), self.options.delay && self.options.delay.hide ? (self.hoverState = "out", 
this.timeout = setTimeout(function() {
"out" == self.hoverState && self.hide();
}, self.options.delay.hide), void 0) :self.hide();
},
show:function() {
var $tip, inside, pos, actualWidth, actualHeight, placement, tp;
if (this.hasContent() && this.enabled) {
switch ($tip = this.tip(), this.setContent(), this.options.animation && $tip.addClass("fade"), 
placement = "function" == typeof this.options.placement ? this.options.placement.call(this, $tip[0], this.$element[0]) :this.options.placement, 
inside = /in/.test(placement), $tip.remove().css({
top:0,
left:0,
display:"block"
}).appendTo(inside ? this.$element :document.body), pos = this.getPosition(inside), 
actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight, inside ? placement.split(" ")[1] :placement) {
case "bottom":
tp = {
top:pos.top + pos.height,
left:pos.left + pos.width / 2 - actualWidth / 2
};
break;

case "top":
tp = {
top:pos.top - actualHeight,
left:pos.left + pos.width / 2 - actualWidth / 2
};
break;

case "left":
tp = {
top:pos.top + pos.height / 2 - actualHeight / 2,
left:pos.left - actualWidth
};
break;

case "right":
tp = {
top:pos.top + pos.height / 2 - actualHeight / 2,
left:pos.left + pos.width
};
}
$tip.css(tp).addClass(placement).addClass("in");
}
},
isHTML:function(text) {
return "string" != typeof text || "<" === text.charAt(0) && ">" === text.charAt(text.length - 1) && text.length >= 3 || /^(?:[^<]*<[\w\W]+>[^>]*$)/.exec(text);
},
setContent:function() {
var $tip = this.tip(), title = this.getTitle();
$tip.find(".tooltip-inner")[this.isHTML(title) ? "html" :"text"](title), $tip.removeClass("fade in top bottom left right");
},
hide:function() {
function removeWithAnimation() {
var timeout = setTimeout(function() {
$tip.off($.support.transition.end).remove();
}, 500);
$tip.one($.support.transition.end, function() {
clearTimeout(timeout), $tip.remove();
});
}
var $tip = this.tip();
$tip.removeClass("in"), $.support.transition && this.$tip.hasClass("fade") ? removeWithAnimation() :$tip.remove();
},
fixTitle:function() {
var $e = this.$element;
($e.attr("title") || "string" != typeof $e.attr("data-original-title")) && $e.attr("data-original-title", $e.attr("title") || "").removeAttr("title");
},
hasContent:function() {
return this.getTitle();
},
getPosition:function(inside) {
return $.extend({}, inside ? {
top:0,
left:0
} :this.$element.offset(), {
width:this.$element[0].offsetWidth,
height:this.$element[0].offsetHeight
});
},
getTitle:function() {
var title, $e = this.$element, o = this.options;
return title = $e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call($e[0]) :o.title);
},
tip:function() {
return this.$tip = this.$tip || $(this.options.template);
},
validate:function() {
this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null);
},
enable:function() {
this.enabled = !0;
},
disable:function() {
this.enabled = !1;
},
toggleEnabled:function() {
this.enabled = !this.enabled;
},
toggle:function() {
this[this.tip().hasClass("in") ? "hide" :"show"]();
}
}, $.fn.tooltip = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("tooltip"), options = "object" == typeof option && option;
data || $this.data("tooltip", data = new Tooltip(this, options)), "string" == typeof option && data[option]();
});
}, $.fn.tooltip.Constructor = Tooltip, $.fn.tooltip.defaults = {
animation:!0,
placement:"top",
selector:!1,
template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
trigger:"hover",
title:"",
delay:0
};
}(window.jQuery), /* ===========================================================
 * bootstrap-popover.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */
!function($) {
"use strict";
var Popover = function(element, options) {
this.init("popover", element, options);
};
Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {
constructor:Popover,
setContent:function() {
var $tip = this.tip(), title = this.getTitle(), content = this.getContent();
$tip.find(".popover-title")[this.isHTML(title) ? "html" :"text"](title), $tip.find(".popover-content > *")[this.isHTML(content) ? "html" :"text"](content), 
$tip.removeClass("fade top bottom left right in");
},
hasContent:function() {
return this.getTitle() || this.getContent();
},
getContent:function() {
var content, $e = this.$element, o = this.options;
return content = $e.attr("data-content") || ("function" == typeof o.content ? o.content.call($e[0]) :o.content);
},
tip:function() {
return this.$tip || (this.$tip = $(this.options.template)), this.$tip;
}
}), $.fn.popover = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("popover"), options = "object" == typeof option && option;
data || $this.data("popover", data = new Popover(this, options)), "string" == typeof option && data[option]();
});
}, $.fn.popover.Constructor = Popover, $.fn.popover.defaults = $.extend({}, $.fn.tooltip.defaults, {
placement:"right",
content:"",
template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
});
}(window.jQuery), /* ==========================================================
 * bootstrap-alert.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
!function($) {
"use strict";
var dismiss = '[data-dismiss="alert"]', Alert = function(el) {
$(el).on("click", dismiss, this.close);
};
Alert.prototype.close = function(e) {
function removeElement() {
$parent.trigger("closed").remove();
}
var $parent, $this = $(this), selector = $this.attr("data-target");
selector || (selector = $this.attr("href"), selector = selector && selector.replace(/.*(?=#[^\s]*$)/, "")), 
$parent = $(selector), e && e.preventDefault(), $parent.length || ($parent = $this.hasClass("alert") ? $this :$this.parent()), 
$parent.trigger(e = $.Event("close")), e.isDefaultPrevented() || ($parent.removeClass("in"), 
$.support.transition && $parent.hasClass("fade") ? $parent.on($.support.transition.end, removeElement) :removeElement());
}, $.fn.alert = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("alert");
data || $this.data("alert", data = new Alert(this)), "string" == typeof option && data[option].call($this);
});
}, $.fn.alert.Constructor = Alert, $(function() {
$("body").on("click.alert.data-api", dismiss, Alert.prototype.close);
});
}(window.jQuery), /* ============================================================
 * bootstrap-button.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
!function($) {
"use strict";
var Button = function(element, options) {
this.$element = $(element), this.options = $.extend({}, $.fn.button.defaults, options);
};
Button.prototype.setState = function(state) {
var d = "disabled", $el = this.$element, data = $el.data(), val = $el.is("input") ? "val" :"html";
state += "Text", data.resetText || $el.data("resetText", $el[val]()), $el[val](data[state] || this.options[state]), 
setTimeout(function() {
"loadingText" == state ? $el.addClass(d).attr(d, d) :$el.removeClass(d).removeAttr(d);
}, 0);
}, Button.prototype.toggle = function() {
var $parent = this.$element.parent('[data-toggle="buttons-radio"]');
$parent && $parent.find(".active").removeClass("active"), this.$element.toggleClass("active");
}, $.fn.button = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("button"), options = "object" == typeof option && option;
data || $this.data("button", data = new Button(this, options)), "toggle" == option ? data.toggle() :option && data.setState(option);
});
}, $.fn.button.defaults = {
loadingText:"loading..."
}, $.fn.button.Constructor = Button, $(function() {
$("body").on("click.button.data-api", "[data-toggle^=button]", function(e) {
var $btn = $(e.target);
$btn.hasClass("btn") || ($btn = $btn.closest(".btn")), $btn.button("toggle");
});
});
}(window.jQuery), /* =============================================================
 * bootstrap-collapse.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
!function($) {
"use strict";
var Collapse = function(element, options) {
this.$element = $(element), this.options = $.extend({}, $.fn.collapse.defaults, options), 
this.options.parent && (this.$parent = $(this.options.parent)), this.options.toggle && this.toggle();
};
Collapse.prototype = {
constructor:Collapse,
dimension:function() {
var hasWidth = this.$element.hasClass("width");
return hasWidth ? "width" :"height";
},
show:function() {
var dimension, scroll, actives, hasData;
if (!this.transitioning) {
if (dimension = this.dimension(), scroll = $.camelCase([ "scroll", dimension ].join("-")), 
actives = this.$parent && this.$parent.find("> .accordion-group > .in"), actives && actives.length) {
if (hasData = actives.data("collapse"), hasData && hasData.transitioning) return;
actives.collapse("hide"), hasData || actives.data("collapse", null);
}
this.$element[dimension](0), this.transition("addClass", $.Event("show"), "shown"), 
this.$element[dimension](this.$element[0][scroll]);
}
},
hide:function() {
var dimension;
this.transitioning || (dimension = this.dimension(), this.reset(this.$element[dimension]()), 
this.transition("removeClass", $.Event("hide"), "hidden"), this.$element[dimension](0));
},
reset:function(size) {
var dimension = this.dimension();
return this.$element.removeClass("collapse")[dimension](size || "auto")[0].offsetWidth, 
this.$element[null !== size ? "addClass" :"removeClass"]("collapse"), this;
},
transition:function(method, startEvent, completeEvent) {
var that = this, complete = function() {
"show" == startEvent.type && that.reset(), that.transitioning = 0, that.$element.trigger(completeEvent);
};
this.$element.trigger(startEvent), startEvent.isDefaultPrevented() || (this.transitioning = 1, 
this.$element[method]("in"), $.support.transition && this.$element.hasClass("collapse") ? this.$element.one($.support.transition.end, complete) :complete());
},
toggle:function() {
this[this.$element.hasClass("in") ? "hide" :"show"]();
}
}, $.fn.collapse = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("collapse"), options = "object" == typeof option && option;
data || $this.data("collapse", data = new Collapse(this, options)), "string" == typeof option && data[option]();
});
}, $.fn.collapse.defaults = {
toggle:!0
}, $.fn.collapse.Constructor = Collapse, $(function() {
$("body").on("click.collapse.data-api", "[data-toggle=collapse]", function(e) {
var href, $this = $(this), target = $this.attr("data-target") || e.preventDefault() || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""), option = $(target).data("collapse") ? "toggle" :$this.data();
$(target).collapse(option);
});
});
}(window.jQuery), /* ==========================================================
 * bootstrap-carousel.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
!function($) {
"use strict";
var Carousel = function(element, options) {
this.$element = $(element), this.options = options, this.options.slide && this.slide(this.options.slide), 
"hover" == this.options.pause && this.$element.on("mouseenter", $.proxy(this.pause, this)).on("mouseleave", $.proxy(this.cycle, this));
};
Carousel.prototype = {
cycle:function(e) {
return e || (this.paused = !1), this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval)), 
this;
},
to:function(pos) {
var $active = this.$element.find(".active"), children = $active.parent().children(), activePos = children.index($active), that = this;
if (!(pos > children.length - 1 || 0 > pos)) return this.sliding ? this.$element.one("slid", function() {
that.to(pos);
}) :activePos == pos ? this.pause().cycle() :this.slide(pos > activePos ? "next" :"prev", $(children[pos]));
},
pause:function(e) {
return e || (this.paused = !0), clearInterval(this.interval), this.interval = null, 
this;
},
next:function() {
return this.sliding ? void 0 :this.slide("next");
},
prev:function() {
return this.sliding ? void 0 :this.slide("prev");
},
slide:function(type, next) {
var $active = this.$element.find(".active"), $next = next || $active[type](), isCycling = this.interval, direction = "next" == type ? "left" :"right", fallback = "next" == type ? "first" :"last", that = this, e = $.Event("slide");
if (this.sliding = !0, isCycling && this.pause(), $next = $next.length ? $next :this.$element.find(".item")[fallback](), 
!$next.hasClass("active")) {
if ($.support.transition && this.$element.hasClass("slide")) {
if (this.$element.trigger(e), e.isDefaultPrevented()) return;
$next.addClass(type), $next[0].offsetWidth, $active.addClass(direction), $next.addClass(direction), 
this.$element.one($.support.transition.end, function() {
$next.removeClass([ type, direction ].join(" ")).addClass("active"), $active.removeClass([ "active", direction ].join(" ")), 
that.sliding = !1, setTimeout(function() {
that.$element.trigger("slid");
}, 0);
});
} else {
if (this.$element.trigger(e), e.isDefaultPrevented()) return;
$active.removeClass("active"), $next.addClass("active"), this.sliding = !1, this.$element.trigger("slid");
}
return isCycling && this.cycle(), this;
}
}
}, $.fn.carousel = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("carousel"), options = $.extend({}, $.fn.carousel.defaults, "object" == typeof option && option);
data || $this.data("carousel", data = new Carousel(this, options)), "number" == typeof option ? data.to(option) :"string" == typeof option || (option = options.slide) ? data[option]() :options.interval && data.cycle();
});
}, $.fn.carousel.defaults = {
interval:5e3,
pause:"hover"
}, $.fn.carousel.Constructor = Carousel, $(function() {
$("body").on("click.carousel.data-api", "[data-slide]", function(e) {
var href, $this = $(this), $target = $($this.attr("data-target") || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "")), options = !$target.data("modal") && $.extend({}, $target.data(), $this.data());
$target.carousel(options), e.preventDefault();
});
});
}(window.jQuery), /* =============================================================
 * bootstrap-typeahead.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
!function($) {
"use strict";
var Typeahead = function(element, options) {
this.$element = $(element), this.options = $.extend({}, $.fn.typeahead.defaults, options), 
this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, 
this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, 
this.$menu = $(this.options.menu).appendTo("body"), this.source = this.options.source, 
this.shown = !1, this.listen();
};
Typeahead.prototype = {
constructor:Typeahead,
select:function() {
var val = this.$menu.find(".active").attr("data-value");
return this.$element.val(this.updater(val)).change(), this.hide();
},
updater:function(item) {
return item;
},
show:function() {
var pos = $.extend({}, this.$element.offset(), {
height:this.$element[0].offsetHeight
});
return this.$menu.css({
top:pos.top + pos.height,
left:pos.left
}), this.$menu.show(), this.shown = !0, this;
},
hide:function() {
return this.$menu.hide(), this.shown = !1, this;
},
lookup:function() {
var items, that = this;
return this.query = this.$element.val(), this.query ? (items = $.grep(this.source, function(item) {
return that.matcher(item);
}), items = this.sorter(items), items.length ? this.render(items.slice(0, this.options.items)).show() :this.shown ? this.hide() :this) :this.shown ? this.hide() :this;
},
matcher:function(item) {
return ~item.toLowerCase().indexOf(this.query.toLowerCase());
},
sorter:function(items) {
for (var item, beginswith = [], caseSensitive = [], caseInsensitive = []; item = items.shift(); ) item.toLowerCase().indexOf(this.query.toLowerCase()) ? ~item.indexOf(this.query) ? caseSensitive.push(item) :caseInsensitive.push(item) :beginswith.push(item);
return beginswith.concat(caseSensitive, caseInsensitive);
},
highlighter:function(item) {
var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
return item.replace(new RegExp("(" + query + ")", "ig"), function($1, match) {
return "<strong>" + match + "</strong>";
});
},
render:function(items) {
var that = this;
return items = $(items).map(function(i, item) {
return i = $(that.options.item).attr("data-value", item), i.find("a").html(that.highlighter(item)), 
i[0];
}), items.first().addClass("active"), this.$menu.html(items), this;
},
next:function() {
var active = this.$menu.find(".active").removeClass("active"), next = active.next();
next.length || (next = $(this.$menu.find("li")[0])), next.addClass("active");
},
prev:function() {
var active = this.$menu.find(".active").removeClass("active"), prev = active.prev();
prev.length || (prev = this.$menu.find("li").last()), prev.addClass("active");
},
listen:function() {
this.$element.on("blur", $.proxy(this.blur, this)).on("keypress", $.proxy(this.keypress, this)).on("keyup", $.proxy(this.keyup, this)), 
($.browser.webkit || $.browser.msie) && this.$element.on("keydown", $.proxy(this.keypress, this)), 
this.$menu.on("click", $.proxy(this.click, this)).on("mouseenter", "li", $.proxy(this.mouseenter, this));
},
keyup:function(e) {
switch (e.keyCode) {
case 40:
case 38:
break;

case 9:
case 13:
if (!this.shown) return;
this.select();
break;

case 27:
if (!this.shown) return;
this.hide();
break;

default:
this.lookup();
}
e.stopPropagation(), e.preventDefault();
},
keypress:function(e) {
if (this.shown) {
switch (e.keyCode) {
case 9:
case 13:
case 27:
e.preventDefault();
break;

case 38:
if ("keydown" != e.type) break;
e.preventDefault(), this.prev();
break;

case 40:
if ("keydown" != e.type) break;
e.preventDefault(), this.next();
}
e.stopPropagation();
}
},
blur:function() {
var that = this;
setTimeout(function() {
that.hide();
}, 150);
},
click:function(e) {
e.stopPropagation(), e.preventDefault(), this.select();
},
mouseenter:function(e) {
this.$menu.find(".active").removeClass("active"), $(e.currentTarget).addClass("active");
}
}, $.fn.typeahead = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("typeahead"), options = "object" == typeof option && option;
data || $this.data("typeahead", data = new Typeahead(this, options)), "string" == typeof option && data[option]();
});
}, $.fn.typeahead.defaults = {
source:[],
items:8,
menu:'<ul class="typeahead dropdown-menu"></ul>',
item:'<li><a href="#"></a></li>'
}, $.fn.typeahead.Constructor = Typeahead, $(function() {
$("body").on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(e) {
var $this = $(this);
$this.data("typeahead") || (e.preventDefault(), $this.typeahead($this.data()));
});
});
}(window.jQuery), /*
Copyright 2012 Igor Vaynberg

Version: 3.4.0 Timestamp: Tue May 14 08:27:33 PDT 2013

This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU
General Public License version 2 (the "GPL License"). You may choose either license to govern your
use of this software only upon the condition that you accept all of the terms of either the Apache
License or the GPL License.

You may obtain a copy of the Apache License and the GPL License at:

    http://www.apache.org/licenses/LICENSE-2.0
    http://www.gnu.org/licenses/gpl-2.0.html

Unless required by applicable law or agreed to in writing, software distributed under the
Apache License or the GPL Licesnse is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the Apache License and the GPL License for
the specific language governing permissions and limitations under the Apache License and the GPL License.
*/
function($) {
"undefined" == typeof $.fn.each2 && $.fn.extend({
each2:function(c) {
for (var j = $([ 0 ]), i = -1, l = this.length; ++i < l && (j.context = j[0] = this[i]) && c.call(j[0], i, j) !== !1; ) ;
return this;
}
});
}(jQuery), function($, undefined) {
"use strict";
function indexOf(value, array) {
for (var i = 0, l = array.length; l > i; i += 1) if (equal(value, array[i])) return i;
return -1;
}
function measureScrollbar() {
var $template = $(MEASURE_SCROLLBAR_TEMPLATE);
$template.appendTo("body");
var dim = {
width:$template.width() - $template[0].clientWidth,
height:$template.height() - $template[0].clientHeight
};
return $template.remove(), dim;
}
function equal(a, b) {
return a === b ? !0 :a === undefined || b === undefined ? !1 :null === a || null === b ? !1 :a.constructor === String ? a + "" == b + "" :b.constructor === String ? b + "" == a + "" :!1;
}
function splitVal(string, separator) {
var val, i, l;
if (null === string || string.length < 1) return [];
for (val = string.split(separator), i = 0, l = val.length; l > i; i += 1) val[i] = $.trim(val[i]);
return val;
}
function getSideBorderPadding(element) {
return element.outerWidth(!1) - element.width();
}
function installKeyUpChangeEvent(element) {
var key = "keyup-change-value";
element.on("keydown", function() {
$.data(element, key) === undefined && $.data(element, key, element.val());
}), element.on("keyup", function() {
var val = $.data(element, key);
val !== undefined && element.val() !== val && ($.removeData(element, key), element.trigger("keyup-change"));
});
}
function installFilteredMouseMove(element) {
element.on("mousemove", function(e) {
var lastpos = lastMousePosition;
(lastpos === undefined || lastpos.x !== e.pageX || lastpos.y !== e.pageY) && $(e.target).trigger("mousemove-filtered", e);
});
}
function debounce(quietMillis, fn, ctx) {
ctx = ctx || undefined;
var timeout;
return function() {
var args = arguments;
window.clearTimeout(timeout), timeout = window.setTimeout(function() {
fn.apply(ctx, args);
}, quietMillis);
};
}
function thunk(formula) {
var value, evaluated = !1;
return function() {
return evaluated === !1 && (value = formula(), evaluated = !0), value;
};
}
function installDebouncedScroll(threshold, element) {
var notify = debounce(threshold, function(e) {
element.trigger("scroll-debounced", e);
});
element.on("scroll", function(e) {
indexOf(e.target, element.get()) >= 0 && notify(e);
});
}
function focus($el) {
$el[0] !== document.activeElement && window.setTimeout(function() {
var range, el = $el[0], pos = $el.val().length;
$el.focus(), $el.is(":visible") && el === document.activeElement && (el.setSelectionRange ? el.setSelectionRange(pos, pos) :el.createTextRange && (range = el.createTextRange(), 
range.collapse(!1), range.select()));
}, 0);
}
function getCursorInfo(el) {
el = $(el)[0];
var offset = 0, length = 0;
if ("selectionStart" in el) offset = el.selectionStart, length = el.selectionEnd - offset; else if ("selection" in document) {
el.focus();
var sel = document.selection.createRange();
length = document.selection.createRange().text.length, sel.moveStart("character", -el.value.length), 
offset = sel.text.length - length;
}
return {
offset:offset,
length:length
};
}
function killEvent(event) {
event.preventDefault(), event.stopPropagation();
}
function killEventImmediately(event) {
event.preventDefault(), event.stopImmediatePropagation();
}
function measureTextWidth(e) {
if (!sizer) {
var style = e[0].currentStyle || window.getComputedStyle(e[0], null);
sizer = $(document.createElement("div")).css({
position:"absolute",
left:"-10000px",
top:"-10000px",
display:"none",
fontSize:style.fontSize,
fontFamily:style.fontFamily,
fontStyle:style.fontStyle,
fontWeight:style.fontWeight,
letterSpacing:style.letterSpacing,
textTransform:style.textTransform,
whiteSpace:"nowrap"
}), sizer.attr("class", "select2-sizer"), $("body").append(sizer);
}
return sizer.text(e.val()), sizer.width();
}
function syncCssClasses(dest, src, adapter) {
var classes, adapted, replacements = [];
classes = dest.attr("class"), classes && (classes = "" + classes, $(classes.split(" ")).each2(function() {
0 === this.indexOf("select2-") && replacements.push(this);
})), classes = src.attr("class"), classes && (classes = "" + classes, $(classes.split(" ")).each2(function() {
0 !== this.indexOf("select2-") && (adapted = adapter(this), adapted && replacements.push(this));
})), dest.attr("class", replacements.join(" "));
}
function markMatch(text, term, markup, escapeMarkup) {
var match = text.toUpperCase().indexOf(term.toUpperCase()), tl = term.length;
return 0 > match ? (markup.push(escapeMarkup(text)), void 0) :(markup.push(escapeMarkup(text.substring(0, match))), 
markup.push("<span class='select2-match'>"), markup.push(escapeMarkup(text.substring(match, match + tl))), 
markup.push("</span>"), markup.push(escapeMarkup(text.substring(match + tl, text.length))), 
void 0);
}
function ajax(options) {
var timeout, requestSequence = 0, handler = null, quietMillis = options.quietMillis || 100, ajaxUrl = options.url, self = this;
return function(query) {
window.clearTimeout(timeout), timeout = window.setTimeout(function() {
requestSequence += 1;
var requestNumber = requestSequence, data = options.data, url = ajaxUrl, transport = options.transport || $.fn.select2.ajaxDefaults.transport, deprecated = {
type:options.type || "GET",
cache:options.cache || !1,
jsonpCallback:options.jsonpCallback || undefined,
dataType:options.dataType || "json"
}, params = $.extend({}, $.fn.select2.ajaxDefaults.params, deprecated);
data = data ? data.call(self, query.term, query.page, query.context) :null, url = "function" == typeof url ? url.call(self, query.term, query.page, query.context) :url, 
null !== handler && handler.abort(), options.params && ($.isFunction(options.params) ? $.extend(params, options.params.call(self)) :$.extend(params, options.params)), 
$.extend(params, {
url:url,
dataType:options.dataType,
data:data,
success:function(data) {
if (!(requestSequence > requestNumber)) {
var results = options.results(data, query.page);
query.callback(results);
}
}
}), handler = transport.call(self, params);
}, quietMillis);
};
}
function local(options) {
var dataText, tmp, data = options, text = function(item) {
return "" + item.text;
};
$.isArray(data) && (tmp = data, data = {
results:tmp
}), $.isFunction(data) === !1 && (tmp = data, data = function() {
return tmp;
});
var dataItem = data();
return dataItem.text && (text = dataItem.text, $.isFunction(text) || (dataText = dataItem.text, 
text = function(item) {
return item[dataText];
})), function(query) {
var process, t = query.term, filtered = {
results:[]
};
return "" === t ? (query.callback(data()), void 0) :(process = function(datum, collection) {
var group, attr;
if (datum = datum[0], datum.children) {
group = {};
for (attr in datum) datum.hasOwnProperty(attr) && (group[attr] = datum[attr]);
group.children = [], $(datum.children).each2(function(i, childDatum) {
process(childDatum, group.children);
}), (group.children.length || query.matcher(t, text(group), datum)) && collection.push(group);
} else query.matcher(t, text(datum), datum) && collection.push(datum);
}, $(data().results).each2(function(i, datum) {
process(datum, filtered.results);
}), query.callback(filtered), void 0);
};
}
function tags(data) {
var isFunc = $.isFunction(data);
return function(query) {
var t = query.term, filtered = {
results:[]
};
$(isFunc ? data() :data).each(function() {
var isObject = this.text !== undefined, text = isObject ? this.text :this;
("" === t || query.matcher(t, text)) && filtered.results.push(isObject ? this :{
id:this,
text:this
});
}), query.callback(filtered);
};
}
function checkFormatter(formatter) {
if ($.isFunction(formatter)) return !0;
if (!formatter) return !1;
throw new Error("formatterName must be a function or a falsy value");
}
function evaluate(val) {
return $.isFunction(val) ? val() :val;
}
function countResults(results) {
var count = 0;
return $.each(results, function(i, item) {
item.children ? count += countResults(item.children) :count++;
}), count;
}
function defaultTokenizer(input, selection, selectCallback, opts) {
var token, index, i, l, separator, original = input, dupe = !1;
if (!opts.createSearchChoice || !opts.tokenSeparators || opts.tokenSeparators.length < 1) return undefined;
for (;;) {
for (index = -1, i = 0, l = opts.tokenSeparators.length; l > i && (separator = opts.tokenSeparators[i], 
index = input.indexOf(separator), !(index >= 0)); i++) ;
if (0 > index) break;
if (token = input.substring(0, index), input = input.substring(index + separator.length), 
token.length > 0 && (token = opts.createSearchChoice(token, selection), token !== undefined && null !== token && opts.id(token) !== undefined && null !== opts.id(token))) {
for (dupe = !1, i = 0, l = selection.length; l > i; i++) if (equal(opts.id(token), opts.id(selection[i]))) {
dupe = !0;
break;
}
dupe || selectCallback(token);
}
}
return original !== input ? input :void 0;
}
function clazz(SuperClass, methods) {
var constructor = function() {};
return constructor.prototype = new SuperClass(), constructor.prototype.constructor = constructor, 
constructor.prototype.parent = SuperClass.prototype, constructor.prototype = $.extend(constructor.prototype, methods), 
constructor;
}
if (window.Select2 === undefined) {
var KEY, AbstractSelect2, SingleSelect2, MultiSelect2, nextUid, sizer, lastMousePosition, $document, scrollBarDimensions, KEY = {
TAB:9,
ENTER:13,
ESC:27,
SPACE:32,
LEFT:37,
UP:38,
RIGHT:39,
DOWN:40,
SHIFT:16,
CTRL:17,
ALT:18,
PAGE_UP:33,
PAGE_DOWN:34,
HOME:36,
END:35,
BACKSPACE:8,
DELETE:46,
isArrow:function(k) {
switch (k = k.which ? k.which :k) {
case KEY.LEFT:
case KEY.RIGHT:
case KEY.UP:
case KEY.DOWN:
return !0;
}
return !1;
},
isControl:function(e) {
var k = e.which;
switch (k) {
case KEY.SHIFT:
case KEY.CTRL:
case KEY.ALT:
return !0;
}
return e.metaKey ? !0 :!1;
},
isFunctionKey:function(k) {
return k = k.which ? k.which :k, k >= 112 && 123 >= k;
}
}, MEASURE_SCROLLBAR_TEMPLATE = "<div class='select2-measure-scrollbar'></div>";
$document = $(document), nextUid = function() {
var counter = 1;
return function() {
return counter++;
};
}(), $document.on("mousemove", function(e) {
lastMousePosition = {
x:e.pageX,
y:e.pageY
};
}), AbstractSelect2 = clazz(Object, {
bind:function(func) {
var self = this;
return function() {
func.apply(self, arguments);
};
},
init:function(opts) {
var results, search, disabled, readonly, resultsSelector = ".select2-results";
this.opts = opts = this.prepareOpts(opts), this.id = opts.id, opts.element.data("select2") !== undefined && null !== opts.element.data("select2") && this.destroy(), 
this.container = this.createContainer(), this.containerId = "s2id_" + (opts.element.attr("id") || "autogen" + nextUid()), 
this.containerSelector = "#" + this.containerId.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1"), 
this.container.attr("id", this.containerId), this.body = thunk(function() {
return opts.element.closest("body");
}), syncCssClasses(this.container, this.opts.element, this.opts.adaptContainerCssClass), 
this.container.css(evaluate(opts.containerCss)), this.container.addClass(evaluate(opts.containerCssClass)), 
this.elementTabIndex = this.opts.element.attr("tabindex"), this.opts.element.data("select2", this).attr("tabindex", "-1").before(this.container), 
this.container.data("select2", this), this.dropdown = this.container.find(".select2-drop"), 
this.dropdown.addClass(evaluate(opts.dropdownCssClass)), this.dropdown.data("select2", this), 
this.results = results = this.container.find(resultsSelector), this.search = search = this.container.find("input.select2-input"), 
this.resultsPage = 0, this.context = null, this.initContainer(), installFilteredMouseMove(this.results), 
this.dropdown.on("mousemove-filtered touchstart touchmove touchend", resultsSelector, this.bind(this.highlightUnderEvent)), 
installDebouncedScroll(80, this.results), this.dropdown.on("scroll-debounced", resultsSelector, this.bind(this.loadMoreIfNeeded)), 
$(this.container).on("change", ".select2-input", function(e) {
e.stopPropagation();
}), $(this.dropdown).on("change", ".select2-input", function(e) {
e.stopPropagation();
}), $.fn.mousewheel && results.mousewheel(function(e, delta, deltaX, deltaY) {
var top = results.scrollTop();
deltaY > 0 && 0 >= top - deltaY ? (results.scrollTop(0), killEvent(e)) :0 > deltaY && results.get(0).scrollHeight - results.scrollTop() + deltaY <= results.height() && (results.scrollTop(results.get(0).scrollHeight - results.height()), 
killEvent(e));
}), installKeyUpChangeEvent(search), search.on("keyup-change input paste", this.bind(this.updateResults)), 
search.on("focus", function() {
search.addClass("select2-focused");
}), search.on("blur", function() {
search.removeClass("select2-focused");
}), this.dropdown.on("mouseup", resultsSelector, this.bind(function(e) {
$(e.target).closest(".select2-result-selectable").length > 0 && (this.highlightUnderEvent(e), 
this.selectHighlighted(e));
})), this.dropdown.on("click mouseup mousedown", function(e) {
e.stopPropagation();
}), $.isFunction(this.opts.initSelection) && (this.initSelection(), this.monitorSource()), 
null !== opts.maximumInputLength && this.search.attr("maxlength", opts.maximumInputLength);
var disabled = opts.element.prop("disabled");
disabled === undefined && (disabled = !1), this.enable(!disabled);
var readonly = opts.element.prop("readonly");
readonly === undefined && (readonly = !1), this.readonly(readonly), scrollBarDimensions = scrollBarDimensions || measureScrollbar(), 
this.autofocus = opts.element.prop("autofocus"), opts.element.prop("autofocus", !1), 
this.autofocus && this.focus();
},
destroy:function() {
var select2 = this.opts.element.data("select2");
this.propertyObserver && (delete this.propertyObserver, this.propertyObserver = null), 
select2 !== undefined && (select2.container.remove(), select2.dropdown.remove(), 
select2.opts.element.removeClass("select2-offscreen").removeData("select2").off(".select2").attr({
tabindex:this.elementTabIndex
}).prop("autofocus", this.autofocus || !1).show());
},
optionToData:function(element) {
return element.is("option") ? {
id:element.prop("value"),
text:element.text(),
element:element.get(),
css:element.attr("class"),
disabled:element.prop("disabled"),
locked:equal(element.attr("locked"), "locked")
} :element.is("optgroup") ? {
text:element.attr("label"),
children:[],
element:element.get(),
css:element.attr("class")
} :void 0;
},
prepareOpts:function(opts) {
var element, select, idKey, ajaxUrl, self = this;
if (element = opts.element, "select" === element.get(0).tagName.toLowerCase() && (this.select = select = opts.element), 
select && $.each([ "id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags" ], function() {
if (this in opts) throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.");
}), opts = $.extend({}, {
populateResults:function(container, results, query) {
var populate, id = this.opts.id;
(populate = function(results, container, depth) {
var i, l, result, selectable, disabled, compound, node, label, innerContainer, formatted;
for (results = opts.sortResults(results, container, query), i = 0, l = results.length; l > i; i += 1) result = results[i], 
disabled = result.disabled === !0, selectable = !disabled && id(result) !== undefined, 
compound = result.children && result.children.length > 0, node = $("<li></li>"), 
node.addClass("select2-results-dept-" + depth), node.addClass("select2-result"), 
node.addClass(selectable ? "select2-result-selectable" :"select2-result-unselectable"), 
disabled && node.addClass("select2-disabled"), compound && node.addClass("select2-result-with-children"), 
node.addClass(self.opts.formatResultCssClass(result)), label = $(document.createElement("div")), 
label.addClass("select2-result-label"), formatted = opts.formatResult(result, label, query, self.opts.escapeMarkup), 
formatted !== undefined && label.html(formatted), node.append(label), compound && (innerContainer = $("<ul></ul>"), 
innerContainer.addClass("select2-result-sub"), populate(result.children, innerContainer, depth + 1), 
node.append(innerContainer)), node.data("select2-data", result), container.append(node);
})(results, container, 0);
}
}, $.fn.select2.defaults, opts), "function" != typeof opts.id && (idKey = opts.id, 
opts.id = function(e) {
return e[idKey];
}), $.isArray(opts.element.data("select2Tags"))) {
if ("tags" in opts) throw "tags specified as both an attribute 'data-select2-tags' and in options of Select2 " + opts.element.attr("id");
opts.tags = opts.element.data("select2Tags");
}
if (select ? (opts.query = this.bind(function(query) {
var children, firstChild, process, data = {
results:[],
more:!1
}, term = query.term;
process = function(element, collection) {
var group;
element.is("option") ? query.matcher(term, element.text(), element) && collection.push(self.optionToData(element)) :element.is("optgroup") && (group = self.optionToData(element), 
element.children().each2(function(i, elm) {
process(elm, group.children);
}), group.children.length > 0 && collection.push(group));
}, children = element.children(), this.getPlaceholder() !== undefined && children.length > 0 && (firstChild = children[0], 
"" === $(firstChild).text() && (children = children.not(firstChild))), children.each2(function(i, elm) {
process(elm, data.results);
}), query.callback(data);
}), opts.id = function(e) {
return e.id;
}, opts.formatResultCssClass = function(data) {
return data.css;
}) :"query" in opts || ("ajax" in opts ? (ajaxUrl = opts.element.data("ajax-url"), 
ajaxUrl && ajaxUrl.length > 0 && (opts.ajax.url = ajaxUrl), opts.query = ajax.call(opts.element, opts.ajax)) :"data" in opts ? opts.query = local(opts.data) :"tags" in opts && (opts.query = tags(opts.tags), 
opts.createSearchChoice === undefined && (opts.createSearchChoice = function(term) {
return {
id:term,
text:term
};
}), opts.initSelection === undefined && (opts.initSelection = function(element, callback) {
var data = [];
$(splitVal(element.val(), opts.separator)).each(function() {
var id = this, text = this, tags = opts.tags;
$.isFunction(tags) && (tags = tags()), $(tags).each(function() {
return equal(this.id, id) ? (text = this.text, !1) :void 0;
}), data.push({
id:id,
text:text
});
}), callback(data);
}))), "function" != typeof opts.query) throw "query function not defined for Select2 " + opts.element.attr("id");
return opts;
},
monitorSource:function() {
var sync, el = this.opts.element;
el.on("change.select2", this.bind(function() {
this.opts.element.data("select2-change-triggered") !== !0 && this.initSelection();
})), sync = this.bind(function() {
var readonly, disabled = el.prop("disabled");
disabled === undefined && (disabled = !1), this.enable(!disabled);
var readonly = el.prop("readonly");
readonly === undefined && (readonly = !1), this.readonly(readonly), syncCssClasses(this.container, this.opts.element, this.opts.adaptContainerCssClass), 
this.container.addClass(evaluate(this.opts.containerCssClass)), syncCssClasses(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass), 
this.dropdown.addClass(evaluate(this.opts.dropdownCssClass));
}), el.on("propertychange.select2 DOMAttrModified.select2", sync), this.mutationCallback === undefined && (this.mutationCallback = function(mutations) {
mutations.forEach(sync);
}), "undefined" != typeof WebKitMutationObserver && (this.propertyObserver && (delete this.propertyObserver, 
this.propertyObserver = null), this.propertyObserver = new WebKitMutationObserver(this.mutationCallback), 
this.propertyObserver.observe(el.get(0), {
attributes:!0,
subtree:!1
}));
},
triggerSelect:function(data) {
var evt = $.Event("select2-selecting", {
val:this.id(data),
object:data
});
return this.opts.element.trigger(evt), !evt.isDefaultPrevented();
},
triggerChange:function(details) {
details = details || {}, details = $.extend({}, details, {
type:"change",
val:this.val()
}), this.opts.element.data("select2-change-triggered", !0), this.opts.element.trigger(details), 
this.opts.element.data("select2-change-triggered", !1), this.opts.element.click(), 
this.opts.blurOnChange && this.opts.element.blur();
},
isInterfaceEnabled:function() {
return this.enabledInterface === !0;
},
enableInterface:function() {
var enabled = this._enabled && !this._readonly, disabled = !enabled;
return enabled === this.enabledInterface ? !1 :(this.container.toggleClass("select2-container-disabled", disabled), 
this.close(), this.enabledInterface = enabled, !0);
},
enable:function(enabled) {
return enabled === undefined && (enabled = !0), this._enabled === enabled ? !1 :(this._enabled = enabled, 
this.opts.element.prop("disabled", !enabled), this.enableInterface(), !0);
},
readonly:function(enabled) {
return enabled === undefined && (enabled = !1), this._readonly === enabled ? !1 :(this._readonly = enabled, 
this.opts.element.prop("readonly", enabled), this.enableInterface(), !0);
},
opened:function() {
return this.container.hasClass("select2-dropdown-open");
},
positionDropdown:function() {
var bodyOffset, above, css, resultsListNode, $dropdown = this.dropdown, offset = this.container.offset(), height = this.container.outerHeight(!1), width = this.container.outerWidth(!1), dropHeight = $dropdown.outerHeight(!1), viewPortRight = $(window).scrollLeft() + $(window).width(), viewportBottom = $(window).scrollTop() + $(window).height(), dropTop = offset.top + height, dropLeft = offset.left, enoughRoomBelow = viewportBottom >= dropTop + dropHeight, enoughRoomAbove = offset.top - dropHeight >= this.body().scrollTop(), dropWidth = $dropdown.outerWidth(!1), enoughRoomOnRight = viewPortRight >= dropLeft + dropWidth, aboveNow = $dropdown.hasClass("select2-drop-above");
this.opts.dropdownAutoWidth ? (resultsListNode = $(".select2-results", $dropdown)[0], 
$dropdown.addClass("select2-drop-auto-width"), $dropdown.css("width", ""), dropWidth = $dropdown.outerWidth(!1) + (resultsListNode.scrollHeight === resultsListNode.clientHeight ? 0 :scrollBarDimensions.width), 
dropWidth > width ? width = dropWidth :dropWidth = width, enoughRoomOnRight = viewPortRight >= dropLeft + dropWidth) :this.container.removeClass("select2-drop-auto-width"), 
"static" !== this.body().css("position") && (bodyOffset = this.body().offset(), 
dropTop -= bodyOffset.top, dropLeft -= bodyOffset.left), aboveNow ? (above = !0, 
!enoughRoomAbove && enoughRoomBelow && (above = !1)) :(above = !1, !enoughRoomBelow && enoughRoomAbove && (above = !0)), 
enoughRoomOnRight || (dropLeft = offset.left + width - dropWidth), above ? (dropTop = offset.top - dropHeight, 
this.container.addClass("select2-drop-above"), $dropdown.addClass("select2-drop-above")) :(this.container.removeClass("select2-drop-above"), 
$dropdown.removeClass("select2-drop-above")), css = $.extend({
top:dropTop,
left:dropLeft,
width:width
}, evaluate(this.opts.dropdownCss)), $dropdown.css(css);
},
shouldOpen:function() {
var event;
return this.opened() ? !1 :this._enabled === !1 || this._readonly === !0 ? !1 :(event = $.Event("select2-opening"), 
this.opts.element.trigger(event), !event.isDefaultPrevented());
},
clearDropdownAlignmentPreference:function() {
this.container.removeClass("select2-drop-above"), this.dropdown.removeClass("select2-drop-above");
},
open:function() {
return this.shouldOpen() ? (this.opening(), !0) :!1;
},
opening:function() {
function _makeMaskCss() {
return {
width:Math.max(document.documentElement.scrollWidth, $(window).width()),
height:Math.max(document.documentElement.scrollHeight, $(window).height())
};
}
var mask, cid = this.containerId, scroll = "scroll." + cid, resize = "resize." + cid, orient = "orientationchange." + cid;
this.container.addClass("select2-dropdown-open").addClass("select2-container-active"), 
this.clearDropdownAlignmentPreference(), this.dropdown[0] !== this.body().children().last()[0] && this.dropdown.detach().appendTo(this.body()), 
mask = $("#select2-drop-mask"), 0 == mask.length && (mask = $(document.createElement("div")), 
mask.attr("id", "select2-drop-mask").attr("class", "select2-drop-mask"), mask.hide(), 
mask.appendTo(this.body()), mask.on("mousedown touchstart", function(e) {
var self, dropdown = $("#select2-drop");
dropdown.length > 0 && (self = dropdown.data("select2"), self.opts.selectOnBlur && self.selectHighlighted({
noFocus:!0
}), self.close(), e.preventDefault(), e.stopPropagation());
})), this.dropdown.prev()[0] !== mask[0] && this.dropdown.before(mask), $("#select2-drop").removeAttr("id"), 
this.dropdown.attr("id", "select2-drop"), mask.css(_makeMaskCss()), mask.show(), 
this.dropdown.show(), this.positionDropdown(), this.dropdown.addClass("select2-drop-active"), 
this.ensureHighlightVisible();
var that = this;
this.container.parents().add(window).each(function() {
$(this).on(resize + " " + scroll + " " + orient, function() {
$("#select2-drop-mask").css(_makeMaskCss()), that.positionDropdown();
});
});
},
close:function() {
if (this.opened()) {
var cid = this.containerId, scroll = "scroll." + cid, resize = "resize." + cid, orient = "orientationchange." + cid;
this.container.parents().add(window).each(function() {
$(this).off(scroll).off(resize).off(orient);
}), this.clearDropdownAlignmentPreference(), $("#select2-drop-mask").hide(), this.dropdown.removeAttr("id"), 
this.dropdown.hide(), this.container.removeClass("select2-dropdown-open"), this.results.empty(), 
this.clearSearch(), this.search.removeClass("select2-active"), this.opts.element.trigger($.Event("select2-close"));
}
},
clearSearch:function() {},
getMaximumSelectionSize:function() {
return evaluate(this.opts.maximumSelectionSize);
},
ensureHighlightVisible:function() {
var children, index, child, hb, rb, y, more, results = this.results;
if (index = this.highlight(), !(0 > index)) {
if (0 == index) return results.scrollTop(0), void 0;
children = this.findHighlightableChoices().find(".select2-result-label"), child = $(children[index]), 
hb = child.offset().top + child.outerHeight(!0), index === children.length - 1 && (more = results.find("li.select2-more-results"), 
more.length > 0 && (hb = more.offset().top + more.outerHeight(!0))), rb = results.offset().top + results.outerHeight(!0), 
hb > rb && results.scrollTop(results.scrollTop() + (hb - rb)), y = child.offset().top - results.offset().top, 
0 > y && "none" != child.css("display") && results.scrollTop(results.scrollTop() + y);
}
},
findHighlightableChoices:function() {
return this.results.find(".select2-result-selectable:not(.select2-selected):not(.select2-disabled)");
},
moveHighlight:function(delta) {
for (var choices = this.findHighlightableChoices(), index = this.highlight(); index > -1 && index < choices.length; ) {
index += delta;
var choice = $(choices[index]);
if (choice.hasClass("select2-result-selectable") && !choice.hasClass("select2-disabled") && !choice.hasClass("select2-selected")) {
this.highlight(index);
break;
}
}
},
highlight:function(index) {
var choice, data, choices = this.findHighlightableChoices();
return 0 === arguments.length ? indexOf(choices.filter(".select2-highlighted")[0], choices.get()) :(index >= choices.length && (index = choices.length - 1), 
0 > index && (index = 0), this.results.find(".select2-highlighted").removeClass("select2-highlighted"), 
choice = $(choices[index]), choice.addClass("select2-highlighted"), this.ensureHighlightVisible(), 
data = choice.data("select2-data"), data && this.opts.element.trigger({
type:"select2-highlight",
val:this.id(data),
choice:data
}), void 0);
},
countSelectableResults:function() {
return this.findHighlightableChoices().length;
},
highlightUnderEvent:function(event) {
var el = $(event.target).closest(".select2-result-selectable");
if (el.length > 0 && !el.is(".select2-highlighted")) {
var choices = this.findHighlightableChoices();
this.highlight(choices.index(el));
} else 0 == el.length && this.results.find(".select2-highlighted").removeClass("select2-highlighted");
},
loadMoreIfNeeded:function() {
var below, results = this.results, more = results.find("li.select2-more-results"), page = this.resultsPage + 1, self = this, term = this.search.val(), context = this.context;
0 !== more.length && (below = more.offset().top - results.offset().top - results.height(), 
below <= this.opts.loadMorePadding && (more.addClass("select2-active"), this.opts.query({
element:this.opts.element,
term:term,
page:page,
context:context,
matcher:this.opts.matcher,
callback:this.bind(function(data) {
self.opened() && (self.opts.populateResults.call(this, results, data.results, {
term:term,
page:page,
context:context
}), self.postprocessResults(data, !1, !1), data.more === !0 ? (more.detach().appendTo(results).text(self.opts.formatLoadMore(page + 1)), 
window.setTimeout(function() {
self.loadMoreIfNeeded();
}, 10)) :more.remove(), self.positionDropdown(), self.resultsPage = page, self.context = data.context);
})
})));
},
tokenize:function() {},
updateResults:function(initial) {
function postRender() {
results.scrollTop(0), search.removeClass("select2-active"), self.positionDropdown();
}
function render(html) {
results.html(html), postRender();
}
var data, input, search = this.search, results = this.results, opts = this.opts, self = this, term = search.val(), lastTerm = $.data(this.container, "select2-last-term");
if ((initial === !0 || !lastTerm || !equal(term, lastTerm)) && ($.data(this.container, "select2-last-term", term), 
initial === !0 || this.showSearchInput !== !1 && this.opened())) {
var maxSelSize = this.getMaximumSelectionSize();
if (maxSelSize >= 1 && (data = this.data(), $.isArray(data) && data.length >= maxSelSize && checkFormatter(opts.formatSelectionTooBig, "formatSelectionTooBig"))) return render("<li class='select2-selection-limit'>" + opts.formatSelectionTooBig(maxSelSize) + "</li>"), 
void 0;
if (search.val().length < opts.minimumInputLength) return checkFormatter(opts.formatInputTooShort, "formatInputTooShort") ? render("<li class='select2-no-results'>" + opts.formatInputTooShort(search.val(), opts.minimumInputLength) + "</li>") :render(""), 
initial && this.showSearch(!0), void 0;
if (opts.maximumInputLength && search.val().length > opts.maximumInputLength) return checkFormatter(opts.formatInputTooLong, "formatInputTooLong") ? render("<li class='select2-no-results'>" + opts.formatInputTooLong(search.val(), opts.maximumInputLength) + "</li>") :render(""), 
void 0;
opts.formatSearching && 0 === this.findHighlightableChoices().length && render("<li class='select2-searching'>" + opts.formatSearching() + "</li>"), 
search.addClass("select2-active"), input = this.tokenize(), input != undefined && null != input && search.val(input), 
this.resultsPage = 1, opts.query({
element:opts.element,
term:search.val(),
page:this.resultsPage,
context:null,
matcher:opts.matcher,
callback:this.bind(function(data) {
var def;
return this.opened() ? (this.context = data.context === undefined ? null :data.context, 
this.opts.createSearchChoice && "" !== search.val() && (def = this.opts.createSearchChoice.call(null, search.val(), data.results), 
def !== undefined && null !== def && self.id(def) !== undefined && null !== self.id(def) && 0 === $(data.results).filter(function() {
return equal(self.id(this), self.id(def));
}).length && data.results.unshift(def)), 0 === data.results.length && checkFormatter(opts.formatNoMatches, "formatNoMatches") ? (render("<li class='select2-no-results'>" + opts.formatNoMatches(search.val()) + "</li>"), 
void 0) :(results.empty(), self.opts.populateResults.call(this, results, data.results, {
term:search.val(),
page:this.resultsPage,
context:null
}), data.more === !0 && checkFormatter(opts.formatLoadMore, "formatLoadMore") && (results.append("<li class='select2-more-results'>" + self.opts.escapeMarkup(opts.formatLoadMore(this.resultsPage)) + "</li>"), 
window.setTimeout(function() {
self.loadMoreIfNeeded();
}, 10)), this.postprocessResults(data, initial), postRender(), this.opts.element.trigger({
type:"select2-loaded",
data:data
}), void 0)) :(this.search.removeClass("select2-active"), void 0);
})
});
}
},
cancel:function() {
this.close();
},
blur:function() {
this.opts.selectOnBlur && this.selectHighlighted({
noFocus:!0
}), this.close(), this.container.removeClass("select2-container-active"), this.search[0] === document.activeElement && this.search.blur(), 
this.clearSearch(), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
},
focusSearch:function() {
focus(this.search);
},
selectHighlighted:function(options) {
var index = this.highlight(), highlighted = this.results.find(".select2-highlighted"), data = highlighted.closest(".select2-result").data("select2-data");
data && (this.highlight(index), this.onSelect(data, options));
},
getPlaceholder:function() {
return this.opts.element.attr("placeholder") || this.opts.element.attr("data-placeholder") || this.opts.element.data("placeholder") || this.opts.placeholder;
},
initContainerWidth:function() {
function resolveContainerWidth() {
var style, attrs, matches, i, l;
if ("off" === this.opts.width) return null;
if ("element" === this.opts.width) return 0 === this.opts.element.outerWidth(!1) ? "auto" :this.opts.element.outerWidth(!1) + "px";
if ("copy" === this.opts.width || "resolve" === this.opts.width) {
if (style = this.opts.element.attr("style"), style !== undefined) for (attrs = style.split(";"), 
i = 0, l = attrs.length; l > i; i += 1) if (matches = attrs[i].replace(/\s/g, "").match(/width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i), 
null !== matches && matches.length >= 1) return matches[1];
return style = this.opts.element.css("width"), style && style.length > 0 ? style :"resolve" === this.opts.width ? 0 === this.opts.element.outerWidth(!1) ? "auto" :this.opts.element.outerWidth(!1) + "px" :null;
}
return $.isFunction(this.opts.width) ? this.opts.width() :this.opts.width;
}
var width = resolveContainerWidth.call(this);
null !== width && this.container.css("width", width);
}
}), SingleSelect2 = clazz(AbstractSelect2, {
createContainer:function() {
var container = $(document.createElement("div")).attr({
"class":"select2-container"
}).html([ "<a href='javascript:void(0)' onclick='return false;' class='select2-choice' tabindex='-1'>", "   <span>&nbsp;</span><abbr class='select2-search-choice-close'></abbr>", "   <div><b></b></div>", "</a>", "<input class='select2-focusser select2-offscreen' type='text'/>", "<div class='select2-drop select2-display-none'>", "   <div class='select2-search'>", "       <input type='text' autocomplete='off' autocorrect='off' autocapitilize='off' spellcheck='false' class='select2-input'/>", "   </div>", "   <ul class='select2-results'>", "   </ul>", "</div>" ].join(""));
return container;
},
enableInterface:function() {
this.parent.enableInterface.apply(this, arguments) && this.focusser.prop("disabled", !this.isInterfaceEnabled());
},
opening:function() {
var el, range;
this.parent.opening.apply(this, arguments), this.showSearchInput !== !1 && this.search.val(this.focusser.val()), 
this.search.focus(), el = this.search.get(0), el.createTextRange && (range = el.createTextRange(), 
range.collapse(!1), range.select()), this.focusser.prop("disabled", !0).val(""), 
this.updateResults(!0), this.opts.element.trigger($.Event("select2-open"));
},
close:function() {
this.opened() && (this.parent.close.apply(this, arguments), this.focusser.removeAttr("disabled"), 
this.focusser.focus());
},
focus:function() {
this.opened() ? this.close() :(this.focusser.removeAttr("disabled"), this.focusser.focus());
},
isFocused:function() {
return this.container.hasClass("select2-container-active");
},
cancel:function() {
this.parent.cancel.apply(this, arguments), this.focusser.removeAttr("disabled"), 
this.focusser.focus();
},
initContainer:function() {
var selection, container = this.container, dropdown = this.dropdown;
this.showSearch(!1), this.selection = selection = container.find(".select2-choice"), 
this.focusser = container.find(".select2-focusser"), this.focusser.attr("id", "s2id_autogen" + nextUid()), 
$("label[for='" + this.opts.element.attr("id") + "']").attr("for", this.focusser.attr("id")), 
this.focusser.attr("tabindex", this.elementTabIndex), this.search.on("keydown", this.bind(function(e) {
if (this.isInterfaceEnabled()) {
if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) return killEvent(e), void 0;
switch (e.which) {
case KEY.UP:
case KEY.DOWN:
return this.moveHighlight(e.which === KEY.UP ? -1 :1), killEvent(e), void 0;

case KEY.ENTER:
return this.selectHighlighted(), killEvent(e), void 0;

case KEY.TAB:
return this.selectHighlighted({
noFocus:!0
}), void 0;

case KEY.ESC:
return this.cancel(e), killEvent(e), void 0;
}
}
})), this.search.on("blur", this.bind(function() {
document.activeElement === this.body().get(0) && window.setTimeout(this.bind(function() {
this.search.focus();
}), 0);
})), this.focusser.on("keydown", this.bind(function(e) {
return !this.isInterfaceEnabled() || e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC ? void 0 :this.opts.openOnEnter === !1 && e.which === KEY.ENTER ? (killEvent(e), 
void 0) :e.which == KEY.DOWN || e.which == KEY.UP || e.which == KEY.ENTER && this.opts.openOnEnter ? (this.open(), 
killEvent(e), void 0) :e.which == KEY.DELETE || e.which == KEY.BACKSPACE ? (this.opts.allowClear && this.clear(), 
killEvent(e), void 0) :void 0;
})), installKeyUpChangeEvent(this.focusser), this.focusser.on("keyup-change input", this.bind(function(e) {
e.stopPropagation(), this.opened() || this.open();
})), selection.on("mousedown", "abbr", this.bind(function(e) {
this.isInterfaceEnabled() && (this.clear(), killEventImmediately(e), this.close(), 
this.selection.focus());
})), selection.on("mousedown", this.bind(function(e) {
this.container.hasClass("select2-container-active") || this.opts.element.trigger($.Event("select2-focus")), 
this.opened() ? this.close() :this.isInterfaceEnabled() && this.open(), killEvent(e);
})), dropdown.on("mousedown", this.bind(function() {
this.search.focus();
})), selection.on("focus", this.bind(function(e) {
killEvent(e);
})), this.focusser.on("focus", this.bind(function() {
this.container.hasClass("select2-container-active") || this.opts.element.trigger($.Event("select2-focus")), 
this.container.addClass("select2-container-active");
})).on("blur", this.bind(function() {
this.opened() || (this.container.removeClass("select2-container-active"), this.opts.element.trigger($.Event("select2-blur")));
})), this.search.on("focus", this.bind(function() {
this.container.hasClass("select2-container-active") || this.opts.element.trigger($.Event("select2-focus")), 
this.container.addClass("select2-container-active");
})), this.initContainerWidth(), this.opts.element.addClass("select2-offscreen"), 
this.setPlaceholder();
},
clear:function(triggerChange) {
var data = this.selection.data("select2-data");
data && (this.opts.element.val(""), this.selection.find("span").empty(), this.selection.removeData("select2-data"), 
this.setPlaceholder(), triggerChange !== !1 && (this.opts.element.trigger({
type:"select2-removed",
val:this.id(data),
choice:data
}), this.triggerChange({
removed:data
})));
},
initSelection:function() {
if ("" === this.opts.element.val() && "" === this.opts.element.text()) this.updateSelection([]), 
this.close(), this.setPlaceholder(); else {
var self = this;
this.opts.initSelection.call(null, this.opts.element, function(selected) {
selected !== undefined && null !== selected && (self.updateSelection(selected), 
self.close(), self.setPlaceholder());
});
}
},
prepareOpts:function() {
var opts = this.parent.prepareOpts.apply(this, arguments), self = this;
return "select" === opts.element.get(0).tagName.toLowerCase() ? opts.initSelection = function(element, callback) {
var selected = element.find(":selected");
callback(self.optionToData(selected));
} :"data" in opts && (opts.initSelection = opts.initSelection || function(element, callback) {
var id = element.val(), match = null;
opts.query({
matcher:function(term, text, el) {
var is_match = equal(id, opts.id(el));
return is_match && (match = el), is_match;
},
callback:$.isFunction(callback) ? function() {
callback(match);
} :$.noop
});
}), opts;
},
getPlaceholder:function() {
return this.select && "" !== this.select.find("option").first().text() ? undefined :this.parent.getPlaceholder.apply(this, arguments);
},
setPlaceholder:function() {
var placeholder = this.getPlaceholder();
if ("" === this.opts.element.val() && placeholder !== undefined) {
if (this.select && "" !== this.select.find("option:first").text()) return;
this.selection.find("span").html(this.opts.escapeMarkup(placeholder)), this.selection.addClass("select2-default"), 
this.container.removeClass("select2-allowclear");
}
},
postprocessResults:function(data, initial, noHighlightUpdate) {
var selected = 0, self = this;
if (this.findHighlightableChoices().each2(function(i, elm) {
return equal(self.id(elm.data("select2-data")), self.opts.element.val()) ? (selected = i, 
!1) :void 0;
}), noHighlightUpdate !== !1 && this.highlight(selected), initial === !0 && this.showSearchInput === !1) {
var min = this.opts.minimumResultsForSearch;
min >= 0 && this.showSearch(countResults(data.results) >= min);
}
},
showSearch:function(showSearchInput) {
this.showSearchInput = showSearchInput, this.dropdown.find(".select2-search").toggleClass("select2-search-hidden", !showSearchInput), 
this.dropdown.find(".select2-search").toggleClass("select2-offscreen", !showSearchInput), 
$(this.dropdown, this.container).toggleClass("select2-with-searchbox", showSearchInput);
},
onSelect:function(data, options) {
if (this.triggerSelect(data)) {
var old = this.opts.element.val(), oldData = this.data();
this.opts.element.val(this.id(data)), this.updateSelection(data), this.opts.element.trigger({
type:"select2-selected",
val:this.id(data),
choice:data
}), this.close(), options && options.noFocus || this.selection.focus(), equal(old, this.id(data)) || this.triggerChange({
added:data,
removed:oldData
});
}
},
updateSelection:function(data) {
var formatted, container = this.selection.find("span");
this.selection.data("select2-data", data), container.empty(), formatted = this.opts.formatSelection(data, container), 
formatted !== undefined && container.append(this.opts.escapeMarkup(formatted)), 
this.selection.removeClass("select2-default"), this.opts.allowClear && this.getPlaceholder() !== undefined && this.container.addClass("select2-allowclear");
},
val:function() {
var val, triggerChange = !1, data = null, self = this, oldData = this.data();
if (0 === arguments.length) return this.opts.element.val();
if (val = arguments[0], arguments.length > 1 && (triggerChange = arguments[1]), 
this.select) this.select.val(val).find(":selected").each2(function(i, elm) {
return data = self.optionToData(elm), !1;
}), this.updateSelection(data), this.setPlaceholder(), triggerChange && this.triggerChange({
added:data,
removed:oldData
}); else {
if (this.opts.initSelection === undefined) throw new Error("cannot call val() if initSelection() is not defined");
if (!val && 0 !== val) return this.clear(triggerChange), void 0;
this.opts.element.val(val), this.opts.initSelection(this.opts.element, function(data) {
self.opts.element.val(data ? self.id(data) :""), self.updateSelection(data), self.setPlaceholder(), 
triggerChange && self.triggerChange({
added:data,
removed:oldData
});
});
}
},
clearSearch:function() {
this.search.val(""), this.focusser.val("");
},
data:function(value, triggerChange) {
var data;
return 0 === arguments.length ? (data = this.selection.data("select2-data"), data == undefined && (data = null), 
data) :(value && "" !== value ? (data = this.data(), this.opts.element.val(value ? this.id(value) :""), 
this.updateSelection(value), triggerChange && this.triggerChange({
added:value,
removed:data
})) :this.clear(triggerChange), void 0);
}
}), MultiSelect2 = clazz(AbstractSelect2, {
createContainer:function() {
var container = $(document.createElement("div")).attr({
"class":"select2-container select2-container-multi"
}).html([ "    <ul class='select2-choices'>", "  <li class='select2-search-field'>", "    <input type='text' autocomplete='off' autocorrect='off' autocapitilize='off' spellcheck='false' class='select2-input'>", "  </li>", "</ul>", "<div class='select2-drop select2-drop-multi select2-display-none'>", "   <ul class='select2-results'>", "   </ul>", "</div>" ].join(""));
return container;
},
prepareOpts:function() {
var opts = this.parent.prepareOpts.apply(this, arguments), self = this;
return "select" === opts.element.get(0).tagName.toLowerCase() ? opts.initSelection = function(element, callback) {
var data = [];
element.find(":selected").each2(function(i, elm) {
data.push(self.optionToData(elm));
}), callback(data);
} :"data" in opts && (opts.initSelection = opts.initSelection || function(element, callback) {
var ids = splitVal(element.val(), opts.separator), matches = [];
opts.query({
matcher:function(term, text, el) {
var is_match = $.grep(ids, function(id) {
return equal(id, opts.id(el));
}).length;
return is_match && matches.push(el), is_match;
},
callback:$.isFunction(callback) ? function() {
for (var ordered = [], i = 0; i < ids.length; i++) for (var id = ids[i], j = 0; j < matches.length; j++) {
var match = matches[j];
if (equal(id, opts.id(match))) {
ordered.push(match), matches.splice(j, 1);
break;
}
}
callback(ordered);
} :$.noop
});
}), opts;
},
selectChoice:function(choice) {
var selected = this.container.find(".select2-search-choice-focus");
selected.length && choice && choice[0] == selected[0] || (selected.length && this.opts.element.trigger("choice-deselected", selected), 
selected.removeClass("select2-search-choice-focus"), choice && choice.length && (this.close(), 
choice.addClass("select2-search-choice-focus"), this.opts.element.trigger("choice-selected", choice)));
},
initContainer:function() {
var selection, selector = ".select2-choices";
this.searchContainer = this.container.find(".select2-search-field"), this.selection = selection = this.container.find(selector);
var _this = this;
this.selection.on("mousedown", ".select2-search-choice", function() {
_this.search[0].focus(), _this.selectChoice($(this));
}), this.search.attr("id", "s2id_autogen" + nextUid()), $("label[for='" + this.opts.element.attr("id") + "']").attr("for", this.search.attr("id")), 
this.search.on("input paste", this.bind(function() {
this.isInterfaceEnabled() && (this.opened() || this.open());
})), this.search.attr("tabindex", this.elementTabIndex), this.keydowns = 0, this.search.on("keydown", this.bind(function(e) {
if (this.isInterfaceEnabled()) {
++this.keydowns;
var selected = selection.find(".select2-search-choice-focus"), prev = selected.prev(".select2-search-choice:not(.select2-locked)"), next = selected.next(".select2-search-choice:not(.select2-locked)"), pos = getCursorInfo(this.search);
if (selected.length && (e.which == KEY.LEFT || e.which == KEY.RIGHT || e.which == KEY.BACKSPACE || e.which == KEY.DELETE || e.which == KEY.ENTER)) {
var selectedChoice = selected;
return e.which == KEY.LEFT && prev.length ? selectedChoice = prev :e.which == KEY.RIGHT ? selectedChoice = next.length ? next :null :e.which === KEY.BACKSPACE ? (this.unselect(selected.first()), 
this.search.width(10), selectedChoice = prev.length ? prev :next) :e.which == KEY.DELETE ? (this.unselect(selected.first()), 
this.search.width(10), selectedChoice = next.length ? next :null) :e.which == KEY.ENTER && (selectedChoice = null), 
this.selectChoice(selectedChoice), killEvent(e), selectedChoice && selectedChoice.length || this.open(), 
void 0;
}
if ((e.which === KEY.BACKSPACE && 1 == this.keydowns || e.which == KEY.LEFT) && 0 == pos.offset && !pos.length) return this.selectChoice(selection.find(".select2-search-choice:not(.select2-locked)").last()), 
killEvent(e), void 0;
if (this.selectChoice(null), this.opened()) switch (e.which) {
case KEY.UP:
case KEY.DOWN:
return this.moveHighlight(e.which === KEY.UP ? -1 :1), killEvent(e), void 0;

case KEY.ENTER:
return this.selectHighlighted(), killEvent(e), void 0;

case KEY.TAB:
return this.selectHighlighted({
noFocus:!0
}), void 0;

case KEY.ESC:
return this.cancel(e), killEvent(e), void 0;
}
if (e.which !== KEY.TAB && !KEY.isControl(e) && !KEY.isFunctionKey(e) && e.which !== KEY.BACKSPACE && e.which !== KEY.ESC) {
if (e.which === KEY.ENTER) {
if (this.opts.openOnEnter === !1) return;
if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) return;
}
this.open(), (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) && killEvent(e), 
e.which === KEY.ENTER && killEvent(e);
}
}
})), this.search.on("keyup", this.bind(function() {
this.keydowns = 0, this.resizeSearch();
})), this.search.on("blur", this.bind(function(e) {
this.container.removeClass("select2-container-active"), this.search.removeClass("select2-focused"), 
this.selectChoice(null), this.opened() || this.clearSearch(), e.stopImmediatePropagation(), 
this.opts.element.trigger($.Event("select2-blur"));
})), this.container.on("mousedown", selector, this.bind(function(e) {
this.isInterfaceEnabled() && ($(e.target).closest(".select2-search-choice").length > 0 || (this.selectChoice(null), 
this.clearPlaceholder(), this.container.hasClass("select2-container-active") || this.opts.element.trigger($.Event("select2-focus")), 
this.open(), this.focusSearch(), e.preventDefault()));
})), this.container.on("focus", selector, this.bind(function() {
this.isInterfaceEnabled() && (this.container.hasClass("select2-container-active") || this.opts.element.trigger($.Event("select2-focus")), 
this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"), 
this.clearPlaceholder());
})), this.initContainerWidth(), this.opts.element.addClass("select2-offscreen"), 
this.clearSearch();
},
enableInterface:function() {
this.parent.enableInterface.apply(this, arguments) && this.search.prop("disabled", !this.isInterfaceEnabled());
},
initSelection:function() {
if ("" === this.opts.element.val() && "" === this.opts.element.text() && (this.updateSelection([]), 
this.close(), this.clearSearch()), this.select || "" !== this.opts.element.val()) {
var self = this;
this.opts.initSelection.call(null, this.opts.element, function(data) {
data !== undefined && null !== data && (self.updateSelection(data), self.close(), 
self.clearSearch());
});
}
},
clearSearch:function() {
var placeholder = this.getPlaceholder(), maxWidth = this.getMaxSearchWidth();
placeholder !== undefined && 0 === this.getVal().length && this.search.hasClass("select2-focused") === !1 ? (this.search.val(placeholder).addClass("select2-default"), 
this.search.width(maxWidth > 0 ? maxWidth :this.container.css("width"))) :this.search.val("").width(10);
},
clearPlaceholder:function() {
this.search.hasClass("select2-default") && this.search.val("").removeClass("select2-default");
},
opening:function() {
this.clearPlaceholder(), this.resizeSearch(), this.parent.opening.apply(this, arguments), 
this.focusSearch(), this.updateResults(!0), this.search.focus(), this.opts.element.trigger($.Event("select2-open"));
},
close:function() {
this.opened() && this.parent.close.apply(this, arguments);
},
focus:function() {
this.close(), this.search.focus();
},
isFocused:function() {
return this.search.hasClass("select2-focused");
},
updateSelection:function(data) {
var ids = [], filtered = [], self = this;
$(data).each(function() {
indexOf(self.id(this), ids) < 0 && (ids.push(self.id(this)), filtered.push(this));
}), data = filtered, this.selection.find(".select2-search-choice").remove(), $(data).each(function() {
self.addSelectedChoice(this);
}), self.postprocessResults();
},
tokenize:function() {
var input = this.search.val();
input = this.opts.tokenizer(input, this.data(), this.bind(this.onSelect), this.opts), 
null != input && input != undefined && (this.search.val(input), input.length > 0 && this.open());
},
onSelect:function(data, options) {
this.triggerSelect(data) && (this.addSelectedChoice(data), this.opts.element.trigger({
type:"selected",
val:this.id(data),
choice:data
}), (this.select || !this.opts.closeOnSelect) && this.postprocessResults(), this.opts.closeOnSelect ? (this.close(), 
this.search.width(10)) :this.countSelectableResults() > 0 ? (this.search.width(10), 
this.resizeSearch(), this.getMaximumSelectionSize() > 0 && this.val().length >= this.getMaximumSelectionSize() && this.updateResults(!0), 
this.positionDropdown()) :(this.close(), this.search.width(10)), this.triggerChange({
added:data
}), options && options.noFocus || this.focusSearch());
},
cancel:function() {
this.close(), this.focusSearch();
},
addSelectedChoice:function(data) {
var formatted, enableChoice = !data.locked, enabledItem = $("<li class='select2-search-choice'>    <div></div>    <a href='#' onclick='return false;' class='select2-search-choice-close' tabindex='-1'></a></li>"), disabledItem = $("<li class='select2-search-choice select2-locked'><div></div></li>"), choice = enableChoice ? enabledItem :disabledItem, id = this.id(data), val = this.getVal();
formatted = this.opts.formatSelection(data, choice.find("div")), formatted != undefined && choice.find("div").replaceWith("<div title='" + this.opts.escapeMarkup(formatted) + "'>" + this.opts.escapeMarkup(formatted) + "</div>"), 
enableChoice && choice.find(".select2-search-choice-close").on("mousedown", killEvent).on("click dblclick", this.bind(function(e) {
this.isInterfaceEnabled() && ($(e.target).closest(".select2-search-choice").fadeOut("fast", this.bind(function() {
this.unselect($(e.target)), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"), 
this.close(), this.focusSearch();
})).dequeue(), killEvent(e));
})).on("focus", this.bind(function() {
this.isInterfaceEnabled() && (this.container.addClass("select2-container-active"), 
this.dropdown.addClass("select2-drop-active"));
})), choice.data("select2-data", data), choice.insertBefore(this.searchContainer), 
val.push(id), this.setVal(val);
},
unselect:function(selected) {
var data, index, val = this.getVal();
if (selected = selected.closest(".select2-search-choice"), 0 === selected.length) throw "Invalid argument: " + selected + ". Must be .select2-search-choice";
data = selected.data("select2-data"), data && (index = indexOf(this.id(data), val), 
index >= 0 && (val.splice(index, 1), this.setVal(val), this.select && this.postprocessResults()), 
selected.remove(), this.opts.element.trigger({
type:"removed",
val:this.id(data),
choice:data
}), this.triggerChange({
removed:data
}));
},
postprocessResults:function(data, initial, noHighlightUpdate) {
var val = this.getVal(), choices = this.results.find(".select2-result"), compound = this.results.find(".select2-result-with-children"), self = this;
choices.each2(function(i, choice) {
var id = self.id(choice.data("select2-data"));
indexOf(id, val) >= 0 && (choice.addClass("select2-selected"), choice.find(".select2-result-selectable").addClass("select2-selected"));
}), compound.each2(function(i, choice) {
choice.is(".select2-result-selectable") || 0 !== choice.find(".select2-result-selectable:not(.select2-selected)").length || choice.addClass("select2-selected");
}), -1 == this.highlight() && noHighlightUpdate !== !1 && self.highlight(0), !this.opts.createSearchChoice && !choices.filter(".select2-result:not(.select2-selected)").length > 0 && this.results.append("<li class='select2-no-results'>" + self.opts.formatNoMatches(self.search.val()) + "</li>");
},
getMaxSearchWidth:function() {
return this.selection.width() - getSideBorderPadding(this.search);
},
resizeSearch:function() {
var minimumWidth, left, maxWidth, containerLeft, searchWidth, sideBorderPadding = getSideBorderPadding(this.search);
minimumWidth = measureTextWidth(this.search) + 10, left = this.search.offset().left, 
maxWidth = this.selection.width(), containerLeft = this.selection.offset().left, 
searchWidth = maxWidth - (left - containerLeft) - sideBorderPadding, minimumWidth > searchWidth && (searchWidth = maxWidth - sideBorderPadding), 
40 > searchWidth && (searchWidth = maxWidth - sideBorderPadding), 0 >= searchWidth && (searchWidth = minimumWidth), 
this.search.width(searchWidth);
},
getVal:function() {
var val;
return this.select ? (val = this.select.val(), null === val ? [] :val) :(val = this.opts.element.val(), 
splitVal(val, this.opts.separator));
},
setVal:function(val) {
var unique;
this.select ? this.select.val(val) :(unique = [], $(val).each(function() {
indexOf(this, unique) < 0 && unique.push(this);
}), this.opts.element.val(0 === unique.length ? "" :unique.join(this.opts.separator)));
},
buildChangeDetails:function(old, current) {
for (var current = current.slice(0), old = old.slice(0), i = 0; i < current.length; i++) for (var j = 0; j < old.length; j++) equal(this.opts.id(current[i]), this.opts.id(old[j])) && (current.splice(i, 1), 
i--, old.splice(j, 1), j--);
return {
added:current,
removed:old
};
},
val:function(val, triggerChange) {
var oldData, self = this;
if (0 === arguments.length) return this.getVal();
if (oldData = this.data(), oldData.length || (oldData = []), !val && 0 !== val) return this.opts.element.val(""), 
this.updateSelection([]), this.clearSearch(), triggerChange && this.triggerChange({
added:this.data(),
removed:oldData
}), void 0;
if (this.setVal(val), this.select) this.opts.initSelection(this.select, this.bind(this.updateSelection)), 
triggerChange && this.triggerChange(this.buildChangeDetails(oldData, this.data())); else {
if (this.opts.initSelection === undefined) throw new Error("val() cannot be called if initSelection() is not defined");
this.opts.initSelection(this.opts.element, function(data) {
var ids = $(data).map(self.id);
self.setVal(ids), self.updateSelection(data), self.clearSearch(), triggerChange && self.triggerChange(this.buildChangeDetails(oldData, this.data()));
});
}
this.clearSearch();
},
onSortStart:function() {
if (this.select) throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
this.search.width(0), this.searchContainer.hide();
},
onSortEnd:function() {
var val = [], self = this;
this.searchContainer.show(), this.searchContainer.appendTo(this.searchContainer.parent()), 
this.resizeSearch(), this.selection.find(".select2-search-choice").each(function() {
val.push(self.opts.id($(this).data("select2-data")));
}), this.setVal(val), this.triggerChange();
},
data:function(values, triggerChange) {
var ids, old, self = this;
return 0 === arguments.length ? this.selection.find(".select2-search-choice").map(function() {
return $(this).data("select2-data");
}).get() :(old = this.data(), values || (values = []), ids = $.map(values, function(e) {
return self.opts.id(e);
}), this.setVal(ids), this.updateSelection(values), this.clearSearch(), triggerChange && this.triggerChange(this.buildChangeDetails(old, this.data())), 
void 0);
}
}), $.fn.select2 = function() {
var opts, select2, value, multiple, args = Array.prototype.slice.call(arguments, 0), allowedMethods = [ "val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "onSortStart", "onSortEnd", "enable", "readonly", "positionDropdown", "data" ], valueMethods = [ "val", "opened", "isFocused", "container", "data" ];
return this.each(function() {
if (0 === args.length || "object" == typeof args[0]) opts = 0 === args.length ? {} :$.extend({}, args[0]), 
opts.element = $(this), "select" === opts.element.get(0).tagName.toLowerCase() ? multiple = opts.element.prop("multiple") :(multiple = opts.multiple || !1, 
"tags" in opts && (opts.multiple = multiple = !0)), select2 = multiple ? new MultiSelect2() :new SingleSelect2(), 
select2.init(opts); else {
if ("string" != typeof args[0]) throw "Invalid arguments to select2 plugin: " + args;
if (indexOf(args[0], allowedMethods) < 0) throw "Unknown method: " + args[0];
if (value = undefined, select2 = $(this).data("select2"), select2 === undefined) return;
if (value = "container" === args[0] ? select2.container :select2[args[0]].apply(select2, args.slice(1)), 
indexOf(args[0], valueMethods) >= 0) return !1;
}
}), value === undefined ? this :value;
}, $.fn.select2.defaults = {
width:"copy",
loadMorePadding:0,
closeOnSelect:!0,
openOnEnter:!0,
containerCss:{},
dropdownCss:{},
containerCssClass:"",
dropdownCssClass:"",
formatResult:function(result, container, query, escapeMarkup) {
var markup = [];
return markMatch(result.text, query.term, markup, escapeMarkup), markup.join("");
},
formatSelection:function(data) {
return data ? data.text :undefined;
},
sortResults:function(results) {
return results;
},
formatResultCssClass:function() {
return undefined;
},
formatNoMatches:function() {
return "No matches found";
},
formatInputTooShort:function(input, min) {
var n = min - input.length;
return "Please enter " + n + " more character" + (1 == n ? "" :"s");
},
formatInputTooLong:function(input, max) {
var n = input.length - max;
return "Please delete " + n + " character" + (1 == n ? "" :"s");
},
formatSelectionTooBig:function(limit) {
return "You can only select " + limit + " item" + (1 == limit ? "" :"s");
},
formatLoadMore:function() {
return "Loading more results...";
},
formatSearching:function() {
return "Searching...";
},
minimumResultsForSearch:0,
minimumInputLength:0,
maximumInputLength:null,
maximumSelectionSize:0,
id:function(e) {
return e.id;
},
matcher:function(term, text) {
return ("" + text).toUpperCase().indexOf(("" + term).toUpperCase()) >= 0;
},
separator:",",
tokenSeparators:[],
tokenizer:defaultTokenizer,
escapeMarkup:function(markup) {
var replace_map = {
"\\":"&#92;",
"&":"&amp;",
"<":"&lt;",
">":"&gt;",
'"':"&quot;",
"'":"&#39;",
"/":"&#47;"
};
return String(markup).replace(/[&<>"'\/\\]/g, function(match) {
return replace_map[match];
});
},
blurOnChange:!1,
selectOnBlur:!1,
adaptContainerCssClass:function(c) {
return c;
},
adaptDropdownCssClass:function() {
return null;
}
}, $.fn.select2.ajaxDefaults = {
transport:$.ajax,
params:{
type:"GET",
cache:!1,
dataType:"json"
}
}, window.Select2 = {
query:{
ajax:ajax,
local:local,
tags:tags
},
util:{
debounce:debounce,
markMatch:markMatch
},
"class":{
"abstract":AbstractSelect2,
single:SingleSelect2,
multi:MultiSelect2
}
};
}
}(jQuery), /* =============================================================
 * bootstrap-typeahead.js v2.0.0
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
!function($) {
"use strict";
var Typeahead = function(element, options) {
this.$element = $(element), this.options = $.extend({}, $.fn.typeahead.defaults, options), 
this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, 
this.highlighter = this.options.highlighter || this.highlighter, this.$menu = $(this.options.menu).appendTo("body"), 
this.source = this.options.source, this.onselect = this.options.onselect, this.strings = !0, 
this.shown = !1, this.listen();
};
Typeahead.prototype = {
constructor:Typeahead,
select:function() {
var text, val = JSON.parse(this.$menu.find(".active").attr("data-value"));
return text = this.strings ? val :val[this.options.property], this.$element.val(text), 
"function" == typeof this.onselect && this.onselect(val), this.hide();
},
show:function() {
var pos = $.extend({}, this.$element.offset(), {
height:this.$element[0].offsetHeight
});
return this.$menu.css({
top:pos.top + pos.height,
left:pos.left
}), this.$menu.show(), this.shown = !0, this;
},
hide:function() {
return this.$menu.hide(), this.shown = !1, this;
},
lookup:function() {
var value;
this.query = this.$element.val(), "function" == typeof this.source ? (value = this.source(this, this.query), 
value && this.process(value)) :this.process(this.source);
},
process:function(results) {
var items, that = this;
return results.length && "string" != typeof results[0] && (this.strings = !1), this.query = this.$element.val(), 
this.query ? (items = $.grep(results, function(item) {
return that.strings || (item = item[that.options.property]), that.matcher(item) ? item :void 0;
}), items = this.sorter(items), items.length ? this.render(items.slice(0, this.options.items)).show() :this.shown ? this.hide() :this) :this.shown ? this.hide() :this;
},
matcher:function(item) {
return ~item.toLowerCase().indexOf(this.query.toLowerCase());
},
sorter:function(items) {
for (var item, sortby, beginswith = [], caseSensitive = [], caseInsensitive = []; item = items.shift(); ) sortby = this.strings ? item :item[this.options.property], 
sortby.toLowerCase().indexOf(this.query.toLowerCase()) ? ~sortby.indexOf(this.query) ? caseSensitive.push(item) :caseInsensitive.push(item) :beginswith.push(item);
return beginswith.concat(caseSensitive, caseInsensitive);
},
highlighter:function(item) {
return item.replace(new RegExp("(" + this.query + ")", "ig"), function($1, match) {
return "<strong>" + match + "</strong>";
});
},
render:function(items) {
var that = this;
return items = $(items).map(function(i, item) {
return i = $(that.options.item).attr("data-value", JSON.stringify(item)), that.strings || (item = item[that.options.property]), 
i.find("a").html(that.highlighter(item)), i[0];
}), items.first().addClass("active"), this.$menu.html(items), this;
},
next:function() {
var active = this.$menu.find(".active").removeClass("active"), next = active.next();
next.length || (next = $(this.$menu.find("li")[0])), next.addClass("active");
},
prev:function() {
var active = this.$menu.find(".active").removeClass("active"), prev = active.prev();
prev.length || (prev = this.$menu.find("li").last()), prev.addClass("active");
},
listen:function() {
this.$element.on("blur", $.proxy(this.blur, this)).on("keypress", $.proxy(this.keypress, this)).on("keyup", $.proxy(this.keyup, this)), 
($.browser.webkit || $.browser.msie) && this.$element.on("keydown", $.proxy(this.keypress, this)), 
this.$menu.on("click", $.proxy(this.click, this)).on("mouseenter", "li", $.proxy(this.mouseenter, this));
},
keyup:function(e) {
switch (e.stopPropagation(), e.preventDefault(), e.keyCode) {
case 40:
case 38:
break;

case 9:
case 13:
if (!this.shown) return;
this.select();
break;

case 27:
this.hide();
break;

default:
this.lookup();
}
},
keypress:function(e) {
if (e.stopPropagation(), this.shown) switch (e.keyCode) {
case 9:
case 13:
case 27:
e.preventDefault();
break;

case 38:
e.preventDefault(), this.prev();
break;

case 40:
e.preventDefault(), this.next();
}
},
blur:function(e) {
var that = this;
e.stopPropagation(), e.preventDefault(), setTimeout(function() {
that.hide();
}, 150);
},
click:function(e) {
e.stopPropagation(), e.preventDefault(), this.select();
},
mouseenter:function(e) {
this.$menu.find(".active").removeClass("active"), $(e.currentTarget).addClass("active");
}
}, $.fn.typeahead = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("typeahead"), options = "object" == typeof option && option;
data || $this.data("typeahead", data = new Typeahead(this, options)), "string" == typeof option && data[option]();
});
}, $.fn.typeahead.defaults = {
source:[],
items:8,
menu:'<ul class="typeahead dropdown-menu"></ul>',
item:'<li><a href="#"></a></li>',
onselect:null,
property:"value"
}, $.fn.typeahead.Constructor = Typeahead, $(function() {
$("body").on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(e) {
var $this = $(this);
$this.data("typeahead") || (e.preventDefault(), $this.typeahead($this.data()));
});
});
}(window.jQuery), /**
 * @license
 * =========================================================
 * bootstrap-datetimepicker.js
 * http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Copyright 2012 Stefan Petre
 *
 * Contributions:
 *  - Andrew Rowls
 *  - Thiago de Arruda
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================
 */
function($) {
function escapeRegExp(str) {
return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function padLeft(s, l, c) {
return l < s.length ? s :Array(l - s.length + 1).join(c || " ") + s;
}
function getTemplate(timeIcon, pickDate, pickTime, is12Hours) {
return pickDate && pickTime ? '<div class="bootstrap-datetimepicker-widget dropdown-menu-orig"><ul><li class="collapse in"><div class="datepicker">' + DPGlobal.template + '</div></li><li class="picker-switch"><a class="accordion-toggle"><i class="' + timeIcon + '"></i></a></li><li class="collapse"><div class="timepicker">' + TPGlobal.getTemplate(is12Hours) + "</div></li></ul></div>" :pickTime ? '<div class="bootstrap-datetimepicker-widget dropdown-menu-orig"><div class="timepicker">' + TPGlobal.getTemplate(is12Hours) + "</div></div>" :'<div class="bootstrap-datetimepicker-widget dropdown-menu-orig"><div class="datepicker">' + DPGlobal.template + "</div></div>";
}
function UTCDate() {
return new Date(Date.UTC.apply(Date, arguments));
}
var DateTimePicker = (void 0 != window.orientation, function(element, options) {
this.id = dpgId++, this.init(element, options);
});
DateTimePicker.prototype = {
constructor:DateTimePicker,
init:function(element, options) {
var icon;
if (!options.pickTime && !options.pickDate) throw new Error("Must choose at least one picker");
if (this.options = options, this.$element = $(element), this.language = options.language in dates ? options.language :"en", 
this.pickDate = options.pickDate, this.pickTime = options.pickTime, this.isInput = this.$element.is("input"), 
this.component = !1, (this.$element.is(".input-append") || this.$element.is(".input-prepend")) && (this.component = this.$element.find(".add-on")), 
this.format = options.format, this.format || (this.format = this.isInput ? this.$element.data("format") :this.$element.find("input").data("format"), 
this.format || (this.format = "MM/dd/yyyy")), this._compileFormat(), this.component && (icon = this.component.find("i")), 
this.pickTime && (icon && icon.length && (this.timeIcon = icon.data("time-icon")), 
this.timeIcon || (this.timeIcon = "icon-clock"), icon.addClass(this.timeIcon)), 
this.pickDate && (icon && icon.length && (this.dateIcon = icon.data("date-icon")), 
this.dateIcon || (this.dateIcon = "icon-calendar"), icon.removeClass(this.timeIcon), 
icon.addClass(this.dateIcon)), this.widget = $(getTemplate(this.timeIcon, options.pickDate, options.pickTime, options.pick12HourFormat)).appendTo("body"), 
this.minViewMode = options.minViewMode || this.$element.data("date-minviewmode") || 0, 
"string" == typeof this.minViewMode) switch (this.minViewMode) {
case "months":
this.minViewMode = 1;
break;

case "years":
this.minViewMode = 2;
break;

default:
this.minViewMode = 0;
}
if (this.viewMode = options.viewMode || this.$element.data("date-viewmode") || 0, 
"string" == typeof this.viewMode) switch (this.viewMode) {
case "months":
this.viewMode = 1;
break;

case "years":
this.viewMode = 2;
break;

default:
this.viewMode = 0;
}
this.startViewMode = this.viewMode, this.weekStart = options.weekStart || this.$element.data("date-weekstart") || 0, 
this.weekEnd = 0 === this.weekStart ? 6 :this.weekStart - 1, this.fillDow(), this.fillMonths(), 
this.fillHours(), this.fillMinutes(), this.fillSeconds(), this.update(), this.showMode(), 
this._attachDatePickerEvents();
},
show:function(e) {
this.widget.show(), this.height = this.component ? this.component.outerHeight() :this.$element.outerHeight(), 
this.place(), this.$element.trigger({
type:"show",
date:this._date
}), this._attachDatePickerGlobalEvents(), e && (e.stopPropagation(), e.preventDefault());
},
hide:function() {
for (var collapse = this.widget.find(".collapse"), i = 0; i < collapse.length; i++) {
var collapseData = collapse.eq(i).data("collapse");
if (collapseData && collapseData.transitioning) return;
}
this.widget.hide(), this.viewMode = this.startViewMode, this.showMode(), this.set(), 
this.$element.trigger({
type:"hide",
date:this._date
}), this._detachDatePickerGlobalEvents();
},
set:function() {
var formatted = "";
if (this._unset || (formatted = this.formatDate(this._date)), this.isInput) this.$element.val(formatted), 
this._resetMaskPos(this.$element); else {
if (this.component) {
var input = this.$element.find("input");
input.val(formatted), this._resetMaskPos(input);
}
this.$element.data("date", formatted);
}
},
setValue:function(newDate) {
this._unset = newDate ? !1 :!0, "string" == typeof newDate ? this._date = this.parseDate(newDate) :newDate && (this._date = new Date(newDate)), 
this.set(), this.viewDate = UTCDate(this._date.getUTCFullYear(), this._date.getUTCMonth(), 1, 0, 0, 0, 0), 
this.fillDate(), this.fillTime();
},
getDate:function() {
return this._unset ? null :new Date(this._date.valueOf());
},
setDate:function(date) {
date ? this.setValue(date.valueOf()) :this.setValue(null);
},
getLocalDate:function() {
if (this._unset) return null;
var d = this._date;
return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
},
setLocalDate:function(localDate) {
localDate ? this.setValue(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), localDate.getHours(), localDate.getMinutes(), localDate.getSeconds(), localDate.getMilliseconds())) :this.setValue(null);
},
place:function() {
var offset = this.component ? this.component.offset() :this.$element.offset();
this.widget.css({
top:offset.top + this.height,
left:offset.left
});
},
notifyChange:function() {
this.$element.trigger({
type:"changeDate",
date:this.getDate(),
localDate:this.getLocalDate()
});
},
update:function(newDate) {
var dateStr = newDate;
if (!dateStr) if (dateStr = this.isInput ? this.$element.val() :this.$element.find("input").val()) this._date = this.parseDate(dateStr); else {
var tmp = new Date();
this._date = UTCDate(tmp.getFullYear(), tmp.getMonth(), tmp.getDate(), tmp.getHours(), tmp.getMinutes(), tmp.getSeconds(), tmp.getMilliseconds());
}
this.viewDate = UTCDate(this._date.getUTCFullYear(), this._date.getUTCMonth(), 1, 0, 0, 0, 0), 
this.fillDate(), this.fillTime();
},
fillDow:function() {
for (var dowCnt = this.weekStart, html = "<tr>"; dowCnt < this.weekStart + 7; ) html += '<th class="dow">' + dates[this.language].daysMin[dowCnt++ % 7] + "</th>";
html += "</tr>", this.widget.find(".datepicker-days thead").append(html);
},
fillMonths:function() {
for (var html = "", i = 0; 12 > i; ) html += '<span class="month">' + dates[this.language].monthsShort[i++] + "</span>";
this.widget.find(".datepicker-months td").append(html);
},
fillDate:function() {
var year = this.viewDate.getUTCFullYear(), month = this.viewDate.getUTCMonth(), currentDate = UTCDate(this._date.getUTCFullYear(), this._date.getUTCMonth(), this._date.getUTCDate(), 0, 0, 0, 0);
this.widget.find(".datepicker-days th:eq(1)").text(dates[this.language].months[month] + " " + year);
var prevMonth = UTCDate(year, month - 1, 28, 0, 0, 0, 0), day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
prevMonth.setUTCDate(day), prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.weekStart + 7) % 7);
var nextMonth = new Date(prevMonth.valueOf());
nextMonth.setUTCDate(nextMonth.getUTCDate() + 42), nextMonth = nextMonth.valueOf();
for (var clsName, html = []; prevMonth.valueOf() < nextMonth; ) prevMonth.getUTCDay() === this.weekStart && html.push("<tr>"), 
clsName = "", prevMonth.getUTCFullYear() < year || prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() < month ? clsName += " old" :(prevMonth.getUTCFullYear() > year || prevMonth.getUTCFullYear() == year && prevMonth.getUTCMonth() > month) && (clsName += " new"), 
prevMonth.valueOf() === currentDate.valueOf() && (clsName += " active"), html.push('<td class="day' + clsName + '">' + prevMonth.getUTCDate() + "</td>"), 
prevMonth.getUTCDay() === this.weekEnd && html.push("</tr>"), prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
this.widget.find(".datepicker-days tbody").empty().append(html.join(""));
var currentYear = this._date.getUTCFullYear(), months = this.widget.find(".datepicker-months").find("th:eq(1)").text(year).end().find("span").removeClass("active");
currentYear === year && months.eq(this._date.getUTCMonth()).addClass("active"), 
html = "", year = 10 * parseInt(year / 10, 10);
var yearCont = this.widget.find(".datepicker-years").find("th:eq(1)").text(year + "-" + (year + 9)).end().find("td");
year -= 1;
for (var i = -1; 11 > i; i++) html += '<span class="year' + (-1 === i || 10 === i ? " old" :"") + (currentYear === year ? " active" :"") + '">' + year + "</span>", 
year += 1;
yearCont.html(html);
},
fillHours:function() {
var table = this.widget.find(".timepicker .timepicker-hours table");
table.parent().hide();
var html = "";
if (this.options.pick12HourFormat) for (var current = 1, i = 0; 3 > i; i += 1) {
html += "<tr>";
for (var j = 0; 4 > j; j += 1) {
var c = current.toString();
html += '<td class="hour">' + padLeft(c, 2, "0") + "</td>", current++;
}
html += "</tr>";
} else for (var current = 0, i = 0; 6 > i; i += 1) {
html += "<tr>";
for (var j = 0; 4 > j; j += 1) {
var c = current.toString();
html += '<td class="hour">' + padLeft(c, 2, "0") + "</td>", current++;
}
html += "</tr>";
}
table.html(html);
},
fillMinutes:function() {
var table = this.widget.find(".timepicker .timepicker-minutes table");
table.parent().hide();
for (var html = "", current = 0, i = 0; 5 > i; i++) {
html += "<tr>";
for (var j = 0; 4 > j; j += 1) {
var c = current.toString();
html += '<td class="minute">' + padLeft(c, 2, "0") + "</td>", current += 3;
}
html += "</tr>";
}
table.html(html);
},
fillSeconds:function() {
var table = this.widget.find(".timepicker .timepicker-seconds table");
table.parent().hide();
for (var html = "", current = 0, i = 0; 5 > i; i++) {
html += "<tr>";
for (var j = 0; 4 > j; j += 1) {
var c = current.toString();
html += '<td class="second">' + padLeft(c, 2, "0") + "</td>", current += 3;
}
html += "</tr>";
}
table.html(html);
},
fillTime:function() {
if (this._date) {
var timeComponents = this.widget.find(".timepicker span[data-time-component]"), is12HourFormat = (timeComponents.closest("table"), 
this.options.pick12HourFormat), hour = this._date.getUTCHours(), period = "AM";
is12HourFormat && (hour >= 12 && (period = "PM"), 0 === hour ? hour = 12 :12 != hour && (hour %= 12), 
this.widget.find(".timepicker [data-action=togglePeriod]").text(period)), hour = padLeft(hour.toString(), 2, "0");
var minute = padLeft(this._date.getUTCMinutes().toString(), 2, "0"), second = padLeft(this._date.getUTCSeconds().toString(), 2, "0");
timeComponents.filter("[data-time-component=hours]").text(hour), timeComponents.filter("[data-time-component=minutes]").text(minute), 
timeComponents.filter("[data-time-component=seconds]").text(second);
}
},
click:function(e) {
e.stopPropagation(), e.preventDefault();
var target = $(e.target).closest("span, td, th");
if (1 === target.length) switch (target[0].nodeName.toLowerCase()) {
case "th":
switch (target[0].className) {
case "switch":
this.showMode(1);
break;

case "prev":
case "next":
var vd = this.viewDate, navFnc = DPGlobal.modes[this.viewMode].navFnc, step = DPGlobal.modes[this.viewMode].navStep;
"prev" === target[0].className && (step = -1 * step), vd["set" + navFnc](vd["get" + navFnc]() + step), 
this.fillDate(), this.set();
}
break;

case "span":
if (target.is(".month")) {
var month = target.parent().find("span").index(target);
this.viewDate.setUTCMonth(month);
} else {
var year = parseInt(target.text(), 10) || 0;
this.viewDate.setUTCFullYear(year);
}
0 !== this.viewMode && (this._date = UTCDate(this.viewDate.getUTCFullYear(), this.viewDate.getUTCMonth(), this.viewDate.getUTCDate(), this._date.getUTCHours(), this._date.getUTCMinutes(), this._date.getUTCSeconds(), this._date.getUTCMilliseconds()), 
this.notifyChange()), this.showMode(-1), this.fillDate(), this.set();
break;

case "td":
if (target.is(".day")) {
var day = parseInt(target.text(), 10) || 1, month = this.viewDate.getUTCMonth(), year = this.viewDate.getUTCFullYear();
target.is(".old") ? 0 === month ? (month = 11, year -= 1) :month -= 1 :target.is(".new") && (11 == month ? (month = 0, 
year += 1) :month += 1), this._date = UTCDate(year, month, day, this._date.getUTCHours(), this._date.getUTCMinutes(), this._date.getUTCSeconds(), this._date.getUTCMilliseconds()), 
this.viewDate = UTCDate(year, month, Math.min(28, day), 0, 0, 0, 0), this.fillDate(), 
this.set(), this.notifyChange();
}
}
},
actions:{
incrementHours:function() {
this._date.setUTCHours(this._date.getUTCHours() + 1);
},
incrementMinutes:function() {
this._date.setUTCMinutes(this._date.getUTCMinutes() + 1);
},
incrementSeconds:function() {
this._date.setUTCSeconds(this._date.getUTCSeconds() + 1);
},
decrementHours:function() {
this._date.setUTCHours(this._date.getUTCHours() - 1);
},
decrementMinutes:function() {
this._date.setUTCMinutes(this._date.getUTCMinutes() - 1);
},
decrementSeconds:function() {
this._date.setUTCSeconds(this._date.getUTCSeconds() - 1);
},
togglePeriod:function() {
var hour = this._date.getUTCHours();
hour >= 12 ? hour -= 12 :hour += 12, this._date.setUTCHours(hour);
},
showPicker:function() {
this.widget.find(".timepicker > div:not(.timepicker-picker)").hide(), this.widget.find(".timepicker .timepicker-picker").show();
},
showHours:function() {
this.widget.find(".timepicker .timepicker-picker").hide(), this.widget.find(".timepicker .timepicker-hours").show();
},
showMinutes:function() {
this.widget.find(".timepicker .timepicker-picker").hide(), this.widget.find(".timepicker .timepicker-minutes").show();
},
showSeconds:function() {
this.widget.find(".timepicker .timepicker-picker").hide(), this.widget.find(".timepicker .timepicker-seconds").show();
},
selectHour:function(e) {
var tgt = $(e.target), value = parseInt(tgt.text(), 10);
if (this.options.pick12HourFormat) {
var current = this._date.getUTCHours();
current >= 12 ? 12 != value && (value = (value + 12) % 24) :12 === value ? value = 0 :value %= 12;
}
this._date.setUTCHours(value), this.actions.showPicker.call(this);
},
selectMinute:function(e) {
var tgt = $(e.target), value = parseInt(tgt.text(), 10);
this._date.setUTCMinutes(value), this.actions.showPicker.call(this);
},
selectSecond:function(e) {
var tgt = $(e.target), value = parseInt(tgt.text(), 10);
this._date.setUTCSeconds(value), this.actions.showPicker.call(this);
}
},
doAction:function(e) {
e.stopPropagation(), e.preventDefault(), this._date || (this._date = UTCDate(1970, 0, 0, 0, 0, 0, 0));
var action = $(e.currentTarget).data("action"), rv = this.actions[action].apply(this, arguments);
return this.set(), this.fillTime(), this.notifyChange(), rv;
},
stopEvent:function(e) {
e.stopPropagation(), e.preventDefault();
},
keydown:function(e) {
var self = this, k = e.which, input = $(e.target);
(8 == k || 46 == k) && setTimeout(function() {
self._resetMaskPos(input);
});
},
keypress:function(e) {
var k = e.which;
if (8 != k && 46 != k) {
var input = $(e.target), c = String.fromCharCode(k), val = input.val() || "";
val += c;
var mask = this._mask[this._maskPos];
if (!mask) return !1;
if (mask.end == val.length) {
if (!mask.pattern.test(val.slice(mask.start))) {
for (val = val.slice(0, val.length - 1); (mask = this._mask[this._maskPos]) && mask.character; ) val += mask.character, 
this._maskPos++;
return val += c, mask.end != val.length ? (input.val(val), !1) :mask.pattern.test(val.slice(mask.start)) ? (input.val(val), 
this._maskPos++, !1) :(input.val(val.slice(0, mask.start)), !1);
}
this._maskPos++;
}
}
},
change:function(e) {
var input = $(e.target), val = input.val();
this._formatPattern.test(val) ? (this.update(), this.setValue(this._date.getTime()), 
this.notifyChange(), this.set()) :val && val.trim() ? (this.setValue(this._date.getTime()), 
this._date ? this.set() :input.val("")) :this._date && (this.setValue(null), this.notifyChange(), 
this._unset = !0), this._resetMaskPos(input);
},
showMode:function(dir) {
dir && (this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + dir))), 
this.widget.find(".datepicker > div").hide().filter(".datepicker-" + DPGlobal.modes[this.viewMode].clsName).show();
},
destroy:function() {
this._detachDatePickerEvents(), this._detachDatePickerGlobalEvents(), this.widget.remove(), 
this.$element.removeData("datetimepicker"), this.component.removeData("datetimepicker");
},
formatDate:function(d) {
return this.format.replace(formatReplacer, function(match) {
var methodName, property, rv, len = match.length;
if ("ms" === match && (len = 1), property = dateFormatComponents[match].property, 
"Hours12" === property) rv = d.getUTCHours(), 0 === rv ? rv = 12 :12 !== rv && (rv %= 12); else {
if ("Period12" === property) return d.getUTCHours() >= 12 ? "PM" :"AM";
methodName = "get" + property, rv = d[methodName]();
}
return "getUTCMonth" === methodName && (rv += 1), "getUTCYear" === methodName && (rv = rv + 1900 - 2e3), 
padLeft(rv.toString(), len, "0");
});
},
parseDate:function(str) {
var match, i, property, value, parsed = {};
if (!(match = this._formatPattern.exec(str))) return null;
for (i = 1; i < match.length; i++) property = this._propertiesByIndex[i], property && (value = match[i], 
/^\d+$/.test(value) && (value = parseInt(value, 10)), parsed[property] = value);
return this._finishParsingDate(parsed);
},
_resetMaskPos:function(input) {
for (var val = input.val(), i = 0; i < this._mask.length; i++) {
if (this._mask[i].end > val.length) {
this._maskPos = i;
break;
}
if (this._mask[i].end === val.length) {
this._maskPos = i + 1;
break;
}
}
},
_finishParsingDate:function(parsed) {
var year, month, date, hours, minutes, seconds, milliseconds;
return year = parsed.UTCFullYear, parsed.UTCYear && (year = 2e3 + parsed.UTCYear), 
year || (year = 1970), month = parsed.UTCMonth ? parsed.UTCMonth - 1 :0, date = parsed.UTCDate || 1, 
hours = parsed.UTCHours || 0, minutes = parsed.UTCMinutes || 0, seconds = parsed.UTCSeconds || 0, 
milliseconds = parsed.UTCMilliseconds || 0, parsed.Hours12 && (hours = parsed.Hours12), 
parsed.Period12 && (/pm/i.test(parsed.Period12) ? 12 != hours && (hours = (hours + 12) % 24) :hours %= 12), 
UTCDate(year, month, date, hours, minutes, seconds, milliseconds);
},
_compileFormat:function() {
for (var match, component, components = [], mask = [], str = this.format, propertiesByIndex = {}, i = 0, pos = 0; match = formatComponent.exec(str); ) component = match[0], 
component in dateFormatComponents ? (i++, propertiesByIndex[i] = dateFormatComponents[component].property, 
components.push("\\s*" + dateFormatComponents[component].getPattern(this) + "\\s*"), 
mask.push({
pattern:new RegExp(dateFormatComponents[component].getPattern(this)),
property:dateFormatComponents[component].property,
start:pos,
end:pos += component.length
})) :(components.push(escapeRegExp(component)), mask.push({
pattern:new RegExp(escapeRegExp(component)),
character:component,
start:pos,
end:++pos
})), str = str.slice(component.length);
this._mask = mask, this._maskPos = 0, this._formatPattern = new RegExp("^\\s*" + components.join("") + "\\s*$"), 
this._propertiesByIndex = propertiesByIndex;
},
_attachDatePickerEvents:function() {
var self = this;
this.widget.on("click", ".datepicker *", $.proxy(this.click, this)), this.widget.on("click", "[data-action]", $.proxy(this.doAction, this)), 
this.widget.on("mousedown", $.proxy(this.stopEvent, this)), this.pickDate && this.pickTime && this.widget.on("click.togglePicker", ".accordion-toggle", function(e) {
e.stopPropagation();
var $this = $(this), $parent = $this.closest("ul"), expanded = $parent.find(".collapse.in"), closed = $parent.find(".collapse:not(.in)");
if (expanded && expanded.length) {
var collapseData = expanded.data("collapse");
if (collapseData && collapseData.transitioning) return;
expanded.collapse("hide"), closed.collapse("show"), $this.find("i").toggleClass(self.timeIcon + " " + self.dateIcon), 
self.$element.find(".add-on i").toggleClass(self.timeIcon + " " + self.dateIcon);
}
}), this.isInput ? (this.$element.on({
focus:$.proxy(this.show, this),
change:$.proxy(this.change, this)
}), this.options.maskInput && this.$element.on({
keydown:$.proxy(this.keydown, this),
keypress:$.proxy(this.keypress, this)
})) :(this.$element.on({
change:$.proxy(this.change, this)
}, "input"), this.options.maskInput && this.$element.on({
keydown:$.proxy(this.keydown, this),
keypress:$.proxy(this.keypress, this)
}, "input"), this.component ? this.component.on("click", $.proxy(this.show, this)) :this.$element.on("click", $.proxy(this.show, this)));
},
_attachDatePickerGlobalEvents:function() {
$(window).on("resize.datetimepicker" + this.id, $.proxy(this.place, this)), this.isInput || $(document).on("mousedown.datetimepicker" + this.id, $.proxy(this.hide, this));
},
_detachDatePickerEvents:function() {
this.widget.off("click", ".datepicker *", this.click), this.widget.off("click", "[data-action]"), 
this.widget.off("mousedown", this.stopEvent), this.pickDate && this.pickTime && this.widget.off("click.togglePicker"), 
this.isInput ? (this.$element.off({
focus:this.show,
change:this.change
}), this.options.maskInput && this.$element.off({
keydown:this.keydown,
keypress:this.keypress
})) :(this.$element.off({
change:this.change
}, "input"), this.options.maskInput && this.$element.off({
keydown:this.keydown,
keypress:this.keypress
}, "input"), this.component ? this.component.off("click", this.show) :this.$element.off("click", this.show));
},
_detachDatePickerGlobalEvents:function() {
$(window).off("resize.datetimepicker" + this.id), this.isInput || $(document).off("mousedown.datetimepicker" + this.id);
}
}, $.fn.datetimepicker = function(option, val) {
return this.each(function() {
var $this = $(this), data = $this.data("datetimepicker"), options = "object" == typeof option && option;
data || $this.data("datetimepicker", data = new DateTimePicker(this, $.extend({}, $.fn.datetimepicker.defaults, options))), 
"string" == typeof option && data[option](val);
});
}, $.fn.datetimepicker.defaults = {
maskInput:!0,
pickDate:!0,
pickTime:!0,
pick12HourFormat:!1
}, $.fn.datetimepicker.Constructor = DateTimePicker;
var dpgId = 0, dates = $.fn.datetimepicker.dates = {
en:{
days:[ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
daysShort:[ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ],
daysMin:[ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su" ],
months:[ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
monthsShort:[ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
}
}, dateFormatComponents = {
dd:{
property:"UTCDate",
getPattern:function() {
return "(0?[1-9]|[1-2][0-9]|3[0-1])\\b";
}
},
MM:{
property:"UTCMonth",
getPattern:function() {
return "(0?[1-9]|1[0-2])\\b";
}
},
yy:{
property:"UTCYear",
getPattern:function() {
return "(\\d{2})\\b";
}
},
yyyy:{
property:"UTCFullYear",
getPattern:function() {
return "(\\d{4})\\b";
}
},
hh:{
property:"UTCHours",
getPattern:function() {
return "(0?[0-9]|1[0-9]|2[0-3])\\b";
}
},
mm:{
property:"UTCMinutes",
getPattern:function() {
return "(0?[0-9]|[1-5][0-9])\\b";
}
},
ss:{
property:"UTCSeconds",
getPattern:function() {
return "(0?[0-9]|[1-5][0-9])\\b";
}
},
ms:{
property:"UTCMilliseconds",
getPattern:function() {
return "([0-9]{1,3})\\b";
}
},
HH:{
property:"Hours12",
getPattern:function() {
return "(0?[1-9]|1[0-2])\\b";
}
},
PP:{
property:"Period12",
getPattern:function() {
return "(AM|PM|am|pm|Am|aM|Pm|pM)\\b";
}
}
}, keys = [];
for (var k in dateFormatComponents) keys.push(k);
keys[keys.length - 1] += "\\b", keys.push(".");
var formatComponent = new RegExp(keys.join("\\b|"));
keys.pop();
var formatReplacer = new RegExp(keys.join("\\b|"), "g"), DPGlobal = {
modes:[ {
clsName:"days",
navFnc:"UTCMonth",
navStep:1
}, {
clsName:"months",
navFnc:"UTCFullYear",
navStep:1
}, {
clsName:"years",
navFnc:"UTCFullYear",
navStep:10
} ],
isLeapYear:function(year) {
return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
},
getDaysInMonth:function(year, month) {
return [ 31, DPGlobal.isLeapYear(year) ? 29 :28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][month];
},
headTemplate:'<thead><tr><th class="prev">&lsaquo;</th><th colspan="5" class="switch"></th><th class="next">&rsaquo;</th></tr></thead>',
contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>'
};
DPGlobal.template = '<div class="datepicker-days"><table class="table-condensed">' + DPGlobal.headTemplate + '<tbody></tbody></table></div><div class="datepicker-months"><table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + "</table></div>";
var TPGlobal = {
hourTemplate:'<span data-action="showHours" data-time-component="hours" class="timepicker-hour"></span>',
minuteTemplate:'<span data-action="showMinutes" data-time-component="minutes" class="timepicker-minute"></span>',
secondTemplate:'<span data-action="showSeconds" data-time-component="seconds" class="timepicker-second"></span>'
};
TPGlobal.getTemplate = function(is12Hours) {
return '<div class="timepicker-picker"><table class="table-condensed"' + (is12Hours ? ' data-hour-format="12"' :"") + '><tr><td><a href="#" class="btn" data-action="incrementHours"><i class="icon-up-open-bold"></i></a></td><td class="separator"></td><td><a href="#" class="btn" data-action="incrementMinutes"><i class="icon-up-open-bold"></i></a></td><td class="separator"></td><td><a href="#" class="btn" data-action="incrementSeconds"><i class="icon-up-open-bold"></i></a></td>' + (is12Hours ? '<td class="separator"></td>' :"") + "</tr><tr><td>" + TPGlobal.hourTemplate + '</td> <td class="separator">:</td><td>' + TPGlobal.minuteTemplate + '</td> <td class="separator">:</td><td>' + TPGlobal.secondTemplate + "</td>" + (is12Hours ? '<td class="separator"></td><td><button type="button" class="btn btn-primary" data-action="togglePeriod"></button></td>' :"") + '</tr><tr><td><a href="#" class="btn" data-action="decrementHours"><i class="icon-down-open-bold"></i></a></td><td class="separator"></td><td><a href="#" class="btn" data-action="decrementMinutes"><i class="icon-down-open-bold"></i></a></td><td class="separator"></td><td><a href="#" class="btn" data-action="decrementSeconds"><i class="icon-down-open-bold"></i></a></td>' + (is12Hours ? '<td class="separator"></td>' :"") + '</tr></table></div><div class="timepicker-hours" data-action="selectHour"><table class="table-condensed"></table></div><div class="timepicker-minutes" data-action="selectMinute"><table class="table-condensed"></table></div><div class="timepicker-seconds" data-action="selectSecond"><table class="table-condensed"></table></div>';
};
}(window.jQuery), /*!
 * jQuery Cookie Plugin v1.3
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
function($, document, undefined) {
function raw(s) {
return s;
}
function decoded(s) {
return decodeURIComponent(s.replace(pluses, " "));
}
var pluses = /\+/g, config = $.cookie = function(key, value, options) {
if (value !== undefined) {
if (options = $.extend({}, config.defaults, options), null === value && (options.expires = -1), 
"number" == typeof options.expires) {
var days = options.expires, t = options.expires = new Date();
t.setDate(t.getDate() + days);
}
return value = config.json ? JSON.stringify(value) :String(value), document.cookie = [ encodeURIComponent(key), "=", config.raw ? value :encodeURIComponent(value), options.expires ? "; expires=" + options.expires.toUTCString() :"", options.path ? "; path=" + options.path :"", options.domain ? "; domain=" + options.domain :"", options.secure ? "; secure" :"" ].join("");
}
for (var decode = config.raw ? raw :decoded, cookies = document.cookie.split("; "), i = 0, l = cookies.length; l > i; i++) {
var parts = cookies[i].split("=");
if (decode(parts.shift()) === key) {
var cookie = decode(parts.join("="));
return config.json ? JSON.parse(cookie) :cookie;
}
}
return null;
};
config.defaults = {}, $.removeCookie = function(key, options) {
return null !== $.cookie(key) ? ($.cookie(key, null, options), !0) :!1;
};
}(jQuery, document), function(jQuery) {
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
}), /*!
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
}, /*! Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.1.3
 *
 * Requires: 1.2.2+
 */
function(factory) {
"function" == typeof define && define.amd ? define([ "jquery" ], factory) :"object" == typeof exports ? module.exports = factory :factory(jQuery);
}(function($) {
function handler(event) {
var fn, orgEvent = event || window.event, args = [].slice.call(arguments, 1), delta = 0, deltaX = 0, deltaY = 0, absDelta = 0, absDeltaXY = 0;
return event = $.event.fix(orgEvent), event.type = "mousewheel", orgEvent.wheelDelta && (delta = orgEvent.wheelDelta), 
orgEvent.detail && (delta = -1 * orgEvent.detail), orgEvent.deltaY && (deltaY = -1 * orgEvent.deltaY, 
delta = deltaY), orgEvent.deltaX && (deltaX = orgEvent.deltaX, delta = -1 * deltaX), 
void 0 !== orgEvent.wheelDeltaY && (deltaY = orgEvent.wheelDeltaY), void 0 !== orgEvent.wheelDeltaX && (deltaX = -1 * orgEvent.wheelDeltaX), 
absDelta = Math.abs(delta), (!lowestDelta || lowestDelta > absDelta) && (lowestDelta = absDelta), 
absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX)), (!lowestDeltaXY || lowestDeltaXY > absDeltaXY) && (lowestDeltaXY = absDeltaXY), 
fn = delta > 0 ? "floor" :"ceil", delta = Math[fn](delta / lowestDelta), deltaX = Math[fn](deltaX / lowestDeltaXY), 
deltaY = Math[fn](deltaY / lowestDeltaXY), args.unshift(event, delta, deltaX, deltaY), 
($.event.dispatch || $.event.handle).apply(this, args);
}
var lowestDelta, lowestDeltaXY, toFix = [ "wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll" ], toBind = "onwheel" in document || document.documentMode >= 9 ? [ "wheel" ] :[ "mousewheel", "DomMouseScroll", "MozMousePixelScroll" ];
if ($.event.fixHooks) for (var i = toFix.length; i; ) $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
$.event.special.mousewheel = {
setup:function() {
if (this.addEventListener) for (var i = toBind.length; i; ) this.addEventListener(toBind[--i], handler, !1); else this.onmousewheel = handler;
},
teardown:function() {
if (this.removeEventListener) for (var i = toBind.length; i; ) this.removeEventListener(toBind[--i], handler, !1); else this.onmousewheel = null;
}
}, $.fn.extend({
mousewheel:function(fn) {
return fn ? this.bind("mousewheel", fn) :this.trigger("mousewheel");
},
unmousewheel:function(fn) {
return this.unbind("mousewheel", fn);
}
});
}), /**
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
function($, undefined) {
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

var JSON;

JSON || (JSON = {}), function() {
"use strict";
function f(n) {
return 10 > n ? "0" + n :n;
}
function quote(string) {
return escapable.lastIndex = 0, escapable.test(string) ? '"' + string.replace(escapable, function(a) {
var c = meta[a];
return "string" == typeof c ? c :"\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
}) + '"' :'"' + string + '"';
}
function str(key, holder) {
var i, k, v, length, partial, mind = gap, value = holder[key];
switch (value && "object" == typeof value && "function" == typeof value.toJSON && (value = value.toJSON(key)), 
"function" == typeof rep && (value = rep.call(holder, key, value)), typeof value) {
case "string":
return quote(value);

case "number":
return isFinite(value) ? String(value) :"null";

case "boolean":
case "null":
return String(value);

case "object":
if (!value) return "null";
if (gap += indent, partial = [], "[object Array]" === Object.prototype.toString.apply(value)) {
for (length = value.length, i = 0; length > i; i += 1) partial[i] = str(i, value) || "null";
return v = 0 === partial.length ? "[]" :gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" :"[" + partial.join(",") + "]", 
gap = mind, v;
}
if (rep && "object" == typeof rep) for (length = rep.length, i = 0; length > i; i += 1) "string" == typeof rep[i] && (k = rep[i], 
v = str(k, value), v && partial.push(quote(k) + (gap ? ": " :":") + v)); else for (k in value) Object.prototype.hasOwnProperty.call(value, k) && (v = str(k, value), 
v && partial.push(quote(k) + (gap ? ": " :":") + v));
return v = 0 === partial.length ? "{}" :gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" :"{" + partial.join(",") + "}", 
gap = mind, v;
}
}
"function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" :null;
}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
return this.valueOf();
});
var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
"\b":"\\b",
"	":"\\t",
"\n":"\\n",
"\f":"\\f",
"\r":"\\r",
'"':'\\"',
"\\":"\\\\"
}, rep;
"function" != typeof JSON.stringify && (JSON.stringify = function(value, replacer, space) {
var i;
if (gap = "", indent = "", "number" == typeof space) for (i = 0; space > i; i += 1) indent += " "; else "string" == typeof space && (indent = space);
if (rep = replacer, replacer && "function" != typeof replacer && ("object" != typeof replacer || "number" != typeof replacer.length)) throw new Error("JSON.stringify");
return str("", {
"":value
});
}), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
function walk(holder, key) {
var k, v, value = holder[key];
if (value && "object" == typeof value) for (k in value) Object.prototype.hasOwnProperty.call(value, k) && (v = walk(value, k), 
void 0 !== v ? value[k] = v :delete value[k]);
return reviver.call(holder, key, value);
}
var j;
if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(a) {
return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
})), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), 
"function" == typeof reviver ? walk({
"":j
}, "") :j;
throw new SyntaxError("JSON.parse");
});
}(), /**
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
function($) {
function refresh() {
var data = prepareData(this);
return isNaN(data.datetime) || $(this).text(inWords(data.datetime)), this;
}
function prepareData(element) {
if (element = $(element), !element.data("timeago")) {
element.data("timeago", {
datetime:$t.datetime(element)
});
var text = $.trim(element.text());
!(text.length > 0) || $t.isTime(element) && element.attr("title") || element.attr("title", text);
}
return element.data("timeago");
}
function inWords(date) {
return $t.inWords(distance(date));
}
function distance(date) {
return new Date().getTime() - date.getTime();
}
$.timeago = function(timestamp) {
return timestamp instanceof Date ? inWords(timestamp) :"string" == typeof timestamp ? inWords($.timeago.parse(timestamp)) :"number" == typeof timestamp ? inWords(new Date(timestamp)) :inWords($.timeago.datetime(timestamp));
};
var $t = $.timeago;
$.extend($.timeago, {
settings:{
refreshMillis:6e4,
allowFuture:!1,
strings:{
prefixAgo:null,
prefixFromNow:null,
suffixAgo:"ago",
suffixFromNow:"from now",
seconds:"less than a minute",
minute:"about a minute",
minutes:"%d minutes",
hour:"about an hour",
hours:"about %d hours",
day:"a day",
days:"%d days",
month:"about a month",
months:"%d months",
year:"about a year",
years:"%d years",
wordSeparator:" ",
numbers:[]
}
},
inWords:function(distanceMillis) {
function substitute(stringOrFunction, number) {
var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) :stringOrFunction, value = $l.numbers && $l.numbers[number] || number;
return string.replace(/%d/i, value);
}
var $l = this.settings.strings, prefix = $l.prefixAgo, suffix = $l.suffixAgo;
this.settings.allowFuture && 0 > distanceMillis && (prefix = $l.prefixFromNow, suffix = $l.suffixFromNow);
var seconds = Math.abs(distanceMillis) / 1e3, minutes = seconds / 60, hours = minutes / 60, days = hours / 24, years = days / 365, words = 45 > seconds && substitute($l.seconds, Math.round(seconds)) || 90 > seconds && substitute($l.minute, 1) || 45 > minutes && substitute($l.minutes, Math.round(minutes)) || 90 > minutes && substitute($l.hour, 1) || 24 > hours && substitute($l.hours, Math.round(hours)) || 42 > hours && substitute($l.day, 1) || 30 > days && substitute($l.days, Math.round(days)) || 45 > days && substitute($l.month, 1) || 365 > days && substitute($l.months, Math.round(days / 30)) || 1.5 > years && substitute($l.year, 1) || substitute($l.years, Math.round(years)), separator = void 0 === $l.wordSeparator ? " " :$l.wordSeparator;
return $.trim([ prefix, words, suffix ].join(separator));
},
parse:function(iso8601) {
var s = $.trim(iso8601);
return s = s.replace(/\.\d+/, ""), s = s.replace(/-/, "/").replace(/-/, "/"), s = s.replace(/T/, " ").replace(/Z/, " UTC"), 
s = s.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"), new Date(s);
},
datetime:function(elem) {
var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") :$(elem).attr("title");
return $t.parse(iso8601);
},
isTime:function(elem) {
return "time" === $(elem).get(0).tagName.toLowerCase();
}
}), $.fn.timeago = function() {
var self = this;
self.each(refresh);
var $s = $t.settings;
return $s.refreshMillis > 0 && setInterval(function() {
self.each(refresh);
}, $s.refreshMillis), self;
}, document.createElement("abbr"), document.createElement("time");
}(jQuery), /*
 * ----------------------------- JSTORAGE -------------------------------------
 * Simple local storage wrapper to save data on the browser side, supporting
 * all major browsers - IE6+, Firefox2+, Safari4+, Chrome4+ and Opera 10.5+
 *
 * Copyright (c) 2010 - 2012 Andris Reinman, andris.reinman@gmail.com
 * Project homepage: www.jstorage.info
 *
 * Licensed under MIT-style license:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
function() {
function _init() {
var localStorageReallyWorks = !1;
if ("localStorage" in window) try {
window.localStorage.setItem("_tmptest", "tmpval"), localStorageReallyWorks = !0, 
window.localStorage.removeItem("_tmptest");
} catch (BogusQuotaExceededErrorOnIos5) {}
if (localStorageReallyWorks) try {
window.localStorage && (_storage_service = window.localStorage, _backend = "localStorage", 
_observer_update = _storage_service.jStorage_update);
} catch (E3) {} else if ("globalStorage" in window) try {
window.globalStorage && (_storage_service = window.globalStorage[window.location.hostname], 
_backend = "globalStorage", _observer_update = _storage_service.jStorage_update);
} catch (E4) {} else {
if (_storage_elm = document.createElement("link"), !_storage_elm.addBehavior) return _storage_elm = null, 
void 0;
_storage_elm.style.behavior = "url(#default#userData)", document.getElementsByTagName("head")[0].appendChild(_storage_elm);
try {
_storage_elm.load("jStorage");
} catch (E) {
_storage_elm.setAttribute("jStorage", "{}"), _storage_elm.save("jStorage"), _storage_elm.load("jStorage");
}
var data = "{}";
try {
data = _storage_elm.getAttribute("jStorage");
} catch (E5) {}
try {
_observer_update = _storage_elm.getAttribute("jStorage_update");
} catch (E6) {}
_storage_service.jStorage = data, _backend = "userDataBehavior";
}
_load_storage(), _handleTTL(), _createPolyfillStorage("local"), _createPolyfillStorage("session"), 
_setupObserver(), _handlePubSub(), "addEventListener" in window && window.addEventListener("pageshow", function(event) {
event.persisted && _storageObserver();
}, !1);
}
function _createPolyfillStorage(type, forceCreate) {
function _sessionStoragePolyfillUpdate() {
if ("session" == type) try {
storage_source = JSON.parse(window.name || "{}");
} catch (E) {
storage_source = {};
}
}
function _sessionStoragePolyfillSave() {
"session" == type && (window.name = JSON.stringify(storage_source));
}
{
var i, storage, _skipSave = !1, _length = 0, storage_source = {};
Math.random();
}
if (forceCreate || "undefined" == typeof window[type + "Storage"]) {
if ("local" == type && window.globalStorage) return localStorage = window.globalStorage[window.location.hostname], 
void 0;
if ("userDataBehavior" == _backend) {
forceCreate && window[type + "Storage"] && window[type + "Storage"].parentNode && window[type + "Storage"].parentNode.removeChild(window[type + "Storage"]), 
storage = document.createElement("button"), document.getElementsByTagName("head")[0].appendChild(storage), 
"local" == type ? storage_source = _storage :"session" == type && _sessionStoragePolyfillUpdate();
for (i in storage_source) storage_source.hasOwnProperty(i) && "__jstorage_meta" != i && "length" != i && "undefined" != typeof storage_source[i] && (i in storage || _length++, 
storage[i] = storage_source[i]);
storage.length = _length, storage.key = function(n) {
var i, count = 0;
_sessionStoragePolyfillUpdate();
for (i in storage_source) if (storage_source.hasOwnProperty(i) && "__jstorage_meta" != i && "length" != i && "undefined" != typeof storage_source[i]) {
if (count == n) return i;
count++;
}
}, storage.getItem = function(key) {
return _sessionStoragePolyfillUpdate(), "session" == type ? storage_source[key] :$.jStorage.get(key);
}, storage.setItem = function(key, value) {
"undefined" != typeof value && (storage[key] = (value || "").toString());
}, storage.removeItem = function(key) {
return "local" == type ? $.jStorage.deleteKey(key) :(storage[key] = void 0, _skipSave = !0, 
key in storage && storage.removeAttribute(key), _skipSave = !1, void 0);
}, storage.clear = function() {
return "session" == type ? (window.name = "", _createPolyfillStorage("session", !0), 
void 0) :($.jStorage.flush(), void 0);
}, "local" == type && (_localStoragePolyfillSetKey = function(key, value) {
"length" != key && (_skipSave = !0, "undefined" == typeof value ? key in storage && (_length--, 
storage.removeAttribute(key)) :(key in storage || _length++, storage[key] = (value || "").toString()), 
storage.length = _length, _skipSave = !1);
}), storage.attachEvent("onpropertychange", function(e) {
if ("length" != e.propertyName && !_skipSave && "length" != e.propertyName) {
if ("local" == type) e.propertyName in storage_source || "undefined" == typeof storage[e.propertyName] || _length++; else if ("session" == type) return _sessionStoragePolyfillUpdate(), 
"undefined" == typeof storage[e.propertyName] || e.propertyName in storage_source ? "undefined" == typeof storage[e.propertyName] && e.propertyName in storage_source ? (delete storage_source[e.propertyName], 
_length--) :storage_source[e.propertyName] = storage[e.propertyName] :(storage_source[e.propertyName] = storage[e.propertyName], 
_length++), _sessionStoragePolyfillSave(), storage.length = _length, void 0;
$.jStorage.set(e.propertyName, storage[e.propertyName]), storage.length = _length;
}
}), window[type + "Storage"] = storage;
}
}
}
function _reloadData() {
var data = "{}";
if ("userDataBehavior" == _backend) {
_storage_elm.load("jStorage");
try {
data = _storage_elm.getAttribute("jStorage");
} catch (E5) {}
try {
_observer_update = _storage_elm.getAttribute("jStorage_update");
} catch (E6) {}
_storage_service.jStorage = data;
}
_load_storage(), _handleTTL(), _handlePubSub();
}
function _setupObserver() {
"localStorage" == _backend || "globalStorage" == _backend ? "addEventListener" in window ? window.addEventListener("storage", _storageObserver, !1) :document.attachEvent("onstorage", _storageObserver) :"userDataBehavior" == _backend && setInterval(_storageObserver, 1e3);
}
function _storageObserver() {
var updateTime;
clearTimeout(_observer_timeout), _observer_timeout = setTimeout(function() {
if ("localStorage" == _backend || "globalStorage" == _backend) updateTime = _storage_service.jStorage_update; else if ("userDataBehavior" == _backend) {
_storage_elm.load("jStorage");
try {
updateTime = _storage_elm.getAttribute("jStorage_update");
} catch (E5) {}
}
updateTime && updateTime != _observer_update && (_observer_update = updateTime, 
_checkUpdatedKeys());
}, 25);
}
function _checkUpdatedKeys() {
var newCrc32List, oldCrc32List = JSON.parse(JSON.stringify(_storage.__jstorage_meta.CRC32));
_reloadData(), newCrc32List = JSON.parse(JSON.stringify(_storage.__jstorage_meta.CRC32));
var key, updated = [], removed = [];
for (key in oldCrc32List) if (oldCrc32List.hasOwnProperty(key)) {
if (!newCrc32List[key]) {
removed.push(key);
continue;
}
oldCrc32List[key] != newCrc32List[key] && updated.push(key);
}
for (key in newCrc32List) newCrc32List.hasOwnProperty(key) && (oldCrc32List[key] || updated.push(key));
_fireObservers(updated, "updated"), _fireObservers(removed, "deleted");
}
function _fireObservers(keys, action) {
if (keys = [].concat(keys || []), "flushed" == action) {
keys = [];
for (var key in _observers) _observers.hasOwnProperty(key) && keys.push(key);
action = "deleted";
}
for (var i = 0, len = keys.length; len > i; i++) if (_observers[keys[i]]) for (var j = 0, jlen = _observers[keys[i]].length; jlen > j; j++) _observers[keys[i]][j](keys[i], action);
}
function _publishChange() {
var updateTime = (+new Date()).toString();
"localStorage" == _backend || "globalStorage" == _backend ? _storage_service.jStorage_update = updateTime :"userDataBehavior" == _backend && (_storage_elm.setAttribute("jStorage_update", updateTime), 
_storage_elm.save("jStorage")), _storageObserver();
}
function _load_storage() {
if (_storage_service.jStorage) try {
_storage = JSON.parse(String(_storage_service.jStorage));
} catch (E6) {
_storage_service.jStorage = "{}";
} else _storage_service.jStorage = "{}";
_storage_size = _storage_service.jStorage ? String(_storage_service.jStorage).length :0, 
_storage.__jstorage_meta || (_storage.__jstorage_meta = {}), _storage.__jstorage_meta.CRC32 || (_storage.__jstorage_meta.CRC32 = {});
}
function _save() {
_dropOldEvents();
try {
_storage_service.jStorage = JSON.stringify(_storage), _storage_elm && (_storage_elm.setAttribute("jStorage", _storage_service.jStorage), 
_storage_elm.save("jStorage")), _storage_size = _storage_service.jStorage ? String(_storage_service.jStorage).length :0;
} catch (E7) {}
}
function _checkKey(key) {
if (!key || "string" != typeof key && "number" != typeof key) throw new TypeError("Key name must be string or numeric");
if ("__jstorage_meta" == key) throw new TypeError("Reserved key name");
return !0;
}
function _handleTTL() {
var curtime, i, TTL, CRC32, nextExpire = 1/0, changed = !1, deleted = [];
if (clearTimeout(_ttl_timeout), _storage.__jstorage_meta && "object" == typeof _storage.__jstorage_meta.TTL) {
curtime = +new Date(), TTL = _storage.__jstorage_meta.TTL, CRC32 = _storage.__jstorage_meta.CRC32;
for (i in TTL) TTL.hasOwnProperty(i) && (TTL[i] <= curtime ? (delete TTL[i], delete CRC32[i], 
delete _storage[i], changed = !0, deleted.push(i)) :TTL[i] < nextExpire && (nextExpire = TTL[i]));
1/0 != nextExpire && (_ttl_timeout = setTimeout(_handleTTL, nextExpire - curtime)), 
changed && (_save(), _publishChange(), _fireObservers(deleted, "deleted"));
}
}
function _handlePubSub() {
if (_storage.__jstorage_meta.PubSub) {
for (var pubelm, _pubsubCurrent = _pubsub_last, i = len = _storage.__jstorage_meta.PubSub.length - 1; i >= 0; i--) pubelm = _storage.__jstorage_meta.PubSub[i], 
pubelm[0] > _pubsub_last && (_pubsubCurrent = pubelm[0], _fireSubscribers(pubelm[1], pubelm[2]));
_pubsub_last = _pubsubCurrent;
}
}
function _fireSubscribers(channel, payload) {
if (_pubsub_observers[channel]) for (var i = 0, len = _pubsub_observers[channel].length; len > i; i++) _pubsub_observers[channel][i](channel, JSON.parse(JSON.stringify(payload)));
}
function _dropOldEvents() {
if (_storage.__jstorage_meta.PubSub) {
for (var retire = +new Date() - 2e3, i = 0, len = _storage.__jstorage_meta.PubSub.length; len > i; i++) if (_storage.__jstorage_meta.PubSub[i][0] <= retire) {
_storage.__jstorage_meta.PubSub.splice(i, _storage.__jstorage_meta.PubSub.length - i);
break;
}
_storage.__jstorage_meta.PubSub.length || delete _storage.__jstorage_meta.PubSub;
}
}
function _publish(channel, payload) {
_storage.__jstorage_meta || (_storage.__jstorage_meta = {}), _storage.__jstorage_meta.PubSub || (_storage.__jstorage_meta.PubSub = []), 
_storage.__jstorage_meta.PubSub.unshift([ +new Date(), channel, payload ]), _save(), 
_publishChange();
}
function _crc32(str, crc) {
crc = crc || 0;
var n = 0, x = 0;
crc = -1 ^ crc;
for (var i = 0, len = str.length; len > i; i++) n = 255 & (crc ^ str.charCodeAt(i)), 
x = "0x" + _crc32Table.substr(9 * n, 8), crc = crc >>> 8 ^ x;
return -1 ^ crc;
}
var JSTORAGE_VERSION = "0.3.0", $ = window.jQuery || window.$ || (window.$ = {}), JSON = {
parse:window.JSON && (window.JSON.parse || window.JSON.decode) || String.prototype.evalJSON && function(str) {
return String(str).evalJSON();
} || $.parseJSON || $.evalJSON,
stringify:Object.toJSON || window.JSON && (window.JSON.stringify || window.JSON.encode) || $.toJSON
};
if (!JSON.parse || !JSON.stringify) throw new Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");
var _ttl_timeout, _storage = {}, _storage_service = {
jStorage:"{}"
}, _storage_elm = null, _storage_size = 0, _backend = !1, _observers = {}, _observer_timeout = !1, _observer_update = 0, _pubsub_observers = {}, _pubsub_last = +new Date(), _crc32Table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D", _XMLService = {
isXML:function(elm) {
var documentElement = (elm ? elm.ownerDocument || elm :0).documentElement;
return documentElement ? "HTML" !== documentElement.nodeName :!1;
},
encode:function(xmlNode) {
if (!this.isXML(xmlNode)) return !1;
try {
return new XMLSerializer().serializeToString(xmlNode);
} catch (E1) {
try {
return xmlNode.xml;
} catch (E2) {}
}
return !1;
},
decode:function(xmlString) {
var resultXML, dom_parser = "DOMParser" in window && new DOMParser().parseFromString || window.ActiveXObject && function(_xmlString) {
var xml_doc = new ActiveXObject("Microsoft.XMLDOM");
return xml_doc.async = "false", xml_doc.loadXML(_xmlString), xml_doc;
};
return dom_parser ? (resultXML = dom_parser.call("DOMParser" in window && new DOMParser() || window, xmlString, "text/xml"), 
this.isXML(resultXML) ? resultXML :!1) :!1;
}
}, _localStoragePolyfillSetKey = function() {};
$.jStorage = {
version:JSTORAGE_VERSION,
set:function(key, value, options) {
if (_checkKey(key), options = options || {}, "undefined" == typeof value) return this.deleteKey(key), 
value;
if (_XMLService.isXML(value)) value = {
_is_xml:!0,
xml:_XMLService.encode(value)
}; else {
if ("function" == typeof value) return void 0;
value && "object" == typeof value && (value = JSON.parse(JSON.stringify(value)));
}
return _storage[key] = value, _storage.__jstorage_meta.CRC32[key] = _crc32(JSON.stringify(value)), 
this.setTTL(key, options.TTL || 0), _localStoragePolyfillSetKey(key, value), _fireObservers(key, "updated"), 
value;
},
get:function(key, def) {
return _checkKey(key), key in _storage ? _storage[key] && "object" == typeof _storage[key] && _storage[key]._is_xml && _storage[key]._is_xml ? _XMLService.decode(_storage[key].xml) :_storage[key] :"undefined" == typeof def ? null :def;
},
deleteKey:function(key) {
return _checkKey(key), key in _storage ? (delete _storage[key], "object" == typeof _storage.__jstorage_meta.TTL && key in _storage.__jstorage_meta.TTL && delete _storage.__jstorage_meta.TTL[key], 
delete _storage.__jstorage_meta.CRC32[key], _localStoragePolyfillSetKey(key, void 0), 
_save(), _publishChange(), _fireObservers(key, "deleted"), !0) :!1;
},
setTTL:function(key, ttl) {
var curtime = +new Date();
return _checkKey(key), ttl = Number(ttl) || 0, key in _storage ? (_storage.__jstorage_meta.TTL || (_storage.__jstorage_meta.TTL = {}), 
ttl > 0 ? _storage.__jstorage_meta.TTL[key] = curtime + ttl :delete _storage.__jstorage_meta.TTL[key], 
_save(), _handleTTL(), _publishChange(), !0) :!1;
},
getTTL:function(key) {
var ttl, curtime = +new Date();
return _checkKey(key), key in _storage && _storage.__jstorage_meta.TTL && _storage.__jstorage_meta.TTL[key] ? (ttl = _storage.__jstorage_meta.TTL[key] - curtime, 
ttl || 0) :0;
},
flush:function() {
return _storage = {
__jstorage_meta:{
CRC32:{}
}
}, _createPolyfillStorage("local", !0), _save(), _publishChange(), _fireObservers(null, "flushed"), 
!0;
},
storageObj:function() {
function F() {}
return F.prototype = _storage, new F();
},
index:function() {
var i, index = [];
for (i in _storage) _storage.hasOwnProperty(i) && "__jstorage_meta" != i && index.push(i);
return index;
},
storageSize:function() {
return _storage_size;
},
currentBackend:function() {
return _backend;
},
storageAvailable:function() {
return !!_backend;
},
listenKeyChange:function(key, callback) {
_checkKey(key), _observers[key] || (_observers[key] = []), _observers[key].push(callback);
},
stopListening:function(key, callback) {
if (_checkKey(key), _observers[key]) {
if (!callback) return delete _observers[key], void 0;
for (var i = _observers[key].length - 1; i >= 0; i--) _observers[key][i] == callback && _observers[key].splice(i, 1);
}
},
subscribe:function(channel, callback) {
if (channel = (channel || "").toString(), !channel) throw new TypeError("Channel not defined");
_pubsub_observers[channel] || (_pubsub_observers[channel] = []), _pubsub_observers[channel].push(callback);
},
publish:function(channel, payload) {
if (channel = (channel || "").toString(), !channel) throw new TypeError("Channel not defined");
_publish(channel, payload);
},
reInit:function() {
_reloadData();
}
}, _init();
}(), !function($) {
"use strict";
$.fn.bootstrapSwitch = function(method) {
var methods = {
init:function() {
return this.each(function() {
var $div, $switchLeft, $switchRight, $label, color, moving, $element = $(this), myClasses = "", classes = $element.attr("class"), onLabel = "ON", offLabel = "OFF", icon = !1;
$.each([ "switch-mini", "switch-small", "switch-large" ], function(i, el) {
classes.indexOf(el) >= 0 && (myClasses = el);
}), $element.addClass("has-switch"), void 0 !== $element.data("on") && (color = "switch-" + $element.data("on")), 
void 0 !== $element.data("on-label") && (onLabel = $element.data("on-label")), void 0 !== $element.data("off-label") && (offLabel = $element.data("off-label")), 
void 0 !== $element.data("icon") && (icon = $element.data("icon")), $switchLeft = $("<span>").addClass("switch-left").addClass(myClasses).addClass(color).html(onLabel), 
color = "", void 0 !== $element.data("off") && (color = "switch-" + $element.data("off")), 
$switchRight = $("<span>").addClass("switch-right").addClass(myClasses).addClass(color).html(offLabel), 
$label = $("<label>").html("&nbsp;").addClass(myClasses).attr("for", $element.find("input").attr("id")), 
icon && $label.html('<i class="icon icon-' + icon + '"></i>'), $div = $element.find(":checkbox").wrap($("<div>")).parent().data("animated", !1), 
$element.data("animated") !== !1 && $div.addClass("switch-animate").data("animated", !0), 
$div.append($switchLeft).append($label).append($switchRight), $element.find(">div").addClass($element.find("input").is(":checked") ? "switch-on" :"switch-off"), 
$element.find("input").is(":disabled") && $(this).addClass("deactivate");
var changeStatus = function($this) {
$this.siblings("label").trigger("mousedown").trigger("mouseup").trigger("click");
};
$element.on("keydown", function(e) {
32 === e.keyCode && (e.stopImmediatePropagation(), e.preventDefault(), changeStatus($(e.target).find("span:first")));
}), $switchLeft.on("click", function() {
changeStatus($(this));
}), $switchRight.on("click", function() {
changeStatus($(this));
}), $element.find("input").on("change", function(e) {
var $this = $(this), $element = $this.parent(), thisState = $this.is(":checked"), state = $element.is(".switch-off");
e.preventDefault(), $element.css("left", ""), state === thisState && (thisState ? $element.removeClass("switch-off").addClass("switch-on") :$element.removeClass("switch-on").addClass("switch-off"), 
$element.data("animated") !== !1 && $element.addClass("switch-animate"), $element.parent().trigger("switch-change", {
el:$this,
value:thisState
}));
}), $element.find("label").on("mousedown touchstart", function(e) {
var $this = $(this);
moving = !1, e.preventDefault(), e.stopImmediatePropagation(), $this.closest("div").removeClass("switch-animate"), 
$this.closest(".switch").is(".deactivate") ? $this.unbind("click") :($this.on("mousemove touchmove", function(e) {
var $element = $(this).closest(".switch"), relativeX = (e.pageX || e.originalEvent.targetTouches[0].pageX) - $element.offset().left, percent = relativeX / $element.width() * 100, left = 25, right = 75;
moving = !0, left > percent ? percent = left :percent > right && (percent = right), 
$element.find(">div").css("left", percent - right + "%");
}), $this.on("click touchend", function(e) {
var $this = $(this), $target = $(e.target), $myCheckBox = $target.siblings("input");
e.stopImmediatePropagation(), e.preventDefault(), $this.unbind("mouseleave"), moving ? $myCheckBox.prop("checked", !(parseInt($this.parent().css("left")) < -25)) :$myCheckBox.prop("checked", !$myCheckBox.is(":checked")), 
moving = !1, $myCheckBox.trigger("change");
}), $this.on("mouseleave", function(e) {
var $this = $(this), $myCheckBox = $this.siblings("input");
e.preventDefault(), e.stopImmediatePropagation(), $this.unbind("mouseleave"), $this.trigger("mouseup"), 
$myCheckBox.prop("checked", !(parseInt($this.parent().css("left")) < -25)).trigger("change");
}), $this.on("mouseup", function(e) {
e.stopImmediatePropagation(), e.preventDefault(), $(this).unbind("mousemove");
}));
});
});
},
toggleActivation:function() {
$(this).toggleClass("deactivate");
},
isActive:function() {
return !$(this).hasClass("deactivate");
},
setActive:function(active) {
active ? $(this).removeClass("deactivate") :$(this).addClass("deactivate");
},
toggleState:function(skipOnChange) {
var $input = $(this).find("input:checkbox");
$input.prop("checked", !$input.is(":checked")).trigger("change", skipOnChange);
},
setState:function(value, skipOnChange) {
$(this).find("input:checkbox").prop("checked", value).trigger("change", skipOnChange);
},
status:function() {
return $(this).find("input:checkbox").is(":checked");
},
destroy:function() {
var $checkbox, $div = $(this).find("div");
return $div.find(":not(input:checkbox)").remove(), $checkbox = $div.children(), 
$checkbox.unwrap().unwrap(), $checkbox.unbind("change"), $checkbox;
}
};
return methods[method] ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) :"object" != typeof method && method ? ($.error("Method " + method + " does not exist!"), 
void 0) :methods.init.apply(this, arguments);
};
}(jQuery), function() {
jQuery(function() {
var Btn, HR, ShowConfirmationDialog, ShowDialog, ShowFeatureRequestDialog, ShowFormDialog, ShowLoginDialog, ShowMessageDialog, ShowSubmitDisabledDialog, btn_properties, dialog_properties, _ref;
return btn_properties = {
setActive:function() {
return this.unSetFailedMsg(), this.active = !0, this.$el.removeClass("disabled"), 
this.dialog.$footer().find(".hr-dialog-loader").removeClass("active");
},
setInactive:function() {
return this.active = !1, this.$el.addClass("disabled"), this.dialog.$footer().find(".hr-dialog-loader").addClass("active");
},
isActive:function() {
return !this.$el.hasClass("disabled");
},
success:function(message) {
return null == message && (message = ""), this.setSuccessMsg(message), this.setInactive();
},
done:function() {
return this.setInactive(), this.fadeOut();
},
failed:function(message) {
return null == message && (message = ""), this.setFailedMsg(message), this.setInactive();
},
fadeOut:function() {
return this.dialog.$el().fadeOut("slow"), this.dialog.destroy();
},
setFailedMsg:function(message) {
return this.getMsgWidth(), this.dialog.$footer().find(".hr-dialog-failed-message").html(message);
},
unSetFailedMsg:function() {
return this.dialog.$footer().find(".hr-dialog-failed-message").html("");
},
setSuccessMsg:function(message) {
return this.dialog.$footer().find(".hr-dialog-success-message").html(message).width(this.getMsgWidth());
},
unSetSuccessMsg:function() {
return this.dialog.$footer().find(".hr-dialog-success-message").html("");
},
getMsgWidth:function() {
var btn_width;
return btn_width = 0, this.dialog.$footer().find(".hr-dialog-button").each(function(index, btn) {
return btn_width += $(btn).width() + 40;
}), this.dialog.$footer().find(".hr-dialog-buttons").width() - (btn_width + 15);
}
}, Btn = function(options) {
var default_options, return_value, _error, _prototype;
if (default_options = {}, !_.isObject(options)) throw _error = new Error(), _error.name = "Argument Error", 
_error.message = "Argument to `Btn` can only be an object", _error;
if (options = $.extend(default_options, options), !options.dialog || !options.id) throw _error = new Error(), 
_error.name = "Argument Error", _error.message = options.dialog || options.id ? options.id ? "reference to the `ShowDialog` object is missing" :"id of the button is missing" :"reference to the `ShowDialog` object is missing as well as the id of the button is missing", 
_error;
return options.$el || (options.$el = options.dialog.$el().find("#" + options.id)), 
return_value = {
dialog:options.dialog,
id:options.id,
$el:options.$el
}, _prototype = btn_properties, return_value.prototype || (return_value.prototype = {}), 
$.each(_prototype, function(key, value) {
return return_value[key] = value;
}), return_value;
}, dialog_properties = {
render:function() {
var $dialog, $footer, $footer_buttons, dialog_bg_style, dialog_body, html_title, that;
return this.is_rendered || (that = this, html_title = "<div class='hr-dialog-header'>", 
null !== this.options.title && (html_title += this.options.title), this.options.closebutton === !0 && (html_title += "<a href='' class='close' data-analytics='" + this.options.analytics + "'><i class='icon-cancel-small'></i></a>"), 
html_title += "</div>", dialog_bg_style = this.options.background ? "style='background: " + this.options.background + " !important; position: relative;'" :"", 
dialog_body = "<div id='" + this.id + "' class='hr-dialog'  style='display: none;'> <div class='hr-dialog-border' style='width:" + this.options.width + ("px'> <div class='hr-dialog-main-window' " + dialog_bg_style + ">") + html_title + "<div class='hr-dialog-body'>" + this.options.body + "</div> <div class='hr-dialog-footer'> <div class='hr-dialog-loader'></div> <div class='hr-dialog-success-message'></div><div class='hr-dialog-failed-message'></div> <div class='hr-dialog-buttons'></div><div class='clearfix'></div> </div> </div> </div> </div>", 
$("body").append(dialog_body), $dialog = this.$el(), this.options.body_view && ($dialog.find(".hr-dialog-body").html(""), 
this.options.body_view.setElement($dialog.find(".hr-dialog-body")).render(), this.options.body_view.set_dialog && this.options.body_view.set_dialog(this)), 
this.options.height && ($dialog.find(".hr-dialog-body").css("height", "" + this.options.height + "px"), 
$dialog.find(".hr-dialog-body").css("overflow-y", "scroll"), $dialog.find(".hr-dialog-body").addClass("scroll-box")), 
this.options.error_message && $dialog.find(".glob-error").html(this.options.error_message).show(), 
$dialog.show(), this.renderPosition(), $dialog.find("a.close, .dialog-close").bind("click", function(e) {
return e.preventDefault(), "undefined" != typeof _gag && _gaq.push([ "_trackEvent", "Events", "buttonClick", $(e.srcElement).attr("data-analytics") ]), 
that.destroy();
}), $(document).keyup(function(e) {
return 27 === e.keyCode ? that.destroy() :void 0;
}), this.options.events && _.isObject(this.options.events) && (that = this, _.each(this.options.events, function(callback, index) {
var ev, eventData, sl, sp;
return sp = index.indexOf(" "), ev = index.substr(0, sp), sl = index.substr(sp + 1), 
eventData = {
$dialog:$dialog,
that:that
}, $dialog.find(sl).bind(ev, eventData, callback);
})), $footer = that.$footer(), $footer_buttons = $footer.find(".hr-dialog-buttons"), 
_.each(this.options.buttons, function(button, index) {
var $btn, analytics_attr, btn, btn_id;
return btn_id = that.id + "-fbtn-" + index, analytics_attr = "", button.analytics && (analytics_attr = "data-analytics='" + button.analytics + "'"), 
$footer_buttons.append("<button " + analytics_attr + " class='btn " + (button["class"] || "hr-dialog-button") + "' id='" + btn_id + "'>" + button.name + "</button>"), 
$btn = $footer_buttons.find("#" + btn_id), btn = Btn({
dialog:that,
id:btn_id,
$el:$btn
}), $btn.bind("click", function(e) {
return e.preventDefault(), btn.setActive(), button.callback.call(btn, that);
});
}), this.options.hide_footer && this.$footer().css("border-top", "none").css("background", "none"), 
this.is_rendered = !0, that.onRender && that.onRender.call()), this;
},
renderPosition:function(dialog) {
var $dialog, options, _dialog_body_height, _dialog_horizontal_padding, _dialog_vertical_padding;
return null == dialog && (dialog = null), dialog || (dialog = this), $dialog = dialog.$el(), 
options = dialog.options, _dialog_horizontal_padding = ($(document).width() - options.width - 10) / 2, 
_dialog_body_height = $dialog.find(".hr-dialog-border").height(), _dialog_vertical_padding = ($dialog.height() - _dialog_body_height - 10) / 2, 
$dialog.css("padding-top", _dialog_vertical_padding + "px"), $dialog.css("padding-bottom", _dialog_vertical_padding + "px"), 
$dialog.css("padding-right", _dialog_horizontal_padding + "px"), $dialog.css("padding-left", _dialog_horizontal_padding + "px");
},
destroy:function() {
var that;
return that = this, $("#" + this.id).animate({
opacity:0
}, 250, function() {
return $(this).remove(), that.options.onDestroy ? that.options.onDestroy.call() :void 0;
}), this;
},
$el:function() {
return $("#" + this.id);
},
$header:function() {
return this.$el().find(".hr-dialog-header");
},
$body:function() {
return this.$el().find(".hr-dialog-body");
},
$footer:function() {
return this.$el().find(".hr-dialog-footer");
},
$main_window:function() {
return this.$el().find(".hr-dialog-main-window");
}
}, ShowDialog = function(options, custom_properties) {
var default_options, generated, hr_dialog_id, return_value, _error, _prototype;
if (null == custom_properties && (custom_properties = {}), hr_dialog_id = "", generated = !1, 
default_options = {
width:450,
title:"",
body:"",
analytics:"Dialog Analytics",
buttons:[],
closebutton:!0
}, _.isObject(options)) options = $.extend(default_options, options); else {
if (void 0 !== options) throw _error = new Error(), _error.name = "Argument Error", 
_error.message = "Argument to `ShowDialog` can only be an object", _error;
options = default_options;
}
for (;!generated; ) hr_dialog_id = "hr-dialog-" + Math.round(1e10 * Math.random()), 
0 === $("#" + hr_dialog_id).length && (generated = !0);
return return_value = {
id:hr_dialog_id,
options:options
}, _prototype = $.extend(dialog_properties, custom_properties), return_value.prototype || (return_value.prototype = {}), 
$.each(_prototype, function(key, value) {
return return_value[key] = value;
}), return_value;
}, ShowFormDialog = function(options) {
var body, default_options, events, field, form_properties, _error, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
if (form_properties = {
$form:function() {
return this.$body().find("form");
},
form_set_notice:function(text) {
var body;
return body = this.$body(), body.find(".alert .error").hide(), body.find(".alert .success").html(text).show();
},
form_set_error:function(text) {
var body;
return body = this.$body(), body.find(".alert .success").hide(), body.find(".alert .error").html(text).show();
},
form_unset_alert:function() {
var body;
return body = this.$body(), body.find(".alert .error").hide(), body.find(".alert .success").hide();
}
}, default_options = {
enctype:"application/x-www-form-urlencoded",
fields:[]
}, _.isObject(options)) options = $.extend(default_options, options); else {
if (void 0 !== options) throw _error = new Error(), _error.name = "Argument Error", 
_error.message = "Argument to `ShowFormDialog` can only be an object", _error;
options = default_options;
}
for (body = options.body ? options.body :"", body += "<p class='alert hide'> <span class='success' style='display: none; color: green;'></span> <span class='error' style='display:none; color: red;'></span> </p> <form enctype='" + options.enctype + "'>", 
_ref = options.fields, _i = 0, _len = _ref.length; _len > _i; _i++) field = _ref[_i], 
"hidden" !== field.type && (body += "<div class='formgroup horizontal'>"), field.title && (body += "<label for='name' class='pull-left span3'>" + field.title + "</label>"), 
body += "<div class='block span7 profile-input'>", "email" === (_ref1 = field.type) || "text" === _ref1 || "hidden" === _ref1 ? body += "<input class='span6' " :"file" === (_ref2 = field.type) ? body += "<div class='wrap_file span6'><input class='orig_file' " :"textarea" === field.type ? body += "<textarea class='span6' style='resize:vertical;' rows='4'" :"select" === (_ref3 = field.type) && (body += "<select "), 
field.name && (body += "name='" + field.name + "' "), field.type && (body += "type='" + field.type + "' "), 
field.value && (body += "value='" + field.value + "' "), field.disabled && (body += "disabled='disabled' "), 
"email" === (_ref4 = field.type) || "text" === _ref4 || "hidden" === _ref4 ? body += " />" :"file" === (_ref5 = field.type) ? body += ' /><div class="fake_file"><div class="fake_file_text span4"></div><div class="fake_file_button btn btn-small">Select File</div></div></div>' :"textarea" === field.type ? (body += ">", 
field.value && (body += value), body += "</textarea>") :"select" === (_ref6 = field.type) && (body += ">", 
field.options && _.each(field.options, function(v, k) {
return body += "<option value='" + k + "'>" + v + "</option>";
}), body += "</select>"), field.hint && (body += "<small class='sub-help'>" + field.hint + "</small><br>"), 
field.error && (body += "<small class='error'></small>"), body += "</div>", "hidden" !== field.type && (body += "</div>");
return body += "</form>", events = {
"click .fake_file_button":function(e) {
var src;
return src = $(e.target), src.parent().parent().find(".orig_file").trigger("click");
},
"change .orig_file":function(e) {
var src;
return src = $(e.target), src.parent().parent().find(".fake_file_text").html(src.val().split("\\").pop());
}
}, options.body = body, options.events = events, new ShowDialog(options, form_properties);
}, ShowLoginDialog = function(options) {
var body, default_options, events, forgot_password_url, form_properties, login_active, login_hide, signup_active, signup_hide, success_callback, _error;
if (form_properties = {}, default_options = {
purpose:"login",
hide_footer:!0,
contest:"",
redirect:!0,
background:"transparent",
title:null
}, _.isObject(options)) options = $.extend(default_options, options); else {
if (void 0 !== options) throw _error = new Error(), _error.name = "Argument Error", 
_error.message = "Argument to `ShowLoginDialog` can only be an object", _error;
options = default_options;
}
return "login" === options.purpose ? (login_active = "active", signup_active = "", 
login_hide = "", signup_hide = "hide") :(signup_active = "active", login_active = "", 
login_hide = "hide", signup_hide = ""), forgot_password_url = HR.CONTEST_SLUG ? "" + document.location.protocol + "//" + document.location.host + "/auth/forgot_password/" + HR.CONTEST_SLUG :"" + document.location.protocol + "//" + document.location.host + "/auth/forgot_password", 
body = "<div class='login-group homepage_admin light-wrap'> <ul class='login_tab unstyled horizontal clearfix'> <li class='signup-toggle toggle " + signup_active + "'><a href='/signup' data-toggle='tab'>Sign Up</a></li> <li class='login-toggle toggle " + login_active + "'><a href='/login' data-toggle='tab'>Log In</a></li> </ul> <style> .legacy-form input { width: 390px; } </style> <div class='homepage_signup signup " + signup_hide + "' id='signup'> <form id='legacy-signup' class='legacy-form'> <div class='homepage_signupgroup--legacy'> <div class='text-center alert error glob-error' style='display:none;'></div> <div class='formgroup'> <i class='icon-mail'></i> <input id='email' type='text' name='email' value='' placeholder='Your Email Address' data-content='' data-toggle='tooltip' data-placement='right'/> </div> <div class='formgroup'> <i class='icon-user'></i> <input id='username' type='text' name='username' value='' placeholder='Pick a username' data-content='' data-toggle='tooltip' data-placement='right'/> </div> <div class='formgroup'> <i class='icon-lock'></i> <input id='password' type='password' name='password' placeholder='Choose a password' data-content='' data-toggle='tooltip' data-placement='right'/> </div> <button class='btn btn-primary span4 block-center signup-button' name='commit' type='submit' value='request' data-analytics='SignupPassword' type='submit'>Create An Account</button> </div> <div class='homepage_signupgroup--social'> <p class='text-center block-margin small'>Or you can sign up with one of the following</p> <ul class='unstyled clearfix socialconnect_list homepage_socialconnect_list socialbuttons' id='social-signup'> <li class='facebook social_button'> <a class='btn btn-facebook btn-social' data-analytics='SignupFacebook'><i class='icon-facebook'></i> Facebook</a> </li> <li class='google social_button'> <a class='btn btn-google btn-social' data-analytics='SignupGoogle'><i class='icon-gplus'></i> Google</a> </li> <li class='github social_button'> <a class='btn btn-github btn-social' data-analytics='SignupGithub'><i class='icon-github'></i> GitHub</a> </li> </ul> </div> </form> </div> <div class='login " + login_hide + "' id='login'> <form id='legacy-login' class='legacy-form'> <div class='homepage_signupgroup--legacy'> <div class='text-center alert error glob-error' style='display:none;'></div> <div class='formgroup'> <i class='icon-user'></i> <input id='login' type='text' name='login' value='' placeholder='Your username or email'/> </div> <div class='formgroup'> <i class='icon-lock'></i> <input id='password' type='password' name='password' placeholder='Your password' /> </div> <div class='clearfix'> <label class='remember pull-left'><input type='checkbox' id='remember_me'> Remember me</label> <a target='_blank' href='" + forgot_password_url + "' class='cursor pull-right password-retrieve'>Forgot your password?</a> </div> <button class='btn btn-primary span4 block-center login-button auth' name='commit' type='submit' value='request' data-analytics='LoginPassword' type='submit'>Log In</button> </div> <div class='homepage_signupgroup--social'> <p class='text-center block-margin small'>Or you can log in with one of the following</p> <ul class='unstyled clearfix inline socialconnect_list homepage_socialconnect_list socialbuttons' id='social-signup'> <li class='facebook social_button'> <a class='btn btn-facebook btn-social' data-analytics='SignupFacebook'><i class='icon-facebook'></i> Facebook</a> </li> <li class='google social_button'> <a class='btn btn-google btn-social' data-analytics='SignupGoogle'><i class='icon-gplus'></i> Google</a> </li> <li class='github social_button'> <a class='btn btn-github btn-social' data-analytics='SignupGithub'><i class='icon-github'></i> GitHub</a> </li> </ul> </div> </form> </div> </div>", 
success_callback = options.success_callback ? options.success_callback :function() {}, 
events = {
"click .login_tab li a":function(e) {
var data, dialog;
return e.preventDefault(), $(e.currentTarget).parent().hasClass("active") ? void 0 :(data = e.data, 
dialog = data.that, dialog.$el().find(".login_tab li a").each(function(index, el) {
return $(el).parent().hasClass("active") ? $(el).parent().removeClass("active") :$(el).parent().addClass("active");
}), dialog.$el().find(".login-group div#signup, .login-group div#login").each(function(index, el) {
return $(el).hasClass("hide") ? $(el).removeClass("hide") :$(el).addClass("hide");
}));
},
"click a.btn-facebook":function(e) {
var data, h, left, top, w;
return e.preventDefault(), data = e.data, w = 600, h = 350, left = screen.width / 2 - w / 2, 
top = screen.height / 2 - h / 2, window.login_callback = function(csrf_token) {
var href;
return $("meta[name=csrf-token]").attr("content", csrf_token), $.ajaxSetup({
headers:{
"X-CSRF-Token":$('meta[name="csrf-token"]').attr("content")
}
}), HR.appController ? HR.profile({
fetch:!0
}) :options.redirect && (href = HR.CONTEST_SLUG ? "" + document.location.protocol + "//" + document.location.host + "/auth/login/" + HR.CONTEST_SLUG :"" + document.location.protocol + "//" + document.location.host + "/auth/login", 
document.location.href = href), data.that.destroy(), success_callback();
}, window.open("/hackers/auth/facebook?display=popup", "facebook_login", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);
},
"click a.btn-github":function(e) {
var data, h, left, top, w;
return e.preventDefault(), data = e.data, w = 960, h = 500, left = screen.width / 2 - w / 2, 
top = screen.height / 2 - h / 2, window.login_callback = function(csrf_token) {
var href;
return $("meta[name=csrf-token]").attr("content", csrf_token), $.ajaxSetup({
headers:{
"X-CSRF-Token":$('meta[name="csrf-token"]').attr("content")
}
}), HR.appController ? HR.profile({
fetch:!0
}) :options.redirect && (href = HR.CONTEST_SLUG ? "" + document.location.protocol + "//" + document.location.host + "/auth/login/" + HR.CONTEST_SLUG :"" + document.location.protocol + "//" + document.location.host + "/auth/login", 
document.location.href = href), data.that.destroy(), success_callback();
}, window.open("/hackers/auth/github?display=popup", "facebook_login", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);
},
"click a.btn-google":function(e) {
var data, h, left, top, w;
return e.preventDefault(), data = e.data, w = 600, h = 500, left = screen.width / 2 - w / 2, 
top = screen.height / 2 - h / 2, window.login_callback = function(csrf_token) {
var href;
return $("meta[name=csrf-token]").attr("content", csrf_token), $.ajaxSetup({
headers:{
"X-CSRF-Token":$('meta[name="csrf-token"]').attr("content")
}
}), HR.appController ? HR.profile({
fetch:!0
}) :options.redirect && (href = HR.CONTEST_SLUG ? "" + document.location.protocol + "//" + document.location.host + "/auth/login/" + HR.CONTEST_SLUG :"" + document.location.protocol + "//" + document.location.host + "/auth/login", 
document.location.href = href), data.that.destroy(), success_callback();
}, window.open("/hackers/auth/google_oauth2?display=popup", "google_login", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);
},
"click button.signup-button":function(e) {
var $form, callback_url, data, dialog;
return e.preventDefault(), "disabled" !== $(e.currentTarget).attr("disabled") ? ($(e.currentTarget).attr("disabled", "disabled"), 
$(e.currentTarget).html("Signing up.."), data = e.data, dialog = data.that, dialog.$body(), 
$form = $(dialog.$body().find(".login-group div#signup")), callback_url = HR.CONTEST_SLUG ? "" + document.location.protocol + "//" + document.location.host + "/auth/signup/" + HR.CONTEST_SLUG :"" + document.location.protocol + "//" + document.location.host + "/auth/signup", 
data = {
username:$form.find("input#username").val(),
email:$form.find("input#email").val(),
password:$form.find("input#password").val()
}, $form.find(".error").html("").hide(), $.ajax({
type:"POST",
url:callback_url,
data:data,
success:function(data) {
var error_html, href;
return $(e.currentTarget).removeAttr("disabled", "disabled"), data.status ? (data.csrf_token && ($("meta[name=csrf-token]").attr("content", data.csrf_token), 
$.ajaxSetup({
headers:{
"X-CSRF-Token":$('meta[name="csrf-token"]').attr("content")
}
})), $(e.currentTarget).html("Logging you in..."), HR.appController ? (HR.profile({
fetch:!0
}), dialog.destroy()) :options.redirect ? (href = HR.CONTEST_SLUG ? "" + document.location.protocol + "//" + document.location.host + "/auth/login/" + HR.CONTEST_SLUG :"" + document.location.protocol + "//" + document.location.host + "/login", 
document.location.href = href) :dialog.destroy(), success_callback()) :($(e.currentTarget).html("Create An Account"), 
$form.find(".error").html("").show(), data.errors.length > 1 ? (error_html = "<ul>", 
_.each(data.errors, function(error) {
return error_html += "<li>" + error + "</li>";
}, this), error_html += "</ul>", $form.find(".error").html(error_html)) :$form.find(".error").html(data.errors[0]));
}
})) :void 0;
},
"click button.login-button":function(e) {
var $form, callback_url, data, dialog;
return e.preventDefault(), "disabled" !== $(e.currentTarget).attr("disabled") ? ($(e.currentTarget).attr("disabled", "disabled"), 
$(e.currentTarget).html("Logging in.."), data = e.data, dialog = data.that, dialog.$body(), 
$form = $(dialog.$body().find(".login-group div#login")), callback_url = HR.CONTEST_SLUG ? "" + document.location.protocol + "//" + document.location.host + "/auth/login/" + HR.CONTEST_SLUG :"" + document.location.protocol + "//" + document.location.host + "/auth/login", 
data = {
login:$form.find("input#login").val(),
password:$form.find("input#password").val(),
remember_me:$form.find("input#remember_me").is(":checked")
}, $form.find(".error").html("").hide(), $.ajax({
type:"POST",
url:callback_url,
data:data,
success:function(data) {
var error_html, href;
return $(e.currentTarget).removeAttr("disabled", "disabled"), data.status ? (data.csrf_token && ($("meta[name=csrf-token]").attr("content", data.csrf_token), 
$.ajaxSetup({
headers:{
"X-CSRF-Token":$('meta[name="csrf-token"]').attr("content")
}
})), $(e.currentTarget).html("Logging you in..."), HR.appController ? (HR.profile({
fetch:!0
}), dialog.destroy()) :options.redirect ? (href = HR.CONTEST_SLUG ? "" + document.location.protocol + "//" + document.location.host + "/auth/login/" + HR.CONTEST_SLUG :"" + document.location.protocol + "//" + document.location.host + "/login", 
document.location.href = href) :dialog.destroy(), success_callback()) :($(e.currentTarget).html("Log In"), 
$form.find(".error").html("").show(), data.errors.length > 1 ? (error_html = "<ul>", 
_.each(data.errors, function(error) {
return error_html += "<li>" + error + "</li>";
}, this), error_html += "</ul>", $form.find(".error").html(error_html)) :$form.find(".error").html(data.errors[0]));
}
})) :void 0;
}
}, options.body = body, options.analytics = "Cancel Login", options.events = events, 
options.width = 550, new ShowDialog(options, form_properties);
}, ShowConfirmationDialog = function(options) {
var body, default_options, form_properties, _error;
if (form_properties = {
showError:function(text) {
return this.$body().find(".alert").removeClass("success").addClass("error").html(text).show();
},
clearAlert:function() {
return this.$body().find(".alert").removeClass("success").removeClass("error").html("").hide();
},
showSuccess:function(text) {
return this.$body().find(".alert").addClass("success").removeClass("error").html(text).show();
}
}, default_options = {}, _.isObject(options)) options = $.extend(default_options, options); else {
if (void 0 !== options) throw _error = new Error(), _error.name = "Argument Error", 
_error.message = "Argument to `ShowLoginDialog` can only be an object", _error;
options = default_options;
}
return body = "<p class='alert hide'></p>", options.body = body + options.body, 
new ShowDialog(options, form_properties);
}, ShowFeatureRequestDialog = function() {
var body, default_options, events, form_properties, options;
return form_properties = {}, default_options = {
title:"Request a feature"
}, options = _.isObject(options) ? $.extend(default_options, options) :default_options, 
body = '<form id="legacy-feature" class="show" style="display:block" onsubmit="return(false);"> <div class="formgroup clearfix m"> <div class="alert error" style="display: none;"></div> </div> <div class="formgroup horizontal clearfix"> <label for="name" class="pull-left span2">Name</label> <div class="pull-left span4"> <input id="name" type="text" name="name" value="" placeholder="Name"/> </div> </div> <div class="formgroup horizontal clearfix"> <label for="name" class="pull-left span2">Email</label> <div class="pull-left span4"> <input id="email" type="text" name="email" value="" placeholder="Email"/> </div> </div> <div class="formgroup horizontal clearfix"> <label for="name" class="pull-left span2">Feature</label> <div class="pull-left span4"> <textarea id="feature" type="text" name="feature" value="" placeholder="Feature"></textarea> </div> </div> <div class="text-center"> <button class="featureRequest-button btn btn-green btn-large block-center" style="width:340px;" name="submit" type="submit" data-analytics="FeatureRequest" value="sendrequest">Submit</button> </div> <div style="margin-bottom: 20px;"></div> </form>', 
events = {
"click button.featureRequest-button":function(e) {
var $form, $submit, dialog, form_data;
return e.preventDefault(), dialog = e.data.that, $form = $(dialog.$body().find("form#legacy-feature")), 
$submit = $(e.currentTarget), "disabled" !== $submit.attr("disabled") ? ($submit.attr("disabled", "disabled").html("Sending Your Request"), 
$form.find(".alert.error").hide(), form_data = {
name:$form.find("input#name").val(),
email:$form.find("input#email").val(),
feature:$form.find("textarea#feature").val()
}, $.ajax({
url:"/rest/feature_request",
type:"POST",
data:form_data,
success:function(data) {
var error, i, len, _i;
if ($submit.removeAttr("disabled").html("Submit"), data.status) return dialog.destroy();
if (0 === data.errors.length) error = "Unknown Error"; else if (1 === data.errors.length) error = data.errors[0]; else {
for (error = "<ul style='text-align: left;'>", len = data.errors.length - 1, i = _i = 0; len >= 0 ? len >= _i :_i >= len; i = len >= 0 ? ++_i :--_i) error += "<li>" + data.errors[i] + "</li>";
error += "</ul>";
}
return $form.find(".alert.error").show().html(error);
}
})) :void 0;
}
}, options.body = body, options.analytics = "Cancel Feature Request", options.events = events, 
options.width = 400, new ShowDialog(options, form_properties);
}, ShowSubmitDisabledDialog = function(options) {
var body, default_options, form_properties;
return form_properties = {}, default_options = {
title:"Submission Disabled"
}, options = _.isObject(options) ? $.extend(default_options, options) :default_options, 
body = '<div class="block-center text-center"> This challenge is disabled now.<br/>Please try this challenge after some time. </div>', 
options.body = body, options.width = 400, new ShowDialog(options, form_properties);
}, ShowMessageDialog = function(options) {
var body, default_options, dialog, form_properties;
return form_properties = {}, default_options = {
title:"Message",
username:null,
width:350
}, options = _.isObject(options) ? $.extend(default_options, options) :default_options, 
body = "", null !== options.username ? (options.body = "<div> <p>Send message to <a class='backbone' href='/" + options.username + "'>" + options.username + "</a></p> <textarea id='message' rows='5' cols='28'></textarea> </div>", 
options.getReceiver = function() {
return "username-" + options.username;
}) :(options.body = "<div> <p>Send message to <input type='text' style='width: 170px; margin-left: 20px;' id='receiver_id' /> <textarea id='message' rows='5' cols='28'></textarea> </div>", 
options.getReceiver = function() {
return "username-" + $("#receiver_id").val();
}), options.buttons = [ {
name:"Close",
callback:function(dialog) {
return this.setInactive(), dialog.destroy();
}
}, {
name:"Send",
"class":"hr_primary-btn, btn-green",
callback:function(dialog) {
var btn, username;
return btn = this, btn.unSetFailedMsg(), "" === $("#message").val().trim() ? (btn.failed("Message can not be blank."), 
btn.$el.removeClass("disabled"), void 0) :(btn.setInactive(), btn.$el.text("Sending"), 
username = options.getReceiver(), $.ajax({
url:"/rest/messages",
type:"POST",
data:{
sender_id:HR.profile().id,
receiver_id:"" + options.getReceiver(),
message:$("#message").val()
},
success:function(resp) {
return btn.$el.text("Send"), btn.setActive(), resp.status ? (dialog.destroy(), HR.appView.sidebarView.update(parseInt(resp.model.message_thread_id)), 
HR.router.navigate("/inbox/thread/" + resp.model.message_thread_id, !0)) :(btn.failed(resp.error), 
btn.$el.removeClass("disabled"));
},
error:function() {
return btn.$el.text("Send"), btn.failed("There was a problem sending a message"), 
btn.$el.removeClass("disabled");
}
}));
}
} ], dialog = new ShowFormDialog(options, form_properties), dialog.onRender = function() {
return $("#receiver_id").focus(), $("#receiver_id").unbind(), $("#receiver_id").typeahead({
minLength:3,
menu:'<ul class="typeahead dropdown-menu margin-0" "margin:0px;"></ul>',
source:function() {
return function(process, query) {
return $.ajax({
url:"/rest/hackers/autocomplete?q=" + query + "&without=",
type:"GET",
success:function(resp) {
return process.process(resp);
}
});
};
}(this)
});
}, dialog;
}, HR = null != (_ref = window.HR) ? _ref :{}, HR.util || (HR.util = {}), HR.util.ShowDialog = ShowDialog, 
HR.util.ShowFormDialog = ShowFormDialog, HR.util.ShowLoginDialog = ShowLoginDialog, 
HR.util.ShowConfirmationDialog = ShowConfirmationDialog, HR.util.ShowFeatureRequestDialog = ShowFeatureRequestDialog, 
HR.util.ShowSubmitDisabledDialog = ShowSubmitDisabledDialog, HR.util.ShowMessageDialog = ShowMessageDialog, 
window.HR || (window.HR = HR);
});
}.call(this), function() {
Backbone.log = function() {
var args = [ this.constructor.name + ":" ];
_.isFunction(this.get) && args.push(this.get("name") || this.get("title") || this.get("slug")), 
this.id && args.push(this.id), _.each(_.toArray(arguments), function(argument) {
args.push(argument);
}), HR.development && "undefined" != typeof console && console.log && (console.log.apply ? console.log.apply(console, _.compact(args)) :(args.shift(), 
console.log(args)));
};
var memoryStore = {}, siblingsCache = {};
window.siblingsCache = siblingsCache, jQuery(function() {
var HR;
HR = window.HR || {}, window.HR = HR, HR.CacheMixin = {
cache:!0,
cacheTimeout:120,
metaKeys:[ "total" ],
cacheKey:function() {
var prefix, url;
return prefix = !1, url = _.result(this, "url"), prefix ? prefix + "|" + url :url;
},
showLoader:!0,
cached:function(options) {
var cached, fetch, meta, isStale, that = this;
return options || (options = {}), fetch = options.fetch, cached = memoryStore[this.cacheKey()], 
isStale = !0, cached && (this.sync_status = !0, this.set(cached.parsed), meta = cached.meta || {}, 
_.isObject(meta.attrs) && _.each(this.metaKeys, function(key) {
!that[key] && meta.attrs[key] && (that[key] = meta.attrs[key]);
}), meta.timestamp && (isStale = ($.now() - meta.timestamp) / 1e3 > this.cacheTimeout)), 
fetch || isStale ? this.cachedFetch(options) :_.isFunction(options.success) && options.success(this, {}), 
this;
},
log:Backbone.log,
cacheSet:function(key, val, options) {
var meta, attrs, cacheData = {}, that = this;
return null == key || "object" == typeof key ? (attrs = key, options = val) :(attrs = {})[key] = val, 
void 0 === options && (options = {}), null === attrs && (attrs = null), attrs && this.set(attrs), 
cacheData.parsed = that.toJSON(), meta = {
attrs:{},
timestamp:$.now()
}, this.metaKeys.length > 0 && _.each(this.metaKeys, function(key) {
meta.attrs[key] = that[key];
}), cacheData.meta = meta, options.silent || this.trigger("reset"), memoryStore[this.cacheKey()] = cacheData, 
cacheData;
},
siblings:function(value) {
return this.constructor.siblings = this.constructor.siblings || [], value && (this.constructor.siblings = value), 
this.constructor.siblings;
},
newSibling:function(options) {
var oldest = _.first(this.siblings()), isNew = !1;
return this.siblings().push({
object:this,
options:options
}), _.isObject(oldest) && (isNew = !0), isNew;
},
handleXHR:function(callbackKind, object, xhr) {
var options;
_.each(this.siblings(), function(sibling) {
options = sibling.options || {}, _.isFunction(options[callbackKind]) && options[callbackKind](object, xhr), 
sibling !== object && (sibling.object.set(object.toJSON()), sibling.object.trigger("reset"));
}), this.log("Ran " + this.siblings().length + " " + callbackKind + " callbacks."), 
this.siblings([]);
},
cachedFetch:function(originalOptions) {
var showMessage, options;
options = _.extend({}, originalOptions), this.newSibling(originalOptions) || (showMessage = HR.util && HR.util.ajaxmsg && !options.disableThrobber, 
this.log("Fetching from server."), showMessage && (this.showLoader || options.showLoader) && (this.log(showMessage, this.showLoader, options.showLoader), 
HR.util.ajaxmsg("Loading ...", !0, !1)), options.error = function(object, xhr) {
HR.util.ajaxmsg("Error Occured", !1, !0, 1), object.handleXHR("error", object, xhr), 
object.log("Failed fetch.");
}, options.success = function(object, xhr) {
object.showLoader && HR.util.ajaxmsg("", !0, !0, .001), object.cacheSet(), object.handleXHR("success", object, xhr), 
object.log("Successful fetch.");
}, delete options.cache, delete options.disableThrobber, this.fetch(options));
},
flush:function() {
delete memoryStore[this.cacheKey()];
},
timerStep:60,
onTimer:function(iteration) {
this.log("Override me to handle my timer at iteration:", iteration);
},
stopTimer:function() {
_.isUndefined(this._timerTimeoutID) || (this.log("Stopping timer, On iteration:", this._timerIteration, "Timeout ID:", this._timerTimeoutID), 
clearTimeout(this._timerTimeoutID), delete this._startTimer), this.stopped = !0;
var that = this;
setTimeout(function() {
that.stopped = !1;
}, this.getTimerStep() + 1);
},
getTimerStep:function() {
return _.isFunction(this.timerStep) ? this.timerStep() :this.timerStep;
},
startTimer:function() {
var that;
return that = this, this._startTimer || (this._startTimer = _.once(function() {
var _recTimer;
return that._timerIteration = 0, that.log("Starting timer, Step: ", that.getTimerStep()), 
(_recTimer = function() {
return that.onTimer(that._timerIteration), that.stopped || (that._timerTimeoutID = setTimeout(_recTimer, 1e3 * that.getTimerStep()), 
that._timerIteration += 1), that._timerIteration;
})();
})), this._startTimer();
}
};
});
}(), /*
 * ----------------------------- JSTORAGE -------------------------------------
 * Simple local storage wrapper to save data on the browser side, supporting
 * all major browsers - IE6+, Firefox2+, Safari4+, Chrome4+ and Opera 10.5+
 *
 * Copyright (c) 2010 - 2012 Andris Reinman, andris.reinman@gmail.com
 * Project homepage: www.jstorage.info
 *
 * Licensed under MIT-style license:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
function() {
function _init() {
var localStorageReallyWorks = !1;
if ("localStorage" in window) try {
window.localStorage.setItem("_tmptest", "tmpval"), localStorageReallyWorks = !0, 
window.localStorage.removeItem("_tmptest");
} catch (BogusQuotaExceededErrorOnIos5) {}
if (localStorageReallyWorks) try {
window.localStorage && (_storage_service = window.localStorage, _backend = "localStorage", 
_observer_update = _storage_service.jStorage_update);
} catch (E3) {} else if ("globalStorage" in window) try {
window.globalStorage && (_storage_service = window.globalStorage[window.location.hostname], 
_backend = "globalStorage", _observer_update = _storage_service.jStorage_update);
} catch (E4) {} else {
if (_storage_elm = document.createElement("link"), !_storage_elm.addBehavior) return _storage_elm = null, 
void 0;
_storage_elm.style.behavior = "url(#default#userData)", document.getElementsByTagName("head")[0].appendChild(_storage_elm);
try {
_storage_elm.load("jStorage");
} catch (E) {
_storage_elm.setAttribute("jStorage", "{}"), _storage_elm.save("jStorage"), _storage_elm.load("jStorage");
}
var data = "{}";
try {
data = _storage_elm.getAttribute("jStorage");
} catch (E5) {}
try {
_observer_update = _storage_elm.getAttribute("jStorage_update");
} catch (E6) {}
_storage_service.jStorage = data, _backend = "userDataBehavior";
}
_load_storage(), _handleTTL(), _setupObserver(), _handlePubSub(), "addEventListener" in window && window.addEventListener("pageshow", function(event) {
event.persisted && _storageObserver();
}, !1);
}
function _reloadData() {
var data = "{}";
if ("userDataBehavior" == _backend) {
_storage_elm.load("jStorage");
try {
data = _storage_elm.getAttribute("jStorage");
} catch (E5) {}
try {
_observer_update = _storage_elm.getAttribute("jStorage_update");
} catch (E6) {}
_storage_service.jStorage = data;
}
_load_storage(), _handleTTL(), _handlePubSub();
}
function _setupObserver() {
"localStorage" == _backend || "globalStorage" == _backend ? "addEventListener" in window ? window.addEventListener("storage", _storageObserver, !1) :document.attachEvent("onstorage", _storageObserver) :"userDataBehavior" == _backend && setInterval(_storageObserver, 1e3);
}
function _storageObserver() {
var updateTime;
clearTimeout(_observer_timeout), _observer_timeout = setTimeout(function() {
if ("localStorage" == _backend || "globalStorage" == _backend) updateTime = _storage_service.jStorage_update; else if ("userDataBehavior" == _backend) {
_storage_elm.load("jStorage");
try {
updateTime = _storage_elm.getAttribute("jStorage_update");
} catch (E5) {}
}
updateTime && updateTime != _observer_update && (_observer_update = updateTime, 
_checkUpdatedKeys());
}, 25);
}
function _checkUpdatedKeys() {
var newCrc32List, oldCrc32List = JSON.parse(JSON.stringify(_storage.__jstorage_meta.CRC32));
_reloadData(), newCrc32List = JSON.parse(JSON.stringify(_storage.__jstorage_meta.CRC32));
var key, updated = [], removed = [];
for (key in oldCrc32List) if (oldCrc32List.hasOwnProperty(key)) {
if (!newCrc32List[key]) {
removed.push(key);
continue;
}
oldCrc32List[key] != newCrc32List[key] && "2." == String(oldCrc32List[key]).substr(0, 2) && updated.push(key);
}
for (key in newCrc32List) newCrc32List.hasOwnProperty(key) && (oldCrc32List[key] || updated.push(key));
_fireObservers(updated, "updated"), _fireObservers(removed, "deleted");
}
function _fireObservers(keys, action) {
if (keys = [].concat(keys || []), "flushed" == action) {
keys = [];
for (var key in _observers) _observers.hasOwnProperty(key) && keys.push(key);
action = "deleted";
}
for (var i = 0, len = keys.length; len > i; i++) if (_observers[keys[i]]) for (var j = 0, jlen = _observers[keys[i]].length; jlen > j; j++) _observers[keys[i]][j](keys[i], action);
}
function _publishChange() {
var updateTime = (+new Date()).toString();
"localStorage" == _backend || "globalStorage" == _backend ? _storage_service.jStorage_update = updateTime :"userDataBehavior" == _backend && (_storage_elm.setAttribute("jStorage_update", updateTime), 
_storage_elm.save("jStorage")), _storageObserver();
}
function _load_storage() {
if (_storage_service.jStorage) try {
_storage = JSON.parse(String(_storage_service.jStorage));
} catch (E6) {
_storage_service.jStorage = "{}";
} else _storage_service.jStorage = "{}";
_storage_size = _storage_service.jStorage ? String(_storage_service.jStorage).length :0, 
_storage.__jstorage_meta || (_storage.__jstorage_meta = {}), _storage.__jstorage_meta.CRC32 || (_storage.__jstorage_meta.CRC32 = {});
}
function _save() {
_dropOldEvents();
try {
_storage_service.jStorage = JSON.stringify(_storage), _storage_elm && (_storage_elm.setAttribute("jStorage", _storage_service.jStorage), 
_storage_elm.save("jStorage")), _storage_size = _storage_service.jStorage ? String(_storage_service.jStorage).length :0;
} catch (E7) {}
}
function _checkKey(key) {
if (!key || "string" != typeof key && "number" != typeof key) throw new TypeError("Key name must be string or numeric");
if ("__jstorage_meta" == key) throw new TypeError("Reserved key name");
return !0;
}
function _handleTTL() {
var curtime, i, TTL, CRC32, nextExpire = 1/0, changed = !1, deleted = [];
if (clearTimeout(_ttl_timeout), _storage.__jstorage_meta && "object" == typeof _storage.__jstorage_meta.TTL) {
curtime = +new Date(), TTL = _storage.__jstorage_meta.TTL, CRC32 = _storage.__jstorage_meta.CRC32;
for (i in TTL) TTL.hasOwnProperty(i) && (TTL[i] <= curtime ? (delete TTL[i], delete CRC32[i], 
delete _storage[i], changed = !0, deleted.push(i)) :TTL[i] < nextExpire && (nextExpire = TTL[i]));
1/0 != nextExpire && (_ttl_timeout = setTimeout(_handleTTL, nextExpire - curtime)), 
changed && (_save(), _publishChange(), _fireObservers(deleted, "deleted"));
}
}
function _handlePubSub() {
var i, len;
if (_storage.__jstorage_meta.PubSub) {
var pubelm, _pubsubCurrent = _pubsub_last;
for (i = len = _storage.__jstorage_meta.PubSub.length - 1; i >= 0; i--) pubelm = _storage.__jstorage_meta.PubSub[i], 
pubelm[0] > _pubsub_last && (_pubsubCurrent = pubelm[0], _fireSubscribers(pubelm[1], pubelm[2]));
_pubsub_last = _pubsubCurrent;
}
}
function _fireSubscribers(channel, payload) {
if (_pubsub_observers[channel]) for (var i = 0, len = _pubsub_observers[channel].length; len > i; i++) _pubsub_observers[channel][i](channel, JSON.parse(JSON.stringify(payload)));
}
function _dropOldEvents() {
if (_storage.__jstorage_meta.PubSub) {
for (var retire = +new Date() - 2e3, i = 0, len = _storage.__jstorage_meta.PubSub.length; len > i; i++) if (_storage.__jstorage_meta.PubSub[i][0] <= retire) {
_storage.__jstorage_meta.PubSub.splice(i, _storage.__jstorage_meta.PubSub.length - i);
break;
}
_storage.__jstorage_meta.PubSub.length || delete _storage.__jstorage_meta.PubSub;
}
}
function _publish(channel, payload) {
_storage.__jstorage_meta || (_storage.__jstorage_meta = {}), _storage.__jstorage_meta.PubSub || (_storage.__jstorage_meta.PubSub = []), 
_storage.__jstorage_meta.PubSub.unshift([ +new Date(), channel, payload ]), _save(), 
_publishChange();
}
function murmurhash2_32_gc(str, seed) {
for (var k, l = str.length, h = seed ^ l, i = 0; l >= 4; ) k = 255 & str.charCodeAt(i) | (255 & str.charCodeAt(++i)) << 8 | (255 & str.charCodeAt(++i)) << 16 | (255 & str.charCodeAt(++i)) << 24, 
k = 1540483477 * (65535 & k) + ((1540483477 * (k >>> 16) & 65535) << 16), k ^= k >>> 24, 
k = 1540483477 * (65535 & k) + ((1540483477 * (k >>> 16) & 65535) << 16), h = 1540483477 * (65535 & h) + ((1540483477 * (h >>> 16) & 65535) << 16) ^ k, 
l -= 4, ++i;
switch (l) {
case 3:
h ^= (255 & str.charCodeAt(i + 2)) << 16;

case 2:
h ^= (255 & str.charCodeAt(i + 1)) << 8;

case 1:
h ^= 255 & str.charCodeAt(i), h = 1540483477 * (65535 & h) + ((1540483477 * (h >>> 16) & 65535) << 16);
}
return h ^= h >>> 13, h = 1540483477 * (65535 & h) + ((1540483477 * (h >>> 16) & 65535) << 16), 
h ^= h >>> 15, h >>> 0;
}
var JSTORAGE_VERSION = "0.4.2", $ = window.jQuery || window.$ || (window.$ = {}), JSON = {
parse:window.JSON && (window.JSON.parse || window.JSON.decode) || String.prototype.evalJSON && function(str) {
return String(str).evalJSON();
} || $.parseJSON || $.evalJSON,
stringify:Object.toJSON || window.JSON && (window.JSON.stringify || window.JSON.encode) || $.toJSON
};
if (!JSON.parse || !JSON.stringify) throw new Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");
var _ttl_timeout, _storage = {
__jstorage_meta:{
CRC32:{}
}
}, _storage_service = {
jStorage:"{}"
}, _storage_elm = null, _storage_size = 0, _backend = !1, _observers = {}, _observer_timeout = !1, _observer_update = 0, _pubsub_observers = {}, _pubsub_last = +new Date(), _XMLService = {
isXML:function(elm) {
var documentElement = (elm ? elm.ownerDocument || elm :0).documentElement;
return documentElement ? "HTML" !== documentElement.nodeName :!1;
},
encode:function(xmlNode) {
if (!this.isXML(xmlNode)) return !1;
try {
return new XMLSerializer().serializeToString(xmlNode);
} catch (E1) {
try {
return xmlNode.xml;
} catch (E2) {}
}
return !1;
},
decode:function(xmlString) {
var resultXML, dom_parser = "DOMParser" in window && new DOMParser().parseFromString || window.ActiveXObject && function(_xmlString) {
var xml_doc = new ActiveXObject("Microsoft.XMLDOM");
return xml_doc.async = "false", xml_doc.loadXML(_xmlString), xml_doc;
};
return dom_parser ? (resultXML = dom_parser.call("DOMParser" in window && new DOMParser() || window, xmlString, "text/xml"), 
this.isXML(resultXML) ? resultXML :!1) :!1;
}
};
$.jStorage = {
version:JSTORAGE_VERSION,
set:function(key, value, options) {
if (_checkKey(key), options = options || {}, "undefined" == typeof value) return this.deleteKey(key), 
value;
if (_XMLService.isXML(value)) value = {
_is_xml:!0,
xml:_XMLService.encode(value)
}; else {
if ("function" == typeof value) return void 0;
value && "object" == typeof value && (value = JSON.parse(JSON.stringify(value)));
}
return _storage[key] = value, _storage.__jstorage_meta.CRC32[key] = "2." + murmurhash2_32_gc(JSON.stringify(value), 2538058380), 
this.setTTL(key, options.TTL || 0), _fireObservers(key, "updated"), value;
},
get:function(key, def) {
return _checkKey(key), key in _storage ? _storage[key] && "object" == typeof _storage[key] && _storage[key]._is_xml ? _XMLService.decode(_storage[key].xml) :_storage[key] :"undefined" == typeof def ? null :def;
},
deleteKey:function(key) {
return _checkKey(key), key in _storage ? (delete _storage[key], "object" == typeof _storage.__jstorage_meta.TTL && key in _storage.__jstorage_meta.TTL && delete _storage.__jstorage_meta.TTL[key], 
delete _storage.__jstorage_meta.CRC32[key], _save(), _publishChange(), _fireObservers(key, "deleted"), 
!0) :!1;
},
setTTL:function(key, ttl) {
var curtime = +new Date();
return _checkKey(key), ttl = Number(ttl) || 0, key in _storage ? (_storage.__jstorage_meta.TTL || (_storage.__jstorage_meta.TTL = {}), 
ttl > 0 ? _storage.__jstorage_meta.TTL[key] = curtime + ttl :delete _storage.__jstorage_meta.TTL[key], 
_save(), _handleTTL(), _publishChange(), !0) :!1;
},
getTTL:function(key) {
var ttl, curtime = +new Date();
return _checkKey(key), key in _storage && _storage.__jstorage_meta.TTL && _storage.__jstorage_meta.TTL[key] ? (ttl = _storage.__jstorage_meta.TTL[key] - curtime, 
ttl || 0) :0;
},
flush:function() {
return _storage = {
__jstorage_meta:{
CRC32:{}
}
}, _save(), _publishChange(), _fireObservers(null, "flushed"), !0;
},
storageObj:function() {
function F() {}
return F.prototype = _storage, new F();
},
index:function() {
var i, index = [];
for (i in _storage) _storage.hasOwnProperty(i) && "__jstorage_meta" != i && index.push(i);
return index;
},
storageSize:function() {
return _storage_size;
},
currentBackend:function() {
return _backend;
},
storageAvailable:function() {
return !!_backend;
},
listenKeyChange:function(key, callback) {
_checkKey(key), _observers[key] || (_observers[key] = []), _observers[key].push(callback);
},
stopListening:function(key, callback) {
if (_checkKey(key), _observers[key]) {
if (!callback) return delete _observers[key], void 0;
for (var i = _observers[key].length - 1; i >= 0; i--) _observers[key][i] == callback && _observers[key].splice(i, 1);
}
},
subscribe:function(channel, callback) {
if (channel = (channel || "").toString(), !channel) throw new TypeError("Channel not defined");
_pubsub_observers[channel] || (_pubsub_observers[channel] = []), _pubsub_observers[channel].push(callback);
},
publish:function(channel, payload) {
if (channel = (channel || "").toString(), !channel) throw new TypeError("Channel not defined");
_publish(channel, payload);
},
reInit:function() {
_reloadData();
}
}, _init();
}(), /**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 1.3.0
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2013, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
 */
function(factory) {
"function" == typeof define && define.amd ? define([ "jquery" ], factory) :factory(jQuery);
}(function($) {
function refresh() {
var data = prepareData(this), $s = $t.settings;
return isNaN(data.datetime) || (0 == $s.cutoff || distance(data.datetime) < $s.cutoff) && $(this).text(inWords(data.datetime)), 
this;
}
function prepareData(element) {
if (element = $(element), !element.data("timeago")) {
element.data("timeago", {
datetime:$t.datetime(element)
});
var text = $.trim(element.text());
$t.settings.localeTitle ? element.attr("title", element.data("timeago").datetime.toLocaleString()) :!(text.length > 0) || $t.isTime(element) && element.attr("title") || element.attr("title", text);
}
return element.data("timeago");
}
function inWords(date) {
return $t.inWords(distance(date));
}
function distance(date) {
return new Date().getTime() - date.getTime();
}
$.timeago = function(timestamp) {
return timestamp instanceof Date ? inWords(timestamp) :"string" == typeof timestamp ? inWords($.timeago.parse(timestamp)) :"number" == typeof timestamp ? inWords(new Date(timestamp)) :inWords($.timeago.datetime(timestamp));
};
var $t = $.timeago;
$.extend($.timeago, {
settings:{
refreshMillis:6e4,
allowFuture:!1,
localeTitle:!1,
cutoff:0,
strings:{
prefixAgo:null,
prefixFromNow:null,
suffixAgo:"ago",
suffixFromNow:"from now",
seconds:"less than a minute",
minute:"about a minute",
minutes:"%d minutes",
hour:"about an hour",
hours:"about %d hours",
day:"a day",
days:"%d days",
month:"about a month",
months:"%d months",
year:"about a year",
years:"%d years",
wordSeparator:" ",
numbers:[]
}
},
inWords:function(distanceMillis) {
function substitute(stringOrFunction, number) {
var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) :stringOrFunction, value = $l.numbers && $l.numbers[number] || number;
return string.replace(/%d/i, value);
}
var $l = this.settings.strings, prefix = $l.prefixAgo, suffix = $l.suffixAgo;
this.settings.allowFuture && 0 > distanceMillis && (prefix = $l.prefixFromNow, suffix = $l.suffixFromNow);
var seconds = Math.abs(distanceMillis) / 1e3, minutes = seconds / 60, hours = minutes / 60, days = hours / 24, years = days / 365, words = 45 > seconds && substitute($l.seconds, Math.round(seconds)) || 90 > seconds && substitute($l.minute, 1) || 45 > minutes && substitute($l.minutes, Math.round(minutes)) || 90 > minutes && substitute($l.hour, 1) || 24 > hours && substitute($l.hours, Math.round(hours)) || 42 > hours && substitute($l.day, 1) || 30 > days && substitute($l.days, Math.round(days)) || 45 > days && substitute($l.month, 1) || 365 > days && substitute($l.months, Math.round(days / 30)) || 1.5 > years && substitute($l.year, 1) || substitute($l.years, Math.round(years)), separator = $l.wordSeparator || "";
return void 0 === $l.wordSeparator && (separator = " "), $.trim([ prefix, words, suffix ].join(separator));
},
parse:function(iso8601) {
var s = $.trim(iso8601);
return s = s.replace(/\.\d+/, ""), s = s.replace(/-/, "/").replace(/-/, "/"), s = s.replace(/T/, " ").replace(/Z/, " UTC"), 
s = s.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"), new Date(s);
},
datetime:function(elem) {
var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") :$(elem).attr("title");
return $t.parse(iso8601);
},
isTime:function(elem) {
return "time" === $(elem).get(0).tagName.toLowerCase();
}
});
var functions = {
init:function() {
var refresh_el = $.proxy(refresh, this);
refresh_el();
var $s = $t.settings;
$s.refreshMillis > 0 && setInterval(refresh_el, $s.refreshMillis);
},
update:function(time) {
$(this).data("timeago", {
datetime:$t.parse(time)
}), refresh.apply(this);
},
updateFromDOM:function() {
$(this).data("timeago", {
datetime:$t.parse($t.isTime(this) ? $(this).attr("datetime") :$(this).attr("title"))
}), refresh.apply(this);
}
};
$.fn.timeago = function(action, options) {
var fn = action ? functions[action] :functions.init;
if (!fn) throw new Error("Unknown function name '" + action + "' for timeago");
return this.each(function() {
fn.call(this, options);
}), this;
}, document.createElement("abbr"), document.createElement("time");
}), require__.modules = {}, require__.aliases = {}, require__.resolve = function(path) {
"/" === path.charAt(0) && (path = path.slice(1));
for (var paths = [ path, path + ".js", path + ".json", path + "/index.js", path + "/index.json" ], i = 0; i < paths.length; i++) {
var path = paths[i];
if (require__.modules.hasOwnProperty(path)) return path;
if (require__.aliases.hasOwnProperty(path)) return require__.aliases[path];
}
}, require__.normalize = function(curr, path) {
var segs = [];
if ("." != path.charAt(0)) return path;
curr = curr.split("/"), path = path.split("/");
for (var i = 0; i < path.length; ++i) ".." == path[i] ? curr.pop() :"." != path[i] && "" != path[i] && segs.push(path[i]);
return curr.concat(segs).join("/");
}, require__.register = function(path, definition) {
require__.modules[path] = definition;
}, require__.alias = function(from, to) {
if (!require__.modules.hasOwnProperty(from)) throw new Error('Failed to alias "' + from + '", it does not exist');
require__.aliases[to] = from;
}, require__.relative = function(parent) {
function lastIndexOf(arr, obj) {
for (var i = arr.length; i--; ) if (arr[i] === obj) return i;
return -1;
}
function localrequire__(path) {
var resolved = localrequire__.resolve(path);
return require__(resolved, parent, path);
}
var p = require__.normalize(parent, "..");
return localrequire__.resolve = function(path) {
var c = path.charAt(0);
if ("/" == c) return path.slice(1);
if ("." == c) return require__.normalize(p, path);
var segs = parent.split("/"), i = lastIndexOf(segs, "deps") + 1;
return i || (i = 0), path = segs.slice(0, i + 1).join("/") + "/deps/" + path;
}, localrequire__.exists = function(path) {
return require__.modules.hasOwnProperty(localrequire__.resolve(path));
}, localrequire__;
}, require__.register("switchery/switchery.js", function(exports, require__, module) {
function Switchery(element, options) {
if (!(this instanceof Switchery)) return new Switchery(options);
this.element = element, this.options = options || {};
for (var i in defaults) i in this.options || (this.options[i] = defaults[i]);
"checkbox" == this.element.type && this.init();
}
/**
 * Switchery 0.2.1
 * http://abpetkov.github.io/switchery/
 *
 * Authored by Alexander Petkov
 * https://github.com/abpetkov
 *
 * Copyright 2013, Alexander Petkov
 * License: The MIT License (MIT)
 * http://opensource.org/licenses/MIT
 *
 */
module.exports = Switchery;
var defaults = {
color:"#64bd63",
secondaryColor:"#dfdfdf",
className:"switchery",
disabled:!1,
speed:"0.4s"
};
Switchery.prototype.hide = function() {
this.element.style.display = "none";
}, Switchery.prototype.show = function() {
var switcher = this.create();
this.element.parentNode.appendChild(switcher);
}, Switchery.prototype.create = function() {
return this.switcher = document.createElement("span"), this.jack = document.createElement("small"), 
this.switcher.appendChild(this.jack), this.switcher.className = this.options.className, 
this.switcher;
}, Switchery.prototype.isChecked = function() {
return this.element.checked;
}, Switchery.prototype.isDisabled = function() {
return this.options.disabled || this.element.disabled;
}, Switchery.prototype.setPosition = function(clicked) {
var checked = this.isChecked(), switcher = this.switcher, jack = this.jack;
clicked && checked ? checked = !1 :clicked && !checked && (checked = !0), checked === !0 ? (this.element.checked = !0, 
jack.style.left = window.getComputedStyle ? parseInt(window.getComputedStyle(switcher).width) - jack.offsetWidth + "px" :parseInt(switcher.currentStyle.width) - jack.offsetWidth + "px", 
this.options.color && this.colorize(), this.setSpeed()) :(jack.style.left = 0, this.element.checked = !1, 
this.switcher.style.boxShadow = "inset 0 0 0 0 " + this.options.secondaryColor, 
this.switcher.style.borderColor = this.options.secondaryColor, this.switcher.style.backgroundColor = "", 
this.setSpeed());
}, Switchery.prototype.setSpeed = function() {
var switcherTransition = [], jackTransition = [ "left " + this.options.speed.replace(/[a-z]/, "") / 2 + "s" ], isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
this.isChecked() ? (switcherTransition.push("border " + this.options.speed), switcherTransition.push("box-shadow " + this.options.speed), 
switcherTransition.push("background-color " + 3 * this.options.speed.replace(/[a-z]/, "") + "s")) :(switcherTransition.push("border " + this.options.speed), 
switcherTransition.push("box-shadow " + this.options.speed)), this.switcher.style.transition = switcherTransition.join(", "), 
isSafari && (this.switcher.style.webkitTransition = switcherTransition.join(", ")), 
this.jack.style.transition = jackTransition, isSafari && (this.jack.style.webkitTransition = jackTransition);
}, Switchery.prototype.setAttributes = function() {
var id = this.element.getAttribute("id"), name = this.element.getAttribute("name");
id && this.switcher.setAttribute("id", id), name && this.switcher.setAttribute("name", name);
}, Switchery.prototype.colorize = function() {
this.switcher.style.backgroundColor = this.options.color, this.switcher.style.borderColor = this.options.color, 
this.switcher.style.boxShadow = "inset 0 0 0 16px " + this.options.color;
}, Switchery.prototype.handleClick = function() {
var $this = this, switcher = this.switcher;
this.isDisabled() === !1 ? switcher.addEventListener ? switcher.addEventListener("click", function() {
$this.setPosition(!0);
}) :switcher.attachEvent("onclick", function() {
$this.setPosition(!0);
}) :this.element.disabled = !0;
}, Switchery.prototype.init = function() {
this.hide(), this.show(), this.setPosition(), this.setAttributes(), this.handleClick();
};
}), require__.alias("switchery/switchery.js", "switchery/index.js");